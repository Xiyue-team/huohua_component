import { TweenMax, Linear } from 'gsap';
import {fabric} from 'fabric';

const arrowImg = require('../sub_static/arrow.png');
const arrow2Img = require('../sub_static/arrow2.png');
const freeElectronImg = require('../sub_static/freeElectron.png');
export class Dlxcyl2dModel {
    private canvas: fabric.StaticCanvas;                    // 场景
    
    private scaleValue = new ScaleValue();
    private interval: NodeJS.Timer = null;                  // 定时器，控制自由电子初始跳动
    private newInterval: NodeJS.Timer = null;               // 控制新增自由电子
    private electrifyStatus = false;                        // 是否已通电
    private speed = 100;                                    // 通电运行速度
    private top: number;                                    // 距离顶部距离，计算电子位置使用
    private currentDirectionTip: fabric.Group;              // 场景
    private electronDirectionTip: fabric.Group;             // 场景

    /**
     *正电荷位置
     */
    private pcPositions = [
        {x: 80, y: 90}, {x: 170, y: 170}, {x: 330, y: 220}, {x: 450, y: 70}, {x: 530, y: 210}, {x: 610, y: 155}, {x: 680, y: 125}, 
        {x: 810, y: 140}, {x: 870, y: 70}, {x: 870, y: 170}, {x: 970, y: 80}, {x: 950, y: 135}, {x: 1045, y: 100}, {x: 1150, y: 155}
    ];
    /**
     * 负电荷位置
     */
    private ncPositions = [
        {x: 83, y: 177}, {x: 168, y: 110}, {x: 168, y: 224}, {x: 259, y: 170}, {x: 352, y: 67}, {x: 417, y: 136}, {x: 488, y: 177}, 
        {x: 623, y: 69}, {x: 656, y: 190}, {x: 783, y: 93}, {x: 976, y: 162}, {x: 1107, y: 74}, {x: 1157, y: 95}
    ];
    /**
     *自由电子位置
     */
    private fePositions = [
        {x: 222, y: 61}, {x: 269, y: 113}, {x: 345, y: 136}, {x: 420, y: 198}, {x: 518, y: 117}, {x: 570, y: 117}, {x: 733, y: 69}, 
        {x: 749, y: 162}, {x: 900, y: 117}, {x: 1034, y: 203}, {x: 1075, y: 162}
    ];
    /**
     * 
     * @param {string} container 载体
     */
    constructor(container: string) {
        console.log('init Dlxcyl2DModel constructor');
        this.initStage(container);
        this.initStaticScene();
        this.initElectron();
        this.createArrowGroup();
        this.initInterval();
        this.initLegend();
    }
    /**
     * 初始化舞台
     * @param container 容器
     */
    private initStage(container: string) {
        this.canvas = new fabric.StaticCanvas(container);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);
        // 计算顶部距离距离让内容剧中
        this.top  = (this.canvas.getHeight() / this.scaleValue.scale - 293) * 0.5;
    }
    
    /**
     * 初始化静态场景
     * 并添加初始电子
     */
    private initStaticScene() {
        const sceneBg = new fabric.Rect({
            width: this.canvas.getWidth() / this.scaleValue.scale,
            height: 293,
            fill: 'white',
            top: this.top 
        });
        this.canvas.add(sceneBg);
    }

    /**
     * 创建电子
     */
    private initElectron() {
        this.initPositiveElectron();
        this.initNegatronElectron();
        this.initFreeElectron();
    }

    /**
     * 初始化正电子
     */
    private initPositiveElectron() {
        for (let index = 0; index < this.pcPositions.length; index++) {
            const pos = this.pcPositions[index];
            const circle = this.createCircle(13, '#0091FF');
            const rect = this.createRect(17.3, 3.5);
            const rect2 = this.createRect(3.5, 17.3);
            const group = new fabric.Group([circle, rect, rect2], {
                left: pos.x,
                top: this.top + pos.y,
                name: 'positiveCharge'
            });
            this.canvas.add(group);
        }
    }

    /**
     * 初始化负电子
     */
    private initNegatronElectron() {
        for (let index = 0; index < this.ncPositions.length; index++) {
            const pos = this.ncPositions[index];
            const circle = this.createCircle(13, '#FFA800');
            const rect = this.createRect(17.3, 3.5);
            const group = new fabric.Group([circle, rect], {
                left: pos.x,
                top: this.top + pos.y,
                name: 'negatronCharge'
            });
            this.canvas.add(group);
        }
    }

    /**
     * 初始化自由电子
     */
    private initFreeElectron() {
        for (let index = 0; index < this.fePositions.length; index++) {
            const pos = this.fePositions[index];
            const circle = this.createCircle(13, '#FF5454');
            const rect = this.createRect(17.3, 3.5);
            const group = new fabric.Group([circle, rect], {
                left: pos.x,
                top: this.top + pos.y,
                name: 'freeElectron'
            });
            this.canvas.add(group);
        }
    }

    /**
     * 创建圆
     * @param radius 宽度
     * @param fill 填充颜色
     */
    private createCircle(radius: number, fill: string = '#FFFFFF'): fabric.Circle {
        return new fabric.Circle({
            radius,
            fill,
            originX: 'center',
            originY: 'center'
        });
    }

    /**
     * 创建矩形
     * @param width 宽度
     * @param height 高度
     * @param fill 填充颜色
     */
    private createRect(width: number, height: number, fill: string = '#FFFFFF'): fabric.Rect {
        return new fabric.Rect({
            width, 
            height, 
            fill,
            originX: 'center',
            originY: 'center' 
        });
    }
    /**
     * 创建电荷自由电子移动方向
     */
    private createArrowGroup() {
        fabric.Image.fromURL(arrowImg, (image: fabric.Image) => {
            const upText = new fabric.Text(window.env.browserInfo.lang.currentDirection, {
                left: 220,
                top: 11,
                fontSize: 24,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: 'white'
            });
        
            this.currentDirectionTip = new fabric.Group([image, upText], {
                top: this.top - 54,
                left: (this.canvas.getWidth() - (upText.width + 220) * this.scaleValue.scale) / 2 / this.scaleValue.scale,
                height: 46,
                visible: false
            });
            this.canvas.add(this.currentDirectionTip);
        });

        fabric.Image.fromURL(arrow2Img, (image: fabric.Image) => {
            const downText = new fabric.Text(window.env.browserInfo.lang.freeElectronDirection, {
                top: 11,
                fontSize: 24,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: 'white'
            });
            image.set({left: downText.width });
        
            this.electronDirectionTip = new fabric.Group([downText, image], {
                top: this.top + 293 + 8,
                left: (this.canvas.getWidth() - (downText.width + 220) * this.scaleValue.scale) / 2 / this.scaleValue.scale,
                height: 46,
                name: 'arrow',
                visible: false
            });
            this.canvas.add(this.electronDirectionTip);
        });
    }
    /**
     * 创建图例
     */
    private initLegend() {
        // 创建自由电子图例
        fabric.Image.fromURL(freeElectronImg, (image: fabric.Image) => {
            image.scale(0.3);
            const legendText = new fabric.Text(window.env.browserInfo.lang.freeElectron, {
                left: 30,
                fontSize: 18,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: 'white'
            });
            const legendGroup = new fabric.Group([legendText, image], {
                top: this.canvas.getHeight() / this.scaleValue.scale  - 56,
                left: 72,
                height: 46
            });
            this.canvas.add(legendGroup);
        });
    }

    /** 
     * 初始定时器让自由电子随机运动 
     * 1.自由电子在原来的位置随机半径20像素间移动
     */
    private initInterval() {
        this.interval = setInterval(() => {
            this.canvas.getObjects().filter(fe => {
                return fe.get('name') === 'freeElectron';
            }).forEach((fe, index) => {
                TweenMax.to(fe, 0.5, {
                    left: this.fePositions[index].x + Math.round(Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1)),
                    top: this.top + this.fePositions[index].y + Math.round(Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)),
                    onUpdate: this.canvas.renderAll.bind(this.canvas)
                });
            }, this);
        }, 300, this);
    }

    /**
     * 创建新的自由电子，并控制循环移动
     */
    private createFreeElectron() {
        const circle = this.createCircle(13, '#FF5454');
        const rect = this.createRect(17.3, 3.5);
        const group = new fabric.Group([circle, rect], {
            left: 0,
            top: this.top + 10 + Math.round(Math.random() * 250),
            name: 'freeElectron'
        });
        this.canvas.add(group);
        this.moveFreeElectron(group);
    }

    /**
     * 移动电子
     * @param fe 
     */
    private moveFreeElectron(fe: fabric.Object) {
        const endX = this.canvas.getWidth() / this.scaleValue.scale;
        const duration = (endX - fe.left) / this.speed;
        TweenMax.to(fe, duration, {
            ease: Linear.easeNone,
            left: endX,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                this.canvas.remove(fe);
            }
        });
    }

    /** 
     * 通电按钮事件
     */
    electrifyEvent() {
        if (this.electrifyStatus) {
            return;
        }
        this.electrifyStatus = !this.electrifyStatus;

        clearInterval(this.interval);
        // 将原始的组元素移除，增加新的自由电子
        this.canvas.getObjects().filter(fe => {
            return fe.get('name') === 'freeElectron';
        }).forEach(fe => {
            this.moveFreeElectron(fe);
        });
        
        this.createFreeElectron();
        this.newInterval = setInterval(() => {
            this.createFreeElectron();
        }, 600, this);
        
        // 打开电流、自由电子方向提示
        this.electronDirectionTip.visible = true;
        this.currentDirectionTip.visible = true;
    }

    /** 
     * 重置场景 
     */
    reset() {
        clearInterval(this.interval);
        clearInterval(this.newInterval);

        // 移除现有自由电子
        const freeElectrons = this.canvas.getObjects().filter(fe => {
            return fe.get('name') === 'freeElectron';
        });
        this.canvas.remove(...freeElectrons);
        // 初始化自由电子
        this.initFreeElectron();
        this.electrifyStatus = false;
        // 隐藏电流、自由电子方向提示
        this.electronDirectionTip.visible = false;
        this.currentDirectionTip.visible = false;
        this.initInterval();
    }

}

export class ScaleValue {
    scale = window.innerWidth / 1200;
}
