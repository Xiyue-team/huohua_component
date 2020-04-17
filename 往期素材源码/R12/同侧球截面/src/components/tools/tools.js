let createSphere = (r, sg1, sg2, color, opacity) => {



  var gemo1 = new THREE.SphereGeometry(250, 50, 50);
  var material1 = new THREE.MeshPhongMaterial({
    color: color,
    opacity: opacity,
    transparent: true,
    depthTest: false,
    side: THREE.FrontSide
  });
  var obj1 = new THREE.Mesh(gemo1, material1);
  return obj1
};

//画虚线圆
var dashCircle = (r1, r2, deg, color, position) => {
  var gemo2 = new THREE.RingGeometry(r1, r2, deg);
  var material2 = new THREE.LineDashedMaterial(
    {
      color: color,
      dashSize: 5,
      gapSize: 20,
      depthTest: false,

    }
    );
  var circle = new THREE.Line(gemo2, material2).computeLineDistances();

  circle.position.set(...position);
  return circle
};

//画文字
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

  text.position.set(x, y, z);
  return text;
};

//画小圆
var drawPoint = (r, color, position) => {

  var gemo = new THREE.SphereGeometry(r, 36, 36);
  var material = new THREE.MeshBasicMaterial({color: color, opacity: 1, depthTest: false, transparent: true});
  var mesh = new THREE.Mesh(gemo, material);

  mesh.position.set(...position);
  return mesh
};
//圆截面
var drawCirclePlane = (r, color, position) => {
  var gemo = new THREE.CircleGeometry(r, 100, 100);
  var material = new THREE.MeshBasicMaterial(
    {

      color: color,
      opacity:0,
      depthTest: false,
      transparent: true,
      side:THREE.DoubleSide
    });

  var mesh = new THREE.Mesh(gemo, material);
  mesh.position.set(...position);
  return mesh
};
//矩形平面
var drawPlane = (w, h, color, opacity,position) => {
  var gemo = new THREE.PlaneGeometry(w, h);
  var material = new THREE.MeshBasicMaterial(
    {
      color: color,
      opacity: opacity,
      depthTest: false,
      transparent: true,
    side:THREE.DoubleSide
    })
  ;
  var mesh = new THREE.Mesh(gemo, material);
  mesh.position.set(...position);
  return mesh
};

window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight - 72);

var drawLine1=(p1,p2)=>{
  var gemo = new THREE.LineGeometry();
  var arr=[];
  arr.push(...p1);
  arr.push(...p2);
gemo.setPositions(arr);
var material=new THREE.LineMaterial({
  color: 0xff0000,
  linewidth:3,
  resolution: resolution
});

var line=new THREE.Line2(gemo,material);
return line
};

//画线
var drawLine = (start, end, color, opacity,linewidth=2,isDash) => {
  var arr=[];
  arr.push(...start);
  arr.push(...end);
  var material = null;

  var gemo = new THREE.LineGeometry();
  gemo.setPositions(arr);

  if (isDash) {
    material = new THREE.LineMaterial(
      {
        color: color,
        dashSize: 5,
        gapSize: 10,
        vertexColors: false,
        opacity: opacity,
        transparent: true,
        linewidth:linewidth,
        resolution: resolution,
      }
    );
    matLine.defines.USE_DASH = "";
    var line = new THREE.Line2(gemo, material).computeLineDistances();

  }
  else {
    material = new THREE.LineMaterial(
      {
        color: color,
        vertexColors: false,
        opacity: opacity,
        transparent: true,
        linewidth:linewidth,
        resolution: resolution
      }
    );
    var line = new THREE.Line2(gemo, material)

  }
  return line

};



let createIncreTimer=function (obj,step,endLength,time) {

  var objs=obj;
  var steps=step;
  var endLengths=endLength;
  var times=time;
  var timer=0;
  var t=0;
  var pro=new Promise(function (resolve,reject) {
    function run(){

      t+=steps;
      objs.material.opacity=t;
      timer=setTimeout(run,times);
      if(t>=endLengths){
        clearTimeout(timer);
        resolve();
      }
    }
    run()

  });

return pro
};





let adjustCamera=function(camera,target,time){


  var x=parseInt(camera.position.x);
  var y=parseInt(camera.position.y);
  // var z=
  var z=0;
  var x1=target.x;
  var y1=target.y;
  var z1=target.z;
var timer=1;
  camera.position.set(x,y,0);

  var p=new Promise(function (resolve,reject) {
    run();
  function run(){

    if(Math.abs(x1-x)>4){
  if(x1>x){
    x+=4
  }
  else {
    x-=4
  }
  }
    if(Math.abs(y1-y)>4){
      if(y1>y){
        y+=4
      }
      else {
       y-=4
      }
    }
    if(Math.abs(z1-z)>4){

      if(z1>0){
        z+=4
      }
      else {
        z-=4
      }
    }
    var timer=setTimeout(run,time);

if(Math.abs(x-x1)<=8&&Math.abs(y-y1)<=8){

  clearTimeout(timer);
      resolve();
}
console.log(x,y,z);
    camera.position.set(x,y,z1);
    camera.lookAt(new THREE.Vector3(0,0,0));
  }

});

return p
};

let tools={
  createSphere,
  dashCircle,
  createText,
  drawPoint,
  drawPlane,
  drawCirclePlane,
  drawLine,
  drawLine1,
  createIncreTimer,
  adjustCamera
};
export default tools;
