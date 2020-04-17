import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {setTimeout} from 'timers';
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
    private geometryLine1: any;
    private materialLine1: any;
    private line1: any;
    private geometryLine2: any;
    private materialLine2: any;
    private line2: any;
    private geometryLine3: any;
    private materialLine3: any;
    private line3: any;
    private animationControl = false;
    control = true;
    private animation: any;
    private text2: any;
    private text3: any;
    private text4: any;

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
    async init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGirdding();
        this.initline();
        this.createWord();
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
    * 绘制三条平行线
    * 平面公理4按钮功能
    * */

    //绘制三条平行线
    initline() {
        this.geometryLine1 = new THREE.CylinderBufferGeometry( 2, 2, 250 );
        this.materialLine1 = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        this.line1 =  new THREE.Mesh( this.geometryLine1, this.materialLine1 );
        this.line1.rotateZ(Math.PI / 180 * -60);
        this.line1.position.z = 100;
        this.scene.add(this.line1);

        this.geometryLine2 = new THREE.CylinderBufferGeometry( 2, 2, 250 );
        this.materialLine2 = new THREE.MeshBasicMaterial( {color: 0xff1f3a} );
        this.line2 =  new THREE.Mesh( this.geometryLine2, this.materialLine2 );
        this.line2.rotateZ(Math.PI / 180 * -60);
        this.line2.position.z = -100;
        this.scene.add(this.line2);

        this.geometryLine3 = new THREE.CylinderBufferGeometry( 2, 2, 250 );
        this.materialLine3 = new THREE.MeshBasicMaterial( {color: 0x000000} );
        this.line3 =  new THREE.Mesh( this.geometryLine3, this.materialLine3 );
        this.line3.rotateZ(Math.PI / 180 * -60);

        this.scene.add(this.line3);
    }


    //平面公理4按钮功能
    //移动线的坐标并对线进行删除重绘达到动画效果
    axiom( boolean: boolean) {
        let line1animationq = 100;
        let line1animationh = 0;
        let line2animationq = -100;
        let line2animationh = 0;
        if (boolean) {
            this.animation = setInterval(() => {
                if (this.animationControl) {
                    if (this.control) {
                        console.log(this.control);
                        setTimeout(() => {
                            this.control = false;
                        }, 1000);


                    } else {
                        console.log(this.control);
                        line1animationh += 1;
                        line2animationh -= 1;
                        this.line1.position.z = line1animationh;
                        this.line2.position.z = line2animationh;
                        this.text3.position.z = line1animationh;
                        this.text4.position.z = line2animationh;
                        if (this.line1.position.z === 100 && this.line2.position.z === -100) {
                            this.animationControl = false;
                            this.control = true;
                            clearInterval(this.animation);
                        }
                    }

                } else {
                    this.control = true;
                    console.log(this.control);
                    line1animationq -= 1;
                    line2animationq += 1;
                    this.line1.position.z = line1animationq;
                    this.line2.position.z = line2animationq;
                    this.text3.position.z = line1animationq;
                    this.text4.position.z = line2animationq;
                    if (this.line1.position.z === 0 && this.line2.position.z === 0) {
                        this.animationControl = true;
                    }
                }
            }, 16);
        } else {
            this.line1.position.z = 100;
            this.line2.position.z = -100;
            this.text3.position.z = 100;
            this.text4.position.z = -100;
            clearInterval(this.animation);
            this.animationControl = false;
            this.control = true;

        }
    }


    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 460, 20, 0xAEAEAE, 0xAEAEAE  );
        helper.position.y = -100;
        this.scene.add( helper );
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
        const text1 = this.createText('α' , -210, -80 , 210, '#000000');
        this.scene.add(text1);
        this.text2 = this.createText('l' , 110, 90 , 0, '#000000');
        this.scene.add(this.text2);
        this.text3 = this.createText('l₁' , 110, 90 , 100, '#4a90e2');
        this.scene.add(this.text3);
        this.text4 = this.createText('l₂' , 110, 90 , -100, '#ff1f3a');
        this.scene.add(this.text4);
    }

}




