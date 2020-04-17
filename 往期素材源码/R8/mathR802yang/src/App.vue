<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn size="big" id="btnClick1" :style="btnStyle?btnActive:''">奇偶性</ui-btn>
        <ui-btn type="switch" :width="98" :height="96" :vertical="true" v-model="checked1">对称轴</ui-btn>
        <ui-btn type="switch" :width="98" :height="96" :vertical="true" v-model="checked2">对称中心</ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: '余弦函数的奇偶性、对称性',
        BtnSpaceStyle: 'flex',
        checked1: false,
        checked2: false,
        btnStyle: false,
        btnActive: {
          backgroundColor: '#5badfd',
          color: '#ffffff'
        },
        num: 0,
        trans: null,
        trans1: null,
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
      window.onresize = () => {
        this.setSideStyle();
      };

    },
    computed: {},
    watch: {
      checked1: function () {
        this.TO.symmetric();
      },
      checked2: function () {
        this.TO.point();
      },
    },
    methods: {
      //计算侧边
      setSideStyle() {
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      },
      //初始化
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          axis = null,
          isMob = /iPad|Android/g.test(navigator.userAgent),
          pointAll = new THREE.Group(),
          deshStep=0;
        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
            deshStep=1;
        } else {
          renderer = new THREE.CanvasRenderer({
              antialias: true
          });
          deshStep=8;
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

        //奇偶性点击事件
        var onDocumentMouseDown = () => {
          curve2.visible = false;
          this.btnStyle = true;
          translation();
        };
        var onDocumentMouseUp = () => {
          this.btnStyle = false;
        };
        if(isMob){
            $('#btnClick1')[0].addEventListener('touchstart', onDocumentMouseDown, false);
            $('#btnClick1')[0].addEventListener('touchend', onDocumentMouseUp, false);
        }else{
            $('#btnClick1')[0].addEventListener('mousedown', onDocumentMouseDown, false);
            $('#btnClick1')[0].addEventListener('mouseup', onDocumentMouseUp, false);
        }
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
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
              linewidth: width,
              transparent:true,
              depthTest:false
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
        //画圆圈
        var createYuan = (r, val,color) => {
          var dx, dy, vertices = [];
          for (var i = 0; i < val; i+=12) {
            dx = r * Math.cos(Math.PI / 180 * i);
            dy = r * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, 0));
          }
          var yuan = createLineMesh(vertices, color, 3, 1);
          return yuan;
        };
        //画圆面
        var createCircle = (r, color) => {
          var geometry = new THREE.CircleBufferGeometry(r, 12);
          var material = new THREE.MeshBasicMaterial({color: color,transparent:true,depthTest:false});
          var circle = new THREE.Mesh(geometry, material);
          return circle;
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

            line = createLineMesh(vertices, '#000000', 3,2);
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
        createAxis();

        var curve, curve1 = null, curve2 = null, point = new THREE.Group();
        //创建初始物体
        var createObj1 = () => {
          //创建曲线函数
          let vertices = [];
          for (let i = -480; i <= 480; i++) {
            vertices.push(vec3(i, Math.cos(i / 160 * Math.PI) * 100, 0));
          }
          curve = createLineMesh(vertices, '#0094FF', 3,3);

          var vertices1 = [];
          for (let i = -480; i <= 0; i += deshStep) {
            vertices1.push(vec3(i, Math.cos(i / 160 * Math.PI) * 100, 0));
          }
          curve1 = createLineMesh(vertices1, '#000', 2, 3);
          curve1.visible = false;

          var vertices2 = [];
          for (let i = 0; i <= 480; i += deshStep) {
            vertices2.push(vec3(i, Math.cos(i / 160 * Math.PI) * 100, 0));
          }
          curve2 = createLineMesh(vertices2, '#000', 2, 3);
          curve2.visible = false;

          var point1 = createYuan(6, 360, '#000');
          var yuan = createCircle(6, '#0094FF');
          point.add(point1, yuan);
            point.position.z=5;
          for (let i = -2; i <= 3; i++) {
            var point2 = point.clone();
            point2.position.x = i * 160-80;
            pointAll.add(point2);
            pointAll.visible = false;
          }
          scene.add(curve1, curve, curve2,pointAll);
        };
        createObj1();
        //对称中心
        var point = () => {
          if (this.checked2) {
            pointAll.visible = true;
          } else {
            pointAll.visible = false;
          }
        };

        //对称轴
        var symmetric1 = new THREE.Group();
        var lineBB = null, time;
        var symmetric = () => {
          if (this.checked1) {
            cancelAnimationFrame(time);
            let vertices = [], num = 0;
            let x = 0;
            let y = 400;
            let step = (0 - y) / 20;
            let an = function () {
              num++;
              if (num > 40) {
                cancelAnimationFrame(time);
                return;
              }
              if (symmetric1.children.length > 0) {
                scene.remove(symmetric1);
                symmetric1 = new THREE.Group();
              }
              vertices = [];
              vertices.push(vec3(x, y, 1));
              vertices.push(vec3(x, y + num * step, 1));
              lineBB = createLineMesh(vertices, '#E30000', 2, 3);
              for (var i = -3; i <= 3; i++) {
                var line1 = lineBB.clone();
                line1.position.x = i * 160;
                symmetric1.add(line1);
              }
              scene.add(symmetric1);
              time=requestAnimationFrame(an);
            };
            an();
          } else {
            cancelAnimationFrame(time);
            scene.remove(symmetric1);
            symmetric1 = new THREE.Group();
          }
        };
        //旋转
        var translation = () => {
          cancelAnimationFrame(this.trans);
          cancelAnimationFrame(this.trans1);
          curve1.visible = true;
          var number = 0,number1 = 0,step=0.03;
          curve2.rotation.y=0;
          curve1.rotation.y=0;
          let an1 = () =>{
            // number1++;
            if(curve2.rotation.y <-Math.PI){
              cancelAnimationFrame(this.trans1);
              curve2.rotation.y = -Math.PI;
              return
            }
            curve2.rotation.y -= step;
            this.trans1 = requestAnimationFrame(an1);
          };
          let an = ()=>{
            // number++;
            if (curve1.rotation.y > Math.PI) {
              cancelAnimationFrame(this.trans);
              curve1.rotation.y = Math.PI
              curve2.visible = true;
              an1();
            }else {
              curve1.rotation.y += step;
              this.trans = requestAnimationFrame(an);
            }
          };
          an();
        };

        var resetWidget = () => {
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
          this.checked1 = false;
          this.checked2 = false;

          cancelAnimationFrame(time);
          cancelAnimationFrame(this.trans);
          cancelAnimationFrame(this.trans1);
          curve1.rotation.z = 0;
          curve1.visible = false;
          curve2.rotation.z = 0;
          curve2.visible = false;
          this.num = 0;
          scene.remove(symmetric1);
          symmetric1 = new THREE.Group();
        };
        var renderAll = () => {
          controls.update();
          renderer.clear();
          renderer.render(scene, camera);
          requestAnimationFrame(renderAll);
        };
        renderAll();
        var TO = function () {
          return {
            reset: resetWidget,
            point: point,
            symmetric: symmetric
          }
        };
        return TO();
      },

      //重置
      resetWidget() {
        this.TO.reset();
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

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
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

  html, body, #app {
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  /*内容区*/
  .container {
    width: calc(100% - 130px);
    float: left;
    height: 100%;
    z-index: 1;
    position: relative;
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
    width: 130px;
    height: 100%;
    z-index: 999;
    position: relative;
  }

  #renderCanvas {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 72px);
    position: relative;
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
    width: 100%;
    height: calc(100% - 80px);
    clear: both;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 20px;
  }

  .btnActive {
    background-color: #5badfd;
    color: #ffffff;
  }
</style>
