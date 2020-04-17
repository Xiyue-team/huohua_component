import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as penImg from '../sub_static/pen.png';
import * as Kl1Img from '../sub_static/Kl1.png';
import * as Kl2Img from '../sub_static/Kl2.png';
import * as P1Img from '../sub_static/P1.png';
import * as P2Img from '../sub_static/P2.png';
import * as F1Img from '../sub_static/F1.png';
import * as F2Img from '../sub_static/F2.png';

let thiz: any = null;
OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private mark = false;
    private val: number;
    // 添加画笔和M字母
    private penPoint = common.createImg([0, 30, 2], 20, 20, penImg);
    private textM = common.createText('M');
    private circle: any;
    // 添加点P1/P2/F1/F2和笔画过留下的点
    private ctrlPoint = common.drawCircle(1.5, { color: '#1E90FF', position: [-40, 0, 0]});
    private ctrlPoint1 = common.drawCircle(1.5, { color: '#1E90FF', position: [40, 0, 0]});
    private pointP1 = common.drawCircle(1.5, { color: '#1E90FF', position: [-50, 0, 0]});
    private pointP2 = common.drawCircle(1.5, { color: '#1E90FF', position: [50, 0, 0]});
    private point = common.drawCircle(1);
    private pointArr: any = [];
    private pointGroup = new THREE.Group();
    private count = 0;
    private radiusA = 5;
    private radiusB = 3;
    // 创建P1/P2/F1/F2字母
    private textP1 = common.createImg([-53, -9, 0], 6, 8.7, P1Img);
    private textP2 = common.createImg([53, -9, 0], 6, 8.7, P2Img);
    private textF1 = common.createImg([0, -4, 0], 6, 8.7, F1Img);
    private textF2 = common.createImg([0, -4, 0], 6, 8.7, F2Img);
    private textF1number: THREE.Mesh;
    private textF2number: THREE.Mesh;
    private textF1Group = new THREE.Group();
    private textF2Group = new THREE.Group();
    private line = common.drawUnitLine({color: '#525252', isDash: false, });
    private line1 = common.drawUnitLine({color: '#525252', isDash: false, });
    private textKl1Img = common.createImg([0, 0, 0], 8.64, 11.52, Kl1Img);
    private textKl2Img = common.createImg([22, 0, 0], 8.28, 11.52, Kl2Img);
    private textKl1number: THREE.Mesh;
    private textKl2number: THREE.Mesh;
    private textKl1Group = new THREE.Group();
    private textKl2Group = new THREE.Group();
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
    constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?: number) {
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
        // Line3dModel.moveHandle({ x: 0, y: this.radiusB * 10 }, 'PEN');
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
        this.scene.add(AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
            OTextXOffSet: 3 * 200 / 200, OTextYOffSet: 3 * 200 / 200} as any));
    }
    // 初始化场景元素
    initElement(controls: any) {
        this.ctrlPoint.name = 'F1';
        this.ctrlPoint1.name = 'F2';
        this.penPoint.name = 'PEN';
        this.scene.add(this.ctrlPoint, this.ctrlPoint1, this.penPoint, this.line, this.line1);
        this.textF1Group.add(this.textF1);
        this.textF2Group.add(this.textF2);
        this.textKl1Group.add(this.textKl1Img);
        this.textKl2Group.add(this.textKl2Img);
        this.scene.add(this.textM, this.textP1, this.textP2, this.pointP1, this.pointP2, this.pointGroup,
            this.textF1Group, this.textF2Group, this.textKl1Group, this.textKl2Group);
    }
    initEllipsePos() {
        for (let i = 90; i < 451; i += 4) {
            const x = 10 * Math.cos(Math.PI * i / 180);
            const y = 10 * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr.push({ x, y, z: 0 });
        }
    }
    initEvt() {
        new SliderControlLine([this.penPoint]).initEvent(this.camera, this.renderer);
    }
    drawEllipseHandle(bool: boolean) {
        if (bool) {
            this.drawEllipseAni(this.radiusA, this.radiusB);
        } else {
            clearTimeout(this.timer);
            this.scene.remove(this.circle);
        }
    }
    // 绘画椭圆的函数
    drawEllipseAni(a: number, b: number) {
        let num = 0;
        if (this.mark === true) {
            return;
        } else {
            move();
        }
        function move() {
            thiz.mark = true;
            if (num > 90) {
                clearTimeout(thiz.timer);
                //清除之前绘制的点
                setTimeout(() => {
                    thiz.pointGroup.children = [];
                    thiz.scene.remove(thiz.pointGroup);
                    thiz.mark = false;
                }, 100);
                return;
            }
            thiz.textKl1Group.remove(thiz.textKl1number);
            thiz.textKl2Group.remove(thiz.textKl2number);
            thiz.scene.remove(thiz.circle);
            const pointArr = thiz.ellipsePointArr.slice(90 - num, 91);
            thiz.circle = common.drawDashOrLine(pointArr);
            const { x, y } = thiz.ellipsePointArr[90 - num];
            thiz.penPoint.position.set(x * a, y * b, 2);
            thiz.textKl1number = common.createText(`=${(y * b / 50).toFixed(2)}`,
                [12, 5, 0], { isItalic: false });
            thiz.textKl2number = common.createText(`=${(y * b / -50).toFixed(2)}`, [36, 5, 0], { isItalic: false });
            thiz.textKl1Group.add(thiz.textKl1number);
            thiz.textKl2Group.add(thiz.textKl2number);
            thiz.circle.scale.set(a, b, 1);
            thiz.scaleSubline({ x: x * a, y: y * b });
            thiz.scene.add(thiz.circle);
            num++;
            // thiz.timer = requestAnimationFrame(move);
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }
    // 缩放线段及改变斜率、M点字体位置函数
    scaleSubline(pos: any) {
        const { x, y } = this.pointP1.position;
        const { x: x1, y: y1 } = this.pointP2.position;
        this.line = common.scaleLine([x, y, 0], [pos.x, pos.y, 0], this.line);
        this.line1 = common.scaleLine([x1, y1, 0], [pos.x, pos.y, 0], this.line1);
        // 计算笔与P1/P2连线中点位置x、y值
        const centerPos1 = (x + pos.x) / 2;
        const centerPos2 = (y + pos.y) / 2;
        // 计算kl1、kl2斜率
        const kl1 = (pos.y - y) / (pos.x - x);
        const kl2 = (pos.y - y1) / (pos.x - x1);
        const radian1 =  Math.atan(kl1);
        const radian2 =  Math.atan(kl2);
        // 计算kl1、kl2上顶点的坐标x、y
        const coordinateKl1x = 100 * Math.cos((radian1 * 180 / Math.PI) * Math.PI / 180);
        const coordinateKl1y = 100 * Math.sin((radian1 * 180 / Math.PI) * Math.PI / 180);
        const coordinateKl2x = 100 * Math.cos((radian2 * 180 / Math.PI) * Math.PI / 180);
        const coordinateKl2y = 100 * Math.sin((radian2 * 180 / Math.PI) * Math.PI / 180);
        if (kl1 > 0) {
            this.textKl1Group.position.set(10 + centerPos1 + coordinateKl1x, 5 + centerPos2 + coordinateKl1y, 2);
        } else {
            this.textKl1Group.position.set(10 + centerPos1 - coordinateKl1x, 5 + centerPos2 - coordinateKl1y, 2);
        }
        if (kl2 > 0) {
            this.textKl2Group.position.set(6 + centerPos1 + coordinateKl2x, 5 + centerPos2 + coordinateKl2y, 2);
        } else {
            this.textKl2Group.position.set(6 + centerPos1 - coordinateKl2x, 5 + centerPos2 - coordinateKl2y, 2);
        }
        this.textM.position.set(pos.x + 5, pos.y + 16, 0);
    }
    // 椭圆焦点变动函数
    moveFoucsPoint(x: number, name: string) {
        this.textF1Group.remove(this.textF1number);
        this.textF2Group.remove(this.textF2number);
        this.textKl1Group.remove(this.textKl1number);
        this.textKl2Group.remove(this.textKl2number);
        (window as any).viewHandler.viewModel.$data.isActive = false;
        // x = Math.round(x / 10) * 10;
        if (name === 'F1') {
            x = x >= -50 ? x >= 0 ? 0 : x : -50;
            thiz.ctrlPoint.position.set(x, 0, 0);
            thiz.ctrlPoint1.position.set(-x, 0, 0);
            thiz.textF1number = common.createText(`(${(x / 10).toFixed(1)},0)`, [13, 0, 0], { isItalic: false });
            thiz.textF2number = common.createText(`(${(-x / 10).toFixed(1)},0)`, [12, 0, 0], { isItalic: false });
            this.textF1Group.position.set(x - 2, -5, 0);
            this.textF2Group.position.set(-x, 13, 0);
        } else {
            x = x <= 50 ? x < 0 ? 0 : x : 50;
            thiz.ctrlPoint1.position.set(x, 0, 0);
            thiz.ctrlPoint.position.set(-x, 0, 0);
            thiz.textF1number = common.createText(`(${(-x / 10).toFixed(1)},0)`, [13, 0, 0], { isItalic: false });
            thiz.textF2number = common.createText(`(${(x / 10).toFixed(1)},0)`, [12, 0, 0], { isItalic: false });
            this.textF1Group.position.set(-x - 2, -5, 0);
            this.textF2Group.position.set(x, 13, 0);
        }
        thiz.radiusB = Math.sqrt(thiz.radiusA * thiz.radiusA - x / 10 * x / 10);
        this.penPoint.position.set(0, this.radiusB * 10, 2);
        thiz.textKl1number = common.createText(`=${(this.radiusB * 10 / 50).toFixed(2)}`,
            [12, 5, 0], { isItalic: false });
        thiz.textKl2number = common.createText(`=${(this.radiusB * 10 / -50).toFixed(2)}`, [36, 5, 0], { isItalic: false });
        this.point.position.set(0, this.radiusB * 10, 0);
        this.pointGroup.add(this.point);
        this.pointGroup.remove(...this.pointArr);
        this.textF1Group.add(this.textF1number);
        this.textF2Group.add(this.textF2number);
        this.textKl1Group.add(this.textKl1number);
        this.textKl2Group.add(this.textKl2number);
        this.scaleSubline({ x: 0, y: this.radiusB * 10 });
    }
    static downHandle(name: string) {
    }
    // 鼠标移动事件
    static moveHandle(pos: any, name: any): void {
        const { x, y} = pos;
        thiz.textKl1Group.remove(thiz.textKl1number);
        thiz.textKl2Group.remove(thiz.textKl2number);
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
            thiz.textKl1number = common.createText(`=${(cutY / (cutX + 50)).toFixed(2)}`, [12, 5, 0], { isItalic: false });
            thiz.textKl2number = common.createText(`=${(cutY / (cutX - 50)).toFixed(2)}`, [36, 5, 0], { isItalic: false });
            thiz.scaleSubline({ x: cutX, y: cutY });
        } else {
            thiz.moveFoucsPoint(x, name);
        }
        thiz.textKl1Group.add(thiz.textKl1number);
        thiz.textKl2Group.add(thiz.textKl2number);
    }
    // 鼠标拖动释放画点事件
    static upHandle(name: any): void {
        if (name === 'PEN') {
            const { x, y } = thiz.penPoint.position;
            const copyPoint = thiz.point.clone();
            copyPoint.position.set(x, y, 0);
            thiz.pointArr.push(copyPoint);
            thiz.pointGroup.add(copyPoint);
        }
    }
    // 改变e值调用函数
    changeFoucsPoint(val: any) {
        this.val = val;
        const num = this.val * 50;
        this.moveFoucsPoint(num, 'FI');
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
        this.mark = false;
        this.scene.add(this.pointGroup);
        clearTimeout(this.timer);
        Line3dModel.moveHandle({ x: 0, y: this.radiusB * 10 }, 'PEN');
        Line3dModel.moveHandle({ x: -40, y: 0 }, 'F1');
    }
}
