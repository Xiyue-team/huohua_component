/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-20 上午10:05
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

import bg from '../sub_static/background.png';
import ZLZ from '../sub_static/ZLZ.png';
import hsjt from '../sub_static/HSJT.png';
import huisjt from '../sub_static/HuiSJT.png';
import lsjt from '../sub_static/LSJT.png';
import O from '../sub_static/O.png';
import play from '../sub_static/play.png';
import {ImageUtil} from '../../../../../src/util/ImageUtil';

const createjs = require('createjs-npm');
const preloadjs = require('preload-js');

const Stage = createjs.Stage;

export class ElectronViewHandler extends CommonViewHandler implements ViewHandler {

    imgMap: any;
    //控制重置按钮功能
    ctrl = false;

    //舞台
    stage: any;
    //容器
    container: any;

    //磁场
    background: any;

    devicePixelRatio = 2;

    //正离子
    private positiveion: any;

    //正离子动画容器
    private positiveion1: any;
    private positiveion2: any;
    private positiveion3: any;
    private positiveion4: any;
    private positiveion5: any;

    //灰色箭头
    private grayArrow: any;

    //动画对象
    animation1: any;
    animation2: any;
    animation3: any;
    animation4: any;
    animation5: any;

    //蓝色箭头
    private blueArrow: any;
    private blueArrowContainer: any;

    private blueArrow1: any;
    private blueArrowContainer1: any;

    private blueArrow2: any;
    private blueArrowContainer2: any;

    //红色箭头
    private redArrow: any;
    private redArrowContainer: any;

    private redArrow1: any;
    private redArrowContainer1: any;


    //辅助线及圆心的容器
    dashlineContainer: any;
    dashlineContainer1: any;

    //开始按钮
    private play: any;

    //弧
    arc1: any;
    arc2: any;
    arc3: any;
    arc4: any;
    arc5: any;

