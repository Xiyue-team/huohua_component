import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    private orbit: any;
    private num_came: any;
    private sphere: any;  //大圆球体
    private dirLight: any;
    private pointO = ThreeUtil.createSphere(1, '#000', 1, 0, 0, 0);
    private textA = ThreeUtil.createNewRomanText('A', 108, -108, 108, '#000', 0.3);
    private textB = ThreeUtil.createNewRomanText('B', 108, 108, -108, '#000', 0.3);
    private textC = ThreeUtil.createNewRomanText('C', -108, -108, -108, '#000', 0.3);
    private textS = ThreeUtil.createNewRomanText('S', -108, 108, 108, '#000', 0.3);
    private textO = ThreeUtil.createNewRomanText('O', 0, 0, 0, '#000', 0.3);
    private textE = ThreeUtil.createNewRomanText('E', 8, 8, 108, '#F89E08', 0.3);
    private textF = ThreeUtil.createNewRomanText('F', 8, 8, -108, '#F89E08', 0.3);
    private lineEF = this.createDashLine([0, 0, 100.5], [0, 0, -100.5], '#F89E08');
    private lineEB = this.createDashLine([0, 0, 100.5], [100.5, 100.5, -100.5], '#2DB72C');
    private lineEC = this.createDashLine([0, 0, 100.5], [ -100.5, -100.5, -100.5], '#2DB72C');
    private lineFA = this.createDashLine([0, 0, -100.5], [100.5, -100.5, 100.5], '#3C4FC8');
    private lineFS = this.createDashLine([0, 0, -100.5], [-100.5, 100.5, 100.5], '#3C4FC8');
    private zhijiao = this.createRightAngle();
    private group = new THREE.Group();  //存放A,B,C,S四点
    private vertices: any = [];
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
    private render = () => { requestAnimationFrame( this.render ); this.renderer.render( this.scene, this.camera, ); };
    /**
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
     //初始化控制器
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
     //初始化镜头
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
        this.camera.position.set(70, 400, -30);
        this.scene.add(this.camera);
    }
     //初始化光源
    initLight(): void {
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3);
        this.camera.add(ambientLight);
        this.dirLight = new THREE.DirectionalLight('#ffffff', 1);
        this.dirLight.position.set(250, 250, 250);
        this.camera.add(this.dirLight);
    }
     //初始化渲染器
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
        (this.pointO.material as any).depthTest = false;
        this.createCube();
    }

    // 场景四创建虚线线段函数
    createDashLine (pos1: any, pos2: any, color: string) {
        const geometry = new THREE.Geometry();
        const p1 = new THREE.Vector3(pos1[0], pos1[1], pos1[2]);
        const p2 = new THREE.Vector3(pos2[0], pos2[1], pos2[2]);
        geometry.vertices.push(p1, p2);
        const material = new THREE.LineDashedMaterial({color: color, dashSize: 8, gapSize: 4});
        const line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        return line;
    }

    //直角符号方法
    createRightAngle () {
        const geometry = new THREE.Geometry();
        const material = new THREE.LineBasicMaterial( {color: '#F89E08'});

        // 线的材质可以由2点的颜色决定
        const p1 = new THREE.Vector3(0, 0, 95.5);
        const p2 = new THREE.Vector3(5, -5, 95.5);
        const p3 = new THREE.Vector3(5, -5, 100.5);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.vertices.push(p3);

        const line = new THREE.Line( geometry, material);
        return line;
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
            depthTest: false,
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
    // 滚动解析步骤事件函数
    stepChange(type: string) {
        this.resetCamera();
        if (type === 'step1') {
            this.changeElement(1, 0.35, -250);
            this.scene.add(this.cube5, this.group, this.obj2, this.obj1);
            this.scene.remove(this.lineEB, this.lineEC, this.lineEF, this.lineFA, this.lineFS, this.textE, this.textF, this.zhijiao);
        } else if (type === 'step2') {
            this.changeElement(1, 0.35, -250);
            this.scene.add( this.cube5, this.sphere, this.textO, this.pointO, this.group, this.obj2, this.obj1, this.dirLight);
            this.scene.remove(this.lineEB, this.lineEC, this.lineEF, this.lineFA, this.lineFS, this.textE, this.textF, this.zhijiao);
        } else if (type === 'step3') {
            this.changeElement(2, 0.15, 250);
            this.scene.add(this.lineEB, this.lineEC, this.lineEF, this.lineFA, this.lineFS, this.textE, this.textF);
            this.scene.remove(this.sphere, this.zhijiao);
        } else if (type === 'step4') {
            this.changeElement(2, 0.15, 250);
            this.scene.add(this.lineEF, this.textE, this.textF);
            this.scene.remove(this.lineEB, this.lineEC, this.lineFA, this.lineFS, this.zhijiao);
        } else if (type === 'step5') {
            this.changeElement(2, 0.15, 250);
            this.scene.add(this.lineEF, this.textE, this.textF, this.lineFA, this.zhijiao);
            this.scene.remove(this.lineEB, this.lineEC, this.lineFS);
        }
    }
    // 清除或添加场景里的所有元素
    changeElement (val: number, num: number, lightPos: number) {
        if (val === 1) {
            this.scene.remove(this.sphere, this.cube5, this.textO, this.pointO, this.group, this.obj2, this.obj1);
        } else if (val === 2) {
            this.scene.add(this.sphere, this.cube5, this.textO, this.pointO, this.group, this.obj2, this.obj1);
        }
        this.dirLight.position.set(lightPos, 250, lightPos);
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




