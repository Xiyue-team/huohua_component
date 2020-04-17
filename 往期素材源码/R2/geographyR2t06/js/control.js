//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var height=window.innerHeight;
$('#three').height(height-76);
window.onresize=function(){
    height=window.innerHeight;
    $('#three').height(height-76);
    var cW=$('canvas').width();
    var cH=$('canvas').height();
    leftC=($('#three').width()-cW)/2;
    $('canvas').css({'left':leftC+'px','top':($('#three').height()-cH)/2+'px'});
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var threeWidth = $("#three").width();
var threeHeight = $('#three').height();
var $obj = $("#three");
var verticesxy = [];
var verticesxyy = [];

//初始全局变量
var plan = new THREE.Group();

var a = 300;
var b = 200;
var M1;
var draw = false;
var lastRenderTime = new Date().getTime();
function ThreeDimensional() {
	var thiz = this;
	/****** 判断是否支持WebGL ******/
	var canWebgl = (function () {
		try {
			var canvas = document.createElement('canvas');
			return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
		} catch (e) {
			return false;
		}
	})();

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
	this.renderer = null;
	if (canWebgl) {
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	} else {
		this.renderer = new THREE.CanvasRenderer({ antialias: true, alpha: true });
	}

	this.renderer.setPixelRatio(window.devicePixelRatio);

	this.controls = null;

	/****** 分割线 ******/
	this.int = function () {
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 800;
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.renderer.setClearColor(0xccccff, 0);
		this.renderer.setSize(threeWidth, threeHeight);
		$obj.append(this.renderer.domElement);
		this.createControls();
		this.createObj();
	};

	this.createControls = function () {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = false;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = false;
		this.controls.enableRotate = false;
		this.controls.enablePan = false;
	};
	function createLineMesh(vertices, color, style) {
		var lineMesh = null, geometryLine = new THREE.Geometry();
		if (!color) {
			color = '#000';
		}
		if (style == 2) {
			geometryLine.vertices = vertices;
			geometryLine.computeLineDistances();
			lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
				color: color,
				opacity: 0.8,
				dashSize: 10,
				gapSize: 10
			}));
		} else if (style == 3) {
			geometryLine.vertices = vertices;
			lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
		}
		return lineMesh;
	}
	function createCircle(vertices, radius, texture) {
		var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
		var CircleM = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(texture), overdraw: true });
		var Circle = new THREE.Mesh(CircleG, CircleM);
		Circle.position.x = vertices[0].x;
		Circle.position.y = vertices[0].y;
		Circle.position.z = vertices[0].z;
		return Circle;
	}
	this.createObj = function () {
		//sun
		var vertices = [];
		vertices.push(vec3(-150, 0, 1));
		var F1 = createCircle(vertices, 50, 'images/sun.png');
		//earth
		vertices = [];
		vertices.push(math(0));
		M1 = createCircle(vertices, 15, 'images/earth.png');
		this.scene.add(F1, M1)
	};
	this.drawCircle = function () {
		h = 360;
		vertices = [];
		for (var i = 0; i <= h; i++) {
			vertices.push(vec3(math(i).x,math(i).y,0));
		}
		var line = createLineMesh(vertices, '#979797',3);
		this.scene.add(line);
	};
}

function vec3(x, y, z) {
	return new THREE.Vector3(x, y, z);
}
function math(value) {
	return vec3(a * Math.cos(value / 180 * Math.PI), b * Math.sin(value / 180 * Math.PI), 1);
}
function createShape(arr, color, tr) {
	var shape = new THREE.Shape();
	var material1 = new THREE.MeshBasicMaterial({ 'color': color, transparent: tr });
	shape.moveTo(-150, 0);
	for (var i = 0; i < arr.length; i++) {
		shape.lineTo(arr[i][0], arr[i][1]);
	}
	return new THREE.Mesh(new THREE.ShapeGeometry(shape), material1);
}
var three = new ThreeDimensional();
three.int();
init();
var j=0,jO=0,drawF=false;
function init() {
	setInterval(function () {
		jO=j;
        if(j>=360) {
            j = 0;
            jO=360-(2-Math.cos(jO / 180 * Math.PI))/1.5;
        }
		j +=(2-Math.cos(j / 180 * Math.PI))/1.5;
		M1.position.set(math(j).x, math(j).y, 1);
        if (!( (j >= 0 && j <= 15) || (j >=345 && j < 400) || (j >= 140 && j <= 220) )) {
            verticesxy=[];
            verticesxyy=[];
            drawF = true;
        }
		if (draw && plan.children.length<86 && drawF) {
			if (j >= 0 && j <= 15 || j >=345 && j < 360 ) {
				verticesxy.push([math(j).x, math(j).y],[math(jO).x, math(jO).y]);
				if(verticesxy.length<2) return;
				var sharp1 = createShape(verticesxy, '#F8E71C', true);
				verticesxy=[];
				plan.add(sharp1);
			}else if(j >= 140 && j <= 220 ) {
				verticesxyy.push([math(j).x, math(j).y],[math(jO).x, math(jO).y]);
				if(verticesxyy.length<2) return;
				var sharp2 = createShape(verticesxyy, '#F8E71C', true);
				verticesxyy=[];
				plan.add(sharp2);
			}
            three.scene.remove(plan);
			three.scene.add(plan);
		}
	}, 50);
}
three.drawCircle();
function renderAll() {
    var  t =  new Date().getTime();

        if(t-lastRenderTime>16){
            three.controls.update();
            three.renderer.render(three.scene, three.camera);
            lastRenderTime = new Date().getTime();
		}

            requestAnimationFrame(renderAll);


}
renderAll();

function reset() {

    verticesxyy = [];
    verticesxy = [];
	draw = false;
	three.scene.remove(plan);
	plan=new THREE.Group();
	j = 0;
	$('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
	checked=false;
}

var checked=false;
function check(){
    if(checked){
        $('#f').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
		checked=false;
        draw=false;
        drawF = false;
        three.scene.remove(plan);
        plan=new THREE.Group();
    }else{
        $('#f').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
		checked=true;
        draw = true;
        drawF = true;
        if( (j >= 0 && j <= 15) || (j >=345 && j < 360) || (j >= 140 && j <= 220) ) {
            drawF = false;
        }
    }
}
if(isMob){
    $('#clear').on('touchstart',reset);
    $('#check').on('touchstart',check);
}else{
    $('#clear').on('click',reset);
    $('#check').on('click',check);
}
