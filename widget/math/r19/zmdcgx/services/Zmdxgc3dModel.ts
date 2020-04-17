import * as THREE from 'three';
import { WebGLRenderer, PerspectiveCamera } from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { CircleLineUtils } from '../services/CircleLineUtils';
import { Object3D } from 'three/three-core';

import * as l1 from '../sub_static/kehuadongtishi.png';
import * as l2 from '../sub_static/p.png';
import * as l3 from '../sub_static/p2.png';
import * as l4 from '../sub_static/a22.png';
import * as l5 from '../sub_static/M.png';
import * as l6 from '../sub_static/N.png';



export class Zmdxgc3dModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private controls: any;
    private interact: any;
    private circleLine: any;
    private CircleLineUtil = new CircleLineUtils();
    private line1: any;
    private arc: THREE.Mesh;
    private rotatePoint3: THREE.Mesh;
    // dashline: any;
    // texty: any;
    line2: any;
    line3: any;
    line4: any;
    line5: any;
    line6: any;
    line7: any;
    line8: any;
    line9: any;
    startAngle: any;
    angle: any;
    pointx: any;
    pointy: any;
    startAngle2: any;
    angle2: any;
    point2x: any;
    point2y: any;
    textP2: any;
    textα2: any;
    textα3: any;
    textM: any;
    textN: any;
    private textα: any;
    private rotatePoint: THREE.Mesh;
    private sliderControlLine: any;
    private lineHelper = new Line();
    private  img: any;
    private textP: any;
    lineVisible = false;

     private render = () => {
        requestAnimationFrame( this.render );
        this.controls.update();

       this.renderer.render( this.scene,  this.camera );
    }

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
        this.init();
    }

    init() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.init3dMOdel();
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
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    initControl(): void {
       this.controls = new TrackballControls(this.camera, this.renderer.domElement);
       this.controls.rotateSpeed = 3;
       this.controls.zoomSpeed = 1.2;
       this.controls.panSpeed = 0.8;
       this.controls.noZoom = true;
       this.controls.noPan = true;
       this.controls.noRotate = true;
       this.controls.staticMoving = true;
       this.controls.dynamicDampingFactor = 0.3;
  }

    /**
     * 初始化光源
     */
    initLight(): void {

    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    init3dMOdel() {
      this.createAxis();
      this.createLine();
      this.createaidLine();
      this.createdarg();
      this.createtext();
      this.createArcLine();
      this.hide();
    }

    //创建一个坐标系
    createAxis() {
      const axis = AxisUtil.createAxis({
        isTicks: false,
        AxisXNumArray: ['', '', '', '', '1', '', '', '', '', ''],
      } as any);
      this.scene.add(axis);

      const text1 = ThreeUtil.createNormalText(`-1`, -55, 0, 0, '#000000');
      const text2 = ThreeUtil.createNormalText(`1`, -5, 58, 0, '#000000');
      const text3 = ThreeUtil.createNormalText(`1`, 55, 0, 0, '#000000');
      const text4 = ThreeUtil.createNormalText(`-1`, -5, -50, 0, '#000000');
      this.scene.add(text1, text2, text3, text4);
    }

    //创建可转动的线和圆
    createLine() {
      this.circleLine = this.CircleLineUtil.addEllipseLine( 50, '#000000', 1, Math.PI * 2);
      this.scene.add(this.circleLine);
      //
      // this.dashline = this.lineHelper.createLine({
      //   startPoint: new THREE.Vector3(-80, -80, 0),
      //   endPoint: new THREE.Vector3(80, 80, 0),
      //   lineWidth: 800,
      //   color: '#000000',
      //   dashLine: true,
      //   dashSize: 1,
      //   gapSize: 2,
      //   lineWidthScale: 1 / 500,
      // });
      // this.scene.add(this.dashline);
      // this.dashline.visible = false;


      this.line1 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(80, 24, 0),
        lineWidth: 800,
        color: '#FF4B4B',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line1);

      this.line2 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(80, -24, 0),
        lineWidth: 800,
        color: '#BD1DE9',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line2);
      this.line2.visible = false;

      this.line3 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(24, 80, 0),
        lineWidth: 800,
        color: '#FF9D1E',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line3);
      this.line3.visible = false;

      this.line6 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(14.5, 48, 0),
        lineWidth: 800,
        color: '#4B84FF',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line6);

      this.line7 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(48, 14.5, 0),
        lineWidth: 800,
        color: '#4B84FF',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line7);
    }

    //创建可实时绘制的辅助线
    createaidLine() {
      this.line4 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(0, 47.5, 0),
        lineWidth: 800,
        color: '#FF4B4B',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line4);

      this.line5 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(47.5, 0, 0),
        lineWidth: 800,
        color: '#FF4B4B',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line5);

      this.line8 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 47.5, 0),
        endPoint: new THREE.Vector3(14.5, 47.5, 0),
        lineWidth: 800,
        color: '#5AEBD1',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line8);

      this.line9 = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(47.5, 0, 0),
        endPoint: new THREE.Vector3(47.5, 14.5, 0),
        lineWidth: 800,
        color: '#5AEBD1',
        lineWidthScale: 1 / 500,
      });
      this.scene.add(this.line9);
    }


    //创建文字
    createtext() {
      this.textα = ThreeUtil.createNewRomanText('α', 17, 3.7 , 0, '#000000', 0.15);
      this.rotatePoint3 = ThreeUtil.createPlane(0.01, 0.01, '#000000', 0);
      this.rotatePoint3.rotation.z = 8.5 * Math.PI / 180;
      this.rotatePoint3.add(this.textα);
      this.scene.add(this.rotatePoint3);

      // this.texty = ThreeUtil.createNewRomanText('y=x', 100, 79, 0, '#000000', 0.2);
      // this.scene.add(this.texty);
      // this.texty.visible = false;

      this.textP = ThreeUtil.createImg(17.4, 7.8, l2, 62, 9, 0);
      this.line1.add(this.textP);

      this.textP2 = ThreeUtil.createImg(21.4, 7.8, l3, 28, 55, 0);
      this.line6.add(this.textP2);

      this.textα2 = ThreeUtil.createImg(15, 14, l4, 33, 75, 0);
      this.line3.add(this.textα2);

      this.textα3 = ThreeUtil.createNewRomanText('-α', 81, -25 , 0, '#BD1DE9', 0.15);
      this.line2.add(this.textα3);

      this.textM = ThreeUtil.createImg(8, 8, l5, -10, 49, 0);
      this.scene.add(this.textM);

      this.textN = ThreeUtil.createImg(7, 8, l6, 48.5, -5, 0);
      this.scene.add(this.textN);

    }


    //创建弧
    createArcLine() {
      const geometry = new THREE.CircleBufferGeometry(10, 32, 0,  (17 * Math.PI / 180));
      const material = new THREE.MeshBasicMaterial({ transparent: true, color: 0xffaeae, opacity: 0.5 });
      this.arc = new THREE.Mesh(geometry, material);
      this.scene.add(this.arc);
    }

    //重新设置弧的大小
    resetArc(angle: number) {
      this.removeArc();
      const geometry = new THREE.CircleBufferGeometry(10, 32, 0, angle);
      const material = new THREE.MeshBasicMaterial({ transparent: true, color: 0xffaeae, opacity: 0.5 });
      this.arc = new THREE.Mesh(geometry, material);
      this.scene.add(this.arc);
    }

    //删除弧的方法
    removeArc() {
      this.scene.remove(this.arc);
      this.arc.geometry.dispose();
      (this.arc.material as any).dispose();
      this.arc = null;
    }

    //创建拖动事件
    createdarg() {
      const huadong = ThreeUtil.createPoint(50, '#000000', 80, 24, 0);
      this.img = ThreeUtil.createImg(15, 15, l1, 0, 0 );
      this.img.position.z = 10;
      huadong.position.z = 6;
      this.rotatePoint = ThreeUtil.createPoint(1, '#000000', 0, 0, 0);
      huadong.add(this.img);
      this.line1.add(huadong);
      this.rotatePoint.add(this.line1);
      this.sliderControlLine = new SliderControlLine(this.line1, huadong, this.rotatePoint, this.img);
      this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
      this.scene.add(this.rotatePoint);

      this.sliderControlLine.sliderPointMouseMoveCallback = () => {
        this.slidercontrol();
        this.drawline();

        this.pointy = Math.tan(this.angle) * this.pointx;
        //line9删除重绘
        this.removeLine(this.line9);
        this.line9 = this.drawLine({ x: this.pointx, y: this.pointy, z: 1 },
          { x: this.pointx, y: 0, z: 1 }, 800, '#5AEBD1');
        setTimeout( () => {
          this.scene.add(this.line9);
          this.line9.visible = this.lineVisible;
        } , 10);

        this.point2y = Math.tan(this.angle2) * this.point2x;
        // line8删除重绘
        this.removeLine(this.line8);
        this.line8 = this.drawLine({ x: this.point2x, y: this.point2y, z: 1 },
          { x: 0, y: this.point2y, z: 1 }, 800, '#5AEBD1');
        setTimeout( () => {
          this.scene.add(this.line8);
          this.line8.visible = this.lineVisible;
        } , 10);

        //line5删除重绘
        this.removeLine(this.line5);
        this.textN.position.x = this.pointx;
        this.line5 = this.drawLine({ x: 0, y: 0, z: 1 },
          { x: this.pointx, y: 0, z: 1 }, 800, '#FF4B4B');
        setTimeout( () => {
          this.scene.add(this.line5);
          this.line5.visible = this.lineVisible;
        } , 10);

        //line4删除重绘
        this.removeLine(this.line4);
        this.line4 = this.drawLine({ x: 0, y: 0, z: 1 },
          { x: 0, y: this.point2y, z: 1 }, 800, '#FF4B4B');
        this.textM.position.y = this.point2y;
        setTimeout( () => {
          this.scene.add(this.line4);
          this.line4.visible = this.lineVisible;
        } , 10);
      };

      this.sliderControlLine.sliderPointTouchMoveCallback = () => {
        this.slidercontrol();
        this.drawline();

        this.pointy = Math.tan(this.angle) * this.pointx;
        //line9删除重绘
        this.removeLine(this.line9, true);
        this.line9 = this.drawLine({ x: this.pointx, y: this.pointy, z: 1 },
          { x: this.pointx, y: 0, z: 1 }, 800, '#5AEBD1');
        this.scene.add(this.line9);
        this.line9.visible = this.lineVisible;

        this.point2y = Math.tan(this.angle2) * this.point2x;
        //line8删除重绘
        this.removeLine(this.line8, true);
        this.line8 = this.drawLine({ x: this.point2x, y: this.point2y, z: 1 },
          { x: 0, y: this.point2y, z: 1 }, 800, '#5AEBD1');
        this.scene.add(this.line8);
        this.line8.visible = this.lineVisible;

        //line5删除重绘
        this.removeLine(this.line5, true);
        this.line5 = this.drawLine({ x: 0, y: 0, z: 1 },
          { x: this.pointx, y: 0, z: 1 }, 800, '#FF4B4B');
        this.textN.position.x = this.pointx;
        this.scene.add(this.line5);
        this.line5.visible = this.lineVisible;


        //line4删除重绘
        this.removeLine(this.line4, true);
        this.line4 = this.drawLine({ x: 0, y: 0, z: 1 },
          { x: 0, y: this.point2y, z: 1 }, 800, '#FF4B4B');
        this.textM.position.y = this.point2y;
        this.scene.add(this.line4);
        this.line4.visible = this.lineVisible;

      };

    }


    //线和弧的转动事件
    slidercontrol() {
      this.line2.rotation.z =  -this.sliderControlLine.angle;
      this.line3.rotation.z =  -this.sliderControlLine.angle;
      this.line6.rotation.z =  -this.sliderControlLine.angle;
      this.line7.rotation.z =  this.sliderControlLine.angle;
      this.textP.rotation.z =  -this.sliderControlLine.angle;
      this.textP2.rotation.z =  this.sliderControlLine.angle;
      this.textα2.rotation.z =  this.sliderControlLine.angle;
      this.resetArc((this.sliderControlLine.angle + (17 * Math.PI / 180)) % (2 * Math.PI));
      this.rotatePoint3.rotation.z = (((Math.PI * 2) + this.sliderControlLine.angle + (17 * Math.PI / 180)) % (2 * Math.PI)) / 2;
      if ((this.sliderControlLine.angle + (17 * Math.PI / 180)) < 0) {
        this.resetArc(this.sliderControlLine.angle + (17 * Math.PI / 180) + Math.PI * 2);
      }
    }

    //删除重绘辅助线
    drawline() {
      this.removeFromScene(this.line8, this.line9, this.line4, this.line5);
      this.startAngle = 17 * Math.PI / 180;
      this.pointx = Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      this.pointy = Math.tan(this.angle) * this.pointx;
      this.angle = this.startAngle + this.sliderControlLine.angle;

      if (this.angle < Math.PI / 2) {
        this.pointx = Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > Math.PI / 2 && this.angle < Math.PI ) {
        this.pointx = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > Math.PI && this.angle < 3 * (Math.PI / 2) ) {
        this.pointx = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > 3 * (Math.PI / 2) ) {
        this.pointx =  Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > -Math.PI  && this.angle < - Math.PI / 2) {
        this.pointx = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > -3 * (Math.PI / 2) && this.angle < - Math.PI) {
        this.pointx = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }

      if (this.angle > -2 * Math.PI / 2 && this.angle < - 3 * (Math.PI / 2)) {
        this.pointx = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle), 2) + 1));
      }


      this.startAngle2 = Math.PI / 2 - 17 * Math.PI / 180;
      this.point2x  = Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      this.point2y = Math.tan(this.angle2) * this.point2x;
      this.angle2 = this.startAngle2 - this.sliderControlLine.angle;

      if (this.angle2 < Math.PI / 2) {
        this.point2x = Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > Math.PI / 2 && this.angle2 < Math.PI ) {
        this.point2x = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > Math.PI && this.angle2 < 3 * (Math.PI / 2) ) {
        this.point2x = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > 3 * (Math.PI / 2)) {
        this.point2x =  Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > -Math.PI  && this.angle2 < - Math.PI / 2) {
        this.point2x = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > -3 * (Math.PI / 2) && this.angle2 < - Math.PI) {
        this.point2x = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

      if (this.angle2 > -2 * Math.PI / 2 && this.angle2 < -3 * (Math.PI / 2)) {
        this.point2x = -Math.sqrt(2500 /  (Math.pow(Math.tan(this.angle2), 2) + 1));
      }

    }

    addTexture(url: any) {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(url);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    }

    planeTexture(src: any, W: number, H: number) {
      const map = this.addTexture(src);
      const gemo = new THREE.PlaneGeometry(W, H, 36, 36);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        map: map
      });
      const mesh = new THREE.Mesh(gemo, material);
      return mesh;
    }

    //删除线的方法
    removeLine(line: any, needRemove?: boolean) {
      line.geometry.dispose();
      line.material.dispose();
      if (needRemove) {

        this.scene.remove(line);
      }
    }

    removeFromScene(...object: Object3D[]) {
      setTimeout(() => {
        this.scene.remove(object[0], object[1], object[2], object[3]);
      }, 0);
    }

    //重新绘制直线的方法
    drawLine(start: any, end: any, lineWidth: number, color: string): any {
      const line = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(start.x, start.y, start.z),
        endPoint: new THREE.Vector3(end.x, end.y, end.z),
        lineWidth: lineWidth,
        color: color,
        lineWidthScale: 1 / 500
      });
      return line;
    }

    //文字和线的显示方法
    display() {
      // this.dashline.visible = true;
      // this.texty.visible = true;
      this.line4.visible = true;
      this.line5.visible = true;
      this.line6.visible = true;
      this.line7.visible = true;
      this.line8.visible = true;
      this.line9.visible = true;
      this.textM.visible = true;
      this.textN.visible = true;
      this.lineVisible = true;
    }

    //文字和线的隐藏方法
    hide() {
      // this.dashline.visible = false;
      // this.texty.visible = false;
      this.line4.visible = false;
      this.line5.visible = false;
      this.line6.visible = false;
      this.line7.visible = false;
      this.line8.visible = false;
      this.line9.visible = false;
      this.textM.visible = false;
      this.textN.visible = false;
      this.lineVisible = false;
    }

    //重置按钮的功能
    reset() {
      (window as any).viewHandler.viewModel.$data.show = false;
      (window as any).viewHandler.viewModel.$data.show1 = false;
      (window as any).viewHandler.viewModel.$data.show2 = false;
      (window as any).viewHandler.viewModel.$data.disabled = true;
      this.rotatePoint.rotateZ(-this.sliderControlLine.angle);
      this.sliderControlLine.angle = 0;
      this.resetArc(this.sliderControlLine.angle + (17 * Math.PI / 180));
      this.line2.rotation.z = -this.sliderControlLine.angle;
      this.line3.rotation.z = -this.sliderControlLine.angle;
      this.line6.rotation.z = -this.sliderControlLine.angle;
      this.line7.rotation.z =  this.sliderControlLine.angle;
      this.line2.visible = false;
      this.line3.visible = false;
      this.removeFromScene(this.line8, this.line9, this.line4, this.line5);
      this.createaidLine();
      this.hide();
      this.rotatePoint3.rotation.z = 8.5 * Math.PI / 180;
      this.textP.rotation.z =  -this.sliderControlLine.angle;
      this.textP2.rotation.z =  this.sliderControlLine.angle;
      this.textα2.rotation.z =  this.sliderControlLine.angle;
      this.textM.position.y = 49;
      this.textN.position.x = 48.5;
    }
}


