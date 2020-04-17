export class Config {
  scale = window['env'].browserInfo.isSmallDevice ? 1 : 2;
  width = 183;
  height = 183;
  scaleCoefficient = 0.33;
  left = 110;
  right = 921;
  hoverCursor = 'pointer';


  //大脑的位置
  cerebrumConfig = {
    left: 533 * this.scale,
    top: 293.5 * this.scale,
    originX: 'center',
    originY: 'center',
    hoverCursor: 'auto',
    width: 726 * this.scale,
    height: 594 * this.scale,
    selectable: false,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
  };

  //语言图片的位置
  languageConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.left * this.scale,
    top: 174 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'language'
  };

  //视觉图片的位置
  lookConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.left * this.scale,
    top: 282 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'look'
  };

  //听觉图片的位置
  hearingConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.left * this.scale,
    top: 391 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'hearing'
  };

  //运动图片的位置
  motionConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.right * this.scale,
    top: 120 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'motion'
  };

  //味觉图片的位置
  tasteConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.right * this.scale,
    top: 228 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'taste'
  };

  //嗅觉图片的位置
  olfactoryConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.right * this.scale,
    top: 336 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'olfactory'
  };

  //触觉图片的位置
  tactileConfig = {
    width: this.width * this.scale,
    height: this.height * this.scale,
    left: this.right * this.scale,
    top: 444 * this.scale,
    originX: 'center',
    originY: 'center',
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    hoverCursor: this.hoverCursor,
    name: 'tactile'
  };

  //线的位置
  line1Config = {
    width: 447 * this.scale,
    height: 249 * this.scale,
    left: 375 * this.scale,
    top: 155 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'motion'
  };

  line2Config = {
    width: 462 * this.scale,
    height: 333 * this.scale,
    left: 536 * this.scale,
    top: 105 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'tactile'
  };

  line3Config = {
    width: 333 * this.scale,
    height: 105 * this.scale,
    left: 375 * this.scale,
    top: 257 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'language'
  };

  line4Config = {
    width: 495 * this.scale,
    height: 303 * this.scale,
    left: 512 * this.scale,
    top: 262 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'hearing'
  };

  line5Config = {
    width: 174 * this.scale,
    height: 168 * this.scale,
    left: 625 * this.scale,
    top: 250 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'look'
  };

  line6Config = {
    width: 429 * this.scale,
    height: 531 * this.scale,
    left: 362 * this.scale,
    top: 304 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'taste'
  };

  line7Config = {
    width: 498 * this.scale,
    height: 453 * this.scale,
    left: 515 * this.scale,
    top: 309 * this.scale,
    scaleX: this.scaleCoefficient,
    scaleY: this.scaleCoefficient,
    selectable: false,
    hoverCursor: 'auto',
    name: 'olfactory'
  };

  circleConfig = {
    radius: 36.5 * this.scale,
    fill: 'rgba(216,216,216,0.9)',
    left: 0 * this.scale,
    stroke: '#FFFFFF',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'auto',
    originX: 'center',
    originY: 'center',
  };

  dragTipConfig = {
    fill: '#FFFFFF',
    fontSize: 22 * this.scale,
    left: 422 * this.scale,
    top: 126 * this.scale,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'auto',
  };

  normalTipConfig = {
    fill: '#FFFFFF',
    fontSize: 12 * this.scale,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'auto',
    top: 550 * this.scale,
    left: 714 * this.scale
  };

  lableConfig = {
    fill: '#FFFFFF',
    fontSize: 16 * this.scale,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    hoverCursor: 'auto',
  };
}
