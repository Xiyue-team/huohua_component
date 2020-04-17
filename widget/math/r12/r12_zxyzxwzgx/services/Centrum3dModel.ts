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
    private geometryLine1: any;
    private geometryLine2: any;
    private materialLine1: any;
    private materialLine2: any;
    private line1: any;
    private line2: any;
    private line3: any;
    private textl1: any;
    private textl2: any;
    private textl3: any;

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
        init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGirdding();
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
        this.camera.position.set(-51,  31,  40);
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-51,  31,  42);
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
    *
    * 实现共面直线按钮功能
    * 实现异面直线按钮功能
    * 实现滑动条功能
    * */


    //页面初始场景
    initThreeDScene() {
        this.geometryLine1 = new THREE.CylinderBufferGeometry( 3, 3, 250 );
        this.materialLine1 = new THREE.MeshBasicMaterial( {color: 0xff1f3a} );
        this.line1 =  new THREE.Mesh( this.geometryLine1, this.materialLine1 );
        this.geometryLine2 = new THREE.CylinderBufferGeometry( 3, 3, 250 );
        this.materialLine2 = new THREE.MeshBasicMaterial( {color: 0x0a5fc7} );
        this.line2 =  new THREE.Mesh( this.geometryLine2, this.materialLine2);
        this.line3 =  new THREE.Mesh( this.geometryLine1, this.materialLine1 );
        this.scene.add(this.line1);
        this.scene.add(this.line2);
        this.scene.add(this.line3);

        this.line1.add(this.textl1);
        this.line2.add(this.textl2);
        this.line3.add(this.textl3);
        this.line3.visible = false;

        const du = Math.PI / 180;
        this.line1.rotateZ(du * 90);
        this.line2.rotateZ(du * 90);
        this.line3.rotateX(du * 45);

        this.line1.position.z = -60;
        this.line3.position.y = 90;
        this.line3.position.z = -30;

    }


    //滑条
    rotateLine( number: number , ctrl: number) {
        if (ctrl >= 0 ) {
            const radian = Math.PI / 180 * number;
            this.line1.rotateZ(radian);
        }

    }

    setdistance( number: number , ctrl: number) {
            this.line1.position.z = number;
    }


    //异面直线按钮功能
    different(value: string , lastValue: string) {
        const du = Math.PI / 180;
        if (value === '1' && lastValue === '0') {
            let angle = 0;
            let lastangle = angle;
           const notVerticalAnimation = setInterval(() => {
                lastangle = angle;
                angle += 1;
                this.line3.rotateZ((du * angle) - (du * lastangle));
                this.line3.position.y -= 0.5;
                if (angle === 45) {
                    clearInterval(notVerticalAnimation);
                }
            }, 16);

        }
        if (value === '0' && lastValue === '1' ) {
            let angle = 0;
            let lastangle = angle;
            const notVerticalAnimation = setInterval(() => {
                lastangle = angle;
                angle -= 1;
                this.line3.rotateZ((du * angle) - (du * lastangle));
                this.line3.position.y += 0.5;
                if (angle === -45) {
                    clearInterval(notVerticalAnimation);
                }
            }, 16);
        }
    }


    initAngle() {
        this.line3.position.y = 90;
        this.line3.rotateZ(Math.PI / 180 * -45);

    }


    //显示异面直线
    differentLineshow() {
        this.line3.visible = true;
        this.line1.visible = false;
    }


    //显示共面直线
    CoplanarLineshow() {
        this.line1.visible = true;
        this.line3.visible = false;
    }


    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 420, 20, 0xAEAEAE, 0xAEAEAE  );
        this.scene.add( helper );
        helper.position.z = -30;
    }


    //创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }


    createWord() {
            this.textl1 = this.createText('l₁', 0, 150, 0, '#ff1f3a');

            this.textl2 = this.createText('l₂', 0, 150, 0, '#0a5fc7');

            this.textl3 = this.createText('l₁', 0, 150, 0, '#ff1f3a');
    }

}




