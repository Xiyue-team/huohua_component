<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="prove-wrap" v-if="checked1">
        <div class="prove">sin(
          <div><span>π</span><span>2</span></div>+α)=cosα</div>
        <div class="prove">cos(
          <div><span>π</span><span>2</span></div>+α)=-sinα</div>
      </div>
      <!--视图区-->
      <div id="renderCanvas" :style="point_event"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked" class="textbg" :style="'background-image:url(./static/UI/111.png);'"></ui-btn>
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
const { sin, cos, PI, tan } = Math;
const RADIUS = 300;
const TOUCH_RADIUS = 400;
const THREAD_ADD = 0.05;
const ANGLE_SIZE = 35;
const LINE_WIDTH = 3;
let yx = common.countPos(TOUCH_RADIUS, 45);
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '诱导公式六',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      checked: false,
      checked1: false,
      alpha: 25,
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
      let groupQ = null;
      let circleQGroup = null;
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
        lineObj.oq = common.unitLine({ color: "#FF1DF8" });
        lineObj.om1 = common.unitLine({ color: "#FF1F3A" });
        lineObj.mm1 = common.unitLine({ color: "#FF1F3A" });
        lineObj.pm = common.unitLine({ color: "#F89A00" });
        lineObj.pm1 = common.unitLine({ color: "#F89A00" });
        lineObj.texta = common.createText('α', 0, 0, 2, '#BD00D4', 24);
        lineObj.textm = common.createText('M', 0, 0, 0, '#000', 24);
        lineObj.textm1 = common.createText('M\'', 0, 0, 0, '#000', 24);
        lineObj.textyx = common.createText('y=x', 0, 0, 0, '#1500FF', 24);
        lineObj.circlem = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlem1 = common.createStrokeCircle(6, '#D0021B');
        lineObj.yx = common.createStraightLine([
          [1, 0, 0],
          [-1, 0, 0]
        ], 2, 3, "#000");
      }
      initLine();
      var createObj1 = () => {
        if (circle != null) {
          scene.remove(circle, circlePGroup, textGroup, circleQGroup, textA, touchAGroup);
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
        let text1 = common.createText('P(x,y)', 40, 10, 0, '#000', 24);
        circlePGroup.add(circleP, text1);
        circlePGroup.position.set(P.x, P.y, 2);
        //创建P'上的原点和文字，需要的时候添加场景并移动位置即可
        textGroup = new THREE.Group();
        let circleP1 = common.createStrokeCircle(6, '#D0021B');
        let text11 = common.createText("P'(-y,x)", 40, -20, 0, '#000', 24);
        textGroup.add(circleP1, text11);
        circleQGroup = new THREE.Group();
        let circleQ = common.createStrokeCircle(6, '#D0021B');
        let textQ = common.createText("Q(y,x)", 40, -10, 0, '#000', 24);
        circleQGroup.add(circleQ, textQ);
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
        touchAImg.rotation.z = (this.alpha - 90) * Math.PI / 180;
        touchAGroup.position.x = touchA.x;
        touchAGroup.position.y = touchA.y;
        touchAGroup.position.z = 1;
        P = countPPos(touchA);
        circlePGroup.position.set(P.x, P.y, 2);
        let angleA;
        angleA = drawAngle(0, this.alpha, ANGLE_SIZE - 10, '#258269', '#258269', 'α', -2);
        obj = new THREE.Object3D();
        //创建原点到两个拖动点的连线
        lineObj.op = common.scaleLine([0, 0, 0], [touchA.x, touchA.y, 0], lineObj.op);
        obj.position.x = 0;
        obj.position.y = 0;
        obj.position.z = 0;
        obj.add(lineObj.op, angleA);
        scene.add(obj, touchAGroup);
        //判断按钮true或false来显示对应的线段
        if (this.checked) {
          this.beta = this.alpha + 90;
          drawP1Line(this.alpha, this.beta);
          repaintQ(this.alpha);
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
      var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
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
        // let circle = common.createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian, 0.4);
        let angle = 0;
        if (startangle === 0) {
          angle = endangle / 2;
        } else {
          angle = (endangle - startangle) / 2 + startangle;
        }
        let text = common.createText(font, (size + 15) * cos(common.radian(angle)) - 5, (size + 15) * sin(common.radian(angle)) + 18, 2, '#BD00D4', 24);
        obj.add(line, text);
        return obj;
      };
      //画跟P'相关的线段
      var secLine = (startangle, endangle) => {
        let copyP = common.countPos(TOUCH_RADIUS, endangle);
        let copyP1 = countPPos(copyP);
        let copyPGroup = new THREE.Group();
        lineObj.op1 = common.scaleLine([0, 0, 0], [copyP.x, copyP.y, 0], lineObj.op1);
        textGroup.position.set(copyP1.x, copyP1.y, 2);
        copyPGroup.add(lineObj.op1, textGroup);
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
      //画4个对称弧度的函数
      var drawSymmetrySector = (strat, end, xishu, linecolor, color, bool = false) => {
        let group = new THREE.Group();
        let pos45 = common.countPos(ANGLE_SIZE + xishu, strat);
        let posAlpha = common.countPos(ANGLE_SIZE + xishu, end);
        let angle = (end + strat) / 2;
        // let xishu =Math.abs(end - strat)%90;
        // xishu = Math.abs(end-strat)>30?xishu/2:xishu/4;
        if (bool) {
          angle = this.alpha > 315 ? angle * 2 % 360 / 2 : angle;
        }
        let midPos = common.countPos(ANGLE_SIZE + xishu + 15, angle);
        let shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(pos45.x, pos45.y);
        shape.quadraticCurveTo(midPos.x, midPos.y, posAlpha.x, posAlpha.y);;
        shape.lineTo(0, 0);
        //扇面轮廓
        let shapeG = new THREE.ShapeGeometry(shape, 5);
        let line = new THREE.Line(new THREE.ShapeGeometry(shape, 5), new THREE.LineBasicMaterial({
          color: linecolor,
        }))
        let setor = new THREE.Mesh(new THREE.ShapeGeometry(shape, 5), new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4
        }))
        group.add(line, setor);
        return group;
      }
      //改变Q线段和五个扇面的函数
      var repaintQ = (alpha) => {
        if (groupQ !== null) {
          scene.remove(groupQ);
        }
        groupQ = new THREE.Group();
        //画Q线段
        // 画π/2-α线段
        let endangle = (450 - alpha) % 360;
        let Q = common.countPos(TOUCH_RADIUS, endangle);
        lineObj.oq = common.scaleLine([0, 0, 0], [Q.x, Q.y, 0], lineObj.oq);
        //画y=x线段
        lineObj.yx = common.scaleLine([-yx.x, -yx.y, 0], [yx.x, yx.y, 0], lineObj.yx);
        //画alpha和y=x直线的扇面
        //希望扇面的夹角小于180度
        let angleyx = this.alpha > 135 && this.alpha <= 315 ? 225 : 45;
        let group_alpha_yx = drawSymmetrySector(angleyx, this.alpha, 10, '#F09B31', '#F7E43E', true);
        // group_alpha_yx.position.set(0,0,-1);
        //尝试复制对称扇形
        let copyyx = group_alpha_yx.clone();
        copyyx.rotation.z = common.radian(angleyx - this.alpha);
        //画PI/2+alpha和PI/2-alpha对称的扇面
        let anglex0 = endangle >= 180 && endangle < 360 ? 270 : 90;
        let groupx0 = drawSymmetrySector(anglex0, endangle, 0, '#C60021', '#F42040');
        groupx0.position.set(0, 0, 1);
        let copyx0 = groupx0.clone();
        copyx0.rotation.z = common.radian(anglex0 - endangle);
        //画直角
        let rightAngle = common.rightAngle(15, '#E96631');
        rightAngle.rotation.z = common.radian(this.alpha);
        groupQ.add(rightAngle);
        //
        circleQGroup.position.set(Q.x / 4 * 3, Q.y / 4 * 3, 2);
        lineObj.textyx.position.set(yx.x - 10, yx.y - 20, 0);
        groupQ.add(group_alpha_yx, copyyx, groupx0, copyx0, lineObj.oq, lineObj.yx, circleQGroup, lineObj.textyx);
        scene.add(groupQ);
      }
      //动态显示P'线的动画
      var lineAnimate = (v) => {
        if (!v) {
          this.checked = false;
          cancelAnimationFrame(timer);
          scene.remove(copyPGroup, groupQ);
          return;
        }
        this.point_event['pointer-events'] = 'none';
        this.isClick = false;
        var that = this;
        max_limit_radius = 90 + this.alpha;
        this.beta = this.alpha;
        cancelAnimationFrame(timer);

        function rotateLine() {
          if (copyPGroup !== null) {
            scene.remove(copyPGroup);
          }
          that.beta += 4;
          if (that.beta >= max_limit_radius) {
            that.point_event['pointer-events'] = 'auto';
            that.isClick = true;
            that.isShow = true;
            cancelAnimationFrame(timer);
            that.beta = max_limit_radius;
            copyPGroup = secLine(that.alpha, that.beta);
            scene.add(copyPGroup);
            repaintQ(that.alpha);
            return;
          }
          copyPGroup = secLine(that.alpha, that.beta);
          scene.add(copyPGroup);
          timer = requestAnimationFrame(rotateLine);
        }
        rotateLine();
      }
      //画辅助线
      var drawSubline = (P) => {
        let group = new THREE.Group();
        lineObj.mm1 = common.scaleLine([P.x, 0, 1], [-P.y, 0, 1], lineObj.mm1)
        group.add(lineObj.mm1);
        lineObj.pm = common.scaleLine([P.x, P.y, 0], [P.x, 0, 0], lineObj.pm)
        group.add(lineObj.pm);
        lineObj.pm1 = common.scaleLine([-P.y, P.x, 0], [-P.y, 0, 0], lineObj.pm1)
        group.add(lineObj.pm1);
        //创建交点圆点
        // let circle = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlem.position.set(P.x, 0, 2);
        group.add(lineObj.circlem);
        // circle = common.createStrokeCircle(6, '#D0021B');
        lineObj.circlem1.position.set(-P.y, 0, 2);
        group.add(lineObj.circlem1);
        //创建M，M'文字
        lineObj.textm.position.set(P.x, 0, 0);
        group.add(lineObj.textm);
        lineObj.textm1.position.set(-P.y, 0, 0);
        group.add(lineObj.textm1);
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
        this.alpha = 25;
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


/*实现分式*/

.prove div {
  display: inline-block;
  width: 22px;
  font-size: 18px;
  vertical-align: middle;
}

.prove div span {
  display: inline-block;
  width: 100%;
  line-height: 18px;
  text-align: center;
}

.prove div span:last-child {
  border-top: 2px solid #3494E9;
}

.textbg {
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: auto 100%;
}

</style>
