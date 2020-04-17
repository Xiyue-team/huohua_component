import { ScaleValue } from '../../../../../src/konva/template/SimpleKonvaTemplate4';

export class WcConfig {

  scaleValue = new ScaleValue();

  width = window.innerWidth;
  height = window.innerHeight;

  fontFamily = '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', ' +
    '\'PingFang SC\', \'Microsoft YaHei\', \'Source Han Sans SC\', ' +
    '\'Noto Sans CJK SC\', \'WenQuanYi Micro Hei\', sans-serif';

  backgroundImage = {
      width :  this.width,
      height :  this.height,
      x : 0,
      y : 0,
  };

  textGaoKong = {
    x: this.width * 0.049,
    y: this.height * 0.181,
    text: '高空',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#000000'
  };

  textDiMian = {
    x: this.width * 0.049,
    y: this.height * 0.819,
    text: '地面',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#ffffff'
  };

  text1000hpa = {
    x: this.width * 0.127,
    y: this.height * 0.344,
    text: '925hpa',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  text1020hpa = {
    x: this.width * 0.127,
    y: this.height * 0.661,
    text: '1000hpa',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  solidLine1 = {
    points: [this.width * 0.234, this.height * 0.363, this.width * 0.766, this.height * 0.363],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 1
  };

  solidLine2 = {
    points: [this.width * 0.234, this.height * 0.673, this.width * 0.766, this.height * 0.673],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 1
  };

  yellowColumnImage = {
    width :  this.width * 0.176,
    height :  this.height * 0.623,
    x : this.width * 0.268,
    y : this.height * 0.181,
  };

  yellowColumnImage2 = {
    width :  this.width * 0.176,
    height :  this.height * 0.623,
    x : this.width * 0.557,
    y : this.height * 0.181,
  };

  blueColumnImage = {
    width :  this.width * 0.176,
    height :  this.height * 0.623,
    x : this.width * 0.268,
    y : this.height * 0.183,
  };

  redColumnImage = {
    width :  this.width * 0.176,
    height :  this.height * 0.623,
    x : this.width * 0.557,
    y : this.height * 0.182,
  };

  cloudMiddleImage1 = {
    width :  this.width * 0.176,
    height :  this.height * 0.556,
    x : this.width * 0.268,
    y : this.height * 0.288,
  };

  cloudMiddleImage2 = {
    width :  this.width * 0.176,
    height :  this.height * 0.556,
    x : this.width * 0.557,
    y : this.height * 0.125,
  };

  cloudTopImage1 = {
    width :  this.width * 0.176,
    height :  this.height * 0.451,
    x : this.width * 0.268,
    y : this.height * 0.108,
    opacity: 1
  };

  cloudTopImage2 = {
    width :  this.width * 0.176,
    height :  this.height * 0.451,
    x : this.width * 0.557,
    y : this.height * 0.453,
  };

  whiteFrameImage0 = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.309,
    y : this.height * 0.097,
  };

  whiteFrameImage1 = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.600,
    y : this.height * 0.097,
  };

  whiteFrameImage2 = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.309,
    y : this.height * 0.769,
  };

  whiteFrameImage3 = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.600,
    y : this.height * 0.769,
  };

  textA = {
    x: this.width * 0.346,
    y: this.height * 0.717,
    text: 'A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  textB = {
    x: this.width * 0.638,
    y: this.height * 0.717,
    text: 'B',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  textC = {
    x: this.width * 0.346,
    y: this.height * 0.215,
    text: 'C',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  textD = {
    x: this.width * 0.637,
    y: this.height * 0.215,
    text: 'D',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#000000'
  };

  hpa996Image = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.883,
    y : this.height * 0.328,
    draggable: true
  };

  hpa1004Image = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.883,
    y : this.height * 0.418,
    draggable: true
  };

  hpa1016Image = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.883,
    y : this.height * 0.509,
    draggable: true
  };

  hpa1024Image = {
    width :  this.width * 0.094,
    height :  this.height * 0.073,
    x : this.width * 0.883,
    y : this.height * 0.599,
    draggable: true
  };

  dashLine1 = {
    points: [this.width * 0.234, this.height * 0.363, this.width * 0.766, this.height * 0.363],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 1,
    dash: [10, 15],
  };

  dashLine2 = {
    points: [this.width * 0.234, this.height * 0.673, this.width * 0.766, this.height * 0.673],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 1,
    dash: [10, 15],
  };

  dashSpline1 = {
    points: [this.width * 0.234, this.height * 0.363,
              (this.width * (0.766 - 0.234)) / 4 + this.width * 0.234, this.height * 0.363,
              (this.width * (0.766 - 0.234)) / 4 * 3 + this.width * 0.234, this.height * 0.363,
              this.width * 0.766, this.height * 0.363],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 0.3,
  };

  dashSpline2 = {
    points: [this.width * 0.234, this.height * 0.673,
      (this.width * (0.766 - 0.234)) / 4 + this.width * 0.234, this.height * 0.673,
      (this.width * (0.766 - 0.234)) / 4 * 3 + this.width * 0.234, this.height * 0.673,
      this.width * 0.766, this.height * 0.673],
    stroke: '#D228D0',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 0.3,
  };

  textLengque = {
    x: this.whiteFrameImage2.x + this.whiteFrameImage2.width / 2 - (24 * this.scaleValue.scale),
    y: this.height * 0.844,
    text: '冷却',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#ffffff',
    visible: false
  };

  textShowre = {
    x: this.whiteFrameImage3.x + this.whiteFrameImage3.width / 2 - (24 * this.scaleValue.scale),
    y: this.height * 0.844,
    text: '受热',
    fontSize: 24 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#ffffff',
    visible: false
  };

  buttonImage1 = {
    width :  this.width * 0.041,
    height :  this.width * 0.041,
    x : this.width * 0.338,
    y : this.height * 0.363 - this.width / 2 * 0.041,
    draggable: true
  };

  buttonImage2 = {
    width :  this.width * 0.041,
    height :  this.width * 0.041,
    x : this.width * 0.626,
    y : this.height * 0.363 - this.width / 2 * 0.041,
    draggable: true
  };

  buttonImage3 = {
    width :  this.width * 0.041,
    height :  this.width * 0.041,
    x : this.width * 0.338,
    y : this.height * 0.673 - this.width / 2 * 0.041,
    draggable: true
  };

  buttonImage4 = {
    width :  this.width * 0.041,
    height :  this.width * 0.041,
    x : this.width * 0.626,
    y : this.height * 0.673 - this.width / 2 * 0.041,
    draggable: true
  };
}







