import {MyConfig} from './MyConfig';
import { fabric } from 'fabric';
import { FabricUtil } from './Util';

import backgroundImage from '../sub_static/img/backgroundImage.png';

import image1 from '../sub_static/img/image1.png';
import image2 from '../sub_static/img/image2.png';
import image3 from '../sub_static/img/image3.png';
import image4 from '../sub_static/img/image4.png';
import image5 from '../sub_static/img/image5.png';
import image6 from '../sub_static/img/image6.png';
import image7 from '../sub_static/img/image7.png';

export class MyCanvas {
    config: MyConfig;
    myCanvas: fabric.Canvas;

    // 缩放系数
    scale = window.innerWidth / window.innerHeight > 16 / 9 ? window.innerHeight / 675 : window.innerWidth / 1200;

    background: fabric.Image;

    // 每个按钮对应的图片
    buttonImage: Array<fabric.Image>;

    // 按钮
    button: Array<fabric.Group>;

    explainText: Array<fabric.Group>;

    constructor() {
      this.config = new MyConfig();
      this.init();
    }

    async init() {
      await this.initCanvas();
      await this.addBackgroundImage();
      await this.addButtonImage();
      await this.addExplainText();
      await this.addButton();
      await this.buttonClickEvent();
      this.resize();
    }

    // 初始化画布
    initCanvas () {
      (document.getElementById('cardImageCanvas1') as any).width = window.innerWidth;
      (document.getElementById('cardImageCanvas1') as any).height = window.innerHeight;
      this.myCanvas = new fabric.Canvas('cardImageCanvas1', {
        backgroundColor: '#5FB4B1',
      });

      this.myCanvas.selection = false;
    }

    // 添加背景图
    async addBackgroundImage() {
      this.background = await FabricUtil.loadImage(backgroundImage, {
        left: 1200 * 0.5,
        top: 675 * 0.5,
        width: 1572 * 2,
        height: 884 * 2,
        scaleX: 0.55,
        scaleY: 0.55,
        selectable: false,
        hoverCursor: 'default',
        originX: 'center',
        originY: 'center'
      });

      this.myCanvas.add(this.background);
    }

    // 添加每个按钮对应的图片
    async addButtonImage() {
      const src = [image1, image2, image3, image4, image5, image6, image7];

      this.buttonImage = [];
      for (let i = 0; i < src.length; i++) {
        this.buttonImage[i] = await FabricUtil.loadImage(src[i], {
          left: 1200 * 0.5,
          top: 675 * 0.5,
          width: 1572 * 2,
          height: 884 * 2,
          scaleX: 0.55,
          scaleY: 0.55,
          selectable: false,
          visible: false,
          hoverCursor: 'default',
          originX: 'center',
          originY: 'center'
        });
        this.myCanvas.add(this.buttonImage[i]);
      }
    }

    // 添加按钮
    addButton () {
      const lang = window.env.browserInfo.lang;
      this.button = [];
      for (let i = 0; i < lang.buttonText.length; i++) {
        this.button[i] = this.createButton(lang.buttonText[i], this.config.button[i]);
        this.myCanvas.add(this.button[i]);
      }
    }

    createButton(textString: string, config: any) {
      const text = new fabric.Text(textString, {
        fontSize: 18,
        fill: '#000000',
        originY: 'center',
        left: 24,
        top: 40 * 0.5 + 2
      });

      const rect = new fabric.Rect({
        width: text.width + 48,
        height: 40,
        strokeWidth: 2,
        stroke: '#ffffff',
        fill: '#ffffff',
        rx: 21,
        ry: 21
      });

      const button = new fabric.Group([rect, text], Object.assign(config, {
        selectable: false,
        hoverCursor: 'pointer',
      }));

      return button;
    }

    addExplainText() {
      const lang = window.env.browserInfo.lang;
      this.explainText = [];
      for (let i = 0; i < lang.explainText.length; i++) {
        this.explainText[i] = this.createExplainText(lang.buttonText[i], lang.explainText[i], this.config.explainText[i]);
        this.myCanvas.add(this.explainText[i]);
      }
    }

    createExplainText(titleText: string, contentText: string, config: any) {
      const title = new fabric.Text(titleText, {
        left: 21,
        top: 25,
        selectable: false,
        fill: '#000000',
        fontSize: 22,
      } as any);

      const explainText = new fabric.Text(contentText, {
        left: 21,
        top: 57,
        selectable: false,
        fill: '#0000000',
        fontSize: 18,
        _fontSizeMult: 1.5,
      } as any);

      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: explainText.width + 42,
        height: title.height + explainText.height + 50 + 10,
        strokeWidth: 1,
        stroke: 'rgba(94,92,92,0.75)',
        fill: 'rgba(255,255,255,0.96)',
        rx: 6,
        ry: 6
      });

      const explainTextRect = new fabric.Group([rect, title, explainText], Object.assign(config, {
        selectable: false,
        visible: false,
        hoverCursor: 'default',
      }));

      return explainTextRect;
    }

    // 给每个按钮绑定点击事件
    buttonClickEvent() {
      for (let i = 0; i < this.button.length; i++) {
        this.button[i].on('mousedown', () => {

          // 显示对应的高亮图 及 对应的说明文字
          this.showButtonImage(i);
          this.showExplainText(i);
          this.showButton(i);
          this.myCanvas.discardActiveObject();
          this.myCanvas.renderAll();
        });
      }
    }

    // 高亮点击的按钮
    showButton (index: number) {
      for (let i = 0; i < this.button.length; i++) {
        if (i === index) {
          this.button[i].set('visible', false);
          this.button[i].set('opacity', 1);
        } else {
          this.button[i].set('visible', true);
          this.button[i].set('opacity', 0.5);
        }
      }
    }

    // 显示高亮图片
    showButtonImage(index: number) {
      for (let i = 0; i < this.buttonImage.length; i++) {
        if (i === index) {
          this.buttonImage[i].set('visible', true);
        } else {
          this.buttonImage[i].set('visible', false);
        }
      }
    }

    // 显示解释说明文字
    showExplainText(index: number) {
      for (let i = 0; i < this.explainText.length; i++) {
        if (i === index) {
          this.explainText[i].set('visible', true);
        } else {
          this.explainText[i].set('visible', false);
        }
      }
    }


    // 重置
    reset() {
      this.showButtonImage(8);
      this.showExplainText(8);
      for (let i = 0; i < this.button.length; i++) {
        this.button[i].set('opacity', 1);
        this.button[i].set('visible', true);
      }
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200 ;

      this.myCanvas.setWidth(width + 2);
      this.myCanvas.setHeight(height + 2);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50.1%)';


      this.background.set('left', width * 0.5 / this.scale);
      this.background.set('top', height * 0.5 / this.scale);

      for (let i = 0; i < this.buttonImage.length; i++) {
        this.buttonImage[i].set('left', width * 0.5 / this.scale);
        this.buttonImage[i].set('top', height * 0.5 / this.scale);

        this.button[i].set('left', this.background.get('left') - this.background.get('width') * 0.5 * 0.5 + this.config.button[i].left);
        this.button[i].set('top', this.background.get('top') - this.background.get('height') * 0.5 * 0.5 + this.config.button[i].top );

        this.explainText[i].set('left', this.background.get('left') -
          this.background.get('width') * 0.5 * 0.5 + this.config.explainText[i].left);
        this.explainText[i].set('top', this.background.get('top') -
          this.background.get('height') * 0.5 * 0.5 + this.config.explainText[i].top );
      }

      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }


}

