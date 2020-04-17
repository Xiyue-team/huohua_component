import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
export class Helper {
  //创建拖动点的方法
  createDragPoint () {
    const point = ThreeUtil.createPoint(5, '#ffffff', 0, 0, 0.36);
    const smallPoint = ThreeUtil.createPoint(1.5, '#ffffff', 0, 0, 1);
    point.add(smallPoint);
    return point;
  }
}
