import {MyConfig} from './MyConfig';

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import Konva, {Vector2d} from 'konva';


export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;

    arrow: Konva.Arrow;
    origincicle: Konva.Circle;
    verticalline: Konva.Line;
    negavlabel: Konva.Text;
    //移动的组
    movegroup: Konva.Group;
    //右边半透明的大圆
    rightbigcircle: Konva.Circle;
    //右边不透明的小圆
    rightsmallcircle: Konva.Circle;
    //表示数值的线
    valueline: Konva.Line;
    //点表示的正数数值
    positivenumbertext: Konva.Text;
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
                points: [120 + 48 * i, 338,
                    120 + 48 * i, 329],
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
            text: '-10',
            fontSize: 22,
            fontFamily: 'TimesNewRomanPSMT',
            fill: 'white'
        });
        this.animationLayer.add(this.negavlabel);
        this.negavlabel = new Konva.Text({
            x: 1068,
            y: 345,
            text: '10',
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
        this.movegroup = new Konva.Group({
            draggable: true,
            dragBoundFunc: (pos) => {
                const newpos = this.groupDragBoundFuncPositive(pos);
                this.valueline.setAttr('points', [744 + newpos.x / this.scale, 338,
                    600, 338]);
                this.positivenumbertext.text((((newpos.x / this.scale) / 48) + 3).toFixed(1).toString());
                const number = parseFloat((((newpos.x / this.scale) / 48) + 3).toFixed(1));
                if (number === 0) {
                    this.positivenumbertext.text('0');
                }
                const a = (this.righttag.width() - this.positivenumbertext.width()) / 2;
                this.positivenumbertext.x(this.rightlable.x() + a);

                return newpos;
            }
        });
        this.rightbigcircle = new Konva.Circle(this.config.rightbigcircle as any);
        this.movegroup.add(this.rightbigcircle);
        this.rightsmallcircle = new Konva.Circle(this.config.rightsmallcircle as any);
        this.movegroup.add(this.rightsmallcircle);
        this.valueline = new Konva.Line(this.config.valueline as any);
        this.animationLayer.add(this.valueline);

        this.rightlable = new Konva.Label(this.config.rightlable as any);
        this.righttag = new Konva.Tag(this.config.righttag as any);
        this.rightlable.add(this.righttag);
        this.movegroup.add(this.rightlable);
        this.positivenumbertext = new Konva.Text(this.config.positivenumbertext as any);
        const x = (this.righttag.width() - this.positivenumbertext.width()) / 2;
        this.positivenumbertext.x(this.rightlable.x() + x);

        let rightlableValue = 8;
        if (window.env.browserInfo.isIpad) {
            rightlableValue = 6;
        }
        this.positivenumbertext.y(this.rightlable.y() + rightlableValue);

        this.movegroup.add(this.positivenumbertext);
        this.origincicle = new Konva.Circle(this.config.origincicle as any);
        this.animationLayer.add(this.origincicle);

        this.animationLayer.add(this.movegroup);
        this.cursorstyle();
    }

    cursorstyle() {
        this.movegroup.on('mouseover ', (e: any) => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.movegroup.on('mouseleave ', (e: any) => {
            this.stage.container().style.cursor = 'default';
        });
    }

    groupDragBoundFuncPositive(pos: Vector2d) {
        if (pos.x > -624 * this.scale && pos.x < 336 * this.scale) {
            return {
                x: pos.x,
                y: 0,
            };
        } else if (pos.x >= 336 * this.scale) {
            return {
                x: 336 * this.scale,
                y: 0,
            };
        } else if (pos.x <= -624 * this.scale) {
            return {
                x: -624 * this.scale,
                y: 0,
            };
        }
    }

    // 重置
    async reset() {
        this.positivenumbertext.text('3.0');
        const x = (this.righttag.width() - this.positivenumbertext.width()) / 2;
        this.positivenumbertext.x(this.rightlable.x() + x);
        this.movegroup.x(0);
        this.valueline.setAttr('points', [744, 338, 600, 338]);
        this.animationLayer.draw();
    }

    //窗口缩小
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

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

