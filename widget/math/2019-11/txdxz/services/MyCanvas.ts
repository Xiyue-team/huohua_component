import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import * as dot from '../sub_static/dot.png';
import * as arrow from '../sub_static/arrow.png';
import * as leftarrow from '../sub_static/leftarrow.png';
import * as rightarrow from '../sub_static/rightarrow.png';

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import {Vector2d} from 'konva';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;
    scale = 1;
    //三角形左下角点的图片
    dotImage: Konva.Image;
    //表示旋转的图片
    arrowImage: Konva.Image;
    //表示左边旋转的图片
    leftarrowImage: Konva.Image;
    //表示旋转的图片
    rightarrowImage: Konva.Image;
    //表示前方运动的三角形
    frontdelta: Konva.Line;
    //表示后面不动的三角形
    backdelta: Konva.Line;
    //移动的组
    movegroup: Konva.Group;
    //三角形上方的圆
    topcircle: Konva.Circle;
    //三角形右下角的圆
    rightcircle: Konva.Circle;
    //三角形左边的圆
    leftcircle: Konva.Circle;
    staticgroup: Konva.Group;
    taggingtext: Konva.Text;
    marktext: Konva.Text;
    poscenter: Vector2d;
    offsetrocation: number;
    startrocation: number;
    startrocation1: number;
    endrocation: number;
    x: number;
    y: number;


    //构造函数
    constructor() {
        super('container');
        this.config = new MyConfig();
        this.init();
        this.offsetrocation = 0;
        this.startrocation = 0;
        this.startrocation1 = 0;
        this.endrocation = 0;
    }

    //初始化
    async init() {
        await this.initAnimationLayer();

        this.resize();
    }

    //把动态界面加到stage中
    addstage() {
        this.stage.add(this.animationLayer);
    }

    //初始化动态的Layer
    async initAnimationLayer() {
        this.poscenter = new class implements Vector2d {
            x: 490;
            y: 406;
        };
        this.movegroup = new Konva.Group({
            x: 490,
            y: 406,
            dragBoundFunc: (pos) => {
                if (pos.y <= 239 * this.scale) {
                    pos.y = 239 * this.scale;
                } else if (pos.y >= 435 * this.scale) {
                    pos.y = 435 * this.scale;
                }
                if (pos.x <= 239 * this.scale) {
                    pos.x = 239 * this.scale;
                } else if (pos.x >= 711 * this.scale) {
                    pos.x = 711 * this.scale;
                }
                return pos;
            },
            offset: {
                x: 490,
                y: 406
            },
        });
        this.staticgroup = new Konva.Group({
            x: 490,
            y: 406,

            offset: {
                x: 490,
                y: 406
            },
        });
        this.frontdelta = new Konva.Line(this.config.frontdelta as any);
        this.movegroup.add(this.frontdelta);
        this.arrowImage = await this.loadImage((arrow as any), this.config.arrowImg as any);

        this.movegroup.add(this.arrowImage);

        this.topcircle = new Konva.Circle(this.config.topcircle as any);
        this.movegroup.add(this.topcircle);
        this.leftcircle = new Konva.Circle(this.config.leftcircle as any);
        this.movegroup.add(this.leftcircle);
        this.backdelta = new Konva.Line(this.config.backdelta as any);

        this.x = 490;
        this.y = 406;
        this.staticgroup.add(this.backdelta);
        this.taggingtext = new Konva.Text(this.config.taggingtext as any);
        this.marktext = new Konva.Text(this.config.marktext as any);


        this.animationLayer.add(this.staticgroup);
        this.animationLayer.add(this.movegroup);
        this.animationLayer.add(this.taggingtext);
        this.animationLayer.add(this.marktext);

        this.rotateEvent();
    }

    showText(value: boolean) {
        if (value) {
            this.taggingtext.setAttr('visible', true);
            this.marktext.setAttr('visible', true);
            this.animationLayer.draw();
        } else {
            this.taggingtext.setAttr('visible', false);
            this.marktext.setAttr('visible', false);

            this.animationLayer.draw();
        }
    }



    //转动图片事件
    rotateEvent() {

        this.arrowImage.on('mousedown touchstart', (e: any) => {
            this.movegroup.setAttr('controlled', true);
            this.staticgroup.rotation(this.movegroup.rotation());
            this.startrocation1 = this.startrocation;
        });
        this.stage.on('mouseup touchend', (e: any) => {
            this.movegroup.setAttr('controlled', false);
        });
        this.stage.on('mousemove  touchmove', (e: any) => {
            if (this.movegroup.getAttr('controlled')) {
                const mousePos = this.stage.getPointerPosition();
                const x = mousePos.x / this.scale - this.movegroup.x();
                const y = mousePos.y / this.scale - this.movegroup.y();
                this.movegroup.x(this.x);
                this.movegroup.y(this.y);
                this.movegroup.setAttr('offset', {
                    x: 490,
                    y: 406
                });

                if (x >= 0) {
                    this.movegroup.rotation(Math.atan(y / x) * (180 / Math.PI) + 90);
                    const reallyrocation = Math.atan(y / x) * (180 / Math.PI) + 90 - this.startrocation1;
                    if (reallyrocation > 0) {
                        this.taggingtext.setAttr
                        ('text', window.env.browserInfo.lang.tagging + (Math.atan(y / x) * (180 / Math.PI) +
                            90 - this.startrocation1).toFixed(0).toString() + '°');
                    } else {
                        this.taggingtext.setAttr
                        ('text', window.env.browserInfo.lang.tagging + (Math.atan(y / x) * (180 / Math.PI) +
                            450 - this.startrocation1).toFixed(0).toString() + '°');
                    }

                    this.startrocation = Math.atan(y / x) * (180 / Math.PI) + 90;
                } else if (x < 0) {
                    this.movegroup.rotation(Math.atan(y / x) * (180 / Math.PI) + 270);
                    const reallyrocation = Math.atan(y / x) * (180 / Math.PI) + 270 - this.startrocation1;
                    if (reallyrocation > 0) {
                        this.taggingtext.setAttr
                        ('text', window.env.browserInfo.lang.tagging + reallyrocation
                            .toFixed(0).toString() + '°');
                    } else {
                        this.taggingtext.setAttr
                        ('text', window.env.browserInfo.lang.tagging + (Math.atan(y / x) * (180 / Math.PI) + 630 - this.startrocation1)
                            .toFixed(0).toString() + '°');
                    }


                    this.startrocation = Math.atan(y / x) * (180 / Math.PI) + 270;
                }
                this.animationLayer.draw();
            }
        });

    }

    changeCentre() {
        this.rightcircle.on('mousedown touchstart', (e: any) => {
            this.rightCenterEvent();
        });
        this.topcircle.on('mousedown touchstart', (e: any) => {
            this.topCenterEvent();
        });
        this.leftcircle.on('mousedown touchstart', (e: any) => {
            this.leftCenterEvent();
        });
    }

    rightCenterEvent() {
        this.dotImage.x(704);
        this.dotImage.y(386);
        this.leftarrowImage.visible(true);
        this.arrowImage.visible(false);
        this.rightarrowImage.visible(false);
        this.animationLayer.draw();
    }

    topCenterEvent() {
        this.dotImage.x(470);
        this.dotImage.y(252);
        this.leftarrowImage.visible(false);
        this.arrowImage.visible(false);
        this.rightarrowImage.visible(true);
        this.animationLayer.draw();
    }

    leftCenterEvent() {
        this.dotImage.x(470);
        this.dotImage.y(386);
        this.leftarrowImage.visible(false);
        this.arrowImage.visible(true);
        this.rightarrowImage.visible(false);
        this.animationLayer.draw();
    }

    // 重置
    async reset() {
        this.animationLayer.removeChildren();
        await this.initAnimationLayer();
        this.animationLayer.draw();
    }

    //窗口缩小
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width(1500 * this.scale);
        this.stage.height(675 * this.scale);

        this.stage.scaleX(this.scale);
        this.stage.scaleY(this.scale);

        const left = '0px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.draw();
    }
}

