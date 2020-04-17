import {fabric} from 'fabric';
import * as background from '../sub_static/background.png';
import * as desert from '../sub_static/desertPlant.png';
import * as meadow from '../sub_static/meadowPlant.png';
import * as forest from '../sub_static/forestPlant.png';
import * as rainforest from '../sub_static/rainforestPlant.png';
import * as minDesert from '../sub_static/minDesertPlant.png';
import * as minMeadow from '../sub_static/minMeadowPlant.png';
import * as minForest from '../sub_static/minForestPlant.png';
import * as minRainforest from '../sub_static/minRainforestPlant.png';
import * as rightButton from '../sub_static/rightButton.png';
import * as zoomOut from '../sub_static/zoomOut.png';
import * as zoomIn from '../sub_static/zoomIn.png';

import { PlantConfig } from './PlantConfig';
import { Linear, TweenMax } from 'gsap';

export default class PlantCanvas {
    config: PlantConfig;
    myCanvas: fabric.Canvas;
    //放大后的图
    desertImage: fabric.Image;
    meadowImage: fabric.Image;
    forestImage: fabric.Image;
    rainforestImage: fabric.Image;
    //缩小图
    minDesertImage: fabric.Image;
    minMeadowImage: fabric.Image;
    minForestImage: fabric.Image;
    minRainforestImage: fabric.Image;
    //图片放大按钮
    desertZoomOut: fabric.Image;
    meadowZoomOut: fabric.Image;
    forestZoomOut: fabric.Image;
    rainforestZoomOut: fabric.Image;
    //放大图片的提示文字
    text1: fabric.Text;
    text2: fabric.Text;
    text3: fabric.Text;

    rightButton: fabric.Image;
    zoomInImage: fabric.Image;
    zoomRect: fabric.Rect;
    zoom = 1;
    //图片植物类型
    plantMode: string;
    isAniamtion: boolean;
    isZoomIn: boolean;

    constructor() {
        this.isAniamtion = false;
        this.isZoomIn = false;
        const radito = window.innerWidth / window.innerHeight;
        const uiRadito = 16 / 9;
        let width;
        let height;
        if (radito > uiRadito) {
            height = window.innerHeight;
            width = 16 * height / 9;
            this.zoom = height / 576;
        } else {
            width = window.innerWidth;
            height = 9 * width / 16;
            this.zoom = width / 1024;
        }

        (document.getElementById('canvas') as any).width = width;
        (document.getElementById('canvas') as any).height = height;

        this.myCanvas = new fabric.Canvas('canvas');
        this.myCanvas.hoverCursor = 'default';
        this.myCanvas.selection = false;

        this.config = new PlantConfig();

        this.initResource();
        this.initCanvasScale();

        //为了让图片始终居中
        if (window.innerHeight > height) {
          (document.getElementById('3dContainer') as any).style.marginTop =
            (window.innerHeight - height) / 2 + 'px';
        }

    }

    initCanvasScale() {
        this.myCanvas.setZoom(this.zoom);
    }

