<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn type="radio" v-model="radio_checked">
          延展性
        </ui-btn>
        <ui-btn type="radio" v-model="switch_checked" :style="'margin:30px 0 20px 0;'">
          导电性
        </ui-btn>
        <div id="radioG" :class="{show:switch_checked}">
            <p class="titleG">温度</p>
            <div>
              <div @click="radioC(1)" :class="{checked:radio1}">
                <p>低</p>
                <span><em></em></span>
              </div>
              <div @click="radioC(2)" :class="{checked:radio2}">
                <p>中</p>
                <span><em></em></span>
              </div>
              <div @click="radioC(3)" :class="{checked:radio3}">
                <p>高</p>
                <span><em></em></span>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiSlider},
    data(){
      return {
        title: '电子气理论',
        BtnSpaceStyle: 'flex',
        radio_checked:false,
        switch_checked:false,
        radio1:true,
        radio2:false,
        radio3:false,
        TOOUT:null,
        STEP:2,
        PSET:null,
        NUM:0,
        CDSET:null,
        reset:false
      }
    },
    created(){
      document.title = this.title;
    },
    watch:{
        radio_checked(){
            this.STEP=2;
            if(this.radio_checked){
                this.radio1=true;
                this.radio2=false;
                this.radio3=false;
                this.switch_checked=false;
                this.TOOUT.YZ(this.radio_checked);
                this.TOOUT.clearD();
                this.TOOUT.doCreateShape();
            }else{
                this.TOOUT.YZ(this.radio_checked);
            }
        },
        switch_checked(){
            this.STEP=2;
            if(this.switch_checked){
                this.radio_checked=false;
                this.TOOUT.changeGravity(800);
                this.TOOUT.addE(true);
//                this.TOOUT.clearD();
                this.TOOUT.doCreateShape();
            }else{
                this.TOOUT.clearD();
                cancelAnimationFrame(this.CDSET);
                this.TOOUT.doCreateShape();
                this.TOOUT.addE(false);
                this.TOOUT.changeGravity(0);
            }
        }
    },
    methods: {
      //计算侧边
      setSideStyle(){
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block';
        } else {
          this.BtnSpaceStyle = 'flex';
        }
        var cW=$('canvas').width();
        var cH=$('canvas').height();
        var leftC=($('#renderCanvas').width()-cW)/2;
        $('canvas').css({'left':leftC+'px','top':($('#renderCanvas').height()-cH)/2+'px'});
      },
      radioC(num){
        this.radio1=false;
        this.radio2=false;
        this.radio3=false;
        if(num==1){
            this.radio1=true;
            this.STEP=2;
            this.TOOUT.changeGravity(800);
        }else if(num==2){
            this.radio2=true;
            this.STEP=4;
            this.TOOUT.changeGravity(800);
        }else if(num==3){
            this.radio3=true;
            this.STEP=8;
            this.TOOUT.changeGravity(800);
        }
      },
      //初始化
      init(){
          var thiz=this;
          this.setSideStyle();
          var renderCanvas=document.getElementById('renderCanvas');
          var widthC=window.innerWidth-280,heightC=window.innerHeight-72;
          var  controls, renderer, scene, camera;
          renderer = new THREE.WebGLRenderer({antialias: true});
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setClearColor(0xffffff);
          renderer.setSize(widthC, heightC);
          renderer.shadowMapEnabled = true;
          renderer.shadowMapSoft = true;
          renderCanvas.appendChild(renderer.domElement);
          renderer.setFaceCulling(THREE.CullFaceBack,THREE.FrontFaceDirectionCW);

          scene = new Physijs.Scene({fixedTimeStep: 1 / 60});
          scene.setGravity(new THREE.Vector3(0, 0, 0));
          scene.addEventListener('update', function () {
              scene.simulate(undefined, 2);
          });
          camera = new THREE.PerspectiveCamera(35, widthC / heightC, 1, 10000);
          camera.position.set(0, 0, 1000);
          camera.lookAt(scene.position);
          scene.add(camera);

          controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;
          controls.enableRotate = true;
          controls.enablePan = false;
          // Light
          var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
          dirLight1.position.set(150, 250, 150);
          scene.add(dirLight1);
          var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.65);
          dirLight2.position.set(-150, -250, -150);
          scene.add(dirLight2);
          var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.56);
          hemiLight.color.setHSL( 0.6, 1, 0.6 );
          hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
          hemiLight.position.set( 0, 0, 0 );
          scene.add(hemiLight);

          //电子
          var sphere_geometry = new THREE.SphereGeometry(3, 9, 9);
          var material = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('./static/UI/2.png') ,transparent:true,side:THREE.FrontSide});
          var shapeD = new Physijs.SphereMesh(
              sphere_geometry,
              material,
              undefined, {
                  restitution: Math.random() * 1.5
              }
          );
          //原子
          var McreateShape=function() {
              var sphere_material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('./static/UI/1.png') ,transparent:true,side:THREE.FrontSide});
              var sphere_geometry = new THREE.SphereGeometry(20, 18, 18);
              var shape = new Physijs.SphereMesh(sphere_geometry,sphere_material,0);
              return shape;
          }
          //原子振动
          var an=function (O,y,z) {
              O.position.y=y+(Math.random()-1)*thiz.STEP;
              O.position.z=z+(Math.random()-1)*thiz.STEP;
              O.__dirtyPosition=true;
              requestAnimationFrame(function () {
                  an(O,y,z);
              });
          }
          //电子振动
          var an2=function (O,i) {
              if(thiz.switch_checked){
                  return;
              }
              if(i==1){
                  O.position.x+=Math.random()*40-20;
                  O.position.y+=Math.random()*40-20;
                  O.position.z+=Math.random()*40-20;
                  if(O.position.z>90||O.position.z<-110){
                      O.position.z*=-0.3;
                  }
                  if(O.position.y>100||O.position.y<-100){
                      O.position.y*=-0.3;
                  }
                  if(!thiz.radio_checked) {
                      if (O.position.x > 140 || O.position.x < -140) {
                          O.position.x *= -0.5;
                      }
                  }else{
                      if(O.position.x*Math.tan(Math.PI/3)-250>O.position.y||O.position.x*Math.tan(Math.PI/3)+210<O.position.y){
                          O.position.x*=-0.5;
                          O.position.y*=-0.5;
                      }
                  }
                  O.__dirtyPosition=true;
              }
              i++;
              if(i==5){
                  i=1;
              }
              requestAnimationFrame(function () {
                 an2(O,i);
              });
          }
          //创建原子
          var shapeY={
              'shape0':[],
              'shape1':[],
              'shape2':[],
              'shape3':[],
              'shape4':[]
          };
          function YB() {
              var shapeB=McreateShape();
              for(var i=0;i<4;i++){
                  for(var j=0;j<3;j++){
                      for(var k=0;k<6;k++){
                          shapeY['shape'+i][j*6+k]=shapeB.clone();
                          shapeY['shape'+i][j*6+k].mass=0;
                          shapeY['shape'+i][j*6+k].position.x=-112.5+k*45;
                          shapeY['shape'+i][j*6+k].position.z=-45+j*45;
                          shapeY['shape'+i][j*6+k].position.y=-67.5+i*45;
                          if(i==1||i==3){
                              shapeY['shape'+i][j*6+k].position.x+=22.5;
                              shapeY['shape'+i][j*6+k].position.z-=22.5;
                          }
                          var y=shapeY['shape'+i][j*6+k].position.y;
                          var z=shapeY['shape'+i][j*6+k].position.z;
                          an(shapeY['shape'+i][j*6+k],y,z)
                          scene.add(shapeY['shape'+i][j*6+k]);
                      }
                  }
              }
          }
          YB();
          var DZ=[];
          var addNum=0;
          var doCreateShape2=function () {
//              if(addNum==0){
                  var shape=shapeD.clone();
                  shape.name='ddd';
                  shape.position.set(
                      -145,
                      Math.random() * 180 - 90,
                      Math.random() * 180 - 100
                  );
                  scene.add(shape);
                  shape.setLinearVelocity(new THREE.Vector3(100,0,0));
//              }else if(addNum==1){
//                  addNum=-1;
//              }
//              addNum++;
              thiz.CDSET=requestAnimationFrame(doCreateShape2);
          }
          var doCreateShape=function() {
              if(thiz.switch_checked){
                  doCreateShape2();
              }else{
                  var k=0;
                  for(var i in shapeY){
                      for(var j in shapeY[i]){
//                          for(var l=0;l<2;l++){
                              var x=shapeY[i][j].position.x+Math.random()*50-25;
                              var y=shapeY[i][j].position.y+Math.random()*50-25;
                              var z=shapeY[i][j].position.z+Math.random()*50-25;
                              DZ[k]=shapeD.clone();
                              DZ[k].name='ddd';
                              DZ[k].position.set(x,y,z);
                              an2(DZ[k],1);
                              scene.add(DZ[k]);
                              k++;
//                          }
                      }
                  }
              }
          }
          doCreateShape();
          //延展性
          var YZ=function (f,f2) {
              cancelAnimationFrame(thiz.PSET);
              var step=f?0.5:-0.5;
              f?thiz.NUM+=1:thiz.NUM-=1;
              if(thiz.NUM>45||thiz.NUM<1||f2&&thiz.NUM==2){
                  return;
              }
              for (var i=0;i<4;i++){
                  if(i==0||i==1){
                      for (var j = 0; j < 18; j++) {
                          shapeY['shape'+i][j].position.x-=step;
                          shapeY['shape'+i][j].__dirtyPosition=true;
                      }
                  }else if(i==4){
                      for (var j = 0; j < 18; j++) {
                          shapeY['shape'+i][j].position.x+=step*3;
                          shapeY['shape'+i][j].__dirtyPosition=true;
                      }
                  }else{
                      for (var j = 0; j < 18; j++) {
                          shapeY['shape'+i][j].position.x+=step;
                          shapeY['shape'+i][j].__dirtyPosition=true;
                      }
                  }
              }
              for(var i=DZ.length/4*4-1;i<DZ.length;i++){
                  DZ[i].position.x+=step*3;
                  DZ[i].__dirtyPosition=true;
              }
              for(var i=DZ.length/4*2-1;i<DZ.length/5*4;i++){
                  DZ[i].position.x+=step;
                  DZ[i].__dirtyPosition=true;
              }
              for(var i=0;i<DZ.length/4*2;i++){
                  DZ[i].position.x-=step;
                  DZ[i].__dirtyPosition=true;
              }
              if(thiz.switch_checked || f2){
                  YZ(f,f2);
              }else{
                  thiz.PSET=requestAnimationFrame(function () {
                      YZ(f);
                  });
              }
          }
          //清除移动电子
          var clearD=function () {
              for(var i in scene.children){
                  if(scene.children[i].name=='ddd'){
                      scene.remove(scene.children[i]);
                      clearD();
                      return;
                  }
              }
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
          //电极
          var Ele=new THREE.Group();
          (function () {
              var cube1 = new THREE.Mesh(new THREE.CubeGeometry(10, 300, 200),
                  new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      transparent:true,
                      opacity:0.5
                  })
              );
              cube1.position.x=-145;
              cube1.position.z=-13;
              var F=createText('-',-145,200,-6,'#000',28);
              var F1=createText('-',-145,-150,-6,'#000',28);

              var cube2 = new THREE.Mesh(new THREE.CubeGeometry(10, 300, 200),
                  new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      transparent:true,
                      opacity:0.5
                  })
              );
              cube2.position.x=170;
              cube2.position.z=-13;
              var Z=createText('+',170,200,-6,'#000',28);
              var Z1=createText('+',170,-150,-6,'#000',28);
              Ele.add(cube1,cube2,F,Z,F1,Z1);
              Ele.visible=false;
              scene.add(Ele);
          })();
          //添加删除电极
          var addE=function (f) {
              if(f){
                  Ele.visible=true;
              }else{
                  Ele.visible=false;
              }
          }

          //改变重力加速度
          var changeGravity=function(g){
              scene.setGravity(new THREE.Vector3(g, 0, 0));
          }
          var render=function() {
              if(thiz.switch_checked){
                  for(var i in scene.children){
                      if((scene.children[i].position.x>165
                              || scene.children[i].position.x<-145
                              || scene.children[i].position.y>100
                              || scene.children[i].position.y<-100
                              || scene.children[i].position.z>100
                              || scene.children[i].position.z<-100
                          ) && scene.children[i].name=='ddd'){
                          scene.remove(scene.children[i]);
                      }
                  }
              }
              controls.update();
              requestAnimationFrame(render);
              renderer.render(scene, camera);
          }
          requestAnimationFrame(render);
          scene.simulate();

          var TOOUT=function() {
              return{
                  YZ:YZ,
                  doCreateShape:doCreateShape,
                  changeGravity:changeGravity,
                  clearD:clearD,
                  addE:addE,
                  camera:camera
//                  addB:addB
              }
          }
          return TOOUT();
      },
      //重置
      resetWidget(){
          if(this.NUM!=0){
              this.TOOUT.YZ(false,true);
          }
          this.radio_checked=false;
          this.switch_checked=false;
          this.radio1=true;
          this.radio2=false;
          this.radio3=false;
          this.TOOUT.clearD();
          this.TOOUT.doCreateShape();
          this.TOOUT.camera.position.set(0, 0, 1000);
      }
    },
    mounted(){
        this.TOOUT=this.init();
        window.onresize=()=>{
            this.setSideStyle();
        }
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  input, button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  /*盒模型，padding尺寸不用再减去*/
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  /*内容区*/
  .container {
    width: calc(100% - 280px);
    float: left;
    height: 100%;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .app_aside {
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  #renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
  }

  canvas {
    position: absolute;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .btn_space {
    padding: 20px;
    width: 100%;
    height: calc(100% - 80px);
    clear: both;
    /*display: flex;*/
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }
  #radioG{
    opacity: 0;
    width:240px;
    height:108px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    display: inline-block;
  }
  #radioG .titleG{
    height: 16px;
    line-height: 16px;
    margin-top: 14px;
    text-align: center;
  }
  #radioG>div{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin-top: 18px;
  }
  #radioG>div>div{
    width: 48px;
    height: 60px;
    cursor: pointer;
  }
  #radioG>div>div>p{
    height: 16px;
    line-height: 16px;
    text-align: center;
    color:#999;
  }
  #radioG>div>div span {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 50%;
    float: left;
    transition: all 0.2s;
    margin: 8px 0 0 12px;
  }
  #radioG>div>div.checked span{
    background-color: #5caefd;
  }
  #radioG>div>div.checked p{
    color:#000;
  }
  #radioG>div>div span em {
    transition: all 0.1s 0.2s;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin: 7px auto;
  }
  #radioG>div>div.checked span em {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    display: block;
    margin: 7px auto;
  }
  #radioG.show{
    opacity: 1;
  }
</style>
