import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import { RightCradConfig } from './RightCradConfig';
import cardImage1 from '../sub_static/img/right/one/cardImage1.png';
import cardImage2 from '../sub_static/img/right/one/cardImage2.png';
import cardImage3 from '../sub_static/img/right/one/cardImage3.png';
import cardImage4 from '../sub_static/img/right/one/cardImage4.png';
import cardImage5 from '../sub_static/img/right/one/cardImage5.png';
import cardImage6 from '../sub_static/img/right/one/cardImage6.png';
import cardImage7 from '../sub_static/img/right/one/cardImage7.png';
import cardImage8 from '../sub_static/img/right/one/cardImage8.png';
import cardImage9 from '../sub_static/img/right/one/cardImage9.png';
import cardImage10 from '../sub_static/img/right/one/cardImage10.png';
import cardImage11 from '../sub_static/img/right/one/cardImage11.png';
import cardImage12 from '../sub_static/img/right/one/cardImage12.png';
import cardImage13 from '../sub_static/img/right/one/cardImage13.png';
import cardImage14 from '../sub_static/img/right/one/cardImage14.png';
import cardImage15 from '../sub_static/img/right/one/cardImage15.png';
import cardImage16 from '../sub_static/img/right/one/cardImage16.png';
import cardImage17 from '../sub_static/img/right/one/cardImage17.png';
import cardImage18 from '../sub_static/img/right/one/cardImage18.png';
import cardImage19 from '../sub_static/img/right/one/cardImage19.png';
import { TweenMax } from 'gsap';
import { CradAnimation } from './CradAnimation';


export class RightCradCanvas {
  myCanvas: fabric.Canvas;
  config: RightCradConfig;
  cradAnimation: CradAnimation;
  card: any = [];

  i = 1;

  cradImageSrc1: any = [];
  cradImageSrc2: any = [];
  cradImageSrc3: any = [];

  // 蒙板
  maskArray: any = [];
  maskGroup: fabric.Group;

  // 卡片中图片上的蒙板
  cardImageMask: fabric.Rect;

  // 最终大图上的蒙板
  bigImageMask: fabric.Rect;

  // 时间  用于跳帧
  time = new Date().getTime();

  // 点击了哪个图片
  cardImageNumber: number;

  // 第一次小图放大19个动画
  anim: any = [];

  // 第二段图片放大到全屏
  anim2: any = [];

  three3dModel: any;

  constructor(three3dModel: any) {
    this.three3dModel = three3dModel;
    (document.getElementById('cardImageCanvas') as any).width = document.getElementById('cardImage').clientWidth;
    (document.getElementById('cardImageCanvas') as any).height = document.getElementById('cardImage').clientHeight;
    this.myCanvas = new fabric.Canvas('cardImageCanvas', {
      backgroundColor: '#ffffff',
    });
    this.myCanvas.selection = false;

    this.config = new RightCradConfig();
    this.cradAnimation = new CradAnimation(this.myCanvas, this.config);

    this.init();

  }

  async init() {
    await this.addImageSrc();
    await this.addCard();
    await this.addMask();
    await this.addCardMask();
    await this.addAnim();
  }


  addImageSrc() {
    this.cradImageSrc1 = [
      cardImage1, cardImage2, cardImage3, cardImage4, cardImage5,
      cardImage6, cardImage7, cardImage8, cardImage9, cardImage10,
      cardImage11, cardImage12, cardImage13, cardImage14, cardImage15,
      cardImage16, cardImage17, cardImage18, cardImage19
    ];
  }

  async addCard() {
    const lang = window.env.browserInfo.lang;
    for (let i = 0; i < lang.cardText.length; i++) {
      this.card[i] = await this.cradAnimation.createCard(this.cradImageSrc1[i], lang.cardText[i].title, lang.cardText[i].content);
    }

    this.card[0]._objects[1].set('clipTo', (ctx: any) => { ctx.rect(-384, -220, 384 * 2, 204 * 2); } );

    for (let i = 0; i < this.card.length; i++) {
      this.card[i]._objects[1].set('left', this.config.smallCradImage[i].left).setCoords();
      this.card[i]._objects[1].set('top', this.config.smallCradImage[i].top).setCoords();
      this.myCanvas.add(this.card[i]);
    }
  }

