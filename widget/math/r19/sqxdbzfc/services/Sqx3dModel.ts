import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import * as tuodongdian from '../sub_static/tuodong.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';

export class Sqx3dModel extends ThreeBase {

    colorLine = new Line();
    private controls: any;
    color = '#000';
    img: any = [];
    text: any = [];
    solidLine: any = [];
    dashLine: any = [];

    leftEllipse: any = [];
    rightEllipse: any = [];

    topEllipse: any = [];
    bottomEllipse: any = [];

    //x轴拖动点
    F1AreaOnX: any;
    F2AreaOnX: any;
    MAreaOnX: any;

    //y轴拖动点
    F1AreaOnY: any;
    F2AreaOnY: any;
    MAreaOnY: any;

    obj1 = new THREE.Group();
    obj2 = new THREE.Group();

    //x轴 a,b,c
    a = 30;
    b = 40;
    c = 50;

    //y轴a,b,c
    d = 30;
    e = 40;
    f = 50;

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
        this.createAxis();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.drawLineSegmentOnXAxis(30, 40, 50);
        this.drawLineSegmentOnYAxis(30, 40, 50);
        this.drawFourEllipseOnXAixs();
        this.drawFourEllipseOnYAixs();
        this.hideAndShowLineOnXAxis(true, false, false, false);
        this.hideAndShowLineOnYAxis(true, false, false, false);
        this.drawMoveLineSegementOnXAxis(-50, 0, 35, Math.sqrt((
            (Math.pow(40, 2)) / Math.pow(30, 2)) * Math.pow(35, 2) - Math.pow(40, 2)), 50, 0);

        this.drawMoveLineSegementOnYAxis(0, -50, Math.sqrt((Math.pow(40, 2) / Math.pow(30 , 2)) *
        Math.pow(35, 2) - Math.pow(40 , 2)), 35, 0, 50);

