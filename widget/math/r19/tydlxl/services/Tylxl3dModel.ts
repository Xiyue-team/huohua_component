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

export class Tylxl3dModel extends ThreeBase {

    colorLine: any;
    private controls: any;
    color = '#000';
    img: any = [];
    text: any = [];
    solidLine: any = [];

    xAxisPoint = [-60, 0, 0];
    yAxisPoint = [0, 80, 0];
    originalPoint = [0, 0, 0];

    topEllipse: any;
    bottomEllipse: any;
    curvePointArray: any = [];

    F1Area: any;
    F2Area: any;

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
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createAxis();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.addDragPoint();
        this.createDefaultSegments();
        this.createEllipse(80);
        this.drawLineSegment(this.xAxisPoint, this.yAxisPoint, this.originalPoint);
        this.bindEvent();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }

    initLight() {

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

    //绘制椭圆
    createEllipse(yR: number) {
      for (let i = -100; i <= 100; i += 0.5) {
          const y = (Math.pow(yR, 2) - (Math.pow(yR, 2) / Math.pow(100, 2)) * Math.pow(i, 2));
          this.curvePointArray.push(new THREE.Vector3(i, Math.sqrt(y), 0));
      }
      this.topEllipse = ThreeUtil.createTube(this.curvePointArray, 0.5, 500, this.color);
      this.bottomEllipse = this.topEllipse.clone();
      this.bottomEllipse.rotateX(Math.PI);
      this.scene.add(this.bottomEllipse);
      this.scene.add(this.topEllipse);
    }

    //添加拖动点图片及文字
    addDragPoint() {
        this.img[0] = ThreeUtil.createImg(9, 9, tuodongdian, 0, 0, 1);
        this.img[1] = ThreeUtil.createImg(9, 9, tuodongdian, 0, 0, 1);
        const textF1 = ThreeUtil.createNewRomanText('F', 0, -5, 0, this.color, 0.15);
        const text1 = ThreeUtil.createNormalText('₁', 3, -6, 0, this.color, 0.15);
        const textF2 = ThreeUtil.createNewRomanText('F', 0, -5, 0, this.color, 0.15);
        const text2 = ThreeUtil.createNormalText('₂', 3, -6, 0, this.color, 0.15);

        this.img[0].add(textF1);
        this.img[0].add(text1);
        this.img[1].add(textF2);
        this.img[1].add(text2);

        //增大拖动点识别区域
        this.F1Area = ThreeUtil.createPoint(10, '#fff', -60, 0, 0.001);
        this.F2Area = ThreeUtil.createPoint(10, '#fff', 60, 0, 0.001);
        this.F1Area.add(this.img[0]);
        this.F2Area.add(this.img[1]);
        this.scene.add(this.F1Area);
        this.scene.add(this.F2Area);
    }

    //绘制默认长轴线段
    createDefaultSegments() {

      this.colorLine = new Line();
      const defalutLine = this.colorLine.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(100, 0, 0),
        color: '#F9B873',
        dashLine: false,
        lineWidth: 1500,
        lineWidthScale: 1 / 500
      });
      this.scene.add(defalutLine);
    }

    //绘制abc线段
    drawLineSegment(xAxisPoint: any, yAxisPoint: any, originalPoint: any) {

      this.solidLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(xAxisPoint[0], xAxisPoint[1], xAxisPoint[2]),
        endPoint: new THREE.Vector3(yAxisPoint[0], yAxisPoint[1], yAxisPoint[2]),
        color: '#F9B873',
        dashLine: false,
        lineWidth: 1500,
        lineWidthScale: 1 / 500
      });
      this.solidLine[1] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(yAxisPoint[0], yAxisPoint[1], yAxisPoint[2]),
        endPoint: new THREE.Vector3(originalPoint[0], originalPoint[1], originalPoint[2]),
        color: '#0199FF',
        dashLine: false,
        lineWidth: 1500,
        lineWidthScale: 1 / 500
      });
      this.solidLine[2] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(xAxisPoint[0], xAxisPoint[1], xAxisPoint[2]),
        endPoint: new THREE.Vector3(originalPoint[0], originalPoint[1], originalPoint[2]),
        color: '#FF4747',
        dashLine: false,
        lineWidth: 1500,
        lineWidthScale: 1 / 500
      });

      this.text[0] = ThreeUtil.createNewRomanText('a', (xAxisPoint[0] + yAxisPoint[0]) / 2 - 10,
        (xAxisPoint[1] + yAxisPoint[1]) / 2, 0, '#F9B873', 0.15);
      this.text[1] = ThreeUtil.createNewRomanText('b', (yAxisPoint[0] + originalPoint[0]) / 2 - 5,
        (yAxisPoint[1] + originalPoint[1]) / 2, 0, '#0199FF', 0.15);
      this.text[2] = ThreeUtil.createNewRomanText('c', (xAxisPoint[0] + originalPoint[0]) / 2,
        (xAxisPoint[1] + originalPoint[1]) / 2, 0, '#FF4747', 0.15);

      this.solidLine[0].add(this.text[0]);
      this.solidLine[1].add(this.text[1]);
      this.solidLine[2].add(this.text[2]);

      this.scene.add(this.solidLine[0]);
      this.scene.add(this.solidLine[1]);
      this.scene.add(this.solidLine[2]);
    }

    bindEvent() {

      //左焦点F1
      const dragControls = new dragcontrols([this.F1Area], this.camera, this.renderer.domElement);
      let b: number;
      dragControls.addEventListener('dragstart', () => {
          this.controls.enabled = false;
      });

      dragControls.addEventListener('drag', () => {
            this.F1Area.position.y = 0;
            this.F1Area.position.x = Math.round(this.F1Area.position.x / 10) * 10;
            this.F1Area.position.x = this.F1Area.position.x <= -10 ? this.F1Area.position.x : -10;
            this.F1Area.position.x = this.F1Area.position.x >= -90 ? this.F1Area.position.x : -90;
            this.F2Area.position.x = -this.F1Area.position.x;

            this.deleteAndRedraw(this.solidLine[0], this.solidLine[1], this.solidLine[2]);
            this.deleteAndRedraw(this.topEllipse, this.bottomEllipse);
            b = Math.abs(Math.sqrt((Math.pow(100, 2) - Math.pow(this.F1Area.position.x, 2))));
            this.drawLineSegment([this.F1Area.position.x, 0, 0], [0, b, 0], this.originalPoint);
            this.createEllipse(b);

           (window as any).viewHandler.viewModel.$data.displayE = Math.abs(this.F1Area.position.x) / 100;
           (window as any).viewHandler.viewModel.$data.displayK = Number.parseFloat((b / 100).toFixed(2));
      });

      dragControls.addEventListener('dragend', () => {
           this.controls.enabled = true;
      });

      //右焦点F2
      const dragControls2 = new dragcontrols([this.F2Area], this.camera, this.renderer.domElement);
      let c: number;
      dragControls2.addEventListener('dragstart', () => {
           this.controls.enabled = false;
      });

      dragControls2.addEventListener('drag', () => {
        this.F2Area.position.y = 0;
        this.F2Area.position.x = Math.round(this.F2Area.position.x / 10) * 10;
        this.F2Area.position.x = this.F2Area.position.x <= 90 ? this.F2Area.position.x : 90;
        this.F2Area.position.x = this.F2Area.position.x >= 10 ? this.F2Area.position.x : 10;
        this.F1Area.position.x = -this.F2Area.position.x;

        this.deleteAndRedraw(this.solidLine[0], this.solidLine[1], this.solidLine[2]);
        this.deleteAndRedraw(this.topEllipse, this.bottomEllipse);
        c = Math.abs(Math.sqrt((Math.pow(100, 2) - Math.pow(this.F2Area.position.x, 2))));
        this.drawLineSegment([this.F1Area.position.x, 0, 0], [0, c, 0], this.originalPoint);
        this.createEllipse(c);

        (window as any).viewHandler.viewModel.$data.displayE = this.F2Area.position.x / 100;
        (window as any).viewHandler.viewModel.$data.displayK = Number.parseFloat((c / 100).toFixed(2));
      });

      dragControls2.addEventListener('dragend', () => {
          this.controls.enabled = true;
      });

    }

    //删除线条和文字并重绘
    deleteAndRedraw(obj1?: any, obj2?: any, obj3?: any) {
          if (obj1) {
            obj1.geometry.dispose();
            obj1.material.dispose();
            this.scene.remove(obj1);
          }

          if (obj2) {
            obj2.geometry.dispose();
            obj2.material.dispose();
            this.scene.remove(obj2);
          }

          if (obj3) {
            obj3.geometry.dispose();
            obj3.material.dispose();
            this.scene.remove(obj3);
          }

          this.curvePointArray = [];
    }

    reset() {
      this.deleteAndRedraw(this.solidLine[0], this.solidLine[1], this.solidLine[2]);
      this.deleteAndRedraw(this.topEllipse, this.bottomEllipse);
      this.drawLineSegment(this.xAxisPoint, this.yAxisPoint, this.originalPoint);
      this.deleteAndRedraw(this.topEllipse, this.bottomEllipse);
      this.createEllipse(80);
      this.F1Area.position.set(-60, 0, 0);
      this.F2Area.position.set(60, 0, 0);
      (window as any).viewHandler.viewModel.$data.displayE = 0.6;
      (window as any).viewHandler.viewModel.$data.displayK = 0.8;
      (window as any).viewHandler.viewModel.$data.color = false;
      (window as any).viewHandler.viewModel.$data.showFormula = false;
    }

}




