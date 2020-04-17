import * as THREE from 'three';
import {
    DoubleSide,
    Vector3,
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Utils} from '../../lzxdczpd/services/Utils';
import {DashLine} from '../../../../../src/three/component/DashLine';



OBJLoader(THREE);

export class LineEquation3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private dashLine = new DashLine();
    //直线
    line: any;

    //倾斜角
    qxAngle: any;

    //直角标志
    rightAngle1: any;
    rightAngle2: any;

    //直线与y轴交点
    jpoint: any;

    //theta
    theta: any;

    private dashline = new DashLine();


    private render = () => {
        requestAnimationFrame(this.render);
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
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
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

        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createAxis();
        this.createLine();
        this.createJPoint();
        this.createQxAngle();
        this.render();
    }

    /**
     * 初始化场景
     */
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

    //创建坐标系
    createAxis() {
        //创建一个坐标系
        const color = '#000000';
        let XAxis;
        let YAxis;
        let arrowX;
        let arrowY;
        let i;
        let j = -100;
        const group = new THREE.Group();
        //创建两个坐标轴
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            XAxis = Utils.createLine(210, 1.5, color);
            YAxis = Utils.createLine(1.5, 210, color);
            arrowX = Utils.createTriangle(105, 2, 105, -2, 115, 0, color);
            arrowY = Utils.createTriangle(2, 105, -2, 105, 0, 115, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.5, 4, color);
                const b = Utils.createLine(4, 0.5, color);
                a.position.set(j, 2, 0);
                b.position.set(2, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        } else {
            XAxis = Utils.createLine(210, 0.5, color);
            YAxis = Utils.createLine(0.5, 210, color);
            arrowX = Utils.createTriangle(105, 1.5, 105, -1.5, 111, 0, color);
            arrowY = Utils.createTriangle(1.5, 105, -1.5, 105, 0, 111, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.25, 2, color);
                const b = Utils.createLine(2, 0.25, color);
                a.position.set(j, 1, 0);
                b.position.set(1, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        }

        //创建坐标轴上的文字
        const textX = Utils.createText('x', 110, 0, 0, color);
        const textY = Utils.createText('y', -3, 115, 0, color);
        const textO = Utils.createText('O', -3.6, 0, 0, color);
        //X轴坐标
        const text1 = Utils.createNumber('1', 10, -2, 0, color);
        const text2 = Utils.createNumber('5', 50, -2, 0, color);
        const text3 = Utils.createNumber('10', 100, -2, 0, color);
        const text4 = Utils.createNumber('-1', -10, -2, 0, color);
        const text5 = Utils.createNumber('-5', -50, -2, 0, color);
        const text6 = Utils.createNumber('-10', -100, -2, 0, color);
        //Y轴坐标
        const text7 = Utils.createNumber('1', -4, 12, 0, color);
        const text8 = Utils.createNumber('5', -4, 52, 0, color);
        const text9 = Utils.createNumber('10', -5, 102, 0, color);
        const text10 = Utils.createNumber('-1', -4, -8, 0, color);
        const text11 = Utils.createNumber('-5', -4, -48, 0, color);
        const text12 = Utils.createNumber('-10', -5, -98, 0, color);

        group.add(textX);
        group.add(textY);
        group.add(XAxis);
        group.add(YAxis);
        group.add(arrowX);
        group.add(arrowY);
        group.add(textO);
        group.add(text1);
        group.add(text2);
        group.add(text3);
        group.add(text4);
        group.add(text5);
        group.add(text6);
        group.add(text7);
        group.add(text8);
        group.add(text9);
        group.add(text10);
        group.add(text11);
        group.add(text12);
        this.scene.add(group);
    }

    //创建直线
    private createLine() {
        //两点画一条直线
        const startPoint = new Vector3(-139, -139, 0);
        const endPoint = new Vector3(139, 139, 0);
        if (this.browserInfo.isIpad) {
            this.line = this.dashline.addLine(startPoint, endPoint, '#0094FF', 6, false);
        } else {
            this.line = this.dashline.addLine(startPoint, endPoint, '#0094FF', 1600, false);
        }
        this.scene.add(this.line);
    }

    //创建交点
    createJPoint() {
        this.jpoint = Utils.createPoint1(1.5, 'red', 0, 0);
        this.scene.add(this.jpoint);
    }
    //创建倾斜角
    createQxAngle() {
        const arcGeometry = new THREE.CircleBufferGeometry(10, 32, 0, Math.PI / 4);
        const arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });
        this.qxAngle = new THREE.Mesh(arcGeometry, arcMaterial);
        this.qxAngle.add(this.createText(12, 10));
        this.qxAngle.position.set(0, 0, 0);
        this.scene.add(this.qxAngle);

        //绘制文字

    }

    //重绘倾斜角
    resetQxAngle(qxangle: number, x: number, y: number, z: number) {
        this.removeQxAngle();
        const arcGeometry = new THREE.CircleBufferGeometry(10, 32, 0, qxangle);
        const arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });
        this.qxAngle = new THREE.Mesh(arcGeometry, arcMaterial);
        this.qxAngle.add(this.createText(12, 10));
        this.qxAngle.position.set(x, y, z);
        this.scene.add(this.qxAngle);
    }

    //删除倾斜角
    removeQxAngle() {
        if (this.qxAngle && this.qxAngle != null) {
           this.scene.remove(this.theta);
            this.scene.remove(this.qxAngle);
            this.qxAngle.geometry.dispose();
            this.qxAngle.material.dispose();
        }
    }

    //删除直线
    removeLine() {
        if (this.line && this.line != null) {
            this.scene.remove(this.line);
            this.line.geometry.dispose();
            this.line.material.dispose();
        }

    }

    //重新绘制直线
    resetDrawLine(startPoint: any, endPoint: any) {
        this.removeLine();
        if (this.browserInfo.isIpad) {
            this.line = this.dashline.addLine(startPoint, endPoint, '#0094FF', 6, false);
        } else {
            this.line = this.dashline.addLine(startPoint, endPoint, '#0094FF', 1600, false);
        }
        this.scene.add(this.line);
    }

    //绘制直角
    createRightAngle(x: number, y: number, z: number) {
        const startPoint1 = new Vector3(x + 0.6, y + 5, 0);
        const endPoint1 = new Vector3(x + 5.5, y + 5, 0);

        const startPoint2 = new Vector3(x + 5, y + 5, 0);
        const endPoint2 = new Vector3(x + 5, y, 0);
      
        if (this.browserInfo.isIpad) {
           this.rightAngle1  = this.dashLine.addLine(startPoint1, endPoint1, 'red', 3, false);
            this.rightAngle2 = this.dashLine.addLine(startPoint2, endPoint2, 'red', 3, false);
        } else {
            this.rightAngle1 = this.dashLine.addLine(startPoint1, endPoint1, 'red', 1600, false);
            this.rightAngle2 = this.dashLine.addLine(startPoint2, endPoint2, 'red', 1600, false);
        }
        //绘制直角
        this.rightAngle1.add( this.createText(x + 10, y + 10));
        this.scene.add(this.rightAngle1);
        this.scene.add(this.rightAngle2);
    }


    //移除直角方法
    removeRightAngle() {
        if (this.rightAngle1 && this.rightAngle1 != null) {
            this.scene.remove(this.theta);
            this.scene.remove(this.rightAngle1);
            this.rightAngle1.geometry.dispose();
            this.rightAngle1.material.dispose();
        }

        if (this.rightAngle2 && this.rightAngle2 != null) {
            this.scene.remove(this.rightAngle2);
            this.rightAngle2.geometry.dispose();
            this.rightAngle2.material.dispose();
        }
    }

    //创建圆弧文字
    createText(x: number, y: number) {
        this.theta = Utils.createText('θ', x , y , 0, 'red');
        return this.theta;
    }
    
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
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
    initLight(): void {

    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置模型的初始位置
    resetModelPosition() {
        //移除直线
        this.removeLine();
        //创建直线
        this.createLine();
        //重置直线与y轴的交点位置
        this.jpoint.position.set(0, 0, 0);
        //移除直角
        this.removeRightAngle();
    }

}

