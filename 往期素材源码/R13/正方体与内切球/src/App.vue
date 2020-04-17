<template>
  <div id="app" class="noselect">
    <div class="landscape-tip" v-if="!isLandscape">
      <div class="landscape-content"> <img src="../static/UI/tip.png" alt="">
        <p>请将屏幕自动旋转功能打开并横屏使用</p>
      </div>
    </div>
    <transition name="fade">
      <div class="mobile-tip" v-if="hiddenMobTip"> 建议您在电脑或平板上打开，以获取最佳的演示效果 </div>
    </transition>
    <h3 v-text="title" class="app_title"></h3>
    <div class="main_wrap">
      <div class="content"> <img :src="imgUrl"> </div>
      <div class="container">
        <!--头部-->
        <!--视图区-->
        <div id="renderCanvas">
          <ui-slider id="slider" v-model="value" :speed="0" :boxHeight='58' :title="false" :piecewise="true" :piecewiseLabel="true" :tooltip="false" :noBlueProcess="false" :data="[1,2,3]" :clickable="false" :dragable="canDragable" :dotsNum="2"></ui-slider>
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
const RADIUS = 200;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '正方体与内切球',
      BtnSpaceStyle: 'flex',
      value: 1,
      imgUrl: 'static/UI/1.png',
      canDragable: true,
      nohidden: true,
      isReset: false,
      isLandscape: true,
      hiddenMobTip: false,
    }
  },
  created() {
    document.title = this.title;
    this.num = 0;
    this.tipTimer = null;
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    let thiz = this;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      var mql = window.matchMedia("(orientation: portrait)");

      function onMatchMeidaChange(mql) {
        clearTimeout(thiz.tipTimer);
        if (mql.matches) {
          // 竖屏
          thiz.isLandscape = false
        } else {
          thiz.isLandscape = true
          if (window.innerWidth < 500 || window.innerHeight < 500) {
            thiz.hiddenMobTip = true;
            thiz.tipTimer = setTimeout(() => {
              thiz.hiddenMobTip = false;
            }, 3000)
          }
        }
      }
      onMatchMeidaChange(mql);
      mql.addListener(onMatchMeidaChange);
    } else {}
    this.TO = this.init();
    // this.TO.rotateCamera();
  },
  computed: {},
  watch: {
    value(val) {
      this.TO.sliderEvt(val);
    }
  },
  methods: {
    reset() {
      this.TO.reset();
    },
    init() {
      var scene = null,
        scene2 = null,
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
      renderer.autoClear = false;
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      scene2 = new THREE.Scene();
      // camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      let standard = (window.innerWidth-300)/3000*3.5;
      var camera = new THREE.OrthographicCamera(mainWidth / -standard, mainWidth / standard, mainHeight / standard, mainHeight / -standard, 1, 10000);
      camera.position.x = 300;
      camera.position.y = 200;
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
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.minZoom = 0.8;
      controls.maxZoom = 2.5;
      var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.3);
      dirLight1.position.set(0, 300, 0);
      var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.2);
      dirLight2.position.set(400, 0, 0);
      var dirLight3 = new THREE.DirectionalLight(0xf0f0f0, 0.2);
      dirLight3.position.set(-400, 0, 0);
      var dirLight4 = new THREE.DirectionalLight(0xf0f0f0, 0.1);
      dirLight4.position.set(0, -300, 0);
      scene.add(dirLight1, dirLight2,dirLight3,dirLight4);
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 0, 0);
      scene.add(hemiLight);
      var light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);
      $("#renderCanvas").append(renderer.domElement);
      //专门用来存放物体的盒子
      let objectBox = {};
      objectBox.wholeGroup = new THREE.Group();
      objectBox.halfGroup = new THREE.Group();
      objectBox.textGroup = new THREE.Group();
      objectBox.textGroup1 = new THREE.Group();
      objectBox.subLineGroup = new THREE.Group();
      let boxPosArr = {
        a: {
          label: 'A ',
          pos: [-RADIUS, RADIUS, RADIUS],
          isSub: false,
          index: 1,
        },
        b: {
          label: 'B ',
          pos: [-RADIUS, RADIUS, -RADIUS],
          isSub: false,
          index: 1,
        },
        c: {
          label: 'C',
          pos: [RADIUS, RADIUS, -RADIUS],
          isSub: false,
          index: 1,
        },
        d: {
          label: 'D',
          pos: [RADIUS, RADIUS, RADIUS],
          isSub: false,
          index: 2,
        },
        a1: {
          label: 'A ',
          pos: [-RADIUS, -RADIUS, RADIUS],
          isSub: true,
          index: 1,
        },
        b1: {
          label: 'B ',
          pos: [-RADIUS, -RADIUS, -RADIUS],
          isSub: true,
          index: 1,
        },
        c1: {
          label: 'C',
          pos: [RADIUS, -RADIUS, -RADIUS],
          isSub: true,
          index: 1,
        },
        d1: {
          label: 'D',
          pos: [RADIUS, -RADIUS, RADIUS],
          isSub: true,
          index: 2,
        },
      }
      var sliderEvt = val => {
        this.imgUrl = `static/UI/${val}.png`;
        if (val == 1) {
          objectBox.halfGroup.visible = false;
          objectBox.copyHalfGroup.visible = false;
          objectBox.wholeGroup.visible = true;
          objectBox.textGroup1.visible = true;
          objectBox.textGroup1.position.set(0, 0, 0);
          // objectBox.cameraTimer = rotate([300, 200, 600]);
          camera.position.set(300,200,600)
          camera.lookAt(0,0,0);
        } else if (val == 2) {
          if (!objectBox.halfGroup.visible) {
            objectBox.wholeGroup.visible = false;
            moveHalfGroup();
          } else {
            objectBox.subLineGroup.visible = false;
          }
        } else if (val == 3) {
          objectBox.subLineGroup.visible = true;
          objectBox.cameraTimer = rotate([600, 0, 600]);
        }
      }
      //初始three场景
      var initObj = () => {
        let r = 402 * (1 - Math.sqrt(3) / 2);
        let dis = RADIUS - r;
        objectBox.sphere1 = common.createSphere(r, { color: '#9B9B9B', opacity: 1, depthTest: true, segments: 36 });
        objectBox.sphere1.rotation.z = -Math.PI / 4;
        objectBox.sphere1.position.set(dis, dis, dis);
        objectBox.wholeGroup.add(objectBox.sphere1);
        let posArr = [
          [-dis, -dis, -dis],
          [-dis, dis, dis],
          [dis, -dis, dis],
          [dis, dis, -dis],
          [-dis, -dis, dis],
          [-dis, dis, -dis],
          [dis, -dis, -dis],
        ]
        for (let i = 0; i < 7; i++) {
          let sphere = objectBox.sphere1.clone();
          sphere.position.set(...posArr[i]);
          objectBox.wholeGroup.add(sphere);
        }
        objectBox.box = common.createBox(RADIUS * 2, RADIUS * 2, RADIUS * 2, { color: '#a2d3f9', opacity: 0.5, depthTest: false, });

        objectBox.sphere = common.createSphere(RADIUS, { color: '#FF6F68', opacity: 1, depthTest: true, segments: 36 })
        objectBox.wholeGroup.add(objectBox.sphere, objectBox.box);
        scene.add(objectBox.wholeGroup);
        demo(r, dis);
        for (let pos in boxPosArr) {
          let item = boxPosArr[pos];
          if (item.index == 1) {
            objectBox.textGroup.add(common.createText(item.label, item.pos[0] * 1.1, item.pos[1] * 1.1 + 12, item.pos[2] * 1.1, { sub: item.isSub }));
          } else {
            objectBox.textGroup1.add(common.createText(item.label, item.pos[0] * 1.1 + 12, item.pos[1] * 1.1, item.pos[2] * 1.1, { sub: item.isSub }));
          }
        }
        let sphere = common.createSphere(6, { color: '#000', opacity: 1, depthTest: false, segments: 12, transparent: true });
        // objectBox.textGroup.add(sphere);
        let texto = common.createText('O', 20, 12, -20);
        texto.material.depthTest = false;
        scene.add(objectBox.textGroup, objectBox.textGroup1, texto);
        sphere.position.set(2,0,2);
        
        scene2.add(sphere);
        drawSubline(r, dis);
      }
      var drawHalfBox = () => {
        var shape = new THREE.Shape();
        shape.moveTo(-RADIUS, -RADIUS);
        shape.lineTo(-RADIUS, RADIUS);
        shape.lineTo(RADIUS, RADIUS);
        shape.lineTo(-RADIUS, -RADIUS);
        var extrudeSettings = {
          amount: 400,
          bevelEnabled: false,
          bevelThickness: 0,
          bevelSize: 0,
          bevelSegments: 1
        };
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var material = new THREE.MeshPhongMaterial({ color: '#a2d3f9', transparent: true, opacity: 0.5 });
        var mesh = new THREE.Mesh(geometry, material);
        return mesh;
      }
      var demo = (r, dis) => {
        let sphere = common.createSphere(r, { color: '#9B9B9B', opacity: 1, depthTest: true });
        sphere.position.set(-dis, dis, -dis);
        let sphereCopy = sphere.clone();
        sphereCopy.position.set(-dis, -dis, -dis);
        objectBox.halfGroup.add(sphere, sphereCopy);
        // objectBox.halfGroup.rotation.x = Math.PI / 2;
        let halfGroup = new THREE.Group();
        let mesh = drawHalfBox();
        halfGroup.add(mesh);
        mesh.position.y = 200;
        mesh.rotation.x = Math.PI / 2;
        halfGroup.rotation.y = -Math.PI / 2;
        objectBox.halfGroup.add(halfGroup);
        let group2 = new THREE.Group();
        let sphere1 = common.createSphere(RADIUS, { color: '#FF6F68', opacity: 1, depthTest: true, phiLength: Math.PI, phiStart: -Math.PI / 2, segments: 36 });
        let circle1 = common.createCircle(RADIUS, { color: '#FF6F68', depthTest: true, segments: 48 });
        circle1.rotation.y = Math.PI / 2;
        group2.add(circle1);
        group2.rotation.y = -Math.PI / 4;
        group2.add(sphere1);
        group2.position.set(1, 0, 0);
        objectBox.halfGroup.add(group2);
        let group = new THREE.Group();
        sphere = common.createSphere(r, { color: '#9B9B9B', opacity: 1, depthTest: true, phiLength: Math.PI, phiStart: -Math.PI / 2, segments: 36 });
        let circle = common.createCircle(r, { color: '#9B9B9B', depthTest: true, segments: 36 }, );
        circle.rotation.y = Math.PI / 2;
        group.add(circle);
        group.rotation.y = -Math.PI / 4;
        group.position.set(-dis + 1, dis, dis);
        group.add(sphere);
        objectBox.halfGroup.add(group);
        let posArr = [
          [dis + 1, -dis, -dis],
          [dis + 1, dis, -dis],
          [-dis + 1, -dis, dis],
        ];
        for (let i = 0; i < 3; i++) {
          let group1 = group.clone();
          group1.position.set(...posArr[i]);
          objectBox.halfGroup.add(group1);
        }
        objectBox.copyHalfGroup = objectBox.halfGroup.clone();
        objectBox.copyHalfGroup.rotation.y = Math.PI;
        scene.add(objectBox.halfGroup, objectBox.copyHalfGroup);
        objectBox.halfGroup.visible = false;
        objectBox.copyHalfGroup.visible = false;
      }
      objectBox.timer = null;
      var moveHalfGroup = () => {
        this.canDragable = false;
        objectBox.halfGroup.visible = true;
        objectBox.copyHalfGroup.visible = true;
        let step = 0;
        let thiz = this;

        function move() {
          if (step > 300) {
            cancelAnimationFrame(objectBox.timer);
            thiz.canDragable = true;
            objectBox.copyHalfGroup.visible = false;
            objectBox.textGroup1.visible = false;
            return;
          }
          step += 2;
          objectBox.copyHalfGroup.position.set(step, 0, step);
          objectBox.textGroup1.position.set(step, 0, step);
          objectBox.timer = requestAnimationFrame(move);
        }
        move();
      }
      var drawSubline = (r, dis) => {
        //算a1c的长度   再算大圆圆心到小圆圆心的距离加上小圆半径求得坐标
        let a1c = Math.hypot(RADIUS * 2, RADIUS * 2, RADIUS * 2);
        let oo1 = Math.hypot(dis, dis, dis);
        let bili = (oo1 + r) / a1c * 2;
        let pos = RADIUS * bili;
        let line = common.createStraightLine([
          [-pos+1, -pos+1, pos-1],
          [pos-1, pos-1, -pos+1]
        ], { color: '#fff' });
        objectBox.subLineGroup.add(line);
        line = common.createStraightLine([
          [-pos, -pos, pos],
          [-RADIUS, -RADIUS, RADIUS]
        ], { color: '#9013FE' });
        objectBox.subLineGroup.add(line);
        line = common.createStraightLine([
          [RADIUS, RADIUS, -RADIUS],
          [pos, pos, -pos]
        ], { color: '#9013FE' });
        objectBox.subLineGroup.add(line);
        line = common.createStraightLine([
          [dis, dis, -dis],
          [dis, RADIUS-1, -dis]
        ], { color: '#F5A623' });
        objectBox.subLineGroup.add(line);
        line = common.createStraightLine([
          [0, 0, 0],
          [0, RADIUS-1, 0]
        ], { color: '#F5A623' });
        objectBox.subLineGroup.add(line);
        // objectBox.subLineGroup.add(sphere);
        let sphere = common.createSphere(4, { color: '#000', opacity: 1, depthTest: true, segments: 12 });
        sphere.position.set(dis, dis, -dis);
        objectBox.subLineGroup.add(sphere);
        let text = common.createText("R", 6, RADIUS / 2 + 6, 6);
        objectBox.subLineGroup.add(text);
        text = common.createText("r", dis + 6, dis + 50, -dis + 6);
        objectBox.subLineGroup.add(text);
        text = common.createText("x", -(RADIUS + pos) / 2, -(RADIUS + pos) / 2, (RADIUS + pos) / 2, { color: '#9013FE' });
        objectBox.subLineGroup.add(text);
        text = common.createText("x", (RADIUS + pos) / 2, (RADIUS + pos) / 2 + 40, -(RADIUS + pos) / 2, { color: '#9013FE' });
        objectBox.subLineGroup.add(text);
        text = common.createText("3", -RADIUS / 2 + 6, -RADIUS / 2 + 32, RADIUS / 2 + 6, { sqrt: true, isItalic: false });
        objectBox.subLineGroup.add(text);
        text = common.createText("2", 50, -RADIUS - 10, -50, { sqrt: true, isItalic: false });
        objectBox.subLineGroup.add(text);
        text = common.createText("1", RADIUS, 0, -RADIUS - 20, { isItalic: false });
        objectBox.subLineGroup.add(text);
        objectBox.subLineGroup.position.set(2,0,2);
        scene.add(objectBox.subLineGroup);
        objectBox.subLineGroup.visible = false;
      }
      var rotate = (aim, callback) => {
        var position = camera.position;
        var x = aim[0] - position.x,
          y = aim[1] - position.y,
          z = aim[2] - position.z;
        var n = 20,
          v1 = x / n,
          v2 = y / n,
          v3 = z / n;

        function move() {
          n--;
          if (n < 0) {
            clearTimeout(objectBox.timer);
            objectBox.timer = null;
            callback && callback();
            return false;
          }
          position = camera.position;
          camera.position.set(position.x + v1, position.y + v2, position.z + v3);
          camera.lookAt(0, 0, 0);
          objectBox.timer = setTimeout(move, 40);
        }
        move();
      }
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
        renderer.render(scene2, camera);
        // TWEEN.update();
        //虚线场景
      };
      initObj();
      animate();
      window.onresize = () => {
        standard = (window.innerWidth-300)/3000*3.5;
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        camera.left = mainWidth / -standard;
        camera.right = mainWidth / standard;
        camera.top = mainHeight / standard;
        camera.bottom = mainHeight / -standard;
        camera.updateProjectionMatrix();
        renderer.setSize(mainWidth, mainHeight);
      };
      var resetWidget = () => {
        this.value = 1;
        cancelAnimationFrame(objectBox.timer);
        clearTimeout(objectBox.cameraTimer);
        objectBox.subLineGroup.visible = false;
        this.canDragable = true;
        camera.position.set(300, 200, 600);
        // console.log(camera);
        camera.zoom = 1;
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        $(`.ui-piecewise>li .ui-piecewise-dot`).css('background', '#f0f0f0');
      };
      var TO = function() {
        return {
          reset: resetWidget,
          sliderEvt
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

.mobile-tip {
  position: fixed;
  left: 0;
  top: 24px;
  right: 0;
  margin: 0 auto;
  width: 80%;
  padding: 0 24px;
  line-height: 48px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
  border-radius: 100px;
  z-index: 100;
  text-align: center;
}

.main_wrap {
  height: calc( 100% - 72px);
  display: flex;
  flex-wrap: wrap;
  /*align-items: flex-start;*/
  justify-content: center;
}

.landscape-tip {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.landscape-content {
  width: 80%;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
  border-radius: 12px;
}

.landscape-content img {
  width: 50%;
  height: auto;
}

.landscape-content p {
  margin-top: 10px;
}

.content {
  width: 25%;
  padding: 5px;
  background-color: #fff;
  border-radius: 6px;
  height: calc( 100% - 72px);
  margin: 0 0 0 24px;
  /* border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);*/
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
  flex-grow: 1;
}

.app_title {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  width: 100%;
}


#renderCanvas {
  width: 100%;
  /*height: calc(100% - 72px);*/
  height: 100%;
  outline: none;
  position: relative;
  border:none;
  /* overflow: hidden; */
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  border:none;
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
  width: 100% !important;
  z-index: 10;
  margin-bottom: 0 !important;
}


/*.mask {
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
}*/

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  transform: translateY(-30px);
  opacity: 0;
}

</style>
