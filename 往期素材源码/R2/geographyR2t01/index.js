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
    $('#main_right').css('zoom', zoom);
}
$('#main_left').width(wWidth - 280 * zoom);
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('#main_right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#main_right').css('zoom', zoom);
    }
    $('#main_left').width(wWidth - 280 * zoom);
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    $('canvas').css({
        'left': ($('#threeContainer').width() - cW) / 2 + 'px',
        'top': ($('#threeContainer').height() - cH) / 2 + 'px'
    });
}

var threeW = $('#threeContainer').width();
var threeH = $('#threeContainer').height();
var container, camera, renderer, scene, controls;
//初始化three场景
container = $('#threeContainer')[0];
camera = new THREE.PerspectiveCamera(45, threeW / threeH, 1, 10000);
camera.position.set(0, 0, 1000);

//判断是否支持webGL
renderer = null;
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(threeW, threeH);
renderer.setClearColor(0xffffff);
container.appendChild(renderer.domElement);

// scene
scene = new THREE.Scene();

//控制
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enableRotate = false;



function render() {
    controls.update();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

var rendererStep = 0;
function animate() {
    requestAnimationFrame(animate);
    rendererStep++;
    if (rendererStep < 5) return;
    rendererStep = 0;
    render();
}

animate();

window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight - 72);
var createLineMesh = function (vertices, color, style, width) {
    var lineMesh, matLine;
    var geometry = new THREE.LineGeometry();
    geometry.setPositions(vertices);
    if (style == 2) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            dashed: false,
            dashSize: 5,
            gapSize: 5,
            dashScale: 1
        });
        matLine.defines.USE_DASH = ""
    } else if (style == 3) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
        });
    }
    lineMesh = new THREE.Line2(geometry, matLine);
    lineMesh.computeLineDistances();
    return lineMesh;
};

function createText(texts, x, y, z, color, size) {
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {
        align: textAlign.center,
        font: size + 'px "Cambria Italic"',
        fillStyle: color,
        antialias: true
    };
    var text = new SpriteText2D(texts, textStyle);
    text.position.set(x, y, z + 3);
    return text;
}

function createCircle(radius, color, end, f, o) {
    var CircleG = new THREE.CircleGeometry(radius, 32, 0, end);
    var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: f, opacity: o});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    return Circle;
}

function createTriangleFace(vertices) {
    var material = new THREE.MeshBasicMaterial({color: '#ffa25d'});
    var geom = new THREE.Geometry();
    geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
    geom.vertices = vertices;
    var mesh = new THREE.Mesh(geom, material);
    return mesh;
}

var LineA, LineB, ang1 = 23.5, ang2 = -23.5, LineBLC, CB, vertices = [], rotate2 = Math.PI / 180 * ang2 / 2,
    rotate1 = Math.PI / 180 * ang1 / 2, textj, textj1, textH, textg, textg1, textW, textA, textB,pointA;

