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
        title: '平面镜成像',
        checked: false,
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
      }
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
          tipPlane = null,
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
          composer,
          effectFXAA,
          outlinePass,
          obj3d = new THREE.Object3D(),
          mousedownflag = false,
          model4 = null,
          model4X = null,
          modelLG4 = null,
          modelLGBL = null,
          cube = null,
          group4 = new THREE.Group(),
          MirrorG = new THREE.Group(),
          XLEFT = -23.8,
          XRIGHT = 0,
          planHide1 = null,
          planHide2 = null,
          timeid;

        isMob = /iPad|Android/g.test(navigator.userAgent);
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        offsetLeft = parseInt($('#renderCanvas').offset().left);
        offsetTop = parseInt($('#renderCanvas').offset().top);
        renderer.autoClear = false;
        scene = new THREE.Scene();
        scene.background = new THREE.Color(29 / 255, 59 / 255, 94 / 255);
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 10, 100);
        camera.lookAt(scene.position);
        scene.add(camera);
        renderer.shadowMap.enabled = true;
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
                  if (name.includes('xkcx_4')) {//数字4
                    model4 = node;
                    model4.position.x = -23.8;
                    model4.position.y = -0.2;
                    model4.material.color.set('#ffaf43');

                    model4X = node.clone();
                    model4X.visible = false;
                    scene.add(model4X);
                  } else if (name.includes('xkcx_hengla_4')) {  //数字4支台
                    modelLG4 = node;
                    modelLG4.position.x = -23.8;
                  } else if (name.includes('xkcx_hengla_dangban')) { //玻璃支台
                    modelLGBL = node;
                  }
                }
              });
              obj3d.add(model4);

              createMirror();
              scene.add(object, group4);

              group4.add(obj3d);
              this.loadingF = false;
              this.maskShow = true;
              selectobjs.push(modelLG4, model4);
              callback && callback();
            }, onProgress, onError);
          });
        };

        let materialChange = () => {
          composer = new THREE.EffectComposer(renderer);
          let renderPass = new THREE.RenderPass(scene, camera);
          composer.addPass(renderPass);

          outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, [group4]);
          composer.addPass(outlinePass);

          effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
          effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
          effectFXAA.renderToScreen = true;
          composer.addPass(effectFXAA);

          outlinePass.visibleEdgeColor.set('#ffa412');
          outlinePass.hiddenEdgeColor.set('#000');

          selectobjs.push(modelLGBL);

          for (let i = 0; i < modelLG4.material.length; i++) {
            modelLG4.material[i].color.set('#1c1c1c');
          }

          let geometry = new THREE.PlaneGeometry(24, 8);
          let materia = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('static/UI/tip.png'),
            transparent: true,
            opacity: 0.9
          });
          tipPlane = new THREE.Mesh(geometry, materia);
          tipPlane.position.set(-45, 28, 1);

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

          scene.add(tipPlane, planHide1, planHide2);

          model4X.material.transparent = true;
          model4X.material.opacity = 0.8;
          setTimeout(() => {
            tipPlane.visible = false;
            this.maskShow = false;
          }, 2000);
        };

        modelPut('xccx_4_dangban.obj', 'xccx_4_dangban.mtl', materialChange);

        //平面镜
        let geometryMirror = new THREE.PlaneGeometry(22, 20);
        let verticalMirror = new THREE.Reflector(geometryMirror, {
          clipBias: 0,
          textureWidth: window.innerWidth * window.devicePixelRatio,
          textureHeight: window.innerHeight * window.devicePixelRatio,
          color: '#848484',
          recursion: 0,
          depthTest: false
        });
        verticalMirror.rotation.y = -Math.PI / 2;
        let createMirror = () => {
          let cubeGeometry = new THREE.BoxGeometry(0.5, 20, 22, 1, 1, 1);
          let cubeMaterial = new THREE.MeshBasicMaterial({
            color: '#e7fbff',
            transparent: true,
            opacity: 0.2
          });
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          selectobjs.push(cube);

          MirrorG.add(verticalMirror, cube);
          MirrorG.position.y = 21;
          scene.add(MirrorG);
        };
        window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
        let createLineMesh = (vertices, color = '#000', style = 3, width = 1) => {
          var lineMesh, matLine;
          var geometry = new THREE.LineGeometry();
          geometry.setPositions(vertices);
          if (style == 2) {
            matLine = new THREE.LineMaterial({
              color: color,
              linewidth: width,
              resolution: resolution,
              dashed: false,
              dashSize: 0.01,
              gapSize: 0.01,
              dashScale: 1
            });
            matLine.defines.USE_DASH = ""
          } else if (style == 3) {
            matLine = new THREE.LineMaterial({
              color: color,
              linewidth: width,
              resolution: resolution
            });
          }
          lineMesh = new THREE.Line2(geometry, matLine);
          lineMesh.computeLineDistances();
          return lineMesh;
        };
        //创建辅助线
        let lineC = new THREE.Group();

        //创建箭头
        let geometry = new THREE.CylinderGeometry(0, 0.8, 3, 8);
        let material = new THREE.MeshBasicMaterial({color: '#9516FF', depthTest: true});
        let cylinder1 = new THREE.Mesh(geometry, material);
        let cylinder2 = cylinder1.clone();
        let cylinder3 = cylinder1.clone();
        let cylinder4 = cylinder1.clone();
        lineC.add(cylinder1, cylinder2, cylinder3, cylinder4);

        //创建单位直线
        let line1 = createLineMesh([-0.5, 0, 0, 0.5, 0, 0], '#9516ff', 3, 3);
        let line2 = line1.clone();
        let line3 = line1.clone();
        let line4 = line1.clone();
        let line5 = createLineMesh([-0.5, 0, 0, 0.5, 0, 0], '#9516FF', 2, 2);
        let line6 = line5.clone();
        lineC.add(line1, line2, line3, line4, line5, line6);

        lineC.visible = false;
        scene.add(lineC);

        let createLineF = () => {
          let Xstep = Math.abs(XRIGHT - (XLEFT - 21.1)); //4顶端到挡板x距离

          model4X.position.set(XRIGHT + Xstep + 21.1, 0.1, 0);
          let Xstep2 = (XRIGHT + (XLEFT - 21.1)) / 2; //4顶端到挡板的x中点

          //箭头位置
          cylinder1.position.set(Xstep2, 25, 0);
          cylinder2.position.set(Xstep2, 26.5, 0);
          cylinder3.position.set(Xstep2, 28.5, 0);
          cylinder4.position.set(Xstep2, 32.5, 0);

          //光线位置
          line1.position.set(Xstep2, 25, 0);
          //上面第二根
          line2.position.set(Xstep2, 26.5, 0);
          line3.position.set(Xstep2, 28.5, 0);
          //上面第一根
          line4.position.set(Xstep2, 32.5, 0);
          line5.position.set(2 * XRIGHT - Xstep2, 25, 0);
          line6.position.set(2 * XRIGHT - Xstep2, 26.5, 0);


          let Xstep2X = XRIGHT - (XLEFT - 21.5), Xstep2X1 = XRIGHT - (XLEFT - 23),
            s1 = Math.sqrt(Xstep2X * Xstep2X), s2 = Math.sqrt(Xstep2X1 * Xstep2X1);
          //光线缩放
          line1.scale.x = line3.scale.x = line5.scale.x = line6.scale.x = s1;
          if (Xstep2X < 11) {
            line4.scale.x = s2;
            line2.scale.x = s2;
          } else {
            line4.scale.x = s1;
            line2.scale.x = s1;
          }

          line5.material.dashScale = s1 / 50;
          line6.material.dashScale = s1 / 50;

          let ang1 = Math.atan(3.5 / Xstep);
          let ang2 = Math.atan(6 / Xstep);
          let ang3 = Math.atan(-3 / Xstep);
          let ang4 = Math.atan(-6 / Xstep);

          //箭头旋转
          cylinder1.rotation.z = ang1 - Math.PI / 2;
          cylinder2.rotation.z = ang2 - Math.PI / 2;
          cylinder3.rotation.z = ang3 + Math.PI / 2;
          cylinder4.rotation.z = ang4 + Math.PI / 2;

          //光线旋转
          line1.rotation.z = ang1;
          line2.rotation.z = ang2;
          line3.rotation.z = ang3;
          line4.rotation.z = ang4;
          line5.rotation.z = -ang1;
          line6.rotation.z = -ang2;
        };

        //显示隐藏辅助线
        let showLine = (f) => {
          if (f) {
            MirrorG.remove(verticalMirror);
          } else {
            MirrorG.add(verticalMirror);
          }
          createLineF();
          model4X.visible = f;
          lineC.visible = f;
        };

        let Move = (f, x, xStep) => {
          if (f) {
            let X = x + 22, Y = XRIGHT + 16.8;
            if (X < -28.9) {
              modelLG4.position.x = -28.9;
              model4.position.x = -28.9;
              XLEFT = -28.9;
              if (this.checked) {
                createLineF();
              }
              return;
            } else if (X >= Y) {
              modelLG4.position.x = Y;
              model4.position.x = Y;
              XLEFT = Y;
              if (this.checked) {
                createLineF();
              }
              return;
            }
            // var abs = Math.abs(X -model4.position.x);
            // if(abs >2){
            //   return;
            // }
            modelLG4.position.x += xStep;
            model4.position.x += xStep;
            XLEFT = modelLG4.position.x;
            if (this.checked) {
              createLineF();
            }
          } else {
            let X = (XLEFT - 16.8).toFixed(3) - 0;
            if (x > 50) {
              MirrorG.position.x = 50;
              modelLGBL.position.x = 50;
              XRIGHT = 50.1;
              if (this.checked) createLineF();
              return;
            } else if (x <= X) {
              MirrorG.position.x = X;
              modelLGBL.position.x = X;
              XRIGHT = X;
              if (this.checked) createLineF();
              return;
            }
            // var abs = Math.abs(X - MirrorG.position.x);
            // if(abs >2){
            //   return;
            // }
            MirrorG.position.x += xStep;
            modelLGBL.position.x += xStep;
            XRIGHT = modelLGBL.position.x;
            if (this.checked) {
              createLineF();
            }
          }
        };
        //事件函数
        let nameF = null;
        let xOld = 0, touchFirst = false;
        let onDocumentMouseDown = (event) => {
          // ignition();
          event.preventDefault();
          let mouse = {};
          mouse.x = ((event.clientX - offsetLeft) / window.innerWidth) * 2 - 1;
          mouse.y = -((event.clientY - offsetTop) / window.innerHeight) * 2 + 1;
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
            // ignition();
            // cooling();
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / window.innerWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(selectobjs1);
            if (intersects.length > 0) {
              if (INTERSECTED !== intersects[0].object) {
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
          touchFirst = false;
          controls.enableRotate = true;
          // cooling();
        };
        let onDocumentTouchStart = (event) => {
          // ignition();
          event.preventDefault();
          if (event.touches.length === 1) {
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - offsetLeft) / window.innerWidth) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - offsetTop) / window.innerHeight) * 2 + 1;
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
            // ignition();
            // cooling();
            event.preventDefault();
            if (event.touches.length === 1) {
              let mouse = {};
              mouse.x = ((event.touches[0].pageX - offsetLeft) / window.innerWidth) * 2 - 1;
              mouse.y = -((event.touches[0].pageY - offsetTop) / window.innerHeight) * 2 + 1;
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
              Move(nameF, x,xStep);
            }
          }
        };
        let onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          touchFirst = false;
          controls.enableRotate = true;
          // cooling();
        };
        // 冷却 熄火
        // let cooling = () => {
        //   window.clearInterval(timeid);
        //   timeid = setTimeout(() => {
        //     window.AFK = true;
        //   }, 3000);
        // };
        // 点火发动
        // let ignition = () => {
        //   window.AFK = false;
        // };

        window.onresize = () => {
          window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          composer.setSize(window.innerWidth, window.innerHeight);
          effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
        };
        // window.onblur = function () {
        //   window.AFK = true;
        //   console.log(window.AFK)
        // };
        // window.onfocus = function () {
        //   window.AFK = false;
        //   console.log(window.AFK)
        // };

        let i = 0;//记帧数
        let animate = () => {
          requestAnimationFrame(animate);
          i++;
          if (i !== 0) {
            if (i % 3 !== 0) return;//90%概率跳帧渲染;离开时100%跳帧;
          }
          renderer.clear();
          controls.update();
          renderer.render(scene, camera);
          if (this.luminescence) {
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
        // timeid = setTimeout(() => {
        //   window.AFK = true;
        // }, 8000);//
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);


        let resetWidget = () => {
          this.checked = false;
          MirrorG.position.x = 0;
          modelLGBL.position.x = 0;
          camera.position.set(0, 10, 100);
          camera.lookAt(0, 0, 0);
          this.luminescence = false;
          XLEFT = -23.8;
          XRIGHT = 0;
          model4.position.x = -23.8;
          modelLG4.position.x = -23.8;
          MirrorG.add(verticalMirror);
          // scene.children[5].position.x = -23.8;
          // scene.children[8].children[1].position.x = -23.8;
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
    background: #000000;
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
    top: 0px;
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
    z-index: 9999;
    background: #cccccc;
    opacity: 0.5;
  }
</style>
