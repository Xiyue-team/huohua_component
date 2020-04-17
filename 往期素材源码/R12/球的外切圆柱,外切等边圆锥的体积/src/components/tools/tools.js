let createSphere = (r, sg1, sg2, color, opacity) => {
  var gemo1 = new THREE.SphereGeometry(250, 36, 36);
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
var dashCircle = (r1, r2, isDash,deg, color, position,opacity) => {
  var gemo2 = new THREE.RingGeometry(r1, r2, deg);
  if(isDash){
    var material2 = new THREE.LineDashedMaterial(
      {
        color: color,
        dashSize:8,
        gapSize: 20,
        depthTest: false,
        transparent:true,
        opacity:opacity

      }
    );
    var circle = new THREE.Line(gemo2, material2).computeLineDistances();

  }

  else {
    var material2 = new THREE.LineBasicMaterial(
      {
        color: color,
        depthTest: false,
        transparent:true,
        opacity:opacity,
        side:THREE.DoubleSide

      }
    );
    var circle = new THREE.Line(gemo2, material2);
  }

  circle.position.set(...position);
  return circle
};

//画实心圆
var SolidCircle = (r,seg,color, opacity,position) => {
  var gemo2 = new THREE.CircleGeometry(r,seg);
  var material2 = new THREE.MeshBasicMaterial(
    {
      color: color,
      depthTest: false,
      opacity:opacity,
      transparent:true,
      side:THREE.DoubleSide
    }
  );
  var circle = new THREE.Mesh(gemo2, material2);

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
      opacity:0.6,
      depthTest: false,
      transparent: true,
      side:THREE.DoubleSide
    });

  var mesh = new THREE.Mesh(gemo, material);
  mesh.position.set(...position);
  return mesh
};
//矩形平面
var drawPlane = (w, h, color, position) => {
  var gemo = new THREE.PlaneGeometry(w, h);
  var material = new THREE.MeshBasicMaterial(
    {
      color: color,
      opacity: 1,
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

  function run(){
    t+=steps;
    objs.material.opacity=t;
    timer=setTimeout(run,times);
    if(t>=endLengths){
    clearTimeout(timer);
    }
  }
  run()

};

//画圆锥,圆柱函数

let drawCylinder=(r1,r2,h,sg1,sg2,position,color=0xEEEEEE,opacity=1)=>{
var gemo=new THREE.CylinderGeometry(r1,r2,h,sg1,sg2);
var material=new THREE.MeshPhongMaterial({
color:color,
opacity:opacity,
depthTest:false,
  transparent:true,
  side:THREE.DoubleSide
});
  var mesh=new THREE.Mesh(gemo,material);
  mesh.position.set(...position);
    return mesh
};
let adjustCamera=function(camera,target,time){

  camera.position.set(-100,-100,1290);
  var x=parseInt(camera.position.x);
  var y=parseInt(camera.position.y);
  var z=parseInt(camera.position.z);
  var x1=target.x;
  var y1=target.y;
  var z1=target.z;
  var timer=1;

  var p=new Promise(function (resolve,reject) {
    run();
    function run(){


      if(Math.abs(x-x1)>5){
        if(x1>x){
          x+=5
        }
        else {
          x-=5
        }
      }
      if(Math.abs(y-y1)>5){
        if(y1>y){
          y+=5
        }
        else {
          y-=5
        }
      }
      if(Math.abs(z-z1)>5){

        if(z1>z){
          z+=5
        }
        else {
          z-=5
        }
      }
      var timer=setTimeout(run,time);
      if(Math.abs(x-x1)<=8&&Math.abs(y-y1)<=8&&Math.abs(z-z1)<=8){

        clearTimeout(timer);
        resolve();
      }
      camera.position.set(x,y,z);
      camera.lookAt(new THREE.Vector3(0,0,0));
    }

  });

  return p
}





let tools={
  createSphere,
  dashCircle,
  createText,
  drawPoint,
  drawPlane,
  drawCirclePlane,
  drawLine,
  createIncreTimer,
  drawCylinder,
  SolidCircle,
  adjustCamera,


};
export default tools;
