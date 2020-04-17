import {DmCanvas} from './DmCanvas';

import * as Konva from 'konva';
import {DmConfig} from './DmConfig';
import { Linear, TweenMax } from 'gsap';

export class DmDragEvent {

    private dmCanvas: DmCanvas;
    private dmConfig: DmConfig;

    el: any;

    showTipsBoolean = true;

    timeOut: any;

    // 判断动画是否开始
    isStart = false;

    // 判断显示的文字
    showTextImageNumber: number;

    constructor(dmCanvas: DmCanvas) {
        this.dmCanvas = dmCanvas;
        this.dmConfig = new DmConfig();
    }

    // 绑定拖动事件
    dragMove(image: Konva.Image, frame: Konva.Image, config: any, line: Konva.Image, image2: Konva.Image, image3: Konva.Image) {
        this.dmCanvas.staticLayer.setZIndex(0);
        this.dmCanvas.animationLayer.setZIndex(1);

        image.on('dragmove touchmove', (e: any) => {
            if (!image.draggable()) {
              return;
            }

            image.moveToTop();
            image.scale({x: 1.3, y: 1.3});
            console.log(image.draggable());
            const targetRect = e.target.getClientRect();
            if (this.haveIntersection(frame.getClientRect(), targetRect)) {
                // this.showTipsBoolean = false;
            }

            for (let i = 0; i < this.dmCanvas.leftWhiteFrame.length; i++) {
              this.dmCanvas.leftWhiteFrame[i].opacity(1);
            }
        });

        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
            document.body.style.cursor = 'default';
        });

        let x: number;
        let y: number;
        image.on('mousedown touchstart', () => {

            if (image.x() === frame.x()) {
              return;
            }

            this.dmCanvas.reverseAnimation();

            image.moveToTop();
            x = config.x;
            y = config.y;

            this.showFrame();
        });

        image.on('mouseup touchend', (e: any) => {
            if (image.x() === frame.x()) {
              return;
            }
            const targetRect = e.target.getClientRect();
            this.showTipsFrame(targetRect);

            if (this.haveIntersection(frame.getClientRect(), targetRect)) {
                image.draggable(false);
                this.playAnimation(image, frame, image2, image3);
                this.showTipsBoolean = false;

                line.visible(true);
            } else {
                this.resetAnimation(image, config);
            }

            this.hideFrame();
        });
    }

    // 显示选择错误提示框
    showTipsFrame(targetRect: any) {

      if (!this.showTipsBoolean) {
        return;
      }

      for (let i = 0; i < this.dmCanvas.leftTipsFrame.length; i++) {
        if (this.haveIntersection(this.dmCanvas.leftTipsFrame[i].getClientRect(), targetRect)) {
          console.log(i);
          this.dmCanvas.leftTipsFrame[i].visible(true);
          setTimeout(() => {
            this.dmCanvas.leftTipsFrame[i].visible(false);
            console.log('隐藏');
            this.dmCanvas.staticLayer.draw();
          }, 800);
        }
      }

      this.showTipsBoolean = true;
    }

    // 判断是否碰撞
    haveIntersection(r1: any, r2: any) {
        return !(
            r2.x > r1.x + r1.width * 0.5 ||
            r2.x + r2.width * 0.5 < r1.x ||
            r2.y > r1.y + r1.height * 0.5 ||
            r2.y + r2.height * 0.5 < r1.y
        );
    }

    // 显示右侧选项框
    showFrame() {
      clearTimeout(this.timeOut);

      for (let i = 0; i < this.dmCanvas.leftWhiteFrame.length; i++) {
        this.dmCanvas.leftWhiteFrame[i].opacity(1);
      }
      this.dmCanvas.staticLayer.draw();
    }

    // 隐藏右侧选项框
    hideFrame() {
      for (let i = 0; i < this.dmCanvas.leftWhiteFrame.length; i++) {
        this.dmCanvas.leftWhiteFrame[i].opacity(0);
      }
    }

    // 拖拽正确执行的动画
    playAnimation (image: any, frame: any, image2: Konva.Image, image3: Konva.Image) {
      const tween = {
        x: image.x(),
        y: image.y(),
        scale: image.scale().x
      };

      return TweenMax.to(tween, 0.35, {
        y: frame.y(),
        x: frame.x(),
        scale: 1,
        onStart: () => {
          image2.moveToTop();
          this.dmCanvas.staticLayer.draw();
          console.log('执行');
        },
        onUpdate: () => {
          image.x(tween.x);
          image.y(tween.y);
          image.scale({x: tween.scale, y: tween.scale});
          this.dmCanvas.staticLayer.draw();
        },
        onComplete: () => {
          image.visible(false);
          image3.visible(true);
          this.dmCanvas.staticLayer.draw();
        },
        ease:  Linear.easeOut,
        paused: false
      });

    }

    // 拖拽错误返回动画
    resetAnimation(image: any, config: any) {
      const tween = {
        x: image.x(),
        y: image.y(),
        scale: image.scale().x
      };

      return TweenMax.to(tween, 0.45, {
        y: config.y,
        x: config.x,
        scale: 1,
        onStart: () => {

        },
        onUpdate: () => {
          image.x(tween.x);
          image.y(tween.y);
          image.scale({x: tween.scale, y: tween.scale});
          this.dmCanvas.staticLayer.draw();
        },
        onComplete: () => {

        },
        ease:  Linear.easeOut,
        paused: false
      });
    }

    // 判断图片是否拖出窗口
    dragOutPage() {
      document.addEventListener('mouseup', () => {
        this.resetImageXY();
        this.showTipsBoolean = true;
      });

      document.addEventListener('touchcancel', () => {
        this.resetImageXY();
        this.showTipsBoolean = true;
      });

      document.addEventListener('touchend', () => {
        this.resetImageXY();
        this.showTipsBoolean = true;
      });

      this.dmCanvas.staticLayer.on('mouseup touchend', () => {
        this.hideTextImage();
        this.showTextImageNumber = null;
      });
    }

    // 判断是否拖拽正确 ， 不正确返回初始位置
    resetImageXY () {
      if (this.dmCanvas.leftTipsFrame[0].x() !== this.dmCanvas.landscapeMap[0].x()) {
        this.dmCanvas.landscapeMap[0].x(this.dmConfig.leftOneConfig.x);
        this.dmCanvas.landscapeMap[0].y(this.dmConfig.leftOneConfig.y);

      }

      if (this.dmCanvas.leftTipsFrame[1].x() !== this.dmCanvas.landscapeMap[3].x()) {
        this.dmCanvas.landscapeMap[3].x(this.dmConfig.rightOneConfig.x);
        this.dmCanvas.landscapeMap[3].y(this.dmConfig.rightOneConfig.y);
      }

      if (this.dmCanvas.leftTipsFrame[2].x() !== this.dmCanvas.landscapeMap[1].x()) {
        this.dmCanvas.landscapeMap[1].x(this.dmConfig.leftTwoConfig.x);
        this.dmCanvas.landscapeMap[1].y(this.dmConfig.leftTwoConfig.y);
      }

      if (this.dmCanvas.leftTipsFrame[3].x() !== this.dmCanvas.landscapeMap[4].x()) {
        this.dmCanvas.landscapeMap[4].x(this.dmConfig.rightTwoConfig.x);
        this.dmCanvas.landscapeMap[4].y(this.dmConfig.rightTwoConfig.y);
      }

      if (this.dmCanvas.leftTipsFrame[4].x() !== this.dmCanvas.landscapeMap[2].x()) {
        this.dmCanvas.landscapeMap[2].x(this.dmConfig.leftThreeConfig.x);
        this.dmCanvas.landscapeMap[2].y(this.dmConfig.leftThreeConfig.y);
      }

      if (this.dmCanvas.leftTipsFrame[5].x() !== this.dmCanvas.landscapeMap[5].x()) {
        this.dmCanvas.landscapeMap[5].x(this.dmConfig.rightThreeConfig.x);
        this.dmCanvas.landscapeMap[5].y(this.dmConfig.rightThreeConfig.y);
      }

      this.dmCanvas.landscapeMap[0].scale({x: 1, y: 1});
      this.dmCanvas.landscapeMap[1].scale({x: 1, y: 1});
      this.dmCanvas.landscapeMap[2].scale({x: 1, y: 1});
      this.dmCanvas.landscapeMap[3].scale({x: 1, y: 1});
      this.dmCanvas.landscapeMap[4].scale({x: 1, y: 1});
      this.dmCanvas.landscapeMap[5].scale({x: 1, y: 1});

      this.hideFrame();

      this.dmCanvas.staticLayer.draw();
    }

    // 点击图片放大
    clickScaleImage(image: Konva.Image, config: any, image2: Konva.Image, config2: any, image3: Konva.Image) {
      const animation = this.sclaeImageAnimation(image, config, image2, image3);

      image.on('mouseup touchend', () => {
        image.moveToTop();
        if (image3.x() === config2.x) {
          animation.play();
          this.isStart = true;
        } else {
          animation.reverse();
          this.isStart = false;
        }

      });

      return animation;
    }

    sclaeImageAnimation(image: Konva.Image, config: any, image2: Konva.Image, image3: Konva.Image) {
      const tween = {
        x: image.x(),
        y: image.y(),
        scaleX: 1,
        scaleY: 1,
        opacity: 0,
        opacity2: 1,
      };

      const animation = TweenMax.to(tween, 0.45, {
        x: config.x,
        y: config.y,
        scaleX: 4.64789,
        scaleY: 4.33963,
        opacity: 1,
        opacity2: 0,
        onStart: () => {
          image.moveToTop();
        },
        onUpdate: () => {
          image.x(tween.x);
          image.y(tween.y);
          image.scale({x: tween.scaleX, y: tween.scaleY});
          image.opacity(tween.opacity);

          image2.x(tween.x);
          image2.y(tween.y);
          image2.scale({x: tween.scaleX, y: tween.scaleY});
          image2.opacity(tween.opacity2);

          image3.x(tween.x);
          image3.y(tween.y);
          image3.scale({x: tween.scaleX, y: tween.scaleY});

          this.dmCanvas.staticLayer.draw();
        },
        onComplete: () => {

        },
        ease:  Linear.easeOut,
        paused: true
      });

      return animation;
    }

    // 显示文字描述图片
    showTextImage(clickImage: Konva.Image, textImage: Konva.Image, value?: number) {
      clickImage.on('mouseup touchend', () => {
        textImage.visible(true);
        this.showTextImageNumber = value;
      });
    }


    hideTextImage() {
      if (this.showTextImageNumber !== 0) {
        this.dmCanvas.textImage[0].visible(false);
      }

      if (this.showTextImageNumber !== 1) {
        this.dmCanvas.textImage[1].visible(false);
      }

      if (this.showTextImageNumber !== 2) {
        this.dmCanvas.textImage[2].visible(false);
      }

      if (this.showTextImageNumber !== 3) {
        this.dmCanvas.textImage[3].visible(false);
      }

      if (this.showTextImageNumber !== 4) {
        this.dmCanvas.textImage[4].visible(false);
      }

      if (this.showTextImageNumber !== 5) {
        this.dmCanvas.textImage[5].visible(false);
      }
    }
}

