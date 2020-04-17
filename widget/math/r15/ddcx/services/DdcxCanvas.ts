

import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import {Layer} from 'konva';
import {DdcxConfig} from './DdcxConfig';
import * as whitePoint from '../sub_static/whitePoint.png';
import * as guideLine from '../sub_static/guideLine.png';

export class DdcxCanvas extends SimpleKonvaTemplate {

    config: DdcxConfig;

    private whitePoint: any;
    private bluePoint: any;
    private guideLine: any;
    private group: any;



    constructor() {
        super('box');

        this.config = new DdcxConfig();

        this.initImage();
    }


    async initImage() {
        // 蓝色点
        this.bluePoint = new Konva.Circle({
            x: this.config.whitePointConfig.x + this.config.whitePointConfig.width / 2,
            y: this.config.whitePointConfig.y + this.config.whitePointConfig.height / 2,
            radius: this.config.whitePointConfig.width / 8,
            fill: '#0199FF',
            stroke: '#0199FF',
            strokeWidth: 0,
        });

        // 白色点
        this.whitePoint = await this.loadImage((whitePoint as any), this.config.whitePointConfig as any);
        this.staticLayer.add(this.whitePoint);

        this.group = new Konva.Group({
            draggable: true
        });

        this.group.add(this.whitePoint);
        this.group.add(this.bluePoint);

        // 引导线
        this.guideLine = await this.loadImage((guideLine as any), this.config.guideLineConfig as any);
        this.staticLayer.add(this.guideLine);

        this.staticLayer.add(this.group);



        this.stage.add(this.staticLayer);
        this.whitePointDrag();
    }


    whitePointDrag() {

        const lastPoint = {
            x: this.config.whitePointConfig.x + this.config.whitePointConfig.width / 2,
            y: this.config.whitePointConfig.y + this.config.whitePointConfig.height / 2,
        };

        // 开始拖动
        this.group.on('dragstart', () => {
            this.guideLine.visible(false);
            this.guideLine.draw();
            lastPoint.x = this.config.whitePointConfig.x + this.config.whitePointConfig.width / 2;
            lastPoint.y = this.config.whitePointConfig.y + this.config.whitePointConfig.height / 2;
        });

        // 结束拖动
        this.group.on('dragend', () => {
            this.whitePoint.visible(false);
            this.whitePoint.draw();
            this.staticLayer.draw();
            this.group.draggable(false);
        });

        const newPoint = {
            x: 0,
            y: 0,
        };

        // 拖动中
        this.group.on('dragmove', () => {

            // 超出界限停止拖动
            if (this.group.x() < -20) {
                this.group.x(-20);
                this.whitePoint.visible(false);
                this.whitePoint.draw();
            }

            if (this.group.x() > this.config.whitePointConfig.x * 2) {
                this.group.x(this.config.whitePointConfig.x * 2);
                this.whitePoint.visible(false);
                this.whitePoint.draw();
            }

            newPoint.x = this.config.whitePointConfig.x + this.config.whitePointConfig.width / 2 + this.group.x();
            newPoint.y = this.config.whitePointConfig.y + this.config.whitePointConfig.height / 2 + this.group.y();

            // 绘制线
            const greenLine = new Konva.Line({
                points: [lastPoint.x, lastPoint.y, newPoint.x, newPoint.y],
                stroke: '#AAD8F7',
                strokeWidth: this.config.whitePointConfig.width / 4,
                lineCap: 'round',
                lineJoin: 'round'
            });

            this.staticLayer.add(greenLine);

            lastPoint.x = newPoint.x;
            lastPoint.y = newPoint.y;

            this.group.moveToTop();

            if (this.whitePoint.visible() === false) {
                this.group.draggable(false);
            }
        });
    }

    reset() {
        this.group.moveToBottom();
        this.whitePoint.visible(true);
        this.guideLine.visible(true);
        this.group.x(0);
        this.group.y(0);
        this.group.draggable(true);
        this.staticLayer.draw();

        for (let i = 0; i < 21; i++) {
            this.removeLayer();
        }
    }

    removeLayer() {
        for (let i = 2; i < this.staticLayer.getChildren().length; i++) {
            this.staticLayer.getChildren()[i].remove();

        }
        this.staticLayer.draw();
    }


}

