import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer} from 'three';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { CircleLineUtils} from '../../../../../src/three/component/CircleLineUtils';
import { Line } from '../../../../../src/three/component/Line';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';

import * as arrow from '../sub_static/huadong.png';
import * as p from '../sub_static/p.png';
import * as p1 from '../sub_static/p1.png';
import * as p2 from '../sub_static/p2.png';
import * as p1text from '../sub_static/p1text.png';
import * as p2text from '../sub_static/p2text.png';
import * as circle from '../sub_static/yuandian.png';
import * as yellow from '../sub_static/yellow.png';
import * as green from '../sub_static/green.png';

export class Ydgs563dModel extends ThreeBase {

    private controls: any;
    private lineHelper = new Line();
    //红线旋转点
    private rotatePointLine: THREE.Mesh;
    private rotatePointLine1: THREE.Mesh;

  //α角的旋转点
    private rotatePointAngle: THREE.Mesh;
    //红线移动触摸滑动区域
    private huadong: THREE.Mesh;
    //红线旋转对象
    private sliderControlLine: any;
    private angle: any;
    //箭头图片
    private imgArrow: any;
    private arc: THREE.Mesh;
    //P点字母
    private P1text: any;
    private P2text: THREE.Mesh;
    //P点坐标文字
    private pXYZ: THREE.Mesh;
    private p1XYZ: THREE.Mesh;
    private p2XYZ: THREE.Mesh;
    //线段与圆的蓝色交点
    private yellowPoint: any;
    private greenPoint: THREE.Mesh;
    //线段对应的字母名
    private purpleLine: any;
    private yellowLine: any;
    private greenLine: any;
    //y=x对称线上的英文
    private symmetry: any;

