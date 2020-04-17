/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-20 上午10:05
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

import magneticBg from '../sub_static/magneticField@2x.png';
import electronImg from '../sub_static/electron@2x.png';
import redArrowImg from '../sub_static/redArrow@2x.png';
import blueArrowImg from '../sub_static/blueArrow@2x.png';
import greyArrowImg from '../sub_static/greyArrow@2x.png';
//redArrow@2x.png

import aImg from '../sub_static/a@2x.png';
import bImg from '../sub_static/b@2x.png';
import cImg from '../sub_static/c@2x.png';
import dImg from '../sub_static/d@2x.png';
import oImg from '../sub_static/o@2x.png';
import vImg from '../sub_static/v@2x.png';
import {ElectronTrack} from './ElectronTrack';
import {ViewModel} from '../ViewModel';
import {ImageUtil} from '../../../../../src/util/ImageUtil';


const createjs = require('createjs-npm');
const preloadjs = require('preload-js');

const Stage = createjs.Stage;
const Shape = createjs.Shape;

export class ElectronViewHandler extends CommonViewHandler implements ViewHandler {

    //舞台
    stage: any;
    //容器
    container: any;

    //磁场
    magneticBmp: any;

    devicePixelRatio = 2;

    //红色箭头
   /* redArwBmp: any;
    redArwContainer: any;*/

    //电子
    electronBmp: any;

    elcTrack1: any;
    elcTrack2: any;
    elcTrack3: any;
    elcTrack4: any;
    elcTrack5:  any;

    w: any;
    h: any;

