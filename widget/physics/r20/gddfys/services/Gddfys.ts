import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {Utils} from './Utils';
import {SliderControlLine} from './SliderControlLine';
import * as bgImg from '../sub_static/UI/background.png';
import * as redImg from '../sub_static/UI/red2.png';
import * as flashLightImg from '../sub_static/UI/flashlight_red.png';
import * as lightScreen from '../sub_static/UI/lightscreen.png';
import * as doubleSlitScreen from '../sub_static/UI/double_slit_screen.png';
import * as buttonImg from '../sub_static/UI/button1.png';
import * as arrowImg from '../sub_static/UI/jiantou.png';
export class Gddfys extends ThreeBase {
    sliderControlLine: SliderControlLine;
    private bgImg = Utils.createImg(0, 80, 2, 1920, 450, bgImg);
    private flashLightImg = Utils.createImg(-300, 30, 2, 165.6, 66.6, flashLightImg);
    private doubleSlitScreen = Utils.createImg(0, 30, 2, 81, 271.8, doubleSlitScreen, );
    private lightScreen = Utils.createImg(300, 31, 2, 129.6, 354.6, lightScreen);
    private buttonImg = Utils.createImg( 0, 200, 2, 71.28, 23.76, buttonImg, );
    private arrowImg = Utils.createImg(25, 200, 3, 10, 10, arrowImg);
    private arrowImg1: any;
    private redImg = Utils.createImg(0, -180, 2, 6, 8, redImg);
    private text = Utils.createText2('单缝间距', -90, 208, 1, '#333333', );
    // 创建缝
    private seam: any;
    // 两条缝间距变化的数值
    private changeNumber: any;
    private count = 0.0003;
    // 创建衍射后的红光点数组
    private redPointArr: any = [];
    private redPointGroup = new THREE.Group();
    private redPointArr1: any = [];
    private redPointGroup1 = new THREE.Group();
    browserInfo: BrowserInfo;
    private render = () => {this.renderer.render(this.scene, this.camera); setTimeout(this.render, 30); };

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
        this.sliderControlLine = new SliderControlLine([this.arrowImg, this.arrowImg1]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }
    /**
     * 初始化场景元素
     */
    initObject() {
        this.text.scale.set(0.4, 0.4, 0.4);
        this.arrowImg.name = 'arrowRight';
        this.arrowImg1 = this.arrowImg.clone();
        this.arrowImg1.name = 'arrowLeft';
        this.arrowImg1.rotation.z = Math.PI;
        this.arrowImg1.position.set( -25, 200, 2 );
        this.changeNumber = Utils.createNumber(`${this.count}m`, 0, 204, 1, '#333333', 0.3);
        this.scene.add(this.bgImg, this.flashLightImg, this.lightScreen, this.doubleSlitScreen, this.buttonImg,
        this.text,  this.arrowImg, this.arrowImg1, this.changeNumber);
        this.creatRedLight();
        this.creatSeam();
        this.creatRedPoint('0.0003');
        this.creatRule();
    }

