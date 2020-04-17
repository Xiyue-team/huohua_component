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
var l = 350;
var radius = 80;
var angle = 60;
var k=0;
var a = null;

var angle2 = 60;
var r2 = radius;


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
    })();console.log(canWebgl)

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
        drawAxisArrow(vec3( -450, 0, 0 ), vec3( 450, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -450, 0 ), vec3( 0, 450, 0 ), 0x000000,2);
        this.scene.add(axisArrow);
    };

    this.createFixedText = function(){
        var x = text("x",30,"#000000");
        var y = text("y",30,"#000000");
        var o = text("O",30,"#000000");

        x.position.set(450,-5,0);
        y.position.set(-15,450,0);
        o.position.set(-15,-10,0);

        this.scene.add(x,y,o);
    };
    this.createLine = function(angle){
        this.scene.remove(this.line);
        var vertices = [],x=0,y=0;
        vertices.push(vec3(0,0,0));
        x = l*Math.cos(Math.PI/180*(angle));
        y = l*Math.sin(Math.PI/180*(angle));
        vertices.push(vec3(x,y,0));
        this.line = createLineMesh(vertices,0xff0000,3);
        this.scene.add(this.line);

        this.createCir();
        this.createAf();
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
        this.scene.remove(this.circle);
        var vertices = [],x=0,y=0;
        var ang = angle;
        var i=0;
        var r = radius;

        if(k>0 || k==0){
            a = setInterval(function(){
                if(i>360*k){
                    clearInterval(a);
                    return;
                }
                thiz.scene.remove(thiz.circle);
                x = Math.floor(r*Math.cos(Math.PI/180*(ang+i)));
                y = Math.floor(r*Math.sin(Math.PI/180*(ang+i)));
                vertices.push(vec3(x,y,0));
                thiz.circle = createLineMesh(vertices,0x1161c8,3);
                thiz.scene.add(thiz.circle);
                three.createLine(ang+i);
                r+=2;
                i+=10;
            },25);
        }else{
            a = setInterval(function(){
                if(i<360*k){
                    clearInterval(a);
                    return;
                }
                thiz.scene.remove(thiz.circle);
                x = r*Math.cos(Math.PI/180*(ang+i+360*(-k)));
                y = r*Math.sin(Math.PI/180*(ang+i+360*(-k)));
                vertices.push(vec3(x,y,0));
                thiz.circle = createLineMesh(vertices,0x1161c8,3);
                thiz.scene.add(thiz.circle);
                three.createLine(angle+i+360*(-k));
                r+=2;
                i-=10;
            },25);
        }
    };


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
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

$("#slider1").change(function(){
    var para = parseInt($(this).val())*5;
    if(para == angle){
        return;
    }
    three.scene.remove(three.circle);
    clearInterval(a);
    //var para = parseInt($(this).val())*5;
    angle = para;
    three.createLine(angle);
    three.createCircle();
});
$("#slider2").change(function(){
    var para = Math.round(parseFloat($(this).val()));
    if(para == k){
        return;
    }
    three.scene.remove(three.circle);
    clearInterval(a);

    k = para;
    three.createCircle();
});

//重置
function returnRange(){
    $('#slider1').attr('value','12|0');
    $('.slider1 .sliderLeft').css('width','239px');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','239px');
    $('.slider1 .xdsoft_slider_label').text("60°");

    $('#slider2').attr('value','0|0');
    $('.slider2 .sliderLeft').css('width','205px');
    $('.slider2 .xdsoft_range2dslider_runner ').css('left','205px');
    $('.slider2 .xdsoft_slider_label').text(0);

    angle = 60;
    k=0;
    $("#div1").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");

    three.createLine(angle);
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
        //$(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
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
    $('#div1').on('touchstart',clickEve1);
    $("#renew").on('touchstart',returnRange);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    $('#div1').on('click',clickEve1);
    $("#renew").on('click',returnRange);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}


