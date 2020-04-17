<template>
  <div
    id="app"
    class="noselect"
  >
    <div
      id="container"
      ref="renderCanvas"
    ></div>

    <div
      class="rightBtn"
      id='rBtnG'
    > <button
        style="width: 70px;height:70px;margin-top: 10px;"
        @click="bmj()"
        :class="{ active: mark2 }"
      > 地球表面积</button>
      <button
        @click="bm()"
        style="width: 70px;height:70px;"
        :class="{ active: mark1, ing:mark1!=mark4 }"
      > 赤道周长</button>
      <button
        style="width: 70px;height:70px;"
        @click="bj()"
        :class="{ active: mark3 }"
      > 地球半径</button>
    </div>

    <div
      class="image"
      id="imageB"
      v-show="mark3"
    >

    </div>
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
      <div id="black"><img src="static/UI/black.png"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      title: '地球大小',
      cameraF: false,
      HeightC: 136,
      imgPlay: './static/list.png',
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
      mark2:false,
      mark3:false,
      mark4:false,
      color1:null,
      To:null

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
    this.To = this.init();
  },
  watch:{
    // mark1(val){
    //   if(val){
    //     this.group.visible = true;
    //
    //   }else{
    //     this.group.visible = false;
    //
    //   }
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
    bm(){
     if( this.mark1 ==this.mark4){
       if(this.mark1==true){

         this.mark1=false;
         this.mark4=false;
         this.To.bj()
         this.To.bm()
       }else{
         this.To.play();
         this.mark1 = true
       }

     }else{
       return
     }

    },
    bmj(){
      this.mark2 = !this.mark2
      this.To.bmj()
    },
    bj(){
      this.mark3 = !this.mark3
      this.To.bj()
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
      const he = window.innerHeight;

      const e = ua.indexOf('MON-W19')
      const hx = ua.indexOf('HITV300C')
      // const h = document.getElementById('left').clientHeight
      // document.getElementById('left').style.width = h * 16 / 9 + 'px'
      // console.log(h)
      if (he < 801) {
        document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.8)';
        document.getElementById('imageB').style.transform = ' scale(1)';

      }
      if (he < 511) {
        document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.6)';
        // document.getElementById('imageB').style.transform = ' scale(0.4)';

      }
      if (he < 453) {
        document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';
        // document.getElementById('imageB').style.transform = ' scale(0.4)';

      }
      if (he < 361) {
        document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';
        // document.getElementById('imageB').style.transform = ' scale(0.4)';

      }

      if (e > 0 || hx > 0) {
        document.getElementById('rBtnG').style.transform = 'translateY(15%) scale(0.5)';
        // document.getElementById('imageB').style.transform = ' scale(0.4)';

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
      var container, camera, scene, renderer, loader;
      var gltf;
      var mixer = null;
      var clock = new THREE.Clock();
      this.group = new THREE.Group();
      let obT1 = null;
      let obT2 = null;
      let obT3 = null;
      let obT4 = null;
      let obT5 = null;
      let obj4 = null;
      let obj5 = null;
      var action;
      var onload = () => {
        window.addEventListener('resize', onWindowResize, false);
        render();
      };

      var initScene = (url) => {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        let standard = (window.innerWidth) / 200 * 2.5;
        this.camera = new THREE.OrthographicCamera(window.innerWidth/-standard,window.innerWidth/standard,window.innerHeight/standard,window.innerHeight/-standard,1,1000);
        this.camera.position.set(0, 0, 500);
        scene.add( this.camera);
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set(100, -100, 100);
        // var hemiLight1 = hemiLight.clone()
        scene.add(hemiLight);
        // scene.add(hemiLight1);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.color.setHSL(1, 1, 1);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        if (this.cameraF) {
          renderer.setClearColor(0x000, 0);
        } else {
          renderer.setClearColor(0x000);
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


              })
            }
          });

          object.scale.set(0.5,0.5,0.5);
          // object.rotation.y = -3 * Math.PI /2;
          // object.position.y = -0.2;
          thiz.loadModelF = true;
          console.log(object)
          scene.add(object);
          var animations = gltf.animations;
          if (animations && animations.length) {
            mixer = new THREE.AnimationMixer(object);
            for (var i = 0; i < animations.length; i++) {
              var animation = animations[i];
              action = mixer.clipAction(animation);
              action.clampWhenFinished = true;
              action.setLoop(THREE.LoopRepeat);

            }
          }

          object.children[2].visible = false;
          object.children[7].visible = false;
          obj5 =   object.children[7]
          obT1 = object.children[10].children[0];
          obT2 = object.children[10].children[1];
          obT3 = object.children[10].children[2];
          obT4 = object.children[10].children[3];
          obT5 = object.children[0].children[0];
          obj4 =  object.children[2];
          this.color1 = obj4.children[0].children[1].material.color

          obT1.visible = false
          obT2.visible = false
          obT3.visible = false
          obT4.visible = false
          obT5.visible = false
          obT1.geometry.computeBoundingBox();
          obT1.geometry.center();
          obT1.position.set(0,55,0)
          //
          obT2.geometry.computeBoundingBox();
          obT2.geometry.center();
          obT2.position.set(70 / 1.414,58 / 1.414,0)
          // //
          obT5.geometry.computeBoundingBox();
          obT5.geometry.center();
          obT5.position.set(70 ,0,0)

          // //
          obT3.geometry.computeBoundingBox();
          obT3.geometry.center();
          obT3.position.set(-70 ,0,0)

          obT4.geometry.computeBoundingBox();
          obT4.geometry.center();
          obT4.position.set(70 / 1.414,-58 / 1.414,0)
          // //
          // obj12.geometry.computeBoundingBox();
          // obj12.geometry.center();
          this.orbitControls = new THREE.OrbitControls(this.camera, renderer.domElement);
          this.orbitControls.zoomSpeed = 0.5;
          this.orbitControls.enablePan = false;
          // this.orbitControls.minDistance = 30;
          // this.orbitControls.maxDistance = 30;
          this.orbitControls.enableZoom = false
          this.orbitControls.addEventListener( 'change',  ()=>{







          } );
        }, undefined, function(error) {
          console.error(error);
        });

      }
      initScene('./static/gltf/earth_measure_01.gltf');
      var play =()=>{
        if(this.mark1){

        }else {
          action.play();
          obT5.visible = true

        }

      };
      var bmj=()=>{
        obT4.visible = this.mark2
        obj4.visible = this.mark2
     
        if( this.mark2){
          obj4.children[0].children[1].material.color = new THREE.Color( 0x00ffff );
                
        }else{
          obj4.children[0].children[1].material.color = this.color1
    
        }

      };
      var bj=()=>{
        obT1.visible = this.mark3
        obT2.visible = this.mark3
        obT5.visible = this.mark3
        // obT3.visible = false
      
        // if(!this.mark3){
        //   obT3.visible = this.mark3
        //
        //
        // }
      };
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

       if(obT1!=null){
         obT1.lookAt( this.camera.position);
         obT2.lookAt( this.camera.position);
         obT3.lookAt( this.camera.position);
         obT4.lookAt( this.camera.position);
         obT5.lookAt( this.camera.position);
       }

        if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
          if (isMob) {
            openCamera(exfect[this.front]);
          } else {
            openCamera(exfect[0]);
          }
          this.srcObjectF = true;

        }
        if (mixer) {
          // mixer.update(clock.getDelta());
          if(mixer.time && mixer.time>=5.96){

            clock = null
            clock = new THREE.Clock();
            console.log(mixer.time);
            this.mark4 = true;
            mixer.time = 0;
            obT3.visible = true;
            obj5.visible = true

          }else{

            if(this.mark1!=this.mark4){
              obj5.visible = false
              mixer.update(clock.getDelta());
            // console.log(  obT5.rotation.x)
            //   console.log( - mixer.time * Math.PI / 3,11)
            //   obT5.rotation.x = - mixer.time * Math.PI / 3
              obT5.visible = this.mark1
              obT5.lookAt( this.camera.position);
            }


          }



        }

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
          renderer.setClearColor(0x000000, 0);
        } else if (index == 1) {
          renderer.setClearColor(0x000000);
        } else if (index == 2) {
          renderer.setClearColor(0x000000);
        }
      }
      var bm = ()=>{
          obj5.visible = false
          obT3.visible = false
      }
      if (isMob) {
        $('#changeSence>div').on('touchstart', changeSence);
      } else {
        $('#changeSence>div').on('click', changeSence);
      }
      var TO = function() {
        return {
          play: play,
          bmj:bmj,
          bj:bj,
          bm:bm
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
  background-color: #000;
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

canvas {
  /*background-color: black;*/
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
  background: #000;
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
.rightBtn {
  width: 100px;
  height: 300px;
  position: absolute;
  right: 20px;
  bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
}
button {
  background: #ffffff;
  /* transform: scale(0.9); */
  /* border: 3 solid rgba(92, 174, 253, 1); */
  border-style: solid;
  text-shadow: 0 0.5px 0 #7d7d7d;
  border-width: 3px;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 2px 2px 2px #7d7d7d;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 16px;
  color: #8c96a0;
  text-shadow: 0.5px 0.5px 0.5px #fff;
  border: 1px solid #dce1e6;
  box-shadow: 0.5px 0.5px 0.5px #fff inset, 0 0 0 #a8abae inset;
  background: #ffffff;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
  /* background: #ffffff;
  border: 0px solid #fff; */
}

/*.button:active{*/
/*background: #5CAEFD;*/
/*color: #FFFFFF;*/
/*}*/

.active {
  background: #5caefd;
  color: #ffffff;
  text-shadow: 0 0.1px 0 #7d7d7d;
}

.ing {
  background: #7d7d7d;
  color: #ffffff;
  text-shadow: 0 0.1px 0 #7d7d7d;
}
.image {
  position: absolute;
  width: 45vh;
  height: 22.5vh;
  bottom: 10px;
  margin-top: auto;
  margin-bottom: auto;
  left: 10px;
  z-index: 10;
}
.image img {
  width: 100%;
  height: 100%;
}
</style>
