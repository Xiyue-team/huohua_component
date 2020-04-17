import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import * as sjb from '../sub_static/sjb.png';

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import {cursorTo} from 'readline';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;
    sjbimage: Konva.Image;
    scale = 1;
    //静态不动的指针
    staticline: Konva.Line;
    //动态旋转的指针
    animationline: Konva.Line;
    //中心旋转的圆心
    middlecircle: Konva.Circle;
    //显示角度的扇形
    anglewedge: Konva.Wedge;
    //显示角度的文本
    angletext: Konva.Text;
    //显示判定角度的文本
    judgetext: Konva.Text;

    rightangleline: Konva.Line;
    //白色的大圆
    whitecircle: Konva.Circle;
    //橙色的小圆
    oraangecircle: Konva.Circle;
    //运动的组
    movegroup: Konva.Group;
    opacitycircle: Konva.Circle;
    moverect: Konva.Line;

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
        this.sjbimage = await this.loadImage((sjb as any), this.config.sjbImg as any);
        this.staticLayer.add(this.sjbimage);
    }

    //初始化动态的Layer
    async initAnimationLayer() {
        this.middlecircle = new Konva.Circle(this.config.middlecircle as any);
        this.opacitycircle = new Konva.Circle(this.config.opacitycircle as any);
        this.animationline = new Konva.Line(this.config.animationline as any);
        this.anglewedge = new Konva.Wedge(this.config.anglewedge as any);
        this.staticline = new Konva.Line(this.config.staticline as any);
        this.angletext = new Konva.Text(this.config.angletext as any);
        this.judgetext = new Konva.Text(this.config.judgetext as any);
        this.rightangleline = new Konva.Line(this.config.rightangleline as any);
        this.oraangecircle = new Konva.Circle(this.config.orangecircle as any);
        this.whitecircle = new Konva.Circle(this.config.whitecircle as any);
        this.movegroup = new Konva.Group(this.config.movegroup as any);
        this.moverect = new Konva.Line(this.config.moverect as any);

        this.animationLayer.add(this.rightangleline);
        this.animationLayer.add(this.judgetext);
        this.animationLayer.add(this.angletext);
        this.animationLayer.add(this.anglewedge);
        this.animationLayer.add(this.staticline);
        this.movegroup.add(this.moverect);
        this.movegroup.add(this.animationline);
        this.movegroup.add(this.opacitycircle);
        this.movegroup.add(this.whitecircle);
        this.movegroup.add(this.oraangecircle);
        this.animationLayer.add(this.movegroup);
        this.animationLayer.add(this.middlecircle);

        this.moveAnimationLineEvent();
    }

    //移动指针界面
    moveAnimationLineEvent() {
        this.movegroup.on('mouseover ', (e: any) => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.movegroup.on('mouseleave ', (e: any) => {
            this.stage.container().style.cursor = 'default';
        });
        this.movegroup.on('mousedown touchstart', (e: any) => {
            this.movegroup.setAttr('controlled', true);
        });
        this.stage.on('mouseup touchend', (e: any) => {
            this.movegroup.setAttr('controlled', false);
        });
        this.stage.on('mousemove  touchmove', (e: any) => {
            if (this.movegroup.getAttr('controlled')) {
                const mousePos = this.stage.getPointerPosition();
                const x = mousePos.x / this.scale - this.middlecircle.x();
                const y = mousePos.y / this.scale - this.middlecircle.y();

                if (x > 0) {
                    this.movegroup.rotation(Math.atan(y / x) * (180 / Math.PI) + 45);
                    if (y < 0) {
                        this.changText(this.angletext, this.judgetext, (45 - this.movegroup.rotation()).toFixed(0) + '°', window.env.browserInfo.lang.angle[0]);
                        this.cancelRightLine();
                        if (y > -10) {
                            this.movegroup.rotation(45);
                            this.changText(this.angletext, this.judgetext, '0°', '');
                            this.cancelRightLine();
                        }
                        if (x < 10) {
                            this.rightAngle();
                        }
                    } else if (y > 0) {
                        this.changText(this.angletext, this.judgetext, (45 - this.movegroup.rotation() + 360).toFixed(0) + '°', '');
                        this.cancelRightLine();
                        if (y < 10) {
                            this.movegroup.rotation(405);
                            this.changText(this.angletext, this.judgetext, '360°', window.env.browserInfo.lang.angle[4]);
                            this.cancelRightLine();
                        }
                    }
                } else if (x < 0) {
                    this.movegroup.rotation(Math.atan(y / x) * (180 / Math.PI) + 225);
                    if (y < 0) {
                        this.changText(this.angletext, this.judgetext, ((405 - this.movegroup.rotation()).toFixed(0) + '°'), window.env.browserInfo.lang.angle[2]);
                        this.cancelRightLine();
                        if (y > -10) {
                            this.flatAngle();
                            this.cancelRightLine();
                        }
                        if (x > -10) {
                            this.rightAngle();
                        }
                    } else if (y > 0) {
                        this.changText(this.angletext, this.judgetext, ((405 - this.movegroup.rotation()).toFixed(0) + '°'), '');
                        this.cancelRightLine();
                        if (y < 10) {
                            this.flatAngle();
                            this.cancelRightLine();
                        }
                    }
                }
                this.anglewedge.setAttr('angle', (this.movegroup.rotation() - 45));
                this.animationLayer.draw();
            }
        });
    }

    rightAngle() {
        this.movegroup.rotation(-45);
        this.angletext.setAttr('text', '90°');
        this.judgetext.setAttr('text', window.env.browserInfo.lang.angle[1]);
        this.rightangleline.setAttr('visible', true);
        this.anglewedge.setAttr('visible', false);
    }

    flatAngle() {
        this.movegroup.rotation(-135);
        this.angletext.setAttr('text', '180°');
        this.judgetext.setAttr('text', window.env.browserInfo.lang.angle[3]);
    }

    cancelRightLine() {
        this.rightangleline.setAttr('visible', false);
        this.anglewedge.setAttr('visible', true);
    }

    changText(text1: Konva.Text, text2: Konva.Text, x1: string, x2: string) {
        text1.setAttr('text', x1);
        text2.setAttr('text', x2);
    }

    // 重置
    async reset() {
        this.animationLayer.removeChildren();
        this.initAnimationLayer();
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

