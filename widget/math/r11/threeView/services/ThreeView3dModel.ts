/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16: 52
 */
import * as THREE from 'three';
import {
    Scene,
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';

import * as jtBin from '../sub_static/photo/JT.bin';
import * as jtGltf from '../sub_static/photo/JT.gltf';


import * as bin from '../sub_static/photo/Material25_baseColor.png';
import * as gltf from '../sub_static/photo/Material26_baseColor.png';

const OBJLoader = require('three-obj-loader');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import { SpriteText2D} from 'three-text2d';

export class ThreeView3dModel extends ThreeBase {

    planeMesh: Mesh;

    private orbit: any;

    private edges: any;
    private line: any;

    private threeEdges: any;
    private threeLine: any;

    private cube: any;
    private cubeGeometry: any;
    private vertices: any;
    private faces: any;

    private threePyramid: any;
    private pyramid: any;
    private timer: any;
    private value = false;

    private htext: any;
    private ftext: any;

    private cubeLine: any = [];

    private obj: any;
    private obj2: any;

    private point2 = [
        [100.5,   0.5,      100.5],
        [-100.5,  0.5,      100.5],
        [-100.5,  -200.5,   100.5],
        [100.5,   -200.5,   100.5],

        [100.5,   -200.5,   -100.5],
        [100.5,   0.5,      -100.5],
        [-100.5,   0.5,      -100.5],
        [-100.5,  -200.5,   -100.5],

        [-100.5,  200.5,    -100.5]
    ];

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
        //this.flag.animation();
        if (this.orbit.object.position.x === -100 || this.orbit.object.position.y === 100 || this.orbit.object.position.z === 100) {
            this.value = true;
        }

        if (this.value) {
            if (this.orbit.object.position.x !== -100 && this.orbit.object.position.y !== 0 && this.orbit.object.position.z !== 0) {
                (window as any).viewHandler.viewModel.$data.view_angle = null;
                this.value = false;
            }
        }
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
        this.preload();

        this.initWebGLRenderer();
        this.initControl();
        this.createPrism();
        this.render();

        this.initGltfLoader();

        this.createB();
    }

    preload() {
        console.log(jtBin);
        console.log(jtGltf);

        console.log(bin);
        console.log(gltf);
    }

    async initGltfLoader()  {

        const jt: any = await this.gltfLoader(jtGltf as any);
        jt.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.scene.add(child);
                console.log(child);
                child.position.x = 0;
                child.position.y = -100;
                child.position.z = 150;
                child.rotateY(Math.PI / 180 * 90);
            }
        });

    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xffffff );
        // this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
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
        this.camera.lookAt(new THREE.Vector3(0, -100, 0));
        this.camera.position.set(20, 20, 60);
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
        //this.renderer = new THREE.WebGLRenderer({antialias: true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        /*(this.renderer as WebGLRenderer).setClearColor('#FFFFFF' ,0.9);*/
        this.renderer.setSize(this.width, this.height);
        const element = this.domElement.appendChild(this.renderer.domElement);

    /*    (this.renderer as any).gammaInput = true;
        (this.renderer as any).gammaOutput = true;*/
        //(this.renderer as any).shadowMap.enabled = true;

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

        //orbit.minPolarAngle = ; // radians
        // orbit.maxPolarAngle = Math.PI*4/9; // radians

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

    //创建3d图形
    createPrism() {
        this.createCube();

        this.createThreePyramid();

    }

    createText(texts: any , x: any, y: any, z: any, color: any) {
        const textStyle = {font: 'italic 36px "Times New Roman"' , fillStyle: color, antialias: false};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.5, 0.5, 0.5);
        text.position.set(x, y, z);
        return text;
    }

    createB() {
        const sprite = new SpriteText2D('正视角',
            {font: '36px "Arial"' , fillStyle: '#00000' , antialias: false});
        sprite.position.set(0 , -100 , 200);
        sprite.scale.set(0.5, 0.5, 0.5);
        this.scene.add(sprite);

        const atext = this.createText('A' , -110, -210 , 110, '#7076FA');
        const btext = this.createText('B' , -110, -210 , -110, '#7076FA');
        const ctext = this.createText('C' , 110, -210 , -110, '#7076FA');
        const dtext = this.createText('D' , 110, -210 , 110, '#7076FA');
        const etext = this.createText('E' , -110, 10 , 110, '#7076FA');
        this.ftext = this.createText('F' , -110, 10 , -110, '#7076FA');
        const gtext = this.createText('G' , 110, 10 , -110, '#7076FA');
        this.htext = this.createText('H' , 110, 10 , 110, '#7076FA');

        this.scene.add(atext);
        this.scene.add(btext);
        this.scene.add(ctext);
        this.scene.add(dtext);
        this.scene.add(etext);
        this.scene.add(this.ftext);
        this.scene.add(gtext);
        this.scene.add(this.htext);

    }

    // 画立方体
    createCube() {
        //立方体
        this.cubeGeometry = new THREE.Geometry();

        //创建立方体的顶点
        this.vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(-100, -200, 100), //v2
            new THREE.Vector3(100, -200, 100), //v3
            new THREE.Vector3(100, -200, -100), //v4
            new THREE.Vector3(100, 0, -100), //v5
            new THREE.Vector3(-100, 0, -100), //v6
            new THREE.Vector3(-100, -200, -100), //v7
        ];

        this.cubeGeometry.vertices = this.vertices;

        // 创建立方的面
        this.faces = [
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

        this.cubeGeometry.faces = this.faces;

        //生成法向量
        this.cubeGeometry.computeFaceNormals();

        const cubeMaterial = new THREE.MeshBasicMaterial( {color: '#CFEAF8', side: THREE.DoubleSide} );

        this.cube = new THREE.Mesh(this.cubeGeometry, cubeMaterial);

        this.scene.add(this.cube);

        this.edges    = new THREE.EdgesGeometry((this.cubeGeometry) as any, 1);
        this.line     = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color:  '#000000' } ) );
        this.scene.add(this.line);

        this.addCubeLine();
    }

    // 生成点
    vec3(x: number, y: number, z: number) {
        return new THREE.Vector3(x, y, z);
    }

    // 生成线
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
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                depthTest: false
            }));
            lineMesh.computeLineDistances();

        } else if ( style === 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }

    // 生产实线和虚线
    createLine(n1: number, n2: number, o1: any, o2: any) {
        let line;
        const vertices = [];
        vertices.push(this.vec3(this.point2[n1][0], this.point2[n1][1], this.point2[n1][2]));
        vertices.push(this.vec3(this.point2[n2][0], this.point2[n2][1], this.point2[n2][2]));
        line = this.createLineMesh(vertices, '#000000', 3);
        o1.add(line);
        line = this.createLineMesh(vertices, '#000000', 2);
        o2.add(line);
    }

    // 画立方体的线条
    addCubeLine() {

        this.scene.remove(this.obj);
        this.scene.remove(this.obj2);

        this.obj = new THREE.Object3D();
        this.obj2 = new THREE.Object3D();

        this.createLine(0, 1, this.obj, this.obj2);
        this.createLine(1, 2, this.obj, this.obj2);
        this.createLine(2, 3, this.obj, this.obj2);
        this.createLine(3, 0, this.obj, this.obj2);

        this.createLine(4, 5, this.obj, this.obj2);
        this.createLine(5, 6, this.obj, this.obj2);
        this.createLine(6, 7, this.obj, this.obj2);
        this.createLine(7, 4, this.obj, this.obj2);

        this.createLine(3, 4, this.obj, this.obj2);
        this.createLine(0, 5, this.obj, this.obj2);
        this.createLine(6, 1, this.obj, this.obj2);
        this.createLine(2, 7, this.obj, this.obj2);

        this.scene.add(this.obj);
        this.scene.add(this.obj2);
    }

    //画不规则7面体
    createPolyhedron() {
        //立方体
        this.cubeGeometry = new THREE.Geometry();
        this.updateGroupGeometry(this.cube, (this.cubeGeometry) as any);
        this.updateLines1th((this.cubeGeometry) as any);

        //创建立方体的顶点
        this.vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(-100, -200, 100), //v2
            new THREE.Vector3(100, -200, 100), //v3
            new THREE.Vector3(100, -200, -100), //v4
            new THREE.Vector3(100, 0, -100), //v5
            new THREE.Vector3(-100, 0, -100), //v6
            new THREE.Vector3(-100, -200, -100) //v7
        ];

        this.cubeGeometry.vertices = this.vertices;

        //创建立方的面
        this.faces = [
            new THREE.Face3(1, 6, 5),
            new THREE.Face3(1, 2, 3),
            new THREE.Face3(5, 3, 4),

            new THREE.Face3(1, 6, 7),
            new THREE.Face3(1, 7, 2),
            new THREE.Face3(6, 5, 4),
            new THREE.Face3(6, 4, 7),
            new THREE.Face3(5, 6, 1),

            new THREE.Face3(3, 2, 7),
            new THREE.Face3(3, 7, 4)
        ];

        this.cubeGeometry.faces = this.faces;

        //生成法向量
        this.cubeGeometry.computeFaceNormals();
        this.addPolyhedronLine();
    }

    // 画7面体的线条
    addPolyhedronLine() {


        this.scene.remove(this.obj);
        this.scene.remove(this.obj2);

        this.obj = new THREE.Object3D();
        this.obj2 = new THREE.Object3D();

        // this.createLine(0, 1, this.obj, this.obj2);
        this.createLine(1, 2, this.obj, this.obj2);
        this.createLine(2, 3, this.obj, this.obj2);
        // this.createLine(3, 0, this.obj, this.obj2);
        this.createLine(1, 5, this.obj, this.obj2);
        this.createLine(3, 1, this.obj, this.obj2);
        this.createLine(3, 5, this.obj, this.obj2);

        this.createLine(4, 5, this.obj, this.obj2);
        this.createLine(5, 6, this.obj, this.obj2);
        this.createLine(6, 7, this.obj, this.obj2);
        this.createLine(7, 4, this.obj, this.obj2);

        this.createLine(3, 4, this.obj, this.obj2);
        // this.createLine(0, 5, this.obj, this.obj2);
        this.createLine(6, 1, this.obj, this.obj2);
        this.createLine(2, 7, this.obj, this.obj2);

        this.scene.add(this.obj);
        this.scene.add(this.obj2);
    }


    //画三棱锥
    createThreePyramid() {
        //三棱锥
       this.pyramid = new THREE.Geometry();

        //创建三棱锥的顶点
        const vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(100, -200, 100), //v2
            new THREE.Vector3(100, 0, -100), //v3
        ];

        this.pyramid.vertices = vertices;

        //创建三棱锥的面
        const faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(1, 2, 3),
        ];

        this.pyramid.faces = faces;

        //生成法向量
        this.pyramid.computeFaceNormals();

        const cubeMaterial = new THREE.MeshBasicMaterial( {color:  '#4A90E2', side:  THREE.DoubleSide, transparent: true, opacity: 0.2} );

        if (this.threePyramid == null) {
            this.threePyramid = new THREE.Mesh(this.pyramid, cubeMaterial);
            this.scene.add(this.threePyramid);
        } else {
            this.threePyramid.visible = true;
            this.updateGroupGeometry(this.threePyramid, this.pyramid);
            this.updateLines2th(this.pyramid);
        }

        this.threeEdges    = new THREE.EdgesGeometry((this.pyramid) as any, 1);
        this.threeLine     = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color: '#000000' } ) );
        this.scene.add(this.threeLine);

        this.threePyramid.visible = false;
        this.threeLine.visible = false;

    }

    //画组合体
    createAssembly() {

        this.ftext.position.set(-110, 210, -110);
        this.htext.visible = true;
        //立方体
        this.cubeGeometry = new THREE.Geometry();
        this.updateGroupGeometry(this.cube, (this.cubeGeometry) as any);
        this.updateLines1th((this.cubeGeometry) as any);

        //创建立方体的顶点
        this.vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(-100, -200, 100), //v2
            new THREE.Vector3(100, -200, 100), //v3
            new THREE.Vector3(100, -200, -100), //v4
            new THREE.Vector3(100, 0, -100), //v5
            new THREE.Vector3(-100, 200, -100), //v6
            new THREE.Vector3(-100, -200, -100), //v7

        ];

        this.cubeGeometry.vertices = this.vertices;

        //创建立方的面
        this.faces = [
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
            new THREE.Face3(3, 7, 4)
        ];

        this.cubeGeometry.faces = this.faces;

        //生成法向量
        this.cubeGeometry.computeFaceNormals();

        // this.edges    = new THREE.EdgesGeometry((this.cubeGeometry) as any, 1);
        // this.line     = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color:  '#000000' } ) );
        // this.scene.add(this.line);

        this.createAssemblyLine();
    }

    // 画组合体的线条
    createAssemblyLine() {
        this.scene.remove(this.obj);
        this.scene.remove(this.obj2);

        this.obj = new THREE.Object3D();
        this.obj2 = new THREE.Object3D();

        this.createLine(0, 1, this.obj, this.obj2);
        this.createLine(1, 2, this.obj, this.obj2);
        this.createLine(2, 3, this.obj, this.obj2);
        this.createLine(3, 0, this.obj, this.obj2);

        this.createLine(4, 5, this.obj, this.obj2);
        this.createLine(5, 8, this.obj, this.obj2);
        this.createLine(8, 7, this.obj, this.obj2);
        this.createLine(7, 4, this.obj, this.obj2);

        this.createLine(3, 4, this.obj, this.obj2);
        this.createLine(0, 5, this.obj, this.obj2);
        this.createLine(8, 1, this.obj, this.obj2);
        this.createLine(2, 7, this.obj, this.obj2);

        // this.createLine(1, 6, this.obj, this.obj2);
        // this.createLine(5, 6, this.obj, this.obj2);

        this.createLine(5, 1, this.obj, this.obj2);

        this.scene.add(this.obj);
        this.scene.add(this.obj2);
    }

    //更新3d图形
    updateGroupGeometry( mesh: any, geometry: any) {
        mesh.geometry.dispose();
        mesh.geometry = geometry;
    }
    //边框变化更新方法
    updateLines1th(geometry: any) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 1);
    }
    updateLines2th(geometry: any) {
        this.threeLine.geometry.dispose();
        this.threeLine.geometry = new THREE.EdgesGeometry(geometry, 1);
    }


    animationThreePyramid() {
        this.threePyramid.visible = true;
        this.threeLine.visible = true;

        let number = 1;
        this.timer = setInterval(() => {
            for (let k = 0; k < this.pyramid.vertices.length; k++) {
                this.pyramid.vertices[k].x = this.pyramid.vertices[k].x + 1;
                this.pyramid.vertices[k].y = this.pyramid.vertices[k].y - 1;
                this.pyramid.vertices[k].z = this.pyramid.vertices[k].z + 1;
                this.pyramid.verticesNeedUpdate = true;

                this.updateLines2th(this.pyramid);
            }
            this.htext.visible = false;
            this.ftext.position.set(-110, 10, -110);
            number += 1;
            if (number >= 100) {
                clearInterval(this.timer);
                this.threePyramid.visible = false;
                this.threeLine.visible = false;

                this.pyramid = new THREE.Geometry();
                //创建三棱锥的顶点
                const vertices = [
                    new THREE.Vector3(100, 0, 100), //v0
                    new THREE.Vector3(-100, 0, 100), //v1
                    new THREE.Vector3(100, -200, 100), //v2
                    new THREE.Vector3(100, 0, -100), //v3
                ];

                this.pyramid.vertices = vertices;

                //创建三棱锥的面
                const faces = [
                    new THREE.Face3(0, 1, 2),
                    new THREE.Face3(0, 1, 3),
                    new THREE.Face3(0, 2, 3),
                    new THREE.Face3(1, 2, 3),
                ];

                this.pyramid.faces = faces;

                //生成法向量
                this.pyramid.computeFaceNormals();

                this.updateGroupGeometry(this.threePyramid, (this.pyramid) as any);
                this.updateLines2th((this.pyramid) as any);
            }
            this.updateLines2th(this.pyramid);
        }, 10);

    }

    //设置相机位置
    cameraXYZ (value: number) {
        if (value === 1) {
            for (let k = 0; k < 2; k++) {
                this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
                this.orbit.object.position.set(0, 0, 100);
            }
        }

        if (value === 0) {
            for (let i = 0; i < 2; i++) {
                this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
                this.orbit.object.position.set(-100, 0, 0);
            }
        }

        if (value === -1) {
            for (let i = 0; i < 2; i++) {
                this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
                this.orbit.object.position.set(0, 100, 0);
            }
        }

    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

    reset() {

        clearInterval(this.timer);

        this.threePyramid.visible = false;
        this.threeLine.visible = false;
        this.htext.visible = true;
        this.ftext.position.set(-110, 10, -110);

        this.cubeGeometry = new THREE.Geometry();
        this.updateGroupGeometry(this.cube, (this.cubeGeometry) as any);
        this.updateLines1th((this.cubeGeometry) as any);

        //创建立方体的顶点
        this.vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(-100, -200, 100), //v2
            new THREE.Vector3(100, -200, 100), //v3
            new THREE.Vector3(100, -200, -100), //v4
            new THREE.Vector3(100, 0, -100), //v5
            new THREE.Vector3(-100, 0, -100), //v6
            new THREE.Vector3(-100, -200, -100), //v7

        ];

        this.cubeGeometry.vertices = this.vertices;

        //创建立方的面
        this.faces = [
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
            new THREE.Face3(3, 7, 4)
        ];

        this.cubeGeometry.faces = this.faces;

        //生成法向量
        this.cubeGeometry.computeFaceNormals();

        this.addCubeLine();

        this.pyramid = new THREE.Geometry();
        //创建三棱锥的顶点
        const vertices = [
            new THREE.Vector3(100, 0, 100), //v0
            new THREE.Vector3(-100, 0, 100), //v1
            new THREE.Vector3(100, -200, 100), //v2
            new THREE.Vector3(100, 0, -100), //v3
        ];

        this.pyramid.vertices = vertices;

        //创建三棱锥的面
        const faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(1, 2, 3),
        ];

        this.pyramid.faces = faces;

        //生成法向量
        this.pyramid.computeFaceNormals();

        this.updateGroupGeometry(this.threePyramid, (this.pyramid) as any);
        this.updateLines2th((this.pyramid) as any);


        for (let i = 0; i < 2; i++) {
            this.resetCamera();
        }

    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  -100,  0));
        this.orbit.object.position.set(20,  20,  60);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
