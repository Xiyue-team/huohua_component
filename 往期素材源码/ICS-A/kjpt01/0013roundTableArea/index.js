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
    radiusTop : 50,
    radiusBtm : 100,
    thetaLength : Math.PI/180,
    widthLength : 1,
    height : 150,
    clear : 5
};
var oriParameter = {
    radiusTop : 50,
    radiusBtm : 100,
    thetaLength : Math.PI/180,
    widthLength : 1,
    height : 150,
    clear : 5
};
var opend = false;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var dynamic = false;
var state = false;
var axis = false,timg;

var threeRound={
    axis:new THREE.Object3D(),
    axi:null,
    circleLines:[],
    circleLinesOpend:[],
    paraText:[],
    lines:[],
    init:function(){
        threeRound.createMesh();
        threeRound.createCircle();
        threeRound.createGrid();
        threeRound.labelAxis(50,50,550);
        threeRound.createAxis();
        scene.remove(threeRound.grid);
        threeRound.grid =null;
        threeRound.axi = new THREE.AxisHelper(550);
    },
    createMesh:function(){
        if(threeRound.mesh){
            scene.remove(threeRound.mesh);
        }
        // if(getParameter.radiusTop>getParameter.radiusBtm){
        //     getParameter.radiusTop = getParameter.radiusBtm;
        // }
        var materialRou = new THREE.MeshBasicMaterial({color : '#F39800', transparent:true, opacity:0.3});
        var rouGeo = new THREE.CylinderGeometry( getParameter.radiusTop, getParameter.radiusBtm, getParameter.height, 64, 64);
        threeRound.mesh = new THREE.Mesh( rouGeo, materialRou );
        threeRound.mesh.position.y = getParameter.height/2;
        scene.add(threeRound.mesh);
    },
    createCircle:function(){
        if(threeRound.circleLines.length){
            for(var i=0;i<threeRound.circleLines.length;i++){
                scene.remove(threeRound.circleLines[i]);
            }
            threeRound.circleLines=[];
        }
        var geometryLine1 =new THREE.Geometry(), geometryLine2 = new THREE.Geometry();
        var vertices1 =[], vertices2 =[];
        for(i=0;i<73;i++){
            vertices1.push(new THREE.Vector3(getParameter.radiusTop*Math.cos(i*5*Math.PI/180),0,getParameter.radiusTop*Math.sin(i*5*Math.PI/180)));
            vertices2.push(new THREE.Vector3(getParameter.radiusBtm*Math.cos(i*5*Math.PI/180),0,getParameter.radiusBtm*Math.sin(i*5*Math.PI/180)));
        }
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800', side:THREE.DoubleSide}));
        var lineMesh2 = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800', side:THREE.DoubleSide}));
        lineMesh1.position.y = getParameter.height;
        scene.add(lineMesh1);
        scene.add(lineMesh2);
        threeRound.circleLines.push(lineMesh1);
        threeRound.circleLines.push(lineMesh2);
    },
    createCircleOpend:function(){
        if(threeRound.circle1){
            scene.remove(threeRound.circle1);
        }
        if(threeRound.circle2){
            scene.remove(threeRound.circle2);
        }
        var materialCir = new THREE.MeshBasicMaterial({color : '#F39800', side:THREE.DoubleSide});
        var cirGeo1 = new THREE.CircleGeometry(getParameter.radiusTop, 64);
        var cirGeo2 = new THREE.CircleGeometry(getParameter.radiusBtm, 64);
        threeRound.circle1 = new THREE.Mesh(cirGeo1, materialCir);
        threeRound.circle2 = new THREE.Mesh(cirGeo2, materialCir);
        threeRound.circle1.position.y = getParameter.height;
        threeRound.circle1.rotation.x = Math.PI/2;
        threeRound.circle2.rotation.x = Math.PI/2;
        scene.add(threeRound.circle1);
        scene.add(threeRound.circle2);
    },
    circleOpend:function(){
        if(count1>90){
            var l = Math.sqrt(Math.pow((getParameter.radiusBtm - getParameter.radiusTop),2)+Math.pow(getParameter.height,2));
            threeRound.circle1.position.y = l + getParameter.radiusTop;
            threeRound.circle1.position.z = -getParameter.radiusBtm ;
            if(getParameter.radiusTop == getParameter.radiusBtm){
                threeRound.createPlan();
                threeRound.planOpend();
            }else{
                threeRound.createTorus();
                threeRound.torusOpend();
            }
            opend = false;
            return;
        }
        if(canWebgl){
            count1++;
        }else{
            count1 += 3;
        }
        var y1,y2,z1,z2;
        var arc=count1*Math.PI/180;
        y1 = getParameter.radiusTop*Math.sin(arc);
        y2 = getParameter.radiusBtm*Math.sin(arc);
        z1 = getParameter.radiusTop-getParameter.radiusTop*Math.cos(arc);
        z2 = getParameter.radiusBtm-getParameter.radiusBtm*Math.cos(arc);
        threeRound.circle1.rotation.x = Math.PI/2 - arc;
        threeRound.circle2.rotation.x = Math.PI/2 + arc;
        threeRound.circle1.position.set(0, getParameter.height+y1, -z1);
        threeRound.circle2.position.set(0, -y2, -z2);
    },
    createTorus:function(){
        if(threeRound.torus){
            scene.remove(threeRound.torus);
        }
        var c1 = 2*Math.PI*getParameter.radiusTop;
        var c2 = 2*Math.PI*getParameter.radiusBtm;
        var l = Math.sqrt(Math.pow((getParameter.radiusBtm - getParameter.radiusTop),2)+Math.pow(getParameter.height,2));
        var r = l*c2/(c2-c1);
        var c3 = 2*Math.PI*r;
        threeRound.angle = c2/c3*Math.PI*2;
        var material = new THREE.MeshBasicMaterial({color : '#F39800', side:THREE.DoubleSide});
        var torusGeo = new THREE.TorusGeometry(r-l/2, l/2, 2, 32, getParameter.thetaLength);
        threeRound.torus = new THREE.Mesh(torusGeo,material);
        threeRound.torus.rotation.x = Math.PI;
        threeRound.torus.rotation.z = Math.PI/2 ;
        threeRound.torus.position.y = r;
        threeRound.torus.position.z = -getParameter.radiusBtm;
        scene.add(threeRound.torus);
    },
    torusOpend:function(){
        function inc(){
            if(count2*Math.PI/180 > threeRound.angle){
                clearInterval(timg);
                threeRound.createParaText();
                threeRound.createLines();
                scene.remove(threeRound.mesh);
                for(var i=0;i<threeRound.circleLines.length;i++){
                    scene.remove(threeRound.circleLines[i]);
                }
                dynamic = !dynamic;
                //$('#liquid-desc').removeClass('on');

                return;
            }
            if(canWebgl){
                count2++;
            }else{
                count2+=3;
            }
            getParameter.thetaLength = Math.PI/180*count2;
            threeRound.createTorus();
            threeRound.torus.rotation.z = Math.PI/2-getParameter.thetaLength/2;
        }
        timg = setInterval(inc,20);
    },
    createPlan:function(){
        if(threeRound.plan){
            scene.remove(threeRound.plan);
        }
        var l = Math.sqrt(Math.pow((getParameter.radiusBtm - getParameter.radiusTop),2)+Math.pow(getParameter.height,2));
        var material = new THREE.MeshBasicMaterial({color : '#F39800', side:THREE.DoubleSide});
        var planGeo = new THREE.PlaneGeometry(getParameter.widthLength,l);
        threeRound.plan = new THREE.Mesh(planGeo,material);
        threeRound.plan.position.y = getParameter.height/2;
        threeRound.plan.position.z = -getParameter.radiusBtm;
        scene.add(threeRound.plan);
    },
    planOpend:function(){
        var c1 = 2*Math.PI*getParameter.radiusTop;
        function inc(){
            if(count3 > c1){
                clearInterval(a);
                threeRound.createParaText();
                threeRound.createLines();
                scene.remove(threeRound.mesh);
                for(var i=0;i<threeRound.circleLines.length;i++){
                    scene.remove(threeRound.circleLines[i]);
                }

                dynamic = !dynamic;
                return;
            }
            if(canWebgl){
                count3 ++;
            }else{
                count3 += 3;
            }

            getParameter.widthLength = count3;
            threeRound.createPlan();
        }
        var a = setInterval(inc,5);
    },
    createParaText:function(){
        var c1 = 2*Math.PI*getParameter.radiusTop;
        var c2 = 2*Math.PI*getParameter.radiusBtm;
        var l = Math.sqrt(Math.pow((getParameter.radiusBtm - getParameter.radiusTop),2)+Math.pow(getParameter.height,2));
        var r = l*c2/(c2-c1);
        var r1 = r - l/2;
        var c3 = 2*Math.PI*r;
        var angle = c2/c3*Math.PI;
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        textStyle = {align: textAlign.center, font: '48px Cambria Math', fillStyle: 'black', antialias: true};
        var text1 = new SpriteText2D("r '", textStyle);
        text1.material.depthTest = false;
        text1.rotation = camera.rotation;
        text1.position.x = getParameter.radiusTop/2;
        text1.position.y = l + getParameter.radiusTop;
        text1.position.z = -getParameter.radiusBtm+20;
        scene.add(text1);
        threeRound.paraText.push(text1);
        var text2 = new SpriteText2D("2πr '", textStyle);
        text2.material.depthTest = false;
        text2.rotation = camera.rotation;
        text2.position.x = 0;
        text2.position.y = l ;
        text2.position.z = -getParameter.radiusBtm+20;
        scene.add(text2);
        threeRound.paraText.push(text2);
        var text3 = new SpriteText2D("2πr", textStyle);
        text3.material.depthTest = false;
        text3.rotation = camera.rotation;
        text3.position.x = 0;
        text3.position.y = 20 ;
        text3.position.z = -getParameter.radiusBtm+20;
        scene.add(text3);
        threeRound.paraText.push(text3);
        var text4 = new SpriteText2D("r", textStyle);
        text4.material.depthTest = false;
        text4.rotation = camera.rotation;
        text4.position.x = getParameter.radiusBtm/2;
        text4.position.y = -getParameter.radiusBtm+20 ;
        text4.position.z = -getParameter.radiusBtm+20;
        scene.add(text4);
        threeRound.paraText.push(text4);
        var text5 = new SpriteText2D("l", textStyle);
        text5.material.depthTest = false;
        text5.rotation = camera.rotation;
        text5.position.x = r1*Math.sin(angle)+20;
        text5.position.y = r - r1*Math.cos(angle)+20;
        text5.position.z = -getParameter.radiusBtm + 20;
        scene.add(text5);
        threeRound.paraText.push(text5);
    },
    createLines:function(){
        if(threeRound.lines.length>0){
            for(var i=0;i<threeRound.lines.length;i++){
                scene.remove(threeRound.lines[i]);
            }
        }
        var l = Math.sqrt(Math.pow((getParameter.radiusBtm - getParameter.radiusTop),2)+Math.pow(getParameter.height,2));
        var material = new THREE.LineDashedMaterial({color:0x000000,side:THREE.DoubleSide, dashSize:8, gapSize:8,scale:1});
        var lineDash1 = new THREE.Geometry(), lineDash2 = new THREE.Geometry();
        lineDash1.computeLineDistances();
        lineDash2.computeLineDistances();

        lineDash1.vertices.push(threeRound.vec3(0, l + getParameter.radiusTop, -getParameter.radiusBtm+5));
        lineDash1.vertices.push(threeRound.vec3(getParameter.radiusTop, l + getParameter.radiusTop, -getParameter.radiusBtm));

        lineDash2.vertices.push(threeRound.vec3(0, -getParameter.radiusBtm, -getParameter.radiusBtm));
        lineDash2.vertices.push(threeRound.vec3(getParameter.radiusBtm, -getParameter.radiusBtm, -getParameter.radiusBtm));

        threeRound.lineDash1 = new THREE.Line(lineDash1, material);
        threeRound.lineDash1.material.depthTest = false;
        threeRound.lineDash2 = new THREE.Line(lineDash2, material);
        threeRound.lineDash2.material.depthTest = false;
        scene.add(threeRound.lineDash1);
        scene.add(threeRound.lineDash2);
        threeRound.lines.push(threeRound.lineDash1,threeRound.lineDash2);
    },
    labelAxis:function (start, stepSize, stop) {
        if(threeRound.axis.length>0){
            for(var i=0; i<threeRound.axis.length; i++){
                scene.remove(threeRound.axis[i]);
            }
        }
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
            threeRound.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeRound.axis.add(text);
        // label z axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeRound.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeRound.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeRound.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeRound.axis.add(text);
    },
    createAxis:function(){
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        geom1.vertices.push(threeRound.vec3(0,0,0),threeRound.vec3(550,0,0));
        geom2.vertices.push(threeRound.vec3(0,0,0),threeRound.vec3(0,550,0));
        geom3.vertices.push(threeRound.vec3(0,0,0),threeRound.vec3(0,0,550));
        var material1 = new THREE.LineBasicMaterial({color:0xff0000});
        var material2 = new THREE.LineBasicMaterial({color:0x00ff00});
        var material3 = new THREE.LineBasicMaterial({color:0x0000ff});
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material2);
        var line3 = new THREE.Line(geom3,material3);
        threeRound.axis.add(line1,line2,line3);
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createGrid:function(){
        if(threeRound.grid){
            scene.remove(threeRound.grid);
        }
        var geometry = new THREE.Geometry();
        var lineMaterial = new THREE.LineBasicMaterial({color : 0x949494, transparent: true, opacity: 0.5});
        var size = 500, bottom = -0.001, step = 20;
        for(var i = 0; i< 51; i ++){
            geometry.vertices.push(threeRound.vec3(-size, bottom, i*step-size));
            geometry.vertices.push(threeRound.vec3(size, bottom, i*step-size));
            geometry.vertices.push(threeRound.vec3(i*step-size, bottom, -size));
            geometry.vertices.push(threeRound.vec3(i*step-size, bottom, size));
        }
        threeRound.grid = new THREE.LineSegments(geometry, lineMaterial);
        scene.add(threeRound.grid);
    },
    createControls:function(){
        threeRound.controls = new THREE.OrbitControls( camera, renderer.domElement );
        //threeRound.controls.addEventListener( 'change', renderer );
        threeRound.controls.enableDamping = true;
        threeRound.controls.dampingFactor = 0.25;
        threeRound.controls.enableZoom = true;
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
renderer.setSize(threeWidth,threeHeight);
$obj.append(renderer.domElement);
var scene = new THREE.Scene();
scene.position.y = -200;
var camera = new THREE.PerspectiveCamera(45, threeWidth/threeHeight, 0.1, 10000);
camera.position.set(0, 600, 800);
camera.lookAt(new THREE.Vector3(0, 0, 0));
// scene.add(camera);
threeRound.init();
threeRound.createControls();


//重置事件
function renderAll(){
    threeRound.controls.update();

    

    if(opend){
        threeRound.circleOpend();
    }
    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();
var s = 4;
var flag = 0;

$('#slider1').change(function(){
    if(state){
        clearInterval(timg);
        opend = false;
        dynamic = false;
        state = false;
        count1 = 0;
        count2 = 0;
        count3 = 0;
        if(threeRound.circle1){
            scene.remove(threeRound.circle1);
        }
        if(threeRound.circle2){
            scene.remove(threeRound.circle2);
        }
        if(threeRound.torus){
            scene.remove(threeRound.torus);
        }
        if(threeRound.plan){
            scene.remove(threeRound.plan);
        }
        if(threeRound.lines.length>0){
            for(var i=0;i<threeRound.lines.length;i++){
                scene.remove(threeRound.lines[i]);
            }
        }
        if(threeRound.paraText.length>0){
            for(var i=0; i<threeRound.paraText.length; i++){
                scene.remove(threeRound.paraText[i]);
            }
        }
        $('#liquid-desc').removeClass('on');
    }
    var result = $(this).val();
    var split = result.split(';');
    var value = parseInt(split[0].split('|')[0]),realV;
    var value2 = parseInt(split[1].split('|')[0]);

    if(value > value2){
        value = value2;
        flag = true;
        var left = parseInt($('.slider1 .xdsoft_range2dslider_runner1').css('left'));
        left-=42*(value-value2);
        $('.slider1 .xdsoft_range2dslider_runner0').css('left',left+'px');
        $(this).range2DSlider({
            template:'horizontal',
            value:[[value,0],[value2,0]],
            width:420,
            showLegend:false,
            round:true,
            axis:[[1,10]]
        });

    }


    getParameter.radiusTop = value*50;
    getParameter.radiusBtm = value2*50;

    oriParameter.radiusBtm = getParameter.radiusBtm;
    oriParameter.radiusTop = getParameter.radiusTop;
    threeRound.createMesh();
    threeRound.createCircle();
    calculate();
});
$('#slider3').change(function(){
    if(state){
        clearInterval(timg);
        opend = false;
        dynamic = false;
        state = false;
        count1 = 0;
        count2 = 0;
        count3 = 0;
        if(threeRound.circle1){
            scene.remove(threeRound.circle1);
        }
        if(threeRound.circle2){
            scene.remove(threeRound.circle2);
        }
        if(threeRound.torus){
            scene.remove(threeRound.torus);
        }
        if(threeRound.plan){
            scene.remove(threeRound.plan);
        }
        if(threeRound.lines.length>0){
            for(var i=0;i<threeRound.lines.length;i++){
                scene.remove(threeRound.lines[i]);
            }
        }
        if(threeRound.paraText.length>0){
            for(var i=0; i<threeRound.paraText.length; i++){
                scene.remove(threeRound.paraText[i]);
            }
        }
        $('#liquid-desc').removeClass('on');
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    getParameter.height = value*50;
    threeRound.createMesh();
    threeRound.createCircle();
    oriParameter.height = getParameter.height;
    calculate();
});

//表面积计算
function calculate(){
    var l,s;
    l = Math.sqrt(Math.pow((getParameter.radiusBtm/50 - getParameter.radiusTop/50),2)+Math.pow(getParameter.height/50,2));
    s = Math.PI*(Math.pow(getParameter.radiusTop/50,2)+Math.pow(getParameter.radiusBtm/50,2)+(getParameter.radiusTop/50+getParameter.radiusBtm/50)*l);
    $('.muxian').text(l.toFixed(2));
    $('#surarea-num').text(s.toFixed(2));
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
    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[1,0],[2,0]],
        width:410,
        showLegend:false,
        round:true,
        axis:[[1,10]],
        printLabel:function(val){
            return parseInt(val[0]);
        }
    });

    $('.slider2').find('.sliderLeft').css({'width':'0px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider2').find('.xdsoft_slider_label').text('1');
    $('#slider2').attr('value',''+1+'|0');

    $('.slider3').find('.sliderLeft').css({'width':'91px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'91px'});
    $('.slider3').find('.xdsoft_slider_label').text('3');
    $('#slider3').attr('value',''+3+'|0');
    calculate()
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
        clearInterval(timg);
        opend = false;
        dynamic = false;
        state = false;
        count1 = 0;
        count2 = 0;
        count3 = 0;
        if(threeRound.circle1){
            scene.remove(threeRound.circle1);
        }
        if(threeRound.circle2){
            scene.remove(threeRound.circle2);
        }
        if(threeRound.torus){
            scene.remove(threeRound.torus);
        }
        if(threeRound.plan){
            scene.remove(threeRound.plan);
        }
        if(threeRound.lines.length>0){
            for(var i=0;i<threeRound.lines.length;i++){
                scene.remove(threeRound.lines[i]);
            }
        }
        if(threeRound.paraText.length>0){
            for(var i=0; i<threeRound.paraText.length; i++){
                scene.remove(threeRound.paraText[i]);
            }
        }
        $('#liquid-desc').removeClass('on');
    }
    getParameter = {
        radiusTop : 50,
        radiusBtm : 100,
        height : 150,
        clear : 5
    };
    oriParameter = {
        radiusTop : 50,
        radiusBtm : 100,
        height : 150,
        clear : 5
    };
    resetPart();
    if(threeRound.paraText.length>0){
        for(var i=0; i<threeRound.paraText.length; i++){
            scene.remove(threeRound.paraText[i]);
        }
    }
    if(threeRound.circle1){
        scene.remove(threeRound.circle1);
    }
    if(threeRound.circle2){
        scene.remove(threeRound.circle2);
    }
    if(threeRound.torus){
        scene.remove(threeRound.torus);
    }
    if(threeRound.plan){
        scene.remove(threeRound.plan);
    }
    if(threeRound.lines.length>0){
        for(var i=0;i<threeRound.lines.length;i++){
            scene.remove(threeRound.lines[i]);
        }
    }
    count1 = 0;
    count2 = 0;
    count3 = 0;
    opend = false;
    dynamic = false;
    state = false;

    threeRound.createMesh();
    threeRound.createCircle();

    getParameter.thetaLength =Math.PI/180;


    camera.position.set(0, 600, 800);

    calculate();
}
function dynamicEve(){
    if(state){
        return;
    }
    opend = !opend;
    dynamic = !dynamic;
    state = !state;
    $('#liquid-desc').addClass('on');
    if(opend) {
        threeRound.createCircleOpend();
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



