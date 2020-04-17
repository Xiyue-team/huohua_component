import { Params } from '../../../../components/Params';
import { Point } from '../../../../components/Point';
import { EquationBase } from '../../../../components/Equation/EquationBase';

/**
 * 复合函数
 */
export class EquationFG extends EquationBase {

  name = 'C';
  desc = 'f<em>[</em>g<em>(</em>x<em>)]</em> = m<sup><em>(</em>kx + b<em>)</em></sup>';
  color = '#6ECFFF';
  xColor = '#9BF23B';
  yColor = '#6ECFFF';
  point: Point;

  constructor() {
    super();
    this.point = new Point();
    this.point.x = -1;
    this.point.y = 0;
  }

  rule(argument: number, params: Params): number {
    if (params.getParam('m') === 0 && (params.getParam('k') * argument + params.getParam('b')) <= 0) { return; }
    return Math.pow(params.getParam('m'), params.getParam('k') * argument + params.getParam('b'));
  }
}
