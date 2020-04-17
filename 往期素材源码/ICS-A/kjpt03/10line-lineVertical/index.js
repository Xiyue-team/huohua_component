/**
 * Created by O2 on 2016/9/6.
 */

var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
var isMob = /iPad|Android/g.test(navigator.userAgent),offsetLeft=0,offsetTop=0;
var $body = $("body");
// if(isMob){
    var bodyScale = scale = bodyWidth/1920;
    $('.body').css("zoom",bodyScale).height(1200);
    var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
    $('.body').css("margin-top",'-600px');
    $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
// }else{
//     scale = 0.6667;
//     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
//     $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
// }

offsetLeft = parseInt($('#threeContainer').offset().left);
offsetTop = parseInt($('#threeContainer').offset().top);
$('body').css('background','#000');
$('.zoom').css("zoom",scale);

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
var pointA = $('.circle-a');
var lineA = $('.circle-line');
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
var angle = 0;
var radius = 130;
var flag1 = false;
var a = null;
var dynamic = false;
var zLength = 0;

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
        this.camera.position.y = 200;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createPlane();
        this.createFixedText();
        this.createDynaText();
        this.createLine();

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
        var af = text("α",30,"#000000");
        af.position.set(-l/2+30,50,w/2-30);
        var bt = text("β",30,"#000000");
        bt.position.set(20,l/2,w/2-30);

        var ll = text("l",30,"#000000");
        ll.position.set(0,20,w/2+30);

        this.scene.add(af,bt,ll);
    };
    this.createDynaText = function(){
        this.o = text("O",30,"#000");
        this.a = text("A",30,"#000");
        this.b = text("B",30,"#000");

        this.o.position.set(20,30,0);
        this.b.position.set(20,l*3/10+50,0);
        this.a.position.set(radius+20,30,0);

        //this.scene.add(this.o,this.a,this.b);
    };

    this.createPlane = function(){
        var material1 = new THREE.MeshBasicMaterial({color:0xaadfdf,transparent:true,opacity:0.8,side:THREE.DoubleSide});
        var plane1 = new THREE.PlaneGeometry(l,w);
        var mesh1 = new THREE.Mesh(plane1,material1);
        mesh1.rotation.x = Math.PI/2;

        var material2 = new THREE.MeshBasicMaterial({color:0x60b5f1,transparent:true,opacity:0.8,side:THREE.DoubleSide});
        var plane2 = new THREE.PlaneGeometry(l,w);
        var mesh2 = new THREE.Mesh(plane2,material2);
        mesh2.rotation.x = Math.PI/2;
        mesh2.rotation.y = Math.PI/2;

        this.scene.add(mesh1,mesh2);
    };

    this.createLine = function(){
        var vertices = [];
        vertices.push(vec3(0,1,w/2),vec3(0,1,-w/2));
        this.linel = createLineMesh(vertices,0x000000,3);
        this.scene.add(this.linel);
    };
    this.createLineb = function(n){
        this.scene.remove(this.lineb);
        var vertices = [];
        vertices.push(vec3(1,l*3/10,0),vec3(1,n,0));
        this.lineb = createLineMesh(vertices,0xffff00,3);
        this.scene.add(this.lineb);
    };
    this.createLinea = function(n){
        this.scene.remove(this.linea);
        var vertices = [];
        vertices.push(vec3(0,1,0),vec3(n,1,0));
        this.linea = createLineMesh(vertices,0xff0000,3);
        this.scene.add(this.linea);
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
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

var pointa = {
    x1:0,
    x2:0,
    z1:0,
    z2:0
};

$("#slider1").change(function(){
    if(dynamic){
        return false;
    }
    var para = parseInt($(this).val())*10;
    zLength = para;
    three.lineb.position.z = zLength;
    three.linea.position.z = zLength;
    three.o.position.z = zLength;
    three.a.position.z = para+pointa.z1;
    three.b.position.z = zLength;
});
$("#slider2").change(function(){
    if(dynamic){
        return false;
    }
    var para = parseInt($(this).val())*2;
    angle = para;
    three.linea.rotation.y = Math.PI/180*angle;
    pointa.x1 = (radius+20)*Math.cos(Math.PI/180*angle);
    pointa.z2 = pointa.z1 = -(radius+20)*Math.sin(Math.PI/180*angle);
    three.a.position.set(pointa.x1,40,pointa.z1);
});

//重置
function returnRange(){
    $('#slider1').attr('value','45|0');
    $('.slider1 .sliderLeft').css('width','0');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','0');

    three.scene.remove(three.linea,three.lineb,three.a,three.b,three.o);
    three.o.position.set(20,40,0);
    three.b.position.set(0,l*3/10+50,0);
    three.a.position.set(radius+20,40,0);
    clearInterval(a);
    clearInterval(b);
    clearTimeout(aa);
    clearTimeout(bb);
}

//on off
var a=null,aa=null,b=null,bb=null;
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
        three.scene.add(three.a,three.b,three.o);
        angle = 0;
        dynamic = true;
        var n=l*3/10;
        function increaseb(){
            if(n<0){
                clearInterval(a);
                n=0;
                return false;
            }
            three.createLineb(n);
            n-=20;
        }
        a = setInterval(increaseb,60);

        function increasea(){
            if(n>radius-10){
                clearInterval(b);
                dynamic =false;
                return false;
            }
            three.createLinea(n);
            n+=10;
        }
        aa = setTimeout(function(){
            b = setInterval(increasea,60);
        },1140);

        bb = setTimeout(function(){
            three.linea.material.color.set(0x000000);
            three.lineb.material.color.set(0x000000);
        },3040);

    }else{
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
    angle = 0;
    flag1 = false;
    $("#div1").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    returnRange();
}

if(isMob){
	$('#div1').on('touchstart',clickEve1);
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',clickEve1);
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

