<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked" :class="click?'':'noclick'">辅助线及标签</ui-btn>
      <ui-btn type="switch" v-model="checked1" :class="click?'':'noclick'">量角器</ui-btn>
    </div>
    <!--侧边按钮区-->
  </div>
</template>
<script>
  import common from '@/common/common'; //引入公共函数;
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  let {sin, cos, PI, tan} = Math;
  let RADIUS = 320;
  const W = 800;
  const H = 800;
  const MAIN_COLOR = '#fff';
  export default {
    name: 'app',
    components: {
      uiHead,
      uiBtn,
    },
    data() {
      return {
        title: '光的反射',
        checked: false,
        angle: 135,
        checked1: false,
        click: false
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
      checked(val) {
        this.TO.toggleAssist(val);
      },
      checked1(val) {
        this.TO.toggleLiangjiaoqi(val);
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
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          mouse = new THREE.Vector2(),
          INTERSECTED = null,

          objects = [],
          effectFXAA,
          bloomPass,
          renderScene,
          hdrCubeMap,
          composer,
          standardMaterial,
          hdrCubeRenderTarget,

          mousedownflag = false,
          laser = null,
          lineGroup = null,
          isAnimating = false,
          comObj = {},
          cylinderLight = null,
          cylinderLight1 = null,
          maskGroupShow = true;

        let offsetLeft = parseInt($('#renderCanvas').offset().left);
        let offsetTop = parseInt($('#renderCanvas').offset().top);
        comObj.cylinderGroup = new THREE.Group();
        comObj.cylinderGroup1 = new THREE.Group();

        if (!Detector.webgl) Detector.addGetWebGLMessage();
        let params = {
          projection: 'normal',
          background: true,
          exposure: 1,
          bloomStrength: 0,
          bloomThreshold: 1.5,
          bloomRadius: 0.3
        };

        isMob = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        let calc, calc1, calc2;
        if (isMob) {
          calc = 4;
          calc1 = 2;
          calc2 = 1;
        } else {
          calc = 1;
          calc1 = 1;
          calc2 = 3;
        }
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(29 / 255, 59 / 255, 94 / 255);
        camera = new THREE.PerspectiveCamera(45, mainWidth / mainHeight, 1, 10000);
        camera.position.set(0, 200, 850);
        camera.lookAt(scene.position);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0);
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.setSize(mainWidth, mainHeight);
        let ambientlight = new THREE.AmbientLight(0xcccccc);
        scene.add(ambientlight);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;

        controls.minDistance = 400;
        controls.maxDistance = 1000;
        $("#renderCanvas").append(renderer.domElement);
        comObj.tipImg = common.createImg([-150, 270, 210], 182, 60, 'static/UI/tip.png');
        let quanju = null;
        let calcPos = (angle) => {
          let rad = common.radian(angle);
          let x = RADIUS * cos(rad);
          let y = RADIUS * sin(rad);
          return [x, y, rad];
        };

        function modelPut(obj, mtl) {
          let onProgress = function (xhr) {
            if (xhr.lengthComputable) {
              let percentComplete = xhr.loaded / xhr.total * 100;
              console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
          };
          let onError = function (xhr) {
          };
          let mtlLoader = new THREE.MTLLoader();
          mtlLoader.setPath('static/obj/');
          mtlLoader.load(mtl, function (materials) {
            materials.preload();
            let objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('static/obj/');
            objLoader.load(obj, function (object) {
              quanju = object;
              quanju.scale.set(10, 10, 10);
              scene.add(quanju);
              initScene();
            }, onProgress, onError);
          });
        }

        modelPut('jiguangbi.obj', 'jiguangbi.mtl');
        let initScene = () => {
          let plane = common.createPlane(W, H / 2, {
            isLay: true,
            opacity: 1,
            color: '#262626'
          });
          plane.position.y = -4;
          scene.add(plane);
          //激光选取球
          laser = common.createSphere(50, {
            color: '#00f',
            opacity: 0.0
          });
          scene.add(laser);
          let [x, y, rad] = calcPos(this.angle);
          laser.position.set(x, y, 0);

          quanju.position.set(x, y, 0);
          quanju.rotation.z = -Math.PI / 2 + rad;

          comObj.staticGroup = new THREE.Group();
          //法线
          let line = common.createStraightLine([
            [0, 340, 0],
            [0, -340, 0]
          ], {
            style: 2,
            color: "#fff"
          });
          comObj.staticGroup.add(line);
          comObj.bigPlane = common.createImg([0, 0, -2], 543, 682, 'static/UI/liangjiaoqi2.png');

          comObj.bg = common.createImg([0, 0, -2], 543, 682, 'static/UI/bg1.png');

          let text = common.createText('反射面', W / 2 - 100, 30, H / 4 - 100, MAIN_COLOR, 100 * calc1);
          comObj.staticGroup.add(text);
          text = common.createText('法线', -50, H / 2 - 50, 0, MAIN_COLOR, 100 * calc1);
          comObj.staticGroup.add(text);

          //光线单位向量
          cylinderLight = common.createCylinder(2, 2, 295, {
            color: '#fff'
          });

          cylinderLight.position.set(0, 150, -2);
          scene.add(cylinderLight);
          objects.push(cylinderLight);

          comObj.cylinderGroup.add(cylinderLight);
          cylinderLight1 = cylinderLight.clone();
          cylinderLight1.position.set(0, 145, -2);
          comObj.cylinderGroup1.add(cylinderLight1);
          comObj.ReflectionAngle = common.createText('反射角', 0, 0, 0, MAIN_COLOR, 90 * calc1);

          comObj.incidenceAngle = common.createText('入射角', 0, 0, 0, MAIN_COLOR, 90 * calc1);

          comObj.IncidentLight = common.createText('入射光线', -161, 121, 0, MAIN_COLOR, 100 * calc1);

          comObj.ReflectedLight = common.createText('反射光线', 161, 121, 0, MAIN_COLOR, 100 * calc1);

          comObj.liangjiaoqi = common.createImg([0, 101, -2], 400, 202, 'static/UI/liangjiaoqi.png');

          //遮罩层
          comObj.maskGroup = new THREE.Group();
          comObj.mask = common.createPlane(2000, 2000, {
            opacity: 0.3,
            color: '#fff'
          });
          comObj.mask.position.set(0, 0, 200);

          comObj.maskGroup.add(comObj.mask, comObj.tipImg);
          comObj.tipImg.rotation.x = -0.2;
          scene.add(comObj.maskGroup);
          setTimeout(() => {
            scene.remove(comObj.maskGroup);
            controls.enableZoom = true;
            controls.enableRotate = true;
            maskGroupShow = false;
            selectobjs.push(laser);
          }, 2000);

          //发光
          let genCubeUrls = function (prefix, postfix) {
            return [
              prefix + 'px' + postfix, prefix + 'nx' + postfix,
              prefix + 'py' + postfix, prefix + 'ny' + postfix,
              prefix + 'pz' + postfix, prefix + 'nz' + postfix
            ];
          };

          let hdrUrls = genCubeUrls('static/pisaHDR/', '.hdr');
          new THREE.HDRCubeTextureLoader().load(THREE.UnsignedByteType, hdrUrls, function (hdrCubeMap) {
            let pmremGenerator = new THREE.PMREMGenerator(hdrCubeMap);
            pmremGenerator.update(renderer);

            let pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
            pmremCubeUVPacker.update(renderer);

            hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
          });

          renderScene = new THREE.RenderPass(scene, camera);

          effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
          effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);

          bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85); //1.0, 9, 0.5, 512);
          bloomPass.renderToScreen = true;

          composer = new THREE.EffectComposer(renderer);
          composer.setSize(window.innerWidth * calc, window.innerHeight * calc);
          composer.addPass(renderScene);
          composer.addPass(effectFXAA);
          composer.addPass(bloomPass);

          renderer.gammaInput = true;
          renderer.gammaOutput = true;
        };

        let moveLaser = (x, y) => {
          let ang = Math.atan2(y, x);
          x = RADIUS * Math.cos(ang).toFixed(4) - 0;
          y = RADIUS * Math.sin(ang).toFixed(4) - 0;
          laser.position.set(x, y, 0);
          quanju.position.set(x, y, 0);
          quanju.rotation.z = -Math.PI / 2 + ang;
          this.angle = common.angle(ang);
          if (lineGroup != null) {
            //旋转入射光线、反射光线
            comObj.cylinderGroup.rotation.z = -Math.PI / 2 + ang;
            comObj.cylinderGroup1.rotation.z = Math.PI / 2 - ang;
            if (this.checked) {
              showAssist(x, y, this.angle);
            }
          }
        };
        let toggleAssist = (bool) => {
          if (lineGroup == null) {
            this.checked = false;
            return;
          } else {
            scene.remove(comObj.bg, comObj.bigPlane, comObj.liangjiaoqi);
            if (!bool) {
              //反射角文字
              scene.remove(comObj.ReflectionAngle, comObj.IncidentLight, comObj.ReflectedLight, comObj.incidenceAngle, comObj.staticGroup, comObj.dynamicGroup);
              if (this.checked1) {
                scene.add(comObj.liangjiaoqi);
              }
            } else {
              //显示反射角文字
              scene.add(comObj.ReflectionAngle, comObj.IncidentLight, comObj.ReflectedLight, comObj.incidenceAngle, comObj.staticGroup);
              if (this.checked1) {
                scene.add(comObj.bigPlane);
              } else {
                scene.add(comObj.bg);
              }
              let x = laser.position.x;
              let y = laser.position.y;
              showAssist(x, y, this.angle);
            }
          }
        };
        let toggleLiangjiaoqi = (bool) => {
          if (lineGroup == null) {
            this.checked1 = false;
            return;
          } else {
            if (!bool) {
              scene.remove(comObj.liangjiaoqi);
              if (this.checked) {
                scene.add(comObj.bg);
                scene.remove(comObj.bigPlane);
              }
            } else {
              if (this.checked) {
                scene.remove(comObj.bg);
                scene.add(comObj.bigPlane);
              } else {
                scene.add(comObj.liangjiaoqi);
              }
            }
          }
        };

        //光线动画
        let lineAni = (x, y, ang) => {
          isAnimating = true;
          let group = new THREE.Group();
          group.add(comObj.cylinderGroup);
          scene.add(group);
          let rad = common.radian(ang);
          comObj.cylinderGroup.rotation.z = -Math.PI / 2 + rad;
          comObj.cylinderGroup1.rotation.z = Math.PI / 2 - rad;

          function scaleLine(obj, bool, group) {
            return new Promise((resolve) => {
              let num = 0;

              function scale() {
                num += 0.03;
                obj.scale.set(1, num, 1);
                if (bool) {
                  let sy = 300 * num / 2;
                  obj.position.y = 300 - sy;
                }
                if (num >= 1) {
                  clearTimeout(comObj.timer);
                  resolve(group);
                  return;
                }
                comObj.timer = setTimeout(scale, 60);
              }

              scale();
            })
          }

          scaleLine(cylinderLight, true, group).then((group) => {
            group.add(comObj.cylinderGroup1);
            scaleLine(comObj.cylinderGroup1, false, group).then(() => {
              isAnimating = false;
              this.click = true;
            })
          });
          return group;
        };
        let showAssist = (x, y, angle) => {
          scene.remove(comObj.dynamicGroup);
          comObj.dynamicGroup = new THREE.Group();

          let angle1, angle2;
          if (angle > 90) {
            angle1 = drawAngle(90, angle, 50, MAIN_COLOR, '#0f0', '入射角');
            angle2 = drawAngle(90, angle, 60, MAIN_COLOR, '#0f0', '反射角');
          } else {
            angle1 = drawAngle(angle, 90, 50, MAIN_COLOR, '#0f0', '入射角');
            angle2 = drawAngle(angle, 90, 60, MAIN_COLOR, '#0f0', '反射角');
          }
          angle2.rotation.y = Math.PI;
          let X = (x / 1.4).toFixed(2) - 0, Y = (y / 1.4 - 40).toFixed(2) - 0;
          comObj.IncidentLight.position.set(X, Y, 0);
          comObj.ReflectedLight.position.set(-X, Y, 0);

          comObj.dynamicGroup.add(angle1, angle2);
          if(angle<91&&angle>89){
            scene.remove(comObj.ReflectionAngle);
            scene.remove(comObj.incidenceAngle);
          }else{
            scene.remove(comObj.ReflectionAngle);
            scene.remove(comObj.incidenceAngle);
            scene.add(comObj.ReflectionAngle);
            scene.add(comObj.incidenceAngle);
          }


        };
        let drawAngle = (startangle, endangle, size, color, circleColor, font, index = 0) => {
          let dx, dy, vertices = [];
          for (let i = startangle; i < endangle; i += 2) {
            dx = size * Math.cos(Math.PI / 180 * i);
            dy = size * Math.sin(Math.PI / 180 * i);
            vertices.push(dx, dy, index);
          }
          let line = common.createLineMesh(vertices, color, 3, calc2);
          let angle = 0;
          if (startangle === 0) {
            angle = common.radian(endangle / 2);
          } else {
            angle = common.radian((endangle - startangle) / 2 + startangle);
          }

          comObj.ReflectionAngle.position.set(-(size + 15) * cos(angle), (size + 15) * sin(angle) + 20, 2);
          comObj.incidenceAngle.position.set((size + 15) * cos(angle), (size + 15) * sin(angle) + 20, 2);

          return line;
        };
        //事件函数
        let onDocumentMouseDown = (event) => {
          if (isAnimating) {
            return;
          }
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
            if (lineGroup) {
              return;
            }
            //触发光线动画
            let x = laser.position.x;
            let y = laser.position.y;
            let ang = common.angle(Math.atan2(y, x));
            lineGroup = lineAni(x, y, ang);
          }
        };
        let onDocumentMouseMove = (event) => {
          event.preventDefault();
          if (mousedownflag && !isAnimating) {
            let mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(selectobjs);
            raycaster.setFromCamera(mouse, camera);
            if (intersects.length > 0) {
              if (INTERSECTED != intersects[0].object) {
                INTERSECTED = intersects[0].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
              }
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset), x, y;
              x = obj.x.toFixed(2) - 0;
              y = obj.y.toFixed(2) - 0;
              if (y < 8) {
                return;
              }
              moveLaser(x, y);
            }
          }
        };
        let onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;

        };
        let onDocumentTouchStart = (event) => {
          if (isAnimating) {
            return;
          }
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
              if (lineGroup) {
                return;
              }
              //触发光线动画
              let x = laser.position.x;
              let y = laser.position.y;
              let ang = common.angle(Math.atan2(y, x));
              lineGroup = lineAni(x, y, ang);
            }
          }
        };
        let onDocumentTouchMove = (event) => {
          event.preventDefault();
          if (mousedownflag && !isAnimating) {
            if (event.touches.length === 1) {
              let mouse = {};
              mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
              mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
              raycaster.setFromCamera(mouse, camera);
              let intersects = raycaster.intersectObjects(selectobjs);
              raycaster.setFromCamera(mouse, camera);
              if (intersects.length > 0) {
                if (INTERSECTED !== intersects[0].object) {
                  INTERSECTED = intersects[0].object;
                  plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
                }
              }
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset), x, y;
              x = obj.x.toFixed(2) - 0;
              y = obj.y.toFixed(2) - 0;
              if (y < 8) {
                return;
              }
              moveLaser(x, y);
            }
          }
        };
        let onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
          controls.enableRotate = true;

        };
        let rendererStep = 0;
        let animate = () => {
          requestAnimationFrame(animate);
          rendererStep++;
          if (rendererStep !== 0) {
            if (rendererStep % 3 !== 0) return;
          }
          renderer.clear();
          //面和实线场景
          renderer.render(scene, camera);

          if (standardMaterial !== undefined) {
            standardMaterial.roughness = 1.0;
            standardMaterial.bumpScale = 0.25;
            let newEnvMap = standardMaterial.envMap;
            if (hdrCubeRenderTarget) newEnvMap = hdrCubeRenderTarget.texture;
            if (newEnvMap !== standardMaterial.envMap) {
              standardMaterial.envMap = newEnvMap;
              standardMaterial.envMapIntensity = 1;
              standardMaterial.needsUpdate = true;
            }
          }
          renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);
          if (!maskGroupShow) {
            composer.render();
          }

          //虚线场景
        };
        animate();
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
        // let resizeTimer = null;
        window.addEventListener('resize', () => {
          // clearTimeout(resizeTimer);
          // resizeTimer = setTimeout(() => {
          mainWidth = $('#renderCanvas').width();
          mainHeight = $('#renderCanvas').height();
          camera.aspect = mainWidth / mainHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mainWidth, mainHeight);
          composer.setSize(mainWidth, mainHeight);
          effectFXAA.uniforms['resolution'].value.set(1 / mainWidth, 1 / mainHeight);
          composer.setSize(window.innerWidth * calc, window.innerHeight * calc);
          // }, 200);
          offsetLeft = parseInt($('#renderCanvas').offset().left);
          offsetTop = parseInt($('#renderCanvas').offset().top);
        });
        let resetWidget = () => {
          scene.remove(lineGroup);
          clearTimeout(comObj.timer);
          isAnimating = false;
          this.angle = 135;
          this.checked = false;
          this.checked1 = false;
          camera.position.set(0, 200, 850);
          camera.lookAt(0, 0, 0);
          let [x, y, rad] = calcPos(this.angle);
          laser.position.set(x, y, 0);
          quanju.position.set(x, y, 0);
          quanju.rotation.z = -Math.PI / 2 + rad;
          this.click = false;
          setTimeout(function () {
            lineGroup = null;
          }, 50);
        };
        let TO = function () {
          return {
            reset: resetWidget,
            toggleAssist,
            toggleLiangjiaoqi
          }
        };
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
    /*background-color: #fff;*/
    /*background-image: radial-gradient(circle at center, #635376, #111346);*/
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
    position: relative;
  }

  .container h3 {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #fff;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    z-index: 100;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
    outline: none;
    position: absolute;
    overflow: hidden;
  }

  .aside_reset {
    margin: 20px 24px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .ctrl {
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 200px;
  }

  .noclick {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
