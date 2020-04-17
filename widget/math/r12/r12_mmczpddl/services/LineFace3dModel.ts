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
import {TimelineLite, TweenMax} from 'gsap';
import { SpriteText2D } from 'three-text2d';
import {ViewController} from '../../../../../src/core/ViewController';
import { Line } from '../../../../../src/three/component/Line';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');




const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class LineFace3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    // 蓝色面模型
    private rectangleGeometry: any;
    // 蓝色面
    private rectangle: any;

    // 红色实线
    private redLineMesh: any;

    // a 文字
    private aText: any;

    private tween = {
        x: 0
    };

    private between = {
        orbitX: 20,
        orbitY: 20,
        orbitZ: 20,
    };

    private orbitTween = {
        orbitX: 20,
        orbitY: 20,
        orbitZ: 20,
    };

    // 视角动画
    private timeOrbit: any;

    // 蓝色面动画
    private timeRectangle: any;

    // 视角向上反转动画
    private timeTopOrbit: any;

    // l 文字
    private ltext: any;

    // 组合动画
    private timeLine: any;

    // 实线
    private solidLine = new Line();

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
        this.addText();
        this.setAnimRectangle();

        this.setAnimOrbit();
        this.setAnimTopOrbit();

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
        this.camera.position.set(20, 20, 20);
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
        const geometry = new THREE.PlaneGeometry( 500, 500, 32 );
        const helper = new THREE.Mesh( geometry,
            new THREE.MeshBasicMaterial( {color:  '#4A90E2', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        this.scene.add( helper );

        helper.rotation.x = Math.PI / 2;
    }

    // 画蓝色上底面
    addBlueFace() {
        this.rectangleGeometry = new THREE.PlaneGeometry( 400, 250, 32 );
        this.rectangle = new THREE.Mesh( this.rectangleGeometry,
            new THREE.MeshBasicMaterial( {color:  '#3EB4F1', side:  THREE.DoubleSide, transparent: true, opacity: 0.4} ) );
        this.scene.add( this.rectangle );

        this.rectangle.position.y = 125;
    }

    // 画实线
    addLine() {
        // 画红色线
        this.redLineMesh = this.solidLine.createLine({
          startPoint: new THREE.Vector3(0, -100, 0),
          endPoint: new THREE.Vector3(0, 100, 0),
          color: '#FF1F3A',
          lineWidth: 6,
        });

        this.scene.add(this.redLineMesh);

        this.redLineMesh.visible = false;
    }

    // 画文字
    addText() {
        this.aText = this.createText('α' , -175, 250, 15, '#000000');
        const bText = this.createText('β' , 200, 30, -200, '#000000');

        this.ltext = this.createText('l' , 0, 120, 10, '#FF1F3A');

        this.scene.add(this.aText);
        this.scene.add(bText);

        this.scene.add(this.ltext);

        this.ltext.visible = false;
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

    // 蓝色面展开动画
    setAnimRectangle() {
        this.timeRectangle = TweenMax.to(this.tween, 1.8, {
            x: 400,
            onUpdate: () => {
                this.updateRectangle();
            },
            paused: true
        });
    }

    // 更新蓝色面方法
    updateRectangle() {
        this.rectangleGeometry = new THREE.PlaneGeometry( this.tween.x, 250, 32 );
        this.rectangle.geometry.dispose();
        this.rectangle.geometry =  this.rectangleGeometry;
    }

    //视角移动动画
    setAnimOrbit () {
        this.timeOrbit = TweenMax.to(this.between, 2, {
            orbitX: 0,
            orbitY: 120,
            orbitZ: 0,
            onUpdate: () => {
                this.updateOrbit();
            },
            paused: true
        });
    }

    // 更新视角
    updateOrbit () {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set( this.between.orbitX, this.between.orbitY, this.between.orbitZ);
    }

    // 视角向上反转动画
    setAnimTopOrbit () {
        this.timeTopOrbit = TweenMax.to(this.orbitTween, 2, {
            orbitX: 20,
            orbitY: 0,
            orbitZ: 20,
            onUpdate: () => {
                this.updateTopOrbit();
            },
            paused: true
        });
    }

    // 向上翻转视角
    updateTopOrbit () {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set( this.orbitTween.orbitX, this.orbitTween.orbitY, this.orbitTween.orbitZ);
    }

    // 动画组合
    setTimeLineLate() {
        this.timeLine = new TimelineLite({
            paused: true
        });

        this.timeLine.add(() => {
            this.timeOrbit.play();
        }, 0.2);

        this.timeLine.add(() => {
            this.timeOrbit.reverse();
        }, 2);

        this.timeLine.add(() => {
            this.timeRectangle.play();
            this.aText.visible = true;
            this.rectangle.visible = true;
        }, 4);

        this.timeLine.add(() => {
            this.timeTopOrbit.play();
        }, 5.8);

        this.timeLine.add(() => {
            this.timeTopOrbit.reverse();
        }, 7.8);
    }

    open(value: any) {

        this.redLineMesh.visible = value;
        this.ltext.visible = value;

        if (value === true) {
            this.aText.visible = false;

            this.rectangleGeometry = new THREE.PlaneGeometry( 0, 250, 32 );
            this.rectangle.geometry.dispose();
            this.rectangle.geometry =  this.rectangleGeometry;
            this.rectangle.visible = false;

            this.resetCamera();
            setTimeout(() => {
                this.timeLine.play();
            }, 100);

        } else {
            this.aText.visible = true;

            // 重置动画
            this.timeLine.progress(0);
            this.timeLine.pause();

            this.timeRectangle.progress(0);
            this.timeRectangle.pause();

            this.timeOrbit.progress(0);
            this.timeOrbit.pause();

            this.timeTopOrbit.progress(0);
            this.timeTopOrbit.pause();


            this.rectangleGeometry = new THREE.PlaneGeometry( 400, 250, 32 );
            this.rectangle.geometry.dispose();
            this.rectangle.geometry =  this.rectangleGeometry;
            this.rectangle.visible = true;

            this.resetCamera();
        }
    }


    reset() {
        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(20, 20, 20);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }
}
