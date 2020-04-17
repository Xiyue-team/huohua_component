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
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import { ModelLoad } from './ModelLoad';


export class Txlfdj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    model = new ModelLoad();

    private render = () => {
        requestAnimationFrame( this.render );

        if (this.model.model3Animation1) {
          this.model.model3Animation1.renderModel();
        }

        if (this.model.model4Animation1) {
          this.model.model4Animation1.renderModel();
        }

        if (this.model.model6Animation1) {
          this.model.model6Animation1.renderModel();
        }

        if (this.model.model8Animation1) {
          this.model.model8Animation1.renderModel();
        }




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
        this.initGltfLoader();

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

        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(200, 200, 200);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true});
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

        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 200;
        this.orbit.maxDistance = 400;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;

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

    // 加载模型
    async initGltfLoader()  {
        this.model.initGltfLoader();

        this.scene.add(this.model.obj1);
        this.scene.add(this.model.obj2);
        this.scene.add(this.model.obj3);
        this.scene.add(this.model.obj4);
        this.scene.add(this.model.obj5);

        this.model.obj2.visible = false;
        this.model.obj3.visible = false;
        this.model.obj4.visible = false;
        this.model.obj5.visible = false;
    }

    showObj(value: number) {
        switch (value) {
            case 1:
                // 显示场景1
                this.model.obj1.visible = true;
                this.model.obj2.visible = false;

                // 重置场景2动画
                this.model.resetAnimation2();
                this.model.animationScene2End = true;

                break;
            case 2:
                // 显示场景2
                if (this.model.animationScene2End) {
                  this.model.animationScene2.play();
                } else {
                  this.model.obj2.visible = true;
                  this.model.obj3.visible = false;

                  // 重置场景3动画
                  this.model.resetAnimation3();
                  this.model.animationScene3End = true;
                }

                break;
            case 3:
                // 显示场景3
                if (this.model.animationScene3End) {
                  this.model.animationScene3.play();
                } else {
                  this.model.obj1.visible = false;
                  this.model.obj2.visible = true;
                  this.model.obj3.visible = true;
                  this.model.obj4.visible = false;

                  // 重置场景4动画
                  this.model.resetAnimation4();
                  this.model.animationScene4End = true;
                }
                break;
            case 4:
                // 显示场景4
                if (this.model.animationScene4End) {
                  this.model.animationScene4.play();
                } else {
                  this.model.obj3.visible = false;
                  this.model.obj4.visible = true;
                  this.model.obj5.visible = false;

                  // 重置场景5动画
                  this.model.resetAnimation5();
                  this.model.animationScene5End = true;
                }
                break;
            case 5:
                // 显示场景5
                if (this.model.animationScene5End) {
                  this.model.animationScene5.play();
                } else {
                  this.model.obj4.visible = false;
                  this.model.obj5.visible = true;
                }
                break;
        }
    }

    // 配位数按钮点击
    coordinationNumberClick(value: boolean) {
        if (value) {
          if (this.model.obj1.visible === true) {
            this.model.scene1CoordinationNumber1();
          }

          if (this.model.obj4.visible === true) {
            this.model.scene4CoordinationNumber1();
          }

        } else {
          if (this.model.obj1.visible === true) {
            this.model.scene1CoordinationNumber2();
          }

          if (this.model.obj4.visible === true) {
            this.model.scene4CoordinationNumber2();
          }
        }
    }

    // 辅助线按钮点击
    auxiliaryLineClick(value: boolean) {
        if (value) {
          this.model.auxiliaryLine();
        } else {
          this.model.auxiliaryLine2();
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        // 重置动画
        this.model.reset();
        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(200, 200, 200);

        for (let i = 0; i < 21; i++) {
            this.orbit.reset();
        }
    }

}
