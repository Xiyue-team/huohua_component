//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart = function () {
    return false;
};

var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

var zoom = 1;
if (wHeight < 580) {
    zoom = 0.8
    $('#right').css('zoom', zoom);
}
$('#left').width(wWidth - 280 * zoom);
$('#main').height(wHeight-80);
$('#box').height($('#box').width());
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('#right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#right').css('zoom', zoom);
    }
    $('#left').width(wWidth - 280 * zoom);
    $('#main').height(wHeight-80);
    $('#box').height($('#box').width());
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    $('canvas').css({'left': ($('#main').width() - cW) / 2 + 'px', 'top': ($('#main').height() - cH) / 2 + 'px'});
};

var canWebgl = (function () {
    try {
        var canvas = document.createElement('canvas');
        return !!( window.WebGLRenderingContext && ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );
    } catch (e) {
        return false;
    }
})();
var threeW = $('#main').width();
var threeH = $('#main').height();
var container, camera, renderer, scene, controls;
init();
animate();
//初始化three场景
function init() {
    container = $('#main')[0];
    camera = new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
    camera.position.set(0, 0, 1000);

    //判断是否支持webGL
    renderer = null;
    if (canWebgl) {
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    } else {
        renderer = new THREE.CanvasRenderer({antialias: true, alpha: true});
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeW, threeH);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enableRotate = false;
}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    controls.update();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
//造线
function createLineMesh(vertices, color) {
    var geometryLine = new THREE.Geometry();
    geometryLine.vertices = vertices;
    var lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
    return lineMesh;
}
function vec3(x, y, z) {
    return new THREE.Vector3(x, y, z);
}
var rect, Circle,po,PO,GD=new THREE.Group();
function drawBase() {
    var CircleG = new THREE.CircleGeometry(120, 48, 0, Math.PI * 2);
    var CircleM = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/q.png'), overdraw: true});
    Circle = new THREE.Mesh(CircleG, CircleM);

    var geometry = new THREE.PlaneGeometry(64, 39);
    var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/p.png'), overdraw: true,transparent:true});
    po = new THREE.Mesh(geometry, material);
    po.position.y=133;
    po.position.z=10;
    PO=new THREE.Group();
    PO.add(po);
    PO.rotation.z=Math.PI/4;
    var geometry = new THREE.CircleGeometry(6, 36, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/1.png'), overdraw: true});
    rect = new THREE.Mesh(geometry, material);
    rect.position.x = 0;
    rect.position.y = 150;
    rect.position.z=2;
    rect.visible=false;
    GD.add(rect);
    GD.rotation.z=Math.PI/4;
    scene.add(Circle,GD,PO);
    camera.position.z=600;
    po.scale.x=0.4;
    po.scale.y=0.4;
    po.scale.z=0.4;
    rect.scale.x=0.5;
    rect.scale.y=0.5;
    rect.scale.z=0.5;
    po.position.y=120;
}
drawBase();
//地球缩小
function circleScale1() {
    if(Circle.scale.x<=0.115){
        return;
    }
    var s=0.0155;
    Circle.scale.x -= s;
    Circle.scale.y -= s;
    Circle.scale.z -= s;
    PO.scale.x -= s;
    PO.scale.y -= s;
    PO.scale.z -= s;
}
var LG1,LG2,LG3,LG4,S1,S2,S3,S4;
function d1() {
    camera.position.z=600;
    po.scale.x=0.4;
    po.scale.y=0.4;
    po.scale.z=0.4;
    rect.scale.x=0.5;
    rect.scale.y=0.5;
    rect.scale.z=0.5;
    po.position.y=120;
    var ang=95;
    LG1=new THREE.Group();
    clearInterval(S1);
    S1=setInterval(function () {
        rect.visible=true;
        var vertices=[];
        var x1=128*Math.cos(ang*Math.PI/180);
        var y1=128*Math.sin(ang*Math.PI/180);
        ang++;
        if(ang<=460){
            var x2=128*Math.cos(ang*Math.PI/180);
            var y2=128*Math.sin(ang*Math.PI/180);
            vertices.push(vec3(x1,y1,0),vec3(x2,y2,0));
            var lineG=createLineMesh(vertices, '#fff');
            scene.remove(LG1);
            LG1.add(lineG);
            LG1.rotation.z=Math.PI/4;
            scene.add(LG1);
            rect.position.set(x2,y2,0);
        }else{
            rect.position.set(x1,y1,0);
        }
    },20);
}
function d2() {
    camera.position.z=600;
    po.scale.x=0.4;
    po.scale.y=0.4;
    po.scale.z=0.4;
    rect.scale.x=0.5;
    rect.scale.y=0.5;
    rect.scale.z=0.5;
    po.position.y=120;
    var ang=95;
    LG2=new THREE.Group();
    clearInterval(S1);
    S2=setInterval(function () {
        rect.visible=true;
        var vertices=[];
        var x1=150*Math.cos(ang*Math.PI/180);
        var y1=200*Math.sin(ang*Math.PI/180)-72;
        ang++;
        if(ang<=460){
            var x2=150*Math.cos(ang*Math.PI/180);
            var y2=200*Math.sin(ang*Math.PI/180)-72;
            vertices.push(vec3(x1,y1,0),vec3(x2,y2,0));
            var lineG=createLineMesh(vertices, '#fff');
            scene.remove(LG2);
            LG2.add(lineG);
            LG2.rotation.z=Math.PI/4;
            scene.add(LG2);
            rect.position.set(x2,y2,0);
        }else{
            rect.position.set(x1,y1,0);
        }

    },15);
}
function d3() {
    camera.position.z=1000;
    po.scale.x=1;
    po.scale.y=1;
    po.scale.z=1;
    rect.scale.x=1;
    rect.scale.y=1;
    rect.scale.z=1;
    po.position.y=133;
    var ang=95.5;
    LG3=new THREE.Group();
    clearInterval(S3);
    S3 = setInterval(function () {
        rect.visible=true;
        var vertices = [];
        var x1 = 300 * Math.cos(ang * Math.PI / 180);
        var y1 = 300 * Math.sin(ang * Math.PI / 180) - 150;
        ang++;
        if (ang <= 460) {
            var x2 = 300 * Math.cos(ang * Math.PI / 180);
            var y2 = 300 * Math.sin(ang * Math.PI / 180) - 150;
            vertices.push(vec3(x1, y1, 0), vec3(x2, y2, 0));
            var lineG = createLineMesh(vertices, '#fff');
            scene.remove(LG3);
            LG3.add(lineG);
            LG3.rotation.z = Math.PI / 4;
            scene.add(LG3);
            rect.position.set(x1, y1, 0);
            if(ang >= 130.5){
                if(wWidth>1024){
                    var ScaleM=1024/wWidth*0.5;
                }else{
                    var ScaleM=wWidth/1024*0.5;
                }
                $('#box').css('transform','scale('+ScaleM+')');
                if(ang == 130.5){
                    $('#box').animate({'opacity':'1'},2000);
                }
                if(Circle.position.x>-208){
                    Circle.position.x -=3.6;
                    Circle.position.y +=2.85;
                    PO.position.x -=3.6;
                    PO.position.y +=2.85;
                    LG3.position.x -=1.6;
                    LG3.position.y +=1.6;
                    GD.position.x -=1.6;
                    GD.position.y +=1.6;
                }
                circleScale1();
            }
        }else{
            rect.position.set(x1, y1, 0);
        }
    }, 10);
}
function d4() {
    camera.position.z=1000;
    po.scale.x=1;
    po.scale.y=1;
    po.scale.z=1;
    rect.scale.x=1;
    rect.scale.y=1;
    rect.scale.z=1;
    po.position.y=133;
    var ang=93.5;
    LG4=new THREE.Group();
    clearInterval(S3);
    S4 = setInterval(function () {
        rect.visible=true;
        var vertices = [];
        var x1 = 500 * Math.cos(ang * Math.PI / 180);
        var y1 = 500 * Math.sin(ang * Math.PI / 180) - 350;
        ang++;
        if (ang <= 200) {
            var x2 = 500 * Math.cos(ang * Math.PI / 180);
            var y2 = 500 * Math.sin(ang * Math.PI / 180) - 350;
            vertices.push(vec3(x1, y1, 0), vec3(x2, y2, 0));
            var lineG = createLineMesh(vertices, '#fff');
            scene.remove(LG4);
            LG4.add(lineG);
            LG4.rotation.z = Math.PI / 4;
            scene.add(LG4);
            rect.position.set(x1, y1, 0);
            if(ang >= 130.5) {
                if(wWidth>1024){
                    var ScaleM=1024/wWidth*0.5;
                }else{
                    var ScaleM=wWidth/1024*0.5;
                }
                $('#box').css('transform','scale('+ScaleM+')');
                if(ang == 130.5){
                    $('#box').animate({'opacity':'1'},2000);
                }
                if (Circle.position.x > -208) {
                    Circle.position.x -= 3.6;
                    Circle.position.y += 2.85;
                    PO.position.x -= 3.6;
                    PO.position.y += 2.85;
                    LG4.position.x -= 1.6;
                    LG4.position.y += 1.6;
                    GD.position.x -= 1.6;
                    GD.position.y += 1.6;
                }
                circleScale1();
            }
        }else{
            clearInterval(S4);
        }
    }, 10);
}

function reset() {
    scene.remove(LG1,LG2,LG3,LG4);
    clearInterval(S1);
    clearInterval(S2);
    clearInterval(S3);
    clearInterval(S4);
    Circle.position.x =0;
    Circle.position.y =0;
    PO.position.x =0;
    PO.position.y =0;
    GD.position.x =0;
    GD.position.y =0;
    Circle.scale.x =1;
    Circle.scale.y =1;
    Circle.scale.z =1;
    PO.scale.z =1;
    PO.scale.x =1;
    PO.scale.y =1;
    rect.visible=false;
    camera.position.z=600;
    po.scale.x=0.4;
    po.scale.y=0.4;
    po.scale.z=0.4;
    rect.scale.x=0.5;
    rect.scale.y=0.5;
    rect.scale.z=0.5;
    po.position.y=120;
    $('#box:animated').stop();
    $('#box').css({'opacity':'0','transform':'scale(10)'});
    clickTrue=0;
    $('#step>div span').css('background', '#f0f0f0');
}
var clickTrue=0,index;
function step() {
    index = $(this).index() + 1;
    if (clickTrue==index) {
        return;
    }
    scene.remove(LG1,LG2,LG3,LG4);
    clearInterval(S1);
    clearInterval(S2);
    clearInterval(S3);
    clearInterval(S4);
    Circle.position.x =0;
    Circle.position.y =0;
    PO.position.x =0;
    PO.position.y =0;
    GD.position.x =0; 
    GD.position.y =0;
    Circle.scale.x =1;
    Circle.scale.y =1;
    Circle.scale.z =1;
    PO.scale.z =1;
    PO.scale.x =1;
    PO.scale.y =1;
    $('#box:animated').stop();
    $('#box').css({'opacity':'0','transform':'scale(10)'});
    rect.visible=false;
    $('#step>div span').css('background', '#f0f0f0');
    $(this).children('span').css('background', '#5caefd').children().css('background', '#fff');
    if (index == 1) {
        d4();
    } else if (index == 2) {
        d3();
    } else if (index == 3) {
        d2();
    } else if (index == 4) {
        d1();
    }
    clickTrue=index;
}
if (isMob) {
    $('#step>div').on('touchstart', step);
    $('#reset img').on('touchstart', reset);
} else {
    $('#step>div').on('click', step);
    $('#reset img').on('click', reset);
}
