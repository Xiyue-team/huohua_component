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
var leftC=0;
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
    leftC=($('#threeContainer').width()-cW)/2;
    $('canvas').css({'left':leftC+'px','top':($('#threeContainer').height()-cH)/2+'px'});
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
init();
animate();
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
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

    // scene
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
    camera.position.set(0,600,1400);

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}
function animate() {
    if(camera.position.y<600){
        camera.position.y=600;
    }else if(camera.position.y>1000){
        camera.position.y=1000
    }
    if(camera.position.x<-1400){
        camera.position.x=-1400;
    }else if(camera.position.x>1400){
        camera.position.x=1400;
    }
    if(camera.position.z<-1400){
        camera.position.z=-1400;
    }else if(camera.position.z>1400){
        camera.position.z=1400;
    }
    requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
function vec3(x,y,z){
    return new THREE.Vector3(x, y, z);
}

//创建圆球
function C(color,radius,x,y,z) {
    var material = new THREE.MeshBasicMaterial({color:color,transparent:true,side:THREE.DoubleSide,opacity:1});
    var sph = new THREE.SphereGeometry(radius,18,18);
    var mesh = new THREE.Mesh(sph,material);
    mesh.position.set(x,y,z);
    return mesh;
}
var Sun=new THREE.Group(),rect3=null,rect33=null;
function drawBase(){
    //树桩
    var shu = new THREE.Mesh(new THREE.CylinderGeometry(15,15,500,36,1),new THREE.MeshBasicMaterial({color:'#8A592D',side:THREE.DoubleSide}));
    shu.position.y=-100;
    var CircleG = new THREE.CircleGeometry(15, 36, 0, Math.PI*2);
    var CircleM = new THREE.MeshBasicMaterial({color: "#BA8251"});
    var shu2 = new THREE.Mesh(CircleG, CircleM);
    shu2.rotation.x=-Math.PI/2;
    shu2.position.y=150;

    // 平面
    var rect = new THREE.Mesh(new THREE.PlaneGeometry(1000,1000),new THREE.MeshBasicMaterial({color:'#98B478'}));
    rect.position.y=-300;
    rect.rotation.x=-Math.PI/2;

    //旋转阴影
    var rect2 = new THREE.Mesh(new THREE.PlaneGeometry(300,30),new THREE.MeshBasicMaterial({color:'#6a7e54'}));
    rect2.position.y=-298;
    rect2.position.x=150;
    rect2.rotation.x=-Math.PI/2;
    var rect22 = createShape();

    //初始阴影
    rect3= new THREE.Mesh(new THREE.PlaneGeometry(300,30),new THREE.MeshBasicMaterial({color:'#6a7e54'}));
    rect3.position.y=-298;
    rect3.position.x=150;
    rect3.rotation.x=-Math.PI/2;
    rect3.visible=false;
    rect33 = createShape();
    rect33.visible=false;

    //光源
    var SunC=C('#FFC116',30,-400,450,0);

    Sun.add(SunC,rect2,rect22);
    scene.add(rect,Sun,shu,shu2,rect3,rect33);

    lineB(11,Math.PI/6);
    lineB(10,Math.PI/3);
    lineB(9,Math.PI/2);
    lineB(8,Math.PI/3*2);
    lineB(7,Math.PI/6*5);
    lineB(6,Math.PI);
    lineB(5,Math.PI+Math.PI/6);
    lineB(4,Math.PI+Math.PI/3);
    lineB(3,Math.PI+Math.PI/2);
    lineB(2,Math.PI+Math.PI/3*2);
    lineB(1,Math.PI+Math.PI/6*5);
}
var LG={};
function lineB(i,a) {
    LG[i]=new THREE.Group();
    var ll= new THREE.Mesh(new THREE.PlaneGeometry(300,30),new THREE.MeshBasicMaterial({color:'#6a7e54'}));
    ll.position.y=-298;
    ll.position.x=150;
    ll.rotation.x=-Math.PI/2;
    var lp = createShape();
    LG[i].visible=false;
    LG[i].add(ll,lp);
    LG[i].rotation.y=a;
    scene.add(LG[i]);
}
drawBase();
function createShape() {
    var shape = new THREE.Shape();
    var material1 = new THREE.MeshBasicMaterial({ 'color': '#6a7e54' });
    shape.moveTo(0,-15,0);
    for (var i = -90; i < 90; i++) {
        var x=10*Math.cos(i*Math.PI/180);
        var y=15*Math.sin(i*Math.PI/180);
        shape.lineTo(x, y , 0);
    }
    shape.lineTo(0, -15,0);
    var mesh= new THREE.Mesh(new THREE.ShapeGeometry(shape), material1);
    mesh.position.x=299.9;
    mesh.position.y=-298;
    mesh.rotation.x=-Math.PI/2
    return mesh;
}
createShape()
function reset() {
    Sun.rotation.y=0;
    for(var j=1;j<=11;j++){
        LG[j].visible=false;
    }
    rect3.visible=false;
    rect33.visible=false;
    camera.position.set(0,600,1400);
    $('.s1 .sliderLeft').width(0);
    $('.s1 .xdsoft_range2dslider_runner').css('left','0');
}
var CY=new THREE.Group();
$('#slider1').change(function(){
    scene.remove(CY);
    var v=$(this).val();
    var i=Math.floor(parseInt(v)/30);
    if(i!=12){
        for(var j=1;j<=11;j++){
            LG[j].visible=false;
        }
    }
    if(i!=0&&i!=12){
        for(var j=1;j<=i;j++){
            LG[j].visible=true;
        }
    }
    if(parseInt(v)==0||parseInt(v)==360){
        rect3.visible=false;
        rect33.visible=false;
    }else{
        rect3.visible=true;
        rect33.visible=true;
    }
    var r=parseInt(v)*Math.PI/180;
    Sun.rotation.y=-r;
});

if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}
