import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
import * as tipImg1 from '../sub_static/UI/xielv1.png';
import * as tipImg2 from '../sub_static/UI/xielv2.png';
import * as tipImg3 from '../sub_static/UI/xielv3.png';
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    private ctrlPointY = common.createImg([0, 80, 2], 20, 20, pointImg);
    private ctrlPointX = common.createImg([80, 0, 2], 20, 20, pointImg);
    private sliderControlLine: SliderControlLine;
    // 添加初始界面三角形三条边
    private line_x = common.drawUnitLine({width : 1.3, color: '#F5A623', isDash: false, });
    private line_y = common.drawUnitLine({width : 1.3, color: '#FF4747', isDash: false, });
    private line_xb = common.drawUnitLine({width : 1.3, color: '#000000', isDash: false, });
    private lineX = common.scaleLine([0, 0, 0], [80, 0, 0], this.line_x);
    private lineY = common.scaleLine([0, -0.75, 0], [0, 80, 0], this.line_y);
    private lineXb = common.scaleLine([80, 0, 0], [0, 80, 0], this.line_xb);
    private text1 = common.createText('铅锤高度', [-20, 45, 0], {color: '#FF4747', isItalic: false});
    private text2 = common.createText('水平长度', [40, -10, 0], {color: '#F5A623', isItalic: false});
    private Ax: any;
    angle: number;
    private angleA: any;
    private angleB: any;
    private count = 0;
    private controls: any;
    private lineGroup = new THREE.Group();
    browserInfo: BrowserInfo;
    private render = () => {
        requestAnimationFrame(this.render);

        if (this.count !== 0) {
            this.count = ++this.count % 3;
            return;
        } else {
            this.count = ++this.count % 3;
        }
        // this.controls.update();
        this.renderer.render(this.scene, this.camera);
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
        this.init();
    }

    init(): void {
        thiz = this;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.tbctrl();
        this.initElement(this.controls);
        this.createAxis();
        this.initEvt();
        this.drawAngle();
        console.warn = function () {
        };
    }

    initScene(): void {
        this.scene = new THREE.Scene();
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
    resetCamera(): void {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
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
    // 初始化场景内元素
    initElement(controls: any) {
        this.ctrlPointX.name = 'PointX';
        this.ctrlPointY.name = 'PointY';
        this.lineGroup.add(this.ctrlPointX, this.ctrlPointY, this.ctrlPointX, this.ctrlPointY,
            this.lineX, this.lineY, this.lineXb, this.text1, this.text2, );
        this.scene.add(this.lineGroup);
        this.lineGroup.position.set(0, 0, 0);
    }
    //创建一个坐标系
    createAxis() {
        this.Ax = AxisUtil.createAxis({ isTicks: false, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.Ax.position.z = -0.05;
        this.Ax.position.y = 0;
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPointX, this.ctrlPointY, ]).initEvent(this.camera, this.renderer);
    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        let {x, y} = pos;
        x = x < 90 ? x < -90 ? -90 : x : 90;
        y = y < 90 ? y < 0 ? 0 : y : 90;
        if (name === 'PointX') {
            thiz.ctrlPointX.position.set(x, 0, 2);
            thiz.drawLine({x: thiz.ctrlPointX.position.x, y: 0}, 1);
        } else if (name === 'PointY') {
            thiz.ctrlPointY.position.set(0, y, 2);
            thiz.drawLine({x: 0, y: thiz.ctrlPointX.position.y}, 2);
        }
        // 拖动点后画角度标识
        thiz.drawAngle();
        // 设置铅锤高度/水平长度文字的位置
        thiz.text1.position.y = (thiz.ctrlPointX.position.y + thiz.ctrlPointY.position.y) / 2 + 5;
        thiz.text2.position.x = (thiz.ctrlPointX.position.x + thiz.ctrlPointY.position.x) / 2;
    }
    //画线且进行缩放函数
    drawLine (pos: any, num: number) {
        const {x: x1, y: y1} = this.ctrlPointX.position;
        const {x: x2, y: y2} = this.ctrlPointY.position;
        if (num === 1) {
            this.lineX = common.scaleLine([0, 0, 0], [x1, y1, 0], this.line_x);
            this.lineXb = common.scaleLine([x2, y2, 0], [x1, y1, 0], this.line_xb);
        }
        if (num === 2) {
            this.lineY = common.scaleLine([0, -0.75, 0], [x2, y2, 0], this.line_y);
            this.lineXb = common.scaleLine([x1, y1, 0], [x2, y2, 0], this.line_xb);
        }
    }
    // 画角度标识函数
    drawAngle() {
        const {x: x1, y: y1} = this.ctrlPointX.position;
        const {x: x2, y: y2} = this.ctrlPointY.position;
        const rad = Math.atan2(y2, x1);
        this.angle = Math.round(rad * 180 / Math.PI);
        const angle2 = 180 - this.angle;
        this.scene.remove(this.angleA, this.angleB);
        // 拖动点在x正负半轴上，角度标识的变化
        if (x1 >= 0) {
            this.angleA = common.drawAngle(0, angle2, { color: '#F9E16A', size: 10, zIndex: -2, text: 'α=' });
            this.angleB = common.drawAngle(angle2, this.angle , { color: '#8ACCFE', size: 10, zIndex: -1, text: 'θ=' });
            if ( this.angle === 0) {
                this.angleB.children[0].position.set(-this.ctrlPointX.position.x / 2, 8, 1);
                this.angleB.children[1].position.set(-this.ctrlPointX.position.x / 2 + 8, 8, 1);
            }
        } else if (x1 < 0) {
            this.angleB = common.drawAngle(0, angle2 , { color: '#8ACCFE', size: 10, zIndex: -1, text: 'θ=' });
            this.angleA = common.drawAngle(0, angle2, { color: '#F9E16A', size: 20, zIndex: -2, text: 'α=' });
            if ( angle2 === 0) {
                this.angleB.children[0].position.set(-this.ctrlPointX.position.x / 2, 8, 1);
                this.angleB.children[1].position.set(-this.ctrlPointX.position.x / 2 + 8, 8, 1);
            }
        }
        // 若点击斜率按钮，α、θ角度标识在x轴负半轴上进行变化
        if ((window as any).viewHandler.viewModel.$data.active2) {
            if (x1 < 0) {
                this.angleB = common.drawAngle(0, angle2 , { color: '#8ACCFE', size: 10, zIndex: -1,  });
                this.angleA = common.drawAngle(0, angle2, { color: '#F9E16A', size: 20, zIndex: -2, text: 'θ=α=',
                    dataShift: 5, dataShift1: 19});
                if (angle2 === 0) {
                    this.angleA.children[0].position.set(-this.ctrlPointX.position.x / 2, 8, 1);
                    this.angleA.children[1].position.set(-this.ctrlPointX.position.x / 2 + 12, 8, 1);
                }
            }
            this.scene.add(this.angleA);

        }
        this.angleA.position.set(x1, 0, 0);
        this.angleB.position.set(x1, 0, 0);
        this.scene.add(this.angleB, );
        // 获取斜率变化的提示框
        const div = document.getElementById('box2');
        // 判断提示框内容随着斜率变化而变化的四种情况
        if ( this.angle === 90) {
            this.scene.remove(this.angleA, this.angleB);
            this.angleB = common.drawRightAng(10, 10 , { color: '#8ACCFE', zIndex: -1, text: 'θ=' });
            this.angleA = common.drawRightAng(15, 15, { color: '#F9E16A', zIndex: -2, text: 'θ=α=', dataShift: 10, dataShift1: 25 });
            this.scene.add(this.angleB);
            if ((window as any).viewHandler.viewModel.$data.active2) {
                this.scene.remove( this.angleB);
                this.angleB = common.drawRightAng(10, 10 , { color: '#8ACCFE', zIndex: -1, });
                this.scene.add(this.angleA, this.angleB);
            }
            (window as any).viewHandler.viewModel.$data.tip = tipImg2;
            div.style.width = '232px';
            div.style.height = '84px';
        } else if ( this.angle === 0 ) {
            if ((window as any).viewHandler.viewModel.$data.active2) {
                this.scene.remove(this.angleB, this.angleA);
                this.angleA = common.drawAngle(0, this.angle, {color: '#F9E16A', size: 20, zIndex: -2, text: 'θ=α=',
                    dataShift: 5, dataShift1: 17});
                this.scene.add(this.angleA, );
                this.angleA.children[0].position.set(this.ctrlPointX.position.x / 2, 8, 1);
                this.angleA.children[1].position.set(this.ctrlPointX.position.x / 2 + 12, 8, 1);
            }
            (window as any).viewHandler.viewModel.$data.tip = tipImg3;
            div.style.width = '83px';
            div.style.height = '58px';
        } else if ( angle2 === 0) {
            (window as any).viewHandler.viewModel.$data.tip = tipImg3;
            div.style.width = '83px';
            div.style.height = '58px';
        } else {
            div.style.width = '232px';
            div.style.height = '54px';
            (window as any).viewHandler.viewModel.$data.tip = tipImg1;
        }
    }
    // 点击坡度比事件函数
    poDuEvent () {
        this.scene.remove(this.Ax);
        this.scene.remove(this.angleA);
        thiz.text1.position.y = (thiz.ctrlPointX.position.y + thiz.ctrlPointY.position.y) / 2 + 5;
        thiz.text2.position.x = (thiz.ctrlPointX.position.x + thiz.ctrlPointY.position.x) / 2;
        this.drawAngle();
        this.text1.visible = true;
        this.text2.visible = true;
    }
    // 点击斜率事件函数
    slopeEvent () {
        this.scene.add(this.Ax);
        this.scene.add(this.angleA);
        this.drawAngle();
        this.text1.visible = false;
        this.text2.visible = false;
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.text1.visible = true;
        this.text2.visible = true;
        this.ctrlPointX.position.set(80, 0, 2);
        this.ctrlPointY.position.set(0, 80, 2);
        thiz.drawLine({x: thiz.ctrlPointX.position.x, y: 0}, 1);
        thiz.drawLine({x: 0, y: thiz.ctrlPointX.position.y}, 2);
        thiz.drawAngle();
        this.scene.remove(this.angleA);
        thiz.text1.position.y = (thiz.ctrlPointX.position.y + thiz.ctrlPointY.position.y) / 2 + 5;
        thiz.text2.position.x = (thiz.ctrlPointX.position.x + thiz.ctrlPointY.position.x) / 2;
        this.scene.remove(this.Ax);
    }
}




