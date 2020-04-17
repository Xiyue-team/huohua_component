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

    <div class="btnG"> <button @click="bm()"
                               :class="{ blue: mark1 }"> 标记</button> </div>
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
      title: '卵细胞',
      cameraF: false,
      HeightC: 136,
      imgPlay: './static/UI/open.png',
      animationF: false,
      loadModelF: false,
      front: 1,
      WH: true,
      srcObjectF: false,
      group:null,
      mark1:false,
      maker11:true,
      line:null,
      obj7:null,
      obj8:null,
      obj9:null,
      obj10:null,
      obj12:null,
      TO:null
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.loopInit();
    //禁止选择
    document.onselectstart = function() {
      return false;
    };

    this.TO = this.init();
  },
  watch:{

    // mark1(val){
    //     if(val){
    //       this.group.visible = true;
    //       this.line.visible = true;
    //     }else{
    //       this.group.visible = false;
    //       this.line.visible = false;
    //     }
    //
    // }
  },
  methods: {
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
    bm(){
      this.TO.visible()
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
      // console.log(ua.indexOf('partner_huohua_player'))

      if(ua.indexOf('COL-AL10')!= -1 && ua.indexOf('huohua')!= -1 ){
        $('.bj').css( "padding-top","11.5px");

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
      var ob = null;
      var container, camera, scene, renderer, loader;
      var gltf;
      let obj7 ;
      let obj8 ;
      let obj9 ;
      let obj10 ;
      let obj12 ;
      let obj2 ;
      var mixer = null;
      var clock = new THREE.Clock();
      var onload = () => {
        window.addEventListener('resize', onWindowResize, false);

      };
      var initScene = (url) => {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
        var al = new THREE.AmbientLight(12040119,0.3);
        camera.add(al);
        var hl = new THREE.HemisphereLight(16515062, '#000000', 0.8);
        camera.add(hl);

        var hl1 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        var hl2 = new THREE.HemisphereLight('#37DEEF', '#EFC537', 0.23);
        hl1.position.set(70, 100, 100);
        hl2.position.set(-50, -100, -100);

        camera.add(hl1);
        camera.add(hl2);


        camera.position.set(0,0,15);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        scene.add(camera)
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
        renderer.sortObjects = false;

        container.appendChild(renderer.domElement);
        loader = new THREE.FBXLoader();
        loader.load( url, function ( object ) {
          thiz.loadModelF = true;
          console.log(object)
          object.children[3].material.depthWrite = false;
           object.children[3].material.opacity =0.6;


          let wp  =  new THREE.TextureLoader().load("./static/FBX/gao.bmp")
          let zj = new THREE.TextureLoader().load("./static/FBX/di.bmp")

          obj7  =  object.children[6];
          obj8   =  object.children[7];
          obj9  =  object.children[8];
          obj10  =  object.children[9];
           obj12  =  object.children[10];
           obj2  =  object.children[5];
           obj7.material = new THREE.MeshLambertMaterial({color:obj2.material.color})
          obj8.material = new THREE.MeshLambertMaterial({color:obj2.material.color})
          obj9.material = new THREE.MeshLambertMaterial({color:obj2.material.color})
          obj10.material = new THREE.MeshLambertMaterial({color:obj2.material.color})
          obj12.material = new THREE.MeshLambertMaterial({color:obj2.material.color})
          obj7.visible = false,obj8.visible = false,obj9.visible = false,obj10.visible = false,obj12.visible = false,obj2.visible = false

          obj7.geometry.computeBoundingBox();
          obj7.geometry.center();
          //
          obj8.geometry.computeBoundingBox();
          obj8.geometry.center();
          //
          obj9.geometry.computeBoundingBox();
          obj9.geometry.center();
          //
          obj10.geometry.computeBoundingBox();
          obj10.geometry.center();
          //
          obj12.geometry.computeBoundingBox();
          obj12.geometry.center();

          obj7.position.x = 13;
          obj7.position.y = 9;

          obj8.position.x = 13;
          obj8.position.y = 7;

          obj10.position.x = 13;
          obj10.position.y = 0;

          obj9.position.x = 13;
          obj9.position.y = -4;

          obj12.position.x = 13;
          obj12.position.y = -6.5;
          scene.add( object);
          // object.remove( obj7)
          // // scene.add( obj7)
          object.scale.set(0.3,0.3,0.3);


          render()
        } );
        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = 0.5;
        orbitControls.enablePan = false;
        // orbitControls.maxAzimuthAngle =Math.PI ;
        // orbitControls.minAzimuthAngle =Math.PI ;
        orbitControls.minDistance = 10;
        orbitControls.maxDistance = 25;
        orbitControls.addEventListener( 'change',  ()=>{



              obj7.lookAt(camera.position) ,obj8.lookAt(camera.position),obj9.lookAt(camera.position),obj10.lookAt(camera.position),obj12.lookAt(camera.position)



        } );
      };
      initScene('./static/FBX/luanzi.fbx ');
     var bm =() =>{
        this.mark1 = !this.mark1
        obj7.visible = this.mark1,obj8.visible = this.mark1,obj9.visible = this.mark1,obj10.visible = this.mark1,obj12.visible = this.mark1,obj2.visible = this.mark1
      }
      var mark =()=>{


        setTimeout(()=>{
          thiz.maker11 = false
        },1000)



      }
      mark();
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
      var TO = function() {
        return {
          visible: bm,
        }
      }
      return TO();
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
  line-height: normal;
  padding-top: 15px;
  z-index: 20;
  right: 30px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  background-color: white;
  bottom: 70px;
  text-align: center;
  font-size: 16px; /* 水平居中 */
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
