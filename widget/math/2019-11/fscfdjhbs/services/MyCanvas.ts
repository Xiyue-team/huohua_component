import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    scale = 1;

    //背景矩形
    backRect: Konva.Rect;

    //背景矩形的宽
    backRectWidth: number;
    //背景矩形的高
    backRectHeight: number;

    //第一个分数的分母 影响竖线个数
    firstNubmerDenominator = 9;
    //第一个数的分子 影响竖方向矩形
    firstNubmerMolecule = 2;
    //第二个分数的分母 影响横线数目
    secondNubmerDenominator = 3;
    //第二个数的分子 影响横方向矩形
    secondNubmerMolecule = 2;

    //画竖线
    verticalLine: Konva.Line;
    //画横线
    horizontalLine: Konva.Line;

    //第一个分数影响的背景色
    firstFractionBackRect: Konva.Rect;
    //第二个分数影响的背景色
    secondFractionBackRect: Konva.Rect;

    //画分数中间的线
    scoreLineLeft: Konva.Line;
    scoreLineRight: Konva.Line;

    //构造函数
    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();
    }

    //初始化
    init() {
        this.initBgCanvas();

        this.drawResultRect();
        this.drawScoreLine();

        this.resize();
    }

    initBgCanvas() {
        // 初始化背景矩阵
        this.initBackRect();
    }

    drawScoreLine() {

        this.scoreLineLeft = new Konva.Line(this.config.scoreLineLeft);
        this.scoreLineRight = new Konva.Line(this.config.scoreLineRight);

        this.animationLayer.add(this.scoreLineLeft);
        this.animationLayer.add(this.scoreLineRight);
    }

    // 初始化背景矩阵
    initBackRect() {
        //背景矩形
        this.backRect = new Konva.Rect(this.config.backRect as any);
        this.staticLayer.add(this.backRect);
    }

    //根据结果改变各矩阵的大小和线的长短位置
    drawResultRect() {

        this.backRectWidth =  this.backRect.width();
        this.backRectHeight = this.backRect.height();
        //第一个分数控制的矩阵
        this.firstFractionBackRect = new Konva.Rect(this.config.firstFractionBackRect);
        this.firstFractionBackRect.width(this.firstNubmerMolecule * this.backRect.width() / this.firstNubmerDenominator);
        this.firstFractionBackRect.height(this.backRectHeight);
        //第二个分钟控制的矩阵
        this.secondFractionBackRect = new Konva.Rect(this.config.secondFractionBackRect);
        this.secondFractionBackRect.width(this.firstNubmerMolecule * this.backRect.width() / this.firstNubmerDenominator);
        this.secondFractionBackRect.height(this.secondNubmerMolecule * this.backRect.height() / this.secondNubmerDenominator);

        //添加到animationLayer中
        this.animationLayer.add(this.firstFractionBackRect);
        this.animationLayer.add(this.secondFractionBackRect);

        const firstDenominatorCoefficient = this.firstNubmerDenominator;
        const secondDenominatorCoefficient = this.secondNubmerDenominator;
        //循环生成竖线
        for ( let i = 0; i <  this.firstNubmerDenominator; i ++) {
            console.log(firstDenominatorCoefficient);
            this.verticalLine = new Konva.Line(this.config.verticalLine);
            this.verticalLine.points( [i * this.backRectWidth / firstDenominatorCoefficient, 0,
                                       i * this.backRectWidth / firstDenominatorCoefficient, this.backRectHeight]);
            //改变在有色矩阵中的竖线的颜色
            if (i <= this.firstNubmerMolecule ) {
                this.verticalLine.stroke('#E7E7E7');
            }
            this.animationLayer.add(this.verticalLine);
            console.log('this.verticalLine.x() ' + i + this.verticalLine.x());
        }
        //循环生成横线
        for (let i = 0 ; i < secondDenominatorCoefficient; i ++ ) {
            this.horizontalLine = new Konva.Line(this.config.horizontalLine);
            this.horizontalLine.points([0 , i * this.backRectHeight / secondDenominatorCoefficient,
                this.firstNubmerMolecule * this.backRectWidth / firstDenominatorCoefficient,
                i * this.backRectHeight / secondDenominatorCoefficient]);
            //改变在有色矩阵中的横线的颜色
            if (i <= this.secondNubmerMolecule) {
                this.horizontalLine.stroke('#E7E7E7');
            }
            this.animationLayer.add(this.horizontalLine);
            console.log('this.horizontalLine.x() ' + i + this.horizontalLine.x());
        }
    }

    // 重置
    reset() {
        this.staticLayer.removeChildren();
        this.animationLayer.removeChildren();
        this.init();
    }

    //改变窗口
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(612 * this.scale);
        this.stage.height(336 * this.scale);

        //设置id为container标签中的内容居中
        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) * 38.1 / 50 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        this.stage.draw();
    }
}

