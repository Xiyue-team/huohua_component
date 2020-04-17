<template>
 <div class="container">
    <div class="renderCanvas-container">
        <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay"  id="video" muted="muted" playsinline="playsinline"></video>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="changeSence" :style="'height:'+HeightC+'px;'">
        <div id="camera" v-show="cameraF"><img src="static/UI/tran.png" ></div>
        <div id="white"><img src="static/UI/white.png" ></div>
        <div id="black"><img src="static/UI/black.png" ></div>
    </div>
 </div>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            checked: false,
            sceneChecked: false,
            title:'洪积扇',
            cameraF:false,
            HeightC:136,
            hasQG:false,
            loadModelF:true,
            front:1,
            WH:true,
            srcObjectF:false,
            strData:window.strData,

        };
    },
    methods: {
    init() {
        var thiz=this;
        var h = location.hash;
        // 获取摄像头参数
        var loadByHash=()=> {

            if (h && h.indexOf('camera=true')>-1) {
                this.cameraF=true;
                this.HeightC=210;
            }else{
                this.cameraF=false;
                this.HeightC=136;
            }
        }
        loadByHash();
        document.title = this.title;
        this.WH=window.innerWidth<window.innerHeight;
            //开启摄像头初始化
        var ua = navigator.userAgent;
        var isMob=/iPhone|iPad|Android/i.test(ua);
        if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && this.cameraF) {
            document.getElementById('JweixinTip').style.display = 'block';
        }

        var exfect=[];
        if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

        function openCamera(id){
            var constraints = {audio: false, video: {deviceId: id}}
            if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                    video.srcObject = stream;
                });
            } else{
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia(constraints, function (stream) {
                video.srcObject = stream; }, function (err) { });
              }
          }

        // Launch render loop
        this.canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        var thiz = this;
        window.addEventListener("resize", () => {
            engine.resize();
            this.WH=window.innerWidth<window.innerHeight;
        });

        if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
        } else {
            var scene = this.loadCustomScene(this.createScene, engine);
            if (h &&h.indexOf('camera=true')>-1) {
                 scene.clearColor = new BABYLON.Color4(0,0,0,0);
            }else{
                 scene.clearColor = new BABYLON.Color4(0.95,0.95,0.95,1);
            }
            var renderFunction = ()=>{

                if (scene) {
                    if (scene.activeCamera) {
                        scene.render();
                        if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF){
                            console.log("openCamera");
                            if(isMob){
                                openCamera(exfect[this.front],this.front);
                            }else{
                                openCamera(exfect[0],0);
                            }
                            this.srcObjectF=true;
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
        }
            engine.resize();
        },

        // Render loop
        loadCustomScene(demoConstructor, engine) {
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(this.canvas, false);
            }
            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
            });
            return scene;
        },
        createScene(engine) {
          var thiz = this;
          var canvas = engine.getRenderingCanvas();
          engine.enableOfflineSupport = false;
          var scene = new BABYLON.Scene(engine);

          var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
          light.intensity = 1;
          var light1 = new BABYLON.HemisphericLight("Omni2", new BABYLON.Vector3(0, -1, 0), scene);
          light1.intensity = .5;
          var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 3, Math.PI / 3,50,new BABYLON.Vector3(0,10,0), scene);
          camera.attachControl(canvas, false);
          camera.lowerRadiusLimit = 35;
          camera.upperRadiusLimit = 70;
          camera.minZ = 1.0;
          camera.layerMask = 0x20000000;

          var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
          materialPlane.diffuseTexture = new BABYLON.Texture("static/image/hongjishan_final.png", scene);
          materialPlane.backFaceCulling = false;
          materialPlane.specularColor=new BABYLON.Color3(0,0,0);

          BABYLON.SceneLoader.ImportMesh("", "", "data:" + this.strData, scene, function (newMeshes, particleSystems, skeletons) {
            for (var i = 0; i < newMeshes.length; i++) {
              newMeshes[i].isVisible = true;
              newMeshes[i].layerMask = 0x20000000;
              if (!newMeshes[i].rotationQuaternion) {
                newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
                newMeshes[i].rotation = BABYLON.Vector3.Zero();
                newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                newMeshes[i].position = BABYLON.Vector3.Zero();
                newMeshes[i].material = materialPlane;
              }
            }
          });

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
          } else {
            $('#changeSence>div').on('click', changeSence);
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
html,body,h1,h2,h3,h4,h5,h6,hr,p,iframe,dl,dt,dd,ul,ol,li,pre,form,button,input,textarea,th,td,fieldset {
    margin: 0;
    padding: 0;
    border: none;
    -webkit-tap-highlight-color: rgba(0,0, 0, 0);
}

body,html {
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
    -ms-touch-action: none
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
canvas{
    position:absolute;
    top:0;
    left:0;
    z-index: 9;
}
#video {
    position: absolute;
    left:0;
    right:0;
    margin:auto;
    z-index: 1;
    background: #fff;
  }
  #video.videoW{
    height:auto;
    width:100%;
  }
  #video.videoH{
    width:auto;
    height:100%;
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
    color: #232F32;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    text-align: center;
    padding-top: 0;
    font-size: 30px;
    z-index: 999;
    cursor: default
}

#renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
}

.hidden {
    display: none
}
  #changeSence{
    width:50px;
    position: absolute;
    z-index: 19;
    left: 15px;
    bottom:0px;
    top:0px;
    margin: auto;
  }
  #changeSence>div{
    margin: 12px 0;
    width:50px;
    height:50px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.5);
  }
  #changeSence>div>img{
    width: 50px;
  }

@media(max-width: 720px) {
    #title {
        font-size: 22px;
    }
    #check div,
    #step div {
        font-size: 13px;
    }
    #step>div>div {
        padding-left: 38px;
    }
    #step div>span {
        left: 8px;
    }
}

@media(max-width: 655px) {
    #title {
        font-size: 20px;
    }
    #check div,
    #step div {
        font-size: 12px;
    }
    #step>div>div {
        padding-left: 32px;
    }
    #step div>span {
        left: 5px;
    }

}
</style>
