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

var offsetLeft = parseInt($('#threeContainer').offset().left);
var offsetTop = parseInt($('#threeContainer').offset().top);


// 居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight -300)/2;
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
var radius = 80;
var flag1 = false,flag2 = false,flag3 = false;
var mousedownflag = false;

function ThreeDimensional() {
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

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

        this.ring();
        this.circle();
        this.formula();
        this.triangle();
        this.lines();
        this.triangleFace();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };

    this.createRing = function(color){
        var material = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.8});
        var ring = new THREE.RingGeometry(78,80,32,32);
        var mesh = new THREE.Mesh(ring,material);
        return mesh;
    };
    this.ring = function(){
        var ring1 = this.createRing(0xff0000);
        var ring2 = this.createRing(0xff0000);
        var ring3 = this.createRing(0xff0000);
        var ring4 = this.createRing(0xff0000);
        var ring5 = this.createRing(0xff0000);
        var ring6 = this.createRing(0xff0000);
        var ring7 = this.createRing(0x1161c8);

        ring1.position.set(-2.5*radius,4.33*radius,0);
        ring2.position.set(2.5*radius,4.33*radius,0);
        ring3.position.set(-5*radius,0,0);
        ring4.position.set(5*radius,0,0);
        ring5.position.set(-2.5*radius,-4.33*radius,0);
        ring6.position.set(2.5*radius,-4.33*radius,0);
        ring7.position.set(0,0,0);

        this.scene.add(ring1,ring2,ring3,ring4,ring5,ring6,ring7);
    };
    this.createCircle = function(color){
        var material = new THREE.MeshBasicMaterial({color:color});
        var cir = new THREE.CircleGeometry(80,32);
        var mesh = new THREE.Mesh(cir,material);
        return mesh;
    };
    this.circle = function(){
        var cirRed1 = this.createCircle(0xfe686e);
        var cirRed2 = this.createCircle(0xfe686e);
        this.cirRed1 = this.createCircle(0xfe686e);this.cirRed1.name = "c1";
        this.cirRed2 = this.createCircle(0xfe686e);this.cirRed2.name = "c2";
        this.cirRed3 = this.createCircle(0xfe686e);this.cirRed3.name = "c3";
        this.cirRed4 = this.createCircle(0xfe686e);this.cirRed4.name = "c4";
        this.cirRed5 = this.createCircle(0xfe686e);this.cirRed5.name = "c5";
        this.cirRed6 = this.createCircle(0xfe686e);this.cirRed6.name = "c6";
        var cirYellow1 = this.createCircle(0xecec22);
        var cirYellow2 = this.createCircle(0xecec22);
        var cirgreen1 = this.createCircle(0x72dd6e);
        var cirgreen2 = this.createCircle(0x72dd6e);

        cirRed1.position.set(-2.5*radius,4.33*radius,-1);
        cirYellow1.position.set(2.5*radius,4.33*radius,-1);
        cirgreen1.position.set(-5*radius,0,-1);
        cirgreen2.position.set(5*radius,0,-1);
        cirYellow2.position.set(-2.5*radius,-4.33*radius,-1);
        cirRed2.position.set(2.5*radius,-4.33*radius,-1);

        this.cirGroup1 = new THREE.Object3D();
        this.cirGroup1.add(cirRed1,cirYellow1,cirgreen1,cirgreen2,cirYellow2,cirRed2);

        var white1 = this.createCircle(0xffffff);white1.name = "w1";
        var white2 = this.createCircle(0xffffff);white2.name = "w2";
        var white3 = this.createCircle(0xffffff);white3.name = "w3";
        var white4 = this.createCircle(0xffffff);white4.name = "w4";
        var white5 = this.createCircle(0xffffff);white5.name = "w5";
        var white6 = this.createCircle(0xffffff);white6.name = "w6";
        var white7 = this.createCircle(0xffffff);
        white1.position.set(-2.5*radius,4.33*radius,-2);
        white2.position.set(2.5*radius,4.33*radius,-2);
        white3.position.set(-5*radius,0,-2);
        white4.position.set(5*radius,0,-2);
        white5.position.set(-2.5*radius,-4.33*radius,-2);
        white6.position.set(2.5*radius,-4.33*radius,-2);
        white7.position.set(0,0,-2);

        this.cirRed1.position.set(-2.5*radius,4.33*radius,-1);
        this.cirRed2.position.set(2.5*radius,4.33*radius,-1);
        this.cirRed3.position.set(-5*radius,0,-1);
        this.cirRed4.position.set(5*radius,0,-1);
        this.cirRed5.position.set(-2.5*radius,-4.33*radius,-1);
        this.cirRed6.position.set(2.5*radius,-4.33*radius,-1);

        selectobjs.push(white1,white2,white3,white4,white5,white6,this.cirRed1,this.cirRed2,this.cirRed3,this.cirRed4,this.cirRed5,this.cirRed6);

        this.cirGroup3 = new THREE.Object3D();
        this.cirGroup3.add(white1,white2,white3,white4,white5,white6,white7);
        this.scene.add(this.cirGroup3,this.cirRed4,this.cirRed5,this.cirRed6);
        setTimeout(function(){
            thiz.scene.remove(thiz.cirRed4,thiz.cirRed5,thiz.cirRed6);
        },1);

    };
    this.formula = function(){
        var a = text("sin x",34,"#000000");
        var b = text("cos x",34,"#000000");
        var c = text("tan x",34,"#000000");
        var d = text("cot x",34,"#000000");
        var e = text("sec x",34,"#000000");
        var f = text("csc x",34,"#000000");
        var g = text("1",34,"#000000");

        a.position.set(-2.5*radius,4.43*radius+6,10);
        b.position.set(2.5*radius,4.43*radius+6,10);
        c.position.set(-5*radius,12,1);
        d.position.set(5*radius,12,1);
        e.position.set(-2.5*radius,-4.33*radius+12,1);
        f.position.set(2.5*radius,-4.33*radius+12,1);
        g.position.set(0,14,1);
        this.scene.add(a,b,c,d,e,f,g);
    };

    this.createTriangle = function(color){
        var vertices = [];
        vertices.push(vec3(0,0,-2),vec3(2.5*radius,4.33*radius,0),vec3(-2.5*radius,4.33*radius,0),vec3(0,0,0));
        var line = createLineMesh(vertices,color,3);
        return line;
    };
    this.triangle = function(){
        this.angle1 = this.createTriangle(0x117fc8);
        var angle2 = this.createTriangle(0x1161c8);
        var angle3 = this.createTriangle(0x1161c8);
        this.angle1.position.set(0,0,-3);
        angle2.position.set(-2.5*radius,-4.33*radius,-3);
        angle3.position.set(2.5*radius,-4.33*radius,-3);
        var group = new THREE.Object3D();
        group.add(this.angle1,angle2,angle3);
        this.scene.add(group);
    };

    this.createTriangleFace = function(color){
        var vertices = [];
        vertices.push(vec3(0,0,-2),vec3(2.5*radius,4.33*radius,0),vec3(-2.5*radius,4.33*radius,0),vec3(0,0,0));
        var faces = [];
        faces.push(new THREE.Face3(0,1,2));
        faces.push(new THREE.Face3(2,1,0));
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces = faces;
        var material = new THREE.MeshBasicMaterial({color:color});
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    };
    this.triangleFace = function(){
        var angleFace1 = this.createTriangleFace(0x6fc0ff);
        var angleFace2 = this.createTriangleFace(0x6fc0ff);
        var angleFace3 = this.createTriangleFace(0x6fc0ff);
        this.angleFace1 = this.createTriangleFace(0xdf67a4);

        angleFace1.position.set(0,0,-5);
        angleFace2.position.set(-2.5*radius,-4.33*radius,-5);
        angleFace3.position.set(2.5*radius,-4.33*radius,-5);
        this.angleFace1.position.set(0,0,-4);

        this.scene.add(angleFace1,angleFace2,angleFace3);
    };

    this.lines = function(){
        var vertices = [];
        vertices.push(vec3(-2.5*radius,4.33*radius,-3),vec3(-5*radius,0,-3),vec3(-2.5*radius,-4.33*radius,-3),vec3(2.5*radius,-4.33*radius,-3),vec3(5*radius,0,-3),vec3(2.5*radius,4.33*radius,-3),vec3(0,0,-3));
        var line = createLineMesh(vertices,0x117fc8,3);
        this.scene.add(line);
    };

    this.onDocumentMouseDown = function(event){
        event.preventDefault();
        if(!mousedownflag){
            return false;
        }
        var mouse={},position={x:0,y:0};
        if(fullScreen){
            position.x =(bodyWidth-threeWidth)/2;
            position.y =(bodyHeight-threeHeight)/2;
        }else{
            position.x =offsetLeft;
            position.y =offsetTop;
        }
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            three.cirRed4.position.z = -1;
            three.cirRed5.position.z = -1;
            three.cirRed6.position.z = -1;
            thiz.scene.remove(thiz.cirRed1,thiz.cirRed2,thiz.cirRed3,thiz.cirRed4,thiz.cirRed5,thiz.cirRed6);
            var n = parseInt(selectobj.name.slice(1));
            switch(n){
                case 1:
                    thiz.scene.add(thiz.cirRed1,thiz.cirRed2,thiz.cirRed3);
                    break;
                case 2:
                    thiz.scene.add(thiz.cirRed2,thiz.cirRed1,thiz.cirRed4);
                    break;
                case 3:
                    thiz.scene.add(thiz.cirRed3,thiz.cirRed1,thiz.cirRed5);
                    break;
                case 4:
                    thiz.scene.add(thiz.cirRed4,thiz.cirRed2,thiz.cirRed6);
                    break;
                case 5:
                    thiz.scene.add(thiz.cirRed5,thiz.cirRed3,thiz.cirRed6);
                    break;
                case 6:
                    thiz.scene.add(thiz.cirRed6,thiz.cirRed4,thiz.cirRed5);
                    break;
            }
        }
        selectobj = null;
        INTERSECTED = null;
    };
    this.onDocumentTouchStart = function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            if(fullScreen){
                position.x =(bodyWidth-threeWidth)/2;
                position.y =(bodyHeight-threeHeight)/2;
            }else{
                position.x =offsetLeft;
                position.y =offsetTop;
            }
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            if(selectobj!=undefined){
                thiz.scene.remove(thiz.cirRed1,thiz.cirRed2,thiz.cirRed3,thiz.cirRed4,thiz.cirRed5,thiz.cirRed6);
                var n = parseInt(selectobj.name.slice(1));
                switch(n){
                    case 1:
                        thiz.scene.add(thiz.cirRed1,thiz.cirRed2,thiz.cirRed3);
                        break;
                    case 2:
                        thiz.scene.add(thiz.cirRed2,thiz.cirRed1,thiz.cirRed4);
                        break;
                    case 3:
                        thiz.scene.add(thiz.cirRed3,thiz.cirRed1,thiz.cirRed5);
                        break;
                    case 4:
                        thiz.scene.add(thiz.cirRed4,thiz.cirRed2,thiz.cirRed6);
                        break;
                    case 5:
                        thiz.scene.add(thiz.cirRed5,thiz.cirRed3,thiz.cirRed6);
                        break;
                    case 6:
                        thiz.scene.add(thiz.cirRed6,thiz.cirRed4,thiz.cirRed5);
                        break;
                }
            }
            selectobj = null;
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
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

