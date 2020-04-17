import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Line} from '../../../../../src/three/component/Line';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {XOYConfig, XOYLineConfig, YOZConfig, YOZLineConfig, ZOXConfig, ZOXLineConfig} from './ZbpmConfig';

export class Zbpm3dModel extends ThreeBase {

    planeMesh: Mesh;
    private orbit: any;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;

    bluePlane: THREE.Group;
    greenPlane: THREE.Group;
    redPlane: THREE.Group;

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
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        this.createXOYPlane();
        this.createYOZPlane();
        this.createZOXPlane();
        this.createWord();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }

    initLight() {
        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.4));

        this.scene.add(this.lights[0]);

        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.7 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );
        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 200, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -200, -100);
        this.scene.add( c );
        this.scene.add( u );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const scale = BrowserUtil.getBrowserInfo().isSmallDevice ? 3 : 6;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(47,  34,  -34);
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
        this.orbit.enableZoom = false;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建坐标轴
    createAxis() {
        const scale = 0.5;
        const color = '#000000';
        const XAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const YAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const ZAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const XArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 100, 0, 0);
        const YArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 0, 100, 0);
        const ZArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 0, 0, -100);
        YAxis.rotateZ(Math.PI / 2);
        ZAxis.rotateX(Math.PI / 2);
        XArrow.rotateZ(-Math.PI / 2);
        ZArrow.rotateX(-Math.PI / 2);
        this.scene.add(XAxis);
        this.scene.add(YAxis);
        this.scene.add(ZAxis);
        this.scene.add(XArrow);
        this.scene.add(YArrow);
        this.scene.add(ZArrow);
    }

    //创建XOY面
    createXOYPlane() {
        this.bluePlane = new THREE.Group();
        const plane = ThreeUtil.createPlane(XOYConfig.width, XOYConfig.height, XOYConfig.color, XOYConfig.opacity);
        this.bluePlane.rotateX(Math.PI / 2);
        const line1 = ThreeUtil.createLineforPoint(XOYLineConfig.color, XOYLineConfig.Point1, XOYLineConfig.Point2);
        const line2 = ThreeUtil.createLineforPoint(XOYLineConfig.color, XOYLineConfig.Point2, XOYLineConfig.Point3);
        const line3 = ThreeUtil.createLineforPoint(XOYLineConfig.color, XOYLineConfig.Point3, XOYLineConfig.Point4);
        const line4 = ThreeUtil.createLineforPoint(XOYLineConfig.color, XOYLineConfig.Point4, XOYLineConfig.Point1);
        this.bluePlane.add(line1);
        this.bluePlane.add(line2);
        this.bluePlane.add(line3);
        this.bluePlane.add(line4);
        this.bluePlane.add(plane);
        this.bluePlane.visible = false;
        this.scene.add(this.bluePlane);
    }

    //创建YOZ面
    createYOZPlane() {
        this.greenPlane = new THREE.Group();
        const plane = ThreeUtil.createPlane(YOZConfig.width, YOZConfig.height, YOZConfig.color, YOZConfig.opacity);
        this.greenPlane.rotateY(Math.PI / 2);
        const line1 = ThreeUtil.createLineforPoint(YOZLineConfig.color, YOZLineConfig.Point1, YOZLineConfig.Point2);
        const line2 = ThreeUtil.createLineforPoint(YOZLineConfig.color, YOZLineConfig.Point2, YOZLineConfig.Point3);
        const line3 = ThreeUtil.createLineforPoint(YOZLineConfig.color, YOZLineConfig.Point3, YOZLineConfig.Point4);
        const line4 = ThreeUtil.createLineforPoint(YOZLineConfig.color, YOZLineConfig.Point4, YOZLineConfig.Point1);
        this.greenPlane.add(line1);
        this.greenPlane.add(line2);
        this.greenPlane.add(line3);
        this.greenPlane.add(line4);
        this.greenPlane.add(plane);
        this.greenPlane.visible = false;
        this.scene.add(this.greenPlane);
    }
    //创建ZOX面
    createZOXPlane() {
        this.redPlane = new THREE.Group();
        const plane = ThreeUtil.createPlane(ZOXConfig.width, ZOXConfig.height, ZOXConfig.color, ZOXConfig.opacity);
        const line1 = ThreeUtil.createLineforPoint(ZOXLineConfig.color, ZOXLineConfig.Point1, ZOXLineConfig.Point2);
        const line2 = ThreeUtil.createLineforPoint(ZOXLineConfig.color, ZOXLineConfig.Point2, ZOXLineConfig.Point3);
        const line3 = ThreeUtil.createLineforPoint(ZOXLineConfig.color, ZOXLineConfig.Point3, ZOXLineConfig.Point4);
        const line4 = ThreeUtil.createLineforPoint(ZOXLineConfig.color, ZOXLineConfig.Point4, ZOXLineConfig.Point1);
        this.redPlane.add(line1);
        this.redPlane.add(line2);
        this.redPlane.add(line3);
        this.redPlane.add(line4);
        this.redPlane.add(plane);
        this.redPlane.visible = false;
        this.scene.add(this.redPlane);
    }

    isShowXOY(isShow: boolean) {
        this.bluePlane.visible = isShow;
    }

    isShowYOZ(isShow: boolean) {
        this.greenPlane.visible = isShow;
    }

    isShowZOX(isShow: boolean) {
        this.redPlane.visible = isShow;
    }

    //重置场景方法
    reset() {
        for (let i = 0; i < 20; i++) {
            this.orbit.reset();
        }

    }

    createWord() {
        const scale = 0.2;
         this.text1 = ThreeUtil.createNewRomanText('x', 100, 0, 0, '#000000', scale);
         this.text2 = ThreeUtil.createNewRomanText('y', 0, 0, -100, '#000000', scale);
         this.text3 = ThreeUtil.createNewRomanText('z', 0, 115, 0, '#000000', scale);
         this.text4 = ThreeUtil.createNewRomanText('o', 5, 0, 0, '#000000', scale);
         this.scene.add(this.text1);
         this.scene.add(this.text2);
         this.scene.add(this.text3);
         this.scene.add(this.text4);
    }

}




