import { Params } from '../../../../components/Params';
import { Point } from '../../../../components/Point';
import { EquationBase } from '../../../../components/Equation/EquationBase';

/**
 * 一次函数
 */
export class EquationG extends EquationBase {

  name = 'A';
  desc = 'g<em>(</em>x<em>)</em> = kx + b = t';
  color = '#9BF23B';
  xColor = '#9BF23B';
  yColor = '#C3A6FF';
  point: Point;

  constructor() {
    super();
    this.point = new Point();
    this.point.x = -1;
    this.point.y = 0;
  }

  rule(argument: number, params: Params): number {
    return params.getParam('k') * argument + params.getParam('b');
  }


  draw(context: CanvasRenderingContext2D, axisAtom: number, zoom: number, params: Params): void {
    super.draw(context, axisAtom, zoom, params);
  }
}
