import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
import * as moleculeH2 from '../sub_static/UI/H2.png';
import * as moleculeO2 from '../sub_static/UI/O2.png';
import * as moleculeNH3 from '../sub_static/UI/NH3.png';
import * as cap from '../sub_static/UI/border.png';
import * as container from '../sub_static/UI/container.png';
import * as coverBg from '../sub_static/UI/coverBg.png';
import * as tip from '../sub_static/UI/imgV.png';
import * as tipText from '../sub_static/UI/wz1.png';
import * as jiantou from '../sub_static/UI/jiantou.png';
import * as moleculeMapH2 from '../sub_static/UI/zhuH2.png';
import * as moleculeMapN2 from '../sub_static/UI/zhuN2.png';
import * as moleculeMapO2 from '../sub_static/UI/zhuO2.png';
import * as moleculeMapHO from '../sub_static/UI/zhuHO.png';
import * as moleculeMapNH from '../sub_static/UI/zhuNH.png';
import * as moleculeMapNO from '../sub_static/UI/zhuNO.png';
import * as moleculeMapNOH from '../sub_static/UI/zhuNOH.png';
export class Model extends ThreeBase {
    //添加反应区域元素
    private cap = ThreeUtil.createImg(20, 242, cap, -70, -33.5, 2);
    private container = ThreeUtil.createImg(402.5, 378, container, -170, 0, 3);
    private tip = ThreeUtil.createImg(110, 35.5, tip, -270, -200, 3);
    private tipText = ThreeUtil.createImg(91, 30, tipText, -70, -198, 3);
    private jianTOU = ThreeUtil.createImg(20, 20, jiantou, -70, -176, 3);
    //添加容器周边遮挡块
    private cover1 = ThreeUtil.createImg(40, 300, coverBg, -385, -30, 1);
    private cover2 = ThreeUtil.createImg(40, 300, coverBg, -50, -30, 1);
    private cover3 = ThreeUtil.createImg(350, 50, coverBg, -220, 115, 1);
    private cover4 = ThreeUtil.createImg(350, 50, coverBg, -220, -190, 1);
    // 创建右侧分子总数图例
    private moleculeNum = ThreeUtil.createImg(96.8, 257.6, moleculeMapH2, 220, -35, 1);
    private moleculeMapH2 = new THREE.TextureLoader().load(moleculeMapH2 as any);
    private moleculeMapN2 = new THREE.TextureLoader().load(moleculeMapN2 as any);
    private moleculeMapO2 = new THREE.TextureLoader().load(moleculeMapO2 as any);
    private moleculeMapHO = new THREE.TextureLoader().load(moleculeMapHO as any);
    private moleculeMapNH = new THREE.TextureLoader().load(moleculeMapNH as any);
    private moleculeMapNO = new THREE.TextureLoader().load(moleculeMapNO as any);
    private moleculeMapNOH = new THREE.TextureLoader().load(moleculeMapNOH as any);
    // 创建分子组及分子变量
    private moleculeArr1: any = [];
    private moleculeH2: any;
    private moleculeO2: any;
    private moleculeNH3: any;
    // 创建分子运动的定时器
    private timer1: any;
    // 创建控制提示图片闪烁的定时器
    private timer: any;
    // 创建一定时间后提示图片消失的定时器
    private timer3: any;
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
        (this.renderer as WebGLRenderer).setClearColor('#333');
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    initObject() {
        this.scene.add(this.container, this.cap, this.tip, this.cover1, this.cover2, this.cover3, this.cover4,
            this.moleculeNum, this.tipText, this.jianTOU);
        (this.tipText.material as any).opacity = 0;
        this.addMoveAni1();
        this.runAnimation();
        if (document.documentElement.clientHeight < 810 && document.documentElement.clientHeight > 600) {
            this.moleculeNum.position.x = 140;
        } else if (document.documentElement.clientHeight < 600 && document.documentElement.clientHeight > 460) {
            this.moleculeNum.position.x = 150;
        } else if (document.documentElement.clientHeight < 460 && document.documentElement.clientHeight > 300) {
            this.moleculeNum.position.x = 180;
        } else {
            this.moleculeNum.position.x = 220;
        }
    }
    // 创建分子函数
    creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, ) {
        const randomX1 = Math.random() * 240 - 340;
        const randomY1 = Math.random() * 160 - 90;
        molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
        molecule.selfMoveAnimate1(randomX1, randomY1, -120, -325, 50, -120);
        this.moleculeArr1.push(molecule, );
        molecule.addSince(this.scene);
    }
    // 初始状态下H2分子组运动函数
    addMoveAni1() {
        for (let i = 0; i < 24; i++) {
            this.creatMolecule(this.moleculeH2, 24, 18.2, moleculeH2, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapH2;
    }
    // O2分子组运动函数
    addMoveAni2() {
        for (let i = 0; i < 24; i++) {
            this.creatMolecule(this.moleculeO2, 28, 20.1, moleculeO2, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapO2;
    }
    // 氨气分子组运动函数
    addMoveAni3() {
        for (let i = 0; i < 24; i++) {
            this.creatMolecule(this.moleculeNH3, 28.75, 23.8, moleculeNH3, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapN2;
    }
    // 氢气和氧气分子组运动函数
    addMoveAni4() {
        for (let i = 0; i < 12; i++) {
            this.creatMolecule(this.moleculeO2, 28, 20.1, moleculeO2, 'H2', 1);
            this.creatMolecule(this.moleculeH2, 24, 18.2, moleculeH2, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapHO;
    }
    // 氢气和氨气分子组运动函数
    addMoveAni5() {
        for (let i = 0; i < 12; i++) {
            this.creatMolecule(this.moleculeH2, 24, 18.2, moleculeH2, 'H2', 1);
            this.creatMolecule(this.moleculeNH3, 28.75, 23.8, moleculeNH3, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapNH;
    }
    // 氧气和氨气分子组运动函数
    addMoveAni6() {
        for (let i = 0; i < 12; i++) {
            this.creatMolecule(this.moleculeO2, 28, 20.1, moleculeO2, 'H2', 1);
            this.creatMolecule(this.moleculeNH3, 28.75, 23.8, moleculeNH3, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapNO;
    }
    // 氢气和氧气和氨气分子组运动函数
    addMoveAni7() {
        for (let i = 0; i < 8; i++) {
            this.creatMolecule(this.moleculeO2, 28, 20.1, moleculeO2, 'H2', 1);
            this.creatMolecule(this.moleculeH2, 24, 18.2, moleculeH2, 'H2', 1);
            this.creatMolecule(this.moleculeNH3, 28.75, 23.8, moleculeNH3, 'H2', 1);
        }
        (this.moleculeNum.material as any).map = this.moleculeMapNOH;
    }
    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    // 分子及离子碰撞后对应的反应事件
    runIntoAni(index: number, ) {
        for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr1[i], this.moleculeArr1[index]);
            if (d <= 25.5) {
                this.reboundEvent(index, i);
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
    // 反应中分子的运动函数
    runAnimation() {
        const thiz = this;
        function ani1() {
            for (let i = 0, L = thiz.moleculeArr1.length; i < L; i++) {
                thiz.runIntoAni(i, );
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
                const r = 0.8 / speed;
                sphere.speedX *= r;
                sphere.speedY *= r;
                sphere.box.position.x += sphere.speedX;
                sphere.box.position.y += sphere.speedY;
            }
            thiz.timer1 = requestAnimationFrame(ani1);
        }
        ani1();
    }
    // 清空数组中分子并清除碰撞反弹动画的时间
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1 = [];
        // 清除碰撞动画时间
        cancelAnimationFrame(this.timer1);
        // 清除提示图片闪烁动画时间
        this.timer3 = setTimeout( () => {
            cancelAnimationFrame(this.timer);
            (this.tipText.material as any).opacity = 0;
        }, 3600);
    }
    //体积不变提示闪烁事件
    changeOpacity () {
        (this.tipText.material as any).opacity = 1;
        const op = 0.02;
        let tou = (this.tipText.material as any).opacity;
        const thiz = this;
        function animate() {
            tou -= op;
            (thiz.tipText.material as any).opacity = tou;
            if ((thiz.tipText.material as any).opacity < 0.1) {
                tou = 1;
            }
            thiz.timer = requestAnimationFrame(animate);
        }
        animate();
    }
    // 七种组合状态下的分子组合情况
    constituteMoleculeEvt (index: number) {
        if (index === 1) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni1();
            this.runAnimation();
        } else if (index === 2) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni2();
            this.runAnimation();
        } else if (index === 3) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni3();
            this.runAnimation();
        } else if (index === 4) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni4();
            this.runAnimation();
        } else if (index === 5) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni5();
            this.runAnimation();
        } else if (index === 6) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni6();
            this.runAnimation();
        } else if (index === 7) {
            this.changeOpacity();
            this.anewMolecule();
            this.addMoveAni7();
            this.runAnimation();
        }
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    reset () {
        this.anewMolecule();
        this.addMoveAni1();
        this.runAnimation();
        cancelAnimationFrame(this.timer);
        clearTimeout(this.timer3);
        (this.tipText.material as any).opacity = 0;
    }
}




