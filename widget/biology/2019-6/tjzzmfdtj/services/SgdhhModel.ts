
import * as THREE from 'three';
import { WebGLRenderer, Vector2, Vector3} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import common from './CommonForThree';
import * as pingzi from '../sub_static/pingzi.png';
import * as shaoshui from '../sub_static/shaoshui.png';
import * as shui from '../sub_static/shui.png';
import * as water from '../sub_static/water.png';
import * as temper from '../sub_static/temper.png';
import * as point from '../sub_static/point.png';
import * as nomengya from '../sub_static/mengyajinzhi.png';
import * as mengya from '../sub_static/0.gif';
import * as weimengya from '../sub_static/1.gif';
import * as page from '../sub_static/page.png';
import $ from 'jquery-ts';

OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private allDate: any; //存储全局变量
    private timer: any; //定时器
    private sliderControlLine: SliderControlLine;
    private pingZi = common.createImg([0, 0, 0], 108.8, 160.4, pingzi); //容器
    private enoughWater = common.createImg([0, -55, 0], 108.768, 51.5, shui); //足够水
    private lowWater = common.createImg([0, -75, 1], 105.6, 11.2, shaoshui); //少量水
    private water = common.createImg([150, 0, 0], 40, 152, water); //水量滑条
    private temper = common.createImg([200, 0, 0], 40, 152, temper); //温度滑条
    private pointWater = common.createImg([142.8, -50, 0], 12.6, 12.6, point); //水量控制点
    private pointTem = common.createImg([192.8, 7, 0], 12.6, 12.6, point); //温度控制点
    private isMake = true; //是否可以重复点击结果按钮
    private waterBoxPos: any; //three边界
    private render = () => {
        requestAnimationFrame(this.render);
        this.transitionPosToThree(this.water.position.x + 9, -82, 
        this.water.position.x + 39, -82, this.water.position.x + 9, -93, 'result');
        this.transitionPosToThree(-56, 78, 56, 78, -56, -82, 'seedBox');
        this.transitionPosToThree(this.water.position.x - 20.5, 76,
        this.water.position.x + 20, 76, this.water.position.x - 20.5, -76, 'waterGray');
        this.transitionPosToThree(this.temper.position.x - 21, 76,
        this.temper.position.x + 19.5, 76, this.temper.position.x - 21, -76, 'temGray');        
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
        this.initLight();
        this.initWebGLRenderer();
        this.initElement();
        this.initEvt();
        this.allDate = (window as any).viewHandler.viewModel.$data;
        (document.getElementById('gif_src') as any).src = nomengya;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.water.position.x = -this.waterBoxPos.x - 80;
        this.temper.position.x = -this.waterBoxPos.x - 30;
        this.pointWater.position.x = -this.waterBoxPos.x - 87.2;
        this.pointTem.position.x = -this.waterBoxPos.x - 37.2;
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
        this.pointWater.name = 'pointWater';
        this.pointTem.name = 'pointTem';
        this.scene.add(this.pingZi, this.temper, this.water, this.pointWater, this.pointTem);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.pointWater, this.pointTem], this).initEvent(this.camera, this.renderer);
    }
    //移动动点位置
    moveHandle(pos: any, name: string): void {
        const {x, y} = pos;
        (document.getElementById('gif_src') as any).src = nomengya;
        this.allDate.textConter = "";
        if (name === 'pointWater') {
            this.pointWater.position.x = -this.waterBoxPos.x - 87.2;
            this.pointWater.position.y = y > 67 ? 67 : y < -50 ? -50 : y;
        }
        if (name === 'pointTem') {
            this.pointTem.position.x = -this.waterBoxPos.x - 37.2;
            this.pointTem.position.y = y > 67 ? 67 : y < -50 ? -50 : y;
        }
    }
    //拖拽结束
    dragEnd(obj: any, name: string) {
        if (obj.position.y > -21.5 && obj.position.y < 30) {
            obj.position.y = 7; //适量 适温
            if (name === 'pointTem') {
                this.changeBackGround(false, false);
            }
            if (name === 'pointWater') {
                this.allDate.textReminder = '充足空气';
                this.waterPos(this.lowWater, this.enoughWater);
            }
        } else if (obj.position.y > 30 && obj.position.y < 68) {
            obj.position.y = 67; //较多 高温
            if (name === 'pointTem') {
                this.changeBackGround(true, false);
            }
            if (name === 'pointWater') {
                this.allDate.textReminder = '缺少空气';
                this.waterPos(this.enoughWater, this.lowWater);
            }
        } else if (obj.position.y < 7 && obj.position.y > -51) {
            obj.position.y = -50; //无 低温
            if (name === 'pointTem') {
                this.changeBackGround(false, true);
            }
            if (name === 'pointWater') {
                this.allDate.textReminder = '充足空气';
                this.scene.remove(this.enoughWater, this.lowWater);
            }
        }
    }
    //切换背景图
    changeBackGround(highTemperature: boolean, lowTemperature: boolean) {
        this.allDate.isHaveLow = lowTemperature;
        this.allDate.isHaveHot = highTemperature;
    }
    //切换水位
    waterPos(add: any, remove: any) {
        this.scene.add(add);
        this.scene.remove(remove);
    }
    //点击按钮
    showResult() {
        if (!this.allDate.changeBackGroundBlue) {
            return;
        }
        if (this.isMake) {
            const opinionAmount = this.pointWater.position.y === 7 && this.pointTem.position.y === 7 ? true : false; //适量 适温 萌芽
            const opinionWaterAmount = this.pointWater.position.y === 7 
            && (this.pointTem.position.y === 67 || this.pointTem.position.y === -50) ? true : false; //适量 较高 较低 膨胀
            const onOpinionWaterAmount = this.pointWater.position.y === -50 ? true : false; //无水 无变化
            const manyOpinionWaterAmount = this.pointWater.position.y === 67 ? true : false; //较多 膨胀
            if (opinionAmount) { this.setClcok( mengya, '种子萌发', 8000); }
            if (opinionWaterAmount) {  this.setClcok(weimengya, '种子不萌发', 3000); }
            if (onOpinionWaterAmount) { this.setClcok(nomengya, '种子不萌发'); }
            if (manyOpinionWaterAmount) { this.setClcok(weimengya, '种子不萌发', 3000); }
    }
        }
    //设置定时器
    setClcok(src: any, text: string, time?: number) {
        clearTimeout(this.timer);
        console.log(this.water);
        (this.water as any).material.opacity = 0.5;
        (this.temper as any).material.opacity = 0.5;
        (this.pointWater as any).material.opacity = 0.5;
        (this.pointTem as any).material.opacity = 0.5;
        (document.getElementById('gif_src') as any).src = src;  
        this.allDate.waterGray = true;
        this.allDate.temGray = true;
        this.isMake = false;
        this.timer = setTimeout(() => {
            (this.water as any).material.opacity = 1;
            (this.temper as any).material.opacity = 1;
            (this.pointWater as any).material.opacity = 1;
            (this.pointTem as any).material.opacity = 1;
            this.allDate.waterGray = false;
            this.allDate.temGray = false;
            this.allDate.textConter = text;
            this.isMake = true;
        }, time);
    }
    //初始化渲染器
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); 
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
    getMousePos(MousePointX: number, MousePointY: number,  domWidth: number, domHeight: number): Vector2 {
        const vector = new Vector3();
        vector.set((MousePointX / domWidth) * 2 - 1,
          (-MousePointY / domHeight) * 2 + 1, 0);
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
        return new Vector2(pos.x, pos.y);
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
            top: result.y,
            lineHeight: result.h + 'px'
        });
      }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    //重置
    reset() {
        clearTimeout(this.timer);
        (this.water as any).material.opacity = 1;
        (this.temper as any).material.opacity = 1;
        (this.pointWater as any).material.opacity = 1;
        (this.pointTem as any).material.opacity = 1;
        this.scene.remove(this.enoughWater, this.lowWater);
        (document.getElementById('gif_src') as any).src  = nomengya;
        this.allDate.textReminder = '充足空气';
        this.pointWater.position.y = -50;
        this.pointTem.position.y = 7;
        this.allDate.waterGray = false;
        this.allDate.temGray = false;
        this.allDate.isHaveLow = true;
        this.allDate.isHaveHot = false;
        this.allDate.isHaveLow = false;
        this.allDate.textConter = "";
        this.allDate.changeBackGroundBlue = false;
        this.isMake = true;
    }
}
