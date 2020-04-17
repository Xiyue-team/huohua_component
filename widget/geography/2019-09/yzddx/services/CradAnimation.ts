import { TweenMax } from 'gsap';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';
import { RightCradConfig } from './RightCradConfig';
/**
 * 右侧卡片上的动画类
 */


export class CradAnimation {

  myCanvas: fabric.Canvas;
  config: RightCradConfig;

  mask: fabric.Rect;
  bigMask: fabric.Rect;

  constructor(canvas: fabric.Canvas, config: RightCradConfig) {
    this.myCanvas = canvas;
    this.config = config;
  }

  // 创建右侧的说明文字卡片
  async createCard(img: string, title: string, content: string) {
    const whiteRect = new fabric.Rect(this.config.whiteRect);

    // 添加图片背景
    const image = await FabricUtil.loadImage(img as any, this.config.cardImage);

    const scale = 0.5 * 192 / 384;
    image.set('scaleX', scale);
    image.set('scaleY', scale);
    image.set('clipTo', (ctx: any) => {
      ctx.rect(-384 / 2, -220, 384, 204 * 2);
    });

    // 添加标题
    const textTitle = await new fabric.Text(title, this.config.textTitle);

    // 添加文字内容
    const textContent = await new fabric.Text(content, this.config.textContent);

    // 组合成卡片
    const card = await new fabric.Group([whiteRect, image, textTitle, textContent], this.config.cardConfig);
    return card;
  }

  // 第一段图片放大动画
  createAnim(card: any, imageClipTo: any, end: any, mask: fabric.Rect) {
    const tween = {
      x: imageClipTo.x,
      y: imageClipTo.y,
      w: imageClipTo.w,
      h: imageClipTo.h,
      scale: imageClipTo.scale,
      left: imageClipTo.left,
      top: imageClipTo.top,
      opacity: 0,
    };

    const anim = TweenMax.to(tween, 1, {
      x: end.x,
      y: end.y,
      w: end.w,
      h: end.h,
      scale: end.scale,
      left: end.left,
      top: end.top,
      opacity: 1,
      onStart: () => {
        console.log('开始动画');
      },
      onUpdate: () => {

        card._objects[1].set('scaleX', tween.scale);
        card._objects[1].set('scaleY', tween.scale);
        card._objects[1].set('left', tween.left);
        card._objects[1].set('top', tween.top);

        card._objects[2].set('opacity', tween.opacity);
        card._objects[3].set('opacity', tween.opacity);
        card._objects[1].set('clipTo', (ctx: any) => {
          ctx.rect(tween.x, tween.y, tween.w, tween.h);
        });

        // card.render(card._cacheContext);

        this.myCanvas.renderAll();
        // this.myCanvas.renderAll.bind(card);
      },

      onComplete: () => {
        console.log('结束动画');
        mask.set('visible', true);
        this.myCanvas.renderAll();
      },
      paused: true
    });

    return anim;
  }

  // 第二段图片放大动画
  cardImageScale(card: any, bigMask: fabric.Rect) {
    const tween = {
      scale: 1,
      left: card.get('left'),
      top: card.get('top'),
    };

    const anim = TweenMax.to(tween, 1, {
      scale: 2,
      left: window.innerWidth * 0.5 - card.get('width'),
      top: window.innerHeight * 0.5 + card.get('height') - card._objects[1].get('height') * 0.5,
      onStart: () => {
        console.log('开始动画');
        (window as any).viewHandler.viewModel.$data.isShow3dContainer = false;
        card._objects[2].set('visible', false);
        card._objects[3].set('visible', false);

      },
      onUpdate: () => {
        card.set('scaleX', tween.scale);
        card.set('scaleY', tween.scale);

        card.set('left', tween.left);
        card.set('top', tween.top);

        this.myCanvas.renderAll();
      },

      onComplete: () => {
        console.log('结束动画');
        bigMask.set('visible', true);
        this.myCanvas.renderAll();
      },
      paused: true
    });

    return anim;
  }


}














