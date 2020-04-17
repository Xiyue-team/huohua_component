import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
    sliderControlLine: SliderControlLine;
    // 添加初始界面焦点上两个蓝色的点
    private circle_smallF1 = common.drawCircle(1, {color: '#F72F47'});
    private circle_smallF2 = common.drawCircle(1, {color: '#F72F47'});
    // 添加初始界面F1/F2文字
    private text_F11 = common.createText('F', [-62, 10, 0], {color: '#000000'});
    private text_F12 = common.createText('₁', [-59, 8, 0], {color: '#000000', isItalic: false});
    private text_F21 = common.createText('F', [52, 10, 0], {color: '#000000'});
    private text_F22 = common.createText('₂', [55, 8, 0], {color: '#000000', isItalic: false});
    private text_F1pos = common.createText('(-5,0)', [-50, 10, 0], {color: '#000000', isItalic: false});
    private text_F2pos = common.createText('(5,0)', [63, 10, 0], {color: '#000000', isItalic: false});
    // 添加初始界面QF1/QF2线段
    private lineQF1 = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    private lineQF2 = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    // 拖动点
    private ctrlPoint = common.createImg([-10, 0, 1], 20, 20, pointImg);
    private text_Q = common.createText('Q', [37.5 + 10, 35, 0], {color: '#000000'});
    private controls: any;
    // 创建A点
    private text_A = common.createText('A', [37.5 + 10, -35, 0], {color: '#000000'});
    private point_A = common.drawCircle(1, {color: '#0199FF'});
    private pos_A: any = [null, null, 1];
    //计算QF2线段的单位向量
    private ex: number;
    private ey: number;
    // 创建P点
    private text_P = common.createText('P', [37.5 + 10, -35, 0], {color: '#000000'});
    private pos_P: any = [null, null, 1];
    // 创建F1P/QP线段
    private linePF1 = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    private lineQP = common.drawUnitLine({width: 0.8, color: '#F5A623', isDash: false, });
    // 创建直角
    private rightAngle = common.drawRightAngle(3, {color: '#0199FF'});
    // 创建F1P/QF2延长线线段及OP线段
    private linePA = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    private lineF2A = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    private lineOP = common.drawUnitLine({width: 0.8, color: '#000000', isDash: false, });
    private text_2 = common.createText('2', [37.5 + 10, -35, 0], {color: '#DC143C', isItalic: false});
    private text_2a = common.createText('a', [37.5 + 10, -35, 0], {color: '#DC143C'});
    private text_a = common.createText('a', [37.5 + 10, -35, 0], {color: '#DC143C'});
    private count = 0;
    // 创建Q拖动后P点留下的点轨迹
    private trace_point = common.drawCircle(0.6, {color: '#DC143C'});
    private trace_point_group = new THREE.Group();
    private trace_point_array: Array<any> = [];
    // 创建P点轨迹圆
    private circle: any;
    private circlePointArr: Array<any> = [];
    // 创建三个绘制定时器
    timer: any;
    timer1: any;
    timer2: any;
    private hasDraw = false;
    mark = false;
    // x轴负半轴上双曲线点
    private hyperbolaPointArr: any = [];
    private leftHyperBol: any;
    private rightHyperBol: any;
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.tbctrl();
        this.createAxis();
        this.initCirclePos();
        this.initHyperbola();
        this.initEvt();
        this.initElement();
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
        const Ax = AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']
        } as any);
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }
    // 创建圆的点数组函数
    creatCirclePos (point_F: number, i: number, point_Q: number) {
            const qx = point_Q * Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(i, 2));
            //计算QF2线段的单位向量
            const ex = (point_F - qx) / Math.sqrt((point_F - qx) * (point_F - qx) + i * i);
            const ey = -i / Math.sqrt((point_F - qx) * (point_F - qx) + i * i);
            const xa = 60 * ex + point_F;
            const ya = 60 * ey;
            const x = (xa - point_F) / 2;
            const y = ya / 2;
            this.circlePointArr.push({x, y, z: 0});
    }
    initCirclePos() {
        for (let i = -160 / 3; i <= 160 / 3; i += 1) {
            this.creatCirclePos(-50, i, -1);
        }
        for (let i = 160 / 3; i >= -163 / 3; i -= 1) {
            this.creatCirclePos(50, i, 1);
        }
    }

    // 创建x轴上的双曲线
    initHyperbola() {
        const a = 30;
        const b = 40;
        for (let i = -70; i <= 70; i += 1) {
            const x = -Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
            this.hyperbolaPointArr.push(new THREE.Vector3(x, i, 0));
        }
        this.leftHyperBol = ThreeUtil.createTube(this.hyperbolaPointArr, 0.5, 500, '#000');
        this.rightHyperBol = this.leftHyperBol.clone();
        this.rightHyperBol.rotateY(Math.PI);
        this.scene.add(this.leftHyperBol, this.rightHyperBol);
    }

    // 初始化场景元素
    initElement() {
        this.ctrlPoint.position.set(37.5, 35, 1);
        this.circle_smallF1.position.set(-50, 0, 2);
        this.circle_smallF2.position.set(50, 0, 2);
        this.posChange(37.5, 30, 2, 50);
        this.scene.add(this.circle_smallF1, this.circle_smallF2, this.ctrlPoint, this.text_Q, this.lineQF1, this.lineQF2,
            this.text_F11, this.text_F12, this.text_F21, this.text_F22, this.text_P,
            this.linePF1, this.lineQP, this.rightAngle, this.text_F1pos, this.text_F2pos);
    }

    //移动动点位置
    // tslint:disable-next-line:member-ordering
    moveHandle (pos: any) {
        const {x, y} = pos;
        if ((window as any).viewHandler.viewModel.$data.currentStep === 'step4') {
            if (x < 0) {
                this.posChange(x, y, 1, -50);
            } else if (x >= 0) {
                this.posChange(x, y, 2, 50);
            }
        } else {
            this.posChange(x, y, 2, 50);
        }
    }

    //松开拖动点后添加红点标记函数
    // tslint:disable-next-line:member-ordering
    upHandle () {
        this.recordTracePoint();
    }

    // Q拖动点变化事件函数
    posChange (x: number, y: number, event: number, point_F: number) {
        y = y < 70 ? y < -70 ? -70 : y : 70;
        if (event === 1) {
            x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(y, 2));
        } else if (event === 2) {
            x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(y, 2));
        }
        // 设置拖动点Q的位置
        this.ctrlPoint.position.set(x, y, 1);
        this.text_Q.position.set(x + 10, y + 5, 1);
        this.lineQF1 = common.scaleLine([-50, 0, 1], [x, y, 1], this.lineQF1);
        this.lineQF2 = common.scaleLine([50, 0, 1], [x, y, 1], this.lineQF2);
        //计算QF2线段的单位向量
        this.ex = (point_F - this.ctrlPoint.position.x) / Math.sqrt((point_F - this.ctrlPoint.position.x) *
            (point_F - this.ctrlPoint.position.x) + this.ctrlPoint.position.y * this.ctrlPoint.position.y);
        this.ey = -this.ctrlPoint.position.y / Math.sqrt((point_F - this.ctrlPoint.position.x) * (point_F - this.ctrlPoint.position.x)
            + this.ctrlPoint.position.y * this.ctrlPoint.position.y);
        this.pos_A[0] = 60 * this.ex + point_F;
        this.pos_A[1] = 60 * this.ey;

        this.point_A.position.set(this.pos_A[0], this.pos_A[1], 2);
        this.text_A.position.set(this.pos_A[0] + 10, this.pos_A[1] + 5, 2);
        //计算P点的坐标
        this.pos_P[0] = (this.pos_A[0] - point_F) / 2;
        this.pos_P[1] = this.pos_A[1] / 2;
        const rad = Math.atan2(y - this.pos_P[1], x - this.pos_P[0]);
        this.text_P.position.set(this.pos_P[0] + 10, this.pos_P[1] + 5, 2);
        this.linePF1 = common.scaleLine([-point_F, 0, 1], [this.pos_P[0], this.pos_P[1], 1], this.linePF1);
        this.lineQP = common.scaleLine([this.pos_P[0], this.pos_P[1], 1], [x, y, 1], this.lineQP, 3);
        this.rightAngle.position.set(this.pos_P[0], this.pos_P[1], 1);
        // 设置直角标识的位置
        if (y > 0) {
            if (x > 0) {
                this.rightAngle.rotation.z = rad;
            } else if (x < 0) {
                this.rightAngle.rotation.z = rad - Math.PI / 2;
            }
        } else if (y < 0) {
            if (x > 0) {
                this.rightAngle.rotation.z = rad - Math.PI / 2;
            } else if (x < 0) {
                this.rightAngle.rotation.z = rad;
            }
        }
        this.linePA = common.scaleLine(this.pos_P, this.pos_A, this.linePA);
        this.lineF2A = common.scaleLine(this.pos_A, [point_F, 0, 1], this.lineF2A, );
        this.lineOP = common.scaleLine([0, 0, 1], this.pos_P, this.lineOP, );
        this.text_2a.position.set((this.pos_A[0] + point_F) / 2 + 6, this.pos_A[1] / 2 + 2, 2);
        this.text_2.position.set((this.pos_A[0] + point_F) / 2 + 3, this.pos_A[1] / 2 + 2, 2);
        this.text_a.position.set(this.pos_P[0] / 2 + 5, this.pos_P[1] / 2 + 5, 2);
        this.text_a.scale.set(0.2, 0.2, 0.2);
    }

    // 解析步骤一做QF2/F1P延长线动画事件函数
    animationA(point_F: number) {
        Promise.all([
            this.scene.remove(this.text_A, this.point_A, this.lineOP),
            common.lineAni(this.pos_P, this.pos_A, this.linePA),
            common.lineAni([point_F, 0, 1], this.pos_A, this.lineF2A),
        ]).then(() => {
            this.scene.add(this.text_A, this.point_A, this.lineOP);
            this.lineOP = common.scaleLine([0, 0, 1], this.pos_P, this.lineOP, );
        });
    }

    // 记录P点轨迹
    recordTracePoint() {
        if ((window as any).viewHandler.viewModel.$data.active1) {
            return;
        }
        const copyPoint = this.trace_point.clone();
        copyPoint.position.set(this.pos_P[0], this.pos_P[1], 1);
        this.trace_point_group.add(copyPoint);
        this.trace_point_array.push(copyPoint);
    }

    // 去除拖动点留下的点痕迹
    clearTrace() {
        if (this.trace_point_array.length) {
            this.trace_point_group.remove(...this.trace_point_array);
            this.trace_point_array = [];
        }
    }

    // 改变线条颜色函数
    changeColorEvent(line: any, color: string, ) {
        (line as any).material.color = new THREE.Color(color);
    }

    // 滚动解析步骤事件函数
    stepChange(type: string) {
        if (type === 'step1') {
            this.scene.add(this.linePA, this.lineF2A, );
            this.changeColorEvent(this.lineQF1, '#000000');
            this.changeColorEvent(this.lineQF2, '#000000');
            this.changeColorEvent(this.lineF2A, '#000000');
            if (this.ctrlPoint.position.x < 0) {
                this.animationA(-50);
            } else {
                this.animationA(50);
            }
        } else if (type === 'step2') {
            this.scene.remove(this.text_2a, this.text_2);
            this.changeColorEvent(this.lineQF1, '#9013FE');
            this.changeColorEvent(this.lineQF2, '#9013FE');
            this.changeColorEvent(this.lineF2A, '#9013FE');
        } else if (type === 'step3') {
            this.changeColorEvent(this.lineF2A, '#DC143C');
            this.changeColorEvent(this.lineOP, '#000000');
            this.scene.add(this.text_2a, this.text_2);
            this.trace_point.visible = false;
            this.clearTrace();
            this.clearDraw();
            this.hasDraw = false;
            this.scene.remove(this.text_a, this.trace_point_group);
            if (this.ctrlPoint.position.x < 0) {
                this.posChange(37.5, 30, 2, 50);
            }
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
            clearTimeout((window as any).viewHandler.viewModel.$data.timer);
        } else if (type === 'step4') {
            this.trace_point.visible = true;
            this.trace_point.position.set(this.pos_P[0], this.pos_P[1], 1);
            this.changeColorEvent(this.lineOP, '#DC143C');
            this.scene.add(this.text_a, this.trace_point, this.trace_point_group);
        }
    }

    // 绘制P点轨迹函数
    drawCircle = () => {
        const thiz = this;
        this.clearDraw();
        let num = 0;
        function move() {
            if (num > 215) {
                clearTimeout(thiz.timer);
                thiz.clearTrace();
                thiz.trace_point.visible = false;
                return;
            }
            if (thiz.ctrlPoint.position.y >= 158 / 3) {
                thiz.mark = true;
            }
            thiz.scene.remove(thiz.circle);
            const pointArr = thiz.circlePointArr.slice(215 - num, 216);
            thiz.circle = common.drawDashOrLine(pointArr, {color : '#DC143C', });
            thiz.scene.add(thiz.circle);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }
    moveEvent () {
        const thiz = this;
        let num1 = -160 / 3;
        function move1() {
            if (num1 > 160 / 3) {
                clearTimeout(thiz.timer1);
                return;
            }
            const x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(num1, 2));
            thiz.posChange(x, num1, 2, 50);
            num1 ++;
            thiz.timer1 = setTimeout(move1, 30);
        }
        move1();
    }
    moveEvent1 () {
        const thiz = this;
        let num2 = 157 / 3;
        function move2() {
            if (num2 < -163 / 3) {
                clearTimeout(thiz.timer2);
                return;
            }
            const x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(num2, 2));
            thiz.posChange(x, num2, 1, -50);
            num2 --;
            thiz.timer2 = setTimeout(move2, 30);
        }
        move2();
    }
    // 去除绘制的圆
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




