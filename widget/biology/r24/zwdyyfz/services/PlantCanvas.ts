import {fabric} from 'fabric';

import * as potato from '../sub_static/potato.png';
import * as potatoPlant from '../sub_static/potatoPlant.png';
import * as carrot from '../sub_static/carrot.png';
import * as carrotPlant from '../sub_static/carrotPlant.png';
import * as strawberry from '../sub_static/strawberry.png';
import * as strawberryPlant from '../sub_static/strawberryPlant.png';
import * as redPotato from '../sub_static/redPotato.png';
import * as redPotatoPlant from '../sub_static/redPotatoPlant.png';
import * as onion from '../sub_static/onion.png';
import * as onionPlant from '../sub_static/onionPlant.png';
import * as leaf from '../sub_static/leaf.png';
import * as leafPlant from '../sub_static/leafPlant.png';

import { PlantConfig } from './PlantConfig';
import {TweenMax } from 'gsap';

export default class PlantCanvas {
    config: PlantConfig;
    myCanvas: fabric.Canvas;

    plantImage: any = [];
    plantDetailImage: any = [];

    leftBackground: fabric.Rect;
    rightBackground: fabric.Rect;

    leftTitle: fabric.Text;
    rightTitle1: fabric.Text;
    rightTitle2: fabric.Text;

    zoomAniamation: any;
    isAniamtion: boolean;
    isZoomOut: boolean;
    textElement: any;

    constructor() {
      this.isAniamtion = false;
      this.isZoomOut   = true;

      (document.getElementById('canvas') as any).width = window.innerWidth;
      (document.getElementById('canvas') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('canvas');
      this.myCanvas.hoverCursor = 'default';
      this.myCanvas.selection = false;
      this.config = new PlantConfig();

      //将标题文字按照屏幕尺寸进行放大和缩小
      this.textElement = document.querySelector('.title_text');
      (this.textElement as any).style.fontSize = Math.round(24 * this.config.scale) + 'px';
      (this.textElement as any).style.left = 24 * this.config.scale + 'px';
      (this.textElement as any).style.top = 24 * this.config.scale + 'px';
      (this.textElement as any).style.lineHeight = Math.round(24 * this.config.scale) + 'px';

      this.initPlantBackground();
      this.initDetailImage();
      this.initPlantImage();
    }

    //初始化单个植物的图片
    async initPlantImage() {
      this.plantImage[0] = await this.loadImage(potato as any, this.config.plantImageConfig[0]);
      this.plantImage[1] = await this.loadImage(carrot as any, this.config.plantImageConfig[1]);
      this.plantImage[2] = await this.loadImage(strawberry as any, this.config.plantImageConfig[2]);
      this.plantImage[3] = await this.loadImage(redPotato as any, this.config.plantImageConfig[3]);
      this.plantImage[4] = await this.loadImage(onion as any, this.config.plantImageConfig[4]);
      this.plantImage[5] = await this.loadImage(leaf as any, this.config.plantImageConfig[5]);

      for (let index = 0; index < this.plantImage.length; index++) {
        this.myCanvas.add(this.plantImage[index]);
      }
      this.initEvent();
    }

    //初始化放大后的背景图
    initPlantBackground() {
      this.leftBackground = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#FAF8E8',
        width: window.innerWidth / 2,
        height: window.innerHeight,
        opacity: 0,
        selectable: false
      });

