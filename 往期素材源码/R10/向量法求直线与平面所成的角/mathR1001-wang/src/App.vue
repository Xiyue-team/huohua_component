<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="prove-wrap" v-if="checked1">
        <div><img src="static/UI/4@2x.png"></div>
          <div><img :src="'static/UI/'+proveText+'@2x.png'"></div>
          </div>
          <!--视图区-->
          <div id="renderCanvas"></div>
        </div>
        <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
        <div class="ctrl">
          <ui-slider :box='true' boxWidth='240' title='直线与平面所成的角<h5>θ<h5/>' :label="['0°','90°']" :min="0" :max="90" formatter="{value}°" v-model='value' :zoom="zoomF"></ui-slider>
          <ui-btn type="switch" v-model="checked">建线面角</ui-btn>
          <ui-btn type="switch" v-model="checked1" v-if='showChecked1'>向量</ui-btn>
        </div>
        <!--侧边按钮区-->
      </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiGroup from '@/components/UI/uiGroup';

const { sin, cos, PI, tan } = Math;
const DOWN_DIS = 200; //平面α下移的距离
const UNITS = 200; //
const POS_X = 150;
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
      title: '向量法求直线与平面所成的角',
      BtnSpaceStyle: 'flex',
      checked: false,
      checked1: false,
      TO: null,
      value: 45,
      radio: '',
      showChecked1: false,
      proveText: 1,
      zoomF: 1
    }
  },
  created() {
    document.title = this.title;
    this.preAngle = this.value;
  },
  mounted() {
    this.isMob = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
    if (this.isMob && window.innerWidth < 800) {
      this.zoomF = 0.5
    } else {
      this.zoomF = 1
    }
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.setSideStyle();
    this.loopInit();
    // window.onresize = () => {
    //   var cW = $('canvas').width();
    //   var cH = $('canvas').height();
    //   $('canvas').css({
    //     'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
    //     'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
    //   });
    // };
    // let resizeTimer = null;
    // window.addEventListener('resize', () => {
    //   clearTimeout(resizeTimer);
    //   resizeTimer = setTimeout(() => {
    //     mainWidth = $('#renderCanvas').width();
    //     mainHeight = $('#renderCanvas').height();
    //     $('canvas').css({
    //       'left': ($('#renderCanvas').width() - mainWidth) / 2 + 'px',
    //       'top': ($('#renderCanvas').height() - mainHeight) / 2 + 'px'
    //     });
    //     camera.aspect = mainWidth / mainHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(mainWidth, mainHeight);
    //     // composer.setSize(mainWidth, mainHeight);
    //   }, 200)
    // });

  },
  computed: {},
  watch: {
    value(v) {
      this.TO.sliderEvent(v);
      if (this.checked1) {
        this.TO.rotateVectorE(v);
      }
    },
    checked(v) {
      this.TO.buttonEvent1(v);
      if (!v) {
        this.showChecked1 = false;
        this.checked1 = false;
      }
    },
<<<<<<< HEAD
    mounted() {
      this.TO = this.init();
      $(document).on('touchmove',(e)=>{
        e.preventDefault();
      })
      this.isMob = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
     if (this.isMob && window.innerWidth < 800) {
       this.zoomF = 0.5
     } else {
       this.zoomF = 1
     }
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.setSideStyle();
      this.loopInit();
=======
    checked1(v) {
      this.TO.buttonEvent2(v);
    }
  },
  methods: {
    loopInit() {
      if (!window.innerWidth || !window.innerHeight) {
        setTimeout(() => {
          this.loopInit();
        }, 200)
        return false;
      }
      this.TO = this.init();

>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
    },
    reset() {
      this.TO.reset();
    },
    init() {
      var scene = null,
        scene1 = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        controls = null,
        axis = null,
        selectobjs = [],
        selectobjs1 = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0)),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        mouse = new THREE.Vector2(),
        INTERSECTED = null,
        mousedownflag = false;
      let pointArrA = [{ x: -200, y: -200 }, { x: -200, y: 200 }, { x: 200, y: 200 }, { x: 200, y: -200 }];
      let pointArrB = [{ x: -200, y: 0 }, { x: -200, y: 200 }, { x: 200, y: 200 }, { x: 200, y: 0 }];
      let selectPlanePoint = [{ x: -200, y: -200 }, { x: -200, y: 200 }, { x: 200, y: 200 }, { x: 200, y: -200 }];
      let group = null;
      let group1 = null;
      let group2 = null;
      let planeB = null;
      let crossPos = {
        x: 0,
        y: 0,
        z: 0
      };
      let posN = {
        x: 0,
        y: 100,
        z: 0
      };
      let posE = {
        x: 0,
        y: 100,
        z: 0
      };
      let groupN = null;
      let touchNImg = null;
      let groupE = null;
      let touchEImg = null;
      let groupDeg = null;
      let singleObj = {};
      let isPlus = false;
      let textE = {
        x: 0,
        y: 0,
        z: 0
      };
      let frameArr = [];
      let timer = null;
      let n = 1;
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.autoClear = false;
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      scene1 = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 200;
      camera.position.z = 800;
      camera.lookAt(scene.position);
      // scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 1);
      // renderer.setClearAlpha(0.2);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      var createLine = (arr, style, linewidth, color = '#000') => {
        let lineParameters = new three3DExtras.tubeLine(arr[0], arr[1], linewidth, color);
        let line = lineParameters.getObject3D();
        line.material.depthTest = false;
        return line;
      }
      //创建虚线
      var createDashLine = (arr, step, linewidth, color = '#000') => {
        var group = new THREE.Group();
        let line = null;
        var stepX = (arr[1][0] - arr[0][0]) / step;
        var stepY = (arr[1][1] - arr[0][1]) / step;
        for (let i = 0; i <= step; i += 2) {
          line = createLine([
            [arr[0][0] + stepX * i, arr[0][i] + stepY * i, 0],
            [arr[0][0] + stepX * (i + 1), arr[0][i] + stepY * (i + 1), 0]
          ], 3, 2, '#1B8B72');
          group.add(line);
        }
        return group;
      }
