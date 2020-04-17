import * as THREE from 'three';
import { WebGLRenderer } from 'three';
// import $ from 'jquery-ts';
import { MainVueComponent } from '../mainVueComponent';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { Utils } from './Utils';
import { SliderControlLine } from './SliderControlLine';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as objectiveTable from '../sub_static/UI/objectiveTable.png';
import * as objectiveTable1 from '../sub_static/UI/objectiveTable1.png';
import * as microscope from '../sub_static/UI/microscope.png';
import * as objImg from '../sub_static/UI/objImg.png';
import * as objImg2 from '../sub_static/UI/objImg2.png';
import * as projection1 from '../sub_static/UI/projection1.png';
import * as projection2 from '../sub_static/UI/projection2.png';
import * as btn4 from '../sub_static/UI/1_1.png';
import * as btn5 from '../sub_static/UI/2_2.png';
import * as btn6 from '../sub_static/UI/3_3.png';
import * as slide from '../sub_static/UI/slide.png';
import * as slidetext1 from '../sub_static/UI/11.png';
import * as slidetext2 from '../sub_static/UI/22.png';
import * as slidetext3 from '../sub_static/UI/33.png'

import common from './CommonForThree';
export class Gdsfgs extends ThreeBase {
    sliderControlLine: SliderControlLine;
    // 提示字    
    // private textLeft1 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });

