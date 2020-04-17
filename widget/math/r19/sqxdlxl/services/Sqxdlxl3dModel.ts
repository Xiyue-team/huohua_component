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

export class Sqxdlxl3dModel extends ThreeBase {

    colorLine = new Line();
    private controls: any;
    color = '#000';
    img: any = [];
    text: any = [];
    solidLine: any = [];

    leftEllipse: any;
    rightEllipse: any;
    topEllipse: any;
    bottomEllipse: any;

    //x轴点
    curvePointArrayOnXAxis: any = [];

    //x轴拖动点
    F1Point: any;
    F2Point: any;

    obj1 = new THREE.Group();
    obj2 = new THREE.Group();

    //x轴 a,b,c
    a = 30;
    b = 40;
    c = 50;


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
        this.drawLineSegmentOnXAxis(30, 40, 50);
        this.createEllipseOnXAxis(30, 40);

        this.addDragPointOnXAxis();
        this.bindEventOnXAxis();
        this.obj2.visible = false;
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

    //绘制x轴上的双曲线
    createEllipseOnXAxis(a: number, b: number) {
        a = 30;
      for (let i = -110; i <= 110; i += 2) {
          const x = Math.sqrt(Math.pow(a, 2) + (Math.pow(a, 2) / Math.pow(b, 2)) * Math.pow(i, 2));
          this.curvePointArrayOnXAxis.push(new THREE.Vector3(x, i, 0));
      }
      this.rightEllipse = ThreeUtil.createTube(this.curvePointArrayOnXAxis, 0.5, 500, this.color);
      this.leftEllipse = this.rightEllipse.clone();
      this.leftEllipse.rotateY(Math.PI);
      this.obj1.add(this.rightEllipse);
      this.obj1.add(this.leftEllipse);
      this.scene.add(this.obj1);
    }

    //X轴添加拖动点图片及文字
    addDragPointOnXAxis() {
        //F1
        this.img[0] = ThreeUtil.createImg(9, 9, tuodongdian, 0, 0, 1);
        //F2
        this.img[1] = this.img[0].clone();

        const textF1 = ThreeUtil.createNewRomanText('F', -3, 12, 0, this.color, 0.15);
        const text1 = ThreeUtil.createNormalText('₁', 0, 11, 0, this.color, 0.15);
        const textF2 = ThreeUtil.createNewRomanText('F', 3, 12, 0, this.color, 0.15);
        const text2 = ThreeUtil.createNormalText('₂', 6, 11, 0, this.color, 0.15);
        this.img[0].add(textF1);
        this.img[0].add(text1);
        this.img[1].add(textF2);
        this.img[1].add(text2);

        //增大拖动点识别区域
        this.F1Point = ThreeUtil.createPoint(10, '#fff', -50, 0, 0.001);
        this.F2Point = ThreeUtil.createPoint(10, '#fff', 50, 0, 0.001);
        this.F1Point.add(this.img[0]);
        this.F2Point.add(this.img[1]);
        this.obj1.add(this.F1Point);
        this.obj1.add(this.F2Point);
    }


    //x轴绘制abc线段
    drawLineSegmentOnXAxis(a: number, b: number, c: number) {
      //实线a
      this.solidLine[0] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(-30, 0, 0),
        color: '#FF991B',
        dashLine: false,
        gapSize: 2,
        dashSize: 3,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      //实线b
      this.solidLine[1] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(0, b, 0),
        color: '#D734FF',
        dashLine: false,
        gapSize: 2,
        dashSize: 3,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      //实线c
      this.solidLine[2] = this.colorLine.createLine({
        startPoint: new THREE.Vector3(-30, 0, 0),
        endPoint: new THREE.Vector3(0, b, 0),
        color: '#40BEFF',
        dashLine: false,
        lineWidth: 1000,
        lineWidthScale: 1 / 500
      });

      this.text[0] = ThreeUtil.createNewRomanText('a', -15, 8, 0, '#FF991B', 0.15);
      this.text[1] = ThreeUtil.createNewRomanText('b',  5, b / 2, 0, '#D734FF', 0.15);
      this.text[2] = ThreeUtil.createNewRomanText('c', -20, (b + 5) / 2, 0, '#3FCCCF', 0.15);
      this.text[3] = ThreeUtil.createNewRomanText('M',  b / 7, (b + 4), 0, this.color, 0.15);

      this.solidLine[0].add(this.text[0]);
      this.solidLine[1].add(this.text[1]);
      this.solidLine[2].add(this.text[2]);
      this.solidLine[2].add(this.text[3]);
      
      this.obj1.add(this.solidLine[0]);
      this.obj1.add(this.solidLine[1]);
      this.obj1.add(this.solidLine[2]);
      
    }


