import {MyCanvasConfig} from './MyCanvasConfig';
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import backgroundImage from '../sub_static/backgroundImage.png';
import rightButtonText1 from '../sub_static/rightButtonText1.png';
import rightButtonText2 from '../sub_static/rightButtonText2.png';
import rightButtonText3 from '../sub_static/rightButtonText3.png';
import rightButtonText4 from '../sub_static/rightButtonText4.png';

import { ImageEvent } from './ImageEvent';

export default class MyCanvas {
    config: MyCanvasConfig;
    imageEvent: ImageEvent;
    time = new Date().valueOf();

    myCanvas: fabric.Canvas;

    // 白色线
    whiteLine: fabric.Rect;
    // 白色线对应的拖动按钮
    whiteLineButton: any;

    // 右侧四个点击按钮
    rightButton1: any;
    rightButton2: any;
    rightButton3: any;
    rightButton4: any;

    // 按钮对应的文字
    rightText1: any;
    rightText2: any;
    rightText3: any;
    rightText4: any;

    // 按钮点击显示的说明文字
    rightButtonText1: any;
    rightButtonText2: any;
    rightButtonText3: any;
    rightButtonText4: any;

    // 经度按钮
    longitudeButton: any;

    constructor() {
      this.config = new MyCanvasConfig();
      this.imageEvent = new ImageEvent();

      this.init();
    }

    async init() {
      (document.getElementById('storyCanvas') as any).width = window.innerWidth;
      (document.getElementById('storyCanvas') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('storyCanvas');
      this.myCanvas.selection = false;

      await this.initBackgroundImage();
      await this.initLineAndButton();
      await this.initButton();
      await this.initText();
      await this.initExplainTextImage();


      await this.initButtonClickEvent();

      await this.initWhiteLineButtonDragEvent();
    }

    async initBackgroundImage() {
      const background = await FabricUtil.loadImage(backgroundImage as any, this.config.background);
      this.myCanvas.add(background);

      const rightRect = new fabric.Rect(this.config.rightRect);
      this.myCanvas.add(rightRect);

      // 白色线最左可拖动位置
      const leftLine = new fabric.Rect(this.config.leftLine);
      this.myCanvas.add(leftLine);

      // 白色线最右可拖动位置
      const rightLine = new fabric.Rect(this.config.rightLine);
      this.myCanvas.add(rightLine);

      const tipsText = new fabric.Text('本素材以180度经线为零时经线，区时不考虑实际使用的区时', this.config.tipsText);
      this.myCanvas.add(tipsText);
    }

    // 添加白色线和拖动按钮
    async initLineAndButton() {

      this.whiteLine = new fabric.Rect(this.config.whiteLine as any);
      this.myCanvas.add(this.whiteLine);

      const whiteCircle = new fabric.Circle(this.config.whiteCircle as any);
      const blueCircle = new fabric.Circle(this.config.blueCircle as any);

      this.whiteLineButton = new fabric.Group([whiteCircle, blueCircle], this.config.whiteLineButton);
      this.myCanvas.add(this.whiteLineButton);
    }

    // 添加可点击按钮
    async initButton() {
      this.rightButton1 = await FabricUtil.createButton(this.config.rightButton1);
      this.myCanvas.add(this.rightButton1);

      this.rightButton2 = await FabricUtil.createButton(this.config.rightButton2);
      this.myCanvas.add(this.rightButton2);

      this.rightButton3 = await FabricUtil.createButton(this.config.rightButton3);
      this.myCanvas.add(this.rightButton3);

      this.rightButton4 = await FabricUtil.createButton(this.config.rightButton4);
      this.myCanvas.add(this.rightButton4);

      this.longitudeButton = await FabricUtil.createButton(this.config.longitudeButton);
      this.myCanvas.add(this.longitudeButton);
    }

    initText() {
      this.rightText1 = new fabric.Text('12:00', this.config.rightText1);
      this.myCanvas.add(this.rightText1);

      this.rightText2 = new fabric.Text('中时区', this.config.rightText2);
      this.myCanvas.add(this.rightText2);

      this.rightText3 = new fabric.Text('12:00', this.config.rightText3);
      this.myCanvas.add(this.rightText3);

      this.rightText4 = new fabric.Text('12:00', this.config.rightText4);
      this.myCanvas.add(this.rightText4);
    }

    async initExplainTextImage() {
      this.rightButtonText1 = await FabricUtil.loadImage(rightButtonText1 as any, this.config.rightButtonText1);
      this.myCanvas.add(this.rightButtonText1);

      this.rightButtonText2 = await FabricUtil.loadImage(rightButtonText2 as any, this.config.rightButtonText2);
      this.myCanvas.add(this.rightButtonText2);

      this.rightButtonText3 = await FabricUtil.loadImage(rightButtonText3 as any, this.config.rightButtonText3);
      this.myCanvas.add(this.rightButtonText3);

      this.rightButtonText4 = await FabricUtil.loadImage(rightButtonText4 as any, this.config.rightButtonText4);
      this.myCanvas.add(this.rightButtonText4);
    }

    initButtonClickEvent() {
      this.imageEvent.buttonClickEvent(
        this.rightButton1, this.rightButtonText1,
        this.rightButton2, this.rightButtonText2,
        this.rightButton3, this.rightButtonText3,
        this.rightButton4, this.rightButtonText4);

      this.imageEvent.buttonClickEvent(
        this.rightButton2, this.rightButtonText2,
        this.rightButton1, this.rightButtonText1,
        this.rightButton3, this.rightButtonText3,
        this.rightButton4, this.rightButtonText4);

      this.imageEvent.buttonClickEvent(
        this.rightButton3, this.rightButtonText3,
        this.rightButton2, this.rightButtonText2,
        this.rightButton1, this.rightButtonText1,
        this.rightButton4, this.rightButtonText4);

      this.imageEvent.buttonClickEvent(
        this.rightButton4, this.rightButtonText4,
        this.rightButton2, this.rightButtonText2,
        this.rightButton3, this.rightButtonText3,
        this.rightButton1, this.rightButtonText1);
    }

    initWhiteLineButtonDragEvent() {

      this.whiteLineButton.on('moving', () => {
        // 限制按钮的拖动的范围
        this.whiteLineButton.set('top', this.config.whiteLineButton.top).setCoords();
        if (this.whiteLineButton.get('left') < this.config.leftLine.left) {
          this.whiteLineButton.set('left', this.config.leftLine.left).setCoords();
        } else if (this.whiteLineButton.get('left') > this.config.rightLine.left) {
          this.whiteLineButton.set('left', this.config.rightLine.left).setCoords();
        }

        this.whiteLineButtonDragEvent();
      });
    }

    // 白色按钮拖动触发事件
    whiteLineButtonDragEvent() {
      // 设置白色线跟随按钮移动
      this.whiteLine.set('left', this.whiteLineButton.get('left')).setCoords();

      const angle = (this.whiteLineButton.get('left') - this.config.leftLine.left) /
        ((this.config.rightLine.left - this.config.leftLine.left) / 360);

      this.rightText1.text = this.getLocalTime(angle);
      this.rightText3.text = this.getDistrictTime(angle);
      this.rightText2.text = this.getTimeZone(angle);

      // 经度文字
      this.longitudeButton.set('left', this.whiteLine.get('left')).setCoords();

      if (Math.floor(angle - 180) < 0) {
        this.longitudeButton._objects[1].set('text', -Math.floor(angle - 180) + '°W');
      } else if (Math.floor(angle - 180) > 0) {
        this.longitudeButton._objects[1].set('text', Math.floor(angle - 180) + '°E');
      } else {
        this.longitudeButton._objects[1].set('text', 0 + '°');
      }

    }

    // 地方时
    getLocalTime(angle: any) {

      let hour = 0;
      let minute = angle * 4;

      if (minute > 59) {
        hour = Math.floor(minute / 60);
      } else {
        hour = 0;
      }

      minute = Math.round(minute % 60);
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }


      let time = hour + ':' + minute;

      if (minute < 10) {
        time = hour + ':0' + minute;
      } else {
        time = hour + ':' + minute;
      }


      return time;
    }

