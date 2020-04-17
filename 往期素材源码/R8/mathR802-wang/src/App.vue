<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <div class="prove" v-show="checked1">AC=CD+DA</div>
    <!--返回按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked">辅助线</ui-btn>
      <ui-btn type="switch" v-model="checked1">证明</ui-btn>
    </div>
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
//定义全局变量，方便修改
let { sin, cos, PI, tan } = Math;
const width = 200;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '两角差的正弦公式的证明（直角三角形法）',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
      checked: false,
      checked1: false,
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
      this.TO.dynamicLine();
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
        obj2 = null,
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
      let B = { x: 0, y: 0 };
      let C = { x: width, y: 0 };
      let alpha = 60;
      let beta = 45;
      let A = {};
      let D = {};
      let E = {};
      let timer = null; //控制辅助线动态出现的定时器
      let dynamicLineDE = null; //需要动态生成的线
      let touchDImg = null;
      let touchD = {};
      isMob = /iPad|Android/g.test(navigator.userAgent);
      if (isMob) {
        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
      } else {
        renderer = new THREE.CanvasRenderer();
      }
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 600;
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = false;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj);
        }
        obj = new THREE.Object3D();
        A.x = D.x = width;
        A.y = tan(common.radian(alpha)) * width;
        D.y = tan(common.radian(beta)) * width;
        // 创建三角形
        let triangle = common.createStraightLine([
          [A.x, A.y, -1],
          [B.x, B.y, -1],
          [C.x, C.y, -1],
          [A.x, A.y, -1]
        ], 3, 3, '#000');
        //BD直线
        let angleA = drawAngle(alpha, 40, '#1B8B72', '#94FC77', 'α');
        //添加文字
        let textB = common.createText('B', -20, 10, 0, '#000', 20);
        let textA = common.createText('A', A.x + 15, A.y + 30, 0, '#000', 20);
        let textC = common.createText('C', C.x + 15, 10, 0, '#000', 20);
        obj.add(triangle, angleA, textB, textA, textC);
        obj.position.x = -width / 2;
        obj.position.y = -A.y / 2;
        // drawFuzhu();
        scene.add(obj);
        createObj1();
      };
      var createObj1 = () => {
        if (obj2 != null) {
          scene.remove(obj2, obj1);
        }
        cancelAnimationFrame(timer);
        scene.remove(dynamicLineDE);
        obj2 = new THREE.Object3D();
        if (!touchDImg) {
          touchDImg = common.createImg([common.vec3(0, 0, 1)], 48, 48, "static/UI/A@2x.png");
        }
        selectobjs.push(touchDImg.children[0]);
        touchDImg.position.set(D.x, D.y, 0);
        let lineBD = common.createStraightLine([
          [D.x, D.y, -1],
          [B.x, B.y, -1]
        ], 3, 2, '#E30000');
        let textD = common.createText('D', D.x + 25, D.y + 15, 0, '#1500FF', 20);
        let angleB = drawAngle(beta, 20, '#E30000', '#FF5D00', 'β');
        obj2.add(touchDImg, lineBD, textD, angleB);
        obj2.position.x = -width / 2;
        obj2.position.y = -A.y / 2;
        scene.add(obj2);
        // drawFuzhu();
        countAPos();
        this.checked&&scene.add(obj1);

      }
      // var drawFuzhu = () => {
      //   //求E点坐标
      //   //先求出BD长度，在根据角度求出BE长度
      //   obj1 = new THREE.Object3D();
      //   let BD = Math.sqrt(width ** 2 + D.y ** 2);
      //   beta = Math.acos(width / BD);
      //   beta = common.angle(beta);
      //   let BE = BD / cos(common.radian(alpha - beta));
      //   E.x = BE * sin(common.radian(90 - alpha));
      //   E.y = BE * cos(common.radian(90 - alpha));
      //   let lineED = common.createStraightLine([
      //     [D.x, D.y, -1],
      //     [E.x, E.y, -1]
      //   ], 2, 2, '#7ED321');
      //   //画垂直角
      //   let verticalA = common.createStraightLine([
      //     [-10, 0, -2],
      //     [-10, 10, -2],
      //     [0, 10, -2]
      //   ], 3, 2, '#7ED321');
      //   verticalA.rotation.z = common.radian(30);
      //   verticalA.position.set(D.x, D.y, 0);
      //   let textE = common.createText('E', E.x - 10, E.y + 20, 0, '#000', 20);
      //   obj1.add(lineED, verticalA, textE);
      //   obj1.position.x = -width / 2;
      //   obj1.position.y = -A.y / 2;
      // };
      var countAPos = () => {
        obj1 = new THREE.Object3D();
        let BD = Math.sqrt(width ** 2 + D.y ** 2);
        beta = Math.acos(width / BD);
        beta = common.angle(beta);
        let k1 = A.y / A.x;
        let k2 = -1 / k1;
        let b2 = D.y - k2 * D.x;
        E.x = b2 / (k1 - k2);
        E.y = k1 * E.x;
        let lineED = common.createStraightLine([
          [D.x, D.y, -1],
          [E.x, E.y, -1]
        ], 2, 2, '#0094FF');
        //画垂直角
        let verticalA = common.createStraightLine([
          [-10, 0, -2],
          [-10, 10, -2],
          [0, 10, -2]
        ], 3, 2, '#0094FF');
        verticalA.rotation.z = common.radian(150);
        verticalA.position.set(E.x, E.y, 0);
        let textE = common.createText('E', E.x - 10, E.y + 20, 0, '#1500FF', 20);
        obj1.add(lineED, verticalA, textE);
        obj1.position.x = -width / 2;
        obj1.position.y = -A.y / 2;
      };
      
      var dynamicLine = () => {
        cancelAnimationFrame(timer);
        if (this.checked) {
          showLine();
        } else {
          scene.remove(dynamicLineDE);
          scene.remove(obj1);

        }
        let vertices = [],
          num = 0;
        let stepX = (E.x - D.x) / 30;
        let stepY = (E.y - D.y) / 30;

        function showLine() {
          dynamicLineDE != null ? scene.remove(dynamicLineDE) : '';
          num++;
          if (num >= 30) {
            cancelAnimationFrame(timer);
            scene.add(obj1);
            scene.remove(dynamicLineDE);
            return;
          }
          vertices = [];
          vertices.push(common.vec3(D.x, D.y, -1));
          vertices.push(common.vec3(D.x + num * stepX, D.y + num * stepY, -1));
          dynamicLineDE = common.createLineMesh(vertices, 2, 2, '#0094FF');
          dynamicLineDE.position.set(-width / 2, -A.y / 2, 0);
          scene.add(dynamicLineDE);
          timer = requestAnimationFrame(showLine);
        }
      }
      var drawAngle = (angle, size, color, circleColor, font) => {
        let dx, dy, vertices = [];
        let obj = new THREE.Object3D();
        for (var i = 0; i < angle; i++) {
          dx = size * Math.cos(Math.PI / 180 * i);
          dy = size * Math.sin(Math.PI / 180 * i);
          vertices.push(common.vec3(dx, dy, -2));
        }
        let line = common.createLineMesh(vertices, 3, 1, color);
        let radian = common.radian(angle);
        let circle = common.createCircle([0, 0, -2], size, circleColor, 0, radian,0.6);
        let text = common.createText(font, (size + 15) * cos(common.radian(angle / 2)), (size + 15) * sin(common.radian(angle / 2)) + 8, 2, '#BD00D4', 16);
        obj.add(line, circle, text);
        return obj;
      }
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
              x, y, b;
            x = obj.x;
            y = obj.y;
            if (y > 0.5 * A.y) {
              y = 0.5 * A.y;
            } else if (y < 0 - A.y / 2) {
              y = 0 - A.y / 2;
            }
            D.y = y + A.y / 2;
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
              x, y, b;
            x = obj.x;
            y = obj.y;
            if (y > 0.5 * A.y) {
              y = 0.5 * A.y;
            } else if (y < 0 - A.y / 2) {
              y = 0 - A.y / 2;
            }
            D.y = y + A.y / 2;
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
        createObj();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
      }
      var resetWidget = () => {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 600;
        this.checked = false;
        this.checked1 = false;
        beta = 45;
        createObj();
      };
      var TO = function(argument) {
        return {
          reset: resetWidget,
          dynamicLine
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
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
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
  height: calc(100% - 72px);
  outline: none;
  position: relative;
  overflow: hidden;
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

.ctrl {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 100px;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}

.prove {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 36px;
  font-size: 24px;

}

</style>
