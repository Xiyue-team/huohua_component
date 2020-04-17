import { ScaleValue } from '../../../../../src/konva/template/SimpleKonvaTemplate3';

export class ZwConfig {

  scaleValue = new ScaleValue();

  scale = this.scaleValue.scale;

  moveToTop = this.scaleValue.moveToTop;

  width = window.innerWidth;
  height = window.innerHeight;

  bgColorImage = {
    width :  this.width * 2,
    height :  this.height * 2,
    opacity : 1,
    x : 0,
    y : 0,
  };

  smallSunImage = {
      width :  48 * this.scale,
      height :  48 * this.scale,
      opacity : 1,
      x : 952 * this.scale,
      y : 220 * this.scale  - this.moveToTop,
  };

  smallCatheterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 888 * this.scale,
    y : 307 * this.scale  - this.moveToTop,
  };

  smallScaldedBladesImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 952 * this.scale,
    y : 307 * this.scale  - this.moveToTop,
  };

  smallSqueezeBottleImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 888 * this.scale,
    y : 394 * this.scale  - this.moveToTop,
  };

  smallFreshBladesImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 952 * this.scale,
    y : 394 * this.scale  - this.moveToTop,
  };

  smallLimeWaterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 888 * this.scale,
    y : 481 * this.scale  - this.moveToTop,
  };

  smallCleanWaterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 1,
    x : 952 * this.scale,
    y : 481 * this.scale  - this.moveToTop,
  };

  titleText = {
    x: 24,
    y: 24,
    text: '植物呼吸作用的探究',
    fontSize: 24 * this.scale,
    fill: '#FFFFFF'
  };

  rect = {
    x: (877 + 66) * this.scale,
    y: 0,
    width: 80 * this.scale,
    height: 576 * this.scale,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
    opacity: 0.5,
    visible: false
  };

  smallSunText = {
    x: 962 * this.scale,
    y: 277 * this.scale - this.moveToTop,
    text: '太阳',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  catheterText = {
    x: 898 * this.scale,
    y: 364 * this.scale - this.moveToTop,
    text: '导管',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  scaldedBladesText = {
    x: 941 * this.scale,
    y: 364 * this.scale - this.moveToTop,
    text: '烫过的叶片',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  squeezeBottleText = {
    x: 891 * this.scale,
    y: 451 * this.scale - this.moveToTop,
    text: '挤压瓶',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  freshBladesText = {
    x: 948 * this.scale,
    y: 451 * this.scale - this.moveToTop,
    text: '新鲜叶片',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  limeWaterText = {
    x: 877 * this.scale,
    y: 538 * this.scale - this.moveToTop,
    text: '澄清石灰水',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  cleanWaterText = {
    x: 962 * this.scale,
    y: 538 * this.scale - this.moveToTop,
    text: '清水',
    fontSize: 14 * this.scale,
    fill: '#FFFFFF'
  };

  sunImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 952 * this.scale,
    y : 220 * this.scale  - this.moveToTop,
    draggable: true,
  };

  sunImage2 = {
    width :  508 * this.scale,
    height :  472 * this.scale,
  };

  catheterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 888 * this.scale,
    y : 307 * this.scale  - this.moveToTop,
    draggable: true,
  };

  catheterImage2 = {
    width :  146 * this.scale,
    height :  192 * this.scale,
  };

  scaldedBladesImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 952 * this.scale,
    y : 307 * this.scale  - this.moveToTop,
    draggable: true,
  };

  scaldedBladesImage2 = {
    width :  60 * this.scale,
    height :  60 * this.scale,
  };

  squeezeBottleImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 888 * this.scale,
    y : 394 * this.scale  - this.moveToTop,
    draggable: true,
  };

  squeezeBottleImage2 = {
    width :  101 * this.scale,
    height :  253 * this.scale,
  };

  freshBladesImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 952 * this.scale,
    y : 394 * this.scale  - this.moveToTop,
    draggable: true,
  };

  freshBladesImage2 = {
    width :  60 * this.scale,
    height :  60 * this.scale,
  };

  limeWaterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 888 * this.scale,
    y : 481 * this.scale  - this.moveToTop,
    draggable: true,
  };

  limeWaterImage2 = {
    width :  172 * this.scale,
    height :  162 * this.scale,
  };

  cleanWaterImage = {
    width :  48 * this.scale,
    height :  48 * this.scale,
    opacity : 0,
    x : 952 * this.scale,
    y : 481 * this.scale - this.moveToTop,
    draggable: true,
  };

  cleanWaterImage2 = {
    width :  172 * this.scale,
    height :  162 * this.scale,
  };
}







