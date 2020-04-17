
import * as THREE from 'three';
import { WebGLRenderer, Color, Vector3, Vector2, RGBADepthPacking } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { PerspectiveCamera } from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';
import { SliderControlLine } from './SliderControlLine';
import common from './CommonForThree';
const first = require('../sub_static/first.png');
const secend = require('../sub_static/secend.png');
const thired = require('../sub_static/thired.png');
const bg1 = require('../sub_static/btn.png');
import $ from 'jquery-ts';

OBJLoader(THREE);
export class SgdhhModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private allDate: any;
    private waterBoxPos: any;
    private zoom: any;
    private createPlane = common.createPlane(100, 1000, '#171616', 0.2);
    // 页面按钮
    private firstButton: any = common.createImg([0, 80, 0], 65.6, 19.2, first);
    private vertebrate: any = common.createImg([-80, 45, 0], 48, 19.2, secend);
    private invertebrate: any = common.createImg([80, 45, 0], 48, 19.2, secend);

    private vertebrate1: any = common.createImg([-140, -18, 0], 19, 68, thired);
    private vertebrate2: any = common.createImg([-114, -18, 0], 19, 68, thired);
    private vertebrate3: any = common.createImg([-88, -18, 0], 19, 68, thired);
    private vertebrate4: any = common.createImg([-62, -18, 0], 19, 68, thired);
    private vertebrate5: any = common.createImg([-36, -18, 0], 19, 68, thired);
    private vertebrate6: any = common.createImg([-10, -18, 0], 19, 68, thired);

    private vertebrate11: any = common.createImg([140, -18, 0], 19, 68, thired);
    private vertebrate10: any = common.createImg([110, -18, 0], 19, 68, thired);
    private vertebrate9: any = common.createImg([80, -18, 0], 19, 68, thired);
    private vertebrate8: any = common.createImg([50, -18, 0], 19, 68, thired);
    private vertebrate7: any = common.createImg([20, -18, 0], 19, 68, thired);
    // color:8C8C8C
    private line1 = common.drawDashOrLine([{ x: -35, y: 63, z: 0 }, { x: -35, y: 73, z: 0 }], { color: '#FFF' });
    private line2 = common.drawDashOrLine([{ x: -140, y: 63, z: 0 }, { x: 66, y: 63, z: 0 }], { color: '#FFF' });
    private line3 = common.drawDashOrLine([{ x: -140, y: 63, z: 0 }, { x: -140, y: 50, z: 0 }], { color: '#FFF' });
    private line4 = common.drawDashOrLine([{ x: 66, y: 63, z: 0 }, { x: 66, y: 50, z: 0 }], { color: '#FFF' });

    // 2级分支
    private line5 = common.drawDashOrLine([{ x: -140, y: 40, z: 0 }, { x: -140, y: 28, z: 0 }], { color: '#FFF' });
    private line6 = common.drawDashOrLine([{ x: -224, y: 28, z: 0 }, { x: -48, y: 28, z: 0 }], { color: '#FFF' });
    private line7 = common.drawDashOrLine([{ x: -224, y: 28, z: 0 }, { x: -224, y: 18, z: 0 }], { color: '#FFF' });
    private line8 = common.drawDashOrLine([{ x: -48, y: 28, z: 0 }, { x: -48, y: 18, z: 0 }], { color: '#FFF' });
    // 
    private line9 = common.drawDashOrLine([{ x: 66, y: 40, z: 0 }, { x: 66, y: 28, z: 0 }], { color: '#FFF' });
    private line10 = common.drawDashOrLine([{ x: -10, y: 28, z: 0 }, { x: 138, y: 28, z: 0 }], { color: '#FFF' });
    private line11 = common.drawDashOrLine([{ x: 138, y: 28, z: 0 }, { x: 138, y: 18, z: 0 }], { color: '#FFF' });
    private line12 = common.drawDashOrLine([{ x: -10, y: 28, z: 0 }, { x: -10, y: 18, z: 0 }], { color: '#FFF' });
    // 图片容器
    private bg1: any = common.createImg([-141.5, -72, 0], 33, 33, bg1);
    private bg2: any = common.createImg([-115.5, -72, 0], 33, 33, bg1);
    private bg3: any = common.createImg([-89.5, -72, 0], 33, 33, bg1);
    private bg4: any = common.createImg([-63.5, -72, 0], 33, 33, bg1);
    private bg5: any = common.createImg([-37.5, -72, 0], 33, 33, bg1);
    private bg6: any = common.createImg([-11.5, -72, 0], 33, 33, bg1);
    private bg7: any = common.createImg([20, -72, 0], 33, 33, bg1);
    private bg8: any = common.createImg([50, -72, 0], 33, 33, bg1);
    private bg9: any = common.createImg([80, -72, 0], 33, 33, bg1);
    private bg10: any = common.createImg([110, -72, 0], 33, 33, bg1);
    private bg11: any = common.createImg([140, -72, 0], 33, 33, bg1);
    // 文字
    private textLeft1 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft2 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft3 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft4 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft5 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft6 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft7 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft8 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft9 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft10 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });
    private textLeft11 = common.createPlane(25, 15, "", 1, { position: [0, -98, 0] });




    private mousePos: any = new THREE.Vector3(); //对象位置
    private buttonXpos: any = [0, 480, 445, 410, 375, 340, 305, 265, 228, 191, 154, 117, 90];
    private render = () => {
        requestAnimationFrame(this.render);
        this.copyThreeBoxPos(this.firstButton, 'firstBox');
        const thiz: any = this;
        this.renderer.render(this.scene, this.camera);
    }
    /**
     * @param {domElement} domElement
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?:
        number) {
        super();
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initElement();
        const thiz: any = this;
        this.allDate = (window as any).viewHandler.viewModel.$data;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.zoom = 256 / (-this.waterBoxPos.x);
        this.camera.position.z = 270 * this.zoom;
        this.firstButton.position.x = -this.waterBoxPos.x * this.zoom - 290;
        this.vertebrate.position.x = -this.waterBoxPos.x * this.zoom - 395;
        this.invertebrate.position.x = -this.waterBoxPos.x * this.zoom - 190;
        this.createPlane.position.x = -this.waterBoxPos.x * this.zoom - 30;
        this.createPlane.position.z = -1;
        console.log(this.invertebrate.position.x);
        for (let i = 1; i < 12; i++) {
            thiz[`vertebrate${i}`].position.x = -this.waterBoxPos.x * this.zoom - this.buttonXpos[i];
        }
        for (let i = 1; i < 12; i++) {
            thiz[`bg${i}`].position.x = -this.waterBoxPos.x * this.zoom - this.buttonXpos[i];
            thiz[`textLeft${i}`].position.x = -this.waterBoxPos.x * this.zoom - this.buttonXpos[i];
        }
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
        this.camera.position.set(0, 0, 270);
    }
    // 初始化场景元素
    initElement() {
        this.scene.add(this.firstButton, this.createPlane);
    }
    animal() {
        this.scene.add(this.line1, this.line2, this.line3, this.line4, this.vertebrate, this.invertebrate);
        this.render = () => {
            requestAnimationFrame(this.render);
            this.copyThreeBoxPos(this.vertebrate, 'vertebrate');
            this.copyThreeBoxPos(this.invertebrate, 'invertebrate');
            this.renderer.render(this.scene, this.camera);
        };
    }
    // 无脊椎
    initvertebrate() {
        this.scene.add(this.line5, this.line6, this.line7, this.line8);
        this.scene.add(this.vertebrate1, this.vertebrate2, this.vertebrate3, this.vertebrate4, this.vertebrate5, this.vertebrate6);
        this.render = () => {
            requestAnimationFrame(this.render);
            const thiz: any = this;
            for (let i = 1; i < 7; i++) {
                this.copyThreeBoxPos(thiz[`vertebrate${i}`], `button${i}`);
            }
            for (let i = 0; i < 6; i++) {
                this.copyThreeBoxPos(thiz[`textLeft${i + 1}`], `optiontextleft${i + 1}`);
                this.copyThreeBoxPos(thiz[`bg${i + 1}`], `imgbox${i + 1}`);

            }
            thiz.thired1 = true;
            this.renderer.render(this.scene, this.camera);
        };
    }
    // 脊椎
    initinvertebrate() {
        this.scene.add(this.line9, this.line10, this.line11, this.line12);
        this.scene.add(this.vertebrate7, this.vertebrate8, this.vertebrate9, this.vertebrate10, this.vertebrate11);
        this.render = () => {
            requestAnimationFrame(this.render);
            const thiz: any = this;
            for (let i = 7; i < 12; i++) {
                this.copyThreeBoxPos(thiz[`vertebrate${i}`], `button${i}`);
            }
            for (let i = 7; i < 12; i++) {
                this.copyThreeBoxPos(thiz[`textLeft${i}`], `optiontextleft${i}`);
                this.copyThreeBoxPos(thiz[`bg${i}`], `imgbox${i}`);
            }
            thiz.thired2 = true;
            this.renderer.render(this.scene, this.camera);
        };
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
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化光源
     */
    initLight(): void {
        const light = new THREE.AmbientLight(0xffffff, 1);

        this.scene.add(light);
    }
    //世界坐标转化为three.js坐标
    getMousePos(MousePointX: number, MousePointY: number, domWidth: number, domHeight: number): Vector2 {
        const vector = new Vector3();
        vector.set((MousePointX / domWidth) * 2 - 1,
            (-MousePointY / domHeight) * 2 + 1, 0);
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
        return new Vector2(pos.x, pos.y);
    }
    //屏幕坐标转为THREE场景坐标
    transitionPos(left: number, top: number) {
        this.mousePos.x = (left / window.innerWidth) * 2 - 1;
        this.mousePos.y = -(top / window.innerHeight) * 2 + 1;
        this.mousePos.unproject(this.camera);
        const dir_ = this.mousePos.sub(this.camera.position).normalize();
        const distance_ = -this.camera.position.z / dir_.z;
        const pos_ = this.camera.position.clone().add(dir_.multiplyScalar(distance_));
        return pos_;
    }
    //仅适用于单一按钮
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
        $(`#${id}`).css({
            width: result.w,
            height: result.h,
            left: result.x,
            top: result.y
        });
    }
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    //重置
    reset() {
        const thiz: any = this;
        this.allDate.isImgShow = false;
        this.allDate.optionTextleft = ["", "", "", "", "", "", "", "", "", "", "", ""];
        this.allDate.srcArr = [{ src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" },
        { src: "" }, { src: "" }, { src: "" }, { src: "" }];
        this.allDate.buttonBox1 = [
            {
                src: require('../sub_static/1.png'),
                name: '壁虎'
            },
            {
                src: require('../sub_static/2.png'),
                name: '蚯蚓'
            },
            {
                src: require('../sub_static/3.png'),
                name: '蜂鸟'
            },
            {
                src: require('../sub_static/4.png'),
                name: '水螅'
            },
            {
                src: require('../sub_static/5.png'),
                name: '蜗牛'
            },
            {
                src: require('../sub_static/6.png'),
                name: '大象'
            },
            {
                src: require('../sub_static/7.png'),
                name: '青蛙'
            },
            {
                src: require('../sub_static/8.png'),
                name: '涡虫'
            },
            {
                src: require('../sub_static/9.png'),
                name: '蝴蝶'
            },
            {
                src: require('../sub_static/10.png'),
                name: '鱼'
            },
            {
                src: require('../sub_static/11.png'),
                name: '蛔虫'
            },
        ];
        this.allDate.flags = false;
        this.allDate.flag = false;
        this.allDate.secend = false;
        this.allDate.thired1 = false;
        this.allDate.thired2 = false;
        this.scene.remove(thiz.vertebrate);
        this.scene.remove(thiz.invertebrate);
        const W = window.innerWidth;
        for (let i = 1; i < 12; i++) {
            const u = 'index' + i;
            document.getElementById(u).style.visibility = "";
        }
        for (let i = 1; i <= 14; i++) {
            this.scene.remove(thiz[`line${i}`]);
            this.scene.remove(thiz[`vertebrate${i}`]);
            this.scene.remove(thiz[`bg${i}`]);
            if (i < 12) {
                $(`#button${i}`).css('visibility', 'hidden');
                $(`#imgbox${i}`).css('backgroundColor', '#FFF');
                $(`#imgbox${i}`).css('visibility', 'visible');
                $(`#imgbox${i}`).css('opacity', '0.3');
            }
        }
        if (W < 731) {
            for (let i = 1; i < 12; i++)
                $(`#index${i}`).parent().show();
        }
    }
}

