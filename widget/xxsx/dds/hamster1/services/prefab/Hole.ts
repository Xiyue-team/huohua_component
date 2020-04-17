import * as holePng from '../../sub_static/hole@2x.png';
import * as maskHolePng from '../../sub_static/maskHole@2x.png';
import * as dsPng from '../../sub_static/ds@2x.png';
import * as incorrectdsPng from '../../sub_static/incorrectDs@2x.png';

import * as redTipPng from '../../sub_static/redTip@2x.png';
import * as numTipPng from '../../sub_static/ansTip@2x.png';
import * as dsSprite from '../../sub_static/dsSprite@2x.png';
import * as point from '../../sub_static/point.png';
import { FabricUtil } from '../../../../../../src/util/FabricUtil';
import { fabric } from 'fabric';
import { TimelineMax, TweenMax } from 'gsap';
import { Observer } from '../observer/Observer';
import { Subject } from '../observer/Subject';
import { Message, MessageType } from './Message';
import { SCREEN_CONFIG } from './Const';
import { createSpriteClass } from '../sprite';


/**
 * 地洞类
 * 包含 （ 地鼠， 答案 ，正常动画，击中特效 ，击中反馈）
 */
export class Hole extends Observer {

  fabricCanvas: fabric.Canvas;
  option: any;
  //地洞所在组
  holeGroup: fabric.Group;
  //地鼠图片本身
  dsFabricObj: fabric.Image;
  incorreDsFabricObj: fabric.Image;
  //文字背景气泡
  ansTipImg: fabric.Image;
  //地鼠显示的文字
  labelTxt: fabric.Text;
  //当前编号
  no: number;
  subject: any;
  //正常时间线的动画
  timelineMax: TimelineMax;
  //打中错误答案的地鼠动画
  incorrectTimeLine: TimelineMax;
  //打中红色提示图片
  redTipImg: fabric.Image;
  pointImg: fabric.Image;
  hitSprite: any;

  constructor(subject: Subject, fabricCanvas: fabric.Canvas, option: any, no: number) {
      super();
      this.subject = subject;
      this.subject.subscribe(this);

      this.fabricCanvas = fabricCanvas;
      this.option = option;
      this.no = no;
      createSpriteClass();
      //this.initStaticHole();
  }

  /* 初始化静态洞层 （第一层） */
  async initStaticHole(): Promise<fabric.Group> {

    this.pointImg = await FabricUtil.loadImage(point as any, { originX: 'center',
        scaleX: 0.5, scaleY: 0.5,
        opacity: 0});
    //静态洞层 （第一层）
    const holeImg = await FabricUtil.loadImage(holePng as any, { scaleX: 0.5, scaleY: 0.5,
      originX: 'center', name: 'holeName' , no: this.no,
      strokeWidth: SCREEN_CONFIG.debug ? 2 : 0,
      stroke: '#880E4F' } as any);
    //第二层 地鼠
    const dsConfig = { name: 'dsName' , no: this.no, originX: 'center' , scaleX: 0.5, scaleY: 0.5, top: 65 ,
      perPixelTargetFind : true, targetFindTolerance: 2 , strokeWidth: SCREEN_CONFIG.debug ? 2 : 0,
      stroke: '#880E4F'};
    this.dsFabricObj = await FabricUtil.loadImage(dsPng as any, dsConfig);

    //打中错误时显示的地鼠
    const incorrDsConfig = { name: 'dsCorrectName' , no: this.no, originX: 'center' , scaleX: 0.5, scaleY: 0.5, top: -20 ,
      perPixelTargetFind : true, targetFindTolerance: 2 , strokeWidth: SCREEN_CONFIG.debug ? 2 : 0,
      stroke: '#880E4F', opacity: SCREEN_CONFIG.debug ? 0.2 : 0};
    this.incorreDsFabricObj = await FabricUtil.loadImage(incorrectdsPng as any, incorrDsConfig);

    //第三层 打中红色提示
    this.redTipImg = await FabricUtil.loadImage(redTipPng as any, { originX: 'center',  left: -60 ,
      scaleX: 0.5, scaleY: 0.5, top: -30 , opacity: 0});

    //第四层 数字答案提示
    this.ansTipImg = await FabricUtil.loadImage(numTipPng as any, { originX: 'center',   scaleX: 0.5, scaleY: 0.5,
      top: -117 , opacity: 0});



    //第五层 生成答案文字
    this.labelTxt = new fabric.Text('58', {
      originX: 'center',
      top: -100,
      left: -3,
      fontSize: 44,
      opacity: 0
    });

    //第六层 地鼠被击中动画层
    const spriteRoationImg = await FabricUtil.loadImage(dsSprite as any, {});

    this.hitSprite = new fabric.Sprite(spriteRoationImg.getElement(), {
      scaleX: 0.5, scaleY: 0.5,
      opacity: 0,
      originX: 'center',
      selectable: false
    });



    //pointImg
    //第六层 静态遮罩层 (最后一层 盖住地鼠)
    const maskHoleImg = await FabricUtil.loadImage(maskHolePng as any,
      {  originX: 'center' , name: 'maskName' , scaleX: 0.5, scaleY: 0.5 });

    this.option.name = 'groupName';
    this.option.no = this.no;
    this.option.originX =  'left';
    this.option.subTargetCheck = true;
    this.option.perPixelTargetFind = true;
    this.option.strokeWidth = 2;
    this.option.stroke = '#880E4F';

    this.holeGroup = new fabric.Group([ this.pointImg, holeImg,
      this.redTipImg, this.ansTipImg,
      this.dsFabricObj, this.incorreDsFabricObj,
      this.labelTxt, this.hitSprite , maskHoleImg
      ], this.option);

      this.holeGroup.on('mousedown', (e: any) => {
      //console.log('地鼠 ' + e.subTargets[1].no, e.subTargets[1]);
      //(e.subTargets[0] as fabric.Image).set('opacity', .5);
      this.fabricCanvas.renderAll();
    });

    this.initAnimationLine();
    this.incorrectTimeLineAnimation();
    this.initSpriteAnimation();
    return this.holeGroup;
  }