function drawBase() {
    vertices.push(-200, 0, 0, 200, 0, 0);
    var lineC = createLineMesh(vertices, "#000", 3, 1.5);
    var textC = createText('赤道', -150, -5, 0, '#000', 14);

    vertices = [];
    vertices.push(0, 195, 0, 0, 205, 0);
    var lineT = createLineMesh(vertices, "#000", 3, 1.5);
    var textT = createText('90°N', 0, 225, 0, '#000', 14);

    vertices = [];
    vertices.push(0, -195, 0, 0, -205, 0);
    var lineD = createLineMesh(vertices, "#000", 3, 1.5);
    var textD = createText('90°S', 0, -210, 0, '#000', 14);

    LineA = new THREE.Group();
    LineB = new THREE.Group();
    LineBLC = new THREE.Group();
    vertices = [];
    vertices.push(0, 0, 0, 0, -200, 0);
    var lineA1 = createLineMesh(vertices, "#000", 2, 2);

    vertices = [];
    vertices.push(-50, -200, 2, 50, -200, 2);
    var lineA2 = createLineMesh(vertices, "#000", 3, 2);

    vertices = [];
    vertices.push(0, -200, 1, 0, -280, 1);
    var lineA3 = createLineMesh(vertices, "#ffa25d", 3, 2);

    vertices = [];
    vertices.push(0, -230, 0, -5, -245, 0, 5, -245, 0);
    var CA1 = createTriangleFace(vertices);

    var textA1 = createText('地平线', 60, -210, 0, '#000', 14);
    var textA2 = createText('太阳光线', 0, -300, 0, '#000', 14);

    LineA.add(lineA1, lineA2, lineA3, CA1, textA1, textA2);
    LineA.rotation.z = Math.PI / 2 + ang2 / 180 * Math.PI;


    vertices = [];
    vertices.push(0, 0, 0, 0, 300, 0);
    var lineB1 = createLineMesh(vertices, "#000", 2, 2);

    vertices = [];
    vertices.push(-50, 200, 1, 50, 200, 1);
    var lineB2 = createLineMesh(vertices, "#000", 3, 2);

    vertices = [];
    vertices.push(0, 0, 1, 80, 0, 1);
    var LineBL = createLineMesh(vertices, "#ffa25d", 3, 2);

    vertices = [];
    vertices.push(30, 0, 2, 45, 5, 2, 45, -5, 2);
    var LineBC = createTriangleFace(vertices);

    LineBLC.add(LineBL, LineBC);
    LineBLC.position.y = 200;
    LineBLC.rotation.z = ang2 / 180 * Math.PI - (-Math.PI / 2 + ang1 / 180 * Math.PI);

    var textB1 = createText('垂线', 0, 330, 0, '#000', 14);

    LineB.add(lineB1, lineB2, textB1, LineBLC);
    LineB.rotation.z = -Math.PI / 2 + ang1 / 180 * Math.PI;

    CB = createCircle(200, '#000', Math.PI, true, 0.3);
    CB.rotation.z = Math.PI / 2 + ang2 / 180 * Math.PI;

    var textO = createText('O', 0, 0, 0, '#f00', 20);

    var CircleG = new THREE.CircleGeometry(200, 72, 0, Math.PI * 2);
    var CircleM = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('image/b.png'), overdraw: true});
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.position.z = -1;

    textj1 = createText('δ\'', 60 * Math.cos(rotate2), 60 * Math.sin(rotate2) + 8, 0, '#000', 14);

    textH = createText('H', 0, 0, 1, '#f00', 20);

    textg = createText('Φ', 35 * Math.cos(rotate1), 35 * Math.sin(rotate1) + 8, 0, '#000', 14);

    textg1 = createText('Φ\'', 35 * Math.cos(rotate1), 35 * Math.sin(rotate1) + 8, 0, '#000', 14);

    textW = createText('纬线', 50, 20, 0, '#000', 14);

    textA = createText('A', 20, 20, 0, '#f00', 20);

    textB = createText('B', 15, 0, 0, '#f00', 20);
    textj = createText('δ', 50 * Math.cos(rotate2), 50 * Math.sin(rotate2) + 8, 0, '#000', 14);
    pointA = createCircle(5, '#f00', Math.PI * 2, false, 1);
    scene.add(lineC, textC, lineT, textT, lineD, textD, LineA, LineB, CB, textO, Circle, textj1, textH, textg, textg1, textW, textA, textB, textj,pointA);
}

drawBase();

var Obj = null;

