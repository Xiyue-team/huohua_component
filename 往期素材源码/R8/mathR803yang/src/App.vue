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
        <ui-btn type="switch" :width="98" :height="96" :vertical="true" v-model="checked">辅助线</ui-btn>
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
        title: '余弦定理的证明（平面几何法）',
        BtnSpaceStyle: 'flex',
        checked: false,
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
        this.TO.ADSHOW();
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
          isMob = /iPad|Android/g.test(navigator.userAgent),
          touchP = null,
          LineCA = null,
          LineAB = null,
          AD= new THREE.Group(),
          bcosC = null,
          b = null,
          c = null,
          bsinC = null,
          abcosC = null,
          A = null,
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
        //ABCA
        var createCAAB = (x) =>{
          var verticesCA =[],verticesAB =[];
          verticesCA.push(vec3(-300,-200,0),vec3(x,300,0));
          verticesAB.push(vec3(300,-200,0),vec3(x,300,0));
          LineCA = createLineMesh(verticesCA,'#E30000',3,3);
          LineAB = createLineMesh(verticesAB,'#E30000',3,3);
          scene.add(LineCA,LineAB);
        };
        //AD
        var createAD = (x) =>{
          AD= new THREE.Group();
          var verticesAD =[],vertices1 = [],vertices2 = [],vertices3 = [],vertices4 = [];
          verticesAD.push(vec3(x,-200,0),vec3(x,300,0));
          var LineAD = createLineMesh(verticesAD,'#0094FF',2,2);
          var D = createText('D',x,-230,0,'#000',32);
          bsinC  = createText('bsinC',x-80,0,0,'#1500FF',30);
          bcosC  = createText('bcosC',x-100,-150,0,'#1500FF',30);
          abcosC  = createText('a-bcosC',x+100,-150,0,'#1500FF',30);

          var geometry = new THREE.PlaneGeometry( 20, 20,1);
          var material = new THREE.MeshBasicMaterial( {
            color:'#75B9AA',
            side: THREE.DoubleSide,
            transparent:true,
            opacity:0.6,
            overdraw:0.2
          } );
          var plan = new THREE.Mesh( geometry, material );
          plan.position.set(10,-190,0);

          vertices1.push(vec3(0,-180,0),vec3(20,-180,0));
          vertices2.push(vec3(20,-180,0),vec3(20,-200,0));
          var l1 = createLineMesh(vertices1,'#1B8B72',3,2);
          var l2 = createLineMesh(vertices2,'#1B8B72',3,2);
          var angle = new THREE.Group();
          var angle1 = new THREE.Group();
          angle.add(plan,l1,l2);
          angle1.add(angle);
          angle1.position.x = x;

          if(x >= -600 && x< -300){
            vertices3.push(vec3(x,-200,0),vec3(-300,-200,0));
            var Linedash1 = createLineMesh(vertices3,'#E30000',2,2);
            bsinC.visible = false;
            bcosC.visible = false;
            abcosC.visible = false;
            var csinB  = createText('csinB',x-80,0,0,'#1500FF',32);
            var ccosBa  = createText('ccosB-a',x+100,-150,0,'#1500FF',32);
            AD.add(Linedash1,csinB,ccosBa);
          }else if(x >= 300 && x<=600){
            abcosC.visible = false;
            bcosC.visible = false;
            vertices4.push(vec3(300,-200,0),vec3(x,-200,0));
            var Linedash2 = createLineMesh(vertices4,'#E30000',2,2);
            var bcosa  = createText('bcosC-a',x-100,-150,0,'#1500FF',32);
            AD.add(Linedash2,bcosa);
            angle.rotation.y =  Math.PI;
          }else {
            bsinC.visible = true;
            bcosC.visible = true;
            abcosC.visible = true;
          }
          AD.add(LineAD,D,bsinC,bcosC,abcosC,angle1);
          scene.add(AD);
        };

        //创建初始物体
        var createObj = () => {
          var vertices =[],verticesCB =[];
          vertices.push(vec3(-600,300,0),vec3(600,300,0));
          var dashedLine = createLineMesh(vertices,'#000',2,3);

          verticesCB.push(vec3(-300,-200,0),vec3(300,-200,0));
          var LineCB = createLineMesh(verticesCB,'#E30000',3,3);

          createCAAB(150);
          createAD(150);
          AD.visible=false;

          var C = createText('C',-330,-200,0,'#000',38);
          var B = createText('B',330,-200,0,'#000',38);
          A = createText('A',150,365,0,'#000',38);
          var a = createText('a',0,-190,0,'#1500FF',34);
          b  = createText('b',-100,90,0,'#1500FF',34);
          c  = createText('c',250,90,0,'#1500FF',34);

          //可拖动的圆点
          var geometry = new THREE.PlaneGeometry( 70, 70,1 );
          var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture("static/UI/2x.png"),
            transparent: true,
            overdraw: 0.2,
          } );
          touchP = new THREE.Mesh( geometry, material );
          touchP.position.set(150,300,1);
          selectobjs.push(touchP);

          scene.add(dashedLine,LineCB,C,B,A,a,b,touchP,c);
        };
        createObj();

        //拖动事件
        var drawLine = () =>{
          scene.remove(LineCA,LineAB,AD);
          AD= new THREE.Group();
          var obj = intersection.sub(offset), x;
          x = obj.x;
          if(x > 600){
            x = 600;
          }
          if(x < -600){
            x = -600;
          }
          touchP.position.x = x;
          createCAAB(x);
          createAD(x);
          b.position.x = (x-350)/2;
          c.position.x = (x+350)/2;
          A.position.x = x;
          if(this.checked){
            AD.visible = true;
          }else {
            AD.visible = false;
          }
        };
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
        var ADSHOW = () =>{
          if(this.checked){
            AD.visible = true;
          }else {
            AD.visible = false;
          }
        };
        //重置
        var resetWidget = () => {
          A.position.set(150,365,0);
          b.position.set(-100,90,0);
          c.position.set(250,90,0);
          touchP.position.set(150,300,1);
          scene.remove(LineCA,AD,LineAB);
          createAD(150);
          AD.visible = false;
          createCAAB(150);
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
            reset: resetWidget,
            ADSHOW:ADSHOW
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
