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
      <ui-btn type="reset1" class="aside_reset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn type="checkbox" v-model="checkbox_checked1" :style="checked?opactyShow:opactyHide">
          <img :src="checkbox_checked1?'static/UI/sin.png':'static/UI/1.png'" alt=""/>
        </ui-btn>
        <ui-btn type="checkbox" v-model="checkbox_checked2" :style="checked?opactyShow:opactyHide">
          <img :src="checkbox_checked2?'static/UI/cos.png':'static/UI/2.png'" alt=""/>
        </ui-btn>
        <ui-btn type="checkbox" v-model="checkbox_checked3" :style="checked?opactyShow:opactyHide">
          <img :src="checkbox_checked3?'static/UI/tan.png':'static/UI/3.png'" alt=""/>
        </ui-btn>
        <ui-btn type="switch" v-model="checked" style="margin-top: 50px;">辅助线</ui-btn>
        <ui-btn type="switch" v-model="checked1">坐标轴</ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup},
    data() {
      return {
        title: '锐角三角函数',
        BtnSpaceStyle: 'flex',
        checked: false,
        checked1: false,
        isMob: null,
        checkbox_checked1: false,
        checkbox_checked2: false,
        checkbox_checked3: false,
        TO: null,
        opactyShow: {
          opacity: '1'
        },
        opactyHide: {
          opacity: '0'
        },
        a: 0
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
      checkbox_checked1:function () {
        if(!this.checked){
          this.checkbox_checked1 = false;
        }
      },
      checkbox_checked2:function () {
        if(!this.checked){
          this.checkbox_checked2 = false;
        }
      },
      checkbox_checked3:function () {
        if(!this.checked){
          this.checkbox_checked3 = false;
        }
      },
      checked1: function (value) {
        this.TO.hs(value);
      },
      checked: function (value) {
        this.TO.fz(value);
      }
    },
    methods: {
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          controls = null,
          axis = null,
          isMob = null,
          touchP = null,
          touchP1 = null,
          touchR = null,
          mainWidth = null,
          mainHeight = null,
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          mouse = new THREE.Vector2(),
          INTERSECTED = null,
          mousedownflag = false,
          groupA = new THREE.Object3D(),
          Hypotenuse1 = null,
          R = 200 * Math.sqrt(2),
          r = 140 * Math.sqrt(2),
          text = null,
          textP = null,
          textM = null,
          textM1 = null,
          textP1 = null,
          jiaodu = null,
          tan = Math.PI / 4,
          PR = 280,
          time = null,
          RET = null,
          lineB = null,
          lanxian = null;

        var createScene = () => {
          isMob = /iPad|Android/g.test(navigator.userAgent);
          if (isMob) {
            renderer = new THREE.WebGLRenderer({antialias: true});
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
        };
        //向量
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        //造线
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null, geometryLine = new THREE.Geometry();
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: width}));
          }
          return lineMesh;
        };
        //三角
        var createTriangleFace = (vertices, color) => {
          var material = new THREE.MeshBasicMaterial({color: color});
          var geom = new THREE.Geometry();
          geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
          geom.vertices = vertices;
          var mesh = new THREE.Mesh(geom, material);
          return mesh;
        };
        //文字
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
        //坐标轴
        var createAxis = () => {
          axis = new THREE.Group();
          labelAxis(-400, 40, 400);
          drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
          drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
          var child = axis.children;
          for (var i = 0; i < child.length; i++) {
            child[i].material.transparent = true;
            child[i].material.opacity = this.a;
          }
          scene.add(axis);
        };
        //刻度
        var labelAxis = (start, stepSize, stop) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: '#b1b1b1', antialias: true};
          var text = {}, line = null, vertices = null;
          // label x axis:
          for (var i = start; i <= stop; i = i + stepSize * 2) {
            if (i == 0) {
              continue;
            }
            vertices = [];

            vertices.push(vec3(i, 0, 0));
            vertices.push(vec3(i, 10, 0));

            var line = createLineMesh(vertices, '#b1b1b1', 3, 2);
            axis.add(line);
          }
          // label y axis:
          for (var i = start; i <= stop; i = i + stepSize * 2) {
            if (i == 0) {
              continue;
            }
            vertices = [];
            vertices.push(vec3(0, i, 0));
            vertices.push(vec3(10, i, 0));

            line = createLineMesh(vertices, '#b1b1b1', 3, 2);
            axis.add(line);
          }
        };
        //x,y轴
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
        //画圆圈
        var createCircle = (vertices, radius, color, start, end, opacity) => {
          if (opacity === undefined) {
            opacity = 1;
          }
          var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
          if (!start) {
            start = 0
          }
          if (!end) {
            end = Math.PI * 2;
            var CircleM = new THREE.MeshBasicMaterial({color: color});
          }
          var CircleG = new THREE.CircleGeometry(radius, 50, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];
          return Circle;
        };
        //  贴图
        var createImg = (vertices, w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(src),
            transparent: true,
            depthTest: false
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          var CircleM = new THREE.MeshBasicMaterial({
            color: '#fff'
          });
          var CircleG = new THREE.CircleGeometry(w / 4, 36);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          var G = new THREE.Group();
          G.add(Plane, Circle);
          G.position.x = vertices[0].x;
          G.position.y = vertices[0].y;
          G.position.z = vertices[0].z;
          return G;
        };
        //角度斜边
        var Hypotenuse = (x, y) => {
          var geometryLine = new THREE.Geometry();
          var vertices = [];
          vertices.push(vec3(0, 0, 0));
          vertices.push(vec3(x, y, 0));
          geometryLine.vertices = vertices;
          Hypotenuse1 = createLineMesh(geometryLine.vertices, '#000', 3, 2);
          scene.add(Hypotenuse1);
        };
        var lan = (x, y) => {
          var geometryLine = new THREE.Geometry();
          var vertices = [];
          vertices.push(vec3(0, 0, 1));
          vertices.push(vec3(x, y, 1));
          geometryLine.vertices = vertices;
          lanxian = createLineMesh(geometryLine.vertices, '#299AED', 3, 2.2);
          scene.add(lanxian);
        };
        var jiao = (val) => {
          var dx, dy, vertices = [];
          for (var i = 0; i < val; i++) {
            dx = 50 * Math.cos(Math.PI / 180 * i);
            dy = 50 * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, 3));
          }
          jiaodu = createLineMesh(vertices, '#000', 3, 1);
          scene.add(jiaodu);
        };
        //初始化
        var createObj = () => {
          //点P
          touchP = createCircle([r, r, 2], 6, '#6D68FF');
          touchP.visible = false;
          scene.add(touchP);

          //大圈点
          var PlaneG = new THREE.PlaneGeometry(116, 58);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("static/UI/jian.png"),
            transparent: true,
            overdraw: 0.2,
            depthTest: false
          });
          touchR = new THREE.Mesh(PlaneG, PlaneM);
          touchR.position.set(R, R, 2);

          tan = Math.atan(R / R);
          touchR.rotation.z = tan - Math.PI / 2;

          touchR.name = 'touchR';
          scene.add(touchR);
          selectobjs.push(touchR);
          //P1
          if (!touchP1) {
            touchP1 = createImg([vec3(0, 0, 0)], 52, 52, "static/UI/A@2x.png");
          }
          touchP1.name = 'touchP1';
          touchP1.position.set(r, r, 5);
          scene.add(touchP1);
          touchP1.visible = false;
          selectobjs.push(touchP1.children[0]);

          //角度x轴
          var geometryLine = new THREE.Geometry();
          var vertices = [];
          vertices.push(vec3(0, 0, 0));
          vertices.push(vec3(400, 0, 0));
          geometryLine.vertices = vertices;
          var line = createLineMesh(geometryLine.vertices, '#000', 3, 2);
          scene.add(line);

          Hypotenuse(R, R);
          lan(r, r);
          lanxian.visible = false;
          //α角
          text = createText('α', 81, 55, 0, '#000', 40);
          textP = createText('P(a,b)', 180, 270, 0, '#000', 40);
          textP.visible = false;
          textM = createText('M', r, 0, 0, '#000', 40);
          textM1 = createText('M\'', r, 0, 0, '#000', 40);

          textM.visible = false;
          textM1.visible = false;
          scene.add(text, textP, textM, textM1);
          jiao(45);
        };
        var drawLine = () => {
          var obj = intersection.sub(offset), x, y, x1, y1, x2, y2, x3, y3, x4, y4;
          x = obj.x;
          y = obj.y;
          if (y < 0) {
            y = 0;
          } else if (y > 420) {
            y = 420;
          }
          if (x < 0) {
            x = 0;
          } else if (x > 420) {
            x = 420;
          }
          if (x == 0 && y == 0) {
            return;
          }
          var R1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          if (selectobj.name == 'touchR') {
            scene.remove(Hypotenuse1, jiaodu, lanxian);
            //大圈点
            y1 = y * 400 / R1;
            x1 = x * 400 / R1;
            y2 = y1;
            x2 = x1;

            y3 = y * PR / R1;
            x3 = x * PR / R1;
            //P1点
            y4 = y * 280 / R1;
            x4 = x * 280 / R1;
            touchR.position.set(x1, y1, 2);
            touchP.position.set(x4, y4, 2);
            textM.position.set(x4, 0, 0);
            touchP1.position.set(x3, y3, 5);
            textM1.position.set(x3, 0, 0);
            textP.position.set(x4 - 20, y4 + 70, 2);
            if (textP1) {
              textP1.position.set(x3, y3 + 60, 2);
            }
            Hypotenuse(x2, y2);
            lan(x4, y4);
            jiao(Math.atan(y1 / x1) / Math.PI * 180);
            var a = 90 * Math.cos(Math.PI / 300 * Math.atan(y1 / x1) / Math.PI * 180);
            var b = 90 * Math.sin(Math.PI / 270 * Math.atan(y1 / x1) / Math.PI * 180);
            text.position.set(a, b + 11, 2);
            tan = Math.atan(y1 / x1);
            touchR.rotation.z = tan - Math.PI / 2;
            if (this.checked) {
              scene.remove(lineBB, lineAA, lineB);
              lanxian.visible = true;
              var vertices1 = [], vertices2 = [];
              vertices1.push(vec3(x4, y4, 1));
              vertices1.push(vec3(x4, 0, 1));
              lineBB = createLineMesh(vertices1, '#ed840c', 2, 2);

              vertices2.push(vec3(0, 0, 3));
              vertices2.push(vec3(x4, 0, 3));
              lineAA = createLineMesh(vertices2, '#EF2C2C', 3, 2);

              var vertices3 = [];
              vertices3.push(vec3(x3, y3, 0));
              vertices3.push(vec3(x3, 0, 0));
              lineB = createLineMesh(vertices3, '#ed840c', 2, 2);

              scene.add(lineAA, lineBB, lineB);
            } else {
              lanxian.visible = false;
              var vertices3 = [];
              vertices3.push(vec3(x3, y3, 0));
              vertices3.push(vec3(x3, 0, 0));
              lineB = createLineMesh(vertices3, '#ed840c', 2, 2);
              lineB.visible = false;
              scene.add(lineB);
            }
          } else {
            var k = Math.tan(tan);
            if (tan > Math.PI / 4) {
              x1 = y / k;
              y1 = y;
            } else {
              x1 = x;
              y1 = k * x;
            }
            if (Math.sqrt(x1 * x1 + y1 * y1) > 370) {
              x1 = 370 * Math.cos(tan);
              y1 = 370 * Math.sin(tan);
            }
            touchP1.position.set(x1, y1, 5);
            PR = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
            scene.remove(textP1, lineB);
            textP1 = createText('P\'(a\',b\')', x1, y1 + 60, 0, '#000', 40);
            textP1.position.set(x1, y1 + 60, 2);
            if (this.checked) {
              var vertices1 = [];
              vertices1.push(vec3(x1, y1, 0));
              vertices1.push(vec3(x1, 0, 0));
              lineB = createLineMesh(vertices1, '#ed840c', 2, 2);
              if (touchP1.position.x != touchP.position.x) {
                textM1.visible = true;
                textM1.position.set(x1, 0, 0);
              }
              scene.add(lineB);
            }
            scene.add(textP1);
          }
        };
        var onDocumentMouseDown = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
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
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
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
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
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
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
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

        var animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.clear();
          //面和实线场景
          renderer.render(scene, camera);
          //虚线场景
        };
        //重置
        var resetWidget = () => {
          cancelAnimationFrame(time);
          PR = 280;
          time = null;
          this.a = 0;
          var child = axis.children;
          for (var i = 0; i < child.length; i++) {
            child[i].material.transparent = true;
            child[i].material.opacity = this.a;
          }
          this.checkbox_checked1 = false;
          this.checkbox_checked2 = false;
          this.checkbox_checked3 = false;
          this.checked = false;
          this.checked1 = false;
          scene.remove(Hypotenuse1, text, jiaodu, lanxian, lineB);
          Hypotenuse(R, R);
          textM.visible = false;
          textM1.visible = false;
          textM.position.set(r, 0, 0);
          textM1.position.set(r, 0, 0);
          touchR.position.set(R, R, 2);
          touchP.position.set(r, r, 2);
          touchP1.position.set(r, r, 5);
          textP.position.set(180, 270, 0);
          tan = Math.PI / 4;
          tan = Math.atan(R / R);
          touchR.rotation.z = tan - Math.PI / 2;
          lan(r, r);
          lanxian.visible = false;
          jiao(45);
          text = createText('α', 81, 55, 0, '#000', 40);
          scene.add(text);
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
        }

        if (isMob) {
          $(".aside_reset").on("touchstart", resetWidget);
        } else {
          $(".aside_reset").on("click", resetWidget);
        }
        createScene();
        animate();
        createAxis();
        createObj();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        var hs = (value) => {
          var child = axis.children;
          cancelAnimationFrame(time);
          if (value) {
            for (var i = 0; i < child.length; i++) {
              child[i].material.transparent = true;
              child[i].material.opacity = this.a;
            }
            var an1 = () => {
              if (this.a >= 1) {
                cancelAnimationFrame(time);
                return;
              } else {
                this.a = this.a + 0.01;
              }
              for (var i = 0; i < child.length; i++) {
                child[i].material.transparent = true;
                child[i].material.opacity = this.a;
              }
              time = requestAnimationFrame(an1);
            };
            an1();
          } else {
            var an2 = () => {
              if (this.a <= 0.05) {
                this.a = 0;
                for (var i = 0; i < child.length; i++) {
                  child[i].material.transparent = true;
                  child[i].material.opacity = this.a;
                }
                cancelAnimationFrame(time);
                return;
              } else {
                this.a = this.a - 0.015;
              }
              for (var i = 0; i < child.length; i++) {
                child[i].material.transparent = true;
                child[i].material.opacity = this.a;
              }
              time = requestAnimationFrame(an2);
            };
            an2();
          }
        };
        var lineBB = null, lineAA = null;
        var fz = () => {
          cancelAnimationFrame(RET);
          let vertices = [], num = 0;
          let x = touchP.position.x;
          let y = touchP.position.y;
          let step = (0 - y) / 20;
          let step1 = (x - 0) / 20;
          let an = () => {
            num++;
            if (num > 20) {
              cancelAnimationFrame(RET);
              return;
            }
            lineBB != null ? scene.remove(lineBB) : '';
            lineAA != null ? scene.remove(lineAA) : '';
            vertices = [];
            vertices.push(vec3(x, y, 1));
            vertices.push(vec3(x, y + num * step, 1));
            lineBB = createLineMesh(vertices, '#ed840c', 2, 2);
            vertices = [];
            vertices.push(vec3(0, 0, 3));
            vertices.push(vec3(0 + num * step1, 0, 3));
            lineAA = createLineMesh(vertices, '#EF2C2C', 3, 2);
            scene.add(lineBB, lineAA);
            RET = requestAnimationFrame(an);
          }
          an();
          if (!this.checked) {
            this.checkbox_checked1 = false;
            this.checkbox_checked2 = false;
            this.checkbox_checked3 = false;
            touchP1.visible = false;
            cancelAnimationFrame(RET);
            scene.remove(lineBB, lineAA);
            lineB ? lineB.visible = false : '';
            touchP ? touchP.visible = false : '';
            textP ? textP.visible = false : '';
            textP1 ? textP1.visible = false : '';
            lanxian ? lanxian.visible = false : '';
            textM ? textM.visible = false : '';
            textM1 ? textM1.visible = false : '';
          } else {
            touchP1.visible = true;
            an();
            touchP ? touchP.visible = true : '';
            touchP1 ? touchP1.visible = true : '';
            textP ? textP.visible = true : '';
            textM ? textM.visible = true : '';
            lanxian ? lanxian.visible = true : '';
            if (touchP1.position.x != touchP.position.x) {
              textP1.visible = true;
              textM1.visible = true;
              lineB ? lineB.visible = true : '';
            }
          }
        };
        var TO = function () {
          return {
            hs: hs,
            fz: fz
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
    cursor: this . pointer;
  }

  /*内容区*/
  .container {
    width: calc(100% - 280px);
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

  .btn_space .UI-btn {
    margin-bottom: 15px;
  }
</style>
