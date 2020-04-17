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
    private geometry: any;
    private material: any;
    private plane: any;
    control = false;
    private geometryLine: any;
    private materialLine: any;
    private line: any;
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
        this.getCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGirdding();
        this.initpoint();
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
        this.camera.position.set(17,  18,  65);
    }


    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(17,  18,  65);
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
    * 绘制网格线
    * 通过四个点坐标绘制一个面
    * 平面公理3按钮功能移动两个点并重绘图形
    * */

    //初始化场景方法
    //绘制一个面
    initpoint() {
        this.geometry = new THREE.PlaneGeometry( 500, 250 , 1);
        this.geometry.vertices[2].x = 0;
        this.geometry.vertices[3].x = 0;
        this.material     = new THREE.MeshBasicMaterial( {color: 0x4a90e2, transparent: true, opacity: 0.2, side: THREE.DoubleSide} );
        this.plane        = new THREE.Mesh( this.geometry, this.material );
        this.geometryLine = new THREE.CylinderBufferGeometry( 1, 1, 0 );
        this.materialLine = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        this.line         =  new THREE.Mesh( this.geometryLine, this.materialLine );
        this.line.position.y = -125;
        this.line.rotateZ(Math.PI / 180 * 90);

        const geometryCircle = new THREE.SphereBufferGeometry( 5, 32, 32 );
        const materialCircle = new THREE.MeshBasicMaterial( {color: '#FF1F3A'} );
        const sphereCircle   = new THREE.Mesh( geometryCircle, materialCircle );
        sphereCircle.position.y = -125;
        this.scene.add(sphereCircle);
        this.scene.add(this.line);
        this.scene.add( this.plane );
    }


    //创建符号
    createWord() {
        const text1 = this.createText('α' , -230, -95 , 230, '#000000');
        const text2 = this.createText('β' , -230, 130 , 20, '#000000');
        text1.material.depthTest = false;
        text2.material.depthTest = false;
        this.scene.add(text1);
        this.scene.add(text2);
    }


    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }

    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        // const helper = new THREE.GridHelper( 500, 20, 0xAEAEAE, 0xAEAEAE  );
        // helper.position.y = -125;
        // this.scene.add( helper );

        const geometry = new THREE.PlaneGeometry( 500, 500, 32 );
        const helper = new THREE.Mesh( geometry,
            new THREE.MeshBasicMaterial( {color:  '#4A90E2', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        this.scene.add( helper );

        helper.rotation.x = Math.PI / 2;
        helper.position.y = -125;
    }


    //平面公理3按钮功能将面上的两个点分开移动
    axiom(boolean: boolean) {
        let animation: any;
        let point1 = 0;
        let point2 = 0;
        let height = 0;


        if (boolean) {
            animation = setInterval(() => {
            this.plane.geometry.dispose();
            this.line.geometry.dispose();

            this.plane.geometry = new THREE.PlaneGeometry( 500, 250 , 1);

            point1 -= 1;
            point2 += 1;
            height += 2;

            this.plane.geometry.vertices[2].x = point1;
            this.plane.geometry.vertices[3].x = point2;
            this.line.geometry  = new THREE.CylinderBufferGeometry( 2.5, 2.5, height );
             if (this.plane.geometry.vertices[2].x === -250 && this.plane.geometry.vertices[3].x === 250 ) {
               clearInterval(animation);
             }
             if (this.control) {
                clearInterval(animation);
                 this.plane.geometry.dispose();
                 this.plane.geometry = new THREE.PlaneGeometry( 500, 250 , 1);
                 this.plane.geometry.vertices[2].x = 0;
                 this.plane.geometry.vertices[3].x = 0;
                 this.line.geometry.dispose();
                 this.line.geometry  = new THREE.CylinderBufferGeometry( 2.5, 2.5, 0 );
             }
            }, 16);
        }

    }
    initplane() {
        this.plane.geometry.dispose();
        this.plane.geometry = new THREE.PlaneGeometry( 500, 250 , 1);
        this.plane.geometry.vertices[2].x = 0;
        this.plane.geometry.vertices[3].x = 0;
        this.line.geometry.dispose();
        this.line.geometry  = new THREE.CylinderBufferGeometry( 1, 1, 0 );
    }


}




