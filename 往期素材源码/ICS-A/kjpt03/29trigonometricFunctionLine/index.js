/**
 * Created by O2 on 2016/9/6.
 */

var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth==370 && bodyHeight==246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scale = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scale,
            left: 33 * scale,
            top: (69 * scale + (bodyHeight - 1200 * scale) / 2 ),
            bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2 )
        });
    // } else {
    //     scale = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scale, left: 33 * scale, top: (69 * scale ), bottom: (69 * scale)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background', '#000');
    $('.zoom').css("zoom", scale);
}

//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});



// 居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();



//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
document.onselectstart=function(){
    return false;
};


//初始参数
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var l = 300;
var radius = 300;
var angle = 60;
var flag1 = false,flag2 = false,flag3 = false;

function ThreeDimensional() {
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;


    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;

    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createAxis();

        this.createFixedText();
        this.createLine();
        this.createCircle();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };
    this.createAxis = function(){
        this.labelAxis(-300,300,300,-300,300,300);
        drawAxisArrow(vec3( -500, 0, 0 ), vec3( 500, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -500, 0 ), vec3( 0, 500, 0 ), 0x000000,2);
        this.scene.add(axisArrow,axis);
    };

    this.createFixedText = function(){
        var x = text("x",30,"#000000");
        var y = text("y",30,"#000000");
        var o = text("O",34,"#000000");

        x.position.set(500,-5,0);
        y.position.set(-15,500,0);
        o.position.set(-15,-10,0);

        this.scene.add(x,y,o);
    };
    this.createM = function(){
        var m = text("M",34,"#0x000000");
        var x = (l+40)*Math.cos(Math.PI/180*angle);
        m.position.set(x,30,0);
        return m;
    };
    this.createRing = function(){
        this.scene.remove(this.ring);
        var material = new THREE.MeshBasicMaterial({color:0x1fca24});
        var ring = new THREE.CircleGeometry(10,16);
        var mesh = new THREE.Mesh(ring,material);
        var x = radius*Math.cos(Math.PI/180*angle);
        var y = radius*Math.sin(Math.PI/180*angle);
        mesh.position.set(x,y,0);
        var p = text("P",34,"#1fca24");
        x = (l+40)*Math.cos(Math.PI/180*angle);
        y = (l+40)*Math.sin(Math.PI/180*angle);
        p.position.set(x,y+17,0);
        this.ring = new THREE.Object3D();
        this.ring.add(mesh,p);
        this.scene.add(this.ring);
    };
    this.createLine = function(){
        this.scene.remove(this.line);
        var vertices = [],x=0,y=0;
        vertices.push(vec3(0,0,0));
        x = l*Math.cos(Math.PI/180*angle);
        y = l*Math.sin(Math.PI/180*angle);
        vertices.push(vec3(x,y,0));
        this.line = createLineMesh(vertices,0x1161c8,3);
        this.scene.add(this.line);

        this.createCir();
        this.createAf();
        this.createSin();
        this.createCos();
        this.createTan();
        this.createRing();
    };
    this.createCir =function(){ //角
        this.scene.remove(this.cir);
        var vertices = [],x=0,y=0;
        if(angle > 0){
            for(var i=0;i<angle;i++){
                x = 30*Math.cos(Math.PI/180*i);
                y = 30*Math.sin(Math.PI/180*i);
                vertices.push(vec3(x,y,0));
            }
        }else if(angle == 0){
            return;
        }else{
            var angle1 = 360+angle;
            for(var i=360;i>angle1;i--){
                x = 30*Math.cos(Math.PI/180*i);
                y = 30*Math.sin(Math.PI/180*i);
                vertices.push(vec3(x,y,0));
            }
        }

        this.cir = createLineMesh(vertices,0x1161c8,3);
        this.scene.add(this.cir);
    };
    this.createAf = function(){
        this.scene.remove(this.af);
        if(angle > 0){
            var x = 50*Math.cos(Math.PI/180*angle/2);
            var y = 50*Math.sin(Math.PI/180*angle/2)+15;
        }else{
            var angle1 = 360+angle;
            x = -50*Math.cos(Math.PI/180*angle1/2);
            y = -(50*Math.sin(Math.PI/180*angle1/2)-15);
        }

        this.af = text("α",30,"#000000");
        this.af.position.set(x,y,0);
        this.scene.add(this.af);
    };
    this.createCircle = function(){
        var vertices = [],x=0,y=0;
        for(var i=0;i<73;i++){
            x = radius*Math.cos(Math.PI/180*i*5);
            y = radius*Math.sin(Math.PI/180*i*5);
            vertices.push(vec3(x,y,0));
        }

        this.circle = createLineMesh(vertices,0x1161c8,3);
        this.scene.add(this.circle);
    };

    this.createSin = function(){
        this.scene.remove(this.sin);
        this.sin = null;
        var vertices = [];
        var x = l*Math.cos(Math.PI/180*angle);
        var y = l*Math.sin(Math.PI/180*angle);
        vertices.push(vec3(x,y,0),vec3(x,0,0));
        var line = createLineMesh(vertices,0xff0000,3);

        vertices[0].z = -2;vertices[1].z = -2;
        vertices.push(vec3(0,0,-2));
        var triangle = cretaeTriangleFace(vertices,0xe2d96b);

        var m = this.createM();

        this.sin = new THREE.Object3D();
        this.sin.add(line,triangle,m);
        //this.scene.add(this.sin);
    };
    this.createCos = function(){
        this.scene.remove(this.cos);
        this.cos = null;
        var vertices = [];
        var x = l*Math.cos(Math.PI/180*angle);
        var y = l*Math.sin(Math.PI/180*angle);
        /*vertices.push(vec3(x,0,0),vec3(0,0,0));
        var line = createLineMesh(vertices,0xff0000,3);

        vertices[0].z = -2;vertices[1].z = -2;
        vertices.push(vec3(x,y,-2));
        var triangle = cretaeTriangleFace(vertices,0x60b5f1);*/

        vertices.push(vec3(x,0,-2),vec3(0,0,-2),vec3(x,y,-2));
        var triangle = cretaeTriangleFace(vertices,0x60b5f1);

        vertices = [];
        vertices.push(vec3(x,0,0),vec3(0,0,0));
        var line = createLineMesh(vertices,0xff0000,3);

        var m = this.createM();

        this.cos = new THREE.Object3D();
        this.cos.add(line,triangle,m);
        //this.scene.add(this.cos);
    };
    this.createTan = function(){
        this.scene.remove(this.tan);
        this.tan = null;
        var vertices = [];

        if(angle>90 && angle<270 || angle == 270){
            var x = -radius;
            var y = -radius*Math.tan(Math.PI/180*angle);
        }else{
            x = radius;
            y = radius*Math.tan(Math.PI/180*angle);
        }

        vertices.push(vec3(x,y,0),vec3(x,0,0));
        var line = createLineMesh(vertices,0xff0000,3);

        vertices[0].z = -2;vertices[1].z = -2;
        vertices.push(vec3(0,0,-2));
        var triangle = cretaeTriangleFace(vertices,0xaadfdf);

        var t = text("T",34,"#0x000000");
        var a = text("A",34,"#0x000000");

        t.position.set(x,y+34,0);
        a.position.set(x+20,17,0);

        this.tan = new THREE.Object3D();
        this.tan.add(line,triangle,t,a);
        //this.scene.add(this.tan);
    };


    function cretaeTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.8});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function createLineMesh(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-1,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-1,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }

    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function text(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        return text;
    }
    function drawAxisArrow(origin, dir, _color,style){
        var vertices = [];

        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }
    }
    this.labelAxis = function(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            if(i==0){
                continue;
            }
            text = new SpriteText2D(i/stepSizex, textStyle);

            text.position.x = i;
            text.position.y = -10;

            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSizey, textStyle);
            text.position.x = -20;
            text.position.y = i;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    };
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();

    if(flag1){
        three.scene.add(three.sin);
    }else{
        three.scene.remove(three.sin);
    }
    if(flag2){
        three.scene.add(three.cos);
    }else{
        three.scene.remove(three.cos);
    }
    if(flag3){
        three.scene.add(three.tan);
    }else{
        three.scene.remove(three.tan);
    }

    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

