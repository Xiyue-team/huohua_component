import * as THREE from 'three';
import {
  Vector3,
  WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as s1 from '../sub_static/img1.png';
import * as s2 from '../sub_static/img2.png';
import { ViewController } from '../../../../../src/core/ViewController';
import {Line} from '../../../../../src/three/component/Line';
import { LineObject } from '../../../r14/lzxdczpd/services/LineObject';
import { DashLine } from '../../../../../src/three/component/DashLine';
import commonForThree from '../../../../../widget_sw/math/r16/tydderdy/services/commonForThree';
import { TweenMax } from 'gsap';
import { Helper } from './Helper';

const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);

export class Sqxddsdy3dModel extends ThreeBase {

    private point1: any;
    private point2: any;
    private point3: any;
    private point4: any;
    private slider1: any;
    private slider2: any;
    private lastpoint: any;
    private dargControls1: any;
    planeMesh: Mesh;
    browserInfo: BrowserInfo;
    private controls: any;
    private windowWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    private windowHeight = document.getElementById('3dContainer').getBoundingClientRect().height;
    private interact: any;
    private lineHelper = new Line();
    private canDrag = true;
    private line1: any;
    private line2: any;
    private pointGroup: THREE.Mesh[] = [];
    private count = 0;
    public val: number;
    public kl1: any;
    public kl2: any;
    public kl3: any;
    public kl4: any;
    public x: any;
    public y: any;
    private textF1Pos: any;
    private textF2Pos: any;
    private textF3Pos: any;
    private textF4Pos: any;
    private textk1Pos: any;
    private textk2Pos: any;
    private textk3Pos: any;
    private textk4Pos: any;
    private animationimg1: any;
    private animationimg2: any;
    private animationimg3: any;
    private animationimg4: any;
    private startPoint: any;
    private val1: number;
    private val2: number;
    private plan: any;
    private plan1: any;
    private splineObjectLeft4: any;
    private splineObjectRight4: any;
    private splineObjectLeft5: any;
    private splineObjectRight5: any;
    private splineObjectRight6: any;
    private splineObjectLeft6: any;
    private splineObjectLeft7: any;
    private splineObjectRight7: any;
    private splineObjectLeft8: any;
    private splineObjectRight8: any;
    private splineObjectLeft9: any;
    private splineObjectRight9: any;
    private splineObjectLeft10: any;
    private splineObjectRight10: any;


  lineObj1: LineObject;
    lineObj2: LineObject;
    top1: any;
    top2: any;
    end1: any;
    end2: any;

