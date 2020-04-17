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
      <ui-slider :box='true' boxWidth='240' title='异面直线所成的角<h5>θ</h5>'
       :label="['0°','90°']" :min="1" :max="90" formatter="{value}°" v-model='value' :zoom = "zoomF"></ui-slider>
      <ui-btn type="switch" v-model="checked">建线线角</ui-btn>
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

const {
  sin,
  cos,
  PI,
  tan
} = Math;
const DOWN_DIS = 200; //平面α下移的距离
const UNITS = 100; //
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
      title: '向量法求异面直线所成的角',
      BtnSpaceStyle: 'flex',
      checked: false,
      checked1: false,
      TO: null,
      value: 45,
      radio: '',
      showChecked1: false,
      proveText: 1,
      oldIndex: 0,
      zoomF: 0
    }
  },
  created() {
    document.title = this.title;
    this.preAngle = this.value;
  },
  mounted() {
    this.isMob = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
     if (this.isMob && window.innerWidth < 1200) {
       this.zoomF = 0.5
     } else {
       this.zoomF = 1
     }
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
    value(v) {
      // this.oldIndex++;
      // if (this.oldIndex % 2 != 0) {
      //   return;
      // }
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
    checked1(v) {
      this.TO.buttonEvent2(v);
    }
  },
  methods: {
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
        isMob = null,
        selectobjs = [],
        selectobjs1 = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        mouse = new THREE.Vector2(),
        INTERSECTED = null,
        mousedownflag = false;
      let pointArrA = [{
        x: -200,
        y: -200
      }, {
        x: -200,
        y: 200
      }, {
        x: 200,
        y: 200
      }, {
        x: 200,
        y: -200
      }];
      let pointArrB = [{
        x: -200,
        y: -200
      }, {
        x: -200,
        y: 200
      }, {
        x: 200,
        y: 200
      }, {
        x: 200,
        y: -200
      }];
      let group = null;
      let group1 = null;
      let group2 = null;
      let planeB = null;
      let crossPos = {
        x: 0,
        y: -200,
        z: 0
      };
      //表示a'直线上的向量
      let posN = {
        x: 100,
        y: -UNITS,
        z: 0
      };
      let posE = {
        x: 100,
        y: -UNITS,
        z: 0
      };
      let groupN = null;
      let touchNImg = null;
      let groupE = null;
      let touchEImg = null;
      let groupDeg = null;
      let singleObj = {};
      let commonObj = {};
      let timer = null;
      let textE = {
        y: -UNITS,
      };
      isMob = /iPad|Android/g.test(navigator.userAgent);
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
      camera.position.y = 300;
      camera.position.z = 1100;
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
      var createLine = (arr, style, linewidth, color = '#000') => {
        let lineParameters = new three3DExtras.tubeLine(arr[0], arr[1], linewidth, color);
        let line = lineParameters.getObject3D();
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
      let box = null;
      var createObj = () => {
        //创建α面
        let planeA = drawPlane(pointArrA, '#E1631B');
        planeA.rotation.x = -PI / 2;
        planeA.position.y = UNITS * 2;
        scene.add(planeA);
        let textA = common.createText('α', -180, UNITS * 2 + 20, 180, '#000', 40);
        scene.add(textA);
        //创建β面
        singleObj.stepOneObj = new THREE.Group();
        let planeB = drawPlane(pointArrB, '#4A90E2');
        planeB.rotation.x = -PI / 2;
        planeB.position.y = -UNITS;
        //创建不动的线段A
        let lineA = createLine([
          [-200, UNITS * 2, 0],
          [200, UNITS * 2, 0]
        ], 3, 2, '#9013FE');
        let textB = common.createText('β', -180, -UNITS + 20, 180, '#000', 40);
        let textAA = common.createText('a', 0, UNITS * 2, 5, '#000', 40);
        singleObj.stepOneObj.add(planeB, textB, textAA);
        scene.add(singleObj.stepOneObj, lineA);
        sliderEvent(45);
        //创建拖动的点N
        touchNImg = common.createImg([common.vec3(0, 0, 2)], 68, 27, "static/UI/A@2x.png");
        touchNImg.material.depthTest = false;
        touchNImg.material.depthWrite = false;
        //创建拖动点E
        touchEImg = common.createImg([common.vec3(0, 0, 2)], 68, 27, "static/UI/A@2x.png");
        touchEImg.rotation.x = -PI / 4;
        touchEImg.material.depthTest = false;
        touchEImg.material.depthWrite = false;
        singleObj.touchN = createBox(80, 10, 40);
        singleObj.touchN.name = 'N';
        singleObj.touchE = createBox(80, 10, 40);
        singleObj.touchE.name = 'E';
        //创建贴图
        singleObj.textureE = common.createImg([common.vec3(0, 0, 2)], 19, 21, "static/UI/e2@2x.png");
        singleObj.textureN = common.createImg([common.vec3(0, 0, 2)], 19, 21, "static/UI/e1@2x.png");
        box = createBox(500, 500, 500);
        box.position.y = -UNITS;
        selectobjs1.push(box);
        // scene.add(box);
        // scene1.add(box);
      };
      var createBox = (w, h, d, opacity = 0) => {
        var geometry = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: opacity,
          depthTest: false,
          depthWrite: false
        });
        var cube = new THREE.Mesh(geometry, material);
        return cube;
      }
      //滑条事件
      var sliderEvent = (angle) => {
        rotateLineB(angle);
        if (this.checked) {
          drawAngle0(angle);
        }
      }
      var rotateLineB = (angle) => {
        if (group !== null) {
          scene.remove(group);
        }
        group = new THREE.Group();
        let line = createLine([
          [-200, -UNITS, 0],
          [200, -UNITS, 0]
        ], 3, 2, '#9013FE');;
        let text = common.createText('b', -180, -UNITS + 20, 0, '#000', 40);
        group.add(line, text);
        group.rotation.y = common.radian(angle)
        scene.add(group);
      }
      //单选按钮事件
      var buttonEvent1 = (v) => {
        if (v) {
          dropDown(this.value);
        } else {
          cancelAnimationFrame(timer);
          scene.remove(commonObj.groupA1, commonObj.angle0);
        }
      }
      var buttonEvent2 = (v) => {
        if (v) {
          selectobjs.push(singleObj.touchN, singleObj.touchE);
          countPointN(touchNImg);
          rotateVectorE(this.value);
          scene.add(box);
        } else {
          selectobjs = [];
          scene.remove(singleObj.angleG, box);
          scene1.remove(groupE, groupN);
        }
      }
      //a'下降动画
      var dropDown = (angle) => {
        commonObj.groupA1 = new THREE.Group();
        let line = createLine([
          [-200, UNITS * 2, 0],
          [200, UNITS * 2, 0]
        ], 3, 2, '#9013FE');
        let dis = 0;
        let text = common.createText('a\'', 180, UNITS * 2 + 20, 5, '#000', 40);
        commonObj.groupA1.add(line, text);
        scene.add(commonObj.groupA1);
        let that = this;

        function animate() {
          commonObj.groupA1.position.y = dis;
          if (dis <= -UNITS * 3) {
            that.showChecked1 = true;
            cancelAnimationFrame(timer);
            drawAngle0(that.value);
            return;
          }
          dis -= 4;
          timer = requestAnimationFrame(animate);
        }

        animate();
      }
      //画θ角
      var drawAngle0 = (angle) => {
        if (commonObj.angle0 != null) {
          scene.remove(commonObj.angle0);
        }
        commonObj.angle0 = drawAngle(0, angle, 20, '#258269', '#5EAA97', 'θ', 1);
        scene.add(commonObj.angle0);
      }
      //旋转向量E的角度
      var rotateVectorE = (angle) => {
        let len = Math.hypot(posE.x, posE.z);
        textE.x = len * cos(common.radian(angle));
        textE.z = len * sin(common.radian(angle));
        if (posE.x < 0) {
          textE.x = -textE.x;
          textE.z = -textE.z;
        }
        countPointE(touchEImg, len);
      }
      //计算创建向量需要的点
      var countPointN = (touchImg) => {
        if (groupN !== null) {
          scene1.remove(groupN);
        }
        groupN = new THREE.Group();
        groupN.add(drawVector(crossPos, posN, touchImg, singleObj.touchN, singleObj.textureN, '#258269'));
        let x = posN.x > 0 ? 20 : -20;
        singleObj.textureN.position.set(posN.x + x, posN.y + 20, posN.z - 10);
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
        singleObj.textureE.position.set(textE.x + 20, textE.y + 20, -textE.z);
        groupE.add(singleObj.textureE);
        vectorDeg(posE, posN, this.value);
        scene1.add(groupE);
      };
      //画夹角
      var drawAngle = (startangle, endangle, size, color, circleColor, font, index) => {
        let dx, dy, vertices = [];
        let obj = new THREE.Object3D();
        for (var i = startangle; i < endangle; i = i + 5) {
          dx = size * Math.cos(Math.PI / 180 * i);
          dy = size * Math.sin(Math.PI / 180 * i);
          vertices.push(common.vec3(dx, index, -dy));
        }
        let line = common.createLineMesh(vertices, color, 3, 1);
        let endradian = common.radian(endangle);
        let startradian = common.radian(startangle);
        let circle = common.createCircle([0, index, 0], size, circleColor, startradian, endradian - startradian, 0.4);
        circle.rotation.x = -PI / 2;
        let angle = 0;
        if (startangle === 0) {
          angle = endangle / 2;
        } else {
          angle = (endangle - startangle) / 2 + startangle;
        }
        if (font !== '') {
          let text = common.createText(font, (size + 15) * cos(common.radian(angle)) - 5, 20, -(size + 15) * sin(common.radian(angle)) + 5, '#BD00D4', 40);
          obj.add(text);
        }
        obj.add(line, circle);
        obj.position.y = -UNITS;
        return obj;
      };
      //画向量
      var drawVector = (startPos, endPos, touchImg, touch, textureImg, color, angle, hasDis = false) => {
        let min = 1;
        let max = 5;
        if (endPos.x < 0 || endPos.z < 0) {
          [min, max] = [max, min];
        }
        let group = new THREE.Group();
        //画垂直的向量，然后进行旋转
        //计算两点之间的距离
        let len;
        if (hasDis) {
          len = hasDis;
        } else {
          len = Math.hypot(endPos.x, endPos.z);
        }
        if (endPos.x < 0 || endPos.z < 0) {
          len = -len;
        }
        let line = createLine([
          [0, -UNITS, 0],
          [len, -UNITS, 0]
        ], 3, 3, color);
        let geo = new THREE.CylinderBufferGeometry(min, max, 10, 18);
        let mer = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          depthTest: false
        });
        let mesh = new THREE.Mesh(geo, mer);
        mesh.material.depthTest = false;
        mesh.rotation.z = -PI / 2;
        mesh.position.set(len, -UNITS, 0);
        group.add(line, mesh);
        let x = (endPos.x < 0 || endPos.z < 0) ? -10 : +10;
        touchImg.position.set(len + x, -UNITS, 1);
        touch.position.set(len + x, -UNITS, 0);
        group.add(touchImg, touch);
        if (angle !== undefined) {
          // console.log(angle);
          group.rotation.y = common.radian(angle);
        }
        return group;
      }
      //画向量的夹角
      var vectorDeg = (posE, posN, angle) => {
        if (singleObj.angleG != null) {
          scene.remove(singleObj.angleG);
        }
        if (posE.x > 0 && posN.x > 0 || posE.z > 0 && posN.x > 0) {
          singleObj.angleG = drawAngle(0, angle, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 1;
        } else if (posE.x < 0 && posN.x > 0 || posE.z < 0 && posN.x > 0) {
          singleObj.angleG = drawAngle(-180 + angle, 0, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 3;
        } else if (posE.x < 0 && posN.x < 0 || posE.z < 0 && posN.x < 0) {
          singleObj.angleG = drawAngle(180, 180 + angle, 30, '#258269', '#5EAA97', '', 2);
          this.proveText = 1;
        } else if (posE.x > 0 && posN.x < 0 || posE.z > 0 && posN.x < 0) {
          singleObj.angleG = drawAngle(angle, 180, 30, '#258269', '#5EAA97', '', 2);
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
        return plane;
      }
      let deg = 0;
      let pointO = null;
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
          controls.enableRotate = false;
          selectobj = intersects[0].object;
          pointO = intersects[0].point;
          mousedownflag = true;
          controls.enableRotate = false;
          if (selectobj.name == 'N') {
            event.preventDefault();
            box.rotation.y = common.radian(0);
            deg = 0;
          } else if (selectobj.name == "E") {
            event.preventDefault();
            box.rotation.y = common.radian(this.value);
            deg = this.value;
          }
          renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
          window.addEventListener('mouseup', onDocumentMouseUp, false);
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
        var intersects = raycaster.intersectObjects(selectobjs1);
        raycaster.setFromCamera(mouse, camera);
        if (mousedownflag && intersects[0]) {
          changeX(intersects[0].point);
        }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        mousedownflag = false;
        pointO = null;
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
            pointO = intersects[0].point;
            mousedownflag = true;
            controls.enableRotate = false;
            if (selectobj.name == 'N') {
              box.rotation.y = common.radian(0);
            } else if (selectobj.name == "E") {
              box.rotation.y = common.radian(this.value);
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
        }
        if (mousedownflag && intersects[0]) {
          changeX(intersects[0].point);
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        mousedownflag = false;
        pointO = null;
        selectobj = null;
        controls.enableRotate = true;
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
      }
      var changeX = (point) => {
        var x, z;
        x = point.x;
        z = -point.z;
        if (selectobj.name === 'N') {
          x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
          posN.x = x;
          countPointN(touchNImg);
        } else if (selectobj.name === 'E') {
          if (this.value == 90) {
            z = z > 0 ? z > 150 ? 150 : z : z < -150 ? -150 : z;
            posE.z = z;
            posE.x = 0;
          } else {
            if (this.value <= 45) {
              x = x > 0 ? x > 150 ? 150 : x : x < -150 ? -150 : x;
              posE.x = x;
              posE.z = x * Math.tan(common.radian(this.value));
            } else {
              z = z > 0 ? z > 150 ? 150 : z : z < -150 ? -150 : z;
              posE.z = z;
              posE.x = z / Math.tan(common.radian(this.value));
            }
          }
          textE.x = posE.x;
          textE.z = posE.z;
          countPointE(touchEImg);
        }
        pointO = point;
      }
      let count = 0;
      var animate = () => {
        requestAnimationFrame(animate);

        if (count % 3 != 0) {
          count++;
          return;
        }
        count++;
        renderer.clear();
        controls.update();
        renderer.render(scene, camera);
        renderer.render(scene1, camera);
        if (this.checked1) {
          let angleY = common.angle(camera.rotation.y);
          let angleX = common.angle(camera.rotation.x);
          if ((angleX < 45 && angleX > -45 || Math.abs(angleX) > 100) && (angleY < 65 && angleY > -65)) {
            box.scale.set(1, 1, 0.001);
          } else {
            box.scale.set(1, 0.001, 1);
          }
          singleObj.textureE.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          singleObj.textureN.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          // touchNImg.rotation.x = camera.rotation.x;
          // touchEImg.rotation.x = camera.rotation.x;
        }
      };
      animate();
      createObj();
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      let resizeTimer = null;
       window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            mainWidth = $('#renderCanvas').width();
            mainHeight = $('#renderCanvas').height();
            $('canvas').css({
              'left': ($('#renderCanvas').width() - mainWidth) / 2 + 'px',
              'top': ($('#renderCanvas').height() - mainHeight) / 2 + 'px'
            });
            camera.aspect = mainWidth / mainHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mainWidth, mainHeight);
                    // composer.setSize(mainWidth, mainHeight);
          }, 200)
        });

      var resetWidget = () => {
        camera.position.x = 0;
        camera.position.y = 300;
        camera.position.z = 1100;
        this.checked = this.checked1 = false;
        this.value = 45;
        posN = {
          x: 100,
          y: -UNITS,
          z: 0
        };
        posE = {
          x: 100,
          y: -UNITS,
          z: 0
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
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

canvas {
  position: absolute;
  left: 0;
  top:0;
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
  cursor: this . pointer;
}


/*内容区*/

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

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
}

#renderCanvas {
  width: 100%;
  height: 100%;
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
  margin-top: 24px;
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
  height: 252px;
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

.prove-wrap div:first-child img {
  width: 280px;
  height: auto;
  margin-bottom: 15px;
}

.prove-wrap div:last-child img {
  width: 160px;
  height: auto;
}


/*添加0度的空心圆*/

.uiSlider .ui-piecewise:after {
  content: '';
  position: absolute;
  left: 0;
  top: -2px;
  width: 10px;
  height: 10px;
  border: 1px solid #5CAEFD;
  background: #fff;
  border-radius: 50%;
  z-index: 2;
}

@media (max-width: 800px) {
    .ctrl{
      right: -24px;
      bottom: -24px;
      transform: scale(0.5, 0.5);
    }
    .prove-wrap div:first-child img {
      position: relative;
      margin-bottom: 0px;
      left:-70px;
      transform: scale(0.5, 0.5);
}

.prove-wrap div:last-child img {
  position: relative;
  left:-40px;
  transform: scale(0.5,0.5);
}
}
</style>