    w: any;
    h: any;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        this.initResources();
    }

    private async initResources()  {
        this.initContainer();
        const manifest = [
            {src: bg, id: 'bg'},
            {src: ZLZ, id: 'ZLZ'},
            {src: hsjt, id: 'hsjt'},
            {src: huisjt, id: 'huisjt'},
            {src: lsjt, id: 'lsjt'},
            {src: O, id: 'O'},
            {src: play, id: 'play'},
        ];
        this.imgMap = await ImageUtil.loadImages(manifest);
        this.handleComplete();
    }

    private handleComplete(): void {

        this.loadMagneticBg();
        this.loadgrayArrow();
        this.initArc();
        this.initBlueArrow();
        this.initRedArrow();
        this.loadpositiveion();
        this.createDashLine();
        this.loadPlay();
        this.loadPositiveionAnimationContainer();
        this.animation1 = this.initAnimation(this.arc1.graphics.command, this.blueArrowContainer, this.positiveion1, -Math.PI / 2, 1, 2000);
        this.animation2 = this.initAnimation(this.arc2.graphics.command, this.redArrowContainer,
            this.positiveion2, Math.PI / 2 - (47 * Math.PI / 180), 4, 2000);
        this.animation3 = this.initAnimation(this.arc3.graphics.command, this.redArrowContainer1, this.positiveion3, -Math.PI / 2, 2, 1800);
        this.animation4 = this.initAnimation(this.arc4.graphics.command, this.blueArrowContainer1, this.positiveion4 ,
            20 * Math.PI / 180, 3, 1500);
        this.animation5 = this.initAnimation(this.arc5.graphics.command, this.blueArrowContainer2, this.positiveion5
            , 63 * Math.PI / 180, 5, 1200);
        //初始化场景
        this.redArrow.visible = false;
        this.blueArrow.visible = false;
        this.positiveion1.visible = false;
        this.positiveion2.visible = false;
        this.dashlineContainer.visible = false;
        this.dashlineContainer1.visible = false;
        this.positiveion3.visible = false;
        this.redArrow1.visible = false;
        this.positiveion4.visible = false;
        this.blueArrowContainer1.visible = false;
        this.positiveion5.visible = false;
        this.blueArrowContainer2.visible = false;

        this.play.addEventListener('click', () => {
            this.play.visible = false;
            this.grayArrow.visible = false;
            this.positiveion.visible = false;
            this.blueArrow.visible = true;
            this.positiveion1.visible = true;
            this.viewModel.$data.ctrl = false;
            this.animationCtrl(1);
            this.viewModel.$data.sliderOption.disabled = true;
        });
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
        const background    = this.imgMap['bg'];
        this.background = new createjs.Bitmap(background);
        this.background.x = this.w / 2 - background.width / 2;
        this.background.y = this.h / 2 + background.height  / 2  - 125;
        this.container.addChild(this.background);
        this.stage.update();
    }

    //创建播放按钮
    private loadPlay() {
        // 创建play按钮绑定初始事件
        const playt = this.imgMap['play'];
        this.play = new createjs.Bitmap(playt);
        this.play.x = this.w / 2 - playt.width / 2;
        this.play.y =  this.h / 2 + playt.height / 2;
        this.stage.addChild(this.play);
    }

    //加载灰色箭头
    loadgrayArrow() {
        const huisjtt = this.imgMap['huisjt'];
        this.grayArrow = new createjs.Bitmap(huisjtt);
        this.grayArrow.x = this.background.x - 20;
        this.grayArrow.y = this.background.y + 175;
        this.container.addChild(this.grayArrow);
    }

    //加载正离子

    loadpositiveion() {
        const zlzt = this.imgMap['ZLZ'];
        this.positiveion = new createjs.Bitmap(zlzt);
        this.positiveion.regX = zlzt.width / 2;
        this.positiveion.regY = zlzt.height / 2;
        this.positiveion.x = this.background.x - zlzt.width / 2;
        this.positiveion.y = this.background.y + 200;
        this.container.addChild(this.positiveion);
    }

    //动画正离子
    loadPositiveionAnimationContainer() {
        const zlzt = this.imgMap['ZLZ'];
        this.positiveion1 = new createjs.Bitmap(zlzt);
        this.positiveion1.regX = zlzt.width / 2;
        this.positiveion1.regY = zlzt.height / 2;
        this.positiveion1.x = 30 * 2 - zlzt.width ;
        this.positiveion1.y = 30 * 2;
        this.blueArrowContainer.addChild(this.positiveion1);

        this.positiveion2 = new createjs.Bitmap(zlzt);
        this.positiveion2.regX = zlzt.width / 2;
        this.positiveion2.regY = zlzt.height / 2;
        this.positiveion2.x = - zlzt.width / 2  ;
        this.positiveion2.y = 304 * 2;
        this.redArrowContainer.addChild(this.positiveion2);

        this.positiveion3 = new createjs.Bitmap(zlzt);
        this.positiveion3.regX = zlzt.width / 2;
        this.positiveion3.regY = zlzt.height / 2;
        this.positiveion3.x = 0  ;
        this.positiveion3.y = 47 * 2;
        this.redArrowContainer1.addChild(this.positiveion3);

        this.positiveion4 = new createjs.Bitmap(zlzt);
        this.positiveion4.regX = zlzt.width / 2;
        this.positiveion4.regY = zlzt.height / 2;
        this.positiveion4.x = - zlzt.width / 2;
        this.positiveion4.y = 150 * 2;
        this.blueArrowContainer1.addChild(this.positiveion4);

        this.positiveion5 = new createjs.Bitmap(zlzt);
        this.positiveion5.regX = zlzt.width / 2;
        this.positiveion5.regY = zlzt.height / 2;
        this.positiveion5.x = - zlzt.width / 2;
        this.positiveion5.y = 500 * 2;
        this.blueArrowContainer2.addChild(this.positiveion5);
    }

    //初始画弧线
    initArc() {
        this.arc1 = new createjs.Shape();
        this.arc1.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc1.graphics.arc(this.background.x, this.background.y + 140, 30 * this.devicePixelRatio,  Math.PI / 2, Math.PI / 2 , true );
        this.container.addChild(this.arc1);

        this.arc2 = new createjs.Shape();
        this.arc2.graphics.ss(8, 0, 0, 0, true).s('#FF4747');
        this.arc2.graphics.arc(this.background.x, this.background.y - 409, 304 * this.devicePixelRatio,
            Math.PI / 2, Math.PI / 2, true );
        this.container.addChild(this.arc2);

        //第二条相切弧线
        this.arc3 = new createjs.Shape();
        this.arc3.graphics.ss(8, 0, 0, 0, true).s('#FF4747');
        this.arc3.graphics.arc(this.background.x, this.background.y + 105, 47 * this.devicePixelRatio,
            Math.PI / 2, Math.PI / 2, true );
        this.container.addChild(this.arc3);

        //第二条蓝色弧线
        this.arc4 = new createjs.Shape();
        this.arc4.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc4.graphics.arc(this.background.x, this.background.y - 100, 150 * this.devicePixelRatio,
            Math.PI / 2, Math.PI / 2, true );
        this.container.addChild(this.arc4);

        this.arc5 = new createjs.Shape();
        this.arc5.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc5.graphics.arc(this.background.x, this.background.y - 800, 500 * this.devicePixelRatio,
            Math.PI / 2, Math.PI / 2, true );
        this.container.addChild(this.arc5);
    }

    //初始化蓝色箭头
    initBlueArrow() {
        this.blueArrowContainer = new createjs.Container();
        this.blueArrowContainer1 = new createjs.Container();
        this.blueArrowContainer2 = new createjs.Container();
        const blueArrowImg =  this.imgMap['lsjt'];
        this.blueArrow = new createjs.Bitmap(blueArrowImg);
        this.blueArrow.rotation = 90;
        this.blueArrow.x = blueArrowImg.height;
        this.blueArrow.y = 30 * 2 - blueArrowImg.width / 2;
        this.blueArrowContainer.x = this.background.x;
        this.blueArrowContainer.y = this.background.y + 140;
        this.blueArrowContainer.addChild(this.blueArrow);

        this.blueArrow1 = new createjs.Bitmap(blueArrowImg);
        this.blueArrow1.rotation = 90;
        this.blueArrow1.x = blueArrowImg.height;
        this.blueArrow1.y = 150 * 2 - blueArrowImg.width / 2;
        this.blueArrowContainer1.x = this.background.x;
        this.blueArrowContainer1.y = this.background.y - 100;
        this.blueArrowContainer1.addChild(this.blueArrow1);

        this.blueArrow2 = new createjs.Bitmap(blueArrowImg);
        this.blueArrow2.rotation = 90;
        this.blueArrow2.x = blueArrowImg.height;
        this.blueArrow2.y = 500 * 2 - blueArrowImg.width / 2;
        this.blueArrowContainer2.x = this.background.x;
        this.blueArrowContainer2.y = this.background.y - 800;
        this.blueArrowContainer2.addChild(this.blueArrow2);

        this.container.addChild(this.blueArrowContainer1);
        this.container.addChild(this.blueArrowContainer2);
        this.container.addChild(this.blueArrowContainer);
    }

    //初始化红色箭头
    initRedArrow() {
        this.redArrowContainer = new createjs.Container();
        this.redArrowContainer1 = new createjs.Container();

        const redArrowImg = this.imgMap['hsjt'];

        this.redArrow = new createjs.Bitmap(redArrowImg);
        this.redArrow.rotation = 90;
        this.redArrow.x = redArrowImg.height;
        this.redArrow.y = 304 * 2 - redArrowImg.width / 2;
        this.redArrowContainer.x = this.background.x;
        this.redArrowContainer.y = this.background.y - 409;
        this.redArrowContainer.addChild(this.redArrow);

        this.redArrow1 = new createjs.Bitmap(redArrowImg);
        this.redArrow1.rotation = 90;
        this.redArrow1.x = redArrowImg.height;
        this.redArrow1.y = 47 * 2 - redArrowImg.width / 2;
        this.redArrowContainer1.x = this.background.x;
        this.redArrowContainer1.y = this.background.y + 105;
        this.redArrowContainer1.addChild(this.redArrow1);

        this.container.addChild(this.redArrowContainer);
        this.container.addChild(this.redArrowContainer1);
    }

    //创建辅助线 和O点
    createDashLine() {
        this.dashlineContainer = new createjs.Container();
        this.dashlineContainer1 = new createjs.Container();
        const dashLine1 = this.createDashLineHelp(this.background.x, this.background.y - 409, this.background.x, this.background.y + 200);
        const dashLine2 = this.createDashLineHelp(this.background.x, this.background.y - 409,
            this.background.x + 450, this.background.y);
        const dashLine3 = this.createDashLineHelp(this.background.x, this.background.y + 105, this.background.x, this.background.y + 200);
        //字母O
        const oimg = this.imgMap['O'];
        const oObj = new createjs.Bitmap(oimg);
        oObj.x = this.background.x - 50;
        oObj.y = this.background.y - 409;

        const oObj1 = new createjs.Bitmap(oimg);
        oObj1.x = this.background.x - 50;
        oObj1.y = this.background.y - 105;

        //圆心点
        const g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.beginFill(createjs.Graphics.getRGB(0, 0, 0));
        g.drawCircle(0, 0, 6);
        const point = new createjs.Shape(g);
        point.x = this.background.x;
        point.y = this.background.y - 409;

        const point1 = new createjs.Shape(g);
        point1.x = this.background.x;
        point1.y = this.background.y + 105;

        this.dashlineContainer.addChild(point);
        this.dashlineContainer.addChild(dashLine1);
        this.dashlineContainer.addChild(dashLine2);
        this.dashlineContainer.addChild(oObj);
        this.dashlineContainer.addChild(point);
        this.dashlineContainer1.addChild(dashLine3);
        this.dashlineContainer1.addChild(oObj1);
        this.dashlineContainer1.addChild(point1);
        this.container.addChild(this.dashlineContainer1);
        this.container.addChild(this.dashlineContainer);
    }

    //创建虚线的工具类
    createDashLineHelp(startX: number, startY: number, endX: number, endY: number) {
       const line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        line.graphics.setStrokeDash([20, 10], 10);
        line.graphics.beginStroke('#999999');
        line.graphics.moveTo(startX, startY);
        line.graphics.lineTo(endX, endY);
        line.graphics.endStroke();
        return line;
    }

    //初始化动画方法
    private initAnimation(target: any, rotateObj: any, rotateObj2: any , endAngle: number, num: number, time: number): void {
        //动态修改endAngle
    const animation = createjs.Tween.get(target, {paused: true})
            .to({endAngle: endAngle}, time);

           animation.call(() => {
               this.viewModel.$data.sliderOption.disabled = false;
               switch (num) {
                   case 1:
                       this.positiveion1.visible = false;
                       break;
                   case 2:
                       this.positiveion3.visible = false;
                       this.dashlineContainer1.visible = true;
                       break;
                   case 3:
                       this.positiveion4.visible = false;
                       break;
                   case 4:
                       this.positiveion2.visible = false;
                       this.dashlineContainer.visible = true;
                       break;
                   case 5:
                       this.positiveion5.visible = false;
                       break;
               }
               this.positiveion.visible = true;
               this.grayArrow.visible = true;
           })
           .addEventListener('change', (event: any) => {
               const angle = event.currentTarget.target.endAngle * 180 / Math.PI;
               //判断控制动画
               rotateObj.rotation = angle - 90;
               rotateObj2.rotation = -angle ;
           });
       return animation;
    }

    //控制动画播放的方法
    animationCtrl(ctr: number) {
        const num = 0.4;
        switch (ctr) {
            case 1:
                this.blueArrowContainer.visible = true;
                this.viewModel.$data.sliderOption.disabled = true;
                this.grayArrow.visible = false;
                this.positiveion1.visible = true;
                this.positiveion.visible = false;
                this.dashlineContainer.visible = false;
                this.dashlineContainer1.visible = false;
                this.arc1.alpha = 1;
                this.blueArrow.alpha = 1;
                this.arc2.alpha = num;
                this.redArrow.alpha = num;
                this.arc3.alpha = num;
                this.redArrow1.alpha = num;
                this.arc4.alpha = num;
                this.blueArrow1.alpha = num;
                this.arc5.alpha = num;
                this.blueArrow2.alpha = num;
                this.arc1.graphics.command.endAngle = Math.PI / 2;
                this.animation1 = this.initAnimation(this.arc1.graphics.command, this.blueArrowContainer,
                    this.positiveion1, -Math.PI / 2 , ctr, 2000);
                this.animation1.paused = false;
                break;
            case 2:
                this.ctrl = true;
                this.redArrowContainer1.visible = true;
                this.viewModel.$data.sliderOption.disabled = true;
                this.grayArrow.visible = false;
                this.positiveion3.visible = true;
                this.positiveion.visible = false;
                this.dashlineContainer.visible = false;
                this.dashlineContainer1.visible = false;
                this.redArrow1.visible = true;
                this.arc1.alpha = num;
                this.blueArrow.alpha = num;
                this.arc2.alpha = num;
                this.redArrow.alpha = num;
                this.arc3.alpha = 1;
                this.redArrow1.alpha = 1;
                this.arc4.alpha = num;
                this.blueArrow1.alpha = num;
                this.arc5.alpha = num;
                this.blueArrow2.alpha = num;
                this.arc3.graphics.command.endAngle = Math.PI / 2;
                this.animation3 = this.initAnimation(this.arc3.graphics.command, this.redArrowContainer1,
                    this.positiveion3, -Math.PI / 2, ctr, 2000);
                this.animation3.paused = false;
                break;
            case 3:
                this.ctrl = true;
                this.blueArrowContainer1.visible = true;
                this.viewModel.$data.sliderOption.disabled = true;
                this.grayArrow.visible = false;
                this.positiveion4.visible = true;
                this.positiveion.visible = false;
                this.dashlineContainer.visible = false;
                this.dashlineContainer1.visible = false;
                this.blueArrow1.visible = true;
                this.arc1.alpha = num;
                this.blueArrow.alpha = num;
                this.arc2.alpha = num;
                this.redArrow.alpha = num;
                this.arc3.alpha = num;
                this.redArrow1.alpha = num;
                this.arc4.alpha = 1;
                this.blueArrow1.alpha = 1;
                this.arc5.alpha = num;
                this.blueArrow2.alpha = num;
                this.arc4.graphics.command.endAngle = Math.PI / 2;
                this.animation4 = this.initAnimation(this.arc4.graphics.command, this.blueArrowContainer1,
                    this.positiveion4 , 20 * Math.PI / 180, ctr, 1800);
                this.animation4.paused = false;
                break;
            case 4:
                this.ctrl = true;
                this.redArrowContainer.visible = true;
                this.viewModel.$data.sliderOption.disabled = true;
                this.grayArrow.visible = false;
                this.positiveion2.visible = true;
                this.positiveion.visible = false;
                this.dashlineContainer.visible = false;
                this.dashlineContainer1.visible = false;
                this.redArrow.visible = true;
                this.arc1.alpha = num;
                this.blueArrow.alpha = num;
                this.arc2.alpha = 1;
                this.redArrow.alpha = 1;
                this.arc3.alpha = num;
                this.redArrow1.alpha = num;
                this.arc4.alpha = num;
                this.blueArrow1.alpha = num;
                this.arc5.alpha = num;
                this.blueArrow2.alpha = num;
                this.arc2.graphics.command.endAngle = Math.PI / 2;
                this.animation2 = this.initAnimation(this.arc2.graphics.command, this.redArrowContainer,
                    this.positiveion2, Math.PI / 2 - (47 * Math.PI / 180), ctr, 1500);
                this.animation2.paused = false;
                break;
            case 5:
                this.ctrl = true;
                this.blueArrowContainer2.visible = true;
                this.viewModel.$data.sliderOption.disabled = true;
                this.grayArrow.visible = false;
                this.positiveion5.visible = true;
                this.positiveion.visible = false;
                this.dashlineContainer.visible = false;
                this.dashlineContainer1.visible = false;
                this.blueArrow2.visible = true;
                this.arc1.alpha = num;
                this.blueArrow.alpha = num;
                this.arc2.alpha = num;
                this.redArrow.alpha = num;
                this.arc3.alpha = num;
                this.redArrow1.alpha = num;
                this.arc4.alpha = num;
                this.blueArrow1.alpha = num;
                this.arc5.alpha = 1;
                this.blueArrow2.alpha = 1;
                this.arc5.graphics.command.endAngle = Math.PI / 2;
                this.animation5 = this.initAnimation(this.arc5.graphics.command, this.blueArrowContainer2, this.positiveion5
                , 63 * Math.PI / 180, ctr, 1200);
                this.animation5.paused = false;
                break;
        }
    }

    private initTick(): void {
        createjs.Ticker.addEventListener('tick', (e: any) => {
            this.tick(e);
        });
    }

    private tick(e: any): void {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if (e.paused !== 1) {
            this.stage.update();  //刷新舞台
        } else {
        }
    }

    resetOpacity() {
    }

    reset () {
        createjs.Tween.removeAllTweens();
        this.viewModel.$data.ctrl = true;
        this.viewModel.$data.sliderOption.disabled = true;
        this.play.visible = true;
        this.arc1.graphics.command.endAngle = Math.PI / 2;
        this.arc2.graphics.command.endAngle = Math.PI / 2;
        this.arc3.graphics.command.endAngle = Math.PI / 2;
        this.arc4.graphics.command.endAngle = Math.PI / 2;
        this.arc5.graphics.command.endAngle = Math.PI / 2;
        this.blueArrow.visible = false;
        this.blueArrow1.visible = false;
        this.blueArrow2.visible = false;
        this.redArrow.visible = false;
        this.redArrow1.visible = false;
        this.grayArrow.visible = true;
        this.positiveion.visible = true;
        this.positiveion1.visible = false;
        this.positiveion2.visible = false;
        this.positiveion3.visible = false;
        this.positiveion4.visible = false;
        this.positiveion5.visible = false;

        this.dashlineContainer.visible = false;
        this.dashlineContainer1.visible = false;
        this.viewModel.$data.slidernumber = 1;
    }
}