    // 区时
    getDistrictTime(angle: any) {
      const minute = angle * 4;
      const hour = Math.round(minute / 60);

      const time = hour + ':00';
      return time;
    }

    // 时区
    getTimeZone(angle: any) {
      const minute = angle * 4;
      const hour = Math.round(minute / 60);
      let timeZone = '中时区';

      switch (hour) {
        case 1:
          timeZone = '西十一区';
          break;
        case 2:
          timeZone = '西十区';
          break;
        case 3:
          timeZone = '西九区';
          break;
        case 4:
          timeZone = '西八区';
          break;
        case 5:
          timeZone = '西七区';
          break;
        case 6:
          timeZone = '西六区';
          break;
        case 7:
          timeZone = '西五区';
          break;
        case 8:
          timeZone = '西四区';
          break;
        case 9:
          timeZone = '西三区';
          break;
        case 10:
          timeZone = '西二区';
          break;
        case 11:
          timeZone = '西一区';
          break;
        case 12:
          timeZone = '中时区';
          break;
        case 13:
          timeZone = '东一区';
          break;
        case 14:
          timeZone = '东二区';
          break;
        case 15:
          timeZone = '东三区';
          break;
        case 16:
          timeZone = '东四区';
          break;
        case 17:
          timeZone = '东五区';
          break;
        case 18:
          timeZone = '东六区';
          break;
        case 19:
          timeZone = '东七区';
          break;
        case 20:
          timeZone = '东八区';
          break;
        case 21:
          timeZone = '东九区';
          break;
        case 22:
          timeZone = '东十区';
          break;
        case 23:
          timeZone = '东十一区';
          break;
        default:
          timeZone = '十二区';
      }

      return timeZone;
    }

    // 重置
    reset() {
      this.resetElement(this.whiteLineButton, this.config.whiteLineButton);
      this.whiteLineButtonDragEvent();

      this.rightText1.text = '12:00';

      this.imageEvent.showClickButton(false, this.rightButton1);
      this.imageEvent.showClickButton(false, this.rightButton2);
      this.imageEvent.showClickButton(false, this.rightButton3);
      this.imageEvent.showClickButton(false, this.rightButton4);

      this.rightButtonText1.set('visible', false);
      this.rightButtonText2.set('visible', false);
      this.rightButtonText3.set('visible', false);
      this.rightButtonText4.set('visible', false);

      this.myCanvas.renderAll();
    }

    resetElement(element: any, config: any) {
      element.set('left', config.left).setCoords();
    }
}

