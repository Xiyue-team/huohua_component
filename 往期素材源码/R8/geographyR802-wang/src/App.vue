<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--返回按钮-->
    <!--<ui-btn type="reset3" id="button1" class="aside_reset" @click.native="backWidget" :style="'position:absolute;right:92px;'"></ui-btn>-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <ui-group type="button" :groups="groups" v-model="radio" id="buttonGroup"> </ui-group>
    <!-- <ui-btn type="switch" v-model="checked">
      辅助线
    </ui-btn> -->
    <!--侧边按钮区-->
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiGroup from '@/components/UI/uiGroup';
//定义全局变量，方便修改
let { sin, cos, PI, tan } = Math;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider,
    uiGroup
  },
  data() {
    return {
      title: '寒流和暖流',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
      groups: [{
        name: 'one',
        txt: '寒流'
      }, {
        name: 'two',
        txt: '暖流'
      }, ],
      radio: 'one',
      touchP: {
        x: 0,
        y: 200
      }
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
    this.setSideStyle();
    this.TO = this.init();
    window.onresize = () => {
      var cW = $('canvas').width();
      var cH = $('canvas').height();
      $('canvas').css({
        'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
        'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
      });
    };
  },
  computed: {},
  watch: {
    checked() {
      this.TO.showLine();
    },
    radio(v) {
      this.TO.change();
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
        obj = null,
        obj1 = null,
        touchP = null,
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
      let group = null;
      let line = null;
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      let num = 1.8/1322*mainWidth;
      camera =  new THREE.OrthographicCamera(mainWidth/-num,mainWidth/num,mainHeight/num,mainHeight/-num,1,10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 1000;
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      var createBox = (height) => {
        let boxG = new THREE.PlaneGeometry(100, height, 500, 1, 1);
        let boxM = new THREE.MeshBasicMaterial({ color: '#4472c4', wireframe: false, transparent: true, opacity: 1 });
        let box = new THREE.Mesh(boxG, boxM);
        return box;
      }
      //画虚线
      var drawDashLine = () => {
        let obj = new THREE.Object3D();
        var line = common.createStraightLine([
          [-400, -200, -1],
          [400, -200, -1]
        ], 2, 2, '#fff');
        obj.add(line);
        let lineClone;
        for (let i = 1; i < 5; i++) {
          lineClone = line.clone();
          lineClone.position.y = 100 * i;
          obj.add(lineClone);
        }
        scene.add(obj);
      }
      drawDashLine();
      //创建摄氏度文字
      let textGroup1, textGroup2;
      var drawTemperature = () => {
        textGroup1 = new THREE.Object3D();
        let text;
        for (let i = 2; i > -3; i--) {
          text = common.createText(`${(6-i)*2}°C`, -440, i * 100 + 20, 0, '#fff', 28);
          textGroup1.add(text);
        }
        // textGroup1.rotation.x = Math.PI;
        scene.add(textGroup1);
      }
      drawTemperature();
      let arrow = null;
      let arrowGroup = null;
      var createObj1 = () => {
        if (obj !== null) {
          scene.remove(obj, group, obj1, arrowGroup);
        }
        group = new THREE.Object3D();
        arrowGroup = new THREE.Object3D();
        obj = new THREE.Object3D();
        obj1 = new THREE.Object3D();
        // line = common.createStraightLine([
        //   [this.touchP.x, this.touchP.y, 1],
        //   [0, 200, 1]
        // ]);
        // group.add(line);
        //创建箭头
        //计算移动点距离（0，200）距离
        let dis = Math.hypot(this.touchP.x, this.touchP.y - 200);
        let shape = new THREE.Shape();
        if (dis < 30) {
          shape.moveTo(0, -30);
          shape.lineTo(-20, 0);
          shape.lineTo(20, 0);
        } else {
          shape.moveTo(-10, 0);
          shape.lineTo(10, 0);
          shape.lineTo(10, -dis + 30);
          shape.lineTo(20, -dis + 30);
          shape.lineTo(0, -dis);
          shape.lineTo(-20, -dis + 30);
          shape.lineTo(-10, -dis + 30);
        }
        let yanse = this.radio == 'one' ? '#50E3C2' : '#FFA233';
        arrow = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({
          color: yanse
        }))
        arrowGroup.add(arrow);
        arrowGroup.position.y = 200;
        let k = (this.touchP.y - 200) / (this.touchP.x - 0);
        if (!isNaN(k)) {
          if (k > 0) {
            arrow.rotation.z = Math.atan(k) - Math.PI / 2;
          } else if (k < 0) {
            arrow.rotation.z = Math.atan(k) + Math.PI / 2;
          } else {
            if (this.touchP.x > 0) {
              arrow.rotation.z = Math.atan(k) + Math.PI / 2;
            } else {
              arrow.rotation.z = Math.atan(k) - Math.PI / 2;
            }
          }
        }
        scene.add(arrowGroup);
        if (!touchP) {
          touchP = common.createCircle([0, 0, 0], 80, '#fff', 0, Math.PI * 2, 0);
        }
        touchP.position.x = this.touchP.x;
        touchP.position.y = this.touchP.y;
        touchP.position.z = 2;
        selectobjs.push(touchP);
        group.add(touchP);
        scene.add(group);
        let arr = countPos();
        let num = 0;
        let curve, points, geometry, material, splineObject;
        let maxY, maxX;
        for (let i = 2; i >= this.touchP.y / 100; i--) {
          if (i == -3) {
            continue;
          }
          if (this.touchP.y - i * 100 <= -100) {
            maxY = i * 100 - 100;
            maxX = arr[num].x;
          } else {
            maxY = this.touchP.y;
            maxX = this.touchP.x;
          }
          num++;
          curve = new THREE.SplineCurve([
            new THREE.Vector2(-400, i * 100),
            new THREE.Vector2(maxX, maxY),
            new THREE.Vector2(400, i * 100)
          ]);
          points = curve.getPoints(100);
          geometry = new THREE.Geometry().setFromPoints(points);
          material = new THREE.LineBasicMaterial({ color: '#fff', linewidth: 2 });
          splineObject = new THREE.Line(geometry, material);
          obj.add(splineObject);
        }
        let zhixian = null;
        for (let i = -2; i <= this.touchP.y / 100; i++) {
          zhixian = common.createStraightLine([
            [-400, i * 100, -1],
            [400, i * 100, -1]
          ], 3, 2, '#fff');
          obj.add(zhixian);
        }
        scene.add(obj, obj1);
      };
      var countPos = () => {
        let arr = [];
        let x, y, cir;
        for (let i = 2; i >= this.touchP.y / 100; i--) {
          x = (i * 100 - 200 - 100) / (this.touchP.y - 200) * this.touchP.x;
          arr.push({
            x: x,
            y: i * 100 - 100
          })
        }
        return arr;
      }
      var change = () => {
        camera.up.y = this.radio == 'one' ? 1 : -1;
        this.touchP.x = 0;
        this.touchP.y = 200;
        if (this.radio == 'one') {
          textGroup1.rotation.y = 0;
          textGroup1.rotation.x = 0;
        } else {
          textGroup1.rotation.y = Math.PI;
          textGroup1.rotation.x = Math.PI;
        }
        createObj1();
      }
      var createObj = () => {};
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
          mousedownflag = true;
        }
      };
      var onDocumentMouseMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        raycaster.setFromCamera(mouse, camera);
        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y;
            x = obj.x;
            y = obj.y;
            if (y > 200) {
              y = 200;
            } else if (y < -350) {
              y = -350;
            }
            if (x > 260) {
              x = 260;
            } else if (x < -260) {
              x = -260;
            }
            this.touchP.y = y;
            this.touchP.x = x;
            createObj1();
          }
        }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      };
      var onDocumentTouchStart = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
          }
        }
      };
      var onDocumentTouchMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          raycaster.setFromCamera(mouse, camera);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y;
            x = obj.x;
            y = obj.y;
            if (y > 200) {
              y = 200;
            } else if (y < -350) {
              y = -350;
            }
            if (x > 260) {
              x = 260;
            } else if (x < -260) {
              x = -260;
            }
            this.touchP.y = y;
            this.touchP.x = x;
            createObj1();
          }
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      };
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        controls.update();
        //面和实线场景
        renderer.render(scene, camera);
      };
      if (this.isFirst) {
        animate();
        // createBox();
        // scene.add(common.createAxis());
        createObj1();
        // create12Points();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        this.isFirst = false;
      }
      var resetWidget = () => {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
        this.radio = 'one';
        this.touchP.x = 0;
        this.touchP.y = 200;
        createObj1();
      };
      let RET;
      var TO = function(argument) {
        return {
          reset: resetWidget,
          change
        }
      }
      return TO();
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space');
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
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

input, button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}


/*盒模型，padding尺寸不用再减去*/

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

html, body, #app {
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

.UI-camera {
  width: 80px;
  height: 80px;
  cursor: this.pointer;
}


/*内容区*/

.container {
  width: 100%;
  float: left;
  height: 100%;
}

.container h3 {
  font-size: 24px;
  color: #fff;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}
.container .app_title {
  position: fixed;
  left: 0;
  top:0;
  z-index: 10;
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
  background-color: #223B60;
  background-clip: content-box;
}

canvas {
  position: absolute;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

.btn_space {
  padding: 20px;
  width: 100%;
  height: calc(100% - 80px);
  clear: both;
  /*display: flex;*/
  /*align-items: center;*/
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}


/*.btn_space .UI-btn {
    margin-bottom: 10px;
  }*/

#app .btn-switch {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

#app .aside_reset {
  position: fixed;
  right: 0px;
  top: 0px;
  /*background-color:transparent;*/
}

#buttonGroup {
  position: fixed;
  right: 24px;
  bottom: 24px;
}

</style>
