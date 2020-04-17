import { RightCradConfig } from '../sub_static/config/RightCradConfig';
import { RightImageStorage } from '../storage/RightImageStorage';

import scaleImage from '../sub_static/img/button/scaleImage.png';
import narrowImage from '../sub_static/img/button/narrowImage.png';

import * as PIXI from 'pixi.js';
import { MyCard } from './MyCard';
import { Threejs3dModel } from './Threejs3dModel';

export class RightCradCanvas {
  app: PIXI.Application;
  root: PIXI.Container;
  myCard: MyCard;
  config: RightCradConfig;
  three3dModel: Threejs3dModel;
  scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

  // 卡片数组
  card: any = [];

  // 蒙板
  maskArray: any = [];
  maskGroup: PIXI.Container;

  // 卡片中图片上的蒙板
  cardImageMask: PIXI.Graphics;

  // 最终大图上的蒙板
  bigImageMask: PIXI.Graphics;

  // 放大缩小图标
  scaleIcon: PIXI.Sprite;
  narrowIcon: PIXI.Sprite;

  // 第一段动画组
  animArray1: any = [];

  // 第二段动画组
  animArray2: any = [];

  animIndex = 0;

  // 当前页数
  pageIndex = 0;

  // 两个计时器
  timer1: any;
  timer2: any;

  constructor(three3dModel: Threejs3dModel) {
    this.three3dModel = three3dModel;
    this.config = new RightCradConfig();
    this.init();
  }

  async init() {
    await this.initContainer();
    await this.initImage();
    await this.app.stage.addChild(this.root);
  }

  // 初始化容器
  initContainer() {
    let type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }

    if (Number.parseInt(window.env.browserInfo.version) < 60) {
      type = 'canvas';
    }

    PIXI.utils.sayHello(type);

    this.app = new PIXI.Application({
      width: 768,
      height: 510,
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio || 1, // 调整分辨率 不加在某些设备上文字图片会模糊
      autoResize: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    } as any);
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';

    this.app.renderer.autoResize = true;

    this.app.renderer.resize(768 * this.scale, 515 * this.scale);

    document.getElementById('rightCanvas').appendChild(this.app.view);
    this.root = new PIXI.Container();
    this.root.width  =  768;
    this.root.height = 515;

