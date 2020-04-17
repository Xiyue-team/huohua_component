<template>
  <div id="app" class="noselect">
    <div id="container"></div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay" id="video" muted="muted"
           playsinline="playsinline"></video>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="changeSence" :style="'height:'+HeightC+'px;'">
      <div id="camera" v-show="cameraF"><img src="static/UI/tran.png"></div>
      <div id="white"><img src="static/UI/white.png"></div>
      <div id="black"><img src="static/UI/black.png"></div>
    </div>
    <div v-show="loadModelF" id="switchBtn" :style="'height:'+HeightS+'px;'">
      <div style="background: #6a6a6a;">全景</div>
      <div>突触 </div>
      <div>细胞体</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: '神经元',
        cameraF: false,
        HeightC: 136,
        HeightS: 140,
        loadModelF: false,
        front: 1,
        WH: true,
        srcObjectF: false,
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
        var Ball1, Ball2,Ball3;
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

        var orbitControls = null;
        var container, camera, scene, renderer, loader;
        var gltf,group=new THREE.Group(),model=new THREE.Group(),Model=new THREE.Group(),M;
        var PO=[[0.09*5,-0.16*5,0.2*5]];
        var SC=[1,13,2.5];

        var onload = () => {
          window.addEventListener('resize', onWindowResize, false);
          render();
        }

        var initScene = (url) => {
          container = document.getElementById('container');
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
          camera.position.set(0,0,-10);
          camera.lookAt(0,0,0);
          scene.add(camera);

          scene.add(new THREE.AmbientLight( 0xf0f0f0 ));

          var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
          // hemiLight.color.setHSL(0.6, 1, 0.6);
          // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
          hemiLight.position.set(0, 50, 0);
          scene.add(hemiLight);

          var dirLight = new THREE.DirectionalLight(0xffffff, 1);
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
          dirLight1.intensity = 1;
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
             gltf.scene.traverse(function(child){
              if(child.isMesh){
                var Mt=child.material;
                var test;
                if(child.material.name=='shenjingyuan_waipi'){
                    test=false;
                }else{
                    test=true;
                }
                child.material=new THREE.MeshPhysicalMaterial({
                  color:Mt.color,
                  transparent:Mt.transparent,
                  opacity:Mt.opacity,
                  side:THREE.FrontSide,
                  map:Mt.map,
                  depthTest:test
                } );
              }
            });
            M = gltf.scene.children;
            PO[1]=[-M[1].position.x*5,-M[1].position.y*5,-M[1].position.z*5];
            PO[2]=[-M[0].position.x*5,-M[0].position.y*5,-M[0].position.z*5];
            group.add(M[0],M[1],M[2]);
            group.scale.set(5,5,5);
            group.position.set(0.09*5,-0.16*5,0.2*5);
            model.add(group);
            model.rotation.x=Math.PI/5;
            model.rotation.y=-Math.PI/36;
            Model.add(model);
            scene.add(Model);
            thiz.loadModelF = true;
          }, undefined, function (error) {
            console.error(error);
          });
          orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
          orbitControls.zoomSpeed = 0.5;
          orbitControls.enableRotate=false;
          orbitControls.enablePan = false;
          orbitControls.minDistance =5;
          orbitControls.maxDistance = 15;
        }
        initScene('./static/glTF/shenjingyuan.gltf');
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

        var render = () => {
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
          function rotateAroundWorldAxis(object, axis, radians) {
              var rotWorldMatrix = new THREE.Matrix4();
              rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
              rotWorldMatrix.multiply(object.matrix);
              object.matrix = rotWorldMatrix;
              object.rotation.setFromRotationMatrix(object.matrix);
          }
          var prepos = {};
          var docMouseDown = function(event) {
              event.preventDefault();
              prepos.x = event.clientX;
              prepos.y = event.clientY;
              renderer.domElement.addEventListener('mousemove', docMouseMove, false);
              document.addEventListener('mouseup', docMouseUp, false);
          };
          var docMouseMove = function(event) {
              event.preventDefault();
              let pos = {};
              pos.x = event.clientX;
              pos.y = event.clientY;
              let x, y;
              x = pos.x - prepos.x;
              y = pos.y - prepos.y;
              if (Math.abs(x) > Math.abs(y)) {
                  rotateAroundWorldAxis(Model,new THREE.Vector3(0,1,0),x / 200);
              } else {
                  rotateAroundWorldAxis(Model,new THREE.Vector3(-1,0,0),y / 200);
              }
              prepos.x = pos.x;
              prepos.y = pos.y;
          }
          var docMouseUp = function(event) {
              event.preventDefault();
              renderer.domElement.removeEventListener('mousemove', docMouseMove);
              renderer.domElement.removeEventListener('mousemup', docMouseUp);
          }
          var docTouchStart = function(event) {
              let num = event.touches;
              if(num.length>1){
                  return;
              }
              event.preventDefault();
              prepos.x = event.touches[0].pageX;
              prepos.y = event.touches[0].pageY;
              renderer.domElement.addEventListener('touchmove', docTouchMove, false);
              renderer.domElement.addEventListener('touchend', docTouchEnd, false);
          }
          var x1=0;
          var y1=0;
          var docTouchMove = function(event) {
              event.preventDefault();
              let num = event.touches;
              if(num.length>1){
                  return;
              }
              let pos = {};
              pos.x = event.touches[0].pageX;
              pos.y = event.touches[0].pageY;
              let x, y;
              x = pos.x - prepos.x;
              y = pos.y - prepos.y;
              if (Math.abs(x) > Math.abs(y)) {
                  rotateAroundWorldAxis(Model,new THREE.Vector3(0,1,0),x / 200);
              } else {
                  rotateAroundWorldAxis(Model,new THREE.Vector3(-1,0,0),y / 200);
              }
              prepos.x = pos.x;
              prepos.y = pos.y;
          }
          var docTouchEnd = function(event) {
              renderer.domElement.removeEventListener('touchmove', docTouchMove);
              renderer.domElement.removeEventListener('touchend', docTouchEnd);
          }
          renderer.domElement.addEventListener('mousedown', docMouseDown, false);
          renderer.domElement.addEventListener('touchstart', docTouchStart, false);

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

        var isMobQQ = ua.includes('HUAWEIM2') || ua.includes('HUAWEI M2');
        var NUM=40;
        if(isMobQQ){
            NUM=20;
        }

        var SET=null;
        var An=(type)=>{
            if(SET!=null){
                cancelAnimationFrame(SET);
            }
            var scale0=model.scale.x;
            var scale=SC[type];
            var P0=group.position;
            var x0=P0.x;
            var y0=P0.y;
            var z0=P0.z;
            var x=PO[type][0];
            var y=PO[type][1];
            var z=PO[type][2];
            var xstep=(x-x0)/NUM;
            var ystep=(y-y0)/NUM;
            var zstep=(z-z0)/NUM;
            var i=0;
            var scaleStep=(scale-scale0)/NUM;
            var an=()=>{
                i++;
                if(i>NUM){
                    cancelAnimationFrame(SET);
                    return;
                }
                x0+=xstep;
                y0+=ystep;
                z0+=zstep;
                scale0+=scaleStep;
                group.position.set(x0,y0,z0);
                model.scale.set(scale0,scale0,scale0);
                SET=requestAnimationFrame(an);
            }
            an();
        }

        var chooseN=0;
        var choose = function (){
            var index=$(this).index();
            if(chooseN==index){
                return;
            }
            chooseN=index;
            $('#switchBtn>div').css('background','#a9a9a9');
            $(this).css('background','#6a6a6a');
            An(index);
        };
        if (isMob) {
          $('#switchBtn>div').on('touchstart', choose);
          $('#changeSence>div').on('touchstart', changeSence);
        } else {
          $('#switchBtn>div').on('click', choose);
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
    bottom: 15px;
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

  .center {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }
</style>
