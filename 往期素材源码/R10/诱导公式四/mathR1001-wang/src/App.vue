<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="prove-wrap" v-if="checked1">
        <p class="prove">sin(π-α)=sinα</p>
        <p class="prove">cos(π-α)=-cosα</p>
        <p class="prove">tan(π-α)=-tanα</p>
      </div>
      <!--视图区-->
      <div id="renderCanvas" :style="point_event"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked">π-α</ui-btn>
      <ui-btn type="switch" v-model="checked1" v-if='isShow'>三角函数线</ui-btn>
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
const RADIUS = 300;
const TOUCH_RADIUS = 400;
const THREAD_ADD = 0.05;
const ANGLE_SIZE = 25;
const LINE_WIDTH = 3;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '诱导公式四',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      checked: false,
      checked1: false,
      alpha: 60,
      beta: 0,
      TO: null,
      isClick: true,
      point_event: {
        'pointer-events': 'auto'
      },
      isShow: false,
    }
  },
  created() {
    document.title = this.title;
    this.pre_num = 0;
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
    checked(v) {
      this.TO.lineAnimate(v);
      if (!v) {
        this.checked1 = false;
        this.isShow = false;
        this.TO.showSubline(false);
      }
    },
    checked1(v) {
      if (!this.isClick || !this.checked) {
        this.checked1 = false;
        return;
      }
      this.TO.showSubline(v);
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
      let touchAImg = null;
      let touchAGroup = null;
      let P = {};
      let obj = null;
      let timer = null; //控制移动的定时器
      let max_limit_radius = 0; //设置转动上限
      let min_limit_radius = 0; //设置转动下限
      let circlePGroup = null;
      let copyPGroup = null;
      let textGroup = null; //保存P'的圆点和文字
      let sublineGroup = null; //辅助线组
      let textA = null;
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
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
      $("#renderCanvas").append(renderer.domElement);
      let lineObj = {};
      var initLine = () => {
        lineObj.op = common.unitLine({ color: "#9013FE" });
        lineObj.op1 = common.unitLine({ color: "#FF1DF8" });
        // lineObj.ot = common.unitLine({ color: "#9013FE" });
        // lineObj.ot1 = common.unitLine({ color: "#FF1DF8" });
        lineObj.bb = common.unitLine({ color: "#000" });
        lineObj.mm1 = common.unitLine({ color: "#FF1F3A" });
        lineObj.pm = common.unitLine({ color: "#F89A00" });
        lineObj.pm1 = common.unitLine({ color: "#F89A00" });
        lineObj.tt1 = common.unitLine({ color: "#0DB2FF", width: 4 });
        lineObj.texta = common.createText('α', 0, 0, 2, '#BD00D4', 24);
        lineObj.texta1 = common.createText('π-α', 0, 0, 2, '#BD00D4', 24);
        lineObj.textm = common.createText('M', 0, 0, 0, '#000', 24);
        lineObj.textm1 = common.createText('M\'', 0, 0, 0, '#000', 24);
        lineObj.textt1 = common.createText('T\'', 0, 0, 0, '#000', 24);
        lineObj.textt = common.createText('T', 0, 0, 0, '#000', 24);
        lineObj.circlem = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlem1 = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlet1 = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlet = common.createStrokeCircle(6, '#D0021B');
        lineObj.ot = common.createStraightLine([
          [1, 0, 0],
          [-1, 0, 0]
        ], 2, 3, "#9013FE");
        lineObj.ot1 = common.createStraightLine([
          [1, 0, 0],
          [-1, 0, 0]
        ], 2, 3, "#FF1DF8");
      }
      initLine();
      var createObj1 = () => {
        if (circle != null) {
          scene.remove(circle, circlePGroup, textA, touchAGroup);
        }
        var vertices = [];
        for (var i = 0; i < 361; i = i + 4) {
          vertices.push(RADIUS * Math.cos(i * Math.PI / 180), RADIUS * Math.sin(i * Math.PI / 180), 0);
        }
        circle = common.createLineMesh(vertices, '#000', 3, LINE_WIDTH);
        scene.add(circle);
        touchA.y = TOUCH_RADIUS * Math.sin(this.alpha * Math.PI / 180);
        touchA.x = Math.sqrt(TOUCH_RADIUS * TOUCH_RADIUS - Math.pow(touchA.y, 2));
        textA = common.createText('A(1,0)', RADIUS + 40, 35, 0, '#000', 24);
        circlePGroup = new THREE.Group();
        P = countPPos(touchA);
        let circleP = common.createStrokeCircle(6, '#D0021B');
        let text1 = common.createText('P(x,y)', 40, 20, 0, '#000', 24);
        circlePGroup.add(circleP, text1);
        circlePGroup.position.set(P.x, P.y, 2);
        //创建P'上的原点和文字，需要的时候添加场景并移动位置即可
        textGroup = new THREE.Group();
        let circleP1 = common.createStrokeCircle(6, '#D0021B');
        let text11 = common.createText("P'(-x,y)", 40, -20, 0, '#000', 24);
        textGroup.add(circleP1, text11);
        scene.add(textA, circlePGroup);
        if (!touchAImg) {
          touchAGroup = new THREE.Object3D();
          touchAImg = common.createImg([common.vec3(0, 0, 2)], 128, 64, "static/UI/A@2x.png");
          touchAImg.name = 'A';
          selectobjs.push(touchAImg);
          touchAGroup.add(touchAImg);
        }
        createObj();
      };
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj);
        }
        //创建可拖动的touchA点
        touchAImg.rotation.z = (this.alpha - 90) * Math.PI / 180;
        touchAGroup.position.x = touchA.x;
        touchAGroup.position.y = touchA.y;
        touchAGroup.position.z = 2;
        P = countPPos(touchA);
        circlePGroup.position.set(P.x, P.y, 2);
        let angleA;
         angleA = drawAngle(0, this.alpha, ANGLE_SIZE, '#258269', '#5EAA97', -2, lineObj.texta);
        obj = new THREE.Object3D();
        //创建原点到两个拖动点的连线
        lineObj.op = common.scaleLine([0, 0, 0], [touchA.x * 2, touchA.y * 2, 0], lineObj.op);
        obj.position.x = 0;
        obj.position.y = 0;
        obj.position.z = 0;
        obj.add(lineObj.op, angleA);
        angleA = null;
        scene.add(obj, touchAGroup);
        //判断按钮true或false来显示对应的线段
        if (this.checked) {
          this.beta = 180 - this.alpha;
          if (this.beta < 0) {
            drawP1Line(this.beta, 0);
          } else {
            drawP1Line(0, this.beta);
          }
        };
        if (this.checked1) {
          showSubline(P);
        }
      };
      var countPPos = (obj) => {
        let point = {};
        point.x = obj.x * RADIUS / TOUCH_RADIUS;
        point.y = obj.y * RADIUS / TOUCH_RADIUS;
        return point;
      };
      var countAngle = (obj) => {
        let angle = 0;
        let rad = Math.atan2(obj.y, obj.x);
        angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        return angle;
      };
     var drawAngle = (startangle, endangle, size, color, circleColor, index, textObj) => {
        let dx, dy, vertices = [];
        let obj = new THREE.Object3D();
        for (var i = startangle; i < endangle; i++) {
          dx = size * Math.cos(Math.PI / 180 * i);
          dy = size * Math.sin(Math.PI / 180 * i);
          vertices.push(common.vec3(dx, dy, index));
        }
        if (!vertices.length) return obj;
        let line = common.createLineMesh1(vertices, 3, 1, color);
        let endradian = common.radian(endangle);
        let startradian = common.radian(startangle);
        let circle = common.createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian, 0.4);
        let angle = 0;
        if (startangle === 0) {
          angle = endangle / 2;
        } else {
          angle = (endangle - startangle) / 2 + startangle;
        }
        // let text = common.createText(font, (size + 15) * cos(common.radian(angle)) - 5, (size + 15) * sin(common.radian(angle)) + 20, 2, '#BD00D4', 24);
        textObj.position.set((size + 15) * cos(common.radian(angle)) - 5, (size + 15) * sin(common.radian(angle)) + 20, 2);
        obj.add(line, circle, textObj);
        return obj;
      };
      //画跟P'相关的线段
      var secLine = (startangle, endangle) => {
        // console.log(startangle,endangle);
        let deg = endangle !== 0 ? endangle : startangle;
        // console.log(deg);
        let copyP = common.countPos(TOUCH_RADIUS, deg);
        let copyP1 = countPPos(copyP);
        let copyPGroup = new THREE.Group();
        lineObj.op1 = common.scaleLine([0, 0, 0], [copyP.x * 2, copyP.y * 2, 0], lineObj.op1);
        //圆点和文字
        textGroup.position.set(copyP1.x, copyP1.y, 2);
        //弧度
       let angle = drawAngle(startangle, endangle, ANGLE_SIZE*2, '#F5A623', '#F8E71C', -1, lineObj.texta1);
        copyPGroup.add(lineObj.op1, textGroup, angle);
        return copyPGroup;
      }
      //拖动P点创建P'的线段
      var drawP1Line = (startangle, endangle) => {
        if (copyPGroup !== null) {
          scene.remove(copyPGroup);
        }
        copyPGroup = secLine(startangle, endangle);
        scene.add(copyPGroup);
      }
      //动态显示P'线的动画
      var lineAnimate = (v) => {
        if (!v) {
          this.checked = false;
          cancelAnimationFrame(timer);
          scene.remove(copyPGroup);
          return;
        }
        this.point_event['pointer-events'] = 'none';
        this.isClick = false;
        var that = this;
        max_limit_radius = 180 - this.alpha;
        this.beta = 0;
        let xishu = max_limit_radius >= 0 ? 4 : -4;
        cancelAnimationFrame(timer);

        function rotateLine() {
          if (copyPGroup !== null) {
            scene.remove(copyPGroup);
          }
          that.beta += xishu;
          if (max_limit_radius >= 0) {
            if (that.beta >= max_limit_radius) {
              that.point_event['pointer-events'] = 'auto';
              that.isClick = true;
              that.isShow = true;
              cancelAnimationFrame(timer);
              that.beta = max_limit_radius;
              copyPGroup = secLine(0, that.beta);
              scene.add(copyPGroup);
              return;
            }
            copyPGroup = secLine(0, that.beta);
            scene.add(copyPGroup);
            timer = requestAnimationFrame(rotateLine);
          } else {
            if (that.beta <= max_limit_radius) {
              that.point_event['pointer-events'] = 'auto';
              that.isClick = true;
              that.isShow = true;
              cancelAnimationFrame(timer);
              that.beta = max_limit_radius;
              copyPGroup = secLine(that.beta, 0);
              scene.add(copyPGroup);
              return;
            }
            copyPGroup = secLine(that.beta, 0);
            scene.add(copyPGroup);
            timer = requestAnimationFrame(rotateLine);
          }
        }
        rotateLine();
      }
      //画辅助线
      var drawSubline = (P) => {
        let group = new THREE.Group();
        lineObj.mm1 = common.scaleLine([-P.x, 0, 1], [P.x, 0, 1], lineObj.mm1)
        group.add(lineObj.mm1);
        lineObj.pm = common.scaleLine([P.x, P.y, 0], [P.x, 0, 0], lineObj.pm)
        group.add(lineObj.pm);
        lineObj.pm1 = common.scaleLine([-P.x, P.y, 0], [-P.x, 0, 0], lineObj.pm1)
        group.add(lineObj.pm1);
        lineObj.bb = common.scaleLine([RADIUS, RADIUS * 2, 0], [RADIUS, -RADIUS * 2, 0], lineObj.bb)
        group.add(lineObj.bb);
        //画交点坐标圆点
        lineObj.circlem.position.set(P.x, 0, 2);
        group.add(lineObj.circlem);
        lineObj.circlem1.position.set(-P.x, 0, 2);
        group.add(lineObj.circlem1);
        //计算切线交点y坐标
        let angle = this.alpha > 90 && this.alpha <= 270 ? 360 - this.alpha : this.alpha;
        let y = RADIUS * Math.tan(common.radian(this.alpha));
        lineObj.circlet.position.set(RADIUS, y, 3);
        group.add(lineObj.circlet);
        // lineObj.circlet1 = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlet1.position.set(RADIUS, -y, 3);
        lineObj.tt1 = common.scaleLine([RADIUS, y, 1], [RADIUS, -y, 1], lineObj.tt1)
        group.add(lineObj.circlet1, lineObj.tt1);
        //添加文字M，T
        lineObj.textm.position.set(P.x - 20, 0, 0);
        lineObj.textt1.position.set(RADIUS + 20, -y, 0);
        lineObj.textt.position.set(RADIUS + 20, y, 0);
        lineObj.textm1.position.set(-P.x - 20, 0, 0);
        // text = null;
        // line = null;
        group.add(lineObj.textm, lineObj.textt, lineObj.textt1)
        if (this.alpha > 90 && this.alpha <= 270) {
          lineObj.ot = common.scaleLine([-P.x * 2, -P.y * 2, 0], [0, 0, 0], lineObj.ot);
          group.add(lineObj.ot);
        } else {
          lineObj.ot1 = common.scaleLine([P.x * 2, -P.y * 2, 0], [0, 0, 0], lineObj.ot1);
          group.add(lineObj.ot1);
        }
        return group;
      }
      //是否显示辅助线
      var showSubline = (bool) => {
        if (sublineGroup !== null) {
          scene.remove(sublineGroup);
        }
        if (bool) {
          sublineGroup = drawSubline(P);
          scene.add(sublineGroup);
        } else {
          scene.remove(sublineGroup);
        }
      }
      //事件函数
      let nowTime = null;
      let preTime = null;
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
          preTime = nowTime = new Date().getTime();
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
        nowTime = new Date().getTime();
        if (nowTime - preTime < 100) {
          return;
        } else {
          preTime = nowTime;
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y, b;
            x = obj.x;
            y = obj.y;
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
            preTime = nowTime = new Date().getTime();
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
        nowTime = new Date().getTime();
        if (nowTime - preTime < 100) {
          return;
        } else {
          preTime = nowTime;
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y, b;
            x = obj.x;
            y = obj.y;
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
      let count = 0;
      var animate = () => {
        requestAnimationFrame(animate);
        count = ++count % 2;
        if (count) {
          return;
        }
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
        //虚线场景
      };
      animate();
      scene.add(common.createAxis());
      createObj1();
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
      window.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
      renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
      var resetWidget = () => {
        this.alpha = 60;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
        this.checked = this.checked1 = false;
        createObj1();
      };
      var TO = function() {
        return {
          reset: resetWidget,
          lineAnimate,
          showSubline
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
  margin-top: 24px;
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
  width: 200px;
  height: 144px;
}

.prove-wrap {
  position: fixed;
  left: 24px;
  top: 72px;
  z-index: 10;
  font-size: 26px;
  color: #3494E9;
  font-family: 'CambriaMath';
}

</style>
