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

  //第一个分数控制的矩阵
  firstFractionBackRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: '#FFB20D',
    stroke: '#E7E7E7',
    strokeWidth: 1
  };

  //第二个分数控制的矩阵
  secondFractionBackRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: '#FF3A3A',
    stroke: '#E7E7E7',
    strokeWidth: 1
  };

  //左分数线
  scoreLineLeft = {
    points: [120, 20, 220, 20],
    stroke: '#1A1A1A',
    strokeWidth: 2,
  };

  //右分数线
  scoreLineRight = {
    points: [450, 20, 550, 20],
    stroke: '#1A1A1A',
    strokeWidth: 2,
  };

  //竖线
  verticalLine =  {
    points: [0, 0, 0, 336],
    stroke: '#E7E7E7',
    strokeWidth: 1,
    lineCap: 'round',
    lineJoin: 'round'
  };

  //横线
  horizontalLine = {
    points: [0, 0, 224, 0],
    stroke: '#E7E7E7',
    strokeWidth: 1,
    lineCap: 'round',
    lineJoin: 'round'
  };

}







