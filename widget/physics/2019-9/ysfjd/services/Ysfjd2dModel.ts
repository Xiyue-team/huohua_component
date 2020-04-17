import { TweenMax, Power0, Power1, Power4, Elastic } from 'gsap';
import {fabric} from 'fabric';

const glass = require('../sub_static/glass.png');
const glass2 = require('../sub_static/glass2.png');
const glass3 = require('../sub_static/glass3.png');
const egg = require('../sub_static/egg.png');

export class Ysfjd2dModel {
    private canvas: fabric.StaticCanvas;            // 场景
    private scaleValue = new ScaleValue();          // 场景缩放比例
    private endX: number;                           // 场景水平最右边的数值
    private middleY: number;                        // 场景竖直中心点的数值
    private egg: fabric.Image;                      // 鸡蛋
    private gravityGroup: fabric.Group;             // 重力
    private buoyanceGroup: fabric.Group;            // 浮力
    private supportingForceGroup: fabric.Group;     // 支持力
    private showSupportingForce: Boolean = false;   // 是否显示支持力
    private showForceGroup: Boolean = false;        // 是否显示受力分析
    
    /**
     * 构造函数
     * @param {string} container    载体 html容器id
     * @param {string} canvas       载体 canvas容器id
     */
    constructor(container: string, canvas: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container, canvas);
        this.initLayer();
    }
    
    /**
     * 初始化场景
     * @param container     载体 html容器id
     * @param canvas        载体 canvas容器id
     */
    private initStage(container: string, canvas: string) {
        const dom = document.getElementById(container);
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.canvas = new fabric.Canvas(canvas, {
            selection: false
        });
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.setZoom(this.scaleValue.scale);
        this.endX = this.canvas.getWidth() / this.scaleValue.scale;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
    }

    /**
     * 初始化实验场景
     */
    private async initLayer() {
        // 添加杯子2
        fabric.Image.fromURL(glass2, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
        }, {
            left: this.endX - 450,
            top: this.middleY - 242,
            width: 450,
            height: 484,
            selectable: false
        });
        // 添加杯子3
        fabric.Image.fromURL(glass3, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
        }, {
            left: this.endX - 450,
            top: this.middleY - 242,
            width: 450,
            height: 484,
            selectable: false
        });
        // 添加鸡蛋
        fabric.Image.fromURL(egg, (oImg: fabric.Image) => {
            this.egg = oImg;
            this.canvas.add(oImg);
        }, {
            left: this.endX - 275,
            top: this.middleY,  //  -130 - 93 0 +130
            width: 100,
            height: 74,
            selectable: false
        });
        // 添加杯子1
        fabric.Image.fromURL(glass, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 在杯子加载完成后添加力，以免被挡住
            // 初始化重力
            const gTriangle = new fabric.Triangle({
                top: 0,
                left: 0,
                width: 20,
                height: 20, 
                fill: '#ffffff',
                strokeWidth: 0,
                selectable: false,
                name: 'gTriangle'
            });
            const gLine = new fabric.Rect({
                top: 20,
                left: 8,
                width: 4,
                height: 100,
                fill: '#FFFFFF',
                strokeWidth: 0,
                selectable: false,
                name: 'gLine'
            });  
            const gravityText = new fabric.Text('G', {
                top: 80,
                left: 30,
                fontSize: 20,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FFFFFF',
                selectable: false,
                name: 'gravityText'
            });
            const gravity = new fabric.Group([ gTriangle, gLine ], {
                width: 20,
                originX: 'center',
                originY: 'center',
                selectable: false,
                angle: 180,
                name: 'gravity'
            });
            const gravityGroup = new fabric.Group([ gravity, gravityText ], {
                left: this.endX - 235,
                top: this.middleY + 40, // -90 -53 40 170
                selectable: false,
                opacity: 0
            });
            this.gravityGroup = gravityGroup;
            this.canvas.add(gravityGroup);
            // 初始化浮力
            const bTriangle = new fabric.Triangle({
                top: 0,
                left: 0,
                width: 20,
                height: 20, 
                fill: '#FF2C1D',
                strokeWidth: 0,
                selectable: false,
                name: 'bTriangle'
            });
            const bLine = new fabric.Rect({
                top: 20,
                left: 8,
                width: 4,
                height: 100,
                fill: '#FF2C1D',
                strokeWidth: 0,
                selectable: false,
                name: 'bLine'
            }); 
            const buoyanceText = new fabric.Text('F', {
                top: 20,
                left: 30,
                fontSize: 20,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FF2C1D',
                selectable: false,
                name: 'buoyanceText'
            });
            const buoyanceSmallText = new fabric.Text('浮', {
                top: 30,
                left: 40,
                fontSize: 12,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FF2C1D',
                selectable: false,
                name: 'buoyanceSmallText'
            });
            const buoyanceGroup = new fabric.Group([ bTriangle, bLine, buoyanceText, buoyanceSmallText ], {
                left: this.endX - 235,
                top: this.middleY - 80, // -210 -173 -80 50
                selectable: false,
                opacity: 0
            });
            this.buoyanceGroup = buoyanceGroup;
            this.canvas.add(buoyanceGroup);
            // 初始化支持力
            const sTriangle = new fabric.Triangle({
                top: 0,
                left: 0,
                width: 20,
                height: 20, 
                fill: '#FFCC1D',
                strokeWidth: 0,
                selectable: false,
                name: 'sTriangle'
            });
            const sLine = new fabric.Rect({
                top: 20,
                left: 8,
                width: 4,
                height: 40,
                fill: '#FFCC1D',
                strokeWidth: 0,
                selectable: false,
                name: 'sLine'
            }); 
            const supportingForceText = new fabric.Text('F', {
                top: 20,
                left: 30,
                fontSize: 20,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FFCC1D',
                selectable: false,
                name: 'supportingForceText'
            });
            const supportingForceSmallText = new fabric.Text('N', {
                top: 30,
                left: 40,
                fontSize: 12,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FFCC1D',
                selectable: false,
                name: 'supportingForceSmallText'
            });
            const supportingForceGroup = new fabric.Group([ sTriangle, sLine, supportingForceText, supportingForceSmallText ], {
                left: this.endX - 235,
                top: this.middleY + 110,
                selectable: false,
                opacity: 0
            });
            this.supportingForceGroup = supportingForceGroup;
            this.canvas.add(supportingForceGroup);
        }, {
            left: this.endX - 450,
            top: this.middleY - 242,
            width: 450,
            height: 484,
            selectable: false
        });
    }

    /**
     * 动画效果
     * @param consistence 当前盐水浓度
     * @param lastConsistence 上一次盐水浓度
     */
    move(consistence: Number, lastConsistence: Number): Number {
        let duration;  // 动画持续时间
        let eggTop: number;     // 动画结束鸡蛋的top值
        let gravityTop: number;     // 动画结束重力的top值
        let buoyanceTop: number;     // 动画结束浮力的top值
        let bLine: fabric.Rect; // 浮力
        this.showSupportingForce = false;
        let height: number; // 浮力长度
        let buoyanceStartTop: number;   // 浮力起始的top值
        this.buoyanceGroup.getObjects().forEach(item => { // 获取浮力对象
            if (item.name === 'bLine') {
                bLine = item;
            }
        });
        let ease = Power4.easeIn;
        if (Number(lastConsistence) === 1 && Number(consistence) === 0) {
            // 浓度从中到0
            eggTop = this.middleY + 130;
            gravityTop = this.middleY + 170;
            buoyanceTop = this.middleY + 90;
            if (this.egg.top === this.middleY + 130) {
                // 当鸡蛋在底部时
                bLine.set('height', 60);
                this.buoyanceGroup.set('top', this.middleY + 90);
                duration = 0;
            } else {
                bLine.set('height', 60);
                this.buoyanceGroup.set('top', this.middleY - 40);
                duration = 3;
            }
        } else if (Number(lastConsistence) === 1 && Number(consistence) === 2) {
            // 浓度从中到高
            eggTop = this.middleY - 93;
            gravityTop = this.middleY - 53;
            buoyanceTop = this.middleY - 193;
            bLine.set('height', 120);
            if (this.egg.top === this.middleY + 130) {
                // 当鸡蛋在底部时
                this.buoyanceGroup.set('top', this.middleY + 30);
                duration = 3;
            } else {
                this.buoyanceGroup.set('top', this.middleY - 100);
                duration = 2;
            }
        } else if (Number(lastConsistence) === 0 && Number(consistence) === 1) {
            // 浓度从0到中
            eggTop = this.middleY + 130;
            gravityTop = this.middleY + 170;
            buoyanceTop = this.middleY + 50;
            bLine.set('height', 100);
            this.buoyanceGroup.set('top', this.middleY + 50);
            this.supportingForceGroup.set('opacity', 0);
            duration = 0;
        } else if (Number(lastConsistence) === 0 && Number(consistence) === 2) {
            // 浓度从0到高
            eggTop = this.middleY - 93;
            gravityTop = this.middleY - 53;
            buoyanceTop = this.middleY - 213;
            bLine.set('height', 140);
            this.buoyanceGroup.set('top', this.middleY + 10);
            this.supportingForceGroup.set('opacity', 0);
            duration = 3;
        } else if (Number(lastConsistence) === 2 && Number(consistence) === 1) {
            // 浓度从高到中
            eggTop = this.middleY - 93;
            gravityTop = this.middleY - 53;
            buoyanceTop = this.middleY - 173;
            bLine.set('height', 80);
            this.buoyanceGroup.set('top', this.middleY - 190);
            height = 80;
            buoyanceStartTop = this.buoyanceGroup.top;
            duration = 2;
        } else {
            // 浓度从高到0
            eggTop = this.middleY - 93;
            gravityTop = this.middleY - 53;
            buoyanceTop = this.middleY - 133;
            bLine.set('height', 40);
            this.buoyanceGroup.set('top', this.middleY - 150);
            height = 40;
            buoyanceStartTop = this.buoyanceGroup.top;
            duration = 0.9;
            ease = Power0.easeIn;
        }
        this.canvas.renderAll();
        // 鸡蛋动画
        TweenMax.to(this.egg, duration, {
            top: eggTop,
            ease,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                if (Number(lastConsistence) === 1 && Number(consistence) === 0) {
                    this.showSupportingForce = true;
                }
                if (this.showSupportingForce) {
                    if (this.showForceGroup) {
                        this.supportingForceGroup.set('opacity', 1);
                        this.canvas.renderAll();
                    }
                }
                let commonEasing;
                let commonDurantion = 2;
                let move: Boolean = false; // 是否有第二段动画
                if (Number(consistence) === 2) {
                    // 从其他浓度到高
                    commonEasing = Elastic.easeOut;
                    eggTop = this.middleY - 130;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 1) {
                    commonEasing = Power1.easeOut;
                    eggTop = this.middleY;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 0) {
                    commonEasing = Power1.easeIn;
                    commonDurantion = 0.9;
                    eggTop = this.middleY + 130;
                    move = true;
                    this.showSupportingForce = true;
                }
                // 鸡蛋动画
                if (move) {
                    TweenMax.to(this.egg,  commonDurantion, {
                        top: eggTop,
                        ease: commonEasing,
                        onUpdate: this.canvas.renderAll.bind(this.canvas),
                        onComplete: () => {
                            if (this.showSupportingForce) {
                                if (this.showForceGroup) { // 显示支持力
                                    this.supportingForceGroup.set('opacity', 1);
                                    this.canvas.renderAll();
                                }
                            }
                        }
                    });
                }
            }
        });
        // 重力动画
        TweenMax.to(this.gravityGroup, duration, {
            top: gravityTop,
            ease,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                let commonEasing;
                let commonDurantion = 2;
                let move: Boolean = false; // 是否有第二段动画
                if (Number(consistence) === 2) {
                    // 从其他浓度到高
                    commonEasing = Elastic.easeOut;
                    gravityTop = this.middleY - 90;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 1) {
                    commonEasing = Power1.easeOut;
                    gravityTop = this.middleY + 40;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 0) {
                    commonEasing = Power1.easeIn;
                    commonDurantion = 0.9;
                    gravityTop = this.middleY + 170;
                    move = true;
                }
                // 重力动画
                if (move) {
                    TweenMax.to(this.gravityGroup, commonDurantion, {
                        top: gravityTop,
                        ease: commonEasing,
                        onUpdate: this.canvas.renderAll.bind(this.canvas)
                    });
                }
            }
        });
        // 浮力动画
        TweenMax.to(this.buoyanceGroup, duration, {
            top: buoyanceTop,
            ease,
            onUpdate: () => {      
                if (Number(lastConsistence) === 2 && (Number(consistence) === 1 || Number(consistence) === 0)) {
                    // 浓度从高到中或浓度从高到低
                    const nowTop = this.buoyanceGroup.top;
                    const ratio = (nowTop - buoyanceStartTop) / (buoyanceTop - buoyanceStartTop);
                    // 修改浮力的长度
                    bLine.set('height', height + 20 * Math.abs(ratio));
                }
                this.canvas.renderAll.bind(this.canvas);
            },
            onComplete: () => {
                let commonEasing;
                let commonDurantion = 2;
                let step: number;
                let move: Boolean = false; // 是否有第二段动画
                if (Number(lastConsistence) === 0 && Number(consistence) === 2) {
                    // 从低到高
                    buoyanceStartTop = this.buoyanceGroup.top;
                    commonEasing = Elastic.easeOut;
                    buoyanceTop = this.middleY - 210;
                    step = 40;
                    move = true;
                }
                if (Number(lastConsistence) === 1 && Number(consistence) === 2) {
                    // 从中到高
                    buoyanceStartTop = this.buoyanceGroup.top;
                    commonEasing = Elastic.easeOut;
                    buoyanceTop = this.middleY - 210;
                    step = 20;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 1) {
                    commonEasing = Power1.easeOut;
                    buoyanceTop = this.middleY - 80;
                    move = true;
                }
                if (Number(lastConsistence) === 2 && Number(consistence) === 0) {
                    commonEasing = Power1.easeIn;
                    commonDurantion = 0.9;
                    buoyanceTop = this.middleY + 90;
                    move = true;
                }
                // 浮力动画
                if (move) {
                    TweenMax.to(this.buoyanceGroup, commonDurantion, {
                        top: buoyanceTop,
                        ease: commonEasing,
                        onUpdate: () => {
                            if (Number(consistence) === 2) {
                                const nowTop = this.buoyanceGroup.top;
                                const ratio = (nowTop - buoyanceStartTop) / (buoyanceTop - buoyanceStartTop);
                                // 修改浮力的长度
                                bLine.set('height', (100 + step) - step * ratio);
                            }
                            this.canvas.renderAll.bind(this.canvas);
                        }
                    });
                }
            }
        });
        const c1 = Number(consistence) === 2;   // 是否从其他浓度到高
        const c2 = Number(lastConsistence) === 2 && Number(consistence) === 1;  // 是否从高到中
        const c3 = Number(lastConsistence) === 2 && Number(consistence) === 0;  // 是否从高到0
        if (c1 || c2 || c3) {
            duration += 2;
        }
        return duration;
    }

    /**
     * 是否显示受力分析
     * @param show true: 是   false: 否
     */
    toggleShowforce(show: boolean) {
        this.showForceGroup = show;
        if (show) {
            this.gravityGroup.set('opacity', 1);
            this.buoyanceGroup.set('opacity', 1);
            if (this.showSupportingForce) {
                this.supportingForceGroup.set('opacity', 1);
            }
        } else {
            this.gravityGroup.set('opacity', 0);
            this.buoyanceGroup.set('opacity', 0);
            this.supportingForceGroup.set('opacity', 0);
        }
        this.canvas.renderAll();
    }

    /**
     * 重置
     */
    reset() {
        this.showForceGroup = false;
        this.showSupportingForce = false;
        TweenMax.killAll();     // 结束动画
        this.egg.set('top', this.middleY);
        this.gravityGroup.set('top',  this.middleY + 40);
        this.gravityGroup.set('opacity', 0);
        this.buoyanceGroup.set('top', this.middleY - 80);
        let bLine: fabric.Rect; // 浮力
        this.buoyanceGroup.getObjects().forEach(item => {
            if (item.name === 'bLine') {
                bLine = item;
            }
        });
        bLine.set('height', 100);
        this.buoyanceGroup.set('opacity', 0);
        this.supportingForceGroup.set('opacity', 0);
        this.canvas.renderAll();
    }
}

export class ScaleValue {
    public scale: number;
    constructor() {
        if (window.innerWidth >= 1000) {
            this.scale = window.innerWidth / 1366 * 0.9;
        } else {
            this.scale = window.innerHeight / window.innerWidth * 0.8;
        }
    }
}
