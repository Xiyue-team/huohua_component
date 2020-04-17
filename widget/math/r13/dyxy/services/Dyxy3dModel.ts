import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {DyxyUtils} from './DyxyUtils';
import {
    CircleConfig, DashLineConfig, FontConfig, LinePointPositionConfig, PlaneConfig, PointConfig,
    SphereConfig
} from './DyxyConfig';
import {DashLineUtils} from './DashLineUtils';
import {CircleLineUtils} from './CircleLineUtils';
const dragcontrols = require('three-dragcontrols').default;
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
OBJLoader(THREE);
export class Dyxy3dModel extends ThreeBase {

    planeMesh: Mesh;
    private controls: any;
    private plane: THREE.Mesh;
    private sphere: THREE.Mesh;
    private circle: THREE.Mesh;
    private point1: THREE.Mesh;
    private point2: THREE.Mesh;
    private point3: THREE.Mesh;
    private dashLineUtil = new DashLineUtils();
    private dashLine1: THREE.Mesh;
    private dashLine2: THREE.Mesh;
    private dashLine3: THREE.Mesh;
    private angleX: number;
    private angleY: number;
    private angleZ: number;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private text5: any;
    private text6: any;
    private text7: any;
    private CircleLineUtil = new CircleLineUtils();
    private CircleDashLine: any;
    private group = new THREE.Group();
    private rotateCenter: THREE.Mesh;
    private circleLine: any;


