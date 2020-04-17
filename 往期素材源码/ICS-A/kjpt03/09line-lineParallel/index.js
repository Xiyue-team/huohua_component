/**
 * Created by O2 on 2016/9/6.
 */

var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
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
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scale);
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
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 200)/2;
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
var l = 800;
var w = 500;
var h = 150;
var radius = 300;
var angle = 45;
var flag1 = false;
var a = null;
var dynamic = false;

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
        this.camera.position.x = 800;
        this.camera.position.y = 600;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createPlane1();
        this.createFixedText();
        this.createLine();
        this.createDynaText();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =true;
        this.controls.enablePan =false;
    };

    this.createFixedText = function(){
        var bt = text("γ",30,"#000000");
        var af = text("α",30,"#000000");

        bt.position.set(-l/2+30,190,w/2-30);
        af.position.set(-l/2+30,-110,w/2-30);
        this.scene.add(bt,af);
    };
    this.createDynaText = function(){
        this.gm = text("γ",30,"#000000");
        this.l2 = text("l2",30,"#000000");
        this.l1 = text("l1",30,"#000000");
        this.gm.position.set(20,w,0);

        this.l2.position.set(h,h,w/2+30);
        this.l1.position.set(-h,-h,w/2+30);
    };

    this.createPlane1 = function(){
        var material1 = new THREE.MeshBasicMaterial({color:0x60b5f1,transparent:true,opacity:0.8,side:THREE.DoubleSide});
        var material2 = new THREE.MeshBasicMaterial({color:0xaadfdf,transparent:true,opacity:0.8,side:THREE.DoubleSide});
        var plane1 = new THREE.PlaneGeometry(l,w);
        var plane2 = new THREE.PlaneGeometry(l,w);
        var mesh1 = new THREE.Mesh(plane1,material1);
        var mesh2 = new THREE.Mesh(plane2,material2);
        mesh1.rotation.x = Math.PI/2;
        mesh2.rotation.x = Math.PI/2;
        mesh1.position.set(0,-h,0);
        mesh2.position.set(0,h,0);
        this.scene.add(mesh1,mesh2);
    };
    this.createPlane2 = function(n){
        this.scene.remove(this.plane);
        var material = new THREE.MeshBasicMaterial({color:0xe2d96b,transparent:true,opacity:0.8,side:THREE.DoubleSide});
        var plane = new THREE.PlaneGeometry(w,n);
        this.plane = new THREE.Mesh(plane,material);

        this.plane.rotation.y = Math.PI/4;
        this.plane.rotation.x = Math.PI/2;
        this.plane.rotation.z = Math.PI/2;
        this.scene.add(this.plane);
    };
    this.createLine = function(){
        var vertices1 = [],vertices2 = [];
        vertices2.push(vec3(h,h,w/2),vec3(h,h,-w/2));
        vertices1.push(vec3(-h,-h,w/2),vec3(-h,-h,-w/2));
        this.line2 = createLineMesh(vertices2,0x000000,3);
        this.line1 = createLineMesh(vertices1,0x000000,3);
        //this.scene.add(this.line1,this.line2);
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
}
function text(font,size,color){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
    var text = new SpriteText2D(font, textStyle);
    return text;
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
    $('#slider1').attr('value','45|0');
    $('.slider1 .sliderLeft').css('width','0');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','0');

    clearInterval(a);
    three.scene.remove(three.plane,three.line1,three.line2,three.l1,three.l2);
    three.line1.position.x = 0;
    three.line2.position.x = 0;
    three.l1.position.x = -h;
    three.l2.position.x = h;
}

$("#slider1").change(function(){
    if(dynamic){
        return false;
    }
    var para = parseInt($(this).val());
    angle = para;
    three.plane.rotation.y = Math.PI/180*angle;
    var x1 = w*Math.cos(Math.PI/4);
    three.gm.position.x = x1+20;

    var x2 = h/Math.tan(Math.PI/180*angle);
    three.line2.position.x = x2-h;
    three.l2.position.x = x2;

    three.line1.position.x = -x2+h;
    three.l1.position.x = -x2;
});

var bt1;
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        //$(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
    if(!flag1){
        angle = 45;
        dynamic = !dynamic;
        var n = 0;
        a = setInterval(function(){
            if(n>1000){
                clearInterval(a);
                dynamic = !dynamic;
                bt1= text("β",30,"#000000");
                bt1.position.set(0,0,w/2-30);
                three.scene.add(bt1);
                return false;
            }
            three.createPlane2(n);
            var x1 = w*Math.cos(Math.PI/180*angle);
            var x2 = n/2*Math.cos(Math.PI/180*angle);
            three.plane.position.set(x1-x2,x1-x2,0);
            three.scene.add(three.plane);

            if(n == 280){
                three.scene.add(three.line2,three.l2);
            }
            if(n == 720){
                three.scene.add(three.line1,three.l1);
            }

            n+=20;
        },40);
    }else{
        three.scene.remove(bt1)
        returnRange();
    }
    flag1 = !flag1;
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
function renew(){
    angle = 45;
    flag1 = false;
    three.scene.remove(bt1)
    $("#div1,#div2,#div3").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    returnRange();
}
if(isMob){
	$("#renew").on('touchstart',renew);
	$('#div1').on('touchstart',clickEve1);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$("#renew").on('click',renew);
	$('#div1').on('click',clickEve1);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

