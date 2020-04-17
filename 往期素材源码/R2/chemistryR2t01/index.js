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

//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW/-3,threeW/3,threeH/3,threeH/-3,1,2000);
    camera.position.set(262,68,-88);

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight2.position.set(-200, -200, -100);
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
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
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

function createLineMesh(vertices, color, style) {
    var lineMesh = null, geometryLine = new THREE.Geometry();
    if (!color) {
        color = '#000';
    }
    if(style==2) {
        geometryLine.vertices = vertices;
        geometryLine.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            opacity: 0.8,
            dashSize: 10,
            gapSize: 10,
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

//创建圆球
function C(color,radius,x,y,z) {
    var material = new THREE.MeshPhongMaterial({color:color,transparent:true,side:THREE.DoubleSide,opacity:1});
    var sph = new THREE.SphereGeometry(radius,18,18);
    var mesh = new THREE.Mesh(sph,material);
    mesh.position.set(x,y,z);
    return mesh;
}

// 模型导入
var model=new THREE.Group();
function modelPut(obj) {
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) { };
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'obj/' );
    mtlLoader.load( 'o.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'obj/' );
        objLoader.load( obj, function ( object ) {
            object.scale.x=10;
            object.scale.y=10;
            object.scale.z=10;
            model.add( object );
        }, onProgress, onError );
    });
}
modelPut('o.obj');
scene.add(model);

//一维堆积
var obj1G=[];
function obj1(){
    var x=-140;
    for(var i=0;i<8;i++){
        obj1G[i]=C('#D5D7E0',20,x,0,0);
        if(i!=0){
            obj1G[i].visible=false;
        }
        scene.add(obj1G[i]);
        x+=40;
    }
}
//二维堆积
var obj2G=[];
function obj2(){
    var y=-40;
    obj2G[0]=new THREE.Group();
    obj2G[1]=new THREE.Group();
    obj2G[2]=new THREE.Group();
    for(var i=0;i<3;i++){
        var a=C('#D5D7E0',20,-40,y,0);
        var b=C("#D5D7E0",20,0,y,0);
        var c=C("#D5D7E0",20,40,y,0);
        obj2G[i].add(a,b,c);
        if(i!=0){
            obj2G[i].visible=false;
        }
        scene.add(obj2G[i]);
        y+=40;
    }
}
//三维堆积
var obj3G=[];
function obj3(){
    obj3G[0]=new THREE.Group();
    obj3G[1]=new THREE.Group();
    obj3G[2]=new THREE.Group();
    obj3G[3]=new THREE.Group();
    obj3G[4]=new THREE.Group();
    //第一层
    var a11=C('#D5D7E0',20,-40,-40,-40);
    var a12=C("#D5D7E0",20,0,-40,-40);
    var a13=C("#D5D7E0",20,40,-40,-40);
    var a14=C("#D5D7E0",20,-40,-40,0);
    var a15=C("#D5D7E0",20,0,-40,0);
    var a16=C("#D5D7E0",20,40,-40,0);
    var a17=C("#D5D7E0",20,-40,-40,40);
    var a18=C("#D5D7E0",20,0,-40,40);
    var a19=C("#D5D7E0",20,40,-40,40);
    obj3G[0].add(a14,a15,a17,a18);
    obj3G[3].add(a11,a12,a13,a16,a19);
    //第二层
    var a21=C('#D5D7E0',20,-40,0,-40);
    var a22=C("#D5D7E0",20,0,0,-40);
    var a23=C("#D5D7E0",20,40,0,-40);
    var a24=C("#D5D7E0",20,-40,0,0);
    var a25=C("#D5D7E0",20,0,0,0);
    var a26=C("#D5D7E0",20,40,0,0);
    var a27=C("#D5D7E0",20,-40,0,40);
    var a28=C("#D5D7E0",20,0,0,40);
    var a29=C("#D5D7E0",20,40,0,40);
    obj3G[1].add(a27,a28,a24,a25);
    obj3G[4].add(a21,a22,a23,a26,a29);
    obj3G[1].visible=false;
    obj3G[4].visible=false;
    //第三层
    var a31=C('#D5D7E0',20,-40,40,-40);
    var a32=C("#D5D7E0",20,0,40,-40);
    var a33=C("#D5D7E0",20,40,40,-40);
    var a34=C("#D5D7E0",20,-40,40,0);
    var a35=C("#D5D7E0",20,0,40,0);
    var a36=C("#D5D7E0",20,40,40,0);
    var a37=C("#D5D7E0",20,-40,40,40);
    var a38=C("#D5D7E0",20,0,40,40);
    var a39=C("#D5D7E0",20,40,40,40);
    obj3G[2].add(a31,a32,a33,a34,a35,a36,a37,a38,a39);
    obj3G[2].visible=false;

    scene.add(obj3G[0],obj3G[1],obj3G[2],obj3G[3],obj3G[4]);
}

