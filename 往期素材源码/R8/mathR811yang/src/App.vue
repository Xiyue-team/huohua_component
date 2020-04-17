<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="equation">
        <span>y=sin{{value!=0?'(':''}}</span>
        <span>{{value1 == 1?'x':value1 == 1/3?'0.33x':value1+'x'}}</span>
        <span :style="'margin:0 5px;'">{{value == 0?'':value > 0?'+':'-'}}</span>
        <span class="pi" v-show="value != 0 && value !=12 && value !=-12">
          <p>{{phiArr1[Math.abs(value)][0]}}</p>
          <p>{{phiArr1[Math.abs(value)][1]}}</p>
        </span>
        <span v-show="value ==12 || value ==-12">{{phiArr1[Math.abs(value)][1]}}</span>
        <span>{{value!=0?')':''}}</span>
      </div>
      <div class="equation1">
        <span>y=sin</span>
        <span>{{value3show}}</span>
        <span :style="'margin:0 5px;'">{{value2 == 0?'':value2 > 0?'+':'-'}}</span>
        <span class="pi" v-show="value2 != 0 && value2 !=12 && value2 !=-12">
          <p>{{phiArr1[Math.abs(value2)][0]}}</p>
          <p>{{phiArr1[Math.abs(value2)][1]}}</p>
        </span>
        <span v-show="value2 ==12 || value2 ==-12">{{phiArr1[Math.abs(value2)][1]}}</span>
        <span>{{value2 == 0 || value3 == 1?'':')'}}</span>
      </div>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <div class="app_aside">
      <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
      <!--侧边按钮区-->
      <div class="center">
        <div class="sidle11">
          <ui-slider :class="{noActive:f1}"  @drag-end="dragEnd(1)" :label="['-π','π']" :min="-12" :max="12" :title="'平移'" :formatter="phi" class="slider" :speed="0"
                     :noBlueProcess="true" v-model="value"></ui-slider>
          <div :style="'width:100%;height:1px;background: rgba(0,0,0,0.06)'"></div>
          <div class="updown" :class="{noActive:f2}">
            <p>伸缩</p>
            <div style="font-size: 14px;font-weight: 500;line-height: 1.0;color: #999999;padding: 0 22px;height: 14px">
              <span style="float: left;display: block">缩</span><span style="float: right;display: block">伸</span></div>
            <div style="padding: 0 12px;height:50px;margin-top: 2px">
              <div class="pointDiv"><span class="pointS"><p
                style="border-bottom: 1px solid #999999;">1</p><p>4</p></span></div>
              <div class="pointDiv"><span class="pointS"><p
                style="border-bottom: 1px solid #999999;">1</p><p>3</p></span></div>
              <div class="pointDiv"><span class="pointS"><p
                style="border-bottom: 1px solid #999999;">1</p><p>2</p></span></div>
              <div class="pointDiv"><span class="pointS"><p style="margin-top: 25px">1</p></span></div>
              <div class="pointDiv"><span class="pointS"><p style="margin-top: 25px">2</p></span></div>
              <div class="pointDiv"><span class="pointS"><p style="margin-top: 25px">3</p></span></div>
              <div class="pointDiv"><span class="pointS"><p style="margin-top: 25px">4</p></span></div>
            </div>
          </div>
        </div>
        <div class="sidle22">
          <div class="updown" :class="{noActive:f3}" style="margin-top: 0;">
            <p>伸缩</p>
            <div style="font-size: 14px;font-weight: 500;line-height: 1.0;color: #999999;padding: 0 22px;height: 14px">
              <span style="float: left;display: block">缩</span><span style="float: right;display: block">伸</span></div>
            <div style="padding: 0 12px;height:50px;margin-top: 2px">
              <div class="pointDiv1"><span class="pointS1"><p
                style="border-bottom: 1px solid #999999;">1</p><p>4</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p
                style="border-bottom: 1px solid #999999;">1</p><p>3</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p
                style="border-bottom: 1px solid #999999;">1</p><p>2</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p style="margin-top: 25px">1</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p style="margin-top: 25px">2</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p style="margin-top: 25px">3</p></span></div>
              <div class="pointDiv1"><span class="pointS1"><p style="margin-top: 25px">4</p></span></div>
            </div>
          </div>
          <div :style="'width:100%;height:1px;background: rgba(0,0,0,0.06)'"></div>
          <ui-slider :class="{noActive:f4}" @drag-end="dragEnd(2)" :label="['-π','π']" :min="-12" :max="12" :title="'平移'" :formatter="phi1" class="slider2" :speed="0"
                     :noBlueProcess="true" v-model="value2"></ui-slider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import uiSlider from '@/components/UI/uiSlider'; //滑块

  let {sin, PI,} = Math;

  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '平移和伸缩顺序问题',
        BtnSpaceStyle: 'flex',
        isFirst: true,
        TO: null,
        sliderPoint: [0, 5, 10],
        value: 0,
        value1: 1,
        value2: 0,
        value3: 1,
        arr: [1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4],
        phiArr: ['', 'π/12', 'π/6', 'π/4', 'π/3', '5π/12', 'π/2', '7π/12', '2π/3', '3π/4', '5π/6', '11π/12', 'π'],
        phiArr1: [
          ['', 'π'],
          ['π', '12'],
          ['π', '6'],
          ['π', '4'],
          ['π', '3'],
          ['5π', '12'],
          ['π', '2'],
          ['7π', '12'],
          ['2π', '3'],
          ['3π', '4'],
          ['5π', '6'],
          ['11π', '12'],
          ['', 'π']
        ],
          f1:false,
          f2:true,
          f3:false,
          f4:true,
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
      $('.slider').append('<div class="sliderP"><span class="s1"></span><span class="s2"><p>0</p></span><span class="s3"></span><div class="blueLine"></div></div>');

      $('.slider2').append('<div class="sliderP"><span class="s1"></span><span class="s2"><p>0</p></span><span class="s3"></span><div class="blueLine1"></div></div>');

      $('.s2').css('background', '#5caefd');

      this.setSliderPonint();
      this.countWidth(0);
      this.countWidth1(0);

      $('.pointS').css('background', '#f0f0f0').eq(3).css('background', '#5caefd');
      $('.pointS1').css('background', '#f0f0f0').eq(3).css('background', '#5caefd');

      window.onresize = () => {
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      };
    },
    computed: {
      value3show(){
        if(this.value3 == 1){
          return 'x'
        }else if(this.value3 == 1/3){
          if(this.value2 == 0){
            return '0.33x'
          }else {
            return '0.33(x'
          }
        }else {
          if(this.value2 == 0){
            return this.value3+'x'
          }else {
            return this.value3+'(x'
          }
        }
      },
      phi() {
        return this.value >= 0 ? this.phiArr[Math.abs(this.value)] : ("-" + this.phiArr[Math.abs(this.value)]);
      },
      phi1() {
        return this.value2 >= 0 ? this.phiArr[Math.abs(this.value2)] : ("-" + this.phiArr[Math.abs(this.value2)]);
      },
    },
    watch: {
      value(newvalue) {
        if (newvalue == 0 && this.value1 == 1) {
          this.TO.dashLineHide();
        } else {
          this.TO.dashLineShow();
        }
        this.countWidth(newvalue);
        this.TO.createObj3();
      },
      value2(newvalue) {
        if (newvalue == 0 && this.value3 == 1) {
          this.TO.dashLine1Hide();
        } else {
          this.TO.dashLine1Show();
        }
        this.countWidth1(newvalue);
        this.TO.createObj4();
      },
    },
    methods: {
      reset() {
        this.TO.reset();
      },
      dragEnd(num){
        if(num==1){
            this.f1=true;
            this.f2=false;
        }else{
            this.f4=true;
        }
      },
      //滑动条点
      setSliderPonint() {
        let vm = this;
        let sliderW = $('.slider').width();
        $('.sliderP span').each(function () {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 10 - 7)
        });
        $('.ui-label li').each(function () {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 10 + 12)
        })
      },
      //滑动条移动蓝条
      countWidth(v) {
        let dis = Math.abs(0 - v);
        $('.blueLine').css('width', dis / 24 * 236);
        if (v > 0) {
          $('.blueLine').css({
            'left': 1 / 2 * 236,
            'right': ''
          });
        } else {
          $('.blueLine').css({
            'left': '',
            'right': 1 / 2 * 236
          });
        }
      },
      countWidth1(v) {
        let dis = Math.abs(0 - v);
        $('.blueLine1').css('width', dis / 24 * 236);
        if (v > 0) {
          $('.blueLine1').css({
            'left': 1 / 2 * 236,
            'right': ''
          });
        } else {
          $('.blueLine1').css({
            'left': '',
            'right': 1 / 2 * 236
          });
        }
      },
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          obj1 = null,
          stepNumber,
          axis = null,
          axis1 = null,
          dashLine = null,
          dashLine1 = null,
          Line = null,
          Line1 = null,
          isMob = null;

        isMob = /iPad|Android/g.test(navigator.userAgent);
        //伸缩点击事件
        var thiz = this;
        var pointClick = function () {
          var index = $(this).index();
          if (index == 3 && thiz.value == 0) {
            dashLine.visible = false;
          } else {
            dashLine.visible = true;
          }
          $('.pointS').css('background', '#f0f0f0').eq(index).css('background', '#5caefd');
          thiz.value1 = thiz.arr[index];
          thiz.f2=true;
          createObj3();
        };

        var pointClick1 = function () {
          var index = $(this).index();
          if (index == 3 && thiz.value2 == 0) {
            dashLine1.visible = false;
          } else {
            dashLine1.visible = true;
          }
          $('.pointS1').css('background', '#f0f0f0').eq(index).css('background', '#5caefd');
          thiz.value3 = thiz.arr[index];
          thiz.f3=true;
          thiz.f4=false;
          createObj4();
        };

        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
          $('.pointDiv').on('touchstart', pointClick);
          $('.pointDiv1').on('touchstart', pointClick1);
          stepNumber = 1;
        } else {
          $('.pointDiv').on('mousedown', pointClick);
          $('.pointDiv1').on('mousedown', pointClick1);
          stepNumber = 8;
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

        //创建标准y=sinx虚线
        var createObj = () => {
          let vertices = [], dy;
          for (let i = -400; i < 401; i += 10) {
            dy = 100 * sin(i / 160 * PI);
            vertices.push(vec3(i, dy, 0));
          }
          var dashLine = createLineMesh(vertices, '#000', 2, 2);
          return dashLine;
        };
        //创建标准y=sinx实线
        var createObj1 = (line, x1, x2, num) => {
          if (line != null) {
            scene.remove(line);
          }
          let vertices = [];
          let dx, dy;
          if (x2 != 0) {
            x2 = 180 / 12 * x2 * (160 / 180);
          }
          if (num == 2) {
            for (let i = -400; i < 401; i += 2) {
              dy = 100 * sin(x1 * (i + x2) / 160 * PI);
              dx = i;
              vertices.push(vec3(dx, dy, 0));
            }
          } else {
            for (let i = -400; i < 401; i += 2) {
              dy = 100 * sin((x1 * i + x2) / 160 * PI);
              dx = i;
              vertices.push(vec3(dx, dy, 0));
            }
          }
          var sinLine = createLineMesh(vertices, '#4A90E2', 3, 2);
          return sinLine;
        };
        var createObj3 = () => {
          Line = createObj1(Line, this.value1, this.value, 1);
          Line.position.set(50, 220, 0);
          scene.add(Line);
        };
        var createObj4 = () => {
          Line1 = createObj1(Line1, this.value3, this.value2, 2);
          Line1.position.set(50, -220, 0);
          scene.add(Line1);
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
        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        var createAxis = () => {
          axis = new THREE.Group();
          labelAxis(-400, 40, 400, axis);
          drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1, axis);
          drawAxisArrow(vec3(0, -200, 0), vec3(0, 200, 0), 0x000000, 2, axis);
          axis.position.set(50, 220, 0);

          axis1 = new THREE.Group();
          labelAxis(-400, 40, 400, axis1);
          drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1, axis1);
          drawAxisArrow(vec3(0, -200, 0), vec3(0, 200, 0), 0x000000, 2, axis1);

          axis1.position.set(50, -220, 0);
          scene.add(axis, axis1);
        };
        var labelAxis = (start, stepSize, stop, obj) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: '23px "Cambria Math"',
            fillStyle: '#000000',
            antialias: true
          };
          var text = {},
            textPI = {},
            textQI = {},
            line = null,
            vertices = null;
          // label x axis:
          for (var i = start - 40; i <= stop + 40; i = i + stepSize) {
            if (i == 0 || i == -480 || i == 480 || i == 440 || i == -440) {
              continue;
            }
            var j = i / 80;
            if (parseInt(j) == j) {
              if (j / 2 == 1) {
                textPI = new SpriteText2D('π', textStyle);
              } else if(j / 2 == -1){
                textPI = new SpriteText2D('-π', textStyle);
              }else {
                textPI = new SpriteText2D(j / 2 + 'π', textStyle);
              }
              if (i == 0) {
                textPI.position.x = i + 10;
              } else {
                textPI.position.x = i;
              }
              textPI.position.y = -5;
              obj.add(textPI);
            }

            vertices = [];

            vertices.push(vec3(i, 0, 0));
            vertices.push(vec3(i, 10, 0));

            var line = createLineMesh(vertices, '#000000', 3, 2);
            obj.add(line);
          }
          // label y axis:
          for (var i = start; i <= stop; i = i + 100) {
            if (i == 0 || i == 200 || i == 300 || i == 400 || i == -200 || i == -300 || i == -400) {
              continue;
            }
            text = new SpriteText2D(i / 100, textStyle);
            text.position.x = -15;
            text.position.y = i + 10;
            text.position.z = 0.2;
            obj.add(text);

            vertices = [];
            vertices.push(vec3(0, i, 0));
            vertices.push(vec3(10, i, 0));

            line = createLineMesh(vertices, '#000000', 3, 2);
            obj.add(line);
          }
          obj.add(text);
        };
        var drawAxisArrow = (origin, dir, color, style, obj) => {
          var geometryLine = new THREE.Geometry();
          var vertices = [];
          vertices.push(origin);
          vertices.push(dir);
          geometryLine.vertices = vertices;
          var line = createLineMesh(geometryLine.vertices, color, 3, 2);
          obj.add(line);
          var text;
          if (style == 1) {
            vertices = [];
            vertices.push(vec3(dir.x - 10, 0, 0));
            vertices.push(vec3(dir.x - 13, 5, 0));
            vertices.push(vec3(dir.x + 5, 0, 0));
            var triangle1 = createTriangleFace(vertices, "#000");
            obj.add(triangle1);
            vertices = [];
            vertices.push(vec3(dir.x - 10, 0, 0));
            vertices.push(vec3(dir.x - 13, -5, 0));
            vertices.push(vec3(dir.x + 5, 0, 0));
            var triangle2 = createTriangleFace(vertices, "#000");
            obj.add(triangle2);
            text = createText('x', dir.x, -5, 0, '#000', 28);
            obj.add(text);
            text = createText('0', -14, -2, 0, '#000', 28);
            obj.add(text);
          } else {
            vertices = [];
            vertices.push(vec3(0, dir.y - 10, 0));
            vertices.push(vec3(5, dir.y - 13, 0));
            vertices.push(vec3(0, dir.y + 5, 0));
            var triangle1 = createTriangleFace(vertices, "#000");
            obj.add(triangle1);
            vertices = [];
            vertices.push(vec3(0, dir.y - 10, 0));
            vertices.push(vec3(-5, dir.y - 13, 0));
            vertices.push(vec3(0, dir.y + 5, 0));
            var triangle2 = createTriangleFace(vertices, "#000");
            obj.add(triangle2);
            text = createText('y', 20, dir.y + 10, 0, '#000', 28);
            obj.add(text);
          }
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
              dashSize: 15,
              gapSize: 15,
              linewidth: width
            })
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
        var dashLineShow = () => {
          dashLine.visible = true;
        };
        var dashLineHide = () => {
          dashLine.visible = false;
        };
        var dashLine1Show = () => {
          dashLine1.visible = true;
        };
        var dashLine1Hide = () => {
          dashLine1.visible = false;
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
          animate();
          createAxis();
          dashLine = createObj();
          dashLine.visible = false;
          dashLine.position.set(50, 220, 0);

          dashLine1 = createObj();
          dashLine1.visible = false;
          dashLine1.position.set(50, -220, 0);

          Line = createObj1(Line, this.value1, this.value, 1);
          Line.position.set(50, 220, 0);

          Line1 = createObj1(Line1, this.value3, this.value2, 1);
          Line1.position.set(50, -220, 0);
          scene.add(dashLine, Line, dashLine1, Line1);
          this.isFirst = false;
        }
        var resetWidget = () => {
          this.value = 0;
          this.value1 = 1;
          this.value2 = 0;
          this.value3 = 1;

          this.f1=false;
          this.f2=true;
          this.f3=false;
          this.f4=true;

          dashLine.visible = false;
          dashLine1.visible = false;

          $('.pointS').css('background', '#f0f0f0').eq(3).css('background', '#5caefd');
          $('.pointS1').css('background', '#f0f0f0').eq(3).css('background', '#5caefd');

          Line = createObj1(Line, this.value1, this.value, 1);
          Line.position.set(50, 220, 0);

          Line1 = createObj1(Line1, this.value3, this.value2, 2);
          Line1.position.set(50, -220, 0);
          scene.add(Line, Line1);
          this.isFirst = false;
        };
        var TO = function () {
          return {
            reset: resetWidget,
            createObj3,
            createObj4,
            dashLineHide: dashLineHide,
            dashLine1Hide: dashLine1Hide,
            dashLineShow: dashLineShow,
            dashLine1Show: dashLine1Show
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

  /*内容区*/
  .container {
    width: calc(100% - 300px);
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
    width: 300px;
    height: 100%;
    position: relative;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: calc(100% - 72px);
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

  #renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
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

  .slider {
    position: relative;
    margin: 0 auto auto auto;
  }

  .sidle11 {
    border-radius: 5px;
    height: 220px;
    width: 280px;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border: solid 0.5px rgba(0, 0, 0, 0.06);
    margin: 0 auto auto auto;
  }

  .sidle22 {
    border-radius: 5px;
    height: 220px;
    width: 280px;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border: solid 0.5px rgba(0, 0, 0, 0.06);
    margin: 15px auto auto auto;
  }

  .center {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 280px;
    height: 480px;
  }

  .slider > div.sliderP, .slider1 > div.sliderP, .slider2 > div.sliderP, .slider3 > div.sliderP {
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
  }

  .slider > div.sliderP > span, .slider1 > div.sliderP > span, .slider2 > div.sliderP > span, .slider3 > div.sliderP > span {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #f0f0f0;
    border-radius: 50%;
    position: absolute;
  }

  .blueLine, .blueLine1, .blueLine2, .blueLine3 {
    position: absolute;
    height: 6px;
    width: calc(3 / 20 * 236px);
    background: #5caefd;
    top: 4px;
  }

  .sliderP span p {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    display: table-cell;
    position: absolute;
    top: 22px;
  }

  .equation {
    position: fixed;
    left: 24px;
    top: 92px;
    color: #3494E9;
    font-size: 26px;
    z-index: 10;
  }

  .equation1 {
    position: fixed;
    left: 24px;
    top: 50%;
    color: #3494E9;
    font-size: 26px;
    z-index: 10;
  }

  .equation span,.equation1 span {
    display: block;
    float: left;
  }

  .pi p {
    font-size: 18px;
  }

  .pi p:first-child {
    border-bottom: 2px solid #3494E9;
  }

  .updown {
    height: 100px;
    width: 280px;
    position: relative;
  }

  .updown > p {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.0;
    color: #4c4c4c;
    padding-top: 10px;
    text-align: center;
  }

  .pointS {
    margin: 5px auto auto 9px;
    width: 14px;
    height: 14px;
    background: #f0f0f0;
    float: left;
    border-radius: 50%;
  }

  .pointS1 {
    margin: 5px auto auto 9px;
    width: 14px;
    height: 14px;
    background: #f0f0f0;
    float: left;
    border-radius: 50%;
  }

  .pointS p {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    text-align: center;
  }

  .pointS1 p {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    text-align: center;
  }

  .pointS p:first-child {
    margin: 17px auto auto 3px;
  }

  .pointS p:last-child {
    margin: 2px auto auto 3px;
  }

  .pointS1 p:first-child {
    margin: 17px auto auto 3px;
  }

  .pointS1 p:last-child {
    margin: 2px auto auto 3px;
  }

  .pointDiv {
    width: 34px;
    height: 50px;
    float: left;
    cursor: pointer;
    margin-right: 3px;
  }

  .pointDiv:last-child {
    margin-right: 0;
  }

  .pointDiv1 {
    width: 34px;
    height: 50px;
    float: left;
    cursor: pointer;
    margin-right: 3px;
  }

  .pointDiv1:last-child {
    margin-right: 0;
  }

  .s2 p {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.0;
    color: #999999;
    display: table-cell;
    position: absolute;
    top: -32px;
    left: 3px;
  }

  .slider {
    position: relative;
    margin: 0 auto auto auto;
  }
  .equation>span,.equation1>span{
    display: inline-block;
    height: 52px;
    line-height: 52px;
  }
  .equation>span>p,.equation1>span>p{
    height: 29px;
    line-height: 27px;
  }

  .kuohao {
    display: inline-block;
  }
  .pi {
    text-align: center;
  }
  .pi p {
    font-size: 18px;
  }
  .pi p:first-child {
    border-bottom: 2px solid #3494E9;
  }
  .noActive{
    opacity: 0.3;
    pointer-events: none;
  }
</style>
