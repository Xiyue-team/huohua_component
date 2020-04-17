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
// $(".con").css("margin-top",marginTop);
var arcJson = [];
var ismoving = false,
  speed = 1,
  changeFlag = 0;
var dynamic = 0;
var canWebgl = (function() {
  try {
    var canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
})();
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
var $obj = $('#threeContainer'),
  threeHeight = $obj.height(),
  threeWidth = $obj.width(),
  styleValue = 0;
var getParameter = {
  radius: 160,
  clear: 5,
  angle: 0
};
var oriParameter = {
  radius: 160,
  clear: 5,
  angle: 0
};
var polygon = { //多边形参数
  radius: 160,
  angle: 0,
  clear: 5
};
if (canWebgl) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  speed = 180;
} else {
  renderer = new THREE.CanvasRenderer();
  speed = 60;
}
//控件取值结束
var axisFlag = false;
//三维图形开始
var threeSphere = {
  axis: new THREE.Object3D(),
  circleLines: [],
  init: function() {
    threeSphere.createMesh();
    threeSphere.labelAxis(20, 20, 500);
    threeSphere.createAxis();
    threeSphere.createCircle();
    threeSphere.createPlane();
    threeSphere.createPlan2();
  },
  createMesh: function() {
    if (threeSphere.mesh) {
      scene.remove(threeSphere.mesh);
    }
    var materialSph = new THREE.MeshBasicMaterial({ color: '#F39800', transparent: true, opacity: 0.4 });
    var sphGeo = new THREE.SphereGeometry(getParameter.radius, 72, 72, 0, 2 * Math.PI);
    threeSphere.mesh = new THREE.Mesh(sphGeo, materialSph);
    threeSphere.mesh.position.y = 0;
    threeSphere.mesh.rotation.y = -Math.PI;
    scene.add(threeSphere.mesh);
    if (getParameter.radius == 0) {
      scene.remove(threeSphere.mesh);
    }
  },
  createCircle: function() {
    if (threeSphere.circleLines.length) {
      for (var i = 0; i < threeSphere.circleLines.length; i++) {
        scene.remove(threeSphere.circleLines[i]);
      }
      threeSphere.circleLines = [];
    }
    var geometryLine1 = new THREE.Geometry(),
      geometryLine2 = new THREE.Geometry();
    var vertices1 = [],
      vertices2 = [];
    for (i = 0; i < 73; i++) {
      vertices1.push(new THREE.Vector3(getParameter.radius * Math.cos(i * 5 * Math.PI / 180), 0, getParameter.radius * Math.sin(i * 5 * Math.PI / 180)));
      vertices2.push(new THREE.Vector3(getParameter.radius * Math.cos(i * 5 * Math.PI / 180), 0, getParameter.radius * Math.sin(i * 5 * Math.PI / 180)));
    }
    geometryLine1.vertices = vertices1;
    geometryLine2.vertices = vertices2;
    geometryLine1.computeLineDistances();
    geometryLine2.computeLineDistances();
    var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineDashedMaterial({ color: '#F39800', side: THREE.DoubleSide, dashSize: 10, gapSize: 5 }));
    var lineMesh2 = new THREE.Line(geometryLine2, new THREE.LineDashedMaterial({ color: '#F39800', side: THREE.DoubleSide, dashSize: 10, gapSize: 5 }));
    lineMesh1.position.y = 0;
    lineMesh2.rotation.z = Math.PI / 2;
    lineMesh2.rotation.y = -Math.PI / 4;
    lineMesh2.position.y = 0;
    scene.add(lineMesh1);
    scene.add(lineMesh2);
    threeSphere.circleLines.push(lineMesh1);
    threeSphere.circleLines.push(lineMesh2);
    if (getParameter.radius == 0) {
      scene.remove(lineMesh1);
      scene.remove(lineMesh2);
    }
  },
  createPlane: function() {
    if (threeSphere.plane) {
      scene.remove(threeSphere.plane);
    }
    var planeGeo = new THREE.CircleGeometry(getParameter.radius, 32, 0, Math.PI);
    var materialPlane = new THREE.MeshBasicMaterial({ color: '#FCB743', side: THREE.DoubleSide });
    threeSphere.plane = new THREE.Mesh(planeGeo, materialPlane);
    threeSphere.plane.rotation.z = -Math.PI / 2;
    threeSphere.plane.position.y = 0;
    threeSphere.plane.rotation.y = Math.PI / 180 * getParameter.angle;
    scene.add(threeSphere.plane);
    if (getParameter.radius == 0) {
      scene.remove(threeSphere.plane);
    }
  },
  createPlan2: function() {
    if (threeSphere.plane2) {
      scene.remove(threeSphere.plane2);
    }
    var planeGeo = new THREE.CircleGeometry(getParameter.radius, 32, 0, Math.PI);
    var materialPlane = new THREE.MeshBasicMaterial({ color: '#FCB743', side: THREE.DoubleSide });
    threeSphere.plane2 = new THREE.Mesh(planeGeo, materialPlane);
    threeSphere.plane2.rotation.z = -Math.PI / 2;
    threeSphere.plane2.rotation.y = 0;
    threeSphere.plane2.position.y = 0;
    if (getParameter.radius == 0) {
      scene.remove(threeSphere.plane2);
    }
  },
  labelAxis: function(start, stepSize, stop) {
    if (threeSphere.axis.length > 0) {
      for (var i = 0; i < threeSphere.axis.length; i++) {
        scene.remove(threeSphere.axis[i]);
      }
    }
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {};
    // label x axis:
    textStyle = { align: textAlign.center, font: '12px Cambria Math', fillStyle: 'red', antialias: true };
    for (var i = start; i <= stop; i = i + stepSize) {
      var text = new SpriteText2D(i / 20, textStyle);
      text.rotation = camera.rotation;
      text.position.x = i;
      text.position.y = -5;
      threeSphere.axis.add(text);
    }
    text = new SpriteText2D('x', textStyle);
    text.rotation = camera.rotation;
    text.position.x = stop + 30;
    text.position.y = -5;
    threeSphere.axis.add(text);
    // label z axis:
    textStyle = { align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00F', antialias: true };
    for (var i = start; i <= stop; i = i + stepSize) {
      text = new SpriteText2D(i / 20, textStyle);
      text.position.z = i;
      text.position.x = -0.2;
      text.position.y = -5;
      threeSphere.axis.add(text);
    }
    text = new SpriteText2D('z', textStyle);
    text.position.z = stop + 30;
    text.position.x = -0.2;
    text.position.y = -5;
    threeSphere.axis.add(text);
    // label y axis:
    textStyle = { align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00FF00', antialias: true };
    for (var i = start; i <= stop; i = i + stepSize) {
      text = new SpriteText2D(i / 20, textStyle);
      text.rotation = camera.rotation;
      text.position.x = 5;
      text.position.y = i;
      text.position.z = 0.2;
      threeSphere.axis.add(text);
    }
    text = new SpriteText2D('y', textStyle);
    text.position.x = 5;
    text.position.y = stop + 30;
    text.position.z = 0.2;
    threeSphere.axis.add(text);
  },
  createAxis: function() {
    var geom1 = new THREE.Geometry();
    var geom2 = new THREE.Geometry();
    var geom3 = new THREE.Geometry();
    geom1.vertices.push(threeSphere.vec3(0, 0, 0), threeSphere.vec3(500, 0, 0));
    geom2.vertices.push(threeSphere.vec3(0, 0, 0), threeSphere.vec3(0, 500, 0));
    geom3.vertices.push(threeSphere.vec3(0, 0, 0), threeSphere.vec3(0, 0, 500));
    var material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    var material3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var line1 = new THREE.Line(geom1, material1);
    var line2 = new THREE.Line(geom2, material2);
    var line3 = new THREE.Line(geom3, material3);
    threeSphere.axis.add(line1, line2, line3);
  },
  vec3: function(x, y, z) {
    return new THREE.Vector3(x, y, z);
  },
  createGrid: function() {
    if (threeSphere.grid) {
      scene.remove(threeSphere.grid);
    }
    var geometry = new THREE.Geometry();
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x949494, transparent: true, opacity: 0.5 });
    var size = 500,
      bottom = -0.001,
      step = 20;
    for (var i = 0; i < 51; i++) {
      geometry.vertices.push(threeSphere.vec3(-size, bottom, i * step - size));
      geometry.vertices.push(threeSphere.vec3(size, bottom, i * step - size));
      geometry.vertices.push(threeSphere.vec3(i * step - size, bottom, -size));
      geometry.vertices.push(threeSphere.vec3(i * step - size, bottom, size));
    }
    threeSphere.grid = new THREE.LineSegments(geometry, lineMaterial);
    scene.add(threeSphere.grid);
  },
  createControls: function() {
    threeSphere.controls = new THREE.OrbitControls(camera, renderer.domElement);
    threeSphere.controls.enableDamping = true;
    threeSphere.controls.dampingFactor = 0.25;
    threeSphere.controls.enableZoom = true;
  },
  dynamicMove: function() {
    if(num == 0){
        return;
    }
    if (getParameter.angle < 361) {
      // threeSphere.createMesh();
      threeSphere.plane.rotation.y = Math.PI / 180 * getParameter.angle;
      threeSphere.createShape();
      if (canWebgl) {
        getParameter.angle++;
      } else {
        getParameter.angle += 3;
      }
      oriParameter.angle = getParameter.angle;
      changeRange(4, getParameter.angle);
      $('.dynamic').addClass('on');
    } else {
      dynamic = false;
      // scene.remove(threeSphere.plane2);
      getParameter.angle = oriParameter.angle = 360;
      changeRange(4, getParameter.angle);
      $('.dynamic').removeClass('on');
      threeSphere.createShape();
    }
  },
  createShape: function(angle) {
    angle = -(getParameter.angle) * Math.PI / 180;
    scene.remove(threeSphere.circlrBottom);
    var g = new THREE.CircleGeometry(getParameter.radius, 50, 0, angle);
    var m = new THREE.MeshBasicMaterial({ color: '#F39800', side: THREE.DoubleSide, opacity: 1, transparent: false });
    threeSphere.circlrBottom = new THREE.Mesh(g, m);
    threeSphere.circlrBottom.rotation.x = Math.PI / 2;
    threeSphere.circlrBottom.position.y = 0;
    scene.add(threeSphere.circlrBottom);
  }
};
//三维图形绘画
var scene = new THREE.Scene();
// scene.position.y = -150;
var camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
camera.position.x = 300;
camera.position.y = 300;
camera.position.z = 1000;
camera.lookAt(scene.position);
var renderer = null;
if (canWebgl) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} else {
  renderer = new THREE.CanvasRenderer();
}
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff);
renderer.setSize(threeWidth, threeHeight);
$obj.append(renderer.domElement);
threeSphere.init();
threeSphere.createControls();
//重置事件
function renderAll() {
  threeSphere.controls.update();
  requestAnimationFrame(renderAll);
  renderer.render(scene, camera);
  if (dynamic) {
    threeSphere.dynamicMove();
  }
}
renderAll();
var num = -1;
$('#slider2').change(function() {
  if (dynamic) {
    //isChanging();
    dynamic = false;
    $('.dynamic').removeClass('on');
  }
  var result = $(this).val();
  var value = parseInt(result.split('|')[0]),
    realV;
  num = value;
  getParameter.radius = value * 20;
  oriParameter.radius = getParameter.radius;
  threeSphere.createMesh();
  threeSphere.createCircle();
  threeSphere.createPlane();
  threeSphere.createShape();
  if (value == 0) {
    console.log(1);
    scene.remove(threeSphere.circlrBottom);
  }
});
$('#slider4').change(function() {
  if (dynamic) {
    isChanging();
    dynamic = false;
    $('.dynamic').removeClass('on');
  }
  var result = $(this).val();
  var value = parseInt(result.split('|')[0]),
    realV;
  getParameter.angle = value;
  oriParameter.angle = getParameter.angle;
  threeSphere.plane.rotation.y = Math.PI / 180 * getParameter.angle;
  if (num != 0) {
    threeSphere.createShape();
  }
});

