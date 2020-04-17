<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="equation">y=sin{{value==0?'':'('}}x{{value>=0?value==0?'':'+':value==-12?'':'-'}}<span v-show="[-12,0,12].includes(value)">{{phi}}{{value==0?'':')'}}</span>
        <div class="pi" v-show="![-12,0,12].includes(value)">
          <p>{{phiArr1[Math.abs(value)][0]}}</p>
          <p>{{phiArr1[Math.abs(value)][1]}}</p>
        </div> <span class="kuohao" v-show="![-12,0,12].includes(value)">)</span> </div>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
    <ui-slider :label="['-π','0','π']" :min="-12" :max="12" :title="'φ'" :formatter="phi" id="slider" :speed="0" :noBlueProcess="true" v-model="value"></ui-slider>
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
      title: 'φ对y=sin(x+φ)的图像的影响',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
      sliderPoint: [0, 12, 24],
      value: 6,
      phiArr: ['', 'π/12', 'π/6', 'π/4', 'π/3', '5π/12', 'π/2', '7π/12', '2π/3', '3π/4', '5π/6', '11π/12', 'π'],
      phiArr1: [
        ['', ''],
        ['π', '12'],
        ['π', '6'],
        ['π', '4'],
        ['π', '3'],
        ['5π', '12'],
        ['π', '2'],
        ['7π', '12'],
        ['2π', '3'],
        ['3π', '4'],
        ['5π', '6'],
        ['11π', '12'],
        ['π', '']
      ],
      // margin: 16
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
    $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><div id="blueLine"></div></div>');
    $('#s2').css('background', '#5caefd');
    this.setSliderPonint();
    this.countWidth(6);
    window.onresize = () => {
      var cW = $('canvas').width();
      var cH = $('canvas').height();
      $('canvas').css({
        'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
        'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
      });
    };
  },
  computed: {
    phi() {
      return this.value >= 0 ? this.phiArr[Math.abs(this.value)] : ("-" + this.phiArr[Math.abs(this.value)]);
    }
  },
  watch: {
    value(v) {
      this.countWidth(v);
      this.TO.moveLine(v);
      this.TO.isDashShow();
      // let num = Math.abs(v);
      // if (num < 5 && num >= 1 || num == 6) {
      //   this.margin = 16;
      // } else {
      //   this.margin = 30;
      // }
    }
  },
  methods: {
    reset() {
      this.TO.reset();
    },
    setSliderPonint() {
      let vm = this;
      let sliderW = $('#slider').width();
      $('#sliderP span').each(function() {
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 24 - 7)
      })
      $('.ui-label li').each(function() {
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 24 + 22)
      })
    },
    countWidth(v) {
      let dis = Math.abs(0 - v);
      $('#blueLine').css('width', dis / 24 * 195);
      if (v > 0) {
        $('#blueLine').css({
          'left': 12 / 24 * 195,
          'right': ''
        });
      } else {
        $('#blueLine').css({
          'left': '',
          'right': 12 / 24 * 195
        });
      }
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
        mousedownflag = false;
      let sinLine = null;
      let dashLine = null;
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
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      var createObj1 = () => {
        obj = new THREE.Object3D();
        let vertices = [];
        let dx, dy;
        for (let i = -320; i < 321; i += 2) {
          dy = 100 * sin(i / 160 * PI);
          vertices.push(common.vec3(i, dy, 1));
        }
        sinLine = common.createLineMesh(vertices, '#4A90E2', 3, 2);
        let dashFuzhu1 = common.createStraightLine([
          [80, -450, 1],
          [80, 450, 1]
        ], 2, 2, '#4A90E2');
        obj.add(sinLine, dashFuzhu1);
        scene.add(obj);
        //创建标准y=sinx虚线
        vertices = [];
        let shape = new THREE.Shape();
        shape.moveTo(-320, 100 * sin(-2 * PI));
        let arr = [];
        for (let i = -320; i < 323; i += 2) {
          arr.push(new THREE.Vector2(i, 100 * sin(i / 160 * PI)));
        }
        shape.splineThru(arr);
        let dashG = shape.createSpacedPointsGeometry(120);
        dashG.computeLineDistances();
        let dashM = new THREE.LineBasicMaterial({
          color: '#000',
          linewidth: 2
        })
        obj2 = new THREE.Object3D();
        dashLine = new THREE.LineSegments(dashG, dashM);
        let dashFuzhu = common.createStraightLine([
          [80, -450, -1],
          [80, 450, -1]
        ], 2, 2, '#000');
        obj2.add(dashLine,dashFuzhu);

        scene.add(obj2);
        moveLine(this.value);
      };
      var createObj = () => {
        if (obj1 != null) {
          scene.remove(obj1);
        }
        obj1 = new THREE.Object3D();
        let dashFuzhu = common.createStraightLine([
          [-this.value * 40 / 3 + 80, 100, 0],
          [80, 100, 0]
        ], 3, 2, '#E8804D');
        let shape = new THREE.Shape();
        let num = this.value>0?10:-10;
          shape.moveTo(10,0);
          shape.lineTo(-5,10);
          shape.lineTo(-1,0);
          shape.lineTo(-5,-10);
          shape.lineTo(10,0);
        
        let sanjiao = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({color:"#E8804D",side:THREE.DoubleSide}));
        sanjiao.position.set(-this.value * 40 / 3 + 80+num,100,1);
        if(this.value>0){
          sanjiao.rotation.z = -Math.PI;
        }

        let text = common.createText('|φ|', (-this.value * 40 / 3 + 80+80)/2, 130, 0, '#E8804D', 20);
        
        obj1.add(dashFuzhu,sanjiao,text);
        scene.add(obj1);
      }
      var isDashShow = () => {
        obj2.visible = this.value == 0 ? false : true;
        obj1.visible = this.value == 0 ? false : true;
      }
      var moveLine = (v) => {
        obj.position.x = -v * 40 / 3;
        createObj();
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
        this.isFirst = false;
      }
      var resetWidget = () => {
        this.value = 6;
        moveLine(this.value);
      };
      var TO = function(argument) {
        return {
          reset: resetWidget,
          moveLine,
          isDashShow
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
  position: fixed;
  bottom: 24px;
  right: 24px;
}

#app .aside_reset {
  position: fixed;
  right: 24px;
  top: 0px;
}

#slider {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

#slider>div#sliderP {
  position: absolute;
  background: transparent;
  top: 76px;
  width: calc(100% - 44px);
  height: 14px;
  z-index: 1
}

#slider>div#sliderP>span {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #f0f0f0;
  border-radius: 50%;
  position: absolute;
}

#blueLine {
  position: absolute;
  height: 6px;
  width: calc(1/4*195px);
  background: #5caefd;
  top: 4px;
}

.equation {
  position: fixed;
  left: 24px;
  top: 92px;
  color: #3494E9;
  font-size: 26px;
  z-index: 10;
  width: 140px;
}

.kuohao {
  display: inline-block;
  position: absolute;
  right: 0;
}

.pi {
  position: absolute;
  right: 10px;
  top: -5px;
  text-align: center;
  width: 28px;
}

.pi p {
  font-size: 18px;
}

.pi p:first-child {
  border-bottom: 2px solid #3494E9;
}

.pi p:first-child {}

</style>
