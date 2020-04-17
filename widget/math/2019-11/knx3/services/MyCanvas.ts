import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as backBoxImage from '../sub_static/transparentbox.png';
import * as redMovedEllipse from '../sub_static/redballs.png';
import * as redMovedEllipseTwo from '../sub_static/redballs.png';
import * as blackMovedEllipse from '../sub_static/blackballs.png';
import * as blackMovedEllipseTwo from '../sub_static/blackballs.png';
import * as backBoxImages from '../sub_static/box.png';
import {KonvaNodeEvent} from 'konva';
import {ViewModel} from '../ViewModel';

export class MyCanvas extends SimpleKonvaTemplate {
    lang = window.env.browserInfo.lang;
    config: MyConfig;
    viewmodel: ViewModel;

    //背景箱子
    backBoxImage: Konva.Image;

    backBoxImages: Konva.Image;

    //移动的椭圆图片
    redMovedEllipse: Konva.Image;
    redMovedEllipseTwo: Konva.Image;
    blackMovedEllipse: Konva.Image;
    blackMovedEllipseTwo: Konva.Image;

    //抓一个球一次次判断取得球是红色还是黑色
    judgeNumberOne: number;
    //抓一个球100次判断取得球是红色还是黑色
    judgeNumberHundred: number;

    //抓两个球一次次判断取得球是红色还是黑色
    judgeTwoNumberOne: number;
    judgeTwoNumberTwo: number;

    judgeTwoHundredNumberOne: number;
    judgeTwoHundredNumberTwo: number;
    //抓两个球一次次计数
    judgeTwoNumberRedAndRed = 0;
    judgeTwoNumberBclakAndBclak = 0;
    judgeTwoNumberRedAndBclak = 0;

    //抓三个球判断不抓哪个球
    judgeNumberThreeBall: number;

    //抓三个球的计数器
    judgeThreeNumberOneRed = 0;
    judgeThreeNumberOneBlack = 0;


    //抓一次第一个红色球动画
    redTween: Konva.Tween;
    //抓一次第一个红色球动画
    redTweenTwo: Konva.Tween;
    //抓一次第一个黑色球动画
    blackTween: Konva.Tween;
    //抓一次第二个黑色球动画
    blackTweenTwo: Konva.Tween;

    //抓取一次红色球计树器
    redNumberOne = 0;

    //抓取一次黑色球计数器
    blackNumberOne = 0;
    //抓100球总计数
    numberHundred = 0;

    numberHundredTwo = 0;

    numberHundredThree = 0;

    //循环执行的总时间
    intervalTime = 20;


    velocity = 50;
    dist: number;

    //抓取一次的时候的动画
    tween: Konva.Tween;

    //计算总的抓取次数
    nums: any;

    //循环计时器的id
    intervalId: any;

    //抓一个球红球被抓取的总次数
    writeRedText: any;
    //抓一个球黑球被抓取的总次数
    writeBlackText: any;

    //抓两个球两个红球被抓取的总次数
    writeTwoRedText: any;
    //抓两个球两个黑球被抓取的总次数
    writeTwoBlackText: any;
    //抓两个球一个红球一个黑球被抓取的总次数
    writeRedAndBlackText: any;

    //抓三个球两个红球一个黑球被抓取的总次数
    writeTwoRedAndBlackText: any;
    //抓三个球两个黑球一个红球被抓取的总次数
    writeTwoBlackAndRedText: any;

    active1: boolean;
    active2: boolean;
    scale = 1;

    constructor() {
        super('containers');
        this.config = new MyConfig();
        this.init();
    }

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
        //初始化第一个红色球
        this.redMovedEllipse = await this.loadImage((redMovedEllipse as any) , this.config.redEllipse as any);
        this.animationLayer.add(this.redMovedEllipse);
        //初始化第二个红色球
        this.redMovedEllipseTwo = await this.loadImage((redMovedEllipseTwo as any) , this.config.redEllipseTwo as any);
        this.animationLayer.add(this.redMovedEllipseTwo);
        //初始化第一个黑色球
        this.blackMovedEllipse = await this.loadImage((blackMovedEllipse as any) , this.config.blackEllipse as any);
        this.animationLayer.add(this.blackMovedEllipse);
        //初始化第二个黑色球
        this.blackMovedEllipseTwo = await  this.loadImage((blackMovedEllipseTwo as any) , this.config.blackEllipseTwo as any);
        this.animationLayer.add(this.blackMovedEllipseTwo);

