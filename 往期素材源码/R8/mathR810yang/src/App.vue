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
        title: '正弦定理的证明（外接圆法）',
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
          ABAC= new THREE.Group(),
          dash= new THREE.Group(),
          A = null,
          A1 = null,
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
          l = 175*Math.sqrt(2),
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
        //画圆圈
        var createYuan = (r, val, color,width) => {
          var dx, dy, vertices = [];
          for (var i = 0; i < val; i++) {
            dx = r * Math.cos(Math.PI / 180 * i);
            dy = r * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, 0));
          }
          var yuan = createLineMesh(vertices, color, 3, width);
          return yuan;
        };
        //画圆面
        var createCircle = (r, color) => {
          var geometry = new THREE.CircleBufferGeometry(r, 32,0,Math.PI*2);
          var material = new THREE.MeshBasicMaterial({color: color});
          var circle = new THREE.Mesh(geometry, material);
          return circle;
        };
        //ABAC
        var createABAC = (x,y) =>{
          var verticesAB = [],verticesAC = [],verticesbc = [],x1,y1;
          verticesAB.push(vec3(x,y,0),vec3(-l,-l,0));
          var lineAB = createLineMesh(verticesAB,'#E30000',3,3);

          verticesAC.push(vec3(x,y,0),vec3(l,-l,0));
          var lineAC = createLineMesh(verticesAC,'#E30000',3,3);

          var ang = Math.atan(y / x);
          if (x >= 0) {
            x1 = 400 * Math.cos(ang);
            y1 = 400 * Math.sin(ang)+20;
          } else {
            x1 = -400 * Math.cos(ang);
            y1 = -400 * Math.sin(ang)+20;
          }

          var A = createText('A',x1,y1,1,'#000',34);
          var x2 = (x -l)/2;
          var y2 = (y -l)/2;
          var c = createText('c',x2-30,y2,1,'#1500FF',32);
          var x3 = (x+l)/2;
          var y3 = (y-l)/2;
          var b = createText('b',x3-30,y3,1,'#1500FF',32);

          verticesbc.push(vec3(-l,-l,0),vec3(l,-l,0));
          var bc = createLineMesh(verticesbc,'#E30000',3,3);

          ABAC.add(lineAB,lineAC,A,bc,c,b);
          scene.add(ABAC);
        };
        //创建初始物体
        var createObj = () => {
          var verticesA1C = [],verticesBA1 = [];
          var circle = createYuan(350,361,'#0094FF',3);

          verticesA1C.push(vec3(l,l,0),vec3(l,-l,0));
          var dashA1C = createLineMesh(verticesA1C,'#FF5D00',2,3);

          verticesBA1.push(vec3(-l,-l,0),vec3(l,l,0));
          var dashBA1 = createLineMesh(verticesBA1,'#FF5D00',2,3);
          var A1 = createText('A\'',l+30,l+30,1,'#000',34);
          dash.add(dashA1C,dashBA1,A1);
          dash.visible = false;

          createABAC(l,l);

          var B = createText('B',-l-20,-l,1,'#000',34);
          var C = createText('C',l+20,-l,1,'#000',34);
          var a = createText('a',0,-l,1,'#1500FF',32);
          var pointPlane = createCircle(6,'#000');
          var ponitTxt = createText('O',0,50,1,'#000',34);

          //可拖动的圆点
          var geometry = new THREE.PlaneGeometry( 70, 70,1 );
          var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture("static/UI/2x.png"),
            transparent: true,
            overdraw: 0.2
          } );
          touchP = new THREE.Mesh( geometry, material );
          touchP.position.set(l,l,1);
          selectobjs.push(touchP);

          scene.add(touchP,circle,dash,B,C,a,pointPlane,ponitTxt);
        };
        createObj();

        //拖动事件
        var drawLine = () =>{
          scene.remove(ABAC);
          ABAC=new THREE.Group();
          var obj = intersection.sub(offset), x,y,p={};
          x = obj.x;
          y = obj.y;
          var ang = Math.round(Math.atan(y / x)/Math.PI*180);
          if(ang==45){
              dash.visible=false;
          }else{
              dash.visible=true;
          }
          ang = ang/180*Math.PI;
          if (x >= 0) {
            x = 350 * Math.cos(ang);
            y = 350 * Math.sin(ang);
          } else {
            x = -350 * Math.cos(ang);
            y = -350 * Math.sin(ang);
          }
          p.y = y;
          p.x = x;
          touchP.position.y = p.y;
          touchP.position.x = p.x;
          createABAC(p.x,p.y);
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
          touchP.position.set(l,l,1);
          scene.remove(ABAC);
          ABAC=new THREE.Group();
          dash.visible = false;
          createABAC(l,l);
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
