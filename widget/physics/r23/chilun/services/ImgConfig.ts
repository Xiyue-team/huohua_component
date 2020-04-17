import { fabric } from 'fabric';

export class ImgConfig {

  width = window.innerWidth;
  height = window.innerHeight;
  chain: any = [];
  scale = this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200;

  constructor() {
    this.chain.push(this.config1);
    this.chain.push(this.config2);
    this.chain.push(this.config3);
    this.chain.push(this.config4);
    this.chain.push(this.config5);
    this.chain.push(this.config6);
  }

  config1 = {
    left: this.width * 0.273,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

  config2 = {
    left: this.width * 0.295,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

  config3 = {
    left: this.width * 0.317,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

  config4 = {
    left: this.width * 0.339,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

  config5 = {
    left: this.width * 0.361,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

  config6 = {
    left: this.width * 0.361,
    top: this.height * 0.382,
    width: 92,
    height: 38,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale
  } as fabric.IImageOptions;

}


