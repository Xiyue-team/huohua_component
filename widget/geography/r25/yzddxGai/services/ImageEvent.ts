import { fabric } from 'fabric';

export class ImageEvent {
  // 遮挡板用于点击隐藏卡片
  transparentRect: any;

  time: any;

  // 提示文字
  tipsText1: any;
  tipsText2: any;

  // 判断是否显示过了
  tipsTextNumber1 = 0;
  tipsTextNumber2 = 0;


  constructor() {
    this.time = new Date().valueOf();

    this.transparentRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      hasBorders: false,
      hasControls: false,
      fill: '#000000',
      opacity: 0.001,
      visible: false
    });

    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = 1;

    this.tipsText1 = new fabric.Text('请拖动右侧标签到目标位置', {
      left: width * 0.5 - 14 * scale * 12 * 0.5,
      top: height * 0.926,
      fill: '#FFFFFF',
      fontSize: 14 * scale,
      selectable: false,
      visible: false
    });

    this.tipsText2 = new fabric.Text('点击文字查看详细介绍', {
      left: width * 0.5 - 14 * scale * 10 * 0.5,
      top: height * 0.926,
      fill: '#FFFFFF',
      fontSize: 14 * scale,
      selectable: false,
      visible: false
    });
  }

  // 改变点击按钮颜色
  /**
   * @param {boolean} isShow  改变或者还原
   * @param button  对应的点击按钮
   */
  showClickButton(isShow: boolean, button: any) {
    if (isShow) {
      button.getObjects()[0].set('fill', '#0199FF');
      button.getObjects()[1].set('fill', '#ffffff');
    } else {
      button.getObjects()[0].set('fill', '#ffffff');
      button.getObjects()[1].set('fill', '#000000');
    }
  }

  // 显示拖动按钮
  /**
   * @param {boolean} isShow  显示或者隐藏
   * @param dragButton  拖动按钮
   * @param image 对应显示的地球上文字图片
   */
  showDragButton(isShow: boolean, dragButton: any, image: any) {

    for (let i = 0; i < dragButton.length; i++) {
      if (image[i].visible) {
        dragButton[i].set('visible', false);
      } else {
        dragButton[i].set('visible', isShow);
      }
    }

  }

  /**
   * @param dragButton  隐藏拖动按钮
   */
  hideDragButton(dragButton: any) {
    for (let i = 0; i < dragButton.length; i++) {
        dragButton[i].set('visible', false);
    }
  }

  // 点击显示卡片
  /**
   * @param image  点击的文字图片
   * @param imageCard 对应显示的卡片
   */
  clickShowCardEvent(image: any, imageCard: any, imageCardArray1: any, imageCardArray2: any, imageCardArray3: any) {
    image.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }
        for (let i = 0; i < imageCardArray1.length; i++) {
          imageCardArray1[i].set('visible', false);
        }

        for (let i = 0; i < imageCardArray2.length; i++) {
          imageCardArray2[i].set('visible', false);
          imageCardArray3[i].set('visible', false);
        }


        imageCard.set('visible', true);
        this.transparentRect.set('visible', true);
        // 隐藏提示文字
        this.tipsText2.set('visible', false);
    }});
  }

  // 隐藏三组卡片 和 遮挡板 及 线
  /**
   * @param imageCard1  高原卡片
   * @param imageCard2  山地卡片
   * @param imageCard3  平原卡片
   */
  hideCardEvent(imageCard1: any, imageCard2: any, imageCard3?: any) {
    this.transparentRect.on({'mousedown': (e: any) => {

        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        for (let i = 0; i < imageCard1.length; i++) {
          imageCard1[i].set('visible', false);
        }

        for (let i = 0; i < imageCard2.length; i++) {
          imageCard2[i].set('visible', false);
          imageCard3[i].set('visible', false);
        }

        // 隐藏遮挡板
        this.transparentRect.set('visible', false);
    }});
  }

  // 点击闪烁点显示对应文字图片
  pointClickEvent(point: any, image: any, imageCard1: any, imageCard2: any, imageCard3: any) {
    point.on('mousedown', () => {
      if ((new Date() as any).valueOf() - this.time < 200) {
        return;
      } else {
        this.time = new Date().valueOf();
      }

      for (let i = 0; i < imageCard1.length; i++) {
        imageCard1[i].set('visible', false);
      }

      for (let i = 0; i < imageCard2.length; i++) {
        imageCard2[i].set('visible', false);
        imageCard3[i].set('visible', false);
      }

      image.set('visible', true);
      point.set('visible', false);

      // 隐藏遮挡板
      this.transparentRect.set('visible', false);
    });
  }

  // 点击按钮显示对应文字隐藏对应点
  showButtonClick(
    button: any, textImage: any, point: any,
    button2: any, textImage2: any, point2: any,
    button3: any, textImage3: any, point3: any,
  ) {

    button.on('mousedown', () => {
      if ((new Date() as any).valueOf() - this.time < 200) {
        return;
      } else {
        this.time = new Date().valueOf();
      }

      for (let i = 0; i < textImage.length; i++) {
        textImage[i].set('visible', button.getObjects()[0].get('fill') === '#ffffff');
        point[i].set('visible', !(button.getObjects()[0].get('fill') === '#ffffff'));
      }

      if (button2.getObjects()[0].get('fill') === '#ffffff' && button.getObjects()[0].get('fill') === '#ffffff') {
        for (let i = 0; i < textImage2.length; i++) {
          textImage2[i].set('visible', false);
          point2[i].set('visible', true);
        }
      }

      if (button3.getObjects()[0].get('fill') === '#ffffff' && button.getObjects()[0].get('fill') === '#ffffff') {
        for (let i = 0; i < textImage3.length; i++) {
          textImage3[i].set('visible', false);
          point3[i].set('visible', true);
        }
      }

      // 改变当前点击按钮样式
      this.showClickButton(button.getObjects()[0].get('fill') === '#ffffff', button);
    });
  }

}