    async initResource() {
        const backgroundImage = await this.loadImage(background as any, this.config.backgroundConfig);
        backgroundImage.scale(0.5);
        backgroundImage.setCoords();
        this.myCanvas.add(backgroundImage);

        this.desertImage = await this.loadImage(desert as any, this.config.minDesertConfig);
        this.desertImage.scale(0.104);
        this.desertImage.setCoords();
        this.desertImage.visible = false;
        this.myCanvas.add(this.desertImage);

        this.meadowImage = await this.loadImage(meadow as any, this.config.minMeadowConfig);
        this.meadowImage.scale(0.104);
        this.meadowImage.setCoords();
        this.meadowImage.visible = false;
        this.myCanvas.add(this.meadowImage);

        this.forestImage = await this.loadImage(forest as any, this.config.minForestConfig);
        this.forestImage.scale(0.104);
        this.forestImage.setCoords();
        this.forestImage.visible = false;
        this.myCanvas.add(this.forestImage);

        this.rainforestImage = await this.loadImage(rainforest as any, this.config.minRainforestConfig);
        this.rainforestImage.scale(0.104);
        this.rainforestImage.setCoords();
        this.rainforestImage.visible = false;
        this.myCanvas.add(this.rainforestImage);

        this.minDesertImage = await this.loadImage(minDesert as any, this.config.minDesertConfig);
        this.minDesertImage.scale(0.5);
        this.minDesertImage.setCoords();
        this.myCanvas.add(this.minDesertImage);

        this.minMeadowImage = await this.loadImage(minMeadow as any, this.config.minMeadowConfig);
        this.minMeadowImage.scale(0.5);
        this.minMeadowImage.setCoords();
        this.myCanvas.add(this.minMeadowImage);

        this.minForestImage = await this.loadImage(minForest as any, this.config.minForestConfig);
        this.minForestImage.scale(0.5);
        this.minForestImage.setCoords();
        this.myCanvas.add(this.minForestImage);

        this.minRainforestImage = await this.loadImage(minRainforest as any, this.config.minRainforestConfig);
        this.minRainforestImage.scale(0.5);
        this.minRainforestImage.setCoords();
        this.myCanvas.add(this.minRainforestImage);

        this.desertZoomOut = await this.loadImage(zoomOut as any, this.config.desertZoomOutConfig);
        this.desertZoomOut.scale(0.5);
        this.desertZoomOut.setCoords();
        this.myCanvas.add(this.desertZoomOut);

        this.meadowZoomOut = await this.loadImage(zoomOut as any, this.config.meadowZoomOutConfig);
        this.meadowZoomOut.scale(0.5);
        this.meadowZoomOut.setCoords();
        this.myCanvas.add(this.meadowZoomOut);

        this.forestZoomOut = await this.loadImage(zoomOut as any, this.config.forestZoomOutConfig);
        this.forestZoomOut.scale(0.5);
        this.forestZoomOut.setCoords();
        this.myCanvas.add(this.forestZoomOut);

        this.rainforestZoomOut = await this.loadImage(zoomOut as any, this.config.rainforestZoomOutConfig);
        this.rainforestZoomOut.scale(0.5);
        this.rainforestZoomOut.setCoords();
        this.myCanvas.add(this.rainforestZoomOut);

        this.zoomRect = new fabric.Rect(this.config.zoomRectConfig);
        this.zoomRect.visible = false;
        this.myCanvas.add(this.zoomRect);

        this.zoomInImage = await this.loadImage(zoomIn as any, this.config.zommInConfig);
        this.zoomInImage.scale(0.5);
        this.zoomInImage.visible = false;
        this.zoomInImage.setCoords();
        this.myCanvas.add(this.zoomInImage);

        this.rightButton = await this.loadImage(rightButton as any, this.config.rightButton);
        this.rightButton.scale(0.5);
        this.rightButton.visible = false;
        this.rightButton.setCoords();
        this.myCanvas.add(this.rightButton);

        this.text1 = new fabric.Text('沙漠', { left: 620, top: 398, fontSize: 18, fill: 'white', selectable: false});
        this.text1.visible = false;
        this.text1.setCoords();

        this.text2 = new fabric.Text('降水量 40mm / 年', { left: 620, top: 427, fontSize: 18, fill: 'white', selectable: false});
        this.text2.visible = false;
        this.text2.setCoords();

        this.text3 = new fabric.Text('年均温 11.2°C', { left: 620, top: 456, fontSize: 18, fill: 'white', selectable: false});
        this.text3.visible = false;
        this.text3.setCoords();

        this.myCanvas.add(this.text1);
        this.myCanvas.add(this.text2);
        this.myCanvas.add(this.text3);
        this.initEvent();
    }

