/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {default as Konva, Group, ImageConfig, Layer, Stage} from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

import * as beakerBack from '../sub_static/beakerBack.png';
import * as beakerFront from '../sub_static/beakerFront.png';
import * as dropper from '../sub_static/dropper.png';
import * as waterDropper from '../sub_static/waterDropper.png';
import * as galvanometer from '../sub_static/galvanometer.png';
import * as needlesBg from '../sub_static/needlesBg.png';
import * as needles from '../sub_static/needles.png';

import * as h from '../sub_static/h.png';
import * as hDeep from '../sub_static/hDeep.png';
import * as o from '../sub_static/o.png';
import * as cl from '../sub_static/cl.png';



import {
  BackConstant, CLConfig,
  DropperConfig,
  FrontConstant,
  GalvanometerConfig, HConfig, MoleculePosition,
  NeedlesBgConfig,
  NeedlesConfig, OConfig, TipsConfig,
  WaterDropperConfig
} from './SddjConfig';
import {ViewController} from '../../../../../src/core/ViewController';


export class SddjCanvasAnimation extends SimpleKonvaTemplate {


    //初始动画 ，水分子a 和 b 的动画
    animationA: Konva.Tween;
    animationB: Konva.Tween;
    animationC: Konva.Tween;
    animationD: Konva.Tween;

    //水分子i，j的升温动画
    heatUpAnimationI: Konva.Tween;
    heatUpAnimationJ: Konva.Tween;

    //水分子不规则运动组
    animation1Group: Konva.Group;
    animation2Group: Konva.Group;

    //滴入HCl 动画

    animationCl1: Konva.Tween;
    animationCl2: Konva.Tween;
    animationCl3: Konva.Tween;

    animationClH1: Konva.Tween;
    animationClH2: Konva.Tween;
    animationClH3: Konva.Tween;

    //氯离子
    clImg: Konva.Image;
    clImg2: Konva.Image;
    clImg3: Konva.Image;

    clText: Konva.Text;
    clText2: Konva.Text;
    clText3: Konva.Text;

    clh1: Konva.Image;
    clh2: Konva.Image;
    clh3: Konva.Image;

    watterAnimation: Konva.Tween;

    temperatureDuration = 0.1;

    groupAnimation1: Konva.Tween;
    groupAnimation2: Konva.Tween;


    ehBottom: Konva.Image;
    fhBottom: Konva.Image;
    ghBottom: Konva.Image;
    hhBottom: Konva.Image;

    ahBottom: Konva.Image;
    bhBottom: Konva.Image;
    mhBottom: Konva.Image;

    khBottom: Konva.Image;
    lhBottom: Konva.Image;

    tipsGroup = new Konva.Group();
    tipsText: any[] = [];

    constructor() {
        super('box');
        this.initImage();
        this.createText();
    }

    async initImage() {

        /* 烧杯后面 */
        const backConfig =  {
            x: this.stage.getWidth() / 2 - BackConstant.width / 2,
            y: BackConstant.y,
            width: BackConstant.width,
            height: BackConstant.height,
        };

        const backImg = await this.loadImage((beakerBack as any), backConfig as ImageConfig);
        this.staticLayer.add(backImg);
        this.stage.add(this.staticLayer);


        /*电流计*/
        GalvanometerConfig.x = this.stage.getWidth() / 2 - GalvanometerConfig.width / 2;

        const galvanometerImg = await this.loadImage((galvanometer as any), GalvanometerConfig as any);
        this.staticLayer.add(galvanometerImg);
        this.stage.add(this.staticLayer);


        /* 烧杯前面 */
        FrontConstant.x = this.stage.getWidth() / 2 - FrontConstant.width / 2;
        const frontImg = await this.loadImage((beakerFront as any), FrontConstant as any);
        this.staticLayer.add(frontImg);
        this.stage.add(this.staticLayer);



        /* 滴管 */
        DropperConfig.x = this.stage.getWidth() / 2 - DropperConfig.width / 2;

        const dropImg = await this.loadImage((dropper as any), DropperConfig as any);
        this.staticLayer.add(dropImg);
        this.stage.add(this.staticLayer);

        /* 水滴 */
        WaterDropperConfig.x = this.stage.getWidth() / 2 - WaterDropperConfig.width / 2;

        const waterDropImg = await this.loadImage((waterDropper as any), WaterDropperConfig as any);
        this.animationLayer.add(waterDropImg);
        this.stage.add(this.animationLayer);

        /*指针背景*/
        NeedlesBgConfig.x = this.stage.getWidth() / 2 - NeedlesBgConfig.width / 2;

        const needlesBgConfigImg = await this.loadImage((needlesBg as any), NeedlesBgConfig as any);
        this.staticLayer.add(needlesBgConfigImg );
        this.stage.add(this.staticLayer);


        /* 指针 */
        NeedlesConfig.x = this.stage.getWidth() / 2 - NeedlesConfig.width / 2 + 4;

        const needlegImg = await this.loadImage((needles as any), NeedlesConfig as any);
        this.staticLayer.add(needlegImg );
        this.stage.add(this.staticLayer);
        this.createH2O();
        this.createHClAnimation();
        ViewController.getInstance().hideLoading();
    }


