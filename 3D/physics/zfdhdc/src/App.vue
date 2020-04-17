<template>
  <div
    id="app"
    class="noselect"
  >
    <div id="container"></div>
    <div
      id="loding"
      v-if="maker11"
    >loading...</div>
    <video
      v-show="cameraF&&srcObjectF"
      :class="{videoH:WH,videoW:!WH}"
      autoplay="autoplay"
      id="video"
      muted="muted"
      poster="./static/fff.png"
      playsinline="playsinline"
      style="display: none;"
    ></video>
    <div
      class="wxtip"
      id="JweixinTip"
      :style="'background-image: url(./static/UI/weixin-tip.png);'"
    ></div>
    <div class="btnG"> <button
        :class="{active: !mark1}"
        @click="bm(1)"
        style="width: 80%"
      > 正电荷</button>
      <button
        :class="{active: mark1}"
        @click="bm(2)"
        style="width: 80%"
      > 负电荷</button>
    </div>
    <div
      v-if='nv'
      style="width:100%;height:100%;z-index:100; position: absolute;background-color:#ffffff"
    >
      <p style="position: absolute;margin:auto;top:0;bottom:0;left:0;right:0;width:5%;height:10px">loading</p>
    </div>
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
  import tools from '@/tools';
export default {
  name: 'app',
  data() {
    return {
      title: '正负电荷',
      cameraF: false,
      HeightC: 136,
      imgPlay: './static/UI/open.png',
      animationF: false,
      loadModelF: false,
      front: 1,
      ee:1,
      WH: true,
      srcObjectF: false,
      group:null,
      mark1:false,
      maker11:true,
      text:'正电荷',
      obj1:null,
      obj2:null,
      img1:null,
      img2:null,
      nv:true,
      obj3:null,
      src1:'./static/1.png',

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
  watch:{
    mark1(val){
        if(val){
          this.obj2.visible = true;
          this.obj1.visible = false;
          this.text = '负电荷'
          this.src1='./static/123.png'
          this.obj3.material.map = this.img1
        }else{
          this.obj2.visible = false;
          this.obj1.visible = true;
          this.text = '正电荷'
          this.obj3.material.map = this.img2
          this.src1='./static/1.png'
        }

    }
  },
  methods: {
    campare() {
      this.WH = window.innerWidth < window.innerHeight;
    },
    bm(e){
      if(e ==this.ee){
return
      }
      this.ee = e
       this.mark1 = !this.mark1
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
      var initScene = (url, url2) => {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        var al = new THREE.AmbientLight(12040119,0.4);
        scene.add(al);


        var hl1 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        var hl2 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        hl1.position.set(70, 100, 100);
        hl2.position.set(-50, -100, -100);

        scene.add(hl1);
        scene.add(hl2);

        camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
        camera.position.set(0,0,15);
        var hl = new THREE.HemisphereLight(16515062, '#000000', 1);
        camera.add(hl);
        scene.add(camera);
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
        this.img1 = new THREE.TextureLoader().load( "./static/FBX/fudianhe.png" );
        this.img2 = new THREE.TextureLoader().load( "./static/FBX/zhengdianhe.png" );



        container.appendChild(renderer.domElement);
        loader = new THREE.FBXLoader();
        loader.load( url, function ( object ) {
          thiz.loadModelF = true;
          thiz.obj1 = object

          scene.add( thiz.obj1);
          thiz.obj1.rotateY(Math.PI / 6)

          // thiz.obj1.children[5].material.depthTest = false
          // thiz.obj1.children[5].visible = false


          object.scale.set(0.4,0.4,0.4);
          thiz.obj3 = new THREE.Mesh(new THREE.CircleGeometry(0.35, 32 ), new THREE.MeshBasicMaterial({map:thiz.img2,depthTest:false,transparent:true}));
          scene.add(thiz.obj3)
          setTimeout(()=>{
            thiz.maker11 = false
            thiz.nv = false
          },1000)
          render()
        } );

        loader.load( url2, function ( object ) {
          thiz.loadModelF = true;
          thiz.obj2 = object
          thiz.obj2.rotateY(Math.PI / 6)
          scene.add( thiz.obj2 );
          thiz.obj2.visible = false
          object.scale.set(0.4,0.4,0.4);
          setTimeout(()=>{
            thiz.maker11 = false
          },1000)
          render()
        } );



        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = 0.5;
        orbitControls.enablePan = false;
        // orbitControls.minPolarAngle = Math.PI /2; // radians
        // orbitControls.maxPolarAngle = Math.PI /2; // radians
        orbitControls.minDistance = 10;
        orbitControls.maxDistance = 20;
      };
      initScene('./static/FBX/zhengdianhe.fbx','./static/FBX/fudianhe.fbx');

      // mark()
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

        this.obj3.rotation.set(camera.rotation._x,camera.rotation._y,camera.rotation._z)
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
#loding {
  position: absolute;
  text-align: center;
  line-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
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
.blue {
  background-color: dodgerblue !important;
  color: white;
}

.bj {
  position: absolute;
  width: 100px !important;
  border-radius: 50px !important;
  height: 50px;
  /*line-height: normal;*/
  /*padding-top:15px;*/
  z-index: 20;
  font-size: 15px;
  right: 30px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  background-color: white;
  bottom: 70px;
  text-align: center; /* 水平居中 */
}
.bj img {
  width: 100%;
  height: 100%;
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
.btnG {
  position: absolute;
  bottom: 70px;
  height: auto;
  width: 150px;
  right: 30px !important;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 10;
  transform-origin: center;
  align-items: flex-end;
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
  margin-top: 15px;
  width: 150px;
}
.active {
  background: #5caefd;
  color: #ffffff;
}
button:hover {
  cursor: pointer;
}
</style>
