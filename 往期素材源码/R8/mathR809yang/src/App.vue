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
        title: '正弦定理的证明（向量法）',
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
    watch: {},
    methods: {
      //计算侧边
      setSideStyle() {
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
          isMob = /iPad|Android/g.test(navigator.userAgent),
          touchP = null,
          CAAB= new THREE.Group(),
          A = null,
          b = null,
          c = null,
          stepNumber,
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          mouse = new THREE.Vector2(),
          INTERSECTED = null,
          mousedownflag = false;
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
            antialias: true
          };
          var text = new SpriteText2D(texts, textStyle);
          text.position.set(x, y, z);
          return text;
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
        //箭头
        var createJian = (color) =>{
          //箭头
          var jian = new THREE.Group();
          var vertices =[];
          vertices.push(vec3(- 20, 0, 0));
          vertices.push(vec3(- 26, -10, 0));
          vertices.push(vec3(5, 0, 0));
          var triangle1 = createTriangleFace(vertices, color);
          var triangle2 = createTriangleFace(vertices, color);
          triangle1.rotation.z = Math.PI/2;
          triangle2.rotation.z = Math.PI/2;
          triangle2.rotation.y = Math.PI;
          jian.add(triangle1,triangle2);
          return jian;
        };
        //ABCA
        var createCAAB = (x) =>{
          CAAB= new THREE.Group();
          var verticesCA =[],verticesAB =[];
          verticesCA.push(vec3(-300,-200,0),vec3(x,300,0));
          verticesAB.push(vec3(300,-200,0),vec3(x,300,0));
          var LineCA = createLineMesh(verticesCA,'#1B8B72',3,3);
          var LineAB = createLineMesh(verticesAB,'#1500FF',3,3);

          var jianCA = createJian('#1B8B72');
          jianCA.rotation.z = -Math.atan((x+300)/500);
          var X1 = 26*(x+300)/Math.sqrt(500*500+(x+300)*(x+300))/1.4;
          var Y1 = 26*500/Math.sqrt(500*500+(x+300)*(x+300))/1.4;
          jianCA.position.set(x-X1,300-Y1,0);

          var jianBA = createJian('#1500FF');
          jianBA.rotation.z = Math.atan((300-x)/500);
          var X2 = 26*(300-x)/Math.sqrt(500*500+(300-x)*(300-x))/1.4;
          var Y2 = 26*500/Math.sqrt(500*500+(300-x)*(300-x))/1.4;
          jianBA.position.set(x+X2,300-Y2,0);

          CAAB.add(LineCA,LineAB,jianCA,jianBA);
          scene.add(CAAB);
        };
        //创建初始物体
        var createObj = () => {
          var vertices =[],verticesCB =[],verticesi =[];
          vertices.push(vec3(-500,300,0),vec3(500,300,0));
          var dashedLine = createLineMesh(vertices,'#000',2,3);

          verticesCB.push(vec3(-300,-200,0),vec3(300,-200,0));
          var LineCB = createLineMesh(verticesCB,'#FF5D00',3,3);

          verticesi.push(vec3(300,100,0),vec3(300,-200,0));
          var Linei = createLineMesh(verticesi,'#FF5D00',2,3);

          var jiani = createJian('#FF5D00');
          jiani.position.set(300,100,0);

          createCAAB(150);

          var C = createText('C',-330,-200,0,'#000',34);
          var B = createText('B',330,-200,0,'#000',34);
          A = createText('A',150,370,0,'#000',34);
          var a = createText('a',0,-200,0,'#1500FF',32);

          //可拖动的圆点
          var geometry = new THREE.PlaneGeometry( 70, 70,1 );
          var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture("static/UI/2x.png"),
            transparent: true,
            overdraw: 0.2
          } );
          touchP = new THREE.Mesh( geometry, material );
          touchP.position.set(150,300,1);
          selectobjs.push(touchP);

          b = createText('b',-100,100,0,'#1500FF',32);
          c = createText('c',250,100,0,'#1500FF',32);
          var i = createText('i',320,0,0,'#1500FF',32);

          var jian = createJian('#FF5D00');
          jian.position.set(295,-200,0);
          jian.rotation.z = -Math.PI/2;
          scene.add(dashedLine,LineCB,C,B,A,a,touchP,jian,b,c,Linei,i,jiani);
        };
        createObj();

        //拖动事件
        var drawLine = () =>{
          scene.remove(CAAB);
          var obj = intersection.sub(offset), x;
          x = obj.x;
          if(x > 500){
            x = 500;
          }
          if(x < -500){
            x = -500;
          }
          b.position.x =(x-350)/2;
          c.position.x =(x+350)/2;
          touchP.position.x = x;
          createCAAB(x);
          A.position.x = x;
        };
        //拖动事件
        var onDocumentMouseDown = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth ) * 2 - 1;
          mouse.y = -( (event.clientY - offsetTop) / mainHeight ) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
          }
        };
        var onDocumentMouseMove = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth ) * 2 - 1;
          mouse.y = -( (event.clientY - offsetTop) / mainHeight ) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          raycaster.setFromCamera(mouse, camera);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
          if (mousedownflag) {
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              drawLine();
            }
          }
        };
        var onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
        };

        var onDocumentTouchStart = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          if (event.touches.length === 1) {
            var mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY - offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
              selectobj = intersects[0].object;
              mousedownflag = true;
            }
          }
        };
        var onDocumentTouchMove = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          if (event.touches.length === 1) {
            var mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY - offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            raycaster.setFromCamera(mouse, camera);
            if (intersects.length > 0) {
              if (INTERSECTED != intersects[0].object) {
                INTERSECTED = intersects[0].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);

              }
            }
          }
          if (mousedownflag) {
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              drawLine();
            }
          }
        };
        var onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
        };
        //重置
        var resetWidget = () => {
          A.position.set(150,370,0);
          touchP.position.set(150,300,1);
          scene.remove(CAAB);
          createCAAB(150);
          b.position.set(-100,100,0);
          c.position.set(250,100,0);
          this.checked = false;
        };
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        var renderAll = () => {
          controls.update();
          renderer.clear();
          renderer.render(scene, camera);
          requestAnimationFrame(renderAll);
        };
        renderAll();
        var TO = function () {
          return {
            reset: resetWidget
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
</style>
