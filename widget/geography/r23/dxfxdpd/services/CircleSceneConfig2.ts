export class CircleSceneConfig2 {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = (this.width / this.height > 1024 / 576 ? this.height / 576 : this.width / 1024);

  circleLine = {
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5,
    radius: 292 / 2,
    fill: '',
    strokeWidth: 2,
    stroke: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
  };

  topCircleText = {
    left: this.circleLine.left + (146 + 16) * this.scale * Math.sin(0 * Math.PI / 180),
    top: this.circleLine.top - (146 + 16) * this.scale * Math.cos(0 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  bottomCircleText = {
    left: this.circleLine.left + (146 + 16) * this.scale * Math.sin(180 * Math.PI / 180),
    top: this.circleLine.top - (146 + 16) * this.scale * Math.cos(180 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  leftCircleText = {
    left: this.width * 0.098 + 654 * 0.5 * this.scale - (146 + 32) * this.scale,
    top: this.circleLine.top - (146 + 16) * this.scale * Math.cos(-90 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  rightCircleText = {
    left: this.circleLine.left + (146 + 32) * this.scale * Math.sin(90 * Math.PI / 180),
    top: this.circleLine.top - (146 + 32) * this.scale * Math.cos(90 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  xAxis = {
    fill: '#64AE5F',
    stroke: '#64AE5F',
    strokeWidth: 2,
    selectable: false,
    strokeDashArray: [5 , 5]
  };

  yAxis = {
    fill: '#64AE5F',
    stroke: '#64AE5F',
    strokeWidth: 2,
    selectable: false
  };

  topRedCircleLine = {
    width: 2,
    height: 146,
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5 - 146 * 0.5 * this.scale,
    fill: '#EE7F35',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  bottomCircleLine = {
    width: 2,
    height: 146,
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5 + 146 * 0.5 * this.scale,
    fill: '#000000',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  topBlueCircleLine = {
    width: 2,
    height: 146,
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5 - 146 * 0.5 * this.scale,
    fill: '#0199ff',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
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
    left: this.circleLine.left + 146 * this.scale * Math.sin(-34 * Math.PI / 180),
    top: this.circleLine.top - 146 * this.scale * Math.cos(-34 * Math.PI / 180),
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  };

  blueButton = {
    left: this.circleLine.left + 146 * this.scale * Math.sin(49 * Math.PI / 180),
    top: this.circleLine.top - 146 * this.scale * Math.cos(49 * Math.PI / 180),
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  };

  redCircleLineText = {
    left: this.circleLine.left + 174 * this.scale * Math.sin(-34 * Math.PI / 180),
    top: this.circleLine.top - 174 * this.scale * Math.cos(-34 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  blueCircleLineText = {
    left: this.circleLine.left + 174 * this.scale * Math.sin(49 * Math.PI / 180),
    top: this.circleLine.top - 174 * this.scale * Math.cos(49 * Math.PI / 180),
    fill: '#525252',
    selectable: false,
    fontSize: 16 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  line1 = {
    width: 189,
    height: 1,
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#64AE5F',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  line2 = {
    width: 1,
    height: 144,
    left: this.width * 0.76 + 222 * this.scale * 0.5,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#7ab976',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  lineLeft = {
    width: 1,
    height: 144,
    left: this.width * 0.76 + 15.8 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  lineRight = {
    width: 1,
    height: 144,
    left: this.width * 0.76 + 204.8 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#545454',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  textLeft = {
    left: this.width * 0.76 + 5 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 13 * this.scale,
    fill: '#525252',
    fontSize: 8 * this.scale
  };

  textCenter = {
    left: this.width * 0.76 + 106.5 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 13 * this.scale,
    fill: '#525252',
    fontSize: 8 * this.scale
  };

  textRight = {
    left: this.width * 0.76 + 194 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 13 * this.scale,
    fill: '#525252',
    fontSize: 8 * this.scale
  };

  redLine = {
    width: 1,
    height: 144,
    left: this.width * 0.76 + 85 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#EE7F35',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  blueLine = {
    width: 1,
    height: 144,
    left: this.width * 0.76 + 134 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale * 0.5,
    fill: '#0091ff',
    scaleX: this.scale,
    scaleY: this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center'
  };

  redLineText = {
    left: this.width * 0.76 + 85 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 15 * this.scale,
    fill: '#525252',
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  blueLineText = {
    left: this.width * 0.76 + 134 * this.scale,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 15 * this.scale,
    fill: '#525252',
    fontSize: 8 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  minorArc = {
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5,
    radius: 292 / 2,
    fill: '',
    strokeWidth: 2,
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

  arrowLine = {
    left: this.width * 0.098 + 654 * 0.5 * this.scale,
    top: this.height * 0.5,
    radius: 170,
    fill: '',
    strokeWidth: 2,
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
    left: this.circleLine.left + 160 * this.scale * Math.sin(140 * Math.PI / 180),
    top: this.circleLine.top - 162 * this.scale * Math.cos(140 * Math.PI / 180),
    width: 10,
    height: 10,
    fill: '#000000',
    scaleX: this.scale,
    scaleY: this.scale,
  };

  textDescription = {
    left: this.width * 0.76,
    top: this.height * 0.5 - 432 * this.scale * 0.5 + 190 * this.scale + 74 * this.scale,
    width: 222 * 2 ,
    height: 67 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false,
    name: 'textDescription'
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

}







