/**
 *@since 2.0
 *@author mac
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
let thiz: any = null;
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import common from './CommonForThree';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';

import * as F1 from '../sub_static/01.png';
import * as F2 from '../sub_static/02.png';
import * as point from '../sub_static/point.png';

export class Jtzh33DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    sliderControlLine: SliderControlLine;
    public orbit: any;
    private PPoint: any = common.createImg([-10, 29, 2], 16, 16, point);

    private P = common.createText('P', [-12, 37, 0], {color: '#1A1A1A'});
    private point = common.createImg([-10, 29, 2], 15, 6, point);

    private circle: any;

    private EllipseCurve: any;

    private circleMin: any;
    private ellipsePointArr: any = [];
    private ellipsePointArr1: any = [];
    private ellipsePointArr2: any = [];

    private F1 = common.createImg([-40, -5, 0], 6, 8.4, F1);
    private F2 = common.createImg([40, -5, 0], 6, 8.4, F2);
    private circleF1 = common.drawCircle(1, {position: [-40, 0, 0], color: '#0199FF'});
    private circleF2 = common.drawCircle(1, {position: [40, 0, 0], color: '#0199FF'});

    private Fgroup = new THREE.Group();

    private ow: any;

    private line_0 = common.drawUnitLine({
        width: 1,
        color: '#FFC63C',
        isDash: false,
    });

    private line_1 = common.drawUnitLine({
        width: 1,
        color: '#FFC63C',
        isDash: false,
    });

    private line = common.scaleLine([-10, 29, 0], [-40, 0, 0], this.line_0);
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
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.render();
        this.createAxis();
        this.initElement();
        this.initEvt();
        this.initEllipseArr();
        this.initModel();
        this.ow = (window as any).viewHandler.viewModel.$data;
    }

    initElement() {
        this.scene.add(this.PPoint, this.P);
        this.Fgroup.add(this.circleF1, this.circleF2, this.F1, this.F2);
        this.scene.add(this.line);
        this.scene.add(this.Fgroup);
    }


    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.PPoint]).initEvent(this.camera, this.renderer);
    }

    initEllipseArr () {
        for (let i = 0; i < 361; i += 4) {
            const x = 50 * Math.cos(Math.PI * i / 180);
            const y = 50 * Math.sin(Math.PI * i / 180);
            const x1 = Math.sqrt(30 * 30 + 29 * 29) / 2 * Math.cos(Math.PI * i / 180);
            const y1 = Math.sqrt(30 * 30 + 29 * 29) / 2 * Math.sin(Math.PI * i / 180);
            const x2 = 50 * Math.cos(Math.PI * i / 180);
            const y2 = 30 * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr2.push({ x: x2, y: y2, z: 1 });
            this.ellipsePointArr1.push({ x: x1, y: y1, z: 1 });
            this.ellipsePointArr.push({ x, y, z: 1 });

        }
    }
    initModel() {
        this.circle = common.drawDashOrLine(this.ellipsePointArr, {color: '#7A3CFF'});
        this.EllipseCurve = common.drawDashOrLine(this.ellipsePointArr2, {color: '#3CC6FF'});
        this.scene.add(this.circle, this.EllipseCurve);
    }

    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, obj: any): void {
        const a = 50;
        const c = 40;
        const b = Math.sqrt(a * a - (c * c));
        thiz.PPoint = obj;
        if (!thiz.ow.ishave) {
            const { x, y } = pos;
    
            const rat = b / a;
            const angleRadius = Math.atan2(y / rat, x);
            const px = a * Math.cos(angleRadius);
            const py = a * Math.sin(angleRadius) * rat;

            thiz.PPoint.position.set(px, py, 0);
            thiz.P.position.set(px - 2, py + 8, 0);
            thiz.line = common.scaleLine([px, py, 0], [-40, -0, 0], thiz.line_0);
     
            const disX = px - (-40);
            const disY = py;
            const disR = Math.sqrt(disX * disX + disY * disY) / 2;  //小圆实时半径
            const initBanjing = Math.sqrt(30 * 30 + 29 * 29) / 2;  //小圆初始半径
            const midX = (px + (-40)) / 2;
            const midY = py / 2;
     
            const scaleR = disR / initBanjing; //半径缩放比例
            thiz.circleMin.scale.set(scaleR, scaleR, 0);
            thiz.circleMin.position.set(midX, midY, 0);
        }
        if (thiz.ow.ishave) {
            const { x, y } = pos;

            const rat = b / a;
            const angleRadius = Math.atan2(y / rat, x);
            const px = a * Math.cos(angleRadius);
            const py = a * Math.sin(angleRadius) * rat;

            thiz.PPoint.position.set(px, py, 0);
            thiz.P.position.set(px - 2, py + 8, 0);
            thiz.line1 = common.scaleLine([px, py, 0], [40, 0, 0], thiz.line_1);

            const disX = px - 40;
            const disY = py;
            const disR = Math.sqrt(disX * disX + disY * disY) / 2;  //小圆实时半径
            const initBanjing = Math.sqrt(30 * 30 + 29 * 29) / 2;  //小圆初始半径
            const midX = (px + 40) / 2;
            const midY = py / 2;
    
            const scaleR = disR / initBanjing; //半径缩放比例
            thiz.circleMin.scale.set(scaleR, scaleR, 0);
            thiz.circleMin.position.set(midX, midY, 0);
        }   
    }

    change(num: number) {
        if (num === 1) {
            thiz.scene.remove(thiz.line, thiz.circleMin, thiz.P);
            thiz.P.position.set(8, 37, 0);
            thiz.PPoint.position.set(10, 29, 2);
            thiz.line1 = common.scaleLine([10, 29, 0], [40, 0, 0], this.line_1);
            thiz.circleMin = common.drawDashOrLine(this.ellipsePointArr1, {color: '#FFC63C'});
            thiz.circleMin.position.set(25, 14.5, 0);
            thiz.scene.add(thiz.line1, thiz.circleMin, thiz.P, thiz.PPoint);
        } else {
            thiz.scene.remove(thiz.line1, thiz.circleMin, thiz.P);
            thiz.P.position.set(-12, 37, 0);
            thiz.line = common.scaleLine([-10, 29, 0], [-40, 0, 0], this.line_0);
            thiz.circleMin = common.drawDashOrLine(this.ellipsePointArr1, {color: '#FFC63C'});
            thiz.PPoint.position.set(-10, 29, 2);
            thiz.circleMin.position.set(-25, 14.5, 0);
            thiz.scene.add(thiz.line, thiz.PPoint, thiz.circleMin, thiz.P);
        }
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
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
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
        this.orbit = new TrackballControls(this.camera, this.renderer.domElement);
        this.orbit.rotateSpeed = 3;
        this.orbit.zoomSpeed = 1.2;
        this.orbit.panSpeed = 0.8;
        this.orbit.noZoom = true;
        this.orbit.noPan = true;
        this.orbit.noRotate = true;
        this.orbit.staticMoving = true;
        this.orbit.dynamicDampingFactor = 0.3;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.6));

        this.camera.add(this.lights[0]);
        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.camera.add( directionalLight4 );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.2);
        dirLight.position.set( 100, 0, 100 );
        this.camera.add( dirLight );
        //
        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.position.set( -100, 0, -100 );
        this.camera.add( dirLight2 );
    }

    

    // 重置动画
    resetModel() {
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 200);
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

}
