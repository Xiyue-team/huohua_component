import { TweenMax, Power0, Power4, Elastic, Linear } from 'gsap';
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
     * @param container 容器
     */
    private async initLayer() {
        // 添加容器2
        fabric.Image.fromURL(container2, (oImg: fabric.Image) => {
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
            opacity: 0
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
            opacity: 0
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
            opacity: 0
        });
        // 添加容器1
        fabric.Image.fromURL(container1, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 初始化重力
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
            const gLine = new fabric.Rect({
                top: 20,
                left: 8,
                width: 4,
                height: 80,
                fill: '#FFFFFF',
                strokeWidth: 0,
                selectable: false,
                name: 'gLine'
            }); 
            this.gLine = gLine;
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
            const gravity = new fabric.Group([ gTriangle, gLine ], {
                width: 20,
                originX: 'center',
                originY: 'center',
                selectable: false,
                angle: 180,
                name: 'gravity'
            });
            const gravityGroup = new fabric.Group([ gravity, gravityText, gravitySmallText ], {
                left: this.endX - 323,
                top: this.middleY - 120,  // 80 {- 120, - 98 - 68}
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
                height: 1,
                fill: '#FF2C1D',
                strokeWidth: 0,
                selectable: false,
                name: 'bLine'
            }); 
            this.bLine = bLine;
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
            const buoyanceGroup = new fabric.Group([ bTriangle, bLine, buoyanceText, buoyanceSmallText ], {
                left: this.endX - 323,
                top: this.middleY - 141,
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
            const supportingForceGroup = new fabric.Group([ sTriangle, sLine, supportingForceText, supportingForceSmallText ], {
                left: this.endX - 323,
                top: this.middleY + 154,
                selectable: false,
                opacity: 0
            });
            this.supportingForceGroup = supportingForceGroup;
            this.canvas.add(supportingForceGroup);
            // 添加提示
            const tipsText = new fabric.Text('某种液体', {
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
     * 显示相对应的内容
     * @param index
     */
    show(index: number) {
        TweenMax.killAll(); // 结束所有动画
        this.supportingForceGroup.set('opacity', 0);
        this.substance1.set('opacity', 0);
        this.substance2.set('opacity', 0);
        this.substance3.set('opacity', 0);
        this.substance1.set('top', this.middleY - 152);
        this.substance2.set('top', this.middleY - 152);
        this.substance3.set('top', this.middleY - 152);
        if (index === 1) {
            // 显示物体1
            this.substance1.set('opacity', 1);
            // 设置重力
            this.gLine.set('height', 40);
            this.gravityGroup.set('top', this.middleY - 160);
            this.gravitySmallText.set('text', '1');
            // 设置浮力
            this.bLine.set('height', 1);
            this.buoyanceSmallText.set('text', '1');
            this.buoyanceGroup.set('top', this.middleY - 141);
        } else if (index === 2) {
            // 显示物体2
            this.substance2.set('opacity', 1);
            // 设置重力
            this.gLine.set('height', 60);
            this.gravityGroup.set('top', this.middleY - 140);
            this.gravitySmallText.set('text', '2');
            // 设置浮力
            this.bLine.set('height', 1);
            this.buoyanceSmallText.set('text', '2');
            this.buoyanceGroup.set('top', this.middleY - 141);
        } else {
            // 显示物体3
            this.substance3.set('opacity', 1);
            // 设置重力
            this.gLine.set('height', 80);
            this.gravityGroup.set('top', this.middleY - 120);
            this.gravitySmallText.set('text', '3');
            // 设置浮力
            this.bLine.set('height', 1);
            this.buoyanceSmallText.set('text', '3');
            this.buoyanceGroup.set('top', this.middleY - 141);
        }
        this.canvas.renderAll();
        this.move(index);
    }

    /**
     * 动画
     * @param index 
     */
    move(index: number) {
        let substance: fabric.Image;            // 物体
        let top: number;                        // 动画结束物体的top值
        let gravityTop: number;                 // 动画结束重力的top值
        let buoyanceTop: number;                // 动画结束浮力的top值
        let buoyanceStartTop: number;           // 动画开始时浮力的top值
        let buoyanceHeight: number;             // 动画结束浮力的长度
        let buoyanceStartHeight: number;        // 动画开始时浮力的长度
        let duration;                           // 动画持续时间
        let ease;                               // 动画效果
        this.showSupportingForce = false;
        if (index === 1) {
            top = this.middleY - 100;
            gravityTop = this.middleY - 108;
            buoyanceStartTop = this.buoyanceGroup.top;
            buoyanceTop = this.middleY - 148;
            buoyanceHeight = 60;
            buoyanceStartHeight = 1;
            substance = this.substance1;
            duration = 1;
            ease = Linear.easeOut;
        } else if (index === 2) {
            top = this.middleY - 100;
            gravityTop = this.middleY - 88;
            buoyanceStartTop = this.buoyanceGroup.top;
            buoyanceTop = this.middleY - 148;
            buoyanceHeight = 60;
            buoyanceStartHeight = 1;
            substance = this.substance2;
            duration = 0.5;
            ease = Linear.easeOut;
        } else {
            top = this.middleY - 100;
            gravityTop = this.middleY - 68;
            buoyanceStartTop = this.buoyanceGroup.top;
            buoyanceTop = this.middleY - 136;
            buoyanceHeight = 50;
            buoyanceStartHeight = 1;
            substance = this.substance3;
            duration = 0.3;
            ease = Linear.easeOut;
        }
        // 物体动画
        TweenMax.to(substance,  duration, {
            top: top,
            ease: ease,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                let secondDuration;  // 第二段动画持续时间
                let secondEase; // 第二段动画效果
                let secondTop; // 第二段动画结束物体的top值
                if (index === 1) {
                    secondDuration = 5;
                    secondEase = Elastic.easeOut;
                    secondTop = this.middleY - 130;
                } else if (index === 2) {
                    secondDuration = 5;
                    secondEase = Power4.easeOut;
                    secondTop = this.middleY;
                } else {
                    secondDuration = 1;
                    secondEase = Power0.easeIn;
                    secondTop = this.middleY + 170;
                }
                TweenMax.to(substance,  secondDuration, {
                    top: secondTop,
                    ease: secondEase,
                    onUpdate: this.canvas.renderAll.bind(this.canvas),
                    onComplete: () => {
                        if (index === 3) {
                            this.showSupportingForce = true;
                            if (this.showForceGroup) { // 显示支持力
                                this.supportingForceGroup.set('opacity', 1);
                                this.canvas.renderAll();
                            }
                        }
                    }
                });
            }
        });
        // 重力动画
        TweenMax.to(this.gravityGroup,  duration, {
            top: gravityTop,
            ease: ease,
            onUpdate: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => {
                let secondDuration;     // 第二段动画持续时间
                let secondEase;         // 第二段动画效果
                let secondTop;          // 第二段动画结束重力的top值
                if (index === 1) {
                    secondDuration = 5;
                    secondEase = Elastic.easeOut;
                    secondTop = this.middleY - 138;
                } else if (index === 2) {
                    secondDuration = 5;
                    secondEase = Power4.easeOut;
                    secondTop = this.middleY + 12;
                } else {
                    secondDuration = 1;
                    secondEase = Power0.easeIn;
                    secondTop = this.middleY + 202;
                }
                TweenMax.to(this.gravityGroup,  secondDuration, {
                    top: secondTop,
                    ease: secondEase,
                    onUpdate: this.canvas.renderAll.bind(this.canvas),
                });
            }
        });
        // 浮力动画
        TweenMax.to(this.buoyanceGroup,  duration, {
            top: buoyanceTop,
            ease: ease,
            onUpdate: () => {
                const nowTop = this.buoyanceGroup.top;
                const ratio = Math.abs((nowTop - buoyanceStartTop) / (buoyanceTop - buoyanceStartTop));
                // 修改浮力的长度
                this.bLine.set('height', buoyanceStartHeight + (buoyanceHeight - buoyanceStartHeight) * ratio);
                this.canvas.renderAll();
            },
            onComplete: () => {
                this.bLine.set('height', buoyanceHeight);
                this.canvas.renderAll();
                let secondDuration;             // 第二段动画持续时间
                let secondEase;                 // 第二段动画效果
                let secondTop: number;          // 第二段动画结束浮力的top值
                let secondStartTop: number;     // 第二段动画开始浮力的top值
                let secondHeight: number;       // 第二段动画结束浮力的长度
                let secondStartHeight: number;  // 第二段动画开始浮力的长度
                if (index === 1) {
                    secondDuration = 5;
                    secondEase = Elastic.easeOut;
                    secondTop = this.middleY - 158;
                    secondStartTop = this.buoyanceGroup.top;
                    secondHeight = 40;
                    secondStartHeight = this.bLine.height;
                } else if (index === 2) {
                    secondDuration = 5;
                    secondEase = Power4.easeOut;
                    secondTop = this.middleY - 48;
                } else {
                    secondDuration = 1;
                    secondEase = Power0.easeIn;
                    secondTop = this.middleY + 134;
                }
                TweenMax.to(this.buoyanceGroup,  secondDuration, {
                    top: secondTop,
                    ease: secondEase,
                    onUpdate: () => { 
                        if (index === 1) {
                            const nowTop = this.buoyanceGroup.top;
                            const ratio = Math.abs((nowTop - secondStartTop) / (secondTop - secondStartTop));
                            // 修改浮力的长度
                            this.bLine.set('height', secondStartHeight + (secondHeight - secondStartHeight) * ratio);
                            this.canvas.renderAll();
                        }
                    }
                });
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
            this.gravityGroup.set('opacity', 1);
            this.buoyanceGroup.set('opacity', 1);
            if (this.showSupportingForce) {
                this .supportingForceGroup.set('opacity', 1);
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
        // 重置物体
        this.substance1.set('opacity', 0);
        this.substance2.set('opacity', 0);
        this.substance3.set('opacity', 0);
        this.substance1.set('top', this.middleY - 152);
        this.substance2.set('top', this.middleY - 152);
        this.substance3.set('top', this.middleY - 152);
        // 重置受力分析
        this.gravityGroup.set('opacity', 0);
        this.buoyanceGroup.set('opacity', 0);
        this.supportingForceGroup.set('opacity', 0);
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
