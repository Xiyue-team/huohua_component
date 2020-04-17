import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as mPointImage from '../sub_static/mPointImage.png';
import { ConeCurveHelper } from './ConeCurveHelper';
import { Linear, TweenMax } from 'gsap';
const dragcontrols = require('three-dragcontrols').default;

export class SecondEquatin3DModel2 {
  scene: any;
  camera: any;
  renderer: any;

  secondEquatin: THREE.Group;

  helper: ConeCurveHelper;

  hyperbolaLeft: THREE.Mesh;
  hyperbolaRight: THREE.Mesh;

  // 右侧m点
  mPoint: THREE.Mesh;
  // 左侧m点
  mPoint2: THREE.Mesh;

  // m点移动轨迹点的数组
  pointGroup: THREE.Mesh[] = [];
  count = 0;

  // 辅助线
  line1: any;
  line2: any;

  // 遮挡面
  planeLeft: THREE.Mesh;
  planeRight: THREE.Mesh;

  // 动画
  hyperbolaAnimation: any = [];

  // 监听动画执行完
  animationEnd = true;

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;

    this.secondEquatin = new THREE.Group();
    this.helper = new ConeCurveHelper();

    this.initHyperbola();
    this.initFPoint();
    this.initMPoint();
    this.initPlane();
    this.initTwoLine();
    this.initText();
    this.initDragEvent();
    this.initDragEvent2();
    this.addEllioseAnimation();
  }

  // 初始化双曲线
  initHyperbola() {
    // 获取双曲线上的点
    const pointLeft = [];
    const pointRight = [];
    for (let i = 70; i > -70; i--) {
      pointLeft.push(new THREE.Vector3(i, -30 / 40 * Math.sqrt((40 * 40 + i * i)), -2));
      pointRight.push(new THREE.Vector3(i, 30 / 40 * Math.sqrt((40 * 40 + i * i)), -2));
    }

    // 绘制左侧双曲线
    this.hyperbolaLeft = ThreeUtil.createTube(pointLeft, 0.3, pointLeft.length, '#000000');
    this.secondEquatin.add(this.hyperbolaLeft);

    // 绘制右侧双曲线
    this.hyperbolaRight = ThreeUtil.createTube(pointRight, 0.3, pointRight.length, '#000000');
    this.secondEquatin.add(this.hyperbolaRight);
  }

  // 初始化f点
  initFPoint() {
    const point1 = ThreeUtil.createPoint(1.5, '#0199FF', 0, -50, 1);
    this.secondEquatin.add(point1);

    const point2 = ThreeUtil.createPoint(1.5, '#0199FF', 0, 50, 1);
    this.secondEquatin.add(point2);

  }

  // 初始化m点
  initMPoint() {
    this.mPoint = ThreeUtil.createImg(15, 15, mPointImage, 0, 0 );
    this.secondEquatin.add(this.mPoint);
    this.mPoint.position.set(53, -50, 0);

    this.mPoint2 = ThreeUtil.createImg(15, 15, mPointImage, 0, 30 );
    (this.mPoint2.material as any).opacity = 0.5;
    this.secondEquatin.add(this.mPoint2);
  }

  // 初始化遮挡面 用于遮挡双曲线做动画用
  initPlane() {
    this.planeLeft = ThreeUtil.createPlane(140, 100, '#fff', 1);
    this.planeLeft.position.set(0, 50, -1);
    (this.planeLeft.material as any).transparent = false;
    this.secondEquatin.add(this.planeLeft);

    this.planeRight = ThreeUtil.createPlane(140, 100, '#fff', 1);
    this.planeRight.position.set(0, -50, -1);
    (this.planeRight.material as any).transparent = false;
    this.secondEquatin.add(this.planeRight);
    this.planeLeft.visible = false;
    this.planeRight.visible = false;
  }

  // 添加红蓝辅助线
  initTwoLine() {
    this.line1 = this.helper.drawLine({x: 0, y: 50, z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#FF4747');

    this.line2 = this.helper.drawLine({x: 0, y: -50, z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#0199FF');

    this.secondEquatin.add(this.line1);
    this.secondEquatin.add(this.line2);
  }

  // 初始化文字
  initText() {
    const mText = ThreeUtil.createNewRomanText('M', 13, 2, 0, '#000000', 0.15);
    this.mPoint.add(mText);

    const f1Text = ThreeUtil.createNewRomanText('F₁', -10, 50, 0, '#000000', 0.15);
    this.secondEquatin.add(f1Text);

    const f2Text = ThreeUtil.createNewRomanText('F₂', -10, -50, 0, '#000000', 0.15);
    this.secondEquatin.add(f2Text);
  }

  initDragEvent() {
    const dargControls1 = new dragcontrols([this.mPoint], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragstart',  () => {
      (this.mPoint2.material as any).opacity = 0.5;
      (this.mPoint.material as any).opacity = 1;
    });

    dargControls1.addEventListener( 'dragend',  (pos: any) => {
      if (this.animationEnd) {
        return;
      }

      // 画轨迹点
      const point9 = ThreeUtil.createPoint(1.5, '#000000', this.mPoint.position.x, this.mPoint.position.y, 1);
      point9.position.z =  3;
      this.pointGroup.push(point9);
      this.secondEquatin.add(this.pointGroup[this.count]);
      this.count++;
    });

    dargControls1.addEventListener( 'drag',  (pos: any) => {
      // 限制m点的拖动轨迹
      if (this.mPoint.position.x > 70) {
        this.mPoint.position.x = 70;
      } else if (this.mPoint.position.x < -70) {
        this.mPoint.position.x = -70;
      }
      this.mPoint.position.y = -30 / 40 * Math.sqrt((40 * 40 + this.mPoint.position.x * this.mPoint.position.x));

      // 更新辅助线
      this.updateTwoLine();

    });
  }

  initDragEvent2() {
    const dargControls1 = new dragcontrols([this.mPoint2], this.camera, this.renderer.domElement);

    dargControls1.addEventListener( 'dragstart',  () => {
      (this.mPoint.material as any).opacity = 0.5;
      (this.mPoint2.material as any).opacity = 1;
    });

    dargControls1.addEventListener( 'dragend',  (pos: any) => {
      if (this.animationEnd) {
        return;
      }

      // 画轨迹点
      const point9 = ThreeUtil.createPoint(1.5, '#000000', this.mPoint2.position.x, this.mPoint2.position.y, 1);
      point9.position.z =  3;
      this.pointGroup.push(point9);
      this.secondEquatin.add(this.pointGroup[this.count]);
      this.count++;
    });

    dargControls1.addEventListener( 'drag',  (pos: any) => {
      // 限制m点的拖动轨迹
      if (this.mPoint2.position.x > 70) {
        this.mPoint2.position.x = 70;
      } else if (this.mPoint2.position.x < -70) {
        this.mPoint2.position.x = -70;
      }
      this.mPoint2.position.y = 30 / 40 * Math.sqrt((40 * 40 + this.mPoint2.position.x * this.mPoint2.position.x));

      // 更新辅助线
      this.updateTwoLine2();

    });
  }

  // 更新mPoint辅助线
  updateTwoLine() {
    this.helper.removeLine(this.line1, this.secondEquatin);
    this.helper.removeLine(this.line2, this.secondEquatin);
    this.line1 = this.helper.drawLine({x: 0, y: 50, z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#FF4747');

    this.line2 = this.helper.drawLine({x: 0, y: -50, z: 1},
      {x: this.mPoint.position.x, y: this.mPoint.position.y, z: 1}, 3, '#0199FF');
    this.secondEquatin.add(this.line1);
    this.secondEquatin.add(this.line2);
  }

  // 更新mPoint2辅助线
  updateTwoLine2() {
    this.helper.removeLine(this.line1, this.secondEquatin);
    this.helper.removeLine(this.line2, this.secondEquatin);
    this.line1 = this.helper.drawLine({x: 0, y: 50, z: 1},
      {x: this.mPoint2.position.x, y: this.mPoint2.position.y, z: 1}, 3, '#FF4747');

    this.line2 = this.helper.drawLine({x: 0, y: -50, z: 1},
      {x: this.mPoint2.position.x, y: this.mPoint2.position.y, z: 1}, 3, '#0199FF');
    this.secondEquatin.add(this.line1);
    this.secondEquatin.add(this.line2);
  }

  addEllioseAnimation() {
    const tween = {
      x: 70,
      planeY: 0,
    };

    this.hyperbolaAnimation[0] = TweenMax.to(tween, 3, {
      x: -70,
      planeY: -140,
      onUpdate: () => {
        // 绘制双曲线
        this.planeRight.position.x = tween.planeY;

        // 移动m点
        this.mPoint.position.x = tween.x;
        this.mPoint.position.y = -30 / 40 * Math.sqrt((40 * 40 + tween.x * tween.x));

        // 更新辅助线
        this.updateTwoLine();
      },
      onComplete: () => {
        this.helper.removePoint(this.pointGroup, this.count, this.secondEquatin);
        this.animationEnd = true;
        this.hyperbolaAnimation[1].play();
      },
      paused: true,
      ease:  Linear.easeIn,
    });


    const tween2 = {
      x: 70,
      planeY: 0,
    };

    this.hyperbolaAnimation[1] = TweenMax.to(tween2, 3, {
      x: -70,
      planeY: -140,
      onUpdate: () => {
        // 绘制双曲线
        this.planeLeft.position.x = tween2.planeY;

        // 移动m点
        this.mPoint2.position.x = tween2.x;
        this.mPoint2.position.y = 30 / 40 * Math.sqrt((40 * 40 + tween2.x * tween2.x));

        // 更新辅助线
        this.updateTwoLine2();
      },
      onComplete: () => {
        this.helper.removePoint(this.pointGroup, this.count, this.secondEquatin);
        this.animationEnd = true;
      },
      paused: true,
      ease:  Linear.easeIn,
    });
  }

  // 重置动画
  resetAnimation() {
    this.hyperbolaAnimation[0].progress(0);
    this.hyperbolaAnimation[0].pause();

    this.hyperbolaAnimation[1].progress(0);
    this.hyperbolaAnimation[1].pause();
  }

  // 重置
  reset() {

    // 重置点的位置
    this.mPoint.position.set(53, -50, 0);
    (this.mPoint.material as any).opacity = 1;
    this.mPoint2.position.set(0, 30, 0);
    (this.mPoint2.material as any).opacity = 0.5;
    // 删除绘制点
    this.helper.removePoint(this.pointGroup, this.count, this.secondEquatin);
    // 更新辅助线
    this.updateTwoLine();
    // 重置动画
    this.resetAnimation();
    this.animationEnd = true;
  }
}

