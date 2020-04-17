import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as backBoxImage from '../sub_static/transparentbox.png';
import * as redMovedEllipse from '../sub_static/redballs.png';
import * as blackMovedEllipse from '../sub_static/blackballs.png';
import * as backBoxImages from '../sub_static/box.png';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    //背景箱子
    backBoxImage: Konva.Image;

    //点击按钮之后更换背景图片
    backBoxImages: Konva.Image;

    //移动的椭圆图片
    redMovedEllipse: Konva.Image;
    blackMovedEllipse: Konva.Image;

    //抓一次红色球动画
    redTween: Konva.Tween;
    //抓一次黑色球动画
    blackTween: Konva.Tween;

    //抓去一次红色球计树器
    redNumberOne = 0;

    //抓去一次黑色球计数器
    blackNumberOne = 0;
    //抓球计数
    numberHundred = 0;

    velocity = 50;
    dist: number;

    //抓取一次的时候的动画
    tween: Konva.Tween;

    //抓一次判断取得球是红色还是黑色
    judgeNumberOne: number;
    //抓100次判断取得球是红色还是黑色
    judgeNumberHundred: number;

    //循环计时器的id
    intervalId: any;
    //循环执行的总时间
    intervalTime = 20;

    //红球被抓取得次数
    writeRedText: any;
    //白球被抓取得次数
    writeBlackText: any;
    scale = 1;

    //构造函数
    constructor() {
        super('containers');
        this.config = new MyConfig();
        this.init();
    }

    //初始化方法
    async init() {
        await this.initBackImage();
        await this.drawMoveEllopse();
        await this.resize();
    }

    // 初始化背景矩阵
    async initBackImage() {
        //加载背景桌子
        this.backBoxImage = await this.loadImage((backBoxImage as any), this.config.backBox as any);
        this.staticLayer.add(this.backBoxImage);
        this.staticLayer.draw();
    }

    async drawMoveEllopse() {
        //初始化红色球
        this.redMovedEllipse = await this.loadImage((redMovedEllipse as any) , this.config.redEllipse as any);
        this.animationLayer.add(this.redMovedEllipse);
        //初始化黑色球
        this.blackMovedEllipse = await this.loadImage((blackMovedEllipse as any) , this.config.blackEllipse as any);
        this.animationLayer.add(this.blackMovedEllipse);
        this.animationLayer.draw();
    }

    //判断加载哪一种颜色的球
    loadinganimation(judge: boolean) {
        //每次点击都得让球回到原来的位置
        this.blackMovedEllipse.y(92);
        this.redMovedEllipse.y(92);
        if (judge) {
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
            });
        } else {
            this.blackTween = new Konva.Tween({
                node: this.blackMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
            });
        }
    }

    //抓一次球
    async shwoGrabOne(isActive1: boolean) {
        if (isActive1) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            this.stopFunction(this.intervalId);

            //随机取数
            this.judgeNumberOne = Math.floor(Math.random() * 2);
            //小于1 取红色球
            if (this.judgeNumberOne < 1) {
                this.blackMovedEllipse.visible(false);
                this.redMovedEllipse.visible(true);
                this.loadinganimation(true);
                this.redTween.play();
                this.redNumberOne = this.redNumberOne + 1;
                this.writeRedText = this.redNumberOne;
                document.getElementById('redballtime').innerHTML = this.writeRedText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else { //大于1 取黑色的球
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(true);
                this.loadinganimation(false);
                this.blackTween.play();
                this.blackNumberOne = this.blackNumberOne + 1;
                this.writeBlackText = this.blackNumberOne;
                document.getElementById('blackballtime').innerHTML =  this.writeBlackText;
                setTimeout ( () => {
                    this.blackMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }
        }
    }

    //抓一百次球
    async showGrabOneHundred(isActive2: boolean) {

        if (isActive2) {
            //点击按钮之后，修改背景箱子的颜色
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            this.numberHundred = 0;
            //循环执行的计数器
            this.intervalId = setInterval(() => {
                //随机取数
                this.judgeNumberHundred = Math.floor(Math.random() * 2);
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                //出现红色球
                if (this.judgeNumberHundred < 1) {
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.numberHundred = this.numberHundred + 1;
                    this.redNumberOne = this.redNumberOne + 1;
                    this.writeRedText = this.redNumberOne;
                    document.getElementById('redballtime').innerHTML = this.writeRedText;
                } else {//出现黑色球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.numberHundred = this.numberHundred + 1;
                    this.blackNumberOne = this.blackNumberOne + 1;
                    this.writeBlackText = this.blackNumberOne;
                    document.getElementById('blackballtime').innerHTML =  this.writeBlackText ;
                }
                //当计数的次数达到100次的时候让循环执行的方法停止
                 if (this.numberHundred === 100) {
                     this.stopFunction(this.intervalId);
                     setTimeout ( () => {
                         this.ballDisappearance();
                     } , 500);
                 }
                 this.animationLayer.draw();
                 this.intervalTime = this.numberHundred * 200 / 1000;
                 if (this.intervalTime < 20) {
                 } else {

                     (window as any).viewHandler.viewModel.$data.btn1isDisable = false;
                     (window as any).viewHandler.viewModel.$data.btn2isDisable = false;

                     (window as any).viewHandler.viewModel.$data.thirds_stepColor = false;
                 }
            } , 100);
        } else {
            this.redMovedEllipse.y(92);
            this.blackMovedEllipse.y(92);
        }
    }

    ballDisappearance() {
        this.redMovedEllipse.visible(false);
        this.blackMovedEllipse.visible(false);
        // this.animationLayer.draw();
    }

    //停止计数器的方法
    stopFunction(intervalId: any) {
        clearInterval(intervalId);
    }

    // 重置
    reset() {
        this.staticLayer.removeChildren();
        this.animationLayer.removeChildren();
        this.init();
        //点击重置按钮之后 红球与黑球的计数从0开始
        this.redNumberOne = 0;
        this.blackNumberOne = 0;
        document.getElementById('redballtime').innerHTML = '0';
        document.getElementById('blackballtime').innerHTML = '0';
        this.stopFunction(this.intervalId);
        (window as any).viewHandler.viewModel.$data.btn1isDisable = false;
        (window as any).viewHandler.viewModel.$data.btn2isDisable = false;
    }

    //改变窗口
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(320 * this.scale);
        this.stage.height(414 * this.scale);

        //设置id为container的标签内容居中
        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 1.184   + 'px';
        const container = document.getElementById('containers').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);
        this.stage.draw();
    }
}

