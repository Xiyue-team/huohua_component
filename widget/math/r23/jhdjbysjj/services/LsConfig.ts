import { ScaleValue } from './SimpleKonvaTemplate';

export class LsConfig {

  scaleValue = new ScaleValue();

  scale = this.scaleValue.scale;

  width = window.innerWidth;
  height = window.innerHeight;

  fontFamily = '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', ' +
    '\'PingFang SC\', \'Microsoft YaHei\', \'Source Han Sans SC\', ' +
    '\'Noto Sans CJK SC\', \'WenQuanYi Micro Hei\', sans-serif';

  backgroundImage = {
    width :  window.innerWidth,
    height :  window.innerHeight,
    x : 0,
    y : 0,
  };

  rect = {
    x: 150 * this.scale,
    y: 113 * this.scale,
    width: this.width * 0.6,
    height: this.height * 0.667,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    visible: false
  };

  textA = {
    x: this.width * 0.354,
    y: this.height * 0.478,
    text: 'A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textB = {
    x: this.width * 0.428,
    y: this.height * 0.477,
    text: 'B',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  oval = {
    x: this.width * 0.3665,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#2d2d2d',
  };

  oval2 = {
    x: this.width * 0.3665 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#2d2d2d',
    globalCompositeOperation: '',
  };

  oval3 = {
    x: this.width * 0.3665 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#FFD621',
  };

  oval4 = {
    x: this.width * 0.3665,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    draggable: true,
  };

  oval5 = {
    x: this.width * 0.3665 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    draggable: true,
  };

  textAB = {
    x: this.width * 0.397,
    y: this.height * 0.73,
    text: 'A    B',
    fontSize: 30 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textU = {
    x: this.width * 0.416,
    y: this.height * 0.73,
    text: '∩',
    fontSize: 30 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };
}







