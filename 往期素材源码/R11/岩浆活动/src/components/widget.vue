<template>
  <div id="app">
    <div class="control-container">
      <p>岩浆运动</p>
      <i id="clear">
        <img class="btn" src="static/image/chongzhi.png" /> </i>
    </div>
    <div class="renderCanvas-container">
      <canvas id="renderCanvas" touch-action="none" tabindex="1"></canvas>
      <div id="view_space" class="view_space" ref="img" :style="'position:relative;z-index:10;pointer-events:none;'">
        <!-- <img :src="'static/textures/gaoqing_xulie/Vulcano_' + num + '.jpg'"> -->
        <video :src="videoSrc" ref="videoCtrl" preload="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" v-if="!isMob"> 您的浏览器不支持HTML5 视频 </video>
      </div>
    </div>
    <div id="notSupported" v-if="!isHidden">loading...</div>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="switchBtn" :style="'height:'+HeightS+'px;'">
      <div>岩浆喷发</div>
      <div>岩浆侵入</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      sceneChecked: false,
      title: '岩浆运动',
      cameraF: false,
      HeightC: 136,
      HeightS: 98,
      hasQG: false,
      loadModelF: true,
      front: 1,
      WH: true,
      W: 0,
      H: 0,
      bf: 0,
      imgViewWidth: 0,
      imgViewHeight: 0,
      imgAlpha: false,
      num: 0,
      chooseN: 2,
      isHidden: false,
    };
  },
  created() {
    this.store = {};
    this.arr = [];
    this.canvas = null;
    this.engine = null;
    this.videoSrc = 'static/textures/gaoqing_xulie/baofa.mp4';
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      this.isMob = true;
      for (let i = 0; i < 421; i += 2) {
        this.arr.push(i);
      }
      var promises = this.arr.map((value, index) => {
        return this.preloadImage(`static/textures/gaoqing_xulie/Vulcano_${value}.jpg`).then((image) => {
          this.store[index] = image;
        })
      })
      Promise.all(promises).then(() => {
        this.isHidden = true;
        // this.resultArray = this;
      })
    } else {
      this.isMob = false;
      this.isHidden = true;
    }
  },
  methods: {
    init() {
      var load_imgF = false;
      // var load_img = [];
      // for (let k = 0; k <= 420; k++) {
      //  load_img.push('static/textures/gaoqing_xulie/Vulcano_' + k + '.jpg');
      // }
      //
      // $.imgpreload(load_img, {
      //  all: function () {
      //    this.resultArray = this;
      //    load_imgF = true;
      //  }
      // });
      // Launch render loop
      this.canvas = document.getElementById("renderCanvas");
      var engine = new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });
      var thiz = this;
      window.addEventListener("resize", () => {
        engine.resize();
        this.WH = window.innerWidth < window.innerHeight;
      });
      if (!BABYLON.Engine.isSupported()) {
        //TODO显示webgl不支持信息
      } else {
        var scene = this.loadCustomScene(this.createScene, engine);
        scene.clearColor = new BABYLON.Color3(.25, .25, .25);
        var renderStep = 0;
        var renderFunction = () => {
          renderStep++;
          if (renderStep % 3 != 0) return;
          if (scene) {
            if (scene.activeCamera) {
              scene.render();
            }
            if (scene.useDelayedTextureLoading) {
              var waiting = scene.getWaitingItemsCount();
              if (waiting <= 0) {}
            } else if (!thiz.sceneChecked) {
              var remaining = scene.getWaitingItemsCount();
              if (remaining === 0 && load_imgF) {
                thiz.sceneChecked = true;
              }
            }
          }
        };
        engine.runRenderLoop(renderFunction);
      }
      engine.resize();
      return {
        engine,
        renderFunction,
      }
    },
    preloadImage(path) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = path;
      })
    },
    // Render loop
    loadCustomScene(demoConstructor, engine) {
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
      // engine.setHardwareScalingLevel(0.8);
      var scene = new BABYLON.Scene(engine);
      var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
      light.intensity = 3;
      var light1 = new BABYLON.HemisphericLight("Omni2", new BABYLON.Vector3(0, -1, 0), scene);
      light1.intensity = 0.5; //-12, 0.8
      var camera = new BABYLON.ArcRotateCamera("Camera", 2.9, 1.29, 100, BABYLON.Vector3.Zero(), scene);
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = 20;
      camera.upperRadiusLimit = 150;
      camera.minZ = 1.0;
      camera.upperBetaLimit = Math.PI / 2;
      camera.layerMask = 2
      var cameranextpos = new BABYLON.Vector3(-28.3, 9.9, 9.3);
      camera.setPosition(cameranextpos)
      var cameranextpos2 = new BABYLON.Vector3(-31.8, -13.2, 4.6);
      var camerapos1, camerapos2;
      var gotonextpos = false;
      var gotonextpos2 = false;
      var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
      var planTexture = new BABYLON.Texture("static/image/Vulcano_g2.png", scene);
      materialPlane.diffuseTexture = planTexture;
      // materialPlane.diffuseTexture.hasAlpha =true;
      materialPlane.opacityTexture = planTexture;
      materialPlane.backFaceCulling = true;
      materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);
      materialPlane.needDepthPrePass = true;
      // materialPlane.alpha = 0.2
      var materialPlane1 = new BABYLON.StandardMaterial("texturePlane", scene);
      // var planTexture1 = new BABYLON.Texture("static/textures/gaoqing_xulie/Vulcano_0.jpg", scene);
      // materialPlane1.diffuseTexture = planTexture1;
      // materialPlane1.backFaceCulling = false;
      // materialPlane1.specularColor = new BABYLON.Color3(0, 0, 0);
      var mesh_hs;
      BABYLON.SceneLoader.ImportMesh("", "", "data:" + window.strData1, scene, function(newMeshes, particleSystems, skeletons) {
        for (var i = 0; i < newMeshes.length; i++) {
          newMeshes[i].isVisible = true;
          if (!newMeshes[i].rotationQuaternion) {
            newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
            newMeshes[i].rotation = BABYLON.Vector3.Zero();
            newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
            newMeshes[i].position = BABYLON.Vector3.Zero();
            newMeshes[i].material = materialPlane;
            newMeshes[i].position = new BABYLON.Vector3(0, -5, -5);
            mesh_hs = newMeshes[i];
            mesh_hs.isPickable = false;
          }
        }
      });
      var chuanglianTexture = new BABYLON.Texture("./static/textures/qinru/chuanglian.png", scene);
      var material_chuanglian = new BABYLON.StandardMaterial("texturePlane", scene);
      material_chuanglian.diffuseTexture = chuanglianTexture;
      material_chuanglian.opacityTexture = chuanglianTexture;
      material_chuanglian.specularColor = new BABYLON.Color3(0, 0, 0);
      material_chuanglian.backFaceCulling = false;
      material_chuanglian.needDepthPrePass = false;
      material_chuanglian.diffuseTexture.hasAlpha = true;
      var sparksTexture = new BABYLON.Texture("./static/textures/sparks_xulie/sparks_1.png", scene);
      var material_sparks = new BABYLON.StandardMaterial("texturePlane", scene);
      material_sparks.diffuseTexture = sparksTexture;
      // material_sparks.opacityTexture = sparksTexture;
      material_sparks.diffuseTexture.hasAlpha = true;
      material_sparks.specularColor = new BABYLON.Color3(0, 0, 0);
      material_sparks.backFaceCulling = false;
      // material_sparks.needDepthPrePass = true;
      var chufaTexture = new BABYLON.Texture("./static/textures/qinru/chufa.png", scene);
      var material_chufa = new BABYLON.StandardMaterial("texturePlane", scene);
      material_chufa.diffuseTexture = chufaTexture;
      material_chufa.opacityTexture = chufaTexture;
      material_chufa.specularColor = new BABYLON.Color3(0, 0, 0);
      material_chufa.backFaceCulling = false;
      material_chufa.needDepthPrePass = true;
      var mesh_qr = [];
      var mesh_sparks;
      BABYLON.SceneLoader.ImportMesh("", "", "data:" + window.strData3, scene, function(newMeshes, particleSystems, skeletons) {
        for (var i = 0; i < newMeshes.length; i++) {
          newMeshes[i].isVisible = true;
          if (!newMeshes[i].rotationQuaternion) {
            newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
            newMeshes[i].rotation = new BABYLON.Vector3(0, 0, Math.PI / 3.58 + 2 * Math.PI);
            newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
            newMeshes[i].position = new BABYLON.Vector3(0, -5, -5);
            // console.log(newMeshes[i])
            if (newMeshes[i].name == "mask") {
              mesh_qr.push(newMeshes[i]);
              newMeshes[i].material.alpha = 0;
              newMeshes[i].isPickable = false;
            } else if (newMeshes[i].name == "chuanglian") {
              mesh_qr.push(newMeshes[i]);
              newMeshes[i].isPickable = false;
              newMeshes[i].material = material_chuanglian;
              newMeshes[i].material.alpha = 0;
            } else if (newMeshes[i].name == "sparks") {
              mesh_qr.push(newMeshes[i]);
              mesh_sparks = newMeshes[i];
              mesh_sparks.material = material_sparks;
              newMeshes[i].isVisible = false;
              newMeshes[i].isPickable = false;
              newMeshes[i].material.alpha = 0;
            } else if (newMeshes[i].name == "hengjiemian") {
              mesh_qr.push(newMeshes[i]);
              newMeshes[i].isPickable = false;
              newMeshes[i].material.alpha = 0;
            } else if (newMeshes[i].name == "neibu") {
              mesh_qr.push(newMeshes[i]);
              newMeshes[i].isPickable = false;
              newMeshes[i].material.alpha = 0;
            } else if (newMeshes[i].name == "chufa") {
              mesh_qr.push(newMeshes[i]);
              newMeshes[i].material = material_chufa;
              newMeshes[i].material.alpha = 0;
            }
          }
        }
      });
      //相机移动
      var isPlay = false;

      function pointMove() {
        isPlay = true;
        camerapos1 = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
        gotonextpos = true;
      }
      //相机移动2
      function pointMove2() {
        isPlay = true;
        camerapos2 = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
        gotonextpos2 = true;
      }
      var isClick = false;
      var onPointerDown = function(evt) {
        if (!evt.pointerId && evt.pointerId != 0) {
          return;
        }
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
          var currentMesh = pickInfo.pickedMesh;
          if (currentMesh.name == "chufa") {
            //点击加帧
            isClick = true;
            time = 0;
          }
        }
      };
      var onPointerUp = function(evt) {
        //离开计时，超时减帧
        isClick = false;
      }
      thiz.canvas.addEventListener("pointerdown", onPointerDown, false);
      thiz.canvas.addEventListener("pointerup", onPointerUp, false);
      scene.onDispose = function() {
        thiz.canvas.removeEventListener("pointerdown", onPointerDown);
        thiz.canvas.removeEventListener("pointerup", onPointerUp);
      };
      var smooth = 0.08;
      var qr_animation = [];
      var time = 0;
      var renderStep = 0;
      scene.registerBeforeRender(function() {
        renderStep++;
        if (renderStep % 3 != 0) return;
        // console.log(camera)
        //相机运动
        if (gotonextpos == true) {
          camerapos1 = BABYLON.Vector3.Lerp(camerapos1, cameranextpos, smooth);
          camera.detachControl(thiz.canvas);
          camera.setPosition(camerapos1);
          if (BABYLON.Vector3.Distance(camera.position, cameranextpos) < 0.5) {
            // console.log("2222")
            gotonextpos = false;
            modelHideAnimation1(mesh_hs);
          }
        }
        //相机运动2
        if (gotonextpos2 == true) {
          camerapos2 = BABYLON.Vector3.Lerp(camerapos2, cameranextpos2, smooth);
          camera.detachControl(thiz.canvas);
          camera.setPosition(camerapos2);
          if (BABYLON.Vector3.Distance(camera.position, cameranextpos2) < 0.5) {
            gotonextpos2 = false;
            modelHideAnimation2(mesh_hs);
          }
        }
        // console.log(isClick)
        //离开为TRUE 开始计时
        if (isClick) {
          if (material_chuanglian.diffuseTexture.vOffset >= -0.454) {
            material_chuanglian.diffuseTexture.vOffset -= 0.005;
            mesh_sparks.position.z += 0.0235;
          }
        } else {
          time++;
          if (time > 50) {
            if (material_chuanglian.diffuseTexture.vOffset < 0) {
              material_chuanglian.diffuseTexture.vOffset += 0.005;
              mesh_sparks.position.z -= 0.0235;
            }
          }
        }
        // console.log(sb)
      });
      var hs_animation1, hs_animation2;
      //火山渐隐->按钮1
      function modelHideAnimation1(mesh) {
        // console.log("33333")
        var animation = new BABYLON.Animation("myAnimation", "material.alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];
        keys.push({
          frame: 0,
          value: 1
        });
        keys.push({
          frame: 100,
          value: 0
        });
        animation.setKeys(keys);
        mesh.animations = [];
        mesh.animations.push(animation);
        hs_animation1 = scene.beginAnimation(mesh, 0, 100, false, 5, () => {
          // console.log("44444")
          materialPlane.needDepthPrePass = false;
          imageShowAnimation(); //显示图片动画
        });
      }
      //火山渐隐->按钮2
      function modelHideAnimation2(mesh) {
        var animation = new BABYLON.Animation("myAnimation", "material.alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];
        keys.push({
          frame: 0,
          value: 1
        });
        keys.push({
          frame: 100,
          value: 0
        });
        animation.setKeys(keys);
        mesh.animations = [];
        mesh.animations.push(animation);
        hs_animation2 = scene.beginAnimation(mesh, 0, 100, false, 5, () => {
          materialPlane.needDepthPrePass = false;
          camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
          cameraSize();
          for (var i = 0; i < mesh_qr.length; i++) {
            qr_animation[i] = modelShowAnimation2(mesh_qr[i]);
          }
        });
      }
      //逐帧动画
      var SET = null;
      let dom = this.$refs.img;
      var aniamtionOneByOne = () => {
        // console.log("11111111")
        if (this.chooseN != 0) {
          clearTimeout(SET)
          // cancelAnimationFrame(SET);
          this.num = 0;
          return;
        }
        if (this.num >= 210) {
          clearTimeout(SET)
          this.num = 210;
          isPlay = false;
          haveTransition = false;
          return;
        }
        dom.appendChild(this.store[this.num]); //先添加后删除 入栈速度略高于出栈
        if (this.store[this.num]) {
          // this.f.innerHTML = "";
          setTimeout(() => {
            dom.removeChild(dom.firstChild);
          }, 20)
        }
        this.num++;
        SET = setTimeout(aniamtionOneByOne, 60);
      }
      //图片火山渐现
      var imageShowAnimation = () => {
        camera.layerMask = 0x80000000;
        // $('.view_space')
        //   .animate({
        //     opacity: 1
        //   }, 1200, () => {
        //     aniamtionOneByOne();
        //   });
        this.$refs.img.style.opacity = 1;
        thiz.engine.engine.stopRenderLoop(thiz.engine.renderFunction);
        // aniamtionOneByOne();
        if (this.isMob) {
          aniamtionOneByOne();
        } else {
          setTimeout(() => {
            this.$refs.videoCtrl.play();
          }, 1000)
        }
      }
      //侵入火山渐现
      function modelShowAnimation2(mesh) {
        var animation = new BABYLON.Animation("myAnimation", "material.alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];
        keys.push({
          frame: 0,
          value: 0
        });
        keys.push({
          frame: 100,
          value: 1
        });
        animation.setKeys(keys);
        mesh.animations = [];
        mesh.animations.push(animation);
        var animation = scene.beginAnimation(mesh, 0, 100, false, 4, () => {});
        return animation;
      }

      function cameraSize() {
        var sb = engine.getRenderHeight() / engine.getRenderWidth();
        camera.orthoTop = 20 * sb;
        camera.orthoBottom = -20 * sb;
        camera.orthoLeft = -30 * sb;
        camera.orthoRight = 30 * sb;
      }
      var index;
      var haveTransition = false;
      var haveTransition2 = false;
      var swithBtn = function() {
        if (!thiz.isMob) {
          thiz.$refs.videoCtrl.currentTime = 0;
          thiz.$refs.videoCtrl.pause();
        }
        $('#switchBtn>div').css('background', '#a9a9a9');
        $(this).css('background', '#6a6a6a');
        index = $(this).index();
        thiz.chooseN = index;
        if (index == 0) {
          haveTransition2 = true;
          if (!haveTransition) {
            if (!isPlay) {
              pointMove();
            }
          } else {
            mesh_hs.material.alpha = 0;
            imageShowAnimation();
          }
        } else if (index == 1) {
          thiz.engine.engine.runRenderLoop(thiz.engine.renderFunction);
          haveTransition = true;
          reset();
          if (!haveTransition2) {
            pointMove2();
          } else {
            camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
            cameraSize();
            mesh_hs.material.alpha = 0;
            camera.alpha = 2.99;
            camera.beta = 1.56;
            camera.detachControl(thiz.canvas);
            thiz.imgAlpha = false;
            for (var i = 0; i < mesh_qr.length; i++) {
              mesh_qr[i].material.alpha = 1;
            }
          }
        }
      }

      function reset() {
        if (!thiz.isMob) {
          thiz.$refs.videoCtrl.pause();
          thiz.$refs.videoCtrl.currentTime = 0;
        }
        camera.layerMask = 2;
        // $('.view_space')
        //   .stop()
        //   .css('opacity', 0);
        thiz.$refs.img.style.opacity = 0;
        thiz.num = 0;
        thiz.chooseN = 2;
        isPlay = false;
        gotonextpos = false;
        gotonextpos2 = false;
        clearTimeout(SET);
        if (hs_animation1 != null) hs_animation1.stop();
        if (hs_animation2 != null) hs_animation2.stop();
        for (var i = 0; i < qr_animation.length; i++) {
          if (qr_animation[i] != null) qr_animation[i].stop();
        }
        thiz.imgAlpha = false;
        mesh_hs.material.alpha = 1;
        for (var i = 0; i < mesh_qr.length; i++) {
          mesh_qr[i].material.alpha = 0;
        }
        mesh_hs.material.needDepthPrePass = true;
        camera.attachControl(thiz.canvas, true);
        material_chuanglian.diffuseTexture.vOffset = 0;
        thiz.engine.engine.runRenderLoop(thiz.engine.renderFunction);
      }
      var resetAll = function() {
        cameranextpos = new BABYLON.Vector3(-28.3, 9.9, 9.3);
        camera.setPosition(cameranextpos);
        camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
        $('#switchBtn>div').css('background', '#a9a9a9');
        haveTransition = false;
        haveTransition2 = false;
        // $('.view_space')
        //   .css("opacity", 0);
        thiz.$refs.img.style.opacity = 0;
        reset();
      }
      window.onresize = () => {
        engine.resize();
        cameraSize();
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        if (!this.isMob) {
          this.changeImgPos();
        }
        // this.imgViewWidth = window.innerHeight / 600 * 1920 * 1.3;
        // this.imgViewHeight = window.innerHeight * 1.3;
      }
      var isMob = /iPad|Android/g.test(navigator.userAgent);
      if (isMob) {
        $('#clear').on('touchstart', resetAll);
        $('#switchBtn>div').on('touchstart', swithBtn);
      } else {
        $('#clear').on('click', resetAll);
        $('#switchBtn>div').on('click', swithBtn);
      }
      return scene;
    },
    changeImgPos() {
      let height = window.innerHeight;
      let width = window.innerWidth;
      let imgW = 940 / 450 * height;
      this.$refs.videoCtrl.style.transform = `scaleX(${width/imgW})`;
    },
  },
  mounted() {
    this.engine = this.init();
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.imgViewWidth = window.innerHeight / 600 * 1920 * 1.3;
    this.imgViewHeight = window.innerHeight * 1.3;
    if (!this.isMob) {
      this.changeImgPos();
    }
    $('#showhide').hide();
  }
}

