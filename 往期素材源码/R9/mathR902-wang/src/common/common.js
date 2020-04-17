var vec3 = (x, y, z) => {
  return new THREE.Vector3(x, y, z);
};
var radian = (v) => {
  return v / 180 * Math.PI;
}
var angle = (v) => {
  return v / Math.PI * 180;
}
var createLineMesh = (vertices, style = 3, width = 1, color = '#000') => {
  var lineMesh = null,
    geometryLine = new THREE.Geometry();
  if (style == 2) {
    geometryLine.vertices = vertices;
    geometryLine.computeLineDistances();
    lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
      color: color,
      dashSize: 10,
      gapSize: 10,
      linewidth: width
    }));
  } else if (style == 3) {
    geometryLine.vertices = vertices;
    lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
      color: color,
      linewidth: width,
      transparent:true
    }));
  }
  return lineMesh;
};
var createStraightLine = (arr, style = 3, width = 1, color = '#000') => {
  let vertices = [];
  for (let value of arr) {
    vertices.push(vec3(...value));
  }
  let line = createLineMesh(vertices, style, width, color);
  return line;
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
var createText = (texts, x, y, z, color, size,sqrt=false) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font: size + 'px "Cambria Italic"',
    fillStyle: color,
    antialias: true,
    sqrt:sqrt,
  };
  var text = new SpriteText2D(texts, textStyle);
  text.position.set(x, y, z);
  return text;
};
let axis = null;
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
var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
  var CircleM = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity
  });
  var CircleG = new THREE.CircleGeometry(radius, 9, start, end);
  var Circle = new THREE.Mesh(CircleG, CircleM);
  Circle.position.x = vertices[0];
  Circle.position.y = vertices[1];
  Circle.position.z = vertices[2];
  return Circle;
};
var createImg = (vertices, w, h, src,bool=true) => {
  var PlaneG = new THREE.PlaneGeometry(w, h);
  var texture = new THREE.TextureLoader().load( src );
  var PlaneM = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false
  });
  var Plane = new THREE.Mesh(PlaneG, PlaneM);
  var CircleM = new THREE.MeshBasicMaterial({
    color: '#fff'
  });
  var r = h / 4;
  var CircleG = new THREE.CircleGeometry(r, 9);
  var Circle = new THREE.Mesh(CircleG, CircleM);
  var G = new THREE.Group();
  if(bool){
    G.add(Circle)
  }
  G.add(Plane);
  G.position.x = vertices[0].x;
  G.position.y = vertices[0].y;
  G.position.z = vertices[0].z;
  return G;
};
var preloadImage = (path) => {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
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
  createStraightLine
}
export default common;
