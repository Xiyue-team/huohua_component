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
    camera = new THREE.OrthographicCamera(threeW/-2.2,threeW/2.2,threeH/2.2,threeH/-2.2,1,2000);
    camera.position.set(0,100,250);

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
function createText(texts,x,y,z){
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: 18+'px "Cambria Math"', fillStyle: '#000', antialias: true};
    var text = new SpriteText2D(texts, textStyle);
    text.rotation = camera.rotation;
    text.position.set(x,y,z);
    return text;
}
function createTriangleFace(vertices){
    var material = new THREE.MeshBasicMaterial({color:'#d8f1ff'});
    var geom = new THREE.Geometry();
    geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
    geom.vertices = vertices;
    var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
    return mesh;
}
function ceratemesh(n1,n2,n3,o){
    var vertices=[];
    vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
    vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
    vertices.push(vec3(point[n3][0],point[n3][1],point[n3][2]))
    var mesh=createTriangleFace(vertices);
    o.add(mesh)
}
function line_c(n1,n2,o1,o2){
    var line;
    var vertices=[];
    vertices.push(vec3(point2[n1][0],point2[n1][1],point2[n1][2]))
    vertices.push(vec3(point2[n2][0],point2[n2][1],point2[n2][2]))
    line=createLineMesh(vertices,'#4990E2',3)
    o1.add(line);
    line=createLineMesh(vertices,'#4990E2',2)
    o2.add(line);
}
function createA(a,b,c,d,o1,o2){
    ceratemesh(a,b,c,o1);
    ceratemesh(b,c,d,o1);
    ceratemesh(c,d,a,o1);
    ceratemesh(d,a,b,o1);
    
    line_c(a,b,o1,o2);
    line_c(a,c,o1,o2);
    line_c(a,d,o1,o2);
    line_c(b,c,o1,o2);
    line_c(b,d,o1,o2);
    line_c(c,d,o1,o2);
}
var x=120*Math.cos(30/180*Math.PI);
var z=120*Math.sin(30/180*Math.PI);
var point={
    "1":[0,-100,120],
    "2":[x,-100,-z],
    "3":[-x,-100,-z],
    "4":[0,100,120],
    "5":[x,100,-z],
    "6":[-x,100,-z]
}
var point2={
    "1":[0,-100-0.3,120+0.3],
    "2":[x+0.3,-100-0.3,-z-0.3],
    "3":[-x-0.3,-100-0.3,-z-0.3],
    "4":[0,100+0.3,120+0.3],
    "5":[x+0.3,100+0.3,-z-0.3],
    "6":[-x-0.3,100+0.3,-z-0.3]
}
var obj1,obj11,obj2,obj22,obj3,obj33,text1,text2,text3,text4,text5,text6,text7,text8,text9,text10,text11,text12;
function draw(){
    obj1 = new THREE.Object3D();
    obj11 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj22 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj33 = new THREE.Object3D();
    createA(1,2,3,6,obj1,obj11);
    createA(1,2,4,6,obj2,obj22);
    createA(2,4,5,6,obj3,obj33);
    text1=createText('A',point[6][0]-10,point[6][1]+10,point[6][2]);
    text2=createText('A\'',point[3][0]-10,point[3][1]+10,point[3][2]);
    text3=createText('B\'',point[1][0],point[1][1]+10,point[1][2]+10);
    text4=createText('C\'',point[2][0]+10,point[2][1]+10,point[2][2]);

    text5=createText('A',point[6][0]-10,point[6][1]+10,point[6][2]);
    text5.visible=false;
    text6=createText('B\'',point[1][0],point[1][1]+10,point[1][2]+10);
    text6.visible=false;
    text7=createText('C\'',point[2][0]+10,point[2][1]+10,point[2][2]);
    text7.visible=false;
    text8=createText('B',point[4][0],point[4][1]+10,point[4][2]+10);

    text9=createText('A',point[6][0]-10,point[6][1]+10,point[6][2]);
    text9.visible=false;
    text10=createText('B',point[4][0],point[4][1]+10,point[4][2]+10);
    text10.visible=false;
    text11=createText('C',point[5][0]+10,point[5][1]+10,point[5][2]);
    text12=createText('C\'',point[2][0]+10,point[2][1]+10,point[2][2]);
    text12.visible=false;

    obj1.add(text1,text2,text3,text4);
    obj2.add(text5,text6,text7,text8);
    obj3.add(text9,text10,text11,text12);
    obj1.children[3].children[0].material.color.set('#73b1f8');
    obj2.children[3].children[0].material.color.set('#73b1f8');
    obj2.children[1].children[0].material.color.set('#154d8d');
    obj3.children[3].children[0].material.color.set('#154d8d');
    scene.add(obj1,obj2,obj3);
    scene2.add(obj11,obj22,obj33);
}
draw();
function reset() {
    scene.remove(obj1,obj2,obj3);
    scene2.remove(obj11,obj22,obj33);
    draw();
    $('.s1 .sliderLeft').width(0);
    $('.s1 .xdsoft_range2dslider_runner').css('left','0px');
    $('.s1 .xdsoft_slider_label').text('10');
    camera.position.set(0,100,250);
}
$('#slider1').change(function(){
    var v=$(this).val();
    r=parseInt(v)*20;
    obj1.position.x=-r;
    obj11.position.x=-r;
    obj3.position.x=r; 
    obj33.position.x=r;
    if(r!=0){
        text5.visible=true;
        text6.visible=true;
        text7.visible=true;
        text9.visible=true;
        text10.visible=true;
        text12.visible=true;
    }
});
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}
