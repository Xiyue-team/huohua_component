export class MyConfig {
  width = 1200;
  height = 675;

  rect = {
    left: 0,
    top: 0,
    width: 880,
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
    width: 420,
    height: 420,
    fill: '#5aa8a5',
    selectable: false,
    hoverCursor: 'default',
    rx: 4,
    ry: 4
  };

  blueRect2 = {
    left: this.rect.left + this.rect.width - 420,
    top: this.rect.top,
    width: 420,
    height: 420,
    fill: '#5aa8a5',
    selectable: false,
    hoverCursor: 'default',
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
    hoverCursor: 'default',
    scaleX: 0.5,
    scaleY: 0.5
  };

  // 图片的缩放系数
  imgScale = 82 / 174;

  // 图片的高度
  imgTop = this.rect.top + this.rect.height - 21 - 174 * this.imgScale;

  attractive = [
    {
      left: this.rect.left + 92 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },

    {
      left: this.rect.left + 92 + 174 * 4 * this.imgScale + 41 * 4 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },

    {
      left: this.rect.left + 92 + 174 * 5 * this.imgScale + 41 * 5 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },
  ];

  unattractive = [
    {
      left: this.rect.left + 92 + 174 * this.imgScale + 41 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },

    {
      left: this.rect.left + 92 + 174 * 2 * this.imgScale + 41 * 2 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },

    {
      left: this.rect.left + 92 + 174 * 3 * this.imgScale + 41 * 3 + 174 * 0.5 * this.imgScale,
      top: this.imgTop + 174 * 0.5 * this.imgScale,
      width: 174 * 2,
      height: 174 * 2,
      scaleX: 0.5 * this.imgScale,
      scaleY: 0.5 * this.imgScale,
      hasControls: false,
      hasBorders: false,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
    },
  ];

  dashFrame = {
    width: 174,
    height: 174,
    fill: 'rgba(255,255,255,0.10)',
    strokeWidth: 2,
    stroke: '#30C1B2',
    strokeDashArray: [4, 4],
    selectable: false,
    visible: false,
    rx: 4,
    ry: 4,
    originX: 'center',
    originY: 'center',
    hoverCursor: 'default',
  };

  discolorationFrame = {
    width: 174,
    height: 174,
    fill: '#6FD3C2',
    strokeWidth: 12,
    stroke: '#ffa0ac',
    selectable: false,
    visible: false,
    originX: 'center',
    originY: 'center',
    hoverCursor: 'default',
    rx: 4,
    ry: 4
  };

  unattractiveDashFrame = [
    {
      left: this.blueRect1.left + 27,
      top: this.blueRect1.top + 27
    },
    {
      left: this.blueRect1.left + 219,
      top: this.blueRect1.top + 27
    },
    {
      left: this.blueRect1.left + 27,
      top: this.blueRect1.top + 219
    }
  ];

  attractiveDashFrame = [
    {
      left: this.blueRect2.left + 27,
      top: this.blueRect2.top + 27
    },
    {
      left: this.blueRect2.left + 219,
      top: this.blueRect2.top + 27
    },
    {
      left: this.blueRect2.left + 27,
      top: this.blueRect2.top + 219
    }
  ];

  tipText1 = {
    left: this.blueRect1.left + 315,
    top: this.blueRect1.top + 269,
    fontSize: 28,
    fill: '#ffffff',
    textAlign: 'right',
    hoverCursor: 'default',
    selectable: false
  };

  tipText2 = {
    left: this.blueRect2.left + 285,
    top: this.blueRect2.top + 269,
    fontSize: 28,
    fill: '#ffffff',
    textAlign: 'right',
    hoverCursor: 'default',
    selectable: false
  };
}







