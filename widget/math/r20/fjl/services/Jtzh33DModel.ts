import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');

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
    private PPoint: any = common.createImg([20, -29.9, 2], 16, 16, point);
    //圆
    private circle: any;
    //圆心
    private circleMin = common.drawCircle(1, {position: [49.75, (-29.9 + (-3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9))) / 2, 2], color: '#0199FF'});
    //半径
    private R: any;    
    private timer: any;
    private EllipseCurve: any;
    private F1 = common.createImg([-20, 6, 2], 6, 8.4, F1);
    private F2 = common.createImg([20, -6, 2], 6, 8.4, F2);
    private circleF1 = common.drawCircle(1, {position: [-20, 0, 2], color: '#0199FF'});
    private circleF2 = common.drawCircle(1, {position: [20, 0, 2], color: '#0199FF'});
    private  A = common.drawCircle(1, {position: [21.3, 29.3, 2], color: '#0199FF'});
    private  B = common.drawCircle(1, {position: [-37.5, -12.1, 2], color: '#0199FF'});
    private Atext = common.createText('A', [30.8, 36, 0]); 
    private Btext = common.createText('B', [-38, -13, 0]);
    private M = common.createText('M', [23, 0, 2], {color: '#ffa400'});
    private P = common.createText('P', [20, -33, 2]);
    private Q = common.createText('Q', [84, -3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9), 2]);
    //切线与直线的焦点
    private jiaodian = common.drawCircle(1, {position: [80, -3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9), 2], color: '#0199FF'});
    private ellipsePointArr: any = [];
    
    private ow: any;
    private line_0 = common.drawUnitLine({width: 1, isDash: false});
    private line_1 = common.drawUnitLine({ width: 1, isDash: false});
    private line_2 = common.drawUnitLine({width: 1, isDash: false});
    private line_3 = common.drawUnitLine({width: 1, isDash: false});
    
    private zhijin = common.drawUnitLine({width: 1, isDash: false, color: '#0199FF'});

    private line = common.scaleLine([42.6, 44.5, 0], [-60.3, -27.6, 0], this.line_0);
    private lineAF2 = common.scaleLine([21.3, 29.3, 0], [20, 0, 0], this.line_1); 
    private lineBF2 = common.scaleLine([-37.5, -12.1, 0], [20, 0, 0], this.line_2); 
    private lineRight = common.scaleLine([80, 175, 0], [80, -175, 0], this.line_3);
    private zhiJin  = common.scaleLine([20, -29.9, 0], [80, -3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9), 0], this.zhijin);
    //切线
    private tangentLine = common.drawDresh(-150, 150, '#0199FF');

    private rad: any;
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
        this.PPoint.name = 'left';
        this.scene.add(this.Atext, this.Btext, this.A, this.B, this.F1, this.F2, this.lineAF2, this.lineBF2);
        this.scene.add(this.circleF1, this.circleF2, this.line);
    }

    initModel() {
        this.EllipseCurve = common.drawDashOrLine(this.ellipsePointArr);
        this.scene.add(this.EllipseCurve);
    }

    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({
            isTicks: true, 
            AxisXNumArray: ['', '', '', '', '', '', '', '', '', ''],
        } as any);
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.PPoint]).initEvent(this.camera, this.renderer);
    }
    //p点动画轨迹
    initEllipseArr () {
        for (let i = -60; i < 301; i += 4) {
            const x = 40 * Math.cos(Math.PI * i / 180);
            const y = 20 * Math.sqrt(3) * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr.push({ x, y, z: 0 });
        }
    }
    
    //切线 场景2
    addTangentLine(x: number, y: number) {
        this.scene.remove(this.circle, this.F2, this.lineAF2, this.lineBF2);
        this.scene.add(this.P, this.Q);
        const midX = (x + 80) / 2;
        const midY  = (y + (-3 / 4) * (x / y) * 80 + (3 / 4) * (x / y) * x + y) / 2;
        this.circleMin.position.set(midX, midY, 2);
        this.R = Math.sqrt(Math.pow((x - midX), 2) + Math.pow((y - midY), 2));
        this.circle = common.createStrokeCircle(this.R);
        this.circle.position.set(midX, midY, 0);
        this.scene.remove(this.tangentLine);
        this.tangentLine.position.set(x, y, 0);
        this.rad = Math.atan(-3 / 4 * (x / y));
        this.tangentLine.rotation.z = this.rad;
        this.jiaodian.position.set(80, (-3 / 4) * (x / y) * 80 + (3 / 4) * (x / y) * x + y, 2);
        this.Q.position.set(84, (-3 / 4) * (x / y) * 80 + (3 / 4) * (x / y) * x + y, 2);
        this.P.position.set(x, y - 4, 0);
        this.zhiJin = common.scaleLine([x, y, 0], [80, (-3 / 4) * (x / y) * 80 + (3 / 4) * (x / y) * x + y, 0], this.zhijin);
        this.zhiJin.position.set(midX, midY, 0);
        this.scene.add(this.tangentLine, this.circle, this.zhiJin, this.PPoint);
        this.scene.add(this.lineRight, this.jiaodian, this.circleMin);
    }
    //场景1
    remove() {
        this.scene.add(this.lineAF2, this.lineBF2, this.F2, this.circleF2);
        this.scene.remove(this.tangentLine, this.circle, this.zhiJin, this.PPoint);
        this.scene.remove(this.lineRight, this.jiaodian, this.circleMin);
    }
    add() {
        this.PPoint.position.set(20, -29.9, 2);
        this.scene.remove(this.circleF2);
    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        const {x, y} = pos;
        const a = 40;
        const b = 20 * Math.sqrt(3);
        if (name === 'left') {
            thiz.scene.remove(thiz.circleF2, thiz.M);
            thiz.ow.ishave = false;
            const rat = b / a;
            const angleRadius = Math.atan2(y / rat, x);
            const px = a * Math.cos(angleRadius);
            const py = a * Math.sin(angleRadius) * rat;
            
            thiz.PPoint.position.set(px, py, 0);
            thiz.addTangentLine(px, py);
        }
    }
     // 画椭圆
     drawEllipse () {
        const A = 40;
        const B = 20 * Math.sqrt(3);
        let num = 0;
        function move () {
            if (num > 90) {
                clearTimeout(thiz.timer);
                return;
            }
            //P点位置
            const { x, y } = thiz.ellipsePointArr[90 - num];
            thiz.PPoint.position.set(x, y, 2);
            thiz.addTangentLine(x, y);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
        this.scene.add(this.M, this.circleF2);
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
