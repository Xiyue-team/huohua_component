import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { Yzqx3DModel } from './Yzqx3DModel';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

export class Yzqx3DScene extends ThreeBase {

    private controls: any;

    yzqx3DModel: Yzqx3DModel;

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
        this.init();
    }
     init() {
        this.initScene();
        this.initCamera();
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
      const near    = 0.1;
      const far     = 2000;
      this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
      this.camera.lookAt(new THREE.Vector3(0,  0,  0));
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

    init3DModel() {
      this.yzqx3DModel = new Yzqx3DModel(this.scene, this.camera, this.renderer);
    }

    reset() {
        this.yzqx3DModel.tydy.reset();
        this.yzqx3DModel.pwxdy.reset();
        this.yzqx3DModel.sqxdy.reset();
        this.yzqx3DModel.tydy.obj1.visible = true;
    }
}
