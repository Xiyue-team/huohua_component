import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as background from './../sub_static/background.png';
import * as eyepiece from './../sub_static/eyepiece.png';
import * as objectiveLens from './../sub_static/objectiveLens.png';
import * as tree from './../sub_static/tree.png';
import * as bubble from './../sub_static/bubble.png';
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

    private eyepieceImage: THREE.Mesh;

    private fakeTree: THREE.Mesh;

    private tips: THREE.Mesh;
    private lightMapGroup = new THREE.Group();

    private bottomLigthLine: any;
    private topLeftLightLine: any;
    private topRightLightLine: any;

    private bottomFakeArrow: THREE.Group;
    private topLeftFakeArrow: THREE.Group;
    private topRightFakeArrow: THREE.Group;

    private normalDashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 1 : 0;
    private normalGapSize = (window as any)['env'].browserInfo.os === 'iOS' ? 0.0001 : 1;

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

    init() {
        this.loadImage();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.createBackground();
        this.createDashLine();
        this.createEyepiece();
        this.createPoint();
        this.createText();
        this.createObjectiveLens();
        this.createTips();
        this.createTree();
        this.createLightMap();
        this.createArrow();
        this.bindDrag();
        this.render();
    }

    /*预加载图片*/
    loadImage() {
        const imageArray = [background, eyepiece, objectiveLens, tree, bubble, text1, text2];
        console.log(imageArray);
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

    /*创建背景图*/
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


    /*创建标识点*/
    createPoint () {
        const point = [];
        const color = '#e32bff';
        const redColor = '#ff2a2a';

        for (let i = 0; i < 4; i++) {
          point.push(this.helper.createPoint(color));
          this.eyepieceImage.add(point[i]);
        }

        point.push(this.helper.createPoint(redColor));
        this.eyepieceImage.add(point[point.length - 1]);

        /*移动点的位置*/
        let j = 0;
        for (let i = 0; i < 2; i++) {
          j += 10;
          point[i].position.set(j, 0, 0);
          point[i + 2].position.set(-j, 0, 0);
        }
    }

    /*创建文字*/
    createText() {
        const texts = window.env.browserInfo.lang;
        const f1 = ThreeUtil.createImg(90 / 20, 102 / 20 , text1, 10, 4 , 0);
        const f2 = ThreeUtil.createImg(123 / 20, 102 / 20 , text2, 20, 4 , 0);
        const f3 = f1.clone();
        const f4 = f2.clone();
        f3.position.set(-10, 4 , 0);
        f4.position.set(-20, 4 , 0);
        this.eyepieceImage.add(f1, f2, f3, f4);

        const eyepieceText = ThreeUtil.createNormalText(texts.mujing, 0,  28, 0, '#ffffff', 0.05);
        const objectiveLensText = ThreeUtil.createNormalText(texts.wujing, -30, 32, 0, '#ffffff', 0.05);
        this.eyepieceImage.add(eyepieceText);
        this.scene.add(objectiveLensText);
    }

    /*创建目镜*/
    createEyepiece() {
        const width = 96;
        const height = 636;
        this.eyepieceImage = ThreeUtil.createImg(width / 20, height / 20, eyepiece, 10, 0, 0);
        this.scene.add(this.eyepieceImage);
    }

    /*创建物镜*/
    createObjectiveLens() {
        const width = 174;
        const height = 945;
        const redColor = '#ff2a2a';
        const objectiveLensImage = ThreeUtil.createImg(width / 20, height / 20, objectiveLens, -30, 0, 0);
        objectiveLensImage.add(this.helper.createPoint(redColor));
        this.scene.add(objectiveLensImage);
    }

    /*创建树*/
    createTree() {
        const width = 255;
        const height = 453;
        const normalTree = ThreeUtil.createImg(width / 20, height / 20, tree, (-75 + ((width / 2) / 20)), height / 20 / 2, 0);
        const topSlope = this.helper.getSlope(-30, height / 20, -15, 0);
        const bottomSlope = this.helper.getSlope(normalTree.position.x, height / 20, -30, 0);
        const focus = this.helper.getFocus(bottomSlope, topSlope, 0, 0, -30, -15);
        const leftSlope = this.helper.getSlope(focus.x, focus.y, this.eyepieceImage.position.x, 0);
        const rightSlope = this.helper.getSlope(this.eyepieceImage.position.x, focus.y, this.eyepieceImage.position.x + 10, 0);
        const fakeFocus = this.helper.getFocus(leftSlope, rightSlope, 0, 0,
          this.eyepieceImage.position.x, this.eyepieceImage.position.x + 10);
        const mirrorWidth = ((width / 20) / (height / 20)) * focus.y;
        const mirrorTree = ThreeUtil.createImg(mirrorWidth, focus.y, tree, focus.x, focus.y / 2, 0);
        this.fakeTree = ThreeUtil.createImg((255 / 453) * fakeFocus.y, fakeFocus.y, tree, fakeFocus.x, fakeFocus.y / 2, 0);
        this.scene.add(normalTree, mirrorTree, this.fakeTree);
    }

    /*创建提示*/
    createTips() {
      const width = 426;
      const height = 147;
      const word = (window as any).env.browserInfo.lang.tips;
      this.tips = ThreeUtil.createImg(width / 20, height / 20, bubble, 17, 20, 0);
      const text = ThreeUtil.createNormalText(word, 0, height / 80, 0, '#FF8E2A', 0.06);
      this.tips.add(text);
      this.scene.add(this.tips);
    }


    /*创建光路*/
    createLightMap() {
      const pointX = (-75 + ((255 / 2) / 20));
      const pointY = 453 / 20;
      const topSlope = this.helper.getSlope(-30, pointY, -15, 0);
      const bottomSlope = this.helper.getSlope( pointX, pointY, -30, 0);
      const focus = this.helper.getFocus(bottomSlope, topSlope, 0, 0, -30, -15);
      const mirrorX = focus.x;
      const mirrorY = focus.y;
      const leftSlope = this.helper.getSlope(focus.x, focus.y, this.eyepieceImage.position.x, 0);
      const rightSlope = this.helper.getSlope(this.eyepieceImage.position.x, focus.y, this.eyepieceImage.position.x + 10, 0);
      const fakeFocus = this.helper.getFocus(leftSlope, rightSlope, 0, 0,
        this.eyepieceImage.position.x, this.eyepieceImage.position.x + 10);
      /*创建固定光线上左 上右 下*/
      const lightLine1 = this.helper.createLineHelper( new THREE.Vector3(pointX, pointY, 0),
        new THREE.Vector3(-30, pointY, 0), this.normalDashSize, this.normalGapSize);
      const lightLine2 = this.helper.createLineHelper( new THREE.Vector3(-30, pointY, 0),
        new THREE.Vector3(focus.x, focus.y, 0), this.normalDashSize, this.normalGapSize);
      const lightLine3 = this.helper.createLineHelper( new THREE.Vector3(pointX, pointY, 0),
        new THREE.Vector3(focus.x, focus.y, 0), this.normalDashSize, this.normalGapSize);
      this.bottomLigthLine = this.helper.createLineHelper(new THREE.Vector3(mirrorX, mirrorY, 0),
        new THREE.Vector3(this.eyepieceImage.position.x, mirrorY, 0), this.normalDashSize, this.normalGapSize);
      this.topLeftLightLine = this.helper.createLineHelper(new THREE.Vector3(mirrorX, mirrorY, 0),
        new THREE.Vector3(fakeFocus.x, fakeFocus.y, 0), this.normalDashSize, this.normalGapSize);
      this.topRightLightLine = this.helper.createLineHelper(new THREE.Vector3(this.eyepieceImage.position.x, mirrorY, 0),
        new THREE.Vector3(fakeFocus.x, fakeFocus.y, 0), this.normalDashSize, this.normalGapSize);
      this.lightMapGroup.add(lightLine1, lightLine2, lightLine3, this.bottomLigthLine, this.topLeftLightLine, this.topRightLightLine);
      this.lightMapGroup.visible = false;
      this.scene.add(this.lightMapGroup);
    }

    /*给物镜绑定drag事件*/
    bindDrag() {
      const dargControls = new dragcontrols([this.eyepieceImage], this.camera, this.renderer.domElement);
      dargControls.addEventListener( 'dragstart',  ( event: any ) => { this.controls.enabled = false;
        this.tips.visible = false;
        this.eyepieceImage.position.y = 0;
      } );
      dargControls.addEventListener( 'drag', ( event: any) => {
        this.eyepieceImage.position.y = 0;
        if (this.eyepieceImage.position.x > 45) {
          this.eyepieceImage.position.x = 45;
        } else if (this.eyepieceImage.position.x < 1) {
          this.eyepieceImage.position.x = 1;
        }
        this.dragEventHelper();
      });
      dargControls.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true;
      } );
    }

    /*创建箭头*/
    createArrow() {
        const pointX = (-75 + ((255 / 2) / 20));
        const pointY = 453 / 20;
        const topSlope = this.helper.getSlope(-30, pointY, -15, 0);
        const bottomSlope = this.helper.getSlope( pointX, pointY, -30, 0);
        const focus = this.helper.getFocus(bottomSlope, topSlope, 0, 0, -30, -15);
        const leftSlope = this.helper.getSlope(focus.x, focus.y, this.eyepieceImage.position.x, 0);
        const rightSlope = this.helper.getSlope(this.eyepieceImage.position.x, focus.y, this.eyepieceImage.position.x + 10, 0);
        const fakeFocus = this.helper.getFocus(leftSlope, rightSlope, 0, 0,
            this.eyepieceImage.position.x, this.eyepieceImage.position.x + 10);
        const fixedArrow1 = this.helper.createArrow();
        const fixedArrow2 = this.helper.createArrow();
        const fixedArrow3 = this.helper.createArrow();
        this.bottomFakeArrow = this.helper.createArrow();
        this.topLeftFakeArrow = this.helper.createArrow();
        this.topRightFakeArrow = this.helper.createArrow();

        fixedArrow1.position.set((pointX + (-30)) / 2, (pointY + pointY) / 2, 0);
        fixedArrow2.position.set((-30 + focus.x) / 2, (pointY + focus.y) / 2, 0);
        fixedArrow3.position.set((pointX + focus.x) / 2, (pointY + focus.y) / 2, 0);

        this.bottomFakeArrow.position.set((focus.x + this.eyepieceImage.position.x) / 2, focus.y, 0);
        this.topLeftFakeArrow.position.set((focus.x + fakeFocus.x) / 2, (focus.y + fakeFocus.y) / 2, 0);
        this.topRightFakeArrow.position.set((this.eyepieceImage.position.x + fakeFocus.x) / 2, (focus.y + fakeFocus.y) / 2, 0);

        fixedArrow2.rotation.z = Math.atan(topSlope);
        fixedArrow3.rotation.z = Math.atan(bottomSlope);
        this.topLeftFakeArrow.rotation.z = Math.atan(leftSlope);
        this.topRightFakeArrow.rotation.z = Math.atan(rightSlope);

        this.lightMapGroup.add(fixedArrow1, fixedArrow2, fixedArrow3, this.bottomFakeArrow, this.topLeftFakeArrow, this.topRightFakeArrow);
    }

    /*创建拖动事件时所执行的方法*/
    dragEventHelper() {
        /*重绘光线*/
        const config = this.getLightData();
        this.helper.removeLine(this.lightMapGroup, this.bottomLigthLine);
        this.helper.removeLine(this.lightMapGroup, this.topLeftLightLine);
        this.helper.removeLine(this.lightMapGroup, this.topRightLightLine);
        this.helper.removeLine(this.lightMapGroup, this.extensionCordLine1);
        this.helper.removeLine(this.lightMapGroup, this.extensionCordLine2);
        this.bottomLigthLine = this.helper.createLineHelper(new THREE.Vector3(config.focus.x, config.focus.y, 0),
          new THREE.Vector3(this.eyepieceImage.position.x, config.focus.y, 0), this.normalDashSize, this.normalGapSize);
        if (this.eyepieceImage.position.x - 10 > config.focus.x) {
          (this.fakeTree.material as any).opacity = 1;
          this.topLeftLightLine = this.helper.createLineHelper(new THREE.Vector3(config.focus.x, config.focus.y, 0),
            new THREE.Vector3(config.fakeFocus.x, config.fakeFocus.y, 0), this.normalDashSize, this.normalGapSize);
          this.topRightLightLine = this.helper.createLineHelper(new THREE.Vector3(this.eyepieceImage.position.x, config.focus.y, 0),
            new THREE.Vector3(config.fakeFocus.x, config.fakeFocus.y, 0), this.normalDashSize, this.normalGapSize);
          this.topLeftFakeArrow.position.set((config.focus.x + config.fakeFocus.x) / 2, (config.focus.y + config.fakeFocus.y) / 2, 0);
          this.topRightFakeArrow.position.set((this.eyepieceImage.position.x + config.fakeFocus.x) / 2,
            (config.focus.y + config.fakeFocus.y) / 2, 0);
        } else {
          /*特殊情况时绘制反向延长线 并将光线变为虚线*/
          (this.fakeTree.material as any).opacity = 0.3;
          const endPointY = 20;
          const extensionCordEndPoint1 = -((config.focus.y - endPointY) / config.leftSlope) + config.focus.x;
          const extensionCordEndPoint2 = ((endPointY - config.focus.y) / config.rightSlope) + this.eyepieceImage.position.x;
          this.extensionCordLine1 = this.helper.createLineHelper(new THREE.Vector3(config.focus.x, config.focus.y, 0),
            new THREE.Vector3(extensionCordEndPoint1, endPointY, 0), this.normalDashSize, this.normalGapSize);
          this.extensionCordLine2 = this.helper.createLineHelper(new THREE.Vector3(this.eyepieceImage.position.x, config.focus.y, 0),
            new THREE.Vector3(extensionCordEndPoint2, endPointY, 0), this.normalDashSize, this.normalGapSize);
          this.lightMapGroup.add(this.extensionCordLine1, this.extensionCordLine2);
          this.topLeftFakeArrow.position.set(-((config.focus.y - 10) / config.leftSlope) + config.focus.x, 10, 0);
          this.topRightFakeArrow.position.set(((10 - config.focus.y) / config.rightSlope) + this.eyepieceImage.position.x,
            10, 0);
          this.topLeftLightLine = ThreeUtil.createDashLine(new THREE.Vector3(config.focus.x, config.focus.y, 0),
            new THREE.Vector3(config.fakeFocus.x, config.fakeFocus.y, 0), '#E32BFF', 1, 1);
          this.topRightLightLine = ThreeUtil.createDashLine(new THREE.Vector3(this.eyepieceImage.position.x, config.focus.y, 0),
            new THREE.Vector3(config.fakeFocus.x, config.fakeFocus.y, 0), '#E32BFF', 1, 1);
        }

        this.lightMapGroup.add(this.bottomLigthLine, this.topLeftLightLine, this.topRightLightLine);

        /*重新设置箭头的位置及旋转方向*/
        this.bottomFakeArrow.position.set((config.focus.x + this.eyepieceImage.position.x) / 2, config.focus.y, 0);
        this.topLeftFakeArrow.rotation.z = Math.atan(config.leftSlope);
        this.topRightFakeArrow.rotation.z = Math.atan(config.rightSlope);
        /*重新设置像的位置及大小*/
        this.fakeTree.scale.set(config.fakeFocus.y / 26.3, config.fakeFocus.y / 26.3, 1);
        this.fakeTree.position.set(config.fakeFocus.x, config.fakeFocus.y / 2, 0);

    }

    /*获取参数*/
    getLightData() {
      const pointX = (-75 + ((255 / 2) / 20));
      const pointY = 453 / 20;
      const topSlope = this.helper.getSlope(-30, pointY, -15, 0);
      const bottomSlope = this.helper.getSlope( pointX, pointY, -30, 0);
      const focus = this.helper.getFocus(bottomSlope, topSlope, 0, 0, -30, -15);
      const leftSlope = this.helper.getSlope(focus.x, focus.y, this.eyepieceImage.position.x, 0);
      const rightSlope = this.helper.getSlope(this.eyepieceImage.position.x, focus.y, this.eyepieceImage.position.x + 10, 0);
      const fakeFocus = this.helper.getFocus(leftSlope, rightSlope, 0, 0,
        this.eyepieceImage.position.x, this.eyepieceImage.position.x + 10);

      return {
        focus: focus,
        leftSlope: leftSlope,
        rightSlope: rightSlope,
        fakeFocus: fakeFocus
      };
    }

    isShowLightMap (value: boolean) {
      this.lightMapGroup.visible = value;
    }

    reset() {
      this.eyepieceImage.position.x = 10;
      this.dragEventHelper();
      this.tips.visible = true;
    }

}




