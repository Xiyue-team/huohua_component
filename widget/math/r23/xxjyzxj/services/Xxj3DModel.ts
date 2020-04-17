import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as point2 from '../sub_static/point2.png';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { CurveLine } from '../../../../../src/three/component/CurveLine';

export class Xxj3DModel extends ThreeBase {

  public sliderControlerLine: any;
  private controls: any;
  public rotatePoint: any;
  public rotateLine: any;
  private arcLine: any;
  public curveLine: any;
  public tipTexts: any = [];
  public alphaText: any;

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
    this.curveLine = new CurveLine();
    this.initAxis();
    this.bindEvent();
    this.addAngleText(0);
    this.addTipsText();
    this.setMove();
    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
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
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 270);
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
    (this.renderer as WebGLRenderer).setClearColor('#2D2D2D', 1);

    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }

  /**
   * 初始化光源
   */
  initLight(): void {

  }

  //创建坐标轴
  initAxis() {
    const axis = AxisUtil.createAxis({ isTicks: false, AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''],
      axisColor: '#fff', axisOpacity: 0.32, fontColor: '#fff'} as any);
    this.scene.add(axis);
  }

  //加载旋转直线
  bindEvent() {
    const dragPoint = ThreeUtil.createImg(8, 8, point2, 30, 0, 0);
    const dragPointRange = ThreeUtil.createImg(200, 200, point2, 0, 0, 0);
    this.rotatePoint = ThreeUtil.createPoint(1.6, '#FFDB3B', 0, 0, 0);
    this.rotateLine = ThreeUtil.createPlane(100, 1, '#FF5A5A', 1);
    this.rotateLine.position.set(50, 0, 0);
    const lineArrow = ThreeUtil.createTriangle(50, 3, 55, 0, 50, -3, '#FF5A5A');
    this.rotateLine.add(lineArrow);
    dragPointRange.add(dragPoint);
    dragPointRange.position.z = -0.1;
    (dragPointRange.material as any).opacity = 0;
    dragPoint.position.z = 0.2;
    this.rotatePoint.position.z = 10;
    dragPointRange.add(dragPoint);
    this.rotateLine.add(dragPointRange);
    this.rotatePoint.add(this.rotateLine);
    this.sliderControlerLine = new SliderControlLine(this.rotateLine, dragPointRange, this.rotatePoint, dragPoint);
    this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls);
    this.scene.add(this.rotatePoint);
  }

  //设置move事件的操作
  setMove() {

    this.sliderControlerLine.sliderPointMouseMoveCallback = () => {

      if (this.sliderControlerLine.totalAngle >= 0) {
        this.deleteObject(this.arcLine, this.scene);
        this.drawRotLine(Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI), Math.PI * 6);
        if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) >= 1080) {
          this.rotatePoint.rotation.z = -(this.sliderControlerLine.totalAngle - Math.PI * 6);
          this.sliderControlerLine.totalAngle = Math.PI * 6;
          this.sliderControlerLine.angle = 0;
          this.sliderControlerLine.imgControl = false;
          this.deleteObject(this.arcLine, this.scene);
          this.drawRotLine(1080, Math.PI * 6);
        }

      } else {
        this.deleteObject(this.arcLine, this.scene);
        this.drawRotLine(Math.round(Math.abs(this.sliderControlerLine.totalAngle) * 180 / Math.PI), -Math.PI * 6);
        if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) <= -1080) {
          this.rotatePoint.rotation.z = -(Math.PI * 6);
          this.sliderControlerLine.totalAngle = -Math.PI * 6;
          this.sliderControlerLine.angle = 0;
          this.sliderControlerLine.imgControl = false;
          this.deleteObject(this.arcLine, this.scene);
          this.drawRotLine(1080, -Math.PI * 6);
        }
      }
      this.alphaText.text = 'α = ' + Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI) + '°';
      this.changeTextForDifAngles(Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI));
    };

    this.sliderControlerLine.sliderPointMouseUpCallback = () => {
          if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) <= -1080) {
            this.rotatePoint.rotation.z = -Math.PI * 6;
            this.sliderControlerLine.totalAngle = -Math.PI * 6;
            this.sliderControlerLine.angle = 0;
          } else if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) >= 1080) {
            this.rotatePoint.rotation.z = Math.PI * 6;
            this.sliderControlerLine.totalAngle = Math.PI * 6;
            this.sliderControlerLine.angle = 0;
        }
    };

    this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
      if (this.sliderControlerLine.totalAngle >= 0) {
        this.deleteObject(this.arcLine, this.scene);
        this.drawRotLine(Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI), Math.PI * 6);
        if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) >= 1080) {
          this.rotatePoint.rotation.z = -(this.sliderControlerLine.totalAngle - Math.PI * 6);
          this.sliderControlerLine.totalAngle = Math.PI * 6;
          this.sliderControlerLine.angle = 0;
          this.sliderControlerLine.imgControl = false;
          this.deleteObject(this.arcLine, this.scene);
          this.drawRotLine(1080, Math.PI * 6);
        }

      } else {

        this.deleteObject(this.arcLine, this.scene);
        this.drawRotLine(Math.round(Math.abs(this.sliderControlerLine.totalAngle) * 180 / Math.PI), -Math.PI * 6);

        if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) <= -1080) {
          this.rotatePoint.rotation.z = -(this.sliderControlerLine.totalAngle + Math.PI * 6);
          this.sliderControlerLine.totalAngle = -Math.PI * 6;
          this.sliderControlerLine.angle = 0;
          this.sliderControlerLine.imgControl = false;
          this.deleteObject(this.arcLine, this.scene);
          this.drawRotLine(1080, -Math.PI * 6);
        }

      }
      this.alphaText.text = 'α = ' + Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI) + '°';
      this.changeTextForDifAngles(Math.round(this.sliderControlerLine.totalAngle * 180 / Math.PI));
    };

    this.sliderControlerLine.sliderPointTouchEndCallback = () => {
      if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) <= -1080) {
        this.rotatePoint.rotation.z = -Math.PI * 6;
        this.sliderControlerLine.totalAngle = -Math.PI * 6;
        this.sliderControlerLine.angle = 0;
      } else if ((this.sliderControlerLine.totalAngle * 180 / Math.PI) >= 1080) {
        this.rotatePoint.rotation.z = Math.PI * 6;
        this.sliderControlerLine.totalAngle = Math.PI * 6;
        this.sliderControlerLine.angle = 0;
      }
    };
  }

  //删除绘制的对象
  deleteObject(obj1: any, scene: any) {
    if (obj1) {
      obj1.geometry.dispose();
      obj1.material.dispose();
      scene.remove(obj1);
    }
  }

  //绘制螺旋线
  drawRotLine(num: number, rotAngle: number) {
    let radius = 10;
    let angle = 0;
    const point: any = [];
    for (let i = 0; i < num; i++) {
      radius += 0.05;
      angle += rotAngle / 1080;
      point.push(new THREE.Vector2(radius * Math.cos(angle), radius * Math.sin(angle)));
    }
    this.arcLine = this.curveLine.createCurveLine({
      pointList: point,
      color: '#9BF23B',
      lineWidth: 2,
      style: 2
    });
    this.scene.add(this.arcLine);
  }

  //添加提示文字
  addTipsText() {
    this.tipTexts[0] = ThreeUtil.createNormalText('第一象限角', -80, 80, 0, '#FFFFFF', 0.2);
    this.scene.add(this.tipTexts[0]);
    this.tipTexts[1] = ThreeUtil.createNormalText('第二象限角', -80, 80, 0, '#FFFFFF', 0.2);
    this.scene.add(this.tipTexts[1]);
    this.tipTexts[2] = ThreeUtil.createNormalText('第三象限角', -80, 80, 0, '#FFFFFF', 0.2);
    this.scene.add(this.tipTexts[2]);
    this.tipTexts[3] = ThreeUtil.createNormalText('第四象限角', -80, 80, 0, '#FFFFFF', 0.2);
    this.scene.add(this.tipTexts[3]);
    this.tipTexts[4] = ThreeUtil.createNormalText('轴线角', -80, 80, 0, '#FFFFFF', 0.2);
    this.scene.add(this.tipTexts[4]);
    for (let i = 0; i < this.tipTexts.length - 1; i++) {
      this.tipTexts[i].visible = false;
    }
  }

  //添加角度文字
  addAngleText(angle: number) {
    this.alphaText = ThreeUtil.createNormalText('α = ' + angle + '°', 50, -5, -3, '#fff', 0.15);
    this.rotatePoint.add(this.alphaText);
  }

  //根据角度显示对应文字
  changeTextForDifAngles(value: number) {
      const angle = value % 360;
      if (angle >= 0) {
        if (0 < angle && angle < 90) {
          this.hideOrShowTexts(true, false, false, false, false);
        } else if (90 < angle && angle < 180) {
          this.hideOrShowTexts(false, true, false, false, false);
        } else if (180 < angle && angle < 270) {
          this.hideOrShowTexts(false, false, true, false, false);
        } else if (270 < angle && angle < 360) {
          this.hideOrShowTexts(false, false, false, true, false);
        } else {
          this.hideOrShowTexts(false, false, false, false, true);
        }
      } else {
        if (-90 < angle && angle < 0) {
          this.hideOrShowTexts(false, false, false, true, false);
        } else if (-180 < angle && angle < -90) {
          this.hideOrShowTexts(false, false, true, false, false);
        } else if (-270 < angle && angle < -180) {
          this.hideOrShowTexts(false, true, false, false, false);
        } else if (-360 < angle && angle < -270) {
          this.hideOrShowTexts(true, false, false, false, false);
        } else {
          this.hideOrShowTexts(false, false, false, false, true);
        }
      }
  }

  //提醒文字的显示隐藏
  hideOrShowTexts(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean, flag5: boolean) {
    this.tipTexts[0].visible = flag1;
    this.tipTexts[1].visible = flag2;
    this.tipTexts[2].visible = flag3;
    this.tipTexts[3].visible = flag4;
    this.tipTexts[4].visible = flag5;
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    this.alphaText.text = 'α = ' + 0 + '°';
    for (let i = 0; i < this.tipTexts.length; i++) {
      this.tipTexts[i].visible = false;
    }
    this.tipTexts[4].visible = true;
    this.sliderControlerLine.angle = 0;
    this.sliderControlerLine.totalAngle = 0;
    this.deleteObject(this.arcLine, this.scene);
    this.rotatePoint.rotation.z = 0;
  }
}
