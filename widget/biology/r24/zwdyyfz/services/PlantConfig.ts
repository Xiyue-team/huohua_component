import {fabric} from 'fabric';
export class PlantConfig {

  width = window.innerWidth;
  height = window.innerHeight;
  scale = this.width / 1024;

  funllScreenScale = this.width / this.height  > 16 / 9 ? this.width / 1024 : this.height / 576;
  plantImageConfig: any = [
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.123 + 190 * 0.5 * this.scale,
      top: this.height * 0.156  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions,
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.407 + 190 * 0.5 * this.scale,
      top: this.height * 0.156  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions,
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.691 + 190 * 0.5 * this.scale,
      top: this.height * 0.156  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions,
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.123 + 190 * 0.5 * this.scale,
      top: this.height * 0.514  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions,
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.407 + 190 * 0.5 * this.scale,
      top: this.height * 0.514  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions,
    {
      originY: 'center',
      originX: 'center',
      left: this.width * 0.691 + 190 * 0.5 * this.scale,
      top: this.height * 0.514  + 190 * 0.5 * this.scale,
      hoverCursor: 'pointer',
      scaleX: 0.25 * this.scale,
      scaleY: 0.25 * this.scale,
      selectable: false
    } as fabric.IImageOptions
  ];

  leftImageConfig = {
    originY: 'center',
    originX: 'center',
    left: this.width * 0.25,
    top: this.height * 0.5,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
  };

  rightImageConfig = {
    originY: 'center',
    originX: 'center',
    left: this.width * 0.75,
    top: this.height * 0.5,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    opacity: 0,
    selectable: false
  };

  rightFullscreenImag = {
    originY: 'center',
    originX: 'center',
    left: this.width * 0.75,
    top: this.height * 0.5,
    scaleX: 0.5 * this.funllScreenScale,
    scaleY: 0.5 * this.funllScreenScale,
    opacity: 0,
    selectable: false
  };

  leftText = {
    left: 24 * this.scale,
    top: 24 * this.scale,
    fontSize: 24 * this.scale,
    fill: '#000',
    opacity: 0,
    selectable: false,
  };

  rightText1 = {
    originY: 'bottom',
    originX: 'left',
    left: this.width * 0.57,
    top: window.innerHeight - window.innerHeight * 0.104,
    textAlign: 'left',
    fontSize: 24 * this.scale,
    fill: '#000',
    opacity: 0,
    selectable: false,
  };

  rightText2 = {
    originY: 'bottom',
    originX: 'left',
    left: this.width * 0.57,
    top: window.innerHeight - window.innerHeight * 0.042,
    fontSize: 24 * this.scale,
    fill: '#000',
    opacity: 0,
    selectable: false,
  };

  potatoText = '土豆是块茎，可用茎进行营养繁殖。';

  carrotText1 = '胡萝卜属于变态的肉质根，可以用';
  carrotText2 = '根营养繁殖。';

  strawberryText1 = '草莓的茎属于匍匐茎，在茎节处可';
  strawberryText2 = '以生根发芽。可以用茎营养繁殖。';

  redPotatoText1 = '红薯属于块根，红薯的茎属于匍匐';
  redPotatoText2 = '茎，可以用根或茎进行营养繁殖。';

  onionText = '洋葱属于鳞茎，可用茎进行营养繁殖。';

  leafText1 = '落地生根的叶肥厚，叶片边缘可萌发';
  leafText2 = '出小叶，一触即落，且落地生根。';


}
