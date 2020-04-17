import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {SpriteText2D} from 'three-text2d';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';


const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Centrum3dModel extends ThreeBase {

    planeMesh: Mesh;
   /* cameraControl: boolean = false;*/
    private orbit: any;
    private cameraPosition: any;
    private cameraRotation: any;
    private bigGeometry: any;
    private smallGeometry: any;
    private bigPlane: any;
    private smallPlane: any;
    private bigMaterial: any;
    private smallMaterial: any;
    private text: any;
    private isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;


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
    constructor( domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
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
    async init() {
        this.initScene();
        this.initCamera();
        this.getCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        // this.createGirdding();
        this.createWord();
        this.initThreeDScene();
        this.render();

    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {

        const scale = this.isMobile ? 0.8 : 2;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(-51,  31,  36);
    }


    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-51,  31,  36);
        this.orbit.reset();
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


    /**
     * 初始化光源
     *
     */
    initLight(): void {
        this.lights = [];
        this.scene.add( new THREE.AmbientLight( 0x666666 ) );
        this.lights[0] = new THREE.DirectionalLight( 0xdfebff,  1 );
        this.lights[0].position.set( 50,  200,  100 );
        this.lights[0].position.multiplyScalar( 1.3 );
        this.scene.add( this.lights[0] );
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


    /*
    *初始化场景
    * 实现滑条功能
    * */


    //页面初始场景
    initThreeDScene() {
        this.bigGeometry = new THREE.PlaneBufferGeometry( 400, 500, 32 );
        this.bigMaterial = new THREE.MeshBasicMaterial( {color: 0x4a90e2, transparent: true, opacity: 0.4, side: THREE.DoubleSide} );
        this.bigPlane = new THREE.Mesh( this.bigGeometry, this.bigMaterial );
        this.smallGeometry = new THREE.PlaneBufferGeometry( 400, 450, 32 );
        this.smallMaterial = new THREE.MeshBasicMaterial( {color: 0xFAEB2C, transparent: true, opacity: 0.4, side: THREE.DoubleSide} );
        this.smallPlane = new THREE.Mesh( this.smallGeometry, this.smallMaterial );
        this.scene.add( this.bigPlane );
        this.scene.add( this.smallPlane );
        this.bigPlane.rotateX(Math.PI / 180 * 90);
        this.bigPlane.position. z = 25;
        this.smallPlane.position.y = 50;
        this.smallPlane.rotateX(Math.PI / 180 * -90);
        this.smallPlane.add(this.text);
    }


    //滑条
    Animation( number: number ) {
        const radian = Math.PI / 180 * number;
        this.smallPlane.rotateX(radian);
    }


    //创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'Italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }


    createWord() {
        const text1 = this.createText('α' , -190, 28 , 270, '#000000');
        text1.material.depthTest = false;
        this.scene.add(text1);

        this.text = this.createText('β', -190, 220, 10, '#000000');
        this.text.material.depthTest = false;

    }

}




