import * as THREE from 'three';
import {
    DoubleSide,
    Vector3,
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
const dragcontrols = require('three-dragcontrols').default;
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import * as jiantou from '../sub_static/jiantou.png';
import * as l1 from '../sub_static/l1.png';
import * as l2 from '../sub_static/l2.png';
import {Utils} from './Utils';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
OBJLoader(THREE);
export class Lzxpxdpd3dModel extends ThreeBase {
    planeMesh: Mesh;
    browserInfo: BrowserInfo;
    private controls: any;
    private line1: THREE.Mesh;
    private line2: THREE.Mesh;
    private slider1: THREE.Mesh;
    private slider2: THREE.Mesh;
    private imgPoint1: THREE.Mesh;
    private imgPoint2: THREE.Mesh;
    private lastPointX2: number;
    private lastPointY2: number;
    private lastPointX1: number;
    private lastPointY1: number;
    private pointX2: number;
    private pointY2: number;
    private pointX1: number;
    private pointY1: number;
    private moveCtrl1 = false;
    private moveCtrl2 = false;
    private angle1 = 0;
    private angle2 = 0;
    private slope1 = this.getSlope (this.angle1 , 90 - 53.13);
    private slope2 = this.getSlope (this.angle2 , 90);
    private intersectionX: number;
    private intersectionY: number;
    private arcLine: any;
    private dashLine1: any;
    private dashLine2: any;
    private dashLine3: any;
    private dashLine4: any;
    private dashLine5: any;
    private threshold1 = 2;
    private threshold2 = 4;
    private thetaText: any;
    private windowWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    private windowHeight = document.getElementById('3dContainer').getBoundingClientRect().height;
    private util = new Utils();
    private interact: any;
    private name1 = '旋转点1';
    private name2 = '旋转点2';

    private l1Text: any;
    private l2Text: any;
    //为了解决移动端触控范围的问题

    private identificationArea1: THREE.Mesh;
    private identificationArea2: THREE.Mesh;

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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.loadImg();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.createAxis();
        this.createSlider();
        this.createLine();
        this.createRotatePoint();
        this.addEventToImgPoint();
        this.getIntersection();
        this.initArcLine();
        this.createAngleText();

        this.render();
    }

    //加载图片
    loadImg() {
        console.log(jiantou);
        console.log(l1);
        console.log(l2);
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
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  270);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
            // (this.renderer as THREE.WebGLRenderer).sortObjects = false;
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        // this.renderer = new CanvasRenderer.CanvasRenderer();
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl() {
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

    /**
     * 初始化光源
     */
    initLight(): void {

    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建一个坐标系
    createAxis() {
        const color = '#000000';
        let XAxis;
        let YAxis;
        let arrowX;
        let arrowY;
        let i;
        let j = -100;
        const group = new THREE.Group();
        //创建两个坐标轴
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
             XAxis = Utils.createLine(210, 1.5, color);
             YAxis = Utils.createLine(1.5, 210, color);
            arrowX = Utils.createTriangle(105, 2, 105, -2, 115, 0 , color);
            arrowY = Utils.createTriangle(2, 105, -2, 105, 0, 115 , color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.5,  4, color);
                const b = Utils.createLine(4, 0.5, color);
                a.position.set(j, 2, 0);
                b.position.set(2, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        } else {
             XAxis = Utils.createLine(210, 0.5, color);
             YAxis = Utils.createLine(0.5, 210, color);
            arrowX = Utils.createTriangle(105, 1.5, 105, -1.5, 111, 0 , color);
            arrowY = Utils.createTriangle(1.5, 105, -1.5, 105, 0, 111 , color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.25,  2, color);
                const b = Utils.createLine(2, 0.25, color);
                a.position.set(j, 1, 0);
                b.position.set(1, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        }

        //创建坐标轴上的文字
        const textX = Utils.createText('x', 110, 0, 0, color);
        const textY = Utils.createText('y', -3, 115, 0, color);
        const textO = Utils.createText('o', -3, 1, 0, color);
        //X轴坐标
        const text1 = Utils.createNumber('1', 10, -2, 0, color);
        const text2 = Utils.createNumber('5', 50, -2, 0, color);
        const text3 = Utils.createNumber('10', 100, -2, 0, color);
        const text4 = Utils.createNumber('-1', -10, -2, 0, color);
        const text5 = Utils.createNumber('-5', -50, -2, 0, color);
        const text6 = Utils.createNumber('-10', -100, -2, 0, color);
        //Y轴坐标
        const text7 = Utils.createNumber('1', -3, 12, 0, color);
        const text8 = Utils.createNumber('5', -3, 52, 0, color);
        const text9 = Utils.createNumber('10', -3, 102, 0, color);
        const text10 = Utils.createNumber('-1', -3, -8, 0, color);
        const text11 = Utils.createNumber('-5', -3, -48, 0, color);
        const text12 = Utils.createNumber('-10', -3.5, -98, 0, color);

        group.add(textX);
        group.add(textY);
        group.add(XAxis);
        group.add(YAxis);
        group.add(arrowX);
        group.add(arrowY);
        group.add(textO);
        group.add(text1);
        group.add(text2);
        group.add(text3);
        group.add(text4);
        group.add(text5);
        group.add(text6);
        group.add(text7);
        group.add(text8);
        group.add(text9);
        group.add(text10);
        group.add(text11);
        group.add(text12);
        this.scene.add(group);
    }

    //创建两个滑点
    createSlider() {
        const color = '#FF001F';
        const color1 = '#000000';
        const color2 = '#ffffff';
        const circle1 = Utils.createPoint(1.8, color1, 0, 0);
        const circle2 = Utils.createPoint(1.8, color1, 0, 0);
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            this.identificationArea1 = Utils.createPoint(1.5, color, 0, 0);
            this.identificationArea2 = Utils.createPoint(1.5, color, 0, 0);
            this.identificationArea1.position.z = 2;
            this.identificationArea2.position.z = 2;

            this.slider1 = Utils.createPoint1(8, color2, 0, 30);
            this.slider2 = Utils.createPoint1(8, color2, 0, -30);
            this.slider1.position.z = -0.30;
            this.slider2.position.z = -0.30;
            this.identificationArea1.add(circle1);
            this.identificationArea2.add(circle2);
            circle1.position.z = -0.15;
            circle2.position.z = -0.15;
            this.slider1.add(this.identificationArea1);
            this.slider2.add(this.identificationArea2);
        } else {
            this.slider1 = Utils.createPoint(1.5, color, 0, 30);
            this.slider2 = Utils.createPoint(1.5, color, 0, -30);
            circle1.position.z = -0.15;
            circle2.position.z = -0.15;
            this.slider1.add(circle1);
            this.slider2.add(circle2);
        }



        this.slider1.name = this.name1;
        this.slider2.name = this.name2;

        this.scene.add(this.slider2);
        this.scene.add(this.slider1);

        this.slider1.rotateZ(Math.PI / 180 * -53.13);

        const dargControls = new dragcontrols([this.slider1], this.camera, this.renderer.domElement);
        const dargControl2 = new dragcontrols([this.slider2], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;
        } );
        dargControls.addEventListener( 'drag', () => {
            //为了防止手机端两小球粘连的问题做出特殊适配
            if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
               const distance = Math.sqrt(Math.pow((this.slider1.position.x - this.slider2.position.x), 2) +
                   Math.pow((this.slider1.position.y - this.slider2.position.y), 2));

               if (distance <= 8) {
                   dargControl2.deactivate();
               } else {
                   dargControl2.activate();
               }
            } else {
                const distance = Math.sqrt(Math.pow((this.slider1.position.x - this.slider2.position.x), 2) +
                    Math.pow((this.slider1.position.y - this.slider2.position.y), 2));

                if (distance <= 1.5) {
                    dargControl2.deactivate();
                } else {
                    dargControl2.activate();
                }
            }

            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;
            this.resetArcLinePosition();

            this.removeDashLine();
            if (this.createDashLine(this.slider1.position.x, this.slider1.position.y) !== null) {
                this.dashLine1 = this.createDashLine(this.slider1.position.x, this.slider1.position.y);
                this.dashLine2 = this.createDashLine(this.slider1.position.x + this.threshold1,
                    this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine3 = this.createDashLine(this.slider1.position.x + this.threshold2,
                    this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine4 = this.createDashLine(this.slider1.position.x - this.threshold1,
                    -this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine5 = this.createDashLine(this.slider1.position.x - this.threshold2,
                    -this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
                this.scene.add(this.dashLine1);
                this.scene.add(this.dashLine2);
                this.scene.add(this.dashLine3);
                this.scene.add(this.dashLine4);
                this.scene.add(this.dashLine5);
            } else  if (this.slope1 === Math.PI / 2 && this.slope2 === Math.PI / 2) {

                this.dashLine1 = this.createDashLine2(this.slider1.position.y);
                this.dashLine2 = this.createDashLine2(this.slider1.position.y + 20);
                this.dashLine3 = this.createDashLine2(this.slider1.position.y + 40);
                this.dashLine4 = this.createDashLine2(this.slider1.position.y - 20);
                this.dashLine5 = this.createDashLine2(this.slider1.position.y - 40);
                this.scene.add(this.dashLine1);
                this.scene.add(this.dashLine2);
                this.scene.add(this.dashLine3);
                this.scene.add(this.dashLine4);
                this.scene.add(this.dashLine5);
            }
            this.resetTable();
        } );
        dargControls.addEventListener( 'dragend', () => { this.controls.enabled = true; } );


        dargControl2.addEventListener( 'dragstart',  () => {
            this.controls.enabled = false;
        } );
        dargControl2.addEventListener( 'drag', () => {

            if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
                const distance = Math.sqrt(Math.pow((this.slider1.position.x - this.slider2.position.x), 2) +
                    Math.pow((this.slider1.position.y - this.slider2.position.y), 2));

                if (distance <= 8) {
                    dargControls.deactivate();
                } else {
                    dargControls.activate();
                }
            } else {
                const distance = Math.sqrt(Math.pow((this.slider1.position.x - this.slider2.position.x), 2) +
                    Math.pow((this.slider1.position.y - this.slider2.position.y), 2));

                if (distance <= 1.5) {
                    dargControls.deactivate();
                } else {
                    dargControls.activate();
                }
            }

            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;
            this.resetArcLinePosition();

            this.removeDashLine();
            if (this.createDashLine(this.slider1.position.x, this.slider1.position.y) !== null) {
                this.dashLine1 = this.createDashLine(this.slider1.position.x, this.slider1.position.y);
                this.dashLine2 = this.createDashLine(this.slider1.position.x + this.threshold1,
                    this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine3 = this.createDashLine(this.slider1.position.x + this.threshold2,
                    this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine4 = this.createDashLine(this.slider1.position.x - this.threshold1,
                    - this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
                this.dashLine5 = this.createDashLine(this.slider1.position.x - this.threshold2,
                    - this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
                this.scene.add(this.dashLine1);
                this.scene.add(this.dashLine2);
                this.scene.add(this.dashLine3);
                this.scene.add(this.dashLine4);
                this.scene.add(this.dashLine5);
            } else  if (this.slope1 === Math.PI / 2 && this.slope2 === Math.PI / 2) {

                this.dashLine1 = this.createDashLine2(this.slider1.position.y);
                this.dashLine2 = this.createDashLine2(this.slider1.position.y + 20);
                this.dashLine3 = this.createDashLine2(this.slider1.position.y + 40);
                this.dashLine4 = this.createDashLine2(this.slider1.position.y - 20);
                this.dashLine5 = this.createDashLine2(this.slider1.position.y - 40);
                this.scene.add(this.dashLine1);
                this.scene.add(this.dashLine2);
                this.scene.add(this.dashLine3);
                this.scene.add(this.dashLine4);
                this.scene.add(this.dashLine5);
            }
            this.resetTable();
        } );
        dargControl2.addEventListener( 'dragend', () => { this.controls.enabled = true; } );

    }

    //创建两条直线
    createLine() {
        const color = '#0094FF';
        this.line1 = Utils.createLine1(-0.5, 500, 0.5, 500, -0.5, -500, 0.5 , -500, color);
        this.line2 = Utils.createLine1( -0.5, 500, 0.5, 500, -0.5, -500, 0.5, -500, color);
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            this.identificationArea2.add(this.line1);
            this.identificationArea1.add(this.line2);
        } else {
            this.slider2.add(this.line1);
            this.slider1.add(this.line2);
        }

    }

    //创建两个旋转点
    createRotatePoint() {
        const color = '#FFFFFF';
        this.imgPoint2 = Utils.createImg(20, 7, jiantou, 0, 120);
        const plane2 = Utils.createEventRange(50, 50 , color, 0.01);
        this.imgPoint2.add(plane2);


        this.imgPoint1 = Utils.createImg(20, 7, jiantou, 0, 95);
        const plane1 = Utils.createEventRange(50, 50 , color, 0.01);
        this.imgPoint1.add(plane1);
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            this.identificationArea2.add(this.imgPoint2);
            this.identificationArea1.add(this.imgPoint1);
        } else {
            this.slider2.add(this.imgPoint2);
            this.slider1.add(this.imgPoint1);
        }
    }

    //调换加入场景的顺序保证事件的正常触发
    //用于解决mouse事件遮挡的问题
    resetAdditon() {
        const e = this.scene.children[2];
        this.scene.children[2] = this.scene.children[1];
        this.scene.children[1] = e;
    }

    //获取鼠标当时的位置
    addEventToImgPoint() {
        //给点2绑定事件
        //鼠标按下时获取鼠标坐标
        (this.imgPoint2 as any).on('mousedown', (event: Event) => {
            const pointX = (event as any).data.originalEvent.clientX;
            const pointY = (event as any).data.originalEvent.clientY;
            this.moveCtrl2 = true;
            this.lastPointX2 = this.getMousePosition(event, pointX, pointY).x;
            this.lastPointY2 = this.getMousePosition(event, pointX, pointY).y;
            this.slope2 = this.getSlope (this.angle2 , 90);
            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;
            if (this.scene.children[1].name === this.name2) {
                this.resetAdditon();
            }
        });

        (this.imgPoint2 as any).on('mouseup', () => {
            this.moveCtrl2 = false;
        });

        (this.imgPoint2 as any).on('mouseout', () => {
            this.moveCtrl2 = false;
        });

        (this.imgPoint2 as any).on('mousemove', (event: Event) => {


            this.resetThreshold();
            const pointX = (event as any).data.originalEvent.clientX;
            const pointY = (event as any).data.originalEvent.clientY;
                if (this.moveCtrl2) {
                    this.resetTable();
                    this.point2Event(event, pointX, pointY);
                }
        });

        //点2的触摸事件
        (this.imgPoint2 as any).on('touchstart', (event: Event) => {

          let pointX: number;
          let pointY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            pointX = (event as any).data.originalEvent.changedTouches[0].clientX;
            pointY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            pointX = (event as any).data.originalEvent.clientX;
            pointY = (event as any).data.originalEvent.clientY;
          }
            this.moveCtrl2 = true;
            this.lastPointX2 = this.getMousePosition(event, pointX, pointY).x;
            this.lastPointY2 = this.getMousePosition(event, pointX, pointY).y;
            this.slope2 = this.getSlope (this.angle2, 90);
            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;

        });

        (this.imgPoint2 as any).on('touchend', () => {
            this.moveCtrl2 = false;
        });

        (this.imgPoint2 as any).on('touchmove', (event: Event) => {

            this.resetThreshold();
          let pointX: number;
          let pointY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            pointX = (event as any).data.originalEvent.changedTouches[0].clientX;
            pointY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            pointX = (event as any).data.originalEvent.clientX;
            pointY = (event as any).data.originalEvent.clientY;
          }
            if (this.moveCtrl2) {
            this.resetTable();
            this.point2Event(event, pointX, pointY);
            }
        });

        //给点1绑定事件
        (this.imgPoint1 as any).on('mousedown', (event: Event) => {
            const pointX = (event as any).data.originalEvent.clientX;
            const pointY = (event as any).data.originalEvent.clientY;

            this.moveCtrl1 = true;
            this.lastPointX1 = this.getMousePosition(event, pointX, pointY).x;
            this.lastPointY1 = this.getMousePosition(event, pointX, pointY).y;
            this.slope1 = this.getSlope (this.angle1, 90 - 53.13);
            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;
            if (this.scene.children[1].name === this.name1) {
                this.resetAdditon();
            }
        });

        (this.imgPoint1 as any).on('mouseup', () => {
            this.moveCtrl1 = false;
        });

        (this.imgPoint1 as any).on('mouseout', () => {
            this.moveCtrl1 = false;
        });

        (this.imgPoint1 as any).on('mousemove', (event: Event) => {

            this.resetThreshold();
            const pointX = (event as any).data.originalEvent.clientX;
            const pointY = (event as any).data.originalEvent.clientY;

            if (this.moveCtrl1) {
                this.resetTable();
                this.point1Event(event, pointX, pointY);
            }

        });

        //给点1绑定触摸事件
        (this.imgPoint1 as any).on('touchstart', (event: Event) => {
          let pointX: number;
          let pointY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            pointX = (event as any).data.originalEvent.changedTouches[0].clientX;
            pointY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            pointX = (event as any).data.originalEvent.clientX;
            pointY = (event as any).data.originalEvent.clientY;
          }
            this.moveCtrl1 = true;
            this.lastPointX1 = this.getMousePosition(event, pointX, pointY).x;
            this.lastPointY1 = this.getMousePosition(event, pointX, pointY).y;
            this.slope1 = this.getSlope (this.angle1, 90 - 53.13);
            this.intersectionX = this.getIntersection().x;
            this.intersectionY = this.getIntersection().y;
        });

        (this.imgPoint1 as any).on('touchend', () => {
            this.moveCtrl1 = false;
        });

        (this.imgPoint1 as any).on('touchmove', (event: Event) => {
            this.resetThreshold();
          let pointX: number;
          let pointY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            pointX = (event as any).data.originalEvent.changedTouches[0].clientX;
            pointY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            pointX = (event as any).data.originalEvent.clientX;
            pointY = (event as any).data.originalEvent.clientY;
          }
            if (this.moveCtrl1) {
                this.resetTable();
                this.point1Event(event, pointX, pointY);
            }
        });
    }

    //点2的事件所触发的方法
    point2Event(event: any, pointX: number, pointY: number) {
        this.pointX2 = this.getMousePosition(event, pointX, pointY).x;
        this.pointY2 = this.getMousePosition(event, pointX, pointY).y;
        const angle = this.getRotateAngle(this.lastPointX2, this.lastPointY2,
            this.pointX2, this.pointY2, this.slider2.position.x, this.slider2.position.y);
        const isClockWise = this.isClockwise(this.lastPointX2 , this.lastPointY2 ,
            this.pointX2, this.pointY2, this.slider2.position.x, this.slider2.position.y);
        if (isClockWise) {
            this.slider2.rotateZ(angle);
            this.l2Text.rotateZ(-angle);
            //获取旋转的角度值
            if (this.angle2 >= Math.PI * 2) {
                this.angle2 = this.angle2 % (Math.PI * 2);
            }
            this.angle2 += angle;
        } else {
            this.slider2.rotateZ(-angle);
            this.l2Text.rotateZ(angle);
            if (this.angle2 <= -Math.PI * 2) {
                this.angle2 = this.angle2 % (Math.PI * 2);
            }
            this.angle2 -= angle;
        }
        this.lastPointX2 = this.pointX2;
        this.lastPointY2 = this.pointY2;

        this.slope2 = this.getSlope(this.angle2, 90);
        this.intersectionX = this.getIntersection().x;
        this.intersectionY = this.getIntersection().y;
        this.resetArclineAngle();

        this.removeDashLine();
        if (this.createDashLine(this.slider1.position.x, this.slider1.position.y) !== null) {
            this.dashLine1 = this.createDashLine(this.slider1.position.x, this.slider1.position.y);
            this.dashLine2 = this.createDashLine(this.slider1.position.x + this.threshold1,


                this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine3 = this.createDashLine(this.slider1.position.x + this.threshold2,


                this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine4 = this.createDashLine(this.slider1.position.x - this.threshold1,


                -this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine5 = this.createDashLine(this.slider1.position.x - this.threshold2,


                -this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
            this.scene.add(this.dashLine1);
            this.scene.add(this.dashLine2);
            this.scene.add(this.dashLine3);
            this.scene.add(this.dashLine4);
            this.scene.add(this.dashLine5);
        } else  if (this.slope1 === Math.PI / 2 && this.slope2 === Math.PI / 2) {

            this.dashLine1 = this.createDashLine2(this.slider1.position.y);
            this.dashLine2 = this.createDashLine2(this.slider1.position.y + 20);
            this.dashLine3 = this.createDashLine2(this.slider1.position.y + 40);
            this.dashLine4 = this.createDashLine2(this.slider1.position.y - 20);
            this.dashLine5 = this.createDashLine2(this.slider1.position.y - 40);
            this.scene.add(this.dashLine1);
            this.scene.add(this.dashLine2);
            this.scene.add(this.dashLine3);
            this.scene.add(this.dashLine4);
            this.scene.add(this.dashLine5);
        }
    }

    //点1事件所触发的方法
    point1Event(event: any, pointX: number, pointY: number) {
        this.pointX1 = this.getMousePosition(event, pointX, pointY).x;
        this.pointY1 = this.getMousePosition(event, pointX, pointY).y;
        const angle1 = this.getRotateAngle(this.lastPointX1, this.lastPointY1,
            this.pointX1, this.pointY1, this.slider1.position.x, this.slider1.position.y);

        const isClockWise = this.isClockwise(this.lastPointX1 , this.lastPointY1 ,
            this.pointX1, this.pointY1, this.slider1.position.x, this.slider1.position.y);
        if (isClockWise) {
            //逆时针
            this.slider1.rotateZ(angle1);
            this.l1Text.rotateZ(-angle1);
            //获取旋转的总角度
            if (this.angle1 >= Math.PI * 2) {
                this.angle1 = this.angle1 % (Math.PI * 2);
            }
            this.angle1 += angle1;
        } else {
            //顺时针
            this.slider1.rotateZ( - angle1);
            this.l1Text.rotateZ(angle1);
            if (this.angle1 <= -Math.PI * 2) {
                this.angle1 = this.angle1 % (Math.PI * 2);
            }
            this.angle1 -= angle1;
        }

        this.slope1 = this.getSlope (this.angle1 , 90 - 53.13);
        this.lastPointX1 = this.pointX1;
        this.lastPointY1 = this.pointY1;
        this.intersectionX = this.getIntersection().x;
        this.intersectionY = this.getIntersection().y;
        this.resetArclineAngle();

        this.removeDashLine();
        if (this.createDashLine(this.slider1.position.x, this.slider1.position.y) !== null) {
            this.dashLine1 = this.createDashLine(this.slider1.position.x, this.slider1.position.y);
            this.dashLine2 = this.createDashLine(this.slider1.position.x + this.threshold1,
                this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine3 = this.createDashLine(this.slider1.position.x + this.threshold2,
                this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine4 = this.createDashLine(this.slider1.position.x - this.threshold1,
                -this.threshold1 * Math.tan(this.slope1) + this.slider1.position.y);
            this.dashLine5 = this.createDashLine(this.slider1.position.x - this.threshold2,
                -this.threshold2 * Math.tan(this.slope1) + this.slider1.position.y);
            this.scene.add(this.dashLine1);
            this.scene.add(this.dashLine2);
            this.scene.add(this.dashLine3);
            this.scene.add(this.dashLine4);
            this.scene.add(this.dashLine5);
        } else  if (this.slope1 === Math.PI / 2 && this.slope2 === Math.PI / 2) {
            this.dashLine1 = this.createDashLine2(this.slider1.position.y);
            this.dashLine2 = this.createDashLine2(this.slider1.position.y + 20);
            this.dashLine3 = this.createDashLine2(this.slider1.position.y + 40);
            this.dashLine4 = this.createDashLine2(this.slider1.position.y - 20);
            this.dashLine5 = this.createDashLine2(this.slider1.position.y - 40);
            this.scene.add(this.dashLine1);
            this.scene.add(this.dashLine2);
            this.scene.add(this.dashLine3);
            this.scene.add(this.dashLine4);
            this.scene.add(this.dashLine5);
        }
    }

    //判断旋转方向
    isClockwise(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number) {
        const sp = (x1 - x2) * (cy - y2) - (y1 - y2) * (cx - x2);
        return sp > 0 ? false : true;
    }

  //获取鼠标位置并转换成三维世界坐标
    getMousePosition(event: any, x: number, y: number) {
        const vector = new Vector3();

        vector.set((x / this.windowWidth) * 2 - 1,
            (-y / this.windowHeight) * 2 + 1, 0);

        vector.unproject(this.camera);

        const dir = vector.sub(this.camera.position).normalize();

        const distance = -this.camera.position.z / dir.z;

        return  this.camera.position.clone().add(dir.multiplyScalar(distance));
    }

    //获取旋转角度方法
    getRotateAngle(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number) {
        const a = Math.sqrt(Math.pow((x1 - cx), 2) +
            Math.pow((y1 - cy), 2));
        const b = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        const c = Math.sqrt(Math.pow((x2 - cx), 2) +
            Math.pow((y2 - cy), 2));
        return  Math.acos((a * a + c * c - b * b) / (2 * a * c));
    }

    //获取倾斜角计算斜率
    getSlope ( rotateAngle: number, init: number) {
        rotateAngle = rotateAngle * 180 / Math.PI;
        const initAngle = init;
        let slopeAngle: number;
        if (initAngle + rotateAngle <= 180) {
            slopeAngle = initAngle + rotateAngle;
            //倾斜角为90度时的特殊判断
            if (slopeAngle.toFixed(0) === '90') {
                return Math.PI / 2;
            } else if (slopeAngle.toFixed(0) === '-90') {
                return Math.PI / 2;
            } else if (slopeAngle.toFixed(0) === '-270') {
                return Math.PI / 2;
            }
        } else {
            slopeAngle = rotateAngle + initAngle - 180;
            if (slopeAngle.toFixed(0) === '90') {
                return Math.PI / 2;
            }

        }
        return slopeAngle * Math.PI / 180;
    }

    //获取交点
    getIntersection() {
        let x: number;
        let y: number;
        if ( this.slope1 === Math.PI / 2 && this.slope2 !== Math.PI / 2) {
            y = Math.tan(this.slope2) * (this.slider1.position.x - this.slider2.position.x) + this.slider2.position.y;
            x = (y - this.slider2.position.y) / Math.tan(this.slope2) + this.slider2.position.x;
        } else if ( this.slope2 === Math.PI / 2 && this.slope1 !== Math.PI / 2) {
            y = Math.tan(this.slope1) * (this.slider2.position.x - this.slider1.position.x) + this.slider1.position.y;
            x = (y - this.slider1.position.y) / Math.tan(this.slope1) + this.slider1.position.x;
        } else {
            x = (Math.tan(this.slope1) * this.slider1.position.x - this.slider1.position.y -
                Math.tan(this.slope2) * this.slider2.position.x + this.slider2.position.y)
                / (Math.tan(this.slope1) - Math.tan(this.slope2));
            y = Math.tan(this.slope1) * (x - this.slider1.position.x) + this.slider1.position.y;
        }

        return {x, y};
    }

    //根据交点画弧线
    initArcLine() {
        const arcGeometry = new THREE.CircleBufferGeometry(10, 32, 36.87 * Math.PI / 180, 53.13 * Math.PI / 180);
            const arcMaterial = new THREE.MeshBasicMaterial({
                color: 0xE30000,
                transparent: true,
                opacity: 0.5,
                side: DoubleSide
            });
            this.arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
            this.thetaText = Utils.createText('θ', 0, 0, 0, '#FF001F');
            this.arcLine.position.setX(0);
            this.arcLine.position.setY(30);
            this.arcLine.add(this.thetaText);
            this.scene.add(this.arcLine);

    }

    //重新设置弧的角度
    resetArclineAngle() {

        this.removeArcLine();
        let arcGeometry;

        if (this.slope1 < 0 && this.slope1 > -Math.PI) {
            this.slope1 = this.slope1 + Math.PI;
        }

        if (this.slope1 < -Math.PI) {
            this.slope1 = this.slope1 + (Math.PI * 2);
        }

        if (this.slope1 > Math.PI) {
            this.slope1 = this.slope1 - Math.PI;
        }

        if (this.slope2 > Math.PI) {
            this.slope2 = this.slope2 - Math.PI;
        }

        if (this.slope2 < 0 && this.slope2 > -Math.PI) {
            this.slope2 = this.slope2 + Math.PI;
        }

        if (this.slope2 < -Math.PI) {
            this.slope2 = this.slope2 + (Math.PI * 2);
        }

        if (this.slope1 > this.slope2) {
            if ((this.slope1 - this.slope2) > Math.PI / 2) {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, this.slope1 - Math.PI, Math.PI - (this.slope1 - this.slope2));
            } else {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, this.slope2, this.slope1 - this.slope2);
            }
        } else {

            if ((this.slope2 - this.slope1) > Math.PI / 2) {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, this.slope2 - Math.PI, Math.PI - (this.slope2 - this.slope1));
            } else {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, this.slope1, this.slope2 - this.slope1);
            }

        }



        const arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });

        this.thetaText = Utils.createText('θ', 0, 0, 0, '#FF001F');
        this.arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
        this.arcLine.position.setX(this.intersectionX);
        this.arcLine.position.setY(this.intersectionY);
        this.arcLine.add(this.thetaText);
        this.scene.add(this.arcLine);
    }

    //重新设置弧的位置
    resetArcLinePosition() {
        if (this.arcLine !== null) {
            this.arcLine.position.setX(this.intersectionX);
            this.arcLine.position.setY(this.intersectionY);
        }
    }

    //删除弧
    removeArcLine() {
        this.arcLine.remove(this.thetaText);
        this.scene.remove(this.arcLine);
        this.arcLine.geometry.dispose();
        this.arcLine.material.dispose();
    }

    //计算虚线的另一个端点
    getDashLineEndPoint(x1: number, y1: number  ) {
      const x = (y1 - this.slider2.position.y + (Math.tan(this.slope2) * this.slider2.position.x)
          + (x1 / Math.tan(this.slope1))) / (Math.tan(this.slope2) + (1 / Math.tan(this.slope1)));

      const y = Math.tan(this.slope2) * (x - this.slider2.position.x) + this.slider2.position.y;
      return {x , y};

    }

    //当斜率不存在时获取虚线的另一个端点
    getDashLineEndPointSlopeIsNull(y: number) {
        const x = this.slider2.position.x;
        return {x, y};
    }

    //动态创建虚线的方法
    createDashLine(x: number, y: number) {

        let dashLine = null;
        if (this.slope1 !== Math.PI / 2 && this.slope2 !== Math.PI / 2) {

            if (this.slope1.toFixed(3) === this.slope2.toFixed(3)) {
                if ( dashLine == null) {
                    dashLine = this.util.createDashLine(x, y,  this.getDashLineEndPoint( x, y).x,
                        this.getDashLineEndPoint(x, y).y, '#0094FF', 500);
                        (window as any).viewHandler.viewModel.$data.angle = '0°';
                        (window as any).viewHandler.viewModel.$data.k1 = (window as any).viewHandler.viewModel.$data.k2;
                        console.log(1);
                    return dashLine;
                }
            }
            if ((window as any).viewHandler.viewModel.$data.k1 === (window as any).viewHandler.viewModel.$data.k2) {
                if ( dashLine == null) {
                    dashLine = this.util.createDashLine(x, y,  this.getDashLineEndPoint( x, y).x,
                        this.getDashLineEndPoint(x, y).y, '#0094FF', 500);
                    (window as any).viewHandler.viewModel.$data.angle = '0°';
                    return dashLine;
                }
            }
        }
        return dashLine;
    }

    createDashLine2(y: number) {
        let dashLine = null;
        //当两条直线倾斜角为90度时的特殊判断
        if (this.slope1 === Math.PI / 2 && this.slope2 === Math.PI / 2) {
            if (this.slope1.toFixed(2) === this.slope2.toFixed(2)) {
                if ( dashLine == null) {
                    dashLine = this.util.createDashLine(this.slider1.position.x,
                        y,  this.getDashLineEndPointSlopeIsNull(y).x,
                        this.getDashLineEndPointSlopeIsNull(y).y, '#0094FF', 500);
                    return dashLine;
                }
            }
        }
        return dashLine;
    }

    //删除虚线
    removeDashLine() {
        if (this.dashLine1 != null && this.dashLine2 != null && this.dashLine3 != null && this.dashLine4 != null
            && this.dashLine5 != null) {
            this.scene.remove(this.dashLine1);
            this.dashLine1.geometry.dispose();
            this.dashLine1.material.dispose();
            this.dashLine1 = null;
            this.scene.remove(this.dashLine2);
            this.dashLine2.geometry.dispose();
            this.dashLine2.material.dispose();
            this.dashLine2 = null;
            this.scene.remove(this.dashLine3);
            this.dashLine3.geometry.dispose();
            this.dashLine3.material.dispose();
            this.dashLine3 = null;
            this.scene.remove(this.dashLine4);
            this.dashLine4.geometry.dispose();
            this.dashLine4.material.dispose();
            this.dashLine4 = null;
            this.scene.remove(this.dashLine5);
            this.dashLine5.geometry.dispose();
            this.dashLine5.material.dispose();
            this.dashLine5 = null;
        }

    }

    //判断当前斜率大小所使用的平行线的坐标值
    resetThreshold() {
        if (Math.tan(this.slope1) > 30 && Math.tan(this.slope1) < 100) {
            this.threshold1 = 0.8;
            this.threshold2 = 1.6;
        } else if (Math.tan(this.slope1) > 9 && Math.tan(this.slope1) < 30) {
            this.threshold1 = 2;
            this.threshold2 = 4;
        } else if (Math.tan(this.slope1) > 5 && Math.tan(this.slope1) < 9) {
            this.threshold1 = 8;
            this.threshold2 = 16;
        } else if (Math.tan(this.slope1) > 2 && Math.tan(this.slope1) < 5) {
            this.threshold1 = 10;
            this.threshold2 = 20;
        } else if (Math.tan(this.slope1) < 2 ) {
            this.threshold1 = 20;
            this.threshold2 = 40;
        }
    }

    //计算和Y轴的交点坐标
    getYAxisIntersection(x1: number, y1: number, slope: number) {
        return  -slope * x1 + y1;
    }

    //在直线旋转或拖动时改变左侧的表格
    resetTable() {
            (window as any).viewHandler.viewModel.$data.k1 = Math.tan(this.slope1).toFixed(2);
            (window as any).viewHandler.viewModel.$data.k2 = Math.tan(this.slope2).toFixed(2);
            (window as any).viewHandler.viewModel.$data.c1 = (this.getYAxisIntersection(this.slider1.position.x,
                this.slider1.position.y, Math.tan(this.slope1)) / 10).toFixed(2);
            (window as any).viewHandler.viewModel.$data.c2 = (this.getYAxisIntersection(this.slider2.position.x,
                this.slider2.position.y, Math.tan(this.slope2)) / 10).toFixed(2);
        if (this.slope2 === Math.PI / 2) {
            (window as any).viewHandler.viewModel.$data.k2 = '不存在';
            (window as any).viewHandler.viewModel.$data.c2 = 0;
        }
        if (this.slope1 === Math.PI / 2) {
            (window as any).viewHandler.viewModel.$data.k1 = '不存在';
            (window as any).viewHandler.viewModel.$data.c1 = 0;
        }

        if (this.slope2.toFixed(2) > this.slope1.toFixed(2)) {
            if ((this.slope2 - this.slope1) <= Math.PI / 2) {
                const degree = parseFloat(((this.slope2 - this.slope1) * 180 / Math.PI).toFixed(2) );
                (window as any).viewHandler.viewModel.$data.angle = degree + '°';
            } else {
                const degree = parseFloat(((this.slope2 - this.slope1) * 180 / Math.PI).toFixed(2));
                (window as any).viewHandler.viewModel.$data.angle = (180 - degree).toFixed(2) + '°';
            }
        }

        if (this.slope1.toFixed(2) > this.slope2.toFixed(2)) {
            if ((this.slope1 - this.slope2) <= Math.PI / 2) {
                const degree = parseFloat(((this.slope1 - this.slope2) * 180 / Math.PI).toFixed(2) );
                (window as any).viewHandler.viewModel.$data.angle = degree + '°';
            } else {
                const degree = parseFloat(((this.slope1 - this.slope2) * 180 / Math.PI).toFixed(2));
                (window as any).viewHandler.viewModel.$data.angle = (180 - degree).toFixed(2) + '°';
            }
        }
        //当两直线平行的时候
        if ( Math.tan(this.slope1).toFixed(2) === Math.tan(this.slope2).toFixed(2)) {
            (window as any).viewHandler.viewModel.$data.angle = '0°';
        }

    }

    //画角度文字
    createAngleText() {
        this.l1Text = Utils.createImg(3.5, 6, l1, 8, -5);
        this.l2Text = Utils.createImg(3.5, 6, l2, 8, -5);
        this.l1Text.rotateZ(-36.87);
        this.imgPoint1.add(this.l1Text);
        this.imgPoint2.add(this.l2Text);
    }

    //重置按钮功能
    reset() {
        this.slider1.position.set(0, 30, 0);
        this.slider2.position.set(0, -30, 0);
        this.slider1.rotateZ(-this.angle1);
        this.slider2.rotateZ(-this.angle2);
        this.l1Text.rotateZ(this.angle1);
        this.l2Text.rotateZ(this.angle2);
        this.angle1 = 0;
        this.angle2 = 0;
        this.slope1 = this.getSlope (this.angle1, 90 - 53.13);
        this.slope2 = this.getSlope(this.angle2, 90);
        this.removeArcLine();
        this.initArcLine();
        this.resetTable();
        this.thetaText.position.set(0, 0, 0);
        this.removeDashLine();
        (window as any).viewHandler.viewModel.$data.c1 = 3;
    }
}