    private dashline = new DashLine();
    jpoint: any;

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
        console.log('init Simple3DModel constructor');
        this.val = 5;
        this.x = '4';
        this.y = parseFloat((Math.sqrt(112 / 9)).toFixed(2));
        this.kl1 = 0.5 ;
        this.kl2 =  3.343;
        console.log(this.windowWidth, this.height);
      this.init();

    }
    init() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.init3dModel();
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
            // (this.renderer as THREE.WebGLRenderer).sortObjects = false;
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        // this.renderer = new CanvasRenderer.CanvasRenderer();
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl() {
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

    //声明方法
  init3dModel() {
        this.createAxis();
        this.createPoint1();
        this.createPoint2();
        this.createPoint3();
        this.createPoint4();
        this.createLine1();
        this.createLine2();
        this.createslider1();
        this.createslider2();
        this.createtextpos();
        this.createtext();
        this.animationImg1();
        this.animationImg2();
        this.animationImg3();
        this.animationImg4();
        this.createLines1();
        this.stops();
        this.createFunctionLeftLine4();
        this.createFunctionRightLine4();
        this.createFunctionLeftLine5();
        this.createFunctionRightLine5();
        this.createFunctionLeftLine6();
        this.createFunctionRightLine6();
        this.createFunctionLeftLine7();
        this.createFunctionRightLine7();
        this.createFunctionLeftLine8();
        this.createFunctionRightLine8();
        this.createFunctionLeftLine9();
        this.createFunctionRightLine9();
        this.createFunctionLeftLine10();
        this.createFunctionRightLine10();
        this.splin();
        this.createTexts();
    }

    //创建一个坐标系
  createAxis() {
    const axis = AxisUtil.createAxis({
      isTicks: true,
      AxisXNumArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    } as any);
    axis.position.z = 5;
    this.scene.add(axis);

    const geometry = new THREE.PlaneGeometry( 240, 144, 32 );
    const material = new THREE.MeshBasicMaterial( {color: '#ffffff', side: THREE.DoubleSide} );
    this.plan = new THREE.Mesh( geometry, material );
    this.plan1 = new THREE.Mesh( geometry, material );
    this.plan.position.x = 120;
    this.plan1.position.x = -120;
    this.plan.position.z = 2;
    this.plan1.position.z = 2;
    this.scene.add( this.plan , this.plan1 );
  }

    //创建坐标文字
  createtextpos() {
    const val = this.val;
    const x = this.x;
    const y = this.y;

    this.textF1Pos = commonForThree.createText(`(${-val},0)`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textF2Pos = commonForThree.createText(`(${val},0)`,  [70, 45, 0],  {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textF3Pos = commonForThree.createText(`(${x},${y})`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textF4Pos = commonForThree.createText(`(${x},${y})`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});

    this.textF1Pos.position.set(8, 13, 0);
    this.textF2Pos.position.set(16, 13, 0);
    this.textF3Pos.position.set(27, 5, 0);
    this.textF4Pos.position.set(27, 5, 0);

    this.point1.add(this.textF1Pos);
    this.point2.add(this.textF2Pos);
    this.point3.add(this.textF3Pos);
    this.point4.add(this.textF4Pos);

  }

  //创建点文字
  createtext() {
    const textM = commonForThree.createText(`M`, [10, 5, 0], { 'color': '#000000', 'isItalic': true, fontSize: 45 });
    this.point3.add(textM);

    const textM2 = commonForThree.createText(`M`, [10, 5, 0], { 'color': '#000000', 'isItalic': true, fontSize: 45 });
    this.point4.add(textM2);

    const f1 = require('../sub_static/F1.png');
    const f2 = require('../sub_static/F2.png');

    const textF1 = this.planeTexture(f1, 6, 8);
    const textF2 = this.planeTexture(f2, 6, 8);

    textF1.position.set(-5, 10, 0);
    textF2.position.set(4, 10, 0);

    this.point1.add(textF1);
    this.point2.add(textF2);


    const a1 = require('../sub_static/A1.png');
    const a2 = require('../sub_static/A2.png');

    const texta1 = this.planeTexture(a1, 10, 10);
    const texta2 = this.planeTexture(a2, 10, 10);

    texta1.position.set(0, -15, 0);
    texta2.position.set(3, -15, 0);

    this.slider1.add(texta1);
    this.slider2.add(texta2);


    const k1 = require('../sub_static/kl1.png');
    const k2 = require('../sub_static/kl2.png');

    const textk1 = this.planeTexture(k1, 8, 8);
    const textk2 = this.planeTexture(k2, 8, 8);

    const textk3 = this.planeTexture(k1, 8, 8);
    const textk4 = this.planeTexture(k2, 8, 8);


    textk1.position.set(40, 10, 0);
    textk2.position.set(-30, 20, 0);
    textk3.position.set(10, 15, 0);
    textk4.position.set(-30, 12, 0);

    this.point3.add(textk1);
    this.point3.add(textk2);
    this.point4.add(textk3);
    this.point4.add(textk4);

    const kl1 = this.kl1;
    const kl2 = this.kl2;

    const kl3 = this.kl3;
    const kl4 = this.kl4;

    this.textk1Pos = commonForThree.createText(`= ${kl1}`,  [70, 45, 0],  {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textk1Pos.position.set(12, 5, 0);
    textk1.add(this.textk1Pos);

    this.textk2Pos = commonForThree.createText(`= ${kl2}`,  [70, 45, 0],  {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textk2Pos.position.set(12, 5, 0);
    textk2.add(this.textk2Pos);

    this.textk3Pos = commonForThree.createText(`= ${kl3}`,  [70, 45, 0],  {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textk3Pos.position.set(12, 5, 0);
    textk3.add(this.textk3Pos);

    this.textk4Pos = commonForThree.createText(`= ${kl4}`,  [70, 45, 0],  {'color': '#000', 'isItalic': false, fontSize: 40});
    this.textk4Pos.position.set(12, 5, 0);
    textk4.add(this.textk4Pos);

  }

  //创建双曲线初始状态
  splin() {
    this.splineObjectLeft4.visible = false;
    this.splineObjectRight4.visible = false;
    this.splineObjectLeft5.visible = false;
    this.splineObjectRight5.visible = false;
    this.splineObjectLeft6.visible = false;
    this.splineObjectRight6.visible = false;
    this.splineObjectLeft7.visible = false;
    this.splineObjectRight7.visible = false;
    this.splineObjectLeft8.visible = false;
    this.splineObjectRight8.visible = false;
    this.splineObjectLeft9.visible = false;
    this.splineObjectRight9.visible = false;
    this.splineObjectLeft10.visible = false;
    this.splineObjectRight10.visible = false;

  }

  //创建动画停止方法
  stops() {
    this.animationimg1.progress(0);
    this.animationimg1.pause();
    this.animationimg2.progress(0);
    this.animationimg2.pause();
    this.animationimg3.progress(0);
    this.animationimg3.pause();
    this.animationimg4.progress(0);
    this.animationimg4.pause();
    this.point3.visible = true;
    this.point4.visible = false;
    this.removePoint(this.pointGroup);

  }

  //创建M点和k的文字
  createTexts() {

    const x = parseFloat((this.point3.position.x / 10).toFixed(2));
    const y = parseFloat((this.point3.position.y / 10).toFixed(2));
    this.textF3Pos.text = `(${x},${y})`;

    const kl1 =  parseFloat(((this.point3.position.y / 10) / (this.point3.position.x / 10 + 3)).toFixed(3));
    const kl2 =  parseFloat((((this.point3.position.y ) / 10) / (this.point3.position.x / 10 - 3)).toFixed(3));

    this.textk1Pos.text = `= ${kl1}`;
    this.textk2Pos.text = `= ${kl2}`;
  }

  //创建F1点
  createPoint1() {

    this.point1 = ThreeUtil.createImg(16, 16, s1, -50, 0);
    const point1 = ThreeUtil.createPoint(2, '#0199FF', 1, 0, 1);
    this.point1.position.z = 3;
    point1.position.z = 4;
    this.point1.add(point1);
    this.scene.add(this.point1);

    this.dargControls1 = new dragcontrols([this.point1], this.camera, this.renderer.domElement);

    this.dargControls1.addEventListener( 'dragstart',  () => {

      this.controls.enabled = false;
      ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
    } );

    this.dargControls1.addEventListener( 'dragend', () => {

      this.controls.enabled = true;

      (window as any).viewHandler.viewModel.$data.disable = false;

    } );

    this.lastpoint = new THREE.Vector3(-50, 0, 0);

    this.point1Drag();

  }

  //创建F1拖拽事件
  point1Drag() {

    this.dargControls1.addEventListener( 'drag', () => {
      if (!this.canDrag) {
        return;
      }

      this.point1.position.y = 0;

      if (this.point1.position.x  < -100) {
        this.point1.position.x = -100;
      } else if (this.point1.position.x > -40) {
        this.point1.position.x = -40;
      }
      this.point1.position.x = Math.round(this.point1.position.x / 10 ) * 10;

      this.point2.position.x = -this.point1.position.x;

      this.point1.position.x = -this.point2.position.x;

      this.point3.position.y = 10 * Math.sqrt(112 / 9);

      this.point3.position.x = Math.sqrt(920 * (1 + (Math.pow(this.point3.position.y, 2) /
        Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2))));

      const val = Math.floor(Math.abs(this.point1.position.x) / 10);
      this.textF1Pos.text = `(${-val},0)`;
      this.textF2Pos.text = `(${val},0)`;

      this.stops();
      this.createLines1();
      this.createTexts();
    });
  }

  //创建F2点
  createPoint2() {

    this.point2 = ThreeUtil.createImg(16, 16, s1, 50, 0);
    const point2 = ThreeUtil.createPoint(2, '#0199FF', -1, 0, 1);
    this.point2.position.z = 3;
    point2.position.z = 4;

    this.point2.add(point2);
    this.scene.add(this.point2);

    this.dargControls1 = new dragcontrols([this.point2], this.camera, this.renderer.domElement);


    this.dargControls1.addEventListener( 'dragstart',  () => {
      this.controls.enabled = false;
      ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
    } );

    this.dargControls1.addEventListener( 'dragend', () => {
      this.controls.enabled = true;

      (window as any).viewHandler.viewModel.$data.disable = false;

    } );

    this.lastpoint = new THREE.Vector3(50, 0, 0);

    this.point2Drag();

  }

  //创建F2拖拽事件
  point2Drag() {
    this.dargControls1.addEventListener( 'drag', () => {
      if (!this.canDrag) {
        return;
      }
      this.point2.position.y = 0;

      if (this.point2.position.x  > 100) {
        this.point2.position.x = 100;
      } else if (this.point2.position.x < 40) {
        this.point2.position.x = 40;
      }

      this.point2.position.x = Math.round(this.point2.position.x / 10 ) * 10;

      this.point1.position.x = -this.point2.position.x;

      this.point2.position.x = -this.point1.position.x;

      this.point3.position.y = 10 * Math.sqrt(112 / 9);
      this.point3.position.x = Math.sqrt(920 * (1 + (Math.pow(this.point3.position.y, 2) /
        Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2))));

      const val = Math.floor(Math.abs(this.point2.position.x) / 10);
      this.textF1Pos.text = `(${-val},0)`;
      this.textF2Pos.text = `(${val},0)`;

      this.stops();
      this.createLines1();
      this.createTexts();
    });
  }

  //创建M点
  createPoint3() {
    this.point3 = ThreeUtil.createImg(16, 16, s2, 40, 10 * Math.sqrt(112 / 9));

    const point3 = ThreeUtil.createPoint(1,  '#000', 0, 0 , 0);
    this.point3.position.z = 3;
    this.point3.add(point3);
    this.scene.add(this.point3);

    this.dargControls1 = new dragcontrols([this.point3], this.camera, this.renderer.domElement);

    this.dargControls1.addEventListener( 'dragstart',  () => {
      this.controls.enabled = false;

      ViewController.getInstance().viewHandler.viewModel.$data.showGuideLine = false;
    } );

    this.dargControls1.addEventListener( 'dragend', () => {

      this.controls.enabled = true;

      const point9 = ThreeUtil.createPoint(1, '#000', 0, 0, 1);
      this.scene.add(point9);
      point9.position.x =  this.point3.position.x;
      point9.position.y =  this.point3.position.y;
      this.pointGroup.push(point9);
      this.scene.add(this.pointGroup[this.count]);
      this.pointGroup[this.count].position.z = 3;
      this.count++ ;

    } );

    this.point3Drag();
  }

  //创建M点的拖拽事件
  point3Drag() {
    this.dargControls1.addEventListener( 'drag', () => {
      if (!this.canDrag) {
        return;
      }

      if (this.point3.position.y  > 70) {
        this.point3.position.y = 70;
      } else if (this.point3.position.y < -70) {
        this.point3.position.y = -70;
      }

      this.point3.position.x = Math.sqrt(920 * (1 + (Math.pow(this.point3.position.y, 2) /
        Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2))));

      this.createLines1();
      this.createTexts();
    });
  }

  //创建左边M点
  createPoint4() {

    this.point4 = ThreeUtil.createImg(15, 15, s2, -40, 10 * Math.sqrt(112 / 9) );
    const point4 = ThreeUtil.createPoint(1,  '#000', 0, 0 , 0);
    this.point4.add(point4);
    this.scene.add(this.point4);
    this.point4.position.z = 3;
    this.point4.visible  = false;

    this.dargControls1 = new dragcontrols([this.point4], this.camera, this.renderer.domElement);
    this.dargControls1.addEventListener( 'drag', () => {
      if (!this.canDrag) {
        return;
      }
      if (this.point4.position.y  > 70) {
        this.point4.position.y = 70;
        this.point4.visible = true;
      } else if (this.point4.position.y < -70) {
        this.point4.position.y = -70;
        this.point4.visible = true;
      }
      this.point4.position.x =  - Math.sqrt(920 * (1 + (Math.pow(this.point4.position.y, 2) /
        Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2))));

      const y1 = (-22 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) + 3);
      const y2 = (28 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) + 3);
      this.end1 = ThreeUtil.createPoint(1, '#000', -250, 10 * y1, 1 );
      this.top1 = ThreeUtil.createPoint(1, '#000',  250, 10 * y2, 1);

      const y3 = (-28 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) - 3);
      const y4 = (22 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) - 3);

      this.end2 = ThreeUtil.createPoint(1, '#000', -250, 10 * y3, 1);
      this.top2 = ThreeUtil.createPoint(1, '#000', 250 , 10 * y4, 1);

      this.removeLine(this.line1);
      this.line1 = this.drawLine({x: this.end1.position.x, y: this.end1.position.y , z: 1},
        {x: this.top1.position.x, y: this.top1.position.y, z: 1}, 1000, '#0199FF');
      this.scene.add(this.line1);

      this.removeLine(this.line2);
      this.line2 = this.drawLine({x: this.end2.position.x, y: this.end2.position.y , z: 1},
        {x: this.top2.position.x, y: this.top2.position.y, z: 1}, 1000, '#FF4747');
      this.scene.add(this.line2);

      const kl3 =  parseFloat(((this.point4.position.y / 10) / (this.point4.position.x / 10 + 3)).toFixed(3));
      const kl4 =  parseFloat((((this.point4.position.y ) / 10) / (this.point4.position.x / 10 - 3)).toFixed(3));

      this.textk3Pos.text = `= ${kl3}`;
      this.textk4Pos.text = `= ${kl4}`;

      const x = parseFloat((this.point4.position.x / 10).toFixed(2));
      const y = parseFloat((this.point4.position.y / 10).toFixed(2));
      this.textF4Pos.text = `(${x},${y})`;
    });

  }

  //创建函数线
  createFunctionLeftLine4() {
    this.splineObjectLeft4 = Helper.createFunline(Helper.createFunctionPoint4());
    this.scene.add(this.splineObjectLeft4);
    this.splineObjectLeft4.visible = false;
  }
  createFunctionRightLine4() {
    this.splineObjectRight4 = Helper.createFunline(Helper.createFunctionPoint04());
    this.scene.add( this.splineObjectRight4);
    this.splineObjectRight4.visible = false;
  }

  createFunctionLeftLine5() {
    this.splineObjectLeft5 = Helper.createFunline(Helper.createFunctionPoint5());
    this.scene.add(this.splineObjectLeft5);
    this.splineObjectLeft5.visible = false;
  }
  createFunctionRightLine5() {
    this.splineObjectRight5 = Helper.createFunline(Helper.createFunctionPoint05());
    this.scene.add( this.splineObjectRight5);
    this.splineObjectRight5.visible = false;
  }

  createFunctionLeftLine6() {
    this.splineObjectLeft6 = Helper.createFunline(Helper.createFunctionPoint6());
    this.scene.add(this.splineObjectLeft6);
    this.splineObjectLeft6.visible = false;

  }
  createFunctionRightLine6() {
    this.splineObjectRight6 = Helper.createFunline(Helper.createFunctionPoint06());
    this.scene.add( this.splineObjectRight6);
    this.splineObjectRight6.visible = false;
  }

  createFunctionLeftLine7() {
    this.splineObjectLeft7 = Helper.createFunline(Helper.createFunctionPoint7());
    this.scene.add(this.splineObjectLeft7);
    this.splineObjectLeft7.visible = false;
  }
  createFunctionRightLine7() {
    this.splineObjectRight7 = Helper.createFunline(Helper.createFunctionPoint07());
    this.scene.add( this.splineObjectRight7);
    this.splineObjectRight7.visible = false;
  }

  createFunctionLeftLine8() {
    this.splineObjectLeft8 = Helper.createFunline(Helper.createFunctionPoint8());
    this.scene.add(this.splineObjectLeft8);
    this.splineObjectLeft8.visible = false;
  }
  createFunctionRightLine8() {
    this.splineObjectRight8 = Helper.createFunline(Helper.createFunctionPoint08());
    this.scene.add( this.splineObjectRight8);
    this.splineObjectRight8.visible = false;
  }

  createFunctionLeftLine9() {
    this.splineObjectLeft9 = Helper.createFunline(Helper.createFunctionPoint9());
    this.scene.add(this.splineObjectLeft9);
    this.splineObjectLeft9.visible = false;
  }
  createFunctionRightLine9() {
    this.splineObjectRight9 = Helper.createFunline(Helper.createFunctionPoint09());
    this.scene.add( this.splineObjectRight9);
    this.splineObjectRight9.visible = false;
  }

  createFunctionLeftLine10() {
    this.splineObjectLeft10 = Helper.createFunline(Helper.createFunctionPoint10());
    this.scene.add(this.splineObjectLeft10);
    this.splineObjectLeft10.visible = false;
  }
  createFunctionRightLine10() {
    this.splineObjectRight10 = Helper.createFunline(Helper.createFunctionPoint010());
    this.scene.add( this.splineObjectRight10);
    this.splineObjectRight10.visible = false;
  }

  //创建线1
  createLine1() {
    const createLine = new Line();
    this.line1 = createLine.createLine({
      startPoint: new THREE.Vector3(-250, -10 * (22 * Math.sqrt(112 / 9)) / 7, 1),
      endPoint: new THREE.Vector3(250, 10 * (28 * Math.sqrt(112 / 9)) / 7, 1),
      lineWidth: 1000,
      color: '#1099FF',
      lineWidthScale: 1 / 500

    });

    this.line1.position.z = 3;
    this.scene.add(this.line1);
  }

  //创建线2
  createLine2() {
    const createLine = new Line();
    this.line2 = createLine.createLine({
      startPoint: new THREE.Vector3(-250, -10 * 28 * Math.sqrt(112 / 9)  , 1),
      endPoint: new THREE.Vector3(250, 10 * 22 * Math.sqrt(112 / 9), 1),
      lineWidth: 1000,
      color: '#FF4747',
      lineWidthScale: 1 / 500

    });
    this.scene.add(this.line2);
    this.line2.position.z = 3;
  }

  //创建线1与x轴交点slider1
  createslider1() {

    this.slider1 = ThreeUtil.createPoint(2, '#0199FF', -30, 0, 0);
    this.slider1.position.z = 3;

    const textS1Pos = commonForThree.createText(`(-3,0)`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
    textS1Pos.position.set(12, -12, 0);

    this.slider1.add(textS1Pos);
    this.scene.add(this.slider1);
  }

  //创建线2与x轴交点slider2
  createslider2() {

    this.slider2 = ThreeUtil.createPoint(2, '#0199FF', 30, 0, 0);
    this.slider2.position.z = 3;
    const textS2Pos = commonForThree.createText(`(3,0)`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
    textS2Pos.position.set(14, -12, 0);

    this.slider2.add(textS2Pos);
    this.scene.add(this.slider2);
  }

  animationImg1() {
    const tween = {
      y: 0,
    };
    this.animationimg1 = TweenMax.to(tween, 5, {
      y: -140,
      onUpdate: () => {
        this.plan.position.y = tween.y;
      },
      paused: true
    });
  }

  //创建右边双曲线绘制动画
  animationImg2() {
    this.removePoint(this.pointGroup);
    const tween = {
      y: 70,
    };
    //
    this.startPoint = new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2)))), 100, 0);
    let endPoint =  new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2)))), 100, 0);
    this.animationimg2 = TweenMax.to(tween, 5, {
      y: -70,
      onUpdate: () => {
        this.point3.position.y = tween.y;
        this.point3.position.x = Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2)))),
          endPoint = new THREE.Vector3(Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
            Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2)))), tween.y, 0);
        this.startPoint = endPoint;

        this.createLines1();
        this.createTexts();
      },
      onComplete: () => {
        this.removePoint(this.pointGroup);
        this.animationimg3.play();
        this.animationimg4.play();
        this.point3.visible = false;
        this.point4.visible = true;

      },
      paused: true
    });
  }

  animationImg3() {
    const tween = {
      y: 0,
    };
    this.animationimg3 = TweenMax.to(tween, 5, {
      y: -140,
      onUpdate: () => {
        this.plan1.position.y = tween.y;
      },
      paused: true
    });
  }

  //创建左边双曲线绘制动画
  animationImg4() {
    this.removePoint(this.pointGroup);
    const tween = {
      y: 70,
    };
    //
    this.startPoint = new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2)))), 100, 0);
    let endPoint =  new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2)))), 100, 0);
    this.animationimg4 = TweenMax.to(tween, 5, {
      y: -70,
      onUpdate: () => {
        this.point4.position.y = tween.y;
        this.point4.position.x = -Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2)))),
          endPoint = new THREE.Vector3(-Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
            Math.pow(Math.sqrt(Math.pow(this.point1.position.x, 2) - 920), 2)))), tween.y, 0);

        const y1 = (-22 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) + 3);
        const y2 = (28 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) + 3);
        this.end1 = ThreeUtil.createPoint(1, '#000', -250, 10 * y1, 1 );
        this.top1 = ThreeUtil.createPoint(1, '#000',  250, 10 * y2, 1);

        const y3 = (-28 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) - 3);
        const y4 = (22 * (this.point4.position.y / 10)) / ((this.point4.position.x / 10) - 3);

        this.end2 = ThreeUtil.createPoint(1, '#000', -250, 10 * y3, 1);
        this.top2 = ThreeUtil.createPoint(1, '#000', 250 , 10 * y4, 1);

        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.end1.position.x, y: this.end1.position.y , z: 1},
          {x: this.top1.position.x, y: this.top1.position.y, z: 1}, 1000, '#0199FF');
        this.scene.add(this.line1);

        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.end2.position.x, y: this.end2.position.y , z: 1},
          {x: this.top2.position.x, y: this.top2.position.y, z: 1}, 1000, '#FF4747');
        this.scene.add(this.line2);

        this.startPoint = endPoint;

        const x = parseFloat((this.point4.position.x / 10).toFixed(2));
        const y = parseFloat((this.point4.position.y / 10).toFixed(2));
        this.textF4Pos.text = `(${x},${y})`;

        const kl3 =  parseFloat(((this.point4.position.y / 10) / (this.point4.position.x / 10 + 3)).toFixed(3));
        const kl4 =  parseFloat((((this.point4.position.y ) / 10) / (this.point4.position.x / 10 - 3)).toFixed(3));

        this.textk3Pos.text = `= ${kl3}`;
        this.textk4Pos.text = `= ${kl4}`;
      },
      onComplete: () => {
        this.removePoint(this.pointGroup);
      },
      paused: true
    });
  }

  //创建重绘线的方法
  createLines1() {
   const y1 = (-22 * (this.point3.position.y / 10)) / ((this.point3.position.x / 10) + 3);
   const y2 = (28 * (this.point3.position.y / 10)) / ((this.point3.position.x / 10) + 3);
   this.end1 = ThreeUtil.createPoint(1, '#000', -250, 10 * y1, 1 );
   this.top1 = ThreeUtil.createPoint(1, '#000',  250, 10 * y2, 1);

   const y3 = (-28 * (this.point3.position.y / 10)) / ((this.point3.position.x / 10) - 3);
   const y4 = (22 * (this.point3.position.y / 10)) / ((this.point3.position.x / 10) - 3);

   this.end2 = ThreeUtil.createPoint(1, '#000', -250, 10 * y3, 1);
   this.top2 = ThreeUtil.createPoint(1, '#000', 250 , 10 * y4, 1);

   this.removeLine(this.line1);
   this.line1 = this.drawLine({x: this.end1.position.x, y: this.end1.position.y , z: 1},
     {x: this.top1.position.x, y: this.top1.position.y, z: 1}, 1000, '#0199FF');
   this.scene.add(this.line1);

   this.removeLine(this.line2);
   this.line2 = this.drawLine({x: this.end2.position.x, y: this.end2.position.y , z: 1},
     {x: this.top2.position.x, y: this.top2.position.y, z: 1}, 1000, '#FF4747');
   this.scene.add(this.line2);
   }

  //创建插入F1,F2图片方法
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

  //创建点坐标文字括号的方法
  addTexture(url: any) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