    private text1 = common.createPlane(50, 15, '', 0, { position: [-385, 150, 1] });
    private text2 = common.createPlane(50, 15, '', 0, { position: [15, 220, 1] });
    private text3 = common.createPlane(50, 15, '', 0, { position: [15, -155, 1] });
    private text4 = common.createPlane(215, 15, '', 0, { position: [15, -155, 1] });
    //载具
    private objectiveTable = Utils.createImg(20, 40, 0, 478, 318, objectiveTable);
    private objectiveTable1 = Utils.createImg(20, 40, 5, 478, 318, objectiveTable1);
    private microscope = Utils.createImg(400, 20, 2, 96, 258, microscope);
    private objImg1 = Utils.createImg(-400, 20, 0, 219, 219, objImg);
    private objImg2 = Utils.createImg(-400, 20, 3, 325, 325, objImg2);
    private objImg = Utils.createImg(15, 30, 0, 219, 219, objImg);
    private projection1 = Utils.createImg(318, 20, 0, 95, 277, projection1);
    private projection2 = Utils.createImg(-320, 20, 4, 216, 218, projection2);
    // 按钮
    private slide = ThreeUtil.createImg(103, 37, slide, -150, -200, 0);
    private slide2 = ThreeUtil.createImg(103, 37, slide, 15, -200, 0);
    private slide3 = ThreeUtil.createImg(103, 37, slide, 180, -200, 0);
    private slidetext1 = ThreeUtil.createImg(37, 37, slidetext1, -150, -200, 0);
    private slidetext2 = ThreeUtil.createImg(37, 37, slidetext2, 15, -200, 0);
    private slidetext3 = ThreeUtil.createImg(37, 37, slidetext3, 180, -200, 0);
    // 映射
    private btn4 = Utils.createImg(-5, -23, 1, 110, 110, btn4);
    private btn5 = Utils.createImg(-48, 30, 0, 90, 90, btn5);
    private btn6 = Utils.createImg(80, -20, 0, 90, 90, btn6);
    private timer: any;
    private group = new THREE.Group();
    private group2 = new THREE.Group();
    private group3 = new THREE.Group();
    private mark = false;
    private mainVueComponent = new MainVueComponent();
    browserInfo: BrowserInfo;
    private render = () => {
        this.copyThreeBoxPos(this.text1, 'text1');
        this.copyThreeBoxPos(this.text2, 'text2');
        this.copyThreeBoxPos(this.text3, 'text3');
        this.copyThreeBoxPos(this.text4, 'text4');
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
        //获取到窗口的一半高度和一半宽度
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const vector = this.slide.position.clone().project(this.camera);
        const vector2 = this.slide2.position.clone().project(this.camera);
        const vector3 = this.slide3.position.clone().project(this.camera);
        let vector_x = vector.x * 1.35;
        let vector_y = vector.y * 0.9;
        let vector_x2 = (vector2.x + 1) * 0.2;
        let vector_y2 = vector2.y * 0.9;
        let vector_x3 = vector3.x * 0.65;
        let vector_y3 = vector3.y * 0.9;
        if (document.documentElement.clientWidth < 730) {
            vector_x = vector.x * 1.6;
            vector_y = vector.y * 0.9;
            vector_x2 = vector2.x * 1.6;
            vector_y2 = vector2.y * 0.9;
            vector_x3 = vector3.x * 1.6;
            vector_y3 = vector3.y * 0.9;
        } else {
            vector_x = vector.x * 1.35;
            vector_y = vector.y * 0.9;
            vector_x2 = (vector2.x - 0.9) * 0.1;
            vector_y2 = vector2.y * 0.9;
            vector_x3 = vector3.x * 0.65;
            vector_y3 = vector3.y * 0.9;
        }

        document.getElementById('slide').style.left = `${vector_x * halfWidth + halfWidth}px`;
        document.getElementById('slide').style.top = `${-vector_y * halfHeight + halfHeight}px`;
        document.getElementById('slide2').style.left = `${vector_x2 * halfWidth + halfWidth}px`;
        document.getElementById('slide2').style.top = `${-vector_y2 * halfHeight + halfHeight}px`;
        document.getElementById('slide3').style.left = `${vector_x3 * halfWidth + halfWidth}px`;
        document.getElementById('slide3').style.top = `${-vector_y3 * halfHeight + halfHeight}px`;
        // 遮罩按钮
        document.getElementById('slide1').style.left = `${vector_x * halfWidth + halfWidth}px`;
        document.getElementById('slide1').style.top = `${-vector_y * halfHeight + halfHeight}px`;
        document.getElementById('slide21').style.left = `${vector_x2 * halfWidth + halfWidth}px`;
        document.getElementById('slide21').style.top = `${-vector_y2 * halfHeight + halfHeight}px`;
        document.getElementById('slide31').style.left = `${vector_x3 * halfWidth + halfWidth}px`;
        document.getElementById('slide31').style.top = `${-vector_y3 * halfHeight + halfHeight}px`;
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
        this.browserInfo = (window as any)['env'].browserInfo;
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initObject();
        this.initEvt();
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
        // this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor(0x1b1b1b);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.slide, this.slide2, this.slide3]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }
    // three内元素适配
    initHyperbola() {
        const width1 = document.documentElement.clientWidth;
        console.log(width1);
        switch (width1) {
            case 2048:
                this.camera.position.set(0, 0, 700);
                this.text4.position.set(-25, -155, 1);
                break;
            case 1920:
                this.camera.position.set(0, 0, 700);
                this.text3.position.set(7, -155, 1);
                this.text4.position.set(-35, -155, 1);
                break;
            case 1600:
                    this.camera.position.set(0, 0, 750);
                    this.text4.position.set(-20, -155, 1);
                    break;
            case 1536:
                this.camera.position.set(0, 0, 750);
                this.text4.position.set(0, -155, 1);
                break;
            case 1280:
                this.camera.position.set(0, 0, 750);
                this.text4.position.set(-27, -155, 1);
                break;
            case 1231:
                this.camera.position.set(0, 0, 850);
                this.text4.position.set(-30, -155, 1);
                break;
            case 1226:
                this.camera.position.set(0, 0, 850);
                this.text4.position.set(-20, -155, 1);
                break;
            case 1027:
                this.camera.position.set(0, 0, 850);
                this.text4.position.set(-30, -155, 1);
                break;
            case 1024:
                this.camera.position.set(0, 0, 850);
                this.text4.position.set(-10, -155, 1);
                break;
            case 854:
                this.camera.position.set(0, 0, 780);
                this.text4.position.set(-30, -155, 1);
                break
            case 818:
                this.camera.position.set(0, 0, 780);
                this.text4.position.set(-35, -155, 1);
                break
            case 806:
                this.camera.position.set(0, 0, 780);
                this.text4.position.set(0, -155, 1);
                break;
            case 730:
                this.camera.position.set(0, 0, 680);
                this.text1.position.set(-399, 160, 1);
                this.text2.position.set(15, 230, 1);
                this.text3.position.set(-9, -145, 1);
                this.text4.position.set(-60, -145, 1);
                this.myId("slide").style.width = 9 + '%';
                this.myId("slide2").style.width = 9 + '%';
                this.myId("slide3").style.width = 9 + '%';
                this.myId("slide1").style.width = 9 + '%';
                this.myId("slide21").style.width = 9 + '%';
                this.myId("slide31").style.width = 9 + '%';
                break;
            case 667:
                this.camera.position.set(0, 0, 680);
                this.text1.position.set(-399, 160, 1);
                this.text2.position.set(15, 230, 1);
                this.text3.position.set(15, -145, 1);
                this.text4.position.set(-105, -145, 1);
                this.myId("slide").style.width = 9 + '%';
                this.myId("slide2").style.width = 9 + '%';
                this.myId("slide3").style.width = 9 + '%';
                this.myId("slide1").style.width = 9 + '%';
                this.myId("slide21").style.width = 9 + '%';
                this.myId("slide31").style.width = 9 + '%';
                break;
            case 640:
                this.text1.position.set(-399, 160, 1);
                this.text2.position.set(15, 230, 1);
                this.text3.position.set(15, -145, 1);
                this.text4.position.set(-60, -145, 1);
                this.myId("slide").style.width = 9 + '%';
                this.myId("slide2").style.width = 9 + '%';
                this.myId("slide3").style.width = 9 + '%';
                this.myId("slide1").style.width = 9 + '%';
                this.myId("slide21").style.width = 9 + '%';
                this.myId("slide31").style.width = 9 + '%';
                break;
        }
        if (document.documentElement.clientHeight == 360) {
            this.camera.position.set(0, 0, 700);
        }
    }
    /**
     * 初始化场景元素
     */
    initObject() {
        this.slide.name = 'slide';
        this.slide2.name = 'slide2';
        this.slide3.name = 'slide3';
        this.btn4.name = 'btn4';
        this.btn5.name = 'btn5';
        this.btn6.name = 'btn6';
        this.initHyperbola();
        this.scene.add(this.objectiveTable, this.microscope, this.projection1, this.objectiveTable1, this.objImg1, this.objImg2,
            this.text1, this.text2, this.text3, this.projection2, this.group, this.slide, this.slidetext1, this.slide2, this.slidetext2,
            this.slide3, this.slidetext3);
    }

    // 点击事件
    downHandle(name: string): void {

    }

    down_Handle(val: number) {
        if (val === 1) {
            this.reset();
            this.group.add(this.objImg, this.btn4);
            this.group.children[1].visible = false;
            this.group.position.set(-385, 50, 0);
            // this.group.position.set(-385, 50, 0);
            this.group.rotation.z = -Math.PI;
            this.scene.add(this.group);
            this.moveAnimate(this.slide, this.slidetext1, -150, -200, 1, -20);
        } else if (val === 2) {
            this.reset();
            this.group2.add(this.objImg, this.btn5);
            this.group2.position.set(-385, 50, 0);
            this.group2.rotation.z = -Math.PI;
            this.group2.children[1].visible = false;
            this.scene.add(this.group2);
            this.moveAnimate(this.slide2, this.slidetext2, 15, -200, -35, 40);
        } else if (val === 3) {
            this.reset();
            this.group3.add(this.objImg, this.btn6);
            this.group3.children[1].visible = false;
            this.group3.position.set(-385, 50, 0);
            this.group3.rotation.z = -Math.PI;
            this.scene.add(this.group2, this.group3);
            this.moveAnimate(this.slide3, this.slidetext3, 180, -200, 40, -20);

        }
    }
    //移动位置函数
    moveHandle(pos: any, name: string): void {
        // console.log(pos);
        (window as any).viewHandler.viewModel.$data.text = 3;
        console.log(this.mark);
        if (name === 'slide') {
            let { x, y } = pos;
            const dis = Math.sqrt(Math.pow(x - 15, 2) + Math.pow(y - 30, 2));
            if (dis < 55) {
                this.slide.position.set(x, y, 6);
                this.slidetext1.position.set(x, y, 0);
                (this.group.children[1] as any).position.set(x, y, 2);

            } else {
                const angle = Math.atan(y / x) * (180 / Math.PI);
                let x1 = null;
                let y1 = null;
                let x2 = null;
                let y2 = null;
                if (x < 0) {
                    x1 = 15 + 55 * Math.cos((angle + 180) * 3.14 / 180);
                    y1 = 30 + 55 * Math.sin((angle + 180) * 3.14 / 180);
                    x2 = 15 + 70 * Math.cos((angle + 180) * 3.14 / 180);
                    y2 = 26 + 67 * Math.sin((angle + 180) * 3.14 / 180);
                } else {
                    x1 = 15 + 55 * Math.cos(angle * 3.14 / 180);
                    y1 = 30 + 55 * Math.sin(angle * 3.14 / 180);
                    x2 = 15 + 70 * Math.cos(angle * 3.14 / 180);
                    y2 = 26 + 67 * Math.sin(angle * 3.14 / 180);
                }
                this.slide.position.set(x1, y1, 6);
                this.slidetext1.position.set(x1, y1, 0);
                (this.group.children[1] as any).position.set(x2, y2, 2);
                this.group.children[1].visible = true;
            }
        } else if (name === 'slide2') {
            let { x, y } = pos;
            const dis = Math.sqrt(Math.pow(x - 17, 2) + Math.pow(y - 33, 2));
            if (dis < 53) {
                this.slide2.position.set(x, y, 6);
                this.slidetext2.position.set(x, y, 0);
                (this.group2.children[1] as any).position.set(x, y, 2);
            } else {
                const angle = Math.atan(y / x) * (180 / Math.PI);
                let x1 = null;
                let y1 = null;
                let x2 = null;
                let y2 = null;
                if (x < 0) {
                    x1 = 15 + 46 * Math.cos((angle + 180) * 3.14 / 180);
                    y1 = 30 + 46 * Math.sin((angle + 180) * 3.14 / 180);
                    x2 = 15 + 71 * Math.cos((angle + 180) * 3.14 / 180);
                    y2 = 30 + 71 * Math.sin((angle + 180) * 3.14 / 180);
                } else {
                    x1 = 15 + 37 * Math.cos(angle * 3.14 / 180);
                    y1 = 30 + 46 * Math.sin(angle * 3.14 / 180);
                    x2 = 15 + 71 * Math.cos(angle * 3.14 / 180);
                    y2 = 30 + 71 * Math.sin(angle * 3.14 / 180);
                }
                this.slide2.position.set(x1, y1, 6);
                this.slidetext2.position.set(x1, y1, 0);
                (this.group2.children[1] as any).position.set(x2, y2, 2);
            }
        } else if (name === 'slide3') {
            let { x, y } = pos;
            const dis = Math.sqrt(Math.pow(x - 17, 2) + Math.pow(y - 33, 2));
            if (dis < 56) {
                this.slide3.position.set(x, y, 6);
                this.slidetext3.position.set(x, y, 0);
                (this.group3.children[1] as any).position.set(x, y, 2);
            } else {
                const angle = Math.atan(y / x) * (180 / Math.PI);
                let x1 = null;
                let y1 = null;
                let x2 = null;
                let y2 = null;
                if (x < 0) {
                    x1 = 15 + 55 * Math.cos((angle + 180) * 3.14 / 180);
                    y1 = 30 + 50 * Math.sin((angle + 180) * 3.14 / 180);
                    x2 = 15 + 71 * Math.cos((angle + 180) * 3.14 / 180);
                    y2 = 30 + 71 * Math.sin((angle + 180) * 3.14 / 180);
                } else {
                    x1 = 15 + 55 * Math.cos(angle * 3.14 / 180);
                    y1 = 30 + 50 * Math.sin(angle * 3.14 / 180);
                    x2 = 15 + 71 * Math.cos(angle * 3.14 / 180);
                    y2 = 30 + 71 * Math.sin(angle * 3.14 / 180);
                }
                this.slide3.position.set(x1, y1, 6);
                this.slidetext3.position.set(x1, y1, 0);
                (this.group3.children[1] as any).position.set(x2, y2, 2);
            }
        }
    }
    // 一个位置移动到另一个位置的移动动画函数
    moveAnimate(name: any, name2: any, startX: number, startY: number, endX: number, endY: number) {
        const disX = endX - startX;
        const disY = endY - startY;
        const dis = Math.hypot(disX, disY);
        const stepX = disX / dis * 1.5;
        const stepY = disY / dis * 1.5;
        let scaleX = 1;
        let scaleY = 1;
        let scaleX2 = 1;
        const thiz = this;
        (window as any).viewHandler.viewModel.$data.text = 3;
        (document.getElementById('slide') as any).style.visibility = "hidden";
        (document.getElementById('slide2') as any).style.visibility = "hidden";
        (document.getElementById('slide3') as any).style.visibility = "hidden";
        // $('#slide2').css('visibility','hidden');
        // $('#slide3').css('visibility','hidden');

        function ani() {
            if (Math.abs(endX - startX) < 0.4 && Math.abs(endY - startY)) {
                console.log(Math.abs(endX - startX));
                (window as any).viewHandler.viewModel.$data.text = 1;

                if (name === thiz.slide) {
                    thiz.group.children[1].position.set(-5, -23, 0);
                    thiz.group.visible = true;
                    thiz.group.children[1].visible = true;
                    thiz.group.children[0].visible = false;
                    (document.getElementById('slide2') as any).style.visibility = 'visible';
                    (document.getElementById('slide3') as any).style.visibility = 'visible';
                } else if (name === thiz.slide2) {
                    thiz.group2.children[1].position.set(-48, 30, 0);
                    thiz.group2.visible = true;
                    thiz.group2.children[1].visible = true;
                    thiz.group2.children[0].visible = false;
                    (document.getElementById('slide') as any).style.visibility = 'visible';
                    (document.getElementById('slide3') as any).style.visibility = 'visible';
                } else if (name === thiz.slide3) {
                    thiz.group3.visible = true;
                    thiz.group3.children[1].position.set(80, -20, 0);
                    thiz.group3.children[1].visible = true;
                    thiz.group3.children[0].visible = false;
                    (document.getElementById('slide') as any).style.visibility = 'visible';
                    (document.getElementById('slide2') as any).style.visibility = 'visible';
                }
                name.position.set(endX, endY, 6);
                name2.position.set(endX, endY, 0);
                cancelAnimationFrame(thiz.timer);
                return;
            }
            startX += stepX;
            startY += stepY;
            scaleX += 0.009;
            scaleY += 0.007;
            scaleX2 += 0.007;
            name.position.set(startX, startY, 6);
            name.scale.set(scaleX, scaleY, 1);
            name2.position.set(startX, startY, 6);
            name2.scale.set(scaleX2, scaleY, 0);
            thiz.timer = requestAnimationFrame(ani);
        }
        ani();
    }
    myId(id: any) {
        return document.getElementById(id);;
    }
    resize(width: number, height: number): void {
        // (this.camera as PerspectiveCamera).aspect = width / height;
        // (this.camera as PerspectiveCamera).updateProjectionMatrix();
        // this.renderer.setSize(width, height);
    }

    // 转坐标
    copyThreeBoxPos(mesh: THREE.Mesh, id: any) {
        const wHalf = (mesh.geometry as any).parameters.width / 2;
        const hHalf = (mesh.geometry as any).parameters.height / 2;
        const meshPosX = mesh.position.x;
        const meshPosY = mesh.position.y;
        const posXleft = meshPosX - wHalf;
        const posXright = meshPosX + wHalf;
        const posYtop = meshPosY + hHalf;
        const posYbottom = meshPosY - hHalf;
        const worldVector1 = new THREE.Vector3(posXleft, posYtop, 1);
        const worldVector2 = new THREE.Vector3(posXright, posYtop, 1);
        const worldVector3 = new THREE.Vector3(posXleft, posYbottom, 1);
        const standardVector1 = worldVector1.project(this.camera); //世界坐标转标准设备坐标
        const standardVector2 = worldVector2.project(this.camera);
        const standardVector3 = worldVector3.project(this.camera);
        const a = window.innerWidth / 2;
        const b = window.innerHeight / 2;
        const xResult = standardVector1.x * a + a; //标准设备坐标转屏幕坐标
        const yResult = -standardVector1.y * b + b; //标准设备坐标转屏幕坐标
        const wWidth = standardVector2.x * a + a - (standardVector1.x * a + a);
        const hHeight = (-standardVector3.y * b + b) - (-standardVector1.y * b + b);
        const result = { x: xResult, y: yResult, w: wWidth, h: hHeight };
        // $(`#${id}`).css({
        //     width: result.w,
        //     height: result.h,
        //     left: result.x,
        //     top: result.y
        // });
        (document.getElementById(id) as any).style.width = result.w + 'px';
        (document.getElementById(id) as any).style.height = result.h + 'px';
        (document.getElementById(id) as any).style.left = result.x + 'px';
        (document.getElementById(id) as any).style.top = result.y + 'px';
        // console.log(document.getElementById(id) as any)
    }

    //重置事件
    reset(): void {
        (window as any).viewHandler.viewModel.$data.text = 0;

        this.slide.position.set(-150, -200, 0);
        this.slide.scale.set(1, 1, 1);
        this.slidetext1.position.set(-150, -200, 0);
        this.slidetext1.scale.set(1, 1, 1);
        this.group.visible = false;

        this.slide2.position.set(15, -200, 0);
        this.slide2.scale.set(1, 1, 1);
        this.slidetext2.position.set(15, -200, 0);
        this.slidetext2.scale.set(1, 1, 1);
        this.group2.visible = false;

        this.slide3.position.set(180, -200, 0);
        this.slide3.scale.set(1, 1, 1);
        this.slidetext3.position.set(180, -200, 0);
        this.slidetext3.scale.set(1, 1, 1);
        this.group3.visible = false;
        (document.getElementById('slide') as any).style.visibility = 'visible';
        (document.getElementById('slide2') as any).style.visibility = 'visible';
        (document.getElementById('slide3') as any).style.visibility = 'visible';
        window.cancelAnimationFrame(this.timer);
    }
}




