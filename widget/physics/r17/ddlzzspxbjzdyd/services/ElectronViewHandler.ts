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
import FLZ from '../sub_static/FLZ.png';
import hsjt from '../sub_static/HSJT.png';
import huisjt from '../sub_static/HuiSJT.png';
import jiaodutheta from '../sub_static/jiaoduct.png';
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

    //负离子
    private negativeIon: any;

    //负离子旋转对象
    moveNegativeIon1: any;
    moveNegativeIon2: any;
    moveNegativeIon3: any;
    moveNegativeIon4: any;
    moveNegativeIon5: any;

    //灰色箭头
    private grayArrow: any;

    //theta角
    private thetaAngle: any;

    //蓝色箭头
    private blueArrow1: any;
    private blueArrowContainer1: any;
    private blueArrow2: any;
    private blueArrowContainer2: any;
    private blueArrow3: any;
    private blueArrowContainer3: any;
    private blueArrow4: any;
    private blueArrowContainer4: any;

    //红色箭头
    private redArrow: any;
    private redArrowContainer: any;

    //元素内容区
    private elementContainer: any;

    //辅助线及圆心的容器
    dashlineContainer: any;

    //开始按钮
    private play: any;

    //弧
    arc1: any;
    arc2: any;
    arc3: any;
    arc4: any;
    arc5: any;

    //动画
    private animation1: any;
    private animation2: any;
    private animation3: any;
    private animation4: any;
    private animation5: any;

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
            {src: FLZ, id: 'FLZ'},
            {src: hsjt, id: 'hsjt'},
            {src: huisjt, id: 'huisjt'},
            {src: jiaodutheta, id: 'jiaodutheta'},
            {src: lsjt, id: 'lsjt'},
            {src: O, id: 'O'},
            {src: play, id: 'play'},
        ];
        this.imgMap = await ImageUtil.loadImages(manifest);
        this.handleComplete();
    }

    private handleComplete(): void {

        this.loadMagneticBg();


        //创建轨迹弧线
        this.arc1 = new createjs.Shape();
        this.arc1.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc1.graphics.arc(this.negativeIon.x + 165, this.negativeIon.y, 55 * this.devicePixelRatio,  -Math.PI, -Math.PI );

        this.arc2 = new createjs.Shape();
        this.arc2.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc2.graphics.arc(this.negativeIon.x + 238, this.negativeIon.y, 91 * this.devicePixelRatio,  -Math.PI, -Math.PI );

        this.arc3 = new createjs.Shape();
        this.arc3.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc3.graphics.arc(this.negativeIon.x + 310, this.negativeIon.y, 127 * this.devicePixelRatio,  -Math.PI, -Math.PI );

        this.arc4 = new createjs.Shape();
        this.arc4.graphics.ss(8, 0, 0, 0, true).s('#FF4747');
        this.arc4.graphics.arc(this.negativeIon.x + 375, this.negativeIon.y, 160 * this.devicePixelRatio,  -Math.PI, -Math.PI );

        this.arc5 = new createjs.Shape();
        this.arc5.graphics.ss(8, 0, 0, 0, true).s('#0199FF');
        this.arc5.graphics.arc(this.negativeIon.x + 446, this.negativeIon.y, 196 * this.devicePixelRatio,  -Math.PI, -Math.PI );

        this.elementContainer.addChild(this.arc1);
        this.elementContainer.addChild(this.arc2);
        this.elementContainer.addChild(this.arc3);
        this.elementContainer.addChild(this.arc4);
        this.elementContainer.addChild(this.arc5);

        // 创建play按钮绑定初始事件
        const playt = this.imgMap['play'];
        this.play = new createjs.Bitmap(playt);
        this.play.regX = playt.width / 2;
        this.play.regY = playt.height / 2;
        this.play.x = this.w / 2;
        this.play.y = this.h / 2;
        this.stage.addChild(this.play);

        //加载蓝色箭头红色箭头动画负离子
        this.loadBlueArrow();
        this.loadRedArrow();
        this.addNegativeIonAnimationToContainer();

        // 将画弧的命令传入动画中，动态改变endAngle 初始化动画
       this.animation1 = this.initAnimation(this.arc1.graphics.command, this.blueArrowContainer1, this.moveNegativeIon1, 1);
       // this.animation2 = this.initAnimation(this.arc2.graphics.command, this.blueArrowContainer2, this.moveNegativeIon2, 2);
       // this.animation3 = this.initAnimation(this.arc3.graphics.command, this.blueArrowContainer3, this.moveNegativeIon3, 3);
       // this.animation4 = this.initAnimation(this.arc4.graphics.command, this.redArrowContainer , this.moveNegativeIon4, 4);
       // this.animation5 = this.initBigAnimation(this.arc5.graphics.command, this.blueArrowContainer4, this.moveNegativeIon5);

        this.play.addEventListener('click', () => {
            this.play.visible = false;
            this.moveNegativeIon1.visible = true;
            this.animationControl(1);
            this.viewModel.$data.sliderOption.disabled = true;
        });
        this.blueArrowContainer1.visible = false;
        this.blueArrowContainer2.visible = false;
        this.blueArrowContainer3.visible = false;
        this.blueArrowContainer4.visible = false;
        this.redArrowContainer.visible = false;
        this.dashlineContainer.visible = false;
        //将不动的负离子加入容器
        this.elementContainer.addChild(this.negativeIon);

    }

    animationControl(val: number) {
        const number = 0.4;
        this.thetaAngle.visible = false;
        this.grayArrow.visible = false;
        this.negativeIon.visible = false;
        switch (true) {
            case val === 1:
                this.blueArrow1.visible = true;
                this.arc1.graphics.command.endAngle =  -Math.PI;
                this.animation1 = this.initAnimation(this.arc1.graphics.command, this.blueArrowContainer1, this.moveNegativeIon1, 1 , 3000);
                this.blueArrowContainer1.visible = true;
                this.animation1.paused = false;
                this.moveNegativeIon1.visible = true;
                this.dashlineContainer.visible = false;
                this.blueArrow1.alpha = 1;
                this.blueArrow2.alpha = number;
                this.blueArrow3.alpha = number;
                this.blueArrow4.alpha = number;
                this.redArrow.alpha = number;
                this.arc1.alpha = 1;
                this.arc2.alpha = number;
                this.arc3.alpha = number;
                this.arc4.alpha = number;
                this.arc5.alpha = number;
                break;
            case val === 2:
                this.blueArrow2.visible = true;
                this.arc2.graphics.command.endAngle =  -Math.PI;
                this.animation2 = this.initAnimation(this.arc2.graphics.command, this.blueArrowContainer2, this.moveNegativeIon2, 2, 2500);
                this.blueArrowContainer2.visible = true;
                this.animation2.paused = false;
                this.moveNegativeIon2.visible = true;
                this.dashlineContainer.visible = false;
                this.blueArrow1.alpha = number;
                this.blueArrow2.alpha = 1;
                this.blueArrow3.alpha = number;
                this.blueArrow4.alpha = number;
                this.redArrow.alpha = number;
                this.arc1.alpha = number;
                this.arc2.alpha = 1;
                this.arc3.alpha = number;
                this.arc4.alpha = number;
                this.arc5.alpha = number;
                break;
            case val === 3:
                this.blueArrow3.visible = true;
                this.arc3.graphics.command.endAngle =  -Math.PI;
                this.animation3 = this.initAnimation(this.arc3.graphics.command, this.blueArrowContainer3, this.moveNegativeIon3, 3, 2300);
                this.blueArrowContainer3.visible = true;
                this.animation3.paused = false;
                this.moveNegativeIon3.visible = true;
                this.dashlineContainer.visible = false;
                this.blueArrow1.alpha = number;
                this.blueArrow2.alpha = number;
                this.blueArrow3.alpha = 1;
                this.blueArrow4.alpha = number;
                this.redArrow.alpha = number;
                this.arc1.alpha = number;
                this.arc2.alpha = number;
                this.arc3.alpha = 1;
                this.arc4.alpha = number;
                this.arc5.alpha = number;
                break;
            case val === 4:
                this.redArrow.visible = true;
                this.arc4.graphics.command.endAngle =  -Math.PI;
                this.animation4 = this.initAnimation(this.arc4.graphics.command, this.redArrowContainer , this.moveNegativeIon4, 4, 2200);
                this.redArrowContainer.visible = true;
                this.animation4.paused = false;
                this.moveNegativeIon4.visible = true;
                this.dashlineContainer.visible = false;
                this.blueArrow1.alpha = number;
                this.blueArrow2.alpha = number;
                this.blueArrow4.alpha = number;
                this.blueArrow3.alpha = number;
                this.redArrow.alpha = 1;
                this.arc1.alpha = number;
                this.arc2.alpha = number;
                this.arc3.alpha = number;
                this.arc4.alpha = 1;
                this.arc5.alpha = number;
                break;
            case val === 5:
                this.blueArrow4.visible = true;
                this.arc5.graphics.command.endAngle =  -Math.PI;
                this.animation5 = this.initBigAnimation(this.arc5.graphics.command, this.blueArrowContainer4, this.moveNegativeIon5, 800);
                this.blueArrowContainer4.visible = true;
                this.animation5.paused = false;
                this.moveNegativeIon5.visible = true;
                this.dashlineContainer.visible = false;
                this.blueArrow1.alpha = number;
                this.blueArrow2.alpha = number;
                this.blueArrow3.alpha = number;
                this.blueArrow4.alpha = 1;
                this.redArrow.alpha = number;
                this.arc1.alpha = number;
                this.arc2.alpha = number;
                this.arc3.alpha = number;
                this.arc4.alpha = number;
                this.arc5.alpha = 1;
                break;
        }


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
        this.elementContainer = new createjs.Container();
        this.stage.addChild(this.container);
        this.stage.addChild(this.elementContainer);
        this.initTick();


    }

    private loadMagneticBg() {
        //创建磁场背景
        const background    = this.imgMap['bg'];

        const backgroundHelp = new createjs.Bitmap(background);
        backgroundHelp.x = 0;
        backgroundHelp.y = 0;
        backgroundHelp.rotation = -45;

        this.elementContainer.addChild(backgroundHelp);

        this.elementContainer.x = this.w / 2 - background.width / 2;
        this.elementContainer.y = this.h / 2 - background.height / 2;

        this.loadArrowAndTheta();
        this.loadNegativeIon();
        //辅助线创建位置
        this.createDashLine();

        this.elementContainer.rotation = 45;
        this.stage.update();
    }

    //加载灰色箭头theta角
    loadArrowAndTheta() {
        const huisjtt = this.imgMap['huisjt'];
        const theta = this.imgMap['jiaodutheta'];
        this.grayArrow = new createjs.Bitmap(huisjtt);
        this.thetaAngle = new createjs.Bitmap(theta);
        this.grayArrow.rotation = -90;
        this.grayArrow.x = 85;
        this.grayArrow.y = 110;
        this.thetaAngle.rotation = -45;
        this.thetaAngle.x = 25;
        this.thetaAngle.y = 20;
        this.elementContainer.addChild(this.grayArrow);
        this.elementContainer.addChild(this.thetaAngle);
    }

    //加载负离子

    loadNegativeIon() {
        const flzt = this.imgMap['FLZ'];
        this.negativeIon = new createjs.Bitmap(flzt);
        this.negativeIon.rotation = -45;
        this.negativeIon.x = 60;
        this.negativeIon.y = 110;
    }

    //讲负离子动画添加导容器
    addNegativeIonAnimationToContainer() {

        const flzt = this.imgMap['FLZ'];
        this.moveNegativeIon1 = new createjs.Bitmap(flzt);
        this.moveNegativeIon1.regX = flzt.width / 2;
        this.moveNegativeIon1.regY = flzt.height / 2;
        this.moveNegativeIon1.x = -55 * 2 ;
        this.moveNegativeIon1.rotation = - 45;
        this.blueArrowContainer1.addChild(this.moveNegativeIon1);

        this.moveNegativeIon2 = new createjs.Bitmap(flzt);
        this.moveNegativeIon2.regX = flzt.width / 2;
        this.moveNegativeIon2.regY = flzt.height / 2;
        this.moveNegativeIon2.x = -91 * 2 ;
        this.moveNegativeIon2.rotation = - 45;
        this.blueArrowContainer2.addChild(this.moveNegativeIon2);

        this.moveNegativeIon3 = new createjs.Bitmap(flzt);
        this.moveNegativeIon3.regX = flzt.width / 2;
        this.moveNegativeIon3.regY = flzt.height / 2;
        this.moveNegativeIon3.x = -127 * 2 ;
        this.moveNegativeIon3.rotation = - 45;
        this.blueArrowContainer3.addChild(this.moveNegativeIon3);

        this.moveNegativeIon4 = new createjs.Bitmap(flzt);
        this.moveNegativeIon4.regX = flzt.width / 2;
        this.moveNegativeIon4.regY = flzt.height / 2;
        this.moveNegativeIon4.x = -160 * 2 ;
        this.moveNegativeIon4.rotation = - 45;
        this.redArrowContainer.addChild(this.moveNegativeIon4);

        this.moveNegativeIon5 = new createjs.Bitmap(flzt);
        this.moveNegativeIon5.regX = flzt.width / 2;
        this.moveNegativeIon5.regY = flzt.height / 2;
        this.moveNegativeIon5.x = -196 * 2 ;
        this.moveNegativeIon5.rotation = - 45;
        this.blueArrowContainer4.addChild(this.moveNegativeIon5);


    }

    //加载蓝色箭头
    loadBlueArrow() {
        this.blueArrowContainer1 = new createjs.Container();
        const lsjtt = this.imgMap['lsjt'];
        this.blueArrow1 = new createjs.Bitmap(lsjtt);

        this.blueArrow1.x = -55 * 2 - lsjtt.width / 2;
        this.blueArrow1.y = -55 * 2 + lsjtt.height / 4;

        this.blueArrowContainer1.addChild(this.blueArrow1);

        this.blueArrowContainer1.x = this.negativeIon.x + 165;
        this.blueArrowContainer1.y = this.negativeIon.y;

        this.elementContainer.addChild(this.blueArrowContainer1);

        this.blueArrowContainer2 = new createjs.Container();
        this.blueArrow2 = new createjs.Bitmap(lsjtt);

        this.blueArrow2.x = -91 * 2 - lsjtt.width / 2;
        this.blueArrow2.y = -55 * 2 + lsjtt.height / 4;

        this.blueArrowContainer2.addChild(this.blueArrow2);

        this.blueArrowContainer2.x = this.negativeIon.x + 238;
        this.blueArrowContainer2.y = this.negativeIon.y;

        this.elementContainer.addChild(this.blueArrowContainer2);

        this.blueArrowContainer3 = new createjs.Container();
        this.blueArrow3 = new createjs.Bitmap(lsjtt);

        this.blueArrow3.x = -127 * 2 - lsjtt.width / 2;
        this.blueArrow3.y = -55 * 2 + lsjtt.height / 4;

        this.blueArrowContainer3.addChild(this.blueArrow3);

        this.blueArrowContainer3.x = this.negativeIon.x + 310;
        this.blueArrowContainer3.y = this.negativeIon.y;

        this.elementContainer.addChild(this.blueArrowContainer3);


        this.blueArrowContainer4 = new createjs.Container();
        this.blueArrow4 = new createjs.Bitmap(lsjtt);

        this.blueArrow4.x = -196 * 2 - lsjtt.width / 2;
        this.blueArrow4.y = -55 * 2 + lsjtt.height / 4;

        this.blueArrowContainer4.addChild(this.blueArrow4);

        this.blueArrowContainer4.x = this.negativeIon.x + 446;
        this.blueArrowContainer4.y = this.negativeIon.y;

        this.elementContainer.addChild(this.blueArrowContainer4);

    }

    //加载红色箭头
    loadRedArrow() {
        this.redArrowContainer = new createjs.Container();
        const hsjtt = this.imgMap['hsjt'];
        this.redArrow = new createjs.Bitmap(hsjtt);

        this.redArrow.x = -160 * 2 - hsjtt.width / 2;
        this.redArrow.y = -55 * 2 + hsjtt.height / 4;

        this.redArrowContainer.addChild(this.redArrow);

        this.redArrowContainer.x = this.negativeIon.x + 375;
        this.redArrowContainer.y = this.negativeIon.y;
        this.elementContainer.addChild(this.redArrowContainer);
    }

    //创建辅助线 和O点
    createDashLine() {
        this.dashlineContainer = new createjs.Container();
        const flzt = this.imgMap['FLZ'];
        const dashLine = this.createDashLineHelp( this.negativeIon.x + flzt.width, this.negativeIon.y,
            this.negativeIon.x + 375, this.negativeIon.y);
        const oimg = this.imgMap['O'];
        const oObj = new createjs.Bitmap(oimg);
        oObj.x = this.negativeIon.x + 360;
        oObj.y = this.negativeIon.y - 25;
        oObj.rotation = -45;
        this.dashlineContainer.addChild(dashLine);
        this.dashlineContainer.addChild(oObj);
        const g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.beginFill(createjs.Graphics.getRGB(0, 0, 0));
        g.drawCircle(0, 0, 6);
        const point = new createjs.Shape(g);
        point.x = this.negativeIon.x + 375;
        point.y = this.negativeIon.y;
        this.dashlineContainer.addChild(point);


        this.elementContainer.addChild(this.dashlineContainer);
    }

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


    private initAnimation(target: any, rotateObj: any, rotateObj2: any, ctr?: number, time?: number): void {
        //动态修改endAngle
    const animation = createjs.Tween.get(target, {paused: true})
            .to({endAngle: Math.PI / 2}, time);

           animation.call(() => {
               this.grayArrow.visible = true;
               this.thetaAngle.visible = true;
               this.negativeIon.visible = true;
               this.resetOpacity();
               this.viewModel.$data.sliderOption.disabled = false;
               switch (true) {
                   case ctr === 1:
                       this.moveNegativeIon1.visible = false;
                       break;
                   case ctr === 2:
                       this.moveNegativeIon2.visible = false;
                       break;
                   case ctr === 3:
                       this.moveNegativeIon3.visible = false;
                       break;
                   case ctr === 4:
                       this.dashlineContainer.visible = true;
                       this.moveNegativeIon4.visible = false;
                       break;
               }
           })
           .addEventListener('change', (event: any) => {

               const angle = event.currentTarget.target.endAngle * 180 / Math.PI;
               //判断控制动画
               rotateObj.rotation = angle - 180;
               rotateObj2.rotation = -angle - 45;
           });
       return animation;
    }

    private initBigAnimation(target: any, rotateObj: any, rotateObj2: any, time: number): void {
        //动态修改endAngle
        const animation = createjs.Tween.get(target, {paused: true})
            .to({endAngle: - Math.PI / 2 }, time);
            animation.call(() => {
                this.grayArrow.visible = true;
                this.thetaAngle.visible = true;
                this.negativeIon.visible = true;
                this.viewModel.$data.sliderOption.disabled = false;
                this.moveNegativeIon5.visible = false;
                this.resetOpacity();
            })
            .addEventListener('change', (event: any) => {

                const angle = event.currentTarget.target.endAngle * 180 / Math.PI;
                //判断控制动画
                rotateObj.rotation = angle - 180;
                rotateObj2.rotation = -angle - 45;
            });
        return animation;
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
        const number = 1;
        this.blueArrow1.alpha = number;
        this.blueArrow2.alpha = number;
        this.blueArrow3.alpha = number;
        this.blueArrow4.alpha = number;
        this.redArrow.alpha = number;
        this.arc1.alpha = number;
        this.arc2.alpha = number;
        this.arc3.alpha = number;
        this.arc4.alpha = number;
        this.arc5.alpha = number;
    }

    reset () {

        createjs.Tween.removeAllTweens();
        this.viewModel.$data.ctrl = true;
        this.viewModel.$data.sliderOption.disabled = true;
        this.play.visible = true;
        this.arc1.graphics.command.endAngle = -Math.PI;
        this.arc2.graphics.command.endAngle = -Math.PI;
        this.arc3.graphics.command.endAngle = -Math.PI;
        this.arc4.graphics.command.endAngle = -Math.PI;
        this.arc5.graphics.command.endAngle = -Math.PI;
        this.blueArrow1.visible = false;
        this.blueArrow2.visible = false;
        this.blueArrow3.visible = false;
        this.blueArrow4.visible = false;
        this.redArrow.visible = false;
        this.grayArrow.visible = true;
        this.thetaAngle.visible = true;
        this.negativeIon.visible = true;
        this.moveNegativeIon1.visible = false;
        this.moveNegativeIon2.visible = false;
        this.moveNegativeIon3.visible = false;
        this.moveNegativeIon4.visible = false;
        this.moveNegativeIon5.visible = false;
        this.dashlineContainer.visible = false;
        this.viewModel.$data.slidernumber = 1;
    }
}
