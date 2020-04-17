import * as THREE from 'three';
import {Object3D, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Line} from '../../../../../src/three/component/Line';
import {TemplateHelper} from './TemplateHelper';
import * as dragPoint from './../sub_static/tuodong.png';
import {MathHelper} from "../../../../../src/util/MathHelper";
import {MeshText2D, SpriteText2D, textAlign} from "three-text2d";


export class Template3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private controls: any;
    private lineHelper = new Line();
    private circle = new THREE.Group();
    private helper = new TemplateHelper();

    // 原点
    private point: THREE.Mesh;

    // 动点
    private pointC: THREE.Mesh;
    private pointD: THREE.Mesh;
    private dragPoint: THREE.Mesh[] = [];

    // 直角
    private verticalAngle: any;

    // 角的度数
    private thetaAOD: SpriteText2D;
    private thetaBOD: SpriteText2D;
    private thetaOAB: SpriteText2D;
    private thetaBOC: SpriteText2D;
    private thetaDBC: SpriteText2D;

    // r=1, 文字
    private radiusText: SpriteText2D;
    private textA: SpriteText2D;
    private textB: SpriteText2D;
    private textC: SpriteText2D;

    // 线段
    private oaLine: Object3D;
    private obLine: Object3D;
    private abLine: Object3D;
    private odLine: Object3D;
    private ocLine: Object3D;
    private bcLine: Object3D;
    private bdLine: Object3D;

    // 弧线
    private arcAOD: THREE.Mesh;
    private arcBOD: THREE.Mesh;
    private arcOAB: THREE.Mesh;
    private arcBOC: THREE.Mesh;
    private arcDBC: THREE.Mesh;

    // 图解索引
    private index: number;

    // 颜色
    private redColor: string = '#ff5a5a';
    private blackColor: string = '#000000';
    private yellowColor: string = '#ffd621';

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }


    /**
     *
     * @param {Element} domElement   渲染element
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createCircle();
        this.createPoint();
        this.createLine();
        this.initText();
        this.initDrag();

        this.render();
    }

    // 初始化场景
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    // 初始化镜头
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 300);
    }

    // 初始化渲染器
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF', 1);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    // 初始化控制器
    initControl(): void {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

    // 初始化光源
    initLight(): void {
    }

    // 解析图解
    answerGraphy(i: number) {
        if (i === 1) {
            if (this.index === 1) {
                return;
            }
            this.reset(i);
        }
        if (i === 2) {
            if (this.index === 2) {
                return;
            }
            this.reset(i);
        }
        this.index = i;
    }

    // 创建圆
    createCircle() {
        const r = 50;
        const circlePoint = [];
        for (let i = 0; i < 50.1; i += 0.1) {
            circlePoint.push(new THREE.Vector3(Math.sqrt(Math.pow(r, 2) - Math.pow(i, 2)), i, 0));
        }
        const curve1 = ThreeUtil.createTube(circlePoint, 0.5, 60, this.blackColor);
        const curve2 = curve1.clone();
        const curve3 = curve1.clone();
        const curve4 = curve1.clone();
        curve2.rotation.z = Math.PI / 2;
        curve3.rotation.z = Math.PI;
        curve4.rotation.z = Math.PI * 3 / 2;
        this.circle.add(curve1, curve2, curve3, curve4)
        this.scene.add(this.circle, curve1);

        // 创建外部隐形圆
        const curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            60, 60,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        const ellipse = new THREE.Line( geometry, material );
        ellipse.visible = false;
        this.scene.add(ellipse);
    }

    // 创建点(两个拖动点，一个不动点)
    createPoint() {
        const r = 50;
        this.point = ThreeUtil.createPoint(2, '#0199ff', 0, 0, 1);
        this.point.position.z = 1;
        for (let i = 0; i < 2; i++) {
            this.dragPoint.push(ThreeUtil.createImg(15, 15, dragPoint, 0, 0, 0));
            this.scene.add(this.dragPoint[i]);
        }
        this.dragPoint[0].position.set(40, -Math.sqrt(Math.pow(r, 2) - Math.pow(40, 2)), 1);
        this.dragPoint[1].position.set(-40, -Math.sqrt(Math.pow(r, 2) - Math.pow(40, 2)), 1);
        this.scene.add(this.point);
    }

    // 绘制字母
    initText() {
        this.textA = ThreeUtil.createNewRomanText('A', -48, -35, 0, this.blackColor, 0.15);
        this.textB = ThreeUtil.createNewRomanText('B', 48, -35, 0, this.blackColor, 0.15);
        const textO = ThreeUtil.createNewRomanText('O', -5, 6, 0, this.blackColor, 0.15);
        const textR = ThreeUtil.createNewRomanText('r', -30, 10, 0, this.blackColor, 0.9);
        this.radiusText = ThreeUtil.createNumber('=1', 1 / 2 * (this.point.position.x + this.dragPoint[0].position.x) + 10,
            1 / 2 * (this.point.position.y + this.dragPoint[0].position.y) + 5, 0, this.blackColor, 0.2);
        this.circle.add(textO);
        this.radiusText.add(textR);
        this.scene.add(this.textA, this.textB, this.radiusText);
    }

    createText(texts: string, color: string, x: number, y: number) {
        const text = new MeshText2D(texts, { align: textAlign.right, font: '30px SimHei', fillStyle: color, antialias: true });
        text.position.set(x, y, 0);
        text.scale.set(0.2, 0.2, 0.2);
        this.scene.add(text);
        return text;
    }

    initDrag() {
        let dragControl1 = this.bindDrag(this.dragPoint[0]);
        let dragControl2 = this.bindDrag(this.dragPoint[1]);


        // 拖动B点过程
        this.bindDragFunction(dragControl1, () => {
            dragControl2.deactivate();
        }, () => {
            this.redrawDragPosition(this.dragPoint[0]);
            this.redrawGraphyByCondition();
            this.redrawRadiusText();
            this.getLineAndCirclePoint();

        }, () => {
            this.redrawCollinearIssue(this.dragPoint[0]);
            dragControl2.activate();
        });

        // 拖动A点过程
        this.bindDragFunction(dragControl2, () => {
            dragControl1.deactivate();
        }, () => {
            this.redrawDragPosition(this.dragPoint[1]);
            this.redrawGraphyByCondition();
            this.getLineAndCirclePoint();
        }, () => {
            this.redrawCollinearIssue(this.dragPoint[1]);
            dragControl1.activate();
        });
    }

    // 获取直线和圆的交点坐标
    getLineAndCirclePoint() {
        let pointAArray = this.helper.getInsertPointBetweenCircleAndLine(0, 0,
            this.dragPoint[1].position.x, this.dragPoint[1].position.y, 0, 0, 60);
        if (this.dragPoint[1].position.x < 0) {
            this.textA.position.set(pointAArray[1].x, pointAArray[1].y, 0);
        } else {
            this.textA.position.set(pointAArray[0].x, pointAArray[0].y, 0);
        }
        let pointBArray = this.helper.getInsertPointBetweenCircleAndLine(0, 0,
            this.dragPoint[0].position.x, this.dragPoint[0].position.y, 0, 0, 60);
        if (this.dragPoint[0].position.x < 0) {
            this.textB.position.set(pointBArray[1].x, pointBArray[1].y, 0);
        } else {
            this.textB.position.set(pointBArray[0].x, pointBArray[0].y, 0);
        }
        if (this.textC) {
            this.textC.position.set(-this.textA.position.x, -this.textA.position.y, 0);
        }
    }


    // 创建内部连线
    createLine() {
        this.oaLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.dragPoint[1].position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false);
        this.obLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false);
        this.abLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z),
            new THREE.Vector3(this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.dragPoint[1].position.z), false);
        this.scene.add(this.oaLine, this.obLine, this.abLine);
    }

    // 创建中点D以及相关连线
    createMidpointD() {
        this.pointD = ThreeUtil.createPoint(2, '', 1 / 2 * (this.dragPoint[0].position.x + this.dragPoint[1].position.x),
            1 / 2 * (this.dragPoint[0].position.y + this.dragPoint[1].position.y), 0);
        let textD = ThreeUtil.createNewRomanText('D', 0, -5, 0, this.blackColor, 0.15);
        this.pointD.add(textD);

        // 绘制直角
        this.verticalAngle = this.helper.drawVerticalAngle(0, 4, 4, 0, 4, 4, this.redColor);
        this.pointD.add(this.verticalAngle);

        this.odLine = this.drawLine(this.blackColor,
            new THREE.Vector3(1 / 2 * (this.dragPoint[0].position.x + this.dragPoint[1].position.x),
                1 / 2 * (this.dragPoint[0].position.y + this.dragPoint[1].position.y), this.dragPoint[0].position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), true);
        this.scene.add(this.pointD, this.odLine);

        // 创建解析图1相关扇形
        let angleO = this.helper.getAngle(this.point.position.x, this.point.position.y, this.dragPoint[1].position.x,
            this.dragPoint[1].position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y) * Math.PI / 180;
        this.arcAOD = ThreeUtil.drawArc(50, -Math.PI / 2, -angleO / 2, this.yellowColor, 0.9);
        this.arcBOD = ThreeUtil.drawArc(50, -Math.PI / 2, angleO / 2, this.yellowColor, 0.9);
        this.thetaAOD = ThreeUtil.createNewRomanText('α', (this.arcAOD.geometry as THREE.BufferGeometry).attributes.position.array[81],
            (this.arcAOD.geometry as THREE.BufferGeometry).attributes.position.array[82], 0, this.blackColor, 0.15);
        this.thetaBOD = ThreeUtil.createNewRomanText('α', (this.arcBOD.geometry as THREE.BufferGeometry).attributes.position.array[81],
            (this.arcBOD.geometry as THREE.BufferGeometry).attributes.position.array[82], 0, this.blackColor, 0.15);
        this.arcAOD.position.z = -1;
        this.arcBOD.position.z = -1;
        this.arcAOD.add(this.thetaAOD);
        this.arcBOD.add(this.thetaBOD);
        this.point.add(this.arcAOD, this.arcBOD);
    }

    // 创建垂足D以及相关连线
    createVerticalFootD() {
        this.createDiameterPointC();
        const positionD = MathHelper.getFoot(this.dragPoint[0].position.x, this.dragPoint[0].position.y,
            this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.pointC.position.x, this.pointC.position.y)
        this.pointD = ThreeUtil.createPoint(2, '', positionD.x, positionD.y, 0.15);
        const textD = ThreeUtil.createNewRomanText('D', -6, 8, 0, this.blackColor, 0.15);
        this.pointD.add(textD);
        this.bdLine = this.drawLine(this.redColor,
            new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, 0),
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, 0), true);
        this.scene.add(this.pointD, this.bdLine);
        this.createGraphy2Arc();
    }

    // 创建直径（A的相对点）
    createDiameterPointC() {
        this.pointC = ThreeUtil.createPoint(2, '#0199ff', -this.dragPoint[1].position.x, -this.dragPoint[1].position.y, 0);
        this.ocLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.pointC.position.x, this.pointC.position.y, this.pointC.position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false);
        this.bcLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.pointC.position.x, this.pointC.position.y, this.pointC.position.z),
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z), false);
        this.textC = ThreeUtil.createNewRomanText('C', -this.textA.position.x, -this.textA.position.y, 0, this.blackColor, 0.15);
        this.scene.add(this.pointC, this.textC, this.ocLine, this.bcLine);
    }

    // 创建解析图2相关扇形
    createGraphy2Arc() {
        // 绘制直角
        this.verticalAngle = new MathHelper().drawVerticalLines(
            new THREE.Vector3(this.pointC.position.x, this.pointC.position.y, 0),
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, 0),
            new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, 0), 4, this.blackColor, 'rightBottom');
        this.scene.add(this.verticalAngle);

        let startAngleOA = this.helper.getStartAngle(0, 0, this.dragPoint[1].position.x, this.dragPoint[1].position.y);
        let startAngleBC = this.helper.getStartAngle(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.pointC.position.x, this.pointC.position.y);
        let angleOAB = this.helper.getAngle(this.dragPoint[1].position.x, this.dragPoint[1].position.y,
            this.point.position.x, this.point.position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y) * Math.PI / 180;
        let angleBOC = this.helper.getAngle(this.point.position.x, this.point.position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y,
            this.pointC.position.x, this.pointC.position.y) * Math.PI / 180;
        let angleDBC = this.helper.getAngle(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.pointD.position.x, this.pointD.position.y,
            this.pointC.position.x, this.pointC.position.y) * Math.PI / 180;
        this.arcOAB = ThreeUtil.drawArc(10, startAngleOA, -angleOAB, this.yellowColor, 0.9);
        this.arcBOC = ThreeUtil.drawArc(8, startAngleOA, -angleBOC, this.redColor, 0.9);
        this.arcDBC = ThreeUtil.drawArc(8, startAngleBC, angleDBC, this.yellowColor, 0.9);
        this.arcOAB.position.z = -1;
        this.arcBOC.position.z = -1;
        this.arcDBC.position.z = -1;
        this.thetaOAB = ThreeUtil.createNewRomanText('α', (this.arcOAB.geometry as THREE.BufferGeometry).attributes.position.array[51] + 3,
            (this.arcOAB.geometry as THREE.BufferGeometry).attributes.position.array[52] + 5, 0, this.blackColor, 0.15);
        this.thetaBOC = ThreeUtil.createNewRomanText('α', (this.arcBOC.geometry as THREE.BufferGeometry).attributes.position.array[51] + 6,
            (this.arcBOC.geometry as THREE.BufferGeometry).attributes.position.array[52] + 3, 0, this.blackColor, 0.15);
        this.thetaDBC = ThreeUtil.createNewRomanText('α', (this.arcDBC.geometry as THREE.BufferGeometry).attributes.position.array[51],
            (this.arcDBC.geometry as THREE.BufferGeometry).attributes.position.array[52] + 8, 0, this.blackColor, 0.15);
        let number = ThreeUtil.createNumber('2', -25, -8, 0, this.blackColor, 1.4);
        this.thetaBOC.add(number);
        this.arcOAB.add(this.thetaOAB);
        this.arcBOC.add(this.thetaBOC);
        this.arcDBC.add(this.thetaDBC);
        this.dragPoint[0].add(this.arcDBC);
        this.dragPoint[1].add(this.arcOAB);
        this.point.add(this.arcBOC);
    }

    // 重绘拖动点位置
    redrawDragPosition(point: THREE.Mesh) {
        if (point.position.x >= 50) {
            point.position.x = 50;
        } else if (point.position.x <= -50) {
            point.position.x = -50;
        }
        if (point.position.y >= 0) {
            point.position.y = Math.sqrt(Math.pow(50, 2) - Math.pow(point.position.x, 2));
        } else {
            point.position.y = -Math.sqrt(Math.pow(50, 2) - Math.pow(point.position.x, 2));
        }
    }

    // AOB三点不能共线
    redrawCollinearIssue(point: THREE.Mesh) {
        let bool = this.helper.isCollinear(this.dragPoint[0], this.point, this.dragPoint[1]);
        if (bool) {
            if (point.position.x < 0) {
                point.position.x = point.position.x + 5
            } else {
                point.position.x = point.position.x - 5
            }
            if (point.position.y > 0) {
                point.position.set(point.position.x, Math.sqrt(Math.pow(50, 2) - Math.pow(point.position.x, 2)), 1);
            } else {
                point.position.set(point.position.x, -Math.sqrt(Math.pow(50, 2) - Math.pow(point.position.x, 2)), 1);
            }
            this.redrawGraphyByCondition();
        }
    }

    // 根据解析索引重绘图像
    redrawGraphyByCondition() {
        this.redrawBasicLine();
        this.redrawRadiusText();
        if (this.index === 1) {
            this.redrawMidDRelated();
            this.redrawGraphy1Arc();
        } else if (this.index === 2) {
            this.redrawVerticalDRelated();
            this.redrawGraphy2Arc();
        }
    }

    // 重绘中点D相关
    redrawMidDRelated() {
        this.pointD.position.x = 1 / 2 * (this.dragPoint[0].position.x + this.dragPoint[1].position.x);
        this.pointD.position.y = 1 / 2 * (this.dragPoint[0].position.y + this.dragPoint[1].position.y);
        this.redrawODLine();
    }

    // 重绘垂足D相关
    redrawVerticalDRelated() {
        this.pointC.position.x = -this.dragPoint[1].position.x;
        this.pointC.position.y = -this.dragPoint[1].position.y;
        this.redrawOCLine();
        this.redrawBCLine();
        this.redrawBDLine();
    }

    // 重绘基础线段方法（oa,ob, ab)
    redrawBasicLine() {
        this.scene.remove(this.oaLine, this.obLine, this.abLine);
        this.oaLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.dragPoint[1].position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false);
        this.obLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false);
        this.abLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z),
            new THREE.Vector3(this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.dragPoint[1].position.z), false);
        this.scene.add(this.oaLine, this.obLine, this.abLine);
    }

    // 重绘r=1
    redrawRadiusText() {
        this.radiusText.position.x = 1 / 2 * (this.point.position.x + this.dragPoint[0].position.x) + 10;
        this.radiusText.position.y = 1 / 2 * (this.point.position.y + this.dragPoint[0].position.y) + 5;
    }

    // 重绘线段OD
    redrawODLine() {
        this.scene.remove(this.odLine);
        this.odLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, this.pointD.position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), true)
        this.scene.add(this.odLine);
    }

    // 重绘线段OC
    redrawOCLine() {
        this.scene.remove(this.ocLine);
        this.ocLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.pointC.position.x, this.pointC.position.y, this.pointC.position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z), false)
        this.scene.add(this.ocLine)
    }

    // 重绘线段BC
    redrawBCLine() {
        this.scene.remove(this.bcLine);
        this.bcLine = this.drawLine(this.blackColor,
            new THREE.Vector3(this.pointC.position.x, this.pointC.position.y, this.pointC.position.z),
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z), false)
        this.scene.add(this.bcLine);
    }

    // 重绘线段BD
    redrawBDLine() {
        this.scene.remove(this.bdLine);
        const positionD = MathHelper.getFoot(this.dragPoint[0].position.x, this.dragPoint[0].position.y,
            this.dragPoint[1].position.x, this.dragPoint[1].position.y, this.pointC.position.x, this.pointC.position.y)
        this.pointD.position.x = positionD.x;
        this.pointD.position.y = positionD.y;
        this.bdLine = this.drawLine(this.redColor,
            new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, 0),
            new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.dragPoint[0].position.z), true);
        this.scene.add(this.bdLine);
    }

    // 重绘图一的弧
    redrawGraphy1Arc() {
        this.point.remove(this.arcAOD);
        this.point.remove(this.arcBOD);
        let angleO = this.helper.getAngle(this.point.position.x, this.point.position.y, this.dragPoint[1].position.x,
            this.dragPoint[1].position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y) * Math.PI / 180;
        let startAngle = this.helper.getStartAngle(0, 0, this.pointD.position.x, this.pointD.position.y);
        let dirA = this.helper.judgeDirection(this.point.position.x, this.point.position.y, this.pointD.position.x,
            this.pointD.position.y, this.dragPoint[1].position.x, this.dragPoint[1].position.y);

        if (this.pointD.position.x > 0) {
            if (dirA === 'left') {
                this.arcAOD = ThreeUtil.drawArc(10, startAngle, -angleO / 2, this.yellowColor, 0.9);
                this.arcBOD = ThreeUtil.drawArc(10, startAngle, angleO / 2, this.yellowColor, 0.9);
            }
            if (dirA === 'right') {
                this.arcAOD = ThreeUtil.drawArc(10, startAngle, angleO / 2, this.yellowColor, 0.9);
                this.arcBOD = ThreeUtil.drawArc(10, startAngle, -angleO / 2, this.yellowColor, 0.9);
            }
        } else {
            if (dirA === 'left') {
                this.arcAOD = ThreeUtil.drawArc(10, startAngle - Math.PI, -angleO / 2, this.yellowColor, 0.9);
                this.arcBOD = ThreeUtil.drawArc(10, startAngle - Math.PI, angleO / 2, this.yellowColor, 0.9);
            }
            if (dirA === 'right') {
                this.arcAOD = ThreeUtil.drawArc(10, startAngle - Math.PI, angleO / 2, this.yellowColor, 0.9);
                this.arcBOD = ThreeUtil.drawArc(10, startAngle - Math.PI, -angleO / 2, this.yellowColor, 0.9);
            }
        }
        this.arcAOD.position.z = -1;
        this.arcBOD.position.z = -1;

        this.thetaAOD = ThreeUtil.createNewRomanText('α', (this.arcAOD.geometry as THREE.BufferGeometry).attributes.position.array[84],
            (this.arcAOD.geometry as THREE.BufferGeometry).attributes.position.array[85], 0, this.blackColor, 0.15);
        this.thetaBOD = ThreeUtil.createNewRomanText('α', (this.arcBOD.geometry as THREE.BufferGeometry).attributes.position.array[84],
            (this.arcBOD.geometry as THREE.BufferGeometry).attributes.position.array[85], 0, this.blackColor, 0.15);
        this.arcAOD.add(this.thetaAOD);
        this.arcBOD.add(this.thetaBOD);
        this.point.add(this.arcAOD, this.arcBOD);
        this.redrawGraphy1VerticalAngle();
    }

    // 重绘图二的弧
    redrawGraphy2Arc() {
        let startAngleOA = this.helper.getStartAngle(0, 0, this.dragPoint[1].position.x, this.dragPoint[1].position.y);
        let startAngleBC = this.helper.getStartAngle(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.pointC.position.x, this.pointC.position.y);
        let angleOAB = this.helper.getAngle(this.dragPoint[1].position.x, this.dragPoint[1].position.y,
            this.point.position.x, this.point.position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y) * Math.PI / 180;
        let angleBOC = this.helper.getAngle(this.point.position.x, this.point.position.y, this.pointC.position.x,
            this.pointC.position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y) * Math.PI / 180;
        let angleDBC = this.helper.getAngle(this.dragPoint[0].position.x, this.dragPoint[0].position.y, this.pointD.position.x,
            this.pointD.position.y, this.pointC.position.x, this.pointC.position.y) * Math.PI / 180;

        // 判断B在向量CA的左侧还是右侧
        let dirB = this.helper.judgeDirection(this.pointC.position.x, this.pointC.position.y, this.dragPoint[1].position.x,
            this.dragPoint[1].position.y, this.dragPoint[0].position.x, this.dragPoint[0].position.y);

        // 判断C在向量BD的左侧还是右侧
        let dirC = this.helper.judgeDirection(this.dragPoint[0].position.x, this.dragPoint[0].position.y,
            this.pointD.position.x, this.pointD.position.y, this.pointC.position.x, this.pointC.position.y);

        if (this.dragPoint[0].position.x === -this.dragPoint[1].position.x ||
            this.dragPoint[0].position.x === this.dragPoint[1].position.x  ||
            this.dragPoint[0].position.x === this.pointC.position.x        ||
            this.dragPoint[0].position.x === -this.pointC.position.x) {
            return;
        }

        this.redrawGraphy2VerticalAngle(startAngleOA, dirB);
        this.judgeAndRedrawGraphy2Arc(dirB, startAngleOA, angleOAB, angleBOC, dirC, startAngleBC, angleDBC);

        this.thetaOAB = ThreeUtil.createNewRomanText('α', (this.arcOAB.geometry as THREE.BufferGeometry).attributes.position.array[51] + 3,
            (this.arcOAB.geometry as THREE.BufferGeometry).attributes.position.array[52] + 5, 0, this.blackColor, 0.15);
        this.thetaBOC = ThreeUtil.createNewRomanText('α', (this.arcBOC.geometry as THREE.BufferGeometry).attributes.position.array[51] + 6,
            (this.arcBOC.geometry as THREE.BufferGeometry).attributes.position.array[52] + 3, 0, this.blackColor, 0.15);
        this.thetaDBC = ThreeUtil.createNewRomanText('α', (this.arcDBC.geometry as THREE.BufferGeometry).attributes.position.array[51],
            (this.arcDBC.geometry as THREE.BufferGeometry).attributes.position.array[52] + 8, 0, this.blackColor, 0.15);
        let number = ThreeUtil.createNumber('2', -25, -8, 0, this.blackColor, 1.4);
        this.thetaBOC.add(number);
        this.arcOAB.add(this.thetaOAB);
        this.arcBOC.add(this.thetaBOC);
        this.arcDBC.add(this.thetaDBC);


    }

    // 通过判断不同情况下重绘图2的弧
    private judgeAndRedrawGraphy2Arc(dirB: string, startAngleOA: number, angleOAB: number, angleBOC: number, dirC: string, startAngleBC: number, angleDBC: number) {
        this.dragPoint[0].remove(this.arcDBC);
        this.dragPoint[1].remove(this.arcOAB);
        this.point.remove(this.arcBOC);
        if (this.dragPoint[1].position.x > 0) {
            if (dirB === 'left') {
                this.arcOAB = ThreeUtil.drawArc(10, startAngleOA - Math.PI, angleOAB, this.yellowColor, 0.9);
                this.arcBOC = ThreeUtil.drawArc(10, startAngleOA - Math.PI, angleBOC, this.redColor, 0.9);
            }
            if (dirB === 'right') {
                this.arcOAB = ThreeUtil.drawArc(10, startAngleOA - Math.PI, -angleOAB, this.yellowColor, 0.9);
                this.arcBOC = ThreeUtil.drawArc(10, startAngleOA - Math.PI, -angleBOC, this.redColor, 0.9);

            }
        } else {
            if (dirB === 'left') {
                this.arcOAB = ThreeUtil.drawArc(10, startAngleOA, angleOAB, this.yellowColor, 0.9);
                this.arcBOC = ThreeUtil.drawArc(10, startAngleOA, angleBOC, this.redColor, 0.9);
            }
            if (dirB === 'right') {
                this.arcOAB = ThreeUtil.drawArc(10, startAngleOA, -angleOAB, this.yellowColor, 0.9);
                this.arcBOC = ThreeUtil.drawArc(10, startAngleOA, -angleBOC, this.redColor, 0.9);
            }
        }

        if (this.pointC.position.x - this.dragPoint[0].position.x > 0) {
            if (dirC === 'left') {
                this.arcDBC = ThreeUtil.drawArc(10, startAngleBC, angleDBC, this.yellowColor, 0.9);
            }
            if (dirC === 'right') {
                this.arcDBC = ThreeUtil.drawArc(10, startAngleBC, -angleDBC, this.yellowColor, 0.9);
            }
        } else {
            if (dirC === 'left') {

                this.arcDBC = ThreeUtil.drawArc(10, startAngleBC - Math.PI, angleDBC, this.yellowColor, 0.9);
            }
            if (dirC === 'right') {
                this.arcDBC = ThreeUtil.drawArc(10, startAngleBC - Math.PI, -angleDBC, this.yellowColor, 0.9);
            }
        }
        this.arcOAB.position.z = -1;
        this.arcBOC.position.z = -1;
        this.arcDBC.position.z = -1;
        this.dragPoint[0].add(this.arcDBC);
        this.dragPoint[1].add(this.arcOAB);
        this.point.add(this.arcBOC);
    }

    private redrawGraphy1VerticalAngle() {
        this.scene.remove(this.verticalAngle);
        this.pointD.remove(this.verticalAngle);
        let dir: string;
        if (this.pointD.position.x > 0) {
            dir = 'rightTop';
        } else {
            dir = 'rightBottom';
        }
        if (this.pointD.position.x === 0) {
            this.verticalAngle = this.helper.drawVerticalAngle(0, 4, 4, 0, 4, 4, this.redColor);
            this.pointD.add(this.verticalAngle);
        } else {
            // 绘制直角
            this.verticalAngle = new MathHelper().drawVerticalLines(
                new THREE.Vector3(this.point.position.x, this.point.position.y, 0),
                new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, 0),
                new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, 0), 4, this.redColor, dir);
            this.scene.add(this.verticalAngle);
        }

    }

    // 通过判断不同情况下重绘图2的直角
    private redrawGraphy2VerticalAngle(startAngleOA: number, dirB: string) {
        this.pointD.remove(this.verticalAngle);
        this.scene.remove(this.verticalAngle);

        let dir: string;
        if (startAngleOA === 0) {
            if (this.dragPoint[0].position.y > 0) {
                this.verticalAngle = this.helper.drawVerticalAngle(0, 4, 4, 0, 4, 4, this.blackColor);
            } else {
                this.verticalAngle = this.helper.drawVerticalAngle(0, -4, 4, 0, 4, -4, this.blackColor);
            }
            this.pointD.add(this.verticalAngle);
        } else {
            if (dirB === 'left') {
                dir = 'leftTop';
            }
            if (dirB === 'right') {
                dir = 'rightBottom';
            }

            if (this.dragPoint[1].position.y > 0) {
                if (dirB === 'left') {
                    dir = 'rightBottom';
                }
                if (dirB === 'right') {
                    dir = 'leftTop';
                }
            }
            this.verticalAngle = new MathHelper().drawVerticalLines(
                new THREE.Vector3(this.dragPoint[1].position.x, this.dragPoint[1].position.y, 0),
                new THREE.Vector3(this.dragPoint[0].position.x, this.dragPoint[0].position.y, 0),
                new THREE.Vector3(this.pointD.position.x, this.pointD.position.y, 0), 4, this.blackColor, dir);
            this.scene.add(this.verticalAngle);
        }
    }

    /*********************************************基础方法***********************************************************/

    // 绘线段方法
    drawLine(color: string, endPoint: THREE.Vector3, startPoint?: THREE.Vector3, dashLine?: boolean) {
        startPoint = startPoint ? startPoint : new THREE.Vector3(0, 0, 0);
        dashLine = dashLine ? dashLine : false;
        const line = this.lineHelper.createLine({
            startPoint: startPoint,
            endPoint: endPoint,
            color: color,
            lineWidth: 1000,
            lineWidthScale: 0.001,
            dashLine: dashLine
        });
        return line;
    }

    // 绑定drag事件
    bindDrag(obj: THREE.Mesh) {
        const dargControls = new dragcontrols([obj], this.camera, this.renderer.domElement);
        return dargControls;
    }

    // 绑定drag事件的回调
    bindDragFunction(dargControls: any, dragStartCallback?: any, dragCallback?: any, dragendCallback?: any) {
        dragStartCallback = dragStartCallback ? dragStartCallback : () => {
        };
        dragCallback = dragCallback ? dragCallback : () => {
        };
        dragendCallback = dragendCallback ? dragendCallback : () => {
        };
        dargControls.addEventListener('dragstart', () => {
            this.controls.enabled = false;
            dragStartCallback();
        });
        dargControls.addEventListener('drag', () => {
            dragCallback();
        });
        dargControls.addEventListener('dragend', () => {
            this.controls.enabled = true;
            dragendCallback();
        });
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // 重置图像
    reset(index: number) {
        if (index === 1) {
            this.scene.remove(this.pointC, this.pointD, this.ocLine, this.bcLine, this.bdLine, this.textC, this.verticalAngle);
            this.dragPoint[0].remove(this.arcDBC);
            this.dragPoint[1].remove(this.arcOAB);
            this.point.remove(this.arcBOC);
            this.dragPoint[0].position.set(40, -Math.sqrt(Math.pow(50, 2) - Math.pow(40, 2)), 1);
            this.dragPoint[1].position.set(-40, -Math.sqrt(Math.pow(50, 2) - Math.pow(40, 2)), 1);
            this.createMidpointD();
            this.redrawBasicLine();
            this.redrawRadiusText();
            this.redrawMidDRelated();
            this.redrawGraphy1Arc();
            this.getLineAndCirclePoint();
        }
        if (index === 2) {
            this.point.remove(this.arcAOD, this.arcBOD, this.verticalAngle);
            this.scene.remove(this.pointD, this.odLine, this.verticalAngle);
            this.dragPoint[0].position.set(40, -Math.sqrt(Math.pow(50, 2) - Math.pow(40, 2)), 1);
            this.dragPoint[1].position.set(-40, -Math.sqrt(Math.pow(50, 2) - Math.pow(40, 2)), 1);
            this.redrawBasicLine();
            this.redrawRadiusText();
            this.createVerticalFootD();
            this.redrawVerticalDRelated();
            this.getLineAndCirclePoint();
        }
    }

}
