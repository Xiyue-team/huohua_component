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
    <ui-btn :width="120" :height="44" class="btn1" :type="blue1" @click.native="btnClick(1)">实像</ui-btn>
    <ui-btn :width="120" :height="44" class="btn2" :type="blue2" @click.native="btnClick(2)">虚像</ui-btn>
  </div>
</template>
<script>
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
        title: '实像和虚像',
        blue1: 'blue',
        blue2: '',
        loadingF: true
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
    watch: {},
    methods: {
      btnClick(type) {
        if (type === 1) {
          this.blue1 = 'blue';
          this.blue2 = '';
          this.TO.shixiang();
        } else {
          this.blue1 = '';
          this.blue2 = 'blue';
          this.TO.xuxiang();
        }
      },
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
          selectobjs = [],
          selectobjs1 = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          INTERSECTED = null,
          xLeft = -21.1,
          xRight = 26.1,
          composer,
          effectFXAA,
          outlinePass,
          obj3d = new THREE.Object3D(),
          mousedownflag = false,
          model4 = null,
          modelLG4 = null,
          dangban = null,
          hengla_dangban = null,
          xkcx_guangping = null,
          hengla_guangping,
          model4X = new THREE.Group(),
          dragGroup = null,
          planHide1 = null,
          planHide2 = null,
          MirrorG = new THREE.Group();

        offsetLeft = parseInt($('#renderCanvas').offset().left);
        offsetTop = parseInt($('#renderCanvas').offset().top);
        isMob = /iPad|Android/g.test(navigator.userAgent);
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(29 / 255, 59 / 255, 94 / 255);
        camera = new THREE.PerspectiveCamera(60, mainWidth / mainHeight, 1, 10000);
        camera.position.set(0, 10, 100);
        camera.lookAt(scene.position);
        scene.add(camera);
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        renderer.shadowMap.enabled = true;
        renderer.autoClear = false;
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
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
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
                  if (name.includes('xkcx_dangban')) { //挡板
                    dangban = node;
                  } else if (name.includes('hengla_dangban')) { //挡板底座
                    hengla_dangban = node;
                  } else if (name.includes('xkcx_4')) { //数字4
                    node.visible = false;
                    model4 = node;
                    model4.material.color.set('#ffaf43');

                    let m = node.clone();
                    m.visible = true;
                    m.position.set(21.1, -18.75, 0);
                    model4X.add(m);
                    model4X.position.y = 18.75;
                    model4X.position.x = 26;
                    let scaleX = xRight / xLeft;
                    model4X.scale.set(.1, scaleX, scaleX);
                    scene.add(model4X);
                  } else if (name.includes('xkcx_hengla_4')) { //数字4支台
                    modelLG4 = node;
                    selectobjs.push(modelLG4);
                  } else if (name.includes('xkcx_guangping')) { //光屏
                    xkcx_guangping = node;
                    xkcx_guangping.position.x = -21.9;
                  } else if (name.includes('hengla_guangping')) { //光屏底座
                    hengla_guangping = node;
                    hengla_guangping.position.x = -21.9;
                  }
                }
              });
              obj3d.add(model4);
              selectobjs.push(model4);
              createMirror();
              scene.add(object, group4);
              group4.add(obj3d);
              this.loadingF = false;
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
          outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), scene, camera, [group4]);
          composer.addPass(outlinePass);
          effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
          effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
          effectFXAA.renderToScreen = true;
          composer.addPass(effectFXAA);
          outlinePass.visibleEdgeColor.set('#ffa412');
          outlinePass.hiddenEdgeColor.set('#000');
          model4X.children[0].material = new THREE.ShaderMaterial({
            uniforms: {
              Projection: {
                value: new THREE.Vector4(11, -11.2, 26.4, 11)
              },
              color: {
                value: new THREE.Vector4(255, 150, 0, 1)
              }
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
          });
          let geometry1 = new THREE.BoxGeometry(23, 25, 5);
          let material1 = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0
          });
          dragGroup = new THREE.Mesh(geometry1, material1);
          dragGroup.rotation.y = Math.PI / 2;
          dragGroup.position.set(26, 14, 0);
          selectobjs.push(dragGroup);

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

          scene.add(dragGroup, planHide1, planHide2);
        };
        //玻璃镜
        let createMirror = () => {
          let waterGeometry = new THREE.PlaneBufferGeometry(22, 15);
          let verticalMirror = new THREE.Water(waterGeometry, {
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            alpha: 0.9,
            waterColor: '#000000',
            distortionScale: 1
          });
          verticalMirror.rotation.y = -Math.PI / 2;
          let cubeGeometry = new THREE.BoxGeometry(0.5, 15, 22, 1, 1, 1);
          let cubeMaterial = new THREE.MeshBasicMaterial({
            color: '#e7fbff',
            transparent: true,
            opacity: 0.2
          });
          let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          MirrorG.add(verticalMirror, cube);
          MirrorG.position.y = 18.8;
          MirrorG.visible = false;
          scene.add(MirrorG);
        };
        modelPut('xccx_all.obj', 'xccx_all.mtl', materialChange);
        //实像
        let shixiang = () => {
          dangban.visible = true;
          hengla_dangban.visible = true;
          xkcx_guangping.visible = true;
          hengla_guangping.visible = true;
          MirrorG.visible = false;
          model4X.visible = true;
        };
        //虚像
        let xuxiang = () => {
          dangban.visible = false;
          hengla_dangban.visible = true;
          xkcx_guangping.visible = true;
          hengla_guangping.visible = true;
          MirrorG.visible = true;
          model4X.visible = false;
        };
        //事件函数
        let xOld = 0, touchFirst = false, nameF = null;
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
            let intersects = raycaster.intersectObjects(selectobjs1);
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
              let intersects = raycaster.intersectObjects(selectobjs1);
              if (intersects.length > 0) {
                if (INTERSECTED !== intersects[0].object) {
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
        let Move = (f, x, xStep) => {
          if (f) {
            if (x < -50) {
              model4.position.x = -28.9;
              modelLG4.position.x = -28.9;
              xLeft = -50;
              scaleModel4X();
              return;
            } else if (x > -4.2) {
              model4.position.x = 17;
              modelLG4.position.x = 17;
              xLeft = -4.2;
              scaleModel4X();
              return;
            }
            model4.position.x += xStep;
            modelLG4.position.x += xStep;
            xLeft = x;
            scaleModel4X();
          } else {
            if (x < 5.7) {
              xkcx_guangping.position.x = -43.8;
              hengla_guangping.position.x = -43.8;
              dragGroup.position.x = 4.4;
              xRight = 4.2;
              scaleModel4X();
              return;
            } else if (x > 49.5) {
              xkcx_guangping.position.x = 2;
              hengla_guangping.position.x = 2;
              dragGroup.position.x = 50;
              xRight = 50;
              scaleModel4X();
              return;
            }
            xkcx_guangping.position.x += xStep;
            hengla_guangping.position.x += xStep;
            let dragGroupX = xkcx_guangping.position.x + 48;
            dragGroup.position.x = dragGroupX;
            xRight = dragGroupX;
            scaleModel4X();
          }
        };
        let scaleModel4X = () => {
          let scaleX = xRight / xLeft;
          model4X.scale.y = scaleX;
          model4X.scale.z = scaleX;
          model4X.position.x = xRight - 0.1;
        };
        window.onresize = () => {
          window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
        };
        let rendererStep = 0;
        let animate = () => {
          requestAnimationFrame(animate);
          if (rendererStep === 0) {
            rendererStep++;
          } else {
            rendererStep++;
            if (rendererStep % 3 !== 0) return;
          }
          renderer.clear();
          controls.update();
          //面和实线场景
          renderer.render(scene, camera);
          if (composer) {
            composer.render();
          }
          if (camera.position.z <= 0) {
            if (planHide1) {
              planHide1.visible = false;
            }
            if (planHide2) {
              planHide2.visible = true;
            }
          } else {
            if (planHide1) {
              planHide1.visible = true;
            }
            if (planHide2) {
              planHide2.visible = false;
            }
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
          xRight = 26.1;
          scaleModel4X();
          camera.position.set(0, 10, 100);
          camera.lookAt(0, 0, 0);
          model4.position.x = 0;
          modelLG4.position.x = 0;
          model4X.position.y = 18.75;
          model4X.position.x = 26;
          model4X.visible = true;
          xkcx_guangping.position.x = -21.9;
          hengla_guangping.position.x = -21.9;
          xkcx_guangping.visible = true;
          hengla_guangping.visible = true;
          dangban.visible = true;
          hengla_dangban.visible = true;
          MirrorG.visible = false;
          this.blue1 = 'blue';
          this.blue2 = '';
          dragGroup.position.set(26, 14, 0);
        };
        let TO = function () {
          return {
            reset: resetWidget,
            shixiang,
            xuxiang
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
    float: left;
    height: 100%;
    /*background-image: -webkit-radial-gradient(circle at center, #490188, #04163E);*/
    /*background-image: radial-gradient(circle at center, #490188, #04163E);*/
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

  .btn1 {
    position: absolute;
    right: 24px;
    bottom: 80px;
  }

  .btn2 {
    position: absolute;
    right: 24px;
    bottom: 24px;
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

</style>
