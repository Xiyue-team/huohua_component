//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}


// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);



var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
     threeWidth= $obj.width();


var group = new THREE.Group();
var a=null;
var grid = true,dynamic = false;
var timer=null;

var getParameter = {
    angleJson:[],
    length:0,
    line1x:0,
    line2x:0,
    changeAngle:0,
    visible:true
};
var threeDimension={
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson();
        threeDimension.createGrid();
        threeDimension.createPlane1();
        threeDimension.createPlane2();
        threeDimension.createLine1();
        threeDimension.createLine2();
    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 1200;
        threeDimension.camera.position.y = 1200;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer=null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth,threeHeight);
        $obj.append(threeDimension.renderer.domElement);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        threeDimension.grid = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.7} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.Line( geometry, lineMaterial,1 );
        //var text = threeDimension.createText("��",-420,25,420,"#000000");

        threeDimension.grid.add(grid);
        threeDimension.grid.position.y=-150;
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(){
        getParameter.angleJson = [];
        getParameter.angleJson.push([-150,0,150],[-150,0,-150],[150,0,-150],[150,0,150]);
    },
    createPlane1:function(){
        if(threeDimension.plane1){
            threeDimension.scene.remove(threeDimension.plane1);
        }
        var json = getParameter.angleJson;
        var geom = new THREE.Geometry();
        for(var i=0;i<4;i++){
            geom.vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        geom.faces.push(new THREE.Face3(0,3,2));
        geom.faces.push(new THREE.Face3(2,3,0));
        geom.computeFaceNormals();
        var materials = [new THREE.MeshBasicMaterial({color:'#e8e189',opacity:0.5,transparent:true})];
        threeDimension.plane1 = new THREE.SceneUtils.createMultiMaterialObject(geom,materials);
        threeDimension.plane1text = threeDimension.createText("β",json[0][0]+20,json[0][1]+20,json[0][2],"#000000");
        group.add(threeDimension.plane1);
        group.add(threeDimension.plane1text);
        threeDimension.scene.add(group);
        //threeDimension.scene.add(threeDimension.plane1);
        //threeDimension.scene.add(threeDimension.plane1text);
    },
    createPlane2:function(){
        if(threeDimension.plane2){
            threeDimension.scene.remove(threeDimension.plane2);
        }
        var json = getParameter.angleJson;
        var geom = new THREE.Geometry();
        for(var i=0;i<4;i++){
            if(i>=2){
                geom.vertices.push(threeDimension.vec3(json[i][0]+200,json[i][1]-80,json[i][2]));
            }
            else{
                geom.vertices.push(threeDimension.vec3(json[i][0],json[i][1]-80,json[i][2]));
            }
        }
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        geom.faces.push(new THREE.Face3(0,3,2));
        geom.faces.push(new THREE.Face3(2,3,0));
        geom.computeFaceNormals();
        var materials = [new THREE.MeshBasicMaterial({color:'#4FB2F9',opacity:0.5,transparent:true})];
        threeDimension.plane2 = new THREE.SceneUtils.createMultiMaterialObject(geom,materials);
        threeDimension.plane2text = threeDimension.createText("α",json[0][0]+20,json[0][1]-60,json[0][2],"#000000");
        threeDimension.scene.add(threeDimension.plane2);
        threeDimension.scene.add(threeDimension.plane2text);
    },
    createLine1:function(){
        var material1 = new THREE.LineBasicMaterial({color:'#000'});
        var geom1 = new THREE.Geometry();
        var json=getParameter.angleJson;
        geom1.vertices.push(threeDimension.vec3(json[0][0],json[0][1]-80,0));
        var x=80*Math.tan(Math.PI/4);
        geom1.vertices.push(threeDimension.vec3(x,-80,0));
        threeDimension.line1 = new THREE.Line(geom1,material1);
        threeDimension.line1Text = threeDimension.createText("45°",x-60,-40,0,"#black");

        var material2 = new THREE.LineBasicMaterial({color:'#000'});
        var geom2 = new THREE.Geometry();
        var y= 150*Math.sin(Math.PI/4);
        geom2.vertices.push(threeDimension.vec3(-y,y,0));
        geom2.vertices.push(threeDimension.vec3(x,-80,0));
        threeDimension.line2 = new THREE.Line(geom2,material2);

    },
    createLine2:function(){
        var material3 = new THREE.LineBasicMaterial({color:'#000'});
        var geom3 = new THREE.Geometry();
        var json=getParameter.angleJson;
        geom3.vertices.push(threeDimension.vec3(json[2][0]+200,-80,0));
        geom3.vertices.push(threeDimension.vec3(0,-80,0));
        threeDimension.line3 = new THREE.Line(geom3,material3);
        threeDimension.line3Text = threeDimension.createText("90°",30,-40,0,"#black");

        var material4 = new THREE.LineBasicMaterial({color:'#000'});
        var geom4 = new THREE.Geometry();
        geom4.vertices.push(threeDimension.vec3(0,150,0));
        geom4.vertices.push(threeDimension.vec3(0,-80,0));
        threeDimension.line4 = new THREE.Line(geom4,material4);


    },
    rotation1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
            threeDimension.scene.remove(threeDimension.line2);
            threeDimension.scene.remove(threeDimension.line1Text);
        }
        if(threeDimension.line3){
            threeDimension.scene.remove(threeDimension.line3);
            threeDimension.scene.remove(threeDimension.line4);
            threeDimension.scene.remove(threeDimension.line3Text);
        }
        clearInterval(timer);
        timer=setInterval(function(){
            getParameter.changeAngle+=Math.PI/40;
            if(getParameter.changeAngle>=0){
                clearInterval(timer);
                getParameter.changeAngle=0;
            }
            group.rotation.z=getParameter.changeAngle;
        },100);
    },
    rotation2:function(){
        if(threeDimension.line3){
            threeDimension.scene.remove(threeDimension.line3);
            threeDimension.scene.remove(threeDimension.line4);
            threeDimension.scene.remove(threeDimension.line3Text);
        }
        clearInterval(timer);
        if(getParameter.changeAngle>=-Math.PI/4){
            timer=setInterval(function(){
                getParameter.changeAngle-=Math.PI/40;
                if(getParameter.changeAngle<=-Math.PI/4){
                    clearInterval(timer);
                    getParameter.changeAngle=-Math.PI/4;
                    if(threeDimension.line1){
                        threeDimension.scene.remove(threeDimension.line1);
                        threeDimension.scene.remove(threeDimension.line2);
                        threeDimension.scene.remove(threeDimension.line1Text);
                    }
                    threeDimension.scene.add(threeDimension.line1);
                    threeDimension.scene.add(threeDimension.line2);
                    threeDimension.scene.add(threeDimension.line1Text);
                }
                group.rotation.z=getParameter.changeAngle;
            },100);
        }
        else{
            timer=setInterval(function(){
                getParameter.changeAngle+=Math.PI/40;
                if(getParameter.changeAngle>=-Math.PI/4){
                    clearInterval(timer);
                    getParameter.changeAngle=-Math.PI/4;

                    if(threeDimension.line1){
                        threeDimension.scene.remove(threeDimension.line1);
                        threeDimension.scene.remove(threeDimension.line2);
                        threeDimension.scene.remove(threeDimension.line1Text);
                    }
                    threeDimension.scene.add(threeDimension.line1);
                    threeDimension.scene.add(threeDimension.line2);
                    threeDimension.scene.add(threeDimension.line1Text);
                }
                group.rotation.z=getParameter.changeAngle;
            },100);
        }
    },
    rotation3:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
            threeDimension.scene.remove(threeDimension.line2);
            threeDimension.scene.remove(threeDimension.line1Text);
        }
        clearInterval(timer);
        timer=setInterval(function(){
            getParameter.changeAngle-=Math.PI/40;
            if(getParameter.changeAngle<=-Math.PI/2){
                clearInterval(timer);
                getParameter.changeAngle=-Math.PI/2;

                if(threeDimension.line1){
                    threeDimension.scene.remove(threeDimension.line3);
                    threeDimension.scene.remove(threeDimension.line4);
                    threeDimension.scene.remove(threeDimension.line3Text);
                }
                threeDimension.scene.add(threeDimension.line3);
                threeDimension.scene.add(threeDimension.line4);
                threeDimension.scene.add(threeDimension.line3Text);
            }
            group.rotation.z=getParameter.changeAngle;
        },100);
    }
};
threeDimension.init();


