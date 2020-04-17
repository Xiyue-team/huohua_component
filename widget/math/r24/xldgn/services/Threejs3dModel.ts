import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { Helper } from './helper';
import { Line } from '../../../../../src/three/component/Line';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as a from './../sub_static/a.png';
import * as b from './../sub_static/b.png';
import * as absAlphe from './../sub_static/absA.png';

const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private helper = new Helper();
    private lineHelper = new Line();
    private dragPoint: THREE.Mesh;
    private dragArrow: THREE.Mesh;
    private vectorLine: any;
    private directionRotatePoint: THREE.Mesh;
    private highLightAnimation: any[] = [];
    private lengthPoint: THREE.Mesh;
    private lengthArrow: THREE.Mesh;
    private lengthHelperLine: any[] = [];
    private lengthText: THREE.Mesh;
    private normalText: THREE.Mesh;
    private vectorBPoint: THREE.Mesh;
    private vectorBLine: any;
    private vectorBArrow: THREE.Mesh;
    private vectorBText: THREE.Mesh;
    private vectorBAnimation: any;
    private arc: THREE.Mesh;
    private angleText: any;
    private isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    private arrowSize = this.isMobile ? 8 : 4;
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
        this.createDragVector();
        this.createStartPointAnimation();
        this.createDirectionLine();
        this.createLengthAuxiliaryLine();
        this.createBVector();
        this.createVectorBAnimation();
        this.drawArc();
        this.createAngleText();
        this.render();
    }

    preLoad () {
        const imageArray = [a, absAlphe, b];
        console.log(imageArray);
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
        const far     = 2000;
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

    removeObj(obj: THREE.Mesh, father: any) {
      father.remove(obj);
      obj.geometry.dispose();
      (obj.material as any).dispose();
    }

    redrawLine(color: string, endPoint: THREE.Vector3, startPoint?: THREE.Vector3, dashLine?: boolean) {
      startPoint = startPoint ? startPoint : new THREE.Vector3(0, 0, 0);
      dashLine = dashLine ? dashLine : false;
      const line =  this.lineHelper.createLine({
        startPoint: startPoint,
        endPoint: endPoint,
        color: color,
        lineWidth: 2000,
        lineWidthScale: 0.001,
        dashLine: dashLine
      });
      return line;
    }

    //创建可拖动向量
    createDragVector() {
        this.tips = ThreeUtil.createNormalText('箭头可拖动', 90, 15, 0, '#ffffff', 0.15);
        this.scene.add(this.tips);
        const color = '#18A2FF';
        this.dragArrow = this.helper.createArrow(this.arrowSize, color);
        this.dragPoint = this.helper.createDragPoint();
        this.vectorLine = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 0, 0),
          endPoint: new THREE.Vector3(155, 0, 0),
          color: color,
          lineWidth: 2000,
          lineWidthScale: 0.001,
        });
        this.normalText = ThreeUtil.createImg(32, 32, a, 77.5, -10, 0);
        //设置位置
        this.dragArrow.position.set(155, 0, 0);
        this.dragPoint.position.set(-77, 0, 0);
        //绑定事件
        this.bindDrag([this.dragPoint], () => {this.tips.visible = false; },
          () => { this.lengthPoint.position.set(this.dragPoint.position.x,
          this.dragPoint.position.y, this.dragPoint.position.z);
          this.vectorBPoint.position.set(this.dragPoint.position.x, this.dragPoint.position.y, 0);
        });
        this.bindDrag([this.dragArrow], () => {this.tips.visible = false; }, () => {
            const distance = Math.abs(Math.sqrt(Math.pow(0 - this.dragArrow.position.x, 2) + Math.pow(0 - this.dragArrow.position.y, 2)));
            const angle = this.helper.getRotateAngle(0, 0, this.dragArrow.position.x, this.dragArrow.position.y);
            this.dragArrow.rotation.z = angle;
            this.removeObj(this.vectorLine, this.dragPoint);
            this.vectorLine = this.redrawLine(color, new THREE.Vector3(this.dragArrow.position.x, this.dragArrow.position.y, 0));
            this.dragPoint.add(this.vectorLine);
            this.normalText.position.set(this.dragArrow.position.x / 2, this.dragArrow.position.y / 2 - 10, 0);
            this.redrawLengthAuxiliaryLine(distance, angle);
            this.directionRotatePoint.rotation.z = angle;
            if ((window as any).viewHandler.viewModel.$data.angleActived === true) {
              this.redrawAlphaVectorArc(this.helper.getSlope(0, 0, this.vectorBArrow.position.x, this.vectorBArrow.position.y));
              this.resetAnglePosition();
            }
        });
        this.dragPoint.add(this.dragArrow, this.vectorLine, this.normalText);
        this.scene.add(this.dragPoint);
    }

    //创建起点按钮的动画
    createStartPointAnimation() {
        this.highLightAnimation[1] = this.helper.createHighLightAnimation(this.dragPoint, 0.001, 1);
        this.highLightAnimation[0] = this.helper.createHighLightAnimation(this.dragPoint, 0.36, 0.001, () => {
            this.highLightAnimation[1].play();
        });
    }

    //播放动画的方法
    playAnimation() {
        if (this.highLightAnimation[0] && this.highLightAnimation[1]) {
            this.highLightAnimation[1].progress(0);
            this.highLightAnimation[1].pause();
            this.highLightAnimation[0].progress(0);
            this.highLightAnimation[0].pause();
            this.highLightAnimation[0].play();
        }
    }

  //重置动画的方法
  resetAnimation() {
    if (this.highLightAnimation[0] && this.highLightAnimation[1]) {
      this.highLightAnimation[1].progress(0);
      this.highLightAnimation[1].pause();
      this.highLightAnimation[0].progress(0);
      this.highLightAnimation[0].pause();
    }
  }

    //绘制长度按钮的辅助线
  createLengthAuxiliaryLine() {
      const color = '#FFD621';
      const lineWidth = 2000;
      this.lengthPoint = ThreeUtil.createSphere(1, color, 0.0001, -77, 0, 0);
      this.lengthHelperLine[0] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(8, -70, 0),
        endPoint: new THREE.Vector3(70, -70, 0),
        color: color,
        lineWidth: lineWidth,
        lineWidthScale: 0.001,
      });
      this.lengthHelperLine[1] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(147, -70, 0),
        endPoint: new THREE.Vector3(85, -70, 0),
        color: color,
        lineWidth: lineWidth,
        lineWidthScale: 0.001,
      });
      this.lengthHelperLine[2] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3( 0, 0, 0),
        endPoint: new THREE.Vector3(0, -72, 0),
        color: color,
        lineWidth: lineWidth,
        lineWidthScale: 0.001,
        dashLine: true
      });

      this.lengthHelperLine[3] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(157, 0, 0),
        endPoint: new THREE.Vector3(157, -72, 0),
        color: color,
        lineWidth: lineWidth,
        lineWidthScale: 0.001,
        dashLine: true
      });

      const arrow = this.helper.createArrow(this.arrowSize, color);
      this.lengthArrow = this.helper.createArrow(this.arrowSize, color);
      arrow.position.set(10, -70, 0);
      arrow.rotation.z = Math.PI;
      this.lengthArrow.position.set(147, -70 , 0);

      this.lengthText = ThreeUtil.createImg(64, 64, absAlphe, 77.5, -70, 0);
      this.lengthPoint.add(arrow, this.lengthArrow, this.lengthHelperLine[0], this.lengthHelperLine[1],
        this.lengthText, this.lengthHelperLine[2], this.lengthHelperLine[3]);
      this.scene.add(this.lengthPoint);
      this.lengthPoint.visible = false;
  }

  //重新绘制长度辅助线
  redrawLengthAuxiliaryLine(distance: number, angle: number) {
      const color = '#FFD621';
      this.lengthArrow.position.set(distance - 8, -70, 0);
      this.lengthText.position.set(distance / 2 , - 70 , 0);
      this.removeObj(this.lengthHelperLine[0], this.lengthPoint);
      this.removeObj(this.lengthHelperLine[1], this.lengthPoint);
      this.removeObj(this.lengthHelperLine[3], this.lengthPoint);
      this.lengthHelperLine[0] = this.redrawLine(color, new THREE.Vector3((distance / 2) - 7.5, -70, 0), new THREE.Vector3(8, -70, 0));
      this.lengthHelperLine[1] = this.redrawLine(color,
        new THREE.Vector3((distance / 2) + 7.5, -70, 0), new THREE.Vector3(distance - 8, -70, 0));
      this.lengthHelperLine[3] = this.redrawLine(color,
        new THREE.Vector3(distance + 2, -72, 0), new THREE.Vector3(distance + 2, 0, 0), true);
      this.lengthPoint.add(this.lengthHelperLine[0], this.lengthHelperLine[1], this.lengthHelperLine[3]);
      this.lengthArrow.position.set(distance - 8,  -70, 0);
      this.lengthPoint.rotation.z = angle;
      this.lengthText.rotation.z = -angle;
  }

    //绘制方向按钮的虚线
  createDirectionLine() {
      const color = '#FFD621';
      const lineWidth = 2000;
      this.directionRotatePoint = ThreeUtil.createSphere(1, '#000000', 0.0001, -77, -70, 0);
      const line = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 0, 0),
          endPoint: new THREE.Vector3(155, 0, 0),
          color: color,
          lineWidth: lineWidth,
          lineWidthScale: 0.001,
          dashLine: true
      });
      const arrow = this.helper.createArrow(this.arrowSize, color);
      arrow.position.set(155, 0, 0);
      this.directionRotatePoint.add(line, arrow);
      this.scene.add(this.directionRotatePoint);
      this.directionRotatePoint.visible = false;
  }

  //控制长度和方向按钮的辅助线显示
  isShowControl(lengthPoint: boolean, directionRotatePoint: boolean) {
    this.lengthPoint.visible = lengthPoint;
    this.directionRotatePoint.visible = directionRotatePoint;
  }

  //重置可拖动向量的方法
  resetDragVector() {
    const color = '#18A2FF';
    this.dragArrow.position.set(155, 0, 0);
    this.dragArrow.rotation.z = 0;
    this.dragPoint.position.set(-77, 0, 0);
    this.normalText.position.set(77.5, -10, 0);
    this.removeObj(this.vectorLine, this.dragPoint);
    this.vectorLine = this.redrawLine(color, new THREE.Vector3(155, 0, 0));
    this.dragPoint.add(this.vectorLine);
  }

  //重置长度按钮
  resetLengthButtonEvent() {
    this.lengthPoint.position.set(-77, 0, 0);
    this.redrawLengthAuxiliaryLine(155, 0);
  }

  //重置方向按钮
  resetDirectionEvent() {
    this.directionRotatePoint.rotation.z = 0;
  }

  //重置角度弧和向量B的位置
  resetVectorB() {
      this.removeObj(this.arc, this.vectorBPoint);
      this.reDrawArc(0, 30 * Math.PI / 180);
      this.arc.visible = false;
      this.angleText.visible = false;
      this.angleText.text = ' = 30°';
    this.angleText.position.set((this.arc.geometry as THREE.BufferGeometry).attributes.position.array[51] * 4,
      (this.arc.geometry as THREE.BufferGeometry).attributes.position.array[52] * 3, 0);
      this.removeObj(this.vectorBLine, this.vectorBPoint);
      this.vectorBLine = this.redrawLine('#18A2FF', new THREE.Vector3(130, Math.tan(30 * Math.PI / 180) * 130, 0));
      this.vectorBPoint.add(this.vectorBLine);
      this.vectorBArrow.rotation.z = 30 * Math.PI / 180;
      this.vectorBArrow.position.set(130, Math.tan(30 * Math.PI / 180) * 130, 0);
      this.vectorBText.position.set(this.vectorBArrow.position.x / 2, (this.vectorBArrow.position.y / 2) - 13, 0);
      this.vectorBPoint.position.set( -77, 30, 0);
  }

  //创建向量夹角按钮对应的B向量
  createBVector() {
    const color = '#18A2FF';
    const lineWidth = 2000;
    this.vectorBArrow = this.helper.createArrow(this.arrowSize, color);
    this.vectorBPoint = ThreeUtil.createSphere(1, color, 0.0001, -77,  30,  0);
    this.vectorBText = ThreeUtil.createImg(32, 32, b, 130 / 2, ((Math.tan(30 * Math.PI / 180) * 130) / 2 ) - 13, 0);
    this.vectorBLine = this.lineHelper.createLine( {
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(130, Math.tan(30 * Math.PI / 180) * 130, 0),
      color: color,
      lineWidth: lineWidth,
      lineWidthScale: 0.001,
    });
    this.bindDrag([this.vectorBArrow], () => {}, () => {
      this.vectorBArrow.rotation.z = this.helper.getRotateAngle(0, 0, this.vectorBArrow.position.x, this.vectorBArrow.position.y);
      this.removeObj(this.vectorBLine, this.vectorBPoint);
      this.vectorBLine = this.redrawLine(color, new THREE.Vector3(this.vectorBArrow.position.x, this.vectorBArrow.position.y, 0));
      this.vectorBPoint.add(this.vectorBLine);
      this.vectorBText.position.set(this.vectorBArrow.position.x / 2, (this.vectorBArrow.position.y / 2) - 13, 0);
      this.redrawBVectorArc(this.helper.getSlope(0, 0, this.dragArrow.position.x, this.dragArrow.position.y));
      this.resetAnglePosition();
    });
    this.vectorBArrow.rotation.z = 30 * Math.PI / 180;
    this.vectorBArrow.position.set(130, Math.tan(30 * Math.PI / 180) * 130, 0);
    this.vectorBPoint.add(this.vectorBLine, this.vectorBArrow, this.vectorBText);
    this.scene.add(this.vectorBPoint);
    this.vectorBPoint.visible = false;
  }

  //创建向量b的动画
  createVectorBAnimation() {
    this.vectorBAnimation = this.helper.createMoveAnimation(this.vectorBPoint, 30, 0, () => {
      this.arc.visible = true;
      this.angleText.visible = true;
    });
  }

  //播放向量b动画的方法
  vectorBPlay() {
      this.vectorBPoint.visible = true;
      this.vectorBAnimation.play();
  }

  //重置向量B动画
  resetVectorBAnimation() {
      this.vectorBPoint.visible = false;
      this.vectorBAnimation.progress(0);
      this.vectorBAnimation.pause();
  }

  //绘制向量夹角的弧
  drawArc() {
      const color = '#FFD621';
      this.arc = ThreeUtil.drawArc(10, 0, 30 * Math.PI / 180, color, 0.7);
      this.dragPoint.add(this.arc);
      this.arc.visible = false;
  }

  //重绘向量夹角的弧
  reDrawArc(startAngle: number, angle: number) {
    if (this.arc) {
      this.dragPoint.remove(this.arc);
      (this.arc.material as any).dispose();
      this.arc.geometry.dispose();
    }
    this.arc = ThreeUtil.drawArc(10, startAngle, angle, '#FFD621', 0.7);
    this.dragPoint.add(this.arc);
  }

  //创建角度文字
  createAngleText() {
    const color = '#FFD621';
    this.angleText = ThreeUtil.createNormalText(' = 30°', 0, 0, 0, color, 0.25);
    this.angleText.position.set((this.arc.geometry as THREE.BufferGeometry).attributes.position.array[51] * this.arrowSize,
      (this.arc.geometry as THREE.BufferGeometry).attributes.position.array[52] * 3, 0);
    const theta = ThreeUtil.createNewRomanText('α', -90, 0, 0, color , 1);
    this.angleText.add(theta);
    this.dragPoint.add(this.angleText);
    this.angleText.visible = false;
  }

  redrawBVectorArc(slope: number) {
    const tiltAngle = this.helper.getTiltAngle(0, 0, this.dragArrow.position.x, this.dragArrow.position.y);
    const angle = ThreeUtil.getAngle({x: 0, y: 0}, this.dragArrow.position.x, this.dragArrow.position.y,
      this.vectorBArrow.position.x, this.vectorBArrow.position.y);
    if (slope === undefined) {
      return;
    } else {
      if (this.dragArrow.position.x > 0) {
        if (this.vectorBArrow.position.y > slope * this.vectorBArrow.position.x) {
          this.reDrawArc(tiltAngle, angle);
        } else {
          this.reDrawArc(tiltAngle, -angle);
        }
      } else {
        if (this.vectorBArrow.position.y > slope * this.vectorBArrow.position.x) {
          this.reDrawArc(tiltAngle - Math.PI, -angle);
        } else {
          this.reDrawArc(tiltAngle - Math.PI, angle);
        }
      }
    }
  }

  redrawAlphaVectorArc(slope: number) {
      const tiltAngle = this.helper.getTiltAngle(0, 0, this.vectorBArrow.position.x, this.vectorBArrow.position.y);
      const angle = ThreeUtil.getAngle({x: 0, y: 0}, this.dragArrow.position.x, this.dragArrow.position.y,
        this.vectorBArrow.position.x, this.vectorBArrow.position.y);
    if (slope === undefined) {
      return;
    } else {
      if (this.vectorBArrow.position.x > 0) {
        if (this.dragArrow.position.y > slope * this.dragArrow.position.x) {
          this.reDrawArc(tiltAngle, angle);
        } else {
          this.reDrawArc(tiltAngle, -angle);
        }
      } else {
        if (this.dragArrow.position.y > slope * this.dragArrow.position.x) {
          this.reDrawArc(tiltAngle - Math.PI, -angle);
        } else {
          this.reDrawArc(tiltAngle - Math.PI, angle);
        }
      }
    }
  }

  //重新设置角度位置
  resetAnglePosition() {
    const angle = ThreeUtil.getAngle({x: 0, y: 0}, this.dragArrow.position.x, this.dragArrow.position.y,
    this.vectorBArrow.position.x, this.vectorBArrow.position.y);
    this.angleText.text = ' = ' + (angle * 180 / Math.PI).toFixed(0) + '°';

    this.angleText.position.set((this.arc.geometry as THREE.BufferGeometry).attributes.position.array[51] * 4,
      (this.arc.geometry as THREE.BufferGeometry).attributes.position.array[52] * 3, 0);
  }

  //显示隐藏提示
  isShowTips(boolean: boolean) {
    this.tips.visible = boolean;
  }


}




