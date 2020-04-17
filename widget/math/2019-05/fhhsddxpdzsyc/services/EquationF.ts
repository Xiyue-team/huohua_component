import { Point } from '../../../../components/Point';
import { Params } from '../../../../components/Params';
import { EquationBase } from '../../../../components/Equation/EquationBase';

/**
 * 指数函数
 */
export class EquationF extends EquationBase {

  name = 'B';
  desc = 'f<em>(</em>t<em>)</em> = m<sup>t</sup>';
  color = '#C3A6FF';
  xColor = '#C3A6FF';
  yColor = '#6ECFFF';
  point: Point;

  constructor() {
    super();
    this.point = new Point();
    this.point.x = 3;
    this.point.y = 0;
  }

  rule(argument: number, params: Params): number {
    if (params.getParam('m') === 0) { return; }
    return Math.pow(params.getParam('m'), argument);
  }
}
