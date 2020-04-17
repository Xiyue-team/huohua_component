
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';



import * as li1Fbx from '../sub_static/lizi1.fbx';
import * as li2Fbx from '../sub_static/lizi2.fbx';
import * as li3Fbx from '../sub_static/lizi3.fbx';
import * as li4Fbx from '../sub_static/lizi4.fbx';
import * as s8Fbx from '../sub_static/38.fbx';
import * as e8Fbx from '../sub_static/28.fbx';
import * as imageL from '../sub_static/lizi.png';



const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);

export class Jtjs3DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj2s = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj3s = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    static preload() {

        const modelArry = [imageL , li1Fbx, li2Fbx, li3Fbx, li4Fbx, e8Fbx, s8Fbx];
        console.log(modelArry.length);

    }

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


        const left = this.width / -20;
        const right = this.width / 20;
        const top = this.height / 20;
        const bottom = this.height / -20;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(50, 30, 200);

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


        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.5);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );

    }

    // 加载模型
    async initFbxLoader() {

        const jt: any = await this.fbxLoader(li1Fbx as any);
        jt.scale.set(0.5, 0.5 , 0.5);
        this.obj1.add(jt);
        this.scene.add(this.obj1);

        const mt: any = await this.fbxLoader(li2Fbx as any);
        mt.scale.set(0.5, 0.5 , 0.5);
        this.obj2.add(mt);
        this.obj2.visible = false;
        this.scene.add(this.obj2);

        const et: any = await this.fbxLoader(e8Fbx as any);
        et.scale.set(0.5, 0.5 , 0.5);
        this.obj2s.add(et);
        this.obj2s.visible = false;
        this.scene.add(this.obj2s);

        const zt: any = await this.fbxLoader(s8Fbx as any);
        zt.scale.set(0.5, 0.5 , 0.5);
        this.obj3.add(zt);
        this.obj3.visible = false;
        this.scene.add(this.obj3);


        const st: any = await this.fbxLoader(li4Fbx as any);
        st.scale.set(0.5, 0.5 , 0.5);
        this.obj4.add(st);
        this.obj4.visible = false;
        this.scene.add(this.obj4);


        if (this.browserInfo.isSmallDevice) {
            jt.scale.set(0.2, 0.2 , 0.2);
            mt.scale.set(0.2, 0.2 , 0.2);
            et.scale.set(0.2, 0.2 , 0.2);
            zt.scale.set(0.2, 0.2 , 0.2);
            st.scale.set(0.2, 0.2 , 0.2);
        }

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


    hideModel1() {


        this.obj2.visible = true;
        this.obj2s.visible = false;
    }

    hideModel2() {

        this.obj2.visible = false;
        this.obj2s.visible = true;
    }

    hideModel3() {


        this.obj1.visible = true;
        this.obj3.visible = false;

    }

    hideModel4() {
        this.obj1.visible = false;
        this.obj3.visible = true;

    }
}
