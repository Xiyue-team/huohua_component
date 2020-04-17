import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';

export class MagneticCanvas extends SimpleKonvaTemplate {
  rect: Konva.Rect;
  private scale = (window.innerWidth) / 1920;
  private height = window.innerHeight;

  constructor() {
    super('kCanvas');
    this.initImage();
  }

  async initImage() {
    this.rect = new Konva.Rect({
      x: 0,
      y: this.height / 10 * 2,
      width: 1000 * this.scale,
      height: 1000 * this.scale,
      draggable: true
    });
    this.staticLayer.add(this.rect);
    this.stage.add(this.staticLayer);
    this.dragRange();
    this.bindEvent();
  }

  //限定拖拽范围
  dragRange() {
    this.rect.dragBoundFunc((pos: any) => {
      const newY = ((pos.y >= (this.height / 10 * 2) ? (this.height / 10 * 2) : false)
        || (pos.y <= (this.height / 10 * 2 - 52) ? (this.height / 10 * 2 - 52) : pos.y));
      const newX = 0;
      return {
        x  :  newX,
        y  :  newY
      };
    });
  }

  bindEvent() {
    let oldMouseY: number;
    let currentMouseY: number;
    this.rect.on('dragstart', () => {
      (window as any).viewHandler.viewModel.$data.tips_show = false;
      (window as any).viewHandler.viewModel.$data.move_tips_show = false;
      (window as any).viewHandler.viewModel.$data.show_label_one = false;
      oldMouseY = this.getMousePos().y;
    });

    this.rect.on('dragmove', () => {
      ((window as any).viewHandler.viewModel.$refs.diaphragmMovement as any).animationIndex =
        Math.ceil((Math.abs((this.rect as any).attrs.y - (this.height / 10 * 2) ) / 2.1));
      currentMouseY = this.getMousePos().y;
      (window as any).viewHandler.viewModel.$data.move_tips_show = true;
      switch (true) {
        case (currentMouseY - oldMouseY) >= 0:
          (window as any).viewHandler.viewModel.$data.moveTips_title = window.env.browserInfo.lang.moveToBottom_title;
          break;
        case (currentMouseY - oldMouseY) < 0:
          (window as any).viewHandler.viewModel.$data.moveTips_title = window.env.browserInfo.lang.moveToUp_title;
          break;
      }
    });
  }

  //获取鼠标当前坐标
  getMousePos() {
    const mousePos = this.stage.getPointerPosition();
    return {
      x: mousePos.x,
      y: mousePos.y
    };
  }

  reset() {
    this.rect.y(this.height / 10 * 2);
    this.staticLayer.draw();
  }
}
