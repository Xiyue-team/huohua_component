/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */

import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import { Scene } from 'three';

import * as ddd from '../sub_static/model3/animation_end.fbx';
import * as laba from '../sub_static/ANIMATION_END.fbx';
import * as speakerBin from '../sub_static/model3/yangshengqi.bin';
import * as speakerGltf from '../sub_static/model3/yangshengqi.gltf';
import * as material0 from '../sub_static/model3/Material_127_baseColor.png';
import * as material1 from '../sub_static/model3/Material_128_baseColor.png';
import * as material2 from '../sub_static/model3/Material_129_baseColor.png';
import * as material58 from '../sub_static/model3/Material_130_baseColor.png';
import * as material59 from '../sub_static/model3/Material_170_baseColor.png';
import * as music from '../sub_static/media1.mp4';
import { AnimationMixer } from 'three';
import { AnimationAction } from 'three';
import { Clock } from 'three';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';

export class Volume3DModel extends ThreeBase {
  browserInfo: BrowserInfo;

  private orbit: any;

  public animation: any;
  model3dAnimation: Model3dAnimation;

  private mixer: AnimationMixer;
  private action: AnimationAction;
  private clock: Clock = new THREE.Clock();

  private context: any;

  private buffer: any;
  gainNode: any;

  private render = () => {

    requestAnimationFrame(this.render);

      if (this.model3dAnimation) {
          this.model3dAnimation.renderModel();
          this.playFrameAnimation();
      }


      this.renderer.render(this.scene, this.camera);
  }

  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.initControl();
    this.preload();
    this.initFbxLoader();
    this.render();
    this.initIosAudioPlay();
  }

  /**
   *
   * 初始化场景
   */
  initScene(): void {
    this.scene = new THREE.Scene();
  }

  /**
   * 初始化镜头
   */
  initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 400);
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1);

    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    // this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbit.enableZoom = false;
    // // 使动画循环使用时阻尼或自转 意思是否有惯性
    // this.orbit.enableDamping = true;
    // //是否可以缩放
    // this.orbit.enableZoom = false;
    // //是否可以旋转
    // this.orbit.enableRotate = true;
    // //是否自动旋转
    // this.orbit.autoRotate = false;
    // //设置相机距离原点的最远距离
    // this.orbit.minDistance = 1;
    // //设置相机距离原点的最远距离
    // this.orbit.maxDistance = 4000;
    // //是否开启右键拖拽
    // this.orbit.enablePan = false;
  }

  /**
   * 初始化光源
   */
  initLight(): void {

    this.lights = [];
    this.lights.push(new THREE.AmbientLight(0xffffff, 1));
    this.scene.add(this.lights[0]);
    const directionalLight4 = new THREE.HemisphereLight('#ffffff', '#ffffff', 0.7);
    directionalLight4.color.setHSL(.6, 1, .6);
    directionalLight4.groundColor.setHSL(.095, 1, .75);
    directionalLight4.position.set(0, 0, 0);
    this.scene.add(directionalLight4);
    const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
    c.position.set(200, 2000, 100);
    const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
    u.position.set(-200, -2000, -100);
    this.scene.add(c);
    this.scene.add(u);
  }

  preload() {
    console.log(speakerBin);
    console.log(laba);
    console.log(speakerGltf);
    console.log(material0);
    console.log(material1);
    console.log(material2);
    console.log(material58);
    console.log(material59);
    console.log(music);
  }


  async initFbxLoader() {

      const jt: any = await this.fbxLoader(laba as any);

      console.log(jt);
      jt.scale.set(15, 15, 15);

      this.model3dAnimation = new Model3dAnimation(jt);


      setTimeout(() => {
          this.model3dAnimation.playAnimation();
      }, 1000);

      this.scene.add(jt);
  }

  /*
  * ios声音控制适配
  * */
  initIosAudioPlay() {
    this.initAudio();
    if (this.browserInfo.isIpad) {
      (window as any).viewHandler.viewModel.$data.isShow = true;
    }
  }

  initAudio() {
    let audioBuffer: any = null;
    if (typeof (window as any).webkitAudioContext !== 'undefined' || typeof (window as any).AudioContext !== 'undefined') {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audio_ctx = new AudioContext();

      const request = new XMLHttpRequest();
      request.open('GET', (music as any), true);

      request.responseType = 'arraybuffer';

      request.onload = () => {
        audio_ctx.decodeAudioData(request.response, (buffer: any) => {
          console.log('success');
          audioBuffer = buffer;
          this.context = audio_ctx;
          this.buffer = audioBuffer;
          this.playSound();
        }, () => {
          console.log('error');
        });
      };
      request.send();
    }
  }


  playSound() {
    if (!this.context.hasOwnProperty('createGain')) {
      console.log(22);
    }
    this.gainNode = this.context.createGain();
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;

    source.connect(this.gainNode);
    source.loop = true;
    this.gainNode.connect(this.context.destination);
    source.start(0);
  }

  changeVolume(val: number) {

      if (this.gainNode) {
          this.gainNode.gain.setValueAtTime(val / 5, this.context.currentTime);
      }
  }

    //播放指定帧数的动画
    playFrameAnimation() {

        this.model3dAnimation.fromCallBack(((window as any).viewHandler.viewModel.$data.sliderNumber1 - 1) * 0.4,
            (window as any).viewHandler.viewModel.$data.sliderNumber1 * 0.4);

    }

  resumeVolume() {
    this.context.resume(this.context.currentTime);
  }

  pauseVolume() {
    this.context.suspend(this.context.currentTime);
  }

  destoryVolume() {
    this.context.close();
  }


    reset() {

        // for (let i = 0; i < 11; i++) {
        //     this.orbit.reset();
        // }
    }
  changeAnimation(val: number) {

    // for (let i = 0; i < this.animation.length; i++) {
    //
    //   if (val === (i - 1)) {
    //     this.mixer.clipAction(this.animation[i]).play();
    //   } else {
    //     this.mixer.clipAction(this.animation[i]).stop();
    //   }
    // }
  }
}