    /**
     * 创建水分子
     * @returns {Promise<void>}
     */
    async createH2O() {

        //水分子不规则运动，分两组动画
        this.animation1Group = new Konva.Group({ x: FrontConstant.x + 10, y: FrontConstant.y + 100}) ;
        this.animation2Group = new Konva.Group( {x: FrontConstant.x + 10, y: FrontConstant.y + 100}) ;

        this.animationLayer.add( this.animation1Group, this.animation2Group);
        this.stage.add(this.animationLayer);

        /* 创建第一个水分子k  */
        HConfig.x = MoleculePosition.k.hBottom.x;
        HConfig.y = MoleculePosition.k.hBottom.y;
        const ah1 = await this.loadImage((h as any), HConfig as any);

        ah1.cache();


        OConfig.x = MoleculePosition.k.o.x;
        OConfig.y = MoleculePosition.k.o.y;
        const ao = await this.loadImage((o as any), OConfig as any);
        ao.cache();

        const ah2 = ah1.clone({
            x: MoleculePosition.k.hTop.x ,
            y: MoleculePosition.k.hTop.y
        });



        this.animation1Group.add(ah1);
        this.animation1Group.add(ao);
        this.animation1Group.add(ah2);
        ah1.setZIndex(0);

        this.animation1Group.draw();

        /* 从k 克隆12个水分子出来  */
        const h2oArray = [
            MoleculePosition.a , MoleculePosition.b,  MoleculePosition.c, MoleculePosition.d,
            MoleculePosition.e, MoleculePosition.f, MoleculePosition.g, MoleculePosition.h,
            MoleculePosition.i, MoleculePosition.j, MoleculePosition.l ,  MoleculePosition.m,
            MoleculePosition.temp
        ];

        let hTop;
        let hBottom;
        let o1;


        for ( let i = 0; i < h2oArray.length; i++) {
            const h2oPosition = h2oArray[i];

            hTop =  ah1.clone(h2oPosition.hTop );
            hTop.cache();

           /* if ( i < 4 ||  i  === 8 || i === 9 ) {
                const target = {};
                Object.assign(target, HConfig, h2oPosition.hBottom );
                hBottom =  await this.loadImage((hDeep as any), target as any);
                hBottom.cache();
            } else {
                hBottom =  ah1.clone(h2oPosition.hBottom );
                hBottom.cache();
            }*/

            hBottom =  ah1.clone(h2oPosition.hBottom );
            hBottom.cache();


            o1 =  ao.clone(h2oPosition.o );
            o1.cache();

            //a到h 放在同一组，因为会有原子的运动动画
            if ( i > 7) {
                this.animation1Group.add(hBottom);
                this.animation1Group.add(o1);
                this.animation1Group.add(hTop);
            } else {
                this.animation2Group.add(hBottom);
                this.animation2Group.add(o1);
                this.animation2Group.add(hTop);
            }
        }


        const target = {};
        Object.assign(target, HConfig, MoleculePosition.e.h3 );
        this.ehBottom =  await this.loadImage((hDeep as any), target as any);
        this.ehBottom.visible(false);

        this.fhBottom = this.ehBottom.clone(MoleculePosition.f.h3);
        this.ghBottom = this.ehBottom.clone(MoleculePosition.g.h3);
        this.hhBottom = this.ehBottom.clone(MoleculePosition.h.h3);

        this.ahBottom = this.ehBottom.clone(MoleculePosition.clH1.to);
        this.bhBottom = this.ehBottom.clone(MoleculePosition.clH2.to);
        this.mhBottom = this.ehBottom.clone(MoleculePosition.clH3.to);

        this.khBottom = this.ehBottom.clone(MoleculePosition.k.h3);
        this.lhBottom = this.ehBottom.clone(MoleculePosition.l.h3);



        this.animation2Group.add(this.ehBottom);
        this.animation2Group.add(this.fhBottom);
        this.animation2Group.add(this.ghBottom);
        this.animation2Group.add(this.hhBottom);

        this.animation2Group.add(this.ahBottom);
        this.animation2Group.add(this.bhBottom);
        this.animation1Group.add(this.mhBottom);

        this.animation1Group.add(this.khBottom);
        this.animation1Group.add(this.lhBottom);







        /** 不规则运动动画 **/

        this.createGroupAnimation();
        this.createIndexAnimation();

        //console.log(group);
    }

