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
document.onselectstart = function() { return false; };
//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if (!(bodyWidth == 370 && bodyHeight == 246)) {
  var isMob = /iPad|Android/g.test(navigator.userAgent);
  var $body = $("body");
  // if (isMob) {
    var bodyScale = scale = bodyWidth / 1920;
    $('.body').css("zoom", bodyScale).height(1200);
    var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
    $('.body').css("margin-top", '-600px');
    $threeCon.css({ 'right': 686 * scale, left: 33 * scale, top: (69 * scale + (bodyHeight - 1200 * scale) / 2), bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2) });
    $(".threeControl").css({ "zoom": bodyScale / 0.7, "right": 30 * bodyScale, "bottom": 30 * bodyScale });
  // } else {
  //   scale = 0.6667;
  //   $(".body").css({ "zoom": 0.6667, "margin-top": '0', "top": '0' });
  //   $threeCon.css({ 'right': 686 * scale, left: 33 * scale, top: (69 * scale), bottom: (69 * scale) });
  // }
  $('.zoom').css("zoom", scale);
  $('body').css('background', '#000');
}
// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100) / 2;
$(".con").css("margin-top", marginTop);
//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
  plane = new THREE.Plane(),
  offset = new THREE.Vector3(),
  intersection = new THREE.Vector3(),
  mouse = new THREE.Vector2(),
  INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);
/****** 位置相关 ******/
var $obj = $('#threeContainer');
threeHeight = $obj.height(),
  threeWidth = $obj.width();
//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var obj = new THREE.Group();
var Mx = 0,
  My = 4,
  F1x = -3,
  F1y = 0,
  F2x = 3,
  F2y = 0,
  j = 0,
  S = null;

