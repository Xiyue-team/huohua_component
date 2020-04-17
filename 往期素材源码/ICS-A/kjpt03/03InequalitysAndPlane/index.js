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

//showheight 居中
var conHeight = $("#controlContainer").height();
var turnheight = $(".turn").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (conHeight - turnheight)/2;
$(".turn").css("margin-top",marginTop - h2Height - h2MarginTop);
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

var selectFunction = 1,radioSelect = 0,move=0;
var aa=2;
var bb=-3;
var cc=5;
var lineMesh1=null;
var lineMesh2=null;
var lineMesh3=null;
var plane1=null;
var plane2=null;
var plane3=null;
var plane12=null;
var plane13=null;
var plane23=null;
var plane123=null;
var p1=false;
var p2=false;
var p3=false;
var text1=null;
var text2=null;
var text3=null;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcMode=null,funcs=[null,null,null,null];

    $('.verticalCenter').css('margin-top',(threeHeight-119 - $('.verticalCenter').height() - 45)/2);

    var thiz = this;
    var grid=null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
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
        this.createLine1();
        this.createtext();

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
    };
    this.createAxis = function(){
        axis = new THREE.Group();
        labelAxis(-600, 200, 600);
        drawAxisArrow(vec3( -650, 0, 0 ), vec3( 650, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -650, 0 ), vec3( 0, 650, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    this.createLine1=function(){
        if(lineMesh1){
            this.scene.remove(lineMesh1)
        }
        var vertices1=[];
        var vertices2=[];
        var vertices3=[];
        vertices1.push(vec3(520/3,600,0));
        vertices1.push(vec3(-680/3,-600,0));
        vertices2.push(vec3(-140,600,0));
        vertices2.push(vec3(460,-600,0));
        vertices3.push(vec3(-600,200,0));
        vertices3.push(vec3(600,-400,0));

        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine3.vertices = vertices3;
        lineMesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0xCE1028}));
        lineMesh2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x457B16}));
        lineMesh3 = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: 0x1F6AC9}));
        this.scene.add(lineMesh1);
        this.scene.add(lineMesh2);
        this.scene.add(lineMesh3);
    };
    this.createPlane1=function(){
        if(plane1){
            this.scene.remove(plane1)
        }
        var shape = new THREE.Shape();
        shape.moveTo(520/3,600);
        shape.lineTo(600,600);
        shape.lineTo(600,-600);
        shape.lineTo(-680/3,-600);
        plane1 =createMesh(new THREE.ShapeGeometry(shape),0x1F6AC9);
        plane1.position.z = -1;
        this.scene.add(plane1);
    };
    this.createPlane2=function(){
        if(plane2){
            this.scene.remove(plane3)
        }
        var shape = new THREE.Shape();
        shape.moveTo(-600,200);
        shape.lineTo(-600,600);
        shape.lineTo(600,600);
        shape.lineTo(600,-400);
        plane2 =createMesh(new THREE.ShapeGeometry(shape),0x1F6AC9);
        plane2.position.z = -1;
        this.scene.add(plane2);
    };
    this.createPlane3=function(){
        if(plane3){
            this.scene.remove(plane3)
        }
        var shape = new THREE.Shape();
        shape.moveTo(-140,600);
        shape.lineTo(-600,600);
        shape.lineTo(-600,-600);
        shape.lineTo(460,-600);
        plane3 =createMesh(new THREE.ShapeGeometry(shape),0xE8E189);
        plane3.position.z = -1;
        this.scene.add(plane3);
    };
    this.createPlane12=function(){
        if(plane12){
            this.scene.remove(plane12)
        }
        var shape = new THREE.Shape();
        shape.moveTo(520/3,600);
        shape.lineTo(600,600);
        shape.lineTo(600,-400);
        shape.lineTo(-360/7,-520/7);
        plane12 =createMesh(new THREE.ShapeGeometry(shape),0x99cddd);
        plane12.position.z = -1;
        this.scene.add(plane12);
    };
    this.createPlane13=function(){
        if(plane13){
            this.scene.remove(plane13)
        }
        var shape = new THREE.Shape();
        shape.moveTo(48,224);
        shape.lineTo(460,-600);
        shape.lineTo(-680/3,-600);
        plane13 =createMesh(new THREE.ShapeGeometry(shape),0xC7C4C2);
        plane13.position.z = -1;
        this.scene.add(plane13);
    };
    this.createPlane23=function(){
        if(plane23){
            this.scene.remove(plane23)
        }
        var shape = new THREE.Shape();
        shape.moveTo(-600,200);
        shape.lineTo(-600,600);
        shape.lineTo(-140,600);
        shape.lineTo(280,-240);
        plane23 =createMesh(new THREE.ShapeGeometry(shape),0xC1C8E4);
        plane23.position.z = -1;
        this.scene.add(plane23);
    };
    this.createPlane123=function(){
        if(plane123){
            this.scene.remove(plane123)
        }
        var shape = new THREE.Shape();
        shape.moveTo(48,224);
        shape.lineTo(280,-240);
        shape.lineTo(-360/7,-520/7);
        plane123 =createMesh(new THREE.ShapeGeometry(shape),0xFEC97E);
        plane123.position.z = -1;
        this.scene.add(plane123);
    };
    this.showPlane=function(){
        if(p1==true){
            if(p2==true){
                if(p3==true){
                    threeDimensional.createPlane123();
                }
                else{
                    threeDimensional.createPlane12();
                }
            }else{
                if(p3==true){
                    threeDimensional.createPlane13();
                }
                else{
                    threeDimensional.createPlane1();
                }
            }
        }
        else{
            if(p2==true){
                if(p3==true){
                    threeDimensional.createPlane23();
                }
                else{
                    threeDimensional.createPlane2();
                }
            }
            else{
                if(p3==true){
                    threeDimensional.createPlane3();
                }
                else{
                    return;
                }

            }

        }
    };
    this.removePlane=function(){
        if(plane1){
            this.scene.remove(plane1)
        }
        if(plane2){
            this.scene.remove(plane2)
        }
        if(plane3){
            this.scene.remove(plane3)
        }
        if(plane12){
            this.scene.remove(plane12)
        }
        if(plane13){
            this.scene.remove(plane13)
        }
        if(plane23){
            this.scene.remove(plane23)
        }
        if(plane123){
            this.scene.remove(plane123)
        }
    };
    this.createtext=function(){
        if(text1!=null){
            this.scene.remove(text1);
            this.scene.remove(text2);
            this.scene.remove(text3);
        }
        text1=createText("3x - y + 2 = 0",520/3+40,580,0,"#000000");
        text2=createText("x + 2y + 5 = 0",-600,220,0,"#000000");
        text3=createText("2x + y - 8 = 0",-140,580,0,"#000000");
        this.scene.add(text1);
        this.scene.add(text2);
        this.scene.add(text3);
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
                dashSize: 20,
                gapSize: 20
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function drawAxisArrow(origin, dir, _color,style){
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

        }
        // line = createLineMesh()

    }
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = thiz.camera.rotation;
        text.position.set(x,y,z);
        return text;
    }
    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px Cambria Math', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/40, textStyle);

            if(i == 0){
                text.position.x = i - 10;
            }else{
                text.position.x = i;
            }

            text.position.y = -20;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px Cambria Math', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/40, textStyle);
            text.position.x = -20;
            text.position.y = i;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(10,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
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

function reset(){
    if($('#div1').hasClass('on')){
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }
    if($('#div2').hasClass('on')){
        $('#div2').removeClass('on').addClass('off');
        $('#div2').find('.span2').text('' +'off')
    }
    if($('#div3').hasClass('on')){
        $('#div3').removeClass('on').addClass('off');
        $('#div3').find('.span2').text('' +'off')
    }
    p1=false;
    p2=false;
    p3=false;
    threeDimensional.removePlane()

}
function div1(){
	if($('#div1').hasClass('on')){
        p1=false;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }else{
        p1=true;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div1').removeClass('off').addClass('on');
        $('#div1').find('.span2').text('' +'on')
    }
}
function div2(){
	if($('#div2').hasClass('on')){
        p2=false;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div2').removeClass('on').addClass('off');
        $('#div2').find('.span2').text('' +'off')
    }else{
        p2=true;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div2').removeClass('off').addClass('on');
        $('#div2').find('.span2').text('' +'on')
    }
}
function div3(){
	if($('#div3').hasClass('on')){
        p3=false;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div3').removeClass('on').addClass('off');
        $('#div3').find('.span2').text('' +'off')
    }else{
        p3=true;
        threeDimensional.removePlane();
        threeDimensional.showPlane();
        $('#div3').removeClass('off').addClass('on');
        $('#div3').find('.span2').text('' +'on')
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
	$('#div1').on('touchstart',div1);
	$('#div2').on('touchstart',div2);
	$('#div3').on('touchstart',div3);
	$("#renew").on('touchstart',function(){
	    reset();
	    threeDimensional.camera.position.set(0,0,1500);
	});
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',div1);
	$('#div2').on('click',div2);
	$('#div3').on('click',div3);
	$("#renew").on('click',function(){
	    reset();
	    threeDimensional.camera.position.set(0,0,1500);
	});
	/*全屏事件*/
	$('#scale').on('click',scalef);
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
