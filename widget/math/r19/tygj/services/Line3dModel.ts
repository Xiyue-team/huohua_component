import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
let thiz: any = null;
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
    // 添加初始界面三角形三条边
    private circle_group1 = new THREE.Group();
    private circle_one = common.createStrokeCircle(10, {color: '#ff963c'});
    private text_one = common.createText('C1', [0, 18, 0], {color: '#ff963c'});
    private circle_small = common.drawCircle(1, {color: '#3cc6ff'});

    private circle_group2 = new THREE.Group();
    private circle_two = common.createStrokeCircle(40, {color: '#7a3cff'});
    private text_two = common.createText('C2', [0, 8, 0], {color: '#7a3cff'});
    private circle_small2 = common.drawCircle(1, {color: '#3cc6ff'});

    private circle_group3 = new THREE.Group();
    private circle_three = common.createStrokeCircle(10, {color: '#3cc6ff'});
    private text_three = common.createText('P', [0, -1, 0], {color: '#3cc6ff'});
    private circle_small3 = common.drawCircle(1, {color: '#3cc6ff'});
    private ctrlPoint = common.createImg([10, 0, 10], 20, 20, pointImg);

    private trace_point = common.drawCircle(0.6, {color: '#FF0000'});
    private trace_point_group = new THREE.Group();
    private trace_point_array: Array < any > = [];

    private line_0 = common.drawUnitLine({width: 1, color: '#FFC63C', isDash: false});
    private line_1 = common.drawUnitLine({width: 1, color: '#0199FF', isDash: false});

    private line = common.scaleLine([-10, 0, 1], [25, 0, 1], this.line_0);
    private line1 = common.scaleLine([10, 0, 1], [25, 0, 1], this.line_1);

    private count = 0;
    
    private default_circle_added = false;
    private P_added = false;
    private hasDraw = false;
    private circle: any;
    private timer: any;
    private ellipsePointArr: Array < any > = [];
    static downHandle(name: string) {}
    //移动动点位置 x2/a2+ y2/b2 = 1
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        const {x, y} = pos;
        thiz.posChange(x, y);
    }
    static upHandle(): void {
        thiz.recordTracePoint();
    }
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.stepOne();
        this.initEllipseArr();
        this.createAxis();
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
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 300);
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
    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.scene.add(Ax);
    }
    initEllipseArr () {
        for (let i = 0; i < 361; i += 4) {
            const x = 10 * Math.cos(Math.PI * i / 180);
            const y = 10 * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr.push({ x, y, z: 0 });
        }
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
        this.scene.remove(this.line, this.line1);
        this.clearTrace();
        this.clearDraw();
        this.hasDraw = false;
        if (this.default_circle_added) { return; }
        this.circle_group1.add(this.circle_one, this.text_one, this.circle_small);
        this.circle_group2.add(this.circle_two, this.text_two, this.circle_small2);
        this.scene.add(this.circle_group1, this.circle_group2);
        this.circle_group1.position.set(-10, 0, 1);
        this.circle_group2.position.set(10, 0, 1);
        this.default_circle_added = true;
    }
    /**
     * 第二步，加载两个圆
     * 加载以P为圆心的圆
     * 去除足迹
     * 去除绘制的椭圆
     */
    stepTwo () {
        this.scene.add(this.line, this.line1);
        this.circle_group3.visible = true;
        this.ctrlPoint.visible = true;
        this.clearTrace();
        this.clearDraw();
        this.hasDraw = false;
        this.setP(2.5, { x: 25, y: 0 });
        if (this.P_added) { return; }
        this.circle_group3.add(this.circle_three, this.text_three, this.circle_small3);
        this.scene.add(this.circle_group3, this.line, this.line1);
        this.scene.add(this.ctrlPoint);
        this.scene.add(this.trace_point_group);
        this.P_added = true;
    }
    // 设置圆心为P的缩放和位置
    setP (scale: number, pos?: any) {
        if (pos) {
            this.circle_group3.position.set(pos.x, pos.y, 0);
            this.ctrlPoint.position.set(pos.x, pos.y, 10);
            this.line = common.scaleLine([-10, 0, 1], [pos.x, pos.y, 0], this.line_0);
            this.line1 = common.scaleLine([10, 0, 1], [pos.x, pos.y, 0], this.line_1);
        }
        if (scale) {
            this.circle_three.scale.set(scale, scale, scale); 
        }
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint]).initEvent(this.camera, this.renderer);
    }
    // 位置变换
    posChange (x: number, y: number) {
        if (x >= 25) { x = 25; }
        if (x <= -25) { x = -25; }
        const C = 10; // C
        const A = 25;
        const B = 22.9128;
        const k = y / x;
        let cutX: number;
        let cutY: number;
        if (Number.isFinite(k)) {
            cutX = Math.sqrt(1 / (1 / A / A + k * k / B / B));
            cutY = k * cutX;
            if (x < 0) {
                cutX = -cutX;
                cutY = -cutY;
            }
        } else {
            cutX = 0;
            cutY = B;
            if (x < 0) {
                cutY = -cutY;
            }
        }
        const radiusPosX = cutX;
        const radiusPosY = cutY;
        this.ctrlPoint.position.set(radiusPosX, radiusPosY, 10);
        const pc1_pow = Math.pow((C + radiusPosX), 2);
        const pc2_pow = Math.pow(radiusPosY, 2);
        const pRadius = Math.sqrt(pc1_pow + pc2_pow) - C;
        this.setP(pRadius / 10, { x: radiusPosX, y: radiusPosY });
    }
    // 记录椭圆上的点
    recordTracePoint (pos: any) {
        if (this.hasDraw) { return; }
        const x = this.ctrlPoint.position.x;
        const y = this.ctrlPoint.position.y;
        const copyPoint = this.trace_point.clone();
        copyPoint.position.set(x, y, 0);
        this.trace_point_group.add(copyPoint);
        this.trace_point_array.push(copyPoint);
    }

    // 去除痕迹
    clearTrace () {
        if (this.trace_point_array.length) {
            this.trace_point_group.remove(...this.trace_point_array);
            this.trace_point_array = [];
        }
    }

    // 画椭圆
    drawEllipse () {
        this.clearDraw();
        const A = 25;
        const B = 22.9128;
        let num = 0;
        this.hasDraw = true;
        this.clearTrace();
        thiz.circle_group3.visible = false;
        function move () {
            if (num > 90) {
                return;
            }
            thiz.scene.remove(thiz.circle);
            const pointArr = thiz.ellipsePointArr.slice(90 - num, 91);
            thiz.circle = common.drawDashOrLine(pointArr, {color: '#FF0000', isDash: true});
            const { x, y } = thiz.ellipsePointArr[90 - num];
            thiz.posChange(x, y);
            thiz.circle.scale.set(A / 10, B / 10, 0);
            thiz.scene.add(thiz.circle);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }

    // 去除绘制的图
    clearDraw () {
        clearTimeout(this.timer);
        if (this.circle) {
            this.scene.remove(this.circle);
        }
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}




