import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {RandomDot} from './RandomDot';
const eCharts = require('echarts');
import * as cub1 from '../sub_static/UI/cub1.png';
import * as cub2 from '../sub_static/UI/cub2.png';
import * as llzImg from '../sub_static/UI/Cl.png';
import * as sfzImg from '../sub_static/UI/H2O.png';
import * as nImg from '../sub_static/UI/Na.png';
import * as lsgImg from '../sub_static/UI/so4.png';
import * as baImg from '../sub_static/UI/ba.png';
import * as BaSO4Img from '../sub_static/UI/BaSO4.png';
import * as solidImg from '../sub_static/UI/solid.png';
import * as solidHImg from '../sub_static/UI/solidH.png';
import * as whiteBg from '../sub_static/UI/whiteBg.png';
import * as BaSO4Solid from '../sub_static/UI/BaSO4Solid.png';
import * as cub3 from '../sub_static/UI/cub3.png';
export class Csdlph extends ThreeBase {
    private cub1 = ThreeUtil.createImg(325.5, 270, cub1, -150, -10, 0);
    private cub2 = ThreeUtil.createImg(325.5, 270, cub2, -150, -10, 0);
    private cub3 = ThreeUtil.createImg(325.5, 270, cub3, -150, -10, 2);
    private whiteBg = ThreeUtil.createImg(150, 28, whiteBg, -128, 67, 3);
    private whiteBg1 = ThreeUtil.createImg(25, 220, whiteBg, -307.5, -30, 3);
    private whiteBg2 = ThreeUtil.createImg(25, 220, whiteBg, 17, -30, 3);
    private whiteBg3 = ThreeUtil.createImg(450, 120, whiteBg, -150, -203, 3);
    private BaSO4Img = ThreeUtil.createImg(44.4, 9.6, BaSO4Img, -80, -135, 3);
    private solidImg = ThreeUtil.createImg(204.8, 12.6, solidImg, -125, -135.6, 2);
    private solidHImg = ThreeUtil.createImg(204.8, 25.4, solidHImg, -125, -128.6, 2);
    private BA: any;
    private SO4: any;
    private H2O: any;
    private Cl: any;
    private Na: any;
    private BaSO4Solid: any;
    private moleculeArr1: any = [];
    private moleculeArr2: any = [];
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private mark = false;
    dataBaSO4 = 0;
    myChart: any;
    number1 = 9;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
        //获取到窗口的一半高度和一半宽度
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const vector = this.BaSO4Img.position.clone().project(this.camera);
        let vector_x = vector.x * 1.4;
        let vector_y = vector.y * 0.95;
        if (document.documentElement.clientHeight < 455) {
            vector_x = vector.x * 1.6;
            vector_y = vector.y * 0.9;
        } else {
            vector_x = vector.x * 1.4;
            vector_y = vector.y * 0.95;
        }
        document.getElementById('BaSO4').style.left = `${vector_x * halfWidth + halfWidth}px`;
        document.getElementById('BaSO4').style.top = `${-vector_y * halfHeight + halfHeight}px`;
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
        this.scene.add(this.cub1, this.cub2, this.cub3, this.whiteBg, this.whiteBg1, this.whiteBg2, this.whiteBg3,
            this.solidImg, this.solidHImg);
        this.cub2.visible = false;
        this.solidHImg.visible = false;
        this.initialMoveAni();
        this.runAnimation(0);
    }
    // 创建分子函数
    creatMolecule(molecule: any, width: number, height: number, img: any, name: string, num: number, ) {
        const randomX1 = Math.random() * 260 - 280;
        const randomY1 = Math.random() * 30 - 120;
        const randomY2 = Math.random() * 120 - 80;
        const randomX2 = Math.random() * 50 - 165;
        if (num === 1) {
            molecule = new RandomDot(randomX1, randomY1, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY1, -27, -266, 27, -116);
        } else if (num === 2) {
            molecule = new RandomDot(randomX1, randomY2, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX1, randomY2, -27, -266, 27, -116);
        } else if (num === 4) {
            //添加固体后从烧杯底部溶解的分子
            molecule = new RandomDot(-80, -118, 1, width, height, img, name);
            molecule.selfMoveAnimate1(-80, -118, -27, -266, 27, -116);
            molecule.changeOpacityEvt(0);
        } else if (num === 5) {
            //添加固体后从烧杯底部溶解的分子
            molecule = new RandomDot(-75, -123, 1, width, height, img, name);
            molecule.selfMoveAnimate1(-75, -123, -27, -266, 27, -116);
            molecule.changeOpacityEvt(0);
        } else {
            molecule = new RandomDot(randomX2, 63, 1, width, height, img, name);
            molecule.selfMoveAnimate1(randomX2, 63, -27, -266, 27, -116);
        }
        this.moleculeArr1.push(molecule, );
        molecule.addSince(this.scene);
    }
    // 初始状态下分子组运动函数
    initialMoveAni() {
        for (let i = 0; i < 5; i++) {
            this.creatMolecule(this.BA, 24, 24, baImg, 'BA', 1);
            this.creatMolecule(this.SO4, 24, 24, lsgImg, 'SO4', 2);
        }
    }
    // 加水状态下分子组运动函数
    addWaterEvent() {
        for (let i = 0; i < 2; i++) {
            this.creatMolecule(this.BA, 24, 24, baImg, 'BA', 4);
            this.creatMolecule(this.SO4, 24, 24, lsgImg, 'SO4', 5);
        }
    }
    // 添加Na₂SO₄固体分子后溶解的分子运动函数
    addSodaEvent() {
        for (let i = 0; i < 4; i++) {
            this.creatMolecule(this.Na, 20, 20, nImg, 'Na', 3);
        }
        for (let i = 0; i < 2; i++) {
            this.creatMolecule(this.SO4, 24, 24, lsgImg, 'SO4', 3);
        }
    }
    // 添加BaCl₂固体后分子组运动函数
    addSodaAcEvent() {
        for (let i = 0; i < 4; i++) {
            this.creatMolecule(this.Cl, 22, 22, llzImg, 'Cl', 3);
        }
        for (let i = 0; i < 2; i++) {
            this.creatMolecule(this.BA, 24, 24, baImg, 'BA', 3);
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
            if (d <= 25) {
                if (val === 0) {
                    this.reboundEvent(index, i);
                } else if (val === 3) {
                    this.addSodaReaction(index, i);
                } else if (val === 4) {
                    this.addSodaAcReaction(index, i);
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
    // 添加Na₂SO₄固体后分子反应函数
    addSodaReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'BA' && this.moleculeArr1[index].box.name === 'SO4') {
            this.BaSO4Solid = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 47, 25.7,
                BaSO4Solid, 'BaSO4Solid');
            this.BaSO4Solid.moveAnimate((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2,
                (this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2 + 5, -160, false);
            this.H2O = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 1, 1, sfzImg, 'H2O');
            this.H2O.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -27, -266, 27, -116);
            this.BaSO4Solid.addSince(this.scene);
            this.moleculeArr2.push(this.BaSO4Solid);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.H2O);
            this.moleculeArr1.splice(index, 1, this.H2O);
            this.dataBaSO4 ++;
            this.number1 -= 1.5;
            this.myChart.setOption({
                animationDurationUpdate: 3000,
                series: [{
                    data: [this.number1, ],
                }]
            });
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加BaCl₂固体后分子反应函数
    addSodaAcReaction (index: number, i: number) {
        if (this.moleculeArr1[i].box.name === 'BA' && this.moleculeArr1[index].box.name === 'SO4') {
            this.H2O = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 1, 1, sfzImg, 'H2O');
            this.H2O.selfMoveAnimate1((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, -27, -266, 27, -116);
            this.BaSO4Solid = new RandomDot((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2, 0, 47, 25.7,
                BaSO4Solid, 'BaSO4Solid');
            this.BaSO4Solid.moveAnimate((this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2,
                (this.moleculeArr1[i].box.position.y + this.moleculeArr1[index].box.position.y) / 2,
                (this.moleculeArr1[i].box.position.x + this.moleculeArr1[index].box.position.x) / 2 + 5, -160, false);
            this.BaSO4Solid.addSince(this.scene);
            this.moleculeArr2.push(this.BaSO4Solid);
            this.moleculeArr1[i].removeSince(this.scene);
            this.moleculeArr1[index].removeSince(this.scene);
            this.moleculeArr1.splice(i, 1, this.H2O);
            this.moleculeArr1.splice(index, 1, this.H2O);
            this.dataBaSO4 ++;
            this.number1 += 4.5;
            this.myChart.setOption({
                animationDurationUpdate: 3000,
                series: [{
                    data: [this.number1, ],
                }]
            });
        } else {
            this.reboundEvent(index, i);
        }
    }
    // 添加Na₂SO₄固体/BaCl₂固体后当其中的两个BA与SO4结合后不再发生反应
    preventEvent() {
        const thiz = this;
        function ani() {
            if (thiz.dataBaSO4 === 2) {
                cancelAnimationFrame(thiz.timer3);
                for (let i = 0, L = thiz.moleculeArr1.length; i < L; i++) {
                    if (thiz.moleculeArr1[i].box.name === 'BA') {
                        thiz.moleculeArr1[i].box.name = 'BA1';
                    } else if (thiz.moleculeArr1[i].box.name === 'SO4') {
                        thiz.moleculeArr1[i].box.name = 'SO41';
                    }
                }
            }
            thiz.timer3 = requestAnimationFrame(ani);
        }
        ani();
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
                const r = 0.5 / speed;
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
    changeEchartData (num1: number, time: number, ) {
        this.number1 = num1;
        this.myChart.setOption({
            animationDurationUpdate: time,
            series: [{
                data: [this.number1, ],
            }]
        });
    }
    // 每次点击按钮后清除时间清除分子组添加分子组事件
    resetEvent() {
        this.changeEchartData(9, 30);
        // 清除碰撞动画时间
        cancelAnimationFrame(this.timer1);
        // 清除添加固体后切换堆积固体图片时间
        clearTimeout(this.timer2);
        // 清除阻止BA和SO4结合的时间
        cancelAnimationFrame(this.timer3);
        if (this.mark) {
            this.anewMolecule();
        }
        this.mark = true;
        this.cub1.visible = true;
        this.cub2.visible = false;
        this.whiteBg.position.y = 79;
        this.whiteBg.position.x = -127;
        this.whiteBg.scale.set(1.15, 1.9, 1);
        this.solidHImg.visible = false;
        this.solidImg.visible = true;
        this.dataBaSO4 = 0;
    }
    // 清空数组中分子并重新添加分子
    anewMolecule () {
        for (let i = 0; i < this.moleculeArr1.length; i++) {
            this.moleculeArr1[i].removeSince(this.scene);
        }
        this.moleculeArr1 = [];
        for (let i = 0; i < this.moleculeArr2.length; i++) {
            this.moleculeArr2[i].removeSince(this.scene);
        }
        this.moleculeArr2 = [];
        this.initialMoveAni();
    }
    changeEvent(index: number) {
        if (index === 1) {
            this.resetEvent();
            this.cub1.visible = false;
            this.cub2.visible = true;
            this.whiteBg.position.y = 93;
            this.whiteBg.scale.set(1, 1, 1);
            this.runAnimation(0);
            this.changeEchartData(4.5,  3000);
            this.timer2 = setTimeout(() => {
                this.addWaterEvent();
                for (let i = 0; i < 12; i++) {
                    this.moleculeArr1[i].stopMoveAnimate3();
                    this.moleculeArr1[i].selfMoveAnimate1(this.moleculeArr1[i].box.position.x,
                        this.moleculeArr1[i].box.position.y, -25, -268, 53, -118);
                }
                this.changeEchartData(9, 3000);
            }, 3500);
        } else if (index === 2) {
            this.resetEvent();
            this.runAnimation(0);
            this.solidHImg.visible = true;
            this.solidImg.visible = false;
        } else if (index === 3) {
            this.resetEvent();
            this.addSodaEvent();
            this.runAnimation(3);
            this.preventEvent();
        } else if (index === 4) {
            this.resetEvent();
            this.addSodaAcEvent();
            this.runAnimation(4);
            this.preventEvent();
        }
    }
    // 设置电离柱状图样式
    histogram1() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            // 初始动画的时长
            animationDuration: 30,
            xAxis: {
                data: ['', ],
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
                data: [this.number1, ],
                type: 'bar',
                barWidth : 15,
                itemStyle: {
                    normal: {
                        barBorderRadius: [10, ],
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
        this.dataBaSO4 = 0;
        this.cub1.visible = true;
        this.cub2.visible = false;
        this.changeEchartData(9, 30);
        cancelAnimationFrame(this.timer1);
        clearTimeout(this.timer2);
        cancelAnimationFrame(this.timer3);
        this.mark = false;
        this.anewMolecule();
        this.runAnimation(0);
        this.whiteBg.position.y = 67;
        this.whiteBg.position.x = -127;
        this.whiteBg.scale.set(1.15, 1, 1);
        this.solidHImg.visible = false;
        this.solidImg.visible = true;
    }

}




