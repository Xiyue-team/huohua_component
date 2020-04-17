<template>
  <div id="app" class="noselect">
    <div id="container"></div>


    <!--<div>-->
      <!--<div class="three" v-if="markB">蛋白质</div>-->
      <!--<div class="four" v-if="markB">遗传物质</div>-->
    <!--</div>-->
    <p class="font-bitbold">.</p>
    <div id="loding" v-if="maker11">loading...</div>
    <div class="btnG" style=" bottom: 130px!important;" > <button @click="pm()"
                               :class="{ blue: mark1 }"> 剖面</button> </div>
    <div class="btnG"> <button @click="bm()" v-if="mark1"
                               :class="{ blue: markB }"> 标记</button> </div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}"  poster="./static/fff.png" autoplay="autoplay" id="video" muted="muted" style="display: none;"
           playsinline="playsinline"></video>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="changeSence" :style="'height:'+HeightC+'px;'">
      <div id="camera" v-show="cameraF"><img src="static/UI/tran.png"></div>
      <div id="white"><img src="static/UI/white.png"></div>
      <div id="black"><img src="static/UI/black.png"></div>

    </div>
  </div>
</template>
<script>
  import tools from '@/tools';
  export default {
    name: 'app',
    data() {
      return {
        title: 'HIV',
        cameraF: false,
        HeightC: 136,
        imgPlay: './static/UI/open.png',
        animationF: false,
        loadModelF: false,
        front: 1,
        WH: true,
        srcObjectF: false,
        groupZ: null,
        groupF: null,
        groupT: null,
        groupM:null,
        mark1: false,
        markB:false,
        maker11:true,
        radio:0,
        renderR:true,
        obj:null,
        render:null,
        ll:null,
        ll2:null,
        llimg:new THREE.TextureLoader().load("./static/font/dbz.png"),
        llimg2:new THREE.TextureLoader().load('./static/font/ycwz.png')
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      //禁止选择
      document.onselectstart = function () {
        return false;
      };

      this.loopInit();
    },
    watch:{
      mark1(val){
       this.groupZ.visible = !val;
        this.groupF.visible = val;
        if(!val)  this.markB = false;

        this.render()

      },
      markB(val){
        this.groupT.visible = val;
        this.groupM.visible = val
        this.render()
      }
    },
    methods: {
      loopInit() {
        if (!window.innerWidth || !window.innerHeight) {
          setTimeout(() => {
            this.loopInit();
          }, 200)
          return false;
        }
       this.init();
      },
      pm(){
        this.mark1 = !this.mark1;
        this.renderR = true
        this.render()

      },
      bm(){
        this.markB = !this.markB;
        this.renderR = true
        this.render()

      },
      campare() {
        this.WH = window.innerWidth < window.innerHeight;
      },
      //初始化
      init() {
        this.campare();
        var thiz = this;
        // 获取摄像头参数
        var loadByHash = () => {
          var h = location.hash;
          // var h='#camera=true';
          if (h && h.indexOf('camera=true') > -1) {
            this.cameraF = true;
            this.HeightC = 210;
          } else {
            this.cameraF = false;
            this.HeightC = 136;
          }
        }
        loadByHash();
        //开启摄像头初始化
        var ua = navigator.userAgent;

        if(ua.indexOf('COL-AL10')!= -1 && ua.indexOf('huohua')!= -1 ){
          $('.bj').css( "padding-top","11.5px");
          $('.pm').css( "padding-top","11.5px");

        }
        var isMob = /iPhone|iPad|Android/i.test(ua);
        if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && this.cameraF) {
          document.getElementById('JweixinTip').style.display = 'block';
        }
        var video = document.getElementById('video');
        // video.style.width = document.width + 'px';
        // video.style.height = document.height + 'px';
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        var exfect = [];
        if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.enumerateDevices().then(function gotDevices(deviceInfos) {
            for (var i = 0; i !== deviceInfos.length; ++i) {
              var deviceInfo = deviceInfos[i];
              "videoinput" === deviceInfo.kind && ("screen-capture-recorder" === deviceInfo.label ? (this.cameraF = !1, this.HeightC = 136) : exfect.push(deviceInfo.deviceId))
            }
          }).catch(function errorCallback(error) {
            console.log('navigator.getUserMedia error: ', error);
          });
        }
        var openCamera = (id) => {
          var constraints = {
            audio: false,
            video: {
              deviceId: id
            }
          }
          if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
              video.srcObject = stream;
            });
          } else {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia(constraints, function (stream) {
              video.srcObject = stream;
            }, function (err) {
            });
          }
        }
        var orbitControls = null;
        var container, camera, scene, renderer, loader;
        var circle1,circle2,circle3,circle4,circle5;
        var gltf;
        var mixer = null;
        var clock = new THREE.Clock();
        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);

        };
        var initScene = (url, url2) => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          var al = new THREE.AmbientLight(12040119, 1);
          scene.add(al);


          var hl1 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
          var hl2 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
          hl1.position.set(70, 100, 100);
          hl2.position.set(-50, -100, -100);


          camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
          var hl = new THREE.PointLight('#fff',1);
          hl.position.set(0,2,0)
          scene.add(camera)
          camera.position.set(0, 0, 13);

          camera.add(hl);
          renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
          if (this.cameraF) {
            renderer.setClearColor(0xffffff, 0);
          } else {
            renderer.setClearColor(0xffffff);
          }
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.gammaInput = true;
          renderer.gammaOutput = true;
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.renderReverseSided = false;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;

          container.appendChild(renderer.domElement);
          loader = new THREE.FBXLoader();
          let loader1 = new THREE.FBXLoader();
          loader.load(url2, (object) => {

            thiz.loadModelF = true;
            this.groupZ = new THREE.Group();
            this.groupZ.add(object);
            scene.add(this.groupZ);
            setTimeout(()=>{
              thiz.maker11 = false;
              this.render()
              thiz.renderR = false;
            },1000);
            setTimeout(()=>{
              thiz.renderR = false;
              this.render()
            },3000);
        // this.groupZ.visible = false
            // object.rotateY(Math.PI / 4);
            // object.rotateX(-Math.PI / 10);
            this.render()
          });
          loader1.load(url, (object) => {
            thiz.loadModelF = true;
            this.groupF = new THREE.Group();
            this.groupF.add(object);
            // object.scale.set(0.065,0.065,0.065)
            scene.add(this.groupF);
            this.groupF.visible = false
            object.position.set(0,0,1.65)



          });


          this.obj = new THREE.OrbitControls(camera, renderer.domElement);
          this.obj.zoomSpeed = 0.5;
          this.obj.enablePan = false;
          this.obj.minDistance = 10;
          this.obj.maxDistance = 35;

        };
        initScene('./static/HIV_pomian/PM3.fbx', './static/HIV/HIV2.fbx');
        var onWindowResize = () => {
          camera.aspect = container.offsetWidth / container.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          this.campare();
        };
        video.addEventListener('canplay', () => {
          if (!this.srcObjectF) {
            this.srcObjectF = true;
          }
        }, false);
        var mark = () => {
           this.groupM = new THREE.Group();

           let VE = new THREE.Mesh( new THREE.CylinderGeometry( 0.02, 0.02, 2, 5 ), new THREE.MeshBasicMaterial( {color: 0x7d7d7d,depthTest:true} ) );
           let RNA = new THREE.Mesh( new THREE.CylinderGeometry( 0.02, 0.02, 5, 5 ), new THREE.MeshBasicMaterial( {color: 0x7d7d7d,depthTest:true} ) );
           this.groupM = new THREE.Group()
           this.groupM.add( VE, RNA);
           scene.add( this.groupM);
           this.groupM.visible = false


          VE.position.set(3.2,1.36,1.45);
          // VE.rotateY(Math.PI / 10);
          VE.rotateZ(Math.PI / 2);

          RNA.position.set(2.1,-0.975,3);
          RNA.rotateY(-Math.PI / 4);
          RNA.rotateZ(Math.PI / 2);

          circle3 = new THREE.Mesh( new THREE.CircleGeometry( 0.3, 32 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
          circle3.position.set(3,-3.1,0.2);
          circle4 = new THREE.Mesh( new THREE.CircleGeometry( 0.3, 32 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
          circle4.position.set(3.7,-10.85,1.23);

          // var textps = tools.createText('蛋白质', -1, -1, 0.1, '#7d7d7d', 1000);
          // textps.scale.set(0.0004,0.0004,0.0004);
          // textps.position.set(4.8,1.2,1.6);
          // console.log(textps)
         this.ll = new THREE.Mesh(new THREE.PlaneGeometry(10,5),new THREE.MeshBasicMaterial( { map:this.llimg,transparent:true} ))
          this.ll.position.set(4.6,1.4,1.5);
          this.ll.scale.set(0.10,0.10,0.1);
          this.ll2 = new THREE.Mesh(new THREE.PlaneGeometry(10,5),new THREE.MeshBasicMaterial( { map:this.llimg2,transparent:true} ))
          this.ll2.position.set(4.5,-1,5.0);
          this.ll2.scale.set(0.10,0.10,0.10);
          // var textye = tools.createText('遗传物质', -1, -1, 0.1, '#7d7d7d', 1000);
          // textye.scale.set(0.0003,0.0003,0.0003);
          // textye.position.set(4.2,-0.7,5.0);
          this.groupT = new THREE.Group();
          this.groupT.add(this.ll,this.ll2);
          scene.add(this.groupT);
          this.groupT.visible = false;
        };
        mark();

        this.render = () => {

          this.radio = Math.floor(Math.random() * (100 - 1)) + 1;

          if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
            if (isMob) {
              openCamera(exfect[this.front]);
            } else {
              openCamera(exfect[0]);
            }
            this.srcObjectF = true;
          }
          if (mixer) mixer.update(clock.getDelta());

          this.ll.lookAt(camera.position.x,camera.position.y,camera.position.z)
          this.ll2.lookAt(camera.position.x,camera.position.y,camera.position.z)

            renderer.render(scene, camera);



        };
        this.obj.addEventListener( 'change',  this.render );
        onload();

        var changeSence = function () {
          var index = $(this).index();
          if (index == 0 && thiz.cameraF) {
            renderer.setClearColor(0xffffff, 0);
            thiz.render()
          } else if (index == 1) {
            renderer.setClearColor(0xffffff);
            thiz.render()
          } else if (index == 2) {
            renderer.setClearColor(0x000000);
            thiz.render()
          }
          thiz.render()

        }
        if (isMob) {
          $('#changeSence>div').on('touchstart', changeSence);
        } else {
          $('#changeSence>div').on('click', changeSence);
        }
      },
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

  input,
  button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .pm {
    width:100px !important;
    height: 50px;
    border-radius: 50px !important;
    position: absolute!important;
    right:30px!important;
    z-index:20;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    bottom: 130px!important;
    text-align:center;   /* 水平居中 */
    line-height: normal;
    padding-top:15px;
    background-color: white;

  }


  .bj {
    position: absolute;
    width:100px !important;
    border-radius: 50px !important;
    height: 50px;
    z-index:20;
    right:30px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    bottom: 70px;
    text-align:center;   /* 水平居中 */
   /* 水平居中 */
    line-height: normal;
    padding-top:15px;
    background-color: white;
  }
  .blue {
    background-color: dodgerblue!important;
    color: white;
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

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
    touch-action: none;
    -ms-touch-action: none;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently not supported by any browser */
  }

  #container {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  #changeSence {
    width: 50px;
    position: absolute;
    z-index: 19;
    left: 15px;
    bottom: 0px;
    top: 0px;
    margin: auto;
  }

  #changeSence > div {
    margin: 12px 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  }

  #changeSence > div > img {
    width: 50px;
  }

  #playAnimation {
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 19;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  #playAnimation > img {
    width: 50px;
  }

  .one {
    position: absolute;
    z-index:20;
    font-size: 19px;
  }
  .two {
    position: absolute;
    z-index:20;
    font-size: 19px;
  }
  .three {
    position: absolute;
    color: white;
    background-color: #7d7d7d;
    z-index:20;
    font-size: 19px;
    opacity: 0.6;
  }
  .four {
    position: absolute;
    color: white;
    background-color: #7d7d7d;
    z-index:20;
    font-size: 19px;
    opacity: 0.6;
  }
  .five {
    position: absolute;
    z-index:20;
    font-size: 19px;
  }
  #video {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    z-index: 1;
  }

  #video.videoW {
    height: auto;
    width: 100%;
  }

  #video.videoH {
    width: auto;
    height: 100%;
  }
  #loding{
    position: absolute;
    text-align: center;
    line-height: 100vh;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index:10;
  }
  .wxtip {
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    display: none;
    background-size: 70% auto;
    background-position: top right;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.6);
  }
  @font-face
  {
    font-family: fontt;
    src: url('../static/font/SourceHanSansCN-Regular.otf')
  }

  *{
    font-family: fontt !important;
  }
  p .font-bitbold {
    position: absolute;
    font-family: 'fontt';
    visibility: hidden;
  }
  button {
    background: #ffffff;
    /* transform: scale(0.9); */
    /* border: 3 solid rgba(92, 174, 253, 1); */
    border-style: solid;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border-radius: 24px;
    padding: 12px 16px;
    font-size: 16px;
    color: #000000;
    line-height: 16px;
  }

  button:hover {
    cursor: pointer;
  }

  /*.button:active{*/
  /*background: #5CAEFD;*/
  /*color: #FFFFFF;*/
  /*}*/

  .active {
    background: #5caefd;
    color: #ffffff;
  }
  .btnG {
    position: absolute;
    bottom: 70px;
    height: 42px;
    width: 100px;
    right:30px!important;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    z-index: 10;
    transform-origin: center;

  }

</style>
