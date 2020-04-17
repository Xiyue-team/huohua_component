import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { Helper } from './Helper';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';
import * as a from '../sub_static/a.png';
import * as a1 from '../sub_static/a1.png';
import * as f from '../sub_static/f.png';
import * as d from '../sub_static/d.png';
import * as c from '../sub_static/c.png';
import * as b from '../sub_static/b.png';
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
export class Threejs3dModel extends ThreeBase {

  private controls: any;
  private group1: THREE.Group;
  private group2: THREE.Group;
  private group3: THREE.Group;
  private group4: THREE.Group;
  private group5: THREE.Group;
  private initialVector: THREE.Group;
  private helper = new Helper();
  private lineHelper = new Line();

  private initVectialVectorArrow: THREE.Mesh;
  private initVectialVectorLine: any;
  private initVectialVectorText: any;
  private initVectialVectorDragPoint: THREE.Mesh;

  private zeroPoint: THREE.Mesh;

  private unitPoint: THREE.Mesh;
  private unitSliderControlLine: any;
  private unitImage: THREE.Mesh[] = [];

  private equalText: any[] = [];
  private equalLine: any[] = [];
  private equalPoint: THREE.Mesh[] = [];
  private equalArrow: THREE.Mesh[] = [];

  private oppositeText: any[] = [];
  private oppositeLine: any[] = [];
  private oppositePoint: THREE.Mesh[] = [];
  private oppositeArrow: THREE.Mesh[] = [];

  private parallelText: any[] = [];
  private parallelLine: any[] = [];
  private parallelArrow: THREE.Mesh[] = [];
  private parallelCenter: THREE.Mesh[];
  private rotateCenter: THREE.Mesh;

  private arrowSize = (window as any)['env'].browserInfo.isSmallDevice ? 10 : 4;
  
  private lineWidth = 2000;

  private lineWidthScale = 0.001;

  private tips: any;


  private render = () => {
    requestAnimationFrame( this.render );
    this.controls.update();
    this.renderer.render( this.scene,  this.camera );
  }

