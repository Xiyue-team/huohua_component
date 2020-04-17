export class MyConfig {
  //背景矩阵
  arrow = {
    x: 30,
    y: 42,
    points: [0, 0, 1020, 0],
    pointerLength: 20,
    pointerWidth: 20,
    fill: '#179DF5',
    stroke: '#179DF5',
    strokeWidth: 3
  };

  //原点的圆
  centerCircle = {
    x: 530,
    y: 42,
    radius: 5,
    fill: 'white',
  };

  line = {
    points: [
        530 , 75,
        530 , 110
    ],
    fill: '#179DF5',
    stroke: '#179DF5',
    strokeWidth: 3,
    visible: false,
  };

  leftGroupBackCircle = {
    x: 410,
    y: 42,
    radius: 13,
    fill: 'white',
    opacity: 0.5
  };

  leftGroupFontCircle = {
    x: 410,
    y: 42,
    radius: 5,
    fill: 'white',
  };


  rightGroupBackCircle = {
    x: 558.8,
    y: 42,
    radius: 13,
    fill: 'white',
    opacity: 0.5
  };
  rightGroupFontCircle = {
    x: 558.8,
    y: 42,
    radius: 5,
    fill: 'white',
  };

  leftMoveFrame = {
    points: [
        375 , 0,
        445 , 0,
        445 , 30,
        415 , 30,
        410 , 37,
        405 , 30,
        375 , 30
    ],
    fill: '#414141',
    closed: true,
    lineJoin: 'round',
    opacity: 0.5,
  };
  rightMoveFrame = {
    points: [
      523.8 , 0,
      593.8 , 0,
      593.8 , 30,
      563.8 , 30,
      558.8 , 37,
      553.8 , 30,
      523.8 , 30
    ],
    fill: '#414141',
    closed: true,
    lineJoin: 'round',
    opacity: 0.5,
  };

  yellowText = {
    x: 391.5,
    y: 7,
    text: '-2.5',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#F5A623',
  };

  greenText = {
    x: 544.8,
    y: 7,
    text: '0.6',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#7ED321',
  };

  lineLeftGroup = {
    points: [
      410 , 75,
      410 , 110
    ],
    fill: '#179DF5',
    stroke: '#179DF5',
    strokeWidth: 3,
    visible: false,
  };
  lineRightGroup = {
    points: [
      558.8 , 75,
      558.8 , 110
    ],
    fill: '#179DF5',
    stroke: '#179DF5',
    strokeWidth: 3,
    visible: false,
  };

  //黄色变长线
  yellowLine = {
    points: [
      410 , 83,
      530 , 83
    ],
    fill: '#F5A623',
    stroke: '#F5A623',
    strokeWidth: 3,
    visible: false,
  };
  //绿色变长线
  greenLine = {
    points: [
      558.8 , 102,
      530 , 102,
    ],
    fill: '#7ED321',
    stroke: '#7ED321',
    strokeWidth: 3,
    visible: false,
  };

  //框
  numberCompareLeftLine = {
    points: [
      428 , 165,
      502 , 165,
      502 , 200,
      428 , 200,
    ],
    fill: '#414141',
    closed: true,
    lineJoin: 'round',
    visible: false,
  };
  //框
  numberCompareCenterLine = {
    points: [
      515 , 165,
      545 , 165,
      545 , 200,
      515 , 200,
    ],
    fill: '#414141',
    closed: true,
    lineJoin: 'round',
    visible: false,
  };
  //框
  numberCompareRightLine = {
    points: [
      558 , 165,
      632 , 165,
      632 , 200,
      558 , 200,
    ],
    fill: '#414141',
    closed: true,
    lineJoin: 'round',
    visible: false,
  };

  //数值比较大小
  leftNumberValueSize = {
    x: 445,
    y: 174,
    text: '-2.5',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#F5A623',
    visible: false,
  };
  //数值比较大小
  comparisonSymbol = {
    x: 523,
    y: 174,
    text: '<',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#fbfffd',
    visible: false,
  };
  //数值比较大小
  rightNumberValueSize = {
    x: 580,
    y: 174,
    text: '0.6',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#7ED321',
    visible: false,
  };

  //绝对值比较大小
  rightNumberAbsoluteValueSize = {
    x: 580,
    y: 174,
    text: '0.6',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#7ED321',
    visible: false,
  };
  //绝对值比较大小
  comparisonSymbolRight  = {
    x: 523,
    y: 174,
    text: '>',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#fbfffd',
    visible: false,
  };
  //绝对值比较大小
  leftNumberAbsoluteValue = {
    x: 445,
    y: 174,
    text: '-2.5',
    fontSize: 20,
    fontFamily: 'TimesNewRomanPSMT',
    fill: '#F5A623',
    visible: false,
  };

  //绝对值竖线
  absoluteLeftGroupLeftLine = {
    points: [
      435 , 170,
      435 , 195
    ],
    fill: '#F5A623',
    stroke: '#F5A623',
    strokeWidth: 3,
    visible: false,
  };
  //绝对值竖线
  absoluteLeftGroupRightLine = {
    points: [
      495, 170,
      495, 195
    ],
    fill: '#F5A623',
    stroke: '#F5A623',
    strokeWidth: 3,
    visible: false,
  };
  //绝对值竖线
  absoluteRightGroupLeftLine = {
    points: [
      565, 170,
      565, 195
    ],
    fill: '#7ED321',
    stroke: '#7ED321',
    strokeWidth: 3,
    visible: false,
  };
  //绝对值竖线
  absoluteRightGroupRightLine = {
    points: [
      625, 170,
      625, 195
    ],
    fill: '#7ED321',
    stroke: '#7ED321',
    strokeWidth: 3,
    visible: false,
  };

}







