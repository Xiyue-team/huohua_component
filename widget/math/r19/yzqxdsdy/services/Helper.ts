import * as THREE from 'three';
import { CreateHyperbola} from './CreateHyperbola';

export class Helper {
  static createFunctionPoint10() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(- Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(100, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint010() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(100, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint09() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(90, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint9() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(90, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint08() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(80, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint8() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(80, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint07() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(70, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint7() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(70, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint06() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(60, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint6() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(60, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint05() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(50, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint5() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(50, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint04() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2(Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(40, 2) - 920), 2)))), i));
    }
    return array;
  }
  static createFunctionPoint4() {
    const array = [];
    for (let i = -72.5; i < 72.5; i++) {
      array.push(new THREE.Vector2( - Math.sqrt(920 * (1 + (Math.pow(i, 2) /
        Math.pow(Math.sqrt(Math.pow(40, 2) - 920), 2)))), i));
    }
    return array;
  }

  static createFunline( arr: any[]) {
    const curve = new THREE.SplineCurve(
      arr
    );
    //增加线的宽度
    const points = curve.getPoints(50);
    const geometry = new THREE.Geometry().setFromPoints((points as any));
    const hyperbola = new CreateHyperbola();
    const mesh = hyperbola.createLine({
      geometry: geometry,
      lineWidth: 800,
    });
    return mesh;
  }
}
