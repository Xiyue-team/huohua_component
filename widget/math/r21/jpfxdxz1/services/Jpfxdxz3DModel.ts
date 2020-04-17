import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as mPointImage from '../sub_static/mPointImage.png';
import * as bisectorImage from '../sub_static/bisectorImage.png';
import { JpfxdxzHelper } from './JpfxdxzHelper';
const dragcontrols = require('three-dragcontrols').default;

export class Jpfxdxz3DModel {
  scene: any;
  camera: any;
  renderer: any;

  thirdEquatin: THREE.Group;

  helper: JpfxdxzHelper;

  // 角的两个端点m点
  mPoint: any;
  // 角的两个端点m点
  nPoint: any;

  // 点D
  dPoint: any;

  // 角的两边
  line1: THREE.Mesh;
  line2: THREE.Mesh;

  ellipse: THREE.Mesh;

  // 扇形角
  sector1: any;
  sector2: any;
  // 为了加粗线条
  sector1_2: any;
  sector2_2: any;

  // 垂线
  vertical1: THREE.Mesh;
  vertical2: THREE.Mesh;

  // 直角
  rightAngle1: any = [];
  rightAngle2: any = [];

  // 等分线
  bisector1: any;
  bisector2: any;

  // 等分线旋转角
  startAngle: number;
  endAngle: number;

  // 文字
  bText: any;
  cText: any;

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;

    this.thirdEquatin = new THREE.Group();
    this.helper = new JpfxdxzHelper();
    this.scene.add(this.thirdEquatin);

