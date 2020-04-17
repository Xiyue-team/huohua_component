import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';


const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
import * as background from '../sub_static/background.png';
import * as zhuzi from '../sub_static/zhuzi.png';
import * as huadong from '../sub_static/huadongdian.png';
import {Line} from '../../../../../src/three/component/Line';
import {Line1Config, Line2Config, Line3Config, LineConfig} from './RlhlylConfig';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
OBJLoader(THREE);
export class Rlhlyl3dModel extends ThreeBase {

    planeMesh: Mesh;
    private controls: any;
    private line: THREE.Line;
    private line1: THREE.Line;
    private line2: THREE.Line;
    private line3: THREE.Line;
    private dashLine1: any;
    private dashLine2: any;
    private point1: THREE.Mesh;
    private point2: THREE.Mesh;
    private smallPoint1: THREE.Mesh;
    private smallPoint2: THREE.Mesh;
    private point3: THREE.Mesh;
    private point4: THREE.Mesh;
    private smallPoint3: THREE.Mesh;
    private smallPoint4: THREE.Mesh;
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private textA: any;
    private textB: any;
    private textC: any;
    private textD: any;
    private render = () => {
        requestAnimationFrame( this.render );
        this.controls.update();
        this.renderer.render( this.scene,  this.camera );
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
    init() {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.loadImage();
        this.initBackground();
        this.createPoint();
        this.initDragLine();
        this.initPlane();
        this.initText();
        this.initDashLine();
        this.bindDragEventToPoint();
        this.render();
    }

    //加载图片
    loadImage() {
        const imageArray = [background, zhuzi, huadong];
        console.log(imageArray);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  403);
    }


    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
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

    //初始化可拖动线
    initDragLine() {

        this.line = ThreeUtil.createBezierCurve(LineConfig.points, LineConfig.color, 100);
        this.line1 = ThreeUtil.createBezierCurve(Line1Config.points, Line1Config.color, 100);
        this.line2 = ThreeUtil.createBezierCurve(Line2Config.points, Line2Config.color, 100);
        this.line3 = ThreeUtil.createBezierCurve(Line3Config.points, Line3Config.color, 100);
        this.group1.add(this.line);
        this.group1.add(this.line1);
        this.scene.add(this.group1);
        this.group1.position.y = 60;

        this.group2.add(this.line2);
        this.group2.add(this.line3);
        this.scene.add(this.group2);
        this.group2.position.y = -60;
    }

    //创建拖动划点
    createPoint() {
        //创建上半段线上可拖动点
        const radius = BrowserUtil.getBrowserInfo().isMobile ? 10 : 6.3;
        this.point1 = ThreeUtil.createSphere(10, '#000000', 0.001,  90, 0, 2);
        this.point2 = ThreeUtil.createSphere(10, '#000000', 0.001,  -90, 0, 2);
        this.smallPoint1 = ThreeUtil.createImg(12.6, 12.6, huadong, 0, 0, 1);
        this.smallPoint2 = ThreeUtil.createImg(12.6, 12.6, huadong, 0, 0, 1);
        this.point1.add(this.smallPoint1);
        this.point1.renderOrder = 2;
        this.smallPoint1.renderOrder = 1;
        this.point2.renderOrder = 2;
        this.smallPoint2.renderOrder = 1;
        this.point2.add(this.smallPoint2);
        this.group1.add(this.point1);
        this.group1.add(this.point2);

        //创建下半段线上可拖动点
        this.point3 = ThreeUtil.createSphere(10, '#000000', 0.001,  90, 0, 2);
        this.point4 = ThreeUtil.createSphere(10, '#000000', 0.001,  -90, 0, 2);
        this.smallPoint3 = ThreeUtil.createImg(12.6, 12.6, huadong, 0, 0, 1);
        this.smallPoint4 = ThreeUtil.createImg(12.6, 12.6, huadong, 0, 0, 1);
        this.point3.add(this.smallPoint3);
        this.point3.renderOrder = 2;
        this.smallPoint3.renderOrder = 1;
        this.point4.renderOrder = 2;
        this.smallPoint4.renderOrder = 1;
        this.point4.add(this.smallPoint4);
        this.group2.add(this.point3);
        this.group2.add(this.point4);

    }

