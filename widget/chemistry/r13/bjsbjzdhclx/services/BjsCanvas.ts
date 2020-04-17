

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';

import {BjsConfig} from './BjsConfig';
import {BjsDragEvent} from './BjsDragEvent';

import * as text1 from '../sub_static/text1.png';
import * as text2 from '../sub_static/text2.png';
import * as coochh1 from '../sub_static/coochh1.png';
import * as blueDottedArrow1 from '../sub_static/blueDottedArrow1.png';
import * as blueDottedArrow2 from '../sub_static/blueDottedArrow2.png';
import * as blueDottedArrow3 from '../sub_static/blueDottedArrow3.png';
import * as blueDottedArrow4 from '../sub_static/blueDottedArrow4.png';
import * as blueDottedArrow5 from '../sub_static/blueDottedArrow5.png';
import * as blueDottedArrow6 from '../sub_static/blueDottedArrow6.png';
import * as blueDottedArrow7 from '../sub_static/blueDottedArrow7.png';
import * as blueDottedArrow9 from '../sub_static/blueDottedArrow9.png';
import * as blueDottedArrow11 from '../sub_static/blueDottedArrow11.png';
import * as blueDottedArrow12 from '../sub_static/blueDottedArrow12.png';
import * as blueDottedArrow14 from '../sub_static/blueDottedArrow14.png';

import * as blueDottedLineFrame from '../sub_static/blueDottedLineFrame.png';

import * as ch2oh from '../sub_static/[CH2OH]@2x.png';
import * as cho from '../sub_static/[CHO]@2x.png';
import * as chcl2 from '../sub_static/[CHCL2]@2x.png';
import * as ch2cl from '../sub_static/[CH2CL]@2x.png';
import * as ch3 from '../sub_static/[CH3]@2x.png';
import * as cooh from '../sub_static/[COOH]@2x.png';

import * as blueSolidArrow1 from '../sub_static/blueSolidArrow1.png';
import * as blueSolidArrow2 from '../sub_static/blueSolidArrow2.png';
import * as blueSolidArrow3 from '../sub_static/blueSolidArrow3.png';
import * as blueSolidArrow4 from '../sub_static/blueSolidArrow4.png';
import * as blueSolidArrow5 from '../sub_static/blueSolidArrow5.png';
import * as blueSolidArrow6 from '../sub_static/blueSolidArrow6.png';
import * as blueSolidArrow7 from '../sub_static/blueSolidArrow7.png';
import * as blueSolidArrow11 from '../sub_static/blueSolidArrow11.png';
import * as blueSolidArrow12 from '../sub_static/blueSolidArrow12.png';
import * as blueSolidArrow13 from '../sub_static/blueSolidArrow13.png';
import * as blueSolidArrow14 from '../sub_static/blueSolidArrow14.png';

import * as yellowSolidArrow1 from '../sub_static/yellowSolidArrow1.png';
import * as yellowSolidArrow2 from '../sub_static/yellowSolidArrow2.png';
import * as yellowSolidArrow3 from '../sub_static/yellowSolidArrow3.png';
import * as yellowSolidArrow4 from '../sub_static/yellowSolidArrow4.png';
import * as yellowSolidArrow5 from '../sub_static/yellowSolidArrow5.png';
import * as yellowSolidArrow6 from '../sub_static/yellowSolidArrow6.png';
import * as yellowSolidArrow7 from '../sub_static/yellowSolidArrow7.png';
import * as yellowSolidArrow8 from '../sub_static/yellowSolidArrow8.png';

import * as yellowFrame1 from '../sub_static/yellowFrame1.png';
import * as yellowFrame2 from '../sub_static/yellowFrame2.png';

import * as whiteCircle from '../sub_static/whiteCircle.png';
import * as yellowCircle from '../sub_static/yellowCircle.png';

import * as formula1 from '../sub_static/formula1.png';
import * as formula2 from '../sub_static/formula2.png';
import * as formula3 from '../sub_static/formula3.png';
import * as formula4 from '../sub_static/formula4.png';
import * as formula5 from '../sub_static/formula5.png';
import * as formula6 from '../sub_static/formula6.png';
import * as formula7 from '../sub_static/formula7.png';
import * as formula8 from '../sub_static/formula8.png';
import * as formula9 from '../sub_static/formula9.png';
import * as formula10 from '../sub_static/formula10.png';
import * as formula11 from '../sub_static/formula11.png';
import * as formula12 from '../sub_static/formula12.png';
import * as formula13 from '../sub_static/formula13.png';

import * as routeImage1 from '../sub_static/routeImage1.png';
import * as routeImage2 from '../sub_static/routeImage2.png';

