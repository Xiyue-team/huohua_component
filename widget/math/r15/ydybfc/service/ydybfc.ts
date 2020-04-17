import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {CircleLineUtils} from './CircleLineUtils';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {Utils} from './Utils';

OBJLoader(THREE);

export class Ydybfc extends ThreeBase {

    browserInfo: BrowserInfo;
    planeMesh: Mesh;
    private controls: any;
    private CircleLineUtil = new CircleLineUtils();
    private circleLine: any;
    private circlePoint: any;

    private render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);
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
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createAxis();
        this.createCircleDashLine(7, 3, 7);
        this.createCirclePoint(7, 3);


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

    //创建一个坐标系
    createAxis() {
        this.scene.add(AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
        } as any));
    }

    // 绘制圆形虚线
    createCircleDashLine(month: number, day: number, year: number) {
        const radius = 1 / 2 * Math.sqrt(Math.pow(month, 2) + Math.pow(day, 2) - 4 * year);
        if (this.circleLine !== null) {
            this.scene.remove(this.circleLine);
            this.circleLine = this.CircleLineUtil.addEllipseLine(radius * 10, '#000000', 1, Math.PI * 2);
        } else {
            this.circleLine = this.CircleLineUtil.addEllipseLine(radius * 10, '#000000', 1, Math.PI * 2);
        }
    }

    //绘制圆心
    createCirclePoint(month: number, day: number) {
        if (this.circlePoint != null) {
            this.scene.remove(this.circlePoint);
            this.circlePoint = Utils.createPoint(1, '#FF001F', -month * 10 / 2, -day * 10 / 2);
        } else {
            this.circlePoint = Utils.createPoint(1, '#FF001F', -month * 10 / 2, -day * 10 / 2);
        }
        this.circlePoint.add(this.circleLine);
        this.scene.add(this.circlePoint);
    }

    //移除圆
    removeCircle() {
        this.circlePoint.remove(this.circleLine);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    reset() {

    }

}




