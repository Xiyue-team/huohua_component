<template>
  <div id="app" class="noselect">
    <div
      id="title"
      class="title_text"
    >鸡卵的结构
    </div>
    <div class="bgw">
      <div class="btnG">
        <button
          style="width: 90px"
          @click='qiehuan(6)'
          :class="{active:index == 6}"
        >卵壳
        </button>
        <button
          style="width: 90px"
          @click='qiehuan(8)'
          :class="{active:index == 8}"

        >卵壳膜
        </button>
        <button
          style="width: 90px"



        >气室
        </button>
        <button
          style="width: 90px"


        >卵白
        </button>
        <button
          style="width: 90px"
          @click='qiehuan(1)'
          :class="{active:index == 1}"

        >系带
        </button>
        <button
          style="width: 90px"
          @click='qiehuan(0)'
          :class="{active:index == 0}"

        >卵黄膜
        </button>
        <button
          style="width: 90px"
          @click='qiehuan(3)'
          :class="{active:index == 3}"

        >卵黄
        </button>
        <button style="width: 90px" @click="qiehuan(2) " :class="{active:index == 2}">胎盘</button>
      </div>
    </div>
    <div id="container"></div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay" id="video" muted="muted"
           playsinline="playsinline"></video>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div class="bg" id="bg" :style="'background-image: url(./static/UI/1231.png);'"></div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        title: 'huohuaAR',
        cameraF: false,
        HeightC: 136,
        imgPlay: './static/UI/open.png',
        animationF: false,
        loadModelF: false,
        front: 1,
        WH: true,
        srcObjectF: false,
        object: null,
        index:null
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
      let ii = window.innerWidth / 1024
      $('.btnG').css("transform", "scale(" + ii + ")");
      this.init();
    },
    methods: {
      qiehuan(val) {
       this.index = val;
       let oc = this.object
       console.log(this.object.children[val].name)
        this.object.children.forEach((item) =>{
         if(item.isMesh){
             if(item.name == this.object.children[val].name){
               console.log(oc.children[this.index ].material.color)
               item.material.color =  oc.children[this.index ].material.color
               item.material.opacity = 1
             }else{
               item.material.color =  new THREE.Color( 0x202020 );
               item.material.opacity = 0.01
             }
         }
        })

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

          this.cameraF = false;
          this.HeightC = 136;

        }
        loadByHash();
        //开启摄像头初始化
        var ua = navigator.userAgent;
        var isMob = /iPhone|iPad|Android/i.test(ua);
        if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && this.cameraF) {
          document.getElementById('JweixinTip').style.display = 'block';
        }
        var video = document.getElementById('video');
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
        var container, camera, scene, renderer, loader, scene2, renderer2;
        var mixer = null;
        var clock = new THREE.Clock();
        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);

        };
        var initScene = (url) => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          var al = new THREE.AmbientLight(12040119, .2);

          var hl = new THREE.HemisphereLight('#000000', '#000000', .2);
          hl.position.set(0, 10, 0);


          var hl1 = new THREE.HemisphereLight('#000000', '#000000', 0.03);
          var hl2 = new THREE.HemisphereLight('#000000', '#000000', 0.03);
          hl1.position.set(0, 10, 100);
          hl2.position.set(-50, -10, -100);

          var hl3 = new THREE.PointLight('#fff', .5);
          hl3.position.set(0, -20, -10)

          var hl5 = new THREE.PointLight('#fff', .5);
          hl5.position.set(-10, 0, 0)

          var hl4 = new THREE.PointLight('#fff', 0.5);
          hl4.position.set(10, 0, 0)

          camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
          camera.add(al);
          camera.add(hl);
          camera.add(hl1);
          camera.add(hl2);
          camera.add(hl3);
          camera.add(hl4);
          camera.add(hl5);

          scene.add(camera);


          camera.position.set(0, 0, 10);
          renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
          if (this.cameraF) {
            renderer.setClearColor(0xffffff, 0);
          } else {
            renderer.setClearColor(0xffffff, 0);
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
          loader.load(url, function (object) {
            thiz.loadModelF = true;
            console.log(object);

            object.rotateZ(-Math.PI / 2);
            object.rotateY(-Math.PI / 1.3);
            // object.rotateZ(Math.PI / 10)
            object.children[8].material = new THREE.MeshPhongMaterial({
              color: object.children[8].material.color,
              transparent: true,
              opacity: 0.4,
              normalMap: new THREE.TextureLoader().load("./static/FBX/fei1_normals.bmp"),
            })
            object.scale.set(0.6, 0.6, 0.6);
            thiz.object = object;
            scene.add(thiz.object);
            render()
          });


          orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
          orbitControls.zoomSpeed = 0.5;
          orbitControls.enablePan = false;
          orbitControls.minDistance = 10;
          orbitControls.maxDistance = 30;
        };
        initScene('./static/FBX/jidan.fbx');
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
        var render = () => {
          if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
            if (isMob) {
              openCamera(exfect[this.front]);
            } else {
              openCamera(exfect[0]);
            }
            this.srcObjectF = true;
          }
          if (mixer) mixer.update(clock.getDelta());
          orbitControls.update();


          renderer.render(scene, camera);
          requestAnimationFrame(render);
        };
        onload();
        var changeSence = function () {
          var index = $(this).index();
          if (index == 0 && thiz.cameraF) {
            renderer.setClearColor(0xffffff, 0);
          } else if (index == 1) {
            renderer.setClearColor(0xffffff, 0);
          } else if (index == 2) {
            renderer.setClearColor(0xffffff, 0);
          }
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
    padding-top: 54px;
    background: transparent;
  }

  .title_text {
    font-size: 24px;
    color: #fff;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 9;
  }

  .bgw {
    position: absolute;
    top: 81px;
    height: 38px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .btnG {
    position: absolute;
    height: 38px;
    width: 830px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    z-index: 10;
    transform-origin: center;

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

  .bg {
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: top right;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.6);
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

</style>
