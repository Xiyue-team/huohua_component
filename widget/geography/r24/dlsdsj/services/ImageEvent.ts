import { fabric } from 'fabric';

export class ImageEvent {
  time: any;

  whiteBackgroundClickEnd = false;

  constructor() {
    this.time = new Date().valueOf();
  }


  // 判定规则按钮点击显示图片
  buttonClickEvent(button: any, image: any, button2: any, image2: any, button3: any, image3: any, button4: any, image4: any) {

    button.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        this.showClickButton(button.getObjects()[0].get('fill') === '#ffffff', button);
        image.set('visible', button.getObjects()[0].get('fill') !== '#ffffff');

        // 还原其他按钮
        this.showClickButton(false, button2);
        this.showClickButton(false, button3);
        this.showClickButton(false, button4);

        // 隐藏其他按钮对应的说明文字
        image2.set('visible', false);
        image3.set('visible', false);
        image4.set('visible', false);
    }});
  }

  // 绑定事件 右侧白底区域点击切换场景
  whiteBackgroundClickEvent(button: any, elementArray1: any, elementArray2: any, decisionRule1: any, decisionRule2: any) {
    button.on('mousedown', () => {
      if ((new Date() as any).valueOf() - this.time < 200) {
        return;
      } else {
        this.time = new Date().valueOf();
      }

      this.whiteBackgroundEvrnt(elementArray1, elementArray2, decisionRule1, decisionRule2, this.whiteBackgroundClickEnd);

      this.whiteBackgroundClickEnd = !this.whiteBackgroundClickEnd;

    });
  }

  // 白底区域点击触发的事件
  whiteBackgroundEvrnt(elementArray1: any, elementArray2: any, decisionRule1: any, decisionRule2: any, isShow: boolean) {
    for (let i = 0; i < elementArray1.length; i++) {
      elementArray1[i].set('visible', isShow);
      if ( elementArray1[i].get('name') === 'textDescription') {
        elementArray1[i].set('visible', false);
      }
    }

    for (let i = 0; i < elementArray2.length; i++) {
      elementArray2[i].set('visible', !isShow);
      if ( elementArray2[i].get('name') === 'textDescription') {
        elementArray2[i].set('visible', false);
      }
    }

    decisionRule1.getObjects()[0].set('fill', '#ffffff');
    decisionRule1.getObjects()[1].set('fill', '#000000');

    decisionRule2.getObjects()[0].set('fill', '#ffffff');
    decisionRule2.getObjects()[1].set('fill', '#000000');
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
}