  /** 这个动画没有实际意义，为了解决fabric group内 动画不渲染的bug，人为在group制造一个重复动画 **/
  initSpriteAnimation() {
    const config = {opacity: 1};
    const t1 = new TweenMax(config, 1, {
      opacity: 0,
      repeat: -1,
      onUpdate: () => {
        //console.log('地鼠上浮');
        this.pointImg.set('opacity',  config.opacity);
      },
      onComplete: () => {
      }
    });
  }

  /**
   * 由于组内元素无法绑定单机事件，因此增加单独的点击事件区域
   */
  initEventArea() {
    const col = this.no % 4 === 0 ? 4 : this.no % 4;
    const row = col === 4 ? Math.floor(this.no / 4) - 1 : Math.floor(this.no / 4);

    const dsWidth = 220;
    const eventRect = new fabric.Rect({
      no: this.no,
      left: col * dsWidth - 40,
      top: 162 * (row ) + 160,
      width: 180  ,
      height: 122 ,
      fill: '#FFFFFF',
      selectable: false,
      opacity: SCREEN_CONFIG.debug ? 0.5 : 0
    } as any);
    eventRect.on('mousedown', (e) => {
      (window as any).stroyCanvas.hitCount ++;
      if ((window as any).stroyCanvas.hitCount > 15) {
        return;
      }
      console.log((window as any).stroyCanvas.hitCount);
      const message = this.subject.getState() as Message;
      if ( message.type !== MessageType.BEGIN  || !message.eventEnable ) {
        // console.warn('重复点击', message.eventEnable);
        return;
      }

      // console.log('执行: ' + message.type);
      //通知发布类 ，击中地鼠
      this.subject.hit((e.target as any).no);
    });
    this.fabricCanvas.add(eventRect);
  }


  getTweenConfig() {
    const tween = {
      top: this.dsFabricObj.get('top')
    };
    return tween;
  }

  /** 正常时间线动画 **/
  initAnimationLine() {
    //上浮
     const tween = this.getTweenConfig();
     const t1Target = this.dsFabricObj.get('top') - 85;
     const t2Target = this.dsFabricObj.get('top');
     // console.log('t2Target: ' + t1Target);
     const t1 = new TweenMax(tween, 1, {
       top: t1Target,
       delay: 1,
       onUpdate: () => {
         //console.log('地鼠上浮');
         this.dsFabricObj.set('top',  tween.top);

         (this.subject.getState() as Message).eventEnable = this.dsFabricObj.get('top') === t1Target;
         // console.log('update ' +  (this.subject.getState() as Message).eventEnable);
       },
       onComplete: () => {
         (this.subject.getState() as Message).eventEnable  = true;
         // console.log('enable: ' +  (this.subject.getState() as Message).eventEnable  + '--' + this.dsFabricObj.get('top') );
         this.ansTipImg.set('opacity', 1);
         this.labelTxt.set('opacity', 1);
       }

     });

    const t2 = new TweenMax(tween, 1, {
      top: t2Target,
      delay: 3,
      onStart: () => {
        this.ansTipImg.set('opacity', 0);
        this.labelTxt.set('opacity', 0);
      },
      onUpdate: () => {
        //console.log('地鼠下沉' );
        this.dsFabricObj.set('top',  tween.top);
      }
    });

    this.timelineMax = new TimelineMax({paused: true, repeat: false,
      onRepeat: () => {
      },
      onComplete: () => {
        this.timelineMax.progress(0);
        this.timelineMax.pause();
        this.subject.animationEnd(this.no);
      }
    });

    this.timelineMax.add(t1);
    this.timelineMax.add(t2);
  }

