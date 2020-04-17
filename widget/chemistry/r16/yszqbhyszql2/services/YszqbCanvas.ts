

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import {YszqbConfig} from './YszqbConfig';
import {Layer} from 'konva';

import * as step1 from '../sub_static/photo/step1.png';
import * as step2 from '../sub_static/photo/step2.png';
import * as step3 from '../sub_static/photo/step3.png';
import * as step4 from '../sub_static/photo/step4.png';

export class YszqbCanvas extends SimpleKonvaTemplate {
    config: YszqbConfig;

    step1Image: Konva.Image;
    step2Image: Konva.Image;
    step3Image: Konva.Image;
    step4Image: Konva.Image;

    private moveBoolean = true;

    constructor() {
        super('3dModel');

        this.config = new YszqbConfig();

        this.initImage();
    }

    async initImage() {
        // 步骤1
        this.step1Image = await this.loadImage((step1 as any), this.config.step1Config as any);

        // 步骤2
        this.step2Image = await this.loadImage((step2 as any), this.config.step2Config as any);

        // 步骤3
        this.step3Image = await this.loadImage((step3 as any), this.config.step3Config as any);

        // 步骤4
        this.step4Image = await this.loadImage((step4 as any), this.config.step4Config as any);


        this.staticLayer.add(this.step1Image);
        this.staticLayer.add(this.step2Image);
        this.staticLayer.add(this.step3Image);
        this.staticLayer.add(this.step4Image);
        this.stage.add(this.staticLayer);
    }

    // 显示场景1
    showStep1Image() {
        this.step1Image.visible(true);
        this.step2Image.visible(false);
        this.step3Image.visible(false);
        this.step4Image.visible(false);
        this.staticLayer.draw();
    }

    // 显示场景2
    showStep2Image() {
        this.step1Image.visible(false);
        this.step2Image.visible(true);
        this.step3Image.visible(false);
        this.step4Image.visible(false);
        this.staticLayer.draw();
    }

    // 收起左侧时图片变宽
    moveImage(leftOrRight: any) {
        if (leftOrRight === 'left') {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const scale = (height * 0.91) / this.config.step1Config.height - 0.2;

            const top = (height - this.config.step1Config.height * scale) / 2;
            const left = (width - this.config.step1Config.width * scale) / 2;
            this.step1Image.x(left);
            this.step2Image.x(left);
            this.step3Image.x(left);
            this.step4Image.x(left);

            this.step1Image.y(top);
            this.step2Image.y(top);
            this.step3Image.y(top);
            this.step4Image.y(top);

            this.step1Image.width(this.config.step1Config.width * scale);
            this.step1Image.height(this.config.step1Config.height * scale);

            this.step2Image.width(this.config.step1Config.width * scale);
            this.step2Image.height(this.config.step1Config.height * scale);

            this.step3Image.width(this.config.step1Config.width * scale);
            this.step3Image.height(this.config.step1Config.height * scale);

            this.step4Image.width(this.config.step1Config.width * scale);
            this.step4Image.height(this.config.step1Config.height * scale);

            this.moveBoolean = false;
        } else if (leftOrRight === 'right') {
            this.step1Image.x(this.config.step1Config.x);
            this.step2Image.x(this.config.step2Config.x);
            this.step3Image.x(this.config.step3Config.x);
            this.step4Image.x(this.config.step4Config.x);

            this.step1Image.y(this.config.step1Config.y);
            this.step2Image.y(this.config.step2Config.y);
            this.step3Image.y(this.config.step3Config.y);
            this.step4Image.y(this.config.step4Config.y);

            this.step1Image.width(this.config.step1Config.width);
            this.step1Image.height(this.config.step1Config.height);

            this.step2Image.width(this.config.step2Config.width);
            this.step2Image.height(this.config.step2Config.height);

            this.step3Image.width(this.config.step3Config.width);
            this.step3Image.height(this.config.step3Config.height);

            this.step4Image.width(this.config.step4Config.width);
            this.step4Image.height(this.config.step4Config.height);

            this.moveBoolean = true;
        }




        this.staticLayer.draw();
    }
}

