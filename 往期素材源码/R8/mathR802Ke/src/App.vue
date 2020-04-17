<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="ViewSpace">
      <div :style="'zoom:'+zoomF" class="viewBox">
        <div class="leftWrap"><img :src="img1" ondragstart="return false;"></div>
        <div class="rightWrap" id="renderCanvas">
          <div class="showImg" @click='showCanvas' v-show='isShow'>
            <img :src="img2" ondragstart="return false;">
          </div>
        </div>
        <div class="bottomWrap">
          <ui-slider :value=value :zoom="zoomF" :boxWidth="580" :dragable="dragToggle" @callback='choose' :clickable="false" :boxHeight="53" :title="false"  :piecewise="true" :piecewiseLabel="false" :tooltip="false" :noBlueProcess="true" :data="['0','1','2','3','4']" v-model="value" v-if='slideShow'>
          </ui-slider>
        </div>
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
  components: { uiHead, uiBtn, uiSlider },
  data() {
    return {
      title: '正四面体外接球半径方程法',
      BtnSpaceStyle: 'flex',
      TO: null,
      dragToggle:true,
      img1: 'static/img/sub-1.png',
      img2: 'static/img/start.png',
      isShow: true,
      zoomF: window.innerWidth / (window.innerHeight - 76) >= 1024 / 545 ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
      value: "0",
      slideShow: false,
      next:true
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    document.onselectstart = function() {
      return false;
    };
    this.getViewSize();
    this.resize();
    this.TO = this.init();
    this.TO.createObj();
  },
  watch: {
    value(val,old){
      let cha = val - old;
      if(cha > 0){
        this.next = true;
      }else {
        this.next = false;
      }

      if (val == 0) {
        this.TO.createObj();
      }
      else if (val == 1) {
        this.TO.createObj1();
      }
      else if (val == 2) {
        this.TO.createObj2();
      }
      else if (val == 3) {
        if(!this.next){
            this.TO.hideObj4();
        }else{
            this.TO.createObj3();
        }
      }
      else{
        this.TO.createObj4();
      }
    }
  },

  methods: {
    //图片预加载
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback(img.src);
      }
    },
     choose(val){
       if (val == 0) {
        this.imgL("static/img/sub-2.png", (src) => {
          this.img1 = src;
        });
      }
      else if (val == 1) {
        this.imgL("static/img/sub-3.png", (src) => {
          this.img1 = src;
        });
      }
      else if (val == 2) {
        this.imgL("static/img/sub-4.png", (src) => {
          this.img1 = src;
        });
      }
      else if (val == 3) {
        this.imgL("static/img/sub-5.png", (src) => {
          this.img1 = src;
        });
      }
      else{
        this.imgL("static/img/sub-6.png", (src) => {
          this.img1 = src;
        });
      }
     },
    //重置函数
    reset() {
      this.TO.reset();
    },
    //显示canvas
    showCanvas() {
      this.TO.showCanvas();
    },

    //初始化
    init() {
      let face={
          1: [-200, -200, 200],
          2: [200, -200, -200],
          3: [-200, 200, -200],
          4: [200, 200, 200]
      };
      let line ={
          1: [-201, -201, 201], //C点
          2: [201, -201, -201], //B点
          3: [-201, 201, -201], //A点
          4: [201, 201, 201], //D点
          5: [0, 0, 201], //E点
          6: [201, 0, 0], //N点
          7: [67, -67, 67], //O1点
          8: [0, 0, 0] //O点
      };
      let txt ={
          1: [-220, -220, 220], //C点
          2: [220, -220, -220], //B点
          3: [-220, 220, -220], //A点
          4: [220, 220, 220], //D点
          5: [-10, 50, 220], //E点
          6: [220, -10, 50], //N点
          7: [80, -70, 75], //O1点
          8: [30, 50, 0]
      };
      let scene, camera, renderer, mainWidth, mainHeight, controls;
      let obj = new THREE.Group();
      let obj1 = new THREE.Group();
      let obj2 = new THREE.Group();
      let obj3 = new THREE.Group();
      let obj4 = new THREE.Group();
      let timer = null,SET=null,text2a = null,lineBC,lineAB,lineCN;
      //创建场景
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(mainWidth / -1, mainWidth / 1, mainHeight / 1, mainHeight / -1, -100, 10000);
      camera.position.set(-778, -704, -579);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);
      //灯光
      var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
      dirLight1.position.set(200, 200, 100);
      var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
      dirLight2.position.set(-200, -200, -100);
      scene.add(dirLight1, dirLight2);
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 0, 0);
      scene.add(hemiLight);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = false;
      renderer.setClearColor(0xffffff);
      renderer.setSize(mainWidth, mainHeight);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      $("#renderCanvas").append(renderer.domElement);
      $('canvas').hide();
      //坐标位置函数
      let vec3 = (x, y, z) => {
        return new THREE.Vector3(x, y, z);
      };
      //线条函数
      let createLineMesh = (vertices, color, style, width) => {
        let lineMesh = null,
        geometryLine = new THREE.Geometry();
        if (!color) {
          color = '#000';
        }
        if (!width) {
          width = 1;
        }
        if (style == 2) { //虚线
          geometryLine.vertices = vertices;
          geometryLine.computeLineDistances();
          lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            dashSize: 15,
            gapSize: 15,
            depthTest: false,
            linewidth: width,
          }));
        } else if (style == 3) { //三维内实线
          geometryLine.vertices = vertices;
          lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
            color: color,
            linewidth: width,
            transparent: true,
            depthTest: false
          }));
        }
        return lineMesh;
      };

      //画球
      let createBall = (radius, slip, color, opacity) => {
        if (!color) {
          color = '#000';
        }
        if (!opacity) {
          opacity = 1;
        }
        var geometry = new THREE.SphereGeometry(radius, slip, slip);
        var material = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: opacity,
          depthTest: false
        });
        var sphere = new THREE.Mesh(geometry, material);
        return sphere;
      }

      //文字
      let createText = (vertices, font, size, color) => {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {
          align: textAlign.center,
          font: size + 'px "Cambria Math"',
          fillStyle: color,
          antialias: true,
        };
        var text = new SpriteText2D(font, textStyle);
        text.position.x = vertices[0].x;
        text.position.y = vertices[0].y;
        text.position.z = vertices[0].z;
        text.material.depthTest = false;
        return text;
      };
      let createImg = (x, y, z, w, h, src) => {
        var PlaneG = new THREE.PlaneGeometry(w, h);
        var PlaneM = new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(src),
          transparent: true,
          overdraw: 0.2,
          depthTest: false
        });
        var Plane = new THREE.Mesh(PlaneG, PlaneM);
        Plane.position.x = x;
        Plane.position.y = y;
        Plane.position.z = z;
        return Plane;
      };

      //mian
      let createTriangleFace = (vertices, color) => {
        var material = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: 0.1
        });
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
      };

      //构造三维内实线
      let line_ns = (n1, n2, color) => {
        let lineO;
        let vertices = [];
        vertices.push(vec3(line[n1][0], line[n1][1], line[n1][2]));
        vertices.push(vec3(line[n2][0], line[n2][1], line[n2][2]));
        lineO = createLineMesh(vertices, color, 3);
        return lineO;
      };
      //构造面
      let createMesh = (n1, n2, n3, o) => {
        let vertices = [];
        vertices.push(vec3(face[n1][0], face[n1][1], face[n1][2]));
        vertices.push(vec3(face[n2][0], face[n2][1], face[n2][2]));
        vertices.push(vec3(face[n3][0], face[n3][1], face[n3][2]));
        let mesh = createTriangleFace(vertices, '#E8FBFF');
        o.add(mesh);
      };
      //构造文字
      let createTextPoint = (n, font, o) => {
        let vertices = [];
        vertices.push(vec3(txt[n][0], txt[n][1], txt[n][2]));
        let text = createText(vertices, font, 32, '#000');
        o.add(text);
      };

      //初始正四面体
      let createObj = () => {
        if(obj !=null){
          scene.remove(obj);
        }
        obj = new THREE.Group();
        //构建面
        createMesh(1,2,3,obj);
        createMesh(2,3,4,obj);
        createMesh(1,2,4,obj);
        createMesh(1,3,4,obj);
        //构建线
        lineBC = line_ns(1, 2);
        let lineAC = line_ns(1, 3);
        let lineCD = line_ns(1, 4);
        lineAB = line_ns(2, 3);
        let lineBD = line_ns(2, 4);
        let lineAD = line_ns(3, 4);
        //构建文字
        createTextPoint(3, 'A', obj);
        createTextPoint(2, 'B', obj);
        createTextPoint(1, 'C', obj);
        createTextPoint(4, 'D', obj);
        obj.add(lineBC, lineAC, lineCD, lineAB, lineBD, lineAD);
        scene.add(obj);
        obj1.visible=false;
        obj2.visible=false;
        obj3.visible=false;
        obj4.visible=false;
        obj4.visible=false;
      };
      let createObj1 = () => {
        if(obj1 != null){
            scene.remove(obj1);
        }
        obj1 = new THREE.Group();

        //构建文字
        createTextPoint(5, 'E', obj1);
        createTextPoint(7, 'O₁', obj1);

        //构建线
        let lineBE = line_ns(2, 5, '#0094FF');
        lineCN = line_ns(1, 6, "#0094FF");
        lineBC.material.color.set('#000');

        //构建O₁圆点
        let pointO1  = createBall(5, 9);
        pointO1.position.set(67, -67, 67);

        //构建BEC垂足
        let vertices = [];
        let pealG1 = new THREE.Group();
        let peal11 = new THREE.Group();
        vertices.push(vec3(0, -20, 0),vec3(-20, -20, 0),vec3(-20, 0, 0));
        let pealBEC = createLineMesh(vertices, '#000', 3);
        pealBEC.rotation.set(Math.PI / 4, Math.PI / 5, Math.PI / 6);
        peal11.add(pealBEC);
        peal11.position.set(0, 0, 200);
        pealG1.add(peal11);
        obj1.add(lineBE,lineCN,pointO1,pealG1);
        scene.add(obj1);
        obj2.visible=false;
        obj3.visible=false;
        obj4.visible=false;
      };
      let createObj2 = () => {
        if(obj2 != null) {
          scene.remove(obj2);
        }
        obj2 = new THREE.Group();
        //构建线条
        lineBC.material.color.set('#0094FF');
        let lineCE = line_ns(1, 5, '#0094FF');
        let lineAO1 = line_ns(3, 7, '#E30000');
        lineCN.visible=false;
        obj2.add(lineCE,lineAO1);
        scene.add(obj2);
        obj3.visible=false;
        obj4.visible=false;
      };
      let createObj3 = () => {
          if(obj3 != null) {
              scene.remove(obj3);
          }
          obj3 = new THREE.Group();
          this.dragToggle  = false;
          //构建球心
          let pointO = createBall(5, 9);
          pointO.position.set(0, 0, 0);
          createTextPoint(8, "O", obj3);

          //外接球动画
          let n =0;
          let objBall  = createBall(Math.hypot(348), 64, '#fff', 0.5);
          clearTimeout(SET);
          SET = setTimeout(()=>{
            let an =() =>{
                if(n >= 1) {
                    cancelAnimationFrame(timer);
                    this.dragToggle  = true;
                    return;
                }
                n+=0.04;
                objBall.scale.x = n;
                objBall.scale.y = n;
                objBall.scale.z = n;
                timer = requestAnimationFrame(an);
                obj3.add(objBall);
            };
            an();
          },150);

          obj3.add(pointO);
          scene.add(obj3);
    };
      let hideObj4 = () =>{
          obj4.visible=false;
      };
      let createObj4 = () => {
            if(obj4 != null){
                scene.remove(obj4);
            }
            obj4 = new THREE.Group();
            let vertices = [];
            //构建线条
            lineAB.material.color.set('#E30000');
            let lineBO1 = line_ns(2, 7, '#E30000');
            let lineBO = line_ns(2, 8, '#7000D3');

            //构建文字
            vertices.push(vec3(80.5, -40.5, -100.5));
            let textR = createText(vertices, 'R', 35, '#7000D3');
            vertices = [];
            vertices.push(vec3(50, 10, -201));
            let texta = createText(vertices, 'a', 35, '#E30000');
            text2a = createImg(-50.5, -80.5, 185, 35, 70, 'static/img/Slice1.png');
            //构建垂足
            let pealG2 = new THREE.Group();
            let peal12 = new THREE.Group();
            vertices = [];
            vertices.push(vec3(0, 20, 0),vec3(20, 20, 0),vec3(20, 0, 0));
            let pealAFB = createLineMesh(vertices, '#000', 3);
            pealAFB.rotation.set(-Math.PI / 2, Math.PI / 4, Math.PI / 5 + Math.PI / 10);
            peal12.add(pealAFB);
            peal12.position.set(67, -67, 67);
            pealG2.add(peal12);
            obj4.add(lineBO1,lineBO,textR,texta,text2a,pealG2);
            scene.add(obj4);

      };

      //右侧图片点击隐藏-canvas显示
      let showCanvas = () => {
        $('.showImg').hide();
        $('canvas').show();
        this.slideShow = true;
          this.imgL("static/img/sub-2.png", () => {
            this.img1 = 'static/img/sub-2.png';
          });
      };

      //重置
      let resetWidget = () => {
        cancelAnimationFrame(timer);
        clearTimeout(SET);
        $('.showImg').show();
        $('canvas').hide();
        this.value = "0";
        this.slideShow = false;
        this.imgL("static/img/sub-1.png", (src) => {
          this.img1 = src;
        });
        this.dragToggle=true;
        createObj();
        camera.position.set(-778, -704, -579);
        camera.zoom = 1;
        camera.updateProjectionMatrix();
      };

      //渲染场景
      let renderAll = () => {
        controls.update();
        renderer.clear();
        renderer.render(scene, camera);
        requestAnimationFrame(renderAll);
        if (text2a != null) {
          text2a.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        }
      }
      renderAll();
      //回调函数
      let TO = function() {
        return {
          reset: resetWidget,
          showCanvas: showCanvas,
          createObj: createObj,
          createObj1: createObj1,
          createObj2: createObj2,
          createObj3: createObj3,
          hideObj4:hideObj4,
          createObj4: createObj4
        }
      };
      return TO();
    },

    //计算区块大小
    getViewSize() {
      const W = window.innerWidth;
      const H = window.innerHeight - 76;
      if (W / H >= 1024 / 545) {
        this.zoomF = H / 545
      } else {
        this.zoomF = W / 1024
      }
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.getViewSize();
      })
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

canvas {
  outline: none;
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
  touch-action: none;
  -ms-touch-action: none;
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

div.Ui-head {
  background-color: #fff;
  --webkit-box-shadow: none;
  box-shadow: none;
}


/*内容区*/

.ViewSpace {
  width: 100%;
  height: calc(100% - 76px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 26px 24px;
}

.ViewSpace .viewBox {
  position: relative;
  width: 1024px;
  height: 545px;
  padding: 26px 0;
}

.ViewSpace .leftWrap {
  display: inline-block;
  width: 372px;
  height: 400px;
  position: absolute;
  margin-right: 24px;
  left: 0;
  float: left;
}

.ViewSpace .leftWrap>img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ViewSpace .rightWrap,
.showImg {
  display: inline-block;
  width: 580px;
  height: 400px;
  position: absolute;
  right: 0;
  float: right;
  cursor: pointer;
}

.ViewSpace .rightWrap img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ViewSpace .bottomWrap {
  position: absolute;
  bottom: 24px;
  right: 0;
}

canvas {
  width: 100%;
  height: 100%;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}
</style>