import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';
import * as huadongdian from '../sub_static/huadong.png';
import * as tuodongdian from '../sub_static/tuodong.png';
import {MathHelper} from '../../../../../src/util/MathHelper';

export class Zxyty3dModel extends ThreeBase {


    planeMesh: Mesh;
    private controls: any;
    private sliderControlLine: any;
    private rotatePoint: THREE.Mesh;
    private slope: number;
    private intersection1: THREE.Mesh;
    private intersection2: THREE.Mesh;
    private formulaText: any;
    private delta: number;
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

    static loadImg() {
        const imgArray = [huadongdian, tuodongdian];
        console.log(imgArray);
    }

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render( this.scene,  this.camera );
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        //绘制椭圆的方法
        this.drawHyperbola();
        //创建旋转线的方法
        this.createRotateLine();
        //创建点的方法
        this.createIntersection();
        //计算交点坐标移动点的方法
        this.drawingIntersections();
        //创建文字的方法
        this.createPointText();
        //给直线设置事件回调
        this.setMoveEvent();
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
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  270);
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
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建坐标轴
    createAxis() {
        this.scene.add(AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any));
    }

    //计算坐标绘制椭圆
    drawHyperbola() {
        const hyperbolaX = [];
        const hyperbolaY = [];
        const points = [];
        const group = new THREE.Group();
        const scale = 10;
        let i: number;
        let j: number;
        const a = 9;
        const b = 16;
        for (i = -6; i <= 6; i += 0.01) {
            hyperbolaX.push(i);
            hyperbolaY.push(Math.sqrt(11 - (11 * Math.pow(i, 2) / 36)));
        }

        for (j = 0; j < hyperbolaX.length; j++) {
            points.push(new THREE.Vector3(hyperbolaX[j] * scale, hyperbolaY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(points, 0.5, points.length * 2, '#000000');
        const curve1 = curve.clone();
        curve.rotateX(Math.PI);
        group.add(curve);
        group.add(curve1);
        const group1 = group.clone();
        group1.rotateZ(Math.PI);
        this.scene.add(group);
        this.scene.add(group1);
    }

    createRotateLine() {
        const width = 12.6;
        const height = 12.6;
        const line = ThreeUtil.createLine(1, 800, '#EC5D57');
        const huadong = ThreeUtil.createImg(width, height, huadongdian, 0, 0, 0);
        const huadong1 = ThreeUtil.createImg(150, 150, huadongdian, 0, 90, 0);
        (huadong1.material as any).opacity = 0;
        huadong.rotateZ(Math.PI / 2);
        line.rotateZ(-30 * Math.PI / 180);
        this.rotatePoint = ThreeUtil.createImg(width, height, tuodongdian, 0, 0, 0);
        huadong1.add(huadong);
        line.add(huadong1);
        this.rotatePoint.add(line);
        //用此方法前先导入事件包
        this.sliderControlLine = new SliderControlLine(line, huadong1, this.rotatePoint, huadong);
        this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
        this.formulaText = ThreeUtil.createNewRomanText(' ' , 50, 90, 0, '#000000', 0.15);
        this.rotatePoint.add(this.formulaText);
        this.scene.add(this.rotatePoint);
    }

    //判断直线与椭圆的交点情况并绘制交点
    drawingIntersections() {
        //斜率
        const scale = 10;
        const tiltAngle = MathHelper.getTiltAngle( 60 * Math.PI / 180, this.sliderControlLine.angle);
        this.slope = (tiltAngle <= 90.5 * Math.PI / 180 && tiltAngle >= 89.5 * Math.PI / 180) ? undefined
            : MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, this.sliderControlLine.angle)));
        const slope = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, this.sliderControlLine.angle)));
        //截距
        const intercept = MathHelper.getIntercept(slope, this.rotatePoint.position.x / scale, this.rotatePoint.position.y / scale);

        const a = 11 + (36 * Math.pow(slope, 2));

        const b = 72 * slope * intercept;

        const c = 36 * Math.pow(intercept, 2) - 396;

        const delta = MathHelper.getDeltaNumber(a, b, c);

        let result: any;
        let y1: number;
        let y2: number;
        //K存在的情况 判断Δ
        if (this.slope) {
            this.resetFormulaText(slope,  intercept, 1);
            if (delta > 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = slope * result.x1 + intercept;
                y2 = slope * result.x2 + intercept;
                if (new THREE.Vector3(result.x1, y1, 0).distanceTo(new THREE.Vector3(result.x2, y2, 0)) < 1) {
                    this.setText('存在', 'Δ = 0', '相切', '一个');
                    this.setIntersection(1, (result.x1 + result.x2) / 2 * scale, (y1 + y2) / 2 * scale, 0, 0, 0);
                } else {
                    this.setText('存在', 'Δ > 0', '相交', '两个');
                    this.setIntersection(1, result.x1 * scale, y1 * scale, 1, result.x2 * scale, y2 * scale);
                }
            } else if (delta === 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = slope * result.x1 + intercept;
                y2 = slope * result.x2 + intercept;
                this.setText('存在', 'Δ = 0', '相切', '一个');
                this.setIntersection(1, result.x1 * scale, y1 * scale, 1, result.x2 * scale, y2 * scale);
            } else {
                this.setText('存在', 'Δ < 0', '相离', '零个');
                this.setIntersection(0, 0, 0, 0, 0, 0);
            }
        } else {
            this.formulaText.text = 'l: x = ' + (this.rotatePoint.position.x / scale).toFixed(2);
            if (this.rotatePoint.position.x < 60.5 && this.rotatePoint.position.x > 59.5) {
                this.setText('不存在', 'Δ = 0', '相切', '一个');
                this.setIntersection(1, 60, 0 , 0, 0, 0);
            } else if (this.rotatePoint.position.x < -59.5 && this.rotatePoint.position.x > - 60.5) {
                this.setText('不存在', 'Δ = 0', '相切', '一个');
                this.setIntersection(1, -60, 0 , 0, 0, 0);
            } else if (this.rotatePoint.position.x >= -60 && this.rotatePoint.position.x <= 60) {
                this.setText('不存在', 'Δ > 0', '相交', '两个');
                y1 = Math.sqrt(11 - (11 * Math.pow(this.rotatePoint.position.x / scale, 2)) / 36);
                y2 = -Math.sqrt(11 - (11 * Math.pow(this.rotatePoint.position.x / scale, 2)) / 36);
                this.setIntersection(1, this.rotatePoint.position.x, y1 * scale , 1, this.rotatePoint.position.x, y2 * scale);
            } else {
                this.setText('不存在', 'Δ < 0', '相离', '零个');
                this.setIntersection(0, 0, 0 , 0, 0, 0);
            }
        }
    }

    //设置表格文字的方法
    setText(slope: string, deleta: string, position: string, intersection: string) {
        (window as any).viewHandler.viewModel.$data.slope = slope;
        (window as any).viewHandler.viewModel.$data.delta = deleta;
        (window as any).viewHandler.viewModel.$data.position = position;
        (window as any).viewHandler.viewModel.$data.intersection = intersection;
    }

    //创建交点
    createIntersection() {
        const color = '#0199ff';
        this.intersection1 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        this.intersection2 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        const point = ThreeUtil.createPoint(1.5, color, 50, 0, 1);
        const point1 = ThreeUtil.createPoint(1.5, color, -50, 0, 1);
        this.scene.add(this.intersection1);
        this.scene.add(this.intersection2);
        this.intersection1.position.z = 1;
        this.intersection2.position.z = 1;
        this.scene.add(point);
        this.scene.add(point1);
    }

    //设置交点状态
    setIntersection(opacity: number, intersectionX: number, intersectionY: number,
                    opacity2: number, intersectionX2: number, intersectionY2: number) {
        (this.intersection1.material as any).opacity = opacity;
        this.intersection1.position.x = intersectionX;
        this.intersection1.position.y = intersectionY;

        (this.intersection2.material as any).opacity = opacity2;
        this.intersection2.position.x = intersectionX2;
        this.intersection2.position.y = intersectionY2;
    }

    //创建F点坐标文字的方法
    createPointText() {
        const f2 = ThreeUtil.createNewRomanText('F₂', 35, 10, 0, '#000000', 0.15);
        const coordinate1 = ThreeUtil.createNormalText('(5, 0)',  70, 0, 0, '#000000', 0.8);
        const f1 = ThreeUtil.createNewRomanText('F₁', -50, 10, 0, '#000000', 0.15);
        const coordinate2 = ThreeUtil.createNormalText('(-5, 0)',  75, 0, 0, '#000000', 0.8);
        f2.add(coordinate1);
        f1.add(coordinate2);
        this.scene.add(f1);
        this.scene.add(f2);
    }

    //设置move事件内容
    setMoveEvent() {
        this.sliderControlLine.sliderPointMouseMoveCallback = () => {
            this.drawingIntersections();
        };
        this.sliderControlLine.sliderPointTouchMoveCallback = () => {
            this.drawingIntersections();
        };
        this.sliderControlLine.controlPointDragCallback = () => {
            this.drawingIntersections();
        };
    }

    //重新设置直线方程的文字
    resetFormulaText(slope: number, intercept: number , b: number, x?: number) {
        if (b === 0) {
            this.formulaText.text = x ? 'x = ' + x.toFixed(2) : 'x = ' + 0;
        } else if (intercept <= 0 && b !== 0) {
            this.formulaText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y + ' + -intercept.toFixed(2) + ' = 0';
        } else if (intercept > 0 && b !== 0) {
            this.formulaText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y - ' + Math.abs(intercept).toFixed(2) + ' = 0';
        }
    }

    reset() {
        this.rotatePoint.rotateZ(-this.sliderControlLine.angle);
        this.sliderControlLine.angle = 0;
        this.rotatePoint.position.set(0, 0, 0);
        this.drawingIntersections();
    }

}




