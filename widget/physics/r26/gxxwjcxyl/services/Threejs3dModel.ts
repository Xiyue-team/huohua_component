import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as background from './../sub_static/background.png';
import * as objectiveLens from './../sub_static/eyepiece.png';
import * as eyepiece from './../sub_static/objectiveLens.png';
import * as pencil from './../sub_static/pencil.png';
import * as bubble from './../sub_static/bubble.png';
import * as text1 from './../sub_static/f1.png';
import * as text2 from './../sub_static/f2.png';
import * as text3 from './../sub_static/blueF.png';
import { Line } from '../../../../../src/three/component/Line';
import { Helper } from './Helper';

const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private lineHelper = new Line();
    private helper = new Helper();

    private eyepiece: THREE.Mesh;
    private objectiveLens: THREE.Mesh;

    private pencil: THREE.Mesh;
    private fakePencil: THREE.Mesh;

    private tips: THREE.Mesh;
    private lightMapGroup = new THREE.Group();
    private eyeLightGroup = new THREE.Group();

    private objLightLine1: any;
    private objLightLine2: any;
    private objLightLine3: any;

    private eyeLightLine1: any;
    private eyeLightLine2: any;
    private eyeLightLine3: any;

    private reverseLine1: any;
    private reverseLine2: any;

    private objreverseLine1: THREE.Line;
    private objreverseLine2: THREE.Line;

    private objreverseGroup = new THREE.Group();

    private objectiveLensArrow: THREE.Group[] = [];
    private eyepieceArrow: THREE.Group[] = [];

    private normalDashSize = (window as any)['env'].browserInfo.os === 'iOS' ? 1 : 0;
    private normalGapSize = (window as any)['env'].browserInfo.os === 'iOS' ? 0.0001 : 1;


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
        this.createObjectiveLens();
        this.createPoint();
        this.createText();
        this.createTips();
        this.createPencil();
        this.createLightMap();
        this.createReverseExtensionline();
        this.createArrow();
        this.bindDrag();
        this.render();
    }

    /*预加载图片*/
    loadImage() {
        const imageArray = [background, eyepiece, objectiveLens, pencil, bubble, text1, text2, text3];
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
           depthTest: true,
      });
      this.scene.add(dashLine);
    }

    /*创建标识点*/
    createPoint () {
        const point = [];
        const eyePoint = [];
        const color = '#e32bff';
        const redColor = '#ff2a2a';
        const blueColor = '#2ACCFF';

        for (let i = 0; i < 2; i++) {
            eyePoint.push(this.helper.createPoint(blueColor));
            this.eyepiece.add(eyePoint[i]);
        }

        eyePoint.push(this.helper.createPoint(redColor));
        this.eyepiece.add(eyePoint[eyePoint.length - 1]);

        for (let i = 0; i < 4; i++) {
          point.push(this.helper.createPoint(color));
          this.objectiveLens.add(point[i]);
        }

        point.push(this.helper.createPoint(redColor));
        this.objectiveLens.add(point[point.length - 1]);

        /*移动点的位置*/
        let j = 0;
        for (let i = 0; i < 2; i++) {
          j += 10;
          point[i].position.set(j, 0, 0);
          point[i + 2].position.set(-j, 0, 0);
        }

        eyePoint[0].position.set(20, 0, 0);
        eyePoint[1].position.set(-20, 0, 0);

    }

    /*创建文字*/
    createText() {
        /*红色F*/
        const texts = window.env.browserInfo.lang;
        const f1 = ThreeUtil.createImg(90 / 20, 102 / 20 , text1, 10, 4 , 0);
        const f2 = ThreeUtil.createImg(123 / 20, 102 / 20 , text2, 20, 4 , 0);
        const f3 = f1.clone();
        const f4 = f2.clone();
        f3.position.set(-10, 4 , 0);
        f4.position.set(-20, 4 , 0);
        this.objectiveLens.add(f1, f2, f3, f4);
        /*蓝色F*/
        const blueF1 = ThreeUtil.createImg(84 / 20, 102 / 20, text3, 20, -4, 0);
        const blueF2 = ThreeUtil.createImg(84 / 20, 102 / 20, text3, -20, -4, 0);
        this.eyepiece.add(blueF1, blueF2);

        /*目镜 物镜 提示文字*/
        const eyepieceText = ThreeUtil.createNormalText(texts.mujing, 0,  28, 0, '#ffffff', 0.05);
        const objectiveLensText = ThreeUtil.createNormalText(texts.wujing, 0, 20, 0, '#ffffff', 0.05);
        this.eyepiece.add(eyepieceText);
        this.objectiveLens.add(objectiveLensText);
    }

    /*创建目镜*/
    createEyepiece() {
        const width = 174;
        const height = 945;
        this.eyepiece = ThreeUtil.createImg(width / 20, height / 20, eyepiece, 19.9, 0, 0);
        this.scene.add(this.eyepiece);
    }

    /*创建物镜*/
    createObjectiveLens() {
        const width = 96;
        const height = 636;
        const redColor = '#ff2a2a';
        this.objectiveLens = ThreeUtil.createImg(width / 20, height / 20, objectiveLens, -25, 0, 0);
        this.objectiveLens.add(this.helper.createPoint(redColor));
        this.scene.add(this.objectiveLens);
    }

    /*创建铅笔*/
    createPencil() {
        const config = this.getLightData();
        const width = 66 / 30;
        const height = 417 / 30;
        const pencilImage = ThreeUtil.createImg(width / 2, height / 2, pencil, -40, 417 / 30 / 4, 0);
        this.pencil = ThreeUtil.createImg((width / height) * config.focus1.y, config.focus1.y,
          pencil, config.focus1.x, config.focus1.y / 2, 0);
        this.fakePencil = ThreeUtil.createImg((width / height) * config.focus2.y, config.focus2.y,
          pencil, config.focus2.x, config.focus2.y / 2, 0);
        (this.fakePencil.material as any).opacity = 0.3;
        this.scene.add(pencilImage, this.pencil, this.fakePencil);
    }

    /*创建提示*/
    createTips() {
      const width = 426;
      const height = 147;
      const word = (window as any).env.browserInfo.lang.tips;
      this.tips = ThreeUtil.createImg(width / 20, height / 20, bubble, -18, 25, 0);
      const text = ThreeUtil.createNormalText(word, 0, height / 80, 0, '#FF8E2A', 0.06);
      this.tips.add(text);
      this.scene.add(this.tips);
    }


    /*创建光路*/
    createLightMap() {
        const config = this.getLightData();
        this.objLightLine1 = this.helper.createLineHelper(new THREE.Vector3(config.pencilX, config.pencilY, 0),
          new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0), this.normalDashSize, this.normalGapSize);
        this.objLightLine2 = this.helper.createLineHelper(new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0),
          new THREE.Vector3(config.focus1.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);
        this.objLightLine3 = this.helper.createLineHelper(new THREE.Vector3(config.pencilX, config.pencilY, 0),
          new THREE.Vector3(config.focus1.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);

        this.eyeLightLine1 = this.helper.createLineHelper(new THREE.Vector3(config.focus1.x, config.focus1.y, 0),
          new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);
        this.eyeLightLine2 = ThreeUtil.createDashLine(new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0),
          new THREE.Vector3(config.focus2.x, config.focus2.y, 0), config.color, 1, 0.5);
        this.eyeLightLine3 = ThreeUtil.createDashLine(new THREE.Vector3(config.focus1.x, config.focus1.y, 0),
          new THREE.Vector3(config.focus2.x, config.focus2.y, 0), config.color, 1, 0.5);

        this.lightMapGroup.add(this.objLightLine1, this.objLightLine2, this.objLightLine3);
        this.eyeLightGroup.add(this.eyeLightLine1, this.eyeLightLine2, this.eyeLightLine3);
        this.lightMapGroup.add(this.eyeLightGroup);
        this.lightMapGroup.visible = false;
        this.scene.add(this.lightMapGroup);
    }

    /*给目镜物镜绑定drag事件*/
    bindDrag() {
      const dargControl1 = new dragcontrols([this.objectiveLens], this.camera, this.renderer.domElement);
      dargControl1.addEventListener( 'dragstart',  ( event: any ) => { this.controls.enabled = false; this.tips.visible = false; } );
      dargControl1.addEventListener( 'drag', ( event: any) => {
        this.objectiveLensPositionControl();
        const config = this.getLightData();
        let scale = 1;
        let scale2 = 1;
        if (config.focus1 !== undefined && config.focus2 !== undefined) {
          scale =  config.focus1.y / (this.pencil.geometry as any).parameters.height;
          scale2 = config.focus2.y / (this.fakePencil.geometry as any).parameters.height;
        }
        this.objectiveLens.position.y = 0;
        this.dragEventHelper(config, scale, scale2);
        this.resetArrowPosition(config);
      });
      dargControl1.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; } );
    }

    /*根据斜率绘制反向延长线*/
    createReverseExtensionline() {
      const config = this.getLightData();
      const height = 30;
      //斜率
      const slope = this.helper.getSlope(config.focus1.x, config.focus1.y, this.eyepiece.position.x, this.eyepiece.position.y);
      const slope1 = this.helper.getSlope(this.eyepiece.position.x, config.focus1.y, this.eyepiece.position.x + 20, 0);

      this.reverseLine1 = this.helper.createLineHelper(new THREE.Vector3(config.focus1.x, config.focus1.y, 0),
        new THREE.Vector3( ((20 - config.focus1.y) / slope)
          + config.focus1.x, 20, 0), this.normalDashSize, this.normalGapSize);
      this.reverseLine2 = this.helper.createLineHelper(new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0),
        new THREE.Vector3( ((20 - 0) / slope1) + this.eyepiece.position.x + 20, 20, 0), this.normalDashSize, this.normalGapSize);
      this.eyeLightGroup.add(this.reverseLine1, this.reverseLine2);

      this.objreverseLine1 = ThreeUtil.createDashLine(new THREE.Vector3(config.pencilX, config.pencilY, 0), new THREE.Vector3(
        ((height - config.pencilY) / config.objBottomSlope) + config.pencilX, height, 0), config.color, 1, 0.5);
      this.objreverseLine2 = ThreeUtil.createDashLine(new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0),
        new THREE.Vector3(((height - config.pencilY) / config.objTopSlope) + this.objectiveLens.position.x, height, 0),
        config.color, 1, 0.5);

      this.objreverseGroup.add(this.objreverseLine1, this.objreverseLine2);
      this.objreverseGroup.visible = false;
      this.lightMapGroup.add(this.objreverseGroup);

    }

    /*创建箭头*/
    createArrow() {
      const config = this.getLightData();
      for (let i = 0; i < 3; i++) {
        this.objectiveLensArrow.push(this.helper.createArrow());
        this.eyepieceArrow.push(this.helper.createArrow());
        this.lightMapGroup.add(this.objectiveLensArrow[i]);
        this.eyeLightGroup.add(this.eyepieceArrow[i]);
      }

      /*重新设置位置 重新旋转角度*/
      this.resetArrowPosition(config);
    }

    /*重新设置箭头位置和旋转角度的方法*/
    resetArrowPosition(config: any) {
      const slope = this.helper.getSlope(config.focus1.x, config.focus1.y, this.eyepiece.position.x, this.eyepiece.position.y);
      const slope1 = this.helper.getSlope(this.eyepiece.position.x, config.focus1.y, this.eyepiece.position.x + 20, 0);
      this.objectiveLensArrow[0].position.set((config.pencilX + config.focus1.x) / 2, (config.pencilY + config.focus1.y) / 2, 0);
      this.objectiveLensArrow[0].rotation.z = Math.atan(config.objBottomSlope);
      this.objectiveLensArrow[1].position.set((config.pencilX + this.objectiveLens.position.x) / 2 ,
        config.pencilY, 0);
      this.objectiveLensArrow[2].position.set((this.objectiveLens.position.x + config.focus1.x) / 2,
        (config.pencilY + config.focus1.y) / 2, 0);
      this.objectiveLensArrow[2].rotation.z = Math.atan(config.objTopSlope);

      this.eyepieceArrow[0]. position.set((config.focus1.x + this.eyepiece.position.x) / 2, config.focus1.y, 0);

      this.eyepieceArrow[1].position.set((config.focus1.x + (((20 - config.focus1.y) / slope) + config.focus1.x)) / 2,
        (config.focus1.y + 20) / 2, 0);
      this.eyepieceArrow[2].position.set((this.eyepiece.position.x + ((20 - 0) / slope1) + this.eyepiece.position.x + 20) / 2
        , (config.focus1.y + 20) / 2, 0);

      this.eyepieceArrow[1].rotation.z = Math.atan(slope);
      this.eyepieceArrow[2].rotation.z = Math.atan(slope1);
    }

    /*创建拖动事件时所执行的方法*/
    dragEventHelper(config: any, scale: number, scale2: number) {
      /*重新绘制光路*/
        this.helper.removeLine(this.lightMapGroup, this.objLightLine1);
        this.helper.removeLine(this.lightMapGroup, this.objLightLine2);
        this.helper.removeLine(this.lightMapGroup, this.objLightLine3);
        this.helper.removeLine(this.eyeLightGroup, this.reverseLine1);
        this.helper.removeLine(this.eyeLightGroup, this.reverseLine2);
        this.helper.removeLine(this.eyeLightGroup, this.eyeLightLine1);
        this.helper.removeLine(this.eyeLightGroup, this.eyeLightLine2);
        this.helper.removeLine(this.eyeLightGroup, this.eyeLightLine3);
        this.helper.removeLine(this.objreverseGroup, this.objreverseLine1);
        this.helper.removeLine(this.objreverseGroup, this.objreverseLine2);
        /*当物镜焦点斜率存在时 重新绘制物镜光路*/
        if (config.focus1 !== undefined) {
          this.pencil.scale.set(scale, scale, 1);
          this.pencil.position.set(config.focus1.x, config.focus1.y / 2, 0);
          this.objLightLine1 = this.helper.createLineHelper(new THREE.Vector3(config.pencilX, config.pencilY, 0),
            new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0), this.normalDashSize, this.normalGapSize);
          this.objLightLine2 = this.helper.createLineHelper(new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0),
            new THREE.Vector3(config.focus1.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);
          this.objLightLine3 = this.helper.createLineHelper(new THREE.Vector3(config.pencilX, config.pencilY, 0),
            new THREE.Vector3(config.focus1.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);

          const slope = this.helper.getSlope(config.focus1.x, config.focus1.y, this.eyepiece.position.x, this.eyepiece.position.y);
          const slope1 = this.helper.getSlope(this.eyepiece.position.x, config.focus1.y, this.eyepiece.position.x + 20, 0);
          this.reverseLine1 = this.helper.createLineHelper(new THREE.Vector3(config.focus1.x, config.focus1.y, 0),
            new THREE.Vector3( ((20 - config.focus1.y) / slope)
              + config.focus1.x, 20, 0), this.normalDashSize, this.normalGapSize);
          this.reverseLine2 = this.helper.createLineHelper(new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0),
            new THREE.Vector3( (20 / slope1) + this.eyepiece.position.x + 20, 20, 0), this.normalDashSize, this.normalGapSize);

        }

        /*当目镜焦点斜率存在时 重新绘制目镜光路*/
        if (config.focus2 !== undefined) {
          this.fakePencil.scale.set(scale2, scale2, 1);
          this.fakePencil.position.set(config.focus2.x, config.focus2.y / 2, 0);
          this.eyeLightLine1 = this.helper.createLineHelper(new THREE.Vector3(config.focus1.x, config.focus1.y, 0),
            new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0), this.normalDashSize, this.normalGapSize);
          this.eyeLightLine2 = ThreeUtil.createDashLine(new THREE.Vector3(this.eyepiece.position.x, config.focus1.y, 0),
            new THREE.Vector3(config.focus2.x, config.focus2.y, 0), config.color, 1 , 0.5);
          this.eyeLightLine3 = ThreeUtil.createDashLine(new THREE.Vector3(config.focus2.x, config.focus2.y, 0),
            new THREE.Vector3(config.focus1.x, config.focus1.y, 0), config.color, 1 , 0.5);
        }

        /*重绘反向延长虚线*/
        const height = 30;
        this.objreverseLine1 = ThreeUtil.createDashLine(new THREE.Vector3(config.pencilX, config.pencilY, 0), new THREE.Vector3(
          ((height - config.pencilY) / config.objBottomSlope) + config.pencilX, height, 0), config.color, 1, 0.5);
        this.objreverseLine2 = ThreeUtil.createDashLine(new THREE.Vector3(this.objectiveLens.position.x, config.pencilY, 0),
          new THREE.Vector3(((height - config.pencilY) / config.objTopSlope) + this.objectiveLens.position.x, height, 0),
          config.color, 1, 0.5);
        this.lightMapGroup.add(this.objLightLine1, this.objLightLine2, this.objLightLine3);
        this.eyeLightGroup.add(this.eyeLightLine1, this.eyeLightLine2, this.eyeLightLine3, this.reverseLine1, this.reverseLine2);
        this.objreverseGroup.add(this.objreverseLine1, this.objreverseLine2);

    }

    /*获取参数*/
    getLightData() {
      const pencilX = -40;
      const pencilY = 417 / 30 / 2;
      const objBottomSlope = this.helper.getSlope(pencilX, pencilY, this.objectiveLens.position.x, 0);
      const objTopSlope = this.helper.getSlope(this.objectiveLens.position.x, pencilY, this.objectiveLens.position.x + 10, 0);
      const focus1 = this.helper.getFocus(objTopSlope, objBottomSlope, 0, 0,
        this.objectiveLens.position.x + 10, this.objectiveLens.position.x);

      const eyeTopSlope = this.helper.getSlope(this.eyepiece.position.x, 0, focus1.x, focus1.y);
      const eyeBottomSlope = this.helper.getSlope(this.eyepiece.position.x, focus1.y, this.eyepiece.position.x + 20, 0);
      const focus2 = this.helper.getFocus(eyeTopSlope, eyeBottomSlope, 0, 0, this.eyepiece.position.x, this.eyepiece.position.x + 20);

      return {pencilX: pencilX, pencilY: pencilY, objBottomSlope: objBottomSlope, objTopSlope: objTopSlope, focus1: focus1,
        eyeTopSlope: eyeTopSlope, eyeBottomSlope: eyeBottomSlope, focus2: focus2, color: '#E32BFF'};
    }

    /*限定物镜位置*/
    objectiveLensPositionControl() {
        if (this.objectiveLens.position.x <= -29.99) {
            this.objectiveLens.position.x = -29.99;
            this.objreverseGroup.visible = true;
            this.eyeLightGroup.visible = false;
            this.fakePencil.visible = false;
            return;
        } else if (this.objectiveLens.position.x >= -20) {
            this.objectiveLens.position.x = -20;
            this.objreverseGroup.visible = false;
            this.eyeLightGroup.visible = true;
            return;
        }

        this.objreverseGroup.visible = false;
        const pencilX = -40;
        const pencilY = 417 / 30 / 2;
        const objBottomSlope = this.helper.getSlope(pencilX, pencilY, this.objectiveLens.position.x, 0);
        const objTopSlope = this.helper.getSlope(this.objectiveLens.position.x, pencilY, this.objectiveLens.position.x + 10, 0);
        const focus1 = this.helper.getFocus(objTopSlope, objBottomSlope, 0, 0,
          this.objectiveLens.position.x + 10, this.objectiveLens.position.x);
        const scale =  focus1.y / - 13.9;
        const slope1 = this.helper.getSlope(this.eyepiece.position.x - 4.35 - (1.1 * scale), focus1.y, pencilX, pencilY);
        //根据目镜当前坐标求出物镜可移动的X坐标的范围
        const xRange1 = ((0 - pencilY) / slope1) + pencilX;
        if (this.objectiveLens.position.x >= xRange1) {
          this.eyeLightGroup.visible = false;
          this.fakePencil.visible = false;
        } else {
          this.eyeLightGroup.visible = true;
          this.fakePencil.visible = true;
        }

    }

    /*显示光路按钮触发的方法*/
    isShowLightMap (value: boolean) {
      this.lightMapGroup.visible = value;
    }

    /*重置*/
    reset() {
      this.tips.visible = true;
      this.objectiveLens.position.x = -25;
      const config = this.getLightData();
      let scale = 1;
      let scale2 = 1;
      if (config.focus1 !== undefined && config.focus2 !== undefined) {
        scale =  config.focus1.y / (this.pencil.geometry as any).parameters.height;
        scale2 = config.focus2.y / (this.fakePencil.geometry as any).parameters.height;
      }
      this.objectiveLens.position.y = 0;
      this.dragEventHelper(config, scale, scale2);
      this.resetArrowPosition(config);
      this.eyeLightGroup.visible = true;
      this.fakePencil.visible = true;
      this.objreverseGroup.visible = false;
    }

}
