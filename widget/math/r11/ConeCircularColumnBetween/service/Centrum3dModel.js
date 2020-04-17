var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from 'three';
import { LineSegments } from 'three';
import { ThreeBase } from '../../../../src/three/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Centrum3dModel extends ThreeBase {
    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement, fov, width, height, near, far) {
        super();
        this.zhu = false;
        this.zhui = false;
        this.tai = true;
        /* cameraControl: boolean = false;*/
        this.control = false;
        this.render = () => {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        };
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initScene();
            this.initCamera();
            this.getCamera();
            this.initLight();
            this.initWebGLRenderer();
            this.initControl();
            this.initprism();
            this.render();
        });
    }
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
    }
    /**
     * 初始化镜头
     */
    initCamera() {
        const left = this.width / -3;
        const right = this.width / 3;
        const top = this.height / 3;
        const bottom = this.height / -3;
        const near = -600;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(46, 25, 46);
    }
    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }
    //初始化摄像机位置
    resetCamera() {
        /*if(this.cameraPosition != this.cameraPosition)*/
        /*   if (this.cameraControl) {
   
           }*/
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(46, 25, 46);
        this.orbit.reset();
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer() {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        }
        else {
            this.renderer = new THREE.CanvasRenderer();
        }
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    /**
     * 初始化控制器
     */
    initControl() {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
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
        this.orbit.maxPolarAngle = Math.PI; // radians
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }
    /**
     * 初始化光源
     */
    initLight() {
        this.lights = [];
        this.scene.add(new THREE.AmbientLight(0x666666));
        this.lights[0] = new THREE.DirectionalLight(0xdfebff, 1);
        this.lights[0].position.set(50, 200, 100);
        this.lights[0].position.multiplyScalar(1.3);
        this.scene.add(this.lights[0]);
    }
    //获取几何体上底面的面积
    edge(num) {
        this.topnum = num;
        if (num === 1) {
            this.zhui = true;
            this.tai = false;
            this.zhu = false;
            this.toparea = 0;
            this.removeCircle();
            this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        }
        if (num > 1 && num < 200) {
            this.tai = true;
            this.zhui = false;
            this.zhu = false;
            this.toparea = (this.area / 200) * this.topnum;
            this.disposeLine();
            this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        }
        if (num === 200) {
            this.zhu = true;
            this.zhui = false;
            this.tai = false;
            this.toparea = this.area;
            this.disposeLine();
            this.removeCircle();
            this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        }
    }
    //获取底面积滑条修改模型底面积
    areaEvent(num) {
        this.area = num;
        if (this.zhui) {
            this.toparea = 0;
            this.removeCircle();
        }
        if (this.tai) {
            this.toparea = (this.area / 202) * this.topnum;
            this.disposeLine();
        }
        if (this.zhu) {
            this.toparea = this.area;
            this.disposeLine();
        }
        if (this.zhu && num === 200) {
            this.removeCircle();
        }
        this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
    }
    //获取高度滑条数据修改模型高度
    heightEvent(num) {
        if (this.tai) {
            this.modeheight = num;
            this.disposeLine();
            this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        }
        else {
            this.modeheight = num;
            this.updateLines1th((new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum)));
        }
    }
    //初始化几何体
    initprism() {
        this.topnum = 100;
        this.edgenum = 90;
        this.area = 100;
        this.modeheight = 100;
        this.toparea = this.area / 2;
        this.geometry = new THREE.CylinderGeometry(this.toparea, this.area, this.modeheight, this.edgenum);
        this.material = new THREE.MeshBasicMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
        this.cylinder = new THREE.Mesh(this.geometry, this.material);
        this.edges = new THREE.EdgesGeometry(this.geometry, 45);
        this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x4A90E2 }));
        this.cylinder.position.y = this.modeheight / 2;
        this.line.position.y = this.modeheight / 2;
        this.scene.add(this.cylinder);
        this.scene.add(this.line);
    }
    //获取数据重构几何体
    updateGroupGeometry(cylinder, geometry) {
        cylinder.geometry.dispose();
        cylinder.geometry = geometry;
        this.cylinder.position.y = this.modeheight / 2;
    }
    //绘制圆柱及圆台的边框
    createCircleLine() {
        //创建一个圆的模型
        if (this.toparea === 1) {
            this.removeCircle();
        }
        const geometry1 = new THREE.CircleBufferGeometry(this.toparea, this.edgenum);
        const l1 = new THREE.EdgesGeometry(geometry1, 90);
        const line1 = new THREE.LineSegments(l1, new THREE.LineBasicMaterial({ color: 0x4A90E2 }));
        line1.name = 'tempLine';
        line1.position.y = this.modeheight;
        line1.rotateX(Math.PI / 180 * 90);
        this.scene.add(line1);
    }
    removeCircle() {
        this.scene.traverse((child) => {
            if (child instanceof LineSegments && child.name == 'tempLine') {
                this.scene.remove(child);
                child.geometry.dispose();
            }
        });
    }
    disposeLine() {
        //console.log(this.scene.children);
        this.removeCircle();
        //this.scene.remove(this.line1);
        //this.line1.geometry.dispose();
        this.createCircleLine();
    }
    //绘制出几何体边框
    updateLines1th(geometry) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 90);
        this.line.position.y = this.modeheight / 2;
    }
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
//# sourceMappingURL=Centrum3dModel.js.map