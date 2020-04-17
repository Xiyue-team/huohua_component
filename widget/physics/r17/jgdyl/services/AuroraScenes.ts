/**
 * 整体场景
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-27 上午11:11
 *
 */
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import { PerspectiveCamera, WebGLRenderer} from 'three';

const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
import * as THREE from 'three';
import {MicroModel} from './MicroScenes';
import {MacroModel} from './MacroScenes';
import * as bg from '../sub_static/bg@2x.png';

export class AuroraScenes extends  ThreeBase {

    private orbit: any;
    macroModel: MacroModel;
    microModel: MicroModel;

    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        //this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();

        this.macroModel = new MacroModel(this.scene, this.camera , this.width, this.height, this.domElement,
            this.renderer as WebGLRenderer);
        this.microModel = new MicroModel(this.scene, this.orbit);

         this.microModel.hideScene();
        //this.macroModel.hideScene();
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

      const rotate = 12;
      const left    = this.width / - rotate;
      const right   = this.width / rotate;
      const top     = this.height / rotate;
      const bottom  = this.height / - rotate;
      const near    = -500;
      const far     = 1000;
      this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera.position.set(10, 0, 100);

        /*this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 1000);
        this.camera.position.set(3.55, 0,  128);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);*/
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true,
                alpha: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        this.renderer.setSize(this.width , this.height);
        (this.renderer as WebGLRenderer).autoClear = true;

        (this.renderer as WebGLRenderer).setClearColor(0xffffff , 0 );

        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;
        //是否开启右键拖拽
        this.orbit.enablePan = false;

        // 设置场景不可选装
        this.orbit.enableRotate = false;
        // 限制拖动
        // this.orbit.minAzimuthAngle = -Math.PI * 2;
        // this.orbit.maxAzimuthAngle = Math.PI * 2;

        // this.orbit.minPolarAngle = Math.PI * 0 / 180; // radians
        // this.orbit.maxPolarAngle = Math.PI * 1 / 2; // radians
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        // this.lights = [];
        //
        // this.lights.push(new THREE.AmbientLight( 0xffffff, 1));
        //
        // this.scene.add(this.lights[0]);
        //
        // const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
        // directionalLight4.color.setHSL(.6, 1, .6);
        // directionalLight4.groundColor.setHSL(.095, 1, .75);
        // directionalLight4.position.set(0, 0, 0);
        // this.scene.add( directionalLight4 );
        //
        // const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        // c.position.set(200, 2000, 100);
        // const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        // u.position.set(-200, -2000, -100);
        // this.scene.add( c );
        // this.scene.add( u );
      // const xMap = THREE.ImageUtils.loadTexture(bg as any, null);
      // const material = new THREE.MeshPhongMaterial( {
      //   color: 0XFFFFFF,
      //   //材质自发光颜色色
      //   side: THREE.DoubleSide,
      //   map: xMap,
      //   flatShading: true } );
      // const geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
      // const cube = new THREE.Mesh( geometry, material );
      // this.scene.add( cube );
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


    private render = () => {
        requestAnimationFrame( this.render );
        this.macroModel.render();
        this.renderer.render( this.scene, this.camera );
        // console.log(this.camera.position);
        this.microModel.renderShowMagnetic(this.camera);
    }

    reset() {
        console.log('重置');
        this.microModel.reset();
        this.resetCamera();
    }

    resetCamera() {
        for (let i = 0; i < 31; i++) {
          this.orbit.reset();
          this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
          this.orbit.object.position.set(0, 0, 100);
        }
    }
}
