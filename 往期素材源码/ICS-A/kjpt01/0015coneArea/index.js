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
var bodyHeight = $(window).height(),timg;
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
    radiusTop : 0,
    radiusBtm : 150,
    height : 200,
    thetaLength : Math.PI/180,
    clear : 5
};
var oriParameter = {
    radiusTop : 0,
    radiusBtm : 150,
    thetaLength : Math.PI/180,
    height : 200,
    clear : 5
};

var opend = false;
var count1 = 0;
var count2 = 0;
var dynamic = false;
var state = false;

var threeCone={
    axis:new THREE.Object3D(),
    circleLines:[],
    paraText:[],
    init:function(){
        threeCone.createMesh();
        threeCone.labelAxis(50,50,550);
        threeCone.createAxis();
        threeCone.createCircle();
    },
    createMesh:function(){
        if(threeCone.mesh){
            scene.remove(threeCone.mesh);
        }
        var materialCon = new THREE.MeshBasicMaterial({color : '#F39800', transparent:true, opacity:0.3 });
        var conGeo = new THREE.CylinderGeometry( getParameter.radiusTop, getParameter.radiusBtm, getParameter.height, 64, 64);
        threeCone.mesh = new THREE.Mesh( conGeo, materialCon );
        threeCone.mesh.position.y = getParameter.height/2;
        scene.add(threeCone.mesh);
    },
    createCircle:function(){
        if(threeCone.circleLines.length){
            for(var i=0;i<threeCone.circleLines.length;i++){
                scene.remove(threeCone.circleLines[i]);
            }
            threeCone.circleLines=[];
        }
        var geometryLine1 =new THREE.Geometry();
        var vertices1 =[];
        for(i=0;i<73;i++){
            vertices1.push(new THREE.Vector3(getParameter.radiusBtm*Math.cos(i*5*Math.PI/180),0,getParameter.radiusBtm*Math.sin(i*5*Math.PI/180)));
        }
        geometryLine1.vertices = vertices1;
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800', side:THREE.DoubleSide}));
        scene.add(lineMesh1);
        threeCone.circleLines.push(lineMesh1);
    },
    createCircleOpend:function(){
        if(threeCone.circle1){
            scene.remove(threeCone.circle1);
        }
        var materialCir = new THREE.MeshBasicMaterial({color : '#F39800', side:THREE.DoubleSide});
        var cirGeo1 = new THREE.CircleGeometry(getParameter.radiusBtm, 64);
        threeCone.circle1 = new THREE.Mesh(cirGeo1, materialCir);
        threeCone.circle1.rotation.x = Math.PI/2;
        scene.add(threeCone.circle1);
    },
    circleOpend:function(){
        if(count1>90){
            threeCone.createTorus();
            threeCone.torusOpend();
            dynamic = !dynamic;
            return;
        }
        if(canWebgl){
            count1++;
        }else{
            count1 += 3;
        }
        var y1,z1;
        var arc=count1*Math.PI/180;
        y1 = getParameter.radiusBtm*Math.sin(arc);
        z1 = getParameter.radiusBtm-getParameter.radiusBtm*Math.cos(arc);
        threeCone.circle1.rotation.x = Math.PI/2 + arc;
        threeCone.circle1.position.set(0, -y1, -z1);
    },
    createTorus:function(){
        if(threeCone.torus){
            scene.remove(threeCone.torus);
        }
        var c1 = 2*Math.PI*getParameter.radiusBtm;
        var l = Math.sqrt(Math.pow(getParameter.radiusBtm,2)+Math.pow(getParameter.height,2));
        var c = 2*Math.PI*l;
        threeCone.angle = c1/c*Math.PI*2;
        var material = new THREE.MeshBasicMaterial({color : '#F39800', side:THREE.DoubleSide});
        var torusGeo = new THREE.CircleGeometry(l, 64, 0, getParameter.thetaLength);
        threeCone.torus = new THREE.Mesh(torusGeo,material);
        threeCone.torus.rotation.z = -Math.PI/2;
        threeCone.torus.position.y = l;
        threeCone.torus.position.z = -getParameter.radiusBtm;
        scene.add(threeCone.torus);
    },
    torusOpend:function(){
        function inc(){
            if(count2*Math.PI/180 > threeCone.angle){
                clearInterval(timg);
                threeCone.createParaText();
                threeCone.createLines();
                scene.remove(threeCone.mesh);
                for(var i=0;i<threeCone.circleLines.length;i++){
                    scene.remove(threeCone.circleLines[i]);
                }
                opend = !opend;
                return;
            }
            count2++;
            getParameter.thetaLength = Math.PI/180*count2;
            threeCone.createTorus();
            threeCone.torus.rotation.z = -Math.PI/2-getParameter.thetaLength/2;
        }
        timg = setInterval(inc,10);
    },
    createParaText:function(){
        var c1 = 2*Math.PI*getParameter.radiusBtm;
        var l = Math.sqrt(Math.pow(getParameter.radiusBtm,2)+Math.pow(getParameter.height,2));
        var c = 2*Math.PI*l;
        var angle = c1/c*Math.PI;
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        textStyle = {align: textAlign.center, font: '48px Cambria Math', fillStyle: 'black', antialias: true};

        var text1 = new SpriteText2D("2πr", textStyle);
        text1.material.depthTest = false;
        text1.rotation = camera.rotation;
        text1.position.x = 0;
        text1.position.y = 20 ;
        text1.position.z = -getParameter.radiusBtm+20;
        scene.add(text1);
        threeCone.paraText.push(text1);
        var text2 = new SpriteText2D("r", textStyle);
        text2.material.depthTest = false;
        text2.rotation = camera.rotation;
        text2.position.x = getParameter.radiusBtm/2;
        text2.position.y = -getParameter.radiusBtm ;
        text2.position.z = -getParameter.radiusBtm+20;
        scene.add(text2);
        threeCone.paraText.push(text2);
        var text3 = new SpriteText2D("l", textStyle);
        text3.material.depthTest = false;
        text3.rotation = camera.rotation;
        text3.position.x = l/2*Math.sin(angle);
        text3.position.y = l - l/2*Math.cos(angle)+20;
        text3.position.z = -getParameter.radiusBtm + 20;
        scene.add(text3);
        threeCone.paraText.push(text3);
    },
    createLines:function(){
        var material = new THREE.LineDashedMaterial({color:0x000000,side:THREE.DoubleSide, dashSize:20, gapSize:20,scale:1});
        var lineDash1 = new THREE.Geometry();
        lineDash1.computeLineDistances();
        lineDash1.vertices.push(threeCone.vec3(0, -getParameter.radiusBtm, -getParameter.radiusBtm+10));
        lineDash1.vertices.push(threeCone.vec3(getParameter.radiusBtm, -getParameter.radiusBtm, -getParameter.radiusBtm));
        threeCone.lineDash1 = new THREE.Line(lineDash1, material);
        threeCone.lineDash1.material.depthTest = false;
        scene.add(threeCone.lineDash1);
    },
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeCone.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeCone.axis.add(text);
        // label z axis:
        textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeCone.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeCone.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeCone.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeCone.axis.add(text);
    },
    createAxis:function(){
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        geom1.vertices.push(threeCone.vec3(0,0,0),threeCone.vec3(550,0,0));
        geom2.vertices.push(threeCone.vec3(0,0,0),threeCone.vec3(0,550,0));
        geom3.vertices.push(threeCone.vec3(0,0,0),threeCone.vec3(0,0,550));
        var material1 = new THREE.LineBasicMaterial({color:0xff0000});
        var material2 = new THREE.LineBasicMaterial({color:0x00ff00});
        var material3 = new THREE.LineBasicMaterial({color:0x0000ff});
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material2);
        var line3 = new THREE.Line(geom3,material3);
        threeCone.axis.add(line1,line2,line3);
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createGrid:function(){
        if(threeCone.grid){
            scene.remove(threeCone.grid);
        }
        var geometry = new THREE.Geometry();
        var lineMaterial = new THREE.LineBasicMaterial({color : 0x949494, transparent: true, opacity: 0.5});
        var size = 500, bottom = -0.001, step = 20;
        for(var i = 0; i< 51; i ++){
            geometry.vertices.push(threeCone.vec3(-size, bottom, i*step-size));
            geometry.vertices.push(threeCone.vec3(size, bottom, i*step-size));
            geometry.vertices.push(threeCone.vec3(i*step-size, bottom, -size));
            geometry.vertices.push(threeCone.vec3(i*step-size, bottom, size));
        }
        threeCone.grid = new THREE.LineSegments(geometry, lineMaterial);
        scene.add(threeCone.grid);
    },
    createControls:function(){
        threeCone.controls = new THREE.OrbitControls( camera, renderer.domElement );
        threeCone.controls.enableDamping = true;
        threeCone.controls.dampingFactor = 0.25;
        threeCone.controls.enableZoom = true;
    }
};

