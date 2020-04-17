import { fabric } from 'fabric';
import { Helper } from './Helper';
import * as cerebrum from './../sub_static/cerebrum.png'; //大脑
import * as language from './../sub_static/language.png'; //语言
import * as look from './../sub_static/look.png'; //视觉
import * as hearing from './../sub_static/hearing.png'; //听觉
import * as motion from './../sub_static/motion.png'; //运动
import * as taste from './../sub_static/taste.png'; //味觉
import * as olfactory from './../sub_static/olfactory.png'; //嗅觉
import * as tactile from './../sub_static/tactile.png'; //触觉
import * as line1 from './../sub_static/line1.png';
import * as line2 from './../sub_static/line2.png';
import * as line3 from './../sub_static/line3.png';
import * as line4 from './../sub_static/line4.png';
import * as line5 from './../sub_static/line5.png';
import * as line6 from './../sub_static/line6.png';
import * as line7 from './../sub_static/line7.png';
import { Config } from './Config';

export class MainContent {
  myCanvas: any;
  config = new Config();

  languageImage: fabric.Image;
  lookImage: fabric.Image;
  hearingImage: fabric.Image;
  motionImage: fabric.Image;
  tasteImage: fabric.Image;
  olfactoryImage: fabric.Image;
  tactileImage: fabric.Image;
  circle: fabric.Circle[];
  line: fabric.Image[] = [];
  timer: any;
  dragTips: fabric.Text;
  normalTip: fabric.Text;
  langTip: fabric.Text;
  lable: fabric.Text[] = [];
  showLine: string[] = [];
  scale = window['env'].browserInfo.isSmallDevice ? 1 : 2;

  texts = window.env.browserInfo.lang;

  constructor() {
    this.init();
  }

  init() {
    this.preLoad();
    this.createCavas();
    this.loadImage();
    this.createTips();
    this.createCircleRange();

  }

  preLoad() {
    const imageArray = [cerebrum, language, look, hearing, motion, taste, olfactory, tactile,
    line1, line2, line3, line4, line5, line6, line7];
    console.log(imageArray);
  }

  //创建canvas场景
  createCavas() {
    (document.getElementById('storyCanvas') as any).width = 1024 * this.scale;
    (document.getElementById('storyCanvas') as any).height = 576 * this.scale;
    this.myCanvas = new fabric.Canvas('storyCanvas', {
      selection: false,
    });
  }

  //创建提示
  createTips() {
    this.dragTips = new fabric.Text(this.texts.tip[0], this.config.dragTipConfig);
    this.normalTip = new fabric.Text(this.texts.tip[1], this.config.normalTipConfig);
    this.normalTip.visible = false;
    this.langTip = new fabric.Text(this.texts.languageTip, this.config.normalTipConfig);
    this.langTip.set('left', 274 * this.scale);
    this.langTip.set('top', 360  * this.scale);
    this.langTip.visible = false;
    for (let i = 0; i < 7; i++) {
      this.lable.push(new fabric.Text(this.texts.lable[i], this.config.lableConfig));
      this.myCanvas.add(this.lable[i]);
    }
    for (let i = 0; i < 3; i++) {
      this.lable[i].set('left', 92 * this.scale);
      this.lable[i].set('top', (212 + (i * 108)) * this.scale);
    }

    for (let i = 0; i < 4; i++) {
      this.lable[3 + i].set('left', 905 * this.scale);
      this.lable[3 + i].set('top', (158 + (i * 108)) * this.scale);
    }
    this.lable[0].set('name', 'language');
    this.lable[1].set('name', 'look');
    this.lable[2].set('name', 'hearing');
    this.lable[3].set('name', 'motion');
    this.lable[4].set('name', 'taste');
    this.lable[5].set('name', 'olfactory');
    this.lable[6].set('name', 'tactile');
    this.myCanvas.add(this.dragTips, this.normalTip, this.langTip);
  }

