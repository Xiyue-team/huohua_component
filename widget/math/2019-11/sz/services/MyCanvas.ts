import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import * as zxy from '../sub_static/zxy.png';
import * as sz from '../sub_static/sz.png';
import * as szhong from '../sub_static/szhong.png';
import * as fz from '../sub_static/fz.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as mz from '../sub_static/mz.png';
import {Context, Shape} from 'konva';

export class MyCanvas extends SimpleKonvaTemplate {
    config: MyConfig;
    //时钟图
    clockImage: Konva.Image;
    //中心圆点图
    middleImage: Konva.Image;
    //分针图
    fzImage: Konva.Image;
    //时针图
    szImage: Konva.Image;
    //秒针图
    mzImage: Konva.Image;
    mzrect: Konva.Rect;
    fzrect: Konva.Rect;
    szrect: Konva.Rect;
    mzgroup: Konva.Group;
    fzgroup: Konva.Group;
    szgroup: Konva.Group;
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
        await this.initMiddleImage();
        await this.initBackground();
    }

    //把动态界面以及静态界面加到stage中
    addstage() {
        this.stage.add(this.animationLayer);
        this.stage.add(this.staticLayer);
    }

    // 初始化背景
    async initBackground() {
        // 背景时钟的图片
        this.clockImage = await this.loadImage((szhong as any), this.config.clockImg as any);
        this.staticLayer.add(this.clockImage);
    }

    // 初始化圆心
    async initMiddleImage() {
        this.middleImage = await this.loadImage((zxy as any), this.config.middleImg as any);
        this.animationLayer.add(this.middleImage);
    }

    //初始化动态的Layer
    async initAnimationLayer() {
        this.mzgroup = new Konva.Group(this.config.zzgroup as any);
        this.animationLayer.add(this.mzgroup);
        this.fzgroup = new Konva.Group(this.config.zzgroup as any);
        this.animationLayer.add(this.fzgroup);
        this.szgroup = new Konva.Group(this.config.zzgroup as any);
        this.animationLayer.add(this.szgroup);

        this.mzImage = await this.loadImage((mz as any), this.config.mzImg as any);
        this.mzgroup.add(this.mzImage);
        this.mzrect = new Konva.Rect(this.config.mzRect as any);
        this.mzgroup.add(this.mzrect);



        this.fzImage = await this.loadImage((fz as any), this.config.fzImg as any);
        this.fzgroup.add(this.fzImage);
        this.fzrect = new Konva.Rect(this.config.fzRect as any);
        this.fzgroup.add(this.fzrect);

        this.szImage = await this.loadImage((sz as any), this.config.szImg as any);
        this.szgroup.add(this.szImage);
        this.szrect = new Konva.Rect(this.config.szRect as any);
        this.szgroup.add(this.szrect);

        await this.initMiddleImage();
        this.moveMzImageEnvent();
        this.moveFzImageEnvent();
        this.moveSzImageEnvent();
    }

    //移动秒针事件
    moveMzImageEnvent() {
        this.mzgroup.on('mousedown touchstart', (e: any) => {
            this.mzgroup.setAttr('controlled', true);
        });
        this.stage.on('mouseup touchend', (e: any) => {
            this.mzgroup.setAttr('controlled', false);
        });
        this.stage.on('mousemove  touchmove', (e: any) => {
            if (this.mzgroup.getAttr('controlled')) {
                const mousePos = this.stage.getPointerPosition();
                const x = mousePos.x / this.scale - this.mzgroup.x() - 6;
                const y = this.mzgroup.y() + 6 - mousePos.y / this.scale;
                if (x > 0) {
                    this.mzgroup.rotation(-Math.atan(y / x) * (180 / Math.PI) + 270);
                } else if (x < 0) {
                    this.mzgroup.rotation(-Math.atan(y / x) * (180 / Math.PI) + 90);
                }
                this.animationLayer.draw();
            }
        });
    }

    //移动分针事件
    moveFzImageEnvent() {
        this.fzgroup.on('mousedown touchstart', (e: any) => {
            this.fzgroup.setAttr('controlled', true);
        });
        this.stage.on('mouseup touchend', (e: any) => {
            this.fzgroup.setAttr('controlled', false);
        });
        this.stage.on('mousemove touchmove ', (e: any) => {
            if (this.fzgroup.getAttr('controlled')) {
                const mousePos = this.stage.getPointerPosition();
                const x = mousePos.x / this.scale - this.middleImage.x() - 6;
                const y = this.middleImage.y() + 6 - mousePos.y / this.scale;
                if (x > 0) {
                    this.fzgroup.rotation(-Math.atan(y / x) * (180 / Math.PI));
                } else if (x < 0) {
                    this.fzgroup.rotation(-Math.atan(y / x) * (180 / Math.PI) - 180);
                }
                this.animationLayer.draw();

            }
        });
    }

    //移动时针界面
    moveSzImageEnvent() {
        this.szgroup.on('mousedown touchstart', (e: any) => {
            this.szgroup.setAttr('controlled', true);
        });
        this.stage.on('mouseup touchend', (e: any) => {
            this.szgroup.setAttr('controlled', false);
        });
        this.stage.on('mousemove touchmove', (e: any) => {
            if (this.szgroup.getAttr('controlled')) {
                const mousePos = this.stage.getPointerPosition();
                const x = mousePos.x / this.scale - this.middleImage.x() - 6;
                const y = this.middleImage.y() + 6 - mousePos.y / this.scale;
                if (x > 0) {
                    this.szgroup.rotation(-Math.atan(y / x) * (180 / Math.PI) + 90);
                } else if (x < 0) {
                    this.szgroup.rotation(-Math.atan(y / x) * (180 / Math.PI) + 270);
                }
                this.animationLayer.draw();
            }
        });
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

        this.stage.width(550.8 * this.scale);
        this.stage.height(551.8 * this.scale);

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

