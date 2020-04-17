import Vue from 'vue';
import Component from 'vue-class-component';

import {ViewController} from '../../../../src/core/ViewController';
import {SytxydcViewHandler} from './services/SytxydcViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import * as RYZ from './sub_static/rongyezuo.png';
import * as RYY from './sub_static/rongyeyou.png';
import * as Cu from './sub_static/Cu.png';
import * as CuSo from './sub_static/CuSO.png';
import * as dengpao from './sub_static/dengpao.png';
import * as dpl from './sub_static/dengpaoliang.png';
import * as dianzi from './sub_static/dianzi.png';
import * as G from './sub_static/gaoguang.png';
import * as jlz from './sub_static/jializi.png';
import * as lizi from './sub_static/lizi.png';
import * as so from './sub_static/lsglizi.png';
import * as cl from './sub_static/lvlizi.png';
import * as q from './sub_static/xpqs.png';
import * as s from './sub_static/shaobei.png';
import * as tj from './sub_static/tjyq.png';
import * as tlz from './sub_static/tonglizi.png';
import * as xlz from './sub_static/xinlizi.png';
import * as yq from './sub_static/yanqiao.png';
import * as Z from './sub_static/Zn.png';
import * as S from './sub_static/ZnSO.png';
import * as xpqs from './sub_static/xpqs.png';
import * as yin from './sub_static/yinji.png';
import * as yang from './sub_static/yangji.png';
import * as zong from './sub_static/zfcs.png';
import * as fcs from './sub_static/fangchengshi.png';
import * as zk from './sub_static/zhankai.png';
import * as kb from './sub_static/kongbai.png';
import {CommonUtil} from '../../../../src/util/CommonUtil';

const createjs = require('createjs-npm');
const preloadjs = require('preload-js');

const Stage = createjs.Stage;

@Component
export class MainVueComponent extends Vue {

  //加载队列
  queue: any;
  //舞台
  stage: any;
  //容器
  container: any;
  //烧杯容器
  beakerBmp: any;
  //锌缺失
  xinqueshi: any;
  //左边溶液
  ryz: any;
  //右边溶液
  ryy: any;
  //灯泡
  dengpao: any;
  //灯泡亮
  dengpl: any;
  //离子图
  lizi: any;
  //锌离子图
  xin: any;
  //铜离子图
  tong: any;
  //硫酸锌
  lsx: any;
  //硫酸铜
  lst: any;
  //添加盐桥
  tjyq: any;
  //空白图
  kb: any;
  //负极
  fuji: any;
  //正极
  zhengji: any;
  //总方程式
  zfcs: any;
  //方程式按钮
  fcsan: any;
  fcsan1: any;
  fcsan2: any;
  //展开方程式按钮
  zhankai: any;
  zhankai1: any;
  zhankai2: any;
  //高亮图
  gaoliang: any;
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
  //氯离子
  cl: any;
  //氯离子1
  cl1: any;
  //氯离子2
  cl2: any;
  //氯离子3
  cl3: any;
  //氯离子4
  cl4: any;
  //钾离子
  k: any;
  //钾离子1
  k1: any;
  //钾离子2
  k2: any;
  //钾离子3
  k3: any;
  //钾离子4
  k4: any;
  //锌离子1
  xlz1: any;
  //锌离子2
  xlz2: any;
  //铜离子1
  tlz1: any;
  //铜离子2
  tlz2: any;
  // //盐桥
  yanqiao: any;
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
  //氯离子动画
  tween10: any;
  tween11: any;
  tween12: any;
  tween13: any;
  tween14: any;
  //钾离子动画
  tween15: any;
  tween16: any;
  tween17: any;
  tween18: any;
  tween19: any;
  //锌离子动画
  tween20: any;
  tween21: any;
  //铜离子动画
  tween22: any;
  tween23: any;

  w: any;
  h: any;

  bitmapArray: Array<any> = [];
  isMobile =  false;
  isIpad = false;

  created() {
    ViewController.getInstance(new SytxydcViewHandler(this));
  }

