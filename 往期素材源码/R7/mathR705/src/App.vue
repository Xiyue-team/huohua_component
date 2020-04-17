<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <ui-btn type="switch" v-model="checked1" class="checked2">表达式</ui-btn>
    <ui-btn type="switch" v-model="checked">
      辅助线
    </ui-btn>
    <!--侧边按钮区-->
   <!--表达式图片-->
    <div class="checked1_pic" v-if="checked1">
      <img src="../static/UI/switch1.png" alt="">
    </div>

  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import uiSlider from '@/components/UI/uiSlider'; //滑块
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '单位圆中任意角的三角函数',
        BtnSpaceStyle: 'flex',
        isFirst: true,
        checked: false,
        checked1: false,
        alpha: 60,
        TO: null
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      //禁止选择
      document.onselectstart = function() {
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
      checked() {
        this.TO.showLine();
      }
    },
    methods: {
      reset() {
        this.TO.reset();
        this.checked1 = false;
      },
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          count = 1,
          obj = null,
          obj1 = null,
          touchGroup = null,
          axis = null,
          isMob = null,
          touchP = null,
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          mouse = new THREE.Vector2(),
          INTERSECTED = null,
          mousedownflag = false,
          p = {},
          pointP = {},
          timer1 = null,
          timer2 = null,
          lineB = null,
          lineBB = null,
          canShowLine = false,
          lineA = null,
          lineAA = null,
          textPa = null,
          textPb = null,
          circle = null,
          text1 = null;



        var createScene = () => {
          isMob = /iPad|Android/g.test(navigator.userAgent);
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
          controls.enableZoom = true;
          controls.enableRotate = false;
          controls.enablePan = false;
          $("#renderCanvas").append(renderer.domElement);
        };
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };

        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,
            geometryLine = new THREE.Geometry();
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
              color: color,
              linewidth: width
            }));
          }
          return lineMesh;
        };

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
          // text.rotation = threeDimension.camera.rotation;
          text.position.set(x, y, z);
          return text;
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
        var createAxis = () => {
          axis = new THREE.Group();
          // labelAxis(-400, 40, 400);
          drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
          drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
          scene.add(axis);
        };
        var labelAxis = (start, stepSize, stop) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: '18px "Cambria Math"',
            fillStyle: '#000000',
            antialias: true
          };
          var text = {},
            line = null,
            vertices = null;
          // label x axis:
          for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
              continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            if (i == 0) {
              text.position.x = i + 10;
            } else {
              text.position.x = i;
            }
            text.position.y = -5;
            axis.add(text);
            vertices = [];

            vertices.push(vec3(i, 0, 0));
            vertices.push(vec3(i, 10, 0));

            var line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          // label y axis:
          for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
              continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.position.x = -15;
            text.position.y = i + 7;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(vec3(0, i, 0));
            vertices.push(vec3(10, i, 0));

            line = createLineMesh(vertices, '#000000', 3, 2);
            axis.add(line);
          }
          axis.add(text);
        };
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
        var createCircle = (vertices, radius, color, start, end, opacity) => {
          if (opacity === undefined) {
            opacity = 1;
          }
          var CircleM = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
          });
          if (!start) {
            start = 0
          }
          if (!end) {
            end = Math.PI * 2;
            var CircleM = new THREE.MeshBasicMaterial({
              color: color
            });
          }
          var CircleG = new THREE.CircleGeometry(radius, 50, start, end);
          var Circle = new THREE.Mesh(CircleG, CircleM);
          Circle.position.x = vertices[0];
          Circle.position.y = vertices[1];
          Circle.position.z = vertices[2];
          return Circle;
        };

        var createImg = (vertices, w, h, src) => {
          var PlaneG = new THREE.PlaneGeometry(w, h);
          var PlaneM = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(src),
            transparent: true,
            overdraw: 0.2,
            depthTest: false
          });
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          Plane.position.x = vertices[0].x;
          Plane.position.y = vertices[0].y;
          Plane.position.z = vertices[0].z;
          return Plane;
        };

        var createObj1 = () => {
          if (circle != null) {
            scene.remove(circle,text1);
          }
          var vertices = [];
          for (var i = 0; i < 361; i = i + 4) {
            vertices.push(new THREE.Vector3(300 * Math.cos(i * Math.PI / 180), 300 * Math.sin(i * Math.PI / 180), 0));
          }
          circle = createLineMesh(vertices, '#000', 3, 2);
          text1 = createText("A(1,0)", 300+45, -3 , 0, "#299AED", 28);
          scene.add(circle,text1);
          p.y = 400 * Math.sin(this.alpha * Math.PI / 180);
          p.x = Math.sqrt(400 * 400 - Math.pow(p.y, 2));
          createObj();
        };
        var setPColor = () => {
          if (textPa) {
            scene.remove(textPa, textPb);
          }
          if (this.checked) {
            textPa = createText("x", pointP.x + 65, pointP.y + 25, 0, "#EF2C2C", 40);
            textPb = createText("y", pointP.x + 100, pointP.y + 25, 0, "#299AED", 40);
          } else {
            textPa = createText("x", pointP.x + 65, pointP.y + 25, 0, "#000", 40);
            textPb = createText("y", pointP.x + 100, pointP.y + 25, 0, "#000", 40);
          }
          scene.add(textPa, textPb);
        };
        var createObj = () => {
          if (obj != null) {
            scene.remove(obj, obj1,touchGroup);
            selectobjs = [];
            lineBB != null ? scene.remove(lineBB) : '';
            lineAA != null ? scene.remove(lineAA) : '';
          }
          p.z = -1;
          obj = new THREE.Object3D();
          obj1 = new THREE.Object3D();
          touchGroup = new THREE.Object3D();
          if (!touchP) {
            touchP = createImg([vec3(0, 0, 1)], 116,58, "static/UI/A@2x.png");
          }
          touchGroup.add(touchP)
          touchGroup.position.x = p.x;
          touchGroup.position.y = p.y;
          touchGroup.position.z = 1;

          obj.position.x = 0;
          obj.position.y = 0;
          obj.position.z = 2;


          selectobjs.push(touchP);
          let vertices = [];
          vertices.push(vec3(0, 0, 0));
          vertices.push(vec3(p.x, p.y, p.z));
          var line = createLineMesh(vertices, '#000', 3, 2);
          obj.add(line);



          //P点坐标  文字

          let k = p.y / p.x;
          let radianK = Math.atan(k);



          if (!Number.isFinite(k)) {
            radianK = Math.PI / 2;
          }
          pointP.x = 300 * Math.cos(radianK);
          pointP.y = 300 * Math.sin(radianK);
          pointP.x = p.x >= 0 ? pointP.x : -pointP.x;
          pointP.y = p.x >= 0 ? p.x == 0 ? p.y > 0 ? pointP.y : -pointP.y : pointP.y : -pointP.y;
          let textP = createText("P(  ,  )", pointP.x + 70, pointP.y + 30, 0, "#000", 40);
          setPColor();
          var groupP = new THREE.Object3D();
          var circleP = createCircle([0, 0, 0], 6, "#6D68FF");
          vertices = [];
          for (var i = 0; i < 361; i = i + 4) {
            vertices.push(new THREE.Vector3(6 * Math.cos(i * Math.PI / 180), 6 * Math.sin(i * Math.PI / 180), 1));
          }
          var pP = createLineMesh(vertices, '#000000', 3, 1);
          groupP.add(circleP, pP);
          groupP.position.x = pointP.x;
          groupP.position.y = pointP.y;
          groupP.position.z = 0;

          obj.add(textP, groupP);

          //画辅助线a，b 和垂角

          vertices = [];
          vertices.push(vec3(0, 0, 3));
          vertices.push(vec3(pointP.x, 0, 3));
          lineA = createLineMesh(vertices, '#EF2C2C', 3, 2);

          vertices = [];
          vertices.push(vec3(pointP.x, 0, 3));
          vertices.push(vec3(pointP.x, pointP.y, 3));
          lineB = createLineMesh(vertices, '#299AED', 3, 2);

          let textA = createText( pointP.x / 2, p.y > 0 ? 0 : 55, 2, "#EF2C2C", 40);
          let textB = createText( pointP.x + 22, pointP.y / 2, 2, "#299AED", 40);
          let textM = createText("M", pointP.x, p.y > 0 ? 0 : 55, 2, "#000", 40);
          let textT = createText("α的终边", p.x >= 0 ? p.x + 100 : p.x - -100, p.y >= 0 ? p.y + 30 : p.y - 30, 2, "#000", 40);

          //画𝜃角
          //计算角度
          let count = 0;
          let sin = Math.asin(pointP.y / 300);
          let angle = sin * 180 / Math.PI;
          vertices = [];
          let dx, dy;
          if (p.x >= 0 && p.y >= 0) {
            count = angle;
          } else if (p.x < 0 && p.y >= 0) {
            count = 180 - angle;
          } else if (p.x < 0 && p.y < 0) {
            count = 180 - angle;
          } else if (p.x >= 0 && p.y < 0) {
            count = 360 + angle;
          }
          touchP.rotation.z = (count-90)*Math.PI/180;
          for (let i = 0; i < count; i++) {
            dx = 21 * Math.cos(Math.PI / 180 * i);
            dy = 21 * Math.sin(Math.PI / 180 * i);
            vertices.push(vec3(dx, dy, 3));
          }
          let line0 = createLineMesh(vertices, '#000', 3, 1);
          let text0 = createText('α', 35 * Math.cos(count*Math.PI/180 / 2)+10, 35 * Math.sin(count*Math.PI/180  / 2) + 35, 3, '#000', 40);
          obj1.add(textA, textB, line0, textM, textT,text0);
          if (canShowLine) {
            obj1.add(lineB, lineA);
          }
          if (this.checked) {
            scene.add(obj1, textPa, textPb);
          }
          scene.add(obj,touchGroup);
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
              var obj = intersection.sub(offset),
                x, y, b;
              x = obj.x;
              y = obj.y;
               if(x<-400){
                x=-400;
              }else if(x>400){
                x=400;
              }
              if(y<-400){
                y=-400;
              }else if(y>400){
                y=400;
              }
              var ang=Math.atan(y/x);
              if(x>=0){
                  x=400*Math.cos(ang);
                  y=400*Math.sin(ang);
              }else{
                  x=-400*Math.cos(ang);
                  y=-400*Math.sin(ang);
              }
              p.y = y
              p.x = x
              createObj();

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
              var obj = intersection.sub(offset),
                x, y, b;
              x = obj.x;
              y = obj.y;
               if(x<-400){
                x=-400;
              }else if(x>400){
                x=400;
              }
              if(y<-400){
                y=-400;
              }else if(y>400){
                y=400;
              }
              var ang=Math.atan(y/x);
              if(x>=0){
                  x=400*Math.cos(ang);
                  y=400*Math.sin(ang);
              }else{
                  x=-400*Math.cos(ang);
                  y=-400*Math.sin(ang);
              }
              p.y = y
              p.x = x
              createObj();

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
          renderer.clear();
          controls.update();
          //面和实线场景
          renderer.render(scene, camera);
          //虚线场景

          if (this.checked) {
            scene.add(obj1);
          } else {
            scene.remove(obj1);
          }
        };
        if (this.isFirst) {
          createScene();
          animate();
          createAxis();
          createObj1();
          renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
          renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
          window.addEventListener('mouseup', onDocumentMouseUp, false);
          renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
          renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
          renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
          this.isFirst = false;
        }

        var resetWidget = () => {
          this.alpha = 60;
          this.checked = false;
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
          createObj1();
        };
        let RET;
        var showLine = () => {
          obj1.remove(lineA, lineB);
          clearInterval(RET);
          let vertices = [],
            num = 0;
          let step = (0 - pointP.y) / 20;
          let step1 = (pointP.x - 0) / 20;
          let an = function() {
            lineBB != null ? scene.remove(lineBB) : '';
            lineAA != null ? scene.remove(lineAA) : '';
            num++;
            if (num >= 20) {
              clearInterval(RET);
              canShowLine = true;
              scene.remove(lineBB, lineAA);
            }
            vertices = [];
            vertices.push(vec3(pointP.x, pointP.y, 3));
            vertices.push(vec3(pointP.x, pointP.y + num * step, 3));
            lineBB = createLineMesh(vertices, '#299AED', 3, 2);
            vertices = [];
            vertices.push(vec3(0, 0, 3));
            vertices.push(vec3(0 + num * step1, 0, 3));
            lineAA = createLineMesh(vertices, '#EF2C2C', 3, 2);
            scene.add(lineBB, lineAA);
          }
          if (!this.checked) {
            clearInterval(RET);
            canShowLine = false;
            scene.remove(lineBB, lineAA);
          } else {
            RET = setInterval(an, 40);
          }
          setPColor();
        }

        var TO = function(argument) {
          return {
            reset: resetWidget,
            showLine: showLine
          }
        }
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
  @media screen and (max-width:900px) {
    .checked1_pic{
      width:120px!important;
    }
  }
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }
.checked2{
  position:absolute;
  bottom: 80px !important;
}
.checked1_pic{
  width:220px;
  position:absolute;
  top:120px;
  left:10%;
}
  .checked1_pic img{
    width:100%;
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
    cursor: this.pointer;
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
    /*display: flex;*/
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  /*.btn_space .UI-btn {
    margin-bottom: 10px;
  }*/
  #app .btn-switch {
    position: fixed;
    bottom:24px;
    right:24px;
  }
  #app .aside_reset {
    position: fixed;
    right:24px;
    top:0px;
  }
</style>
