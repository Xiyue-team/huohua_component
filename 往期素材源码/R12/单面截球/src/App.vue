<template>
  <div id="app" class="noselect">
    <h3 v-text="title" class="app_title"></h3>
    <div class="main_wrap">
      <div class="content"> <img :src="imgUrl"> </div>
      <div class="container">
        <!--头部-->
        <!--视图区-->
        <div class="mask" @click="hiddenThis" v-show="nohidden"> 点击开始 </div>
        <div id="renderCanvas">
          <ui-slider id="slider" v-if="!nohidden" v-model="value" :speed="0" :boxHeight='58' :title="false" :piecewise="true" :piecewiseLabel="true" :tooltip="false" :noBlueProcess="false" :data="[1,2,3,4]" :clickable="false" :dragable="canDragable"></ui-slider>
        </div>
      </div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
const {
  sin,
  cos,
  PI,
  tan,
  pow,
  abs,
  sqrt
} = Math;
const SCALE = 10; //放大系数
const R = 10 * sqrt(3) * SCALE; //球的半径
const SECTION_R = 15 * SCALE //截面圆的半径
const SECTION_DISY = 5 * sqrt(3) * SCALE //截面距离球心的距离
const LINE_WIDTH = 4;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '单截面球',
      BtnSpaceStyle: 'flex',
      value: 1,
      imgUrl: 'static/UI/0.png',
      canDragable: true,
      nohidden: true,
      isReset: false,
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
    // this.TO.rotateCamera();
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
    value(val) {
      this.isReset = false;
      setTimeout(() => {
        this.TO.watchSlider(val);
      }, 200)

    }
  },
  methods: {
    hiddenThis() {
      this.nohidden = false;
      this.imgUrl = 'static/UI/1.png';
    },
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
        isMob = null;
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      // camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      var camera = new THREE.OrthographicCamera(mainWidth / -1.5, mainWidth / 1.5, mainHeight / 1.5, mainHeight / -1.5, 1, 10000);
      camera.position.x = -1000;
      camera.position.y = 200;
      camera.position.z = 0;
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.minZoom = 0.5;
      controls.maxZoom = 2;
      var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
      dirLight1.position.set(200, 200, 100);
      var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
      dirLight2.position.set(-200, -200, -100);
      scene.add(dirLight1, dirLight2);
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 0, 0);
      scene.add(hemiLight);
      $("#renderCanvas").append(renderer.domElement);
      let pointPos = {
        o: [0, 0, 0],
        o1: [0, SECTION_DISY, 0],
        o11: [0, SECTION_DISY - 1, 0],
        a: [0, SECTION_DISY, SECTION_R],
        c: [0, SECTION_DISY, -SECTION_R],
        c1: [SECTION_R - 1, SECTION_DISY - 1, 0]
      };
      //专门用来存放物体的盒子
      let objectBox = {};
      objectBox.specialTimer = {};
      objectBox.step3Timer = {};
      objectBox.step3Timer.timer = null;
      //初始three场景
      var initObj = () => {
        //计算b点位置
        pointPos.b = calcPointBPos();
        //创建球
        objectBox.sphere = common.createSphere(R, {
          color: '#8EC4F0',
          opacity: 0.4,
          segments: 48,
          depthTest: false
        });
        scene.add(objectBox.sphere);
        // 第一阶段
        //创建圆心O
        scene.add(createPointGroup('O', 5, pointPos.o, false, true));
        //创建虚线圆心线
        // scene.add(common.drawCircleLine(R, { style: 2, isLay: true, line_width: 2 }));
        //创建圆心截面
        scene.add(common.createCircle(R, {
          isLay: true,
          color: '#FF6A79',
          segments: 48,
          opacity: 0.3,
          depthTest: false
        }));
        drawMesh();
      }
      //把所有场景需要的线和点都创建出来  然后放在对应的阶段组中，进行控制
      let lineO1C = null;
      var drawMesh = () => {
        //第二阶段
        objectBox.step2 = new THREE.Group();
        objectBox.step2.add(createPointGroup('B', 5, pointPos.b));
        objectBox.step2.add(createPointGroup('A', 5, pointPos.a));
        objectBox.step2.add(createPointGroup('C', 5, pointPos.c));
        objectBox.step2.add(createPointGroup('O', 5, pointPos.o1, true, true));
        objectBox.step2.add(common.createStraightLine([pointPos.a, pointPos.b], 3, LINE_WIDTH, '#00B2FF', 0.1));
        // objectBox.step2.add(common.createStraightLine([pointPos.a, pointPos.c], 3, LINE_WIDTH, '#00B2FF'));
        objectBox.step2.add(common.createStraightLine([pointPos.c, pointPos.b], 3, LINE_WIDTH, '#00B2FF'));
        objectBox.step2.add(common.createStraightLine([pointPos.a, pointPos.o1], 3, LINE_WIDTH, '#00B2FF'));
        lineO1C = common.createStraightLine([pointPos.c, pointPos.o1], 3, LINE_WIDTH, '#00B2FF')
        let c = common.createCircle(SECTION_R, {
          isLay: true,
          color: '#FF6A79',
          segments: 48,
          opacity: 0.3,
          depthTest: false,
          position: [0, SECTION_DISY + 1, 0]
        })
        objectBox.step2.add(c);
        objectBox.step2.add(lineO1C);
        objectBox.step2.visible = false;
        scene.add(objectBox.step2);
        //第三阶段
        //第四阶段
        objectBox.step4 = new THREE.Group();
        objectBox.step4.add(common.createText('d', -10, SECTION_DISY / 2 + 20, 10, '#1500FF', 48));
        objectBox.step4.add(common.createText('r', 0, SECTION_DISY + 20, -SECTION_R / 2, '#1500FF', 48));
        objectBox.step4.add(common.createText('R', 0, SECTION_DISY / 2, -R / 2, '#1500FF', 48));
        objectBox.step4.visible = false;
        let rightAngle = common.drawRightAngle(15);
        rightAngle.rotation.y = objectBox.rad - common.radian(180);
        // rightAngle.position.set(pointPos.b[0],pointPos.b[1]-2,pointPos.b[2]);
        rightAngle.position.set(...pointPos.b);
        objectBox.step4.add(rightAngle);
        scene.add(objectBox.step4);
      }
      var watchSlider = (v) => {
        if (v == 2) {
          scene.remove(objectBox.step3);
          objectBox.isStep3finished = false;
          cancelAnimationFrame(objectBox.timer);
          common.preloadImage('static/UI/2.png').then((path) => {
            this.imgUrl = path;
          })
          objectBox.step2.visible = true;
          objectBox.step4.visible = false;
          lineO1C.material.opacity = 1;
          if (!objectBox.isStep2finished) {
            objectBox.step2.children.forEach((value) => {
              if (value.type == 'Line2') {
                value.material.opacity = 0;
              }
            });
            this.canDragable = false;
            showLineAni();
          }
        } else if (v == 3) {
          common.preloadImage('static/UI/3.png').then((path) => {
            this.imgUrl = path;
          })
          objectBox.step4.visible = false;
          if (!objectBox.isStep3finished) {
            if (objectBox.step3 != 'undefined') {
              scene.remove(objectBox.step3);
            }
            rotateCamera();
            this.canDragable = false;
            objectBox.step3 = new THREE.Group();
            scene.add(objectBox.step3);
            common.getLong(pointPos.o, pointPos.o1, objectBox.step3, objectBox, {
              color: '#F89A00',
              isReset: this.isReset
            }).then(() => {
              lineO1C.material.opacity = 0;
              common.getLong(pointPos.c, pointPos.o1, objectBox.step3, objectBox.specialTimer, {
                isShrink: true,
                color: '#00B2FF'
              });
              common.getLong(pointPos.o1, pointPos.c, objectBox.step3, objectBox, {
                color: '#F89A00',
                isReset: this.isReset
              }).then(() => {
                common.getLong(pointPos.c, pointPos.o, objectBox.step3, objectBox, {
                  color: '#F89A00',
                  isReset: this.isReset
                }).then(() => {
                  console.log(1);
                  objectBox.isStep3finished = true;
                  this.canDragable = true;
                })
              })
            });
          }
        } else if (v == 4) {
          objectBox.step4.visible = true;
          common.preloadImage('static/UI/4.png').then((path) => {
            this.imgUrl = path;
          })
        } else if (v == 1) {
          cancelAnimationFrame(objectBox.step2Timer);
          cancelAnimationFrame(objectBox.timer);
          cancelAnimationFrame(objectBox.specialTimer.timer);
          scene.remove(objectBox.step3);
          objectBox.isStep2finished = false;
          objectBox.step2.visible = objectBox.step4.visible = false;
          let num = this.nohidden ? 0 : 1;
          common.preloadImage(`static/UI/${num}.png`).then((path) => {
            this.imgUrl = path;
          })
        }
      }
      var showLineAni = () => {
        this.num += 0.01;
        objectBox.step2.children.forEach((value) => {
          if (value.type == 'Line2') {
            value.material.opacity = this.num;
          }
        });
        if (this.num > 1) {
          cancelAnimationFrame(objectBox.step2Timer);
          objectBox.isStep2finished = true;
          this.canDragable = true;
          this.num = 0;
          return;
        }
        objectBox.step2Timer = requestAnimationFrame(showLineAni);
      }
      //计算B点位置
      var calcPointBPos = () => {
        let rad = Math.atan(18 / 24);
        // console.log(common.angle(rad));
        objectBox.rad = rad;
        let y = SCALE * 24 * sin(rad);
        let x = SCALE * 24 * cos(rad);
        x = 15 * SCALE - x;
        // y = 15 * SCALE - y;
        return [y, SECTION_DISY, -x];
      }
      var rotateCamera = () => {
        let pos = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
        };
        var tween = new TWEEN.Tween(pos);
        tween.to({
          x: -1000,
          y: 200,
          z: 0
        }, 1000).easing(TWEEN.Easing.Cubic.In).onUpdate(function() {
          camera.position.set(this.x, this.y, this.z);
          camera.lookAt(0, 0, 0);
        });
        tween.start();
      }
      //创建坐标点的圆圈和文字
      var createPointGroup = (text, radius, position, isSub = false, o = false) => {
        let group = new THREE.Group();
        let wenzi = null;
        let point = common.createSphere(radius, {
          color: '#F30000',
          segments: 12
        });
        point.position.set(...position);
        if (o) {
          wenzi = common.createText(text, position[0] - 10, position[1] + 16, position[2] + 20, '#000', 48, isSub);
        } else {
          wenzi = common.createText(text, position[0] * 1.2, position[1] + 16, position[2] * 1.2, '#000', 48, isSub);
        }
        group.add(point, wenzi);
        return group;
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
        TWEEN.update();
        //虚线场景
      };
      initObj();
      animate();
      var resetWidget = () => {
        this.nohidden = true;
        this.value = 1;
        this.imgUrl = 'static/UI/0.png';
        this.isReset = true;
        this.canDragable = true;
        objectBox.isStep2finished = objectBox.isStep3finished = false;
        $(`.ui-piecewise>li .ui-piecewise-dot`).css('background', '#f0f0f0');
        setTimeout(function() {
          camera.position.set(-1000, 200, 0);
          camera.zoom = 1;
          camera.updateProjectionMatrix();
          camera.lookAt(0, 0, 0);
        }, 20)
      };
      var TO = function() {
        return {
          reset: resetWidget,
          watchSlider,
          rotateCamera
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


/*#app {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
}*/

.main_wrap {
  height: calc( 100% - 72px);
  display: flex;
  flex-wrap: wrap;
  /*align-items: flex-start;*/
  justify-content: center;
}

.content {
  width: 25%;
  padding: 5px;
  background-color: #fff;
  border-radius: 6px;
  height: calc( 100% - 72px);
  margin: 0 0 0 24px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
}

.content img {
  width: 100%;
  height: auto;
}

.container {
  position: relative;
  /*width: 100%;*/
  /*float: left;*/
  height: calc( 100% - 72px);
  /* flex-grow: 1; */
  margin: 0 24px;
  width: 55%;
}

.app_title {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  width: 100%;
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
  /*height: calc(100% - 72px);*/
  height: 100%;
  outline: none;
  position: relative;
  /* overflow: hidden; */
}

canvas {
  position: absolute;
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

#app .aside_reset {
  position: fixed;
  right: 24px;
  top: 24px;
}



/*滑条样式*/

#slider {
  position: absolute;
  bottom: -58px;
  left: 50%;
  transform: translateX(-50%);
  width: 90% !important;
  z-index: 10;
  margin-bottom: 0 !important;
}

.mask {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 24px;
  justify-content: center;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  cursor: pointer;
}

</style>
