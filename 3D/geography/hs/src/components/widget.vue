<template>
  <div class="container">
    <div
      class="m"
      id='lw'
    >
      <img src="static/image/111.png">
    </div>
    <div
      class="renderCanvas-container"
      v-show='bb'
    >
      <canvas
        id="renderCanvas"
        touch-action="none"
        width="1920"
        height="1080"
        tabindex="1"
        style="opacity: 1;"
      ></canvas>
      <video
        v-show="cameraF&&srcObjectF"
        :class="{videoH:WH,videoW:!WH}"
        autoplay="autoplay"
        id="video"
        muted="muted"
        playsinline="playsinline"
      ></video>
    </div>
    <div
      id="notSupported"
      class="hidden"
    >loading...</div>
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
      <!-- <div id="white"><img src="static/UI/white.png"></div>
      <div id="black"><img src="static/UI/black.png"></div> -->
    </div>

    <div
      id="imageShow"
      :style="'display:'+block+';zoom:'+scale+';'"
    >
      <img :src="img_load">

    </div>

    <div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
        sceneChecked: false,
        title: '火山地震带分布',
        cameraF: false,
        HeightC: 136,
        hasQG: false,
        loadModelF: true,
        front: 1,
        WH: true,
        srcObjectF: false,
        strData: window.strData,
        button_text: "世界火山地震带分布",
        block: 'none',
        img_load: "static/image/11.jpg",
        scale: 1,
        bb:true
      };
    },
    methods: {
      init() {
        var thiz = this;
        var h = location.hash;

        // 获取摄像头参数
        var loadByHash = () => {
          if (h && h.indexOf('camera=true') > -1) {
            this.cameraF = fasle;
            this.HeightC = 210;
          } else {
            this.cameraF = false;
            this.HeightC = 136;
          }
        };
        loadByHash();
        document.title = this.title;
        this.WH = window.innerWidth < window.innerHeight;
        //开启摄像头初始化
        var ua = navigator.userAgent;
        var isMob = /iPhone|iPad|Android/i.test(ua);
        if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && this.cameraF) {
          document.getElementById('JweixinTip').style.display = 'block';
        }

        var exfect = [];
        if (navigator && navigator.mediaDevices) {
          navigator.mediaDevices.enumerateDevices()
            .then(function gotDevices(deviceInfos) {
              for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'videoinput') {
                  if (deviceInfo.label == 'screen-capture-recorder' || deviceInfo.label == '') {
                    thiz.cameraF = false;
                    thiz.HeightC = 136;
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

        // Launch render loop
        var CANVAS = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(CANVAS, true, {preserveDrawingBuffer: true, stencil: true});
        var thiz = this;
        this.scale = window.innerWidth / 1600;
        window.addEventListener("resize", () => {
          engine.resize();
          this.scale = window.innerWidth / 1600;
          this.WH = window.innerWidth < window.innerHeight;
        });

        if (!BABYLON.Engine.isSupported()) {
          //TODO显示webgl不支持信息
        } else {
          var scene = this.loadCustomScene(this.createScene, engine);
          if (h && h.indexOf('camera=true') > -1) {
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
          } else {
            scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.95, 1);
          }
          var renderTimes = 0;
          var renderFunction = () => {
            if (scene) {
              if (scene.activeCamera) {
                renderTimes++;
                if (renderTimes % 4 != 0) return;
                scene.render();
                if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF) {
                  if (isMob) {
                    openCamera(exfect[this.front], this.front);
                  } else {
                    openCamera(exfect[0], 0);
                  }
                  this.srcObjectF = true;
                }
              }
              if (scene.useDelayedTextureLoading) {
                var waiting = scene.getWaitingItemsCount();
                if (waiting <= 0) {
                  document.getElementById("notSupported").className = "hidden";
                }
              } else if (!thiz.sceneChecked) {
                var remaining = scene.getWaitingItemsCount();
                if (remaining === 0) {
                  thiz.sceneChecked = true;
                  document.getElementById("notSupported").className = "hidden";
                }
              }
            }
          };
          engine.runRenderLoop(renderFunction);
          engine.setHardwareScalingLevel(0.5);
        }
        engine.resize();
      },
      createLabel(advancedTexture, mesh, name) {
        var label = new BABYLON.GUI.Rectangle(name);
        label.height = "30px";
        label.alpha = 1;
        label.width = "200px";
        label.cornerRadius = 20;
        label.thickness = 0;
        label.linkOffsetY = 20;
        label.linkOffsetX = 0;
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = name;
        text1.color = "white";
        text1.fontSize = '20px';
        label.addControl(text1);
        return label;
      },

      // Render loop
      loadCustomScene(demoConstructor, engine) {
        document.getElementById("notSupported").className = "";
        var scene = demoConstructor(engine);
        if (scene.activeCamera) {
          scene.activeCamera.attachControl(document.getElementById("renderCanvas"), false);
        }
        scene.executeWhenReady(() => {
          document.getElementById("renderCanvas").style.opacity = 1;
        });
        return scene;
      },
      createScene(engine) {
        var thiz = this;
        var canvas = engine.getRenderingCanvas();
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1.2;
        var light1 = new BABYLON.HemisphericLight("Omni2", new BABYLON.Vector3(0, -1, 0), scene);
        light1.intensity = .5;
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false);
        camera.lowerRadiusLimit = 40;
        camera.upperRadiusLimit = 40;
        camera.minZ = 1.0;
        camera.layerMask = 0x20000000;

        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("static/image/earth_bankuai.png", scene);
        materialPlane.backFaceCulling = false;
        materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);

        function materialText(path) {
          var materialPlane1 = new BABYLON.StandardMaterial("texturePlane", scene);
          materialPlane1.diffuseTexture = new BABYLON.Texture(path, scene);
          materialPlane1.diffuseTexture.hasAlpha = true;
          materialPlane1.backFaceCulling = false;
          materialPlane1.specularColor = new BABYLON.Color3(0, 0, 0);
          return materialPlane1;
        }

        var mesh_huoshan = [];
        var mesh_all = [];
        BABYLON.SceneLoader.ImportMesh("", "", "data:" + this.strData, scene, function (newMeshes, particleSystems, skeletons) {
          for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].isVisible = true;
            newMeshes[i].layerMask = 0x20000000;
            mesh_all.push(newMeshes[i]);
            if (!newMeshes[i].rotationQuaternion) {
              newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
              newMeshes[i].rotation = BABYLON.Vector3.Zero();
              newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
              newMeshes[i].position = BABYLON.Vector3.Zero();

              if (newMeshes[i].name == "inside") {
                newMeshes[i].scaling = new BABYLON.Vector3(1.01, 1.01, 1.01);
                newMeshes[i].material = materialPlane;
              } else if (newMeshes[i].name == "outside") {
                newMeshes[i].material = materialText("static/image/earth_huoshan.png");
                newMeshes[i].isVisible = false;
                mesh_huoshan = newMeshes[i];
              } else if (newMeshes[i].name == "meizhou") {
                newMeshes[i].material = materialText("static/image/meizhou.png");
              } else if (newMeshes[i].name == "feizhou") {
                newMeshes[i].material = materialText("static/image/feizhou.png");
              } else if (newMeshes[i].name == "taipingyang") {
                newMeshes[i].material = materialText("static/image/taipingyang.png");
              } else if (newMeshes[i].name == "nanji") {
                newMeshes[i].material = materialText("static/image/nanjizhou.png");
              } else if (newMeshes[i].name == "yaou") {
                newMeshes[i].material = materialText("static/image/yaou.png");
              } else if (newMeshes[i].name == "yinduyang") {
                newMeshes[i].material = materialText("static/image/yinduyang.png");
              }
            }
          }
        });

        // var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        // advancedTexture.layer.layerMask = 0x20000000;
        // for (var i = 0; i < locale_point.length; i++) {
        //   if(locale_point[i].name == "meizhou") {
        //     locale_point[i].diffuseTexture = materialPlane
        //   }else if(locale_point[i].name == "ya_ou") {
        //     thiz.createLabel(advancedTexture, locale_point[i], "亚欧板块");
        //   }else if(locale_point[i].name == "yinduyang") {
        //     thiz.createLabel(advancedTexture, locale_point[i], "印度洋板块");
        //   }else if(locale_point[i].name == "taipingyang") {
        //     thiz.createLabel(advancedTexture, locale_point[i], "太平洋板块");
        //   }else if(locale_point[i].name == "feizhou") {
        //     thiz.createLabel(advancedTexture, locale_point[i], "非洲板块");
        //   }else if(locale_point[i].name == "nanjizhou") {
        //     thiz.createLabel(advancedTexture, locale_point[i], "南极洲板块");
        //   }
        //
        // }

        var onPointerDown = function () {
         thiz.block = 'block';
         thiz.bb = false;
          var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
          if (pickInfo.hit) {
            var currentMesh = pickInfo.pickedMesh;
            if (currentMesh.name == "inside" || currentMesh.name == "outside") {
              
              for (var i = 0; i < mesh_all.length; i++) {
                mesh_all[i].layerMask = 0x80000000;
              }
            }
          }
        };

        document.getElementById("lw").addEventListener("click", onPointerDown, false);
        scene.onDispose = function () {
          // document.getElementById("renderCanvas").removeEventListener("click", onPointerDown);
        };
        var num = 0;
