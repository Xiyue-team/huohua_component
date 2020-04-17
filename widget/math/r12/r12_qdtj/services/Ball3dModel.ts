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
import {WebGLRenderer, Mesh, PerspectiveCamera} from 'three';
import {TimelineLite, Power0, TweenMax} from 'gsap';

import {ViewController} from '../../../../../src/core/ViewController';

const OBJLoader = require('three-obj-loader');



const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Ball3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    private radius = 5 * 20;

    private edges: any;
    private line: any;

    private mesh: any;

    private anim: any;
    private sphGeoFill: any;

    // 定义一个变量 球的面数
    private noodles = 20;

    // 判断动画是否可以执行
    private valueBoolean = true;

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );

        // this.stats.update();
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


        this.addBall();

        this.render();
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
        const left    = this.width / - 2;
        const right   = this.width / 2;
        const top     = this.height / 2;
        const bottom  = this.height / - 2;
        const near    = -500;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(-20, 20, 0);
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


    addBall() {
        this.createFill(Math.PI);
        this.mesh.visible = false;

        this.edges    = new THREE.EdgesGeometry(this.sphGeoFill, 1);
        this.line     = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color:  0x4A90E2 } ) );

        this.scene.add(this.line);
    }

    // 滑块控制球的半径
    dragRadius(value: number) {
        this.radius = value * 20;
        this.sphGeoFill = new THREE.SphereGeometry( this.radius, this.noodles, this.noodles );
        this.updateGroupGeometry(this.mesh, this.sphGeoFill);
        this.mesh.visible = false;
        this.updateLines2th(this.sphGeoFill);

        window.clearInterval(this.anim);

        document.getElementById('volume_number').innerText = (0).toString();
        this.valueBoolean = true;
    }

    // 更新模型
    updateGroupGeometry( mesh: any, geometry: any) {
        mesh.geometry.dispose();
        mesh.geometry = geometry;
    }

    // 更新边框线
    updateLines2th(geometry: any) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 1);
    }

    // 注满液体动画
    createFill(theta: any) {
        const materialSphFill = new THREE.MeshBasicMaterial({
            color : '#4A90E2', opacity : 0.6, transparent : true, side: THREE.DoubleSide
        });
        this.sphGeoFill = new THREE.SphereGeometry( this.radius, this.noodles, this.noodles, 0, Math.PI * 2, 0, theta );
        this.mesh = new THREE.Mesh( this.sphGeoFill, materialSphFill );
        this.mesh.rotation.x = Math.PI;
        this.mesh.position.y = 0;
        this.scene.add(this.mesh);

        this.updateGroupGeometry(this.mesh, this.sphGeoFill);
    }

    // 启动注满液体动画
    clickEvent() {

        if (this.valueBoolean === true) {
            let a = 1;
            this.createFill(Math.PI / 180);
            this.mesh.visible = true;
            let t = Math.PI / 180;
            const volume = 4 / 3 * Math.PI * this.radius / 12 * this.radius / 12;

            const volumeNumber = (document.getElementById('volume_number').outerText) as any;

            this.anim = setInterval(() => {
                if (a >= 180) {
                    window.clearInterval(this.anim);
                }
                if (volumeNumber > (volume - 2)) {
                    document.getElementById('volume_number').innerText = (volumeNumber);
                } else {
                    document.getElementById('volume_number').innerText = (a / 180 * volume).toFixed(2).toString();
                }


                this.sphGeoFill = new THREE.SphereGeometry( this.radius, this.noodles, this.noodles, 0, Math.PI * 2, 0, t );
                this.updateGroupGeometry(this.mesh, this.sphGeoFill);
                t = Math.PI / 180 * a;
                a += 1;
            }, 16);

            this.valueBoolean = false;
        }

    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

    reset() {

        window.clearInterval(this.anim);
        this.scene.remove(this.mesh);
        this.mesh.geometry.dispose();

        document.getElementById('volume_number').innerText = (0).toString();
        this.valueBoolean = true;

        // 重置相机
        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 20, 0);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
