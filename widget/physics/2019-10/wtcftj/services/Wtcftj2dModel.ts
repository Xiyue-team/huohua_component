import { TweenMax, Power0, Power4, Elastic, Linear, TimelineMax } from 'gsap';
import {fabric} from 'fabric';

const container1 = require('../sub_static/container1.png');
const container2 = require('../sub_static/container2.png');
const container3 = require('../sub_static/container3.png');
const substance1 = require('../sub_static/substance1.png');
const substance2 = require('../sub_static/substance2.png');
const substance3 = require('../sub_static/substance3.png');

export class Wtcftj2dModel {
    private canvas: fabric.StaticCanvas;            // 场景
    private scaleValue = new ScaleValue();          // 场景缩放比例
    private endX: number;                           // 场景水平最右边的数值
    private middleY: number;                        // 场景竖直中心点的数值
    private substance1: fabric.Image;               // 物体1
    private substance2: fabric.Image;               // 物体2
    private substance3: fabric.Image;               // 物体3
    private container1: fabric.Image;               // 容器1
    private container2: fabric.Image;               // 容器2
    private container3: fabric.Image;               // 容器3
    private gravityGroup: fabric.Group;             // 重力
    private gLine: fabric.Rect;                     // 重力长度
    private gravitySmallText: fabric.Text;          // 重力文字
    private buoyanceGroup: fabric.Group;            // 浮力
    private bLine: fabric.Rect;                     // 浮力长度
    private buoyanceSmallText: fabric.Text;         // 浮力文字
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
        this.canvas = new fabric.StaticCanvas(canvas, {
            selection: false,
            hoverCursor: 'default'
        });
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.setZoom(this.scaleValue.scale);
        this.endX = this.canvas.getWidth() / this.scaleValue.scale;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
    }

    /**
     * 初始化实验场景
     * @param container 容器
     */
    private async initLayer() {
        // 添加容器2
        fabric.Image.fromURL(container2, (oImg: fabric.Image) => {
            this.container2 = oImg;
            this.canvas.add(oImg);
        }, {
            left: this.endX - 626,
            top: this.middleY - 269,
            width: 626,
            height: 538,
            selectable: false
        });
        // 添加容器3
        fabric.Image.fromURL(container3, (oImg: fabric.Image) => {
            this.container3 = oImg;
            this.canvas.add(oImg);
        }, {
            left: this.endX - 626,
            top: this.middleY - 269,
            width: 626,
            height: 538,
            selectable: false
        });
        // 添加物体1
        fabric.Image.fromURL(substance1, (oImg: fabric.Image) => {
            this.substance1 = oImg;
            this.canvas.add(oImg);
        }, {
            left: this.endX - 339,
            top: this.middleY - 152, // - 152 - 130 - 100 + 20 + 170
            width: 52,
            height: 52,
            selectable: false,
            visible: false
        });
        // 添加物体2
        fabric.Image.fromURL(substance2, (oImg: fabric.Image) => {
            this.substance2 = oImg;
            this.canvas.add(oImg);
        }, {
            left: this.endX - 339,
            top: this.middleY - 152, // - 152 - 130 - 100 + 20 + 170
            width: 52,
            height: 52,
            selectable: false,
            visible: false
        });
        // 添加物体3
        fabric.Image.fromURL(substance3, (oImg: fabric.Image) => {
            this.substance3 = oImg;
            this.canvas.add(oImg);

        }, {
            left: this.endX - 339,
            top: this.middleY - 152, // - 152 - 130 - 100 + 20 + 170
            width: 52,
            height: 52,
            selectable: false,
            visible: false
        });
        // 添加容器1
        fabric.Image.fromURL(container1, (oImg: fabric.Image) => {
            this.container1 = oImg;
            this.canvas.add(oImg);
            // 初始化重力
            this.initGravity();
            // 初始化浮力
            this.initBuoyance();
            // 初始化支持力
            this.initSupportingForce();
            // 添加提示
            const tipsText = new fabric.Text(window.env.browserInfo.lang.tips, {
                left: this.endX - 626,
                top: this.middleY + 189,
                fontSize: 20,
                fontFamily: 'SourceHanSansSC-Medium',
                fill: '#FFFFFF',
                selectable: false
            });
            this.canvas.add(tipsText);
        }, {
            left: this.endX - 626,
            top: this.middleY - 269,
            width: 626,
            height: 538,
            selectable: false
        });
    }

    /**
     * 初始化重力
     */
    private initGravity() {
        const gTriangle = new fabric.Triangle({
            top: 0,
            left: 0,
            width: 20,
            height: 20, 
            fill: '#FFFFFF',
            strokeWidth: 0,
            selectable: false,
            name: 'gTriangle'
        });
        this.gLine = new fabric.Rect({
            top: 20,
            left: 8,
            width: 4,
            height: 80,
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
        const gravitySmallText = new fabric.Text('1', {
            top: 85,
            left: 45,
            fontSize: 16,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#FFFFFF',
            selectable: false,
            name: 'gravitySmallText'
        });
        this.gravitySmallText = gravitySmallText;
        const gravity = new fabric.Group([ gTriangle, this.gLine ], {
            width: 20,
            originX: 'center',
            originY: 'center',
            selectable: false,
            angle: 180,
            name: 'gravity'
        });
        this.gravityGroup = new fabric.Group([ gravity, gravityText, gravitySmallText ], {
            left: this.endX - 323,
            top: this.middleY - 120,  // 80 {- 120, - 98 - 68}
            selectable: false,
            visible: false
        });
        this.canvas.add(this.gravityGroup);
    }

    /**
     * 初始化浮力
     */
    private initBuoyance() {
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
        this.bLine = new fabric.Rect({
            top: 20,
            left: 8,
            width: 4,
            height: 300,
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
        const buoyanceSmallText = new fabric.Text('1', {
            top: 30,
            left: 40,
            fontSize: 12,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#FF2C1D',
            selectable: false,
            name: 'buoyanceSmallText'
        });
        this.buoyanceSmallText = buoyanceSmallText;
        this.buoyanceGroup = new fabric.Group([ bTriangle, this.bLine, buoyanceText, buoyanceSmallText ], {
            left: this.endX - 323,
            top: this.middleY - 141,
            selectable: false,
            visible: false
        });
        this.canvas.add(this.buoyanceGroup);
    }

    /**
     * 初始化支撑力
     */
    private initSupportingForce() {
        const sTriangle = new fabric.Triangle({
            top: 0,
            left: 0,
            width: 20,
            height: 20, 
            fill: '#37FF77',
            strokeWidth: 0,
            selectable: false,
            name: 'sTriangle'
        });
        const sLine = new fabric.Rect({
            top: 20,
            left: 8,
            width: 4,
            height: 30,
            fill: '#37FF77',
            strokeWidth: 0,
            selectable: false,
            name: 'sLine'
        }); 
        const supportingForceText = new fabric.Text('F', {
            top: 20,
            left: 30,
            fontSize: 20,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#37FF77',
            selectable: false,
            name: 'supportingForceText'
        });
        const supportingForceSmallText = new fabric.Text('N', {
            top: 30,
            left: 40,
            fontSize: 12,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#37FF77',
            selectable: false,
            name: 'supportingForceSmallText'
        });
        this.supportingForceGroup = new fabric.Group([ sTriangle, sLine, supportingForceText, supportingForceSmallText ], {
            left: this.endX - 323,
            top: this.middleY + 154,
            selectable: false,
            visible: false
        });
        this.canvas.add(this.supportingForceGroup);
    }

    /**
     * 显示相对应的内容
     * @param index 1: 物体密度 < 液体密度  2: 物体密度 = 液体密度  3: 物体密度 > 液体密度
     */
    show(index: number) {
        TweenMax.killAll(); // 结束所有动画
        this.supportingForceGroup.visible = false;
        this.substance1.visible = false;
        this.substance2.visible = false;
        this.substance3.visible = false;
        this.substance1.set('top', this.middleY - 152);
        this.substance2.set('top', this.middleY - 152);
        this.substance3.set('top', this.middleY - 152);
        if (index === 1) {
            // 显示物体1
            this.substance1.visible = true;
            // 设置重力
            this.gLine.set('height', 40);
            this.gravityGroup.set('top', this.middleY - 160);
            this.gravitySmallText.set('text', '1');
            // 设置浮力
            this.bLine.set('height', 31);
            this.buoyanceSmallText.set('text', '1');
            this.buoyanceGroup.set('top', this.middleY - 141);
        } else if (index === 2) {
            // 显示物体2
            this.substance2.visible = true;
            // 设置重力
            this.gLine.set('height', 60);
            this.gravityGroup.set('top', this.middleY - 140);
            this.gravitySmallText.set('text', '2');
            // 设置浮力
            this.bLine.set('height', 61);
            this.buoyanceSmallText.set('text', '2');
            this.buoyanceGroup.set('top', this.middleY - 141);
        } else {
            // 显示物体3
            this.substance3.visible = true;
            // 设置重力
            this.gLine.set('height', 80);
            this.gravityGroup.set('top', this.middleY - 120);
            this.gravitySmallText.set('text', '3');
            // 设置浮力
            this.bLine.set('height', 81);
            this.buoyanceSmallText.set('text', '3');
            this.buoyanceGroup.set('top', this.middleY - 141);
        }
        // 设置容器和物体的层级
        this.setLevel();
        // 设置力的层级
        this.buoyanceGroup.bringToFront();
        this.gravityGroup.bringToFront();
        this.supportingForceGroup.bringToFront();
        this.move(index);
    }

    /**
     * 设置容器和物体的层级
     */
    setLevel() {
        this.container2.bringToFront();
        this.container3.bringToFront();
        this.substance1.bringToFront();
        this.substance2.bringToFront();
        this.substance3.bringToFront();
        this.container1.bringToFront();
    }

    /**
     * 动画
     * @param index  1: 物体密度 < 液体密度  2: 物体密度 = 液体密度  3: 物体密度 > 液体密度
     */
    move(index: number) {
        this.substanceAnimatio(index);
        this.gravityAnimation(index);
        this.buoyanceAnimation(index);
    }

    /**
     * 物体动画
     * @param index  1: 物体密度 < 液体密度  2: 物体密度 = 液体密度  3: 物体密度 > 液体密度
     */
    private substanceAnimatio(index: number) {
        let top = this.middleY - 100;               // 物体
        let substance = this.substance3;            // 动画结束物体的top值
        let duration = 0.3;                         // 动画持续时间
        let secondDuration = 1;                     // 第二段动画持续时间
        let secondEase = Power0.easeIn;             // 第二段动画效果
        let secondTop = this.middleY + 170;         // 第二段动画结束物体的top值
        this.showSupportingForce = false;
        if (index === 1) {
            top = this.middleY - 100;
            substance = this.substance1;
            duration = 1;
            secondDuration = 5;
            secondEase = Elastic.easeOut;
            secondTop = this.middleY - 130;
        } else if (index === 2) {
            top = this.middleY - 100;
            substance = this.substance2;
            duration = 0.5;
            secondDuration = 5;
            secondEase = Power4.easeOut;
            secondTop = this.middleY;
        }
        const timelineMax = new TimelineMax({onUpdate: this.canvas.renderAll.bind(this.canvas)});
        timelineMax.to(substance,  duration, {
            top: top,
            ease: Linear.easeOut
        }).to(substance,  secondDuration, {
            top: secondTop,
            ease: secondEase,
            onComplete: () => {
                if (index === 3) {
                    this.showSupportingForce = true;
                    if (this.showForceGroup) { // 显示支持力
                        this.supportingForceGroup.visible = true;
                        this.canvas.renderAll.bind(this.canvas);
                    }
                }
            }
        });
    }

    /**
     * 重力动画
     * @param index 1: 物体密度 < 液体密度  2: 物体密度 = 液体密度  3: 物体密度 > 液体密度
     */
    private gravityAnimation(index: number) {
        let gravityTop = this.middleY - 68;     // 动画结束重力的top值
        let duration = 0.3;                     // 动画持续时间
        let ease = Linear.easeOut;              // 动画效果
        let secondDuration = 1;                 // 第二段动画持续时间
        let secondEase = Power0.easeIn;         // 第二段动画效果
        let secondTop = this.middleY + 202;     // 第二段动画结束物体的top值
        this.showSupportingForce = false;
        if (index === 1) {
            gravityTop = this.middleY - 108;
            duration = 1;
            ease = Linear.easeOut;
            secondDuration = 5;
            secondEase = Elastic.easeOut;
            secondTop = this.middleY - 138;
        } else if (index === 2) {
            gravityTop = this.middleY - 88;
            duration = 0.5;
            ease = Linear.easeOut;
            secondDuration = 5;
            secondEase = Power4.easeOut;
            secondTop = this.middleY + 12;
        }
        const timelineMax = new TimelineMax({onUpdate: this.canvas.renderAll.bind(this.canvas)});
        timelineMax.to(this.gravityGroup,  duration, {
            top: gravityTop,
            ease: ease
        }).to(this.gravityGroup,  secondDuration, {
            top: secondTop,
            ease: secondEase
        });
    }

    /**
     * 浮力
     * @param index 1: 物体密度 < 液体密度  2: 物体密度 = 液体密度  3: 物体密度 > 液体密度
     */
    private buoyanceAnimation(index: number) {
        let buoyanceTop = this.middleY - 136;               // 动画结束浮力的top值
        let buoyanceHeight = 50;                            // 动画结束浮力的长度
        let buoyanceStartHeight = 1;                        // 动画开始时浮力的长度
        let duration = 0.3;                                 // 动画持续时间
        let secondDuration = 1;                             // 第二段动画持续时间
        let secondEase = Power0.easeIn;                     // 第二段动画效果
        let secondTop = this.middleY + 134;                 // 第二段动画结束浮力的top值
        const buoyanceStartTop = this.buoyanceGroup.top;    // 动画开始时浮力的top值
        let secondStartTop = this.buoyanceGroup.top;      // 第二段动画开始浮力的top值
        const secondHeight = 40;                            // 第二段动画结束浮力的长度
        const secondStartHeight = 60;        // 第二段动画开始浮力的长度
        this.showSupportingForce = false;

        if (index === 1) {
            buoyanceTop = this.middleY - 148;
            buoyanceHeight = 60;
            buoyanceStartHeight = 1;
            duration = 1;
            secondDuration = 5;
            secondEase = Elastic.easeOut;
            secondTop = this.middleY - 158;
        } else if (index === 2) {
            buoyanceTop = this.middleY - 148;
            buoyanceHeight = 60;
            buoyanceStartHeight = 1;
            duration = 0.5;
            secondDuration = 5;
            secondEase = Power4.easeOut;
            secondTop = this.middleY - 48;
        }
        const timelineMax = new TimelineMax();
        timelineMax.to(this.buoyanceGroup,  duration, {
            top: buoyanceTop,
            ease: Linear.easeOut,
            onUpdate: () => {
                const nowTop = this.buoyanceGroup.top;
                const ratio = Math.abs((nowTop - buoyanceStartTop) / (buoyanceTop - buoyanceStartTop));
                // 修改浮力的长度
                this.bLine.set('height', buoyanceStartHeight + (buoyanceHeight - buoyanceStartHeight) * ratio);
                this.canvas.renderAll.bind(this.canvas);
            },
            onComplete: () => {
                this.bLine.set('height', buoyanceHeight);
                secondStartTop = this.buoyanceGroup.top; 
                this.canvas.renderAll.bind(this.canvas);
            }
        }).to(this.buoyanceGroup,  secondDuration, {
            top: secondTop,
            ease: secondEase,
            onUpdate: () => { 
                if (index === 1) {
                    this.canvas.renderAll.bind(this.canvas);
                    const nowTop = this.buoyanceGroup.top;
                    const ratio = Math.abs((nowTop - secondStartTop) / (secondTop - secondStartTop));
                    // 修改浮力的长度
                    this.bLine.set('height', secondStartHeight + (secondHeight - secondStartHeight) * ratio);
                    this.canvas.renderAll.bind(this.bLine);
                }
            }
        });
    }

    /**
     * 是否显示受力分析
     * @param showForces 是否显示受力分析
     */
    changeShowForces(showForces: Boolean) {
       this.showForceGroup = showForces;
       if (showForces) {
            this.gravityGroup.visible = true;
            this.buoyanceGroup.visible = true;
            if (this.showSupportingForce) {
                this .supportingForceGroup.visible = true;
            }
       } else {
            this.gravityGroup.visible = false;
            this.buoyanceGroup.visible = false;
            this.supportingForceGroup.visible = false;
       }
       this.canvas.renderAll();
    }

    /**
     * 重置
     */
    reset() {
        // 重置物体
        this.substance1.visible = false;
        this.substance2.visible = false;
        this.substance3.visible = false;
        this.substance1.set('top', this.middleY - 152);
        this.substance2.set('top', this.middleY - 152);
        this.substance3.set('top', this.middleY - 152);
        // 重置受力分析
        this.gravityGroup.visible = false;
        this.buoyanceGroup.visible = false;
        this.supportingForceGroup.visible = false;
        this.showForceGroup = false;
        this.showSupportingForce = false;
        this.canvas.renderAll();
    }

}

export class ScaleValue {
    public scale: number;
    constructor() {
        const ratio = window.innerWidth / window.innerHeight;
        this.scale = window.innerWidth / 1300;
        if (ratio > (16 / 9)) {
            this.scale = (window.innerHeight * 16 / 9) / 1300;
        }
    }
}
