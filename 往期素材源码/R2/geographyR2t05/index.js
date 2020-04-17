//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<645){
    zoom=0.8
    $('#main_right').css('zoom',zoom);
}
$('#main_left').width(wWidth-280*zoom);
$('#threeContainer').height(wHeight-80);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<645){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
    $('#threeContainer').height(wHeight-80);
    var cW=$('#threeContainer canvas').width();
    var cH=$('#threeContainer canvas').height();
    $('#threeContainer canvas').css({'left':($('#threeContainer').width()-cW)/2+'px','top':($('#threeContainer').height()-cH)/2+'px'});
    offsetLeft = parseInt($('canvas').offset().left);
    offsetTop = parseInt($('canvas').offset().top);
}

var threeW=$('#threeContainer').width();
var threeH=$('#threeContainer').height();
var container , camera , renderer , scene , controls;

//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera =  new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
    camera.position.set(0,2000,0);

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.9);
    dirLight1.position.set(0, 200, 0);
    scene.add(dirLight1);
    //判断是否支持webGL

    renderer = new THREE.WebGLRenderer({antialias:true});

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( threeW,threeH );
    renderer.setClearColor(0xffffff);
    container.appendChild( renderer.domElement );

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.minDistance=1000;
    controls.maxDistance=3000;
}
var renderStep=0;
function animate() {
    requestAnimationFrame( animate );
    renderStep++;
    if(renderStep<2)return;
    renderStep=0;
    render();
}
function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
init();
animate();

var material = new THREE.MeshPhongMaterial({color:'#f00'});
var sph = new THREE.SphereGeometry(8,18,18);
var mesh = new THREE.Mesh(sph,material);
//创建圆球
function C(x,y,z) {
    var m=mesh.clone();
    m.position.set(x,y,z);
    return m;
}
function createText(texts,x,y,z,color,size){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
    var text = new SpriteText2D(texts, textStyle);
    text.rotation = camera.rotation;
    text.position.set(x,y,z);
    return text;
}
function createLineMesh(vertices, color, style) {
    var lineMesh = null, geometryLine = new THREE.Geometry();
    if (!color) {
        color = '#000';
    }
    if(style==2) {
        geometryLine.vertices = vertices;
        geometryLine.computeLineDistances();
        lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            dashSize: 3,
            gapSize: 3,
            depthTest:false
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

var model=new THREE.Group();
function modelPut(obj,mtl,O,callback) {
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) { };
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'obj/' );
    mtlLoader.load( mtl, function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'obj/' );
        objLoader.load( obj, function ( object ) {
            object.scale.x=1.5;
            object.scale.y=1.5;
            object.scale.z=1.5;
            O.add(object);
            callback && callback(O);
        }, onProgress, onError );
    });
}

var base=new THREE.Group();
modelPut('pao.obj','pao.mtl',model,function (O) {
    O.position.y=35;
    model.rotation.y=Math.PI/2;
    base.add(model);
});
var cube1,cube2;
function createBase() {
    cube1 = new THREE.Mesh(new THREE.CircleGeometry(600,36), new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('image/b.png'),transparent:true}));
    cube1.rotation.x=-Math.PI/2;
    cube2 = new THREE.Mesh(new THREE.CircleGeometry(600,36), new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('image/n.png'),transparent:true}));
    cube2.visible=false;
    cube2.rotation.x=-Math.PI/2;
    var textA=createText('A',-550,60,-30,'#000',40);
    var textB=createText('B',550,60,-30,'#000',40);
    // var vertices=[];
    // vertices.push(vec3(-500,10,1),vec3(500,10,1));
    // var lineAB=createLineMesh(vertices,'#000',3);
    base.add(cube1,cube2,textA,textB);
    // var rect = new THREE.Mesh(new THREE.PlaneGeometry(1800,1800),new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('image/timg.jpg'),side:THREE.DoubleSide,transparent:true,opacity:0.6}));
    // rect.position.y=-1;
    // rect.rotation.x=-Math.PI/2;
    // rect.rotation.z=-Math.PI/4;
    scene.add(base);
}
createBase();