    //绑定拖动事件
    bindDragEventToPoint() {
        const dargControls = new dragcontrols([this.point1], this.camera, this.renderer.domElement);
        const dargControls1 = new dragcontrols([this.point2], this.camera, this.renderer.domElement);
        const dargControls2 = new dragcontrols([this.point3], this.camera, this.renderer.domElement);
        const dargControls3 = new dragcontrols([this.point4], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            dargControls2.deactivate();
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.point1.position.x = 90;
            if (this.point1.position.y < -53.7) {
                this.point1.position.y =  -53.7;
            } else if (this.point1.position.y > 40) {
                this.point1.position.y =  40;
            }
            this.resetLine1();
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            dargControls2.activate();
        } );



        dargControls1.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            dargControls3.deactivate();
        } );
        dargControls1.addEventListener( 'drag', ( event: any) => {
            this.point2.position.x = -90;
            if (this.point2.position.y > 40) {
               this.point2.position.y = 40;
            } else if (this.point2.position.y < -53.7) {
                this.point2.position.y = - 53.7;
            }
            this.resetLine2();
        } );
        dargControls1.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            dargControls3.activate();
        } );



        dargControls2.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            dargControls.deactivate();
        } );
        dargControls2.addEventListener( 'drag', ( event: any) => {
            this.point3.position.x = 90;
            if (this.point3.position.y > 53.7) {
                this.point3.position.y = 53.7;
            } else if (this.point3.position.y < - 40) {
                this.point3.position.y = - 40;
            }
            this.resetLine3();
        } );
        dargControls2.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            dargControls.activate();
        } );



        dargControls3.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            dargControls1.deactivate();
        } );
        dargControls3.addEventListener( 'drag', ( event: any) => {
            this.point4.position.x = -90;
            if (this.point4.position.y > 53.7) {
                this.point4.position.y = 53.7;
            } else if (this.point4.position.y < - 40) {
                this.point4.position.y = - 40;
            }
            this.resetLine4();
        } );
        dargControls3.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            dargControls1.activate();
        } );
    }

    //重新设置贝塞尔曲线
    resetLine1() {
        this.removeMesh(this.group1, this.line);
        this.line = ThreeUtil.createBezierCurve({
            x1: 0,
            y1: 0,
            z1: 1,
            x2: 90,
            y2: this.point1.position.y + (0.32 * this.point1.position.y),
            z2: 1,
            x3: 90,
            y3: this.point1.position.y + (0.32 * this.point1.position.y),
            z3: 1,
            x4: 180,
            y4: 0,
            z4: 1
        }, '#d228d0', 100);
        this.group1.add(this.line);
    }

    resetLine2() {
        this.group1.remove(this.line1);
        this.line1.geometry.dispose();
        this.line1.material.dispose();
        this.line1 = ThreeUtil.createBezierCurve({
            x1: 0,
            y1: 0,
            z1: 1,
            x2: -90,
            y2: this.point2.position.y + (0.32 * this.point2.position.y),
            z2: 1,
            x3: -90,
            y3: this.point2.position.y + (0.32 * this.point2.position.y),
            z3: 1,
            x4: -180,
            y4: 0,
            z4: 1,
        }, '#d228d0', 100);
        this.group1.add(this.line1);
    }

    resetLine3() {
        this.group2.remove(this.line2);
        this.line2.geometry.dispose();
        this.line2.material.dispose();
        this.line2 = ThreeUtil.createBezierCurve({
            x1: 180,
            y1: 0,
            z1: 2,
            x2: 90,
            y2: this.point3.position.y + (0.32 * this.point3.position.y),
            z2: 2,
            x3: 90,
            y3: this.point3.position.y + (0.32 * this.point3.position.y),
            z3: 2,
            x4: 0,
            y4: 0,
            z4: 2,
        }, '#d228d0', 100);
        this.group2.add(this.line2);
    }

    resetLine4() {
        this.group2.remove(this.line3);
        this.line3.geometry.dispose();
        this.line3.material.dispose();
        this.line3 = ThreeUtil.createBezierCurve({
            x1: -180,
            y1: 0,
            z1: 2,
            x2: -90,
            y2: this.point4.position.y + (0.32 * this.point4.position.y),
            z2: 2,
            x3: -90,
            y3: this.point4.position.y + (0.32 * this.point4.position.y),
            z3: 2,
            x4: 0,
            y4: 0,
            z4: 2,
        }, '#d228d0', 100);
        this.group2.add(this.line3);
    }

    initBackground() {
        const backgroundImage = ThreeUtil.createImg((307.7) * 2.8, (172.8) * 2.5, background, 0, 0, 0);
        this.scene.add(backgroundImage);
    }

    //重置场景方法
    reset() {
        this.removeMesh(this.group1, this.line);
        this.removeMesh(this.group1, this.line1);
        this.removeMesh(this.group2, this.line2);
        this.removeMesh(this.group2, this.line3);
        this.initDragLine();
        this.point1.position.set(90, 0, 2);
        this.point2.position.set(-90, 0, 2);
        this.point3.position.set(90, 0, 2);
        this.point4.position.set(-90, 0, 2);

    }

    //初始化两个光柱
    initPlane() {
        const plane = ThreeUtil.createImg(143.4 * 2, 108 * 2, zhuzi, 0, 0, 0);
        plane.position.set(0, -7, 0);
        this.scene.add(plane);
    }

    //初始化两条虚线
    initDashLine() {
        const linehelper = new Line();
        const startPoint = new THREE.Vector3(180, 0, 0);
        const endPoint = new THREE.Vector3(-180, 0, 0);
        const lineWidth = 400;
        const color = '#d228d0';
        const depthTest = false;
        this.dashLine1 = linehelper.createLine(
            {startPoint: startPoint, endPoint: endPoint, lineWidth: lineWidth, color: color,
                depthTest: depthTest, dashLine: true, dashSize: 1.5, gapSize: 2.5});
        this.dashLine2 = this.dashLine1.clone();
        this.group1.add(this.dashLine1);
        this.group2.add(this.dashLine2);
        this.dashLine1.position.y = 0.3;
        this.dashLine2.position.y = -0.3;
    }

    //删除方法
    removeMesh(scene: any, obj: any) {
       scene.remove(obj);
       obj.geometry.dispose();
       obj.material.dispose();
    }
    //初始化文字的方法
    initText() {
        const text1 = ThreeUtil.createNormalText('高空', -230, 100, 0, '#000000', 0.25);
        const text2 = ThreeUtil.createNormalText('925hpa', -210, 70, 0, '#000000', 0.25);
        const text3 = ThreeUtil.createNormalText('1000hpa', -210, -50, 0, '#000000', 0.25);
        const text4 = ThreeUtil.createNormalText('地面', -230, -130, 0, '#ffffff', 0.25);
        const text5 = ThreeUtil.createNormalText('冷却', -90, -140, 0 , '#ffffff', 0.25);
        const text6 = ThreeUtil.createNormalText('受热', 90, -140, 0 , '#ffffff', 0.25);

        this.textA = ThreeUtil.createNormalText('A', -91, -67, 0, '#000000', 0.25);
        this.textB = ThreeUtil.createNormalText('B', 91, -67, 0, '#000000', 0.25);
        this.textC = ThreeUtil.createNormalText('C', -91, 53, 0, '#000000', 0.25);
        this.textD = ThreeUtil.createNormalText('D', 91, 53, 0, '#000000', 0.25);

        this.scene.add(text1);
        this.scene.add(text2);
        this.scene.add(text3);
        this.scene.add(text4);
        this.scene.add(text5);
        this.scene.add(text6);

        this.scene.add(this.textD);
        this.scene.add(this.textC);
        this.scene.add(this.textB);
        this.scene.add(this.textA);
    }


}




