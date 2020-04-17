var vec3 = (x, y, z) => {
  return new THREE.Vector3(x, y, z);
};
var radian = (v) => {
  return v / 180 * Math.PI;
}
var angle = (v) => {
  return v / Math.PI * 180;
}
window.resolution=new THREE.Vector2(window.innerWidth, window.innerHeight);
var createLineMesh = (vertices, color = '#000', style = 3, width = 1) => {
  var lineMesh,matLine;
  var geometry = new THREE.LineGeometry();
    geometry.setPositions( vertices );
  if (style == 2) {
      matLine = new THREE.LineMaterial( {
          color: color,
          linewidth: width,
          resolution: resolution,
          dashed: false,
          dashSize : 10,
          gapSize :10,
          dashScale:1
      } );
      matLine.defines.USE_DASH = ""
  } else if (style == 3) {
      matLine = new THREE.LineMaterial( {
          color: color,
          linewidth: width,
          resolution: resolution
      });
  }
  lineMesh = new THREE.Line2( geometry, matLine );
  lineMesh.computeLineDistances();
  return lineMesh;
};
var preloadImage = (path) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}
var createText = (texts, x, y, z, color, size) => {
  var SpriteText2D = THREE_Text.SpriteText2D;
  var textAlign = THREE_Text.textAlign;
  var textStyle = {
    align: textAlign.center,
    font: size + 'px "Cambria Italic"',
    fillStyle: color,
    antialias: true
  };
  var text = new SpriteText2D(texts, textStyle);
  text.position.set(x, y, z);
  return text;
};
var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
  var CircleM = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity
  });
  var CircleG = new THREE.CircleGeometry(radius, 18, start, end);
  var Circle = new THREE.Mesh(CircleG, CircleM);
  Circle.position.x = vertices[0];
  Circle.position.y = vertices[1];
  Circle.position.z = vertices[2];
  return Circle;
};
var createImg = (vertices, w, h, src) => {
  var PlaneG = new THREE.PlaneGeometry(w, h);
  var PlaneM = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load(src),
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
var countPos = (radius,angle)=>{
  let P = {};
  P.x = radius*Math.cos(radian(angle));
  P.y = radius*Math.sin(radian(angle));
  return P;
}
let common = {
  vec3,
  createCircle,
  createImg,
  createText,
  createLineMesh,
  radian,
  angle,
  preloadImage,
  countPos
}
export default common;
