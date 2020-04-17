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

const OBJLoader = require('three-obj-loader');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Prism3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    // 材质
    private material = new THREE.MeshBasicMaterial( {color:  0x4A90E2, side:  THREE.DoubleSide, transparent: true, opacity: 0.6} );

    // 上底面圆
    private circle1: any;

    // 下底面圆
    private circle2: any;

    // 半径
    private topRadius = 6 * 22;
    private bottomRadius = 6 * 22;

    // 圆模型
    private topGeometry: any;
    private bottomGeometry: any;

    // 高度
    private prismHeight = 10 * 22;
    private segments = 200;

    // 矩形
    private wrapper: any;

    // 动画持续时间
    private animationDuration = 1.3;

    // 动画
    private timeLineLite: any;

    private between = {
        angle: Math.PI / this.segments,
        circle1: 0,
        circle2: 0,
    };

    private tween = {
        angle: 0,
        length: 0
    };

    // 矩形模型
    private geometry: any;

    // 判断是否启动折叠矩形
    private valueBoolean = true;

    // 上下底面边框模型
    private topEdges: any;
    private bottomEdges: any;

    // 上下底面边框
    private bottomLine: any;
    private topLine: any;

    // 设置旋转中心组
    private topCenterMesh: any;
    private bottomCenterMesh: any;

    // 矩形面
    private rectangle: any;

    // 矩形展开动画
    private timeRectangle: any;

    // 半径r虚线模型
    private geometryLine: any;

    // 半径r虚线模型起点终点
    private startRadius: any;
    private endRadius: any;

    //半径r虚线
    private lineMesh: any;

    // 半径r文字
    private rtext: any;
    // 母线长文字
    private ltext: any;
    // 圆的周长
    private widthText: any;

    //初始状态半径r
    private rGeometry: any;
    private rLineMesh: any;
    private rStartPoint: any;
    private rEndPoint: any;

    //高h
    private hGeometry: any;
    private hLineMesh: any;
    private hStartPoint: any;
    private hEndPoint: any;

    //初始状态字体
    private r1Text: any;
    private h1Text: any;


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

        this.addCircles();
        this.addWrapper();
        this.addDottedLine();

        this.addText();

        this.addRectangle();

        this.setAnimation();
        this.setanimRectangle();

        this.radiusDashLine(6, 10);
        this.heightDashLine(10);

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

    // 画上下底面圆
    addCircles() {
        this.material = new THREE.MeshBasicMaterial( {color:  0x4A90E2, side:  THREE.DoubleSide, transparent: true, opacity: 0.2} );

        this.topGeometry = new THREE.CircleGeometry(this.topRadius, this.segments);
        this.bottomGeometry = new THREE.CircleGeometry(this.bottomRadius, this.segments);

        this.circle1 = new THREE.Mesh(this.topGeometry, this.material);
        this.circle2 = new THREE.Mesh(this.bottomGeometry, this.material);

        this.scene.add(this.circle1);
        this.scene.add(this.circle2);

        this.circle1.visible = false;
        this.circle2.visible = false;


        // 画上下底面边框
        this.topEdges       = new THREE.EdgesGeometry(this.topGeometry, 1);
        this.bottomEdges    = new THREE.EdgesGeometry(this.bottomGeometry, 1);

        this.topLine     = new THREE.LineSegments( this.topEdges, new THREE.LineBasicMaterial( { color:  0x4A90E2 } ) );
        this.bottomLine  = new THREE.LineSegments( this.bottomEdges, new THREE.LineBasicMaterial( { color:  0x4A90E2 } ) );

        this.scene.add(this.topLine);
        this.scene.add(this.bottomLine);
        this.topLine.geometry.antialias = true;
        this.bottomLine.geometry.antialias = true;

        //旋转中心点
        const cirGeo = new THREE.PlaneBufferGeometry( 0.01, 0.01, 0.01 );
        // 上底面旋转中心点
        this.topCenterMesh = new THREE.Mesh(cirGeo,
            new THREE.MeshBasicMaterial( {color:  0xffffff, side:  THREE.DoubleSide, transparent: true, opacity: 0.01} ));
        this.topCenterMesh.rotation.x = Math.PI / 2;
        this.topCenterMesh.position.setX(this.topRadius);
        this.topCenterMesh.position.setY(this.prismHeight / 2);

        this.topCenterMesh.add(this.circle1);
        this.topCenterMesh.add(this.topLine);

        this.circle1.position.setX(-this.topRadius);
        this.topLine.position.setX(-this.topRadius);

        this.scene.add(this.topCenterMesh);

        // 下底面旋转中心点
        this.bottomCenterMesh = new THREE.Mesh(cirGeo,
            new THREE.MeshBasicMaterial( {color:  0xffffff, side:  THREE.DoubleSide, transparent: true, opacity: 0.01} ));
        this.bottomCenterMesh.rotation.x = Math.PI / 2;
        this.bottomCenterMesh.position.setX(this.bottomRadius);
        this.bottomCenterMesh.position.setY(-this.prismHeight / 2);

        this.bottomCenterMesh.add(this.circle2);
        this.bottomCenterMesh.add(this.bottomLine);

        this.circle2.position.setX(-this.bottomRadius);
        this.bottomLine.position.setX(-this.bottomRadius);

        this.scene.add(this.bottomCenterMesh);
    }

    // 画圆柱
    addWrapper() {
        this.geometry = new THREE.CylinderBufferGeometry( this.topRadius, this.bottomRadius, this.prismHeight, 32 );
        this.wrapper = new THREE.Mesh(this.geometry, this.material);
        this.scene.add( this.wrapper );
    }

    // 画矩形
    addRectangle() {
        const geometry = new THREE.PlaneGeometry( this.tween.length, this.prismHeight, 32 );
        this.rectangle = new THREE.Mesh( geometry, this.material );
        this.scene.add( this.rectangle );

        this.rectangle.rotation.y = Math.PI / 2;
        this.rectangle.position.x = this.bottomRadius;
        this.rectangle.visible = false ;
    }

    // 画虚线
    addDottedLine() {
        // 画半径r虚线
        this.geometryLine = new THREE.Geometry();

        this.startRadius = new THREE.Vector3(this.bottomRadius, this.prismHeight / 2 + this.bottomRadius, 0);
        this.endRadius = new THREE.Vector3(this.bottomRadius, this.prismHeight / 2 + this.bottomRadius, this.bottomRadius);
        this.geometryLine.vertices = [this.startRadius, this.endRadius];

        this.lineMesh = new THREE.LineSegments(this.geometryLine, new THREE.LineDashedMaterial({
            color: '#4A90E2',
            dashSize: 5,
            gapSize: 3,
            linewidth: 3,
        }));

        this.lineMesh.computeLineDistances();
        this.scene.add(this.lineMesh);
        this.lineMesh.visible = false;
    }




    //画未展开状态下的初始半径虚线
    radiusDashLine(sliderNum:  number, sliderNum4: number) {
        this.rGeometry = new THREE.Geometry();
        this.rStartPoint = new THREE.Vector3(0, -(sliderNum4 * 22 / 2 ), 0);
        this.rEndPoint = new THREE.Vector3(0, -(sliderNum4 * 22 / 2 ), sliderNum * 22);
        this.rGeometry.vertices = [this.rStartPoint, this.rEndPoint];

        this.rLineMesh = new THREE.LineSegments(this.rGeometry, new THREE.LineDashedMaterial({
            color: '#4A90E2',
            dashSize: 5,
            gapSize: 3,
            linewidth: 3,
        }));
        this.rLineMesh.computeLineDistances();
        this.scene.add(this.rLineMesh);
    }

    //画未展开状态下的初始高虚线
    heightDashLine(sliderNum4: number) {
        this.hGeometry = new THREE.Geometry();
        this.hStartPoint = new THREE.Vector3(0, -(sliderNum4 * 22 / 2 ), 0);
        this.hEndPoint = new THREE.Vector3(0, (sliderNum4 * 22 / 2), 0);
        this.hGeometry.vertices = [this.hStartPoint, this.hEndPoint];

        this.hLineMesh = new THREE.LineSegments(this.hGeometry, new THREE.LineDashedMaterial({
            color: '#4A90E2',
            dashSize: 5,
            gapSize: 3,
            linewidth: 3,
        }));
        this.hLineMesh.computeLineDistances();
        this.scene.add(this.hLineMesh);
    }


    //改变滑条,更改半径和高及其字体位置
    changeSlider(sliderNum: number, sliderNum4: number) {
        //重绘r虚线
        this.rGeometry = new THREE.Geometry();
        this.rStartPoint = new THREE.Vector3(0, -(sliderNum4 * 22 / 2 ), 0);
        this.rEndPoint =  new THREE.Vector3(0, -(sliderNum4 * 22 / 2), sliderNum * 22);
        this.rGeometry.vertices = [this.rStartPoint, this.rEndPoint];
        this.updateGroupGeometry(this.rLineMesh, this.rGeometry);
        this.rLineMesh.computeLineDistances();

        //重绘h虚线
        this.hGeometry = new THREE.Geometry();
        this.hStartPoint = new THREE.Vector3(0, -(sliderNum4 * 22 / 2 ), 0);
        this.hEndPoint = new THREE.Vector3(0, (sliderNum4 * 22 / 2), 0);
        this.hGeometry.vertices = [this.hStartPoint, this.hEndPoint];
        this.updateGroupGeometry(this.hLineMesh, this.hGeometry);
        this.hLineMesh.computeLineDistances();

        //改变r字体位置
        this.updtText(sliderNum, sliderNum4);
    }

    //更改字体位置
    updtText (sliderNum: number, sliderNum4: number) {
        if (this.r1Text !== null) {
            this.scene.remove(this.r1Text);
        }
        this.r1Text = this.createText('r', -16, -(sliderNum4 * 22 / 2) + 15, (sliderNum * 22 / 2), '#4A90E2');
        this.scene.add(this.r1Text);
    }






    // 画文字
    addText() {
        this.rtext = this.createText('r' ,  this.topRadius - 10
            , this.prismHeight / 2 + this.topRadius ,  this.topRadius / 2, '#4A90E2');

        const ltextZ = Math.PI * this.bottomRadius;
        this.ltext = this.createText('h' , this.bottomRadius - 10, 0, -ltextZ, '#4A90E2');

        this.widthText = this.createText('2πr' ,
            this.bottomRadius - 20, this.prismHeight / 2, 0, '#4A90E2');

        //初始状态的半径r和高h
        this.r1Text = this.createText('r', -16, -(this.prismHeight / 2) + 15, (this.topRadius / 2), '#4A90E2');
        this.h1Text = this.createText('h', 0, (this.prismHeight / 12), 12, '#4A90E2');
        this.scene.add(this.r1Text);
        this.scene.add(this.h1Text);

        this.scene.add(this.rtext);
        this.scene.add(this.ltext);
        this.scene.add(this.widthText);

        this.rtext.visible = false;
        this.ltext.visible = false;
        this.widthText.visible = false;
    }

    // 创建文字
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'Italic 40px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        text.material.depthTest = !1;
        return text;
    }

    //滑块控制圆的大小和高度
    dragCircleGeometry(sliderNum: number, sliderNum4: number) {
        // 重置动画
        this.timeLineLite.progress(0);
        this.timeLineLite.pause();

        this.timeRectangle.progress(0);
        this.timeRectangle.pause();

        // 隐藏上下底面
        this.circle1.visible = false;
        this.circle2.visible = false;
        // 显示圆柱
        this.wrapper.visible = true;

        this.topRadius = this.bottomRadius = sliderNum * 22;
        this.prismHeight = sliderNum4 * 22;

        // 隐藏文字和虚线
        this.rtext.visible = false;
        this.ltext.visible = false;
        this.widthText.visible = false;
        this.lineMesh.visible = false;

        this.hLineMesh.visible = true;
        this.rLineMesh.visible = true;
        this.r1Text.visible = true;
        this.h1Text.visible = true;

        // 隐藏矩形
        this.rectangle.visible = false;

        // 更新圆的模型
        this.topGeometry = new THREE.CircleGeometry(this.topRadius, this.segments);
        this.bottomGeometry = new THREE.CircleGeometry(this.bottomRadius, this.segments);
        this.updateGroupGeometry(this.circle1, this.topGeometry);
        this.updateGroupGeometry(this.circle2, this.bottomGeometry);

        // 更新圆柱的模型
        this.geometry = new THREE.CylinderBufferGeometry( this.topRadius, this.bottomRadius, this.prismHeight, 32 );
        this.updateGroupGeometry(this.wrapper, this.geometry);

        // 更新矩形的位置
        this.rectangle.position.x = this.bottomRadius;

        // 更新边框
        this.updateTopLine(this.topGeometry);
        this.updateBottomLine(this.bottomGeometry);

        // 重新定位上下底面 和边框的位置
        this.topCenterMesh.position.setX(this.topRadius);
        this.topCenterMesh.position.setY(this.prismHeight / 2);

        this.bottomCenterMesh.position.setX(this.bottomRadius);
        this.bottomCenterMesh.position.setY(-this.prismHeight / 2);

        this.circle1.position.setX(-this.topRadius);
        this.topLine.position.setX(-this.topRadius);

        this.circle2.position.setX(-this.bottomRadius);
        this.bottomLine.position.setX(-this.bottomRadius);

        // 重置动画
        this.timeRectangle = TweenMax.to(this.tween, this.animationDuration, {
            length: 2 * Math.PI * this.bottomRadius,
            onUpdate: () => {
                this.updateRectangle();
            },
            paused: true
        });

        this.uodateArea();
    }

    // 更新表面积和母线长数值
    uodateArea () {
        const r = this.topRadius / 22;
        const h = this.prismHeight / 22;
        const cylinder = 2 * Math.PI * r * r + 2 * Math.PI * r * h;

        document.getElementById('cylinder').innerText = cylinder.toFixed(2).toString();
    }

    // 更新模型
    updateGroupGeometry( mesh: any, geometry: any) {
        mesh.geometry.dispose();
        mesh.geometry = geometry;
    }

    // 更新上下底面边框
    updateTopLine(geometry: any) {
        this.topLine.geometry.dispose();
        this.topLine.geometry = new THREE.EdgesGeometry(geometry, 30);

        this.bottomLine.geometry.dispose();
        this.bottomLine.geometry = new THREE.EdgesGeometry(geometry, 30);
    }
    updateBottomLine(geometry: any) {
        this.bottomLine.geometry.dispose();
        this.bottomLine.geometry = new THREE.EdgesGeometry(geometry, 30);
    }

    //展开动画
    setAnimation() {
        this.animationDuration = 1.3;
        this.timeLineLite = TweenMax.to(this.between, this.animationDuration, {
            angle: 0,
            circle1: -Math.PI / 2,
            circle2: Math.PI / 2,
            onUpdate: () => {
                this.animation();
            },
            paused: true
        });
    }

    // 旋转 圆 和折叠矩形变成圆柱
    animation() {
        // 旋转圆
        this.topCenterMesh.rotation.y = this.between.circle1;
        this.bottomCenterMesh.rotation.y = this.between.circle2;
    }

    // 调用矩形展开动画
    setanimRectangle() {
        this.timeRectangle = TweenMax.to(this.tween, this.animationDuration, {
            length: 2 * Math.PI * this.bottomRadius,
            onUpdate: () => {
                this.updateRectangle();
            },
            paused: true
        });
    }

    // 矩形展开动画
    updateRectangle() {
        this.rectangle.geometry.dispose();
        this.rectangle.geometry = new THREE.PlaneGeometry( this.tween.length, this.prismHeight, 32 );
    }

    // 展开按钮调用展开动画
    openEvent(): Promise<boolean> {
        this.rLineMesh.visible = false;
        this.hLineMesh.visible = false;
        this.r1Text.visible = false;
        this.h1Text.visible = false;

        this.circle1.visible = true;
        this.circle2.visible = true;
        this.wrapper.visible = false;

        this.valueBoolean = false;

        this.rectangle.visible = true;
        this.timeRectangle.play();

        return new Promise( (resolve) => {
            this.timeLineLite.play();

            this.valueBoolean = false;
            setTimeout(() => {
                resolve(true);
            }, 1400);
        });
    }

    // 动画结束后执行 显示文字和虚线
    showLine() {
        if (this.between.angle === 0) {
            this.updateDottedLine ();
            this.updateText();
        }
    }

    // 更新虚线模型
    updateDottedLine () {
        this.geometryLine = new THREE.Geometry();
        this.startRadius = new THREE.Vector3(this.bottomRadius, this.prismHeight / 2 + this.bottomRadius, 0);
        this.endRadius = new THREE.Vector3(this.bottomRadius, this.prismHeight / 2 + this.bottomRadius, this.bottomRadius);
        this.geometryLine.vertices = [this.startRadius, this.endRadius];
        this.updateGroupGeometry(this.lineMesh, this.geometryLine);
        this.lineMesh.computeLineDistances();
        this.lineMesh.visible = true;

    }

    // 更新文字方法
    updateText() {
        this.rtext.position.x = this.bottomRadius - 10;
        this.rtext.position.y = this.bottomRadius + this.prismHeight / 2;
        this.rtext.position.z = this.bottomRadius / 2;

        const ltextZ = Math.PI * this.bottomRadius;
        this.ltext.position.x = this.bottomRadius - 10;
        this.ltext.position.y = 10;
        this.ltext.position.z = -ltextZ;

        this.widthText.position.x = this.bottomRadius - 20;
        this.widthText.position.y = this.prismHeight / 2;
        this.widthText.position.z = 0;

        this.rtext.visible = true;
        this.ltext.visible = true;
        this.widthText.visible = true;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }

    reset() {
        // 重置动画
        this.timeLineLite.progress(0);
        this.timeLineLite.pause();

        this.timeRectangle.progress(0);
        this.timeRectangle.pause();

        // 隐藏上下底面
        this.circle1.visible = false;
        this.circle2.visible = false;
        // 显示圆柱
        this.wrapper.visible = true;

        // 隐藏矩形
        this.rectangle.visible = false;

        // 隐藏文字和虚线
        this.rtext.visible = false;
        this.ltext.visible = false;
        this.widthText.visible = false;
        this.lineMesh.visible = false;

        this.rLineMesh.visible = true;
        this.hLineMesh.visible = true;
        this.r1Text.visible = true;
        this.h1Text.visible = true;

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
