<template>
  <div id="app" class="noselect">
    <h3 v-text="title" class="app_title"></h3>
    <div class="prove" style="pointer-events: none">
      <div class="left">
        <img src="static/UI/a.png" alt="" v-if="bool1">
        <img src="static/UI/b.png" alt="" v-if="bool2">
        <img src="static/UI/c.png" alt="" v-if="bool3"> </div>
      <div class="right flex">
        <img src="static/UI/d.png" alt="" v-if="bool1&&bool2&&bool3"> </div>
    </div>
    <div class="container">
      <!--头部-->
      <!--视图区-->
      <div id="renderCanvas"> </div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //滑块
const {
  sin,
  cos,
  tan,
  PI
} = Math;
const INNER_RADIUS = 150;
const OUTER_RADIUS = 450;
export default {
  components: {
    name: 'app',
    uiBtn,
    uiGroup
  },
  data() {
    return {
      title: '近地卫星与同步卫星',
      isPause: false,
      bool1: false,
      bool2: false,
      bool3: false,
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
    this.TO = this.init();
  },
  watch: {
    isPause() {
      this.TO.action();
    }
  },
  computed: {},
  methods: {
    reset() {
      this.TO.reset();
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        controls = null,
        isMob = null,
        selectobjs = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        mouse = new THREE.Vector2(),
        INTERSECTED = null,
        mousedownflag = false;
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 100;
      camera.position.z = 800;
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.minDistance = 400;
      controls.maxDistance = 1200;
      var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
      dirLight1.position.set(600, 600, 300);
      var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
      dirLight2.position.set(-600, -600, -300);
      scene.add(dirLight1, dirLight2);
      var ambientlight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientlight);
      // var light = new THREE.PointLight(0xffffff, 3, 50);
      // light.position.set(OUTER_RADIUS-30, 10, 0);
      // scene.add(light);
      // var light1 = new THREE.PointLight(0xffffff, 3, 40);
      // light1.position.set(INNER_RADIUS, 20, 0);
      // scene.add(light,light1);
      $("#renderCanvas").append(renderer.domElement);
      let comObj = {};
      let x, y, posArr = [];
      let farArr = [];
      let num = 0;
      let timer = null;
      for (let i = 0; i < 362; i += 2) {
        let rad = common.radian(i);
        posArr.push(rad);
      }
      var texture = new THREE.TextureLoader().load('static/img/earthday.jpg');
      var texture1 = new THREE.TextureLoader().load('static/img/cloud.png');
      var texture2 = new THREE.TextureLoader().load('static/img/sky.jpg');
      var initObj = (object) => {
        // comObj.sky = common.createSphere(1000, { segments: 12 });
        // comObj.sky.material = new THREE.MeshPhongMaterial({
        //   map: texture2,
        //   // transparent: true,
        //   side: THREE.BackSide,
        // });
        // scene.add(comObj.sky);
        comObj.earth = common.createSphere(100);
        comObj.earth.name = "touch";
        comObj.earth.material = new THREE.MeshLambertMaterial({
          map: texture,
          // transparent: true,
        });
        comObj.earth.rotation.y = -2.1;
        comObj.cloud = common.createSphere(101);
        comObj.cloud.material = new THREE.MeshLambertMaterial({
          map: texture1,
          transparent: true,
        });
        comObj.cloud.rotation.y = -2;
        scene.add(common.drawCircleLine(INNER_RADIUS, {
          style: 2,
          isLay: true,
          color: '#fff'
        }));
        scene.add(common.drawCircleLine(OUTER_RADIUS, {
          style: 2,
          isLay: true,
          color: '#fff'
        }));
        // scene.add(object);
        [comObj.syncMoon, comObj.nearMoon, comObj.tower] = object.children;
        comObj.syncMoon.scale.set(1.5, 1.5, 1.5);
        comObj.nearMoon.scale.set(1.5, 1.5, 1.5);
        comObj.touchTower = common.createBox(100, 100, 100, {
          opacity: 0
        });
        // comObj.touchTower.visible = false;
        comObj.touchTower.name = 'tower';
        comObj.syncMoon.rotation.y = comObj.nearMoon.rotation.y = -Math.PI / 2;
        comObj.syncMoon.position.set(OUTER_RADIUS, 0, 0);
        comObj.nearMoon.position.set(INNER_RADIUS, 0, 0);
        comObj.touchTower.position.set(105, 63, 0);
        comObj.group = new THREE.Group();
        comObj.tower.rotation.z = -1;
        comObj.touchTower.rotation.z = 1;
        comObj.tower.position.set(85, 53, 0);
        //同步卫星放大范围
        comObj.touchSyncMoon = common.createBox(100, 100, 100, {
          opacity: 0
        });
        comObj.touchNearMoon = common.createBox(100, 100, 100, {
          opacity: 0
        });
        // comObj.touchSyncMoon.visible = false;
        // comObj.touchNearMoon.visible = false;
        comObj.touchSyncMoon.name = 'sync';
        comObj.touchNearMoon.name = 'near';
        comObj.touchSyncMoon.position.set(OUTER_RADIUS, 0, 0);
        comObj.touchNearMoon.position.set(INNER_RADIUS, 0, 0);
        let textA = common.createText('a', 105, 103, 0, '#16263d', 64, );
        let textC = common.createText('c', OUTER_RADIUS, 50, 0, '#16263d', 64);
        comObj.group.add(comObj.earth, comObj.cloud, comObj.tower, comObj.touchTower, comObj.syncMoon, comObj.touchSyncMoon, textA, textC);
        scene.add(comObj.group);
        comObj.nearMoonGroup = new THREE.Group();
        selectobjs.push(comObj.touchTower, comObj.touchNearMoon, comObj.touchSyncMoon, comObj.earth);
        let textB = common.createText('b', INNER_RADIUS, 40, 0, '#16263d', 64);
        comObj.nearMoonGroup.add(comObj.nearMoon, comObj.touchNearMoon, textB);
        scene.add(comObj.nearMoonGroup);
        moveObj();
      }

      function modelPut(obj, mtl) {
        var onProgress = function(xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
          }
        };
        var onError = function(xhr) {};
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('static/obj/');
        mtlLoader.load(mtl, function(materials) {
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath('static/obj/');
          objLoader.load(obj, function(object) {
            initObj(object);
          }, onProgress, onError);
        });
      }
      modelPut('taheweixing.obj', 'taheweixing.mtl');
      var moveObj = () => {
        num++;
        num %= 180;
        let rad = posArr[num];
        comObj.group.rotation.y = rad;
        comObj.nearMoonGroup.rotation.y = rad * 3;
        timer = setTimeout(moveObj, 80);
      }
      var action = () => {
        if (this.isPause) {
          clearTimeout(timer);
        } else {
          moveObj();
        }
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
        //虚线场景
      };
      animate();
      //事件函数
      var onDocumentMouseDown = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
          selectobj = intersects[0].object;
          if (selectobj.name == "tower") {
            this.bool1 = !this.bool1;
          } else if (selectobj.name == "near") {
            this.bool2 = !this.bool2;
          } else if (selectobj.name == "sync") {
            this.bool3 = !this.bool3;
          } else if (selectobj.name == "touch") {
            this.isPause = !this.isPause;
          }
        }
      };
      let touchId = 0;
      var onDocumentTouchStart = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          touchId = event.touches[0].identifier
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            if (selectobj.name == "tower") {
              this.bool1 = !this.bool1;
            } else if (selectobj.name == "near") {
              this.bool2 = !this.bool2;
            } else if (selectobj.name == "sync") {
              this.bool3 = !this.bool3;
            } else if (selectobj.name == "touch") {
              this.isPause = !this.isPause;
            }
          }
        }
      };
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      // window.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
          camera.aspect = mainWidth / mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
        }, 200)
      });
      var resetWidget = () => {
        camera.position.set(0, 100, 800);
        camera.lookAt(0, 0, 0);
        this.bool1 = this.bool2 = this.bool3 = false;
        num = 0;
        this.isPause = false;
        comObj.group.rotation.y = 0;
        comObj.nearMoonGroup.rotation.y = 0;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          action
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



/*ui*/


/*内容区*/

#app {
  /*background: rgba(13,65,141,0.9);*/
  background: #9dc7fe;
}

.container {
  height: 100%;
  /* background-image: radial-gradient(circle, #0AB9F1 45%, #0072E0 100%); */
}

.app_title {
  font-size: 24px;
  color: #16263d;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: none;
  position: relative;
  overflow: hidden;
}

canvas {
  position: absolute;
}

#app .aside_reset {
  position: fixed;
  right: 24px;
  top: 24px;
}

.ctrl {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.btn {
  position: absolute;
  background: #6059A2;
  width: 60px;
  height: 60px;
  right: 24px;
  bottom: 24px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn img {
  width: 18px;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.play:active,
.pause:active {
  border: 2px solid #0ff;
}

.prove {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  z-index: 10;
}

.prove img {
  width: 100%;
}

.left {
  /*flex-shrink: 1;*/
  flex-grow: 1;
}

.right {
  width: 30%;
  flex-shrink: 0;
  /*height:100%;*/
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}



/*滑条样式*/

</style>
