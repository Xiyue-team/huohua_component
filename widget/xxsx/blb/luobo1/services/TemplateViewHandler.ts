import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';


import * as PIXI from 'pixi.js';
import { Luobo } from './Luobo';
import { Subject } from './observer/Subject';
import Const from "./Cont";


const VConsole = require('VConsole');
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {



    app: PIXI.Application;
    root: PIXI.Container;
    subject: Subject;


    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.initContainer();

    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
    }


    initContainer() {
      let type = 'WebGL';
      if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas';
      }
      this.subject = new Subject();
      PIXI.utils.sayHello(type);


      this.app = new PIXI.Application({width: 1200, height: 675});
      this.app.renderer.view.style.position = 'absolute';
      this.app.renderer.view.style.display = 'block';
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      console.log('autoDensity ' + this.app.renderer.autoDensity);
      //Add the canvas that Pixi automatically created for you to the HTML document
      document.getElementById('3dContainer').appendChild(this.app .view);

      this.root = new PIXI.Container();
      this.root.width  =  1200;
      this.root.height = 675;
      const loader = new PIXI.Loader();
      loader.add('ansBg', require('../sub_static/ansBg@2x.png')).
      add('cry', require('../sub_static/cryRabbit@2x.png')).
      add('big', require('../sub_static/daluobo@2x.png')).
      add('happy', require('../sub_static/happyRabbit@2x.png')).
      add('quesBg', require('../sub_static/quesBg@2x.png')).
      add('stand', require('../sub_static/standRabbit@2x.png')).
      add('textTipBg', require('../sub_static/textTipBg@2x.png')).
      add('small', require('../sub_static/xiaoluobo@2x.png')).
      add('soil', require('../sub_static/soil@2x.png')).
      add('backGrass', require('../sub_static/backGrass@2x.png')).
      add('frontGrass', require('../sub_static/frontGrass@2x.png')).
      add('midGrass', require('../sub_static/midGrass@2x.png')).
      add('fence', require('../sub_static/fence@2x.png')).
      add('xiaoluobo', require('../sub_static/xiaoluobo@2x.png')).
      add('daluobo', require('../sub_static/daluobo@2x.png')).
      load( (load: PIXI.Loader, res: PIXI.LoaderResource) => {
          this.loadComplete(res);
          ViewController.getInstance().hideLoading();
      });



    }

    loadComplete(res: PIXI.LoaderResource) {

      const rootScreen = {
        width: 1200,
        height: 675
      };
      const realScreen = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      const scale = Math.min((realScreen.width / rootScreen.width) , (realScreen.height / rootScreen.height));

      /********* 加载静态资源 ***********/

      //背景色
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xDE3249);
      graphics.drawRect(0, 0, 1200, 675);
      graphics.endFill();

      const bg1 = new PIXI.Graphics();
      bg1.beginFill(0x326354);
      bg1.drawRect(0, 0, 1200, 80);
      bg1.endFill();

      const bg2 = new PIXI.Graphics();
      bg2.beginFill(0xC8D27A);
      bg2.drawRect(0, 0, 1200, 250);
      bg2.endFill();
      bg2.position.y = 230;

      //背后灌木丛
      const backSprite = new PIXI.TilingSprite((res as any).backGrass.texture, rootScreen.width);
      backSprite.position.y = 0;

      const midSprite = new PIXI.TilingSprite((res as any).midGrass.texture, rootScreen.width);
      midSprite.position.y = 50;

      const frontSprite = new PIXI.TilingSprite((res as any).frontGrass.texture, rootScreen.width, 258);
      frontSprite.position.y = 50 + 63;

      const fenceSprite = new PIXI.TilingSprite((res as any).fence.texture, rootScreen.width);
      fenceSprite.position.y = 50 + 63 + 25;

      //站立兔子
      const standRabbit = new PIXI.Sprite((res as any).stand.texture);
      standRabbit.position.x = 1000;
      standRabbit.position.y = 140;

      //问题背景
      const quesBg = new PIXI.Sprite((res as any).quesBg.texture);
      quesBg.position.x = 800;
      quesBg.position.y = 0;

      //问题文字
      const style = new PIXI.TextStyle({
        fontSize: 44,
        fontWeight: 'bold',
        fill: ['#7B4B21'], // gradient
      });
      const quesText = new PIXI.Text('0.4x6=?', style);
      quesText.position.x = 900;
      quesText.position.y = 170;

      const tipStyle = style.clone();
      tipStyle.fontSize = 26;
      const tipText = new PIXI.Text('秘诀', tipStyle);
      tipText.position.x = 900;
      tipText.position.y = 135;

      //土地
      const soil = new PIXI.Sprite((res as any).soil.texture);
      soil.position.x = 0 ;
      soil.position.y =  rootScreen.height - soil.height;

      const frontSoil = new PIXI.Sprite((res as any).soil.texture);
      frontSoil.position.x = 0 ;
      frontSoil.position.y =  rootScreen.height - soil.height;
      //soil.position.y =


      /*** 第一场景  ****/
      //封面提示背景
      const coverBg = new PIXI.Sprite((res as any).textTipBg.texture);
      coverBg.position.x = 220;
      coverBg.position.y = 40;
      const maskBg = new PIXI.Graphics();
      maskBg.beginFill(0x000000);
      maskBg.drawRect(0, 0, window.innerWidth, window.innerHeight);
      maskBg.endFill();
      maskBg.alpha = 0.66;
      //提示文字
      const tipTextStyle = new PIXI.TextStyle({
        fontSize: 39,
        fontWeight: 'bold',
        fill: ['#5F3A1A'], // gradient
        lineHeight: 55
      });
      const storyText = new PIXI.Text(Const.STORYTEXT, tipTextStyle);
      //storyText.width = 538;
      storyText.position.x = 330;
      storyText.position.y = 190;

      this.root.addChild(graphics);
      this.root.addChild(bg1);
      this.root.addChild(backSprite);
      this.root.addChild(midSprite);
      this.root.addChild(frontSprite);
      this.root.addChild(fenceSprite);
      this.root.addChild(bg2);


      this.root.addChild(quesBg);
      this.root.addChild(standRabbit);
      this.root.addChild(quesText);
      this.root.addChild(tipText);



      this.root.addChild(soil);
      //this.createLuobo(res);
      for ( let i = 0 ; i < 4 ; i ++) {
        //116 280
        const x = 116 + i * ( 116 + 90 );
        const y = 280;
        const lb = new Luobo( this.subject , res, this.root, x, y, i + 1);
      }


      //soil.alpha = 0.8;
      this.root.addChild(frontSoil);

      frontSoil.alpha = 0.4;

      this.root.addChild(maskBg);
      this.root.addChild(coverBg);
      this.root.addChild(storyText);
      /******** 设置缩放适配不同屏幕 ********/
      this.root.width = rootScreen.width;
      this.root.height = rootScreen.height;

      this.root.scale.x = scale;
      this.root.scale.y = scale;
      this.root.position.x = (realScreen.width - rootScreen.width  * scale) / 2 ;
      this.root.position.y = (realScreen.height  - rootScreen.height * scale  ) / 2 ;

      console.log('root_position', this.root.position);
      console.log('realScreen', realScreen);
      console.log('root_height', this.root.width + 'x' + this.root.height);
      console.log('graphics', graphics.width + 'x' + graphics.height);
      console.log(realScreen.height - this.root.height * scale);

      this.app.stage.addChild(this.root);



      setTimeout(() => {
        maskBg.visible = false;
        storyText.visible = false;
        coverBg.visible = false;
        this.subject.start();
      } , 3000);

    }

}
