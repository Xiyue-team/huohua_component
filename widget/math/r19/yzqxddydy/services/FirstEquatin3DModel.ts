import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as mPointImage from '../sub_static/mPointImage.png';
import { ConeCurveHelper } from './ConeCurveHelper';
import { Linear, TweenMax } from 'gsap';
const dragcontrols = require('three-dragcontrols').default;

export class FirstEquatin3DModel {
  scene: any;
  camera: any;
  renderer: any;

  firstEquatin: THREE.Group;

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

    this.firstEquatin = new THREE.Group();
    this.helper = new ConeCurveHelper();

    this.initEllipse();
    this.initFPoint();
    this.initMPoint();
    this.initTwoLine();
    this.initText();
    this.initDragEvent();
    this.addEllioseAnimation();
  }

  // 初始化椭圆
  initEllipse() {
    const curve = new THREE.EllipseCurve(
      0,  0,
      50, 30,
      Math.PI / 2,  Math.PI / 2 - 2 * Math.PI,
      true,
      0
    );

    const path = new THREE.Path( curve.getPoints( 3000 ) );
    const geometry = path.createPointsGeometry( 3000 );
    this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.3, geometry.vertices.length, '#000000');
    this.firstEquatin.add(this.ellipse);
    (this.ellipse.geometry as any).setDrawRange( 0, 1 );
  }

  // 初始化f点
  initFPoint() {
    const point1 = ThreeUtil.createPoint(1.5, '#0199FF', -40, 0, 1);
    this.firstEquatin.add(point1);

    const point2 = ThreeUtil.createPoint(1.5, '#0199FF', 40, 0, 1);
    this.firstEquatin.add(point2);
  }

  // 初始化m点
  initMPoint() {
    this.mPoint = ThreeUtil.createImg(15, 15, mPointImage, 0, 0 );
    this.firstEquatin.add(this.mPoint);
    this.mPoint.position.set(0, 30, 0);
  }

  initText() {
    const mText = ThreeUtil.createNewRomanText('M', 13, 13, 0, '#000000', 0.12);
    this.mPoint.add(mText);

    const f1Text = ThreeUtil.createNewRomanText('F₁', -40, -7, 0, '#000000', 0.12);
    this.firstEquatin.add(f1Text);
    const f1Text2 = ThreeUtil.createNormalText('(-4, 0)', -28, -7, 0, '#000000', 0.12);
    this.firstEquatin.add(f1Text2);

    const f2Text = ThreeUtil.createNewRomanText('F₂', 40, -7, 0, '#000000', 0.12);
    this.firstEquatin.add(f2Text);
    const f2Text2 = ThreeUtil.createNormalText('(4, 0)', 51, -7, 0, '#000000', 0.12);
    this.firstEquatin.add(f2Text2);
  }

  // 添加红蓝辅助线
  initTwoLine() {
    this.line1 = this.helper.drawLine({x: -40, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#FF4747');

    this.line2 = this.helper.drawLine({x: 40, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#0199FF');

    this.firstEquatin.add(this.line1);
    this.firstEquatin.add(this.line2);
  }

  initDragEvent() {
    const dargControls1 = new dragcontrols([this.mPoint], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragstart',  () => {

    });

    dargControls1.addEventListener( 'dragend',  (pos: any) => {
      if (this.animationEnd) {
        return;
      }
      // 画轨迹点
      const point9 = ThreeUtil.createPoint(1.5, '#000000', this.mPoint.position.x, this.mPoint.position.y, 1);
      point9.position.z =  3;
      this.pointGroup.push(point9);
      this.firstEquatin.add(this.pointGroup[this.count]);
      this.count++;
    });

    let pointX = 0;
    let pointY = 30;
    dargControls1.addEventListener( 'drag',  (pos: any) => {

      // 限制m点的拖动轨迹为椭圆
      if (pos.object.position.x > 0) {
        pointX = this.sliderPoint(50, 30, pos.object.position.x, pos.object.position.y);
        pointY = pos.object.position.y / pos.object.position.x * pointX;
      } else if (pos.object.position.x < 0) {
        pointX = -this.sliderPoint(50, 30, pos.object.position.x, pos.object.position.y);
        pointY = pos.object.position.y / pos.object.position.x * pointX;
      } else {
        pointX = 0;
        if (pos.object.position.y > 0) {
          pointY = 30;
        } else {
          pointY = -30;
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
    this.helper.removeLine(this.line1, this.firstEquatin);
    this.helper.removeLine(this.line2, this.firstEquatin);
    this.line1 = this.helper.drawLine({x: -40, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#FF4747');

    this.line2 = this.helper.drawLine({x: 40, y: 0 , z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#0199FF');
    this.firstEquatin.add(this.line1);
    this.firstEquatin.add(this.line2);
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
        this.helper.removePoint(this.pointGroup, this.count, this.firstEquatin);
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

  // 重置
  reset() {
    // 重置点的位置
    this.mPoint.position.set(0, 30, 0);
    (this.mPoint.material as any).opacity = 1;
    // 删除绘制点
    this.helper.removePoint(this.pointGroup, this.count, this.firstEquatin);
    // 更新辅助线
    this.updateTwoLine();
    // 重置动画
    this.resetAnimation();

    this.animationEnd = false;
  }
}

