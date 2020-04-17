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
var $threeCon = $('#threeContainer');
var scale = 1,
    isMob = /iPad|Android/g.test(navigator.userAgent),
    bodyWidth, bodyHeight;

function init_() {
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    scale = bodyWidth / 1920;
    if (1200 * scale > bodyHeight) {
        scale = bodyHeight / 1200;
        $('#app').width(1920).css("zoom", scale);
    } else {
        $('#app').height(1200).css("zoom", scale);
    }
    $('#app .main_left div div').height($('#app .main_left div div').width()).css('line-height', $('#app .main_left div div').width() + 'px')
    $('#app .main_left>div').css('margin-top', ($('#app .main_left').height() - $('#app .main_left>div').height()) / 2 + 'px');
    $('.slider1').css({'top': ($threeCon.height() - 620) / 2 + 'px'})
}

init_();
window.onresize = function () {
    init_();
}

//初始全局变量
var obj = null;
var a = 100,
    l = Math.sqrt(29) * 50,
    b = Math.sqrt(l * l - a * a), j, dl, sl, animate = false,animate2 = false;;
var C1, C2, C3, C4;

//视图区鼠标事件操作相关变量
// var raycaster = new THREE.Raycaster(),
//    plane = new THREE.Plane(),
//    offset = new THREE.Vector3(),
//    intersection = new THREE.Vector3(),
//    mouse = new THREE.Vector2(),
//    INTERSECTED = null;
// var selectobjs = [],
//    selectobj = null;
// var offsetLeft = parseInt($threeCon.offset().left);
// var offsetTop = parseInt($threeCon.offset().top);

/****** 位置相关 ******/
var $obj = $('#threeContainer');
threeHeight = $obj.height(),
    threeWidth = $obj.width();

