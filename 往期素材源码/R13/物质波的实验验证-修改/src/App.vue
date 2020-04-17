<template>
  <div id="app" class="noselect">
    <div id="loading" v-if="loadingF" :style="'background:'+bg">
      <div :class="{textColor:ts!='loading...'}">{{ts}}</div>
    </div>
    <div v-if="loadingF" id="ts"
         style="background-color: rgba(0,0,0,0.5);width:100%;height:100%;position:absolute;top:0;left:0;z-index:666;"></div>
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--重制按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <ui-slider id="slider" :title="'速度'" :min="1" :max="10" v-model="value" :speed="0" :tooltip="false"></ui-slider>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import uiSlider from '@/components/UI/uiSlider'; //滑条
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '物质波的衍射实验',
        value: 1,
        rArray: [0, 40, 70, 100, 120, 140, 150, 170],
        loadingF: true,
        bg: '#fff',
        ts: 'loading...'
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
      this.TO = this.init();
    },
    computed: {},
    watch: {
      value(val) {
        // this.TO.FSNReset();
      }
    },
    methods: {
      //计算侧边
      reset() {
        this.TO.reset();
      },
      init() {
        let scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          mousedownflag = false,
          thiz = this;
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        let offsetLeft = parseInt($('#renderCanvas').offset().left);
        let offsetTop = parseInt($('#renderCanvas').offset().top);
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = -200;
        camera.position.y = 0;
        camera.position.z = 800;
        camera.lookAt(scene.position);
        scene.add(camera);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(mainWidth, mainHeight);
        $("#renderCanvas").append(renderer.domElement);

        // var stats = new Stats();
        // $("#renderCanvas").append( stats.dom );

        let controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 1.0;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.rotateSpeed = 0.5;
        controls.minDistance = 500;
        controls.maxDistance = 1200;

        scene.add(new THREE.AmbientLight('#404040'));

        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1000, 0, 0);
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
        dirLight1.position.set(1000, 0, 0);
        dirLight1.intensity = 0.5;
        scene.add(dirLight1);

        //创建平面
        let createP = (W, H, color) => {
          let geometry = new THREE.PlaneGeometry(W, H, 1, 1);
          let material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true
          });
          let P = new THREE.Mesh(geometry, material);
          P.rotation.y = Math.PI / 2;
          return P;
        };

        //创建平面
        let createP1 = (W, H, src) => {
          let geometry = new THREE.PlaneGeometry(W, H, 1, 1);
          let material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(src),
            transparent: true,
            side: THREE.DoubleSide,
            depthTest: false
          });
          return new THREE.Mesh(geometry, material);
        }
        let text = './static/UI/text.png';
        let Text = createP1(364 * 0.5, 120 * 0.5, text);
        Text.position.set(-300, 80, 5);
        scene.add(Text);

        //加载粒子发射器模型
        let loader = new THREE.GLTFLoader();
        loader.load('./static/obj/dinengdianziqiang.gltf', (data) => {
          var obj = data.scene.children[0];
          obj.traverse((node) => {
            if (node.isMesh) {
              node.material = new THREE.MeshPhongMaterial({
                // color: '#ccc'
                map: new THREE.TextureLoader().load('static/UI/lvban.jpg'),
                emissive: '#0c0c0c',
                specular: '#ccc',
                shininess: 40
              });
              selectobjs.push(node);
            }
          });
          obj.scale.set(2, 2, 2);
          obj.position.set(-300, 0, 0);
          scene.add(obj);
          thiz.bg = 'transparent';
          thiz.ts = '滑动可旋转视图区';
          setTimeout(() => {
            thiz.loadingF = false;
          }, 1000);

        }, undefined, function (error) {
          console.error(error);
        });

        let OBJ = new THREE.Group();
        scene.add(OBJ);

        //铝箔
        let Lv = new THREE.Mesh(new THREE.CubeGeometry(0.1, 200, 200),
          new THREE.MeshPhysicalMaterial({
            color: '#fff',
            map: new THREE.TextureLoader().load('./static/UI/lvban.jpg'),
            transparent: true
          })
        );
        scene.add(Lv);

        //幕布
        let Mu = createP(350, 350, '#000000');
        Mu.position.x = 250;
        scene.add(Mu);

        //电子
        let sphere = new THREE.Mesh(
          new THREE.SphereGeometry(2.5, 4, 4),
          new THREE.MeshLambertMaterial({color: '#0f0'})
        );
        sphere.position.x = -100;


        //生成m-n的随机数
        let RandomMN = (m, n) => {
          return Math.random() * (n - m + 1) + m;
        }

        //生成起始点／生成结束点
        let stopN = 0;
        let createPoint = (style, style2) => {
          let x, y, z, f = true, r, ang;
          if (style == 1) {//起始点
            x = 0;
            y = 100 * (1 - Math.random() * 2);
            z = 100 * (1 - Math.random() * 2);
          } else if (style == 2) {//幕布上结束点
            switch (style2) {
              case 1: //右
                stopN++;
                let xi = this.value;
                if (stopN >= (100 - xi * xi) / (xi * 2)) {
                  stopN = 0;
                  x = 250;
                  y = 173 * (1 - Math.random() * 2);
                  z = 173 * (1 - Math.random() * 2);
                } else {
                  ang = Math.random() * Math.PI * 2;
                  let index0 = Math.floor(Math.random() * 7);
                  if (index0 % 2 != 0) {
                    index0--;
                  }
                  let r0 = this.rArray[index0];
                  let r1 = this.rArray[index0 + 1];
                  r = RandomMN(r0, r1);
                  x = 250;
                  y = r * Math.cos(ang);
                  z = r * Math.sin(ang);
                }
                f = false;
                break;
              case 2: //下
                x = 298 * (1 - Math.random() * 2);
                y = -175;
                z = 173 * (1 - Math.random() * 2);
                break;
              case 3: //左
                x = -250;
                y = 173 * (1 - Math.random() * 2);
                z = 173 * (1 - Math.random() * 2);
                break;
              case 4: //上
                x = 298 * (1 - Math.random() * 2);
                y = 175;
                z = 173 * (1 - Math.random() * 2);
                break;
              case 5: //前
                x = 298 * (1 - Math.random() * 2);
                y = 173 * (1 - Math.random() * 2);
                z = 175;
                break;
              case 6: //后
                x = 298 * (1 - Math.random() * 2);
                y = 173 * (1 - Math.random() * 2);
                z = -175;
                break;
            }
          }
          return [x, y, z, f];
        }

        //生成亮斑
        let LBP = createP1(4, 4, './static/UI/point.png');
        LBP.material.depthTest = true;
        LBP.rotation.y = -Math.PI / 2;

        let pGN = 0;
        let pG = [];
        let pGG = new THREE.Group();
        OBJ.add(pGG);
        let RH = () => {
          let geometry = new THREE.Geometry();
          OBJ.remove(pGG);
          pGG = new THREE.Group();
          OBJ.add(pGG);
          for (var j = 0; j < pGN; j++) {
            pG[j].updateMatrix();
            geometry.merge(pG[j].geometry, pG[j].matrix);
          }
          var pGM = new THREE.Mesh(geometry, LBP.material);
          OBJ.add(pGM);
          pGN = 0;
          pG = [];
        }
        let ClearAll = false;
        let MoveTo = (x1, y1, z1, x2, y2, z2, obj, f, s) => {
          if (ClearAll) {
            OBJ.remove(obj);
            return;
          }
          let L = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
          let n = Math.floor(L / s);
          let stepx = (x2 - x1) / n;
          let stepy = (y2 - y1) / n;
          let stepz = (z2 - z1) / n;
          let i = 0;
          let SET = null;
          let an = () => {
            SET = requestAnimationFrame(an);
            if (rendererStep % 2 != 0) return;
            i++;
            if (i >= n || ClearAll) {
              cancelAnimationFrame(SET);
              SET = null;
              obj.position.set(x2, y2, z2);
              OBJ.remove(obj);
              if (!f && !ClearAll) {
                pG[pGN] = LBP.clone();
                pG[pGN].position.set(x2 - 1, y2, z2);
                pGG.add(pG[pGN]);
                pGN++;
              }
              if (pGN >= 50) {
                RH();
              }
              return;
            }
            x1 += stepx;
            y1 += stepy;
            z1 += stepz;
            obj.position.set(x1, y1, z1);
          }
          an();
        }

        let DZ = [];
        let skip = 0;
        //发射电子1
        let FS = (x) => {
          if (ClearAll) {
            return;
          }
          skip++;
          let f = false;
          if (skip >= 2) {
            skip = 0;
            f = true;
          }
          let len2 = DZ.length;
          DZ[len2] = sphere.clone();
          DZ[len2].position.set(-213 - x, 1 - Math.random() * 2, 1 - Math.random() * 2);
          OBJ.add(DZ[len2]);
          let step = this.value * 6;
          let SET = null;
          let an = () => {
            SET = requestAnimationFrame(an);
            if (rendererStep % 2 != 0) return;
            if (DZ[len2].position.x >= -step || ClearAll) {
              cancelAnimationFrame(SET);
              SET = null;
              let v1 = createPoint(1);
              let v2;
              if (f) {
                v2 = createPoint(2, Math.floor(Math.random() * 7) + 1);
              } else {
                v2 = createPoint(2, 1);
              }
              MoveTo(v1[0], v1[1], v1[2], v2[0], v2[1], v2[2], DZ[len2], v2[3], step);
              return;
            }
            DZ[len2].position.x += step;
          }
          an();
        }

        let rendererStep = 0;
        let animate = () => {
          requestAnimationFrame(animate);
          rendererStep++;
          if (rendererStep % 3 != 0) return;
          renderer.clear();
          // stats.update();
          renderer.render(scene, camera);
          if (Text != null) {
            Text.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          }
          if (anFS) {
            for (let i = 0; i < this.value; i++) {
              setTimeout(() => {
                FS(i * 9);
              }, 10)
            }
          }
        };
        animate();

        window.addEventListener('resize', () => {
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
          camera.aspect = mainWidth / mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
        });

        let onDocumentMouseDown = (event) => {
          event.preventDefault();
          let mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          let intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
            Down();
          }
        };
        let onDocumentMouseUp = (event) => {
          event.preventDefault();
          Up();
        };
        let onDocumentTouchStart = (event) => {
          event.preventDefault();
          if (event.touches.length === 1) {
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
              selectobj = intersects[0].object;
              mousedownflag = true;
              Down();
            }
          }
        };
        let onDocumentTouchEnd = (event) => {
          event.preventDefault();
          Up();
        };

        let Delay = null;
        let anFS = false;
        let Down = () => {
          Delay = setTimeout(() => {
            ClearAll = false;
            anFS = true;
            if (Text != null) {
              scene.remove(Text);
              Text = null;
            }
            controls.enableZoom = false;
            controls.enableRotate = false;
          }, 300);
        }
        let Up = () => {
          if (mousedownflag) {
            if (Text != null) {
              scene.remove(Text);
              Text = null;
            }
            ClearAll = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
            FS(0);
            clearTimeout(Delay);
            anFS = false;
            mousedownflag = false;
            selectobj = null;
          }
        }
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

        let resetWidget = () => {
          camera.position.set(-200, 0, 800);
          camera.lookAt(scene.position);
          ClearAll = true;
          pGN = 0;
          pG = [];
          scene.remove(OBJ);
          Delay = null;
          anFS = false;
          DZ = [];
          pG = [];
          skip = 0;
          stopN = 0;
          OBJ = new THREE.Group();
          pGG = new THREE.Group();
          OBJ.add(pGG);
          scene.add(OBJ);
          this.value = 1;
        };
        let TO = function () {
          return {
            reset: resetWidget,
          }
        }
        return TO();
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

  input, button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  /*盒模型，padding尺寸不用再减去*/

  *, *:before, *:after {
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

  /*内容区*/

  .container {
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
    background-image: -webkit-radial-gradient(circle at center, #490188, #04163E);
    background-image: radial-gradient(circle at center, #490188, #04163E);
  }

  .container h3 {
    font-size: 30px;
    color: #fff;
    line-height: 1.0;
    padding: 24px;
    position: absolute;
    top: 0;
    z-index: 555;
    font-weight: normal;
    background-color: transparent;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
    outline: none;
    position: absolute;
    top: 0;
  }

  canvas {
    position: absolute;
  }

  .aside_reset {
    position: absolute;
    top: 20px;
    right: 24px;
  }

  #slider {
    position: absolute;
    right: 24px;
    bottom: 24px;
  }

  .uiSlider.ui-box {
    background: rgba(74, 74, 74, .5) !important;
    padding: 0 12px !important;
  }

  .uiSlider .vue-slider::after {
    background: rgba(0, 0, 0, .24);
  }

  .uiSlider .ui-title {
    color: #fff !important;
  }

  .uiSlider .ui-dot .dotTxt {
    background: #707070 !important;
    border: 0 solid rgba(0, 0, 0, 0.06) !important;
    box-shadow: 0 2px 6px 0 rgba(224, 224, 224, 0.24) !important;
  }

  #loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .textColor {
    font-size: 24px;
    color: #fff;
  }

  #loading > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
</style>
