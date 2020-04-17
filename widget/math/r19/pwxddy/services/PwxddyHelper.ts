/**
 * 帮助类
 * 帮助创建其他三个场景 以及 提供画抛物线的方法
 */
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as THREE from 'three';

export class PwxddyHelper {

  leftGroup = new THREE.Group();
  topGroup = new THREE.Group();
  bottomGroup = new THREE.Group();

  constructor() {

  }

  // 初始画左抛物线
  createLeftGroup() {
    // 方程
    const textParabola = [];
    textParabola[0] = ThreeUtil.createNewRomanText('y² = ', 50 - 110, 20, 2, '#000000', 0.15);
    textParabola[1] = ThreeUtil.createNormalText('-12', 62 - 110, 20, 2, '#000000', 0.15);
    textParabola[2] = ThreeUtil.createNewRomanText('x', 69 - 110, 20, 2, '#000000', 0.15);
    textParabola[3] = ThreeUtil.createNormalText('(         )', 84 - 110, 20, 2, '#000000', 0.15);
    textParabola[4] = ThreeUtil.createNewRomanText('p > ', 83 - 110, 20, 2, '#000000', 0.15);
    textParabola[5] = ThreeUtil.createNormalText('0', 91 - 110, 20, 2, '#000000', 0.15);
    this.leftGroup.add(textParabola[0]);
    this.leftGroup.add(textParabola[1]);
    this.leftGroup.add(textParabola[2]);
    this.leftGroup.add(textParabola[3]);
    this.leftGroup.add(textParabola[4]);
    this.leftGroup.add(textParabola[5]);

    // 创建抛物线
    const parabola = this.createParabola(6, 10);
    parabola.rotateZ(Math.PI);
    this.leftGroup.add(parabola);

    // 创建准线
    const point = [];
    point.push(new THREE.Vector3(0, 100, -0.5));
    point.push(new THREE.Vector3(0, -100, -0.5));
    const alignment = ThreeUtil.createTube(point, 0.5, point.length, '#EC5D57');
    alignment.position.x = 30;
    this.leftGroup.add(alignment);

    // 画焦点F
    const point2 = ThreeUtil.createPoint(1.5, '#0199FF', -30, 0, 1);
    this.leftGroup.add(point2);
    const textX = ThreeUtil.createNewRomanText('x', 40, -100, 2, '#000000', 0.15);
    const textXNumber = ThreeUtil.createNormalText('= 3', 50, -100, 2, '#000000', 0.15);
    const textF = ThreeUtil.createNewRomanText('F', -40, -7, 2, '#000000', 0.15);
    const text = ThreeUtil.createNormalText('(-3, 0)', -25, -7, 2, '#000000', 0.15);
    this.leftGroup.add(textX);
    this.leftGroup.add(textXNumber);
    this.leftGroup.add(textF);
    this.leftGroup.add(text);

    this.leftGroup.visible = false;

    return this.leftGroup;
  }

  // 初始化上抛物线
  createTopGroup() {
    this.topGroup = (this.leftGroup.clone()).rotateZ(-Math.PI / 2);
    this.topGroup.visible = false;
    const textX = ThreeUtil.createNewRomanText('y', 110, -25, 2, '#000000', 0.15);
    const textXNumber = ThreeUtil.createNormalText('= -3', 122, -25, 2, '#000000', 0.15);
    const textF = ThreeUtil.createNewRomanText('F', 10, 35, 2, '#000000', 0.15);
    const text = ThreeUtil.createNormalText('(0, 3)', 25, 35, 2, '#000000', 0.15);
    this.topGroup.children[this.topGroup.children.length - 4] = textX;
    this.topGroup.children[this.topGroup.children.length - 3] = textXNumber;
    this.topGroup.children[this.topGroup.children.length - 2] = textF;
    this.topGroup.children[this.topGroup.children.length - 1] = text;

    const textParabola = [];
    textParabola[0] = ThreeUtil.createNewRomanText('x² = ',     50 - 20, 60, 2, '#000000', 0.15);
    textParabola[1] = ThreeUtil.createNormalText('12',         62 - 20, 60, 2, '#000000', 0.15);
    textParabola[2] = ThreeUtil.createNewRomanText('y',         69 - 20, 60, 2, '#000000', 0.15);
    textParabola[3] = ThreeUtil.createNormalText('(         )', 84 - 20, 60, 2, '#000000', 0.15);
    textParabola[4] = ThreeUtil.createNewRomanText('p > ',      83 - 20, 60, 2, '#000000', 0.15);
    textParabola[5] = ThreeUtil.createNormalText('0',           91 - 20, 60, 2, '#000000', 0.15);
    this.topGroup.children[0] = textParabola[0];
    this.topGroup.children[1] = textParabola[1];
    this.topGroup.children[2] = textParabola[2];
    this.topGroup.children[3] = textParabola[3];
    this.topGroup.children[4] = textParabola[4];
    this.topGroup.children[5] = textParabola[5];

    return this.topGroup;
  }

