/**
 * 电子轨道类
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-24 上午9:26
 *
 */
import {ViewController} from '../../../../../src/core/ViewController';
import {ViewModel} from '../ViewModel';

const createjs = require('createjs-npm');

export class ElectronTrack {

    //半径
    radius: number;
    //箭头图片
    arrowImg: HTMLImageElement;
    //弧对象
    arc: any;
    //补全对象
    dashArc: any;

    //箭头容器
    arwContainer: any;
    //箭头对象
    arwBmp: any;
    //线的颜色
    lineColor: string;

    dpr: number;
    //动画对象
    animation: any;
    //运动的角度
    angle = 359;

    //电子图片
    electronBmp: any;
    orgElectronBmp: any;

    //中心点
    centerPoint: any;
    data = { angle : 0};

    duration: number;

    constructor(radius: number, lineColor: string, arrowImg: HTMLImageElement, dpr: number, duration: number,
                angle?: number, electronBmp?: any ) {
        this.radius = radius;
        this.lineColor = lineColor;
        this.arrowImg = arrowImg;
        this.dpr = dpr;
        this.angle = angle ? angle  : this.angle ;
        this.orgElectronBmp = electronBmp;
        this.electronBmp = electronBmp ? electronBmp.clone() : electronBmp;
        this.duration = duration;
        this.createArc();
        this.createAnimation();

    }

    createArc() {

        this.centerPoint = new  createjs.Shape();
        this.centerPoint.graphics.beginStroke(this.lineColor);
        this.centerPoint.graphics.beginFill(this.lineColor);
        this.centerPoint.graphics.drawCircle(0, (- this.radius + 3) * 2 , 6);
        this.centerPoint.visible = false;
        //红色箭头
        this.arwContainer  = new createjs.Container();

        //this.redArwContainer.addChild(line2);


        //箭头图片
        this.arwBmp        = new createjs.Bitmap(this.arrowImg);

        this.arwBmp.x = this.arrowImg.width * 2;
        this.arwBmp.y = this.radius * this.dpr - this.arrowImg.width / 2 ;
        this.arwBmp.rotation = 90;
        this.arwBmp.visible = false;
        this.electronBmp.visible = false;

        //箭头的父节点，最终跟随弧度旋转的容器
        this.arwContainer.addChild(this.arwBmp);

        if (this.electronBmp) {
            //this.electronBmp.x =  - this.electronBmp.image.width / 2;
            //this.electronBmp.y =  - this.electronBmp.image.height / 2;
            this.electronBmp.x = 0    ;
            this.electronBmp.y =   this.radius * this.dpr ;

            this.electronBmp.regX = this.electronBmp.image.width / 2    ;
            this.electronBmp.regY =  this.electronBmp.image.height / 2    ;
            //this.electronBmp.rotation = 60;

            this.arwContainer.addChild(this.electronBmp);
        }



        this.arwContainer.y =  0 - this.radius * this.dpr  ;

        //创建红色轨迹弧线
        this.arc = new createjs.Shape();
        this.arc.graphics.ss(8, 0, 0, 0, true).s(this.lineColor);
        //arc.graphics.sd([20, 15], 0).s('#FF4747').setStrokeStyle(8);
        this.arc.graphics.arc(0, - this.radius * this.dpr, this.radius * this.dpr,   Math.PI / 2, Math.PI / 2 , 1);

        //补全虚线
        let startRadian = 0;
        if (this.angle <= 90) {
            startRadian = Math.PI / 180 * ( 90 - this.angle);
        } else {
            startRadian = 2 * Math.PI - Math.PI / 180 * (this.angle - 90);
        }
        this.dashArc  = new createjs.Shape();
        this.dashArc.graphics.sd([10, 5], 0).s(this.lineColor).setStrokeStyle(8);
        this.dashArc.graphics.arc(0, - this.radius * this.dpr, this.radius * this.dpr,   startRadian,  Math.PI / 2 , 1);
        this.dashArc.visible = false;
    }

    createAnimation(): void {

        //动态修改endAngle
        this.animation = createjs.Tween.get(this.data, {paused: true})
            .to({angle: this.angle}, this.duration);
        this.animation.call(() => {
                //this.animation.removeTweens(this.data);
                (ViewController.getInstance().viewHandler.viewModel as ViewModel).disableSlider = false;
                (ViewController.getInstance().viewHandler.viewModel as ViewModel).restore();
                createjs.Tween.removeTweens(this.data);
                //this.animation.paused = true;
                this.arwBmp.visible = false;
                this.electronBmp.visible = false;
                this.dashArc.visible = true;
                this.orgElectronBmp.visible = true;
                this.centerPoint.visible = true;
            })
            .addEventListener('change', (event: any) => {
                //this.redArwContainer.rotation ++;
                if ( this.data.angle <= 90) {

                    const angle = Math.PI / 180 * ( 90 - this.data.angle);
                    this.arc.graphics.command.endAngle = angle;

                    //console.log(target.endAngle)
                } else {
                    const angle = 2 * Math.PI - Math.PI / 180 * (this.data.angle - 90);
                    this.arc.graphics.command.endAngle = angle;

                    // this.redArwContainer.rotation = ( 90 - data.a) - 360;
                }
                this.arwContainer.rotation = -this.data.angle;
                if (this.electronBmp) {
                    this.electronBmp.rotation = this.data.angle + 30;
                }
                //console.log(event.currentTarget.position)
                /*const angle = event.currentTarget.target.endAngle * 180 / Math.PI;
                console.log(angle);

               this.redArwContainer.rotation = angle;*/
            })
            ;
    }

    transparent(alpha: number ) {
        this.arc.alpha = alpha;
        this.dashArc.alpha = alpha;
        this.centerPoint.alpha = alpha;
    }

    restore() {
        this.arc.alpha = 1;
        this.dashArc.alpha = 1;
    }

    play(): void {
        (ViewController.getInstance().viewHandler.viewModel as ViewModel).disableSlider = true;
        //this.reset();
        this.data.angle = 0;
       // this.arc.graphics.command.endAngle = Math.PI / 2;
        this.createAnimation();

        this.animation.paused = false;

        setTimeout(() => {
            this.arwBmp.visible = true;
            this.dashArc.visible = false;
            this.electronBmp.visible = true;
            this.orgElectronBmp.visible = false;
            this.centerPoint.visible = false;
        }, 30);


        //console.log(this.animation.position = 1);
    }

    reset() {
        createjs.Tween.removeTweens(this.data);

        this.arc.graphics.command.endAngle = Math.PI / 2;
        this.arwBmp.visible = false;
        this.dashArc.visible = false;
        this.electronBmp.visible = false;
        this.centerPoint.visible = false;
    }
}

