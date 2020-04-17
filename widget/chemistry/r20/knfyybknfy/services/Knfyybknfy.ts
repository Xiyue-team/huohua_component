import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
import * as cub from '../sub_static/UI/cub.png';
import * as circle from '../sub_static/UI/circle.png';
import * as formula1 from '../sub_static/UI/formula1.png';
import * as formula2 from '../sub_static/UI/formula2.png';
import * as imgA from '../sub_static/UI/A.png';
import * as imgB from '../sub_static/UI/B.png';
import * as imgAB from '../sub_static/UI/AB.png';
import * as imgTip1 from '../sub_static/UI/tip1.png';
import * as imgTip2 from '../sub_static/UI/tip2.png';

export class Knfyybknfy extends ThreeBase {
    private cub = ThreeUtil.createImg(462.6, 345.6, cub, 0, -30, 5);
    private circle = ThreeUtil.createImg(478, 357, circle, 0, -30, 0);
    private imgTip1 = ThreeUtil.createImg(40, 40, imgTip1, 180, -100, 5);
    private imgTip2 = ThreeUtil.createImg(40, 40, imgTip2, 180, -100, 5);
    private formula1 = ThreeUtil.createImg(106.8, 33.6, formula1, 180, -60, 5);
    private formula2 = ThreeUtil.createImg(106.8, 33.6, formula2, 180, -60, 5);
    private moleculeA: any;
    private moleculeB: any;
    private moleculeAB: any;
    private molecule: any;
    private moleculeArr: any = [];
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private mark = false;
    browserInfo: BrowserInfo;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
        //获取到窗口的一半高度和一半宽度
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const vector = this.imgTip1.position.clone().project(this.camera);
        const vector_x = vector.x * 0.8;
        const vector_y = vector.y * 0.8;
        document.getElementById('tip').style.left = `${vector_x * halfWidth + halfWidth}px`;
        document.getElementById('tip').style.top = `${-vector_y * halfHeight + halfHeight}px`;
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
        (this.renderer as WebGLRenderer).setClearColor(0x42386d);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    initObject() {
        this.scene.add(this.cub, this.circle, this.imgTip1, this.imgTip2, this.formula1, this.formula2);
        this.imgTip1.visible = false;
        this.imgTip2.visible = false;
        this.formula1.visible = false;
        this.formula2.visible = false;
        this.addMolecule();
        this.runAnimation(0);
    }
    // 创建分子函数
    creatMolecule(molecule: any, radius: number, width: number, img: any, name: string) {
        for (let i = 0; i < 4; i++) {
            const angle = Math.random() * 360 / 180 * Math.PI;
            molecule = new RandomDot(radius * Math.cos(angle) - 4,
                radius * Math.sin(angle) - 65, 2, width, width, img, name);
            this.moleculeArr.push(molecule, );
            molecule.addSince(this.scene);
            molecule.selfMoveAnimate(radius * Math.cos(angle) - 4,
                radius * Math.sin(angle) - 65, -4, -65, 125, );
        }
    }
    // 添加8个A/B化学分子函数
    addMolecule() {
        this.creatMolecule(this.moleculeA, 20, 15, imgA, 'moleculeA');
        this.creatMolecule(this.moleculeB, 125, 18, imgB, 'moleculeB');
        this.creatMolecule(this.moleculeA, 90, 15, imgA, 'moleculeA');
        this.creatMolecule(this.moleculeB, 50, 18, imgB, 'moleculeB');
    }

    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // 可逆反应中分子及离子碰撞后对应的反应事件
    runIntoAni(index: number, val: number) {
        for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr[i], this.moleculeArr[index]);
            if (d <= 17.5) {
                if (val === 0) {
                    this.reboundEvent(index, i);
                } else if (val === 1) {
                    this.reversibleReaction(index, i);
                } else if (val === 2) {
                    this.irreversibleReaction(index, i);
                }
            }
        }
    }

    // 碰撞反弹函数
    reboundEvent(index: number, i: number) {
        this.moleculeArr[index].speedX -= this.moleculeArr[i].box.position.x - this.moleculeArr[index].box.position.x;
        this.moleculeArr[index].speedY -= this.moleculeArr[i].box.position.y - this.moleculeArr[index].box.position.y;
        this.moleculeArr[i].speedX -= this.moleculeArr[i].box.position.x - this.moleculeArr[i].box.position.x;
        this.moleculeArr[i].speedY -= this.moleculeArr[i].box.position.y - this.moleculeArr[i].box.position.y;
    }

    // 可逆反应现象函数
    reversibleReaction(index: number, i: number) {
        if (this.moleculeArr[i].box.name === 'moleculeA' && this.moleculeArr[index].box.name === 'moleculeB') {
            this.moleculeAB = new RandomDot((this.moleculeArr[i].box.position.x + this.moleculeArr[index].box.position.x) / 2,
                (this.moleculeArr[i].box.position.y + this.moleculeArr[index].box.position.y) / 2,
                2, 25.2, 28.8, imgAB, 'moleculeAB');
            this.moleculeAB.addSince(this.scene);
            this.moleculeAB.selfMoveAnimate((this.moleculeArr[i].box.position.x + this.moleculeArr[index].box.position.x) / 2,
                (this.moleculeArr[i].box.position.y + this.moleculeArr[index].box.position.y) / 2, -4, -65, 125, );
            this.molecule = new RandomDot((this.moleculeArr[i].box.position.x + this.moleculeArr[index].box.position.x) / 2,
                (this.moleculeArr[i].box.position.y + this.moleculeArr[index].box.position.y) / 2,
                2, 1, 1, imgA, 'molecule');
            this.moleculeArr[i].removeSince(this.scene);
            this.moleculeArr[index].removeSince(this.scene);
            this.moleculeArr.splice(i, 1, this.moleculeAB);
            this.moleculeArr.splice(index, 1, this.molecule);
        } else {
            this.reboundEvent(index, i);
        }
    }

    // 每过4秒刷新分解AB分子
    decomposeEvent() {
        // 让前三秒内生成的AB不分解
        this.timer3 = setTimeout(() => {
            for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
                if (this.moleculeArr[i].box.name === 'moleculeAB') {
                    this.moleculeArr[i].box.name = 'moleculeAB1';
                }
            }
        }, 3000);
        this.timer2 = setInterval(() => {
            for (let i = 0, L = this.moleculeArr.length; i < L; i++) {
                if (this.moleculeArr[i].box.name === 'moleculeAB') {
                    this.moleculeA = new RandomDot(this.moleculeArr[i].box.position.x + 10, this.moleculeArr[i].box.position.y,
                        2, 15, 15, imgA, 'moleculeA');
                    this.moleculeB = new RandomDot(this.moleculeArr[i].box.position.x - 10, this.moleculeArr[i].box.position.y - 5,
                        2, 18, 18, imgB, 'moleculeB');
                    this.moleculeA.addSince(this.scene);
                    this.moleculeB.addSince(this.scene);
                    this.moleculeA.selfMoveAnimate(this.moleculeArr[i].box.position.x + 10, this.moleculeArr[i].box.position.y,
                        -4, -65, 125, );
                    this.moleculeB.selfMoveAnimate(this.moleculeArr[i].box.position.x - 10, this.moleculeArr[i].box.position.y - 5,
                        -4, -65, 125, );
                    this.moleculeArr[i].removeSince(this.scene);
                    this.moleculeArr.splice(i, 1, this.moleculeA, this.moleculeB);
                }
            }
        }, 4000);
    }

    // 不可逆反应现象函数
    irreversibleReaction(index: number, i: number) {
        if (this.moleculeArr[i].box.name === 'moleculeA' && this.moleculeArr[index].box.name === 'moleculeB') {
            this.moleculeAB = new RandomDot((this.moleculeArr[i].box.position.x + this.moleculeArr[index].box.position.x) / 2,
                (this.moleculeArr[i].box.position.y + this.moleculeArr[index].box.position.y) / 2,
                2, 25.2, 28.8, imgAB, 'moleculeAB');
            this.moleculeAB.addSince(this.scene);
            this.moleculeAB.selfMoveAnimate((this.moleculeArr[i].box.position.x + this.moleculeArr[index].box.position.x) / 2,
                (this.moleculeArr[i].box.position.y + this.moleculeArr[index].box.position.y) / 2, -4, -65, 125, );
            this.moleculeArr[i].removeSince(this.scene);
            this.moleculeArr[index].removeSince(this.scene);
            this.moleculeArr.splice(i, 1, this.moleculeAB);
            this.moleculeArr.splice(index, 1, this.moleculeAB);
        } else {
            this.reboundEvent(index, i);
        }
    }

    // 反应中分子及离子三种不同的运动函数
    runAnimation(val: number) {
        const thiz = this;
        function ani1() {
            for (let i = 0, L = thiz.moleculeArr.length; i < L; i++) {
                thiz.runIntoAni(i, val);
                const sphere = thiz.moleculeArr[i];
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

    // 清空数组中分子并重新添加分子
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr.length; i++) {
            this.moleculeArr[i].removeSince(this.scene);
        }
        this.moleculeArr = [];
        this.addMolecule();
    }
    // 清除三个定时器事件
    clearTimer() {
        // 取消碰撞动画
        cancelAnimationFrame(this.timer1);
        // 取消可逆反应中AB分解动画
        clearTimeout(this.timer3);
        clearInterval(this.timer2);
    }
    // 可逆反应事件函数
    reversibleEvent() {
       this.clearTimer();
        (window as any).viewHandler.viewModel.$data.active3 = false;
        if (this.mark) {
            this.anewMolecule();
        }
        this.mark = true;
        this.tipShowEvent();
        this.runAnimation(1);
        this.decomposeEvent();
    }

    // 不可逆反应事件函数
    irreversibleEvent() {
        this.clearTimer();
        (window as any).viewHandler.viewModel.$data.active3 = false;
        if (this.mark) {
            this.anewMolecule();
        }
        this.mark = true;
        this.tipShowEvent();
        this.runAnimation(2);
        this.tipButtonEvent(1);
    }
    // 显示可逆反应提示按钮事件
    tipButtonEvent (val: number) {
        if (val === 0) {
            this.imgTip1.visible = false;
            this.imgTip2.visible = true;
            if ((window as any).viewHandler.viewModel.$data.active1) {
                this.formula1.visible = true;
                this.formula2.visible = false;
            } else if ((window as any).viewHandler.viewModel.$data.active2) {
                this.formula2.visible = true;
                this.formula1.visible = false;
            }
        } else if (val === 1) {
            this.tipShowEvent();
        }
    }
    // 控制化学方程式及提示按钮显示隐藏事件
    tipShowEvent () {
        this.imgTip1.visible = true;
        this.imgTip2.visible = false;
        this.formula2.visible = false;
        this.formula1.visible = false;
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    //重置事件
    reset(): void {
        this.mark = false;
        this.clearTimer();
        this.anewMolecule();
        this.tipShowEvent();
        this.imgTip1.visible = false;
        this.runAnimation(0);
    }
}