function ThreeDimensional() {
  var mousedownflag = false;
  var thiz = this;
  var selectobjs = [],
    selectobj = null;
  /****** 判断是否支持WebGL ******/
  var canWebgl = (function() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
  this.renderer = null;
  if (canWebgl) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  } else {
    this.renderer = new THREE.CanvasRenderer();
  }
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.controls = null;
  /****** 分割线 ******/
  this.int = function() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 1500;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize(threeWidth, threeHeight);
    $obj.append(this.renderer.domElement);
    this.createControls();
    this.createAxis();
    this.createObj();
  };
  this.createControls = function() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
  };
  /****** 事件函数 ******/
  function createLineMesh(vertices, color, style) {
    var lineMesh = null,
      geometryLine = new THREE.Geometry();
    if (!color) {
      color = '#000';
    }
    if (style == 1) {
      vertices.push(new THREE.Vector3(vertices[0].x, vertices[0].y - 1, vertices[0].z));
      vertices.push(new THREE.Vector3(vertices[1].x, vertices[1].y - 1, vertices[1].z));
      vertices.push(new THREE.Vector3(vertices[0].x + 1, vertices[0].y, vertices[0].z));
      vertices.push(new THREE.Vector3(vertices[1].x + 1, vertices[1].y, vertices[1].z));
      vertices.push(new THREE.Vector3(vertices[0].x - 1, vertices[0].y, vertices[0].z));
      vertices.push(new THREE.Vector3(vertices[1].x - 1, vertices[1].y, vertices[1].z));
      geometryLine.vertices = vertices;
      lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
    } else if (style == 2) {
      geometryLine.vertices = vertices;
      geometryLine.computeLineDistances();
      lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
        color: color,
        opacity: 0.8,
        dashSize: 10,
        gapSize: 10
      }));
    } else if (style == 3) {
      geometryLine.vertices = vertices;
      lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
    }
    return lineMesh;
  }

  function vec3(x, y, z) {
    return new THREE.Vector3(x, y, z);
  }

  function createText(vertices, font, size, color) {
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = { align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true };
    var text = new SpriteText2D(font, textStyle);
    text.position.x = vertices[0].x
    text.position.y = vertices[0].y
    text.position.z = vertices[0].z
    return text;
  }

  function createTriangleFace(vertices, color) {
    var material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
    var geom = new THREE.Geometry();
    geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
    geom.vertices = vertices;
    var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom, [material]);
    return mesh;
  }

  function drawAxisArrow(origin, dir, style) {
    var vertices = [];
    vertices.push(new THREE.Vector3(origin.x, origin.y, origin.z));
    vertices.push(new THREE.Vector3(dir.x, dir.y, dir.z));
    var line = createLineMesh(vertices, '#000', 3);
    axisArrow.add(line);
    if (style == 1) {
      vertices = [];
      vertices.push(new THREE.Vector3(dir.x - 20, 5, 0));
      vertices.push(new THREE.Vector3(dir.x, 0, 0));
      line = createLineMesh(vertices, '#000', 3);
      axisArrow.add(line);
      vertices = [];
      vertices.push(new THREE.Vector3(dir.x - 20, -5, 0));
      vertices.push(new THREE.Vector3(dir.x, 0, 0));
      line = createLineMesh(vertices, '#000', 3);
      axisArrow.add(line);
      vertices = []
      vertices.push(new THREE.Vector3(dir.x, -5, 0));
      var textx = createText(vertices, 'x', 26, '#000000');
      axis.add(textx);
    } else {
      vertices = [];
      vertices.push(new THREE.Vector3(5, dir.y - 20, 0));
      vertices.push(new THREE.Vector3(0, dir.y, 0));
      line = createLineMesh(vertices, '#000', 3);
      axisArrow.add(line);
      vertices = [];
      vertices.push(new THREE.Vector3(-5, dir.y - 20, 0));
      vertices.push(new THREE.Vector3(0, dir.y, 0));
      line = createLineMesh(vertices, '#000', 3);
      axisArrow.add(line);
      vertices = []
      vertices.push(new THREE.Vector3(-15, dir.y + 5, 0));
      var texty = createText(vertices, 'y', 26, '#000000');
      axis.add(texty);
    }
  }

  function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var text = {};
    // label x axis:
    var textStyle = { align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true };
    for (var i = startx; i <= stopx; i = i + stepSizex) {
      if (i == 0) {
        continue;
      }
      text = new SpriteText2D(i / stepSizex, textStyle);
      text.position.x = i;
      text.position.y = -10;
      axis.add(text);
      var vertices = [];
      vertices.push(new THREE.Vector3(i, 0, 0));
      vertices.push(new THREE.Vector3(i, 10, 0));
      var line = createLineMesh(vertices, '#000', 3);
      axis.add(line);
    }
    // label y axis:
    textStyle = { align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true };
    for (i = starty; i <= stopy; i = i + stepSizey) {
      if (i == 0) { continue; }
      text = new SpriteText2D(i / stepSizey, textStyle);
      text.position.x = -20;
      text.position.y = i + 10;
      text.position.z = 0.2;
      axis.add(text);
      vertices = [];
      vertices.push(new THREE.Vector3(0, i, 0));
      vertices.push(new THREE.Vector3(10, i, 0));
      line = createLineMesh(vertices, '#000', 3);
      axis.add(line);
    }
  }

  function createCircle(vertices, radius, color, opacity = 1) {
    var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
    var CircleM = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity });
    var Circle = new THREE.Mesh(CircleG, CircleM);
    Circle.position.x = vertices[0].x;
    Circle.position.y = vertices[0].y;
    Circle.position.z = vertices[0].z;
    return Circle;
  }
  /****** 其他事件 ******/
  this.createAxis = function() {
    labelAxis(-500, 50, 500, -500, 50, 500);
    drawAxisArrow(vec3(-550, 0, 0), vec3(550, 0, 0), 1);
    drawAxisArrow(vec3(0, -550, 0), vec3(0, 550, 0), 2);
    this.scene.add(axisArrow, axis);
  };
  var group1 = null;
  var group2 = null;
  var group3 = null;
  this.createObj = function() {
    if (obj != null) {
      this.scene.remove(obj, group1, group2, group3);
      selectobjs = [];
    }
    obj = new THREE.Group();
    group1 = new THREE.Group();
    group2 = new THREE.Group();
    group3 = new THREE.Group();
    var vertices;
    //M
    vertices = [];
    vertices.push(vec3(Mx * 50, My * 50, 1));
    var M = createCircle([vec3(0, 0, 1)], 30, '#60b6f1', 0)
    M.material.depthTest = false;
    // M.material.depthWrite = false;
    M.name = 'M';
    var M1 = createCircle([vec3(0, 0, 0)], 10, '#60b6f1')
    vertices = [];
    vertices.push(vec3(Mx * 50 + 20, My * 50 + 20, 1));
    var textM = createText(vertices, 'M', 24, '#000')
    group1.add(M1, M);
    group1.position.set(Mx * 50, My * 50, 0);
    vertices = [];
    vertices.push(vec3(-10, -5, 1));
    var textO = createText(vertices, 'O', 24, '#000')
    //F1
    vertices = [];
    vertices.push(vec3(F1x * 50, F1y * 50, 1));
    var F1 = createCircle([vec3(0, 0, 1)], 30, '#60b6f1', 0)
    F1.material.depthTest = false;
    F1.name = 'F1'
    var F11 = createCircle([vec3(0, 0, 0)], 10, '#60b6f1')
    vertices = [];
    vertices.push(vec3(F1x * 50 - 20, F1y * 50 + 30, 1));
    var textF1 = createText(vertices, 'F1', 24, '#000')
    group2.add(F1, F11);
    group2.position.set(F1x * 50, F1y * 50, 0);
    //F2
    vertices = [];
    vertices.push(vec3(F2x * 50, F2y * 50, 1));
    var F2 = createCircle([vec3(0, 0, 1)], 30, '#60b6f1', 0)
    F2.material.depthTest = false;
    F2.name = 'F2'
    var F22 = createCircle([vec3(0, 0, 0)], 10, '#60b6f1')
    vertices = [];
    vertices.push(vec3(F2x * 50 + 20, F2y * 50 + 30, 1));
    var textF2 = createText(vertices, 'F2', 24, '#000')
    group3.add(F2, F22);
    group3.position.set(F2x * 50, F2y * 50, 0);
    selectobjs.push(M, F1, F2);
    obj.add(textO, textM, textF1, textF2, group1, group2,group3)
    //辅助线
    if (j == 0) {
      vertices = [];
      vertices.push(vec3(Mx * 50, My * 50, 1))
      vertices.push(vec3(F1x * 50, F1y * 50, 1))
      var line1 = createLineMesh(vertices, "#60b6f1", 2)
      vertices = [];
      vertices.push(vec3(Mx * 50, My * 50, 1))
      vertices.push(vec3(F2x * 50, F2y * 50, 1))
      var line2 = createLineMesh(vertices, "#60b6f1", 2)
      obj.add(line1, line2)
    } else {
      vertices = [];
      var a = Math.sqrt(My * My + F2x * F2x);
      for (var i = 0; i <= j; i++) {
        vertices.push(vec3(a * Math.sin(i / 180 * Math.PI) * 50, My * Math.cos(i / 180 * Math.PI) * 50, 1))
      }
      var line = createLineMesh(vertices, '#60b6f1', 3)
      vertices = [];
      vertices.push(vec3(a * Math.sin(j / 180 * Math.PI) * 50, My * Math.cos(j / 180 * Math.PI) * 50, 1))
      vertices.push(vec3(F1x * 50, F1y * 50, 1))
      var line3 = createLineMesh(vertices, "#60b6f1", 2)
      vertices = [];
      vertices.push(vec3(a * Math.sin(j / 180 * Math.PI) * 50, My * Math.cos(j / 180 * Math.PI) * 50, 1))
      vertices.push(vec3(F2x * 50, F2y * 50, 1))
      var line4 = createLineMesh(vertices, "#60b6f1", 2)
      obj.add(line, line3, line4)
      if (j != 360) {
        vertices = [];
        vertices.push(vec3(a * Math.sin(j / 180 * Math.PI) * 50, My * Math.cos(j / 180 * Math.PI) * 50, 1));
        var M1 = createCircle(vertices, 8, '#60b6f1')
        vertices = [];
        vertices.push(vec3(a * Math.sin(j / 180 * Math.PI) * 50 + 25, My * Math.cos(j / 180 * Math.PI) * 50 + 20, 1));
        var textM1 = createText(vertices, 'M`', 24, '#000')
        obj.add(M1, textM1)
      }
    }
    this.scene.add(obj)
  };
  this.dynamic = function() {
    $('#threeContainer canvas').css('pointer-events', 'none');
    j = 0;
    cancelAnimationFrame(S);
   var an=function() {
      if (j >= 360) {
        cancelAnimationFrame(S);
        $('#threeContainer canvas').css('pointer-events', 'auto');
        return;
      }
      $('.slider1').find('.sliderLeft').css({ 'width': (j * 41 / 36) + 'px' });
      $('.slider1').find('.xdsoft_range2dslider_runner').css({ 'left': (j * 41 / 36) + 'px' });
      $('.slider1').attr('value', '' + j + '|0');
      j += 4;
      thiz.createObj();
      S = requestAnimationFrame(an)
    }
    an();
  };
  this.onDocumentMouseDown = function() {
    event.preventDefault();
    var mouse = {},
      position = { x: 0, y: 0 };
    if (fullScreen) {
      position.x = (bodyWidth - threeWidth) / 2;
      position.y = (bodyHeight - threeHeight) / 2;
    } else {
      position.x = offsetLeft;
      position.y = offsetTop;
    }
    mouse.x = ((event.clientX - position.x) / threeWidth) * 2 - 1;
    mouse.y = -((event.clientY - position.y) / threeHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, thiz.camera);
    var intersects = raycaster.intersectObjects(selectobjs);
    if (intersects.length > 0) {
      selectobj = intersects[0].object;
      // console.log(selectobj.name);
      mousedownflag = true;
    }
  };
  this.onDocumentMouseMove = function() {
    event.preventDefault();
    var mouse = {},
      position = { x: 0, y: 0 };
    if (fullScreen) {
      position.x = (bodyWidth - threeWidth) / 2;
      position.y = (bodyHeight - threeHeight) / 2;
    } else {
      position.x = offsetLeft;
      position.y = offsetTop;
    }
    mouse.x = ((event.clientX - position.x) / threeWidth) * 2 - 1;
    mouse.y = -((event.clientY - position.y) / threeHeight) * 2 + 1;
    var intersects = raycaster.intersectObjects(selectobjs);
    raycaster.setFromCamera(mouse, thiz.camera);
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        INTERSECTED = intersects[0].object;
        plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection(plane.normal), INTERSECTED.position);
      }
    }
    if (mousedownflag) {
      if (raycaster.ray.intersectPlane(plane, intersection)) {
        var obj = intersection.sub(offset),
          x, y;
        x = Math.round(obj.x / 50);
        y = Math.round(obj.y / 50);
        if (selectobj.name == 'M' && y >= 1 && y <= 7) {
          My = y;
        } else if (selectobj.name == 'F1' && x <= -1 && x >= -7) {
          F1x = x;
          F2x = -x;
        } else if (selectobj.name == 'F2' && x >= 1 && x <= 7) {
          F1x = -x;
          F2x = x;
        }
        thiz.createObj()
      }
    }
  };
  this.onDocumentMouseUp = function() {
    event.preventDefault();
    mousedownflag = false;
    selectobj = null;
  };
  this.onDocumentTouchStart = function() {
    event.preventDefault();
    if (event.touches.length === 1) {
      var mouse = {},
        position = { x: 0, y: 0 };
      if (fullScreen) {
        position.x = (bodyWidth - threeWidth) / 2;
        position.y = (bodyHeight - threeHeight) / 2;
      } else {
        position.x = offsetLeft;
        position.y = offsetTop;
      }
      mouse.x = ((event.touches[0].pageX - position.x) / threeWidth) * 2 - 1;
      mouse.y = -((event.touches[0].pageY - position.y) / threeHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, thiz.camera);
      var intersects = raycaster.intersectObjects(selectobjs);
      if (intersects.length > 0) {
        selectobj = intersects[0].object;
        mousedownflag = true;
      }
    }
  };
  this.onDocumentTouchMove = function() {
    event.preventDefault();
    if (event.touches.length === 1) {
      var mouse = {},
        position = { x: 0, y: 0 };
      if (fullScreen) {
        position.x = (bodyWidth - threeWidth) / 2;
        position.y = (bodyHeight - threeHeight) / 2;
      } else {
        position.x = offsetLeft;
        position.y = offsetTop;
      }
      mouse.x = ((event.touches[0].pageX - position.x) / threeWidth) * 2 - 1;
      mouse.y = -((event.touches[0].pageY - position.y) / threeHeight) * 2 + 1;
      var intersects = raycaster.intersectObjects(selectobjs);
      raycaster.setFromCamera(mouse, thiz.camera);
      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
          INTERSECTED = intersects[0].object;
          plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection(plane.normal), INTERSECTED.position);
        }
      }
      if (mousedownflag) {
        if (raycaster.ray.intersectPlane(plane, intersection)) {
          var obj = intersection.sub(offset),
            x, y;
          x = Math.round(obj.x / 50);
          y = Math.round(obj.y / 50);
          if (selectobj.name == 'M' && y >= 1 && y <= 7) {
            My = y;
          } else if (selectobj.name == 'F1' && x <= -1 && x >= -7) {
            F1x = x;
            F2x = -x;
          } else if (selectobj.name == 'F2' && x >= 1 && x <= 7) {
            F1x = -x;
            F2x = x;
          }
          thiz.createObj()
        }
      }
    }
  };
  this.onDocumentTouchEnd = function() {
    event.preventDefault();
    mousedownflag = false;
    selectobj = null;
  };
}
var three = new ThreeDimensional();
three.int();
renderAll();