  //加载各图片
  async loadImage() {
    const cerebrumImage = await Helper.loadImage(cerebrum as any, this.config.cerebrumConfig);
    this.languageImage = await Helper.loadImage(language as any, this.config.languageConfig);
    this.lookImage = await Helper.loadImage(look as any, this.config.lookConfig);
    this.hearingImage = await Helper.loadImage(hearing as any, this.config.hearingConfig);
    this.motionImage = await Helper.loadImage(motion as any, this.config.motionConfig);
    this.tasteImage = await Helper.loadImage(taste as any, this.config.tasteConfig);
    this.olfactoryImage = await Helper.loadImage(olfactory as any, this.config.olfactoryConfig);
    this.tactileImage = await Helper.loadImage(tactile as any, this.config.tactileConfig);
    this.line[0] = await Helper.loadImage(line1 as any, this.config.line1Config);
    this.line[1] = await Helper.loadImage(line2 as any, this.config.line2Config);
    this.line[2] = await Helper.loadImage(line3 as any, this.config.line3Config);
    this.line[3] = await Helper.loadImage(line4 as any, this.config.line4Config);
    this.line[4] = await Helper.loadImage(line5 as any, this.config.line5Config);
    this.line[5] = await Helper.loadImage(line6 as any, this.config.line6Config);
    this.line[6] = await Helper.loadImage(line7 as any, this.config.line7Config);
    this.myCanvas.add(cerebrumImage, this.languageImage, this.lookImage, this.hearingImage, this.motionImage, this.tasteImage,
      this.olfactoryImage, this.tactileImage);
    for (let i = 0; i < this.line.length; i++) {
      this.myCanvas.add(this.line[i]);
      this.line[i].set('visible', false);
    }
    this.bindDrag();
  }

  //创建反馈框体
  createCircleRange() {
    this.circle = [];
    for (let i = 0; i < 7; i++) {
      this.circle.push(new fabric.Circle(this.config.circleConfig));
      this.circle[i].set('visible', false);
      this.myCanvas.add(this.circle[i]);
    }

    for (let i = 0; i < 3; i++) {
      this.circle[i].set('left', 318.5 * this.scale);
    }

    for (let i = 0; i < 4; i++) {
      this.circle[3 + i].set('left', 731.5 * this.scale);
    }

    this.circle[0].set('top', 155.5 * this.scale);
    this.circle[1].set('top', 288 * this.scale);
    this.circle[2].set('top', 488.5 * this.scale);
    this.circle[3].set('top', 105.5 * this.scale);
    this.circle[4].set('top', 250.5 * this.scale);
    this.circle[5].set('top', 362.5 * this.scale);
    this.circle[6].set('top', 472.5 * this.scale);

    this.circle[0].set('name', 'motion');
    this.circle[1].set('name', 'language');
    this.circle[2].set('name', 'taste');
    this.circle[3].set('name', 'tactile');
    this.circle[4].set('name', 'look');
    this.circle[5].set('name', 'hearing');
    this.circle[6].set('name', 'olfactory');


  }

  //绑定拖动事件
  bindDrag() {
    this.dragHelper(this.languageImage,
      {x: 110 * this.scale, y: 174 * this.scale}, {x: this.circle[1].get('left'), y: this.circle[1].get('top')});
    this.dragHelper(this.lookImage,
      {x: 110 * this.scale, y: 282 * this.scale}, {x: this.circle[4].get('left'), y: this.circle[4].get('top')});
    this.dragHelper(this.hearingImage,
      {x: 110 * this.scale, y: 391 * this.scale}, {x: this.circle[5].get('left'), y: this.circle[5].get('top')});
    this.dragHelper(this.motionImage,
      {x: 921 * this.scale, y: 120 * this.scale}, {x: this.circle[0].get('left'), y: this.circle[0].get('top')});
    this.dragHelper(this.tasteImage,
      {x: 921 * this.scale, y: 228 * this.scale}, {x: this.circle[2].get('left'), y: this.circle[2].get('top')});
    this.dragHelper(this.olfactoryImage,
      {x: 921 * this.scale, y: 336 * this.scale}, {x: this.circle[6].get('left'), y: this.circle[6].get('top')});
    this.dragHelper(this.tactileImage,
      {x: 921 * this.scale, y: 444 * this.scale}, {x: this.circle[3].get('left'), y: this.circle[3].get('top')});
  }

  //判断是否碰撞
  isCollision(circle: any): string {
    switch (true) {
      case Helper.impactChecking(circle, {x: 318.5 * this.scale, y: 155.5 * this.scale, radius: 30.5 * this.scale}):
        return 'motion';
        break;
      case Helper.impactChecking(circle, {x: 318.5 * this.scale, y: 288 * this.scale, radius: 30.5 * this.scale}):
        return 'language';
        break;
      case Helper.impactChecking(circle, {x: 318.5 * this.scale, y: 488.5 * this.scale, radius: 30.5 * this.scale}):
        return 'taste';
        break;
      case Helper.impactChecking(circle, {x: 731.5 * this.scale, y: 105.5 * this.scale, radius: 30.5 * this.scale}):
        return 'tactile';
        break;
      case Helper.impactChecking(circle, {x: 731.5 * this.scale, y: 250.5 * this.scale, radius: 30.5 * this.scale}):
        return 'look';
        break;
      case Helper.impactChecking(circle, {x: 731.5 * this.scale, y: 362.5 * this.scale, radius: 30.5 * this.scale}):
        return 'hearing';
        break;
      case Helper.impactChecking(circle, {x: 731.5 * this.scale, y: 472.5 * this.scale, radius: 30.5 * this.scale}):
        return 'olfactory';
        break;
      default:
        return 'none';
        break;
    }

  }

