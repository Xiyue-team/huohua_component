<template>
  <div
    id="app"
    class="noselect"
  >
    <!-- 头部 -->
    <ui-head :title="title">
      <ui-btn
        type="reset1"
        @click.native="reset"
      ></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div
      class="container"
      :style="'height:'+H+'px'"
    >
      <div
        class="View"
        :style="'width:'+VW+'px;height:'+VH+'px'"
      >
        <div
          class="ViewSpace"
          :style="'transform: scale('+zoom+')'"
        >
          <div class="leftWrap">
            <img
              :src="img1"
              style="position: absolute;"
              ondragstart="return false;"
            > <img
              :src="img3"
              id="1img"
              style='z-index: 1000;position: absolute;left:0;right:0;'
              ondragstart="return false;"
            ></div>
          <div
            class="rightWrap"
            id="renderCanvas"
          >
            <div
              class="showImg"
              @click='showCanvas'
              v-show='isShow'
            > <img
                :src="img2"
                ondragstart="return false;"
              > </div>
          </div>
          <div class="bottomWrap">
            <div
              class="cover"
              style="width:120%;height:120% ;z-index:100;background-color:white; top:-3px;left:-3px;position:absolute;"
            ></div>
            <ui-slider
              :zoom="zoom"
              :boxWidth="580"
              :dragable="svalue"
              :clickable="false"
              :boxHeight="53"
              :title="false"
              :piecewise="true"
              :piecewiseLabel="false"
              :tooltip="false"
              :noBlueProcess="false"
              :data="[1,2,3,4]"
              @callback='choose'
              :speed="0"
              v-model="value"
              v-if="slideShow"
            ></ui-slider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tools from '@/tools/tools';
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
let { sin, cos, PI, tan, abs } = Math;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      BtnSpaceStyle: 'flex',
      cover: true,
      img1: null,
      img3: 'static/UI/1.png',
      img2: 'static/UI/start.png',
      goshow: true,
      isShow: true,
      H: window.innerHeight - 76,
      VW: window.innerWidth / (window.innerHeight - 76) ? 1024 * window.innerHeight / 545 : window.innerWidth,
      VH: window.innerWidth / (window.innerHeight - 76) ? window.innerHeight : 545 * window.innerHeight / 1024,
      zoom: window.innerWidth / (window.innerHeight - 76) ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
      curDeg: 1,
      value: 1,
      svalue: true,
      title: '球面距离',
      mark: 0,
      mark1: 0,
      markImg: 0,
      slideShow: false,
    }
  },
  created() {
    document.title = this.title;
    this.imgL("static/UI/2.png", () => {
      this.img1 = 'static/UI/2.png';
    });
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.getViewSize();
    window.addEventListener('resize', () => {
      this.getViewSize();
    })
    this.TO = this.init();
  },
  computed: {},
  watch: {
    mark(val) {
      if (val == 1) {
        if (this.mark1 == 1) {
          this.TO.createObj3();
        }
      }
    }
  },
  methods: {
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback(img.src);
      }
    },
    choose(val) {
        setTimeout(()=>{
            if (val == 1) {
                this.goshow = false;
                this.imgL("static/UI/2.png", () => {
                    this.img1 = 'static/UI/2.png';
                });
                this.TO.createObj();
            }
            if (val == 2) {
                this.imgL("static/UI/3.png", () => {
                    this.img1 = 'static/UI/3.png';
                });
                this.TO.createObj1();
            }
            if (val == 3) {
                this.imgL("static/UI/4.png", () => {
                    this.img1 = 'static/UI/4.png';
                });
                this.TO.createObj2();
            }
            if (val == 4) {
                this.imgL("static/UI/5.png", () => {
                    this.img1 = 'static/UI/5.png';
                });
                this.TO.createObj3();
            }
        },200);
    },
    move() {},
    showCanvas() {
      this.TO.showCanvas();
    },
    reset() {
      this.curDeg = 1;
      this.TO.reset();
    },
    init() {
      var scene = null,
        _this = this,
        camera = null,
        renderer = null,
        mouse = null,
        controls = null,
        mainWidth = null,
        mainHeight = null,
        isMob = null,
        sphere = null,
        sphereO = null,
        circle = null,
        circle0 = null,
        circle1 = null,
        circle2 = null,
        textO = null,
        group = null,
        group1 = null,
        group2 = null,
        aP = null,
        bP = null,
        cP = null,
        oP = null,
        oo = null,
        bo1 = null,
        lineTimeoo1 = null,
        lineTimeibo1 = null;
      var offsetLeft = parseInt($('#renderCanvas').offset().left);
      var offsetTop = parseInt($('#renderCanvas').offset().top);
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      mouse = new THREE.Vector3();
      camera = new THREE.OrthographicCamera(mainWidth / -1.5, mainWidth / 1.5, mainHeight / 1.5, mainHeight / -1.5, 1, 10000);
      camera.position.x = 100;
      camera.position.y = -100;
      camera.position.z = 1000;
      camera.lookAt(scene.position);
      scene.add(camera);
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
      renderer.setPixelRatio(window.devicePixelRatio * this.zoom);
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      $("#renderCanvas").append(renderer.domElement);
      $('canvas').hide();
      $('.cover').show();
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.maxZoom = 1.2;
      controls.minZoom = 0.8;
      var showCanvas = () => {
        this.goshow = false;
        
         $('#1img').hide();
        $('.showImg').hide();
        $('canvas').show();
        $('.cover').hide();
        this.slideShow = true;
        this.imgL("static/UI/2.png", () => {
          this.img1 = 'static/UI/2.png';
        });
      };
      var createObj = () => {
        if (sphere != null) {
          scene.remove(sphere, sphereO, circle, circle0, textO, group, group1, group2, oo, bo1);
          group = group1 = group2 = oo = bo1 = null;
          if (lineTimeoo1 != null) {
            clearTimeout(lineTimeoo1);
            clearTimeout(lineTimeibo1);
          }
        }
        _this.mark = 0;
        sphere = tools.creatSphere(220, '#8EC4F0', 0.4);
        sphere.material.depthTest = false;
        sphere.position.set(0, 0, 0);
        scene.add(sphere);
        //  圆心
        sphereO = tools.creatSphere(5, '#FF0000', 1);
        sphereO.position.set(0, 0, 0);
        scene.add(sphereO);
        circle = tools.creatCircle(220, 3, '#000')
        circle.rotation.x = 0.5 * PI;
        scene.add(circle);
        circle0 = tools.creatCircle(220, 2, '#FF6A79')
        circle0.rotation.x = 0.5 * PI;
        scene.add(circle0);
        textO = tools.createText('O', 0, 30, 0, '#000', 20)
        scene.add(textO);
      }
      createObj();
      var createObj1 = () => {
        _this.mark = 0;
        scene.remove(circle, circle0, group1, group, group2, oo, bo1);
        if (lineTimeoo1 != null) {
          clearTimeout(lineTimeoo1);
          clearTimeout(lineTimeibo1);
        }
        group = new THREE.Group();
        circle1 = tools.creatCircle(190, 2, '#FF6A79')
        circle1.rotation.x = 0.5 * PI;
        group.add(circle1);
        circle1.position.y = -110;
        circle1.rotation.x = 0.5 * PI;
        circle2 = tools.creatCircle(190, 3, '#000')
        circle2.rotation.x = 0.5 * PI;
        group.add(circle2);
        circle2.position.y = -110;
        circle2.rotation.x = 0.5 * PI;
        aP = tools.creatSphere(5, '#FF0000', 1);
        aP.position.set(-164, -110, -95);
        var textA = tools.createText('A', -164, -110, -95, '#000', 20);
        bP = tools.creatSphere(5, '#FF0000', 1);
        bP.position.set(164, -110, -95);
        var textB = tools.createText('B', 164, -110, -95, '#000', 20);
        cP = tools.creatSphere(5, '#FF0000', 1);
        cP.position.set(0, -110, 190);
        var textC = tools.createText('C', 0, -110, 190, '#000', 20);
        oP = tools.creatSphere(5, '#FF0000', 1);
        oP.position.set(0, -110, 0);
        var textO1 = tools.createText('O₁', 0, -110, 0, '#000', 20);
        group.add(aP, bP, cP, oP, textA, textB, textC, textO1);
        scene.add(group);
      }
      var createObj2 = function() {　　
        _this.mark = 0;
        var __this = _this;
        var p = new Promise(function(resolve, reject) {　　
          if (group == null) {
            createObj1();
          }
          scene.remove(circle, circle0, group1, group2, oo, bo1);
          if (lineTimeoo1 != null) {
            clearTimeout(lineTimeoo1);
            clearTimeout(lineTimeibo1);
          }
          __this.mark1 = 0;
          __this.svalue = false;
          group1 = new THREE.Group();
          var acv = [{ x: -164, y: -110, z: -95 }, { x: 0, y: -110, z: 190 }];
          var ac = tools.creatLine(acv, 1, '#0DB2FF');
          ac.material.transparent = true;
          ac.material.opacity = 0;
          group1.add(ac);
          //
          var abv = [{ 'x': -164, 'y': -110, 'z': -95 }, { 'x': 164, 'y': -110, 'z': -95 }];
          var ab = tools.creatLine(abv, 1, '#0DB2FF');
          ab.material.transparent = true;
          ab.material.opacity = 0;
          group1.add(ab);
          //
          var cbv = [{ 'x': 0, 'y': -110, 'z': 190 }, { 'x': 164, 'y': -110, 'z': -95 }];
          var cb = tools.creatLine(cbv, 1, '#0DB2FF');
          cb.material.transparent = true;
          cb.material.opacity = 0;
          group1.add(cb);
          //
          var aov = [{ x: -164, y: -110, z: -95 }, { 'x': 0, 'y': 0, 'z': 0 }];
          var ao = tools.creatLine(aov, 1, '#0DB2FF');
          ao.scale.set(0.00000001, 0.00000001, 0.00000001);
          ao.translateX(-147.6);
          ao.translateY(-99);
          ao.translateZ(-85.5);
          //
          var bov = [{ 'x': 164, 'y': -110, 'z': -95 }, { 'x': 0, 'y': 0, 'z': 0 }];
          var bo = tools.creatLine(bov, 1, '#0DB2FF');
          bo.scale.set(0.00000001, 0.00000001, 0.00000001);
          bo.translateX(147.6);
          bo.translateY(-99);
          bo.translateZ(-85.5);
          //
          var cov = [{ 'x': 0, 'y': -110, 'z': 190 }, { 'x': 0, 'y': 0, 'z': 0 }];
          var co = tools.creatLine(cov, 1, '#0DB2FF');
          co.scale.set(0.00000001, 0.00000001, 0.00000001);
          co.translateY(-99);
          co.translateZ(171);
          //
          scene.add(group1);
          var i = 0;
          var iao = 0.1;
          var ibo = 0;
          var ico = 0;
          var lineTime = null;
          var lineTimeAO = null;
          var lineTimeBO = null;
          var lineTimeCO = null;
          var line0 = null;
          ao.translateX(-16.4);
          ao.translateY(-11);
          ao.translateZ(-9.5);
          bo.translateX(16.4);
          bo.translateY(-11);
          bo.translateZ(-9.5);
          co.translateY(-11);
          co.translateZ(19);
          group1.add(co);
          group1.add(bo);
          group1.add(ao);
          var lineopacity = () => {
            lineTime = setTimeout(lineopacity, 100)
            if (i >= 1) {
              clearTimeout(lineTime);
              ao.translateX(16.4);
              ao.translateY(11);
              ao.translateZ(9.5);
              bo.translateX(-16.4);
              bo.translateY(11);
              bo.translateZ(9.5);
              co.translateY(11);
              co.translateZ(-19);
              lineAO();
              // setTimeout(lineAO(), 200);
            }
            ac.material.opacity = i;
            ab.material.opacity = i;
            cb.material.opacity = i;
            i = i + 0.1;
          }
          var lineAO = () => {
            lineTimeAO = setTimeout(lineAO, 50)
            if (iao >= 0.8) {
              clearTimeout(lineTimeAO);
              __this.mark = 1
              __this.svalue = true;
              resolve()
            }
            iao = iao + 0.1;
            ao.scale.set(iao, iao, iao);
            bo.scale.set(iao, iao, iao);
            co.scale.set(iao, iao, iao);
            ao.translateX(16.4);
            ao.translateY(11);
            ao.translateZ(9.5);
            bo.translateX(-16.4);
            bo.translateY(11);
            bo.translateZ(9.5);
            co.translateY(11);
            co.translateZ(-19);
          }
          lineopacity();
        });
        return p;
      };
      var createObj3 = function() {　　
        var __this = _this;
        __this.svalue = false;
        var p = new Promise(function(resolve, reject) {　　
          if (__this.mark != 1) {
            __this.mark1 = 1;
          } else {
            group2 = new THREE.Group();
            scene.add(group2);
            var bov = [{ 'x': 164, 'y': -110, 'z': -95 }, { 'x': 0, 'y': 0, 'z': 0 }];
            var bo = tools.creatLine(bov, 1, '#FF0000');
            bo.material.transparent = true;
            bo.material.opacity = 0;
            group2.add(bo);
            var i = 0;
            var ibo1 = 0;
            var ibo = 0;
            var lineTimeibo = null;
            var textR = tools.createText('R', 82, -30, -47, '#000', 20);
            var lineoo1 = () => {
              lineTimeoo1 = setTimeout(lineoo1, 10)
              if (oo != null) {
                scene.remove(oo);
              }
              if (i >= 110) {
                clearTimeout(lineTimeoo1);
                setTimeout(linebo1(), 1000);
              }
              var oov = [{ x: 0, y: -110, z: 0 }, { x: 0, y: -110 + i, z: 0 }];
              oo = tools.creatLine(oov, 2, '#9013FE');
              scene.add(oo);
              i = i + 2;
            }
            var linebo1 = () => {
              lineTimeibo1 = setTimeout(linebo1, 10)
              if (bo1 != null) {
                scene.remove(bo1);
              }
              if (ibo1 >= 96) {
                clearTimeout(lineTimeibo1);
                setTimeout(linebo(), 1000);
              }
              var bo1v = [{ 'x': 0 + ibo1 * 1.726, 'y': -110, 'z': -ibo1 }, { x: 0, y: -110, z: 0 }];
              bo1 = tools.creatLine(bo1v, 2, '#FF1F3A');
              scene.add(bo1);
              ibo1 = ibo1 + 1;
            }
            var linebo = () => {
              lineTimeibo = setTimeout(linebo, 100)
              if (ibo >= 1) {
                group2.add(textR);
                resolve()
                clearTimeout(lineTimeibo);
                __this.svalue = true;
              }
              bo.material.opacity = ibo;
              ibo = ibo + 0.1;
            }
            lineoo1();
          }
        });
        return p;
      };
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        controls.update();
        renderer.render(scene, camera);
      };
      var axisHelper = new THREE.AxesHelper(50);
      // scene.add(axisHelper);
      animate();
      var resetWidget = () => {
        this.slideShow = false;
         $('#1img').show();
        $('.showImg').show();
        $('canvas').hide();
        $('.cover').show();
        this.value = 1;
        
        setTimeout(() => {
          createObj();
          camera.position.x = 100;
          camera.position.y = -100;
          camera.position.z = 1000;
          camera.lookAt(scene.position);
          camera.zoom = 1;
          camera.updateProjectionMatrix();
        }, 20);
        this.svalue = true
        
        this.mark = 0;
        this.mark1 = 0;
        this.markImg = 0;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          createObj,
          createObj1,
          createObj2,
          createObj3,
          showCanvas
        }
      }
      return TO()
    },
    getViewSize() {
      var W = window.innerWidth;
      var H = window.innerHeight - 76;
      this.H = H;
      if (W / H > 1024 / 545) {
        this.zoom = (H / 545).toFixed(2);
        this.VW = 1024 * H / 545;
        this.VH = H;
      } else {
        this.zoom = (W / 1024).toFixed(2);
        this.VW = W;
        this.VH = 545 * W / 1024;
      }
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

canvas {
  outline: none;
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
  touch-action: none;
  -ms-touch-action: none;
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
  cursor: pointer;
}

div.Ui-head {
  background-color: #fff;
  --webkit-box-shadow: none;
  box-shadow: none;
}

.container {
  width: 100%;
  position: relative;
}

/*内容区*/

.View {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.ViewSpace {
  position: relative;
  width: 1024px;
  height: 545px;
  padding: 26px 0;
  transform-origin: top left;
}

.ViewSpace .leftWrap {
  display: inline-block;
  width: 372px;
  height: 400px;
  position: absolute;
  /*margin-right: 24px;*/
  margin-left: 15px;
  left: 0;
  float: left;
}

.ViewSpace .leftWrap > img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ViewSpace .rightWrap,
.showImg {
  display: inline-block;
  width: 580px;
  height: 400px;
  position: absolute;
  margin-right: 15px;
  background-color: white;
  right: 0;
  float: right;
  cursor: pointer;
}

.ViewSpace .rightWrap img {
  display: inline-block;
  width: 580px;
  height: 400px;
}

.ViewSpace .bottomWrap {
  position: absolute;
  bottom: 24px;
  margin-right: 15px;
  right: 0;
}

canvas {
  width: 100%;
  height: 100%;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}
</style>
