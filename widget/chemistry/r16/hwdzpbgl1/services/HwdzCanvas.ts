

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import {HwdzConfig} from './HwdzConfig';
import {Layer} from 'konva';

import * as elementForm from '../sub_static/photo/elementForm.png';
import * as elementB from '../sub_static/photo/B@3x.png';
import * as elementAl from '../sub_static/photo/Al@3x.png';
import * as elementO from '../sub_static/photo/O@3x.png';
import * as elementSi from '../sub_static/photo/Si@3x.png';

import * as elementB2 from '../sub_static/photo/B2@3x.png';
import * as elementAl2 from '../sub_static/photo/Al2@3x.png';
import * as elementO2 from '../sub_static/photo/O2@3x.png';
import * as elementSi2 from '../sub_static/photo/Si2@3x.png';

import * as arrow from '../sub_static/photo/arrow.png';
import * as arrowTilt from '../sub_static/photo/arrowTilt.png';

import * as textImage from '../sub_static/photo/text.png';

export class HwdzCanvas extends SimpleKonvaTemplate {
    config: HwdzConfig;

    // 白底图片
    private whiteImage: any = [];

    // 填充底图片
    private redImage: any = [];

    private arrowImage: any = [];

    private bRect: Konva.Rect;
    private alRect: Konva.Rect;
    private oRect: Konva.Rect;
    private siRect: Konva.Rect;

    private text: Konva.Image;

    constructor() {
        super('3dModel');

        this.config = new HwdzConfig();

        this.initImage();
    }

    async initImage() {
        // 元素表
        const elementFormImage = await this.loadImage((elementForm as any), this.config.elementFormConfig as any);

        this.whiteImage[0] = await this.loadImage((elementB as any), this.config.whiteConfig as any);
        this.whiteImage[1] = await this.loadImage((elementAl as any), this.config.whiteConfig as any);
        this.whiteImage[2] = await this.loadImage((elementO as any), this.config.whiteConfig as any);
        this.whiteImage[3] = await this.loadImage((elementSi as any), this.config.whiteConfig as any);

        this.redImage[0] = await this.loadImage((elementB2 as any), this.config.redConfig as any);
        this.redImage[1] = await this.loadImage((elementAl2 as any), this.config.redConfig as any);
        this.redImage[2] = await this.loadImage((elementO2 as any), this.config.redConfig as any);
        this.redImage[3] = await this.loadImage((elementSi2 as any), this.config.redConfig as any);


        // 可点击区域
        this.bRect = new Konva.Rect(this.config.bRectConfig as any);
        this.alRect = new Konva.Rect(this.config.alRectConfig as any);
        this.oRect = new Konva.Rect(this.config.oRectConfig as any);
        this.siRect = new Konva.Rect(this.config.siRectConfig as any);

        // 箭头
        // 上普通箭头
        this.arrowImage[0] = await this.loadImage((arrow as any), this.config.arrow1Config as any);
        // 下普通箭头
        this.arrowImage[1] = await this.loadImage((arrow as any), this.config.arrow2Config as any);
        // 左上普通箭头
        this.arrowImage[2] = await this.loadImage((arrowTilt as any), this.config.arrowTilt1Config as any);
        // 左下普通箭头
        this.arrowImage[3] = await this.loadImage((arrowTilt as any), this.config.arrowTilt2Config as any);
        this.arrowImage[3].rotation(120);

        // 文字
        this.text = await this.loadImage((textImage as any), this.config.textImageConfig as any);



        this.staticLayer.add(elementFormImage);
        this.staticLayer.add(this.whiteImage[0]);
        this.staticLayer.add(this.whiteImage[1]);
        this.staticLayer.add(this.whiteImage[2]);
        this.staticLayer.add(this.whiteImage[3]);

        this.staticLayer.add(this.redImage[0]);
        this.staticLayer.add(this.redImage[1]);
        this.staticLayer.add(this.redImage[2]);
        this.staticLayer.add(this.redImage[3]);

        this.staticLayer.add(this.arrowImage[0]);
        this.staticLayer.add(this.arrowImage[1]);
        this.staticLayer.add(this.arrowImage[2]);
        this.staticLayer.add(this.arrowImage[3]);

        this.staticLayer.add(this.text);

        this.staticLayer.add(this.bRect);
        this.staticLayer.add(this.alRect);
        this.staticLayer.add(this.oRect);
        this.staticLayer.add(this.siRect);

        this.stage.add(this.staticLayer);

        this.pointClickEvent(this.bRect, this.redImage[0], this.redImage[1]);
        this.pointClickEvent(this.alRect, this.redImage[1], this.redImage[0]);

        this.pointClickEvent(this.oRect, this.redImage[2], this.redImage[3]);
        this.pointClickEvent(this.siRect, this.redImage[3], this.redImage[2]);
    }

    pointClickEvent(point: Konva.Rect, image: Konva.Image, image2: Konva.Image) {
        point.on('click tap', () => {
            if (!image.visible()) {
                image.visible(true);
                image2.visible(false);

                this.hideArrow();
                if (this.redImage[0].visible() && this.redImage[2].visible() ) {
                    // 普通箭头上显示
                    this.arrowImage[0].visible(true);
                }

                if (this.redImage[1].visible() && this.redImage[3].visible() ) {
                    // 普通箭头下显示
                    this.arrowImage[1].visible(true);
                }

                if (this.redImage[0].visible() && this.redImage[3].visible() ) {
                    // 倾斜箭头左上显示
                    this.arrowImage[2].visible(true);
                }

                if (this.redImage[1].visible() && this.redImage[2].visible() ) {
                    // 倾斜箭头左下显示
                    this.arrowImage[3].visible(true);
                }

                this.text.visible(false);
            }

            this.alRect.moveToTop();
            image.draw();
            image2.draw();
            point.moveToTop();
            this.staticLayer.draw();
        });

        point.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        point.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    hideArrow() {
        this.arrowImage[0].visible(false);
        this.arrowImage[1].visible(false);
        this.arrowImage[2].visible(false);
        this.arrowImage[3].visible(false);
    }

    showWhiteImageLeft() {
        // 显示未填充元素
        this.whiteImage[0].visible(true);
        this.whiteImage[1].visible(true);

        if (this.whiteImage[2].visible() === true) {
            // 显示可点击区域
            this.bRect.visible(true);
            this.alRect.visible(true);
            this.oRect.visible(true);
            this.siRect.visible(true);
            // 显示文字
            if (!this.redImage[0].visible() && !this.redImage[1].visible() && !this.redImage[2].visible() && !this.redImage[3].visible()) {
                this.text.visible(true);
            }

        }

        this.staticLayer.draw();
    }

    // 按钮2被点击
    showWhiteImageLeftRight() {
        // 显示未填充元素
        this.whiteImage[2].visible(true);
        this.whiteImage[3].visible(true);

        if (this.whiteImage[0].visible() === true) {
            // 显示可点击区域
            this.bRect.visible(true);
            this.alRect.visible(true);
            this.oRect.visible(true);
            this.siRect.visible(true);
            // 显示文字
            if (!this.redImage[0].visible() && !this.redImage[1].visible() && !this.redImage[2].visible() && !this.redImage[3].visible()) {
                this.text.visible(true);
            }
        }

        this.staticLayer.draw();
    }
}

