export class PgdjgConfig {
  width = window.innerWidth;
  height = window.innerHeight;
  scale = window.innerWidth / window.innerHeight > 1200 / 675 ?  (window.innerHeight / 675) :  (window.innerWidth / 1200);


  appleImage = {
    width: 500 * this.scale,
    height: 487 * this.scale,
    x: this.width * 0.5 - 500 * this.scale / 2,
    y: this.height * 0.5 - 487 * this.scale / 2
  };

  circleConfig = {
    radius: 8,
    fill: '#ffffff',
    stroke: '#9a9477',
    strokeWidth: 2,
  };

  //果肉标注点
  pulpCircleConfig = {
    x: this.width * 0.5 + 82 * this.scale,
    y: this.height * 0.5 - 67.5 * this.scale
  };

  //种子标注点
  seedCircleConfig = {
    x: this.width * 0.5  - 80 * this.scale / 2,
    y: this.height * 0.5  - 35 * this.scale / 2
  };

  //果皮标注点
  peelCircleConfig = {
    x: this.width * 0.5  + 420 * this.scale / 2,
    y: this.height * 0.5  + 230 * this.scale / 2
  };

  lineConfig = {
    stroke: '#ffffff',
    strokeWidth: 3,
  };

  pulpLineConfig = {
    points: [this.width * 0.5 + 82 * this.scale, this.height * 0.5 - 67.5 * this.scale,
      this.width * 892 / 1200, this.height * 0.5 - 67.5 * this.scale],
  };

  seedLineConfig = {
    points: [this.width * 0.5  - 80 * this.scale / 2, this.height * 0.5  - 35 * this.scale / 2,
      this.width * 284 / 1200, this.height * 0.5  - 35 * this.scale / 2],
  };

  peelLineConfig = {
    points: [this.width * 0.5  + 420 * this.scale / 2, this.height * 0.5  + 230 * this.scale / 2,
      this.width * 902 / 1200, this.height * 0.5  + 230 * this.scale / 2],
  };

  rectConfig = {
    width: 72,
    height: 38,
    fill: '#ffffff',
    stroke: '#9a9477',
    strokeWidth: 2,
    cornerRadius: 6,
    x: 0,
    y: 0
  };

  rectGroup = {
    draggable: true,
  };

  pulpGroupConfig = {
    x: this.width * 892 / 1200,
    y: (this.height * 0.5 - 67.5 * this.scale) - (38 / 2)
  };

  seedGroupConfig = {
    x: this.width * 284 / 1200 - this.rectConfig.width,
    y: (this.height * 0.5  - 35 * this.scale / 2) - (38 / 2)
  };

  peelGroupConfig = {
    x: this.width * 902 / 1200,
    y: (this.height * 0.5  + 230 * this.scale / 2) - (38 / 2)
  };

  textConfig = {
    fontSize: 16,
    fill: '#333333',
    x: this.rectConfig.width / 2 - 16,
    y: this.rectConfig.height / 2 - 8,
  };

  pulpTextConfig = {
    text: '果肉',
  };
  seedTextConfig = {
    text: '种子',
  };
  peelTextConfig = {
    text: '果皮',
  };

  animationTime = 0.3;
  circleScaleTime = 0.15;

  animationScaleOption1 = {
    time: this.circleScaleTime,
    x: 1,
    y: 1,
    x1: 0.4,
    y1: 0.4,
  };

  animationScaleOption2 = {
    time: this.circleScaleTime,
    x: 0.4,
    y: 0.4,
    x1: 0,
    y1: 0,
  };

  animationScaleOption3 = {
    time: this.circleScaleTime,
    x: 0,
    y: 0,
    x1: 0.4,
    y1: 0.4,
  };

  animationScaleOption4 = {
    time: this.circleScaleTime,
    x: 0.4,
    y: 0.4,
    x1: 1,
    y1: 1,
  };

  //长线变短线
  pulpLineAnimationOption1 = {
    time: this.animationTime,
    startPointX: this.width * 0.5 + 82 * this.scale,
    startPointY: this.height * 0.5 - 67.5 * this.scale,

    endPointX: this.width * 892 / 1200,
    endPointY: this.height * 0.5 - 67.5 * this.scale,

    endPointX1: this.width * 0.5 + 82 * this.scale,
    endPointY1: this.height * 0.5 - 67.5 * this.scale,
  };

