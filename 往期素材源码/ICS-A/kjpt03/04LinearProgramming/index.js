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
var showheight = $(".showheight").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (conHeight - showheight)/2;
$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop);
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
var zz=0;
var plane1=null;
var p1=false;
var group1=null;
var group2=null;
var group3=null;
var group4=null;
var sphere=null;

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
        this.camera.position.z = 1800;
        this.scene.position.x=-300;
        this.scene.position.y=-300;
        this.camera.lookAt(this.scene.position);//new THREE.Vector3(400,400,0)
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createAxis();
        this.createLine1();
        this.createPlane1();
        this.createDashLine();

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
        labelAxis(-200, 200, 800);
        drawAxisArrow(vec3( -250, 0, 0 ), vec3( 850, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -150, 0 ), vec3( 0, 650, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    this.createLine1=function(){
        if(lineMesh1){
            this.scene.remove(lineMesh1)
        }
        var vertices1=[];
        var vertices2=[];
        var vertices3=[];
        vertices1.push(vec3(400,500,0));
        vertices1.push(vec3(400,-150,0));
        vertices2.push(vec3(-150,300,0));
        vertices2.push(vec3(750,300,0));
        vertices3.push(vec3(-150,475,0));
        vertices3.push(vec3(750,25,0));

        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine3.vertices = vertices3;
        var lineMesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        var lineMesh2= new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        var lineMesh3 = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: 0x000000}));
        var text1 =createText("4x=16",400,520,0,"#000000");
        var text2 =createText("4y=12",750,350,0,"#000000");
        var text3 =createText("x+2y=8",-150,500,0,"#000000");
        group2=new THREE.Group();
        group3=new THREE.Group();
        group4=new THREE.Group();
        group2.add(lineMesh1,text1);
        group3.add(lineMesh2,text2);
        group4.add(lineMesh3,text3);
        this.scene.add(group2);
        this.scene.add(group3);
        this.scene.add(group4);
    };
    this.createPlane1=function(){
        if(plane1){
            this.scene.remove(plane1)
        }
        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.lineTo(0,300);
        shape.lineTo(200,300);
        shape.lineTo(400,200);
        shape.lineTo(400,0);
        plane1 =createMesh(new THREE.ShapeGeometry(shape),0x60b6f1);
        plane1.position.z = -1;
        this.scene.add(plane1);
    };
    this.createDashLine=function(){
        if(group1){
            this.scene.remove(group1);
        }
        var geometryLine1 = new THREE.Geometry();
        var vertices3 = [];
        for(var i=-4;i<=6;i+=1){
            var resulty=-2/3*i;
            vertices3.push(new THREE.Vector3(i*100,resulty*100,0));
        }
        geometryLine1.vertices = vertices3;
        geometryLine1.computeLineDistances();
        var length1=vertices3.length-1;
        var dashlinetext =createText("z=2x+3y",vertices3[length1].x-50,vertices3[length1].y,0,"#ff0000");
        lineMesh1 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        group1=new THREE.Group();
        group1.add(lineMesh1,dashlinetext);
        group1.position.y=100*zz/3;
        this.scene.add(group1);
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
    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px Cambria Math', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/100, textStyle);

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
        for( i = start+200; i <= stop-200; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/100, textStyle);
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
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Arial', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        return text;
    }
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.6});
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
    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[0,0]],
//        onlyGridPoint:true,
//        round:true,
//        width:383,
        axis:[[0,14]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseFloat(val[0]).toFixed(1);
            var result="z="+ss;
            return result;
        }
    });
    $('.slider1 .sliderLeft').css('width','0px');
    zz=0;
    threeDimensional.createDashLine();

}

$("#slider1").change(function(){
    var s1 = parseFloat(this.value).toFixed(1);
    zz=s1;
    threeDimensional.createDashLine();
});

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
	$("#renew").on('touchstart',function(){
	    reset();
	    threeDimensional.camera.position.set(0,0,1800);
	});
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$("#renew").on('click',function(){
	    reset();
	    threeDimensional.camera.position.set(0,0,1800);
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