//创建3D场景
var renderer = null;
if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true});
}else{
    renderer = new THREE.CanvasRenderer();
}
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xffffff);
renderer.setSize(threeWidth,threeWidth);
$obj.append(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, threeWidth/threeHeight, 0.1, 10000);
camera.position.set(0, 700, 700);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);
threeCone.init();
threeCone.createControls();


//重置事件
function renderAll(){
    threeCone.controls.update();

    if(dynamic){
        threeCone.circleOpend();
    }

    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();
var s = 4;

$('#slider1').change(function(){
    if(state){
        count1 = 1000;
        threeCone.angle = 361;
        clearInterval(timg);
        if(threeCone.circle1){
            scene.remove(threeCone.circle1);
        }
        if(threeCone.torus){
            scene.remove(threeCone.torus);
        }
        if(threeCone.lineDash1){
            scene.remove(threeCone.lineDash1);
        }

        if(threeCone.paraText.length>0){
            for(var i=0; i<threeCone.paraText.length; i++){
                scene.remove(threeCone.paraText[i]);
            }
        }
        count1 = 0;
        count2 = 0;
        opend = false;
        dynamic = false;
        state = false;
        $('#liquid-desc').removeClass('on');
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    getParameter.radiusBtm = value*50;
    threeCone.createMesh();
    threeCone.createCircle();
    oriParameter.radiusBtm = getParameter.radiusBtm;
    calculate();

});

$('#slider3').change(function(){
    if(state){
        count1 = 1000;
        threeCone.angle = 361;
        clearInterval(timg);
        if(threeCone.circle1){
            scene.remove(threeCone.circle1);
        }
        if(threeCone.torus){
            scene.remove(threeCone.torus);
        }
        if(threeCone.lineDash1){
            scene.remove(threeCone.lineDash1);
        }

        if(threeCone.paraText.length>0){
            for(var i=0; i<threeCone.paraText.length; i++){
                scene.remove(threeCone.paraText[i]);
            }
        }
        count1 = 0;
        count2 = 0;
        opend = false;
        dynamic = false;
        state = false;
        $('#liquid-desc').removeClass('on');
    }

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    getParameter.height = value*50;
    threeCone.createMesh();
    threeCone.createCircle();
    oriParameter.height = getParameter.height;
    calculate();
});

function calculate(){
    var s,l;
    l = Math.sqrt(Math.pow(getParameter.radiusBtm/50,2) + Math.pow(getParameter.height/50,2));
    s = Math.PI*(getParameter.radiusBtm/50) * (getParameter.radiusBtm/50 + l);
    $('#surarea-num').text(s.toFixed(2));
    $('.muxian').text(l.toFixed(2));
}


//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
    }
}




