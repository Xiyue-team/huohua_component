export class AxisSceneConfig1 {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = (this.width / this.height > 1024 / 576 ? this.height / 576 : this.width / 1024);

  earth = {
    left: this.width * 0.5 - 810 * 0.5 * this.scale,
    top: this.height * 0.5 - 675 * 0.5 * this.scale,
    width: 810 * 2,
    height: 675 * 2,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
  };


  rect = {
    width: 654,
    height: 432,
    left: this.width * 0.098,
    top: this.height * 0.5 - 432 * this.scale * 0.5,
    fill: '#d8d8d8',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    opacity: 0.4
  };

  line1 = {
    width: 498,
    height: 2,
    left: this.width * 0.098 + 78 * this.scale,
    top: this.height * 0.5 - 2 * this.scale * 0.5,
    fill: '#64AE5F',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
  };

  line2 = {
    width: 2,
    height: 328,
    left: this.width * 0.098 + 326 * this.scale,
    top: this.height * 0.5,
    fill: '#7ab976',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  lineLeft = {
    width: 2,
    height: 328,
    left: this.width * 0.098 + 78 * this.scale,
    top: this.height * 0.5,
    fill: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  lineRight = {
    width: 2,
    height: 328,
    left: this.width * 0.098 + 575 * this.scale,
    top: this.height * 0.5,
    fill: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  textLeft = {
    left: this.width * 0.098 + 63 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 32 * this.scale,
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale
  };

  textCenter = {
    left: this.width * 0.098 + 324 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 32 * this.scale,
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale
  };

  textRight = {
    left: this.width * 0.098 + 561 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 32 * this.scale,
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale
  };

  redLine = {
    width: 3,
    height: 328,
    left: this.width * 0.098 + 280 * this.scale,
    top: this.height * 0.5,
    fill: '#EE7F35',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  blueLine = {
    width: 3,
    height: 328,
    left: this.width * 0.098 + 394 * this.scale,
    top: this.height * 0.5,
    fill: '#0091ff',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  redLineText = {
    left: this.width * 0.098 + 280 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 32 * this.scale + 16 * this.scale * 0.5,
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  blueLineText = {
    left: this.width * 0.098 + 394 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 32 * this.scale + 16 * this.scale * 0.5,
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  whiteCircle = {
    left: 0,
    top: 0,
    radius: 15,
    fill: '#fff',
    opacity: 0.72,
    shadow: {color: 'rgba(0,0,0,0.3)', offsetX: 0.1, offsetY: 0.1},
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
  };

  blueCircle = {
    left: 10 * this.scale,
    top: 10 * this.scale,
    radius: 5,
    fill: '#0199ff',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
  };

  redButton = {
    left: this.width * 0.098 + 280 * this.scale,
    top: this.height * 0.5 + 328 * this.scale * 0.5,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  };

  blueButton = {
    left: this.width * 0.098 + 394 * this.scale,
    top: this.height * 0.5 + 328 * this.scale * 0.5,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  };

  whiteBackground = {
    width: 222,
    height: 190,
    left: this.width * 0.76,
    top: this.height * 0.5 - 432 * this.scale * 0.5,
    fill: '#ffffff',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    shadow: {
      color: '#EBEBEB',
      blur: 10,
      offsetX: 3,
      offsetY: 6,
    },
    rx: 10
  };

  circleLine = {
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    radius: 73,
    fill: '',
    strokeWidth: 1,
    stroke: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
  };

  minorArc = {
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    radius: 73,
    fill: '',
    strokeWidth: 1,
    stroke: '#F92E2E',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
    startAngle: -Math.PI / 180 * 124,
    endAngle: -Math.PI / 180 * 41
  };

  topCircleText = {
    left: this.circleLine.left + 83 * this.scale * Math.sin(0 * Math.PI / 180),
    top: this.circleLine.top - 83 * this.scale * Math.cos(0 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  bottomCircleText = {
    left: this.circleLine.left + 83 * this.scale * Math.sin(180 * Math.PI / 180),
    top: this.circleLine.top - 83 * this.scale * Math.cos(180 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  leftCircleText = {
    left: this.width * 0.76 + 222 * this.scale * 0.5 - 73 * this.scale - 10 * this.scale,
    top: this.circleLine.top - 86 * this.scale * Math.cos(-90 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  rightCircleText = {
    left: this.circleLine.left + 83 * this.scale * Math.sin(90 * Math.PI / 180),
    top: this.circleLine.top - 83 * this.scale * Math.cos(90 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  xAxis = {
    fill: '#64AE5F',
    stroke: '#64AE5F',
    strokeWidth: 1,
    selectable: false,
    strokeDashArray: [5 , 5]
  };

  yAxis = {
    fill: '#64AE5F',
    stroke: '#64AE5F',
    strokeWidth: 1,
    selectable: false
  };

  topRedCircleLine = {
    width: 1,
    height: 73,
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5 - 73 * 0.5 * this.scale,
    fill: '#EE7F35',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  bottomCircleLine = {
    width: 1,
    height: 73,
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5 + 73 * 0.5 * this.scale,
    fill: '#000000',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  redCircleLineText = {
    left: this.circleLine.left + 83 * this.scale * Math.sin(-30 * Math.PI / 180),
    top: this.circleLine.top - 83 * this.scale * Math.cos(-30 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  topBlueCircleLine = {
    width: 1,
    height: 73,
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5 - 73 * 0.5 * this.scale,
    fill: '#0199ff',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  blueCircleLineText = {
    left: this.circleLine.left + 83 * this.scale * Math.sin(40 * Math.PI / 180),
    top: this.circleLine.top - 83 * this.scale * Math.cos(40 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  decisionRule = {
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.535,
    width: 104 * this.scale,
    height: 40 * this.scale,
    text: '判定规则',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    rx: 21 * this.scale,
    textFill: '#000000',
    textNum: 4,
    visible: true,
    name: 'decisionRule'
  };

  coverWhiteBackground = {
    width: 222,
    height: 190,
    left: this.width * 0.76,
    top: this.height * 0.5 - 432 * this.scale * 0.5,
    fill: '',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    shadow: {
      color: '#EBEBEB',
      blur: 10,
      offsetX: 3,
      offsetY: 6,
    },
    rx: 10,
    opacity: 0.01,
    name: 'coverWhiteBackground'
  };

  textDescription = {
    left: this.width * 0.76,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale + 70 * this.scale,
    width: 222 * 2 ,
    height: 215 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false,
    name: 'textDescription'
  };

  arrowLine = {
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    radius: 100,
    fill: '',
    strokeWidth: 1,
    stroke: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
    startAngle: Math.PI / 180 * 15,
    endAngle: Math.PI / 180 * 50
  };

  arrow = {
    left: this.circleLine.left + 90 * this.scale * Math.sin(140 * Math.PI / 180),
    top: this.circleLine.top - 92 * this.scale * Math.cos(140 * Math.PI / 180),
    width: 10,
    height: 10,
    fill: '#000000',
    scaleX: this.scale,
    scaleY: this.scale,
  };
}







