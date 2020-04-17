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


var a1=null,a2=null,b1=null,b2=null,c1=null,c2=null,d1=null,d2=null;
var dynamic = false;
var grid = true;


var getParameter = {
    angleJson:[],
    angle1:Math.PI/180*45,
    height:400,
    length:700
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(getParameter.length/2);
        threeDimension.createGrid();
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
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
        threeDimension.renderer.setClearColor(0xeeeeee);
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
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.Line( geometry, lineMaterial,1 );
        var text = threeDimension.createText("α",-420,25,420,"#000000");

        threeDimension.grid.add(grid,text);
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        if(size){
            var textStyle = {align: textAlign.center, font: size+'px Cambria Math', fillStyle: color, antialias: true};
        }else {
            var textStyle = {align: textAlign.center, font: '40px Cambria Math', fillStyle: color, antialias: true};
        }
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,y]);
    },

    createLine:function(length,color,angle){
        var line = new THREE.Object3D();
        var l = 3;
        var material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide, transparent:true,opacity:0.9});
        var plane1 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh1 = new THREE.Mesh(plane1,material);
        mesh1.position.z = -l/2;

        var plane2 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh2 = new THREE.Mesh(plane2,material);
        mesh2.position.z = l/2;

        var plane3 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh3 = new THREE.Mesh(plane3,material);
        mesh3.rotation.x = Math.PI/2;
        mesh3.position.y = l/2;

        var plane4 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh4 = new THREE.Mesh(plane4,material);
        mesh4.rotation.x = Math.PI/2;
        mesh4.position.y = -l/2;

        line.add(mesh1,mesh2,mesh3,mesh4);
        line.rotation.y = angle;
        return line;
    },
    createLine1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
        }
        threeDimension.line1 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var line = threeDimension.createLine(getParameter.length,'#1161c8',getParameter.angle1);
        var text = threeDimension.createText("l",json[0][0]+25,20,-json[0][2]-25,"#1161c8");
        var text1 = threeDimension.createText("1",json[0][0]+35,8,-json[0][2]-35,"#1161c8",23);
        threeDimension.line1.add(line,text,text1);
        threeDimension.line1.position.y = getParameter.height;
        threeDimension.scene.add(threeDimension.line1);
    },
    createLine2:function(){
        if(threeDimension.line2){
            threeDimension.scene.remove(threeDimension.line2);
        }
        threeDimension.line2 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var line = threeDimension.createLine(getParameter.length,0xff0100,getParameter.angle1);
        var text = threeDimension.createText("l",json[0][0]+25,20,-json[0][2]-25,"#ff0100");
        var text1 = threeDimension.createText("2",json[0][0]+35,8,-json[0][2]-35,"#ff0100",23);
        threeDimension.line2.add(line,text,text1);
        threeDimension.line2.position.y = getParameter.height;
        //threeDimension.scene.add(threeDimension.line2);
    },
    createDashedLine1:function(x,y,z){
        if(threeDimension.dash1){
            threeDimension.scene.remove(threeDimension.dash1);
        }
        if(threeDimension.dash2){
            threeDimension.scene.remove(threeDimension.dash2);
        }
        var material = new THREE.LineDashedMaterial({color:0x333333,dashSize:10,gapSize:10});
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();

        geom1.vertices.push(threeDimension.vec3(x,getParameter.height,z));
        geom1.vertices.push(threeDimension.vec3(x,y,z));
        threeDimension.dash1 = new THREE.Line(geom1,material);
        geom1.computeLineDistances();
        threeDimension.scene.add(threeDimension.dash1);

        geom2.vertices.push(threeDimension.vec3(-x,getParameter.height,-z));
        geom2.vertices.push(threeDimension.vec3(-x,y,-z));
        threeDimension.dash2 = new THREE.Line(geom2,material);
        geom2.computeLineDistances();
        threeDimension.scene.add(threeDimension.dash2);
    },
    dynamical:function(){
        var json = getParameter.angleJson;

        a2 = setTimeout(function(){
            threeDimension.scene.add(threeDimension.line2);
            var n=0;
            function animation(){
                if(n>79){
                    clearInterval(a1);
                    return;
                }
                threeDimension.line2.position.y -= 5;
                threeDimension.createDashedLine1(json[0][0],getParameter.height-5*n,-json[0][2]);
                n++;
            }
            a1 = setInterval(animation,40);
        },800);

       /* b2 = setTimeout(function(){
            var isFlash = false;
            function flash(){
                if(isFlash){
                    for(var i=0;i<threeDimension.line2.children[0].children.length;i++){
                        threeDimension.line2.children[0].children[i].material.opacity = 0.9;
                        threeDimension.grid.children[0].material.opacity = 0.9;
                    }
                }else{
                    for(i=0;i<threeDimension.line2.children[0].children.length;i++){
                        threeDimension.line2.children[0].children[i].material.opacity = 0.1;
                        threeDimension.grid.children[0].material.opacity = 0.1;
                    }
                }
                isFlash = !isFlash;
            }
            b1 = setInterval(flash,700);
        },4000);

        c2 = setTimeout(function(){
            clearInterval(b1);
            for(var i=0;i<threeDimension.line2.children[0].children.length;i++){
                threeDimension.line2.children[0].children[i].material.opacity = 0.9;
                threeDimension.grid.children[0].material.opacity = 0.9;
            }

            var isFlash = false;
            function flash(){
                if(isFlash){
                    for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
                        threeDimension.line1.children[0].children[i].material.opacity = 0.9;
                        threeDimension.grid.children[0].material.opacity = 0.9;
                    }
                }else{
                    for(i=0;i<threeDimension.line1.children[0].children.length;i++){
                        threeDimension.line1.children[0].children[i].material.opacity = 0.1;
                        threeDimension.grid.children[0].material.opacity = 0.1;
                    }
                }
                isFlash = !isFlash;
            }
            c1 = setInterval(flash,700);
        },8900);*/

        /*d2 = setTimeout(function(){
            clearInterval(c1);
            for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
                threeDimension.line1.children[0].children[i].material.opacity = 0.9;
                threeDimension.grid.children[0].material.opacity = 0.9;
            }
        },13100);*/
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



var checked =false;
//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        checked = false;
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
        checked = true;
    }

    if(checked){
        threeDimension.dynamical();
    }else{
        reset();
    }
}


function reset(){
    if(!grid){
        grid = !grid;
        threeDimension.scene.add(threeDimension.grid);
    }
    clearTimeout(a2);
    clearTimeout(b2);
    clearTimeout(c2);
    clearTimeout(d2);
    clearInterval(a1);
    clearInterval(b1);
    clearInterval(c1);
    threeDimension.scene.remove(threeDimension.line2);
    threeDimension.scene.remove(threeDimension.dash1);
    threeDimension.scene.remove(threeDimension.dash2);
    threeDimension.line2.position.y = getParameter.height;

    for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
        threeDimension.line1.children[0].children[i].material.opacity = 0.9;
        threeDimension.grid.children[0].material.opacity = 0.9;
    }
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
    reset();
    dynamic = getParameter.checked1 = false;
    threeDimension.camera.position.set(1200,1200,1200);
    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('' +'off');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('#div1').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('#div1').on('touchstart',clickEve1);
}




