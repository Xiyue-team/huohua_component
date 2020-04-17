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
import * as pointImg from '../sub_static/UI/point2.png';
import * as point1Img from '../sub_static/UI/point1.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    sliderControlLine: SliderControlLine;
    private controls: any;
    private ctrlPoint = common.createImg([10, 10, 2], 10, 10, pointImg);
    private ctrlPoint1 = common.createImg([30, 0, 1], 10, 10, point1Img);
    private ctrlPointP = common.createImg([80, 40, 4], 10, 10, point1Img);
    private circle = common.createStrokeCircle(10);
    private circleGroup = new THREE.Group();
    // private circlebox = new THREE.Group()
    private circleGroupPos = { x: 40, y: 40 };
    private pointOnCircle = { x: 0, y: 0 };
    private pointLine = common.drawUnitLine({
        color: '#ffd621',
        isDash: true
    });
    // private pointLineForRadius = common.drawUnitLine({
    //      color: '#000' 
    // });
    private radius = 3;
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
    private textR = common.createText('M', [0, 0, 0], { color: '#0199FF' });
    private textD = common.createText('d', [0, 0, 0], { color: '#ffd621' });
    private textP = common.createText('P', [0, 0, 0], { color: '#FF5A5A' });
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
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
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
        this.moveHandle({ x: 70, y: 40 }, 'P');
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2C2C2C);
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
        const num = AxisUtil.createAxis({
            isTicks: true, AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''], axisColor: '#6F6F6F',
            fontColor: '#6F6F6F'
        } as any);
        num.position.set(-300, 0, 0);
        console.log(num.position);
        this.scene.add(AxisUtil.createAxis({
            isTicks: true, AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''], axisColor: '#6F6F6F',
            fontColor: '#6F6F6F'
        } as any))
    }
    initHyperbola() {
        if (document.documentElement.clientWidth <= 1536 && document.documentElement.clientWidth >= 1027) {
            this.camera.position.set(0, 0, 330);
        } else if (document.documentElement.clientWidth == 1024) {
            this.camera.position.set(0, 0, 360);
        } else if (document.documentElement.clientWidth <= 818) {
           
            this.camera.position.set(0, 0, 350);
        }
        if (document.documentElement.clientHeight == 534) {
            this.camera.position.set(0, 0, 350);
        }
    }
    // 初始化场景元素
    initElement(controls: any) {
        this.ctrlPoint.name = 'CENTER';
        this.ctrlPoint1.name = 'RADIUS';
        this.ctrlPointP.name = 'P';
        this.circleGroup.add(this.circle);
        this.circleGroup.position.set(10, 10, 0);
        this.textPGroup.add(this.textP);
        this.initHyperbola();
        this.circle.scale.set(3, 3, 3);
        this.scene.add(
            this.circleGroup,
            // 拖动圆
            this.ctrlPointP,
            // d线
            this.pointLine,
            this.textR,
            this.textD,
            this.textPGroup,
            this.ctrlPoint
        );
        this.scene.position.set(-110, 0, 0);
    }
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint, this.ctrlPointP]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }
    downHandle(name: string) {
        if (name === 'RADIUS') {
            thiz.mouseDownGroupPos.x = thiz.circleGroup.position.x;
            thiz.mouseDownGroupPos.y = thiz.circleGroup.position.y;
        }
    }
    // 拖动点执行函数
    moveHandle(pos: any, name: any): void {
        let { x, y } = pos;
        if (name === 'CENTER') {
            x = x < 50 ? x < -50 ? -50 : x : 50;
            y = y < 50 ? y < -50 ? -50 : y : 50;
            thiz.changePosByVue({ x: x, y: y });
            (window as any).viewHandler.viewModel.$data.a = -x / 10;
            (window as any).viewHandler.viewModel.$data.b = -y / 10;
            if ((window as any).viewHandler.viewModel.$refs.spin1) {
                (window as any).viewHandler.viewModel.$refs.spin1.reset();
                (window as any).viewHandler.viewModel.$refs.spin2.reset();
            }
        } else if (name === 'P') {
            x = x < 100 ? x < -100 ? -100 : x : 100;
            y = y < 100 ? y < -100 ? -100 : y : 100;
            thiz.ctrlPointP.position.set(x, y, 2);
            thiz.changePosByVue({ x: thiz.circleGroupPos.x, y: thiz.circleGroupPos.y });
            //P点文字
            thiz.textPGroup.remove(thiz.text);
            thiz.textPGroup.position.set(x + 10, y + 5, 0);
        }
    }
    //改变圆心和点坐标调用函数
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x, y: pos.y };
        this.circleGroup.position.set(pos.x, pos.y, 0);
        this.textR.position.set(pos.x, pos.y + 13, 2);
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
    changeRadius(radius: any) {
        this.radius = radius;
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
        dis = Number(dis.toFixed(1));
        (window as any).viewHandler.viewModel.$data.dis = dis;
        
        // let adsorb = Math.abs(dis - radius);
        // adsorb <= 2 ? dis = radius : dis = dis;
        // console.log(adsorb);
        if (dis > radius) {
            this.tangentLine3.visible = false;
            this.tangentLine1.visible = this.tangentLine2.visible = true;
            (window as any).viewHandler.viewModel.$data.pos = (window as any).viewHandler.viewModel.$data.btn1;
            (window as any).viewHandler.viewModel.$data.count = 2;
            this.drawTangentLineByOut(posC, posP, radius);
        } else if (dis < radius) {
            this.tangentLine3.visible = false;
            this.tangentLine1.visible = this.tangentLine2.visible = false;
            (window as any).viewHandler.viewModel.$data.pos = (window as any).viewHandler.viewModel.$data.btn2;
            (window as any).viewHandler.viewModel.$data.count = 0;
        } else {
            this.tangentLine3.visible = true;
            this.tangentLine1.visible = this.tangentLine2.visible = false;
            (window as any).viewHandler.viewModel.$data.pos = (window as any).viewHandler.viewModel.$data.btn3;
            (window as any).viewHandler.viewModel.$data.count = 1;
            this.drawTangentLineByOn(posC, posP, radius);
        }

        //计算过圆心和点的直线交圆上点的坐标
        if (radius === 0) {
        } else {
            const factor = radius / dis;
            this.pointOnCircle.x = (px - cx) * factor + cx;
            this.pointOnCircle.y = (py - cy) * factor + cy;
        }
        if (posC.x === posP.x && posC.y === posP.y) {
            // this.textR.visible = this.textD.visible = false;
        } else {
            // this.textR.visible = this.textD.visible = true;
            // this.textR.position.set((this.pointOnCircle.x - cx) / 2 + cx - 3, (this.pointOnCircle.y - cy) / 2 + cy + 10, 2);
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
        const contactP = {} as any;
        contactP.x = corssPointPos.x * Math.cos(rad) - corssPointPos.y * Math.sin(rad);
        contactP.y = corssPointPos.x * Math.sin(rad) + corssPointPos.y * Math.cos(rad);
        const contactP1 = {} as any;
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
    initLight(): void { }
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    /**
     *  重置模型位置
     */
    resetModelPosition() {
        this.circle.scale.set(3, 3, 3);
        this.circleGroupPos = { x: 40, y: 40 };
        this.moveHandle({ x: 70, y: 40 }, 'P');
        setTimeout(() => {
            this.ctrlPoint1.position.set(45, 45, 1);
        }, 20);
    }
}
