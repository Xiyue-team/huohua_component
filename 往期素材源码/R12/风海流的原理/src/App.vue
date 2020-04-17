<template>
<div id="app" class="noselect">
  <h3 v-text="title" class="app_title"></h3>
  <div class="container">
    <!--头部-->
    <!--视图区-->
    <div id="renderCanvas"> </div>
  </div>
  <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
  <!--侧边按钮区-->
  <ui-group class="ctrl" type="radio" :margin="15" :groups="groups" v-model="radio"></ui-group>
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
const OFFSET_ANGLE = 15;
const xishu = 0.5; //用于设置贝塞尔曲线的控制点位置
export default {
  name: 'app',
  components: {
    uiBtn,
    uiGroup
  },
  data() {
    return {
      title: '风海流的原理',
      dragable: true,
      groups: [{
        name: 'one',
        txt: '北半球'
      }, {
        name: 'two',
        txt: '南半球'
      }],
      radio: "one",
    }
  },
  created() {
    document.title = this.title;
    this.num = 0;
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
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
  watch: {},
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
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 800;
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
      let buoy = null; //浮标
      let startPos = {};
      let endPos = {};
      let offsetPos = {};
      let flag = false;
      let normalLineGroup = null;
      let offsetLine = null;
      let beisaierLine = null;
      let offsetArrow = null;
      let ball = null;
      let notice = null;
      let timer = null;
      let isMoving = false;
      var initObj = () => {
        buoy = common.createImg([0, 0, 1], 100, 100, 'static/img/buoy.png');
        buoy.name = 'buoy';
        scene.add(buoy);
        selectobjs.push(buoy);
        let plane = common.createPlane(2000);
        plane.position.z = -1;
        scene.add(plane);
        selectobjs.push(plane);
        notice = common.createImg([0, -90, 1], 256, 128, 'static/img/notice.png');
        scene.add(notice);
      }
      var drawTriangle = () => {
        let shape = new THREE.Shape();
        shape.moveTo(0, 1);
        shape.lineTo(0, -1);
        shape.lineTo(-12, -5);
        shape.lineTo(-12, 5);
        let mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({
          color: '#fff'
        }));
        return mesh;
      }
      var moveBuoy = (step, angle, offsetAngle) => {
        this.dragable = false;
        normalLineGroup = new THREE.Group();
        let normalLine = common.createStraightLine([
          [startPos.x, startPos.y, -1],
          [endPos.x, endPos.y, -1]
        ], {
          style: 2,
          color: '#fff'
        })
        //箭头
        let arrow = drawTriangle();
        arrow.position.set(endPos.x, endPos.y, 0);
        arrow.rotation.z = common.radian(angle);
        normalLineGroup.add(normalLine, arrow);
        scene.add(normalLineGroup);
        //画贝塞尔曲线
        let shape = new THREE.Shape();
        shape.moveTo(startPos.x, startPos.y);
        shape.quadraticCurveTo((endPos.x - startPos.x) * xishu + startPos.x, (endPos.y - startPos.y) * xishu + startPos.y, offsetPos.x, offsetPos.y);
        let pointsArr = shape.getPoints(step);
        // 把使用贝塞尔曲线获得的点转换成可以供加粗库用的存放方式
        let vertices = [];

        for (let point of pointsArr) {
          vertices.push(point.x, point.y, 0);
        };
        let num = 2;
        let thiz = this;

        function move() {
          if (num > pointsArr.length) {
            cancelAnimationFrame(timer);
            thiz.dragable = true;
            return;
          }
          // thiz.isMoving = true;
          scene.remove(beisaierLine);
          let calcNum = num * 3;
          let arr = vertices.slice(0, calcNum);
          buoy.position.set(arr[calcNum - 3], arr[calcNum - 2], 1);
          if (num > 5) {
            arr = arr.slice(0, arr.length - 6);
            beisaierLine = common.createLineMesh(arr, '#F8E71C');
            scene.add(beisaierLine);
          }
          num++;
          timer = requestAnimationFrame(move);
        }
        move();
      }
      var calcOffsetPos = () => {
        let offset_angle = this.radio == 'one' ? -OFFSET_ANGLE : OFFSET_ANGLE;
        //计算按下和按上坐标之间长度，然后计算线段角度，加上偏移角度，获得偏移点坐标
        let length = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
        let step = Math.floor(length / 8);
        // 获得直线角度
        let angle = common.angle(Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x));
        if (endPos.y < startPos.y) {
          angle = 360 + angle;
        }
        //获取偏移角度
        let offsetAngle = angle + offset_angle;
        offsetAngle = offsetAngle < 360 ? offsetAngle < 0 ? (360 + offsetAngle) : offsetAngle : offsetAngle % 360;
        let offsetRadian = common.radian(offsetAngle);
        offsetPos.x = length * cos(offsetRadian) + startPos.x;
        offsetPos.y = length * sin(offsetRadian) + startPos.y;
        moveBuoy(step, angle, offsetAngle);
        return offsetAngle;
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
        //虚线场景
      };
      initObj();
      animate();
      //事件函数
      var onDocumentMouseDown = (event) => {
        if (!this.dragable) return;
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
          if (selectobj.name == "buoy") {
            scene.remove(normalLineGroup, beisaierLine, notice);
            flag = true;
            startPos.x = buoy.position.x;
            startPos.y = buoy.position.y;
          }
        }
      };
      var onDocumentMouseUp = (event) => {
        if (!flag) {
          return;
        }
        flag = false;
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            selectobj = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
          }
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y, b;
            x = obj.x;
            y = obj.y;
          }
          endPos.x = x;
          endPos.y = y;
          calcOffsetPos();

        }
      };
      let touchId = 0;
      var onDocumentTouchStart = (event) => {
        if (!this.dragable) return;
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
            if (selectobj.name == "buoy") {
              scene.remove(normalLineGroup, beisaierLine, notice);
              flag = true;
              startPos.x = buoy.position.x;
              startPos.y = buoy.position.y;
              renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
            }
          }
        }
      };
      var onDocumentTouchEnd = (event) => {
        if (!flag) {
          return;
        }
        flag = false;
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.changedTouches[0].identifier == touchId) {
          var mouse = {};
          mouse.x = ((event.changedTouches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.changedTouches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              selectobj = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              var obj = intersection.sub(offset),
                x, y, b;
              x = obj.x;
              y = obj.y;
            }
            endPos.x = x;
            endPos.y = y;
            calcOffsetPos();
            this.dragable = false;
            renderer.domElement.removeEventListener('touchend', onDocumentTouchEnd);
          }
        }
      };
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      window.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      var resetWidget = () => {
        cancelAnimationFrame(timer);
        buoy.position.set(0, 0, 1);
        scene.remove(normalLineGroup, beisaierLine, ball);
        this.radio = 'one';
        scene.add(notice);
      };
      var TO = function() {
        return {
          reset: resetWidget,
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

.container {
  height: 100%;
  background-image: radial-gradient(circle, #0AB9F1 45%, #0072E0 100%);
}

.app_title {
  font-size: 24px;
  color: #fff;
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


/*滑条样式*/
</style>
