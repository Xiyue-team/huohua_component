//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

window.onresize = function () {
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    var leftC = ($('#threeContainer').width() - cW) / 2;
    $('canvas').css({'left': leftC + 'px', 'top': ($('#threeContainer').height() - cH) / 2 + 'px'});
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

var threeW = $('#threeContainer').width();
var threeH = $('#threeContainer').height();
var container, camera, renderer, scene;
var tabF = true;

var SF = setTimeout(function () {
    tabF = false;
    clearTimeout(SF);
}, 50);
//初始化three场景
container = $('#threeContainer')[0];
//判断是否支持webGL
renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(threeW, threeH);
renderer.setClearColor(0xffffff, 0);
container.appendChild(renderer.domElement);

// scene
scene = new THREE.Scene();

camera = new THREE.OrthographicCamera(threeW / -2.5, threeW / 2.5, threeH / 2.5, threeH / -2.5, 1, 2000);
camera.position.set(0, 100, 250);

var CircleG = new THREE.CircleGeometry(1.2, 4);
var CircleM = new THREE.MeshBasicMaterial({color: '#000'});
var circleBase = new THREE.Mesh(CircleG, CircleM);

var groupHArry = [];
var groupHModel = new THREE.Group();
var groupMesh = new THREE.Group();
scene.add(groupHModel, groupMesh);

var C = new THREE.Mesh(new THREE.CircleGeometry(3, 36), new THREE.MeshBasicMaterial({color: '#A4003F'}));
scene.add(C);

function animate() {
    if (tabF) {
        requestAnimationFrame(animate);
    }
    render();
}

animate();

function render() {
    renderer.clear();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function createCircle(x, y) {
    var L = groupHArry.length;
    groupHArry[L] = circleBase.clone();
    groupHArry[L].position.set(x, y, 0);
    groupHModel.add(groupHArry[L]);
    if (groupHArry.length % 100 == 0) {
        scene.remove(groupHModel);
        var geometry = new THREE.Geometry();
        for (var j = 0; j < groupHArry.length; j++) {
            groupHArry[j].updateMatrix();
            geometry.merge(groupHArry[j].geometry, groupHArry[j].matrix);
        }
        var pGM = new THREE.Mesh(geometry, CircleM);
        groupMesh.add(pGM);
        groupHArry = [];
        groupHModel = new THREE.Group();
        scene.add(groupHModel);
    }
}

function cc(r) {
    var ang = Math.random() * Math.PI * 2;
    var R = Math.random() * r;
    var x = Math.cos(ang) * R;
    var y = Math.sin(ang) * R;
    createCircle(x, y);
}


var ST, SA, clickNum = 0, num = 0;

function add1() {
    if (num >= 3000) {
        return;
    }
    tabF = true;
    if (clickNum < 15) {
        cc(50);
    } else if (clickNum < 30) {
        cc(70);
    } else if (clickNum < 40) {
        cc(90);
    } else if (clickNum < 50) {
        cc(110);
    } else if (clickNum < 60) {
        cc(130);
    } else {
        cc(170);
    }
    clickNum++;
    num++;
    animate();
    clearTimeout(ST);
    clearInterval(SA);
    ST = setTimeout(function () {
        if (tabF) {
            animate();
            var an = function () {
                if (tabF == false || num >= 6000) {
                    cancelAnimationFrame(SA);
                    return;
                }
                for (var i = 0; i < 4; i++) {
                    cc(50);
                }
                for (var i = 0; i < 3; i++) {
                    cc(70);
                }
                for (var i = 0; i < 2; i++) {
                    cc(90);
                }
                cc(110);
                cc(130);
                cc(150);
                cc(170);
                num += 14;
                SA = requestAnimationFrame(an);
            };
            an();
        } else {
            clearTimeout(ST);
        }
    }, 500);
}

function reset() {
    tabF = false;
    num = 0;
    clickNum = 0;
    scene.remove(groupHModel, groupMesh);
    groupHArry = [];
    groupHModel = new THREE.Group();
    groupMesh = new THREE.Group();
    scene.add(groupHModel, groupMesh);
    animate();
}
 
$('#reset img').on('click', reset);
$('#tab').on('mousedown', add1);
$('#tab').on('mouseup', function () {
    tabF = false;
});
$('#reset img').on('touchstart', reset);
$('#tab').on('touchstart', add1);
$('#tab').on('touchend', function () {
    tabF = false;
});