//鼠标点击，选中顶点
three.renderer.domElement.addEventListener( 'mousedown', three.onDocumentMouseDown, false );
three.renderer.domElement.addEventListener( 'mouseup', three.onDocumentMouseUp, false );
three.renderer.domElement.addEventListener( 'touchstart', three.onDocumentTouchStart, false );
three.renderer.domElement.addEventListener( 'touchend', three.onDocumentTouchEnd, false );


function renew(){
    flag1 = false,flag2 = false,flag3 = false;mousedownflag = false;
    $("#div1,#div2,#div3").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    three.scene.remove(three.cirGroup1,three.cirRed1,three.cirRed2,three.cirRed3,three.cirRed4,three.cirRed5,three.cirRed6,three.angleFace1);

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
    if(flag1 == false){
        three.scene.remove(three.cirRed1,three.cirRed2,three.cirRed3,three.cirRed4,three.cirRed5,three.cirRed6,three.angleFace1);
        three.scene.add(three.cirGroup1);
    }else{
        three.scene.remove(three.cirGroup1);
    }
    flag1 = !flag1;
    flag2 = false;
    flag3 = false;
}
function div2(){
    if(flag2 == false){
        three.scene.remove(three.cirGroup1,three.cirRed1,three.cirRed2,three.cirRed3,three.cirRed4,three.cirRed5,three.cirRed6);
        three.scene.add(three.angleFace1);
    }else{
        three.scene.remove(three.angleFace1);
    }
    flag2 = !flag2;
    flag1 = false;
    flag3 = false;

}
function div3(){
    mousedownflag = !mousedownflag;
    if(flag3 == false){
        three.scene.remove(three.cirGroup1,three.angleFace1);
        three.scene.add(three.cirRed1,three.cirRed2,three.cirRed3);
    }else{
        three.scene.remove(three.cirRed1,three.cirRed2,three.cirRed3,three.cirRed4,three.cirRed5,three.cirRed6);
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
	$('#div1,#div2,#div3').on('touchstart',clickEve1);
	$('#div1').on('touchstart',div1);
	$('#div2').on('touchstart',div2);
	$('#div3').on('touchstart',div3);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//重置
	$("#renew").on('click',renew);
	$('#div1,#div2,#div3').on('click',clickEve1);
	$('#div1').on('click',div1);
	$('#div2').on('click',div2);
	$('#div3').on('click',div3);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}