  //错误反馈
  errorFeedback(obj: any, value: string, position: any, AdsorbentAxis: any) {
    if (value === 'none') {
      //创建动画使图片返回初始位置
      this.initialPosition(obj, position);
      console.log('test');
      this.hiddenOrShowRange(false);
      this.showRange();
      return;
    }
    //碰撞返回值 与 拖动图片的name比较 如果相同 吸附 禁用 drag 不相同 对应的range错误反馈
    if (obj.name === value) {
      if (obj.get('selectable') === false) {
        return;
      }
      if (obj.name === 'language') {
        this.langTip.visible = true;
      }
      this.initialPosition(obj, AdsorbentAxis);
      obj.set('selectable', false);
      this.myCanvas.discardActiveObject();
      obj.set('hoverCursor', 'auto');
      Helper.enlargeAnimation(obj);
      this.hiddenOrShowRange(false);
      this.showLine.push(obj.name);
      this.showRange();
      return;
    }

    //错误反馈
    this.feedbackHelper(value, 'red');
    this.initialPosition(obj, position);
    this.timer = setTimeout(() => {
      this.hiddenOrShowRange(false);
      this.showRange();
      this.myCanvas.renderAll();
    }, 500);
  }

  //限定拖动范围的方法
  dragRange(obj: fabric.Image, e: any) {
    if (obj.get('left') < 36.5 * this.scale) {
      obj.set('left', 36.5 * this.scale);
    } else if (obj.get('left') > 987.5 * this.scale) {
      obj.set('left', 987.5 * this.scale);
    }

    if (obj.get('top') < 36.5 * this.scale) {
      obj.set('top', 36.5 * this.scale);
    } else if (obj.get('top') > 539.5 * this.scale) {
      obj.set('top', 539.5 * this.scale);
    }
  }

  dragHelper(obj: fabric.Image, position: any, AdsorbentAxis: any, movingCallback?: any, mouseupCallback?: any) {
    movingCallback = movingCallback ? movingCallback : () => {};
    mouseupCallback = mouseupCallback ? mouseupCallback : () => {};
    obj.on({
      'mousedown': () => {
        this.dragTips.visible = false;
        this.normalTip.visible = true;
        for (let i = 0; i < this.circle.length; i++) {
          this.circle[i].set('fill', 'rgba(216,216,216,0.9)');
          this.circle[i].set('stroke', '#FFFFFF');
        }
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (obj.get('selectable') === false) {
          return;
        }
        this.hiddenOrShowRange(true);
      },
      'moving': (e: any) => {
        //限定可拖拽的范围
        this.dragRange(obj, e);
        this.feedbackHelper(this.isCollision({x: obj.get('left'), y: obj.get('top'), radius: 30.5 * this.scale}), 'white');
        movingCallback();

      },
      'mouseup': (e: any) => {
        this.errorFeedback(obj, this.isCollision({x: obj.get('left'), y: obj.get('top'), radius: 30.5 * this.scale}),
          position, AdsorbentAxis);
        this.moveLable();
        mouseupCallback();
      }
    });
  }

  feedbackHelper(value: string, color: string) {
    const fillColor = this.getColor(color);
    for (let i = 0; i < this.circle.length; i++) {
      this.circle[i].set('fill', 'rgba(216,216,216,0.9)');
      this.circle[i].set('stroke', '#FFFFFF');
    }
    switch (value) {
      case 'motion':
        this.circle[0].set('fill', fillColor.fill);
        this.circle[0].set('stroke', fillColor.stroke);
        break;
      case 'language':
        this.circle[1].set('fill', fillColor.fill);
        this.circle[1].set('stroke', fillColor.stroke);
        break;
      case 'taste':
        this.circle[2].set('fill', fillColor.fill);
        this.circle[2].set('stroke', fillColor.stroke);
        break;
      case 'tactile':
        this.circle[3].set('fill', fillColor.fill);
        this.circle[3].set('stroke', fillColor.stroke);
        break;
      case 'look':
        this.circle[4].set('fill', fillColor.fill);
        this.circle[4].set('stroke', fillColor.stroke);
        break;
      case 'hearing':
        this.circle[5].set('fill', fillColor.fill);
        this.circle[5].set('stroke', fillColor.stroke);
        break;
      case 'olfactory':
        this.circle[6].set('fill', fillColor.fill);
        this.circle[6].set('stroke', fillColor.stroke);
        break;

    }
  }

