import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as background from './../sub_static/background.png';
import * as bubble from './../sub_static/bubble.png';
import * as convexlens from './../sub_static/convexlens.png';
import * as pencil from './../sub_static/pencil.png';
import * as text1 from './../sub_static/f1.png';
import * as text2 from './../sub_static/f2.png';
import { Line } from '../../../../../src/three/component/Line';
import { Helper } from './Helper';

const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;

    private lineHelper = new Line();
    private helper = new Helper();

    private tips: THREE.Mesh;

    private pencil: THREE.Mesh;

    private fakePencil: THREE.Mesh;

    private topLightLine1: any;
    private topLightLine2: any;
    private bottomLightLine: any;
    private topLightArrow1: THREE.Group;
    private topLightArrow2: THREE.Group;
    private bottomLightArrow: THREE.Group;

    private lightLineGroup: THREE.Group;

    private pencilY = 417 / 20;

    private normalDashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 1 : 0;
    private normalGapSize = (window as any)['env'].browserInfo.os === 'iOS' ? 0.0001 : 1;

    private extensionCordGroup = new THREE.Group();
    private extensionCordLine1: any;
    private extensionCordLine2: any;

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

    loadImage() {
        const image = [background, bubble, convexlens, pencil, text1, text2];
        console.log(image);
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createBackground();
        this.createDashLine();
        this.createPoint();
        this.createMirror();
        this.createText();
        this.createTips();
        this.createPencil();
        this.createLightMap();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2D2D2D );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        const zPosition = window['env'].browserInfo.isIpad ? 130 : 120;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  zPosition);
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

    /*创建背景图片*/
    createBackground() {
        const backgroundImage = ThreeUtil.createImg(300, 200, background, 0, 0, -2);
        this.scene.add(backgroundImage);
    }

    /*创建虚线*/
    createDashLine () {
        const dashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 4 : 1.2;
        const dashLine = this.lineHelper.createLine({
            startPoint: new THREE.Vector3(-75, 0, 0),
            endPoint: new THREE.Vector3(75, 0, 0),
            color: '#FFFFFF',
            lineWidth: 500,
            lineWidthScale: 0.003,
            dashSize : dashSize,
            dashLine: true,
            depthTest: true
        });
        this.scene.add(dashLine);
    }

    /*创建紫色圆点*/
    createPoint () {
        const pointHelper = new Helper();
        const point = [];
        const color = '#e32bff';
        const redColor = '#ff2a2a';

        for (let i = 0; i < 4; i++) {
            point.push(pointHelper.createPoint(color));
            this.scene.add(point[i]);
        }

        point.push(pointHelper.createPoint(redColor));
        this.scene.add(point[point.length - 1]);


        /*移动点的位置*/
        let j = 0;
        for (let i = 0; i < 2; i++) {
            j += 20;
            point[i].position.set(j, 0, 0);
            point[i + 2].position.set(-j, 0, 0);
        }
    }

    /*创建镜子*/
    createMirror() {
        const width = 174;
        const height = 942;
        const mirror = ThreeUtil.createImg(width / 20, height / 20, convexlens, 0, 0, -0.01);
        this.scene.add(mirror);
    }

    /*创建文字*/
    createText() {
        const f1 = ThreeUtil.createImg(90 / 20, 102 / 20 , text1, 20, 4 , 0);
        const f2 = ThreeUtil.createImg(123 / 20, 102 / 20 , text2, 40, 4 , 0);
        const f3 = f1.clone();
        const f4 = f2.clone();
        f3.position.set(-20, 4 , 0);
        f4.position.set(-40, 4 , 0);
        this.scene.add(f1, f2, f3, f4);
    }

    /*创建提示*/
    createTips() {
        const width = 426;
        const height = 147;
        const word = (window as any).env.browserInfo.lang.tips;
        this.tips = ThreeUtil.createImg(width / 20, height / 20, bubble, -43.5, (417 / 20) + ((height / 20) / 2), 0);
        const text = ThreeUtil.createNormalText(word, 0, height / 80, 0, '#FF8E2A', 0.06);
        this.tips.add(text);
        this.scene.add(this.tips);
    }

    /*创建铅笔 并绑定拖动事件以及限定位置*/
    createPencil() {
        const width = 66;
        const height = 417;
        this.pencil = ThreeUtil.createImg(width / 20, height / 20, pencil, -50, (height / 20) / 2, 0);
        this.scene.add(this.pencil);
        const dargControls = new dragcontrols([this.pencil], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => { this.controls.enabled = false;
            this.pencil.position.y = (height / 20) / 2;
            this.tips.visible = false;
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.pencil.position.y = (height / 20) / 2;
            if (this.pencil.position.x < -71.7) { this.pencil.position.x = -71.7; }
            if (this.pencil.position.x > -6) {this.pencil.position.x = -6; }
            this.pencilDragEvent();
        });
        dargControls.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true;
            this.pencil.position.y = (height / 20) / 2;
        } );
    }

    /*创建光路线*/
    createLightMap() {
        /*
        * 1.通过已知的直线上两点 求出斜率
        * 2.通过已知的直线上的点和斜率求出两直线方程 计算出两直线的交点
        * 3.通过已知的起点和计算出的交点连线
        * 4.通过起点和终点计算出箭头的位置 并根据已知的斜率计算出旋转的角度
        * */
        const helper = new Helper();
        const y = 417 / 20;
        const bottomSlope = helper.getSlope(this.pencil.position.x, y, 0, 0);
        const topSlope = helper.getSlope(0, y, 20, 0);
        const focus = helper.getFocus(bottomSlope, topSlope,  0, 0, 0, 20);
        this.lightLineGroup = new THREE.Group();
        /*创建铅笔的虚像*/
        const imageHeight = focus.y;
        const imageWidth = imageHeight * (66 / 417);
        this.fakePencil = ThreeUtil.createImg(imageWidth, imageHeight, pencil, focus.x, focus.y / 2, 0);
        /*创建直线*/
        this.createLightLine();

        this.topLightArrow1   = helper.createArrow();
        this.topLightArrow2   = helper.createArrow();
        this.bottomLightArrow = helper.createArrow();

        this.topLightArrow1.position.set((this.pencil.position.x + 0) / 2, y, 0);
        this.topLightArrow2.position.set((0 + focus.x) / 2, (y + focus.y) / 2, 0);
        this.bottomLightArrow.position.set((this.pencil.position.x + focus.x) / 2, (y + focus.y) / 2, 0);

        this.topLightArrow2.rotation.z   = Math.atan(topSlope);
        this.bottomLightArrow.rotation.z = Math.atan(bottomSlope);

        this.lightLineGroup.add(this.topLightArrow1, this.topLightArrow2, this.bottomLightArrow);
        this.lightLineGroup.visible = false;
        this.extensionCordGroup.visible = false;
        this.scene.add(this.lightLineGroup, this.extensionCordGroup, this.fakePencil);
    }


    /*铅笔拖动时触发的方法*/
    pencilDragEvent() {
        /*重新绘制光线*/
        this.removeLine(this.lightLineGroup, this.topLightLine1);
        this.removeLine(this.lightLineGroup, this.topLightLine2);
        this.removeLine(this.lightLineGroup, this.bottomLightLine);
        /*重新设置直线*/
        const topSlope = this.helper.getSlope(0, this.pencilY, 20, 0);
        const bottomSlope = this.helper.getSlope(this.pencil.position.x, this.pencilY, 0, 0);
        const focus = this.helper.getFocus(bottomSlope, topSlope,  0, 0, 0, 20);
        this.removeLine(this.extensionCordGroup, this.extensionCordLine1);
        this.removeLine(this.extensionCordGroup, this.extensionCordLine2);

        if (this.pencil.position.x < -20) {
            this.topLightLine2 = this.createLineHelper(new THREE.Vector3(0, this.pencilY, 0),
              new THREE.Vector3(focus.x, focus.y, 0), this.normalDashSize, this.normalGapSize);
            this.bottomLightLine = this.createLineHelper(new THREE.Vector3(this.pencil.position.x, this.pencilY, 0),
              new THREE.Vector3(focus.x, focus.y, 0), this.normalDashSize, this.normalGapSize);
        } else {
          /*如果是虚像计算并绘制虚像的虚线*/
          this.topLightLine2 = ThreeUtil.createDashLine(new THREE.Vector3(0, this.pencilY, 0),
            new THREE.Vector3(focus.x, focus.y, 0), '#E32BFF', 1, 1);
          this.bottomLightLine = ThreeUtil.createDashLine(new THREE.Vector3(this.pencil.position.x, this.pencilY, 0),
            new THREE.Vector3(focus.x, focus.y, 0), '#E32BFF', 1, 1);
          const endPointY = -20;
          const extensionCordEndPoint1 = ((endPointY - 0) / bottomSlope) + 0;
          const extensionCordEndPoint2 = ((endPointY - 0) / topSlope) + 20;
          this.extensionCordLine1 = this.createLineHelper(new THREE.Vector3(this.pencil.position.x, this.pencilY, 0),
            new THREE.Vector3(extensionCordEndPoint1, endPointY, 0),
            this.normalDashSize, this.normalGapSize);
          this.extensionCordLine2 = this.createLineHelper(new THREE.Vector3(0, this.pencilY, 0),
            new THREE.Vector3(extensionCordEndPoint2, endPointY, 0),
            this.normalDashSize, this.normalGapSize);
          this.extensionCordGroup.add(this.extensionCordLine1, this.extensionCordLine2);

        }
      this.topLightLine1 = this.createLineHelper(new THREE.Vector3(this.pencil.position.x, this.pencilY, 0),
        new THREE.Vector3(0, this.pencilY, 0), this.normalDashSize, this.normalGapSize);
        this.lightLineGroup.add(this.topLightLine1, this.topLightLine2, this.bottomLightLine);
        /*重新设置箭头的位置*/
        this.resetArrowPosition();
        /*重新设置照片的位置及大小*/
        this.resetPencilPosition(focus);
    }

    resetPencilPosition(focus: any) {
        const scale = focus.y / -13.9;
        this.fakePencil.scale.setX(scale);
        this.fakePencil.scale.setY(scale);
        this.fakePencil.position.set(focus.x, focus.y / 2, 0);
        if (this.pencil.position.x < -20) {
          (this.fakePencil as any).material.opacity = 1;
        } else {
          (this.fakePencil as any).material.opacity = 0.3;
        }
    }

    /*删除线的方法*/
    removeLine(father: THREE.Group, obj: THREE.Mesh) {
        if (obj) {
          father.remove(obj);
          (obj as any).material.dispose();
          obj.geometry.dispose();
        }
    }

    /*创建光线的方法*/
    createLightLine() {
      const color = '#E32BFF';
      const lineWidth = 300;
      const lineWidthScale = 0.003;
      const dashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 1 : 0;
      const gapSize = (window as any)['env'].browserInfo.os === 'iOS' ? 0.0001 : 1;
      const depthTest = true;
      const helper = new Helper();
      const y = 417 / 20;
      const bottomSlope = helper.getSlope(this.pencil.position.x, y, 0, 0);
      const topSlope = helper.getSlope(0, y, 20, 0);
      const focus = helper.getFocus(bottomSlope, topSlope,  0, 0, 0, 20);
      this.lightLineGroup = new THREE.Group();

      this.topLightLine1 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(this.pencil.position.x, y, 0),
        endPoint: new THREE.Vector3(0, y, 0),
        lineWidth: lineWidth,
        lineWidthScale: lineWidthScale,
        color: color,
        dashLine: true,
        dashSize: dashSize,
        gapSize: gapSize,
        depthTest: depthTest,
      });

      this.topLightLine2 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, y, 0),
        endPoint: new THREE.Vector3(focus.x, focus.y, 0),
        lineWidth: lineWidth,
        lineWidthScale: lineWidthScale,
        color: color,
        dashLine: true,
        dashSize: dashSize,
        gapSize: gapSize,
        depthTest: depthTest,
      });

      this.bottomLightLine = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(this.pencil.position.x, y, 0),
        endPoint: new THREE.Vector3(focus.x, focus.y, 0),
        lineWidth: lineWidth,
        lineWidthScale: lineWidthScale,
        color: color,
        dashLine: true,
        dashSize: dashSize,
        gapSize: gapSize,
        depthTest: depthTest,
      });
      this.lightLineGroup.add(this.topLightLine1, this.topLightLine2, this.bottomLightLine);
    }

    /*创建线的方法*/
    createLineHelper(startPoint: THREE.Vector3, endPoint: THREE.Vector3, dashSize: number, gapSize: number) {
        const line = this.lineHelper.createLine({
          startPoint: startPoint,
          endPoint: endPoint,
          lineWidth: 300,
          lineWidthScale: 0.003,
          color: '#E32BFF',
          dashLine: true,
          dashSize: dashSize,
          gapSize:  gapSize,
          depthTest: true,
        });
        return line;
    }

    /*重新设置箭头的位置及方向*/
    resetArrowPosition() {
      const y = 417 / 20;
      const helper = new Helper();
      const bottomSlope = helper.getSlope(this.pencil.position.x, y, 0, 0);
      const topSlope = helper.getSlope(0, y, 20, 0);
      const focus = helper.getFocus(bottomSlope, topSlope,  0, 0, 0, 20);
      const endPointY = -10;
      const extensionCordEndPoint1 = ((endPointY - 0) / bottomSlope) + 0;
      const extensionCordEndPoint2 = ((endPointY - 0) / topSlope) + 20;
      if (this.pencil.position.x >= -20) {
        this.topLightArrow2.position.set((extensionCordEndPoint2 + 0) / 2, (y + endPointY) / 2, 0);
        this.bottomLightArrow.position.set((extensionCordEndPoint1 + this.pencil.position.x) / 2, (y + endPointY) / 2, 0);
      } else {
        this.topLightArrow2.position.set((0 + focus.x) / 2, (y + focus.y) / 2, 0);
        this.bottomLightArrow.position.set((this.pencil.position.x + focus.x) / 2, (y + focus.y) / 2, 0);
      }

      this.topLightArrow1.position.set((this.pencil.position.x + 0) / 2, y, 0);

      this.topLightArrow2.rotation.z   = Math.atan(topSlope);
      this.bottomLightArrow.rotation.z = Math.atan(bottomSlope);
    }

    /*按钮触发的方法*/
    isShowLightMap(value: boolean) {
       this.lightLineGroup.visible = value;
       this.extensionCordGroup.visible = value;
    }

    /*重置按钮*/
    reset() {
      this.pencil.position.x = -50;
      this.pencilDragEvent();
      this.tips.visible = true;
    }
}