function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;

    this.renderer = null;
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(threeWidth / -4, threeWidth / 4, threeHeight / 4, threeHeight / -4, -100, 10000);

    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 800;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        // this.createControls();
        this.createObj(true);
    };

    /*this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };*/

    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style) {
        var lineMesh = null,
            geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                depthTest: false,
                linewidth: 3
            }));
        } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: 8}));
        }
        return lineMesh;
    }

    function vec3(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    function createText(vertices, font, size, color) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x = vertices[0].x;
        text.position.y = vertices[0].y;
        text.position.z = vertices[0].z;
        return text;
    }

    var PlaneG = new THREE.PlaneGeometry(318 * 0.25, 318 * 0.25);
    var PlaneM = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./images/s.png'),
        transparent: true,
        depthTest: false
    });
    var Plane = new THREE.Mesh(PlaneG, PlaneM);

    var PlaneG2 = new THREE.PlaneGeometry(20, 25);
    var PlaneM2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./images/a1.png'),
        transparent: true,
        depthTest: false,
        overdraw: true
    });
    var Plane2;

    function createTriangleFace(color, one) {
        b = Math.sqrt(l * l - a * a);
        j = Math.atan(b / a);

        var sj = Math.tan(j / 2);
        sl = sj * a / (1 + sj);

        var q = (Math.PI / 2 - j) / 2;
        dl = l / 2 - sl / Math.tan(q);

        var vertices = [];
        var objT = new THREE.Object3D();
        vertices.push(vec3(-sl, -sl, 0), vec3(-sl, a - sl, 0), vec3(b - sl, -sl, 0));
        var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide, overdraw: true});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        var mesh = new THREE.Mesh(geom, material);


        if (one) {
            Plane.position.set((b - 2 * sl) / 2, (a - 2 * sl) / 2, 0);
            Plane.rotation.z = -Math.PI / 2 + j;
            objT.add(Plane);

            var vertices = [];
            vertices.push(vec3(-sl, -sl, 2), vec3(-sl, a - sl, 2));
            var line1 = createLineMesh(vertices, '#9472FD', 3);

            var vertices = [];
            vertices.push(vec3(b - sl, -sl, 2), vec3(-sl, -sl, 2));
            var line2 = createLineMesh(vertices, '#FA5A54', 3);

            var vertices = [];
            vertices.push(vec3(-sl, a - sl, 2), vec3(b - sl, -sl, 2));
            var line3 = createLineMesh(vertices, '#4E8AFA', 3);

            var line = new THREE.Group();
            line.position.z = 5;
            line.add(line1, line2, line3);

            Plane2.position.set(-sl - 15, (a - sl - sl) / 2 - 3, 10);
            if (animate) {
                Plane2.rotation.z = -Math.PI / 2 + j;
            } else {
                Plane2.rotation.z = 0;
            }
            vertices = [];
            vertices.push(vec3((b - sl - sl) / 2, -sl - 5, 10))
            var textb = createText(vertices, 'b', 34, '#FA5A54');

            objT.add(Plane2, textb);
        } else {
            var vertices = [];
            vertices.push(vec3(-sl, -sl, 1), vec3(-sl, a - sl, 1), vec3(b - sl, -sl, 1), vec3(-sl, -sl, 1));
            var line = createLineMesh(vertices, '#000', 3);
        }

        objT.add(mesh, line);
        return objT;
    }

    this.createObj = function (flag) {
        if (obj != null) {
            three.scene.remove(obj);
        }
        obj = new THREE.Object3D();
        Plane2 = new THREE.Mesh(PlaneG2, PlaneM2);

        C1 = createTriangleFace('#99d759', true);
        C1.name = 'c1';

        C2 = createTriangleFace('#FFD334');
        C2.name = 'c2';

        C3 = createTriangleFace('#FC587A');
        C3.name = 'c3';

        C4 = createTriangleFace('#2BBCFF');
        C4.name = 'c4';


        if (flag) {
            C1.position.set(-220, 120, 6);
            C2.position.set(120, 120, 4);
            C3.position.set(-220, -120, 2);
            C4.position.set(120, -120, 0);
        }

        // selectobjs.push(C1.children[0], C2.children[0], C3.children[0], C4.children[0]);
        obj.add(C1, C2, C3, C4);
        three.scene.add(obj);
    };
    this.createZ = function () {
        animate = true;
        animate2 = true;
        if (C1.rotation.z != Math.PI / 2 - j || C2.rotation.z != -j || C3.rotation.z != Math.PI - j || C4.rotation.z != -Math.PI / 2 - j) {
            new TWEEN.Tween(C1.rotation).to({z: Math.PI / 2 - j}, 2000).repeat(false).start();
            new TWEEN.Tween(C2.rotation).to({z: -j}, 2000).repeat(false).start();
            new TWEEN.Tween(C3.rotation).to({z: Math.PI - j}, 2000).repeat(false).start();
            new TWEEN.Tween(C4.rotation).to({z: -Math.PI / 2 - j}, 2000).repeat(false).start();
            new TWEEN.Tween(Plane2.rotation).to({z: -Math.PI / 2 + j}, 2000).repeat(false).start();
            setTimeout(function () {
                if (animate2 == false) {
                    return;
                }
                ap();
            }, 2000)
        } else {
            ap();
        }

        function ap() {
            new TWEEN.Tween(C1.position).to({x: dl, y: l / 2 - sl}, 2000).repeat(false).start();
            new TWEEN.Tween(C2.position).to({x: l / 2 - sl, y: -dl}, 2000).repeat(false).start();
            new TWEEN.Tween(C3.position).to({x: -(l / 2 - sl), y: dl}, 2000).repeat(false).start();
            new TWEEN.Tween(C4.position).to({x: -dl, y: -(l / 2 - sl)}, 2000).repeat(false).start();
            setTimeout(function () {
                $('.choose2').css('visibility', 'visible');
                animate2 = false;
            }, 2000)
        }
    }
    this.createB = function () {
        if (animate) {
            three.createObj(false);
            C1.position.set(dl, l / 2 - sl, 0);
            C1.rotation.z = Math.PI / 2 - j;
            C2.position.set(l / 2 - sl, -dl, 2);
            C2.rotation.z = -j;
            C3.position.set(-(l / 2 - sl), dl, 4);
            C3.rotation.z = Math.PI - j;
            C4.position.set(-dl, -(l / 2 - sl), 6);
            C4.rotation.z = -Math.PI / 2 - j;
        } else {
            three.createObj(true);
        }

    }
    // this.onDocumentMouseDown = function() {
    //    event.preventDefault();
    //    var mouse = {};
    //    mouse.x = ((event.clientX - offsetLeft * scale) / (threeWidth * scale)) * 2 - 1;
    //    mouse.y = -((event.clientY - offsetTop * scale) / (threeHeight * scale)) * 2 + 1;
    //    raycaster.setFromCamera(mouse, thiz.camera);
    //    var intersects = raycaster.intersectObjects(selectobjs);
    //    if (intersects.length > 0) {
    //       for (var i in selectobjs) {
    //          if (i <= 3) {
    //             selectobjs[i].parent.position.z = 2 * i;
    //          }
    //       }
    //       selectobj = intersects[0].object;
    //       mousedownflag = true;
    //    }
    // };
    // this.onDocumentMouseMove = function() {
    //    if (mousedownflag) {
    //       event.preventDefault();
    //       var mouse = {};
    //       mouse.x = ((event.clientX - offsetLeft * scale) / (threeWidth * scale)) * 2 - 1;
    //       mouse.y = -((event.clientY - offsetTop * scale) / (threeHeight * scale)) * 2 + 1;
    //       var intersects = raycaster.intersectObjects(selectobjs);
    //       raycaster.setFromCamera(mouse, thiz.camera);
    //       if (intersects.length > 0) {
    //          if (INTERSECTED != intersects[0].object) {
    //             INTERSECTED = intersects[0].object;
    //             plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection(plane.normal), INTERSECTED.position);
    //          }
    //          if (raycaster.ray.intersectPlane(plane, intersection)) {
    //             var obj = intersection.sub(offset),
    //                x, y;
    //             x = Math.round(obj.x);
    //             y = Math.round(obj.y);
    //             selectobj.parent.position.set(x, y, 8);
    //          }
    //       }
    //    }
    // };
    // this.onDocumentMouseUp = function() {
    //    event.preventDefault();
    //    mousedownflag = false;
    //    selectobj = null;
    // };
    // this.onDocumentTouchStart = function() {
    //    event.preventDefault();
    //    if (event.touches.length === 1) {
    //       var mouse = {};
    //       mouse.x = ((event.touches[0].pageX - offsetLeft * scale) / (threeWidth * scale)) * 2 - 1;
    //       mouse.y = -((event.touches[0].pageY - offsetTop * scale) / (threeHeight * scale)) * 2 + 1;
    //       raycaster.setFromCamera(mouse, thiz.camera);
    //       var intersects = raycaster.intersectObjects(selectobjs);
    //       if (intersects.length > 0) {
    //          for (var i in selectobjs) {
    //             if (i <= 3) {
    //                selectobjs[i].parent.position.z = 2 * i;
    //             }
    //          }
    //          selectobj = intersects[0].object;

    //          mousedownflag = true;
    //       }
    //    }
    // };
    // this.onDocumentTouchMove = function() {
    //    if (mousedownflag) {
    //       event.preventDefault();
    //       if (event.touches.length === 1) {
    //          var mouse = {};
    //          mouse.x = ((event.touches[0].pageX - offsetLeft * scale) / (threeWidth * scale)) * 2 - 1;
    //          mouse.y = -((event.touches[0].pageY - offsetTop * scale) / (threeHeight * scale)) * 2 + 1;
    //          var intersects = raycaster.intersectObjects(selectobjs);
    //          raycaster.setFromCamera(mouse, thiz.camera);
    //          if (intersects.length > 0) {
    //             if (INTERSECTED != intersects[0].object) {
    //                INTERSECTED = intersects[0].object;
    //                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection(plane.normal), INTERSECTED.position);
    //             }
    //             if (raycaster.ray.intersectPlane(plane, intersection)) {
    //                var obj = intersection.sub(offset),
    //                   x, y;
    //                x = Math.round(obj.x);
    //                y = Math.round(obj.y);
    //                selectobj.parent.position.set(x, y, 8);
    //             }
    //          }
    //       }
    //    }
    // };
    // this.onDocumentTouchEnd = function() {
    //    event.preventDefault();
    //    mousedownflag = false;
    //    selectobj = null;
    // };

}

