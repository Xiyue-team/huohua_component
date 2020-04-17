//  三维向量
import { MeshText2D, textAlign } from 'three-text2d'
var vec3 = (x, y, z) => {
  return new THREE.Vector3(x, y, z);
};
//  角度转弧度
var radian = (v) => {
  return v / 180 * Math.PI;
}
//  弧度转角度
var angle = (v) => {
  return v / Math.PI * 180;
}
//  多边形 参数：side边数、endpoint端点集合（点必须按链接顺序加入）、style（线 1、面 2、虚线 3）、color颜色
var creatPolygon = (endpoint, style, color) => {
  if (style != 3) {
    var shapMaterial = null;
    var shap = new THREE.Shape();
    shap.moveTo(endpoint[0].x, endpoint[0].y);
    for (let i = 1; i < endpoint.length; i++) {
      shap.lineTo(endpoint[i].x, endpoint[i].y);
    }
    shap.lineTo(endpoint[0].x, endpoint[0].y);
    var shapeGeometry = new THREE.ShapeGeometry(shap);
  } else if (style === 3) {
    var DlineMaterial = null;
    var dLineGemoetry = new THREE.Geometry();
    for (let i = 0; i < endpoint.length; i++) {
      dLineGemoetry.vertices.push(vec3(endpoint[i].x, endpoint[i].y, 0))
    }
  }
  switch (style) {
    case 1:
      shapMaterial = creatLinematerial(color);
      var shapMesh = new THREE.LineLoop(shapeGeometry, shapMaterial);
      return shapMesh;
      break;
    case 2:
      shapMaterial = creatMeshmaterial(color);
      var shapMesh = new THREE.Mesh(shapeGeometry, shapMaterial);
      return shapMesh;
    case 3:
      DlineMaterial = creatLineDashedmaterial(color);
      var DlineMesh = new THREE.LineLoop(dLineGemoetry, DlineMaterial, THREE.LineSegments).computeLineDistances();
      return DlineMesh;
      break;
  }
  // var shapMesh = new THREE.LineLoop(shapeGeometry, shapMaterial,THREE.LineSegments).computeLineDistances();
}
// 线材质
window.resolution = new THREE.Vector2(window.innerWidth - 300, window.innerHeight - 72);
var creatLinematerial = (color) => {
  var material = new THREE.LineMaterial({ color: color, resolution: resolution, linewidth: 3});
  material.depthTest = false;
  return material;
}
// mesh材质
var creatMeshmaterial = (color) => {
  var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide,depthTest: false, transparent: true, opacity: 0.4 });
  return material;
}
// 虚线材质
var creatLineDashedmaterial = (color) => {
  var material = new THREE.LineMaterial({
    color: color,
    linewidth: 10,
    resolution: resolution,
      dashed: false,
      dashSize: 10,
      gapSize: 10,
    linewidth: 3
  });
  material.defines.USE_DASH = ""
  return material;
}
var creatLine = (p, style, color) => {
  var lineGeometry = new THREE.LineGeometry();
  let vertices = [];
  for (let value of p) {
    vertices.push(value.x);
    vertices.push(value.y);
    vertices.push(value.z);
  }
  lineGeometry.setPositions(vertices);
  // lineGeometry.vertices.push(new THREE.Vector3(p[0].x, p[0].y, p[0].z));
  // lineGeometry.vertices.push(new THREE.Vector3(p[1].x, p[1].y, p[1].z));
  switch (style) {
    case 1:
      var lineMaterial = creatLinematerial(color);
      break;
    case 2:
      var lineMaterial = creatLineDashedmaterial(color);
      break;
  }
  var line = new THREE.Line2(lineGeometry,lineMaterial).computeLineDistances();

  return line;
}
//  球体
var creatSphere = (radius, color, opacity) => {
  var sphereGeometry = new THREE.SphereGeometry(radius, 50, 50);
  var sphereMaterial = new THREE.MeshPhongMaterial({ color: color, depthTest: false, transparent: true, opacity: opacity });
  // sphereMaterial.blending = THREE.MultiplyBlending
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  return sphere;
}
// , transparent: true, opacity: opacity
//  圆 style(1：实线圆， 2：实心圆，3：虚线圆)
var creatCircle = (R, style, color) => {
  let shape = new THREE.Shape();
  var circleMaterial = null;
  shape.absarc(0, 0, R, 0 / 180 * Math.PI, 360 / 180 * Math.PI, false);
  let arcGeometry = new THREE.ShapeGeometry(shape, 500);
  switch (style) {
    case 1:
      circleMaterial = creatLinematerial(color);
      var shapMesh = new THREE.LineLoop(arcGeometry, circleMaterial);
      return shapMesh;
      break;
    case 2:
      circleMaterial = creatMeshmaterial(color);
      var shapMesh = new THREE.Mesh(arcGeometry, circleMaterial);
      return shapMesh;
    case 3:
      circleMaterial = creatLineDashedmaterial(color);
      var DlineMesh = new THREE.LineLoop(arcGeometry, circleMaterial, THREE.LineSegments).computeLineDistances();
      return DlineMesh;
      break;
  }
}
//  2d文字
var createText = (texts, x, y, z, color, size) => {
  // var SpriteText2D = THREE_Text.SpriteText2D;
  // var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font:  size + 'px "fontt"',
    fillStyle: color,
    antialias: false
  };
  var text = new MeshText2D(texts, textStyle);
  text.position.set(x, y, z);
  return text;
};
let tools = {
  vec3,
  radian,
  angle,
  creatPolygon,
  createText,
  creatMeshmaterial,
  creatLinematerial,
  creatSphere,
  creatCircle,
  creatLine
}
export default tools;
