import { fabric } from 'fabric';

import * as hammerPng from '../../sub_static/hammer@2x.png';
import { FabricUtil } from '../../../../../../src/util/FabricUtil';
import { Observer } from '../observer/Observer';
import { Subject } from '../observer/Subject';
import { Message, MessageType } from './Message';
import { TweenMax } from 'gsap';
import StoryCanvas from '../StoryCanvas';
import { SCREEN_CONFIG } from "./Const";

/**
 * 初始化锤子对象
 */
export class Hammer extends Observer {

  labelTxt: fabric.Text;
  subject: any;
  canvas: StoryCanvas;
  hitNo: number;

  constructor(subject: Subject) {
    super();
    this.subject = subject;
    this.subject.subscribe(this);
    this.canvas = (window as any).stroyCanvas;
  }

  async initHammerImg() {
    const dsImg = await FabricUtil.loadImage(hammerPng as any,
      { originX: 'center', scaleX: 0.5, scaleY: 0.5, perPixelTargetFind: true, name: 'hammerName' });
    return dsImg;
  }

  initLabel() {

    this.labelTxt = new fabric.Text(' ', {
      originX: 'center',
      fontSize: 44,
      top: 65,
      left: -10,
      fill: '#FFFFFF',
    });
    return this.labelTxt;
  }

  changeQuestion(question: string) {
    this.labelTxt.set('text', question);
  }

  initHitParam(hitNo: number) {

    const targetParam = this.initEventArea(hitNo);
    return targetParam;
  }

  initEventArea(hitNo: number) {
    const col = hitNo % 4 === 0 ? 4 : hitNo % 4;
    const row = col === 4 ? Math.floor(hitNo / 4) - 1 : Math.floor(hitNo / 4);
    const dsWidth = 220;

    const rect = {
      left: col * dsWidth - 15,
      top: 162 * (row ) + 200
    };

    return rect;
  }


  async initHammerGroup(): Promise<fabric.Group> {
    const hammer = await this.initHammerImg();
    const text = this.initLabel();
    //222 *  4 + 100
    const group = new fabric.Group([hammer, text], {
      left: 222 * 4 + (hammer.width / 4) ,
      top: 10,
      selectable: false });
    return group;
  }

  public update() {
    const message = this.subject.getState() as Message;
    //动画开始设置锤子上的题目
    if ( message.type === MessageType.BEGIN ) {
      this.changeQuestion(message.question);

      //总共提数只有15题
      if (this.canvas.hitCount < 15) {
        this.labelTxt.visible = true;
      } else {
        this.labelTxt.visible = false;
      }

    }

    if (message.type === MessageType.HIT) {

      this.canvas.initHammerAnimation(this.initHitParam(message.hitNo));
      this.canvas.recordCorrect(message);
    }

  }

}
