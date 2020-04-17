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
    width :  this.width,
    height :  this.height,
    x : 0,
    y : 0,
  };

  rect = {
    x: this.width * 0.067,
    y: this.height * 0.167,
    width: this.width * 0.6,
    height: this.height * 0.667,
    fill: '#ffffff',
    opacity: 0.1,
    cornerRadius: 12,
  };

  textA = {
    x: this.width * 0.3068,
    y: this.height * 0.477,
    text: 'A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textB = {
    x: this.width * 0.379,
    y: this.height * 0.477,
    text: 'B',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textU = {
    x: this.width * 0.64,
    y: this.height * 0.194,
    text: 'U',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  ellipse1 = {
    x: this.width * 0.3185,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#404040',
  };

  ellipseLine1 = {
    x: this.width * 0.3185,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    draggable: true,
  };

  ellipse2 = {
    x: this.width * 0.3185 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#404040',
    globalCompositeOperation: '',
  };

  overlappingColors = {
    x: this.width * 0.3185 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#FFD621',
  };

  ellipseLine2 = {
    x: this.width * 0.3185 + this.height * 0.148,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    draggable: true,
  };
}