    //x轴拖动事件
    bindEventOnXAxis() {

      //左焦点F1
      const dragControls = new dragcontrols([this.F1Point], this.camera, this.renderer.domElement);

      dragControls.addEventListener('dragstart', () => {
          this.controls.enabled = false;
      });

      dragControls.addEventListener('drag', () => {

            //限定F1焦点的拖动范围
            this.F1Point.position.y = 0;
            this.F1Point.position.x = this.F1Point.position.x <= -40 ? this.F1Point.position.x : -40;
            this.F1Point.position.x = this.F1Point.position.x >= -90 ? this.F1Point.position.x : -90;
            this.F2Point.position.x = -this.F1Point.position.x;
            this.c = Math.abs(this.F1Point.position.x);
            this.b = Math.abs(Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.a, 2))));

            this.mergeCodeOnXAxis(this.a, this.b, this.c);
      });

      dragControls.addEventListener('dragend', () => {
           this.controls.enabled = true;
      });

      //右焦点F2
      const dragControls2 = new dragcontrols([this.F2Point], this.camera, this.renderer.domElement);
      dragControls2.addEventListener('dragstart', () => {
           this.controls.enabled = false;
      });

      dragControls2.addEventListener('drag', () => {
          //限定F2焦点的拖动范围
          this.F2Point.position.y = 0;
          this.F2Point.position.x = this.F2Point.position.x <= 90 ? this.F2Point.position.x : 90;
          this.F2Point.position.x = this.F2Point.position.x >= 40 ? this.F2Point.position.x : 40;
          this.F1Point.position.x = -this.F2Point.position.x;
          this.c = Math.abs(this.F2Point.position.x);
          this.b = Math.abs(Math.sqrt((Math.pow(this.c, 2) - Math.pow(this.a, 2))));

          this.mergeCodeOnXAxis(this.a, this.b, this.c);
      });

      dragControls2.addEventListener('dragend', () => {
          this.controls.enabled = true;
      });

    }


    //x轴拖拽合并代码
    mergeCodeOnXAxis(a: number, b: number, c: number) {
      //删除重绘双曲线及线段
      this.delete(this.obj1, this.solidLine[0], this.solidLine[1], this.solidLine[2]);
      this.drawLineSegmentOnXAxis(a, b, c);
      
      // 实时更新左侧表格里的数据
      (window as any).viewHandler.viewModel.$data.a = 3;
      (window as any).viewHandler.viewModel.$data.b = this.numToFloat(b);
      (window as any).viewHandler.viewModel.$data.c = this.numToFloat(c);
      
      this.delete(this.obj1, this.leftEllipse, this.rightEllipse);
      this.createEllipseOnXAxis(a, b);
    }

    // 将值变为带两位小数的浮点数
    numToFloat(val: number) {
        const n = val / 10;
        return n.toFixed(2);
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

          //清空点数组
          this.curvePointArrayOnXAxis = [];
    }

    reset() {

        this.b = 40;
        this.c = 50;

        this.obj1.visible = true;
        this.obj2.visible = false;
        this.F1Point.position.set(-50, 0, 0);
        this.F2Point.position.set(50, 0, 0);

        this.delete(this.obj1, this.solidLine[0], this.solidLine[1], this.solidLine[2]);
        this.delete(this.obj1, this.leftEllipse, this.rightEllipse);

        this.drawLineSegmentOnXAxis(30, 40, 50);
        this.createEllipseOnXAxis(30, 40);

        this.delete(this.obj2, this.topEllipse, this.bottomEllipse);

    }

}




