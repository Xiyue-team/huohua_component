import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as h2oFBX from '../sub_static/model/1H2O.fbx';
import * as nh3FBX from '../sub_static/model/2NH3.fbx';
import * as p4FBX from '../sub_static/model/3P4.fbx';
import * as ch4FBX from '../sub_static/model/4CH4.fbx';

import * as D1Img from '../sub_static/model/D1.png';
import * as D2Img from '../sub_static/model/D2.png';
import * as D3Img from '../sub_static/model/D3.png';
import * as D4Img from '../sub_static/model/D4.png';

export class Dxzh3DModel extends ThreeBase {

    browserInfo: BrowserInfo;
    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    static preload() {
        const modelArray = [h2oFBX, nh3FBX, p4FBX, ch4FBX, D1Img, D2Img, D3Img, D4Img];
        console.log(modelArray.length);
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
        this.camera.lookAt(0, 0, 0);
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

      const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.5);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.4);
      dirLight2.position.set( -100, -100, -100 );
      this.scene.add( dirLight2 );

    }

    // 加载模型
    async initGltfLoader()  {

          const g1_FBX: any = await this.fbxLoader(h2oFBX as any);
          g1_FBX.scale.set(1.5, 1.5, 1.5);
          this.obj1.add(g1_FBX);

          const g2_FBX: any = await this.fbxLoader(nh3FBX as any);
          g2_FBX.scale.set(1.5, 1.5, 1.5);
          this.obj2.add(g2_FBX);

          const g3_FBX: any = await this.fbxLoader(p4FBX as any);
          g3_FBX.scale.set(1.5, 1.5, 1.5);
          this.obj3.add(g3_FBX);

          const g4_FBX: any = await this.fbxLoader(ch4FBX as any);
          g4_FBX.scale.set(1.5, 1.5, 1.5);
          this.obj4.add(g4_FBX);

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
            this.orbit.object.position.set(-20, 20, 0);

            for (let i = 0; i < 11; i++) {
                this.orbit.reset();
            }
        }

}