function renderAll() {
  three.controls.update();
  requestAnimationFrame(renderAll);
  three.renderer.render(three.scene, three.camera);
}
//鼠标点击，选中顶点
three.renderer.domElement.addEventListener('mousedown', three.onDocumentMouseDown, false);
three.renderer.domElement.addEventListener('mouseup', three.onDocumentMouseUp, false);
three.renderer.domElement.addEventListener('mousemove', three.onDocumentMouseMove, false);
three.renderer.domElement.addEventListener('touchstart', three.onDocumentTouchStart, false);
three.renderer.domElement.addEventListener('touchmove', three.onDocumentTouchMove, false);
three.renderer.domElement.addEventListener('touchend', three.onDocumentTouchEnd, false);
//滑条
$("#slider1").change(function() {
  var val = parseInt(this.value);
  j = val;
  three.createObj();
});
var fullScreen = 0;

function renew() {
  cancelAnimationFrame(S);
  Mx = 0, My = 4, F1x = -3, F1y = 0, F2x = 3, F2y = 0, j = 0, S = null;
  $('.slider1').find('.sliderLeft').css({ 'width': '0px' });
  $('.slider1').find('.xdsoft_range2dslider_runner').css({ 'left': '0px' });
  $('.slider1').attr('value', '' + 0 + '|0');
  three.camera.position.set(0, 0, 1500);
  three.createObj();
}

