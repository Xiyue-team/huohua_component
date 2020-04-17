import { Params } from '../../../../components/Params';
import { Point } from '../../../../components/Point';
import { EquationBase } from '../../../../components/Equation/EquationBase';
/**
 * 复合函数
 */
export class EquationFG extends EquationBase {

  name = 'C';
  desc = 'f<em>[</em>g<em>(</em>x<em>)</em><em>]</em> = m<sup>ax<sup>2</sup> + bx + c</sup>';
  color = '#6ECFFF';
  xColor = '#9BF23B';
  yColor = '#6ECFFF';
  point: Point;

  constructor() {
    super();
    this.point = new Point();
    this.point.x = 0;
    this.point.y = 2;
  }

  rule(argument: number, params: Params): number {
    if (params.getParam('m') === 0
      && (params.getParam('a') * argument * argument + params.getParam('b') * argument + params.getParam('c')) <= 0) { return; }
    return Math.pow(params.getParam('m'),
      params.getParam('a') * argument * argument + params.getParam('b') * argument + params.getParam('c')
    );
  }
}
