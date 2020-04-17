import * as THREE from 'three';
import {Group, Mesh, Object3D, PerspectiveCamera, Vector3, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D, textAlign} from 'three-text2d';
import {AxisXYZUtils} from './AxisXYZUtils';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

// const CanvasRenderer = require('../../../../src/libs/CanvasRenderer');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

export class TwoPointDistance3DModel extends ThreeBase {
    private orbit: any;

    textM: any; //字体M
    textN: any; //字体N
    pointM: any = null; //球M
    pointN: any = null; //球N
    lineMN: any = null; //线段MN
    axisUtils: AxisXYZUtils = new AxisXYZUtils();
    obj1: any; //坐标系对象

    fuzhuxian1: any; //辅助线一
    fuzhuxian2: any; //辅助线二

    showLine1: any = false;
    showLine2: any = false;


    dotM: any;  //坐标M
    dotN: any; //坐标N


    groupN: any; //存放text 和 dotM
    groupM: any; //存放textN 和 dotN
    private isMobile = false;
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.initScene();
        this.initCamera();
        this.getCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis('');
        this.createText();
        this.createPointMN();
        this.createLineMN();
        this.createFuZhuXian();
        this.createFuZhuXian2();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
        this.scene.scale.set(0.5, 0.5, 0.5);
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
        this.isMobile = true;
        const left = this.width / -0.8;
        const right = this.width / 0.8;
        const top = this.height / 0.8;
        const bottom = this.height / -0.8;
        const near = -600;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(80, 40, 80);
      } else {
        const left = this.width / -2;
        const right = this.width / 2;
        const top = this.height / 2;
        const bottom = this.height / -2;
        const near = -600;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(80, 40, 80);
      }
    }

    //记录摄像机初始位置
    getCamera() {
        // this.cameraPosition = this.camera.position;
        // this.cameraRotation = this.camera.rotation;
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(80, 40, 80);
        // //  this.orbit.object.position.set(0,  0,  0);
       for (let i = 0; i < 30; i++) {
            this.orbit.reset();
         }
    }
    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );

        this.scene.add( this.lights[0] );
    }

    reset() {

    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        // if (this.webglAvailable()) {
        //     this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
        // } else {
        //     this.renderer = new THREE.CanvasRenderer();
        // }
        this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
         (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
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


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        // this.blinkLine();
    }


    createAxis(color: any) {  //创建坐标轴
        if (this.obj1 !== null) {
           this.scene.remove(this.obj1) ;
        }
        this.obj1 = new THREE.Group();
        this.axisUtils.labelAxis(-500, 50, 500, color, this.obj1);
        // //y轴
        // this.axisUtils.drawAxisArrow(this.vec3(-550, 0, 0), this.vec3(550, 0, 0), color, 1, this.obj1);
        // //z轴
        // this.axisUtils.drawAxisArrow(this.vec3(0, -550, 0), this.vec3(0, 550, 0), color, 2, this.obj1);
        // //x轴
        // this.axisUtils.drawAxisArrow(this.vec3(0, 0, -550), this.vec3(0, 0, 550), color, 3, this.obj1);

        //this.axisUtils.labelAxis(-500, 50, 500, color , this.obj1);
        //x轴
        this.axisUtils.createAxisX(this.vec3( -550, 0, 0 ), this.vec3( 550, 0, 0 ), color , this.obj1);
        //y轴
        this.axisUtils.createAxisY(this.vec3( 0, 0, -550 ), this.vec3( 0, 0, 550 ), color , this.obj1);
        //z轴
        this.axisUtils.createAxisZ(this.vec3( 0, -550, 0 ), this.vec3( 0, 550, 0 ), color,  this.obj1);

        const textX = this.axisUtils.createXYZText('x');
        textX.position.x = 500 + 50;
        textX.position.y = -15;
        const textY = this.axisUtils.createXYZText('y');
        textY.position.x = 0;
        textY.position.y = -15;
        textY.position.z = -550 - 50;
        const textZ = this.axisUtils.createXYZText('z');
        textZ.position.x = -30;
        textZ.position.y = 500 + 50;
        textZ.position.z = 1;
         textX.scale.set(0.5, 0.5, 0.5);
        textY.scale.set(0.5, 0.5, 0.5);
        textZ.scale.set(0.5, 0.5, 0.5);
        this.obj1.add(textX, textY , textZ);
        this.scene.add(this.obj1);
    }

    vec3(x: any, y: any, z: any) {
        return new THREE.Vector3(x, y, z);
    }

    createText() {    // 创建M,N文字
        this.groupN = new Group();
        this.groupM = new Group();
        let textStyle = {align: textAlign.left, font: 'italic 100px "Times New Roman"', fillStyle: '#000000', antialias: true};
        this.textM = new SpriteText2D('M', textStyle);
        this.scene.add(this.textM);
        this.textM.scale.set(0.5, 0.5 , 0.5);

        this.textN = new SpriteText2D('N', textStyle);
        this.scene.add(this.textN);
        this.textN.scale.set(0.5, 0.5 , 0.5);
        //
        textStyle = {align: textAlign.center, font: '100px "Arial"', fillStyle: '#000000', antialias: true};


        this.dotM = new SpriteText2D('1', textStyle);
        this.dotM.scale.set(0.5, 0.5 , 0.5);

        this.dotN = new SpriteText2D('123', textStyle);
        this.dotN.scale.set(0.5, 0.5 , 0.5);


        this.textM.scale.set(1, 1, 1);
        this.textM.position.y = 120;
        this.dotM.add(this.textM);
        this.groupM.add(this.dotM);
        this.groupM.position.y = -70;

        this.textN.scale.set(1, 1, 1);
        this.textN.position.y = 120;
        this.dotN.add(this.textN);
        this.groupN.add(this.dotN);
        this.groupN.position.y = 70;

        this.scene.add(this.groupN);
        this.scene.add(this.groupM);





        // this.scene.add(this.txtN);
    }

    createPointMN() { //创建M,N点
        if (this.pointM === null ) {  //第一次创建M,N

            this.pointM = this.axisUtils.initPointP('M');
            this.scene.add(this.pointM);
            this.pointM.add(this.groupM);

            this.pointN = this.axisUtils.initPointP('N');
            this.scene.add(this.pointN);
           this.pointN.add(this.groupN);
        }

        this.axisUtils.layoutPointAndText(this.pointM,
            this.pointN, this.dotM, this.dotN);

    }

    createLineMN() { //创建线段MN
        this.lineMN = this.axisUtils.createLineMN(this.lineMN, this.scene);
        this.scene.add(this.lineMN);
    }

    createFuZhuXian () {      //创建辅助线1
        this.fuzhuxian1 = this.axisUtils.createFuZhuXian(this.fuzhuxian1, this.scene );
        this.scene.add(this.fuzhuxian1);
        this.fuzhuxian1.visible = this.showLine1;
    }

    createFuZhuXian2 () {  //创建辅助线2
        this.fuzhuxian2 = this.axisUtils.createFuZhuXian2(this.fuzhuxian2, this.scene );
        this.scene.add(this.fuzhuxian2);
       this.fuzhuxian2.visible = this.showLine2;
    }

    productRandomPointM () { //随机产生M点
        this.axisUtils.productPointM();
       this.axisUtils.layoutPointAndText(this.pointM , this.pointN, this.dotM, this.dotN);
        this.lineMN =  this.axisUtils.createLineMN(this.lineMN, this.scene);
        this.scene.add(this.lineMN);
        this.createFuZhuXian();
        this.createFuZhuXian2();
    }

    productRandomPointN () { //随机产生N点
        this.axisUtils.productPointN();
        this.axisUtils.layoutPointAndText(this.pointM, this.pointN, this.dotM, this.dotN );
        this.lineMN =  this.axisUtils.createLineMN(this.lineMN, this.scene);
        this.scene.add(this.lineMN);
        this.createFuZhuXian();
        this.createFuZhuXian2();
    }
}

