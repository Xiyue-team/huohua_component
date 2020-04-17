import Konva from 'konva';
import {XAxis} from './XAxis';
import {XTool} from './XTool';
import {InequationLayer} from './InequationLayer';

export class BssHelper {
    stage: Konva.Stage;
    //坐标轴X轴
    XAxis: XAxis;
    //不等式组控制layer
    XTool: XTool;
    //不等式控制layer
    InequationLayer: InequationLayer;

    innerlayer: Konva.Layer;
    frontlayer: Konva.Layer;
    backlayer: Konva.Layer;

    //定义两个参数用于页面变化记录值
    leftNum = -4;
    rightNum = 4;

    //定义两个参数存放符号
    symbolLeft = '<';
    symbolRight = '<';

    symbolLeftIndex = 0;
    symbolRightIndex = 0;

    //定义监听数组按钮点击参数
    buttonB =  false;


    constructor() {
        this.init();
    }

    init() {
        this.initCanvas();
    }

    //初始化
    initCanvas() {
        this.stage = new Konva.Stage({
            container: 'zbz',
            width: window.innerWidth,
            height: window.innerHeight,

        });

        this.backlayer = new Konva.Layer();
        this.frontlayer = new Konva.Layer();
        this.innerlayer = new Konva.Layer();

        this.XAxis = new XAxis(this.backlayer);
        this.XTool = new XTool(this.frontlayer);
        this.InequationLayer = new InequationLayer(this.innerlayer);
        this.stage.add(this.innerlayer);
        this.XAxis.rightmovecircle.setAttr('visible' , false);
        this.XAxis.layer.draw();
        this.stage.add(this.backlayer);
        this.stage.draw();
    }

    resizeCanvas() {
        this.stage = new Konva.Stage({
            container: 'zbz',
            width: window.innerWidth,
            height: window.innerHeight,

        });
        this.backlayer = new Konva.Layer();
        this.frontlayer = new Konva.Layer();
        this.innerlayer = new Konva.Layer();


        this.XTool = new XTool(this.frontlayer);
        this.XAxis = new XAxis(this.backlayer);
        this.InequationLayer = new InequationLayer(this.innerlayer);

        this.stage.add(this.frontlayer);
        this.stage.add(this.backlayer);

        this.stage.draw();
    }

    resize() {
        this.stage.width(window.innerWidth);
        this.stage.height(window.innerHeight);
        //页面重置方法
        this.resizeEvent(this.buttonB);
        this.changeSymbolLeft(this.symbolLeft, this.symbolLeftIndex);
        this.changeSymbolRight(this.symbolRight , this.symbolRightIndex);
        this.getSliderValueLeft(this.leftNum);
        this.getSliderValueRight(this.rightNum);
    }

    //不等式组slider控制
    getSliderValueLeft(valueLeft: number) {
        this.XTool.sliderNumberLeft = valueLeft + 4;
        this.XTool.moveLengthLeft(this.XTool.sliderNumberLeft, 0);

        this.InequationLayer.sliderNumber = valueLeft + 4;
        this.InequationLayer.moveLengthLeft(this.InequationLayer.sliderNumber, this.symbolLeftIndex);

        this.XAxis.moveLengthLeft(this.InequationLayer.sliderNumber, 0);

        this.leftNum = valueLeft;
    }

    getSliderValueRight(valueRight: number) {
        this.XTool.sliderNumberRight = valueRight - 4;
        this.XTool.moveLengthRight(this.XTool.sliderNumberRight, 0);
        this.XAxis.moveLengthRight(this.XTool.sliderNumberRight, 0);
        this.rightNum = valueRight;
    }

    //不等式组符号改变
    changeSymbolLeft(symbolLeft: string, symbolLeftIndex: number) {
        this.symbolLeft = symbolLeft;
        this.symbolLeftIndex = symbolLeftIndex;
        this.XTool.changeSymbolLeft(this.symbolLeft, this.symbolLeftIndex);
        //左侧不等式符号改变，改变左侧图形朝向
        this.XTool.moveLengthLeft(this.leftNum + 4, this.symbolLeftIndex);

        this.InequationLayer.changeSymbolLeft(this.symbolLeft, this.symbolLeftIndex);
        //左侧不等式符号改变，改变左侧图形朝向
        this.InequationLayer.moveLengthLeft(this.leftNum + 4, this.symbolLeftIndex);

        this.XAxis.changeSymbolLeft(this.symbolLeftIndex);
    }

    changeSymbolRight(symbolRight: string, symbolRightIndex: number) {
        this.symbolRight = symbolRight;
        this.symbolRightIndex = symbolRightIndex;

        //右侧不等式符号改变，改变右侧图形朝向
        this.XTool.changeSymbolRight(this.symbolRight, this.symbolRightIndex);
        this.XTool.moveLengthRight(this.rightNum - 4, this.symbolRightIndex);

        this.XAxis.changeSymbolRight(this.symbolRightIndex);
    }


    //监听不等式组按钮点击事件
    activeButton(active: boolean) {
        if (active) {
            this.innerlayer.remove();
            this.stage.add(this.frontlayer);
            this.XAxis.rightmovecircle.setAttr('visible' , true);
            this.stage.add(this.backlayer);
            this.stage.draw();
        } else {
            this.frontlayer.remove();
            this.stage.add(this.innerlayer);
            this.XAxis.rightmovecircle.setAttr('visible' , false);
            this.stage.add(this.backlayer);
            this.stage.draw();
        }
        this.buttonB = active;
    }

    //页面缩放保持方法
    resizeEvent(active: boolean) {
        if (active) {
            this.resizeCanvas();
            this.XAxis.rightmovecircle.setAttr('visible' , true);
            this.XAxis.layer.draw();
        } else {
            this.initCanvas();
            this.XAxis.rightmovecircle.setAttr('visible' , false);
            this.XAxis.layer.draw();
        }
    }

    reset() {
        this.initCanvas();
        this.buttonB = false;
        this.leftNum = -4;
        this.rightNum = 4;
        //默认符号还原
        this.symbolLeft = '<';
        this.symbolLeftIndex = 0;
        this.symbolRight = '<';
        this.symbolRightIndex = 0;

    }
}
