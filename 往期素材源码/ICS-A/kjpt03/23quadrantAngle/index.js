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
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 300)/2;
$(".con").css("margin-top",marginTop);



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
var radius = 100;
var l = 300;
var angle = 60;
var flag1 = false,flag2 = false,flag3 = false;
var vert = [];
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();

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

        this.oriCircle();
        this.createArc();
        this.createFixedText();
        this.createDynaText();
        this.createCir();


    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };

    this.createCircle = function(r,style){
        this.scene.remove(this.circle);
        var vertices = [],x=0,y=0;
        for(var i=0;i<73;i++){
            x = r*Math.cos(Math.PI/180*i*5);
            y = r*Math.sin(Math.PI/180*i*5);
            vertices.push(vec3(x,y,0));
        }
        this.circle = createLineMesh(vertices,0x000000,style);
        this.scene.add(this.circle);
    };
    this.oriCircle = function(){
        var vertices = [],x=0,y=0;
        for(var i=0;i<73;i++){
            x = 100*Math.cos(Math.PI/180*i*5);
            y = 100*Math.sin(Math.PI/180*i*5);
            vertices.push(vec3(x,y,0));
        }
        var line = createLineMesh(vertices,0x000000,2);
        line.position.z = -1;

        var material = new THREE.MeshBasicMaterial({color:0x000000});
        var cir1 = new THREE.CircleGeometry(6,16);
        var mesh = new THREE.Mesh(cir1,material);
        mesh.position.z = -1;

        this.createCircle(radius,3);

        this.scene.add(line,mesh);
    };
    this.createArc = function(){
        this.scene.remove(this.arc);
        var x=0,y=0;
        for(var i=0;i<angle;i++){
            x = radius*Math.cos(Math.PI/180*i);
            y = radius*Math.sin(Math.PI/180*i);
            vert.push(vec3(x,y,1));
        }
        if(angle == 360){
            vert[vert.length-1] = vec3(radius,0,1);
        }
        vert.push(vert[vert.length-1],vec3(0,0,1),vec3(radius,0,1));
        this.arc = createLineMesh(vert,0xff0000,3);

        this.scene.add(this.arc);
        this.createDynaText();
        this.createCir();
    };
    this.createFixedText = function(){
        var o = text("O",34,"0x000000");
        o.position.set(-10,-5,0);
        this.scene.add(o);
    };
    this.createDynaText = function(){
        this.scene.remove(this.texts);
        var A = text("A",34,"0x000000");
        var B = text("B",34,"0x000000");
        var l = text("l",34,"0x000000");
        var r = text("r",30,"0x000000");
        var af = text("α",34,"0x000000");

        var x1 = (radius+40)*Math.cos(Math.PI/180*angle);
        var y1 = (radius+40)*Math.sin(Math.PI/180*angle)+17;
        B.position.set(x1,y1,0);

        var x2 = (radius+20)*Math.cos(Math.PI/180*angle/2);
        var y2 = (radius+20)*Math.sin(Math.PI/180*angle/2)+17;
        l.position.set(x2,y2,0);

        r.position.set(radius/2,-2,0);
        A.position.set(radius+40,15,0);

        var x3 = 50*Math.cos(Math.PI/180*angle/2);
        var y3 = 50*Math.sin(Math.PI/180*angle/2)+17;
        af.position.set(x3,y3,0);

        this.texts = new THREE.Object3D();
        this.texts.add(A,B,l,r,af);
        this.scene.add(this.texts);
    };
    this.createCir = function(){
        this.scene.remove(this.cir);
        var vertices = [],x=0,y=0;
        for(var i=0;i<angle;i++){
            x = 30*Math.cos(Math.PI/180*i);
            y = 30*Math.sin(Math.PI/180*i);
            vertices.push(vec3(x,y,0));
        }
        this.cir = createLineMesh(vertices,0x1161c8,3);
        this.scene.add(this.cir);
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
                opacity: 0.9,
                dashSize: 30,
                gapSize: 1
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
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}


//重置
function returnRange(){
    $('#slider1').attr('value','0|0');
    $('.slider1 .sliderLeft').css('width','0px');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','0px');
    $('.slider1 .xdsoft_slider_label').text(1);

    $('#slider2').attr('value','4|0');
    $('.slider2 .sliderLeft').css('width','66px');
    $('.slider2 .xdsoft_range2dslider_runner ').css('left','66px');
    $('.slider2 .xdsoft_slider_label').text(1);

    angle = 60;
    radius = 100;
    flag1 = false,flag2 = false,flag3 = false;
    vert = [];
    $("#div1,#div2,#div3").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");

    three.createArc();
    three.createCir();
    three.createCircle(radius,3);
}

//on off
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
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
};


//slider
$("#slider1").change(function(){
    var para = parseFloat($(this).val().split("|")[0]).toFixed(1);
    radius = para*100;
    three.createCircle(radius,3);
    vert = [];
    three.createArc();
});
$("#slider2").change(function(){
    var para = Math.round(parseFloat($(this).val()));
    if(para == 25){
        para = 6.28;
    }else{
        para = (para*0.25).toFixed(2);
    }
    angle = Math.round(para*180/Math.PI);
    vert = [];
    three.createArc();
});

if(isMob){
	$("#renew").on('touchstart',returnRange);
	$('#div1,#div2,#div3').on('touchstart',clickEve1);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$("#renew").on('click',returnRange);
	$('#div1,#div2,#div3').on('click',clickEve1);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}