  /**
   *
   * @param {number} fov    视角
   * @param {number} width  实际显示宽
   * @param {number} height 实际显示高
   * @param {number} near   距离镜头最近距离
   * @param {number} far    距离镜头最远距离
   */
  constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
    super();
    this.fov     = !fov    ? this.fov       :  fov;
    this.near    = !near   ? this.near      :  near;
    this.far     = !far    ? this.far       :  fov;
    this.width   = !width  ? window.innerWidth     :  width;
    this.height  = !height ? window.innerHeight    :  height;
    this.domElement = domElement;
    console.log('init Simple3DModel constructor');
    this.init();

  }
  init() {
    this.initScene();
    this.initCamera();
    this.initWebGLRenderer();
    this.initControl();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.createInitialVector();
    this.createZeroVector();
    this.createUnitVector();
    this.createEqualVector();
    this.createOppositeVector();
    this.createParallelVector();
    this.render();

  }

  preLoading() {
    const image = [a, a1, f, d, c, b];
    console.log(image);
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x2d2d2d );
  }


  /**
   * 初始化镜头
   */
  initCamera(): void {
    const near    = 0.1;
    const far     = this.lineWidth;
    this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
    this.camera.lookAt(new THREE.Vector3(0,  0,  0));
    this.camera.position.set(0,  0,  403);
  }


  //重置摄像机位置
  resetCamera() {
    this.controls.reset();
  }

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
    }  else  {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new TrackballControls( this.camera, this.renderer.domElement );
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = true;
    this.controls.noPan = true;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }

  resize(width: number, height: number)  {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize( width,  height );
  }


  //创建初始向量
  createInitialVector() {
    this.initialVector = new THREE.Group();
    //创建箭头拖动提示
    this.tips = ThreeUtil.createNormalText('箭头可拖动', 90, 15, 0, '#ffffff', 0.15);
    this.initialVector.add(this.tips);

    const color = '#18A2FF';
    this.initVectialVectorLine = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.initVectialVectorArrow = this.createArrow(this.arrowSize, color);
    this.initVectialVectorArrow.position.set(155, 0, 0);
    this.initVectialVectorDragPoint = this.helper.createDragPoint();
    this.initVectialVectorDragPoint.position.set(-70, 0, 0);
    this.initVectialVectorText = ThreeUtil.createImg(32, 32, a, 75, -15, 0);
    this.initVectialVectorDragPoint.add(this.initVectialVectorArrow, this.initVectialVectorLine, this.initVectialVectorText);
    this.bindDrag([this.initVectialVectorArrow], () => {this.tips.visible = false; }, () => {
      this.initVectialVectorArrow.rotation.z =  this.getRotateAngle(0, 0,
        this.initVectialVectorArrow.position.x, this.initVectialVectorArrow.position.y);
      this.initVectialVectorDragPoint.remove(this.initVectialVectorLine);
      this.initVectialVectorLine.geometry.dispose();
      (this.initVectialVectorLine.material as any).dispose();
      this.initVectialVectorLine = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(this.initVectialVectorArrow.position.x,
          this.initVectialVectorArrow.position.y, this.initVectialVectorArrow.position.z),
        color: color,
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.initVectialVectorDragPoint.add(this.initVectialVectorLine);
      this.initVectialVectorText.position.set(this.initVectialVectorArrow.position.x / 2,
        this.initVectialVectorArrow.position.y / 2 - 15, 0);
    });
    this.bindDrag([this.initVectialVectorDragPoint], () => { this.tips.visible = false; });
    this.initialVector.add(this.initVectialVectorDragPoint);
    this.scene.add(this.initialVector);
  }

  //创建零向量
  createZeroVector() {
    this.group1 = new THREE.Group();
    this.zeroPoint = this.helper.createDragPoint();
    const arrow = ThreeUtil.createNormalText('→', 0, -5, 0, '#ffffff', 0.25);
    const number = ThreeUtil.createNormalText('0', 0, -14, 0, '#ffffff', 0.25);
    this.zeroPoint.add(number, arrow);
    this.bindDrag([this.zeroPoint]);
    this.group1.add(this.zeroPoint);
    this.group1.visible = false;
    this.scene.add(this.group1);
  }

  //创建单位向量
  createUnitVector() {
    const color = '#ffd621';
    const color1 = '#18A2FF';
    const linehelper = new Line();
    this.group2 = new THREE.Group();
    this.unitPoint = this.helper.createDragPoint();
    this.unitPoint.position.set(-75, 0, 0);
    const dragpoint = ThreeUtil.createTriangle(0, -5, 0, 5, 10, 0, color1, 1);
    const rotateRange = ThreeUtil.createPoint(100, '#18A2FF', 150, 0, 1);
    const line = linehelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(150, 0, 0),
      color: color1,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.unitSliderControlLine = this.createRotateLine(line, rotateRange, dragpoint, this.unitPoint, this.group2);
    this.group2.visible = false;
    this.scene.add(this.group2);

    const dashLine = linehelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(0, -80, 0),
      dashLine: true,
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });

    const dashLine1 = linehelper.createLine({
      startPoint: new THREE.Vector3(155, 0, 0),
      endPoint: new THREE.Vector3(155, -80, 0),
      dashLine: true,
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });

    const arrowLine1 = linehelper.createLine({
      startPoint: new THREE.Vector3(55, -80, 0),
      endPoint: new THREE.Vector3(10, -80, 0),
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });

    const arrow1 = ThreeUtil.createTriangle( 0, 4, 0, -4, -10, 0, color, 1);
    arrow1.position.set(10, -80, 0);
    const arrowLine2 = linehelper.createLine({
      startPoint: new THREE.Vector3(95, -80, 0),
      endPoint: new THREE.Vector3(145, -80, 0),
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });

    const arrow2 = arrow1.clone();
    arrow2.rotation.z = Math.PI ;
    arrow2.position.set(145, -80, 0);
    arrowLine2.add(arrow2);
    arrowLine1.add(arrow1);

    this.unitImage[0] = ThreeUtil.createImg(32, 32, a, 75, -15, 0);
    this.unitImage[1] = ThreeUtil.createImg(64, 32, a1, 75, -80, 0);
    this.unitSliderControlLine.sliderPointMouseMoveCallback = () => {
      this.unitImage[0].rotation.z = -this.unitSliderControlLine.angle;
      this.unitImage[1].rotation.z = -this.unitSliderControlLine.angle;
    };

    this.unitSliderControlLine.sliderPointTouchMoveCallback = () => {
      this.unitImage[0].rotation.z = -this.unitSliderControlLine.angle;
      this.unitImage[1].rotation.z = -this.unitSliderControlLine.angle;
    };


    this.unitPoint.add(dashLine, dashLine1, this.unitImage[0], this.unitImage[1], arrowLine1, arrowLine2);

  }

  //创建相等向量
  createEqualVector() {
    this.equalText[0] = ThreeUtil.createImg(32, 32, a, 77.5, -15, 0 );
    this.equalText[1] = ThreeUtil.createImg(32, 32, f, 77.5, -15, 0);

    this.group3 = new THREE.Group();
    const color = '#18A2FF';
    const color1 = '#AC84FF';
    this.equalLine[0] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.equalArrow[0] = this.createArrow( this.arrowSize, color);
    this.equalPoint[0] = this.helper.createDragPoint();
    this.equalPoint[0].add(this.equalArrow[0], this.equalLine[0],  this.equalText[0]);
    this.equalArrow[0].position.set(155, 0, 0);
    this.equalArrow[1] = this.createArrow( this.arrowSize, color1);
    this.equalArrow[1].position.set(155, 0, 0);
    this.equalPoint[1] = ThreeUtil.createPoint(1, '#000000', -70, -50, 0);
    this.equalLine[1] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color1,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });

    this.equalPoint[1].add(this.equalArrow[1], this.equalLine[1], this.equalText[1]);
    this.bindDrag([this.equalPoint[0]], () => {}, () => {
      this.equalPoint[1].position.set(this.equalPoint[0].position.x, this.equalPoint[0].position.y - 50, 0);
    });
    this.bindDrag([this.equalArrow[0]], () => {}, () => {
      this.equalText[0].position.set(this.equalArrow[0].position.x / 2, this.equalArrow[0].position.y / 2 - 15, 0);
      this.equalText[1].position.set(this.equalArrow[0].position.x / 2, this.equalArrow[0].position.y / 2 - 15, 0);

      this.equalArrow[0].rotation.z = this.getRotateAngle(0, 0, this.equalArrow[0].position.x, this.equalArrow[0].position.y);
      this.equalArrow[1].rotation.z = this.getRotateAngle(0, 0, this.equalArrow[0].position.x, this.equalArrow[0].position.y);

      this.equalPoint[0].remove(this.equalLine[0]);
      this.equalLine[0].geometry.dispose();
      (this.equalLine[0].material as any).dispose();
      this.equalLine[0] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(this.equalArrow[0].position.x, this.equalArrow[0].position.y, this.equalArrow[0].position.z),
        color: color,
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.equalPoint[0].add(this.equalLine[0]);
      this.equalArrow[1].position.set(this.equalArrow[0].position.x, this.equalArrow[0].position.y, this.equalArrow[0].position.z);
      this.equalPoint[1].remove(this.equalLine[1]);
      this.equalLine[1].geometry.dispose();
      (this.equalLine[1].material as any).dispose();
      this.equalLine[1] =  this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(this.equalArrow[0].position.x, this.equalArrow[0].position.y, this.equalArrow[0].position.z),
        color: color1,
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.equalPoint[1].add(this.equalLine[1]);
    }, () => {});
    this.equalPoint[0].position.x = - 70;
    this.group3.add(this.equalPoint[0], this.equalPoint[1]);
    this.scene.add(this.group3);
    this.group3.visible = false;
  }

  //创建相反向量
  createOppositeVector() {
    const color = ['#18A2FF', '#9BF23B'];
    const lineWidth = this.lineWidth;
    this.group4 = new THREE.Group();
    this.oppositeText[0] = ThreeUtil.createImg(32, 32, a, 77.5, -15, 0);
    this.oppositeText[1] = ThreeUtil.createImg(32, 32, b, -77.5, -15, 0);
    this.oppositeArrow[0] = this.createArrow( this.arrowSize, color[0]);
    this.oppositeArrow[1] = this.createArrow( this.arrowSize, color[1]);
    this.oppositeArrow[0].position.set(155, 0, 0);
    this.oppositeArrow[1].position.set(-155, 0, 0);
    this.oppositeArrow[1].rotation.z = Math.PI;
    this.oppositePoint[0] = this.helper.createDragPoint();
    this.oppositePoint[1] = ThreeUtil.createPoint(1, '#000000', 90, -50, 0);
    (this.oppositePoint[1].material as any).opacity = 0.001;
    this.oppositeLine[0] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color[0],
      lineWidth: lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.oppositeLine[1] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(-155, 0, 0),
      color: color[1],
      lineWidth: lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.oppositePoint[0].position.set(-70, 0, 0);
    this.oppositePoint[0].add(this.oppositeArrow[0], this.oppositeLine[0],  this.oppositeText[0]);
    this.oppositePoint[1].add(this.oppositeArrow[1], this.oppositeLine[1], this.oppositeText[1]);
    this.bindDrag([this.oppositePoint[0]], () => {}, () => {
      this.oppositePoint[1].position.set(this.oppositePoint[0].position.x + 155, this.oppositePoint[0].position.y - 50, 0);
    });
    this.bindDrag([this.oppositeArrow[0]], () => {}, () => {
      this.oppositeArrow[0].rotation.z = this.getRotateAngle(0, 0, this.oppositeArrow[0].position.x, this.oppositeArrow[0].position.y);
      this.oppositeArrow[1].rotation.z = Math.PI + this.getRotateAngle(0, 0,
        this.oppositeArrow[0].position.x, this.oppositeArrow[0].position.y);
      this.oppositeArrow[1].position.set(-this.oppositeArrow[0].position.x,
        -this.oppositeArrow[0].position.y, this.oppositeArrow[0].position.z);
      this.oppositePoint[0].remove(this.oppositeLine[0]);
      this.oppositeLine[0].geometry.dispose();
      (this.oppositeLine[0].material as any).dispose();
      this.oppositeLine[0] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(this.oppositeArrow[0].position.x, this.oppositeArrow[0].position.y, this.oppositeArrow[0].position.z),
        color: color[0],
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.oppositePoint[0].add(this.oppositeLine[0]);
      this.oppositePoint[1].remove(this.oppositeLine[1]);
      this.oppositeLine[1].geometry.dispose();
      (this.oppositeLine[1].material as any).dispose();
      this.oppositeLine[1] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(-this.oppositeArrow[0].position.x,
          -this.oppositeArrow[0].position.y, this.oppositeArrow[0].position.z),
        color: color[1],
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.oppositePoint[1].add(this.oppositeLine[1]);
      this.oppositeText[0].position.set(this.oppositeArrow[0].position.x / 2, this.oppositeArrow[0].position.y / 2 - 15, 0);
      this.oppositeText[1].position.set(-this.oppositeArrow[0].position.x / 2, -this.oppositeArrow[0].position.y / 2 - 15, 0);
    });
    this.group4.add(this.oppositePoint[0], this.oppositePoint[1]);
    this.group4.visible = false;
    this.scene.add(this.group4);
  }

  //创建平行向量
  createParallelVector() {
    this.group5 = new THREE.Group();
    const lineWidth = this.lineWidth;
    this.parallelCenter = [];
    const color: string[] = ['#18A2FF', '#FF5A5A', '#FF5A5A'];
    this.parallelText[0] = ThreeUtil.createImg(32, 32, a, 77.5, -15, 0);
    this.parallelText[1] = ThreeUtil.createImg(32, 32, c, 77.5, -15, 0);
    this.parallelText[2] = ThreeUtil.createImg(32 * 0.8, 32 * 0.8, d, -81, -15, 0);
    this.parallelCenter[0] = this.helper.createDragPoint();
    this.parallelCenter[0].position.set(-70, 0, 0);
    this.rotateCenter = ThreeUtil.createPoint(0.1, color[0], -70, 0, 0.001);
    this.parallelCenter[1] = ThreeUtil.createPoint(0.1, color[0], -70, -50, 0.001);
    this.parallelCenter[2] = ThreeUtil.createPoint(0.1, color[0], 90, -50, 0.001);
    for (let i = 0; i < 3; i++) {
      if (i === 2) {
        this.parallelLine[i] = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 0, 0),
          endPoint: new THREE.Vector3(-155, 0, 0),
          color: color[i],
          lineWidth: lineWidth,
          lineWidthScale: this.lineWidthScale
        });
      } else {
        this.parallelLine[i] = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 0, 0),
          endPoint: new THREE.Vector3(155, 0, 0),
          color: color[i],
          lineWidth: lineWidth,
          lineWidthScale: this.lineWidthScale
        });

      }
      this.parallelArrow[i] = this.createArrow(this.arrowSize, color[i]);
      this.parallelCenter[i].add(this.parallelLine[i], this.parallelArrow[i]);
      this.group5.add(this.parallelCenter[i]);
    }
    this.parallelCenter[1].add(this.parallelText[1]);
    this.parallelCenter[2].add(this.parallelText[2]);
    this.rotateCenter.add(this.parallelText[0]);
    this.group5.add(this.rotateCenter);
    this.parallelArrow[0].position.set(155, 0, 0);
    this.parallelArrow[1].position.set(155, 0, 0);
    this.parallelArrow[2].position.set(-155, 0, 0);
    this.parallelArrow[2].rotation.z = Math.PI;
    //给箭头和拖动点绑定事件
    this.bindDrag([this.parallelCenter[0]], () => {}, () => {
      this.rotateCenter.position.set(this.parallelCenter[0].position.x,
        this.parallelCenter[0].position.y, this.parallelCenter[0].position.z);
    });
    this.bindDrag([this.parallelArrow[0]], () => {}, () => {
      this.parallelArrow[0].rotation.z = this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelText[0].rotation.z = -this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelText[0].position.x = Math.sqrt(Math.pow((0 - this.parallelArrow[0].position.x), 2)
        + Math.pow((0 - this.parallelArrow[0].position.y), 2)) / 2;
      this.parallelCenter[1].rotation.z = this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelCenter[2].rotation.z = this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelText[1].rotation.z = -this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelText[2].rotation.z = -this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.rotateCenter.rotation.z = this.getRotateAngle(0, 0, this.parallelArrow[0].position.x, this.parallelArrow[0].position.y);
      this.parallelCenter[0].remove(this.parallelLine[0]);
      this.parallelLine[0].geometry.dispose();
      (this.parallelLine[0].material as any).dispose();
      this.parallelLine[0] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(this.parallelArrow[0].position.x, this.parallelArrow[0].position.y, this.parallelArrow[0].position.z),
        color: color[0],
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.parallelCenter[0].add(this.parallelLine[0]);
    });
    this.parallelCenter[2].visible = false;
    this.group5.visible = false;
    this.scene.add(this.group5);
  }

  hideVector() {
    this.group1.visible = false;
    this.group2.visible = false;
    this.group3.visible = false;
    this.group4.visible = false;
    this.group5.visible = false;
    this.initialVector.visible = false;
  }

  showVector(value: number) {
    switch (value) {
      case 0:
        this.initialVector.visible = true;
        return;
      case 1:
        this.group1.visible = true;
        return;
      case 2:
        this.group2.visible = true;
        return;
      case 3:
        this.group3.visible = true;
        return;
      case 4:
        this.group4.visible = true;
        return;
      case 5:
        this.group5.visible = true;
        return;
      case 6:
        this.parallelCenter[1].visible = true;
        this.parallelCenter[2].visible = false;
        return;
      case 7:
        this.parallelCenter[1].visible = false;
        this.parallelCenter[2].visible = true;
        return;
    }
  }

  createArrow( arrowSize: number, color: string) {
    const arrow = ThreeUtil.createTriangle(0,  arrowSize, 0,
      -arrowSize, 2 * arrowSize, 0, color);
    return arrow;
  }

  //获得旋转角度的方法
  getRotateAngle (x1: number, y1: number, x2: number, y2: number) {
    let angle: number;
    const angleToRadian = Math.PI / 180;
    if (x1 === x2) {
      if (y1 > y2) {
        angle = 270 * angleToRadian;
      } else {
        angle = 90 * angleToRadian;
      }
    } else {
      if (x1 < x2) {
        angle = Math.atan((y2 - y1) / (x2 - x1));
      } else {
        angle = Math.PI + Math.atan((y2 - y1) / (x2 - x1));
      }
    }
    return angle;
  }

  createRotateLine(line: any, rotatePointRange: THREE.Mesh, rotatePoint: THREE.Mesh, dragPoint: THREE.Mesh, group: THREE.Group) {
    (rotatePointRange.material as any).opacity = 0;
    rotatePoint.position.z = 1;
    rotatePointRange.add(rotatePoint);
    line.add(rotatePointRange);
    dragPoint.add(line);
    //用此方法前先导入事件包
    const sliderControlLine = new SliderControlLine(line, rotatePointRange, dragPoint, rotatePoint);
    sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
    group.add(dragPoint);
    return sliderControlLine;
  }

  bindDrag(mesh: THREE.Mesh[], dragStartCallback?: any, dragCallback?: any, dragEndCallback?: any) {
    dragStartCallback = dragStartCallback ? dragStartCallback : () => {};
    dragCallback = dragCallback ? dragCallback : () => {};
    dragEndCallback = dragEndCallback ? dragEndCallback : () => {};
    const dargControls = new dragcontrols(mesh, this.camera, this.renderer.domElement);
    dargControls.addEventListener( 'dragstart',  () => {
      this.controls.enabled = false;
      dragStartCallback();
    } );
    dargControls.addEventListener( 'drag', () => {
      dragCallback();
    } );
    dargControls.addEventListener( 'dragend', () => {
      this.controls.enabled = true;
      dragEndCallback();
    } );
  }

  vectorReset() {
    this.resetInitialVector();
    this.resetZeroVector();
    this.resetUnitVector();
    this.resetEqualVector();
    this.resetOppositeVector();
    this.resetParallelVector();
    this.tips.visible = true;

  }

  resetInitialVector() {
    const color = '#18A2FF';
    this.initVectialVectorDragPoint.position.set(-70, 0, 0);
    this.initVectialVectorText.position.set(75, -15, 0);
    this.initVectialVectorText.rotation.z = 0;
    this.initVectialVectorArrow.position.set(155, 0, 0);
    this.initVectialVectorArrow.rotation.z = 0;
    this.initVectialVectorDragPoint.remove(this.initVectialVectorLine);
    this.initVectialVectorLine.geometry.dispose();
    (this.initVectialVectorLine.material as any).dispose();
    this.initVectialVectorLine = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color,
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.initVectialVectorDragPoint.add(this.initVectialVectorLine);
  }

  resetZeroVector() {
    this.zeroPoint.position.set(0, 0, 0);
  }

  resetUnitVector() {
    this.unitPoint.position.set(-75, 0, 0);
    this.unitPoint.rotateZ(-this.unitSliderControlLine.angle);
    this.unitSliderControlLine.angle = 0;
    this.unitImage[0].rotation.z = -this.unitSliderControlLine.angle;
    this.unitImage[1].rotation.z = -this.unitSliderControlLine.angle;
  }

  resetEqualVector() {
    const color = ['#18A2FF', '#AC84FF'];
    for (let i = 0; i < 2; i++) {
      this.equalPoint[i].position.set(-70, -i * 50, 0);
      this.equalText[i].position.set(77.5, - 15, 0);
      this.equalText[i].rotation.z = 0;
      this.equalArrow[i].position.set(155, 0, 0);
      this.equalArrow[i].rotation.z = 0;
      this.equalPoint[i].remove(this.equalLine[i]);
      this.equalLine[i].geometry.dispose();
      (this.equalLine[i].material as any).dispose();
      this.equalLine[i] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(155, 0, 0),
        color: color[i],
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.equalPoint[i].add(this.equalLine[i]);
    }
  }

  resetOppositeVector() {
    const color = ['#18A2FF', '#9BF23B'];
    this.oppositePoint[0].position.set(-70, 0, 0);
    this.oppositeText[0].position.set(77.5, - 15, 0);
    this.oppositeText[0].rotation.z = 0;
    this.oppositeArrow[0].position.set(155, 0, 0);
    this.oppositeArrow[0].rotation.z = 0;
    this.oppositePoint[0].remove(this.oppositeLine[0]);
    this.oppositeLine[0].geometry.dispose();
    (this.oppositeLine[0].material as any).dispose();
    this.oppositeLine[0] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(155, 0, 0),
      color: color[0],
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.oppositePoint[0].add(this.oppositeLine[0]);

    this.oppositePoint[1].position.set(90, -50, 0);
    this.oppositeText[1].position.set(-77.5, -15, 0);
    this.oppositeText[1].rotation.z = 0;
    this.oppositeArrow[1].position.set(-155, 0, 0);
    this.oppositeArrow[1].rotation.z = Math.PI;

    this.oppositePoint[1].remove(this.oppositeLine[1]);
    this.oppositeLine[1].geometry.dispose();
    (this.oppositeLine[1].material as any).dispose();
    this.oppositeLine[1] = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(-155, 0, 0),
      color: color[1],
      lineWidth: this.lineWidth,
      lineWidthScale: this.lineWidthScale
    });
    this.oppositePoint[1].add(this.oppositeLine[1]);


  }

  resetParallelVector() {
    const color = ['#18A2FF', '#FF5A5A'];
    this.rotateCenter.rotation.z = 0;
    this.rotateCenter.position.set(-70, 0, 0);
    for (let i = 0; i < 2; i++) {
      this.parallelCenter[i].position.set(-70, -i * 50, 0);
      this.parallelCenter[i].rotation.z = 0;
      this.parallelText[i].position.set(75, - 15, 0);
      this.parallelText[i].rotation.z = 0;
      this.parallelArrow[i].position.set(155, 0, 0);
      this.parallelArrow[i].rotation.z = 0;
      this.parallelCenter[i].remove(this.parallelLine[i]);
      this.parallelLine[i].geometry.dispose();
      (this.parallelLine[i].material as any).dispose();
      this.parallelLine[i] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(155, 0, 0),
        color: color[i],
        lineWidth: this.lineWidth,
        lineWidthScale: this.lineWidthScale
      });
      this.parallelCenter[i].add(this.parallelLine[i]);
    }
    this.parallelCenter[2].position.set(90, -50, 0);
    this.parallelCenter[2].rotation.z = 0;
    this.parallelText[2].rotation.z = 0;
  }
}

