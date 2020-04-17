

import {SimpleKonvaTemplate} from './SimpleKonvaTemplate';
import * as Konva from 'konva';

import {BjsConfig} from './BjsConfig';
import {BjsDragEvent} from './BjsDragEvent';

import * as yellowRanseti1 from '../sub_static/yellowRanseti1.png';
import * as yellowRanseti2 from '../sub_static/yellowRanseti2.png';
import * as yellowRanseti3 from '../sub_static/yellowRanseti3.png';
import * as yellowRanseti4 from '../sub_static/yellowRanseti4.png';
import * as yellowRanseti5 from '../sub_static/yellowRanseti5.png';
import * as yellowRanseti7 from '../sub_static/yellowRanseti7.png';
import * as yellowRanseti8 from '../sub_static/yellowRanseti8.png';

import * as redRanseti1 from '../sub_static/redRanseti1.png';
import * as redRanseti2 from '../sub_static/redRanseti2.png';
import * as redRanseti3 from '../sub_static/redRanseti3.png';
import * as redRanseti4 from '../sub_static/redRanseti4.png';
import * as redRanseti5 from '../sub_static/redRanseti5.png';
import * as redRanseti7 from '../sub_static/redRanseti7.png';
import * as redRanseti8 from '../sub_static/redRanseti8.png';

import * as bigYellow1 from '../sub_static/bigYellow1.png';
import * as bigYellow2 from '../sub_static/bigYellow2.png';
import * as bigYellow3 from '../sub_static/bigYellow3.png';
import * as bigYellow4 from '../sub_static/bigYellow4.png';
import * as bigYellow5 from '../sub_static/bigYellow5.png';
import * as bigYellow7 from '../sub_static/bigYellow7.png';

import * as bigRed1 from '../sub_static/bigRed1.png';
import * as bigRed2 from '../sub_static/bigRed2.png';
import * as bigRed3 from '../sub_static/bigRed3.png';
import * as bigRed4 from '../sub_static/bigRed4.png';
import * as bigRed5 from '../sub_static/bigRed5.png';
import * as bigRed7 from '../sub_static/bigRed7.png';
import * as bigRed8 from '../sub_static/bigRed8.png';
import * as reBigRed8 from '../sub_static/reBigRed8.png';

import * as rect1 from '../sub_static/rect1.png';
import * as rect2 from '../sub_static/rect2.png';
import * as rect3 from '../sub_static/rect3.png';
import * as rect4 from '../sub_static/rect4.png';
import * as rect5 from '../sub_static/rect5.png';
import * as rect7 from '../sub_static/rect7.png';

import * as tip from '../sub_static/tip.png';

import * as back from '../sub_static/background.png';

export class BjsCanvas extends SimpleKonvaTemplate {
    config: BjsConfig;

    // 目标有机化合物分子 文字图片
  yellowRanseti1: Konva.Image;
  yellowRanseti2: Konva.Image;
  yellowRanseti3: Konva.Image;
  yellowRanseti4: Konva.Image;
  yellowRanseti5: Konva.Image;
  yellowRanseti6: Konva.Image;
  yellowRanseti7: Konva.Image;
  yellowRanseti8: Konva.Image;


  bigYellow1: Konva.Image;
  bigYellow4: Konva.Image;
  bigYellow5: Konva.Image;
  bigYellow7: Konva.Image;
  reBigYellow2: Konva.Image;
  reBigYellow4: Konva.Image;

  redRanseti1: Konva.Image;
  redRanseti2: Konva.Image;
  redRanseti3: Konva.Image;
  redRanseti4: Konva.Image;
  redRanseti5: Konva.Image;
  redRanseti6: Konva.Image;
  redRanseti7: Konva.Image;
  redRanseti8: Konva.Image;

  bigRed2: Konva.Image;
  bigRed3: Konva.Image;
  bigRed6: Konva.Image;
  bigRed7: Konva.Image;
  bigRed8: Konva.Image;
  reBigRed1: Konva.Image;
  reBigRed3: Konva.Image;
  reBigRed7: Konva.Image;

