/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {ViewController} from '../../../../../src/core/ViewController';
import {CreatePyramidHelper} from './CreatePyramidHelper';
import {CreateCylinderHelper} from './CreateCylinderHelper';

export class Xdcm3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private controls: any;

    private lastPoint: any;
    private currentPoint: any;

    // 第一个白色点
    private whitePoint1: any;
    // 第二个白色点
    private whitePoint2: any;
    // 第三个白色点
    private whitePoint3: any;

    // 第一个白色点拖动
    private dargControls1: any;
    // 第二个白色点拖动
    private dargControls2: any;
    // 第三个白色点拖动
    private dargControls3: any;

    // 椎体面
    private cone: any;
    // 矩形面
    private plane: any;
    // 圆柱面
    private columnar: any;

    private pyramid: CreatePyramidHelper;
    private cylinder: CreateCylinderHelper;


    // 是否可以拖动
    private canDrag = true;

    private obj = new THREE.Object3D();

    private render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);
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
        this.init3DModel();


        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
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


        let multiple = 5;
        if (this.browserInfo.isSmallDevice) {
            multiple = 4;

        } else {
            multiple = 8;
        }

        this.camera =  new THREE.OrthographicCamera( this.width / -multiple, this.width / multiple, this.height / multiple,
            this.height / -multiple, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0,  0,  270);
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

        const light = new THREE.HemisphereLight( '#ffeeee', '#8FA6D5', 1 );
        light.position.set(0, 50, 0);
        this.scene.add( light );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.1);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -20, 0, 100 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
    }

    init3DModel() {
        this.scene.add(this.obj);

        this.addwhitePoint1();
        this.addwhitePoint2();
        this.addwhitePoint3();
    }

    //添加点1 和其拖动事件
    addwhitePoint1() {
        // 白色圈
        this.whitePoint1 = this.createPoint(6, '#ffffff', -75, 50);
        const whitePoint1 = this.createPoint2(6, 6.3, '#000000', 0, 0);
        this.whitePoint1.add(whitePoint1);

        this.scene.add(this.whitePoint1);

        this.dargControls1 = new dragcontrols([this.whitePoint1], this.camera, this.renderer.domElement);

        this.pyramid = new CreatePyramidHelper();

        const geometry = this.pyramid.addPyramid(32, 100, 0);
        const materialSphFill = new THREE.MeshPhongMaterial({color : '#1ACEFF', specular: '#ffffff', shininess: 30,
                side: THREE.DoubleSide});
        this.cone = new THREE.Mesh( geometry, materialSphFill );
        this.scene.add( this.cone );

        // 开始拖动
        this.dargControls1.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;
            this.whitePoint2.visible = false;
            this.whitePoint3.visible = false;

            ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
        } );

        // 拖动结束
        this.dargControls1.addEventListener( 'dragend', () => {
            // 停止拖动  隐藏点
            this.controls.enabled = true;
        } );

        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-75, 0, 0);

        this.whitePoint1Drag();
    }

    // 白色点1被拖动事件
    whitePoint1Drag() {
        // 拖动
        this.dargControls1.addEventListener( 'drag', () => {
            if (!this.canDrag) {
                return;
            }

            //拖动中坐标
            this.currentPoint = new THREE.Vector3(this.whitePoint1.position.x, this.whitePoint1.position.y, 0);

            // 限制白色点不给向左拖动
            if (this.currentPoint.x - this.lastPoint.x < 0) {
                this.whitePoint1.position.x = this.lastPoint.x;
            } else {
                this.lastPoint = this.currentPoint;
            }

            // x坐标超出25时,隐藏白色点
            if (this.whitePoint1.position.x > 25) {
                this.whitePoint1.position.x = 25;

                this.whitePoint1.visible = false;

                // 可以旋转
                this.controls.noRotate = false;
            }

            // 绘制圆锥面
            this.cone.geometry.dispose();
            this.cone.geometry = this.pyramid.addPyramid(32, 100, (this.whitePoint1.position.x + 75) / 100 * Math.PI / 3 * 2);
        });
    }

    //添加点2 和其拖动事件
    addwhitePoint2() {
        // 白色圈
        this.whitePoint2 = this.createPoint(6, '#ffffff', -75, 0);
        const whitePoint2 = this.createPoint2(6, 6.3, '#000000', 0, 0);
        this.whitePoint2.add(whitePoint2);
        this.scene.add(this.whitePoint2);

        // 矩形面
        const geometry = new THREE.PlaneGeometry( 1, 100, 32 );
        const material = new THREE.MeshBasicMaterial( {color: '#1ACEFF', side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( geometry, material );
        this.scene.add( this.plane );
        this.plane.position.x = -75;
        this.plane.position.z = -1;

        this.dargControls2 = new dragcontrols([this.whitePoint2], this.camera, this.renderer.domElement);

        // 开始拖动
        this.dargControls2.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;

            this.whitePoint1.visible = false;
            this.whitePoint3.visible = false;

            ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
        } );

        // 拖动结束
        this.dargControls2.addEventListener( 'dragend', () => {
            // 停止拖动  隐藏点
            this.controls.enabled = true;
        } );

        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-75, 0, 0);

        this.whitePoint2Drag();
    }

    // 白色点2被拖动事件
    whitePoint2Drag() {
        // 拖动
        this.dargControls2.addEventListener( 'drag', () => {
            if (!this.canDrag) {
                return;
            }

            //拖动中坐标
            this.currentPoint = new THREE.Vector3(this.whitePoint2.position.x, this.whitePoint2.position.y, 0);

            if (this.currentPoint.x - this.lastPoint.x < 0) {
                this.whitePoint2.position.x = this.lastPoint.x;
            } else {
                this.lastPoint = this.currentPoint;
            }

            if (this.whitePoint2.position.x > 75) {
                this.whitePoint2.position.x = 75;

                this.whitePoint2.visible = false;

                // 可以旋转
                this.controls.noRotate = false;
            }

            this.plane.geometry.dispose();
            this.plane.geometry = new THREE.PlaneGeometry( this.whitePoint2.position.x + 75, 100, 32 );
            this.plane.position.x =  (this.whitePoint2.position.x + 75) / 2 - 75;

        });
    }

    //添加点3 和其拖动事件
    addwhitePoint3() {
        // 白色圈
        this.whitePoint3 = this.createPoint(6, '#ffffff', -75, -50);
        const whitePoint3 = this.createPoint2(6, 6.3, '#000000', 0, 0);
        this.whitePoint3.add(whitePoint3);
        this.scene.add(this.whitePoint3);

        this.dargControls3 = new dragcontrols([this.whitePoint3], this.camera, this.renderer.domElement);

        this.cylinder = new CreateCylinderHelper();

        const geometry = this.cylinder.addCylinder(32, 100, 0);
        const materialSphFill = new THREE.MeshPhongMaterial({color : '#1ACEFF', specular: '#0199FF', shininess: 30,
            side: THREE.DoubleSide});
        this.columnar = new THREE.Mesh( geometry, materialSphFill );
        this.scene.add( this.columnar );

        // 开始拖动
        this.dargControls3.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;

            this.whitePoint1.visible = false;
            this.whitePoint2.visible = false;

            ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
        } );

        // 拖动结束
        this.dargControls3.addEventListener( 'dragend', () => {
            // 停止拖动  隐藏点
            this.controls.enabled = true;
        } );


        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-75, 0, 0);

        this.whitePoint3Drag();
    }

    // 白色点3被拖动事件
    whitePoint3Drag() {
        // 拖动
        this.dargControls3.addEventListener( 'drag', () => {
            if (!this.canDrag) {
                return;
            }

            //拖动中坐标
            this.currentPoint = new THREE.Vector3(this.whitePoint3.position.x, this.whitePoint3.position.y, 0);

            // 限制白色点不给向左拖动
            if (this.currentPoint.x - this.lastPoint.x < 0) {
                this.whitePoint3.position.x = this.lastPoint.x;
            } else {
                this.lastPoint = this.currentPoint;
            }

            // x坐标超出58时,隐藏白色点
            if (this.whitePoint3.position.x > 58) {
                this.whitePoint3.position.x = 58;

                this.whitePoint3.visible = false;

                // 可以旋转
                this.controls.noRotate = false;
            }

            // 绘制圆柱面
            this.columnar.geometry.dispose();
            this.columnar.geometry = this.cylinder.addCylinder(32, 100, (this.whitePoint3.position.x + 75) / 133 * Math.PI / 18 * 8);
        });
    }

    // 创建点
    createPoint(r: number, color: string, x: number, y: number, z?: number) {
        z = !z ? 0 : z;
        const geometry = new THREE.CircleBufferGeometry( r, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color, transparent: true, opacity: 0.72} );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        return circle;
    }

    // 创建环
    createPoint2(innerRadius: number, outerRadius: number, color: string, x: number, y: number, z?: number) {
        z = !z ? 0 : z;
        const geometry = new THREE.RingBufferGeometry( innerRadius, outerRadius, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0.2} );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(x, y, z);
        return mesh;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        // 显示白色点
        this.whitePoint1.visible = true;
        this.whitePoint2.visible = true;
        this.whitePoint3.visible = true;

        this.whitePoint1.position.set(-75, 50, 0);
        this.whitePoint2.position.set(-75, 0, 0);
        this.whitePoint3.position.set(-75, -50, 0);

        //重新绘制圆锥面
        this.cone.geometry.dispose();
        this.cone.geometry = this.pyramid.addPyramid(32, 100, 0);

        // 重新绘制矩形面
        this.plane.geometry.dispose();
        this.plane.geometry = new THREE.PlaneGeometry( 1, 100, 32 );
        this.plane.position.x =  -75;

        // 重新绘制圆柱面
        this.columnar.geometry.dispose();
        this.columnar.geometry = this.cylinder.addCylinder(32, 100, 0);

        this.lastPoint = new THREE.Vector3(-75, 0, 0);

        // 停止旋转
        this.controls.noRotate = true;

        this.resetCamera();

        ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = true;
    }

    resetCamera() {
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0,  0,  270);

        for (let i = 0; i < 21; i++) {
            this.controls.reset();
        }
    }
}