    initEvent() {
        this.desertZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
                return;
            }
            this.isAniamtion = true;
            this.plantMode = 'desert';
            this.desertImage.visible = true;
            this.minDesertImage.visible = false;
            this.desertZoomOut.visible = false;
            const tween = {
                image: this.desertImage,
                scale: 0.104,
                top: this.desertImage.top,
                left: this.desertImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.meadowZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
                return;
            }
            this.isAniamtion = true;
            this.plantMode = 'meadow';
            this.meadowImage.visible = true;
            this.minMeadowImage.visible = false;
            this.meadowZoomOut.visible = false;
            const tween = {
                image: this.meadowImage,
                scale: 0.104,
                top: this.meadowImage.top,
                left: this.meadowImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.forestZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
                return;
            }
            this.isAniamtion = true;
            this.plantMode = 'forest';
            this.forestImage.visible = true;
            this.minForestImage.visible = false;
            this.forestZoomOut.visible = false;
            const tween = {
                image: this.forestImage,
                scale: 0.104,
                top: this.forestImage.top,
                left: this.forestImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.rainforestZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
                return;
            }
            this.isAniamtion = true;
            this.plantMode = 'rainforest';
            this.rainforestImage.visible = true;
            this.minRainforestImage.visible = false;
            this.rainforestZoomOut.visible = false;
            const tween = {
                image: this.rainforestImage,
                scale: 0.104,
                top: this.rainforestImage.top,
                left: this.rainforestImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.zoomInImage.on('mousedown', () => {
            this.isAniamtion = true;
            this.zoomInImage.visible = false;
            this.rightButton.visible = false;
            this.text1.visible = false;
            this.text2.visible = false;
            this.text3.visible = false;
            const tween = {
                image: this.forestImage,
                scale: 0.5,
                top: this.zoomRect.top,
                left: this.zoomRect.left,
            };
            const target = {
                top: this.zoomRect.top,
                left: this.zoomRect.left,
            };
            switch (this.plantMode) {
                case 'desert':
                    tween.image = this.desertImage;
                    target.left = this.minDesertImage.left;
                    target.top  = this.minDesertImage.top;
                    break;
                case 'meadow':
                    tween.image = this.meadowImage;
                    target.left = this.minMeadowImage.left;
                    target.top  = this.minMeadowImage.top;
                    break;
                case 'forest':
                    tween.image = this.forestImage;
                    target.left = this.minForestImage.left;
                    target.top  = this.minForestImage.top;
                    break;
                case 'rainforest':
                    tween.image = this.rainforestImage;
                    target.left = this.minRainforestImage.left;
                    target.top  = this.minRainforestImage.top;
                    break;
            }
            this.initZoomInAnimation(tween, target);
        });
    }

    //图片放大动画
    initZoomOutAnimation(tween: any) {
        const zoomOutAnimation = TweenMax.to(tween, 0.5 , {
            scale: 0.5,
            top: this.zoomRect.top,
            left: this.zoomRect.left,
            onUpdate: () => {
                tween.image.scale(tween.scale);
                tween.image.top = tween.top;
                tween.image.left = tween.left;
                tween.image.bringToFront();
                tween.image.setCoords();
                this.myCanvas.renderAll();
            },
            onComplete: () => {
                this.isAniamtion = false;
                this.isZoomIn = true;
                this.setZoomOutImageEnabled();
            },
            paused: true,
            ease:  Linear.easeOut, //线性动画
            repeat: 0 //执行次数 -1 等于infinite
        });
        zoomOutAnimation.play();
    }

