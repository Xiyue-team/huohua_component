import common from './CommonForThree';

const THREE = require('./three');

const EffectComposer = require('./EffectComposer');
const RenderPass = require('./RenderPass');
const ShaderPass = require('./ShaderPass');
const CopyShader = require('./CopyShader');
import * as img1 from '../sub_static/123.png';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { SpriteText2D} from 'three-text2d';


const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import {Scene} from 'three';
import {TweenMax} from 'gsap';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import {ModelLoad} from './ModelLoad';

export class Yzjgmx23DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    public orbit: any;
    public HorizontalBlurShader: any;
    penPoint = common.createImg([0, 0, 1], 150, 150, img1);
    public DotScreenShader: any;
    public VerticalBlurShader: any;
    public composer: any;
    public Opencomposer: boolean;
    public effect: any;
    public effectHBlur: any;
    public effectVBlur: any;
    public aaa: any;
    private directionalLight: any;
    private directionalLight1: any;

    model = new ModelLoad();

    private render = () => {
        requestAnimationFrame( this.render );
        
        if (this.Opencomposer) {
            this.penPoint.visible = true;
            this.orbit.enableRotate = false;
            this.renderer.render( this.scene, this.camera );

        } else {
            // this.composer.render();
            this.penPoint.visible = false;
            this.orbit.enableRotate = true;
            this.renderer.render( this.scene, this.camera );

        }
        if (this.model.animation1) {
            this.model.animation1.renderModel();
        }
        if (this.model.animation2) {
            this.model.animation2.renderModel();
        }

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
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.init();

    }

     init() {

        this.initScene();
        this.initCamera();

        this.initLight();
        this.initWebGLRenderer();
        this.initControl();

        this.initGltfLoader();
        this.scene.add(this.model.groupMesh, this.model.groupHModel);
        // this.initComposer();
        this.render();


    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();

        this.Opencomposer = false;
        this.scene.add(this.penPoint);
        // this.penPoint.rotateY(Math.PI / 8)
        // this.penPoint.rotateX(-Math.PI / 16)
        this.penPoint.visible = false;
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.resetModel();
        this.scene.add(this.camera);
       
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
        (this.renderer as any ).setPixelRatio(window.devicePixelRatio);
        (this.renderer as any ).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);
        (this.renderer as any).gammaInput = true;
        (this.renderer as any).gammaOutput = true;
        (this.renderer as any).shadowMap.enabled = true;
        (this.renderer as any).toneMappingExposure = 0.7;
        (this.renderer as any).shadowMap.type = THREE.PCFSoftShadowMap;


    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.saveState ();
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;

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
              const ambientLight = new THREE.AmbientLight( '#ffffff', 0.3);
              this.camera.add(ambientLight);
              const dirLight = new THREE.DirectionalLight('#ffffff', 0.5);
              dirLight.position.set(150, 0, 259.8);
              this.camera.add(dirLight);

              this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
              this.directionalLight.position.set(500, 500, 500);
              this.scene.add(this.directionalLight );
              this.directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.3 );
              this.directionalLight.position.set(-600, -600, 300);
              this.scene.add( this.directionalLight1 );
    }

    initLight2(num: number) {
        if (num === 1) {
            this.scene.remove(this.directionalLight);
            this.scene.remove(this.directionalLight1);
        } else {
            this.scene.add(this.directionalLight);
            this.scene.add(this.directionalLight1);
        }
    }

    // 加载模型
    async initGltfLoader()  {
        this.model.initScene1().then(() => {
        this.model.obj1.visible = true;
        });
        this.model.initScene2();
        this.model.initScene3();
        this.model.initScene4();
        this.model.initScene5();

        this.scene.add(this.model.obj1);
        this.scene.add(this.model.obj2);
        this.scene.add(this.model.obj3);
        this.scene.add(this.model.obj4);

        this.scene.add(this.model.obj5);
        
        this.model.obj2.visible = false;
        this.model.obj3.visible = false;
        this.model.obj4.visible = false;
        this.model.obj5.visible = false;

        this.initMaterial();
    }
    initComposer() {

        this.composer = new THREE.EffectComposer(this.renderer);

        const copyPass = new THREE.ShaderPass(THREE.CopyShader);
        this.composer.addPass(copyPass);
        copyPass.renderToScreen = true;

        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        this.effect = new THREE.ShaderPass(THREE.DotScreenShader);
        this.effect.renderToScreen = true;
        this.composer.addPass( this.effect);
    }

    //重置材料
    initMaterial() {

    }

    //加载动画
  init3DModel(num: number) {
    if (num === 1) {
        this.model.animation1.playAnimation(0);
        this.model.animation1.repeatPlayAnimatoin(0);
    } else {
        this.model.animation2.playAnimation(0);
        this.model.animation2.repeatPlayAnimatoin(0);
    }
}



    //重置动画
    resetAnimation1(num: number) {
        if (num === 1) {
            this.model.animation1.resetAnimation();
        } else {
            this.model.animation2.resetAnimation();
        }
    }
    // 开始动画
    startCuttingAnimation() {
        
    }

    
    resetModel() {
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 200);
    }

    // 隐藏模型
    hideScene() {

        this.model.obj1.visible = false;
        this.model.obj2.visible = false;
        this.model.obj3.visible = false;
        this.model.obj4.visible = false;
        this.model.obj5.visible = false;
    }


    resize(width: number, height: number) {
        (this.camera as any).aspect = width / height;
        (this.camera as any).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(100, 100, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