        this.addDragPointOnXAxis();
        this.addDragPointOnYAxis();
        this.bindEventOnXAxis();
        this.bindEventOnYAxis();
        this.obj2.visible = false;
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
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

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建坐标轴
    createAxis() {
        this.scene.add(AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any));
    }

    //绘制x轴上的双曲线
    createEllipseOnXAxis(a: number, b: number): any {
        const curvePointArray: any = [];
        for (let i = -110; i <= 110; i += 2) {
            const x = Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
            curvePointArray.push(new THREE.Vector3(x, i, 0));
        }
        const curve = ThreeUtil.createTube(curvePointArray, 0.5, 500, this.color);
        return curve;
    }

    //绘制y轴上的双曲线
    createEllipseOnYAxis(a: number, b: number): any {
      const curvePointArray: any = [];
      for (let i = -110; i <= 110; i += 2) {
        const y = Math.sqrt(((Math.pow(a, 2)) / Math.pow(b, 2)) * Math.pow(i, 2) + Math.pow(a, 2));
        curvePointArray.push(new THREE.Vector3(i, y, 0));
      }
      const curve = ThreeUtil.createTube(curvePointArray, 0.5, 500, this.color);
      return curve;
    }

    //绘制x轴4条双曲线
    drawFourEllipseOnXAixs() {
           this.rightEllipse[0] = this.createEllipseOnXAxis(30, 40);
           this.rightEllipse[1] = this.createEllipseOnXAxis(20, Math.sqrt((Math.pow(40, 2) - Math.pow(20, 2))));
           this.rightEllipse[2] = this.createEllipseOnXAxis(40, Math.sqrt((Math.pow(60, 2) - Math.pow(40, 2))));
           this.rightEllipse[3] = this.createEllipseOnXAxis(50, Math.sqrt((Math.pow(70, 2) - Math.pow(50, 2))));

           this.leftEllipse[0] = this.rightEllipse[0].clone();
           this.leftEllipse[0].rotateY(Math.PI);

           this.leftEllipse[1] = this.rightEllipse[1].clone();
           this.leftEllipse[1].rotateY(Math.PI);

           this.leftEllipse[2] = this.rightEllipse[2].clone();
           this.leftEllipse[2].rotateY(Math.PI);

           this.leftEllipse[3] = this.rightEllipse[3].clone();
           this.leftEllipse[3].rotateY(Math.PI);

           for (let i = 0; i <= 3; i++) {
             this.obj1.add(this.rightEllipse[i]);
             this.obj1.add(this.leftEllipse[i]);
           }
           this.scene.add(this.obj1);
    }

    //绘制y轴4条双曲线
    drawFourEllipseOnYAixs() {
        this.topEllipse[0] = this.createEllipseOnYAxis(30, 40);
        this.topEllipse[1] = this.createEllipseOnYAxis(20, Math.sqrt((Math.pow(40, 2) - Math.pow(20, 2))));
        this.topEllipse[2] = this.createEllipseOnYAxis(40, Math.sqrt((Math.pow(60, 2) - Math.pow(40, 2))));
        this.topEllipse[3] = this.createEllipseOnYAxis(50, Math.sqrt((Math.pow(70, 2) - Math.pow(50, 2))));

        this.bottomEllipse[0] = this.topEllipse[0].clone();
        this.bottomEllipse[0].rotateX(Math.PI);

        this.bottomEllipse[1] = this.topEllipse[1].clone();
        this.bottomEllipse[1].rotateX(Math.PI);

        this.bottomEllipse[2] = this.topEllipse[2].clone();
        this.bottomEllipse[2].rotateX(Math.PI);

        this.bottomEllipse[3] = this.topEllipse[3].clone();
        this.bottomEllipse[3].rotateX(Math.PI);

        for (let i = 0; i <= 3; i++) {
          this.obj2.add(this.topEllipse[i]);
          this.obj2.add(this.bottomEllipse[i]);
        }
        this.scene.add(this.obj2);
    }

    //显示和隐藏双曲线
    hideAndShowLineOnXAxis(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {

            this.rightEllipse[0].visible = flag1;
            this.rightEllipse[1].visible = flag2;
            this.rightEllipse[2].visible = flag3;
            this.rightEllipse[3].visible = flag4;
            this.leftEllipse[0].visible = flag1;
            this.leftEllipse[1].visible = flag2;
            this.leftEllipse[2].visible = flag3;
            this.leftEllipse[3].visible = flag4;

    }

    //显示和隐藏双曲线
    hideAndShowLineOnYAxis(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {

        this.topEllipse[0].visible = flag1;
        this.topEllipse[1].visible = flag2;
        this.topEllipse[2].visible = flag3;
        this.topEllipse[3].visible = flag4;
        this.bottomEllipse[0].visible = flag1;
        this.bottomEllipse[1].visible = flag2;
        this.bottomEllipse[2].visible = flag3;
        this.bottomEllipse[3].visible = flag4;

    }

    //X轴添加拖动点图片及文字
    addDragPointOnXAxis() {
        //F1
        this.img[0] = ThreeUtil.createImg(9, 9, tuodongdian, 0, 0, 1);
        //F2
        this.img[1] = this.img[0].clone();
        //M点
        this.img[2] = this.img[0].clone();

        const textF1 = ThreeUtil.createNewRomanText('F', -5, 10, 0, this.color, 0.15);
        const text1 = ThreeUtil.createNormalText('₁', -2, 9, 0, this.color, 0.15);
        const textF2 = ThreeUtil.createNewRomanText('F', 5, 10, 0, this.color, 0.15);
        const text2 = ThreeUtil.createNormalText('₂', 8, 9, 0, this.color, 0.15);
        const textM = ThreeUtil.createNewRomanText('M', 10, 10, 0, this.color, 0.15);
        this.img[0].add(textF1);
        this.img[0].add(text1);
        this.img[1].add(textF2);
        this.img[1].add(text2);
        this.img[2].add(textM);

        //增大拖动点识别区域
        this.F1AreaOnX = ThreeUtil.createPoint(10, '#fff', -50, 0, 0.001);
        this.F2AreaOnX = ThreeUtil.createPoint(10, '#fff', 50, 0, 0.001);
        this.MAreaOnX = ThreeUtil.createPoint(10, '#fff', 35, Math.sqrt((
          (Math.pow(40, 2)) / Math.pow(30, 2)) * Math.pow(35, 2) - Math.pow(40, 2)), 0.001);
        this.F1AreaOnX.add(this.img[0]);
        this.F2AreaOnX.add(this.img[1]);
        this.MAreaOnX.add(this.img[2]);
        this.obj1.add(this.F1AreaOnX);
        this.obj1.add(this.F2AreaOnX);
        this.obj1.add(this.MAreaOnX);
    }

    //y轴添加拖动点及图片
    addDragPointOnYAxis() {
      //y轴上
      //F1
      this.img[3] = ThreeUtil.createImg(9, 9, tuodongdian, 0, 0, 1);
      //F2
      this.img[4] = this.img[3].clone();
      //M
      this.img[5] = this.img[3].clone();

      const textF1 = ThreeUtil.createNewRomanText('F', 5, -5, 0, this.color, 0.15);
      const text1 = ThreeUtil.createNormalText('₁', 8, -6, 0, this.color, 0.15);
      const textF2 = ThreeUtil.createNewRomanText('F', 5, 10, 0, this.color, 0.15);
      const text2 = ThreeUtil.createNormalText('₂', 8, 9, 0, this.color, 0.15);
      const textM = ThreeUtil.createNewRomanText('M', 10, 10, 0, this.color, 0.15);
      this.img[3].add(textF1);
      this.img[3].add(text1);
      this.img[4].add(textF2);
      this.img[4].add(text2);
      this.img[5].add(textM);

      //增大拖动点识别区域
      this.F1AreaOnY = ThreeUtil.createPoint(10, '#fff', 0, -50, 0.001);
      this.F2AreaOnY = ThreeUtil.createPoint(10, '#fff', 0, 50, 0.001);
      this.MAreaOnY = ThreeUtil.createPoint(10, '#fff', Math.sqrt(Math.pow(40, 2) / Math.pow(30, 2)
      * Math.pow(35, 2) - Math.pow(40, 2)), 35, 0.001);
      this.F1AreaOnY.add(this.img[3]);
      this.F2AreaOnY.add(this.img[4]);
      this.MAreaOnY.add(this.img[5]);
      this.obj2.add(this.F1AreaOnY);
      this.obj2.add(this.F2AreaOnY);
      this.obj2.add(this.MAreaOnY);
    }

    //x轴绘制abc线段
    drawLineSegmentOnXAxis(a: number, b: number, c: number) {

      //上虚线2a
      this.dashLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(-a, b, 0),
        endPoint: new THREE.Vector3(a, b, 0),
        color: '#D734FF',
        dashLine: true,
        gapSize: 2,
        dashSize: 3,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.dashLine[1] = this.dashLine[0].clone();
      this.dashLine[1].rotateX(Math.PI);

      //左虚线2b
      this.dashLine[2] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(-a, b, 0),
        endPoint: new THREE.Vector3(-a, -b, 0),
        color: '#FF991B',
        dashLine: true,
        gapSize: 2,
        dashSize: 3,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.dashLine[3] = this.dashLine[2].clone();
      this.dashLine[3].rotateY(Math.PI);

      //实线c
      this.solidLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(-c, 0, 0),
        color: '#3FCCCF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.text[0] = ThreeUtil.createNewRomanText('2a', (-a + 0) / 2,
        b, 0, '#D734FF', 0.15);

      this.text[1] = ThreeUtil.createNewRomanText('2b', -a + 8,
        b / 2, 0, '#FF991B', 0.15);

      this.text[2] = ThreeUtil.createNewRomanText('c', (-c + 0) / 3,
        10, 0, '#3FCCCF', 0.15);

      this.text[3] = ThreeUtil.createNormalText('A', (a + 5), (b + 10), 0, this.color, 0.15);
      this.text[4] = ThreeUtil.createNormalText('B', -(a + 10), -(b + 5), 0, this.color, 0.15);
      this.text[5] = ThreeUtil.createNormalText('C', -(a + 2), (b + 15), 0, this.color, 0.15);
      this.text[6] = ThreeUtil.createNormalText('D', -(a + 2), (b + 10), 0, this.color, 0.15);

      this.dashLine[0].add(this.text[3]);
      this.dashLine[3].add(this.text[4]);
      this.dashLine[1].add(this.text[5]);
      this.dashLine[2].add(this.text[6]);

      this.dashLine[1].add(this.text[0]);
      this.dashLine[2].add(this.text[1]);
      this.solidLine[0].add(this.text[2]);

      this.obj1.add(this.dashLine[0]);
      this.obj1.add(this.dashLine[1]);
      this.obj1.add(this.dashLine[2]);
      this.obj1.add(this.dashLine[3]);
      this.obj1.add(this.solidLine[0]);

    }

    //y轴绘制abc线段
    drawLineSegmentOnYAxis(a: number, b: number, c: number) {

    //上虚线2a
    this.dashLine[4] = this.colorLine.createLine({
      startPoint: new THREE.Vector3(-b, a, 0),
      endPoint: new THREE.Vector3(b, a, 0),
      color: '#FF991B',
      dashLine: true,
      gapSize: 2,
      dashSize: 3,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    this.dashLine[5] = this.dashLine[4].clone();
    this.dashLine[5].rotateX(Math.PI);

    //左虚线2b
    this.dashLine[6] = this.colorLine.createLine({
      startPoint: new THREE.Vector3(-b, a, 0),
      endPoint: new THREE.Vector3(-b, -a, 0),
      color: '#D734FF',
      dashLine: true,
      gapSize: 2,
      dashSize: 3,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    this.dashLine[7] = this.dashLine[6].clone();
    this.dashLine[7].rotateY(Math.PI);

    //实线c
    this.solidLine[3] = this.colorLine.createLine({
      startPoint: new THREE.Vector3(0, 0, 0),
      endPoint: new THREE.Vector3(0, c, 0),
      color: '#3FCCCF',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    this.text[7] = ThreeUtil.createNewRomanText('2b', b / 2,
      a, 0, '#FF991B', 0.15);

    this.text[8] = ThreeUtil.createNewRomanText('2a', -b + 8,
      -a / 2, 0, '#D734FF', 0.15);

    this.text[9] = ThreeUtil.createNewRomanText('c', -5,
      c / 2, 0, '#3FCCCF', 0.15);

    this.text[10] = ThreeUtil.createNormalText('A', (b + 5), (a + 10), 0, this.color, 0.15);
    this.text[11] = ThreeUtil.createNormalText('B', -(b + 10), -(a + 5), 0, this.color, 0.15);
    this.text[12] = ThreeUtil.createNormalText('C', -(b + 2), (a + 15), 0, this.color, 0.15);
    this.text[13] = ThreeUtil.createNormalText('D', -(b + 2), (a + 10), 0, this.color, 0.15);

    this.dashLine[4].add(this.text[10]);
    this.dashLine[7].add(this.text[11]);
    this.dashLine[5].add(this.text[12]);
    this.dashLine[6].add(this.text[13]);

    this.dashLine[5].add(this.text[7]);
    this.dashLine[6].add(this.text[8]);
    this.solidLine[3].add(this.text[9]);

    this.obj2.add(this.dashLine[4]);
    this.obj2.add(this.dashLine[5]);
    this.obj2.add(this.dashLine[6]);
    this.obj2.add(this.dashLine[7]);
    this.obj2.add(this.solidLine[3]);

  }

    //x轴绘制MF1和MF2线段
    drawMoveLineSegementOnXAxis(F1x: number, F1y: number, Mx: number, My: number, F2x: number, F2y: number) {

        //实线MF1
        this.solidLine[1] = this.colorLine.createLine({
          startPoint: new THREE.Vector3(F1x, F1y, 0),
          endPoint: new THREE.Vector3(Mx, My, 0),
          color: '#0199FF',
          dashLine: false,
          lineWidth: 1000,
          lineWidthScale: 1 / 500
        });

        //实线MF2
      this.solidLine[2] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(F2x, F2y, 0),
        endPoint: new THREE.Vector3(Mx, My, 0),
        color: '#FF4747',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.obj1.add(this.solidLine[1]);
      this.obj1.add(this.solidLine[2]);
    }

    //y轴绘制MF1和MF2线段
    drawMoveLineSegementOnYAxis(F1x: number, F1y: number, Mx: number, My: number, F2x: number, F2y: number) {

    //实线MF1
    this.solidLine[4] = this.colorLine.createLine({
      startPoint: new THREE.Vector3(F1x, F1y, 0),
      endPoint: new THREE.Vector3(Mx, My, 0),
      color: '#0199FF',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    //实线MF2
    this.solidLine[5] = this.colorLine.createLine({
      startPoint: new THREE.Vector3(F2x, F2y, 0),
      endPoint: new THREE.Vector3(Mx, My, 0),
      color: '#FF4747',
      dashLine: false,
      lineWidth: 1000,
      lineWidthScale: 1 / 500
    });

    this.obj2.add(this.solidLine[4]);
    this.obj2.add(this.solidLine[5]);
  }

    //x轴拖动事件
    bindEventOnXAxis() {

      //左焦点F1
      const dragControls = new dragcontrols([this.F1AreaOnX], this.camera, this.renderer.domElement);

      dragControls.addEventListener('dragstart', () => {
          this.controls.enabled = false;
      });

      dragControls.addEventListener('drag', () => {

            //限定F1焦点的拖动范围
            this.F1AreaOnX.position.y = 0;
            this.F1AreaOnX.position.x = Math.round(this.F1AreaOnX.position.x / 10) * 10;
            this.F1AreaOnX.position.x = this.F1AreaOnX.position.x <= -40 ? this.F1AreaOnX.position.x : -40;
            this.F1AreaOnX.position.x = this.F1AreaOnX.position.x >= -70 ? this.F1AreaOnX.position.x : -70;
            this.F2AreaOnX.position.x = -this.F1AreaOnX.position.x;
            this.c = Math.abs(this.F1AreaOnX.position.x);
            this.a = this.c - 20;
            this.b = Math.abs(Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.a, 2))));

            this.mergeCodeOnXAxis(this.a, this.b, this.c);
      });

      dragControls.addEventListener('dragend', () => {
           this.controls.enabled = true;
      });

      //右焦点F2
      const dragControls2 = new dragcontrols([this.F2AreaOnX], this.camera, this.renderer.domElement);
      dragControls2.addEventListener('dragstart', () => {
           this.controls.enabled = false;
      });

      dragControls2.addEventListener('drag', () => {
          //限定F2焦点的拖动范围
          this.F2AreaOnX.position.y = 0;
          this.F2AreaOnX.position.x = Math.round(this.F2AreaOnX.position.x / 10) * 10;
          this.F2AreaOnX.position.x = this.F2AreaOnX.position.x <= 70 ? this.F2AreaOnX.position.x : 70;
          this.F2AreaOnX.position.x = this.F2AreaOnX.position.x >= 40 ? this.F2AreaOnX.position.x : 40;
          this.F1AreaOnX.position.x = -this.F2AreaOnX.position.x;
          this.c = Math.abs(this.F2AreaOnX.position.x);
          this.a = this.c - 20;
          this.b = Math.abs(Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.a, 2))));

          this.mergeCodeOnXAxis(this.a, this.b, this.c);
      });

      dragControls2.addEventListener('dragend', () => {
          this.controls.enabled = true;
      });

      //M点
      const dragControls3 = new dragcontrols([this.MAreaOnX], this.camera, this.renderer.domElement);

      dragControls3.addEventListener('dragstart', () => {
        this.controls.enabled = false;
      });

      dragControls3.addEventListener('drag', () => {

        //限定M点的拖动轨迹
        const k = Math.pow(this.a, 2) + (Math.pow(this.a, 2) / Math.pow(this.b, 2)) * Math.pow(this.MAreaOnX.position.y, 2);
        this.MAreaOnX.position.x = Math.sqrt(k);

        //删除重绘MF1及MF2
        this.delete(this.obj1, this.solidLine[1], this.solidLine[2]);
        this.drawMoveLineSegementOnXAxis(this.F1AreaOnX.position.x, this.F1AreaOnX.position.y, this.MAreaOnX.position.x,
          this.MAreaOnX.position.y, this.F2AreaOnX.position.x, this.F2AreaOnX.position.y);

      });

      dragControls3.addEventListener('dragend', () => {
        this.controls.enabled = true;
      });

    }

    //y轴拖动事件
    bindEventOnYAxis() {

        //下焦点F1
        const dragControls = new dragcontrols([this.F1AreaOnY], this.camera, this.renderer.domElement);

        dragControls.addEventListener('dragstart', () => {
          this.controls.enabled = false;
        });

        dragControls.addEventListener('drag', () => {

          //限定F1焦点的拖动范围
          this.F1AreaOnY.position.x = 0;
          this.F1AreaOnY.position.y = Math.round(this.F1AreaOnY.position.y / 10) * 10;
          this.F1AreaOnY.position.y = this.F1AreaOnY.position.y <= -40 ? this.F1AreaOnY.position.y : -40;
          this.F1AreaOnY.position.y = this.F1AreaOnY.position.y >= -70 ? this.F1AreaOnY.position.y : -70;
          this.F2AreaOnY.position.y = -this.F1AreaOnY.position.y;
          this.f = Math.abs(this.F1AreaOnY.position.y);
          this.d = this.f - 20;
          this.e = Math.abs(Math.sqrt((Math.pow(this.f, 2) - Math.pow(this.d, 2))));

          this.mergeCodeOnYAxis(this.d, this.e, this.f);
        });

        dragControls.addEventListener('dragend', () => {
          this.controls.enabled = true;
        });

        //上焦点F2
        const dragControls2 = new dragcontrols([this.F2AreaOnY], this.camera, this.renderer.domElement);
        dragControls2.addEventListener('dragstart', () => {
          this.controls.enabled = false;
        });

        dragControls2.addEventListener('drag', () => {
          //限定F2焦点的拖动范围
          this.F2AreaOnY.position.x = 0;
          this.F2AreaOnY.position.y = Math.round(this.F2AreaOnY.position.y / 10) * 10;
          this.F2AreaOnY.position.y = this.F2AreaOnY.position.y <= 70 ? this.F2AreaOnY.position.y : 70;
          this.F2AreaOnY.position.y = this.F2AreaOnY.position.y >= 40 ? this.F2AreaOnY.position.y : 40;
          this.F1AreaOnY.position.y = -this.F2AreaOnY.position.y;
          this.f = Math.abs(this.F2AreaOnY.position.y);
          this.d = this.f - 20;
          this.e = Math.abs(Math.sqrt((Math.pow(this.f, 2) - Math.pow(this.d, 2))));

          this.mergeCodeOnYAxis(this.d, this.e, this.f);
        });

        dragControls2.addEventListener('dragend', () => {
          this.controls.enabled = true;
        });

        //M点
        const dragControls3 = new dragcontrols([this.MAreaOnY], this.camera, this.renderer.domElement);

        dragControls3.addEventListener('dragstart', () => {
          this.controls.enabled = false;
        });

        dragControls3.addEventListener('drag', () => {

          //限定M点的拖动轨迹
          const k = ((Math.pow(this.d, 2)) / Math.pow(this.e, 2)) * Math.pow(this.MAreaOnY.position.x, 2) + Math.pow(this.d, 2);
          this.MAreaOnY.position.y = Math.sqrt(k);

          //删除重绘MF1及MF2
          this.delete(this.obj2, this.solidLine[4], this.solidLine[5]);
          this.drawMoveLineSegementOnYAxis(this.F1AreaOnY.position.x, this.F1AreaOnY.position.y, this.MAreaOnY.position.x,
            this.MAreaOnY.position.y, this.F2AreaOnY.position.x, this.F2AreaOnY.position.y);

        });

        dragControls3.addEventListener('dragend', () => {
          this.controls.enabled = true;
        });

  }

    //x轴拖拽合并代码
    mergeCodeOnXAxis(a: number, b: number, c: number) {
      //改变M点位置
      const k = Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(this.MAreaOnX.position.y, 2);
      this.MAreaOnX.position.x = Math.sqrt(k);

      //删除重绘MF1及MF2
      this.delete(this.obj1, this.solidLine[1], this.solidLine[2]);
      this.drawMoveLineSegementOnXAxis(this.F1AreaOnX.position.x, this.F1AreaOnX.position.y, this.MAreaOnX.position.x,
        this.MAreaOnX.position.y, this.F2AreaOnX.position.x, this.F2AreaOnX.position.y);

      //删除重绘线段
      this.delete(this.obj1, this.dashLine[0], this.dashLine[1], this.dashLine[2], this.dashLine[3], this.solidLine[0]);
      this.drawLineSegmentOnXAxis(a, b, c);

      switch (c) {
        case 50:
          this.hideAndShowLineOnXAxis(true, false, false, false);
          break;
        case 40:
          this.hideAndShowLineOnXAxis(false, true, false, false);
          break;
        case 60:
          this.hideAndShowLineOnXAxis(false, false, true, false);
          break;
        case 70:
          this.hideAndShowLineOnXAxis(false, false, false, true);
          break;
      }
    }

    mergeCodeOnYAxis(d: number, e: number, f: number) {
      //改变M点位置
      const k = ((Math.pow(d, 2)) / Math.pow(e, 2)) * Math.pow(this.MAreaOnY.position.x, 2) + Math.pow(d, 2);
      this.MAreaOnY.position.y = Math.sqrt(k);

      //删除重绘MF1及MF2
      this.delete(this.obj2, this.solidLine[4], this.solidLine[5]);
      this.drawMoveLineSegementOnYAxis(this.F1AreaOnY.position.x, this.F1AreaOnY.position.y, this.MAreaOnY.position.x,
        this.MAreaOnY.position.y, this.F2AreaOnY.position.x, this.F2AreaOnY.position.y);

      //删除重绘双曲线及线段
      this.delete(this.obj2, this.dashLine[4], this.dashLine[5], this.dashLine[6], this.dashLine[7], this.solidLine[3]);
      this.drawLineSegmentOnYAxis(d, e, f);
      switch (f) {
        case 50:
          this.hideAndShowLineOnYAxis(true, false, false, false);
          break;
        case 40:
          this.hideAndShowLineOnYAxis(false, true, false, false);
          break;
        case 60:
          this.hideAndShowLineOnYAxis(false, false, true, false);
          break;
        case 70:
          this.hideAndShowLineOnYAxis(false, false, false, true);
          break;
      }
    }


    //删除线条和文字并重绘
    //sceneOption:  前面创建的容器obj1和obj2
    //obj1, obj2, ojb3... 需要删除的对象
    delete(sceneOption?: any, obj1?: any, obj2?: any, obj3?: any, obj4?: any, obj5?: any) {
          if (obj1) {
            obj1.geometry.dispose();
            obj1.material.dispose();
            (sceneOption as any).remove(obj1);
          }

          if (obj2) {
            obj2.geometry.dispose();
            obj2.material.dispose();
            (sceneOption as any).remove(obj2);
          }

          if (obj3) {
            obj3.geometry.dispose();
            obj3.material.dispose();
            (sceneOption as any).remove(obj3);
          }

          if (obj4) {
            obj4.geometry.dispose();
            obj4.material.dispose();
            (sceneOption as any).remove(obj4);
          }

          if (obj5) {
            obj5.geometry.dispose();
            obj5.material.dispose();
            (sceneOption as any).remove(obj5);
          }
    }

    reset() {

        this.a = 30;
        this.b = 40;
        this.c = 50;

        this.d = 30;
        this.e = 40;
        this.f = 50;

        this.obj1.visible = true;
        this.obj2.visible = false;
        this.F1AreaOnX.position.set(-50, 0, 0);
        this.F2AreaOnX.position.set(50, 0, 0);
        this.MAreaOnX.position.set(35, Math.sqrt((
           (Math.pow(40, 2)) / Math.pow(30, 2)) * Math.pow(35, 2) - Math.pow(40, 2)), 0);

        this.hideAndShowLineOnXAxis(true, false, false, false);
        this.hideAndShowLineOnYAxis(true, false, false, false);

        this.delete(this.obj1, this.solidLine[1], this.solidLine[2]);
        this.delete(this.obj1, this.dashLine[0], this.dashLine[1], this.dashLine[2], this.dashLine[3], this.solidLine[0]);

        this.drawLineSegmentOnXAxis(30, 40, 50);
        this.drawMoveLineSegementOnXAxis(-50, 0, 35, Math.sqrt((
          (Math.pow(40, 2)) / Math.pow(30, 2)) * Math.pow(35, 2) - Math.pow(40, 2)), 50, 0);

        this.F1AreaOnY.position.set(0, -50, 0);
        this.F2AreaOnY.position.set(0, 50, 0);
        this.MAreaOnY.position.set(Math.sqrt(Math.pow(40, 2) / Math.pow(30, 2)
          * Math.pow(35, 2) - Math.pow(40, 2)), 35, 0);

        this.delete(this.obj2, this.solidLine[4], this.solidLine[5]);
        this.delete(this.obj2, this.dashLine[4], this.dashLine[5], this.dashLine[6], this.dashLine[7], this.solidLine[3]);

        this.drawLineSegmentOnYAxis(30, 40, 50);
        this.drawMoveLineSegementOnYAxis(0, -50, Math.sqrt((Math.pow(40, 2) / Math.pow(30 , 2)) *
          Math.pow(35, 2) - Math.pow(40 , 2)), 35, 0, 50);
    }

}




