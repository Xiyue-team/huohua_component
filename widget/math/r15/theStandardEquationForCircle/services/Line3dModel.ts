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
    private ctrlPoint1 = common.createImg([30, 0, 2], 20, 20, point1Img);
    private circle = common.createStrokeCircle(10);
    private circleGroup = new THREE.Group();
    private circleGroupPos = { x: 0, y: 0 };
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
        this.changePosByVue({ x: 1, y: 1 });
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
        this.scene.add(this.circleGroup);
        this.scene.add(this.ctrlPoint);
    }
    initEvt() {
        new SliderControlLine([this.ctrlPoint1, this.ctrlPoint]).initEvent(this.camera, this.renderer);
        // new SliderControlLine(this.ctrlPoint1, true).initEvent(this.camera, this.renderer);
    }
    static downHandle(name: string) {

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
        }

    }
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x * 10, y: pos.y * 10 };
        this.circleGroup.position.set(pos.x * 10, pos.y * 10, 0);
        this.ctrlPoint.position.set(pos.x * 10, pos.y * 10, 2);
    }
    changeRadius(radius: any, pos ? : any) {
        if (radius === this.circle.scale.x && !pos) { return false; }
        const x = pos ? pos.x : this.ctrlPoint1.position.x;
        const y = pos ? pos.y : this.ctrlPoint1.position.y;
        // const rad = Math.atan2(y - thiz.circleGroupPos.y, x - thiz.circleGroupPos.x);
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
    resetModelPosition() {}
}
