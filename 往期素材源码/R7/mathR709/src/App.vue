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
      <ui-btn type="reset1" id="buttom1" class="aside_reset" @click.native="reset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div :style="'height:44px;margin-bottom:30px;'">
          <ui-btn type="radio" @callback="radioC(1)" :value="radio1" :width="110"> 12等分 </ui-btn>
          <ui-btn type="radio" @callback="radioC(2)" :value="radio2" :width="110" :style="'float:right;'"> ∞等分 </ui-btn>
        </div>
        <ui-btn type="switch" v-model="checked1" :class="{hideO:radio2||!radio1}" :style="'margin-bottom:15px;pointer-events: '+pointer1+';'"> 正弦线 </ui-btn>
        <ui-btn type="switch" v-model="checked2" :class="{hideO:radio2||!checked1||anT1}" :style="'margin-bottom:43px;pointer-events: '+pointer2+';'"> 平移正弦线 </ui-btn>
        <ui-btn :type="blue" @callback="draw" :class="{hideO:radio1?!checked1||!checked2||anT2:!radio2}" :style="'pointer-events: '+pointer3+';'"> 动态绘制 </ui-btn>
      </div>
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
      title: '正弦函数的图像',
      BtnSpaceStyle: 'flex',
      TO: null,
      blue: '',
      radio: 0,
      radio1: false,
      radio2: false,
      checked1: false,
      checked2: false,
      anT1: true,
      anT2: true,
      pointer1: 'none',
      pointer2: 'none',
      pointer3: 'none'
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
    checked1(v) {
      if (!v) {
        this.checked2 = false;
        this.TO.closeANline();
        this.anT1 = true;
        this.pointer2 = 'none';
        this.pointer3 = 'none';
      } else {
        this.TO.ANline();
        this.pointer3 = 'none';
      }
    },
    checked2(v) {
      if (v) {
        this.TO.MOVEline();
        this.pointer3 = 'none';
      } else {
        this.TO.closeMOVEline();
        this.anT2 = true;
        this.TO.clearDraw();
        this.blue = '';
        this.pointer3 = 'auto';
      }
    },
    blue(v) {
      if (v == 'blue') {
        this.TO.clearDraw();
        this.TO.draw();
      }
    }
  },
  methods: {
    reset() {
      this.TO.reset();
    },
    draw() {
      if (this.blue != '') {
        return;
      }
      this.blue = 'blue';
    },
    radioC(n) {
      if (n == this.radio) {
        return;
      }
      if (n == 1) {
        this.radio1 = true;
        this.radio2 = false;
        this.pointer1 = 'auto';
        this.pointer3 = 'none';
      } else {
        this.radio1 = false;
        this.radio2 = true;
        this.pointer3 = 'auto';
        this.pointer1 = 'none';
        this.pointer2 = 'none';
      }
      this.checked1 = false;
      this.checked2 = false;
      this.blue = '';
      this.radio = n;
      this.TO.choose(n);
      this.TO.clearDraw();
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        controls = null,
        axis = null,
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
      camera.position.z = 1200;
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      $("#renderCanvas").append(renderer.domElement);
      var vec3 = (x, y, z) => {
        return new THREE.Vector3(x, y, z);
      };
      //画线条
      // var createLineMesh = (vertices, color, style, width) => {
      //   var lineMesh = null,
      //     geometryLine = new THREE.Geometry();
      //   if (!color) {
      //     color = '#000';
      //   }
      //   if (!width) {
      //     width = 1;
      //   }
      //   if (style == 2) {
      //     geometryLine.vertices = vertices;
      //     // geometryLine.computeLineDistances();
      //     lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
      //       color: color,
      //       dashSize: 5,
      //       gapSize: 5,
      //       linewidth: width
      //     }));
      //     lineMesh.computeLineDistances();
      //   } else if (style == 3) {
      //     geometryLine.vertices = vertices;
      //     lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
      //       color: color,
      //       linewidth: width
      //     }));
      //   }
      //   return lineMesh;
      // };
      // 画粗线条
      window.resolution = new THREE.Vector2(window.innerWidth - 280, window.innerHeight - 72);
      var createLineMesh1 = (vertices, color = '#000', style = 3, width = 2, opacity = 1) => {
        var lineMesh, matLine;
        var geometry = new THREE.LineGeometry();
        geometry.setPositions(vertices);
        if (style == 2) {
          matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            dashed: false,
            dashSize: 10,
            gapSize: 10,
            dashScale: 1
          });
          matLine.defines.USE_DASH = ""
        } else if (style == 3) {
          matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            opacity,
            transparent: true
          });
        }
        lineMesh = new THREE.Line2(geometry, matLine);
        lineMesh.depthTest = false;
        lineMesh.computeLineDistances();
        return lineMesh;
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
      //三角面
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
      //绘制坐标轴
      var createAxis = () => {
        axis = new THREE.Group();
        labelAxis(-400, 60, 400);
        drawAxisArrow([-450, 0, 0, 450, 0, 0], vec3(450, 0, 0), 0x000000, 1);
        drawAxisArrow([0, -450, 0, 0, 450, 0], vec3(0, 450, 0), 0x000000, 2);
        scene.add(axis);
      };
      var labelAxis = (start, stepSize, stop) => {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {
          align: textAlign.center,
          font: '24px "Cambria Math"',
          fillStyle: '#000000',
          antialias: true
        };
        var text = {},
          textPI = {},
          line = null,
          vertices = null;
        // label x axis:
        for (var i = 0; i <= stop; i = i + stepSize * 1.5) {
          if (i == 0) {
            continue;
          }
          // text = new SpriteText2D(i / 40, textStyle);
          var j = i / 180;
          j = j == 1 ? '' : j;
          textPI = new SpriteText2D(j + 'π', textStyle);
          if (i == 0) {
            textPI.position.x = i + 10;
          } else {
            textPI.position.x = i;
          }
          textPI.position.y = -5;
          axis.add(textPI);
          vertices = [];
          vertices.push(i, 0, 0);
          vertices.push(i, 10, 0);
          var line = createLineMesh1(vertices, '#000000', 3, 2);
          axis.add(line);
        }
        // label y axis:
        for (var i = start + 40; i <= stop; i = i + stepSize * 1.5) {
          if (i == 0) {
            continue;
          }
          text = new SpriteText2D(i / 90, textStyle);
          text.position.x = -15;
          text.position.y = i + 7;
          text.position.z = 0.2;
          axis.add(text);
          vertices = [];
          vertices.push(0, i, 0);
          vertices.push(10, i, 0);
          line = createLineMesh1(vertices, '#000000', 3, 2);
          axis.add(line);
        }
        axis.add(text);
      };
      var drawAxisArrow = (origin, dir, color, style) => {
        // var geometryLine = new THREE.Geometry();
        // var vertices = [];
        // vertices.push(origin);
        // vertices.push(dir);
        // geometryLine.vertices = vertices;
        var line = createLineMesh1(origin, color, 3, 2);
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
      createAxis();
      //画圆点
      var createCircle = (radius, color) => {
        var CircleM = new THREE.MeshBasicMaterial({
          color: color
        });
        var CircleG = new THREE.CircleGeometry(radius, 10);
        var Circle = new THREE.Mesh(CircleG, CircleM);
        return Circle;
      };
      //基础
      var vertices = [];
      for (var i = 0; i < 361; i += 6) {
        var x = 90 * Math.cos(i * Math.PI / 180);
        var y = 90 * Math.sin(i * Math.PI / 180);
        vertices.push(x, y, 3);
      }
      var circle = createLineMesh1(vertices, '#000', 3, 2);
      circle.position.x = -180;
      scene.add(circle);
      //等分线
      var vertices = [];
      var LINE = new THREE.Group();
      vertices.push(-89, 0, 2, 89, 0, 2);
      var line = createLineMesh1(vertices, '#5CAEFD', 3, 2);
      // LINE.add(line);
      line.position.x = -180;
      //12等分
      var LINE1 = new THREE.Group();
      for (var i = 0; i < 6; i++) {
        var lineC = line.clone();
        lineC.rotation.z = Math.PI / 6 * i;
        LINE1.add(lineC);
      }
      scene.add(LINE1);
      LINE1.visible = false;
      LINE1.position.x = -180;
      //无穷等分
      var LINE2 = new THREE.Group();
      // for (var i = 0; i < 181; i++) {
      //   var lineC = line.clone();
      //   lineC.rotation.z = Math.PI / 180 * i;
      //   LINE2.add(lineC);
      // }
      var geometry = new THREE.CircleGeometry(90, 24);
      var material = new THREE.MeshBasicMaterial({ color: '#5CAEFD' });
      var circle = new THREE.Mesh(geometry, material);
      LINE2.add(circle);
      LINE2.position.x = -180;
      LINE2.position.z = 2;
      scene.add(LINE2);
      LINE2.visible = false;
      var point = [];
      var pointC = createCircle(4, '#D0021B');
      for (var i = 0; i < 12; i++) {
        var x = -180 + 90 * Math.cos(i * 30 / 180 * Math.PI);
        var y = 90 * Math.sin(i * 30 / 180 * Math.PI);
        point[i] = pointC.clone();
        point[i].position.set(x, y, 4);
        point[i].visible = false;
        scene.add(point[i]);
      }
      var TIME = null;
      var lineX = [];
      var ani = 0;
      //连线
      var anLine = (start, j, callback) => {
        var sx = start[0];
        var sy = start[1];
        var step = (0 - sy) / 10;
        var i = 0;
        var an = () => {
          if (i == 10) {
            cancelAnimationFrame(TIME);
            ani++;
            callback && callback();
            return;
          }
          if (lineX[j]) {
            scene.remove(lineX[j]);
          }
          i++;
          var vertices = [];
          vertices.push(sx, sy, 3, sx, sy + step * i, 3);
          lineX[j] = createLineMesh1(vertices, '#F5A623', 2, 2);
          scene.add(lineX[j]);
          TIME = requestAnimationFrame(an);
          if (step == 0) {
            i = 10;
          }
        }
        an();
      }
      //打开正弦线
      var ANline = () => {
        if (this.radio1 == false) {
          return;
        }
        if (ani == 12) {
          this.anT1 = false;
          this.pointer2 = 'auto';
          return;
        }
        point[ani].visible = true;
        var x = -180 + 90 * Math.cos(ani * 30 / 180 * Math.PI);
        var y = 90 * Math.sin(ani * 30 / 180 * Math.PI);
        anLine([x, y], ani, ANline);
      }
      //关闭正弦线
      var closeANline = () => {
        cancelAnimationFrame(TIME);
        ani = 0;
        for (var i = 0; i < 12; i++) {
          point[i].visible = false;
          scene.remove(lineX[i]);
        }
      }
      var moi = 0;
      var TIME1 = null;
      var lineM = [];
      //正弦线平移
      var move = (ex, j, callback) => {
        if (j == 12) {
          var l = lineX[0].clone();
          var p = point[0].clone();
        } else {
          var l = lineX[j].clone();
          var p = point[j].clone();
        }
        lineM[j] = new THREE.Group();
        lineM[j].add(l, p);
        scene.add(lineM[j]);
        var step = ex / 10;
        var i = 0;
        var an = () => {
          if (i == 10) {
            cancelAnimationFrame(TIME1);
            moi++;
            callback && callback();
            return;
          }
          i++;
          lineM[j].position.x += step;
          TIME1 = requestAnimationFrame(an);
        }
        an();
      }
      //开始平移正弦线
      var MOVEline = () => {
        if (this.checked1 == false) {
          return;
        }
        if (moi == 13) {
          this.anT2 = false;
          this.pointer3 = 'auto';
          return;
        }
        var xend = 30 * moi + Math.abs(-180 + 90 * Math.cos(moi * 30 / 180 * Math.PI));
        move(xend, moi, MOVEline);
      }
      //关闭平移正弦线
      var closeMOVEline = () => {
        cancelAnimationFrame(TIME1);
        moi = 0;
        for (var i = 0; i < 13; i++) {
          scene.remove(lineM[i]);
        }
      }
      //绘制正弦线
      var sinPosArr = [],
        x, y;
      for (let i = 0; i < 361; i++) {
        x = i;
        y = 90 * Math.sin(i / 180 * Math.PI);
        sinPosArr.push(x, y, 3);
      }
      var sinLine = null;
      var drawL = [];
      var TIME2 = null;
      var lineF = null;
      var pointF = pointC.clone();
      var draw = () => {
        if (!this.radio2 && !this.checked2) {
          return;
        }
        var i = 0;
        var an = () => {
          if (i == 360) {
            cancelAnimationFrame(TIME2);
            scene.remove(lineF, pointF);
            this.blue = '';
            return;
          }
          i += 2;
          // var vertices = [];
          // var x1 = i - 2;
          // var y1 = 90 * Math.sin((i - 2) / 180 * Math.PI);
          var x2 = i;
          var y2 = 90 * Math.sin(i / 180 * Math.PI);
          // vertices.push(x1, y1, 3, x2, y2, 3);
          // drawL[i] = createLineMesh1(vertices, '#000', 3, 2);
          // scene.add(drawL[i]);
          if (sinLine != null) {
            scene.remove(sinLine);

          }
          sinLine = createLineMesh1(sinPosArr.slice(0, i * 3), '#000', 3, 2);
          scene.add(sinLine);
          if (this.radio2) {
            if (lineF != null) {
              scene.remove(lineF);
            }
            scene.add(pointF);
            lineF = new THREE.Group();
            var x = -180 + 90 * Math.cos(i / 180 * Math.PI);
            var y = 90 * Math.sin(i / 180 * Math.PI);
            pointF.position.set(x, y, 4);
            var vertices = [];
            vertices.push(x, y, 3, -180, 0, 3, x, 0, 3);
            var line1 = createLineMesh1(vertices, '#000', 3, 2);
            var vertices = [];
            vertices.push(x, 0, 3, x, y, 3, x2, y2, 3, x2, 0, 3);
            var line2 = createLineMesh1(vertices, '#F5A623', 2, 2);
            lineF.add(line1, line2);
            scene.add(lineF);
          }
          TIME2 = requestAnimationFrame(an);
        }
        an();
      }
      var clearDraw = () => {
        cancelAnimationFrame(TIME2);
        scene.remove(lineF, pointF, sinLine);
        // for (var i in drawL) {
        //   scene.remove(drawL[i]);
        // }

      }
      //单选
      var choose = (num) => {
        if (num == 1) {
          LINE1.visible = true;
          LINE2.visible = false;
        } else {
          LINE1.visible = false;
          LINE2.visible = true;
        }
      }
      let count = 0;
      var animate = () => {
        requestAnimationFrame(animate);
        count = (++count) % 2;
        if (count) {
          renderer.clear();
          renderer.render(scene, camera);
        }
      };
      animate();
      var resetWidget = () => {
        cancelAnimationFrame(TIME);
        cancelAnimationFrame(TIME1);
        cancelAnimationFrame(TIME2);
        ani = 0;
        moi = 0;
        this.pointer1 = 'none';
        this.pointer2 = 'none';
        this.pointer3 = 'none';
        this.blue = '';
        this.checked2 = false;
        this.checked1 = false;
        this.radio1 = false;
        this.radio2 = false;
        this.radio = 0;
        this.anT1 = true;
        this.anT2 = true;
        LINE1.visible = false;
        LINE2.visible = false;
        clearDraw();
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1200;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          choose: choose,
          ANline: ANline,
          closeANline: closeANline,
          MOVEline: MOVEline,
          closeMOVEline: closeMOVEline,
          draw: draw,
          clearDraw: clearDraw
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
      var cW = $('canvas').width();
      var cH = $('canvas').height();
      $('canvas').css({
        'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
        'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
      });
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

.hideO {
  opacity: 0;
}








/*.btn_space .UI-btn {
    margin-bottom: 10px;
  }*/

</style>
