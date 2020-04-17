<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <!--<h3 v-text="title" class="app_title"></h3>-->
      <!--视图区-->
      <div id="Home" v-show="HF">
        <div id="renderCanvas" :style="'zoom:'+zoomF">
          <div id="choose1" v-show='c1' @click="yuansu(1)" :style="'left:95px;top:400px;'"></div>
          <div id="choose2" v-show='c2' @click="yuansu(2)" :style="'left:1207px;top:322px;'"></div>
          <div id="choose3" v-show='c3' @click="yuansu(3)" :style="'left:1367px;top:400px;'"></div>
          <div id="result" v-show="result!=''">
            {{result}}
          </div>
        </div>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      </div>
      <div id="backH" v-show="!HF" @click="backHome"><img src="static/UI/back.png"></div>
      <div id="Na" v-show="NaF">
        <div class="view">
          <div class="img" v-show="blue1!=''||blue2!=''" :style="'background-image:url('+src+')'"></div>
          <div class="TD" v-show="blue3!=''">
            <div @click="playPause(0)"></div>
            <div class="bg" v-show="!VF" :style="'background-image:url(./static/UI/NaCl.png)'"></div>
            <video src="static/video/Na.webm" v-show="VF" preload="true"  x5-video-player-type="h5" playsinline webkit-playsinline controls="false"></video>
          </div>
        </div>
        <div class="side">
          <h2>钠(Na)元素</h2>
          <ui-btn class="b1" :type="blue1" :width="160" :height="44" @click.native="choose(1)">基本信息</ui-btn>
          <ui-btn class="b2" :type="blue2" :width="160" :height="44" @click.native="choose(2)">原子轨道</ui-btn>
          <ui-btn class="b3" :type="blue3" :width="160" :height="44" @click.native="choose(3)">NaCl形成过程</ui-btn>
        </div>
      </div>
      <div id="N" v-show="NF">
        <div class="view">
          <div class="img" v-show="blue1!=''||blue2!=''" :style="'background-image:url('+src+')'"></div>
          <div class="TD" v-show="blue3!=''">
            <div @click="playPause(1)"></div>
            <div class="bg" v-show="!VF" :style="'background-image:url(./static/UI/N2.png)'"></div>
            <video src="static/video/N.webm" v-show="VF" preload="true" x5-video-player-type="h5" playsinline webkit-playsinline controls="false"></video>
          </div>
        </div>
        <div class="side">
          <h2>氮(N)元素</h2>
          <ui-btn class="b1" :type="blue1" :width="160" :height="44" @click.native="choose(1)">基本信息</ui-btn>
          <ui-btn class="b2" :type="blue2" :width="160" :height="44" @click.native="choose(2)">原子轨道</ui-btn>
          <ui-btn class="b3" :type="blue3" :width="160" :height="44" @click.native="choose(3)">氮气分子形成过程</ui-btn>
        </div>
      </div>
      <div id="Cl" v-show="ClF">
        <div class="view">
          <div class="img" v-show="blue1!=''||blue2!=''" :style="'background-image:url('+src+')'"></div>
          <div class="TD" v-show="blue3!=''">
            <div @click="playPause(2)"></div>
            <div class="bg" v-show="!VF" :style="'background-image:url(./static/UI/HCl.png)'"></div>
            <video src="static/video/Cl.webm" v-show="VF" preload="true" x5-video-player-type="h5" playsinline webkit-playsinline controls="false"></video>
          </div>
        </div>
        <div class="side">
          <h2>氯(Cl)元素</h2>
          <ui-btn class="b1" :type="blue1" :width="160" :height="44" @click.native="choose(1)">基本信息</ui-btn>
          <ui-btn class="b2" :type="blue2" :width="160" :height="44" @click.native="choose(2)">原子轨道</ui-btn>
          <ui-btn class="b2" :type="blue3" :width="160" :height="44" @click.native="choose(3)" :style="'padding:0;'">氯化氢分子形成过程</ui-btn>
        </div>
      </div>
      <div id="wj" v-show="NF&&blue2!==''">
        <iframe :src="NF&&blue2!=''?srcW:''" frameborder="0" class="wj"></iframe>
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
        title: '元素周期表',
        // X:0,
        // Y:0,
        // Z:0,
        yes:true,
        zoomF:1,
        TOOUT:null,
        HF:true,
        NaF:false,
        NF:false,
        ClF:false,
        blue:1,
        blue1:'blue',
        blue2:'',
        blue3:'',
        src:'',
        srcV:'',
        srcW:'./static/wj/index.html',
        chooseArr:[],
        chooseN:'',
        choosed:0,
        c1:false,
        c2:false,
        c3:false,
        result:'',
        moveF:false,
        VF:false,
        SET:null
      }
    },
    created(){
      document.title = this.title;
    },
    methods: {
      setSideStyle(){
          var W=window.innerWidth;
          var H=window.innerHeight;
          if(W/H>16/9){
              this.zoomF=H/900;
          }else{
              this.zoomF=W/1600;
          }
          var W2=window.innerWidth-200;
          var zoom=1;
          if(W2/H>760/454){
              zoom=H/454;
          }else{
              zoom=W2/760;
          }
          $('.TD').css('zoom',zoom);
      },
      backHome(){
          this.HF=true;
          this.TOOUT.render();
          this.NaF=false;
          this.NF=false;
          this.ClF=false;
          this.VF=false;
          cancelAnimationFrame(this.SET);
          $('video')[0].pause();
          $('video')[0].currentTime=0;
          $('video')[1].pause();
          $('video')[1].currentTime=0;
          $('video')[2].pause();
          $('video')[2].currentTime=0;
      },
      yuansu(num){
        this.NaF=false;
        this.NF=false;
        this.ClF=false;
        this.HF=false;
        var name='';
        if(num==1){
           this.NaF=true;
           name='Na';
        }else if(num==2){
           this.NF=true;
            name='N';
        }else if(num==3){
           this.ClF=true;
            name='Cl';
        }
        this.imgL('./static/UI/'+name+'1.png');
        this.blue=1;
        this.blue1='blue';
        this.blue2='';
        this.blue3='';
        this.srcV='';
      },
      choose(num){
          if(this.blue==num){
              return;
          }
          this.blue1='';
          this.blue2='';
          this.blue3='';
          this.blue=num;
          this['blue'+num]='blue';
          var name='';
          this.VF=false;
          cancelAnimationFrame(this.SET);
          if(this.NaF){
              name='Na';
              var vid=$('video')[0];
              if(num==1||num==2){
                  vid.pause();
                  this.imgL('./static/UI/'+name+num+'.png');
              }else if(num==3){
                  this.src='';
                  vid.currentTime=0;
                  this.videoF(vid);
              }
          }else if(this.NF){
              name='N';
              var vid=$('video')[1];
              if(num==1){
                  vid.pause();
                  this.imgL('./static/UI/'+name+num+'.png');
              }else if(num==2){
                  vid.pause();
                  this.src='';
              }else if(num==3){
                  this.src='';
                  vid.currentTime=0;
                  this.videoF(vid);
              }
          }else if(this.ClF){
              name='Cl';
              var vid=$('video')[2];
              if(num==1||num==2){
                  vid.pause();
                  this.imgL('./static/UI/'+name+num+'.png');
                  this.src='';
              }else if(num==3){
                  this.src='';
                  vid.currentTime=0;
                  this.videoF(vid);
              }
          }
      },
      videoF(vid){
        vid.currentTime=0;
        vid.play();
        var an=()=>{
            vid.play();
            var t=vid.currentTime.toFixed();
            if(t>0){
                cancelAnimationFrame(this.SET);
                this.VF=true;
                return;
            }
            this.SET=requestAnimationFrame(an);
        }
        an();
      },
      playPause(num) {
          var myVideo = $('.TD>video')[num];
          if (myVideo.paused){
              myVideo.play();
          }
          else{
              myVideo.pause();
          }
      },
      imgL(src){
        var I=new Image();
        I.src=src;
        I.onload=()=>{
            this.src=I.src;
        }
      },
      //初始化
      init(){
          //视图区鼠标事件操作相关变量
          var selectobjs=[],selectobj=null,mousedownflag;

          var renderCanvas=document.getElementById('renderCanvas');
          var widthC=1600,heightC=900,controls, renderer, scene, camera;
          renderer = new THREE.WebGLRenderer({antialias: true});
          renderer.setPixelRatio( window.devicePixelRatio>2?2:window.devicePixelRatio );
          renderer.setClearColor(0xffffff);
          renderer.setSize(widthC, heightC);
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.soft = true;
          renderCanvas.appendChild(renderer.domElement);

          scene = new Physijs.Scene({fixedTimeStep: 1 / 120});
          scene.setGravity(new THREE.Vector3(0, 0, 0));
          scene.addEventListener('update', function () {
              scene.simulate(undefined, 2);
          });
          camera = new THREE.OrthographicCamera(widthC/-1.5,widthC/1.5,heightC/1.5,heightC/-1.5,1,10000);
          camera.position.set(0,2000, 0);
          camera.lookAt(scene.position);
          scene.add(camera);

          controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;
          controls.enableRotate = false;
          controls.enableZoom = false;
          controls.enablePan = false;

          var light = new THREE.DirectionalLight(0xFFFFFF);
          light.position.set(100, 800, 150);
          light.target.position.copy(scene.position);
          light.castShadow = true;
          light.shadow.camera.left = -100;
          light.shadow.camera.top = -100;
          light.shadow.camera.right = 100;
          light.shadow.camera.bottom = 100;
          light.shadow.camera.near = 20;
          light.shadow.camera.far = 400;
          light.shadow.bias = -.0001
          light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
          scene.add(light);

          //改变重力加速度
          var changeGravity=function(x,z){
              scene.setGravity(new THREE.Vector3(x, 0, z));
              Ball.setLinearVelocity(new THREE.Vector3(x*10,0,z*10));
          }

          var createP=()=>{
              // Materials
              var ground_material = Physijs.createMaterial(
                  new THREE.MeshLambertMaterial({
                      map: THREE.ImageUtils.loadTexture('./static/UI/bg.png') ,transparent:true,side:THREE.FrontSide
                  }),
                  0,
                  0
              );
              var ground_geometry = new THREE.PlaneGeometry(2048, 1024, 100, 100);
              var ground = new Physijs.HeightfieldMesh(
                  ground_geometry,
                  ground_material,
                  0, // mass
                  100,
                  100
              );
              ground.rotation.x = Math.PI / -2;
              ground.receiveShadow = true;
              return ground
          }
          var Plane=createP();
          scene.add(Plane);

          var createP2=(src1,src2)=>{
              var ground_material1 =new THREE.MeshLambertMaterial({
                      map: THREE.ImageUtils.loadTexture(src1) ,transparent:true,depthTest:false,side:THREE.FrontSide
                  })
              var ground_material2 =new THREE.MeshLambertMaterial({
                  map: THREE.ImageUtils.loadTexture(src2) ,transparent:true,depthTest:false,side:THREE.FrontSide
              })
              var ground_geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
              var ground1 = new THREE.Mesh(ground_geometry,ground_material1,);
              var ground2 = new THREE.Mesh(ground_geometry,ground_material2,);
              ground1.rotation.x = Math.PI / -2;
              ground1.position.y=1;
              ground2.rotation.x = Math.PI / 2;
              ground2.rotation.z = Math.PI;
              ground2.position.y=-1;
              ground1.receiveShadow = true;
              ground2.receiveShadow = true;
              var GG=new THREE.Group();
              GG.add(ground1,ground2);
              var G=new THREE.Group();
              G.add(GG);
              return G;
          }

          var Pna=createP2('./static/UI/nao.png','./static/UI/na.png');
          Pna.position.set(-885.5,0,-12);
          // Pna.children[0].rotation.z=Math.PI;
          scene.add(Pna);
          var Pn=createP2('./static/UI/no.png','./static/UI/n.png');
          Pn.position.set(598,0,-118);
          // Pn.children[0].rotation.z=Math.PI;
          scene.add(Pn);
          var Pcl=createP2('./static/UI/clo.png','./static/UI/cl.png');
          Pcl.position.set(810,0,-12);
          // Pcl.children[0].rotation.z=Math.PI;
          scene.add(Pcl);
          //原子
          var McreateShape=function(src) {
              var sphere_material =Physijs.createMaterial(
                  new THREE.MeshLambertMaterial({
                      map: THREE.ImageUtils.loadTexture(src) ,
                      transparent:true,
                      side:THREE.FrontSide
                  })
              );
              var sphere_geometry = new THREE.SphereGeometry(40, 36, 36);
              var shape = new Physijs.SphereMesh(sphere_geometry,sphere_material,1);
              shape.castShadow = true;
              shape.receiveShadow = true;
              return shape;
          }
          var Ball=null;
          var createBall=()=>{
              if(this.chooseArr.length>=3){
                  return;
              }
              var Nameq;
              if(this.chooseArr.length==0){
                  Nameq=Math.ceil(Math.random()*3);
              }else if(this.chooseArr.length==1){
                  if(this.chooseArr[0]==1){
                      Nameq=Math.random()*2>1?3:2;
                  }else if(this.chooseArr[0]==2){
                      Nameq=Math.random()*2>1?3:1;
                  }else if(this.chooseArr[0]==3){
                      Nameq=Math.ceil(Math.random()*2);
                  }
              }else if(this.chooseArr.length==2){
                  if(this.chooseArr[0]+this.chooseArr[1]==3){
                      Nameq=3;
                  }else if(this.chooseArr[0]+this.chooseArr[1]==4){
                      Nameq=2;
                  }else if(this.chooseArr[0]+this.chooseArr[1]==5){
                      Nameq=1;
                  }
              }
              this.chooseArr.push(Nameq);
              this.chooseN=Nameq;
              Ball=McreateShape('./static/UI/t'+Nameq+'.png');
              Ball.position.x=100;
              Ball.position.y=40;
              Ball.position.z=-160;
              Ball.rotation.z=Math.PI/2;
              Ball.rotation.y=-Math.PI/2;
              selectobjs.push(Ball);
              scene.add(Ball);
          }
          createBall();

          var isMob=/iPad|Android/g.test(navigator.userAgent);
          var Time,TimeN,TimeF=true;
          if(isMob){
              var nowts=0,timefragment=0;
              window.addEventListener('deviceorientation', (evt)=>{
                  if(!this.HF || this.choosed==3){
                      return;
                  }
                  nowts = new Date().getTime();
                  // 控制时间片
                  if (nowts  - timefragment > 37) {
                      timefragment = nowts;
                      var beta = evt.beta,     //横向 X 轴 -180 ~ 180
                          gamma = evt.gamma;   //纵向 Y 轴 -90 ~ 90
                      if(Math.abs(beta)<1&&Math.abs(gamma)<1){
                          this.yes=true;
                      }else{
                          TimeF=true;
                          this.yes=false;
                          this.moveF=true;
                          this.result='';
                          RTIM!=null?clearTimeout(RTIM):'';
                          changeGravity(beta/180*1000,-gamma/90 *500);
                          // this.X=Ball.rotation.x;
                          // this.Y=Ball.rotation.y;
                          // this.Z=Ball.rotation.z;
                      }
                  }
              }, false);
          }else{
              this.yes=true;
              var raycaster = new THREE.Raycaster(),
                  plane = new THREE.Plane(),
                  offset = new THREE.Vector3(),
                  intersection = new THREE.Vector3(),
                  mouse = new THREE.Vector2(),
                  INTERSECTED = null;
              var  sw=$('#renderCanvas').width()*this.zoomF;
              var  sh=$('#renderCanvas').height()*this.zoomF;
              var offsetLeft = (window.innerWidth-sw)/2;
              var offsetTop = (window.innerHeight-sh)/2;
              var onDocumentMouseDown=(event)=>{
                  event.preventDefault();
                  var mouse={};
                  mouse.x = ((event.clientX - offsetLeft)/ (widthC*this.zoomF) ) * 2 - 1;
                  mouse.y = -( (event.clientY - offsetTop) / (heightC*this.zoomF) ) * 2 + 1;
                  var intersects = raycaster.intersectObjects(selectobjs);
                  if (intersects.length > 0) {
                      selectobj = intersects[0].object;
                      mousedownflag = true;
                  }
              }
              var onDocumentMouseMove=(event)=>{
                  event.preventDefault();
                  var mouse={};
                  mouse.x = ((event.clientX - offsetLeft)/ (widthC*this.zoomF) ) * 2 - 1;
                  mouse.y = -( (event.clientY - offsetTop) / (heightC*this.zoomF) ) * 2 + 1;
                  var intersects = raycaster.intersectObjects( selectobjs );
                  raycaster.setFromCamera(mouse, camera);
                  if ( intersects.length > 0 ) {
                      if ( INTERSECTED != intersects[ 0 ].object ) {
                          INTERSECTED = intersects[ 0 ].object;
                          plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                      }
                  }
                  if(mousedownflag){
                      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                          var obj = intersection.sub( offset );
                          TimeF=true;
                          this.moveF=true;
                          this.yes=false;
                          this.result='';
                          RTIM!=null?clearTimeout(RTIM):'';
                          Ball.position.x=obj.x;
                          Ball.position.z=obj.z;
                      }
                  }
              }
              var onDocumentMouseUp=(event)=>{
                  event.preventDefault();
                  mousedownflag = false;
                  selectobj = null;
                  this.yes=true;
              }
              renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
              window.addEventListener( 'mouseup', onDocumentMouseUp, false );
              window.addEventListener( 'mousemove', onDocumentMouseMove, false );

          }

         var TIM=null;
         var rotateO=(obj)=>{
             var i=0;
             var an=()=>{
                 if(i==180){
                     cancelAnimationFrame(TIM);
                     return;
                 }
                 i+=5;
                 obj.rotation.z +=Math.PI/180*5;
                 TIM=requestAnimationFrame(an);
             }
             an();
          }

          var RTIM=null;
          var render=()=>{
              if(!this.HF){
                  return;
              }
              if(this.choosed<3){
                  var bx=Ball.position.x;
                  var bz=Ball.position.z;
                  if(bx>1000){
                      Ball.position.x=1000;
                  }else if(bx<-999){
                      Ball.position.x=-999;
                  }
                  if(bz>487){
                      Ball.position.z=487;
                  }else if(bz<-382){
                      Ball.position.z=-382;
                  }
                  if(this.yes){
                      changeGravity(0,0);
                      // Ball.rotation.set(this.X,this.Y,this.Z);
                      if(TimeF){
                          Time = new Date().getTime();
                      }
                      TimeF=false;
                      TimeN = new Date().getTime();
                      if(TimeN-Time>1500){
                          if((bx>=-941 && bx<=-834 || bx>=863 && bx<=974) && bz>=-278 && bz<=466
                            ||(bx>=-834 && bx<=-728 || bx>=339 && bx<=863) && bz>=-172 && bz<=466
                            ||bx>=-728 && bx<=339 && bz>=41 && bz<=466){
                              if(bx>-915 && bx<-855 && bz>-42 && bz<18 && this.chooseN==1 && this.c1==false){
                                  scene.remove(Ball);
                                  rotateO(Pna.children[0]);
                                  this.c1=true;
                                  this.choosed++;
                                  if(this.chooseArr.length<3){
                                      createBall();
                                  }
                              }else if(bx>568 && bx<628 && bz>-148 && bz<-88 && this.chooseN==2 && this.c2==false){
                                  scene.remove(Ball);
                                  rotateO(Pn.children[0]);
                                  this.c2=true;
                                  this.choosed++;
                                  if(this.chooseArr.length<3){
                                      createBall();
                                  }
                              }else if(bx>780 && bx<840 && bz>-42 && bz<18 && this.chooseN==3 && this.c3==false){
                                  scene.remove(Ball);
                                  rotateO(Pcl.children[0]);
                                  this.c3=true;
                                  this.choosed++;
                                  if(this.chooseArr.length<3){
                                      createBall();
                                  }
                              }else{
                                  if(this.moveF){
                                      this.result='选择错误，请重试';
                                      RTIM=setTimeout(()=>{
                                          this.result='';
                                          clearTimeout(RTIM);
                                          RTIM=null;
                                      },1500);
                                  }
                              }
                              this.moveF=false;
                          }
                      }
                  }
                  Ball.__dirtyPosition=true;
              }
              controls.update();
              requestAnimationFrame(render);
              renderer.render(scene, camera);
          }
          render();
          scene.simulate();

          var resetW=()=>{
              this.result='';
              RTIM!=null?clearTimeout(RTIM):'';
              this.HF=true;
              this.NaF=false;
              this.NF=false;
              this.ClF=false;
              this.blue=1;
              this.blue1='blue';
              this.blue2='';
              this.blue3='';
              this.src='';
              this.VF=false;
              this.chooseArr=[];
              this.chooseN='';
              this.choosed=0;
              this.c1=false;
              this.c2=false;
              this.c3=false;
              Pna.children[0].rotation.z=0;
              Pn.children[0].rotation.z=0;
              Pcl.children[0].rotation.z=0;
              scene.remove(Ball);
              createBall();
          }

          var TOOUT=function() {
              return{
                  render:render,
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
        this.setSideStyle();
        this.TOOUT=this.init();
        window.back=()=>{
            this.imgL('./static/UI/N1.png');
            this.blue1='blue';
            this.blue2='';
            this.blue3='';
            this.blue=1;
        }
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
  .container>div{
    width:100%;
    height: 100%;
  }
  #Home{
    position: relative;
  }
  /*.container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position: absolute;
    top:0;
    left: 0;
    z-index: 99;
  }*/
  #renderCanvas {
    width: 1600px;
    height: 900px;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
  }
  #renderCanvas>div{
    width:80px;
    height:80px;
    position: absolute;
    background: transparent;
    cursor: pointer;
  }
  #renderCanvas>div#result{
    width: 300px;
    height:75px;
    left:0;
    right:0;
    margin: auto;
    top:210px;
    cursor: auto;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
    border-radius: 6px;
    color:#519BE0;
    text-align: center;
    line-height: 75px;
    font-size:30px;
  }
  .aside_reset {
    margin: 20px 24px;
    position: absolute;
    top:0;
    right:0;
    z-index: 999;
  }
  .side{
    width:200px;
    padding: 20px;
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }
  .side>h2{
    margin-bottom: 65px;
  }
  .side>div{
    margin-bottom:12px;
  }
  .view{
    position: relative;
    float: left;
    width:calc(100% - 200px);
    height:100%;
  }
  .view>.img{
    width: 100%;
    height: 100%;
    padding: 40px 20px 40px 40px;
    background-position: center;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: contain;
  }
  .view>.TD{
    width: 700px;
    height: 394px;
    margin: 30px;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    margin: auto;
  }
  .view>.TD>div{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    z-index: 666;
    cursor: pointer;
  }
  .view>.TD>div.bg{
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-origin: content-box;
  }
  .view>.TD>video{
    width: 100%;
    height: 100%;
    border-radius: 6px;
    position: absolute;
    top:0;
    left:0;
    border: 0 solid rgba(0,0,0,0.12);
  }
  #wj{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 999;
  }
  #wj>.wj{
    width: 100%;
    height: 100%;
  }
  #backH{
    width:40px;
    height:40px;
    position:absolute;
    top:19px;
    left:19px;
    cursor: pointer;
    z-index: 888;
  }
  #backH>img{
    width:30px;
    height:30px;
    margin: 5px 0 0 5px;
  }
  ::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  ::-webkit-media-controls-enclosure {
    overflow:hidden;
  }
  ::-webkit-media-controls-panel {
    /*width: calc(100% + 35px);*/
    display: none;
  }
</style>
