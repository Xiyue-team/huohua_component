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
import {CalcIntersection} from './CalcIntersection';
import {CreateGraphics} from './CreateGraphics';

export class Zxysqx3dModel extends ThreeBase {


    planeMesh: Mesh;
    private controls: any;
    private sliderControlLine: any;
    private rotatePoint: THREE.Mesh;
    private slope: number;
    private tiltAngle: number;
    private intercept: number;
    private intersection1: THREE.Mesh;
    private intersection2: THREE.Mesh;
    private formulaText: any;
    private delta: number;

    private ellipse: THREE.Group;
    private circle: THREE.Group;
    private hyperbola: THREE.Group;
    private parabola: THREE.Group;
    //两条渐近线
    private asymptote1: THREE.Group;
    private asymptote2: THREE.Group;
    private scale = 10;
    private calcIntersection = new CalcIntersection();
    private result: any;

    //三个坐标文字
    private f: any;
    private f1: any;
    private f2: any;

    private point: any;
    private point1: any;
    private point2: any;
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

        //初始化图形的方法
        this.initGraphics();
        //创建旋转线的方法
        this.createRotateLine();
        //创建点的方法
        this.createIntersection();
        //初始化计算交点所需要数据的方法
        this.initIntersectionsData();
        //计算交点坐标移动点的方法
        this.resetPointPosition();
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

    //初始化图形
    initGraphics() {
        const createGraphicsHelper = new CreateGraphics();
        this.circle = createGraphicsHelper.drawCircle();
        this.ellipse = createGraphicsHelper.drawEllipse();
        this.hyperbola = createGraphicsHelper.drawHyperbola();
        this.parabola = createGraphicsHelper.drawParabola();
        this.asymptote1 = createGraphicsHelper.drawAsymptote().dashLine1;
        this.asymptote2 = createGraphicsHelper.drawAsymptote().dashLine2;
        this.ellipse.visible = false;
        this.circle.visible = false;
        this.parabola.visible = false;
        this.asymptote1.visible = false;
        this.asymptote2.visible = false;
        this.scene.add(this.circle, this.ellipse, this.hyperbola, this.parabola, this.asymptote1, this.asymptote2 );
    }

