import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as THREE from 'three';
import { Line } from '../../../../../src/three/component/Line';

/**
 * 帮助类
 */
export class LineHelper {

  colorLine = new Line();
  constructor() {

  }

  //绘点
  drawPoint(x: number, y: number, radius: number, color: string) {
    const movePoint = ThreeUtil.createPoint(radius, color, x, y, 1);
    return movePoint;
  }

    //添加两个焦点
    addTwoFocusPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
                      width: number, height: number, img: any, img2: any, objScene: any) {
      const f1Point = ThreeUtil.createPoint(1, '#0199FF', x1, y1, 1);
      const f2Point = f1Point.clone();
      f2Point.position.set(x2, y2, 0);
      const f1text = ThreeUtil.createImg(width, height, img, x3, y3, 0);
      const f2text = ThreeUtil.createImg(width, height, img2, x3, y3, 0);
      f1Point.add(f1text);
      f2Point.add(f2text);
      objScene.add(f1Point);
      objScene.add(f2Point);
    }

    //绘制辅助虚线
    drawSupportLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, width: number,
                    height: number, img: any, objScene: any, flag: boolean) {
      const supLine = this.colorLine.createLine({
        startPoint: new THREE.Vector3(x1, y1, 0),
        endPoint: new THREE.Vector3(x2, y2, 0),
        color: '#EC5D57',
        dashLine: flag,
        gapSize: 3,
        dashSize: 1,
        lineWidth: 500,
        lineWidthScale: 1 / 500
      });
      const xLineImg = ThreeUtil.createImg(width, height, img, x3, y3);
      supLine.add(xLineImg);
      objScene.add(supLine);
      return supLine;
    }

    //删除线条和文字并重绘
    deleteAndRedraw(sceneOption: any, obj1?: any, obj2?: any, obj3?: any) {
      if (obj1) {
        obj1.geometry.dispose();
        obj1.material.dispose();
        sceneOption.remove(obj1);
      }

      if (obj2) {
        obj2.geometry.dispose();
        obj2.material.dispose();
        sceneOption.remove(obj2);
      }

      if (obj3) {
        obj3.geometry.dispose();
        obj3.material.dispose();
        sceneOption.remove(obj3);
      }
    }

    // 清除绘制点
    removePoint(array: any, count: number, scene: any) {
      for (let i = 0; i < array.length; i++) {
        (array[i] as any).geometry.dispose();
        (array[i] as any).material.dispose();
        scene.remove((array[i] as any));
      }
      array = [];
      count = 0;
    }

}

