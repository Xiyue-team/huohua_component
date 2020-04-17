<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--返回按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
    <ui-slider :label="[1,3]" :max="3" :min="1" title="λ" v-model="value" :interval='0.1' id='slider' :boxHeight='100'></ui-slider>
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
//定义全局变量，方便修改
const { sin, cos, PI, tan } = Math;
const O = {
  x: -450,
  y: -150,
  z: 2,
}
const A = {
  x: -150,
  y: -150,
  z: 2
}
const B = {
  x: -200,
  y: 50,
  z: 2
}
const lineWidth = 5;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider,
  },
  data() {
    return {
      title: '数乘向量的分配律（λ≥1）',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
      value: 2
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
    value(v) {
      this.TO.drawYanchangLine(v);
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
      let arrow1 = []; //储存黑色箭头
      let arrow2 = []; //储存延长线的箭头
      let color2 = ['#1BC3F0', '#F02C1B', '#C00CF1']; ////延长线箭头和线段的颜色
      let imgArr = []; //储存向量文字对象
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
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      var drawSanjiao = (color) => {
        //因为线段太宽，所以把三角形改成梯形
        let shape = new THREE.Shape();
        shape.moveTo(-2, 0);
        shape.lineTo(-10, -30);
        shape.lineTo(10, -30);
        shape.lineTo(2, 0);
        shape.lineTo(-2, 0);
        let arrow = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({
          color: color
        }));
        arrow.position.z = 0;
        return arrow;
      }
      var setSanjiaoPos = (arrow, point) => {
        let group = new THREE.Object3D();
        arrow.rotation.z = PI * 2 - point.rad;
        group.add(arrow);
        group.position.set(point.x, point.y, point.z);
        return group;
      }
      //计算角度
      A.rad = Math.atan2(A.x - O.x, A.y - O.y);
      B.rad = Math.atan2(B.x - O.x, B.y - O.y);
      let Bcopy = {};
      Object.assign(Bcopy, B); //复制B对象到Bcopy
      Bcopy.rad = Math.atan2(B.x - A.x, B.y - A.y);
      for (let i = 0; i < 3; i++) {
        arrow1.push(drawSanjiao('#000'));
        arrow2.push(drawSanjiao(color2[i]));
      }
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj);
        }
        obj = new THREE.Object3D();
        let line = common.createStraightLine([
          [O.x, O.y, O.z],
          [A.x, A.y, A.z],
          [B.x, B.y, B.z],
          [O.x, O.y, O.z]
        ], 3, lineWidth, '#000')
        obj.add(line);
        obj.add(setSanjiaoPos(arrow1[0], A));
        obj.add(setSanjiaoPos(arrow1[1], B));
        obj.add(setSanjiaoPos(arrow1[2], Bcopy));
        //添加贴图
        let tietu = common.createImg([common.vec3(0, 0, 0)], 20, 22, "static/UI/1.png", false);
        tietu.position.x = (A.x + O.x) / 2;
        tietu.position.y = O.y + 15;
        obj.add(tietu);
        tietu = common.createImg([common.vec3(0, 0, 0)], 20, 27, "static/UI/2.png", false);
        tietu.position.x = (A.x + B.x) / 2 - 20;
        tietu.position.y = (A.y + B.y) / 2 - 10;
        obj.add(tietu);
        tietu = common.createImg([common.vec3(0, 0, 0)], 50, 41, "static/UI/3.png", false);
        tietu.position.x = (O.x + B.x) / 2 - 20 + 40;
        tietu.position.y = (O.y + B.y) / 2 - 5;
        tietu.rotation.z = common.radian(10);
        obj.add(tietu);
        //添加OAB文字
        let text = common.createText('O', O.x - 20, O.y - 10, 0, '#000', 30);
        obj.add(text);
        text = common.createText('A', A.x + 20, A.y + 40, 0, '#000', 30);
        obj.add(text);
        text = common.createText('B', B.x + 30, B.y + 10, 0, '#000', 30);
        obj.add(text);
        scene.add(obj);

        //因为重复创建贴图会有闪黑的现象，所以提前创建好，以后只需要改变贴图位置就好
        tietu = common.createImg([common.vec3(0, 0, 0)], 45, 31, "static/UI/4.png", false);
        imgArr.push(tietu);
        tietu = common.createImg([common.vec3(0, 0, 0)], 45, 39, "static/UI/5.png", false);
        imgArr.push(tietu);
        tietu = common.createImg([common.vec3(0, 0, 0)], 80, 77, "static/UI/6.png", false);
        imgArr.push(tietu);
        drawYanchangLine(2);
      };
      let yanchangA = {};
      yanchangA.rad = A.rad;
      let yanchangB = {};
      yanchangB.rad = B.rad;
      let obj1 = null;
      let obj2 = null;
      var drawYanchangLine = (v) => {
        if (obj1 != null) {
          scene.remove(obj1);
        }
        //计算延长线A1，B1的坐标
        let yanchangBcopy = {};
        yanchangA.x = (A.x - O.x) * v + O.x;
        yanchangA.y = (A.y - O.y) * v + O.y;
        yanchangB.x = yanchangBcopy.x = (B.x - O.x) * v + O.x;
        yanchangB.y = yanchangBcopy.y = (B.y - O.y) * v + O.y;
        yanchangB.z = yanchangBcopy.z = yanchangA.z = 1;
        yanchangBcopy.rad = Math.atan2(B.x - A.x, B.y - A.y);
        obj1 = new THREE.Object3D();
        obj2 = new THREE.Object3D();
        // A的延长线
        let line = common.createStraightLine([
          [yanchangA.x, yanchangA.y, 1],
          [A.x, A.y, 1]
        ], 3, lineWidth, '#1BC3F0');
        obj1.add(line);
        //B的延长线
        line = common.createStraightLine([
          [yanchangB.x, yanchangB.y, 1],
          [B.x, B.y, 1]
        ], 3, lineWidth, '#F02C1B');
        obj1.add(line);
        //A1B1的延长线
        line = common.createStraightLine([
          [yanchangA.x, yanchangA.y, 1],
          [yanchangB.x, yanchangB.y, 1]
        ], 3, lineWidth, '#C00CF1');
        obj1.add(line);
        obj1.add(setSanjiaoPos(arrow2[0], yanchangA));
        obj1.add(setSanjiaoPos(arrow2[1], yanchangB));
        obj1.add(setSanjiaoPos(arrow2[2], yanchangBcopy));
        //延长线上的三角位置
        imgArr[0].position.x = (yanchangA.x + O.x) / 2;
        imgArr[0].position.y = O.y - 30;
        obj2.add(imgArr[0]);
        imgArr[1].position.x = (yanchangA.x + yanchangB.x) / 2 + 40;
        imgArr[1].position.y = (yanchangA.y + yanchangB.y) / 2;
        obj2.add(imgArr[1]);
        imgArr[2].position.x = (O.x + yanchangB.x) / 2 - 30 + 40;
        imgArr[2].position.y = (O.y + yanchangB.y) / 2 + 40;
        imgArr[2].rotation.z = common.radian(3);
        obj2.add(imgArr[2]);
        let text = common.createText('D', yanchangB.x, yanchangB.y + 40, 0, '#000', 30);
        obj1.add(text);
        text = common.createText('C', yanchangA.x, yanchangA.y - 10, 0, '#000', 30);
        obj1.add(text);
        scene.add(obj2);
        if (v != 1) {
          scene.add(obj1);
        }
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        controls.update();
        // TWEEN.update();
        //面和实线场景
        renderer.render(scene, camera);
      };
      animate();
      createObj();
      var resetWidget = () => {
        this.value = 2;
      };
      var TO = function(argument) {
        return {
          reset: resetWidget,
          drawYanchangLine
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
  left: 90px;
  bottom: 36px;
  font-size: 28px;
}

#slider {
  position: fixed;
  right: 24px;
  bottom: 24px;
}

</style>
