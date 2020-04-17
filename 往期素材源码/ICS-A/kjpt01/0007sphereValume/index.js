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
    threeWidth = $obj.width();


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();

var getParameter = {
    clear : 5,
    radius : 150,
    thetaLength : 0,
    rval : 3
};
var polygon = {
    clear : 5,
    radius : 150
};

var t = 0;
var h = null;
var v = null;
var r = null;
var a = null;
var dynamic = false;
var states = false;
var axis = false;

var threeD={
    axis:new THREE.Object3D(),
    init:function(){
        threeD.createAxis();
        threeD.labelAxis(50,50,500);
        threeD.createMesh();
        threeD.createControls();
    },
    //创建坐标数字，引入插件 Text2D.js
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        // label x axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            var text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeD.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeD.axis.add(text);
        // label z axis:
        textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeD.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeD.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeD.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeD.axis.add(text);
    },
    createAxis:function(){
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        geom1.vertices.push(threeD.vec3(0,0,0),threeD.vec3(550,0,0));
        geom2.vertices.push(threeD.vec3(0,0,0),threeD.vec3(0,500,0));
        geom3.vertices.push(threeD.vec3(0,0,0),threeD.vec3(0,0,500));
        var material1 = new THREE.LineBasicMaterial({color:'#d4986a'});
        var material2 = new THREE.LineBasicMaterial({color:'#d4986a'});
        var material3 = new THREE.LineBasicMaterial({color:'#d4986a'});
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material2);
        var line3 = new THREE.Line(geom3,material3);
        threeD.axis.add(line1,line2,line3);
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createGrid:function(){
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeD.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeD.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeD.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeD.vec3( i*step - size, bottom, size ) );
        }
        threeD.grid = new THREE.Line( geometry, lineMaterial,1 );
        scene.add(threeD.grid);
    },
    //拖拽旋转，引入插件 OrbitControls.js
    createControls:function(){
        threeD.controls = new THREE.OrbitControls( camera, renderer.domElement );
        //threeD.controls.addEventListener( 'change', renderer );
        threeD.controls.enableDamping = true;
        threeD.controls.dampingFactor = 0.25;
        threeD.controls.enableZoom = true;
    },
    createMesh:function(){
        var materialSph = new THREE.MeshBasicMaterial({color : '#F39800', wireframe : true, side:THREE.DoubleSide });
        var sphGeo = new THREE.SphereGeometry (getParameter.radius, 24, 24 );
        threeD.mesh = new THREE.Mesh( sphGeo, materialSph );
        // threeD.mesh.position.y=getParameter.radius;
        scene.add(threeD.mesh);
    },
    createReMesh:function(){
        var materialSph = new THREE.MeshBasicMaterial({color : '#F39800', wireframe:true, side:THREE.DoubleSide });
        var sphGeo = new THREE.SphereGeometry( 150, 24, 24 );
        threeD.mesh = new THREE.Mesh( sphGeo, materialSph );
        // threeD.mesh.position.y=150;
        scene.add(threeD.mesh);
    },
    repaint:function(){
        scene.remove(threeD.mesh);
        threeD.createMesh();
    }
};

//球体填充
var threeDFill = {
    createFill:function(theta){
        if(threeDFill.mesh){
            scene.remove(threeDFill.mesh);
        }
        var materialSphFill = new THREE.MeshBasicMaterial({ color : '#F39800', opacity : 0.6, transparent : true, side:THREE.DoubleSide });
        var sphGeoFill = new THREE.SphereGeometry( getParameter.radius, 24, 24, 0, Math.PI*2, 0, theta );
        threeDFill.mesh = new THREE.Mesh( sphGeoFill,materialSphFill );
        threeDFill.mesh.rotation.x = Math.PI;
        // threeDFill.mesh.position.y = getParameter.radius;
        scene.add(threeDFill.mesh);
    },
    createReFill:function(){
        var materialSphFill = new THREE.MeshBasicMaterial({ color : '#F39800', side:THREE.DoubleSide });
        var sphGeoFill = new THREE.SphereGeometry( 150, 24, 24, 0, Math.PI*2, 0, 0 );
        threeDFill.mesh = new THREE.Mesh( sphGeoFill,materialSphFill );
        threeDFill.mesh.rotation.x = Math.PI;
        // threeDFill.mesh.position.y = 150;
        scene.add(threeDFill.mesh);
    },
    repaint:function(){
        scene.remove(threeDFill.mesh);
        threeDFill.createFill(getParameter.thetaLength);
    },
    createTop:function(h,r){
        var materialSphFillTop = new THREE.MeshBasicMaterial({ color : '#F39800', transparent : true, opacity:0.9,side:THREE.DoubleSide });
        var sphGeoFillTop = new THREE.CircleGeometry( r, 32);
        threeDFill.mesh1 = new THREE.Mesh( sphGeoFillTop, materialSphFillTop );
        threeDFill.mesh1.position.y = h-polygon.radius;
        threeDFill.mesh1.rotation.x = Math.PI/2;
        scene.add(threeDFill.mesh1);
    }
};

