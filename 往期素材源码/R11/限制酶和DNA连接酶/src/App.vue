<template>
  <div id="app" class="noselect">
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
      <img :src="srcimg" alt="">
      <div id="connectBtn">连接酶</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: '限制酶和DNA连接酶',
        cameraF: false,
        HeightC: 136,
        front: 1,
        WH: true,
        srcObjectF: false,
        srcimg: 'static/UI/1.png'
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
      this.init();
    },
    methods: {
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
        };
        loadByHash();

        //开启摄像头初始化
        var ua = navigator.userAgent;
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
        if (navigator && navigator.mediaDevices) {
          navigator.mediaDevices.enumerateDevices()
            .then(function gotDevices(deviceInfos) {
              for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'videoinput') {
                  exfect.push(deviceInfo.deviceId);
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
          }
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

        var orbitControls = null, container, camera, scene, renderer, text, text1, SET = null, SET1 = null,
          SET2 = null, timer1 = null, timer2 = null, timer3 = null, model = null, model1 = null;

        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);
          render();
        };

        var initScene = () => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
          camera.position.set(0, 0, 800);
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
          orbitControls.enableDamping = true;
          orbitControls.dampingFactor = 0.25;
          orbitControls.enableZoom = true;
          orbitControls.minDistance = 600;
          orbitControls.maxDistance = 1000;
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

        //文字贴图
        text = createImg(68, 17, 'static/UI/text.png');
        text.material.opacity = 0;
        scene.add(text);

        text1 = createImg(45, 15, 'static/UI/text1.png');
        text1.material.opacity = 0;
        scene.add(text1);

        //创建模型
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
              object.scale.x = scale;
              object.scale.y = scale;
              object.scale.z = scale;
              O = object;
              callback && callback(O);
            }, onProgress, onError);
          });
        }

        modelPut('dna1.obj', 'dna1.mtl', model, 5, (O) => {
          model = O;
          if (!model == null) {
            scene.remove(model);
          }
          for (var i in model.children) {
            if (model.children[i].name.indexOf('zhaozi') != -1) {
              model.children[i].scale.set(1.2, 1.25, 1.2);
            }
          }
          start(model, 'zhaozi');
          scene.add(model);
        });
        modelPut('dna2.obj', 'dna2.mtl', model1, 5, (O1) => {
          model1 = O1;
          if (!model1 == null) {
            scene.remove(model1);
          }
          for (var i in model1.children) {
            if (model1.children[i].name.indexOf('zhaozi') != -1) {
              model1.children[i].scale.set(1.25, 1.2, 1.2);
            }
          }
          start(model1, 'zhaozi');
          scene.add(model1);
          model1.visible = false;
        });
        var start = (m, s1) => {
          for (var i in m.children) {
            if (m.children[i].name.indexOf('group1') != -1) {
              m.children[i].position.x = 20;
              m.children[i].position.y = 20;
            }
            if (m.children[i].name.indexOf('group2') != -1) {
              m.children[i].position.x = -20;
              m.children[i].position.y = -20;
            }
            if (m.children[i].name.indexOf(s1) != -1) {
              m.children[i].material = new THREE.MeshPhongMaterial({transparent: true, opacity: 0});
              m.children[i].position.x = -20;
              m.children[i].position.y = -20;
            }
            text.position.x = m.children[i].position.x - 178;
            text.position.y = m.children[i].position.y;
            text.position.z = 40;

            text1.position.x = -98;
            text1.position.y = 80;
            text1.position.z = 40;
          }
        };
        var show1 = (f) => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
          var op = 0, op1 = 0;
          if (f) {
            timer1 = setTimeout(() => {
              var showOp = () => {
                op += 0.02;
                op1 += 0.05;
                if (op >= 0.4 && op1 >= 1) {
                  cancelAnimationFrame(SET1);
                  return;
                }
                for (var i in model.children) {
                  if (model.children[i].name.includes('zhaozi')) {
                    model.children[i].material.opacity = op;
                  }
                }
                for (var i in model1.children) {
                  if (model1.children[i].name.includes('zhaozi')) {
                    model1.children[i].material.opacity = op;
                  }
                }
                text.material.opacity = op1;
                SET1 = requestAnimationFrame(showOp);
              };
              showOp();
            }, 600);

            timer2 = setTimeout(() => {
              var j = 0;
              var an = () => {
                j += 0.2;
                if (j > 20) {
                  timer3 = setTimeout(() => {
                    op = 0.4;
                    op1 = 1;
                    var hideOp = () => {
                      op -= 0.02;
                      op1 -= 0.05;
                      if (op < 0 && op1 < 0) {
                        cancelAnimationFrame(SET2);
                        op = 0;
                        op1 = 0;
                        for (var i in model.children) {
                          if (model.children[i].name.includes('zhaozi')) {
                            model.children[i].material.opacity = op;
                          }
                        }
                        for (var i in model1.children) {
                          if (model1.children[i].name.includes('zhaozi')) {
                            model1.children[i].material.opacity = op;
                          }
                        }

                        text.material.opacity = op1;

                        $('#connectBtn').css({
                          'background': '#a9a9a9',
                          'pointer-events': 'auto'
                        });

                        $('#connectBtn').text('限制酶');

                        text.position.set(-198, -20, 40);

                        return;
                      }
                      for (var i in model.children) {
                        if (model.children[i].name.includes('zhaozi')) {
                          model.children[i].material.opacity = op;
                        }
                      }
                      for (var i in model1.children) {
                        if (model1.children[i].name.includes('zhaozi')) {
                          model1.children[i].material.opacity = op;
                        }
                      }
                      text.material.opacity = op1;
                      SET2 = requestAnimationFrame(hideOp);
                    };
                    hideOp();
                  }, 600);
                  cancelAnimationFrame(SET);
                  return;
                }

                j = j.toFixed(1) * 1;
                text.position.x += 1;
                text.position.y += 1;
                for (var i in model.children) {
                  if (model.children[i].name.includes('group1')) {
                    model.children[i].position.x -= 0.2;
                    model.children[i].position.y -= 0.2;
                  }
                  if (model.children[i].name.includes('group2') || model.children[i].name.includes('zhaozi')) {
                    model.children[i].position.x += 0.2;
                    model.children[i].position.y += 0.2;
                  }
                }
                for (var i in model1.children) {
                  if (model1.children[i].name.includes('group1')) {
                    model1.children[i].position.x -= 0.2;
                    model1.children[i].position.y -= 0.2;
                  }
                  if (model1.children[i].name.includes('group2') || model1.children[i].name.includes('zhaozi')) {
                    model1.children[i].position.x += 0.2;
                    model1.children[i].position.y += 0.2;
                  }
                }
                SET = requestAnimationFrame(an);
              };
              an();
            }, 2000);
          } else {
            timer1 = setTimeout(() => {
              var showOp = () => {
                op += 0.02;
                op1 += 0.05;
                if (op >= 0.4 && op1 >= 1) {
                  cancelAnimationFrame(SET1);
                  return;
                }
                for (var i in model.children) {
                  if (model.children[i].name.indexOf('zhaozi') != -1) {
                    model.children[i].material.opacity = op;
                  }
                }
                for (var i in model1.children) {
                  if (model1.children[i].name.indexOf('zhaozi') != -1) {
                    model1.children[i].material.opacity = op;
                  }
                }
                text1.material.opacity = op1;
                SET1 = requestAnimationFrame(showOp);
              };
              showOp();
            }, 1000);

            timer2 = setTimeout(() => {
              var j = 0;
              var an = () => {
                j += 0.2;
                if (j <= 5) {
                  clearTimeout(timer3);
                  timer3 = setTimeout(() => {
                    op = 0.4;
                    op1 = 1;
                    var hideOp = () => {
                      op -= 0.01;
                      op1 -= 0.05;
                      if (op < 0 && op1 < 0) {
                        cancelAnimationFrame(SET2);
                        return;
                      }
                      for (var i in model.children) {
                        if (model.children[i].name.includes('zhaozi')) {
                          model.children[i].material.opacity = op;
                        }
                      }
                      for (var i in model1.children) {
                        if (model1.children[i].name.includes('zhaozi')) {
                          model1.children[i].material.opacity = op;
                        }
                      }
                      text1.material.opacity = op1;
                      SET2 = requestAnimationFrame(hideOp);
                    };
                    hideOp();
                  }, 100);
                }
                if (j > 20) {
                  cancelAnimationFrame(SET);
                  op = 0;
                  op1 = 0;
                  for (var i in model.children) {
                    if (model.children[i].name.includes('zhaozi')) {
                      model.children[i].material.opacity = op;
                    }
                  }
                  for (var i in model1.children) {
                    if (model1.children[i].name.includes('zhaozi')) {
                      model1.children[i].material.opacity = op;
                    }
                  }
                  $('#connectBtn').text('连接酶');
                  $('#connectBtn').css({
                    'background': '#a9a9a9',
                    'pointer-events': 'auto'
                  });
                  for (var i in model.children) {
                    if (model.children[i].name.includes('group2') || model.children[i].name.includes('zhaozi')) {
                      model.children[i].position.set(-20, -20, 0);
                    }
                  }
                  for (var i in model1.children) {
                    if (model1.children[i].name.includes('group2') || model1.children[i].name.includes('zhaozi')) {
                      model1.children[i].position.set(-20, -20, 0);
                    }
                  }
                  return;
                }
                j = j.toFixed(1) * 1;
                for (var i in model.children) {
                  if (model.children[i].name.includes('group1')) {
                    model.children[i].position.x += 0.2;
                    model.children[i].position.y += 0.2;
                  }
                  if (model.children[i].name.includes('group2')) {
                    model.children[i].position.x -= 0.2;
                    model.children[i].position.y -= 0.2;
                  }
                }
                for (var i in model1.children) {
                  if (model1.children[i].name.includes('group1')) {
                    model1.children[i].position.x += 0.2;
                    model1.children[i].position.y += 0.2;
                  }
                  if (model1.children[i].name.includes('group2')) {
                    model1.children[i].position.x -= 0.2;
                    model1.children[i].position.y -= 0.2;
                  }
                }
                SET = requestAnimationFrame(an);
              };
              an();
            }, 3000);
          }
        };
        var show2 = (f) => {
          if (f) {
            model.visible = false;
            model1.visible = true;
          } else {
            model.visible = true;
            model1.visible = false;
          }
        };

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
        let enlarge = () => {
          if (this.srcimg.includes('1')) {
            show2(true);
            this.srcimg = 'static/UI/2.png';
          } else if (this.srcimg.includes('2')) {
            show2(false);
            this.srcimg = 'static/UI/1.png';
          }
        };
        let connect = () => {
          $('#connectBtn').css({
            'background': '#6a6a6a',
            'pointer-events': 'none'
          });
          let text = $('#connectBtn').text();
          if (text === '连接酶') {
            show1(true);
          } else {
            show1(false);
          }
        };
        if (isMob) {
          $('#connectBtn').on('touchstart', connect);
          $('#switchBtn>img').on('touchstart', enlarge);
          $('#changeSence>div').on('touchstart', changeSence);
        } else {
          $('#connectBtn').on('click', connect);
          $('#changeSence>div').on('click', changeSence);
          $('#switchBtn>img').on('click', enlarge);
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
</style>
