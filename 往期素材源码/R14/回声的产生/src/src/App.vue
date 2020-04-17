<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title" style="color: black"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--侧边按钮区-->
    <div class="ctrl">
      <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
      <ui-slider v-model="value" :boxWidth="240" :boxHeight="128" :title="'墙体与声源之间的距离(km)'" :piecewise="true" :piecewiseLabel="true" :dragable="true" :clickable="false" :tooltip="false" :speed="1" :noBlueProcess="false" :data="[0.5,1,1.5]"></ui-slider>
      <ui-btn type="switch" v-model="switch_checked" class="switch">敲锣</ui-btn>
    </div>
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; // 滑条
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider,
  },
  data() {
    return {
      title: '回声的产生',
      switch_checked: false,
      value: 0.5,
      TO: null
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
  computed: {},
  watch: {
    value(v) {
      this.TO.move(v);
      this.TO.removeLine();
    },
    switch_checked(v) {
      if (v) {
        this.TO.gongMouseAni();
        if (this.value === 0.5) {
          this.TO.difGongWave(1, 4, -110);
        } else if (this.value === 1) {
          this.TO.difGongWave(4, 7, -275);
        } else {
          this.TO.difGongWave(7, 10, -440);
        }
      } else {
        this.TO.removeLine();
      }
    }
  },
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
        offsetLeft = null,
        offsetTop = null,
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        INTERSECTED = null,
        mousedownflag = false,
        cube = null,
        moveX = -160,
        circle = null,
        selectobjs = [],
        selectobj = null,
        comObj = {},
        raycaster = new THREE.Raycaster(),
        mouse = new THREE.Vector2(),
        isMob = /iPad|Android/g.test(navigator.userAgent);

      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      offsetLeft = parseInt($('#renderCanvas').offset().left);
      offsetTop = parseInt($('#renderCanvas').offset().top);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 0);
      renderer.toneMapping = THREE.LinearToneMapping;
      renderer.setSize(mainWidth, mainHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMapSoft = true;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, mainWidth / mainHeight, 0.1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 1000;
      camera.lookAt(scene.position);

      var pointLight = new THREE.PointLight(0xD3D3D3, 1, 4000);
      pointLight.position.set(-1200, 800, 200);
      scene.add(pointLight);

      var spotLight = new THREE.SpotLight(0xD3D3D3, 1, 4000);
      spotLight.position.set(-1200, 2500, 200);
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 5000;
      spotLight.shadow.mapSize.height = 5000;
      scene.add(spotLight);

      var ambientlight = new THREE.AmbientLight(0xcccccc);
      scene.add(ambientlight);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);


      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      document.addEventListener('touchmove', onDocumentTouchMove, false);
      document.addEventListener('touchend', onDocumentTouchEnd, false);
      // 事件函数
      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
          if (lineArr.length !== 0) {
            removeLine();
          }
          selectobj = intersects[0].object;
          mousedownflag = true;
          // controls.enableRotate = false;
          var selectobjName = selectobj.name;
          if (selectobjName.includes('gongImg')) {
            gongMouseAni();
            difGongWave((parseInt(-moveX / 60) - 1), parseInt(-moveX / 60) + 2, -80 * (parseInt(-moveX / 60) - 1));
          }
        }
      }

      function onDocumentMouseMove(event) {
        if (mousedownflag) {
          event.preventDefault();
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x;
            moveX = obj.x;
            move(moveX);
          }
        }
      }

      function onDocumentMouseUp(event) {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      }

      function onDocumentTouchStart(event) {
        if (mousedownflag) {
          event.preventDefault();
          if (event.touches.length === 1) {
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
          }
          if (intersects.length > 0) {
            if (lineArr.length !== 0) {
              removeLine();
            }
            selectobj = intersects[0].object;
            mousedownflag = true;
            // controls.enableRotate = false;
            var selectobjName = selectobj.name;
            if (selectobjName.includes('gongImg')) {
              gongMouseAni();
              difGongWave((parseInt(-moveX / 60) - 1), parseInt(-moveX / 60) + 2, -80 * (parseInt(-moveX / 60) - 1));
            }
          }
        }
      }

      function onDocumentTouchMove(event) {
        if (mousedownflag) {
          event.preventDefault();
          if (event.touches.length === 1) {
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
          }
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x;
            moveX = obj.x;
            move(moveX);
          }
        }
      }

      function onDocumentTouchEnd(event) {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      }

      // 创建声波
      let wave1 = common.CircleLine(30, { color: '#696969', isLay: false }, 226);
      wave1.position.set(0, 0, 0);
      let lineArr = [];
      let lineGroup = new THREE.Group();
      scene.add(lineGroup);
      // scene.add(wave1);

      var initScene = () => {
        //地面
        var planeGeometry = new THREE.PlaneGeometry(1000, 250, );
        var planeMaterial = new THREE.MeshLambertMaterial({
          color: '#696969',
          side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = 0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -200;
        plane.position.z = 0;
        scene.add(plane);

        // 墙体
        comObj.box = common.createBox(30, 400, 250, { color: '#C0C0C0' });
        comObj.box.castShadow = true;
        comObj.box.position.x = -160;
        comObj.box.position.y = 0;
        comObj.box.position.z = 0;
        comObj.box.name = 'wall';
        selectobjs.push(comObj.box);
        scene.add(comObj.box);

        // 锣杆
        comObj.tipImg = common.createImg([65, -50, 0], 358, 538, 'static/UI/gong2.png');
        comObj.tipImg.scale.set(0.5, 0.5, 0.5);
        scene.add(comObj.tipImg);
        // 锣体
        comObj.gongImg = common.createImg([40, 0, 0], 170, 170, 'static/UI/gong1.png');
        comObj.gongImg.scale.set(0.5, 0.5, 0.5);
        comObj.gongImg.name = 'gongImg';
        selectobjs.push(comObj.gongImg);
        scene.add(comObj.gongImg);

        //人
        comObj.tipImg = common.createImg([85, -50, 640], 90, 181, 'static/UI/person.png');
        comObj.tipImg.scale.set(0.3, 0.3, 0.3);
        scene.add(comObj.tipImg);
        //提示：墙壁可左右拖动
        comObj.prompt1Img = common.createImg([-200, 260, 0], 292, 120, 'static/UI/prompt1.png');
        comObj.prompt1Img.scale.set(0.5, 0.5, 0.5);
        scene.add(comObj.prompt1Img);
        //提示：敲击铜锣试一试
        comObj.prompt2Img = common.createImg([30, 120, 0], 292, 120, 'static/UI/prompt2.png');
        comObj.prompt2Img.scale.set(0.5, 0.5, 0.5);
        scene.add(comObj.prompt2Img);
      }
      initScene();

      let move = (v) => {
        if (v < -480 || v > -80) {
          return;
        }
        comObj.box.position.x = v;
        comObj.prompt1Img.visible = false;
        this.switch_checked = false;
      }
      // 锣抖动动画
      function gongMouseAni() {
        let timer1 = null;
        let number = 1;

        function gongmove() {
          if (number < 0) {
            clearTimeout(timer1);
            return;
          }
          comObj.gongImg.position.set(5 * number + 40, 3 * number, 0);
          number--;
          timer1 = setTimeout(gongmove, 300);
        }
        gongmove();
      }

      function gongWave({ count, posX, posY = 0, rotate = 0, startX = 0, startY = 0 } = {}, callback) {
        function cloneWave(wave) {
          let zoom = 0;
          let num = 0;
          let timer = null;

          function clone() {
            if (num > count) {
              clearTimeout(timer);
              callback && callback();
              return;
            }
            let wave2 = wave.clone();
            wave2.rotation.z = rotate;
            wave2.position.set(posX * num + startX, posY * num + startY, 0);
            wave2.scale.set(zoom + 1, zoom + 1, zoom + 1);
            lineArr.push(wave2);
            lineGroup.add(wave2);
            num++;
            zoom += 0.2;
            timer = setTimeout(clone, 200);
            window.timer = timer;
          }
          clone();
        }
        cloneWave(wave1);
      }

      function difGongWave(number1, number2, initialposition) {
        comObj.prompt2Img.visible = false;
        gongWave({ count: number1, posX: -55 }, function() {
          gongWave({ count: number2, posX: 55, startY: -90, rotate: Math.PI, startX: initialposition })

        });
        gongWave({ count: 2, posX: 40, posY: -25, rotate: Math.PI * 5 / 6, startX: 75, startY: -25 });
      }
      // 移除声波
      function removeLine() {
        lineGroup.remove(...lineArr);
        lineArr = [];
        clearTimeout(window.timer);
        moveX = comObj.box.position.x;
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
      };
      animate();
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
          camera.aspect = mainWidth / mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
          // composer.setSize(mainWidth, mainHeight);
        }, 200)
      });
      var resetWidget = () => {
        this.switch_checked = false;
        this.value = 0.5;
        comObj.prompt1Img.visible = true;
        comObj.prompt2Img.visible = true;
        comObj.box.position.x = -160;
        removeLine();
      };
      var TO = function() {
        return {
          reset: resetWidget,
          difGongWave,
          move,
          removeLine,
          gongMouseAni
        }
      };
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
  /*background-color: #fff;*/
  /*background-image: radial-gradient(circle at center, #174d89, #1a2e45);*/
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

.UI-camera {
  width: 80px;
  height: 80px;
  cursor: this . pointer;
}







/*内容区*/

.container {
  width: 100%;
  float: left;
  height: 100%;
}

.container h3 {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 24px;
  color: #fff;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  z-index: 100;
}

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: none;
  position: relative;
  overflow: hidden;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}

canvas {
  position: absolute;
  z-index: 98;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
  z-index: 9999;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}

.ctrl {
  /*position: absolute;*/
  bottom: 24px;
  right: 24px;
  width: 240px;
  z-index: 99;
  position: absolute;
}

.switch {
  background: rgba(255, 255, 255, 0.6) !important;
  border: 0 solid rgba(0, 0, 0, 0.10) !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15) !important;
  border-radius: 6px !important;
  color: #000000 !important;
}

</style>
