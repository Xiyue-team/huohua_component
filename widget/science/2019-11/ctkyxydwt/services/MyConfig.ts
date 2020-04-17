export class MyConfig {
  width = 1200;
  height = 675;

  rect = {
    left: 0,
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

  blueRect1 = {
    left: this.rect.left,
    top: this.rect.top,
    width: 463,
    height: 420,
    fill: '#6EA8E8',
    selectable: false,
    rx: 4,
    ry: 4
  };

  blueRect2 = {
    left: this.rect.left + this.rect.width - 463,
    top: this.rect.top,
    width: 463,
    height: 420,
    fill: '#6EA8E8',
    selectable: false,
    rx: 4,
    ry: 4
  };

  mesa = {
    left: this.rect.left + this.rect.width * 0.5 - 440,
    top: this.rect.top + this.rect.height - 50,
    width: 1760,
    height: 124,
    hasControls: false,
    hasBorders: false,
    selectable: false,
    scaleX: 0.5,
    scaleY: 0.5
  };

  // 图片的缩放系数
  imgScale = 82 / 111;

  // 图片的高度
  imgTop = this.rect.top + this.rect.height - 21 - 111 * this.imgScale;

  attractive = [
    {
      left: this.rect.left + 114 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '可吸引'
    },

    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '可吸引'
    },

    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '可吸引'
    },

    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '可吸引'
    }
  ];

  unattractive = [
    {
      left: this.rect.left + 114 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '不可吸引'
    },

    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '不可吸引'
    },

    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '不可吸引'
    },
    {
      left: this.rect.left + 114 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 82 + 13 + 111 * 0.5 * this.imgScale,
      top: this.imgTop + 111 * 0.5 * this.imgScale,
      width: 111 * 2,
      height: 111 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      name: '不可吸引'
    }
  ];

  dashFrame = {
    width: 111,
    height: 111,
    fill: '#6EA8E8',
    strokeWidth: 2,
    stroke: '#ffffff',
    strokeDashArray: [4, 4],
    selectable: false,
    visible: false,
    rx: 4,
    ry: 4,
    originX: 'center',
    originY: 'center',
  };

  discolorationFrame = {
    width: 111,
    height: 111,
    fill: '#6FD3C2',
    strokeWidth: 12,
    stroke: '#ffa0ac',
    selectable: false,
    visible: false,
    originX: 'center',
    originY: 'center',
    rx: 4,
    ry: 4
  };

  unattractiveDashFrame = [
    {
      left: this.blueRect1.left + 39,
      top: this.blueRect1.top + 23
    },
    {
      left: this.blueRect1.left + 39 + 111 + 26,
      top: this.blueRect1.top + 23
    },
    {
      left: this.blueRect1.left + 39 + 111 + 26 + 111 + 26,
      top: this.blueRect1.top + 23
    },

    {
      left: this.blueRect1.left + 39,
      top: this.blueRect1.top + 23 + 111 + 18
    },
    {
      left: this.blueRect1.left + 39 + 111 + 26,
      top: this.blueRect1.top + 23 + 111 + 18
    },
    {
      left: this.blueRect1.left + 39 + 111 + 26 + 111 + 26,
      top: this.blueRect1.top + 23 + 111 + 18
    },

    {
      left: this.blueRect1.left + 39,
      top: this.blueRect1.top + 23 + 111 + 18 + 111 + 18
    },
    {
      left: this.blueRect1.left + 39 + 111 + 26,
      top: this.blueRect1.top + 23 + 111 + 18 + 111 + 18
    }
  ];

  attractiveDashFrame = [
    {
      left: this.blueRect2.left + 39,
      top: this.blueRect2.top + 23
    },
    {
      left: this.blueRect2.left + 39 + 111 + 26,
      top: this.blueRect2.top + 23
    },
    {
      left: this.blueRect2.left + 39 + 111 + 26 + 111 + 26,
      top: this.blueRect2.top + 23
    },

    {
      left: this.blueRect2.left + 39,
      top: this.blueRect2.top + 23 + 111 + 18
    },
    {
      left: this.blueRect2.left + 39 + 111 + 26,
      top: this.blueRect2.top + 23 + 111 + 18
    },
    {
      left: this.blueRect2.left + 39 + 111 + 26 + 111 + 26,
      top: this.blueRect2.top + 23 + 111 + 18
    },

    {
      left: this.blueRect2.left + 39,
      top: this.blueRect2.top + 23 + 111 + 18 + 111 + 18
    },
    {
      left: this.blueRect2.left + 39 + 111 + 26,
      top: this.blueRect2.top + 23 + 111 + 18 + 111 + 18
    }
  ];

  tipText1 = {
    left: this.blueRect1.left + 322,
    top: this.blueRect1.top + 316,
    fontSize: 28,
    fill: '#ffffff',
    selectable: false
  };

  tipText2 = {
    left: this.blueRect2.left + 322,
    top: this.blueRect2.top + 316,
    fontSize: 28,
    fill: '#ffffff',
    selectable: false
  };
}