function scalef() {
  if (fullScreen) {
    fullScreen = 0;
    $('#scale img').attr('src', 'images/icon/all.png');
    if (isMob) {
      $threeCon.css({ 'right': 686 * scale, left: 33 * scale, top: (69 * scale + (bodyHeight - 1200 * scale) / 2), bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2) });
    } else {
      $threeCon.css({ 'right': 686 * scale, left: 33 * scale, top: (69 * scale), bottom: (69 * scale) });
    }
    $('canvas').css({ 'position': 'absolute', 'left': 0, 'top': 0 });
    $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility', 'visible');
    $('#threeContainer').css({ 'border-radius': 10 * scale, 'box-shadow': 6 * scale + 'px ' + 6 * scale + 'px ' + 20 * scale + 'px rgba(0,0,0,0.30)' });
  } else {
    fullScreen = 1;
    $('#scale img').attr('src', 'images/icon/back.png');
    $obj.css({ 'left': 0, 'top': 0, 'right': 0, 'bottom': 0, 'border-radius': '0' });
    $('canvas').css({ 'position': 'absolute', 'left': (bodyWidth - threeWidth) / 2, 'top': (bodyHeight - threeHeight) / 2 });
    $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility', 'hidden');
  }
}
if (isMob) {
  //重置
  $("#renew").on('touchstart', renew);
  //动态绘制
  $('.dynamic').on('touchstart', three.dynamic);
  /*全屏事件*/
  $('#scale').on('touchstart', scalef);
} else {
  //重置
  $("#renew").on('click', renew);
  //动态绘制
  $('.dynamic').on('click', three.dynamic);
  /*全屏事件*/
  $('#scale').on('click', scalef);
}