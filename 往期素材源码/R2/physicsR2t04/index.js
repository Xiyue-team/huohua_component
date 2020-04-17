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

var width = window.innerWidth;
var height = window.innerHeight;
var zoom = 1;
if (height < 580) {
    zoom = 0.8
    $('#right').css('zoom', zoom);
}
$('#left').width(width - 280 * zoom);
$('#main,#imgOne').height(height-80);
window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width <= 580) width = 580;
    if (height < 580) {
        zoom = 0.8;
        $('#right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#right').css('zoom', zoom);
    }
    $('#left').width(width - 280 * zoom);
    $('#main,#imgOne').height(height-80);
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
var threeW = $('#left').width();
var threeH = $('#left').height() - 80;
var container, camera, renderer, scene, controls;
init();
animate();
//初始化three场景
function init() {
    container = $('#imgOne')[0];
    camera = new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
    camera.position.set(0, 0, 1000);

    //判断是否支持webGL
    renderer = null;
    if (false) {
        renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
    } else {
        renderer = new THREE.CanvasRenderer({antialias: true,alpha:true});
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeW, threeH);
    renderer.setClearColor(0xffffff,0);
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
    var lineMesh = null, geometryLine = new THREE.Geometry();
    geometryLine.vertices = vertices;
    lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
    return lineMesh;
}
function vec3(x, y, z) {
    return new THREE.Vector3(x, y, z);
}
var line1,line2;
function drawBase() {
    var vertices1 = [], vertices2 = [];
    for (var i = 0; i < 361; i += 4) {
        vertices1.push(vec3(150 * Math.cos(i * Math.PI / 180), 150 * Math.sin(i * Math.PI / 180), 0));
        vertices2.push(vec3(300 * Math.cos(i * Math.PI / 180), 300 * Math.sin(i * Math.PI / 180), 0));
    }
    line1 = createLineMesh(vertices1, '#ffffff');
    line2 = createLineMesh(vertices2, '#ffffff');
}
drawBase();
var G1 = new THREE.Group();
var geometry = new THREE.PlaneGeometry(56, 56);
var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/m1.png'), overdraw: true});
var rect = new THREE.Mesh(geometry, material);
rect.position.set(0, 300, 0)
G1.add(rect);
G1.rotation.z = -Math.PI / 4;
G1.visible=false;

var G2 = new THREE.Group();
var geometry = new THREE.PlaneGeometry(112, 112);
var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('image/m2.png'), overdraw: true});
var rect = new THREE.Mesh(geometry, material);
rect.position.set(0, -150, 0)
G2.add(rect);
G2.rotation.z = -Math.PI / 4;
G2.visible=false;
scene.add(G1,G2);
var ang = 0, rang = 0.02;
var SR1;
function changG() {
    clearInterval(SR1);
    SR1 = setInterval(function () {
        ang += rang;
        G1.rotation.z = ang - Math.PI / 4;
        G2.rotation.z = ang - Math.PI / 4;
    }, 40);
}
changG();
// 拖拽电子
var scrollerIng = false;
var togetherShow1 = false;
var togetherShow2 = false;
var MyMar;
$(function () {
    $(".draggable").draggable({
        revert: 'invalid',
        helper: "clone"
    });
    $("#imgOne").droppable({
        accept: '.draggable',
        drop: function (event, id) {
            //背景滚动
            if (!scrollerIng) {
                var speed = 10;
                var main = document.getElementById("main");
                var tab1 = document.getElementById("boxDiv1");
                var tab2 = document.getElementById("boxDiv2");
                tab2.innerHTML = tab1.innerHTML;
                function Marquee() {
                	console.log(tab2.offsetHeight - main.scrollTop)
                    if (tab2.offsetHeight - main.scrollTop <= tab2.offsetHeight*0.02)
                        main.scrollTop -= tab1.offsetHeight;
                    else {
                        main.scrollTop++;
                    }
                }

                MyMar= setInterval(Marquee, speed);
                scrollerIng = true;
            };
            var m = id.draggable[0].id;
            if (m === 'm1') {
                console.log('m1');
                if (togetherShow2) {
                    console.log('同时出现');
                    $('.centerImg').css('display', 'none');
                    $('#m1').removeClass('draggable');
                    $('#m2').removeClass('draggable');
                    G1.visible=true;
                    G2.visible=true;
                } else {
                    $('.centerImg').css({
                        'display': 'block',
                        'width': '40px',
                        'height': '40px',
                        'background': 'url(./image/m1.png)',
                        'backgroundSize': '40px 40px'
                    });
                    togetherShow1 = true;
                    $('#m1').removeClass('draggable');
                }
            } else {
                console.log('m2');
                if (togetherShow1) {
                    console.log('同时出现');
                    $('canvas').show();
                    $('.centerImg').css('display', 'none');
                    $('#m1').removeClass('draggable');
                    $('#m2').removeClass('draggable');
                    G1.visible=true;
                    G2.visible=true;
                } else {
                    $('.centerImg').css({
                        'display': 'block',
                        'width': '80px',
                        'height': '80px',
                        'background': 'url(./image/m2.png)',
                        'backgroundSize': '80px 80px'
                    });
                    togetherShow2 = true;
                    $('#m2').removeClass('draggable');
                }

            }
        }
    });

});

function reset() {
    G1.visible=false;
    G2.visible=false;
    scene.remove(line1,line2);
    checked = false;
    clearInterval(MyMar);
    scrollerIng=false;
    togetherShow1 = false;
    togetherShow2 = false;
    $('.centerImg').css('display', 'none');
    $('#m1').addClass('draggable');
    $('#m2').addClass('draggable');
    $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
}

//运动轨道显示与不显示
var checked = false;
function check() {
    if(!(G1.visible && G1.visible)){
        return;
    }
    if (checked) {
        scene.remove(line1, line2);
        $(this).css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
        checked = false;
    } else {
        scene.add(line1, line2);
        $(this).css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
        checked = true;
    }
}
if (isMob) {
    $('#reset img').on('touchstart', reset);
    $('#check>span').on('touchstart', check);
} else {
    $('#reset img').on('click', reset);
    $('#check>span').on('click', check);
}
