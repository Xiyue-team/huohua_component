import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import * as bluePointImg from '../sub_static/bluePoint.png';
import * as redPointImg from '../sub_static/redPoint.png';
import * as purplePointImg from '../sub_static/purplePoint.png';
import { ImageConfig } from './ImageConfig';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class Position3dModel extends SimpleKonvaTemplate {

      config: any;

      bluePImg: Konva.Image;
      redPImg: Konva.Image;
      purplePImg: Konva.Image;

      //箭头
      blueArrow: any = [];
      redArrow: any = [];
      purpleArrow: any = [];

      //文字
      bTextArray: any = [];
      vTextArray: any = [];
      fTextArray: any = [];
      //水平
      horizontal = true;

      //垂直
      vertical = true;

      //斜向
      oblique = true;

      constructor() {
        super('3dContainer');
        this.config = new ImageConfig();
        this.initImage();
        this.drawAxis();
      }

      async initImage() {

        //加载拖动点
        this.bluePImg = await this.loadImage((bluePointImg as any), this.config.bluePointImg as any);
        this.staticLayer.add(this.bluePImg);
        this.bluePImg.visible(false);

        this.redPImg = await this.loadImage((redPointImg as any), this.config.redPointImg as any);
        this.staticLayer.add(this.redPImg);
        this.redPImg.visible(false);

        this.purplePImg = await this.loadImage((purplePointImg as any), this.config.purplePointImg as any);
        this.staticLayer.add(this.purplePImg);
        this.purplePImg.visible(false);

        this.stage.add(this.staticLayer);

        this.ImageMouseOverEvent(this.bluePImg);
        this.ImageMouseOverEvent(this.redPImg);
        this.ImageMouseOverEvent(this.purplePImg);
        //加载蓝色箭头
        this.preloadArrows(this.blueArrow, '#0199FF', this.bTextArray, 'B');
        //加载红色箭头
        this.preloadArrows(this.redArrow, '#FF4747', this.vTextArray, 'v');
        //加载紫色箭头
        this.preloadArrows(this.purpleArrow, '#7C41A7', this.fTextArray, 'F');

        this.dragMove(this.bluePImg, this.blueArrow, this.config.bluePointImg, this.bTextArray,
          () => { (window as any).viewHandler.viewModel.$data.isdisabled1 = true;
          (window as any).viewHandler.viewModel.$data.isdisabled2 = false; });

        this.dragMove(this.redPImg, this.redArrow, this.config.redPointImg, this.vTextArray,
          () => { (window as any).viewHandler.viewModel.$data.isdisabled2 = true;
            (window as any).viewHandler.viewModel.$data.isdisabled3 = false; });

        this.dragMove(this.purplePImg, this.purpleArrow, this.config.purplePointImg, this.fTextArray,
          () => { (window as any).viewHandler.viewModel.$data.isdisabled3 = true;
            (window as any).viewHandler.viewModel.$data.isdisabled4 = false; });
      }

      drawAxis(): void {

        const xAxis = this.drawArrow(this.stage.getWidth() / 2 - 250, this.stage.getHeight() / 2 - 100,
          this.stage.getWidth() / 2 + 250, this.stage.getHeight() / 2 + 100, '#A6A6A6');

        const xText = this.createText(this.stage.getWidth() / 2 + 240, this.stage.getHeight() / 2 + 100, 'x', '#A6A6A6');

        const zAxis = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2 + 250,
          this.stage.getWidth() / 2, this.stage.getHeight() / 2 - 250, '#A6A6A6');

        const zText = this.createText(this.stage.getWidth() / 2 - 30, this.stage.getHeight() / 2 - 250, 'z', '#A6A6A6');

        const yAxis = this.drawArrow(this.stage.getWidth() / 2 - 200, this.stage.getHeight() / 2 + 80,
          this.stage.getWidth() / 2 + 200, this.stage.getHeight() / 2 - 80, '#A6A6A6');

        const yText = this.createText(this.stage.getWidth() / 2 + 180, this.stage.getHeight() / 2 - 70, 'y', '#A6A6A6');

        this.staticLayer.add(xAxis);
        this.staticLayer.add(yAxis);
        this.staticLayer.add(zAxis);

        this.staticLayer.add(xText);
        this.staticLayer.add(zText);
        this.staticLayer.add(yText);
        this.stage.add(this.staticLayer);
      }

      dragMove(image: Konva.Image, arrowArray: Array<any>, imgConfig: any, textArray: Array<any>, callback: any): void {

        image.on('dragend', () => {

          //x方向
          if (Math.abs(-Number.parseFloat(((image.y() - imgConfig.y) / (image.x() - imgConfig.x)).toFixed(1))
            - Number.parseFloat(Math.tan(158 / 180 * Math.PI).toFixed(1))) <= 0.5 && this.horizontal === true) {
            this.horizontal = false;
            if (image.x() > imgConfig.x) {
              arrowArray[3].visible(true);
              textArray[3].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, 50, 0, 0);
            } else {
              arrowArray[2].visible(true);
              textArray[2].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, -50, 0, 0);
            }
            image.x(imgConfig.x);
            image.y(imgConfig.y);
            image.visible(false);
            callback();

            //垂直方向
          }  else if (Math.abs(image.y() - imgConfig.y) >= 50 &&
            Math.abs(image.x() - imgConfig.x) <= 20 && this.vertical === true) {

            this.vertical = false;
            if (image.y() > imgConfig.y) {
              arrowArray[1].visible(true);
              textArray[1].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, 0, -50, 0);
            } else {
              arrowArray[0].visible(true);
              textArray[0].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, 0, 50, 0);
            }
              image.x(imgConfig.x);
              image.y(imgConfig.y);
              image.visible(false);
              callback();

            //y方向
          } else if (Math.abs(-Number.parseFloat(((image.y() - imgConfig.y) / (image.x() - imgConfig.x)).toFixed(4))
                - Number.parseFloat(Math.tan(22 / 180 * Math.PI).toFixed(4))) <= 0.5 && this.oblique === true) {

            this.oblique = false;
            if (image.y() < imgConfig.y) {
              arrowArray[4].visible(true);
              textArray[4].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, 0, 0, -50);
            } else {
              arrowArray[5].visible(true);
              textArray[5].visible(true);
              this.deliverArray((window as any).viewHandler.viewModel.$data.count, 0, 0, 50);
            }
            image.x(imgConfig.x);
            image.y(imgConfig.y);
            image.visible(false);
            callback();

          } else {
            image.x(imgConfig.x);
            image.y(imgConfig.y);
            image.visible(true);

          }
            this.staticLayer.draw();
        });
      }

      drawArrow(x1: number, y1: number, x2: number, y2: number, color: string): any {
        const arrow = new Konva.Arrow({
          x: 0,
          y: 0,
          points: [x1, y1, x2, y2],
          pointerLength: 15,
          pointerWidth : 10,
          fill: color,
          stroke: color,
          strokeWidth: 2
        });
        return arrow;
      }

      createText(x: number, y: number, content: string, color: string): any {
    const simpleText = new Konva.Text({
      x: x,
      y: y,
      text: content,
      fontSize: 30,
      fontStyle: 'italic',
      fontFamily: 'Times New Roman',
      fill: color
    });
    return simpleText;
  }

      //预加载6个箭头和字体
      preloadArrows(arrowArray: Array<any>, color: string, textArray: Array<any>, font: string): void {
        //垂直向上
        arrowArray[0] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2, this.stage.getHeight() / 2 - 150, color);
        textArray[0] = this.createText(this.stage.getWidth() / 2 - 30, this.stage.getHeight() / 2 - 100, font, color);

        //垂直向下
        arrowArray[1] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2, this.stage.getHeight() / 2 + 150, color);
        textArray[1] = this.createText(this.stage.getWidth() / 2 - 30, this.stage.getHeight() / 2 + 60, font, color);

        //水平向左
        arrowArray[2] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2 - 150, this.stage.getHeight() / 2 - 60, color);
        textArray[2] = this.createText(this.stage.getWidth() / 2 - 100, this.stage.getHeight() / 2 - 20, font, color);

        //水平向右
        arrowArray[3] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2 + 150, this.stage.getHeight() / 2 + 60, color);
        textArray[3] = this.createText(this.stage.getWidth() / 2 + 70, this.stage.getHeight() / 2 - 10, font, color);

        //斜向上
        arrowArray[4] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2 + 100, this.stage.getHeight() / 2 - 40, color);
        textArray[4] = this.createText(this.stage.getWidth() / 2 + 40, this.stage.getHeight() / 2 - 60, font, color);

        //斜向下
        arrowArray[5] = this.drawArrow(this.stage.getWidth() / 2, this.stage.getHeight() / 2,
          this.stage.getWidth() / 2 - 100, this.stage.getHeight() / 2 + 40, color);
        textArray[5] = this.createText(this.stage.getWidth() / 2 - 60, this.stage.getHeight() / 2 + 20, font, color);

        for (let i = 0; i < arrowArray.length; i++) {
          arrowArray[i].visible(false);
          textArray[i].visible(false);
          this.staticLayer.add(arrowArray[i]);
          this.staticLayer.add(textArray[i]);
        }
        this.staticLayer.draw();
      }

      ImageMouseOverEvent(image: Konva.Image) {
        image.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', function() {
          document.body.style.cursor = 'default';
        });
      }

      //截取视图区内容
      interceptContent(id: string): void {

        if (BrowserUtil.getBrowserInfo().os === 'Windows') {
            this.stage.toImage({
              mimeType: 'image/png',
              x: this.stage.getWidth() / 3,
              y: this.stage.getHeight() / 6,
              width: this.stage.getWidth() / 3,
              height: this.stage.getWidth() / 3,
              callback: (img: any) => {
                document.body.appendChild(img);
                img.id = id;
                (img as any).style.height = this.stage.getWidth() / 3;
                (img as any).style.width = this.stage.getWidth() / 3;
                (img as any).style.transformOrigin = 'this.stage.getWidth() / 6, this.stage.getWidth() / 12 * 4';
                (img as any).style.position = 'absolute';
                (img as any).style.top = this.stage.getHeight() / 6 + 'px';
                (img as any).style.left = this.stage.getWidth() / 3 + 'px';
              }
            });
        } else {
            this.stage.toImage({
              mimeType: 'image/png',
              x: this.stage.getWidth() / 4,
              y: this.stage.getHeight() / 12,
              width: this.stage.getWidth() / 2,
              height: this.stage.getWidth() / 2.4,
              callback: (img: any) => {
                document.body.appendChild(img);
                img.id = id;
                (img as any).style.height = this.stage.getWidth() / 3;
                (img as any).style.width = this.stage.getWidth() / 3;
                (img as any).style.transformOrigin = 'this.stage.getWidth() / 6, this.stage.getWidth() / 6';
                (img as any).style.position = 'absolute';
                (img as any).style.top = this.stage.getHeight() / 12 + 'px';
                (img as any).style.left = this.stage.getWidth() / 4 + 'px';
              }
            });
        }
      }

      //传递坐标数组
      deliverArray(val: number, n1: number, n2: number, n3: number): void {
        switch (val) {
          case 1:
            (window as any).viewHandler.viewModel.$data.direction.push([n1, n2, n3]);
            break;
          case 2:
            (window as any).viewHandler.viewModel.$data.direction2.push([n1, n2, n3]);
            break;
          case 3:
            (window as any).viewHandler.viewModel.$data.direction3.push([n1, n2, n3]);
            break;
        }
      }

      changePointImg(flag1: boolean, flag2: boolean, flag3: boolean) {
          this.bluePImg.visible(flag1);
          this.redPImg.visible(flag2);
          this.purplePImg.visible(flag3);
          this.staticLayer.draw();
      }

      //隐藏箭头及文字
      hideArrowAndText(): void {
        for (let i = 0; i < this.blueArrow.length; i++) {
          this.blueArrow[i].visible(false);
          this.redArrow[i].visible(false);
          this.purpleArrow[i].visible(false);
          this.bTextArray[i].visible(false);
          this.vTextArray[i].visible(false);
          this.fTextArray[i].visible(false);
        }
      }

      reset() {

          const img1 = document.getElementById('myImage1');
          const img2 = document.getElementById('myImage2');
          const img3 = document.getElementById('myImage3');
          if (img1) {
            img1.parentNode.removeChild(img1);
          }
          if (img2) {
            img2.parentNode.removeChild(img2);
          }
          if (img3) {
            img3.parentNode.removeChild(img3);
          }
          this.hideArrowAndText();
          this.bluePImg.visible(false);
          this.redPImg.visible(false);
          this.purplePImg.visible(false);
          this.staticLayer.draw();
          this.horizontal = true;
          this.vertical = true;
          this.oblique = true;
      }
}
