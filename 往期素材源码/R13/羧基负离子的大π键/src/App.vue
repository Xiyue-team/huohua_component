<template>
  <div id="app" class="noselect">
    <div class="landscape-tip" v-if="!isLandscape">
      <div class="landscape-content"><img src="../static/UI/tip.png" alt="">
      </div>
    </div>
    <transition name="fade">
      <div class="mobile-tip" v-if="hiddenMobTip"> 建议您在电脑或平板上打开，以获取最佳的演示效果</div>
    </transition>
    <div id="container"></div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay" id="video" muted="muted"
           playsinline="playsinline"></video>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div id="changeSence" :style="'height:'+HeightC+'px;'">
      <div id="camera" v-show="cameraF"><img src="static/UI/tran.png"></div>
      <div id="white"><img src="static/UI/white.png"></div>
      <div id="black"><img src="static/UI/black.png"></div>
    </div>
    <div id="switchBtn">
      <div style="background: #6a6a6a;" @click='btnClick(1)'>球棍模型</div>
      <div @click='btnClick(2)'>电子云</div>
      <div :style="{pointerEvents:pe,opacity:op}">离子化</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: '羧基负离子的大π键',
        cameraF: false,
        HeightC: 136,
        front: 1,
        WH: true,
        srcObjectF: false,
        pe: 'none',
        op: 0,
        isLandscape: true,
        hiddenMobTip: false,
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
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var mql = window.matchMedia("(orientation: portrait)");

        var onMatchMeidaChange = (mql) => {
          clearTimeout(this.tipTimer);
          if (mql.matches) {
            // 竖屏
            this.isLandscape = false;
          } else {
            this.isLandscape = true;
            if (window.innerWidth < 500 || window.innerHeight < 500) {
              this.hiddenMobTip = true;
              this.tipTimer = setTimeout(() => {
                this.hiddenMobTip = false;
              }, 3000)
            }
          }
        };
        onMatchMeidaChange(mql);
        mql.addListener(onMatchMeidaChange);
      } else {
      }
      this.init();
    },
    methods: {
      campare() {
        this.WH = window.innerWidth < window.innerHeight;
      },
      btnClick(v) {
        if (v == 1) {
          this.op = 0;
          this.pe = 'none';
        } else {
          this.op = 1;
          this.pe = 'auto';
        }
      },
      //初始化
      init() {
        this.campare();
        // 获取摄像头参数
          var h = location.hash;
          // var h='#camera=true';
          if (h && h.includes('camera=true')) {
            this.cameraF = true;
            this.HeightC = 210;
          } else {
            this.cameraF = false;
            this.HeightC = 136;
          }
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
        if (navigator && navigator.mediaDevices) {
          navigator.mediaDevices.enumerateDevices()
            .then(function gotDevices(deviceInfos) {
              for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'videoinput') {
                  if (deviceInfo.label == 'screen-capture-recorder') {
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
              if ("srcObject" in video) {
                video.srcObject = stream;
              } else {
                video.src = window.URL.createObjectURL(stream);
              }
            });
          } else {
            navigator.getUserMedia = navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia;
            navigator.getUserMedia(constraints, function (stream) {
              if ("srcObject" in video) {
                video.srcObject = stream;
              } else {
                video.src = window.URL.createObjectURL(stream);
              }
            }, function (err) {
            });
          }
        };

        var orbitControls = null, container, camera, scene, renderer, text, text1, timer = null, timer1 = null,
          model = null;
        var hideOp = 0.5, showOp = 0;
        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);
          render();
        };

        var initScene = () => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
          camera.position.set(600, 500, 0);
          scene.add(camera);

          var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
          // hemiLight.color.setHSL(0.6, 1, 0.6);
          // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
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
          // dirLight1.color.setHSL( 0.6, 1, 0.6);
          dirLight1.intensity = 0.4;
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

          //控制器
          orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
          orbitControls.enablePan = false;
          orbitControls.enableDamping = true;
          orbitControls.dampingFactor = 0.25;
          orbitControls.enableZoom = true;
          orbitControls.minDistance = 700;
          orbitControls.maxDistance = 1100;
        };
        initScene();

        var createImg = (w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(src),
            transparent: true,
            depthTest: false
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          return Plane;
        };


        function modelPut(obj, mtl, O, scale, callback) {
          var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
              var percentComplete = xhr.loaded / xhr.total * 100;
              console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
          };
          var onError = function (xhr) {
          };
          var mtlLoader = new THREE.MTLLoader();
          mtlLoader.setPath('static/obj/');
          mtlLoader.load(mtl, function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('static/obj/');
            objLoader.load(obj, function (object) {
              for (let i in materials.materials) {
                materials.materials[i].flatShading = THREE.SoomthShading;
              }
              object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                  if (child.material.materials) {
                    for (var i in child.material.materials) {
                      child.material.materials[i] = new THREE.MeshPhongMaterial({
                        color: child.material.materials[i].color,
                        transparent: true,
                      });
                    }
                  }
                  else {
                    child.material = new THREE.MeshPhongMaterial({
                      color: child.material.color,
                      transparent: true,
                      depthTest: false
                    });
                  }
                }
              });
              object.scale.x = scale;
              object.scale.y = scale;
              object.scale.z = scale;
              O = object;
              for (var i in O.children) {
                if (O.children[i].name.includes('red')) {
                  O.children[i].material = new THREE.MeshPhongMaterial({color: '#f00'});
                }
              }
              callback && callback(O);
            }, onProgress, onError);
          });
        }

        modelPut('suojifulizi.obj', 'suojifulizi.mtl', model, 8, (O) => {
          model = O;
          if (!model == null) {
            scene.remove(model);
          }
          for (var i in model.children) {
            if (model.children[i].name.includes('likai')) {
              model.children[i].material.transparent = true;
              model.children[i].material.opacity = 0.5;
              model.children[i].material.depthTest = false;
              model.children[i].visible = false;
            }
            if (model.children[i].name.includes('touming')) {
              model.children[i].material.transparent = true;
              model.children[i].visible = false;
            }
            if (model.children[i].name.includes('dianziyun')) {
              model.children[i].visible = false;
            }
            if (model.children[i].name.includes('qiugun')) {
              model.children[i].visible = true;
            }

            if (model.children[i].name.includes('xuxian')) {
              model.children[i].visible = false;
            }

            if (model.children[i].name.includes('chuxian')) {
              model.children[7].material[0].transparent = true;
              model.children[7].material[1].transparent = true;
              model.children[i].visible = false;
            }
          }
          scene.add(model);
        });
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
          if (camera.zoom <= 0.5) {
            camera.zoom = 0.5000001;
          } else if (camera.zoom >= 2) {
            camera.zoom = 1.99999999;
          }
          if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
            if (isMob) {
              openCamera(exfect[this.front]);
            } else {
              openCamera(exfect[0]);
            }
            this.srcObjectF = true;
          }
          orbitControls.update();
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        };
        onload();

        var choose = function () {
          $('#switchBtn>div').css('background', '#a9a9a9');
          $(this).css('background', '#6a6a6a');
          let index = $(this).index();
          if (index == 0) {
            cancelAnimationFrame(timer);
            cancelAnimationFrame(timer1);
            for (var i in model.children) {
              if (model.children[i].name.includes('qiugun')) {
                model.children[i].visible = true;
              }
              if (model.children[i].name.includes('red')) {
                model.children[i].visible = true;
              }
              if (model.children[i].name.includes('xuxian')) {
                model.children[i].visible = false;
              }
              if (model.children[i].name.includes('chuxian')) {
                model.children[i].visible = false;
              }
              if (model.children[i].name.includes('likai')) {
                model.children[i].visible = false;
              }
              if (model.children[i].name.includes('dianziyun')) {
                model.children[i].visible = false;
              }
              if (model.children[i].name.includes('touming')) {
                model.children[i].visible = false;
              }

            }
          } else if (index == 1) {
            cancelAnimationFrame(timer);
            cancelAnimationFrame(timer1);
            for (var i in model.children) {
              if (model.children[i].name.includes('dianziyun')) {
                model.children[i].visible = true;
              }
              if (model.children[i].name.includes('xuxian')) {
                model.children[i].visible = true;
              }
              if (model.children[i].name.includes('chuxian')) {
                model.children[7].material[0].transparent = true;
                model.children[7].material[1].transparent = true;
                model.children[7].material[0].opacity = 0;
                model.children[7].material[1].opacity = 0;
                model.children[7].visible = false;

              }
              if (model.children[i].name.includes('touming')) {
                model.children[i].visible = true;
                model.children[i].material.opacity = 0.5;
              }
              if (model.children[i].name.includes('likai')) {
                model.children[i].visible = true;
                model.children[i].material.opacity = 0.5;

              }
              if (model.children[i].name.includes('qiugun')) {
                model.children[i].visible = false;
              }
              if (model.children[i].name.includes('red')) {
                model.children[i].visible = false;
              }


            }
          }
          else {
            hideOp = 0.5;
            let hideAn = () => {
              if (hideOp <= 0) {
                cancelAnimationFrame(timer);
                return;
              }
              hideOp -= 0.005;
              for (var i in model.children) {
                if (model.children[i].name.includes('likai')) {
                  model.children[i].material.opacity = hideOp;
                }
              }
              timer = requestAnimationFrame(hideAn);
            };
            hideAn();
            showOp = 0;
            let showAn = () => {
              if (showOp >= 1) {
                cancelAnimationFrame(timer1);
                return;
              }
              showOp += 0.005;
              for (var i in model.children) {
                if (model.children[i].name.includes('chuxian')) {
                  model.children[7].material[0].opacity = showOp;
                  model.children[7].material[1].opacity = showOp;
                  model.children[i].visible = true;
                }
              }
              timer1 = requestAnimationFrame(showAn);
            };
            showAn();

          }
        }
        var thiz = this;
        function changeSence() {
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
          $(' #switchBtn > div').on('touchstart', choose);
          $('#changeSence>div').on('touchstart', changeSence);
        } else {
          $('#switchBtn > div').on('click', choose);
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

  input, button {
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

  html, body, #app {
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  .landscape-tip {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .landscape-content {
    width: 80%;
    padding: 32px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
    border-radius: 12px;
  }

  .landscape-content img {
    width: 100%;
    height: auto;
  }

  .mobile-tip {
    position: fixed;
    left: 0;
    top: 24px;
    right: 0;
    margin: 0 auto;
    width: 80%;
    padding: 0 24px;
    line-height: 48px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
    border-radius: 100px;
    z-index: 100;
    text-align: center;
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

  #switchBtn {
    width: 82px;
    position: absolute;
    z-index: 19;
    right: 15px;
    bottom: 10px;
  }

  #switchBtn > div {
    color: #fff;
    width: 80px;
    height: 34px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
    background: #a9a9a9;
    border: 2px solid #c5c5c5;
    border-radius: 6px;
    cursor: pointer;
    margin: 12px 0;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.8);
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

  #switchBtn img {
    width: 72px;
    height: 72px;
    margin-left: 4px;
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

  {
    transform: translateY(-30px);
    opacity: 0;
  }
</style>
