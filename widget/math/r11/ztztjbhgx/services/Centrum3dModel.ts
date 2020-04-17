import * as THREE from 'three';
import {
    SceneUtils, 
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';


const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Centrum3dModel extends ThreeBase {

    planeMesh: Mesh;

    private geometry: any;
    private material: any;
    private cylinder: any;

    private edgenum: number;
    private modeheight: number;
    private area: number;
    private toparea: number;
    private topnum: number;

    private edges: any;
    private line: any;
   /* cameraControl: boolean = false;*/

    control: boolean    = false;

    private orbit: any;

    private cameraPosition: any;
    private cameraRotation: any;


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
        this.initprism();
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
        const left    = this.width / - 4;
        const right   = this.width / 4;
        const top     = this.height / 4;
        const bottom  = this.height / - 4;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(80,  40,  75);
    }

    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }

    //初始化摄像机位置
    resetCamera() {
        /*if(this.cameraPosition != this.cameraPosition)*/
     /*   if (this.cameraControl) {

        }*/
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(80,  40,  75);
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

        //orbit.maxPolarAngle = Math.PI * 0.5;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 50;
        this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否自动旋转
        //orbit.autoRotate = true;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        //orbit.minPolarAngle = ; // radians
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


    //获取几何体上底面的面积
    edge(num: number) {
        this.topnum = num;
        if (num === 1) {
            this.toparea = 0;
            this.updateLines1th((new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder,
                (new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
        }
        if (num > 1 && num < 200) {
            this.toparea = (this.area / 200) * this.topnum;
            this.updateLines1th((new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder,
                (new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
        }
        if (num === 200) {
            this.toparea = this.area;
            this.updateLines1th((new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder,
                (new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
        }

    }
    edgeEvent( num: any) {
        if (num === '+∞') {

            this.edgenum = 60;

            this.updateLines1th((new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
        } else  {

            this.edgenum = num;
            this.updateLines2th((new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum)));
        }
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea , this.area,  this.modeheight, this.edgenum)));
    }


    //初始化几何体
    initprism() {
        this.topnum     = 100;
        this.edgenum    = 5;
        this.area       = 100;
        this.modeheight = 100;
        this.toparea    = this.area / 2;
        this.geometry = new THREE.CylinderGeometry( this.toparea, this.area,  this.modeheight, this.edgenum);
        this.material = new THREE.MeshBasicMaterial(  {color:  0x4a90e2, transparent: true, opacity: 0.2, side:  THREE.DoubleSide} );
        this.cylinder = new THREE.Mesh( this.geometry,  this.material );
        this.edges    = new THREE.EdgesGeometry(this.geometry, 45);
        this.line     = new THREE.LineSegments( this.edges,  new THREE.LineBasicMaterial(  { color:  0x4A90E2 } ) );
        this.cylinder.position.y = this.modeheight / 2;
        this.line.position.y = this.modeheight / 2;
        this.scene.add( this.cylinder );
        this.scene.add(this.line);
    }

    //获取数据重构几何体
    updateGroupGeometry( cylinder: any,  geometry: any )  {
        cylinder.geometry.dispose();
        cylinder.geometry = geometry;
        this.cylinder.position.y = this.modeheight / 2;


    }

    //绘制出几何体边框
    updateLines1th(geometry: any) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 45);
        this.line.position.y = this.modeheight / 2;
    }
    updateLines2th(geometry: any) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 1);
        this.line.position.y = this.modeheight / 2;
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

}
