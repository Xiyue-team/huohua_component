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
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private sliderControlLine: SliderControlLine;
    private point = common.drawEllipseCurve(50, 30);
    private point1 = common.drawEllipseCurve(30, 50);
    //4个控点，X：0：右顶点，1：上顶点, Y: 3:右顶点，4：上顶点
    private ctrlPoint = common.createImg([50, 0, 2], 20, 20, pointImg);
    private ctrlPoint1 = common.createImg([0, 30, 2], 20, 20, pointImg);
    private ctrlPoint3 = common.createImg([30, 0, 2], 20, 20, pointImg);
    private ctrlPoint4 = common.createImg([0, 50, 2], 20, 20, pointImg);
    private circleGroup = new THREE.Group();
    private circleGroup1 = new THREE.Group();  
    private pointGroup = new THREE.Group();
    private count = 0;
    private textF1 = common.createImg([-40, -7, 2], 6, 8.4, pointImg1);
    private textF2 = common.createImg([40, -7, 2], 6, 8.4, pointImg2);
    private circle1 = common.drawCircle(1.2, {color: '#0199FF', position: [-40, 0, 2]});
    private circle2 = common.drawCircle(1.2, {color: '#0199FF', position: [40, 0, 2]});
    private textF1_1 = common.createImg([-6, 40, 2], 6, 8.4, pointImg1);
    private textF2_1 = common.createImg([-6, -40, 2], 6, 8.4, pointImg2);
    private circle1_1 = common.drawCircle(1.2, {color: '#0199FF', position: [0, 40, 2]});
    private circle2_1 = common.drawCircle(1.2, {color: '#0199FF', position: [0, -40, 2]});
    private a = common.createText('a', [-25, 25, 2], {color: '#0199FF'});
    private b = common.createText('b', [5, 15, 2], {color: '#D734FF '});
    private c = common.createText('c', [-20, 0, 2], {color: '#EC5D57'});
    private m = common.createText('M', [10, 40, 2], {color: '#1A1A1A'});
    private A = common.createText('A', [55, 0, 2], {color: '#1A1A1A'});
    private textF1Group = new THREE.Group();
    private textF2Group = new THREE.Group();
    private textF3Group = new THREE.Group();
    private textF4Group = new THREE.Group();
    private lineGroup = new THREE.Group();
    private letterGroup = new THREE.Group();

    private line_0 = common.drawUnitLine({
        color: '#0199FF',
        isDash: false,
    });
    private line1_1 = common.drawUnitLine({
        color: '#000000',
        isDash: true,
    });
    private line2_2 = common.drawUnitLine({
        color: '#EC5D57',
        isDash: false,
    });
    private line3_3 = common.drawUnitLine({
        color: '#0199FF',
        isDash: false,
    });
    private line4_4 = common.drawUnitLine({
        color: '#D734FF',
        isDash: false,
    });
    private line = common.scaleLine([-40, 0, 2], [0, 30, 0], this.line_0);
    private line1 = common.scaleLine([40, 0, 2], [0, 30, 0], this.line1_1);
    private line2 = common.scaleLine([-40, 0, 2], [0, 0, 0], this.line2_2);
    private line3 = common.scaleLine([50, 0, 2], [0, 0, 0], this.line3_3);
    private line4 = common.scaleLine([0, 30, 2], [0, 0, 0], this.line4_4);
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
    constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
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
        this.createAxis();
        this.initElement(this.controls);
        this.initEvt(); 
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
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.scene.add(Ax);
        Ax.position.z = -0.05;
    }
    // 初始化场景元素
    initElement(controls: any) {
        
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.ctrlPoint1, this.ctrlPoint, this.ctrlPoint3]).initEvent(this.camera, this.renderer);
            this.sliderControlLine = new SliderControlLine([this.ctrlPoint4]).initEvent(this.camera, this.renderer);
    }
    
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        let { x, y } = pos;
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;
        x = x < 90 ? x < -90 ? -90 : x : 90;
        y = y < 90 ? y < -90 ? -90 : y : 90;
    }

    //画线
    drawLine (pos: any, num: number) {
        const { x, y } = this.circle1.position;
        const { x: x1, y: y1 } = this.circle2.position;
        const {x: x2, y: y2} = this.ctrlPoint.position;
        const {x: x3, y: y3} = this.circle1_1.position;
        const {x: x4, y: y4} = this.circle2_1.position;
        const {x: x6, y: y6} = this.ctrlPoint4.position;
        if (num === 1) {
            this.line = common.scaleLine([x, y, 0], [pos.x, pos.y, 0], this.line_0);
            this.line1 = common.scaleLine([x1, y1, 0], [pos.x, pos.y, 0], this.line1_1);
            this.line2 = common.scaleLine([x, y, 0], [0, 0, 0], this.line2_2);
            this.line3 = common.scaleLine([x2, y2, 0], [0, 0, 0], this.line3_3);
            this.line4 = common.scaleLine([pos.x, pos.y, 0], [0, 0, 0], this.line4_4);
        } 
        if (num === 2) {
            this.line = common.scaleLine([x3, y3, 0], [pos.x, pos.y, 0], this.line1_1);
            this.line1 = common.scaleLine([x4, y4, 0], [pos.x, pos.y, 0], this.line_0);
            this.line2 = common.scaleLine([x4, y4, 0], [0, 0, 0], this.line2_2);
            this.line3 = common.scaleLine([x6, y6, 0], [0, 0, 0], this.line3_3);
            this.line4 = common.scaleLine([pos.x, pos.y, 0], [0, 0, 0], this.line4_4);
        }
        if (num === 3) {
            thiz.line = common.scaleLine([-40, 0, 2], [0, 30, 0], this.line_0);
            thiz.line1 = common.scaleLine([40, 0, 2], [0, 30, 0], this.line1_1);
            thiz.line2 = common.scaleLine([-40, 0, 2], [0, 0, 0], this.line2_2);
            thiz.line3 = common.scaleLine([50, 0, 2], [0, 0, 0], this.line3_3);
            thiz.line4 = common.scaleLine([0, 30, 2], [0, 0, 0], this.line4_4);
        }
    }
    // tslint:disable-next-line:member-ordering
     drawcircle(num: number) {
       if (num === 1) {
        this.point = common.drawEllipseCurve(50, 30);
       }
       if (num === 2) {
        this.point1 = common.drawEllipseCurve(30, 50);
       }
    }

