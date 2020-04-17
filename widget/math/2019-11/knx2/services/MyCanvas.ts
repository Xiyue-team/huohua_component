import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as backBoxImage from '../sub_static/transparentbox.png';
import * as redMovedEllipse from '../sub_static/redballs.png';
import * as blackMovedEllipse from '../sub_static/blackballs.png';
import * as blackMovedEllipseTwo from '../sub_static/blackballs.png';
import * as backBoxImages from '../sub_static/box.png';
import {KonvaNodeEvent} from 'konva';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;
    lang = window.env.browserInfo.lang;

    //背景箱子
    backBoxImage: Konva.Image;

    //覆盖的背景箱子图片
    backBoxImages: Konva.Image;

    //移动的椭圆图片
    redMovedEllipse: Konva.Image;
    blackMovedEllipse: Konva.Image;
    blackMovedEllipseTwo: Konva.Image;

    //抓一个球一次次判断取得球是红色还是黑色
    judgeNumberOne: number;
    //抓一个球100次判断取得球是红色还是黑色
    judgeNumberHundred: number;

    //抓两个球一次次判断取得球是红色还是黑色
    judgeTwoNumberOne: number;
    //抓两个球一次次计数
    judgeTwoNumberRedAndBclak = 0;
    judgeTwoNumberBclakAndBclak = 0;

    //抓一次红色球动画
    redTween: Konva.Tween;
    //抓一次第一个黑色球动画
    blackTween: Konva.Tween;
    //抓一次第二个黑色球动画
    blackTweenTwo: Konva.Tween;

    //抓去一次红色球计树器
    redNumberOne = 0;
    //抓去一次黑色球计数器
    blackNumberOne = 0;
    //抓100球总计数
    numberHundred = 0;

    numberHundredTwo = 0;

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

    //抓一个球两个黑球被抓取的总次数
    writeTwoBlackText: any;
    //抓一个球一个红球一个黑球被抓取的总次数
    writeRedAndBlackText: any;
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
        //初始化红色球
        this.redMovedEllipse = await this.loadImage((redMovedEllipse as any) , this.config.redEllipse as any);
        this.animationLayer.add(this.redMovedEllipse);
        //初始化第一个黑色球
        this.blackMovedEllipse = await this.loadImage((blackMovedEllipse as any) , this.config.blackEllipse as any);
        this.animationLayer.add(this.blackMovedEllipse);
        //初始化第二个黑色球
        this.blackMovedEllipseTwo = await  this.loadImage((blackMovedEllipseTwo as any) , this.config.blackEllipseTwo as any);
        this.animationLayer.add(this.blackMovedEllipseTwo);

        this.animationLayer.draw();
    }

    //抓一个球判断加载哪一种颜色的球
    loadinganimation(judge: number) {
        //每次点击都得让球回到原来的位置

        this.redMovedEllipse.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);
        this.redMovedEllipse.x(132);
        this.blackMovedEllipse.x(132);
        this.blackMovedEllipseTwo.x(132);
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
    loadinganimationTwoBall(judgeTwoNumberOne: number) {
        this.redMovedEllipse.x(132);
        this.blackMovedEllipse.x(132);
        this.blackMovedEllipseTwo.x(132);
        this.redMovedEllipse.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);
        if (judgeTwoNumberOne <= 9) {
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
        } else if (judgeTwoNumberOne > 9 && judgeTwoNumberOne <= 19) {
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
        } else {
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
        }
    }

    stopOneBallTween() {
        this.redMovedEllipse.x(132);
        this.blackMovedEllipse.x(132);
        this.blackMovedEllipseTwo.x(132);
        this.redMovedEllipse.y(92);
        this.blackMovedEllipse.y(92);
        this.blackMovedEllipseTwo.y(92);
    }

    //抓一个球一次
    shwoGrabOneBallOneTime(isActive1: boolean) {
        if (isActive1) {

            this.stopFunction(this.intervalId);
            this.judgeNumberOne = Math.floor(Math.random() * 30);
            if (this.judgeNumberOne <= 9) {
                //小于10 取得是红球 ，加载红球动画
                this.loadinganimation(this.judgeNumberOne);
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(false);
                this.blackMovedEllipseTwo.visible(false);
                this.redTween.play();
                this.redNumberOne  = this.redNumberOne + 1;
                this.writeRedText = this.redNumberOne;
                document.getElementById('redballtime').innerHTML = this.writeRedText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else if (this.judgeNumberOne > 9 && this.judgeNumberOne <= 19) {
                //大于10 取得是黑球 ， 加载黑球动画
                this.loadinganimation(this.judgeNumberOne);
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(true);
                this.blackMovedEllipseTwo.visible(false);
                this.blackTween.play();
                this.blackNumberOne = this.blackNumberOne + 1;
                this.writeBlackText = this.blackNumberOne;
                document.getElementById('blackballtime').innerHTML =  this.writeBlackText ;
                setTimeout ( () => {
                    this.blackMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else {
                this.loadinganimation(this.judgeNumberOne);
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(false);
                this.blackMovedEllipseTwo.visible(true);
                this.blackTweenTwo.play();
                this.blackNumberOne = this.blackNumberOne + 1;
                this.writeBlackText = this.blackNumberOne;
                document.getElementById('blackballtime').innerHTML =  this.writeBlackText;
                setTimeout ( () => {
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }
        }
    }

    //抓两个球一次
    shwoGrabTwoBallOneTime(isActive1: boolean) {

        if (isActive1) {
            // this.stopOneBallTween();
            document.getElementById('twoblackball').innerHTML = this.lang.twoblack;
            document.getElementById('oneredanblackball').innerHTML = this.lang.onered;

            this.stopFunction(this.intervalId);
            //判断一个球
            this.judgeTwoNumberOne = Math.floor(Math.random() * 30);
            if (this.judgeTwoNumberOne <= 9) {
                //小于等于9 加载两个黑球
                this.loadinganimationTwoBall(this.judgeTwoNumberOne);
                this.redMovedEllipse.visible(false);
                this.blackMovedEllipse.visible(true);
                this.blackMovedEllipseTwo.visible(true);
                this.blackTween.play();
                this.blackTweenTwo.play();
                this.judgeTwoNumberBclakAndBclak += 1;
                this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                document.getElementById('redballtime').innerHTML = this.writeTwoBlackText;
                setTimeout ( () => {
                    this.blackMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else if (this.judgeTwoNumberOne > 9 && this.judgeTwoNumberOne <= 19) {
                //加载红球和第二个黑球
                this.loadinganimationTwoBall(this.judgeTwoNumberOne);
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(false);
                this.blackMovedEllipseTwo.visible(true);
                this.redTween.play();
                this.blackTweenTwo.play();
                this.judgeTwoNumberRedAndBclak +=  1;
                this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                document.getElementById('blackballtime').innerHTML =  this.writeRedAndBlackText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.animationLayer.draw();
                } , 500);
            } else {
                //加载红球和第一个黑球
                this.loadinganimationTwoBall(this.judgeTwoNumberOne);
                this.redMovedEllipse.visible(true);
                this.blackMovedEllipse.visible(true);
                this.blackMovedEllipseTwo.visible(false);
                this.redTween.play();
                this.blackTween.play();
                this.judgeTwoNumberRedAndBclak += 1;
                this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                document.getElementById('blackballtime').innerHTML =  this.writeRedAndBlackText;
                setTimeout ( () => {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.animationLayer.draw();
                } , 500);
            }
        }
    }


    //抓一个球一百次
    showGrabOneBallHundredTime(isActive2: boolean) {
        if (isActive2) {
            console.log(isActive2 + '抓一个球100次');
            this.numberHundred = 0;
            this.intervalId = setInterval( () => {
                this.judgeNumberHundred = Math.floor(Math.random() * 30);
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                this.blackMovedEllipseTwo.y(0);
                this.redMovedEllipse.x(132);
                this.blackMovedEllipse.x(132);
                this.blackMovedEllipseTwo.x(132);
                if (this.judgeNumberHundred <= 9) {
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(false);
                    this.redNumberOne = this.redNumberOne + 1;
                    this.numberHundred = this.numberHundred + 1;
                    this.writeRedText = this.redNumberOne;
                    document.getElementById('redballtime').innerHTML = this.writeRedText;
                } else if (this.judgeNumberHundred > 9 && this.judgeNumberHundred <= 19) {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.blackNumberOne = this.blackNumberOne + 1;
                    this.numberHundred = this.numberHundred + 1;
                    this.writeBlackText = this.blackNumberOne;
                    document.getElementById('blackballtime').innerHTML = this.writeBlackText;
                } else {
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
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
                    // //禁用下面两个按钮
                    // (window as any).viewHandler.viewModel.$data.buttonStyle1one = true;
                    // (window as any).viewHandler.viewModel.$data.buttonStyle2one = true;
                    // //禁用上面两个按钮
                    // (window as any).viewHandler.viewModel.$data.buttonStyle3one = true;
                    // (window as any).viewHandler.viewModel.$data.buttonStyle4one = true;
                } else {
                    //当点击抓取100次的按钮后判断是否已经再执行该方法，如果没有执行，移除disable属性让其能够再次点击
                    document.getElementById('btn2').removeAttribute('disabled');
                    document.getElementById('btn1').removeAttribute('disabled');
                    (window as any).viewHandler.viewModel.$data.buttonStyle1one = false;
                    (window as any).viewHandler.viewModel.$data.buttonStyle2one = false;
                    //解除上面两个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.buttonStyle3one = false;
                    (window as any).viewHandler.viewModel.$data.buttonStyle4one = false;

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
    showGrabTwoBallHundredTime(isActive2: boolean) {
        if (isActive2) {
            this.numberHundredTwo = 0;
            //循环执行的计时器
            this.intervalId = setInterval( () => {
                this.judgeNumberHundred = Math.floor(Math.random() * 30);
                //将坐标都改为0
                this.redMovedEllipse.y(0);
                this.blackMovedEllipse.y(0);
                this.blackMovedEllipseTwo.y(0);
                if (this.judgeNumberHundred <= 9) {
                    //显示两个黑色球
                    this.blackMovedEllipse.x(95);
                    this.blackMovedEllipseTwo.x(169);
                    this.redMovedEllipse.visible(false);
                    this.blackMovedEllipse.visible(true);
                    this.blackMovedEllipseTwo.visible(true);
                    this.judgeTwoNumberBclakAndBclak += 1;
                    this.writeTwoBlackText = this.judgeTwoNumberBclakAndBclak;
                    this.numberHundredTwo = this.numberHundredTwo + 1;
                    document.getElementById('redballtime').innerHTML = this.writeTwoBlackText;
                } else if (this.judgeNumberHundred > 9 && this.judgeNumberHundred <= 19) {
                    //显示红球和第二个黑球
                    this.redMovedEllipse.x(95);
                    this.blackMovedEllipseTwo.x(169);
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(false);
                    this.blackMovedEllipseTwo.visible(true);
                    this.judgeTwoNumberRedAndBclak +=  1;
                    this.numberHundredTwo = this.numberHundredTwo + 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    document.getElementById('blackballtime').innerHTML = this.writeRedAndBlackText;
                } else {
                    //显示红球和第一个黑球
                    this.redMovedEllipse.x(95);
                    this.blackMovedEllipse.x(169);
                    this.redMovedEllipse.visible(true);
                    this.blackMovedEllipse.visible(true);
                    this.blackMovedEllipseTwo.visible(false);
                    this.numberHundredTwo = this.numberHundredTwo + 1;
                    this.judgeTwoNumberRedAndBclak += 1;
                    this.writeRedAndBlackText = this.judgeTwoNumberRedAndBclak;
                    document.getElementById('blackballtime').innerHTML = this.writeRedAndBlackText;
                }

                this.nums = this.blackNumberOne + this.redNumberOne;
                if (this.numberHundredTwo === 100) {
                    this.stopFunction(this.intervalId);
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
                    // //禁用下面两个按钮
                    // (window as any).viewHandler.viewModel.$data.buttonStyle1one = true;
                    // (window as any).viewHandler.viewModel.$data.buttonStyle2one = true;
                    // //禁用上面两个按钮
                    // (window as any).viewHandler.viewModel.$data.buttonStyle3one = true;
                    // (window as any).viewHandler.viewModel.$data.buttonStyle4one = true;
                } else {
                    //当点击抓取100次的按钮后判断是否已经再执行该方法，如果没有执行，移除disable属性让其能够再次点击
                    document.getElementById('btn2').removeAttribute('disabled');
                    document.getElementById('btn1').removeAttribute('disabled');
                    //解除下面两个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.buttonStyle1one = false;
                    (window as any).viewHandler.viewModel.$data.buttonStyle2one = false;
                    //解除上面两个按钮的禁用
                    (window as any).viewHandler.viewModel.$data.buttonStyle3one = false;
                    (window as any).viewHandler.viewModel.$data.buttonStyle4one = false;

                    (window as any).viewHandler.viewModel.$data.isActive2 = false;
                }
            }, 100);
        } else {
            console.log('isActive2');
            this.redMovedEllipse.y(92);
            this.blackMovedEllipse.y(92);
            this.blackMovedEllipseTwo.y(92);
            this.redMovedEllipse.x(132);
            this.blackMovedEllipse.x(132);
            this.blackMovedEllipseTwo.x(132);
        }
    }

    //抓一个球
    async shwoGrabOneOne(isActive3: boolean) {
        if (isActive3) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            document.getElementById('twoblackball').innerHTML = this.lang.text[2];
            document.getElementById('oneredanblackball').innerHTML = this.lang.text[3];
            document.getElementById('redballtime').innerHTML = '0';
            document.getElementById('blackballtime').innerHTML = '0';
            this.stopFunction(this.intervalId);
            this.judgeTwoNumberRedAndBclak = 0;
            this.judgeTwoNumberBclakAndBclak = 0;
        }
    }

    //抓两个球
    async showGrabTwoTwo(isActive4: boolean) {
        if (isActive4) {
            this.backBoxImages = await this.loadImage((backBoxImages as any), this.config.backBox as any);
            this.staticLayer.add(this.backBoxImages);
            this.staticLayer.draw();
            document.getElementById('twoblackball').innerHTML = this.lang.twoblack;
            document.getElementById('oneredanblackball').innerHTML = this.lang.onered;
            document.getElementById('redballtime').innerHTML = '0';
            document.getElementById('blackballtime').innerHTML = '0';
            this.stopFunction(this.intervalId);
            this.redNumberOne = 0;
            this.blackNumberOne = 0;
        }
    }

    ballDisappearance() {
        this.redMovedEllipse.visible(false);
        this.blackMovedEllipse.visible(false);
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

        document.getElementById('twoblackball').innerHTML = this.lang.text[2];
        document.getElementById('oneredanblackball').innerHTML = this.lang.text[3];
        document.getElementById('redballtime').innerHTML = '0';
        document.getElementById('blackballtime').innerHTML = '0';

        //点击重置按钮之后。重新开始计数
        this.redNumberOne = 0;
        this.blackNumberOne = 0;
        this.judgeTwoNumberRedAndBclak = 0;
        this.judgeTwoNumberBclakAndBclak = 0;
        document.getElementById('redballtime').innerHTML = '0';
        document.getElementById('blackballtime').innerHTML = '0';
        this.stopFunction(this.intervalId);
        //直接重置必须移除disabled属性
        document.getElementById('buttonStyle1-div').setAttribute('hidden' , 'true');
        document.getElementById('buttonStyle2-div').setAttribute('hidden' , 'true');
        document.getElementById('btn2').setAttribute('disabled' , 'true');
        document.getElementById('btn1').setAttribute('disabled' , 'true');

        //解除下面两个按钮的禁用
        (window as any).viewHandler.viewModel.$data.buttonStyle1one = false;
        (window as any).viewHandler.viewModel.$data.buttonStyle2one = false;

        //解除上面两个按钮的禁用
        (window as any).viewHandler.viewModel.$data.buttonStyle3one = false;
        (window as any).viewHandler.viewModel.$data.buttonStyle4one = false;

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

