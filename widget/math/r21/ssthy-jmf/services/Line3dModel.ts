import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    private orbit: any;
    private num_came: any;
    private textS = ThreeUtil.createNewRomanText('S', 90, 10, 100, '#32CD32', 0.25);
    private textO = ThreeUtil.createNewRomanText('O', 110, 10, -100, '#1A1A1A', 0.25);
    private drawRightAngle: any; //直角
    private drawRightAngle1: any; //直角
    private drawRightAngle_group1: any = new THREE.Group();
    private curvePointArrayOnXAxis: any = [];
    private curvePointArrayOnXAxis1: any = [];
    // 创建还原过程中涉及的文字组
    private pot: any = {
        'D': [-108, 108, 108],
        'C': [108, 108, 108],
        'B': [108, 108, -108],
        'A': [-108, 108, -108],
        'D1': [-105, -105, 105],
        'C1': [105, -105, 105],
        'B1': [105, -105, -105],
        'A1': [-105, -105, -105],
    };
    private pot1: any = {
        'D': [-108, 108, 108],
        'C': [108, 108, 108],
        'B': [108, 108, -108],
        'A': [-108, 108, -108],
        'C1': [105, -105, 105],
        'B1': [105, -105, -105],
    };
    private pot2: any = {
        'B': [108, 108, -108],
        'A': [-108, 108, -108],
        'B1': [105, -105, -105],
    };
    private textGroup = new THREE.Group();
    private textGroup1 = new THREE.Group();
    private textGroup2 = new THREE.Group();
    private point2 = [
        [-100.5, 100.5, -100.5],
        [100.5, 100.5, -100.5],
        [100.5, 100.5, 100.5],
        [-100.5, 100.5, 100.5],
        [-100.5, -100.5, -100.5],
        [100.5, -100.5, -100.5],
        [100.5, -100.5, 100.5],
        [-100.5, -100.5, 100.5],
        [100.5, 0, 100.5],
        [0, 0, 100.5],
        [100.5, 0, -100.5]
    ];
    // 创建还原过程中出现的四个几何体
    private cube: any;
    private cube1: any;
    private cube2: any;
    private cube3: any;
    // 创建还原过程中线段组
    private lineGroup = new THREE.Object3D();
    private lineRedGroup = new THREE.Object3D();
    private lineGroup1 = new THREE.Object3D();
    private lineGreenGroup = new THREE.Object3D();
    private lineGroup2 = new THREE.Object3D();
    private linePurpleGroup = new THREE.Object3D();
    private lineGroup3 = new THREE.Object3D();
    // 创建步骤二中线段组
    private lineBlueGroup = new THREE.Object3D();
    // 创建还原过程中设定的时间点
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private timer4: any;
    private timer5: any;
    private timer6: any;
    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera, );
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }
    init(): void {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initControl();
        this.initElement();
        this.initLight();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
    }
    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = false;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 250;
        this.orbit.maxDistance = 570;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;
        this.orbit.maxPolarAngle = Math.PI;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const W = window.innerWidth;
        if (W < 900) {
            this.num_came = 1.5;
        } else {
            this.num_came = 3;
        }
        const left    = this.width / - this.num_came;
        const right   = this.width / this.num_came;
        const top     = this.height / this.num_came;
        const bottom  = this.height / - this.num_came;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(100, 100, 250);
        this.scene.add(this.camera);
    }
    /**
     * 初始化光源
     */
    initLight(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.camera.add(ambientLight);
        const dirLight = new THREE.DirectionalLight('#ffffff', 1);
        dirLight.position.set(250, 250, 250);
        this.camera.add(dirLight);
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    // 初始化场景元素
    initElement() {
        this.createCube();
        this.scene.add(this.cube, this.lineGroup, this.textGroup);
        this.createCube1();
        this.createCube2();
        this.createCube3();
        this.createLine(3, 6, '#EF334A', this.lineRedGroup, );
        this.createLine(0, 5, '#EF334A', this.lineRedGroup, );
        this.createLine(8, 9, '#32CD32', this.lineGreenGroup, );
        this.createLine(8, 1, '#32CD32', this.lineGreenGroup, );
        this.createLine(8, 5, '#32CD32', this.lineGreenGroup, );
        this.createLine(0, 8, '#9370DB', this.linePurpleGroup, );
        // 步骤二中的场景线条及直角
        this.createLine(0, 10, '#1E90FF', this.lineBlueGroup, );
        this.createLine(8, 10, '#1E90FF', this.lineBlueGroup, );
        this.createLine(0, 1, '#1A1A1A', this.lineBlueGroup, );
        this.createLine(0, 8, '#1A1A1A', this.lineBlueGroup, );
        this.createLine(0, 5, '#1A1A1A', this.lineBlueGroup, );
        this.createLine(1, 5, '#1A1A1A', this.lineBlueGroup, );
        this.createLine(8, 1, '#1A1A1A', this.lineBlueGroup, );
        this.createLine(8, 5, '#1A1A1A', this.lineBlueGroup, );
        this.drawAngle();
    }
    // 生成点
    vec3(x: number, y: number, z: number) {
        return new THREE.Vector3(x, y, z);
    }
    // // 生成线
    createLineMesh(vertices: any, color: any, style: number) {
        let lineMesh = null;
        const geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style === 2) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                dashSize: 10,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();
        } else if (style === 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    // 生产实线和虚线
    createLine(n1: number, n2: number, color: string, o1: any, ) {
        let line;
        let line1;
        const vertices = [];
        vertices.push(this.vec3(this.point2[n1][0], this.point2[n1][1], this.point2[n1][2]));
        vertices.push(this.vec3(this.point2[n2][0], this.point2[n2][1], this.point2[n2][2]));
        line = this.createLineMesh(vertices, color, 3);
        o1.add(line);
        line1 = this.createLineMesh(vertices, color, 3);
        o1.add(line1);
        line = this.createLineMesh(vertices, color, 2);
        o1.add(line);
    }
    // 创建带下标的字母
    createText(text: any, pos: any, group: any) {
        const text1 = common.createText1(text, pos, {'color': '#000'});
        group.add(text1);
    }
    addCubeLine() {
        this.createLine(0, 1, '#258AD3', this.lineGroup, );
        this.createLine(0, 3, '#258AD3', this.lineGroup, );
        this.createLine(0, 4, '#258AD3', this.lineGroup, );
        this.createLine(1, 2, '#258AD3', this.lineGroup, );
        this.createLine(1, 5, '#258AD3', this.lineGroup, );
        this.createLine(2, 3, '#258AD3', this.lineGroup, );
        this.createLine(2, 6, '#258AD3', this.lineGroup, );
        this.createLine(3, 7, '#258AD3', this.lineGroup, );
        this.createLine(4, 7, '#258AD3', this.lineGroup, );
        this.createLine(4, 5, '#258AD3', this.lineGroup, );
        this.createLine(5, 6, '#258AD3', this.lineGroup, );
        this.createLine(6, 7, '#258AD3', this.lineGroup, );
    }
    // 画立方体
    createCube() {
        //立方体
        const cubeGeometry = new THREE.Geometry();
        //创建立方体的顶点
        cubeGeometry.vertices = [
            new THREE.Vector3(-100, 100, -100), //A 0
            new THREE.Vector3(100, 100, -100), //B 1
            new THREE.Vector3(100, 100, 100), //C 2
            new THREE.Vector3(-100, 100, 100), //D 3
            new THREE.Vector3(-100, -100, -100), //A1 4
            new THREE.Vector3(100, -100, -100), //B1 5
            new THREE.Vector3(100, -100, 100), //C1 6
            new THREE.Vector3(-100, -100, 100), //D1 7
        ];
        // 创建立方的面
        cubeGeometry.faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 3, 4),
            new THREE.Face3(0, 4, 5),
            new THREE.Face3(1, 6, 7),
            new THREE.Face3(1, 7, 2),
            new THREE.Face3(6, 5, 4),
            new THREE.Face3(6, 4, 7),
            new THREE.Face3(5, 6, 1),
            new THREE.Face3(5, 1, 0),
            new THREE.Face3(3, 2, 7),
            new THREE.Face3(3, 7, 4),
        ];
        //生成法向量
        cubeGeometry.computeFaceNormals();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide});
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.addCubeLine();
        // 生成八个顶点字母
        for (const i in this.pot) {
            if (this.pot.hasOwnProperty(i)) {
                this.createText(i, this.pot[i], this.textGroup);
            }
        }
    }
    addCube1Line() {
        this.createLine(0, 1, '#258AD3', this.lineGroup1, );
        this.createLine(0, 3, '#258AD3', this.lineGroup1, );
        this.createLine(1, 2, '#258AD3', this.lineGroup1, );
        this.createLine(2, 3, '#258AD3', this.lineGroup1, );
        this.createLine(2, 6, '#258AD3', this.lineGroup1, );
        this.createLine(5, 6, '#258AD3', this.lineGroup1, );
        this.createLine(1, 5, '#258AD3', this.lineGroup1, );
        this.createLine(3, 6, '#EF334A', this.lineGroup1, );
        this.createLine(0, 5, '#EF334A', this.lineGroup1, );
    }
    // 画场景一中分解步骤三中的几何体
    createCube1() {
        const cubeGeometry = new THREE.Geometry();
        cubeGeometry.vertices = [
            new THREE.Vector3(-100, 100, -100), //A 0
            new THREE.Vector3(100, 100, -100), //B 1
            new THREE.Vector3(100, 100, 100), //C 2
            new THREE.Vector3(-100, 100, 100), //D 3
            new THREE.Vector3(-100, -100, -100), //A1 4
            new THREE.Vector3(100, -100, -100), //B1 5
            new THREE.Vector3(100, -100, 100), //C1 6
            new THREE.Vector3(-100, -100, 100), //D1 7
        ];
        cubeGeometry.faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 1, 5),
            new THREE.Face3(0, 3, 5),
            new THREE.Face3(3, 5, 6),
            new THREE.Face3(3, 2, 6),
            new THREE.Face3(1, 2, 5),
            new THREE.Face3(2, 5, 6),
        ];
        cubeGeometry.computeFaceNormals();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide});
        this.cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.addCube1Line();
        // 生成几何体顶点字母
        for (const i in this.pot1) {
            if (this.pot1.hasOwnProperty(i)) {
                this.createText(i, this.pot1[i], this.textGroup1);
            }
        }
    }
    addCube2Line() {
        this.createLine(0, 1, '#258AD3', this.lineGroup2, );
        this.createLine(0, 9, '#258AD3', this.lineGroup2, );
        this.createLine(0, 5, '#EF334A', this.lineGroup2, );
        this.createLine(1, 5, '#258AD3', this.lineGroup2, );
        this.createLine(5, 9, '#258AD3', this.lineGroup2, );
        this.createLine(8, 9, '#32CD32', this.lineGroup2, );
        this.createLine(8, 1, '#32CD32', this.lineGroup2, );
        this.createLine(8, 5, '#32CD32', this.lineGroup2, );
    }
    // 画场景一中分解步骤三中的几何体
    createCube2() {
        const cubeGeometry = new THREE.Geometry();
        cubeGeometry.vertices = [
            new THREE.Vector3(-100, 100, -100), //A 0
            new THREE.Vector3(100, 100, -100), //B 1
            new THREE.Vector3(100, -100, -100), //B1 2
            new THREE.Vector3(100, 0, 100), //S 3
            new THREE.Vector3(0, 0, 100), //DC1中点 4
        ];
        cubeGeometry.faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(0, 3, 4),
            new THREE.Face3(0, 2, 4),
            new THREE.Face3(1, 2, 3),
            new THREE.Face3(2, 3, 4),
        ];
        cubeGeometry.computeFaceNormals();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide});
        this.cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.addCube2Line();
        // 生成几何体顶点字母
        for (const i in this.pot2) {
            if (this.pot2.hasOwnProperty(i)) {
                this.createText(i, this.pot2[i], this.textGroup2);
            }
        }
    }
    addCube3Line() {
        this.createLine(0, 1, '#258AD3', this.lineGroup3, );
        this.createLine(0, 8, '#9370DB', this.lineGroup3, );
        this.createLine(0, 5, '#EF334A', this.lineGroup3, );
        this.createLine(1, 5, '#258AD3', this.lineGroup3, );
        this.createLine(8, 1, '#32CD32', this.lineGroup3, );
        this.createLine(8, 5, '#32CD32', this.lineGroup3, );
    }
    // 画场景一中分解步骤三中的几何体
    createCube3() {
        const cubeGeometry = new THREE.Geometry();
        cubeGeometry.vertices = [
            new THREE.Vector3(-100, 100, -100), //A 0
            new THREE.Vector3(100, 100, -100), //B 1
            new THREE.Vector3(100, -100, -100), //B1 2
            new THREE.Vector3(100, 0, 100), //S 3
        ];
        cubeGeometry.faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3),
        ];
        cubeGeometry.computeFaceNormals();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide});
        this.cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.addCube3Line();
    }
    //设置直角函数
    drawAngle() {
        this.curvePointArrayOnXAxis = [];
        this.curvePointArrayOnXAxis1 = [];
        this.curvePointArrayOnXAxis.push(
            new THREE.Vector3(0, 10, 0),
            new THREE.Vector3(10, 10, 0));
        this.curvePointArrayOnXAxis1.push(
            new THREE.Vector3(8, 10, 0),
            new THREE.Vector3(8, 0, 0));
        this.drawRightAngle = this.drawLine(this.curvePointArrayOnXAxis);
        this.drawRightAngle1 = this.drawLine(this.curvePointArrayOnXAxis1);
        this.drawRightAngle_group1.add(this.drawRightAngle, this.drawRightAngle1);
        this.drawRightAngle_group1.position.set(100, 0, -102);
        this.drawRightAngle_group1.rotation.y = 7 * Math.PI / 8;
        this.drawRightAngle_group1.rotation.x = Math.PI / 2;
    }
    // 画直角线段
    drawLine (obj: any) {
        const geometry = new THREE.Geometry();
        geometry.vertices = obj;
        const materity = new THREE.LineDashedMaterial({
            color: '#1E90FF',
            opacity: 0.8,
            dashSize: 8,
            gapSize: 5,
            depthTest: false
        });
        const lineMesh = new THREE.LineSegments(geometry, materity);
        lineMesh.computeLineDistances();
        return lineMesh;
    }
    // 滚动解析步骤事件函数
    stepChange(type: string) {
        this.resetCamera();
        if (type === 'step1') {
            this.clearTimer();
            this.scene.add(this.cube, this.lineGroup, this.textGroup);
            this.scene.remove(this.cube1, this.cube2, this.cube3, this.lineRedGroup, this.lineGroup1,
                this.lineGreenGroup, this.lineGroup2, this.linePurpleGroup, this.lineGroup3,
                this.textS, this.lineBlueGroup, this.textO, this.drawRightAngle_group1);
            this.analysisAni();
            this.textS.material.color = new THREE.Color('##32CD32');
        } else if (type === 'step2') {
            this.clearTimer();
            this.scene.add(this.cube3, this.textS, this.textGroup2, this.lineBlueGroup, this.textO, this.drawRightAngle_group1);
            this.scene.remove(this.cube1, this.cube2, this.cube, this.lineGroup, this.lineRedGroup, this.lineGroup1,
                this.lineGreenGroup, this.lineGroup2, this.linePurpleGroup, this.linePurpleGroup, this.textGroup, this.textGroup1, );
            this.textS.material.color = new THREE.Color('#1A1A1A');
        }
    }
    // 第一步解析动画函数
    analysisAni() {
        this.timer1 = setTimeout(() => {
            this.scene.add(this.lineRedGroup);
        }, 1000);
        this.timer2 = setTimeout(() => {
            this.scene.remove(this.cube, this.lineGroup, this.textGroup);
            this.scene.add(this.cube1, this.lineGroup1, this.textGroup1);
        }, 2000);
        this.timer3 = setTimeout(() => {
            this.scene.add(this.textS, this.lineGreenGroup);
            this.scene.remove(this.lineRedGroup,  );
        }, 3000);
        this.timer4 = setTimeout(() => {
            this.scene.remove(this.cube1, this.lineGroup1, this.lineGreenGroup, this.textGroup1);
            this.scene.add(this.cube2, this.lineGroup2, this.textGroup2);
        }, 4000);
        this.timer5 = setTimeout(() => {
            this.scene.add(this.linePurpleGroup);
        }, 5000);
        this.timer6 = setTimeout(() => {
            this.scene.remove(this.cube2, this.lineGroup2, this.linePurpleGroup);
            this.scene.add(this.cube3, this.lineGroup3);
        }, 6000);
    }
    // 清除还原过程中的定时器
    clearTimer() {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        clearTimeout(this.timer4);
        clearTimeout(this.timer5);
        clearTimeout(this.timer6);
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //初始化摄像机位置
    resetCamera(): void {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(100, 100, 250);
        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}