    /**
     * 创建光源射到光屏上的红光点
     */
    creatRedLight () {
        const material = new THREE.MeshBasicMaterial( { color: 0xF33533, transparent: true, opacity: 0.7 } );
        const geometry = new THREE.CircleBufferGeometry( 8, 160 );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( -4.5, 26, 50 );
        mesh.rotation.y = 0.2 * Math.PI;
        this.scene.add( mesh );
    }
    /**
     * 创建光屏上的缝
     */
    creatSeam () {
        const material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 1 } );
        const geometry = new THREE.PlaneBufferGeometry( 1.2, 40 );
        this.seam = new THREE.Mesh( geometry, material );
        this.seam.position.set( -4.5, 26, 30 );
        this.seam.rotation.y = 0.2 * Math.PI;
        this.seam.rotation.x = -0.2 * Math.PI;
        this.scene.add( this.seam );
    }
    /**
     * 创建刻度尺
     */
    creatRule () {
        // 创建短刻度线条
        for (let i = -9; i <= 9; i ++) {
            const line_short = Utils.createLine(1, 5, '#FFFFFF', );
            line_short.position.set(  i * 31.5, -234, 3);
            this.scene.add(line_short);
        }
        // 创建一条长刻度线条
        const line_long = Utils.createLine(630, 1, '#FFFFFF', );
        line_long.position.set(0, -232, 2);
        // 创建三条中长刻度线条
        const line_long1 = Utils.createLine(1, 10, '#FFFFFF', );
        const line_long2 = line_long1.clone();
        const line_long3 = line_long1.clone();
        line_long1.position.set(0, -236, 4);
        line_long2.position.set(-314, -236, 4);
        line_long3.position.set(314, -236, 4);
        // 创建刻度上文字
        const text1 = Utils.createNumber('10cm', 0, -242, 4, '#FFFFFF', 0.35);
        const text2 = Utils.createNumber('0cm', -314, -242, 4, '#FFFFFF', 0.35);
        const text3 = Utils.createNumber('20cm', 314, -242, 4, '#FFFFFF', 0.35);
        this.scene.add( line_long, line_long1, line_long2, line_long3, text1, text2, text3);
    }
    /**
     * 调整不同单缝间距创建衍射后的一组光点
     */
    creatRedPoint (number: any) {
        // 移动端调整按钮大小
        if (this.height < 500) {
            this.changeNumber.scale.set(0.6, 0.6, 0.6);
            this.buttonImg.scale.set(2, 2, 1);
            this.arrowImg.scale.set(2.5, 2.5, 1);
            this.arrowImg1.scale.set(2.5, 2.5, 1);
            this.arrowImg.position.x = 50;
            this.arrowImg1.position.x = -50;
            this.changeNumber.position.y = 209;
            this.text.position.x = -120;
            this.text.position.y = 209;
        }
        // 不同单缝间距下衍射后光点的情况
        if (number === '0.0003') {
            this.creatPoint(0);
        } else if (number === '0.0004') {
            this.creatPoint(1);
        } else if (number === '0.0005') {
            this.creatPoint(2);
        }
    }

    /**
     * 创建衍射后的三组光点事件
     * @param val
     */
    creatPoint (val: number) {
        this.redPointGroup.remove(...this.redPointArr);
        this.redPointArr = [];
        this.redPointGroup1.remove(...this.redPointArr1);
        this.redPointArr1 = [];
        if (val === 0) {
            this.creat(13, 187, 10, 5, 0.7, this.redPointArr, this.redPointGroup, 7, 13);
            this.creat(13, 180, 10, 5, 0.7, this.redPointArr1, this.redPointGroup1, 6, 13);
        } else if (val === 1) {
            this.creat(18, 187, 7, 6, 0.8, this.redPointArr, this.redPointGroup, 10, 12);
            this.creat(15, 180, 7, 6, 0.8, this.redPointArr1, this.redPointGroup1, 10, 12);
        } else if (val === 2) {
            this.creat(25, 187, 4, 7, 1, this.redPointArr, this.redPointGroup, 20, 12);
            this.creat(25, 180, 4, 7, 1, this.redPointArr1, this.redPointGroup1, 20, 12);
        }
        this.redPointGroup1.position.set(250, 0, 2);
        this.redPointGroup1.scale.set(0.3, 0.3, 1);
        this.redPointGroup1.rotation.z = 0.75 * Math.PI;
    }

    /**
     * 创建衍射后生成的光斑函数
     * @param number1
     * @param number2
     * @param number3
     * @param number4
     * @param number5
     * @param arr
     * @param group
     * @param number6
     * @param number7
     */
    creat (number1: number, number2: number, number3: number, number4: number, number5: number, arr: any, group: any,
           number6: number, number7: number) {
        for (let i = -9; i <= 9; i ++) {
            const copyPoint = this.redImg.clone();
            (copyPoint.material as any) = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(redImg as any),
                transparent: true,
                side: THREE.DoubleSide
            });
            copyPoint.position.set(  i * number1, -number2, 5);
            if (i > 0) {
                (copyPoint.material as any).opacity = 1.1 - i / number3;
                copyPoint.scale.set((number4 - i * 0.4), 10 - number5 * i, 1);
            } else {
                (copyPoint.material as any).opacity = 1.1 + i / number3;
                copyPoint.scale.set((number4 + i  * 0.4), 10 + number5 * i, 1);
            }
            arr.push(copyPoint);
            group.add(copyPoint);
            this.scene.add( group );
        }
        group.children[9].scale.set(number6, number7, 1);
    }

    // 点击按钮上左右箭头调整单缝间距
    // tslint:disable-next-line:member-ordering
    downHandle(name: string) {
        if (name === 'arrowLeft') {
            if (this.count <= 0.00035) {
                this.count = 0.0003;
                return;
            }
            this.count -= 0.0001;
            this.seam.scale.x =  (this.seam.scale.x - this.count * 1000);
            this.changeNum();
        }
        if (name === 'arrowRight') {
            if (this.count >= 0.0005) {
                this.count = 0.0005;
                return;
            }
            this.count += 0.0001;
            this.seam.scale.x =  (this.seam.scale.x + this.count * 1000);
            this.changeNum();
        }
        this.scene.add(this.changeNumber);
    }
    // 切换改变单缝间距函数
    changeNum() {
        const changeNum = (this.count ).toFixed(4);
        this.scene.remove(this.changeNumber);
        this.changeNumber = Utils.createNumber(`${changeNum}m`, 0, 204, 1, '#333333', 0.3);
        this.creatRedPoint(changeNum);
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
     moveHandle(pos: any, name: string): void {
         if (name === 'arrowRight') {
             this.arrowImg.position.x = 25;
             this.arrowImg.position.y = 200;
         }
         if (name === 'arrowLeft') {
             this.arrowImg1.position.x = -25;
             this.arrowImg1.position.y = 200;
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

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.count = 0.0003;
        this.seam.scale.x = 1;
        this.scene.remove(this.changeNumber);
        this.changeNumber = Utils.createNumber(`${this.count}m`, 0, 204, 1, '#333333', 0.3);
        this.scene.add(this.changeNumber);
        this.creatRedPoint('0.0003');
    }
}




