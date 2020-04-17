<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <div class="loading" :style="'height:100%;width:100%;text-align:center;'">loading...</div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" id="button1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div id="button2" class="btn" @click="addJ">
          <p>C-C-C</p>
          <div>
            <span v-for="i in 6" :class="{marginL:i!=6,bBlue:num1>i}"></span>
          </div>
        </div>
        <div id="button3" class="btn" @click="addC">
          <p>六元环</p>
          <div>
            <span v-for="i in 12" :class="{marginL:i!=6&&i!=12,marginB:i<7,bBlue:num2>i}"></span>
          </div>
        </div>
        <ui-btn id="button4" type="switch"
                :width="110"
                :height="96"
                :vertical="true"
                v-model="switch_checked1">共用碳原子</ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
//  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data(){
      return {
        title: '金刚石六元环',
        BtnSpaceStyle: 'flex',
        switch_checked1:false,
        num1:1,
        num2:1
      }
    },
    created(){
      document.title = this.title;
    },
    watch:{
        switch_checked1(){
            this.TOOUT.GT(this.switch_checked1);
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
        $('.loading').css('line-height',window.innerHeight+'px');
      },
      addJ(){
          this.TOOUT.addJ();
      },
      addC(){
        this.TOOUT.addC();
      },
      //初始化
      init(){
          var thiz=this;
          this.setSideStyle();
          var renderCanvas=document.getElementById('renderCanvas');
          var widthC=window.innerWidth,heightC=window.innerHeight;
          var  controls, renderer, scene, camera;
          renderer = new THREE.WebGLRenderer({antialias: true});
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setClearColor(0xffffff);
          renderer.setSize(widthC, heightC);
          renderCanvas.appendChild(renderer.domElement);
          renderer.setFaceCulling(THREE.CullFaceBack,THREE.FrontFaceDirectionCW);

          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(35, widthC / heightC, 1, 10000);
          camera.position.set(300, 0, 720);
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

          var render=function() {
              controls.update();
              requestAnimationFrame(render);
              renderer.render(scene, camera);
          }
          requestAnimationFrame(render);

          // 模型导入
          var model1=new THREE.Group();
          var model2=new THREE.Group();
          var model3=new THREE.Group();
          var f1=false,f2=false,f3=false;
          function modelPut(obj,mtl,O,scale,callback) {
              var onProgress = function ( xhr ) {
                  if ( xhr.lengthComputable ) {
                      var percentComplete = xhr.loaded / xhr.total * 100;
                      console.log( Math.round(percentComplete, 2) + '% downloaded' );
                  }
              };
              var onError = function ( xhr ) { };
              var mtlLoader = new THREE.MTLLoader();
              mtlLoader.setPath( 'static/obj/' );
              mtlLoader.load( mtl, function( materials ) {
                  materials.preload();
                  var objLoader = new THREE.OBJLoader();
                  objLoader.setMaterials( materials );
                  objLoader.setPath( 'static/obj/' );
                  objLoader.load( obj, function ( object ) {
                      object.traverse(function(child){
                          if(child instanceof THREE.Mesh){
                              child.material.shading=THREE.SmoothShading;
                          }
                      })
                      object.scale.x=scale;
                      object.scale.y=scale;
                      object.scale.z=scale;
                      O.add(object);
                      O.visible=false;
                      callback && callback(O);
                  }, onProgress, onError );
              });
          }
          modelPut('o1.obj','o1.mtl',model1,2.5,function (O) {
              O.position.set(0,-50,0);
              changeColor(O,'#eee');
              f1=true;
              if(f2&&f3){
                  O.visible=true;
                  model2.visible=true;
                  model3.visible=true;
                  $('.loading').hide();
              }
          });
          modelPut('o2.obj','o2.mtl',model2,2.5,function (O) {
              O.position.set(0,-50,0);
              for(var i in O.children[0].children){
                  if(i!='contains'){
                      if(O.children[0].children[i].name.indexOf('pSphere')!=-1){
                          O.children[0].children[i].material.color.set('#5CAEFD');
                      }else{
                          O.children[0].children[i].material.color.set('#eee');
                      }
                  }
              }
              f2=true;
              if(f1&&f3){
                  O.visible=true;
                  model1.visible=true;
                  model3.visible=true;
                  $('.loading').hide();
              }
          });
          modelPut('o3.obj','o3.mtl',model3,2.5,function (O) {
              O.position.set(0,-50,0);
              changeColor(O,'#5CAEFD');
              f3=true;
              if(f2&&f2){
                  O.visible=true;
                  model1.visible=true;
                  model2.visible=true;
                  $('.loading').hide();
              }
          });
          scene.add(model1,model2,model3);
          function changeColor(O,color) {
              var G=O.children[0].children;
              for(var i=0;i<G.length;i++){
                  G[i].material.color.set(color);
              }
          }
          //共用碳原子
          var GT=(f)=>{
              if(f){
                  model3.children[0].children[27].material=new THREE.MeshPhongMaterial({color:'#000'});
              }else{
                  if(this.num1==1 && this.num2==1){
                      model3.children[0].children[27].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                  }else{
                      model3.children[0].children[27].material=new THREE.MeshPhongMaterial({color:'#ff0'});
                  }
              }
          }
          var addJ=()=>{
              if(this.num1>6) return;
              var nameN;
              switch (this.num1){
                  case 1:nameN='tthhrreeee';
                      break;
                  case 2:nameN='ttwwoo';
                      break;
                  case 3:nameN='oonnee';
                      break;
                  case 4:nameN='ffoouurr';
                      break;
                  case 5:nameN='ffiivvee';
                      break;
                  case 6:nameN='ssiixx';
                      break;
              }
              for(var i in model3.children[0].children){
                  if(i!='contains'){
                      if(model3.children[0].children[i].name.indexOf(nameN)!=-1){
                          model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#ff0'});
                      }else{
                          model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                      }
                      if(i=='27'&&this.switch_checked1){
                          model3.children[0].children[27].material=new THREE.MeshPhongMaterial({color:'#000'});
                      }
                  }
              }
              this.num1++;
          }
          var addC=()=> {
              if(this.num2>12) return;
              var nameN;
              switch (this.num2){
                  case 1:nameN='nine';
                      break;
                  case 2:nameN='ten';
                      break;
                  case 3:nameN='seven';
                      break;
                  case 4:nameN='eight';
                      break;
                  case 5:nameN='eleven';
                      break;
                  case 6:nameN='twelve';
                      break;
                  case 7:nameN='three';
                      break;
                  case 8:nameN='four';
                      break;
                  case 9:nameN='one';
                      break;
                  case 10:nameN='six';
                      break;
                  case 11:nameN='two';
                      break;
                  case 12:nameN='five';
                      break;
              }
              for(var i in model3.children[0].children){
                  console.log(model3.children[0].children)
                  if(i!='contains'){
                      if(model3.children[0].children[i].name.indexOf(nameN)!=-1){
                          if(i!=24&&i!=25&&i!=26&&i!=27&&i!=28){
                              model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#f00'});
                          }else if(i!=24||i!=25||i!=26||i!=27||i!=28){
                              model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#ff0'});
                          }

                      }else{
                          model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                      }
                      if(i=='27'&&this.switch_checked1){
                          model3.children[0].children[27].material=new THREE.MeshPhongMaterial({color:'#000'});
                      }
                  }
              }
              this.num2++;
          }
          var resetW=()=>{
              this.num1=1;
              this.num2=1;
              this.switch_checked1=false;
              camera.position.set(300, 0, 720);
              for(var i in model3.children[0].children){
                  if(i!='contains'){
                     model3.children[0].children[i].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                  }
              }
          }
          var TOOUT=function() {
              return{
                  GT:GT,
                  addJ:addJ,
                  addC:addC,
                  resetW:resetW
              }
          }
          return TOOUT();
      },
      //重置
      resetWidget(){
          this.TOOUT.resetW();
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
    width: 100%;
    height: 100%;
  }

  .container h3 {
    position: absolute;
    z-index: 999;
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .app_aside {
    position: absolute;
    top:0;
    right: 0;
    width: 158px;
    background-color: transparent;
    height: 100%;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
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
    padding: 24px;
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
  .btn{
    width: 110px;
    height: 99px;
    margin-bottom: 34px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
    border-radius: 6px;
    cursor: pointer;
  }
  .btn>p{
    width: 100%;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    margin-top: 18px;
    color:#4c4c4c;
  }
  .btn-switch p{
    font-size: 16px !important;
    font-weight: normal;
  }
  .btn>div{
    width:61px;
    height: 30px;
    margin-top: 18px;
    margin-left: 25px;
  }
  .btn>div>span{
    display: inline-block;
    width:6px;
    height: 12px;
    background: #D5D5D5;
    border-radius: 2px;
    float: left;
  }
  .marginL{
    margin-right: 5px;
  }
  .marginB{
    margin-bottom: 6px;
  }
  .btn>div>span.bBlue{
    background: #5CAEFD;
  }
</style>
