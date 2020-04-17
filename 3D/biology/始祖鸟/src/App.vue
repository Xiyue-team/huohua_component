<template>
  <div
    id="app"
    class="noselect"
  >
    <div
      id="container"
      ref="renderCanvas"
    ></div>

    <video
      v-show="cameraF&&srcObjectF"
      :class="{videoH:WH,videoW:!WH}"
      autoplay="autoplay"
      id="video"
      muted="muted"
      poster="./static/fff.png"
      playsinline="playsinline"
    ></video>
    <div
      class="wxtip"
      id="JweixinTip"
      :style="'background-image: url(./static/UI/weixin-tip.png);'"
    ></div>
    <div
      v-show="loadModelF"
      id="changeSence"
      :style="'height:'+HeightC+'px;'"
    >
      <div
        id="camera"
        v-show="cameraF"
      ><img src="static/UI/tran.png"></div>
      <div id="white"><img src="static/UI/white.png"></div>
      <div id="black"><img src="static/UI/black.png"></div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'app',
  data() {
    return {
      title: '始祖鸟',
      cameraF: false,
      HeightC: 136,
      imgPlay: './static/UI/open.png',
      animationF: false,
      loadModelF: false,
      front: 1,
      WH: true,
      srcObjectF: false,
      pont1:null,
      pont2:null,
      pont3:null,
      pont4:null,
      line:null,
      raycaster :new THREE.Raycaster(),
      camera:null,
      selectobj:null,
      selectobjs1:[],
      width : window.innerWidth,
      height :window.innerHeight,
      left:null,
      right:null,
      orbitControls:null,
      group:null,
      mark1:false,

    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.loopInit()
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.init();
  },
  watch:{
    mark1(val){
      if(val){
        this.group.visible = true;

      }else{
        this.group.visible = false;

      }

    }
  },
  methods: {
    loopInit() {
      if (!window.innerWidth || !window.innerHeight) {
        setTimeout(() => {
          this.loopInit();
        }, 200)
        return false;
      }},
    bm(){
      console.log(1)
      this.mark1 = !this.mark1
    },
    campare() {
      this.WH = window.innerWidth < window.innerHeight;
    },
    onDocumentMouseDown(event) {
      event.preventDefault()
      let mouse = {}
      mouse.x = ((event.clientX - this.left) / this.width) * 2 - 1;
      mouse.y = -((event.clientY - this.top) / this.height) * 2 + 1;
      this.mousedownHandle(mouse);
    },
    onDocumentTouchStart(event) {
      event.preventDefault()
      let mouse = {};
      mouse.x = ((event.touches[0].pageX - this.left) / this.width) * 2 - 1;
      mouse.y = -((event.touches[0].pageY - this.top) / this.height) * 2 + 1;
      this.mousedownHandle(mouse);
    },
    mousedownHandle(mouse) {
      this.raycaster.setFromCamera(mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.selectobjs1)
      if (intersects.length > 0) {
        this.selectobj = intersects[0].object
         console.log( this.selectobj)
      }
    },
    //初始化
    init() {
      let renderCanvas = this.$refs.renderCanvas;
      this.left = renderCanvas.getBoundingClientRect().left
      this.top = renderCanvas.getBoundingClientRect().top
      this.campare();
      var thiz = this;
      var vertexShader = " varying vec2 vUv;\r\n"+
      "void main(){\r\n"+
      " vUv = uv;\r\n"+
      "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\r\n"
         //projectionMatrix * mvPosition; 最终得到MVP矩阵
       "gl_Position = projectionMatrix * mvPosition;\r\n"
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
      if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.enumerateDevices().then(function gotDevices(deviceInfos) {
          for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            "videoinput" === deviceInfo.kind && ("screen-capture-recorder" === deviceInfo.label  ? (this.cameraF = !1, this.HeightC = 136) : exfect.push(deviceInfo.deviceId))
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
          navigator.getUserMedia(constraints, function(stream) {
            video.srcObject = stream;
          }, function(err) {});
        }
      }
      var orbitControls = null;
      var container, camera, scene, renderer, loader;
      var gltf;
      var mixer = null;
      var clock = new THREE.Clock();
      this.group = new THREE.Group()
      var onload = () => {
        window.addEventListener('resize', onWindowResize, false);
        render();
      }

      var initScene = (url) => {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 200);
        this.camera.position.set(90, -10,40);
        scene.add( this.camera);
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        // hemiLight.color.setHSL( 0.6, 1, 0.6 );
        // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set(0, -100, 0);
        var hemiLight1 = hemiLight.clone()
        this.camera.add(hemiLight);
        this.camera.add(hemiLight1);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
        dirLight.color.setHSL(1, 1, 1);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
        scene.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        var d = 100;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.00;
        var dirLight1 = dirLight.clone();
        dirLight1.position.set(1, -1000, -1);
        // dirLight1.color.setHSL( 0.6, 1, 0.6);
        dirLight1.intensity = 1;
        scene.add(dirLight1)
        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
        renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown, false);
        renderer.domElement.addEventListener('touchstart', this.onDocumentTouchStart, false);
        container.appendChild(renderer.domElement);
        loader = new THREE.GLTFLoader();

        var material = new THREE.MeshLambertMaterial({
          color: "#090",
          shininess: 1,
          bumpScale: 1,
           opacity: 0.8,
          //  side :THREE.DoubleSide,
          transparent: true
        });
        
        loader.load(url, (data) => {
          gltf = data;
          var object = gltf.scene;
          object.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true;
              node.traverse(function(child) {
              child.material.side = 2
                // child.material
              if(child.name == 'yumao2'){
                 console.log(child)
              // child.material.emissiveMap = null
             
              }
               if(child.name == 'yumao1'){
                 console.log(child)
              //  child.material.emissiveMap = null
              }
             

              })
            }
          });

          // object.scale.set(15,15,15);
              object.scale.set(0.3,0.3,0.3);

          object.rotation.y = -1 * Math.PI /2;
         
          thiz.loadModelF = true;
          console.log(object)
         
          scene.add(object)
          this.orbitControls = new THREE.OrbitControls(this.camera, renderer.domElement);
          this.orbitControls.zoomSpeed = 0.5;
          this.orbitControls.enablePan = false;
          this.orbitControls.minDistance = 80;
          this.orbitControls.maxDistance = 120;
          this.orbitControls.addEventListener( 'change',  ()=>{


          

            // this.pont2.rotation.set(0,-Math.PI / 2-this.camera.rotation.x ,0)
            // this.pont3.rotation.set(Math.PI,-Math.PI / 2-this.camera.rotation.x ,Math.PI / 2)
            // this.pont4 .rotation.set(Math.PI,-Math.PI / 2-this.camera.rotation.x ,Math.PI / 2)




          } );
        }, undefined, function(error) {
          console.error(error);
        });

      }
      initScene('./static/bird/index.gltf');
      var onWindowResize = () => {
        this.camera.aspect = container.offsetWidth / container.offsetHeight;
        this.camera.updateProjectionMatrix();
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
        if (mixer) mixer.update(clock.getDelta());

        if( this.orbitControls!=null){
          this.orbitControls.update();
        }

        renderer.render(scene,  this.camera);
        requestAnimationFrame(render);
      }
      onload();
      var changeSence = function() {
        var index = $(this).index();
        if (index == 0 && thiz.cameraF) {
          renderer.setClearColor(0xffffff, 0);
        } else if (index == 1) {
          renderer.setClearColor(0xffffff);
        } else if (index == 2) {
          renderer.setClearColor(0x000000);
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
.blue {
  background-color: dodgerblue !important;
  color: white;
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
  right: 30px !important;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  z-index: 10;
  transform-origin: center;
}
</style>
