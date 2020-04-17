import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
const dragcontrols = require('three-dragcontrols').default;
import * as fPointImage from '../sub_static/fPointImage.png';
import * as mPointImage from '../sub_static/mPointImage.png';
import { Line } from '../../../../../src/three/component/Line';
import { Linear, TweenMax } from 'gsap';
import { PwxddyHelper } from './PwxddyHelper';

export class Pwxddy3DModel {

  scene: any;
  camera: any;
  renderer: any;

  pwxddyHelper: PwxddyHelper;

  rightGroup = new THREE.Group();
  leftGroup = new THREE.Group();
  topGroup = new THREE.Group();
  bottomGroup = new THREE.Group();

  // x轴正半轴抛物线
  parabolaXRight: any = [];

  // x轴正半轴抛物线对应的准线
  alignmentXRight: any;

  // F焦点
  fPoint: any;

  // m点
  mPoint: any;

  // m点移动轨迹点的数组
  pointGroup: THREE.Mesh[] = [];
  private count = 0;

  // 辅助线
  lineHelper = new Line();
  line1: any;
  line2: any;

  // 绘制动画
  drawAnimation: any;

  // 判断动画是否结束
  drawAnimationEnd = false;

  // 获取抛物线上的点
  // 上半抛物线
  nMaxTop: number;
  // 下半抛物线
  nMaxBottom: number;

  // 遮挡抛物线的面
  plan: THREE.Mesh;

  // 遮挡面移动的距离
  planY = 201;

  // m点最大拖动轨迹
  mPointYMax = 100;

  tween = {
    y: 100,
    planY: 0
  };

  // 准线上文字
  textAlignment: any = [];

  // 焦点f上文字
  textFPoint: any = [];

  // m点文字
  textMPoint: any;

  // n点文字
  textNPoint: any;

  // 抛物线方程
  textParabola: any = [];

  // 直角符号
  rightAngle = new THREE.Group();

  // 辅助线粗细缩放系数
  lineWidthScale = 1;

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;

    this.pwxddyHelper = new PwxddyHelper();

    this.scene.add(this.rightGroup);