import * as button1 from '../sub_static/button1.png';
import * as button2 from '../sub_static/button2.png';

import * as whiteFrame from '../sub_static/whiteFrame.png';

import {Layer} from 'konva';

export class BjsCanvas extends SimpleKonvaTemplate {
    config: BjsConfig;

    // 目标有机化合物分子 文字图片
    textImage1: Konva.Image;

    // 竖起来的分子式COOCH2
    coochh1Image: Konva.Image;

    // 蓝色虚线箭头1
    blueDottedArrow1: Konva.Image;

    // 蓝色虚线箭头2
    blueDottedArrow2: Konva.Image;

    // 蓝色虚线箭头3
    blueDottedArrow3: Konva.Image;

    // 蓝色虚线箭头4
    blueDottedArrow4: Konva.Image;

    // 蓝色虚线箭头5
    blueDottedArrow5: Konva.Image;

    // 蓝色虚线箭头6
    blueDottedArrow6: Konva.Image;

    // 蓝色虚线箭头7 8 10
    blueDottedArrow7: any = [];

    // 蓝色虚线箭头9
    blueDottedArrow9: Konva.Image;

    // 蓝色虚线箭头11
    blueDottedArrow11: Konva.Image;

    // 蓝色虚线箭头12
    blueDottedArrow12: Konva.Image;

    // 蓝色虚线箭头14
    blueDottedArrow14: Konva.Image;

    // 原料分子 文字图片
    textImage2: Konva.Image;

    // 蓝色虚线框框
    blueDottedLineFrame: any = [];

    // ch2oh 图片
    ch2oh: Konva.Image;

    // cho
    cho: Konva.Image;

    chcl2: Konva.Image;

    ch2cl: Konva.Image;

    cooh: Konva.Image;

    ch3: Konva.Image;

    // 白底框
    whiteFrame: any = [];

    // 蓝色实线箭头
    blueSolidArrow: any = [];

    // 黄色实线箭头
    yellowSolidArrow: any = [];

    // 黄色框
    yellowFrame: any = [];

    // 白色小圆
    whiteCircle: any = [];

    // 黄色小圆
    yellowCircle: any = [];

    // 公式
    formulaImage: any = [];

    // 优选路线图
    routeImage: any = [];

    // 拖动事件
    bjsDrag: BjsDragEvent;

    // 定义一个层用于放优选合成路线图
    routeLayer: Konva.Layer;

    // 定义一个层用于储存按钮
    buttonLayer: Konva.Layer;

    // 显示合成路线图按钮
    buttonImage: any = [];

    // 定义一个矩形
    rect: Konva.Rect;

    constructor() {
        super('box');

        this.config = new BjsConfig();
        this.bjsDrag = new BjsDragEvent(this);



        this.initImage();
        this.initBlueSolidArrow();
        this.initYellowSolidArrow();
        this.initYellowFrame();
        this.initWhiteCircle();
        this.initFormula();
        this.initYellowCircle();
        this.initRouteImage();
        this.initButtonImage();
        this.addRect();
    }

