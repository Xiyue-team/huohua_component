import { fabric } from 'fabric';

export class Event {

  myCanvas: fabric.Canvas;
  rightCradCanvas: fabric.Canvas;

  time = new Date().valueOf();

  showTipImageEnd = false;

  constructor(canvas: fabric.Canvas, cradCanvas: fabric.Canvas) {
    this.myCanvas = canvas;
    this.rightCradCanvas = cradCanvas;
  }

  /**
   * @param {Group} point 蓝点
   * @param text  要显示的文字 或 图片
   */
  pointClickEvent(point: fabric.Group, text: any, card: Array<fabric.Group>, index: number) {

    point.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        point.set('visible', false);
        text.set('visible', true);

        if (!this.showTipImageEnd) {
          (window as any).viewHandler.viewModel.$data.showTipImage = true;
          this.showTipImageEnd = true;
        }


        this.myCanvas.renderAll();
    }});

    text.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        for (let i = 0; i < card.length; i++) {
          if (i !== index) {
            card[i].set('visible', false);
          }
        }

        card[index].set('visible', !card[index].get('visible'));
        (window as any).viewHandler.viewModel.$data.showTipImage = false;

        this.rightCradCanvas.renderAll();
    }});

  }

  mapClickEvent(map: fabric.Image, card: Array<fabric.Group>) {
    map.on({'mousedown': (e: any) => {
        if ((new Date() as any).valueOf() - this.time < 200) {
          return;
        } else {
          this.time = new Date().valueOf();
        }

        for (let i = 0; i < card.length; i++) {
          card[i].set('visible', false);
        }

        this.rightCradCanvas.renderAll();
      }});
  }






}
