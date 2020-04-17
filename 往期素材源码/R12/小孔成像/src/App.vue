<template>
  <div id="app" class="noselect">
    <div id="loading" v-show="loadingF">
      <div>loading...</div>
    </div>
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <ui-btn type="switch" class="checkedBtn" v-model="checked">辅助线</ui-btn>
    <div class="mask" v-show="maskShow"></div>
  </div>
</template>
<script>
  import common from '@/common/common'; //引入公共函数;
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn
    },
    data() {
      return {
        title: '小孔成像',
        checked: false,
        pointerF: false,
        MoveOld: 0,
        MoveNew: 1,
        loadingF: true,
        luminescence: false,
        maskShow: false
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
      checked(v) {
        this.TO.showLine(v);
      },
    },
    methods: {
      reset() {
        this.TO.reset();
      },
      init() {
        let scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          isMob = null,
          offsetLeft = null,
          offsetTop = null,
          tipPlane = null,
          selectobjs = [],
          selectobjs1 = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          INTERSECTED = null,
          mousedownflag = false,
          xLeft = -21.1,
          composer,
          effectFXAA,
          outlinePass,
          obj3d = new THREE.Object3D(),
          xRight = 22,
          selectedObjects = [],
          model4 = null,
          modelLG4 = null,
          modelGP = null,
          modelLGGP = null,
          planHide1 = null,
          planHide2 = null,
          model4X = null;

        isMob = /iPad|Android/g.test(navigator.userAgent);
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        offsetLeft = parseInt($('#renderCanvas').offset().left);
        offsetTop = parseInt($('#renderCanvas').offset().top);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, mainWidth / mainHeight, 1, 10000);
        camera.position.set(0, 10, 100);
        camera.lookAt(scene.position);
        scene.add(camera);
        scene.background = new THREE.Color(29 / 255, 59 / 255, 94 / 255);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.minDistance = 70;
        controls.maxDistance = 130;
        $("#renderCanvas").append(renderer.domElement);

        scene.add(new THREE.AmbientLight('#ffffff'));

        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
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
        scene.add(dirLight);

        let group4 = new THREE.Group();

        let modelPut = (obj, mtl, callback) => {
          let onProgress = function (xhr) {
            if (xhr.lengthComputable) {
              let percentComplete = xhr.loaded / xhr.total * 100;
              console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
          };
          let onError = function (xhr) {
          };
          let mtlLoader = new THREE.MTLLoader();
          mtlLoader.setPath('static/model/');
          mtlLoader.load(mtl, (materials) => {
            materials.preload();
            let objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('static/model/');
            objLoader.load(obj, (object) => {
              object.traverse((node) => {
                if (node.isMesh) {
                  let name = node.name;
                  if (name.includes('xkcx_4')) {  //数字4
                    model4 = node;
                    model4.geometry.computeBoundingSphere();
                    model4.receiveShadow = true;
                    model4.castShadow = true;
                    model4.material.color.set('#ffaf43');

                    model4X = new THREE.Group();
                    let m = model4.clone();
                    m.position.set(21.1, -18.75, 0);
                    model4X.add(m);
                    model4X.position.y = 18.75;
                    model4X.position.x = 21.9;
                    let scaleX = xRight / xLeft;
                    model4X.scale.set(.1, scaleX, scaleX);
                    model4X.visible = false;
                    scene.add(model4X);
                  } else if (name.includes('xkcx_hengla_4')) {  //数字4支台
                    modelLG4 = node;
                  } else if (name.includes('xkcx_guangping')) { //光屏
                    modelGP = node;
                    node.position.x = -26;
                  } else if (name.includes('xkcx_hengla_guangping')) { //光屏支台
                    modelLGGP = node;
                    node.position.x = -26;
                  }
                }
              });
              obj3d.add(model4);
              selectobjs.push(modelLG4, model4, modelLGGP, modelGP);
              scene.add(object, group4);
              group4.add(obj3d);
              this.loadingF = false;
              this.maskShow = true;
              callback && callback();
            }, onProgress, onError);
          });
        };

        let materialChange = () => {
          for (let i = 0; i < modelLG4.material.length; i++) {
            modelLG4.material[i].color.set('#1e1e1e');
          }
          composer = new THREE.EffectComposer(renderer);

          let renderPass = new THREE.RenderPass(scene, camera);
          composer.addPass(renderPass);

          outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), scene, camera);
          composer.addPass(outlinePass);

          effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
          effectFXAA.uniforms['resolution'].value.set(1 / mainWidth, 1 / mainHeight);
          effectFXAA.renderToScreen = true;
          composer.addPass(effectFXAA);
          selectedObjects = [];
          selectedObjects.push(group4);

          outlinePass.selectedObjects = selectedObjects;

          outlinePass.edgeStrength = 2.5;
          outlinePass.edgeGlow = 0;
          outlinePass.edgeThickness = 4;
          outlinePass.visibleEdgeColor.set('#ffa412');
          outlinePass.hiddenEdgeColor.set('#000');
          let material = new THREE.ShaderMaterial({
            uniforms: {
              Projection: {value: new THREE.Vector4(11, -11.2, 26.4, 11)},
              color: {value: new THREE.Vector4(255, 150, 0, 1)}
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
          });
          model4X.children[0].material = material;

          //创建隐形拖动接触面
          let geometryHide1 = new THREE.PlaneBufferGeometry(100000, 100000);
          let materiaHide1 = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
          });
          planHide1 = new THREE.Mesh(geometryHide1, materiaHide1);
          planHide1.position.z = -11;

          planHide2 = new THREE.Mesh(geometryHide1, materiaHide1);
          planHide2.position.z = 11;
          selectobjs1.push(planHide1, planHide2);

          let geometry2 = new THREE.PlaneGeometry(24, 8);
          let materia2 = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('static/UI/tip.png'),
            transparent: true,
            opacity: 0.9
          });
          tipPlane = new THREE.Mesh(geometry2, materia2);
          tipPlane.position.set(-21, 29, 1);

          scene.add(tipPlane);
          setTimeout(() => {
            tipPlane.visible = false;
            this.maskShow = false;
          }, 2000);
        };

        modelPut('xccx_all.obj', 'xccx_all.mtl', materialChange);

        //创建辅助线
        let lineC = new THREE.Group();
        let geometry = new THREE.CylinderGeometry(0, 0.5, 2.4, 16);
        let material = new THREE.MeshBasicMaterial({color: '#9516FF'});
        let cylinder1 = new THREE.Mesh(geometry, material);
        let cylinder2 = cylinder1.clone();
        let cylinder3 = cylinder1.clone();
        let cylinder4 = cylinder1.clone();
        let cylinder5 = cylinder1.clone();
        let cylinder6 = cylinder1.clone();
        lineC.add(cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6);
        lineC.visible = false;
        scene.add(lineC);

        let lineL = null;
        let lineR = null;
        let createLineF = (s, f) => {
          let vertices = [];
          if (f) {
            if (lineL != null) {
              scene.remove(lineL);
            }
            vertices.push(xLeft, 26.6, 0, -0.2, 25, 0, xLeft, 23.4, 0, -0.2, 13.6, 0, xLeft, 2.8, 0);
            lineL = common.createLineMesh(vertices, '#9516FF', 3, 3);
            scene.add(lineL);

            cylinder3.position.set(xLeft / 2, 25.8, 0);
            cylinder4.position.set(xLeft / 2, 24.2, 0);
            cylinder5.position.set(xLeft / 2, 18.5, 0);
            cylinder6.position.set(xLeft / 2, 8.2, 0);

            cylinder3.rotation.z = Math.atan(1.6 / xLeft) + Math.PI / 2;
            cylinder4.rotation.z = Math.atan(-1.6 / xLeft) - Math.PI / 2;
            cylinder5.rotation.z = Math.atan(9.8 / xLeft) - Math.PI / 2;
            cylinder6.rotation.z = Math.atan(-9.8 / xLeft) + Math.PI / 2;
          }
          if (lineR != null) {
            scene.remove(lineR);
          }
          let y1 = 18.8 + 4.6 * s;
          let y2 = 18.8 - 3.2 * s;
          vertices = [];
          vertices.push(xRight - 0.1, y2, 0, xLeft - 0.05, 15.6, 0, xLeft - 0.05, 23.4, 0, xRight - 0.1, y1, 0);
          lineR = common.createLineMesh(vertices, '#9516FF', 3, 3);
          scene.add(lineR);

          let halfx = (xRight - 0.1) / 2;

          cylinder1.position.set(halfx, y1 / 2 + 9.4, 0);
          cylinder2.position.set(halfx, y2 / 2 + 9.4, 0);

          cylinder1.rotation.z = Math.atan((y1 - 18.8) / (2 * halfx)) - Math.PI / 2;
          cylinder2.rotation.z = Math.atan((y2 - 18.8) / (2 * halfx)) - Math.PI / 2;

          this.MoveOld = this.MoveNew;
        };

        //显示隐藏辅助线
        let showLine = (f) => {
          if (this.MoveOld !== this.MoveNew) {
            createLineF(xRight / xLeft, true);
          }
          lineL.visible = f;
          lineR.visible = f;
          lineC.visible = f;
        };
        let Move = (f, x, xStep) => {
          if (f) {
            if (x < -50) {
              model4.position.x = -28.9;
              modelLG4.position.x = -28.9;
              xLeft = -50;
              scaleModel4X(f);
              return;
            } else if (x > -4) {
              model4.position.x = 17;
              modelLG4.position.x = 17;
              xLeft = -4;
              scaleModel4X(f);
              return;
            }
            model4.position.x += xStep;
            modelLG4.position.x += xStep;
            xLeft = model4.position.x - 21.1;
            scaleModel4X(f);
          } else {
            if (x < 4.2) {
              modelGP.position.x = -43.8;
              modelLGGP.position.x = -43.8;
              xRight = 4.2;
              scaleModel4X(f);
              return;
            } else if (x > 50.1) {
              modelGP.position.x = 2.1;
              modelLGGP.position.x = 2.1;
              xRight = 50.1;
              scaleModel4X(f);
              return;
            }
            modelGP.position.x += xStep;
            modelLGGP.position.x += xStep;
            xRight = modelGP.position.x + 48;
            scaleModel4X(f);
          }
        };

        let scaleModel4X = (f) => {
          let scaleX = xRight / xLeft;
          this.MoveNew = scaleX;
          if (this.checked) {
            this.MoveOld = scaleX;
            createLineF(scaleX, f);
          }
          model4X.position.x = xRight - 0.1;
          model4X.scale.y = scaleX;
          model4X.scale.z = scaleX;
        };
        let xOld = 0, touchFirst = false, nameF = null;
        //事件函数
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
            controls.enableRotate = false;
            let selectobjName = selectobj.name;
            if (selectobjName.includes('xkcx_hengla_4') || selectobjName.includes('xkcx_4')) {
              if (!this.luminescence) {
                this.luminescence = true;
              }
              nameF = true;
              model4X.visible = true;
            } else {
              nameF = false;
            }
          }
        };
        let onDocumentMouseMove = (event) => {
          if (mousedownflag) {
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
              if (INTERSECTED != intersects[0].object) {
                INTERSECTED = intersects[0].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
              }
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset), x;
              x = obj.x.toFixed(3) - 0;
              if (!touchFirst) {
                touchFirst = true;
                xOld = x;
                return;
              }
              let xStep = (x - xOld).toFixed(3) - 0;
              if (Math.abs(xStep) > 20) {
                return;
              }
              xOld = x;
              Move(nameF, x, xStep);
            }
          }
        };
        let onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
          touchFirst = false;
          nameF = null;
          xOld = 0;
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
              controls.enableRotate = false;
              let selectobjName = selectobj.name;
              if (selectobjName.includes('xkcx_hengla_4') || selectobjName.includes('xkcx_4')) {
                if (!this.luminescence) {
                  this.luminescence = true;
                }
                nameF = true;
                model4X.visible = true;
              } else {
                nameF = false;
              }
            }
          }
        };
        let onDocumentTouchMove = (event) => {
          if (mousedownflag) {
            event.preventDefault();
            if (event.touches.length === 1) {
              let mouse = {};
              mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
              mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
              raycaster.setFromCamera(mouse, camera);
              let intersects = raycaster.intersectObjects(selectobjs);
              if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                  INTERSECTED = intersects[0].object;
                  plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
                }
              }
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset), x;
              x = obj.x.toFixed(3) - 0;
              if (!touchFirst) {
                touchFirst = true;
                xOld = x;
                return;
              }
              let xStep = (x - xOld).toFixed(3) - 0;
              if (Math.abs(xStep) > 20) {
                return;
              }
              xOld = x;
              Move(nameF, x, xStep);
            }
          }
        };
        let onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;
          touchFirst = false;
          nameF = null;
          xOld = 0;
        };
        window.onresize = () => {
          window.resolution = new THREE.Vector2(mainWidth, mainHeight);
          camera.aspect = mainWidth / mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
        };

        let rendererStep = 0;
        let animate = () => {
          requestAnimationFrame(animate);
          rendererStep++;
          if (rendererStep === 0) {
            rendererStep++;
          } else {
            if (rendererStep % 3 !== 0) return;
          }
          renderer.clear();
          controls.update();
          renderer.render(scene, camera);
          if (this.luminescence) {
            composer.render();
          }
        };
        animate();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

        let resetWidget = () => {
          xLeft = -21.1;
          xRight = 22;
          this.MoveOld = 0;
          this.MoveNew = 1;
          this.checked = false;
          scaleModel4X();
          camera.position.set(0, 10, 100);
          camera.lookAt(0, 0, 0);
          model4.position.x = 0;
          modelLG4.position.x = 0;
          modelGP.position.x = -26;
          modelLGGP.position.x = -26;
          model4X.position.x = 21.9;
          this.luminescence = false;
          touchFirst = false;
          xOld = 0;
          model4X.visible = false;
        };
        let TO = function () {
          return {
            reset: resetWidget,
            showLine: showLine
          }
        };
        return TO();
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

  /*内容区*/

  .container {
    width: 100%;
    float: left;
    height: 100%;
    background: #000;
  }

  .container h3 {
    font-size: 24px;
    color: #fff;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position: absolute;
    z-index: 6;
  }

  #renderCanvas {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    outline: none;
    overflow: hidden;
  }

  canvas {
    position: absolute;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  #app .aside_reset {
    position: fixed;
    right: 0;
    top: 0;
  }

  div.checkedBtn {
    width: 240px;
    position: absolute;
    bottom: 20px;
    right: 24px;
  }

  #loading {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  #loading > div {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #cccccc;
    opacity: 0.5;
  }
</style>
