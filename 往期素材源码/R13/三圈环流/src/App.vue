<template>
  <div id="app" class="noselect">
    <div class="Tip" v-if="hiddenMobTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
    <div class="menu" @click="sildeMenu(1)" ref="menu"></div>
    <div class="container" ref="container">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <div class="renderCanvas-container">
        <canvas id="renderCanvas" touch-action="none"></canvas>
      </div>
      <!--视图区-->
    </div>
    <div class="leftMask" v-show="!isHidden && ismob" @click="sildeMenu(2)"></div>
    <!--侧边按钮区-->
    <div class="app_aside" ref="sides" :class="ismob?'mobleRightColor':'normalRightColor'">
      <ui-btn id="clear" type="reset1" class="titleBtn"></ui-btn>
      <ui-btn btn type="switch" v-model="move" class="rightBtn">三圈环流</ui-btn>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
    <div class="hen" v-show="ismobhen">
      <div><img src="static/image/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开
并横屏使用</span></div>
    </div>
  </div>
</template>
<script>
var a = 0
import uiBtn from '@/components/UI/uiBtn';

export default {
  name: 'app',
  components: { uiBtn },
  data() {
    return {
      blue: '',
      move: false,
      isMob: /iPad|Android/g.test(navigator.userAgent),
      isHidden: false,
      canSlide: false,
      ismob: false,
      ismobhen: false,
      canvas: null,
      checked: false,
      sceneChecked: false,
      title: '三圈环流的原理',
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
      resultArray: [],
      hiddenMobTip: false,

    };
  },
  watch: {
    move(val) {
      if (val) {
        a = 0.03;
      } else {
        a = 0;
      }
    }
  },
  methods: {
    init() {
      document.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, {
        passive: false
      });
      var load_img = [];
      // for (let k = 0; k <= 420; k++) {
      //   load_img.push('static/textures/gaoqing_xulie/Vulcano_' + k + '.jpg');
      // }
      var load_imgF = false;
      // $.imgpreload(load_img, {
      //   all: function () {
      //     this.resultArray=this;
      //     load_imgF = true;
      //   }
      // });

      // Launch render loop
      this.canvas = document.getElementById("renderCanvas");
      var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
      var thiz = this;


      var listenSide = () => {
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (w < 500 || h < 500) {
          this.isHidden = true;
          this.canSlide = true;
          this.$refs.container.style.width = '100%';
          this.$refs.menu.style.top = '24px';
          this.$refs.sides.style.right = '-280px';
          this.ismob = true;
          if (w <= h) {
            this.ismobhen = true
          } else {
            this.ismobhen = false;
          }
        } else {
          this.isHidden = false;
          this.canSlide = false;
          this.$refs.container.style.width = w - 280 + 'px';
          this.$refs.sides.style.right = '0';
          this.ismob = false;

        }
        engine.resize();
      };
      listenSide();
      window.addEventListener("resize", () => {
        listenSide();
      });

      var createScene = (engine) => {
        var thiz = this;
        var canvas = engine.getRenderingCanvas();
        engine.enableOfflineSupport = false;
        engine.setHardwareScalingLevel(0.5);
        var scene = new BABYLON.Scene(engine);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1;
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
        light.intensity = 1;
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 200, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, false);
        camera.lowerRadiusLimit = 160;
        camera.upperRadiusLimit = 260;
        camera.minZ = 1.0;
        scene.activeCamera = camera;

        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("static/image/diqiu_diff.jpg", scene);
        materialPlane.backFaceCulling = false;
        materialPlane.specularPower = 0;
        materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);

        var materialArrow = new BABYLON.StandardMaterial("texturePlane", scene);
        var planTexture = new BABYLON.Texture("static/image/arrow_big.png", scene);
        materialArrow.diffuseTexture = planTexture;
        materialArrow.diffuseTexture.hasAlpha = true;
        materialArrow.backFaceCulling = false;
        materialArrow.specularColor = new BABYLON.Color3(0, 0, 0);

        var group = new BABYLON.Mesh("group", scene);
        var a1, a2, a3, a4, a5, a6;
        BABYLON.SceneLoader.ImportMesh("", "", "data:" + strData, scene, function(newMeshes, particleSystems, skeletons) {
          for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].setParent(group);
            newMeshes[i].isVisible = true;
            if (!newMeshes[i].rotationQuaternion) {
              newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
              newMeshes[i].rotation = BABYLON.Vector3.Zero();
              newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
              newMeshes[i].position = BABYLON.Vector3.Zero();
              if (newMeshes[i].name == "arrow3") {
                a1 = newMeshes[i];
                a1.material = materialArrow;
              } else if (newMeshes[i].name == "arrow2") {
                a2 = newMeshes[i];
                a2.material = materialArrow;
              } else if (newMeshes[i].name == "arrow1") {
                a3 = newMeshes[i];
                a3.material = materialArrow;
              } else if (newMeshes[i].name == "arrow4") {
                a4 = newMeshes[i];
                a4.material = materialArrow;
              } else if (newMeshes[i].name == "arrow5") {
                a5 = newMeshes[i];
                a5.material = materialArrow;
              } else if (newMeshes[i].name == "arrow6") {
                a6 = newMeshes[i];
                a6.material = materialArrow;
              } else if (newMeshes[i].name == "diqiu") {
                newMeshes[i].scaling = new BABYLON.Vector3(.97, .97, .97);
                newMeshes[i].material = materialPlane;
              }
            }
          }
        });

        //就是你
        scene.registerBeforeRender(function() {
          if (!thiz.move) {
            modelRotateAnimation(group);
          }
          a1.material.diffuseTexture.vOffset += a;
        });

        var animation_model;

        function modelRotateAnimation(mesh) {
          var animation = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
          var keys = [];
          keys.push({
            frame: 0,
            value: 0
          });
          keys.push({
            frame: 100,
            value: -Math.PI / 2
          });
          animation.setKeys(keys);
          mesh.animations = [];
          mesh.animations.push(animation);
          animation_model = scene.beginAnimation(mesh, 0, 100, false, 3, () => {

          });
        }

        function reset() {
          camera.alpha = 0;
          camera.beta = Math.PI / 2;
          camera.radius = 200;
          camera.lowerRadiusLimit = 160;
          camera.upperRadiusLimit = 260;
          camera.minZ = 1.0;
          group.rotation = BABYLON.Vector3.Zero();
          animation_model.stop();
          animation_model = null;
          thiz.move = false;
        }

        var resetAll = function() {
          reset();
        }

        var isMob = /iPad|Android/g.test(navigator.userAgent);
        if (isMob) {
          $('#clear').on('touchstart', resetAll);

        } else {
          $('#clear').on('click', resetAll);

        }
        return scene;
      };

      if (!BABYLON.Engine.isSupported()) {
        //TODO显示webgl不支持信息
      } else {
        var scene = this.loadCustomScene(createScene, engine);
        scene.clearColor = new BABYLON.Color3(1, 1, 1);
        var renderStep = 0;
        var renderFunction = () => {
          if (scene) {
            if (scene.activeCamera) {
              renderStep++;
              if (renderStep % 2 != 0) return;
              scene.render();
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
    sildeMenu(val) {
      if (!this.canSlide) {
        return;
      }
      if (val == 1 && this.isHidden) {
        this.$refs.sides.style.right = '0';
        this.$refs.menu.style.top = '-45px';
      } else if (val == 2 && !this.isHidden) {
        this.$refs.sides.style.right = '-280px';
        this.$refs.menu.style.top = '24px';
      }
      this.isHidden = !this.isHidden;

    },

  },
  mounted() {
    let thiz = this
    this.init();
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.imgViewWidth = window.innerHeight / 600 * 1920 * 1.3;
    this.imgViewHeight = window.innerHeight * 1.3;
    $('#showhide').hide();
    this.xx = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
    document.title = this.title;
    if(this.xx){
    var mql = window.matchMedia("(orientation: portrait)");

    function onMatchMeidaChange(mql) {
      clearTimeout(thiz.tipTimer);
      if (mql.matches) {
        // 竖屏
        thiz.isLandscape = false


      } else {

        thiz.isLandscape = true
        if (window.innerWidth < 500 || window.innerHeight < 500) {
          thiz.hiddenMobTip = true;
          thiz.tipTimer = setTimeout(() => {
            thiz.hiddenMobTip = false;
          }, 3000)
        }
      }
    }
    onMatchMeidaChange(mql);
    mql.addListener(onMatchMeidaChange);
  }
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
  position: relative;
  touch-action: none;
  -ms-touch-action: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

@media all and (orientation: portrait) {
  .Tip {
    display: none;
  }
}

@media all and (orientation: landscape) {

  .Tip{
    padding: 0 10px;
    position: fixed;
    display: inline-block;
    width: 450px;
    height: 48px;
    border-radius: 100px;
    z-index: 99;
    line-height: 46px;
    font-weight: normal;
    border: 2px solid #ddd;
    font-size: 18px;
    color: #333;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    top: 30px;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ne {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
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

@media screen and (orientation: portrait) {}




/*ui*/

.UI-camera {
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
}




/*内容区*/

.container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #fff;
  transition: width 1s, height 1s;
}

.container h3 {
  position: absolute;
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.app_aside {
  position: absolute;
  right: 0;
  top: 0;
  width: 280px;
  height: 100%;
  transition: all 1s;
  z-index: 20;
}

.normalRightColor {
  background: #f7f7f7;
}

.mobleRightColor {
  background: rgba(0, 0, 0, .2);
}

.menu {
  position: fixed;
  height: 48px;
  width: 48px;
  right: 24px;
  top: 24px;
  cursor: pointer;
  background: url('./img/menu.png') no-repeat;
  background-size: contain;
  background-position: center center;
  z-index: 10;
  transition: all 1s;
}

.renderCanvas-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  /* transition: width 0.5s, height 0.5s; */
}

.renderCanvas-container canvas {
  width: 100%;
  height: 100%;
}

.app_title {
  z-index: 999;
}

.titleBtn {
  position: absolute;
  top: 24px;
  right: 24px;
}

.rightBtn {
  position: absolute;
  bottom: 24px;
  right: 20px;
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

.hidden {
  display: none
}

.hen {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
}

.hen div {
  width: 260px;
  height: 198px;
  background: rgba(250, 250, 250, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.hen div img {
  width: 72px;
  height: 72px;
  display: block;
  margin: 32px auto;
}

.hen div span {
  width: 192px;
  height: 42px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #525252;
  text-align: center;
  line-height: 21px;
  display: block;
  margin: 0 auto;
}

.leftMask {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 280px);
  height: 100%;
  background: #5caefd;
  z-index: 999;
  opacity: 0;
}
.Tip{
  padding: 0 10px;
  position: fixed;
  display: inline-block;
  width: 450px;
  height: 48px;
  border-radius: 100px;
  z-index: 99;
  line-height: 46px;
  font-weight: normal;
  border: 2px solid #ddd;
  font-size: 18px;
  color: #333;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  top: 30px;
}
</style>