clickButtonEvent()
        function clickButtonEvent() {
          num++;
 
            $('#onClickEvent>div').css({backgroundColor: '#617ff4', color: '#fff'});
            thiz.button_text = "六大板块";
            thiz.img_load = "static/image/11.jpg";
            mesh_huoshan.isVisible = true;
          
          
        }

        var onCloseClick = () => {
          thiz.block = 'none';
          thiz.bb = true
          for (var i = 0; i < mesh_all.length; i++) {
            mesh_all[i].layerMask = 0x20000000;
          }
        };

        var changeSence = function () {
          var index = $(this).index();
          if (index == 0 && thiz.cameraF) {
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
          } else if (index == 1) {
            scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.95, 1);
          } else if (index == 2) {
            scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1);
          }
        }

        var isMob = /iPad|Android/g.test(navigator.userAgent);
        if (isMob) {
          $('#changeSence>div').on('touchstart', changeSence);
          $('#onClickEvent>div').on('touchstart', clickButtonEvent);
          $('#imageShow').on('click', onCloseClick);
           $('#lw').on('click', onPointerDown);
        } else {
          $('#changeSence>div').on('click', changeSence);
          $('#onClickEvent>div').on('click', clickButtonEvent);
          $('#imageShow').on('click', onCloseClick);
            $('#lw').on('click', onPointerDown);
        }
        return scene;
      }
    },
    mounted() {
      this.init();
      $('#showhide').hide();
    }
  }
