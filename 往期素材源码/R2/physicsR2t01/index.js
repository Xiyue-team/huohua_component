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
    camera = new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
    camera.position.set(0,0,1000);

    //判断是否支持webGL
    renderer = null;
    if(false){
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

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enableRotate = false;
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
function createCircle(){
    var CircleG = new THREE.CircleGeometry(3,19);
    var CircleM = new THREE.MeshBasicMaterial({color: '#f00',side:THREE.DoubleSide});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    return Circle;
}
function drawBase() {
    var CircleG = new THREE.CircleGeometry(200,72,0,Math.PI*2);
    var CircleM = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/q.png') ,overdraw : true});
    var Circle = new THREE.Mesh(CircleG, CircleM);

    var geometry = new THREE.PlaneGeometry(60,30);
    var  material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/p.png') ,overdraw : true});
    var  rect = new THREE.Mesh(geometry,material);
    rect.position.y=210;
    scene.add(Circle,rect);
}
drawBase();

var G=new THREE.Group();
var PC=createCircle();
G.add(PC);
G.position.set(30,216,-1);
G.rotation.x=Math.PI;
G.visible=false;
scene.add(G);

var S,GL=null,GL2=null;
function d1(s,t){
    var i=0;
    S=setInterval(function () {
        if(i>=s){
            clearInterval(S);
            return;
        }
        var x=i;
        var y=i*i/t;
        var vertices=[];
        if(GL!=null){
            scene.remove(GL);
        }
        GL=new THREE.Group();
        for(var j=0;j<i;j++){
            var xl=j;
            var yl=j*j/t;
            vertices.push(vec3(xl,yl,0))
        }
        var lineP=createLineMesh(vertices,"#000",3);
        GL.add(lineP);
        GL.position.set(30,216,0)
        GL.rotation.x=Math.PI;
        scene.add(GL);
        G.position.set(30,216,0);
        G.visible=true;
        PC.position.set(x,y,0);
        i+=2;
    },55);
}
function d2(s,t){
    var i=0;
    S=setInterval(function () {
        if(i>=s){
            clearInterval(S);
            return;
        }
        var x=i;
        var y=i*i/t;
        var vertices=[];
        if(GL!=null){
            scene.remove(GL);
        }
        GL=new THREE.Group();
        for(var j=0;j<i;j++){
            var xl=j;
            var yl=j*j/t;
            vertices.push(vec3(xl,yl,0))
        }
        var lineP=createLineMesh(vertices,"#000",3);
        GL.add(lineP);
        GL.position.set(30,216,0)
        GL.rotation.x=Math.PI;
        scene.add(GL);
        G.position.set(30,216,0);
        G.visible=true;
        PC.position.set(x,y,0);
        i+=3;
    },30);
}
function d3(s){
    var i=-s;
    S=setInterval(function () {
        if(i>=28){
            clearInterval(S);
            return;
        }
        var x=200*Math.cos(i*Math.PI/180);
        var y=200*Math.sin(i*Math.PI/180);
        var vertices=[];
        if(GL!=null){
            scene.remove(GL);
        }
        GL=new THREE.Group();
        for(var j=-s;j<i;j++){
            var xl=200*Math.cos(j*Math.PI/180);
            var yl=200*Math.sin(j*Math.PI/180);
            vertices.push(vec3(xl,yl,0))
        }
        var lineP=createLineMesh(vertices,"#000",3);
        GL.add(lineP);
        GL.position.set(10,17,0);
        GL.rotation.x=Math.PI;
        scene.add(GL);
        G.position.set(10,17,0);
        G.visible=true;
        PC.position.set(x,y,0);
        i+=2;
    },20);
}

function d4(){
    var k=-82;
    S=setInterval(function () {
        var x=218*Math.cos(k*Math.PI/180);
        var y=218*Math.sin(k*Math.PI/180);
        G.position.set(0,0,0);
        G.visible=true;
        PC.position.set(x,y,0);
        var vertices=[];
        if(k<280){
            if(GL2!=null){
                scene.remove(GL2);
            }
            GL2=new THREE.Group();
            for(var j=-82;j<k;j++){
                var xl=218*Math.cos(j*Math.PI/180);
                var yl=218*Math.sin(j*Math.PI/180);
                vertices.push(vec3(xl,yl,0))
            }
            var lineP=createLineMesh(vertices,"#000",3);
            GL2.add(lineP);
            GL2.position.set(0,0,0);
            GL2.rotation.x=Math.PI;
            scene.add(GL2);
        }
        k+=2;
    },10);
}
function reset(){
    G.visible=false;
    clearInterval(S);
    scene.remove(GL,GL2);
    $('#step>div span').css('background','#f0f0f0');
}
function step(){
    clearInterval(S);
    scene.remove(GL,GL2);
    $('#step>div span').css('background','#f0f0f0');
    $(this).children('span').css('background','#5caefd');
    var index=$(this).parent().index()+1;
    if(index==1){
        d4();
    }else if(index==2){
        d3(84);
    }else if(index==3){
        d2(130,180);
    }else if(index==4){
        d1(90,150);
    }
}
if(isMob){
    $('#step>div').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
}else{
    $('#step>div').on('click',step);
    $('#reset img').on('click',reset);
}
