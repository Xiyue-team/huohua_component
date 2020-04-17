
import {FabricUtil} from './Util';
import { fabric } from 'fabric';
import threeThumbnailImage from '../sub_static/threeThumbnailImage.png';
import { RightCradConfig } from './RightCradConfig';

import plateauCardImage1 from '../sub_static/plateauCardImage/plateauCardImage1.png';
import plateauCardImage2 from '../sub_static/plateauCardImage/plateauCardImage2.png';
import plateauCardImage3 from '../sub_static/plateauCardImage/plateauCardImage3.png';
import plateauCardImage4 from '../sub_static/plateauCardImage/plateauCardImage4.png';
import plateauCardImage5 from '../sub_static/plateauCardImage/plateauCardImage5.png';
import plateauCardImage6 from '../sub_static/plateauCardImage/plateauCardImage6.png';
import plateauCardImage7 from '../sub_static/plateauCardImage/plateauCardImage7.png';

import hillyAreaCradImage1 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage1.png';
import hillyAreaCradImage2 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage2.png';
import hillyAreaCradImage3 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage3.png';
import hillyAreaCradImage4 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage4.png';
import hillyAreaCradImage5 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage5.png';
import hillyAreaCradImage6 from '../sub_static/hillyAreaCardImage/hillyAreaCradImage6.png';

import plainCardImage1 from '../sub_static/plainCardImage/plainCardImage1.png';
import plainCardImage2 from '../sub_static/plainCardImage/plainCardImage2.png';
import plainCardImage3 from '../sub_static/plainCardImage/plainCardImage3.png';
import plainCardImage4 from '../sub_static/plainCardImage/plainCardImage4.png';
import plainCardImage5 from '../sub_static/plainCardImage/plainCardImage5.png';
import plainCardImage6 from '../sub_static/plainCardImage/plainCardImage6.png';

export class RightCradCanvas {
  config: RightCradConfig;
  myCanvas: fabric.Canvas;

  card: Array<fabric.Group> = [];

  // 高原卡片
  plateauCardImage: any = [];
  plateauCardText = window.env.browserInfo.lang.plateauCard;
  plateauCard: Array<fabric.Group>;

  // 山脉卡片
  hillyAreaCradImage: any = [];
  hillyAreaCradText = window.env.browserInfo.lang.hillyAreaCrad;
  hillyAreaCrad: Array<fabric.Group>;

  // 平原卡片
  plainCardImage: any = [];
  plainCardText = window.env.browserInfo.lang.plainCard;
  plainCard: Array<fabric.Group>;

  showPlateauCard = 1;

  constructor() {
    (document.getElementById('cardImageCanvas') as any).width = document.getElementById('cardImage').clientWidth;
    (document.getElementById('cardImageCanvas') as any).height = document.getElementById('cardImage').clientHeight;
    this.myCanvas = new fabric.Canvas('cardImageCanvas', {
      backgroundColor: '#f7f7f7',
    });
    this.myCanvas.selection = false;

    this.config = new RightCradConfig();

    this.init();
  }

  async init() {
    await this.initImageSrc();
    await this.initBackground();
    await this.initPlateauCard();
    await this.initHillyAreaCrad();
    await this.initPlainCard();
  }

  initImageSrc() {
    this.plateauCardImage = [plateauCardImage1, plateauCardImage2, plateauCardImage3,
      plateauCardImage4, plateauCardImage5, plateauCardImage6, plateauCardImage7];

    this.hillyAreaCradImage = [hillyAreaCradImage1, hillyAreaCradImage2,
      hillyAreaCradImage4, hillyAreaCradImage5, hillyAreaCradImage6, hillyAreaCradImage3];

    this.plainCardImage = [plainCardImage1, plainCardImage3,
      plainCardImage4, plainCardImage5, plainCardImage6, plainCardImage2];
  }

  async initBackground() {
    const threeThumbnail = await FabricUtil.loadImage(threeThumbnailImage as any, this.config.threeThumbnail);
    this.myCanvas.add(threeThumbnail);
  }

  // 添加高原卡片
  async initPlateauCard() {

    for (let i = 0; i < 7; i++) {
      this.card[i] = await this.createCard(this.plateauCardImage[i], this.plateauCardText[i].title, this.plateauCardText[i].content);
      this.card[i].set('visible', false);
      this.myCanvas.add(this.card[i]);
    }
  }

  // 添加山脉卡片
  async initHillyAreaCrad() {
    for (let i = 7; i < 13; i++) {
      this.card[i] = await this.createCard(this.hillyAreaCradImage[i - 7],
        this.hillyAreaCradText[i - 7].title, this.hillyAreaCradText[i - 7].content);
      this.card[i].set('visible', false);
      this.myCanvas.add(this.card[i]);
    }
  }

  // 添加平原卡片
  async initPlainCard() {
    for (let i = 13; i < 19; i++) {
      this.card[i] = await this.createCard(this.plainCardImage[i - 13], this.plainCardText[i - 13].title,
        this.plainCardText[i - 13].content);
      this.card[i].set('visible', false);
      this.myCanvas.add(this.card[i]);
    }
  }

  // 创建右侧的说明文字卡片
  async createCard(img: string, title: string, content: string) {

    // 添加图片背景
    const image = await FabricUtil.loadImage(img as any, this.config.cardImage);

    // 添加标题
    const textTitle = new fabric.Text(title, this.config.textTitle);

    // 添加文字内容
    const textContent = new fabric.Text(content, this.config.textContent);

    // 组合成卡片
    const card = new fabric.Group([image, textTitle, textContent], this.config.cardConfig);
    return card;
  }


  reset() {
    this.plainCard[this.showPlateauCard].set('visible', true);
    this.showPlateauCard += 1;
    this.myCanvas.renderAll();
  }

}
