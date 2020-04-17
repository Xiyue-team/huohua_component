<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>
    <!--模型区域-->


    <div class="container" :style="'height:'+H+'px'">
      <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
        <div class="ViewSpace" :style="'transform: scale('+zoom+')'">

          <div class="leftWrap"><img :src="img1" ondragstart="return false;"></div>

          <div class="rightWrap" id="renderCanvas">

            <div class="showImg" @click='showCanvas' v-show='isShow'>
              <img :src="img2" ondragstart="return false;">
            </div>
          </div>

          <div class="bottomWrap">
            <ui-slider :value=value :zoom="zoom" :speed="0" :boxWidth="580" :dragable="dragToggle" :clickable="false" :boxHeight="53" :title="false" :piecewise="true" :piecewiseLabel="false" :tooltip="false" :noBlueProcess="false" :data="[0,1,2,3]" @callback='choose' v-model="value" v-if='slideShow'>
            </ui-slider>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>
<script>
import common from '@/common/common'; //公共函数
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
const { sin, cos, PI, tan, pow, abs, sqrt } = Math;
const SCALE = 10; //放大系数
const R = 25 * SCALE; //球的半径
export default {
  name: 'app',
  components: { uiHead, uiBtn, uiSlider },
  data() {
    return {
      title: '等边四棱锥外接球',
      BtnSpaceStyle: 'flex',
      TO: null,
      dragToggle:true,
      img1: 'static/img/sub-1.png',
      img2: 'static/img/start.png',
      isShow: true,
      H: window.innerHeight - 76,
      VW: window.innerWidth / (window.innerHeight - 76) ? 1024 * window.innerHeight / 545 : window.innerWidth,
      VH: window.innerWidth / (window.innerHeight - 76) ? window.innerHeight : 545 * window.innerHeight / 1024,
      zoom: window.innerWidth / (window.innerHeight - 76) ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
      value: 0,
      slideShow: false,

    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    document.onselectstart = function() {
      return false;
    };
    console.log(this.VW,this.VH);
    this.getViewSize();

    window.addEventListener('resize', () => {
      this.getViewSize();
    });
    this.TO = this.init();
    this.TO.createObj();

  },
  watch: {},

  methods: {
    //图片预加载
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback(img.src);
      }
    },
    //滑动条
    choose(v) {
        setTimeout(()=>{
            if (v == 0) {
                this.imgL("static/img/sub-2.png", () => {
                    this.img1 = 'static/img/sub-2.png';
                });

                this.TO.createObj();

            }
            if (v == 1) {
                this.imgL("static/img/sub-3.png", () => {
                    this.img1 = 'static/img/sub-3.png';
                });
                this.TO.createObj1();
            }

            if (v == 2) {
                this.imgL("static/img/sub-4.png", () => {
                    this.img1 = 'static/img/sub-4.png';
                });
                this.TO.createObj2();
            }
            if (v == 3) {
                this.imgL("static/img/sub-5.png", () => {
                    this.img1 = 'static/img/sub-5.png';
                });
                this.TO.createObj3();
            }
        },200);
    },
    //重置函数
    reset() {
      this.TO.reset();
    },
    //显示canvas
    showCanvas() {
      this.TO.showCanvas();
    },

    //初始化
    init() {
      var scene, camera, renderer, mainWidth, mainHeight, controls;
      var obj = new THREE.Group();
      var obj1 = new THREE.Group();
      var obj2 = new THREE.Group();
      var obj3 = new THREE.Group();
      var timer1, timer2, timer3, timer4;

      //创建场景
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();

      scene = new THREE.Scene();
      // camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera = new THREE.OrthographicCamera(mainWidth / -1, mainWidth / 1, mainHeight / 1, mainHeight / -1, -100, 10000);
      camera.position.set(0, 200, 1000);
      // camera.position.set(500,0,500);
      camera.zoom = 1;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);
      //灯光
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
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio*this.zoom);
      renderer.autoClear = false;
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
       controls.minZoom = 0.5;
      controls.maxZoom = 1.6;
      $("#renderCanvas").append(renderer.domElement);
      $('canvas').hide();

      var pointPos = {
        o: [0, 0, 0],
        a: [-125 * sqrt(2), 0, 125 * sqrt(2)],
        b: [125 * sqrt(2), 0, 125 * sqrt(2)],
        c: [125 * sqrt(2), 0, -125 * sqrt(2)],
        d: [-125 * sqrt(2), 0, -125 * sqrt(2)],
        s: [0, 250, 0],
      };
      var rotate = (aim,callback) => {
        var position = camera.position;
        var x = aim[0] - position.x,
          y = aim[1] - position.y,
          z = aim[2] - position.z;
        var n = 20,
          v1 = x / n,
          v2 = y / n,
          v3 = z / n;
        var a = setInterval(function() {
          n--;
          if (n < 0) {
            clearInterval(a);
            callback && callback();
            return false;
          }
          position = camera.position;
          camera.position.set(position.x + v1, position.y + v2, position.z + v3);
        }, 40);
      }
      //初始正四面体
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj, obj1,obj2, obj3);
        }
        obj = new THREE.Group();
        let vertices;
        //创建球
        let sphere = common.createSphere(R, { color: '#8EC4F0', opacity: 0.4, segments: 48, depthTest: false });
        // 创建O点 、文字
        let sphereText = createPointGroup('O', 4, pointPos.o);
        obj.add(sphere, sphereText);
        scene.add(obj);
      };

      var createObj1 = () => {
        if (obj1 != null) {
          scene.remove(obj1,obj2, obj3);
        }
        obj1 = new THREE.Group;
        this.dragToggle=false;
        //创建球内切虚线
        // let sphereLine = common.drawCircleLine(R, { style: 2, isLay: true, line_width: 2 });
        //创建圆心截面
        let sphereMesh = common.createCircle(R, { isLay: true, color: '#FF6A79', segments: 48, opacity: 0.25, depthTest: false });
        //ABCD文字
        let textA = createPointGroup('A', 4, pointPos.a);
        let textB = createPointGroup('B', 4, pointPos.b);
        let textC = createPointGroup('C', 4, pointPos.c);
        let textD = createPointGroup('D', 4, pointPos.d);

        //ABCD四边形连线
        let line1 = common.createStraightLine([pointPos.a, pointPos.b], 3, 4, '#00B2FF', 0.1);
        let line2 = common.createStraightLine([pointPos.b, pointPos.c], 3, 4, '#00B2FF', 0.1);
        let line3 = common.createStraightLine([pointPos.c, pointPos.d], 3, 4, '#00B2FF', 0.1);
        let line4 = common.createStraightLine([pointPos.a, pointPos.d], 3, 4, '#00B2FF', 0.1);
        //ABCD到顶点S的动画
        let textS;
        common.getLong(pointPos.a, pointPos.s, obj1, obj1, { color: '#0DB2FF' }).then(() => {
          textS = createPointGroup('S', 4, pointPos.s);
          this.dragToggle=true;
          obj1.add(textS);
        });
        common.getLong(pointPos.b, pointPos.s, obj1, obj1, { color: '#0DB2FF' });
        common.getLong(pointPos.c, pointPos.s, obj1, obj1, { color: '#0DB2FF' });
        common.getLong(pointPos.d, pointPos.s, obj1, obj1, { color: '#0DB2FF' });
        rotate([0, 200, 1000]);
        obj1.add(sphereMesh, textA, textB, textC, textD, line1, line2, line3, line4);
        scene.add(obj1);
      };
      var createObj2 = () => {
        if (obj2 != null) {
          scene.remove(obj2,obj3);
        }
        this.dragToggle=false;
        obj2 = new THREE.Group();
        common.getLong(pointPos.a, pointPos.c, obj2, obj2, { style:2, color: '#f00' }).then(() => {
          rotate([500, 0, 500],()=>{
             this.dragToggle=true;
          });                
        });
        scene.add(obj2);
      };
      var createObj3 = () => {
        if (obj3 != null) {
          scene.remove(obj3);
        }
        this.dragToggle=false;
        obj3 = new THREE.Group();
        common.getLong(pointPos.s, pointPos.o, obj3, obj3, { style:2,line_width: 6, color: '#FF1F3A' }).then(() => {
          let textR = common.createText('R', -20, 150, 0);
          this.dragToggle=true;
          obj3.add(textR);
        });
        scene.add(obj3);
      };


      //创建坐标点的圆圈和文字
      var createPointGroup = (text, radius, position) => {
        let group = new THREE.Group();
        let point = common.createBall(radius, { color: '#F30000', segments: 12 });
        point.position.set(...position);
        let wenzi = common.createText(text, position[0] * 1.1, position[1] + 30, position[2] * 1.1, '#000', 48);
        group.add(point, wenzi);
        return group;
      }

      //右侧图片点击隐藏-canvas显示
      var showCanvas = () => {
        $('.showImg').hide();
        $('canvas').show();
        this.slideShow = true;
        this.imgL("static/img/sub-2.png", () => {
          this.img1 = 'static/img/sub-2.png';
        });

      };

      //重置
      var resetWidget = () => {
        $('.showImg').show();
        $('canvas').hide();
        this.value = 0;
        this.slideShow = false;
        this.imgL("static/img/sub-1.png", () => {
          this.img1 = 'static/img/sub-1.png';
        });
        createObj();
        this.dragToggle=true;
        camera.position.set(0, 200, 1000);
        camera.zoom = 1;
        camera.updateProjectionMatrix();
      };

      //渲染场景
      var renderAll = () => {
        controls.update();
        renderer.clear();
        renderer.render(scene, camera);
        requestAnimationFrame(renderAll);
      }
      renderAll();
      //回调函数
      var TO = function() {
        return {
          reset: resetWidget,
          showCanvas: showCanvas,
          createObj: createObj,
          createObj1: createObj1,
          createObj2: createObj2,
          createObj3: createObj3,
        }
      }
      return TO();
    },

    //计算区块大小
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
.View{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
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

.ViewSpace .leftWrap>img {
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
  right: 0;
  float: right;
  cursor: pointer;
}

.ViewSpace .rightWrap img {
  display: inline-block;
  width: 100%;
  height: 100%;
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