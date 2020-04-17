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
      <div class="center">
        <ui-slider :label="['-3','3']" :min="-3" :max="3" :title="'λ'" :interval="0.1" :speed="0"
                 class="slider"  :noBlueProcess="true" v-model="value"></ui-slider>
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
        title: '数乘向量的大小和方向',
        BtnSpaceStyle: 'flex',
        value:1.5,
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
      $('.slider').append('<div class="sliderP"><div class="blueLine"></div></div>');
      this.countWidth(1.5);
    },
    computed: {},
    watch: {
      value(value) {
        this.countWidth(value);
        //红线
        this.TO.createLine(value*250);
        //红线箭头
        this.TO.createRed(value*250);

        // this.TO.planeBluePosition(value*250);
        this.TO.creatText(value);
      },
    },
    methods: {
      //滑动条移动蓝条
      countWidth(v) {
        let dis = Math.abs(0 - v);
        $('.blueLine').css('width', dis / 6 * 195);
        if (v > 0) {
          $('.blueLine').css({
            'left': 1 / 2 * 195,
            'right': ''
          });
        } else {
          $('.blueLine').css({
            'left': '',
            'right': 1 / 2 * 195
          });
        }
      },
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
          Line = null,
          jian3 = null,
          jian4 = null,
          planeBlue = null,
          stepNumber = null,
          text = null,
          jiantou = null,
          isMob = /iPad|Android/g.test(navigator.userAgent);
        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
          stepNumber = 1;
        } else {
          stepNumber =8;
          renderer = new THREE.CanvasRenderer();
        }
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
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

        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        //平面
        var creatPlane = (width,height,num) =>{
          var geometry = new THREE.PlaneBufferGeometry( width, height);
          var material = new THREE.MeshBasicMaterial( {
            transparent:true,
            map: THREE.ImageUtils.loadTexture("static/UI/"+num+".png")
          } );
          var plane = new THREE.Mesh( geometry, material );
          return plane;
        };
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,geometryLine = new THREE.Geometry();
          if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            var M=new THREE.LineDashedMaterial({
              color: color,
              dashSize: 10,
              gapSize: 10,
              linewidth: width
            });
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
        var createText = (texts, x, y, z, color, size) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: size + 'px "Cambria Italic"',
            fillStyle: color,
            antialias: true,
          };
          var text = new SpriteText2D(texts, textStyle);
          text.position.set(x, y, z);
          return text;
        };
        var createLine = (x) =>{
          scene.remove(Line);
          if(x==0){
              return;
          }
          var vertices = [];
          vertices.push(vec3(0,0,1),vec3(x,0,1));
          Line = createLineMesh(vertices, '#E30000', 3, 6);
          scene.add(Line);
        };
        var createTriangleFace = (vertices, color) => {
          var material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide
          });
          var geom = new THREE.Geometry();
          geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
          geom.vertices = vertices;
          var mesh = new THREE.Mesh(geom, material);
          return mesh;
        };
        var createRed = (x) =>{
          scene.remove(jian3,jian4);
          var vertices2 = [],y;
          if(x == 0){
            return;
          }else if(x <0){
            y = x-30;
          }else {
            y = x+30;
          }
          vertices2.push(vec3(x,0,1),vec3(x,10,1),vec3(y,0,1));
          jian3 = createTriangleFace(vertices2,'#E30000');
          var vertices3 = [];
          vertices3.push(vec3(x,0,1),vec3(x,-10,1),vec3(y,0,1));
          jian4 = createTriangleFace(vertices3,'#E30000');
          scene.add(jian3,jian4);
        };
        var planeBluePosition = (x) => {
          planeBlue.position.set(x/2+35,28,1);
          if(x == 0){
            planeBlue.visible = false;
          }else {
            planeBlue.visible = true;
          }
        };
        var creatText = (x) =>{
          scene.remove(text,jiantou);
          //文字
          var l=x.toString().length;
          if(x==-1){
              l=1;
          }
          text = createText((x==-1?'-':x==1?'':x)+'a',(x>0?x*250/2+15/4*(4-l):x*250/2+4*(4-l)-3)-10,45,0,'#1500FF',34);
          if(x == 0){
            return;
          }
          let xx = text.canvas.textWidth;
          let posX = text.position.x;
          jiantou =createText('→',posX+xx/2-7,55,0,'#1500FF',26);
          scene.add(text,jiantou);
        };
        //创建初始物体
        var createObj = () => {
          //虚线
          var vertices = [];
          vertices.push(vec3(-800,0,0),vec3(800,0,0));
          var dashLine = createLineMesh(vertices, '#000', 2, 5);
          //左上角的面
          // var plane = creatPlane(150,78,3);
          // plane.position.set(-500,500,0);

          //红线
          createLine(250*1.5);

          //蓝线
          var vertices1 = [];
          vertices1.push(vec3(0,200,1),vec3(250,200,1));
          var blueLine = createLineMesh(vertices1, '#0094FF', 3, 6);

          //蓝线上面的平面
          // var plane1 = creatPlane(52,60,2);
          // plane1.position.set(130,230,0);
          let topText = createText('a',130,250,0,'#1500FF',34);
          let topjiantou = createText('→',132,260,0,'#1500FF',26);

          //蓝线上的箭头
          var vertices2 = [];
          vertices2.push(vec3(250,200,1),vec3(250,210,1),vec3(280,200,1));
          var jian = createTriangleFace(vertices2,'#0094FF');
          var vertices3 = [];
          vertices3.push(vec3(250,200,1),vec3(250,190,1),vec3(280,200,1));
          var jian1 = createTriangleFace(vertices3,'#0094FF');

          //红线上的箭头
          createRed(250*1.5);

          // //红线上面的面
          // planeBlue = creatPlane(32,40,2);
          // planeBlue.position.set(220,28,1);

          creatText(1.5);
          scene.add(dashLine,blueLine,jian,jian1,topText,topjiantou);
        };
        createObj();
        //重置
        var resetWidget = () => {
          this.countWidth(1.5);
          this.value = 1.5;
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
            createLine:createLine,
            createRed:createRed,
            planeBluePosition:planeBluePosition,
            creatText:creatText,
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
    width: 100%;
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
    width: 260px;
    height: 100%;
    z-index: 999;
    position: absolute;
    right: 0;
  }

  #renderCanvas {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 72px);
    position: relative;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .btn_space .UI-btn {
    margin-bottom: 20px;
  }

  .center{
    position: absolute;
    width: 260px;
    height: 100px;
    bottom: 60px;
  }
  .blueLine{
    position: absolute;
    height: 6px;
    width: calc(3 / 20 * 195px);
    background: #5caefd;
    top: 4px;
  }
  .slider > div.sliderP{
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
  }
</style>
