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
if(wHeight<580){
    zoom=0.8
    $('#main_right').css('zoom',zoom);
}
$('#main_left').width(wWidth-280*zoom);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
    var cW=$('canvas').width();
    var cH=$('canvas').height();
    $('canvas').css({'left':($('#threeContainer').width()-cW)/2+'px','top':($('#threeContainer').height()-cH)/2+'px'});
}

var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();
var threeW=$('#threeContainer').width();
var threeH=$('#threeContainer').height();
var container , camera , renderer , scene , controls;
//照相机配置
var fov = 45;//拍摄距离  视野角值越大，场景中的物体越小
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW/-1.8,threeW/1.8,threeH/1.8,threeH/-1.8,1,2000);
    camera.position.set(160,131,460);

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.8);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.8);
    dirLight2.position.set(-200, -200, -100);
    scene.add(dirLight1,dirLight2);
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 0, 0 );
    scene.add( hemiLight );
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
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}

function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    if(camera.zoom<=0.5){
        camera.zoom=0.5000001;
        return;
    }else if(camera.zoom>=2){
        camera.zoom=1.99999999;
        return;
    }
    camera.fov = fov;
    camera.updateProjectionMatrix();
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
init();
animate();

function vec3(x,y,z){
    return new THREE.Vector3(x, y, z);
}

//创建圆球
function C(color,radius,x,y,z) {
    var material = new THREE.MeshPhongMaterial({color:color,transparent:true,side:THREE.DoubleSide,opacity:1});
    var sph = new THREE.SphereGeometry(radius,18,18);
    var mesh = new THREE.Mesh(sph,material);
    mesh.position.set(x,y,z);
    return mesh;
}

// 模型导入
var model1=new THREE.Group();
var model2=new THREE.Group();
var model3=new THREE.Group();
var model4=new THREE.Group();

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
        for(var i in materials.materials){
            if(materials.materials[i].name=='03___Default'){
                materials.materials[i]=new THREE.MeshPhongMaterial({color:'#F9DD6C'});
            }else if(materials.materials[i].name=='09___Default'){
                materials.materials[i]=new THREE.MeshPhongMaterial({color:'#634DD7'});
            }else{
                materials.materials[i]=new THREE.MeshPhongMaterial({color:materials.materials[i].color});
            }
        }
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'obj/' );
        objLoader.load( obj, function ( object ) {
            if(window.innerWidth<500||window.innerHeight<500) {
                object.scale.x = scale;
                object.scale.y = scale;
                object.scale.z = scale;
            }
            else {
               scene.scale.set(2,2,2);
            }
            O.add(object);
            object.children[1].visible=false;
            object.children[2].visible=false;
            $('#loading').hide();
            callback && callback(O);
        }, onProgress, onError );
    });
}
modelPut('zns.obj','zns.mtl',model1,1,function (O) {
    scene.add(O)
    if(window.innerWidth<500||window.innerHeight<500) {
        O.position.y = 0;
    }
    else {
        O.position.y = 10;
    }
});

//滑动按钮
var checked1=false,checked2=false;
function step(){
    var index=$(this).index();
    chooseNum=index;
    if(index == 0){
      if(checked1){
          $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
          model1.children[0].children[2].visible=false;
          checked1=false;
      }else{
          $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
          model1.children[0].children[2].visible=true;
          checked1=true;
      }
     }else{
      if(checked2){
          $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
          model1.children[0].children[1].visible=false;
          checked2=false;
      }else{
          $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
          model1.children[0].children[1].visible=true;
          checked2=true;
      }
     }
}

//移除场景中元素
function removeS() {
    for(var i=scene.children.length;i>1;i--){
        scene.remove(scene.children[i]);
    }
}

//重置按钮
function reset(){
    $('.check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    $('.t span').css('background','#5CAEFD');
    model1.children[0].children[1].visible=false;
    model1.children[0].children[2].visible=false;
    if(window.innerWidth<500||window.innerHeight<500) {
        model1.position.set(0,0,0);
    }
    else {
        model1.position.set(0,10,0);
    }


    scene.remove(model2,model3,model4);
    addNum=0;
    flag=0;
    checked1=false;
    checked2=false;
    camera.position.set(160,131,460);
    camera.zoom=1;
    camera.updateProjectionMatrix();
}

//堆积
var addNum=0,flag=0;
function addC() {
    addNum++;
    if(addNum>3) return;
    $('.t span:lt('+addNum+')').css('background','#D5D5D5');
    if(flag == 0){
        modelPut('zns.obj','zns.mtl',model2,1,function (O) {
            scene.add(O)
        });
        if(window.innerWidth<500||window.innerHeight<500) {
            model1.position.set(-25, -10, 0);
            model2.position.set(49, -10, 0);
        }
        else{
            model1.position.set(-25, 10, 0);
            model2.position.set(49, 10, 0);

        }
        flag++;
    }else if(flag == 1){
        modelPut('zns.obj','zns.mtl',model3,1,function (O) {
            scene.add(O)
        });
        if(window.innerWidth<500||window.innerHeight<500) {
        model1.position.set(-25,-10,0);
        model2.position.set(49,-10,0);
        model3.position.set(-25,64,0);
        }
        else{
            model1.position.set(-25,10,0);
            model2.position.set(49,10,0);
            model3.position.set(-25,84,0);
        }
        flag++;
    }else {
        modelPut('zns.obj','zns.mtl',model4,1,function (O) {
            scene.add(O)
        });
        if(window.innerWidth<500||window.innerHeight<500) {
            model4.position.set(49, 64, 0);
        }
        else{
            model4.position.set(49,84, 0);
        }
    }
}

if(isMob){
    $('.check').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
    $('.addB').on('touchstart',addC);
    $('.addB').on('touchend',function () {
        $(this).css({'background':'#fff','color':'#000'});
    });
}else{
    $('.check').on('click',step);
    $('#reset img').on('click',reset);
    $('.addB').on('mousedown',addC);
    $('.addB').on('mouseup',function () {
        $(this).css({'background':'#fff','color':'#000'});
    });
}

