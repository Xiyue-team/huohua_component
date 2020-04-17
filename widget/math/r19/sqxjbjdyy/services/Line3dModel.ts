import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
import * as tipImg1 from '../sub_static/UI/tip1.png';
import * as tipImg2 from '../sub_static/UI/tip2.png';
import * as tipImg3 from '../sub_static/UI/tip3.png';
import * as tipImg4 from '../sub_static/UI/tip4.png';

let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
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

    private sliderControlLine: SliderControlLine;
    // 添加初始界面圆O的相关元素
    private circle_group = new THREE.Group();
    private circle = common.createStrokeCircle(30, {color: '#7a3cff'});
    private text = common.createText('O', [3, 7, 0], {color: '#7a3cff'});
    // 添加圆O的半径r
    private liner_group = new THREE.Group();
    private line = common.drawUnitLine({width: 0.8, color: '#00BFFF', isDash: false, });
    private line_r = common.scaleLine([0, 0, 1], [-30, 0, 1], this.line);
    private text_r = common.createText('r', [-15, 10, 1], {color: '#00BFFF', isItalic: false});
    // 添加初始界面x轴上四个蓝色的点
    private circle_small1 = common.drawCircle(1, {color: '#0199FF'});
    private circle_small2 = common.drawCircle(1, {color: '#0199FF'});
    private circle_smallF1 = common.drawCircle(1, {color: '#0199FF'});
    private circle_smallF2 = common.drawCircle(1, {color: '#0199FF'});
    // 添加初始界面F1/F2文字
    private text_F11 = common.createText('F', [-50, 10, 0], {color: '#000000'});
    private text_F12 = common.createText('₁', [-47, 8, 0], {color: '#000000', isItalic: false});
    private text_F21 = common.createText('F', [50, 10, 0], {color: '#000000'});
    private text_F22 = common.createText('₂', [53, 8, 0], {color: '#000000', isItalic: false});
    // 添加初始界面圆O1上相关元素
    private circle_group1 = new THREE.Group();
    private circle_one = common.createStrokeCircle(10, {color: '#FFCF33'});
    private text_one = common.createText('O', [2, 10, 0], {color: '#000000'});
    private text_one1 = common.createText('₁', [5, 8, 0], {color: '#000000', isItalic: false});
    private lineRed = common.drawUnitLine({width: 0.8, color: '#FF2727', isDash: false, });
    private lineYellow = common.drawUnitLine({width: 0.8, color: '#FFCF33', isDash: false, });
    private line_red = common.scaleLine([10, 0, 1], [0, 0, 1], this.lineRed);
    private line_yellow = common.scaleLine([-10, 0, 1], [0, 0, 1], this.lineYellow);
    private text_R = common.createText('R', [5, 10, 0], {color: '#FF2727'});
    private text_P = common.createText('P', [10, 10, 0], {color: '#000000'});
    // 拖动点
    private ctrlPoint = common.createImg([-10, 0, 1], 20, 20, pointImg);
    private controls: any;
    private count = 0;
    // 切换焦点F的x轴坐标变量
    private posF_x = 50;
    // x轴负半轴上双曲线点
    private hyperbolaPointArr: any = [];
    private leftHyperBol: any;
    private rightHyperBol: any;
    // 四种不同情况下焦半径的小提示图片
    private tipImg = common.createImg([67, -80, 1], 114, 11.1, tipImg1);
    private tipImg1 = new THREE.TextureLoader().load(tipImg1 as any);
    private tipImg2 = new THREE.TextureLoader().load(tipImg2 as any);
    private tipImg3 = new THREE.TextureLoader().load(tipImg3 as any);
    private tipImg4 = new THREE.TextureLoader().load(tipImg4 as any);
    browserInfo: BrowserInfo;
    private render = () => {
        requestAnimationFrame(this.render);
        if (this.count !== 0) {
            this.count = ++this.count % 3;
            return;
        } else {
            this.count = ++this.count % 3;
        }
        this.renderer.render(this.scene, this.camera);
    }

    init(): void {
        thiz = this;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.tbctrl();
        this.createAxis();
        this.initHyperbola();
        this.initEvt();
        this.initElement();
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
        this.camera = new PerspectiveCamera(45, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 330);
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

    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']
        } as any);
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint]).initEvent(this.camera, this.renderer);
    }

    // 创建x轴上的双曲线
    initHyperbola() {
        const a = 30;
        const b = 40;
        for (let i = -70; i <= 70; i += 1) {
            const x = -Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
            this.hyperbolaPointArr.push(new THREE.Vector3(x, i, 0));
        }
        this.leftHyperBol = ThreeUtil.createTube(this.hyperbolaPointArr, 0.5, 500, '#000');
        this.rightHyperBol = this.leftHyperBol.clone();
        this.rightHyperBol.rotateY(Math.PI);
        this.scene.add(this.leftHyperBol, this.rightHyperBol);
    }

    // 初始化场景元素
    initElement() {
        this.circle_group.add(this.circle, this.text, );
        this.liner_group.add(this.line_r, this.text_r, );
        this.circle_group1.add(this.text_one, this.text_one1, this.circle_one, );
        this.circle_small2.position.set(30, 0, 1);
        this.circle_small1.position.set(-30, 0, 1);
        this.circle_smallF1.position.set(-50, 0, 1);
        this.circle_smallF2.position.set(50, 0, 1);
        this.scene.add(this.circle_group, this.liner_group, this.circle_group1, this.circle_small1, this.circle_small2, this.circle_smallF1,
            this.circle_smallF2, this.ctrlPoint, this.text_F11, this.text_F12, this.text_F21, this.text_F22,
            this.line_yellow, this.line_red, this.text_P, this.text_R, this.tipImg);
        // 初始动圆O1的大小与位置设置
        this.setP(Math.hypot(-0.75 * Math.sqrt(41) * 10 + 50, 50) / 20, {x: -0.75 * Math.sqrt(41) * 10, y: 50}, );
    }

    // 设置圆O1的缩放和位置
    setP(scale: number, pos?: any, ) {
        if (pos) {
            const posO1_x = (pos.x - this.posF_x) / 2;
            const posO1_y = pos.y / 2;
            this.circle_group1.position.set(posO1_x, posO1_y, 0);
            this.ctrlPoint.position.set(pos.x, pos.y, 1);
            this.line_red = common.scaleLine([pos.x, pos.y, 1], [posO1_x, posO1_y, 1], this.lineRed);
            this.line_yellow = common.scaleLine([-this.posF_x, 0, 1], [posO1_x, posO1_y, 1], this.lineYellow);
            this.text_P.position.set(pos.x + 5, pos.y + 7, 0);
            this.text_R.position.set((posO1_x + pos.x) / 2 + 3, (posO1_y + pos.y) / 2 + 5, 1);
        }
        if (scale) {
            this.circle_one.scale.set(scale, scale, 0);
        }
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        const {x, y} = pos;
        if (x < 0) {
            thiz.liner_group.position.set(0, 0, 0);
            thiz.posChange(x, y, 1);
        } else if (x >= 0) {
            thiz.liner_group.position.set(30, 0, 0);
            thiz.posChange(x, y, 2);
        }
    }
    // 改变切换四种情况小提示图片及解析步骤事件
    changeTipEvent ( val: number, tipImg: any) {
        (this.tipImg.material as any).map = tipImg;
        (window as any).viewHandler.viewModel.$refs.model.switchModel = `${val}`;
    }
    // O1圆变化事件函数
    posChange(x: number, y: number, event: number) {
        y = y < 70 ? y < -70 ? -70 : y : 70;
        const tip = (this.tipImg.material as any);
        if (event === 1) {
            x = -Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(y, 2));
            if (this.posF_x === 50) {
                this.changeTipEvent(1, this.tipImg1);
            } else {
                this.changeTipEvent(3, this.tipImg3);
            }
        } else if (event === 2) {
            x = Math.sqrt(Math.pow(30, 2) + (Math.pow(30, 2) / Math.pow(40, 2)) * Math.pow(y, 2));
            if (this.posF_x === -50) {
                this.changeTipEvent(4, this.tipImg4);
            } else {
                this.changeTipEvent(2, this.tipImg2);
            }
        }
        // 设置拖动点P的位置
        thiz.ctrlPoint.position.set(x, y, 1);
        // O1圆的位置变化和大小缩放事件
        if ((window as any).viewHandler.viewModel.$data.mark) {
            this.posF_x = 50;
            // O1圆的半径
            const radius = Math.hypot(x + 50, y) / 2;
            thiz.setP(radius / 10, {x: x, y: y});
        } else {
            this.posF_x = -50;
            // O1圆的半径
            const radius = Math.hypot(x - 50, y) / 2;
            thiz.setP(radius / 10, {x: x, y: y});
        }
    }

    // 点击切换按钮切换双曲线两个焦点事件函数
    changeEvt(val: number) {
        const x1 = this.ctrlPoint.position.x;
        const y1 = this.ctrlPoint.position.y;
        // val等于1，切换到左焦点，val等于2，切换到右焦点
        if (val === 1) {
            this.posF_x = 50;
            this.setP(Math.hypot(x1 + 50, y1) / 2 / 10,
                {x: x1, y: y1});
            if (x1 < 0) {
                this.changeTipEvent(1, this.tipImg1);
            } else {
                this.changeTipEvent(2, this.tipImg2);
            }
        } else if (val === 2) {
            this.posF_x = -50;
            this.setP(Math.hypot(x1 - 50, y1) / 2 / 10,
                {x: x1, y: y1});
            if (x1 < 0) {
                this.changeTipEvent(3, this.tipImg3);
            } else {
                this.changeTipEvent(4, this.tipImg4);
            }
        }
    }
    // 改变O圆半径红线位置和小提示图片事件
    changeLineEvent(val: number, tipImg: any) {
        thiz.liner_group.position.set(val, 0, 0);
        (this.tipImg.material as any).map = tipImg;

    }
    // 滚动解析步骤事件函数
    stepChange(type: string) {
        const x1 = 0.75 * Math.sqrt(41) * 10;
        if (type === 'step1') {
            this.changeLineEvent(0, this.tipImg1);
            this.setP(Math.hypot(-x1 + 50, 50) / 20, {x: -x1, y: 50}, );
        } else if (type === 'step2') {
            this.changeLineEvent(30, this.tipImg2);
            (window as any).viewHandler.viewModel.$data.mark = true;
            this.posF_x = 50;
            this.setP(Math.hypot(x1 + 50, 50) / 20, {x: x1, y: 50}, );
        } else if (type === 'step3') {
            this.changeLineEvent(0, this.tipImg3);
            (window as any).viewHandler.viewModel.$data.mark = false;
            this.posF_x = -50;
            this.setP(Math.hypot(-x1 - 50, 50) / 20, {x: -x1, y: 50}, );
        } else if (type === 'step4') {
            this.changeLineEvent(30, this.tipImg4);
            this.setP(Math.hypot(x1 - 50, 50) / 20, {x: x1, y: 50}, );
        }
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

}




