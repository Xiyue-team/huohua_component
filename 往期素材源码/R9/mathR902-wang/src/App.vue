<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <div class="loading" v-show='!isReady' :style="'height:100%;width:100%;text-align:center;'">loading...</div>
      </div>
    </div>
    <!--返回按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
    <!-- 滑动条 -->
    <ui-slider id="slider" :realTime="true" :min="0" :max="270" :title="false" :box="true" :boxHeight="60" :tooltip="false" :speed="0" v-model='value'> </ui-slider>
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
//定义全局变量，方便修改
let { sin, cos, PI, tan } = Math;
const xishu = 100;
const lineWidth = 2;
const front = 10;
const back = -1;
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '海螺图',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      TO: null,
      value: 0,
      sliderPoint: [0, 90, 180, 270],
      pre: -1,
      isReady: false,
    }
  },
  created() {
    document.title = this.title;
    this.color = ['#4FCECA', '#54D7C6', '#58CBC9', '#5BBECD', '#5FB2D0', '#63A6D4', '#679AD7', '#6A8DDB', '#6E81DE', '#7275E2', '#7669E5', '#795CE9', '#7D50EC', '#8144F0', '#8538F3', '#882BF7', '#8C1FFA', '#9013FE' ];
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.setSideStyle();
    this.TO = this.init();
    $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span></div>');
    this.setSliderPoint();
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
      this.TO.showLines(v);
      if (Math.trunc(v / 90) == this.pre) return;
      this.pre = (v / 90) | 0;
      let indexArr = this.sliderPoint.forEach(function(value, index) {
        if (value <= v) {
          $('#sliderP span').eq(index).css('background', '#5caefd');
        } else {
          $('#sliderP span').eq(index).css('background', '#f0f0f0');
        }
      })
    }
  },
  methods: {
    setSliderPoint() {
      let vm = this;
      let sliderW = $('#slider').width();
      $('#sliderP span').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 270 - 7)
      })
    },
    reset() {
      this.TO.reset();
    },
    init() {
      var texture = new THREE.TextureLoader().load('static/obj/hailuo2.png');
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
      isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      // camera = new THREE.OrthographicCamera(mainWidth / -1, mainWidth / 1, mainHeight / 1, mainHeight / -1, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 1000;
      camera.lookAt(scene.position);
      scene.add(camera);
      // renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = false;
      controls.enableRotate = true;
      controls.enablePan = false;
      //创建灯光
      // var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      // directionalLight.position.set = (0,0,200);
      // directionalLight.target = model;
      // scene.add( directionalLight ); 
      var light = new THREE.AmbientLight(0x404040); // soft white light
      // scene.add( light );
      var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight1.position.set(0, 0, 1000);
      scene.add(dirLight1);
      var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight2.position.set(0, 0, -1000);
      scene.add(dirLight2);
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.56);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 0, 0);
      scene.add(hemiLight);
      // var spotLight = new THREE.SpotLight( 0xffffff );
      // spotLight.position.set( 0, 0, 1000 );
      // scene.add( spotLight );
      $("#renderCanvas").append(renderer.domElement);

      function modelPut(obj, mtl, O, scale, callback) {
        var onProgress = function(xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
          }
        };
        var onError = function(xhr) {};
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('static/obj/');
        mtlLoader.load(mtl, function(materials) {
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath('static/obj/');
          objLoader.load(obj, function(object) {
            object.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshPhongMaterial({
                  map: texture,
                });
                child.material.shading = THREE.SmoothShading;
                child.material.side = THREE.DoubleSide;
                // child.material.depthTest = false;
              }
            })
            object.scale.x = scale;
            object.scale.y = scale;
            object.scale.z = scale;
            O.add(object);
            callback && callback(O);
          }, onProgress, onError);
        });
      }
      let model = new THREE.Group();
      let hailuo = null,
        hailuo1 = null; 
      //导入模型
      let thiz = this;
      modelPut('hailuo.obj', 'hailuo.mtl', model, 5.1, function(O) {
        thiz.isReady = true;
        model.position.set(0, 0, 1);
        // model.position.z = -1;
        model.rotation.x = Math.PI / 2;
        [hailuo, hailuo1] = model.children[0].children;
        hailuo.material.transparent = true;
        hailuo1.material.transparent = true;
        scene.add(model);
      })
      //创建1到19的平方根的数组
      let numArr = [];
      for (let i = 1; i < 19; i++) {
        numArr.push({ nearLine: Math.sqrt(i), index: i + 1 });
      };
      // console.table(numArr);
      //创建已临边为x轴，对边为平行与y轴的直角三角形，然后旋转角度
      let rad, angle;
      numArr.reduce(function(pre, cur) {
        rad = Math.atan(1 / cur.nearLine);
        angle = common.angle(rad);
        cur.angle = pre;
        return angle + pre;
      }, 0);
      //创建数组保存对线段文字的引用，以方便显示隐藏
      let lineGroupArr = [];
      let lineCopyGroupArr = [];

      var createObj = () => {
        let group = null;
        let groupCopy = null;
        let lineParameters = null;
        let line1Parameters = null;
        let text = null;
        let text1 = null;
        let line = null;
        let line1 = null;
        let lineCopy = null;
        let line1Copy = null;
        for (let [index, value] of numArr.entries()) {
          group = new THREE.Object3D();
          groupCopy = new THREE.Object3D();
          // line = common.createStraightLine([
          //   [0, 0, 0],
          //   [-value.nearLine * xishu, -1 * xishu, 0]
          // ], 3, lineWidth, '#FF5D00');
          lineParameters = new three3DExtras.tubeLine([0, 0, front], [-value.nearLine * xishu - 1, -1 * xishu, front], lineWidth, this.color[index]);
          // line1 = common.createStraightLine([
          //   [-value.nearLine * xishu, -1 * xishu, 0],
          //   [-value.nearLine * xishu, 0, 0]
          // ], 3, lineWidth, '#0094FF');
          line =lineParameters.getObject3D();
          lineCopy = lineParameters.getObject3D();
          lineCopy.material.depthTest = false;
          // line.material.depthTest = false;
          line1Parameters = new three3DExtras.tubeLine([-value.nearLine * xishu, -1 * xishu - 2, front], [-value.nearLine * xishu, 2, front], lineWidth, this.color[index]);
          line1 = line1Parameters.getObject3D();
          line1Copy = line1Parameters.getObject3D();
          line1Copy.material.depthTest = false;
          // line1.material.depthTest = false;
          text = common.createText('1', -value.nearLine * xishu - 20, -1 * xishu / 2 + 12, 0, '#000', 24);
          text.material.depthTest = false;
          text1 = common.createText(value.index, (-value.nearLine * xishu) / 1.5 + 5, -1 * xishu / 2 - 15, 0, '#000', 24, true);
          text1.material.depthTest = false;
          group.add(line, line1, text, text1);
          group.rotation.z = common.radian(value.angle);
          group.visible = false;
          groupCopy.add(lineCopy,line1Copy);
          groupCopy.rotation.z = common.radian(value.angle);
          groupCopy.visible = false;
          lineGroupArr.push(group);
          lineCopyGroupArr.push(groupCopy);
          scene.add(group,groupCopy);
        }
        // line = common.createStraightLine([
        //   [0, 0, 0],
        //   [-1 * xishu, 0, 0]
        // ], 3, lineWidth, '#0094FF');
        lineParameters = new three3DExtras.tubeLine([0, 0, front], [-1 * xishu, 0, front], lineWidth, '#53D5D1');
        line = lineParameters.getObject3D();
        lineCopy = lineParameters.getObject3D();
        // console.log(line);
        lineCopy.material.depthTest = false;
        text = common.createText('1', -xishu / 2 - 12, 6, 0, '#000', 24);
        text.material.depthTest = false;
        lineGroupArr[0].add(line, text);
        lineCopyGroupArr[0].add(lineCopy);


        //shiyan
        var geometry = new THREE.SphereGeometry( 200, 32, 32 );
        var material = new THREE.MeshPhongMaterial( {color: 0xffff00,transparent:true,opacity:0} );
        var sphere = new THREE.Mesh( geometry, material );
        // sphere.material.depthTest = false;
        // sphere.material.depthWrite = false;
        // scene.add( sphere );
      };
      createObj();
      let arrLength = lineGroupArr.length - 1;
      var showLines = (v) => {
        let num = 0;
        if (v <=180 && v > 90) {
          // if (v % 5 != 0) return;
          if(hailuo1.visible){
            hailuo1.visible = false;
          }
          if (hailuo.material.opacity != 1) {
            hailuo.material.opacity = 1;
          }
          num = (v - 90) / 5 | 0;
          lineGroupArr.forEach((value, index) => {
            if (index < num) {
              value.visible = true;
            } else {
              value.visible = false;
            }
          });
          lineCopyGroupArr.forEach((value, index) => {
            if (index < num) {
              value.visible = true;
            } else {
              value.visible = false;
            }
          })
        } else if (v > 180) {
          if(hailuo1.visible){
            hailuo1.visible = false;
          }
          if (!lineGroupArr[arrLength].visible) {
            lineGroupArr.forEach((value, index) => {
              value.visible = true;
            })
            lineCopyGroupArr.forEach((value, index) => {
              value.visible = true;
            })
          }
          num = (270 - v) / 90;
          hailuo.material.opacity = num;
        } else if (v <= 90) {
          if (hailuo.material.opacity != 1) {
            hailuo.material.opacity = 1;
          }
          if(!hailuo1.visible){
            hailuo1.visible = true;
          }
          if (lineGroupArr[0].visible) {
            lineGroupArr.forEach((value, index) => {
              value.visible = false;
            })
            lineCopyGroupArr.forEach((value, index) => {
              value.visible = false;
            })
          }
          num = 1 - v / 90;
          hailuo1.material.opacity = num;
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
      var resetWidget = () => {
        this.value = 0;
        camera.position.set(0,0,1000);
        showLines(0);
      };
      var TO = function(argument) {
        return {
          reset: resetWidget,
          showLines,
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

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}

#slider {
  position: fixed;
  width: 70vw !important;
  left: 15vw;
  right: 15vw;
  bottom: 24px;
}

#slider>div#sliderP {
  position: absolute;
  background: transparent;
  top: 26px;
  width: calc(100% - 44px);
  height: 14px;
  z-index: 1;
}

#slider>div#sliderP>span {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #f0f0f0;
  border-radius: 50%;
  position: absolute;
}

.loading {
  position: relative;
  z-index: 10;
  line-height: calc(100vh - 80px);
  background-color: #fff;
}

</style>