    /**
     * 创建整体抖动动画
     */
    createGroupAnimation() {

        if (this.groupAnimation1) {
            this.groupAnimation1.reset();
            this.groupAnimation1.destroy();
        }
        if (this.groupAnimation2) {
            this.groupAnimation2.reset();
            this.groupAnimation2.destroy();
        }

        this.groupAnimation1 = new Konva.Tween({
            node: this.animation1Group,
            duration: this.temperatureDuration,
            y: this.animation1Group.y() + 3,
            repeat: -1,
            yoyo: true
        });
        this.groupAnimation1.play();

        this.groupAnimation2 = new Konva.Tween({
            node: this.animation2Group,
            duration: this.temperatureDuration,
            x: this.animation1Group.x() - 3,
            repeat: -1,
            yoyo: true
        });
        this.groupAnimation2.play();
    }


    /**
     * 创建初始化动画
     */
    createIndexAnimation() {
        const ahb = this.animationLayer.findOne('.ahb');
        const bhb = this.animationLayer.findOne('.bhb');
        const chb = this.animationLayer.findOne('.chb');
        const dhb = this.animationLayer.findOne('.dhb');


        const duration = 2;

        this.animationA = new Konva.Tween({
            node: ahb,
            duration: duration,
            x: MoleculePosition.e.h3.x,
            y: MoleculePosition.e.h3.y,
            onFinish: () => {
                this.ehBottom.visible(true);
                this.fhBottom.visible(true);
                this.ghBottom.visible(true);
                this.hhBottom.visible(true);
            }
        });

        this.animationB = new Konva.Tween({
            node: bhb,
            duration: duration,
            x: MoleculePosition.f.h3.x,
            y: MoleculePosition.f.h3.y
        });
        this.animationC = new Konva.Tween({
            node: chb,
            duration: duration,
            x: MoleculePosition.g.h3.x,
            y: MoleculePosition.g.h3.y
        });
        this.animationD = new Konva.Tween({
            node: dhb,
            duration: duration,
            x: MoleculePosition.h.h3.x,
            y: MoleculePosition.h.h3.y
        });

        this.animationA.play();
        this.animationB.play();
        this.animationC.play();
        this.animationD.play();

        this.createHeatAnimation();
    }

    /**
     * 创建温度变化动画
     */
    createHeatAnimation() {
        const ihb = this.animationLayer.findOne('.ihb');
        const jhb = this.animationLayer.findOne('.jhb');

        const duration = 2;

        this.heatUpAnimationI = new Konva.Tween({
            node: ihb,
            duration: duration,
            x: MoleculePosition.k.h3.x,
            y: MoleculePosition.k.h3.y,
            onFinish: () => {
                this.khBottom.visible(true);
                this.lhBottom.visible(true);
            }
        });

        this.heatUpAnimationJ = new Konva.Tween({
            node: jhb,
            duration: duration,
            x: MoleculePosition.l.h3.x,
            y: MoleculePosition.l.h3.y
        });

    }

    /**
     * 播放升温动画
     */
    playHeatUp() {
        this.heatUpAnimationI.play();
        this.heatUpAnimationJ.play();
        this.showGaAngle(15);

        this.temperatureDuration = 0.05;
        this.createGroupAnimation();

    }

    /**
     * 播放降温动画
     */
    playHeatDown() {


        this.khBottom.visible(false);
        this.lhBottom.visible(false);


        this.heatUpAnimationI.reverse();
        this.heatUpAnimationJ.reverse();
        this.showGaAngle(-15);

        this.temperatureDuration = 0.1;
        this.createGroupAnimation();
    }



