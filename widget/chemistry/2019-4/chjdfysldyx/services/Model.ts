import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
import common from './CommonForThree';
const eCharts = require('echarts');
import * as circle from '../sub_static/UI/circle.png';
import * as activeA from '../sub_static/UI/activeA.png';
import * as activeB from '../sub_static/UI/activeB.png';
import * as activeC from '../sub_static/UI/activeAB.png';
import * as normalA from '../sub_static/UI/normalA.png';
import * as normalB from '../sub_static/UI/normalB.png';
import * as equation from '../sub_static/UI/equation.png';
import * as circleBg from '../sub_static/UI/circleBg.png';

export class Model extends ThreeBase {
    //添加反应区域
    private circle = ThreeUtil.createImg(380, 380, circle, 0, 0, 2);
    //添加反应方程式
    private equation = ThreeUtil.createImg(162.9, 41.4, equation, 0, -230, 0);
    //添加反应区域圆形背景
    private circleBg = ThreeUtil.createImg(330, 330, circleBg, 0, 0, 0);
    private circleBg1 = common.drawCircle(170);
    // 创建分子组及分子变量
    private moleculeArr1: any = [];
    private activeA: any;
    private activeB: any;
    private normalA: any;
    private normalB: any;
    private activeAB: any;
    private activeAB1: any;
    // 添加时间
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private timer4: any;
    // 添加监控单位体积内活化分子数和反应速率的变量
    number1 = 5;
    number2 = 2;
    myChart: any;
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
        this.renderer.setSize(this.width, this.height);
        (this.renderer as WebGLRenderer).setClearColor(0x333333);
        this.domElement.appendChild(this.renderer.domElement);
        this.histogram1();
    }

    initObject() {
        this.initialMoveAni(6, 8);
        this.runAnimation(20);
        this.decomposeEvent(2000);
        this.scene.add(this.circle, this.equation, this.circleBg, this.circleBg1);
        this.circleBg.visible = false;
    }
    // 设置碰撞反应柱状图样式
    histogram1() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            animationDuration: 6000,
            xAxis: {
                data: ['', '', '', '', ],
                name: '',
                nameTextStyle: {
                    fontSize: 20
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                axisLine: {
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#EDEDED',
                        width: 3
                    },
                    textStyle: {
                        color: '#EDEDED',
                        fontWeight: 'normal',
                        fontSize: 18
                    },
                },
                boundaryGap: false,
            },
            // 设置柱状图向左或者向右偏移多少位置
            grid: {
                right: '15%',
            },
            yAxis: {
                type: 'value',
                max: 8,
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
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#EDEDED',
                        width: 3
                    },
                },
            },
            series: [{
                data: ['', this.number1, this.number2, ],
                type: 'bar',
                barWidth : 30,
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params: any) {
                            const colorList = ['', '#ee6724', '#ffd652', ''];
                            return colorList[params.dataIndex];
                        }
                    },
                },
            }]
        };
        this.myChart.setOption(option);
    }
    // 创建分子函数
    creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, ) {
        const randomX1 = Math.random() * 138 * Math.cos(Math.random() * 360 / 180 * Math.PI);
        const randomY1 = Math.random() * 138 * Math.sin(Math.random() * 360 / 180 * Math.PI);
        molecule = new RandomDot(randomX1, randomY1, 0, width, height, img, name);
        molecule.selfMoveAnimate(randomX1, randomY1, 0, 0, 168);
        this.moleculeArr1.push(molecule, );
        molecule.addSince(this.scene);
    }
    // 创建初始状态下无催化剂时反应区域内分子组
    initialMoveAni(num: number, num1: number) {
        for (let i = 0; i < num; i++) {
            this.creatMolecule(this.activeA, 38, 38, activeA, 'activeA', 1);
            this.creatMolecule(this.activeB, 25, 25, activeB, 'activeB', 1);
        }
        for (let i = 0; i < num1; i++) {
            this.creatMolecule(this.normalA, 20, 20, normalA, 'normalA', 1);
            this.creatMolecule(this.normalB, 15, 15, normalB, 'normalB', 1);
        }
    }
    // 获取两个分子或离子之间的距离函数
    getDistance(p1: any, p2: any) {
        const dx = p1.box.position.x - p2.box.position.x;
        const dy = p1.box.position.y - p2.box.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    // 分子及离子碰撞后对应的反应事件
    runIntoAni(index: number, distance: number) {
        for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
            const d = this.getDistance(this.moleculeArr1[i], this.moleculeArr1[index]);
            if (d <= distance) {
                this.mediumEvent(index, i, );
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
    // A/B分子反应生成AB分子
    mediumEvent(index: number, i: number, ) {
        if (this.moleculeArr1[i].box.name === 'activeA' && this.moleculeArr1[index].box.name === 'activeB') {
            this.activeAB = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 44.1, 41.4, activeC, 'activeAB');
            this.activeAB.addSince(this.scene);
            this.activeAB.selfMoveAnimate((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 0, 168);
            this.activeAB.changeOpacityEvt1(1);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.activeAB1 = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 1, 1, activeC, 'activeAB1');
            this.activeAB1.changeOpacityEvt1(1);
            this.moleculeArr1.splice(i, 1, this.activeAB);
            this.moleculeArr1.splice(index, 1, this.activeAB1);
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 让AB分子消失并生成A/B分子函数
    decomposeEvent(time: number) {
        this.timer2 = setInterval(() => {
            for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
                if (this.moleculeArr1[i].box.name === 'activeAB') {
                    if ((this.moleculeArr1[i].box.material as any).opacity <= 0) {
                        const randomX = 68 * Math.cos(Math.random() * 360 / 180 * Math.PI);
                        const randomY = 68 * Math.sin(Math.random() * 360 / 180 * Math.PI);
                        this.activeA = new RandomDot(randomX, randomY, 1, 38, 38, activeA, 'activeA');
                        this.activeA.selfMoveAnimate(randomX, randomY, 0, 0, 168);
                        this.moleculeArr1[i].removeSince(this.scene);
                        this.moleculeArr1.splice(i, 1, this.activeA);
                        this.activeA.addSince(this.scene);
                        this.activeA.changeOpacityEvt(0);
                    }
                }
            }
            for (let i = 0, L = this.moleculeArr1.length; i < L; i++) {
                if (this.moleculeArr1[i].box.name === 'activeAB1') {
                    if ((this.moleculeArr1[i].box.material as any).opacity <= 0) {
                        const randomX = 108 * Math.cos(Math.random() * 360 / 180 * Math.PI);
                        const randomY = 108 * Math.sin(Math.random() * 360 / 180 * Math.PI);
                        this.activeB = new RandomDot(randomX, randomY, 1, 25, 25, activeB, 'activeB');
                        this.activeB.selfMoveAnimate(randomX, randomY, 0, 0, 168);
                        this.moleculeArr1[i].removeSince(this.scene);
                        this.moleculeArr1.splice(i, 1, this.activeB);
                        this.activeB.addSince(this.scene);
                        this.activeB.changeOpacityEvt(0);
                    }
                }
            }
        }, time);
    }
    // 反应中分子及离子三种不同的运动函数
    runAnimation(distance: number) {
        const thiz = this;
        function ani() {
            for (let i = 0, L = thiz.moleculeArr1.length; i < L; i++) {
                thiz.runIntoAni(i, distance);
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
            thiz.timer1 = requestAnimationFrame(ani);
        }
        ani();
    }
    // 清空数组中分子并重新添加分子
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].stopMoveAnimate();
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1 = [];
    }
    // 清除三个定时器时间
    clearTimer() {
        cancelAnimationFrame(this.timer3);
        cancelAnimationFrame(this.timer1);
        clearInterval(this.timer2);
        clearInterval(this.timer4);
    }
    // 改变柱状图数据函数
    changeEchartData (num1: number, num2: number, time: number, ) {
        this.myChart.setOption({
            animationDurationUpdate: time,
            series: [{
                data: ['', num1, num2, ''],
            }]
        });
    }
    // 无催化剂条件下反应情况
    catalyzeEvent1() {
        this.clearTimer();
        this.anewMolecule();
        this.initialMoveAni(6, 8);
        this.runAnimation(20);
        this.decomposeEvent(1000);
        this.changeEchartData(5, 2, 6000);
        this.circleBg1.visible = true;
        this.circleBg.visible = false;
    }
    // 有催化剂条件下反应情况
    catalyzeEvent2() {
        this.clearTimer();
        this.anewMolecule();
        this.initialMoveAni(13, 1);
        this.runAnimation(25);
        this.decomposeEvent(800);
        this.changeEchartData(3, 5, 6000);
        this.circleBg1.visible = false;
        this.circleBg.visible = true;
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

}




