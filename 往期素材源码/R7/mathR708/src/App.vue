<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <div class="img"><img :src="img1"></div>
      </div>
    </div>
    <!--<ui-btn type="reset3" id="button1" class="aside_reset" @click.native="backWidget" :style="'position:absolute;right:92px;'"></ui-btn>-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="switch-group">
       <ui-btn type="switch" class="switch1" v-model="checked1">
      平移
    </ui-btn>
      <ui-btn type="switch" class="switch2" v-model="checked2">
        隐藏y=sinx 图像
      </ui-btn>
    </div>
   
    <!--侧边按钮区-->
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import uiSlider from '@/components/UI/uiSlider'; //滑块
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '余弦函数的图像（平移法）',
        BtnSpaceStyle: 'flex',
        isFirst: true,
        checked1: false,
        checked2: false,
        TO: null,
        timer:null,
        img1:'static/img/img1.png',
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
      checked1() {
        this.TO.pingyi(this.checked1);
      },
      checked2(){
        this.TO.yincang(this.checked2);
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
          axis = null,
          isMob = null;
        
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
       
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };

        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,
            geometryLine = new THREE.Geometry();
          if (!color) {
            color = '#000';
          }
          if (!width) {
            width = 1;
          }
          if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
              color: color,
              dashSize: 5,
              gapSize: 5,
              depthTest: false,
              linewidth: width
            }));
          } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
              color: color,
              linewidth: width
            }));
          }
          return lineMesh;
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
            font: '18px "Cambria Math"',
            fillStyle: '#000000',
            antialias: true
          };
          var text = {},
            textPI = {},
            textQI = {},
            line = null,
            vertices = null;
          // label x axis:
          for (var i = start-80; i <= stop+80; i = i + stepSize*2) {
            if (i == 0) {
              continue;
            }
            var j=i/160;
            j=j==1?'':j==-1?'-':j;
            textPI = new SpriteText2D(j+'π',textStyle);
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
            text = createText('y', 20, dir.y + 10, 0, '#000', 28)
            axis.add(text);
          }
        };
        createAxis();
        var curve,curve1;
        var createObj1 = () => {
         //创建曲线函数
          let vertices =[];
          let vertices1=[];
          let vertices2=[];
          for(let i =-450; i<450;i++){
            vertices.push(vec3(i,Math.sin(i/160*Math.PI)*100,0));
          }
          curve = createLineMesh(vertices,'#000',3,2);
          curve1 = createLineMesh(vertices,'#f00',3,2);
          curve1.visible=false;

          //创建虚线
          vertices1.push(vec3(-500,100,0));
          vertices1.push(vec3(500,100,0));
          vertices2.push(vec3(-500,-100,0));
          vertices2.push(vec3(500,-100,0));
          
          var dotted1 = createLineMesh(vertices1,'#000',2,1);
          var dotted2 = createLineMesh(vertices2,'#000',2,1);


          scene.add(curve1,curve,dotted1,dotted2);
        };
        createObj1();
      
        var pingyi=(f)=>{
          cancelAnimationFrame(this.timer);
          var i=curve1.position.x;
          curve1.visible=true;
          var an=()=>{
            if(f){
              if(i<=-80){
                cancelAnimationFrame(this.timer);
                return;
              }
              i-=2;
              curve1.position.x-=2;
            }else{
              if(i>=0){
                cancelAnimationFrame(this.timer);
                curve1.visible=false;
                return;
              }
              i+=2;
              curve1.position.x+=2;
            }
            this.timer=requestAnimationFrame(an);
          }
          an();
        }
        var yincang=(f)=>{
          curve.visible=!f;
        }

        var resetWidget = () => {
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
          this.checked1=false;
          this.checked2=false;
          curve1.position.x=0;
          curve1.visible=false;
          cancelAnimationFrame(this.timer);

        };
        var renderAll=()=>{
            controls.update();
            renderer.clear();
            renderer.render(scene, camera);
            requestAnimationFrame(renderAll);
        }
        renderAll();
        var TO = function() {
          return {
            reset: resetWidget,
            pingyi:pingyi,
            yincang:yincang
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
  #app .switch-group {
    position: fixed;
    bottom:24px;
    right:24px;
  }
   #app .switch-group div{
    display: block;
   }
   .switch1{
    margin-bottom: 20px;
   }
  #app .aside_reset {
    position: fixed;
    right:24px;
    top:0px;
  }
  .img{
    position: absolute;
    z-index: 1;
    width: 200px;
    height: 100px;
  }
  .img img{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
