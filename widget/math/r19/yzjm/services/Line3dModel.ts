import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import common from './CommonForThree';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
let thiz: any = null;
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {

    private controls: any;
    private coneUp: any;
    private coneDown: any;

    private render = () => {
        requestAnimationFrame(this.render);


        // this.controls.update();
        this.renderer.render(this.scene, this.camera);
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }

    init(): void {
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initElement(this.controls);
        this.createBase();
    }

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

    //初始化摄像机位置
    resetCamera(): void {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    // 初始化场景内元素
    initElement(controls: any) {
    }
    createBase() {

    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {

    }


}




