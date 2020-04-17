//fastclick

window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
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

//判断设备类型进行缩放
var isMob = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var zoom1 = 1;
var one = 1;
if (wHeight < 580) {
    zoom1 = 0.5;
    one = 205 * zoom1;
} else {
    zoom1 = 1;
    one = 205 * zoom1;
}
$('#slider1').range2DSlider({
    template: 'horizontal',
    value: [[30, 0]],
    width: one,
    showLegend: false,
    onlyGridPoint: true,
    round: true,
    axis: [[0, 100]],
    printLabel: function (val) {
        return parseInt(val[0]) / 10;

    }
});

$('#threeContainer').width(wWidth);
$('#threeContainer').height(wHeight);
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wWidth <= 580) {
        zoom1 = 0.5;
        $('.slider').css('zoom', zoom1);
    } else {
        zoom1 = 1
        $('.slider').css('zoom', zoom1);
    }
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    $('#threeContainer').width(wWidth);
    $('#threeContainer').height(wHeight - 76);
    $('canvas').css({
        'left': ($('#threeContainer').width() - cW) / 2 + 'px',
        'top': ($('#threeContainer').height() - cH) / 2 + 'px'
    });
}

var CG = null;
var h = 210;
var ZLC, textK, textN;


/****** 位置相关 ******/
var threeWidth = $("#threeContainer").width();
var threeHeight = $("#threeContainer").height();

var createLineMesh= function (vertices, color, style, width, opacity) {
    var arr = [];
    for (var i=0;i<vertices.length;i++) {
        arr.push(vertices[i].x,vertices[i].y,vertices[i].z);
    }
    var lineMesh, matLine;
    color = color||'#000';
    style= style||3;
    width = width||1;
    opacity = opacity ||1;

    var geometry = new THREE.LineGeometry();
    geometry.setPositions(arr);
    if (style == 2) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            dashed: false,
            dashSize: 10,
            gapSize: 10,
            dashScale: 1
        });
        matLine.defines.USE_DASH = ""
    } else if (style == 3) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            opacity:opacity,
            transparent: true
        });
    }
    lineMesh = new THREE.Line2(geometry, matLine);
// lineMesh.depthTest = false;
    lineMesh.computeLineDistances();
    return lineMesh;
};
var threeDimension = {
    //初始化
    init: function () {
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createCircleObj();
        threeDimension.createCylinderObj();
        threeDimension.changeE();
    },
    //创建场景于相机
    createScene: function () {
        var H = window.innerHeight;
        threeDimension.scene = new THREE.Scene();
        if (H < 300) {
            threeDimension.camera = new THREE.OrthographicCamera(-threeWidth * 2.8, threeWidth * 2.8, threeHeight * 2.8, -threeHeight * 2.8, -100, 10000);
        } else {
            threeDimension.camera = new THREE.OrthographicCamera(-threeWidth * 2, threeWidth * 2, threeHeight * 2, -threeHeight * 2, -100, 10000);
        }
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 400;
        threeDimension.camera.position.z = 2000;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.camera.updateProjectionMatrix();
        if (window.innerHeight < 540) {
            threeDimension.camera.zoom = 0.5;
        } else {
            threeDimension.camera.zoom = 1;
        }
        threeDimension.camera.updateProjectionMatrix();
        threeDimension.scene.add(threeDimension.camera);

        threeDimension.renderer = null;
        if (!isMob) {
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        } else {
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }

        threeDimension.renderer.setPixelRatio(window.devicePixelRatio);
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth, threeHeight);
        $("#threeContainer").append(threeDimension.renderer.domElement);
    },
    //定义鼠标控制
    createControls: function () {
        threeDimension.controls = new THREE.OrbitControls(threeDimension.camera, threeDimension.renderer.domElement);
        // threeDimension.controls.saveState();
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate = true;
        threeDimension.controls.enablePan = false;
        threeDimension.controls.enableZoom = true;
    },
    vec3: function (x, y, z) {
        return new THREE.Vector3(x, y, z);
    },
    createText: function (texts, x, y, z, color, size) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    },