  // 初始化下抛物线
  createBottomGroup() {
    this.bottomGroup = (this.leftGroup.clone()).rotateZ(Math.PI / 2);
    this.bottomGroup.visible = false;
    // 方程
    const textParabola = [];
    textParabola[0] = ThreeUtil.createNewRomanText('x² = ',     50 - 20, -60, 2, '#000000', 0.15);
    textParabola[1] = ThreeUtil.createNormalText('-12',         62 - 20, -60, 2, '#000000', 0.15);
    textParabola[2] = ThreeUtil.createNewRomanText('y',         69 - 20, -60, 2, '#000000', 0.15);
    textParabola[3] = ThreeUtil.createNormalText('(         )', 84 - 20, -60, 2, '#000000', 0.15);
    textParabola[4] = ThreeUtil.createNewRomanText('p > ',      83 - 20, -60, 2, '#000000', 0.15);
    textParabola[5] = ThreeUtil.createNormalText('0',           91 - 20, -60, 2, '#000000', 0.15);
    this.bottomGroup.children[0] = textParabola[0];
    this.bottomGroup.children[1] = textParabola[1];
    this.bottomGroup.children[2] = textParabola[2];
    this.bottomGroup.children[3] = textParabola[3];
    this.bottomGroup.children[4] = textParabola[4];
    this.bottomGroup.children[5] = textParabola[5];

    const textX = ThreeUtil.createNewRomanText('y', 110, 35, 2, '#000000', 0.15);
    const textXNumber = ThreeUtil.createNormalText('= 3', 120, 35, 2, '#000000', 0.15);
    const textF = ThreeUtil.createNewRomanText('F', 10, -25, 2, '#000000', 0.15);
    const text = ThreeUtil.createNormalText('(0, -3)', 25, -25, 2, '#000000', 0.15);
    this.bottomGroup.children[this.bottomGroup.children.length - 4] = textX;
    this.bottomGroup.children[this.bottomGroup.children.length - 3] = textXNumber;
    this.bottomGroup.children[this.bottomGroup.children.length - 2] = textF;
    this.bottomGroup.children[this.bottomGroup.children.length - 1] = text;
    return this.bottomGroup;
  }

  // 根据p值创建抛物线
  createParabola(p: number, length: number) {
    //计算坐标
    const parabolaY = [];
    const parabolaX = [];
    const parabolaY2 = [];
    const parabolaX2 = [];
    const point = [];
    const point1 = [];
    for (let i = 0; i <= length; i += 0.1 ) {
      parabolaY.push(i);
      parabolaX.push((i * i) / (2 * p));
    }

    for (let i = length; i >= 0; i -= 0.1 ) {
      parabolaY2.push(i);
      parabolaX2.push((i * i) / (2 * p));
    }

    for (let j = 0; j < parabolaX.length; j++) {
      point.push(new THREE.Vector3(parabolaX2[j] * 10 + 0.6, parabolaY2[j] * 10, -2));
      point1.push(new THREE.Vector3(parabolaX[j] * 10 + 0.6, -parabolaY[j] * 10, -2));
    }

    // 每个抛物线由两段组成 例如在正半轴的抛物线由上下两段组成
    const curve = ThreeUtil.createTube(point, 0.4, point.length, '#000000');
    const curve1 = ThreeUtil.createTube(point1, 0.4, point.length, '#000000');

    const parabola = new THREE.Group();
    parabola.add(curve);
    parabola.add(curve1);

    return parabola;
  }
}

