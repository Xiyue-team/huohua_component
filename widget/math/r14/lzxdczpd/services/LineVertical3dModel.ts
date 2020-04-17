import * as THREE from 'three';
import {
    DoubleSide,
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const dragcontrols = require('three-dragcontrols').default;
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import * as jiantou from '../sub_static/jiantou.png';
import * as l1 from '../sub_static/l1.png';
import * as l2 from '../sub_static/l2.png';
import {Utils} from './Utils';
import {LineVerticalConfig} from './LineVerticalConfig';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {LineObject} from './LineObject';
OBJLoader(THREE);
export class LineVertical3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;


    //直线对象
    lineObj1: LineObject;
    lineObj2: LineObject;

    //白板
    private identificationArea1: any;
    private identificationArea2: any;


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
        this.lineObj1 = new LineObject();
        this.lineObj2 = new LineObject();
        this.lineObj1.slope = Utils.getSlope1(this.lineObj1.angle, LineVerticalConfig.qxjAngle1);
        this.lineObj2.slope = Utils.getSlope1(this.lineObj2.angle, LineVerticalConfig.qxjAngle2);
        this.init();
    }

    init() {

        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createAxis();
        this.createLine();
        this.createSliderPoint();
        this.createArrow();
        this.createText();
        this.createArcLine();
        this.createJPoint();
        this.initSliderEvent();
        this.initArrowRotateEvent();
        this.initTouchArrowEvent();
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
        //创建一个坐标系
        const color = '#000000';
        let XAxis;
        let YAxis;
        let arrowX;
        let arrowY;
        let i;
        let j = -100;
        const group = new THREE.Group();
        //创建两个坐标轴
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            XAxis = Utils.createLine(210, 1.5, color);
            YAxis = Utils.createLine(1.5, 210, color);
            arrowX = Utils.createTriangle(105, 2, 105, -2, 115, 0, color);
            arrowY = Utils.createTriangle(2, 105, -2, 105, 0, 115, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.5, 4, color);
                const b = Utils.createLine(4, 0.5, color);
                a.position.set(j, 2, 0);
                b.position.set(2, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        } else {
            XAxis = Utils.createLine(210, 0.5, color);
            YAxis = Utils.createLine(0.5, 210, color);
            arrowX = Utils.createTriangle(105, 1.5, 105, -1.5, 111, 0, color);
            arrowY = Utils.createTriangle(1.5, 105, -1.5, 105, 0, 111, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.25, 2, color);
                const b = Utils.createLine(2, 0.25, color);
                a.position.set(j, 1, 0);
                b.position.set(1, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        }

        //创建坐标轴上的文字
        const textX = Utils.createText('x', 110, 0, 0, color);
        const textY = Utils.createText('y', -3, 115, 0, color);
        const textO = Utils.createText('O', -3.6, 0, 0, color);
        //X轴坐标
        const text1 = Utils.createNumber('1', 10, -2, 0, color);
        const text2 = Utils.createNumber('5', 50, -2, 0, color);
        const text3 = Utils.createNumber('10', 100, -2, 0, color);
        const text4 = Utils.createNumber('-1', -10, -2, 0, color);
        const text5 = Utils.createNumber('-5', -50, -2, 0, color);
        const text6 = Utils.createNumber('-10', -100, -2, 0, color);
        //Y轴坐标
        const text7 = Utils.createNumber('1', -4, 12, 0, color);
        const text8 = Utils.createNumber('5', -4, 52, 0, color);
        const text9 = Utils.createNumber('10', -5, 102, 0, color);
        const text10 = Utils.createNumber('-1', -4, -8, 0, color);
        const text11 = Utils.createNumber('-5', -4, -48, 0, color);
        const text12 = Utils.createNumber('-10', -5, -98, 0, color);

        group.add(textX);
        group.add(textY);
        group.add(XAxis);
        group.add(YAxis);
        group.add(arrowX);
        group.add(arrowY);
        group.add(textO);
        group.add(text1);
        group.add(text2);
        group.add(text3);
        group.add(text4);
        group.add(text5);
        group.add(text6);
        group.add(text7);
        group.add(text8);
        group.add(text9);
        group.add(text10);
        group.add(text11);
        group.add(text12);
        this.scene.add(group);
    }

    //创建滑点
    createSliderPoint() {

        const color = '#FF001F';
        const color1 = '#000000';
        const color2 = '#ffffff';
        const circle1 = Utils.createPoint1(2, color1, 0, 0);
        const circle2 = Utils.createPoint1(2, color1, 0, 0);

        //在安卓或苹果改变拖动范围
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            this.identificationArea1 = Utils.createPoint(1.5, color, 0, 0, 1);
            this.identificationArea2 = Utils.createPoint(1.5, color, 0, 0, 1);
            this.identificationArea1.position.z = 2;
            this.identificationArea2.position.z = 2;

            this.lineObj1.sliderPoint = this.lineObj1.createSliderPoint(8, 0, 30, color2, 0);
            this.lineObj2.sliderPoint = this.lineObj2.createSliderPoint(8, 20 , 0, color2, 0);


            this.identificationArea1.add(circle1);
            this.identificationArea2.add(circle2);
            circle1.position.z = -0.15;
            circle2.position.z = -0.15;

            this.lineObj1.sliderPoint.add(this.identificationArea1);
            this.lineObj2.sliderPoint.add(this.identificationArea2);
        } else {

            this.lineObj1.sliderPoint = this.lineObj1.createSliderPoint(1.5, 0, 30, color, 1);
            this.lineObj2.sliderPoint = this.lineObj2.createSliderPoint(1.5, 20 , 0, color, 1);

            circle1.position.z = -0.15;
            circle2.position.z = -0.15;

            this.lineObj1.sliderPoint.add(circle1);
            this.lineObj2.sliderPoint.add(circle2);
        }

        this.lineObj1.sliderPoint.add(this.lineObj1.line);
        this.scene.add(this.lineObj1.sliderPoint);
        // //滑块2
        this.lineObj2.sliderPoint.add(this.lineObj2.line);
        this.scene.add(this.lineObj2.sliderPoint);
    }

    //创建直线
    createLine() {

        const angle = -53.13 * Math.PI / 180;
        this.lineObj1.line =  this.lineObj1.createLine(angle, -0.5, 500, 0.5, 500, -0.5, -500, 0.5, -500, '#0094FF');
        this.scene.add(this.lineObj1.line);
        this.lineObj2.line = this.lineObj2.createLine(0, -0.5, 500, 0.5, 500, -0.5, -500, 0.5, -500, '#0094FF');
        this.scene.add(this.lineObj2.line);
    }

    //创建直线箭头
    createArrow() {

        this.lineObj1.arrowImg = this.lineObj1.createArrow(jiantou as any, 20, 7, 0, 80);
        this.lineObj1.line.add(this.lineObj1.arrowImg);

        this.lineObj2.arrowImg = this.lineObj2.createArrow(jiantou as any, 20, 7, 0, 74);
        this.lineObj2.line.add(this.lineObj2.arrowImg);
    }

    //创建直线文字
    createText() {

        this.lineObj1.lineText = Utils.createImg(4.16, 7 , l1 as any, 6, 75);
        this.lineObj1.lineText.rotateZ(5 * Math.PI / 18);
        this.lineObj1.line.add(this.lineObj1.lineText);

        this.lineObj2.lineText = Utils.createImg(4.16, 7 , l2 as any, -5, 65);
        this.lineObj2.line.add(this.lineObj2.lineText);
    }

    //创建圆弧
    createArcLine() {

        const arcGeometry = new THREE.CircleBufferGeometry(10, 32, 36.87 * Math.PI / 180, 53.13 * Math.PI / 180);
        const arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });
        const point = Utils.lineIntersection(this.lineObj1, this.lineObj2);
        LineObject.arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
        LineObject.arcLine.position.set(point.x, point.y, 0);
        this.scene.add(LineObject.arcLine);
    }

    //创建两条直线交点
    createJPoint() {
        this.lineObj1.createJPoint(this.lineObj1, this.lineObj2, this.scene);
    }

    //初始化滑块事件
    initSliderEvent() {
        this.lineObj1.initSlider1Event(this.camera, this.renderer, this.controls, this.lineObj1, this.lineObj2, this.scene, true);
        this.lineObj2.initSlider1Event(this.camera, this.renderer, this.controls, this.lineObj1, this.lineObj2, this.scene, false);
    }

    //初始化箭头图片旋转事件
    initArrowRotateEvent() {
        this.lineObj1.initArrowRotateEvent(this.scene, this.camera, true, LineVerticalConfig.qxjAngle1, this.lineObj1, this.lineObj2);
        this.lineObj2.initArrowRotateEvent(this.scene, this.camera, false, LineVerticalConfig.qxjAngle2, this.lineObj1, this.lineObj2);
    }

    //初始化箭头触摸事件
    initTouchArrowEvent() {
        this.lineObj1.initTouchArrow1Event(this.scene, this.camera, true, LineVerticalConfig.qxjAngle1, this.lineObj1, this.lineObj2);
        this.lineObj2.initTouchArrow1Event(this.scene, this.camera, false, LineVerticalConfig.qxjAngle2, this.lineObj1, this.lineObj2);

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
        //重置滑点位置
        this.lineObj1.sliderPoint.position.set(0, 30, 0);
        this.lineObj2.sliderPoint.position.set(20, 0, 0);

        //清除直角标志
        this.lineObj1.removeRightAngle(this.scene);
        //重置直线旋转角度
        this.lineObj1.line.rotateZ(-this.lineObj1.angle);
        this.lineObj2.line.rotateZ(-this.lineObj2.angle);

        //重置旋转角
        this.lineObj1.angle = 0;
        this.lineObj2.angle = 0;

        //重置倾斜角
        this.lineObj1.slope = Utils.getSlope1(this.lineObj1.angle, LineVerticalConfig.qxjAngle1);
        this.lineObj2.slope = Utils.getSlope1(this.lineObj2.angle, LineVerticalConfig.qxjAngle2);

        //重置圆弧
        if (LineObject.arcLine && LineObject.arcLine != null) {
            this.lineObj1.removeArcLine(this.scene);
            this.createArcLine();
        }

        //重置文字图片位置
        this.lineObj1.lineText.rotation.z = 5 * Math.PI / 18;
        this.lineObj2.lineText.rotation.z = 0;

        //重置交点位置
        const point = Utils.lineIntersection(this.lineObj1, this.lineObj2);
        LineObject.jpoint.position.set(point.x, point.y, 0);
    }
}

