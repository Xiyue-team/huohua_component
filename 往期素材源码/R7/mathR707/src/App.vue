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
  let {sin, cos, PI, tan} = Math;
  const coeX = 90 / PI * 2; //x轴刻度间隔实际数值
  const coeY = 90; //y轴刻度间隔实际数值
  const R = 90; //圆的半径
  const posX = -180; //圆心x轴坐标
  const posY = 225; //上方圆心y轴坐标

  

  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '余弦函数的图像（单位圆法）',
        BtnSpaceStyle: 'flex',
        isFirst: true,
        TO: null,
        touchP: {
          x: posX + R,
          y: posY
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
      }
    },
    methods: {
//      backWidget(){
//          window.location.href='../../index.html'
//      },
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
          touchP = null,
          point12Group = null,
          line12Group = null,
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
          pointsArr = [],
          linesArr = [],
          curve=null;
          var createScene = () => {
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
          camera.position.z = 1200;
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
        };
        

        var createObj1 = () => {
          //创建曲线函数
          let vertices, y, dx, dy;
          //创建x轴上的圆
          vertices = [];
          for (let i = 0; i < 361; i++) {
            dx = R * cos(PI / 180 * i);
            dy = R * sin(PI / 180 * i);
            vertices.push(common.vec3(dx + posX, dy, 0));
          }
          let circleDown = common.createLineMesh(vertices, '#000', 3, 2);

          //创建上方圆
          vertices = [];
          for (let i = 0; i < 361; i++) {
            dx = R * cos(PI / 180 * i);
            dy = R * sin(PI / 180 * i);
            vertices.push(common.vec3(dx + posX, dy + posY, 0));
          }
          let circleUp = common.createLineMesh(vertices, '#000', 3, 2);

          //创建辅助线1，2
          let subline1 = {},
            subline2 = {},
            fuzhu1, fuzhu2;
          subline1.x1 = -4 * coeY;
          subline1.y1 = subline1.x1 - posX;
          subline1.x2 = coeY;
          subline1.y2 = subline1.x2 - posX;
          vertices = [];
          vertices.push(common.vec3(subline1.x1, subline1.y1, 0));
          vertices.push(common.vec3(subline1.x2, subline1.y2, 0));
          fuzhu1 = common.createLineMesh(vertices, '#4A90E2', 2, 2);

          subline2.x1 = subline2.x2 = posX;
          subline2.y1 = 400;
          subline2.y2 = -400;
          vertices = [];
          vertices.push(common.vec3(subline2.x1, subline2.y1, 0));
          vertices.push(common.vec3(subline2.x2, subline2.y2, 0));
          fuzhu2 = common.createLineMesh(vertices, '#4A90E2', 2, 2);

          //上方圆直径线
          let dia = {},
            diaLine;
          dia.y1 = dia.y2 = posY;
          dia.x1 = posX + R;
          dia.x2 = posX - R;
          vertices = [];
          vertices.push(common.vec3(dia.x1, dia.y1, 0));
          vertices.push(common.vec3(dia.x2, dia.y2, 0));
          diaLine = common.createLineMesh(vertices, '#111', 3, 2);

          //创建圆点
          let circleO1 = common.createCircle([posX, posY, 1], 4, '#000');
          let circleO2 = common.createCircle([posX, 0, 1], 4, '#000');

          //创建圆心文字
          let textO1 = common.createText("O", posX + 20, posY, 2, "#000", 30);
          let textO2 = common.createText("O", posX + 20, 0, 2, "#000", 30);

          scene.add(circleDown, circleUp, fuzhu1, fuzhu2, diaLine, textO1, textO2, circleO1, circleO2);
          createObj();
        };

        var createObj = () => {
          if (obj != null) {
            scene.remove(obj);
            selectobjs = [];
          }

          //创建可以拖动的p点
          if (!touchP) {
            touchP = common.createImg([common.vec3(0, 0, 0)], 52, 52, "static/UI/A@2x.png");
          }
          touchP.position.x = this.touchP.x;
          touchP.position.y = this.touchP.y;
          touchP.position.z = 2;
          selectobjs.push(touchP.children[0]);

          scene.add(touchP);

          //计算角度
          let count = 0;
          let tan = Math.atan((this.touchP.y - posY) / (this.touchP.x - posX));
          let angle = tan * 180 / PI;
          let dx, dy;
          if (this.touchP.x >= posX && this.touchP.y >= posY) {
            count = angle;
          } else if (this.touchP.x < posX && this.touchP.y >= posY) {
            count = 180 + angle;
          } else if (this.touchP.x < posX && this.touchP.y < posY) {
            count = 180 + angle;
          } else if (this.touchP.x >= posX && this.touchP.y < posY) {
            count = 360 + angle;
          }
          show12Points(count);

          if(curve!=null){
              scene.remove(curve)
          }
          let vertices = [];
          for (let i = 0; i < count; i++) {
              vertices.push(common.vec3(i, cos(i / 180 * PI) * coeY, 0));
          }
          curve = common.createLineMesh(vertices, '#000', 3, 2);

          //从这往下全部都是创建根据P点坐标而移动的辅助线
          obj = new THREE.Object3D();
          //连接p1p2的辅助线
          vertices = [];
          vertices.push(common.vec3(this.touchP.x, 400, 0));
          vertices.push(common.vec3(this.touchP.x, -400, 0));
          let lineP1P2 = common.createLineMesh(vertices, '#4A90E2', 2, 2);

          //p1,p2文字
          let textP1 = common.createText('P', this.touchP.x + (this.touchP.x >= posX ? 30 : -30), this.touchP.y + 15, 1, '#000', 30);
          let textP11 = common.createText('1', this.touchP.x + (this.touchP.x >= posX ? 45 : -15), this.touchP.y, 1, '#000', 20);
          let textP2 = common.createText('P', this.touchP.x + (this.touchP.x >= posX ? 30 : -30), this.touchP.y - posY + 15, 1, '#000', 30);
          let textP22 = common.createText('2', this.touchP.x + (this.touchP.x >= posX ? 45 : -15), this.touchP.y - posY, 1, '#000', 20);

          // common.createText("O", posX+20, posY, 2, "#000", 30);

          //链接P1O的辅助线
          vertices = [];
          vertices.push(common.vec3(this.touchP.x, this.touchP.y, 0));
          vertices.push(common.vec3(posX, posY, 0));
          let lineP1O = common.createLineMesh(vertices, '#7ED321', 2, 2);

          //连接P2O的辅助线
          let lineP2O = lineP1O.clone();
          lineP2O.position.y = -posY;

          //创建红线
          vertices = [];
          vertices.push(common.vec3(this.touchP.x, posY, 1));
          vertices.push(common.vec3(posX, posY, 1));
          let lineRed1 = common.createLineMesh(vertices, '#FF001F', 3, 2);
          let lineRed2 = lineRed1.clone();
          lineRed2.position.y = -posY;

          //创建连接到曲线的辅助线

          //求出需求点坐标
          let pointI = {};
          pointI.x = this.touchP.x;
          pointI.y = cos(count / 180 * PI) * coeY;
          vertices = [];
          vertices.push(common.vec3(pointI.x, pointI.y, 0));
          vertices.push(common.vec3(count, pointI.y, 0));
          let lineYellow = common.createLineMesh(vertices, '#F5A623', 2, 2);

          //需求点辅助线
          vertices = [];
          vertices.push(common.vec3(pointI.x, pointI.y, 1));
          vertices.push(common.vec3(pointI.x, 0, 1));
          let fuzhuCurveLine1 = common.createLineMesh(vertices, '#FF001F', 3, 2);

          //曲线的辅助线
          vertices = [];
          vertices.push(common.vec3(count, pointI.y, 1));
          vertices.push(common.vec3(count, 0, 1));
          let fuzhuCurveLine = common.createLineMesh(vertices, '#FF001F', 3, 2);

          obj.add(curve,lineP1P2, lineP1O, lineP2O, lineRed1, lineRed2, lineYellow, fuzhuCurveLine, fuzhuCurveLine1, textP1, textP2, textP11, textP22);
          scene.add(obj);
        };
        var create12Points = () => {
          let x, y, vertices = [];
          point12Group = new THREE.Object3D();
          line12Group = new THREE.Object3D();
          for (let i = 0; i < 360; i += 30) {
            x = R * cos(common.radian(i));
            y = R * sin(common.radian(i));
            pointsArr[i / 30] = common.createCircle([x, y, 1], 5, '#FF001F');
            pointsArr[i / 30].visible = false;
            point12Group.add(pointsArr[i / 30]);
            vertices = [];
            vertices.push(common.vec3(i, cos(common.radian(i))*coeY, 1));
            vertices.push(common.vec3(i, 0, 1));
            linesArr[i/30] = common.createLineMesh(vertices,'#FF001F',2,2);
            linesArr[i / 30].visible = false;
            line12Group.add(linesArr[i/30]);

          }
          point12Group.position.set(posX, posY, 0);
          scene.add(point12Group,line12Group);
        };

        var show12Points = (v) => {
          let index = Math.floor(v / 30);
          for (let i = 0; i < pointsArr.length; i++) {
            if (i <= index) {
              pointsArr[i].visible = true;
              linesArr[i].visible = true;
            } else {
              pointsArr[i].visible = false;
              linesArr[i].visible = false;
            }
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

              var ang = Math.atan((y - posY) / (x - posX));
              if (x >= posX) {
                x = R * cos(ang) + posX;
                y = R * sin(ang) + posY;
              } else {
                x = -R * cos(ang) + posX;
                y = -R * sin(ang) + posY;
              }
              this.touchP.y = y;
              this.touchP.x = x;
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
              var ang = Math.atan((y - posY) / (x - posX));
              if (x >= posX) {
                x = R * cos(ang) + posX;
                y = R * sin(ang) + posY;
              } else {
                x = -R * cos(ang) + posX;
                y = -R * sin(ang) + posY;
              }
              this.touchP.y = y;
              this.touchP.x = x;
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
        };
        if (this.isFirst) {
          createScene();
          animate();
          scene.add(common.createAxis());
          createObj1();
          create12Points();
          renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
          renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
          window.addEventListener('mouseup', onDocumentMouseUp, false);
          renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
          renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
          renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
          this.isFirst = false;
        }

        var resetWidget = () => {
          this.touchP.x = posX + R;
          this.touchP.y = posY;
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
          createObj();
        };
        let RET;

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
  position: fixed;
  bottom: 24px;
  right: 24px;
}

#app .aside_reset {
  position: fixed;
  right: 24px;
  top: 0px;
}
</style>