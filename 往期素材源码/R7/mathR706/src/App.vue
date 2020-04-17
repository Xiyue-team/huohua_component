<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--侧边按钮区-->
    <!--重制按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native="reset" id="button0"></ui-btn>
    <!--清除浮动-->
    <ui-group type="radio" :margin="20" :groups="groups" v-model="radio" id="button1">
    </ui-group>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiGroup from '@/components/UI/uiGroup';
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider,
    uiGroup
  },
  data() {
    return {
      title: '角的终边上的参数问题',
      BtnSpaceStyle: 'flex',
      isFirst: true,
      checked: false,
      alpha: 60,
      TO: null,
      value: 5,
      radio: 'one',
      groups: [{
        name: 'one',
        txt: '数值'
      }, {
        name: 'two',
        txt: '参数'
      }],
      count: 0,
      dis: Math.sqrt(120 * 120 + 160 * 160),
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
    radio(v) {
      // this.TO.changeText();
      this.TO.createObj();
    },
    value(v) {
      this.TO.pointP.x = Math.cos(this.count * Math.PI / 180) * v * 40;
      this.TO.pointP.y = Math.sin(this.count * Math.PI / 180) * v * 40;
      this.TO.movePoint();
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
        controls = null,
        obj = null,
        obj1 = null,
        obj2 = null,
        touchGroup = null,
        axis = null,
        isMob = null,
        touchP = null,
        touchPoint = null,
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
        pointP = {
          x: 120,
          y: 160
        },
        text1 = null,
        groupP = null,
        lineM = null;



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
          CircleM = new THREE.MeshBasicMaterial({
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

      var createImg = (vertices, w, h, src, f) => {
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
        var r = w / 4;
        if (f) {
          r = w / 8;
        }
        var CircleG = new THREE.CircleGeometry(r, 36);
        var Circle = new THREE.Mesh(CircleG, CircleM);
        var G = new THREE.Group();
        G.add(Plane, Circle);
        G.position.x = vertices[0].x;
        G.position.y = vertices[0].y;
        G.position.z = vertices[0].z;
        return G;
      };

      var changeText = () => {
        let textP, textR;
        this.dis = Math.sqrt(pointP.y * pointP.y + pointP.x * pointP.x);
        let x = (pointP.x / 40).toFixed(1);
        let y = (pointP.y / 40).toFixed(1);
        if (groupP != null) {
          scene.remove(groupP);
        }
        groupP = new THREE.Object3D();
        if (!touchPoint) {
          touchPoint = createImg([vec3(0, 0, 2)], 52, 52, "static/UI/A@2x.png");
        }
        if (this.radio == "one") {
          textP = createText(`P(${x},${y})`, 130, 25, 0, "#000", 40);
          textR = createText(`r=${(this.dis/40).toFixed(1)}`, -pointP.x / 2 - 50, -pointP.y / 2 + 30, 0, "#5CAEFD", 40);
        } else if (this.radio == "two") {
          textP = createText("P(rcosα,rsinα)", 150, 25, 0, "#000", 40);
          textR = createText(`r`, -pointP.x / 2 - 40, -pointP.y / 2 + 40, 0, "#5CAEFD", 40);
        }

        scene.add(groupP)
        touchPoint.name = 'P2';
        groupP.add(touchPoint, textP, textR);
        selectobjs.push(touchPoint.children[0]);
        groupP.position.x = pointP.x;
        groupP.position.y = pointP.y;
        groupP.position.z = 0;

      }
      var createObj = () => {
        if (obj != null) {
          scene.remove(obj, obj1, touchGroup, obj2);
          selectobjs = [];
        }
        p.z = 1;
        obj = new THREE.Object3D();
        obj1 = new THREE.Object3D();
        touchGroup = new THREE.Object3D();
        if (!touchP) {
          touchP = createImg([vec3(0, 0, 2)], 116, 58, "static/UI/A1@2x.png", true);
        }
        touchP.name = 'P1';
        touchGroup.add(touchP)
        touchGroup.position.x = p.x;
        touchGroup.position.y = p.y;
        touchGroup.position.z = 2;
        selectobjs.push(touchP.children[0]);
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
        pointP.x = this.dis * Math.cos(radianK);
        pointP.y = this.dis * Math.sin(radianK);
        pointP.x = p.x >= 0 ? pointP.x : -pointP.x;
        pointP.y = p.x >= 0 ? p.x == 0 ? p.y > 0 ? pointP.y : -pointP.y : pointP.y : -pointP.y;
        changeText();
        movePoint();

        //画𝜃角
        //计算角度

        let sin = Math.asin(p.y / 430);
        let angle = sin * 180 / Math.PI;
        vertices = [];
        let dx, dy;
        if (p.x >= 0 && p.y >= 0) {
          this.count = angle;
        } else if (p.x < 0 && p.y >= 0) {
          this.count = 180 - angle;
        } else if (p.x < 0 && p.y < 0) {
          this.count = 180 - angle;
        } else if (p.x >= 0 && p.y < 0) {
          this.count = 360 + angle;
        }
        touchP.rotation.z = (this.count - 90) * Math.PI / 180;
        for (let i = 0; i < this.count; i++) {
          dx = 21 * Math.cos(Math.PI / 180 * i);
          dy = 21 * Math.sin(Math.PI / 180 * i);
          vertices.push(vec3(dx, dy, 3));
        }
        let line0 = createLineMesh(vertices, '#000', 3, 1);
        // if(this.conut<0.1&&this.conut>0||this.conut)
        // Math.floor(this.count*10)/10
        let num = (Math.floor(this.count * 10) / 10).toFixed(1);
        let text0;
        if (this.radio == 'one') {
          text0 = createText('α=' + num + '°', 35 * Math.cos(this.count * Math.PI / 180 / 2) + 80, 35 * Math.sin(this.count * Math.PI / 180 / 2) + 40, 3, '#000', 40);
        } else if (this.radio == 'two') {
          text0 = createText('α', 35 * Math.cos(this.count * Math.PI / 180 / 2) + 30, 35 * Math.sin(this.count * Math.PI / 180 / 2) + 40, 3, '#000', 40);
        }

        obj.add(line0, text0);
        obj.position.x = 0;
        obj.position.y = 0;
        obj.position.z = 1;
        scene.add(obj, touchGroup);
      };
      var movePoint = () => {
        if (obj2 != null) {
          scene.remove(obj2);
        }
        obj2 = new THREE.Object3D();
        let vertices = [];
        vertices.push(vec3(pointP.x, 0, 0));
        vertices.push(vec3(pointP.x, pointP.y, 0));
        let lineM = createLineMesh(vertices, '#EE6723', 2, 2);
        let textM = createText("M", pointP.x, p.y > 0 ? 0 : 35, 2, "#000", 40);
        obj2.add(lineM, textM);
        scene.add(obj2);
        changeText();

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
            if (selectobj.parent.name === 'P1') {
              // if (x < -400) {
              //   x = -400;
              // } else if (x > 400) {
              //   x = 400;
              // }
              // if (y < -400) {
              //   y = -400;
              // } else if (y > 400) {
              //   y = 400;
              // }
              // x= 0 ;

              var ang = Math.atan(y / x);
              // ang = Math.floor(ang/Math.PI*180);
              // ang = ang/180*Math.PI;
              if (x >= 0) {
                x = 430 * Math.cos(ang);
                y = 430 * Math.sin(ang);
              } else {
                x = -430 * Math.cos(ang);
                y = -430 * Math.sin(ang);
              }
              p.y = y
              p.x = x
              createObj();
            } else if (selectobj.parent.name == 'P2') {
              let hudu = this.count * Math.PI / 180;
              if (this.count > 0 && this.count <= 45 || this.count > 135 && this.count <= 225 || this.count > 315 && this.count <= 360) {
                if (this.count > 0 && this.count <= 45 || this.count > 315 && this.count <= 360) {
                  if (x > 400 * Math.cos(hudu)) {
                    x = 400 * Math.cos(hudu);
                  } else if (x < 40 * Math.cos(hudu)) {
                    x = 40 * Math.cos(hudu)
                  }
                } else if (this.count > 135 && this.count <= 225) {
                  if (x < 400 * Math.cos(hudu)) {
                    x = 400 * Math.cos(hudu);
                  } else if (x > 40 * Math.cos(hudu)) {
                    x = 40 * Math.cos(hudu)
                  }
                }
                pointP.x = x;
                pointP.y = Math.tan(this.count / 180 * Math.PI) * x;
              } else {
                if (this.count > 45 && this.count <= 135) {
                  if (y > 400 * Math.sin(hudu)) {
                    y = 400 * Math.sin(hudu);
                  } else if (y < 40 * Math.sin(hudu)) {
                    y = 40 * Math.sin(hudu)
                  }
                } else if (this.count > 225 && this.count <= 315) {
                  if (y < 400 * Math.sin(hudu)) {
                    y = 400 * Math.sin(hudu);
                  } else if (y > 40 * Math.sin(hudu)) {
                    y = 40 * Math.sin(hudu)
                  }
                }
                pointP.y = y;
                pointP.x = y / Math.tan(this.count / 180 * Math.PI);
              }
              this.dis = Math.sqrt(pointP.y * pointP.y + pointP.x * pointP.x);
              this.value = (this.dis / 40).toFixed(1);
              movePoint();
            }
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
            if (selectobj.parent.name === 'P1') {
              if (x < -400) {
                x = -400;
              } else if (x > 400) {
                x = 400;
              }
              if (y < -400) {
                y = -400;
              } else if (y > 400) {
                y = 400;
              }
              var ang = Math.atan(y / x);
              // ang = Math.floor(ang/Math.PI*180);
              // ang = ang/180*Math.PI;
              if (x >= 0) {
                x = 430 * Math.cos(ang);
                y = 430 * Math.sin(ang);
              } else {
                x = -430 * Math.cos(ang);
                y = -430 * Math.sin(ang);
              }
              p.y = y
              p.x = x
              createObj();
            } else if (selectobj.parent.name == 'P2') {
              let hudu = this.count * Math.PI / 180;
              if (this.count > 0 && this.count <= 45 || this.count > 135 && this.count <= 225 || this.count > 315 && this.count <= 360) {
                if (this.count > 0 && this.count <= 45 || this.count > 315 && this.count <= 360) {
                  if (x > 400 * Math.cos(hudu)) {
                    x = 400 * Math.cos(hudu);
                  } else if (x < 40 * Math.cos(hudu)) {
                    x = 40 * Math.cos(hudu)
                  }
                } else if (this.count > 135 && this.count <= 225) {
                  if (x < 400 * Math.cos(hudu)) {
                    x = 400 * Math.cos(hudu);
                  } else if (x > 40 * Math.cos(hudu)) {
                    x = 40 * Math.cos(hudu)
                  }
                }
                pointP.x = x;
                pointP.y = Math.tan(this.count / 180 * Math.PI) * x;
              } else {
                if (this.count > 45 && this.count <= 135) {
                  if (y > 400 * Math.sin(hudu)) {
                    y = 400 * Math.sin(hudu);
                  } else if (y < 40 * Math.sin(hudu)) {
                    y = 40 * Math.sin(hudu)
                  }
                } else if (this.count > 225 && this.count <= 315) {
                  if (y < 400 * Math.sin(hudu)) {
                    y = 400 * Math.sin(hudu);
                  } else if (y > 40 * Math.sin(hudu)) {
                    y = 40 * Math.sin(hudu)
                  }
                }
                pointP.y = y;
                pointP.x = y / Math.tan(this.count / 180 * Math.PI);
              }
              this.dis = Math.sqrt(pointP.y * pointP.y + pointP.x * pointP.x);
              this.value = (this.dis / 40).toFixed(1);
              movePoint();
            }
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

        if (this.checked) {
          scene.add(obj1);
        } else {
          scene.remove(obj1);
        }
      };
      if (this.isFirst) {
        let k = Math.atan(pointP.y / pointP.x);
        p.y = 430 * Math.sin(k);
        p.x = Math.sqrt(430 * 430 - Math.pow(p.y, 2));
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
        this.isFirst = false;
      }

      var resetWidget = () => {
        pointP.x = 120;
        pointP.y = 160;
        let k = Math.atan(pointP.y / pointP.x);
        p.y = 430 * Math.sin(k);
        p.x = Math.sqrt(430 * 430 - Math.pow(p.y, 2));
        this.value = 5;
        this.dis = Math.sqrt(120 * 120 + 160 * 160);
        this.radio = 'one';
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1200;
        // camera.zoom=1;
        // camera.updateProjectionMatrix();
        createObj();
      };

      var TO = function(argument) {
        return {
          reset: resetWidget,
          movePoint: movePoint,
          pointP: pointP,
          changeText: changeText,
          createObj: createObj

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

.btn_space .UI-btn {
  margin-bottom: 10px;
}
#button1 {
  position: fixed;
  bottom: 0;
  right: 24px;
  margin-bottom: 35px;
}
#button0 {
  position: fixed;
  top: -4px;
  right: 0;
}

</style>
