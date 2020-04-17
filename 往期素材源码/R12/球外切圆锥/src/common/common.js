var vec3 = (x, y, z) => {
  return new THREE.Vector3(x, y, z);
};
var radian = (v) => {
  return v / 180 * Math.PI;
}
var angle = (v) => {
  return v / Math.PI * 180;
}
window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight - 72);
var createLineMesh = (vertices, color = '#000', style = 3, width = 1) => {
  var lineMesh, matLine;
  var geometry = new THREE.LineGeometry();
  geometry.setPositions(vertices);
  if (style == 2) {
    matLine = new THREE.LineMaterial({
      color: color,
      linewidth: width,
      resolution: resolution,
      transparent: true,
      dashed: false,
      depthTest: false,
      opacity:1,
      dashSize: 10,
      gapSize: 10,
      dashScale: 1
    });
    matLine.defines.USE_DASH = ""
  } else if (style == 3) {
    matLine = new THREE.LineMaterial({
      color: color,
      linewidth: width,
      transparent: true,
      resolution: resolution,
    });
  }
  lineMesh = new THREE.Line2(geometry, matLine);
  lineMesh.computeLineDistances();
  return lineMesh;
};
var createStraightLine = (arr, style = 3, width = 2, color = '#000') => {
  let vertices = [];
  for (let value of arr) {
    vertices.push(...value);
  }
  let line = createLineMesh(vertices, color, style, width);
  return line;
}
//画圆线
var drawCircleLine = (radius, { style = 3, color = '#000', line_width = 2, isLay = false, position = [0, 0, 0] } = {}) => {
  let x, y, vertices = [];
  for (let i = 0; i < 361; i += 6) {
    x = radius * Math.cos(radian(i));
    y = radius * Math.sin(radian(i));
    if (isLay) {
      vertices.push(x, 0, y);
    } else {
      vertices.push(x, y, 0);
    }
  }
  let line = createLineMesh(vertices, '#000', style, line_width);
  line.position.set(...position);
  return line;
}
var preloadImage = (path) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}
var createTriangleFace = (vertices, color) => {
  var material = new THREE.MeshBasicMaterial({
    color: color
  });
  var geom = new THREE.Geometry();
  geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
  geom.vertices = vertices;
  var mesh = new THREE.Mesh(geom, material);
  return mesh;
};
var createText = (texts, x, y, z, color='#000', size=48) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
      font: "italic " + size + 'px "Times new roman"',
    fillStyle: color,
    antialias: true
  };
  var text = new SpriteText2D(texts, textStyle);
  text.position.set(x, y, z);
  text.scale.set(0.5, 0.5, 0.5);
  text.material.depthTest = false;
  return text;
};



 //创建坐标点的圆圈和文字

 
let axis = null;

var createCircle = (radius, { color = '#000', start = 0, end = Math.PI * 2, opacity = 1, segments = 36, isLay = false, position = [0, 0, 0], depthTest = false } = {}) => {
  var CircleM = new THREE.MeshBasicMaterial({
    color,
    // transparent: true,
    // opacity,
    side: THREE.DoubleSide,
    depthTest
  });
  var CircleG = new THREE.CircleGeometry(radius, segments, start, end);
  var Circle = new THREE.Mesh(CircleG, CircleM);
  if (isLay) {
    Circle.rotation.x = -Math.PI / 2;
  }
  Circle.position.set(...position);
  return Circle;
};
var createImg = (vertices, w, h, src) => {
  var PlaneG = new THREE.PlaneGeometry(w, h);
  var PlaneM = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture(src),
    transparent: true,
    overdraw: 0.2,
    depthTest: false
  });
  var Plane = new THREE.Mesh(PlaneG, PlaneM);
  Plane.position.x = vertices[0].x;
  Plane.position.y = vertices[0].y;
  Plane.position.z = vertices[0].z;
  return Plane;
};
var createStrokeCircle = (radius, color) => {
  let group = new THREE.Group();
  let x, y, vertices = [];
  for (let i = 0; i < 361; i += 6) {
    x = radius * Math.cos(radian(i));
    y = radius * Math.sin(radian(i));
    vertices.push(x, y, 0);
  }
  let line = createLineMesh(vertices, '#000', 3, 1);
  let circle = createCircle([0, 0, -1], radius, color);
  group.add(line, circle);
  return group;
}
var countPos = (radius, angle) => {
  let P = {};
  P.x = radius * Math.cos(radian(angle));
  P.y = radius * Math.sin(radian(angle));
  return P;
}
var createSphere = (radius, { end = Math.PI * 2, color = '#000', opacity = 1, segments = 36, depthTest = false } = {}) => {
  var geometry = new THREE.SphereBufferGeometry(radius, segments, segments, 0, end);
  var material = new THREE.MeshPhongMaterial({ color, transparent: true, opacity, depthTest });
  var sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

var createBall = (radius, { end = Math.PI * 2, color = '#000', opacity = 1, segments = 36, depthTest = false } = {}) => {
  var geometry = new THREE.SphereBufferGeometry(radius, segments, segments, 0, end);
  var material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthTest });
  var sphere = new THREE.Mesh(geometry, material);
  return sphere;
}