createCircle: function (vertices, radius, color, flag) {
    if (flag) {
        var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.5,
            depthTest: false
        });
    } else {
        var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            side: THREE.FrontSide,
            opacity: 0.3
        });
    }
    var CircleG = new THREE.CircleGeometry(radius, 36, 0, 2 * Math.PI, 0, Math.PI);
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.position.x = vertices[0];
    Circle.position.y = vertices[1];
    Circle.position.z = vertices[2];
    return Circle;
}
,
createCircleObj: function () {
    var CB = new THREE.Group();
    var vertices = [];
    vertices.push(0, 0, 0);
    var CB1 = threeDimension.createCircle(vertices, 700, '#5CAEFD');
    CB1.rotation.x = Math.PI / 2;

    var CircleM = new THREE.MeshBasicMaterial({
        color: '#5CAEFD',
        transparent: true,
        side: THREE.FrontSide,
        opacity: 0.3
    });
    var CircleG = new THREE.SphereGeometry(700, 36, 18, 0, 2 * Math.PI, 0, Math.PI / 2);
    var CB2 = new THREE.Mesh(CircleG, CircleM);

    vertices = [];
    for (var i = 0; i < 361; i++) {
        var x = 700 * Math.cos(i * Math.PI / 180);
        var z = 700 * Math.sin(i * Math.PI / 180);
        vertices.push(threeDimension.vec3(x, 0, z));
    }
    var lineC1 = createLineMesh(vertices, '#000', 3, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(-700, 0, 0), threeDimension.vec3(700, 0, 0));
    var lineC2 = createLineMesh(vertices, '#000', 2, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(0, 0, 0), threeDimension.vec3(0, 700, 0));
    var lineC3 = createLineMesh(vertices, '#000', 2, 1.5);

    var textO = threeDimension.createText('O', 0, -30, 0, '#000', 72);

    CB.add(CB1, CB2, lineC1, lineC2, lineC3, textO);
    CB.position.set(-900, -300, 0);

    threeDimension.scene.add(CB);
}
,
createCylinderObj: function () {
    var CZ = new THREE.Group();
    var CZ1 = new THREE.Mesh(new THREE.CylinderGeometry(700, 700, 700, 32), new THREE.MeshBasicMaterial({
        color: '#5CAEFD',
        transparent: true,
        side: THREE.FrontSide,
        opacity: 0.3
    }));

    vertices = [];
    for (var i = 0; i < 361; i++) {
        var x = 700 * Math.cos(i * Math.PI / 180);
        var z = 700 * Math.sin(i * Math.PI / 180);
        vertices.push(threeDimension.vec3(x, 0, z));
    }
    var lineZ1 = createLineMesh(vertices, '#000', 3, 1.5);
    lineZ1.position.y = 350;

    var lineZ2 = createLineMesh(vertices, '#000', 3, 1.5);
    lineZ2.position.y = -350;

    ZLC = createLineMesh(vertices, '#000', 3, 1.5);
    ZLC.position.x = 900;
    ZLC.position.y = -300 + h;

    textK = threeDimension.createText('K', 160, -250 + h, 0, '#000', 72);

    textN = threeDimension.createText('N', 1640, -250 + h, 0, '#000', 72);

    threeDimension.scene.add(ZLC, textK, textN);

    vertices = [];
    vertices.push(threeDimension.vec3(-700, -350, 0), threeDimension.vec3(700, -350, 0));
    var lineZ3 = createLineMesh(vertices, '#000', 2, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(0, -350, 0), threeDimension.vec3(0, 350, 0));
    var lineZ4 = createLineMesh(vertices, '#000', 2, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(-700, 350, 0), threeDimension.vec3(0, -350, 0));
    var lineZ5 = createLineMesh(vertices, '#000', 2, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(700, 350, 0), threeDimension.vec3(0, -350, 0));
    var lineZ6 = createLineMesh(vertices, '#000', 2, 1.5);

    vertices = [];
    vertices.push(threeDimension.vec3(700, 350, 0), threeDimension.vec3(-1800, 350, 0));
    var Line = createLineMesh(vertices, '#4A90E2', 2, 1.5);

    var textO1 = threeDimension.createText('O\'', 0, -380, 0, '#000', 72);

    var textP = threeDimension.createText('P', 730, 410, 0, '#000', 72);

    CZ.add(CZ1, lineZ1, lineZ2, lineZ3, lineZ4, lineZ5, lineZ6, Line, textO1, textP);
    CZ.position.set(900, 50, 0);

    threeDimension.scene.add(CZ);
}
,
changeE:function () {
    if (CG != null) {
        threeDimension.scene.remove(CG);
    }
    if (h == 700) {
        ZLC.visible = false;
        textK.visible = false;
        textN.visible = false;
        return;
    } else {
        ZLC.visible = true;
        textK.visible = true;
        textN.visible = true;
        ZLC.position.y = -300 + h;
        textK.position.y = -250 + h;
        textN.position.y = -250 + h;
    }
    CG = new THREE.Group();
    var r = Math.sqrt(700 * 700 - h * h);
    var vertices;
    vertices = [];
    for (var i = 0; i < 361; i++) {
        var x = r * Math.cos(i * Math.PI / 180);
        var z = r * Math.sin(i * Math.PI / 180);
        y = -300 + h;
        vertices.push(threeDimension.vec3(x, y, z));
    }
    var CG1 = createLineMesh(vertices, '#000', 3, 1.5);
    CG1.position.x = -900;

    vertices = [];
    vertices.push(threeDimension.vec3(0, -300, 0), threeDimension.vec3(r, -300 + h, 0));
    var lineR = createLineMesh(vertices, '#000', 2, 1.5);
    lineR.position.x = -900;

    var textR = threeDimension.createText('R', -890 + r / 2, -310 + h / 2, 0, '#000', 72);

    vertices = [];
    vertices.push(threeDimension.vec3(0, -300 + h, 0), threeDimension.vec3(r, -300 + h, 0));
    var liner = createLineMesh(vertices, '#000', 2, 1.5);
    liner.position.x = -900;

    var textr = threeDimension.createText('r', -900 + r / 2, -220 + h, 0, '#000', 72);

    var textl = threeDimension.createText('l', -930, -260 + h / 2, 0, '#000', 72);

    vertices = [];
    for (var i = 0; i < 361; i += 6) {
        var x = h * Math.cos(i * Math.PI / 180);
        var z = h * Math.sin(i * Math.PI / 180);
        y = -300 + h;
        vertices.push(threeDimension.vec3(x, y, z));
    }
    var CG2 = createLineMesh(vertices, '#000', 2, 1.5);
    CG2.position.x = 900;

    var textA = threeDimension.createText('A', 850 - h, -250 + h, 0, '#000', 72);

    var textB = threeDimension.createText('B', 950 + h, -250 + h, 0, '#000', 72);

    vertices = [];
    vertices.push(threeDimension.vec3(0, -300 + h, 0), threeDimension.vec3(h, -300 + h, 0));
    var linel2 = createLineMesh(vertices, '#000', 2, 1.5);
    linel2.position.x = 900;

    var textl2 = threeDimension.createText('l', 900 + h / 2, -210 + h, 0, '#000', 72);

    vertices = [];
    vertices.push(-900, 0, 0);
    var CG3 = threeDimension.createCircle(vertices, r, '#5CAEFD', true);
    CG3.position.y = -300 + h;
    CG3.rotation.x = Math.PI / 2;


    var shape = new THREE.Shape();
    shape.moveTo(700, 0);
    for (var i = 0; i < 361; i = i + 6) {
        shape.lineTo(700 * Math.cos(i * Math.PI / 180), 700 * Math.sin(i * Math.PI / 180));
    }
    var hole = new THREE.Path();
    hole.moveTo(r, 0);
    for (var i = 0; i < 361; i = i + 6) {
        hole.lineTo(h * Math.cos(i * Math.PI / 180), h * Math.sin(i * Math.PI / 180));
    }
    shape.holes.push(hole);
    var meshMaterial = new THREE.MeshBasicMaterial({
        color: '#5CAEFD',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        depthTest: false
    });
    meshMaterial.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), meshMaterial);
    mesh.rotation.x = 0.5 * Math.PI;
    mesh.position.x = 900;
    mesh.position.y = -300 + h;

    CG.add(CG1, lineR, liner, textR, textr, textl, CG2, textA, textB, linel2, textl2, CG3, mesh);

    threeDimension.scene.add(CG);
}
}
;

