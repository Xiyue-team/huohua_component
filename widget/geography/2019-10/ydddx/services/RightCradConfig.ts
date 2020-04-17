export class RightCradConfig {
  width = window.innerWidth;
  height = window.innerHeight;

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
      top: 0,
      left: 0,
      width: 192,
      height: 170,
    },
    {
      top: 0,
      left: 192,
      width: 192,
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
      x: 192 + 10,
      y: 140
    },
    {
      fontSize: 18,
      fill: '#FFFFFF',
      x: 10,
      y: 140 + 170
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
    },
  ];
}

