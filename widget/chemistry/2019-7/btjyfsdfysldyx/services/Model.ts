import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
import * as moleculeA from '../sub_static/UI/activeA.png';
import * as moleculeB from '../sub_static/UI/activeB.png';
import * as moleculeC from '../sub_static/UI/activeAB.png';
import * as moleculeHe from '../sub_static/UI/he.png';
import * as cap from '../sub_static/UI/cap.png';
import * as container from '../sub_static/UI/container.png';
import * as coverBg from '../sub_static/UI/coverBg.png';
import * as pos_box from '../sub_static/UI/pos_box.png';
import * as formula from '../sub_static/UI/formula.png';
const eCharts = require('echarts');
export class Model extends ThreeBase {
    //添加反应区域元素
    private cap = ThreeUtil.createImg(246.6, 81.9, cap, -240, 140, 2);
    private container = ThreeUtil.createImg(261, 292.5, container, -240, 0, 3);
    //添加容器周边遮挡块
    private cover1 = ThreeUtil.createImg(40, 300, coverBg, -385, -30, 1);
    private cover2 = ThreeUtil.createImg(40, 300, coverBg, -92, -30, 1);
    private cover3 = ThreeUtil.createImg(350, 50, coverBg, -240, 125, 1);
    private cover4 = ThreeUtil.createImg(350, 50, coverBg, -240, -170, 1);
    private pos_box1 = ThreeUtil.createImg(20, 20, pos_box, -315, -200, 1);
    private pos_box2 = ThreeUtil.createImg(20, 20, pos_box, 280, -200, 1);
    private formula = ThreeUtil.createImg(106.04, 11.88, formula, -4, -170, 1);
    // 创建两个容器组
    private group: any = new THREE.Group;
    private group1: any = new THREE.Group;
    // 创建分子组及分子变量
    private moleculeArr1: any = [];
    private moleculeArr2: any = [];
    private activeA: any;
    private activeB: any;
    private activeAB: any;
    private activeAB1: any;
    private moleculeHe: any;
    // 创建分子运动的定时器
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private timer4: any;
    private time = 1000;
    // 创建控制柱状图的变量
    private myChart: any;
    // 添加监控单位体积内活化分子数和反应速率的变量
    private number1 = 5;
    private number2 = 5;
    // 控制柱状图变化的定时器
    private timer5: any;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
        //获取到窗口的一半高度和一半宽度
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const vector = this.pos_box1.position.clone().project(this.camera);
        const vector1 = this.pos_box2.position.clone().project(this.camera);
        const vector_x = vector.x * 0.85;
        const vector_y = vector.y * 0.8;
        const vector1_x = vector1.x * 0.75;
        const vector1_y = vector1.y * 0.8;
        const text1 = document.getElementById('text1');
        const text2 = document.getElementById('text2');
        const text3 = document.getElementById('text3');
        text1.style.left = `${vector_x * halfWidth + halfWidth}px`;
        text1.style.top = `${-vector_y * halfHeight + halfHeight}px`;
        text2.style.left = `${vector1_x * halfWidth + halfWidth}px`;
        text2.style.top = `${-vector1_y * halfHeight + halfHeight}px`;
        text3.style.left = `${vector1_x * halfWidth + halfWidth}px`;
        text3.style.top = `${-vector1_y * halfHeight + halfHeight}px`;
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
        this.histogram();
        this.changeEChart(0);
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
    // 初始化场景元素
    initObject() {
        this.group.add(this.container, this.cap, this.cover1, this.cover2, this.cover3, this.cover4, );
        this.group1 = this.group.clone();
        this.group1.position.set(470, 0, 2);
        this.scene.add(this.group, this.group1, this.pos_box1, this.pos_box2, this.formula);
        this.addMoveAni(1, this.moleculeArr1);
        this.runAnimation(this.moleculeArr1, -140, -345, 60, -120, 1);
        this.decomposeEvent(800, this.moleculeArr1);
        this.addMoveAni(2, this.moleculeArr2);
        this.runAnimation1(this.moleculeArr2, 330, 130, 60, -120, 2);
        this.decomposeEvent1(800, this.moleculeArr2, 160, 90, 60);
        if (document.documentElement.clientHeight < 965 && document.documentElement.clientHeight > 957) {
            this.camera.position.set(0, 0, 800);
        } else if (document.documentElement.clientHeight < 810 && document.documentElement.clientHeight > 600) {
            this.camera.position.set(0, 0, 780);
        } else if (document.documentElement.clientHeight < 600 && document.documentElement.clientHeight > 460) {
            this.camera.position.set(0, 0, 680);
        } else {
            this.camera.position.set(0, 0, 600);
        }
    }
    // 不断改变柱状图的函数
    changeEChart (val: number) {
        this.timer5 = setInterval(() => {
            this.number1 = (Math.random() * 2 - 1) + 5;
            if (val === 0) {
                this.number2 = (Math.random() * 2 - 1) + 5;
            } else if (val === 1) {
                this.number2 = (Math.random() * 2 - 1) + 8;
            }
            this.myChart.setOption({
                animationDurationUpdate: this.time,
                series: [{
                    data: [this.number1, this.number2],
                }]
            });
        }, 60);
    }
    // 创建容器分子函数
    creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, arr: any) {
        if (num === 1) {
            const randomX1 = Math.random() * 240 - 360;
            const randomY1 = Math.random() * 160 - 90;
            molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY1, -140, -345, 60, -120);
        } else if (num === 2) {
            const randomX1 = Math.random() * 200 + 130;
            const randomY1 = Math.random() * 160 - 90;
            molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY1, 330, 130, 60, -120);
        } else if (num === 3) {
            const randomX1 = Math.random() * 200 + 130;
            const randomY1 = Math.random() * 80 - 100;
            molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY1, 330, 130, -20, -120);
        }
        arr.push(molecule, );
        molecule.addSince(this.scene);
    }
    // 初始状态下容器分子组运动函数
    addMoveAni(num: number, arr: any) {
        for (let i = 0; i < 8; i++) {
            this.creatMolecule(this.activeA, 38, 38, moleculeA, 'activeA', num, arr);
            this.creatMolecule(this.activeB, 25, 25, moleculeB, 'activeB', num, arr);
        }
    }
    // 添加He元素容器内分子组运动函数
    addMoveAniHe(num: number, arr: any) {
        for (let i = 0; i < 8; i++) {
            this.creatMolecule(this.activeA, 38, 38, moleculeA, 'activeA', num, arr);
            this.creatMolecule(this.activeB, 25, 25, moleculeB, 'activeB', num, arr);
            this.creatMolecule(this.moleculeHe, 25, 25, moleculeHe, 'He', num, arr);
        }
    }
    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    // 分子及离子碰撞后对应的反应事件
    runIntoAni(index: number, arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number,
               num: number, ) {
        for (let i = 0, L = arr.length; i < L; i++) {
            const d = this.getDistance(arr[i], arr[index]);
            if (d <= 25.5) {
                this.mediumEvent(index, i, arr, maxWidth, minWidth, maxHeight, minHeight, num, );
            }
        }
    }
    // 碰撞反弹函数
    reboundEvent(index: number, i: number, arr: any) {
        arr[index].speedX -= arr[i].box.position.x - arr[index].box.position.x;
        arr[index].speedY -= arr[i].box.position.y - arr[index].box.position.y;
        arr[i].speedX -= arr[i].box.position.x - arr[i].box.position.x;
        arr[i].speedY -= arr[i].box.position.y - arr[i].box.position.y;
    }
    // A/B分子反应生成AB分子
    mediumEvent(index: number, i: number, arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number,
                num: number, ) {
        if (arr[i].box.name === 'activeA' && arr[index].box.name === 'activeB') {
            this.activeAB = new RandomDot((arr[i].box.position.x + arr[index].box.position.x) / 2,
                (arr[i].box.position.y + arr[index].box.position.y) / 2, 0, 44.1, 41.4, moleculeC, 'activeAB');
            this.activeAB.addSince(this.scene);
            this.activeAB.selfMoveAnimate1((arr[i].box.position.x + arr[index].box.position.x) / 2,
                (arr[i].box.position.y + arr[index].box.position.y) / 2, maxWidth, minWidth, maxHeight, minHeight);
            this.activeAB.changeOpacityEvt1(1);
            arr[i].removeSince(this.scene);
            arr[index].removeSince(this.scene);
            this.activeAB1 = new RandomDot((arr[i].box.position.x + arr[index].box.position.x) / 2,
                (arr[i].box.position.y + arr[index].box.position.y) / 2, 0, 1, 1, moleculeC, 'activeAB1');
            this.activeAB1.changeOpacityEvt1(1);
            arr.splice(i, 1, this.activeAB);
            arr.splice(index, 1, this.activeAB1);
        } else {
            this.reboundEvent(index, i, arr);
        }
    }
    //AB分子消失并生成A/B分子函数
    disappearEvent (arr: any, randomX: number, x: number, randomY: number, y: number, maxWidth: number,
                    minWidth: number, maxHeight: number) {
        for (let i = 0, L = arr.length; i < L; i++) {
            if (arr[i].box.name === 'activeAB') {
                if ((arr[i].box.material as any).opacity <= 0) {
                    const randomX1 = Math.random() * randomX - x;
                    const randomY1 = Math.random() * randomY - y;
                    this.activeA = new RandomDot(randomX1, randomY1, 0, 38, 38, moleculeA, 'activeA');
                    this.activeA.selfMoveAnimate1(randomX1, randomY1, maxWidth, minWidth, maxHeight, -120);
                    arr[i].removeSince(this.scene);
                    arr.splice(i, 1, this.activeA);
                    this.activeA.addSince(this.scene);
                    this.activeA.changeOpacityEvt(0);
                }
            }
        }
        for (let i = 0, L = arr.length; i < L; i++) {
            if (arr[i].box.name === 'activeAB1') {
                if ((arr[i].box.material as any).opacity <= 0) {
                    const randomX1 = Math.random() * randomX - x;
                    const randomY1 = Math.random() * randomY - y;
                    this.activeB = new RandomDot(randomX1, randomY1, 0, 25, 25, moleculeB, 'activeB');
                    this.activeB.selfMoveAnimate1(randomX1, randomY1, maxWidth, minWidth, maxHeight, -120);
                    arr[i].removeSince(this.scene);
                    arr.splice(i, 1, this.activeB);
                    this.activeB.addSince(this.scene);
                    this.activeB.changeOpacityEvt(0);
                }
            }
        }
    }
    // 让左边容器内AB分子消失并生成A/B分子函数
    decomposeEvent(time: number, arr: any) {
        this.timer2 = setInterval(() => {
            this.disappearEvent(arr, 240, 360, 160, 90, -140, -345, 60);
        }, time);
    }
    // 让右边容器内AB分子消失并生成A/B分子函数
    decomposeEvent1(time: number, arr: any, randomY: number, y: number, maxHeight: number) {
        this.timer3 = setInterval(() => {
            this.disappearEvent(arr, 200, -130, randomY, y, 330, 130, maxHeight);
        }, time);
    }
    // 容器中分子碰撞反弹及反应事件
    rebound (arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number,
             num: number, ) {
        for (let i = 0, L = arr.length; i < L; i++) {
            this.runIntoAni(i, arr, maxWidth, minWidth, maxHeight, minHeight, num, );
            const sphere = arr[i];
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
            let r;
            if (sphere.box.name === 'activeA' || sphere.box.name === 'activeB' || sphere.box.name === 'activeAB') {
                const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
                r = 0.7 / speed;
            } else {
                const speed = Math.sqrt(sphere.speedX * sphere.speedX + sphere.speedY * sphere.speedY);
                r = 0.5 / speed;
            }
            sphere.speedX *= r;
            sphere.speedY *= r;
            sphere.box.position.x += sphere.speedX;
            sphere.box.position.y += sphere.speedY;
        }
    }
    // 反应中分子的运动函数
    runAnimation(arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number, num: number, ) {
        const thiz = this;
        function ani() {
            thiz.rebound(arr, maxWidth, minWidth, maxHeight, minHeight, num, );
            thiz.timer1 = requestAnimationFrame(ani);
        }
        ani();
    }
    // 反应中分子的运动函数
    runAnimation1(arr: any, maxWidth: number, minWidth: number, maxHeight: number, minHeight: number, num: number, ) {
        const thiz = this;
        function ani() {
            thiz.rebound(arr, maxWidth, minWidth, maxHeight, minHeight, num, );
            thiz.timer4 = requestAnimationFrame(ani);
        }
        ani();
    }
    // 清空数组中分子并清除碰撞反弹动画的时间
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].removeSince(this.scene);
        }
        this.moleculeArr2 = [];
        // 清除碰撞动画时间
        cancelAnimationFrame(this.timer4);
        clearInterval(this.timer3);
        clearInterval(this.timer5);
        this.group1.children[1].position.y = 140;
        this.group1.children[4].position.y = 125;
    }

    // 两种状态下的分子运动反应情况
    constituteMoleculeEvt (index: number) {
        this.anewMolecule();
        if (index === 1) {
            this.group1.children[1].position.y = 40;
            this.group1.children[4].position.y = 25;
            this.addMoveAni(3, this.moleculeArr2);
            this.runAnimation1(this.moleculeArr2, 330, 130, -20, -120, 2);
            this.decomposeEvent1(800, this.moleculeArr2, 80, 100, -20);
            this.number2 = 8;
            this.time = 1000;
            this.changeEChart(1);
        } else if (index === 2) {
            this.addMoveAniHe(2, this.moleculeArr2);
            this.rightAniEvt();
        }
    }
    // 右侧容器分子非减小体积时的运动反应情况
    rightAniEvt () {
        this.runAnimation1(this.moleculeArr2, 330, 130, 60, -120, 2);
        this.decomposeEvent1(800, this.moleculeArr2, 160, 90, 60);
        this.number2 = 5;
        this.time = 50;
        setTimeout(() => {
            this.time = 1000;
        }, 100);
        this.changeEChart(0);
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    reset () {
        this.anewMolecule();
        this.addMoveAni(2, this.moleculeArr2);
        this.rightAniEvt();
    }
    // 设置柱状图样式
    histogram() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            animationDuration: 50,
            xAxis: {
                data: ['', '', ],
                name: '',
                nameTextStyle: {
                    fontSize: 30
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                axisLine: {
                    show: false,
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#000',
                        width: 3
                    },
                    textStyle: {
                        color: '#EDEDED',
                        fontWeight: 'normal',
                        fontSize: 30
                    },
                },
                axisLabel: {
                    fontSize: 18,
                },
                boundaryGap: false,
            },
            // 设置柱状图向左或者向右偏移多少位置
            grid: {
                right: '20%',
            },
            yAxis: {
                type: 'value',
                max: 12,
                min: 0,
                splitNumber: 1,
                name: '',
                nameTextStyle: {
                    fontSize: 20
                },
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
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#000',
                        width: 3
                    },
                },
            },
            series: [{
                data: [this.number1, this.number2],
                type: 'bar',
                barWidth : 30,
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params: any) {
                            const colorList = ['#4169E1', '#d17830'];
                            return colorList[params.dataIndex];
                        }
                    },
                },
            }]
        };
        this.myChart.setOption(option);
    }
}




