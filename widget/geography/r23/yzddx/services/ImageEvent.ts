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
      fill: '#ffffff',
      opacity: 0,
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

  /**
   * @param image1  拖动的按钮
   * @param image2  对应的地球上的文字
   * @param image1Config  拖动按钮的config
   */
  imageDragEvent(image1: any, image2: any, image1Config: any) {
    image1.on({'modified': (e: any) => {
        if (e.target.intersectsWithObject(image2)) {

          image2.visible = true;
          image1.visible = false;

          // 隐藏提示文字1
          this.tipsText1.set('visible', false);
          // 显示提示文字2
          if (this.tipsTextNumber2 === 0) {
            this.tipsText2.set('visible', true);
            this.tipsTextNumber2 = 1;
          }


        } else {

          image2.visible = false;
          image1.visible = true;

        }

        image1.set('top', image1Config.top).setCoords();
        image1.set('left', image1Config.left).setCoords();
    }});
  }


  // 点击显示拖动按钮
  /**
   * @param button  当前点击的按钮
   * @param dragButton  对应的一组卡片
   * @param image 对应的地球一组文字
   * @param button2  要还原的按钮2
   * @param dragButton2 要还原的按钮2对应的一组卡片
   * @param button3 要还原的按钮3
   * @param dragButton3 要还原的按钮3对应的一组卡片
   */
  clickShowButtonEvent(button: any, dragButton: any, image: any,
                       button2?: any, dragButton2?: any,
                       button3?: any, dragButton3?: any) {

    button.on({'mousedown': () => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        if (button.getObjects()[0].get('fill') === '#3d3d3d') {
          this.showDragButton(true, dragButton, image);
        } else {
          this.showDragButton(false, dragButton, image);
        }

        // 改变当前点击按钮样式
        this.showClickButton(button.getObjects()[0].get('fill') === '#3d3d3d', button);

        // 还原点击按钮样式 隐藏拖动按钮
        this.showClickButton(false, button2);
        this.hideDragButton(dragButton2);

        // 还原点击按钮样式 隐藏拖动按钮
        this.showClickButton(false, button3);
        this.hideDragButton(dragButton3);

        if (this.tipsTextNumber1 === 0) {
          this.tipsText1.set('visible', true);
          this.tipsTextNumber1 = 1;
        }

    }});

  }

  // 改变点击按钮颜色
  /**
   * @param {boolean} isShow  改变或者还原
   * @param button  对应的点击按钮
   */
  showClickButton(isShow: boolean, button: any) {
    if (isShow) {
      button.getObjects()[0].set('fill', '#0199FF');
    } else {
      button.getObjects()[0].set('fill', '#3d3d3d');
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
  clickShowCardEvent(image: any, imageCard: any) {
    image.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
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

        // 隐藏遮挡板 和 线
        this.transparentRect.set('visible', false);
    }});
  }

}
