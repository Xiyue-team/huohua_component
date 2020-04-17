
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';


import * as tuImage from '../sub_static/tu.png';
import * as huangFbx from '../sub_static/huangse.fbx';
import * as aaFbx from '../sub_static/shuang.fbx';


import * as hongFbx from '../sub_static/2.fbx';
import * as image2 from '../sub_static/2.png';


import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);

export class Jtjs3DModel extends ThreeBase {

    model3dAnimation: any;
    model3dAnimation2: any;

    browserInfo: BrowserInfo;

    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    static preload() {

        const modelArry = [huangFbx, aaFbx, tuImage, image2, hongFbx];
        console.log(modelArry.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );
        if (this.model3dAnimation) {
            this.model3dAnimation.renderModel();
        }

        if (this.model3dAnimation2) {
            this.model3dAnimation2.renderModel();
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
        this.initFbxLoader();
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
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(0, 0, 400);

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
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
        this.scene.add(ambientLight);


        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );

    }

    // 加载模型
    async initFbxLoader() {

        const jt: any = await this.fbxLoader(huangFbx as any);
        jt.scale.set(3, 3 , 3);
        this.obj1.add(jt);
        this.scene.add(this.obj1);

        const mt: any = await this.fbxLoader(aaFbx as any);
        mt.scale.set(3, 3 , 3);
        this.obj2.add(mt);
        this.obj2.visible = false;
        this.scene.add(this.obj2);

        const zt: any = await this.fbxLoader(huangFbx as any);
        zt.scale.set(3, 3 , 3);
        this.obj3.add(zt);
        this.scene.add(this.obj3);

        const st: any = await this.fbxLoader(hongFbx as any);
        st.scale.set(3, 3 , 3);
        this.obj4.add(st);
        this.obj4.visible = false;
        this.scene.add(this.obj4);


        this.model3dAnimation = new Model3dAnimation(mt);
        this.model3dAnimation2 = new Model3dAnimation(st);

    }

    //播放动画
    playAnimation1 () {
        this.obj2.visible = true;
        this.model3dAnimation.playModelAnimation();
        this.model3dAnimation.setAnimationDoubleSpeed(0.5);
        this.model3dAnimation.setLoopOne();
    }


    playAnimation2 () {
        this.obj4.visible = true;
        this.model3dAnimation2.playModelAnimation();
        this.model3dAnimation2.setAnimationDoubleSpeed(0.5);
        this.model3dAnimation2.setLoopOne();
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 20, 0);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
