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
        <ui-btn size="big" id="btnClick1" :style="btnStyle?btnActive:''" @click.native="conversion">转化</ui-btn>
        <ui-btn type="switch" :width="98" :height="96" :vertical="true" v-model="checked" v-bind:class='{"active" : allClick,"noactive":!allClick}'>证明</ui-btn>
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
        title: '辅助角公式的证明（直角梯形面积法）',
        BtnSpaceStyle: 'flex',
        checked: false,
        btnStyle: false,
        btnActive: {
          backgroundColor: '#5badfd',
          color: '#ffffff'
        },
        allClick:false,
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
      checked: function () {
        if(this.checked){
          this.TO.proveShow();
        }else {
          this.TO.proveHide();
        }
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
      conversion() {
        if (this.btnStyle) {
          console.log('没点击');
          this.allClick = false;
          this.TO.TriangleHide();
          this.btnStyle = false;
          this.checked = false;
          this.TO.otherTriangleShow();
        } else {
          console.log('点击了');
          this.allClick = true;
          this.TO.TriangleShow();
          this.btnStyle = true;
          this.TO.otherTriangleHide();
        }
      },
      //初始化
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          Triangle4 = null,
          Triangle5 = null,
          isMob = /iPad|Android/g.test(navigator.userAgent),
          point2 = {
            1:[-350,100,0],
            2:[-350,-200,0],
            3:[50,-200,0],
            4:[350,-200,0],
            5:[350,200,0]
          },
          point = {
              1:[-350,100,0],
              2:[-350,-200,0],
              3:[50,-200,0],
              4:[300*1.5+50,-200,0],
              5:[300*1.5+50,400*1.5-200,0]
          },
          provePlane;
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
            var M = new THREE.LineDashedMaterial({
              color: color,
              dashSize: 15,
              gapSize: 15,
              linewidth: width
            });
            if (isMob) {
              lineMesh = new THREE.Line(geometryLine, M);
            } else {
              lineMesh = new THREE.LineSegments(geometryLine, M);
            }
          } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
              color: color,
              linewidth: width
            }));
          }
          lineMesh.position.z = 2;
          return lineMesh;
        };
        //画圆圈
        var createYuan = (r, val, color) => {
          var dx, dy, vertices = [];
          for (var i = 0; i < val; i++) {
            dx = r * Math.cos(Math.PI / 180 * i);
            dy = r * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, 0));
          }
          var yuan = createLineMesh(vertices, color, 3, 1);
          return yuan;
        };
        //画圆面
        var createCircle = (r, color) => {
          var geometry = new THREE.CircleBufferGeometry(r, 32,0,Math.PI);
          var material = new THREE.MeshBasicMaterial({color: color,transparent:true,overdraw:1});
          var circle = new THREE.Mesh(geometry, material);
          return circle;
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
        //造三角面
        var createTriangle = (x1, y1, z1, x2, y2, z2, x3, y3, z3,color) => {
          var geometry = new THREE.Geometry(); //声明一个空几何体对象
          var p1 = vec3(x1, y1, z1); //顶点1坐标
          var p2 = vec3(x2, y2, z2); //顶点2坐标
          var p3 = vec3(x3, y3, z3); //顶点3坐标

          geometry.vertices.push(p1, p2, p3); //顶点坐标添加到geometry对象

          var face = new THREE.Face3(0, 1, 2); //创建三角面
          geometry.faces.push(face); //三角面添加到几何体
          var material = new THREE.MeshBasicMaterial({
            color: color,//三角面颜色
            side: THREE.DoubleSide//两面可见
          });//材质对象
          var mesh = new THREE.Mesh(geometry, material);//网格模型对象
          return mesh;//网格模型添加到场景中
        };
        var obj1=new THREE.Group();
        //创建初始物体
        var createObj1 = () => {
          var vertices = [];
          vertices.push(vec3(point[1][0],point[1][1],point[1][2]),vec3(point[2][0],point[2][1],point[2][2]));
          var line1 = createLineMesh(vertices,'#1B8B72',3,3);

          vertices = [];
          vertices.push(vec3(point[2][0],point[2][1],point[2][2]),vec3(point[3][0],point[3][1],point[3][2]));
          var line2 = createLineMesh(vertices,'#1B8B72',3,3);

          vertices = [];
          vertices.push(vec3(point[3][0],point[3][1],point[3][2]),vec3(point[4][0],point[4][1],point[4][2]));
          var line3 = createLineMesh(vertices,'#FF5D00',3,3);

          vertices = [];
          vertices.push(vec3(point[4][0],point[4][1],point[4][2]),vec3(point[5][0],point[5][1],point[5][2]));
          var line4 = createLineMesh(vertices,'#FF5D00',3,3);

          vertices = [];
          vertices.push(vec3(point[5][0],point[5][1],point[5][2]),vec3(point[3][0],point[3][1],point[3][2]));
          var line5 = createLineMesh(vertices,'#FF5D00',3,3);

          vertices = [];
          vertices.push(vec3(point[3][0],point[3][1],point[3][2]),vec3(point[1][0],point[1][1],point[1][2]));
          var line6 = createLineMesh(vertices,'#1B8B72',3,3);

          var sinα = createText('sin α',-400,-40,2,'#1500FF',32);
          var cosα = createText('cos α',-150,-200,2,'#1500FF',32);
          var a = createText('a',300,-200,2,'#1500FF',32);
          var b = createText('b',520,80,2,'#1500FF',32);

          var yuanquan = createYuan(50,180,'#1B8B72');
          yuanquan.position.set(50,-200,1);

          var yuanmian = createCircle(50,'#deffd4');
          yuanmian.position.set(50,-200,1);

          var α = createText('α',-25,-150,2,'#BD10E0',32);

          var παβ = createText('π-α-β',30,-100,2,'#BD10E0',32);

          var β = createText('β',125,-150,2,'#BD10E0',32);

          var plane1 = creatPlane(113,40,1);
          plane1.position.set(200,110,-1);

          obj1.add(line1,line2,line3,line4,line5,line6,sinα,cosα,a,b,yuanquan,yuanmian,α,παβ,β,plane1);
          scene.add(obj1);
        };
        createObj1();

        var obj2=new THREE.Group();
        var createObj2 = () => {
            var vertices = [];
            vertices.push(vec3(point2[1][0],point2[1][1],point2[1][2]),vec3(point2[2][0],point2[2][1],point2[2][2]));
            var line1 = createLineMesh(vertices,'#1B8B72',3,3);

            vertices = [];
            vertices.push(vec3(point2[2][0],point2[2][1],point2[2][2]),vec3(point2[3][0],point2[3][1],point2[3][2]));
            var line2 = createLineMesh(vertices,'#1B8B72',3,3);

            vertices = [];
            vertices.push(vec3(point2[3][0],point2[3][1],point2[3][2]),vec3(point2[4][0],point2[4][1],point2[4][2]));
            var line3 = createLineMesh(vertices,'#FF5D00',3,3);

            vertices = [];
            vertices.push(vec3(point2[4][0],point2[4][1],point2[4][2]),vec3(point2[5][0],point2[5][1],point2[5][2]));
            var line4 = createLineMesh(vertices,'#FF5D00',3,3);

            vertices = [];
            vertices.push(vec3(point2[5][0],point2[5][1],point2[5][2]),vec3(point2[3][0],point2[3][1],point2[3][2]));
            var line5 = createLineMesh(vertices,'#FF5D00',3,3);

            vertices = [];
            vertices.push(vec3(point2[3][0],point2[3][1],point2[3][2]),vec3(point2[1][0],point2[1][1],point2[1][2]));
            var line6 = createLineMesh(vertices,'#1B8B72',3,3);

            vertices = [];
            vertices.push(vec3(point2[1][0],point2[1][1],-1),vec3(point2[5][0],point2[5][1],-1));
            var line7 = createLineMesh(vertices,'#0094FF',3,3);

            var sinα = createText('sin α',-400,-40,2,'#1500FF',32);
            var cosα = createText('cos α',-150,-200,2,'#1500FF',32);

            var yuanquan = createYuan(50,180,'#1B8B72');
            yuanquan.position.set(50,-200,1);

            var yuanmian = createCircle(50,'#deffd4');
            yuanmian.position.set(50,-200,1);

            var α = createText('α',-25,-150,2,'#BD10E0',32);

            var παβ = createText('π-α-β',30,-100,2,'#BD10E0',32);

            var β = createText('β',125,-150,2,'#BD10E0',32);


            var Triangle1 = createTriangle(point2[1][0],point2[1][1],point2[1][2],point2[2][0],point2[2][1],point2[2][2],point2[3][0],point2[3][1],point2[3][2],'#1B8B72');

            var Triangle2 = createTriangle(point2[3][0],point2[3][1],point2[3][2],point2[4][0],point2[4][1],point2[4][2],point2[5][0],point2[5][1],point2[5][2],'#FF5D00');

            var Triangle3 = createTriangle(point2[1][0],point2[1][1],point2[1][2],point2[3][0],point2[3][1],point2[3][2],point2[5][0],point2[5][1],point2[5][2],'#0094FF');

            Triangle4 = createTriangle(point[3][0],point[3][1],point[3][2],point[4][0],point[4][1],point[4][2],point[5][0],point[5][1],point[5][2],'#FF5D00');

            Triangle5 = createTriangle(point[1][0],point[1][1],point[1][2],point[2][0],point[2][1],point[2][2],point[3][0],point[3][1],point[3][2],'#1B8B72');

            var plane2 = creatPlane(121,85,2);
            plane2.position.set(420,0,0);

            var plane3 = creatPlane(100,76,3);
            plane3.position.set(200,-250,0);

            obj2.add(line1,line2,line3,line4,line5,line6,line7,sinα,cosα,yuanquan,yuanmian,α,παβ,β,Triangle1,Triangle2,Triangle3,plane2,plane3);
            obj2.visible=false;
            scene.add(obj2,Triangle4,Triangle5);
        };
        createObj2();

        provePlane = creatPlane(330,106.5,4);
        provePlane.position.set(50,-330,0);
        provePlane.visible=false;
        scene.add(provePlane);

        var resetWidget = () => {
          this.checked = false;
          this.btnStyle = false;
          obj1.visible=true;
          obj2.visible=false;
          this.allClick = false;
          Triangle5.visible = true;
          Triangle4.visible = true;
        };
        var otherTriangleHide = () =>{
          Triangle4.visible = false;
          Triangle5.visible = false;
        };
        var otherTriangleShow = () =>{
          Triangle4.visible = true;
          Triangle5.visible = true;
        };
        var proveShow = () => {
          provePlane.visible = true;
        };
        var proveHide = () => {
          provePlane.visible = false;
        };
        var TriangleHide = () => {
            obj1.visible=true;
            obj2.visible=false;
        };
        var TriangleShow = () => {
            obj2.visible=true;
            obj1.visible=false;
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
            TriangleHide:TriangleHide,
            TriangleShow:TriangleShow,
            proveShow:proveShow,
            proveHide:proveHide,
            otherTriangleShow:otherTriangleShow,
            otherTriangleHide:otherTriangleHide,
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
  .noactive{
    pointer-events: none;
    opacity:0.5;
  }
  .active{
    pointer-events: auto;
    opacity:1;
  }
</style>
