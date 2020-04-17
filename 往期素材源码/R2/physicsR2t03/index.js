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
if(wHeight<550){
    zoom=0.7;
    $('#main_right').css('zoom',zoom);
}else if(wHeight<690){
    zoom=0.8;
    $('#main_right').css('zoom',zoom);
}
$('#main_left').width(wWidth-280*zoom);
var LH=$('#main_left').height()-80;
$('#main_left #threeContainer').height(LH);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<550){
        zoom=0.7;
        $('#main_right').css('zoom',zoom);
    }else if(wHeight<690){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
    LH=$('#main_left').height()-80;
    $('#main_left #threeContainer').height(LH);
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
        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    }else{
        renderer = new THREE.CanvasRenderer({antialias:true,alpha:true});
    }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( threeW,threeH );
    renderer.setClearColor(0xffffff,0);
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
function drawBase() {
    var CircleG = new THREE.CircleGeometry(150,72,0,Math.PI*2);
    var CircleM = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/q.png') ,overdraw : true});
    var Circle = new THREE.Mesh(CircleG, CircleM);

    var vertices1=[],vertices2=[],vertices3=[];
    for(var i=0;i<361;i+=4) {
        vertices1.push(vec3(200 * Math.cos(i * Math.PI / 180), 200 * Math.sin(i * Math.PI / 180), 0));
        vertices2.push(vec3(250 * Math.cos(i * Math.PI / 180), 250 * Math.sin(i * Math.PI / 180), 0));
        vertices3.push(vec3(300 * Math.cos(i * Math.PI / 180), 300 * Math.sin(i * Math.PI / 180), 0));
    }
    var line1=createLineMesh(vertices1,'#fff',3);
    var line2=createLineMesh(vertices2,'#fff',3);
    var line3=createLineMesh(vertices3,'#fff',3);
    scene.add(Circle,line1,line2,line3);
}
drawBase();

var G=new THREE.Group();
var geometry = new THREE.PlaneGeometry(40,40);
var  material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/wx.png') ,overdraw : true});
var  rect = new THREE.Mesh(geometry,material);
rect.position.set(0,250,0)
G.add(rect);
G.rotation.z=-Math.PI/4;
scene.add(G);

var ang=0,rang=0.02;
var SR1,SR2;
function changG() {
    clearInterval(SR1);
    SR1=setInterval(function () {
        ang+=rang;
        G.rotation.z=ang-Math.PI/4;
    },40);
}
changG();
function lineG(end,h,f,callback) {
    clearInterval(SR2);
    if(f){
        var F=1;
    }else{
        var F=-1;
    }
    SR2=setInterval(function () {
        if(f){
            if(rect.position.y>=end){
                clearInterval(SR2);
                callback && callback();
                return;
            }
        }else{
            if(rect.position.y<=end){
                clearInterval(SR2);
                callback && callback();
                return;
            }
        }
        rect.position.y=rect.position.y+F*h;
    },40);
}
var rangO,SAng;
function changeS(a,f,r) {
    clearInterval(SAng);
    var deg=(a-0.03)/0.005*40;
    var degO=(rangO-0.03)/0.005*40;
    $('#sudu img').css({'transform':'rotate('+degO+'deg)'});
    var DA=deg-degO;
    if(f){
        var DAT=DA/(r/h);
    }else{
        var DAT=DA/30;
    }
    SAng=setInterval(function () {
        var degO=parseFloat($('#sudu img')[0].style.transform.slice(7,-4));
        if(DA<0){
            if(degO<=deg){
                clearInterval(SAng);
                return;
            }
        }else{
            if(degO>=deg){
                clearInterval(SAng);
                return;
            }
        }
        $('#sudu img').css({'transform':'rotate('+(degO+DAT)+'deg)'});
    },40);
}
function reset(){
    $('#sudu img').css({'transform':'rotate(0deg)'});
    rang=0.04;
    $('#slider1').range2DSlider({
        template:'vertical',
        value:[[0,1]],
        height:265,
        showLegend:false,
        onlyGridPoint:true,
        round:true,
        axis:[[0,0],[0,2]]
    });
    clearInterval(SR2);
    rect.position.y=200;
    time1=0;
}
var chooseNO=1;
$('#slider1').on('change',function () {
    var v=$(this).val();
    var chooseN=v.split('|')[1];
    var R;
    var F=true;
    if(chooseN>chooseNO){
        F=false;
    }
    var rang2;
    if(chooseN==0){
        R=300;
        if(chooseNO==2){
            rang=0.045;
            rangO=0.04;
        }else if(chooseNO==1){
            rang=0.035;
            rangO=0.03;
        }
        rang2=0.02;
    }else if(chooseN==1){
        R=250;
        if(chooseNO==2){
            rang=0.045;
            rangO=0.04;
        }else if(chooseNO==0){
            rang=0.015;
            rangO=0.02;
        }
        rang2=0.03;
    }else{
        R=200;
        if(chooseNO==0){
            rang=0.015;
            rangO=0.02;
        }else if(chooseNO==1){
            rang=0.025;
            rangO=0.03;
        }
        rang2=0.04;
    }
    h=Math.abs(rect.position.y-R)/(Math.PI/rang);
    changeS(rang,true,Math.abs(rect.position.y-R));
    lineG(R,h,F,function () {
        rangO=rang;
        rang=rang2;
        changeS(rang,false);
        changG();
        chooseNO=chooseN;
    });

});
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}
