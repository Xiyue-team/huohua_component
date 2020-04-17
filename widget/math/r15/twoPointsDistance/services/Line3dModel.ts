import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {
    ThreeBase
} from '../../../../../src/three/template/ThreeBase';
// import {
//     ThreeUtil
// } from '../../../../../src/three/util/ThreeUtil';
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
// const dragcontrols = require('three-dragcontrols').default;

import {
    AxisUtil
} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/point.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    //定义直线
    private line = common.drawUnitLine({
        color: '#525252'
    });
    // 定义直角
    private rightAngle = common.drawRightAngle(3, { color: '#525252' });
    // 定义辅助线
    private subline: any;
    private subline1 = common.drawUnitLine({
        color: '#525252',

        isDash: true,
    });
    private subline2 = common.drawUnitLine({
        color: '#525252',
        isDash: true,
    });
    // 定义辅助线组
    private sublineGroup = new THREE.Group();
    private ctrlPointOne = common.createImg([-30, -50, 2], 20, 20, pointImg);
    private ctrlPointTwo = common.createImg([30, 20, 2], 20, 20, pointImg);
    private pointQPos = { x: -30, y: -50 };
    private pointPPos = { x: 30, y: 20 };
    private pointMPos = { x: 30, y: -50 };
    // 定义文字所需变量
    private textQ = common.createText('Q');
    private textM = common.createText('M');
    private textP = common.createText('P');
    private textQnumber: THREE.Mesh;
    private textPnumber: THREE.Mesh;
    private textMnumber: THREE.Mesh;
    private textQGroup = new THREE.Group();
    private textPGroup = new THREE.Group();
    private textMGroup = new THREE.Group();
    private render = () => {
        requestAnimationFrame(this.render);
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
        Line3dModel.moveHandle({ x: -30, y: -50 }, 'Q');
        Line3dModel.moveHandle({ x: 30, y: 20 }, 'P');
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
        this.ctrlPointOne.name = 'Q';
        this.ctrlPointTwo.name = 'P';
        this.textPGroup.add(this.textP);
        this.textQGroup.add(this.textQ);
        this.scene.add(this.line, this.ctrlPointOne, this.ctrlPointTwo, this.textPGroup, this.textQGroup);

        // 辅助线
        this.textMGroup.add(this.textM);
        this.sublineGroup.add(this.rightAngle, this.subline1, this.subline2, this.textMGroup);
        // this.sublineGroup.visible = false;
        this.scene.add(this.sublineGroup);
    }
    initEvt() {
        new SliderControlLine([this.ctrlPointOne,this.ctrlPointTwo]).initEvent(this.camera,this.renderer);
        // new SliderControlLine(this.ctrlPointTwo).initEvent(this.camera,this.renderer);
    }
    static downHandle(name:string) {

    }
    static moveHandle(pos: any, name: any): void {
        if (pos) {
            pos.x = Math.round(pos.x / 10) * 10;
            pos.y = Math.round(pos.y / 10) * 10;
            pos.x = pos.x < 90 ? pos.x < -90 ? -90 : pos.x : 90;
            pos.y = pos.y < 90 ? pos.y < -90 ? -90 : pos.y : 90;
        }
        if (name === 'P') {
            thiz.pointPPos = pos;
            thiz.ctrlPointTwo.position.set(pos.x, pos.y, 2);
            thiz.textPGroup.remove(thiz.textPnumber);
            thiz.textPnumber = common.createText(`( ${pos.x / 10}, ${pos.y / 10} )`, [13, 0, 0], { isItalic: false });
            thiz.textPGroup.add(thiz.textPnumber);
            thiz.textPGroup.position.set(pos.x + 10, pos.y + 10, 0);
        } else if (name === 'Q') {
            thiz.pointQPos = pos;
            thiz.ctrlPointOne.position.set(pos.x, pos.y, 2);

            thiz.textQGroup.remove(thiz.textQnumber);
            thiz.textQnumber = common.createText(`( ${pos.x / 10}, ${pos.y / 10} )`, [13, 0, 0], { isItalic: false });
            thiz.textQGroup.add(thiz.textQnumber);
            thiz.textQGroup.position.set(pos.x - 10, pos.y - 5, 0);
        }

        if (thiz.pointPPos.x === thiz.pointQPos.x && thiz.pointPPos.y === thiz.pointQPos.y) {
            thiz.line.visible = false;
            return;
        } else {
            thiz.line.visible = true;
            thiz.line = common.scaleLine([thiz.pointPPos.x, thiz.pointPPos.y, 1], [thiz.pointQPos.x, thiz.pointQPos.y, 1], thiz
                .line);
            thiz.drawSubline();
        }

    }
    showSubline(bool: boolean) {
        // this.sublineGroup.visible = bool;
    }
    drawSubline() {
        if (thiz.pointPPos.x === thiz.pointQPos.x || thiz.pointPPos.y === thiz.pointQPos.y) {
            this.subline1.visible = this.subline2.visible = this.rightAngle.visible = this.textMGroup.visible = false;
            return;
        }
        this.subline1.visible = this.subline2.visible = this.rightAngle.visible = this.textMGroup.visible = true;
        const x = this.pointPPos.x;
        const y = this.pointQPos.y;
        const { x: x1, y: y1 } = this.pointPPos;
        const { x: x2, y: y2 } = this.pointQPos;
        this.subline1 = common.scaleLine([this.pointPPos.x, this.pointPPos.y, 1], [x, y, 1], this.subline1);
        this.subline2 = common.scaleLine([this.pointQPos.x, this.pointQPos.y, 1], [x, y, 1], this.subline2);
        this.rightAngle.position.set(x, y, 0);

        thiz.textMGroup.remove(thiz.textMnumber);
        thiz.textMnumber = common.createText(`( ${x / 10}, ${y / 10} )`, [13, 0, 0], { isItalic: false });
        thiz.textMGroup.add(thiz.textMnumber);
        thiz.textMGroup.position.set(x, y - 3, 0);
        if (x1 > x2 && y1 > y2) {
            this.rightAngle.rotation.z = Math.PI / 2;
        } else if (x1 > x2 && y1 < y2) {
            this.rightAngle.rotation.z = Math.PI;
        } else if (x1 < x2 && y1 < y2) {
            this.rightAngle.rotation.z = -Math.PI / 2;
        } else if (x1 < x2 && y1 > y2) {
            this.rightAngle.rotation.z = 0;
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
        Line3dModel.moveHandle({ x: -30, y: -50 }, 'Q');
        Line3dModel.moveHandle({ x: 30, y: 20 }, 'P');
    }
}
