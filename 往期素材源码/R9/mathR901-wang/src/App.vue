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
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
//定义全局变量，方便修改
let { sin, cos, PI, tan } = Math;
const O = {
  x: -300,
  y: -300
}
const lineWidth = 6;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '向量的三点共线',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
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
      let touchA = { x: 0, y: -300 };
      let touchB = { x: -200, y: -100 };
      let D = {};
      let touchAImg = null;
      let touchBImg = null;
      let touchAGroup = null;
      let touchBGroup = null;
      let isMoveB = false; //优化代码，来判断拖动的是哪个点
      let color = ['#000', '#0094ff', '#e30000', '#7000d3'];
      let textArr = ['A', 'B', 'C'];
      let imgUrl = ["static/UI/aa@2x.png", "static/UI/b@2x.png", "static/UI/2b@2x.png", "static/UI/3b@2x.png"];
      let textureArr = []; //因为重复创建贴图会闪黑，所以创建数组保存创建的贴图，以后每次只是改变贴图位置即可
      let arrowArr1 = []; //解决卡顿，创建数组保存箭头
      let arrowArr2 = [];
      let BGroup = [];
      let DGroup = [];
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
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj, touchAGroup, touchBGroup);
          selectobjs = [];
        }
        //创建两个拖动点，并增加拖动范围
        touchAGroup = new THREE.Object3D();
        touchBGroup = new THREE.Object3D();
        let circleA = common.createCircle([0, 0, 2], 60, "#f00", 0, Math.PI * 2, 0);
        circleA.name = 'A';
        if (!touchAImg) {
          touchAImg = common.createImg([common.vec3(0, 0, 1)], 48, 48, "static/UI/A@2x.png");
        }
        selectobjs.push(circleA);
        touchAGroup.add(touchAImg, circleA);
        touchAGroup.position.set(touchA.x, touchA.y, 4);
        let circleB = common.createCircle([0, 0, 2], 60, "#f00", 0, Math.PI * 2, 0);
        circleB.name = 'B';
        if (!touchBImg) {
          touchBImg = common.createImg([common.vec3(0, 0, 1)], 48, 48, "static/UI/A@2x.png");
        }
        selectobjs.push(circleB);
        touchBGroup.add(touchBImg, circleB);
        touchBGroup.position.set(touchB.x, touchB.y, 0);
        //在每次拖动的时候进行3次循环计算需要的点坐标
        obj = new THREE.Object3D();
        //计算几个关键点坐标
        BGroup[0] = O;
        DGroup[0] = touchA;
        let text, texture;
        //根据平行四边形向量法，已知三点可以计算第四点坐标
        for (let i = 1; i <= 3; i++) {
          //计算向量b上的各点坐标
          //添加贴图
          if (this.isFirst) {
            textureArr[i] = common.createImg([common.vec3(0, 0, 0)], 36, 36, imgUrl[i], false);

            arrowArr1.push(drawSanjiao('#000'));
            arrowArr2.push(drawSanjiao(color[i]));
          }
          if (this.isFirst||isMoveB) {
            BGroup[i] = {};
            BGroup[i].x = (touchB.x - O.x) * i + O.x;
            BGroup[i].y = (touchB.y - O.y) * i + O.y;
            BGroup[i].rad = Math.atan2(BGroup[i].x - O.x, BGroup[i].y - O.y);
          }
          //计算ABC各点坐标
          DGroup[i] = {};
          DGroup[i].x = touchA.x + BGroup[i].x - O.x;
          DGroup[i].y = touchA.y + BGroup[i].y - O.y;
          //计算各个点与O点的弧度
          DGroup[i].rad = Math.atan2(DGroup[i].x - O.x, DGroup[i].y - O.y);
          //划线
          obj.add(common.createStraightLine([
            [BGroup[i].x, BGroup[i].y, -1],
            [DGroup[i].x, DGroup[i].y, -1]
          ], 2, lineWidth, '#000'));
          obj.add(common.createStraightLine([
            [O.x, O.y, i],
            [DGroup[i].x, DGroup[i].y, i]
          ], 3, lineWidth, color[i]));
          //添加文字
          text = common.createText(textArr[i - 1], DGroup[i].x + 30, DGroup[i].y + 22, 1, '#000', 36);
          obj.add(text);
          //添加贴图
          obj.add(setSanjiaoPos(arrowArr1[i - 1], BGroup[i]));
          obj.add(setSanjiaoPos(arrowArr2[i - 1], DGroup[i]));
          textureArr[i].position.set(BGroup[i].x - 40, BGroup[i].y, 1);
          obj.add(textureArr[i]);
        }
        //优化代码，把三段直线只画一条总长度的直线
        obj.add(common.createStraightLine([
          [O.x, O.y, 0],
          [BGroup[3].x, BGroup[3].y, 0]
        ], 3, lineWidth, '#000'));
        //优化代码，对辅助线只创建一条总长度的虚线
        obj.add(common.createStraightLine([
          [DGroup[0].x, DGroup[0].y, 3],
          [DGroup[3].x, DGroup[3].y, 3]
        ], 2, lineWidth, '#000'));
        //单独设置向量a需要的线段，箭头和贴图
        DGroup[0].rad = Math.atan2(DGroup[0].x - O.x, DGroup[0].y - O.y);
        obj.add(common.createStraightLine([
          [O.x, O.y, 0],
          [DGroup[0].x, DGroup[0].y, 0]
        ], 3, lineWidth, '#000'));
        if (this.isFirst) {
          textureArr[0] = common.createImg([common.vec3(0, 0, 0)], 36, 36, imgUrl[0], false);
          arrowArr2[3] = drawSanjiao(color[0]);
        }
        obj.add(setSanjiaoPos(arrowArr2[3], DGroup[0]));
        textureArr[0].position.set(DGroup[0].x + 40, DGroup[0].y, 1)
        obj.add(textureArr[0]);
        //文字O;
        text = common.createText('O', O.x - 30, O.y + 22, 8, '#000', 36);
        obj.add(text);
        scene.add(touchAGroup, touchBGroup, obj);
        this.isFirst = false;
      };
      var drawSanjiao = (color) => {
        let shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(-10, -30);
        shape.lineTo(10, -30);
        shape.lineTo(0, 0);
        let arrow = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({
          color: color
        }));
        arrow.position.z = -1;
        return arrow;
      }
      var setSanjiaoPos = (arrow, point) => {
        let group = new THREE.Object3D();
        arrow.rotation.z = PI * 2 - point.rad;
        group.add(arrow);
        group.position.set(point.x, point.y, 0);
        return group;
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
            if (selectobj.name == 'A') {
              touchA.x = x;
              touchA.y = y;
            } else if (selectobj.name == 'B') {
              isMoveB = true;
              touchB.x = x;
              touchB.y = y;
            }
            createObj();
          }
        }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        mousedownflag = false;
        isMoveB = false;
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
      var WH = $(window).height();

      var onDocumentTouchMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          var Y = event.touches[0].pageY;
          if (Y < 72) {
            Y = 72;
          } else if (Y > WH - 20) {
            Y = WH - 20;
          }
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((Y - offsetTop) / mainHeight) * 2 + 1;
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
            if (selectobj.name == 'A') {
              touchA.x = x;
              touchA.y = y;
            } else if (selectobj.name == 'B') {
              isMoveB = true;
              touchB.x = x;
              touchB.y = y;
            }
            createObj();
          }
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        mousedownflag = false;
        isMoveB = false;
        selectobj = null;
      };
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        controls.update();
        // TWEEN.update();
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
        touchA = {
          x: 0,
          y: -300
        };
        touchB = {
          x: -200,
          y: -100
        };
        this.isFirst  = true;
        createObj();
      };
      var TO = function(argument) {
        return {
          reset: resetWidget,
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
  left: 90px;
  bottom: 36px;
  font-size: 28px;
}

</style>
