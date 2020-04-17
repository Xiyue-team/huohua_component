import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
const eCharts = require('echarts');
import * as cub1 from '../sub_static/UI/cub1.png';
import * as cub2 from '../sub_static/UI/cub2.png';
import * as cub3 from '../sub_static/UI/cub3.png';
import * as csgImg from '../sub_static/UI/CH3COO-.png';
import * as csImg from '../sub_static/UI/CH3COOH.png';
import * as llzImg from '../sub_static/UI/Cl.png';
import * as sfzImg from '../sub_static/UI/H2O.png';
import * as shQlzImg from '../sub_static/UI/H3O.png';
import * as qygImg from '../sub_static/UI/OH-.png';
import * as nImg from '../sub_static/UI/Na.png';
import * as whiteBg from '../sub_static/UI/whiteBg.png';
export class Csdlph extends ThreeBase {
    // 创建烧杯图片
    private cub1 = ThreeUtil.createImg(325.5, 270, cub1, -150, -10, 0);
    private cub2 = ThreeUtil.createImg(325.5, 270, cub2, -150, -10, 0);
    private cub3 = ThreeUtil.createImg(325.5, 270, cub3, -150, -10, 0);
    // 创建烧杯四周遮挡区域
    private whiteBg = ThreeUtil.createImg(170, 28, whiteBg, -128, 66, 2);
    private whiteBg1 = ThreeUtil.createImg(25, 220, whiteBg, -307.5, -30, 2);
    private whiteBg2 = ThreeUtil.createImg(25, 220, whiteBg, 16.5, -30, 2);
    private whiteBg3 = ThreeUtil.createImg(300, 20, whiteBg, -150, -153, 2);
    // 创建各分子变量
    private H2O: any;
    private H3O: any;
    private Cl: any;
    private CH3COOH: any;
    private CH3COO: any;
    private OH: any;
    private Na: any;
    private moleculeArr1: any = [];
    // 创建反应中的定时器
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private mark = false;
    // 创建反应中醋酸根的个数
    dataCH3COO1 = 7;
    dataCH3COO2 = 4;
    // 创建柱状图
    myChart: any;
    number1 = 9;
    number2 = 9;
    number3 = 9;
    button: any;
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initObject();
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
        (this.renderer as WebGLRenderer).setClearColor(0xffffff);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
        this.histogram1();
    }

    initObject() {
        this.scene.add(this.cub1, this.cub2, this.cub3, this.whiteBg, this.whiteBg1, this.whiteBg2, this.whiteBg3);
        this.cub2.visible = false;
        this.cub3.visible = false;
        this.initialMoveAni();
        this.runAnimation(0);
    }

    // 创建分子函数
    creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, ) {
        const randomX1 = Math.random() * 260 - 280;
        const randomY1 = Math.random() * 170 - 130;
        const randomX2 = Math.random() * 50 - 175;
        if (num === 1) {
            molecule = new RandomDot(randomX1, randomY1, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY1, -25, -267, 30, -120);
        } else if (num === 2) {
            molecule = new RandomDot(randomX2, 85, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX2, 85, -25, -267, 54, -120);
        } else {
            molecule = new RandomDot(randomX2, 63, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX2, 63, -25, -267, 30, -120);
        }
        this.moleculeArr1.push(molecule, );
        molecule.addSince(this.scene);
    }
    // 初始状态下分子组运动函数
    initialMoveAni() {
        for (let i = 0; i < 4; i++) {
            this.creatMolecule(this.H3O, 24, 24, shQlzImg, 'H3O', 1);
            this.creatMolecule(this.CH3COO, 24, 24, csgImg, 'CH3COO', 1);
        }
        for (let i = 0; i < 2; i++) {
            this.creatMolecule(this.CH3COOH, 25, 25, csImg, 'CH3COOH1', 1);
            this.creatMolecule(this.CH3COOH, 25, 25, csImg, 'CH3COOH', 1);
            this.creatMolecule(this.H2O, 22, 22, sfzImg, 'H2O', 1);
        }
    }
    // 加水状态下分子组运动函数
    addWaterEvent() {
        for (let i = 0; i < 2; i++) {
            this.creatMolecule(this.H2O, 22, 22, sfzImg, 'H2O', 2);
        }
    }
    // 添加醋酸状态下分子组运动函数
    addAcidEvent() {
        for (let i = 0; i < 3; i++) {
            this.creatMolecule(this.CH3COOH, 25, 25, csImg, 'CH3COOH', 3);
        }
    }
    // 添加NaOH状态下分子组运动函数
    addSodaEvent() {
        for (let i = 0; i < 3; i++) {
            this.creatMolecule(this.OH, 21.5, 21.5, qygImg, 'OH', 3);
            this.creatMolecule(this.Na, 20, 20, nImg, 'Na', 3);
        }
    }

    // 添加NaAc状态下分子组运动函数
    addSodaAcEvent() {
        for (let i = 0; i < 3; i++) {
            this.creatMolecule(this.CH3COO, 24, 24, csgImg, 'CH3COO', 3);
            this.creatMolecule(this.Na, 20, 20, nImg, 'Na', 3);
        }
    }
    // 添加盐酸状态下分子组运动函数
    addYsEvent() {
        for (let i = 0; i < 3; i++) {
            this.creatMolecule(this.Cl, 21, 21, llzImg, 'Cl', 3);
            this.creatMolecule(this.H3O, 24, 24, shQlzImg, 'H3O', 3);
        }
    }
    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    // 分子及离子碰撞后对应的反应事件
    runIntoAni(index: number, val: number) {
        for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr1[i], this.moleculeArr1[index]);
            if (d <= 23) {
                if (val === 0) {
                    this.reboundEvent(index, i);
                } else if (val === 1) {
                    this.addWaterReaction(index, i);
                } else if (val === 2) {
                    this.addAcidReaction(index, i);
                } else if (val === 3) {
                    this.addSodaReaction(index, i);
                } else if (val === 4) {
                    this.addSodaAcReaction(index, i);
                } else if (val === 5) {
                    this.addYsReaction(index, i);
                } else if (val === 6) {
                    this.heatIngReaction(index, i);
                }
            }
        }
    }
    // 碰撞反弹函数
    reboundEvent(index: number, i: number, ) {
        this.moleculeArr1[index].speedX -= this.moleculeArr1[i].box.position.x - this.moleculeArr1[index].box.position.x;
        this.moleculeArr1[index].speedY -= this.moleculeArr1[i].box.position.y - this.moleculeArr1[index].box.position.y;
        this.moleculeArr1[i].speedX -= this.moleculeArr1[i].box.position.x - this.moleculeArr1[i].box.position.x;
        this.moleculeArr1[i].speedY -= this.moleculeArr1[i].box.position.y - this.moleculeArr1[i].box.position.y;
    }
    // 添加水后分子反应函数
    addWaterReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'CH3COOH2') {
            this.CH3COO = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, csgImg, 'CH3COO');
            this.CH3COO.addSince(this.scene);
            this.CH3COO.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 54, -120);
            this.H3O = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, shQlzImg, 'H3O');
            this.H3O.addSince(this.scene);
            this.H3O.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 54, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COO, this.H3O);
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加醋酸后分子反应函数
    addAcidReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'CH3COOH2') {
            this.CH3COO = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, csgImg, 'CH3COO');
            this.CH3COO.addSince(this.scene);
            this.CH3COO.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.H3O = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, shQlzImg, 'H3O');
            this.H3O.addSince(this.scene);
            this.H3O.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COO, this.H3O);
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 两秒后让两个醋酸分子分解
    decomposeEvent(val: number) {
        this.timer2 = setTimeout(() => {
            for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
                if (this.moleculeArr1[i].box.name === 'CH3COOH1') {
                    this.moleculeArr1[i].box.name = 'CH3COOH2';
                }
            }
            if (val === 1) {
                this.changeEchartData(18, 4.5, 5000);
            } else if (val === 2) {
                this.changeEchartData(4.5, 13.5, 5000);
            } else if (val === 3) {
                this.myChart.setOption({
                    animationDurationUpdate: 5000,
                    series: [{
                        data: [18, 4.5, 18],
                    }]
                });
            }
        }, 2000);
    }
    // 添加NaOH后分子反应函数
    addSodaReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'OH' && this.moleculeArr1[index].box.name === 'H3O') {
            this.H2O = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 22, 22, sfzImg, 'H2O');
            this.H2O.addSince(this.scene);
            this.H2O.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.H2O);
            this.moleculeArr1.splice(index, 1, this.H2O);
            this.number1 += 3;
            this.number2 += 3;
            this.number3 += 3;
            this.myChart.setOption({
                animationDurationUpdate: 3000,
                series: [{
                    data: [this.number1, this.number2, this.number3],
                }]
            });
        } else if (this.moleculeArr1[i].box.name === 'CH3COOH2') {
            this.CH3COO = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, csgImg, 'CH3COO');
            this.CH3COO.addSince(this.scene);
            this.CH3COO.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.H3O = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y,
                0, 24, 24, shQlzImg, 'H3O');
            this.H3O.addSince(this.scene);
            this.H3O.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COO, this.H3O);
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加NaAc后分子反应函数
    addSodaAcReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'CH3COO' && this.moleculeArr1[index].box.name === 'H3O') {
            this.CH3COOH = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 25, 25, csImg, 'CH3COOH');
            this.CH3COOH.addSince(this.scene);
            this.CH3COOH.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COOH);
            this.moleculeArr1.splice(index, 1, this.CH3COOH);
            this.dataCH3COO1 --;
            this.number1 -= 2.2;
            this.number2 += 4.5;
            this.number3 += 4.5;
            this.myChart.setOption({
                animationDurationUpdate: 3000,
                series: [{
                    data: [this.number1, this.number2, this.number3],
                }]
            });
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加盐酸后分子反应函数
    addYsReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'CH3COO' && this.moleculeArr1[index].box.name === 'H3O') {
            this.CH3COOH = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 25, 25, csImg, 'CH3COOH');
            this.CH3COOH.addSince(this.scene);
            this.CH3COOH.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COOH);
            this.moleculeArr1.splice(index, 1, this.CH3COOH);
            this.dataCH3COO2 --;
            this.number1 -= 2.5;
            this.number2 -= 2.5;
            this.number3 -= 2.5;
            this.myChart.setOption({
                animationDurationUpdate: 5000,
                series: [{
                    data: [this.number1, this.number2, this.number3],
                }]
            });
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加NaAc/盐酸后当其中的两个CH3COO与H3O结合后不再发生反应
    preventEvent () {
        this.timer3 = setInterval(() => {
            if (this.dataCH3COO1 === 5) {
                clearInterval(this.timer3);
                for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
                    if (this.moleculeArr1[i].box.name === 'CH3COO') {
                        this.moleculeArr1[i].box.name = 'CH3COO1';
                    }
                }
            } else if (this.dataCH3COO2 === 2) {
                clearInterval(this.timer3);
                for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
                    if (this.moleculeArr1[i].box.name === 'CH3COO') {
                        this.moleculeArr1[i].box.name = 'CH3COO1';
                    }
                }
            }
        }, 30);
    }
    // 点击加热后分子反应函数
    heatIngReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'CH3COOH2') {
            this.CH3COO = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, csgImg, 'CH3COO');
            this.CH3COO.addSince(this.scene);
            this.CH3COO.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.H3O = new RandomDot(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, 0, 24, 24, shQlzImg, 'H3O');
            this.H3O.addSince(this.scene);
            this.H3O.selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                this.moleculeArr1[i].box.position.y, -25, -267, 30, -120);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.CH3COO, this.H3O);
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 反应中分子及离子三种不同的运动函数
    runAnimation(val: number) {
        const thiz = this;
        function ani1() {
            for (let i = 0, L = thiz.moleculeArr1.length; i < L; i++) {
                thiz.runIntoAni(i, val);
                const sphere = thiz.moleculeArr1[i];
                const k = 0.00005;
                let k1;
                if (Math.random() > 0.5) {
                    k1 = 1;
                } else {
                    k1 = -1;
                }
                const forceX = -k * k1 * sphere.box.position.x;
                const forceY = -k * k1 * sphere.box.position.y;
                sphere.speedX += forceX;
                sphere.speedY += forceY;
                const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
                const r = 0.4 / speed;
                sphere.speedX *= r;
                sphere.speedY *= r;
                sphere.box.position.x += sphere.speedX;
                sphere.box.position.y += sphere.speedY;
            }
            thiz.timer1 = requestAnimationFrame(ani1);
        }
        ani1();
    }
    // 改变柱状图数据函数
    changeEchartData (num1: number, num2: number, time: number, ) {
        this.number1 = num1;
        this.number2 = num1;
        this.number3 = num2;
        this.myChart.setOption({
            animationDurationUpdate: time,
            series: [{
                data: [this.number1, this.number2, this.number3],
            }]
        });
    }
    // 每次点击按钮后清除时间清除分子组添加分子组事件
    resetEvent() {
        this.changeEchartData(9, 9, 30);
        // 清除碰撞动画时间
        cancelAnimationFrame(this.timer1);
        // 清除醋酸分解动画时间
        clearTimeout(this.timer2);
        // 清除醋酸根离子和H3O结合的时间
        clearInterval(this.timer3);
        this.dataCH3COO1 = 7;
        this.dataCH3COO2 = 4;
        if (this.mark) {
            this.anewMolecule();
        }
        this.mark = true;
        this.cub1.visible = true;
        this.cub2.visible = false;
        this.cub3.visible = false;
        this.whiteBg.position.y = 79;
        this.whiteBg.position.x = -128;
        this.whiteBg.scale.set(1, 1.9, 1);
    }
    // 清空数组中分子并重新添加分子
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr1.length; i++) {    
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1 = [];
        this.initialMoveAni();
    }
    changeEvent(index: number) {
        if (index === 1) {
            this.button = false;
            this.resetEvent();
            this.cub1.visible = false;
            this.cub2.visible = true;
            this.whiteBg.position.y = 93;
            this.whiteBg.scale.set(1, 1, 1);
            this.decomposeEvent(1);
            this.addWaterEvent();
            this.runAnimation(1);
            for (let i = 0; i < 14; i++) {
                this.moleculeArr1[i].stopMoveAnimate3();
                this.moleculeArr1[i].selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                    this.moleculeArr1[i].box.position.y, -21, -272, 57, -123);
            }
        } else if (index === 2) {
            this.resetEvent();
            this.addAcidEvent();
            this.decomposeEvent(2);
            this.runAnimation(2);
        } else if (index === 3) {
            this.resetEvent();
            this.addSodaEvent();
            this.decomposeEvent(4);
            this.runAnimation(3);
        } else if (index === 4) {
            this.resetEvent();
            this.addSodaAcEvent();
            this.preventEvent();
            this.runAnimation(4);
        } else if (index === 5) {
            this.resetEvent();
            this.addYsEvent();
            this.preventEvent();
            this.runAnimation(5);
        } else if (index === 6) {
            this.resetEvent();
            this.cub1.visible = false;
            this.cub3.visible = true;
            this.decomposeEvent(3);
            this.runAnimation(6);
        }
    }
    // 设置电离柱状图样式
    histogram1() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            // 初始动画的时长
            animationDuration: 30,
            xAxis: {
                data: ['', '', ''],
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                axisLine: {
                    show: false,
                },
            },
            // 设置柱状图向左或者向右偏移多少位置
            grid: {
                right: '15%',
            },
            yAxis: {
                type: 'value',
                max: 18,
                min: 0,
                splitNumber: 1,
                // 隐藏y轴横向网格线
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                // 隐藏y轴上数字
                axisLabel: {
                    show: false,
                },
                // axisLine坐标轴箭头及线条样式
                axisLine: {
                    show: false,
                },
            },
            series: [{
                data: [this.number1, this.number2, this.number3, ],
                type: 'bar',
                barWidth : 15,
                itemStyle: {
                    normal: {
                        barBorderRadius: [10, 10, 10],
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params: any) {
                            const colorList = ['#0199FF', ];
                            return colorList[params.dataIndex];
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#ffffff'
                        }
                    }
                },
            }],
        };
        this.myChart.setOption(option);
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.whiteBg.position.y = 66;
        this.whiteBg.position.x = -128;
        this.whiteBg.scale.set(1, 1, 1);
        this.cub1.visible = true;
        this.cub2.visible = false;
        this.cub3.visible = false;
        this.changeEchartData(9, 9, 30);
        cancelAnimationFrame(this.timer1);
        clearTimeout(this.timer2);
        clearInterval(this.timer3);
        this.mark = false;
        (window as any).viewHandler.viewModel.$data.active1 = false;
        (window as any).viewHandler.viewModel.$data.active2 = false;
        (window as any).viewHandler.viewModel.$data.active3 = false;
        (window as any).viewHandler.viewModel.$data.active4 = false;
        (window as any).viewHandler.viewModel.$data.active5 = false;
        (window as any).viewHandler.viewModel.$data.active6 = false;
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1 = [];
        this.initialMoveAni();
        this.runAnimation(0);
    }

}