  rect1: Konva.Image;
  rect2: Konva.Image;
  rect3: Konva.Image;
  rect4: Konva.Image;
  rect5: Konva.Image;
  rect6: Konva.Image;
  rect7: Konva.Image;
  rect8: Konva.Image;

  tip: Konva.Image;

  yellowTextA: Konva.Text;
  yellowTexta: Konva.Text;
  yellowTextB: Konva.Text;
  yellowTextb: Konva.Text;

  redTextA: Konva.Text;
  redTexta: Konva.Text;
  redTextB: Konva.Text;
  redTextb: Konva.Text;

  bigTextA: Konva.Text;
  bigTexta: Konva.Text;
  bigTextB: Konva.Text;
  bigTextb: Konva.Text;


    // 拖动事件
    bjsDrag: BjsDragEvent;

    // 定义一个矩形
    rect: Konva.Rect;

    constructor() {
        super('box');

        this.config = new BjsConfig();
        this.bjsDrag = new BjsDragEvent(this);

        this.init();

    }

    async init() {
      await this.initImage();
      await this.initBigImage();
      await this.initText();
    }

    async initImage() {

      const background = await this.loadImage((back as any), this.config.backgroundConfig as any);

      this.yellowRanseti1 = await this.loadImage((yellowRanseti1 as any), this.config.yellowRansetiConfig1 as any);
      this.yellowRanseti2 = await this.loadImage((yellowRanseti2 as any), this.config.yellowRansetiConfig2 as any);
      this.yellowRanseti3 = await this.loadImage((yellowRanseti3 as any), this.config.yellowRansetiConfig3 as any);
      this.yellowRanseti4 = await this.loadImage((yellowRanseti4 as any), this.config.yellowRansetiConfig4 as any);
      this.yellowRanseti5 = await this.loadImage((yellowRanseti5 as any), this.config.yellowRansetiConfig5 as any);
      this.yellowRanseti6 = await this.loadImage((yellowRanseti5 as any), this.config.yellowRansetiConfig6 as any);
      this.yellowRanseti7 = await this.loadImage((yellowRanseti7 as any), this.config.yellowRansetiConfig7 as any);
      this.yellowRanseti8 = await this.loadImage((yellowRanseti8 as any), this.config.yellowRansetiConfig8 as any);


      this.redRanseti1 = await this.loadImage((redRanseti1 as any), this.config.redRansetiConfig1 as any);
      this.redRanseti2 = await this.loadImage((redRanseti2 as any), this.config.redRansetiConfig2 as any);
      this.redRanseti3 = await this.loadImage((redRanseti3 as any), this.config.redRansetiConfig3 as any);
      this.redRanseti4 = await this.loadImage((redRanseti4 as any), this.config.redRansetiConfig4 as any);
      this.redRanseti5 = await this.loadImage((redRanseti5 as any), this.config.redRansetiConfig5 as any);
      this.redRanseti6 = await this.loadImage((redRanseti5 as any), this.config.redRansetiConfig6 as any);
      this.redRanseti7 = await this.loadImage((redRanseti7 as any), this.config.redRansetiConfig7 as any);
      this.redRanseti8 = await this.loadImage((redRanseti8 as any), this.config.redRansetiConfig8 as any);

      this.rect1 = await this.loadImage((rect1 as any), this.config.rectConfig1 as any);
      this.rect2 = await this.loadImage((rect2 as any), this.config.rectConfig2 as any);
      this.rect3 = await this.loadImage((rect3 as any), this.config.rectConfig3 as any);
      this.rect4 = await this.loadImage((rect4 as any), this.config.rectConfig4 as any);
      this.rect5 = await this.loadImage((rect5 as any), this.config.rectConfig5 as any);
      this.rect6 = await this.loadImage((rect5 as any), this.config.rectConfig6 as any);
      this.rect7 = await this.loadImage((rect7 as any), this.config.rectConfig7 as any);
      this.rect8 = await this.loadImage((rect7 as any), this.config.rectConfig8 as any);


      this.staticLayer.add( background);

      this.staticLayer.add( this.yellowRanseti1);
      this.staticLayer.add( this.yellowRanseti2);
      this.staticLayer.add( this.yellowRanseti3);
      this.staticLayer.add( this.yellowRanseti4);
      this.staticLayer.add( this.yellowRanseti5);
      this.staticLayer.add( this.yellowRanseti6);
      this.staticLayer.add( this.yellowRanseti7);
      this.staticLayer.add( this.yellowRanseti8);

      this.staticLayer.add( this.redRanseti1);
      this.staticLayer.add( this.redRanseti2);
      this.staticLayer.add( this.redRanseti3);
      this.staticLayer.add( this.redRanseti4);
      this.staticLayer.add( this.redRanseti5);
      this.staticLayer.add( this.redRanseti6);
      this.staticLayer.add( this.redRanseti7);
      this.staticLayer.add( this.redRanseti8);

      this.staticLayer.add( this.rect1);
      this.staticLayer.add( this.rect2);
      this.staticLayer.add( this.rect3);
      this.staticLayer.add( this.rect4);
      this.staticLayer.add( this.rect5);
      this.staticLayer.add( this.rect6);
      this.staticLayer.add( this.rect7);
      this.staticLayer.add( this.rect8);

      this.staticImage();

      this.stage.add(this.staticLayer);
      this.boundDragEvent();
    }