  seedLineAnimationOption1 = {
    time: this.animationTime,
    startPointX: this.width * 0.5  - 80 * this.scale / 2,
    startPointY: this.height * 0.5  - 35 * this.scale / 2,

    endPointX: this.width * 284 / 1200,
    endPointY: this.height * 0.5  - 35 * this.scale / 2,

    endPointX1: this.width * 0.5  - 80 * this.scale / 2,
    endPointY1: this.height * 0.5  - 35 * this.scale / 2,
  };

  peelLineAnimationOption1 = {
    time: this.animationTime,
    startPointX: this.width * 0.5  + 420 * this.scale / 2,
    startPointY: this.height * 0.5  + 230 * this.scale / 2,

    endPointX: this.width * 902 / 1200,
    endPointY: this.height * 0.5  + 230 * this.scale / 2,

    endPointX1: this.width * 0.5  + 420 * this.scale / 2,
    endPointY1: this.height * 0.5  + 230 * this.scale / 2,
  };



  //短线变长线
  pulpLineAnimationOption2 = {
    time: this.animationTime,

    startPointX: this.width * 0.5 + 82 * this.scale,
    startPointY: this.height * 0.5 - 67.5 * this.scale,

    endPointX: this.width * 0.5 + 82 * this.scale,
    endPointY: this.height * 0.5 - 67.5 * this.scale,

    endPointX1: this.width * 892 / 1200,
    endPointY1: this.height * 0.5 - 67.5 * this.scale,


  };

  seedLineAnimationOption2 = {
    time: this.animationTime,

    startPointX: this.width * 0.5  - 80 * this.scale / 2,
    startPointY: this.height * 0.5  - 35 * this.scale / 2,

    endPointX: this.width * 0.5  - 80 * this.scale / 2,
    endPointY: this.height * 0.5  - 35 * this.scale / 2,

    endPointX1: this.width * 284 / 1200,
    endPointY1: this.height * 0.5  - 35 * this.scale / 2,


  };

  peelLineAnimationOption2 = {
    time: this.animationTime,

    startPointX: this.width * 0.5  + 420 * this.scale / 2,
    startPointY: this.height * 0.5  + 230 * this.scale / 2,

    endPointX: this.width * 0.5  + 420 * this.scale / 2,
    endPointY: this.height * 0.5  + 230 * this.scale / 2,

    endPointX1: this.width * 902 / 1200,
    endPointY1: this.height * 0.5  + 230 * this.scale / 2,


  };

  //碰撞判断数据
  pulpBigCircle = {
    x: this.width / 2 - this.width * 0.015,
    y: this.height / 2 + this.height * 0.03,
    r: 230 * this.scale,
  };

  pulpSmallCircle = {
    x: this.width / 2 - this.width * 0.015,
    y: this.height / 2 - this.height * 0.02,
    r: 40 * this.scale,
  };

  seedCircle = {
    x: this.width / 2 - this.width * 0.015,
    y: this.height / 2 - this.height * 0.02,
    r: 40 * this.scale,
  };

  peelBigCircle = {
    x: this.width / 2 ,
    y: this.height / 2 + this.height * 0.02,
    r: 300 * this.scale
  };

  peelSmallCircle = {
    x: this.width / 2 - this.width * 0.015,
    y: this.height / 2 + this.height * 0.05,
    r: 170 * this.scale,
  };

  prompt1Config = {
    x: 0,
    y: 0,
    text: '标签可拖离当前位置',
    fontSize: 18,
    fill: 'rgba(255,255,255,0.7)'
  };

  prompt2Config = {
    x: 0,
    y: 0,
    text: '标签可拖动到相应结构',
    fontSize: 18,
    fill: 'rgba(255,255,255,0.7)'
  };

  //苹果上方禁止拖动的矩形
  disableDragRect =  {
      x: this.width / 2 - this.width * 0.06,
      y: this.height / 2 - this.height * 0.36,
      width: this.width / 10,
      height: this.height / 10,
  };


  promptLayerConfig = {
    x: (window as any)['env'].browserInfo.isSmallDevice ? this.width * 0.5 - this.width * 0.095 : this.width * 0.5 - this.width * 0.055,
    y: this.height * 0.5 - 550 * this.scale / 2
  };

}
