import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DytxydcViewHandler} from './services/DytxydcViewHandler';
import {CommonUtil} from '../../../../src/util/CommonUtil';

import * as beaker from './sub_static/shaobei.png';
import * as cu from './sub_static/cu.png';
import * as zn from './sub_static/zn.png';
import * as wireway from './sub_static/wireway.png';
import * as bulb from './sub_static/bulb.png';
import * as water from './sub_static/water.png';
import * as addcu from './sub_static/addcu.png';
import * as addzn from './sub_static/addzn.png';
import * as addwireway from './sub_static/addWireway.png';
import * as deleteCu from './sub_static/deleteCu.png';
import * as deleteZn from './sub_static/deleteZn.png';
import * as button1 from './sub_static/equation1.png';
import * as button2 from './sub_static/equation2.png';
import * as cathode from './sub_static/cathode.png';
import * as electrode from './sub_static/electrode.png';
import * as total from './sub_static/total.png';
import * as highlight from './sub_static/highlight.png';
import * as H from './sub_static/Hlizi.png';
import * as so from './sub_static/so.png';
import * as znli from './sub_static/znli.png';
import * as kongbai from './sub_static/kongbai.png';
import * as platecu from './sub_static/Cuimage.png';
import * as platezn from './sub_static/Znimage.png';
import * as bubble from './sub_static/Bubble.png';
import * as defect from './sub_static/Defect.png';
import * as electronics from './sub_static/Electronics.png';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { ImageUtil } from '../../../../src/util/ImageUtil';

const createjs = require('createjs-npm');
const preloadjs = require('preload-js');
const Stage = createjs.Stage;
const Shape = createjs.Shape;

const vConsole = require('vconsole');

@Component
export class MainVueComponent extends Vue {

  //加载队列
  private imageMap: any;
  //舞台
  stage: any;
  //容器
  container: any;
  //烧杯容器
  beakerBmp: any;
  //铜片
  sheet: any;
  //锌片
  Copper: any;
  //溶液
  liquid: any;
  //导线
  line: any;
  //灯泡
  bulb: any;
  //添加铜文字图片
  addtextCu: any;
  //删除铜文字图片
  deletextCu: any;
  //添加锌文字图片
  addtextZn: any;
  //删除锌文字图片
  deletextZn: any;
  //添加导线文字图片
  addlines: any;
  //展开按钮左边
  buttonOpen: any;
  //收起按钮左边
  buttonClose: any;
  //展开按钮中间
  buttonOpen2: any;
  //收起按钮中间
  buttonClose2: any;
  //展开按钮右边
  buttonOpen3: any;
  //收起按钮右边
  buttonClose3: any;
  //负极
  cathodes: any;
  //正极
  electrodes: any;
  //总方程
  totals: any;
  //高亮
  highlight: any;
  //空白点击图片
  blank: any;
  //正极cu图片
  platecus: any;
  //负极zn图片
  platezns: any;
  //气泡图片
  bubbles: any;
  bubbles2: any;
  bubbles3: any;
  bubbles4: any;
  //zn缺失图片
  defects: any;
  //电子
  dianzi: any;
  //电子1
  dianzi1: any;
  //电子2
  dianzi2: any;
  //电子3
  dianzi3: any;
  //电子4
  dianzi4: any;
  //电子5
  dianzi5: any;
  //电子6
  dianzi6: any;
  //电子7
  dianzi7: any;
  //电子8
  dianzi8: any;
  //电子9
  dianzi9: any;
  //锌离子
  znlizi1: any;
  znlizi2: any;
  znlizi3: any;
  znlizi4: any;
  znlizi5: any;
  znlizi6: any;
  znlizi7: any;
  //H离子
  hlizi1: any;
  hlizi2: any;
  hlizi3: any;
  hlizi4: any;
  hlizi5: any;
  hlizi6: any;
  hlizi7: any;
  hlizi8: any;
  hlizi9: any;
  hlizi10: any;
  hlizi11: any;
  hlizi12: any;
  hlizi13: any;
  hlizi14: any;
  hlizi15: any;
  hlizi16: any;
  //So4离子
  solizi1: any;
  solizi2: any;
  solizi3: any;
  solizi4: any;
  //电子动画
  tween: any;
  tween1: any;
  tween2: any;
  tween3: any;
  tween4: any;
  tween5: any;
  tween6: any;
  tween7: any;
  tween8: any;
  tween9: any;
  //锌离子动画
  tween10: any;
  tween11: any;
  tween12: any;
  //H离子动画
  tween13: any;
  tween14: any;
  tween15: any;
  tween16: any;
  tween17: any;
  tween18: any;
  tween19: any;
  tween20: any;
  //导线相连后锌离子动画
  tween21: any;
  tween22: any;
  tween23: any;
  tween24: any;
  //导线相连后So4离子动画
  tween25: any;
  tween26: any;
  tween27: any;
  tween28: any;
  //导线相连后H离子动画
  tween29: any;
  tween30: any;
  tween31: any;
  tween32: any;
  tween33: any;
  tween34: any;
  tween35: any;
  tween36: any;

  w: any;
  h: any;
  text1: any;
  text2: any;
  t: any;
  s: any;
  b: any;

