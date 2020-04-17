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

  sunImage = {
    width: 70 * this.scale,
    height: 70 * this.scale,
    x: 100 * this.scale,
    y: 100 * this.scale,
  };

  greenPlantsIcon = {
    width :  52 * this.scale,
    height :  52 * this.scale,
    x : 923 * this.scale,
    y : 154 * this.scale,
    startScale: 1,
  };

  yellowPlantsIcon = {
    width :  52 * this.scale,
    height :  52 * this.scale,
    x : 923 * this.scale,
    y : 226 * this.scale,
  };

  plasticBagIconImage = {
    width :  52 * this.scale,
    height :  52 * this.scale,
    x : 923 * this.scale,
    y : 298 * this.scale,
    opacity: 0.4
  };

  ropeIconImage = {
    width :  52 * this.scale,
    height :  52 * this.scale,
    x : 923 * this.scale,
    y : 370 * this.scale,
    opacity: 0.4
  };

  rectLeft = {
    x: 244 * this.scale,
    y: 171 * this.scale,
    width: 227 * this.scale,
    height: 242 * this.scale,
    visible: false
  };

  rectRight = {
    x: 544 * this.scale,
    y: 171 * this.scale,
    width: 227 * this.scale,
    height: 242 * this.scale,
    visible: false
  };

  plasticBagSealUpImage0 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 204 * this.scale,
    y : 118 * this.scale,
    visible: false,
  };

  plasticBagSealUpImage1 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 506 * this.scale,
    y : 118 * this.scale,
    visible: false,
  };

  ropeRect0 = {
    x: 268.5 * this.scale,
    y: 260 * this.scale,
    width: 178 * this.scale,
    height: 132 * this.scale,
    fill: 'green',
    visible: false
  };

  ropeRect1 = {
    x: 568.5 * this.scale,
    y: 260 * this.scale,
    width: 178 * this.scale,
    height: 132 * this.scale,
    fill: 'green',
    visible: false
  };

  whiteMistImage0 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 204 * this.scale,
    y : 118 * this.scale,
    visible: false,
    opacity: 0
  };

  whiteMistImage1 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 506 * this.scale,
    y : 118 * this.scale,
    visible: false,
    opacity: 0
  };

  waterDropsImage0 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 204 * this.scale,
    y : 118 * this.scale,
    visible: false,
    opacity: 0

  };

  waterDropsImage1 = {
    width :  307 * this.scale,
    height :  350 * this.scale,
    x : 506 * this.scale,
    y : 118 * this.scale,
    visible: false,
    opacity: 0
  };

  textLeft = {
    x: this.rectLeft.x + this.rectLeft.width / 2 - (36 * this.scale),
    y: 83 * this.scale,
    text: '15分钟后',
    fontSize: 18 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#827867',
    visible: false
  };

  textRight = {
    x: this.rectRight.x + this.rectRight.width / 2 - (36 * this.scale),
    y: 83 * this.scale,
    text: '15分钟后',
    fontSize: 18 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#827867',
    visible: false
  };

  mesaImage = {
    width :  538 * this.scale,
    height :  20 * this.scale,
    x : 239 * this.scale,
    y : this.rectLeft.y + this.rectLeft.height,
    shadowColor: 'black',
    shadowBlur: 33,
    shadowOffset: {
      x : 0,
      y : 12
    },
    shadowOpacity: 0.10,
  };

  tipsTop = {
    x: 355 * this.scale,
    y: 335 * this.scale,
    text: '将右侧物品拖到平台上，构建实验装置',
    fontSize: 18 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#827867',
    visible: true
  };

  tipsBottom = {
    x: 384 * this.scale,
    y: 475 * this.scale,
    text: '点击“查看现象”，观察实验结果',
    fontSize: 18 * this.scaleValue.scale,
    fontFamily: this.fontFamily,
    fill: '#827867',
    visible: false
  };
}







