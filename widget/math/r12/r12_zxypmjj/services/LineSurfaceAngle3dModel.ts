import * as THREE from 'three';
import {DoubleSide, Mesh, Object3D, PerspectiveCamera, Vector3, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D, textAlign} from 'three-text2d';
import {LineSurfaceUtils} from './LineSurfaceUtils';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

export class LineSurfaceAngle3dModel extends ThreeBase {
    orbit: any;
    textA: any;
    private isMobile = false;
    grid: any;
    //实线
    lineMesh: any;
    cricle: any;

    getParameter = {
        angle: 45,
        length: 600
    };

    dashLineMesh: any = null;
    angleText: any = null;
    arcLine: any;

    arcMesh: any;
    lineSurfaceUtils: LineSurfaceUtils = new LineSurfaceUtils();

    //直角标志
    rightAngle: any;
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
        // this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGrid();
        this.createText();
        this.createLineMesh();
        this.createDashLineMesh();
        this.createArcLine();
        this.createRightAngle();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
        this.isMobile = true;
        const left = this.width / -0.7;
        const right = this.width / 0.7;
        const top = this.height / 0.7;
        const bottom = this.height / -0.7;
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

    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(80, 40, 80);
        for (let i = 0; i < 30; i++) {
            this.orbit.reset();
        }
    }

    reset() {

    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
       // this.renderer = new CanvasRenderer.CanvasRenderer();
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


    //绘制网格
    createGrid() {
        // 网格的边长是500，将边长平分成20个网格
        // const helper = new THREE.GridHelper(500, 20, 0xAEAEAE, 0xAEAEAE);
        // this.scene.add(helper);

        // const plane = new THREE.PlaneGeometry( 400, 250, 32 );
        // const mesh = new THREE.Mesh( plane);
        //     new THREE.MeshBasicMaterial( {color:  '#3EB4F1', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        // this.scene.add( this.rectangle );
        //
        // this.rectangle.position.y = 125;
        const geometry = new THREE.PlaneBufferGeometry( 500, 500, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0x4A90E2, side: THREE.DoubleSide, opacity: 0.4, transparent: true} );
        const plane = new THREE.Mesh( geometry, material );
        this.scene.add( plane );
        plane.rotation.x = Math.PI / 2;

    }

    //创建字体
    createText() {
        this.textA = this.lineSurfaceUtils.createText('α', -200, 22, 200, '#000000');
        this.scene.add(this.textA);


        const textStyle = {align: textAlign.center, font: '48px "Arial"', fillStyle: '#000000', antialias: true};
        this.angleText = new SpriteText2D(this.getParameter.angle + '°', textStyle);
        this.angleText.position.set(35, 22 , -50);
        this.angleText.scale.set(0.5 , 0.5, 0.5);
        this.scene.add(this.angleText);
    }

    //创建实线
    createLineMesh() {

       this.lineMesh = new THREE.Object3D();
       const line = this.lineSurfaceUtils.createLine(this.getParameter.length, '#FF1F3A');

       const text = this.lineSurfaceUtils.createText('l', this.getParameter.length / 2 + 20, 20, 0, '#000000');
       this.lineMesh.add(line);
       this.lineMesh.rotation.set(0, Math.PI / 4, Math.PI / 180 * this.getParameter.angle);
        this.lineMesh.add(text);
        this.scene.add(this.lineMesh);
    }

    //创建虚线
    createDashLineMesh () {
        //判断虚线 是否 已经存在
        if (this.dashLineMesh !== null) {
            this.scene.remove(this.dashLineMesh);
        }
        // if (this.angleText !== null) {
        //     this.scene.remove(this.angleText);
        // }

        this.dashLineMesh = this.lineSurfaceUtils.createDashLine(this.getParameter);
        this.scene.add(this.dashLineMesh);

        // this.angleText = this.lineSurfaceUtils.createText(this.getParameter.angle + '°',  50,  22,  -20,  '#000000');


    }

    createArcLine () { //创建弧线

        if (this.getParameter.angle === 0) {
            this.scene.remove(this.arcLine);
            return;
        }

        if (this.arcLine !== null) {
            this.scene.remove(this.arcLine);
        }

        //画弧线
        this.arcLine = this.lineSurfaceUtils.createArcLine(this.getParameter);
        if  (this.arcLine !== null) {
            this.scene.add(this.arcLine);
            // this.arcLine.visible = false;
        }

    }

    changeSlider(sliderValue: any , angle: any) { //拖动滑条调用
        this.getParameter.angle = Number.parseInt(sliderValue);
        this.lineMesh.rotation.z = Math.PI * this.getParameter.angle / 180;
        this.angleText.text = this.getParameter.angle + '°';
     //   this.createDashLineMesh();

       this.createArcLine();
        if (sliderValue === 90) {   //角度为90度时 显示直角标志 ， 隐藏圆弧
            this.rightAngle.visible = true;
            this.arcLine.visible = false;
        } else {
            this.rightAngle.visible = false;
            this.arcLine.visible = true;
        }
    }

    //创建直角标志
    createRightAngle() {

        this.rightAngle = new Object3D();

        // let arry: Array<Vector3> = [];
        // arry.push(new Vector3(10, 0 , 0));
        // arry.push(new Vector3(10 , 10 , 0));
        // const line1 = this.lineSurfaceUtils.createLineMesh(arry, '#000000');
        // line1.rotation.y = Math.PI / 4;
        // this.scene.add(line1);
        //
        // arry = [];
        // arry.push(new Vector3(0, 10 , 0));
        // arry.push(new Vector3(10, 10 , 0 ));
        // const line2 = this.lineSurfaceUtils.createLineMesh(arry, '#000000');
        // line2.rotation.y = Math.PI / 4;
        // this.scene.add(line2);

        const line1 = this.lineSurfaceUtils.createRightAngle(new Vector3(20, 0 , 0), new Vector3(20 , 20 , 0));
      //  this.scene.add(line1);

        const line2 = this.lineSurfaceUtils.createRightAngle(new Vector3(0, 20 , 0), new Vector3(20, 20 , 0));
       // this.scene.add(line2);
        this.rightAngle.add(line1, line2);
        this.scene.add(this.rightAngle);
        this.rightAngle.visible = false;



    }

}