</script>

<style>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
iframe,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
button,
input,
textarea,
th,
td,
fieldset {
  margin: 0;
  padding: 0;
  border: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  overflow: hidden;
  position: fixed;
  font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
  touch-action: none;
  background-color: #fff;
  -ms-touch-action: none;
}

body {
  height: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

#video {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background: #fff;
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

/****** 基本样式开始 ******/

#fps {
  position: absolute;
  right: 20px;
  top: 5em;
  font-size: 20px;
  color: #6cf;
  z-index: 997;
}

.renderCanvas-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#notSupported {
  color: #232f32;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #ffffff;
  text-align: center;
  padding-top: 0;
  font-size: 30px;
  z-index: 999;
  cursor: default;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

.hidden {
  display: none;
}

#changeSence {
  width: 50px;
  position: absolute;
  z-index: 19;
  left: 15px;
  bottom: 0;
  top: 0;
  margin: auto;
}

#changeSence > div {
  margin: 12px 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

#changeSence > div > img {
  width: 50px;
}

#imageShow {
  width: 1288px;
  height: 614px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  padding: 20px;
  z-index: 999;
}

#imageShow > img {
  width: 100%;
  height: 100%;
}

#imageShow > div > img {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 94.5%;
  right: 0;
  top: 20px;
  bottom: 0;
  cursor: pointer;
}

#onClickEvent {
  width: 182px;
  position: absolute;
  z-index: 19;
  right: 20px;
  bottom: 10px;
  height: 60px;
}

#onClickEvent > div {
  color: #fff;
  width: 180px;
  height: 34px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
  background: #a9a9a9;
  border: 2px solid #c5c5c5;
  border-radius: 6px;
  cursor: pointer;
  margin: 12px 0;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
}

@media (max-width: 720px) {
  #title {
    font-size: 22px;
  }

  #check div,
  #step div {
    font-size: 13px;
  }

  #step > div > div {
    padding-left: 38px;
  }

  #step div > span {
    left: 8px;
  }
}
.m {
  width: 20px;
  height: 5px;
  position: absolute;

  right: 1vh;

  bottom: 1vh;

  border-radius: 6px;
  padding: 20px;
  z-index: 999;
}
.m img {
  height: 60%;
  width: auto;
  margin: auto;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.32);
  border-radius: 5px;
}
/* #imageShow {
  width: 50vh;
  /* padding-right: 80%; */
/* height: 80vh;
} */

@media (max-width: 655px) {
  #title {
    font-size: 20px;
  }

  #check div,
  #step div {
    font-size: 12px;
  }

  #step > div > div {
    padding-left: 32px;
  }

  #step div > span {
    left: 5px;
  }
}
</style>