threeDimension.init();

function renderAll() {
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene, threeDimension.camera);
}

renderAll();

$("#slider1").change(function () {
    var val = parseInt(this.value) / 10;
    h = val * 70;
    threeDimension.changeE();
});

function reset() {
    var H = window.innerHeight;
    if (H < 580) {
        $('.slider').find('.sliderLeft').css({'width': '31px'});
        $('.slider').find('.xdsoft_range2dslider_runner').css({'left': '31px'});
        $('.slider').find('.xdsoft_slider_label').text('3');
        $('.slider').attr('value', '' + 15 + '|0');
    } else {
        $('.slider').find('.sliderLeft').css({'width': '62px'});
        $('.slider').find('.xdsoft_range2dslider_runner').css({'left': '62px'});
        $('.slider').find('.xdsoft_slider_label').text('3');
        $('.slider').attr('value', '' + 30 + '|0');
    }
    // threeDimension.controls.reset();
    h = 210;
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 200;
    threeDimension.camera.position.z = 2000;
    threeDimension.changeE();
    if (window.innerHeight < 540) {
        threeDimension.camera.zoom = 0.5;
    } else {
        threeDimension.camera.zoom = 1;
    }
    threeDimension.camera.updateProjectionMatrix();
}

if (isMob) {
    $('#reset').on('touchstart', reset);
} else {
    $('#reset').on('click', reset);
}


