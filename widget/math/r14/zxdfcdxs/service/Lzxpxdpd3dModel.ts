import * as THREE from 'three';
import {
    Vector3,
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';

const dragcontrols = require('three-dragcontrols').default;
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
import * as jiantou from '../sub_static/jiantou.png';
import {Utils} from './Utils';
import {DoubleSide} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';

OBJLoader(THREE);

export class Lzxpxdpd3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    planeMesh: Mesh;
    private controls: any;
    private line1: THREE.Mesh;
    pPoint: any;
    backPoint: any;
    private bigPpoint: THREE.Mesh;
    private jDian: any;

    public pNumText: any;
    private pText: any;

    private thetaText: any;
    private thetaNumText: any;

    private blackColor = '#000000';
    private blueColor = '#0094FF';
    private redColor = '#FF001F';

    private sliderNumer = 45;

    private arcLine: any;
    private arcGeometry: any;
    private arcMaterial: any;

    private jiantou: any;

    private imgControl = false;

    private lastPX: number;
    private lastPY: number;

    private currentPX: number;
    private currentPY: number;

    private lastTouchPX: any;
    private lastTouchPY: any;

    private currentTouchPX: any;
    private currentTouchPY: any;

    private totalAngle = 0;

    private rightAngle1: any;
    private rightAngle2: any;

    private group: THREE.Group;

    public waveImg = document.getElementById('waveImg');
    private boxWidth = document.getElementById('box').getBoundingClientRect().width;
    private boxHeight = document.getElementById('box').getBoundingClientRect().height;

    private render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);
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
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();

        this.createAxis();
        this.createLine();
        this.createpPoint();
        this.createText();
        this.getJDian(45);
        this.createArcLine(45);
        this.dragpPoint();
        this.addImage();
        this.dragImage();
        this.createBlankPlane();
        this.createRightAngle();

        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
    }

    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
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

    /**
     * 初始化光源
     */
    initLight(): void {

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
            arrowX = Utils.createTriangle(105, 2, 105, -2, 115, 0, color);
            arrowY = Utils.createTriangle(2, 105, -2, 105, 0, 115, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.5, 4, color);
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
            arrowX = Utils.createTriangle(105, 1.5, 105, -1.5, 111, 0, color);
            arrowY = Utils.createTriangle(1.5, 105, -1.5, 105, 0, 111, color);
            //创建坐标轴上的刻度
            for (i = 0; i < 21; i++) {
                const a = Utils.createLine(0.25, 2, color);
                const b = Utils.createLine(2, 0.25, color);
                a.position.set(j, 1, 0);
                b.position.set(1, j, 0);
                group.add(a);
                group.add(b);
                j += 10;
            }
        }

        //创建坐标轴上的文字
        const textX = Utils.createText('x', 110, 0, 0, this.blackColor);
        const textY = Utils.createText('y', -3, 115, 0, this.blackColor);
        const textO = Utils.createText2('o', -3, 2.5, 0, this.blackColor);
        //X轴坐标
        const text1 = Utils.createNumber('1', 10, -2, 0, this.blackColor);
        const text2 = Utils.createNumber('5', 50, -2, 0, this.blackColor);
        const text3 = Utils.createNumber('10', 100, -2, 0, this.blackColor);
        const text4 = Utils.createNumber('-1', -10, -2, 0, this.blackColor);
        const text5 = Utils.createNumber('-5', -50, -2, 0, this.blackColor);
        const text6 = Utils.createNumber('-10', -100, -2, 0, this.blackColor);
        //Y轴坐标
        const text7 = Utils.createNumber('1', -4, 12, 0, this.blackColor);
        const text8 = Utils.createNumber('5', -4, 52, 0, this.blackColor);
        const text9 = Utils.createNumber('10', -5, 102, 0, this.blackColor);
        const text10 = Utils.createNumber('-1', -4, -8, 0, this.blackColor);
        const text11 = Utils.createNumber('-5', -4, -48, 0, this.blackColor);
        const text12 = Utils.createNumber('-10', -5, -98, 0, this.blackColor);

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

    //创建直线
    createLine() {
        this.line1 = Utils.createLine1(-0.5, 120, 0.5, 120, -0.5, -120, 0.5, -120, this.blueColor);
        this.line1.rotateZ(-Math.PI / 4);
    }

    //创建点
    createpPoint() {
        if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
            this.bigPpoint = Utils.createPoint(1.5, this.redColor, 0, 0);
            this.bigPpoint.position.z = 2;
            this.pPoint = Utils.createPoint1(8, '#FFFFFF', 10, 10);
            this.backPoint = Utils.createPoint(1.8, this.blackColor, 0, 0);
            this.backPoint.position.z = -0.15;
            this.bigPpoint.add(this.backPoint);
            this.bigPpoint.add(this.line1);
            this.pPoint.add(this.bigPpoint);
        } else {
            this.pPoint = Utils.createPoint(1.5, this.redColor, 10, 10);
            this.backPoint = Utils.createPoint(1.8, this.blackColor, 0, 0);
            this.backPoint.position.z = -0.15;
            this.pPoint.add(this.backPoint);
            this.pPoint.add(this.line1);
        }


        this.scene.add(this.pPoint);
    }

    //获取直线与x轴交点
    getJDian(angle: number) {

        if (angle < 180) {
            this.jDian = Utils.createPoint(1.5, this.redColor,
                this.pPoint.position.x - (this.pPoint.position.y / Math.tan(angle * Math.PI / 180)), 0);
        } else {
            this.jDian = Utils.createPoint(1.5, this.redColor,
                this.pPoint.position.x - (this.pPoint.position.y / Math.tan((-(360 - angle)) * Math.PI / 180)), 0);
        }
    }

    //创建文字
    createText() {

        this.pText = Utils.createText('P', 10, 20, 0, this.blackColor);
        this.pNumText = Utils.createNumber2('(1,1)', 20, 19, 0, this.blackColor);
        this.thetaText = Utils.createText('θ', 20, 11, 0, this.redColor);
        this.thetaNumText = Utils.createNumber2('=45°', 28, 10, 0, this.redColor);

        this.scene.add(this.pText);
        this.scene.add(this.pNumText);

        this.scene.add(this.thetaText);
        this.scene.add(this.thetaNumText);
    }

    /**
     * 为P点添加拖拽事件
     */
    dragpPoint() {

        const dargControls = new dragcontrols([this.pPoint], this.camera, this.renderer.domElement);
        dargControls.addEventListener('dragstart', () => {
            this.controls.enabled = false;
        });

        dargControls.addEventListener('dragend', (event: any) => {
            this.controls.enabled = true;
        });

        dargControls.addEventListener('drag', () => {

            //重新设置方程上的坐标值
            this.resetFormula();
            this.pText.position.x = this.pPoint.position.x;
            this.pText.position.y = this.pPoint.position.y + 10;

            this.pNumText.position.x = this.pText.position.x + 15;
            this.pNumText.position.y = this.pPoint.position.y + 9;

            this.thetaText.position.x = this.jDian.position.x + 20;
            this.thetaText.position.y = 11;

            this.thetaNumText.position.x = this.jDian.position.x + 28;
            this.thetaNumText.position.y = 10;

            if (this.sliderNumer >= 100) {
                this.thetaText.position.x = this.jDian.position.x + 20;
                this.thetaText.position.y = 11;

                this.thetaNumText.position.x = this.jDian.position.x + 30;
                this.thetaNumText.position.y = 10;
            }

            this.pNumText.text = '(' + (this.pPoint.position.x / 10).toFixed(1).toString() + ',' +
                (this.pPoint.position.y / 10).toFixed(1).toString() + ')';

            if ((this.pPoint.position.x / 10).toFixed(1).toString() === '-0.0' ||
                (this.pPoint.position.x / 10).toFixed(1).toString() === '0.0') {
                this.pNumText.text = '(' + 0 + ',' +
                    (this.pPoint.position.y / 10).toFixed(1).toString() + ')';

                this.pNumText.position.x = this.pText.position.x + 12;
            }
            if ((this.pPoint.position.y / 10).toFixed(1).toString() === '-0.0' ||
                (this.pPoint.position.y / 10).toFixed(1).toString() === '0.0') {
                this.pNumText.text = '(' + (this.pPoint.position.x / 10).toFixed(1).toString() + ',' +
                    0 + ')';
                this.pNumText.position.x = this.pText.position.x + 12;
            }
            if (((this.pPoint.position.x / 10).toFixed(1).toString() === '-0.0' ||
                (this.pPoint.position.x / 10).toFixed(1).toString() === '0.0') &&
                ((this.pPoint.position.y / 10).toFixed(1).toString() === '-0.0' ||
                    (this.pPoint.position.y / 10).toFixed(1).toString() === '0.0')) {
                this.pNumText.text = '(' + 0 + ',' + 0 + ')';
                this.pNumText.position.x = this.pText.position.x + 10;

            }

            if (this.jDian !== null) {
                this.jDian.geometry.dispose();
                this.jDian.material.dispose();
                this.getJDian(this.sliderNumer);
            }

            this.arcLine.position.setX(this.jDian.position.x);

            if (this.pPoint.position.x > 100 || this.pPoint.position.x < -100 ||
                this.pPoint.position.y > 100 || this.pPoint.position.y < -100) {
                const num1 = 100;
                const num2 = -100;
                if (this.pPoint.position.x > 100) {
                    this.limitDragX(num1, 17);
                    this.pNumText.text = '(10.0,' + (this.pPoint.position.y / 10).toFixed(1).toString() + ')';

                } else if (this.pPoint.position.x < -100) {
                    this.limitDragX(num2, 19);
                    this.pNumText.text = '(-10.0,' + (this.pPoint.position.y / 10).toFixed(1).toString() + ')';
                }
                if (this.pPoint.position.y > 100) {
                    this.limitDragY(num1);
                    this.pNumText.text = '(' + (this.pPoint.position.x / 10).toFixed(1).toString() + ',10.0)';

                } else if (this.pPoint.position.y < -100) {
                    this.limitDragY(num2);
                    this.pNumText.text = '(' + (this.pPoint.position.x / 10).toFixed(1).toString() + ',-10.0)';
                }
            }

            this.group.position.x = this.pPoint.position.x - 10;

            this.resetTable();
        });
    }

    //合并限制X方向拖拽
    limitDragX(num: number, remainder: number) {
        this.pPoint.position.x = num;
        this.pText.position.x = num;
        this.pNumText.position.x = num + remainder;
        this.thetaText.position.x = this.getLimitJDianPosition(this.sliderNumer, num, this.pPoint.position.y) + 20;
        this.thetaNumText.position.x = this.getLimitJDianPosition(this.sliderNumer, num, this.pPoint.position.y) + 30;
        this.arcLine.position.x = this.getLimitJDianPosition(this.sliderNumer, num, this.pPoint.position.y);
    }

    //合并限制Y方向拖拽
    limitDragY(num: number) {
        this.pPoint.position.y = num;
        this.pText.position.y = num + 10;
        this.pNumText.position.y = num + 9;
        this.thetaText.position.x = this.getLimitJDianPosition(this.sliderNumer, this.pPoint.position.x, num) + 20;
        this.thetaNumText.position.x = this.getLimitJDianPosition(this.sliderNumer, this.pPoint.position.x, num) + 30;
        this.arcLine.position.x = this.getLimitJDianPosition(this.sliderNumer, this.pPoint.position.x, num);
    }

    //获取限制交点的坐标
    getLimitJDianPosition(angle: number, x: number, y: number) {
        let jiaodu: number;
        if (angle < 180) {
            jiaodu = x - (y / Math.tan(angle * Math.PI / 180));
        } else {
            jiaodu = x - (y / Math.tan((-(360 - angle)) * Math.PI / 180));
        }
        return jiaodu;
    }

    //画角度弧线
    createArcLine(num: number) {
        if (num < 180) {
            this.arcGeometry = new THREE.CircleBufferGeometry(10, 32, 0, num * Math.PI / 180);
        } else {
            this.arcGeometry = new THREE.CircleBufferGeometry(10, 32, 0, (num - 180) * Math.PI / 180);
        }
        this.arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });
        this.arcLine = new THREE.Mesh(this.arcGeometry, this.arcMaterial);
        this.arcLine.position.setX(this.jDian.position.x);
        this.scene.add(this.arcLine);
    }

    //滑动滑条转动直线
    rotateLineBySlider(num: number, currentNum: number) {
        this.line1.rotateZ(num * Math.PI / 180);
        this.changeStyle(currentNum);
    }

    //添加箭头图片
    addImage() {

        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load(jiantou as any);
        const geometry = new THREE.PlaneBufferGeometry(20, 7);
        const material = new THREE.MeshBasicMaterial({map: floorTexture, transparent: true});
        this.jiantou = new THREE.Mesh(geometry, material);
        this.jiantou.position.x = 0;
        this.jiantou.position.y = 80;
        this.jiantou.position.z = 0;
        this.line1.add(this.jiantou);

    }

    //创建一个箭头空白面
    createBlankPlane() {
        const geometry = new THREE.PlaneBufferGeometry(60, 60);
        const material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
        const Bplane = new THREE.Mesh(geometry, material);
        this.jiantou.add(Bplane);
    }

    /**
     * 为箭头图片添加拖拽、触摸事件
     */
    dragImage() {
        //鼠标拖拽
        (this.jiantou as any).on('mousedown', (event: any) => {
            (window as any).viewHandler.viewModel.$data.sliderCtrl = false;
            const MousePX = (event as any).data.originalEvent.clientX;
            const MousePY = (event as any).data.originalEvent.clientY;

            this.lastPX = this.getMousePos(event, MousePX, MousePY).x;
            this.lastPY = this.getMousePos(event, MousePX, MousePY).y;
            event.target === this.jiantou ? this.imgControl = true : this.imgControl = false;
        });

        (this.jiantou as any).on('mouseup', () => {
            this.imgControl = false;
            (window as any).viewHandler.viewModel.$data.sliderCtrl = true;
        });

        document.addEventListener('mouseup', () => {
            if ('=' + this.sliderNumer + '°' !== this.thetaNumText.text) {
                this.thetaNumText.text = '=' + this.sliderNumer % 180 + '°';
            }
        });

        (this.jiantou as any).on('mouseout', () => {
            this.imgControl = false;
            (window as any).viewHandler.viewModel.$data.sliderCtrl = true;
        });

        document.addEventListener('mouseout', () => {
            if ('=' + this.sliderNumer + '°' !== this.thetaNumText.text) {
                this.thetaNumText.text = '=' + this.sliderNumer % 180 + '°';
            }
        });

        (this.jiantou as any).on('mousemove', (event: any) => {
            if (!this.imgControl) {
                return;
            }
            const MousePX = (event as any).data.originalEvent.clientX;
            const MousePY = (event as any).data.originalEvent.clientY;

            this.currentPX = this.getMousePos(event, MousePX, MousePY).x;
            this.currentPY = this.getMousePos(event, MousePX, MousePY).y;

            this.integrateCode(this.lastPX, this.lastPY, this.currentPX, this.currentPY);

            this.lastPX = this.currentPX;
            this.lastPY = this.currentPY;

        });

        //触摸事件
        (this.jiantou as any).on('touchstart', (event: any) => {
          let TouchPX: number;
          let TouchPY: number;
            (window as any).viewHandler.viewModel.$data.sliderCtrl = false;
          if ((event as any).data.originalEvent.clientX === undefined) {
            TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
            TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            TouchPX = (event as any).data.originalEvent.clientX;
            TouchPY = (event as any).data.originalEvent.clientY;
          }

            this.lastTouchPX = this.getMousePos(event, TouchPX, TouchPY).x;
            this.lastTouchPY = this.getMousePos(event, TouchPX, TouchPY).y;

            event.target === this.jiantou ? this.imgControl = true : this.imgControl = false;
        });

        (this.jiantou as any).on('touchend', () => {
            this.imgControl = false;
            (window as any).viewHandler.viewModel.$data.sliderCtrl = true;
        });

        document.addEventListener('touchend', () => {
            if ('=' + this.sliderNumer + '°' !== this.thetaNumText.text) {
                this.thetaNumText.text = '=' + this.sliderNumer % 180 + '°';
            }
        });

        (this.jiantou as any).on('touchmove', (event: any) => {

            let TouchPX: number;
            let TouchPY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
            TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            TouchPX = (event as any).data.originalEvent.clientX;
            TouchPY = (event as any).data.originalEvent.clientY;
          }

            if (!this.imgControl) {
                return;
            }
            this.currentTouchPX = this.getMousePos(event, TouchPX, TouchPY).x;
            this.currentTouchPY = this.getMousePos(event, TouchPX, TouchPY).y;

            this.integrateCode(this.lastTouchPX, this.lastTouchPY, this.currentTouchPX, this.currentTouchPY);

            this.lastTouchPX = this.currentTouchPX;
            this.lastTouchPY = this.currentTouchPY;

        });
    }

    //整合箭头图片公用代码
    integrateCode(x1: number, y1: number, x2: number, y2: number) {

        const rotateAngle = this.getAngle(x1, y1, x2, y2, this.pPoint.position.x, this.pPoint.position.y);
        const isClockWise = this.isClockwise(x1, y1, this.pPoint.position.x, this.pPoint.position.y, x2, y2);

        //判断角度值
        if (isClockWise) {
            this.line1.rotateZ(rotateAngle);
        } else {
            this.line1.rotateZ(-rotateAngle);
        }

        const rotationZ = this.line1.rotation.z / Math.PI * 180;
        let theta;
        theta = rotationZ + 90;
        if (-180 <= rotationZ && rotationZ <= -90) {
            theta += 360;
        }

        const thetaNumber = parseFloat(theta.toFixed(0));
        (window as any).viewHandler.viewModel.$data.slidernumber = thetaNumber;
        this.changeStyle(thetaNumber);
    }

    getSliderNumber(sliderNum: number) {
        this.sliderNumer = sliderNum;
    }

    //转换世界坐标为three.js坐标
    getMousePos(event: any, x: number, y: number) {
        const vector = new Vector3();
        vector.set((x / this.boxWidth) * 2 - 1, (-y / this.boxHeight) * 2 + 1, 0);
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
        return {
            x: pos.x,
            y: pos.y
        };
    }

    getAngle(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number): number {
        const a = Math.sqrt(Math.pow((x1 - cx), 2) +
            Math.pow((y1 - cy), 2));
        const b = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        const c = Math.sqrt(Math.pow((x2 - cx), 2) +
            Math.pow((y2 - cy), 2));
        return Math.acos((a * a + c * c - b * b) / (2 * a * c));
    }

    //判断是顺时针还是逆时针旋转
    isClockwise(p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number): boolean {
        const sp = (p1x - p3x) * (p2y - p3y) - (p1y - p3y) * (p2x - p3x);
        return sp > 0 ? false : true;
    }

    //实时获取点的坐标并改变公式中的值
    resetFormula() {
        if (this.pPoint.position.y / 10 > 0) {
            (window as any).viewHandler.viewModel.$data.displayY = '-' + (this.pPoint.position.y / 10).toFixed(1);
        } else {
            (window as any).viewHandler.viewModel.$data.displayY = '+' + (-this.pPoint.position.y / 10).toFixed(1);
        }
        if ((this.pPoint.position.x / 10) > 0) {
            (window as any).viewHandler.viewModel.$data.displayX = '-' + (this.pPoint.position.x / 10).toFixed(1);
        } else {
            (window as any).viewHandler.viewModel.$data.displayX = '+' + (-this.pPoint.position.x / 10).toFixed(1);
        }

    }

    //改变显示字体
    changeStyle(num: number) {

        this.removeArcLine();
        this.getJDian(num);
        this.createArcLine(num);

        //直角
        if (num === 90 || num === 270) {
            this.removeArcLine();
            this.group.visible = true;

        } else {
            this.group.visible = false;
        }

        this.thetaText.position.x = this.jDian.position.x + 20;
        this.thetaText.position.y = 11;

        this.thetaNumText.position.x = this.jDian.position.x + 28;
        this.thetaNumText.position.y = 10;

        if (this.sliderNumer <= 180 && this.sliderNumer > 0) {
            this.thetaNumText.text = '=' + this.sliderNumer + '°';
            this.waveImg.style.width = (this.sliderNumer / 180) * 232 + 'px';
        } else {
            this.waveImg.style.width = ((this.sliderNumer % 180) / 180) * 232 + 'px';
            this.thetaNumText.text = '=' + (this.sliderNumer - 180) + '°';
        }

        if (this.sliderNumer === 0 || this.sliderNumer === 180 || this.sliderNumer === 360) {
            this.thetaText.position.x = 20;
            this.thetaText.position.y = 11;
            this.thetaText.text = 'θ';

            this.thetaNumText.position.x = 28;
            this.thetaNumText.position.y = 10;
            this.thetaNumText.text = '=' + 0 + '°';
        }

        if ((this.sliderNumer >= 100 && this.sliderNumer < 180) || this.sliderNumer >= 280 && this.sliderNumer !== 360) {
            this.thetaText.position.x = this.jDian.position.x + 20;
            this.thetaText.position.y = 11;

            this.thetaNumText.position.x = this.jDian.position.x + 30;
            this.thetaNumText.position.y = 10;
        }
    }

    //画直角标志
    createRightAngle() {
        this.getJDian(90);
        this.group = new THREE.Group();
        this.rightAngle1 = Utils.createLine1(this.pPoint.position.x + 4.5, 0, this.pPoint.position.x + 5.5, 0,
            this.pPoint.position.x + 4.5, this.jDian.position.y + 4, this.pPoint.position.x + 5.5,
            this.jDian.position.y + 4, this.redColor);
        this.group.add(this.rightAngle1);

        this.rightAngle2 = Utils.createLine1(this.pPoint.position.x, this.jDian.position.y + 3.5,
            this.pPoint.position.x, this.jDian.position.y + 4.5,
            this.jDian.position.x + 4, this.jDian.position.y + 3.5, this.jDian.position.x + 5.5,
            this.jDian.position.y + 4.5, this.redColor);
        this.group.add(this.rightAngle2);

        this.scene.add(this.group);
        this.group.visible = false;

    }

    //移除弧线
    removeArcLine() {
        if (this.jDian !== null) {
            this.jDian.geometry.dispose();
            this.jDian.material.dispose();
        }

        if (this.arcLine !== null) {
            this.scene.remove(this.arcLine);
            this.arcLine.geometry.dispose();
            this.arcLine.material.dispose();
        }
    }

    //动态改变右侧面板的方法
    resetTable() {
        if ((window as any).viewHandler.viewModel.$data.displayK === '0') {
            if (this.pPoint.position.y.toFixed(1) > 0) {
                (window as any).viewHandler.viewModel.$data.specialK = -(this.pPoint.position.y / 10).toFixed(1);
                if (this.pPoint.position.y.toFixed(0) === '0') {
                    (window as any).viewHandler.viewModel.$data.specialK = '';
                }
            } else if (this.pPoint.position.y.toFixed(1) < 0) {
                (window as any).viewHandler.viewModel.$data.specialK = '+' + -(this.pPoint.position.y / 10).toFixed(1);
                if (this.pPoint.position.y.toFixed(0) === '-0') {
                    (window as any).viewHandler.viewModel.$data.specialK = '';
                }
            } else {
                (window as any).viewHandler.viewModel.$data.specialK = '';
            }

        } else if ((window as any).viewHandler.viewModel.$data.displayK === '不存在') {
            if (this.pPoint.position.x.toFixed(1) !== '0') {
                (window as any).viewHandler.viewModel.$data.specialX = (this.pPoint.position.x / 10).toFixed(1);
                if (this.pPoint.position.x.toFixed(0) === '-0' || this.pPoint.position.x.toFixed(0) === '0') {
                    (window as any).viewHandler.viewModel.$data.specialX = '0';
                }
            } else {
                (window as any).viewHandler.viewModel.$data.specialX = '0';
            }
        } else {
            console.log(1);
            if (this.pPoint.position.y.toFixed(0) === '-0' || this.pPoint.position.y.toFixed(0) === '0') {
                console.log(2);
                (window as any).viewHandler.viewModel.$data.displayY = '-0';
            }
            if (this.pPoint.position.x.toFixed(0) === '-0' || this.pPoint.position.x.toFixed(0) === '0') {
                console.log(3);
                (window as any).viewHandler.viewModel.$data.displayX = '-0';
            }
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置按钮功能
    reset() {

        this.totalAngle = 0;
        this.pNumText.text = '(1,1)';

        this.pPoint.position.setX(10);
        this.pPoint.position.setY(10);
        this.pText.position.setX(10);
        this.pText.position.setY(20);

        this.pNumText.position.setX(20);
        this.pNumText.position.setY(19);

        this.thetaText.position.setX(20);
        this.thetaText.position.setY(11);

        this.thetaNumText.position.setX(28);
        this.thetaNumText.position.setY(10);

        this.removeArcLine();
        this.getJDian(45);
        this.createArcLine(45);

        setTimeout(() => {
            (window as any).viewHandler.viewModel.$data.displayY = '-1';
            (window as any).viewHandler.viewModel.$data.displayX = '-1';
        }, 50);

    }

}