    async initImage() {
        // 目标有机化合物分子 文字图片
        this.textImage1 = await this.loadImage((text1 as any), this.config.Text1Config as any);
        this.staticLayer.add(this.textImage1);

        // 竖起来的分子式COOCH2
        this.coochh1Image = await this.loadImage((coochh1 as any), this.config.coochh1Config as any);
        this.staticLayer.add(this.coochh1Image);

        // 蓝色虚线箭头1
        this.blueDottedArrow1 = await this.loadImage((blueDottedArrow1 as any), this.config.blueDottedArrow1Config as any);
        this.staticLayer.add(this.blueDottedArrow1);

        // 蓝色虚线箭头2
        this.blueDottedArrow2 = await this.loadImage((blueDottedArrow2 as any), this.config.blueDottedArrow2Config as any);
        this.staticLayer.add(this.blueDottedArrow2);

        // 蓝色虚线箭头3
        this.blueDottedArrow3 = await this.loadImage((blueDottedArrow3 as any), this.config.blueDottedArrow3Config as any);
        this.staticLayer.add(this.blueDottedArrow3);

        // 蓝色虚线箭头4
        this.blueDottedArrow4 = await this.loadImage((blueDottedArrow4 as any), this.config.blueDottedArrow4Config as any);
        this.staticLayer.add(this.blueDottedArrow4);

        // 蓝色虚线箭头5
        this.blueDottedArrow5 = await this.loadImage((blueDottedArrow5 as any), this.config.blueDottedArrow5Config as any);
        this.staticLayer.add(this.blueDottedArrow5);

        // 蓝色虚线箭头6
        this.blueDottedArrow6 = await this.loadImage((blueDottedArrow6 as any), this.config.blueDottedArrow6Config as any);
        this.staticLayer.add(this.blueDottedArrow6);

        // 蓝色虚线箭头7
        this.blueDottedArrow7[0] = await this.loadImage((blueDottedArrow7 as any), this.config.blueDottedArrow7Config as any);
        this.staticLayer.add(this.blueDottedArrow7[0]);
        this.blueDottedArrow7[0].cache();

        // 蓝色虚线箭头8
        this.blueDottedArrow7[1] = this.blueDottedArrow7[0].clone(this.config.blueDottedArrow8Config as any);
        this.staticLayer.add(this.blueDottedArrow7[1]);

        // 蓝色虚线箭头10
        this.blueDottedArrow7[2] = this.blueDottedArrow7[0].clone(this.config.blueDottedArrow10Config as any);
        this.staticLayer.add(this.blueDottedArrow7[2]);

        // 蓝色虚线箭头13
        this.blueDottedArrow7[3] = this.blueDottedArrow7[0].clone(this.config.blueDottedArrow13Config as any);
        this.staticLayer.add(this.blueDottedArrow7[3]);

        // 蓝色虚线箭头9
        this.blueDottedArrow9 = await this.loadImage((blueDottedArrow9 as any), this.config.blueDottedArrow9Config as any);
        this.staticLayer.add(this.blueDottedArrow9);

        // 蓝色虚线箭头11
        this.blueDottedArrow11 = await this.loadImage((blueDottedArrow11 as any), this.config.blueDottedArrow11Config as any);
        this.staticLayer.add(this.blueDottedArrow11);

        // 蓝色虚线箭头12
        this.blueDottedArrow12 = await this.loadImage((blueDottedArrow12 as any), this.config.blueDottedArrow12Config as any);
        this.staticLayer.add(this.blueDottedArrow12);

        // 蓝色虚线箭头12
        this.blueDottedArrow14 = await this.loadImage((blueDottedArrow14 as any), this.config.blueDottedArrow14Config as any);
        this.staticLayer.add(this.blueDottedArrow14);

        // 蓝色虚线框框1
        this.blueDottedLineFrame[0] = await this.loadImage((blueDottedLineFrame as any), this.config.blueDottedLineFrame0Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[0]);
        this.blueDottedLineFrame[0].cache();

        // 蓝色虚线框框2
        this.blueDottedLineFrame[1] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame1Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[1]);

