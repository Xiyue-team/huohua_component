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
var radius = 80;
var l = 300;
var angle = 60;
var flag1 = false,flag2 = false,flag3 = false,flag4 = false;

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
        this.formula1();
        this.formula2();
        this.formula3();
        this.formula4();
        this.createShadow();
        this.createRing();
        this.quadr1();
        this.quadr2();
        this.quadr3();
        this.quadr4();
        this.lines();
        this.createCir();
        this.createXita(60);

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

    this.formula1 = function(){
        var a = text("{ α|α=2kπ,k∈Z }",42,"#000000");
        a.position.set(-44,21,0);
        var group = new THREE.Object3D();
        group.add(a);
        group.position.set(500,30,0);
        this.scene.add(group);
    };
    this.formula2 = function(){
        var a = text("π",42,"#000000");
        var b = text("—",42,"#000000");
        var c = text("2",42,"#000000");
        var d = text("+2kπ,k∈Z }",42,"#000000");
        var e = text("{ α|α=",42,"#000000");
        a.position.set(-60,45,0);
        b.position.set(-60,21,0);
        c.position.set(-60,-11,0);
        d.position.set(65,21,0);
        e.position.set(-140,21,0);

        var group = new THREE.Object3D();
        group.add(a,b,c,d,e);
        group.position.set(0,500,0);
        this.scene.add(group);
    };
    this.formula3 = function(){
        var a = text("{ α|α=π+2kπ,k∈Z }",42,"#000000");
        a.position.set(-55,21,0);
        var group = new THREE.Object3D();
        group.add(a);
        group.position.set(-430,30,0);
        this.scene.add(group);
    };
    this.formula4 = function(){
        var a = text("3π",42,"#000000");
        var b = text("—",42,"#000000");
        var c = text("2",42,"#000000");
        var d = text("+2kπ,k∈Z }",42,"#000000");
        var e = text("{ α|α=",42,"#000000");
        a.position.set(-60,45,0);
        b.position.set(-60,21,0);
        c.position.set(-60,-11,0);
        d.position.set(65,21,0);
        e.position.set(-140,21,0);

        var group = new THREE.Object3D();
        group.add(a,b,c,d,e);
        group.position.set(0,-500,0);
        this.scene.add(group);
    };

    this.quadr1 = function(){
        var k = text("第一象限角",33,"#000000");

        var a = text("(2kπ,",33,"#000000");
        var b = text("π",33,"#000000");
        var c = text("—",33,"#000000");
        var d = text("2",33,"#000000");
        var e = text("+",33,"#000000");
        var f = text("2kπ)",33,"#000000");
        var j = text(", k∈Z",33,"#000000");

        k.position.set(0,70,0);
        a.position.set(-105,22,0);
        b.position.set(-40,46,0);
        c.position.set(-40,22,0);
        d.position.set(-40,-10,0);
        e.position.set(-10,22,0);
        f.position.set(40,22,0);

        j.position.set(120,22,0);

        this.quad1 = new THREE.Object3D();
        this.quad1.add(a,b,c,d,e,f,j,k);
        this.quad1.position.set(230,340,0);
    };
    this.quadr2 = function(){
        var k = text("第二象限角",33,"#000000");

        var a = text("π",33,"#000000");
        var b = text("—",33,"#000000");
        var c = text("2",33,"#000000");
        var d = text("+",33,"#000000");
        var e = text("2kπ,",33,"#000000");
        var f = text("π+2kπ)",33,"#000000");
        var j = text(", k∈Z",33,"#000000");
        var g = text("(",33,"#000000");

        k.position.set(0,70,0);
        a.position.set(-135,35,0);
        b.position.set(-135,18,0);
        c.position.set(-135,-2,0);
        d.position.set(-104,18,0);
        e.position.set(-60,18,0);
        f.position.set(30,18,0);
        g.position.set(-158,18,0);
        j.position.set(130,18,0);

        this.quad2 = new THREE.Object3D();
        this.quad2.add(a,b,c,d,e,f,g,j,k);
        this.quad2.position.set(-230,340,0);
    };
    this.quadr3 = function(){
        var k = text("第三象限角",33,"#000000");

        var a = text("(π+2kπ,",33,"#000000");
        var b = text("3π",33,"#000000");
        var c = text("—",33,"#000000");
        var d = text("2",33,"#000000");
        var e = text("+",33,"#000000");
        var f = text("2kπ)",33,"#000000");
        var g = text(", k∈Z",33,"#000000");

        k.position.set(0,70,0);
        a.position.set(-110,18,0);
        b.position.set(-30,35,0);
        c.position.set(-30,18,0);
        d.position.set(-30,-2,0);
        e.position.set(-2,18,0);
        f.position.set(42,18,0);
        g.position.set(115,18,0);

        this.quad3 = new THREE.Object3D();
        this.quad3.add(a,b,c,d,e,f,g,k);
        this.quad3.position.set(-230,-370,0);
    };
    this.quadr4 = function(){
        var k = text("第四象限角",33,"#000000");

        var a = text("3π",33,"#000000");
        var b = text("—",33,"#000000");
        var c = text("2",33,"#000000");
        var d = text("+",33,"#000000");
        var e = text("2kπ,",33,"#000000");
        var f = text("2π+2kπ)",33,"#000000");
        var g = text("(",33,"#000000");
        var j = text(", k∈Z",33,"#000000");

        k.position.set(0,70,0);
        a.position.set(-135,35,0);
        b.position.set(-135,18,0);
        c.position.set(-135,-2,0);
        d.position.set(-104,18,0);
        e.position.set(-60,18,0);
        f.position.set(40,18,0);
        g.position.set(-160,18,0);
        j.position.set(145,18,0);

        this.quad4 = new THREE.Object3D();
        this.quad4.add(a,b,c,d,e,f,g,j,k);
        this.quad4.position.set(230,-370,0);
    };
    this.createShadow = function(){
        var material = new THREE.MeshBasicMaterial({color:0xe2f0d9});
        var plane = new THREE.PlaneGeometry(430,430);
        this.shadow = new THREE.Mesh(plane,material);
    };
    this.createRing = function () {
        var material = new THREE.MeshBasicMaterial({color:0x4472c4,transparent:true,opacity:0.7});
        var cir = new THREE.CircleGeometry(14,12,18);
        this.ring = new THREE.Mesh(cir,material);
        selectobjs.push(this.ring);
        this.ring.position.set(l*Math.cos(Math.PI/180*60),l*Math.sin(Math.PI/180*60),3);
        this.scene.add(this.ring);
    };
    this.lines = function(){
        this.scene.remove(this.line);
        var vertices = [];
        vertices.push(vec3(0,0,3),vec3((l-13)*Math.cos(Math.PI/180*60),(l-13)*Math.sin(Math.PI/180*60)),3);
        this.line = createLineMesh(vertices,0xfb2420,3);
        this.scene.add(this.line);
    };
    this.createXita = function(texts){
        this.scene.remove(this.xita);
        this.xita = text(texts+"°",30,0x4472c4);
        this.xita.position.x = 50;
        this.xita.position.y = 45;
        this.scene.add(this.xita);
    };
    this.createCir = function(){ //角
        this.scene.remove(this.ang);
        var vertices = [],x=0,y=0;
        for(var i=0;i<angle;i++){
            x = 30*Math.cos(Math.PI/180*i);
            y = 30*Math.sin(Math.PI/180*i);
            vertices.push(vec3(x,y,3));
        }
        this.ang = createLineMesh(vertices,0x4472c4,3);
        this.scene.add(this.ang);
    };



    this.onDocumentMouseDown = function(event){
        event.preventDefault();
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
            intersects[0].object.material.opacity = 0.9;
            mousedownflag = true;
        }
    };
    this.onDocumentMouseMove = function(event){
        event.preventDefault();
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
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, thiz.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var x = intersection.x,y = intersection.y;
                if(x > l){
                    x = l;
                }
                if(x < -l){
                    x = -l;
                }
                angle = Math.atan2(y,x)*180/Math.PI;
                if(angle<0){
                    angle = 360+angle;
                }
                x = l*Math.cos(Math.PI/180*angle);
                y = l*Math.sin(Math.PI/180*angle);

                selectobj.position.set(x,y,3);

                thiz.scene.remove(thiz.line);
                var vertices = [];
                vertices.push(vec3(0,0,3),vec3(x,y,3));
                thiz.line = createLineMesh(vertices,0xfb2420,3);
                thiz.scene.add(thiz.line);

                thiz.createCir();
                thiz.createXita(angle.toFixed(0));
            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.8;
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
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.8;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchMove = function(event){
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
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, thiz.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var x = intersection.x,y = intersection.y;
                    if(x > l){
                        x = l;
                    }
                    if(x < -l){
                        x = -l;
                    }
                    angle = Math.atan2(y,x)*180/Math.PI;
                    if(angle<0){
                        angle = 360+angle;
                    }
                    x = l*Math.cos(Math.PI/180*angle);
                    y = l*Math.sin(Math.PI/180*angle);

                    selectobj.position.set(x,y,3);

                    thiz.scene.remove(thiz.line);
                    var vertices = [];
                    vertices.push(vec3(0,0,3),vec3(x,y,3));
                    thiz.line = createLineMesh(vertices,0xfb2420,3);
                    thiz.scene.add(thiz.line);

                    thiz.createCir();
                    thiz.createXita(angle.toFixed(0));

                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.5;
        }
        selectobj = null;
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

//鼠标点击，选中顶点
three.renderer.domElement.addEventListener( 'mousedown', three.onDocumentMouseDown, false );
three.renderer.domElement.addEventListener( 'mouseup', three.onDocumentMouseUp, false );
three.renderer.domElement.addEventListener( 'mousemove', three.onDocumentMouseMove, false );
three.renderer.domElement.addEventListener( 'touchstart', three.onDocumentTouchStart, false );
three.renderer.domElement.addEventListener( 'touchmove', three.onDocumentTouchMove, false );
three.renderer.domElement.addEventListener( 'touchend', three.onDocumentTouchEnd, false );

function renew(){
    angle = 60;
    flag1 = false,flag2 = false,flag3 = false;
    $("#div1,#div2,#div3,#div4").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");

    three.scene.remove(three.shadow,three.quad1,three.quad2,three.quad3,three.quad4);
    three.ring.position.set(l*Math.cos(Math.PI/180*60),l*Math.sin(Math.PI/180*60),3);
    three.lines();
    three.createCir();
    three.createXita(angle);
    three.camera.position.set(0,0,1500)
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
        three.scene.remove(three.quad1,three.quad2,three.quad3,three.quad4);
        three.scene.add(three.quad1,three.shadow);
        three.shadow.position.set(215,215,0);
    }else{
        three.scene.remove(three.quad1,three.shadow);
    }
    flag1 = !flag1;
    flag2 = false;
    flag3 = false;
    flag4 = false;
}
function div2(){
    if(flag2 == false){
        three.scene.remove(three.quad1,three.quad2,three.quad3,three.quad4);
        three.scene.add(three.quad2,three.shadow);
        three.shadow.position.set(-215,215,0);
    }else{
        three.scene.remove(three.quad2,three.shadow);
    }
    flag2 = !flag2;
    flag1 = false;
    flag3 = false;
    flag4 = false;

}
function div3(){
    if(flag3 == false){
        three.scene.remove(three.quad1,three.quad2,three.quad3,three.quad4);
        three.scene.add(three.quad3,three.shadow);
        three.shadow.position.set(-215,-215,0);
    }else{
        three.scene.remove(three.quad3,three.shadow);
    }
    flag3 = !flag3;
    flag1 = false;
    flag2 = false;
    flag4 = false;

}
function div4(){
    if(flag4 == false){
        three.scene.remove(three.quad1,three.quad2,three.quad3,three.quad4);
        three.scene.add(three.quad4,three.shadow);
        three.shadow.position.set(215,-215,0);
    }else{
        three.scene.remove(three.quad4,three.shadow);
    }
    flag4 = !flag4;
    flag1 = false;
    flag2 = false;
    flag3 = false;
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
    $("#renew").on('touchstart',renew);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    $('#div1,#div2,#div3,#div4').on('click',clickEve1);
    $("#div1").on('click',div1);
    $("#div2").on('click',div2);
    $("#div3").on('click',div3);
    $("#div4").on('click',div4);
    $("#renew").on('click',renew);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}