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
import set = Reflect.set;
import { SpriteText2D, textAlign } from 'three-text2d';
import {ViewController} from '../../../../../src/core/ViewController';
import {DashLine} from '../../../../../src/three/component/DashLine';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

/*require('../../../../../src/libs/jsxgraphcore.js');*/

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class LineFace3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    // 蓝色实线
    private blueLineMesh: any = [];

    // 红色实线
    private redLineMesh: any = [];

    // 虚线实体
    private dottedLine: any = [];

    private tween = {

        redY: 0,
        dottedEndY: 100,
        l2textY: 110
    };

    private between = {

        redY: 0,
        dottedEndY: 100,
        l2textY: 110
    };

    // 红色实线移动的动画
    private timeRedLine: any;

    // 蓝色实线移动的动画
    private timeBlueLine: any;

    //虚线动画
    private timeDottedLine: any = [];

    // l1 文字
    private l1Text: any = [];

    // l2 文字
    private l2text: any = [];

    // 组合动画
    private timeLine: any;

    // 实线
    private solidLine1 = new DashLine();
    private solidLine2 = new DashLine();
    private solidLine3 = new DashLine();
    private solidLine4 = new DashLine();

    // 虚线
    private dashLine1 = new DashLine();
    private dashLine2 = new DashLine();
    private dashLine3 = new DashLine();
    private dashLine4 = new DashLine();

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
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.initCamera(0.8);
        } else if (BrowserUtil.getBrowserInfo().isIpad) {
            this.initCamera(1.2);
        } else {
            this.initCamera(2);
        }
        this.initLight();

        this.initWebGLRenderer();
        this.initControl();
        this.render();

        this.addGirdding();
        this.addBlueFace();

        this.addLine();
        this.addDottedLine();
        this.addText();

        this.setAnimRedLine();
        this.setAnimBlueLine();

        this.setAnimDottedLine();

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
    initCamera(n: number): void {
        const left    = this.width / - n;
        const right   = this.width / n;
        const top     = this.height / n;
        const bottom  = this.height / - n;
        const near    = -500;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(20, 12, 40);
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

    // 画蓝色上底面
    addBlueFace() {
        const geometry = new THREE.PlaneGeometry( 500, 500, 32 );
        const rectangle = new THREE.Mesh( geometry,
            new THREE.MeshBasicMaterial( {color:  '#3EB4F1', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        this.scene.add( rectangle );

        rectangle.rotation.x = Math.PI / 2;
        rectangle.position.y = 100;
    }

    // 画实线
    addLine() {
        // 画蓝色虚线
        this.blueLineMesh[0] = this.solidLine1.addLine(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(100, 100, -100),
            '#0DB2FF', 6, false);

        // 用于放在a平面上固定不动
        this.blueLineMesh[1] = this.solidLine2.addLine(new THREE.Vector3(-100, 105, 100), new THREE.Vector3(100, 100, -100),
            '#0DB2FF', 6, false);

        // 画红色虚线
        this.redLineMesh[0] = this.solidLine3.addLine(new THREE.Vector3(-100, 100, -100), new THREE.Vector3(100, 100, 100),
            '#FF1F3A', 6, false);

        this.redLineMesh[1] = this.solidLine4.addLine(new THREE.Vector3(-100, 105, -100), new THREE.Vector3(100, 100, 100),
            '#FF1F3A', 6, false);

        this.scene.add(this.blueLineMesh[0]);
        this.scene.add(this.blueLineMesh[1]);

        this.scene.add(this.redLineMesh[0]);
        this.scene.add(this.redLineMesh[1]);

        this.blueLineMesh[0].visible = false;
        this.blueLineMesh[1].visible = false;

        this.redLineMesh[0].visible = false;
        this.redLineMesh[1].visible = false;
    }

    // 画虚线
    addDottedLine() {
        // 画蓝色实线左侧虚线
        this.dottedLine[0] = this.dashLine1.addLine(
            new THREE.Vector3(-100, 100, 100), new THREE.Vector3(-100, 100, 100), '#000000', 3, true);

        // 画蓝色实线右侧虚线
        this.dottedLine[1] = this.dashLine2.addLine(
            new THREE.Vector3(100, 100, -100), new THREE.Vector3(100, 100, -100), '#000000', 3, true);

        this.scene.add(this.dottedLine[0]);
        this.scene.add(this.dottedLine[1]);

        // 画红色左侧虚线
        this.dottedLine[2] = this.dashLine3.addLine(
            new THREE.Vector3(-100, 100, -100), new THREE.Vector3(-100, 100, -100), '#000000', 3, true);

        // 画红色右侧虚线
        this.dottedLine[3] = this.dashLine4.addLine(
            new THREE.Vector3(100, 100, 100), new THREE.Vector3(100, 100, 100), '#000000', 3, true);

        this.scene.add(this.dottedLine[2]);
        this.scene.add(this.dottedLine[3]);
    }

    // 画文字
    addText() {
        const aText = this.createText('α' , 200, 135, -200, '#000000');
        const bText = this.createText('β' , 200, -5, -200, '#000000');

        this.l1Text[0] = this.createText('l₄' , -110, 120, 110, '#0DB2FF');
        this.l2text[0] = this.createText('l₃' , -110, 120, -110, '#FF1F3A');

        this.l1Text[1] = this.createText('l₂' , -110, 130, 110, '#0DB2FF');
        this.l2text[1] = this.createText('l₁' , -110, 130, -110, '#FF1F3A');

        this.scene.add(aText);
        this.scene.add(bText);

        this.scene.add(this.l1Text[0]);
        this.scene.add(this.l1Text[1]);

        this.scene.add(this.l2text[0]);
        this.scene.add(this.l2text[1]);

        this.l1Text[0].visible = false;
        this.l1Text[1].visible = false;

        this.l2text[0].visible = false;
        this.l2text[1].visible = false;
    }

    // 创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 48px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
      text.material.depthTest = false;
        return text;
    }

    // 实线移动动画
    setAnimRedLine () {
        this.timeRedLine = TweenMax.to(this.tween, 1.8, {
            redY: -135,
            l2textY: -10,
            onUpdate: () => {
                this.updateRedLine();
            },
            paused: true
        });
    }

    // 更新实线的位置
    updateRedLine () {
        this.redLineMesh[0].position.setY(this.tween.redY);
        this.l2text[0].position.setY(this.tween.l2textY);
    }

    // 实线移动动画
    setAnimBlueLine () {
        this.timeBlueLine = TweenMax.to(this.between, 1.8, {
            redY: -135,
            l2textY: -10,
            onUpdate: () => {
                this.updateBlueLine();
            },
            paused: true
        });
    }

    updateBlueLine () {
        this.blueLineMesh[0].position.setY(this.between.redY);
        this.l1Text[0].position.setY(this.between.l2textY);
    }

    // 虚线动画
    setAnimDottedLine() {
        this.timeDottedLine[0] = this.dashLine1.animation(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(-100, -30, 100), 1.8);
        this.timeDottedLine[1] = this.dashLine2.animation(new THREE.Vector3(100, 100, -100), new THREE.Vector3(100, -30, -100), 1.8);
        this.timeDottedLine[2] = this.dashLine3.animation(new THREE.Vector3(-100, 100, -100), new THREE.Vector3(-100, -30, -100), 1.8);
        this.timeDottedLine[3] = this.dashLine4.animation(new THREE.Vector3(100, 100, 100), new THREE.Vector3(100, -30, 100), 1.8);

    }

    // 动画组合
    setTimeLineLate() {
        this.timeLine = new TimelineLite({
            paused: true
        });

        this.timeLine.add(() => {
            this.l1Text[1].visible = true;
            this.l2text[1].visible = true;

            this.blueLineMesh[1].visible = true;
            this.redLineMesh[1].visible = true;
        }, 0.1);

        this.timeLine.add(() => {
            this.redLineMesh[0].visible = true;
            this.l2text[0].visible = true;



            this.timeDottedLine[2].play();
            this.timeDottedLine[3].play();

            this.timeRedLine.play();

        }, 0.3);

        this.timeLine.add(() => {
            this.blueLineMesh[0].visible = true;
            this.l1Text[0].visible = true;

            this.timeDottedLine[0].play();
            this.timeDottedLine[1].play();

            this.timeBlueLine.play();

        }, 2.2);

    }

    open(value: any) {

        if (value === true) {
            this.timeLine.play();
        } else {
            // 重置动画
            this.timeLine.progress(0);
            this.timeLine.pause();

            this.timeRedLine.progress(0);
            this.timeRedLine.pause();

            this.timeBlueLine.progress(0);
            this.timeBlueLine.pause();

            this.timeDottedLine[0].progress(0);
            this.timeDottedLine[0].pause();

            this.timeDottedLine[1].progress(0);
            this.timeDottedLine[1].pause();

            this.timeDottedLine[2].progress(0);
            this.timeDottedLine[2].pause();

            this.timeDottedLine[3].progress(0);
            this.timeDottedLine[3].pause();

            this.blueLineMesh[0].visible = false;
            this.blueLineMesh[1].visible = false;

            this.redLineMesh[0].visible = false;
            this.redLineMesh[1].visible = false;

            this.l1Text[0].visible = false;
            this.l1Text[1].visible = false;

            this.l2text[0].visible = false;
            this.l2text[1].visible = false;
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
        this.orbit.object.position.set(20, 12, 40);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
