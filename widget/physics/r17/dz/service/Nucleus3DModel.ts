/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { Group, Mesh, WebGLRenderer,Scene } from 'three';
import { TweenMax, Power0 } from 'gsap';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { CommonUtil } from '../../../../../src/util/CommonUtil';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import * as xPath from '../sub_static/x.png';
import * as xPointPath from '../sub_static/point.png';
import  b7b from '../sub_static/blinn7_baseColor.png'
import b7e from '../sub_static/blinn7_emissive.jpg';
import jb from '../sub_static/jiantou_baseColor.jpg';
import je from '../sub_static/jiantou_emissive.jpg';
import * as tx1 from '../sub_static/dzgj4.bin';
import  * as tx2 from '../sub_static/dzgj4.gltf';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import {ModelAnimationGroup} from "../../../../../src/three/component/ModelAnimationGroup";
let thiz:any;
export class Nucleus3DModel extends ThreeBase {

  browserInfo: BrowserInfo;
  //原子核
  nucleusModel: any;
  //α粒子
  alphaModel: any;
  mark: any;
  scene1:any;
  testModel:any;
  animation1: any;
  group:any;
  markZ:any;
  vs:any;
  fs:any;
  t = 1.046;
  //电子
  private electronModel: any;
  //反电子中微子
  private antineutrinoModel: any;
  //磁感线X
  private magneticX: any = [];
  //磁感线圆点
  private magneticPoint: any = [];
  //磁感线本身
  private magneticLine: any = [];

  private magentAorrowG: any = [];
  //是否是匀强磁场
  uniformMagnetic = true;
  //磁场的起始点
  magneticBeginX = -25;
  magneticBeginY = 15;
  //运动轨迹半径
  radius = 6;
  //粒子显示区域
  magneticRangeX = -31;
  magneticRangeY = 21;
  cameraZ: number;
  time0=0;

  //螺旋初始点
  private startPosition: any;
  /*
  * alpha粒子衰变动画
  * */
  //alphal粒子螺旋动画初始值
  private alphaTween = {
    x: 0,
    y: 0,
    angle: Math.PI,
    z: 0
  };
  uniforms = {
        "fraction" : { value: 1.046 }
    };
  //非匀强磁场随机射出粒子动画
  alphaRandomTween: any;
  ge:any;
  //匀强磁场螺旋动画
  alphaCircleTween: any;
  //匀强磁场切线动画
  alphaLineTween: any;
  /*
  * Beta粒子衰变动画
  * */
  //Beta电子螺旋运动初始值
  private betaTween = {
    x: 0,
    y: 0,
    angle: Math.PI,
    z: 0
  };
  //反电子中微子动画
  antineutrinoTween: any;
  //beta电子随机发射动画
  betaRandomTween: any;
  //beta电子螺旋动画
  betaCircleTween: any;
  //beta电子切线动画
  betaLineTween: any;

  //记录上一个位置的点
  lastPositionX: number;

  //alpha初始状态
  initAlphaStatus = true;
  //beta电子初始状态
  initBetaStatus = true;
  cameraAnimation:any;

  //按钮控制
  button: any;
  time1:any

