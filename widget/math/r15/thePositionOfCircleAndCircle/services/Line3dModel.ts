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
import * as r1 from '../sub_static/r1.png';
import * as r2 from '../sub_static/r2.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    //4个控制点，0：左圆心，1：左圆半径 2：右圆心， 3：右圆半径
    private ctrlPoint = common.createImg([10, 10, 2], 20, 20, pointImg);
    private ctrlPoint1 = common.createImg([-30, 0, 2], 20, 20, point1Img);
    private ctrlPoint2 = common.createImg([70, 10, 2], 20, 20, pointImg);
    private ctrlPoint3 = common.createImg([30, 0, 2], 20, 20, point1Img);
    private r1 = common.createImg([111, 0, 2], 6, 6, r1);
    private r2 = common.createImg([222, 0, 2], 6, 6, r2);
    private circle = common.createStrokeCircle(10);
    private circle2 = common.createStrokeCircle(10);
    private circleGroup = new THREE.Group();
    private circleGroup2 = new THREE.Group();
    private circleGroupPos = { x: 10, y: 10 };
    private circleGroupPos2 = { x: 70, y: 10 };
    private radius = 3;
    private radius2 = 3;
    private lineForDis = common.drawUnitLine({
        color: '#000'
    });
    private lineForRadius = common.drawUnitLine({
        color: '#0199FF',
        isDash: true,
    });
    private lineForRadius2 = common.drawUnitLine({
        color: '#FF4747',
        isDash: true,
    });
    private tangentLineOut1 = common.drawUnitLine({
        color: '#ccc'
    });
    private tangentLineOut2 = common.drawUnitLine({
        color: '#ccc'
    });
    private tangentLineIn1 = common.drawUnitLine({
        color: '#ccc'
    });
    private tangentLineIn2 = common.drawUnitLine({
        color: '#ccc'
    });
    private textD = common.createText('d');
    // 保存半径直线的圆上点坐标  方便两圆相切时候划切线
    private radiusPos: any;
    private radius2Pos: any;
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
    constructor(domElement: Element, fov ? : number, width ? : number, height ? : number, near ? : number, far ? :
        number) {
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
        this.changePosByVue({ x: 1, y: 1 });
        this.changePosByVue2({ x: 7, y: 1 });
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

        this.ctrlPoint2.name = 'CENTER2';
        this.ctrlPoint3.name = 'RADIUS2';
        this.circleGroup2.add(this.ctrlPoint3, this.circle2);
        this.circle2.scale.set(3, 3, 3);
        this.scene.add(this.circleGroup2, this.ctrlPoint2);

        // 距离连线和两个半径的连线
        this.scene.add(this.lineForDis, this.lineForRadius, this.lineForRadius2);

        // 公切线
        this.scene.add(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);

        this.scene.add(this.textD, this.r1, this.r2);

    }
    // 初始化拖动点
    initEvt() {
        new SliderControlLine([this.ctrlPoint1, this.ctrlPoint3, this.ctrlPoint, this.ctrlPoint2]).initEvent(this.camera,
            this.renderer);
        // new SliderControlLine(this.ctrlPoint1).initEvent(this.camera);
        // new SliderControlLine(this.ctrlPoint2).initEvent(this.camera);
        // new SliderControlLine(this.ctrlPoint3).initEvent(this.camera);
    }

    // 获取拖动点坐标
    static downHandle(name: string) {

    }
    static moveHandle(pos: any, name: string): void {
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
            thiz.radius = dis;
            thiz.changeRadius(dis, pos, 0);
            (window as any).viewHandler.viewModel.$data.r = dis;
            if ((window as any).viewHandler.viewModel.$refs.spin3) {
                (window as any).viewHandler.viewModel.$refs.spin3.reset();
            }
        } else if (name === 'CENTER2') {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            x = x < 90 ? x < -90 ? -90 : x : 90;
            y = y < 90 ? y < -90 ? -90 : y : 90;
            thiz.ctrlPoint2.position.set(x, y, 2);
            (window as any).viewHandler.viewModel.$data.a2 = -x / 10;
            (window as any).viewHandler.viewModel.$data.b2 = -y / 10;
            if ((window as any).viewHandler.viewModel.$refs.spin4) {
                (window as any).viewHandler.viewModel.$refs.spin4.reset();
                (window as any).viewHandler.viewModel.$refs.spin5.reset();
            }
        } else if (name === 'RADIUS2') {
            let dis = Math.hypot(x, y);
            dis = Math.round(dis / 10);
            dis = dis > 9 ? 9 : dis;
            thiz.radius2 = dis;
            thiz.changeRadius(dis, pos, 2);
            (window as any).viewHandler.viewModel.$data.r2 = dis;
            if ((window as any).viewHandler.viewModel.$refs.spin6) {
                (window as any).viewHandler.viewModel.$refs.spin6.reset();
            }
        }

    }

    // 改变左圆位置
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x * 10, y: pos.y * 10 };
        this.circleGroup.position.set(pos.x * 10, pos.y * 10, 0);
        this.ctrlPoint.position.set(pos.x*10, pos.y*10, 2);
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }

    // 改变右圆位置
    changePosByVue2(pos: any) {
        this.circleGroupPos2 = { x: pos.x * 10, y: pos.y * 10 };
        this.circleGroup2.position.set(pos.x * 10, pos.y * 10, 0);
        this.ctrlPoint2.position.set(pos.x*10, pos.y*10, 2);
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }

    // 改变半径
    changeRadius(radius: number, pos ? : any, num ? : number) {
        const circle = num ? this.circle2 : this.circle;
        if (radius === circle.scale.x && !pos) { return false; }
        const ctrlPoint = num ? this.ctrlPoint3 : this.ctrlPoint1;
        const circleGroupPos = num ? this.circleGroupPos2 : this.circleGroupPos;
        const x = pos ? pos.x : ctrlPoint.position.x;
        const y = pos ? pos.y : ctrlPoint.position.y;
        const rad = Math.atan2(y, x);
        let angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        const radiusPosX = radius * 10 * Math.cos(angle / 180 * Math.PI);
        const radiusPosY = radius * 10 * Math.sin(angle / 180 * Math.PI);
        ctrlPoint.position.set(radiusPosX, radiusPosY, 2);
        if (radius === 0) {
            circle.visible = false;
        } else {

            circle.visible = true;
            circle.scale.set(radius, radius, radius);
        }
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }

    drawLineForDisAndRadius(posC: any, posC2: any, radius: number, radius2: number) {
        const { x, y } = posC;
        const { x: x2, y: y2 } = posC2;

        // 圆心直线
        if (x === x2 && y === y2) {
            this.lineForDis.visible = false;
        } else {
            this.lineForDis.visible = true;
            this.lineForDis = common.scaleLine([x, y, 1], [x2, y2, 1], this.lineForDis);
        }

        let dis = Math.hypot(x - x2, y - y2);
        dis = Math.round(dis * 10) / 100;
        //画两个半径直线
        if (radius) {
            this.radiusPos = this.drawLineForRadius(posC, posC2, radius, this.lineForRadius);
            this.r1.position.set((this.radiusPos.x + x) / 2 + 3, (this.radiusPos.y + y) / 2 + 5, 1);
            this.r1.visible = true;
        } else {
            this.r1.visible = this.lineForRadius.visible = false;
        }

        if (radius2) {
            this.radius2Pos = this.drawLineForRadius(posC2, posC, radius2, this.lineForRadius2);

            this.r2.position.set((this.radius2Pos.x + x2) / 2 - 3, (this.radius2Pos.y + y2) / 2 - 5, 1);
            this.r2.visible = true;
        } else {
            this.r2.visible = this.lineForRadius2.visible = false;
        }
        this.drawTangentLine(posC, posC2, radius, radius2, dis);
    }
    drawLineForRadius(posC: any, posC2: any, radius: number, line: THREE.Mesh) {
        const { x, y } = posC;
        const { x: x2, y: y2 } = posC2;
        let dis = Math.hypot(x - x2, y - y2);
        dis = Math.round(dis * 10) / 100;
        line.visible = true;
        const factor = radius / dis;
        const corssPointPos = {} as any;
        corssPointPos.x = (x2 - x) * factor + x;
        corssPointPos.y = (y2 - y) * factor + y;
        line = common.scaleLine([x, y, 1], [corssPointPos.x, corssPointPos.y, 1], line);
        return corssPointPos;

    }
    // 画公切线的思路，算出内外公切线交点坐标https://donghaoren.org/blog/2009/circle-common-tangents
    // 根据点与圆的切线关系画出切线

    drawTangentLine(posC: any, posC2: any, radius: number, radius2: number, dis: number) {

        const k = (posC2.y - posC.y) / (posC2.x - posC.x);
        const rad = Math.atan(k);
        // 内公切线
        if (dis === (radius + radius2) || dis === Math.abs(radius - radius2)) {

            this.tangentLineIn2.visible = false;
            this.tangentLineIn1.scale.set(200, 1, 1);
            const radiusPos = radius > radius2 ? this.radiusPos : this.radius2Pos;
            this.tangentLineIn1.position.set(radiusPos.x, radiusPos.y, 0);
            this.tangentLineIn1.rotation.z = Math.PI / 2 + rad;
        } else {
            this.tangentLineIn2.visible = true;
            const corssInPoint = {} as any;
            corssInPoint.x = (radius * posC2.x + radius2 * posC.x) / (radius + radius2);
            corssInPoint.y = (radius * posC2.y + radius2 * posC.y) / (radius + radius2);
            const [contactP, contactP1] = this.calcTangencyPoint(posC, corssInPoint, radius);
            this.tangentLineIn1 = common.scaleLine([contactP.x + posC.x, contactP.y + posC.y, 0], [corssInPoint.x,
                corssInPoint.y, 0
            ], this.tangentLineIn1, 20);
            this.tangentLineIn2 = common.scaleLine([contactP1.x + posC.x, contactP1.y + posC.y, 0], [corssInPoint.x,
                corssInPoint.y, 0
            ], this.tangentLineIn2, 20);
        }

        // 外公切线
        if (dis === Math.abs(radius - radius2)) {
            this.tangentLineOut1.visible = this.tangentLineOut2.visible = false;
        } else {
            this.tangentLineOut1.visible = this.tangentLineOut2.visible = true;
            if (radius === radius2) {
                this.tangentLineOut1.scale.set(300, 1, 1);
                this.tangentLineOut2.scale.set(300, 1, 1);
                // // 算倾斜角
                this.tangentLineOut1.rotation.z = this.tangentLineOut2.rotation.z = rad;
                const offsetX = radius * 10 * Math.sin(rad);
                const offsetY = radius * 10 * Math.cos(rad);
                this.tangentLineOut1.position.x = (posC.x + posC2.x) / 2 - offsetX;
                this.tangentLineOut1.position.y = (posC.y + posC2.y) / 2 + offsetY;
                this.tangentLineOut2.position.x = (posC.x + posC2.x) / 2 + offsetX;
                this.tangentLineOut2.position.y = (posC.y + posC2.y) / 2 - offsetY;
            } else {
                const corssOutPoint = {} as any;
                corssOutPoint.x = (radius * posC2.x - radius2 * posC.x) / (radius - radius2);
                corssOutPoint.y = (radius * posC2.y - radius2 * posC.y) / (radius - radius2);
                const [contactP3, contactP4] = this.calcTangencyPoint(posC, corssOutPoint, radius);
                this.tangentLineOut1 = common.scaleLine([contactP3.x + posC.x, contactP3.y + posC.y, 0], [corssOutPoint
                    .x, corssOutPoint.y, 0
                ], this.tangentLineOut1, 20);
                this.tangentLineOut2 = common.scaleLine([contactP4.x + posC.x, contactP4.y + posC.y, 0], [corssOutPoint
                    .x,
                    corssOutPoint.y, 0
                ], this.tangentLineOut2, 20);
            }
        }
        this.calcRelation(posC, posC2, radius, radius2, dis);
    }
    calcRelation(posC: any, posC2: any, radius: number, radius2: number, dis: number) {
        if (radius === radius2 && posC.x === posC2.x && posC.y === posC2.y) {
            (window as any).viewHandler.viewModel.$data.pos = '同心圆';
            (window as any).viewHandler.viewModel.$data.count = '无数个';
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = '无数个';
        } else if (dis < Math.abs(radius - radius2)) {
            (window as any).viewHandler.viewModel.$data.pos = '内含';
            (window as any).viewHandler.viewModel.$data.count = 0;
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = 0;
        } else if (dis === Math.abs(radius - radius2)) {
            (window as any).viewHandler.viewModel.$data.pos = '内切';
            (window as any).viewHandler.viewModel.$data.count = 1;
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = 1;
        } else if (dis > Math.abs(radius - radius2) && dis < Math.abs(radius + radius2)) {
            (window as any).viewHandler.viewModel.$data.pos = '相交';
            (window as any).viewHandler.viewModel.$data.count = 2;
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = 2;
        } else if (dis === Math.abs(radius + radius2)) {
            (window as any).viewHandler.viewModel.$data.pos = '外切';
            (window as any).viewHandler.viewModel.$data.count = 1;
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = 3;
        } else if (dis > Math.abs(radius + radius2)) {
            (window as any).viewHandler.viewModel.$data.pos = '外离';
            (window as any).viewHandler.viewModel.$data.count = 0;
            (window as any).viewHandler.viewModel.$data.dis = dis;
            (window as any).viewHandler.viewModel.$data.lineCount = 4;
        }

        if (posC.x === posC2.x && posC.y === posC2.y) {
            this.textD.visible = false;
        } else {
            this.textD.visible = true;
            this.textD.position.set((posC.x + posC2.x) / 2, (posC.y + posC2.y) / 2, 1);
        }
    }

    // 计算点到圆的切线
    calcTangencyPoint(posC: any, corssPos: any, radius: number) {
        const { x: cx, y: cy } = posC;
        const { x: px, y: py } = corssPos;
        const nx = px - cx;
        const ny = py - cy;
        const scaleT = radius * 10 / Math.sqrt(nx * nx + ny * ny);
        const corssPointPos = {} as any;
        corssPointPos.x = nx * scaleT;
        corssPointPos.y = ny * scaleT;
        const rad = Math.acos(scaleT);
        const contactP = {} as any;
        contactP.x = corssPointPos.x * Math.cos(rad) - corssPointPos.y * Math.sin(rad);
        contactP.y = corssPointPos.x * Math.sin(rad) + corssPointPos.y * Math.cos(rad);
        const contactP1 = {} as any;
        contactP1.x = corssPointPos.x * Math.cos(-rad) - corssPointPos.y * Math.sin(-rad);
        contactP1.y = corssPointPos.x * Math.sin(-rad) + corssPointPos.y * Math.cos(-rad);
        return [
            contactP,
            contactP1,
        ];

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
        this.circleGroupPos = { x: 10, y: 10 };
        this.circleGroupPos2 = { x: 70, y: 10 };
        this.radius = 3;
        this.radius2 = 3;
        setTimeout(() => {
            this.ctrlPoint1.position.set(-30, 0, 2);
            this.ctrlPoint3.position.set(30, 0, 2);
            this.ctrlPoint.position.set(10, 10, 2);
            this.ctrlPoint2.position.set(70, 10, 2);
        }, 20);
    }
}
