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
    width :  1024 * this.scale,
    height :  576 * this.scale,
    x : 0,
    y : 0,
  };

  spermImage = {
    width :  150 * this.scale,
    height :  150 * this.scale,
    x : 330 * this.scale,
    y : 99 * this.scale,
  };

  ovumImage = {
    width :  150 * this.scale,
    height :  150 * this.scale,
    x : 330 * this.scale,
    y : 343 * this.scale,
  };

  fertilizedOvunImage = {
    width :  180 * this.scale,
    height :  180 * this.scale,
    x : 550 * this.scale,
    y : 198 * this.scale,
  };

  rightBackgroundImage = {
    width :  202 * this.scale,
    height :  456 * this.scale,
    x : 806 * this.scale,
    y : 66 * this.scale,
  };

  redX1 = {
    width :  16 * this.scale,
    height :  38 * this.scale,
    x : 859 * this.scale,
    y : 90 * this.scale,
    draggable: true
  };

  redX2 = {
    width :  16 * this.scale,
    height :  36 * this.scale,
    x : 859 * this.scale,
    y : 173 * this.scale,
    draggable: true
  };

  red2 = {
    width :  50 * this.scale,
    height :  54 * this.scale,
    x : 842 * this.scale,
    y : 254 * this.scale,
    draggable: true
  };

  red3 = {
    width :  50 * this.scale,
    height :  58 * this.scale,
    x : 842 * this.scale,
    y : 351 * this.scale,
    draggable: true
  };

  red4 = {
    width :  15 * this.scale,
    height :  15 * this.scale,
    x : 860 * this.scale,
    y : 451 * this.scale,
    draggable: true
  };

  blueX = {
    width :  16 * this.scale,
    height :  38 * this.scale,
    x : 940 * this.scale,
    y : 90 * this.scale,
    draggable: true
  };

  blueY = {
    width :  26 * this.scale,
    height :  44 * this.scale,
    x : 932 * this.scale,
    y : 169 * this.scale,
    draggable: true
  };

  blue2 = {
    width :  50 * this.scale,
    height :  54 * this.scale,
    x : 923 * this.scale,
    y : 254 * this.scale,
    draggable: true
  };

  blue3 = {
    width :  45 * this.scale,
    height :  54 * this.scale,
    x : 925 * this.scale,
    y : 351 * this.scale,
    draggable: true
  };

  blue4 = {
    width :  15 * this.scale,
    height :  15 * this.scale,
    x : 941 * this.scale,
    y : 451 * this.scale,
    draggable: true
  };

  woman = {
    width :  20 * this.scale,
    height :  28 * this.scale,
    x : 120 * this.scale,
    y : 269 * this.scale,
  };

  text1 = {
    x: 140 * this.scale,
    y: 274 * this.scale,
    text: '卵原细胞',
    fontSize: 20 * this.scale,
    fill: '#000000'
  };

  man = {
    width :  20 * this.scale,
    height :  28 * this.scale,
    x : 120 * this.scale,
    y : 513 * this.scale,
  };

  text2 = {
    x: 140 * this.scale,
    y: 518 * this.scale,
    text: '精原细胞',
    fontSize: 20 * this.scale,
    fill: '#000000'
  };

  text3 = {
    x: 375 * this.scale,
    y: 259 * this.scale,
    text: '卵细胞',
    fontSize: 20 * this.scale,
    fill: '#000000'
  };

  text4 = {
    x: 385 * this.scale,
    y: 503 * this.scale,
    text: '精子',
    fontSize: 20 * this.scale,
    fill: '#000000'
  };

  text5 = {
    x: 610 * this.scale,
    y: 397 * this.scale,
    text: '受精卵',
    fontSize: 20 * this.scale,
    fill: '#000000'
  };

  text6 = {
    x: 784 * this.scale,
    y: 527 * this.scale,
    text: '可拖动染色体到左侧细胞中',
    fontSize: 18 * this.scale,
    fill: '#000000',
    opacity: 0.5
  };
}







