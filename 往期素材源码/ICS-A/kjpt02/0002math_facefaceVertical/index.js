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


//初始全局变量
var a1=null,a2=null,b1=null,b2=null,c2=null,d1=null,d2=null,e1=null,e2=null,f2;
var dynamic = false;
var grid = true;

var getParameter = {
    angleJson:[],
    angle1:-Math.PI/180*45,
    checked1:false
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(400);
        threeDimension.createGrid();
        threeDimension.createPlan(800,480);
        threeDimension.createLine();
        threeDimension.createLine1();

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 1400;
        threeDimension.camera.position.z = 1400;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
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
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '23px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        threeDimension.grid = new THREE.Line( geometry, lineMaterial,1 );
        threeDimension.grid.rotation.y = Math.PI/180*45;
        threeDimension.scene.add(threeDimension.grid);
        threeDimension.gridText = threeDimension.createText("β",-500,20,0,"#000000");
        threeDimension.scene.add(threeDimension.gridText);

    },
    createPlan:function(width,height){
        threeDimension.scene.remove(threeDimension.plan);
        threeDimension.scene.remove(threeDimension.planText);
        var material = new THREE.MeshBasicMaterial({color:0x7ECAF0, transparent:true, opacity:0.7, side:THREE.DoubleSide});
        //var planGeo = new THREE.PlaneGeometry(800,480);
        var planGeo = new THREE.PlaneGeometry(width,height);
        threeDimension.plan = new THREE.Mesh(planGeo,material);
        threeDimension.plan.rotation.y = -Math.PI/180*45;
        threeDimension.plan.position.y = 240;
        threeDimension.scene.add(threeDimension.plan);
        threeDimension.planText = threeDimension.createText("α",-300,500,-300,"#000000");
        threeDimension.scene.add(threeDimension.planText);
    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,y]);
    },
    createLine:function(){
        var material = new THREE.LineBasicMaterial({color:0xff0100});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(0,300,0));
        geom.vertices.push(threeDimension.vec3(0,-300,0));
        threeDimension.line = new THREE.Line(geom,material);

        threeDimension.lineText = threeDimension.createText("l",-10,350,10,"#ff0100");
    },
    createLine1:function(){
        var json = getParameter.angleJson;
        var material = new THREE.LineBasicMaterial({color:0xff0100});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(json[0][0],0,-json[0][2]));
        geom.vertices.push(threeDimension.vec3(-json[0][0],0,json[0][2]));
        threeDimension.line1 = new THREE.Line(geom,material);

        threeDimension.line1Text = threeDimension.createText("l'",json[0][0]+20,20,-json[0][2]+20,"#ff0100");

    },

    dynamical:function(){
        //初始化
        threeDimension.camera.position.set(0,1400,1400);
        threeDimension.scene.remove(threeDimension.line);
        threeDimension.scene.remove(threeDimension.lineText);
        threeDimension.scene.remove(threeDimension.line1);
        threeDimension.scene.remove(threeDimension.line1Text);

        //开始
        threeDimension.scene.remove(threeDimension.plan);
        threeDimension.scene.remove(threeDimension.planText);

        threeDimension.scene.add(threeDimension.line);
        threeDimension.scene.add(threeDimension.lineText);

        var l = 1400/Math.sin(Math.PI/180*45);
        //旋转到俯视
        var num1 = 0;
        function turn1(){
            if(num1>43){
                clearInterval(a1);
                return;
            }
            num1++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(45+num1));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(45+num1));
        }

        a2 = setTimeout(function(){
            a1 = setInterval(turn1,30);
        },800);

        //旋转回正
        var num2 = 0;
        function turn2(){
            if(num2>43){
                clearInterval(b1);
                return;
            }
            num2++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(90-num2));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(90-num2));
        }

        b2 = setTimeout(function(){
            b1 = setInterval(turn2,30);
        },3150);

        //α平面，交线
        function turn3(){
            var num = 0;
            f2 = setInterval(function(){
                if(num >=40){
                    return;
                }
                num++;
                var width = num*800/40;
                var height = 480;
                threeDimension.createPlan(width,height);

            },20);
            // threeDimension.scene.add(threeDimension.plan);
            // threeDimension.scene.add(threeDimension.planText);
            //
            // threeDimension.scene.add(threeDimension.line1);
            // threeDimension.scene.add(threeDimension.line1Text);
        }
        
        c2 = setTimeout(turn3,5500);

        //旋转到垂直
        var num4 = 0;
        function turn4(){
            if(num4>44){
                clearInterval(d1);
                return;
            }
            num4++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(45-num4));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(45-num4));
        }

        d2 = setTimeout(function(){
            d1 = setInterval(function(){
                turn4();
            },30);
        },6500);

        //旋转回正
        var num5 = 0;
        function turn5(){
            if(num5>43){
                clearInterval(e1);
                dynamic = false;
                return;
            }
            num5++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(num5));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(num5));
        }
        
        e2 = setTimeout(function(){
            e1 = setInterval(turn5,30);
        },8850);
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
        dynamic = true;
        threeDimension.dynamical();
    }else{
        dynamic = false;
        renewEve();
    }

    getParameter.checked1 = checked;

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
    dynamic = getParameter.checked1 = false;
    threeDimension.camera.position.set(0,1200,1200);
    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('off');
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 1400;
    threeDimension.camera.position.z = 1400;
    clearInterval(a1);
    clearTimeout(a2);
    clearInterval(b1);
    clearTimeout(b2);
    clearTimeout(c2);
    clearInterval(d1);
    clearTimeout(d2);
    // clearInterval(e1);
    // clearTimeout(e2);
    threeDimension.scene.remove(threeDimension.line);
    threeDimension.scene.remove(threeDimension.lineText);
    threeDimension.scene.remove(threeDimension.line1);
    threeDimension.scene.remove(threeDimension.line1Text);
    threeDimension.scene.add(threeDimension.plan);
    threeDimension.scene.add(threeDimension.planText);
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 1400;
    threeDimension.camera.position.z = 1400;
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




