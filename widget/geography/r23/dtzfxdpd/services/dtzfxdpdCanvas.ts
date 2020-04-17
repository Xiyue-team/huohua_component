import { SimpleKonvaTemplate } from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as direction from './../sub_static/direction.png';
import * as direction1 from './../sub_static/direction1.png';
import * as direction2 from './../sub_static/direction2.png';

export class DtzfxdpdCanvas extends SimpleKonvaTemplate {

    //控制鼠标是否按下或是否触摸
    private control = false;
    private dragControl = false;
    private mouseDownPosition = {x: 0, y: 0};
    private mouseMovePosition = {x: 0, y: 0};
    private totalAngle = 0;
    private lang = window.env.browserInfo.lang;
    private timer: any;
    constructor() {
        super('compassRange');
        this.initImage();
    }


    async initImage() {
      const rangeDom = document.getElementById('compass');
        const rect = new Konva.Rect({
          x: 0,
          y: 0,
          width: rangeDom.clientWidth,
          height: rangeDom.clientHeight,
        });

        console.log('width:'  + rect.width());

        this.staticLayer.add(rect);
        this.stage.add(this.staticLayer);
        this.dragImg();

    }

  //拖拽指针图片旋转
  dragImg() {
    let angle: number;
    const dom = document.getElementsByClassName('compassImage')[0];
    const rangeDom = document.getElementById('compass');
    const point = {
        x: rangeDom.clientWidth / 2,
        y: rangeDom.clientHeight / 2
    };
    //拖拽事件
    this.staticLayer.on('mousedown touchstart', () => {
      this.clearTimer();
      (window as any).viewHandler.viewModel.$data.errorFeedback = false;
      (window as any).viewHandler.viewModel.$data.tipsControl = false;
      this.control = true;
      this.dragControl = true;
      this.mouseDownPosition = this.getMousePos();
    });

    this.staticLayer.on('mousemove touchmove', (event: any) => {
      if (!this.control) {
        return;
      }

      this.mouseMovePosition = this.getMousePos();
      angle = this.calcAngle(point, this.mouseDownPosition, this.mouseMovePosition);
      if (ThreeUtil.isClockwise(point,
        this.mouseDownPosition.x, this.mouseDownPosition.y, this.mouseMovePosition.x, this.mouseMovePosition.y )) {
        this.totalAngle = this.totalAngle + angle;
      } else {
        this.totalAngle = this.totalAngle - angle;
      }
      (dom as any).style.transform = 'rotate(' + this.totalAngle * 180 / Math.PI + 'deg)';
      if (Math.abs(this.totalAngle) > Math.PI * 2) {
        this.totalAngle = this.totalAngle % Math.PI * 2;
      }
      this.mouseDownPosition = this.mouseMovePosition;
      if (this.angleJudgment(this.totalAngle)) {
        if (dom.getAttribute('src') === direction1 as any) {
          return;
        }
        dom.setAttribute('src', direction1 as any);
      } else {
        if (dom.getAttribute('src') === direction as any) {
          return;
        }
        dom.setAttribute('src', direction as any);
      }

    });


    this.staticLayer.on('mouseup touchend', () => {
      this.control = false;
      this.dragControl = false;
      this.mouseDownPosition = this.mouseMovePosition;
      console.log(this.angleJudgment(this.totalAngle));
      if (!this.angleJudgment(this.totalAngle)) {
        document.getElementById('tips').innerText = this.lang.tips[2];
        document.getElementById('tips').style.color = '#FF4747';
        dom.setAttribute('src', direction2 as any);
      } else {
        document.getElementById('tips').innerText = this.lang.tips[1];
        document.getElementById('tips').style.color = '#0091FF';
      }
      (window as any).viewHandler.viewModel.$data.errorFeedback = true;
      this.clearTimer();
      this.timer = setTimeout(() => {
        (window as any).viewHandler.viewModel.$data.errorFeedback = false;
      }, 3000);
    });

    this.staticLayer.on('mouseleave', () => {
      this.control = false;
      if (this.dragControl === false) {
        return;
      }
      if (!this.angleJudgment(this.totalAngle)) {
        document.getElementById('tips').innerText = this.lang.tips[2];
        document.getElementById('tips').style.color = '#FF4747';
        dom.setAttribute('src', direction2 as any);
      } else {
        document.getElementById('tips').innerText = this.lang.tips[1];
        document.getElementById('tips').style.color = '#0091FF';
      }
      (window as any).viewHandler.viewModel.$data.errorFeedback = true;
      this.clearTimer();
      this.timer = setTimeout(() => {
        (window as any).viewHandler.viewModel.$data.errorFeedback = false;
      }, 3000);
      this.dragControl = false;
    });
  }

