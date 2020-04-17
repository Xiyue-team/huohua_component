import { Linear, TweenMax } from 'gsap';

import * as PIXI from 'pixi.js';
import { RightCradConfig } from '../sub_static/config/RightCradConfig';

/**
 * 右侧卡片上的动画类
 */

export class MyCard {

  myCanvas: PIXI.Container;
  config: RightCradConfig;

  // canvas容器
  container = document.querySelector('#rightCanvas').children[0];
  cardImageScale = 0.5 * 192 / 384;

  constructor(canvas: PIXI.Container, config: RightCradConfig) {
    this.myCanvas = canvas;
    this.config = config;
    if (navigator.userAgent.search('MI 5X') !== -1 && window.env.browserInfo.isHuohuaApp) {
      this.config.textContent.fontSize = 21.5;
    }
  }

  // 加载图片
  loadImage(img: any, config: any) {
    const image = new PIXI.Sprite(img);
    image.width = config.width;
    image.height = config.height;

    return image;
  }

  // 创建右侧的说明文字卡片
  createCard(img: any, title: string, content: string, img2?: any, img3?: any) {
    const image = new PIXI.Sprite(img);
    image.width = this.config.cardImage.width;
    image.height = this.config.cardImage.height;

    image.scale.x = this.cardImageScale;
    image.scale.y = this.cardImageScale;

    //添加标题
    const textTitleStyle = new PIXI.TextStyle(this.config.textTitle);
    const textTitle = new PIXI.Text(title, textTitleStyle);
    textTitle.position.x = 0;
    textTitle.position.y = 244;

    // 添加文字内容
    const textContentStyle = new PIXI.TextStyle(this.config.textContent);
    const textContent = new PIXI.Text(content, textContentStyle);
    textContent.position.x = 0;
    textContent.position.y = 285;

    textTitle.alpha = 0;
    textContent.alpha = 0;

    const image2 = new PIXI.Sprite(img2);
    image2.width = this.config.cardImage.width;
    image2.height = this.config.cardImage.height;
    image2.renderable = false;

    const image3 = new PIXI.Sprite(img3);
    image3.width = this.config.cardImage.width;
    image3.height = this.config.cardImage.height;
    image3.renderable = false;

    const card = new PIXI.Container();
    card.width = this.config.cardConfig.width;
    card.height = this.config.cardConfig.height;
    card.position.x = this.config.cardConfig.x;
    card.position.y = this.config.cardConfig.y;

    card.addChild(image);
    card.addChild(image2);
    card.addChild(image3);
    card.addChild(textTitle);
    card.addChild(textContent);

    // card.renderable = false;
    return card;
  }

  // 卡片第一次放大动画
  createAnim(card: any, maskArray: any, maskGroup: PIXI.Container, index: number, smallMask: PIXI.Graphics,
             scaleIcon: PIXI.Sprite, scale?: number) {
    const tween = {
      x: this.config.cardConfig.x * scale + this.config.smallCradImage[index].left * scale,
      y: card[index].position.y / scale + this.config.smallCradImage[index].top * scale,
      w: this.config.smallCradImage[index].width * scale,
      h: this.config.smallCradImage[index].height * scale,
      scale: this.cardImageScale,
      left: this.config.smallCradImage[index].left - this.config.smallCradImageOffset[index].left,
      top: this.config.smallCradImage[index].top - this.config.smallCradImageOffset[index].top,
      opacity: 0,
    };
    const anim = TweenMax.to(tween, 1, {
      x: this.config.cardConfig.x * scale,
      y: card[index].position.y,
      w: 384 * scale,
      h: 220 * scale,
      scale: 0.5,
      left: 0,
      top: 0,
      opacity: 1,
      onStart: () => {
        for (let i = 0; i < card.length; i++) {
          if (i !== index) {
            card[i].renderable = false;
          }
          maskArray[i].interactive = false;
        }
        card[index].renderable = true;
        maskGroup.renderable = false;
        card[index].children[3].renderable = true;
        card[index].children[4].renderable = true;
        (window as any).viewHandler.viewModel.$data.isShowLeftText = false;
        (window as any).viewHandler.viewModel.$data.isButtonGrayThreeControl = true;
      },
      onUpdate: () => {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 0.5);
        graphics.drawRect(
          tween.x,
          tween.y,
          tween.w,
          tween.h
        );
        graphics.endFill();

        card[index].children[0].scale.x = tween.scale;
        card[index].children[0].scale.y = tween.scale;
        card[index].children[0].position.x = tween.left;
        card[index].children[0].position.y = tween.top;
        card[index].children[3].alpha = tween.opacity;
        card[index].children[4].alpha = tween.opacity;
        card[index].children[0].mask = graphics;
      },

      onComplete: () => {
        smallMask.renderable = true;
        smallMask.interactive = true;
        scaleIcon.renderable = true;
        (window as any).viewHandler.viewModel.$data.isButtonGrayThreeControl = false;
      },
      paused: true,
      ease: Linear.easeNone
    });
    return anim;
  }

  // 第二段放大动画
  createAnim2(card: any, index: number, bigMask: PIXI.Graphics, narrowIcon: PIXI.Sprite, rightWidth: number, scale: number) {
    const tween = {
      scale: 1,
      x: this.config.cardConfig.x,
      y: this.config.cardConfig.y,
      left: 100,
      translateLeft: -(768 * scale + (rightWidth - 384 * scale) * 0.5),
    };

    const anim = TweenMax.to(tween, 1, {
      scale: 2,
      x: this.config.bigImageMask.x,
      y: this.config.bigImageMask.y,
      left: 50,
      translateLeft: -768 * scale * 0.5,
      onStart: () => {

        (window as any).viewHandler.viewModel.$data.isShow3dContainer = false;
        card[index].children[0].mask = null;
        card[index].renderable = true;
        card[index].children[3].renderable = false;
        card[index].children[4].renderable = false;
      },
      onUpdate: () => {
        card[index].position.x = tween.x;
        card[index].position.y = tween.y;
        card[index].scale.x = tween.scale;
        card[index].scale.y = tween.scale;

        (this.container as any).style.left = tween.left + '%';
        (this.container as any).style.transform = 'translate(' + tween.translateLeft + 'px, -50%)';
      },

      onComplete: () => {
        bigMask.renderable = true;
        narrowIcon.renderable = true;
        bigMask.interactive = true;
      },
      paused: true,
      // ease: Linear.easeNone
    });

    return anim;
  }
}














