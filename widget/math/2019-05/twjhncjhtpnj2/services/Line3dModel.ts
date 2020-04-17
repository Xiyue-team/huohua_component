import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as img1 from '../sub_static/UI/L1.png';
import * as img2 from '../sub_static/UI/L2.png';
import * as img3 from '../sub_static/UI/L3.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    private msg: any = "";
    private ow: any;
    private pointPos: any = [[13, 40, 0], [-3, 42, 0], [-4, 25, 0], [11, 24, 0], [6, -11, 0], [-11, -11, 0], [-10.5, -27.5, 0],
        [6.5, -26.5, 0]];
    private color1: any = '#444';
    private color2: any = '#444';
    private color3: any = '#444';
    private color4: any = '#444';
    private color5: any = '#444';
    private color6: any = '#444';
    private color7: any = '#444';
    private color8: any = '#444';
    private sliderControlLine: SliderControlLine;
    // 添加初始界面三条线
    private line_x = common.drawUnitLine({width : 0.6, color: '#838383', isDash: false, });
    private line_y = common.drawUnitLine({width : 0.6, color: '#838383', isDash: false, });
    private line_xy = common.drawUnitLine({width : 0.6, color: '#838383', isDash: false, });
    private lineX  = common.scaleLine([-50, 35, 0], [60, 30, 0], this.line_x);
    private lineY  = common.scaleLine([-50, -30, 0], [60, -5, 0], this.line_y);
    private lineXb = common.scaleLine([-10, -80, 0], [10, 80, 0], this.line_xy);
    private text1 = common.createImg([68, 30, 0], 10,  10, img1);
    private text2 = common.createImg([68, -3, 0], 10 , 10, img2);
    private text3 = common.createImg([12, 88, 0], 10 , 10, img3);
    //画直线相交的两个圆线
    private yuan1 = common.createStrokeCircle(5,  {color: '#494949', width: 0.7}, 4.06, 32.54, 0);
    private yuan2 = common.createStrokeCircle(5,  {color: '#494949', width: 0.7}, -2.39, -19.18, 0);
    //八个小圆面
    private yuan_1: any;
    private yuan_2: any;
    private yuan_3: any;
    private yuan_4: any;
    private yuan_5: any;
    private yuan_6: any;
    private yuan_7: any;
    private yuan_8: any;
    private pointArr: any = [];
    //八个数字
    private num1 = common.createText('1', [13, 42.5, 0], {color: '#FFF', isItalic: false});
    private num2 = common.createText('2', [-3, 44.5, 0], {color: '#FFF', isItalic: false});
    private num3 = common.createText('3', [-4, 27.5, 0], {color: '#FFF', isItalic: false});
    private num4 = common.createText('4', [11, 26.5, 0], {color: '#FFF', isItalic: false});
    private num5 = common.createText('5', [6, -8.5, 0], {color: '#FFF', isItalic: false});
    private num6 = common.createText('6', [-11, -8.5, 0], {color: '#FFF', isItalic: false});
    private num7 = common.createText('7', [-10.5, -25, 0], {color: '#FFF', isItalic: false});
    private num8 = common.createText('8', [6.5, -24, 0], {color: '#FFF', isItalic: false});
    //画8个扇形
    private shanGroup = new THREE.Group();
    private shan1 = common.drawAngle(357, 86, {color: '#FFD621', size: 5, zIndex: 0}, 4.06, 32.54, 0);
    private shan2 = common.drawAngle(83, 94, {color: '#FFD621', size: 5, zIndex: 0}, 4.06, 32.54, 0);
    private shan3 = common.drawAngle(177, 86, {color: '#FFD621', size: 5, zIndex: 0}, 4.06, 32.54, 0);
    private shan4 = common.drawAngle(263, 94, {color: '#FFD621', size: 5, zIndex: 0}, 4.06, 32.54, 0);
    private shan5 = common.drawAngle(13, 70, {color: '#FFD621', size: 5, zIndex: 0}, -2.39, -19.18, 0);
    private shan6 = common.drawAngle(83, 110, {color: '#FFD621', size: 5, zIndex: 0}, -2.39, -19.18, 0);
    private shan7 = common.drawAngle(193, 70, {color: '#FFD621', size: 5, zIndex: 0}, -2.39, -19.18, 0);
    private shan8 = common.drawAngle(263, 110, {color: '#FFD621', size: 5, zIndex: 0}, -2.39, -19.18, 0);
    //画有颜色的线条
    private redLine1_1 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine1_2 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine1_3 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine1_4 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private line1_1 = common.scaleLine([-50, 35, 0], [4.06, 32.54, 0], this.redLine1_1);
    private line1_2 = common.scaleLine([-25, 33.86, 0], [4.06, 32.54, 0], this.redLine1_2);
    private line1_3 = common.scaleLine([4.06, 32.54, 0], [40, 30.9090, 0], this.redLine1_3);
    private line1_4 = common.scaleLine([4.06, 32.54, 0], [60, 30, 0], this.redLine1_4);
    private redLine2_1 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine2_2 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine2_3 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private line2_1 = common.scaleLine([-50, -30, 0], [-2.39, -19.18, 0], this.redLine2_1);
    private line2_2 = common.scaleLine([-2.39, -19.18, 0], [40, -9.54, 0], this.redLine2_2);
    private line2_3 = common.scaleLine([-2.39, -19.18, 0], [60, -5, 0], this.redLine2_3);
    private redLine3_1 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine3_2 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private redLine3_3 = common.drawUnitLine({width : 0.6, color: '#FF5A5A', isDash: false, });
    private line3_1 = common.scaleLine([10, 80, 0], [4.06, 32.54, 0], this.redLine3_1);
    private line3_2 = common.scaleLine([4.06, 32.54, 0], [-2.39, -19.18, 0], this.redLine3_2);
    private line3_3 = common.scaleLine([-2.39, -19.18, 0], [-6.25, -50, 0], this.redLine3_3);
    private Ax: any;
    angle: number;
    private angleA: any;
    private angleB: any;
    private count = 0;
    private controls: any;
    browserInfo: BrowserInfo;
    private render = () => {
        requestAnimationFrame(this.render);
        if (this.count !== 0) {
            this.count = ++this.count % 3;
            return;
        } else {
            this.count = ++this.count % 3;
        }
        this.renderer.render(this.scene, this.camera);
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }
    init(): void {
        thiz = this;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.ow = (window as any).viewHandler.viewModel.$data;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.tbctrl();
        this.initElement(this.controls);
        this.createAxis();
        this.initial();
        this.stopDrag();
        this.initEvt();
        this.drawAngle();
        console.warn = function () {
        };
    }
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
    //初始化摄像机位置
    resetCamera(): void {
        this.controls.reset();
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
        (this.renderer as WebGLRenderer).sortObjects = false;
    }
    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }
    // 初始化场景内元素
    initElement(controls: any) {
        this.yuan_1 = common.drawCircle(4, {color: this.color1, start: 0, end: Math.PI * 2, position: this.pointPos[0] });
        this.yuan_1.name = 'name1';
        this.yuan_2 = common.drawCircle(4, {color: this.color2, start: 0, end: Math.PI * 2, position: this.pointPos[1] });
        this.yuan_2.name = 'name2';
        this.yuan_3 = common.drawCircle(4, {color: this.color3, start: 0, end: Math.PI * 2, position: this.pointPos[2] });
        this.yuan_3.name = 'name3';
        this.yuan_4 = common.drawCircle(4, {color: this.color4, start: 0, end: Math.PI * 2, position: this.pointPos[3] });
        this.yuan_4.name = 'name4';
        this.yuan_5 = common.drawCircle(4, {color: this.color5, start: 0, end: Math.PI * 2, position: this.pointPos[4] });
        this.yuan_5.name = 'name5';
        this.yuan_6 = common.drawCircle(4, {color: this.color6, start: 0, end: Math.PI * 2, position: this.pointPos[5] });
        this.yuan_6.name = 'name6';
        this.yuan_7 = common.drawCircle(4, {color: this.color7, start: 0, end: Math.PI * 2, position: this.pointPos[6] });
        this.yuan_7.name = 'name7';
        this.yuan_8 = common.drawCircle(4, {color: this.color8, start: 0, end: Math.PI * 2, position: this.pointPos[7] });
        this.yuan_8.name = 'name8';
        this.pointArr.push(this.yuan_1, this.yuan_2, this.yuan_3, this.yuan_4, this.yuan_5, this.yuan_6, this.yuan_7, this.yuan_8);
        this.scene.add( this.yuan1, this.yuan2, this.lineX ,  this.lineY,  this.lineXb, this.text1, this.text2, this.text3);
        this.scene.add( this.yuan_1, this.yuan_2, this.yuan_3, this.yuan_4, this.yuan_5, this.yuan_6, this.yuan_7, this.yuan_8);
        this.scene.add( this.num1, this.num2, this.num3, this.num4, this.num5, this.num6, this.num7, this.num8);
        this.shanGroup.add(this.shan1, this.shan2, this.shan3, this.shan4, this.shan5, this.shan6, this.shan7, this.shan8);
        this.scene.add(this.shanGroup);
        // 带颜色的线条添加到场景中去
        this.scene.add(this.line1_1, this.line1_2, this.line1_3, this.line1_4, this.line2_1, this.line2_2, this.line2_3, this.line3_1,
          this.line3_2, this.line3_3);
        console.log(this.yuan1);
    }
    //创建一个坐标系
    createAxis() {
        this.Ax = AxisUtil.createAxis({ isTicks: false, AxisXNumArray: ['1', "", "", "", '5', "", "", "", "", '10'] } as any);
        this.Ax.position.z = -0.05;
        this.Ax.position.y = 0;
    }
    // 初始化点击的圆
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
          [this.yuan_1, this.yuan_2, this.yuan_3, this.yuan_4, this.yuan_5, this.yuan_6, this.yuan_7,
              this.yuan_8]).initEvent(this.camera, this.renderer);
    }
    // 初始化的时候让元素的状态隐藏
    initial() {
        this.shan1.visible = false;
        this.shan2.visible = false;
        this.shan3.visible = false;
        this.shan4.visible = false;
        this.shan5.visible = false;
        this.shan6.visible = false;
        this.shan7.visible = false;
        this.shan8.visible = false;
        this.line1_1.visible = false;
        this.line1_2.visible = false;
        this.line1_3.visible = false;
        this.line1_4.visible = false;
        this.line2_1.visible = false;
        this.line2_2.visible = false;
        this.line2_3.visible = false;
        this.line3_1.visible = false;
        this.line3_2.visible = false;
        this.line3_3.visible = false;
        (this.yuan_1.material as any).color = new THREE.Color('#444');
        (this.num1.material as any).color = new THREE.Color('#fff');
        (this.yuan_2.material as any).color = new THREE.Color('#444');
        (this.num2.material as any).color = new THREE.Color('#fff');
        (this.yuan_3.material as any).color = new THREE.Color('#444');
        (this.num3.material as any).color = new THREE.Color('#fff');
        (this.yuan_4.material as any).color = new THREE.Color('#444');
        (this.num4.material as any).color = new THREE.Color('#fff');
        (this.yuan_5.material as any).color = new THREE.Color('#444');
        (this.num5.material as any).color = new THREE.Color('#fff');
        (this.yuan_6.material as any).color = new THREE.Color('#444');
        (this.num6.material as any).color = new THREE.Color('#fff');
        (this.yuan_7.material as any).color = new THREE.Color('#444');
        (this.num7.material as any).color = new THREE.Color('#fff');
        (this.yuan_8.material as any).color = new THREE.Color('#444');
        (this.num8.material as any).color = new THREE.Color('#fff');
    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {
        thiz.stopDrag();
        if ( name === 'name1' &&  (!thiz.ow.active2  && !thiz.ow.active3 )) {
            thiz.initial();
             thiz.msg = 1;
            (thiz.yuan_1.material as any).color = new THREE.Color('#FFD621');
            (thiz.num1.material as any).color = new THREE.Color('#000');
            thiz.shan1.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                (thiz.num5.material as any).color = new THREE.Color('#000');
                thiz.shan5.visible = true;
                thiz.line1_3.visible = true;
                thiz.line3_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_2.visible = true;
            }
        }
        if ( name === 'name2' &&  (!thiz.ow.active2  && !thiz.ow.active3 )) {
            thiz.initial();
            thiz.msg = 2;
            (thiz.yuan_2.material as any).color = new THREE.Color('#FFD621');
            (thiz.num2.material as any).color = new THREE.Color('#000');
            thiz.shan2.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                (thiz.num6.material as any).color = new THREE.Color('#000');
                thiz.shan6.visible = true;
                thiz.line1_2.visible = true;
                thiz.line3_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
        }
        if ( name === 'name3') {
            thiz.initial();
            thiz.msg = 3;
            (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
            (thiz.num3.material as any).color = new THREE.Color('#000');
            thiz.shan3.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_7.material as any).color = new THREE.Color('#FFD621');
                (thiz.num7.material as any).color = new THREE.Color('#000');
                thiz.shan7.visible = true;
                thiz.line1_2.visible = true;
                thiz.line3_3.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
            if (thiz.ow.active2) {
                (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                (thiz.num5.material as any).color = new THREE.Color('#000');
                thiz.shan5.visible = true;
                thiz.line1_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_3.visible = true;
            }
            if (thiz.ow.active3) {
                (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                (thiz.num6.material as any).color = new THREE.Color('#000');
                thiz.shan6.visible = true;
                thiz.line1_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
        }
        if ( name === 'name4') {
            thiz.initial();
            thiz.msg = 4;
            (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
            (thiz.num4.material as any).color = new THREE.Color('#000');
            thiz.shan4.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_8.material as any).color = new THREE.Color('#FFD621');
                (thiz.num8.material as any).color = new THREE.Color('#000');
                thiz.shan8.visible = true;
                thiz.line1_3.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_2.visible = true;
                thiz.line3_3.visible = true;
            }
            if (thiz.ow.active2) {
                (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                (thiz.num6.material as any).color = new THREE.Color('#000');
                thiz.shan6.visible = true;
                thiz.line1_4.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
            if (thiz.ow.active3) {
                (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                (thiz.num5.material as any).color = new THREE.Color('#000');
                thiz.shan5.visible = true;
                thiz.line1_4.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_3.visible = true;
            }
        }
        if ( name === 'name5') {
            thiz.initial();
            thiz.msg = 5;
            (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
            (thiz.num5.material as any).color = new THREE.Color('#000');
            thiz.shan5.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_1.material as any).color = new THREE.Color('#FFD621');
                (thiz.num1.material as any).color = new THREE.Color('#000');
                thiz.shan1.visible = true;
                thiz.line1_3.visible = true;
                thiz.line3_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_2.visible = true;
            }
            if (thiz.ow.active2) {
                (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                (thiz.num3.material as any).color = new THREE.Color('#000');
                thiz.shan3.visible = true;
                thiz.line1_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_3.visible = true;
            }
            if (thiz.ow.active3) {
                (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                (thiz.num4.material as any).color = new THREE.Color('#000');
                thiz.shan4.visible = true;
                thiz.line1_4.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_3.visible = true;
            }
        }
        if ( name === 'name6') {
            thiz.initial();
            thiz.msg = 6;
            (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
            (thiz.num6.material as any).color = new THREE.Color('#000');
            thiz.shan6.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_2.material as any).color = new THREE.Color('#FFD621');
                (thiz.num2.material as any).color = new THREE.Color('#000');
                thiz.shan2.visible = true;
                thiz.line1_2.visible = true;
                thiz.line3_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
            if (thiz.ow.active2) {
                (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                (thiz.num4.material as any).color = new THREE.Color('#000');
                thiz.shan4.visible = true;
                thiz.line1_4.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
            if (thiz.ow.active3) {
                (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                (thiz.num3.material as any).color = new THREE.Color('#000');
                thiz.shan3.visible = true;
                thiz.line1_1.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
        }
        if ( name === 'name7' &&  (!thiz.ow.active2  && !thiz.ow.active3 )) {
            thiz.initial();
            thiz.msg = 7;
            (thiz.yuan_7.material as any).color = new THREE.Color('#FFD621');
            (thiz.num7.material as any).color = new THREE.Color('#000');
            thiz.shan7.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                (thiz.num3.material as any).color = new THREE.Color('#000');
                thiz.shan3.visible = true;
                thiz.line1_2.visible = true;
                thiz.line3_3.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_1.visible = true;
            }
        }
        if ( name === 'name8' &&  (!thiz.ow.active2  && !thiz.ow.active3 )) {
            thiz.initial();
            thiz.msg = 8;
            (thiz.yuan_8.material as any).color = new THREE.Color('#FFD621');
            (thiz.num8.material as any).color = new THREE.Color('#000');
            thiz.shan8.visible = true;
            if (thiz.ow.active1) {
                (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                (thiz.num4.material as any).color = new THREE.Color('#000');
                thiz.shan4.visible = true;
                thiz.line1_3.visible = true;
                thiz.line3_2.visible = true;
                thiz.line2_2.visible = true;
                thiz.line3_3.visible = true;
            }
        }
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        thiz.stopDrag();
    }
    //鼠标按下
    // tslint:disable-next-line:member-ordering
    static MouseUp(pos: any, name: any) {
    }
    //画线且进行缩放函数
    drawLine (pos: any, num: number) {
        if (num === 1) {
        }
        if (num === 2) {
        }
    }
    // 画角度标识函数
    drawAngle() {
    }
    // 点击按钮事件函数
    clickButton (num: any) {
            if (num === 0 && ( !this.ow.active2 && !this.ow.active3 )) {
                    if (this.msg === 1) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                        (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                        (thiz.num5.material as any).color = new THREE.Color('#000');
                         thiz.shan5.visible = true;
                         thiz.line1_3.visible = true;
                         thiz.line3_1.visible = true;
                         thiz.line3_2.visible = true;
                         thiz.line2_2.visible = true;
                         } else {
                            this.initial();
                            this.msg = "";
                         }
                    }
                    if (this.msg === 2) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num6.material as any).color = new THREE.Color('#000');
                            thiz.shan6.visible = true;
                            thiz.line1_2.visible = true;
                            thiz.line3_1.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_1.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 3) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_7.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num7.material as any).color = new THREE.Color('#000');
                            thiz.shan7.visible = true;
                            thiz.line1_2.visible = true;
                            thiz.line3_3.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_1.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 4) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_8.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num8.material as any).color = new THREE.Color('#000');
                            thiz.shan8.visible = true;
                            thiz.line1_3.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_2.visible = true;
                            thiz.line3_3.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 5) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_1.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num1.material as any).color = new THREE.Color('#000');
                            thiz.shan1.visible = true;
                            thiz.line1_3.visible = true;
                            thiz.line3_1.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_2.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 6) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_2.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num2.material as any).color = new THREE.Color('#000');
                            thiz.shan2.visible = true;
                            thiz.line1_2.visible = true;
                            thiz.line3_1.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_1.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 7) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num3.material as any).color = new THREE.Color('#000');
                            thiz.shan3.visible = true;
                            thiz.line1_2.visible = true;
                            thiz.line3_3.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_1.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 8) {
                        this.ow.active1 = !this.ow.active1;
                        if (this.ow.active1) {
                            (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num4.material as any).color = new THREE.Color('#000');
                            thiz.shan4.visible   = true;
                            thiz.line1_3.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_2.visible = true;
                            thiz.line3_3.visible = true;
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
            }
            if (num === 1 && ( !this.ow.active1 && !this.ow.active3 )) {
                    if (this.msg === 3 || this.msg === 5) {
                        this.ow.active2 = !this.ow.active2;
                        if (this.ow.active2) {
                            thiz.line1_1.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_3.visible = true;
                            if ( this.msg === 3) {
                            (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num5.material as any).color = new THREE.Color('#000');
                            thiz.shan5.visible   = true;
                            }
                            if ( this.msg === 5) {
                                (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                                (thiz.num3.material as any).color = new THREE.Color('#000');
                                thiz.shan3.visible   = true;
                            }
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
                    if (this.msg === 4 || this.msg === 6 ) {
                        this.ow.active2 = !this.ow.active2;
                        if (this.ow.active2) {
                            thiz.line1_4.visible = true;
                            thiz.line3_2.visible = true;
                            thiz.line2_1.visible = true;
                            if (this.msg === 4 ) {
                            (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num6.material as any).color = new THREE.Color('#000');
                            thiz.shan6.visible   = true;
                            }
                            if (this.msg === 6 ) {
                                (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                                (thiz.num4.material as any).color = new THREE.Color('#000');
                                thiz.shan4.visible   = true;
                            }
                        } else {
                            this.initial();
                            this.msg = "";
                        }
                    }
            }
            if (num === 2 && ( !this.ow.active1 && !this.ow.active2 )) {
                if (this.msg === 3 || this.msg === 6) {
                    this.ow.active3 = !this.ow.active3;
                    if (this.ow.active3) {
                        thiz.line1_1.visible = true;
                        thiz.line3_2.visible = true;
                        thiz.line2_1.visible = true;
                        if ( this.msg === 3) {
                            (thiz.yuan_6.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num6.material as any).color = new THREE.Color('#000');
                            thiz.shan6.visible   = true;
                        }
                        if ( this.msg === 6) {
                            (thiz.yuan_3.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num3.material as any).color = new THREE.Color('#000');
                            thiz.shan3.visible   = true;
                        }
                    } else {
                        this.initial();
                        this.msg = "";
                    }
                }
                if (this.msg === 4 || this.msg === 5 ) {
                    this.ow.active3 = !this.ow.active3;
                    if (this.ow.active3) {
                        thiz.line1_4.visible = true;
                        thiz.line3_2.visible = true;
                        thiz.line2_3.visible = true;
                        if (this.msg === 4 ) {
                            (thiz.yuan_5.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num5.material as any).color = new THREE.Color('#000');
                            thiz.shan5.visible   = true;
                        }
                        if (this.msg === 5 ) {
                            (thiz.yuan_4.material as any).color = new THREE.Color('#FFD621');
                            (thiz.num4.material as any).color = new THREE.Color('#000');
                            thiz.shan4.visible   = true;
                        }
                    } else {
                        this.initial();
                        this.msg = "";
                    }
                }
            }
    }
    //禁止拖动
    stopDrag() {
        for (let i = 0; i < 8;  i++ ) {
            this.pointArr[i].position.set(this.pointPos[i][0], this.pointPos[i][1], this.pointPos[i][2]);
        }
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    //重置事件
    reset(): void {
        this.initial();
    }
}




