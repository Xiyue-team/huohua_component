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
    if(checked){
        $('canvas').css({'left':(leftC-140)+'px','top':($('#threeContainer').height()-cH)/2+'px'});
    }else{
        $('canvas').css({'left':leftC+'px','top':($('#threeContainer').height()-cH)/2+'px'});
    }
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
    renderer.autoClear = false;
    renderer.setSize( threeW,threeH );
    renderer.setClearColor(0xffffff);
    container.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    scene2 = new THREE.Scene();

    camera = new THREE.OrthographicCamera(threeW/-2.5,threeW/2.5,threeH/2.5,threeH/-2.5,1,2000);
    camera.position.set(10,20,250);

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
    renderer.clear();
    renderer.render( scene, camera );
    renderer.render( scene2, camera );
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
function createText(texts,x,y,z,color,size){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
    var text = new SpriteText2D(texts, textStyle);
    text.rotation = camera.rotation;
    text.position.set(x,y,z);
    return text;
}
function createCL(r,angX,angY,angZ,f){
    var vertices=[];
    var a;
    if(f){
        a=361;
    }else{
        a=181;
    }
    for(var i=0;i<a;i+=4){
        vertices.push(vec3(r*Math.cos(i*Math.PI/180),r*Math.sin(i*Math.PI/180),0));
    }
    var lineMesh1=createLineMesh(vertices,'#4990E2',3);
    var lineMesh2=createLineMesh(vertices,'#4990E2',2);
    lineMesh1.rotation.x=angX;
    lineMesh1.rotation.y=angY;
    lineMesh1.rotation.z=angZ;
    lineMesh2.rotation.x=angX;
    lineMesh2.rotation.y=angY;
    lineMesh2.rotation.z=angZ;
    return [lineMesh1,lineMesh2];
}
var r=75,CBase=null,n=0,lineC;
function drawB(){
    if(CBase!=null){
        scene.remove(CBase,lineC[0]);
        scene2.remove(lineC[1]);
    }
    var material = new THREE.MeshBasicMaterial({color:'#d8f1ff'});
    var sph = new THREE.SphereGeometry(r,36,36);  
    CBase = new THREE.Mesh(sph,material);

    lineC=createCL(r,Math.PI/2,0,0,true);
    scene.add(CBase,lineC[0]);
    scene2.add(lineC[1]);
}
drawB();
var LineObj1=null,LineObj2=null;
function draw(){
    if(LineObj1!=null){
        scene.remove(LineObj1);
        scene2.remove(LineObj2);
    }
    LineObj1=new THREE.Group();
    LineObj2=new THREE.Group();
    for(var i=0;i<n;i++){
        r1=Math.sqrt(r*r-r*r/((n+1)*(n+1))*(i+1)*(i+1));
        var line2=createCL(r1,Math.PI/2,0,0,true);
        line2[0].position.y=r/(n+1)*(i+1);
        line2[1].position.y=r/(n+1)*(i+1);
        LineObj1.add(line2[0]);
        LineObj2.add(line2[1]);
    }
    scene.add(LineObj1);
    scene2.add(LineObj2);
}
draw();

var objF1=null,objF2=null;
function drawF(){
    if(objF1!=null){
        scene.remove(objF1)
        scene2.remove(objF2)
    }
    objF1=new THREE.Group();
    objF2=new THREE.Group();
    var N=Math.floor(n/2)
    var ang1=Math.acos(r/(n+1)*N/r);
    var ang2=Math.acos(r/(n+1)*(N+1)/r);
    var ang=ang1-ang2;
    var material = new THREE.MeshBasicMaterial({color:'#dd5773',side:THREE.DoubleSide});
    var sph = new THREE.SphereGeometry(r,36,18,0,Math.PI*2,ang2,ang);
    var FBase = new THREE.Mesh(sph,material);
    var v=FBase.geometry.vertices;
    var vertices=[];
    console.log(v[0].y)
    vertices.push(vec3(0,0,0),v[0],vec3(0,v[0].y,0),vec3(0,0,0));
    var line1=createLineMesh(vertices,'#dd5773',2);
    objF1.add(FBase);
    objF2.add(line1);
    scene.add(objF1);
    scene2.add(objF2);
}

function reset() {
    r=75,n=0;
    drawB();
    draw();
    checked=false;
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    $('.s1 .sliderLeft').width(92);
    $('.s1 .xdsoft_range2dslider_runner').css('left','92px');
    $('.s1 .xdsoft_slider_label').text('5');
    $('.s2 .sliderLeft').width(0);
    $('.s2 .xdsoft_range2dslider_runner').css('left','0px');
    $('.s2 .xdsoft_slider_label').text('0');
    camera.position.set(0,100,250);
    scene.remove(objF1);
    scene2.remove(objF2);
    $('#show').fadeOut(500);
    $('canvas').animate({'left':leftC+'px'},500);
}
$('#slider1').change(function(){
    var v=$(this).val();
    r=parseInt(v)*12;
    drawB();
    if(n!=0){
        draw();
        if(checked){
            drawF();
        }
    }
});
$('#slider2').change(function(){
    var v=$(this).val();
    n=parseInt(v);
    draw();
    if(n==0){
        scene.remove(objF1);
        scene2.remove(objF2);
        $($('#check>span')).css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        checked=false;
    }
    if(checked){
        drawF();
    }
});
var checked=false;
function check(){
    if(n==0) return;
    if(checked){
        $(this).css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        $('#show').fadeOut(500);
        $('canvas').animate({'left':leftC+'px'},500);
        checked=false;
        scene.remove(objF1);
        scene2.remove(objF2);
    }else{
        $(this).css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        $('#show').fadeIn(500);
        $('canvas').animate({'left':(leftC)-140+'px'},500);
        checked=true;
        drawF();
    }
}
if(isMob){
    $('#reset img').on('touchstart',reset);
    $('#check>span').on('touchstart',check);
}else{
    $('#reset img').on('click',reset);
    $('#check>span').on('click',check);
}