  mounted() {
    if (BrowserUtil.getBrowserInfo().isSmallDevice) {
      this.isMobile = true;
      const height = document.getElementById('box').clientHeight * 2.5 ;
      const width  = document.getElementById('box').clientWidth * 2.5;
      (document.getElementById('demoCanvas') as any).width = width ;
      (document.getElementById('demoCanvas') as any).height = height ;
      this.stage = new Stage('demoCanvas');
      this.w = this.stage.canvas.width;
      this.h = this.stage.canvas.height;

      this.container = new createjs.Container();
      this.stage.addChild(this.container);

    } else if (BrowserUtil.getBrowserInfo().isIpad) {
      this.isIpad  = true;
      const height = document.getElementById('box').clientHeight ;
      const width  = document.getElementById('box').clientWidth ;
      (document.getElementById('demoCanvas') as any).width = width ;
      (document.getElementById('demoCanvas') as any).height = height ;

      this.stage = new Stage('demoCanvas');

      this.w = this.stage.canvas.width;
      this.h = this.stage.canvas.height;

      this.container = new createjs.Container();
      this.stage.addChild(this.container);

    } else {
      const height = document.getElementById('box').clientHeight ;
      const width  = document.getElementById('box').clientWidth ;
      (document.getElementById('demoCanvas') as any).width = width ;
      (document.getElementById('demoCanvas') as any).height = height ;

      this.stage = new Stage('demoCanvas');

      this.w = this.stage.canvas.width;
      this.h = this.stage.canvas.height;

      this.container = new createjs.Container();
      this.stage.addChild(this.container);
    }
    ViewController.getInstance().domReady();
    this.initAnimation();
  }

  private initAnimation(): void {
    const manifest = [
      { src: Cu, id: 'C' },
      { src: RYZ, id: 'RZ' },
      { src: RYY, id: 'RY' },
      { src: CuSo, id: 'cuso' },
      { src: dengpao, id: 'dp' },
      { src: dpl, id: 'd' },
      { src: dianzi, id: 'dz' },
      { src: G, id: 'g' },
      { src: jlz, id: 'j' },
      { src: lizi, id: 'l' },
      { src: so, id: 'o' },
      { src: cl, id: 'c' },
      { src: q, id: 'qs' },
      { src: s, id: 'sb' },
      { src: tj, id: 't' },
      { src: tlz, id: 'z' },
      { src: xlz, id: 'x' },
      { src: yq, id: 'y' },
      { src: Z, id: 'Zn' },
      { src: S, id: 'ls' },
      { src: xpqs, id: 'xpqs'},
      { src: yin, id: 'fuji'},
      { src: yang, id: 'zhengji'},
      { src: zong, id: 'zong'},
      { src: fcs, id: 'fcs'},
      { src: zk, id: 'zk'},
      { src: kb, id: 'kb'}
    ];
    this.queue = new preloadjs.LoadQueue();
    this.queue.on('complete', this.handleComplete, this);
    this.queue.loadManifest(manifest);
  }

  //初始状态离子的自由运动
  private handleComplete(): void {
    this.initBeaker();

    const imgxin = this.queue.getResult('x');
    const imgliusuan = this.queue.getResult('o');
    const imgtong = this.queue.getResult('z');
    const imgArray = [imgxin, imgliusuan];
    for (let i = 1; i < 7; i++) {

      const dx = CommonUtil.getRandomInt(-1, 1, 1) / 10;
      const dy = CommonUtil.getRandomInt(-1, 1, 1) / 10;
      const x = CommonUtil.getRandomInt(this.ryz.lt().x + 10, this.ryz.rb().x - 40);
      const y = CommonUtil.getRandomInt(this.ryz.lt().y, this.ryz.rb().y - 40);

      const animationObj = new AnimationObj(imgArray[i % 2], this.container, this.ryz, x, y, dx, dy);
      this.bitmapArray.push(animationObj);
    }

    const imgArray1 = [imgtong, imgliusuan];
    for (let i = 1; i < 7; i++) {

      const dx1 = CommonUtil.getRandomInt(-1, 1, 2) / 10;
      const dy1 = CommonUtil.getRandomInt(-1, 1, 2) / 10;
      const x1 = CommonUtil.getRandomInt(this.ryy.lt1().x + 10, this.ryy.rb1().x - 40);
      const y1 = CommonUtil.getRandomInt(this.ryy.lt1().y, this.ryy.rb1().y - 40);

      const animationObj = new AnimationObj(imgArray1[i % 2], this.container, this.ryy, x1, y1, dx1, dy1);
      this.bitmapArray.push(animationObj);
    }
    this.initdianzi();
    this.initTick();
    this.initcl();
    this.initk();
    this.initzn();
    this.initcu();
    this.initclick();
    this.initchushi();
    this.initdzAnimation();
    this.initclAnimation();
    this.initkAnimation();
    this.initznAnimation();
    this.initcuAnimation();
  }


