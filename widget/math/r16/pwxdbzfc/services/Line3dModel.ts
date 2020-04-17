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
import * as imgx from '../sub_static/texturex.png';
import * as imgx1 from '../sub_static/texturex1.png';
import * as imgy from '../sub_static/texturey.png';
import * as imgy1 from '../sub_static/texturey1.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private ctrlPoint = common.createImg([10, 0, 2], 20, 20, pointImg);
    private ctrlPoint1 = common.createImg([10, 0, 2], 20, 20, pointImg);
    private textureX = common.createImg([135, 0, 0], 40, 20, imgx);
    private textureY = common.createImg([-30, 100, 0], 40, 20, imgy1);
    private directrixLine = common.drawUnitLine({
        color: '#EC5D57',
    });
    private subline1 = common.drawUnitLine({
        color: '#0199FF',
    });
    private subline2 = common.drawUnitLine({
        color: '#0199FF',
    });
    private lineP = common.drawUnitLine({
        color: '#D96C00'
    })
    private foucsAxis = 'X';
    private foucsPos = 10;
    private preFoucsPos = 0;
    private parabola: THREE.Mesh;
    private count = 0;
    private rightAngle = common.drawRightAngle(2, {
        color: '#0199ff'
    });
    // 文字
    private textFGroup = new THREE.Group();
    private textF = common.createText('F', [0, 0, 0]);
    private textp = common.createText('p', [-3, 8, 0]);
    private textEq: THREE.Mesh;
    private textEqGroup = new THREE.Group();
    private textEqNumber: THREE.Mesh;
    private textFNumber: THREE.Mesh;
    private textZ: THREE.Mesh;
    private textZNumber: THREE.Mesh;
    private textZGroup = new THREE.Group();
    private textP = common.createText('P');
    private textPNumber: THREE.Mesh;
    private textPGroup = new THREE.Group();
    private texturex = new THREE.TextureLoader().load(imgx);
    private texturex1 = new THREE.TextureLoader().load(imgx1);
    private texturey = new THREE.TextureLoader().load(imgy);
    private texturey1 = new THREE.TextureLoader().load(imgy1);
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
        // this.preload();
        this.drawParabola(10);
        Line3dModel.moveHandle({ x: 10, y: 0 }, 'F');
        Line3dModel.moveHandle({ x: 10, y: 20 }, 'P');
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
        this.ctrlPoint.name = 'F';
        this.ctrlPoint1.name = 'P';
        this.textureY.name = 'Y';
        this.textureX.name = 'X';
        this.scene.add(this.ctrlPoint, this.ctrlPoint1);
        this.directrixLine.scale.set(105, 1, 1);
        this.scene.add(this.directrixLine, this.subline1, this.subline2, this.lineP);
        this.scene.add(this.textureX, this.textureY);
        this.scene.add(this.rightAngle);
        this.textFGroup.add(this.textF);
        this.textPGroup.add(this.textP);
        this.scene.add(this.textFGroup, this.textp, this.textEqGroup, this.textZGroup, this.textPGroup);


    }
    initEvt() {
        new SliderControlLine([this.ctrlPoint, this.ctrlPoint1, this.textureX, this.textureY]).initEvent(this.camera, this.renderer);
    }
    changeFoucsAxis(name: string) {
        if (this.foucsAxis === name) return;
        console.log(this.textureX.position);
        if (name === 'X') {
            this.textureX.material.map = this.texturex;
            this.textureY.material.map = this.texturey1;

        } else {
            this.textureX.material.map = this.texturex1;
            this.textureY.material.map = this.texturey;
        }
        this.foucsAxis = name;
        this.preFoucsPos = -1;
        Line3dModel.moveHandle({ x: 10, y: 10 }, 'F');
        Line3dModel.moveHandle({ x: 20, y: 20 }, 'P');
    }
    drawParabola(foucs: number) {
        this.scene.remove(this.parabola);
        this.textEqGroup.remove(this.textEqNumber, this.textEq);
        let pointArr = [];
        let x: number;
        let y: number;
        let a = foucs * 4;
        if (this.foucsAxis === 'X') {
            for (let i = 0; i < 110; i++) {
                y = Math.sqrt(Math.abs(a * i));
                x = a > 0 ? i : -i;
                pointArr.push({ x: x, y: y, z: 0 });
                pointArr.push({ x: x, y: -y, z: 0 });
            }
            pointArr.sort((a, b) => {
                return a.y - b.y;
            })
        } else {
            for (let i = 0; i < 110; i++) {
                x = Math.sqrt(Math.abs(a * i));
                y = a > 0 ? i : -i;
                pointArr.push({ x: x, y: y, z: 0 });
                pointArr.push({ x: -x, y: y, z: 0 });
            }
            pointArr.sort((a, b) => {
                return a.x - b.x;
            })
        }
        let limit = Math.sqrt(Math.abs(thiz.foucsPos * 100 * 4));
        limit = limit > 100 ? 100 : limit;
        if (thiz.foucsAxis === 'X') {
            y = limit;
            x = y * y / 4 / this.foucsPos;
            this.textEq = common.createText('y² =      x', [0, 0, 0]);
        } else {
            x = limit;
            y = x * x / 4 / this.foucsPos;
            this.textEq = common.createText('x² =      y', [0, 0, 0]);
        }
        this.textEqGroup.position.set(x + 5, y - 5, 0);
        this.textEqNumber = common.createText(`${this.foucsPos*4/10}`, [4, -1, 0], { isItalic: false, size: 36 });
        this.textEqGroup.add(this.textEqNumber, this.textEq);
        this.parabola = common.drawDashOrLine(pointArr);
        this.scene.add(this.parabola);
    }
    changePointPos(pos: any, foucsPos: number, foucsAxis: string) {
        this.textPGroup.remove(this.textPNumber);

        let limit = Math.sqrt(Math.abs(thiz.foucsPos * 100 * 4));
        limit = limit > 100 ? 100 : limit;
        let { x, y } = pos;
        if (foucsAxis === 'X') {
            y = y < limit ? y < -limit ? -limit : y : limit;
            x = y * y / 4 / foucsPos;
            if (foucsPos > 0) {

                thiz.textureY.position.set(-30, 100, 0);
            } else {
                thiz.textureY.position.set(30, 100, 0);
            }
        } else {
            x = x < limit ? x < -limit ? -limit : x : limit;
            y = x * x / 4 / foucsPos;
        }
        this.ctrlPoint1.position.set(x, y, 2);
        let str = `(${parseFloat((x / 10).toFixed(2))}, ${parseFloat((y / 10).toFixed(2))})`;
        this.textPNumber = common.createText(str, [0, 0, 0], { isItalic: false });
        let length = str.length;
        this.textP.position.x = length > 12 ? -20 : length > 8 ? -15 : -10;
        this.textPGroup.add(this.textPNumber);
        this.textPGroup.position.set(x + 15, y, 2);

        this.changeSubline({ x, y }, foucsPos, foucsAxis);
    }
    changeSubline(posP: any, foucsPos: number, foucsAxis: string) {
        const x = foucsAxis === 'X' ? foucsPos : 0;
        const y = foucsAxis === 'X' ? 0 : foucsPos;
        const x1 = foucsAxis === 'X' ? -foucsPos : posP.x;
        const y1 = foucsAxis === 'X' ? posP.y : -foucsPos;
        this.subline1 = common.scaleLine([posP.x, posP.y, 0], [x, y, 0], this.subline1);
        this.subline2 = common.scaleLine([posP.x, posP.y, 0], [x1, y1, 0], this.subline2);
        this.rightAngle.position.set(x1, y1, 0);
        if (foucsAxis === 'X' && foucsPos < 0) {
            this.rightAngle.rotation.z = Math.PI / 2;
        } else if (foucsAxis === 'Y' && foucsPos < 0) {
            this.rightAngle.rotation.z = -Math.PI / 2;
        } else {
            this.rightAngle.rotation.z = 0;
        }
    }
    static downHandle(name: string) {

    }
    static moveHandle(pos: any, name: any): void {
        let { x, y } = pos;
        let x1: number;
        if (name === 'F') {

            const bool = thiz.foucsAxis === 'X';
            let num = thiz.foucsAxis === 'X' ? x : y;
            let num1: number;
            num = Math.round(num / 10) * 10;
            num1 = Math.abs(num) < 100 ? Math.abs(num) > 10 ? Math.abs(num) : 10 : 100;
            num1 = num < 0 ? -num1 : num1;


            if (thiz.foucsAxis === 'X') {
                thiz.ctrlPoint.position.set(num1, 0, 2);
            } else {
                thiz.ctrlPoint.position.set(0, num1, 2);
            }
            if (num === thiz.preFoucsPos) {
                return;
            }
            thiz.textFGroup.remove(thiz.textFNumber);
            thiz.textZGroup.remove(thiz.textZ, thiz.textZNumber);
            const posX = thiz.foucsAxis === 'X' ? num1 : 0;
            const posY = thiz.foucsAxis !== 'X' ? num1 : 0;
            thiz.lineP = common.scaleLine([posX, posY, 2], [-posX, -posY, 2], thiz.lineP);
            thiz.directrixLine.rotation.z = thiz.foucsAxis === 'X' ? Math.PI / 2 : 0;
            thiz.directrixLine.position.set(-posX, -posY, 1);
            thiz.textFNumber = common.createText(`(${posX / 10}, ${posY/10})`, [10, 0, 0], { isItalic: false });
            thiz.textFGroup.add(thiz.textFNumber);
            thiz.textFGroup.position.set(bool ? posX : (posX + 5), bool ? (posY - 5) : (posY + 10), 0);
            thiz.textZ = common.createText(`${bool?'x=':'y='}`);
            thiz.textZNumber = common.createText(`${-num1/10}`, [7, 0, 0], { isItalic: false });
            thiz.textZGroup.add(thiz.textZ, thiz.textZNumber);

            thiz.textZGroup.position.set(bool ? (-posX - 10) : 50, bool ? -50 : -posY, 0);
            thiz.preFoucsPos = num1;
            thiz.foucsPos = num1;
            thiz.drawParabola(num1);
            thiz.changePointPos({ x: num1, y: num1 }, thiz.foucsPos, thiz.foucsAxis);
        } else if (name === 'P') {
            thiz.changePointPos(pos, thiz.foucsPos, thiz.foucsAxis);
        } else if (name === 'X') {
            thiz.textureX.position.set(135, 0, 0);
        } else if (name === 'Y') {
            if (thiz.foucsPos > 0) {

                thiz.textureY.position.set(-30, 100, 0);
            } else {
                thiz.textureY.position.set(30, 100, 0);
            }
        }
    }
    static upHandle(name: any): void {
        if (name === 'Y' || name === 'X') {
            thiz.changeFoucsAxis(name);
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
        this.foucsAxis = 'X';

        this.preFoucsPos = -1;
        this.textureX.material.map = this.texturex;
        this.textureY.material.map = this.texturey1;
        Line3dModel.moveHandle({ x: 10, y: 0 }, 'F');
        Line3dModel.moveHandle({ x: 10, y: 20 }, 'P');

    }
}
