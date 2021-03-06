export class RightCradConfig {
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

  // 卡片标题
  textTitle = {
    fill: ['#1A1A1A'],
    fontSize: 24,
    fontWeight: 'bold',
  };

  //说明文字
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

  // 放大到全屏图片蒙板
  bigImageMask = {
    x: 0,
    y: 0,
    width: 384 * 2,
    height: 220 * 2,
  };

  smallCradImage = [
    // 1
    {
      top: 0,
      left: 0,
      width: 192,
      height: 128,
    },
    {
      top: 0,
      left: 192,
      width: 192,
      height: 128,
    },
    // 2
    {
      top: 128,
      left: 0,
      width: 192,
      height: 128,
    },
    {
      top: 128,
      left: 192,
      width: 192,
      height: 128,
    },
    // 3
    {
      top: 128 + 128,
      left: 0,
      width: 192,
      height: 128,
    },
    {
      top: 128 + 128,
      left: 192,
      width: 192,
      height: 128,
    },
    // 4
    {
      top: 128 + 128 + 128,
      left: 0,
      width: 384,
      height: 128,
    }
  ];

  // 小图片偏移量
  smallCradImageOffset = [
    // 1
    {
      top: 40,
      left: 99,
    },
    {
      top: 40,
      left: 99,
    },
    // 2
    {
      top: 40,
      left: 99,
    },
    {
      top: 40,
      left: 99,
    },
    // 3
    {
      top: 40,
      left: 99,
    },
    {
      top: 40,
      left: 99,
    },
    // 4
    {
      top: 40,
      left: 0,
    }
  ];

  smallImageText = [
    // 1
    {
      fill: '#FFFFFF',
      fontSize: 16,
      x: 56,
      y: 105
    },
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 48,
      y: 105
    },
    // 2
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 40,
      y: 105
    },
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 64,
      y: 105
    },
    // 3
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 56,
      y: 105
    },
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 48,
      y: 105
    },
    // 4
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 152,
      y: 105
    }
  ];

  constructor () {
    console.log('RightCradConfig', this.smallCradImage.length, this.smallCradImageOffset.length, this.smallImageText.length);
  }
}