    this.initAxis();
    this.initParabola();
    this.initFPoint();
    this.initAlignment();
    this.initMPoint();
    this.initTwoLine();
    this.initPlan();
    this.initAnimation();
    this.initTextParabola();
    this.initThreeScene();
  }

  // 初始化坐标轴
  initAxis() {
    const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
    this.scene.add(axis);
  }

  // 初始化 抛物线
  initParabola() {
    const length = 10;
    this.parabolaXRight[0] = this.pwxddyHelper.createParabola(2, 7);
    this.parabolaXRight[1] = this.pwxddyHelper.createParabola(4, length);
    this.parabolaXRight[2] = this.pwxddyHelper.createParabola(6, length);
    this.parabolaXRight[3] = this.pwxddyHelper.createParabola(8, length);
    this.parabolaXRight[4] = this.pwxddyHelper.createParabola(10, length);
    this.parabolaXRight[5] = this.pwxddyHelper.createParabola(12, length);
    this.parabolaXRight[6] = this.pwxddyHelper.createParabola(14, length);
    this.parabolaXRight[7] = this.pwxddyHelper.createParabola(16, length);
    this.parabolaXRight[8] = this.pwxddyHelper.createParabola(18, length);
    this.parabolaXRight[9] = this.pwxddyHelper.createParabola(20, length);

    for (let i = 0; i < this.parabolaXRight.length; i++) {
      this.rightGroup.add(this.parabolaXRight[i]);
      this.parabolaXRight[i].visible = false;
    }

    this.parabolaXRight[2].visible = true;

    this.nMaxTop = (this.parabolaXRight[2].children[0].geometry as any).attributes.position.count;
    this.nMaxBottom = (this.parabolaXRight[2].children[1].geometry as any).attributes.position.count;
  }

  // 初始化准线
  initAlignment() {
    // 添加准线
    const point = [];
    point.push(new THREE.Vector3(0, 120, -0.5));
    point.push(new THREE.Vector3(0, -120, -0.5));
    this.alignmentXRight = ThreeUtil.createTube(point, 0.5, point.length, '#EC5D57');
    this.alignmentXRight.position.x = -30;
    this.rightGroup.add(this.alignmentXRight);

    // 添加文字
    this.textAlignment[0] = ThreeUtil.createNewRomanText('x', this.alignmentXRight.position.x + 5, -100, 2, '#000000', 0.15);
    this.textAlignment[1] = ThreeUtil.createNormalText('= -3', this.textAlignment[0].position.x + 12, -100, 2, '#000000', 0.15);
    this.alignmentXRight.add(this.textAlignment[0]);
    this.alignmentXRight.add(this.textAlignment[1]);

    // 添加直角符号
    this.rightAngle.add(ThreeUtil.createTube(
      [new THREE.Vector3(0, 65, -0.5), new THREE.Vector3(5, 65, -0.5)],
      0.25, point.length, '#FFAE28'));
    this.rightAngle.add(ThreeUtil.createTube(
      [new THREE.Vector3(5, 65.25, -0.5), new THREE.Vector3(5, 60, -0.5)],
      0.25, point.length, '#FFAE28'));

    this.alignmentXRight.add(this.rightAngle);

  }

  // 创建焦点F并绑定拖动事件
  initFPoint() {
    const point1 = ThreeUtil.createPoint(2, '#0199FF', 0, 0, 1);
    this.fPoint = ThreeUtil.createImg(15, 15, fPointImage, 30, 0 );
    this.fPoint.add(point1);
    point1.position.z = 2;
    this.rightGroup.add(this.fPoint);
    this.textFPoint[0] = ThreeUtil.createNewRomanText('F', 10, -10, 2, '#000000', 0.15);
    this.textFPoint[1] = ThreeUtil.createNormalText('(3, 0)', 25, -10, 2, '#000000', 0.15);
    this.fPoint.add(this.textFPoint[0]);
    this.fPoint.add(this.textFPoint[1]);

    const dargControls1 = new dragcontrols([this.fPoint], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragstart',  () => {
      // 重置绘制动画
      this.resetAnimation();
      this.removePoint(this.pointGroup);
    } );

    dargControls1.addEventListener( 'dragend',  () => {
      if (this.fPoint.position.x === 10) {
        this.planY = 141;
        this.mPointYMax = 70;
      } else {
        this.planY = 201;
        this.mPointYMax = 100;
      }
      this.tween.y = this.mPointYMax;
      this.drawAnimation = this.createAnimation();
    } );

    dargControls1.addEventListener( 'drag',  () => {
      // 限定 f点的拖动轨迹
      this.fPoint.position.y = 0;
      if (this.fPoint.position.x  > 100) {
        this.fPoint.position.x = 100;
      } else if (this.fPoint.position.x < 10) {
        this.fPoint.position.x = 10;
      }
      this.fPoint.position.x = Math.round(this.fPoint.position.x / 10 ) * 10;

      // 移动m点
      this.mPoint.position.y = 60;
      this.mPoint.position.x = (this.mPoint.position.y / 10) * (this.mPoint.position.y / 10) / (this.fPoint.position.x / 10 * 2 * 2) * 10;

      if (this.fPoint.position.x === 10) {
        this.planY = 141;
        this.mPointYMax = 70;
      } else {
        this.planY = 201;
        this.mPointYMax = 100;
      }

      // 显示对应的抛物线 和 准线
      this.showParabola(this.fPoint.position.x / 10 - 1);
      this.alignmentXRight.position.x = -this.fPoint.position.x;
      this.textAlignment[1].text = '= ' + -this.fPoint.position.x / 10;
      this.textFPoint[1].text = '(' + this.fPoint.position.x / 10 + ', 0)';
      this.textParabola[1].text = this.fPoint.position.x / 10 * 2 * 2;

      if (this.textParabola[1].width * 0.15 < 8.4) {
        this.textParabola[2].position.x = 65;
      } else {
        this.textParabola[2].position.x = 67;
      }

      // 更新辅助线
      this.updateLine();

      // 更新直角位置
      this.rightAngle.position.y = this.mPoint.position.y - 60;
    });
  }

  // 创建点M 并绑定拖动事件
  initMPoint() {
    this.mPoint = ThreeUtil.createImg(15, 15, mPointImage, 30 + 0.6, Math.sqrt(12 * 3) * 10);
    this.rightGroup.add(this.mPoint);
    this.mPoint.position.z = 3;
    this.textMPoint = ThreeUtil.createNewRomanText('M', 0, 20, 2, '#000000', 0.15);
    this.mPoint.add(this.textMPoint);
    this.textNPoint = ThreeUtil.createNewRomanText('N', 10, this.mPoint.position.y + 15, 2, '#000000', 0.15);
    this.alignmentXRight.add(this.textNPoint);

    const dargControls1 = new dragcontrols([this.mPoint], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragend',  () => {
      if (this.drawAnimationEnd) {
        return;
      }

      // 画轨迹点
      const point9 = ThreeUtil.createPoint(1, '#000', 0, 0, 1);
      this.rightGroup.add(point9);
      point9.position.x =  this.mPoint.position.x;
      point9.position.y =  this.mPoint.position.y;
      this.pointGroup.push(point9);
      this.rightGroup.add(this.pointGroup[this.count]);
      this.pointGroup[this.count].position.z = 3;
      this.count++;
    });

    dargControls1.addEventListener( 'drag',  () => {
      // 限定 m点的拖动轨迹 旨在抛物线上移动
      if (this.mPoint.position.y  > this.mPointYMax) {
        this.mPoint.position.y = this.mPointYMax;
      } else if (this.mPoint.position.y < -this.mPointYMax) {
        this.mPoint.position.y = -this.mPointYMax;
      }
      this.mPoint.position.x = (this.mPoint.position.y / 10) * (this.mPoint.position.y / 10) /
        (this.fPoint.position.x / 10 * 2 * 2) * 10 + 0.6;

      // 更新辅助线
      this.updateLine();

      // 更新n点位置
      this.textNPoint.position.y = this.mPoint.position.y + 15;

      // 更新直角位置
      this.rightAngle.position.y = this.mPoint.position.y - 60;
    });
  }

  // 初始画遮挡面 用于遮住抛物线一点点显示 做出抛物线一点点绘制出来的假象
  initPlan() {
    const geometry = new THREE.PlaneGeometry( 240, 201, 32 );
    const material = new THREE.MeshBasicMaterial( {color: '#fff', side: THREE.DoubleSide} );
    this.plan = new THREE.Mesh( geometry, material );
    this.plan.position.z = -1;
    this.plan.position.x = 100;
    this.rightGroup.add(this.plan);
  }

  // 更新遮挡面
  updatePlan(height: number) {
    this.plan.geometry.dispose();
    this.plan.geometry = new THREE.PlaneGeometry( 240, height, 32 );
  }

  // 绘制动画
  initAnimation() {
    this.drawAnimation = this.createAnimation();
  }

  // 初始化抛物线方程文字
  initTextParabola() {
    this.textParabola[0] = ThreeUtil.createNewRomanText('y² = ', 50, 20, 2, '#000000', 0.15);
    this.textParabola[1] = ThreeUtil.createNormalText('12', 60, 20, 2, '#000000', 0.15);
    this.textParabola[2] = ThreeUtil.createNewRomanText('x', 67, 20, 2, '#000000', 0.15);
    this.textParabola[3] = ThreeUtil.createNormalText('(         )', 82, 20, 2, '#000000', 0.15);
    this.textParabola[4] = ThreeUtil.createNewRomanText('p >  ', 82, 20, 2, '#000000', 0.15);
    this.textParabola[5] = ThreeUtil.createNormalText('0', 89, 20, 2, '#000000', 0.15);
    this.rightGroup.add(this.textParabola[0]);
    this.rightGroup.add(this.textParabola[1]);
    this.rightGroup.add(this.textParabola[2]);
    this.rightGroup.add(this.textParabola[3]);
    this.rightGroup.add(this.textParabola[4]);
    this.rightGroup.add(this.textParabola[5]);

    this.textParabola[0].visible = false;
    this.textParabola[1].visible = false;
    this.textParabola[2].visible = false;
    this.textParabola[3].visible = false;
    this.textParabola[4].visible = false;
    this.textParabola[5].visible = false;
  }

  // 根据焦点f显示抛物线
  showParabola(value: number) {
    this.updatePlan(this.planY);

    for (let i = 0; i < this.parabolaXRight.length; i++) {
      this.parabolaXRight[i].visible = false;
    }
    this.parabolaXRight[value].visible = true;
  }

  // 清除绘制点
  removePoint(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      (arr[i] as any).geometry.dispose();
      (arr[i] as any).material.dispose();
      this.rightGroup.remove((arr[i] as any));
    }
    this.pointGroup = [];
    this.count = 0;
  }

  // 初始化两条辅助线
  initTwoLine() {
    if ((window as any)['env'].browserInfo.isIpad) {
      this.lineWidthScale = 1;
    } else if ((window as any)['env'].browserInfo.isIphone) {
      this.lineWidthScale = 0.3;
    }

    this.line1 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(30, 0, 0),
      endPoint: new THREE.Vector3(30, Math.sqrt(12 * 3) * 10, 0),
      lineWidth: 3,
      color: '#FF4747',
      lineWidthScale: this.lineWidthScale
    });
    this.rightGroup.add(this.line1);

    this.line2 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(-30, Math.sqrt(12 * 3) * 10, 0),
      endPoint: new THREE.Vector3(30, Math.sqrt(12 * 3) * 10, 0),
      lineWidth: 3,
      color: '#0199FF',
      lineWidthScale: this.lineWidthScale
    });
    this.rightGroup.add(this.line2);
  }

  //删除线的方法
  removeLine(line: any) {
    line.geometry.dispose();
    line.material.dispose();
    this.rightGroup.remove(line);
  }

  //重新绘制直线的方法
  drawLine(start: any, end: any, lineWidth: number, color: string): any {
    const line = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(start.x, start.y, start.z),
      endPoint: new THREE.Vector3(end.x, end.y, end.z),
      lineWidth: lineWidth,
      color: color,
      lineWidthScale: this.lineWidthScale
    });
    return line;
  }

  // 拖动F点的时候更新辅助线
  updateLine() {
    this.removeLine(this.line1);
    this.line1 = this.drawLine({x: this.fPoint.position.x, y: this.fPoint.position.y , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#FF4747');
    this.rightGroup.add(this.line1);

    this.removeLine(this.line2);
    this.line2 = this.drawLine({x: this.mPoint.position.x, y: this.mPoint.position.y , z: 1},
      {x: this.alignmentXRight.position.x, y: this.mPoint.position.y, z: 1}, 3, '#0199FF');
    this.rightGroup.add(this.line2);
  }

  // 创建动画
  createAnimation() {
    return TweenMax.to(this.tween, 3, {
      y: -this.mPointYMax,
      planY: -this.planY,
      onUpdate: () => {
        // 移动m点
        this.mPoint.position.y = this.tween.y;
        this.mPoint.position.x = (this.mPoint.position.y / 10) * (this.mPoint.position.y / 10) /
          (this.fPoint.position.x / 10 * 2 * 2) * 10 + 0.6;

        // 更新辅助线
        this.updateLine();
        // 一点点显示抛物线
        this.plan.position.y = this.tween.planY;

        // 更新n点位置
        this.textNPoint.position.y = this.mPoint.position.y + 15;

        // 更新直角位置
        this.rightAngle.position.y = this.mPoint.position.y - 60;
      },
      onComplete: () => {
        this.removePoint(this.pointGroup);
        this.drawAnimationEnd = true;

        // 显示方程
        this.textParabola[0].visible = true;
        this.textParabola[1].visible = true;
        this.textParabola[2].visible = true;
        this.textParabola[3].visible = true;
        this.textParabola[4].visible = true;
        this.textParabola[5].visible = true;
      },
      paused: true,
      ease:  Linear.easeOut,
    });
  }

  // 重置动画
  resetAnimation() {
    this.drawAnimation.progress(0);
    this.drawAnimation.pause();
    this.drawAnimationEnd = false;

    // 隐藏方程
    this.textParabola[0].visible = false;
    this.textParabola[1].visible = false;
    this.textParabola[2].visible = false;
    this.textParabola[3].visible = false;
    this.textParabola[4].visible = false;
    this.textParabola[5].visible = false;
  }

  // 隐藏右侧展示场景
  hideRightGroup() {
    this.rightGroup.visible = false;
    this.fPoint.visible = false;
    this.mPoint.visible = false;
  }

  // 显示右侧展示场景
  showRightGroup() {
    this.rightGroup.visible = true;
    this.fPoint.visible = true;
    this.mPoint.visible = true;
  }

  createTwoLine(point1: any, point2: any, point3: any) {
    const line1 = this.lineHelper.createLine({
      startPoint: point1,
      endPoint: point2,
      lineWidth: 3,
      color: '#0199FF',
      lineWidthScale: 1 / 500
    });
    this.rightGroup.add(this.line1);

    const line2 = this.lineHelper.createLine({
      startPoint: point2,
      endPoint: point3,
      lineWidth: 3,
      color: '#0199FF',
      lineWidthScale: 1 / 500
    });

    const group = new THREE.Group();
    group.add(line1);
    group.add(line2);

    return group;
  }

  // 初始化其他上下左场景
  initThreeScene() {
    this.leftGroup = this.pwxddyHelper.createLeftGroup();
    this.scene.add(this.leftGroup);

    this.bottomGroup = this.pwxddyHelper.createBottomGroup();
    this.scene.add(this.bottomGroup);

    this.topGroup = this.pwxddyHelper.createTopGroup();
    this.scene.add(this.topGroup);
  }

  // 隐藏4个场景
  hideGroup() {
    this.hideRightGroup();
    this.leftGroup.visible = false;
    this.topGroup.visible = false;
    this.bottomGroup.visible = false;
  }

  reset() {
    // 显示右展示场景
    this.hideGroup();
    this.showRightGroup();

    // 重置动画
    this.resetAnimation();

    // 移动m点和f点到初始位置
    this.mPoint.position.set(30 + 0.6, Math.sqrt(12 * 3) * 10, 3);
    this.fPoint.position.set(30, 0, 2);

    // 重置准线位置
    this.alignmentXRight.position.x = -30;

    // 重置辅助线
    this.updateLine();

    this.mPointYMax = 100;
    this.planY = 201;
    // 重写动画
    this.tween.y = this.mPointYMax;
    this.drawAnimation = this.createAnimation();

    // 更新遮挡面
    this.updatePlan(201);

    // 显示对应抛物线
    for (let i = 0; i < this.parabolaXRight.length; i++) {
      this.parabolaXRight[i].visible = false;
    }
    this.parabolaXRight[2].visible = true;

    // 删除绘制点
    this.removePoint(this.pointGroup);

    // 重置文字
    this.textAlignment[1].text = '= ' + -this.fPoint.position.x / 10;
    this.textFPoint[1].text = '(' + this.fPoint.position.x / 10 + ', 0)';

    // 更新n点位置
    this.textNPoint.position.y = this.mPoint.position.y + 15;

    // 重置方程
    this.textParabola[1].text = '12';
    this.textParabola[2].position.x = 67;

    // 更新直角位置
    this.rightAngle.position.y = this.mPoint.position.y - 60;
  }
}

