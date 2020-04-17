var vec3 = (x, y, z) => {
  return new THREE.Vector3(x, y, z);
};
var radian = (v) => {
  return v / 180 * Math.PI;
}
var angle = (v) => {
  return v / Math.PI * 180;
}
var createLineMesh = (vertices, color = '#000', style = 3, width = 1) => {
  var lineMesh = null,
    geometryLine = new THREE.Geometry();
  if (style == 2) {
    geometryLine.vertices = vertices;
    geometryLine.computeLineDistances();
    lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
      color: color,
      dashSize: 5,
      gapSize: 5,
      linewidth: width
    }));
  } else if (style == 3) {
    geometryLine.vertices = vertices;
    lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
      color: color,
      linewidth: width
    }));
  }
  return lineMesh;
};
var createStraightLine = (arr, style = 3, width = 1, color = '#000') => {
  let vertices = [];
  for (let value of arr) {
    vertices.push(vec3(...value));
  }
  let line = createLineMesh(vertices, color, style, width);
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
var createText = (texts, x, y, z, color, size) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font: "italic " + size + 'px "Times new roman"',
    fillStyle: color,
    antialias: true
  };
  var text = new SpriteText2D(texts, textStyle);
  text.material.depthTest = false;
  text.scale.set(0.5, 0.5, 0.5);
  text.position.set(x, y, z);
  return text;
};
let axis = null;
var createAxis = () => {
  axis = new THREE.Group();
  labelAxis(-300, 300, 300);
  drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
  drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
  return axis;
};
var labelAxis = (start, stepSize, stop) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font: '22px "Cambria Math"',
    fillStyle: '#000000',
    antialias: true
  };
  let j = 0;
  var text = {},
    line = null,
    vertices = null;
  // label x axis:
  for (var i = start; i <= stop; i = i + stepSize) {
    if (i == 0) {
      continue;
    }
    text = new SpriteText2D(i / 300, textStyle);
    if (i == 0) {
      text.position.x = i + 10;
    } else {
      j = i < 0 ? i - 10 : i + 10;
      text.position.x = j;
    }
    text.position.y = -10;
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
    j = i < 0 ? -10 : 15;
    text = new SpriteText2D(i / 300, textStyle);
    text.position.x = -15;
    text.position.y = i + 7 + j;
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
    text.material.transparent = true;
    text.material.depthTest = false;
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
var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
  var CircleM = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
    side: THREE.DoubleSide,
    depthTest: false
  });
  var CircleG = new THREE.CircleGeometry(radius, 12, start, end);
  var Circle = new THREE.Mesh(CircleG, CircleM);
  Circle.position.x = vertices[0];
  Circle.position.y = vertices[1];
  Circle.position.z = vertices[2];
  return Circle;
};
var createImg = (vertices, w, h, src) => {
  var PlaneG = new THREE.PlaneGeometry(w, h);
  var PlaneM = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(src),
    transparent: true,
    overdraw: 0.2,
    depthTest: false,
    side: THREE.DoubleSide
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
    vertices.push(vec3(x, y, 0));
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
let common = {
  vec3,
  createCircle,
  createImg,
  createText,
  createLineMesh,
  createAxis,
  radian,
  angle,
  preloadImage,
  createStraightLine,
  createStrokeCircle,
  countPos
}
export default common;