//文本位置
    drawLetter (num: any) {
        const {x, y} = this.ctrlPoint.position;
        const {x: x1, y: y1} = this.ctrlPoint1.position;
        const {x: x2, y: y2} = this.ctrlPoint3.position;
        const {x: x3, y: y3} = this.ctrlPoint4.position;
        const {x: x4, y: y4} = this.circle1.position;
        const {x: x7, y: y7} = this.circle2_1.position;

        if (num === 1) {
            thiz.a.position.set((x4 / 2) - 5, (y1 / 2) + 7, 2);
            thiz.b.position.set(5, y1 / 2, 2);
            thiz.c.position.set(x4 / 2, 0, 2);
            thiz.m.position.set(10, y1 + 10, 2);
            thiz.A.position.set(x + 5, 0, 2);
        }

        if (num === 2) {
            thiz.a.position.set(x2 / 2, y7 / 2, 2);
            thiz.b.position.set(x2 / 2, 0, 2);
            thiz.c.position.set(-5, (y7 / 2) + 5, 2);
            thiz.m.position.set(x2 + 5, 13, 2);
            thiz.A.position.set(-7, y3 + 10, 2);
        }

        if (num === 3) {
            thiz.textF1.position.set(-Math.sqrt(Math.pow(thiz.ctrlPoint.position.x, 2) - Math.pow(thiz.ctrlPoint1.position.y, 2)), -7, 2);
            thiz.textF2.position.set(Math.sqrt(Math.pow(thiz.ctrlPoint.position.x, 2) - Math.pow(thiz.ctrlPoint1.position.y, 2)), -7, 2);
            thiz.circle1.position.set(-Math.sqrt(Math.pow(thiz.ctrlPoint.position.x, 2) - Math.pow(thiz.ctrlPoint1.position.y, 2)), 0, 2);
            thiz.circle2.position.set(Math.sqrt(Math.pow(thiz.ctrlPoint.position.x, 2) - Math.pow(thiz.ctrlPoint1.position.y, 2)), 0, 2);
        }

        if (num === 4) {
            thiz.textF1_1.position.set(
                -6, Math.sqrt(Math.pow(thiz.ctrlPoint4.position.y, 2) - Math.pow(thiz.ctrlPoint3.position.x, 2)), 2);
            thiz.textF2_1.position.set(
                -6, -Math.sqrt(Math.pow(thiz.ctrlPoint4.position.y, 2) - Math.pow(thiz.ctrlPoint3.position.x, 2)), 2);
            thiz.circle1_1.position.set(
                0, Math.sqrt(Math.pow(thiz.ctrlPoint4.position.y, 2) - Math.pow(thiz.ctrlPoint3.position.x, 2)), 2);
            thiz.circle2_1.position.set(
                0, -Math.sqrt(Math.pow(thiz.ctrlPoint4.position.y, 2) - Math.pow(thiz.ctrlPoint3.position.x, 2)), 2);
        }
    }
    /**
     * 重置模型位置
     * **/
    // tslint:disable-next-line:member-ordering
    resetModelPosition() {
        thiz.scene.remove(thiz.circle1_1, thiz.circle2_1);
        thiz.scene.remove(thiz.point, thiz.point1);
        thiz.point = common.drawEllipseCurve(50, 30);
        thiz.scene.add(thiz.point);
        
        thiz.drawLine({x: 0, y: thiz.ctrlPoint1.position.y}, 3);
        thiz.textF1.position.set(-40, -7, 2);
        thiz.textF2.position.set(40, -7, 2);
        thiz.ctrlPoint.position.set(50, 0 , 2);
        thiz.ctrlPoint1.position.set(0, 30, 2);
        thiz.circle1.position.set(-40, 0, 2);
        thiz.circle2.position.set(40, 0, 2);
        thiz.a.position.set(-25, 22, 2);
        thiz.b.position.set(5, 15, 2);
        thiz.c.position.set(-20, 0, 2);
        thiz.m.position.set(10, 40, 2);
        thiz.A.position.set(55, 0, 2);

        thiz.scene.add(thiz.textF1, thiz.textF2, thiz.ctrlPoint, thiz.ctrlPoint1, thiz.circle1, thiz.circle2);
        thiz.scene.remove(thiz.textF1_1, thiz.textF2_1, thiz.ctrlPoint3, thiz.ctrlPoint4);
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
