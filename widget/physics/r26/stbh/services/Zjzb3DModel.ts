import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import * as blankArrowImg from '../sub_static/blankArrow.png';
import * as yellowOneImg from '../sub_static/yellowArrowOne.png';
import * as yellowTwoImg from '../sub_static/yellowArrowTwo.png';
import * as yellowThreeImg from '../sub_static/yellowArrowThree.png';
import * as yellowFourImg from '../sub_static/yellowArrowFour.png';
import * as yellowFiveImg from '../sub_static/yellowArrowFive.png';
import * as yellowSixImg from '../sub_static/yellowArrowSix.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { MeshText2D, textAlign } from 'three-text2d';

export class Zjzb3DModel extends ThreeBase {

  private controls: any;
  private blankArrowImg: any;
  private yellowArrowImg: any = [];
  private circleText: any = [];
  private tipTexts: any = [];
  private yellowColor = '#FFD621';
  private whiteColor = '#FFFFFF';
  private grayWhiteColor = '#D8D8D8';
  public clickNumber = 0;
  private tipText: any;


  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
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
    this.fov = !fov ? this.fov : fov;
    this.near = !near ? this.near : near;
    this.far = !far ? this.far : fov;
    this.width = !width ? window.innerWidth : width;
    this.height = !height ? window.innerHeight : height;
    this.domElement = domElement;
    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initWebGLRenderer();
    this.initControl();
    this.initBackground();
    this.initAllObjects();
    this.initHotPoint();
    this.bindEventForCircleTexts();
    this.initTipTexts();