  animationObj: any;
  animationObj2: any;
  imgArray: any;
  imgArray1: any;
  bitmapArray: Array<any> = [];

  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.showReset = true;
    viewOption.showMobileResetIco = true;
    viewOption.adapterMobilePanel = true;
    ViewController.getInstance(new DytxydcViewHandler(this), viewOption);

  }


  mounted() {
    if (BrowserUtil.getBrowserInfo().isSmallDevice) {

      const height = document.getElementById('box').clientHeight;
      const width  = document.getElementById('box').clientWidth;

      (document.getElementById('demoCanvas') as any).width = width * 2.5;
      (document.getElementById('demoCanvas') as any).height = height * 2.5 ;
      this.stage = new Stage('demoCanvas');
      this.w = this.stage.canvas.width;
      this.h = this.stage.canvas.height;

      this.container = new createjs.Container();
      this.stage.addChild(this.container);

    } else {

      const height = document.getElementById('box').clientHeight ;
      const width  = document.getElementById('box').clientWidth ;
      (document.getElementById('demoCanvas') as any).width = width * 1.2 ;
      (document.getElementById('demoCanvas') as any).height = height * 1.2;

      this.stage = new Stage('demoCanvas');

      this.w = this.stage.canvas.width;
      this.h = this.stage.canvas.height;

      this.container = new createjs.Container();
      this.stage.addChild(this.container);
    }
    ViewController.getInstance().domReady();
    this.initAnimation();
  }


  domReady() {
    const resources = [beaker, cu, zn, wireway, bulb, water, addcu, addzn, addwireway,
      deleteCu, deleteZn, button1, button2, cathode, electrode, total, highlight, H, so, znli,
      kongbai, platecu, platezn, bubble,  defect, electronics];
    console.log(resources.length);

  }



  private async initAnimation()  {

    const manifest = [

      {src: beaker , id: 'beaker'},
      {src: cu , id: 'cu'},
      {src: zn , id: 'zn'},
      {src: wireway , id: 'wireway'},
      {src: bulb , id: 'bulb'},
      {src: water , id: 'water'},
      {src: addcu , id: 'addcu'},
      {src: addzn , id: 'addzn'},
      {src: addwireway , id: 'addwireway'},
      {src: deleteCu , id: 'deleteCu'},
      {src: deleteZn , id: 'deleteZn'},
      {src: button1 , id: 'button1'},
      {src: button2 , id: 'button2'},
      {src: cathode , id: 'cathode'},
      {src: electrode , id: 'electrode'},
      {src: total , id: 'total'},
      {src: highlight , id: 'highlight'},
      {src: H , id: 'H'},
      {src: so , id: 'so'},
      {src: znli , id: 'znli'},
      {src: kongbai , id: 'kongbai'},
      {src: platecu, id: 'platecu'},
      {src: platezn , id: 'platezn'},
      {src: bubble, id: 'bubble'},
      {src: defect , id: 'defect'},
      {src: electronics , id: 'electronics'},

    ];
    // this.queue = new preloadjs.LoadQueue();
    // this.queue.on('complete', this.handleComplete, this);
    // this.queue.loadManifest(manifest);

    this.imageMap = await ImageUtil.loadImages(manifest);
    this.handleComplete();

  }


  //初始离子无序的运动
  private handleComplete(): void {
    this.initBeaker();

    const imgSo =  this.imageMap['so'];
    const imgH = this.imageMap['H'];

    this.imgArray = [imgSo];
    for (let i = 1; i < 4; i++) {

      const dx = CommonUtil.getRandomInt(-1, 1, 2) / 5;
      const dy = CommonUtil.getRandomInt(-1, 1, 2) / 5;
      const x = CommonUtil.getRandomInt(this.liquid.lt().x + 10, this.liquid.rb().x - 40);
      const y = CommonUtil.getRandomInt(this.liquid.lt().y , this.liquid.rb().y - 60);

      this.animationObj = new AnimationObj(this.imgArray[i % 1], this.container, this.liquid, x, y, dx, dy);
      this.bitmapArray.push(this.animationObj);

    }

    this.imgArray1 = [imgH];
    for (let i = 1; i < 7; i++) {

      const dx = CommonUtil.getRandomInt(-1, 1, 2) / 5;
      const dy = CommonUtil.getRandomInt(-1, 1, 2) / 5;
      const x = CommonUtil.getRandomInt(this.liquid.lt().x + 10, this.liquid.rb().x - 40);
      const y = CommonUtil.getRandomInt(this.liquid.lt().y, this.liquid.rb().y - 40);

      this.animationObj2 = new AnimationObj(this.imgArray1[i % 1], this.container, this.liquid, x, y, dx, dy);
      this.bitmapArray.push(this.animationObj2);

    }

      this.initTick();
      this.Clickbutton();
      this.showEvent();
      this.Choosebutton();
      this.initdianzi();
      this.initZn();
      this.initZnli();
      this.initH();
      this.initHli();
      this.initso();
      this.initElectronics();
      this.Initialization();
      this.initZincion();
      this.initHion();
      this.initZncion();
      this.initHcion();
      this.intiSoAnimation();

  }


  //初始化位置
  Initialization() {

    //初始化电子位置
    this.dianzi.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi1.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi1.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi2.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi2.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi3.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi3.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi4.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi4.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi5.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi5.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi6.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi6.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi7.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi7.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi8.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi8.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi9.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi9.y = (this.h - this.beakerBmp.h) / 2 + 370;


    //初始化放入锌片后Zn离子位置
    this.znlizi1.x = (this.w - this.beakerBmp.w) / 2 + 360;
    this.znlizi1.y = (this.h - this.beakerBmp.h) / 2 + 200;
    this.znlizi2.x = (this.w - this.beakerBmp.w) / 2 + 200;
    this.znlizi2.y = (this.h - this.beakerBmp.h) / 2 + 220;
    this.znlizi3.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.znlizi3.y = (this.h - this.beakerBmp.h) / 2 + 240;

    //初始化放入锌片后H离子位置
    this.hlizi1.x = (this.w - this.beakerBmp.w) / 2 + 135;
    this.hlizi1.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi2.x = (this.w - this.beakerBmp.w) / 2 + 170;
    this.hlizi2.y = (this.h - this.beakerBmp.h) / 2 + 320;
    this.hlizi3.x = (this.w - this.beakerBmp.w) / 2 + 220;
    this.hlizi3.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.hlizi4.x = (this.w - this.beakerBmp.w) / 2 + 250;
    this.hlizi4.y = (this.h - this.beakerBmp.h) / 2 + 330;
    this.hlizi5.x = (this.w - this.beakerBmp.w) / 2 + 370;
    this.hlizi5.y = (this.h - this.beakerBmp.h) / 2 + 300;
    this.hlizi6.x = (this.w - this.beakerBmp.w) / 2 + 350;
    this.hlizi6.y = (this.h - this.beakerBmp.h) / 2 + 350;
    this.hlizi7.x = (this.w - this.beakerBmp.w) / 2 + 480;
    this.hlizi7.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi8.x = (this.w - this.beakerBmp.w) / 2 + 510;
    this.hlizi8.y = (this.h - this.beakerBmp.h) / 2 + 320;

    //初始化插入导线后Zn离子位置
    this.znlizi4.x = (this.w - this.beakerBmp.w) / 2 + 95;
    this.znlizi4.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.znlizi5.x = (this.w - this.beakerBmp.w) / 2 + 140;
    this.znlizi5.y = (this.h - this.beakerBmp.h) / 2 + 200;
    this.znlizi6.x = (this.w - this.beakerBmp.w) / 2 + 260;
    this.znlizi6.y = (this.h - this.beakerBmp.h) / 2 + 195;
    this.znlizi7.x = (this.w - this.beakerBmp.w) / 2 + 400;
    this.znlizi7.y = (this.h - this.beakerBmp.h) / 2 + 210;

    //初始化插入导线后H离子位置
    this.hlizi9.x = (this.w - this.beakerBmp.w) / 2 + 120;
    this.hlizi9.y = (this.h - this.beakerBmp.h) / 2 + 320;
    this.hlizi10.x = (this.w - this.beakerBmp.w) / 2 + 170;
    this.hlizi10.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.hlizi11.x = (this.w - this.beakerBmp.w) / 2 + 250;
    this.hlizi11.y = (this.h - this.beakerBmp.h) / 2 + 315;
    this.hlizi12.x = (this.w - this.beakerBmp.w) / 2 + 280;
    this.hlizi12.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi13.x = (this.w - this.beakerBmp.w) / 2 + 370;
    this.hlizi13.y = (this.h - this.beakerBmp.h) / 2 + 315;
    this.hlizi14.x = (this.w - this.beakerBmp.w) / 2 + 410;
    this.hlizi14.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi15.x = (this.w - this.beakerBmp.w) / 2 + 460;
    this.hlizi15.y = (this.h - this.beakerBmp.h) / 2 + 280;
    this.hlizi16.x = (this.w - this.beakerBmp.w) / 2 + 440;
    this.hlizi16.y = (this.h - this.beakerBmp.h) / 2 + 340;


    //初始化插入导线后So4离子位置
    this.solizi1.x = (this.w - this.beakerBmp.w) / 2 + 450;
    this.solizi1.y = (this.h - this.beakerBmp.h) / 2 + 240;
    this.solizi2.x = (this.w - this.beakerBmp.w) / 2 + 320;
    this.solizi2.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.solizi3.x = (this.w - this.beakerBmp.w) / 2 + 230;
    this.solizi3.y = (this.h - this.beakerBmp.h) / 2 + 340;
    this.solizi4.x = (this.w - this.beakerBmp.w) / 2 + 140;
    this.solizi4.y = (this.h - this.beakerBmp.h) / 2 + 335;

  }


  //创建所有电子
  initdianzi() {
    const dianziImg = this.imageMap['electronics'];
    this.dianzi = new createjs.Bitmap(dianziImg);
    this.dianzi.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi.visible = false;
    this.container.addChild(this.dianzi);

    const dianziImg1 =  this.imageMap['electronics'];
    this.dianzi1 = new createjs.Bitmap(dianziImg1);
    this.dianzi1.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi1.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi1.visible = false;
    this.container.addChild(this.dianzi1);

    const dianziImg2 =  this.imageMap['electronics'];
    this.dianzi2 = new createjs.Bitmap(dianziImg2);
    this.dianzi2.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi2.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi2.visible = false;
    this.container.addChild(this.dianzi2);

    const dianziImg3 =  this.imageMap['electronics'];
    this.dianzi3 = new createjs.Bitmap(dianziImg3);
    this.dianzi3.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi3.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi3.visible = false;
    this.container.addChild(this.dianzi3);

    const dianziImg4 =  this.imageMap['electronics'];
    this.dianzi4 = new createjs.Bitmap(dianziImg4);
    this.dianzi4.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi4.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi4.visible = false;
    this.container.addChild(this.dianzi4);

    const dianziImg5 =  this.imageMap['electronics'];
    this.dianzi5 = new createjs.Bitmap(dianziImg5);
    this.dianzi5.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi5.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi5.visible = false;
    this.container.addChild(this.dianzi5);

    const dianziImg6 =  this.imageMap['electronics'];
    this.dianzi6 = new createjs.Bitmap(dianziImg6);
    this.dianzi6.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi6.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi6.visible = false;
    this.container.addChild(this.dianzi6);

    const dianziImg7 =  this.imageMap['electronics'];
    this.dianzi7 = new createjs.Bitmap(dianziImg7);
    this.dianzi7.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi7.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi7.visible = false;
    this.container.addChild(this.dianzi7);

    const dianziImg8 =  this.imageMap['electronics'];
    this.dianzi8 = new createjs.Bitmap(dianziImg8);
    this.dianzi8.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi8.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi8.visible = false;
    this.container.addChild(this.dianzi8);

    const dianziImg9 =  this.imageMap['electronics'];
    this.dianzi9 = new createjs.Bitmap(dianziImg9);
    this.dianzi9.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.dianzi9.y = (this.h - this.beakerBmp.h) / 2 + 370;
    this.dianzi9.visible = false;
    this.container.addChild(this.dianzi9);
  }
  //电子动画创建
  initElectronics() {

     //创建电子动画
     this.tween = new createjs.Tween.get(this.dianzi, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween1 = new createjs.Tween.get(this.dianzi1, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2 }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween2 = new createjs.Tween.get(this.dianzi2, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween3 = new createjs.Tween.get(this.dianzi3, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);


     //创建电子动画
     this.tween4 = new createjs.Tween.get(this.dianzi4, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween5 = new createjs.Tween.get(this.dianzi5, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween6 = new createjs.Tween.get(this.dianzi6, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween7 = new createjs.Tween.get(this.dianzi7, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween8 = new createjs.Tween.get(this.dianzi8, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);

     //创建电子动画
     this.tween9 = new createjs.Tween.get(this.dianzi9, { loop: true, paused: true})
       .to({ y: (this.h - this.beakerBmp.h) / 2  }, 2600)
       .to({ x: (this.w - this.beakerBmp.w) / 2 + 525 }, 3000)
       .to({ y: (this.h - this.beakerBmp.h) / 2 + 370 }, 2600);
   }



  //创建放入锌片后的zn离子
  initZn() {

    const znliImg = this.imageMap['znli'];
    this.znlizi1 = new createjs.Bitmap(znliImg);
    this.znlizi1.x = (this.w - this.beakerBmp.w) / 2 + 360;
    this.znlizi1.y = (this.h - this.beakerBmp.h) / 2 + 200;
    this.znlizi1.alpha = 1;
    this.znlizi1.visible = false;
    this.container.addChild(this.znlizi1);

    const znliImg2 = this.imageMap['znli'];
    this.znlizi2 = new createjs.Bitmap(znliImg2);
    this.znlizi2.x = (this.w - this.beakerBmp.w) / 2 + 200;
    this.znlizi2.y = (this.h - this.beakerBmp.h) / 2 + 220;
    this.znlizi2.visible = false;
    this.container.addChild(this.znlizi2);

    const znliImg3 = this.imageMap['znli'];
    this.znlizi3 = new createjs.Bitmap(znliImg3);
    this.znlizi3.x = (this.w - this.beakerBmp.w) / 2 + 70;
    this.znlizi3.y = (this.h - this.beakerBmp.h) / 2 + 240;
    this.znlizi3.alpha = 0;
    this.znlizi3.visible = false;
    this.container.addChild(this.znlizi3);

  }
  //创建放入锌片后Zn离子动画创建
  initZincion() {

    //创建锌离子动画
    this.tween10 = new createjs.Tween.get(this.znlizi1, { loop: true, paused: true})

      .to({ x: (this.w - this.beakerBmp.w) / 2 + 500, y: (this.h - this.beakerBmp.h) / 2 + 190}, 3500)
      .to({alpha: 0}, 500);

    //创建锌离子动画
    this.tween11 = new createjs.Tween.get(this.znlizi2, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 360, y: (this.h - this.beakerBmp.h) / 2 + 200}, 4000);

    //创建锌离子动画
    this.tween12 = new createjs.Tween.get(this.znlizi3, { loop: true, paused: true})
      .to({alpha: 1}, 500)

      .to({ x: (this.w - this.beakerBmp.w) / 2 + 200, y: (this.h - this.beakerBmp.h) / 2 + 220}, 3500);

  }




  //创建放入锌片后H离子
  initH() {

    const HliImg = this.imageMap['H'];
    this.hlizi1 = new createjs.Bitmap(HliImg);
    this.hlizi1.x = (this.w - this.beakerBmp.w) / 2 + 135;
    this.hlizi1.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi1.alpha = 1;
    this.hlizi1.visible = false;
    this.container.addChild(this.hlizi1);


    const HliImg2 = this.imageMap['H'];
    this.hlizi2 = new createjs.Bitmap(HliImg2);
    this.hlizi2.x = (this.w - this.beakerBmp.w) / 2 + 170;
    this.hlizi2.y = (this.h - this.beakerBmp.h) / 2 + 320;
    this.hlizi2.alpha = 1;
    this.hlizi2.visible = false;
    this.container.addChild(this.hlizi2);


    const HliImg3 = this.imageMap['H'];
    this.hlizi3 = new createjs.Bitmap(HliImg3);
    this.hlizi3.x = (this.w - this.beakerBmp.w) / 2 + 220;
    this.hlizi3.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.hlizi3.visible = false;
    this.container.addChild(this.hlizi3);

    const HliImg4 = this.imageMap['H'];
    this.hlizi4 = new createjs.Bitmap(HliImg4);
    this.hlizi4.x = (this.w - this.beakerBmp.w) / 2 + 250;
    this.hlizi4.y = (this.h - this.beakerBmp.h) / 2 + 330;
    this.hlizi4.visible = false;
    this.container.addChild(this.hlizi4);

    const HliImg5 = this.imageMap['H'];
    this.hlizi5 = new createjs.Bitmap(HliImg5);
    this.hlizi5.x = (this.w - this.beakerBmp.w) / 2 + 370;
    this.hlizi5.y = (this.h - this.beakerBmp.h) / 2 + 300;
    this.hlizi5.visible = false;
    this.container.addChild(this.hlizi5);

    const HliImg6 = this.imageMap['H'];
    this.hlizi6 = new createjs.Bitmap(HliImg6);
    this.hlizi6.x = (this.w - this.beakerBmp.w) / 2 + 350;
    this.hlizi6.y = (this.h - this.beakerBmp.h) / 2 + 350;
    this.hlizi6.visible = false;
    this.container.addChild(this.hlizi6);

    const HliImg7 = this.imageMap['H'];
    this.hlizi7 = new createjs.Bitmap(HliImg7);
    this.hlizi7.x = (this.w - this.beakerBmp.w) / 2 + 480;
    this.hlizi7.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi7.alpha = 0;
    this.hlizi7.visible = false;
    this.container.addChild(this.hlizi7);

    const HliImg8 = this.imageMap['H'];
    this.hlizi8 = new createjs.Bitmap(HliImg8);
    this.hlizi8.x = (this.w - this.beakerBmp.w) / 2 + 510;
    this.hlizi8.y = (this.h - this.beakerBmp.h) / 2 + 320;
    this.hlizi8.alpha = 0;
    this.hlizi8.visible = false;
    this.container.addChild(this.hlizi8);

  }
  //创建放入锌片后H离子动画创建
  initHion() {

    //创建H离子动画
    this.tween13 = new createjs.Tween.get(this.hlizi1, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 80, y: (this.h - this.beakerBmp.h) / 2 + 290}, 5000)
      .to({alpha: 0}, 500);

    //创建H离子动画
    this.tween14 = new createjs.Tween.get(this.hlizi2, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 90, y: (this.h - this.beakerBmp.h) / 2 + 320}, 5000)
      .to({alpha: 0}, 500);

    //创建H离子动画
    this.tween15 = new createjs.Tween.get(this.hlizi3, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 135, y: (this.h - this.beakerBmp.h) / 2 + 270}, 5500);

    //创建H离子动画
    this.tween16 = new createjs.Tween.get(this.hlizi4, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 170, y: (this.h - this.beakerBmp.h) / 2 + 320}, 5500);

    //创建H离子动画
    this.tween17 = new createjs.Tween.get(this.hlizi5, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 220, y: (this.h - this.beakerBmp.h) / 2 + 250}, 5500);

    //创建H离子动画
    this.tween18 = new createjs.Tween.get(this.hlizi6, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 250, y: (this.h - this.beakerBmp.h) / 2 + 330}, 5500);

    //创建H离子动画
    this.tween19 = new createjs.Tween.get(this.hlizi7, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 370, y: (this.h - this.beakerBmp.h) / 2 + 300}, 5000);

    //创建H离子动画
    this.tween20 = new createjs.Tween.get(this.hlizi8, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 350, y: (this.h - this.beakerBmp.h) / 2 + 350}, 5000);

  }




  //创建插入导线后锌离子
  initZnli() {
    const znliImg = this.imageMap['znli'];
    this.znlizi4 = new createjs.Bitmap(znliImg);
    this.znlizi4.x = (this.w - this.beakerBmp.w) / 2 + 95;
    this.znlizi4.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.znlizi4.alpha = 0;
    this.znlizi4.visible = false;
    this.container.addChild(this.znlizi4);

    const znliImg2 = this.imageMap['znli'];
    this.znlizi5 = new createjs.Bitmap(znliImg2);
    this.znlizi5.x = (this.w - this.beakerBmp.w) / 2 + 140;
    this.znlizi5.y = (this.h - this.beakerBmp.h) / 2 + 200;
    this.znlizi5.visible = false;
    this.container.addChild(this.znlizi5);

    const znliImg3 = this.imageMap['znli'];
    this.znlizi6 = new createjs.Bitmap(znliImg3);
    this.znlizi6.x = (this.w - this.beakerBmp.w) / 2 + 260;
    this.znlizi6.y = (this.h - this.beakerBmp.h) / 2 + 195;
    this.znlizi6.visible = false;
    this.container.addChild(this.znlizi6);

    const znliImg4 = this.imageMap['znli'];
    this.znlizi7 = new createjs.Bitmap(znliImg4);
    this.znlizi7.x = (this.w - this.beakerBmp.w) / 2 + 400;
    this.znlizi7.y = (this.h - this.beakerBmp.h) / 2 + 210;
    this.znlizi7.alpha = 1;
    this.znlizi7.visible = false;
    this.container.addChild(this.znlizi7);

  }
  //创建插入导线后锌离子动画
  initZncion() {

    //创建Zn离子动画
    this.tween21 = new createjs.Tween.get(this.znlizi4, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 140, y: (this.h - this.beakerBmp.h) / 2 + 200}, 5000);

    //创建zn离子动画
    this.tween22 = new createjs.Tween.get(this.znlizi5, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 260, y: (this.h - this.beakerBmp.h) / 2 + 195}, 5500);

    //创建zn离子动画
    this.tween23 = new createjs.Tween.get(this.znlizi6, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 400, y: (this.h - this.beakerBmp.h) / 2 + 210}, 5500);

    //创建zn离子动画
    this.tween24 = new createjs.Tween.get(this.znlizi7, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 500, y: (this.h - this.beakerBmp.h) / 2 + 210}, 5000)
      .to({alpha: 0}, 500);



  }




  //插入导线后H离子
  initHli() {

    const HliImg = this.imageMap['H'];
    this.hlizi9 = new createjs.Bitmap(HliImg);
    this.hlizi9.x = (this.w - this.beakerBmp.w) / 2 + 120;
    this.hlizi9.y = (this.h - this.beakerBmp.h) / 2 + 320;
    this.hlizi9.alpha = 0;
    this.hlizi9.visible = false;
    this.container.addChild(this.hlizi9);

    const HliImg2 = this.imageMap['H'];
    this.hlizi10 = new createjs.Bitmap(HliImg2);
    this.hlizi10.x = (this.w - this.beakerBmp.w) / 2 + 170;
    this.hlizi10.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.hlizi10.alpha = 0;
    this.hlizi10.visible = false;
    this.container.addChild(this.hlizi10);

    const HliImg3 = this.imageMap['H'];
    this.hlizi11 = new createjs.Bitmap(HliImg3);
    this.hlizi11.x = (this.w - this.beakerBmp.w) / 2 + 250;
    this.hlizi11.y = (this.h - this.beakerBmp.h) / 2 + 315;
    this.hlizi11.visible = false;
    this.container.addChild(this.hlizi11);

    const HliImg4 = this.imageMap['H'];
    this.hlizi12 = new createjs.Bitmap(HliImg4);
    this.hlizi12.x = (this.w - this.beakerBmp.w) / 2 + 280;
    this.hlizi12.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi12.visible = false;
    this.container.addChild(this.hlizi12);

    const HliImg5 = this.imageMap['H'];
    this.hlizi13 = new createjs.Bitmap(HliImg5);
    this.hlizi13.x = (this.w - this.beakerBmp.w) / 2 + 370;
    this.hlizi13.y = (this.h - this.beakerBmp.h) / 2 + 315;
    this.hlizi13.visible = false;
    this.container.addChild(this.hlizi13);


    const HliImg6 = this.imageMap['H'];
    this.hlizi14 = new createjs.Bitmap(HliImg6);
    this.hlizi14.x = (this.w - this.beakerBmp.w) / 2 + 410;
    this.hlizi14.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.hlizi14.visible = false;
    this.container.addChild(this.hlizi14);


    const HliImg7 = this.imageMap['H'];
    this.hlizi15 = new createjs.Bitmap(HliImg7);
    this.hlizi15.x = (this.w - this.beakerBmp.w) / 2 + 460;
    this.hlizi15.y = (this.h - this.beakerBmp.h) / 2 + 280;
    this.hlizi15.alpha = 1;
    this.hlizi15.visible = false;
    this.container.addChild(this.hlizi15);


    const HliImg8 = this.imageMap['H'];
    this.hlizi16 = new createjs.Bitmap(HliImg8);
    this.hlizi16.x = (this.w - this.beakerBmp.w) / 2 + 440;
    this.hlizi16.y = (this.h - this.beakerBmp.h) / 2 + 340;
    this.hlizi6.alpha = 1;
    this.hlizi16.visible = false;
    this.container.addChild(this.hlizi16);

  }
  //插入导线后H离子动画
  initHcion() {

    //创建H离子动画
    this.tween29 = new createjs.Tween.get(this.hlizi9, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 250, y: (this.h - this.beakerBmp.h) / 2 + 315}, 5000);

    //创建H离子动画
    this.tween30 = new createjs.Tween.get(this.hlizi10, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 280, y: (this.h - this.beakerBmp.h) / 2 + 270}, 5000);

    //创建H离子动画
    this.tween31 = new createjs.Tween.get(this.hlizi11, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 370, y: (this.h - this.beakerBmp.h) / 2 + 315}, 5500);

    //创建H离子动画
    this.tween32 = new createjs.Tween.get(this.hlizi12, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 410, y: (this.h - this.beakerBmp.h) / 2 + 270}, 5500);


    //创建H离子动画
    this.tween33 = new createjs.Tween.get(this.hlizi13, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 440, y: (this.h - this.beakerBmp.h) / 2 + 340}, 5500);

    //创建H离子动画
    this.tween34 = new createjs.Tween.get(this.hlizi14, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 460, y: (this.h - this.beakerBmp.h) / 2 + 280}, 5500);


    //创建H离子动画
    this.tween35 = new createjs.Tween.get(this.hlizi15, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 490, y: (this.h - this.beakerBmp.h) / 2 + 300}, 5000)
      .to({alpha: 0}, 500);


    //创建H离子动画
    this.tween36 = new createjs.Tween.get(this.hlizi16, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 485, y: (this.h - this.beakerBmp.h) / 2 + 350}, 5000)
      .to({alpha: 0}, 500);

  }


  //创建插入导线后So4离子
  initso() {

    const SoliImg = this.imageMap['so'];
    this.solizi1 = new createjs.Bitmap(SoliImg);
    this.solizi1.x = (this.w - this.beakerBmp.w) / 2 + 450;
    this.solizi1.y = (this.h - this.beakerBmp.h) / 2 + 240;
    this.solizi1.alpha = 0;
    this.solizi1.visible = false;
    this.container.addChild(this.solizi1);

    const SoliImg2 = this.imageMap['so'];
    this.solizi2 = new createjs.Bitmap(SoliImg2);
    this.solizi2.x = (this.w - this.beakerBmp.w) / 2 + 320;
    this.solizi2.y = (this.h - this.beakerBmp.h) / 2 + 270;
    this.solizi2.visible = false;
    this.container.addChild(this.solizi2);

    const SoliImg3 = this.imageMap['so'];
    this.solizi3 = new createjs.Bitmap(SoliImg3);
    this.solizi3.x = (this.w - this.beakerBmp.w) / 2 + 230;
    this.solizi3.y = (this.h - this.beakerBmp.h) / 2 + 340;
    this.solizi3.visible = false;
    this.container.addChild(this.solizi3);

    const SoliImg4 = this.imageMap['so'];
    this.solizi4 = new createjs.Bitmap(SoliImg4);
    this.solizi4.x = (this.w - this.beakerBmp.w) / 2 + 140;
    this.solizi4.y = (this.h - this.beakerBmp.h) / 2 + 335;
    this.solizi4.alpha = 1;
    this.solizi4.visible = false;
    this.container.addChild(this.solizi4);

  }
  //创建插入导线后So4离子动画
  intiSoAnimation() {

    //创建So4离子动画
    this.tween25 = new createjs.Tween.get(this.solizi1, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 320, y: (this.h - this.beakerBmp.h) / 2 + 270}, 4000);

    //创建So4离子动画
    this.tween26 = new createjs.Tween.get(this.solizi2, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 230, y: (this.h - this.beakerBmp.h) / 2 + 340}, 4500);

    //创建So4离子动画
    this.tween27 = new createjs.Tween.get(this.solizi3, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 140, y: (this.h - this.beakerBmp.h) / 2 + 335}, 4500);

    //创建So4离子动画
    this.tween28 = new createjs.Tween.get(this.solizi4, { loop: true, paused: true})
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 80, y: (this.h - this.beakerBmp.h) / 2 + 320}, 4000)
      .to({alpha: 0}, 500) ;

  }




  //添加静态场景图片
  private initBeaker(): void {

    const daoxian  = this.imageMap['wireway'];
    this.line = new Beaker(daoxian, this.container);
    this.line.bitmap.x = (this.w - this.line.w ) / 2;
    this.line.bitmap.y = (this.h - this.line.h ) / 2 - 117;
    this.line.bitmap.visible = false;

    const dengpao  = this.imageMap['bulb'];
    this.bulb = new Beaker(dengpao, this.container);
    this.bulb.bitmap.x = (this.w - this.bulb.w ) / 2;
    this.bulb.bitmap.y = (this.h - this.bulb.h ) / 2 - 190;
    this.bulb.bitmap.visible = false;

    const znpian  = this.imageMap['zn'];
    this.Copper = new Beaker(znpian, this.container);
    this.Copper.bitmap.x = (this.w - this.Copper.w ) / 2 - 228;
    this.Copper.bitmap.y = (this.h - this.Copper.h ) / 2 + 83;
    this.Copper.bitmap.visible = false;

    const cupian  = this.imageMap['cu'];
    this.sheet = new Beaker(cupian, this.container);
    this.sheet.bitmap.x = (this.w - this.sheet.w ) / 2 + 228;
    this.sheet.bitmap.y = (this.h - this.sheet.h ) / 2 + 83;
    this.sheet.bitmap.visible = false;

    const queshi  = this.imageMap['defect'];
    this.defects = new Beaker(queshi, this.container);
    this.defects.bitmap.x = (this.w - this.defects.w ) / 2 - 208;
    this.defects.bitmap.y = (this.h - this.defects.h ) / 2 + 110;
    this.defects.bitmap.visible = false;

    const rongye  = this.imageMap['water'];
    this.liquid = new Beaker(rongye, this.container);
    this.liquid.bitmap.x = (this.w - this.liquid.w ) / 2 + 1;
    this.liquid.bitmap.y = (this.h - this.liquid.h ) / 2 + 138 ;

    const qipao  = this.imageMap['bubble'];
    this.bubbles = new Beaker(qipao, this.container);
    this.bubbles.bitmap.x = (this.w - this.bubbles.w ) / 2 - 210;
    this.bubbles.bitmap.y = (this.h - this.bubbles.h ) / 2 + 170;
    this.bubbles.bitmap.visible = false;

    const qipao2  = this.imageMap['bubble'];
    this.bubbles2 = new Beaker(qipao2, this.container);
    this.bubbles2.bitmap.x = (this.w - this.bubbles2.w ) / 2 - 200;
    this.bubbles2.bitmap.y = (this.h - this.bubbles2.h ) / 2 + 150;
    this.bubbles2.bitmap.visible = false;

    const qipao3  = this.imageMap['bubble'];
    this.bubbles3 = new Beaker(qipao3, this.container);
    this.bubbles3.bitmap.x = (this.w - this.bubbles3.w ) / 2 + 210;
    this.bubbles3.bitmap.y = (this.h - this.bubbles3.h ) / 2 + 170;
    this.bubbles3.bitmap.visible = false;

    const qipao4  = this.imageMap['bubble'];
    this.bubbles4 = new Beaker(qipao4, this.container);
    this.bubbles4.bitmap.x = (this.w - this.bubbles4.w ) / 2 + 200;
    this.bubbles4.bitmap.y = (this.h - this.bubbles4.h ) / 2 + 150;
    this.bubbles4.bitmap.visible = false;

    const shaobei  = this.imageMap['beaker'];
    this.beakerBmp = new Beaker(shaobei, this.container);
    this.beakerBmp.bitmap.x = (this.w - this.beakerBmp.w ) / 2;
    this.beakerBmp.bitmap.y = (this.h - this.beakerBmp.h ) / 2 + 100;

    const addzntext  = this.imageMap['addzn'];
    this.addtextZn = new Beaker(addzntext, this.container);
    this.addtextZn.bitmap.x = (this.w - this.addtextZn.w ) / 2 - 400;
    this.addtextZn.bitmap.y = (this.h - this.addtextZn.h ) / 2 - 100;
    this.addtextZn.bitmap.visible = true;

    const deletezntext  = this.imageMap['deleteZn'];
    this.deletextZn = new Beaker(deletezntext, this.container);
    this.deletextZn.bitmap.x = (this.w - this.deletextZn.w ) / 2 - 400;
    this.deletextZn.bitmap.y = (this.h - this.deletextZn.h ) / 2 - 100;
    this.deletextZn.bitmap.visible = false;

    const addcutext  = this.imageMap['addcu'];
    this.addtextCu = new Beaker(addcutext, this.container);
    this.addtextCu.bitmap.x = (this.w - this.addtextCu.w ) / 2 + 400;
    this.addtextCu.bitmap.y = (this.h - this.addtextCu.h ) / 2 - 100;
    this.addtextCu.bitmap.visible = true;

    const deletecutext  = this.imageMap['deleteCu'];
    this.deletextCu = new Beaker(deletecutext, this.container);
    this.deletextCu.bitmap.x = (this.w - this.deletextCu.w ) / 2 + 400;
    this.deletextCu.bitmap.y = (this.h - this.deletextCu.h ) / 2 - 100;
    this.deletextCu.bitmap.visible = false;

    const addline  = this.imageMap['addwireway'];
    this.addlines = new Beaker(addline, this.container);
    this.addlines.bitmap.x = (this.w - this.addlines.w ) / 2 ;
    this.addlines.bitmap.y = (this.h - this.addlines.h ) / 2 - 220;
    this.addlines.bitmap.visible = true;
    this.addlines.bitmap.alpha = 0.5;


    const addkongbai  = this.imageMap['kongbai'];
    this.blank = new Beaker(addkongbai, this.container);
    this.blank.bitmap.x = (this.w - this.addlines.w ) / 2 ;
    this.blank.bitmap.y = (this.h - this.addlines.h ) / 2 - 220;
    this.blank.bitmap.alpha = 0.01;

    const buttones1  = this.imageMap['button1'];
    this.buttonOpen = new Beaker(buttones1, this.container);
    this.buttonOpen.bitmap.x = (this.w - this.buttonOpen.w ) / 2 - 350;
    this.buttonOpen.bitmap.y = (this.h - this.buttonOpen.h ) / 2 + 120;
    this.buttonOpen.bitmap.visible = false;

    const buttones3  = this.imageMap['button1'];
    this.buttonOpen2 = new Beaker(buttones3, this.container);
    this.buttonOpen2.bitmap.x = (this.w - this.buttonOpen2.w ) / 2 ;
    this.buttonOpen2.bitmap.y = (this.h - this.buttonOpen2.h ) / 2 + 326;
    this.buttonOpen2.bitmap.visible = false;

    const buttones5  = this.imageMap['button1'];
    this.buttonOpen3 = new Beaker(buttones5, this.container);
    this.buttonOpen3.bitmap.x = (this.w - this.buttonOpen3.w ) / 2 + 350;
    this.buttonOpen3.bitmap.y = (this.h - this.buttonOpen3.h ) / 2 + 120;
    this.buttonOpen3.bitmap.visible = false;

    const buttones2  = this.imageMap['button2'];
    this.buttonClose = new Beaker(buttones2, this.container);
    this.buttonClose.bitmap.x = (this.w - this.buttonClose.w ) / 2 - 350;
    this.buttonClose.bitmap.y = (this.h - this.buttonClose.h ) / 2 + 120;
    this.buttonClose.bitmap.visible = false;

    const buttones4  = this.imageMap['button2'];
    this.buttonClose2 = new Beaker(buttones4, this.container);
    this.buttonClose2.bitmap.x = (this.w - this.buttonClose2.w ) / 2;
    this.buttonClose2.bitmap.y = (this.h - this.buttonClose2.h ) / 2 + 326;
    this.buttonClose2.bitmap.visible = false;

    const buttones6  = this.imageMap['button2'];
    this.buttonClose3 = new Beaker(buttones6, this.container);
    this.buttonClose3.bitmap.x = (this.w - this.buttonClose3.w ) / 2 + 350;
    this.buttonClose3.bitmap.y = (this.h - this.buttonClose3.h ) / 2 + 120;
    this.buttonClose3.bitmap.visible = false;

    const gaoliang  = this.imageMap['highlight'];
    this.highlight = new Beaker(gaoliang, this.container);
    this.highlight.bitmap.x = (this.w - this.highlight.w ) / 2 ;
    this.highlight.bitmap.y = (this.h - this.highlight.h ) / 2 + 90;

    const zhengji  = this.imageMap['electrode'];
    this.cathodes = new Beaker(zhengji, this.container);
    this.cathodes.bitmap.x = (this.w - this.cathodes.w ) / 2 + 350;
    this.cathodes.bitmap.y = (this.h - this.cathodes.h ) / 2 - 10;
    this.cathodes.bitmap.visible = false;

    const fuji  = this.imageMap['cathode'];
    this.electrodes = new Beaker(fuji, this.container);
    this.electrodes.bitmap.x = (this.w - this.electrodes.w ) / 2 - 350;
    this.electrodes.bitmap.y = (this.h - this.electrodes.h ) / 2 - 10;
    this.electrodes.bitmap.visible = false;

    const zong  = this.imageMap['total'];
    this.totals = new Beaker(zong, this.container);
    this.totals.bitmap.x = (this.w - this.totals.w ) / 2 ;
    this.totals.bitmap.y = (this.h - this.totals.h ) / 2 + 275;
    this.totals.bitmap.visible = false;


    const cuzhengji  = this.imageMap['platecu'];
    this.platecus = new Beaker(cuzhengji, this.container);
    this.platecus.bitmap.x = (this.w - this.Copper.w ) / 2 + 270;
    this.platecus.bitmap.y = (this.h - this.Copper.h ) / 2 + 30;
    this.platecus.bitmap.visible = false;

    const znfuji  = this.imageMap['platezn'];
    this.platezns = new Beaker(znfuji, this.container);
    this.platezns.bitmap.x = (this.w - this.Copper.w ) / 2 - 270;
    this.platezns.bitmap.y = (this.h - this.Copper.h ) / 2 + 30;
    this.platezns.bitmap.visible = false;




  }


  private initTick(): void {
    createjs.Ticker.addEventListener('tick', this.tick);

  }


  private tick(e: any): void {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    if (e.paused !== 1) {
      //处理
      for (let i = 0 ; i < this.bitmapArray.length; i++) {
        this.bitmapArray[i].update();
      }
      this.stage.update();  //刷新舞台

    } else {

    }
  }

  //初始化绑定事件
  showEvent () {

    this.text1 = new createjs.Text(' Zn', '30px Arial', '#000000');
    this.text1.x = (this.w - this.Copper.w ) / 2 - 258;
    this.text1.y = (this.h - this.Copper.h ) / 2 + 30;

    this.text2 = new createjs.Text(' Cu', '30px Arial', '#000000');
    this.text2.x = (this.w - this.sheet.w ) / 2 + 258;
    this.text2.y = (this.h - this.sheet.h ) / 2 + 30;

    this.text1.visible = false;
    this.text2.visible = false;

    this.stage.addChild(this.text1);
    this.stage.addChild(this.text2);
    this.stage.update();


  }

  private Choosebutton() {

  }


 //创建对象点击绑定事件
 private Clickbutton() {

   //创建添加锌片和删除锌片按钮事件
   this.addtextZn.bitmap.addEventListener('click', this.handleClick1);
   this.deletextZn.bitmap.addEventListener('click', this.handleClick2);

   //创建添加铜片和删除铜片按钮事件
   this.addtextCu.bitmap.addEventListener('click', this.handleClick3);
   this.deletextCu.bitmap.addEventListener('click', this.handleClick4);

   //创建方程式反应按钮的点击事件
   this.buttonOpen.bitmap.addEventListener('click', this.handleClick6);
   this.buttonClose.bitmap.addEventListener('click', this.handleClick7);

   this.buttonOpen2.bitmap.addEventListener('click', this.handleClick8);
   this.buttonClose2.bitmap.addEventListener('click', this.handleClick9);

   this.buttonOpen3.bitmap.addEventListener('click', this.handleClick10);
   this.buttonClose3.bitmap.addEventListener('click', this.handleClick11);

   //创建点击添加铜线的点击事件
   this.blank.bitmap.addEventListener('click', this.handleClick5);

   //开启触摸事件
   // createjs.Touch.enable(this.stage);
  }

  handleClick1() {

       this.addtextZn.bitmap.visible = false;
       this.deletextZn.bitmap.visible = true;
       this.Copper.bitmap.visible = true;
       this.text1.visible = true;

       this.s = setTimeout(() => {

         this.bubbles.bitmap.visible = true;
         this.bubbles2.bitmap.visible = true;

       }, 5200);


       for (let i = 0; i < 9; i++) {
           console.log(this.bitmapArray[3].displayObject.visible = false,
             this.bitmapArray[4].displayObject.visible = false,
             this.bitmapArray[5].displayObject.visible = false,
             this.bitmapArray[6].displayObject.visible = false,
             this.bitmapArray[7].displayObject.visible = false,
             this.bitmapArray[8].displayObject.visible = false);

          }

       this.t = setTimeout(() => {

         this.defects.bitmap.visible = true;

       }, 10000);

       if ( this.text1.visible === true && this.text2.visible === true) {
         this.addlines.bitmap.alpha = 1;


       } else {
         this.addlines.bitmap.alpha = 0.5;
       }

       this.znlizi1.visible = true;
       this.tween10.paused = false;
       this.znlizi2.visible = true;
       this.tween11.paused = false;
       this.znlizi3.visible = true;
       this.tween12.paused = false;

       this.hlizi1.visible = true;
       this.tween13.paused = false;
       this.hlizi2.visible = true;
       this.tween14.paused = false;
       this.hlizi3.visible = true;
       this.tween15.paused = false;
       this.hlizi4.visible = true;
       this.tween16.paused = false;
       this.hlizi5.visible = true;
       this.tween17.paused = false;
       this.hlizi6.visible = true;
       this.tween18.paused = false;
       this.hlizi7.visible = true;
       this.tween19.paused = false;
       this.hlizi8.visible = true;
       this.tween20.paused = false;

       this.initZincion();
       this.initHion();
  }

  handleClick2() {

    this.addtextZn.bitmap.visible = true;
    this.deletextZn.bitmap.visible = false;
    this.Copper.bitmap.visible = false;
    this.text1.visible = false;
    this.bubbles.bitmap.visible = false;
    this.bubbles2.bitmap.visible = false;
    this.defects.bitmap.visible = false;
    clearTimeout(this.s);
    clearTimeout(this.t);

    for (let i = 0; i < 9; i++) {
     console.log(this.bitmapArray[3].displayObject.visible = true,
       this.bitmapArray[4].displayObject.visible = true,
       this.bitmapArray[5].displayObject.visible = true,
       this.bitmapArray[6].displayObject.visible = true,
       this.bitmapArray[7].displayObject.visible = true,
       this.bitmapArray[8].displayObject.visible = true);

    }
    if ( this.text1.visible === true && this.text2.visible === true) {
     this.addlines.bitmap.alpha = 1;
    } else {
     this.addlines.bitmap.alpha = 0.5;
    }

    this.znlizi1.visible = false;
    this.tween10.paused = true;
    this.znlizi2.visible = false;
    this.tween11.paused = true;
    this.znlizi3.visible = false;
    this.tween12.paused = true;

    this.hlizi1.visible = false;
    this.tween13.paused = true;
    this.hlizi2.visible = false;
    this.tween14.paused = true;
    this.hlizi3.visible = false;
    this.tween15.paused = true;
    this.hlizi4.visible = false;
    this.tween16.paused = true;
    this.hlizi5.visible = false;
    this.tween17.paused = true;
    this.hlizi6.visible = false;
    this.tween18.paused = true;
    this.hlizi7.visible = false;
    this.tween19.paused = true;
    this.hlizi8.visible = false;
    this.tween20.paused = true;

  }

  handleClick3() {

    this.addtextCu.bitmap.visible = false;
    this.deletextCu.bitmap.visible = true;
    this.sheet.bitmap.visible = true;
    this.text2.visible = true;

    if ( this.text1.visible === true && this.text2.visible === true) {
      this.addlines.bitmap.alpha = 1;
    } else {
      this.addlines.bitmap.alpha = 0.5;
    }

  }

  handleClick4() {

    this.addtextCu.bitmap.visible = true;
    this.deletextCu.bitmap.visible = false;
    this.sheet.bitmap.visible = false;
    this.text2.visible = false;

    if ( this.text1.visible === true && this.text2.visible === true) {
      this.addlines.bitmap.alpha = 1;
    } else {
      this.addlines.bitmap.alpha = 0.5;
    }

  }

  handleClick5() {

    if ( this.text1.visible === true && this.text2.visible === true) {

      this.line.bitmap.visible = true;
      this.bulb.bitmap.visible = true;
      this.addlines.bitmap.visible = false;

      this.text1.visible = false;
      this.text2.visible = false;

      this.platecus.bitmap.visible = true;
      this.platezns.bitmap.visible = true;

      this.deletextZn.bitmap.visible = false;
      this.deletextCu.bitmap.visible = false;

      this.buttonOpen.bitmap.visible = true;
      this.buttonOpen2.bitmap.visible = true;
      this.buttonOpen3.bitmap.visible = true;

      this.defects.bitmap.visible = false;

      this.bubbles.bitmap.visible = false;
      this.bubbles2.bitmap.visible = false;

      this.dianzi.visible = true;
      this.tween.paused = false;

      setTimeout(() => {
        this.dianzi1.visible = true;
        this.tween1.paused = false;
      }, 800);
      setTimeout(() => {
        this.dianzi2.visible = true;
        this.tween2.paused = false;
      }, 1700);
      setTimeout(() => {
        this.dianzi3.visible = true;
        this.tween3.paused = false;
      }, 2400);
      setTimeout(() => {
        this.dianzi4.visible = true;
        this.tween4.paused = false;
      }, 3200);
      setTimeout(() => {
        this.dianzi5.visible = true;
        this.tween5.paused = false;
      }, 3900);
      setTimeout(() => {
        this.dianzi6.visible = true;
        this.tween6.paused = false;
      }, 4700);
      setTimeout(() => {
        this.dianzi7.visible = true;
        this.tween7.paused = false;
      }, 5470);
      setTimeout(() => {
        this.dianzi8.visible = true;
        this.tween8.paused = false;
      }, 6300);
      setTimeout(() => {
        this.dianzi9.visible = true;
        this.tween9.paused = false;
      }, 7300);

      clearTimeout(this.s);
      clearTimeout(this.t);


       setTimeout(() => {

        this.defects.bitmap.visible = true;

      }, 7000);

      this.b = setTimeout(() => {

        this.bubbles3.bitmap.visible = true;
        this.bubbles4.bitmap.visible = true;
      }, 5200);

      this.znlizi1.visible = false;
      this.tween10.paused = true;
      this.znlizi2.visible = false;
      this.tween11.paused = true;
      this.znlizi3.visible = false;
      this.tween12.paused = true;

      this.znlizi4.visible = true;
      this.tween21.paused = false;
      this.znlizi5.visible = true;
      this.tween22.paused = false;
      this.znlizi6.visible = true;
      this.tween23.paused = false;
      this.znlizi7.visible = true;
      this.tween24.paused = false;

      this.solizi1.visible = true;
      this.tween25.paused = false;
      this.solizi2.visible = true;
      this.tween26.paused = false;
      this.solizi3.visible = true;
      this.tween27.paused = false;
      this.solizi4.visible = true;
      this.tween28.paused = false;

      this.hlizi1.visible = false;
      this.tween13.paused = true;
      this.hlizi2.visible = false;
      this.tween14.paused = true;
      this.hlizi3.visible = false;
      this.tween15.paused = true;
      this.hlizi4.visible = false;
      this.tween16.paused = true;
      this.hlizi5.visible = false;
      this.tween17.paused = true;
      this.hlizi6.visible = false;
      this.tween18.paused = true;
      this.hlizi7.visible = false;
      this.tween19.paused = true;
      this.hlizi8.visible = false;
      this.tween20.paused = true;

      this.hlizi9.visible = true;
      this.tween29.paused = false;
      this.hlizi10.visible = true;
      this.tween30.paused = false;
      this.hlizi11.visible = true;
      this.tween31.paused = false;
      this.hlizi12.visible = true;
      this.tween32.paused = false;
      this.hlizi13.visible = true;
      this.tween33.paused = false;
      this.hlizi14.visible = true;
      this.tween34.paused = false;
      this.hlizi15.visible = true;
      this.tween35.paused = false;
      this.hlizi16.visible = true;
      this.tween36.paused = false;

      for (let i = 0; i < 9; i++) {
        console.log(this.bitmapArray[0].displayObject.visible = false,
          this.bitmapArray[1].displayObject.visible = false,
          this.bitmapArray[2].displayObject.visible = false);
      }

      this.initElectronics();
      this.initZncion();
      this.initHcion();
      this.intiSoAnimation();

    }

  }

  handleClick6() {

    this.buttonOpen.bitmap.visible = false;
    this.buttonClose.bitmap.visible = true;
    this.electrodes.bitmap.visible = true;
  }

  handleClick7() {

    this.buttonOpen.bitmap.visible = true;
    this.buttonClose.bitmap.visible = false;
    this.electrodes.bitmap.visible = false;
  }

  handleClick8() {

    this.buttonOpen2.bitmap.visible = false;
    this.buttonClose2.bitmap.visible = true;
    this.totals.bitmap.visible = true;
  }

  handleClick9() {

    this.buttonOpen2.bitmap.visible = true;
    this.buttonClose2.bitmap.visible = false;
    this.totals.bitmap.visible = false;

  }

  handleClick10() {

    this.buttonOpen3.bitmap.visible = false;
    this.buttonClose3.bitmap.visible = true;
    this.cathodes.bitmap.visible = true;

  }

  handleClick11() {

    this.buttonOpen3.bitmap.visible = true;
    this.buttonClose3.bitmap.visible = false;
    this.cathodes.bitmap.visible = false;

  }

}

