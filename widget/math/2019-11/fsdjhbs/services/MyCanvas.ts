import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    scale = 1;

    //背景矩形
    backRect: Konva.Rect;

    //背景矩阵的宽
    backRectWidth: number;
    //背景矩阵的高
    backRectHeight: number;

    //第一个分数的分母 影响竖线个数
    firstNubmerDenominator = 8;
    //第一个数的分子 影响竖方向矩形
    firstNubmerMolecule = 6;

    //竖线
    verticalLine: Konva.Line;

    //第一个分数影响的背景色
    firstFractionBackRect: Konva.Rect;

    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();
    }

    init() {
        this.initBgCanvas();

        this.drawResultRect();

        this.resize();
    }

    initBgCanvas() {
        this.initBackRect();
    }

    // 初始化背景矩阵
    initBackRect() {
        //背景矩形
        this.backRect = new Konva.Rect(this.config.backRect as any);
        this.staticLayer.add(this.backRect);
    }

    //画分数影响的矩阵和线
    drawResultRect() {
        //修改背景矩形的大小
        this.firstFractionBackRect = new Konva.Rect(this.config.firstFractionBackRect);
        this.backRectWidth =  this.backRect.width();
        this.backRectHeight = this.backRect.height();
        //修改背景矩形的宽
        this.firstFractionBackRect.width(this.firstNubmerMolecule * this.backRect.width() / this.firstNubmerDenominator);
        //修改背景矩形的高
        this.firstFractionBackRect.height(this.backRectHeight);
        this.animationLayer.add(this.firstFractionBackRect);
        const firstDenominatorCoefficient = this.firstNubmerDenominator;
        //循环生成分割的竖线
        for ( let i = 0; i <  this.firstNubmerDenominator; i ++) {
            console.log(firstDenominatorCoefficient);
            this.verticalLine = new Konva.Line(this.config.verticalLine);
            this.verticalLine.points( [i * this.backRectWidth / firstDenominatorCoefficient, 0,
                                       i * this.backRectWidth / firstDenominatorCoefficient, this.backRectHeight]);
            //改变被选择矩阵中线的颜色
            if (i < this.firstNubmerMolecule) {
                this.verticalLine.stroke('#FFFFFF');
            }
            this.animationLayer.add(this.verticalLine);
            console.log('this.verticalLine.x() ' + i + this.verticalLine.x());
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

        //设置id为container的标签内容居中
        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        this.stage.draw();
    }
}

