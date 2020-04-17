import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Utils} from './Utils';
import {RandomDot} from './RandomDot';
import * as chloroplast from '../sub_static/UI/chloroplast.png';
import * as bacteria from '../sub_static/UI/bacteria.png';
import * as cotton from '../sub_static/UI/cotton.png';
import * as light from '../sub_static/UI/light.png';
import * as greenBacteria from '../sub_static/UI/green-bacteria.png';
import * as whiteBacteria from '../sub_static/UI/white-bacteria.png';

export class Egemghzysytj extends ThreeBase {
    private chloroplastImg = Utils.createImg(0, 0, 0, 200, 440, chloroplast);
    private bacteriaImg = Utils.createImg(189, 20, 0, 156, 21, bacteria);
    private cottonImg = Utils.createImg(170, 80, 0, 180, 21, cotton);
    private light1 = Utils.createImg(490, 110, 0, 822, 45, light);
    private light2 = Utils.createImg(490, 0, 0, 822, 45, light);
    private light3 = Utils.createImg(490, -110, 0, 822, 45, light);
    //FIXME 参数增加数据类型
    private whiteBacteriaImg = new THREE.TextureLoader().load(whiteBacteria as any);
    private greenBacteriaImg = new THREE.TextureLoader().load(greenBacteria as any);
    private lightGroup = new THREE.Group;
    //FIXME 参数增加数据类型
    private potArr: any = [];
    private potMoveArr: any = [];
    private bacteria: any;
    private mark: any;
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

