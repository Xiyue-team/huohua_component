<template>
  <div id="app" class="noselect">
    <div id="container"></div>
    <div id="loding" v-if="maker11">loading...</div>
    <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay" id="video" muted="muted" playsinline="playsinline" poster="./static/fff.png" style="  display: none;"></video>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="changeSence" :style="'height:'+HeightC+'px;'">
      <div id="camera" v-show="cameraF"><img src="static/UI/tran.png"></div>
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
      title: '鼠妇',
      cameraF: false,
      HeightC: 136,
      imgPlay: './static/UI/open.png',
      animationF: false,
      loadModelF: false,
      front: 1,
      WH: true,
      srcObjectF: false,
      maker11:true
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
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
      var container, camera, scene, renderer, loader,scene2,renderer2;
      var gltf;
      var mixer = null;
      var clock = new THREE.Clock();
      var onload = () => {
        window.addEventListener('resize', onWindowResize, false);

      };
      var initScene = (url) => {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        var al = new THREE.AmbientLight(12040119,0.4);
        scene.add(al);
        var hl = new THREE.HemisphereLight(16515062, '#000000', 1);
        scene.add(hl);

        var hl1 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        var hl2 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        hl1.position.set(70, 100, 100);
        hl2.position.set(-50, -100, -100);

        scene.add(hl1);
        scene.add(hl2);

        camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
        camera.position.set(10, 8, 10);
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

        container.appendChild(renderer.domElement);
        loader = new THREE.FBXLoader();
        loader.load( url, function ( object ) {
          thiz.loadModelF = true;
          scene.add( object );
          object.scale.set(0.4,0.4,0.4);
          setTimeout(()=>{
            thiz.maker11 = false
          },1000)
          render()
        } );


        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = 0.5;
        orbitControls.enablePan = false;
        orbitControls.minDistance = 10;
        orbitControls.maxDistance = 30;
      };
      initScene('./static/FBX/2222.fbx');
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

#changeSence>div {
  margin: 12px 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}

#changeSence>div>img {
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

#playAnimation>img {
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
  #loding{
    position: absolute;
    text-align: center;
    line-height: 100vh;
     width: 100%;
    height: 100%;
    background-color: white;
  z-index:10;
  }


</style>
