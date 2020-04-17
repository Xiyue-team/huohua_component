import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import controlButton from '../sub_static/controlButton.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    leftRect: Konva.Rect;
    rightRect: Konva.Rect;

    // 左侧数字
    leftText: Konva.Text;
    // 左侧边框
    leftLine: Konva.Line;

    // 左下数字
    leftBottomText: Konva.Text;
    //左下边框
    leftBottomLine: Konva.Line;

    // 右下数字
    rightBottomText: Konva.Text;
    // 右下边框
    rightBottomLine: Konva.Line;

    // 右侧数字
    rightText: Konva.Text;
    // 右侧边框
    rightLine: Konva.Line;

    // 左上控制按钮
    leftTopButtonImg: Konva.Image;
    // 左下控制按钮
    leftBottomButtonImg: Konva.Image;
    // 右下控制按钮
    rightBottomButtonImg: Konva.Image;

    // 公式描述文本
    descriptionText: Konva.Text;

    constructor() {
        super('canvasContainer');
        this.config = new MyConfig();
        this.init();
    }

    private init() {
        this.initContentRect();
        this.initNumberAndBorder();
        this.initDescription();
        this.initControlButton();

        this.stage.draw();
    }

    //TODO 初始化中心两个色块
    private initContentRect() {
        this.leftRect = new Konva.Rect(this.config.leftRect);
        this.animationLayer.add(this.leftRect);

        this.rightRect = new Konva.Rect(this.config.rightRect);
        this.animationLayer.add(this.rightRect);
    }

    //TODO 初始化拖动数字及边框颜色
    private initNumberAndBorder() {
        // 左侧数字
        this.leftText = new Konva.Text(this.config.leftText);
        this.animationLayer.add(this.leftText);
        // 左侧边框
        this.leftLine = new Konva.Line(this.config.leftLine as any);
        this.animationLayer.add(this.leftText);

        // 左下数字
        this.leftBottomText = new Konva.Text(this.config.leftBottomText);
        this.animationLayer.add(this.leftBottomText);
        //左下边框
        this.leftBottomLine = new Konva.Line(this.config.leftBottomLine  as any);
        this.animationLayer.add(this.leftBottomLine);

        // 右下数字
        this.rightBottomText = new Konva.Text(this.config.rightBottomText);
        this.animationLayer.add(this.rightBottomText);
        // 右下边框
        this.rightBottomLine = new Konva.Line(this.config.rightBottomLine as any);
        this.animationLayer.add(this.rightBottomLine);

        // 右侧数字
        this.rightText = new Konva.Text(this.config.rightText);
        this.animationLayer.add(this.rightText);
        // 右侧边框
        this.rightLine = new Konva.Line(this.config.rightLine as any);
        this.animationLayer.add(this.rightLine);
    }

    //TODO 初始化公式的描述文本
    private initDescription() {

    }

    //TODO 初始化控制按钮
    private async initControlButton() {
        this.leftTopButtonImg = await this.loadImage(controlButton, this.config.leftTopButtonImg as any);
    }

    //TODO 初始化按钮拖动事件
    private initDragEvent() {

    }

    //TODO 限制按钮拖动范围
    private limitDragBound() {

    }

    resize() {

    }

    reset() {

    }
}