    /**
     * 创建滴入氯化氢反应动画
     * @returns {Promise<void>}
     */
    async createHClAnimation() {

        /* cl原子 */
        this.clImg = await this.loadImage((cl as any), CLConfig as any);
        this.animation1Group.add(this.clImg);

        this.clImg2 = this.clImg.clone(MoleculePosition.cl2);
        this.animation1Group.add(this.clImg2);

        this.clImg3 = this.clImg.clone(MoleculePosition.cl3);
        this.animation1Group.add(this.clImg3);

        this.clText = new Konva.Text({
            x: CLConfig.to.x + 2,
            y: CLConfig.to.y + 2,
            text: 'Cl⁻',
            fontSize: 14,
            fill: 'black'
        });
        this.clText.visible(false);
        this.animation1Group.add(this.clText);

        this.clText2 = this.clText.clone({ x: MoleculePosition.cl2.x + 2, y: MoleculePosition.cl2.y + 2 });
        this.animation1Group.add(this.clText2);

        this.clText3 = this.clText2.clone({ x: MoleculePosition.cl3.x + 2, y: MoleculePosition.cl3.y + 2 });
        this.animation1Group.add(this.clText3);

        /* 创建第一个水分子k  */

       /* HConfig.x = clImg.x();
        HConfig.y = clImg.y();*/

        this.clh1 = await this.loadImage((h as any),
            { width : HConfig.width , height: HConfig.height} as any);
        this.clh1.opacity(0);
        this.animation2Group.add(this.clh1);
        this.clh1.cache();

        this.clh2 = this.clh1.clone(MoleculePosition.cl2);
        this.clh2.opacity(0);
        this.animation2Group.add(this.clh2);
        this.clh2.cache();

        this.clh3 = this.clh2.clone(MoleculePosition.cl3);
        this.clh3.opacity(0);
        this.animation1Group.add(this.clh3);




        const duration = 2;

        /* cl  运动动画*/
        this.clImg.y(-23);
        this.animationCl1 = new Konva.Tween({
            node: this.clImg,
            duration: duration,
            opacity: 1,
            x: CLConfig.to.x,
            y: CLConfig.to.y,
            onFinish: () => {
                this.clText.visible(true);
                this.clText2.visible(true);
                this.clText3.visible(true);

            }
        });

        this.clImg2.y(-23);
        this.animationCl2 = new Konva.Tween({
            node: this.clImg2,
            duration: duration,
            opacity: 1,
            x: MoleculePosition.cl2.x,
            y: MoleculePosition.cl2.y
        });

        this.clImg3.y(-23);
        this.animationCl3 = new Konva.Tween({
            node: this.clImg3,
            duration: duration,
            opacity: 1,
            x: MoleculePosition.cl3.x,
            y: MoleculePosition.cl3.y
        });


        /*this.animationCl1.play();
        this.animationCl2.play();
        this.animationCl3.play();*/


        /******* 氢原子动画 *******/

        this.clh1.y(-23);
        this.clh1.x(this.clImg.x());
        this.animationClH1 = new Konva.Tween({
            node: this.clh1,
            duration: duration,
            opacity: 1,
            x: MoleculePosition.clH1.to.x,
            y: MoleculePosition.clH1.to.y,
            onFinish : () => {
                this.ahBottom.visible(true);
                this.bhBottom.visible(true);
                this.mhBottom.visible(true);

                this.ghBottom.visible(true);
                this.hhBottom.visible(true);
            }
        });

        this.clh2.y(-23);
        this.clh2.x(this.clImg2.x());
        this.animationClH2 = new Konva.Tween({
            node: this.clh2,
            duration: duration,
            opacity: 1,
            x: MoleculePosition.clH2.to.x,
            y: MoleculePosition.clH2.to.y
        });

        this.clh3.y(-23);
        this.clh3.x(this.clImg3.x());
        this.animationClH3 = new Konva.Tween({
            node: this.clh3,
            duration: duration,
            opacity: 1,
            x: MoleculePosition.clH3.to.x,
            y: MoleculePosition.clH3.to.y
        });

       this.showGaAngle(45);
      /* this.animationClH1.play();
       this.animationClH2.play();
       this.animationClH3.play();*/

    }

    /***
     * 滴入氯化氢动画
     */
   playHClAnimation() {
        this.showGaAngle(-15);
        const dropperImg = this.staticLayer.findOne('#dropper');
        dropperImg.moveToTop();
        const watterDropper = this.animationLayer.findOne('#watterDropper');
        watterDropper.visible(true);
        dropperImg.visible(true);
        this.staticLayer.draw();

        if ( this.watterAnimation) {
            this.watterAnimation.play();
            return;
        }

        //显示水滴动画
        this.watterAnimation = new Konva.Tween({
            node: watterDropper,
            duration: 1,
            y: watterDropper.y() + 100,
            onFinish: () => {

                /** 动画结束隐藏水滴 **/
                dropperImg.visible(false);
                watterDropper.visible(false);
                this.staticLayer.draw();
                //this.watterAnimation.destroy();


                /** 动画结束 HCl动画开始 **/
                this.animationCl1.play();
                this.animationCl2.play();
                this.animationCl3.play();

                this.animationClH1.play();
                this.animationClH2.play();
                this.animationClH3.play();

                this.animationA.reverse();
                this.animationB.reverse();
                this.ehBottom.visible(false);
                this.fhBottom.visible(false);
            }
        });
        this.watterAnimation.play();

   }

