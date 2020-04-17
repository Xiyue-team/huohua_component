/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {OrthographicCamera, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {TweenMax, Power0} from 'gsap';
import { SpriteText2D} from 'three-text2d';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BallConfig, LetterPosition, OneScene, TwoScece} from './BallConfig';
import {DashLine} from '../../../../../src/three/component/DashLine';
import {CreateEllipseLineUtil} from './CreateEllipseLineUtil';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
export class Ball3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    private obj: any;

    private obj1: any;

    private obj2: any;

    private obj3: any;

    private obj4: any;

    private obj5: any;

    private obj6: any;



    // O1点
    private o1Spot: any;
    // O1点文字
    private o1Text: any;

    private dashLine = new CreateEllipseLineUtil();
    private solidLine = new DashLine();

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
    }


    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
     init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.init3DModel();

        this.initWebGLRenderer();
        this.initControl();

        this.render();
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {

        // this.camera = new THREE.PerspectiveCamera(this.fov,this.width/this.height,this.near, this.far);
        // this.camera.position.z = 10;
        if (this.browserInfo.isMobile || this.browserInfo.isIphone) {
            this.camera =  new THREE.OrthographicCamera( this.width / - 20, this.width / 20, this.height / 20,
                this.height / -20, 1, 1000);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.camera.position.set(-2, 5, 20);
        } else {
            this.camera =  new THREE.OrthographicCamera( this.width / - 50, this.width / 50, this.height / 50,
                this.height / -50, 1, 1000);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.camera.position.set(-2, 5, 20);
        }
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
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
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.orbit.enableZoom = true;
        //是否自动旋转
        this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

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

    init3DModel() {

        this.addBall();

        this.addObj();

        this.addObj1();

        this.addObj2();

        this.addObj3();

        this.addObj4();

        this.addObj5();

        this.addObj6();

        this.addScece();
    }

    // 添加球
    addBall() {

        // 球的面数
        const noodles = BallConfig.ballNoodles;
        // 球的半径
        const radius = BallConfig.ballRadius;
        const sphGeoFill = new THREE.SphereGeometry( radius, noodles, noodles);

        const materialSphFill = new THREE.MeshPhongMaterial({color : '#C2DEFF', specular: '#ffffff', shininess: 30, side: THREE.FrontSide});

        const mesh = new THREE.Mesh( sphGeoFill, materialSphFill );

        this.scene.add(mesh);

        // 球心
        const ballCenterRadius = BallConfig.ballCenterRadius;

        const ballCenterGeomentry = new THREE.SphereGeometry( ballCenterRadius, noodles, noodles);
        const ballCenterMaterial = new THREE.MeshBasicMaterial({color: '#000000', opacity: 1, depthTest: false});
        const ballCenter = new THREE.Mesh( ballCenterGeomentry, ballCenterMaterial );
        this.scene.add(ballCenter);

        const atext =  this.createText('A', LetterPosition.A.x, LetterPosition.A.y, LetterPosition.A.z, '#000000');
        this.scene.add(atext);

        const otext =  this.createText('O', LetterPosition.O.x, LetterPosition.O.y, LetterPosition.O.z, '#000000');
        this.scene.add(otext);

        // A点
        const aRadius = BallConfig.ballCenterRadius;
        // 球的面数
        const anoodles = BallConfig.ballNoodles;

        const aGeomentry = new THREE.SphereGeometry( aRadius, anoodles, anoodles);

        const aMaterial = new THREE.MeshBasicMaterial({color: '#000000', opacity: 1, depthTest: false});
        const aSpot = new THREE.Mesh( aGeomentry, aMaterial );
        this.scene.add(aSpot);

        aSpot.position.y = OneScene.aSpotY;
        aSpot.position.z = OneScene.aSpotZ;


    }

    // 画正体字
    createSonfTiText(texts: any , x: any, y: any, z: any, color: any) {
        const textStyle = {font: '240px Arial' , fillStyle: color, antialias: false};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.005, 0.005, 0.005);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    // 画斜体字
    createText(texts: any , x: any, y: any, z: any, color: any) {
        const textStyle = {font: 'italic 240px "Times New Roman"' , fillStyle: color, antialias: false};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.005, 0.005, 0.005);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }


    addObj() {
        this.obj = new THREE.Object3D();

        // 横向圆
        const line1 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#0061D2', 3, 0.003, Math.PI * 2);
        const line2 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#0061D2', 2, 0.003, Math.PI * 2);

        line1.rotation.x = OneScene.rotationX;
        line2.rotation.x = OneScene.rotationX;

        line1.position.y = OneScene.line1y;
        line2.position.y = OneScene.line1y;

        this.obj.add(line1);
        this.obj.add(line2);

        this.scene.add(this.obj);
    }

    addObj1() {
        this.obj1 = new THREE.Object3D();
        // 纵向圆
        const line3 = this.dashLine.addEllipseLine( OneScene.line2Radius, '#0061D2', 3, 0.003, Math.PI);
        const line4 = this.dashLine.addEllipseLine( OneScene.line2Radius, '#0061D2', 2, 0.003, Math.PI);

        line3.rotation.y = OneScene.rotationY;
        line4.rotation.y = OneScene.rotationY;

        line3.rotation.x = OneScene.xRotation;
        line4.rotation.x = OneScene.xRotation;

        this.obj1.add(line3);
        this.obj1.add(line4);



        // 指向文字的两条线
        const line1 = this.solidLine.addLine(
            new THREE.Vector3(0, 10, 3), new THREE.Vector3(5, 13, 0),
            '#000000', 3, false);
        this.obj1.add(line1);

        const line2 = this.solidLine.addLine(
            new THREE.Vector3(7.2, 7.2, 0), new THREE.Vector3(12.2, 10.2, -3),
            '#000000', 3, false);
        this.obj1.add(line2);


        const text1 =  this.createSonfTiText('东经30°', OneScene.text1.x, OneScene.text1.y, OneScene.text1.z, '#000000');
        this.obj1.add(text1);

        const text2 =  this.createSonfTiText('北纬45°', OneScene.text2.x, OneScene.text2.y, OneScene.text2.z, '#000000');
        this.obj1.add(text2);


        this.scene.add(this.obj1);
    }

    addObj2() {
        this.obj2 = new THREE.Object3D();

        // O1点
        const aRadius = BallConfig.ballCenterRadius;
        // 球的面数
        const anoodles = BallConfig.ballNoodles;

        const aGeomentry = new THREE.SphereGeometry( aRadius, anoodles, anoodles);

        const aMaterial = new THREE.MeshBasicMaterial({color: '#000000', opacity: 1, depthTest: false});
        this.o1Spot = new THREE.Mesh( aGeomentry, aMaterial );
        this.obj2.add(this.o1Spot);

        this.o1Spot.position.y = TwoScece.o1SpotY;
        this.o1Spot.position.z = TwoScece.o1SpotZ;

        // O1 点文字
        this.o1Text =  this.createText('O₁', LetterPosition.O1.x, LetterPosition.O1.y, LetterPosition.O1.z, '#000000');
        this.obj2.add(this.o1Text);

        // B1点
        const b1Geomentry = new THREE.SphereGeometry( aRadius, anoodles, anoodles);

        const b1Material = new THREE.MeshBasicMaterial({color: '#BD10E0', opacity: 1, depthTest: false});
        const b1Spot = new THREE.Mesh( b1Geomentry, b1Material );

        b1Spot.position.x = TwoScece.b1SpotX;
        b1Spot.position.y = TwoScece.b1SpotY;
        b1Spot.position.z = TwoScece.b1SpotZ;

        this.obj2.add( b1Spot );

        const b1text =  this.createText('B₁', LetterPosition.B1.x, LetterPosition.B1.y, LetterPosition.B1.z, '#BD10E0');
        this.obj2.add(b1text);

        // B2点
        const b2Geomentry = new THREE.SphereGeometry( aRadius, anoodles, anoodles);

        const b2Material = new THREE.MeshBasicMaterial({color: '#BD10E0', opacity: 1, depthTest: false});
        const b2Spot = new THREE.Mesh( b2Geomentry, b2Material );

        b2Spot.position.x = TwoScece.b2SpotX;
        b2Spot.position.y = TwoScece.b2SpotY;
        b2Spot.position.z = TwoScece.b2SpotZ;

        this.obj2.add( b2Spot );

        const b2text =  this.createText('B₂', LetterPosition.B2.x, LetterPosition.B2.y, LetterPosition.B2.z, '#BD10E0');
        this.obj2.add(b2text);

        // b1 b2 点的连线
        const b1b2Line = this.solidLine.addLine(
            new THREE.Vector3(TwoScece.b1SpotX, TwoScece.b1SpotY, TwoScece.b1SpotZ),
            new THREE.Vector3(TwoScece.b2SpotX, TwoScece.b2SpotY, TwoScece.b2SpotZ),
            '#0061D2', 3, true);
        this.obj2.add(b1b2Line);

        // b1 O 点的连线
        const ob1Line = this.solidLine.addLine(
            new THREE.Vector3(TwoScece.b1SpotX, TwoScece.b1SpotY, TwoScece.b1SpotZ),
            new THREE.Vector3(0, 0, 0),
            '#0061D2', 3, true);
        this.obj2.add(ob1Line);

        // b2 O 点的连线
        const ob2Line = this.solidLine.addLine(
            new THREE.Vector3(TwoScece.b2SpotX, TwoScece.b2SpotY, TwoScece.b2SpotZ),
            new THREE.Vector3(0, 0, 0),
            '#0061D2', 3, true);
        this.obj2.add(ob2Line);

        // A O 点的连线
        const oALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(0, 0, 0),
            '#0061D2', 3, true);
        this.obj2.add(oALine);

        // A O1 点的连线
        const o1ALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(TwoScece.o1SpotX, TwoScece.o1SpotY, TwoScece.o1SpotZ),
            '#0061D2', 3, true);
        this.obj2.add(o1ALine);

        // 扇形1
        const sectorGeometry = new THREE.CircleGeometry( TwoScece.sector1.radius, TwoScece.sector1.noodles, 0, Math.PI / 3);
        const sectorMaterial = new THREE.MeshBasicMaterial( { color: '#BD10E0' , side: THREE.DoubleSide,
            transparent: true, opacity: 0.4, depthTest: false} );
        const sector1 = new THREE.Mesh( sectorGeometry, sectorMaterial );
        sector1.rotation.z = Math.PI / 2;
        sector1.rotation.y = TwoScece.circle1.rotationY;
        sector1.rotation.x = TwoScece.circle1.rotationX;
        this.obj2.add( sector1 );

        // 扇形2
        const sector2Geometry = new THREE.CircleGeometry( TwoScece.sector1.radius, TwoScece.sector1.noodles, 0, Math.PI / 3);
        const sector2Material = new THREE.MeshBasicMaterial( { color: '#BD10E0' , side: THREE.DoubleSide,
            transparent: true, opacity: 0.4, depthTest: false} );
        const sector2 = new THREE.Mesh( sector2Geometry, sector2Material );
        sector2.rotation.z = Math.PI / 6;
        sector2.rotation.y = TwoScece.circle2.rotationY;
        sector2.rotation.x = TwoScece.circle2.rotationX;
        this.obj2.add( sector2 );


        // 画直角矩形面
        const geometry = new THREE.PlaneGeometry( TwoScece.rectangle.width, TwoScece.rectangle.height, 32 );
        const material = new THREE.MeshBasicMaterial( {color:  '#0061D2', side:  THREE.DoubleSide,
            transparent: true, opacity: 0.8, depthTest: false});
        const rectangle = new THREE.Mesh( geometry, material);

        rectangle.rotation.x = TwoScece.rectangle.rotationX;
        rectangle.position.y = TwoScece.rectangle.y;
        rectangle.position.z = TwoScece.rectangle.z;

        this.obj2.add( rectangle );


        this.scene.add( this.obj2 );
    }

    addObj3() {
        this.obj3 = new THREE.Object3D();

        // 画灰色圆
        const circleGeometry1 = new THREE.CircleGeometry( TwoScece.circle1.radius, TwoScece.circle1.noodles );
        const circleMaterial1 = new THREE.MeshBasicMaterial( { color: '#9B9B9B' , side: THREE.DoubleSide,
            transparent: true, opacity: 0.4, depthTest: false} );
        const circle1 = new THREE.Mesh( circleGeometry1, circleMaterial1 );
        circle1.rotation.y = TwoScece.circle1.rotationY;
        circle1.rotation.x = TwoScece.circle1.rotationX;
        this.obj3.add( circle1 );

        // 画红色圆
        const circleGeometry2 = new THREE.CircleGeometry( TwoScece.circle2.radius, TwoScece.circle2.noodles );
        const circleMaterial2 = new THREE.MeshBasicMaterial( { color: '#FF6F68' , side: THREE.DoubleSide,
            transparent: true, opacity: 0.4, depthTest: false} );
        const circle2 = new THREE.Mesh( circleGeometry2, circleMaterial2 );
        circle2.rotation.y = TwoScece.circle2.rotationY;
        circle2.rotation.x = TwoScece.circle2.rotationX;
        this.obj3.add( circle2 );

        // 画圆弧A B2  纵向弧
        const line1 = this.dashLine.addEllipseLine( TwoScece.circle2.radius, '#BD10E0', 3, 0.003, Math.PI / 3);
        const line2 = this.dashLine.addEllipseLine( TwoScece.circle2.radius, '#BD10E0', 2, 0.003, Math.PI / 3);

        line1.rotation.y = TwoScece.circle2.rotationY;
        line1.rotation.x = TwoScece.circle2.rotationX;
        line1.rotation.z = Math.PI / 6;
        line2.rotation.y = TwoScece.circle2.rotationY;
        line2.rotation.x = TwoScece.circle2.rotationX;
        line2.rotation.z = Math.PI / 6;

        this.obj3.add(line1);
        this.obj3.add(line2);

        // 画圆弧A B1 纵向弧
        const line3 = this.dashLine.addEllipseLine( TwoScece.circle1.radius, '#FF6F68', 3, 0.003, Math.PI / 3);
        const line4 = this.dashLine.addEllipseLine( TwoScece.circle1.radius, '#FF6F68', 2, 0.003, Math.PI / 3);

        line3.rotation.x = TwoScece.circle1.rotationX;
        line3.rotation.y = TwoScece.circle1.rotationY;
        line3.rotation.z = Math.PI / 2;
        line4.rotation.x = TwoScece.circle1.rotationX;
        line4.rotation.y = TwoScece.circle1.rotationY;
        line4.rotation.z = Math.PI / 2;

        this.obj3.add(line3);
        this.obj3.add(line4);



        this.scene.add( this.obj3 );


    }

    addObj4() {
        this.obj4 = new THREE.Object3D();
        // 画圆弧A B2 弧
        const line1 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#BD10E0', 3, 0.003, Math.PI / 2);
        const line2 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#BD10E0', 2, 0.003, Math.PI / 2);

        line1.rotation.x = TwoScece.circleArc1.rotationX;
        line2.rotation.x = TwoScece.circleArc1.rotationX;

        line1.position.y = TwoScece.circleArc1.y;
        line2.position.y = TwoScece.circleArc1.y;

        this.obj4.add(line1);
        this.obj4.add(line2);


        // 画圆弧A B1 弧
        const line3 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#FF6F68', 3, 0.003, Math.PI / 2);
        const line4 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#FF6F68', 2, 0.003, Math.PI / 2);

        line3.rotation.x = TwoScece.circleArc1.rotationX;
        line4.rotation.x = TwoScece.circleArc1.rotationX;

        line3.rotation.z = TwoScece.circleArc1.rotationz;
        line4.rotation.z = TwoScece.circleArc1.rotationz;

        line3.position.y = TwoScece.circleArc1.y;
        line4.position.y = TwoScece.circleArc1.y;

        this.obj4.add(line3);
        this.obj4.add(line4);

        // 圆弧b2 B1 弧
        const line5 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#0061D2', 3, 0.003, Math.PI);
        const line6 = this.dashLine.addEllipseLine( OneScene.line1Radius, '#0061D2', 2, 0.003, Math.PI);

        line5.rotation.x = TwoScece.circleArc1.rotationX;
        line6.rotation.x = TwoScece.circleArc1.rotationX;

        line5.rotation.z = TwoScece.circleArc2.rotationz;
        line6.rotation.z = TwoScece.circleArc2.rotationz;

        line5.position.y = TwoScece.circleArc1.y;
        line6.position.y = TwoScece.circleArc1.y;

        this.obj4.add(line5);
        this.obj4.add(line6);

        // 画文字R
        const rtext =  this.createText('R', LetterPosition.R.x, LetterPosition.R.y, LetterPosition.R.z, '#000000');
        this.obj4.add(rtext);

        this.scene.add(this.obj4);
    }

    addObj5() {
        this.obj5 = new THREE.Object3D();

        // A b1 点的连线 实线
        const b1ALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(TwoScece.b1SpotX, TwoScece.b1SpotY, TwoScece.b1SpotZ),
            '#BD10E0', 3, false);
        this.obj5.add(b1ALine);

        // A b2 点的连线 实线
        const b2ALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(TwoScece.b2SpotX, TwoScece.b2SpotY, TwoScece.b2SpotZ),
            '#BD10E0', 3, false);
        this.obj5.add(b2ALine);

        this.scene.add(this.obj5);
    }

    addObj6() {
        this.obj6 = new THREE.Object3D();

        // A b1 点的连线 虚线
        const b1ALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(TwoScece.b1SpotX, TwoScece.b1SpotY, TwoScece.b1SpotZ),
            '#0061D2', 3, true);
        this.obj6.add(b1ALine);

        // A b2 点的连线 虚线
        const b2ALine = this.solidLine.addLine(
            new THREE.Vector3(OneScene.aSpotX, OneScene.aSpotY, OneScene.aSpotZ),
            new THREE.Vector3(TwoScece.b2SpotX, TwoScece.b2SpotY, TwoScece.b2SpotZ),
            '#0061D2', 3, true);
        this.obj6.add(b2ALine);

        this.scene.add( this.obj6 );
    }

    addScece() {


        this.obj.visible = false;
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;

        this.oneScece();
        // this.twoScece();
        // this.threeScece();
        //this.fourScece();
    }

    hideScece() {
        this.obj.visible = false;
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
    }

    oneScece () {
        this.obj.visible = true;
        this.obj1.visible = true;
    }

    twoScece () {
        this.obj.visible = true;
        this.obj2.visible = true;
        this.obj3.visible = true;
        this.obj6.visible = true;
    }

    threeScece () {
        this.obj.visible = true;
        this.obj2.visible = true;
        this.obj5.visible = true;
    }

    fourScece () {
        this.obj2.visible = true;
        this.obj4.visible = true;
        this.obj6.visible = true;
    }



    resize(width: number, height: number) {
        // (this.camera as PerspectiveCamera).aspect = width / height;
        // (this.camera as PerspectiveCamera).updateProjectionMatrix();
        // this.renderer.setSize( width,  height );
        if (this.browserInfo.isMobile || this.browserInfo.isIphone) {
            (this.camera as OrthographicCamera).left = -width / 20;
            (this.camera as OrthographicCamera).right = width / 20;
            (this.camera as OrthographicCamera).top = height / 20;
            (this.camera as OrthographicCamera).bottom = -width / 20;
            (this.camera as PerspectiveCamera).updateProjectionMatrix();
            this.renderer.setSize( width, height);
        } else {
            (this.camera as OrthographicCamera).left = -width / 50;
            (this.camera as OrthographicCamera).right = width / 50;
            (this.camera as OrthographicCamera).top = height / 50;
            (this.camera as OrthographicCamera).bottom = -width / 50;
            (this.camera as PerspectiveCamera).updateProjectionMatrix();
            this.renderer.setSize( width, height);
        }
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 20, 0);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
