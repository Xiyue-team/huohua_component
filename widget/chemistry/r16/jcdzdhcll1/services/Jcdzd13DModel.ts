import * as THREE from 'three';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as s1FBX from '../sub_static/model/S1.fbx';
import * as s2FBX from '../sub_static/model/S2.fbx';
import * as s3FBX from '../sub_static/model/S3.fbx';

import * as H1Img from '../sub_static/model/H1.png';
import * as H2Img from '../sub_static/model/H2.png';


export class Jcdzd13DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    static preload() {
        const modelArray = [s1FBX, s2FBX, s3FBX, H1Img, H2Img];
        console.log(modelArray);
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
        this.loadModel();
        this.render();
    }

    /**
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
        this.camera.position.set(0, 0, 100);
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

      const ambientLight = new THREE.AmbientLight( 0xffffff, 1.1);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.5);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.4);
      dirLight2.position.set( -100, -100, -100 );
      this.scene.add( dirLight2 );

    }

    //加载模型
    async loadModel() {
          const s1_FBX: any = await this.fbxLoader(s1FBX as any);
          s1_FBX.rotation.y = -Math.PI / 4;
          this.obj1.add(s1_FBX);

          const s2_FBX: any = await this.fbxLoader(s2FBX as any);
          s2_FBX.scale.x = 1.27;
          s2_FBX.scale.y = 1.27;
          s2_FBX.scale.z = 1.27;
          this.obj2.add(s2_FBX);

          const s3_FBX: any = await this.fbxLoader(s3FBX as any);
          s3_FBX.scale.x = 1.3;
          s3_FBX.scale.y = 1.3;
          s3_FBX.scale.z = 1.3;
          this.obj3.add(s3_FBX);

          const s4_FBX: any = await this.fbxLoader(s3FBX as any);
          s4_FBX.scale.x = 1.3;
          s4_FBX.scale.y = 1.3;
          s4_FBX.scale.z = 1.3;
          this.obj4.add(s4_FBX);

          this.obj1.visible = true;
          this.obj2.visible = false;
          this.obj3.visible = false;
          this.obj4.visible = false;
          this.scene.add(this.obj1);
          this.scene.add(this.obj2);
          this.scene.add(this.obj3);
          this.scene.add(this.obj4);

    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 50, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