    async staticImage() {
      const staticYellow1 = await this.loadImage((yellowRanseti1 as any), this.config.yellowRansetiConfig1 as any);
      const staticYellow2 = await this.loadImage((yellowRanseti2 as any), this.config.yellowRansetiConfig2 as any);
      const staticYellow3 = await this.loadImage((yellowRanseti3 as any), this.config.yellowRansetiConfig3 as any);
      const staticYellow4 = await this.loadImage((yellowRanseti4 as any), this.config.yellowRansetiConfig4 as any);
      const staticYellow5 = await this.loadImage((yellowRanseti5 as any), this.config.yellowRansetiConfig5 as any);
      const staticYellow6 = await this.loadImage((yellowRanseti5 as any), this.config.yellowRansetiConfig6 as any);
      const staticYellow7 = await this.loadImage((yellowRanseti7 as any), this.config.yellowRansetiConfig7 as any);
      const staticYellow8 = await this.loadImage((yellowRanseti8 as any), this.config.yellowRansetiConfig8 as any);


      const staticRed1 = await this.loadImage((redRanseti1 as any), this.config.redRansetiConfig1 as any);
      const staticRed2 = await this.loadImage((redRanseti2 as any), this.config.redRansetiConfig2 as any);
      const staticRed3 = await this.loadImage((redRanseti3 as any), this.config.redRansetiConfig3 as any);
      const staticRed4 = await this.loadImage((redRanseti4 as any), this.config.redRansetiConfig4 as any);
      const staticRed5 = await this.loadImage((redRanseti5 as any), this.config.redRansetiConfig5 as any);
      const staticRed6 = await this.loadImage((redRanseti5 as any), this.config.redRansetiConfig6 as any);
      const staticRed7 = await this.loadImage((redRanseti7 as any), this.config.redRansetiConfig7 as any);
      const staticRed8 = await this.loadImage((redRanseti8 as any), this.config.redRansetiConfig8 as any);

      this.staticLayer.add( staticYellow1);
      this.staticLayer.add( staticYellow2);
      this.staticLayer.add( staticYellow3);
      this.staticLayer.add( staticYellow4);
      this.staticLayer.add( staticYellow5);
      this.staticLayer.add( staticYellow6);
      this.staticLayer.add( staticYellow7);
      this.staticLayer.add( staticYellow8);

      this.staticLayer.add( staticRed1);
      this.staticLayer.add( staticRed2);
      this.staticLayer.add( staticRed3);
      this.staticLayer.add( staticRed4);
      this.staticLayer.add( staticRed5);
      this.staticLayer.add( staticRed6);
      this.staticLayer.add( staticRed7);
      this.staticLayer.add( staticRed8);
    }