    private render = () => {


        requestAnimationFrame( this.render );
        this.controls.update();
        this.renderer.render( this.scene,  this.camera );
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
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.createPlane();
        this.createSphere();
        this.createCircle();
        this.createPoint();
        this.createDashLine();
        this.createText();
        this.createCircleDashLine();
        this.scene.add(this.group);
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 4) / (this.height / 4), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(-4,  -646,  377);
    }


    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
            // (this.renderer as THREE.WebGLRenderer).sortObjects = false;
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        // this.renderer = new CanvasRenderer.CanvasRenderer();
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }


    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl() {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = true;
        this.controls.noRotate = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.4));

        this.scene.add(this.lights[0]);

        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.7 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );

        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 200, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -200, -100);
        this.scene.add( c );
        this.scene.add( u );
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建一个平面
    createPlane() {
        this.rotateCenter = DyxyUtils.createPlane(0.1, 0.1, 0xffffff, 0.1);
        this.group.add(this.rotateCenter);
        this.plane = DyxyUtils.createPlane(PlaneConfig.width, PlaneConfig.height, PlaneConfig.color, PlaneConfig.opacity);
        //平面的实线边
        const line1 = DyxyUtils.createLine(0x0DB2FF, LinePointPositionConfig.Point1, LinePointPositionConfig.Point2);
        const line2 = DyxyUtils.createLine(0x0DB2FF, LinePointPositionConfig.Point2, LinePointPositionConfig.Point3);
        const line3 = DyxyUtils.createLine(0x0DB2FF, LinePointPositionConfig.Point3, LinePointPositionConfig.Point4);
        const line4 = DyxyUtils.createLine(0x0DB2FF, LinePointPositionConfig.Point4, LinePointPositionConfig.Point1);
        this.plane.add(line1);
        this.plane.add(line2);
        this.plane.add(line3);
        this.plane.add(line4);
        //平面的虚线边

        const dargControls = new dragcontrols([this.plane], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;

            if (this.plane.position.z > 100 || this.plane.position.z < -100 || this.plane.position.x !== 0) {
                dargControls.activate();
                if (this.plane.position.z > 100) {
                    this.plane.position.z = 101;
                }
                if (this.plane.position.z < -100) {
                    this.plane.position.z = -101;
                }
                if (this.plane.position.x !== 0) {
                    this.plane.position.x = 0;
                }
                if (this.plane.position.y !== 0) {
                    this.plane.position.y = 0;
                }
            }

        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            if (this.plane.position.z > 100 || this.plane.position.z < -100 || this.plane.position.x !== 0 || this.plane.position.y !== 0) {
                dargControls.activate();
                if (this.plane.position.z > 100) {
                    this.plane.position.z = 101;
                }
                if (this.plane.position.z < -100) {
                    this.plane.position.z = -101;
                }
                if (this.plane.position.x !== 0) {
                    this.plane.position.x = 0;
                }
                if (this.plane.position.y !== 0) {
                    this.plane.position.y = 0;
                }

            }
            if (this.plane.position.z !== 0) {
                this.text6.visible = true;
                this.text7.visible = true;
                this.text4.visible = true;
            }
            if (this.plane.position.z === 0) {
                this.text6.visible = true;
                this.text7.visible = true;
                this.text4.visible = true;
            }
            this.setTextPosition();
            this.removeCircle();
            this.resetCircle(this.plane.position.z);
            this.resetPointPosition(this.plane.position.z);
            this.removeDashLine();
            this.createDashLine();
            this.resetTextPosition();
            this.removeCircleDashLine();
            this.resetCircleDashLine(this.plane.position.z);
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; } );
        this.group.add(this.plane);
        this.plane.renderOrder = 1;

    }

    //获取滑动条的值并将旋转角度赋给变量
    //X轴旋转角度
    getXRotateAngle(angle: number) {
        this.angleX = Math.PI / 180 * angle;
        this.group.rotateX(this.angleX);
    }

    //Y轴旋转角度
    getYRotateAngle(angle: number) {
        this.angleY = Math.PI / 180 * angle;
        this.group.rotateZ(this.angleY);
    }

    //Z轴旋转角度
    getZRotateAngle(angle: number) {
        this.angleZ = Math.PI / 180 * angle;
        this.group.rotateY(this.angleZ);
    }


    //创建一个球
    createSphere() {
        this.sphere = DyxyUtils.createSphere(SphereConfig.d, SphereConfig.color, SphereConfig.opacity);
        this.scene.add(this.sphere);
    }

    //创建球内圆形平面
    createCircle() {
        this.circle = DyxyUtils.createCircle(CircleConfig.d, CircleConfig.color);
        this.group.add(this.circle);
        this.circle.renderOrder = 998;
    }

    //删除圆形平面的方法
    removeCircle() {
        this.circle.geometry.dispose();
        (this.circle.material as any).dispose();
        this.group.remove(this.circle);
    }

    //重新设置圆形平面的位置
    resetCircle(height: number) {
        const d = Math.sqrt((Math.pow(CircleConfig.d, 2) - Math.pow(height, 2)));
        this.circle = DyxyUtils.createCircle(d, CircleConfig.color);
        this.circle.position.z = height;
        this.group.add(this.circle);
    }

    //创建三个球内点
    createPoint() {
        this.point1 = DyxyUtils.createPoint(PointConfig.d, PointConfig.color);
        this.point2 = DyxyUtils.createPoint(PointConfig.d, PointConfig.color);
        this.point3 = DyxyUtils.createPoint(PointConfig.d, PointConfig.color);
        this.group.add(this.point1);
        this.group.add(this.point2);
        this.group.add(this.point3);
        this.point3.position.set(-100, 0, 0);
    }

    //重置三个点的位置
    resetPointPosition(height: number) {
        const x = - Math.sqrt((Math.pow(CircleConfig.d, 2) - Math.pow(height, 2)));
        this.point2.position.z = height;
        this.point3.position.set(x, 0, height);
    }

    //创建三条虚线
    createDashLine() {
        const point1 = new THREE.Vector3(this.point1.position.x, this.point1.position.y, this.point1.position.z);
        const point2 = new THREE.Vector3(this.point2.position.x, this.point2.position.y, this.point2.position.z);
        const point3 = new THREE.Vector3(this.point3.position.x, this.point3.position.y, this.point3.position.z);
        this.dashLine1 = this.dashLineUtil.addLine(point1, point2, DashLineConfig.color, DashLineConfig.width, true);
        this.dashLine2 = this.dashLineUtil.addLine(point2, point3, DashLineConfig.color, DashLineConfig.width, true);
        this.dashLine3 = this.dashLineUtil.addLine(point3, point1, DashLineConfig.color, DashLineConfig.width, true);
        this.group.add(this.dashLine1);
        this.group.add(this.dashLine2);
        this.group.add(this.dashLine3);
        this.dashLine1.renderOrder = 999;
        this.dashLine2.renderOrder = 999;
        this.dashLine3.renderOrder = 999;
    }


    removeDashLine() {
        this.dashLine1.geometry.dispose();
        (this.dashLine1.material as any).dispose();
        this.dashLine2.geometry.dispose();
        (this.dashLine2.material as any).dispose();
        this.dashLine3.geometry.dispose();
        (this.dashLine3.material as any).dispose();
        this.group.remove(this.dashLine1);
        this.group.remove(this.dashLine2);
        this.group.remove(this.dashLine3);
    }

    //创建文字的方法
    createText() {
        this.text1 = DyxyUtils.createText(FontConfig.text1, 6, 0, 0, FontConfig.color1);
        this.scene.add(this.text1);
        this.text2 = DyxyUtils.createText(FontConfig.text2, -6, 0, 0, FontConfig.color1);
        this.point3.add(this.text2);
        this.text3 = DyxyUtils.createText(FontConfig.text3, -230, -180, 0, FontConfig.color1);
        this.plane.add(this.text3);
        this.text4 = DyxyUtils.createText(FontConfig.text4, 6, 0, 0, FontConfig.color1);
        this.point2.add(this.text4);
        this.text5 = DyxyUtils.createText(FontConfig.text5, -50, 0, 20, FontConfig.color2);
        this.text6 = DyxyUtils.createText(FontConfig.text6, 10, 0, 0, FontConfig.color2);
        this.text7 = DyxyUtils.createText(FontConfig.text7, -30, 0, -12, FontConfig.color2);
        this.group.add(this.text5);
        this.group.add(this.text6);
        this.group.add(this.text7);
        this.text6.visible = false;
        this.text7.visible = false;
        this.text4.visible = false;
    }

    //设置文字的位置
    setTextPosition() {
        if (this.plane.position.z > 0) {
            this.text7.position.z = this.plane.position.z + 15;
            if (this.plane.position.z > 100 ) {
                this.text7.visible = false;
                this.text6.visible = false;
            }
        } else {
            this.text7.position.z = this.plane.position.z;
            if ( this.plane.position.z < -100) {
                this.text7.visible = false;
                this.text6.visible = false;
            }
        }

    }


    //重新设置文字位置
    resetTextPosition() {
        const x  = this.point3.position.x / 2;
        const y  = this.point3.position.y / 2;
        const z  = this.point3.position.z / 2;
        const x1 = this.point2.position.x / 2;
        const y1 = this.point2.position.y / 2;
        const z1 = this.point2.position.z / 2;
        this.text5.position.set(x, y, z);
        this.text6.position.set(x1 + 10, y1, z1);
        if (this.plane.position.z === 101) {
            this.text5.position.set(10, 10, 50);
        }
        if (this.plane.position.z === -101) {
            this.text5.position.set(10, 10, -50);
        }
    }

    //绘制圆形虚线
    createCircleDashLine() {
        this.CircleDashLine = this.CircleLineUtil.addEllipseLine(101, 0x000000, 2, 3, 2 * Math.PI);
        this.group.add(this.CircleDashLine);
        this.circleLine = this.CircleLineUtil.addEllipseLine(101, 0x000000, 3, 4, 2 * Math.PI);
        this.group.add(this.circleLine);
    }

    //删除圆形虚线
    removeCircleDashLine() {
        this.CircleDashLine.geometry.dispose();
        this.CircleDashLine.material.dispose();
        this.group.remove(this.CircleDashLine);
        this.circleLine.geometry.dispose();
        this.circleLine.material.dispose();
        this.group.remove(this.circleLine);
    }

    //重新设置圆形虚线的位置
    resetCircleDashLine( position: number) {
        const d = Math.sqrt((Math.pow(CircleConfig.d, 2) - Math.pow(position, 2)));
        this.CircleDashLine = this.CircleLineUtil.addEllipseLine(d + 1, 0x000000, 2, 3, 2 * Math.PI);
        this.group.add(this.CircleDashLine);
        this.CircleDashLine.position.z = position;
        this.circleLine = this.CircleLineUtil.addEllipseLine(d + 1, 0x000000, 3, 4, 2 * Math.PI);
        this.group.add(this.circleLine);
        this.circleLine.position.z = position;
    }

    //重置按钮功能
    reset() {
        this.point1.position.set(0, 0, 0);
        this.point2.position.set(0, 0, 0);
        this.point3.position.set(-100, 0, 0);
        this.plane.position.set(0, 0, 0);
        this.group.rotation.set(0, 0, 0);
        this.text5.position.set( -50, 0, 20);
        this.text6.visible = false;
        this.text7.visible = false;
        this.text4.visible = false;
        this.removeCircle();
        this.resetCircle(this.plane.position.z);
        this.resetPointPosition(this.plane.position.z);
        this.removeDashLine();
        this.createDashLine();
        this.removeCircleDashLine();
        this.createCircleDashLine();
    }



}




