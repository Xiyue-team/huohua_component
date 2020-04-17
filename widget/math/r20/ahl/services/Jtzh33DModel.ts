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
import {AxisUtil} from './AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

import * as F1 from '../sub_static/01.png';
import * as F2 from '../sub_static/02.png';
import * as point from '../sub_static/point.png';

export class Jtzh33DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    sliderControlLine: SliderControlLine;
    public orbit: any;
    private PPoint: any = common.createImg([40 * Math.sqrt(5 / 8), 0, 2], 16, 16, point);
   
    // private EllipseCurve = common.drawEllipseCurve(Math.sqrt(5 / 8) * 40, Math.sqrt(3 / 8) * 40);
    private curvePointArray: any = [];
    private color = '#000';
    private topEllipse: any;
    private bottomEllipse: any;
    private F1 = common.createImg([-Math.sqrt((5 / 8) - (3 / 8)) * 40, 5, 3], 6, 8.4, F1);
    private F2 = common.createImg([Math.sqrt((5 / 8) - (3 / 8)) * 40, 5, 3], 6, 8.4, F2);
    private circleF1 = common.drawCircle(1, {position: [-Math.sqrt((5 / 8) - (3 / 8)) * 40, 0, 3], color: '#0199FF'});
    private circleF2 = common.drawCircle(1, {position: [Math.sqrt((5 / 8) - (3 / 8)) * 40, 0, 3], color: '#0199FF'});
    private pCircle = common.drawCircle(1, {position: [5 / 8 * 40, 3 / 8 * 40, 3], color: '#0199FF'});
    private Qcircle = common.drawCircle(1, {position: [0, -1.5 * 40, 3], color: '#0199FF'});
    private  left = common.drawCircle(1, {position: [Math.sqrt(5 / 8) * 40, 0, 2], color: '#0199FF'});
    private  B = common.drawCircle(1, {position: [0, Math.sqrt(3 / 8) * 40, 2], color: '#0199FF'});
    private B1 = common.createText1('B1', [8, Math.sqrt(3 / 8) * 40 - 5, 2]);
    private P = common.createText('P', [20, -33, 2]);
    private Q = common.createText('Q', [84, -3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9), 2]);
    //切线与直线的焦点
    private jiaodian = common.drawCircle(1, {position: [79.5, -3 / 4 * (20 / (-29.9)) * 80 + 
        3 / 4 * (20 / (-29.9)) * 20 +  (-29.9), 2], color: '#0199FF'});
    private ellipsePointArr: any = [];
    
    private ow: any;
    private line_0 = common.drawUnitLine({width: 1, isDash: false});
    private line_1 = common.drawUnitLine({width: 1, isDash: false});
    private line_2 = common.drawUnitLine({width: 1, isDash: false});
    private line_3 = common.drawUnitLine({width: 1, isDash: false});


    private line = common.scaleLine([-Math.sqrt((5 / 8) - (3 / 8)) * 40, 0, 2], [5 / 8 * 40, 3 / 8 * 40, 2], this.line_0, 3); //F1 P
    private line1 = common.scaleLine([5 / 8 * 40, 3 / 8 * 40, 2], [0, -1.5 * 40, 2], this.line_1, 1.5); //P Q
    private line2 = common.scaleLine([-Math.sqrt((5 / 8) - (3 / 8)) * 40, 0, 2], [0, -1.5 * 40, 2], this.line_2, 2); //F1 Q
    private line3 = common.scaleLine([Math.sqrt((5 / 8) - (3 / 8)) * 40, 0, 2], [0, -1.5 * 40, 2], this.line_3, 2); //F2 Q

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
        this.initPlane();
        this.ow = (window as any).viewHandler.viewModel.$data;
    }

    initElement() {
        this.PPoint.name = 'point';
        thiz.createEllipse(Math.sqrt(5 / 8) * 40, Math.sqrt(3 / 8) * 40);
        this.scene.add(this.left, this.F1, this.F2, this.B, this.B1);
        this.scene.add(this.Qcircle, this.circleF1, this.circleF2, this.pCircle);
    }

    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({
            isTicks: true, 
            AxisXNumArray: ['', '', '', '', '0.5', '', '', '', '', '1'],
            AxisYNumArray: ['', '0.2', '', '0.4', '', '0.6', '', '0.8', '', '1.0', '', 
            '1.2', '', '1.4', '', '1.6', '', '1.8', '', '2.0', '', '2.2'],
            XTextOffSet: -45,
            YTextOffSet: -40,
            OTextXOffSet: -5,
            numberDepthTest: true
        } as any);
        Ax.position.z = 0;
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.PPoint]).initEvent(this.camera, this.renderer);
    }
    
    //切线 场景2
    addTangentLine(num: number) {
        if (num === 1) {
            this.PPoint.position.set(40 * Math.sqrt(5 / 8), 0, 2);

            this.scene.add(this.PPoint, this.line, this.line2, this.line3);
        } else {
            this.scene.remove(this.PPoint, this.line, this.line2, this.line3);
        }
    }

    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: any): void {
        const {x, y} = pos;
        if (name === 'point') {
            thiz.PPoint.position.x = x < 40 ? x < (Math.sqrt(2) / 2) * 40 ? (Math.sqrt(2) / 2) * 40 : x : 40;
            const xR = thiz.PPoint.position.x / 40; //长半轴a
            const yR = Math.sqrt(1 - Math.pow(thiz.PPoint.position.x / 40, 2)); //短半轴b
            thiz.PPoint.position.y = 0;
            thiz.circleF1.position.x = -Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40;
            thiz.circleF2.position.x = Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40;
            thiz.line2 = common.scaleLine([-Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40, 0, 2], [0, -1.5 * 40, 2], thiz.line_2, 2);

            const rad = Math.atan2(-1.5 * 40, Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40);
            thiz.line.rotation.z = rad + Math.PI / 2;
            thiz.line.position.set(-Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40, 0, 2);
            thiz.line3 = common.scaleLine([Math.sqrt(Math.pow(xR, 2) - Math.pow(yR, 2)) * 40, 0, 2], [0, -1.5 * 40, 2], thiz.line_3, 5);
            thiz.createEllipse(xR * 40, yR * 40);
        }
    } 

    //绘制椭圆
    createEllipse(xR: any, yR: number) {
        this.curvePointArray = [];
        this.scene.remove(this.bottomEllipse, this.topEllipse);
        for (let i = -xR; i <= xR; i += 0.01) {
            const y = (Math.pow(yR, 2) - (Math.pow(yR, 2) / Math.pow(xR, 2)) * Math.pow(i, 2));
            this.curvePointArray.push(new THREE.Vector3(i, Math.sqrt(y), 0));
        }
        this.topEllipse = ThreeUtil.createTube(this.curvePointArray, 0.5, 500, this.color);
        this.bottomEllipse = this.topEllipse.clone();
        this.bottomEllipse.rotateX(Math.PI);
        this.scene.add(this.bottomEllipse);
        this.scene.add(this.topEllipse);
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

    initPlane() {
        const G = new THREE.PlaneGeometry(100, 100);
        const M = new THREE.MeshBasicMaterial({
            color: '#fff'
        });
        const Plane = new THREE.Mesh(G, M);
        Plane.position.set(0, 109, 2);
        const PlaneLeft = Plane.clone();
        PlaneLeft.position.set(-100, 0, 2);
        const PlaneRight = Plane.clone();
        PlaneRight.position.set(108, 0, 2);

        const G1 = new THREE.PlaneGeometry(10, 50);
        const M1 = new THREE.MeshBasicMaterial({
            color: '#fff'
        });
        const minPlane = new THREE.Mesh(G1, M1);
        minPlane.position.set(-6, 60, 1);
        this.scene.add(Plane, PlaneLeft, PlaneRight, minPlane);
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
