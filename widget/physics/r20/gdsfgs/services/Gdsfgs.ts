import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {Utils} from './Utils';
import {SliderControlLine} from './SliderControlLine';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import * as bgImg from '../sub_static/UI/background.png';
import * as redImg from '../sub_static/UI/red.png';
import * as greenImg from '../sub_static/UI/green.png';
import * as blueImg from '../sub_static/UI/blue.png';
import * as flashLightImg from '../sub_static/UI/flashlight_red.png';
import * as flashLightImg1 from '../sub_static/UI/flashlight_green.png';
import * as flashLightImg2 from '../sub_static/UI/flashlight_blue.png';
import * as redButton from '../sub_static/UI/red_button1.png';
import * as blueButton from '../sub_static/UI/blue_button1.png';
import * as greenButton from '../sub_static/UI/green_button1.png';
import * as lightScreen from '../sub_static/UI/lightscreen.png';
import * as doubleSlitScreen from '../sub_static/UI/double_slit_screen.png';
import * as buttonImg from '../sub_static/UI/button1.png';
import * as arrowImg from '../sub_static/UI/jiantou.png';

export class Gdsfgs extends ThreeBase {
    sliderControlLine: SliderControlLine;
    private bgImg = Utils.createImg(0, 80, 2, 1920, 450, bgImg);
    private flashLightImg = Utils.createImg(-300, 30, 2, 165.6, 66.6, flashLightImg);
    private flashLightImg1 = new THREE.TextureLoader().load(flashLightImg as any);
    private flashLightImg2 = new THREE.TextureLoader().load(flashLightImg1 as any);
    private flashLightImg3 = new THREE.TextureLoader().load(flashLightImg2 as any);
    // 创建三个颜色的按钮
    private redButton = ThreeUtil.createImg(35.2, 20.8, redButton, -350, -50, 2, );
    private greenButton = ThreeUtil.createImg(35.2, 20.8, greenButton, -300, -50, 2, );
    private blueButton = ThreeUtil.createImg(35.2, 20.8, blueButton, -250, -50, 2, );
    private doubleSlitScreen = ThreeUtil.createImg(81, 271.8, doubleSlitScreen, 0, 30, 2, );
    private lightScreen = Utils.createImg(250, 25, 2, 125.28, 342.78, lightScreen);
    private buttonImg = ThreeUtil.createImg(71.28, 23.76, buttonImg, 0, 220, 2, );
    private arrowImg = Utils.createImg(25, 220, 3, 10, 10, arrowImg);
    private arrowImg1: any;
    // 创建三种颜色的干涉贴图
    private image = Utils.createImg(0, -180, 2, 6, 8, redImg);
    private redImg = new THREE.TextureLoader().load(redImg as any);
    private greenImg = new THREE.TextureLoader().load(greenImg as any);
    private blueImg = new THREE.TextureLoader().load(blueImg as any);
    private text = Utils.createText2('双缝间距', -90, 228, 1, '#333333', );
    // 创建缝
    private seam1: any;
    private seam2: any;
    // 创建手电筒投在光屏上的光点
    private circleMesh: any;
    // 两条缝间距变化的数值
    private changeNumber: any;
    private count = 0.0003;
    private doubleSlitDis: any;
    // 创建衍射后的红光点数组
    private redPointArr: any = [];
    private redPointGroup = new THREE.Group();
    private redPointArr1: any = [];
    private redPointGroup1 = new THREE.Group();
    // 黑色投影光屏移动所在的x值
    private screenX: number;
    browserInfo: BrowserInfo;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
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
        this.init();
    }

    init(): void {
        this.browserInfo = (window as any)['env'].browserInfo;
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initObject();
        this.initEvt();
        console.warn = function () {
        };
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 600);
    }

    //初始化摄像机位置
    resetCamera(): void {
        // this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor(0x222222);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.arrowImg, this.arrowImg1, this.lightScreen,
            this.redButton, this.blueButton, this.greenButton]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }

    /**
     * 初始化场景元素
     */
    initObject() {
        this.redButton.name = 'redButton';
        this.blueButton.name = 'blueButton';
        this.greenButton.name = 'greenButton';
        this.text.scale.set(0.4, 0.4, 0.4);
        this.lightScreen.name = 'lightScreen';
        this.arrowImg.name = 'arrowRight';
        this.arrowImg1 = this.arrowImg.clone();
        this.arrowImg1.name = 'arrowLeft';
        this.arrowImg1.rotation.z = Math.PI;
        this.arrowImg1.position.set(-25, 220, 2);
        this.screenX = this.lightScreen.position.x;
        this.changeNumber = Utils.createNumber(`${this.count}m`, 0, 224, 1, '#333333', 0.3);
        this.scene.add(this.bgImg, this.flashLightImg, this.lightScreen, this.doubleSlitScreen, this.buttonImg,
            this.text, this.arrowImg, this.arrowImg1, this.changeNumber, this.redButton, this.blueButton, this.greenButton);
        this.creatRedLight();
        this.creatSeam();
        this.creatRule();
        this.doubleSlitDis = Number((this.count).toFixed(4)) * 10000;
        this.redLight();
    }
    /**
     * 创建光源射到光屏上的光点
     */
    creatRedLight() {
        const material = new THREE.MeshBasicMaterial({color: 0xF33533, transparent: true, opacity: 0.7});
        const geometry = new THREE.CircleBufferGeometry(8, 160);
        this.circleMesh = new THREE.Mesh(geometry, material);
        this.circleMesh.position.set(-4.5, 26, 50);
        this.circleMesh.rotation.y = 0.2 * Math.PI;
        this.scene.add(this.circleMesh);
    }
    /**
     * 创建光屏上的缝
     */
    creatSeam() {
        const material = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: 1});
        const geometry = new THREE.PlaneBufferGeometry(2, 60);
        this.seam1 = new THREE.Mesh(geometry, material);
        this.seam2 = this.seam1.clone();
        this.seam1.position.set(-6, 28, 30);
        this.seam2.position.set(-3, 24, 30);
        this.seam1.rotation.y = 0.2 * Math.PI;
        this.seam1.rotation.x = -0.2 * Math.PI;
        this.seam2.rotation.y = 0.2 * Math.PI;
        this.seam2.rotation.x = -0.2 * Math.PI;
        this.scene.add(this.seam1, this.seam2);
    }

    /**
     * 创建刻度尺
     */
    creatRule() {
        // 创建短刻度线条
        for (let i = -9; i <= 9; i++) {
            const line_short = Utils.createLine(1, 5, '#FFFFFF', );
            line_short.position.set(i * 35, -209, 3);
            this.scene.add(line_short);
        }
        // 创建一条长刻度线条
        const line_long = Utils.createLine(700, 1, '#FFFFFF', );
        line_long.position.set(0, -207, 2);
        // 创建三条中长刻度线条
        const line_long1 = Utils.createLine(1, 10, '#FFFFFF', );
        const line_long2 = line_long1.clone();
        const line_long3 = line_long1.clone();
        line_long1.position.set(0, -211, 4);
        line_long2.position.set(-349, -211, 4);
        line_long3.position.set(349, -211, 4);
        // 创建刻度上文字
        const text1 = Utils.createNumber('10cm', 0, -217, 4, '#FFFFFF', 0.35);
        const text2 = Utils.createNumber('0cm', -349, -217, 4, '#FFFFFF', 0.35);
        const text3 = Utils.createNumber('20cm', 349, -217, 4, '#FFFFFF', 0.35);
        this.scene.add(line_long, line_long1, line_long2, line_long3, text1, text2, text3);
    }
    // 创建基本的干涉后的光点组
    creat (number1: number, number2: number, number3: number, number4: number, number5: number, numberL: number, numberD: number,
           img: any, arr: any, group: any, ) {
        for (let i = -5; i <= 5; i++) {
            const copyPoint = this.image.clone();
            (copyPoint.material as any) = new THREE.MeshBasicMaterial({
                map: img,
                transparent: true,
                side: THREE.DoubleSide
            });
            copyPoint.position.set(number1 * i * (numberL / numberD), -185, 5);
            if (i > 0) {
                (copyPoint.material as any).opacity = number4 - i / 30 - numberL / 100 / numberD;
                copyPoint.scale.set((4 - 0.5 * i) * numberL / 200 / numberD * number2,
                    (number3 - i * 0.2) * numberL / 1000 * (numberD * 0.8), 1);
            } else {
                (copyPoint.material as any).opacity = number4 + i / 30 - numberL / 100 / numberD;
                copyPoint.scale.set((4 + 0.5 * i) * numberL / 200 / numberD * number2,
                    (number3 + i * 0.2) * numberL / 1000 * (numberD * 0.8), 1);
            }
            arr.push(copyPoint);
            group.add(copyPoint);
            this.scene.add(group);
        }
        (group.children[2].material as any).opacity = number5 - numberL / 500;
        (group.children[8].material as any).opacity = number5 - numberL / 500;
    }

    /**
     * 创建衍射后的三组光点事件
     * @param val
     */
    creatPoint (val: number, numL: number, numD: number, ) {
        this.redPointGroup.remove(...this.redPointArr);
        this.redPointArr = [];
        this.redPointGroup1.remove(...this.redPointArr1);
        this.redPointArr1 = [];
        if (val === 0) {
            this.creat(0.51, 4.5, 2.0, 1.2, 0.5, numL, numD, this.redImg, this.redPointArr, this.redPointGroup);
            this.creat(0.51, 4.5, 2.0, 1.2, 0.5, numL, numD, this.redImg, this.redPointArr1, this.redPointGroup1);
        } else if (val === 1) {
            this.creat(0.36, 3.75, 2.1, 1.4, 0.7, numL, numD, this.greenImg, this.redPointArr, this.redPointGroup);
            this.creat(0.36, 3.75, 2.1, 1.4, 0.7, numL, numD, this.greenImg, this.redPointArr1, this.redPointGroup1);
        } else if (val === 2) {
            this.creat(0.34, 3.6, 2.1, 1.3, 0.7, numL, numD, this.blueImg, this.redPointArr, this.redPointGroup);
            this.creat(0.34, 3.6, 2.1, 1.3, 0.7, numL, numD, this.blueImg, this.redPointArr1, this.redPointGroup1);
        }
        this.redPointGroup1.position.set(numL - 35, -16, 2);
        this.redPointGroup1.scale.set(0.3, 0.3, 1);
        this.redPointGroup1.rotation.z = 0.795 * Math.PI;
    }
    /**
     * 创建干射后的一组红色光点
     */
    creatArrPoint (number: any, numL: number, numD: number, ) {
        // 移动端调整按钮大小
        if (this.height < 500) {
            this.changeNumber.scale.set(0.6, 0.6, 0.6);
            this.buttonImg.scale.set(2, 2, 1);
            this.arrowImg.scale.set(2.5, 2.5, 1);
            this.arrowImg1.scale.set(2.5, 2.5, 1);
            this.arrowImg.position.x = 50;
            this.arrowImg1.position.x = -50;
            this.changeNumber.position.y = 229;
            this.text.position.x = -120;
            this.text.position.y = 229;
        }
        // 不同单缝间距下衍射后光点的情况
        if (number === 1) {
            this.creatPoint(0, numL, numD);
        } else if (number === 2) {
            this.creatPoint(1, numL, numD);
        } else if (number === 3) {
            this.creatPoint(2, numL, numD);
        }
    }
    // 点击切换双缝距离、光源函数
    // tslint:disable-next-line:member-ordering
    downHandle(name: string) {
        if (name === 'arrowLeft') {
            if (this.count <= 0.00035) {
                this.count = 0.0003;
                return;
            }
            this.count -= 0.0001;
            this.changeNum(3, 6, 27);
        }
        if (name === 'arrowRight') {
            if (this.count >= 0.0005) {
                this.count = 0.0005;
                return;
            }
            this.count += 0.0001;
            this.changeNum(3, 5, 26);
        }
        this.scene.add(this.changeNumber);
        this.doubleSlitDis = Number((this.count).toFixed(4)) * 10000;
        this.flashLightEvent();
        if (name === 'redButton') {
            (this.flashLightImg as any).material.map = this.flashLightImg1;
            (this.circleMesh as any).material.color = new THREE.Color(0xF33533);
            this.creatArrPoint(1, this.screenX, this.doubleSlitDis);
        } else if (name === 'greenButton') {
            (this.flashLightImg as any).material.map = this.flashLightImg2;
            (this.circleMesh as any).material.color = new THREE.Color(0x38D166);
            this.creatArrPoint(2, this.screenX, this.doubleSlitDis);
        } else if (name === 'blueButton') {
            (this.flashLightImg as any).material.map = this.flashLightImg3;
            (this.circleMesh as any).material.color = new THREE.Color(0x3880D1);
            this.creatArrPoint(3, this.screenX, this.doubleSlitDis);
        }
    }
    // 切换改变单缝间距函数
    changeNum(num1: number, num2: number, num3: number) {
        this.seam1.position.x = -num1 - this.count * 10000;
        this.seam2.position.x = this.count * 10000 - num2;
        this.seam2.position.y = num3 - this.count * 10000;
        const changeNum = Number((this.count).toFixed(4));
        this.scene.remove(this.changeNumber);
        this.changeNumber = Utils.createNumber(`${changeNum}m`, 0, 224, 1, '#333333', 0.3);
    }
    //移动黑色光屏位置函数
    // tslint:disable-next-line:member-ordering
    moveHandle(pos: any, name: string): void {
        if (name === 'arrowRight') {
            this.arrowImg.position.x = 25;
            this.arrowImg.position.y = 220;
        } else if (name === 'arrowLeft') {
            this.arrowImg1.position.x = -25;
            this.arrowImg1.position.y = 220;
        } else if (name === 'redButton' || name === 'greenButton' || name === 'blueButton') {
            this.redButton.position.x = -350;
            this.redButton.position.y = -50;
            this.greenButton.position.x = -300;
            this.greenButton.position.y = -50;
            this.blueButton.position.x = -250;
            this.blueButton.position.y = -50;
        } else if (name === 'lightScreen') {
            let {x, y} = pos;
            x = x < 296.5 ? x < 122.5 ? 122.5 : x : 296.5;
            y = 25;
            this.lightScreen.position.set(x, y, 2);
            this.screenX = x;
            this.flashLightEvent();
        }
        if (this.height < 500) {
            if (name === 'arrowRight') {
                this.arrowImg.position.x = 50;
            }
            if (name === 'arrowLeft') {
                this.arrowImg1.position.x = -50;
            }
        }
    }
    // 判断根据不同颜色的光源执行不同的干涉效果函数
    flashLightEvent() {
        if ((this.flashLightImg as any).material.map === this.flashLightImg1) {
            this.creatArrPoint(1, this.screenX, this.doubleSlitDis);
        } else if ((this.flashLightImg as any).material.map === this.flashLightImg2) {
            this.creatArrPoint(2, this.screenX, this.doubleSlitDis);
        } else if ((this.flashLightImg as any).material.map === this.flashLightImg3) {
            this.creatArrPoint(3, this.screenX, this.doubleSlitDis);
        }
    }
    // 初始场景加载红色光源双缝干涉事件
    redLight() {
        (this.flashLightImg as any).material.map = this.flashLightImg1;
        (this.circleMesh as any).material.color = new THREE.Color(0xF33533);
        this.creatArrPoint(1, this.screenX, this.doubleSlitDis);
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.count = 0.0003;
        this.lightScreen.position.x = 250;
        this.seam1.position.set(-6, 28, 30);
        this.seam2.position.set(-3, 24, 30);
        this.scene.remove(this.changeNumber);
        this.doubleSlitDis = Number((this.count).toFixed(4)) * 10000;
        this.changeNumber = Utils.createNumber(`${this.count}m`, 0, 224, 1, '#333333', 0.3);
        this.scene.add(this.changeNumber);
        this.screenX = this.lightScreen.position.x;
        this.redLight();
    }
}