  //初始化所有电子及离子的位置
  initchushi() {
    //初始化电子位置
    this.dianzi.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi1.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi1.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi2.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi2.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi3.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi3.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi4.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi4.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi5.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi5.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi6.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi6.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi7.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi7.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi8.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi8.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi9.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi9.y = (this.h - this.beakerBmp.h) / 2 + 250;

    //初始化氯离子位置
    this.cl.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl1.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl1.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl2.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl2.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl3.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl3.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl4.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl4.y = (this.h - this.yanqiao.h ) / 2 - 45;

    //初始化钾离子位置
    this.k.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k1.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k1.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k2.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k2.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k3.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k3.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k4.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k4.y = (this.h - this.yanqiao.h ) / 2 - 45;

    //初始化锌离子位置
    this.xlz1.x = (this.w - this.ryz.w) / 2 + 85;
    this.xlz1.y = (this.h - this.ryz.h) / 2 + 90;
    this.xlz2.x = (this.w - this.ryz.w) / 2 + 85;
    this.xlz2.y = (this.h - this.ryz.h) / 2 + 90;

    //初始化铜离子的位置
    this.tlz1.x = (this.w - this.ryy.w) / 2 + 330 ;
    this.tlz1.y = (this.h - this.ryy.h) / 2 + 150 ;
    this.tlz2.x = (this.w - this.ryy.w) / 2 + 470;
    this.tlz2.y = (this.h - this.ryy.h) / 2 + 150;
  }
  
  //所有电子的创建
  initdianzi() {
    const dianziImg = this.queue.getResult('dz');
    this.dianzi = new createjs.Bitmap(dianziImg);
    this.dianzi.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi.visible = false;
    this.container.addChild(this.dianzi);

    const dianziImg1 =  this.queue.getResult('dz');
    this.dianzi1 = new createjs.Bitmap(dianziImg1);
    this.dianzi1.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi1.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi1.visible = false;
    this.container.addChild(this.dianzi1);

    const dianziImg2 =  this.queue.getResult('dz');
    this.dianzi2 = new createjs.Bitmap(dianziImg2);
    this.dianzi2.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi2.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi2.visible = false;
    this.container.addChild(this.dianzi2);

    const dianziImg3 =  this.queue.getResult('dz');
    this.dianzi3 = new createjs.Bitmap(dianziImg3);
    this.dianzi3.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi3.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi3.visible = false;
    this.container.addChild(this.dianzi3);

    const dianziImg4 =  this.queue.getResult('dz');
    this.dianzi4 = new createjs.Bitmap(dianziImg4);
    this.dianzi4.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi4.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi4.visible = false;
    this.container.addChild(this.dianzi4);

    const dianziImg5 =  this.queue.getResult('dz');
    this.dianzi5 = new createjs.Bitmap(dianziImg5);
    this.dianzi5.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi5.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi5.visible = false;
    this.container.addChild(this.dianzi5);

    const dianziImg6 =  this.queue.getResult('dz');
    this.dianzi6 = new createjs.Bitmap(dianziImg6);
    this.dianzi6.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi6.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi6.visible = false;
    this.container.addChild(this.dianzi6);

    const dianziImg7 =  this.queue.getResult('dz');
    this.dianzi7 = new createjs.Bitmap(dianziImg7);
    this.dianzi7.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi7.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi7.visible = false;
    this.container.addChild(this.dianzi7);

    const dianziImg8 =  this.queue.getResult('dz');
    this.dianzi8 = new createjs.Bitmap(dianziImg8);
    this.dianzi8.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi8.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi8.visible = false;
    this.container.addChild(this.dianzi8);

    const dianziImg9 =  this.queue.getResult('dz');
    this.dianzi9 = new createjs.Bitmap(dianziImg9);
    this.dianzi9.x = (this.w - this.beakerBmp.w) / 2 + 110;
    this.dianzi9.y = (this.h - this.beakerBmp.h) / 2 + 250;
    this.dianzi9.visible = false;
    this.container.addChild(this.dianzi9);
    this.initdzAnimation();
  }

