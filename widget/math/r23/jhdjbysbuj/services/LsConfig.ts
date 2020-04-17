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
    x: this.width * 0.131,
    y: this.height * 0.167,
    width: this.width * 0.6,
    height: this.height * 0.667,
    fill: '#ffffff',
    opacity: 0.1,
    cornerRadius: 12,
  };

  rectBorder = {
    x: this.width * 0.131,
    y: this.height * 0.167,
    width: this.width * 0.6,
    height: this.height * 0.667,
    stroke: '#ffffff',
    strokeWidth: 2,
    opacity: 0.1,
    cornerRadius: 12,
  };

  textA = {
    x: this.width * 0.42,
    y: this.height * 0.48,
    text: 'A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  oval = {
    x: this.width * 0.4315,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#2d2d2d',
  };

  oval4 = {
    x: this.width * 0.4315,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    draggable: true,
  };

  textU = {
    x: this.width * 0.696,
    y: this.height * 0.194,
    text: 'U',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textCA = {
    x: this.width * 0.405,
    y: this.height * 0.852,
    text: 'C   A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textu = {
    x: this.width * 0.420,
    y: this.height * 0.871,
    text: 'U',
    fontSize: 20 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };
}







