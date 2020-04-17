/**
 * 图片拖动触发事件
 */
import { MyCanvas } from './MyCanvas';
import { fabric } from 'fabric';

export class ImageEvent {

  myCanvas: MyCanvas;

  constructor(myCanvas: MyCanvas) {
    this.myCanvas = myCanvas;
  }

  // 限制在画布内拖动
  limitElement(element: fabric.Image) {
    if (element.top < 143 * this.myCanvas.config.imgScale * 0.5) {
      element.set('top', 143 * this.myCanvas.config.imgScale * 0.5).setCoords();
    }

    if (element.left < 183 * 0.5 * this.myCanvas.config.imgScale) {
      element.set('left', 183 * 0.5 * this.myCanvas.config.imgScale).setCoords();
    }

    const left = window.innerWidth / this.myCanvas.scale - element.width * element.scaleX * 0.5;

    if (element.left > left) {
      element.set('left', left).setCoords();
    }

    const top = window.innerHeight / this.myCanvas.scale - element.height * element.scaleY * 0.5;

    if (element.top > top) {
      element.set('top', top).setCoords();
    }
  }

  // 图片拖动触发的事件
  imageDragEvent(element: fabric.Image, config: any, whiteFrame: Array<Array<fabric.Rect>>, groupIndex: number, singleIndex: number) {
    element.on('moving', (e: any) => {
      for (let i = 0; i < whiteFrame.length; i++) {
        this.myCanvas.bigText[i].set('visible', false);
        this.myCanvas.smallText[i].set('visible', true);
        for (let j = 0; j < whiteFrame[i].length; j++) {
          whiteFrame[i][j].set('visible', true);
        }
      }
      this.limitElement(element);
    });

    element.on({'modified': (e: any) => {
        for (let i = 0; i < whiteFrame.length; i++) {
          this.myCanvas.dropFrame[i] = [];
          for (let j = 0; j < whiteFrame[i].length; j++) {
            this.myCanvas.dropFrame[i][j] = e.target.intersectsWithObject(whiteFrame[i][j]) && !this.myCanvas.dashFrameDrop[i][j];
            if (this.myCanvas.dropFrame[i][j]) {
              element.set('selectable', false);
              this.myCanvas.dashFrameDrop[i][j] = true;
              this.collisionEvent(element, whiteFrame[i][j]);
              this.myCanvas.dropFrameName[i][j] = element.name;
              this.myCanvas.dropQuantity += 1;
              this.myCanvas.dropIndex[i][j].groupIndex = groupIndex;
              this.myCanvas.dropIndex[i][j].singleIndex = singleIndex;

              if (this.myCanvas.dropQuantity === 8) {
                this.myCanvas.reselectButton.set('visible', true);
                this.myCanvas.answerButton.set('visible', true);
                this.dropQuantityEvent();
              }

              this.myCanvas.dropIndex[groupIndex][singleIndex].dropGroupIndex = i;
              this.myCanvas.dropIndex[groupIndex][singleIndex].dropSingleIndex = j;
            }
          }
        }


        // 没有碰撞 或者碰撞错误的反应
        let dropFrame = true;
        for (let i = 0; i < this.myCanvas.dropFrame.length; i++) {
          for (let j = 0; j < this.myCanvas.dropFrame[i].length; j++) {
            dropFrame = dropFrame && !this.myCanvas.dropFrame[i][j];
          }
        }
        if (dropFrame) {
          this.collisionFalseEvent(element, config);
        }

        this.myCanvas.myCanvas.discardActiveObject();
      }});
  }

  // 碰撞之后的反应
  collisionEvent(element: fabric.Image, rect: fabric.Rect) {
    this.myCanvas.anim.collisionEvent(element, rect);
  }

  // 碰撞错误的反应
  collisionFalseEvent(element: fabric.Image, config: any) {
    this.myCanvas.anim.collisionFalseEvent(element, config, this.myCanvas.rightRect);
  }

  // 填充满 触发的事件 获得正确排序
  dropQuantityEvent() {
    this.myCanvas.dropFrameNameTrue = [];
    for (let i = 0; i < this.myCanvas.dropFrameName.length; i++) {
      this.myCanvas.dropFrameNameTrue[i] = [];

      // 每组第一个填充正确
      if (this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][0]
        || this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][1]) {
        this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][0] ?
          this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][0] :
          this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][1];
      } else {
        if (this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][0]
          || this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][1]) {
          this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][0] ?
            this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][0] :
            this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][1];

          this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][0] ?
            this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][1] :
            this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][0];
        } else {
          this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][0];
          this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][1];
        }
      }

      // 每组第二个填充正确
      if (this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][0]
        || this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][1]) {
        this.myCanvas.dropFrameName[i][1] === this.myCanvas.whiteFrameName[i][0] ?
          this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][0] :
          this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][1];
      } else {
        if (this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][0]
          || this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][1]) {
          this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][0] ?
            this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][0] :
            this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][1];

          this.myCanvas.dropFrameName[i][0] === this.myCanvas.whiteFrameName[i][0] ?
            this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][1] :
            this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][0];
        } else {
          this.myCanvas.dropFrameNameTrue[i][0] = this.myCanvas.whiteFrameName[i][0];
          this.myCanvas.dropFrameNameTrue[i][1] = this.myCanvas.whiteFrameName[i][1];
        }
      }
    }

    this.showErrorTips();
  }

  // 填充满后显示错误提示
  showErrorTips() {
    let trueNumber = 0;
    for (let i = 0; i < this.myCanvas.dropFrameName.length; i++) {
      // 填充错误显示提示
      for (let j = 0; j < this.myCanvas.dropFrameName[i].length; j++) {
        if (this.myCanvas.dropFrameName[i][j] !== this.myCanvas.dropFrameNameTrue[i][j]) {
          this.myCanvas.errorTips[i][j].set('visible', true);
        } else {
          trueNumber += 1;
        }
      }

      if (this.myCanvas.leftImage[i][0].name === this.myCanvas.dropFrameNameTrue[i][0]) {
        this.myCanvas.leftImage[i][0].set('left', this.myCanvas.errorTips[i][0].get('left'));
        this.myCanvas.leftImage[i][1].set('left', this.myCanvas.errorTips[i][1].get('left'));
      } else {
        this.myCanvas.leftImage[i][1].set('left', this.myCanvas.errorTips[i][0].get('left'));
        this.myCanvas.leftImage[i][0].set('left', this.myCanvas.errorTips[i][1].get('left'));
      }

      for (let j = 0; j < this.myCanvas.dropFrameName[i].length; j++) {
        this.myCanvas.explainText[i][j].set('left', this.myCanvas.leftImage[i][j].get('left')).setCoords();
      }
    }

    if (trueNumber === 8) {
      (this.myCanvas.answerButton as any)._objects[0].set('fill', '#ffffff');
      (this.myCanvas.answerButton as any)._objects[1].set('fill', '#61B5B2');

      for (let i = 0; i < this.myCanvas.explainText.length; i++) {
        for (let j = 0; j < this.myCanvas.explainText[i].length; j++) {
          this.myCanvas.explainText[i][j].set('visible', true);
        }
      }
    }
  }

}
