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
var getParameter = {
    angleJson:[],
    angle:45,
    length:600
};
var oriParameter = {
    angle:45
};
var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
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
        var text = threeDimension.createText("α",-420,25,420,"#000000");

        threeDimension.grid.add(grid,text);
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Arial', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createLine:function(length,color){
        var line = new THREE.Object3D();
        var l = 3;
        var material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide, transparent:true,opacity:0.9});
        var plane1 = new THREE.PlaneGeometry(length,l);
        var mesh1 = new THREE.Mesh(plane1,material);
        mesh1.position.z = -l/2;

        var plane2 = new THREE.PlaneGeometry(length,l);
        var mesh2 = new THREE.Mesh(plane2,material);
        mesh2.position.z = l/2;

        var plane3 = new THREE.PlaneGeometry(length,l);
        var mesh3 = new THREE.Mesh(plane3,material);
        mesh3.rotation.x = Math.PI/2;
        mesh3.position.y = l/2;

        var plane4 = new THREE.PlaneGeometry(length,l);
        var mesh4 = new THREE.Mesh(plane4,material);
        mesh4.rotation.x = Math.PI/2;
        mesh4.position.y = -l/2;

        line.add(mesh1,mesh2,mesh3,mesh4);
        return line;
    },

    createLine1:function(){
        threeDimension.line1 = new THREE.Object3D();
        var line = threeDimension.createLine(getParameter.length,'#d0021b');

        var text = threeDimension.createText("l",getParameter.length/2+20,20,0,"#387817");
        threeDimension.line1.add(line,text);
        threeDimension.line1.rotation.set(0,Math.PI/4,Math.PI/180*getParameter.angle);
        threeDimension.scene.add(threeDimension.line1);
    },
    createLine2:function(){
        if(threeDimension.lineDashed){
            threeDimension.scene.remove(threeDimension.lineDashed);
        }
        if(threeDimension.text){
            threeDimension.scene.remove(threeDimension.text);
        }
        if(threeDimension.arc){
            threeDimension.scene.remove(threeDimension.arc);
        }

        var geom = new THREE.Geometry();
        var x = getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle)*Math.cos(Math.PI/4);
        var z = -getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle)*Math.cos(Math.PI/4);
        geom.vertices.push(threeDimension.vec3(0,0,0));
        geom.vertices.push(threeDimension.vec3(x,0,z));
        geom.computeLineDistances();
        var material = new THREE.LineDashedMaterial({color:'#d0021b', gapSize:10, dashSize:10});
        threeDimension.lineDashed = new THREE.Line(geom,material);
        threeDimension.scene.add(threeDimension.lineDashed);

        threeDimension.text= threeDimension.createText(getParameter.angle+"°", 50, 20, -20, "#000000");
        threeDimension.scene.add(threeDimension.text);


        var array = [],x,y;
        for(var i=0;i<getParameter.angle;){
            x = 10*Math.cos(3.14*i/180);
            y= Math.sqrt(100-Math.pow(x,2));
            array.push(new THREE.Vector3(0, y*5,x*5));
            i = i+1;
        }


        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(50);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        threeDimension.arc = new THREE.Line(geometry, material);
        threeDimension.arc.rotation.y = 125*3.14/180;
        threeDimension.scene.add(threeDimension.arc);


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


$("#slider1").change(function(){
    var s2 = parseInt(this.value);
    getParameter.angle = s2;
    oriParameter.angle = getParameter.angle;
    threeDimension.line1.rotation.z = Math.PI/180*getParameter.angle;
    threeDimension.createLine2();
});




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
    threeDimension.camera.position.set(1200,1200,1200);
    getParameter.angle = 45;
    threeDimension.line1.rotation.z = Math.PI/180*getParameter.angle;
    threeDimension.createLine2();
    $('.slider1').find('.sliderLeft').css({'width':'273px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'273px'});
    $('.slider1').find('.xdsoft_slider_label').text('60');
    $('.slider1').attr('value',''+60+'|0');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
}