        this.animationLayer.draw();
    }

    //抓一个球判断加载哪一种颜色的球
    loadinganimationone(judge: number) {
        //每次点击都得让球回到原来的位置
        this.redMovedEllipse.y(92);
        this.redMovedEllipseTwo.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);

        if (judge <= 9) {
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
        } else if (judge > 9 && judge <= 19) {
            this.blackTween = new Konva.Tween({
                node: this.blackMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
        } else if (judge > 19 && judge <= 29) {
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
        } else {
            this.blackTweenTwo = new Konva.Tween({
                node: this.blackMovedEllipseTwo,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
        }
    }

    //抓两个球判断抓取球的颜色
    loadinganimationTwoBall(judgeTwoNumberOne: number, judgeTwoNumberTwo: number) {
        this.redMovedEllipse.y(92);
        this.redMovedEllipseTwo.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);
        this.redMovedEllipse.x(132);
        this.redMovedEllipseTwo.x(132);
        this.blackMovedEllipse.x(132);
        this.blackMovedEllipseTwo.x(132);
        if (judgeTwoNumberOne <= 9) {
            if (judgeTwoNumberTwo <= 9) {
                //都小于等于9 加载第一个红球和第一个黑球
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else if (judgeTwoNumberTwo > 9 && judgeTwoNumberTwo <= 19) {
                //第一个数小于9 第二个数大于等于9小于19 加载两个红球
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
                console.log('两个红球');
            } else {
                //第一个数小于9 第二个数大于19 加载第一个红球和第二个黑球
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            }
        } else if (judgeTwoNumberOne > 9 && judgeTwoNumberOne <= 19) {
            if (judgeTwoNumberTwo <= 9) {
                //第一个大于9 小于等于19  第二个小于等于9 加载第一个黑球 第一个红球
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else if (judgeTwoNumberTwo > 9 && judgeTwoNumberTwo <= 19) {
                //第一个大于9 小于等于19 第二个大于9 小于等于19 加载第一个黑球 第二个红球
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else {
                //第一个大于9 小于等于19 第二个数大于19 加载第一个黑球 第二个黑球
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            }
        } else if (judgeTwoNumberOne >= 19 && judgeTwoNumberOne < 29 ) {

            if (judgeTwoNumberTwo <= 9) {
                //第一个数大于19 小于等于29 第二个数小于等于9 加载第二个红球和第一个红球
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
                console.log('第二个红球和第一个红球1111111111111');
            } else if (judgeTwoNumberTwo > 9 && judgeTwoNumberTwo <= 19) {
                //第一个数大于19 小于等于29 第二个数大于9 小于等于19 加载第二个红球 第一个黑球
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else {
                //第一个数大于19 小于等于29 第二个数大于19 加载第二个红球 第二个黑球
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            }
        } else {
            if (judgeTwoNumberTwo <= 9) {
                //第一个数 大于29 第二个数小于等于9 加载第二个黑球 第一个红球
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTween = new Konva.Tween({
                    node: this.redMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else if (judgeTwoNumberTwo > 9 && judgeTwoNumberTwo <= 19) {
                //第一个数 大于29 第二个数大于等于9小于19 加载第二个黑球 第一个黑球
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.blackTween = new Konva.Tween({
                    node: this.blackMovedEllipse,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            } else {
                //第一个数 大于29 第二个数大于19 加载第二个黑球 第二个红球
                this.blackTweenTwo = new Konva.Tween({
                    node: this.blackMovedEllipseTwo,
                    duration: 0.2,
                    x: 95,
                    y: 0,
                    opacity: 1,
                });
                this.redTweenTwo = new Konva.Tween({
                    node: this.redMovedEllipseTwo,
                    duration: 0.2,
                    x: 169,
                    y: 0,
                    opacity: 1,
                });
            }
        }
    }

    //抓三个球判断抓球的颜色
    loadinganimationThreeBall (judgeNumberThreeBall: number) {
        //每次点击都得让球回到原来的位置
        this.redMovedEllipse.x(132);
        this.redMovedEllipseTwo.x(132);
        this.blackMovedEllipse.x(132);
        this.blackMovedEllipseTwo.x(132);
        this.redMovedEllipse.y(92);
        this.redMovedEllipseTwo.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);
        if (this.judgeNumberThreeBall <= 9) {
            //不加载第一个红色球
            this.blackTween = new Konva.Tween({
                node: this.blackMovedEllipse,
                duration: 0.2,
                x: 58,
                y: 0,
                opacity: 1,
            });
            this.redTweenTwo = new Konva.Tween({
                node: this.redMovedEllipseTwo,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
            this.blackTweenTwo = new Konva.Tween({
                node: this.blackMovedEllipseTwo,
                duration: 0.2,
                x: 206,
                y: 0,
                opacity: 1,
            });
        } else if (this.judgeNumberThreeBall > 9 && this.judgeNumberThreeBall <= 19) {
            //不加载第一个黑色球
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 58,
                y: 0,
                opacity: 1,
            });
            this.redTweenTwo = new Konva.Tween({
                node: this.redMovedEllipseTwo,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
            this.blackTweenTwo = new Konva.Tween({
                node: this.blackMovedEllipseTwo,
                duration: 0.2,
                x: 206,
                y: 0,
                opacity: 1,
            });
        } else if (this.judgeNumberThreeBall > 19 && this.judgeNumberThreeBall <= 29) {
            //不加载第二个红色球
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 58,
                y: 0,
                opacity: 1,
            });
            this.blackTween = new Konva.Tween({
                node: this.blackMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
            this.blackTweenTwo = new Konva.Tween({
                node: this.blackMovedEllipseTwo,
                duration: 0.2,
                x: 206,
                y: 0,
                opacity: 1,
            });
        } else {
            //不加载第二个黑色球
            this.redTween = new Konva.Tween({
                node: this.redMovedEllipse,
                duration: 0.2,
                x: 58,
                y: 0,
                opacity: 1,
            });
            this.blackTween = new Konva.Tween({
                node: this.blackMovedEllipse,
                duration: 0.2,
                x: 132,
                y: 0,
                opacity: 1,
            });
            this.redTweenTwo = new Konva.Tween({
                node: this.redMovedEllipseTwo,
                duration: 0.2,
                x: 206,
                y: 0,
                opacity: 1,
            });
        }
    }

    //抓一个球一次
    async shwoGrabOneBallsOneTime(isActive1: boolean) {
        if (isActive1) {
            // console.log(isActive1 + '抓1个球一次');
            this.stopFunction(this.intervalId);
            this.judgeNumberOne = Math.floor(Math.random() * 20);
            if (this.judgeNumberOne <= 9) {
                //小于10 取得是红球 ，加载红球动画
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(false);
                this.redMovedEllipseTwo.visible(false);
                this.blackMovedEllipseTwo.visible(false);
                this.loadinganimationone(this.judgeNumberOne);
                this.redTween.play();
                this.redNumberOne  = this.redNumberOne + 1;
                this.writeRedText = this.redNumberOne;
                document.getElementById('redballtime').innerHTML = this.writeRedText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }  else {
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(true);
                this.redMovedEllipseTwo.visible(false);
                this.blackMovedEllipseTwo.visible(false);
                this.loadinganimationone(this.judgeNumberOne);
                this.blackTween.play();
                this.blackNumberOne = this.blackNumberOne + 1;
                this.writeBlackText = this.blackNumberOne;
                document.getElementById('blackballtime').innerHTML =  this.writeBlackText;
                setTimeout ( () => {
                    this.blackMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }
            this.active1 = true;
            this.active2 = false;
        }
    }

    //抓两个球一次
    async shwoGrabTwoBallsOneTime(isActive1: boolean) {

        if (isActive1) {
            this.stopFunction(this.intervalId);
            //判断一个球
            this.judgeTwoNumberOne = Math.floor(Math.random() * 40);
            // //判断第二个球
            this.judgeTwoNumberTwo = Math.floor(Math.random() * 30);
            if (this.judgeTwoNumberOne <= 9) {
                if (this.judgeTwoNumberTwo <= 9) {
                    //都小于等于9 加载第一个红球和第一个黑球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne , this.judgeTwoNumberTwo);
                    this.redTween.play();
                    this.blackTween.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载第一个红球第一个黑球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else if (this.judgeTwoNumberTwo > 9 && this.judgeTwoNumberTwo <= 19) {
                    //第一个数小于9 第二个数大于等于9小于19 加载两个红球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.redTween.play();
                    this.redTweenTwo.play();
                    this.judgeTwoNumberRedAndRed += 1;
                    this.writeTwoRedText = this.judgeTwoNumberRedAndRed;
                    // console.log('加载两个红球===' + this.judgeTwoNumberRedAndRed);
                    document.getElementById('redballtime').innerHTML = this.writeTwoRedText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else {
                    //第一个数小于9 第二个数大于19 加载第一个红球和第二个黑球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.redTween.play();
                    this.blackTweenTwo.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载第一个红球第二个黑球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                }

            } else if (this.judgeTwoNumberOne > 9 && this.judgeTwoNumberOne <= 19) {
                if (this.judgeTwoNumberTwo <= 9) {
                    //第一个大于9 小于等于19  第二个小于等于9 加载第一个黑球 第一个红球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne , this.judgeTwoNumberTwo);
                    this.redTween.play();
                    this.blackTween.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载第一个黑球第一个红球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else if (this.judgeTwoNumberTwo > 9 && this.judgeTwoNumberTwo <= 19) {
                    //第一个大于9 小于等于19 第二个大于9 小于等于19 加载第一个黑球 第二个红球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.blackTween.play();
                    this.redTweenTwo.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载第一个黑球第二个红球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else {
                    //第一个大于9 小于等于19 第二个数大于19 加载第一个黑球 第二个黑球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.blackTween.play();
                    this.blackTweenTwo.play();
                    this.judgeTwoNumberBclakAndBclak += 1;
                    this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                    // console.log('加载第一个黑球第二个黑球===' + this.judgeTwoNumberBclakAndBclak);
                    document.getElementById('blackballtime').innerHTML = this.writeTwoBlackText;
                    setTimeout ( () => {
                        this.blackMovedEllipse.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                }
            } else if (this.judgeTwoNumberOne > 19 && this.judgeTwoNumberOne <= 29) {
                if (this.judgeTwoNumberTwo <= 9) {
                    //第一个数大于19 小于等于29 第二个数小于等于9 加载第二个红球和第一个红球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne , this.judgeTwoNumberTwo);
                    this.redTweenTwo.play();
                    this.redTween.play();
                    this.judgeTwoNumberRedAndRed += 1;
                    this.writeTwoRedText = this.judgeTwoNumberRedAndRed;
                    // console.log('加载第个二红球第一个红球===' + this.judgeTwoNumberRedAndRed);
                    document.getElementById('redballtime').innerHTML = this.writeTwoRedText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else if (this.judgeTwoNumberTwo > 9 && this.judgeTwoNumberTwo <= 19) {
                    //第一个数大于19 小于等于29 第二个数大于9 小于等于19 加载第二个红球 第一个黑球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.redTweenTwo.play();
                    this.blackTween.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载加载第二个红球 第一个黑球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else {
                    //第一个数大于19 小于等于29 第二个数大于19 加载第二个红球 第二个黑球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.redTweenTwo.play();
                    this.blackTweenTwo.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载加载第二个红球 第二个黑球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                }
            } else {
                //加载第二个黑球
                if (this.judgeTwoNumberTwo <= 9) {
                    //第一个数 大于29 第二个数小于等于9 加载第二个黑球 第一个红球
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne , this.judgeTwoNumberTwo);
                    this.blackTweenTwo.play();
                    this.redTween.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载加载第二个黑球 第一个红球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else if (this.judgeTwoNumberTwo > 9 && this.judgeTwoNumberTwo <= 19) {
                    //第一个数 大于29 第二个数大于等于9小于19 加载第二个黑球 第一个黑球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.blackTweenTwo.play();
                    this.blackTween.play();
                    this.judgeTwoNumberBclakAndBclak += 1;
                    this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                    // console.log('加载加载第二个黑球 第一个黑球===' + this.judgeTwoNumberBclakAndBclak);
                    document.getElementById('blackballtime').innerHTML = this.writeTwoBlackText;
                    setTimeout ( () => {
                        this.blackMovedEllipse.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                } else {
                    //第一个数 大于29 第二个数大于19 加载第二个黑球 第二个红球
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.loadinganimationTwoBall(this.judgeTwoNumberOne, this.judgeTwoNumberTwo);
                    this.redTweenTwo.play();
                    this.blackTweenTwo.play();
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    // console.log('加载加载第二个黑球 第二个红球===' + this.judgeTwoNumberRedAndBclak);
                    document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    setTimeout ( () => {
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.animationLayer.draw();
                    } , 500);
                }
            }
        }
    }

    //抓三个球一次
    async shwoGrabThreeBallsOneTime(isActive1: boolean) {
        if (isActive1) {
            this.stopFunction(this.intervalId);
            //重新开始计算 值到达100 停止计数器
            this.numberHundredTwo = 0;
            this.judgeNumberThreeBall = Math.floor(Math.random() * 40);
            if (this.judgeNumberThreeBall <= 9) {
                //不加载第一个红色球
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(true);
                this.redMovedEllipseTwo.visible(true);
                this.blackMovedEllipseTwo.visible(true);
                this.loadinganimationThreeBall(this.judgeNumberThreeBall);
                this.blackTween.play();
                this.redTweenTwo.play();
                this.blackTweenTwo.play();
                this.judgeThreeNumberOneRed += 1;
                this.writeTwoBlackAndRedText = this.judgeThreeNumberOneRed  ;
                document.getElementById('blackballtime').innerHTML = this.writeTwoBlackAndRedText;
                setTimeout ( () => {
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else if (this.judgeNumberThreeBall > 9 && this.judgeNumberThreeBall <= 19) {
                //不加载第一个黑色球
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(false);
                this.redMovedEllipseTwo.visible(true);
                this.blackMovedEllipseTwo.visible(true);
                this.loadinganimationThreeBall(this.judgeNumberThreeBall);
                this.redTween.play();
                this.redTweenTwo.play();
                this.blackTweenTwo.play();
                this.judgeThreeNumberOneBlack += 1;
                this.writeTwoRedAndBlackText = this.judgeThreeNumberOneBlack;
                document.getElementById('redballtime').innerHTML = this.writeTwoRedAndBlackText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else if (this.judgeNumberThreeBall > 19 && this.judgeNumberThreeBall <= 29) {
                //不加载第二个红色球
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(true);
                this.redMovedEllipseTwo.visible(false);
                this.blackMovedEllipseTwo.visible(true);
                this.loadinganimationThreeBall(this.judgeNumberThreeBall);
                this.redTween.play();
                this.blackTween.play();
                this.blackTweenTwo.play();
                this.judgeThreeNumberOneRed += 1;
                this.writeTwoBlackAndRedText = this.judgeThreeNumberOneRed;
                document.getElementById('blackballtime').innerHTML = this.writeTwoBlackAndRedText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else {
                //不加载第二个黑色球
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(true);
                this.redMovedEllipseTwo.visible(true);
                this.blackMovedEllipseTwo.visible(false);
                this.loadinganimationThreeBall(this.judgeNumberThreeBall);
                this.redTween.play();
                this.blackTween.play();
                this.redTweenTwo.play();
                this.judgeThreeNumberOneBlack += 1;
                this.writeTwoRedAndBlackText = this.judgeThreeNumberOneBlack;
                document.getElementById('redballtime').innerHTML = this.writeTwoRedAndBlackText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }
        }
    }

    //抓一个球一百次
    async showGrabOneBallsHundredTime(isActive2: boolean) {
        if (isActive2) {
            // console.log(isActive2 + '抓一个球100次');
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            this.numberHundred = 0;
            this.intervalId = setInterval( () => {
                this.judgeNumberHundred = Math.floor(Math.random() * 20);
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                this.redMovedEllipse.x(132);
                this.blackMovedEllipse.x(132);
                if (this.judgeNumberHundred <= 9) {
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redNumberOne = this.redNumberOne + 1;
                    this.numberHundred = this.numberHundred + 1;
                    this.writeRedText = this.redNumberOne;
                    document.getElementById('redballtime').innerHTML = this.writeRedText;
                } else {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.blackNumberOne = this.blackNumberOne + 1;
                    this.numberHundred = this.numberHundred + 1;
                    this.writeBlackText = this.blackNumberOne;
                    document.getElementById('blackballtime').innerHTML = this.writeBlackText;
                }
                this.nums = this.blackNumberOne + this.redNumberOne;
                if (this.numberHundred === 100) {
                    this.stopFunction(this.intervalId);
                    setTimeout ( () => {
                        this.ballDisappearance();
                    } , 500);
                }
                this.animationLayer.draw();
                this.intervalTime = this.numberHundred * 200 / 1000;
                if (this.intervalTime < 20) {
                    //当点击了抓取100次的按钮时 不能够再点击  添加disabled属性为true
                    document.getElementById('btn2').setAttribute('disabled' , 'true');
                    document.getElementById('btn1').setAttribute('disabled' , 'true');
                    // (window as any).viewHandler.viewModel.$data.possibleone = true;
                    // (window as any).viewHandler.viewModel.$data.possibletwo = true;
                    // //禁用上面三个按钮
                    // (window as any).viewHandler.viewModel.$data.possiblethree = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefour = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefive = true;
                } else {
                    //当点击抓取100次的按钮后判断是否已经再执行该方法，如果没有执行，移除disable属性让其能够再次点击
                    document.getElementById('btn2').removeAttribute('disabled');
                    document.getElementById('btn1').removeAttribute('disabled');
                    (window as any).viewHandler.viewModel.$data.possibleone = false;
                    (window as any).viewHandler.viewModel.$data.possibletwo = false;
                    //解除上面三个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.possiblethree = false;
                    (window as any).viewHandler.viewModel.$data.possiblefour = false;
                    (window as any).viewHandler.viewModel.$data.possiblefive = false;

                    (window as any).viewHandler.viewModel.$data.isActive2 = false;
                }
            }, 100);
        } else {
            this.redMovedEllipse.y(92);
            this.blackMovedEllipse.y(92);
            this.blackMovedEllipseTwo.y(92);
        }
    }

    //抓两个球100次
    async showGrabTwoBallsHundredTime(isActive2: boolean) {
        if (isActive2) {
            //重新开始计算 值到达100 停止计数器
            this.numberHundredTwo = 0;
            //循环执行的计时器
            this.intervalId = setInterval( () => {
                //判断第一个球
                this.judgeTwoHundredNumberOne = Math.floor(Math.random() * 40);
                //判断第二个球
                this.judgeTwoHundredNumberTwo = Math.floor(Math.random() * 30);
                //将坐标都改为0
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                this.redMovedEllipseTwo.y(0);
                this.blackMovedEllipseTwo.y(0);
                if (this.judgeTwoHundredNumberOne <= 9) {
                    if (this.judgeTwoHundredNumberTwo <= 9) {
                        //都小于等于9 加载第一个红球和第一个黑球
                        this.redMovedEllipse.x(95);
                        this.blackMovedEllipse.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    } else if (this.judgeTwoHundredNumberTwo > 9 && this.judgeTwoHundredNumberTwo <= 19) {
                        //第一个数小于9 第二个数大于等于9小于19 加载两个红球
                        this.redMovedEllipse.x(95);
                        this.redMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndRed += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeTwoRedText = this.judgeTwoNumberRedAndRed;
                        document.getElementById('redballtime').innerHTML = this.writeTwoRedText;
                    } else {
                        //第一个数小于9 第二个数大于19 加载第一个红球和第二个黑球
                        this.redMovedEllipse.x(95);
                        this.blackMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    }
                } else if (this.judgeTwoHundredNumberOne > 9 && this.judgeTwoHundredNumberOne <= 19) {
                    if (this.judgeTwoHundredNumberTwo <= 9) {
                        //第一个大于9 小于等于19  第二个小于等于9 加载第一个黑球 第一个红球
                        this.blackMovedEllipse.x(95);
                        this.redMovedEllipse.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    } else if (this.judgeTwoHundredNumberTwo > 9 && this.judgeTwoHundredNumberTwo <= 19) {
                        //第一个大于9 小于等于19 第二个大于9 小于等于19 加载第一个黑球 第二个红球
                        this.blackMovedEllipse.x(95);
                        this.redMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    } else {
                        //第一个大于9 小于等于19 第二个数大于19 加载第一个黑球 第二个黑球
                        this.blackMovedEllipse.x(95);
                        this.blackMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberBclakAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                        document.getElementById('blackballtime').innerHTML = this.writeTwoBlackText;
                    }
                } else if (this.judgeTwoHundredNumberOne > 19 && this.judgeTwoHundredNumberOne <= 29) {
                    if (this.judgeTwoHundredNumberTwo <= 9) {
                        //第一个数大于19 小于等于29 第二个数小于等于9 加载第二个红球和第一个红球
                        this.redMovedEllipseTwo.x(95);
                        this.redMovedEllipse.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndRed += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeTwoRedText = this.judgeTwoNumberRedAndRed;
                        document.getElementById('redballtime').innerHTML = this.writeTwoRedText;
                    } else if (this.judgeTwoHundredNumberTwo > 9 && this.judgeTwoHundredNumberTwo <= 19) {
                        //第一个数大于19 小于等于29 第二个数大于9 小于等于19 加载第二个红球 第一个黑球
                        this.redMovedEllipseTwo.x(95);
                        this.blackMovedEllipse.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(false);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        // console.log('加载第一个红球第一个黑球===' + this.judgeTwoNumberRedAndBclak);
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    } else {
                        //第一个数大于19 小于等于29 第二个数大于19 加载第二个红球 第二个黑球
                        this.redMovedEllipseTwo.x(95);
                        this.blackMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        // console.log('加载第一个红球第一个黑球===' + this.judgeTwoNumberRedAndBclak);
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    }
                } else {
                    if (this.judgeTwoHundredNumberTwo <= 9) {
                        //第一个数 大于29 第二个数小于等于9 加载第二个黑球 第一个红球
                        this.blackMovedEllipseTwo.x(95);
                        this.redMovedEllipse.x(169);
                        this.redMovedEllipse.visible(true);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    } else if (this.judgeTwoHundredNumberTwo > 9 && this.judgeTwoHundredNumberTwo <= 19) {
                        //第一个数 大于29 第二个数大于等于9小于19 加载第二个黑球 第一个黑球
                        this.blackMovedEllipseTwo.x(95);
                        this.blackMovedEllipse.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(true);
                        this.redMovedEllipseTwo.visible(false);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberBclakAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                        document.getElementById('blackballtime').innerHTML = this.writeTwoBlackText;
                    } else {
                        //第一个数 大于29 第二个数大于19 加载第二个黑球 第二个红球
                        this.blackMovedEllipseTwo.x(95);
                        this.redMovedEllipseTwo.x(169);
                        this.redMovedEllipse.visible(false);
                        this.blackMovedEllipse.visible(false);
                        this.redMovedEllipseTwo.visible(true);
                        this.blackMovedEllipseTwo.visible(true);
                        this.judgeTwoNumberRedAndBclak += 1;
                        this.numberHundredTwo = this.numberHundredTwo + 1;
                        this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                        document.getElementById('redblacktime').innerHTML = this.writeRedAndBlackText;
                    }
                }

                this.nums = this.blackNumberOne + this.redNumberOne;
                if (this.numberHundredTwo === 100) {
                    this.stopFunction(this.intervalId);
                    setTimeout ( () => {
                        this.ballDisappearance();
                    } , 500);
                }
                this.animationLayer.draw();
                this.intervalTime = this.numberHundredTwo * 200 / 1000;
                if (this.intervalTime < 20) {
                    //当点击了抓取100次的按钮时 不能够再点击  添加disabled属性为true
                    document.getElementById('btn2').setAttribute('disabled' , 'true');
                    document.getElementById('btn1').setAttribute('disabled' , 'true');
                    // (window as any).viewHandler.viewModel.$data.possibleone = true;
                    // (window as any).viewHandler.viewModel.$data.possibletwo = true;
                    // //禁用上面三个按钮
                    // (window as any).viewHandler.viewModel.$data.possiblethree = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefour = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefive = true;
                } else {
                    //当点击抓取100次的按钮后判断是否已经再执行该方法，如果没有执行，移除disable属性让其能够再次点击
                    document.getElementById('btn2').removeAttribute('disabled');
                    document.getElementById('btn1').removeAttribute('disabled');
                    (window as any).viewHandler.viewModel.$data.possibleone = false;
                    (window as any).viewHandler.viewModel.$data.possibletwo = false;
                    //解除上面三个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.possiblethree = false;
                    (window as any).viewHandler.viewModel.$data.possiblefour = false;
                    (window as any).viewHandler.viewModel.$data.possiblefive = false;

                    (window as any).viewHandler.viewModel.$data.isActive2 = false;
                }
            }, 100);
        } else {
            console.log('isActive2');
            this.redMovedEllipse.x(132);
            this.redMovedEllipse.y(92);
            this.redMovedEllipseTwo.x(132);
            this.redMovedEllipseTwo.y(92);
            this.blackMovedEllipse.x(132);
            this.blackMovedEllipse.y(92);
            this.blackMovedEllipseTwo.x(132);
            this.blackMovedEllipseTwo.y(92);
        }
    }

    //抓三个球100次
    async showGrabThreeBallsHundredTime(isActive2: boolean) {
        if (isActive2) {
            //重新开始计算 值到达100 停止计数器
            this.numberHundredThree = 0;
            this.intervalId = setInterval( () => {
                this.judgeNumberThreeBall = Math.floor(Math.random() * 40);
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                this.redMovedEllipseTwo.y(0);
                this.blackMovedEllipseTwo.y(0);
                if (this.judgeNumberThreeBall <= 9) {
                    //不加载第一个红色球
                    this.blackMovedEllipse.x(58);
                    this.redMovedEllipseTwo.x(132);
                    this.blackMovedEllipseTwo.x(206);
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.judgeThreeNumberOneRed += 1;
                    this.numberHundredThree = this.numberHundredThree + 1;
                    this.writeTwoBlackAndRedText = this.judgeThreeNumberOneRed;
                    document.getElementById('blackballtime').innerHTML = this.writeTwoBlackAndRedText;
                } else if (this.judgeNumberThreeBall > 9 && this.judgeNumberThreeBall <= 19) {
                    //不加载第一个黑色球
                    this.redMovedEllipse.x(58);
                    this.redMovedEllipseTwo.x(132);
                    this.blackMovedEllipseTwo.x(206);
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.judgeThreeNumberOneBlack += 1;
                    this.numberHundredThree = this.numberHundredThree + 1;
                    this.writeTwoRedAndBlackText = this.judgeThreeNumberOneBlack;
                    document.getElementById('redballtime').innerHTML = this.writeTwoRedAndBlackText;
                } else if (this.judgeNumberThreeBall > 19 && this.judgeNumberThreeBall <= 29) {
                    //不加载第二个红色球
                    this.redMovedEllipse.x(58);
                    this.blackMovedEllipse.x(132);
                    this.blackMovedEllipseTwo.x(206);
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.redMovedEllipseTwo.visible(false);
                    this.judgeThreeNumberOneRed += 1;
                    this.numberHundredThree = this.numberHundredThree + 1;
                    this.writeTwoBlackAndRedText = this.judgeThreeNumberOneRed;
                    document.getElementById('blackballtime').innerHTML = this.writeTwoBlackAndRedText;
                } else {
                    //不加载第二个黑色球
                    this.redMovedEllipse.x(58);
                    this.blackMovedEllipse.x(132);
                    this.redMovedEllipseTwo.x(206);
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(true);
                    this.redMovedEllipseTwo.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.judgeThreeNumberOneBlack += 1;
                    this.numberHundredThree = this.numberHundredThree + 1;
                    this.writeTwoRedAndBlackText = this.judgeThreeNumberOneBlack;
                    document.getElementById('redballtime').innerHTML = this.writeTwoRedAndBlackText;
                }

                this.nums = this.blackNumberOne + this.redNumberOne;
                if (this.numberHundredThree === 100) {
                    this.stopFunction(this.intervalId);
                    setTimeout ( () => {
                        this.ballDisappearance();
                    } , 500);
                }
                this.animationLayer.draw();
                this.intervalTime = this.numberHundredThree * 200 / 1000;
                if (this.intervalTime < 20) {
                    //当点击了抓取100次的按钮时 不能够再点击  添加disabled属性为true
                    document.getElementById('btn2').setAttribute('disabled' , 'true');
                    document.getElementById('btn1').setAttribute('disabled' , 'true');

                    // (window as any).viewHandler.viewModel.$data.possibleone = true;
                    // (window as any).viewHandler.viewModel.$data.possibletwo = true;
                    // //禁用上面三个按钮
                    // (window as any).viewHandler.viewModel.$data.possiblethree = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefour = true;
                    // (window as any).viewHandler.viewModel.$data.possiblefive = true;
                } else {
                    //当点击抓取100次的按钮后判断是否已经再执行该方法，如果没有执行，移除disable属性让其能够再次点击
                    document.getElementById('btn2').removeAttribute('disabled');
                    document.getElementById('btn1').removeAttribute('disabled');
                    (window as any).viewHandler.viewModel.$data.possibleone = false;
                    (window as any).viewHandler.viewModel.$data.possibletwo = false;
                    //解除上面三个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.possiblethree = false;
                    (window as any).viewHandler.viewModel.$data.possiblefour = false;
                    (window as any).viewHandler.viewModel.$data.possiblefive = false;

                    (window as any).viewHandler.viewModel.$data.isActive2 = false;
                }
            }, 100);
        } else {
            this.redMovedEllipse.y(92);
            this.blackMovedEllipse.y(92);
            this.redMovedEllipseTwo.y(92);
            this.blackMovedEllipseTwo.y(92);
            this.redMovedEllipse.x(132);
            this.blackMovedEllipse.x(132);
            this.redMovedEllipseTwo.x(132);
            this.blackMovedEllipseTwo.x(132);
        }
    }

    //抓一个球
    async shwoGrabOneOne(isActive3: boolean) {
        if (isActive3) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            document.getElementById('hdn').removeAttribute('hidden');
            document.getElementById('hdn').setAttribute('hidden' , 'hidden');
            document.getElementById('twoblackball').innerHTML = this.lang.text[2];
            document.getElementById('oneredanblackball').innerHTML = this.lang.text[3];
            document.getElementById('redballtime').innerHTML = '0';
            document.getElementById('blackballtime').innerHTML = '0';
            this.stopFunction(this.intervalId);
            this.judgeTwoNumberRedAndBclak = 0;
            this.judgeTwoNumberBclakAndBclak = 0;
            this.judgeTwoNumberRedAndRed = 0;
            this.judgeThreeNumberOneRed = 0;
            this.judgeThreeNumberOneBlack = 0;
        }
    }

    //抓两个球
    async showGrabTwoTwo3(isActive4: boolean) {
        if (isActive4) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            document.getElementById('hdn').removeAttribute('hidden');
            document.getElementById('twoblackball').innerHTML = this.lang.twored;
            document.getElementById('oneredanblackball').innerHTML = this.lang.twoblack;
            document.getElementById('tworedball').innerHTML = this.lang.text[4];
            document.getElementById('redballtime').innerHTML = '0';
            document.getElementById('blackballtime').innerHTML = '0';
            document.getElementById('redblacktime').innerHTML = '0';
            this.stopFunction(this.intervalId);
            this.redNumberOne = 0;
            this.blackNumberOne = 0;
            this.judgeThreeNumberOneRed = 0;
            this.judgeThreeNumberOneBlack = 0;
        }
    }

    //抓三个球
    async showGrabThreeThree(isActive5: boolean) {
        if (isActive5) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            document.getElementById('hdn').removeAttribute('hidden');
            document.getElementById('hdn').setAttribute('hidden' , 'hidden');
            document.getElementById('twoblackball').innerHTML = this.lang.tworedoneblack;
            document.getElementById('oneredanblackball').innerHTML = this.lang.twoblackonered;
            document.getElementById('redballtime').innerHTML = '0';
            document.getElementById('blackballtime').innerHTML = '0';
            document.getElementById('redblacktime').innerHTML = '0';
            this.stopFunction(this.intervalId);
            this.redNumberOne = 0;
            this.blackNumberOne = 0;
            this.judgeTwoNumberRedAndBclak = 0;
            this.judgeTwoNumberBclakAndBclak = 0;
            this.judgeTwoNumberRedAndRed = 0;
        }
    }

    ballDisappearance() {
        this.redMovedEllipse.visible(false);
        this.blackMovedEllipse.visible(false);
        this.redMovedEllipseTwo.visible(false);
        this.blackMovedEllipseTwo.visible(false);
        this.animationLayer.draw();
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

        document.getElementById('hdn').removeAttribute('hidden');
        document.getElementById('hdn').setAttribute('hidden' , 'hidden');
        document.getElementById('twoblackball').innerHTML = this.lang.text[2];
        document.getElementById('oneredanblackball').innerHTML = this.lang.text[3];
        document.getElementById('redballtime').innerHTML = '0';
        document.getElementById('blackballtime').innerHTML = '0';

        //点击重置按钮之后。重新开始计数
        this.redNumberOne = 0;
        this.blackNumberOne = 0;
        this.judgeThreeNumberOneRed = 0;
        this.judgeThreeNumberOneBlack = 0;
        this.judgeTwoNumberRedAndRed = 0;
        this.judgeTwoNumberBclakAndBclak = 0;
        this.judgeTwoNumberRedAndBclak = 0;
        document.getElementById('redballtime').innerHTML = '0';
        document.getElementById('blackballtime').innerHTML = '0';
        document.getElementById('redblacktime').innerHTML = '0';
        this.stopFunction(this.intervalId);
        //直接重置必须移除disabled属性
        document.getElementById('buttonStyle1_div').setAttribute('hidden' , 'true');
        document.getElementById('buttonStyle2_div').setAttribute('hidden' , 'true');
        document.getElementById('btn2').setAttribute('disabled' , 'true');
        document.getElementById('btn1').setAttribute('disabled' , 'true');

        (window as any).viewHandler.viewModel.$data.possibleone = false;
        (window as any).viewHandler.viewModel.$data.possibletwo = false;
        //解除上面三个按钮的禁用
        (window as any).viewHandler.viewModel.$data.possiblethree = false;
        (window as any).viewHandler.viewModel.$data.possiblefour = false;
        (window as any).viewHandler.viewModel.$data.possiblefive = false;
    }

    //改变窗口
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(320 * this.scale);
        this.stage.height(404 * this.scale);

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

