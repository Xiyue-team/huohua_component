import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { DrowBorderLineHelper } from './DrowBorderLineHelper';
import { TweenMax } from 'gsap';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { MeshText2D, textAlign } from 'three-text2d';
import { Line } from '../../../../../src/three/component/Line';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

export class Threejs3dModel extends ThreeBase {
  private orbit: any;

  // 实心正方体
  solidCube: THREE.Mesh;

  // 透明正方体
  transparentCube: THREE.Mesh;

  // 两个长发体 组合成 正方体
  frontCuboid: THREE.Mesh;
  afterCuboid: THREE.Mesh;

  // 边框
  cubeBorder: any = [];
  afterCuboidBorder: any = [];
  frontCuboidBorder: any = [];

  // 完整的球、
  sphere: THREE.Mesh;

  // 两个 半球
  frontSphere: THREE.Mesh;
  afterSphere: THREE.Mesh;

  // 切割动画
  cuttingAnimation: TweenMax;

  // 判断动画是否结束
  cuttingAnimationIsEnd = false;

  // 前面四个文字
  frontText = new THREE.Group();
  afterText = new THREE.Group();

  // 文字o 和虚线
  oText: any;
  dashLine: any;

  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   *
   * @param {Element} domElement   渲染element
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.init();

  }

  init() {
    this.initScene();
    this.initCamera();

    this.initLight();
    this.initWebGLRenderer();
    this.initControl();
    this.addBall();
    this.addCube();
    this.addBorderLine();
    this.addText();
    this.addDashLine();
    this.addAnimation();
    this.render();
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
    const product = window.innerWidth / 240;
    this.camera = new THREE.OrthographicCamera( this.width / -product, this.width / product,
      this.height / product, this.height / -product, 1, 1000 );
    this.camera.lookAt(0, 0, 0);
    this.camera.position.set(150, 150, 300);
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
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.enableZoom = true;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.orbit.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    // //是否可以缩放
    this.orbit.enableZoom = true;
    //是否自动旋转
    // this.orbit.autoRotate = true;
    //设置相机距离原点的最远距离
    this.orbit.minDistance = 1;
    //设置相机距离原点的最远距离
    this.orbit.maxDistance = 4000;

    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //是否自动旋转
    this.orbit.minAzimuthAngle = -Math.PI * 2;
    this.orbit.maxAzimuthAngle = Math.PI * 2;

    this.orbit.maxPolarAngle = Math.PI;

    //是否开启右键拖拽
    this.orbit.enablePan = false;
  }

  /**
   * 初始化光源
   */
  initLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 0.05);
    dirLight.position.set(500, 500, 500);
    this.scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight('#ffffff', 0.05);
    dirLight2.position.set(-500, -500, -500);
    this.scene.add(dirLight2);
  }

  // 添加正方体  由两个长方体组成
  addCube() {
    const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#d3e7ff', side: THREE.DoubleSide  });
    this.solidCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.scene.add(this.solidCube);

    // 添加两个长方体 用于做 切割动画
    const geometry = new THREE.BoxGeometry(100, 100, 50);
    const material = new THREE.MeshBasicMaterial({ color: '#89BFFF', transparent: true, opacity: 0.38});
    this.frontCuboid = new THREE.Mesh(geometry.clone(), material.clone());
    this.afterCuboid = new THREE.Mesh(geometry.clone(), material.clone());

    this.frontCuboid.position.z = 25;
    this.afterCuboid.position.z = -25;

    this.scene.add(this.frontCuboid);
    this.scene.add(this.afterCuboid);
    this.frontCuboid.visible = false;
    this.afterCuboid.visible = false;

    // 透明正方体
    const transparentCubeMaterial = new THREE.MeshBasicMaterial({ color: '#89BFFF', transparent: true, opacity: 0.38});
    this.transparentCube = new THREE.Mesh(cubeGeometry, transparentCubeMaterial);
    this.scene.add(this.transparentCube);
    this.transparentCube.visible = false;
  }

  // 画边框
  addBorderLine() {
    const drowBorderLine = new DrowBorderLineHelper();
    const length = 50.15;
    const afterCuboidPoint = [
      new THREE.Vector3(-length, -length, length / 2),
      new THREE.Vector3(-length, -length, -length / 2),
      new THREE.Vector3(length, -length, -length / 2),
      new THREE.Vector3(length, -length, length / 2),

      new THREE.Vector3(-length, length, length / 2),
      new THREE.Vector3(-length, length, -length / 2),
      new THREE.Vector3(length, length, -length / 2),
      new THREE.Vector3(length, length, length / 2)
    ];
    this.afterCuboidBorder = drowBorderLine.createLine(afterCuboidPoint, '#7A7A7A');
    this.afterCuboidBorder[0].visible = false;
    this.afterCuboidBorder[1].visible = false;
    this.afterCuboid.add(this.afterCuboidBorder[0]);
    this.afterCuboid.add(this.afterCuboidBorder[1]);

    this.frontCuboidBorder = drowBorderLine.createLine(afterCuboidPoint, '#7A7A7A');
    this.frontCuboidBorder[0].visible = false;
    this.frontCuboidBorder[1].visible = false;
    this.frontCuboid.add(this.frontCuboidBorder[0]);
    this.frontCuboid.add(this.frontCuboidBorder[1]);

    const cubePoint = [
      new THREE.Vector3(-length, -length, length),
      new THREE.Vector3(-length, -length, -length),
      new THREE.Vector3(length, -length, -length),
      new THREE.Vector3(length, -length, length),

      new THREE.Vector3(-length, length, length),
      new THREE.Vector3(-length, length, -length),
      new THREE.Vector3(length, length, -length),
      new THREE.Vector3(length, length, length)
    ];
    this.cubeBorder = drowBorderLine.createLine(cubePoint, '#7A7A7A');
    this.scene.add(this.cubeBorder[0]);
    this.scene.add(this.cubeBorder[1]);
  }

  // 添加完整球和两个半球
  addBall() {
    const material = new THREE.MeshPhongMaterial({color : '#FFAEAE', specular: '#FFDFDE', side: THREE.DoubleSide});

    const radius = Math.sqrt(2) * 100 / 2;
    const frontSphereGeometry = new THREE.SphereBufferGeometry( radius, 128, 128, 0, Math.PI );
    this.frontSphere = new THREE.Mesh( frontSphereGeometry.clone(), material.clone() );
    this.scene.add( this.frontSphere );

    const afterSphereGeometry = new THREE.SphereBufferGeometry( radius, 128, 128, 0, -Math.PI );
    this.afterSphere = new THREE.Mesh( afterSphereGeometry.clone(), material.clone() );
    this.scene.add( this.afterSphere );

    const sphereGeometry = new THREE.SphereBufferGeometry( radius, 128, 128);
    const sphereMaterial = new THREE.MeshPhongMaterial({color : '#ff7c77', specular: '#ffcbc9', transparent: true, opacity: 0.6});
    this.sphere = new THREE.Mesh( sphereGeometry.clone(), sphereMaterial.clone());
    this.scene.add( this.sphere );

    this.sphere.visible = false;
    this.frontSphere.visible = false;
    this.afterSphere.visible = false;
  }

  // 添加八个顶点的字母
  addText() {
    const length = 55;
    const aText = ThreeUtil.createNewRomanText('A', -length, length, -length, '#000', 0.15);
    const bText = ThreeUtil.createNewRomanText('B', length, length, -length, '#000', 0.15);
    const cText = ThreeUtil.createNewRomanText('C', length, length, length, '#000', 0.15);
    const dText = ThreeUtil.createNewRomanText('D', -length, length, length, '#000', 0.15);

    this.afterText.add(aText);
    this.afterText.add(bText);
    this.frontText.add(cText);
    this.frontText.add(dText);

    const a1Text = this.createText('A', '₁', -length, -length, -length, '#000', 0.15);
    const b1Text = this.createText('B', '₁', length, -length, -length, '#000', 0.15);
    const c1Text = this.createText('C', '₁', length, -length, length, '#000', 0.15);
    const d1Text = this.createText('D', '₁', -length, -length, length, '#000', 0.15);

    this.afterText.add(a1Text);
    this.afterText.add(b1Text);
    this.frontText.add(c1Text);
    this.frontText.add(d1Text);

    this.scene.add(this.afterText, this.frontText);

    // 绑定事件 让字能够始终面对着相机
    this.orbit.addEventListener('change', () => {
      a1Text.rotation.copy( this.camera.rotation );
      b1Text.rotation.copy( this.camera.rotation );
      c1Text.rotation.copy( this.camera.rotation );
      d1Text.rotation.copy( this.camera.rotation );
    });
  }

  createText(text1: string, text2: string, x: number, y: number, z: number, color: string, scale: number) {
    const text = new MeshText2D(text1, { align: textAlign.center, font: 'italic 50px "Times New Roman"', fillStyle: color });
    text.material.alphaTest = 0.1;
    text.position.set(x, y, z);
    text.material.depthTest = false;
    this.scene.add(text);

    const smallText = new MeshText2D(text2, { align: textAlign.center, font: '50px "Times New Roman"', fillStyle: color });
    smallText.material.alphaTest = 0.1;
    smallText.position.set(20, 0, 0);
    smallText.material.depthTest = false;
    text.add(smallText);

    text.scale.set(scale, scale, scale);
    text.rotation.copy( this.camera.rotation );
    return text;
  }

  // 添加第四场景的虚线和文字
  addDashLine() {
    const lang = Math.sqrt(2) * 100;
    // 添加虚线
    this.dashLine = (new DrowBorderLineHelper()).createDashLine(lang - 5, 0.25, '#000');
    this.dashLine.rotateZ(Math.PI / 4);

    // 添加o点和 o文字
    this.oText = ThreeUtil.createSphere(1.5);
    (this.oText.material as any).depthTest = false;
    const text = ThreeUtil.createNewRomanText('O', 5, -5, 0, '#000', 0.15);
    this.oText.add(text);
    this.scene.add(this.oText);
    this.scene.add(this.dashLine);
  }

  // 第一场景
  showFirstScene() {
    this.orbit.reset();
    this.hideObj();

    // 显示透明正方体
    this.solidCube.visible = true;

    this.cubeBorder[0].visible = true;
    this.cubeBorder[1].visible = true;

    this.frontText.visible = true;

    this.cuttingAnimationIsEnd = false;

    this.cuttingAnimation.progress(0);
    this.cuttingAnimation.pause();
  }

  // 第二场景
  showSecondScene() {
    this.hideObj();

    this.transparentCube.visible = true;

    this.cubeBorder[0].visible = true;
    this.cubeBorder[1].visible = true;

    this.sphere.visible = true;
    this.frontText.visible = true;

    // 重置动画
    this.cuttingAnimation.progress(0);
    this.cuttingAnimation.pause();

    this.cuttingAnimationIsEnd = false;
  }

  // 第三场景
  showThirdScene() {
    this.hideObj();

    this.afterCuboidBorder[0].visible = true;
    this.afterCuboidBorder[1].visible = true;
    this.afterCuboid.visible = true;
    this.afterSphere.visible = true;

    // 由四场景到3时不显示前半个正方体 及 边框 和文字
    if (!this.cuttingAnimationIsEnd) {
      this.frontCuboidBorder[0].visible = true;
      this.frontCuboidBorder[1].visible = true;
      this.frontCuboid.visible = true;
      this.frontSphere.visible = true;
      this.frontText.visible = true;
    }

    this.cuttingAnimation.play();
  }

  // 第四场景
  showFourthScene() {
    this.hideObj();
    this.oText.visible = true;
    this.dashLine.visible = true;

    this.afterCuboidBorder[0].visible = true;
    this.afterCuboidBorder[1].visible = true;

    this.afterCuboid.visible = true;

    this.afterSphere.visible = true;

    this.cuttingAnimationIsEnd = true;
  }

  // 隐藏所有元素
  hideObj() {
    this.oText.visible = false;
    this.dashLine.visible = false;

    this.solidCube.visible = false;
    this.transparentCube.visible = false;

    this.cubeBorder[0].visible = false;
    this.cubeBorder[1].visible = false;

    this.afterCuboidBorder[0].visible = false;
    this.afterCuboidBorder[1].visible = false;

    this.frontCuboidBorder[0].visible = false;
    this.frontCuboidBorder[1].visible = false;

    this.frontCuboid.visible = false;
    this.afterCuboid.visible = false;

    this.sphere.visible = false;
    this.frontSphere.visible = false;
    this.afterSphere.visible = false;

    this.frontText.visible = false;
  }

  addAnimation() {
    const tween = {
      opacity: 1,
      x: 0,
    };

    this.cuttingAnimation = TweenMax.to(tween, 3, {
      opacity: 0,
      x: -200,
      onStart: () => {
        this.resetCamera();
        this.frontCuboid.visible = true;
        this.frontSphere.visible = true;
      },
      onUpdate: () => {
        this.frontCuboid.position.x = tween.x;
        this.frontSphere.position.x = tween.x;
        this.frontText.position.x = tween.x;
      },

      onComplete: () => {
        this.frontCuboid.visible = false;
        this.frontSphere.visible = false;
        this.frontText.visible = false;
        this.cuttingAnimationIsEnd = true;
      },
      paused: true
    });
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  resetCamera() {
    this.camera.position.set(0, 0, 300);
    //摄像机镜头指向的具体坐标位置
    this.camera.lookAt(0, 0, 0);

    // 重新旋转文字的角度 使其能够面向相机
    this.frontText.children[2].rotation.copy( this.camera.rotation );
    this.frontText.children[3].rotation.copy( this.camera.rotation );
    this.afterText.children[2].rotation.copy( this.camera.rotation );
    this.afterText.children[3].rotation.copy( this.camera.rotation );
  }
}
