import { fabric } from 'fabric';

export class RightCradConfig {
  width = window.innerWidth;
  height = window.innerHeight;

  // scale = this.width / this.height > 16 / 9 ? this.height / 675 : this.width / 1200;

  scale1 = this.width > 1100 ? 1 : (this.width <= 800 ? 0.5 : 0.7);
  rightCanvasWidth = 420;

  scale2 = this.rightCanvasWidth * this.scale1 / this.height > 420 / 675 ? this.height / 675 : this.rightCanvasWidth  * this.scale1 / 420;
  scale = this.scale1;

  whiteRect = {
    left: 0,
    top: 0,
    width: 384,
    height: 510,
    fill: '',
    // selectable: false
  };

  cardImage = {
    left: 0,
    top: 0,
    width: 384,
    height: 220,
  };

  // 卡片标题
  textTitle = {
    fill: ['#1A1A1A'],
    fontSize: 24,
    fontWeight: 'bold',
  };

  // 说明文字
  textContent = {
    fill: '#333333',
    fontSize: 18,
    lineHeight: 32,
  };

  cardConfig = {
    x: 768 - 384,
    y: 0,
    width: 384,
    height: 510,
    subTargetCheck: true,
    selectable: false,
  };

  // 卡片上的蒙板
  cardImageMask = {
    left: this.cardConfig.x,
    top: this.cardConfig.y + 220 * 0.5,
    width: 384,
    height: 220,
    cornerSize: 8,
    fill: '',
    selectable: false,
    visible: false
  };

  bigImageMask = {
    x: 0,
    y: 0,
    width: 384 * 2,
    height: 220 * 2,
  };

  smallCradImage = [
    // 第一排
    {
      top: 0,
      left: 0,
      width: 384,
      height: 170,
    },
    // 第二排
    {
      top: 170,
      left: 0,
      width: 192,
      height: 170,
    },
    {
      top: 170,
      left: 192,
      width: 192,
      height: 170,
    },
    // 第三排
    {
      top: 170 + 170,
      left: 0,
      width: 192,
      height: 170,
    },
    {
      top: 170 + 170,
      left: 192,
      width: 192,
      height: 170,
    },
  ];

  // 小图片偏移量
  smallCradImageOffset = [
    // 第一排
    {
      top: 40,
      left: 0,
    },
    {
      top: 20,
      left: 20,
    },
    // 第二排
    {
      top: 20,
      left: 20,
    },
    {
      top: 20,
      left: 170,
    },
    // 第三排
    {
      top: 20,
      left: 20,
    },
  ];

  smallImageText = [
    {
      fill: '#FFFFFF',
      fontSize: 18,
      x: 10,
      y: 140
    },
    {
      fontSize: 18,
      fill: '#FFFFFF',
      x: 10,
      y: 120 + 170
    },
    {
      fontSize: 18,
      fill: '#FFFFFF',
      x: 192 + 10,
      y: 140 + 170
    },
    {
      fontSize: 18,
      fill: '#FFFFFF',
      x: 10,
      y: 140 + 170 + 170
    },
    {
      fontSize: 18,
      fill: '#FFFFFF',
      x: 192 + 10,
      y: 140 + 170 + 170
    }
  ];
}

