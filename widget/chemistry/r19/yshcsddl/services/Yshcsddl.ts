import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Utils} from './Utils';
import {RandomDot} from './RandomDot';
import * as cub from '../sub_static/UI/bigcub.png';
import * as circle from '../sub_static/UI/circle.png';
import * as formula1 from '../sub_static/UI/yscs.png';
import * as formula2 from '../sub_static/UI/cscs.png';
import * as csgImg from '../sub_static/UI/CH3COO-.png';
import * as csImg from '../sub_static/UI/CH3COOH .png';
import * as llzImg from '../sub_static/UI/Cl-.png';
import * as qlzImg from '../sub_static/UI/qlz.png';
import * as sfzImg from '../sub_static/UI/H2O.png';
import * as shqImg from '../sub_static/UI/shqlz.png';
import * as qygImg from '../sub_static/UI/OH-.png';

export class Yshcsddl extends ThreeBase {
    private cub1 = Utils.createImg(-150, 0, 1, 238, 232, cub);
    private cub2 = Utils.createImg(-150, 0, 1, 238, 232, cub);
    private circle1 = Utils.createImg(-150, -13, 0, 250, 250, circle);
    private circle2 = Utils.createImg(-150, -13, 0, 250, 250, circle);
    private HCl_formula = Utils.createImg(-150, -150, 0, 157.5, 13.5, formula1);
    private CH3COOH_formula = Utils.createImg(-150, -150, 0, 255, 13.5, formula2);
    private water1: any;
    private OH1: any;
    private H3O1: any;
    private water2: any;
    private OH2: any;
    private H3O2: any;
    private H1: any;
    private Cl1: any;
    private CH3COOH: any;
    private CH3COO: any;
    private moleculeArr1: any = [];
    private moleculeArr2: any = [];
    private moleculeGroup1 = new THREE.Group();
    private moleculeGroup2 = new THREE.Group();
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private timer4: any;
    dataH2O = 15;
    dataH3O = 1;
    dataCl = 0;
    dataCH3COOH = 0;
    dataCH3COO = 0;
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
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
        this.camera.position.set(0, 0, 500);
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
        // (this.renderer as WebGLRenderer).setClearColor(0x222222);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
        (window as any).viewHandler.viewModel.histogram1();
    }

    initObject() {
        this.moleculeGroup1.add(this.cub1, this.HCl_formula,  this.circle1);
        this.moleculeGroup2.add(this.cub2, this.CH3COOH_formula, this.circle2 );
        this.scene.add(this.moleculeGroup1, this.moleculeGroup2);
        this.moleculeGroup2.visible = false;
        this.moleculeGroup1.visible = false;
    }

    // 添加化学分子函数
    addMolecule1() {
        for (let i = 0; i < 5; i++) {
            this.water1 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) - 150,
                Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 15.6, 15.3, sfzImg, 'water1');
            this.moleculeArr1.push(this.water1);
        }
        this.OH1 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) - 150,
            Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 16, 14.5, qygImg, 'OH1');
        this.H3O1 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) - 150,
            Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 19, 16.5, shqImg, 'H3O1');
        this.moleculeArr1.push(this.OH1, this.H3O1);
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].addSince(this.scene);
        }
    }

    addMolecule2() {
        for (let i = 0; i < 5; i++) {
            this.water2 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) + 150,
                Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 15.6, 15.3, sfzImg, 'water2');
            this.moleculeArr2.push(this.water2);
        }
        this.OH2 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) + 150,
            Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 16, 14.5, qygImg, 'OH2');
        this.H3O2 = new RandomDot(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) + 150,
            Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), 0, 19, 16.5, shqImg, 'H3O2');
        this.moleculeArr2.push(this.OH2, this.H3O2);
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].addSince(this.scene);
            // this.moleculeArr2[i].selfMoveAnimate(Math.random() * 55 * Math.cos(Math.random() * 360 / 180 * Math.PI) + 150,
            //     Math.random() * 55 * Math.sin(Math.random() * 360 / 180 * Math.PI), 150, -13, 85);
        }
    }

    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // 第一个杯子分子及离子碰撞反弹函数
    runIntoAni1(index: number) {
        for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr1[i], this.moleculeArr1[index]);
            if (d <= 15) {
                if (this.moleculeArr1[i].box.name === 'H+' && this.moleculeArr1[index].box.name === 'water1') {
                    this.H3O1 = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                        (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 19, 16.5, shqImg, 'H3O1');
                    this.H3O1.addSince(this.scene);
                    this.H3O1.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                        (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -150, -13, 80);
                    this.moleculeArr1[i].removeSince(this.scene);
                    this.moleculeArr1[index].removeSince(this.scene);
                    this.dataH2O --;
                    this.dataH3O ++;
                    this.moleculeArr1.splice(i, 1, this.H3O1);
                    this.moleculeArr1.splice(index, 1, this.H3O1);
                } else {
                    this.moleculeArr1[index].speedX -= this.moleculeArr1[i].box.position.x - this.moleculeArr1[index].box.position.x;
                    this.moleculeArr1[index].speedY -= this.moleculeArr1[i].box.position.y - this.moleculeArr1[index].box.position.y;
                    this.moleculeArr1[i].speedX -= this.moleculeArr1[i].box.position.x - this.moleculeArr1[i].box.position.x;
                    this.moleculeArr1[i].speedY -= this.moleculeArr1[i].box.position.y - this.moleculeArr1[i].box.position.y;
                }
            }
        }
    }

    // 第二个杯子分子及离子碰撞反弹函数
    runIntoAni2(index: number) {
        for (let i = 0, L = this.moleculeArr2.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr2[i], this.moleculeArr2[index]);
            if (d <= 15) {
                if (this.moleculeArr2[i].box.name === 'CH3COOH' && this.moleculeArr2[index].box.name === 'water2') {
                    this.CH3COO = new RandomDot((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 + 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2 + 10,
                        0, 16, 16, csgImg, 'CH3COO');
                    this.CH3COO.addSince(this.scene);
                    this.CH3COO.selfMoveAnimate1((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 + 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2 + 10, -150, -13, 80);
                    this.H3O2 = new RandomDot((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 - 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2 - 10,
                        0, 19, 16.5, shqImg, 'H3O2');
                    this.H3O2.addSince(this.scene);
                    this.H3O2.selfMoveAnimate1((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 - 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2 - 10, -150, -13, 80);
                    this.moleculeArr2[i].removeSince(this.scene);
                    this.moleculeArr2[index].removeSince(this.scene);
                    this.moleculeArr2.splice(i, 1, this.CH3COO);
                    this.moleculeArr2.splice(index, 1, this.H3O2);
                    this.dataCH3COOH --;
                    this.dataH2O --;
                    this.dataCH3COO ++;
                    this.dataH3O ++;
                } else if (this.moleculeArr2[i].box.name === 'CH3COO' && this.moleculeArr2[index].box.name === 'H3O2') {
                    this.CH3COOH = new RandomDot((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 + 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2, 0, 18, 16.5, csImg, 'CH3COOH');
                    this.CH3COOH.addSince(this.scene);
                    this.CH3COOH.selfMoveAnimate1((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 + 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2, -150, -13, 80);
                    this.water2 = new RandomDot((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 - 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2,
                        0, 15.6, 15.3, sfzImg, 'water2');
                    this.water2.addSince(this.scene);
                    this.water2.selfMoveAnimate1((this.moleculeArr2[i].box.position.x + this.moleculeArr2[index].box.position.x) / 2 - 10,
                        (this.moleculeArr2[i].box.position.y + this.moleculeArr2[index].box.position.y) / 2, -150, -13, 80);
                    this.moleculeArr2[i].removeSince(this.scene);
                    this.moleculeArr2[index].removeSince(this.scene);
                    this.moleculeArr2.splice(i, 1, this.CH3COOH);
                    this.moleculeArr2.splice(index, 1, this.water2);
                    this.dataCH3COOH ++;
                    this.dataH2O ++;
                    this.dataCH3COO --;
                    this.dataH3O --;
                } else {
                    this.moleculeArr2[index].speedX -= this.moleculeArr2[i].box.position.x - this.moleculeArr2[index].box.position.x;
                    this.moleculeArr2[index].speedY -= this.moleculeArr2[i].box.position.y - this.moleculeArr2[index].box.position.y;
                    this.moleculeArr2[i].speedX -= this.moleculeArr2[i].box.position.x - this.moleculeArr2[i].box.position.x;
                    this.moleculeArr2[i].speedY -= this.moleculeArr2[i].box.position.y - this.moleculeArr2[i].box.position.y;
                }
            }
        }
    }

    // 第一个杯子分子及离子运动
    runAnimation1() {
        const thiz = this;
        function ani1() {
            for (let i = 0, L = thiz.moleculeArr1.length; i < L; i++) {
                thiz.runIntoAni1(i);
                const sphere = thiz.moleculeArr1[i];
                const k = 0.0001;
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
                const r = 0.3 / speed;
                sphere.speedX *= r;
                sphere.speedY *= r;
                sphere.box.position.x += sphere.speedX;
                sphere.box.position.y += sphere.speedY;
            }
            thiz.timer1 = requestAnimationFrame(ani1);
        }
        ani1();
    }

    // 第二个杯子分子及离子运动
    runAnimation2() {
        const thiz = this;
        function ani1() {
            for (let i = 0, L = thiz.moleculeArr2.length; i < L; i++) {
                thiz.runIntoAni2(i);
                const sphere = thiz.moleculeArr2[i];
                const k = 0.0001;
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
                const r = 0.3 / speed;
                sphere.speedX *= r;
                sphere.speedY *= r;
                sphere.box.position.x += sphere.speedX;
                sphere.box.position.y += sphere.speedY;
            }
            thiz.timer2 = requestAnimationFrame(ani1);
        }
        ani1();
    }
    // 添加三个H+和三个Cl-
     addEvent1() {
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * 360 / 180 * Math.PI;
            this.H1 = new RandomDot(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, 0, 10, 10, qlzImg, 'H+');
            this.Cl1 = new RandomDot(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, 0, 15, 15, llzImg, 'Cl-');
            this.H1.addSince(this.scene);
            this.Cl1.addSince(this.scene);
            this.moleculeArr1.push(this.H1, this.Cl1);
            this.H1.selfMoveAnimate1(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, -150, -13, 80);
            this.Cl1.selfMoveAnimate1(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, -150, -13, 80);
        }
         this.dataCl = 3;
     }
    // 添加三个醋酸分子
    addEvent2 () {
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * 360 / 180 * Math.PI;
            this.CH3COOH = new RandomDot(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, 0, 18, 16.5, csImg, 'CH3COOH');
            this.CH3COOH.addSince(this.scene);
            this.moleculeArr2.push(this.CH3COOH);
            this.CH3COOH.selfMoveAnimate1(75 * Math.cos(angle) - 150,
                75 * Math.sin(angle) - 13, -150, -13, 80);
        }
        this.dataCH3COOH = 3;
    }
    // 点击盐酸溶液杯子后触发的函数事件
    ysEvent() {
        this.moleculeGroup1.visible = true;
        this.addMolecule1();
        this.dataH2O = 5;
        this.dataH3O = 1;
        this.moleculeGroup2.visible = false;
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].box.visible = false;
        }
        // 3秒钟后添加三个H+和三个Cl-
        const thiz = this;
        this.timer3 = setTimeout(() => { thiz.addEvent1(); } , 3000);
        // 在杯子里发生碰撞运动
        this.runAnimation1();
        // 自身在杯子里做无规则运动
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            // this.moleculeArr1[i].selfMoveAnimate(Math.random() * 240 - 120 - 150,
            //     Math.random() * 166 - 84 - 20, -150, -13, 80);
            this.moleculeArr1[i].selfMoveAnimate1(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) - 150,
                Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), -150, -13, 80);
        }
    }

    // 点击醋酸溶液杯子后触发的函数事件
    csEvent() {
        this.moleculeGroup2.visible = true;
        this.addMolecule2();
        this.moleculeGroup1.visible = false;
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].box.visible = false;
        }
        // 3秒钟后添加三个醋酸分子
        const thiz = this;
        this.timer4 = setTimeout(() => { thiz.addEvent2(); } , 3000);
        this.runAnimation2();
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].selfMoveAnimate1(Math.random() * 65 * Math.cos(Math.random() * 360 / 180 * Math.PI) - 150,
                Math.random() * 65 * Math.sin(Math.random() * 360 / 180 * Math.PI), -150, -13, 80);
        }
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.dataH2O = 15;
        this.dataH3O = 1;
        this.dataCl = 0;
        this.dataCH3COOH = 0;
        this.dataCH3COO = 0;
        // 取消碰撞动画
        cancelAnimationFrame(this.timer1);
        // 第一个杯子相关元素重置内容
        clearTimeout(this.timer3);
        this.moleculeGroup1.visible = false;
        this.moleculeGroup2.visible = false;
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1.splice(0, this.moleculeArr1.length, );
        // 第二个杯子相关元素重置内容
        clearTimeout(this.timer4);
        cancelAnimationFrame(this.timer2);
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].removeSince(this.scene);
        }
        this.moleculeArr2.splice(0, this.moleculeArr2.length, );
    }
}




