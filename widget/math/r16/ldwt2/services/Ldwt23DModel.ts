import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {CurveConfig, PointConfig} from './LdwtConfig';
import {Line} from '../../../../../src/three/component/Line';
import * as dian from '../sub_static/point.png';
import * as fx from '../sub_static/fx.png';
import * as line1 from '../sub_static/l1.png';
import * as line2 from '../sub_static/l2.png';
import * as line3 from '../sub_static/l3.png';
import * as sliderLine from '../sub_static/ax.png';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';


export class Ldwt23DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private controls: any;
    private line1: any;
    private line2: any;
    private line3: any;
    private gongshi1: any;
    private gongshi2: any;
    private gongshi3: any;
    private sliderGongshi: any;
    private sliderControlerLine: any;
    private point: any;

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
    }


    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.createAxis();
        this.createFunctionLine();
        this.createPoint();
        this.createFunctionFormula();
        this.createRotateLine();
        this.createLine();
        this.resetSliderctrl('right');
        this.createText();
        this.setMove();
        this.render();
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  100);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
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

    //创建坐标轴
    createAxis() {
        this.scene.add(AxisUtil.createAxis({
            isTicks: true,
            AxisXNumArray: ['', '1', '', '2', '', '3'],
            width: 60,
            height: 60,
            XtickDistance: 5,
            YtickDistance: 5,
            OTextOffSet: 0.7,
            XnumYOffSet: 1
        } as any));
    }

    //创建函数线
    createFunctionLine() {
        const functionLine1 = ThreeUtil.createBezierCurve(CurveConfig.line1Config);
        const functionLine2 = ThreeUtil.createBezierCurve(CurveConfig.line2Config);
        const functionLine3 = ThreeUtil.createBezierCurve(CurveConfig.line3Config);
        const functionLine4 = ThreeUtil.createBezierCurve(CurveConfig.line4Config);
        this.scene.add(functionLine1);
        this.scene.add(functionLine2);
        this.scene.add(functionLine3);
        this.scene.add(functionLine4);
        const fxImg = ThreeUtil.createImg(4.6, 1.9, fx, -25, 35);
        this.scene.add(fxImg);
    }

    //创建英文字母
    createText() {
        const a = ThreeUtil.createNewRomanText('A', 10, 10, 0, '#000000', 0.05);
        const b = ThreeUtil.createNewRomanText('B', 20, 10, 0, '#000000', 0.05);
        const c = ThreeUtil.createNewRomanText('C', 10, -7, 0, '#000000', 0.05);
        this.scene.add(a);
        this.scene.add(b);
        this.scene.add(c);
    }

    //创建函数公式图片
    createFunctionFormula() {
        this.gongshi1 = ThreeUtil.createImg(11.6 / 2, 6.8 / 2, line1, 30, 15);
        this.gongshi2 = ThreeUtil.createImg(13.8 / 2, 6.8 / 2, line2, -25, 15);
        this.gongshi3 = ThreeUtil.createImg(13.8 / 2, 6.8 / 2, line3, 35, 8);
        this.sliderGongshi = ThreeUtil.createImg(18.6 / 3 , 4.8 / 3, sliderLine, 35, 2);
        this.scene.add(this.gongshi1);
        this.scene.add(this.gongshi2);
        this.scene.add(this.gongshi3);
        this.hideOrShowAllImg(false);
    }

    //创建点
    createPoint() {
        const dis = 10;
        const bluePoint1 = ThreeUtil.createPoint(0.6, PointConfig.blueColor, 0, -0.5 * dis, 1);
        const bluePoint2 = bluePoint1.clone();
        const bluePoint3 = bluePoint1.clone();
        bluePoint2.position.set(1 * dis, -0.5 * dis, 0);
        bluePoint3.position.set(2 * dis, -0.5 * dis, 0);
        const bigBluePoint1 = ThreeUtil.createPoint(0.6, PointConfig.blueColor, 1 * dis, 0.5 * dis, 1);
        const whitePoint = ThreeUtil.createPoint(0.45, PointConfig.whitePoint, 0, 0, 1);
        bigBluePoint1.add(whitePoint);
        const bigBluePoint2 = bigBluePoint1.clone();
        const bigBluePoint3 = bigBluePoint1.clone();
        const bigBluePoint4 = bigBluePoint1.clone();
        bigBluePoint2.position.set(2 * dis, 0.5 * dis, 0);
        bigBluePoint3.position.set(3 * dis, 0.5 * dis, 0);
        bigBluePoint4.position.set(0, 0.5 * dis, 0);
        this.scene.add(bigBluePoint1);
        this.scene.add(bigBluePoint2);
        this.scene.add(bigBluePoint3);
        this.scene.add(bigBluePoint4);
        this.scene.add(bluePoint1);
        this.scene.add(bluePoint2);
        this.scene.add(bluePoint3);
    }

    //创建一个可旋转的直线
    createRotateLine() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const line = new Line();
        const l1 = line.createLine({
            startPoint: new THREE.Vector3(300, 0, 0),
            endPoint: new THREE.Vector3( -300, 0, 0),
            lineWidth: 300,
            lineWidthScale: 1 / 150,
        });
        this.point = ThreeUtil.createPoint(1, '#000000', 0, 0, 0);
        const slider = ThreeUtil.createImg(100, 100, dian, 30, 0);
        const slider1 = ThreeUtil.createImg(5, 5, dian, 0, 0);
        slider1.position.z = 1;
        const point1 = ThreeUtil.createPoint(0.6, '#0199FF', -0.35, 0, 1);
        point1.position.z = 2;
        (slider.material as any).transparent = true;
        (slider.material as any).opacity = 0;
        slider.add(slider1);
        slider.add(point1);
        l1.add(slider);
        this.point.add(l1);
        this.point.add(this.sliderGongshi);

        this.sliderControlerLine = new SliderControlLine(line, slider, this.point, slider1);
        this.sliderControlerLine.initEvent(this.camera, this.renderer, this.controls, -((width2 - width1) / 2));
        this.scene.add(this.point);
    }

    //动态设置属性
    resetSliderctrl( val: string) {
        if (val === 'left') {
            this.sliderControlerLine.setCtrl(false);
        } else {
            this.sliderControlerLine.setCtrl(true);
        }
    }

    //设置move事件的操作
    setMove() {
        this.sliderControlerLine.sliderPointMouseMoveCallback = () => {
            this.moveMain();
            this.sliderGongshi.rotation.z = -this.sliderControlerLine.angle;
        };
        this.sliderControlerLine.sliderPointTouchMoveCallback = () => {
            this.moveMain();
            this.sliderGongshi.rotation.z = -this.sliderControlerLine.angle;
        };
    }

    //move事件的主要内容
    moveMain() {
        if (parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) <= -166 ||
            parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) >= 14 ) {
            this.hideOrShowLine(this.line3, true);
            this.hideOrShowImg(this.gongshi3, true);
        }

        if (parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) <= -26 ||
            parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) >= 154 ) {
            this.hideOrShowLine(this.line2, true);
            this.hideOrShowImg(this.gongshi2, true);
        }

        if (parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) >= 26 ||
            parseFloat((this.sliderControlerLine.angle * 180 / Math.PI).toFixed(1)) <= -154 ) {
            this.hideOrShowLine(this.line1, true);
            this.hideOrShowImg(this.gongshi1, true);
        }
    }

    //重置旋转方法
    resetRotation() {
        this.sliderGongshi.rotation.z = 0;
        this.sliderControlerLine.angle = 0;
        this.point.rotation.z = 0;
    }

    //创建三条显示隐藏的函数线
    createLine() {
        const createLine = new Line();
        this.line1 = createLine.createLine({
            startPoint: new THREE.Vector3(30, 0, 0),
            endPoint: new THREE.Vector3(-30, 0, 0),
            lineWidth: 200,
            dashLine: true,
            dashSize: 1,
            gapSize: 3,
            lineWidthScale: 1 / 150,
        });
        this.line2 = createLine.createLine({
            startPoint: new THREE.Vector3(30, 0, 0),
            endPoint: new THREE.Vector3(-30, 0, 0),
            lineWidth: 200,
            dashLine: true,
            dashSize: 1,
            gapSize: 3,
            lineWidthScale: 1 / 150,
        });
        this.line3 = createLine.createLine({
            startPoint: new THREE.Vector3(30, 0, 0),
            endPoint: new THREE.Vector3(-30, 0, 0),
            lineWidth: 200,
            lineWidthScale: 1 / 150,
        });
        this.line1.rotation.z = Math.atan(0.5);
        this.line2.rotation.z = Math.atan(-0.5);
        this.line3.rotation.z = Math.atan(0.25);
        this.scene.add(this.line1);
        this.scene.add(this.line2);
        this.scene.add(this.line3);
        this.hideOrShowAllLine(false);
    }

    //显示或隐藏所有的直线
    hideOrShowAllLine(val: boolean) {
        this.hideOrShowLine(this.line1, val);
        this.hideOrShowLine(this.line2, val);
        this.hideOrShowLine(this.line3, val);
    }

    //让直线显示或者隐藏的方法
    hideOrShowLine(line: any, isShow: boolean) {
        line.visible = isShow;
    }

    //显示或隐藏所有的公式
    hideOrShowAllImg(val: boolean) {
        this.hideOrShowImg(this.gongshi1, val);
        this.hideOrShowImg(this.gongshi2, val);
        this.hideOrShowImg(this.gongshi3, val);
    }

    //让公式显示或者隐藏的方法
    hideOrShowImg(gongshi: any, isShow: boolean) {
        gongshi.visible = isShow;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


}
