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
import * as point1Img from '../sub_static/point1.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    //控制圆心
    private ctrlPoint = common.createImg([0, 0, 2], 20, 20, pointImg);
    // 控制半径
    private ctrlLinePoint = common.createImg([40, 0, 1], 20, 20, pointImg);
    // 旋转直线
    private rotateLinePoint = common.createImg([60, 0, 1], 20, 20, pointImg);
    // 移动直线
    private ctrlPoint1 = common.createImg([30, 0, 2], 20, 20, point1Img);
    private circle = common.createStrokeCircle(10);
    private circleGroup = new THREE.Group();
    private circleGroupPos = { x: 0, y: 0 };
    private corssPointPos = { x: 0, y: 0 };
    private pointOnCircle = { x: 0, y: 0 };
    private linePos = { x: 40, y: 0 };
    private line = common.drawUnitLine({
        color: '#333'
    });
    private verticalLine = common.drawUnitLine({
        color: '#333'
    });
    private pointLineForRadius = common.drawUnitLine({
        color: '#0199FF'
    });
    private lineGroup = new THREE.Group();
    private radius = 3;
    private textR = common.createText('r', [0, 0, 0], { color: '#0199FF' });
    private textD = common.createText('d');
    private count = 0;
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
        this.changePosByVue({ x: 10, y: 10 });
        Line3dModel.moveHandle({ x: this.linePos.x, y: this.linePos.y }, 'MOVE_LINE');
        Line3dModel.moveHandle({ x: 0, y: 60 }, 'ROTATE');
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
        this.ctrlPoint.name = 'CENTER';
        this.ctrlPoint1.name = 'RADIUS';
        this.circleGroup.add(this.ctrlPoint1, this.circle);
        this.circle.scale.set(3, 3, 3);
        this.scene.add(this.circleGroup, this.ctrlPoint);

        this.rotateLinePoint.name = 'ROTATE';
        this.ctrlLinePoint.name = 'MOVE_LINE'
        this.line.scale.set(150, 1, 1);
        this.lineGroup.add(this.line, this.rotateLinePoint);
        this.scene.add(this.lineGroup);
        this.scene.add(this.verticalLine, this.textR, this.textD, this.pointLineForRadius);
        this.scene.add(this.ctrlLinePoint);
    }
    initEvt() {
        new SliderControlLine([this.ctrlPoint1,this.rotateLinePoint,this.ctrlPoint,this.ctrlLinePoint]).initEvent(this.camera, this.renderer);
        // new SliderControlLine(this.ctrlPoint1, true).initEvent(this.camera, this.renderer);
        // new SliderControlLine(this.ctrlLinePoint).initEvent(this.camera, this.renderer);
        // new SliderControlLine(this.rotateLinePoint, true).initEvent(this.camera, this.renderer);
    }
    static downHandle(name: any) {

    }
    static moveHandle(pos: any, name: any): void {
        let { x, y } = pos;
        if (name === 'CENTER') {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            x = x < 90 ? x < -90 ? -90 : x : 90;
            y = y < 90 ? y < -90 ? -90 : y : 90;
            thiz.ctrlPoint.position.set(x, y, 2);
            (window as any).viewHandler.viewModel.$data.a = -x / 10;
            (window as any).viewHandler.viewModel.$data.b = -y / 10;
            if ((window as any).viewHandler.viewModel.$refs.spin1) {
                (window as any).viewHandler.viewModel.$refs.spin1.reset();
                (window as any).viewHandler.viewModel.$refs.spin2.reset();
            }

        } else if (name === 'RADIUS') {
            // 半径按整数拖动
            let dis = Math.hypot(x, y);
            dis = Math.round(dis / 10);
            dis = dis > 9 ? 9 : dis;
            thiz.changeRadius(dis, pos);
            (window as any).viewHandler.viewModel.$data.r = dis;
            if ((window as any).viewHandler.viewModel.$refs.spin3) {
                (window as any).viewHandler.viewModel.$refs.spin3.reset();
            }
        } else if (name === 'MOVE_LINE') {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            thiz.linePos = { x, y };
            thiz.lineGroup.position.set(x, y, 0);
            thiz.ctrlLinePoint.position.set(x, y, 2);
            thiz.calcRelation(thiz.circleGroupPos, thiz.linePos, thiz.line.rotation.z);
        } else if (name === 'ROTATE') {
            const { x: cx, y: cy } = thiz.linePos;
            const rad = Math.atan2(y, x);
            x = 60 * Math.cos(rad);
            y = 60 * Math.sin(rad);
            thiz.rotateLinePoint.position.set(x, y, 2);
            let angle = rad * 180 / Math.PI;
            angle = angle < 0 ? (360 + angle) : angle;
            angle = Math.round(angle);
            thiz.line.rotation.z = rad;
            thiz.calcRelation(thiz.circleGroupPos, thiz.linePos, thiz.line.rotation.z);
            if (angle === 90 || angle === 270) {
                (window as any).viewHandler.viewModel.$data.lineEquation = 'x=c';
            } else {
                (window as any).viewHandler.viewModel.$data.lineEquation = 'y=kx+b';
            }
        }
    }
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x, y: pos.y };
        this.circleGroup.position.set(pos.x, pos.y, 0);
        this.ctrlPoint.position.set(pos.x, pos.y, 0);
        thiz.calcRelation(thiz.circleGroupPos, thiz.linePos, thiz.line.rotation.z);
    }
    changeRadius(radius: any, pos ? : any) {
        if (radius === this.circle.scale.x && !pos) { return false; }
        this.radius = radius;
        const x = pos ? pos.x : this.ctrlPoint1.position.x;
        const y = pos ? pos.y : this.ctrlPoint1.position.y;
        const rad = Math.atan2(y, x);
        let angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        const radiusPosX = radius * 10 * Math.cos(angle / 180 * Math.PI);
        const radiusPosY = radius * 10 * Math.sin(angle / 180 * Math.PI);
        thiz.ctrlPoint1.position.set(radiusPosX, radiusPosY, 2);
        if (radius === 0) {
            thiz.circle.visible = false;
        } else {
            thiz.circle.visible = true;
            thiz.circle.scale.set(radius, radius, radius);
        }
        thiz.calcRelation(thiz.circleGroupPos, thiz.linePos, thiz.line.rotation.z);
    }

    calcRelation(posC: any, posL: any, rad: number) {
        let dis: number;
        // 根据两直线方程算出圆心到直线的垂足坐标
        if (rad * 180 / Math.PI !== 90) {
            const k = Math.tan(rad);
            const b = posL.y - posL.x * k;
            const k1 = -1 / k;
            const b1 = posC.y - posC.x * k1;
            this.corssPointPos.x = (b1 - b) / (k - k1);
            this.corssPointPos.y = k * this.corssPointPos.x + b;
            dis = Math.hypot(this.corssPointPos.x - posC.x, this.corssPointPos.y - posC.y);

        } else {
            this.corssPointPos.x = posL.x;
            this.corssPointPos.y = posC.y;
            dis = Math.abs(posL.x - posC.x);
        }
        dis = Math.round(dis * 10) / 100;
        (window as any).viewHandler.viewModel.$data.dis = dis;
        if (dis) {
            this.verticalLine.visible = this.textD.visible = true;
            this.verticalLine = common.scaleLine([this.corssPointPos.x, this.corssPointPos.y, 1], [posC.x, posC.y, 1], this.verticalLine);
            this.textD.position.set((this.corssPointPos.x - posC.x) / 2 + posC.x + 3, (this.corssPointPos.y - posC.y) / 2 + posC
                .y, 2);
        } else {
            this.verticalLine.visible = this.textD.visible = false;
        }
        // 判断关系
        if (dis > this.radius) {
            (window as any).viewHandler.viewModel.$data.pos = '相离';
            (window as any).viewHandler.viewModel.$data.count = 0;
            (window as any).viewHandler.viewModel.$data.delta = '<0';
        } else if (dis < this.radius) {
            (window as any).viewHandler.viewModel.$data.pos = '相交';
            (window as any).viewHandler.viewModel.$data.count = 2;
            (window as any).viewHandler.viewModel.$data.delta = '>0';
        } else if (dis === this.radius) {
            (window as any).viewHandler.viewModel.$data.pos = '相切';
            (window as any).viewHandler.viewModel.$data.count = 1;
            (window as any).viewHandler.viewModel.$data.delta = '=0';
        }

        //计算过圆心和点的直线交圆上点的坐标
        if (this.radius === 0) {
            this.pointLineForRadius.visible = this.textR.visible = false;
        } else {
            this.pointLineForRadius.visible = this.textR.visible = true;
            const factor = this.radius / dis;
            this.pointOnCircle.x = (this.corssPointPos.x - posC.x) * factor + posC.x;
            this.pointOnCircle.y = (this.corssPointPos.y - posC.y) * factor + posC.y;
            this.pointLineForRadius = common.scaleLine([this.circleGroupPos.x, this.circleGroupPos.y, 1], [this.pointOnCircle.x,
                this.pointOnCircle.y, 1
            ], this.pointLineForRadius);
            this.textR.position.set(
                (this.pointOnCircle.x - posC.x) / 2 + posC.x - 3,
                (this.pointOnCircle.y - posC.y) / 2 + posC.y + 10,
                2
            );
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
        this.linePos = { x: 40, y: 0 };
        Line3dModel.moveHandle({ x: this.linePos.x, y: this.linePos.y }, 'MOVE_LINE');
        Line3dModel.moveHandle({ x: 0, y: 60 }, 'ROTATE');
        setTimeout(()=>{
            this.ctrlPoint1.position.set(30, 0, 2);
        },20)
    }
}
