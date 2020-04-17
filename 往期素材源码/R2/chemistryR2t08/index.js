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
var width=window.innerWidth;
$('#main').height(height-120);
window.onresize=function () {
    height=window.innerHeight;
    width=window.innerWidth;
    $('#main').height(height-120);
    var cW=$('canvas').width();
    var cH=$('canvas').height();
    $('canvas').css({'left':($('#main').width()-cW)/2+'px','top':($('#main').height()-cH)/2+'px'});
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

var threeW=width;
var threeH=height-120;

var container , camera, renderer , scene , controls;

//初始化three场景
function init() {
    container = $('#main')[0];
    camera = new THREE.OrthographicCamera(threeW/-1,threeW/1,threeH/1,threeH/-1,1,2000);
    camera.position.set(0,400,400);

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight1.position.set(100, 100, 50);
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight2.position.set(-100, -100, -50);
    scene.add(dirLight1,dirLight2);
    //判断是否支持webGL

    renderer = null;
    if(canWebgl){
        renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        renderer = new THREE.CanvasRenderer({antialias:true});
    }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( threeW,threeH );
    renderer.setClearColor(0xffffff);
    container.appendChild( renderer.domElement );

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enableRotate =false;
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
init();
animate();

// 模型导入
var model1=new THREE.Group();
var model2=new THREE.Group();
var model3=new THREE.Group();
var model4=new THREE.Group();
var model5=new THREE.Group();
var model6=new THREE.Group();
var model7=new THREE.Group();
var model8=new THREE.Group();
function modelPut(obj,mtl,O,scale,callback) {
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
            object.scale.x=scale;
            object.scale.y=scale;
            object.scale.z=scale;
            O.add( object );
            O.visible=false;
            callback && callback(O)
        }, onProgress, onError );
    });
}
var f=[];
modelPut('becl2.obj','becl2.mtl',model1,4,function (O) {
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
});
modelPut('becl2_xuxian.obj','becl2_xuxian.mtl',model2,4,function (O) {
    var text=createText('180°',0,90,0);
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    O.add(text);
    scene.add(O);
});
modelPut('bf3.obj','bf3.mtl',model3,5,function (O) {
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/6;
});
modelPut('bf3_xuxian.obj','bf3_xuxian.mtl',model4,5,function (O) {
    var text=createText('120°',40,0,-100);
    O.add(text);
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/6;
});
modelPut('ch4.obj','ch4.mtl',model5,5,function (O) {
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/3;
    O.rotation.z=-Math.PI/3;
});
modelPut('ch4_xuxian.obj','ch4_xuxian.mtl',model6,5,function (O) {
    var text=createText('109°28\'',-40,90,0);
    O.add(text);
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/3;
    O.rotation.z=-Math.PI/3;
});
modelPut('sf6.obj','sf6.mtl',model7,5,function (O) {
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/4;
});
modelPut('sf6_xuxian.obj','sf6_xuxian.mtl',model8,5,function (O) {
    var text=createText('90°',-80,80,0);
    O.add(text);
    f.push(1);
    if(f.length>=8){
        $('#loading').hide();
    }
    scene.add(O);
    O.rotation.y=-Math.PI/4;
});
function createText(texts,x,y,z){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: 18+'px "Cambria Math"', fillStyle: '#000', antialias: true};
    var text = new SpriteText2D(texts, textStyle);
    text.rotation = camera.rotation;
    text.position.set(x,y,z);
    return text;
}

var chooseNum=4;
function choose(){
	$('#check').show();
	$('#main canvas').show();
	$('#main').css('background-image','none');
	camera.zoom=2;
	camera.updateProjectionMatrix();
	controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    var index=$(this).index();
    $('#title p span').css({'color':'#000','background':'#fff'});
    $(this).css({'color':'#fff','background':'#5caefd'});
    chooseNum=index;
    model1.visible=false;
	model2.visible=false;
	model3.visible=false;
	model4.visible=false;
	model5.visible=false;
	model6.visible=false;
	model7.visible=false;
	model8.visible=false;
    if(index==0){
    		model1.visible=true;
    		if(checked){
    			model2.visible=true;
    		}
		$('.titleName').html("BeCl<sub>2</sub>");
    }else if(index==1){
		model3.visible=true;
		if(checked){
    			model4.visible=true;
   	 	}
		$('.titleName').html("BF<sub>3</sub>");
    }else if(index==2){
		model5.visible=true;
		if(checked){
    			model6.visible=true;
    	}
		$('.titleName').html("CH<sub>4</sub>");
    }else{
		model7.visible=true;
		if(checked){
    			model8.visible=true;
    		}
		$('.titleName').html("SF<sub>6</sub>");
    }
}

function reset(){
	$('#check').hide();
	$('#main canvas').hide();
	$('#main').css('background-image','url(image/b.png)');
	chooseNum=4;
    $('#title p span').css({'color':'#000','background':'#fff'});
    model1.visible=false;
	model2.visible=false;
	model3.visible=false;
	model4.visible=false;
	model5.visible=false;
	model6.visible=false;
	model7.visible=false;
	model8.visible=false;
	camera.zoom=1;
	camera.position.set(0,400,400);
	camera.updateProjectionMatrix();
	controls.enableDamping = false;
    controls.enableZoom = false;
    controls.enableRotate =false;
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
	checked=false;
	$('.titleName').html("");
}
var checked=false;
function check(){
	if(chooseNum==4) return;
    if(checked){
        $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
		checked=false;
		if(chooseNum==0){
			model2.visible=false;
	   }else if(chooseNum==1){
			model4.visible=false;
	   }else if(chooseNum==2){
			model6.visible=false;
	   }else{
			model8.visible=false;
	    }
    }else{
        $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
		checked=true;
		if(chooseNum==0){
			model2.visible=true;
	   }else if(chooseNum==1){
			model4.visible=true;
	   }else if(chooseNum==2){
			model6.visible=true;
	   }else{
			model8.visible=true;
	    }
    }
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset').on('touchstart',reset);
    $('#check').on('touchstart',check);
}else{
    $('#title p span').on('click',choose);
    $('#reset').on('click',reset);
    $('#check').on('click',check);
}