function drawAn() {
    var vertices,ang40,ang25;
    if (Obj != null) {
        scene.remove(Obj);
    }
    Obj = new THREE.Group();

    vertices = [];
    var dx = 0;
    var dy = 0;
    var x = 200 * Math.cos(ang1 / 180 * Math.PI);
    var y = 200 * Math.sin(ang1 / 180 * Math.PI);
    if (ang2 != 0) {
        if (ang2 > 0) {
            for (var i = 0; i <= ang2; i = i + 5) {
                dx = 40 * Math.cos(Math.PI / 180 * i);
                dy = 40 * Math.sin(Math.PI / 180 * i);
                vertices.push(dx, dy, 0);
            }
        } else {
            for (var i = 0; i >= ang2; i = i - 5) {
                dx = 40 * Math.cos(Math.PI / 180 * i);
                dy = 40 * Math.sin(Math.PI / 180 * i);
                vertices.push(dx, dy, 0);
            }
        }
        ang40 = createLineMesh(vertices, 0x000000, 3, 1.5);
    }


    if (Math.abs(ang2 - ang1) > 90) {
        LineBLC.visible = false;
        textj1.visible = false;
        textH.visible = false;
    } else {
        textj1.visible = true;
        textH.visible = true;
        LineBLC.visible = true;
        textj1.position.set(60 * Math.cos(rotate2) + x, 60 * Math.sin(rotate2) + 8 + y, 0);

        if(ang2 != 0){
            ang40.position.set(x, y, 0);
            Obj.add(ang40);
        }
        //高度角H
        textH.position.set(x, y, 1);

        if (ang1 < ang2) {
            textH.position.set(60 * Math.cos(rotate2) + x - 15, 60 * Math.sin(rotate2) + 25 + y, 0);
        } else {
            textH.position.set(60 * Math.cos(rotate2) + x - 10, 60 * Math.sin(rotate2) - 10 + y, 0);
        }
    }
    vertices = [];
    var dx = 0;
    var dy = 0;
    if (ang1 != 0) {
        if (ang1 > 0) {
            for (var i = 0; i <= ang1; i = i + 5) {
                dx = 25 * Math.cos(Math.PI / 180 * i);
                dy = 25 * Math.sin(Math.PI / 180 * i);
                vertices.push(dx, dy, 3);
            }
        } else {
            for (var i = 0; i >= ang1; i = i - 5) {
                dx = 25 * Math.cos(Math.PI / 180 * i);
                dy = 25 * Math.sin(Math.PI / 180 * i);
                vertices.push(dx, dy, 3);
            }
        }
        ang25 = createLineMesh(vertices, 0x000000, 3, 1.5);
        Obj.add(ang25);
    }

    textg.position.set(35 * Math.cos(rotate1), 35 * Math.sin(rotate1) + 8, 0);

    var x = 200 * Math.cos(ang1 / 180 * Math.PI);
    var y = 200 * Math.sin(ang1 / 180 * Math.PI);
    if (ang1 != 0) {
        var ang = ang25.clone();
        ang.position.set(x, y, 0);
        Obj.add(ang);
    }

    textg1.position.set(35 * Math.cos(rotate1) + x, 35 * Math.sin(rotate1) + 8 + y, 0);

    vertices = [];
    vertices.push(-x, y, 0, x + 100, y, 0);
    var lineW = createLineMesh(vertices, '#000', 3, 1.5);

    textW.position.set(-x + 50, y + 20, 0);


    pointA.position.set(x, y, 5);

    textA.position.set(x - 20, y + 20, 0);

    Obj.add(lineW);
    scene.add(Obj);

    if (ang2 != 0) {
        var ang = ang40.clone();
        ang.position.set(0,0,0);
        Obj.add(ang);
    }

    textj.position.set(50 * Math.cos(rotate2), 50 * Math.sin(rotate2) + 8, 0);
    x = 200 * Math.cos(ang2 / 180 * Math.PI);
    y = 200 * Math.sin(ang2 / 180 * Math.PI);
    textB.position.set(x - 15, y, 0);
    var rota =Math.PI / 2 + ang2 / 180 * Math.PI;
    LineA.rotation.z =rota ;
    LineB.rotation.z = -Math.PI / 2 + ang1 / 180 * Math.PI;
    LineBLC.rotation.z = ang2 / 180 * Math.PI - (-Math.PI / 2 + ang1 / 180 * Math.PI);
    CB.rotation.z = rota;
}

drawAn();
$('#slider1').on('change', function () {
    var v = $(this).val();
    setTimeout(function () {
        ang1 = parseInt(v) / 2;
        rotate1 = Math.PI / 180 * ang1 / 2;
        drawAn();
    },200);
});
$('#slider2').on('change', function () {
    var v = $(this).val();
    setTimeout(function () {
        ang2 = parseInt(v) / 2;
        rotate2 = Math.PI / 180 * ang2 / 2;
        drawAn();
    },200);
});

function reset() {
    ang1 = 23.5;
    ang2 = -23.5;
    drawAn();
    $('.s1 .sliderLeft').width(130);
    $('.s1 .xdsoft_range2dslider_runner').css('left', '130px');
    $('.s1 .xdsoft_slider_label').text('23.5');
    $('.s2 .sliderLeft').width(0);
    $('.s2 .xdsoft_range2dslider_runner').css('left', '0px');
    $('.s2 .xdsoft_slider_label').text('23.5');
}

if (isMob) {
    $('#reset img').on('touchstart', reset);
} else {
    $('#reset img').on('click', reset);
}
