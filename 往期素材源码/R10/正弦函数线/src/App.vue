<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <ui-btn type="switch" v-model="switch_checked">
      正弦函数线
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
        title: '正弦函数线',
        BtnSpaceStyle: 'flex',
        TO: null,
        switch_checked: false
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
      switch_checked(val) {
        this.TO.linePMShow();
      }
    },
    methods: {
      reset() {
        this.TO.reset();
      },
      init() {
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
          angleA = null,
          texta = null,
          textP = null,
          pointP = null,
          textsin = null,
          textM = null,
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
        camera.position.y = 0;
        camera.position.z = 1000;
        camera.lookAt(scene.position);
        scene.add(camera);
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
        let startvertices = [], rodio;
        startvertices.push(-0.5, 0, 0, 0.5, 0, 0);
        lineOP = createLineMesh(startvertices, '#000000', 3, 3);
        scene.add(lineOP);
        let createLineOP = (x, y) => {
          let x1, y1;
          rodio = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          lineOP.scale.set(rodio, rodio, rodio);
          lineOP.position.set(x / 2, y / 2, 2);
          lineOP.rotation.z = Math.atan(y / x);
          if (y > -1 && y < 1) {
            lineOP.visible = false;
          } else {
            lineOP.visible = true;
          }
          if (x > 0) {
            x1 = x + 70;
          } else {
            x1 = x - 30;
          }

          if (y > 0) {
            y1 = y + 70;
          } else {
            y1 = y - 30;
          }
          texta.position.set(x1, y1, 0);
        };

        linePM = createLineMesh(startvertices, '#f89a00', 3, 4);
        scene.add(linePM);
        let createLinePM = (x, y) => {
          rodio = Math.sqrt(Math.pow(y, 2));
          linePM.scale.set(rodio, rodio, rodio);
          linePM.position.set(x, y / 2, 4);
          linePM.rotation.z = Math.PI / 2;

          textM.position.set(x, y >= 0 ? '-10' : '40', 0);

          textsin.position.set(x + 40, y / 2, 0);
          // linePM.add(text,textsin);
          if (this.switch_checked) {
            linePM.visible = true;
            textM.visible = true;
          } else {
            linePM.visible = false;
            textM.visible = false;
          }
        };
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
        var createCircle = (vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) => {
          var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
          });
          var CircleG = new THREE.CircleGeometry(radius, 18, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];
          return Circle;
        };
        var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
          let dx, dy, vertices = [];
          let obj = new THREE.Object3D();
          for (var i = startangle; i < endangle; i += 3) {
            dx = size * Math.cos(Math.PI / 180 * i);
            dy = size * Math.sin(Math.PI / 180 * i);
            vertices.push(dx, dy, index);
          }
          let line = createLineMesh(vertices, color, 3, 1);
          let endradian = endangle / 180 * Math.PI;
          let startradian = startangle / Math.PI * 180;
          let circle = createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian, 0.4);
          let angle = 0;
          if (startangle === 0) {
            angle = parseInt(endangle / 2);
          } else {
            angle = parseInt((endangle - startangle) / 2 + startangle);
          }
          let text = createText(font, 40 * Math.cos(angle / 180 * Math.PI), 40 * Math.sin(angle / 180 * Math.PI) + 20, 2, '#BD00D4', 24);
          obj.add(line, circle, text);
          return obj;
        };
        var createObj = () => {
          let vertices = [], circle;
          let dx, dy;
          for (let i = 0; i <= 360; i += 3) {
            dx = 300 * Math.cos(i / 180 * Math.PI);
            dy = 300 * Math.sin(i / 180 * Math.PI);
            vertices.push(dx, dy, 0);
          }
          circle = createLineMesh(vertices, '#000000', 3, 3);

          //可拖动的圆点
          touchP = createImg([vec3(R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3), 4)], 128 * 0.9, 64 * 0.9, 'static/UI/A@2x.png');
          touchP.rotation.z = -30 * Math.PI / 180;

          selectobjs.push(touchP.children[0]);

          textP = createText('P(x,y)', r * Math.cos(Math.PI / 3) + 50, r * Math.sin(Math.PI / 3) + 30, 0, '#000', 28);

          texta = createText('α的终边', R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3), 0, '#000', 28);
          //lineOP
          createLineOP(R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3));

          textM = createText('M', r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3) >= 0 ? '-10' : '40', 0, '#000', 25);
          textM.visible = false;

          textsin = createText('sinα', r * Math.cos(Math.PI / 3) + 40, r * Math.sin(Math.PI / 3) / 2, 0, '#000', 25);
          textsin.visible = false;
          createLinePM(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3));
          linePM.visible = false;
          pointP = new THREE.Group();

          var geometry = new THREE.CircleGeometry(6, 32);
          var material = new THREE.MeshBasicMaterial({color: '#FF5D00', transparent: true, opacity: 1});
          var circleP = new THREE.Mesh(geometry, material);

          vertices = [];
          for (let i = 0; i <= 360; i += 3) {
            dx = 6 * Math.cos(i / 180 * Math.PI);
            dy = 6 * Math.sin(i / 180 * Math.PI);
            vertices.push(dx, dy, 0);
          }
          let circleP1 = createLineMesh(vertices, '#000000', 3, 1);

          pointP.add(circleP, circleP1);
          pointP.position.set(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3), 4);

          angleA = new THREE.Group();
          angleA = drawAngle(0, 60, 25, '#258269', '#5EAA97', 'α', -2);

          scene.add(circle, touchP, pointP, textP, angleA, textM, textsin);
        };
        createObj();

        //拖动事件
        let drawLine = () => {
          scene.remove(angleA);
          let obj = intersection.sub(offset), x = obj.x, y = obj.y, x1, y1;
          let ang = Math.atan(y / x);
          let val = Math.ceil(ang * 180 / Math.PI);
          if (x >= 0 && y >= 0) {
            val = val;
          } else if (x < 0 && y >= 0) {
            val = 180 + val;
          } else if (x < 0 && y < 0) {
            val = 180 + val;
          } else if (x >= 0 && y < 0) {
            val = 360 + val;
          }
          if (val == 0) {
            return;
          }
          angleA = new THREE.Group();
          angleA = drawAngle(0, val, 25, '#258269', '#5EAA97', 'α', -2);
          scene.add(angleA);
          if (x >= 0) {
            x = R * Math.cos(ang);
            y = R * Math.sin(ang);
          } else {
            x = -R * Math.cos(ang);
            y = -R * Math.sin(ang);
          }
          touchP.position.set(x, y, 4);
          touchP.rotation.z = (Math.atan(y / x) * 180 / Math.PI - 90) * Math.PI / 180;

          if (x >= 0) {
            x1 = r * Math.cos(ang);
            y1 = r * Math.sin(ang);
          } else {
            x1 = -r * Math.cos(ang);
            y1 = -r * Math.sin(ang);
          }
          let X, Y;
          if (val > 0 && val <= 90 || val < -270 && val > -360) {
            X = x1 + 50;
            Y = y1 + 30;
          } else if (val > 90 && val <= 180 || val < -180 && val >= -270) {
            X = x1 - 50;
            Y = y1 + 30;
          } else if (val > 180 && val <= 270 || val < -90 && val >= -180) {
            X = x1 - 40;
            Y = y1 - 10;
          } else if (val > 270 && val < 360 || val < 0 && val >= -90) {
            X = x1 + 30;
            Y = y1 - 10;
          } else if (val == 360 || val == 0 || val == -360) {
            X = x1 + 70;
            Y = y1 + 60;
          }
          textP.position.set(X, Y, 4);

          pointP.position.set(x1, y1, 4);
          let vertices = [];
          vertices.push(vec3(0, 0, 0), vec3(x, y, 0));

          createLineOP(x, y);
          createLinePM(x1, y1);
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
        let linePMShow = () => {
          if (this.switch_checked) {
            linePM.visible = true;
            textM.visible = true;
            textsin.visible = true;
          } else {
            linePM.visible = false;
            textM.visible = false
            textsin.visible = false
          }
        };
        var skip = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          skip++;
          if (skip % 2 != 0) {
            return;
          }
          renderer.clear();
          // controls.update();
          //面和实线场景
          renderer.render(scene, camera);
        };

        animate();

        var resetWidget = () => {
          touchP.position.set(R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3), 4);
          touchP.rotation.z = -30 * Math.PI / 180;
          pointP.position.set(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3), 4);
          createLineOP(R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3));
          linePM.visible = false;
          this.switch_checked = false;
          createLinePM(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3));
          textP.position.set(r * Math.cos(Math.PI / 3) + 50, r * Math.sin(Math.PI / 3) + 30, 0);
          scene.remove(angleA);
          angleA = new THREE.Group();
          angleA = drawAngle(0, 60, 25, '#258269', '#5EAA97', 'α', -2);
          scene.add(angleA)
        };
        var TO = function () {
          return {
            reset: resetWidget,
            linePMShow
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

  #app .btn-switch {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }

  #app .aside_reset {
    position: fixed;
    right: 24px;
    top: 0;
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
</style>