var three = new ThreeDimensional();
three.int();

//鼠标点击，选中顶点
// three.renderer.domElement.addEventListener('mousedown', three.onDocumentMouseDown, false);
// three.renderer.domElement.addEventListener('mouseup', three.onDocumentMouseUp, false);
// three.renderer.domElement.addEventListener('mousemove', three.onDocumentMouseMove, false);
// three.renderer.domElement.addEventListener('touchstart', three.onDocumentTouchStart, false);
// three.renderer.domElement.addEventListener('touchmove', three.onDocumentTouchMove, false);
// three.renderer.domElement.addEventListener('touchend', three.onDocumentTouchEnd, false);

renderAll();

function renderAll() {
    TWEEN.update();
    // three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene, three.camera);
}

function reset() {
    $('.choose2').css('visibility', 'hidden');
    a = 100;
    animate = false;
    animate2 = false;
    three.createObj(true);
    // touch_flage = false;
    $('.gs').hide();
    $('.sliderMove').css({'bottom': '-30px'});
}

//滑条a
var TX, TY, mX, mY, T;

function touchStart(e) {
    if(animate2){
        return;
    }
    TX = event.touches[0].clientX;
    TY = event.touches[0].clientY;
    T = parseInt($('.sliderMove').css('bottom'));
    $(window).on('touchmove', touchMove);
    $(window).on('touchend', touchEnd);
}

