<template>
  <div id="app" class="noselect">
    <div class="container">
      <div id="loading" v-if="!loadingF">
        <div>loading...</div>
      </div>
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace" id="threeContainer"></div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="contour" id="contourContainer"></div>
        <ui-slider :class="{op:!drag}" :value=value :piecewise="true" :piecewiseLabel="true" :tooltip="true" :dragable="drag" :noBlueProcess="true" :data="['枯水期','正常','丰水期']" v-model="value" ></ui-slider>
      </div>
    </div>
  </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑动条
export default {
  name: 'app',
  components: { uiBtn, uiSlider },
  data() {
    return {
      title: '河流与地下水之间的补给关系',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      mainWidth: '',
      TO: null,
      mainHeight: '',
      value: '正常',
      valueO: '正常',
      num: 0,
      time:1.25,
      drag:true,
      loadingF:false
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.TO = this.inits();
    this.TO.createObj();
    window.onresize = () => {
      this.setSideStyle();
      this.getViewSize();
      this.TO.onWindowResize();
    }
  },
  watch:{
    value(val){
        if(val == "正常") {
            if(this.valueO == "枯水期") {
                this.TO.normalAn(1);
            }
            else if(this.valueO == "丰水期") {
                this.TO.normalAn(-1);
            }
        } else if (val == '枯水期') {
            this.TO.lessAn(-1);
        } else if (val == '丰水期') {
            this.TO.moreAn(1);
        }
        this.valueO=val;
    }
  },
  methods: {
    inits() {
      this.setSideStyle();
      this.getViewSize();
      let container, camera, renderer, scene, controls;
      let container1, camera1, renderer1, scene1;
      let obj = new THREE.Group();
      let lineG = new THREE.Group();
      let loader,gltf,model;
      let mixer = null;
      let clock = new THREE.Clock();
      let action=null;
      let lineTextG, dashLineG, LineBase;
      //相机
      container = $('#threeContainer')[0];
      camera = new THREE.PerspectiveCamera(35, this.mainWidth / this.mainHeight, 1, 10000);
      camera.position.set(0, 80, 340);
      camera.zoom = 1;
      camera.updateProjectionMatrix();

      //相机1
      container1 = $('#contourContainer')[0];
      camera1 = new THREE.PerspectiveCamera(50, 240 / 237, 1, 10000);
      camera1.position.set(0, 0, 145);
      camera1.updateProjectionMatrix();
      //场景
      scene = new THREE.Scene();
      scene1 = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff));
      //灯光
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.0);
        hemiLight.position.set(0, -100, 0);
        scene.add(hemiLight);
        let pointColor = '#ffffff';
        let spotLight = new THREE.SpotLight(pointColor);
        spotLight.position.set(-40,-60,-10);
        spotLight.castShadow = true;
        scene.add(spotLight)
        let dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-100, 175, 100);
        dirLight.position.multiplyScalar(30);
        scene.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        let d = 50;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;

        let dirLight1 = dirLight.clone();
        dirLight1.position.set(100, -175, -100);
        dirLight1.intensity = 0.4;
        scene.add(dirLight1);
      //渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.mainWidth, this.mainHeight);
      renderer.setClearColor(0xffffff, 0);
      container.appendChild(renderer.domElement);

      renderer1 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer1.setPixelRatio(window.devicePixelRatio);
      renderer1.setSize(240, 237);
      renderer1.setClearColor(0xffffff, 0);
      container1.appendChild(renderer1.domElement);

      //控制器
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.minDistance = 100;
      controls.maxDistance = 500;

      //构建坐标位置
      let vec3 = (x, y, z) => {
        return new THREE.Vector3(x, y, z);
      };
      //构建线条
      window.resolution = new THREE.Vector2(240, 237);
      let createLineMesh = (vertices, color, style, width) => {
        if (!color) {
          color = '#000';
        }
        if (!width) {
          width = 2;
        }
        let lineMesh, matLine;
        let geometry = new THREE.LineGeometry();
        geometry.setPositions(vertices);
        if (style == 2) {
          matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            dashed: false,
            dashSize: 10,
            gapSize: 10,
            dashScale: 4.5,
            depthTest: false,
            transparent: true
          });
          matLine.defines.USE_DASH = ""
        } else if (style == 3) {
          matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution,
            transparent: true,
            depthTest: false
          });
        } else if (style == 4) {
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
      //构建文字
      let createText = (vertices, font, size, color) => {
        let SpriteText2D = THREE_Text.SpriteText2D;
        let textAlign = THREE_Text.textAlign;
        let textStyle = {
          align: textAlign.center,
          font: size + 'px "Cambria Math"',
          fillStyle: color,
          antialias: true,
        };
        let text = new SpriteText2D(font, textStyle);
        text.position.x = vertices[0].x;
        text.position.y = vertices[0].y;
        text.position.z = vertices[0].z;
        return text;
      };


      loader = new THREE.GLTFLoader();
      loader.load('./static/obj/hlydx.gltf', (data) => {
        gltf = data;
        model = gltf.scene;
        model.traverse( ( node )=>{
          if (node.isMesh) {
              node.visible = true;
              if(node.material.name=='mask_m'){
                  node.material.opacity = 0.7;
              }else{
                  node.material.opacity = 1;
              }
          }
        });
        model.scale.set(600, 600, 600);
        mixer = new THREE.AnimationMixer( model );
        action=mixer.clipAction( gltf.animations[0] );
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        mixer.timeScale = 1;
        action.reset();
        action.time=1.25;
        action.play();
        action.paused=true;
        scene.add(model);
      }, undefined, function(error) {
        console.error(error);
      });

      //构建等高线
      let textY = [56, 26, -3, -34];
      let textG = [65, 60, 55, 50];
      let createCos = () => {
        let vertices = [],line;
        for (let i = -50; i <= 50; i++) {
          let x = i;
          let y = Math.cos(i * Math.PI / 55) * this.num;
          let z = 0;
          vertices.push(x, y, z);
        }
        line = createLineMesh(vertices, '#000', 2, 1.5);
        return line;
      };
      //构建等高线函数
      let createObj = () => {
        if (obj != null) {
          scene1.remove(obj);
        }
        obj = new THREE.Group();
        let vertices;

        //垂直实线
        vertices = [];
        vertices.push(-8, 58, 0, -8, -58, 0);
        let line1 = createLineMesh(vertices, '#000', 3, 2);
        let line2 = line1.clone();
        line2.position.x = 16;

        //两侧虚线
        lineG = new THREE.Group();
        LineBase = createCos();
        for (let i = 0; i < 4; i++) {
          dashLineG = LineBase.clone();
          dashLineG.position.y = (2 - i) * 30 - 15;
          lineG.add(dashLineG);
          obj.add(lineG);
        }

        //绘制箭头
        let material = new THREE.MeshBasicMaterial({
          color: '#000',
          side: THREE.DoubleSide,
          transparent: true,
        });
        let cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 40, 36, 3), material);
        let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 0, 10, 36, 3), material);
        cylinder1.position.z = 10;
        cylinder2.position.y = -26;
        //等高线数字
        for (let i = 0; i <= 3; i++) {
          vertices = [];
          vertices.push(vec3(58, textY[i], 0));
          lineTextG = createText(vertices, textG[i], 180, '#000');
          lineTextG.scale.set(1 / 20, 1 / 20, 1 / 20);
          obj.add(lineTextG)
        }
        //遮挡面片
        let geometry = new THREE.PlaneGeometry(15, 112, 5);
        let material1 = new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 1 });
        let plane = new THREE.Mesh(geometry, material1);
        plane.position.z = 1;
        obj.add(line1, line2, cylinder1, cylinder2, plane);
        scene1.add(obj);
      };

        //模型动画
      let OBJAn=(type)=>{
          mixer.timeScale = type;
          let time=action.time;
          console.log(time)
          action.reset();
          action.time=time;
          action.play();
      };

      let timer = null;
      //枯水期动画
      let lessAn = (type) => {
          this.time=0;
          OBJAn(type);
          timer=setInterval(()=>{
              this.drag=false;
              if (this.num >= 9) {
                  clearInterval(timer);
                  this.drag=true;
                  timer = null;
                  return;
              }
              obj.remove(lineG);
              this.num += 0.14;
              lineG = new THREE.Group();
              LineBase = createCos();
              for (let i = 0; i < 4; i++) {
                  dashLineG = LineBase.clone();
                  dashLineG.position.y = (2 - i) * 30 - 15;
                  lineG.add(dashLineG);
              }
              obj.add(lineG);
          },17)
      };
      //正常水位动画
      let normalAn = (type) => {
        this.drag=false;
          this.time=1.25;
          let F=this.num>0?true:false;
          let step=this.num>0?-0.14:0.14;
          OBJAn(type);
          timer=setInterval(()=> {
              if (F && this.num <= 0) {
                  this.drag = true;
                  clearInterval(timer);
                  timer = null;
                  return;
              }
              if (!F && this.num >= 0) {
                  this.drag = true;
                  clearInterval(timer);
                  timer = null;
                  return;
              }
              obj.remove(lineG);
              this.num += step;
              lineG = new THREE.Group();
              LineBase = createCos();
              for (let i = 0; i < 4; i++) {
                  dashLineG = LineBase.clone();
                  dashLineG.position.y = (2 - i) * 30 - 15;
                  lineG.add(dashLineG);
              }
              obj.add(lineG);
          },17);
      };

      //丰水期动画
      let moreAn = (type) => {
        this.drag=false;
          this.time=2.5;
          OBJAn(type);
          timer=setInterval(()=>{
              if (this.num <= -9) {
                  this.drag=true;
                  clearInterval(timer);
                  timer = null;
                  return;
              }
              obj.remove(lineG);
              this.num -= 0.14;
              lineG = new THREE.Group();
              LineBase = createCos();
              for (let i = 0; i < 4; i++) {
                  dashLineG = LineBase.clone();
                  dashLineG.position.y = (2 - i) * 30 - 15;
                  lineG.add(dashLineG);
              }
              obj.add(lineG);
          },17);
      };
      let onWindowResize = () => {
          camera.aspect = this.mainWidth / this.mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(this.mainWidth, this.mainHeight);
      };
      let reset = () => {
        action.reset();
        action.time=1.25;
        action.play();
        action.paused=true;
        this.value = '正常';
        this.drag=true;
        clearInterval(timer);
        obj.remove(lineG);
        this.num = 0;
        lineG = new THREE.Group();
        LineBase = createCos();
        for (let i = 0; i < 4; i++) {
          dashLineG = LineBase.clone();
          dashLineG.position.y = (2 - i) * 30 - 15;
          lineG.add(dashLineG);
          obj.add(lineG);
        }
          camera.position.set(0, 80, 340);
          camera.zoom = 1;
          camera.updateProjectionMatrix();
      };
      let renderStep=0;
      let renderAll = () => {
        requestAnimationFrame(renderAll);
        renderStep++;
        if(renderStep%3!=0)return;
        if (mixer) mixer.update(clock.getDelta());
        controls.update();
        if(action&&!action.paused){
            if(this.value=='正常'&&(mixer.timeScale==1&&action.time>this.time || mixer.timeScale==-1&&action.time<this.time)){
                action.reset();
                action.time=1.25;
                action.play();
                action.paused=true;
            }
        }
        if(!this.loadingF){
            if(scene.children[5]&&scene.children[5].name=='Scene'){
                this.loadingF=true;
            }
        }
        renderer.clear();
        renderer.render(scene, camera);
      };
      renderAll();
      let renderStep1=0;
      let renderAll1 = () => {
        requestAnimationFrame(renderAll1);
        renderStep1++;
        if(renderStep1%3!=0)return;
        renderer1.clear();
        renderer1.render(scene1, camera1);

      };
      renderAll1();
      let TO = function() {
        return {
          reset: reset,
          createObj: createObj,
          lessAn: lessAn,
          normalAn: normalAn,
          moreAn: moreAn,
          onWindowResize:onWindowResize
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
    },
    //计算区块大小
    getViewSize() {
      this.mainWidth = window.innerWidth - 280;
      this.mainHeight = window.innerHeight;
      let cW = this.mainHeight / 2 + 100;
      $('.ViewImg').css({ 'top': cW });
      if (this.mainWidth / this.mainHeight >= 744 / 505) {
        this.zoom = {
          zoom: this.mainHeight / 505
        }
      } else {
        this.zoom = {
          zoom: this.mainWidth / 744
        }
      }
    },
    //重置
    resetWidget() {
      this.TO.reset();
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
  position: relative;
}

.container h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  position: absolute;
  z-index: 999;
}

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
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
  margin-bottom: 15px;
  line-height: 44px;
}
/*视图区*/

.ViewSpace {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.contour {
  width: 240px;
  height: 237px;
    min-height: 237px;
  background: #FFFFFF;
  border: 0 solid rgba(0, 0, 0, 0.10);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 6px;
    margin-bottom: 20px;
}
#loading{
  width: 100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  z-index: 1000;
}
#loading>div{
  text-align: center;
  position:absolute;
  top:50%;
  transform: translateY(-50%);
  width: 100%;
}
  .op{
    opacity: 0.5;
    pointer-events: none;
  }
</style>