var SA;
function changeAng(ad) {
    cancelAnimationFrame(SA);
    var step=0;
    var an=function(){
        SA=requestAnimationFrame(an);
        step++;
        if(step<3)return;
        step=0;
        base.rotation.y+=ad;
    }
    an();
}

var chooseN=0;
function step() {
    var index=$(this).index();
    if(chooseN==index){
        return;
    }
    chooseN=index;
    for(var j in B){
        scene.remove(B[j]);
    }
    $('#step>div').css({'background':'#fff','color':'#000'});
    $(this).css({'background':'#5CAEFD','color':'#fff'});
    if(index==0){
        cancelAnimationFrame(SA);
        base.rotation.y=0;
        cube1.visible=true;
        cube2.visible=false;
    }else if(index==1){
        changeAng(-0.005);
        cube1.visible=false;
        cube2.visible=true;
    }else if(index==2){
        changeAng(0.005);
        cube1.visible=true;
        cube2.visible=false;
    }
}

var B={},S,T;
function Fire(){
	var i=0;
	$('#step>div,.slider,#check>span').css('pointer-events','none');
	S=setInterval(function(){
		if(i==12){
			clearInterval(S);
            cancelAnimationFrame(SA);
			$('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
            checked=false;
            $('#step>div,.slider,#check>span').css('pointer-events','auto');
			return;
		}
		for(var k in B){
			B[k].children[0].children[0].position.z+=30;
		}
		T=setTimeout(function(){
			var ang1=base.rotation.y;
			var ang2=model.rotation.y;
			var x=model.position.x;
			var CB=C(0,35,30);
			B[i]=new THREE.Group();
			var BC=new THREE.Group();
			BC.rotation.y=ang2;
			BC.position.x=x;
			BC.add(CB);
			B[i].add(BC);
			B[i].rotation.y=ang1;
			scene.add(B[i]);
			clearTimeout(T);
			i++;
		},200);
	},200);
}

var checked=false;
function check(){
    for(var j in B){
        scene.remove(B[j]);
    }
    zzz();
    if(checked){
        $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        checked=false;
    }else{
        $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        checked=true;
        Fire();
    }
}

function zzz() {
    if(chooseN==1){
        changeAng(-0.005);
    }else if(chooseN==2){
        changeAng(0.005);
    }
}

function reset() {
    clearTimeout(T);
    clearInterval(S);
    cancelAnimationFrame(SA);
    chooseN=0;
    $('#step>div').css({'background':'#fff','color':'#000'});
    $('#step .step1').css({'background':'#5CAEFD','color':'#fff'});
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    checked=false;
    for(var j in B){
        scene.remove(B[j]);
    }
    $('#step>div,.slider,#check>span').css('pointer-events','auto');
    $('.s1 .sliderLeft').width(103);
    $('.s1 .xdsoft_range2dslider_runner').css('left','103px');
    $('.s2 .sliderLeft').width(0);
    $('.s2 .xdsoft_range2dslider_runner').css('left','0px');
    model.position.x=0;
    model.rotation.y=Math.PI/2;
    base.rotation.y=0;
    cube1.visible=true;
    cube2.visible=false;
    camera.position.set(0,2000,0);
    camera.zoom=1;
    camera.updateProjectionMatrix();
}

$('#slider1').on('change',function () {
    for(var j in B){
    	scene.remove(B[j]);
    }
    zzz();
    var v=parseInt($(this).val());
    model.position.x=v;
});
$('#slider2').on('change',function () {
    for(var j in B){
        scene.remove(B[j]);
    }
    zzz();
    var v=parseInt($(this).val())+90;
    model.rotation.y=v*Math.PI/180;
});
if(isMob){
    $('#step>div').on('touchstart',step);
    $('#reset').on('touchstart',reset);
    $('#check').on('touchstart',check);
}else{
    $('#step>div').on('click',step);
    $('#reset').on('click',reset);
    $('#check').on('click',check);
}