    //控制图形显示隐藏
    isShowGraphics(boolean1: boolean, boolean2: boolean, boolean3: boolean, boolean4: boolean) {
        this.hyperbola.visible = boolean1;
        this.parabola.visible = boolean2;
        this.ellipse.visible = boolean3;
        this.circle.visible = boolean4;
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

    //初始化计算交点所需要的数据
    initIntersectionsData() {
        //倾斜角
        this.tiltAngle = MathHelper.getTiltAngle( 60 * Math.PI / 180, this.sliderControlLine.angle);
        //斜率
        this.slope = (this.tiltAngle <= 90.5 * Math.PI / 180 && this.tiltAngle >= 89.5 * Math.PI / 180) ? undefined
            : MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, this.sliderControlLine.angle)));
        const slope = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, this.sliderControlLine.angle)));
        //截距
        this.intercept = MathHelper.getIntercept(slope, this.rotatePoint.position.x / this.scale, this.rotatePoint.position.y / this.scale);
    }



    //设置表格文字的方法
    setText(slope: string, deleta: string, position: string, intersection: string) {
        (window as any).viewHandler.viewModel.$data.slope = slope;
        (window as any).viewHandler.viewModel.$data.delta = deleta;
        (window as any).viewHandler.viewModel.$data.position = position;
        (window as any).viewHandler.viewModel.$data.intersection = intersection;
    }

    //创建坐标轴上的标注点
    createIntersection() {
        const color = '#0199ff';
        this.intersection1 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        this.intersection2 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        this.point1 = ThreeUtil.createPoint(1.5, color, 50, 0, 1);
        this.point2 = ThreeUtil.createPoint(1.5, color, -50, 0, 1);
        this.point = ThreeUtil.createPoint(1.5, color, 30, 0, 1);
        this.point.visible = false;
        this.scene.add(this.intersection1);
        this.scene.add(this.intersection2);
        this.intersection1.position.z = 1;
        this.intersection2.position.z = 1;
        this.scene.add(this.point, this.point1, this.point2);
    }

    isShowPoint(boolean1: boolean, boolean2: boolean, boolean3: boolean) {
        this.point.visible = boolean1;
        this.point1.visible = boolean2;
        this.point2.visible = boolean3;
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
        this.f2 = ThreeUtil.createNewRomanText('F₂', 35, 10, 0, '#000000', 0.15);
        const coordinate1 = ThreeUtil.createNormalText('(5, 0)',  70, 0, 0, '#000000', 0.8);
        this.f1 = ThreeUtil.createNewRomanText('F₁', -50, 10, 0, '#000000', 0.15);
        const coordinate2 = ThreeUtil.createNormalText('(-5, 0)',  75, 0, 0, '#000000', 0.8);
        this.f = ThreeUtil.createNewRomanText('F', 30, 10, 0, '#000000', 0.15);
        const coordinate3 = ThreeUtil.createNormalText('(3, 0)',  75, 0, 0, '#000000', 0.8);
        this.f2.add(coordinate1);
        this.f1.add(coordinate2);
        this.f.add(coordinate3);
        this.f.visible = false;
        this.scene.add(this.f1, this.f2, this.f);
    }

    //重新设置交点位置
    resetPointPosition() {
        //获取新的交点坐标
        switch (true) {
            case (window as any).viewHandler.viewModel.$data.color1:
                //双曲线的情况下
                this.result = this.calcIntersection.getHyperbolaIntersections(this.sliderControlLine.angle,
                    this.intercept, this.slope, this.rotatePoint.position.x);
                console.log(this.sliderControlLine.angle * 180 / Math.PI);
                if (this.sliderControlLine.angle * 180 / Math.PI > 66 && this.sliderControlLine.angle * 180 / Math.PI < 68 ||
                    this.sliderControlLine.angle * 180 / Math.PI < -112 && this.sliderControlLine.angle * 180 / Math.PI > -114 ||
                    this.sliderControlLine.angle * 180 / Math.PI < -292 && this.sliderControlLine.angle * 180 / Math.PI > -294 ||
                    this.sliderControlLine.angle * 180 / Math.PI < 248 && this.sliderControlLine.angle * 180 / Math.PI > 245) {
                    this.asymptote2.visible = true;
                }

                if (this.sliderControlLine.angle * 180 / Math.PI < -7 && this.sliderControlLine.angle * 180 / Math.PI > -9 ||
                    this.sliderControlLine.angle * 180 / Math.PI > 172 && this.sliderControlLine.angle * 180 / Math.PI < 174 ||
                    this.sliderControlLine.angle * 180 / Math.PI < -185 && this.sliderControlLine.angle * 180 / Math.PI > -187) {
                    this.asymptote1.visible = true;
                }
                break;
            case (window as any).viewHandler.viewModel.$data.color2:
                //抛物线的情况下
                this.result = this.calcIntersection.getParabolaIntersections(this.sliderControlLine.angle,
                    this.intercept, this.slope, this.rotatePoint.position.x);
                break;
            case (window as any).viewHandler.viewModel.$data.color3:
                // 椭圆的情况下
                this.result =  this.calcIntersection.getEllipseIntersections(this.sliderControlLine.angle,
                    this.intercept, this.slope, this.rotatePoint.position.x);
                break;
            case (window as any).viewHandler.viewModel.$data.color4:
                //圆形的情况下

                this.result = this.calcIntersection.getSphereIntersections(this.sliderControlLine.angle,
                    this.intercept, this.slope, this.rotatePoint.position.x);
                break;
        }

        //设置点的位置
        this.setIntersection(this.result.opacity1, this.result.x1 * 10, this.result.y1 * 10,
        this.result.opacity2, this.result.x2 * 10, this.result.y2 * 10);
        //设置直线方程的变化
        this.resetFormulaText(this.slope, this.intercept, 1);
    }

    //设置move事件内容
    setMoveEvent() {
        this.sliderControlLine.sliderPointMouseMoveCallback = () => {
            this.initIntersectionsData();
            this.resetPointPosition();
        };
        this.sliderControlLine.sliderPointTouchMoveCallback = () => {
            this.initIntersectionsData();
            this.resetPointPosition();

        };
        this.sliderControlLine.controlPointDragCallback = () => {
            this.initIntersectionsData();
            this.resetPointPosition();
        };
    }

    //重新设置直线方程的文字
    resetFormulaText(slope: number, intercept: number , b: number) {
        if (slope) {
            if (intercept <= 0 && b !== 0) {
                this.formulaText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y + ' + -intercept.toFixed(2) + ' = 0';
            } else if (intercept > 0 && b !== 0) {
                this.formulaText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y - ' + Math.abs(intercept).toFixed(2) + ' = 0';
            }
        } else {
            this.formulaText.text = 'l: x = ' +  (this.rotatePoint.position.x / 10).toFixed(2);
        }

    }

    reset() {
        this.rotatePoint.rotateZ(-this.sliderControlLine.angle);
        this.sliderControlLine.angle = 0;
        this.rotatePoint.position.set(0, 0, 0);
        this.initIntersectionsData();
        this.asymptote1.visible = false;
        this.asymptote2.visible = false;
        this.hyperbola.visible = true;
        this.ellipse.visible = false;
        this.circle.visible = false;
        this.parabola.visible = false;
        this.resetPointPosition();
        this.f1.visible = true;
        this.f2.visible = true;
        this.f.visible = false;
        this.point1.visible = true;
        this.point2.visible = true;
        this.point.visible = false;
    }

}
