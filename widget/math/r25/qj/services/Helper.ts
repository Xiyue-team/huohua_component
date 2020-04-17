import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class Helper {
  createArrow( arrowSize: number, color: string, opacity?: number) {
    opacity = opacity ? opacity : 1;
    const arrow = ThreeUtil.createTriangle(0,  arrowSize, 0,
      -arrowSize, 2 * arrowSize, 0, color, opacity);
    return arrow;
  }
}
