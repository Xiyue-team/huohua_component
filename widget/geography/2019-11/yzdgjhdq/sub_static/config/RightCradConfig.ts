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
      width: 96,
      height: 102,
    },
    {
      top: 0,
      left: 96,
      width: 96,
      height: 102,
    },
    {
      top: 0,
      left: 96 + 96,
      width: 96,
      height: 102,
    },
    {
      top: 0,
      left: 96 + 96 + 96,
      width: 96,
      height: 102,
    },
    // 2
    {
      top: 102,
      left: 0,
      width: 96,
      height: 102,
    },
    {
      top: 102,
      left: 96,
      width: 96,
      height: 102,
    },
    {
      top: 102,
      left: 96 + 96,
      width: 96,
      height: 102,
    },
    {
      top: 102,
      left: 96 + 96 + 96,
      width: 96,
      height: 102,
    },
    // 3
    {
      top: 102 + 102,
      left: 0,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102,
      left: 96,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102,
      left: 96 + 96,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102,
      left: 96 + 96 + 96,
      width: 96,
      height: 102,
    },
    // 4
    {
      top: 102 + 102 + 102,
      left: 0,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102 + 102,
      left: 96,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102 + 102,
      left: 96 + 96,
      width: 96,
      height: 102,
    },
    {
      top: 102 + 102 + 102,
      left: 96 + 96 + 96,
      width: 96,
      height: 102,
    }
  ];

  // 小图片偏移量
  smallCradImageOffset = [
    // 1
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    // 2
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    // 3
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    // 4
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
  ];

  smallImageText = [
    // 1
    {
      fill: '#FFFFFF',
      fontSize: 15,
      x: 6,
      y: 79
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fill: '#FFFFFF',
      fontSize: 15,
      x: 6,
      y: 79
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    // 2
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fill: '#FFFFFF',
      fontSize: 15,
      x: 6,
      y: 79
    },
    {
      fontSize: 16,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    // 3
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fill: '#FFFFFF',
      fontSize: 15,
      x: 6,
      y: 79
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    // 4
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    },
    {
      fill: '#FFFFFF',
      fontSize: 15,
      x: 6,
      y: 79
    },
    {
      fontSize: 12,
      fill: '#FFFFFF',
      x: 6,
      y: 80
    },
    {
      fontSize: 15,
      fill: '#FFFFFF',
      x: 6,
      y: 79
    }
  ];

  constructor () {
    console.log('RightCradConfig', this.smallCradImage.length, this.smallCradImageOffset.length, this.smallImageText.length);
  }
}