//重置事件
function renderAll(){
    threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();
$('#slider1').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    /*getParameter.shape = polygon.shape = value;
    threeDimensional.dynamicCreate();
    $p.removeClass('red').eq(value-1).addClass('red');*/
    if(value == 1){
        threeDimension.rotation1();
    }else if(value == 2){
        threeDimension.rotation2();
    }else if(value == 3){
        threeDimension.rotation3();
    }

});

var checked =true;
//on/off事件
function clickEve1(){
    var dataId = $(this).attr('data-id');
    if(dataId){
        if($(this).parent().parent().hasClass('on')){
            return;
        }else{
            $('.box1').removeClass('on').addClass('off');
            $('.box1').find('.span2').text('off');
            $(this).parent().parent().removeClass('off').addClass('on');
            $(this).parent().parent().find('.span2').text('' +'on');
        }

    }else{
        if($(this).parent().parent().hasClass('on')){
            $(this).parent().parent().removeClass('on').addClass('off');
            $(this).parent().parent().find('.span2').text('' +'off');
        }else{
            $(this).parent().parent().removeClass('off').addClass('on');
            $(this).parent().parent().find('.span2').text('' +'on');
        }
    }



}


function reset(){

    clearTimeout(a1);clearInterval(a2);
    clearTimeout(e1);clearInterval(e2);
    for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
        threeDimension.line1.children[0].children[i].material.opacity = 0.9;
        threeDimension.line2.children[0].children[i].material.opacity = 0.9;
        threeDimension.line3.children[0].children[i].material.opacity = 0.9;
    }
    threeDimension.line2.position.x = 200;
    threeDimension.line2.position.z = 200;
    threeDimension.line3.position.x = -200;
    threeDimension.line3.position.z = -200;
    
}

/*全屏事件*/
var fullScreen=0;
function fullEve(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        }else{
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
        }
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function renewEve(){
    clearInterval(timer);
    if(threeDimension.line1){
        threeDimension.scene.remove(threeDimension.line1);
        threeDimension.scene.remove(threeDimension.line2);
        threeDimension.scene.remove(threeDimension.line1Text);
    }
    if(threeDimension.line3){
        threeDimension.scene.remove(threeDimension.line3);
        threeDimension.scene.remove(threeDimension.line4);
        threeDimension.scene.remove(threeDimension.line3Text);
    }
    threeDimension.camera.position.set(1200,1200,1200);

    getParameter.visible=true;
    getParameter.changeAngle=0;
    group.rotation.z=getParameter.changeAngle;


    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('' +'off');
    $('.box1').eq(0).removeClass('off').addClass('on').find('.span2').text('' +'on');
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner0').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('平行');
    $('#slider1').attr('value',''+1+'|0');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
}



