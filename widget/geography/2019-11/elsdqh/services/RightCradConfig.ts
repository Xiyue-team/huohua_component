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

  // 伊朗高原
  textTitle = {
    fill: ['#1A1A1A'],
    fontSize: 24,
    fontWeight: 'bold',
  };

  // 伊朗高原说明文字
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
    x: this.width * 0.5 / this.scale - 384,
    y: this.height * 0.5 / this.scale - 220,
    width: 384 * 2,
    height: 220 * 2,
  };

  smallCradImage = [
    // 第一排
    {
      top: 106.4,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xFFF9BE
    },
    // 第二排
    {
      top: 188.7,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xFBD47B
},
    // 第三排
    {
      top: 271.1,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0x8D679C
    },
    // 第4排
    {
      top: 353.4,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xB36581
    }
  ];

  // 小图片偏移量
  smallCradImageOffset = [
    // 第一排
    {
      top: 0,
      left: 99,
    },
    // 第二排
    {
      top: 0,
      left: 99,
    },
    // 第三排
    {
      top: 0,
      left: 99,
    },
    // 第4排
    {
      top: 0,
      left: 99,
    }
  ];

  smallImageText = [
    {
      fill: '#000000',
      fontSize: 20,
      x: 122,
      y: 121.5
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 132,
      y: 203.8
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 152,
      y: 286.2
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 132,
      y: 368.5
    }
  ];
}

