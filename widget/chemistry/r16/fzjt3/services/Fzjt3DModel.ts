import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as fzjt1FBX from '../sub_static/model/fenzijingtu1.fbx';
import * as fzjt2FBX from '../sub_static/model/fenzijingtu2.fbx';
import * as fzjt3FBX from '../sub_static/model/fenzijingtu3.fbx';
import * as fzjt4FBX from '../sub_static/model/fenzijingtu4.fbx';
import * as fzjt5FBX from '../sub_static/model/fenzijingtu5.fbx';
import * as fzjt6FBX from '../sub_static/model/fenzijingtu6.fbx';
import * as fzjt7FBX from '../sub_static/model/fenzijingtu7.fbx';

import * as beImg from '../sub_static/model/F2.png';

export class Fzjt3DModel extends ThreeBase {

    browserInfo: BrowserInfo;
    private orbit: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();
    obj5 = new THREE.Object3D();
    obj6 = new THREE.Object3D();
    obj7 = new THREE.Object3D();
    obj8 = new THREE.Object3D();

    static preload() {
        const modelArray = [fzjt1FBX, fzjt2FBX, fzjt3FBX, fzjt4FBX, fzjt5FBX, fzjt6FBX, fzjt7FBX, beImg];
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

        const left = this.width / -20;
        const right = this.width / 20;
        const top = this.height / 20;
        const bottom = this.height / -20;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 20, 100);
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

          const g1_FBX: any = await this.fbxLoader(fzjt1FBX as any);
          g1_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj1.add(g1_FBX);

          const g2_FBX: any = await this.fbxLoader(fzjt2FBX as any);
          g2_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj2.add(g2_FBX);

          const g3_FBX: any = await this.fbxLoader(fzjt3FBX as any);
          g3_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj3.add(g3_FBX);

          const g1s_FBX: any = await this.fbxLoader(fzjt1FBX as any);
          g1s_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj4.add(g1s_FBX);

          const g4_FBX: any = await this.fbxLoader(fzjt4FBX as any);
          g4_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj5.add(g4_FBX);

          const g5_FBX: any = await this.fbxLoader(fzjt5FBX as any);
          g5_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj6.add(g5_FBX);

          const g6_FBX: any = await this.fbxLoader(fzjt6FBX as any);
          g6_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj7.add(g6_FBX);

          const g7_FBX: any = await this.fbxLoader(fzjt7FBX as any);
          g7_FBX.scale.set(0.5, 0.5, 0.5);
          this.obj8.add(g7_FBX);

          //适配手机端
          if (this.browserInfo.isSmallDevice) {
              g1_FBX.scale.set(0.2, 0.2, 0.2);
              g2_FBX.scale.set(0.2, 0.2, 0.2);
              g3_FBX.scale.set(0.2, 0.2, 0.2);
              g1s_FBX.scale.set(0.2, 0.2, 0.2);
              g4_FBX.scale.set(0.2, 0.2, 0.2);
              g5_FBX.scale.set(0.2, 0.2, 0.2);
              g6_FBX.scale.set(0.2, 0.2, 0.2);
              g7_FBX.scale.set(0.2, 0.2, 0.2);
          }

          this.obj1.visible = true;
          this.obj2.visible = false;
          this.obj3.visible = false;
          this.obj4.visible = false;
          this.obj5.visible = false;
          this.obj6.visible = false;
          this.obj7.visible = false;
          this.obj8.visible = false;
          this.scene.add(this.obj1);
          this.scene.add(this.obj2);
          this.scene.add(this.obj3);
          this.scene.add(this.obj4);
          this.scene.add(this.obj5);
          this.scene.add(this.obj6);
          this.scene.add(this.obj7);
          this.scene.add(this.obj8);

    }

        resize(width: number, height: number) {
            (this.camera as PerspectiveCamera).aspect = width / height;
            (this.camera as PerspectiveCamera).updateProjectionMatrix();
            this.renderer.setSize( width,  height );
        }

        hideModel1() {
            this.obj4.visible = true;
            this.obj5.visible = false;
            this.obj6.visible = false;
            this.obj7.visible = false;
            this.obj8.visible = false;
        }

        hideModel2() {
          this.obj4.visible = false;
          this.obj5.visible = true;
          this.obj6.visible = false;
          this.obj7.visible = false;
          this.obj8.visible = false;
        }

        hideModel3() {
          this.obj4.visible = false;
          this.obj5.visible = false;
          this.obj6.visible = true;
          this.obj7.visible = false;
          this.obj8.visible = false;
        }

        hideModel4() {
          this.obj4.visible = false;
          this.obj5.visible = false;
          this.obj6.visible = false;
          this.obj7.visible = true;
          this.obj8.visible = false;
        }

        hideModel5() {
          this.obj4.visible = false;
          this.obj5.visible = false;
          this.obj6.visible = false;
          this.obj7.visible = false;
          this.obj8.visible = true;
        }


        resetCamera() {
            this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
            this.orbit.object.position.set(-20, 20, 0);

            for (let i = 0; i < 11; i++) {
                this.orbit.reset();
            }
        }

}
