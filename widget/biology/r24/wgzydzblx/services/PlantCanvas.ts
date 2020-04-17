import {fabric} from 'fabric';

import * as background from '../sub_static/background.png';
import * as desert from '../sub_static/desertPlant.png';
import * as meadow from '../sub_static/meadowPlant.png';
import * as rainforest from '../sub_static/rainforestPlant.png';
import * as coniferous from '../sub_static/coniferousPlant.png';
import * as defoliation from '../sub_static/defoliationPlant.png';
import * as evergreen from '../sub_static/evergreenPlant.png';

import * as minDesert from '../sub_static/minDesertPlant.png';
import * as minMeadow from '../sub_static/minMeadowPlant.png';
import * as minRainforest from '../sub_static/minRainforestPlant.png';
import * as minConiferous from '../sub_static/minConiferousPlant.png';
import * as minDefoliation from '../sub_static/minDefoliationPlant.png';
import * as minEvergreen from '../sub_static/minEvergreenPlant.png';

import * as bottomButton from '../sub_static/bottomButton.png';
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
    rainforestImage: fabric.Image;
    coniferousImage: fabric.Image;
    defoliationImage: fabric.Image;
    evergreenImage: fabric.Image;
    //缩小图
    minDesertImage: fabric.Image;
    minMeadowImage: fabric.Image;
    minRainforestImage: fabric.Image;
    minConiferousImage: fabric.Image;
    minDefoliationImage: fabric.Image;
    minEvergreenImage: fabric.Image;
    //图片放大按钮
    desertZoomOut: fabric.Image;
    meadowZoomOut: fabric.Image;
    rainforestZoomOut: fabric.Image;
    coniferousZoomOut: fabric.Image;
    defoliationZoomOut: fabric.Image;
    evergreenZoomOut: fabric.Image;
    //放大图片的提示文字
    text1: fabric.Text;
    text2: fabric.Text;
    text3: fabric.Text;

    bottomButton: fabric.Image;
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
        //荒漠
        this.desertImage = await this.loadImage(desert as any, this.config.minDesertConfig);
        this.desertImage.scale(0.104);
        this.desertImage.setCoords();
        this.desertImage.visible = false;
        this.myCanvas.add(this.desertImage);

        this.minDesertImage = await this.loadImage(minDesert as any, this.config.minDesertConfig);
        this.minDesertImage.scale(0.5);
        this.minDesertImage.setCoords();
        this.myCanvas.add(this.minDesertImage);

        this.desertZoomOut = await this.loadImage(zoomOut as any, this.config.desertZoomOutConfig);
        this.desertZoomOut.scale(0.5);
        this.desertZoomOut.setCoords();
        this.myCanvas.add(this.desertZoomOut);
        //草原
        this.meadowImage = await this.loadImage(meadow as any, this.config.minMeadowConfig);
        this.meadowImage.scale(0.104);
        this.meadowImage.setCoords();
        this.meadowImage.visible = false;
        this.myCanvas.add(this.meadowImage);

        this.minMeadowImage = await this.loadImage(minMeadow as any, this.config.minMeadowConfig);
        this.minMeadowImage.scale(0.5);
        this.minMeadowImage.setCoords();
        this.myCanvas.add(this.minMeadowImage);

        this.meadowZoomOut = await this.loadImage(zoomOut as any, this.config.meadowZoomOutConfig);
        this.meadowZoomOut.scale(0.5);
        this.meadowZoomOut.setCoords();
        this.myCanvas.add(this.meadowZoomOut);

        //针叶
        this.coniferousImage = await this.loadImage(coniferous as any, this.config.minConiferousConfig);
        this.coniferousImage.scale(0.104);
        this.coniferousImage.setCoords();
        this.coniferousImage.visible = false;
        this.myCanvas.add(this.coniferousImage);

        this.minConiferousImage = await this.loadImage(minConiferous as any, this.config.minConiferousConfig);
        this.minConiferousImage.scale(0.5);
        this.minConiferousImage.setCoords();
        this.myCanvas.add(this.minConiferousImage);

        this.coniferousZoomOut = await this.loadImage(zoomOut as any, this.config.coniferousZoomOutConfig);
        this.coniferousZoomOut.scale(0.5);
        this.coniferousZoomOut.setCoords();
        this.myCanvas.add(this.coniferousZoomOut);

        //落叶
        this.defoliationImage = await this.loadImage(defoliation as any, this.config.minDefoliationConfig);
        this.defoliationImage.scale(0.104);
        this.defoliationImage.setCoords();
        this.defoliationImage.visible = false;
        this.myCanvas.add(this.defoliationImage);

        this.minDefoliationImage = await this.loadImage(minDefoliation as any, this.config.minDefoliationConfig);
        this.minDefoliationImage.scale(0.5);
        this.minDefoliationImage.setCoords();
        this.myCanvas.add(this.minDefoliationImage);

        this.defoliationZoomOut = await this.loadImage(zoomOut as any, this.config.defoliationZoomOutConfig);
        this.defoliationZoomOut.scale(0.5);
        this.defoliationZoomOut.setCoords();
        this.myCanvas.add(this.defoliationZoomOut);

        //常绿
        this.evergreenImage = await this.loadImage(evergreen as any, this.config.minEvergreenConfig);
        this.evergreenImage.scale(0.104);
        this.evergreenImage.setCoords();
        this.evergreenImage.visible = false;
        this.myCanvas.add(this.evergreenImage);

        this.minEvergreenImage = await this.loadImage(minEvergreen as any, this.config.minEvergreenConfig);
        this.minEvergreenImage.scale(0.5);
        this.minEvergreenImage.setCoords();
        this.myCanvas.add(this.minEvergreenImage);

        this.evergreenZoomOut = await this.loadImage(zoomOut as any, this.config.evergreenZoomOutConfig);
        this.evergreenZoomOut.scale(0.5);
        this.evergreenZoomOut.setCoords();
        this.myCanvas.add(this.evergreenZoomOut);

        //雨林
        this.rainforestImage = await this.loadImage(rainforest as any, this.config.minRainforestConfig);
        this.rainforestImage.scale(0.104);
        this.rainforestImage.setCoords();
        this.rainforestImage.visible = false;
        this.myCanvas.add(this.rainforestImage);

        this.minRainforestImage = await this.loadImage(minRainforest as any, this.config.minRainforestConfig);
        this.minRainforestImage.scale(0.5);
        this.minRainforestImage.setCoords();
        this.myCanvas.add(this.minRainforestImage);

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

        this.bottomButton = await this.loadImage(bottomButton as any, this.config.bottomButton);
        this.bottomButton.scale(0.5);
        this.bottomButton.visible = false;
        this.bottomButton.setCoords();
        this.myCanvas.add(this.bottomButton);

        this.text1 = new fabric.Text(this.config.desetText1, this.config.text1);
        this.text1.visible = false;
        this.text1.setCoords();

        this.text2 = new fabric.Text(this.config.desetText2, this.config.text2);
        this.text2.visible = false;
        this.text2.setCoords();

        this.text3 = new fabric.Text(this.config.desetText3, this.config.text3);
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

        this.coniferousZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
              return;
            }
            this.isAniamtion = true;
            this.plantMode = 'coniferous';
            this.coniferousImage.visible = true;
            this.minConiferousImage.visible = false;
            this.coniferousZoomOut.visible = false;
            const tween = {
                image: this.coniferousImage,
                scale: 0.104,
                top: this.coniferousImage.top,
                left: this.coniferousImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.defoliationZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
              return;
            }
            this.isAniamtion = true;
            this.plantMode = 'defoliation';
            this.defoliationImage.visible = true;
            this.minDefoliationImage.visible = false;
            this.defoliationZoomOut.visible = false;
            const tween = {
                image: this.defoliationImage,
                scale: 0.104,
                top: this.defoliationImage.top,
                left: this.defoliationImage.left,
            };
            this.initZoomOutAnimation(tween);
        });

        this.evergreenZoomOut.on('mousedown', () => {
            if (this.isAniamtion || this.isZoomIn) {
              return;
            }
            this.isAniamtion = true;
            this.plantMode = 'evergreen';
            this.evergreenImage.visible = true;
            this.minEvergreenImage.visible = false;
            this.evergreenZoomOut.visible = false;
            const tween = {
                image: this.evergreenImage,
                scale: 0.104,
                top: this.evergreenImage.top,
                left: this.evergreenImage.left,
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
            this.bottomButton.visible = false;
            this.text1.visible = false;
            this.text2.visible = false;
            this.text3.visible = false;
            const tween = {
                image: this.desertImage,
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
                case 'coniferous':
                    tween.image = this.coniferousImage;
                    target.left = this.minConiferousImage.left;
                    target.top  = this.minConiferousImage.top;
                    break;
                case 'defoliation':
                    tween.image = this.defoliationImage;
                    target.left = this.minDefoliationImage.left;
                    target.top  = this.minDefoliationImage.top;
                    break;
                case 'evergreen':
                    tween.image = this.evergreenImage;
                    target.left = this.minEvergreenImage.left;
                    target.top  = this.minEvergreenImage.top;
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
                this.text1.text = this.config.desetText1;
                this.text2.text = this.config.desetText2;
                this.text3.text = this.config.desetText3;
                break;
            case 'meadow':
                this.text1.text = this.config.meadowText1;
                this.text2.text = this.config.meadowText2;
                this.text3.text = ' ';
                break;
            case 'coniferous':
                this.text1.text = this.config.coniferousText1;
                this.text2.text = this.config.coniferousText2;
                this.text3.text = ' ';
                break;
            case 'defoliation':
                this.text1.text = this.config.defoliationText1;
                this.text2.text = this.config.defoliationText2;
                this.text3.text = this.config.defoliationText3;
                break;
            case 'evergreen':
                this.text1.text = this.config.evergreenText1;
                this.text2.text = this.config.evergreenText2;
                this.text3.text = ' ';
                break;
            case 'rainforest':
                this.text1.text = this.config.rainforestText1;
                this.text2.text = this.config.rainforestText2;
                this.text3.text = ' ';
                break;
        }
        this.zoomInImage.visible = true;
        this.bottomButton.visible = true;
        this.text1.visible = true;
        this.text2.visible = true;
        this.text3.visible = true;
        this.text1.setCoords();
        this.text2.setCoords();
        this.text3.setCoords();
        this.zoomInImage.bringToFront();
        this.bottomButton.bringToFront();
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
                    case 'coniferous':
                        this.minConiferousImage.visible = true;
                        this.coniferousZoomOut.visible = true;
                        break;
                    case 'defoliation':
                        this.minDefoliationImage.visible = true;
                        this.defoliationZoomOut.visible = true;
                        break;
                    case 'evergreen':
                        this.minEvergreenImage.visible = true;
                        this.evergreenZoomOut.visible = true;
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
        this.bottomButton.visible = false;
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
        //针叶
        this.coniferousImage.left = this.config.minConiferousConfig.left;
        this.coniferousImage.top = this.config.minConiferousConfig.top;
        this.coniferousImage.scale(0.104);
        this.coniferousImage.visible = false;
        this.coniferousImage.setCoords();
        this.minConiferousImage.visible = true;
        this.coniferousZoomOut.visible = true;
        //落叶
        this.defoliationImage.left = this.config.minDefoliationConfig.left;
        this.defoliationImage.top = this.config.minDefoliationConfig.top;
        this.defoliationImage.scale(0.104);
        this.defoliationImage.visible = false;
        this.defoliationImage.setCoords();
        this.minDefoliationImage.visible = true;
        this.defoliationZoomOut.visible = true;
        //常绿
        this.evergreenImage.left = this.config.minEvergreenConfig.left;
        this.evergreenImage.top = this.config.minEvergreenConfig.top;
        this.evergreenImage.scale(0.104);
        this.evergreenImage.visible = false;
        this.evergreenImage.setCoords();
        this.minEvergreenImage.visible = true;
        this.evergreenZoomOut.visible = true;
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
