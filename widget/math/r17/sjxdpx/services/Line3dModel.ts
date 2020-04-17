import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import common from './CommonForThree';
import EsCenter from './EsCenter.ts';
import * as pointImg from '../sub_static/point.png';
OBJLoader(THREE);
let thiz: any = null;

export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private sliderControlLine: SliderControlLine;
    //4个控点，X：0：右顶点，1：上顶点, Y: 3:右顶点，4：上顶点
    private ctrlPoint = common.createImg([-0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0], 20, 20, pointImg);
    private count = 0;
    // 四个特殊三角形吸附点位置
    private keyPointArr = [{
        x: 0,
        y: 40 * Math.sqrt(3) - 30
    },
        {
            x: 0,
            y: 10
        },
        {
            x: -40,
            y: 20 * Math.sqrt(3) - 15
        },
        {
            x: 40,
            y: 20 * Math.sqrt(3) - 15
        }
    ];
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
    constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?: number) {
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
        this.initElement();
        this.initEvt();
        // this.initEvtY();
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
        this.camera = new PerspectiveCamera(55, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
    }

    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    // 初始化场景元素
    initElement() {
        this.ctrlPoint.name = 'A';
        this.scene.add(this.ctrlPoint);
        this.esCenter = new EsCenter(this.scene, this.ctrlPoint);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.ctrlPoint]).initEvent(this.camera, this.renderer);

    }

    // 获取拖动点坐标
    static downHandle(name: string) {

    }

    //移动A点位置
    static moveHandle(pos: any, name: string): void {
        if (name === 'A') {
            let {x, y} = pos;
            const res = thiz.keyPointArr.find(item => {
                return Math.hypot(item.x - x, item.y - y) < 5;
            });
            // 判断四个吸附点
            if (res) {
                ({x, y} = res);
            }
            // 限制A拖动范围
            x = x > 100 ? 100 : x < -100 ? -100 : x;
            y = y > 40 ? 40 : y < 10 ? 10 : y;
            thiz.ctrlPoint.position.set(x, y, 1);
        }
        thiz.esCenter.ctrlPointEvt({x: thiz.ctrlPoint.position.x, y: thiz.ctrlPoint.position.y, });
    }

    /**
     * 重置模型位置
     * **/
    // tslint:disable-next-line:member-ordering
    resetModelPosition() {
        this.esCenter.reset();
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
    initLight(): void {
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
