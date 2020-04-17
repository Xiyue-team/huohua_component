<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div> <img src="static/UI/1.png" class="imgDiv" v-show="imgDiv" />
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="right_center" :style="'zoom:'+zoomF">
      <ui-slider direction="vertical" :boxWidth="110" :boxHeight="450" :title="'角度α'" :noBlueProcess="true" :realTime="true" :label="['360°','-360°']" :min="-360" :formatter="formatter" :max="360" v-model="value" :speed="0" id='slider' :zoom="zoomF" :processWidth="6"></ui-slider>
      <ui-btn :type="imgDiv?'blue':''" size="big" @click.native="btnClick">公式</ui-btn>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //按钮
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '同角三角函数的基本关系（商数关系） ',
      BtnSpaceStyle: 'flex',
      TO: null,
      value: 60,
      imgDiv: false,
      zoomF: 1
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
    value(val) {
      if (val <= 95 && val >= 85) {
        this.value = 90;
      } else if (val <= 65 && val >= 55) {
        this.value = 60;
      } else if (val <= 50 && val >= 40) {
        this.value = 45;
      }
      setTimeout(() => {
        this.TO.drawLine(val);
      }, 20)
      if (val >= 90) {
        $('#s2').css('background', '#5caefd');
        $('#s3').css('background', '#5caefd');
        $('#s4').css('background', '#5caefd');
      } else if (val < 90 && val >= 60) {
        $('#s2').css('background', '#5caefd');
        $('#s3').css('background', '#5caefd');
        $('#s4').css('background', '#f0f0f0');
      } else if (val < 60 && val >= 45) {
        $('#s2').css('background', '#5caefd');
        $('#s3').css('background', '#f0f0f0');
        $('#s4').css('background', '#f0f0f0');
      } else if (val < 45) {
        $('#s2').css('background', '#f0f0f0');
        $('#s3').css('background', '#f0f0f0');
        $('#s4').css('background', '#f0f0f0');
      }
      this.blueL(val);
    }
  },
  methods: {
    blueL(val) {
      let height = parseInt(Math.abs(val) * $('#sliderP').height() / 720);
      let TOP = parseInt($('#sliderP').height() / 2 - height);
      $('#blueLine').height(height);
      if (this.value > 0) {
        $('#blueLine').css('top', TOP);
      } else {
        $('#blueLine').css('top', 186);
      }
    },
    //转换显示
    formatter(value) {
      if (value <= 95 && value >= 85) {
        value = 90;
      } else if (value <= 65 && value >= 55) {
        value = 60;
      } else if (value <= 50 && value >= 40) {
        value = 45;
      }
      return value + '°';
    },
    reset() {
      this.TO.reset();
    },
    btnClick() {
      this.imgDiv = !this.imgDiv;
      if (this.imgDiv) {
        this.imgDiv = true;
      } else {
        this.imgDiv = false;
      }
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        controls = null,
        axis = null,
        R = 390,
        r = 300,
        lineOP = null,
        linePM = null,
        lineOM = null,
        lineTA = null,
        dashLine = null,
        textP = null,
        textα = null,
        pointP = null,
        Arc = null,
        triangle = null,
        Y = 300 * Math.sin(Math.PI / 3),
        X = 150,
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
      // controls = new THREE.OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.25;
      // controls.enableZoom = false;
      // controls.enableRotate = false;
      // controls.enablePan = false;
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
      let createLineOP = (x, y) => {
        scene.remove(lineOP);
        let vertices = [];
        vertices.push(0, 0, 1, x, y, 1);
        lineOP = createLineMesh(vertices, '#000000', 3, 3);
        lineOP.position.z = 2;
        if (y > -1 && y < 1) {
          lineOP.visible = false;
        } else {
          lineOP.visible = true;
        }
        scene.add(lineOP);
      };
      let createLinePM = (x, y) => {
        scene.remove(linePM);
        linePM = new THREE.Group;
        let vertices = [];
        vertices.push(x, 0, 5, x, y, 5);
        let line = createLineMesh(vertices, '#f89a00', 3, 4);
        let text = createText('M', x, y >= 0 ? '-5' : '37', 0, '#000', 25);
        let text1 = createText('sinα', x > 0 ? x - 30 : x + 30, y / 2, 0, '#000000', 25);
        linePM.add(line, text, text1);
        scene.add(linePM);
      };
      let createLineOM = (x, y) => {
        scene.remove(lineOM);
        lineOM = new THREE.Group;
        let vertices = [];
        vertices.push(0, 0, 5, x, 0, 5);
        let line = createLineMesh(vertices, '#ff1f3a', 3, 4);
        let text = createText('cosα', x / 2, y >= 0 ? '-3' : '37', 0, '#000000', 25);
        lineOM.add(line, text);
        scene.add(lineOM);
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
      var threePlane = (x, y) => {
        scene.remove(triangle);
        //三角面
        let vertices = [];
        vertices.push(vec3(0, 0, -2));
        vertices.push(vec3(x, 0, -2));
        vertices.push(vec3(x, y, -2));
        triangle = createTriangleFace(vertices, "#c5e7ff");
        scene.add(triangle);
      };
      let createCircle = (r, start, end, color) => {
        var geometry = new THREE.CircleGeometry(r, 32, start, Math.abs(end));
        var material = new THREE.MeshBasicMaterial({ color: color });
        var circle = new THREE.Mesh(geometry, material);
        if (end < 0) {
          circle.rotation.z = end;
        }
        // circle.position.z = 0;
        return circle;
      };
      let createArc = (r, start, end, color, width) => {
        let vertices = [],
          dx, dy;
        if (end >= 0) {
          for (let i = start; i <= end; i += 1) {
            dx = r * Math.cos(i / 180 * Math.PI);
            dy = r * Math.sin(i / 180 * Math.PI);
            vertices.push(dx, dy, 0);
          }
        } else {
          for (let i = start; i >= end; i -= 1) {
            dx = r * Math.cos(i / 180 * Math.PI);
            dy = r * Math.sin(i / 180 * Math.PI);
            vertices.push(dx, dy, 0);
          }
        }
        let circleP = createLineMesh(vertices, color, 3, width);
        return circleP;
      };
      let createLineTA = (x, y) => {
        scene.remove(lineTA);
        lineTA = new THREE.Group;
        let vertices = [];
        vertices.push(300, 0, 2, 300, 300 * y / x, 2);
        let line = createLineMesh(vertices, '#0db2ff', 3, 4);
        //虚线
        vertices = [];
        vertices.push(0, 0, 2, 300, 300 * y / x, 2);
        dashLine = createLineMesh(vertices, '#000', 2, 3);
        if (this.value == 90 || this.value == -90 || this.value == 270 || this.value == -270) {
          lineTA.visible = false;
        } else {
          lineTA.visible = true;
        }
        let text = createText('T', 320, 300 * y / x, 0, '#000', 25);
        lineTA.add(line, text, dashLine);
        scene.add(lineTA);
      };
      var createObj = () => {
        let vertices = [],
          circle;
        let dx, dy;
        for (let i = 0; i <= 360; i += 1) {
          dx = 300 * Math.cos(i / 180 * Math.PI);
          dy = 300 * Math.sin(i / 180 * Math.PI);
          vertices.push(dx, dy, 0);
        }
        circle = createLineMesh(vertices, '#000000', 3, 4);
        textP = createText('P(x,y)', r * Math.cos(Math.PI / 3) + 50, r * Math.sin(Math.PI / 3) + 30, 0, '#000', 28);
        textα = createText('α', 60 * Math.cos(Math.PI / 6), 60 * Math.sin(Math.PI / 6) + 13, 0, '#BD00D4', 21);
        var textA = createText('A(1,0)', 340, 30, 0, '#000', 21);
        //lineOP
        createLineOP(R * Math.cos(Math.PI / 3), R * Math.sin(Math.PI / 3));
        //linePM
        createLinePM(X, Y);
        //lineOM
        createLineOM(X, Y);
        //lineTA
        createLineTA(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3));
        //三角面
        threePlane(X, Y);
        pointP = new THREE.Group();
        let circleP1 = createArc(6, 0, 360, '#000', 1);
        let circleP = createCircle(6, 0, Math.PI * 2, '#FF5D00');
        pointP.add(circleP, circleP1);
        pointP.position.set(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3), 5);
        //圆弧
        Arc = new THREE.Group();
        let arc = createCircle(30, 0, Math.PI / 3, '#fce3d5');
        arc.position.z = -2;
        let circleP2 = createArc(30, 0, 60, '#f17c3a', 3);
        circleP2.position.z = -1;
        Arc.add(arc, circleP2);
        Arc.position.z = 2;
        scene.add(circle, pointP, textP, Arc, textα, textA);
        $('#slider').append('<div id="sliderP"><div id="blueLine"></div><span id="s1"></span><span id="s2" style="margin-top: 160px"><span>45°</span></span><span id="s3" style="margin-top: -21px"><span>60°</span></span><span id="s4" style="margin-top: -26px"><span>90°</span></span><span id="s5" style="margin-top: 230px"></span></div>');
        $('#blueLine').css('top', $('#sliderP').height() / 2);
        this.blueL(60);
      };
      createObj();
      //拖动事件
      let drawLine = (val) => {
        Y = r * Math.sin(val / 180 * Math.PI);
        X = r * Math.cos(val / 180 * Math.PI);
        let x = R * Math.cos(val / 180 * Math.PI);
        let y = R * Math.sin(val / 180 * Math.PI);
        //lineOP
        createLineOP(x, y);
        //linePM
        createLinePM(X, Y);
        //lineOM
        createLineOM(X, Y);
        //lineTA
        createLineTA(X, Y);
        //lineOM
        threePlane(X, Y);
        pointP.position.set(X, Y, 5);
        if (val > 0 && val <= 90 || val < -270 && val > -360) {
          X = X + 50;
          Y = Y + 30;
        } else if (val > 90 && val <= 180 || val < -180 && val >= -270) {
          X = X - 50;
          Y = Y + 30;
        } else if (val > 180 && val <= 270 || val < -90 && val >= -180) {
          X = X - 40;
          Y = Y - 10;
        } else if (val > 270 && val < 360 || val < 0 && val >= -90) {
          X = X + 30;
          Y = Y - 10;
        } else if (val == 360 || val == 0 || val == -360) {
          X = X + 70;
          Y = Y + 60;
        }
        textP.position.set(X, Y, 4);
        //圆弧
        scene.remove(Arc);
        Arc = new THREE.Group();
        let arc = createCircle(40, 0, val / 180 * Math.PI, '#fce3d5');
        arc.position.z = -2;
        let circleP2 = createArc(40, 0, val, '#f17c3a', 3);
        circleP2.position.z = -1;
        Arc.add(arc, circleP2);
        textα.position.set(60 * Math.cos(val / 180 * Math.PI / 2), 60 * Math.sin(val / 180 * Math.PI / 2) + 20, 0);
        scene.add(Arc);
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
      let count = 0;
      var animate = () => {
        requestAnimationFrame(animate);
        count = ++count % 6;
        if (count) {
          return;
        }
        renderer.clear();
        //面和实线场景
        renderer.render(scene, camera);
        //虚线场景
      };
      animate();
      var resetWidget = () => {
        pointP.position.set(r * Math.cos(Math.PI / 3), r * Math.sin(Math.PI / 3), 5);
        this.imgDiv = false;
        this.value = 60;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          drawLine
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
      let H = $('.container').height();
      if (H < 530) {
        this.zoomF = 0.8;
      } else {
        this.zoomF = 1;
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
  padding: 20px;
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
  margin: 15px;
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
  right: 15px;
  top: 0;
}

#slider>div#sliderP {
  position: absolute;
  background: transparent;
  top: 28px;
  width: 44px;
  height: 92%;
  z-index: 2;
  margin-left: 60px;
}

#slider>div#sliderP>span {
  display: block;
  width: 12px;
  height: 12px;
  background: #f0f0f0;
  border-radius: 50%;
}

#blueLine {
  position: absolute;
  width: 6px;
  background: #5caefd;
  top: 4px;
  left: 3px;
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

.right_center {
  position: absolute;
  width: 110px;
  height: 505px;
  right: 20px;
  bottom: 15px;
  z-index: 99;
}

#s2 span,
#s3 span,
#s4 span {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.0;
  color: #999999;
  position: absolute;
  margin-left: -45px
}

.imgDiv {
  display: block;
  width: 132px;
  height: 44px;
  position: fixed;
  top: 80px;
  left: 40px;
}

</style>
