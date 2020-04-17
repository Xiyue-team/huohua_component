
import * as THREE from 'three';
import { WebGLRenderer, Vector2, Vector3} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import common from './CommonForThree';
import * as yumi from '../sub_static/1.png';
import * as haidai from '../sub_static/2.png';
import * as saluo from '../sub_static/3.png';
import * as sutie from '../sub_static/4.png';
import * as xiangrikui from '../sub_static/5.png';
import * as diqian from '../sub_static/6.png';
import * as first from '../sub_static/first.png';
import * as secend from '../sub_static/secend.png';
import * as third from '../sub_static/third.png';
import * as thirdcopy from '../sub_static/thirdcopy.png';
import * as fourcopy from '../sub_static/fourcopy.png';
import * as img from '../sub_static/img.png';
import * as shuxian from '../sub_static/shuxian.png';
import $ from 'jquery-ts';

OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private createPlane = common.createPlane(100, 1000, '#171616', 0.2);
    private shuXian0 = common.createImg([-164, 0, 0], 0.7, 63.9, shuxian);
    private shuXian1 = common.createImg([-9, -15, 0], 0.7, 63.9, shuxian);
    private shuXian2 = common.createImg([-164, -35, 0], 0.7, 63.9, shuxian);
    private shuXian3 = common.createImg([-109, -35, 0], 0.7, 63.9, shuxian);
    private shuXian4 = common.createImg([-59, -35, 0], 0.7, 63.9, shuxian);
    private shuXian5 = common.createImg([51, -35, 0], 0.7, 63.9, shuxian);
    private shuXian6 = common.createImg([121, -35, 0], 0.7, 63.9, shuxian);
    //第一个
    private line0 = common.drawDashOrLine([{x: -44, y: 92, z: 0}, {x: -44, y: 82, z: 0}]);
    private line1 = common.drawDashOrLine([{x: -124, y: 82, z: 0}, {x: 36, y: 82, z: 0}]);
    private line2 = common.drawDashOrLine([{x: -124, y: 82, z: 0}, {x: -124, y: 68, z: 0}]);
    private line3 = common.drawDashOrLine([{x: 36, y: 82, z: 0}, {x: 36, y: 68, z: 0}]);
    //第二个
    private line4 = common.drawDashOrLine([{x: -124, y: 50, z: 0}, {x: -124, y: 42, z: 0}]);
    private line5 = common.drawDashOrLine([{x: -164, y: 42, z: 0}, {x: -84, y: 42, z: 0}]);
    private line6 = common.drawDashOrLine([{x: -164, y: 42, z: 0}, {x: -164, y: 29, z: 0}]);
    private line7 = common.drawDashOrLine([{x: -84, y: 42, z: 0}, {x: -84, y: 29, z: 0}]);
    //第三个
    private line8 = common.drawDashOrLine([{x: 36, y: 50, z: 0}, {x: 36, y: 42, z: 0}]);
    private line9 = common.drawDashOrLine([{x: -9, y: 42, z: 0}, {x: 86, y: 42, z: 0}]);
    private line10 = common.drawDashOrLine([{x: -9, y: 42, z: 0}, {x: -9, y: 29, z: 0}]);
    private line11 = common.drawDashOrLine([{x: 86, y: 42, z: 0}, {x: 86, y: 29, z: 0}]);
    //第四个
    private line12 = common.drawDashOrLine([{x: -84, y: 15, z: 0}, {x: -84, y: 3, z: 0}]);
    private line13 = common.drawDashOrLine([{x: -109, y: 3, z: 0}, {x: -59, y: 3, z: 0}]);
    private line14 = common.drawDashOrLine([{x: -109, y: 3, z: 0}, {x: -109, y: -14, z: 0}]);
    private line15 = common.drawDashOrLine([{x: -59, y: 3, z: 0}, {x: -59, y: -14, z: 0}]);
    //第五个
    private line16 = common.drawDashOrLine([{x: 86, y: 15, z: 0}, {x: 86, y: 3, z: 0}]);
    private line17 = common.drawDashOrLine([{x: 51, y: 3, z: 0}, {x: 121, y: 3, z: 0}]);
    private line18 = common.drawDashOrLine([{x: 51, y: 3, z: 0}, {x: 51, y: -14, z: 0}]);
    private line19 = common.drawDashOrLine([{x: 121, y: 3, z: 0}, {x: 121, y: -14, z: 0}]);
    private drag0 = common.createImg([0, 80, 0], 36, 25.92, yumi);
    private drag1 = common.createImg([0, 45, 0], 36, 25.92, haidai);
    private drag2 = common.createImg([0, 10, 0], 36, 25.92, saluo);
    private drag3 = common.createImg([0, -25, 0], 36, 25.92, sutie);
    private drag4 = common.createImg([0, -60, 0], 36, 25.92, xiangrikui);
    private drag5 = common.createImg([0, -95, 0], 36, 25.92, diqian);
    
    private text0 = common.createPlane(25, 15, "", 1, {position: [0, 80, 0]});    
    private text1 = common.createPlane(25, 15, "", 1, {position: [0, 45, 0]});
    private text2 = common.createPlane(25, 15, "", 1, {position: [0, 10, 0]});
    private text3 = common.createPlane(25, 15, "", 1, {position: [0, -25.5, 0]});
    private text4 = common.createPlane(25, 15, "", 1, {position: [0, -60, 0]});
    private text5 = common.createPlane(25, 15, "", 1, {position: [0, -95, 0]});
   //左边文字区域
    private textLeft0 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});    
    private textLeft1 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});
    private textLeft2 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});
    private textLeft3 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});
    private textLeft4 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});
    private textLeft5 = common.createPlane(25, 15, "", 1, {position: [0, -115, 0]});
    private button0 = common.createImg([-30, 100, 0], 65.6, 19.2, first);
    private button1 = common.createImg([-140, 60, 0], 48, 19.2, secend);
    private button2 = common.createImg([40, 60, 0], 48, 19.2, secend);
    private button3 = common.createImg([-190, 20, 0], 48, 19.2, third);
    private button4 = common.createImg([-90, 20, 0], 48, 19.2, third);
    private button5 = common.createImg([-10, 20, 0], 68.8, 19.2, thirdcopy);
    private button6 = common.createImg([90, 20, 0], 68.8, 19.2, thirdcopy);
    private button7 = common.createImg([-190, -20, 0], 48, 19.2, third);
    private button8 = common.createImg([-130, -20, 0], 48, 19.2, third);
    private button9 = common.createImg([-50, -20, 0], 48, 19.2, third);
    private button10 = common.createImg([55, -20, 0], 60.8, 28.8, fourcopy);
    private button11 = common.createImg([125, -20, 0], 60.8, 28.8, fourcopy);
    private button12 = common.createImg([-190, -60, 0], 48, 19.2, third);
    private button13: any;
    private button14: any;
    private button15: any;
    private button16: any;
    private button17: any;
    private button18 = common.createImg([-190, -95, 0], 36, 25.29, img);
    private button19: any;
    private button20: any;
    private button21: any;
    private button22: any;
    private button23: any;
    private allDate: any; //存储全局变量
    private timer: any; //定时器
    private waterBoxPos: any;
    private dragArr: any = [];
    private zoom: any;
    private mousePos: any = new THREE.Vector3(); //对象位置
    private buttonXpos: any = [300, 380, 220, 420, 340, 265, 170, 
        420, 365, 315, 205, 135, 420, 365, 315, 265, 205, 135, 420, 365, 315, 265, 205, 135];
    private textLeftArr: any = [420, 365, 315, 265, 205, 135]; 
    private render = () => {
        requestAnimationFrame(this.render);    
        this.transitionPosToThree(-190, 40, 110, 40, -190, -40, 'opation');
        this.initLabel();
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
        const thiz: any = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initElement();
        this.allDate = (window as any).viewHandler.viewModel.$data;
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.waterBoxPos = this.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.zoom = 256 / (-this.waterBoxPos.x);
        this.camera.position.z = 270 * this.zoom;
        const W = window.innerHeight;
        if (W < 350) {
            this.camera.position.z = 285 * this.zoom;
        }
        this.createPlane.position.x = -this.waterBoxPos.x * this.zoom - 30;
        this.createPlane.position.z = -1;
        for (let i = 0; i < 25; i++) {
            thiz[`button${i}`].position.x = -this.waterBoxPos.x * this.zoom - this.buttonXpos[i];
            if (i < 6) {
                thiz[`drag${i}`].position.x = -this.waterBoxPos.x * this.zoom - 52;
                thiz[`text${i}`].position.x = -this.waterBoxPos.x * this.zoom - 24;
                thiz[`textLeft${i}`].position.x = -this.waterBoxPos.x * this.zoom - this.textLeftArr[i];
                $(`#getimg${i}`).css('visibility', 'hidden');
            }
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
        const thiz: any = this;
        this.scene.add(this.button0);
        for (let i = 13; i < 25; i++) {
            if (i < 18) {
                thiz[`button${i}`] = this.button12.clone();
            } else if (i > 18) {
                thiz[`button${i}`] = this.button18.clone();
            }
        }
        this.scene.add(this.createPlane);
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
    //初始化标签
    initLabel() {
        const thiz: any = this;
        this.copyThreeBoxPos(this.button0, 'zhiwu');
        for (let i = 1; i < 18; i++) {
            this.copyThreeBoxPos(thiz[`button${i}`], `index${i - 1}`);
            if (i < 7) {
                this.copyThreeBoxPos(thiz[`textLeft${i - 1}`], `optiontextleft${i - 1}`);
                this.copyThreeBoxPos(thiz[`text${i - 1}`], `optiontext${i - 1}`);
                this.copyThreeBoxPos(thiz[`drag${i - 1}`], `img${i - 1}`);
            }
        } 
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
            top: result.y
        });
      }
      //仅适用于单一按钮
    copyThreeBoxPos(mesh: any, id: any) {
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
    //点击按钮加线
    clickButton(index: number) {
        if (index > 16) {
            this.allDate.isShow = false;
            this.alldaTe(0, 1);
            this.scene.add(this.button1, this.button2, this.line0, this.line1, this.line2, this.line3);
          } else {
            if (index === 0) {
                this.alldaTe(2, 3);
                this.scene.add(this.button3, this.button4, this.line4, this.line5, this.line6, this.line7);
            }
            if (index === 1) {
                this.alldaTe(4, 5);
                this.scene.add(this.button5, this.button6, this.line8, this.line9, this.line10, this.line11);
              }
            if (index === 2) {
                this.allDate.textArr[6].text = this.allDate.textAllArr[6];
                this.scene.add(this.button7);
                this.addLine(1, 0.5, this.shuXian0);
            }  
            if (index === 3) {
                this.alldaTe(7, 8);
                this.scene.add(this.button8, this.button9, this.line12, this.line13, this.line14, this.line15);
            }
            if (index === 4) {
                this.allData(14, this.button15, this.button21, 'getimg3', 1.2, this.shuXian1);
            }
            if (index === 5) {
                this.alldaTe(9, 10);
                this.scene.add(this.button10, this.button11, this.line16, this.line17, this.line18, this.line19);
            }
            if (index === 6) {
                this.allData(11, this.button12, this.button18, 'getimg0', 0.6, this.shuXian2);
            }
            if (index === 7) {
                this.allData(12, this.button13, this.button19, 'getimg1', 0.6, this.shuXian3);
            }
            if (index === 8) {
                this.allData(13, this.button14, this.button20, 'getimg2', 0.6, this.shuXian4);                
            }
            if (index === 9) {
                this.allData(15, this.button16, this.button22, 'getimg4', 0.8, this.shuXian5);
            }
            if (index === 10) {
                this.allData(16, this.button17, this.button23, 'getimg5', 0.8, this.shuXian6);
            }
            for (let i = 0; i < 6; i++) {
                if (!this.allDate.isImgShow) {
                    if ($(`#getimg${i}`).css('visibility') === 'visible') {
                        this.allDate.optionText = ['玉米', '海带', '桫椤', '苏铁', '向日葵', '地钱'];
                        this.allDate.isImgShow = true;
                    }
                }
            }
          }
    }
    //封装方法
    alldaTe(num: number, numb: number) {
        this.allDate.textArr[num].text = this.allDate.textAllArr[num];
        this.allDate.textArr[numb].text = this.allDate.textAllArr[numb];
    }
    allData(num: number, mesh1: THREE.Mesh, mesh2: THREE.Mesh, id: string, beishu: number, mesh3: THREE.Mesh) {
        this.allDate.textArr[num].text = this.allDate.textAllArr[num];
        this.scene.add(mesh1);
        this.copyThreeBoxPos(mesh2, id);
        this.addLine(1, beishu, mesh3);
        $(`#${id}`).css('visibility', 'visible');
    }
    //添加线条
    addLine(num: number, numH: number, mesh: THREE.Mesh) {
        mesh.scale.set(num, numH, 1);
        this.scene.add(mesh);
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
        this.allDate.isShow = true;
        this.allDate.optionText = [];
        this.allDate.textArr = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, 
        {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
        this.allDate.optionTextleft = ["", "", "", "", "", ""];
        for (let i = 0; i < 24; i++) {
            if (i !== 0) {
                this.scene.remove(thiz[`button${i}`]);
            }
            if (i < 20) {
                this.scene.remove(thiz[`line${i}`]);
            }
            if (i < 7) {
                this.scene.remove(thiz[`shuXian${i}`]);
                if (i < 6) {
                    this.allDate.srcArr[i].src = "";
                    $(`#getimg${i}`).css('backgroundColor', '#FFF');
                    $(`#getimg${i}`).css('visibility', 'hidden');
                    $(`#getimg${i}`).css('opacity', '0.3');
                    $(`#dragImg${i}`).css('visibility', 'visible');
                }
            }
        }
    }
}
