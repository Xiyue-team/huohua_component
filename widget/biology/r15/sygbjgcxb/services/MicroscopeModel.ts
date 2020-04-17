import * as THREE from 'three';
import {PerspectiveCamera, } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ViewController} from '../../../../../src/core/ViewController';
import {SliderControlLine} from './SliderControlLine';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as step3Img from '../sub_static/images/Step6.png';
import * as step4Img from '../sub_static/images/Step8.png';
import {WebGLRenderer} from 'three';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
OBJLoader(THREE);

export class MicroscopeModel extends ThreeBase {

    browserInfo: BrowserInfo;
    //控制对象
    sliderControlLine1: SliderControlLine;
    private orbit: any;
    private controls: any;
    //反光镜滑点
    public controlPoint: any;
    //粗准焦螺旋滑点
    public bigControlPoint: any;
    //x10细准焦滑点
    public smallControlPoint1: any;
    //x40细准焦滑点
    public smallControlPoint2: any;
    private isEnd: any;
    //粗细准焦螺旋
    public smallScrew: any;
    public bigScrew: any;
    public timerControl: any;
    public timerControl1: any;
    public timerControl2: any;
    //反光镜
    public poll: any;
    public imgStoreObj1: any;
    public imgStoreObj2: any;
    public imgStoreObj3: any;
    public imgStoreObj4: any;
    // 反光镜支架
    public poll1: any;
    //三组动画预加载存储数组
    public store: any = [];
    public store1: any = [];
    public store2: any = [];
    // 屏幕宽高尺寸
    public screenWidth: any;
    public screenHeight: any;
    //显微镜
    public micScope: any;
    //粗准焦能否拖动
    public canDrag1: any;
    //细准焦x40能否拖动
    public canDrag2: any;
    //细准焦x10能否拖动
    public canDrag3: any;
    //粗准焦点
    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
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
        ViewController.getInstance().hideLoading();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.isEnd = false;
        this.canDrag1 = true;
        this.canDrag2 = true;
        this.canDrag3 = true;
        this.screenWidth = document.getElementById('Container').clientWidth;
        this.screenHeight = document.getElementById('Container').clientHeight;
    }

    init() {
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        this.initElement();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        console.warn = function () {
        };
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
    }

    initElement() {
        //旋转中心
        //x10显微镜
        const imgObj1 = require(`../sub_static/images/Tp1.jpg`);
        //反光镜
        const imgObj2 = require(`../sub_static/images/fgjing.jpg`);
        // 反光镜支架
        const imgObj7 = require(`../sub_static/images/zhijia.png`);
        //滑点
        this.imgStoreObj2 = require(`../sub_static/images/redPoint.png`);
        //粗细准焦
        const imgObj3 = require(`../sub_static/images/bigzhuanjiao.jpg`);
        const imgObj4 = require(`../sub_static/images/bigzhuanjiao.jpg`);
        //x40显微镜
        const imgObj5 = require(`../sub_static/images/Tp3.jpg`);
        //x10显微镜
        const imgObj6 = require(`../sub_static/images/Tp2.jpg`);
        //三组显微镜
        this.imgStoreObj1 = this.addTexture(imgObj1);
        this.imgStoreObj4 = this.addTexture(imgObj6);
        this.imgStoreObj3 = this.addTexture(imgObj5);
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            this.micScope = this.planeTexture(imgObj1, 270, 399);
            this.micScope.position.set(0, 0, 0);
            //反光镜
            this.poll = this.planeTexture(imgObj2, 45, 31.6);
            this.poll.rotation.z = (-45 / 180 * Math.PI);
            this.poll.position.set(35, -120, 10);
            this.controlPoint = this.circleTexture(this.imgStoreObj2, 22, 36, 36);
            this.controlPoint.position.set(50, -165, 10);
            // 反光镜支架
            this.poll1 = this.planeTexture(imgObj7, 72, 72);
            this.poll1.position.set(36, -117, 11);
            this.scene.add(this.poll, this.poll1);
            this.initAction();
            //粗准焦
            this.bigScrew = this.circleTexture(imgObj3, 21.7, 50, 50);
            //细准焦
            this.smallScrew = this.circleTexture(imgObj4, 14.7, 50, 50);
            this.bigScrew.position.set(8.8, 65.2, 10);
            this.smallScrew.position.set(-20.8, 19.5, 10);
        } else {
            this.micScope = this.planeTexture(imgObj1, 390, 598);
            this.micScope.position.set(0, 0, 0);
            //杆子
            this.poll = this.planeTexture(imgObj2, 60, 43);
            this.poll.rotation.z = (-45 / 180 * Math.PI);
            this.poll.position.set(54, -180, 10);
            this.controlPoint = this.circleTexture(this.imgStoreObj2, 40, 36, 36);
            this.controlPoint.position.set(75, -250, 10);
            // 反光镜支架
            this.poll1 = this.planeTexture(imgObj7, 115, 115);
            this.poll1.position.set(58, -180, 11);
            this.scene.add(this.poll, this.poll1);
            this.initAction();
            //粗准焦
            this.bigScrew = this.circleTexture(imgObj3, 34, 36, 36);
            //细准焦
            this.smallScrew = this.circleTexture(imgObj4, 24, 36, 36);
            this.bigScrew.position.set(13, 98, 10);
            this.smallScrew.position.set(-32, 28, 10);
        }
    }

    initAction() {
        if (this.controlPoint) {
            this.sliderControlLine1 = new SliderControlLine(this.controlPoint, {controlPoint: this.controlPoint, poll: this.poll});
            this.sliderControlLine1.initEvent(this.camera, this.renderer);
        }
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera = new THREE.PerspectiveCamera(45, (this.width) / this.height, 1, 1000);
        this.camera.position.set(0, 0, 900);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];
        this.scene.add(new THREE.AmbientLight(0x666666));
        this.lights[0] = new THREE.DirectionalLight(0xdfebff, 1);
        this.lights[0].position.set(50, 200, 100);
        this.lights[0].position.multiplyScalar(1.3);
        this.scene.add(this.lights[0]);
    }
    //反光镜预加载
    animateImg() {
        const that = this;
        const imgArr: any = [];
        return new Promise((resolve, reject) => {
            for (let j = 0; j < 19; j++) {
                imgArr[j] = j;
            }
            imgArr.forEach((val: any, index: any) => {
                const SrcString = require('../sub_static/imgList3/img' + (val + 1) + '.jpg');
                const texture = that.addTexture(SrcString);
                that.store[index] = texture;
                if (that.store.length >= 19) {
                    resolve();
                }
            });
        });
    }
    //x10预加载
    animateImg1() {
        const that = this;
        const imgArr: any = [];
        return new Promise((resolve, reject) => {
            for (let j = 0; j < 15; j++) {
                imgArr[j] = j;
            }
            imgArr.forEach((val: any, index: any) => {
                const SrcString = require('../sub_static/imgList1/img' + (val + 1) + '.jpg');
                const texture = that.addTexture(SrcString);
                that.store1[index] = texture;
                if (that.store1.length >= 15) {
                    resolve();
                }
            });
        });
    }
    //x40预加载
    animateImg2() {
        const that = this;
        const imgArr: any = [];
        return new Promise((resolve, reject) => {
            for (let j = 0; j < 15; j++) {
                imgArr[j] = j;
            }
            imgArr.forEach((val: any, index: any) => {
                const SrcString = require('../sub_static/imgList2/img' + (val + 1) + '.jpg');
                const texture = that.addTexture(SrcString);
                that.store2[index] = texture;
                if (that.store2.length >= 15) {
                    resolve();
                }
            });
        });
    }

    //反光镜事件处理
    reflectorHandler(pos: any, obj: any) {
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            const px = pos.x - 35;
            const py = pos.y + 120;
            const dis = 47.4;
            const angleRadian = Math.atan2(py, px);
            const angle = angleRadian * 180 / Math.PI;
            let offsetX = dis * Math.cos(-angleRadian);
            let offsetY = dis * Math.sin(-angleRadian);
            if (!this.isEnd) {
                if (angle > -75 && angle < -25) {
                    obj.poll.rotation.z = (angle + 25) / 180 * Math.PI;
                    obj.controlPoint.position.set(offsetX + 35, -120 - offsetY, 10);
                    (window as any).viewHandler.viewModel.$data.viewOpacity = (0.02 * (-angle - 25));
                }
                if (angle <= -75) {
                    offsetX = 47.4 * Math.cos(75 / 180 * Math.PI);
                    offsetY = dis * Math.sin(75 / 180 * Math.PI);
                    obj.poll.rotation.z = (-45) / 180 * Math.PI;
                    obj.controlPoint.position.set(offsetX + 35, -120 - offsetY, 10);
                }
                if (angle >= -25) {
                    offsetX = dis * Math.cos(25 / 180 * Math.PI);
                    offsetY = dis * Math.sin(25 / 180 * Math.PI);
                    obj.poll.rotation.z = 0 / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.viewOpacity = 0;
                    obj.controlPoint.position.set(offsetX + 35, -120 - offsetY, 10);
                }
            }
        } else {
            const px = pos.x - 55;
            const py = pos.y + 180;
            const dis = Math.sqrt((Math.pow(20, 2) + Math.pow(70, 2)));
            const angleRadian = Math.atan2(py, px);
            const angle = angleRadian * 180 / Math.PI;
            let offsetX = dis * Math.cos(-angleRadian);
            let offsetY = dis * Math.sin(-angleRadian);
            if (!this.isEnd) {
                if (angle <= -75) {
                    offsetX = dis * Math.cos(75 / 180 * Math.PI);
                    offsetY = dis * Math.sin(75 / 180 * Math.PI);
                    obj.poll.rotation.z = (-45) / 180 * Math.PI;
                    obj.controlPoint.position.set(offsetX + 55, -180 - offsetY, 10);
                    (window as any).viewHandler.viewModel.$data.viewOpacity = 1;
                }

                if (angle >= -25) {
                    offsetX = dis * Math.cos(25 / 180 * Math.PI);
                    offsetY = dis * Math.sin(25 / 180 * Math.PI);
                    obj.poll.rotation.z = 0;
                    obj.controlPoint.position.set(offsetX + 55, -180 - offsetY, 10);
                    (window as any).viewHandler.viewModel.$data.viewOpacity = 0;
                }
                if (angle > -75 && angle < -25) {
                    obj.controlPoint.position.set(offsetX + 55, -180 - offsetY, 10);
                    // obj.poll.rotation.z = 0 / 180 * Math.PI;
                    obj.poll.rotation.z = (angle + 25) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.viewOpacity = (0.02 * (-angle - 25));
                }
            }
        }
    }
    //判断反光镜是否到达最大旋转角度
    judgeReflectorPosition(pos: any, obj: any) {
        if ((window as any).viewHandler.viewModel.$data.viewOpacity <= 0.05) {
            obj.controlPoint.material.opacity = 0;
            this.isEnd = true;
            (window as any).viewHandler.viewModel.$data.step1 = false;
            (window as any).viewHandler.viewModel.$data.step2 = true;
            obj.poll.rotation.z = 0;
            return;
        }
    }
    //粗准焦
    doNextStep3() {
        (window as any).viewHandler.viewModel.$data.step2 = false;
        (window as any).viewHandler.viewModel.$data.step3 = true;
        this.smallScrew.material.opacity = 1;
        this.bigScrew.material.opacity = 1;
        this.poll.material.opacity = 1;
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            if (this.bigControlPoint) {
                this.bigControlPoint.material.opacity = 1;
            } else {
                this.bigControlPoint = this.circleTexture(this.imgStoreObj2, 22, 36, 36);
            }
            this.bigControlPoint.position.set(-32, 100, 10);
        } else {
            //手机端
            if (this.bigControlPoint) {
                this.bigControlPoint.material.opacity = 1;
            } else {
                this.bigControlPoint = this.circleTexture(this.imgStoreObj2, 40, 36, 36);
            }
            this.bigControlPoint.position.set(-30, 160, 10);
        }
        this.canDrag1 = true;
        this.sliderControlLine1 = new SliderControlLine(this.bigControlPoint, {
            bigScrew: this.bigScrew,
            bigControlPoint: this.bigControlPoint
        });
        this.sliderControlLine1.initEvent(this.camera, this.renderer);
    }

    //粗准焦事件绑定
    bigHandler(pos: any, obj: any) {
        //鼠标x位置
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            const px = pos.x - 9.6;
            const py = pos.y - 65;
            const angleRadian = Math.atan2(py, px);
            const angle1 = (angleRadian) * 180 / Math.PI;
            //转换后的角度
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            const angle2 = 180 - angle1;
            let offsetX = 55 * Math.cos(angle2 / 180 * Math.PI);
            let offsetY = 55 * Math.sin(angle2 / 180 * Math.PI);
            if (this.canDrag1) {
                if (angle2 >= 45 && (angle2 < 186)) {
                    offsetX = 55 * Math.cos(45 / 180 * Math.PI);
                    offsetY = 55 * Math.sin(45 / 180 * Math.PI);
                    obj.bigScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.bigControlPoint.position.set(9.6 - offsetX, offsetY + 65, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }

                if (angle2 >= 186) {
                    offsetX = 55 * Math.cos(0 / 180 * Math.PI);
                    offsetY = 55 * Math.sin(0 / 180 * Math.PI);
                    obj.bigScrew.rotation.z = 78.8 / 180 * Math.PI;
                    obj.bigControlPoint.position.set(9.6 - offsetX, offsetY + 65, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if ((angle2 < 45 && angle2 > 0)) {
                    obj.bigControlPoint.position.set(9.6 - offsetX, offsetY + 65, 10);
                    obj.bigScrew.rotation.z = ((-angle2 + 45) * 1.75) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 0.16 * angle2;
                }
            }
        } else {
            const px = pos.x - 13;
            const py = pos.y - 98;
            const angleRadian = Math.atan2(py, px);
            const angle1 = (angleRadian) * 180 / Math.PI;
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            //转换后的角度
            const angle2 = 180 - angle1;
            let offsetX = 76 * Math.cos(angle2 / 180 * Math.PI);
            let offsetY = 76 * Math.sin(angle2 / 180 * Math.PI);
            if (this.canDrag1) {
                if (angle2 >= 55 && (angle2 < 186)) {
                    offsetX = 76 * Math.cos(55 / 180 * Math.PI);
                    offsetY = 76 * Math.sin(55 / 180 * Math.PI);
                    obj.bigScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.bigControlPoint.position.set(13 - offsetX, offsetY + 98, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }
                if (angle2 >= 186) {
                    offsetX = 76 * Math.cos(0 / 180 * Math.PI);
                    offsetY = 76 * Math.sin(0 / 180 * Math.PI);
                    obj.bigScrew.rotation.z = 78.8 / 180 * Math.PI;
                    obj.bigControlPoint.position.set(13 - offsetX, offsetY + 98, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if ((angle2 < 55 && angle2 > 0)) {
                    obj.bigControlPoint.position.set(13 - offsetX, offsetY + 98, 10);
                    obj.bigScrew.rotation.z = ((-angle2 + 45) * 1.75) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 0.05 * angle2;
                }
            }
        }
    }

    //判断粗准焦是否到达最大范围
    judgeBigPosition(pos: any, obj: any) {
        if ((window as any).viewHandler.viewModel.$data.filterval <= 0.8) {
            if (obj.bigControlPoint) {
                obj.bigControlPoint.material.opacity = 0;
            }
            this.canDrag1 = false;
            (window as any).viewHandler.viewModel.$data.step3 = false;
            (window as any).viewHandler.viewModel.$data.step4 = true;
            (window as any).viewHandler.viewModel.$data.step6 = false;
        }
    }
    //细准焦X10事件
    doNextStep4() {
        clearTimeout(this.timerControl1);
        clearTimeout(this.timerControl2);
        this.smallScrew.material.opacity = 1;
        this.bigScrew.material.opacity = 1;
        (window as any).viewHandler.viewModel.$data.filterval = 6;
        //以下一行是修改添加的代码
        (window as any).viewHandler.viewModel.$data.imgSrc = step3Img;
        //
        (window as any).viewHandler.viewModel.$data.step4 = false;
        (window as any).viewHandler.viewModel.$data.step5 = true;
        if (this.smallControlPoint2) {
            this.smallControlPoint2.material.opacity = 0;
        }
        this.micScope.material.map = this.imgStoreObj4;
        this.poll.material.opacity = 1;
        if (this.smallControlPoint1) {
            this.smallControlPoint1.material.opacity = 1;
            if (this.screenWidth > 500 && this.screenHeight > 500) {
                this.smallControlPoint1.position.set(-60, 50, 10);
            } else {
                this.smallControlPoint1.position.set(-80, 70, 10);
            }
        } else {
            if (this.screenWidth > 500 && this.screenHeight > 500) {
                this.smallControlPoint1 = this.circleTexture(this.imgStoreObj2, 22, 36, 36);
                this.smallControlPoint1.position.set(-60, 50, 10);
            } else {
                this.smallControlPoint1 = this.circleTexture(this.imgStoreObj2, 40, 36, 36);
                this.smallControlPoint1.position.set(-80, 70, 10);
            }
        }
        this.sliderControlLine1 = new SliderControlLine(this.smallControlPoint1,
            {smallScrew: this.smallScrew, smallControlPoint1: this.smallControlPoint1});
        this.sliderControlLine1.initEvent(this.camera, this.renderer);
        this.canDrag3 = true;
        this.canDrag2 = false;
        this.smallScrew.rotation.z = (0 / 180 * Math.PI);
    }

    //细准焦X10事件绑定
    smallHandlerX10(pos: any, obj: any) {
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            const px = pos.x + 26;
            const py = pos.y - 20;
            const angleRadian = Math.atan2(py, px);
            const angle1 = angleRadian * 180 / Math.PI;
            const dis = Math.sqrt((Math.pow(34, 2) + Math.pow(30, 2)));
            let offsetX = dis * Math.cos(angleRadian);
            let offsetY = dis * Math.sin(-angleRadian);
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            if (this.canDrag3) {
                if (angle1 <= 135 && flag > (-8)) {
                    offsetX = dis * Math.cos(135 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-135 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }
                if (angle1 <= (-8)) {
                    offsetX = dis * Math.cos(178 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 86.4 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if (angle1 >= 178) {
                    offsetX = dis * Math.cos(178 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 86.4 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if (angle1 > 135 && angle1 < 178) {
                    obj.smallControlPoint1.position.set(offsetX - 26, -offsetY + 20, 10);
                    obj.smallScrew.rotation.z = ((angle1 - 135) * 1.35) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 6 - 0.13 * (angle1 - 135);
                }
                (window as any).viewHandler.viewModel.$data.step6 = false;
            }
        } else {
            const px = pos.x + 32;
            const py = pos.y - 28;
            const angleRadian = Math.atan2(py, px);
            const angle1 = angleRadian * 180 / Math.PI;
            let offsetX = 63.8 * Math.cos(angleRadian);
            let offsetY = 63.8 * Math.sin(-angleRadian);
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            if (this.canDrag3) {
                if (angle1 <= 135 && angle1 > (-8)) {
                    offsetX = 63.8 * Math.cos(135 / 180 * Math.PI);
                    offsetY = 63.8 * Math.sin(-135 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 32, -offsetY + 28, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }
                if (angle1 < (-8)) {
                    offsetX = 63.8 * Math.cos(178 / 180 * Math.PI);
                    offsetY = 63.8 * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 86.4 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 32, -offsetY + 28, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if (angle1 >= 178) {
                    offsetX = 63.8 * Math.cos(178 / 180 * Math.PI);
                    offsetY = 63.8 * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 86.4 / 180 * Math.PI;
                    obj.smallControlPoint1.position.set(offsetX - 32, -offsetY + 28, 10);
                }
                if (angle1 > 135 && angle1 < 178) {
                    obj.smallControlPoint1.position.set(offsetX - 32, -offsetY + 28, 10);
                    obj.smallScrew.rotation.z = ((angle1 - 135) * 1.35) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 6 - 0.14 * (angle1 - 135);
                }
                if ((window as any).viewHandler.viewModel.$data.filterval <= 1) {
                    obj.smallControlPoint1.material.opacity = 0;
                    (window as any).viewHandler.viewModel.$data.step6 = true;
                    (window as any).viewHandler.viewModel.$data.step5 = false;
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                    obj.smallScrew.rotation.z = 60 / 180 * Math.PI;
                    this.canDrag3 = false;
                }
                (window as any).viewHandler.viewModel.$data.step6 = false;
            }
        }
    }

    //判断细准焦是否到最大旋转范围(x10)
    judgeSmallPosition(pos: any, obj: any) {
        (window as any).viewHandler.viewModel.$data.step6 = false;
        if ((window as any).viewHandler.viewModel.$data.filterval <= 1) {
            if (obj.smallControlPoint1) {
                obj.smallControlPoint1.material.opacity = 0;
            }
            this.canDrag3 = false;
            (window as any).viewHandler.viewModel.$data.step6 = true;
            (window as any).viewHandler.viewModel.$data.step5 = false;
        }
    }

    //细准焦X40事件
    doNextStep5() {
        clearTimeout(this.timerControl1);
        clearTimeout(this.timerControl2);
        (window as any).viewHandler.viewModel.$data.filterval = 6;
        //以下一行是修改添加的代码
        (window as any).viewHandler.viewModel.$data.imgSrc = step4Img;
        //
        (window as any).viewHandler.viewModel.$data.step4 = false;
        (window as any).viewHandler.viewModel.$data.step5 = true;
        this.micScope.material.map = this.imgStoreObj3;
        this.smallScrew.material.opacity = 1;
        this.bigScrew.material.opacity = 1;
        this.poll.material.opacity = 1;
        if (this.smallControlPoint1) {
            this.smallControlPoint1.material.opacity = 0;
        }
        if (this.smallControlPoint2) {
            this.smallControlPoint2.material.opacity = 1;
            if (this.screenWidth > 500 && this.screenHeight > 500) {
                this.smallControlPoint2.position.set(-60, 50, 10);
            } else {
                this.smallControlPoint2.position.set(-80, 70, 10);
            }
        } else {
            if (this.screenWidth > 500 && this.screenHeight > 500) {
                this.smallControlPoint2 = this.circleTexture(this.imgStoreObj2, 22, 36, 36);
                this.smallControlPoint2.position.set(-60, 50, 10);
            } else {
                this.smallControlPoint2 = this.circleTexture(this.imgStoreObj2, 40, 36, 36);
                this.smallControlPoint2.position.set(-80, 70, 10);
            }
        }
        this.sliderControlLine1 = new SliderControlLine(this.smallControlPoint2,
            {smallScrew: this.smallScrew, smallControlPoint2: this.smallControlPoint2});
        this.sliderControlLine1.initEvent(this.camera, this.renderer);
        this.canDrag2 = true;
        this.canDrag3 = false;
        this.smallScrew.rotation.z = (0 / 180 * Math.PI);
    }

    // 细准焦X40事件绑定
    smallHandlerX40(pos: any, obj: any) {
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            const px = pos.x + 26;
            const py = pos.y - 20;
            const angleRadian = Math.atan2(py, px);
            const angle = angleRadian * 180 / Math.PI;
            const dis = Math.sqrt((Math.pow(34, 2) + Math.pow(30, 2)));
            let offsetX = dis * Math.cos(angleRadian);
            let offsetY = dis * Math.sin(-angleRadian);
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            if (this.canDrag2) {
                if (angle <= 135 && angle > (-8)) {
                    offsetX = dis * Math.cos(135 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-135 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }
                if (angle < -8) {
                    offsetX = dis * Math.cos(179 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-179 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 85 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if (angle >= 178) {
                    offsetX = dis * Math.cos(178 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 85 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 26, -offsetY + 20, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }
                if (angle > 135 && angle < 178) {
                    obj.smallControlPoint2.position.set(offsetX - 26, -offsetY + 20, 10);
                    obj.smallScrew.rotation.z = ((angle - 135) * 1.35) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 6 - 0.13 * (angle - 135);
                }
                (window as any).viewHandler.viewModel.$data.step6 = false;
            }
        } else {
            const px = pos.x + 32;
            const py = pos.y - 28;
            const flag = (window as any).viewHandler.viewModel.$data.filterval;
            const angleRadian = Math.atan2(py, px);
            const angle = angleRadian * 180 / Math.PI;
            const dis = Math.sqrt((Math.pow(48, 2) + Math.pow(42, 2)));
            let offsetX = dis * Math.cos(angleRadian);
            let offsetY = dis * Math.sin(-angleRadian);
            if (this.canDrag2) {
                if (angle <= 135 && (angle) >= (-8)) {
                    offsetX = dis * Math.cos(135 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-135 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 0 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 32, -offsetY + 28, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 6;
                }
                if (angle < -8) {
                    offsetX = dis * Math.cos(179 / 180 * Math.PI);
                    offsetY = dis * Math.sin(-179 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 85 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 32, -offsetY + 28, 10);
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                }

                if (angle >= 178) {
                    offsetX = 63.8 * Math.cos(178 / 180 * Math.PI);
                    offsetY = 63.8 * Math.sin(-178 / 180 * Math.PI);
                    obj.smallScrew.rotation.z = 85 / 180 * Math.PI;
                    obj.smallControlPoint2.position.set(offsetX - 32, -offsetY + 28, 10);
                }
                if (angle > 135 && angle < 178) {
                    obj.smallControlPoint2.position.set(offsetX - 32, -offsetY + 28, 10);
                    obj.smallScrew.rotation.z = ((angle - 135) * 1.35) / 180 * Math.PI;
                    (window as any).viewHandler.viewModel.$data.filterval = 6 - 0.15 * (angle - 135);
                }
                if ((window as any).viewHandler.viewModel.$data.filterval <= 1) {
                    obj.smallControlPoint2.material.opacity = 0;
                    (window as any).viewHandler.viewModel.$data.filterval = 0;
                    (window as any).viewHandler.viewModel.$data.step6 = true;
                    (window as any).viewHandler.viewModel.$data.step5 = false;
                    obj.smallScrew.rotation.z = 60 / 180 * Math.PI;
                    this.canDrag2 = false;
                }
                (window as any).viewHandler.viewModel.$data.step6 = false;
            }
        }
    }

    //判断细准焦是否到最大旋转范围(x40)
    judgeSmallPositionX40(pos: any, obj: any) {
        (window as any).viewHandler.viewModel.$data.step6 = false;
        if ((window as any).viewHandler.viewModel.$data.filterval <= 1) {
            if (obj.smallControlPoint2) {
                obj.smallControlPoint2.material.opacity = 0;
            }
            this.canDrag2 = false;
            (window as any).viewHandler.viewModel.$data.step6 = true;
            (window as any).viewHandler.viewModel.$data.step5 = false;
        }
    }

    //控制播放装片动画
    getImgAnimation() {
        this.playImg2(this.store);
    }

    //控制播放x40镜头转换动画
    getImgAnimation2() {
        this.playImg1(this.store2);
    }
    //控制播放x10的镜头转换动画
    getImgAnimation1() {
        this.playImg(this.store1);
    }

    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image.src);
            image.onerror = reject;
            image.src = path;
        });
    }

    //播放x10动画
    playImg(Arr: any) {
        let i = 0;
        clearTimeout(this.timerControl2);
        clearTimeout(this.timerControl1);
        const L = Arr.length;
        const that = this;
        const micScopes = this.micScope;
        if (this.smallControlPoint1) {
            this.smallControlPoint1.material.opacity = 0;
        }
        if (this.smallControlPoint2) {
            this.smallControlPoint2.material.opacity = 0;
        }
        function Run() {
            micScopes.material.map = Arr[i];
            i++;
            that.timerControl1 = setTimeout(Run, 150);
            if (i >= L) {
                clearTimeout(that.timerControl1);
                that.doNextStep4();
            }
        }
        Run();
    }

    //播放x40动画
    playImg1(Arr: any) {
        let i = 0;
        clearTimeout(this.timerControl2);
        clearTimeout(this.timerControl1);
        const L = Arr.length;
        const that = this;
        const micScopes = this.micScope;
        if (this.smallControlPoint1) {
            this.smallControlPoint1.material.opacity = 0;
        }
        if (this.smallControlPoint2) {
            this.smallControlPoint2.material.opacity = 0;
        }
        function Run() {
            micScopes.material.map = Arr[i];
            i++;
            that.timerControl2 = setTimeout(Run, 150);
            if (i >= L) {
                clearTimeout(that.timerControl2);
                that.doNextStep5();
            }
        }
        Run();
    }


    //播放x40动画
    playImg2(Arr: any) {
        let i = 0;
        const L = Arr.length;
        const that = this;
        const micScopes = this.micScope;
        if (this.smallControlPoint1) {
            this.smallControlPoint1.material.opacity = 0;
        }
        if (this.smallControlPoint2) {
            this.smallControlPoint2.material.opacity = 0;
        }
        function Run() {
            micScopes.material.map = Arr[i];
            i++;
            that.timerControl = setTimeout(Run, 150);
            if (i >= L) {
                clearTimeout(that.timerControl);
                that.doNextStep3();
                (window as any).viewHandler.viewModel.$data.imgSrc = (window as any).viewHandler.viewModel.$data.step2ImgSrc;
                (window as any).viewHandler.viewModel.$data.filterval = 6;
                (window as any).viewHandler.viewModel.$data.viewOpacity = 1;
            }
        }
        Run();
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    reset() {
        (window as any).viewHandler.viewModel.$data.viewOpacity = 1;
        (window as any).viewHandler.viewModel.$data.filterval = 0;
        (window as any).viewHandler.viewModel.$data.isChecked = false;
        (window as any).viewHandler.viewModel.$data.isChecked1 = false;
        (window as any).viewHandler.viewModel.$data.isChecked2 = false;
        (window as any).viewHandler.viewModel.$data.imgSrc = (window as any).viewHandler.viewModel.$data.step1ImgSrc;
        (window as any).viewHandler.viewModel.$data.step1 = true;
        (window as any).viewHandler.viewModel.$data.step2 = false;
        (window as any).viewHandler.viewModel.$data.step3 = false;
        (window as any).viewHandler.viewModel.$data.step4 = false;
        (window as any).viewHandler.viewModel.$data.step5 = false;
        this.smallScrew.material.opacity = 1;
        this.bigScrew.material.opacity = 1;
        this.poll.material.opacity = 1;
        clearTimeout(this.timerControl);
        clearTimeout(this.timerControl1);
        clearTimeout(this.timerControl2);
        (window as any).viewHandler.viewModel.$data.step6 = false;
        (window as any).viewHandler.viewModel.$data.step5 = false;
        (window as any).viewHandler.viewModel.$data.step4 = false;
        (window as any).viewHandler.viewModel.$data.step3 = false;
        (window as any).viewHandler.viewModel.$data.step2 = false;
        this.micScope.material.map = this.imgStoreObj1;
        this.poll.rotation.z = -45 / 180 * Math.PI;
        this.controlPoint.material.opacity = 1;
        if (this.screenWidth > 500 && this.screenHeight > 500) {
            this.controlPoint.position.set(50, -165, 10);
            if (this.bigControlPoint) {
                this.bigControlPoint.material.opacity = 0;
                this.canDrag1 = false;
                this.bigControlPoint.position.set(-32, 100, 10);
            }
            if (this.smallControlPoint1) {
                this.smallControlPoint1.position.set(-60, 50, 10);
                this.smallControlPoint1.material.opacity = 0;
                this.canDrag2 = false;
                this.canDrag3 = true;
            }
            if (this.smallControlPoint2) {
                this.smallControlPoint2.material.opacity = 0;
                this.canDrag3 = false;
                this.smallControlPoint2.position.set(-60, 50, 10);
            }
        } else {
            this.controlPoint.position.set(75, -250, 10);
            if (this.bigControlPoint) {
                this.bigControlPoint.material.opacity = 0;
                this.canDrag1 = false;
                this.bigControlPoint.position.set(-30, 160, 10);
            }
            if (this.smallControlPoint1) {
                this.smallControlPoint1.position.set(-80, 70, 10);
                this.smallControlPoint1.material.opacity = 0;
                this.canDrag2 = false;
                this.canDrag3 = true;
            }
            if (this.smallControlPoint2) {
                this.smallControlPoint2.material.opacity = 0;
                this.canDrag3 = false;
                this.smallControlPoint2.position.set(-80, 70, 10);
            }
        }
        this.isEnd = false;
        this.initAction();
        this.smallScrew.rotation.z = 0;
        this.bigScrew.rotation.z = 0;
    }

    addTexture(src: any) {
        const loader = new THREE.TextureLoader();
        const texture1 = loader.load(src);
        texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
        return texture1;
    }

    //方形贴图
    planeTexture(src: any, W: number, H: number) {
        const texture = this.addTexture(src);
        const cube = new THREE.PlaneBufferGeometry(W, H);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            transparent: true
        });
        const mesh = new THREE.Mesh(cube, material);
        this.scene.add(mesh);
        return mesh;
    }

    //圆形贴图
    circleTexture(src: any, R: number, Segx: number, Segy: number) {
        const texture = this.addTexture(src);
        const cube = new THREE.CircleBufferGeometry(R, Segx, Segy);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            transparent: true
        });
        const mesh = new THREE.Mesh(cube, material);
        this.scene.add(mesh);
        return mesh;
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(-20, 20, 0);
        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

    resetModelPosition() {
        this.sliderControlLine1.controlPoint.position.set(0, 30, 0);
        this.sliderControlLine1.line.rotateZ(-this.sliderControlLine1.angle);
        this.sliderControlLine1.angle = 0;
    }
}
