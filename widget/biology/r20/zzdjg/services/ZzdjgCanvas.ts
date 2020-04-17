import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { ImgConfig } from './ImgConfig';
import { ImgConfigForMobile } from './ImgConfigForMobile';
import * as caidou from '../sub_static/caidou.png';
import * as cdzhongpi from '../sub_static/cdzhongpi.png';
import * as cdpeiru from '../sub_static/cdpeiru.png';
import * as cdziye from '../sub_static/cdziye.png';
import * as cdpeiya from '../sub_static/cdpeiya.png';
import * as cdpeizhou from '../sub_static/cdpeizhou.png';
import * as cdpeigen from '../sub_static/cdpeigen.png';
import * as yumi from '../sub_static/yumi.png';
import * as ymzhongpi from '../sub_static/ymzhongpi.png';
import * as ympeiru from '../sub_static/ympeiru.png';
import * as ymziye from '../sub_static/ymziye.png';
import * as ympeiya from '../sub_static/ympeiya.png';
import * as ympeizhou from '../sub_static/ympeizhou.png';
import * as ympeigen from '../sub_static/ympeigen.png';

export class ZzdjgCanvas extends SimpleKonvaTemplate {

  caidouImg: Konva.Image;
  cdzhongpiImg: Konva.Image;
  cdpeiruImg: Konva.Image;
  cdziyeImg: Konva.Image;
  cdpeiyaImg: Konva.Image;
  cdpeizhouImg: Konva.Image;
  cdpeigenImg: Konva.Image;

  yumiImg: Konva.Image;
  ymzhongpiImg: Konva.Image;
  ympeiruImg: Konva.Image;
  ymziyeImg: Konva.Image;
  ympeiyaImg: Konva.Image;
  ympeizhouImg: Konva.Image;
  ympeigenImg: Konva.Image;

  config: any;
  width = window.innerWidth;
  height = window.innerHeight;

  constructor() {
      super('3dContainer');
      if ((window as any)['env'].browserInfo.isSmallDevice) {
        this.config = new ImgConfigForMobile();
      } else {
        this.config = new ImgConfig();
      }
      this.drawRects();
      this.initImage();
  }

  //绘制两个位置框
  drawRects() {
    let leftRect, rightRect;

    //手机端适配
    if ((window as any)['env'].browserInfo.isSmallDevice) {
        leftRect = new Konva.Rect({
          x: this.width * 0.123,
          y: this.height * 0.355,
          fill: '#424242',
          width: this.width * 0.366,
          height: this.height * 0.615,
          strokeWidth: 1,
          stroke: 'gray'
        });

        rightRect = new Konva.Rect({
          x: this.width * 0.511,
          y: this.height * 0.355,
          fill: '#424242',
          width: this.width * 0.366,
          height: this.height * 0.615,
          strokeWidth: 1,
          stroke: 'gray'
        });
    } else {
      leftRect = new Konva.Rect({
        x: this.width * 0.123,
        y: this.height * 0.271,
        fill: '#424242',
        width: this.width * 0.366,
        height: this.height * 0.615,
        strokeWidth: 1,
        stroke: 'gray'
      });

     rightRect = new Konva.Rect({
        x: this.width * 0.511,
        y: this.height * 0.271,
        fill: '#424242',
        width: this.width * 0.366,
        height: this.height * 0.615,
        strokeWidth: 1,
        stroke: 'gray'
      });
    }
      this.staticLayer.add(leftRect);
      this.staticLayer.add(rightRect);
  }

