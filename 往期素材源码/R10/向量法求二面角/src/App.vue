<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
      <div class="imgDiv" :style="{opacity:imgdiv1?1:0}">
        <img src="static/UI/1.png">
        <img src="static/UI/2.png" v-show="!imgdiv2" class="img1">
        <img src="static/UI/3.png" v-show="imgdiv2" class="img1">
        <span>二面角的余弦值</span>
        <img src="static/UI/4.png" v-show="imgdiv2" class="img2">
        <img src="static/UI/5.png" v-show="!imgdiv2" class="img2">
      </div>
    </div>
    <!--侧边按钮区-->
    <!--重制按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="center">
      <ui-slider :label="['0°','180°']"
                 :min="0"
                 :max="180"
                 title="二面角<h5>θ</h5>"
                 v-model="value"
                 :speed="0"
                 formatter="{value}°"></ui-slider>
      <ui-btn type="radio" v-model="radio_checked">
        法向量
      </ui-btn>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiSlider},
    data() {
      return {
        title: '向量法求二面角',
        radio_checked: false,
        first: false,
        TO: null,
        value: 60,
        imgdiv1: false,
        imgdiv2: false,
        height1: 400,
        height2: 400,
        touch1: false,
        touch2: false,
        quadrant1: true,
        quadrant2: true,
        textn1arc: null,
        textn1arc1: null,
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
      radio_checked() {
        this.TO.normalShow();
        this.TO.createDashline(false);
      },
      value(val) {
        this.textn1arc = Math.PI / 180 * val;
        this.textn1arc1 = Math.PI / 180 * (90 - val);
        this.TO.rotate(val);
        this.TO.createDashline(true);
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
          selectobjs = [],
          selectobj = null,
          selectobjs1 = [],
          raycaster = new THREE.Raycaster(),
          mousedownflag = false,
          planeα = null,
          angle = null,
          isMob = null,
          normal1 = null,
          SET1 = null,
          plane1 = null,
          normal2 = null,
          plane2 = null,
          angle1 = null,
          dashline = null,
          textn2 = null,
          focus = null,
          verticalLine = null,
          textn1 = null,
          cylinderTop2 = null,
          SET2 = null;

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
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.minDistance = 700;
        controls.maxDistance = 1700;
        $("#renderCanvas").append(renderer.domElement);
        var OBJ = new THREE.Group();
        OBJ.position.x = -200;
        OBJ.position.y = -100;
        scene.add(OBJ);

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
          text.material.depthTest = false;
          return text;
        };
        let createPlane = (width, height, color, opacity) => {
          var geometry = new THREE.PlaneBufferGeometry(width, height, 1);
          var material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity
          });
          var plane = new THREE.Mesh(geometry, material);
          return plane;
        };
        let createImg = (vertices, w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            depthTest: false,
            side: THREE.DoubleSide
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          Plane.position.x = vertices[0].x;
          Plane.position.y = vertices[0].y;
          Plane.position.z = vertices[0].z;
          return Plane;
        };
        let createCylinder = (topr, bottomr, height, color) => {
          var geometry = new THREE.CylinderBufferGeometry(topr, bottomr, height, 16);
          var material = new THREE.MeshBasicMaterial({color: color});
          var cylinder = new THREE.Mesh(geometry, material);
          return cylinder;
        };
        var createCircle = (vertices, radius, color, start, end, opacity) => {
          var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide
          });
          var CircleG = new THREE.CircleGeometry(radius, 16, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];

          return Circle;
        };
        var drawAngle = (startangle, endangle, size, color, circleColor, index, text) => {
          let dx, dy, vertices = [];
          let group = new THREE.Group();
          for (var i = startangle; i < endangle; i = i + 3) {
            dx = (size + 1) * Math.cos(Math.PI / 180 * i);
            dy = (size + 1) * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, index));
          }
          let line = createLineMesh(vertices, color, 3, 3);

          let endradian = (endangle - startangle) * Math.PI / 180;

          let circle = createCircle([0, 0, index], size, circleColor, 0, endradian, 0.9);
          line.rotation.x = Math.PI / 2;
          circle.rotation.x = Math.PI / 2;

          if (text) {
            let angle = 0;
            if (startangle === 0) {
              angle = parseInt(endangle / 2);
            } else {
              angle = parseInt((endangle - startangle) / 2 + startangle);
            }
            let text = createText('θ', 60 * Math.cos(Math.PI / 180 * angle), 40, 60 * Math.sin(Math.PI / 180 * angle), '#bd00d4', 32);
            group.add(text);
          }
          group.add(line, circle);
          group.position.set(2, 2, 0);
          return group;
        };
        var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,
            geometryLine = new THREE.Geometry();
          geometryLine.vertices = vertices;
          var g = new MeshLine();
          g.setGeometry(geometryLine);

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
            lineMesh = new THREE.Mesh(g.geometry, new MeshLineMaterial({
              useMap: false,
              color: new THREE.Color(color),
              opacity: 1,
              resolution: resolution,
              sizeAttenuation: !false,
              lineWidth: width,
              near: 1,
              far: 10000
            }));
          }
          return lineMesh;
        };
        var createSphere = () => {
          var geometry = new THREE.SphereGeometry(10, 32, 12);
          var material = new THREE.MeshBasicMaterial({color: '#f0f0f0'});
          var sphere = new THREE.Mesh(geometry, material);
          return sphere;
        };
        let createPlaneα = () => {
          planeα = new THREE.Group();
          let plane = createPlane(400, 400, '#8ac0b4', 0.9);
          plane.position.set(-201, 0, 0);
          plane.rotation.x = Math.PI / 2;
          let text = createText('α', -350, 0, -150, '#000', 28);

          let vertices = [];
          vertices.push(vec3(-300, 2, 0), vec3(-2, 2, 0));
          let line = createLineMesh(vertices, '#e30000', 3, 3);
          planeα.add(plane, text, line);
          return planeα;
        };
        var createnormal1 = (val) => {
          OBJ.remove(normal1);
          normal1 = new THREE.Group();
          var cylinder = createCylinder(3, 3, val, '#0094ff');
          cylinder.position.set(200, 0, 0);
          var cylinderTop = createCylinder(0, 8, 20, '#0094ff');
          cylinderTop.position.set(200, val / 2, 0);
          if (val < 0) {
            cylinderTop.rotation.z = Math.PI;
            plane1.position.set(195, val / 2 - 30, 10);
            this.quadrant1 = false;
          } else {
            plane1.position.set(195, val / 2 + 30, 10);
            this.quadrant1 = true;
          }
          normal1.add(cylinder, cylinderTop);
          OBJ.add(normal1);
        };
        var createDashline = (val) => {
          OBJ.remove(dashline);
          if (!this.radio_checked || this.value == 180 || this.value == 0) {
            focus.visible = false;
            verticalLine.visible = false;
            return;
          }
          let arc = Math.PI / 180 * this.value, k = -1 / Math.tan(arc),
            y = 200 * Math.sin(arc) - k * (200 * Math.cos(arc) - 200),
            y2 = k * (1000 - 200 * Math.cos(arc)) + 200 * Math.sin(arc);
          dashline = new THREE.Group();

          verticalLine.visible = true;
          var vertices = [];
          vertices.push(vec3(1000, y2, 0), vec3(200 * Math.cos(arc), 200 * Math.sin(arc), 0));
          var line2 = createLineMesh(vertices, '#7000d3', 2, 3);

          if (val) {
            let end, arc1;
            if (this.quadrant1 == true && this.quadrant2 == true) {
              end = 180 - this.value;
              arc1 = Math.PI / 2;
            } else if (this.quadrant1 == true && this.quadrant2 == false) {
              end = this.value;
              arc1 = Math.PI / 180 * (this.value + 90);
            } else if (this.quadrant1 == false && this.quadrant2 == false) {
              end = 180 - this.value;
              arc1 = Math.PI * 1.5;
            } else if (this.quadrant1 == false && this.quadrant2 == true) {
              end = this.value;
              arc1 = Math.PI / 180 * (270 + this.value);
            }
            let angle1 = drawAngle(0, end, 50, '#1b8b72', '#90a788', 0, false);
            angle1.rotation.x = Math.PI / 2;
            angle1.rotation.y = arc1;
            angle1.position.set(200, y, 0);
            if (this.touch1 && this.touch2) {
              angle1.visible = true;
            } else {
              angle1.visible = false;
            }
            dashline.add(angle1);
          }

          focus.visible = true;
          focus.position.y = y - 100;

          dashline.add(line2);
          OBJ.add(dashline);
        };
        this.textn1arc = Math.PI / 180 * this.value;
        this.textn1arc1 = Math.PI / 180 * (90 - this.value);
        var rotate = (val) => {
          let arc = -(Math.PI - Math.PI / 180 * val);
          planeα.rotation.z = arc;
          if (val == 0) {
            planeα.position.set(0, 1, 0);
          } else {
            planeα.position.set(0, 0, 0);
          }
          if (normal2) {
            normal2.rotation.z = -Math.PI / 180 * (180 - val)
          }
          OBJ.remove(angle);
          angle = drawAngle(0, val, 50, '#1b8b72', '#90a788', 0, true);
          angle.rotation.x = -Math.PI / 2;
          OBJ.add(angle);
          if (this.touch2 && this.touch1) {
            let x;
            if (this.height2 >= 0) {
              x = 70;
            } else {
              x = -70;
            }
            textn1.position.set(200 * Math.cos(this.textn1arc) + this.height2 * Math.cos(this.textn1arc1) / 2 + x, 200 * Math.sin(this.textn1arc) - this.height2 * Math.sin(this.textn1arc1) / 2, 9);
          }
        };
        let createAngle = () => {
          let vertices = [], angle = new THREE.Group();
          vertices.push(vec3(-170, 32, 0), vec3(-170, 2, 0));
          let line21 = createLineMesh(vertices, '#1b8b72', 3, 2);

          vertices = [];
          vertices.push(vec3(-169, 32, 0), vec3(-200, 32, 0));
          let line22 = createLineMesh(vertices, '#1b8b72', 3, 2);

          let plane22 = createPlane(30, 30, '#90a788', 0.9);
          plane22.position.set(-185, 17, 2);

          angle.add(line22, line21, plane22);
          return angle;
        };
        let angle11 = createAngle();
        var createnormal2 = (val) => {
          OBJ.remove(normal2);
          normal2 = new THREE.Group();
          let cylinder = createCylinder(3, 3, val, '#7000d3');
          cylinder.position.set(-200, 0, 0);
          cylinderTop2.position.set(-200, val / 2, 0);
          if (val < 0) {
            cylinderTop2.rotation.z = Math.PI;
            plane2.position.set(-205, val / 2 - 30, 10);
            this.quadrant2 = false;
          } else {
            cylinderTop2.rotation.z = -2 * Math.PI;
            plane2.position.set(-205, val / 2 + 30, 10);
            this.quadrant2 = true;
          }

          if (this.touch2) {
            normal2.add(angle11);
          }

          normal2.add(cylinder, cylinderTop2, plane2);

          normal2.rotation.z = -Math.PI / 180 * (180 - this.value);
          OBJ.add(normal2);

          let x;
          if (this.height2 >= 0) {
            x = 70;
          } else {
            x = -70;
          }
          textn1.position.set(200 * Math.cos(this.textn1arc) + val * Math.cos(this.textn1arc1) / 2 + x, 200 * Math.sin(this.textn1arc) - val * Math.sin(this.textn1arc1) / 2, 9);
        };

        var createObj = () => {
          let planeβ = createPlane(400, 400, '#fcb38a', 0.9);
          planeβ.position.set(201, 0, 0);
          planeβ.rotation.x = Math.PI / 2;
          let textβ = createText('β', 350, 0, -150, '#000', 28);
          let vertices = [];
          vertices.push(vec3(300, 2, 0), vec3(2, 2, 0));
          let line = createLineMesh(vertices, '#e30000', 3, 3);

          vertices = [];
          vertices.push(vec3(0, 0, 200), vec3(0, 0, -200));
          let lineL = createLineMesh(vertices, '#000', 3, 3);

          let textL = createText('l', -30, 0, 100, '#1521dd', 28);

          let planeα = createPlaneα();

          plane1 = createImg([vec3(195, 0, 10)], 78, 204, 'static/UI/x.png');
          plane1.visible = false;
          plane1.name = 'plane1';
          plane2 = createImg([vec3(-205, 0, 10)], 78, 204, 'static/UI/x.png');
          plane2.visible = false;
          selectobjs1.push(plane1);
          plane2.name = 'plane2';
          selectobjs1.push(plane2);

          angle1 = new THREE.Group();
          vertices = [];
          vertices.push(vec3(170, 32, 0), vec3(170, 2, 0));
          let line1 = createLineMesh(vertices, '#1b8b72', 3, 2);

          vertices = [];
          vertices.push(vec3(169, 32, 0), vec3(200, 32, 0));
          let line2 = createLineMesh(vertices, '#1b8b72', 3, 2);

          let plane11 = createPlane(30, 30, '#90a788', 0.9);
          plane11.position.set(185, 17, 2);

          angle1.add(line1, line2, plane11);
          angle1.visible = false;

          let planeHide = createPlane(2000, 2000, '#000', 0);
          planeHide.position.z = 10;
          planeHide.material.depthTest = false;
          planeHide.material.opacity = 0;

          selectobjs.push(planeHide);

          textn2 = createImg([vec3(250, 200, 10)], 36, 46, 'static/UI/n2.png');
          textn2.visible = false;

          textn1 = createImg([vec3(-200, 150, 9)], 36, 46, 'static/UI/n1.png');
          textn1.visible = false;

          focus = createSphere();
          focus.visible = false;
          scene.add(focus);

          cylinderTop2 = createCylinder(0, 8, 20, '#7000d3');

          vertices = [];
          vertices.push(vec3(200, 1000, 0), vec3(200, 0, 0));
          verticalLine = createLineMesh(vertices, '#0094ff', 2, 3);
          verticalLine.visible = false;
          OBJ.add(planeβ, planeα, lineL, textL, textβ, line, plane1, angle1, planeHide, textn1, textn2, verticalLine);
          rotate(60);
        };
        createObj();

        var normalShow = () => {
          if (this.radio_checked) {
            this.imgdiv1 = true;
            textn2.visible = true;
            textn1.visible = true;
            if (this.height1 >= 0 && this.height2 >= 0 || this.height1 < 0 && this.height2 < 0) {
              this.imgdiv2 = true;
            } else {
              this.imgdiv2 = false;
            }
            plane1.visible = true;
            let i = 0;
            let an = () => {
              if (this.height1 >= 0) {
                i += 5;
                if (i >= this.height1) {
                  cancelAnimationFrame(SET1);
                  this.touch1 = true;
                  angle1.visible = true;
                  createDashline(true);
                } else {
                  SET1 = requestAnimationFrame(an)
                }
              } else {
                i -= 5;
                if (i <= this.height1) {
                  cancelAnimationFrame(SET1);
                  this.touch1 = true;
                  angle1.visible = true;
                  createDashline(true);
                } else {
                  SET1 = requestAnimationFrame(an)
                }
              }
              createnormal1(i);
              textn2.position.y = i / 2;
            };
            plane2.visible = true;
            let n = 0;
            let an2 = () => {
              if (this.height2 >= 0) {
                n += 5;
                if (n >= this.height2) {
                  cancelAnimationFrame(SET2);
                  this.touch2 = true;
                  createDashline(true);
                } else {
                  SET2 = requestAnimationFrame(an2)
                }
              } else {
                n -= 5;
                if (n <= this.height2) {
                  cancelAnimationFrame(SET2);
                  this.touch2 = true;
                  createDashline(true);
                } else {
                  SET2 = requestAnimationFrame(an2)
                }
              }
              createnormal2(n);
            };
            an();
            an2();
          } else {
            cancelAnimationFrame(SET1);
            cancelAnimationFrame(SET2);
            OBJ.remove(normal1, normal2);
            plane1.visible = false;
            this.touch1 = false;
            this.touch2 = false;
            this.imgdiv1 = false;
            this.imgdiv2 = false;
            angle1.visible = false;
            textn2.visible = false;
            textn1.visible = false;
          }
        };

        //拖动事件
        var xx1 = 200;
        var yy1 = 200;
        var xx2 = 200;
        var yy2 = 200;
        var step = 0;
        var drawLine = (obj) => {
          step++;
          if (step < 2) {
            return;
          }
          step = 0;
          let x = obj.x, y = obj.y;
          let xo = pointO.x, yo = pointO.y;
          let xs = x - xo, ys = y - yo;
          createDashline(true);
          if (selectobj.name == 'plane1' && this.touch1 == true) {
            yy1 += ys;
            xx1 += xs;
            this.height1 = yy1 * 2;
            createnormal1(yy1 * 2);
            textn2.position.y = yy1;
          } else if (selectobj.name == 'plane2' && this.touch2 == true) {
            yy2 += ys;
            xx2 += xs;
            let trueheight;
            if (this.value >= 0 && this.value < 45) {
              this.height2 = -yy2 * 2;
              trueheight = -yy2;
            } else if (this.value >= 45 && this.value <= 90) {
              this.height2 = xx2 * 2;
              trueheight = xx2;
            } else if (this.value > 90 && this.value <= 135) {
              this.height2 = xx2 * 2;
              trueheight = xx2;
            } else if (this.value > 135 && this.value <= 180) {
              this.height2 = yy2 * 2;
              trueheight = yy2;
            }
            createnormal2(trueheight * 2);
          }
          if (this.height1 >= 0 && this.height2 >= 0 || this.height1 < 0 && this.height2 < 0) {
            this.imgdiv2 = true;
          } else {
            this.imgdiv2 = false;
          }
          pointO = obj;
        };
        var pointO = null;
        var onDocumentMouseDown = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          var mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs1);
          if (intersects.length > 0) {
            controls.enableRotate = false;
            selectobj = intersects[0].object;
            mousedownflag = true;
            pointO = intersects[0].point;
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
          if (intersects[0] && mousedownflag) {
            drawLine(intersects[0].point);

          }
        };
        var onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
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
            var intersects = raycaster.intersectObjects(selectobjs1);
            if (intersects.length > 0) {
              controls.enableRotate = false;
              selectobj = intersects[0].object;
              mousedownflag = true;
              pointO = intersects[0].point;
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
            if (intersects[0] && mousedownflag) {
              drawLine(intersects[0].point);
            }
          }
        };
        var onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
        };
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

        var rendererStep = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          if (rendererStep == 0) {
            rendererStep++;
          } else {
            rendererStep++;
            if (rendererStep % 4 != 0) return;
          }
          renderer.clear();
          controls.update();
          //面和实线场景
          renderer.render(scene, camera);
          textn1.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          textn2.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        };

        animate();

        var resetWidget = () => {
          xx1 = 200;
          yy1 = 200;
          xx2 = 200;
          yy2 = 200;
          camera.position.x = 0;
          camera.position.y = 700;
          camera.position.z = 1200;
          this.value = 60;
          this.radio_checked = false;
          plane1.visible = false;
          plane2.visible = false;
          this.height2 = 400;
          this.height1 = 400;
          this.quadrant1 = true;
          this.quadrant2 = true;
          focus.visible = false;
          verticalLine.visible = false;
        };
        var TO = function () {
          return {
            reset: resetWidget,
            rotate,
            normalShow,
            createDashline
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
    position: absolute;
    top: 20px;
    right: 24px;
    float: right;
  }

  .center {
    position: absolute;
    width: 240px;
    height: 164px;
    bottom: 20px;
    right: 20px;
    margin: auto;
  }

  .imgDiv {
    width: 308px;
    height: 165px;
    position: absolute;
    top: 80px;
    left: 26px;
  }

  .imgDiv img:nth-child(1) {
    width: 191px;
    height: 23px;
    display: block;
    margin-bottom: 15px;
  }

  .img1 {
    width: 132px;
    height: 22px;
    display: block;
    margin-bottom: 25px;
  }

  .imgDiv span {
    font-family: TimesNewRomanPS-ItalicMT;
    font-size: 26px;
    color: #000000;
    display: block;
    margin-bottom: 15px;
  }

  .img2 {
    width: 185px;
    height: 24px;
    display: block;
  }

</style>
