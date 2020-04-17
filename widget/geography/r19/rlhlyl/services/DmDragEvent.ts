import {DmCanvas} from './DmCanvas';

import * as Konva from 'konva';
import {DmConfig} from './DmConfig';
import { Linear, TweenMax } from 'gsap';

export class DmDragEvent {

    private dmCanvas: DmCanvas;
    private dmConfig: DmConfig;

    dragValue = 0;

    constructor(dmCanvas: DmCanvas) {
        this.dmCanvas = dmCanvas;
        this.dmConfig = new DmConfig();
        this.dragOutPage();
    }

    // 绑定拖动事件
    dragMove(image: Konva.Image, frame: Konva.Image, config: any) {
        image.on('mouseup touchend', (e: any) => {
            if (image.x() === frame.x()) {
              return;
            }
            const targetRect = e.target.getClientRect();

            if (this.haveIntersection(frame.getClientRect(), targetRect)) {
              // 拖拽正确
              image.draggable(false);
              image.x(frame.x());
              image.y(frame.y());
              this.dragValue++;
            } else {
              // 拖拽错误
              image.x(config.x);
              image.y(config.y);
            }
            if (this.dragValue === 4) {
              (window as any).viewHandler.viewModel.$data.showMappingAnimation = true;
            }

            this.dmCanvas.staticLayer.draw();
        });

        image.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
        document.body.style.cursor = 'default';
      });
    }

    // 判断是否碰撞
    haveIntersection(r1: any, r2: any) {
        return !(
            r2.x > r1.x + r1.width * 0.9 ||
            r2.x + r2.width * 0.9 < r1.x ||
            r2.y > r1.y + r1.height * 0.9 ||
            r2.y + r2.height * 0.9 < r1.y
        );
    }

    // 判断图片是否拖出窗口
    dragOutPage() {
      document.addEventListener('mouseup', () => {
        this.resetImageXY();
      });

      document.addEventListener('touchcancel', () => {
        this.resetImageXY();
      });

      document.addEventListener('touchend', () => {
        this.resetImageXY();
      });
    }

  // 判断是否拖拽正确 ， 不正确返回初始位置
  resetImageXY () {
    if (this.dmCanvas.hpaFrame[0].x() !== this.dmCanvas.whiteFrame[0].x()) {
      this.dmCanvas.hpaFrame[0].x(this.dmConfig.hpa996Image.x);
      this.dmCanvas.hpaFrame[0].y(this.dmConfig.hpa996Image.y);
    }

    if (this.dmCanvas.hpaFrame[1].x() !== this.dmCanvas.whiteFrame[1].x()) {
      this.dmCanvas.hpaFrame[1].x(this.dmConfig.hpa1004Image.x);
      this.dmCanvas.hpaFrame[1].y(this.dmConfig.hpa1004Image.y);
    }

    if (this.dmCanvas.hpaFrame[2].x() !== this.dmCanvas.whiteFrame[3].x()) {
      this.dmCanvas.hpaFrame[2].x(this.dmConfig.hpa1016Image.x);
      this.dmCanvas.hpaFrame[2].y(this.dmConfig.hpa1016Image.y);
    }

    if (this.dmCanvas.hpaFrame[3].x() !== this.dmCanvas.whiteFrame[2].x()) {
      this.dmCanvas.hpaFrame[3].x(this.dmConfig.hpa1024Image.x);
      this.dmCanvas.hpaFrame[3].y(this.dmConfig.hpa1024Image.y);
    }

    this.dmCanvas.staticLayer.draw();
  }
}

