import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import common from './CommonForThree';
import * as particleImg from '../sub_static/UI/particle.png';
import * as bgImg from '../sub_static/UI/background.png';
export class Model extends ThreeBase {
    private particleImg = ThreeUtil.createImg(10, 10, particleImg, 0, 0, 0);
    private bgImg = ThreeUtil.createImg(350, 350, bgImg, -180, 0, -1);
    private tipText = ThreeUtil.createNormalText('*固体和液体粒子之间间距可忽略不计', -200, -200, 0, '#B2D68D', 0.3);
    private tipText1 = ThreeUtil.createNormalText('*气体粒子的大小变化对体积影响可忽略不计', -200, -200, 0, '#B2D68D', 0.3);
    private circle1: any;
    private circle2: any;
    private circle3: any;
    private volumeImg1 = common.createText('v', [-280, -100, 0], {color: '#B2D68D', isItalic : false}, );
    private volumeImg2 = common.createText('v', [-280, -100, 0], {color: '#B2D68D', isItalic : false}, );
    private volumeImg3 = common.createText('v', [-280, -100, 0], {color: '#B2D68D', isItalic : false}, );
    private arrGroup1 = new THREE.Group();
    private arrGroup2 = new THREE.Group();
    private arrGroup3 = new THREE.Group();
    private hyperbolaPointArr: any = [];
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initObject();
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
        (this.renderer as WebGLRenderer).setClearColor('#2e2e2e');
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    initHyperbola () {
        let x, y;
        const ua = navigator.userAgent;
        if (document.documentElement.clientHeight < 385 &&
            document.documentElement.clientHeight > 365 &&
            document.documentElement.clientWidth > 650 &&
            document.documentElement.clientWidth < 680 && ua.indexOf('huohua') !== -1) {
            for (let i = 0; i < 381; i += 6) {
                x = 70 * Math.cos(i / 180 * Math.PI);
                y = 70 * Math.sin(i / 180 * Math.PI);
                this.hyperbolaPointArr.push(new THREE.Vector3(x, y, 0));
            }
        } else {
            for (let i = 0; i < 361; i += 6) {
                x = 70 * Math.cos(i / 180 * Math.PI);
                y = 70 * Math.sin(i / 180 * Math.PI);
                this.hyperbolaPointArr.push(new THREE.Vector3(x, y, 0));
            }
        }
        this.circle1 = common.drawDashOrLine(this.hyperbolaPointArr, {color: '#B2D68D', isDash: true});
        this.circle2 = this.circle1.clone();
        this.circle3 = this.circle1.clone();
    }
    initObject() {
        this.createParticle1();
        this.createParticle2();
        this.createParticle3();
        this.initHyperbola();
        this.scene.add(this.arrGroup1, this.arrGroup2, this.arrGroup3, this.circle1, this.circle2,
            this.circle3, this.tipText, this.tipText1, this.bgImg, this.volumeImg1, this.volumeImg2, this.volumeImg3);
        (this.bgImg.material as any).opacity = 0.99;
        this.initEvent(this.arrGroup1, this.circle1);
        this.initEvent(this.arrGroup2, this.circle2);
        this.initEvent(this.arrGroup3, this.circle3);
        this.arrGroup1.visible = true;
        this.circle1.visible = true;
        this.tipText.visible = false;
        this.tipText1.visible = false;
        this.volumeImg2.visible = false;
        this.volumeImg3.visible = false;
        for (let i = 20; i < 42; i++) {
            this.arrGroup1.children[i].visible = false;
            this.arrGroup2.children[i].visible = false;
        }
        for (let i = 5; i < 11; i++) {
            this.arrGroup3.children[i].visible = false;
        }
    }
    // 设置三种状态下相关因素的初始情况
    initEvent (group: any, circle: any) {
        group.scale.set(2, 2, 1);
        circle.scale.set(1 + 20 / 55, 1 + 20 / 55, 1);
        circle.position.set(-180, 0, 0);
        group.position.set(-180, 0, 0);
        group.visible = false;
        circle.visible = false;
    }
    //创建固体单排粒子函数事件
    createParticle (num: number, posY: number) {
        for (let i = -2; i < num; i++) {
            const particle = this.particleImg.clone();
            particle.position.set(i * 10, posY, 0);
            this.arrGroup1.add(particle);
        }
    }
    //创建固体初始状态下的粒子组
    createParticle1() {
        this.createParticle(3, -15);
        this.createParticle(3, -5);
        this.createParticle(3, 5);
        this.createParticle(3, 15);
        // 创建固体状态下需要增加的粒子数组
        for (let i = -2; i < 4; i++) {
            const particle = this.particleImg.clone();
            particle.position.set(i * 10, -25, 0);
            this.arrGroup1.add(particle);
        }
        for (let i = -3; i < 6; ) {
            const particle = this.particleImg.clone();
            particle.position.set(30, i * 5, 0);
            this.arrGroup1.add(particle);
            i += 2;
        }
        for (let i = 2; i >= -2; i--) {
            const particle = this.particleImg.clone();
            particle.position.set(i * 10, 25, 0);
            this.arrGroup1.add(particle);
        }
        for (let i = 5; i >= -5; ) {
            const particle = this.particleImg.clone();
            particle.position.set(-30, i * 5, 0);
            this.arrGroup1.add(particle);
            i -= 2;
        }
    }
    // 创建液体的初始状态下的粒子组
    createParticle2() {
        for (let i = 0; i < 20; i++) {
            const particle = this.particleImg.clone();
            this.arrGroup2.add(particle);
        }
        this.arrGroup2.children[0].position.set(-25, -21, 0);
        this.arrGroup2.children[1].position.set(-10, -18, 0);
        this.arrGroup2.children[2].position.set(5, -20, 0);
        this.arrGroup2.children[3].position.set(22, -21, 0);
        this.arrGroup2.children[4].position.set(26, -20, 0);
        this.arrGroup2.children[5].position.set(-26, -6, 0);
        this.arrGroup2.children[6].position.set(-11, -5, 0);
        this.arrGroup2.children[7].position.set(8, -8, 0);
        this.arrGroup2.children[8].position.set(25, -6, 0);
        this.arrGroup2.children[9].position.set(24, -5, 0);
        this.arrGroup2.children[10].position.set(-27, 8, 0);
        this.arrGroup2.children[11].position.set(-9, 7, 0);
        this.arrGroup2.children[12].position.set(7, 6, 0);
        this.arrGroup2.children[13].position.set(22, 7, 0);
        this.arrGroup2.children[14].position.set(25, 5, 0);
        this.arrGroup2.children[15].position.set(-24, 21, 0);
        this.arrGroup2.children[16].position.set(-11, 23, 0);
        this.arrGroup2.children[17].position.set(6, 19, 0);
        this.arrGroup2.children[18].position.set(21, 21, 0);
        this.arrGroup2.children[19].position.set(26, 19, 0);
        this.arrGroup2.children[4].visible = false;
        this.arrGroup2.children[9].visible = false;
        this.arrGroup2.children[14].visible = false;
        this.arrGroup2.children[19].visible = false;
        // 创建液体状态下需要增加的粒子数组
        for (let i = -2; i < 4; i++) {
            const particle = this.particleImg.clone();
            particle.position.set(i * 10, -25, 0);
            this.arrGroup2.add(particle);
        }
        for (let i = -3; i < 6; ) {
            const particle = this.particleImg.clone();
            particle.position.set(30, i * 5, 0);
            this.arrGroup2.add(particle);
            i += 2;
        }
        for (let i = 2; i >= -2; i--) {
            const particle = this.particleImg.clone();
            particle.position.set(i * 10, 25, 0);
            this.arrGroup2.add(particle);
        }
        for (let i = 5; i >= -5; ) {
            const particle = this.particleImg.clone();
            particle.position.set(-30, i * 5, 0);
            this.arrGroup2.add(particle);
            i -= 2;
        }
        this.arrGroup2.children[20].position.set(-25, -33, 0);
        this.arrGroup2.children[21].position.set(-10, -32, 0);
        this.arrGroup2.children[22].position.set(0, -39, 0);
        this.arrGroup2.children[23].position.set(10, -31, 0);
        this.arrGroup2.children[24].position.set(22, -36, 0);
        this.arrGroup2.children[25].position.set(35, -30, 0);
        this.arrGroup2.children[26].position.set(39, -18, 0);
        this.arrGroup2.children[27].position.set(40, -6, 0);
        this.arrGroup2.children[28].position.set(39, 9, 0);
        this.arrGroup2.children[29].position.set(36, 16, 0);
        this.arrGroup2.children[30].position.set(39, 24, 0);
        this.arrGroup2.children[31].position.set(23, 34, 0);
        this.arrGroup2.children[32].position.set(8, 35, 0);
        this.arrGroup2.children[33].position.set(-5, 34, 0);
        this.arrGroup2.children[34].position.set(-17, 38, 0);
        this.arrGroup2.children[35].position.set(-31, 33, 0);
        this.arrGroup2.children[36].position.set(-43, 26, 0);
        this.arrGroup2.children[37].position.set(-41, 14, 0);
        this.arrGroup2.children[38].position.set(-45, -1, 0);
        this.arrGroup2.children[39].position.set(-38, -5, 0);
        this.arrGroup2.children[40].position.set(-39, -14, 0);
        this.arrGroup2.children[41].position.set(-39, -30, 0);
    }
    // 创建气体的初始状态下的粒子组
    createParticle3() {
        for (let i = 0; i < 11; i++) {
            const particle = this.particleImg.clone();
            this.arrGroup3.add(particle);
        }
        this.arrGroup3.children[0].position.set(-22, 22, 0);
        this.arrGroup3.children[1].position.set(25, 17, 0);
        this.arrGroup3.children[2].position.set(-2, 2, 0);
        this.arrGroup3.children[3].position.set(-25, -18, 0);
        this.arrGroup3.children[4].position.set(15, -24, 0);
        // 液体状态下需要改变的粒子位置
        this.arrGroup3.children[5].position.set(-8, 44, 0);
        this.arrGroup3.children[6].position.set(29, 40, 0);
        this.arrGroup3.children[7].position.set(-46, 2, 0);
        this.arrGroup3.children[8].position.set(-25, -45, 0);
        this.arrGroup3.children[9].position.set(33, -42, 0);
        this.arrGroup3.children[10].position.set(44, -2, 0);
    }

