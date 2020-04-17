import { fabric } from 'fabric';

export class ImageEvent {
  time: any;

  constructor() {
    this.time = new Date().valueOf();
  }


  // 判定规则按钮点击显示图片
  buttonClickEvent(button: any, image: any, updateText: Function) {

    button.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        this.showClickButton(button.getObjects()[0].get('fill') === '#ffffff', button);

        image.set('visible', button.getObjects()[0].get('fill') !== '#ffffff');

        updateText();
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
      button.getObjects()[1].set('fill', '#ffffff');
    } else {
      button.getObjects()[0].set('fill', '#ffffff');
      button.getObjects()[1].set('fill', '#000000');
    }
  }
}
