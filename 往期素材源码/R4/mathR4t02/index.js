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

//判断设备类型进行缩放
var isMob = /iPad|Android/g.test(navigator.userAgent);

var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

var zoom = 1;
if (wHeight < 580) {
    zoom = 0.8;
    $('.right').css('zoom', zoom);
}
$('.left').width(wWidth - 280 * zoom);
$('#threeContainer').width(wWidth - 280 * zoom);
$('#threeContainer').height(wHeight - 80 * zoom);
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('.right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('.right').css('zoom', zoom);
    }
    $('.left').width(wWidth - 280 * zoom);
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    $('#threeContainer').width(wWidth - 280 * zoom);
    $('#threeContainer').height(wHeight - 80 * zoom);
    $('canvas').css({
        'left': ($('#threeContainer').width() - cW) / 2 + 'px',
        'top': ($('#threeContainer').height() - cH) / 2 + 'px'
    });
}

//视图区鼠标事件操作相关变量
var offset = new THREE.Vector3(),
    mouse = new THREE.Vector2();

/****** 位置相关 ******/
var widthT = $("#threeContainer").width();
var heightT = $("#threeContainer").height();

var j1 = 45, j2 = 135;

var threeDimension = {
    //初始化
    init: function () {
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObj();
    },
    //创建场景于相机
    createScene: function () {
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        //canvas渲染
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
        var textStyle = {align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x, y, z);
        return text;
    },
    createAxis: function () {
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 40, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3(-450, 0, 0), threeDimension.vec3(450, 0, 0), '#000000', 1);
        threeDimension.drawAxisArrow(threeDimension.vec3(0, -450, 0), threeDimension.vec3(0, 450, 0), '#000000', 2);
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
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, -5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('x', dir.x, -5, 0, '#000000', 26);
            threeDimension.axis.add(text);
        } else {
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(-5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000000");
            threeDimension.axis.add(triangle2);

            text = threeDimension.createText('y', 15, dir.y + 10, 0, '#000000', 26);
            threeDimension.axis.add(text);
        }
    },
    createLineMesh: function (vertices, color, style, width) {
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: width}));
        } else if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 7,
                gapSize: 7,
                linewidth: 2
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
        if (threeDimension.Obj != null) {
            threeDimension.scene.remove(threeDimension.Obj);
        }

        var vertices;
        threeDimension.Obj = new THREE.Group();

        //直线l1
        var line1 = threeDimension.createLine_text(j1, 'l1', 3, true);


        //直线l2
        var line2 = threeDimension.createLine_text(j2, 'l2', 0);

        var vertices = [];
        for (var i = 0; i < 361; i += 2) {
            var x = 6 * Math.cos(i * Math.PI / 180);
            var y = 6 * Math.sin(i * Math.PI / 180);
            vertices.push(threeDimension.vec3(x, y, 1));
        }
        var lineC1 = threeDimension.createLineMesh(vertices, '#000', 3, 1);
        var lineC2 = threeDimension.createLineMesh(vertices, '#000', 3, 1);
        lineC2.position.y = 120;

        //直角
        //虚线1
        vertices1 = [threeDimension.vec3(-360, 0, -1), threeDimension.vec3(360, 0, -1)];
        var dashLine1 = threeDimension.createLineMesh(vertices1, '#00D034', 2, 2);
        dashLine1.position.y = 120;
        threeDimension.Obj.add(dashLine1);
        //P1点
        vertices = [];
        vertices.push(0, 120, 0);
        var P1 = threeDimension.createCircle(vertices, 5, '#6D6EFF');

        //P2点
        vertices = [];
        vertices.push(0, 0, 0);
        var P2 = threeDimension.createCircle(vertices, 5, '#6D6EFF');

        //𝛼角
        var vertices = [];
        var dx = 0;
        var dy = 0;
        var textj1;
        if (j1 != 0) {
            for (var i = 0; i < j1; i++) {
                dx = 25 * Math.cos(Math.PI / 180 * i);
                dy = 25 * Math.sin(Math.PI / 180 * i) + 120;
                vertices.push(threeDimension.vec3(dx, dy, 3));
            }
            var ang1 = threeDimension.createLineMesh(vertices, '#00D034', 3, 1);
            vertices = [];
            vertices.push(0, 120, 0);
            var ang1P = threeDimension.createCircle(vertices, 24, '#00D034', Math.PI / 180 * j1);
            textj1 = threeDimension.createText('α', 40 * Math.cos(Math.PI / 180 * j1 / 2), 40 * Math.sin(Math.PI / 180 * j1 / 2) + 135, 0, '#6D6EFF', 24);
            threeDimension.Obj.add(ang1, textj1, ang1P);
        }

        //β角
        var vertices = [];
        var dx = 0;
        var dy = 0;
        var textj2;
        if (j2 != 0) {
            if (j2 <= 180) {
                for (var i = 0; i < j2; i++) {
                    dx = 25 * Math.cos(Math.PI / 180 * i);
                    dy = 25 * Math.sin(Math.PI / 180 * i);
                    vertices.push(threeDimension.vec3(dx, dy, 3));
                }
                var verticesP = [];
                verticesP.push(0, 0, 0);
                var ang2P = threeDimension.createCircle(verticesP, 24, '#00D034', Math.PI / 180 * j2);
                textj2 = threeDimension.createText('β', 40 * Math.cos(Math.PI / 180 * j1 / 2) - 12, 40 * Math.sin(Math.PI / 180 * j1 / 2) + 40, 0, '#6D6EFF', 24);
            } else {
                for (var i = 0; i < j2 - 180; i++) {
                    dx = 25 * Math.cos(Math.PI / 180 * i);
                    dy = 25 * Math.sin(Math.PI / 180 * i);
                    vertices.push(threeDimension.vec3(dx, dy, 3));
                }
                var verticesP = [];
                verticesP.push(0, 0, 0);
                var ang2P = threeDimension.createCircle(verticesP, 24, '#00D034', Math.PI / 180 * (j2 - 180));
                textj2 = threeDimension.createText('β', 40 * Math.cos(Math.PI / 360 * j1 / 2) + 5, 40 * Math.sin(Math.PI / 360 * j1 / 2) + 5, 0, '#6D6EFF', 24);
            }
            var ang2 = threeDimension.createLineMesh(vertices, '#00D034', 3, 1);

            threeDimension.Obj.add(ang2, textj2, ang2P);
        }

        threeDimension.Obj.add(P1, P2, line1, line2, lineC1, lineC2);
        threeDimension.scene.add(threeDimension.Obj);
    },
    createTriangleFace: function (vertices, color, f) {
        if (f) {
            var material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.2});
        } else {
            var material = new THREE.MeshBasicMaterial({color: color});
        }
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
    },
    createLine_text: function (j, name, p, F) {
        var vertices = [];
        var line_text = new THREE.Group();
        var y1 = (9 * Math.tan(j / 180 * Math.PI) + p);
        var y2 = (-9 * Math.tan(j / 180 * Math.PI) + p);
        var x1 = (9 - p) / Math.tan(j / 180 * Math.PI);
        var x2 = (-9 - p) / Math.tan(j / 180 * Math.PI);
        var x, y, text1, text2;
        if (j < 90) {
            if (y1 > -10 && y1 < 10) {
                vertices.push(threeDimension.vec3(360, y1 * 40, 0));
                x = 375;
                y = y1 * 40 + 15;
            } else if (x1 > -10 && x1 < 10) {
                vertices.push(threeDimension.vec3(x1 * 40, 360, 0));
                x = x1 * 40 + 15;
                y = 375
            }
            if (y2 > -10 && y2 < 10) {
                vertices.push(threeDimension.vec3(-360, y2 * 40, 0));
            } else if (x2 > -10 && x2 < 10) {
                vertices.push(threeDimension.vec3(x2 * 40, -360, 0));
            }
            text1 = threeDimension.createText('l', x, y, 0, '#6D6EFF', 24);
            text2 = threeDimension.createText(name == 'l1' ? '1' : '2', x + 10, y - 10, 0, '#6D6EFF', 16);
        } else {
            if (y1 > -10 && y1 < 10) {
                vertices.push(threeDimension.vec3(360, y1 * 40, 0));
            } else if (x2 > -10 && x2 < 10) {
                vertices.push(threeDimension.vec3(x2 * 40, -360, 0));
            }
            if (y2 > -10 && y2 < 10) {
                vertices.push(threeDimension.vec3(-360, y2 * 40, 0));
                x = -375;
                y = y2 * 40 + 15
            } else if (x1 > -10 && x1 < 10) {
                vertices.push(threeDimension.vec3(x1 * 40, 360, 0));
                x = x1 * 40 - 15;
                y = 375
            }
            text1 = threeDimension.createText('l', x, y, 0, '#6D6EFF', 24);
            text2 = threeDimension.createText(name == 'l1' ? '1' : '2', x + 10, y - 10, 0, '#6D6EFF', 16);
        }
        if (name === 'l1') {
            var line = threeDimension.createLineMesh(vertices, '#EF732C', 3, 3);
        } else {
            var line = threeDimension.createLineMesh(vertices, '#299AED', 3, 3);
        }
        if (F) {
            var angle = new THREE.Group();
            var vertices1 = [];
            var vertices2 = [];
            vertices1.push(threeDimension.vec3(10, 10, 0));
            vertices1.push(threeDimension.vec3(20, 0, 0));
            vertices2.push(threeDimension.vec3(20, 0, 0));
            vertices2.push(threeDimension.vec3(10, -10, 0));
            var line1 = threeDimension.createLineMesh(vertices1, '#00D034', 3, 1);
            var line2 = threeDimension.createLineMesh(vertices2, '#00D034', 3, 1);
            var verticesPl = [];
            verticesPl.push(threeDimension.vec3(10, 10, 0), threeDimension.vec3(20, 0, 0), threeDimension.vec3(10, -10, 0))
            var Pl1 = threeDimension.createTriangleFace(verticesPl, '#00D034', true);
            var verticesPl = [];
            verticesPl.push(threeDimension.vec3(10, 10, 0), threeDimension.vec3(0, 0, 0), threeDimension.vec3(10, -10, 0))
            var Pl2 = threeDimension.createTriangleFace(verticesPl, '#00D034', true);
            angle.add(line1, line2, Pl1, Pl2);
            var x = 60 * Math.cos((j * 2 + 90) * Math.PI / 180);
            var y = 60 * Math.sin((j * 2 + 90) * Math.PI / 180) + 60;
            angle.position.set(x, y, 0);
            angle.rotation.z = (j - 45) / 180 * Math.PI;
            line_text.add(angle);
        }
        line_text.add(text1, text2, line);
        return line_text;
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
    var val = parseInt(this.value);
    j1 = val;
    j2 = val + 90;
    threeDimension.createObj();
});

function reset() {
    $('.slider').find('.sliderLeft').css({'width': '55px'});
    $('.slider').find('.xdsoft_range2dslider_runner').css({'left': '55px'});
    $('.slider').find('.xdsoft_slider_label').text('45°');
    $('.slider').attr('value', '' + 45 + '|0');
    j1 = 45;
    j2 = 45 + 90;
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 0;
    threeDimension.camera.position.z = 1200;
    threeDimension.createObj();
}

if (isMob) {
    $('#reset').on('touchstart', reset);
} else {
    $('#reset').on('click', reset);
}


