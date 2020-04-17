<template>
  <div id="app" class="noselect">
    <div id="container"></div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay" id="video" muted="muted"
           playsinline="playsinline"></video>
    <div class="btnG"> <button :class="{active: mark}" @click="change()" style="width: 80%"> 标记</button> </div>
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
        title: 'huohuaAR',
        cameraF: false,
        HeightC: 136,
        imgPlay: './static/UI/open.png',
        animationF: false,
        loadModelF: false,
        front: 1,
        WH: true,
        srcObjectF: false,
        value: 2,
        group:null,
        mark:false,
        line:null
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.loopInit()
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.init();
    },
    methods: {
      change(){
        this.mark = !this.mark;
        this.group.visible = this.mark;
        this.line.visible = this.mark;
      },
      loopInit() {
        if (!window.innerWidth || !window.innerHeight) {
          setTimeout(() => {
            this.loopInit();
          }, 200)
          return false;
        }},
      campare() {
        this.WH = window.innerWidth < window.innerHeight;
      },
      //初始化
      init() {
        console.log(navigator.userAgent);
        var maoImgArr = [];
        for (var i = 1; i < 17; i++) {
          maoImgArr[i] = new THREE.TextureLoader().load('static/glTF/' + i + '.png');
        }
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
        };
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
          navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
            for (var i = 0; i !== deviceInfos.length; ++i) {
              var deviceInfo = deviceInfos[i];
              if (deviceInfo.kind === 'videoinput') {
                if (deviceInfo.label == 'screen-capture-recorder' || deviceInfo.label == '') {
                  this.cameraF = false;
                  this.HeightC = 136;
                } else {
                  exfect.push(deviceInfo.deviceId);
                }
              }
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
          };
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
        };
        let mao = null;
        var orbitControls = null;
        var container, camera, scene, renderer, loader;
        var gltf;
        var mixer = null;
        var clock = new THREE.Clock();
        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);
        };

        var initScene = (url) => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 1000);
          camera.position.set(10, 4 , 10);
          scene.add(camera);
          var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
          hemiLight.position.set(0, 50, 0);
          scene.add(hemiLight);
          var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
          dirLight.color.setHSL(0.1, 1, 0.95);
          dirLight.position.set(-1, 1.75, 1);
          dirLight.position.multiplyScalar(30);
          scene.add(dirLight);
          dirLight.castShadow = true;
          dirLight.shadow.mapSize.width = 2048;
          dirLight.shadow.mapSize.height = 2048;
          var d = 50;
          dirLight.shadow.camera.left = -d;
          dirLight.shadow.camera.right = d;
          dirLight.shadow.camera.top = d;
          dirLight.shadow.camera.bottom = -d;
          dirLight.shadow.camera.far = 3500;
          dirLight.shadow.bias = -0.0001;
          var dirLight1 = dirLight.clone();
          dirLight1.position.set(1, -1.75, -1);
          dirLight1.intensity = 0.3;
          scene.add(dirLight1);
          // RENDERER
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
          loader = new THREE.GLTFLoader();
          loader.load(url, (data) => {
            gltf = data;
            var object = gltf.scene;
            console.log(gltf.scene)
            object.traverse((node) => {
              if (node.isMesh) {
                node.castShadow = true;

                node.traverse( (child)=> {

                  if (child.material) {

                    child.material.opacity = 1
                    if(child.name.includes('line')){
                     this.line = child;
                      this.line.visible = false
                    }
                    if(child.name.includes('shiwupao')){

                      child.material.side = 0;
                      child.material.depthWrite = false
                      console.log(child.material.opacity)
                    }
                    if(child.name.includes('waipi')){
                      child.material.side = 0;
                      child.material.depthWrite = false
                    }
                    if (child.name.includes('xianmao')) {
                      mao = child;

                      child.material.opacity = .5;

                      child.material = new THREE.MeshStandardMaterial({
                        transparent: true,
                        opacity: .5,
                        side: 0,
                        map: child.material.map,
                        depthTest: true
                      });

                    }


                  }
                });
              }
            });
            var animations = gltf.animations;
            if (animations && animations.length) {
              mixer = new THREE.AnimationMixer(object);
              for (var i = 0; i < animations.length; i++) {
                var animation = animations[i];
                var action = mixer.clipAction(animation);
                action.clampWhenFinished = true;
                action.setLoop(THREE.LoopRepeat);
              }
            }
            // object.scale.set(205, 205, 205);
            // if(url =='./static/glTF/111.gltf'){
            //   object.scale.set(105, 105, 105);
            // }else{
            //
            // }
            thiz.loadModelF = true;
            this.group = new THREE.Group();
            this.group.visible = false
            scene.add(object.children[0]);
            scene.add( this.group);
            var xbh = tools.createText('细胞核', -1, -1, 0.1, '#7d7d7d', 1000);
            xbh.scale.set(0.0004,0.0004,0.0004);
            xbh.position.set(-0.8,0.2,-2.5);
            var pg = tools.createText('泡肛', -1, -1, 0.1, '#7d7d7d', 1000);
            pg.scale.set(0.0004,0.0004,0.0004);
            pg.position.set(-4.6,0.2,-2.1);

            var bm = tools.createText('表膜', -1, -1, 0.1, '#7d7d7d', 1000);
            bm.scale.set(0.0004,0.0004,0.0004);
            bm.position.set(-5.8,0.2,-1.3);

            var ssp = tools.createText('伸缩泡', -1, -1, 0.1, '#7d7d7d', 1000);
            ssp.scale.set(0.0004,0.0004,0.0004);
            ssp.position.set(4.1,0.2,-1.9);

            var sjg = tools.createText('收集管', -1, -1, 0.1, '#7d7d7d', 1000);
            sjg.scale.set(0.0004,0.0004,0.0004);
            sjg.position.set(4.5,0.2,1.7);

            var xbz = tools.createText('细胞质', -1, -1, 0.1, '#7d7d7d', 1000);
            xbz.scale.set(0.0004,0.0004,0.0004);
            xbz.position.set(3.4,0.2,2.2);

            var xm = tools.createText('纤毛', -1, -1, 0.1, '#7d7d7d', 1000);
            xm.scale.set(0.0004,0.0004,0.0004);
            xm.position.set(1.3,0.2,2.4);

            var kg = tools.createText('口沟', -1, -1, 0.1, '#7d7d7d', 1000);
            kg.scale.set(0.0004,0.0004,0.0004);
            kg.position.set(-1.4,0.2,2.6);

              var swp = tools.createText('食物泡', -1, -1, 0.1, '#7d7d7d', 1000);
            swp.scale.set(0.0004,0.0004,0.0004);
            swp.position.set(-3.4,0.2,2.9);

            this.group.add(xbh,pg,bm,ssp ,sjg,xbz,xm,kg,swp)
            // console.log()
            // scene.remove(scene.children[4].children[1])
            // console.log(scene)
          }, undefined, function (error) {
            console.error(error);
          });
          orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
          orbitControls.zoomSpeed = 0.5;
          orbitControls.enablePan = false;
          orbitControls.minDistance = 10;
          orbitControls.maxDistance = 20;
        }

        initScene('./static/glTF/111.gltf');
        var onWindowResize = () => {
          camera.aspect = container.offsetWidth / container.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          this.campare();
        }
        video.addEventListener('canplay', () => {
          if (!this.srcObjectF) {
            this.srcObjectF = true;
          }
        }, false);
        let frame = [0, 20, 39, 57, 74, 90, 105, 119, 132, 144, 155, 165, 174, 182, 199, 205];
        let imgArr = [];
        for (let i = 0, j = 1; i <= frame[frame.length - 1]; i++) {
          if (frame.indexOf(i) > -1) {
            imgArr[i] = new THREE.TextureLoader().load(`static/glTF/caolvchong_mao.png`);
            j++;
          }
        }
        let uvArr = [];
        uvArr[0] = [new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.25), new THREE.Vector2(0, 0.25)];
        uvArr[1] = [new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.25), new THREE.Vector2(0.25, 0.25)];
        let skip = 0, maoindex = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          skip++;
          if (skip % 3 !== 0) {
            return;
          }
          renderer.clear();
          orbitControls.update();
          renderer.render(scene, camera);
          if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
            if (isMob) {
              openCamera(exfect[this.front]);
            } else {
              openCamera(exfect[0]);
            }
            this.srcObjectF = true;
          }
          if (mixer) mixer.update(clock.getDelta());
          if (skip % 9 !== 0) {
            return;
          }
          if (mao != null) {
            if (maoindex > 15) {
              maoindex = 0;
            }
            maoindex++;
            mao.material.map = maoImgArr[maoindex];//new THREE.TextureLoader().load('static/glTF/' + maoindex + '.png');
          }
        };
        animate();
        var toggleAnimations = () => {
          if (this.animationF) {
            this.imgPlay = './static/UI/open.png'
          } else {
            this.imgPlay = './static/UI/close.png'
          }
          var animations = gltf.animations;
          for (var i = 0; i < animations.length; i++) {
            var animation = animations[i];
            var action = mixer.clipAction(animation);
            if (this.animationF) {
              mixer.timeScale = -1;
            } else {
              mixer.timeScale = 1;
            }
            var time = action.time;
            action.reset();
            action.time = time;
            action.play();
          }
          this.animationF = !this.animationF;
        };
        onload();
        var changeSence = function () {
          var index = $(this).index();
          if (index == 0 && thiz.cameraF) {
            renderer.setClearColor(0xffffff, 0);
          } else if (index == 1) {
            renderer.setClearColor(0xffffff);
          } else if (index == 2) {
            renderer.setClearColor(0x000000);
          }
        };
        if (isMob) {
          $('#changeSence>div').on('touchstart', changeSence);
          $('#playAnimation').on('touchstart', toggleAnimations);
        } else {
          $('#changeSence>div').on('click', changeSence);
          $('#playAnimation').on('click', toggleAnimations);
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


