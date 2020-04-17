var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16: 52
 */
import * as THREE from 'three';
import { ThreeBase } from '../../../../src/three/ThreeBase';
import { Create3DUtil } from './Create3DUtil';
const OBJLoader = require('three-obj-loader');
const jxg = require('../../../../src/libs/jsxgraphcore.js');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
export class Prism3dModel extends ThreeBase {
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
        this.number = 4;
        this.board = [];
        //非正多边形
        this.polygon = [];
        //四边形
        this.regularpolygon = [];
        //棱锥上底面的宽度
        this.topWidth = 0.01;
        //棱锥下底面的宽度
        this.bottomWidth = 200;
        //棱锥的高度
        this.prismHeight = 200;
        //创建一个点的数组  用于存储棱锥点变化后的坐标
        this.pointArray = [];
        this.value = 0;
        //创建一个点的数组  用于存储底面点变化后的坐标
        this.bottomPoint = [];
        this.ConeLine = [];
        this.create3DUtil = new Create3DUtil();
        this.render = () => {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
            // console.log(this.orbit.object.position.z);
            if (this.orbit.object.position.x < 1.5 && this.orbit.object.position.x > -1.5
                && this.orbit.object.position.y > 55 && this.orbit.object.position.z < 1.5) {
                if (this.circlePlan.visible === false && this.number === 32) {
                    this.circlePlan.visible = true;
                    this.ConeLine[0].visible = false;
                    this.ConeLine[1].visible = false;
                    this.ConeLine[2].visible = false;
                    this.ConeLine[3].visible = false;
                }
                if (this.circlePlan.visible === true && this.number !== 32) {
                    this.circlePlan.visible = false;
                    this.ConeLine[0].visible = true;
                    this.ConeLine[1].visible = true;
                    this.ConeLine[2].visible = true;
                    this.ConeLine[3].visible = true;
                }
            }
            if (this.orbit.object.position.x > 1.5 || this.orbit.object.position.x < -1.5) {
                if (this.circlePlan.visible === true) {
                    this.circlePlan.visible = false;
                    this.ConeLine[0].visible = true;
                    this.ConeLine[1].visible = true;
                    this.ConeLine[2].visible = true;
                    this.ConeLine[3].visible = true;
                }
            }
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
            this.initLight();
            this.initWebGLRenderer();
            this.initControl();
            this.render();
            this.initboard();
            this.drawregularpolygon();
            this.addPyramid();
        });
    }
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        // this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    }
    /**
     * 初始化镜头
     */
    initCamera() {
        const left = this.width / -2;
        const right = this.width / 2;
        const top = this.height / 2;
        const bottom = this.height / -2;
        const near = -500;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 8, 55);
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
        //this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
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
        this.orbit.minPolarAngle = Math.PI * 0 / 180; // radians
        this.orbit.maxPolarAngle = Math.PI * 181 / 180; // radians
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
    //创建坐标系
    initboard() {
        jxg.Options.axis.ticks.majorHeight = 10;
        jxg.Options.axis.ticks.insertTicks = false;
        //1、创建坐标系
        this.board[0] = JXG.JSXGraph.initBoard('box1', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
        this.board[1] = JXG.JSXGraph.initBoard('box2', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
        this.board[2] = JXG.JSXGraph.initBoard('box3', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
        this.board[3] = JXG.JSXGraph.initBoard('box4', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
        this.board[4] = JXG.JSXGraph.initBoard('box5', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
        this.board[5] = JXG.JSXGraph.initBoard('box6', { axis: false,
            renderer: 'canvas',
            keepAspectRatio: false,
            boundingbox: [-5, 5, 5, -5],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            pan: { enabled: false, needTwoFingers: true, needShift: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
    }
    //画底面多边形
    drawregularpolygon() {
        //画正多边形
        this.regularpolygon[0] = this.drawBottomFigure(4);
        this.regularpolygon[1] = this.drawBottomFigure(3);
        this.regularpolygon[2] = this.drawBottomFigure(5);
        this.regularpolygon[3] = this.drawBottomFigure(6);
        this.regularpolygon[4] = this.drawBottomFigure(10);
        //画圆
        this.circle = this.createCircle();
        this.dragCirclePoint(this.circle[0]);
        // 画非正多边形
        this.polygon[0] = this.drawBottomPolygon(4);
        this.polygon[1] = this.drawBottomPolygon(3);
        this.polygon[2] = this.drawBottomPolygon(5);
        this.polygon[3] = this.drawBottomPolygon(6);
        this.polygon[4] = this.drawBottomPolygon(10);
        this.dragEventPoint(this.regularpolygon[0][0]);
        this.dragEventPoint(this.regularpolygon[1][0]);
        this.dragEventPoint(this.regularpolygon[2][0]);
        this.dragEventPoint(this.regularpolygon[3][0]);
        this.dragEventPoint(this.regularpolygon[4][0]);
        this.dragPolygonPoint(this.polygon[0][0]);
        this.dragPolygonPoint(this.polygon[1][0]);
        this.dragPolygonPoint(this.polygon[2][0]);
        this.dragPolygonPoint(this.polygon[3][0]);
        this.dragPolygonPoint(this.polygon[4][0]);
        this.pointArray = this.pointXY(4);
        this.bottomPoint = this.pointXY(4);
    }
    // 判断时正多边形还是非正多边形
    judge(value, sliderNum) {
        let newvalue;
        if (sliderNum === 4) {
            newvalue = 0;
        }
        if (sliderNum === 3) {
            newvalue = 1;
        }
        if (sliderNum === 5) {
            newvalue = 2;
        }
        if (sliderNum === 6) {
            newvalue = 3;
        }
        if (sliderNum === 10) {
            newvalue = 4;
        }
        if (sliderNum !== '+∞') {
            if (value === -1) {
                const pointXY = this.pointXY(this.regularpolygon[newvalue][0].length);
                // 隐藏正多边形
                // 隐藏多边形
                this.regularpolygon[newvalue][1].setAttribute({ visible: false });
                for (let i = 0; i < this.regularpolygon[newvalue][0].length; i++) {
                    // 隐藏点
                    this.regularpolygon[newvalue][0][i].setAttribute({ visible: false });
                    this.regularpolygon[newvalue][0][i].moveTo([pointXY[i][0], pointXY[i][1]]);
                }
                for (let j = 0; j < this.regularpolygon[newvalue][1].borders.length; j++) {
                    // 隐藏边框
                    this.regularpolygon[newvalue][1].borders[j].setAttribute({ visible: false });
                }
                // 显示非正多边形
                this.polygon[newvalue][1].setAttribute({ visible: true });
                for (let k = 0; k < this.polygon[newvalue][0].length; k++) {
                    // 显示非正多边形的点
                    this.polygon[newvalue][0][k].setAttribute({ visible: true });
                    this.polygon[newvalue][0][k].moveTo([this.bottomPoint[k][0], this.bottomPoint[k][1]]);
                }
                for (let j = 0; j < this.polygon[newvalue][1].borders.length; j++) {
                    //显示非正多边形的边框
                    this.polygon[newvalue][1].borders[j].setAttribute({ visible: true });
                }
            }
            if (value === 1) {
                const pointXY = this.pointXY(this.polygon[newvalue][0].length);
                // 隐藏非正多边形
                this.polygon[newvalue][1].setAttribute({ visible: false });
                for (let k = 0; k < this.polygon[newvalue][0].length; k++) {
                    this.polygon[newvalue][0][k].setAttribute({ visible: false });
                    this.polygon[newvalue][0][k].moveTo([pointXY[k][0], pointXY[k][1]]);
                }
                for (let j = 0; j < this.polygon[newvalue][1].borders.length; j++) {
                    this.polygon[newvalue][1].borders[j].setAttribute({ visible: false });
                }
                // 显示正多边形
                this.regularpolygon[newvalue][1].setAttribute({ visible: true });
                for (let i = 0; i < this.regularpolygon[newvalue][0].length; i++) {
                    this.regularpolygon[newvalue][0][i].setAttribute({ visible: true });
                    this.regularpolygon[newvalue][0][i].moveTo([pointXY[i][0], pointXY[i][1]]);
                    this.bottomPoint[i] = [this.regularpolygon[newvalue][0][i].X(), this.regularpolygon[newvalue][0][i].Y()];
                }
                for (let j = 0; j < this.regularpolygon[newvalue][1].borders.length; j++) {
                    this.regularpolygon[newvalue][1].borders[j].setAttribute({ visible: true });
                }
                // 更新点的位置
                this.pointArray = [];
                this.pointArray = this.pointXY(this.polygon[newvalue][0].length);
                // 更新3d模型
                this.pyramid.geometry.dispose();
                this.pyramid.geometry = this.create3DUtil.addPyramid(pointXY, this.prismHeight);
                this.deleteLine(this.obj[0]);
                this.deleteLine(this.obj[1]);
                this.scene.remove(this.obj[0]);
                this.scene.remove(this.obj[1]);
                this.obj = this.create3DUtil.createLine2(pointXY, this.prismHeight, '棱锥');
                this.scene.add(this.obj[0]);
                this.scene.add(this.obj[1]);
            }
        }
    }
    //画圆
    createCircle() {
        const line = this.board[5].create('line', [[0 / 3, -2 / 3], [0, -2 * 2.2]], { straightFirst: false, straightLast: false, fixed: true, visible: false, highlight: false });
        const point = this.board[5].create('glider', [0, -2, line], { name: '', size: 4, showInfobox: false,
            face: 'o', strokeColor: '#4A90E2', fillColor: '#4A90E2', highlight: false, visible: true });
        const circle = this.board[5].create('circle', [[0, 0], point], { strokeColor: '#4A90E2', strokeOpacity: 1,
            fillColor: '#4A90E2', fillOpacity: 0.2, highlight: false, visible: true, fixed: true });
        const group = [];
        group[0] = point;
        group[1] = circle;
        return group;
    }
    //画底面正多边形 需要传入顶点的数量
    drawBottomFigure(value) {
        let newvalue;
        if (value === 4) {
            newvalue = 0;
        }
        if (value === 3) {
            newvalue = 1;
        }
        if (value === 5) {
            newvalue = 2;
        }
        if (value === 6) {
            newvalue = 3;
        }
        if (value === 10) {
            newvalue = 4;
        }
        //初始角度为0，循环后每次加2 * Math.PI / value;
        let angle = -Math.PI / 2;
        //点的数组
        const pointArray = [];
        //线的数组
        let x = 0;
        let y = -2;
        let line;
        for (let i = 0; i < value; i++) {
            x = 2 * Math.cos(angle);
            y = 2 * Math.sin(angle);
            line = this.board[newvalue].create('line', [[x * 0.75, y * 0.75], [x * 2.2, y * 2.2]], { straightFirst: false, straightLast: false, fixed: true, visible: false, highlight: false });
            pointArray[i] = this.board[newvalue].create('glider', [x, y, line], { name: '', size: 4, showInfobox: false,
                face: 'o', strokeColor: '#4A90E2', fillColor: '#4A90E2', highlight: false, visible: true });
            angle = angle + 2 * Math.PI / value;
        }
        const regularpolygon = this.board[newvalue].create('polygon', pointArray, { strokeColor: '#4A90E2',
            fillColor: '#4A90E2', fillOpacity: 0.2, highlight: false, visible: true, fixed: true });
        for (let k = 0; k < regularpolygon.borders.length; k++) {
            regularpolygon.borders[k].setAttribute({ fixed: true, highlight: false });
        }
        const group = [];
        group[0] = pointArray;
        group[1] = regularpolygon;
        return group;
    }
    //画底面非正多边形 需要传入顶点的数量
    drawBottomPolygon(value) {
        let newvalue;
        if (value === 4) {
            newvalue = 0;
        }
        if (value === 3) {
            newvalue = 1;
        }
        if (value === 5) {
            newvalue = 2;
        }
        if (value === 6) {
            newvalue = 3;
        }
        if (value === 10) {
            newvalue = 4;
        }
        //初始角度为0，循环后每次加2 * Math.PI / value;
        let angle = -Math.PI / 2;
        //点的数组
        const pointArray = [];
        let x = 0;
        let y = -2;
        let line;
        for (let i = 0; i < value; i++) {
            x = 2 * Math.cos(angle);
            y = 2 * Math.sin(angle);
            line = this.board[newvalue].create('line', [[x * 0.75, y * 0.75], [x * 2.2, y * 2.2]], { straightFirst: false, straightLast: false, fixed: true, visible: false, highlight: false });
            pointArray[i] = this.board[newvalue].create('glider', [x, y, line], { name: '', size: 4, showInfobox: false,
                face: 'o', strokeColor: '#4A90E2', fillColor: '#4A90E2', highlight: false, visible: false });
            angle = angle + 2 * Math.PI / value;
        }
        const regularpolygon = this.board[newvalue].create('polygon', pointArray, { strokeColor: '#4A90E2', fillColor: '#4A90E2', fillOpacity: 0.2, highlight: false, visible: false, fixed: true });
        for (let k = 0; k < regularpolygon.borders.length; k++) {
            regularpolygon.borders[k].setAttribute({ fixed: true, highlight: false });
        }
        const group = [];
        group[0] = pointArray;
        group[1] = regularpolygon;
        return group;
    }
    // 画3d模型
    addPyramid() {
        const pointXY = this.pointXY(4);
        const geometry = this.create3DUtil.addPyramid(pointXY, this.prismHeight);
        // const material = new THREE.MeshBasicMaterial( {color:  0x4A90E2, side:  THREE.DoubleSide, transparent: true, opacity: 0.2} );
        const material = new THREE.MeshBasicMaterial({ color: '#CFEAF8', side: THREE.DoubleSide });
        this.pyramid = new THREE.Mesh(geometry, material);
        this.scene.add(this.pyramid);
        this.obj = this.create3DUtil.createLine2(pointXY, this.prismHeight, '棱锥');
        this.scene.add(this.obj[0]);
        this.scene.add(this.obj[1]);
        const circle = new THREE.CylinderGeometry(2, 2, 1, 32);
        const circlematerial = new THREE.LineDashedMaterial({
            color: '#4A90E2',
            opacity: 0.8,
            dashSize: 10,
            gapSize: 10,
            depthTest: false
        });
        this.circlePlan = new THREE.Mesh(circle, circlematerial);
        this.scene.add(this.circlePlan);
        this.circlePlan.visible = false;
    }
    // 边数滑块控制3d模型 传入边数
    dragChangePyramid(value) {
        this.bottomWidth = 200;
        if (value === '+∞') {
            //边数无穷大时   给32个边假装是一个圆
            this.number = 32;
            this.pyramid.geometry.dispose();
            this.pyramid.geometry = new THREE.CylinderGeometry(this.topWidth, this.bottomWidth, this.prismHeight, this.number);
            for (let i = 0; i < this.pyramid.geometry.vertices.length; i++) {
                this.pyramid.geometry.vertices[i].y = this.pyramid.geometry.vertices[i].y + (this.prismHeight - 200) * 0.5;
            }
            this.deleteLine(this.obj[0]);
            this.deleteLine(this.obj[1]);
            this.scene.remove(this.obj[0]);
            this.scene.remove(this.obj[1]);
            this.obj = this.create3DUtil.createLine3(this.topWidth, this.bottomWidth, '#4A90E2', this.prismHeight - 99.3, -100);
            this.scene.add(this.obj[0]);
            this.scene.add(this.obj[1]);
            // 画圆锥的侧面线
            const vertices1 = [this.pyramid.geometry.vertices[8], this.pyramid.geometry.vertices[40]];
            this.ConeLine[0] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 3);
            this.ConeLine[1] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 2);
            const vertices2 = [this.pyramid.geometry.vertices[24], this.pyramid.geometry.vertices[56]];
            this.ConeLine[2] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 3);
            this.ConeLine[3] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 2);
            this.scene.add(this.ConeLine[0]);
            this.scene.add(this.ConeLine[1]);
            this.scene.add(this.ConeLine[2]);
            this.scene.add(this.ConeLine[3]);
        }
        else {
            this.number = value;
            this.bottomPoint = [];
            this.pointArray = [];
            const pointXY = this.pointXY(value);
            this.bottomPoint = this.pointXY(value);
            this.pointArray = this.pointXY(value);
            this.pyramid.geometry.dispose();
            this.pyramid.geometry = this.create3DUtil.addPyramid(pointXY, this.prismHeight);
            this.deleteLine(this.obj[0]);
            this.deleteLine(this.obj[1]);
            this.scene.remove(this.obj[0]);
            this.scene.remove(this.obj[1]);
            this.obj = this.create3DUtil.createLine2(pointXY, this.prismHeight, '棱锥');
            this.scene.add(this.obj[0]);
            this.scene.add(this.obj[1]);
            // 不是圆锥时删除侧面线
            this.scene.remove(this.ConeLine[0]);
            this.scene.remove(this.ConeLine[1]);
            this.scene.remove(this.ConeLine[2]);
            this.scene.remove(this.ConeLine[3]);
        }
    }
    //边数滑块控制底面图形
    dragPolygon(value) {
        if (this.circle[0].Y() !== -2) {
            this.circle[0].moveTo([0, -2]);
        }
        for (let j = 0; j < this.regularpolygon.length; j++) {
            if (this.regularpolygon[j][0][0].Y() !== -2) {
                const pointXY = this.pointXY(this.regularpolygon[j][0].length);
                for (let i = 0; i < this.regularpolygon[j][0].length; i++) {
                    this.regularpolygon[j][0][i].moveTo([pointXY[i][0], pointXY[i][1]]);
                }
            }
        }
        for (let n = 0; n < this.polygon.length; n++) {
            if (this.polygon[n][1].getAttribute('visible') === true) {
                const pointXY = this.pointXY(this.polygon[n][0].length);
                // 隐藏非正多边形
                this.polygon[n][1].setAttribute({ visible: false });
                for (let k = 0; k < this.polygon[n][0].length; k++) {
                    this.polygon[n][0][k].setAttribute({ visible: false });
                    this.polygon[n][0][k].moveTo([pointXY[k][0], pointXY[k][1]]);
                }
                for (let j = 0; j < this.polygon[n][1].borders.length; j++) {
                    this.polygon[n][1].borders[j].setAttribute({ visible: false });
                }
                // 显示正多边形
                this.regularpolygon[n][1].setAttribute({ visible: true });
                for (let i = 0; i < this.regularpolygon[n][0].length; i++) {
                    this.regularpolygon[n][0][i].setAttribute({ visible: true });
                }
                for (let j = 0; j < this.regularpolygon[n][1].borders.length; j++) {
                    this.regularpolygon[n][1].borders[j].setAttribute({ visible: true });
                }
            }
        }
        // this.startBottomPoint(value);
    }
    //滑块高度拖动事件 传入高度和边数
    dragEventHeight(height, value) {
        this.prismHeight = height * 2;
        if (value === '+∞') {
            this.number = 32;
            this.pyramid.geometry.dispose();
            this.pyramid.geometry = new THREE.CylinderGeometry(this.topWidth, this.bottomWidth, this.prismHeight, this.number);
            for (let i = 0; i < this.pyramid.geometry.vertices.length; i++) {
                this.pyramid.geometry.vertices[i].y = this.pyramid.geometry.vertices[i].y + (this.prismHeight - 200) * 0.5;
            }
            this.deleteLine(this.obj[0]);
            this.deleteLine(this.obj[1]);
            this.scene.remove(this.obj[0]);
            this.scene.remove(this.obj[1]);
            this.obj = this.create3DUtil.createLine3(this.topWidth, this.bottomWidth, '#4A90E2', this.prismHeight - 99.3, -100);
            this.scene.add(this.obj[0]);
            this.scene.add(this.obj[1]);
            // 高度变化重新绘制侧面线
            this.scene.remove(this.ConeLine[0]);
            this.scene.remove(this.ConeLine[1]);
            this.scene.remove(this.ConeLine[2]);
            this.scene.remove(this.ConeLine[3]);
            this.ConeLine = [];
            // 画圆锥的侧面线
            const vertices1 = [this.pyramid.geometry.vertices[8], this.pyramid.geometry.vertices[40]];
            this.ConeLine[0] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 3);
            this.ConeLine[1] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 2);
            const vertices2 = [this.pyramid.geometry.vertices[24], this.pyramid.geometry.vertices[56]];
            this.ConeLine[2] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 3);
            this.ConeLine[3] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 2);
            this.scene.add(this.ConeLine[0]);
            this.scene.add(this.ConeLine[1]);
            this.scene.add(this.ConeLine[2]);
            this.scene.add(this.ConeLine[3]);
            if (this.orbit.object.position.x < 1.5 && this.orbit.object.position.x > -1.5
                && this.orbit.object.position.y > 55 && this.orbit.object.position.z < 1.5) {
                this.ConeLine[0].visible = false;
                this.ConeLine[1].visible = false;
                this.ConeLine[2].visible = false;
                this.ConeLine[3].visible = false;
            }
        }
        else {
            this.pyramid.geometry.dispose();
            this.pyramid.geometry = this.create3DUtil.addPyramid(this.pointArray, this.prismHeight);
            this.deleteLine(this.obj[0]);
            this.deleteLine(this.obj[1]);
            this.scene.remove(this.obj[0]);
            this.scene.remove(this.obj[1]);
            this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
            this.scene.add(this.obj[0]);
            this.scene.add(this.obj[1]);
        }
    }
    //保存所有顶点初始的坐标
    pointXY(value) {
        //初始角度为0，循环后每次加2 * Math.PI / value;
        let angle = -Math.PI / 2;
        //点的数组
        const pointArray = [];
        let x = 0;
        let y = -2;
        for (let i = 0; i < value; i++) {
            x = 2 * Math.cos(angle);
            y = 2 * Math.sin(angle);
            pointArray[i] = [x, y];
            angle = angle + 2 * Math.PI / value;
        }
        return pointArray;
    }
    // 给正多边形每个顶点绑定拖动事件,需要传入顶点数组
    dragEventPoint(point) {
        let startX;
        let startY;
        let pointX;
        let pointY;
        let endX;
        let endY;
        //移动的距离是原来的倍数
        let zoom;
        let buttonZoom;
        let regularpolygonPoint = [];
        for (let i = 0; i < point.length; i++) {
            point[i].on('touchdown', () => {
                //鼠标按下获取点的坐标作为起点
                startX = point[i].X();
                startY = point[i].Y();
                pointX = point[i].X();
                pointY = point[i].Y();
                zoom = 1;
                buttonZoom = 1;
            });
            point[i].on('mousedown', () => {
                //鼠标按下获取点的坐标作为起点
                startX = point[i].X();
                startY = point[i].Y();
                pointX = point[i].X();
                pointY = point[i].Y();
                zoom = 1;
                buttonZoom = 1;
            });
            point[i].on('drag', () => {
                this.value = 1;
                endX = point[i].X();
                endY = point[i].Y();
                if (endX > 4.4) {
                    endX = 4.4;
                }
                else if (endX < -4.4) {
                    endX = -4.4;
                }
                if (endY > 4.4) {
                    endY = 4.4;
                }
                else if (endY < -4.4) {
                    endY = -4.4;
                }
                //判断放大倍数
                if (point[i].X().toLocaleString() == 0) {
                    startY = startY === 0 ? 1.5 : startY;
                    buttonZoom = endY / startY;
                }
                else {
                    startX = startX === 0 ? 1.5 : startX;
                    buttonZoom = endX / startX;
                }
                buttonZoom = Math.abs(buttonZoom);
                if (buttonZoom > 2.2) {
                    buttonZoom = 2.2;
                }
                //移动其他所有的点
                for (let j = 0; j < point.length; j++) {
                    if (j !== i) {
                        point[j].moveTo([point[j].X() * buttonZoom, point[j].Y() * buttonZoom]);
                    }
                }
                startX = endX;
                startY = endY;
                regularpolygonPoint = this.regularpolygonPoint(point[0].X(), point[0].Y(), point.length);
                for (let n = 0; n < point.length; n++) {
                    point[n].moveTo([regularpolygonPoint[n][0], regularpolygonPoint[n][1]]);
                    this.bottomPoint[n] = [point[n].X(), point[n].Y()];
                }
            });
            point[i].on('touchup', () => {
                this.pointArray = [];
                for (let k = 0; k < point.length; k++) {
                    this.pointArray[k] = [point[k].X(), point[k].Y()];
                }
                this.pyramid.geometry.dispose();
                this.pyramid.geometry = this.create3DUtil.addPyramid(this.pointArray, this.prismHeight);
                this.deleteLine(this.obj[0]);
                this.deleteLine(this.obj[1]);
                this.scene.remove(this.obj[0]);
                this.scene.remove(this.obj[1]);
                this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
                this.scene.add(this.obj[0]);
                this.scene.add(this.obj[1]);
            });
            point[i].on('mouseup', () => {
                this.pointArray = [];
                for (let k = 0; k < point.length; k++) {
                    this.pointArray[k] = [point[k].X(), point[k].Y()];
                }
                this.pyramid.geometry.dispose();
                this.pyramid.geometry = this.create3DUtil.addPyramid(this.pointArray, this.prismHeight);
                this.deleteLine(this.obj[0]);
                this.deleteLine(this.obj[1]);
                this.scene.remove(this.obj[0]);
                this.scene.remove(this.obj[1]);
                this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
                this.scene.add(this.obj[0]);
                this.scene.add(this.obj[1]);
            });
        }
    }
    // 给非正多边形每个顶点绑定拖动事件,需要传入顶点数组
    dragPolygonPoint(point) {
        for (let i = 0; i < point.length; i++) {
            point[i].on('touchup', () => {
                this.pointArray = [];
                for (let k = 0; k < point.length; k++) {
                    this.pointArray[k] = [point[k].X(), point[k].Y()];
                }
                this.pyramid.geometry.dispose();
                this.pyramid.geometry = this.create3DUtil.addPyramid(this.pointArray, this.prismHeight);
                this.deleteLine(this.obj[0]);
                this.deleteLine(this.obj[1]);
                this.scene.remove(this.obj[0]);
                this.scene.remove(this.obj[1]);
                this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
                this.scene.add(this.obj[0]);
                this.scene.add(this.obj[1]);
            });
            point[i].on('mouseup', () => {
                this.pointArray = [];
                for (let k = 0; k < point.length; k++) {
                    this.pointArray[k] = [point[k].X(), point[k].Y()];
                }
                this.pyramid.geometry.dispose();
                this.pyramid.geometry = this.create3DUtil.addPyramid(this.pointArray, this.prismHeight);
                this.deleteLine(this.obj[0]);
                this.deleteLine(this.obj[1]);
                this.scene.remove(this.obj[0]);
                this.scene.remove(this.obj[1]);
                this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
                this.scene.add(this.obj[0]);
                this.scene.add(this.obj[1]);
            });
        }
    }
    //给圆上的点绑定拖动事件
    dragCirclePoint(point) {
        let startX;
        let startY;
        let endX;
        let endY;
        //移动的距离是原来的倍数
        let zoom = 1;
        point.on('touchdown', () => {
            //鼠标按下获取点的坐标作为起点
            startX = point.X().toLocaleString();
            startY = point.Y().toLocaleString();
            zoom = 1;
        });
        point.on('mousedown', () => {
            //鼠标按下获取点的坐标作为起点
            startX = point.X().toLocaleString();
            startY = point.Y().toLocaleString();
            zoom = 1;
        });
        point.on('drag', () => {
            this.value = 1;
            endX = point.X();
            endY = point.Y();
            //判断放大倍数
            if (point.X().toLocaleString() == 0) {
                zoom = endY / startY;
                this.bottomWidth = Math.abs(endY * 100);
            }
            else {
                zoom = endX / startX;
                this.bottomWidth = Math.abs(endX * 100);
            }
        });
        point.on('touchup', () => {
            if (zoom !== 1) {
                for (let i = 0; i < 64; i++) {
                    //放大棱锥的每个顶点的x坐标和z坐标
                    this.pyramid.geometry.vertices[i].x = this.pyramid.geometry.vertices[i].x * zoom;
                    this.pyramid.geometry.vertices[i].z = this.pyramid.geometry.vertices[i].z * zoom;
                    this.pyramid.geometry.verticesNeedUpdate = true;
                    this.deleteLine(this.obj[0]);
                    this.deleteLine(this.obj[1]);
                    this.scene.remove(this.obj[0]);
                    this.scene.remove(this.obj[1]);
                    this.obj = this.create3DUtil.createLine3(this.topWidth, this.bottomWidth, '#4A90E2', this.prismHeight - 99.3, -100);
                    this.scene.add(this.obj[0]);
                    this.scene.add(this.obj[1]);
                }
                // 高度变化重新绘制侧面线
                this.scene.remove(this.ConeLine[0]);
                this.scene.remove(this.ConeLine[1]);
                this.scene.remove(this.ConeLine[2]);
                this.scene.remove(this.ConeLine[3]);
                // 画圆锥的侧面线
                const vertices1 = [this.pyramid.geometry.vertices[8], this.pyramid.geometry.vertices[40]];
                this.ConeLine[0] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 3);
                this.ConeLine[1] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 2);
                const vertices2 = [this.pyramid.geometry.vertices[24], this.pyramid.geometry.vertices[56]];
                this.ConeLine[2] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 3);
                this.ConeLine[3] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 2);
                this.scene.add(this.ConeLine[0]);
                this.scene.add(this.ConeLine[1]);
                this.scene.add(this.ConeLine[2]);
                this.scene.add(this.ConeLine[3]);
                if (this.orbit.object.position.x < 1.5 && this.orbit.object.position.x > -1.5
                    && this.orbit.object.position.y > 55 && this.orbit.object.position.z < 1.5) {
                    this.ConeLine[0].visible = false;
                    this.ConeLine[1].visible = false;
                    this.ConeLine[2].visible = false;
                    this.ConeLine[3].visible = false;
                }
            }
        });
        point.on('mouseup', () => {
            if (zoom !== 1) {
                for (let i = 0; i < 64; i++) {
                    //放大棱锥的每个顶点的x坐标和z坐标
                    this.pyramid.geometry.vertices[i].x = this.pyramid.geometry.vertices[i].x * zoom;
                    this.pyramid.geometry.vertices[i].z = this.pyramid.geometry.vertices[i].z * zoom;
                    this.pyramid.geometry.verticesNeedUpdate = true;
                    this.deleteLine(this.obj[0]);
                    this.deleteLine(this.obj[1]);
                    this.scene.remove(this.obj[0]);
                    this.scene.remove(this.obj[1]);
                    this.obj = this.create3DUtil.createLine3(this.topWidth, this.bottomWidth, '#4A90E2', this.prismHeight - 99.3, -100);
                    this.scene.add(this.obj[0]);
                    this.scene.add(this.obj[1]);
                }
                // 高度变化重新绘制侧面线
                this.scene.remove(this.ConeLine[0]);
                this.scene.remove(this.ConeLine[1]);
                this.scene.remove(this.ConeLine[2]);
                this.scene.remove(this.ConeLine[3]);
                // 画圆锥的侧面线
                const vertices1 = [this.pyramid.geometry.vertices[8], this.pyramid.geometry.vertices[40]];
                this.ConeLine[0] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 3);
                this.ConeLine[1] = this.create3DUtil.createLineMesh(vertices1, '#4A90E2', 2);
                const vertices2 = [this.pyramid.geometry.vertices[24], this.pyramid.geometry.vertices[56]];
                this.ConeLine[2] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 3);
                this.ConeLine[3] = this.create3DUtil.createLineMesh(vertices2, '#4A90E2', 2);
                this.scene.add(this.ConeLine[0]);
                this.scene.add(this.ConeLine[1]);
                this.scene.add(this.ConeLine[2]);
                this.scene.add(this.ConeLine[3]);
                if (this.orbit.object.position.x < 1.5 && this.orbit.object.position.x > -1.5
                    && this.orbit.object.position.y > 55 && this.orbit.object.position.z < 1.5) {
                    this.ConeLine[0].visible = false;
                    this.ConeLine[1].visible = false;
                    this.ConeLine[2].visible = false;
                    this.ConeLine[3].visible = false;
                }
            }
        });
    }
    // 正多边形底面拖动结束后 矫正所有的点的位置
    regularpolygonPoint(pointx, pointy, value) {
        let x = pointx;
        let y = pointy;
        const r = Math.sqrt(x * x + y * y);
        //初始角度为0，循环后每次加2 * Math.PI / value;
        let angle;
        if (pointx >= 0) {
            angle = Math.asin(y / Math.sqrt(x * x + y * y));
        }
        else {
            angle = Math.acos(x / Math.sqrt(x * x + y * y));
        }
        //点的数组
        const pointArray = [];
        for (let i = 0; i < value; i++) {
            x = r * Math.cos(angle);
            y = r * Math.sin(angle);
            pointArray[i] = [x, y];
            angle = angle + 2 * Math.PI / value;
        }
        return pointArray;
    }
    // 清空线的模型的方法
    deleteLine(obj) {
        for (let i = 0; i < obj.children.length; i++) {
            obj.children[i].geometry.dispose();
        }
    }
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    reset(sliderNum) {
        //棱锥下底面的宽度
        this.bottomWidth = 200;
        //棱锥的高度
        this.prismHeight = 200;
        this.pointArray = [];
        this.bottomPoint = [];
        this.pointArray = this.pointXY(4);
        this.bottomPoint = this.pointXY(4);
        // 隐藏圆锥顶点
        this.circlePlan.visible = false;
        // 不是圆锥时删除侧面线
        this.scene.remove(this.ConeLine[0]);
        this.scene.remove(this.ConeLine[1]);
        this.scene.remove(this.ConeLine[2]);
        this.scene.remove(this.ConeLine[3]);
        if (sliderNum === 4) {
            const pointXY = this.pointXY(4);
            for (let i = 0; i < this.regularpolygon[0][0].length; i++) {
                this.regularpolygon[0][0][i].moveTo([pointXY[i][0], pointXY[i][1]]);
            }
            this.pyramid.geometry.dispose();
            this.pyramid.geometry = this.create3DUtil.addPyramid(pointXY, this.prismHeight);
            this.deleteLine(this.obj[0]);
            this.deleteLine(this.obj[1]);
            this.scene.remove(this.obj[0]);
            this.scene.remove(this.obj[1]);
            this.obj = this.create3DUtil.createLine2(this.pointArray, this.prismHeight, '棱锥');
            this.scene.add(this.obj[0]);
            this.scene.add(this.obj[1]);
        }
        this.resetCamera();
    }
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(0, 40, 55);
        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
}
//# sourceMappingURL=Prism3dModel.js.map