import { fabric } from 'fabric';

export class RightCradConfig {
  width = window.innerWidth;
  height = window.innerHeight;
  scale = this.width / this.height > 16 / 9 ? this.height / 675 : this.width / 1200;

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
    width: 384 * 2,
    height: 220 * 2,
    scaleX: 0.5,
    scaleY: 0.5,
    cornerSize: 8,
    // clipTo: (ctx: any) => {
    //   const rect = new fabric.Rect({
    //     left: 0,
    //     top: 0,
    //     rx: 18,
    //     ry: 18,
    //     width: this.cardImage.width,
    //     height: this.cardImage.height,
    //     fill: '#000000'
    //   });
    //   rect._render(ctx);
    // },
  };

  // 伊朗高原
  textTitle = {
    left: 0,
    top: 244,
    fill: '#1A1A1A',
    fontSize: 24,
    fontWeight: 'bold',
    // visible: false
    opacity: 0
  };

  // 伊朗高原说明文字
  textContent = {
    left: 0,
    top: 278,
    fill: '#333333',
    fontSize: 18,
    _fontSizeMult: 1.5,
    // visible: false
    opacity: 0
  };

  cardConfig = {
    left: (this.width - 420) + 18 * this.scale,
    top: this.height * 0.5,
    width: 384 * this.scale,
    height: 510 * this.scale,
    originX: 'left',
    originY: 'center',
    subTargetCheck: true,
    selectable: false,
    // visible: false
  };

  smallCradImage = [
    // 第一排
    {
      top: -255,
      left: -240 + 48
    },
    {
      top: -255,
      left: -240 + 192
    },
    {
      top: -255,
      left: -240 + 192 + 96
    },
    // 第二排
    {
      top: -255 + 102,
      left: -240
    },
    {
      top: -255 + 102,
      left: -240 + 96
    },
    {
      top: -255 + 102,
      left: -240 + 96 + 96
    },
    {
      top: -255 + 102,
      left: -240 + 96 + 96 + 96
    },
    // 第三排
    {
      top: -255 + 102 + 102,
      left: -240
    },
    {
      top: -255 + 102 + 102,
      left: -240 + 96
    },
    {
      top: -255 + 102 + 102,
      left: -240 + 96 + 96
    },
    {
      top: -255 + 102 + 102,
      left: -240 + 96 + 96 + 96
    },
    // 第四排
    {
      top: -255 + 102 + 102 + 102,
      left: -240
    },
    {
      top: -255 + 102 + 102 + 102,
      left: -240 + 96
    },
    {
      top: -255 + 102 + 102 + 102,
      left: -240 + 96 + 96
    },
    {
      top: -255 + 102 + 102 + 102,
      left: -240 + 96 + 96 + 96
    },
    // 第五排
    {
      top: -255 + 102 + 102 + 102 + 102,
      left: -240
    },
    {
      top: -255 + 102 + 102 + 102 + 102,
      left: -240 + 96
    },
    {
      top: -255 + 102 + 102 + 102 + 102,
      left: -240 + 96 + 96
    },
    {
      top: -255 + 102 + 102 + 102 + 102,
      left: -240 + 96 + 96 + 96
    },
  ];

  // 蒙板
  maskArray = [
    {
      width: 192,
      height: 102,
      fill: '#0199ff'
    },
    {
      width: 96,
      height: 102,
      fill: '#0199ff'
    },
  ];

  // 卡片上的蒙板
  cardImageMask = {
    left: (this.width - 420) + 18 * this.scale,
    top: this.height * 0.5 - 510 * 0.5 * this.scale + 220 * 0.5 * this.scale,
    width: 384 * this.scale,
    height: 220 * this.scale,
    cornerSize: 8,
    fill: '',
    originY: 'center',
    selectable: false,
    visible: false
  };

  bigImageMask = {
    left: this.width * 0.5,
    top: this.height * 0.5,
    width: 384 * 2 * this.scale,
    height: 220 * 2 * this.scale,
    cornerSize: 8,
    fill: '',
    originX: 'center',
    originY: 'center',
    selectable: false,
    visible: false
  };
}