<<<<<<< HEAD
    },
    methods: {
      loopInit() {
      if (!window.innerWidth || !window.innerHeight) {
        setTimeout(() => {
          this.loopInit();
        }, 200)
        return false;
      }
      this.TO = this.init();

    },
      reset() {
        this.TO.reset();
      },
      init() {
        var scene = null,
          scene1 = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          axis = null,
          selectobjs = [],
          selectobjs1 = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0)),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          mouse = new THREE.Vector2(),
          INTERSECTED = null,
          mousedownflag = false;
        let pointArrA = [{x: -200, y: -200}, {x: -200, y: 200}, {x: 200, y: 200}, {x: 200, y: -200}];
        let pointArrB = [{x: -200, y: 0}, {x: -200, y: 200}, {x: 200, y: 200}, {x: 200, y: 0}];
        let selectPlanePoint = [{x: -200, y: -200}, {x: -200, y: 200}, {x: 200, y: 200}, {x: 200, y: -200}];
        let group = null;
        let group1 = null;
        let group2 = null;
        let planeB = null;
        let crossPos = {
          x: 0,
          y: 0,
          z: 0
        };
        let posN = {
          x: 0,
          y: 100,
          z: 0
        };
        let posE = {
          x: 0,
          y: 100,
          z: 0
        };
        let groupN = null;
        let touchNImg = null;
        let groupE = null;
        let touchEImg = null;
        let groupDeg = null;
        let singleObj = {};
        let isPlus = false;
        let textE = {
          x: 0,
          y: 0,
          z: 0
        };
        let frameArr = [];
        let timer = null;
        let n = 1;
        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.autoClear = false;
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        scene1 = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 200;
        camera.position.z = 1200;
        camera.lookAt(scene.position);
        // scene.add(camera);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 1);
        // renderer.setClearAlpha(0.2);
        renderer.setSize(mainWidth, mainHeight);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        $("#renderCanvas").append(renderer.domElement);
        var createLine = (arr, style, linewidth, color = '#000') => {
          let lineParameters = new three3DExtras.tubeLine(arr[0], arr[1], linewidth, color);
          let line = lineParameters.getObject3D();
          line.material.depthTest = false;
          return line;
=======
      let box = null;
      var createObj = () => {
        //创建α面
        let planeA = drawPlane(pointArrA, '#E1631B');
        planeA.rotation.x = -PI / 2;
        scene.add(planeA);
        let textA = common.createText('α', -180, 20, 180, '#000', 40);
        scene.add(textA);
        //创建β面
        frameArr[0] = new THREE.Group();
        let planeB = drawPlane(pointArrB, '#4A90E2');
        let textB = common.createText('β', -180, 180, 5, '#000', 40);
        frameArr[0].add(planeB, textB);
        scene.add(frameArr[0]);
        sliderEvent(45);
        //创建拖动的点N
        touchNImg = common.createImg([common.vec3(0, 0, 2)], 68, 27, "static/UI/A@2x.png");
        touchNImg.rotation.z = PI / 2;
        touchNImg.material.depthTest = false;
        //创建拖动点E
        touchEImg = common.createImg([common.vec3(0, 0, 2)], 68, 27, "static/UI/A@2x.png");
        touchEImg.rotation.z = PI / 2;
        touchEImg.material.depthTest = false;
        singleObj.touchN = createBox(40, 80, 10);
        singleObj.touchN.name = 'N';
        selectobjs.push(singleObj.touchN);
        singleObj.touchE = createBox(40, 80, 10);
        singleObj.touchE.name = 'E';
        selectobjs.push(singleObj.touchE);
        //创建贴图
        singleObj.textureE = common.createImg([common.vec3(0, 0, 2)], 17, 21, "static/UI/e@2x.png");
        singleObj.textureN = common.createImg([common.vec3(0, 0, 2)], 17, 21, "static/UI/n@2x.png");
        //
        box = createBox(400, 80, 80, 0);
        selectobjs1.push(box);
        scene.add(box);
      };
      //创建放大触控范围的盒子
      var createBox = (w, h, d, opacity = 0) => {
        var geometry = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: opacity,
          depthTest: false
        });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
      }
      //滑条事件
      var sliderEvent = (angle) => {
        rotateLineA(angle);
      }
      var rotateLineA = (angle) => {
        if (group !== null) {
          scene.remove(group, singleObj.angle0);
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
        }
        group = new THREE.Group();
        let line = createLine([
          [-200, 0, 0],
          [200, 0, 0]
        ], 3, 2, '#0094FF');
        let textAA = common.createText('a', 100, 20, 5, '#000', 40);
        group.add(line, textAA);
        group.rotation.z = common.radian(angle);
        //画夹角0;
        if (this.checked) {
          singleObj.angle0 = drawAngle(0, angle, 20, '#258269', '#5EAA97', 'θ', 1);
          scene.add(singleObj.angle0);
        }
        scene.add(group);
        return group;
      }
      //单选按钮事件
      var buttonEvent1 = (v) => {
        if (v) {
          // 创建两条线可以和a直线构成直角三角形
          animationFrames();
        } else {
          n = 1;
          clearTimeout(timer1);
          scene.add(frameArr[0]);
<<<<<<< HEAD
          sliderEvent(45);
          //创建拖动的点N
          touchNImg = common.createImg([common.vec3(0, 0, 2)], 136, 54, "static/UI/A@2x.png");
          touchNImg.rotation.z = PI / 2;
          touchNImg.material.depthTest = false;
          //创建拖动点E
          touchEImg = common.createImg([common.vec3(0, 0, 2)], 136, 54, "static/UI/A@2x.png");
          touchEImg.rotation.z = PI / 2;
          touchEImg.material.depthTest = false;
          singleObj.touchN = createBox(40, 80, 10);
          singleObj.touchN.name = 'N';
          selectobjs.push(singleObj.touchN);
          singleObj.touchE = createBox(40, 80, 10);
          singleObj.touchE.name = 'E';
          selectobjs.push(singleObj.touchE);
          //创建贴图
          singleObj.textureE = common.createImg([common.vec3(0, 0, 2)], 17, 21, "static/UI/e@2x.png");
          singleObj.textureN = common.createImg([common.vec3(0, 0, 2)], 17, 21, "static/UI/n@2x.png");
          //
          box = createBox(400, 80, 80, 0);
          selectobjs1.push(box);
          scene.add(box);
        };
        //创建放大触控范围的盒子
        var createBox = (w, h, d, opacity = 0) => {
          var geometry = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
          var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: opacity,
            depthTest: false
          });
          var cube = new THREE.Mesh(geometry, material);
          return cube;
