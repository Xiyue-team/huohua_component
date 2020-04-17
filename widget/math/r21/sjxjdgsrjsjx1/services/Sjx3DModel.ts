import * as THREE from 'three';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as mPointImage from '../sub_static/mPointImage.png';
import { SjxHelper } from './SjxHelper';
import { CircleLine } from '../../../../../src/three/component/CircleLine';
const dragcontrols = require('three-dragcontrols').default;

export class Sjx3DModel {
  scene: any;
  camera: any;
  renderer: any;

  circleLine: CircleLine;

  helper: SjxHelper;

  // 点移动的轨迹
  trajectory1: any;
  trajectory2: any;
  trajectory3: any;
  trajectory4: any;

  // d点
  dPoint: any;

  // 蓝色线
  blueLine: any;

  // 判断现在是解析几
  analyticNumber = 0;

  // 用于判断解析是否已经切换
  analyticSwitch = 0;

  // d点的上一次坐标
  lastDPointX: number;

  solidLine: any = [];

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;
    this.helper = new SjxHelper();
    this.circleLine = new CircleLine();
    this.initAcuteAngle();
    this.initTrajectory();
    this.initDPoint();
    this.initBlueLine();
    this.initBlueSolidLine();
    this.initText();
    this.initDPointDrag();
  }

  // 初始锐角
  initAcuteAngle() {
    // 角的两边
    const line = this.helper.drawLine({x: -35, y: -20, z: 1},
      {x: 50, y: -20, z: 1}, 3, '#040404', true);
    this.scene.add(line);

    const line2 = this.helper.drawLine({x: -35, y: -20, z: 1},
      {x: 0, y: Math.tan(Math.PI / 3) * 35 - 20, z: 1}, 3, '#040404', false);
    this.scene.add(line2);

    // 扇形角度
    const angle = this.helper.drawArcLine(0, Math.PI / 3, false, 6);
    angle.position.set(-35, -20, 0);
    this.scene.add(angle);

    const angle2 = this.helper.drawArcLine(0, Math.PI / 3, false, 6.15);
    angle2.position.set(-35, -20, 0);
    this.scene.add(angle2);

    // 文字
    const angleText = ThreeUtil.createNormalText('60°', -26.5, -15, 0, '#000000', 0.07);
    this.scene.add(angleText);
  }

  // 初始化点移动的轨迹
  initTrajectory() {
    this.trajectory1 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: Math.tan(Math.PI / 3) * 35,
      yRadius: Math.tan(Math.PI / 3) * 35,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30 - Math.PI / 180 * 120,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });
    this.scene.add(this.trajectory1);

    this.trajectory2 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: Math.tan(Math.PI / 3) * 35 - 20,
      yRadius: Math.tan(Math.PI / 3) * 35 - 20,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30 - Math.PI / 180 * 0,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });
    this.scene.add(this.trajectory2);

    this.trajectory3 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: Math.tan(Math.PI / 3) * 35 + 5,
      yRadius: Math.tan(Math.PI / 3) * 35 + 5,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30 - Math.PI / 180 * 0,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });
    this.scene.add(this.trajectory3);

    this.trajectory4 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: Math.tan(Math.PI / 3) * 35 + 12,
      yRadius: Math.tan(Math.PI / 3) * 35 + 12,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30 - Math.PI / 180 * 0,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });
    this.scene.add(this.trajectory4);
  }

  // 初始化d点
  initDPoint() {
    this.dPoint = ThreeUtil.createImg(10, 10, mPointImage, 0, 0 );
    this.scene.add(this.dPoint);
    this.dPoint.position.set(25.5, -14.37, 0);
  }

  // 初始化蓝色线
  initBlueLine() {
    this.blueLine = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 3, '#0199ff', true);
    this.scene.add(this.blueLine);
  }

  initText() {
    const aText = ThreeUtil.createNewRomanText('A', -40, -20, 0, '#000000', 0.15);
    this.scene.add(aText);

    const cText = ThreeUtil.createNewRomanText('C', 5, 45, 0, '#000000', 0.15);
    this.scene.add(cText);

    const bText = ThreeUtil.createNewRomanText('B', 50, -20, 0, '#000000', 0.15);
    this.scene.add(bText);

    const b2Text = ThreeUtil.createNewRomanText('b', -17.5, 7, 0, '#000000', 0.15);
    this.scene.add(b2Text);

    const dText = ThreeUtil.createNewRomanText('D', 7, 0, 0, '#000000', 0.15);
    this.dPoint.add(dText);
  }

  initBlueSolidLine() {
    this.solidLine[0] = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: 0, y: -20, z: 1}, 3, '#0199ff', false);

    this.solidLine[1] = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: 25.5, y: -19.84, z: 1}, 3, '#0199ff', false);
    this.solidLine[2] = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: -25.5, y: -19.84, z: 1}, 3, '#0199ff', false);

    this.solidLine[3] = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: 39.5, y: -20.3, z: 1}, 3, '#0199ff', false);

    this.scene.add(this.solidLine[0]);
    this.scene.add(this.solidLine[1]);
    this.scene.add(this.solidLine[2]);
    this.scene.add(this.solidLine[3]);
    this.solidLine[0].visible = false;
    this.solidLine[1].visible = false;
    this.solidLine[2].visible = false;
    this.solidLine[3].visible = false;
  }

  // 初始化d点拖动事件
  initDPointDrag() {
    const dargControls1 = new dragcontrols([this.dPoint], this.camera, this.renderer.domElement);

    this.lastDPointX = this.dPoint.position.x;

    dargControls1.addEventListener( 'drag',  () => {

      // 更新限制的轨迹
      if (this.analyticNumber === 1) {
        this.limitTrajectory(this.dPoint, -52.5, 52.5, Math.tan(Math.PI / 3) * 35, Math.tan(Math.PI / 3) * 35 - 20);
        // 显示实线
        if (this.dPoint.position.x < 0.5) {
          this.solidLine[0].visible = true;
        }
      } else if (this.analyticNumber === 2) {
        this.limitTrajectory(this.dPoint, -35, 35, Math.tan(Math.PI / 3) * 35 - 20, Math.tan(Math.PI / 3) * 35 - 20);
      } else if (this.analyticNumber === 3) {
        this.limitTrajectory(this.dPoint, -56.8, 56.8, Math.tan(Math.PI / 3) * 35 + 5, Math.tan(Math.PI / 3) * 35 - 20);
        // 显示实线
        if (this.dPoint.position.x < 25.5) {
          this.solidLine[1].visible = true;
        }
        if (this.dPoint.position.x < -25) {
          this.solidLine[2].visible = true;
        }
      } else if (this.analyticNumber === 4) {
        this.limitTrajectory(this.dPoint, -63, 63, Math.tan(Math.PI / 3) * 35 + 12, Math.tan(Math.PI / 3) * 35 - 20);
        // 显示实线
        if (this.dPoint.position.x < 39.5) {
          this.solidLine[3].visible = true;
        }
      }

      // 防止d点回拖
      if (this.dPoint.position.x < this.lastDPointX) {
        this.updateTrajectory(this.analyticNumber);
        this.lastDPointX = this.dPoint.position.x;
      }

      // 更新蓝色线
      this.updateBlueLine(true);
    });
  }

  // 限制点的拖动轨迹
  /*
    point: 点的对象
    start： 点可移动最小位置
    end： 点可移动最大位置
    radius： 圆形轨迹的半径
    b： 圆心坐标的纵坐标
   */
  limitTrajectory(point: any, start: number, end: number, radius: number, b: number) {
    if (point.position.x < start) {
      point.position.x = start;
    }
    if (point.position.x > end) {
      point.position.x = end;
    }

    point.position.y = -Math.sqrt(radius * radius - point.position.x * point.position.x) + b;
  }

  // 更新角的两边
  updateBlueLine(dashline: boolean) {
    this.helper.removeLine(this.blueLine, this.scene);
    this.blueLine = this.helper.drawLine({x: 0, y: Math.tan(Math.PI / 3) * 35 - 20 , z: 1},
      {x: this.dPoint.position.x, y: this.dPoint.position.y, z: 1}, 3, '#0199ff', dashline);
    this.scene.add(this.blueLine);
  }

  // 更新d点的轨迹
  updateDPointXY(serial: number) {

    // 判断是解析1时隐藏点和线 并且不向下执行
    if (serial === 0) {
      this.dPoint.visible = false;
      this.blueLine.visible = false;
      return;
    } else {
      this.dPoint.visible = true;
      this.blueLine.visible = true;
    }

    // 限制只能触发一次
    if (this.analyticSwitch === this.analyticNumber) {
      return;
    } else {
      this.analyticSwitch = this.analyticNumber;
    }

    // 隐藏轨迹
    this.resetTrajectory();

    // 判断时解析几  切换d点坐标
    if (serial === 1) {
      this.dPoint.position.set(52.5, 10.31, 0);
    } else if (serial === 2) {
      this.dPoint.position.set(35, 20, 0);
    } else if (serial === 3) {
      this.dPoint.position.set(56.8, 7.758, 0);
    } else if (serial === 4) {
      this.dPoint.position.set(63, 4.5, 0);
    }

    // 用于判读d点是否回拖  回拖时不隐藏轨迹
    this.lastDPointX = this.dPoint.position.x;

    // 更新蓝色线条
    this.updateBlueLine(true);
  }

  // 更新轨迹
  updateTrajectory(serial: number) {
    if (serial === 1) {
      // 更新轨迹1
      this.helper.removeLine(this.trajectory1, this.scene);
      const pointB = new THREE.Vector3(52.5, 10.31, 0);
      this.trajectory1 = this.drawTrajectory(pointB, Math.tan(Math.PI / 3) * 35);
      this.scene.add(this.trajectory1);
    } else if (serial === 2) {
      // 更新轨迹2
      this.helper.removeLine(this.trajectory2, this.scene);
      const pointB = new THREE.Vector3(35, 20, 0);
      this.trajectory2 = this.drawTrajectory(pointB, Math.tan(Math.PI / 3) * 35 - 20);
      this.scene.add(this.trajectory2);
    } else if (serial === 3) {
      // 更新轨迹3
      this.helper.removeLine(this.trajectory3, this.scene);
      const pointB = new THREE.Vector3(56.8, 7.758, 0);
      this.trajectory3 = this.drawTrajectory(pointB, Math.tan(Math.PI / 3) * 35 + 5);
      this.scene.add(this.trajectory3);
    } else if (serial === 4) {
      // 更新轨迹4
      this.helper.removeLine(this.trajectory4, this.scene);
      const pointB = new THREE.Vector3(63, 4.5, 0);
      this.trajectory4 = this.drawTrajectory(pointB, Math.tan(Math.PI / 3) * 35 + 12);
      this.scene.add(this.trajectory4);
    }
  }

  // 根据d点坐标重新绘制轨迹
  drawTrajectory(pointB: THREE.Vector3, radius: number) {
    const pointA = new THREE.Vector3(0, Math.tan(Math.PI / 3) * 35 - 20, 0);
    const pointC = new THREE.Vector3(this.dPoint.position.x, this.dPoint.position.y, 0);
    const angleA = ThreeUtil.getThreeAngle(pointA, pointB, pointC);

    const trajectory2 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: radius,
      yRadius: radius,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30 - angleA * Math.PI / 180,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });

    return trajectory2;
  }

  // 隐藏实线
  hideSolidLine() {
    this.solidLine[0].visible = false;
    this.solidLine[1].visible = false;
    this.solidLine[2].visible = false;
    this.solidLine[3].visible = false;
  }

  // 隐藏轨迹
  hideTrajectory(radius: number) {
    const trajectory1 = this.circleLine.createCircleLine({
      aX: 0,
      aY: Math.tan(Math.PI / 3) * 35 - 20,
      xRadius: radius,
      yRadius: radius,
      aStartAngle: -Math.PI / 180 * 30,
      aEndAngle: -Math.PI / 180 * 30,
      aClockwise: true,
      color: '#000000',
      lineWidth: 0.003,
      style: 2
    });

    return trajectory1;
  }

  // 重置轨迹
  resetTrajectory() {
    // 隐藏轨迹
    this.helper.removeLine(this.trajectory1, this.scene);
    this.trajectory1 = this.hideTrajectory(Math.tan(Math.PI / 3) * 35);
    this.scene.add(this.trajectory1);

    this.helper.removeLine(this.trajectory2, this.scene);
    this.trajectory2 = this.hideTrajectory(Math.tan(Math.PI / 3) * 35 - 20);
    this.scene.add(this.trajectory2);

    this.helper.removeLine(this.trajectory3, this.scene);
    this.trajectory3 = this.hideTrajectory(Math.tan(Math.PI / 3) * 35 + 5);
    this.scene.add(this.trajectory3);

    this.helper.removeLine(this.trajectory4, this.scene);
    this.trajectory4 = this.hideTrajectory(Math.tan(Math.PI / 3) * 35 + 12);
    this.scene.add(this.trajectory4);

    // 隐藏实线
    this.hideSolidLine();
  }

}


