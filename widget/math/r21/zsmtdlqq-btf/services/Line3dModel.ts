import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import {TweenMax} from 'gsap';
export class Line3dModel extends ThreeBase {
    private orbit: any;
    private num_came: any;
    private sphere: any;
    private dirLight: any;
    private pointO = ThreeUtil.createSphere(1, '#000', 1, 0, 0, 0);
    private textA = ThreeUtil.createNewRomanText('C', -108, -108, -108, '#000', 0.3);
    private textB = ThreeUtil.createNewRomanText('B', 108, 108, -108, '#000', 0.3);
    private textC = ThreeUtil.createNewRomanText('A', 108, -108, 108, '#000', 0.3);
    private textS = ThreeUtil.createNewRomanText('S', -108, 108, 108, '#000', 0.3);
    private textO = ThreeUtil.createNewRomanText('O', 0, 0, 0, '#000', 0.3);
    private textO1 = ThreeUtil.createNewRomanText('O₁', -100 / 3, -100 / 3, 100 / 3, '#F5A623', 0.3);
    private pointO1 = ThreeUtil.createSphere(1, '#F5A623', 1, -100 / 3, -100 / 3, 100 / 3);
    private textE = ThreeUtil.createNewRomanText('E', -110, 0, 0, '#F5A623', 0.3);
    private textF = ThreeUtil.createNewRomanText('F', 110, 0, 0, '#F5A623', 0.3);
    private lineEF: any;
    private lineBD1: any;
    private group = new THREE.Group();
    private vertices: any = [];
    private threePyramid: any = [];
    private threePyramid1: any = [];
    private threePyramid2: any = [];
    private threePyramid3: any = [];
    private threePyramid4: any = [];
    private cube: any;
    private cube1: any;
    private cube2: any;
    private cube3: any;
    private cube4: any;
    public lineGroup = new THREE.Group();
    public textGroup = new THREE.Group();
    private moveAnimation: any;
    private pot: any = {
        'A': [-100, 100, -100],
        'B': [100, 100, -100],
        'C': [100, 100, 100],
        'D': [-100, 100, 100],
        'a': [-100, -100, -100],
        'b': [100, -100, -100],
        'c': [100, -100, 100],
        'd': [-100, -100, 100],
    };
    private pot1: any = {
        'D': [-108, 108, 108],
        'C': [108, 108, 108],
        'B': [108, 108, -108],
        'A': [-108, 108, -108],
        'D1': [-105, -105, 105],
        'C1': [105, -105, 105],
        'B1': [105, -105, -105],
        'A1': [-105, -105, -105],
    };
    // 独立生成场景一里的正四面体创建的变量
    private cube5: any;
    private cubeGeometry5: any;
    private vertices5: any;
    private face5: any;
    private obj1: any;
    private obj2: any;
    private point2 = [
        [100.5, 100.5, 100.5],
        [-100.5, 100.5, 100.5],
        [-100.5, -100.5, 100.5],
        [100.5, -100.5, 100.5],
        [100.5, -100.5, -100.5],
        [100.5, 100.5, -100.5],
        [-100.5, 100.5, -100.5],
        [-100.5, -100.5, -100.5],
    ];
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera, );
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
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
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
        const near    = -500;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(70, 500, -68);
        this.scene.add(this.camera);
    }
    /**
     * 初始化光源
     */
    initLight(): void {
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3);
        this.camera.add(ambientLight);
        this.dirLight = new THREE.DirectionalLight('#ffffff', 1);
        this.dirLight.position.set(250, 250, 250);
        this.camera.add(this.dirLight);
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
        const geometry1 = new THREE.SphereGeometry( 100, 64, 64 );
        const material1 = new THREE.MeshPhongMaterial( { transparent: true, color: 0x696969, opacity: 0.6, depthTest: false} );
        this.sphere = new THREE.Mesh( geometry1, material1 );
        this.group.add(this.textA, this.textB, this.textC, this.textS);
        this.scene.add(this.group);
        this.createThreePyramid();
        this.cube = this.initModel(this.threePyramid, '#696969', );
        (this.cube as any).material.opacity = 0.35;
        this.createThreePyramid1();
        this.cube1 = this.initModel(this.threePyramid1, '#4e72b8', );
        this.createThreePyramid2();
        this.cube2 = this.initModel(this.threePyramid2, '#4e72b8', );
        this.createThreePyramid3();
        this.cube3 = this.initModel(this.threePyramid3, '#4e72b8', );
        this.createThreePyramid4();
        this.cube4 = this.initModel(this.threePyramid4, '#4e72b8', );
        this.cube1.position.set(-1000, 0, 1000);
        this.cube2.position.set(-1000, 0, -1000);
        this.cube3.position.set(1000, 0, -1000);
        this.cube4.position.set(1000, 0, 1000);
        this.initLine();
        this.lineBD1 = this.createDashLine([100, 100, -100], [-100, -100, 100], '#FF0000');
        this.lineEF = this.createDashLine([-100, 0, 0], [100, 0, 0], '#F5A623');
        (this.pointO1.material as any).depthTest = false;
        (this.pointO.material as any).depthTest = false;
        this.createCube();
        this.moveEvent();
    }

    // 场景一添加正四面体函数
    createCube() {
        //正四面体
        this.cubeGeometry5 = new THREE.Geometry();
        //创建正四面体的顶点
        this.vertices5 = [
            new THREE.Vector3(100, 100, -100), //B
            new THREE.Vector3(-100, 100, 100), //D
            new THREE.Vector3(-100, -100, -100), //A1
            new THREE.Vector3(100, -100, 100), //C1
        ];
        this.cubeGeometry5.vertices = this.vertices5;
        // 创建正四面体的面
        this.face5 = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3),
        ];
        this.cubeGeometry5.faces = this.face5;
        //生成法向量
        this.cubeGeometry5.computeFaceNormals();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: '#DCDCDC', side: THREE.DoubleSide,
            depthTest: true,
        });
        this.cube5 = new THREE.Mesh(this.cubeGeometry5, cubeMaterial);
        this.scene.add(this.cube5);
        this.addCubeLine();
    }
    // 场景一正四面体虚线实线函数
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, }));
        }
        return lineMesh;
    }
    // 生产场景一正四面体实线和虚线
    createLine1(n1: number, n2: number, o1: any, o2: any) {
        let line;
        const vertices = [];
        vertices.push(new THREE.Vector3(this.point2[n1][0], this.point2[n1][1], this.point2[n1][2]));
        vertices.push(new THREE.Vector3(this.point2[n2][0], this.point2[n2][1], this.point2[n2][2]));
        line = this.createLineMesh(vertices, '#000000', 3);
        o1.add(line);
        line = this.createLineMesh(vertices, '#000000', 2);
        o2.add(line);
    }
    // 场景添加场景一正四面体实线和虚线
    addCubeLine() {
        this.scene.remove(this.obj1);
        this.scene.remove(this.obj2);
        this.obj1 = new THREE.Object3D();
        this.obj2 = new THREE.Object3D();
        this.createLine1(1, 3, this.obj1, this.obj2);
        this.createLine1(1, 5, this.obj1, this.obj2);
        this.createLine1(1, 7, this.obj1, this.obj2);
        this.createLine1(3, 5, this.obj1, this.obj2);
        this.createLine1(3, 7, this.obj1, this.obj2);
        this.createLine1(5, 7, this.obj1, this.obj2);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
    }
    // 场景四创建虚线线段函数
    createDashLine (pos1: any, pos2: any, color: string) {
        const geometry = new THREE.Geometry();
        const p1 = new THREE.Vector3(pos1[0], pos1[1], pos1[2]);
        const p2 = new THREE.Vector3(pos2[0], pos2[1], pos2[2]);
        geometry.vertices.push(p1, p2);
        const material = new THREE.LineDashedMaterial({
            color: color, dashSize: 8, gapSize: 4});
        const line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        return line;
    }
    // 创建立方体八个点
    createVector () {
        this.vertices = [
            new THREE.Vector3(-100, 100, -100), //A
            new THREE.Vector3(100, 100, -100), //B
            new THREE.Vector3(100, 100, 100), //C
            new THREE.Vector3(-100, 100, 100), //D
            new THREE.Vector3(-100, -100, -100), //A1
            new THREE.Vector3(100, -100, -100), //B1
            new THREE.Vector3(100, -100, 100), //C1
            new THREE.Vector3(-100, -100, 100), //D1
        ];
    }
    // 创建四面体
    createFace (num1: number, num2: number, num3: number, num4: number) {
        const face = [
            new THREE.Face3(num1, num2, num4),
            new THREE.Face3(num1, num3, num4),
            new THREE.Face3(num1, num2, num3),
            new THREE.Face3(num2, num3, num4),
        ];
        return face;
    }
    //生成几何体面
    initModel(threePyramid: any, color: string, ) {
        const geometry = new THREE.Geometry();
        geometry.vertices = this.vertices;
        geometry.faces = threePyramid;
        //生成法向量
        geometry.computeFaceNormals();
        const material = new THREE.MeshLambertMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2,
            depthTest: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
    // 生成四个直三棱锥函数
    createThreePyramid1 () {
        this.createVector();
        this.threePyramid1 = this.createFace(3, 4, 6, 7);
    }
    createThreePyramid2 () {
        this.createVector();
        this.threePyramid2 = this.createFace(0, 1, 3, 4);
    }
    createThreePyramid3 () {
        this.createVector();
        this.threePyramid3 = this.createFace(1, 4, 5, 6);
    }
    createThreePyramid4 () {
        this.createVector();
        this.threePyramid4 = this.createFace(2, 1, 3, 6);
    }
    createThreePyramid() {
        this.createVector();
        this.threePyramid = this.createFace(1, 3, 4, 6);
    }
    createLine (start: any, end: any, name: any, color: string, isDash: boolean, isCube: boolean) {
        let line1: any = common.drawUnitLine({ width: 1, color: color, isDash: isDash });
        let line2: any = common.drawUnitLine({ width: 1, color: color, isDash: false });
        line1 = common.scaleLine(start, end, line1, isCube);
        line1.name = name;
        line2 = common.scaleLine(start, end, line2);
        line2.name = name;
        line2.visible = false;
        this.lineGroup.add(line1, line2);
    }
    initLine(): void {
        const pot: any = this.pot;
        // 创建立方体十二条边
        this.createLine(pot.A, pot.B, 'AB', '#000', false, true);
        this.createLine(pot.A, pot.D, 'AD', '#000', false, true);
        this.createLine(pot.A, pot.a, 'Aa', '#000', false, true);
        this.createLine(pot.B, pot.C, 'BC', '#000', false, true);
        this.createLine(pot.B, pot.b, 'Bb', '#000', false, true);
        this.createLine(pot.C, pot.D, 'CD', '#000', false, true);
        this.createLine(pot.C, pot.c, 'Cc', '#000', false, true);
        this.createLine(pot.D, pot.d, 'Dd', '#000', false, true);
        this.createLine(pot.a, pot.b, 'ab', '#000', false, true);
        this.createLine(pot.a, pot.d, 'ad', '#000', false, true);
        this.createLine(pot.b, pot.c, 'bc', '#000', false, true);
        this.createLine(pot.c, pot.d, 'cd', '#000', false, true);
        // 创建中间正四面体上六条蓝色边
        this.createLine(pot.A, pot.C, 'ac', '#30B89A', true, true);
        this.createLine(pot.b, pot.d, 'BD', '#30B89A', true, true);
        this.createLine(pot.c, pot.D, 'cD', '#30B89A', true, true);
        this.createLine(pot.B, pot.a, 'Ba', '#30B89A', true, true);
        this.createLine([100, 100, -100], [100, -100, 100], 'Bc', '#30B89A', true, false);
        this.createLine([-100, 100, 100], [-100, -100, -100], 'Da', '#30B89A', true, false);
        // 生成八个顶点字母
        for ( const i in this.pot1) {
            if (this.pot1.hasOwnProperty(i)) {
                this.createText(i, this.pot1[i]);
            }
        }
    }
    createText (text: any, pos: any) {
        const text1 = common.createText1(text, pos, { 'color': '#000'});
        this.textGroup.add(text1);
    }
    // 滚动解析步骤事件函数
    stepChange(type: string) {
        this.resetCamera();
        if (type === 'step1') {
            this.changeElement(1, false, 0.35, -250);
            this.scene.add(this.cube5, this.group, this.obj2, this.obj1, );
        } else if (type === 'step2') {
            this.camera.position.set(70, 500, -68);
            this.changeElement(1, false, 0.35, -250);
            this.scene.add( this.cube5, this.sphere, this.textO, this.pointO, this.group, this.obj2, this.obj1, this.dirLight);
            this.camera.remove(this.dirLight);
        } else if (type === 'step3') {
            this.camera.add(this.dirLight);
            this.scene.remove(this.dirLight);
            this.resetCamera1();
            this.changeElement(1, true, 0.15, 250);
            this.scene.add( this.cube, this.cube1, this.cube2, this.cube3, this.cube4, );
            this.moveEvent();
            this.moveAnimation.play();
        } else if (type === 'step4') {
            this.moveAnimation.progress(0);
            this.moveAnimation.pause();
            this.changeElement(2, true, 0.15, 250);
            this.scene.remove(this.sphere, this.textE, this.textF, this.lineEF, this.cube5, this.obj2, this.obj1, this.group);
        } else if (type === 'step5') {
            this.changeElement(2, true, 0.15, 250);
            this.scene.remove(this.textO1, this.pointO1, this.cube5, this.obj2, this.obj1, this.group);
        }
    }
    // 清除或添加场景里的所有元素
    changeElement (val: number, boolean: boolean, num: number, lightPos: number) {
        if (val === 1) {
            this.scene.remove(this.sphere, this.lineGroup, this.textGroup, this.cube1, this.cube2, this.cube3, this.cube4, this.cube,
                this.cube5, this.textE, this.textF, this.lineEF, this.textO, this.pointO, this.textO1, this.pointO1, this.lineBD1,
                this.group, this.obj2, this.obj1, );
        } else if (val === 2) {
            this.resetCamera1();
            this.scene.add(this.sphere, this.lineGroup, this.textGroup, this.cube1, this.cube2, this.cube3, this.cube4, this.cube,
                this.cube5, this.textE, this.textF, this.lineEF, this.textO, this.pointO, this.textO1, this.pointO1, this.lineBD1,
                this.group, this.obj2, this.obj1, );
            this.cube1.position.set(0, 0, 0);
            this.cube2.position.set(0, 0, 0);
            this.cube3.position.set(0, 0, 0);
            this.cube4.position.set(0, 0, 0);
        }
        this.lineGroup.visible = boolean;
        this.textGroup.visible = boolean;
        this.obj1.visible = !boolean;
        this.obj2.visible = !boolean;
        (this.cube as any).material.opacity = num;
        this.dirLight.position.set(lightPos, 250, lightPos);

    }
    // 重置解析三、四、五的相机位置
    resetCamera1 () {
        this.camera.position.set(100, 100, 250);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    // 三棱锥飞进来动画
    moveEvent() {
        const tween = {
            x: -500,
            y: 0,
            z: 500,
        };
        this.moveAnimation = TweenMax.to(tween, 2, {
            x: 0,
            y: 0,
            z: 0,
            onStart: () => {
            },
            onUpdate: () => {
                this.cube1.position.set(tween.x, tween.y, tween.z);
                this.cube2.position.set(tween.x, tween.y, -tween.z);
                this.cube3.position.set(-tween.x, tween.y, -tween.z);
                this.cube4.position.set(-tween.x, tween.y, tween.z);
            },
            onComplete: () => {
                this.scene.add(this.lineGroup, this.textGroup, );
            },
            paused: true
        });
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