//删除线的方法
  removeLine(line: any) {
    line.geometry.dispose();
    line.material.dispose();
    this.scene.remove(line);
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

   //获取鼠标位置并转换成三维世界坐标
    getMousePosition(event: any, x: number, y: number) {
        const vector = new Vector3();

        vector.set((x / this.windowWidth) * 2 - 1,
            (-y / this.windowHeight) * 2 + 1, 0);

        vector.unproject(this.camera);

        const dir = vector.sub(this.camera.position).normalize();

        const distance = -this.camera.position.z / dir.z;

        return  this.camera.position.clone().add(dir.multiplyScalar(distance));
    }

   //创建删点方法
  removePoint(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      (arr[i] as any).geometry.dispose();
      (arr[i] as any).material.dispose();
      this.scene.remove((arr[i] as any));
    }
    this.pointGroup = [];
    this.count = 0;
  }

  //创建点击绘制按钮触发动画播放方法
   button1 () {
     this.animationimg1.play();
     this.animationimg2.play();
     this.splin();
     if (Math.round(this.point2.position.x) === 40 ) {
       this.splineObjectLeft4.visible = true;
       this.splineObjectRight4.visible = true;
     } else if (Math.round(this.point2.position.x) === 50) {
       this.splineObjectLeft5.visible = true;
       this.splineObjectRight5.visible = true;
     } else if (Math.round(this.point2.position.x) === 60) {
       this.splineObjectLeft6.visible = true;
       this.splineObjectRight6.visible = true;
     } else if (Math.round(this.point2.position.x) === 70) {
       this.splineObjectLeft7.visible = true;
       this.splineObjectRight7.visible = true;
     } else if (Math.round(this.point2.position.x) === 80) {
       this.splineObjectLeft8.visible = true;
       this.splineObjectRight8.visible = true;
     } else if (Math.round(this.point2.position.x) === 90) {
       this.splineObjectLeft9.visible = true;
       this.splineObjectRight9.visible = true;
     } else if (Math.round(this.point2.position.x) === 100) {
       this.splineObjectLeft10.visible = true;
       this.splineObjectRight10.visible = true;
     }
  }

  //创建滑轮改变数值方法
  changeFoucsPoint(val: any) {

      const f = val;
      this.point1.position.x = -10 * Math.round(Math.sqrt((9 * (f * f - 1)) + 9));
      this.point2.position.x =  10 * Math.sqrt((9 * (f * f - 1)) + 9);

      this.stops();

     (window as any).viewHandler.viewModel.$data.disable = false;

     this.val1 = parseFloat((this.point1.position.x / 10).toFixed(2));
     this.val2 = parseFloat((this.point1.position.x / 10).toFixed(2));

     this.textF1Pos.text = `(${this.val1},0)`;
     this.textF2Pos.text = `(${-this.val2},0)`;

     this.point3.position.y = 10 * Math.sqrt(112 / 9);
     this.point3.position.x = Math.sqrt(920 * (1 + (Math.pow(this.point3.position.y, 2) /
      Math.pow(Math.sqrt(Math.pow(this.point2.position.x, 2) - 920), 2))));

     this.createLines1();
     this.createTexts();
  }

    //重置按钮功能
    reset() {
      this.point1.position.x = -50;
      this.point2.position.x = 50;
      this.textF1Pos.text = `(-5,0)`;
      this.textF2Pos.text = `(5,0)`;

      this.stops();

      this.point3.position.x = 40;
      this.point3.position.y = 10 * Math.sqrt(112 / 9);
      this.textF3Pos.text = `(4,3.53)`;
      this.textk1Pos.text = `= 0.5`;
      this.textk2Pos.text = `= 3.343`;
      this.createLines1();

      (window as any).viewHandler.viewModel.$data.disable = false;

    }
}