  //重新设置图片位置
  initialPosition(obj: fabric.Image, position: any) {
    Helper.moveAnimation(obj, position.x, position.y, this.myCanvas);
  }

  hiddenOrShowRange(value: boolean) {
    for (let i = 0; i < this.circle.length; i++ ) {
      this.circle[i].set('visible', value);
    }

    for (let i = 0; i < this.line.length; i++) {
      this.line[i].set('visible', value);
    }
  }

  showRange() {
    //显示吸附后图片的线
    //遍历已经记录的拖入成功的数组， 显示对应的图像
    for (let i = 0; i < this.circle.length; i++) {
      for (let j = 0; j < this.showLine.length; j++) {
        if (this.showLine[j] === this.circle[i].get('name')) {
          this.circle[i].set('visible', true);
        }

        if (this.showLine[j] === this.line[i].get('name')) {
          this.line[i].set('visible', true);
        }
      }
    }
  }

  moveLable() {
    for (let i = 0; i < this.showLine.length; i++) {
      this.moveLableHelper(this.showLine[i]);
    }
  }

  moveLableHelper(name: string) {
    switch (name) {
      case 'language':
        this.lable[0].set('left', 303 * this.scale);
        this.lable[0].set('top', 330 * this.scale);
        break;
      case 'look':
        this.lable[1].set('left', 717 * this.scale);
        this.lable[1].set('top', 294 * this.scale);
        break;
      case 'hearing':
        this.lable[2].set('left', 717 * this.scale);
        this.lable[2].set('top', 406 * this.scale);
        break;
      case 'motion':
        this.lable[3].set('left', 303 * this.scale);
        this.lable[3].set('top', 198 * this.scale);
        break;
      case 'taste':
        this.lable[4].set('left', 303 * this.scale);
        this.lable[4].set('top', 532 * this.scale);
        break;
      case 'olfactory':
        this.lable[5].set('left', 717 * this.scale);
        this.lable[5].set('top', 516 * this.scale);
        break;
      case 'tactile':
        this.lable[6].set('left', 717 * this.scale);
        this.lable[6].set('top', 149 * this.scale);
        break;
    }
  }

  //获取反馈框的颜色
  getColor(value: string) {
    let fill;
    let stroke;
    if (value === 'white') {
      fill = 'rgba(216,216,216,0.50)';
      stroke = '#FFFFFF';
    } else {
      fill = 'rgba(250,90,84,0.50)';
      stroke = '#fa5a54';
    }

    return {fill: fill, stroke: stroke};

  }

  reset() {
    this.showLine = [];
    Helper.imageReset(this.languageImage, 110 * this.scale, 174 * this.scale);
    Helper.imageReset(this.lookImage, 110 * this.scale, 282 * this.scale);
    Helper.imageReset(this.hearingImage, 110 * this.scale, 391 * this.scale);
    Helper.imageReset(this.motionImage, 921 * this.scale, 120 * this.scale);
    Helper.imageReset(this.tasteImage, 921 * this.scale, 228 * this.scale);
    Helper.imageReset(this.olfactoryImage, 921 * this.scale, 336 * this.scale);
    Helper.imageReset(this.tactileImage, 921 * this.scale, 444 * this.scale);

    for (let i = 0; i < 3; i++) {
      Helper.textReset(this.lable[i], 92 * this.scale, (212 + (i * 108)) * this.scale);
    }

    for (let i = 0; i < 4; i++) {
      Helper.textReset(this.lable[3 + i], 905 * this.scale, (158 + (i * 108)) * this.scale);
    }
    for (let i = 0; i < this.circle.length; i++) {
      this.circle[i].set('fill', 'rgba(216,216,216,0.9)');
      this.circle[i].set('stroke', '#FFFFFF');
    }
    this.hiddenOrShowRange(false);
    this.dragTips.visible = true;
    this.normalTip.visible = false;
    this.langTip.visible = false;
    this.myCanvas.renderAll();
  }

}
