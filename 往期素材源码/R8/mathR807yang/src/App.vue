<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <p class="equation">{{equation}}</p>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
    <ui-slider :label="['-5','5']"
               :min="-5"
               :max="5"
               :title="'ω'"
               formatter="{value}"
               id="slider"
               :speed="0"
               :noBlueProcess="true"
               v-model="value"></ui-slider>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import uiSlider from '@/components/UI/uiSlider'; //滑块

  let {sin, cos, PI, tan} = Math;

  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: 'ω对y=sinωx的图像的影响',
        BtnSpaceStyle: 'flex',
        isFirst: true,
        TO: null,
        sliderPoint: [0, 6, 10],
        value: 1,
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.setSideStyle();
      this.TO = this.init();

      $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"><p>1</p></span><span id="s3"></span><div id="blueLine"></div></div>');
      $('#s2').css('background', '#5caefd');
      this.setSliderPonint();

      this.countWidth(1);

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
      equation() {
        let text = '';
        if (this.value == 0) {
          text = 'y=0';
        } else if (this.value == 1) {
          text = 'y=sinx';
        } else if (this.value == -1) {
          text = 'y=sin(-x)';
        } else {
          text = `y=sin(${this.value}x)`;
        }
        return text;
      }
    },
    watch: {
      value(v) {
        this.countWidth(v);
        this.TO.createObj();
        if(v == 1){
          this.TO.dashLineHide();
        }else {
          this.TO.dashLineShow();
        }
      }
    },
    methods: {
      reset() {
        this.TO.reset();
      },
      setSliderPonint() {
        let vm = this;
        let sliderW = $('#slider').width();
        $('#sliderP span').each(function () {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 10 - 7)
        })
        $('.ui-label li').each(function () {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 10 + 12)
        })
      },
      countWidth(v) {
        let dis = Math.abs(1 - v);
        $('#blueLine').css('width', dis / 10 * 195);
        if (v > 1) {
          $('#blueLine').css({
            'left': 6 / 10 * 195,
            'right': ''
          });
        } else {
          $('#blueLine').css({
            'left': '',
            'right': 4 / 10 * 195
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
          obj1 = null,
          stepNumber,
          axis = null,
          dashLine = null,
          isMob = null;

        let sinLine = null;
        isMob = /iPad|Android/g.test(navigator.userAgent);
        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
          stepNumber = 1;
        } else {
          stepNumber = 8;
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
          //创建标准y=sinx虚线
          let vertices = [], dy;
          for (let i = -400; i < 401; i += 10) {
            dy = 100 * sin(i / 160 * PI);
            vertices.push(vec3(i, dy, 0));
          }
          dashLine = createLineMesh(vertices, '#000', 2, 2);
          scene.add(dashLine);
          createObj();
        };
        var createObj = () => {
          if (sinLine != null) {
            scene.remove(sinLine);
          }
          let vertices = [];
          let dx, dy;
          for (let i = -400; i < 401; i += 2) {
            dy = 100 * sin(this.value * i / 160 * PI);
            vertices.push(vec3(i, dy, 0));
          }
          sinLine = createLineMesh(vertices, '#1500FF', 3, 2);
          scene.add(sinLine);
        };
        var createText = (texts, x, y, z, color, size) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: size + 'px "Cambria Italic"',
            fillStyle: color,
            antialias: true
          };
          var text = new SpriteText2D(texts, textStyle);
          text.position.set(x, y, z);
          return text;
        };
        var createTriangleFace = (vertices, color) => {
          var material = new THREE.MeshBasicMaterial({
            color: color
          });
          var geom = new THREE.Geometry();
          geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
          geom.vertices = vertices;
          var mesh = new THREE.Mesh(geom, material);
          return mesh;
        };
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        var createAxis = () => {
          axis = new THREE.Group();
          labelAxis(-400, 40, 400);
          drawAxisArrow(vec3(-550, 0, 0), vec3(550, 0, 0), 0x000000, 1);
          drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
          scene.add(axis);
        };
        var labelAxis = (start, stepSize, stop) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: '23px "Cambria Math"',
            fillStyle: '#000000',
            antialias: true
          };
          var text = {},
            textPI = {},
            textQI = {},
            line = null,
            vertices = null;
          // label x axis:
          for (var i = start - 80; i <= stop + 80; i = i + stepSize * 2) {
            if (i == 0) {
              continue;
            }
            var j = i / 160;
            j = j == 1 ? '' : j == -1 ? '-' : j;
            textPI = new SpriteText2D(j + 'π', textStyle);
            if (i == 0) {
              textPI.position.x = i + 10;
            } else {
              textPI.position.x = i;
            }
            textPI.position.y = -5;
            axis.add(textPI);
            vertices = [];

            vertices.push(vec3(i, 0, 0));
            vertices.push(vec3(i, 10, 0));

            var line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          // label y axis:
          for (var i = start; i <= stop; i = i + 100) {
            if (i == 0) {
              continue;
            }
            text = new SpriteText2D(i / 100, textStyle);
            text.position.x = -15;
            text.position.y = i + 10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(vec3(0, i, 0));
            vertices.push(vec3(10, i, 0));

            line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          axis.add(text);
        };
        var drawAxisArrow = (origin, dir, color, style) => {
          var geometryLine = new THREE.Geometry();
          var vertices = [];
          vertices.push(origin);
          vertices.push(dir);
          geometryLine.vertices = vertices;
          var line = createLineMesh(geometryLine.vertices, color, 3, 2);
          axis.add(line);
          var text;
          if (style == 1) {
            vertices = [];
            vertices.push(vec3(dir.x - 10, 0, 0));
            vertices.push(vec3(dir.x - 13, 5, 0));
            vertices.push(vec3(dir.x + 5, 0, 0));
            var triangle1 = createTriangleFace(vertices, "#000");
            axis.add(triangle1);
            vertices = [];
            vertices.push(vec3(dir.x - 10, 0, 0));
            vertices.push(vec3(dir.x - 13, -5, 0));
            vertices.push(vec3(dir.x + 5, 0, 0));
            var triangle2 = createTriangleFace(vertices, "#000");
            axis.add(triangle2);
            text = createText('x', dir.x, -5, 0, '#000', 28);
            axis.add(text);
            text = createText('0', -14, -2, 0, '#000', 28);
            axis.add(text);
          } else {
            vertices = [];
            vertices.push(vec3(0, dir.y - 10, 0));
            vertices.push(vec3(5, dir.y - 13, 0));
            vertices.push(vec3(0, dir.y + 5, 0));
            var triangle1 = createTriangleFace(vertices, "#000");
            axis.add(triangle1);
            vertices = [];
            vertices.push(vec3(0, dir.y - 10, 0));
            vertices.push(vec3(-5, dir.y - 13, 0));
            vertices.push(vec3(0, dir.y + 5, 0));
            var triangle2 = createTriangleFace(vertices, "#000");
            axis.add(triangle2);
            text = createText('y', 20, dir.y + 10, 0, '#000', 28);
            axis.add(text);
          }
        };
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,
            geometryLine = new THREE.Geometry();
          if (!color) {
            color = '#000';
          }
          if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            var M=new THREE.LineDashedMaterial({
              color: color,
              dashSize: 15,
              gapSize: 15,
              linewidth: width
            })
            if(isMob){
              lineMesh = new THREE.Line(geometryLine,M);
            }else{
              lineMesh = new THREE.LineSegments(geometryLine,M);
            }
          } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
              color: color,
              linewidth: width
            }));
          }
          return lineMesh;
        };
        var dashLineShow = () =>{
          dashLine.visible = true;
        };
        var dashLineHide = () =>{
          dashLine.visible = false;
        };
        var animate = () => {
          requestAnimationFrame(animate);
          renderer.clear();
          controls.update();
          //面和实线场景
          renderer.render(scene, camera);
          //虚线场景
          if (this.checked) {
            scene.add(obj1);
          } else {
            scene.remove(obj1);
          }
        };
        if (this.isFirst) {
          animate();
          createAxis();
          createObj1();
          dashLine.visible = false;
          this.isFirst = false;
        }
        var resetWidget = () => {
          this.value = 1;
          createObj();
          dashLine.visible = false;
        };
        var TO = function () {
          return {
            reset: resetWidget,
            createObj,
            dashLineHide:dashLineHide,
            dashLineShow:dashLineShow
          }
        };
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
    cursor: pointer;
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
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }
  #app .btn-switch {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
  #app .aside_reset {
    position: fixed;
    right: 24px;
    top: 0;
  }
  #slider {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
  #slider > div#sliderP {
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
  }
  #slider > div#sliderP > span {
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
    width: calc(3 / 20 * 195px);
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
  }
  #s2 p{
    font-size: 14px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    display: table-cell;
    position: absolute;
    top:-32px;
  }
</style>
