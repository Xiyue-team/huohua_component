import {default as Konva, Layer, SizeConfig} from 'konva';

import * as voltmeter from '../sub_static/voltmeter.png';
import * as redLinePng from '../sub_static/red_line.png';
import * as blueLinePng from '../sub_static/blue_line.png';

export class Dybds2dModel {
    private stage: Konva.Stage;  // 场景
    private pointer: Konva.Line; // 指针
    private redLine: Konva.Image; //红色导线
    private blueLine: Konva.Image; // 蓝色导线

    private time = 0.5; // 随机示数动画时间
    private range = 1; // 量程 1:3V, 2:15V
    /**
     * 场景缩放比例
     */
    private scaleValue = new ScaleValue();
    /**
     * 构造函数
     * @param {string} container 载体 html容器id
     */
    constructor(container: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container);
        this.initLayer(container);
    }
    
    /**
     * 初始化场景
     * @param container 载体 html容器id
     */
    private initStage(container: string) {
        Konva.pixelRatio = window.devicePixelRatio;
        const dom = document.getElementById(container);
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.stage = new Konva.Stage({
            container,
            width,
            height
        });
    }

    /**
     * 初始化图层
     * @param container  载体 html容器id
     */
    private async initLayer(container: string): Promise<void> {
        const dom = document.getElementById(container);
        const width = dom.clientWidth;
        const height = dom.clientHeight;

        /**
         * 静态图层
         */
        const staticLayer = new Layer();
        staticLayer.setAttrs({
            x: (width - 740 * this.scaleValue.scale) / 2,
            y: (height - 695 * this.scaleValue.scale) / 2,
            scale: {
                x: this.scaleValue.scale,
                y: this.scaleValue.scale
            }
        });
        this.stage.add(staticLayer);
        let mainResistance = null; // 主仪表
        const mainCrop: SizeConfig = {
            x: 0,
            y: 0,
            width: 740,
            height: 540
        };
        await this.loadImage(voltmeter, mainCrop).then((image) => {
            mainResistance = image;
        });
        staticLayer.add(mainResistance);
        staticLayer.draw();
        // 初始化动态层，控制指针变化
        const animationLayer = new Konva.Layer();
        animationLayer.setAttrs({
            x: (width - 740 * this.scaleValue.scale) / 2,
            y: (height - 695 * this.scaleValue.scale) / 2,
            scale: {
                x: this.scaleValue.scale,
                y: this.scaleValue.scale
            }
        });
        this.stage.add(animationLayer);

        // 初始化指针位置
        this.pointer  = new Konva.Line({
            x: 335, y: 333,
            points: [ -27, 140, 250, 140],
            tension: 0,
            stroke: 'red',
            offsetX: 250,
            offsetY: 140,
            rotation: 43.6
        });
        animationLayer.add(this.pointer);
        const lineCrop: SizeConfig = {
            width: 220,
            height: 200,
        };
         // 创建导线
        await this.loadImage(redLinePng, lineCrop).then((image: Konva.Image) => {
            this.redLine = image;
        });

        await this.loadImage(blueLinePng, lineCrop).then((image: Konva.Image) => {
            this.blueLine = image;
        });
        this.redLine.x(320);
        this.redLine.y(490);

        this.blueLine.x(110);
        this.blueLine.y(490);

        animationLayer.add(this.redLine);
        animationLayer.add(this.blueLine);
        animationLayer.draw();
    }

    // 随机读数
    createRandom() {
        const num = Math.random() * 92.5;
        this.pointer.to({
            duration: this.time, 
            rotation: 43.5 + parseInt(num.toString())
        });
    }

    // 读取随机数
    randomNumber() {
        this.createRandom();
    }

    // 切换量程
    changeRange() {
        this.range = this.range === 2 ? 1 : 2;
        this.redLine.to({
            x: this.range === 1 ? 320 : 530
            
        });
        this.pointer.to({
            duration: this.time, 
            rotation: 43.5
        });
    }

    // 重置
    reset() {
        this.redLine.to({
            x: 320 
        });

        this.pointer.to({
            duration: this.time, 
            rotation: 43.6
        });
    }
    
    

    /**
     * 封装加载konva图片
     * @param {any} src
     * @param {Konva.ImageConfig} imageConfig
     * @returns {Promise<Konva.Image>}
     */
    async loadImage(src: any, crop: SizeConfig): Promise<Konva.Image> {
        return new Promise<Konva.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new Konva.Image({image: img, crop});
                resolve(imgObj);
            };
            img.src = src;
        });
    }

}



/**
 * 计算缩放比例
 */
export class ScaleValue {
    scale = window.innerWidth / 1680;
}
