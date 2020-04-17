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
var leftC = 0;
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
    leftC = ($('#threeContainer').width() - cW) / 2;

};
var widthT = $('#threeContainer').width();
var heightT = $('#threeContainer').height();

var a = 10, e = 0.6;

var threeDimension = {
    init: function () {
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObj();
    },

    //创建场景于相机
    createScene: function () {
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(50, widthT / heightT, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        if (isMob) {
            threeDimension.renderer = new THREE.WebGLRenderer();
        } else {
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio(window.devicePixelRatio);
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(widthT, heightT);
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    //定义鼠标控制
    createControls: function () {
        threeDimension.controls = new THREE.OrbitControls(threeDimension.camera, threeDimension.renderer.domElement);
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate = false;
        threeDimension.controls.enablePan = false;
        threeDimension.controls.enableZoom = false;
    },
    vec3: function (x, y, z) {
        return new THREE.Vector3(x, y, z);
    },
    createText: function (texts, x, y, z, color, size) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {
            align: textAlign.center,
            font: size + 'px "Cambria Italic"',
            fillStyle: color,
            antialias: true
        };
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x, y, z);
        return text;
    },
    createTriangleFace: function (vertices, color) {
        var material = new THREE.MeshBasicMaterial({color: color});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
    },
    createAxis: function () {
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 40, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3(-450, 0, 0), threeDimension.vec3(450, 0, 0), 0x000000, 1);
        threeDimension.drawAxisArrow(threeDimension.vec3(0, -450, 0), threeDimension.vec3(0, 450, 0), 0x000000, 2);
        threeDimension.scene.add(threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis: function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var text = {}, line = null, vertices = null;
        // label x axis:
        for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
                continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            if (i == 0) {
                text.position.x = i + 10;
            }
            else {
                text.position.x = i;
            }
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];

            vertices.push(threeDimension.vec3(i, 0, 0));
            vertices.push(threeDimension.vec3(i, 10, 0));

            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        // label y axis:
        for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
                continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -15;
            text.position.y = i + 7;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0, i, 0));
            vertices.push(threeDimension.vec3(10, i, 0));

            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow: function (origin, dir, color, style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = threeDimension.createLineMesh(geometryLine.vertices, color, 3, 2);
        threeDimension.axis.add(line);
        var text;
        if (style == 1) {
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, 5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, -5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('x', dir.x, -5, 0, '#000', 28);
            threeDimension.axis.add(text);
            text = threeDimension.createText('O', -14, -2, 0, '#000', 23);
            threeDimension.axis.add(text);
        } else {
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(-5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('y', 20, dir.y + 10, 0, '#000', 28)
            threeDimension.axis.add(text);
        }
    },
    createLineMesh: function (vertices, color, style,width) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(threeDimension.vec3(vertices[0].x, vertices[0].y - 1, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x, vertices[1].y - 1, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x + 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x + 1, vertices[1].y, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x - 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x - 1, vertices[1].y, vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 7,
                gapSize: 7,
                linewidth: width
            }));
        } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                color: color,
                linewidth: width,
                transparent: true,
                opacity: 0.7
            }));
        }
        return lineMesh;
    },
    createCircle: function (vertices, radius, color, end) {
        var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.2});
        if (!end) {
            end = Math.PI * 2;
            var CircleM = new THREE.MeshBasicMaterial({color: color});
        }
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, end);
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0];
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    },
    createObj: function () {
        if (threeDimension.obj != null) {
            this.scene.remove(threeDimension.obj);
        }
        threeDimension.obj = new THREE.Object3D();
        var vertices1 = [], vertices2 = [], result, line1, line2, text1F, text11, text2F, text22, circle1, circle2;
        if (e < 1) {
            var b = Math.pow((1 - Math.pow(e, 2)) * Math.pow(a, 2), 1 / 2);
            var c = a * e;
            for (i = -a; i <= a; i += 0.01) {
                result = Math.pow(Math.abs((1 - Math.pow(i / a, 2)) * Math.pow(b, 2)), 1 / 2);
                vertices1.push(threeDimension.vec3(i * 40, result * 40, 1));
            }
            for (i = -a; i <= a; i += 0.01) {
                result = -Math.pow(Math.abs((1 - Math.pow(i / a, 2)) * Math.pow(b, 2)), 1 / 2);
                vertices2.push(threeDimension.vec3(i * 40, result * 40, 1));
            }
            line1 = threeDimension.createLineMesh(vertices1, '#5CAEFD', 3,2);
            line2 = threeDimension.createLineMesh(vertices2, '#5CAEFD', 3,2);
            var vertices = [];
            for (var i = 0; i < 361; i += 2) {
                var x = 5 * Math.cos(i * Math.PI / 180);
                var y = 5 * Math.sin(i * Math.PI / 180);
                vertices.push(threeDimension.vec3(x, y, 1));
            }
            var lineC1 = threeDimension.createLineMesh(vertices, '#000', 3,1);
            lineC1.position.x = -c * 40;
            var lineC2 = threeDimension.createLineMesh(vertices, '#000', 3,1);
            lineC2.position.x = c * 40;
            circle1 = threeDimension.createCircle([-c * 40, 0, 1], 5, '#6D6EFF');
            text1F = threeDimension.createText('F', -c * 40 - 20, 40, 0, '#6D6EFF', 23);
            text11 = threeDimension.createText('1', -c * 40 - 12, 30, 0, '#6D6EFF', 14);
            circle2 = threeDimension.createCircle([c * 40, 0, 1], 5, '#6D6EFF');
            text2F = threeDimension.createText('F', c * 40 + 15, 40, 0, '#6D6EFF', 23);
            text22 = threeDimension.createText('2', c * 40 + 23, 30, 0, '#6D6EFF', 14);
            threeDimension.obj.add(line1, line2, circle1, text1F, text11, circle2, text2F, text22, lineC1, lineC2);
            if (e == 0) {
                threeDimension.obj.remove(text1F, text11, text2F, text22, circle1, lineC1);
            }
        } else if (e = 1) {
            for (i = -4.5; i <= 4.5; i += 0.01) {
                result = Math.pow(i, 2) / 2;
                vertices1.push(threeDimension.vec3(i * 40, result * 40, 1));
            }
            var vertices = [];
            for (var i = 0; i < 361; i += 2) {
                var x = 5 * Math.cos(i * Math.PI / 180);
                var y = 5 * Math.sin(i * Math.PI / 180);
                vertices.push(threeDimension.vec3(x, y, 1));
            }
            var lineC = threeDimension.createLineMesh(vertices, '#000', 3,2);
            lineC.position.y = 40;
            line1 = threeDimension.createLineMesh(vertices1, '#5CAEFD', 3,2);
            circle1 = threeDimension.createCircle([0, 40, 1], 5, '#6D6EFF');
            text1F = threeDimension.createText('F', 22, 80, 0, '#6D6EFF', 23);
            // text11 = threeDimension.createText('1', 30, 70, 0, '#6D6EFF', 14);
            threeDimension.obj.add(line1, text1F,  circle1, lineC);
        }

        threeDimension.scene.add(threeDimension.obj);
    }
};

threeDimension.init();
function renderAll() {
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene, threeDimension.camera);
}
renderAll();
$("#slider1").change(function () {
    e = parseInt($(this).val()) / 100;
    threeDimension.createObj();
});

function reset() {
    $('.s1 .sliderLeft').width(123);
    $('.s1 .xdsoft_range2dslider_runner').css('left', '123px');
    $('.s1 .xdsoft_slider_label').text('0.60');
    e = 0.60;
    threeDimension.createObj();
    threeDimension.camera.position.set(0, 0, 1200);
}

if (isMob) {
    $('#reset img').on('touchstart', reset);

} else {
    $('#reset img').on('click', reset);

}