    browserInfo: BrowserInfo;
    lineOne: any;
    lineTwo: any;
    lineThree: any;
    lineFour: any;
    //y=x对称线
    normalline: any;
    //蓝色点的点击区域
    point1: any;
    point2: any;
    //添加2个slide的数组
    children: any;

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
        this.init();

    }

    //预加载图片
    loadImg() {
    const imgArray = [arrow, p, p1, p2, p1text, p2text, circle, yellow, green];
    console.log(imgArray);
    }

    init() {
        //this.browserInfo = (window as any).env.browserInfo;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.loadImg();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.init3dMOdel();
        this.ClickPoint();
        this.reverse();
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

    /**
     * 初始化控制器
     */
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
      this.createCircle();
      this.createLine();
      this.creatPoint();
      this.createArc();
      this.createText();
      this.remove();
    }

    //创建一个坐标系及坐标上数字
    createAxis() {
        const axis = AxisUtil.createAxis({
          isTicks: false,
        } as any);

        this.scene.add(axis);

        //创建数字1和—1
        const textF1 = ThreeUtil.createNormalText('1', 52, -2, 0, '#000000' );
        const textF2 = ThreeUtil.createNormalText('-1', -53, -2, 0, '#000000' );
        const textF3 = ThreeUtil.createNormalText('1', -3, 58, 0, '#000000' );
        const textF4 = ThreeUtil.createNormalText('-1', -3, -51, 0, '#000000' );

        this.scene.add(textF1, textF2, textF3, textF4);
    }

    //绘制圆
    createCircle() {
      const CircleLineUtil = new CircleLineUtils();
      this.scene.add(CircleLineUtil.addEllipseLine(50, 0x000000, 3, 1.2, 2 * Math.PI));

    }

    //创建线
    createLine() {
      //创建红色线
      this.lineOne = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(100,  0, 0),
        lineWidth: 800,
        color: '#FF4B4B',
        lineWidthScale: 1 / 500
      });
      this.angle = 15 * Math.PI / 180;
      this.lineOne.rotateZ( this.angle);
      this.scene.add(this.lineOne);


      //创建紫色purple线
      this.lineTwo = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(100,  0, 0),
        lineWidth: 800,
        color: '#BD1DE9',
        lineWidthScale: 1 / 500
      });
      this.lineTwo.rotateZ( -this.angle);
      this.lineTwo.visible = false;
      this.scene.add(this.lineTwo);


      //创建黄色线
      this.lineThree = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 2),
        endPoint: new THREE.Vector3(100,  0, 2),
        lineWidth: 800,
        color: '#FF9D1E',
        lineWidthScale: 1 / 500
      });
      this.lineThree.rotateZ( Math.PI / 2 - this.angle);
      this.lineThree.visible = false;

      //创建绿色线
      this.lineFour = this.lineHelper.createLine({
        startPoint: new THREE.Vector3(0, 0, 0),
        endPoint: new THREE.Vector3(100,  0, 0),
        lineWidth: 800,
        color: '#49F0CA',
        lineWidthScale: 1 / 500
      });
      this.lineFour.rotateZ( Math.PI / 2 + this.angle);
      this.lineFour.visible = false;


      //y=x对称线
      if ((window as any).env.browserInfo.isIpad) {
        this.normalline = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(80, 80, 0),
          endPoint: new THREE.Vector3(-80, -80, 0),
          dashLine: true,
          lineWidth: 2,
          gapSize: 2,
          dashSize: 2
        });
      } else {
        this.normalline = this.lineHelper.createLine({
          startPoint: new THREE.Vector3(80, 80, 0),
          endPoint: new THREE.Vector3(-80, -80, 0),
          dashLine: true,
          lineWidth: 650,
          gapSize: 5,
          dashSize: 0.8
        });
      }

      this.normalline.visible = false;
      this.scene.add(this.normalline);
    }


    //创建线1及其添加的点
    creatPoint() {

      //创建线1触摸移动箭头
      this.imgArrow = ThreeUtil.createImg(15, 15, arrow, 0, 0, 5);
      //创建移动箭头触摸区域
      this.huadong = ThreeUtil.createImg(400, 400, arrow, 100, 0,  3);
      (this.huadong.material as any).opacity = 0;

      //创建线一的旋转点
      this.rotatePointLine = ThreeUtil.createPoint(1, '#000', 0, 0, 0);
      this.rotatePointLine1 = ThreeUtil.createPoint(1, '#000', 0, 0, 0);

      this.huadong.add( this.imgArrow);
      this.lineOne.add(this.huadong);

      this.rotatePointLine1.add(this.lineThree, this.lineFour);
      this.rotatePointLine.add(this.lineOne);



      //调用旋转组件
      this.sliderControlLine = new SliderControlLine(this.lineOne, this.huadong, this.rotatePointLine, this.imgArrow);
      this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);

      //添加的数组
      // this.children = ThreeUtil.createPoint(1, '#000', 0, 0, 0);
      this.scene.add(this.rotatePointLine, this.rotatePointLine1);
      // this.scene.add(this.children);
      this.rotatePointLine.name = 'rotatePointLine';
      this.rotatePointLine1.name = 'rotatePointLine1';
      console.log(this.scene.children);

    }

    //创建线1移动是触发的事件
    remove() {

      this.sliderControlLine.sliderPointMouseMoveCallback = () => {
        //线的旋转角度
        this.lineTwo.rotation.z =  -(15 * Math.PI / 180 + this.sliderControlLine.angle);
        this.lineThree.rotation.z =  Math.PI / 2 - ( this.sliderControlLine.angle + 15 * Math.PI / 180);
        this.lineFour.rotation.z =  Math.PI / 2 + ( this.sliderControlLine.angle + 15 * Math.PI / 180 );
        this.rotatePointAngle.rotation.z = (((Math.PI * 2) + this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI)) / 2;
        //坐标文字旋转角度
        this.pXYZ.rotation.z = -this.sliderControlLine.angle - 12 * Math.PI / 180;
        this.p1XYZ.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.p2XYZ.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
        //P点字母旋转角度
        this.P1text.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.P2text.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
        //线对应的字母的旋转角度
        this.yellowLine.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.greenLine.rotation.z = -this.sliderControlLine.angle - 105 * Math.PI / 180;

        //判断旋转角正负时候的弧度角显示
        if (this.sliderControlLine.angle + (15 * Math.PI / 180) < 0) {
          this.resetArc( (2 * Math.PI + this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI));
        } else if (this.sliderControlLine.angle + (15 * Math.PI / 180) > 0) {
          this.resetArc( (this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI));
        }
      };

      this.sliderControlLine.sliderPointTouchMoveCallback = () => {
        //线的旋转角度
        this.lineTwo.rotation.z =  -(15 * Math.PI / 180 + this.sliderControlLine.angle);
        this.lineThree.rotation.z =  Math.PI / 2 - ( this.sliderControlLine.angle + 15 * Math.PI / 180);
        this.lineFour.rotation.z =  Math.PI / 2 + ( this.sliderControlLine.angle + 15 * Math.PI / 180 );
        this.rotatePointAngle.rotation.z = (((Math.PI * 2) + this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI)) / 2;
        //坐标文字旋转角度
        this.pXYZ.rotation.z = -this.sliderControlLine.angle - 12 * Math.PI / 180;
        this.p1XYZ.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.p2XYZ.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
        //P点字母旋转角度
        this.P1text.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.P2text.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
        //线对应的字母的旋转角度
        this.yellowLine.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
        this.greenLine.rotation.z = -this.sliderControlLine.angle - 105 * Math.PI / 180;

        //判断旋转角正负时候的弧度角显示
        if (this.sliderControlLine.angle + (15 * Math.PI / 180) < 0) {
          this.resetArc( (2 * Math.PI + this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI));
        } else if (this.sliderControlLine.angle + (15 * Math.PI / 180) > 0) {
          this.resetArc( (this.sliderControlLine.angle + (15 * Math.PI / 180)) % (2 * Math.PI));
        }
      };
    }

    //创建角度弧
    createArc() {
      const geometry = new THREE.CircleBufferGeometry(10, 32, 0, this.sliderControlLine.angle + (15 * Math.PI / 180));
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

    //创建线段上文字字母
    createText() {

      //创建线与圆相交的点P、yellowPoint、P2字母
      this.P1text = ThreeUtil.createImg(7, 9, p1text, 57, -8, -2);
      this.P2text = ThreeUtil.createImg(7, 9, p2text, 57, 8, -2);

      //创建P、yellowPoint、P2点的（x,y)坐标文字
      this.pXYZ = ThreeUtil.createImg(17.4, 8, p, 60, -7, 0);
      this.p1XYZ = ThreeUtil.createImg(22, 9, p1, 59, -15, -2);
      this.p2XYZ = ThreeUtil.createImg(22, 9, p2, 59, 15, -2);

      //创建线条对应的字母
      this.purpleLine = ThreeUtil.createNewRomanText('-α',  100, 0, 0, '#8325D5', 0.2);
      this.yellowLine = ThreeUtil.createImg(16, 15, yellow, 100, -15, 0);
      this.greenLine = ThreeUtil.createImg(16, 15, green, 100, 15, 0);

      //创建线条与圆相交的蓝点

      //黄线上的蓝色点
      if ((window as any).env.browserInfo.isSmallDevice) {

        this.yellowPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point1 = ThreeUtil.createPoint(10, '#0199FF', 0, 0, 0);
        this.yellowPoint.add(this.point1);
        this.lineThree.add(this.yellowPoint);

      } else if ((window as any).env.browserInfo.isIpad) {

        this.yellowPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point1 = ThreeUtil.createPoint(10, '#0199FF', 0, 0, 0);
        this.yellowPoint.add(this.point1);
        this.lineThree.add(this.yellowPoint);

      } else {

        this.yellowPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point1 = ThreeUtil.createPoint(5, '#0199FF', 0, 0, 0);
        this.yellowPoint.add(this.point1);
        this.lineThree.add(this.yellowPoint);
      }

      //绿线上的蓝色点
      if ((window as any).env.browserInfo.isSmallDevice) {
        this.greenPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point2 = ThreeUtil.createPoint(10, '#0199FF', 0, 0, 0);
        this.greenPoint.add(this.point2);
        this.lineFour.add(this.greenPoint);

      } else if ((window as any).env.browserInfo.isIpad) {
        this.greenPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point2 = ThreeUtil.createPoint(10, '#0199FF', 0, 0, 0);
        this.greenPoint.add(this.point2);
        this.lineFour.add(this.greenPoint);

      } else {
        this.greenPoint = ThreeUtil.createPoint(2, '#0199FF', 50, 0, 1);
        this.point2 = ThreeUtil.createPoint(5, '#0199FF', 0, 0, 0);
        this.greenPoint.add(this.point2);
        this.lineFour.add(this.greenPoint);
      }

      //创建对称线上字母y=x
      this.symmetry = ThreeUtil.createNewRomanText('y=x',  90, 80, 0, '#000', 0.2);


      //创建旋转的角度α的字母
      const a = ThreeUtil.createNewRomanText('α',  15, 5, 0, '#000000', 0.15);
      this.rotatePointAngle = ThreeUtil.createPlane(0.01, 0.01, '#000000', 0);
      this.rotatePointAngle.add(a);
      this.rotatePointAngle.rotation.z = 7.5 * Math.PI / 180;
      this.scene.add(this.rotatePointAngle);

      this.pXYZ.rotation.z =  -12 * Math.PI / 180;
      this.p1XYZ.rotation.z = -75 * Math.PI / 180;
      this.p2XYZ.rotation.z = -103 * Math.PI / 180;

      this.P1text.rotation.z = -75 * Math.PI / 180;
      this.P2text.rotation.z = -103 * Math.PI / 180;

      this.yellowLine.rotation.z = -75 * Math.PI / 180;
      this.greenLine.rotation.z = -105 * Math.PI / 180;

      //坐标文字隐藏
      this.p1XYZ.visible = false;
      this.p2XYZ.visible = false;

      this.lineOne.add(this.pXYZ);
      this.lineTwo.add(this.purpleLine);
      this.lineThree.add(this.p1XYZ, this.P1text, this.yellowLine);
      this.lineFour.add(this.p2XYZ, this.P2text, this.greenLine);
      this.normalline.add(this.symmetry);

    }

    //创建点击蓝点事件
    ClickPoint() {

        (this.rotatePointLine as any).on('mousedown', (event: any) => {
          this.reverse();
        });

        (this.rotatePointLine as any).on('mouseup', (event: any) => {
          console.log('抬起');
          this.reverse();

        });

        (this.yellowPoint as any).on('click', (event: any) => {
          this.P1text.visible = !this.P1text.visible;
          this.p1XYZ.visible = !this.p1XYZ.visible;
        });

        (this.greenPoint as any).on('click', (event: any) => {
          this.P2text.visible = !this.P2text.visible;
          this.p2XYZ.visible = !this.p2XYZ.visible;
        });

    }


    //解决事件前后问题
    reverse() {

      const e = this.scene.children[9];
      this.scene.children[9] = this.scene.children[10];
      this.scene.children[10] = e;

    }

    //重置按钮功能
    reset() {
      this.P1text.visible = true;
      this.P2text.visible = true;
      this.p1XYZ.visible = false;
      this.p2XYZ.visible = false;
      this.lineThree.visible = false;
      this.lineFour.visible = false;
      this.lineTwo.visible = false;
      this.rotatePointLine.rotateZ(-this.sliderControlLine.angle);
      this.lineTwo.rotateZ(this.sliderControlLine.angle);
      this.lineThree.rotateZ( this.sliderControlLine.angle);
      this.lineFour.rotateZ(-this.sliderControlLine.angle);
      this.sliderControlLine.angle = 0;
      this.resetArc(this.sliderControlLine.angle + (15 * Math.PI / 180));
      (window as any).viewHandler.viewModel.$data.fuzhuxian = false;
      (window as any).viewHandler.viewModel.$data.jia = false;
      (window as any).viewHandler.viewModel.$data.jian = false;
      (window as any).viewHandler.viewModel.$data.yuan =  false;
      (window as any).viewHandler.viewModel.$data.color1 = false;
      this.rotatePointAngle.rotation.z = 7.5 * Math.PI / 180;
      this.pXYZ.rotation.z = -this.sliderControlLine.angle - 12 * Math.PI / 180;
      this.p1XYZ.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
      this.p2XYZ.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
      this.P1text.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
      this.P2text.rotation.z = -this.sliderControlLine.angle - 103 * Math.PI / 180;
      this.yellowLine.rotation.z = this.sliderControlLine.angle - 75 * Math.PI / 180;
      this.greenLine.rotation.z = -this.sliderControlLine.angle - 105 * Math.PI / 180;

    }
}