      this.rightBackground = new fabric.Rect({
        left: window.innerWidth / 2 - 1,
        top: 0,
        fill: '#ffffff',
        width: window.innerWidth / 2,
        height: window.innerHeight,
        opacity: 0,
        selectable: false
      });
      this.myCanvas.add(this.leftBackground);
      this.myCanvas.add(this.rightBackground);
    }

    //初始化植物植株图片
    async initDetailImage() {
      this.initText();
      this.plantDetailImage[0] = await this.loadImage(potatoPlant, this.config.rightImageConfig);
      this.plantDetailImage[1] = await this.loadImage(carrotPlant, this.config.rightImageConfig);
      this.plantDetailImage[2] = await this.loadImage(strawberryPlant, this.config.rightImageConfig);
      this.plantDetailImage[3] = await this.loadImage(redPotatoPlant, this.config.rightImageConfig);
      this.plantDetailImage[4] = await this.loadImage(onionPlant, this.config.rightImageConfig);
      this.plantDetailImage[5] = await this.loadImage(leafPlant, this.config.rightFullscreenImag);

      for (let index = 0; index < this.plantDetailImage.length; index++) {
        this.plantDetailImage[index].visible = false;
        this.myCanvas.add(this.plantDetailImage[index]);
      }
      this.checkFullscreenImage();
    }

    checkFullscreenImage() {
      const originWidth = this.config.funllScreenScale * this.plantDetailImage[5].width * 0.5;
      if (originWidth > window.innerWidth / 2) {
        this.plantDetailImage[5].width = this.rightBackground.width / 0.5 / this.config.funllScreenScale;
      }
    }

    //初始化详情文字
    initText() {
      this.leftTitle = new fabric.Text('土豆', this.config.leftText);
      this.rightTitle1 = new fabric.Text(' ' , this.config.rightText1);
      this.rightTitle2 = new fabric.Text(this.config.potatoText , this.config.rightText2);
      this.myCanvas.add(this.leftTitle);
      this.myCanvas.add(this.rightTitle1);
      this.myCanvas.add(this.rightTitle2);
      this.leftTitle.bringToFront();
      this.myCanvas.renderAll();
    }

    initEvent() {
      this.plantImage[0].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[0], this.plantDetailImage[0],
            '土豆', ' ', this.config.potatoText);
        }
      });

      this.plantImage[1].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[1], this.plantDetailImage[1],
            '胡萝卜', this.config.carrotText1, this.config.carrotText2);
        }
      });

      this.plantImage[2].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[2], this.plantDetailImage[2],
            '草莓', this.config.strawberryText1, this.config.strawberryText2);
        }
      });

      this.plantImage[3].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[3], this.plantDetailImage[3],
            '红薯', this.config.redPotatoText1, this.config.redPotatoText2);
        }
      });

      this.plantImage[4].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[4], this.plantDetailImage[4],
            '洋葱', ' ', this.config.onionText);
        }
      });

      this.plantImage[5].on('mousedown', () => {
        if (this.isZoomOut && this.isAniamtion === false) {
          this.isAniamtion = true;
          this.setAnimationPlay(this.plantImage[5], this.plantDetailImage[5],
            '落地生根', this.config.leafText1, this.config.leafText2);
        }
      });

      this.myCanvas.on('mouse:down', () => {
          if (this.isZoomOut === false && this.isAniamtion === false) {
            this.isAniamtion = true;
            this.zoomAniamation.reverse();
          }
      });
    }

    setAnimationPlay(image: any, rightImage: any, text1: string, text2: string, text3: any) {
      (document.querySelector('.title_text') as any).style.display = 'none';
      const tween = {
        image: image,
        rightImage: rightImage,
        left: image.left,
        top: image.top,
        scaleX: image.scaleX,
        scaleY: image.scaleY,
        opacity: 0,
        textOpacity : 1,
      };
      this.leftTitle.text = text1;
      this.rightTitle1.text = text2;
      this.rightTitle2.text = text3;
      this.leftBackground.bringToFront();
      this.rightBackground.bringToFront();
      image.bringToFront();
      rightImage.visible = true;
      rightImage.bringToFront();
      this.leftTitle.bringToFront();
      this.rightTitle1.bringToFront();
      this.rightTitle2.bringToFront();
      this.myCanvas.renderAll();

      this.zoomAniamation = this.creatZoomAnimation(tween);
      this.zoomAniamation.play();
    }

    creatZoomAnimation(tween: any) {
      const zommAniamtion = TweenMax.to(tween, 1, {
        left: this.config.leftImageConfig.left,
        top: this.config.leftImageConfig.top,
        scaleX: this.config.leftImageConfig.scaleX,
        scaleY: this.config.leftImageConfig.scaleY,
        opacity: 1,
        textOpacity : 0,

        onUpdate: () => {
            this.leftBackground.opacity   = tween.opacity;
            this.rightBackground.opacity  = tween.opacity;
            tween.rightImage.opacity      = tween.opacity;
            this.leftTitle.opacity        = tween.opacity;
            this.rightTitle1.opacity      = tween.opacity;
            this.rightTitle2.opacity      = tween.opacity;
            tween.image.left = tween.left;
            tween.image.top = tween.top;
            tween.image.scaleX = tween.scaleX;
            tween.image.scaleY = tween.scaleY;
            this.myCanvas.renderAll();
        },

        onReverseComplete: () => {
          this.isZoomOut = true;
          this.isAniamtion = false;
          (document.querySelector('.title_text') as any).style.display = 'block';
          tween.rightImage.visible = false;
          this.myCanvas.hoverCursor = 'default';
          this.plantImage[0].bringToFront();
          this.plantImage[1].bringToFront();
          this.plantImage[2].bringToFront();
          this.plantImage[3].bringToFront();
          this.plantImage[4].bringToFront();
          this.plantImage[5].bringToFront();
          this.myCanvas.renderAll();
        },

        onComplete: () => {
          this.isZoomOut = false;
          this.isAniamtion = false;
          this.myCanvas.hoverCursor = 'pointer';
        }

      });
      return zommAniamtion;
    }

    loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }

    reset() {
      this.isAniamtion = false;
      this.isZoomOut = true;

      for (let index = 0; index < this.plantImage.length; index++) {
        this.plantImage[index].left = this.config.plantImageConfig[index].left;
        this.plantImage[index].top = this.config.plantImageConfig[index].top;
        this.plantImage[index].scaleX = this.config.plantImageConfig[index].scaleX;
        this.plantImage[index].scaleY = this.config.plantImageConfig[index].scaleY;
        this.plantImage[index].bringToFront();
        this.plantImage[index].setCoords();
        this.plantDetailImage[index].visible = false;
        this.plantDetailImage[index].opacity = 0;
      }
      this.leftBackground.opacity = 0;
      this.rightBackground.opacity = 0;
      this.leftTitle.opacity = 0;
      this.rightTitle1.opacity = 0;
      this.rightTitle2.opacity = 0;
      this.myCanvas.hoverCursor = 'default';
      this.myCanvas.renderAll();
      this.zoomAniamation.progress(0);
      this.zoomAniamation.pause();
      this.zoomAniamation = null;
      this.textElement.style.display = 'block';
    }
}
