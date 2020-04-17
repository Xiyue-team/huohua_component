<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="btnClass" v-show="btnShow">
      <ui-btn type="checkbox" v-model="checkbox_checked1" color="#f89a00">
        正弦函数线
      </ui-btn>
      <span class="border_span"></span>
      <ui-btn type="checkbox" v-model="checkbox_checked2" color="#ff1f3a">
        余弦函数线
      </ui-btn>
      <span class="border_span"></span>
      <ui-btn type="checkbox" v-model="checkbox_checked3" color="#0db2ff">
        正切函数线
      </ui-btn>
      <span class="border_span"></span>
      <ui-btn type="checkbox" v-model="checkbox_checked4" color="#9013fe">
        余切函数线
      </ui-btn>
      <span class="border_span"></span>
      <ui-btn type="checkbox" v-model="checkbox_checked5" color="#ff1df8">
        正割函数线
      </ui-btn>
      <span class="border_span"></span>
      <ui-btn type="checkbox" v-model="checkbox_checked6" color="#00cd43">
        余割函数线
      </ui-btn>
    </div>
    <ui-btn type="switch" v-model="switch_checked">
      三角函数线（深化六种）
    </ui-btn>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn
    },
    data() {
      return {
        title: '三角函数线（深化六种） ',
        TO: null,
        switch_checked: false,
        checkbox_checked1: false,
        checkbox_checked2: false,
        checkbox_checked3: false,
        checkbox_checked4: false,
        checkbox_checked5: false,
        checkbox_checked6: false,
        btnShow: false
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
      this.TO.linePM1Fun();
      this.setSideStyle();
      window.onresize = () => {
        this.setSideStyle();
      };
    },
    computed: {},
    watch: {
      switch_checked(val) {
        val ? this.btnShow = true : this.btnShow = false;
        this.checkbox_checked1 = false;
        this.checkbox_checked2 = false;
        this.checkbox_checked3 = false;
        this.checkbox_checked4 = false;
        this.checkbox_checked5 = false;
        this.checkbox_checked6 = false;
        this.TO.linePM1Fun();
      },
      checkbox_checked1(val) {
        val ? this.TO.lineShow(1) : this.TO.lineHide(1);
      },
      checkbox_checked2(val) {
        val ? this.TO.lineShow(2) : this.TO.lineHide(2);
      },
      checkbox_checked3(val) {
        val ? this.TO.lineShow(3) : this.TO.lineHide(3);
      },
      checkbox_checked4(val) {
        val ? this.TO.lineShow(4) : this.TO.lineHide(4);
      },
      checkbox_checked5(val) {
        val ? this.TO.lineShow(5) : this.TO.lineHide(5);
      },
      checkbox_checked6(val) {
        val ? this.TO.lineShow(6) : this.TO.lineHide(6);
      }
    },
    methods: {
      reset() {
        this.TO.reset();
      },
      setSideStyle() {
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      },
      init() {
        var PI1 = Math.PI / 180;
        var PI2 = 180 / Math.PI;
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          axis = null,
          R = 390,
          r = 300,
          touchP = null,
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          INTERSECTED = null,
          mousedownflag = false,
          lineOP = null,
          linePM = null,
          linePM1 = null,
          lineOM = null,
          linePN = null,
          lineQN = null,
          angleA = null,
          lineQP = null,
          lineQO = null,
          lineQO1 = null,
          lineON = null,
          lineMN = null,
          texta = null,
          textP = null,
          textA = null,
          textM = null,
          textN = null,
          textQ = null,
          isMob = null,
          textAlpha = null;

        isMob = /iPad|Android/g.test(navigator.userAgent);
        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        scene.position.x = -200;
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff);
        renderer.setSize(mainWidth, mainHeight);
        $("#renderCanvas").append(renderer.domElement);

        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
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
          text.position.set(x, y, z + 3);
          text.material.depthTest = false;
          return text;
        };
        var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
          var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
          });
          var NUM = Math.ceil(end / (Math.PI / 9));
          var CircleG = new THREE.CircleGeometry(radius, NUM, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];
          return Circle;
        };
        var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
          let dx, dy, vertices = [], p = 0;
          let obj = new THREE.Object3D();
          for (var i = startangle; i < endangle; i += 8) {
            if (i > endangle) {
              i = endangle;
            }
            p = PI1 * i;
            dx = size * Math.cos(p);
            dy = size * Math.sin(p);
            vertices.push(dx, dy, index);
          }
          let line = createLineMesh(vertices, color, 3, 1);
          let endradian = PI1 * endangle;
          let startradian = PI1 * startangle;
          let circle = createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian, 0.4);
          let angle = 0;
          if (startangle === 0) {
            angle = parseInt(endangle / 2) * PI1;
          } else {
            angle = parseInt((endangle - startangle) / 2 + startangle) * PI1;
          }
          textAlpha.position.set(40 * Math.cos(angle), 40 * Math.sin(angle) + 20, 2);
          obj.add(line, circle);
          return obj;
        };
        window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight - 72);
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh, matLine;
          var geometry = new THREE.LineGeometry();
          geometry.setPositions(vertices);
          if (style == 2) {
            matLine = new THREE.LineMaterial({
              color: color,
              linewidth: width,
              resolution: resolution,
              dashed: false,
              dashSize: 5,
              gapSize: 5,
              dashScale: 1
            });
            matLine.defines.USE_DASH = ""
          } else if (style == 3) {
            matLine = new THREE.LineMaterial({
              color: color,
              linewidth: width,
              resolution: resolution,
            });
          }
          lineMesh = new THREE.Line2(geometry, matLine);
          lineMesh.computeLineDistances();
          return lineMesh;
        };

        //LineOP
        var startVertices = [];
        startVertices.push(-0.5, 0, 0, 0.5, 0, 0);
        lineOP = createLineMesh(startVertices, '#000', 3, 3);
        scene.add(lineOP);
        let createLineOP = (x, y) => {
          let ratio = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          lineOP.scale.set(ratio, ratio, ratio);
          lineOP.position.set(x / 2, y / 2, 0);
          let k = Math.atan(y / x);
          lineOP.rotation.z = k;
          texta.position.set(x + 60, y + 60, 0);
        };

        //LinePM
        linePM = createLineMesh(startVertices, '#f89a00', 3, 4);
        linePM1 = createLineMesh(startVertices, '#000', 3, 2);
        scene.add(linePM, linePM1);
        let createLinePM = (x, y) => {
          let ratio = Math.sqrt(Math.pow(y, 2));
          linePM.scale.set(ratio, ratio, ratio);
          linePM.position.set(x, y / 2, 4);
          linePM.rotation.z = Math.PI / 2;

          linePM1.scale.set(ratio, ratio, ratio);
          if (x < 0) {
            x = x - 1;
          }
          linePM1.position.set(x, y / 2, -2);
          linePM1.rotation.z = Math.PI / 2;
          textM.position.set(x, y >= 0 ? '-10' : '40', 0,);
          if (this.checkbox_checked1) {
            linePM.visible = true;
            textM.visible = true;
          } else {
            linePM.visible = false;
            textM.visible = false;
          }
        };

        //LineOM
        lineOM = createLineMesh(startVertices, '#ff1f3a', 3, 4);
        scene.add(lineOM);
        let createLineOM = (x) => {
          let ratio = Math.sqrt(Math.pow(x, 2));
          lineOM.scale.set(ratio, ratio, ratio);
          lineOM.position.set(x / 2, 0, 3);
          if (this.checkbox_checked2) {
            lineOM.visible = true;
            textM.visible = true;
          } else {
            lineOM.visible = false;
            textM.visible = false;
          }
        };

        //linePN
        linePN = createLineMesh(startVertices, '#0db2ff', 3, 4);
        scene.add(linePN);
        let createLinePN = (x, y) => {
          let ratio = Math.sqrt(Math.pow(x - r * r / x, 2) + Math.pow(y, 2));
          linePN.scale.set(ratio, ratio, ratio);
          linePN.position.set((x + r * r / x) / 2, y / 2, 4);
          let k = Math.atan(y / (x - r * r / x));
          linePN.rotation.z = k;
          textN.position.set(r * r / x, y >= 0 ? '-10' : '40', 0);
          if (this.checkbox_checked3) {
            linePN.visible = true;
            textN.visible = true;
          } else {
            linePN.visible = false;
            textN.visible = false;
          }
        };

        let createLineQP = (x, y) => {
          scene.remove(lineQP, lineQN);
          if (Math.abs(y) <= 0.9) {
            return;
          }
          let x1, y1;
          if (x < 0 && y >= 0) {
            x1 = x;
            y1 = -y;
          } else if (x < 0 && y < 0) {
            x1 = -x;
            y1 = y;
          } else {
            x1 = x;
            y1 = y;
          }
          let vertices = [];
          vertices.push(x, y, 5, 0, r / Math.cos(Math.PI / 2 - Math.atan(y1 / x1)), 5);
          lineQP = createLineMesh(vertices, '#9013fe', 3, 4);

          vertices = [];
          vertices.push(0, r / Math.cos(Math.PI / 2 - Math.atan(y1 / x1)), -2, r * r / x, 0, -2);

          lineQN = createLineMesh(vertices, '#000', 3, 2);

          if (this.checkbox_checked4) {
            if (y > -1 && y < 1 && x > 0) {
              lineQP.visible = false;
              textQ.visible = false;
            } else {
              lineQP.visible = true;
              textQ.visible = true;
            }
          } else {
            lineQP.visible = false;
            textQ.visible = false;
          }
          scene.add(lineQP, lineQN);
        };
        //lineMN
        lineMN = createLineMesh(startVertices, '#ff1df8', 3, 4);
        scene.add(lineMN);
        let createLineMN = (x, y) => {
          scene.remove(lineON);
          let ratio = Math.sqrt(Math.pow(r * r / x, 2));
          lineMN.scale.set(ratio, ratio, ratio);
          lineMN.position.set(r * r / x / 2, 0, 2);

          var vertices = [];
          vertices.push(x, 0, 1, r * r / x, 0, 1);
          lineON = createLineMesh(vertices, '#000', 2, 1);
          if (this.checkbox_checked5) {
            lineMN.visible = true;
          } else {
            lineMN.visible = false;
          }
          scene.add(lineON);
        };

        //LineQO
        lineQO = createLineMesh(startVertices, '#00cd43', 3, 4);
        scene.add(lineQO);
        let createLineQO = (x, y) => {
          scene.remove(lineQO1);
          if (Math.abs(y) <= 0.9) {
            return;
          }
          let x1, y1;
          if (x >= 0 && y >= 0) {
            x1 = x;
            y1 = y;
          } else if (x < 0 && y >= 0) {
            x1 = x;
            y1 = -y;
          } else if (x < 0 && y < 0) {
            x1 = -x;
            y1 = y;
          } else if (x >= 0 && y < 0) {
            x1 = x;
            y1 = y;
          }
          textQ.position.set(x >= 0 ? -20 : 20, r / Math.cos(Math.PI / 2 - Math.atan(y1 / x1)) + 20, 0);

          let ypoint = r / Math.cos(Math.PI / 2 - Math.atan(y1 / x1));

          let ratio = Math.sqrt(Math.pow(ypoint, 2));

          lineQO.scale.set(ratio, ratio, ratio);

          lineQO.position.set(1, ypoint / 2, 5);
          lineQO.rotation.z = Math.PI / 2;

          var vertices = [];
          vertices.push(0, 0, 1, 0, r / Math.cos(Math.PI / 2 - Math.atan(y1 / x1)), 1);
          lineQO1 = createLineMesh(vertices, '#000', 2, 1);

          if (this.checkbox_checked6) {
            if (y > -1 && y < 1 && x > 0) {
              lineQO.visible = false;
              textQ.visible = false;
            } else {
              lineQO.visible = true;
              textQ.visible = true;
            }
          } else {
            lineQO.visible = false;
            textQ.visible = false;
          }
          scene.add(lineQO1);
        };

        var linePM1Fun = (x) => {
          if (this.switch_checked) {
            linePM1.visible = true;
            if (x && x >= -2 && x <= 2) {
              lineQN.visible = false;
            } else {
              lineQN.visible = true;
            }
            lineON.visible = true;
            lineQO1.visible = true;
          } else {
            linePM1.visible = false;
            lineQN.visible = false;
            lineON.visible = false;
            lineQO1.visible = false;
          }
          if (this.checkbox_checked1 || this.checkbox_checked2) {
            textM.visible = true;
          } else {
            textM.visible = false;
          }
          if (this.checkbox_checked3 || this.checkbox_checked5) {
            textN.visible = true;
          } else {
            textN.visible = false;
          }
          if (this.checkbox_checked4 || this.checkbox_checked6) {
            textQ.visible = true;
          } else {
            textQ.visible = false;
          }
        };

        //可拖动的点构建函数
        let createImg = (vertices, w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            depthTest: false
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          var CircleM = new THREE.MeshBasicMaterial({
            color: '#fff',
            transparent: true,
            depthTest: false
          });
          var r = h / 4;
          var CircleG = new THREE.CircleGeometry(r, 36);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          var G = new THREE.Group();
          G.add(Plane, Circle);
          G.position.x = vertices[0].x;
          G.position.y = vertices[0].y;
          G.position.z = vertices[0].z;
          return G;
        };

        var createObj = () => {
          let vertices = [], circle;
          let dx, dy;
          for (let i = 0; i <= 360; i += 2) {
            dx = 300 * Math.cos(PI1 * i);
            dy = 300 * Math.sin(PI1 * i);
            vertices.push(dx, dy, 0);
          }
          circle = createLineMesh(vertices, '#000000', 3, 3);

          //可拖动的圆点
          touchP = createImg([vec3(R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4), 6)], 128 * 0.9, 64 * 0.9, 'static/UI/A@2x.png');
          touchP.rotation.z = -Math.PI / 4;

          selectobjs.push(touchP.children[0]);

          textP = createText('P(x,y)', r * Math.cos(Math.PI / 4) + 50, r * Math.sin(Math.PI / 4) + 30, 4, '#000', 28);

          textA = createText('A(1,0)', 340, 30, 0, '#000', 21);

          texta = createText('α的终边', 325, 325, 0, '#000', 28);
          //lineOP
          createLineOP(R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4));

          this.checkbox_checked1 = false;
          this.checkbox_checked2 = false;
          this.checkbox_checked3 = false;
          this.checkbox_checked4 = false;
          this.checkbox_checked5 = false;
          this.checkbox_checked6 = false;

          textM = createText('M', 212, -10, 0, '#000', 25);

          textN = createText('N', 212, -10, 0, '#000', 25);

          textQ = createText('Q', -20, 444, 0, '#000', 25);
          //linePM
          createLinePM(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
          //lineOM
          createLineOM(r * Math.cos(Math.PI / 4));

          //lineOM
          createLinePN(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

          //lineQP
          createLineQP(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

          //lineMN
          createLineMN(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

          //lineQO
          createLineQO(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

          textAlpha = createText('α', 40 * Math.cos(PI1 * 22.5), 40 * Math.sin(PI1 * 22.5) + 20, 2, '#BD00D4', 24);

          angleA = new THREE.Group();
          angleA = drawAngle(0, 45, 25, '#258269', '#5EAA97', 'α', -2);

          scene.add(circle, touchP, textP, textA, textAlpha, angleA, texta, textM, textN, textQ);
        };
        createObj();

        //拖动事件
        var stip = 0;
        let drawLine = () => {
          stip++;
          if (stip <= 2) {
            return;
          }
          stip = 0;
          scene.remove(angleA);
          let obj = intersection.sub(offset), x = obj.x + 200, y = obj.y, x1, y1, x11 = x, ang = Math.atan(y / x),
            val = Math.ceil(ang * PI2);
          if (x < 0 && y >= 0) {
            val = 180 + val;
          } else if (x < 0 && y < 0) {
            val = 180 + val;
          } else if (x >= 0 && y < 0) {
            val = 360 + val;
          }
          if (val == 0) {
            return;
          }
          var cosA = Math.cos(ang);
          var sinA = Math.sin(ang);
          angleA = new THREE.Group();
          angleA = drawAngle(0, val, 25, '#258269', '#5EAA97', 'α', -2);
          scene.add(angleA);
          if (x >= 0) {
            x = R * cosA;
            y = R * sinA;
          } else {
            x = -R * cosA;
            y = -R * sinA;
          }
          touchP.position.set(x, y, 6);
          touchP.rotation.z = PI1 * val - Math.PI / 2;
          if (x >= 0) {
            x1 = r * cosA;
            y1 = r * sinA;
          } else {
            x1 = -r * cosA;
            y1 = -r * sinA;
          }

          textP.position.set(x1 + 50, y1 + 30, 4);

          createLineOP(x, y);
          createLinePM(x1, y1);
          createLineOM(x1);
          createLinePN(x1, y1);
          createLineMN(x1, y1);
          createLineQP(x1, y1);
          createLineQO(x1, y1);
          if (x11 >= -2 && x11 <= 2) {
            linePN.visible = false;
            lineMN.visible = false;
            lineQN.visible = false;
            lineON.visible = false;
          } else {
            if (y1 >= -2 && y1 <= 2) {
              lineQO.visible = false;
            } else {
              lineQO.visible = true;
              this.checkbox_checked6 ? lineQO.visible = true : lineQO.visible = false;
            }
            linePN.visible = true;
            lineMN.visible = true;
            lineQN.visible = true;
            lineON.visible = true;
            this.checkbox_checked1 ? linePM.visible = true : linePM.visible = false;
            this.checkbox_checked2 ? lineOM.visible = true : lineOM.visible = false;
            this.checkbox_checked3 ? linePN.visible = true : linePN.visible = false;
            this.checkbox_checked4 ? lineQP.visible = true : lineQP.visible = false;
            this.checkbox_checked5 ? lineMN.visible = true : lineMN.visible = false;

          }
          linePM1Fun(x1);
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
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

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

        var labelAxis = (start, stepSize, stop) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: '22px "Cambria Math"',
            fillStyle: '#000000',
            antialias: true
          };
          let j = 0;
          var text = {},
            line = null,
            vertices = null;
          // label x axis:
          for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
              continue;
            }
            text = new SpriteText2D(i / 300, textStyle);
            if (i == 0) {
              text.position.x = i + 10;
            } else {
              j = i < 0 ? i - 10 : i + 10;
              text.position.x = j;
            }
            text.position.y = -10;
            axis.add(text);
            vertices = [];
            vertices.push(i, 0, 0);
            vertices.push(i, 10, 0);
            var line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          // label y axis:
          for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
              continue;
            }
            j = i < 0 ? -10 : 15;
            text = new SpriteText2D(i / 300, textStyle);
            text.position.x = -15;
            text.position.y = i + 7 + j;
            text.position.z = 0.2;
            axis.add(text);
            vertices = [];
            vertices.push(0, i, 0);
            vertices.push(10, i, 0);
            line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          axis.add(text);
        };
        var drawAxisArrow = (origin, dir, color, style) => {
          var vertices = [];
          vertices.push(origin.x, origin.y, origin.z);
          vertices.push(dir.x, dir.y, dir.z);
          var line = createLineMesh(vertices, color, 3, 2);
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
            text.material.transparent = true;
            text.material.depthTest = false;
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
        var createAxis = () => {
          axis = new THREE.Group();
          labelAxis(-300, 300, 300);
          drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
          drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
          scene.add(axis);
        };
        createAxis();
        let lineHide = (val) => {
          if (val == 1) {
            linePM.visible = false;
            if (!this.checkbox_checked2) {
              textM.visible = false;
            }
          } else if (val == 2) {
            lineOM.visible = false;
            if (!this.checkbox_checked1) {
              textM.visible = false;
            }
          } else if (val == 3) {
            linePN.visible = false;
            if (!this.checkbox_checked5) {
              textN.visible = false;
            }
          } else if (val == 4) {
            lineQP.visible = false;
            if (!this.checkbox_checked6) {
              textQ.visible = false;
            }
          } else if (val == 5) {
            lineMN.visible = false;
            if (!this.checkbox_checked3) {
              textN.visible = false;
            }
          } else if (val == 6) {
            lineQO.visible = false;
            if (!this.checkbox_checked4) {
              textQ.visible = false;
            }
          }
        };
        let lineShow = (val) => {
          if (val == 1) {
            linePM.visible = true;
            textM.visible = true;
          } else if (val == 2) {
            lineOM.visible = true;
            textM.visible = true;
          } else if (val == 3) {
            linePN.visible = true;
            textN.visible = true;
          } else if (val == 4) {
            lineQP.visible = true;
            textQ.visible = true;
          } else if (val == 5) {
            lineMN.visible = true;
            textN.visible = true;
          } else if (val == 6) {
            lineQO.visible = true;
            textQ.visible = true;
          }
        };
        var numstip = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          numstip++;
          if (numstip <= 2) {
            return;
          }
          numstip = 0;

          renderer.clear();
          //面和实线场景
          renderer.render(scene, camera);
        };

        animate();
        var resetWidget = () => {
          this.checkbox_checked1 = false;
          this.checkbox_checked2 = false;
          this.checkbox_checked3 = false;
          this.checkbox_checked4 = false;
          this.checkbox_checked5 = false;
          this.checkbox_checked6 = false;
          this.switch_checked = false;

          touchP.position.set(R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4), 6);
          touchP.rotation.z = -45 * PI1;
          textP.position.set(r * Math.cos(Math.PI / 4) + 50, r * Math.sin(Math.PI / 4) + 30, 4);

          //lineOP
          createLineOP(R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4));
          //linePM
          createLinePM(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
          //lineOM
          createLineOM(r * Math.cos(Math.PI / 4));
          //lineOM
          createLinePN(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
          //lineQP
          createLineQP(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
          //lineMN
          createLineMN(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
          //lineQO
          createLineQO(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

          scene.remove(angleA);
          angleA = new THREE.Group();
          angleA = drawAngle(0, 45, 25, '#258269', '#5EAA97', 'α', -2);
          scene.add(angleA);

          linePM1Fun();
        };
        console.log('create by 杨瑞');
        var TO = function () {
          return {
            reset: resetWidget,
            lineShow,
            lineHide,
            linePM1Fun
          }
        };
        return TO();
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

  input,
  button {
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

  html,
  body,
  #app {
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
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently not supported by any browser */
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
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  #app .aside_reset {
    position: fixed;
    right: 24px;
    top: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  #slider {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }

  #slider > div#sliderP {
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
  }

  #slider > div#sliderP > span {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #f0f0f0;
    border-radius: 50%;
    position: absolute;
  }

  #blueLine {
    position: absolute;
    height: 6px;
    width: calc(3 / 20 * 195px);
    background: #5caefd;
    top: 4px;
  }

  #s2 p {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    display: table-cell;
    position: absolute;
    top: -32px;
  }

  .btnClass {
    width: 240px;
    height: 290px;
    position: fixed;
    bottom: 80px;
    right: 24px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 6px;
  }

  #app .btn-switch {
    position: fixed;
    bottom: 24px;
    right: 24px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  .border_span {
    border: 1px solid #e9e9e9;
    width: 180px;
    display: block;
    float: right;
    margin: -5px 12px 0 0;
    height: 0;
  }
</style>