class Beaker {

  bitmap: any;
  scale = 1;
  w: number;
  h: number;

  constructor(img: HTMLImageElement, container: any) {
    this.bitmap = new createjs.Bitmap(img);
    this.bitmap.scaleX = this.scale;
    this.bitmap.scaleY = this.scale;
    this.w = img.width * this.scale;
    this.h = img.height * this.scale;

    container.addChild(this.bitmap);
  }

  lt() {
    return {
      x: this.bitmap.x,
      y: this.bitmap.y + 10
    };
  }

  rb() {
    return {
      x: this.bitmap.x + this.w - 10,
      y: this.bitmap.y + this.h - 10
    };
  }


}


class AnimationObj {

  dx: any;
  dy: any;
  scale = 1;
  //容器对象
  container: any;
  hitContainer: any;
  //动画对象
  displayObject: any;

  radius = 36;

  paused = false;

  constructor(image: any, container: any, hitContainer: any, x?: number, y?: number, dx?: number, dy?: number) {
    this.container = container;
    this.hitContainer = hitContainer;
    this.displayObject = new createjs.Bitmap(image);
    this.displayObject.scaleX = this.scale;
    this.displayObject.scaleY = this.scale;
    this.container.addChild(this.displayObject);
    this.radius = this.displayObject.image.width * this.scale;

    this.displayObject.x = x;
    this.displayObject.y = y;

    this.dx = dx;
    this.dy = dy;
  }


  update(): void {
  if (this.paused === true) {
    return;
  }
    //判断范围
    if (this.displayObject.x + this.radius > this.hitContainer.rb().x  ||
      this.displayObject.x  < this.hitContainer.lt().x + 10) {
      this.dx = -this.dx;
    }

    if (this.displayObject.y + this.radius > this.hitContainer.rb().y ||
      this.displayObject.y  < this.hitContainer.lt().y) {
      this.dy = -this.dy;
    }
    this.displayObject.x += this.dx;
    this.displayObject.y += this.dy;

  }

  pause() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  hide() {
    this.displayObject.visible = false;
  }

}