function isChanging() {
  dynamic = false;
  threeSphere.createMesh();
}

function changeRange(slider, num) {
  var rate, value;
  if (slider == 1) {
    rate = 410 / 150;
  } else if (slider == 2) {
    rate = 410 / 20;
  } else if (slider == 3) {
    rate = 410 / 300;
  } else {
    rate = 410 / 360;
  }
  value = rate * num;
  var obj = $('.s' + slider);
  obj.find('.sliderLeft').css({ 'width': value + 'px' });
  obj.find('.xdsoft_range2dslider_runner').css({ 'left': value + 'px' });
  obj.find('.xdsoft_slider_label').text('' + num);
  if (slider == 4) {
    obj.find('.xdsoft_slider_label').text('' + num + '°');
  }
  $('#slider' + slider).attr('value', '' + num + '|0');
}
/*全屏事件*/
var fullScreen = 0;

function fullEve() {
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

function renewEve() {
  if (dynamic) {
    isChanging();
    dynamic = false;
  }
  getParameter = {
    radius: 160,
    clear: 5,
    angle: 0
  };
  oriParameter = {
    radius: 160,
    clear: 5,
    angle: 0
  };
  polygon = { //多边形参数
    radius: 160,
    angle: 0,
    clear: 5
  };
  dynamic = 0;
  threeSphere.init();
  changeRange(2, 8);
  changeRange(4, 0);
  camera.position.x = 600;
  camera.position.y = 600;
  camera.position.z = 600;
  $('.dynamic').removeClass('on');
  scene.remove(threeSphere.circlrBottom)
}

function dynamicEve() {
  if (dynamic) {
    return;
  }
  dynamic = !dynamic;
  getParameter.angle = 0;
}
if (!isMob) {
  $('#renew').on('click', renewEve);
  $('#scale').on('click', fullEve);
  $('.dynamic').on('click', dynamicEve);
} else {
  $('#renew').on('touchstart', renewEve);
  $('#scale').on('touchstart', fullEve);
  $('.dynamic').on('touchstart', dynamicEve);
}