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
var flag1 = false,flag2 = false,flag3 = false,flag4 = false;
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
        this.createAxis();

        this.createFixedText();
        this.createLine();
        this.createCircle();
        this.formula1();
        this.formula2();
        this.formula3();
        this.formula4();

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

    this.createP = function(){
        this.scene.remove(this.p);
        this.p = text("P(x,y)",34,"#000");
        var x = (l+40)*Math.cos(Math.PI/180*angle);
        var y = (l+40)*Math.sin(Math.PI/180*angle);
        this.p.position.set(x+17,y+17,0);
        this.scene.add(this.p);
    };
    this.createLine = function(){
        this.scene.remove(this.line);
        var vertices = [],x=0,y=0;
        vertices.push(vec3(0,0,0));
        x = l*Math.cos(Math.PI/180*angle);
        y = l*Math.sin(Math.PI/180*angle);
        vertices.push(vec3(x,y,0));
        this.line = createLineMesh(vertices,0xff0000,3);
        this.scene.add(this.line);

        this.createCir();
        this.createAf();
        this.createP();

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
    this.createFormula = function(a,b,c,d){
        var f1 = text(a,34,"#000");
        var f2 = text(b,34,"#000");
        var f3 = text("—",34,"#000");
        var f4 = text(c,34,"#000");
        var f5 = text(d,34,"#000");
        var f6 = text("0",34,"#000");

        f1.position.set(-60,17,0);
        f2.position.set(5,35,0);
        f3.position.set(5,17,0);
        f4.position.set(5,-2,0);
        f5.position.set(45,17,0);
        f6.position.set(70,17,0);

        var formula = new THREE.Object3D();
        formula.add(f1,f2,f3,f4,f5,f6);
        return formula;
    };
    this.formula1 = function(){
        var f1 = this.createFormula('sinα=','y','r','>');
        var f2 = this.createFormula('cosα=','x','r','>');
        var f3 = this.createFormula('tanα=','y','x','>');

        f1.position.set(0,66,0);
        f2.position.set(0,0,0);
        f3.position.set(0,-66,0);

        this.quad1 = new THREE.Object3D();
        this.quad1.add(f1,f2,f3);
        this.quad1.position.set(400,350,0);
        //this.scene.add(this.quad1);
    };
    this.formula2 = function(){
        var f1 = this.createFormula('sinα=','y','r','>');
        var f2 = this.createFormula('cosα=','x','r','<');
        var f3 = this.createFormula('tanα=','y','x','<');

        f1.position.set(0,66,0);
        f2.position.set(0,0,0);
        f3.position.set(0,-66,0);

        this.quad2 = new THREE.Object3D();
        this.quad2.add(f1,f2,f3);
        this.quad2.position.set(-400,350,0);
        //this.scene.add(this.quad2);
    };
    this.formula3 = function(){
        var f1 = this.createFormula('sinα=','y','r','<');
        var f2 = this.createFormula('cosα=','x','r','<');
        var f3 = this.createFormula('tanα=','y','x','>');

        f1.position.set(0,66,0);
        f2.position.set(0,0,0);
        f3.position.set(0,-66,0);

        this.quad3 = new THREE.Object3D();
        this.quad3.add(f1,f2,f3);
        this.quad3.position.set(-400,-350,0);
        //this.scene.add(this.quad3);
    };
    this.formula4 = function(){
        var f1 = this.createFormula('sinα=','y','r','<');
        var f2 = this.createFormula('cosα=','x','r','>');
        var f3 = this.createFormula('tanα=','y','x','<');

        f1.position.set(0,66,0);
        f2.position.set(0,0,0);
        f3.position.set(0,-66,0);

        this.quad4 = new THREE.Object3D();
        this.quad4.add(f1,f2,f3);
        this.quad4.position.set(400,-350,0);
        //this.scene.add(this.quad4);
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
    $("#div1,#div2,#div3,#div4").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    returnRange();

    three.scene.remove(three.quad1,three.quad2,three.quad3,three.quad4);
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
        //$(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
function div1(){
    if(!flag1){
        three.scene.add(three.quad1);
    }else{
        three.scene.remove(three.quad1);
    }
    flag1 = !flag1;
}
function div2(){
    if(!flag2){
        three.scene.add(three.quad2);
    }else{
        three.scene.remove(three.quad2);
    }
    flag2 = !flag2;
}
function div3(){
    if(!flag3){
        three.scene.add(three.quad3);
    }else{
        three.scene.remove(three.quad3);
    }
    flag3 = !flag3;
}
function div4(){
    if(!flag4){
        three.scene.add(three.quad4);
    }else{
        three.scene.remove(three.quad4);
    }
    flag4 = !flag4;
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
	$('#div1,#div2,#div3,#div4').on('touchstart',clickEve1);
	$("#div1").on('touchstart',div1);
	$("#div2").on('touchstart',div2);
	$("#div3").on('touchstart',div3);
	$("#div4").on('touchstart',div4);
	$("#renew").on('touchstart',returnRange);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1,#div2,#div3,#div4').on('click',clickEve1);
	$("#div1").on('click',div1);
	$("#div2").on('click',div2);
	$("#div3").on('click',div3);
	$("#div4").on('click',div4);
	$("#renew").on('click',returnRange);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}



