
import * as THREE from 'three';
import { WebGLRenderer, Color, Vector3, Vector2 } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import common from './CommonForThree';
import * as yhyyfy from '../sub_static/yhyyfy.png';
import * as shui from '../sub_static/shui.png';
import * as nacl from '../sub_static/nacl.png';
import * as nhcl from '../sub_static/nhcl.png';
import * as hco from '../sub_static/hco.png';
import * as co from '../sub_static/co.png';
import * as bacl from '../sub_static/bacl.png';
import * as naoh from '../sub_static/naoh.png';
import * as tishi from '../sub_static/tishi.png';
import * as drag from '../sub_static/bs.png';
import $ from 'jquery-ts';

OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private sliderControlLine: SliderControlLine;
    private allDate: any; //存储全局变量
    private bgImg = common.createImg([0, 0, 0], 216, 157.8, yhyyfy); //背景图
    private mousePos: any = new THREE.Vector3(); //实物x坐标
    private mouseTbPos: any = new THREE.Vector3(); //实物y坐标
    private textYhhy = common.createText('氧化还原反应', [0, 20, 0], {color: '#282828'}); //说明文字
    //显示化学式 一下同理
    private waTer: any = common.createImg([-55, 68, 0], 78, 22.8, shui);
    private naCl: any = common.createImg([40, 68, 0], 78, 22.8, nacl);
    private nhCl: any = common.createImg([125, 68, 0], 78, 22.8, nhcl);
    private hCo: any = common.createImg([-120, 14, 0], 87, 22.8, hco);
    private cOco: any = common.createImg([106, 10, 0], 125.28, 20.52, co);
    private naOh: any = common.createImg([92, -41, 0], 103.8, 22.8, naoh);
    private baCl: any = common.createImg([-102, -65, 0], 119.4, 22.8, bacl);
    private bsTi: any = common.createImg([0, 75, 0], 49.92, 14.4, drag);
    //提示按钮 一下同理
    private tishi0: any = null; 
    private tishi1: any = null;
    private tishi2: any = null;
    private tishi3: any = null;
    private tishi4: any = null;
    private tishi5: any = null;
    private tishi6: any = null;
    private tishi = common.createImg([0, 0, 0], 16.8, 16.8, tishi);
    private tishiBottonArr: any = [];
    private waterBoxPos: any;
    private isMake0 = true;
    private isMake1 = true;
    private isMake2 = true;
    private isMake3 = true;
    private isMake4 = true;
    private isMake5 = true;
    private isMake6 = true;
    private posArr = new THREE.Group();
    //按钮位置
    private tiShiPosArr: any = [ 
        [-40, 42, 0],
        [-96, 42, 0],
        [40, 42, 0],
        [96, 42, 0],
        [36, 12, 0],
        [-30, -65, 0],
        [28, -18, 0]
    ];
    //存储化学式
    private imgArr: any = []; //左边分解
    private imgArrLeft: any = []; //左边化合
    private render = () => {
        requestAnimationFrame(this.render);
        this.transitionPosToThree(28, 55, 108, 55, 28, 28, this.camera, 'buttonText1');
        this.transitionPosToThree(-108, 55, -28, 55, -108, 28, this.camera, 'buttonText2');
        this.transitionPosToThree(-40, -5, 40, 5, -38, -31, this.camera, 'buttonText3');
        this.transitionPosToThree(-40, -51, 40, -51, -38, -78, this.camera, 'buttonText4');
        this.transitionPosToThree(104, 30, 114, 30, 104, 20, this.camera, 'yellowImg');
        this.transitionPosToThree(-115, 30, -105, 30, -105, 20, this.camera, 'pinkImg');
        this.transitionPosToThree(37, -31, 47, -31, 37, -41, this.camera, 'buleImg');
        this.transitionPosToThree(37, -78, 47, -78, 37, -88, this.camera, 'violetImg');
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
        this.initTiShiBotton();
        this.allDate = (window as any).viewHandler.viewModel.$data;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.bsTi.position.x = -this.waterBoxPos.x - 24.96;
        this.bsTi.position.y = this.waterBoxPos.y - 52;
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new Color('#282828');   
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
        this.imgArr.push(this.waTer, this.hCo, this.naCl, this.nhCl, this.cOco, this.baCl, this.naOh);
        this.imgArrLeft.push(this.naCl, this.nhCl, this.waTer, this.hCo, this.cOco, this.baCl, this.naOh);
        this.scene.add(this.bgImg, this.textYhhy, this.bsTi);
    }
    //屏幕坐标转为THREE场景坐标
    transitionPos(left: number, right: number, top: number, bottom: number) {
        this.mousePos.left = (left / window.innerWidth) * 2 - 1;
        this.mousePos.right = (right / window.innerWidth ) * 2 - 1;
        this.mousePos.set(this.mousePos.left, this.mousePos.right, 0);
        this.mousePos.unproject(this.camera);
        const dir = this.mousePos.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

        this.mouseTbPos.top = -(top / window.innerHeight) * 2 + 1;
        this.mouseTbPos.bottom = -(bottom / window.innerHeight) * 2 + 1;
        this.mouseTbPos.set(this.mouseTbPos.top, this.mouseTbPos.bottom, 0);
        this.mouseTbPos.unproject(this.camera);
        const dir_ = this.mouseTbPos.sub(this.camera.position).normalize();
        const distance_ = -this.camera.position.z / dir_.z;
        const pos_ = this.camera.position.clone().add(dir_.multiplyScalar(distance_));
        const posArr = [pos.x, pos.y, pos_.x, pos_.y];
        return posArr;
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
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(this.tishiBottonArr, this).initEvent(this.camera, this.renderer);
    }
    //禁止拖动
    stopDrag() {
        for (let i = 0; i < 7; i++) {
            this.tishiBottonArr[i].position.set(this.tiShiPosArr[i][0], this.tiShiPosArr[i][1], this.tiShiPosArr[i][2]);
        }
    }
    //添加图片
    addToScene(img: any) {
        this.scene.add(img);
    }
    // 获取拖动点坐标
    downHandle(name: number) {
        const thiz: any = this;
        if (this.allDate.yellowText === '化合反应') {
            this.waTer.position.set(-55, 68, 0);
            this.naCl.position.set(40, 68, 0);
            this.nhCl.position.set(125, 68, 0);
            this.hCo.position.set(-120, 14, 0);
            for (let i = 0; i < 7; i++) {
                if (name === i) {
                    if (thiz[`isMake${i}`]) {
                        this.scene.add(this.imgArr[i]);
                        thiz[`isMake${i}`] = false;
                    } else {
                        this.scene.remove(this.imgArr[i]);
                        thiz[`isMake${i}`] = true;
                    }   
                }
            }
        } else if (this.allDate.yellowText === '分解反应') {
            this.waTer.position.set(40, 68, 0);
            this.naCl.position.set(-55, 68, 0);
            this.nhCl.position.set(-120, 14, 0);
            this.hCo.position.set(125, 68, 0);
            for (let i = 0; i < 7; i++) {
                if (name === i) {
                    if (thiz[`isMake${i}`]) {
                        this.scene.add(this.imgArrLeft[i]);
                        thiz[`isMake${i}`] = false;
                    } else {
                        this.scene.remove(this.imgArrLeft[i]);
                        thiz[`isMake${i}`] = true;
                    }   
                }
            }
        }
       
    }
    //移动动点位置
    moveHandle(): void {
        this.stopDrag();
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
        this.domElement.appendChild(this.renderer.domElement);
    }
   
    /**
     * 初始化光源
     */
    initLight(): void {
        const light = new THREE.AmbientLight(0xffffff, 1);

        this.scene.add(light);
    }
    //THREE场景坐标转为屏幕坐标
    transitionPosToThree(x: number, y: number, x1: number, y1: number, x2: number, y2: number,
         camera: THREE.Camera, id: any) {
        const worldVector1 = new THREE.Vector3(x, y, 1);
        const worldVector2 = new THREE.Vector3(x1, y1, 1);
        const worldVector3 = new THREE.Vector3(x2, y2, 1);
        const standardVector1 = worldVector1.project(camera); //世界坐标转标准设备坐标
        const standardVector2 = worldVector2.project(camera);
        const standardVector3 = worldVector3.project(camera);
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
      //删除提示
      deleteTiShi() {
        this.scene.remove(this.bsTi);
      }
      //初始化提示按钮
      initTiShiBotton() {
          const thiz: any = this;
          for (let i = 0; i < 7; i++) {
            thiz[`tishi${i}`] = this.tishi.clone();
            thiz[`tishi${i}`].position.set(this.tiShiPosArr[i][0], this.tiShiPosArr[i][1], this.tiShiPosArr[i][2]);
            thiz[`tishi${i}`].visible = false;
            thiz[`tishi${i}`].name = i;
            this.tishiBottonArr.push(thiz[`tishi${i}`]);
            this.scene.add(thiz[`tishi${i}`]);
        }
        this.initEvt();
      }
      //提示按钮加入场景
      addTiShi() {
        const thiz: any = this;
        for (let i = 0; i < 7; i++) {
            thiz[`tishi${i}`].visible = true;
        }
      }
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    //重置
    reset() {
        const thiz: any = this;
        this.scene.add(this.bsTi);
        this.scene.remove(this.posArr);
        clearTimeout(this.allDate.timer);
        clearTimeout(this.allDate.timerYellow);
        clearTimeout(this.allDate.timerPink);
        clearTimeout(this.allDate.timerBlue);
        clearTimeout(this.allDate.timerViolet);
        this.allDate.isOpinion1 = '';
        this.allDate.isOpinion2 = '';
        this.allDate.isOpinion3 = '';
        this.allDate.isOpinion4 = '';
        this.allDate.yellowText = '';
        this.allDate.pinkText = '';
        this.allDate.buleText = '';
        this.allDate.violetText = '';
        this.allDate.yelloAm = false;
        this.allDate.pinkAm = false;
        this.allDate.buleAm = false;
        this.allDate.violetAm = false;
        this.scene.remove(this.waTer, this.naCl, this.nhCl, this.hCo, this.cOco, this.naOh, this.baCl);
        for (let i = 0; i < 7; i++) {
            thiz[`tishi${i}`].visible = false;
            thiz[`isMake${i}`] = true;
            if (i < 4) {
                $(`#index${i}`).css('visibility', 'visible');
            }
        }
    }
}
