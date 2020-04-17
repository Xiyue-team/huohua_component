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
import * as pointImg1 from '../sub_static/01.png';
import * as pointImg2 from '../sub_static/02.png';
import InnerPoint from './InnerPoint';
import OuterPoint from './OuterPoint';
import Orthocenter from './Orthocenter';
import GravityPoint from './GravityPoint';

import common from './CommonForThree';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private sliderControlLine: SliderControlLine;
    //4个控点，X：0：右顶点，1：上顶点, Y: 3:右顶点，4：上顶点
    private ctrlPoint = common.createImg([-0, 40 * Math.tan(50 * Math.PI / 180) - 30, 1], 15, 15, pointImg);
    private count = 0;
    private text = THREE.Mesh;
    private group = new THREE.Group();

    private point = common.drawCircle(1, { color: '#000' });
    private pointArr = [{
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
        // this.createAxis();
        this.initElement();
        this.initEvt();
        // this.initEvtY();
        // this.preload();
        this.group.add(this.point);
        this.group.visible = false;
        this.scene.add(this.group);
        this.group.position.y = -6.9;
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
        this.camera = new PerspectiveCamera(35, (this.width) / (this.height), near, far);
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
        this.innerPoint = new InnerPoint(this.scene, this.ctrlPoint);
        this.outerPoint = new OuterPoint(this.scene, this.ctrlPoint);
        this.orthocenter = new Orthocenter(this.scene, this.ctrlPoint);
        this.gravityPoint = new GravityPoint(this.scene, this.ctrlPoint);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.ctrlPoint]).initEvent(this.camera, this.renderer);

    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        let { x, y } = pos;
        const res = thiz.pointArr.find(item => {
            return Math.hypot(item.x - x, item.y - y) < 5;
        })
        if (res) {
            ({ x, y } = res);
        }
        x = x > 90 ? 90 : x < -90 ? -90 : x;
        y = y > 45 ? 45 : y < 10 ? 10 : y;
        thiz.ctrlPoint.position.set(x, y, 1);

        thiz.innerPoint.ctrlPointEvt({ x: thiz.ctrlPoint.position.x, y: thiz.ctrlPoint.position.y });
        thiz.outerPoint.ctrlPointEvt({ x: thiz.ctrlPoint.position.x, y: thiz.ctrlPoint.position.y });
        thiz.orthocenter.ctrlPointEvt({ x: thiz.ctrlPoint.position.x, y: thiz.ctrlPoint.position.y });
        thiz.gravityPoint.ctrlPointEvt({ x: thiz.ctrlPoint.position.x, y: thiz.ctrlPoint.position.y });
        Line3dModel.chooseShowText();

    }
    static chooseShowText() {
        if ((window as any).viewHandler.viewModel.$data.triangleText === '等边三角形') {
            let str = Line3dModel.createPointText();
            if (str) {
                thiz.text = common.createText1(str, [str.length * 2, 4, 0]);
                thiz.group.add(thiz.text);
                thiz.group.visible = true;
                thiz.innerPoint.groupInnerPoint.visible = thiz.outerPoint.groupInnerPoint.visible = thiz.orthocenter.groupInnerPoint.visible =thiz.gravityPoint.groupInnerPoint.visible = false;
            } else {
                thiz.group.visible = false;

            }
        } else {
            thiz.group.visible = false;
            
            if ((window as any).viewHandler.viewModel.$data.active1) thiz.gravityPoint.groupInnerPoint.visible = true;
            if ((window as any).viewHandler.viewModel.$data.active2) thiz.innerPoint.groupInnerPoint.visible = true;
            if ((window as any).viewHandler.viewModel.$data.active3) thiz.outerPoint.groupInnerPoint.visible = true;
            if ((window as any).viewHandler.viewModel.$data.active4) thiz.orthocenter.groupInnerPoint.visible = true;
        }
    }
    static createPointText() {
        thiz.group.remove(thiz.text);
        let arr = [];
        if ((window as any).viewHandler.viewModel.$data.active5) {
            arr.push('O');
        }
        if ((window as any).viewHandler.viewModel.$data.active1) {
            arr.push('O1');
        }
        if ((window as any).viewHandler.viewModel.$data.active2) {
            arr.push('O2');
        }
        if ((window as any).viewHandler.viewModel.$data.active3) {
            arr.push('O3');
        }
        if ((window as any).viewHandler.viewModel.$data.active4) {
            arr.push('O4');
        }
        if (!arr.length) return '';
        let str = '';
        str += arr.shift();
        if (arr.length) {
            str += '(';
            str += arr.join(',');
            str += ')';
        }

        return str;
        // return arr;
    }
    /**
     * 重置模型位置
     * **/
    // tslint:disable-next-line:member-ordering
    resetModelPosition() {
        this.innerPoint.reset();
        this.outerPoint.reset();
        this.orthocenter.reset();
        this.gravityPoint.reset();
        Line3dModel.chooseShowText();
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

}