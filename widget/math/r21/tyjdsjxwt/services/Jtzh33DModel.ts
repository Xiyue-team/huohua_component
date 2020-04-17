/**
 *@since 2.0
 *@author mac
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
let thiz: any = null;
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import common from './CommonForThree';
import {SliderControlLine} from './SliderControlLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';

import * as F1 from '../sub_static/01.png';
import * as F2 from '../sub_static/02.png';
import * as point from '../sub_static/point.png';

export class Jtzh33DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    sliderControlLine: SliderControlLine;
    public orbit: any;
    private ppoint: any = common.createImg([25, 10 * Math.sqrt(6.75), 2], 16, 16, point);

    private textp = common.createText('P', [25, 10 * Math.sqrt(6.75) + 8, 0], {color: '#000'});
    private texta = common.createText('A', [53, 39 + 8, 0], {color: '#000'});
    private textg = common.createText('G', [50, 25, 0], {color: '#000'});
    private texth = common.createText('H', [-28, 53, 0], {color: '#000'});
    private leftZuobiao = common.createText('(-4, 0)', [-28, -2, 0], {color: '#000', isItalic: false});
    private rightZuobiao = common.createText('(4, 0)', [42, -2, 0], {color: '#000', isItalic: false});

    private circle: any;

    private ellipseCurve: any;

    private ellipsePointArr: Array < any > = [];
    private circlePointArr: Array < any > = [];
    private recoderPointArr: Array < any > = [];
    private F1 = common.createImg([-40, -6, 0], 5, 7, F1);
    private F2 = common.createImg([32, -6, 0], 5, 7, F2);
    private circleF1 = common.drawCircle(1, {position: [-40, 0, 1], color: '#0199FF'});
    private circleF2 = common.drawCircle(1, {position: [40, 0, 1], color: '#0199FF'});
    private circleP = common.drawCircle(1, {position: [25, 10 * Math.sqrt(6.75), 2], color: '#0199FF'});
    private circleA = common.drawCircle(1, {position: [52.86, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10, 2], color: '#0199FF'});
    private circleG = common.drawCircle(1, {position: [46.43, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10 / 2, 2], color: '#0199FF'});
    private circleH = common.drawCircle(1, {position: [-25, 43.3, 2], color: '#0199FF'});
    private tangentLine = common.drawDashOrLine([{x: -70, y: 0, z: 1}, {x: 70, y: 0, z: 1}], {color: '#000'});

    private pointgroup = new THREE.Group();
    
    private ow: any;
    private rad: any;

    private line_0 = common.drawUnitLine({width: 1, color: '#000', isDash: false});
    private line_1 = common.drawUnitLine({width: 1, color: '#000', isDash: false});
    private line_1_1 = common.drawUnitLine({width: 1, color: '#0199FF', isDash: false});
    private line_2 = common.drawUnitLine({width: 1, color: '#000', isDash: false});
    private line_PA = common.drawUnitLine({width: 1, color: '#0199FF', isDash: false});
    private line_PA1 = common.drawUnitLine({width: 1, color: '#0199FF', isDash: false});
    private line_OG = common.drawUnitLine({width: 1, color: '#EE82EE', isDash: false});
    private F1_L = common.drawUnitLine({width: 1, color: '#000', isDash: false});
    private F1_LP = common.drawUnitLine({width: 1, color: '#000', isDash: false});
    private line_OH = common.drawUnitLine({width: 1, color: '#EE82EE', isDash: false});

    private line = common.scaleLine([-40, 0, 0], [25, 10 * Math.sqrt(6.75), 0], this.line_0);
    private line1 = common.scaleLine([40, 0, 0], [25, 10 * Math.sqrt(6.75), 0], this.line_1);
    private line2 = common.scaleLine([40, 0, 0], [25, 10 * Math.sqrt(6.75), 0], this.line_1_1);
    private line3 = common.scaleLine([40, 0, 0], [52.86, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10, 0], this.line_2);
    private lineOG: any;
    private linePA1 = common.
    scaleLine([25, 10 * Math.sqrt(6.75), 0], [52.86, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10, 0], this.line_PA1);
    private F1L = common.scaleLine([-10, 86.6, 0], [-40, 0, 0], this.F1_L);
    private F1LP = common.scaleLine([-10, 86.6, 0], [25, 10 * Math.sqrt(6.75), 0], this.F1_LP);
    private lineOH = common.scaleLine([0, 0, 0], [-25, 43.3, 0], this.line_OH);
    private posGX: any;
    private posGY: any;
    private posHX: any;
    private posHY: any;
    private timer: any;
    private a = common.createText('a', [23, 17, 0], {color: '#000'});
    private a1 = common.createText('a', [-15, 23, 0], {color: '#000'});
    //直角
    private preAngleG = common.drawRightAngle(3, { color: '#DC143C' });
    private preAngleH = common.drawRightAngle(3, { color: '#DC143C' });
    //扇形
    private sector = common.drawSector([40, 0, 0], [25, 10 * Math.sqrt(6.75), 0],
    [52.86, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10, 0], { color: '#f8e71c' });

    private render = () => {
        requestAnimationFrame( this.render );
        

        this.renderer.render( this.scene, this.camera );
    }

    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
     init() {
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.render();
        this.createAxis();
        this.initEllipseArr();
        this.initEvt();
        this.initCircle();
        this.initModel();
        this.ppoint.name = 'point';
        this.ow = (window as any).viewHandler.viewModel.$data;
    }
    initScene(): void {
        this.scene = new THREE.Scene();
    }

    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
    }

    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    initControl(): void {
        this.orbit = new TrackballControls(this.camera, this.renderer.domElement);
        this.orbit.rotateSpeed = 3;
        this.orbit.zoomSpeed = 1.2;
        this.orbit.panSpeed = 0.8;
        this.orbit.noZoom = true;
        this.orbit.noPan = true;
        this.orbit.noRotate = true;
        this.orbit.staticMoving = true;
        this.orbit.dynamicDampingFactor = 0.3;
    }
    //创建一个坐标系
    createAxis() {
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
        this.scene.add(Ax);
    }

    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.ppoint]).initEvent(this.camera, this.renderer);
    }

    initEllipseArr () {
        for (let i = 60; i < 421; i += 2) {
            const x = 50 * Math.cos(Math.PI * i / 180);
            const y = 30 * Math.sin(Math.PI * i / 180);
            this.ellipsePointArr.push({ x, y, z: 1 });
        }
    }

    initCircle() {
        for (let i = 30; i < 391; i += 4) {
            const x1 = 50 * Math.cos(Math.PI * i / 180);
            const y1 = 50 * Math.sin(Math.PI * i / 180);
            this.circlePointArr.push({x: x1, y: y1, z: 1});
        }
    }

    initModel() {
        this.ellipseCurve = common.drawDashOrLine(this.ellipsePointArr, {color: '#000'});
        this.scene.add(this.ellipseCurve, this.F1, this.F2, this.leftZuobiao, this.rightZuobiao);
    }

    Scene1() {
        this.ow.have = false;
        this.ow.ishave6 = false;
        clearTimeout(this.timer);
        this.HGpos(2.5, Math.sqrt(6.75));
        this.line1 = common.scaleLine([40, 0, 0], [25, 10 * Math.sqrt(6.75), 0], this.line_1);
        this.scene.add(this.circleF1, this.circleF2, this.circleP, this.textp);
        this.scene.add(this.line, this.line1);
        this.scene.remove(this.line2, this.line3, this.tangentLine, this.line_PA, this.texta, this.textg, this.circleA, this.circleG);
    }
    
    Scene2() {
        this.ow.have = false;
        this.ow.ishave6 = false;
        this.HGpos(2.5, Math.sqrt(6.75));
        this.scene.add(this.line_PA);
        this.scene.remove(this.preAngleG, this.sector, this.linePA1);
        common.lineAni([25, 10 * Math.sqrt(6.75), 0], [52.86, (25 * Math.sqrt(6.75) / 22.5 * 1.286) * 10, 0], this.line_PA);
        this.scene.add(this.line1);
        this.scene.remove(this.tangentLine, this.line2, this.circleA, this.texta, this.line3, this.circleG, this.textg);
        this.tangentLine.position.set(25, 10 * Math.sqrt(6.75), 0);
        this.rad = Math.atan((-9 / 25) * (25 / (10 * Math.sqrt(6.75)))); //切线斜率
        this.tangentLine.rotation.z = this.rad;
        this.timer = setTimeout(() =>  {
         this.scene.remove(this.line1);
         this.scene.add(this.tangentLine, this.line2, this.circleA, this.texta, this.line3, this.circleG, this.textg);
        }, 900);
    }

    Scene3() {
        this.ow.have = false;
        this.ow.ishave6 = false;
        clearTimeout(this.timer);
        this.HGpos(2.5, Math.sqrt(6.75));
        this.scene.remove(this.lineOG, this.a, this.line_PA);
        this.rad = Math.atan((-9 / 25) * (25 / (10 * Math.sqrt(6.75)))); //切线斜率
        this.preAngleG.position.set(this.posGX, this.posGY, 0);
        this.preAngleG.rotation.x = Math.PI;
        this.preAngleG.rotation.z = -this.rad;
        this.scene.add(this.preAngleG, this.sector, this.linePA1, 
            this.tangentLine, this.line2, this.circleA, this.texta, this.line3, this.circleG, this.textg);
    }

    Scene4() {
        this.ow.ishave6 = false;
        this.ow.have = false;
        this.Scene5();
        this.HGpos(2.5, Math.sqrt(6.75));
        this.scene.remove(this.circleH, this.F1L, this.F1LP, this.preAngleH, this.lineOH, this.a1, this.texth);
        this.lineOG = common.scaleLine([0, 0, 0], [this.posGX, this.posGY, 0], this.line_OG);
        this.scene.add(this.lineOG, this.a);
    }

    Scene5() {
        this.HGpos(2.5, Math.sqrt(6.75));
        this.clearDraw();
        this.clearPoint();
        this.posChange(25, 10 * Math.sqrt(6.75));
        this.scene.remove(this.ppoint);
        this.rad = Math.atan((-9 / 25) * (25 / (10 * Math.sqrt(6.75)))); //切线斜率
        this.preAngleH.position.set(this.posHX, this.posHY, 0);
        this.preAngleH.rotation.x = Math.PI;
        this.preAngleH.rotation.y = Math.PI;
        this.preAngleH.rotation.z = this.rad;
        this.scene.add(this.circleH, this.F1L, this.F1LP, this.preAngleH, this.a, this.a1,
            this.lineOH, this.line1, this.linePA1, this.lineOG, this.texta, this.sector, this.texth);
    }

    Scene6() {
        this.ow.have = true;
        this.ow.ishave6 = true;
        this.Scene5();
        this.scene.add(this.ppoint);
    }
    //H,G位置
    HGpos(x: any, y: any) {
        const a = 5;
        const b = 3;
        //G点
        this.posGX = (((Math.pow(a, 2) * Math.pow(b, 4) * x) + (4 * 
            Math.pow(a, 4) * Math.pow(y, 2))) / (Math.pow(b, 4) * Math.pow(x, 2) + 
            (Math.pow(a, 4) * Math.pow(y, 2)))) * 10;
        this.posGY = (((Math.pow(a, 2) * y) / (Math.pow(b, 2) * x)) * (this.posGX / 10 - 4)) * 10;
        // H点
        this.posHX = (((Math.pow(a, 2) * Math.pow(b, 4) * x) - (4 * 
            Math.pow(a, 4) * Math.pow(y, 2))) / (Math.pow(b, 4) * Math.pow(x, 2) + 
            (Math.pow(a, 4) * Math.pow(y, 2)))) * 10;
        this.posHY = (((Math.pow(a, 2) * y) / (Math.pow(b, 2) * x)) * (this.posHX / 10 + 4)) * 10;
    }
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: any): void {
        if (name === 'point') {
            if (thiz.ow.ishave6) {
                thiz.removeScene5();
                const a = 50;
                const c = 40;
                const b = Math.sqrt(a * a - (c * c));
                const { x, y } = pos;
                const rat = b / a;
                const angleRadius = Math.atan2(y / rat, x);
                const px = a * Math.cos(angleRadius);
                const py = a * Math.sin(angleRadius) * rat;
                thiz.scene.remove(thiz.circle);
                thiz.posChange(px, py);
            }
        }
    }

    removeScene5() {
        this.scene.remove(this.line, this.line1, this.line2, this.lineOG, this.lineOH);
        this.scene.remove(this.sector, this.circleA, this.a, this.a1, this.texta, this.F1_LP, this.line_PA, this.circleP, this.linePA1);
    }

    //位置变化
    posChange(x: any, y: any) {
        thiz.HGpos(x / 10, y / 10);
        thiz.ppoint.position.set(x, y, 0);
        thiz.textp.position.set(x, y + 8, 0);
        thiz.tangentLine.position.set(x, y, 0);
        thiz.rad = Math.atan((-9 / 25) * (x / y)); //切线斜率
        thiz.tangentLine.rotation.z = thiz.rad;
        //斜率问题判断
        if (thiz.posGX > 39.9 && thiz.posGX <= 40) {
            if (thiz.posGY === 0) {
                thiz.posGY = 30;
            } else if (thiz.posGY < -50) {
                thiz.posGY = -30;
            }
       } 
       if (thiz.posHX > -40.2 && thiz.posHX <= -39.9) {
        if (thiz.posHY === 0) {
            thiz.posHY = 30;
        } else if (thiz.posHY < -50) {
            thiz.posHY = -30;
        }
        }
        thiz.textg.position.set(thiz.posGX + 3.6, thiz.posGY + 6.4, 0);
        thiz.texth.position.set(thiz.posHX - 3, thiz.posHY + 9.7, 0);
        thiz.preAngleG.position.set(thiz.posGX, thiz.posGY, 0);
        thiz.preAngleG.rotation.x = Math.PI;
        thiz.preAngleG.rotation.z = -thiz.rad;
        thiz.preAngleH.position.set(thiz.posHX, thiz.posHY, 0);
        thiz.preAngleH.rotation.x = Math.PI;
        thiz.preAngleH.rotation.y = Math.PI;
        thiz.preAngleH.rotation.z = thiz.rad;
        thiz.circleG.position.set(thiz.posGX, thiz.posGY, 2);
        thiz.circleH.position.set(thiz.posHX, thiz.posHY, 2);
        thiz.F1L = common.scaleLine([-40, 0, 0], [2 * thiz.posHX + 40, 2 * thiz.posHY, 0], thiz.F1_L);
        thiz.line3 = common.scaleLine([40, 0, 0], [2 * thiz.posGX - 40, 2 * thiz.posGY, 0], thiz.line_2);
    }

    //记录点
    // tslint:disable-next-line:member-ordering
    static recordPoint() {
        if (thiz.ow.ishave6) {
            const xH = thiz.circleH.position.x;
            const yH = thiz.circleH.position.y;
            const xG = thiz.circleG.position.x;
            const yG = thiz.circleG.position.y;
            const copyPointH = thiz.circleG.clone();
            const copyPointG = thiz.circleG.clone();
            copyPointH.position.set(xH , yH, 2);
            copyPointG.position.set(xG , yG, 2);
            thiz.pointgroup.add(copyPointH, copyPointG);
            thiz.recoderPointArr.push(copyPointH, copyPointG);
            thiz.scene.add(thiz.pointgroup);
        }
    }
    //清除点
    clearPoint() {
        if (this.recoderPointArr.length) {
            this.pointgroup.remove(...this.recoderPointArr);
            this.recoderPointArr = [];
        }
    }
    //绘制动画
    drawAni() {
        this.clearDraw();
        this.removeScene5();
        this.clearPoint();
        let num = 0;
        const pointArrAll: any = [];
        const pointArr: any = [];
        function ani() {
            if (num > 180) {
                return;
            }
            thiz.scene.remove(thiz.circle);
            const { x, y } = thiz.ellipsePointArr[180 - num];
            thiz.posChange(x, y);
            pointArrAll.push({x: thiz.circleG.position.x, y: thiz.circleG.position.y, z: 1});
            pointArr.push(...pointArrAll);
            thiz.circle = common.drawDashOrLine(pointArr, {color: '#EE82EE', isDash: false});
            thiz.scene.add(thiz.circle);
            (pointArr as any) = [];
            num++;
            thiz.timer = setTimeout(ani, 30);
        }
        ani();
    }
      // 去除绘制的图
      clearDraw () {
        clearTimeout(this.timer);
        if (this.circle) {
            this.scene.remove(this.circle);
        }
    }

    // 重置动画
    resetModel() {
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(100, 100, 200);
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

}
