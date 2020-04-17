import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {
    ThreeBase
} from '../../../../../src/three/template/ThreeBase';
import {
    PerspectiveCamera
} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import {
    BrowserInfo
} from '../../../../../src/model/BrowserInfo';
import {
    BrowserUtil
} from '../../../../../src/util/BrowserUtil';
import {
    SliderControlLine
} from './SliderControlLine';

import {
    AxisUtil
} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/point.png';
import * as penImg from '../sub_static/pen.png';
import * as f1 from '../sub_static/F1.png';
import * as f2 from '../sub_static/F2.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private ctrlPoint = common.createImg([-40, 0, 2], 20, 20, pointImg);
    private ctrlPoint1 = common.createImg([40, 0, 2], 20, 20, pointImg);
    private penPoint = common.createImg([0, 30, 2], 20, 20, penImg);
    private circle: any;
    private point = common.drawCircle(1);
    private pointArr: any = [];
    private circleGroup = new THREE.Group();
    private pointGroup = new THREE.Group();
    private circleGroupPos = { x: 0, y: 0 };
    private count = 0;
    private radiusA = 5;
    private radiusB = 3;
    private textF1 = common.createImg([-0, -4, 2], 10, 10, f1);
    private textF2 = common.createImg([-0, -4, 2], 10, 10, f2);
    private textM = common.createText('M', [10, 40, 0]);
    private textF1number: THREE.Mesh;
    private textF2number: THREE.Mesh;
    private textF1Group = new THREE.Group();
    private textF2Group = new THREE.Group();
    private drawed = false;
    private preFoucsNum: number;
    private line = common.drawUnitLine({
        color: '#525252',
        isDash: true,
    });
    private line1 = common.drawUnitLine({
        color: '#525252',
        isDash: true,
    });
    private ellipsePointArr: Array < any > = [];
    private timer: any;
    private render = () => {

        requestAnimationFrame(this.render);

        if (this.count !== 0) {
            this.count = ++this.count % 3;
            return;
        } else {
            this.count = ++this.count % 3;
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    /**
     * @param {domElement} domElement
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov ? : number, width ? : number, height ? : number, near ? : number, far ? : number) {
        super();
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }
    init() {
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createAxis();
        this.initElement(this.controls);
        this.initEvt();
        this.initEllipsePos();
        Line3dModel.moveHandle({ x: 0, y: this.radiusB * 10 }, 'PEN');
        Line3dModel.moveHandle({ x: -40, y: 0 }, 'F1');
        // this.preload();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
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
    resetCamera() {
        this.controls.reset();
    }
    //创建一个坐标系
    createAxis() {
        this.scene.add(AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any));
    }
    // 初始化场景元素
    initElement(controls: any) {
        this.ctrlPoint.name = 'F1';
        this.ctrlPoint1.name = 'F2';
        this.penPoint.name = 'PEN';
        this.scene.add(this.ctrlPoint, this.ctrlPoint1);
        this.scene.add(this.penPoint, this.textM);
        this.scene.add(this.line, this.line1);
        this.textF1Group.add(this.textF1);
        this.textF2Group.add(this.textF2);

        this.scene.add(this.pointGroup, this.textF1Group, this.textF2Group);

    }
    initEllipsePos() {
        for (let i = 90; i < 451; i += 4) {
            let x = 10 * Math.cos(Math.PI * i / 180);
            let y = 10 * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr.push({ x, y, z: 0 });
        }
    }
    initEvt() {
        new SliderControlLine([this.penPoint, this.ctrlPoint, this.ctrlPoint1]).initEvent(this.camera, this.renderer);
    }
    drawEllipseHandle(bool: boolean) {
        this.drawed = bool;
        if (bool) {
            this.drawEllipseAni(this.radiusA, this.radiusB);

        } else {
            clearTimeout(this.timer);
            this.scene.remove(this.circle);
        }
    }
    drawEllipseAni(a: number, b: number) {
        let num = 0;

        function move() {
            if (num > 90) {
                clearTimeout(thiz.timer);

                thiz.pointGroup.remove(...thiz.pointArr);
                thiz.pointArr = [];
                return;
            }
            thiz.scene.remove(thiz.circle);

            const pointArr = thiz.ellipsePointArr.slice(90 - num, 91);
            thiz.circle = common.drawDashOrLine(pointArr);
            const { x, y } = thiz.ellipsePointArr[90 - num];
            thiz.penPoint.position.set(x * a, y * b, 2);
            thiz.textM.position.set(x * a + 10, y * b + 10, 2);
            thiz.circle.scale.set(a, b, 1);
            thiz.scaleSubline({ x: x * a, y: y * b });
            thiz.scene.add(thiz.circle);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }
    scaleSubline(pos: any) {
        const { x, y } = this.ctrlPoint.position;
        const { x: x1, y: y1 } = this.ctrlPoint1.position;
        this.line = common.scaleLine([x, y, 0], [pos.x, pos.y, 0], this.line);
        this.line1 = common.scaleLine([x1, y1, 0], [pos.x, pos.y, 0], this.line1);
    }
    moveFoucsPoint(x: number, name: string) {

        x = Math.round(x / 10) * 10;
        if (name === 'F1') {
            x = x > -40 ? x > -10 ? -10 : x : -40;
            thiz.ctrlPoint.position.set(x, 0, 2);
            thiz.ctrlPoint1.position.set(-x, 0, 2);
        } else {
            x = x < 40 ? x < 10 ? 10 : x : 40;
            thiz.ctrlPoint1.position.set(x, 0, 2);
            thiz.ctrlPoint.position.set(-x, 0, 2);
        }
        if (Math.abs(x) !== Math.abs(this.preFoucsNum)) {
            (window as any).viewHandler.viewModel.$data.isActive = false;
            this.preFoucsNum = x;

        } else {

            return false;
        }
        this.textF1Group.remove(this.textF1number);
        this.textF2Group.remove(this.textF2number);
        if (name === 'F1') {

            thiz.textF1number = common.createText(`(${x/10},0)`, [10, 0, 0], { isItalic: false });
            thiz.textF2number = common.createText(`(${-x/10},0)`, [10, 0, 0], { isItalic: false });
            this.textF1Group.position.set(x - 5, -5, 0);
            this.textF2Group.position.set(-x - 5, -5, 0);
        } else {

            thiz.textF1number = common.createText(`(${-x / 10},0)`, [10, 0, 0], { isItalic: false });
            thiz.textF2number = common.createText(`(${x / 10},0)`, [10, 0, 0], { isItalic: false });
            this.textF1Group.position.set(-x - 5, -5, 0);
            this.textF2Group.position.set(x - 5, -5, 0);
        }
        this.textF1Group.add(this.textF1number);
        this.textF2Group.add(this.textF2number);
        thiz.radiusB = Math.sqrt(thiz.radiusA * thiz.radiusA - x / 10 * x / 10);
        this.penPoint.position.set(0, this.radiusB * 10, 2);
        this.textM.position.set(10, this.radiusB * 10 + 10, 3);
        this.pointGroup.remove(...this.pointArr);
        this.pointArr = [];
        Line3dModel.upHandle('PEN', true);
        this.scaleSubline({ x: 0, y: this.radiusB * 10 });
    }
    static downHandle(name: string) {

    }
    static moveHandle(pos: any, name: any): void {
        let { x, y } = pos;
        if (name === 'PEN') {
            const zoomA = thiz.radiusA * 10;
            const zoomB = thiz.radiusB * 10;
            const k = y / x;
            let cutX: number;
            let cutY: number;
            if (Number.isFinite(k)) {
                cutX = Math.sqrt(1 / (1 / zoomA / zoomA + k * k / zoomB / zoomB));
                cutY = k * cutX;
                if (x < 0) {
                    cutX = -cutX;
                    cutY = -cutY;
                }
            } else {
                cutX = 0;
                cutY = thiz.radiusB * 10;
                if (x < 0) {
                    cutY = -cutY;
                }
            }
            thiz.penPoint.position.set(cutX, cutY, 2);
            thiz.textM.position.set(cutX + 10, cutY + 10, 3);
            thiz.scaleSubline({ x: cutX, y: cutY });
        } else {

            thiz.moveFoucsPoint(x, name);
        }

    }
    static upHandle(name: any, bool ? : boolean): void {
        if ((name === 'PEN' && !thiz.drawed) || bool) {
            const { x, y } = thiz.penPoint.position;
            const copyPoint = thiz.point.clone();
            copyPoint.position.set(x, y, 0);
            thiz.pointArr.push(copyPoint);
            thiz.pointGroup.add(copyPoint);
        }

    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
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
    /**
     * 初始化光源
     */
    initLight(): void {}
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    /**
     *  重置模型位置
     */
    resetModelPosition() {
        clearTimeout(this.timer);
        this.pointGroup.remove(...this.pointArr);
        this.pointArr = [];
        Line3dModel.moveHandle({ x: 0, y: this.radiusB * 10 }, 'PEN');
        Line3dModel.moveHandle({ x: -40, y: 0 }, 'F1');
    }
}
