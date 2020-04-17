import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {setTimeout} from 'timers';
import {SpriteText2D} from 'three-text2d';
import {DashLine} from '../../../../../src/three/component/DashLine';
import {YmzxUtils} from './YmzxUtils';
import {TweenMax} from 'gsap';

const dragcontrols = require('three-dragcontrols').default;


const CanvasRenderer = require('../../../../../src/libs/CanvasRenderer');

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Ymzx3dModel extends ThreeBase {

    planeMesh: Mesh;
   /* cameraControl: boolean = false;*/
    // private orbit: any;
    private utils = new YmzxUtils();
    private movingPoint1: any;
    private movingPoint2: any;
    private slider1: any;
    private line1: any;
    private line2: any;
    private transform = {
        positionX : 0,
        positionZ : 0,

    };
    ctrl = true;
    private point: any;
    private animation: any;
    private controls: any;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private texta: any;
    private textb: any;
    private textc: any;
    private angleText1: any;
    private group: any;

    private dashLine1 = new DashLine();

    private render = () => {


        requestAnimationFrame( this.render );
        this.controls.update();
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
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();

        this.movingPoint1 = [];
        this.movingPoint2 = [];
        //赋初始值
        this.movingPoint1.push(-50, 0, 0);
        this.movingPoint2.push(0, 50, -50 - 10);

        //初始化网格
        this.createGirdding();
        //初始化场景内容
        this.render();
        this.initSc();

    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 4) / (this.height / 4), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(-231,  82,  -111);
    }


    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
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
    tbctrl() {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = true;
        this.controls.noRotate = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
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


    //创建点1
    createPoint1() {
        const geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xff1f3a, side:  THREE.DoubleSide, transparent: true, opacity: 1} );
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = 0;
        sphere.position.y = 50;
        sphere.position.z = -50 - 10;
        console.log(dragcontrols);
        const dargControls = new dragcontrols([sphere], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            material.opacity = 0.3;
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.resetLine2(sphere.position.x,
                sphere.position.y,
                sphere.position.z, );

            this.disposeLine2();
            if (this.ctrl) {
                this.changeLine2();
            } else {
                this.changeLine3();
            }
            this.setAngleText();
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; material.opacity = 1; } );
        return sphere;
    }

    createPoint2() {
        const geometry = new THREE.SphereBufferGeometry( 0.7, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0x000000, side:  THREE.DoubleSide, transparent: true, opacity: 1} );
        const sphere = new THREE.Mesh( geometry, material );
        return sphere;
    }




    //创建直线
    changeLine1() {
        const a = new THREE.Vector3(50, 0, 0);
        const b = new THREE.Vector3( -50, 0, 0 );

        this.line1 = this.dashLine1.addLine(a, b, '#4a90e2', 1500, false);
        this.scene.add(this.line1);
    }


    changeLine2() {
        const a = new THREE.Vector3(0, 0, -10);
        const b = new THREE.Vector3(this.movingPoint2[0], this.movingPoint2[1], this.movingPoint2[2]);
        this.line2 = this.dashLine1.addLine(a, b, '#FF1F3A', 1500, false);
        this.scene.add(this.line2);
    }

    changeLine3() {
        const a = new THREE.Vector3(50, 0, 0);
        const b = new THREE.Vector3(this.movingPoint2[0] + 50, this.movingPoint2[1], this.movingPoint2[2] + 10);
        this.line2 = this.dashLine1.addLine(a, b, '#FF1F3A', 1500, false);
        this.scene.add(this.line2);
    }



    //删除重绘直线
    disposeLine2() {
        this.scene.remove(this.line2);
        this.line2.geometry.dispose();
        this.line2.material.dispose();
    }



    //将直线变为可拖动
    resetLine2(x: number, y: number, z: number) {
        this.movingPoint2[0] = x;
        this.movingPoint2[1] = y;
        this.movingPoint2[2] = z;
    }


    //创建动画效果
    createAnimation() {
        this.animation = TweenMax.to(this.transform, 0.5, {
            positionX: 50,
            positionZ: 10,
            onUpdate: () => {
                this.resetPositionLine();
            },
            paused: true
        });
    }


    //启动动画
    playAnimation() {
        this.ctrl = false;
        this.point.visible = false;
        this.animation.play();
        this.disposeLine2();
        this.changeLine2();
        setTimeout(() => {
            this.text3.visible = false;
            this.text4.visible = false;
            this.texta.visible = false;
            this.textb.visible = false;
            this.textc.visible = true;
            this.point.visible = true;
        }, 500);

    }

    //重置动画
    resetAnimation() {
        this.animation.progress(0);
        this.animation.pause();
        // this.animation1.progress(0);
        // this.animation1.pause();
    }

    //创建移动线的方法
    resetPositionLine() {
        this.group.position.x = this.transform.positionX;
        this.group.position.z = this.transform.positionZ;
        this.line2.position.x = this.transform.positionX;
        this.line2.position.z = this.transform.positionZ;
    }

    //创建移动点的方法
    resetPositonPoint() {
        this.slider1.position.x = this.movingPoint1[0] - 50;
        this.slider1.position.z = this.movingPoint1[2] - 10;
    }




    /*
    * 计算角度
    * */

    //获取当前角度


    //初始场景
    initSc() {
        this.group = new THREE.Group();
        this.slider1 = this.createPoint1();
        this.group.add(this.slider1);
        this.scene.add(this.group);
        this.changeLine1();
        this.changeLine2();
        this.point = this.createPoint2();
        this.scene.add(this.point);
        this.point.position.set(50, 0, 0);
        this.point.visible = false;
        this.createAnimation();
        this.text1 = this.utils.createText('l₁', 0, 7, 5, '#4a90e2');
        this.text2 = this.utils.createText('l₂', -5, -5, 5, '#FF1F3A');
        this.text3 = this.utils.createText('M', 50, 7, 0, '#000000');
        this.text4 = this.utils.createText('N', -50, 7, 0, '#000000');
        this.texta = this.utils.createText('O', 0, 7, -7, '#000000');
        this.textb = this.utils.createText('P', 0, 10, 0, '#000000');
        this.group.add(this.texta);
        this.scene.add(this.text1);
        this.scene.add(this.text3);
        this.scene.add(this.text4);
        this.slider1.add(this.text2);
        this.slider1.add(this.textb);
        this.textc = this.utils.createTextAngle(
            this.getAngleByVector(
                [-50, 0, 0], [this.movingPoint2[0] + 50, this.movingPoint2[1], this.movingPoint2[2]], [50, 0, 0]) + '°',
            40, 10 , 0, '#000000');
        this.scene.add(this.textc);
        this.textc.visible = false;
    }


    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 200, 20, 0xAEAEAE, 0xAEAEAE  );
        this.scene.add( helper );

    }


    //重新设置角度值
    setAngleText() {
        this.textc.text = this.getAngleByVector([-50, 0, 0], [this.movingPoint2[0] + 50, this.movingPoint2[1], this.movingPoint2[2]],
            [50, 0, 0]) + '°';
    }


    /*
    * 重置场景
    * */
    sceneReset() {
        this.movingPoint2[0] = 0;
        this.movingPoint2[1] = 50;
        this.movingPoint2[2] = -50 - 10;
        this.slider1.position.set(0, 50, -50 - 10);
        this.group.position.set(0, 0, 0);
        this.disposeLine2();
        this.changeLine2();
        this.setAngleText();
        this.ctrl = true;
        this.text3.visible = true;
        this.text4.visible = true;
        this.texta.visible = true;
        this.textb.visible = true;
        this.textc.visible = false;
        this.point.visible = false;
    }

    //已知三边求角方法
    getAngleByVector(vector1: any, vector2: any, vector3: any) {
        const p1 = new THREE.Vector3(vector1[0], vector1[1], vector1[2]);
        const p2 = new THREE.Vector3(vector2[0], vector2[1], vector2[2]);
        const p3 = new THREE.Vector3(vector3[0], vector3[1], vector3[2]);
        const d1 = new THREE.Vector3();
        const d2 = new THREE.Vector3();
        const d3 = new THREE.Vector3();
        const v1 = d1.subVectors(p2, p3).length();
        const v2 = d2.subVectors(p3, p1).length();
        const v3 = d3.subVectors(p1, p2).length();
        const angle = (Math.acos((Math.pow(v1, 2) + Math.pow(v2, 2) - Math.pow(v3, 2)) / (2 * v1 * v2)) * 180 / Math.PI) .toFixed(0);
        return angle;
    }



}




