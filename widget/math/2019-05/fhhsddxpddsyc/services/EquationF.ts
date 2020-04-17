import { Point } from '../../../../components/Point';
import { Params } from '../../../../components/Params';
import { EquationBase } from '../../../../components/Equation/EquationBase';

/**
 * 对数函数
 */
export class EquationF extends EquationBase {

  name = 'B';
  desc = 'f<em>(</em>t<em>)</em> = log<sub>m</sub>t';
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
    if (argument < 0) { return; }
    if (params.getParam('m') === 0 || params.getParam('m') === 1) { return; }
    return Math.log(argument) / Math.log(params.getParam('m'));
  }
}