  //清除计时器
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  //获取鼠标当前坐标
  getMousePos() {
      const mousePos = this.stage.getPointerPosition();
      return {
          x: mousePos.x,
          y: mousePos.y
      };
  }

  //旋转随机角度 并记录角度
  rotaterandomAngle(correctAngle: number) {
      const number = ThreeUtil.getRandomNumber(-180, 180) * Math.PI / 180;
      const coefficient = 2 * Math.PI / 180;
    if (correctAngle > 0) {
        if (number - (Math.PI * 2) + coefficient > correctAngle && number - (Math.PI * 2) - coefficient < correctAngle
          && number + coefficient > correctAngle && number - coefficient < correctAngle) {
          this.rotaterandomAngle(correctAngle);
        }
    } else {
      if (number + (Math.PI * 2) + coefficient > correctAngle && number + (Math.PI * 2) - coefficient < correctAngle
        && number + coefficient > correctAngle && number - coefficient < correctAngle) {
        this.rotaterandomAngle(correctAngle);
      }
    }

    this.totalAngle = number;
    const dom = document.getElementsByClassName('compassImage')[0];
    if (dom.getAttribute('src') !== direction as any) {
      dom.setAttribute('src', direction as any);
    }
    (dom as any).style.transform = 'rotate(' + this.totalAngle * 180 / Math.PI + 'deg)';
  }

  //判断对应角度
  angleJudgment(angle: number) {
      const normal = (window as any).viewHandler.viewModel.$data.gActived;
      const jingwei = (window as any).viewHandler.viewModel.$data.jActived;
      const pointing = (window as any).viewHandler.viewModel.$data.pActived;
      const selectValue = (window as any).viewHandler.viewModel.$data.selectNumber;
      const coefficient = 2;
      let isAngle = false;
      if (normal) {
        if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
      } else if (pointing) {
        switch (selectValue) {
          case 1:
            if ((60 + coefficient) * Math.PI / 180 > angle && (60 - coefficient) * Math.PI / 180 < angle ||
              (-300 + coefficient) * Math.PI / 180 > angle && (-300 - coefficient) * Math.PI / 180 < angle) {
              isAngle = true;
            }
            return isAngle;
          case 2:
            if (Math.PI / 2 + (coefficient * Math.PI / 180) > angle && Math.PI / 2 - (coefficient * Math.PI / 180) < angle ||
              (-270 + coefficient) * Math.PI / 180 > angle && (-270 - coefficient) * Math.PI / 180 < angle) {
              isAngle = true;
            }
            return isAngle;
          case 3:
            if ((-60 + coefficient) * Math.PI / 180 > angle && (-60 - coefficient) * Math.PI / 180 < angle ||
              (300 + coefficient) * Math.PI / 180 > angle && (300 - coefficient) * Math.PI / 180 < angle) {
              isAngle = true;
            }
            return isAngle;
          case 4:
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
            return isAngle;
          case 5:
            if ((-40 + coefficient) * Math.PI / 180 > angle && (-40 - coefficient) * Math.PI / 180 < angle ||
              (320 + coefficient) * Math.PI / 180 > angle && (320 - coefficient) * Math.PI / 180 < angle) {
              isAngle = true;
            }
            return isAngle;
        }
      } else if (jingwei) {
        switch (selectValue) {
          case 1:
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
            return isAngle;
          case 2:
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
            return isAngle;
          case 3:
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
            return isAngle;
          case 4:
            // if ((17 + coefficient) * Math.PI / 180 > angle && (17 - coefficient) * Math.PI / 180 < angle ||
            //   (-343 + coefficient) * Math.PI / 180 > angle && (-343 + coefficient) * Math.PI < angle) {
            //   isAngle = true;
            // }
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle) {
              isAngle = true;
            }
            return isAngle;
          case 5:
            if (0 + (coefficient * Math.PI / 180) > angle && 0 - (coefficient * Math.PI / 180) < angle ) {
              isAngle = true;
            }
            return isAngle;
        }
      }
      return isAngle;
  }

    //传入三个点判断旋转的角度
  calcAngle(o: any, startPoint: any, endPoint: any): number {
    const lengthAB = Math.sqrt( Math.pow(o.x - endPoint.x, 2) +
      Math.pow(o.y - endPoint.y, 2));
    const lengthAC = Math.sqrt( Math.pow(o.x - startPoint.x, 2) +
        Math.pow(o.y - startPoint.y, 2));
     const lengthBC = Math.sqrt( Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2));
    const cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
      (2 * lengthAB * lengthAC);
    const angleA = Math.acos(cosA);
    return angleA;
  }
}