=======
          scene.remove(frameArr[1], frameArr[2], frameArr[3], singleObj.angle0);
        }
      }
      var buttonEvent2 = (v) => {
        if (v) {
          countPointN(touchNImg);
          rotateVectorE(this.value);
        } else {
          scene.remove(singleObj.angleG, shiyanArr);
          scene1.remove(groupE, groupN);
        }
      }
      var drawRightAngle = () => {
        let line = common.createStraightLine([
          [POS_X - 15, 0, 0],
          [POS_X - 15, 15, 0],
          [POS_X, 15, 0]
        ], 3, 2, '#0094FF');
        return line;
      }
      //旋转向量E的角度
      var rotateVectorE = (angle) => {
        let len = Math.hypot(posE.x, posE.y);
        if (posE.y < 0 || posE.x < 0) {
          len = -len;
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
        }
        textE.x = posE.x = len * cos(common.radian(angle));
        textE.y = posE.y = len * sin(common.radian(angle));
        countPointE(touchEImg);
      }
      //计算创建向量需要的点
      var countPointN = (touchImg) => {
        if (groupN !== null) {
          scene1.remove(groupN);
        }
        groupN = new THREE.Group();
        groupN.add(drawVector(crossPos, posN, touchImg, singleObj.touchN, singleObj.textureN, '#258269'));
        singleObj.textureN.position.set(posN.x - 20, posN.y, posN.z);
        groupN.add(singleObj.textureN);
        scene1.add(groupN);
        vectorDeg(posE, posN, this.value);
      };
      var countPointE = (touchImg, hasDis = false) => {
        if (groupE !== null) {
          scene1.remove(groupE);
        }
        groupE = new THREE.Group();
        groupE.add(drawVector(crossPos, posE, touchEImg, singleObj.touchE, singleObj.textureE, '#BC0000', this.value, hasDis));
        singleObj.textureE.position.set(textE.x + 40, textE.y + 15, textE.z);
        groupE.add(singleObj.textureE);
        vectorDeg(posE, posN, this.value);
        scene1.add(groupE);
      };
      //画点击建线面角需要画的图形
      var drawTriangleStroke = () => {
        group1 = new THREE.Group();
        frameArr[1] = createDashLine([
          [0, 0, 0],
          [POS_X, 0, 0]
        ], 16, 2, '#1B8B72');
        frameArr[2] = createLine([
          [POS_X, 200, 0],
          [POS_X, -200, 0]
        ], 3, 2, '#0094FF');
        frameArr[3] = drawRightAngle();
      }
      var animationFrames = () => {
        scene.remove(frameArr[0]);
        drawTriangleStroke();
        add();
      }
      let timer1 = null;
      var add = () => {
        clearTimeout(timer1);
        timer1 = setTimeout(() => {
          if (n == frameArr.length) {
            rotateLineA(this.value);
            setTimeout(() => {
              moveLeft();
            }, 500)
            return;
          }
          scene.add(frameArr[n]);
          n++;
          add();
        }, 500);
      }
      var moveLeft = () => {
        let dis = 0;
        let that = this;
        scene.remove(frameArr[3]);

        function animate() {
          frameArr[2].position.x = frameArr[3].position.x = dis;
          if (dis <= -POS_X) {
            that.showChecked1 = true;
            cancelAnimationFrame(timer);
            return;
          }
          dis -= 2;
          timer = requestAnimationFrame(animate);
        }

        animate();
      }
      //画夹角
      var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
        let dx, dy, vertices = [];
        let obj = new THREE.Object3D();
        for (var i = startangle; i < endangle; i = i + 3) {
          dx = size * Math.cos(Math.PI / 180 * i);
          dy = size * Math.sin(Math.PI / 180 * i);
          vertices.push(common.vec3(dx, dy, index));
        }
        let line = common.createLineMesh(vertices, color, 3, 1);
        let endradian = common.radian(endangle);
        let startradian = common.radian(startangle);
        let circle = common.createCircle([0, 0, index], size, circleColor, startradian, endradian - startradian, 0.4);
        let angle = 0;
        if (startangle === 0) {
          angle = endangle / 2;
        } else {
          angle = (endangle - startangle) / 2 + startangle;
        }
        if (font !== '') {
          let text = common.createText(font, (size + 15) * cos(common.radian(angle)) - 5, (size + 15) * sin(common.radian(angle)) + 10, 2, '#BD00D4', 40);
          obj.add(text);
        }
        obj.add(line, circle);
        return obj;
      };
      //画向量
      var drawVector = (startPos, endPos, touchImg, touch, textureImg, color, angle, hasDis = false) => {
        // selectobjs = [];
        let min = 1;
        let max = 5;
        if (endPos.y < 0 || endPos.x < 0) {
          [min, max] = [max, min];
        }
<<<<<<< HEAD
        //计算创建向量需要的点
        var countPointN = (touchImg) => {
          if (groupN !== null) {
            scene1.remove(groupN);
          }
          groupN = new THREE.Group();
          groupN.add(drawVector(crossPos, posN, touchNImg, singleObj.touchN, singleObj.textureN, '#258269'));
          singleObj.textureN.position.set(posN.x - 20, posN.y, posN.z);
          groupN.add(singleObj.textureN);
          vectorDeg(posE, posN, this.value);
          scene1.add(groupN);
        };
        var countPointE = (touchImg, hasDis = false) => {
          if (groupE !== null) {
            scene1.remove(groupE);
          }
          groupE = new THREE.Group();
          groupE.add(drawVector(crossPos, posE, touchEImg, singleObj.touchE, singleObj.textureE, '#BC0000', this.value, hasDis));
          singleObj.textureE.position.set(textE.x + 40, textE.y + 15, textE.z);
          groupE.add(singleObj.textureE);
          vectorDeg(posE, posN, this.value);
          scene1.add(groupE);
        };
        //画点击建线面角需要画的图形
        var drawTriangleStroke = () => {
          group1 = new THREE.Group();
          frameArr[1] = createDashLine([
            [0, 0, 0],
            [POS_X, 0, 0]
          ], 16, 2, '#1B8B72');
          frameArr[2] = createLine([
            [POS_X, 200, 0],
            [POS_X, -200, 0]
          ], 3, 2, '#0094FF');
          frameArr[3] = drawRightAngle();
=======
        let group = new THREE.Group();
        //画垂直的向量，然后进行旋转
        //计算两点之间的距离
        let len;
        if (hasDis) {
          len = hasDis;
        } else {
          len = Math.hypot(endPos.x, endPos.y);
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
        }
        if (endPos.y < 0 || endPos.x < 0) {
          len = -len;
        }
        let line = createLine([
          [0, 0, 0],
          [0, len, 0]
        ], 3, 2, color);
        let geo = new THREE.CylinderBufferGeometry(min, max, 10, 18);
        let mer = new THREE.MeshBasicMaterial({ color: color, transparent: true, depthTest: false });
        let mesh = new THREE.Mesh(geo, mer);
        mesh.position.set(0, len, 0);
        group.add(line, mesh);
        let y = (endPos.y < 0 || endPos.x < 0) ? -10 : +10
        touchImg.position.set(0, len + y, 0);
        touch.position.set(0, len + y, 0);
        group.add(touchImg, touch);
        if (angle !== undefined) {
          group.rotation.z = -common.radian(90 - angle);
        }
        return group;
      }
      //实验
      let shiyanArr = null;
      var shiyan = (pos, angle, color) => {
        if (shiyanArr !== null) {
          scene.remove(shiyanArr);
        }
        shiyanArr = new THREE.Group();
        let line = createLine([
          [0, 0, 0],
          [pos.x, pos.y, 0]
        ], 3, 2, color);
        shiyanArr.add(line);
        let min = 1;
        let max = 5;
        if (pos.y < 0 || pos.x < 0) {
          [min, max] = [max, min];
        }
        let geo = new THREE.CylinderBufferGeometry(min, max, 10, 18);
        let mer = new THREE.MeshBasicMaterial({ color: color, transparent: true, depthTest: false });
        let mesh = new THREE.Mesh(geo, mer);
        mesh.rotation.z = singleObj.touchE.rotation.z = common.radian(angle - 90);
        mesh.position.set(pos.x, pos.y, 0);
        shiyanArr.add(mesh);
        let len = Math.hypot(pos.x, pos.y) + 10;
        if (pos.y < 0 || pos.x < 0) {
          len = -len;
        }
        let x = len * cos(common.radian(angle));
        let y = len * sin(common.radian(angle));
        touchEImg.position.set(x, y, 0);
        touchEImg.rotation.z = common.radian(angle);
        shiyanArr.add(touchEImg);
        singleObj.touchE.position.set(x, y, 0);
        shiyanArr.add(singleObj.touchE);
        singleObj.textureE.position.set(textE.x + 40, textE.y + 20, textE.z);
        shiyanArr.add(singleObj.textureE);
        scene.add(shiyanArr);
        // countPointN(touchNImg);
      }
      var vectorDeg = (posE, posN, angle) => {
        if (singleObj.angleG != null) {
          scene.remove(singleObj.angleG);
        }
        if (angle == 90) {
          return;
        }
        if ((posE.y > 0 || posE.x > 0) && posN.y > 0) {
          singleObj.angleG = drawAngle(angle, 90, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 2;
        } else if ((posE.y < 0 || posE.x < 0) && posN.y > 0) {
          singleObj.angleG = drawAngle(90, 180 + angle, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 3;
        } else if ((posE.y < 0 || posE.x < 0) && posN.y < 0) {
          singleObj.angleG = drawAngle(180 + angle, 270, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 2;
        } else if ((posE.y > 0 || posE.x > 0) && posN.y < 0) {
          singleObj.angleG = drawAngle(-90, angle, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 3;
        }
        scene.add(singleObj.angleG);
        return singleObj.angleG;
      }
      //创建四边形
      var drawPlane = (pointArr, color) => {
        let [a, b, c, d] = pointArr;
        let shape = new THREE.Shape();
        shape.moveTo(a.x, a.y);
        shape.lineTo(b.x, b.y);
        shape.lineTo(c.x, c.y);
        shape.lineTo(d.x, d.y);
        shape.lineTo(a.x, a.y);
        let plane = new THREE.Mesh(new THREE.ShapeGeometry(shape, 1), new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.38,
          side: THREE.DoubleSide
        }));
        plane.material.depthTest = false;
        return plane;
      }
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
          controls.enableRotate = false;
          if (selectobj.name == 'N') {
            event.preventDefault();
            box.rotation.z = common.radian(90);
          } else if (selectobj.name == "E") {
            event.preventDefault();
            // box.rotation.x = camera.rotation.x;
            box.rotation.z = common.radian(this.value);
          }
        }
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
      };
      var onDocumentMouseMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs1);
        raycaster.setFromCamera(mouse, camera);
        // if (intersects.length > 0) {
        //   if (INTERSECTED != intersects[0].object) {
        //     INTERSECTED = intersects[0].object;
        //     plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), new THREE.Vector3(0,0,0));
        //   }
        // }
        if (mousedownflag && intersects[0]) {
          // if (raycaster.ray.intersectPlane(plane, intersection)) {
          // console.log(raycaster.ray.intersectPlane(plane, intersection));
          // console.log(intersection.sub(offset));
          var obj = intersection.sub(offset);
          var x, y, b, z;
          x = intersects[0].point.x;
          y = intersects[0].point.y;
          z = intersects[0].point.z;
          // console.log(x,y,z);
          if (selectobj.name === 'N') {
            y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
            posN.y = y;
            countPointN(touchNImg);
          } else if (selectobj.name === 'E') {
            //让E点在a直线上拖动
            // let ang = Math.abs(common.angle(camera.rotation.y));
            // if (this.value <= 45) {
            //   x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
            //   posE.x = x;
            //   posE.y = x * Math.tan(common.radian(this.value));
            // } else {
            //   y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
            //   posE.y = y;
            //   posE.x = y / Math.tan(common.radian(this.value));
            // }
            if (this.value == 90) {
              posE.y = y;
              posE.x = 0;
            } else if (this.value == 0) {
              posE.y = 0;
              posE.x = x;
            } else {
              let len = Math.hypot(x, y);
              len = len > 150 ? 150 : len;
              posE.x = len * Math.cos(common.radian(this.value));
              posE.y = len * Math.sin(common.radian(this.value));
              if (x < 0 || y < 0) {
                posE.x = -posE.x;
                posE.y = -posE.y;
              }
            }
            textE.x = posE.x;
            textE.y = posE.y;
            // shiyan(posE, this.value, '#BC0000');
            // vectorDeg(posE, posN, this.value);
            countPointE(touchEImg);
            // this.preAngle = this.value;
          }
        }
        // }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
        controls.enableRotate = true;
        renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
        window.removeEventListener('mouseup', onDocumentMouseUp, false);
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
            controls.enableRotate = false;
            if (selectobj.name == 'N') {
              box.rotation.z = common.radian(90);
            } else if (selectobj.name == "E") {
              // box.rotation.x = camera.rotation.x;
              box.rotation.z = common.radian(this.value);
            }
            renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
            renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
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
          var intersects = raycaster.intersectObjects(selectobjs1);
          raycaster.setFromCamera(mouse, camera);