    imageMap: any;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        const resources = [magneticBg, electronImg, greyArrowImg, aImg, bImg, cImg, dImg, oImg, vImg, redArrowImg, blueArrowImg];
        console.log(resources.length);
        this.initResources();
    }

     async initResources() {
        this.initContainer();
        const manifest = [
            {src: magneticBg as any,   id: 'magnetic'},
            {src: electronImg,  id: 'electron'},
            {src: greyArrowImg, id: 'greyArrow'},
            {src: aImg, id: 'a'},
            {src: bImg, id: 'b'},
            {src: cImg, id: 'c'},
            {src: dImg, id: 'd'},
            {src: oImg, id: 'o'},
            {src: vImg, id: 'v'},
            {src: redArrowImg, id: 'redArrow'},
            {src: blueArrowImg, id: 'blueArrow'}
        ];

        this.imageMap = await ImageUtil.loadImages(manifest);
        this.handleComplete();
        console.log(this.imageMap);
      /*  this.queue = new preloadjs.LoadQueue();
        this.queue.on('complete', () => {

        }, this);
        this.queue.loadManifest(manifest);*/
    }

    private handleComplete(): void {

        this.loadMagneticBg();
        this.initStaticRes();
        this.createCircle();
        //电子最后添加
        this.stage.addChild(this.electronBmp);

    }

    private createCircle() {
        const parentContainer = new createjs.Container();

        //圆心所在的虚线
        /*const  line2  = new  createjs.Shape();
        line2.graphics.beginStroke('#999999').ss(4).sd([20, 15], 0)
            .moveTo(0, 0)
            .lineTo(400, 0);*/



        //虚线
        const  line  = new  createjs.Shape();
        line.graphics.beginStroke('#999999').ss(4).sd([20, 15], 0)
            .moveTo(0, - 950)
            .lineTo(0, - 16);
        parentContainer.addChild(line);

        //创建对应圆弧以及箭头
        const redArrow = this.imageMap['redArrow'];
        const blueArrow = this.imageMap['blueArrow'];

        //最小内切圆轨迹
        this.elcTrack2 = new ElectronTrack(60, '#FF4747', redArrow, this.devicePixelRatio, 2500 , 295, this.electronBmp);
        //this.elcTrack.play();
        parentContainer.addChild(this.elcTrack2.arc);
        parentContainer.addChild(this.elcTrack2.dashArc);

        parentContainer.addChild(this.elcTrack2.arwContainer);

        //最大内切圆轨迹
        this.elcTrack4 = new ElectronTrack(180, '#FF4747', redArrow, this.devicePixelRatio, 2000, 150, this.electronBmp);
        //this.elcTrack2.play();
        parentContainer.addChild(this.elcTrack4.arc);
        parentContainer.addChild(this.elcTrack4.dashArc);

        parentContainer.addChild(this.elcTrack4.arwContainer);



        this.elcTrack1 = new ElectronTrack(30, '#0199FF', blueArrow, this.devicePixelRatio, 3000, 290, this.electronBmp);
        //this.elcTrack3.play();
        parentContainer.addChild(this.elcTrack1.arc);
        parentContainer.addChild(this.elcTrack1.dashArc);
        //parentContainer.addChild(this.elcTrack1.centerPoint);
        parentContainer.addChild(this.elcTrack1.arwContainer);

        this.elcTrack3 = new ElectronTrack(100, '#0199FF', blueArrow, this.devicePixelRatio, 2000, 174, this.electronBmp);
        //this.elcTrack4.play();
        parentContainer.addChild(this.elcTrack3.arc);
        parentContainer.addChild(this.elcTrack3.dashArc);
        //parentContainer.addChild(this.elcTrack3.centerPoint);
        parentContainer.addChild(this.elcTrack3.arwContainer);

        this.elcTrack5 = new ElectronTrack(230, '#0199FF', blueArrow, this.devicePixelRatio, 500, 34, this.electronBmp);
        //this.elcTrack5.play();
        parentContainer.addChild(this.elcTrack5.dashArc);
        parentContainer.addChild(this.elcTrack5.arc);
        //parentContainer.addChild(this.elcTrack5.centerPoint);
        parentContainer.addChild(this.elcTrack5.arwContainer);

        parentContainer.x = this.electronBmp.x + this.electronBmp.image.width / 2;
        parentContainer.y = this.electronBmp.y + this.electronBmp.image.height / 2;
        parentContainer.rotation = 60;

        parentContainer.addChild(this.elcTrack2.centerPoint);
        parentContainer.addChild(this.elcTrack4.centerPoint);

        this.stage.addChild(parentContainer);
        //this.stage.addChild(this.redArwContainer);


    }



    /**
     * 初始化静态资源
     */
    private initStaticRes() {
        const aImage = this.imageMap['a'];
        const bImage = this.imageMap['b'];
        const cImage = this.imageMap['c'];
        const dImage = this.imageMap['d'];
        const oImage = this.imageMap['o'];

        const electronImage   = this.imageMap['electron'];
        const greyArwImage    = this.imageMap['greyArrow'];


        const aBmp  = new createjs.Bitmap(aImage);
        const bBmp  = new createjs.Bitmap(bImage);
        const cBmp  = new createjs.Bitmap(cImage);
        const dBmp  = new createjs.Bitmap(dImage);
        const oBmp  = new createjs.Bitmap(oImage);

        const arwBmp  = new createjs.Bitmap(greyArwImage);
        const greyArwContainer = new createjs.Container();

        //电子图片
        this.electronBmp   = new createjs.Bitmap(electronImage);
        this.electronBmp.visible = true;
        this.electronBmp.x = this.magneticBmp.x - electronImage.width / 2;
        this.electronBmp.y = this.magneticBmp.y + this.magneticBmp.image.height / 2  - electronImage.height / 2;



        //setTimeout(() => {

            //this.container.addChild(this.electronBmp);
        //},  2000);

        //this.container.addChild(this.electronBmp);
        //this.electronBmp.parent.setChildIndex(this.electronBmp, 999);  //n为设置的层级
        //字母图片
        aBmp.x = this.magneticBmp.x - 40;
        aBmp.y = this.magneticBmp.y - 40;

        bBmp.x = this.magneticBmp.x + this.magneticBmp.image.width + 20 ;
        bBmp.y = this.magneticBmp.y - 40;

        cBmp.x = this.magneticBmp.x + this.magneticBmp.image.width + 20 ;
        cBmp.y = this.magneticBmp.y + this.magneticBmp.image.height + 20 ;

        dBmp.x = this.magneticBmp.x - 40;
        dBmp.y = this.magneticBmp.y + this.magneticBmp.image.height + 20 ;

        oBmp.x = this.magneticBmp.x - 80;
        oBmp.y = this.magneticBmp.y + this.magneticBmp.image.height / 2  - oBmp.image.height / 2  ;

        //力的方向箭头容器
        greyArwContainer.x = this.electronBmp.x + this.electronBmp.image.width / 2  + 26 ;
        greyArwContainer.y = this.electronBmp.y + this.electronBmp.image.height / 2  - greyArwImage.height / 2 + 20;

        //力的度数
        const arc = new createjs.Shape();
        arc.graphics.ss(4, 0, 0, 0, true).s('#000') ;
        //arc.graphics.sd([20, 15], 0).s('#FF4747').setStrokeStyle(8);
        arc.graphics.arc(0, 0, 50 * this.devicePixelRatio,   0, Math.PI / 6 );
        arc.y = this.electronBmp.image.height / 2 - 10;

        const angleTxt = new createjs.Text('30°', '36px Arial', '#000');
        angleTxt.rotation = -60;
        angleTxt.y = 74;
        angleTxt.x = 100;

        greyArwContainer.addChild(angleTxt);

        greyArwContainer.addChild(arc);
        greyArwContainer.addChild(arwBmp);
        greyArwContainer.rotation = 60 ;
        this.stage.addChild(greyArwContainer);



        /*const  line  = new  createjs.Shape();
        line.graphics.beginStroke('#999999').ss(4).sd([20, 15], 0)
            .moveTo(838, 150)
            .lineTo(this.electronBmp.x + this.electronBmp.image.width / 2 , this.electronBmp.y + this.electronBmp.image.height / 2);


        this.container.addChild(line);*/
        this.container.addChild(aBmp);
        this.container.addChild(bBmp);
        this.container.addChild(cBmp);
        this.container.addChild(dBmp);
        this.container.addChild(oBmp);

    }

    private initContainer(): void {
        const height = document.getElementById('magneticContainer').clientHeight;
        const width  = document.getElementById('magneticContainer').clientWidth;
        const magneticCanvasDom = document.getElementById('magneticCanvas') as HTMLCanvasElement;

        magneticCanvasDom.width = width * this.devicePixelRatio;
        magneticCanvasDom.height = height * this.devicePixelRatio;

        magneticCanvasDom.style.width = width + 'px'  ;
        magneticCanvasDom.style.height = height + 'px'   ;

        this.stage = new Stage('magneticCanvas');
        this.w = this.stage.canvas.width;
        this.h = this.stage.canvas.height;


        this.container = new createjs.Container();
        this.stage.addChild(this.container);

        this.initTick();


    }

    private loadMagneticBg() {
        //创建磁场背景
        const magnetic    = this.imageMap['magnetic'];
        console.log(this.queue);

        this.magneticBmp = new createjs.Bitmap(magnetic);

        this.magneticBmp.x = (this.w - magnetic.width ) / 2;
        this.magneticBmp.y = (this.h - magnetic.height ) / 2;
        this.container.addChild(this.magneticBmp);

        this.stage.update();

        //创建边框
        /*const maskShape = new createjs.Shape(new createjs.Graphics().setStrokeStyle(8).f('#fff').s('#000')
            .drawRect(this.magneticBmp.x, this.magneticBmp.y, magnetic.width, magnetic.height));

        this.container.addChild(maskShape);*/

    }



    private initTick(): void {

        createjs.Ticker.addEventListener('tick', (e: any) => {
            this.tick(e);
        });

    }

    private tick(e: any): void {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if (e.paused !== 1) {
            //this.redArwContainer.rotation += 5;
            this.stage.update();  //刷新舞台
        } else {

        }
    }


    reset() {
        (this.viewModel as ViewModel).reset = true;
        (this.viewModel as ViewModel).disableSlider = true;
        (this.viewModel as ViewModel).showImg = true;
        (this.viewModel as ViewModel).speedModel = 1;
        setTimeout(() => {
            createjs.Tween.removeAllTweens();
        } , 30);

        this.electronBmp.visible =  true;
        this.elcTrack1.reset();
        this.elcTrack2.reset();
        this.elcTrack3.reset();
        this.elcTrack4.reset();
        this.elcTrack5.reset();
    }

}
