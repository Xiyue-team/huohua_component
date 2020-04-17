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
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';

let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {

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
    private sliderControlLine: SliderControlLine;
    // 添加初始界面c1/c2两个圆的相关元素
    private circle_group1 = new THREE.Group();
    private circle_one = common.createStrokeCircle(10, {color: '#3CC6FF'});
    private text_one = common.createText('C', [0, 8, 0], {color: '#3CC6FF'});
    private text_one1 = common.createText('₁', [4, 7, 0], {color: '#3CC6FF', isItalic : false});
    private circle_small = common.drawCircle(1, {color: '#3cc6ff'});

    private circle_group2 = new THREE.Group();
    private circle_two = common.createStrokeCircle(30, {color: '#7a3cff'});
    private text_two = common.createText('C', [0, -1, 0], {color: '#7a3cff'});
    private text_two1 = common.createText('₂', [4, -2, 0], {color: '#7a3cff', isItalic : false});
    private circle_small2 = common.drawCircle(1, {color: '#7a3cff'});
    // 添加MC1/MC2两条连线
    private lineBlue = common.drawUnitLine({width: 0.8, color: '#3cc6ff', isDash: false, });
    private linePurple = common.drawUnitLine({width: 0.8, color: '#7a3cff', isDash: false, });
    private line_blue = common.scaleLine([-30, 0, 1], [-10, 0, 1], this.lineBlue);
    private line_purple = common.scaleLine([30, 0, 1], [-10, 0, 1], this.linePurple);
    // 添加M圆的相关元素
    private circle_group3 = new THREE.Group();
    private circle_three = common.createStrokeCircle(10, {color: '#FF963C'});
    private text_three = common.createText('M', [0, 11, 0], {color: '#FF963C'});
    private circle_small3 = common.drawCircle(1, {color: '#FF963C'});
    private ctrlPoint = common.createImg([-10, 0, 1], 20, 20, pointImg);
    // 创建M圆拖动后圆心留下的点轨迹
    private trace_point = common.drawCircle(0.6, {color: '#FF963C'});
    private trace_point_group = new THREE.Group();
    private trace_point_array: Array < any > = [];

    private count = 0;
    private default_circle_added = false;
    private M_added = false;
    private hasDraw = false;
    private controls: any;
    private hyperbola: any;
    private timer: any;
    //x轴负半轴上双曲线点
    private hyperbolaPointArr: any = [];
    private leftHyperBol: any;
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

    init(): void {
        thiz = this;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.tbctrl();
        this.stepOne();
        this.createAxis();
        this.initHyperbola();
        this.initEvt();
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
        this.camera = new PerspectiveCamera(45, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 330);
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
    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.scene.add(Ax);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint]).initEvent(this.camera, this.renderer);
    }
    initHyperbola () {
        const a = 10;
        const b = Math.sqrt(2) * 20;
        for (let i = -90; i <= 90; i += 1) {
            const x = -Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
            this.hyperbolaPointArr.push(new THREE.Vector3(x, i, 0));
        }
        this.leftHyperBol = ThreeUtil.createTube(this.hyperbolaPointArr, 0.5, 500, '#000');
    }
    /**
     * 第一步，加载两个圆
     * 去除以P为圆心的圆
     * 去除足迹
     * 去除绘制的椭圆
     */
    stepOne () {
        this.circle_group3.visible = false;
        this.ctrlPoint.visible = false;
        this.trace_point.visible = false;
        this.line_blue.visible = false;
        this.line_purple.visible = false;
        this.clearTrace();
        this.clearDraw();
        this.hasDraw = false;
        if (this.default_circle_added) { return; }
        this.circle_group1.add(this.circle_one, this.text_one, this.text_one1, this.circle_small);
        this.circle_group2.add(this.circle_two, this.text_two, this.text_two1, this.circle_small2);
        this.scene.add(this.circle_group1, this.circle_group2);
        this.circle_group1.position.set(-30, 0, 0);
        this.circle_group2.position.set(30, 0, 0);
        this.default_circle_added = true;
        this.circle_small.position.z = 1;
        this.circle_small2.position.z = 1;
    }
    /**
     * 第二步，加载两个圆
     * 加载以P为圆心的圆
     * 去除足迹
     * 去除绘制的椭圆
     */
    stepTwo () {
        this.circle_group3.visible = true;
        this.ctrlPoint.visible = true;
        this.trace_point.visible = true;
        this.line_blue.visible = true;
        this.line_purple.visible = true;
        this.clearTrace();
        this.clearDraw();
        this.hasDraw = false;
        thiz.sliderControlLine.enabled = true;
        this.setP(1, { x: -10, y: 0 });
        if (this.M_added) { return; }
        this.circle_group3.add(this.circle_three, this.text_three, this.circle_small3);
        this.circle_group3.position.set(-10, 0, 0);
        this.trace_point.position.set(-10, 0, 1);
        this.scene.add(this.circle_group3, this.ctrlPoint, this.trace_point_group, this.trace_point, this.line_blue, this.line_purple);
        this.M_added = true;
    }
    // 设置圆心为M的缩放和位置
    setP (scale: number, pos?: any) {
        if (pos) {
            this.circle_group3.position.set(pos.x, pos.y, 0);
            this.ctrlPoint.position.set(pos.x, pos.y, 1);
            this.line_blue = common.scaleLine([-30, 0, 1], [pos.x, pos.y, 1], this.lineBlue);
            this.line_purple = common.scaleLine([30, 0, 1], [pos.x, pos.y, 1], this.linePurple);
        }
        if (scale) {
            this.circle_three.scale.set(scale, scale, scale); 
        }
    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        const {x, y} = pos;
        thiz.posChange(x, y);
        if (thiz.hasDraw === true) {
            thiz.sliderControlLine.enabled = false;
        } else {
            thiz.sliderControlLine.enabled = true;
        }

    }
    //松开拖动点后添加红点标记函数
    // tslint:disable-next-line:member-ordering
    static upHandle(): void {
        thiz.recordTracePoint();
    }
    // M圆变化函数
    posChange (x: number, y: number) {
        y = y < 90 ? y < -90 ? -90 : y : 90;
        x = -Math.sqrt(Math.pow(10, 2) + (Math.pow(10, 2) / Math.pow(Math.sqrt(2) * 20, 2)) * Math.pow(y, 2));
        // 设置拖动点的位置
        thiz.ctrlPoint.position.set(x, y, 2);
        // M圆的半径
        const radius = Math.hypot(x + 30, y) - 10;
        // M圆的位置变化和大小缩放事件
        thiz.setP(radius / 10, { x: x, y: y });
    }
    // 记录双曲线运动轨迹上的点
    recordTracePoint (pos: any) {
        if (this.hasDraw) { return; }
        const x = this.ctrlPoint.position.x;
        const y = this.ctrlPoint.position.y;
        const copyPoint = this.trace_point.clone();
        copyPoint.position.set(x, y, -1);
        this.trace_point_group.add(copyPoint);
        this.trace_point_array.push(copyPoint);
    }

    // 去除拖动点留下的点痕迹
    clearTrace () {
        if (this.trace_point_array.length) {
            this.trace_point_group.remove(...this.trace_point_array);
            this.trace_point_array = [];
        }
    }

    // 画左半轴双曲线动画函数事件
    drawHyperbola () {
        this.clearDraw();
        let num = 1;
        this.hasDraw = true;
        function move () {
            if (num > 180) {
                thiz.clearTrace();
                thiz.trace_point.visible = false;
                thiz.circle_group3.visible = false;
                thiz.ctrlPoint.visible = false;
                thiz.line_blue.visible = false;
                thiz.line_purple.visible = false;
                return;
            }
            thiz.scene.remove(thiz.hyperbola);
            const pointArr = thiz.hyperbolaPointArr.slice(-num, );
            thiz.hyperbola = common.drawDashOrLine(pointArr, {color: '#FF963C', isDash: true});
            const { x, y } = thiz.hyperbolaPointArr[num];
            thiz.posChange(x, -y);
            thiz.scene.add(thiz.hyperbola);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }

    // 去除绘制的双曲线
    clearDraw () {
        clearTimeout(this.timer);
        if (this.hyperbola) {
            this.scene.remove(this.hyperbola);
        }
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

}




