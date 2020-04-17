<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
      <img src="static/UI/1.png" class="container_img">
      <img src="static/UI/light.png" class="top_img" :style="{opacity:imgShow?1:0}">
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
      <div class="side_btn">
        <ui-btn type="switch" v-model="switch_checked1">
          <h5 class="xieti">A</h5> 的投影
        </ui-btn>
        <ui-btn type="radio" v-model="radio_checked2">
          法向量
        </ui-btn>
        <ui-btn type="radio" v-model="radio_checked1">
          随机点 <h5 class="xieti">B</h5>
        </ui-btn>
        <ui-btn type="radio" v-model="radio_checked3" id="clickBA" :style="{opacity:opShow?1:0.4}">
          <h5 class="xieti">BA</h5> 向量
        </ui-btn>
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
        title: '向量法求点到平面的距离',
        radio_checked1: false,
        radio_checked2: false,
        radio_checked3: false,
        first: false,
        TO: null,
        drag_: false,
        opShow: false,
        switch_checked1: false,
        imgShow: false
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
      this.TO = this.init();
      this.TO.setSideStyle();
      window.onresize = () => {
        this.TO.setSideStyle();
      };
      $('#clickBA').css('pointer-events', 'none');
    },
    computed: {},
    watch: {
      switch_checked1(val) {
        if (val) {
          this.imgShow = true;
        } else {
          this.imgShow = false;
        }
        this.TO.pointOshow();
      },
      radio_checked1(val) {
        this.TO.createPointB();
        this.radio_checked3 = false;
        if (val) {
          $('#clickBA').css('pointer-events', 'auto');
          this.opShow = true;
        } else {
          $('#clickBA').css('pointer-events', 'none');
          this.opShow = false;
        }
      },
      radio_checked2() {
        this.TO.BA();
      },
      radio_checked3(f) {
        if (f && this.radio_checked1) {
          this.first = true;
        } else {
          this.first = false;
        }
        this.TO.vectorBA();
      },
    },
    methods: {
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          ARC1 = null,
          ARC2 = null,
          selectobjs = [],
          selectobjs1 = [],
          selectobjs2 = [],
          selectobjs3 = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          mousedownflag = false,
          pointB = null,
          cylinderFA = null,
          cylinderTOP = null,
          dashLine = null,
          cylinderBA = null,
          textN = null,
          Square = null,
          SET = null,
          offsetLeft = parseInt($('#renderCanvas').offset().left),
          offsetTop = parseInt($('#renderCanvas').offset().top),
          pointO = new THREE.Group(),
          dashlinetop = null,
          dragArrow = null,
          dashlineAO = null,
          ANG = null,
          isMob = null;

        isMob = /iPad|Android/g.test(navigator.userAgent);
        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 700;
        camera.position.z = 800;
        camera.lookAt(scene.position);
        scene.add(camera);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff);
        renderer.setSize(mainWidth, mainHeight);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        $("#renderCanvas").append(renderer.domElement);

        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        var createText = (texts, x, y, z, color, size) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: "italic " + size + 'px "Times new roman"',
            fillStyle: color,
            antialias: true
          };
          var text = new SpriteText2D(texts, textStyle);
          text.position.set(x, y, z);
          return text;
        };
        let createSphere = (r, color) => {
          var geometry = new THREE.SphereGeometry(r, 32, 16);
          var material = new THREE.MeshBasicMaterial({color: color});
          var sphere = new THREE.Mesh(geometry, material);
          return sphere;
        };
        let createPlane = (width, height, color) => {
          var geometry = new THREE.PlaneBufferGeometry(width, height, 1);
          var material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true
          });
          var plane = new THREE.Mesh(geometry, material);
          return plane;
        };
        let createImg = (vertices, w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            side: THREE.DoubleSide,
            depthTest: false
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          Plane.position.x = vertices[0].x;
          Plane.position.y = vertices[0].y;
          Plane.position.z = vertices[0].z;
          return Plane;
        };
        let createCylinder = (topr, bottomr, height, color) => {
          var geometry = new THREE.CylinderBufferGeometry(topr, bottomr, height, 32);
          var material = new THREE.MeshBasicMaterial({color: color});
          var cylinder = new THREE.Mesh(geometry, material);
          return cylinder;
        };
        let createPointB = () => {
          scene.remove(pointB);
          pointB = new THREE.Group();
          if (!this.radio_checked1) {
            return;
          }
          let x, z;
          do {
            x = Math.random().toFixed(3).split('.')[1];
          } while (x > 390);
          do {
            z = Math.random().toFixed(3).split('.')[1];
          } while (z > 240);

          if (x.indexOf(0) == 0) {
            x = x.substring(1);
            if (x.indexOf(0) == 0) {
              x = x.substring(1);
            }
          }
          if (z.indexOf(0) == 0) {
            z = z.substring(1);
            if (x.indexOf(0) == 0) {
              z = z.substring(1);
            }
          }
          if (Math.random() < 0.5) {
            x = -x;
          }
          if (Math.random() < 0.5) {
            z = -z;
          }
          let point = createSphere(20, '#f0f0f0');
          point.material.transparent = true;
          point.material.opacity = 1;

          let point1 = createSphere(50, '#f0f0f0');
          point1.material.transparent = true;
          point1.material.opacity = 0;
          point1.material.depthTest = false;

          let textB = createText('B', -40, 40, 0, '#000', 32);

          pointB.add(point1, point, textB);

          pointB.position.set(x, -200, z);
          selectobjs1.push(pointB.children[0]);
          scene.add(pointB);
        };
        var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
          var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide
          });
          var CircleG = new THREE.CircleGeometry(radius, 12, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];
          return Circle;
        };
        var drawAngle = (startangle, endangle, size, color, circleColor, index) => {
          let dx, dy, vertices = [];
          let ARC = new THREE.Group();
          if (startangle !== 0) {
            for (var i = startangle; i >= endangle; i = i - 3) {
              dx = size * Math.cos(Math.PI / 180 * i);
              dy = size * Math.sin(Math.PI / 180 * i);
              vertices.push(vec3(dx, dy, index));
            }
          } else {
            for (var i = startangle; i <= endangle; i = i + 3) {
              dx = size * Math.cos(Math.PI / 180 * i);
              dy = size * Math.sin(Math.PI / 180 * i);
              vertices.push(vec3(dx, dy, index));
            }
          }
          let line = createLineMesh(vertices, color, 3, 2);
          let endradian = endangle / 180 * Math.PI;
          let startradian = startangle / Math.PI * 180;
          if (startangle !== 0) {
            startradian = Math.PI / 2;
          }
          let circle = createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian);
          line.rotation.x = Math.PI / 2;
          circle.rotation.x = Math.PI / 2;

          ARC.add(line, circle);
          return ARC;
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
              dashSize: 8,
              gapSize: 8,
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
          return lineMesh;
        };
        let vectorBA = () => {
          scene.remove(cylinderBA, dashLine, Square, ARC1, ARC2, dashlinetop);
          if (!this.radio_checked3) {
            cancelAnimationFrame(SET);
            SET = null;
            return;
          }
          cylinderBA = new THREE.Group();
          Square = new THREE.Group();

          let bx = pointB.position.x, by = pointB.position.y, bz = pointB.position.z, height,
            dragy = dragArrow.position.y;

          height = Math.sqrt(Math.pow(-bx, 2) + Math.pow(200 - by, 2) + Math.pow(-bz, 2));
          //下面圆柱
          let cylinder = createCylinder(3, 3, height - 10, '#0094FF');
          cylinder.position.y = height / 2;
          //上面圆锥
          let cylinder2 = createCylinder(0, 8, 20, '#0094FF');
          cylinder2.position.y = height - 10;

          var cylinderBA1 = new THREE.Group();
          if (this.first) {
            this.first = false;
            var i = 0;
            var an = () => {
              i += 0.01;
              cylinderBA1.scale.y = i;
              cylinder2.scale.y = 1 / i;
              if (i >= 1) {
                cancelAnimationFrame(SET);
                SET = null;
                if (this.drag_ || this.radio_checked2) {
                  ARC2.visible = true;
                  dashlinetop.visible = true;
                } else {
                  ARC2.visible = false;
                  dashlinetop.visible = false;
                }
                return;
              }
              SET = requestAnimationFrame(an)
            };
            an();
          }
          cylinderBA1.add(cylinder, cylinder2);
          var ang1 = Math.atan(Math.sqrt(bx * bx + bz * bz) / 400);
          var ang2 = Math.atan(bx / bz);
          if (bz > 0) {
            ang1 = -ang1
          }
          cylinderBA1.rotation.set(ang1, 0, 0);
          cylinderBA.rotation.set(0, ang2, 0);
          cylinderBA.add(cylinderBA1);
          cylinderBA.position.set(bx, -200, bz);

          //虚线
          var vertices = [];
          vertices.push(vec3(0, -199, 0), vec3(bx, -199, bz));
          dashLine = createLineMesh(vertices, '#1B8B72', 2, 1);

          //直角
          let squarePlane = createPlane(30, 30, '#b1c4b3');
          squarePlane.position.set(16, -185, 0);

          vertices = [];
          vertices.push(vec3(31, -170, 0), vec3(31, -200, 0));
          let squareLine = createLineMesh(vertices, '#046650', 3, 3);

          vertices = [];
          vertices.push(vec3(0, -170, 0), vec3(31, -170, 0));
          let squareLine1 = createLineMesh(vertices, '#046650', 3, 3);

          Square.add(squarePlane, squareLine, squareLine1);
          Square.position.x = 3;

          ANG = ang2 - Math.PI / 2;
          if (bz < 0) {
            ANG = ang2 + Math.PI / 2;
          }
          Square.rotation.y = ANG;

          //下圆弧
          let bottom_arc = parseInt(Math.asin(400 / height) * 180 / Math.PI);
          ARC1 = drawAngle(0, bottom_arc, 50, '#258269', '#8caa90', 0);
          ARC1.position.set(bx, -200, bz);
          ARC1.rotation.x = -Math.PI / 2;
          ARC1.rotation.z = ANG + Math.PI;

          //上圆弧
          ARC2 = drawAngle(90, bottom_arc, 50, '#258269', '#b1c4b3', 0);
          ARC2.position.set(0, 200, 0);
          if (dragy > -170) {
            ARC2.rotation.x = -Math.PI / 2;
            ARC2.rotation.z = ANG + Math.PI;
          } else {
            ARC2.rotation.x = Math.PI / 2;
            ARC2.rotation.z = -ANG;
          }

          let dashR = Math.sqrt(bx * bx + bz * bz), dashr = 100 * dashR / height;
          vertices = [];
          vertices.push(vec3(0, 200, 0), vec3(-dashr * bx / dashR, 40000 / height + 200, -dashr * bz / dashR));
          dashlinetop = createLineMesh(vertices, '#000', 2, 2);
          if (this.drag_ && this.radio_checked2) {
            ARC2.visible = true;
            dashlinetop.visible = true;
          } else {
            ARC2.visible = false;
            dashlinetop.visible = false;
          }
          if (!this.radio_checked2) {
            ARC1.visible = false;
            Square.visible = false;
            dashLine.visible = false;
          }
          scene.add(cylinderBA, dashLine, Square, ARC1, ARC2, dashlinetop);
        };
        let createFA = (height) => {
          if (height > -170) {
            cylinderTOP.rotation.z = 0;
            cylinderTOP.visible = true;
            cylinderTOP.position.y = height - 20;
            cylinderFA.scale.set(1, (height + 170) / 500, 1);
            if (ARC2) {
              ARC2.rotation.x = -Math.PI / 2;
              ARC2.rotation.z = ANG + Math.PI;
            }
          } else if (height < -170 && height > -220) {
            cylinderTOP.visible = false;
          } else if (height < -220) {
            cylinderTOP.visible = true;
            cylinderTOP.position.y = height + 20;
            cylinderTOP.rotation.z = Math.PI;
            cylinderFA.scale.set(1, (height + 230) / 500, 1);
            if (ARC2) {
              ARC2.rotation.x = Math.PI / 2;
              ARC2.rotation.z = -ANG;
            }
          }
        };
        let createObj = () => {
          //平面
          let plane = createPlane(800, 500, '#facaae');
          plane.rotation.x = Math.PI / 2;
          plane.position.y = -200;
          selectobjs.push(plane);

          let plane1 = createPlane(1000, 2000, '#facaae');
          plane1.material.opacity = 0;
          plane1.material.depthTest = false;
          selectobjs3.push(plane1);
          //A点
          let pointA = createSphere(8, '#6D6EFF');
          pointA.position.y = 200;
          let textA = createText('A', -20, 220, 0, '#000', 32);

          let pointo = createSphere(8, '#6D6EFF');
          let texto = createText('O', -20, 50, 0, '#000', 32);
          pointO.add(pointo, texto);
          pointO.position.set(0, -200, 0);
          pointO.visible = false;
          //法向量
          cylinderFA = createCylinder(3, 3, 1000, '#E30000');
          cylinderFA.position.y = -200;
          cylinderFA.visible = false;
          cylinderTOP = createCylinder(0, 8, 20, '#E30000');
          cylinderTOP.position.y = 310;
          cylinderTOP.visible = false;

          textN = createImg([vec3(15, 240, 0)], 18, 23, 'static/UI/n1.png');
          textN.visible = false;

          let textα = createText('α', -370, -160, 220, '#000', 32);

          dragArrow = createImg([vec3(-3, 330, 10)], 52, 136, 'static/UI/jian.png');
          dragArrow.visible = false;
          dragArrow.name = 'dragArrow';
          selectobjs2.push(dragArrow);

          let vertices = [];
          vertices.push(vec3(0, 300, 0), vec3(0, -200, 0));
          dashlineAO = createLineMesh(vertices, '#000', 2, 2);
          dashlineAO.visible = false;
          scene.add(plane, pointA, textA, textN, textα, pointO, dragArrow, plane1, dashlineAO, cylinderTOP, cylinderFA);
        };
        createObj();
        let pointOshow = () => {
          if (this.switch_checked1) {
            pointO.visible = true;
            dashlineAO.visible = true;
          } else {
            pointO.visible = false;
            dashlineAO.visible = false;
          }
        };
        let BA = () => {
          if (this.radio_checked2) {
            dragArrow.visible = true;
            cylinderTOP.visible = true;
            cylinderFA.visible = true;
            textN.visible = true;
            if (this.radio_checked3) {
              if (SET == null) {
                ARC2.visible = true;
              }
              ARC1.visible = true;
              Square.visible = true;
              dashLine.visible = true;
              if(dashlinetop){
                dashlinetop.visible = true;
              }
            }
          } else {
            if(dashlinetop){
              dashlinetop.visible = false;
            }
            dragArrow.visible = false;
            cylinderTOP.visible = false;
            cylinderFA.visible = false;
            textN.visible = false;
            if (ARC2 !== null) {
              ARC2.visible = false;
            }
            if (ARC1 !== null) {
              ARC1.visible = false;
            }
            if (Square !== null) {
              Square.visible = false;
            }
            if (dashLine !== null) {
              dashLine.visible = false;
            }
          }
        };
        //拖动事件
        let drawLine = (obj, type) => {
          let x = obj.x, y = obj.y, z = obj.z;
          if (type == 1) {
            pointB.position.set(x, -200, z);
            vectorBA();
          } else {
            dragArrow.position.set(-3, y, 10);
            createFA(y);
          }
        };
        let chooseIndex;
        var onDocumentMouseDown = (event) => {
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs1);
          var intersects2 = raycaster.intersectObjects(selectobjs2);
          if (intersects.length > 0) {
            controls.enableRotate = false;
            selectobj = intersects[0].object;
            mousedownflag = true;
            this.drag_ = true;
            chooseIndex = 1;
          }
          if (intersects2.length > 0) {
            controls.enableRotate = false;
            selectobj = intersects2[0].object;
            mousedownflag = true;
            this.drag_ = true;
            chooseIndex = 2;
          }
        };
        var onDocumentMouseMove = (event) => {
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          if (chooseIndex == 1) {
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects[0] && mousedownflag) {
              drawLine(intersects[0].point, 1);
            }
          } else {
            var intersects2 = raycaster.intersectObjects(selectobjs3);
            if (intersects2[0] && mousedownflag) {
              drawLine(intersects2[0].point, 2);
            }
          }
        };
        var onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
          this.drag_ = false;
        };
        var onDocumentTouchStart = (event) => {
          event.preventDefault();
          if (event.touches.length === 1) {
            var mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs1);
            var intersects2 = raycaster.intersectObjects(selectobjs2);
            if (intersects.length > 0) {
              controls.enableRotate = false;
              selectobj = intersects[0].object;
              mousedownflag = true;
              this.drag_ = true;
              chooseIndex = 1;
            }
            if (intersects2.length > 0) {
              controls.enableRotate = false;
              selectobj = intersects2[0].object;
              mousedownflag = true;
              this.drag_ = true;
              chooseIndex = 2;
            }
          }
        };
        var onDocumentTouchMove = (event) => {
          event.preventDefault();
          if (event.touches.length === 1) {
            var mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            if (chooseIndex == 1) {
              var intersects = raycaster.intersectObjects(selectobjs);
              if (intersects[0] && mousedownflag) {
                drawLine(intersects[0].point, 1);
              }
            } else {
              var intersects2 = raycaster.intersectObjects(selectobjs3);
              if (intersects2[0] && mousedownflag) {
                drawLine(intersects2[0].point, 2);
              }
            }
          }
        };
        var onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
          this.drag_ = false;
        };
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        var skip = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          skip++;
          if (skip % 2 != 0) {
            return;
          }
          renderer.clear();
          controls.update();
          //面和实线场景
          renderer.render(scene, camera);
          textN.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        };

        animate();

        var resetWidget = () => {
          camera.position.x = 0;
          camera.position.y = 700;
          camera.position.z = 800;
          this.radio_checked1 = false;
          this.radio_checked2 = false;
          this.radio_checked3 = false;
          this.switch_checked1 = false;
          dragArrow.position.set(-3, 330, 10);
          createFA(330);
          cylinderTOP.visible = false;
          SET = null;
        };
        var setSideStyle = () => {
          var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
          mainWidth = WIDTH - 260;
          mainHeight = HEIGHT - 72;
          window.resolution = new THREE.Vector2(WIDTH, HEIGHT);
          camera.aspect = WIDTH / HEIGHT;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
          $('.top_img').css('left', mainWidth / 2 - 53 + 'px');
        };
        var TO = function () {
          return {
            reset: resetWidget,
            createPointB,
            vectorBA,
            BA,
            setSideStyle,
            pointOshow
          }
        };
        return TO();
      },
      reset() {
        this.TO.reset();
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

  canvas {
    position: absolute;
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
    width: calc(100% - 260px);
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
    width: 260px;
    height: 100%;
  }

  #renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .container_img {
    display: block;
    position: absolute;
    top: 90px;
    left: 24px;
    width: 167px;
    height: 104px;
  }

  .side_btn {
    width: 260px;
    height: 250px;
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  .top_img {
    position: absolute;
    width: 106px;
    height: 69px;
    top: 80px;
  }
  .xieti{
    font:italic 15px Times new roman;
    display: inline-block;
  }
</style>
