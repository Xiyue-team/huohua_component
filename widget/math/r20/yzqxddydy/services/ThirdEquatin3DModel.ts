import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as mPointImage from '../sub_static/mPointImage.png';
import { ConeCurveHelper } from './ConeCurveHelper';
import { Linear, TweenMax } from 'gsap';
const dragcontrols = require('three-dragcontrols').default;

export class ThirdEquatin3DModel {
  scene: any;
  camera: any;
  renderer: any;

  thirdEquatin: THREE.Group;

  helper: ConeCurveHelper;

  // m点
  mPoint: any;

  // 辅助线
  line1: THREE.Mesh;
  line2: THREE.Mesh;

  // m点移动轨迹点的数组
  pointGroup: THREE.Mesh[] = [];
  count = 0;

  ellioseAnimation: any;

  ellipse: THREE.Mesh;

  // 监听动画执行完
  animationEnd = false;

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;

    this.thirdEquatin = new THREE.Group();
    this.helper = new ConeCurveHelper();

    this.initEllipse();
    this.initFPoint();
    this.initMPoint();
    this.initText();
    this.initTwoLine();
    this.initDragEvent();
    this.addEllioseAnimation();
  }

  // 初始化椭圆
  initEllipse() {
    const curve = new THREE.EllipseCurve(
      0,  0,
      50, 50,
      Math.PI / 4,  Math.PI / 4 - 2 * Math.PI,
      false,
      0
    );

    const path = new THREE.Path( curve.getPoints( 3000 ) );
    const geometry = path.createPointsGeometry( 3000 );
    this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.3, geometry.vertices.length, '#000000');
    this.thirdEquatin.add(this.ellipse);
    (this.ellipse.geometry as any).setDrawRange( 0, 1 );
  }

  // 初始化f点
  initFPoint() {
    const point1 = ThreeUtil.createPoint(1.5, '#0199FF', -50, 0, 1);
    this.thirdEquatin.add(point1);

    const point2 = ThreeUtil.createPoint(1.5, '#0199FF', 50, 0, 1);
    this.thirdEquatin.add(point2);
  }

  // 初始化m点
  initMPoint() {
    this.mPoint = ThreeUtil.createImg(15, 15, mPointImage, 0, 0 );
    this.thirdEquatin.add(this.mPoint);
    this.mPoint.position.set(35, 35, 0);
  }

  initText() {
    const mText = ThreeUtil.createNewRomanText('M', 13, 2, 0, '#000000', 0.15);
    this.mPoint.add(mText);

    const f1Text = ThreeUtil.createNewRomanText('F₁', -55, -5, 0, '#000000', 0.15);
    this.thirdEquatin.add(f1Text);

    const f2Text = ThreeUtil.createNewRomanText('F₂', 55, -5, 0, '#000000', 0.15);
    this.thirdEquatin.add(f2Text);
  }

  // 添加辅助线
  initTwoLine() {
    this.line1 = this.helper.drawLine({x: 0, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#F5A623');
    this.thirdEquatin.add(this.line1);
  }

  initDragEvent() {
    const dargControls1 = new dragcontrols([this.mPoint], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragstart',  () => {

    });

    dargControls1.addEventListener( 'dragend',  () => {
      if (this.animationEnd) {
        return;
      }
      // 画轨迹点
      const point9 = ThreeUtil.createPoint(1.5, '#0199FF', this.mPoint.position.x, this.mPoint.position.y, 1);
      point9.position.z =  3;
      this.pointGroup.push(point9);
      this.thirdEquatin.add(this.pointGroup[this.count]);
      this.count++;
    });

    let pointX = 0;
    let pointY = 30;
    dargControls1.addEventListener( 'drag',  (pos: any) => {

      // 限制m点的拖动轨迹为椭圆
      if (pos.object.position.x > 0) {
        pointX = this.sliderPoint(50, 50, pos.object.position.x, pos.object.position.y);
        pointY = pos.object.position.y / pos.object.position.x * pointX;
      } else if (pos.object.position.x < 0) {
        pointX = -this.sliderPoint(50, 50, pos.object.position.x, pos.object.position.y);
        pointY = pos.object.position.y / pos.object.position.x * pointX;
      } else {
        pointX = 0;
        if (pos.object.position.y > 0) {
          pointY = 50;
        } else {
          pointY = -50;
        }
      }

      this.mPoint.position.set(pointX, pointY, 0);

      // 重置绘制辅助线
      this.updateTwoLine();
    });
  }

  // 设置m点在椭圆上的滑点
  sliderPoint(a: number, b: number, mouseX: number, mouseY: number) {
    return Math.sqrt(1 / ( 1 / (a * a) + (mouseY * mouseY) / (mouseX * mouseX * b * b)));
  }

  // 计算椭圆与过原点的直线的焦点
  getIntersection(a: number, b: number, angle: number) {

    return Math.sqrt(1 / ( 1 / (a * a) + (Math.tan(angle) * Math.tan(angle) / (b * b))));
  }

  // 更新辅助线
  updateTwoLine() {
    this.helper.removeLine(this.line1, this.thirdEquatin);
    this.line1 = this.helper.drawLine({x: 0, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#F5A623');
    this.thirdEquatin.add(this.line1);
  }

  addEllioseAnimation() {
    const tween = {
      nMax: 0
    };

    this.ellioseAnimation = TweenMax.to(tween, 3, {
      nMax: (this.ellipse.geometry as any).attributes.position.count - 1,
      onUpdate: () => {
        // 绘制圆
        (this.ellipse.geometry as any).setDrawRange( 0, tween.nMax );
        // 移动m点
        this.mPoint.position.x = (this.ellipse.geometry as any).attributes.position.array[Math.floor(tween.nMax) * 3];
        this.mPoint.position.y = (this.ellipse.geometry as any).attributes.position.array[Math.floor(tween.nMax) * 3 + 1];
        // 更新辅助线
        this.updateTwoLine();
      },
      onComplete: () => {
        this.helper.removePoint(this.pointGroup, this.count, this.thirdEquatin);
        this.animationEnd = true;
      },
      paused: true,
      ease:  Linear.easeIn,
    });
  }

  startEllioseAnimation() {
    this.ellioseAnimation.play();
  }

  resetAnimation() {
    this.ellioseAnimation.progress(0);
    this.ellioseAnimation.pause();
  }

  reset() {
    // 重置点的位置
    this.mPoint.position.set(35, 35, 0);
    // 删除绘制点
    this.helper.removePoint(this.pointGroup, this.count, this.thirdEquatin);
    // 更新辅助线
    this.updateTwoLine();
    // 重置动画
    this.resetAnimation();
    this.animationEnd = false;
  }
}