    const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
    this.render();
  }

  /**
   *
   * 初始化场景
   */
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

  /**
   * 初始化渲染器
   */
  initWebGLRenderer(): void {
    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }
    (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
    (this.renderer as WebGLRenderer).setClearColor('#2C2C2C', 1);
    this.renderer.setSize(this.width, this.height);
    this.domElement.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化控制器
   */
  initControl(): void {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.noRotate = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }

  /**
   * 初始化光源
   */
  initLight(): void {

  }

  /*创建背景*/
  initBackground() {
    const backgroundPlane = ThreeUtil.createPlane(570, 300, '#2A3950', 1);
    const transparentMask = ThreeUtil.createPlane(570, 180, this.grayWhiteColor, 0.06);
    this.scene.add(backgroundPlane, transparentMask);
  }

  /*初始化场景内物体*/
  initAllObjects() {
    this.blankArrowImg = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, blankArrowImg, -100);
    this.yellowArrowImg[0] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowOneImg, -100);
    this.yellowArrowImg[1] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowTwoImg, -100);
    this.yellowArrowImg[2] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowThreeImg, -100);
    this.yellowArrowImg[3] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowFourImg, -100);
    this.yellowArrowImg[4] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowFiveImg, -100);
    this.yellowArrowImg[5] = ThreeUtil.createImg(458 * 0.3, 270 * 0.3, yellowSixImg, -100);

    for (let i = 0; i < this.yellowArrowImg.length; i++) {
      this.yellowArrowImg[i].visible = false;
      this.scene.add(this.yellowArrowImg[i]);
    }

    const liquidText = ThreeUtil.createNormalText(window.env.browserInfo.lang.liqiudTitle, -100, 50, 0, this.whiteColor, 0.25);
    const solidStateText = ThreeUtil.createNormalText(window.env.browserInfo.lang.solidTitle, -150, -23, 0, this.whiteColor, 0.25);
    const gasStateText = ThreeUtil.createNormalText(window.env.browserInfo.lang.gasTitle, -40, -23, 0, this.whiteColor, 0.25);

    this.tipText = ThreeUtil.createNormalText(window.env.browserInfo.lang.tipTextTitle, -100, 70, 0, this.whiteColor, 0.15);
    this.scene.add(this.blankArrowImg, liquidText, solidStateText, gasStateText, this.tipText);
  }

  /*初始化可点击热点*/
  initHotPoint() {
    this.circleText[0] = ThreeUtil.createPoint(4, this.grayWhiteColor, -135, 30, 0.15);
    const textOne = ThreeUtil.createNormalText('1', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[0].add(textOne);

    this.circleText[1] = ThreeUtil.createPoint(4, this.grayWhiteColor, -145, -10, 0.15);
    const textTwo = ThreeUtil.createNormalText('2', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[1].add(textTwo);

    this.circleText[2] = ThreeUtil.createPoint(4, this.grayWhiteColor, -75, -19, 0.15);
    const textThree = ThreeUtil.createNormalText('3', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[2].add(textThree);

    this.circleText[3] = ThreeUtil.createPoint(4, this.grayWhiteColor, -115, -40, 0.15);
    const textFour = ThreeUtil.createNormalText('4', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[3].add(textFour);

    this.circleText[4] = ThreeUtil.createPoint(4, this.grayWhiteColor, -38, 5, 0.15);
    const textFive = ThreeUtil.createNormalText('5', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[4].add(textFive);

    this.circleText[5] = ThreeUtil.createPoint(4, this.grayWhiteColor, -82, 17, 0.15);
    const textSix = ThreeUtil.createNormalText('6', 0, 2.5, 0, this.whiteColor, 0.1);
    this.circleText[5].add(textSix);

    for (let i = 0;  i < this.circleText.length; i++) {
      this.circleText[i].position.z = 1;
      this.scene.add(this.circleText[i]);
    }
  }

  /*初始化提示文字*/
  initTipTexts() {
    this.tipTexts[0] = this.createText(window.env.browserInfo.lang.meltTitle, this.whiteColor, -145, 25);
    this.tipTexts[0].rotation.z = Math.PI / 4;

    this.tipTexts[1] = this.createText(window.env.browserInfo.lang.solidificateTitle, this.whiteColor, -120, 18);
    this.tipTexts[1].rotation.z = Math.PI / 4;

    this.tipTexts[2] = this.createText(window.env.browserInfo.lang.sublimateTitle, this.whiteColor, -84, -15);

    this.tipTexts[3] = this.createText(window.env.browserInfo.lang.condensedTitle, this.whiteColor, -80, -38);

    this.tipTexts[4] = this.createText(window.env.browserInfo.lang.vaporizateTitle, this.whiteColor, -42, 13);
    this.tipTexts[4].rotation.z = -Math.PI / 4;

    this.tipTexts[5] = this.createText(window.env.browserInfo.lang.liquefactTitle, this.whiteColor, -55, -5);
    this.tipTexts[5].rotation.z = -Math.PI / 4;

    for (let i = 0; i < this.tipTexts.length; i++) {
      this.tipTexts[i].visible = false;
    }
  }

  /*绑定事件*/
  bindEventForCircleTexts() {
    this.bindEvent(this.circleText[0], () => {
      this.clickNumber = 1;
      this.tipTexts[0].visible = true;
      this.showOrHideTipTexts(true, false, false, false, false, false);
      this.changeTextsColor(this.yellowColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    this.bindEvent(this.circleText[1], () => {
      this.clickNumber = 2;
      this.tipTexts[1].visible = true;
      this.showOrHideTipTexts(false, true, false, false, false, false);
      this.changeTextsColor(this.whiteColor, this.yellowColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    this.bindEvent(this.circleText[2], () => {
      this.clickNumber = 3;
      this.tipTexts[2].visible = true;
      this.showOrHideTipTexts(false, false, true, false, false, false);
      this.changeTextsColor(this.whiteColor, this.whiteColor, this.yellowColor, this.whiteColor, this.whiteColor, this.whiteColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    this.bindEvent(this.circleText[3], () => {
      this.clickNumber = 4;
      this.tipTexts[3].visible = true;
      this.showOrHideTipTexts(false, false, false, true, false, false);
      this.changeTextsColor(this.whiteColor, this.whiteColor, this.whiteColor, this.yellowColor, this.whiteColor, this.whiteColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    this.bindEvent(this.circleText[4], () => {
      this.clickNumber = 5;
      this.tipTexts[4].visible = true;
      this.showOrHideTipTexts(false, false, false, false, true, false);
      this.changeTextsColor(this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.yellowColor, this.whiteColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    this.bindEvent(this.circleText[5], () => {
      this.clickNumber = 6;
      this.tipTexts[5].visible = true;
      this.showOrHideTipTexts(false, false, false, false, false, true);
      this.changeTextsColor(this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.yellowColor);
      (window as any).viewHandler.viewModel.changeVideoAndPoster();
    });

    for (let i = 0; i < this.circleText.length; i++) {
      (this.circleText[i] as any).on('mouseover', () => {
        document.body.style.cursor = 'pointer';
      });
      (this.circleText[i] as any).on('mouseout', () => {
        document.body.style.cursor = 'auto';
      });
    }
  }

  bindEvent(obj: any, callback: Function) {
    obj.on('click', () => {
      this.tipText.visible = false;
      (document.getElementsByClassName('videoPoster')[0] as HTMLElement).style.opacity = '0';
      callback();
    });
  }

  /*创建文字*/
  createText(texts: string, color: string, x: number, y: number) {
    const text = new MeshText2D(texts, { align: textAlign.right, font: '30px SimHei', fillStyle: color, antialias: true });
    text.position.set(x, y, 0);
    text.scale.set(0.2, 0.2, 0.2);
    this.scene.add(text);
    return text;
  }

  /*显示、隐藏提示文字*/
  showOrHideTipTexts(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean, flag5: boolean, flag6: boolean) {
    this.yellowArrowImg[0].visible = flag1;
    this.yellowArrowImg[1].visible = flag2;
    this.yellowArrowImg[2].visible = flag3;
    this.yellowArrowImg[3].visible = flag4;
    this.yellowArrowImg[4].visible = flag5;
    this.yellowArrowImg[5].visible = flag6;
    (window as any).viewHandler.viewModel.$data.active1 = true;
  }

  /*点击改变字体颜色*/
  changeTextsColor(color1: string, color2: string, color3: string, color4: string, color5: string, color6: string) {
    this.tipTexts[0].fillStyle = color1;
    this.tipTexts[1].fillStyle = color2;
    this.tipTexts[2].fillStyle = color3;
    this.tipTexts[3].fillStyle = color4;
    this.tipTexts[4].fillStyle = color5;
    this.tipTexts[5].fillStyle = color6;
  }

  resize(width: number, height: number) {
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  reset() {
    this.tipText.visible = true;
    this.changeTextsColor(this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor, this.whiteColor);
    for (let i = 0; i < this.tipTexts.length; i++) {
      this.tipTexts[i].visible = false;
    }
    for (let i = 0; i < this.yellowArrowImg.length; i++) {
      this.yellowArrowImg[i].visible = false;
    }
  }
}