//创建场景
// var widthT = $('#webgl').width();
// var heightT = window.innerHeight;
var renderer = null;
if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true});
}else{
    renderer = new THREE.CanvasRenderer();
}
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xffffff);
renderer.setSize(threeWidth, threeHeight);
$obj.append(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, threeWidth/threeHeight, 0.1, 10000);
camera.position.set( 800, 800, 800 );
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

threeD.init();


//重置事件
function renderAll(){
    threeD.controls.update();

    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();
var s = 4;

$('#slider1').change(function(){
    if(dynamic || states){
        isChanging();
    }
    scene.remove(threeD.mesh1);
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.radius = parseInt(value);
    getParameter.radius = value*50;
    getParameter.rval = value;

    threeD.repaint();
    polygon.radius = getParameter.radius;
    $('.dynamic').removeClass('on');
    $('.formula-right').text('0');
});


function volumeChanged(){
    var v = 4*Math.PI*Math.pow(getParameter.radius/50,3)/3;
    $('.formula-right').text(v.toFixed(2));
}

function isChanging(){
    dynamic = false;
    states = false;
    $(".reset,.store").css("background-color","#7ECAF0");
    $("#desc-liquid").css("background-color","#ec1e1e");
    if(threeDFill.mesh1){
        scene.remove(threeDFill.mesh1);
    }
    if(threeDFill.mesh){
        scene.remove(threeDFill.mesh);
    }
    getParameter.thetaLength = 0;
}

//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
    }
}



//重置
function resetPart(){
    $('.slider1').find('.sliderLeft').css({'width':'91px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'91px'});
    $('.slider1').find('.xdsoft_slider_label').text('3');
    $('#slider1').attr('value',''+3+'|0');
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
    if(dynamic || states){
        isChanging();
    }
    getParameter = {
        clear : 5,
        radius : 150,
        thetaLength : 0,
        rval : 3
    };
    polygon = {
        clear : 5,
        radius : 150
    };
    resetPart();
    scene.remove(threeD.mesh);
    threeD.createReMesh();
    if(threeDFill.mesh){
        scene.remove(threeDFill.mesh);
    }
    if(threeDFill.mesh1){
        scene.remove(threeDFill.mesh1);
    }
    dynamic = false;
    states = false;
    camera.position.set( 800, 800, 800 );
    $('.formula-right').text('0');
    $('.dynamic').removeClass('on');
}
function dynamicEve(){
    if(states){return;}
    $("#liquid-desc").addClass('on');

    dynamic = !dynamic;
    states = !states;
    $(".reset,.store,#desc-liquid").css("background-color","#000");
    t=0;
    clearInterval(a);
    function setFill(){
        if(t>58 || !dynamic){
            clearInterval(a);
            getParameter.liquid = v.toFixed(2);
            //$("#liquid-desc").removeClass('on');
            dynamic = false;
            return;
        }
        t++;
        getParameter.thetaLength = Math.PI/60*t;
        threeDFill.createFill(getParameter.thetaLength);
        if(getParameter.thetaLength < Math.PI/2){
            h = getParameter.radius/50 - (getParameter.radius/50)*Math.cos(getParameter.thetaLength);
            r = getParameter.radius*Math.sin(getParameter.thetaLength);
        }else{
            h = getParameter.radius/50 + (getParameter.radius/50)*Math.cos(Math.PI-getParameter.thetaLength);
            r = getParameter.radius*Math.sin(Math.PI - getParameter.thetaLength);
        }
        v = Math.PI*h*h*(3*(getParameter.radius/50)-h)/3;
        $('.formula-right').text(v.toFixed(2));
        if(threeDFill.mesh1){
            scene.remove(threeDFill.mesh1);
        }
        threeDFill.createTop(h*50,r);
    }
    if(canWebgl){
        a = setInterval(setFill,100);
    }else{
        a = setInterval(setFill,60);
    }

}


if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
    $('#div1').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
    $('#div1').on('touchstart',clickEve1);
}