    //初始化摄像机位置
    resetCamera(): void {
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

    initObject() {
        this.lightGroup.add(this.light1, this.light2, this.light3);
        this.scene.add(this.chloroplastImg, this.bacteriaImg, this.cottonImg);
        this.addBacteria();
    }

    // 随机添加好氧菌函数
    addBacteria() {
        for (let i = 0; i < 600; i++) {
            this.bacteria = new RandomDot(Math.random() * 231 - 115, Math.random() * 461 - 230);
            this.bacteria.addSince(this.scene);
            this.potArr.push(this.bacteria);
        }
        // 随机选取520个将要移动的好氧菌
        for (let i = 0; i < 520; i++) {
            this.potMoveArr.push(this.potArr[i]);
        }
    }

    // 点击平行光事件函数
    parallelLightEvent() {
        (this.renderer as WebGLRenderer).setClearColor(0x222222);
        this.mark = true;
        this.bacteriaImg.visible = false;
        this.cottonImg.visible = false;
        this.scene.add(this.lightGroup);
        const pointArr1 = [];
        const pointArr2 = [];
        const pointArr3 = [];
        // 将要移动到三束平行光的好氧菌分到三个组
        for (let i = 0; i < this.potMoveArr.length; i++) {
            this.potMoveArr[i].stopMoveAnimate();
            this.potMoveArr[i].stopMoveAnimate1();
            if (this.potMoveArr[i].box.position.y >= 55) {
                pointArr1.push(this.potMoveArr[i]);
            } else if (this.potMoveArr[i].box.position.y >= -55 && this.potMoveArr[i].box.position.y < 55) {
                pointArr2.push(this.potMoveArr[i]);
            } else if (this.potMoveArr[i].box.position.y < -55) {
                pointArr3.push(this.potMoveArr[i]);
            }
        }
        // 好氧菌移到三束平行光照射点处，越往外分散
        for (let i = 0; i < pointArr1.length;) {
            pointArr1[i].moveAnimate(pointArr1[i].box.position.x, pointArr1[i].box.position.y,
                    80 + Math.random() * 50 * Math.cos(i * 2), 110 + Math.random() * 60 * Math.sin(i * 2) * 0.65);
            i += 2;
        }
        for (let i = 1; i < pointArr1.length;) {
            pointArr1[i].moveAnimate(pointArr1[i].box.position.x, pointArr1[i].box.position.y,
                80 + Math.random() * 30 * Math.cos(i * 2), 110 + Math.random() * 40 * Math.sin(i * 2) * 0.55);
            i += 2;
        }
        for (let i = 0; i < pointArr2.length;) {
            pointArr2[i].moveAnimate(pointArr2[i].box.position.x, pointArr2[i].box.position.y,
                80 + Math.random() * 50 * Math.cos(i * 2), Math.random() * 60 * Math.sin(i * 2) * 0.65);
            i += 2;
        }
        for (let i = 1; i < pointArr2.length;) {
            pointArr2[i].moveAnimate(pointArr2[i].box.position.x, pointArr2[i].box.position.y,
                80 + Math.random() * 30 * Math.cos(i * 2), Math.random() * 40 * Math.sin(i * 2) * 0.55);
            i += 2;
        }
        for (let i = 0; i < pointArr3.length;) {
            pointArr3[i].moveAnimate(pointArr3[i].box.position.x, pointArr3[i].box.position.y,
                80 + Math.random() * 50 * Math.cos(i * 2), -110 + Math.random() * 60 * Math.sin(i * 2) * 0.65);
            i += 2;
        }
        for (let i = 1; i < pointArr3.length;) {
            pointArr3[i].moveAnimate(pointArr3[i].box.position.x, pointArr3[i].box.position.y,
                80 + Math.random() * 30 * Math.cos(i * 2), -110 + Math.random() * 40 * Math.sin(i * 2) * 0.55);
            i += 2;
        }
        this.potArr.forEach((item: any) => {
            item.box.material.map = this.whiteBacteriaImg;
        });
    }
    // 如果先点击平行光再点击正常光，好氧菌的移动函数
    moveEvent1 () {
        for (let i = 0; i < this.potMoveArr.length; i++) {
            let y =  this.potMoveArr[i].box.position.y + Math.random() * (50 - (-50) + 1) - 50;
            if ( this.potMoveArr[i].box.position.y >= 55 ) {
                while (y > 160 || y < 55) {
                    y = 0.45 * this.potMoveArr[i].box.position.y + Math.random() * (70 - (-20) + 1) - 20 ;
                }
                let x = - 39 / 605 * y * y + 220 * 39 / 605 * y - 695;
                if ( y >= 110) {
                    x = x - Math.random() * 70;
                    y = y + 10 + Math.random() * 10;
                    this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                        x , y);
                } else {
                    y = y + Math.random() * (10 - (-10) + 1) - 10;
                    x = x + Math.random() * (10 - (-10) + 1) - 10;
                    this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                        x , y);
                }
            } else {
                while (y < -170) {
                    y = 0.45 * this.potMoveArr[i].box.position.y + Math.random() * (70 - (-20) + 1) - 20 ;
                }
                this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                    70 * Math.cos((Math.PI / 57) * y) + Math.random() * (50 - (-50) + 1) - 50, y - 10);
            }
        }
    }
    // 如果先点击正常光，好氧菌的移动函数
    moveEvent2 () {
        for (let i = 0; i < this.potMoveArr.length; i++) {
            let y = 0.65 * this.potMoveArr[i].box.position.y + Math.random() * (50 - (-50) + 1) - 50;
            if ( this.potMoveArr[i].box.position.y >= 55 ) {
                while (y > 160 || y < 55) {
                    y = 0.65 * this.potMoveArr[i].box.position.y + Math.random() * (70 - (-20) + 1) - 20 ;
                }
                let x = - 39 / 605 * y * y + 220 * 39 / 605 * y - 695;
                if ( y >= 110) {
                    x = x - Math.random() * 70;
                    y = y + 10 + Math.random() * 10;
                    this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                        x , y);
                } else {
                    y = y + Math.random() * (10 - (-10) + 1) - 10;
                    x = x + Math.random() * (10 - (-10) + 1) - 10;
                    this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                        x , y);
                }
            } else if ( this.potMoveArr[i].box.position.y < 55 ) {
                this.potMoveArr[i].moveAnimate(this.potMoveArr[i].box.position.x, this.potMoveArr[i].box.position.y,
                    70 * Math.cos((Math.PI / 57) * y) + Math.random() * (50 - (-50) + 1) - 50, y - 10);
            }
        }
    }
    // 点击正常光事件函数
    normalLightEvent() {
        for (let i = 0; i < this.potMoveArr.length; i++) {
            this.potMoveArr[i].stopMoveAnimate1();
            this.potMoveArr[i].stopMoveAnimate();
        }
        (this.renderer as WebGLRenderer).setClearColor(0xebfffa);
        this.bacteriaImg.visible = false;
        this.cottonImg.visible = false;
        this.scene.remove(this.lightGroup);
        this.potArr.forEach((item: any) => {
            item.box.material.map = this.greenBacteriaImg;
        });
        // 好氧菌移动到叶绿体上面
        //FIXME 嵌套过多，超过3层，拆分代码，增加逻辑注释
        if (this.mark) {
            this.moveEvent1();
        } else {
            this.moveEvent2();
        }
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        (this.renderer as WebGLRenderer).setClearColor(0x222222);
        this.mark = false;
        this.bacteriaImg.visible = true;
        this.cottonImg.visible = true;
        this.scene.remove(this.lightGroup);
        for (let i = 0; i < 600; i++) {
            this.potArr[i].box.position.set(Math.random() * 231 - 115, Math.random() * 461 - 230, 0);
            this.potArr[i].box.material.map = this.whiteBacteriaImg;
            this.potArr[i].selfMoveAnimate(Math.random() * 231 - 115, Math.random() * 461 - 230);
        }
    }
}