  /** 当击中错误时的 动画线 **/
  incorrectTimeLineAnimation() {
    const tween = this.getTweenConfig();
    const t2Target = this.dsFabricObj.get('top');
    let downComplete: () => void = null;
    downComplete = () => {
        if ( this.timelineMax.progress() === 1) {
          this.timelineMax.progress(0.36);
          this.timelineMax.pause();
          this.ansTipImg.set('opacity', 1);
          this.labelTxt.set('opacity', 1);
          this.timelineMax.removeCallback(downComplete);
        }
    };

    //快速下潜
    const tipAni = new TweenMax({ opacity : 0 }, 0.5 , {
      onStart: () => {
        this.redTipImg.set('opacity', 1);
      },
      onComplete: () => {
        this.redTipImg.set('opacity', 0);
        this.timelineMax.timeScale(1);
        // @ts-ignore
        this.timelineMax.addCallback(downComplete);
        this.timelineMax.resume(5);
      }
    });

    this.incorrectTimeLine = new TimelineMax({paused: true, repeat: false,
      onRepeat: () => {
      },
      onComplete: () => {
      }
    });
    this.incorrectTimeLine.add(tipAni);
  }


  /**
   * 接收发布中心 的通知
   * 1.动画开始
   * 2.动画暂停
   * 3.敲击反馈动画
   * 4.一回合结束
   */
  public update() {
    const message = this.subject.getState() as Message;
    const index = message.targetNo.indexOf(this.no);
    //只执行当前正在队列中的地鼠动画
    if (index === -1 ) {
      return;
    }
    if (message.type === MessageType.BEGIN ) {
      this.dsFabricObj.set('opacity', 1);
      //动画开始
      this.labelTxt.set('text', message.answerList[index]);
      //总共提数只有15题
      if ((window as any).stroyCanvas.hitCount < 15) {
        this.timelineMax.play();
      }
    } else if (message.type === MessageType.PAUSE) {
      //动画结束
      this.timelineMax.pause();
    } else if (message.type === MessageType.HIT) {
      //击中时的动画效果

      this.hitAnimation();
    } else if (message.type === MessageType.END) {
      //动画流程结束
      /**
       * 1. 复位正常流程动画；
       * 2. 隐藏被敲晕的地鼠
       * 3. 复位没被敲到的正确地鼠
       * 4. 隐藏提示文字
       */
      this.timelineMax.progress(0);
      this.timelineMax.pause();

      this.incorrectTimeLine.progress(0);
      this.incorrectTimeLine.pause();

      this.incorreDsFabricObj.set('opacity', 0);
      this.hitSprite.set('opacity', 0);

      this.labelTxt.set('opacity', 0);
      this.ansTipImg.set('opacity', 0);
    }
  }

  /**
   * 当触敲击动画时触发的方法
   */
  hitAnimation() {
    const message = this.subject.getState() as Message;
    //如果当前地鼠既不是被打击的，也不是正确的，则没有动画效果
    if ( this.no !== message.hitNo && this.no !== message.correctNo ) {
      return;
    }
    if ( this.no === message.correctNo && this.no === message.hitNo) {
        //如果当前地鼠是正确的地鼠，并且被击中
      this.hitSprite.set('opacity', 1);
      this.dsFabricObj.set('opacity', 0);
      this.hitSprite.play();
      this.subject.complete();
      //MessageType.END
    } else if (this.no !== message.correctNo && this.no === message.hitNo) {
        //如果当前地鼠不是正确的地鼠但是被击中了
      this.incorrectTimeLine.play();
      //这里不在做结束通知，因为在非正确的敲击中，正确答案的地鼠回有动画反馈，由下面的方法做结束通知
      //MessageType.END

    } else if (this.no === message.correctNo && this.no !== message.hitNo) {
        //如果当前地鼠是正确的地鼠，但是没有被击中
      setTimeout(() => {
        this.incorreDsFabricObj.set('opacity', 1);
        this.dsFabricObj.set('opacity', 0);
        this.subject.complete();
        //MessageType.END
      }, 1500);
    }
  }



}


