import * as THREE from 'three';
import {WebGLRenderer, Vector2, Vector3} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
const OrbitControls = require('three-orbitcontrols');
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point.png';
export class Model extends ThreeBase {
    //指数函数图像上点组合
    private indexPointArr: any = [];
    private index: any;
    //a值
    private a: any;
    //创建（0,1）上的点
    private point = common.drawCircle(2, {color: '#ffffff', position: [0, 10, 2]});
    //创建不同a值，x等于1时的点
    private ctrlPoint = common.createImg([10, 20, 2], 12, 12, pointImg);
    // 创建x等于1时的点的水平和竖直的垂线
    private line_level = common.drawUnitLine({ color: '#FFD621', isDash: true });
    private line_vertical = common.drawUnitLine({ color: '#FFD621', isDash: true });
    //创建字
    private textNumber = common.createText(`2`, [-5, 22, 0], { color: '#ffffff', isItalic: false });
    private textNumber1 = common.createText(`1`, [10, -5, 0], { color: '#ffffff', isItalic: false });
    private textNumber2 = common.createText(`(0, 1)`, [-10, 12, 0], { color: '#ffffff', isItalic: false });
    //创建控制器变量
    private orbit: any;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initElement();
        this.changeSlider();
        this.initControl();
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
        this.camera.position.set(0, 0, 300);
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
        (this.renderer as WebGLRenderer).setClearColor('#333');
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    /**
     * 初始化控制器
     */
    initControl() {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = false;
        // 是否可以缩放
        this.orbit.enableZoom = true;
        //设置相机距离原点的最近距离
        this.orbit.minDistance = 250;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 500;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
        this.orbit.noRotate = true;
    }
    //初始化场景元素
    initElement() {
        //创建一个坐标系
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: [],
            axisColor: '#808080', fontColor: '#808080'} as any);
        this.line_level = common.scaleLine([10, 20, 1], [0, 20, 1], this.line_level);
        this.line_vertical = common.scaleLine([10, 20, 1], [10, 0, 1], this.line_vertical);
        this.scene.add(Ax, this.point, this.ctrlPoint, this.line_level, this.line_vertical, this.textNumber,
            this.textNumber1, this.textNumber2);
    }

    // 滑动条滑动事件
    changeSlider () {
        this.indexPointArr = [];
        this.scene.remove(this.index, this.textNumber);
        this.a = (window as any).viewHandler.viewModel.$data.value;
        let y = null;
        if (this.a === 0 || this.a === 1) {
            this.scene.remove(this.textNumber, this.textNumber1, this.textNumber2, this.point, this.ctrlPoint,
                this.line_level, this.line_vertical);
            return;
        } else {
            for (let i = -10; i <= 7; i += 0.01) {
                y = Math.pow(this.a, i) * 10;
                this.indexPointArr.push(new THREE.Vector3(i * 10, y, 0));
            }
        }
        if (this.a === 2.7) {
            this.textNumber = common.createText(`e`, [-5, this.a * 10 + 2, 2], { color: '#ffffff', isItalic: true });
        } else {
            this.textNumber = common.createText(`${this.a}`, [-5, this.a * 10 + 2, 2], { color: '#ffffff', isItalic: false });
        }
        this.ctrlPoint.position.set(10, this.a * 10 , 2);
        this.line_level = common.scaleLine([10, this.a * 10, 1], [0, this.a * 10, 1], this.line_level);
        this.line_vertical = common.scaleLine([10, this.a * 10, 1], [10, 0, 1], this.line_vertical);
        this.index = common.drawDashOrLine(this.indexPointArr, {color : '#6ECFFF'});
        this.scene.add(this.index, this.point, this.ctrlPoint, this.textNumber, this.textNumber1, this.textNumber2,
            this.line_level, this.line_vertical);
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    reset() {
        this.camera.position.set(0, 0, 300);
    }
}