$("#slider1").change(function(){
    var para = parseInt($(this).val())*5;
    angle = para;
    three.createLine();
});

//重置
function returnRange(){
    $('#slider1').attr('value','12|0');
    $('.slider1 .sliderLeft').css('width','68px');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','68px');
    $('.slider1 .xdsoft_slider_label').text("60°");
    angle = 60;
    flag1 = false,flag2 = false,flag3 = false;
    $("#div1,#div2,#div3").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    returnRange();

    three.createLine();
    three.createCircle();
}

//on off
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}

function div1(){
    if(!flag1){
        three.scene.add(three.sin);
        three.scene.remove(three.cos,three.tan);
    }else{
        three.scene.remove(three.sin);
    }
    flag1 = !flag1;
    flag2 = false;
    flag3 = false;
}
function div2(){
    if(!flag2){

        three.scene.remove(three.sin,three.tan);
    }else{
        three.scene.remove(three.cos);
    }
    flag2 = !flag2;
    flag1 = false;
    flag3 = false;
}
function div3(){
    if(!flag3){

        three.scene.remove(three.sin,three.cos);
    }else{
        three.scene.remove(three.tan);
    }
    flag3 = !flag3;
    flag1 = false;
    flag2 = false;
}
function scalef(){
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

if(isMob){
    $('#div1,#div2,#div3').on('touchstart',clickEve1);
    $("#div1").on('touchstart',div1);
    $("#div2").on('touchstart',div2);
    $("#div3").on('touchstart',div3);
    $("#renew").on('touchstart',returnRange);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    $('#div1,#div2,#div3').on('click',clickEve1);
    $("#div1").on('click',div1);
    $("#div2").on('click',div2);
    $("#div3").on('click',div3);
    $("#renew").on('click',returnRange);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}