  // 添加初始页面 每个图片上的小蒙板
  addMask() {
    // 添加蒙板 用于点击
    for (let i = 0; i < this.config.smallCradImage.length; i++) {
      if (i === 0) {
        this.maskArray[i] = new fabric.Rect({
          left: 0,
          top: 0,
          width: 192,
          height: 102,
          fill: 'rgba(255, 255, 255, 0.12)',
          stroke: '#ffffff'
        });
      } else {
        this.maskArray[i] = new fabric.Rect({
          left: 0,
          top: 0,
          width: 96,
          height: 102,
          fill: 'rgba(255, 255, 255, 0.12)',
          stroke: '#ffffff'
        });
      }
    }

    this.maskGroup = new fabric.Group(this.maskArray, this.config.cardConfig);
    for (let i = 0; i < this.maskArray.length; i++) {
      if (i === 0) {
        this.maskArray[i].set('left', this.config.smallCradImage[i].left).setCoords();
        this.maskArray[i].set('top', this.config.smallCradImage[i].top).setCoords();
      } else {
        this.maskArray[i].set('left', this.config.smallCradImage[i].left + this.maskArray[i].get('width') / 2).setCoords();
        this.maskArray[i].set('top', this.config.smallCradImage[i].top).setCoords();
      }
    }
    this.myCanvas.add(this.maskGroup);
  }

  // 添加卡片图片上的蒙板
  addCardMask() {
    this.cardImageMask = new fabric.Rect(this.config.cardImageMask);
    this.myCanvas.add(this.cardImageMask);

    this.bigImageMask = new fabric.Rect(this.config.bigImageMask);
    this.myCanvas.add(this.bigImageMask);
  }


  // 添加动画
  addAnim() {
    const end = {
      x: -384,
      y: -220,
      w: 384 * 2,
      h: 220 * 2,
      scale: 0.5,
      left: -384 / 2,
      top: -510 / 2,
    };

    for (let i = 0; i < this.card.length; i++) {
      if (i === 0) {
        const start = {
          x: -384,
          y: -220,
          w: 384 * 2,
          h: 204 * 2,
          scale: 0.5 * 192 / 384,
          left: this.card[0]._objects[1].get('left'),
          top: this.card[0]._objects[1].get('top'),
        };
        this.anim[0] = this.cradAnimation.createAnim(this.card[0], start, end, this.cardImageMask);
      } else {
        const start2 = {
          x: -384 / 2,
          y: -220,
          w: 384,
          h: 204 * 2,
          scale: 0.5 * 192 / 384,
          left: this.card[i]._objects[1].get('left'),
          top: this.card[i]._objects[1].get('top'),
        };
        this.anim[i] = this.cradAnimation.createAnim(this.card[i], start2, end, this.cardImageMask);
      }

      this.anim2[i] = this.cradAnimation.cardImageScale(this.card[i], this.bigImageMask);

      this.maskArray[i].on('mousedown', () => {
        for (let j = 0; j < this.card.length; j++) {
          if (j !== i) {
            this.card[j].set('visible', false);
          }
        }
        this.maskGroup.set('visible', false);
        this.myCanvas.renderAll();
        this.anim[i].play();
        this.three3dModel.cameraChangeAnim(i).play();

        this.cardImageNumber = i;
      });
    }

    this.cardImageMask.on('mousedown', () => {
      this.cardImageMask.set('visible', false);
      this.anim2[this.cardImageNumber].play();
    });

    this.bigImageMask.on('mousedown', () => {
      this.bigImageMask.set('visible', false);
      this.anim2[this.cardImageNumber].reverse();

      setTimeout(() => {
        (window as any).viewHandler.viewModel.$data.isShow3dContainer = true;
        this.card[this.cardImageNumber]._objects[2].set('visible', true);
        this.card[this.cardImageNumber]._objects[3].set('visible', true);
        this.cardImageMask.set('visible', true);
        this.myCanvas.renderAll();
      }, 1000);
    });
  }

  // 第一段动画返回动画
  reverseAnim() {
    this.cardImageMask.set('visible', false);
    this.anim[this.cardImageNumber].reverse();
    this.three3dModel.reverseCamera().play();

    setTimeout(() => {
      for (let j = 0; j < this.card.length; j++) {
        if (j !== this.cardImageNumber) {
          this.card[j].set('visible', true);
        }
      }
      this.maskGroup.set('visible', true);
      this.myCanvas.renderAll();
    }, 1000);
  }


  reset() {


    // setTimeout(() => {
    //   for (let j = 0; j < this.card.length; j++) {
    //     this.card[j].set('visible', true);
    //   }
    //   this.maskGroup.set('visible', true);
    //   this.myCanvas.renderAll();
    // }, 1000);

    // this.card[0]._objects[1].set('scaleX', 2);
    // this.card[0]._objects[1].set('scaleY', 2);
    // this.myCanvas.renderAll();
  }

}
