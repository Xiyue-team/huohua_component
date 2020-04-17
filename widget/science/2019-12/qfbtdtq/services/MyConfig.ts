export class MyConfig {
  width = 1200;
  height = 675;

  rect = {
    left: this.width * 0.5 - 946 * 0.5,
    top: 0,
    width: 946,
    height: 557,
    fill: '#000000',
    strokeWidth: 2,
    stroke: '#ffffff',
    selectable: false,
    opacity: 0.7,
    visible: false
  };

  leftRect = {
    left: 0,
    top: 0,
    width: this.width * 0.66,
    height: this.height,
    fill: '',
    strokeWidth: 2,
    stroke: '#000000',
    selectable: false,
    visible: false
  };

  rightRect = {
    left: this.leftRect.width,
    top: 0,
    width: this.width * 0.34,
    height: this.height,
    fill: '#000000',
    selectable: false,
    opacity: 0.1,
    visible: false
  };

  grayRect = {
    left: this.leftRect.width,
    top: 0,
    width: this.width * 0.34,
    height: this.height,
    fill: '#000000',
    selectable: false,
    opacity: 0.1,
  };

  whiteFrame = [
    {
      left: 37,
      top: 132,
    },
    {
      left: 285,
      top: 132,
    },
    {
      left: 533,
      top: 132,
    },
    {
      left: 37,
      top: 358,
    },
    {
      left: 285,
      top: 358,
    },
    {
      left: 533,
      top: 358,
    },
  ];

  imgScale = 154 / 232;

  rightImage = [
    {
      left: 44,
      top: 120,
    },
    {
      left: 214,
      top: 120,
    },
    {
      left: 44,
      top: 271,
    },
    {
      left: 214,
      top: 271,
    },
    {
      left: 44,
      top: 423,
    },
    {
      left: 214,
      top: 423,
    },
  ];

  circle = {
    radius: 90,
    fill: '#55A19E',
    left: 0,
    stroke: '#ffffff',
    strokeWidth: 3
  };

  reselectButton = {
    left: 109,
    top: 144,
    selectable: false,
    visible: false
  };

  answerButton = {
    left: 109,
    top: 372,
    selectable: false,
    visible: false
  };
}







