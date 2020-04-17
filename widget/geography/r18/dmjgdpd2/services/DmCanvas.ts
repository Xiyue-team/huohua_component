

import {SimpleKonvaTemplate2} from '../../../../../src/konva/template/SimpleKonvaTemplate2';
import * as Konva from 'konva';

import {DmConfig} from './DmConfig';
import {DmDragEvent} from './DmDragEvent';

import * as bigMap from '../sub_static/bigMap.png';
import * as leftOne from '../sub_static/leftOne.png';
import * as leftTwo from '../sub_static/leftTwo.png';
import * as leftThree from '../sub_static/leftThree.png';
import * as rightOne from '../sub_static/rightOne.png';
import * as rightTwo from '../sub_static/rightTwo.png';
import * as rightThree from '../sub_static/rightThree.png';
import * as line from '../sub_static/line.png';
import * as buttonImage from '../sub_static/buttonImage.png';

import * as video1 from '../sub_static/video/video1.mp4';
import * as video2 from '../sub_static/video/video2.mp4';
import * as video3 from '../sub_static/video/video3.mp4';
import * as video4 from '../sub_static/video/video4.mp4';
import * as video5 from '../sub_static/video/video5.mp4';
import * as video6 from '../sub_static/video/video6.mp4';
import * as labelPointBig from '../sub_static/labelPointBig.png';

export class DmCanvas extends SimpleKonvaTemplate2 {
    config: DmConfig;

    // 拖动事件
    dmDrag: DmDragEvent;

    // 可拖拽的风景图
    landscapeMap: any = [];

    lineImage: any = [];

    playButton: any = [];

    constructor() {
        super('box');

        this.config = new DmConfig();
        this.dmDrag = new DmDragEvent(this);

        this.initImage();
    }

    async initImage() {
        await this.initStaticImage();
        await this.initLine();
        await this.initLandscapeMap();
        await this.initPlayButton();
        await this.boundDragEvent();
    }

    // 加载静止图片
    async initStaticImage() {
        // 地图
        const bigMapImage = await this.loadImage((bigMap as any), this.config.bigMapConfig as any);
        this.staticLayer.add(bigMapImage);

        const labelPointImage1 = await this.loadImage((labelPointBig as any), this.config.labelPointBig1Config as any);
        this.staticLayer.add(labelPointImage1);

        const labelPointImage2 = labelPointImage1.clone(this.config.labelPointBig2Config as any);
        this.staticLayer.add(labelPointImage2);

        const labelPointImage3 = labelPointImage1.clone(this.config.labelPointBig3Config as any);
        this.staticLayer.add(labelPointImage3);

        const labelPointImage4 = labelPointImage1.clone(this.config.labelPointBig4Config as any);
        this.staticLayer.add(labelPointImage4);

        const labelPointImage5 = labelPointImage1.clone(this.config.labelPointBig5Config as any);
        this.staticLayer.add(labelPointImage5);

        const labelPointImage6 = labelPointImage1.clone(this.config.labelPointBig6Config as any);
        this.staticLayer.add(labelPointImage6);

        this.stage.add(this.staticLayer);
    }

    // 加载风景图
    async initLandscapeMap() {
        // 左1
        this.landscapeMap[0] = await this.loadImage((leftOne as any), this.config.leftOneConfig as any);
        this.staticLayer.add(this.landscapeMap[0]);

        // 左2
        this.landscapeMap[1] = await this.loadImage((leftTwo as any), this.config.leftTwoConfig as any);
        this.staticLayer.add(this.landscapeMap[1]);

        // 左3
        this.landscapeMap[2] = await this.loadImage((leftThree as any), this.config.leftThreeConfig as any);
        this.staticLayer.add(this.landscapeMap[2]);

        // 右1
        this.landscapeMap[3] = await this.loadImage((rightOne as any), this.config.rightOneConfig as any);
        this.staticLayer.add(this.landscapeMap[3]);

        // 右2
        this.landscapeMap[4] = await this.loadImage((rightTwo as any), this.config.rightTwoConfig as any);
        this.staticLayer.add(this.landscapeMap[4]);

        // 右3
        this.landscapeMap[5] = await this.loadImage((rightThree as any), this.config.rightThreeConfig as any);
        this.staticLayer.add(this.landscapeMap[5]);
        this.stage.add(this.staticLayer);
    }

    // 加载连接红色线
    async initLine() {
        this.lineImage[0] = await this.loadImage((line as any), this.config.line1Config as any);
        this.staticLayer.add(this.lineImage[0]);

        this.lineImage[1] = this.lineImage[0].clone(this.config.line2Config as any);
        this.staticLayer.add(this.lineImage[1]);

        this.lineImage[2] = this.lineImage[0].clone(this.config.line3Config as any);
        this.staticLayer.add(this.lineImage[2]);

        this.lineImage[3] = this.lineImage[0].clone(this.config.line4Config as any);
        this.staticLayer.add(this.lineImage[3]);

        this.lineImage[4] = this.lineImage[0].clone(this.config.line5Config as any);
        this.staticLayer.add(this.lineImage[4]);

        this.lineImage[5] = this.lineImage[0].clone(this.config.line6Config as any);
        this.staticLayer.add(this.lineImage[5]);

        this.stage.add(this.staticLayer);
    }

    // 加载播放按钮
    async initPlayButton() {
      this.playButton[0] = await this.loadImage((buttonImage as any), this.config.button1Config as any);
      this.staticLayer.add(this.playButton[0]);

      this.playButton[1] = this.playButton[0].clone(this.config.button2Config as any);
      this.staticLayer.add(this.playButton[1]);

      this.playButton[2] = this.playButton[0].clone(this.config.button3Config as any);
      this.staticLayer.add(this.playButton[2]);

      this.playButton[3] = this.playButton[0].clone(this.config.button4Config as any);
      this.staticLayer.add(this.playButton[3]);

      this.playButton[4] = this.playButton[0].clone(this.config.button5Config as any);
      this.staticLayer.add(this.playButton[4]);

      this.playButton[5] = this.playButton[0].clone(this.config.button6Config as any);
      this.staticLayer.add(this.playButton[5]);

      this.stage.add(this.staticLayer);
    }


    // 给风景图绑定事件
    boundDragEvent() {
        this.dmDrag.imageClick(this.landscapeMap[0], this.playButton[0], video1, 1);
        this.dmDrag.imageClick(this.landscapeMap[3], this.playButton[1], video2, 2);
        this.dmDrag.imageClick(this.landscapeMap[1], this.playButton[2], video3, 3);
        this.dmDrag.imageClick(this.landscapeMap[4], this.playButton[3], video4, 4);
        this.dmDrag.imageClick(this.landscapeMap[2], this.playButton[4], video5, 5);
        this.dmDrag.imageClick(this.landscapeMap[5], this.playButton[5], video6, 6);
    }

    // 重置
    async reset() {

    }

    // 重置分子式的位置
    resetImage(image: Konva.Image, config: any) {
        image.x(config.x);
        image.y(config.y);
        image.draggable(true);
    }

}