    changeEvent(index: number) {
        if (index === 1) {
            this.resetEvent();
            this.arrGroup1.visible = true;
            this.circle1.visible = true;
            this.volumeImg1.visible = true;
        } else if (index === 2) {
            this.resetEvent();
            this.arrGroup2.visible = true;
            this.circle2.visible = true;
            this.volumeImg2.visible = true;
        } else if (index === 3) {
            this.resetEvent();
            this.arrGroup3.visible = true;
            this.circle3.visible = true;
            this.volumeImg3.visible = true;
        }
    }
    // 重置滑动条的位置及控制三个粒子组的显示隐藏
    resetEvent () {
        this.circle1.visible = false;
        this.circle2.visible = false;
        this.circle3.visible = false;
        this.arrGroup1.visible = false;
        this.arrGroup2.visible = false;
        this.arrGroup3.visible = false;
        this.volumeImg1.visible = false;
        this.volumeImg2.visible = false;
        this.volumeImg3.visible = false;
        (window as any).viewHandler.viewModel.$data.value1 = 20;
        (window as any).viewHandler.viewModel.$data.value2 = 0;
        (window as any).viewHandler.viewModel.$data.value3 = 0;
    }
    getParticleNumber () {
        const number = (window as any).viewHandler.viewModel.$data.value1;
        for (let i = 20; i < 42; i++) {
            this.arrGroup1.children[i].visible = false;
            this.arrGroup2.children[i].visible = false;
        }
        for (let i = 20; i < number; i++) {
            this.arrGroup1.children[i].visible = true;
            this.arrGroup2.children[i].visible = true;
        }
        this.arrGroup2.children[29].visible = false;
        this.arrGroup2.children[39].visible = false;
        for (let i = 5; i < 11; i++) {
            this.arrGroup3.children[i].visible = false;
        }
        for (let i = 5; i < Math.ceil(number / 4) ; i++) {
            this.arrGroup3.children[i].visible = true;
        }
        this.circle1.scale.set(1 + number / 55, 1 + number / 55, 1);
        this.circle2.scale.set(1 + 20 / 55 + (number - 20) / 40, 1 + 20 / 55 + (number - 20) / 40, 1);
        this.circle3.scale.set(1 + 20 / 55 + Math.ceil((number - 20) / 4) / 8, 1 + 20 / 55 + Math.ceil((number - 20) / 4) / 8, 1);
        this.volumeImg1.position.set(-260 - number, -80 - number, 0);
        this.volumeImg2.position.set(-280 - (number - 20) / 0.8, -100 - (number - 20) / 0.8, 0);
        this.volumeImg3.position.set(-280 - 6 * Math.ceil((number - 20) / 4), -100 - 6 * Math.ceil((number - 20) / 4), 0);
    }
    getParticleSize () {
        const size = (window as any).viewHandler.viewModel.$data.value2;
        this.arrGroup1.scale.set(2 + size / 60, 2 + size / 60, 1);
        this.arrGroup2.scale.set(2 + size / 60, 2 + size / 60, 1);
        for (let i = 0; i < 5; i++) {
            this.arrGroup3.children[i].scale.set(1 + size / 320, 1 + size / 320, 1);
        }
        this.circle1.scale.set(1 + 20 / 55 + size / 145, 1 + 20 / 55 + size / 145, 1);
        this.circle2.scale.set(1 + 20 / 55 + size / 110, 1 + 20 / 55 + size / 110, 1);
        this.volumeImg1.position.set(-280 - size / 3, -100 - size / 3, 0);
        this.volumeImg2.position.set(-280 - size / 2, -100 - size / 2, 0);
    }
    getParticleDistance () {
        const distance = (window as any).viewHandler.viewModel.$data.value3;
        this.arrGroup3.children[0].position.set(-22 - distance / 10, 22 + distance / 10, 0);
        this.arrGroup3.children[1].position.set(25 + distance / 10, 17 + distance / 10, 0);
        this.arrGroup3.children[2].position.set(-2, 2, 0);
        this.arrGroup3.children[3].position.set(-25 - distance / 10, -18 - distance / 10, 0);
        this.arrGroup3.children[4].position.set(15 + distance / 10, -24 - distance / 10, 0);
        this.circle3.scale.set(1 + 20 / 55 + distance / 150, 1 + 20 / 55 + distance / 150, 1);
        this.volumeImg3.position.set(-280 - distance / 3, -100 - distance / 3, 0);
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.resetEvent();
        this.volumeImg1.visible = true;
        this.arrGroup1.visible = true;
        this.circle1.visible = true;
    }


}