//画直角
var drawRightAngle =(length,{color='#000',width=3}={})=> {
  let line = createStraightLine([
    [0,0,length],[length,0,length],[length,0,0]
    ],3,2,'#00B2FF');
  return line;
}
var createAxis = () => {
  axis = new THREE.Group();
  labelAxis(-400, 40, 400);
  drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
  drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
  scene.add(axis);
};
var labelAxis = (start, stepSize, stop) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font: '18px "Cambria Math"',
    fillStyle: '#000000',
    antialias: true
  };
  var text = {},
    line = null,
    vertices = null;
  // label x axis:
  for (var i = start; i <= stop; i = i + stepSize) {
    if (i == 0) {
      continue;
    }
    text = new SpriteText2D(i / 40, textStyle);
    if (i == 0) {
      text.position.x = i + 10;
    } else {
      text.position.x = i;
    }
    text.position.y = -5;
    axis.add(text);
    vertices = [];
    vertices.push(vec3(i, 0, 0));
    vertices.push(vec3(i, 10, 0));
    var line = createLineMesh(vertices, '#000000', 3, 2);
    axis.add(line);
  }
  // label y axis:
  for (var i = start; i <= stop; i = i + stepSize) {
    if (i == 0) {
      continue;
    }
    text = new SpriteText2D(i / 40, textStyle);
    text.position.x = -15;
    text.position.y = i + 7;
    text.position.z = 0.2;
    axis.add(text);
    vertices = [];
    vertices.push(vec3(0, i, 0));
    vertices.push(vec3(10, i, 0));
    line = createLineMesh(vertices, '#000000', 3, 2);
    axis.add(line);
  }
  axis.add(text);
};
var drawAxisArrow = (origin, dir, color, style) => {
  var geometryLine = new THREE.Geometry();
  var vertices = [];
  vertices.push(origin);
  vertices.push(dir);
  geometryLine.vertices = vertices;
  var line = createLineMesh(geometryLine.vertices, color, 3, 2);
  axis.add(line);
  var text;
  if (style == 1) {
    vertices = [];
    vertices.push(vec3(dir.x - 10, 0, 0));
    vertices.push(vec3(dir.x - 13, 5, 0));
    vertices.push(vec3(dir.x + 5, 0, 0));
    var triangle1 = createTriangleFace(vertices, "#000");
    axis.add(triangle1);
    vertices = [];
    vertices.push(vec3(dir.x - 10, 0, 0));
    vertices.push(vec3(dir.x - 13, -5, 0));
    vertices.push(vec3(dir.x + 5, 0, 0));
    var triangle2 = createTriangleFace(vertices, "#000");
    axis.add(triangle2);
    text = createText('x', dir.x, -5, 0, '#000', 28);
    axis.add(text);
    text = createText('0', -14, -2, 0, '#000', 28);
    axis.add(text);
  } else {
    vertices = [];
    vertices.push(vec3(0, dir.y - 10, 0));
    vertices.push(vec3(5, dir.y - 13, 0));
    vertices.push(vec3(0, dir.y + 5, 0));
    var triangle1 = createTriangleFace(vertices, "#000");
    axis.add(triangle1);
    vertices = [];
    vertices.push(vec3(0, dir.y - 10, 0));
    vertices.push(vec3(-5, dir.y - 13, 0));
    vertices.push(vec3(0, dir.y + 5, 0));
    var triangle2 = createTriangleFace(vertices, "#000");
    axis.add(triangle2);
    text = createText('y', 20, dir.y + 10, 0, '#000', 28)
    axis.add(text);
  }
};




var getLong = (startPos, endPos, group, obj, { style = 3, line_width = 3, color = '#000', step = 0.01 } = {}) => {
  return new Promise((resolve, reject) => {
    let line = common.createStraightLine([
      [...startPos],
      [...endPos]
    ], style, line_width, color);
    line.scale.set(0.01, 0.01, 0.01);
    group.add(line);
    let num = 0;
    obj.timer = null;

    function move() {
      num += step;
      line.scale.set(num, num, num);
      line.position.set((1 - num) * startPos[0], (1 - num) * startPos[1], (1 - num) * startPos[2])
      if (num >= 1) {
        cancelAnimationFrame(obj.timer);
        resolve();
        return;
      }
      obj.timer = requestAnimationFrame(move);
    }
    move();
  })
}
let common = {
  vec3,
  createCircle,
  createImg,
  createText,
  createBall,
  createLineMesh,
  createAxis,
  radian,
  angle,
  preloadImage,
  createStraightLine,
  createStrokeCircle,
  countPos,
  createSphere,
  drawCircleLine,
  drawRightAngle,
  getLong
}
export default common;
