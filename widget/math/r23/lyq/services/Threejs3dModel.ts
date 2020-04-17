import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as lyq from './../sub_static/lyq1.fbx';
import * as ztx from './../sub_static/ztx1.fbx';
import * as ytx from './../sub_static/ytx1.fbx';
import * as tietu1 from './../sub_static/210291.jpg';
import * as tietu2 from '../sub_static/lyq1.jpg';

const OrbitControls = require('three-orbitcontrols');
export class Threejs3dModel extends ThreeBase {

    private orbit: any;
    private rotatePoint1: THREE.Mesh;
    private rotatePoint2: THREE.Mesh;
    private group: THREE.Group;
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene,  this.camera );
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
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initLight();
        this.initControl();
        this.createRotatePoint();
        this.initFBXLoader();
        this.render();
    }

    preload() {
      const image = [lyq, ztx, ytx, tietu1, tietu2];
      console.log(image);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xE5E5E5 );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
      const n = 13;
      const left    = this.width / - n;
      const right   = this.width / n;
      const top     = this.height / n;
      const bottom  = this.height / - n;
      const near    = -600;
      const far     = 1000;
      this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
      this.camera.lookAt(new THREE.Vector3(0,  0,  0));
      this.camera.position.set(17.767813632992596,  5.734920741748517,  46.38335350952014);
    }


    //重置摄像机位置
    resetCamera() {
      for (let i = 0; i < 20; i++) {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(17.767813632992596,  5.734920741748517,  46.38335350952014);
        this.orbit.reset();
      }
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
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
      this.orbit.minDistance = 50;
      this.orbit.maxDistance = 70;

      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //是否自动旋转
      this.orbit.minAzimuthAngle = -Math.PI * 2;
      this.orbit.maxAzimuthAngle = Math.PI * 2;

      this.orbit.maxPolarAngle = Math.PI; // radians

      //是否开启右键拖拽
      this.orbit.enablePan = false;
    }
    //初始化灯光
    initLight() {
      const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
      dirLight2.position.set( -100, -100, -100 );
      this.scene.add( dirLight2 );
    }

    createRotatePoint() {
      this.group = new THREE.Group();
      this.rotatePoint1 = ThreeUtil.createPoint(1, '#0199ff', 1, 0, 0.01);
      this.rotatePoint1.position.set(-33, 23 , 6);
      this.group.add(this.rotatePoint1);
      this.rotatePoint2 = ThreeUtil.createPoint(1, '#0199ff', 1, 0, 0.01);
      this.rotatePoint2.position.set(33, 23 , 6);
      this.group.add(this.rotatePoint2);
      this.group.position.y = -25;
      this.group.rotation.x = -Math.PI / 2;
      this.scene.add(this.group);
    }

    rotateMesh1(value: number) {
      this.rotatePoint1.rotation.y = (value - 90) / 180 * Math.PI;
    }
    rotateMesh2(value: number) {
      this.rotatePoint2.rotation.y = (value - 90) / 180 * Math.PI;
    }

    async initFBXLoader()  {
      const dianL_FBX: any = await this.fbxLoader(lyq as any);
      this.group.add(dianL_FBX);
      const tx1: any = await this.fbxLoader(ztx as any);
      tx1.position.z = -6;
      this.rotatePoint1.add(tx1);
      const tx2: any = await this.fbxLoader(ytx as any);
      this.rotatePoint2.add(tx2);
      (window as any).viewHandler.modelHideLoading();
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

}