var chooseNum=3;
function step(){
    var index=$(this).index();
    if(chooseNum==index) return;
    clearInterval(San);
    addNum=0;
    removeS();
    camera.position.set(0,0,200);
    $('#step>div span').css('background','#f0f0f0');
    $(this).children('span').css('background','#5caefd');
    chooseNum=index;
    $('.slider').css('opacity','0');
    $('#tp div,#check').hide();
    $('#addC,#tp .t'+(index+1)).show();
    $('#tp div span').css('background','#5CAEFD');
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    checked=false;
    if(index==0){
        obj1();
        $('#slider1').range2DSlider({
            template:'vertical',
            value:[[0,0]],
            height:265,
            showLegend:false,
            round:true,
            axis:[[0,0],[0,40]]
        });
    }else if(index==1){
        obj2();
        $('#slider1').range2DSlider({
            template:'vertical',
            value:[[0,0]],
            height:265,
            showLegend:false,
            round:true,
            axis:[[0,0],[0,40]]
        });
    }else{
        camera.position.set(0,100,200);
        obj3();
    }
    scene.remove(model);
}

//移除场景中元素
function removeS() {
    for(var i=scene.children.length;i>1;i--){
        scene.remove(scene.children[i]);
    }
}

function reset(){
    clearInterval(San);
    $('.slider').css('opacity','0');
    $('#step>div span').css('background','#f0f0f0');
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    $('#tp div,#check,#addC').hide();
    removeS();
    chooseNum=3;
    addNum=0;
    checked=false;
    animated=false;
    scene.add(model);
    camera.position.set(262,68,-88);
    $('#slider1').range2DSlider({
        template:'vertical',
        value:[[0,0]],
        height:265,
        showLegend:false,
        round:true,
        axis:[[0,0],[0,40]]
    });
    camera.zoom=1;
    camera.updateProjectionMatrix();
}

$('#slider1').on('change',function () {
    var value=$(this).val();
    var h=value.split('|')[1];
    obj3G[2].position.y=h;
    obj3G[3].position.y=-h;
    obj3G[0].position.y=-h;
})

var addNum=0;
function addC() {
    addNum++;
    if(chooseNum==0){
        if(addNum>7) return;
        obj1G[addNum].visible=true;
        $('.t1 span:lt('+addNum+')').css('background','#D5D5D5');
    }else if(chooseNum==1){
        if(addNum>2) return;
        obj2G[addNum].visible=true;
        $('.t2 span:lt('+addNum+')').css('background','#D5D5D5');
    }else if(chooseNum==2){
        if(addNum>2) return;
        $('.slider').css('opacity','1');
        if(addNum==1){
            obj3G[4].visible=true;
        }
        obj3G[addNum].visible=true;
        $('.t3 span:lt('+addNum+')').css('background','#D5D5D5');
        if(addNum==2){
            $('#check').show();
        }
    }
    $(this).css({'background':'#5CAEFD','color':'#fff'});
}

var San,checked=false,animated=false;
function check(){
    if(animated)return;
    animated=true;
    clearInterval(San);
    if(checked){
        $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        obj3G[2].visible=true;
        obj3G[3].visible=true;
        obj3G[4].visible=true;
        for(var i=0;i<obj3G[2].children.length;i++){
            obj3G[2].children[i].material.opacity=1;
        }
        for(var i=0;i<obj3G[3].children.length;i++){
            obj3G[3].children[i].material.opacity=1;
        }
        for(var i=0;i<obj3G[4].children.length;i++){
            obj3G[4].children[i].material.opacity=1;
        }
        animated=false;
        checked=false;
    }else{
        $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        San=setInterval(function () {
            if(obj3G[2].children[0].material.opacity<=0){
                obj3G[2].visible=false;
                obj3G[3].visible=false;
                obj3G[4].visible=false;
                checked=true;
                animated=false;
                clearInterval(San);
                return;
            }
            for(var i=0;i<obj3G[2].children.length;i++){
                obj3G[2].children[i].material.opacity-=0.02;
            }
            for(var i=0;i<obj3G[3].children.length;i++){
                obj3G[3].children[i].material.opacity-=0.02;
            }
            for(var i=0;i<obj3G[4].children.length;i++){
                obj3G[4].children[i].material.opacity-=0.02;
            }
        },20);
    }
}

if(isMob){
    $('#step>div').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
    $('.addB').on('touchstart',addC);
    $('.addB').on('touchend',function () {
        $(this).css({'background':'#fff','color':'#000'});
    });
    $('#check').on('touchstart',check);
}else{
    $('#step>div').on('click',step);
    $('#reset img').on('click',reset);
    $('.addB').on('mousedown',addC);
    $('.addB').on('mouseup',function () {
        $(this).css({'background':'#fff','color':'#000'});
    });
    $('#check').on('click',check);
}

