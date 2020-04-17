export class MyConfig {
  //背景矩阵
  backRect = {
    x: 0,
    y: 0,
    width: 612,
    height: 336,
    fill: '#FFFFFF',
    stroke: '#E7E7E7',
    strokeWidth: 1
  };

  //覆盖矩阵
  firstFractionBackRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: '#FFB20D',
    stroke: '#E7E7E7',
    strokeWidth: 1
  };

  //竖线
  verticalLine =  {
    points: [0, 0, 0, 336],
    stroke: '#E7E7E7',
    strokeWidth: 1,
    lineCap: 'round',
    lineJoin: 'round'
  };

}







