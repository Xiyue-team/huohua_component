import { Params } from '../../../../components/Params';
import { Point } from '../../../../components/Point';
import { EquationBase } from '../../../../components/Equation/EquationBase';

/**
 * 二次函数
 */
export class EquationG extends EquationBase {

  name = 'A';
  desc = 'g<em>(</em>x<em>)</em> = ax<sup>2</sup> + bx + c = t';
  color = '#9BF23B';
  xColor = '#9BF23B';
  yColor = '#C3A6FF';
  point: Point;

  constructor() {
    super();
    this.point = new Point();
    this.point.x = 0;
    this.point.y = 1;
  }

  rule(argument: number, params: Params): number {
    return params.getParam('a') * argument * argument + params.getParam('b') * argument + params.getParam('c');
  }

  dot(point: Point, params: Params): boolean {
    return point.y <= 0;
  }

  draw(context: CanvasRenderingContext2D, axisAtom: number, zoom: number, params: Params): void {
    super.draw(context, axisAtom, zoom, params);
  }
}
