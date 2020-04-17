import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Line} from '../../../../../src/three/component/Line';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');
// const OrbitControls = require('three-orbitcontrols');
const TrackballControls = require('three-trackballcontrols');

const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);
export class Pmgl13dModel extends ThreeBase {

    planeMesh: Mesh;
    private controls: any;
    private text1: any;
    private text2: any;
    private point1: THREE.Mesh;
    private point2: THREE.Mesh;
    private line: any;
    private smallPoint1: THREE.Mesh;
    private smallPoint2: THREE.Mesh;
    private lineLable: any;
    private createLineHelper = new Line();
    private lineWidth = BrowserUtil.getBrowserInfo().os === 'iOS' ? 3 : 3000;
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
        // this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGirdding();
        this.createPoint();
        this.createLine();
        this.createWord();
        this.bindDragEventToPoint();
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
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(396,  491,  403);
    }


    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
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
        this.controls.noRotate = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 400, 20, 0xAEAEAE, 0xAEAEAE  );
        this.scene.add( helper );
    }

    //创建两个初始点
    createPoint() {
        this.point1 = ThreeUtil.createSphere(20, '#000000', 0.001,  100, 0, -100);
        this.point2 = ThreeUtil.createSphere(20, '#000000', 0.001,  -100, 0, 100);
        this.smallPoint1 = ThreeUtil.createSphere(7, '#7ecaf0', 1);
        this.smallPoint2 = ThreeUtil.createSphere(7, '#7ecaf0', 1);
        this.point1.renderOrder = 2;
        this.point2.renderOrder = 2;
        this.smallPoint1.renderOrder = 1;
        this.smallPoint2.renderOrder = 1;
        this.point1.add(this.smallPoint1);
        this.point2.add(this.smallPoint2);
        this.scene.add(this.point1);
        this.scene.add(this.point2);
    }

    //初始化直线
    createLine() {
        this.line = this.createLineHelper.createLine({
            startPoint: new THREE.Vector3(100, 0, -100),
            endPoint: new THREE.Vector3(-100, 0, 100),
            color: '#4a90e2',
            lineWidth: this.lineWidth,
        });
        this.scene.add(this.line);
    }

    //删除线的方法
    removeLine() {
        this.scene.remove(this.line);
        this.line.geometry.dispose();
        this.line.material.dispose();
    }

    //在点移动的时候重新设置线
    resetLine( x: number, z: number, x1: number, z1: number) {
        this.removeLine();
        this.line = this.createLineHelper.createLine({
            startPoint: new THREE.Vector3(x, 0, z),
            endPoint: new THREE.Vector3(x1, 0, z1),
            color: '#4a90e2',
            lineWidth: this.lineWidth,
        });
        this.scene.add(this.line);
    }

    //给点绑定拖动事件
    bindDragEventToPoint() {
        const dargControls = new dragcontrols([this.point1], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            (this.smallPoint1.material as THREE.Material).opacity = 0.3;
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.point1.position.y = 0;
            this.point2.position.y = 0;
            this.text2.position.set(this.point1.position.x, -10, this.point1.position.z);
            this.lineLable.position.set((this.point1.position.x + this.point2.position.x) / 2,
                0, (this.point1.position.z + this.point2.position.z) / 2);
            this.removeLine();
            this.resetLine(this.point1.position.x, this.point1.position.z, this.point2.position.x, this.point2.position.z);
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            (this.smallPoint1.material as THREE.Material).opacity = 1;
        } );

        const dargControls1 = new dragcontrols([this.point2], this.camera, this.renderer.domElement);
        dargControls1.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            (this.smallPoint2.material as THREE.Material).opacity = 0.3;
        } );
        dargControls1.addEventListener( 'drag', ( event: any) => {
            this.point1.position.y = 0;
            this.point2.position.y = 0;
            this.text1.position.set(this.point2.position.x, -10, this.point2.position.z);


            this.lineLable.position.set((this.point1.position.x + this.point2.position.x) / 2,
                0, (this.point1.position.z + this.point2.position.z) / 2);
            this.removeLine();
            this.resetLine(this.point1.position.x, this.point1.position.z, this.point2.position.x, this.point2.position.z);
        } );
        dargControls1.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            (this.smallPoint2.material as THREE.Material).opacity = 1;
        } );
    }

    //重置场景方法
    reset() {
        this.point1.position.set(100, 0, -100);
        this.point2.position.set(-100, 0, 100);
        this.text1.position.set(-100, -10, 100);
        this.text2.position.set(100, -10, -100);
        this.lineLable.position.set(0, -10, 0);
        this.removeLine();
        this.createLine();
    }

    createWord() {
        const scale = 0.3;
         this.text1 = ThreeUtil.createNewRomanText('A', -100, -10, 100, '#000000', scale);
         this.text2 = ThreeUtil.createNewRomanText('B', 100, -10, -100, '#000000', scale);
         this.lineLable = ThreeUtil.createNewRomanText('l₁', 0, -10, 0, '#000000', scale);
         this.scene.add(this.text1);
         this.scene.add(this.text2);
         this.scene.add(this.lineLable);
    }

}




