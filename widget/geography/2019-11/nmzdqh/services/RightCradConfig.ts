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
      top: 39.2,
      left: 24,
      width: 160,
      height: 52.2,
      color: 0xCCAFC2
    },
    // 第二排
    {
      top: 39.2,
      left: 200,
      width: 160,
      height: 52.2,
      color: 0xC7E7F1
},
    // 第三排
    {
      top: 115.5,
      left: 24,
      width: 160,
      height: 52.2,
      color: 0xAFBCA1
    },
    // 第4排
    {
      top: 115.5,
      left: 200,
      width: 160,
      height: 52.2,
      color: 0xEB8F73
    },
    // 第5排
    {
      top: 191.7,
      left: 24,
      width: 160,
      height: 52.2,
      color: 0xFAE68C
    },
    // 第6排
    {
      top: 191.7,
      left: 200,
      width: 160,
      height: 52.2,
      color: 0xD6B84A
    },
    // 第7排
    {
      top: 268,
      left: 24,
      width: 160,
      height: 52.2,
      color: 0xF8CD9A
    },
    // 第8排
    {
      top: 268,
      left: 200,
      width: 160,
      height: 52.2,
      color: 0xE1E16D
    },
    // 第9排
    {
      top: 344.3,
      left: 24,
      width: 336,
      height: 52.2,
      color: 0xEDE8A6
    },
    // 第10排
    {
      top: 420.6,
      left: 24,
      width: 336,
      height: 52.2,
      color: 0xDBD1DF
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
    // 第6排
    {
      top: 0,
      left: 99,
    },
    // 第7排
    {
      top: 0,
      left: 99,
    },
    // 第8排
    {
      top: 0,
      left: 99,
    },
    // 第9排
    {
      top: 0,
      left: 99,
    },
    // 第10排
    {
      top: 0,
      left: 99,
    }
  ];

  smallImageText = [
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 44,
      y: 55.3
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 230,
      y: 55.3
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 34,
      y: 131.6
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 210,
      y: 131.6
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 44,
      y: 207.9
    },
    {
      fill: '#FFFFFF',
      fontSize: 20,
      x: 220,
      y: 207.9
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 44,
      y: 284.1
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 220,
      y: 284.1
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 110,
      y: 359.4
    },
    {
      fill: '#000000',
      fontSize: 20,
      x: 92,
      y: 435.7
    }
  ];
}