    async initBigImage() {
      this.bigYellow1 = await this.loadImage((bigYellow1 as any), this.config.bigYellowConfig1 as any);

      this.bigYellow4 = await this.loadImage((bigYellow4 as any), this.config.bigYellowConfig4 as any);
      this.bigYellow5 = await this.loadImage((bigYellow5 as any), this.config.bigYellowConfig5 as any);
      this.bigYellow7 = await this.loadImage((bigYellow7 as any), this.config.bigYellowConfig7 as any);

      this.reBigYellow2 = await this.loadImage((bigYellow2 as any), this.config.reBigYellowConfig2 as any);
      this.reBigYellow4 = await this.loadImage((bigYellow3 as any), this.config.reBigYellowConfig3 as any);


      this.bigRed2 = await this.loadImage((bigRed2 as any), this.config.bigRedConfig2 as any);
      this.bigRed3 = await this.loadImage((bigRed3 as any), this.config.bigRedConfig3 as any);
      this.bigRed6 = await this.loadImage((bigRed5 as any), this.config.bigRedConfig6 as any);
      this.bigRed7 = await this.loadImage((bigRed7 as any), this.config.bigRedConfig7 as any);
      this.bigRed8 = await this.loadImage((bigRed8 as any), this.config.bigRedConfig8 as any);

      this.reBigRed1 = await this.loadImage((bigRed1 as any), this.config.reBigRedConfig1 as any);
      this.reBigRed3 = await this.loadImage((bigRed4 as any), this.config.reBigRedConfig4 as any);
      this.reBigRed7 = await this.loadImage((reBigRed8 as any), this.config.reBigRedConfig8 as any);

      this.tip     = await this.loadImage((tip as any), this.config.tipConfig as any);

      this.bigYellow1.visible(false);
      this.bigYellow4.visible(false);
      this.bigYellow5.visible(false);
      this.bigYellow7.visible(false);

      this.bigRed2.visible(false);
      this.bigRed3.visible(false);
      this.bigRed6.visible(false);
      this.bigRed7.visible(false);
      this.bigRed8.visible(false);
      this.tip.visible(false);


      this.reBigYellow2.visible(false);
      this.reBigYellow4.visible(false);
      this.reBigRed1.visible(false);
      this.reBigRed3.visible(false);
      this.reBigRed7.visible(false);


      this.staticLayer.add(this.tip);

      this.staticLayer.add( this.bigYellow1);
      this.staticLayer.add(this.reBigYellow2);
      this.staticLayer.add( this.bigYellow4);
      this.staticLayer.add( this.bigYellow5);
      this.staticLayer.add( this.bigYellow7);

      this.staticLayer.add(this.reBigYellow4);
      this.staticLayer.add( this.bigRed2);
      this.staticLayer.add( this.bigRed3);
      this.staticLayer.add( this.bigRed6);
      this.staticLayer.add( this.bigRed8);
      this.staticLayer.add(this.reBigRed1);
      this.staticLayer.add(this.reBigRed3);
      this.staticLayer.add(this.reBigRed7);

      this.stage.add(this.staticLayer);
    }

    initText () {
      this.yellowTextA = new Konva.Text(this.config.yellowTextA);
      this.yellowTexta = new Konva.Text(this.config.yellowTexta);
      this.yellowTextB = new Konva.Text(this.config.yellowTextB);
      this.yellowTextb = new Konva.Text(this.config.yellowTextb);

      this.redTextA = new Konva.Text(this.config.redTextA);
      this.redTexta = new Konva.Text(this.config.redTexta);
      this.redTextB = new Konva.Text(this.config.redTextB);
      this.redTextb = new Konva.Text(this.config.redTextb);

      this.bigTextA = new Konva.Text(this.config.bigTextA);
      this.bigTexta = new Konva.Text(this.config.bigTexta);
      this.bigTextB = new Konva.Text(this.config.bigTextB);
      this.bigTextb = new Konva.Text(this.config.bigTextb);

      this.setTextDisable(false);

      this.staticLayer.add( this.yellowTextA);
      this.staticLayer.add( this.yellowTexta);
      this.staticLayer.add( this.yellowTextB);
      this.staticLayer.add( this.yellowTextb);
      this.staticLayer.add( this.redTextA);
      this.staticLayer.add( this.redTexta);
      this.staticLayer.add( this.redTextB);
      this.staticLayer.add( this.redTextb);
      this.staticLayer.add( this.bigTextA);
      this.staticLayer.add( this.bigTexta);
      this.staticLayer.add( this.bigTextB);
      this.staticLayer.add( this.bigTextb);
      this.stage.add(this.staticLayer);
    }

