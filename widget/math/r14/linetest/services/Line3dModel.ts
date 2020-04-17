import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import * as jiantou from '../sub_static/jiantou.png';
import * as l1 from '../sub_static/l1.png';
import * as l2 from '../sub_static/l2.png';
import {Utils} from './Utils';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from './SliderControlLine';

OBJLoader(THREE);

export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;

    //直线对象
    sliderControlLine1: SliderControlLine;
    sliderControlLine2: SliderControlLine;

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
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createAxis();
        this.initElement();
        this.preload();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();

    }

    preload() {
        console.log(jiantou);
        console.log(l1);
        console.log(l2);
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

        this.scene.add(AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']
        } as any));
    }

    initElement() {
        //直线1
        const angle = -53.13 * Math.PI / 180;
        const line1 = this.createLine();
        line1.rotateZ(angle);

        //直线2
        const line2 = this.createLine();

        //控制点
        const controlPoint1 = this.createControlPoint(0, 30);
         (controlPoint1.material as any).opacity = 1;
        controlPoint1.add(line1);


        const controlPoint2 = this.createControlPoint(20, 0);
        (controlPoint2.material as any).opacity = 1;
        controlPoint2.add(line2);

        //滑点1
        const sliderPoint1 = this.createSliderPoint(0, 80);
        line1.add(sliderPoint1);

        //滑点2
        const sliderPoint2 = this.createSliderPoint(0, 74);
        line2.add(sliderPoint2);

        //创建直线文字
        const lineText1 = Utils.createImg(4.16, 7, l1 as any, 6, 75);
        lineText1.rotateZ(5 * Math.PI / 18);
        line1.add(lineText1);


        const lineText2 = Utils.createImg(4.16, 7, l2 as any, -5, 65);
        line2.add(lineText2);

        this.sliderControlLine1 = new SliderControlLine(line1, sliderPoint1, controlPoint1);
        this.sliderControlLine2 = new SliderControlLine(line2, sliderPoint2, controlPoint2);

        this.initEvent();

    }


    //创建直线
    createLine() {

        const line = Utils.createLine1(-0.5, 500, 0.5, 500, -0.5, -500, 0.5, -500, '#0094FF');
        this.scene.add(line);
        return line;

    }

    //创建控制点
    createControlPoint(x: number, y: number) {

        const color = '#FF001F';
        const color1 = '#000000';
        const color2 = '#ffffff';
        const circle1 = Utils.createPoint1(2, color1, 0, 0);

        let controlPoint;

        //在安卓或苹果改变拖动范围
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {

            const identificationArea = Utils.createPoint(1.5, color, 0, 0, 1);
            identificationArea.position.z = 2;
            controlPoint = Utils.createPoint(2, color2, x, y, 1);

            identificationArea.add(circle1);
            circle1.position.z = -0.15;
            controlPoint.add(identificationArea);
        } else {

            controlPoint = Utils.createPoint(1.5, color, x, y, 1);
            circle1.position.z = -0.15;
            controlPoint.add(circle1);
        }
        this.scene.add(controlPoint);
        return controlPoint;
    }

    //创建滑点
    createSliderPoint(x: number, y: number) {

        const sliderPoint = Utils.createImg(20, 7, jiantou as any, x, y);
        const plane1 = Utils.createPlane(50, 50, 'red', 0);
        sliderPoint.add(plane1);
        this.scene.add(sliderPoint);
        return sliderPoint;
    }

    //创建直线文字
    createText() {

        const lineText1 = Utils.createImg(4.16, 7, l1 as any, 6, 75);
        lineText1.rotateZ(5 * Math.PI / 18);
        this.sliderControlLine1.line.add(lineText1);


        const lineText2 = Utils.createImg(4.16, 7, l2 as any, -5, 65);
        this.sliderControlLine2.line.add(lineText2);

    }

    //初始化事件
    initEvent() {

        this.sliderControlLine1.initEvent(this.camera, this.renderer, this.controls);
        this.sliderControlLine2.initEvent(this.camera, this.renderer, this.controls);

    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
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
    initLight(): void {

    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     *  重置模型位置
     */
    resetModelPosition() {

        this.sliderControlLine1.controlPoint.position.set(0, 30, 0);
        this.sliderControlLine2.controlPoint.position.set(20, 0, 0);

        this.sliderControlLine1.line.rotateZ(-this.sliderControlLine1.angle);
        this.sliderControlLine2.line.rotateZ(-this.sliderControlLine2.angle);

        this.sliderControlLine1.angle = 0;
        this.sliderControlLine2.angle = 0;
    }
}

