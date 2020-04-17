<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
      <div class="prove" v-show="checked1">
        cos(α-β)=OM=OB+BM
      </div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked">辅助线</ui-btn>
      <ui-btn type="switch" v-model="checked1">证明</ui-btn>
    </div>
    <!--侧边按钮区-->
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数; 
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
let { sin, cos, PI, tan } = Math;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '两角差的余弦公式的证明（单位圆三角形法）',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      checked: false,
      checked1:false,
      alpha: 60,
      beta: 45,
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
        axis = null,
        isMob = null,
        selectobjs = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        mouse = new THREE.Vector2(),
        INTERSECTED = null,
        mousedownflag = false,
        circle = null;
      let touchA = {};
      let touchB = {};
      let touchAImg = null;
      let touchBImg = null;
      let touchAGroup = null;
      let touchBGroup = null;
      let P = {};
      let A = {};
      let yanChang = {};
      let obj = null;
      let obj1 = null;
      let yanChangLine = null;
      let timer = null; //控制动态辅助线的定时器
      let dynamicGroup = null;
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
      camera.position.z = 1000;
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
      var createObj1 = () => {
        if (circle != null) {
          scene.remove(circle);
        }
        var vertices = [];
        for (var i = 0; i < 361; i = i + 4) {
          vertices.push(new THREE.Vector3(300 * Math.cos(i * Math.PI / 180), 300 * Math.sin(i * Math.PI / 180), 0));
        }
        circle = common.createLineMesh(vertices, '#000', 3, 2);
        scene.add(circle);
        touchA.y = 400 * Math.sin(this.alpha * Math.PI / 180);
        touchA.x = Math.sqrt(400 * 400 - Math.pow(touchA.y, 2));
        touchB.y = 400 * Math.sin(this.beta * Math.PI / 180);
        touchB.x = Math.sqrt(400 * 400 - Math.pow(touchB.y, 2));
        createObj();
      };
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj, touchAGroup, touchBGroup, obj1);
          selectobjs = [];
        }
        cancelAnimationFrame(timer);
        scene.remove(dynamicGroup);
        //计算两点坐标
        //创建可拖动的touchA点
        touchAGroup = new THREE.Object3D();
        if (!touchAImg) {
          touchAImg = common.createImg([common.vec3(0, 0, 1)], 116, 58, "static/UI/A@2x.png");
        }
        touchAImg.name = 'A';
        touchAImg.rotation.z = (this.alpha - 90) * Math.PI / 180;
        selectobjs.push(touchAImg);
        touchAGroup.add(touchAImg);
        touchAGroup.position.x = touchA.x;
        touchAGroup.position.y = touchA.y;
        touchAGroup.position.z = 1;
        //创建可拖动的touchB点
        touchBGroup = new THREE.Object3D();
        if (!touchBImg) {
          touchBImg = common.createImg([common.vec3(0, 0, 1)], 116, 58, "static/UI/A@2x.png");
        }
        touchBImg.name = 'B';
        touchBImg.rotation.z = (this.beta - 90) * Math.PI / 180;
        selectobjs.push(touchBImg);
        touchBGroup.add(touchBImg);
        touchBGroup.position.x = touchB.x;
        touchBGroup.position.y = touchB.y;
        touchBGroup.position.z = 2;
        let angleA, angleB;
        if (this.alpha >= this.beta) {
          [angleA, angleB] = changeRoles(touchB, touchA, this.alpha, this.beta);
        } else {
          [angleA, angleB] = changeRoles(touchA, touchB, this.beta, this.alpha);
        }
        obj = new THREE.Object3D();
        //创建原点到两个拖动点的连线
        let lineA = common.createStraightLine([
          [0, 0, 0],
          [touchA.x, touchA.y, 0]
        ], 3, 2, this.alpha>this.beta?'#E30000':'#7000D3');
        let lineB = common.createStraightLine([
          [0, 0, 0],
          [touchB.x, touchB.y, 0]
        ], 3, 2, this.alpha>this.beta?'#7000D3':'#E30000');
        obj.position.x = 0;
        obj.position.y = 0;
        obj.position.z = 1;
        obj1 = new THREE.Object3D();
        let fuzhuLine = common.createStraightLine([
          [A.x, 0, 0],
          [A.x, A.y, 0],
          [P.x, P.y, 0],
          [P.x, 0, 0]
        ], 2, 2, '#0094FF');
        //创建P点到C点的连线
        let linePC = common.createStraightLine([
          [P.x, P.y, 0],
          [A.x, P.y, 0]
        ], 2, 2, '#0094FF');
        //创建A,B,P,M,C
        let textA = common.createText('A', A.x - 10, A.y + 20, 0, '#1500FF', 20);
        let textB = common.createText('B', A.x, 0, 0, '#1500FF', 20);
        let textP = common.createText('P', P.x+5, P.y + 35, 0, '#1500FF', 20);
        let textM = common.createText('M', P.x, 0, 0, '#1500FF', 20);
        let textC = common.createText('C', A.x - 12, P.y + 15, 0, '#1500FF', 20);
        obj1.add(fuzhuLine, linePC, textC, textM, textP, textB, textA);
        this.checked&&scene.add(obj1);

        //创建延长线
        // var color = this.alpha > this.beta ? '#EF732C' : '#2E4DA1';
        // yanChangLine = common.createStraightLine([
        //   [0, 0, 0],
        //   [yanChang.x, yanChang.y, 0]
        // ], 2, 2, color);
        // yanChangLine.visible = Math.abs(this.alpha - this.beta) < 90 || Math.abs(this.alpha - this.beta) > 270 ? false : true;
        obj.add(lineA, lineB, angleA, angleB);
        scene.add(obj, touchAGroup, touchBGroup);
      };
      var changeRoles = (obj1, obj2, angle1, angle2) => {
        let angleA, angleB;
        P = countPPos(obj1);
        yanChang = countPPos(obj2);
        yanChang.x = -yanChang.x;
        yanChang.y = -yanChang.y;
        A = countAPos(obj2, P);
        angleA = drawAngle(0, angle1, 65, '#1B8B72', '#A6FAA8', 'α', -3);
        angleB = drawAngle(angle2, angle1 - angle2, 35, '#E30000', '#FF5D00', 'β', -2);
        return [angleA, angleB];
      }
      var countAPos = (obj, obj1) => {
        let point = {};
        let k1 = obj.y / obj.x;
        let k2 = -1 / k1;
        let b2 = obj1.y - k2 * obj1.x;
        point.x = b2 / (k1 - k2);
        point.y = k1 * point.x;
        return point;
      };
      var countPPos = (obj) => {
        let point = {};
        let k = obj.y / obj.x;
        let radianK = Math.atan(k);
        if (!Number.isFinite(k)) {
          radianK = Math.PI / 2;
        }
        point.x = 300 * Math.cos(radianK);
        point.y = 300 * Math.sin(radianK);
        point.x = obj.x >= 0 ? point.x : -point.x;
        point.y = obj.x >= 0 ? obj.x == 0 ? obj.y > 0 ? point.y : -point.y : point.y : -point.y;
        return point;
      };
      var countYanChangPos = () => {
        let A = {};
        let k = touchA.y / touchA.x;
        let radianK = Math.atan(k);
        if (!Number.isFinite(k)) {
          radianK = Math.PI / 2;
        }
        A.x = 300 * Math.cos(radianK);
        A.y = 300 * Math.sin(radianK);
        A.x = touchA.x >= 0 ? A.x : -A.x;
        A.y = touchA.x >= 0 ? touchA.x == 0 ? touchA.y > 0 ? A.y : -A.y : A.y : -A.y;
        yanChang.x = -A.x;
        yanChang.y = -A.y;
      };
      var countAngle = (obj) => {
        let angle = 0;
        let sin = Math.asin(obj.y / 400);
        angle = sin * 180 / Math.PI;
        if (obj.x >= 0 && obj.y >= 0) {
          angle = angle;
        } else if (obj.x < 0 && obj.y >= 0) {
          angle = 180 - angle;
        } else if (obj.x < 0 && obj.y < 0) {
          angle = 180 - angle;
        } else if (obj.x >= 0 && obj.y < 0) {
          angle = 360 + angle;
        }
        return angle;
      };
      var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
        let dx, dy, vertices = [];
        let obj = new THREE.Object3D();
        for (var i = startangle; i < endangle + startangle + 1; i++) {
          dx = size * Math.cos(Math.PI / 180 * i);
          dy = size * Math.sin(Math.PI / 180 * i);
          vertices.push(common.vec3(dx, dy, index));
        }
        let line = common.createLineMesh(vertices, color, 3, 1);
        let endradian = common.radian(endangle);
        let startradian = common.radian(startangle);
        let circle = common.createCircle([0, 0, index], size, circleColor, startradian, endradian,0.8);
        let angle = 0;
        if (startangle === 0) {
          angle = endangle / 2;
        } else {
          angle = startangle + endangle / 2;
        }
        let text = common.createText(font, (size + 15) * cos(common.radian(angle))-5, (size + 15) * sin(common.radian(angle)) + 20, 2, '#BD00D4', 24);
        obj.add(line, circle, text);
        return obj;
      };
      let count = 50;
      var dynamicLine = () => {
        let num = 0;
        cancelAnimationFrame(timer);
        let vertices = [];
        //P->A
        let stepX1 = (A.x - P.x) / count;
        let stepY1 = (A.y - P.y) / count;
        //A->B
        let stepY2 = (0 - A.y) / count;
        //P->M
        let stepY3 = (0 - P.y) / count;
        //P->C
        let stepX4 = (A.x - P.x) / count;
        if (this.checked) {
          showLine();
        } else {
          scene.remove(dynamicGroup,obj1);
          // obj1.visible = false;
        }

        function showLine() {
          // PA != null ? scene.remove(PA) : '';
          if (dynamicGroup != null) {
            scene.remove(dynamicGroup);
          }
          dynamicGroup = new THREE.Object3D();
          num++;
          if (num >= count) {
            cancelAnimationFrame(timer);
            // obj1.visible = true;
            scene.add(obj1);

            scene.remove(dynamicGroup);
            return;
          }
          vertices = [];
          vertices.push(common.vec3(P.x, P.y, -1));
          vertices.push(common.vec3(P.x + num * stepX1, P.y + num * stepY1, -1));
          let PA = common.createLineMesh(vertices, '#0094FF', 2, 2 );
          let AB = common.createStraightLine([
            [A.x, A.y, -1],
            [A.x, A.y + num * stepY2, -1]
          ], 2, 2, '#0094FF');
          vertices = [];
          vertices.push(common.vec3(A.x, A.y, -1));
          vertices.push(common.vec3(A.x, A.y + num * stepY2, -1));
          let PM = common.createStraightLine([
            [P.x, P.y, -1],
            [P.x, P.y + num * stepY3, -1]
          ], 2, 2, '#0094FF');
          let PC = common.createStraightLine([
            [P.x, P.y, -1],
            [P.x + stepX4 * num, P.y, -1]
          ], 2, 2, '#0094FF');
          dynamicGroup.add(PA, AB, PM, PC);
          scene.add(dynamicGroup);
          timer = requestAnimationFrame(showLine);
        }
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
            if (x < 0 && y < 0) {
              return;
            } else {
              if (x < 0) {
                x = 0;
              } else if (x > 400) {
                x = 400;
              }
              if (y < 0) {
                y = 0;
              } else if (y > 400) {
                y = 400;
              }
            }
            var ang = Math.atan(y / x);
            if (selectobj.name === 'A') {
              ang = Math.atan(y / x);
              if (x >= 0) {
                x = 400 * Math.cos(ang);
                y = 400 * Math.sin(ang);
              } else {
                x = -400 * Math.cos(ang);
                y = -400 * Math.sin(ang);
              }
              touchA.y = y
              touchA.x = x
              this.alpha = countAngle(touchA);
            } else if (selectobj.name === 'B') {
              ang = Math.atan(y / x);
              if (x >= 0) {
                x = 400 * Math.cos(ang);
                y = 400 * Math.sin(ang);
              } else {
                x = -400 * Math.cos(ang);
                y = -400 * Math.sin(ang);
              }
              touchB.y = y;
              touchB.x = x;
              this.beta = countAngle(touchB);
            }
            createObj();
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
            if (x < 0 && y < 0) {
              return;
            } else {
              if (x < 0) {
                x = 0;
              } else if (x > 400) {
                x = 400;
              }
              if (y < 0) {
                y = 0;
              } else if (y > 400) {
                y = 400;
              }
            }
            var ang = Math.atan(y / x);
            if (selectobj.name === 'A') {
              ang = Math.atan(y / x);
              if (x >= 0) {
                x = 400 * Math.cos(ang);
                y = 400 * Math.sin(ang);
              } else {
                x = -400 * Math.cos(ang);
                y = -400 * Math.sin(ang);
              }
              touchA.y = y
              touchA.x = x
              this.alpha = countAngle(touchA);
            } else if (selectobj.name === 'B') {
              ang = Math.atan(y / x);
              if (x >= 0) {
                x = 400 * Math.cos(ang);
                y = 400 * Math.sin(ang);
              } else {
                x = -400 * Math.cos(ang);
                y = -400 * Math.sin(ang);
              }
              touchB.y = y;
              touchB.x = x;
              this.beta = countAngle(touchB);
            }
            createObj();
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
        //虚线场景
      };
      if (this.isFirst) {
        animate();
        scene.add(common.createAxis());
        createObj1();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        this.isFirst = false;
      }
      var resetWidget = () => {
        this.alpha = 60;
        this.beta = 45;
        this.checked = false;
        this.checked1 = false;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
        createObj1();
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

#app .btn-switch {
  margin-top:24px;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}
.ctrl {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 100px;
}
.prove {
  position: fixed;
  left: 90px;
  bottom: 36px;
  font-size: 20px;
}
</style>
