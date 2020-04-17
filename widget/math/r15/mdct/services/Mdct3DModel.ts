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

import * as fangkuaiBin from '../sub_static/model/fangkuai.bin';
import * as fangkuaiGltf from '../sub_static/model/fangkuai.gltf';
import * as juXingBin from '../sub_static/model/juxing.bin';
import * as juXingGltf from '../sub_static/model/juxing.gltf';

import {Scene} from 'three';

export class Mdct3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private controls: any;

    private lastPoint: any;
    private currentPoint: any;

    // 第一个白色点
    private whitePoint1: any;
    // 第二个白色点
    private whitePoint2: any;

    // 第一个白色点拖动
    private dargControls1: any;
    // 第二个白色点拖动
    private dargControls2: any;

    // 白色面
    private whitePlan: any;

    // 是否可以拖动
    private canDrag = true;

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();

    static preload() {
        const modelArray = [fangkuaiBin, fangkuaiGltf, juXingBin, juXingGltf];
        console.log(modelArray.length);
    }

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
        let multiple = 4;
        if (this.browserInfo.isSmallDevice) {
            multiple = 3;

        } else {
            multiple = 8;
        }

        this.camera =  new THREE.OrthographicCamera( this.width / -multiple, this.width / multiple, this.height / multiple,
            this.height / -multiple, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0,  50,  270);
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

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.2);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 0, 100 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.1);
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.set( 100, 0, -100 );
        dirLight2.position.multiplyScalar( 30 );
        this.scene.add( dirLight2 );
    }

    init3DModel() {
        this.addRectangle();
        this.addModel2();
        this.addPlan();

        this.addwhitePoint1();
        this.addwhitePoint2();
    }

    // 添加长方体模型
    async addRectangle() {
        const model: any = await this.gltfLoader(juXingGltf as any);
        model.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
                (child as any).scale.set(40, 40, 40);

                (child as any).rotation.y = Math.PI / 7;
                // (child as any).rotation.z = Math.PI / 18;
            }
        });

        const material = new THREE.MeshBasicMaterial( {color: '#1ACEFF'} );
        const materialSphFill = new THREE.MeshPhongMaterial({color : '#1ACEFF', specular: '#0199FF', shininess: 30,
            side: THREE.DoubleSide});
        (this.obj1.children[0].children[0] as any).material = materialSphFill;

        this.scene.add(this.obj1);
    }

    // 添加不规则立体模型
    async addModel2() {
        // 加载场景1中心小球
        const model: any = await this.gltfLoader(fangkuaiGltf as any);
        model.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
                (child as any).scale.set(40, 40, 40);
                (child as any).position.y = 8;

                (child as any).rotation.y = Math.PI / 7;
                // (child as any).rotation.z = Math.PI / 18;
            }
        });
        const material = new THREE.MeshBasicMaterial( {color: '#1ACEFF'} );
        const materialSphFill = new THREE.MeshPhongMaterial({color : '#1ACEFF', specular: '#0199FF', shininess: 30,
            side: THREE.DoubleSide});
        (this.obj2.children[0].children[0] as any).material = materialSphFill;

        this.obj2.visible = false;
        this.scene.add(this.obj2);
    }

    // 添加遮挡面，用于遮住两个模型
    addPlan() {
        const geometry2 = new THREE.BoxBufferGeometry( 120, 150, 150);
        const material2 = new THREE.MeshBasicMaterial( {color: '#fff'} );
        this.whitePlan = new THREE.Mesh( geometry2, material2 );
        this.scene.add( this.whitePlan );
        this.whitePlan.position.x = 4;
        this.whitePlan.rotation.y = Math.PI / 7;
    }

    //添加点1 和其拖动事件
    addwhitePoint1() {
        // 白色圈
        this.whitePoint1 = this.createPoint(6, '#ffffff', -51, 30, 80);
        const whitePoint1 = this.createPoint2(6, 6.3, '#000000', 0, 0);
        this.whitePoint1.add(whitePoint1);
        this.scene.add(this.whitePoint1);
        this.dargControls1 = new dragcontrols([this.whitePoint1], this.camera, this.renderer.domElement);

        // 开始拖动
        this.dargControls1.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;
            this.whitePoint2.visible = false;
            this.obj2.visible = false;
            this.obj1.visible = true;
            ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
        } );

        // 拖动结束
        this.dargControls1.addEventListener( 'dragend', () => {
            // 停止拖动  隐藏点
            this.controls.enabled = true;
        } );

        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-51, 0, 0);

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
            this.currentPoint = new THREE.Vector3(this.whitePoint1.position.x, 0, 0);

            // 限制白色点不给向左拖动
            if (this.currentPoint.x - this.lastPoint.x < 0) {
                this.whitePoint1.position.x = this.lastPoint.x;
            } else {
                this.lastPoint = this.currentPoint;
            }

            this.whitePoint1.position.y = 30;

            // 限制白色点向右拖动的最大距离
            if (this.whitePoint1.position.x + 51 > 100) {
                this.whitePoint1.position.x = 100 - 51;
                this.whitePoint1.visible = false;
                this.whitePlan.visible = false;
                // 可以旋转
                this.controls.noRotate = false;
            }

            this.whitePlan.position.x = (this.whitePoint1.position.x + 51 + 4) / Math.cos(Math.PI / 5);
        });
    }

    //添加点2 和其拖动事件
    addwhitePoint2() {
        // 白色圈
        this.whitePoint2 = this.createPoint(6, '#ffffff', -51, -15, 80);
        const whitePoint2 = this.createPoint2(6, 6.3, '#000000', 0, 0);
        this.whitePoint2.add(whitePoint2);
        this.scene.add(this.whitePoint2);

        this.dargControls2 = new dragcontrols([this.whitePoint2], this.camera, this.renderer.domElement);

        // 开始拖动
        this.dargControls2.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;
            this.whitePoint1.visible = false;
            this.obj1.visible = false;
            this.obj2.visible = true;
            ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
        } );

        // 拖动结束
        this.dargControls2.addEventListener( 'dragend', () => {
            // 停止拖动  隐藏点
            this.controls.enabled = true;
        } );

        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-51, 0, 0);

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
            this.currentPoint = new THREE.Vector3(this.whitePoint2.position.x, 0, 0);

            // 限制白色点不给向左拖动
            if (this.currentPoint.x - this.lastPoint.x < 0) {
                this.whitePoint2.position.x = this.lastPoint.x;
            } else {
                this.lastPoint = this.currentPoint;
            }

            this.whitePoint2.position.y = -15;

            // 限制白色点向右拖动的最大距离
            if (this.whitePoint2.position.x + 51 > 100) {
                this.whitePoint2.position.x = 100 - 51;
                this.whitePoint2.visible = false;
                this.whitePlan.visible = false;

                // 可以旋转
                this.controls.noRotate = false;
            }

            this.whitePlan.position.x = (this.whitePoint2.position.x + 51 + 4) / Math.cos(Math.PI / 5);
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
        // 显示遮挡面
        this.whitePlan.visible = true;
        // 显示点
        this.whitePoint1.visible = true;
        this.whitePoint2.visible = true;
        // 显示初始模型
        this.obj1.visible = true;
        this.obj2.visible = false;

        // 设置回到初始位置
        this.whitePlan.position.x = 4;
        this.whitePoint1.position.x = -51;
        this.whitePoint2.position.x = -51;

        // 拖动初始坐标
        this.lastPoint = new THREE.Vector3(-51, 0, 0);

        // 禁止旋转
        this.controls.noRotate = true;

        this.resetCamera();

        ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = true;
    }

    resetCamera() {
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0,  50,  270);

        for (let i = 0; i < 21; i++) {
            this.controls.reset();
        }
    }
}
