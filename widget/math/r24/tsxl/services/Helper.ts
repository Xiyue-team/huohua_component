import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
export class Helper {
  private r = (window as any)['env'].browserInfo.isSmallDevice ? 8 : 4;
  private r1 = (window as any)['env'].browserInfo.isSmallDevice ? 3 : 1.5;
  createDragPoint () {
    const point = ThreeUtil.createPoint(this.r, '#ffffff', 0, 0, 0.36);
    const smallPoint = ThreeUtil.createPoint(this.r1, '#ffffff', 0, 0, 1);
    point.add(smallPoint);
    return point;
  }
}
