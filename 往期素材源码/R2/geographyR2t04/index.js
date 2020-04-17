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
var lastRenderTime = new Date().getTime();
if(wHeight<580){
    zoom=0.8;
    $('#app').css('zoom',zoom);
}
$('#main_left').width(wWidth/zoom-280);
var LH=wHeight/zoom-80;
$('#main_left #threeContainer').height(LH);
var LW=wWidth/zoom-280;
$('#mark div').css({'top':LH/2-40+'px','left':LW/2+115+'px'});
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        $('#app').css('zoom',zoom);
    }else{
        zoom=1;
        $('#app').css('zoom',zoom);
    }
    $('#main_left').width(wWidth/zoom-280);
    LH=wHeight/zoom-80;
    $('#main_left #threeContainer').height(LH);
    var cW=$('canvas').width();
    var cH=$('canvas').height();
    $('canvas,#mark').css({'left':($('#threeContainer').width()-cW)/2+'px','top':($('#threeContainer').height()-cH)/2+'px'});
    $('#mark').width(cW).height(cH);
    $('#mark div').css({'top':cH/2-40+'px','left':cW/2+115+'px'});
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
var PI=Math.PI / 180;
init();
animate();
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW/-1.5,threeW/1.5,threeH/1.5,threeH/-1.5,1,2000);
    camera.position.set(0,0,1000);

    // //判断是否支持webGL
    // renderer = null;
    // if(false){
        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    // }else{
    //     renderer = new THREE.CanvasRenderer({antialias:true,alpha:true});
    // }
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
    var  t =  new Date().getTime();
    if(t-lastRenderTime>17) {
        controls.update();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        lastRenderTime = new Date().getTime();
    }
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
    var CircleG = new THREE.CircleGeometry(50,72,0,Math.PI*2);
    var CircleM = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/s.png'),transparent:true ,overdraw : true});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.position.x=-80;
    var vertices1=[],vertices2=[],vertices3=[];
    for(var i=0;i<361;i+=4) {
        vertices1.push(vec3(200 * Math.cos(i * PI), 100 * Math.sin(i * PI), 0));
        vertices2.push(vec3(300 * Math.cos(i * PI), 180 * Math.sin(i * PI), 0));
        vertices3.push(vec3(400 * Math.cos(i * PI), 260 * Math.sin(i * PI), 0));
    }
    var line1=createLineMesh(vertices1,'#fff',3);
    var line2=createLineMesh(vertices2,'#fff',3);
    var line3=createLineMesh(vertices3,'#fff',3);
    scene.add(Circle,line1,line2,line3);
}
drawBase();

function CR(src,x) {
    var CircleG = new THREE.CircleGeometry(26,72,0,Math.PI*2);
    var CircleM = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(src) ,overdraw : true,transform:true});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.position.x=x;
    return Circle;
}
var CJ=CR('image/qh.png',200);
CJ.material.opacity=0;
CJ.visible=false;
var C=CR('image/q.png',300);
C.material.opacity=1;
changeP(C,300,180,3)
var CC=CR('image/qc.png',400);
CC.material.opacity=0;
CC.visible=false;
scene.add(CJ,C,CC);

var SP;
function changeP(O,ra,rb,type) {
    clearInterval(SP);
    var i=0;
    SP=setInterval(function () {
        var x=ra * Math.cos(i * PI),y=rb * Math.sin(i * PI);
        O.position.set(x,y,0);
        if(i>=0&&i<=30||i>=330&&i<=360){
            i+=type-Math.cos(i * PI);
        }else if(i>30&&i<140||i>220&&i<330){
            i+=type-Math.cos(i * PI);
        }else{
            i+=type-Math.cos(i * PI);
        }
        if(i>=360){
            i=0;
        }
    },40)
}

var chooseNum=1,CY,CX,S;
$( ".draggable" ).draggable({
    revert: 'invalid',
    helper:"clone",
    start:function () {
        $('img.draggable').eq(0).hide();
        $('#mark').show();
    },
    stop:function () {
        $('img.draggable').eq(0).show();
        $('#mark').hide();
    }
});
$( "#mark>div>div" ).droppable({
    accept: '.draggable',
    drop: function(event,ui) {
        var index=$(event.target).index();
        if(chooseNum==index) return;
        clearInterval(SP);
        var i=0;
        var j=1;
        if(chooseNum==0){
            CY=CJ;
        }else if(chooseNum==1){
            CY=C;
        }else if(chooseNum==2){
            CY=CC;
        }else{
            CY=null;
        }
        if(index==0){
            CX=CJ;
            $('#show').css('background-image','url(image/1.gif)');
            if(chooseNum==1){
                CC.position.set(400,0,0);
            }else if(chooseNum==2){
                C.position.set(300,0,0);
            }
        }else if(index==1){
            CX=C;
            if(chooseNum==0){
                CC.position.set(400,0,0);
            }else if(chooseNum==2){
                CJ.position.set(200,0,0);
            }
            $('#show').css('background-image','url(image/2.gif)');
        }else if(index==2){
            CX=CC;
            if(chooseNum==0){
                C.position.set(300,0,0);
            }else if(chooseNum==1){
                CJ.position.set(200,0,0);
            }
            $('#show').css('background-image','url(image/3.gif)');
        }
        cancelAnimationFrame(S);
        if(CY!=null){
            CY.visible=false;
            CY.material.opacity=0;
        }
        var an=function () {
            if(i>=0.8){
                cancelAnimationFrame(S);
                CY.material.opacity=0;
                CX.material.opacity=1;
                CY.visible=false;
                CX.visible=true;
                CJ.position.set(200,0,0);
                CC.position.set(400,0,0);
                C.position.set(300,0,0);
                var ra,rb,type;
                if(index==0){
                    ra=200,rb=100,type=5;
                }else if(index==1){
                    ra=300,rb=180,type=3;
                }else if(index==2){
                    ra=400,rb=260,type=2;
                }
                changeP(CX,ra,rb,type);
                return;
            }
            if(CY!=null){
                CY.material.opacity=j;
            }
            CX.material.opacity=i;
            i+=0.05;
            j-=0.05;
            S=requestAnimationFrame(an)
        }
        an();
        chooseNum=index;
    }
});
function reset(){
    chooseNum=1;
    cancelAnimationFrame(S);
    CJ.material.opacity=0;
    CJ.visible=false;
    CJ.position.set(200,0,0);
    CC.material.opacity=0;
    CC.visible=false;
    CC.position.set(400,0,0);
    C.material.opacity=1;
    C.visible=true;
    C.position.set(300,0,0);
    changeP(C,300,180,3);
    $('#show').css('background-image','url(image/2.gif)');
}
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}
