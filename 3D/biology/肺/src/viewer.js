const THREE = window.THREE = require('three');
const Stats = require('../lib/stats.min');
const dat = require('dat.gui');
const environments = require('../assets/environment/index');
const createVignetteBackground = require('three-vignette-background');

require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/loaders/DRACOLoader');
require('three/examples/js/loaders/DDSLoader');
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/RGBELoader');
require('three/examples/js/loaders/HDRCubeTextureLoader');
require('three/examples/js/pmrem/PMREMGenerator');
require('three/examples/js/pmrem/PMREMCubeUVPacker');

THREE.DRACOLoader.setDecoderPath('lib/draco/');

const DEFAULT_CAMERA = '[default]';

const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// glTF texture types. `envMap` is deliberately omitted, as it's used internally
// by the loader but not part of the glTF format.
const MAP_NAMES = [
  'map',
  'aoMap',
  'emissiveMap',
  'glossinessMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'specularMap',
];

const Preset = { ASSET_GENERATOR: 'assetgenerator' };

module.exports = class Viewer {

  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.haveNo = false;
    this.lights = [];
    this.content = null;
    this.mixer = null;
    this.clips = [];
    this.cameraMark = false;
    this.gui = null;
    this.caff = false;
    this.objects = null;
    this.marks = false;
    this.changs = false;
    this.labels = document.getElementById('loading');
    this.state = {
      environment: options.preset === Preset.ASSET_GENERATOR
        ? 'Footprint Court (HDR)'
        : environments[1].name,
      background: false,
      playbackSpeed: 1.0,
      actionStates: {},
      camera: DEFAULT_CAMERA,
      wireframe: false,
      skeleton: false,
      grid: false,

      // Lights
      addLights: true,
      exposure: 1.0,
      textureEncoding: 'sRGB',
      ambientIntensity: 0.3,
      ambientColor: 0xFFFFFF,
      directIntensity: 0.8 * Math.PI, // TODO(#116)
      directColor: 0xFFFFFF,
      bgColor1: '#000000',
      bgColor2: '#353535'
    };
    var ss = this.state
    var thiz = this

    this.prevTime = 0;
    this.cameraF = null;
    this.HeightC = null;
    this.exfect = [];
    var loadByHash = () => {
      var h = location.hash;
      document.getElementById('camera').style.display = 'none'
      // var h='#camera=true';
      if (h && h.indexOf('camera=true') > -1) {
        thiz.cameraF = true;
        thiz.HeightC = 210;
        document.getElementById('camera').style.display = 'block'
      } else {
        thiz.cameraF = false;
        thiz.HeightC = 136;
        document.getElementById('camera').style.display = 'none'
      }

      document.getElementById('changeSence').style.height = thiz.HeightC + 'px'
    }
    var ua = navigator.userAgent;
    this.isMob = /iPhone|iPad|Android/i.test(ua);
    if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && thiz.cameraF) {
      document.getElementById('JweixinTip').style.display = 'block';
    }
    var video = document.getElementById('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices().then(function gotDevices(deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
          var deviceInfo = deviceInfos[i];
          "videoinput" === deviceInfo.kind && ("screen-capture-recorder" === deviceInfo.label ? (thiz.cameraF = !1, thiz.HeightC = 136) : thiz.exfect.push(deviceInfo.deviceId))

        }
      }).catch(function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
      });
    }

    this.renderer = window.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
    var changeSence = function (index) {

      var index = $(this).index();

      if (index == 0 && thiz.cameraF) {
        // renderer.setClearColor(0xffffff, 0);
        try {
          if (!thiz.exfect.length > 0) {
            return
          } else {
            renderer.setClearColor(0xffffff, 0);
            // thiz.caff = false

            thiz.scene.remove(thiz.background)
          }
        } catch (e) {
          // try {
          //   if (!thiz.exfect[1]) {
          //     return
          //   } else {
          //     renderer.setClearColor(0xffffff, 0);
          //     // thiz.caff = false

          //     thiz.scene.remove(thiz.background)
          //   }
          // } catch (e) {
          //   return
          // }
        }


      } else if (index == 1) {
        // renderer.setClearColor(0xcccccc, 0);
        ss.bgColor1 = '#FFFFFF'
        thiz.background.style({ colors: [ss.bgColor1, ss.bgColor2] });

        thiz.scene.add(thiz.background)
        // this.background.material.opacity = 1

      } else if (index == 2) {
        ss.bgColor1 = '#000000'
        // this.background.material.opacity = 1
        // renderer.setClearColor(0x000000);

        thiz.scene.add(thiz.background)
        thiz.background.style({ colors: [ss.bgColor1, ss.bgColor2] }); // renderer.setClearColor(0x000000);
      }
    }
    var changeMods = function () {
      document.getElementById("change").style.color = '#FFF'
      document.getElementById("change").style.backgroundColor = '#5caefd'
      changeMod()
    }
    var changeMod = function () {
      thiz.changs = !thiz.changs
      // document.getElementById("change").style.color = '#FFF'
      // document.getElementById("change").style.backgroundColor = '#5caefd'
      thiz.content.traverse((node) => {
        if (node.isMesh) {
          if (node.name !== "polySurface36") {

            node.visible = !thiz.changs
          } else {
            node.visible = thiz.changs
          }
          if (node.name == "GUN") {
            node.visible = thiz.marks
          }
          if (node.name == "ZI") {
            node.visible = thiz.marks
          }

          if (node.name == "fei_r") {
            if (thiz.changs) {
              node.visible = false
            } else {
              node.visible = !thiz.marks
            }

          }
        }

      })
      if (thiz.changs) {
        document.getElementById("change").innerHTML = "肺"
        document.getElementById("mark").style.visibility = 'hidden'
      } else {
        document.getElementById("mark").style.visibility = 'visible'
        document.getElementById("change").innerHTML = "肺泡"
        if (thiz.marks) {
          changeMark()
        }

      }

    }
    var changeMarks = function () {
      document.getElementById("mark").style.color = '#FFF'
      document.getElementById("mark").style.backgroundColor = '#5caefd'
      changeMark();
    }
    var changeMark = function () {
      // if (this.isMob) {
      // document.getElementById("mark").style.color = '#FFF'
      // document.getElementById("mark").style.backgroundColor = '#5caefd'
      // }
      thiz.marks = !thiz.marks
      if (thiz.marks) {
        document.getElementById("mark").innerHTML = "隐藏标记"
      } else {
        document.getElementById("mark").innerHTML = "显示标记"
      }

      thiz.content.traverse((node) => {
        if (node.name == "GUN") {
          node.visible = thiz.marks
        }
        if (node.name == "ZI") {
          node.visible = thiz.marks
        }
        if (node.name == "fei_r") {

          node.visible = !thiz.marks
        }

        // if (node.name == "ZI") {
        //   node.visible = thiz.marks
        // }

      })
    }
    if (thiz.isMob) {
      $('#changeSence>div').on('touchstart', changeSence);
      $('#mark').on('touchstart', changeMarks);
      $('#change').on('touchstart', changeMods);
      $('#mark').on('touchend', () => {
        document.getElementById("mark").style.color = '#000'
        document.getElementById("mark").style.backgroundColor = '#FFF'
      });
      $('#change').on('touchend', () => {
        document.getElementById("change").style.color = '#000'
        document.getElementById("change").style.backgroundColor = '#FFF'
      });
    } else {
      $('#changeSence>div').on('click', changeSence);
      $('#mark').on('click', changeMark);
      $('#change').on('click', changeMod);
      $('#changeSence>div').on('touchstart', changeSence);
      $('#mark').on('touchstart', changeMarks);
      $('#change').on('touchstart', changeMods);
      $('#mark').on('touchend', () => {
        document.getElementById("mark").style.color = '#000'
        document.getElementById("mark").style.backgroundColor = '#FFF'
      });
      $('#change').on('touchend', () => {
        document.getElementById("change").style.color = '#000'
        document.getElementById("change").style.backgroundColor = '#FFF'
      });
    }

    loadByHash();


    this.stats = new Stats();
    this.stats.dom.height = '48px';
    [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));

    this.scene = new THREE.Scene();

    const fov = options.preset === Preset.ASSET_GENERATOR
      ? 0.8 * 180 / Math.PI
      : 60;
    this.defaultCamera = new THREE.PerspectiveCamera(fov, el.clientWidth / el.clientHeight, 0.01, 1000);
    this.activeCamera = this.defaultCamera;
    this.scene.add(this.defaultCamera);
    this.defaultCamera.z = 90

    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;
    // this.renderer.setClearColor(0xffffff);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(el.clientWidth, el.clientHeight);

    this.controls = new THREE.OrbitControls(this.defaultCamera, document.getElementById('xx'));
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = -10;
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 80;
    this.controls.enablePan = false;
    this.controls.maxDistance = 230;
    this.controls.zoomSpeed = 0.5;
    this.controls.minPolarAngle = Math.PI / 2; // radians
    this.controls.maxPolarAngle = Math.PI / 2; // radians
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.renderReverseSided = false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setFaceCulling(THREE.CullFaceFront);
    // this.controls.maxDistance = 100;

    this.background = createVignetteBackground({
      aspect: this.defaultCamera.aspect,
      grainScale: IS_IOS ? 0 : 0.001, // mattdesl/three-vignette-background#1
      colors: [this.state.bgColor1, this.state.bgColor2]
    });
    // this.background.material.transparent = true
    // this.background.scale.set(0.0001, 0.0001, 0.0001)
    this.el.appendChild(this.renderer.domElement);
    this.load('./assets/qyj/fei.gltf');
    this.cameraCtrl = null;
    this.cameraFolder = null;
    this.animFolder = null;
    this.animCtrls = [];
    this.morphFolder = null;
    this.morphCtrls = [];
    this.skeletonHelpers = [];
    this.gridHelper = null;
    this.axesHelper = null;

    this.addGUI();
    if (options.kiosk) this.gui.close();


    window.addEventListener('resize', this.resize.bind(this), false);
  }
  openCamera(id) {
    var constraints = {
      audio: false,
      video: {
        deviceId: id
      }
    }
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;

        setTimeout(() => {
          document.getElementById('loading').style.display = 'none'
        }, 1000)

      });
    } else {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia(constraints, function (stream) {
        video.srcObject = stream;
        setTimeout(() => {
          document.getElementById('loading').style.display = 'none'
        }, 1000)
      }, function (err) { });
    }
    this.cameraMark = true
  }
  animate(time) {

    requestAnimationFrame(this.animate);

    const dt = (time - this.prevTime) / 1000;

    this.controls.update();
    this.stats.update();
    this.mixer && this.mixer.update(dt);
    this.render();

    this.prevTime = time;

  }

  render() {


    this.renderer.render(this.scene, this.activeCamera);

    if (this.cameraF && this.exfect[1] && !this.caff) {

      this.scene.remove(this.background)
      if (this.cameraMark) {

      } else {
        if (this.isMob) {
          this.openCamera(this.exfect[1]);
        } else {
          this.openCamera(this.exfect[0]);
        }
      }
      this.caff = true
      // openCamera(exfect[1]);


    } else if (this.cameraF && this.exfect[0] && !this.caff) {

      this.scene.remove(this.background)
      if (this.cameraMark) {

      } else {
        if (this.isMob) {
          this.openCamera(this.exfect[1]);
        } else {
          this.openCamera(this.exfect[0]);
        }
      }

      this.caff = true
    } else {

      if (this.cameraMark) {

      } else {
        if (!this.haveNo) {
          this.background.style({ colors: ['#FFFFFF', '#353535'] });
          setTimeout(() => {
            document.getElementById('loading').style.display = 'none'


            this.scene.add(this.background)
            this.haveNo = true
          }, 1000)
        }
      }
      // ss.bgColor1 = '#FFFFFF'


    }
  }

  resize() {

    const { clientHeight, clientWidth } = this.el.parentElement;

    this.defaultCamera.aspect = clientWidth / clientHeight;
    this.defaultCamera.updateProjectionMatrix();
    this.background.style({ aspect: this.defaultCamera.aspect });
    this.renderer.setSize(clientWidth, clientHeight);

  }

  load(url) {

    const baseURL = THREE.LoaderUtils.extractUrlBase(url);

    // Load.
    return new Promise((resolve, reject) => {

      const manager = new THREE.LoadingManager();

      // Intercept and override relative URLs.
      manager.setURLModifier((url, path) => {

        const normalizedURL = url
          .replace(baseURL, '')
          .replace(/^(\.?\/)/, '');

        // if (assetMap.has(normalizedURL)) {
        //   const blob = assetMap.get(normalizedURL);
        //   const blobURL = URL.createObjectURL(blob);
        //   blobURLs.push(blobURL);
        //   return blobURL;
        // }

        return (path || '') + url;

      });

      const loader = new THREE.GLTFLoader(manager);
      loader.setCrossOrigin('anonymous');
      loader.setDRACOLoader(new THREE.DRACOLoader());
      const blobURLs = [];

      loader.load(url, (gltf) => {

        const scene = gltf.scene || gltf.scenes[0];
        scene.position.y = scene.position.y - 2
        scene.position.x = scene.position.x
        const clips = gltf.animations || [];
        this.setContent(scene, clips);
        scene.children[0].traverse((node) => {
          if (node.name == 'fei_l' || node.name == 'fei_r') {
            node.material.transparent = true;
            node.material.opacity = 1

          }
        });
        resolve(gltf);

      }, undefined, reject);

    });

  }

  /**
   * @param {THREE.Object3D} object
   * @param {Array<THREE.AnimationClip} clips
   */
  setContent(object, clips) {

    this.clear();

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    this.controls.reset();

    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    // this.controls.maxDistance = size * 0.5;
    this.defaultCamera.near = size / 100;
    this.defaultCamera.far = size * 100;
    this.defaultCamera.updateProjectionMatrix();

    if (this.options.cameraPosition) {

      this.defaultCamera.position.fromArray(this.options.cameraPosition);
      this.defaultCamera.lookAt(new THREE.Vector3());

    } else {

      this.defaultCamera.position.copy(center);
      this.defaultCamera.position.x = 0;
      this.defaultCamera.position.y += size / 5.0;
      this.defaultCamera.position.z += size / 1.5;
      this.defaultCamera.lookAt(center);

    }

    this.setCamera(DEFAULT_CAMERA);

    this.controls.saveState();

    this.content = object;
    this.scene.add(this.content);

    this.text(this.content)
    this.state.addLights = true;
    this.content.traverse((node) => {
      if (node.isLight) {
        // this.state.addLights = false;
      }
    });

    this.setClips(clips);

    this.updateLights();
    this.updateGUI();
    this.updateEnvironment();
    this.updateTextureEncoding();
    this.updateDisplay();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
    window.content = this.content;
    console.info('[glTF Viewer] THREE.Scene exported as `window.content`.');
    this.printGraph(this.content);
    if (!this.cameraF) {

      this.labels.style.display = 'none'
    }

  }

  printGraph(node) {

    console.group(' <' + node.type + '> ' + node.name);
    node.children.forEach((child) => this.printGraph(child));
    console.groupEnd();

  }

  /**
   * @param {Array<THREE.AnimationClip} clips
   */
  setClips(clips) {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }

    this.clips = clips;
    if (!clips.length) return;

    this.mixer = new THREE.AnimationMixer(this.content);
  }
  // 文字
  text(node) {
    node.traverse((node) => {
      if (node.name == "GUN") {
        node.visible = false
      }
      if (node.name == "polySurface36") {
        node.visible = false
      }
      if (node.name == "ZI") {

        node.visible = false
        node.traverse((node) => {

          if (node.isMesh) {
            node.geometry.computeBoundingBox();
            node.geometry.computeBoundingSphere()
            const pos = node.geometry.boundingSphere.center

            const x = pos.x
            const y = pos.y
            const z = pos.z

            node.geometry.center();
            node.position.set(x, y, z)


            this.controls.addEventListener('change', () => {
              // console.log(this.camera.position)


              if (this.defaultCamera.position.z > 0) {
                node.rotation.y = this.defaultCamera.rotation.y
              } else {
                node.rotation.y = Math.PI - this.defaultCamera.rotation.y
              }

            });
            // node.rotation.y = Math.PI - this.defaultCamera.rotation.y

          }

        })
      }
    })
  }
  playAllClips() {
    this.clips.forEach((clip) => {
      this.mixer.clipAction(clip).reset().play();
      this.state.actionStates[clip.name] = true;
    });
  }

  /**
   * @param {string} name
   */
  setCamera(name) {
    if (name === DEFAULT_CAMERA) {
      this.controls.enabled = true;
      this.activeCamera = this.defaultCamera;
    } else {
      this.controls.enabled = false;
      this.content.traverse((node) => {
        if (node.isCamera && node.name === name) {
          this.activeCamera = node;
        }
      });
    }
  }

  updateTextureEncoding() {
    const encoding = this.state.textureEncoding === 'sRGB'
      ? THREE.sRGBEncoding
      : THREE.LinearEncoding;
    traverseMaterials(this.content, (material) => {
      if (material.map) material.map.encoding = encoding;
      if (material.emissiveMap) material.emissiveMap.encoding = encoding;
      if (material.map || material.emissiveMap) material.needsUpdate = true;
    });
  }

  updateLights() {
    const state = this.state;
    const lights = this.lights;

    if (state.addLights && !lights.length) {
      this.addLights();
    } else if (!state.addLights && lights.length) {
      this.removeLights();
    }

    this.renderer.toneMappingExposure = state.exposure;

    if (lights.length === 2) {
      lights[0].intensity = state.ambientIntensity;
      lights[0].color.setHex(state.ambientColor);
      lights[1].intensity = state.directIntensity;
      lights[1].color.setHex(state.directColor);
    }
  }

  addLights() {
    const state = this.state;

    if (this.options.preset === Preset.ASSET_GENERATOR) {
      const hemiLight = new THREE.HemisphereLight();
      hemiLight.name = 'hemi_light';
      this.scene.add(hemiLight);
      this.lights.push(hemiLight);
      return;
    }

    const light1 = new THREE.AmbientLight(state.ambientColor, state.ambientIntensity);
    light1.name = 'ambient_light';
    this.defaultCamera.add(light1);

    const light2 = new THREE.DirectionalLight(state.directColor, state.directIntensity);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';
    this.defaultCamera.add(light2);

    this.lights.push(light1, light2);
  }

  removeLights() {

    this.lights.forEach((light) => light.parent.remove(light));
    this.lights.length = 0;

  }

  updateEnvironment() {

    const environment = environments.filter((entry) => entry.name === this.state.environment)[0];

    this.getCubeMapTexture(environment).then(({ envMap, cubeMap }) => {

      if ((!envMap || !this.state.background) && this.activeCamera === this.defaultCamera) {
        this.scene.add(this.background);
      } else {
        this.scene.remove(this.background);
      }

      traverseMaterials(this.content, (material) => {
        if (material.isMeshStandardMaterial || material.isGLTFSpecularGlossinessMaterial) {
          material.envMap = envMap;
          material.needsUpdate = true;
        }
      });

      this.scene.background = this.state.background ? cubeMap : null;

    });


  }

  getCubeMapTexture(environment) {
    const { path, format } = environment;

    // no envmap
    if (!path) return Promise.resolve({ envMap: null, cubeMap: null });

    const cubeMapURLs = [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ];

    // hdr
    if (format === '.hdr') {

      return new Promise((resolve) => {

        new THREE.HDRCubeTextureLoader().load(THREE.UnsignedByteType, cubeMapURLs, (hdrCubeMap) => {

          var pmremGenerator = new THREE.PMREMGenerator(hdrCubeMap);
          pmremGenerator.update(this.renderer);

          var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
          pmremCubeUVPacker.update(this.renderer);

          resolve({
            envMap: pmremCubeUVPacker.CubeUVRenderTarget.texture,
            cubeMap: hdrCubeMap
          });

        });

      });

    }

    // standard
    const envMap = new THREE.CubeTextureLoader().load(cubeMapURLs);
    envMap.format = THREE.RGBFormat;
    return Promise.resolve({ envMap, cubeMap: envMap });

  }

  updateDisplay() {
    if (this.skeletonHelpers.length) {
      this.skeletonHelpers.forEach((helper) => this.scene.remove(helper));
    }

    traverseMaterials(this.content, (material) => {
      material.wireframe = this.state.wireframe;
    });

    this.content.traverse((node) => {
      if (node.isMesh && node.skeleton && this.state.skeleton) {
        const helper = new THREE.SkeletonHelper(node.skeleton.bones[0].parent);
        helper.material.linewidth = 3;
        this.scene.add(helper);
        this.skeletonHelpers.push(helper);
      }
    });

    if (this.state.grid !== Boolean(this.gridHelper)) {
      if (this.state.grid) {
        this.gridHelper = new THREE.GridHelper();
        this.axesHelper = new THREE.AxesHelper();
        this.axesHelper.renderOrder = 999;
        this.axesHelper.onBeforeRender = (renderer) => renderer.clearDepth();
        this.scene.add(this.gridHelper);
        this.scene.add(this.axesHelper);
      } else {
        this.scene.remove(this.gridHelper);
        this.scene.remove(this.axesHelper);
        this.gridHelper = null;
        this.axesHelper = null;
      }
    }
  }

  updateBackground() {
    this.background.style({ colors: [this.state.bgColor1, this.state.bgColor2] });
  }

  addGUI() {

    const gui = this.gui = new dat.GUI({ autoPlace: false, width: 260, hideable: true });

    // Display controls.
    const dispFolder = gui.addFolder('Display');
    gui.domElement.style.display = 'none';
    const envBackgroundCtrl = dispFolder.add(this.state, 'background');
    envBackgroundCtrl.onChange(() => this.updateEnvironment());
    const wireframeCtrl = dispFolder.add(this.state, 'wireframe');
    wireframeCtrl.onChange(() => this.updateDisplay());
    const skeletonCtrl = dispFolder.add(this.state, 'skeleton');
    skeletonCtrl.onChange(() => this.updateDisplay());
    const gridCtrl = dispFolder.add(this.state, 'grid');
    gridCtrl.onChange(() => this.updateDisplay());
    dispFolder.add(this.controls, 'autoRotate');
    dispFolder.add(this.controls, 'screenSpacePanning');
    const bgColor1Ctrl = dispFolder.addColor(this.state, 'bgColor1');
    const bgColor2Ctrl = dispFolder.addColor(this.state, 'bgColor2');
    bgColor1Ctrl.onChange(() => this.updateBackground());
    bgColor2Ctrl.onChange(() => this.updateBackground());

    // Lighting controls.
    const lightFolder = gui.addFolder('Lighting');
    const encodingCtrl = lightFolder.add(this.state, 'textureEncoding', ['sRGB', 'Linear']);
    encodingCtrl.onChange(() => this.updateTextureEncoding());
    lightFolder.add(this.renderer, 'gammaOutput').onChange(() => {
      traverseMaterials(this.content, (material) => {
        material.needsUpdate = true;
      });
    });
    const envMapCtrl = lightFolder.add(this.state, 'environment', environments.map((env) => env.name));
    envMapCtrl.onChange(() => this.updateEnvironment());
    [
      lightFolder.add(this.state, 'exposure', 0, 2),
      lightFolder.add(this.state, 'addLights').listen(),
      lightFolder.add(this.state, 'ambientIntensity', 0, 2),
      lightFolder.addColor(this.state, 'ambientColor'),
      lightFolder.add(this.state, 'directIntensity', 0, 4), // TODO(#116)
      lightFolder.addColor(this.state, 'directColor')
    ].forEach((ctrl) => ctrl.onChange(() => this.updateLights()));

    // Animation controls.
    this.animFolder = gui.addFolder('Animation');
    this.animFolder.domElement.style.display = 'none';
    const playbackSpeedCtrl = this.animFolder.add(this.state, 'playbackSpeed', 0, 1);
    playbackSpeedCtrl.onChange((speed) => {
      if (this.mixer) this.mixer.timeScale = speed;
    });
    this.animFolder.add({ playAll: () => this.playAllClips() }, 'playAll');

    // Morph target controls.
    this.morphFolder = gui.addFolder('Morph Targets');
    this.morphFolder.domElement.style.display = 'none';

    // Camera controls.
    this.cameraFolder = gui.addFolder('Cameras');
    this.cameraFolder.domElement.style.display = 'none';

    // Stats.
    const perfFolder = gui.addFolder('Performance');
    const perfLi = document.createElement('li');
    this.stats.dom.style.position = 'static';
    perfLi.appendChild(this.stats.dom);
    perfLi.classList.add('gui-stats');
    perfFolder.__ul.appendChild(perfLi);

    const guiWrap = document.createElement('div');
    this.el.appendChild(guiWrap);
    guiWrap.classList.add('gui-wrap');
    guiWrap.appendChild(gui.domElement);
    gui.open();

  }

  updateGUI() {
    this.cameraFolder.domElement.style.display = 'none';

    this.morphCtrls.forEach((ctrl) => ctrl.remove());
    this.morphCtrls.length = 0;
    this.morphFolder.domElement.style.display = 'none';

    this.animCtrls.forEach((ctrl) => ctrl.remove());
    this.animCtrls.length = 0;
    this.animFolder.domElement.style.display = 'none';

    const cameraNames = [];
    const morphMeshes = [];
    this.content.traverse((node) => {
      if (node.isMesh && node.morphTargetInfluences) {
        morphMeshes.push(node);
      }
      if (node.isCamera) {
        node.name = node.name || `VIEWER__camera_${cameraNames.length + 1}`;
        cameraNames.push(node.name);
      }
    });

    if (cameraNames.length) {
      this.cameraFolder.domElement.style.display = '';
      if (this.cameraCtrl) this.cameraCtrl.remove();
      const cameraOptions = [DEFAULT_CAMERA].concat(cameraNames);
      this.cameraCtrl = this.cameraFolder.add(this.state, 'camera', cameraOptions);
      this.cameraCtrl.onChange((name) => this.setCamera(name));
    }

    if (morphMeshes.length) {
      this.morphFolder.domElement.style.display = '';
      morphMeshes.forEach((mesh) => {
        if (mesh.morphTargetInfluences.length) {
          const nameCtrl = this.morphFolder.add({ name: mesh.name || 'Untitled' }, 'name');
          this.morphCtrls.push(nameCtrl);
        }
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          const ctrl = this.morphFolder.add(mesh.morphTargetInfluences, i, 0, 1, 0.01).listen();
          Object.keys(mesh.morphTargetDictionary).forEach((key) => {
            if (key && mesh.morphTargetDictionary[key] === i) ctrl.name(key);
          });
          this.morphCtrls.push(ctrl);
        }
      });
    }

    if (this.clips.length) {
      this.animFolder.domElement.style.display = '';
      const actionStates = this.state.actionStates = {};
      this.clips.forEach((clip, clipIndex) => {
        // Autoplay the first clip.
        let action;
        if (clipIndex === 0) {
          actionStates[clip.name] = true;
          action = this.mixer.clipAction(clip);
          action.play();
        } else {
          actionStates[clip.name] = false;
        }

        // Play other clips when enabled.
        const ctrl = this.animFolder.add(actionStates, clip.name).listen();
        ctrl.onChange((playAnimation) => {
          action = action || this.mixer.clipAction(clip);
          action.setEffectiveTimeScale(1);
          playAnimation ? action.play() : action.stop();
        });
        this.animCtrls.push(ctrl);
      });
    }
  }

  clear() {

    if (!this.content) return;

    this.scene.remove(this.content);

    // dispose geometry
    this.content.traverse((node) => {

      if (!node.isMesh) return;

      node.geometry.dispose();

    });

    // dispose textures
    traverseMaterials(this.content, (material) => {

      MAP_NAMES.forEach((map) => {

        if (material[map]) material[map].dispose();

      });

    });

  }

};

function traverseMaterials(object, callback) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}
