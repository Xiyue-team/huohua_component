/**
 *初始化3d场景类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/12/12 10:10
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ConeCurve3DModel } from './ConeCurve3DModel';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

export class ConeCurve3DScene extends ThreeBase {
    private controls: any;

    coneCurve3DModel: ConeCurve3DModel;

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
      let scale = window.innerWidth / 270;
      if ((window as any)['env'].browserInfo.isIpad) {
        scale = window.screen.width / 180;
      } else if ((window as any)['env'].browserInfo.isIphone) {
        scale = window.screen.width / 180;
      } else if ((window as any)['env'].browserInfo.isSmallDevice) {
        scale = window.screen.width / 400;
      }

      const left    = this.width / - scale;
      const right   = this.width / scale;
      const top     = this.height / scale;
      const bottom  = this.height / - scale;
      const near    = -500;
      const far     = 1000;
      this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera.position.set(0, 0, 300);

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
      const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.3);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
      dirLight2.position.set( -100, 0, -100 );
      this.scene.add( dirLight2 );
    }


    init3DModel() {
      this.coneCurve3DModel = new ConeCurve3DModel(this.scene, this.camera, this.renderer);
    }

    reset() {
        this.coneCurve3DModel.reset();
    }
}