function touchMove(e) {
    var TX2 = event.touches[0].clientX;
    var TY2 = event.touches[0].clientY;
    mX = TX - TX2;
    mY = TY - TY2;
    if (T + mY / scale < -30) {
        mY = (-30 - T) * scale
    } else if (T + mY / scale > 590) {
        mY = (590 - T) * scale;
    }
    $('.sliderMove').css('bottom', T + mY / scale + 'px');
    var St = (Math.sqrt(59) / 2 * 50 - 100) / 610;
    a = (T + mY / scale + 30) * St + 100;
    if (a > 190.394) {
        a = 190.394;
    }
    // 异步渲染
    setTimeout(three.createB(), 1);
}

function touchEnd(e) {
    $(window).unbind('touchmove');
    $(window).unbind('touchend');
}

function mouseDown(e) {
    if(animate2){
        return;
    }
    TX = event.clientX;
    TY = event.clientY;
    T = parseInt($('.sliderMove').css('bottom'));
    $(window).on('mousemove', mouseMove);
    $(window).on('mouseup', mouseUp);
}

function mouseMove(e) {
    var TX2 = event.clientX;
    var TY2 = event.clientY;
    mX = TX - TX2;
    mY = TY - TY2;
    if (T + mY / scale < -30) {
        mY = (-30 - T) * scale
    } else if (T + mY / scale > 590) {
        mY = (590 - T) * scale;
    }
    $('.sliderMove').css('bottom', T + mY / scale + 'px');
    var St = (Math.sqrt(59) / 2 * 50 - 100) / 610;
    a = (T + mY / scale + 30) * St + 100;
    if (a > 190.394) {
        a = 190.394;
    }
    // 异步渲染
    setTimeout(three.createB(), 1);
}

function mouseUp(e) {
    $(window).unbind('mousemove');
    $(window).unbind('mouseup');
}

$('.sliderMove').on('touchstart', touchStart);
$('.sliderMove').on('mousedown', mouseDown);

function choose2() {
    $('.gs').show()
}

if (isMob) {
    $('.choose1').on('touchstart', three.createZ);
    $('.choose2').on('touchstart', choose2);
    $('.reset').on('touchstart', reset);
} else {
    $('.choose1').on('click', three.createZ);
    $('.choose2').on('click', choose2);
    $('.reset').on('click', reset);
}