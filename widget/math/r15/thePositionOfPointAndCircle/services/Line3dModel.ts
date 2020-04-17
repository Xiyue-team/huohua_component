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
    private ctrlPoint = common.createImg([10, 10, 2], 20, 20, pointImg);
    private ctrlPoint1 = common.createImg([30, 0, 1], 20, 20, point1Img);
    private ctrlPointP = common.createImg([40, 40, 3], 20, 20, pointImg);
    private circle = common.createStrokeCircle(10);
    private circleGroup = new THREE.Group();
    private circleGroupPos = { x: 10, y: 10 };
    private pointOnCircle = { x: 0, y: 0 };
    private pointLine = common.drawUnitLine({
        color: '#000'
    });
    private pointLineForRadius = common.drawUnitLine({
        color: '#0199FF'
    });
    private radius: number = 3;
    private tangentLine1 = common.drawUnitLine({
        color: '#ccc'
    });
    private tangentLine2 = common.drawUnitLine({
        color: '#ccc'
    });
    private tangentLine3 = common.drawUnitLine({
        color: '#ccc'
    });
    private dragPoint: any;
    private dragPointP: any;
    private textR = common.createText('r', [0, 0, 0], { color: '#0199FF' });
    private textD = common.createText('d');
    private textP = common.createText('P');
    private text: THREE.Mesh;
    private textPGroup = new THREE.Group();
    private mouseDownGroupPos = { x: 10, y: 10 };
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
        Line3dModel.moveHandle({ x: 40, y: 40 }, 'P');
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
        this.ctrlPointP.name = 'P';
        this.circleGroup.add(this.ctrlPoint1, this.circle);
        this.circleGroup.position.set(10, 10, 0);

        this.textPGroup.add(this.textP);
        this.circle.scale.set(3, 3, 3);
        this.scene.add(
            this.circleGroup,
            this.ctrlPointP,
            this.pointLine,
            this.tangentLine1,
            this.tangentLine2,
            this.tangentLine3,
            this.pointLineForRadius,
            this.textR,
            this.textD,
            this.textPGroup,
            this.ctrlPoint
        );
    }
    initEvt() {
        new SliderControlLine([this.ctrlPoint1, this.ctrlPoint, this.ctrlPointP]).initEvent(this.camera, this.renderer);
        // new SliderControlLine(this.ctrlPoint1, true).initEvent(this.camera, this.renderer);
        // this.dragPointP = new SliderControlLine(this.ctrlPointP).initEvent(this.camera, this.renderer);
    }
    static downHandle(name: string) {
        if (name === 'RADIUS') {
            thiz.mouseDownGroupPos.x = thiz.circleGroup.position.x;
            thiz.mouseDownGroupPos.y = thiz.circleGroup.position.y;
        }
    }
    // 拖动点执行函数
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
            // let dis = Math.hypot(x - thiz.circleGroupPos.x, y - thiz.circleGroupPos.y);
            let dis = Math.hypot(x, y);
            dis = Math.round(dis / 10);
            dis = dis > 9 ? 9 : dis;
            thiz.changeRadius(dis, pos);
            (window as any).viewHandler.viewModel.$data.r = dis;
            if ((window as any).viewHandler.viewModel.$refs.spin3) {
                (window as any).viewHandler.viewModel.$refs.spin3.reset();
            }
        } else if (name === 'P') {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            thiz.ctrlPointP.position.set(x, y, 2);
            thiz.changePosByVue({ x: thiz.circleGroupPos.x, y: thiz.circleGroupPos.y });

            //P点文字
            thiz.textPGroup.remove(thiz.text);

            thiz.text = common.createText(`( ${x / 10}, ${y / 10} )`, [13, 0, 0], { isItalic: false });
            thiz.textPGroup.add(thiz.text);
            thiz.textPGroup.position.set(x + 10, y + 10, 0);
        }

    }

    //改变圆心和点坐标调用函数
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x, y: pos.y };
        this.circleGroup.position.set(pos.x, pos.y, 0);

        this.ctrlPoint.position.set(pos.x, pos.y, 2);
        if (thiz.circleGroupPos.x === thiz.ctrlPointP.position.x && thiz.circleGroupPos.y === thiz.ctrlPointP.position.y) {

            this.pointLine.visible = false;
        } else {
            thiz.pointLine = common.scaleLine(
                [thiz.circleGroupPos.x, thiz.circleGroupPos.y, 0], [thiz.ctrlPointP.position.x, thiz.ctrlPointP.position.y, 0],
                thiz.pointLine
            );
            this.pointLine.visible = true;
        }

        thiz.calcRelation(thiz.circleGroup.position, thiz.ctrlPointP.position, thiz.radius);
    }

    // 改变半径调用函数
    changeRadius(radius: any, pos ? : any) {
        if (radius === this.circle.scale.x && !pos) { return false; }
        this.radius = radius;
        const x = pos ? pos.x : this.ctrlPoint1.position.x;
        const y = pos ? pos.y : this.ctrlPoint1.position.y;
        // const rad = Math.atan2(y - thiz.circleGroupPos.y, x - thiz.circleGroupPos.x);
        const rad = Math.atan2(y, x);
        let angle = rad * 180 / Math.PI;
        angle = angle < 0 ? (360 + angle) : angle;
        const radiusPosX = radius * 10 * Math.cos(angle / 180 * Math.PI);
        const radiusPosY = radius * 10 * Math.sin(angle / 180 * Math.PI);
        // thiz.ctrlPoint1.position.set(this.mouseDownGroupPos.x + radiusPosX, this.mouseDownGroupPos.y + radiusPosY, 2);
        thiz.ctrlPoint1.position.set(radiusPosX, radiusPosY, 2);


        if (radius === 0) {
            thiz.circle.visible = false;
        } else {
            thiz.circle.visible = true;
            thiz.circle.scale.set(radius, radius, radius);
        }
        thiz.calcRelation(thiz.circleGroup.position, thiz.ctrlPointP.position, thiz.radius);
    }

    // 计算点与圆的位置关系
    calcRelation(posC: any, posP: any, radius: number) {
        const { x: cx, y: cy } = posC;
        const { x: px, y: py } = posP;
        let dis = Math.hypot(cx - px, cy - py);
        dis = Math.round(dis * 10) / 100;
        (window as any).viewHandler.viewModel.$data.dis = dis;
        if (dis > radius) {
            this.tangentLine3.visible = false;
            this.tangentLine1.visible = this.tangentLine2.visible = true;
            (window as any).viewHandler.viewModel.$data.pos = '点在圆外';
            (window as any).viewHandler.viewModel.$data.count = 2;
            this.drawTangentLineByOut(posC, posP, radius);
        } else if (dis < radius) {
            this.tangentLine3.visible = false;
            this.tangentLine1.visible = this.tangentLine2.visible = false;
            (window as any).viewHandler.viewModel.$data.pos = '点在圆内';
            (window as any).viewHandler.viewModel.$data.count = 0;
        } else {
            this.tangentLine3.visible = true;
            this.tangentLine1.visible = this.tangentLine2.visible = false;
            (window as any).viewHandler.viewModel.$data.pos = '点在圆上';
            (window as any).viewHandler.viewModel.$data.count = 1;
            this.drawTangentLineByOn(posC, posP, radius);
        }

        //计算过圆心和点的直线交圆上点的坐标
        if (radius === 0) {
            this.pointLineForRadius.visible = false;

        } else {
            const factor = radius / dis;
            this.pointOnCircle.x = (px - cx) * factor + cx;
            this.pointOnCircle.y = (py - cy) * factor + cy;
            this.pointLineForRadius = common.scaleLine([this.circleGroupPos.x, this.circleGroupPos.y, 1], [this.pointOnCircle.x,
                this.pointOnCircle.y, 1
            ], this.pointLineForRadius);
            this.pointLineForRadius.visible = true;
        }
        if (posC.x === posP.x && posC.y === posP.y) {
            this.textR.visible = this.textD.visible = false;
        } else {

            this.textR.visible = this.textD.visible = true;
            this.textR.position.set((this.pointOnCircle.x - cx) / 2 + cx - 3, (this.pointOnCircle.y - cy) / 2 + cy + 10, 2);
            this.textD.position.set((px - cx) / 2 + cx + 3, (py - cy) / 2 + cy, 2);
        }

    }

    // 点在圆外
    drawTangentLineByOut(posC: any, posP: any, radius: number) {
        const { x: cx, y: cy } = posC;
        const { x: px, y: py } = posP;
        const nx = px - cx;
        const ny = py - cy;
        const scaleT = radius * 10 / Math.sqrt(nx * nx + ny * ny);
        const corssPointPos = {} as any;
        corssPointPos.x = nx * scaleT;
        corssPointPos.y = ny * scaleT;
        const rad = Math.acos(scaleT);
        let contactP = {} as any;
        contactP.x = corssPointPos.x * Math.cos(rad) - corssPointPos.y * Math.sin(rad);
        contactP.y = corssPointPos.x * Math.sin(rad) + corssPointPos.y * Math.cos(rad);
        let contactP1 = {} as any;
        contactP1.x = corssPointPos.x * Math.cos(-rad) - corssPointPos.y * Math.sin(-rad);
        contactP1.y = corssPointPos.x * Math.sin(-rad) + corssPointPos.y * Math.cos(-rad);
        if (radius === 0) {
            this.tangentLine1.visible = this.tangentLine2.visible = false;
        } else {
            this.tangentLine1 = common.scaleLine([contactP.x + cx, contactP.y + cy, 0], [posP.x, posP.y, 0], this.tangentLine1,
                5);
            this.tangentLine2 = common.scaleLine([contactP1.x + cx, contactP1.y + cy, 0], [posP.x, posP.y, 0], this.tangentLine2,
                5);

            this.tangentLine1.visible = this.tangentLine2.visible = true;
        }
    }


    // 点在圆上
    drawTangentLineByOn(posC: any, posP: any, radius: number) {
        // 根据垂直定律求切线
        if (posC.y === posP.y) {
            this.tangentLine3 = common.scaleLine([posP.x, 100, 0], [posP.x, -100, 0], this.tangentLine3);
        } else {
            const k = -1 / (posP.y - posC.y) * (posP.x - posC.x);
            const b = posP.y - k * posP.x;
            const limitMinus = {} as any;
            const limitPlus = {} as any;
            limitMinus.x = -150;
            limitPlus.x = 150;
            limitMinus.y = k * limitMinus.x + b;
            limitPlus.y = k * limitPlus.x + b;
            if (radius === 0) {
                this.tangentLine3.visible = false;
            } else {

                this.tangentLine3 = common.scaleLine([limitMinus.x, limitMinus.y, 0], [limitPlus.x, limitPlus.y, 0], this.tangentLine3);
                this.tangentLine3.visible = true;
            }
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

        Line3dModel.moveHandle({ x: 40, y: 40 }, 'P');
        setTimeout(() => {
            this.ctrlPoint1.position.set(30, 0, 1);
        }, 20)
    }
}
