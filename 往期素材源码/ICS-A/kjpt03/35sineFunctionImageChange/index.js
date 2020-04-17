/**
 * Created by O2 on 2016/9/6.
 */
var scaling = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scaling = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scaling,
            left: 33 * scaling,
            top: (69 * scaling + (bodyHeight - 1200 * scaling) / 2 ),
            bottom: (69 * scaling + (bodyHeight - 1200 * scaling) / 2 )
        });
    // } else {
    //     scaling = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scaling, left: 33 * scaling, top: (69 * scaling ), bottom: (69 * scaling)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scaling,'box-shadow': 6*scaling + 'px '+6*scaling +'px '+ 20*scaling +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scaling);
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


$(".slider3 .xdsoft_legend").css("bottom","-10px").eq(0).text("-2π").end().eq(1).text("2π");
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


// 居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight)/2;
$(".slider").css("margin-top",marginTop);



/**
 *
 * @type {THREE.Raycaster}
 */

//初始参数
var radius = 200;
var axis = new THREE.Group();
var axisArrow = new THREE.Group();
var value1 = 1,value2 = 1,value3 = 0;
var angle = 0;
var a=1,b=1,c=0,d=0,e=0;
var formula = null;


function ThreeDimensional() {
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.curve = null;
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
        var cur = this.createCurve(1,1,0,0x000000);
        this.scene.add(cur);
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
        this.labelAxis(-500, 100, 500, -500, 100, 500);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -600, 0 ), vec3( 0, 600, 0 ), 0x000000,2);
        this.scene.add( axis,axisArrow);
    };
    this.createCurve = function(a,b,c,color){
        var vertices = [],x=0,y=0;
        for(var i=-5;i<5.01;i+=0.01){
            x = i*100;
            y = Math.ceil(a*Math.sin(b*Math.PI*0.5*i+c)*100);
            vertices.push(vec3(x,y,0));
        }
        var curve = new THREE.CatmullRomCurve3(vertices);
        var geom = new THREE.Geometry();
        geom.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color:color});
        var line = new THREE.Line(geom,material);
        return line;
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
            var a = (i/stepSizex/2).toFixed(1);
            if(a == 1.0){
                a = "π";
            }else if(a == 0.0){
                a = 0;
            }else{
                a = a+"π"
            }
            text = new SpriteText2D(a, textStyle);

            if(i == 0){
                text.position.x = i - 20;
            }else{
                text.position.x = i;
            }
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


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}


//滑动条
$("#slider1").change(function(){
    threeDimensional.scene.remove(threeDimensional.curve);
    var para = parseInt($(this).val());

    if(para<0){
        $(".turn2 .turnShade").text("[A, -A]");
    }else{
        $(".turn2 .turnShade").text("[-A, A]");
    }

    a = value1 = para;
    changeFormula();

    threeDimensional.curve = threeDimensional.createCurve(value1,value2,value3,0xff0000);
    threeDimensional.scene.add(threeDimensional.curve);
});
$("#slider2").change(function(){
    threeDimensional.scene.remove(threeDimensional.curve);
    var para = parseInt($(this).val());

    b = value2 = para;
    changeFormula();

    threeDimensional.curve = threeDimensional.createCurve(value1,value2,value3,0xff0000);
    threeDimensional.scene.add(threeDimensional.curve);
});
$("#slider3").change(function(){
    threeDimensional.scene.remove(threeDimensional.curve);
    var para = parseInt($(this).val());
    value3 = para*0.25*Math.PI;

    c = para;
    changeFormula();

    threeDimensional.curve = threeDimensional.createCurve(value1,value2,value3,0xff0000);
    threeDimensional.scene.add(threeDimensional.curve);
});
function renew(){
    radioSelect = 1;
    axis = new THREE.Group();
    axisArrow = new THREE.Group();
    value1 = 1,value2 = 1,value3 = 0;
    threeDimensional.scene.remove(threeDimensional.curve);
    $(".slider1 .xdsoft_slider_label").text("1");
    $('#slider1').attr('value','1|0');
    $('.slider1 .sliderLeft').css('width','230px');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','230px');

    $(".slider2 .xdsoft_slider_label").text("1");
    $('#slider2').attr('value','1|0');
    $('.slider2 .sliderLeft').css('width','230px');
    $('.slider2 .xdsoft_range2dslider_runner ').css('left','230px');

    $(".slider3 .xdsoft_slider_label").text("0");
    $('#slider3').attr('value','0|0');
    $('.slider3 .sliderLeft').css('width','192px');
    $('.slider3 .xdsoft_range2dslider_runner ').css('left','192px');

    if($("#div1").parent().hasClass("on")){
        $("#div1").parent().removeClass('on').addClass('off');
        $("#div1").parent().find('.span2').text('' +'off')
    }
    if($("#div2").parent().hasClass("on")){
        $("#div2").parent().removeClass('on').addClass('off');
        $("#div2").parent().find('.span2').text('' +'off')
    }

}

//on off
function clickEve1(){
    if($(this).parent().hasClass('on')){
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off')
    }else{
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on')
    }
}

//改变公式
function changeFormula(){
    if(a==0 || b==0){
        formula = "&nbsp;=0";
        $("#formula").html(formula);
    }else{
        if(a==1){
            d="";
        }else{
            d=a;
        }
        if(b==1){
            e="";
        }else{
            e=b;
        }
        if(c<0){
            c = -c;
            formula = "&nbsp;="+d+"sin("+e+"x-"+(c*0.25)+"π)";
        }else if(c==0){
            formula = "&nbsp;="+d+"sin("+e+"x"+")";
        }else{
            formula = "&nbsp;="+d+"sin("+e+"x+"+(c*0.25)+"π)";
        }
        $("#formula").html(formula);
    }

}
function scalef(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scaling,left:33*scaling,top:(69*scaling + (bodyHeight-1200*scaling)/2 ),bottom:(69*scaling + (bodyHeight-1200*scaling)/2 )});
        }else{
            $threeCon.css({'right':686*scaling,left:33*scaling,top:(69*scaling ),bottom:(69*scaling)});
        }
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scaling,'box-shadow': 6*scaling + 'px '+6*scaling +'px '+ 20*scaling +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}

if(isMob){
	//重置
	$("#renew").on('touchstart',renew);
	$('#div1,#div2').on('touchstart',clickEve1);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//重置
	$("#renew").on('click',renew);
	$('#div1,#div2').on('click',clickEve1);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}