<<<<<<< HEAD
          if (mousedownflag && intersects[0]) {
            var obj = intersection.sub(offset);
            var x, y, b, z;
            x = intersects[0].point.x;
            y = intersects[0].point.y;
            z = intersects[0].point.z;
            if (selectobj.name === 'N') {
              y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
              posN.y = y;
              countPointN(touchNImg);
            } else if (selectobj.name === 'E') {
              //让E点在a直线上拖动
              // let ang = Math.abs(common.angle(camera.rotation.y));
              // if (this.value <= 45) {
              //   x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
              //   posE.x = x;
              //   posE.y = x * Math.tan(common.radian(this.value));
              // } else {
              //   y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
              //   posE.y = y;
              //   posE.x = y / Math.tan(common.radian(this.value));
              // }
              if (this.value == 90) {
                posE.y = y;
                posE.x = 0;
              } else if (this.value == 0) {
                posE.y = 0;
                posE.x = x;
              } else {
                let len = Math.hypot(x, y);
                len = len > 150 ? 150 : len;
                posE.x = len * Math.cos(common.radian(this.value));
                posE.y = len * Math.sin(common.radian(this.value));
                if (x < 0 || y < 0) {
                  posE.x = -posE.x;
                  posE.y = -posE.y;
                }
              }
              textE.x = posE.x;
              textE.y = posE.y;
              // shiyan(posE, this.value, '#BC0000');
              // vectorDeg(posE, posN, this.value);
              countPointE(touchEImg);
              // this.preAngle = this.value;
            }
          }
          // }
        };
        var onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
          renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
          window.removeEventListener('mouseup', onDocumentMouseUp, false);
        };
        var onDocumentTouchStart = (event) => {
          event.preventDefault();
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          if (event.touches.length === 1) {
            var mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
              selectobj = intersects[0].object;
              mousedownflag = true;
              controls.enableRotate = false;
              if (selectobj.name == 'N') {
                box.rotation.z = common.radian(90);
              } else if (selectobj.name == "E") {
                // box.rotation.x = camera.rotation.x;
                box.rotation.z = common.radian(this.value);
              }
              renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
              renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
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
            var intersects = raycaster.intersectObjects(selectobjs1);
            raycaster.setFromCamera(mouse, camera);
            // if (intersects.length > 0) {
            //   if (INTERSECTED != intersects[0].object) {
            //     INTERSECTED = intersects[0].object;
            //     plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            //   }
            // }
          }
          if (mousedownflag && intersects[0]) {
            var x, y, b, z;
            x = intersects[0].point.x;
            y = intersects[0].point.y;
            z = intersects[0].point.z;
            if (selectobj.name === 'N') {
              y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
              posN.y = y;
              countPointN(touchNImg);
            } else if (selectobj.name === 'E') {
              //让E点在a直线上拖动
              // let ang = Math.abs(common.angle(camera.rotation.y));
              // if (this.value <= 45) {
              //   x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
              //   posE.x = x;
              //   posE.y = x * Math.tan(common.radian(this.value));
              // } else {
              //   y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
              //   posE.y = y;
              //   posE.x = y / Math.tan(common.radian(this.value));
              // }
              if (this.value == 90) {
                posE.y = y;
                posE.x = 0;
              } else if (this.value == 0) {
                posE.y = 0;
                posE.x = x;
              } else {
                let len = Math.hypot(x, y);
                len = len > 150 ? 150 : len;
                posE.x = len * Math.cos(common.radian(this.value));
                posE.y = len * Math.sin(common.radian(this.value));
                if (x < 0 || y < 0) {
                  posE.x = -posE.x;
                  posE.y = -posE.y;
                }
=======
          // if (intersects.length > 0) {
          //   if (INTERSECTED != intersects[0].object) {
          //     INTERSECTED = intersects[0].object;
          //     plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
          //   }
          // }
        }
        if (mousedownflag && intersects[0]) {
          // console.log(1);
          // if (raycaster.ray.intersectPlane(plane, intersection)) {
          // console.log(2);
          // var obj = intersection.sub(offset),
          var x, y, b, z;
          x = intersects[0].point.x;
          y = intersects[0].point.y;
          z = intersects[0].point.z;
          // console.log(x,y,z);
          if (selectobj.name === 'N') {
            y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
            posN.y = y;
            countPointN(touchNImg);
          } else if (selectobj.name === 'E') {
            //让E点在a直线上拖动
            // let ang = Math.abs(common.angle(camera.rotation.y));
            // if (this.value <= 45) {
            //   x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
            //   posE.x = x;
            //   posE.y = x * Math.tan(common.radian(this.value));
            // } else {
            //   y = y > 0 ? y > 150 ? 150 : y : y < -150 ? -150 : y;
            //   posE.y = y;
            //   posE.x = y / Math.tan(common.radian(this.value));
            // }
            if (this.value == 90) {
              posE.y = y;
              posE.x = 0;
            } else if (this.value == 0) {
              posE.y = 0;
              posE.x = x;
            } else {
              let len = Math.hypot(x, y);
              len = len > 150 ? 150 : len;
              posE.x = len * Math.cos(common.radian(this.value));
              posE.y = len * Math.sin(common.radian(this.value));
              if (x < 0 || y < 0) {
                posE.x = -posE.x;
                posE.y = -posE.y;
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
              }
            }
            textE.x = posE.x;
            textE.y = posE.y;
            // shiyan(posE, this.value, '#BC0000');
            // vectorDeg(posE, posN, this.value);
            countPointE(touchEImg);
            // this.preAngle = this.value;
          }
<<<<<<< HEAD
        };
        var onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
        };
        var skip = 0;
        var animate = () => {
          requestAnimationFrame(animate);
          if(skip ==0){
            skip++;
          }else {
            skip++;
            if (skip % 4 != 0) {
              return;
            }
=======
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
        controls.enableRotate = true;
        renderer.domElement.removeEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.removeEventListener('touchend', onDocumentTouchEnd, false);
      };
      var skip = 0;
      var animate = () => {
        requestAnimationFrame(animate);
        if (skip == 0) {
          skip++;
        } else {
          skip++;
          if (skip % 4 != 0) {
            return;
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
          }
        }
        renderer.clear();
        controls.update();
        //面和实线场景
        renderer.render(scene, camera);
        renderer.render(scene1, camera);
        if (this.checked1) {
          let angleY = common.angle(camera.rotation.y);
          let angleX = common.angle(camera.rotation.x);
          if ((angleX < 45 && angleX > -45 || Math.abs(angleX) > 135) && (angleY < 45 && angleY > -45)) {
            box.scale.set(1, 1, 0.01);
          } else {
            box.scale.set(1, 0.01, 1);
          }
          singleObj.textureE.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          singleObj.textureN.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        }
      };
      animate();
      createObj();
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      var resetWidget = () => {
        camera.position.x = 0;
        camera.position.y = 200;
        camera.position.z = 800;
        this.checked = this.checked1 = false;
        this.value = 45;
        posN = {
          x: 0,
          y: 100,
          z: 0
        };
<<<<<<< HEAD
        animate();
        createObj();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        var resetWidget = () => {
          camera.position.x = 0;
          camera.position.y = 200;
          camera.position.z = 1200;
          this.checked = this.checked1 = false;
          this.value = 45;
          posN = {
            x: 0,
            y: 100,
            z: 0
          };
          posE = {
            x: 0,
            y: 100,
            z: 0
          };
          this.oldIndex = 0;
          sliderEvent(45);
=======
        posE = {
          x: 0,
          y: 100,
          z: 0
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
        };
        this.oldIndex = 0;
        sliderEvent(45);
      };
      var TO = function() {
        return {
          reset: resetWidget,
          sliderEvent,
          buttonEvent1,
          buttonEvent2,
          rotateVectorE
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
<<<<<<< HEAD
  * {
    margin: 0;
    padding: 0;
    touch-action: none;
  }
=======
* {
  margin: 0;
  padding: 0;
}
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9

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

<<<<<<< HEAD
  body{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
=======
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9

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

<<<<<<< HEAD
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
=======
.UI-camera {
  width: 80px;
  height: 80px;
  cursor: this . pointer;
}
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9

/*内容区*/

<<<<<<< HEAD
  .container {
    width: 100%;
    float: left;
    height: 100%;
    position: relative;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    z-index: 20;
    font-weight: normal;
    position: absolute;
  }
=======
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
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
}

<<<<<<< HEAD
  #renderCanvas {
    width: 100%;
    /* height: calc(100% - 72px); */
    height:100%;
    outline: none;
    position: relative;
    overflow: hidden;
  }
=======
#renderCanvas {
  width: 100%;
  height: calc(100% - 72px);
  outline: none;
  position: relative;
  overflow: hidden;
}
>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9

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
  margin-top: 10px;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}

.ctrl {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 240px;
  height: 224px;
}

.prove-wrap {
  position: fixed;
  left: 24px;
  top: 90px;
  z-index: 10;
  font-size: 26px;
  color: #3494E9;
  font-family: 'CambriaMath';
}

.prove-wrap div:first-child {
  margin-bottom: 30px;
}

.prove-wrap div:first-child img {
  width: 313px;
  height: auto;
}

.prove-wrap div:last-child img {
  width: 190px;
  height: auto;
}

@media (max-width: 800px) {
  .ctrl {
    right: -54px;
    bottom: -54px;
    transform: scale(0.5, 0.5);
  }

  .prove-wrap div:first-child img {
    position: relative;
    margin-bottom: 0px;
    left: -70px;
    transform: scale(0.5, 0.5);
  }

  .prove-wrap div:last-child img {
    position: relative;
    left: -40px;
    transform: scale(0.5, 0.5);
  }
}
<<<<<<< HEAD
.prove-wrap{
  width: 100px!important;
}
.prove-wrap div:last-child img {
  position: relative;
  left:-40px;
  transform: scale(0.5, 0.5);
}
}
=======

>>>>>>> 56594f372c45aeb498209d275f98049ecef2f9a9
</style>
