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
import { SpriteText2D } from 'three-text2d';
import {ViewController} from '../../../../../src/core/ViewController';
import {DashLine} from '../../../../../src/three/component/DashLine';

const OBJLoader = require('three-obj-loader');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Prism3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    // 材质
    private material = new THREE.MeshBasicMaterial( {color:  '#CFEAF8', side:  THREE.DoubleSide} );

    // 上底面圆
    private circle1: any;

    // 下底面圆
    private circle2: any;

    // 半径
    private topRadius = 0 * 22;
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
        angle: 0
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

    // 圆锥侧面展开 扇形
    private sector: any;

    // 扇形角
    private sectorAngle: number;

    // 扇形的半径
    private sectorRadius: number;

    // 扇形的展开动画
    private timeSector: any;

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

    private heightLine: any;

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
        this.addSector();
        this.addText();

        this.setAnimation();
        this.setanimSector();


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
        this.camera.position.set(-20, 10, 0);
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

        // this.circle1.visible = false;
        // this.circle2.visible = false;


        // 画上下底面边框
        this.topEdges       = new THREE.EdgesGeometry(this.topGeometry, 1);
        this.bottomEdges    = new THREE.EdgesGeometry(this.bottomGeometry, 1);

        this.topLine     = new THREE.LineSegments( this.topEdges, new THREE.LineBasicMaterial( { color:  0x4A90E2 } ) );
        this.bottomLine  = new THREE.LineSegments( this.bottomEdges, new THREE.LineBasicMaterial( { color:  0x4A90E2 } ) );

        // this.scene.add(this.topLine);
        this.scene.add(this.bottomLine);


        //旋转中心点
        const cirGeo = new THREE.PlaneBufferGeometry( 0.01, 0.01, 0.01 );
        // 上底面旋转中心点
        this.topCenterMesh = new THREE.Mesh(cirGeo,
            new THREE.MeshBasicMaterial( {color:  0xffffff, side:  THREE.DoubleSide, transparent: true, opacity: 0.01} ));
        this.topCenterMesh.rotation.x = Math.PI / 2;
        this.topCenterMesh.position.setX(this.topRadius);
        this.topCenterMesh.position.setY(this.prismHeight / 2);

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

        this.circle2.visible = false;
        this.bottomCenterMesh.visible = true;
    }

    // 画圆台
    addWrapper() {
        this.geometry = new THREE.CylinderBufferGeometry( this.topRadius, this.bottomRadius, this.prismHeight, 32 );
        this.wrapper = new THREE.Mesh(this.geometry, this.material);

        this.scene.add( this.wrapper );

        // const line1 = this.dashLine.addLine(new THREE.Vector3(0, -200, 0), new THREE.Vector3(0, 200, 0), '#000000', 3, true);
        // this.scene.add(line1);

        const geometryLine = new THREE.Geometry();
        geometryLine.vertices = [new THREE.Vector3(0, -this.prismHeight / 2, 0), new THREE.Vector3(0, this.prismHeight / 2, 0)];
        this.heightLine = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
            color: '#4A90E2',
            opacity: 0.8,
            dashSize: 10,
            gapSize: 10,
            depthTest: false
        }));
        this.heightLine.computeLineDistances();

        this.scene.add(this.heightLine);
    }

    // 画扇形
    addSector() {
        this.sectorRadius = Math.sqrt(this.bottomRadius * this.bottomRadius + this.prismHeight * this.prismHeight);
        this.sectorAngle = 2 * Math.PI * this.bottomRadius / this.sectorRadius;
        const geometry = new THREE.CircleGeometry( this.sectorRadius, 32 , 0 , this.tween.angle);
        this.sector = new THREE.Mesh( geometry, this.material );
        this.scene.add( this.sector );

        this.sector.rotation.y = Math.PI / 2;
        this.sector.rotation.x = Math.PI / 2 * 3;

        this.sector.position.setX(this.bottomRadius);
        this.sector.position.y = this.sectorRadius - this.prismHeight / 2;
    }

    // 画虚线
    addDottedLine() {
        // 画半径r虚线
        this.geometryLine = new THREE.Geometry();

        this.startRadius = new THREE.Vector3(this.bottomRadius, -this.prismHeight / 2 - this.bottomRadius, 0);
        this.endRadius = new THREE.Vector3(this.bottomRadius, -this.prismHeight / 2 - this.bottomRadius, this.bottomRadius);
        this.geometryLine.vertices = [this.startRadius, this.endRadius];

        this.lineMesh = new THREE.LineSegments(this.geometryLine, new THREE.LineDashedMaterial({
            color: '#4A90E2',
            dashSize: 3,
            gapSize: 2,
            linewidth: 2,
        }));
        this.lineMesh.computeLineDistances();

        this.scene.add(this.lineMesh);

        this.lineMesh.visible = false;
    }


    // 画文字
    addText() {
        this.rtext = this.createText('r' ,
            this.bottomRadius - 10, -this.prismHeight / 2 - this.bottomRadius, this.bottomRadius / 2, '#4A90E2');

        this.ltext = this.createText('l' ,
            this.bottomRadius - 10, this.prismHeight / 2  + this.bottomRadius + 20, this.bottomRadius / 2, '#4A90E2');

        this.widthText = this.createText('2πr' ,
            this.bottomRadius - 20, -this.prismHeight / 2, 0, '#4A90E2');

        this.scene.add(this.rtext);
        this.scene.add(this.ltext);
        this.scene.add(this.widthText);

        this.ltext.position.x = this.bottomRadius - 10;
        this.ltext.position.y = this.sectorRadius - this.prismHeight + Math.sin(
            this.sectorAngle / 2 - Math.PI / 2) *  this.sectorRadius / 2 + this.prismHeight / 2;
        this.ltext.position.z = Math.cos(this.sectorAngle / 2 - Math.PI / 2) *  this.sectorRadius / 2;

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
        return text;
    }

    // 滑块控制圆的大小和高度
    dragCircleGeometry(radius: any, height: any) {

        // 重置动画
        // this.timeLineLite.progress(0);
        // this.timeLineLite.pause();
        // this.timeSector.progress(0);
        // this.timeSector.pause();
        //
        // 隐藏虚线
        // this.lineMesh.visible = false;
        // this.rtext.visible = false;
        // this.ltext.visible = false;
        // this.widthText.visible = false;
        //
        // // 显示圆锥
        // this.wrapper.visible = true;
        //
        // this.circle2.visible = false;
        // this.bottomCenterMesh.visible = true;


        this.topRadius = 0 * 22;
        this.bottomRadius = radius * 22;
        this.prismHeight = height * 22;

        // 更新圆的模型
        this.topGeometry = new THREE.CircleGeometry(this.topRadius, this.segments);
        this.bottomGeometry = new THREE.CircleGeometry(this.bottomRadius, this.segments);
        this.updateGroupGeometry(this.circle1, this.topGeometry);
        this.updateGroupGeometry(this.circle2, this.bottomGeometry);

        // 更新圆锥的模型
        this.geometry = new THREE.CylinderBufferGeometry( this.topRadius, this.bottomRadius, this.prismHeight, 32 );
        this.updateGroupGeometry(this.wrapper, this.geometry);

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

        // 更新扇形的大小
        this.sectorRadius = Math.sqrt(this.bottomRadius * this.bottomRadius + this.prismHeight * this.prismHeight);
        this.sectorAngle = 2 * Math.PI * this.bottomRadius / this.sectorRadius;

        this.updateGroupGeometry(this.sector, new THREE.CircleGeometry( this.sectorRadius, 32 , 0 , this.tween.angle));

        this.sector.position.setX(this.bottomRadius);
        this.sector.position.y = this.sectorRadius - this.prismHeight / 2;

        // 更新虚线的大小
        this.geometryLine = new THREE.Geometry();

        this.startRadius = new THREE.Vector3(this.bottomRadius, -this.prismHeight / 2 - this.bottomRadius, 0);
        this.endRadius = new THREE.Vector3(this.bottomRadius, -this.prismHeight / 2 - this.bottomRadius, this.bottomRadius);
        this.geometryLine.vertices = [this.startRadius, this.endRadius];
        this.updateGroupGeometry(this.lineMesh, this.geometryLine);
        this.lineMesh.computeLineDistances();

        // 更新文字的位置
        this.rtext.position.x = this.bottomRadius - 10;
        this.rtext.position.y = -this.prismHeight / 2 - this.bottomRadius;
        this.rtext.position.z = this.bottomRadius / 2;

        this.ltext.position.x = this.bottomRadius - 10;
        this.ltext.position.y = this.sectorRadius - this.prismHeight + Math.sin(
            this.sectorAngle / 2 - Math.PI / 2) *  this.sectorRadius / 2 + this.prismHeight / 2;
        this.ltext.position.z = Math.cos(this.sectorAngle / 2 - Math.PI / 2) *  this.sectorRadius / 2;

        this.widthText.position.x = this.bottomRadius - 20;
        this.widthText.position.y = -this.prismHeight / 2;

        //修改高的长度
        const geometryLine = new THREE.Geometry();
        geometryLine.vertices = [new THREE.Vector3(0, -this.prismHeight / 2, 0), new THREE.Vector3(0, this.prismHeight / 2, 0)];
        this.heightLine.geometry.dispose();
        this.heightLine.geometry = geometryLine;
        this.heightLine.computeLineDistances();

        // 更新左边边框内的文字
        document.getElementById('cylinder').innerText = (Math.PI * radius * radius +
            Math.PI * this.sectorRadius / 22 * this.sectorRadius / 22 / (Math.PI * 2) * this.sectorAngle).toFixed(2).toString();
        document.getElementById('busbarLength').innerText = (this.sectorRadius / 22).toFixed(2).toString();


        if (this.tween.angle === 0) {
            this.sector.geometry.dispose();
            this.sector.geometry = new THREE.CircleGeometry( this.sectorRadius, 32 , 0 , 0);

            this.sector.rotation.x = -0 / 2 - Math.PI / 2;
        } else {
            this.sector.geometry.dispose();
            this.sector.geometry = new THREE.CircleGeometry( this.sectorRadius, 32 , 0 , this.sectorAngle);

            this.sector.rotation.x = -this.sectorAngle / 2 - Math.PI / 2;
        }
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

    // 调用扇形展开动画
    setanimSector() {
        this.timeSector = TweenMax.to(this.tween, this.animationDuration, {
            angle: this.sectorAngle,
            onUpdate: () => {
                this.uodateSector();
            },
            paused: true
        });
    }

    // 扇形展开动画
    uodateSector() {
        this.sector.geometry.dispose();
        this.sector.geometry = new THREE.CircleGeometry( this.sectorRadius, 32 , 0 , this.tween.angle);

        this.sector.rotation.x = -this.tween.angle / 2 - Math.PI / 2;
    }

    // 展开按钮调用展开动画
    openEvent(): Promise<boolean> {
        if (this.tween.angle === 0) {
            this.circle2.visible = true;
            this.bottomCenterMesh.visible = true;
            this.wrapper.visible = false;

            this.timeSector.play();
            this.heightLine.visible = false;

            this.valueBoolean = false;

            return new Promise( (resolve) => {
                this.timeLineLite.play();

                this.valueBoolean = false;
                setTimeout(() => {
                    resolve(true);
                }, 1400);
            });
        }
    }

    //动画执行完 显示半径r虚线和文字
    showLine() {
        if (this.tween.angle !== 0) {
            this.lineMesh.visible = true;
            this.rtext.visible = true;
            this.ltext.visible = true;
            this.widthText.visible = true;
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

    reset() {
        // 更新左边边框内的文字
        document.getElementById('cylinder').innerText = '332.92';
        document.getElementById('busbarLength').innerText = '11.66';

        // 隐藏文字
        this.lineMesh.visible = false;
        this.rtext.visible = false;
        this.ltext.visible = false;
        this.widthText.visible = false;

        // 显示圆锥
        this.wrapper.visible = true;

        this.circle2.visible = false;

        this.heightLine.visible = true;

        // 重置动画
        this.timeLineLite.progress(0);
        this.timeLineLite.pause();
        this.timeSector.progress(0);
        this.timeSector.pause();

        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 10, 0);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
