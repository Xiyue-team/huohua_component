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

  textBackgroundImage = {
    width :  1024 * this.scale,
    height :  576 * this.scale,
    x : 0,
    y : 0,
  };

  rightBackgroundImage = {
    width :  464 * this.scale,
    height :  282 * this.scale,
    x : 530 * this.scale,
    y : 72 * this.scale,
  };

  rightBackgroundNoText = {
    width :  464 * this.scale,
    height :  282 * this.scale,
    x : 530 * this.scale,
    y : 72 * this.scale,
  };

  smallCells1 = {
    width :  60 * this.scale,
    height :  60 * this.scale,
    x : 68 * this.scale,
    y : 221 * this.scale,
  };

  smallCells2 = {
    width :  72 * this.scale,
    height :  72 * this.scale,
    x : 69 * this.scale,
    y : 114 * this.scale,
  };

  smallCells3 = {
    width :  72 * this.scale,
    height :  72 * this.scale,
    x : 160 * this.scale,
    y : 62 * this.scale,
  };

  smallCells4 = {
    width :  65 * this.scale,
    height :  80 * this.scale,
    x : 262 * this.scale,
    y : 70 * this.scale,
  };

  smallCells5 = {
    width :  78 * this.scale,
    height :  68 * this.scale,
    x : 331 * this.scale,
    y : 128 * this.scale,
  };

  smallCells6 = {
    width :  56 * this.scale,
    height :  56 * this.scale,
    x : 307 * this.scale,
    y : 235 * this.scale,
  };

  smallCells6_2 = {
    width :  56 * this.scale,
    height :  56 * this.scale,
    x : 374 * this.scale,
    y : 240 * this.scale,
  };

  smallCells7_1 = {
    width :  56 * this.scale,
    height :  56 * this.scale,
    x : 258 * this.scale,
    y : 308 * this.scale,
  };

  smallCells7_2 = {
    width :  56 * this.scale,
    height :  56 * this.scale,
    x : 341 * this.scale,
    y : 333 * this.scale,
  };

  smallCells8_1 = {
    width :  58 * this.scale,
    height :  64 * this.scale,
    x : 184 * this.scale,
    y : 352 * this.scale,
  };

  smallCells8_2 = {
    width :  58 * this.scale,
    height :  64 * this.scale,
    x : 270 * this.scale,
    y : 395 * this.scale,
  };

  smallCells9_1 = {
    width :  56 * this.scale,
    height :  64 * this.scale,
    x : 116 * this.scale,
    y : 387 * this.scale,
  };

  smallCells9_2 = {
    width :  56 * this.scale,
    height :  64 * this.scale,
    x : 200 * this.scale,
    y : 442 * this.scale,
  };

  smallCells10_1 = {
    width :  58 * this.scale,
    height :  73 * this.scale,
    x : 49 * this.scale,
    y : 416 * this.scale,
  };

  smallCells10_2 = {
    width :  58 * this.scale,
    height :  73 * this.scale,
    x : 133 * this.scale,
    y : 484 * this.scale,
  };

  bigCells1 = {
    width :  200 * this.scale,
    height :  200 * this.scale,
    x : 662 * this.scale,
    y : 100 * this.scale,
    visible: false
  };

  bigCells2 = {
    width :  260 * this.scale,
    height :  220 * this.scale,
    x : 632 * this.scale,
    y : 90 * this.scale,
    visible: false
  };

  bigCells3 = {
    width :  260 * this.scale,
    height :  220 * this.scale,
    x : 632 * this.scale,
    y : 90 * this.scale,
    visible: false
  };

  bigCells4 = {
    width :  202 * this.scale,
    height :  202 * this.scale,
    x : 557 * this.scale,
    y : 112 * this.scale,
  };

  bigCells5 = {
    width :  202 * this.scale,
    height :  202 * this.scale,
    x : 766 * this.scale,
    y : 112 * this.scale,
  };

  blueChromosomeImage1 = {
    width :  112 * this.scale * 0.6,
    height :  38 * this.scale * 0.6,
    x : 535 * this.scale + 112 * this.scale * 0.6 / 2,
    y : 402 * this.scale,
    offsetX: 112 * this.scale * 0.6 / 2,
    offsetY: 38 * this.scale * 0.6 / 2,
  };

  blueChromosomeImage2 = {
    width :  110 * this.scale * 0.6,
    height :  34 * this.scale * 0.6,
    x : 671 * this.scale + 110 * this.scale * 0.6 / 2,
    y : 403 * this.scale,
    offsetX: 110 * this.scale * 0.6 / 2,
    offsetY: 34 * this.scale * 0.6 / 2,
  };

  blueChromosomeImage3 = {
    width :  80 * this.scale * 0.6,
    height :  32 * this.scale * 0.6,
    x : 808 * this.scale + 80 * this.scale * 0.6 / 2,
    y : 407 * this.scale,
    offsetX: 80 * this.scale * 0.6 / 2,
    offsetY: 32 * this.scale * 0.6 / 2,
  };

  blueChromosomeImage4 = {
    width :  78 * this.scale * 0.6,
    height :  24 * this.scale * 0.6,
    x : 915 * this.scale + 78 * this.scale * 0.6 / 2,
    y : 411 * this.scale,
    offsetX: 78 * this.scale * 0.6 / 2,
    offsetY: 24 * this.scale * 0.6 / 2,
  };

  redChromosomeImage1 = {
    width :  112 * this.scale * 0.6,
    height :  38 * this.scale * 0.6,
    x : 535 * this.scale + 112 * this.scale * 0.6 / 2,
    y : 470 * this.scale,
    offsetX: 112 * this.scale * 0.6 / 2,
    offsetY: 38 * this.scale * 0.6 / 2,
  };

  redChromosomeImage2 = {
    width :  110 * this.scale * 0.6,
    height :  34 * this.scale * 0.6,
    x : 671 * this.scale + 110 * this.scale * 0.6 / 2,
    y : 470 * this.scale,
    offsetX: 110 * this.scale * 0.6 / 2,
    offsetY: 34 * this.scale * 0.6 / 2,
  };

  redChromosomeImage3 = {
    width :  80 * this.scale * 0.6,
    height :  32 * this.scale * 0.6,
    x : 808 * this.scale + 80 * this.scale * 0.6 / 2,
    y : 474 * this.scale,
    offsetX: 80 * this.scale * 0.6 / 2,
    offsetY: 32 * this.scale * 0.6 / 2,
  };

  redChromosomeImage4 = {
    width :  78 * this.scale * 0.6,
    height :  24 * this.scale * 0.6,
    x : 915 * this.scale + 78 * this.scale * 0.6 / 2,
    y : 474 * this.scale,
    offsetX: 78 * this.scale * 0.6 / 2,
    offsetY: 24 * this.scale * 0.6 / 2,
  };

  dragPoint0 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 535 * this.scale + (56 * this.scale * 0.6) - (12 * this.scale),
    y : 402 * this.scale - (12 * this.scale),
  };

  dragPoint1 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 671 * this.scale + (55 * this.scale * 0.6) - (12 * this.scale),
    y : 403 * this.scale - (12 * this.scale),
  };

  dragPoint2 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 808 * this.scale + (56 * this.scale * 0.6) - (24 * this.scale),
    y : 407 * this.scale - (12 * this.scale),
  };

  dragPoint3 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 915 * this.scale + (56 * this.scale * 0.6) - (24 * this.scale),
    y : 411 * this.scale - (12 * this.scale),
  };

  dragPoint4 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 535 * this.scale + (56 * this.scale * 0.6) - (12 * this.scale),
    y : 470 * this.scale - (12 * this.scale),
  };

  dragPoint5 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 671 * this.scale + (56 * this.scale * 0.6) - (12 * this.scale),
    y : 470 * this.scale - (12 * this.scale),
  };

  dragPoint6 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 808 * this.scale + (56 * this.scale * 0.6) - (24 * this.scale),
    y : 474 * this.scale - (12 * this.scale),
  };

  dragPoint7 = {
    width :  24 * this.scale,
    height :  24 * this.scale,
    x : 915 * this.scale + (56 * this.scale * 0.6) - (24 * this.scale),
    y : 474 * this.scale - (12 * this.scale),
  };
}