  //所有电子动画的创建
  initdzAnimation() {
    this.tween = new createjs.Tween.get(this.dianzi, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween1 = new createjs.Tween.get(this.dianzi1, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween2 = new createjs.Tween.get(this.dianzi2, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween3 = new createjs.Tween.get(this.dianzi3, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween4 = new createjs.Tween.get(this.dianzi4, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween5 = new createjs.Tween.get(this.dianzi5, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween6 = new createjs.Tween.get(this.dianzi6, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween7 = new createjs.Tween.get(this.dianzi7, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween8 = new createjs.Tween.get(this.dianzi8, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);

    this.tween9 = new createjs.Tween.get(this.dianzi9, { loop: true, paused: true})
      .to({ y: (this.h - this.beakerBmp.h) / 2 - 7 }, 2500)
      .to({ x: (this.w - this.beakerBmp.w) / 2 + 420 }, 3000)
      .to({ y: (this.h - this.beakerBmp.h) / 2 + 250 }, 2500);
  }

  //所有氯离子的创建
  initcl() {
    const clImg = this.queue.getResult('c');
    this.cl = new createjs.Bitmap(clImg);
    this.cl.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl.visible = false;
    this.container.addChild(this.cl);

    const clImg1 = this.queue.getResult('c');
    this.cl1 = new createjs.Bitmap(clImg1);
    this.cl1.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl1.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl1.visible = false;
    this.container.addChild(this.cl1);

    const clImg2 = this.queue.getResult('c');
    this.cl2 = new createjs.Bitmap(clImg2);
    this.cl2.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl2.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl2.visible = false;
    this.container.addChild(this.cl2);

    const clImg3 = this.queue.getResult('c');
    this.cl3 = new createjs.Bitmap(clImg3);
    this.cl3.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl3.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl3.visible = false;
    this.container.addChild(this.cl3);

    const clImg4 = this.queue.getResult('c');
    this.cl4 = new createjs.Bitmap(clImg4);
    this.cl4.x = (this.w - this.yanqiao.w ) / 2 + 115;
    this.cl4.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.cl4.visible = false;
    this.container.addChild(this.cl4);
    this.initclAnimation();
  }

  //所有氯离子动画的创建
  initclAnimation() {
    this.tween10 = new createjs.Tween.get(this.cl, {loop: true, paused: true})
      .to({x: (this.w - this.yanqiao.w ) / 2 - 8 }, 3100)
      .to({y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween11 = new createjs.Tween.get(this.cl1, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 - 8 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween12 = new createjs.Tween.get(this.cl2, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 - 8 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween13 = new createjs.Tween.get(this.cl3, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 - 8 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween14 = new createjs.Tween.get(this.cl4, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 - 8 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);
  }

  //所有钾离子的创建
  initk() {
    const kImg = this.queue.getResult('j');
    this.k = new createjs.Bitmap(kImg);
    this.k.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k.visible = false;
    this.container.addChild(this.k);

    const kImg1 = this.queue.getResult('j');
    this.k1 = new createjs.Bitmap(kImg1);
    this.k1.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k1.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k1.visible = false;
    this.container.addChild(this.k1);

    const kImg2 = this.queue.getResult('j');
    this.k2 = new createjs.Bitmap(kImg2);
    this.k2.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k2.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k2.visible = false;
    this.container.addChild(this.k2);

    const kImg3 = this.queue.getResult('j');
    this.k3 = new createjs.Bitmap(kImg3);
    this.k3.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k3.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k3.visible = false;
    this.container.addChild(this.k3);

    const kImg4 = this.queue.getResult('j');
    this.k4 = new createjs.Bitmap(kImg4);
    this.k4.x = (this.w - this.yanqiao.w ) / 2 + 45;
    this.k4.y = (this.h - this.yanqiao.h ) / 2 - 45;
    this.k4.visible = false;
    this.container.addChild(this.k4);
    this.initkAnimation();
  }

  //所有钾离子动画的创建
  initkAnimation() {
    this.tween15 = new createjs.Tween.get(this.k, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 + 160 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween16 = new createjs.Tween.get(this.k1, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 + 160 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween17 = new createjs.Tween.get(this.k2, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 + 160 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween18 = new createjs.Tween.get(this.k3, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 + 160 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);

    this.tween19 = new createjs.Tween.get(this.k4, { loop: true, paused: true})
      .to({ x: (this.w - this.yanqiao.w ) / 2 + 160 }, 3100)
      .to({ y: (this.h - this.yanqiao.h ) / 2 + 150 }, 3600);
  }

  //添加盐桥后锌离子的创建
  initzn() {
    const xlzImg = this.queue.getResult('x');
    this.xlz1 = new createjs.Bitmap(xlzImg);
    this.xlz1.x = (this.w - this.ryz.w) / 2 + 85;
    this.xlz1.y = (this.h - this.ryz.h) / 2 + 90;
    this.xlz1.visible = false;
    this.container.addChild(this.xlz1);
    this.xlz1.alpha = 0;

    const xlzImg1 = this.queue.getResult('x');
    this.xlz2 = new createjs.Bitmap(xlzImg1);
    this.xlz2.x = (this.w - this.ryz.w) / 2 + 85;
    this.xlz2.y = (this.h - this.ryz.h) / 2 + 90;
    this.xlz2.visible = false;
    this.container.addChild(this.xlz2);
    this.xlz2.alpha = 0;
  }

  //添加盐桥后锌离子动画的创建
  initznAnimation() {
    this.tween20 = new createjs.Tween.get(this.xlz1, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({x: (this.w - this.ryz.w) / 2 + 10 , y: (this.h - this.ryz.h) / 2 + 150}, 2000)
      .to({alpha: 0}, 500)
      .call(() => {
        this.tween21.paused = false;
        this.tween20.paused = true;
        this.xlz1.visible = false;
        this.xlz2.visible = true;
      });

    this.tween21 = new createjs.Tween.get(this.xlz2, {loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.ryz.w) / 2 + 150 , y: (this.h - this.ryz.h) / 2 + 150 }, 2000)
      .to({alpha: 0}, 500)
      .call(() => {
        this.tween21.paused = true;
        this.tween20.paused = false;
        this.xlz2.visible = false;
        this.xlz1.visible = true;
      });
  }

  //添加盐桥后铜离子的创建
  initcu() {
    const tlzImg = this.queue.getResult('z');
    this.tlz1 = new createjs.Bitmap(tlzImg);
    this.tlz1.x = (this.w - this.ryy.w) / 2 + 330 ;
    this.tlz1.y = (this.h - this.ryy.h) / 2 + 150 ;
    this.tlz1.visible = false;
    this.container.addChild(this.tlz1);
    this.tlz1.alpha = 0;

    const tlzImg1 = this.queue.getResult('z');
    this.tlz2 = new createjs.Bitmap(tlzImg1);
    this.tlz2.x = (this.w - this.ryy.w) / 2 + 470;
    this.tlz2.y = (this.h - this.ryy.h) / 2 + 150;
    this.tlz2.visible = false;
    this.container.addChild(this.tlz2);
    this.tlz2.alpha = 0;
  }

  //添加盐桥后铜离子动画的创建
  initcuAnimation() {
    this.tween22 = new createjs.Tween.get(this.tlz1, { loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({x: (this.w - this.ryy.w) / 2 + 410 , y: (this.h - this.ryy.h) / 2 + 90}, 2000)
      .to({alpha: 0}, 500)
      .call(() => {
        this.tween23.paused = false;
        this.tween22.paused = true;
        this.tlz1.visible = false;
        this.tlz2.visible = true;
      });

    this.tween23 = new createjs.Tween.get(this.tlz2, {loop: true, paused: true})
      .to({alpha: 1}, 500)
      .to({ x: (this.w - this.ryy.w) / 2 + 410, y: (this.h - this.ryy.h) / 2 + 90 }, 2000)
      .to({alpha: 0}, 500)
      .call(() => {
        this.tween23.paused = true;
        this.tween22.paused = false;
        this.tlz2.visible = false;
        this.tlz1.visible = true;
      });
  }

  //创建所有点击事件的方法
  initclick() {
    this.kb.bitmap.addEventListener('click', this.handleClick);
    this.fcsan.bitmap.addEventListener('click', this.handleClick1);
    this.zhankai.bitmap.addEventListener('click', this.handleClick2);
    this.fcsan1.bitmap.addEventListener('click', this.handleClick3);
    this.zhankai1.bitmap.addEventListener('click', this.handleClick4);
    this.fcsan2.bitmap.addEventListener('click', this.handleClick5);
    this.zhankai2.bitmap.addEventListener('click', this.handleClick6);
  }

  //添加盐桥后的事件
  handleClick() {
    this.tjyq.bitmap.visible = false;
    this.kb.bitmap.visible = false;
    this.yanqiao.bitmap.visible = true;
    this.dengpao.bitmap.visible = false;
    this.dengpl.bitmap.visible = true;
    this.dianzi.visible = true;
    this.cl.visible = true;
    this.k.visible = true;
    this.tween.paused = false;
    setTimeout(() => {
      this.tween1.paused = false;
      this.dianzi1.visible = true;
    }, 800);
    setTimeout(() => {
      this.tween2.paused = false;
      this.dianzi2.visible = true;
    }, 1600);
    setTimeout(() => {
      this.tween3.paused = false;
      this.dianzi3.visible = true;
    }, 2400);
    setTimeout(() => {
      this.tween4.paused = false;
      this.dianzi4.visible = true;
    }, 3200);
    setTimeout(() => {
      this.tween5.paused = false;
      this.dianzi5.visible = true;
    }, 4000);
    setTimeout(() => {
      this.tween6.paused = false;
      this.dianzi6.visible = true;
    }, 4800);
    setTimeout(() => {
      this.tween7.paused = false;
      this.dianzi7.visible = true;
    }, 5600);
    setTimeout(() => {
      this.tween8.paused = false;
      this.dianzi8.visible = true;
    }, 6400);
    setTimeout(() => {
      this.tween9.paused = false;
      this.dianzi9.visible = true;
    }, 7200);
    this.tween10.paused = false;
    setTimeout(() => {
      this.tween11.paused = false;
      this.cl1.visible = true;
    }, 1300);
    setTimeout(() => {
      this.tween12.paused = false;
      this.cl2.visible = true;
    }, 2600);
    setTimeout(() => {
      this.tween13.paused = false;
      this.cl3.visible = true;
    }, 3900);
    setTimeout(() => {
      this.tween14.paused = false;
      this.cl4.visible = true;
    }, 5200);
    this.tween15.paused = false;
    setTimeout(() => {
      this.tween16.paused = false;
      this.k1.visible = true;
    }, 1300);
    setTimeout(() => {
      this.tween17.paused = false;
      this.k2.visible = true;
    }, 2600);
    setTimeout(() => {
      this.tween18.paused = false;
      this.k3.visible = true;
    }, 3900);
    setTimeout(() => {
      this.tween19.paused = false;
      this.k4.visible = true;
    }, 5200);
    setTimeout(() => {
      this.xinqueshi.bitmap.visible = true;
      this.beakerBmp.bitmap.visible = false;
    }, 6000);
    this.xlz1.visible = true;
    this.tlz1.visible = true;
    this.initdzAnimation();
    this.initclAnimation();
    this.initkAnimation();
    this.initznAnimation();
    this.initcuAnimation();
    this.tween20.paused = false;
    this.tween22.paused = false;
  }

  //点击负极按钮出现负极反应方程式
  handleClick1() {
    this.fuji.bitmap.visible = true;
    this.zhankai.bitmap.visible = true;
    this.fcsan.bitmap.visible = false;
  }

  //点击负极按钮负极反应方程式收起
  handleClick2() {
    this.fuji.bitmap.visible = false;
    this.zhankai.bitmap.visible = false;
    this.fcsan.bitmap.visible = true;
  }

  //点击总方程式按钮总反应方程式展开
  handleClick3() {
    this.zfcs.bitmap.visible = true;
    this.zhankai1.bitmap.visible = true;
    this.fcsan1.bitmap.visible = false;
  }

  //点击总方程式按钮总反应方程式收起
  handleClick4() {
    this.zfcs.bitmap.visible = false;
    this.zhankai1.bitmap.visible = false;
    this.fcsan1.bitmap.visible = true;
  }

  //点击正极按钮出现正极反应方程式
  handleClick5() {
    this.zhengji.bitmap.visible = true;
    this.zhankai2.bitmap.visible = true;
    this.fcsan2.bitmap.visible = false;
  }

  //点击正极按钮正极反应方程式收起
  handleClick6() {
    this.zhengji.bitmap.visible = false;
    this.zhankai2.bitmap.visible = false;
    this.fcsan2.bitmap.visible = true;
  }

  //初始化场景中的图片
  private initBeaker(): void {
    const yanqiao  = this.queue.getResult('y');
    this.yanqiao = new Beaker(yanqiao, this.container);
    this.yanqiao.bitmap.x = (this.w - this.yanqiao.w ) / 2;
    this.yanqiao.bitmap.y = (this.h - this.yanqiao.h ) / 2 - 40;
    this.yanqiao.bitmap.visible = false;

    const xinqueshi = this.queue.getResult('xpqs');
    this.xinqueshi = new Beaker(xinqueshi, this.container);
    this.xinqueshi.bitmap.x = (this.w - this.xinqueshi.w) / 2;
    this.xinqueshi.bitmap.y = (this.h - this.xinqueshi.h) / 2 - 1;
    this.xinqueshi.bitmap.visible = false;

    const shaobei = this.queue.getResult('sb');
    this.beakerBmp = new Beaker(shaobei, this.container);
    this.beakerBmp.bitmap.x = (this.w - this.beakerBmp.w) / 2;
    this.beakerBmp.bitmap.y = (this.h - this.beakerBmp.h) / 2;
    this.beakerBmp.bitmap.visible = true;

    const rongyezuo = this.queue.getResult('RZ');
    this.ryz = new Beaker(rongyezuo, this.container);
    this.ryz.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 9;
    this.ryz.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 155;

    const rongyey = this.queue.getResult('RY');
    this.ryy = new Beaker(rongyey, this.container);
    this.ryy.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 9;
    this.ryy.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 155;

    const dengpa  = this.queue.getResult('dp');
    this.dengpao = new Beaker(dengpa, this.container);
    this.dengpao.bitmap.x = (this.w - this.beakerBmp.w ) / 2 + 240;
    this.dengpao.bitmap.y = (this.h - this.beakerBmp.h ) / 2 - 75;
    this.dengpao.bitmap.visible = true;

    const dengpl  = this.queue.getResult('d');
    this.dengpl = new Beaker(dengpl, this.container);
    this.dengpl.bitmap.x = (this.w - this.beakerBmp.w ) / 2 + 225;
    this.dengpl.bitmap.y = (this.h - this.beakerBmp.h ) / 2 - 87;
    this.dengpl.bitmap.visible = false;

    const liz = this.queue.getResult('l');
    this.lizi = new Beaker(liz, this.container);
    this.lizi.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 640;
    this.lizi.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 70;

    const z = this.queue.getResult('Zn');
    this.xin = new Beaker(z, this.container);
    this.xin.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 10;
    this.xin.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 10;

    const c = this.queue.getResult('C');
    this.tong = new Beaker(c, this.container);
    this.tong.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 455;
    this.tong.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 10;

    const znso = this.queue.getResult('ls');
    this.lsx = new Beaker(znso, this.container);
    this.lsx.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 85;
    this.lsx.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 330;

    const cuso = this.queue.getResult('cuso');
    this.lst = new Beaker(cuso, this.container);
    this.lst.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 395;
    this.lst.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 330;

    const tjyq  = this.queue.getResult('t');
    this.tjyq = new Beaker(tjyq, this.container);
    this.tjyq.bitmap.x = (this.w - this.beakerBmp.w ) / 2 + 240;
    this.tjyq.bitmap.y = (this.h - this.beakerBmp.h ) / 2 + 160;

    const kongbai  = this.queue.getResult('kb');
    this.kb = new Beaker(kongbai, this.container);
    this.kb.bitmap.x = (this.w - this.beakerBmp.w ) / 2 + 240;
    this.kb.bitmap.y = (this.h - this.beakerBmp.h ) / 2 + 160;
    this.kb.bitmap.alpha = 0.01;

    const gaoliang = this.queue.getResult('g');
    this.gaoliang = new Beaker(gaoliang, this.container);
    this.gaoliang.bitmap.x = (this.w - this.beakerBmp.w) / 2 + 20;
    this.gaoliang.bitmap.y = (this.h - this.beakerBmp.h) / 2 + 105;

    const fcszk = this.queue.getResult('zk');
    this.zhankai = new Beaker(fcszk, this.container);
    this.zhankai.bitmap.x = (this.w - this.zhankai.w) / 2 - 330;
    this.zhankai.bitmap.y = (this.h - this.zhankai.h) / 2 + 50;
    this.zhankai.bitmap.visible = false;

    const fcsan = this.queue.getResult('fcs');
    this.fcsan = new Beaker(fcsan, this.container);
    this.fcsan.bitmap.x = (this.w - this.fcsan.w) / 2 - 330;
    this.fcsan.bitmap.y = (this.h - this.fcsan.h) / 2 + 50;
    this.fcsan.bitmap.visible = true;

    const fuji = this.queue.getResult('fuji');
    this.fuji = new Beaker(fuji, this.container);
    this.fuji.bitmap.x = (this.w - this.fuji.w) / 2 - 320;
    this.fuji.bitmap.y = (this.h - this.fuji.h) / 2  - 45;
    this.fuji.bitmap.visible = false;

    const fcszk1 = this.queue.getResult('zk');
    this.zhankai1 = new Beaker(fcszk1, this.container);
    this.zhankai1.bitmap.x = (this.w - this.zhankai1.w) / 2;
    this.zhankai1.bitmap.y = (this.h - this.zhankai1.h) / 2 + 290;
    this.zhankai1.bitmap.visible = false;

    const fcsan1 = this.queue.getResult('fcs');
    this.fcsan1 = new Beaker(fcsan1, this.container);
    this.fcsan1.bitmap.x = (this.w - this.fcsan1.w) / 2;
    this.fcsan1.bitmap.y = (this.h - this.fcsan1.h) / 2 + 290;
    this.fcsan1.bitmap.visible = true;

    const zfcs = this.queue.getResult('zong');
    this.zfcs = new Beaker(zfcs, this.container);
    this.zfcs.bitmap.x = (this.w - this.zfcs.w) / 2;
    this.zfcs.bitmap.y = (this.h - this.zfcs.h) / 2  + 210;
    this.zfcs.bitmap.visible = false;

    const fcszk2 = this.queue.getResult('zk');
    this.zhankai2 = new Beaker(fcszk2, this.container);
    this.zhankai2.bitmap.x = (this.w - this.zhankai2.w) / 2 + 330;
    this.zhankai2.bitmap.y = (this.h - this.zhankai2.h) / 2 + 50;
    this.zhankai2.bitmap.visible = false;

    const fcsan2 = this.queue.getResult('fcs');
    this.fcsan2 = new Beaker(fcsan2, this.container);
    this.fcsan2.bitmap.x = (this.w - this.fcsan2.w) / 2 + 330;
    this.fcsan2.bitmap.y = (this.h - this.fcsan2.h) / 2 + 50;
    this.fcsan2.bitmap.visible = true;

    const zhengji = this.queue.getResult('zhengji');
    this.zhengji = new Beaker(zhengji, this.container);
    this.zhengji.bitmap.x = (this.w - this.zhengji.w) / 2 + 350;
    this.zhengji.bitmap.y = (this.h - this.zhengji.h) / 2  - 45;
    this.zhengji.bitmap.visible = false;
  }

  private initTick(): void {
    createjs.Ticker.addEventListener('tick', this.tick);

  }

  private tick(): void {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
      //处理
    for (let i = 0; i < this.bitmapArray.length; i++) {
      this.bitmapArray[i].update();
      this.stage.update();  //刷新舞台
    }
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
            y: this.bitmap.y + 20
        };
    }

    rb() {
        return {
            x: this.bitmap.x + this.w / 2 - 70,
            y: this.bitmap.y + this.h - 20
        };
    }

    lt1() {
        return {
            x: this.bitmap.x  + 312,
            y: this.bitmap.y + 20
        };
    }

    rb1() {
        return {
            x: this.bitmap.x + this.w / 2 + 240,
            y: this.bitmap.y + this.h - 20
        };
    }

}

class AnimationObj {

    dx: any;
    dy: any;
    dx1: any;
    dy1: any;
    scale = 1;
    //容器对象
    container: any;
    hitContainer: any;
    //动画对象
    displayObject: any;

    radius = 16;

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
        this.dx1 = dx;
        this.dy1 = dy;
    }

    update(): void {
        //判断范围
        if (this.displayObject.x + this.radius > this.hitContainer.rb().x ||
            this.displayObject.x  < this.hitContainer.lt().x  + 20) {
             this.dx = -this.dx;
         }

         if (this.displayObject.y + this.radius > this.hitContainer.rb().y ||
             this.displayObject.y  < this.hitContainer.lt().y) {
             this.dy = -this.dy;
        }

        if (this.displayObject.x + this.radius > this.hitContainer.rb1().x ||
            this.displayObject.x  < this.hitContainer.lt1().x  + 20) {
            this.dx1 = -this.dx1;
        }

       if (this.displayObject.y + this.radius > this.hitContainer.rb1().y ||
            this.displayObject.y  < this.hitContainer.lt1().y) {
            this.dy1 = -this.dy1;
       }
        this.displayObject.x += this.dx;
        this.displayObject.y += this.dy;
        this.displayObject.x += this.dx1;
        this.displayObject.y += this.dy1;
    }

}

