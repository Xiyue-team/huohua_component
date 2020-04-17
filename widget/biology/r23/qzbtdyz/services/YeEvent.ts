import * as Konva from 'konva';
import { Linear, TweenMax } from 'gsap';

export class YeEvent {

  animationLayer: any;
  staticLayer: any;
  scaleImageLayer: any;
  stage: any;

  // 判断整体动画是否正在执行 必须放大动画执行完才能回放
  animend = false;

  // 判断放大动画是否执行完
  smallFoliageIsEnd = false;

  constructor(stage: any) {
    this.stage = stage;
    this.staticLayer = stage.children[0];
    this.animationLayer = stage.children[1];
    this.scaleImageLayer = stage.children[2];
  }

  // 小树叶点击事件
  /**、
   * @param {Konva.Image} image 小树叶
   * @param animation   需要反转的动画
   * @param animation2  需要执行的动画 移动图片到初始层的过程
   */
  smallFoliageImageClickEvent(image: Konva.Image, animation: any, animation2: any) {
    image.on('touchstart click', () => {
      if (this.animend) {
        return;
      }

      if (!this.smallFoliageIsEnd) {
        animation.play();
      } else {
        animation.reverse();
        animation2.play();
      }

      this.animend = true;
    });

  }

  // 图片放大动画 树叶背景和标题显示动画 非点击树叶和初始背景标题消失动画
  /**
   * @param {Konva.Image} image 小树叶图片
   * @param bigConfig 小树叶放大后的x y width height
   * @param {Konva.Image} bigImage  树叶背景
   * @param {Konva.Image} titleImage  树叶背景标题
   * @returns {gsap.TweenMax} 返回动画对象
   */
  createAnimation(image: Konva.Image, bigConfig: any, bigImage?: Konva.Image, titleImage?: Konva.Image) {
    const tween = {
      x: image.x(),
      y: image.y(),
      width: image.width(),
      height: image.height(),
      opacity: 0
    };

    const animation = TweenMax.to(tween, 1.5, {
      x: bigConfig.x,
      y: bigConfig.y,
      width:  bigConfig.width,
      height: bigConfig.height,
      opacity: 1,
      onStart: () => {
        bigImage.moveTo(this.scaleImageLayer);
        image.moveTo(this.scaleImageLayer);
        titleImage.moveTo(this.scaleImageLayer);
        bigImage.setAttr('visible', true);
        titleImage.setAttr('visible', true);
        image.shadowOpacity(0);

        this.animationLayer.visible(true);
        this.stage.draw();
      },
      onUpdate: () => {
        image.setAttr('x', tween.x);
        image.setAttr('y', tween.y);
        image.setAttr('width', tween.width);
        image.setAttr('height', tween.height);
        bigImage.setAttr('opacity', tween.opacity);
        titleImage.setAttr('opacity', tween.opacity);
        this.scaleImageLayer.draw();

        this.animationLayer.setAttr('opacity', tween.opacity);
        this.animationLayer.draw();
      },
      onComplete: () => {
        this.animend = false;
        this.smallFoliageIsEnd = true;
      },
      ease:  Linear.easeOut,
      paused: true
    });

    return animation;
  }


  // 树叶背景被点击
  /**
   * @param {Konva.Image} image 树叶背景图片
   * @param animation 需要反转的动画
   * @param animation2  需要执行的动画 移动图片到初始层的过程
   */
  bigFoliageImageClickEvent(image: Konva.Image, animation: any, animation2?: any) {

    image.on('touchstart click', () => {
      if (this.animend) {
        return;
      }

      // 放大动画反转
      animation.reverse();
      // 移动图片回到初始层
      animation2.play();

      this.animend = true;
    });

  }

  /**
   * @param {Konva.Image} image  小树叶图片
   * @param {Konva.Image} bigImage  树叶背景
   * @param {Konva.Image} titleImage  树叶标题
   * @param {any} scaleAnim  树叶放大动画对象
   * @returns {gsap.TweenMax} 返回动画对象
   */
  createAnimation2(image: Konva.Image, bigImage: Konva.Image, titleImage?: Konva.Image, scaleAnim?: any) {
    const tween = {
    };

    const animation = TweenMax.to(tween, 1.5, {
      onComplete: () => {
        // 移动两个图片回到staticLayer
        bigImage.moveTo(this.staticLayer);
        titleImage.moveTo(this.staticLayer);
        bigImage.setAttr('visible', false);
        titleImage.setAttr('visible', false);
        image.shadowOpacity(0.08);
        image.moveTo(this.staticLayer);

        // 隐藏遮挡板
        this.animationLayer.visible(false);

        // 重置动画
        animation.progress(0);
        animation.pause();

        scaleAnim.progress(0);
        scaleAnim.pause();

        this.animend = false;
        this.smallFoliageIsEnd = false;

        this.stage.draw();
      },
      ease:  Linear.easeOut,
      paused: true
    });

    return animation;
  }


}

