import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { PointConfig } from './PointConfig';
import { PointConfig2 } from './PointConfig2';
import { PointConfig3 } from './PointConfig3';
import { PointConfig4 } from './PointConfig4';
import { PointConfig5 } from './PointConfig5';
import { PointConfig6 } from './PointConfig6';

export class TfCanvas extends SimpleKonvaTemplate {

  config: any;
  config2: any;
  config3: any;
  config4: any;
  config5: any;
  config6: any;
  width = window.innerWidth;
  height = window.innerHeight;

  public oneImg = document.getElementById('oneImg');
  public twoImg = document.getElementById('twoImg');
  public threeImg = document.getElementById('threeImg');
  public fourImg = document.getElementById('fourImg');
  public fiveImg = document.getElementById('fiveImg');
  public sixImg = document.getElementById('sixImg');

  num: number;

  orangeColor = '#ff5147';
  greenColor = '#ADDF18';
  blueColor = '#2F98FF';
  pinkColor = '#F439FF';
  yellowColor = '#FBCD02';
  lightGreenColor = '#00FFC5';

  timer: any;

  //2013
  pointsGroup1: any = [];

  //2014
  pointsGroup2: any = [];

  //2015
  pointsGroup3: any = [];

  //2016
  pointsGroup4: any = [];

  //2017
  pointsGroup5: any = [];

  //2018
  pointsGroup6: any = [];

  constructor() {
      super('3dContainer');
      this.config = new PointConfig();
      this.config2 = new PointConfig2();
      this.config3 = new PointConfig3();
      this.config4 = new PointConfig4();
      this.config5 = new PointConfig5();
      this.config6 = new PointConfig6();
      this.drawTyphoonPointsIn2013();
      this.drawTyphoonPointsIn2014();
      this.drawTyphoonPointsIn2015();
      this.drawTyphoonPointsIn2016();
      this.drawTyphoonPointsIn2017();
      this.drawTyphoonPointsIn2018();
      if ((window as any)['env'].browserInfo.os === 'Mac OS X' || (window as any)['env'].browserInfo.os === 'Windows'
        && !(window as any)['env'].browserInfo.isElectron) {
          this.num = 550;
      } else if ((window as any)['env'].browserInfo.isSmallDevice) {
          this.num = 176;
      } else {
          this.num = 330;
      }
  }

    //画点
    drawPoint(x: number, y: number, color: string) {
      let radius: number;
      if ((window as any)['env'].browserInfo.isSmallDevice) {
          radius = 3;
      } else {
          radius = 7;
      }
        const circle = new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: color,
            opacity: 0
        });
        return circle;
    }

    //2013年台风点
    drawTyphoonPointsIn2013() {
        for (let i = 0; i <= 30; i++) {
            this.pointsGroup1[i] = this.drawPoint(this.config.point[i].x, this.config.point[i].y, this.orangeColor);
            this.staticLayer.add(this.pointsGroup1[i]);
        }
    }

    //2014年台风点
    drawTyphoonPointsIn2014() {
        for (let i = 0; i <= 22; i++) {
          this.pointsGroup2[i] = this.drawPoint(this.config2.point[i].x, this.config2.point[i].y, this.greenColor);
          this.staticLayer.add(this.pointsGroup2[i]);
        }
    }

    //2015年台风点
    drawTyphoonPointsIn2015() {
        for (let i = 0; i <= 25; i++) {
          this.pointsGroup3[i] = this.drawPoint(this.config3.point[i].x, this.config3.point[i].y, this.blueColor);
          this.staticLayer.add(this.pointsGroup3[i]);
        }
    }

    //2016年台风点
    drawTyphoonPointsIn2016() {
      for (let i = 0; i <= 25; i++) {
        this.pointsGroup4[i] = this.drawPoint(this.config4.point[i].x, this.config4.point[i].y, this.pinkColor);
        this.staticLayer.add(this.pointsGroup4[i]);
      }
    }

    //2017年台风点
    drawTyphoonPointsIn2017() {
      for (let i = 0; i <= 26; i++) {
        this.pointsGroup5[i] = this.drawPoint(this.config5.point[i].x, this.config5.point[i].y, this.yellowColor);
        this.staticLayer.add(this.pointsGroup5[i]);
      }
    }

    //2018年台风点
    drawTyphoonPointsIn2018() {
    for (let i = 0; i <= 28; i++) {
      this.pointsGroup6[i] = this.drawPoint(this.config6.point[i].x, this.config6.point[i].y, this.lightGreenColor);
      this.staticLayer.add(this.pointsGroup6[i]);
    }
  }

    //台风点显示动画
    showingEvent(obj: any, img: any) {
      let i = 0;
      let displayWidth = 0;
      //播放动画时置灰左右切换按钮
      (window as any).viewHandler.viewModel.$data.flag = true;
      //判断动画是否播放完毕
      if ((img.style.width === (this.num + 'px'))) {
        (window as any).viewHandler.viewModel.$data.flag = false;
      } else {
        //设置动画播放定时器
        this.timer = setInterval(() => {
          displayWidth += (1 / obj.length * this.num);
          img.style.width = displayWidth + 'px';
          (obj[i] as any).opacity(1);
          obj[i].visible(true);
          this.staticLayer.draw();
          i++;
          //动画播放完毕后清除定时器
          if (i >= obj.length) {
            clearInterval(this.timer);
            (window as any).viewHandler.viewModel.$data.flag = false;
          }
        }, 200);
      }
    }

    //重置时隐藏台风点及图片
    resetPointsGroup(pointsGroup: any, img: any) {
        for (let i = 0; i < pointsGroup.length; i++) {
            pointsGroup[i].visible(false);
            pointsGroup[i].opacity(0);
        }
        img.style.width = 0 + 'px';
    }

    //切换时隐藏或显示台风点
    hideOrShowTyphoonPoints(obj?: any, flag?: boolean) {

        if (obj) {
          for (let i = 0; i < obj.length; i++) {
            obj[i].visible(flag);
            obj[i].opacity(0);
          }
        }
    }

    reset() {
        this.resetPointsGroup(this.pointsGroup1, this.oneImg);

        this.resetPointsGroup(this.pointsGroup2, this.twoImg);

        this.resetPointsGroup(this.pointsGroup3, this.threeImg);

        this.resetPointsGroup(this.pointsGroup4, this.fourImg);

        this.resetPointsGroup(this.pointsGroup5, this.fiveImg);

        this.resetPointsGroup(this.pointsGroup6, this.sixImg);

        clearInterval(this.timer);
        this.staticLayer.draw();
    }


}
