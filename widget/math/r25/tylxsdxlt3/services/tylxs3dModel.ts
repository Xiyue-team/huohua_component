import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import { MathConst } from '../../../../../src/config/MathConst';
import { Line } from '../../../../../src/three/component/Line';


export class Tylxs3dModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private controls: any;
    private ellipse: any;
    private focus: number;
    private dashLineGroup: THREE.Group;
    private lineGroup: THREE.Group;
    private lineHelper = new Line();

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
        this.createAxis();
        this.getEllipsefocus();
        this.createEllipse();
        this.createLine();
        this.createDashLine();
        this.createText();
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
        this.camera.position.set(0,  0,  300);
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
            AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
        } as any));
    }

    //绘制椭圆
    createEllipse() {
      const curve = new THREE.EllipseCurve(
        0,  0,
        48, 35,
        0,   2 * Math.PI,
        true,
        0
      );
      const path = new THREE.Path( curve.getPoints(3000));
      const geometry = path.createPointsGeometry(3000);
      this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.4, geometry.vertices.length, MathConst.lineColor_red);
      this.scene.add(this.ellipse);
    }



    //计算椭圆焦点位置
    getEllipsefocus() {
        const a = 48;
        const b = 35;
        this.focus = Math.sqrt((Math.pow(a, 2) - Math.pow(b, 2)));
    }

    //创建虚线
    createDashLine() {
        this.dashLineGroup = new THREE.Group();
        const dashLine1 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 35, 0),
          endPoint: new THREE.Vector3(this.focus, 0, 0),
          color: '#000000',
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
          dashLine: true
        });

        const dashLine2 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(0, 35, 0),
          endPoint: new THREE.Vector3(-this.focus, 0, 0),
          color: '#000000',
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
          dashLine: true
        });
        this.dashLineGroup.add(dashLine1, dashLine2);
        this.scene.add(this.dashLineGroup);
    }

    //创建直线
    createLine() {
        const a = 48;
        const b = 35;
        this.lineGroup = new THREE.Group();
        const line1 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(this.focus,
            Math.sqrt(Math.pow(b, 2) - ((Math.pow(b, 2) * Math.pow(b, 2))) / Math.pow(a, 2)) + 0.8, 0),
          endPoint: new THREE.Vector3(this.focus, 0, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });


      const line2 = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(this.focus,
            Math.sqrt(Math.pow(b, 2) - ((Math.pow(b, 2) * Math.pow(b, 2))) / Math.pow(a, 2)) + 0.8, 0),
          endPoint: new THREE.Vector3(-this.focus, 0, 0),
          color: MathConst.lineColor_Blue,
          lineWidth: MathConst.lineWidth / 2,
          lineWidthScale: 0.001,
        });
        this.lineGroup.add(line1, line2);
        this.scene.add(this.lineGroup);
    }

    //创建文字
    createText() {
        const color = '#000000';
        const scale = 0.15;
        const p = ThreeUtil.createNewRomanText('P', 35, 33, 0, color, scale);
        const f1 = ThreeUtil.createNewRomanText('F', -35, 10, 0, color, scale);
        const index1 = ThreeUtil.createNormalText('₁', 20, 0, 0, color, 1);
        const f2 = ThreeUtil.createNewRomanText('F', 40, 10, 0, color, scale);
        const index2 = ThreeUtil.createNormalText('₂', 20, 0, 0, color, 1);
        const m = ThreeUtil.createNewRomanText('M', -5, 45, 0, color, scale);
        f1.add(index1);
        f2.add(index2);
        this.dashLineGroup.add(m);
        this.lineGroup.add(p, f1, f2);

    }

    //控制虚线显示隐藏
    isShowDashLine(isShow: boolean) {
        this.dashLineGroup.visible = isShow;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


}