    setTextTop() {
      this.yellowTextA.moveToTop();
      this.yellowTexta.moveToTop();
      this.yellowTextB.moveToTop();
      this.yellowTextb.moveToTop();

      this.redTextA.moveToTop();
      this.redTexta.moveToTop();
      this.redTextB.moveToTop();
      this.redTextb.moveToTop();
      this.bigTextA.moveToTop();
      this.bigTexta.moveToTop();
      this.bigTextB.moveToTop();
      this.bigTextb.moveToTop();
    }

    setTextDisable(visable: boolean) {
      this.yellowTextA.visible(visable);
      this.yellowTexta.visible(visable);
      this.yellowTextB.visible(visable);
      this.yellowTextb.visible(visable);
      this.redTextA.visible(visable);
      this.redTexta.visible(visable);
      this.redTextB.visible(visable);
      this.redTextb.visible(visable);

      this.bigTextA.visible(visable);
      this.bigTexta.visible(visable);
      this.bigTextB.visible(visable);
      this.bigTextb.visible(visable);


    }

  changeText(element: any) {
    if (element === this.bigYellow1) {
      this.bigTextA.text('A');
    } else if (element === this.reBigYellow2) {
      this.bigTextA.text('a');
    } else if (element === this.reBigYellow4) {
      this.bigTextb.text('B');
    } else if (element === this.bigYellow4) {
      this.bigTextb.text('b');
    } else if (element === this.reBigRed1) {
      this.bigTexta.text('A');
    } else if (element === this.bigRed2) {
      this.bigTexta.text('a');
    } else if (element === this.bigRed3) {
      this.bigTextB.text('B');
    } else if (element === this.reBigRed3) {
      this.bigTextB.text('b');
    }
  }

