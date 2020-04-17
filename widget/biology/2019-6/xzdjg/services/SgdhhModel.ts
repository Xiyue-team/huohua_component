
import * as THREE from 'three';
import { WebGLRenderer, Vector3, Vector2} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import common from './CommonForThree';
import $ from 'jquery-ts';
import * as heart from '../sub_static/xinzang.png';
import * as error from '../sub_static/error.png';
import * as blue from '../sub_static/blue.png';
import * as red from '../sub_static/red.png';
import * as redlong from '../sub_static/redlong.png';
import * as drag from '../sub_static/bs.png';
OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private allDate: any; //存储全局变量
    private mousePos: any = new THREE.Vector3(); //鼠标左右位置
    private heartImg: any = common.createImg([0, 0, 0], 108.72, 145.08, heart);
    private blueImg: any = common.createImg([0, 0, 0], 74.16, 13.68, blue);
    private redImg: any = common.createImg([0, 0, 0], 74.16, 13.68, red);    
    private redlongImg: any = common.createImg([79, 21, 0], 91.08, 13.68, redlong);
    private bsTi: any = common.createImg([0, 75, 0], 91.2, 14.25, drag);
    //红、蓝提示框
    private blueBox0: any;
    private blueBox1: any;
    private blueBox2: any;
    private blueBox3: any;
    private blueBox4: any;
    private blueBox5: any;
    private blueBox6: any;
    private blueBox7: any;
    private blueBox9: any;
    private blueBox10: any;
    private waterBoxPos: any;
    private optationArr: any = [ //选择框位置
        [-108, 51, -100, 51, -108, 43],
        [-120, 35, -112, 35, -120, 27],
        [-126, 15, -118, 15, -126, 6.8],
        [-111, -12, -103, -12, -111, -20],
        [-94, -34, -86, -34, -94, -42],
        [-109, -52.7, -101, -52.7, -109, -61],
        [73, 51, 81, 51, 73, 43],
        [96, 37, 104, 37, 96, 29],
        [126, 25, 134, 25, 126, 17],
        [95, 11, 103, 11, 95, 3],
        [88, -16, 96, -16, 88, -24]
    ];
    private bluePosArr: any = [ //蓝色按钮
        [-62, 47, 0],
        [-74, 31, 0],
        [-80, 11, 0],
        [-65, -16, 0],
        [-48, -38, 0],
        [-63, -57, 0],
        [35, 47, 0],
        [58, 33, 0],
        [0, 0, 0],
        [56, 7, 0],
        [50, -20, 0],
    ];
    private buttonArr: any = [ //按钮数组
        [-98.5, 53.5, -67, 53.5, -98.5, 40],
        [-110.5, 37.5, -78.9, 37.5, -110.5, 24],
        [-116.8, 17.5, -85, 17.5, -116.8, 4],
        [-102, -9, -70, -9, -102, -23],
        [-84.5, -31, -53.5, -31, -84.5, -44.5],
        [-99.8, -50, -68.1, -50, -99.8, -63.5],
        [40.05, 53.95, 72.03, 53.95, 40.05, 40],
        [63, 39.9, 95, 39.9, 63, 26],
        [92.9, 27.9, 124, 27.9, 93, 14],
        [61, 13.5, 92.5, 13.5, 61, 0],
        [55, -13, 86.5, -13, 55, -27],
    ];
    private render = () => { 
        requestAnimationFrame(this.render);
        this.buttonArr.forEach((item: any, index: any) => {
            this.transitionPosToThree(item[0], item[1], item[2], item[3], item[4], item[5], `button${index}`);
        });
        for (let i = 0; i < 11; i++) {
            this.transitionPosToThree(this.optationArr[i][0], this.optationArr[i][1], this.optationArr[i][2],
                 this.optationArr[i][3], this.optationArr[i][4], this.optationArr[i][5], `optionBox${i}`);
        }
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
        this.render();
        this.allDate = (window as any).viewHandler.viewModel.$data;
        this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.bsTi.position.x = -this.waterBoxPos.x - 45.6;
        this.bsTi.position.y = this.waterBoxPos.y - 52;
    }
    initScene(): void {
        this.scene = new THREE.Scene();  
    }
    //初始化镜头
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
    }
    //初始化光源
    initLight(): void {
        const light = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(light);
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
    // 初始化场景元素
    initElement() {
        this.ininRbBox();
        this.scene.add(this.heartImg, this.bsTi);
    }
    //初始化红、蓝提示框
    ininRbBox() {
        const thiz: any = this;
        for (let i = 0; i < 11; i++) {
            if (i !== 8) {
                if (i === 2 || i === 6 || i === 9 || i === 10) {
                    thiz[`blueBox${i}`] = this.redImg.clone();
                    thiz[`blueBox${i}`].position.set(this.bluePosArr[i][0], this.bluePosArr[i][1], this.bluePosArr[i][2]);
                    if (~[6, 9, 10].indexOf(i)) {
                        thiz[`blueBox${i}`].rotateZ(Math.PI);
                    }
             } else {
                    thiz[`blueBox${i}`] = this.blueImg.clone();
                    thiz[`blueBox${i}`].position.set(this.bluePosArr[i][0], this.bluePosArr[i][1], this.bluePosArr[i][2]);
                    if (i === 7) {
                             thiz[`blueBox${i}`].rotateZ(Math.PI);
                     }
             }
            }
        }
    }
    //拖动显示提示框
    onPan(isDrag: boolean) {
        const thiz: any = this;
        for (let i = 0; i < 11; i++) {
            if (isDrag) {
                if (!this.allDate.rejectArr[8].text) {this.scene.add(this.redlongImg); }
                if (i !== 8 && !this.allDate.rejectArr[i].text) {
                    this.scene.add(thiz[`blueBox${i}`]);
                }
            } else {
                if (!this.allDate.rejectArr[8].text) {this.scene.remove(this.redlongImg); }
                if (i !== 8 && !this.allDate.rejectArr[i].text) {
                    this.scene.remove(thiz[`blueBox${i}`]);
                }
            }
        }
    }
    //
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
        const result = {x: xResult, y: yResult, w: wWidth, h: hHeight};
        $(`#${id}`).css({
            width: result.w,
            height: result.h,
            left: result.x, 
            top: result.y
        });
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
      //删除提示
      deleteTiShi() {
        this.scene.remove(this.bsTi);
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
        clearTimeout(this.allDate.errorRighttimer);
        this.scene.remove(this.redlongImg);
        this.allDate.rejectArr = [{text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""},
         {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}];
        for (let i = 0; i < 11; i++) {
            if (i < 6) {
                $(`#index${i}`).css('visibility', 'visible');
                if (i < 5) {
                    $(`#index${i}6`).css('visibility', 'visible');
                }
            }
            if (i !== 8 ) {
                this.scene.remove(thiz[`blueBox${i}`]);
            }
        }    

    }
}
