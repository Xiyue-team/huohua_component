export class Config {
  scale = window['env'].browserInfo.isSmallDevice ? 1 : 1.3;
  width = 183;
  height = 183;
  scaleCoefficient = 0.33;
  hoverCursor = 'pointer';



  //初始地图的配置文件
  mapConfig = {
    hoverCursor: 'auto',
    width: 2154 * this.scale,
    height: 1776 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
  };

  //季风区文字的配置文件
  lable1Config = {
    fill: '#000000',
    fontSize: 32,
    left: 360 * this.scale,
    top: 325 * this.scale,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'auto',
  };

  //非季风区
  lable2Config = {
    fill: '#000000',
    fontSize: 32,
    left: 114 * this.scale,
    top: 224 * this.scale,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'auto',
  };

  arrowConfig = {
    hoverCursor: 'auto',
    width: 90 * this.scale,
    height: 240 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
  };
}
