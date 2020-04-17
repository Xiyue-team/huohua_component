import * as THREE from 'three';
import { WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import common from './CommonForThree';
import * as backSe from '../sub_static/bds.png';
import * as a from '../sub_static/a.png';
import * as b from '../sub_static/b.png';
import * as c from '../sub_static/c.png';
import $ from 'jquery-ts';
OBJLoader(THREE);
export class Line3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private ow: any; //存储mainVueComponent中的变量
    private tranGroup1: any = new THREE.Group();
    private tranGroup2: any = new THREE.Group();
    private tranGroup3: any = new THREE.Group();
    private tranGroup4: any = new THREE.Group();
    private meshExplane: any;
    private greenPlane: any;
    private bluePlane: any;
    private backSe = common.createImg([-10, -70, 0], 60.6, 15, backSe);

    //添加文字标识
    private line1_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line2_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line3_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line4_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line5_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line6_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line7_: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
    private line8_: any = common.drawUnitLine({ width: 1, color: '#FF5A5A', isDash: false });
    private line1 = common.scaleLine([-60, 10, 0], [-60, -30, 0], this.line1_);
    private line2 = common.scaleLine([-60, 10, 0], [-20, 10, 0], this.line2_);
    private line3 = common.scaleLine([-60, -30, 0], [-20, -30, 0], this.line3_);
    private line4 = common.scaleLine([-20, 30, 0], [40, 30, 0], this.line4_);
    private line5 = common.scaleLine([-20, 30, 0], [-20, -30, 0], this.line5_);
    private line6 = common.scaleLine([40, 30, 0], [40, -30, 0], this.line6_);
    private line7 = common.scaleLine([40, -30, 0], [-20, -30, 0], this.line7_);
    private text = common.createText('朱实', [-24, 12, 0], {color: '#FFFFFF'});
    private text1 = common.createText('朱实', [8, 27, 0], {color: '#FFFFFF'});
    private text2 = common.createText('朱实', [23, -5, 0], {color: '#FFFFFF'});
    private text3 = common.createText('朱实', [-8, -20, 0], {color: '#FFFFFF'});
    // private text4 = common.createText('黄实', [0, 4, 0]);
    
    //判断点击
    private isMake = false;
    
    //添加文字标识
    private text_a = common.createImg([-25, -7, 0], 5.12, 5.12, a);
    private text_b = common.createImg([-15, 18, 0], 5.12, 5.12, b);
    private text_c = common.createImg([-36, 18, 0], 5.12, 5.12, c);
    private text_a_ = common.createImg([-6, 30, 0], 5.12, 5.12, a);
    private text_b_ = common.createImg([15, 14, 0], 5.12, 5.12, b);
    private text_c_ = common.createImg([25, 32, 0], 5.12, 5.12, c);
    private text_c_c = common.createImg([35, -20, 0], 5.12, 5.12, c);
    private text_b_b = common.createImg([-30, -30, 0], 5.12, 5.12, c);
    private text_aa = common.createImg([-25, -7, 0], 5.12, 5.12, a);
    private text_aa_ = common.createImg([-55, -30, 0], 5.12, 5.12, a);
    private text_bb = common.createImg([30, 16, 0], 5.12, 5.12, b);
    private text_bb_ = common.createImg([55, -20, 0], 5.12, 5.12, b);
    private a = common.createImg([-65, -12, 0], 5.12, 5.12, a);
    private a_ = common.createImg([-40, 13, 0], 5.12, 5.12, a);
    private b = common.createImg([45, 0, 0], 5.12, 5.12, b);
    private b_ = common.createImg([10, 35, 0], 5.12, 5.12, b);
    //定时器
    private timer: any = null;
    private timerStep: any = null;
    private render = () => {
        requestAnimationFrame(this.render);
        this.transitionPosToThree(0, 10, 26, 10, 0, -10, 'textMid');
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
    constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
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
        this.initWebGLRenderer();
        this.initElement();
        this.ow = (window as any).viewHandler.viewModel.$data;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#303030');
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
        this.creatTran([-10, -10, 0], [-50, -10, 0], [-10, 50, 0], this.tranGroup1);
        this.creatTran([-10, 10, 0], [-10, 50, 0], [50, 10, 0], this.tranGroup2);
        this.creatTran([10, 10, 0], [50, 10, 0], [10, -50, 0], this.tranGroup3);
        this.creatTran([10, -10, 0], [10, -50, 0], [-50, -10, 0], this.tranGroup4);
        this.meshExplane = this.creatPlane(20, 20, '#FFD621');
        this.scene.add(this.meshExplane, this.text, this.text1, this.text2, this.text3);
        this.scene.add(this.text_a, this.text_b, this.text_c, this.text_a_, this.text_b_, this.text_c_);
        this.scene.add(this.text_c_c, this.text_b_b);
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    //点击按钮
    clickButton(num: number) {
        if (num === 0) {
            this.ow.ishave = true;
            this.ow.show = true;
            this.ow.textMid = false;
            setTimeout(() => {
                this.ow.ishave = false;
            }, 100);
            this.clickCut();
        } else if (num === 1) {
            this.ow.ishave1 = true;
            setTimeout(() => {
                this.ow.ishave1 = false;
            }, 100);
            this.clickExpression();
        } else if (num === 2) {
            this.clickPythagorean();
            if (!this.ow.ishave2) {
                this.ow.ishave2 = true;
            } else {
                this.ow.imgShow = false;
                this.ow.ishave2 = false;
            }
        }
    }
    //点击切换
    clickCut() {
        const thiz: any = this;
        cancelAnimationFrame(this.timer);
        this.isMake = false;
        clearTimeout(this.timerStep);
        for (let i = 1; i < 8; i++) {
            this.scene.remove(thiz[`line${i}`]);
        }
        this.resetPos();
        this.scene.remove(this.text_aa, this.text_aa_, this.text_bb, this.text_bb_);
        this.scene.remove(this.text, this.text1, this.text2, this.text3);
        this.scene.remove(this.greenPlane, this.bluePlane, this.line8_, this.backSe, this.a, this.a_, this.b, this.b_);
        this.scene.remove(this.text_a, this.text_b, this.text_c, this.text_a_, this.text_b_, this.text_c_, this.text_c_c, this.text_b_b);
        this.scene.add(this.tranGroup1, this.tranGroup2, this.tranGroup3, this.tranGroup4, this.meshExplane);
        this.groupAni([-10, 10, 0], [60, -40, 0], [-40, -60, 0], this.tranGroup1, this.tranGroup2);
        
    }
    //点击表达式
    clickExpression() {
        const thiz: any = this;
        if (this.isMake) {
            return;
        }
        cancelAnimationFrame(this.timer);
        this.scene.add(this.line8_);
        this.tranGroup1.position.set(50, -20, 0);
        this.tranGroup2.position.set(-50, -40, 0);
        this.tranGroup3.position.set(-10, 20, 0);
        this.tranGroup4.position.set(-10, 20, 0);
        this.meshExplane.position.set(-10, 20, 0);
        common.lineAni([-20, 60, 1], [-20, -60, 1], this.line8_);
        this.scene.remove(this.text_aa, this.text_aa_, this.text_bb, this.text_bb_);
        this.timerStep = setTimeout(() => {
            this.scene.remove(this.tranGroup1, this.tranGroup2, this.tranGroup3, this.tranGroup4, this.meshExplane);
            for (let i = 1; i < 8; i++) {
                this.scene.add(thiz[`line${i}`]);
            }
            this.greenPlane = this.creatPlane(40, 40, '#9BF23B');
            this.bluePlane = this.creatPlane(60, 60, '#0091FF');
            this.greenPlane.position.set(-40, -10, 0);
            this.bluePlane.position.set(10, 0, 0);
            this.scene.add(this.greenPlane, this.bluePlane, this.backSe,
                this.a, this.a_, this.b, this.b_);
        }, 2000);
        this.isMake = true;
    }
    //点击勾股定理
    clickPythagorean() {
        this.ow.imgShow = true;
    }
    //创建三角形
    creatTran(pos1: any, pos2: any, pos3: any, group: THREE.Group) {
        const geometry = new THREE.Geometry();
        const vertices1 = new THREE.Vector3(pos1[0], pos1[1], pos1[2]);
        const vertices2 = new THREE.Vector3(pos2[0], pos2[1], pos2[2]);
        const vertices3 = new THREE.Vector3(pos3[0], pos3[1], pos3[2]);
        geometry.vertices.push(vertices1, vertices2, vertices3);
        geometry.faces.push(new THREE.Face3(0, 2, 1));
        const redMat = new THREE.MeshBasicMaterial({color: '#FF5A5A'});
        const triangle = new THREE.Mesh(geometry, redMat);
        let line1: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
        let line2: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
        let line3: any = common.drawUnitLine({ width: 0.5, color: '#FFFFFF', isDash: false });
        line1 = common.scaleLine(pos1, pos2, line1);
        line2 = common.scaleLine(pos1, pos3, line2);
        line3 = common.scaleLine(pos2, pos3, line3);
        group.add(triangle, line1, line2, line3);
        this.scene.add(group);
    }
    //移动动画
    groupAni(startPos: any, endPos1: any, endPos2: any, group1: THREE.Group, group2: THREE.Group,) {
        let num = 0.01;
        const thiz = this;
        function ani() {
            const vecPos: any = [0, 0, 0];
            const vecPos1: any = [0, 0, 0];
            vecPos[0] = startPos[0] + (endPos1[0] - startPos[0]) * num;
            vecPos[1] = startPos[1] + (endPos1[1] - startPos[1]) * num;
            vecPos1[0] = startPos[0] + (endPos2[0] - startPos[0]) * num;
            vecPos1[1] = startPos[1] + (endPos2[1] - startPos[1]) * num;
            group1.position.set(vecPos[0], vecPos[1], 0);
            group2.position.set(vecPos1[0], vecPos1[1], 0);
            num += 0.01; 
            if (num > 1.005) {
                group1.position.set(vecPos[0], vecPos[1], 0);
                group2.position.set(vecPos1[0], vecPos1[1], 0);
                thiz.scene.add(thiz.text_aa, thiz.text_aa_, thiz.text_bb, thiz.text_bb_);
                cancelAnimationFrame(thiz.timer);
                return;
            }
            thiz.timer = requestAnimationFrame(ani);
        }
        ani();
    }
    //重置位置
    resetPos() {
        this.tranGroup1.position.set(0, 0, 0);
        this.tranGroup2.position.set(0, 0, 0);
        this.tranGroup3.position.set(0, 0, 0);
        this.tranGroup4.position.set(0, 0, 0);
        this.meshExplane.position.set(0, 0, 0);
    }

    //创建面
    creatPlane(width: number, height: number, color: any) {
        const geometry = new THREE.PlaneGeometry(width, height);
        const yelloMat = new THREE.MeshBasicMaterial({color: color});
        const meshExplane = new THREE.Mesh(geometry, yelloMat);
        meshExplane.position.set(0, 0, 0);
        return meshExplane;
    }
    //THREE场景坐标转为屏幕坐标
    transitionPosToThree(x: number, y: number, x1: number, y1: number, x2: number, y2: number, id: any) {
       const worldVector1 = new THREE.Vector3(x, y, 1);
       const worldVector2 = new THREE.Vector3(x1, y1, 1);
       const worldVector3 = new THREE.Vector3(x2, y2, 1);
       const standardVector1 = worldVector1.project(this.camera); //世界坐标转标准设备坐标
       const standardVector2 = worldVector2.project(this.camera);
       const standardVector3 = worldVector3.project(this.camera);
       const a = window.innerWidth / 2;
       const b = window.innerHeight / 2;
       const xResult = standardVector1.x * a + a; //标准设备坐标转屏幕坐标
       const yResult = -standardVector1.y * b + b; //标准设备坐标转屏幕坐标
       const wWidth = standardVector2.x * a + a - (standardVector1.x * a + a);
       const hHeight = (-standardVector3.y * b + b) - (-standardVector1.y * b + b);
       const result = {x: xResult, y: yResult, w: wWidth, h: hHeight};
       $(`#${id}`).css({
           width: result.w,
           height: result.h,
           left: result.x, 
           top: result.y
       });
     }

    //重置
    reset() {
        const thiz: any = this;
        clearTimeout(this.timerStep);
        cancelAnimationFrame(this.timer);
        this.resetPos();
        this.scene.add(this.tranGroup1, this.tranGroup2, this.tranGroup3, this.tranGroup4, this.meshExplane);
        this.scene.add(this.text_a, this.text_b, this.text_c, this.text_a_, this.text_b_, this.text_c_, this.text_c_c, this.text_b_b);
        this.scene.add(this.text, this.text1, this.text2, this.text3);
        this.scene.remove(this.text_aa, this.text_aa_, this.text_bb, this.text_bb_);
        this.scene.remove(this.greenPlane, this.bluePlane, this.line8_, this.backSe, this.a, this.a_, this.b, this.b_);
        this.ow.imgShow = false;
        this.ow.ishave2 = false;
        this.ow.show = false;
        this.ow.textMid = true;
        for (let i = 1; i < 8; i++) {
            this.scene.remove(thiz[`line${i}`]);
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
