import {MyConfig} from './MyConfig';

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import Konva, {Vector2d} from 'konva';
import value from '..//sub_static/p3.png';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    arrow: Konva.Arrow;
    origincicle: Konva.Circle;
    verticalline: Konva.Line;
    negavlabel: Konva.Text;
    //移动的组
    rightmovegroup: Konva.Group;
    //移动的组
    leftmovegroup: Konva.Group;
    //右边半透明的大圆
    rightbigcircle: Konva.Circle;
    //右边不透明的小圆
    rightsmallcircle: Konva.Circle;
    //右边半透明的大圆
    leftbigcircle: Konva.Circle;
    //右边不透明的小圆
    leftsmallcircle: Konva.Circle;
    //表示数值的线
    valueline: Konva.Line;
    //点表示的正数数值
    rightnumbertext: Konva.Text;
    leftnumbertext: Konva.Text;
    //显示正数数值的框

    compareframeright: Konva.Image;
    compareframeleft: Konva.Image;
    comparevalueright: Konva.Text;
    comparevalueleft: Konva.Text;
    comparewhite: Konva.Text;
    compareyellow: Konva.Text;
    leftlable: Konva.Label;
    lefttag: Konva.Tag;
    rightlable: Konva.Label;
    righttag: Konva.Tag;
    scale = 1;

    //构造函数
    constructor() {
        super('container');
        this.config = new MyConfig();

        this.init();
    }

    //初始化
    async init() {
        await this.initAnimationLayer();
        await this.initBgCanvas();

        this.resize();
    }

    //初始化画布
    async initBgCanvas() {
        await this.initBackground();
    }

    //把动态界面以及静态界面加到stage中
    addstage() {
        this.stage.add(this.animationLayer);
        this.stage.add(this.staticLayer);
    }

    // 初始化背景
    async initBackground() {
        this.arrow = new Konva.Arrow(this.config.arrow as any);
        this.staticLayer.add(this.arrow);
        for (let i = 0; i < 21; i++) {
            this.verticalline = new Konva.Line({
                points: [ 120 + 48 * i, 338 ,
                    120 + 48 * i ,  329],
                stroke: '#179DF5',
                strokeWidth: 3,
            });
            this.staticLayer.add(this.verticalline);
        }
        for (let i = 1; i < 10; i++) {
            this.negavlabel = new Konva.Text({
                x: 108 + 48 * i,
                y: 345,
                text: (-10 + i).toString(),
                fontSize: 22,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.animationLayer.add(this.negavlabel);
        }
        this.negavlabel = new Konva.Text({
            x: 100,
            y: 345,
            text: '-10' ,
            fontSize: 22,
            fontFamily: 'TimesNewRomanPSMT',
            fill: 'white'
        });
        this.animationLayer.add(this.negavlabel);
        this.negavlabel = new Konva.Text({
            x: 1068,
            y: 345,
            text: '10' ,
            fontSize: 22,
            fontFamily: 'TimesNewRomanPSMT',
            fill: 'white'
        });
        this.animationLayer.add(this.negavlabel);
        for (let i = 10; i < 20; i++) {
            this.negavlabel = new Konva.Text({
                x: 114 + 48 * i,
                y: 345,
                text: (-10 + i).toString(),
                fontSize: 22,
                fontFamily: 'TimesNewRomanPSMT',
                fill: 'white'
            });
            this.animationLayer.add(this.negavlabel);
        }
    }

    //初始化动态的Layer
    async initAnimationLayer() {
        this.rightmovegroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                const newpos = this.groupDragBoundFuncRight(pos);
                this.valueline.setAttr('points', [ 744 + newpos.x / this.scale, 338 ,
                    456 - newpos.x / this.scale  , 338]);
                this.leftmovegroup.x( - newpos.x / this.scale);
                this.rightnumbertext.text((((newpos.x / this.scale) / 48) + 3).toFixed(1).toString());
                this.comparevalueleft.text((((newpos.x / this.scale) / 48) + 3).toFixed(1).toString());
                this.leftnumbertext.text((((-newpos.x / this.scale) / 48) - 3).toFixed(1).toString());
                this.comparevalueright.text((((-newpos.x / this.scale) / 48) - 3).toFixed(1).toString());
                const number = parseFloat((((newpos.x / this.scale) / 48) + 3).toFixed(1));
                 if (number > 0 && number < 10) {
                     this.comparevalueleft.x(585);
                     this.comparevalueright.x(500);
                     this.leftnumbertext.x(435);
                     this.rightnumbertext.x(729);
                }   else if (number >= 10) {
                     this.comparevalueleft.x(580);
                     this.comparevalueright.x(493);
                     this.rightnumbertext.x(719);
                     this.leftnumbertext.x(428);
                 } else if (number === 0) {
                     this.leftnumbertext.x(448);
                     this.rightnumbertext.x(736);
                     this.comparevalueright.x(509);
                     this.comparevalueleft.x(590);
                     this.leftnumbertext.text('0');
                     this.comparevalueleft.text('0');
                     this.comparevalueright.text('0');
                     this.rightnumbertext.text('0');
                 }
                 this.rightmovegroup.moveToTop();
                return newpos;
            }
        });
        this.leftmovegroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                const newpos = this.groupDragBoundFuncLeft(pos);
                this.valueline.setAttr('points', [ 456 + newpos.x / this.scale, 338 ,
                    744 - newpos.x / this.scale  , 338]);
                this.rightmovegroup.x( - newpos.x / this.scale);
                this.leftnumbertext.text((((newpos.x / this.scale) / 48) - 3).toFixed(1).toString());
                this.comparevalueleft.text(((( -newpos.x / this.scale) / 48) + 3).toFixed(1).toString());
                this.comparevalueright.text((((newpos.x / this.scale) / 48) - 3).toFixed(1).toString());
                this.rightnumbertext.text(((( -newpos.x / this.scale) / 48) + 3).toFixed(1).toString());
                const number = parseFloat((((newpos.x / this.scale) / 48) - 3).toFixed(1));
                if ( number < 0 && number > -10) {
                    this.comparevalueleft.x(585);
                    this.comparevalueright.x(500);
                    this.leftnumbertext.x(435);
                    this.rightnumbertext.x(729);
                } else if (number === -10) {
                    this.comparevalueleft.x(580);
                    this.comparevalueright.x(493);
                    this.rightnumbertext.x(719);
                    this.leftnumbertext.x(428);
                } else if (number === 0) {
                    this.leftnumbertext.x(448);
                    this.rightnumbertext.x(736);
                    this.comparevalueright.x(509);
                    this.comparevalueleft.x(590);
                    this.leftnumbertext.text('0');
                    this.comparevalueleft.text('0');
                    this.comparevalueright.text('0');
                    this.rightnumbertext.text('0');
                }
                this.leftmovegroup.moveToTop();
                return newpos;
            }
        });
        this.compareframeright = await this.loadImage((value as any), this.config.rightImg as any);
        this.animationLayer.add(this.compareframeright);
        this.compareframeleft = await this.loadImage((value as any), this.config.leftImg as any);
        this.animationLayer.add(this.compareframeleft);

        this.comparevalueright = new Konva.Text(this.config.comparevalueright as any);
        this.animationLayer.add(this.comparevalueright);
        this.comparevalueleft = new Konva.Text(this.config.comparevalueleft as any);
        this.animationLayer.add(this.comparevalueleft);
        this.comparewhite = new Konva.Text(this.config.comparewhite as any);
        this.animationLayer.add(this.comparewhite);
        this.compareyellow = new Konva.Text(this.config.compareyellow as any);
        this.animationLayer.add(this.compareyellow);

        this.rightbigcircle = new Konva.Circle(this.config.rightbigcircle as any);
        this.rightmovegroup.add(this.rightbigcircle);
        this.rightsmallcircle = new Konva.Circle(this.config.rightsmallcircle as any);
        this.rightmovegroup.add(this.rightsmallcircle);

        this.leftbigcircle = new Konva.Circle(this.config.leftbigcircle as any);
        this.leftmovegroup.add(this.leftbigcircle);
        this.leftsmallcircle = new Konva.Circle(this.config.leftsmallcircle as any);
        this.leftmovegroup.add(this.leftsmallcircle);

        this.rightlable = new Konva.Label(this.config.rightlable as any);
        this.righttag = new Konva.Tag(this.config.righttag as any);
        this.rightlable.add(this.righttag);
        this.rightmovegroup.add(this.rightlable);

        this.leftlable = new Konva.Label(this.config.leftlable as any);
        this.lefttag = new Konva.Tag(this.config.lefttag as any);
        this.leftlable.add(this.lefttag);
        this.leftmovegroup.add(this.leftlable);

        this.valueline = new Konva.Line(this.config.valueline as any);
        this.animationLayer.add(this.valueline);


        this.rightnumbertext = new Konva.Text(this.config.rightnumbertext as any);
        this.rightmovegroup.add(this.rightnumbertext);
        this.leftnumbertext = new Konva.Text(this.config.leftnumbertext as any);
        this.leftmovegroup.add(this.leftnumbertext);
        this.origincicle =  new Konva.Circle(this.config.origincicle as any);
        this.animationLayer.add(this.origincicle);

        this.animationLayer.add(this.leftmovegroup);
        this.animationLayer.add(this.rightmovegroup);
        this.cursorstyle();
    }


    cursorstyle() {
        this.leftmovegroup.on('mouseover ', (e: any) => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.leftmovegroup.on('mouseleave ', (e: any) => {
            this.stage.container().style.cursor = 'default';
        });
        this.rightmovegroup.on('mouseover ', (e: any) => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.rightmovegroup .on('mouseleave ', (e: any) => {
            this.stage.container().style.cursor = 'default';
        });
    }

    groupDragBoundFuncRight(pos: Vector2d) {
        if (pos.x > -144 * this.scale && pos.x < 336 * this.scale) {
            return {
                x: pos.x,
                y: 0,
            };
        } else if (pos.x >= 336 * this.scale) {
            return {
                x: 336 * this.scale,
                y: 0,
            };
        } else if (pos.x <= -144 * this.scale) {
            return {
                x: -144 * this.scale,
                y: 0,
            };
        }
    }

    groupDragBoundFuncLeft(pos: Vector2d) {
        if (pos.x < 144 * this.scale && pos.x > - 336 * this.scale) {
            return {
                x: pos.x,
                y: 0,
            };
        } else if (pos.x >= 144 * this.scale) {
            return {
                x: 144 * this.scale,
                y: 0,
            };
        } else if (pos.x <= - 336 * this.scale) {
            return {
                x: - 336 * this.scale,
                y: 0,
            };
        }
    }

    // 重置
    async reset() {
        this.rightnumbertext.text('3.0');
        this.leftnumbertext.text('-3.0');
        this.rightnumbertext.x(730);
        this.leftnumbertext.x(435);
        this.comparevalueright.text('3.0');
        this.comparevalueleft.text('-3.0');
        this.comparevalueright.x(585);
        this.comparevalueleft.x(500);
        this.rightmovegroup.x(0);
        this.leftmovegroup.x(0);
        this.valueline.setAttr('points', [744, 338, 456, 338]);
        this.animationLayer.draw();
    }

    //窗口缩小
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;
        const  domtext = document.getElementById('text');
        domtext.style.transform = 'scale(' + this.scale + ', ' + this.scale + ')';
        if (innerWidth > 800) {
            domtext.style.right = (95 - (domtext.clientWidth - domtext.clientWidth * this.scale) * 0.5) + 'px';
        }  else  {
            domtext.style.right = (50 - (domtext.clientWidth - domtext.clientWidth * this.scale) * 0.5) + 'px';
        }

        this.stage.width(1200 * this.scale);
        this.stage.height(675 * this.scale);

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.draw();
    }
}