        // 蓝色虚线框框3
        this.blueDottedLineFrame[2] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame2Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[2]);

        // 蓝色虚线框框4
        this.blueDottedLineFrame[3] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame3Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[3]);

        // 蓝色虚线框框5
        this.blueDottedLineFrame[4] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame4Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[4]);

        // 蓝色虚线框框6
        this.blueDottedLineFrame[5] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame5Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[5]);

        // 蓝色虚线框7
        this.blueDottedLineFrame[6] = this.blueDottedLineFrame[0].clone(this.config.blueDottedLineFrame6Config as any);
        this.staticLayer.add(this.blueDottedLineFrame[6]);


        // 原料分子 文字图片
        this.textImage2 = await this.loadImage((text2 as any), this.config.Text2Config as any);
        this.staticLayer.add(this.textImage2);

        // 白底框
        this.whiteFrame[0] = await this.loadImage((whiteFrame as any), this.config.ch2ohConfig as any);
        this.whiteFrame[0].draggable(false);
        this.staticLayer.add(this.whiteFrame[0]);
        this.whiteFrame[0].cache();

        this.whiteFrame[1] = this.whiteFrame[0].clone(this.config.choConfig as any);
        this.whiteFrame[1].draggable(false);
        this.staticLayer.add(this.whiteFrame[1]);

        this.whiteFrame[2] = this.whiteFrame[0].clone(this.config.chcl2Config as any);
        this.whiteFrame[2].draggable(false);
        this.staticLayer.add(this.whiteFrame[2]);

        this.whiteFrame[3] = this.whiteFrame[0].clone(this.config.ch2clConfig as any);
        this.whiteFrame[3].draggable(false);
        this.staticLayer.add(this.whiteFrame[3]);

        this.whiteFrame[4] = this.whiteFrame[0].clone(this.config.coohConfig as any);
        this.whiteFrame[4].draggable(false);
        this.staticLayer.add(this.whiteFrame[4]);

        this.whiteFrame[5] = this.whiteFrame[0].clone(this.config.ch3Config as any);
        this.whiteFrame[5].draggable(false);
        this.staticLayer.add(this.whiteFrame[5]);

        // ch2oh 图片
        this.ch2oh = await this.loadImage((ch2oh as any), this.config.ch2ohConfig as any);
        this.staticLayer.add(this.ch2oh);

        this.cho = await this.loadImage((cho as any), this.config.choConfig as any);
        this.staticLayer.add(this.cho);

        this.chcl2 = await this.loadImage((chcl2 as any), this.config.chcl2Config as any);
        this.staticLayer.add(this.chcl2);

        this.ch2cl = await this.loadImage((ch2cl as any), this.config.ch2clConfig as any);
        this.staticLayer.add(this.ch2cl);

        this.cooh = await this.loadImage((cooh as any), this.config.coohConfig as any);
        this.staticLayer.add(this.cooh);

        this.ch3 = await this.loadImage((ch3 as any), this.config.ch3Config as any);
        this.staticLayer.add(this.ch3);

        this.stage.add(this.staticLayer);
        this.boundDragEvent();
    }

    async initBlueSolidArrow() {
        // 蓝色实线箭头1
        this.blueSolidArrow[0] = await this.loadImage((blueSolidArrow1 as any), this.config.blueDottedArrow1Config as any);
        this.blueSolidArrow[0].visible(false);
        this.staticLayer.add(this.blueSolidArrow[0]);

        // 蓝色实线箭头2
        this.blueSolidArrow[1] = await this.loadImage((blueSolidArrow2 as any), this.config.blueDottedArrow2Config as any);
        this.blueSolidArrow[1].visible(false);
        this.staticLayer.add(this.blueSolidArrow[1]);

        // 蓝色实线箭头3
        this.blueSolidArrow[2] = await this.loadImage((blueSolidArrow3 as any), this.config.blueDottedArrow3Config as any);
        this.blueSolidArrow[2].visible(false);
        this.staticLayer.add(this.blueSolidArrow[2]);

        // 蓝色实线箭头4
        this.blueSolidArrow[3] = await this.loadImage((blueSolidArrow4 as any), this.config.blueDottedArrow4Config as any);
        this.staticLayer.add(this.blueSolidArrow[3]);

        // 蓝色实线箭头5
        this.blueSolidArrow[4] = await this.loadImage((blueSolidArrow5 as any), this.config.blueDottedArrow5Config as any);
        this.staticLayer.add(this.blueSolidArrow[4]);

        // 蓝色实线箭头6
        this.blueSolidArrow[5] = await this.loadImage((blueSolidArrow6 as any), this.config.blueDottedArrow6Config as any);
        this.staticLayer.add(this.blueSolidArrow[5]);

        // 蓝色实线箭头7
        this.blueSolidArrow[6] = await this.loadImage((blueSolidArrow7 as any), this.config.blueDottedArrow13Config as any);
        this.staticLayer.add(this.blueSolidArrow[6]);
        this.blueSolidArrow[6].cache();

        // 蓝色实线箭头8
        this.blueSolidArrow[7] = this.blueSolidArrow[6].clone(this.config.blueDottedArrow7Config as any);
        this.staticLayer.add(this.blueSolidArrow[7]);

        // 蓝色实线箭头9
        this.blueSolidArrow[8] = this.blueSolidArrow[6].clone(this.config.blueDottedArrow8Config as any);
        this.staticLayer.add(this.blueSolidArrow[8]);

        // 蓝色实线箭头10
        this.blueSolidArrow[9] = this.blueSolidArrow[6].clone(this.config.blueDottedArrow10Config as any);
        this.staticLayer.add(this.blueSolidArrow[9]);

        // 蓝色实线箭头11
        this.blueSolidArrow[10] = await this.loadImage((blueSolidArrow11 as any), this.config.blueDottedArrow9Config as any);
        this.staticLayer.add(this.blueSolidArrow[10]);

        // 蓝色实线箭头12
        this.blueSolidArrow[11] = await this.loadImage((blueSolidArrow12 as any), this.config.blueDottedArrow14Config as any);
        this.staticLayer.add(this.blueSolidArrow[11]);

        // 蓝色实线箭头13
        this.blueSolidArrow[12] = await this.loadImage((blueSolidArrow13 as any), this.config.blueDottedArrow11Config as any);
        this.staticLayer.add(this.blueSolidArrow[12]);

        // 蓝色实线箭头14
        this.blueSolidArrow[13] = await this.loadImage((blueSolidArrow14 as any), this.config.blueDottedArrow12Config as any);
        this.staticLayer.add(this.blueSolidArrow[13]);


        this.stage.add(this.staticLayer);
    }

    async initYellowSolidArrow() {
        // 黄色实线箭头1
        this.yellowSolidArrow[0] = await this.loadImage((yellowSolidArrow1 as any), this.config.blueDottedArrow1Config as any);
        this.yellowSolidArrow[0].visible(false);
        this.staticLayer.add(this.yellowSolidArrow[0]);

        // 黄色实线箭头2
        this.yellowSolidArrow[1] = await this.loadImage((yellowSolidArrow2 as any), this.config.blueDottedArrow2Config as any);
        this.yellowSolidArrow[1].visible(false);
        this.staticLayer.add(this.yellowSolidArrow[1]);

        // 黄色实线箭头3
        this.yellowSolidArrow[2] = await this.loadImage((yellowSolidArrow3 as any), this.config.blueDottedArrow3Config as any);
        this.yellowSolidArrow[2].visible(false);
        this.staticLayer.add(this.yellowSolidArrow[2]);

        // 黄色实线箭头4
        this.yellowSolidArrow[3] = await this.loadImage((yellowSolidArrow4 as any), this.config.blueDottedArrow10Config as any);
        this.staticLayer.add(this.yellowSolidArrow[3]);
        this.yellowSolidArrow[3].cache();

        // 黄色实线箭头5
        this.yellowSolidArrow[4] = await this.loadImage((yellowSolidArrow5 as any), this.config.blueDottedArrow9Config as any);
        this.staticLayer.add(this.yellowSolidArrow[4]);

        // 黄色实线箭头6
        this.yellowSolidArrow[5] = await this.loadImage((yellowSolidArrow6 as any), this.config.blueDottedArrow11Config as any);
        this.staticLayer.add(this.yellowSolidArrow[5]);

        // 黄色实线箭头7
        this.yellowSolidArrow[6] = await this.loadImage((yellowSolidArrow7 as any), this.config.blueDottedArrow12Config as any);
        this.staticLayer.add(this.yellowSolidArrow[6]);

        // 黄色实线箭头8
        this.yellowSolidArrow[7] = await this.loadImage((yellowSolidArrow8 as any), this.config.blueDottedArrow14Config as any);
        this.staticLayer.add(this.yellowSolidArrow[7]);

        // 黄色实线箭头9
        this.yellowSolidArrow[8] = this.yellowSolidArrow[3].clone(this.config.blueDottedArrow13Config as any);
        this.staticLayer.add(this.yellowSolidArrow[8]);

        this.stage.add(this.staticLayer);
    }

    async initYellowFrame() {
        this.yellowFrame[0] = await this.loadImage((yellowFrame1 as any), this.config.coochh1Config as any);
        this.yellowFrame[0].visible(false);
        this.staticLayer.add(this.yellowFrame[0]);

        this.yellowFrame[1] = await this.loadImage((yellowFrame2 as any), this.config.blueDottedLineFrame0Config as any);
        this.yellowFrame[1].visible(false);
        this.staticLayer.add(this.yellowFrame[1]);
        this.yellowFrame[1].cache();

        this.yellowFrame[2] = this.yellowFrame[1].clone(this.config.blueDottedLineFrame1Config as any);
        this.staticLayer.add(this.yellowFrame[2]);

        this.yellowFrame[3] = this.yellowFrame[1].clone(this.config.blueDottedLineFrame4Config as any);
        this.staticLayer.add(this.yellowFrame[3]);

        this.yellowFrame[4] = this.yellowFrame[1].clone(this.config.blueDottedLineFrame5Config as any);
        this.staticLayer.add(this.yellowFrame[4]);

        this.yellowFrame[5] = this.yellowFrame[1].clone(this.config.blueDottedLineFrame6Config as any);
        this.staticLayer.add(this.yellowFrame[5]);
    }

    async initWhiteCircle() {
        // 白色小圆1
        this.whiteCircle[0] = await this.loadImage((whiteCircle as any), this.config.WhiteCircle1Config as any);
        this.animationLayer.add(this.whiteCircle[0]);
        this.whiteCircle[0].cache();

        // 白色小圆2
        this.whiteCircle[1] = this.whiteCircle[0].clone(this.config.WhiteCircle2Config as any);
        this.animationLayer.add(this.whiteCircle[1]);

        // 白色小圆3
        this.whiteCircle[2] = this.whiteCircle[0].clone(this.config.WhiteCircle3Config as any);
        this.animationLayer.add(this.whiteCircle[2]);

        // 白色小圆4
        this.whiteCircle[3] = this.whiteCircle[0].clone(this.config.WhiteCircle4Config as any);
        this.animationLayer.add(this.whiteCircle[3]);

        // 白色小圆5
        this.whiteCircle[4] = this.whiteCircle[0].clone(this.config.WhiteCircle5Config as any);
        this.animationLayer.add(this.whiteCircle[4]);

        // 白色小圆6
        this.whiteCircle[5] = this.whiteCircle[0].clone(this.config.WhiteCircle6Config as any);
        this.animationLayer.add(this.whiteCircle[5]);

        // 白色小圆7
        this.whiteCircle[6] = this.whiteCircle[0].clone(this.config.WhiteCircle7Config as any);
        this.animationLayer.add(this.whiteCircle[6]);

        // 白色小圆8
        this.whiteCircle[7] = this.whiteCircle[0].clone(this.config.WhiteCircle8Config as any);
        this.animationLayer.add(this.whiteCircle[7]);

        // 白色小圆9
        this.whiteCircle[8] = this.whiteCircle[0].clone(this.config.WhiteCircle9Config as any);
        this.animationLayer.add(this.whiteCircle[8]);

        // 白色小圆10
        this.whiteCircle[9] = this.whiteCircle[0].clone(this.config.WhiteCircle10Config as any);
        this.animationLayer.add(this.whiteCircle[9]);

        // 白色小圆11
        this.whiteCircle[10] = this.whiteCircle[0].clone(this.config.WhiteCircle11Config as any);
        this.animationLayer.add(this.whiteCircle[10]);

        // 白色小圆12
        this.whiteCircle[11] = this.whiteCircle[0].clone(this.config.WhiteCircle12Config as any);
        this.animationLayer.add(this.whiteCircle[11]);

        // 白色小圆13
        this.whiteCircle[12] = this.whiteCircle[0].clone(this.config.WhiteCircle13Config as any);
        this.animationLayer.add(this.whiteCircle[12]);

        this.stage.add(this.animationLayer);
    }

    async initFormula() {
        // 公式1
        this.formulaImage[0] = await this.loadImage((formula1 as any), this.config.formula1Config as any);
        this.animationLayer.add(this.formulaImage[0]);

        // 公式2
        this.formulaImage[1] = await this.loadImage((formula2 as any), this.config.formula2Config as any);
        this.animationLayer.add(this.formulaImage[1]);

        // 公式3
        this.formulaImage[2] = await this.loadImage((formula3 as any), this.config.formula3Config as any);
        this.animationLayer.add(this.formulaImage[2]);

        // 公式4
        this.formulaImage[3] = await this.loadImage((formula4 as any), this.config.formula4Config as any);
        this.animationLayer.add(this.formulaImage[3]);

        // 公式5
        this.formulaImage[4] = await this.loadImage((formula5 as any), this.config.formula5Config as any);
        this.animationLayer.add(this.formulaImage[4]);

        // 公式6
        this.formulaImage[5] = await this.loadImage((formula6 as any), this.config.formula6Config as any);
        this.animationLayer.add(this.formulaImage[5]);

        // 公式7
        this.formulaImage[6] = await this.loadImage((formula7 as any), this.config.formula7Config as any);
        this.animationLayer.add(this.formulaImage[6]);

        // 公式8
        this.formulaImage[7] = await this.loadImage((formula8 as any), this.config.formula8Config as any);
        this.animationLayer.add(this.formulaImage[7]);

        // 公式9
        this.formulaImage[8] = await this.loadImage((formula9 as any), this.config.formula9Config as any);
        this.animationLayer.add(this.formulaImage[8]);

        // 公式10
        this.formulaImage[9] = await this.loadImage((formula10 as any), this.config.formula10Config as any);
        this.animationLayer.add(this.formulaImage[9]);

        // 公式11
        this.formulaImage[10] = await this.loadImage((formula11 as any), this.config.formula11Config as any);
        this.animationLayer.add(this.formulaImage[10]);

        // 公式12
        this.formulaImage[11] = await this.loadImage((formula12 as any), this.config.formula12Config as any);
        this.animationLayer.add(this.formulaImage[11]);

        // 公式13
        this.formulaImage[12] = await this.loadImage((formula13 as any), this.config.formula13Config as any);
        this.animationLayer.add(this.formulaImage[12]);

        // 公式14
        this.formulaImage[13] = await this.loadImage((formula4 as any), this.config.formula14Config as any);
        this.animationLayer.add(this.formulaImage[13]);

        // 公式15
        this.formulaImage[14] = await this.loadImage((formula5 as any), this.config.formula15Config as any);
        this.animationLayer.add(this.formulaImage[14]);

        this.stage.add(this.animationLayer);
    }

    async initYellowCircle() {
        // 黄色小圆1
        this.yellowCircle[0] = await this.loadImage((yellowCircle as any), this.config.WhiteCircle1Config as any);
        this.animationLayer.add(this.yellowCircle[0]);
        this.yellowCircle[0].cache();

        // 黄色小圆2
        this.yellowCircle[1] = this.yellowCircle[0].clone(this.config.WhiteCircle2Config as any);
        this.animationLayer.add(this.yellowCircle[1]);

        // 黄色小圆3
        this.yellowCircle[2] = this.yellowCircle[0].clone(this.config.WhiteCircle3Config as any);
        this.animationLayer.add(this.yellowCircle[2]);

        // 黄色小圆4
        this.yellowCircle[3] = this.yellowCircle[0].clone(this.config.WhiteCircle4Config as any);
        this.animationLayer.add(this.yellowCircle[3]);

        // 黄色小圆5
        this.yellowCircle[4] = this.yellowCircle[0].clone(this.config.WhiteCircle5Config as any);
        this.animationLayer.add(this.yellowCircle[4]);

        // 黄色小圆6
        this.yellowCircle[5] = this.yellowCircle[0].clone(this.config.WhiteCircle6Config as any);
        this.animationLayer.add(this.yellowCircle[5]);

        // 黄色小圆7
        this.yellowCircle[6] = this.yellowCircle[0].clone(this.config.WhiteCircle7Config as any);
        this.animationLayer.add(this.yellowCircle[6]);

        // 黄色小圆8
        this.yellowCircle[7] = this.yellowCircle[0].clone(this.config.WhiteCircle8Config as any);
        this.animationLayer.add(this.yellowCircle[7]);

        // 黄色小圆9
        this.yellowCircle[8] = this.yellowCircle[0].clone(this.config.WhiteCircle9Config as any);
        this.animationLayer.add(this.yellowCircle[8]);

        // 黄色小圆10
        this.yellowCircle[9] = this.yellowCircle[0].clone(this.config.WhiteCircle10Config as any);
        this.animationLayer.add(this.yellowCircle[9]);

        // 黄色小圆11
        this.yellowCircle[10] = this.yellowCircle[0].clone(this.config.WhiteCircle11Config as any);
        this.animationLayer.add(this.yellowCircle[10]);

        // 黄色小圆12
        this.yellowCircle[11] = this.yellowCircle[0].clone(this.config.WhiteCircle12Config as any);
        this.animationLayer.add(this.yellowCircle[11]);

        // 黄色小圆13
        this.yellowCircle[12] = this.yellowCircle[0].clone(this.config.WhiteCircle13Config as any);
        this.animationLayer.add(this.yellowCircle[12]);

        this.stage.add(this.animationLayer);
    }

    async initRouteImage() {

        this.routeLayer = new Layer();

        this.routeImage[0] = await this.loadImage((routeImage1 as any), this.config.routeImage1Config as any);
        this.routeLayer.add(this.routeImage[0]);

        this.routeImage[1] = await this.loadImage((routeImage2 as any), this.config.routeImage1Config as any);
        this.routeLayer.add(this.routeImage[1]);

        this.stage.add(this.routeLayer);
    }

    async initButtonImage() {
        this.buttonLayer = new Layer();

        this.buttonImage[0] = await this.loadImage((button1 as any), this.config.button1Config as any);
        this.buttonLayer.add(this.buttonImage[0]);

        this.buttonImage[1] = await this.loadImage((button2 as any), this.config.button1Config as any);
        this.buttonLayer.add(this.buttonImage[1]);

        this.stage.add(this.buttonLayer);
    }

    addRect() {
        this.rect = new Konva.Rect(this.config.rectConfig);

        this.staticLayer.add(this.rect);
    }

    boundDragEvent() {
        this.bjsDrag.dragMove(this.ch2oh, this.blueDottedLineFrame[0], this.config.ch2ohConfig, this.cooh);
        this.bjsDrag.dragMove(this.ch2oh, this.blueDottedLineFrame[1], this.config.ch2ohConfig, this.cooh);

        this.bjsDrag.dragMove(this.cooh, this.blueDottedLineFrame[0], this.config.coohConfig, this.ch2oh);
        this.bjsDrag.dragMove(this.cooh, this.blueDottedLineFrame[1], this.config.coohConfig, this.ch2oh);

        this.bjsDrag.dragMove2(this.cho, this.blueDottedLineFrame[2], this.config.choConfig);
        this.bjsDrag.dragMove3(this.chcl2, this.blueDottedLineFrame[3], this.config.chcl2Config);
        this.bjsDrag.dragMove2(this.ch3, this.blueDottedLineFrame[4], this.config.ch3Config);

        this.bjsDrag.dragMove2(this.ch2cl, this.blueDottedLineFrame[5], this.config.ch2clConfig);
        this.bjsDrag.dragMove2(this.ch2cl, this.blueDottedLineFrame[6], this.config.ch2clConfig);

        this.bjsDrag.clickEvent(this.whiteCircle[0], this.formulaImage[0], this.yellowCircle[0]);
        this.bjsDrag.clickEvent(this.whiteCircle[1], this.formulaImage[1], this.yellowCircle[1]);
        this.bjsDrag.clickEvent(this.whiteCircle[2], this.formulaImage[2], this.yellowCircle[2]);
        this.bjsDrag.clickEvent(this.whiteCircle[3], this.formulaImage[3], this.yellowCircle[3], this.formulaImage[14]);
        this.bjsDrag.clickEvent(this.whiteCircle[4], this.formulaImage[4], this.yellowCircle[4], this.formulaImage[13]);
        this.bjsDrag.clickEvent(this.whiteCircle[5], this.formulaImage[5], this.yellowCircle[5]);
        this.bjsDrag.clickEvent(this.whiteCircle[6], this.formulaImage[6], this.yellowCircle[6]);
        this.bjsDrag.clickEvent(this.whiteCircle[7], this.formulaImage[7], this.yellowCircle[7]);
        this.bjsDrag.clickEvent(this.whiteCircle[8], this.formulaImage[8], this.yellowCircle[8]);
        this.bjsDrag.clickEvent(this.whiteCircle[9], this.formulaImage[9], this.yellowCircle[9]);
        this.bjsDrag.clickEvent(this.whiteCircle[10], this.formulaImage[10], this.yellowCircle[10]);
        this.bjsDrag.clickEvent(this.whiteCircle[11], this.formulaImage[11], this.yellowCircle[11]);
        this.bjsDrag.clickEvent(this.whiteCircle[12], this.formulaImage[12], this.yellowCircle[12]);

        this.bjsDrag.layerEvent(this.staticLayer, this.formulaImage, this.yellowCircle);

        this.bjsDrag.button1Event(this.buttonImage[0]);
        this.bjsDrag.button2Event(this.buttonImage[1]);

        this.bjsDrag.moleculeImage();
    }

    async reset() {
        // alert(this.staticLayer.getChildren().toArray().length);
        const array1 = this.staticLayer.getChildren().toArray();
        const array2 = this.animationLayer.getChildren().toArray();
        const array3 = this.routeLayer.getChildren().toArray();
        const array4 = this.buttonLayer.getChildren().toArray();

        for (let i = 0; i < array1.length; i++) {
            array1[i].visible(false);
        }

        for (let i = 0; i < array2.length; i++) {
            array2[i].visible(false);
        }

        for (let i = 0; i < array3.length; i++) {
            array3[i].visible(false);
        }

        for (let i = 0; i < array4.length; i++) {
            array4[i].visible(false);
        }


        this.textImage1.visible(true);
        this.coochh1Image.visible(true);
        this.blueDottedArrow1.visible(true);
        this.blueDottedArrow2.visible(true);
        this.blueDottedArrow3.visible(true);
        this.blueDottedLineFrame[0].visible(true);
        this.blueDottedLineFrame[1].visible(true);

        this.ch2oh.visible(true);
        this.cho.visible(true);
        this.chcl2.visible(true);
        this.ch2cl.visible(true);
        this.cooh.visible(true);
        this.ch3.visible(true);

        this.whiteFrame[0].visible(true);
        this.whiteFrame[1].visible(true);
        this.whiteFrame[2].visible(true);
        this.whiteFrame[3].visible(true);
        this.whiteFrame[4].visible(true);
        this.whiteFrame[5].visible(true);

        this.resetImage(this.ch2oh, this.config.ch2ohConfig);
        this.resetImage(this.cho, this.config.choConfig);
        this.resetImage(this.chcl2, this.config.chcl2Config);
        this.resetImage(this.ch2cl, this.config.ch2clConfig);
        this.resetImage(this.cooh, this.config.coohConfig);
        this.resetImage(this.ch3, this.config.ch3Config);

        this.staticLayer.visible(true);
        this.animationLayer.visible(true);
        this.rect.visible(true);
        this.staticLayer.draw();
        this.animationLayer.draw();
        this.routeLayer.draw();
        this.buttonLayer.draw();

    }

    // 重置分子式的位置
    resetImage(image: Konva.Image, config: any) {
        image.x(config.x);
        image.y(config.y);
        image.draggable(true);
    }

}

