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

    // 每个按钮对应的图片
    buttonImage: Array<fabric.Image>;

    // 按钮
    button: Array<fabric.Group>;

    explainText: Array<fabric.Text>;

    background: fabric.Image;

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
        left: -1,
        top: 675 * 0.5,
        width: 1200 * 2,
        height: 675 * 2,
        scaleX: 0.51 * 1920 / 1200,
        scaleY: 0.51 * 1920 / 1200,
        selectable: false,
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
          width: 1200 * 2,
          height: 675 * 2,
          scaleX: 0.5 * 1920 / 1200,
          scaleY: 0.5 * 1920 / 1200,
          selectable: false,
          originY: 'center',
          visible: false
        });
        this.myCanvas.add(this.buttonImage[i]);
      }
    }

    // 添加按钮
    addButton () {
      const lang = window.env.browserInfo.lang;
      this.button = [];
      for (let i = 0; i < lang.buttonText.length; i++) {
        if (window.env.browserInfo.language === 'en') {
          this.button[i] = this.createEnButton(lang.buttonText[i], this.config.button[i]);
          this.myCanvas.add(this.button[i]);
        } else {
          this.button[i] = this.createZhButton(lang.buttonTextPinyin[i], lang.buttonText[i], this.config.button[i]);
          this.myCanvas.add(this.button[i]);
        }
      }
    }

    createEnButton(textString: string, config: any) {
      const text = new fabric.Text(textString, {
        fontSize: 28,
        fill: '#ffffff',
        originY: 'center',
        left: 30,
        top: 30
      });

      const rect = new fabric.Rect({
        width: text.width + 60,
        height: 52,
        strokeWidth: 2,
        stroke: '#ffffff',
        fill: ''
      });

      const button = new fabric.Group([rect, text], Object.assign(config, {
        selectable: false,
      }));

      return button;
    }

    createZhButton(pinyinArray: Array<string>, textString: Array<string>, config: any) {

      const pinyinText = [];
      const zhText = [];
      const text = [];
      let textWidth = 0;

      let textLeft = 0;

      for (let i = 0; i < pinyinArray.length; i++) {
        pinyinText[i] = new fabric.Text(pinyinArray[i], {
          fontSize: 16,
          fill: '#ffffff',
          originX: 'center',
        });

        zhText[i] = new fabric.Text(textString[i], {
          fontSize: 28,
          fill: '#ffffff',
          originX: 'center',
          top: 20
        });

        if (i !== 0) {
          textLeft += text[i - 1].width;
        }

        text[i] = new fabric.Group([pinyinText[i], zhText[i]], {
            selectable: false,
            left: textLeft + 30,
            top: 10,
        });
        textWidth += text[i].width;
      }

      const rect = new fabric.Rect({
        width: textWidth + 60,
        height: 72,
        strokeWidth: 2,
        stroke: '#ffffff',
        fill: ''
      });

      const buttonObj = [];
      buttonObj.push(rect);

      for (let i = 0; i < text.length; i++) {
        buttonObj.push(text[i]);
      }

      const button = new fabric.Group(buttonObj, Object.assign(config, {
        selectable: false,
      }));

      return button;
    }

    addExplainText() {
      const lang = window.env.browserInfo.lang;
      this.explainText = [];
      for (let i = 0; i < lang.explainText.length; i++) {
        this.explainText[i] = new fabric.Text(lang.explainText[i], Object.assign(
          this.config.explainText[i],
          {
            selectable: false,
            fill: '#ffffff',
            fontSize: 18,
            _fontSizeMult: 1.5,
            visible: false
        }));
        this.myCanvas.add(this.explainText[i]);
      }
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
          this.button[i].set('opacity', 1);
        } else {
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

      console.log('语言', window.env.browserInfo.language);

      this.showButtonImage(8);
      this.showExplainText(8);
      for (let i = 0; i < this.button.length; i++) {
        this.button[i].set('opacity', 1);
      }
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.scale = width / height > 16 / 9 ? height / 675 : width / 1200 ;

      this.myCanvas.setWidth(width);
      this.myCanvas.setHeight(height + 2);

      const container = document.querySelector('.canvas-container');
      (container as any).style.top = '50%';
      (container as any).style.left = '50%';
      (container as any).style.transform = 'translate(-50%, -50%)';

      this.background.set('top', height * 0.5 / this.scale);

      for (let i = 0; i < this.buttonImage.length; i++) {
        this.buttonImage[i].set('left', 0);
        this.buttonImage[i].set('top', height * 0.5 / this.scale);

        this.button[i].set('top', this.background.get('top') - this.background.get('height') * 0.5 * 0.5 + this.config.button[i].top );

        this.explainText[i].set('top', this.background.get('top') -
          this.background.get('height') * 0.5 * 0.5 + this.config.explainText[i].top );
      }



      this.myCanvas.setZoom(this.scale);
      this.myCanvas.renderAll();
    }


}