    setZoomOutImageEnabled() {
        switch (this.plantMode) {
            case 'desert':
                this.text1.text = '沙漠';
                this.text2.text = '降水量 40mm / 年';
                this.text3.text = '年均温 11.2°C';
                break;
            case 'meadow':
                this.text1.text = '草地';
                this.text2.text = '降水量 510mm / 年';
                this.text3.text = '年均温 7°C';
                break;
            case 'forest':
                this.text1.text = '森林';
                this.text2.text = '降水量 820mm / 年';
                this.text3.text = '年均温 13.5°C';
                break;
            case 'rainforest':
                this.text1.text = '热带雨林';
                this.text2.text = '降水量 2410mm / 年';
                this.text3.text = '年均温 23.3°C';
                break;
        }
        this.zoomInImage.visible = true;
        this.rightButton.visible = true;
        this.text1.visible = true;
        this.text2.visible = true;
        this.text3.visible = true;
        this.text1.setCoords();
        this.text2.setCoords();
        this.text3.setCoords();
        this.zoomInImage.bringToFront();
        this.rightButton.bringToFront();
        this.text1.bringToFront();
        this.text2.bringToFront();
        this.text3.bringToFront();
        this.myCanvas.renderAll();
    }
    //图片缩小动画
    initZoomInAnimation(tween: any, target: any) {
        const zoomInAnimation = TweenMax.to(tween, 0.5 , {
            scale: 0.104,
            top: target.top,
            left: target.left,
            onUpdate: () => {
                tween.image.scale(tween.scale);
                tween.image.top = tween.top;
                tween.image.left = tween.left;
                tween.image.setCoords();
                this.myCanvas.renderAll();
            },
            onComplete: () => {
                this.isAniamtion = false;
                this.isZoomIn = false;
                tween.image.visible = false;
                switch (this.plantMode) {
                    case 'desert':
                      this.minDesertImage.visible = true;
                      this.desertZoomOut.visible = true;
                    break;
                case 'meadow':
                    this.minMeadowImage.visible = true;
                    this.meadowZoomOut.visible = true;
                    break;
                case 'forest':
                    this.minForestImage.visible = true;
                    this.forestZoomOut.visible = true;
                    break;
                case 'rainforest':
                    this.minRainforestImage.visible = true;
                    this.rainforestZoomOut.visible = true;
                    break;
                }
                this.myCanvas.renderAll();
            },
            paused: true,
            ease:  Linear.easeOut, //线性动画
            repeat: 0 //执行次数 -1 等于infinite
        });
        zoomInAnimation.play();
    }

    loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }

    reset() {
        //正在执行动画时，不准重置
        if (this.isAniamtion) {
            return;
        }
        this.isAniamtion = false;
        this.isZoomIn = false;
        this.zoomInImage.visible = false;
        this.rightButton.visible = false;
        this.text1.visible = false;
        this.text2.visible = false;
        this.text3.visible = false;
        //沙漠
        this.desertImage.left = this.config.minDesertConfig.left;
        this.desertImage.top = this.config.minDesertConfig.top;
        this.desertImage.scale(0.104);
        this.desertImage.visible = false;
        this.desertImage.setCoords();
        this.minDesertImage.visible = true;
        this.desertZoomOut.visible = true;
        //草地
        this.meadowImage.left = this.config.minMeadowConfig.left;
        this.meadowImage.top = this.config.minMeadowConfig.top;
        this.meadowImage.scale(0.104);
        this.meadowImage.visible = false;
        this.meadowImage.setCoords();
        this.minMeadowImage.visible = true;
        this.meadowZoomOut.visible = true;
        //森林
        this.forestImage.left = this.config.minForestConfig.left;
        this.forestImage.top = this.config.minForestConfig.top;
        this.forestImage.scale(0.104);
        this.forestImage.visible = false;
        this.forestImage.setCoords();
        this.minForestImage.visible = true;
        this.forestZoomOut.visible = true;
        //雨林
        this.rainforestImage.left = this.config.minRainforestConfig.left;
        this.rainforestImage.top = this.config.minRainforestConfig.top;
        this.rainforestImage.scale(0.104);
        this.rainforestImage.visible = false;
        this.rainforestImage.setCoords();
        this.minRainforestImage.visible = true;
        this.rainforestZoomOut.visible = true;

        this.myCanvas.renderAll();
    }
}
