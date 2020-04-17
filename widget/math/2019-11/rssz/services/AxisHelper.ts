import Konva from 'konva';
import {XAxis} from './XAxis';
import {ControllerLayer} from './ControllerLayer' ;
import {ViewModel} from '../ViewModel';

export class AxisHelper {
    stage: Konva.Stage;

    //坐标轴
    x: XAxis;
    //原点、正方向、单位长度控制层
    controllerBtn: ControllerLayer;
    viewmodel: ViewModel;
    frontlayer: Konva.Layer;
    backlayer: Konva.Layer;
    //定义滚轮滚动参数
    num = [1, 5, 10];
    number = 1;
    temp = 0;
    //定义开始触屏手指两点坐标
    touchStratOneX = 0;
    touchStratOneY = 0;
    touchStratAnotherX = 0;
    touchStratAnotherY = 0;
    touchEndOneX = 0;
    touchEndOneY = 0;
    touchEndAnotherX = 0;
    touchEndAnotherY = 0;


    scale = window.innerWidth / window.innerHeight > 16 / 9
        ? window.innerHeight / 675
        : window.innerWidth / 1200;

    constructor() {
        this.init();
    }

    init() {
        this.initCanvas();
        this.changeScaleFactor();
    }

    //初始化
    initCanvas() {
        this.stage = new Konva.Stage({
            container: 'rszbz',
            width: window.innerWidth,
            height: window.innerHeight,

        });

        this.frontlayer = new Konva.Layer();
        this.backlayer = new Konva.Layer();

        this.x = new XAxis(this.backlayer);
        this.controllerBtn = new ControllerLayer(this.frontlayer);

        this.stage.add(this.backlayer);
        this.stage.add(this.frontlayer);

        this.stage.draw();
    }

    // 监听事件封装
    private changeScaleFactor() {
        this.stage.off(' touchstart  touchend');
        this.stage.on('touchstart', (e) => {
            const len = e.evt.touches.length;
            if (len === 2) {
                this.touchStratOneX = (e.evt as TouchEvent).touches[0].pageX;
                this.touchStratOneY = (e.evt as TouchEvent).touches[0].pageY;
                this.touchStratAnotherX = (e.evt as TouchEvent).touches[1].pageX;
                this.touchStratAnotherY = (e.evt as TouchEvent).touches[1].pageY;
            }
        });
        this.stage.on('touchmove', (e) => {
            this.stage.container().style.cursor = 'default';
            const len = e.evt.touches.length;
            if (len === 2) {
                this.touchEndOneX = (e.evt as TouchEvent).touches[0].pageX;
                this.touchEndOneY = (e.evt as TouchEvent).touches[0].pageY;
                this.touchEndAnotherX = (e.evt as TouchEvent).touches[1].pageX;
                this.touchEndAnotherY = (e.evt as TouchEvent).touches[1].pageY;
            }
        });

        //监听两指缩放
        this.stage.on('touchend', (e) => {
            this.stage.container().style.cursor = 'default';
            //判断e.evt.touches.length === 1，使得touchend只执行一次（e.evt.touches.length 会有两个值 0 和 1）
            if (e.evt.touches.length === 1) {
                if (Math.sqrt(Math.abs(this.touchStratAnotherX - this.touchStratOneX) +
                    Math.abs(this.touchStratAnotherY - this.touchStratOneY)) -
                    Math.sqrt(Math.abs(this.touchEndAnotherX - this.touchEndOneX) +
                        Math.abs(this.touchEndAnotherY - this.touchEndOneY)) > 0
                ) {
                    this.wheelDown();
                } else if ((Math.sqrt(Math.abs(this.touchStratAnotherX - this.touchStratOneX) +
                    Math.abs(this.touchStratAnotherY - this.touchStratOneY)) -
                    Math.sqrt(Math.abs(this.touchEndAnotherX - this.touchEndOneX) +
                        Math.abs(this.touchEndAnotherY - this.touchEndOneY)) < 0)) {
                    this.wheelUp();
                }
            }
        });
        this.x.arrow.on('mouseover', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.x.arrow.on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });


        //监听滑轮滚动事件
        //在ie下有效
        window.onmousewheel = (event: any) => {
            event = event || window.event;
            if (event.wheelDelta) {
                if (event.wheelDelta > 0) {//向上滚动}else{//向下}　　
                    this.wheelUp();
                } else if (event.wheelDelta < 0) {
                    this.wheelDown();
                }

            }
        };
        window.addEventListener('DOMMouseScroll ', (event: any) => {
            event = event || window.event;
            if (event.wheelDelta) {
                if (event.wheelDelta > 0) {//向上滚动}else{//向下}　　
                    this.wheelUp();
                } else if (event.wheelDelta < 0) {
                    this.wheelDown();
                }

            }
        });
    }

    //鼠标滑轮上滑
    wheelUp() {
        if (this.temp < 2) {
            this.temp += 1;
        } else {
            this.temp = 2;
        }
        this.number = this.num[this.temp];
        this.x.layer.removeChildren();
        this.x.scaleFactor = this.number;
        this.x.drawLineAndNum();
        this.x.drawArrow();
        this.controllerBtn.msgBg.visible(false);
        this.controllerBtn.msg.visible(false);
        this.stage.add(this.backlayer);
        this.stage.add(this.frontlayer);
        this.stage.draw();
    }

    //鼠标滑轮下滑
    wheelDown() {
        if (this.temp > 0) {
            this.temp -= 1;
        } else {
            this.temp = 0;
        }
        this.number = this.num[this.temp];
        this.x.layer.removeChildren();
        this.x.scaleFactor = this.number;
        this.x.drawLineAndNum();
        this.x.drawArrow();
        this.controllerBtn.msgBg.visible(false);
        this.controllerBtn.msg.visible(false);
        this.stage.add(this.backlayer);
        this.stage.add(this.frontlayer);
        this.stage.draw();
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;
        this.stage.width(1200 * this.scale);
        this.stage.height(675 * this.scale);
        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);
        this.initCanvas();
        this.controllerBtn.msgBg.visible(false);
        this.controllerBtn.msg.visible(false);
        this.stage.draw();
    }

    reset() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(1200 * this.scale);
        this.stage.height(675 * this.scale);

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);
        this.temp = 0;
        this.init();
    }

}