    this.initAngularBisector();
    this.initMNPoint();
    this.initTwoLine();
    this.initSector();
    this.initDPoint();
    this.initVertical();
    this.initRightAngle();
    this.initBisectorImage();
    this.initText();
    this.initMDragEvent();
    this.initDDragEvent();
  }

  // 初始化角平分线
  initAngularBisector() {
    const line = this.helper.drawLine({x: -35.2, y: 0 , z: 1},
      {x: 50, y: 0, z: 1}, 3, '#040404');
    this.thirdEquatin.add(line);
  }

  // 初始化角的端点
  initMNPoint() {
    this.mPoint = ThreeUtil.createImg(10, 10, mPointImage, 0, 0 );
    this.thirdEquatin.add(this.mPoint);
    this.mPoint.position.set(0, 35, 0);

    this.nPoint = ThreeUtil.createImg(15, 15, mPointImage, 0, 0 );
    this.thirdEquatin.add(this.nPoint);
    this.nPoint.position.set(0, -35, 0);
    this.nPoint.visible = false;

    this.startAngle = Math.atan(this.mPoint.position.y / (this.mPoint.position.x + 35));
    this.endAngle = Math.atan(this.mPoint.position.y / (this.mPoint.position.x + 35));
  }

  initText() {
    const aText = ThreeUtil.createNewRomanText('A', -40, 0, 0, '#000000', 0.15);
    this.thirdEquatin.add(aText);

    const dText = ThreeUtil.createNewRomanText('D', 5, 0, 0, '#000000', 0.15);
    this.dPoint.add(dText);

    this.bText = ThreeUtil.createNewRomanText('B', 0, 0, 0, '#000000', 0.15);
    this.thirdEquatin.add(this.bText);
    this.bText.position.set(-17.5 - 5, -17.5, 0);

    this.cText = ThreeUtil.createNewRomanText('C', 0, 0, 0, '#000000', 0.15);
    this.thirdEquatin.add(this.cText);
    this.cText.position.set(-17.5 - 5, 17.5 + 5, 0);
  }

  // 添加角的两边
  initTwoLine() {
    this.line1 = this.helper.drawLine({x: -35, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#040404');
    this.thirdEquatin.add(this.line1);

    this.line2 = this.helper.drawLine({x: -35, y: 0 , z: 1},
      {x: this.nPoint.position.x, y: this.nPoint.position.y, z: 1}, 3, '#040404');
    this.thirdEquatin.add(this.line2);
  }

  // 初始化两个扇形角
  initSector() {
    const k1 = this.mPoint.position.y / (this.mPoint.position.x + 35);

    // k1所在边的倾斜角
    const angle1 = Math.atan(k1);

    this.sector1 = this.drawArcLine(0, angle1, false, 6);
    this.sector1.position.x = -35;
    this.thirdEquatin.add(this.sector1);
    this.sector1_2 = this.drawArcLine(0, angle1, false, 6.15);
    this.sector1_2.position.x = -35;
    this.thirdEquatin.add(this.sector1_2);

    this.sector2 = this.drawArcLine(0, -angle1, true, 5);
    this.sector2.position.x = -35;
    this.thirdEquatin.add(this.sector2);
    this.sector2_2 = this.drawArcLine(0, -angle1, true, 5.15);
    this.sector2_2.position.x = -35;
    this.thirdEquatin.add(this.sector2_2);
  }

  //绘制角度弧线
  drawArcLine(startAngle: number, endAngle: number, clockwise?: boolean, width?: number ) {
    const curve = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      width, width,           // xRadius, yRadius
      startAngle,  endAngle,  // aStartAngle, aEndAngle
      clockwise,            // aClockwise
      0                 // aRotation
    );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : '#000000'} );
    const ellipse = new THREE.Line( geometry, material );

    console.log('ellipse', ellipse);

    return ellipse;
  }

  updateSector() {
    const k1 = this.mPoint.position.y / (this.mPoint.position.x + 35);

    // k1所在边的倾斜角
    const angle1 = Math.atan(k1);

    const curve = new THREE.EllipseCurve(0, 0, 6, 6, 0,  angle1, false, 0);
    const points = curve.getPoints( 50 );
    this.sector1.geometry.dispose();
    this.sector1.geometry = new THREE.BufferGeometry().setFromPoints( points );
    const curve1 = new THREE.EllipseCurve(0, 0, 6.15, 6.15, 0,  angle1, false, 0);
    const points1 = curve1.getPoints( 50 );
    this.sector1_2.geometry.dispose();
    this.sector1_2.geometry = new THREE.BufferGeometry().setFromPoints( points1 );

    const curve2 = new THREE.EllipseCurve(0, 0, 5, 5, 0,  -angle1, true, 0);
    const points2 = curve2.getPoints( 50 );
    this.sector2.geometry.dispose();
    this.sector2.geometry = new THREE.BufferGeometry().setFromPoints( points2 );
    const curve2_2 = new THREE.EllipseCurve(0, 0, 5.15, 5.15, 0,  -angle1, true, 0);
    const points2_2 = curve2_2.getPoints( 50 );
    this.sector2_2.geometry.dispose();
    this.sector2_2.geometry = new THREE.BufferGeometry().setFromPoints( points2_2 );
  }

  // 初始化d点
  initDPoint() {
    this.dPoint = ThreeUtil.createImg(10, 10, mPointImage, 0, 0 );
    this.thirdEquatin.add(this.dPoint);
    this.dPoint.position.set(0, 0, 0);
  }

  // 初始化点D到角两边的垂线
  initVertical() {
    const x = this.getIntersectionX();
    const k = -1 / (this.mPoint.position.y / (this.mPoint.position.x + 35));
    this.vertical1 = this.helper.drawLine({x: x, y: k * x, z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 5, '#0199ff');
    this.thirdEquatin.add(this.vertical1);

    this.vertical2 = this.helper.drawLine({x: x, y: -k * x, z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 5, '#0199ff');
    this.thirdEquatin.add(this.vertical2);
  }

  // 初始化直角
  initRightAngle() {
    // 直角两个边交点的坐标
    const x = this.getRightAngleXY()[0];
    const y = this.getRightAngleXY()[1];

    const x1 = this.getAngleXY()[0];
    const y1 = this.getAngleXY()[1];
    const x2 = this.getAngleXY()[2];
    const y2 = this.getAngleXY()[3];

    // 上边的直角
    this.rightAngle1[0] = this.helper.drawLine({x: x1, y: y1, z: 1},
      {x: x, y: y, z: 1}, 2, '#000000');

    this.rightAngle1[1] = this.helper.drawLine({x: x2, y: y2, z: 1},
      {x: x, y: y, z: 1}, 2, '#000000');

    // 下边的直角
    this.rightAngle2[0] = this.helper.drawLine({x: x1, y: -y1, z: 1},
      {x: x, y: -y, z: 1}, 2, '#000000');

    this.rightAngle2[1] = this.helper.drawLine({x: x2, y: -y2, z: 1},
      {x: x, y: -y, z: 1}, 2, '#000000');

    this.thirdEquatin.add(this.rightAngle1[0]);
    this.thirdEquatin.add(this.rightAngle1[1]);
    this.thirdEquatin.add(this.rightAngle2[0]);
    this.thirdEquatin.add(this.rightAngle2[1]);
  }

  // 初始化等分线
  initBisectorImage() {
    // 上等分线
    this.bisector1 = ThreeUtil.createImg(6, 4.5, bisectorImage, 0, 0 );
    this.bisector1.rotateZ(Math.PI / 180 * 20);
    this.thirdEquatin.add(this.bisector1);
    const x = this.getIntersectionX();
    const k = -1 / (this.mPoint.position.y / (this.mPoint.position.x + 35));
    const y = k * x + this.dPoint.position.y - k * this.dPoint.position.x;
    this.bisector1.position.set((x + this.dPoint.position.x) / 2, (y + this.dPoint.position.y) / 2, 0);

    // 下等分线
    this.bisector2 = ThreeUtil.createImg(6, 4.5, bisectorImage, 0, 0 );
    this.bisector2.rotateZ(Math.PI / 180 * 100);
    this.thirdEquatin.add(this.bisector2);
    this.bisector2.position.set((x + this.dPoint.position.x) / 2, -(y + this.dPoint.position.y) / 2, 0);
  }

  // 初始m点的拖动事件
  initMDragEvent() {
    const dargControls1 = new dragcontrols([this.mPoint], this.camera, this.renderer.domElement);
    dargControls1.addEventListener( 'drag',  () => {

      if (this.mPoint.position.x > 13) {
        this.mPoint.position.x = 13;
      } else if (this.mPoint.position.x < -25) {
        this.mPoint.position.x = -25;
      }
      this.mPoint.position.y = Math.sqrt(50 * 50 - (this.mPoint.position.x + 35) * (this.mPoint.position.x + 35));

      this.nPoint.position.set(this.mPoint.position.x, -this.mPoint.position.y, 0);

      // 重置角的两边
      this.updateTwoLine();

      // 更新垂线
      this.updateVertical();

      this.updateRightAngle();

      this.updateSector();

      // 更新等分线
      this.updateBisectorImage();
    });
  }

  // 初始化d点的拖动事件
  initDDragEvent() {
    const dargControls1 = new dragcontrols([this.dPoint], this.camera, this.renderer.domElement);
    dargControls1.addEventListener( 'drag',  () => {

      this.dPoint.position.y = 0;
      if (this.dPoint.position.x > 10) {
        this.dPoint.position.x = 10;
      } else if (this.dPoint.position.x < -10) {
        this.dPoint.position.x = -10;
      }

      // 更新垂线
      this.updateVertical();

      // 更新直角
      this.updateRightAngle();

      // 更新等分线
      this.updateBisectorImage();
    });
  }

  // 更新角的两边
  updateTwoLine() {
    this.helper.removeLine(this.line1, this.thirdEquatin);
    this.line1 = this.helper.drawLine({x: -35, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#040404');
    this.thirdEquatin.add(this.line1);

    this.helper.removeLine(this.line2, this.thirdEquatin);
    this.line2 = this.helper.drawLine({x: -35, y: 0 , z: 1},
      {x: this.nPoint.position.x, y: this.nPoint.position.y, z: 1}, 3, '#040404');
    this.thirdEquatin.add(this.line2);
  }

  // 更新垂线
  updateVertical() {
    // 垂线斜率
    const k = -1 / (this.mPoint.position.y / (this.mPoint.position.x + 35));
    // 交点坐标
    const x = this.getIntersectionX();
    const y = k * x + this.dPoint.position.y - k * this.dPoint.position.x;

    // 更新垂线
    this.helper.removeLine(this.vertical1, this.thirdEquatin);
    this.vertical1 = this.helper.drawLine({x: x, y: y, z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 5, '#0199ff');
    this.thirdEquatin.add(this.vertical1);

    this.helper.removeLine(this.vertical2, this.thirdEquatin);
    this.vertical2 = this.helper.drawLine({x: x, y: -y, z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 5, '#0199ff');
    this.thirdEquatin.add(this.vertical2);

    // 更新文字
    this.bText.position.set(x - 5, -y, 0);
    this.cText.position.set(x - 5, y + 5, 0);
  }

  // 更新直角
  updateRightAngle() {
    // 直角两个边交点的坐标
    const x = this.getRightAngleXY()[0];
    const y = this.getRightAngleXY()[1];

    // 直角两个边和垂线以及角边的交点的坐标
    const x1 = this.getAngleXY()[0];
    const y1 = this.getAngleXY()[1];
    const x2 = this.getAngleXY()[2];
    const y2 = this.getAngleXY()[3];

    // 更新直角
    this.helper.removeLine(this.rightAngle1[0], this.thirdEquatin);
    this.helper.removeLine(this.rightAngle1[1], this.thirdEquatin);
    this.helper.removeLine(this.rightAngle2[0], this.thirdEquatin);
    this.helper.removeLine(this.rightAngle2[1], this.thirdEquatin);

    // 上边的直角
    this.rightAngle1[0] = this.helper.drawLine({x: x1, y: y1, z: 1},
      {x: x, y: y, z: 1}, 2, '#000000');

    this.rightAngle1[1] = this.helper.drawLine({x: x2, y: y2, z: 1},
      {x: x, y: y, z: 1}, 2, '#000000');

    // 下边的直角
    this.rightAngle2[0] = this.helper.drawLine({x: x1, y: -y1, z: 1},
      {x: x, y: -y, z: 1}, 2, '#000000');

    this.rightAngle2[1] = this.helper.drawLine({x: x2, y: -y2, z: 1},
      {x: x, y: -y, z: 1}, 2, '#000000');

    this.thirdEquatin.add(this.rightAngle1[0]);
    this.thirdEquatin.add(this.rightAngle1[1]);
    this.thirdEquatin.add(this.rightAngle2[0]);
    this.thirdEquatin.add(this.rightAngle2[1]);
  }

  // 更新等分线位置和角度
  updateBisectorImage() {
    // 垂线斜率
    const k = -1 / (this.mPoint.position.y / (this.mPoint.position.x + 35));

    // 垂线和边的交点坐标
    const x = this.getIntersectionX();
    const y = k * x + this.dPoint.position.y - k * this.dPoint.position.x;

    this.endAngle = Math.atan(this.mPoint.position.y / (this.mPoint.position.x + 35));

    // 上等分线
    this.bisector1.position.set((x + this.dPoint.position.x) / 2, (y + this.dPoint.position.y) / 2, 0);
    this.bisector1.rotateZ(this.endAngle - this.startAngle);

    // 下等分线
    this.bisector2.position.set((x + this.dPoint.position.x) / 2, -(y + this.dPoint.position.y) / 2, 0);
    this.bisector2.rotateZ(-this.endAngle + this.startAngle);

    this.startAngle = this.endAngle;
  }

  // 计算角上边和垂线的交点横坐标
  getIntersectionX() {
    // 斜率
    const k1 = this.mPoint.position.y / (this.mPoint.position.x + 35);
    const k2 = -1 / k1;

    const my = this.mPoint.position.y;
    const mx = this.mPoint.position.x;

    const dy = this.dPoint.position.y;
    const dx = this.dPoint.position.x;

    const x = ((dy - dx * k2) - (my - mx * k1)) / (k1 - k2);

    return x;
  }

  // 计算直角的两个边的交点
  getRightAngleXY() {
    this.getAngleXY();

    // 斜率
    const k1 = this.mPoint.position.y / (this.mPoint.position.x + 35);
    const k2 = -1 / k1;

    const x = (this.getAngleXY()[3] - k1 * this.getAngleXY()[2] - this.getAngleXY()[1] + k2 * this.getAngleXY()[0]) / (k2 - k1);

    const y = k1 * x + this.getAngleXY()[3] - k1 * this.getAngleXY()[2];

    return [x, y];
  }

  // 计算直角在个边上点的坐标
  getAngleXY() {
    const my = this.mPoint.position.y;
    const mx = this.mPoint.position.x;

    const dy = this.dPoint.position.y;
    const dx = this.dPoint.position.x;

    // 斜率
    const k1 = this.mPoint.position.y / (this.mPoint.position.x + 35);

    const k2 = -1 / k1;

    // k1所在边的倾斜角
    const angle1 = Math.atan(k1);

    // 直角边的长度
    const r = 4;

    // 计算直角边在角的边上的点的坐标
    // 长度差
    const l = Math.cos(angle1) * r;

    const x1 = this.getIntersectionX() + l;
    const y1 = k1 * x1 + my - k1 * mx;

    // 计算直角在垂线上的点的坐标
    // k2 所在边的倾斜角
    const angle2 = Math.atan(k2) * 180 / Math.PI + 180;

    // 计算直角边的x坐标
    // 长度差
    const l2 = Math.cos(angle2 * Math.PI / 180) * r;

    const x2 = this.getIntersectionX() - l2;
    const y2 = k2 * x2 + dy - k2 * dx;

    return [x1, y1, x2, y2];
  }

  reset() {
    // 重置点的位置
    this.mPoint.position.set(0, 35, 0);
    this.nPoint.position.set(this.mPoint.position.x, -this.mPoint.position.y, 0);
    this.dPoint.position.set(0, 0, 0);


    // 更新垂线
    this.updateVertical();

    this.updateRightAngle();

    this.updateSector();

    // 更新等分线
    this.updateBisectorImage();

    // 重置角的两边
    this.updateTwoLine();
  }
}


