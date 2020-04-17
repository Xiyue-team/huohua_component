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
      top: 65.3,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xF7CEB9
    },
    // 第二排
    {
      top: 147.6,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xA8A1CD
},
    // 第三排
    {
      top: 229.9,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xFFFBD2
    },
    // 第4排
    {
      top: 312.2,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xD6EAD6
    },
    // 第5排
    {
      top: 394.5,
      left: 99,
      width: 186,
      height: 52.2,
      color: 0xB1D8B6
    },
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
    },
    // 第5排
    {
      top: 0,
      left: 99,
    },
  ];

  smallImageText = [
    {
      fill: '#000000',
      fontSize: 20,
      x: 132,
      y: 80.4
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 132,
      y: 162.7
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 122,
      y: 245
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 122,
      y: 327.3
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 132,
      y: 409.6
    }
  ];
}

