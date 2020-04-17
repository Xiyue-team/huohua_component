/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16: 52
 */
import * as THREE from 'three';
require('three.interaction');
import {
    WebGLRenderer
} from 'three';
require('three-gltf-loader');
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {TimelineLite, Power0, TweenMax} from 'gsap';
import { SpriteText2D} from 'three-text2d';
import {ViewController} from '../../../../../src/core/ViewController';
import {DashLine} from '../../../../../src/three/component/DashLine';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

require('../../../../../src/libs/jsxgraphcore.js');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class LineFace3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    // 蓝色实线
    private blueLineMesh: any;

    // 红色实线
    private redLineMesh: any;

    private tween = {
        orbitX: 20,
        orbitY: 20,
        orbitZ: 20,
    };

    private timeOrbit: any;

    // l1 l2 文字
    private l1text: any;
    private l2text: any;

    // 直角线
    private lineMesh: any = [];

    // 组合动画
    private timeLine: any;

    // 实线
    private solidLine1 = new DashLine();
    private solidLine2 = new DashLine();
    private solidLine3 = new DashLine();

    // 直角用实线
    private solidLine4 = new DashLine();
    private solidLine5 = new DashLine();
    private solidLine6 = new DashLine();
    private solidLine7 = new DashLine();
    private isMobile = false;


    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
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
        this.render();

        this.addGirdding();
        this.addLine();
        this.addDottedLine();
        this.addText();

        this.setAnimOrbit();
        this.setTimeLineLate();

        ViewController.getInstance().hideLoading();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xffffff );
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
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 20, 20);
      } else {
        const left = this.width / -2;
        const right = this.width / 2;
        const top = this.height / 2;
        const bottom = this.height / -2;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 20, 20);
      }
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
        } else {
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
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
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

        this.orbit.minPolarAngle = Math.PI * 1 / 180; // radians
        this.orbit.maxPolarAngle = Math.PI * 179 / 180; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;

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


    //绘制网格线
    addGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 500, 20, 0xAEAEAE, 0xAEAEAE  );
        this.scene.add( helper );
    }

    // 画实线
    addLine() {
        // 画红色实线
        const redLineMesh = this.solidLine1.addLine(new THREE.Vector3(0, -100, 0), new THREE.Vector3(0, 100, 0),
            '#FF1F3A', 6, false);

        // 画绿色虚线
        this.blueLineMesh = this.solidLine2.addLine(new THREE.Vector3(-50, 0, -100), new THREE.Vector3(50, 0, 100),
            '#00CD43', 6, false);


        // 画红色虚线
        this.redLineMesh = this.solidLine3.addLine(new THREE.Vector3(-50, 0, 100), new THREE.Vector3(50, 0, -100),
            '#0DB2FF', 6, false);

        this.scene.add(redLineMesh);
        this.scene.add(this.blueLineMesh);
        this.scene.add(this.redLineMesh);

        this.blueLineMesh.visible = false;
        this.redLineMesh.visible = false;
    }

    // 画直角
    addDottedLine() {
        // 画红色实线

        this.lineMesh[0] = this.solidLine4.addLine(new THREE.Vector3(10, 20, -20), new THREE.Vector3(10, 0, -20),
            '#000000', 2, false);

        this.lineMesh[1] = this.solidLine5.addLine(new THREE.Vector3(0.1, 20, -0.2), new THREE.Vector3(10, 20, -20),
            '#000000', 2, false);

        this.scene.add(this.lineMesh[0]);
        this.scene.add(this.lineMesh[1]);

        this.lineMesh[2] = this.solidLine6.addLine(new THREE.Vector3(-10, 20, -20), new THREE.Vector3(-10, 0, -20),
            '#000000', 2, false);

        this.lineMesh[3] = this.solidLine7.addLine(new THREE.Vector3(-0.1, 20, -0.2), new THREE.Vector3(-10, 20, -20),
            '#000000', 2, false);

        this.scene.add(this.lineMesh[2]);
        this.scene.add(this.lineMesh[3]);

        this.lineMesh[0].visible = false;
        this.lineMesh[1].visible = false;
        this.lineMesh[2].visible = false;
        this.lineMesh[3].visible = false;

    }

    // 画文字
    addText() {
        const aText = this.createText('α' , 200, 20, -200, '#000000');

        const lText = this.createText('l' , -5, 110, 5, '#FF1F3A');

        this.l1text = this.createText('l₁' , -60, 20, 110, '#0DB2FF');
        this.l2text = this.createText('l₂' , 60, 20, 110, '#00CD43');

        this.scene.add(aText);
        this.scene.add(lText);
        this.scene.add(this.l1text);
        this.scene.add(this.l2text);

        this.l1text.visible = false;
        this.l2text.visible = false;
    }

    // 创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 48px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }

    setAnimOrbit () {
        this.timeOrbit = TweenMax.to(this.tween, 2, {
            orbitX: 5,
            orbitY: 120,
            orbitZ: 5,
            onUpdate: () => {
                this.updateOrbit();
            },
            paused: true
        });
    }

    // 更新视角
    updateOrbit () {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set( this.tween.orbitX, this.tween.orbitY, this.tween.orbitZ);
    }

    // 动画组合
    setTimeLineLate() {
        this.timeLine = new TimelineLite({
            paused: true
        });

        this.timeLine.add(() => {
            this.redLineMesh.visible = true;
            this.l1text.visible = true;

            this.lineMesh[0].visible = true;
            this.lineMesh[1].visible = true;
        }, 0.1);

        this.timeLine.add(() => {
            this.blueLineMesh.visible = true;
            this.l2text.visible = true;

            this.lineMesh[2].visible = true;
            this.lineMesh[3].visible = true;
        }, 1);

        this.timeLine.add(() => {
            this.timeOrbit.play();
        }, 1.3);

        this.timeLine.add(() => {
            this.timeOrbit.reverse();
        }, 3.5);
    }

    open(value: any) {

        if (value === true) {
            this.resetCamera();

            setTimeout(() => {
                this.timeLine.play();
            }, 100);


        } else {
            this.timeLine.progress(0);
            this.timeLine.pause();

            this.timeOrbit.progress(0);
            this.timeOrbit.pause();


            this.redLineMesh.visible = false;
            this.l1text.visible = false;

            this.lineMesh[0].visible = false;
            this.lineMesh[1].visible = false;

            this.blueLineMesh.visible = false;
            this.l2text.visible = false;

            this.lineMesh[2].visible = false;
            this.lineMesh[3].visible = false;
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }

    reset() {

        this.timeLine.progress(0);
        this.timeLine.pause();

        // 重置动画
        this.timeOrbit.progress(0);
        this.timeOrbit.pause();

        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(20, 20, 20);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