//重置
function resetPart(){
    $('.slider1').find('.sliderLeft').css({'width':'91px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'91px'});
    $('.slider1').find('.xdsoft_slider_label').text('3');
    $('#slider1').attr('value',''+3+'|0');

    $('.slider3').find('.sliderLeft').css({'width':'136px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'136px'});
    $('.slider3').find('.xdsoft_slider_label').text('4');
    $('#slider3').attr('value',''+4+'|0');

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

    if(state){
        count1 = 1000;
        threeCone.angle = 361;
        clearInterval(timg);
        if(threeCone.circle1){
            scene.remove(threeCone.circle1);
        }
        if(threeCone.torus){
            scene.remove(threeCone.torus);
        }
        if(threeCone.lineDash1){
            scene.remove(threeCone.lineDash1);
        }
        count1 = 0;
        count2 = 0;
        opend = false;
        dynamic = false;
        state = false;
        $('#liquid-desc').removeClass('on');
    }
    getParameter = {
        radiusTop : 0,
        radiusBtm : 150,
        height : 200,
        thetaLength : Math.PI/180,
        clear : 5
    };
    oriParameter = {
        radiusTop : 0,
        radiusBtm : 150,
        thetaLength : Math.PI/180,
        height : 200,
        clear : 5
    };
    resetPart();
    if(threeCone.paraText.length>0){
        for(var i=0; i<threeCone.paraText.length; i++){
            scene.remove(threeCone.paraText[i]);
        }
    }
    if(threeCone.circle1){
        scene.remove(threeCone.circle1);
    }
    if(threeCone.torus){
        scene.remove(threeCone.torus);
    }
    if(threeCone.lineDash1){
        scene.remove(threeCone.lineDash1);
    }


    count1 = 0;
    count2 = 0;
    opend = false;
    dynamic = false;
    state = false;
    threeCone.init();
    calculate();
    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('' +'off');
    camera.position.set(0, 700, 700);
}
function dynamicEve(){
    if(state){
        return;
    }
    $('#liquid-desc').addClass('on');
    opend = !opend;
    dynamic = !dynamic;
    state = !state;
    if(opend) {
        threeCone.createCircleOpend();
    }
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
    $('.turnRight').on('touchstart',clickEve1);
}



