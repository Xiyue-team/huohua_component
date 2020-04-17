/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16: 52
 */
import * as THREE from 'three';
require('three.interaction');
require('three-gltf-loader');

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh, WebGLRenderer} from 'three';
import {PerspectiveCamera} from 'three';
import {TweenMax} from 'gsap';
import { SpriteText2D} from 'three-text2d';
import {ViewController} from '../../../../../src/core/ViewController';
import {DashLine} from '../../../../../src/three/component/DashLine';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

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
        redY: 0,
        dottedEndY: 100,
        l2textY: 110,
        length: 3,
    };

    // 红色实线移动的动画
    private timeRedLine: any;

    //虚线动画
    private timeDottedLine: any = [];

    // l2 文字
    private l2text: any;

    // 实线
    private solidLine1 = new DashLine();
    private solidLine2 = new DashLine();

    // 虚线
    private dashLine = new DashLine();
    private dashLine2 = new DashLine();
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
        // console.log(load);

        this.initScene();
        this.initCamera();
        this.initLight();

        this.initWebGLRenderer();
        this.initControl();
        this.render();

        this.addGirdding();
        // this.addLine();
        this.addLine2();
        this.addDottedLine2();
        this.addText();

        this.setAnimRedLine();
        this.setAnimDottedLine();

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
        const left1    = this.width / - 0.7;
        const right1   = this.width / 0.7;
        const top1     = this.height / 0.7;
        const bottom1  = this.height / - 0.7;
        const near1    = -500;
        const far1     = 1000;
        this.camera =  new THREE.OrthographicCamera(left1, right1, top1, bottom1, near1, far1);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 5, 20);
      } else {
        const left = this.width / -2;
        const right = this.width / 2;
        const top = this.height / 2;
        const bottom = this.height / -2;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 5, 20);
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
        // this.renderer = new CanvasRenderer.CanvasRenderer();
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
        // const helper = new THREE.GridHelper( 500, 20, 0xAEAEAE, 0xAEAEAE  );
        // helper.position.y = -40;
        // this.scene.add( helper );

        const geometry = new THREE.PlaneGeometry( 500, 500, 32 );
        const helper = new THREE.Mesh( geometry,
            new THREE.MeshBasicMaterial( {color:  '#4A90E2', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        this.scene.add( helper );

        helper.rotation.x = Math.PI / 2;
        helper.position.y = -40;
    }

    // 画实线
    addLine2() {
        // 蓝色
        this.blueLineMesh  = this.solidLine1.addLine(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(100, 100, -100),
            '#0DB2FF', 6, false);
        this.scene.add(this.blueLineMesh);

        // 红色
        this.redLineMesh  = this.solidLine2.addLine(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(100, 100, -100),
            '#FF1F3A', 6, false);
        this.scene.add(this.redLineMesh);

        this.redLineMesh.visible = false;
    }

    // 画虚线
    addDottedLine2() {
        // 画左侧虚线
        const line1 = this.dashLine.addLine(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(-100, 100, 100), '#000000', 3, true);
        this.scene.add(line1);

        // 画右侧虚线
        const line2 = this.dashLine2.addLine(new THREE.Vector3(100, 100, -100), new THREE.Vector3(100, 100, -100), '#000000', 3, true);
        this.scene.add(line2);
    }

    // 画文字
    addText() {
        const aText = this.createText('α' , 200, -10, -200, '#000000');
        const l1Text = this.createText('l₁' , -110, 110, 110, '#0DB2FF');
        this.l2text = this.createText('l₂' , -110, 110, 110, '#FF1F3A');

        this.scene.add(aText);
        this.scene.add(l1Text);
        this.scene.add(this.l2text);

        this.l2text.visible = false;
    }

    // 创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 48px "Times New Roman"' , fillStyle: color, antialias: true };
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }

    // 红色实线移动动画
    setAnimRedLine () {
        this.timeRedLine = TweenMax.to(this.tween, 1.8, {
            redY: -137,
            l2textY: -8,
            onUpdate: () => {
                this.updateRedLine();
            },
            paused: true
        });
    }

    // 更新红色实线的位置
    updateRedLine () {
        this.redLineMesh.position.setY(this.tween.redY);
        this.l2text.position.setY(this.tween.l2textY);
    }

    // 虚线动画
    setAnimDottedLine() {
        this.timeDottedLine[0] = this.dashLine.animation(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(-100, -35, 100), 1.8);
        this.timeDottedLine[1] = this.dashLine2.animation(new THREE.Vector3(100, 100, -100), new THREE.Vector3(100, -35, -100), 1.8);
    }

    open(value: any) {

        if (value === true) {
            this.timeRedLine.play();

            this.timeDottedLine[0].play();
            this.timeDottedLine[1].play();

            this.l2text.visible = true;
            this.redLineMesh.visible = true;
        } else {
            // 重置动画
            this.timeRedLine.progress(0);
            this.timeRedLine.pause();

            this.timeDottedLine[0].progress(0);
            this.timeDottedLine[0].pause();

            this.timeDottedLine[1].progress(0);
            this.timeDottedLine[1].pause();

            this.l2text.visible = false;
            this.redLineMesh.visible = false;
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }

    reset() {

        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(20, 5, 20);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
