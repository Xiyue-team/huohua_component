import * as THREE from 'three';
import {Mesh, PerspectiveCamera, Vector3, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D, textAlign, MeshText2D} from 'three-text2d';
import {AxisXYZUtils} from './AxisXYZUtils';

const OBJLoader = require('three-obj-loader');

const CanvasRenderer = require('../../../../../src/libs/CanvasRenderer');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

export class RightAngle3dModel extends ThreeBase {
    private orbit: any;
    axisUtils: AxisXYZUtils = new AxisXYZUtils();

    //存放坐标轴
    obj1: any;
    //辅助线
    obj5: any;
    //球
    sphere: any;
    //面
    yozPlane: any;
    xoyPlane: any;
    zoxPlane: any;
    //字体P
    textP: any;
    //P点
    pointP: any = null;
    //显示或隐藏辅助线
    showFuzhuXian: any = false;



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
        // this.initLight();
        this.initWebGLRenderer();
        this.initControl();
       this.createAxis('');
       this.createOriginPoint();
       this.createPlane();
       this.createText();
       this.createPointP();
       this.createFuZhuXian();
        this.render();
    }



    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
       this.scene.scale.set(0.5 , 0.5 , 0.5);
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const left    = this.width / - 2;
        const right   = this.width / 2;
        const top     = this.height / 2;
        const bottom  = this.height / - 2;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
       // this.camera.position.set(20,  5,  20);
       this.camera.position.set(80,  40,  80);
    }

    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(80,  40,  80);
        for (let i = 0; i < 30; i++) {
            this.orbit.reset();
        }
    }

    reset () {

    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        // if (this.webglAvailable()) {
        //     this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        // }  else  {
        //     this.renderer = new THREE.CanvasRenderer();
        // }
        this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        // this.renderer = new CanvasRenderer.CanvasRenderer();
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


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene,  this.camera );
        // this.blinkLine();
    }

    createAxis (color: any) {  //创建坐标轴
        this.obj1 = new THREE.Group();
        this.axisUtils.labelAxis(-500, 50, 500, color , this.obj1);
        //x轴
        this.axisUtils.createAxisX(this.vec3( -550, 0, 0 ), this.vec3( 550, 0, 0 ), color , this.obj1);
        //y轴
        this.axisUtils.createAxisY(this.vec3( 0, 0, -550 ), this.vec3( 0, 0, 550 ), color , this.obj1);
        //z轴
        this.axisUtils.createAxisZ(this.vec3( 0, -550, 0 ), this.vec3( 0, 550, 0 ), color,  this.obj1);
        this.scene.add( this.obj1);
    }

    vec3(x: any , y: any , z: any) {
        return new THREE.Vector3(x, y, z);
    }


    createOriginPoint () {   //创建原点
        this.sphere = this.axisUtils.createSphere([0, 0 , 0], 18, 0xE30000);
        this.sphere.visible = false;
        this.scene.add(this.sphere);
    }

    createPlane () {//创建平面
        //yoz平面
        this.yozPlane = this.axisUtils.createPlane(1000, 1000, '#aadfdf');
        this.scene.add(this.yozPlane);
        this.yozPlane.visible = false;
        // zox平面
        this.zoxPlane = this.axisUtils.createPlane(1000, 1000, '#60b5f1');
        this.zoxPlane.rotation.y = Math.PI / 2;
        this.scene.add(this.zoxPlane);
        this.zoxPlane.visible = false;
        //xoy平面
        this.xoyPlane = this.axisUtils.createPlane(1000, 1000, '#e2d96b');
        this.xoyPlane.rotation.x = Math.PI / 2;
        this.xoyPlane.position.set(-1, -1 , 0);
        this.scene.add(this.xoyPlane);
        this.xoyPlane.visible = false;
    }

    createText( ) {   // 创建文字 P
        const textStyle = {align: textAlign.center, font: 'Italic 90px "Times New Roman"', fillStyle: '#000000', antialias: true};
        this.textP = new SpriteText2D('P', textStyle);
        this.textP.scale.set(0.5 , 0.5 , 0.5);
        this.scene.add(this.textP);
    }

    createPointP() {  //创建P点
        if (this.pointP === null) {
            this.pointP = this.axisUtils.initPointP();
            this.scene.add(this.pointP);
        }
        this.axisUtils.layoutPointAndText(this.pointP, this.textP);
    }


    createFuZhuXian () {    //创建辅助线
        this.obj5 =  this.axisUtils.createFuzhuLines(this.obj5, this.scene);
        this.scene.add(this.obj5);
        this.obj5.visible = this.showFuzhuXian;

    }

    productRandomPoint() {  //生成随机点
        this.axisUtils.productRandomPoint();
        this.createPointP();
        this.createFuZhuXian();
    }



}