</script>
<style>
html, body, h1, h2, h3, h4, h5, h6, hr, p, iframe, dl, dt, dd, ul, ol, li, pre, form, button, input, textarea, th, td, fieldset {
  margin: 0;
  padding: 0;
  border: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body, html {
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
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
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
.control-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 76px;
  padding: 0;
  margin: 0;
  color: #fff;
  z-index: 999;
  background-color: transparent;
}
.control-container p {
  position: absolute;
  left: 24px;
  top: 24px;
  font-size: 24px;
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
.btn {
  position: absolute;
  width: 48px;
  height: 40px;
  right: 20px;
  top: 18px;
  cursor: pointer;
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
.view_space {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s;
  background-size: cover;
  background-repeat: no-repeat;
  background: #404558;
}
.view_space>video {
  /*width: 100%;*/
  height: 100%;
  z-index: 999;
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: left center;
}
.op {
  opacity: 0;
}
.hidden {
  display: none
}
.view_space>img {
  height: 100%;
  position: absolute;
  width: 100%;
  /*top: 0;*/
  bottom: 0;
  left: 0;
}
#switchBtn {
  width: 182px;
  position: absolute;
  z-index: 19;
  right: 15px;
  bottom: 15px;
}
#switchBtn>div {
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
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.8);
}

</style>
