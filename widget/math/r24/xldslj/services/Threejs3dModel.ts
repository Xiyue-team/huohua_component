import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as background from './../sub_static/background.png';
import * as a from './../sub_static/a.png';
import * as b from './../sub_static/b.png';
import { Helper } from './Helper';
import { Line } from '../../../../../src/three/component/Line';
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private helper = new Helper();
    private lineHelper = new Line();
    private normalGroup: THREE.Group;
    private axisGroup: THREE.Group;
    private fixedRect: THREE.Mesh;
    private dragRect: THREE.Mesh;
    private dragRange: THREE.Mesh;
    private arrow: THREE.Mesh[] = [];
    private line: any[] = [];
    private dragControl1: any;
    private dragControl2: any;
    private arc: THREE.Mesh;
    private textAlpha: any;
    private textF: any;
    private textS: any;
    private texta: any;
    private textb: any;
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
        this.preLoad();
        this.createArrow();
        this.createBackground();
        this.createDragRect();
        this.createAxis();
        this.createText();
        this.render();
    }

    preLoad() {
        const imageArray = [background, a, b];
        console.log(imageArray);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2d2d2d);
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
      return dargControls;
    }

    //创建背景
    createBackground() {
        const backgroundImg = ThreeUtil.createImg(204.8 * 4.5 , 102.4 * 4, background, 0, 0, -1);
        this.normalGroup = new THREE.Group();
        this.scene.add(this.normalGroup);
        this.normalGroup.add(backgroundImg);
    }

    //创建文字
    createText() {
        const text = ThreeUtil.createNormalText('光滑地面', -200, -140, 1, '#ffffff', 0.25);
        const drag = ThreeUtil.createNormalText('Drag', 0, 5, 0, '#ffffff', 0.25);
        this.dragRect.add(drag);
        this.textAlpha = ThreeUtil.createNewRomanText('α', 0, 0, 0, '#BA18FF', 0.25);
        this.textAlpha.visible = false;
        this.scene.add(this.textAlpha);
        this.textF = ThreeUtil.createNewRomanText('F', 0, 0, 0, '#000000', 0.25);
        this.textS = ThreeUtil.createNewRomanText('S', 0, 0, 0, '#000000', 0.25);
        this.normalGroup.add(text, this.textS, this.textF);
        this.textF.visible = false;
        this.textS.visible = false;
        this.texta = ThreeUtil.createImg(39, 18, a, 0, 0, 0);
        this.textb = ThreeUtil.createImg(39, 18, b, 0, 0, 0);
        this.texta.visible = false;
        this.textb.visible = false;
        this.axisGroup.add(this.texta, this.textb);
    }

    //创建滑块
    createDragRect() {
        const width = 118 / 2;
        const height = 104 / 2;
        const color = '#5abcc6';
        this.fixedRect = ThreeUtil.createPlane(width, height, color, 1);
        this.dragRect = ThreeUtil.createPlane(width, height, color, 1);
        this.dragRange = ThreeUtil.createPlane(width, height, color, 0.001);
        this.fixedRect.position.set(-150, -99.5, 0);
        this.dragRect.position.set(-150, -99.5, 0);
        this.dragRange.position.set(-150, -99.5, 0);
        this.dragControl1 = this.bindDrag([this.dragRect], () => {}, () => {
            this.dragRect.position.y = -99.5;
          if (this.dragRect.position.x > 200) {
            this.dragRect.position.x = 200;
          } else if (this.dragRect.position.x < -350) {
            this.dragRect.position.x = -350;
          }
        }, () => {
          this.redrawLine(0);
          if (this.dragRect.position.x > -150) {
            this.createLine(0, new THREE.Vector3(this.dragRect.position.x + 25.5, this.dragRect.position.y, 1));
          } else {
            this.createLine(0, new THREE.Vector3(this.dragRect.position.x - 25.5, this.dragRect.position.y, 1));
          }
        });
        this.dragControl2 = this.bindDrag([this.dragRange], () => {}, () => {
          if (this.dragRange.position.x > 200) {
            this.dragRange.position.x = 200;
          } else if (this.dragRange.position.x < -350) {
            this.dragRange.position.x = -350;
          }

          if (this.dragRange.position.y > 150) {
            this.dragRange.position.y = 150;
          } else if (this.dragRange.position.y < - 170) {
            this.dragRange.position.y = -170;
          }
        }, () => {
            this.redrawLine(1);
            this.createLine(1, new THREE.Vector3(this.dragRange.position.x, this.dragRange.position.y, 1));
            if (this.arc) {this.removeArc(); }
            this.createArc(this.dragRange.position.x, this.dragRange.position.y, this.helper.getRotateAngle(-150, -99.5,
              this.dragRange.position.x, this.dragRange.position.y));

            if (this.normalGroup.visible === true) {
              this.textF.visible = true;
              this.textF.position.set(this.dragRange.position.x, this.dragRange.position.y + 15, 0);
              this.textS.visible = true;
              this.textS.position.set((-150 + this.dragRect.position.x) / 2 , -109.5, 0);
            }
            this.textAlpha.visible = true;
            const alphaPosition = this.helper.getArcPosition({x: -150, y: -99.5}, this.dragRange.position.x,
              this.dragRange.position.y, this.dragRect.position.x, this.dragRect.position.y);
          this.textAlpha.position.set(alphaPosition.x, alphaPosition.y, 0);
            this.texta.position.set(this.dragRect.position.x, this.dragRect.position.y - 10, 0);
            this.textb.position.set(this.dragRange.position.x, this.dragRange.position.y + 15, 0);
            this.dragRange.position.set(this.dragRect.position.x, this.dragRect.position.y, this.dragRect.position.z);
        });
        this.normalGroup.add(this.fixedRect, this.dragRange, this.dragRect);
    }

    //创建坐标轴
    createAxis() {
      const color = '#ffffff';
      const width = 320;
      const height = 2;
      this.axisGroup = new THREE.Group();
      const axisX = ThreeUtil.createPlane(width + 100, height, color, 0.32);
      axisX.position.set(-30 + 50, -99.5, 0);
      const axisY = ThreeUtil.createPlane(height, width, color, 0.32);
      axisY.position.set(-150, 0, 0);
      const arrowX = this.helper.createArrow(4, color, 0.32);
      arrowX.position.set(130 + 100, -99.5, 0);
      const arrowY = this.helper.createArrow(4, color, 0.32);
      arrowY.position.set(-150, 160, 0);
      arrowY.rotation.z = Math.PI / 2;
      this.axisGroup.add(axisX, axisY, arrowX, arrowY);
      this.axisGroup.visible = false;
      this.scene.add(this.axisGroup);
    }

    //创建对应的路径的方法
    createLine(index: number, endPoint: THREE.Vector3) {
      const angle = this.helper.getRotateAngle(-150, -99.5, endPoint.x, endPoint.y);
      this.arrow[index].visible = true;
      this.arrow[index].rotation.z = angle;
      this.arrow[index].position.set(endPoint.x, endPoint.y, endPoint.z);
      this.line[index] = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(-150, -99.5, 1),
        endPoint: endPoint,
        color: '#FF5A5A',
        lineWidth: 2000,
        depthTest: true,
        lineWidthScale: 0.001,
      });
      this.scene.add(this.line[index]);
    }

    redrawLine(index: number) {
      if (this.line[index]) {
        this.scene.remove(this.line[index]);
        this.line[index].geometry.dispose();
        (this.line[index].material as any).dispose();
      }
    }

    //创建箭头
  createArrow() {
    this.arrow[0] = this.helper.createArrow(4, '#FF5A5A');
    this.arrow[1] = this.arrow[0].clone();
    for (let i = 0; i < 2; i++) {
      this.arrow[i].visible = false;
      this.scene.add(this.arrow[i]);
    }
  }

    //创建角度弧
  createArc(positionX: number, positionY: number, angle: number) {
    if (positionX > -150) {
      this.arc = ThreeUtil.drawArc(30, 0, angle, '#BA18FF', 0.7);
    } else {
      angle = angle - Math.PI;
      this.arc = ThreeUtil.drawArc(30, -Math.PI, angle, '#BA18FF', 0.7);
    }
    this.arc.position.set(-150, -99.5, 0);
    this.scene.add(this.arc);
  }

    //删除角度弧
  removeArc() {
    this.scene.remove(this.arc);
    (this.arc.material as any).dispose();
    this.arc.geometry.dispose();
  }

  //是否显示坐标轴层
  isShowAxis(value: boolean) {
      if (value === true) {
        this.normalGroup.visible = false;
        this.axisGroup.visible = true;
        this.dragControl1.deactivate();
        this.dragControl2.deactivate();
        if (this.textS.visible === true) {
          this.texta.visible = true;
          this.textb.visible = true;
        }
      } else {
        this.normalGroup.visible = true;
        this.axisGroup.visible = false;
        this.dragControl1.activate();
        this.dragControl2.activate();
      }
  }

  reset () {
    this.normalGroup.visible = true;
    this.axisGroup.visible = false;
    this.dragControl1.activate();
    this.dragControl2.activate();
    this.textAlpha.visible = false;
    this.textS.visible = false;
    this.textb.visible = false;
    this.texta.visible = false;
    this.textF.visible = false;
    if (this.arc) {this.removeArc(); }
    for (let i = 0; i < 2; i++) {
      this.redrawLine(i);
      this.arrow[i].visible = false;
    }
    this.dragRange.position.set(-150, -99.5, 0);
    this.dragRect.position.set(-150, -99.5, 0);
  }
}




