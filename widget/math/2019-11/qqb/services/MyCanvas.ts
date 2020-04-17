import {MyConfig} from './MyConfig';
import * as Konva from 'konva';
import * as whole from '../sub_static/whole.svg';

import {BirdConfig} from './BirdConfig';
import {HouseConfig} from './HouseConfig';
import {TreeConfig} from './TreeConfig';
import {WindmillConfig} from './WindmillConfig';

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class MyCanvas extends SimpleKonvaTemplate {
    scale = 1;
    //初始化时的正方形
    wholeImg: Konva.Image;
    //右侧的小房子
    smallhouseImg: Konva.Image;
    //右侧的小树
    smalltreeImg: Konva.Image;
    //右侧的小鸟
    smallbirdImg: Konva.Image;
    //右侧的小风车
    smallwindmillImg: Konva.Image;
    config: MyConfig;
    // 点击小鸟图片之后的配置
    birdconfig: BirdConfig;
    // 点击小房子图片之后的配置
    houseconfig: HouseConfig;
    // 点击小树图片之后的配置
    treeconfig: TreeConfig;
    // 点击小风车图片之后的配置
    windmillconfig: WindmillConfig;
    // 配置的集合
    configArray = new Array();

    //构造函数
    constructor() {
        super('container');
        this.config = new MyConfig();

        this.birdconfig = new BirdConfig();
        this.treeconfig = new TreeConfig();
        this.houseconfig = new HouseConfig();
        this.windmillconfig = new WindmillConfig();

        this.init();
    }

    //初始化
    async init() {
        await this.inithouseLayer();

        this.resize();
    }

    //初始化动态的Layer
    async inithouseLayer() {
        this.addConfigArray();
        this.wholeImg = await this.loadImage((whole as any), this.config.wholeImg as any);
        for (let i = 0; i < this.configArray.length; i++) {
            this.config.smallkonvaArray[i] =
                await this.loadImage((this.config.componentsArray[i] as any), this.config.smallimgArray[i] as any);
            this.staticLayer.add(this.config.smallkonvaArray[i]);
            this.skipEvent(i);
        }
        this.animationLayer.add(this.wholeImg);
    }

    // 点击图片事件
    skipEvent(i: number) {
        this.config.smallkonvaArray[i].on('mouseenter', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.config.smallkonvaArray[i].on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
        this.config.smallkonvaArray[i].on('mousedown touchstart ', async (e: any) => {
            this.animationLayer.removeChildren();
            this.config.konvaArray[i] = await this.loadImage((this.config.componentsArray[i] as any), this.config.imgArray[i] as any);
            this.animationLayer.add(this.config.konvaArray[i]);
            for (let j = 0; j < this.configArray[i].konvaArray.length; j++) {
                this.configArray[i].konvaArray[j] = new Konva.Line(this.configArray[i].imgArray[j] as any);
                this.animationLayer.add(this.configArray[i].konvaArray[j]);
                this.dragEvent(i, j);
            }
            this.animationLayer.draw();
        });
    }

    //移动图片事件
    dragEvent(i: number, j: number) {
        this.configArray[i].konvaArray[j].on('mouseenter', () => {
            this.stage.container().style.cursor = 'pointer';
        });
        this.configArray[i].konvaArray[j].on('mouseleave', () => {
            this.stage.container().style.cursor = 'default';
        });
        this.configArray[i].konvaArray[j].on('dragmove ', () => {
            const figure = this.configArray[i].konvaArray[j];
            const pos = this.configArray[i].posArray[j];
            figure.moveToTop();
            if (this.configArray[i].konvaArray[j].x() <= -this.configArray[i].limltleftArray[j]) {
                this.configArray[i].konvaArray[j].x(-this.configArray[i].limltleftArray[j]) ;
            } else if (this.configArray[i].konvaArray[j].x() >= this.configArray[i].limltrightArray[j]) {
                this.configArray[i].konvaArray[j].x(this.configArray[i].limltrightArray[j]) ;
            }
            if (this.configArray[i].konvaArray[j].y() <= -this.configArray[i].limlttopArray[j]) {
                this.configArray[i].konvaArray[j].y(-this.configArray[i].limlttopArray[j]) ;
            } else if (this.configArray[i].konvaArray[j].y() >= this.configArray[i].limltbottomArray[j]) {
                this.configArray[i].konvaArray[j].y(this.configArray[i].limltbottomArray[j]) ;
            }
           console.log();
            if (figure.x() >= pos.x - 10 && figure.x() <= pos.x + 10
                && figure.y() >= pos.y - 10 && figure.y() <= pos.y + 10) {
                figure.x(pos.x);
                figure.y(pos.y);
            }
        });
    }

    addConfigArray() {
        this.configArray.push(this.birdconfig);
        this.configArray.push(this.treeconfig);
        this.configArray.push(this.houseconfig);
        this.configArray.push(this.windmillconfig);
    }

    // 重置
    async reset() {
        this.animationLayer.removeChildren();
        this.animationLayer.add(this.wholeImg);
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
        const top = (height - this.stage.height()) / 2 + 'px';
        const left = (width - this.stage.width()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.position = 'absolute';
        (container as any).style.top = top;
        (container as any).style.left = left;

        this.stage.draw();
    }
}

