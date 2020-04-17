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
init();
animate();
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW/-2.5,threeW/2.5,threeH/2.5,threeH/-2.5,1,2000);
    camera.position.set(0,100,250);
    if(window.innerHeight<600){
        camera.zoom=0.8;
    }else{
        camera.zoom=1;
    }
    camera.updateProjectionMatrix();
    // scene
    scene = new THREE.Scene();

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
    controls.enableZoom = false;
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
            transparent:true,
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
function createText(texts,x,y,z,color,size){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: size+'px', fillStyle: color, antialias: true};
    var text = new SpriteText2D(texts, textStyle);
    text.rotation = camera.rotation;
    text.position.set(x,y,z);
    return text;
}
function createCircleM(radius,ang){
    var CircleG = new THREE.SphereGeometry(radius,36,36,0, ang, 0, Math.PI);
    var CircleM = new THREE.MeshBasicMaterial({color: '#c8ddf6',side:THREE.DoubleSide});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.rotation.y=Math.PI;
    return Circle;
}
function createCircle(radius,start,end){
    var CircleG = new THREE.CircleGeometry(radius,50,start,end);
    var CircleM = new THREE.MeshBasicMaterial({color: '#4990E2',transparent:true,opacity:0.8,side:THREE.DoubleSide,depthTest:false});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.rotation.z=-Math.PI/2;
    return Circle;
}
function drawRectangle(r,ang){
    var mesh=createCircle(r,0,Math.PI);
    mesh.rotation.y=ang;
    return mesh;
}

var r=100,a=0,meshS;
//中轴线
function create1() {
    var vertices=[];
    vertices.push(vec3(0,180,0),vec3(0,-180,0));
    var line=createLineMesh(vertices, '#4990E2', 2);
    var textL=createText('L',0,200,0,'#4990E2','12');
    scene.add(line,textL);
}
create1();
draw();
var model;
function draw(){
    if(model!=undefined){
        scene.remove(model);
    }
    var ang=a*Math.PI/180;
    //旋转平面
    model=new THREE.Group();
    meshS=drawRectangle(r,0)
    meshS.rotation.y=ang;

    //圆球面及赤道线
    var meshM=createCircleM(r,ang);
    model.add(meshM,meshS);

    var vertices1=[];
    for(i=0;i<=a;i++){
        vertices1.push(new THREE.Vector3(r*Math.cos(i*Math.PI/180),0,-r*Math.sin(i*Math.PI/180)));
    }
    var line1=createLineMesh(vertices1, '#4990E2', 2);
    model.add(line1);

    scene.add(model);
}
draw();
var S;
function an(){
    $(this).css({'background':'#4990E2','color':'#fff'});
    $('.s3').css('pointer-events','none');
    clearInterval(S);
    a=0;
    $('.s3 .sliderLeft').width(0);
    $('.s3 .xdsoft_range2dslider_runner').css('left','0px');
    draw();
    S=setInterval(function () {
        if(a>=360){
            clearInterval(S);
            $('.dynamic').css({'background':'#fff','color':'#000'});
            $('.s3').css('pointer-events','auto');
            return;
        }
        a+=3;
        $('.s3 .sliderLeft').width(206/360*a);
        $('.s3 .xdsoft_range2dslider_runner').css('left',206/360*a+'px');
        $('.s3 .xdsoft_slider_label').text(a+'°');
        draw();
    },40);
}
function reset() {
    clearInterval(S);
    $('.dynamic').css({'background':'#fff','color':'#000'});
    $('.s3').css('pointer-events','auto');
    r=100,a=0;
    draw();
    $('.s1 .sliderLeft').width(98);
    $('.s1 .xdsoft_range2dslider_runner').css('left','98px');
    $('.s1 .xdsoft_slider_label').text('10');
    $('.s3 .sliderLeft').width(0);
    $('.s3 .xdsoft_range2dslider_runner').css('left','0px');
    $('.s3 .xdsoft_slider_label').text('0°');
    camera.position.set(0,100,250);
}
$('#slider1').change(function(){
    var v=$(this).val();
    r=parseInt(v)*10;
    draw();
});
$('#slider3').change(function(){
    var v=$(this).val();
    a=parseInt(v);
    draw();
});
if(isMob){
    $('.dynamic').on('touchstart',an);
    $('#reset img').on('touchstart',reset);
}else{
    $('.dynamic').on('click',an);
    $('#reset img').on('click',reset);
}
