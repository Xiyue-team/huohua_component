import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as glassTube from '../sub_static/glassTube.png';
import * as tube from '../sub_static/tube.png';
import * as plane from '../sub_static/plane.png';
import * as negative from '../sub_static/negative.png';
import * as plus from '../sub_static/plus.png';

export class Tms3dModel extends ThreeBase {

    private controls: any;
    //左侧光源线
    leftLine: any;
    greenLight: any;

    //右下侧曲线和直线
    arcBottomLine: any = [];
    rightBottomLine: any = [];

    //右上侧曲线和直线
    arcTopLine: any = [];
    rightTopLine: any = [];

    sliderNum = 0;
    //plusImg集合
    plusImg: any = [];
    //negativeImg集合
    negativeImg: any = [];



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
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();
    }

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render( this.scene,  this.camera );
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initImage();
        this.addBottomCurveLine();
        this.addTopCurveLine();
        this.drawLightLine();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( '#2B2B2B' );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  270);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

    //加载背景图片
    initImage() {
        const bgImage = ThreeUtil.createImg(325, 150, glassTube);
        const tubeImage = ThreeUtil.createImg(49, 18, tube, -80, -23.5, 0);
        const topPlane = ThreeUtil.createImg(63, 9, plane, 22, -10, 0);
        const bottomPlane = topPlane.clone();
        bottomPlane.position.set(22, -32, 0);

        //正电荷
        this.plusImg[0] = ThreeUtil.createImg(5, 10, plus);
        this.plusImg[1] = this.plusImg[0].clone();
        this.plusImg[2] = this.plusImg[0].clone();
        this.plusImg[3] = this.plusImg[0].clone();
        this.plusImg[4] = this.plusImg[0].clone();
        this.scene.add(this.plusImg[0]);
        this.scene.add(this.plusImg[1]);
        this.scene.add(this.plusImg[2]);
        this.scene.add(this.plusImg[3]);
        this.scene.add(this.plusImg[4]);

        //负电荷
        this.negativeImg[0] = ThreeUtil.createImg(5, 10, negative);
        this.negativeImg[1] = this.negativeImg[0].clone();
        this.negativeImg[2] = this.negativeImg[0].clone();
        this.negativeImg[3] = this.negativeImg[0].clone();
        this.negativeImg[4] = this.negativeImg[0].clone();
        this.scene.add(this.negativeImg[0]);
        this.scene.add(this.negativeImg[1]);
        this.scene.add(this.negativeImg[2]);
        this.scene.add(this.negativeImg[3]);
        this.scene.add(this.negativeImg[4]);
        for (let i = 0; i < this.plusImg.length; i++) {
            this.plusImg[i].visible = false;
            this.negativeImg[i].visible = false;
        }
        this.scene.add(bgImage);
        this.scene.add(tubeImage);
        this.scene.add(topPlane);
        this.scene.add(bottomPlane);
    }

    //改变正负电荷位置
    initElectronImg(value: number) {
        if (value < 0) {
          this.plusImg[0].position.set(30, -32, 0);
          this.plusImg[1].position.set(40, -31, 0);
          this.plusImg[2].position.set(20, -32, 0);
          this.plusImg[3].position.set(10, -30, 0);
          this.plusImg[4].position.set(5, -32, 0);
          this.negativeImg[0].position.set(30, -12, 0);
          this.negativeImg[1].position.set(40, -10, 0);
          this.negativeImg[2].position.set(20, -9, 0);
          this.negativeImg[3].position.set(10, -10, 0);
          this.negativeImg[4].position.set(5, -8, 0);
        } else if (value > 0) {
          this.negativeImg[0].position.set(30, -32, 0);
          this.negativeImg[1].position.set(40, -31, 0);
          this.negativeImg[2].position.set(20, -32, 0);
          this.negativeImg[3].position.set(10, -30, 0);
          this.negativeImg[4].position.set(5, -32, 0);
          this.plusImg[0].position.set(30, -12, 0);
          this.plusImg[1].position.set(40, -10, 0);
          this.plusImg[2].position.set(20, -9, 0);
          this.plusImg[3].position.set(10, -10, 0);
          this.plusImg[4].position.set(5, -8, 0);
        }
    }

    //画光线
    drawLightLine() {
        this.greenLight = this.lineToTube('#8CD869', -93, -23.7, -69, -23.7);
        this.leftLine = this.lineToTube('#82CF66', -58.2, -23.7, -10, -23.7);
        this.greenLight.visible = false;
        this.leftLine.visible = false;
        this.scene.add(this.leftLine);
        this.scene.add(this.greenLight);
    }

    //直线转管道
    lineToTube(color: string, x1: number, y1: number, x2: number, y2: number) {
        const curvePointArray: any = [];
        const greenLight = ThreeUtil.createLineforPoint(color, [x1, y1, 0], [x2, y2, 0], true, 0.68);
        for (let i = 0; i < (greenLight.geometry as any).vertices.length; i++) {
          curvePointArray.push(new THREE.Vector3((greenLight.geometry as any).vertices[i].x,
            (greenLight.geometry as any).vertices[i].y, (greenLight.geometry as any).vertices[i].z));
        }
        const lightLine = ThreeUtil.createTube(curvePointArray, 0.5, 2, color);
        return lightLine;
    }

    //画曲线
    drawLine(x1: number, y1: number, x2: number,
             y2: number, x3: number, y3: number, x4: number, y4: number) {
      const curveObject = ThreeUtil.createBezierCurve({
        x1: x1,
        y1: y1,
        z1: 0,
        x2: x2,
        y2: y2,
        z2: 0,
        x3: x3,
        y3: y3,
        z3: 0,
        x4: x4,
        y4: y4,
        z4: 0,
      });
      return curveObject;
    }

    //计算斜率x2 != x1
    getSlopeK(x1: number, y1: number, x2: number, y2: number) {
        const k = (y2 - y1) / (x2 - x1);
        return k;
    }

    //极板中间弧线
    drawArcLine(y1: number, y2: number, y3: number) {
        const curvePointArray: any = [];
        const virtualLine = this.drawLine(-10, -23.5, 20, y1, 40, y2, 53, y3);
        for (let n = 0; n < (virtualLine as any).geometry.attributes.position.array.length; n += 3) {
          curvePointArray.push(new THREE.Vector3((virtualLine as any).geometry.attributes.position.array[n],
            (virtualLine as any).geometry.attributes.position.array[n + 1], 1));
        }
        const arcLine = ThreeUtil.createTube(curvePointArray, 0.5, curvePointArray.length, '#82CF66');
        return arcLine;
    }

    //极板右侧直线
    drawRightLine(y1: number, y2: number, lineLength: number) {
        const k = this.getSlopeK(40, y1, 53, y2);
        const rightLine = this.lineToTube('#82CF66', 53, y2, lineLength, k * (lineLength - 53) + (y2));
        return rightLine;
    }

    //下半侧弧线和直线
    addBottomCurveLine() {
        this.arcBottomLine[0] = this.drawArcLine(-24.1, -24.3, -28.5);
        this.rightBottomLine[0] = this.drawRightLine(-24.3, -28.5, 141.5);
        this.scene.add(this.arcBottomLine[0]);
        this.scene.add(this.rightBottomLine[0]);

        this.arcBottomLine[1] = this.drawArcLine(-24.05, -24.25, -28.1);
        this.rightBottomLine[1] = this.drawRightLine(-24.25, -28.1, 145);
        this.scene.add(this.arcBottomLine[1]);
        this.scene.add(this.rightBottomLine[1]);

        this.arcBottomLine[2] = this.drawArcLine(-24, -24.2, -27.6);
        this.rightBottomLine[2] = this.drawRightLine(-24.2, -27.6, 148);
        this.scene.add(this.arcBottomLine[2]);
        this.scene.add(this.rightBottomLine[2]);

        this.arcBottomLine[3] = this.drawArcLine(-23.95, -24.15, -27.15);
        this.rightBottomLine[3] = this.drawRightLine(-24.15, -27.15, 151);
        this.scene.add(this.arcBottomLine[3]);
        this.scene.add(this.rightBottomLine[3]);

        this.arcBottomLine[4] = this.drawArcLine(-23.9, -24.1, -26.65);
        this.rightBottomLine[4] = this.drawRightLine(-24.1, -26.65, 154);
        this.scene.add(this.arcBottomLine[4]);
        this.scene.add(this.rightBottomLine[4]);

        this.arcBottomLine[5] = this.drawArcLine(-23.85, -24.05, -26.15);
        this.rightBottomLine[5] = this.drawRightLine(-24.05, -26.15, 156);
        this.scene.add(this.arcBottomLine[5]);
        this.scene.add(this.rightBottomLine[5]);

        this.arcBottomLine[6] = this.drawArcLine(-23.8, -24, -25.7);
        this.rightBottomLine[6] = this.drawRightLine(-24, -25.7, 158);
        this.scene.add(this.arcBottomLine[6]);
        this.scene.add(this.rightBottomLine[6]);

        this.arcBottomLine[7] = this.drawArcLine(-23.75, -23.95, -25.2);
        this.rightBottomLine[7] = this.drawRightLine(-23.95, -25.2, 159.5);
        this.scene.add(this.arcBottomLine[7]);
        this.scene.add(this.rightBottomLine[7]);

        this.arcBottomLine[8] = this.drawArcLine(-23.7, -23.9, -24.75);
        this.rightBottomLine[8] = this.drawRightLine(-23.9, -24.75, 160.8);
        this.scene.add(this.arcBottomLine[8]);
        this.scene.add(this.rightBottomLine[8]);

        this.arcBottomLine[9] = this.drawArcLine(-23.65, -23.85, -24.25);
        this.rightBottomLine[9] = this.drawRightLine(-23.85, -24.25, 161.5);
        this.scene.add(this.arcBottomLine[9]);
        this.scene.add(this.rightBottomLine[9]);

        this.arcBottomLine[10] = this.drawArcLine(-23.5, -23.5, -23.45);
        this.rightBottomLine[10] = this.drawRightLine(-23.5, -23.45, 161.8);
        this.scene.add(this.arcBottomLine[10]);
        this.scene.add(this.rightBottomLine[10]);

        this.hideBottomLine();
    }

    //上半侧弧线和直线
    addTopCurveLine() {
      this.arcTopLine[0] = this.drawArcLine(-22.65, -22.45, -18.1);
      this.rightTopLine[0] = this.drawRightLine(-22.45, -18.1, 142);
      this.scene.add(this.arcTopLine[0]);
      this.scene.add(this.rightTopLine[0]);

      this.arcTopLine[1] = this.drawArcLine(-22.7, -22.5, -18.5);
      this.rightTopLine[1] = this.drawRightLine(-22.5, -18.5, 145.5);
      this.scene.add(this.arcTopLine[1]);
      this.scene.add(this.rightTopLine[1]);

      this.arcTopLine[2] = this.drawArcLine(-22.75, -22.55, -19);
      this.rightTopLine[2] = this.drawRightLine(-22.55, -19, 148.5);
      this.scene.add(this.arcTopLine[2]);
      this.scene.add(this.rightTopLine[2]);

      this.arcTopLine[3] = this.drawArcLine(-22.8, -22.6, -19.5);
      this.rightTopLine[3] = this.drawRightLine(-22.6, -19.5, 151.5);
      this.scene.add(this.arcTopLine[3]);
      this.scene.add(this.rightTopLine[3]);

      this.arcTopLine[4] = this.drawArcLine(-22.85, -22.65, -20);
      this.rightTopLine[4] = this.drawRightLine(-22.65, -20, 154);
      this.scene.add(this.arcTopLine[4]);
      this.scene.add(this.rightTopLine[4]);

      this.arcTopLine[5] = this.drawArcLine(-22.9, -22.7, -20.48);
      this.rightTopLine[5] = this.drawRightLine(-22.7, -20.48, 156.5);
      this.scene.add(this.arcTopLine[5]);
      this.scene.add(this.rightTopLine[5]);

      this.arcTopLine[6] = this.drawArcLine(-23, -22.75, -20.95);
      this.rightTopLine[6] = this.drawRightLine(-22.75, -20.95, 158);
      this.scene.add(this.arcTopLine[6]);
      this.scene.add(this.rightTopLine[6]);

      this.arcTopLine[7] = this.drawArcLine(-23.05, -22.8, -21.4);
      this.rightTopLine[7] = this.drawRightLine(-22.8, -21.4, 159.8);
      this.scene.add(this.arcTopLine[7]);
      this.scene.add(this.rightTopLine[7]);

      this.arcTopLine[8] = this.drawArcLine(-23.1, -22.85, -21.9);
      this.rightTopLine[8] = this.drawRightLine(-22.85, -21.9, 160.8);
      this.scene.add(this.arcTopLine[8]);
      this.scene.add(this.rightTopLine[8]);

      this.arcTopLine[9] = this.drawArcLine(-23.15, -22.9, -22.4);
      this.rightTopLine[9] = this.drawRightLine(-22.9, -22.4, 161.5);
      this.scene.add(this.arcTopLine[9]);
      this.scene.add(this.rightTopLine[9]);

      this.hideTopLine();
    }

    //显示或隐藏左侧光线
    showOrHideLeftLightLine(flag: boolean) {
        this.greenLight.visible = flag;
        this.leftLine.visible = flag;
        this.switchCaseCode(this.sliderNum, flag);
    }

    //隐藏上侧线
    hideTopLine() {
        for (let i = 0; i < this.arcTopLine.length; i++) {
            this.arcTopLine[i].visible = false;
            this.rightTopLine[i].visible = false;
        }
    }

    //隐藏下侧线
    hideBottomLine() {
        for (let i = 0; i < this.arcBottomLine.length; i++) {
          this.arcBottomLine[i].visible = false;
          this.rightBottomLine[i].visible = false;
        }
    }

    //滑条值改变动态显示线条
    changeLineBySliderNumber(value: number) {
          this.hideBottomLine();
          this.hideTopLine();
          this.switchCaseCode(value, true);
    }

    //获取滑条值
    getSliderNumber(value: number) {
        this.sliderNum = value;
    }

    //隐藏或显示所有电荷图片
    hideOrShowAllElectronImg(flag: boolean) {
        for (let i = 0; i < this.plusImg.length; i++) {
          this.plusImg[i].visible = flag;
          this.negativeImg[i].visible = flag;
        }
    }

    //显示或隐藏部分电荷图片
    hideOrShowPartElectronImg(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean, flag5: boolean) {
        this.plusImg[4].visible = flag1;
        this.negativeImg[4].visible = flag1;
        this.plusImg[2].visible = flag2;
        this.negativeImg[2].visible = flag2;
        this.plusImg[1].visible = flag3;
        this.negativeImg[1].visible = flag3;
        this.plusImg[0].visible = flag4;
        this.negativeImg[0].visible = flag4;
        this.plusImg[3].visible = flag5;
        this.negativeImg[3].visible = flag5;
    }

    //整合代码
    switchCaseCode(value: number, flag: boolean) {
      const accelerateColor = (window as any).viewHandler.viewModel.$data.accelerateColor;
        switch (value) {
          case -20:
            if (accelerateColor) {
              this.arcBottomLine[0].visible = flag;
              this.rightBottomLine[0].visible = flag;
            }
            this.initElectronImg(-20);
            this.hideOrShowAllElectronImg(true);
            break;
          case -18:
            if (accelerateColor) {
              this.arcBottomLine[1].visible = flag;
              this.rightBottomLine[1].visible = flag;
            }
            this.initElectronImg(-18);
            this.hideOrShowPartElectronImg(true, true, true, true, false);
            break;
          case -16:
            if (accelerateColor) {
              this.arcBottomLine[2].visible = flag;
              this.rightBottomLine[2].visible = flag;
            }
            this.initElectronImg(-16);
            this.hideOrShowPartElectronImg(true, true, true, true, false);
            break;
          case -14:
            if (accelerateColor) {
              this.arcBottomLine[3].visible = flag;
              this.rightBottomLine[3].visible = flag;
            }
            this.initElectronImg(-14);
            this.hideOrShowPartElectronImg(true, true, true, false, false);
            break;
          case -12:
            if (accelerateColor) {
              this.arcBottomLine[4].visible = flag;
              this.rightBottomLine[4].visible = flag;
            }
            this.initElectronImg(-12);
            this.hideOrShowPartElectronImg(true, true, true, false, false);
            break;
          case -10:
            if (accelerateColor) {
              this.arcBottomLine[5].visible = flag;
              this.rightBottomLine[5].visible = flag;
            }
            this.initElectronImg(-10);
            this.hideOrShowPartElectronImg(true, true, false, false, false);
            break;
          case -8:
            if (accelerateColor) {
              this.arcBottomLine[6].visible = flag;
              this.rightBottomLine[6].visible = flag;
            }
            this.initElectronImg(-8);
            this.hideOrShowPartElectronImg(true, true, false, false, false);
            break;
          case -6:
            if (accelerateColor) {
              this.arcBottomLine[7].visible = flag;
              this.rightBottomLine[7].visible = flag;
            }
            this.initElectronImg(-6);
            this.hideOrShowPartElectronImg(true, false, false, false, false);
            break;
          case -4:
            if (accelerateColor) {
              this.arcBottomLine[8].visible = flag;
              this.rightBottomLine[8].visible = flag;
            }
            this.initElectronImg(-4);
            this.hideOrShowPartElectronImg(true, false, false, false, false);
            break;
          case -2:
            if (accelerateColor) {
              this.arcBottomLine[9].visible = flag;
              this.rightBottomLine[9].visible = flag;
            }
            this.initElectronImg(-2);
            break;
          case 0:
            if (accelerateColor) {
              this.arcBottomLine[10].visible = flag;
              this.rightBottomLine[10].visible = flag;
            }
            this.hideOrShowAllElectronImg(false);
            break;
          case 2:
            if (accelerateColor) {
              this.arcTopLine[9].visible = flag;
              this.rightTopLine[9].visible = flag;
            }
            this.initElectronImg(2);
            break;
          case 4:
            if (accelerateColor) {
              this.arcTopLine[8].visible = flag;
              this.rightTopLine[8].visible = flag;
            }
            this.initElectronImg(4);
            this.hideOrShowPartElectronImg(true, false, false, false, false);
            break;
          case 6:
            if (accelerateColor) {
              this.arcTopLine[7].visible = flag;
              this.rightTopLine[7].visible = flag;
            }
            this.initElectronImg(6);
            this.hideOrShowPartElectronImg(true, false, false, false, false);
            break;
          case 8:
            if (accelerateColor) {
              this.arcTopLine[6].visible = flag;
              this.rightTopLine[6].visible = flag;
            }
            this.initElectronImg(8);
            this.hideOrShowPartElectronImg(true, true, false, false, false);
            break;
          case 10:
            if (accelerateColor) {
              this.arcTopLine[5].visible = flag;
              this.rightTopLine[5].visible = flag;
            }
            this.initElectronImg(10);
            this.hideOrShowPartElectronImg(true, true, false, false, false);
            break;
          case 12:
            if (accelerateColor) {
              this.arcTopLine[4].visible = flag;
              this.rightTopLine[4].visible = flag;
            }
            this.initElectronImg(12);
            this.hideOrShowPartElectronImg(true, true, true, false, false);
            break;
          case 14:
            if (accelerateColor) {
              this.arcTopLine[3].visible = flag;
              this.rightTopLine[3].visible = flag;
            }
            this.initElectronImg(14);
            this.hideOrShowPartElectronImg(true, true, true, false, false);
            break;
          case 16:
            if (accelerateColor) {
              this.arcTopLine[2].visible = flag;
              this.rightTopLine[2].visible = flag;
            }
            this.initElectronImg(16);
            this.hideOrShowPartElectronImg(true, true, true, true, false);
            break;
          case 18:
            if (accelerateColor) {
              this.arcTopLine[1].visible = flag;
              this.rightTopLine[1].visible = flag;
            }
            this.initElectronImg(18);
            this.hideOrShowPartElectronImg(true, true, true, true, false);
            break;
          case 20:
            if (accelerateColor) {
              this.arcTopLine[0].visible = flag;
              this.rightTopLine[0].visible = flag;
            }
            this.initElectronImg(20);
            this.hideOrShowAllElectronImg(true);
            break;
        }
    }

    reset() {
        this.greenLight.visible = false;
        this.leftLine.visible = false;
        this.hideTopLine();
        this.hideBottomLine();
        this.hideOrShowAllElectronImg(false);
    }
}




