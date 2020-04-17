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
var a=null,b=null,c=null,d=null;
var dynamic = false;
var grid = true;

var getParameter = {
    angleJson:[],
    angle1:Math.PI/180*30,
    angle2:Math.PI/180*60,
    checked1:false
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(200);
        threeDimension.createGrid();
        threeDimension.createLine();
        threeDimension.createLine1();
        threeDimension.createLine2();
        threeDimension.createAngle1();
        threeDimension.createAngle2();
    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
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
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        threeDimension.grid = new THREE.Line( geometry, lineMaterial,1 );
        threeDimension.grid.rotation.y = Math.PI/180*45;
        threeDimension.scene.add(threeDimension.grid);
        threeDimension.gridText = threeDimension.createText("α",-350,20,350,"#000000");
        threeDimension.scene.add(threeDimension.gridText);

    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,y]);
        x = Math.round(length*Math.cos(getParameter.angle2));
        y = Math.round(length*Math.sin(getParameter.angle2));
        getParameter.angleJson.push([x,0,y]);
    },
    createLine:function(){
        var material = new THREE.LineBasicMaterial({color:0xff0100});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(0,300,0));
        geom.vertices.push(threeDimension.vec3(0,-300,0));
        threeDimension.line = new THREE.Line(geom,material);
        threeDimension.scene.add(threeDimension.line);

        var lineText = threeDimension.createText("l",10,300,-10,"#ff0100");
        threeDimension.scene.add(lineText);
    },
    createLine1:function(){
        var json = getParameter.angleJson;
        var material = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(json[0][0],0,-json[0][2]));
        geom.vertices.push(threeDimension.vec3(-json[0][0],0,json[0][2]));
        threeDimension.line1 = new THREE.Line(geom,material);

        threeDimension.line1Text = threeDimension.createText("l",json[0][0]+10,20,-json[0][2]-10,"#1161c8");
        threeDimension.line11Text = threeDimension.createText("1",json[0][0]+20,5,-json[0][2]-15,"#1161c8",23);
    },
    createLine2:function(){
        var json = getParameter.angleJson;
        var material = new THREE.LineBasicMaterial({color:'#417505'});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(json[1][0],0,-json[1][2]));
        geom.vertices.push(threeDimension.vec3(-json[1][0],0,json[1][2]));
        threeDimension.line2 = new THREE.Line(geom,material);

        threeDimension.line2Text = threeDimension.createText("l",-json[1][0]-10,20,json[1][2]+10,"#417505");
        threeDimension.line22Text = threeDimension.createText("2",-json[1][0],5,json[1][2]+15,"#417505",23);
    },
    createAngle1:function(){
        var material = new THREE.LineBasicMaterial({color:0x333333});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(0,20,0));
        geom.vertices.push(threeDimension.vec3(20*Math.cos(getParameter.angle1),20,-20*Math.sin(getParameter.angle1)));
        geom.vertices.push(threeDimension.vec3(20*Math.cos(getParameter.angle1),0,-20*Math.sin(getParameter.angle1)));
        threeDimension.angle1 = new THREE.Line(geom,material);
    },
    createAngle2:function(){
        var material = new THREE.LineBasicMaterial({color:0x333333});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(0,20,0));
        geom.vertices.push(threeDimension.vec3(20*Math.cos(getParameter.angle2),20,-20*Math.sin(getParameter.angle2)));
        geom.vertices.push(threeDimension.vec3(20*Math.cos(getParameter.angle2),0,-20*Math.sin(getParameter.angle2)));
        threeDimension.angle2 = new THREE.Line(geom,material);
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
    dynamical:function(){
        threeDimension.scene.add(threeDimension.line1);
        threeDimension.scene.add(threeDimension.line1Text,threeDimension.line11Text);
        threeDimension.scene.add(threeDimension.angle1);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 1200;
        threeDimension.camera.position.z = 1200;
        setTimeout(function(){
            if(!dynamic){
                return false;
            }
            threeDimension.scene.add(threeDimension.line2);
            threeDimension.scene.add(threeDimension.line2Text,threeDimension.line22Text);
            threeDimension.scene.add(threeDimension.angle2);
        },1500);
        var l = 1200/Math.sin(Math.PI/180*45);

        var num1 = 0;
        function turn1(){
            if(num1>43||!dynamic){
                clearInterval(a);
                return;
            }
            num1++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(45+num1));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(45+num1));
        }
        c = setTimeout(function(){
            a = setInterval(turn1,30);
        },2000);

        var num2 = 0;
        function turn2(){
            if(num2>43||!dynamic){
                dynamic = false;
                clearInterval(b);
                return;
            }
            num2++;
            threeDimension.camera.position.y = l*Math.sin(Math.PI/180*(90-num2));
            threeDimension.camera.position.z = l*Math.cos(Math.PI/180*(90-num2));
        }
        d = setTimeout(function(){
            b = setInterval(turn2,30);
        },4350);
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
    if(!grid){
        grid = !grid;
        threeDimension.scene.add(threeDimension.grid);
        threeDimension.scene.add(threeDimension.gridText);
    }
    dynamic = getParameter.checked1 = false;
    threeDimension.camera.position.set(0,1200,1200);
    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('off');
    clearTimeout(c);
    clearTimeout(d);
    clearInterval(a);
    clearInterval(b);
    threeDimension.scene.remove(threeDimension.line1);
    threeDimension.scene.remove(threeDimension.line1Text,threeDimension.line11Text);
    threeDimension.scene.remove(threeDimension.angle1);
    threeDimension.scene.remove(threeDimension.line2);
    threeDimension.scene.remove(threeDimension.line2Text,threeDimension.line22Text);
    threeDimension.scene.remove(threeDimension.angle2);
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