  //螺旋运动圆心
  centerPoint = {x: 0, y: 0};


  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.browserInfo = BrowserUtil.getBrowserInfo();
    this.button = (window as any).viewHandler.viewModel.$data;
    this.init();
  }

  async init() {
    thiz = this;
    this.markZ = 0;
    this.mark = 0;
    this.group = new THREE.Group();
    this.vs =[
        "attribute float distance;",
      "varying float vDistance;",
      "varying vec3 vNormal;",
      "varying vec3 vViewPosition;",
      "void main() {",
         "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
         "vDistance = distance;",
          "vNormal = normalize( normalMatrix * normal );",
          "vViewPosition =  mvPosition.xyz;",
          "gl_Position = projectionMatrix * mvPosition;",
      "}",
      ].join("\n");
    this.fs=[
        "uniform float fraction;",

      "varying float vDistance;",
      "varying vec3 vNormal;",
      "varying vec3 vViewPosition;",

      "void main() {",

          "if ( vDistance > fraction ) {",

          "vec3 color = vec3( 1.0, 0.1, 0.1 );",

          // hack in a fake pointlight at camera location, plus ambient
          "vec3 normal = normalize( vNormal );",
          "vec3 lightDir = normalize( vViewPosition );",

          "float dotProduct = max( dot( normal, lightDir ), 0.0 ) + 0.2;",

          // trick to make the clipped ends appear solid
          "gl_FragColor =  vec4( color, 1.0 );}",
        "else{" ,
        'discard;',
        "}",

      "}"
    ].join("\n");
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initMagentic();
    this.initGltfLoader();
    this.initWebGLRenderer();
    this.initControl();
    this.preload();
    this.render();
    this.initMobileLayer();


  }
  tvin(){
      const tween = {

          y: -0.5,

      };
      this.cameraAnimation = TweenMax.to(tween, 28.7, {

          y: 0,


          onStart: () => {

          },
          onUpdate: () => {

              // this. Animate( this.testModel.children[0].children[0].material.map, false, tween.y);
              this.testModel.children[0].children[0].material.map.wrapT=THREE.RepeatWrapping;


              this.testModel.children[0].children[0].material.map.offset.y=tween.y;


              this.testModel.children[0].children[0].material.map.needsUpdate=true
          },
          onComplete: () => {

          },
          paused: true,
          Ease:1,
      });
  }

  initScene(): void {
    this.scene = new THREE.Scene();

  }

  /** 初始化镜头 **/
  initCamera(): void {



        const left = this.width / -20;
        const right = this.width / 20;
        const top = this.height / 20;
        const bottom = this.height / -20;
        const near = 1;
        const far = 10000;

        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 55);


        this.cameraZ = this.camera.position.z;




  }

  initMobileLayer() {
    if (this.browserInfo.isMobile) {
      (window as any).viewHandler.viewModel.$data.isMobile = true;
      if ((window as any).viewHandler.viewModel.$data.isFold) {
        (window as any).viewHandler.viewModel.$data.isAppear = true;
      } else {
        (window as any).viewHandler.viewModel.$data.isAppear = false;
      }

    } else {
      (window as any).viewHandler.viewModel.$data.isMobile = false;
      (window as any).viewHandler.viewModel.$data.isAppear = true;
    }
  }

  preload() {

      console.log(tx1);
      console.log(b7b);
      console.log(b7e);
      console.log(jb);
      console.log(je);

  }

  /** 创建磁感线 **/
  initMagentic() {
    /* 1.磁感线圆柱 */
    const line1 = new THREE.CylinderGeometry(0.1, 0.1, 20, 40, 40);
    //圆柱材质
    const material = new THREE.MeshPhongMaterial({
      color: '#00E3E3',
      //材质自发光颜色色
      side: THREE.DoubleSide,
      flatShading: true
    });
    //圆柱
    const cube = new THREE.Mesh(line1, material);
    cube.rotateX(Math.PI / 2);

    /* 2.磁感线本身 */
    //圆柱顶部×  '../sub_static/x.png'
    const xMap = new THREE.TextureLoader().load(xPath as any);
    const geometry = new THREE.CircleGeometry(0.5, 32);
    //顶部x 材质·
    const material2 = new THREE.MeshPhongMaterial({
      color: 0XFFFFFF,
      //材质自发光颜色色 emissive: 0x072534,
      side: THREE.FrontSide,
      map:xMap,
      flatShading: true
    });
    //圆圈1
    const circle = new THREE.Mesh(geometry, material2);
    circle.position.z = 10;

    /* 3.磁感线圆点  */
    const pMap = new THREE.TextureLoader().load(xPointPath as any);
    const pointGeometry = new THREE.CircleGeometry(0.5, 32);
    const pointMaterial = new THREE.MeshPhongMaterial({
      color:'#00E3E3',
      side: THREE.BackSide,
      map: pMap,
      flatShading: true
    });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    point.position.z = -10.001;

    /* 箭头*/
    const  aorrowGeometry = new THREE.CylinderGeometry(0, 0.2, 2, 40, 40, false);
    const  aorrowMaterial = new THREE.MeshPhongMaterial({color: '#00E3E3',
        //材质自发光颜色色
        side: THREE.DoubleSide,
        flatShading: true});
    const aorrow = new THREE.Mesh(aorrowGeometry, aorrowMaterial);
    aorrow.rotateX(-Math.PI / 2);
    aorrow.position.z = -10.1;


    const row = 6, col = 8;
    for (let i = 0; i < row; i++) {
      const y = this.magneticBeginY - i * 6;
      for (let j = 0; j < col; j++) {
        const x = this.magneticBeginX + j * 7;
        //创建磁感线
        const magentCube = cube.clone();
        const magentCircle = circle.clone();
        const magentPoint = point.clone();
        const magentAorrow = aorrow.clone();

        magentCircle.position.x = x;
        magentCircle.position.y = y;
        magentCircle.visible = true;

        magentCube.position.x = x;
        magentCube.position.y = y;
        magentCube.visible = true;

        magentPoint.position.x = x;
        magentPoint.position.y = y;
        magentPoint.visible = true;

        magentAorrow.position.x = x;
        magentAorrow.position.y = y ;
        magentAorrow.visible = true;

        this.magentAorrowG.push(magentAorrow);
        this.magneticX.push(magentCircle);
        this.magneticLine.push(magentCube);
        this.magneticPoint.push(magentPoint);

          this.group.add(magentAorrow);
          this.group.add(magentCube);
          this.group.add(magentCircle);
          this.group.add(magentPoint);
      }
    }
  }

  /**加载模型*/
  async initGltfLoader() {

      const tesM: any = await this.gltfLoader(tx2 as any);
      tesM.scene.traverse((child: any) => {
          if (child instanceof Scene) {
              this.testModel = child;
              this.testModel.scale.set(1, 1, 1);
              this.testModel.rotateX ( Math.PI / 2);
              this.testModel.visible = true;
              this.group.add(this.testModel);
              this.scene.add( this.group);
              this.testModel.position.z = 1;
              this.testModel.children[1].visible = false;
              this.testModel.children[0].children[0].visible = false;
              //
              // this.group.rotation.set(0,  Math.PI / 2 ,0)

          }
      });
      this.animation1 = new ModelAnimationGroup(tesM);
      this.animation1.setLoopOne(0);
      this.animation1.setAnimationDoubleSpeed(0, 1);
      // this. Animate( this.testModel.children[0].children[0].material.map, true, 0.5);
      this.testModel.children[0].children[0].material = new THREE.ShaderMaterial({
          uniforms        : this.uniforms,
          vertexShader    : this.vs,
          fragmentShader  : this.fs,
          side: THREE.DoubleSide
      });
      let numVertices =  this.testModel.children[0].children[0].geometry.attributes.position.count;
      let distance = new Float32Array( numVertices * 1 ); // 1 value per vertex
      this.testModel.children[0].children[0].geometry.addAttribute( 'distance', new THREE.BufferAttribute( distance, 1 ) );

      // populate attribute
      for ( var i = 0, l = numVertices; i < l; i ++ ) {

          // set new attribute
          distance[ i ] = ( this.testModel.children[0].children[0].geometry.attributes.position.getY( i ) + 10 ) / 20;

          // wiggle geometry a bit while we're at it



      }


      // this.animation1.repeatPlayAnimatoin(0);

    //alpha 粒子
  }


  /**初始化渲染器*/
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      //背景透明
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(this.width, this.height);
    const element = this.domElement.appendChild(this.renderer.domElement);
  }

  /**初始化控制器*/
  initControl(): void {
    const orbit = new OrbitControls(this.camera, this.renderer.domElement);
    orbit.enableZoom = true;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    orbit.enableDamping = true;
    //是否可以缩放
    orbit.enableZoom = true;
    //是否自动旋转
    orbit.autoRotate = false;
    //设置相机距离原点的最远距离
    orbit.minDistance = 1;
    //设置相机距离原点的最远距离
    orbit.maxDistance = 4000;
    //是否开启右键拖拽
    orbit.enablePan = false;
  }

  /**初始化光源*/
  initLight(): void {
    this.lights = [];
    this.scene.add(new THREE.AmbientLight(0x666666));
    this.lights[0] = new THREE.DirectionalLight(0xdfebff, 1);
    this.lights[0].position.set(50, 200, 100);
    this.lights[0].position.multiplyScalar(1.3);
    this.lights[0].castShadow = true;
    this.lights[0].shadow.mapSize.width = 1024;
    this.lights[0].shadow.mapSize.height = 1024;
    const d = 300;
    (this.lights[0] as any).shadow.camera.left = -d;
    (this.lights[0] as any).shadow.camera.right = d;
    (this.lights[0] as any).shadow.camera.top = d;
    (this.lights[0] as any).shadow.camera.bottom = -d;
    (this.lights[0] as any).shadow.camera.far = 1000;

    this.lights[1] = new THREE.DirectionalLight(0xdfebff, 1);
    this.lights[1].position.set(50, -200, -100);
    this.lights[1].position.multiplyScalar(1.3);
    this.lights[1].castShadow = true;
    this.lights[1].shadow.mapSize.width = 1024;
    this.lights[1].shadow.mapSize.height = 1024;
    (this.lights[1] as any).shadow.camera.left = -d;
    (this.lights[1] as any).shadow.camera.right = d;
    (this.lights[1] as any).shadow.camera.top = d;
    (this.lights[1] as any).shadow.camera.bottom = -d;
    (this.lights[1] as any).shadow.camera.far = 1000;
    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);
  }

  private render = () => {

    if (this.browserInfo.os === 'Android') {
      setTimeout(() => {
        this.render();
      }, 1000 / 33);
    } else if (this.browserInfo.browser.toLowerCase() === 'safari') {
      setTimeout(() => {
        this.render();
      }, 1000 / 33);
    } else {
      requestAnimationFrame(this.render);
    }

    if (this.uniformMagnetic === true) {
      this.showMagnetic();
      this.enableAdsorption();
    }
    //判断alpha粒子是否超出磁感线

      if(this.markZ==1){
          if(this.animation1){

              this.animation1.renderModel();
              if(this.mark==1){
                  this.t = 1.046 -  0.06552262 * (this.animation1.clock.elapsedTime + this.time0);
                  this.testModel.children[0].children[0].material.uniforms.fraction.value = this.t;
                  if((this.animation1.clock.elapsedTime + this.time0)>16.7){
                      this.mark = 0;
                      (window as any).viewHandler.viewModel.$data.playSrc = (window as any).viewHandler.viewModel.$data.pp;
                      (window as any).viewHandler.viewModel.$data.isPlay = true;
                      this.testModel.children[1].visible = false;

                  }

              }
          }
      }

    this.renderer.render(this.scene, this.camera);



  };
    Animate(obj:any,fg :any,offset: any) {
        obj.wrapT=THREE.RepeatWrapping;
        if(fg){
            obj.offset.y+=-offset;
            obj.offset.y%=-1;
        }
        else {

            obj.offset.y=offset;
            obj.offset.y%=1;
        }

        if(obj.offset.y >=0){
            this.mark = 0;
            (window as any).viewHandler.viewModel.$data.playSrc = (window as any).viewHandler.viewModel.$data.pp;
            (window as any).viewHandler.viewModel.$data.isPlay = true;
            this.testModel.children[1].visible = false;

        }
        obj.needsUpdate=true
    }


  //是否产生吸附效果
  enableAdsorption() {
    const cameraPositionZ = this.camera.position.z;

    if (cameraPositionZ > 0 && 54.9 <= cameraPositionZ && cameraPositionZ <= 55.1) {
      this.camera.position.set(0, 0, 55);
      this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    }
    if (cameraPositionZ < 0 && -55.1 <= cameraPositionZ && cameraPositionZ <= -54.9) {
      this.camera.position.set(0, 0, -55);
      this.camera.rotation.set(-3.14, 0.015, 3.14);
    }
    if (this.camera.position.z === this.cameraZ) {
      this.showMagneticX();
      this.hideMagnetic();
    } else if (this.camera.position.z === -this.cameraZ) {
      this.showMageneticPoint();
      this.hideMagneticX();
    } else {
      this.hideMageneticPoint();
      this.hideMagneticX();
      this.showMagnetic();
    }
  }
  rest(){
      this.mark = 0;
      this.testModel.children[1].visible = false;
      this.testModel.children[0].children[0].visible = false;
      this.t = 1.046;
      this.time0 = 0;
      this.testModel.children[0].children[0].material.uniforms.fraction.value = 1.046;
      this.animation1.resetAnimation();
      (window as any).viewHandler.viewModel.$data.isPlay = false;
      this.animation1.clock.stop();
      this.resetCamera();

  }
  play(){
      this.testModel.children[0].children[0].visible = true;

      this.animation1.clock.start();

  }
  pause(){
      this.animation1.clock.stop();
      this.time0= this.animation1.clock.elapsedTime + this.time0
  }

  //显示磁感线
  private showMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = true;
    }
  }
  //隐藏磁感线
  private hideMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = false;
    }
  }

  //显示磁感线底部x
  private showMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = true;
    }
  }
  //隐藏磁感线底部X
  private hideMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = false;
    }
  }

  //显示磁感线顶部圆点
  private showMageneticPoint(): void {
    for (let i = 0; i < this.magneticPoint.length; i++) {
      (this.magneticPoint[i] as THREE.Object3D).visible = true;
    }
  }
  //显示磁感线顶部圆点
  private hideMageneticPoint(): void {
    for (let i = 0; i < this.magneticPoint.length; i++) {
      (this.magneticPoint[i] as THREE.Object3D).visible = false;
    }
  }



  //alpha非匀强磁场动画


  //暂停alpha衰变动画（暂停）
  pauseAlphaAnimation() {
    //暂停射出动画
    if (this.getAlphaRandomComplete()) {this.alphaRandomTween.pause(); }
    //匀强磁场螺旋动画
    if (this.getAlphaCircleComplete()) {this.alphaCircleTween.pause(); }
    //匀强磁场切线动画
    if (this.getAlphaLineComplete()) {this.alphaLineTween.pause(); }
  }

  //返回alpha螺旋动画状态
  getAlphaCircleComplete(): boolean {
    return this.alphaCircleTween && this.alphaCircleTween.progress() > 0 && this.alphaCircleTween.progress() < 1;
  }
  //返回alpha发射动画状态
  getAlphaRandomComplete(): boolean {
    return this.alphaRandomTween && this.alphaRandomTween.progress() > 0 && this.alphaRandomTween.progress() < 1;
  }
  //返回alpha切线动画状态
  getAlphaLineComplete(): boolean {
    return this.alphaLineTween && this.alphaLineTween.progress() > 0 && this.alphaLineTween.progress() < 1;
  }

  /***************************beta动画区******************************************************************************************/

  //beta电子的螺旋动画


  resetCamera() {
    this.camera.position.set(0, 0, 55);
    this.cameraZ = this.camera.position.z;
    this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
    (this.camera as any).zoom = 1;
    (this.camera as any).updateProjectionMatrix();
  }

}