    this.myCard = new MyCard(this.root, this.config);
  }

  // 添加图片到缓存
  initImage() {
    const rightImageStorage = new RightImageStorage();
    const loader1 = new PIXI.Loader();
    loader1.
    add(rightImageStorage.imageSrc1).
    add(rightImageStorage.imageSrc2).
    add(rightImageStorage.imageSrc3).
    add('scaleIcon', scaleImage).
    add('narrowIcon', narrowImage).
    load( (load: PIXI.Loader, res: any) => {
      this.addScaleIcon(res);
      this.addCard(res);
    });
  }

  // 添加卡片
  async addCard(res: PIXI.LoaderResource) {
    const lang = window.env.browserInfo.lang;
    const keyArr = Object.keys(res);
    const val = (res as any)[keyArr[0]];
    const name = val.name.substring(val.name.indexOf('widget'), val.name.indexOf('right'));
    let src = '/static/' + name + 'right';
    if ((process.env.component as any).config.dev) {
      src = '/static/' + name + 'right';
    } else {
      src = './' + name + 'right';
    }

    console.log('src', src);

    let srcTwo = '';
    let srcThree = '';
    for (let i = 0; i < this.config.smallCradImage.length; i++) {
      if (!(res as any)[src + '/three/cardImage' + (1) + '.png']) {
        srcThree = (res as any)[src + '/one/cardImage' + (i + 1) + '.png'].texture;
      } else {
        srcThree = (res as any)[src + '/three/cardImage' + (i + 1) + '.png'].texture;
      }

      if (!(res as any)[src + '/two/cardImage' + (1) + '.png']) {
        srcTwo = (res as any)[src + '/one/cardImage' + (i + 1) + '.png'].texture;
      } else {
        srcTwo = (res as any)[src + '/two/cardImage' + (i + 1) + '.png'].texture;
      }

      this.card[i] = await this.myCard.createCard(
        (res as any)[src + '/one/cardImage' + (i + 1) + '.png'].texture,
        lang.cardText[i].title,
        lang.cardText[i].content,
        srcTwo,
        srcThree
      );
      await this.root.addChild(this.card[i]);
    }

    await this.addCardPosition();
    await this.addCardMask();
    await this.addMask();
    await this.resize();
  }

  // 重新设置小图片的坐标 并添加蒙板切割小图片
  addCardPosition(scale?: number) {
    if (!scale) {
      scale = 1;
    }

    for (let i = 0; i < this.card.length; i++) {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF3300);
      graphics.drawRect(
        this.config.cardConfig.x * scale + this.config.smallCradImage[i].left * scale,
        this.config.cardConfig.y * scale + this.config.smallCradImage[i].top * scale,
        this.config.smallCradImage[i].width * scale,
        this.config.smallCradImage[i].height * scale
      );
      graphics.endFill();
      this.card[i].children[0].mask = graphics;
      this.card[i].children[0].position.x = this.config.smallCradImage[i].left - this.config.smallCradImageOffset[i].left;
      this.card[i].children[0].position.y = this.config.smallCradImage[i].top - this.config.smallCradImageOffset[i].top;
    }
  }

  // 添加小图上的蒙板用于点击执行动画
  addMask() {
    const lang = window.env.browserInfo.lang;

    // 添加蒙板 用于点击
    this.maskGroup = new PIXI.Container();
    for (let i = 0; i < this.card.length; i++) {

      this.maskArray[i] = new PIXI.Graphics();
      this.maskArray[i].interactive = true;
      this.maskArray[i].lineStyle(2, 0xffffff, 1);
      this.maskArray[i].beginFill(0x000000, 0.12);

      this.maskArray[i].drawRoundedRect(
        this.config.cardConfig.x + this.config.smallCradImage[i].left,
        this.config.cardConfig.y + this.config.smallCradImage[i].top,
        this.config.smallCradImage[i].width,
        this.config.smallCradImage[i].height,
        4
      );

      this.maskArray[i].endFill();

      // 创建动画
      this.animArray1[i] = this.myCard.createAnim(this.card, this.maskArray, this.maskGroup, i, this.cardImageMask, this.scaleIcon);
      this.animArray2[i] = this.myCard.createAnim2(this.card, i, this.bigImageMask, this.narrowIcon, 420, 1);

      // 绑定点击事件
      this.maskArray[i].on('pointerdown', (event: any) => {
        // 显示文字
        this.three3dModel.textArray[i].visible = true;
        this.animIndex = i;
        // 执行动画
        this.animArray1[i].play();
        this.three3dModel.cameraChangeAnim(i).play();
      });
      this.maskArray[i].buttonMode = true;
      this.maskGroup.addChild(this.maskArray[i]);

      // 添加文字
      const text = this.createSmallImageText(lang.smallCradText[i], this.config.smallImageText[i], i);
      this.maskGroup.addChild(text);
    }

    this.root.addChild(this.maskGroup);
  }

  // 添加小图片上的文字 由于他只需要在图片最小的时候显示 所以将其放在蒙板上 随着蒙板一起显示隐藏
  createSmallImageText(textString: string, config: any, index: number) {
    // 添加文字内容
    const textStyle = new PIXI.TextStyle(config);
    const text = new PIXI.Text(textString, textStyle);
    text.position.x = 0;
    text.position.y = 0;
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000, 0.12);
    graphics.drawRect(
      0,
      0,
      text.width,
      text.height
    );
    graphics.endFill();

    const textContainer = new PIXI.Container();
    textContainer.width = text.width;
    textContainer.height = text.height;
    textContainer.position.x = this.config.cardConfig.x + this.config.smallCradImage[index].left + config.x;
    textContainer.position.y = this.config.cardConfig.y + this.config.smallCradImage[index].top + config.y;

    textContainer.addChild(graphics);
    textContainer.addChild(text);

    return textContainer;
  }

  //添加卡片图片上的蒙板 用于第二段放大动画
  addCardMask() {
    // 画第二段动画用于点击执行放大动画的蒙板
    this.cardImageMask = new PIXI.Graphics();
    this.cardImageMask.interactive = true;
    this.cardImageMask.beginFill(0x000000, 0.01);
    this.cardImageMask.drawRect(
      this.config.cardConfig.x,
      this.config.cardConfig.y,
      384,
      220);
    this.cardImageMask.endFill();

    // 画第二段动画用于点击执行缩小动画的蒙板
    this.bigImageMask = new PIXI.Graphics();
    this.bigImageMask.interactive = true;
    this.bigImageMask.beginFill(0x000000, 0.01);
    this.bigImageMask.drawRect(
      0,
      0,
      this.config.bigImageMask.width,
      this.config.bigImageMask.height);
    this.bigImageMask.endFill();

    this.cardImageMask.on('pointerdown', (event: any) => {
      this.cardImageMask.renderable = false;
      this.scaleIcon.renderable = false;
      this.cardImageMask.interactive = false;
      this.animArray2[this.animIndex].play();
    });

    this.bigImageMask.on('pointerdown', (event: any) => {
      this.bigImageMask.renderable = false;
      this.narrowIcon.renderable = false;
      this.bigImageMask.interactive = false;
      this.animArray2[this.animIndex].reverse();
      this.timer1 = setTimeout(() => {
        // 显示卡片中的文字
        this.card[this.animIndex].children[3].renderable = true;
        this.card[this.animIndex].children[4].renderable = true;
        // 显示第二段动画放大蒙板显示 可点击
        this.cardImageMask.renderable = true;
        this.scaleIcon.renderable = true;
        this.cardImageMask.interactive = true;
        // 隐藏左侧地图和底部按钮
        // 重置resize
        this.three3dModel.resumeRender();
        if (!(window as any).viewHandler.viewModel.$data.isShow3dContainer) {
          (window as any).viewHandler.viewModel.$data.isShow3dContainerMask = true;
          setTimeout(() => {
            (window as any).viewHandler.viewModel.$data.isShow3dContainerMask = false;
          }, 50);
        }
        (window as any).viewHandler.viewModel.$data.isShow3dContainer = true;
        this.animArray1[this.animIndex].pause(1);
      }, 1100);
    });

    this.cardImageMask.buttonMode = true;
    this.bigImageMask.buttonMode = true;

    // 隐藏
    this.cardImageMask.renderable = false;
    this.bigImageMask.renderable = false;
    // 设置不可点击 防止误触
    this.bigImageMask.interactive = false;
    this.cardImageMask.interactive = false;

    this.root.addChild(this.scaleIcon);
    this.root.addChild(this.narrowIcon);

    this.root.addChild(this.cardImageMask);
    this.root.addChild(this.bigImageMask);
  }

  // 添加放大缩小小图标
  async addScaleIcon(res: PIXI.LoaderResource) {
    this.scaleIcon = await this.myCard.loadImage((res as any)['scaleIcon'].texture, {width: 24, height: 24});
    this.scaleIcon.renderable = false;

    this.narrowIcon = await this.myCard.loadImage((res as any)['narrowIcon'].texture, {width: 24, height: 24});
    this.narrowIcon.renderable = false;

    this.scaleIcon.position.x = this.config.cardConfig.x + 344.5;
    this.scaleIcon.position.y = this.config.cardConfig.y + 179.5;

    this.narrowIcon.position.x = this.config.bigImageMask.x + this.config.bigImageMask.width - 48;
    this.narrowIcon.position.y = this.config.bigImageMask.y + this.config.bigImageMask.height - 48;
  }

  // 第一段动画返回动画
  reverseAnim() {
    // 设置第二段动画点击蒙板不显示不可点击
    this.cardImageMask.renderable = false;
    this.scaleIcon.renderable = false;
    this.cardImageMask.interactive = false;

    // 先切换到第一张图片再返回
    this.pageIndex = 0;
    (window as any).viewHandler.viewModel.$data.isButtonGrayPreviousPage = true;
    (window as any).viewHandler.viewModel.$data.isButtonGrayNextPage = false;
    (window as any).viewHandler.viewModel.$data.isButtonGrayThreeControl = true;
    this.card[this.animIndex].children[0].renderable = true;
    this.card[this.animIndex].children[1].renderable = false;
    this.card[this.animIndex].children[2].renderable = false;

    // 右侧返回动画
    this.animArray1[this.animIndex].reverse();

    // 左侧返回动画
    this.three3dModel.reverseCamera().play();

    this.timer2 = setTimeout(() => {
      // 显示所有第一段动画小蒙板显示可点击
      for (let i = 0; i < this.card.length; i++) {
        this.card[i].renderable = true;
        this.maskArray[i].interactive = true;
      }
      // 显示小蒙板组
      this.maskGroup.renderable = true;

      (window as any).viewHandler.viewModel.$data.isShowLeftText = true;
      (window as any).viewHandler.viewModel.$data.isButtonGrayThreeControl = false;
    }, 1100);
  }

  // 上一页
  previousPage() {
    if (this.pageIndex > 0) {
      this.card[this.animIndex].children[this.pageIndex].renderable = false;
      this.card[this.animIndex].children[this.pageIndex - 1].renderable = true;
      this.pageIndex -= 1;
    }

    (window as any).viewHandler.viewModel.$data.isButtonGrayNextPage = false;

    if (this.pageIndex === 0) {
      (window as any).viewHandler.viewModel.$data.isButtonGrayPreviousPage = true;
    }

  }

  // 下一页
  nextPage() {
    if (this.pageIndex + 1 < this.card[this.animIndex].children.length - 2) {
      this.card[this.animIndex].children[this.pageIndex].renderable = false;
      this.card[this.animIndex].children[this.pageIndex + 1].renderable = true;
      this.pageIndex += 1;
    }

    (window as any).viewHandler.viewModel.$data.isButtonGrayPreviousPage = false;

    if (this.pageIndex === this.card[this.animIndex].children.length - 3) {
      (window as any).viewHandler.viewModel.$data.isButtonGrayNextPage = true;
    }

  }

  reset() {
    this.animArray2[this.animIndex].progress(0);
    this.animArray2[this.animIndex].pause();
    clearTimeout(this.timer2);

    this.animArray1[this.animIndex].progress(0);
    this.animArray1[this.animIndex].pause();
    clearTimeout(this.timer1);

    // 显示所有第一段动画小蒙板显示可点击
    for (let i = 0; i < this.card.length; i++) {
      this.card[i].renderable = true;
      this.maskArray[i].interactive = true;
    }

    // 显示小蒙板组
    this.maskGroup.renderable = true;

    // 隐藏放大全屏蒙板
    this.cardImageMask.renderable = false;
    this.cardImageMask.interactive = false;
    this.scaleIcon.renderable = false;

    // 隐藏缩小蒙板
    this.bigImageMask.renderable = false;
    this.bigImageMask.interactive = false;
    this.narrowIcon.renderable = false;

    // 显示第一个图
    this.pageIndex = 0;
    this.card[this.animIndex].children[0].renderable = true;
    this.card[this.animIndex].children[1].renderable = false;
    this.card[this.animIndex].children[2].renderable = false;
  }

  resize() {
    const width = window.innerWidth;
    let scale1 = 1;
    let controlHeight = 72;
    let increment = 80;
    let rightWidth = 420;
    if (width >= 1100) {
      scale1 = 1;
      increment = 80;
      controlHeight = 72;
      rightWidth = 420;
    } else if (width <= 800) {
      scale1 = 0.5;
      controlHeight = 36;
      increment = 140;
      rightWidth = 210;
    } else {
      scale1 = 0.7;
      controlHeight = 50;
      increment = 80;
      rightWidth = 294;
    }

    const scale2 = window.innerHeight > (510 * scale1 + controlHeight + 80)
      ? 1 : window.innerHeight / (510 * scale1 + controlHeight + increment);

    const scale = scale1 * scale2;
    this.scale = scale;

    this.app.renderer.resize(768 * scale, 510 * scale);
    this.root.scale.x = scale;
    this.root.scale.y = scale;

    const container = document.querySelector('#rightCanvas').children[0];
    // 调整 canvas的位置
    if (this.bigImageMask.renderable) {
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';
    } else {
      (container as any).style.top = '50%';
      (container as any).style.left = '100%';
      (container as any).style.transform = 'translate(' + -(768 * scale + (rightWidth - 384 * scale) * 0.5) + 'px, -50%)';
    }

    for (let i = 0; i < this.card.length; i++) {
      // 重写动画
      this.animArray1[i] = this.myCard.createAnim(this.card, this.maskArray, this.maskGroup, i,
        this.cardImageMask, this.scaleIcon, scale);
      this.animArray2[i] = this.myCard.createAnim2(this.card, i, this.bigImageMask, this.narrowIcon, rightWidth, scale);

      // 重写蒙板
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF3300);
      graphics.drawRect(
        this.card[i].position.x * scale + this.config.smallCradImage[i].left * scale,
        this.card[i].position.y / scale + this.config.smallCradImage[i].top * scale,
        this.config.smallCradImage[i].width * scale,
        this.config.smallCradImage[i].height * scale
      );
      graphics.endFill();
      this.card[i].children[0].mask = graphics;
      if (this.cardImageMask.renderable || this.bigImageMask.renderable) {
        this.card[this.animIndex].children[0].mask = '';
      }
    }

    // 调整动画是否需要跳到结束
    if (this.cardImageMask.renderable) {
      this.animArray1[this.animIndex].pause(1);
    }

    if (this.bigImageMask.renderable) {
      this.animArray2[this.animIndex].pause(1);
    }
  }
}
