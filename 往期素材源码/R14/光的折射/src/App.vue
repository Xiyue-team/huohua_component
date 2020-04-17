<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <modify-device @isLandscape="changeLandscape"></modify-device>
      <div id="renderCanvas"></div>
    </div>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="ctrl">
      <ui-btn type="switch" v-model="checked" class="switch" :class="click?'':'noclick'">辅助线</ui-btn>
      <ui-btn type="switch" v-model="checked1" class="switch" :class="click?'':'noclick'">量角器</ui-btn>
    </div>
    <!--侧边按钮区-->
  </div>
</template>
<script>
  import common from '@/common/common'; //引入公共函数;
  import modifyDevice from '@/components/UI/modifyDevice';
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  let {sin, cos, PI, tan} = Math;
  let RADIUS = 330;
  const H = 700;
  const MAIN_COLOR = '#fff';
  export default {
    name: 'app',
    components: {
      modifyDevice,
      uiHead,
      uiBtn,
    },
    data() {
      return {
        title: '光的折射',
        isLandscape: true,
        checked: false,
        angle: 150,
        checked1: false,
        angleD: 180 / Math.PI * Math.asin(Math.sin(60 / 180 * Math.PI) / 1.33),
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
      changeLandscape(bool) {
        this.isLandscape = bool;
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
          effectFXAA,
          bloomPass,
          renderScene,
          hdrCubeMap,
          composer,
          standardMaterial,
          hdrCubeRenderTarget,
          mousedownflag = false,
          laserBg = null,
          lineGroup = null,   //线的组
          isAnimating = false,
          comObj = {},
          cylinderLight = null,
          cylinderLight1 = null,
          cylinderLight2 = null,
          jiguangGroup = new THREE.Group(),
          offsetLeft = parseInt($('#renderCanvas').offset().left),
          offsetTop = parseInt($('#renderCanvas').offset().top),
          airText = null,
          waterText = null,
          laserPen = null;

        comObj.cylinderGroup = new THREE.Group();
        comObj.cylinderGroup1 = new THREE.Group();
        comObj.cylinderGroup2 = new THREE.Group();

        if (!Detector.webgl) Detector.addGetWebGLMessage();
        let params = {
          projection: 'normal',
          background: true,
          exposure: 0.95,
          bloomStrength: 1,
          bloomThreshold: 2,
          bloomRadius: 1
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
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 820;
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
        $("#renderCanvas").append(renderer.domElement);

        //TODO  计算位置函数
        let calcPos = (angle) => {
          let rad = common.radian(angle);
          let x = RADIUS * cos(rad);
          let y = RADIUS * sin(rad);
          return [x, y, rad];
        };

        //TODO 导入模型函数
        function modelPut(obj, mtl, callback) {
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
              laserPen = object;
              laserPen.scale.set(10, 10, 10);
              laserPen.rotation.y = Math.PI / 2;
              jiguangGroup.add(laserPen);
              scene.add(jiguangGroup);

              callback && callback();
            }, onProgress, onError);
          });
        }

        let initScene = () => {
          airText = common.createText('空气', 300, 200, 0, MAIN_COLOR, 50 * calc1);
          waterText = common.createText('水', 300, -200, 0, MAIN_COLOR, 50 * calc1);
          scene.add(airText, waterText);
          //TODO 激光笔区域位置
          laserBg = common.createSphere(50, {color: '#ff0', opacity: 0});
          scene.add(laserBg);
          let [x, y, rad] = calcPos(this.angle);
          laserBg.position.set(x, y, 0);

          jiguangGroup.position.set(x, y, 0);
          jiguangGroup.rotation.z = -Math.PI / 2 + rad;

          comObj.staticGroup = new THREE.Group();
          //TODO 法线线条
          let line = common.createStraightLine([[0, H / 2.3, 0], [0, -H / 2.3, 0]], {
            style: 2,
            color: "#ff0"
          });
          //法线文字
          let text = common.createText('法线', 40, 280, 0, MAIN_COLOR, 50 * calc1);
          comObj.staticGroup.add(line, text);

          //背景贴图
          comObj.bgPlane = common.createImg([0, 0, -20], 2048, 1024, 'static/UI/bg.png');
          scene.add(comObj.bgPlane);

          //光线单位向量
          cylinderLight = common.createCylinder(2, 2, 300, {
            color: '#ff0'
          });
          cylinderLight.position.y = 198;
          scene.add(cylinderLight);
          comObj.cylinderGroup.add(cylinderLight);

          cylinderLight1 = common.createCylinder(2, 2, 300, {
            color: '#ff0'
          });
          cylinderLight1.position.y = 150;
          comObj.cylinderGroup1.add(cylinderLight1);

          //折射线条
          cylinderLight2 = common.createCylinder(2, 2, 300, {color: '#ff0'});
          cylinderLight2.position.y = -150;
          scene.add(cylinderLight2);
          comObj.cylinderGroup2.add(cylinderLight2);

          //构建量角器
          comObj.liangjiaoqi = common.createImg([0, 200, -1], 512, 512, 'static/UI/Protractor.png');

          comObj.liangjiaoqi.position.set(0, 0, 0);

          //提示
          comObj.tipImg = common.createImg([-300, 220, 10], 266, 60, 'static/UI/tip.png');

          //遮罩层
          comObj.maskGroup = new THREE.Group();
          comObj.mask = common.createPlane(2000, 2000, {
            opacity: 0.3,
            color: '#fff'
          });
          comObj.mask.position.set(0, 0, 200);
          comObj.maskGroup.add(comObj.mask, comObj.tipImg);

          scene.add(comObj.maskGroup);

          setTimeout(() => {
            scene.remove(comObj.maskGroup);
            selectobjs.push(laserBg);
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
        modelPut('jiguangbi.obj', 'jiguangbi.mtl', initScene);

        //TODO 移动激光笔
        let moveLaser = (x, y) => {
          x = x > 0 ? 0 : x;
          let ang = Math.atan2(y, x);
          x = (RADIUS * Math.cos(ang)).toFixed(3) - 0;
          y = (RADIUS * Math.sin(ang)).toFixed(3) - 0;
          if (x > 0) {
            return;
          }
          laserBg.position.set(x, y, 0);
          jiguangGroup.position.set(x, y, 0);
          jiguangGroup.rotation.z = -Math.PI / 2 + ang;
          this.angle = common.angle(ang).toFixed(3) - 0;

          if (lineGroup != null) {
            let airWater = Math.asin(Math.sin(ang - 90 / 180 * Math.PI) / 1.33).toFixed(3) - 0;
            let waterAir = (Math.asin(Math.sin(ang - 270 / 180 * Math.PI) / (1 / 1.33)) + Math.PI).toFixed(3) - 0;
            laserLine(y, ang, airWater, waterAir);
            if (y >= 0) {
              this.angleD = airWater;
            } else {
              this.angleD = waterAir;
            }
            this.angleD = common.angle(this.angleD).toFixed(3) - 0;
            if (this.checked) {
              showAssist(x, y, this.angle, this.angleD);
            }
          }
        };

        //TODO 辅助线
        let toggleAssist = (bool) => {
          if (!bool) {
            scene.remove(comObj.staticGroup, comObj.dynamicGroup);
          } else {
            scene.add(comObj.staticGroup);
            let x = laserBg.position.x;
            let y = laserBg.position.y;
            showAssist(x, y, this.angle, this.angleD);
          }
        };

        //TODO  量角器
        let toggleLiangjiaoqi = (bool) => {
          bool ? scene.add(comObj.liangjiaoqi) : scene.remove(comObj.liangjiaoqi);
        };

        //激光线条
        let laserLine = (y, angle, airWater, waterAir) => {
          comObj.cylinderGroup.rotation.z = -Math.PI / 2 + angle;
          comObj.cylinderGroup1.rotation.z = Math.PI / 2 - angle;
          if (y === 0) {

            comObj.cylinderGroup2.visible = false;
            // comObj.cylinderGroup1.scale.set(1.5, 1, 1);
          } else if (y > 0) {
            comObj.cylinderGroup2.rotation.z = airWater;
            comObj.cylinderGroup2.visible = true;
            comObj.cylinderGroup1.scale.set(1, 1, 1);
          } else {
            // comObj.cylinderGroup1.scale.set(1.5, 1, 1);
            comObj.cylinderGroup2.visible = true;
            if (angle >= -2.422 && angle < -2.418) {
              comObj.cylinderGroup2.rotation.z = Math.PI / 2;
            } else {
              comObj.cylinderGroup2.rotation.z = waterAir;
            }
          }
        };
        //缩放光线
        let scaleLine = (obj, bool, group) => {
          return new Promise((resolve) => {
            let num = 0;

            function scale() {
              num += 0.04;
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
        };
        //点击激光笔 发射光线
        let lineAni = (x, y, ang) => {
          scene.remove(lineGroup);
          lineGroup = new THREE.Group();
          this.click = true;
          isAnimating = true;
          let rad = common.radian(ang);
          comObj.cylinderGroup.rotation.z = -Math.PI / 2 + rad;
          comObj.cylinderGroup1.rotation.z = Math.PI / 2 - rad;

          this.angleD = 0.709;
          comObj.cylinderGroup2.rotation.z = this.angleD;

          this.angleD = common.angle(this.angleD).toFixed(3) - 0;
          if (this.checked) {
            showAssist(x, y, this.angle, this.angleD);
          }

          lineGroup.add(comObj.cylinderGroup);
          //缩放光线
          scaleLine(cylinderLight, true, comObj.cylinderGroup).then(() => {
            lineGroup.add(comObj.cylinderGroup1, comObj.cylinderGroup2);
            scaleLine(comObj.cylinderGroup1, false, comObj.cylinderGroup1).then(() => {
              isAnimating = false;
            });
            scaleLine(comObj.cylinderGroup2, false, comObj.cylinderGroup2).then(() => {
              isAnimating = false;
            })
          });

          scene.add(lineGroup);
        };
        let showAssist = (x, y, angle, angleD) => {
          if (comObj.dynamicGroup) {
            scene.remove(comObj.dynamicGroup);
          }
          comObj.dynamicGroup = new THREE.Group();
          let angle1, angle2, text11, text22;
          //TODO 入射-反射
          if (angle > 90 && angle < 180) {
            [angle1, text11] = drawAngle(90, angle, 60, MAIN_COLOR, '#fff', '入射角');
            comObj.dynamicGroup.add(angle1, text11);
          } else if (angle > -180 && angle < -90) {
            [angle1, text11] = drawAngle(angle, -90, 60, MAIN_COLOR, '#0f0', '入射角');
            comObj.dynamicGroup.add(angle1, text11);
          }

          //TODO 折射
          if (angleD > 0 && angleD < 50) {
            [angle2, text22] = drawAngleD(270, 270 + angleD, 60, MAIN_COLOR, '#fff', '折射角', true);
            comObj.dynamicGroup.add(angle2, text22);
          } else if (angleD < 180 && angleD > 90) {
            [angle2, text22] = drawAngleD(0, 180 - angleD, 60, MAIN_COLOR, '#0f0', '折射角', false);
            angle2.rotation.z = Math.PI / 180 * (90 - (180 - angleD));
            text22.rotation.z = Math.PI / 180 * (90 - (180 - angleD)) / 2;
            comObj.dynamicGroup.add(angle2, text22);
            if (angle >= -90) {
              text22.visible = false;
            } else {
              text22.visible = true;
            }
          }
          let text = common.createText('入射光线', x / 1.4, y / 1.4 - 45, 0, MAIN_COLOR, 50 * calc1);
          let text1 = common.createText('反射光线', -x / 1.4, y / 1.4 - 45, 0, MAIN_COLOR, 50 * calc1);
          let text2 = common.createText('折射光线', -x / 1.4, -y / 1.6 - 70, 0, MAIN_COLOR, 50 * calc1);
          if (angle === 90 || angle === -90) {
            text2.visible = false;
            text1.visible = false;
          }
          if (isNaN(angleD)) {
            text2.visible = false;
          }
          //判断当入射角度在这个范围
          if (y <= 3 && y >= 0) {
            angle2.visible = false;
            text22.visible = false;
            text2.visible = false;
            text1.visible = false;
          }
          if (y === 330 || y === -330) {
            text2.visible = false;
          }
          comObj.dynamicGroup.add(text, text1, text2);
          scene.add(comObj.dynamicGroup);
        };
        let drawAngleD = (startangle, endangle, size, color, circleColor, font, bool) => {
          let dx, dy, vertices = [];
          let obj = new THREE.Object3D();
          for (let i = startangle; i < endangle; i += 2) {
            dx = size * Math.cos(Math.PI / 180 * i);
            dy = size * Math.sin(Math.PI / 180 * i);
            vertices.push(dx, dy, 0);
          }
          if (!vertices.length) return obj;
          let line = common.createLineMesh(vertices, color, 3, calc2);
          let angleD;
          if (bool) {
            angleD = (endangle - startangle) / 2 + startangle;
          } else {
            angleD = 90 - endangle / 2;
          }

          let text = common.createText(font, (size + 28) * cos(common.radian(angleD)), (size + 28) * sin(common.radian(angleD)) + 20, 2, MAIN_COLOR, 30 * calc1);
          obj.add(line);
          return [obj, text];
        };

        let drawAngle = (startangle, endangle, size, color, circleColor, font, index = 0) => {
          let dx, dy, vertices = [];
          let obj = new THREE.Object3D();
          for (let i = startangle; i < endangle; i += 2) {
            dx = size * Math.cos(Math.PI / 180 * i);
            dy = size * Math.sin(Math.PI / 180 * i);
            vertices.push(dx, dy, index);
          }
          if (!vertices.length) return obj;
          let line = common.createLineMesh(vertices, color, 3, calc2);
          let angle = (endangle - startangle) / 2 + startangle;
          let text = common.createText(font, (size + 40) * cos(common.radian(angle)), (size + 40) * sin(common.radian(angle)), 2, MAIN_COLOR, 30 * calc1);
          obj.add(line);
          return [obj, text];
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
            if (lineGroup) {
              return;
            }
            //触发光线动画
            let x = laserBg.position.x;
            let y = laserBg.position.y;
            let ang = common.angle(Math.atan2(y, x));
            lineAni(x, y, ang);
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
              if (INTERSECTED !== intersects[0].object) {
                INTERSECTED = intersects[0].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
              }
            }
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset), x, y;
              x = obj.x.toFixed(3) - 0;
              y = obj.y.toFixed(3) - 0;
              if (y > -10 && y < 10) {
                y = 0;
              }
              moveLaser(x, y);
            }
          }
        };
        let onDocumentMouseUp = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
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
              //触发光线动画
              if (lineGroup) {
                return;
              }
              let x = laserBg.position.x;
              let y = laserBg.position.y;
              let ang = common.angle(Math.atan2(y, x));
              lineAni(x, y, ang);
            }
          }
        };
        let onDocumentTouchMove = (event) => {
          event.preventDefault();
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
          if (mousedownflag) {
            if (raycaster.ray.intersectPlane(plane, intersection)) {
              let obj = intersection.sub(offset),
                x, y;
              x = obj.x.toFixed(3) - 0;
              y = obj.y.toFixed(3) - 0;
              if (y > -10 && y < 10) {
                y = 0;
              }
              moveLaser(x, y);
            }
          }
        };
        let onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;
        };
        let animate = () => {
          requestAnimationFrame(animate);
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
          if (this.click) {
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
          this.click = false;
          isAnimating = false;
          this.checked = false;
          this.checked1 = false;
          if (lineGroup) {
            cancelAnimationFrame(lineGroup.timer);
          }
          scene.remove(lineGroup);
          setTimeout(function () {
            lineGroup = null;
          }, 20);
          camera.position.set(0, 0, 820);
          camera.lookAt(0, 0, 0);
          this.angle = 150;
          this.angleD = 180 / Math.PI * Math.asin(Math.sin(60 / 180 * Math.PI) / 1.33);
          let [x, y, rad] = calcPos(this.angle);
          laserBg.position.set(x, y, 0);
          jiguangGroup.position.set(x, y, 0);
          jiguangGroup.rotation.z = -Math.PI / 2 + rad;
        };
        let TO = function () {
          return {
            reset: resetWidget,
            toggleAssist: toggleAssist,
            toggleLiangjiaoqi: toggleLiangjiaoqi
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
    /*background-image: radial-gradient(circle at center, #174d89, #1a2e45);*/
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
  }

  .container h3 {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #fff;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    z-index: 100;
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
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  canvas {
    position: absolute;
    z-index: 98;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  #app .aside_reset {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999999;
  }

  .ctrl {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 200px;
    z-index: 99;
  }

  .switch {
    background: rgba(74, 74, 74, 0.60) !important;
    border: 0 solid rgba(0, 0, 0, 0.10) !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15) !important;
    border-radius: 6px !important;
  }

  .switch > p {
    color: #ffffff !important;
  }

  .noclick {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