  //加载图片
  async initImage() {
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      //菜豆初始图片
      this.caidouImg = await this.loadImage((caidou as any), this.config.caidouImg as any);
      this.staticLayer.add(this.caidouImg);

      //菜豆种皮初始图片
      this.cdzhongpiImg = await this.loadImage((cdzhongpi as any), this.config.cdzhongpiImg as any);
      this.staticLayer.add(this.cdzhongpiImg);

      //菜豆胚乳初始图片
      this.cdpeiruImg = await this.loadImage((cdpeiru as any), this.config.cdpeiruImg as any);
      this.staticLayer.add(this.cdpeiruImg);

      //菜豆子叶初始图片
      this.cdziyeImg = await this.loadImage((cdziye as any), this.config.cdziyeImg as any);
      this.staticLayer.add(this.cdziyeImg);

      //菜豆胚芽初始图片
      this.cdpeiyaImg = await this.loadImage((cdpeiya as any), this.config.cdpeiyaImg as any);
      this.staticLayer.add(this.cdpeiyaImg);

      //菜豆胚轴初始图片
      this.cdpeizhouImg = await this.loadImage((cdpeizhou as any), this.config.cdpeizhouImg as any);
      this.staticLayer.add(this.cdpeizhouImg);

      //菜豆胚根初始图片
      this.cdpeigenImg = await this.loadImage((cdpeigen as any), this.config.cdpeigenImg as any);
      this.staticLayer.add(this.cdpeigenImg);

      //玉米初始图片
      this.yumiImg = await this.loadImage((yumi as any), this.config.yumiImg as any);
      this.staticLayer.add(this.yumiImg);

      //玉米种皮初始图片
      this.ymzhongpiImg = await this.loadImage((ymzhongpi as any), this.config.ymzhongpiImg as any);
      this.staticLayer.add(this.ymzhongpiImg);

      //玉米胚乳初始图片
      this.ympeiruImg = await this.loadImage((ympeiru as any), this.config.ympeiruImg as any);
      this.staticLayer.add(this.ympeiruImg);

      //玉米子叶初始图片
      this.ymziyeImg = await this.loadImage((ymziye as any), this.config.ymziyeImg as any);
      this.staticLayer.add(this.ymziyeImg);

      //玉米胚芽初始图片
      this.ympeiyaImg = await this.loadImage((ympeiya as any), this.config.ympeiyaImg as any);
      this.staticLayer.add(this.ympeiyaImg);

      //玉米胚轴初始图片
      this.ympeizhouImg = await this.loadImage((ympeizhou as any), this.config.ympeizhouImg as any);
      this.staticLayer.add(this.ympeizhouImg);

      //玉米胚根初始图片
      this.ympeigenImg = await this.loadImage((ympeigen as any), this.config.ympeigenImg as any);
      this.staticLayer.add(this.ympeigenImg);

      this.stage.add(this.staticLayer);
    } else {
      //菜豆初始图片
      this.caidouImg = await this.loadImage((caidou as any), this.config.caidouImg as any);
      this.staticLayer.add(this.caidouImg);

      //菜豆种皮初始图片
      this.cdzhongpiImg = await this.loadImage((cdzhongpi as any), this.config.cdzhongpiImg as any);
      this.staticLayer.add(this.cdzhongpiImg);

      //菜豆胚乳初始图片
      this.cdpeiruImg = await this.loadImage((cdpeiru as any), this.config.cdpeiruImg as any);
      this.staticLayer.add(this.cdpeiruImg);

      //菜豆子叶初始图片
      this.cdziyeImg = await this.loadImage((cdziye as any), this.config.cdziyeImg as any);
      this.staticLayer.add(this.cdziyeImg);

      //菜豆胚芽初始图片
      this.cdpeiyaImg = await this.loadImage((cdpeiya as any), this.config.cdpeiyaImg as any);
      this.staticLayer.add(this.cdpeiyaImg);

      //菜豆胚轴初始图片
      this.cdpeizhouImg = await this.loadImage((cdpeizhou as any), this.config.cdpeizhouImg as any);
      this.staticLayer.add(this.cdpeizhouImg);

      //菜豆胚根初始图片
      this.cdpeigenImg = await this.loadImage((cdpeigen as any), this.config.cdpeigenImg as any);
      this.staticLayer.add(this.cdpeigenImg);

      //玉米初始图片
      this.yumiImg = await this.loadImage((yumi as any), this.config.yumiImg as any);
      this.staticLayer.add(this.yumiImg);

      //玉米种皮初始图片
      this.ymzhongpiImg = await this.loadImage((ymzhongpi as any), this.config.ymzhongpiImg as any);
      this.staticLayer.add(this.ymzhongpiImg);

      //玉米胚乳初始图片
      this.ympeiruImg = await this.loadImage((ympeiru as any), this.config.ympeiruImg as any);
      this.staticLayer.add(this.ympeiruImg);

      //玉米子叶初始图片
      this.ymziyeImg = await this.loadImage((ymziye as any), this.config.ymziyeImg as any);
      this.staticLayer.add(this.ymziyeImg);

      //玉米胚芽初始图片
      this.ympeiyaImg = await this.loadImage((ympeiya as any), this.config.ympeiyaImg as any);
      this.staticLayer.add(this.ympeiyaImg);

      //玉米胚轴初始图片
      this.ympeizhouImg = await this.loadImage((ympeizhou as any), this.config.ympeizhouImg as any);
      this.staticLayer.add(this.ympeizhouImg);

      //玉米胚根初始图片
      this.ympeigenImg = await this.loadImage((ympeigen as any), this.config.ympeigenImg as any);
      this.staticLayer.add(this.ympeigenImg);

      this.stage.add(this.staticLayer);
    }
  }

  //显示或隐藏各图片
  showOrHideMethod(flag1: boolean, flag2: boolean, flag3: boolean,
                   flag4: boolean, flag5: boolean, flag6: boolean, flag7: boolean) {
      this.caidouImg.visible(flag1);
      this.cdzhongpiImg.visible(flag2);
      this.cdpeiruImg.visible(flag3);
      this.cdziyeImg.visible(flag4);
      this.cdpeiyaImg.visible(flag5);
      this.cdpeizhouImg.visible(flag6);
      this.cdpeigenImg.visible(flag7);

      this.yumiImg.visible(flag1);
      this.ymzhongpiImg.visible(flag2);
      this.ympeiruImg.visible(flag3);
      this.ymziyeImg.visible(flag4);
      this.ympeiyaImg.visible(flag5);
      this.ympeizhouImg.visible(flag6);
      this.ympeigenImg.visible(flag7);
      this.staticLayer.batchDraw();
  }

  reset() {
      this.showOrHideMethod(true, false, false, false, false, false, false);
  }

}