    /**
     * 显示/隐藏电流计
     * @param {boolean} isShow
     */
    showGalvanometer(isShow: boolean) {
        const galvanometerImg = this.staticLayer.findOne('#galvanometer');
        const needlesBgImg = this.staticLayer.findOne('#needlesBg');
        const needlesImg = this.staticLayer.findOne('#needles');


       galvanometerImg.visible(isShow);
       needlesBgImg.visible(isShow);
       needlesImg.visible(isShow);

       // this.showGaAngle(40);
       this.staticLayer.draw();
    }


    showGaAngle(angleDiff: number) {
        const needlesImg = this.staticLayer.findOne('#needles');
        //console.log(needlesImg);
        needlesImg.rotate(angleDiff);
        this.staticLayer.draw();
    }

    async reset() {
        this.animationCl1.reset();
        this.animationCl2.reset();
        this.animationCl3.reset();

        this.animationClH1.reset();
        this.animationClH2.reset();
        this.animationClH3.reset();

        this.animationA.reset();
        this.animationB.reset();
        this.animationC.reset();
        this.animationD.reset();

        this.temperatureDuration = 0.1;
        this.createGroupAnimation();

        this.animationA.play();
        this.animationB.play();
        this.animationC.play();
        this.animationD.play();

        if ( this.watterAnimation) {
            this.watterAnimation.reset();
        }

   /*     console.log(this.watterAnimation);
        if ( this.watterAnimation) {

            this.watterAnimation.reset();
        }*/

        this.clImg.y(-23);
        this.clImg2.y(-23);
        this.clImg3.y(-23);
        this.clImg.opacity(0);
        this.clImg2.opacity(0);
        this.clImg3.opacity(0);


        this.clh1.x(this.clImg.x());
        this.clh1.y(-23);
        this.clh1.opacity(0);


        this.clh2.x(this.clImg2.x());
        this.clh2.y(-23);
         this.clh2.opacity(0);

        this.clh3.x(this.clImg3.x());
        this.clh3.y(-23);
        this.clh3.opacity(0);


        const watter = this.animationLayer.findOne('#watterDropper');
        watter.position(WaterDropperConfig);
        watter.visible(false);

        const dropperImg = this.staticLayer.findOne('#dropper');
        dropperImg.visible(false);
        this.staticLayer.draw();

        this.heatUpAnimationJ.reset();
        this.heatUpAnimationI.reset();

        //const needlegImg = await this.loadImage((needles as any), NeedlesConfig as any);
        this.staticLayer.findOne('#needles').rotation(45);
        this.staticLayer.draw();

        this.clText.visible(false);
        this.clText2.visible(false);
        this.clText3.visible(false);

        /*  this.staticLayer.add(needlegImg );
          this.staticLayer.removeName()
          this.stage.add(this.staticLayer);*/

        this.ehBottom.visible(false);
        this.fhBottom.visible(false);
        this.ghBottom.visible(false);
        this.hhBottom.visible(false);

        this.ahBottom.visible(false);
        this.bhBottom.visible(false);
        this.mhBottom.visible(false);

        this.khBottom.visible(false);
        this.lhBottom.visible(false);

    }

    /*创建提示文字*/
    createText() {
      this.tipsText.push(new Konva.Text({text: '滴加HCI水的电离程度变小', x: TipsConfig.tipsPosition.x,
        y: TipsConfig.tipsPosition.y, fontSize: TipsConfig.tipsSize}));
      this.tipsText.push(new Konva.Text({text: '灵敏电流计指针发生偏转,\n表明纯水中存在导电的粒子。', x: TipsConfig.tipsPosition.x,
        y: TipsConfig.tipsPosition.y, fontSize: TipsConfig.tipsSize}));
      this.tipsText.push(new Konva.Text({text: '温度升高,水的\n电离速率加快,电离\n程度变大', x: TipsConfig.tipsPosition.x,
        y: TipsConfig.tipsPosition.y, fontSize: TipsConfig.tipsSize}));
      for (let i = 0; i < this.tipsText.length; i++) {
        this.tipsGroup.add(this.tipsText[i]);
        this.tipsText[i].visible(false);
      }
      this.staticLayer.add(this.tipsGroup);
    }

    /*显示文字*/
    isShowText(value: number) {
        for (let i = 0; i < this.tipsText.length; i++) {
            this.tipsText[i].visible(false);
            if (i === value) {
               this.tipsText[i].visible(true);
            }
        }
      this.staticLayer.draw();
    }




}