    boundDragEvent() {

      let x = 0;
      let y = 0;

      let element: Konva.Image;

      let bigElement: Konva.Image;

      let bottomElement: Konva.Image;

      let dashElement: Konva.Image;

      let elementConfig: any;

        this.stage.on('mousedown touchstart', (event: any) => {

          if (this.getImageDataBoolean(this.yellowRanseti1, this.config.yellowRansetiConfig1)) {
            //图层一的图片

            element = this.yellowRanseti1;
            dashElement = this.rect1;
            bigElement = this.bigYellow1;
            bottomElement = this.reBigYellow2;

            elementConfig = this.config.yellowRansetiConfig1;

            x = this.stage.getPointerPosition().x - this.yellowRanseti1.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti1.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti2, this.config.yellowRansetiConfig2)) {

            element = this.yellowRanseti2;
            bigElement = this.reBigYellow2;
            bottomElement = this.bigYellow1;
            dashElement = this.rect1;

            elementConfig = this.config.yellowRansetiConfig2;

            x = this.stage.getPointerPosition().x - this.yellowRanseti2.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti2.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti3, this.config.yellowRansetiConfig3)) {
            element = this.yellowRanseti3;
            bigElement = this.reBigYellow4;
            bottomElement = this.bigYellow4;
            dashElement = this.rect4;

            elementConfig = this.config.yellowRansetiConfig3;

            x = this.stage.getPointerPosition().x - this.yellowRanseti3.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti3.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti4, this.config.yellowRansetiConfig4)) {

            element = this.yellowRanseti4;
            bigElement = this.bigYellow4;
            bottomElement = this.reBigYellow4;
            dashElement = this.rect4;

            elementConfig = this.config.yellowRansetiConfig4;

            x = this.stage.getPointerPosition().x - this.yellowRanseti4.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti4.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti5, this.config.yellowRansetiConfig5)) {

            element = this.yellowRanseti5;
            bigElement = this.bigYellow5;
            bottomElement = null;
            dashElement = this.rect5;
            elementConfig = this.config.yellowRansetiConfig5;

            this.yellowRanseti5.moveToTop();
            x = this.stage.getPointerPosition().x - this.yellowRanseti5.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti5.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti6, this.config.yellowRansetiConfig6)) {

            element = this.yellowRanseti6;
            bigElement = this.bigYellow5;
            bottomElement = null;
            dashElement = this.rect5;
            elementConfig = this.config.yellowRansetiConfig6;

            this.yellowRanseti6.moveToTop();
            x = this.stage.getPointerPosition().x - this.yellowRanseti6.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti6.y();



          } else if (this.getImageDataBoolean(this.yellowRanseti7, this.config.yellowRansetiConfig7)) {

            element = this.yellowRanseti7;
            bigElement = this.bigYellow7;
            bottomElement = null;
            dashElement = this.rect7;
            elementConfig = this.config.yellowRansetiConfig7;

            this.yellowRanseti7.moveToTop();
            x = this.stage.getPointerPosition().x - this.yellowRanseti7.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti7.y();

          } else if (this.getImageDataBoolean(this.yellowRanseti8, this.config.yellowRansetiConfig8)) {

            element = this.yellowRanseti8;
            bigElement = this.bigYellow7;
            bottomElement = null;
            dashElement = this.rect7;
            elementConfig = this.config.yellowRansetiConfig8;

            this.yellowRanseti8.moveToTop();
            x = this.stage.getPointerPosition().x - this.yellowRanseti8.x();
            y = this.stage.getPointerPosition().y - this.yellowRanseti8.y();

          } else if (this.getImageDataBoolean(this.redRanseti1, this.config.redRansetiConfig1)) {

            element = this.redRanseti1;
            bigElement = this.reBigRed1;
            bottomElement = this.bigRed2;
            dashElement = this.rect2;
            elementConfig = this.config.redRansetiConfig1;

            x = this.stage.getPointerPosition().x - this.redRanseti1.x();
            y = this.stage.getPointerPosition().y - this.redRanseti1.y();

          } else if (this.getImageDataBoolean(this.redRanseti2, this.config.redRansetiConfig2)) {

            element = this.redRanseti2;
            bigElement = this.bigRed2;
            bottomElement = this.reBigRed1;
            dashElement = this.rect2;
            elementConfig = this.config.redRansetiConfig2;
            if (dashElement.isVisible()) {
              this.bigTexta.text('a');
              this.redRanseti2.moveToTop();
            }

            x = this.stage.getPointerPosition().x - this.redRanseti2.x();
            y = this.stage.getPointerPosition().y - this.redRanseti2.y();

          } else if (this.getImageDataBoolean(this.redRanseti3, this.config.redRansetiConfig3)) {

            element = this.redRanseti3;
            bigElement = this.bigRed3;
            bottomElement = this.reBigRed3;
            dashElement = this.rect3;
            elementConfig = this.config.redRansetiConfig3;

            x = this.stage.getPointerPosition().x - this.redRanseti3.x();
            y = this.stage.getPointerPosition().y - this.redRanseti3.y();

          } else if (this.getImageDataBoolean(this.redRanseti4, this.config.redRansetiConfig4)) {

            element = this.redRanseti4;
            bigElement = this.reBigRed3;
            bottomElement = this.bigRed3;
            dashElement = this.rect3;
            elementConfig = this.config.redRansetiConfig4;

            x = this.stage.getPointerPosition().x - this.redRanseti4.x();
            y = this.stage.getPointerPosition().y - this.redRanseti4.y();

          } else if (this.getImageDataBoolean(this.redRanseti5, this.config.redRansetiConfig5)) {

            element = this.redRanseti5;
            bigElement = this.bigRed6;
            bottomElement = null;
            dashElement = this.rect6;
            elementConfig = this.config.redRansetiConfig5;

            this.redRanseti5.moveToTop();
            x = this.stage.getPointerPosition().x - this.redRanseti5.x();
            y = this.stage.getPointerPosition().y - this.redRanseti5.y();

          } else if (this.getImageDataBoolean(this.redRanseti6, this.config.redRansetiConfig6)) {

            element = this.redRanseti6;
            bigElement = this.bigRed6;
            bottomElement = null;
            dashElement = this.rect6;
            elementConfig = this.config.redRansetiConfig6;

            this.redRanseti6.moveToTop();
            x = this.stage.getPointerPosition().x - this.redRanseti6.x();
            y = this.stage.getPointerPosition().y - this.redRanseti6.y();


          } else if (this.getImageDataBoolean(this.redRanseti7, this.config.redRansetiConfig7)) {

            element = this.redRanseti7;
            bigElement = this.reBigRed7;
            bottomElement = this.bigRed8;
            dashElement = this.rect8;
            elementConfig = this.config.redRansetiConfig7;

            this.redRanseti7.moveToTop();
            x = this.stage.getPointerPosition().x - this.redRanseti7.x();
            y = this.stage.getPointerPosition().y - this.redRanseti7.y();


          } else if (this.getImageDataBoolean(this.redRanseti8, this.config.redRansetiConfig8)) {

            element = this.redRanseti8;
            bigElement = this.bigRed8;
            bottomElement = this.reBigRed7;
            dashElement = this.rect8;
            elementConfig = this.config.redRansetiConfig8;

            this.redRanseti8.moveToTop();
            x = this.stage.getPointerPosition().x - this.redRanseti8.x();
            y = this.stage.getPointerPosition().y - this.redRanseti8.y();

          }
        });


      this.stage.on('mousemove touchmove', (event: any) => {
        if (element) {
          element.x(this.stage.getPointerPosition().x - x);
          element.y(this.stage.getPointerPosition().y - y);
        }
        this.staticLayer.draw();
      });

      this.stage.on('mouseup touchend', (event: any) => {
        // 碰撞检测
        if (element && bigElement) {

          const isIntersection = this.haveIntersection(element.getClientRect(), bigElement.getClientRect());

          if (isIntersection) {
            //显示大图
            // element.visible(false);
            if (bottomElement) {
              bottomElement.visible(false);
            }
            element.x(elementConfig.x);
            element.y(elementConfig.y);
            element.moveToTop();
            bigElement.moveToTop();
            this.changeText(bigElement);
            this.setTextTop();
            bigElement.visible(true);
            dashElement.visible(false);
            bottomElement = bigElement;

          } else {
            //返回初始位置
            element.x(elementConfig.x);
            element.y(elementConfig.y);
          }

        }

        this.staticLayer.draw();

        if (this.tipAllDisable()) {
          //全部吸附完成
          (window as any).viewHandler.viewModel.$data.isShow = true;
        }
        element = null;
        bigElement = null;
        dashElement = null;
      });
        this.bjsDrag.moleculeImage();
    }

    getImageDataBoolean(ranseti1: any, yellowRansetiConfig1: any) {
      const statgeCanvas   =  this.initCanvas(this.stage, this.config.statgeConfig);
      const statgeArray = (statgeCanvas as any)
        .getImageData(this.stage.getPointerPosition().x,
          this.stage.getPointerPosition().y, 1, 1).data;

      const yellowCanvas1  = this.initCanvas(ranseti1, yellowRansetiConfig1);
      const yellowArray1 = (yellowCanvas1 as any)
        .getImageData(this.stage.getPointerPosition().x - ranseti1.x(),
          this.stage.getPointerPosition().y - ranseti1.y(), 1, 1).data;

      return (statgeArray[0] === yellowArray1[0] && statgeArray[1] === yellowArray1[1]
      && statgeArray[2] === yellowArray1[2] && statgeArray[3] === yellowArray1[3]);
    }

    async reset() {
      this.bigYellow1.visible(false);
      this.bigYellow4.visible(false);
      this.bigYellow5.visible(false);
      this.bigYellow7.visible(false);
      this.reBigYellow2.visible(false);
      this.reBigYellow4.visible(false);

      this.bigRed2.visible(false);
      this.bigRed3.visible(false);
      this.bigRed6.visible(false);
      this.bigRed8.visible(false);
      this.reBigRed1.visible(false);
      this.reBigRed7.visible(false);
      this.reBigRed3.visible(false);

      this.rect1.visible(true);
      this.rect2.visible(true);
      this.rect3.visible(true);
      this.rect4.visible(true);
      this.rect5.visible(true);
      this.rect6.visible(true);
      this.rect7.visible(true);
      this.rect8.visible(true);

      this.yellowRanseti1.visible(true);
      this.yellowRanseti2.visible(true);
      this.yellowRanseti3.visible(true);
      this.yellowRanseti4.visible(true);
      this.yellowRanseti5.visible(true);
      this.yellowRanseti6.visible(true);
      this.yellowRanseti7.visible(true);
      this.yellowRanseti8.visible(true);

      this.redRanseti1.visible(true);
      this.redRanseti2.visible(true);
      this.redRanseti3.visible(true);
      this.redRanseti4.visible(true);
      this.redRanseti5.visible(true);
      this.redRanseti6.visible(true);
      this.redRanseti7.visible(true);
      this.redRanseti8.visible(true);

      this.setInitConfig(this.yellowRanseti1, this.config.yellowRansetiConfig1);
      this.setInitConfig(this.yellowRanseti2, this.config.yellowRansetiConfig2);
      this.setInitConfig(this.yellowRanseti3, this.config.yellowRansetiConfig3);
      this.setInitConfig(this.yellowRanseti4, this.config.yellowRansetiConfig4);
      this.setInitConfig(this.yellowRanseti5, this.config.yellowRansetiConfig5);
      this.setInitConfig(this.yellowRanseti6, this.config.yellowRansetiConfig6);
      this.setInitConfig(this.yellowRanseti7, this.config.yellowRansetiConfig7);
      this.setInitConfig(this.yellowRanseti8, this.config.yellowRansetiConfig8);
      this.setInitConfig(this.redRanseti1, this.config.redRansetiConfig1);
      this.setInitConfig(this.redRanseti2, this.config.redRansetiConfig2);
      this.setInitConfig(this.redRanseti3, this.config.redRansetiConfig3);
      this.setInitConfig(this.redRanseti4, this.config.redRansetiConfig4);
      this.setInitConfig(this.redRanseti5, this.config.redRansetiConfig5);
      this.setInitConfig(this.redRanseti6, this.config.redRansetiConfig6);
      this.setInitConfig(this.redRanseti7, this.config.redRansetiConfig7);
      this.setInitConfig(this.redRanseti8, this.config.redRansetiConfig8);

      this.setTextDisable(false);

      this.tip.visible(false);

      this.staticLayer.draw();
    }

    setInitConfig(element: any, elementConfig: any) {
      element.x(elementConfig.x);
      element.y(elementConfig.y);
    }

    initCanvas(element: any, config: any) {
      const canvas = element.toCanvas({
        callback: () => { console.log('执行了'); },
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height
      });

      const canvasCtx = canvas.getContext('2d');

      return canvasCtx;

    }

    haveIntersection(r1: any, r2: any) {
      return !(
        r2.x > r1.x + r1.width * 0.7 ||
        r2.x + r2.width * 0.7 < r1.x ||
        r2.y > r1.y + r1.height * 0.7 ||
        r2.y + r2.height * 0.7 < r1.y
      );
    }

    tipAllDisable() {

      return (this.rect1.isVisible() === false && this.rect2.isVisible() === false
        && this.rect3.isVisible() === false && this.rect4.isVisible() === false
        && this.rect5.isVisible() === false && this.rect6.isVisible() === false
        && this.rect7.isVisible() === false && this.rect8.isVisible() === false);
    }



}

