import {BjsCanvas} from './BjsCanvas';

import * as Konva from 'konva';
import {BjsConfig} from './BjsConfig';

export class BjsDragEvent {

    // 定义一个计数变量 计数外层边框是否填满
    private value = 0;

    // 定义一个计数变量 计数所有边框是否填满
    private allValue = 0;

    private bjsCanvas: BjsCanvas;
    private bjsConfig: BjsConfig;

    el: any;

    // 判断ch2oh 是否拖动到上边框
    ch2oh = false;

    constructor(bjsCanvas: BjsCanvas) {
        this.bjsCanvas = bjsCanvas;
        this.bjsConfig = new BjsConfig();
    }

    // 给第1次能拖进去的分子式绑定拖动事件
    dragMove(image: Konva.Image, frame: Konva.Image, config: any, image2: Konva.Image) {
        this.bjsCanvas.staticLayer.setZIndex(0);
        this.bjsCanvas.animationLayer.setZIndex(1);
        this.bjsCanvas.buttonLayer.setZIndex(3);

        image.on('dragmove touchmove', (e: any) => {
            image.moveToTop();
            const targetRect = e.target.getClientRect();
            if (this.haveIntersection(frame.getClientRect(), targetRect) && image2.y() !== frame.y()) {

                // if (this.bjsCanvas.ch2oh.x() !== frame.x()) {
                    image.x(frame.x());
                    image.y(frame.y());
                    image.draggable(false);
                // }

                if (Number.parseInt(frame.id()) === 1 && Number.parseInt(image.id()) === 1) {
                    // ch2oh 拖动到上框框
                    this.bjsCanvas.blueSolidArrow[0].visible(true);
                    this.bjsCanvas.blueSolidArrow[1].visible(true);
                    this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;

                    this.ch2oh = true;
                }

                if (Number.parseInt(frame.id()) === 2 && Number.parseInt(image.id()) === 1) {
                    // ch2oh 拖动到下框框
                    this.bjsCanvas.blueSolidArrow[1].visible(true);
                    this.bjsCanvas.blueSolidArrow[2].visible(true);
                    this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;

                    this.ch2oh = false;
                }

                if (Number.parseInt(frame.id()) === 1 && Number.parseInt(image.id()) === 5) {
                    // cooh拖动到上边框
                    this.bjsCanvas.blueSolidArrow[0].visible(true);
                    this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
                }

                if (Number.parseInt(frame.id()) === 2 && Number.parseInt(image.id()) === 5) {
                    // cooh拖动到下边框

                    this.bjsCanvas.blueSolidArrow[2].visible(true);
                    this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
                }

                // 用于判断两个分子式拖完后显示虚线和虚线框
                if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                    && this.bjsCanvas.blueSolidArrow[1].visible() === true
                    && this.bjsCanvas.blueSolidArrow[2].visible() === true) {
                    // 显示白色小圆
                    this.bjsCanvas.animationLayer.setZIndex(1);

                    this.bjsCanvas.whiteCircle[0].visible(true);
                    this.bjsCanvas.whiteCircle[1].visible(true);
                    this.bjsCanvas.whiteCircle[2].visible(true);


                    // 显示蓝色虚线
                    this.bjsCanvas.blueDottedArrow5.visible(true);
                    this.bjsCanvas.blueDottedArrow6.visible(true);

                    // 显示蓝色边框
                    this.bjsCanvas.blueDottedLineFrame[2].visible(true);
                    this.bjsCanvas.blueDottedLineFrame[4].visible(true);


                    // 显示蓝色实线
                    this.bjsCanvas.blueSolidArrow[3].visible(true);

                    if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                        // ch2oh 在上边框
                        this.bjsCanvas.blueDottedLineFrame[6].visible(true);
                        this.bjsCanvas.blueDottedArrow7[3].visible(true);

                        this.bjsCanvas.blueDottedArrow14.visible(true);
                    } else {
                        // ch2oh 在下边框
                        this.bjsCanvas.blueDottedLineFrame[5].visible(true);
                        this.bjsCanvas.blueDottedArrow7[2].visible(true);

                        this.bjsCanvas.blueDottedArrow9.visible(true);
                    }

                    this.bjsCanvas.staticLayer.draw();
                    this.bjsCanvas.animationLayer.draw();
                }
            }
        });

        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
            document.body.style.cursor = 'default';
            if (frame.x() !== image.x()) {
                image.x(config.x);
                image.y(config.y);
                this.bjsCanvas.staticLayer.draw();
            }
        });

        let x: number;
        let y: number;
        image.on('mousedown touchstart', function() {
            x = config.x;
            y = config.y;
        });

        image.on('mouseup touchend', () => {
            if (frame.x() !== image.x()) {
                image.x(x);
                image.y(y);
                this.bjsCanvas.staticLayer.draw();
            }
        });
    }

    // 给第2次能拖进去的分子式绑定拖动事件
    dragMove2(image: Konva.Image, frame: Konva.Image, config: any) {
        image.on('dragmove touchmove', (e: any) => {
            image.moveToTop();
            const targetRect = e.target.getClientRect();
            if (this.haveIntersection(frame.getClientRect(), targetRect)) {

                if (frame.visible() === true) {
                    image.x(frame.x());
                    image.y(frame.y());
                    image.draggable(false);


                    // cho 拖动到框里后
                    if (Number.parseInt(frame.id()) === 3 && Number.parseInt(image.id()) === 2) {
                        this.bjsCanvas.blueDottedLineFrame[3].visible(true);
                        this.bjsCanvas.blueSolidArrow[4].visible(true);
                        this.bjsCanvas.blueSolidArrow[5].visible(true);
                        this.bjsCanvas.blueDottedArrow7[0].visible(true);
                        this.bjsCanvas.blueDottedLineFrame[2].visible(false);
                        this.bjsCanvas.blueDottedArrow5.visible(false);
                        this.bjsCanvas.blueDottedArrow6.visible(false);
                        this.bjsCanvas.blueDottedArrow7[1].visible(false);

                        // 显示白色小圆点
                        this.bjsCanvas.whiteCircle[3].visible(true);
                        this.bjsCanvas.whiteCircle[4].visible(true);

                        this.allValue += 1;
                    }

                    // ch2cl 拖动到框里
                    if (Number.parseInt(frame.id()) === 7 && Number.parseInt(image.id()) === 4) {
                        // ch2cl在上面

                        this.bjsCanvas.blueDottedArrow12.visible(true);
                        this.bjsCanvas.blueSolidArrow[6].visible(true);
                        this.bjsCanvas.blueDottedArrow7[3].visible(false);

                        if (this.bjsCanvas.ch3.x() === this.bjsCanvas.blueDottedLineFrame[4].x()) {
                            this.bjsCanvas.blueSolidArrow[13].visible(true);
                            this.bjsCanvas.whiteCircle[11].visible(true);
                        }

                        this.bjsCanvas.whiteCircle[10].visible(true);
                        this.bjsCanvas.blueDottedLineFrame[6].visible(false);

                        this.value += 1;
                        this.allValue += 1;
                    }

                    // ch2cl 拖动到框里
                    if (Number.parseInt(frame.id()) === 6 && Number.parseInt(image.id()) === 4) {
                        this.bjsCanvas.blueDottedArrow11.visible(true);
                        this.bjsCanvas.blueSolidArrow[9].visible(true);
                        this.bjsCanvas.blueDottedArrow7[2].visible(false);

                        if (this.bjsCanvas.ch3.x() === this.bjsCanvas.blueDottedLineFrame[4].x()) {
                            this.bjsCanvas.blueSolidArrow[12].visible(true);
                            this.bjsCanvas.whiteCircle[9].visible(true);
                        }

                        this.bjsCanvas.whiteCircle[8].visible(true);
                        this.bjsCanvas.blueDottedLineFrame[5].visible(false);

                        this.value += 1;
                        this.allValue += 1;
                    }


                    // ch3 拖动到框里后
                    if (Number.parseInt(frame.id()) === 5 && Number.parseInt(image.id()) === 6) {

                        if (this.bjsCanvas.blueDottedArrow7[1].visible() === true) {
                            // 判断虚线箭头是否显示了  显示了 才能变蓝
                            this.bjsCanvas.blueSolidArrow[8].visible(true);
                            this.bjsCanvas.whiteCircle[7].visible(true);
                        }

                        if (this.bjsCanvas.blueDottedArrow9.visible() === true) {
                            this.bjsCanvas.blueSolidArrow[10].visible(true);
                            this.bjsCanvas.whiteCircle[5].visible(true);
                        }

                        if (this.bjsCanvas.blueDottedArrow14.visible() === true) {
                            this.bjsCanvas.blueSolidArrow[11].visible(true);
                            this.bjsCanvas.whiteCircle[12].visible(true);
                        }

                        if (this.bjsCanvas.blueDottedArrow11.visible() === true) {
                            this.bjsCanvas.blueSolidArrow[12].visible(true);
                            this.bjsCanvas.whiteCircle[5].visible(true);
                            this.bjsCanvas.whiteCircle[9].visible(true);
                        }

                        if (this.bjsCanvas.blueDottedArrow12.visible() === true) {
                            this.bjsCanvas.blueSolidArrow[13].visible(true);
                            this.bjsCanvas.whiteCircle[11].visible(true);
                        }

                        // 显示原料分子
                        this.bjsCanvas.textImage2.visible(true);
                        this.bjsCanvas.blueDottedLineFrame[4].visible(false);

                        this.value += 1;
                        this.allValue += 1;
                    }

                    // 外围边框都填满
                    if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                        && this.bjsCanvas.blueSolidArrow[1].visible() === true
                        && this.bjsCanvas.blueSolidArrow[2].visible() === true
                        && this.bjsCanvas.blueSolidArrow[13].visible() === true
                    ) {
                        // 隐藏虚线箭头
                        this.bjsCanvas.blueDottedArrow1.visible(false);
                        this.bjsCanvas.blueDottedArrow2.visible(false);
                        this.bjsCanvas.blueDottedArrow3.visible(false);
                        this.bjsCanvas.blueDottedArrow4.visible(false);
                        this.bjsCanvas.blueDottedArrow9.visible(false);
                        this.bjsCanvas.blueDottedArrow11.visible(false);
                        this.bjsCanvas.blueDottedArrow12.visible(false);
                        this.bjsCanvas.blueDottedArrow14.visible(false);
                        this.bjsCanvas.blueDottedArrow7[2].visible(false);
                        this.bjsCanvas.blueDottedArrow7[3].visible(false);

                        // 隐藏蓝色虚线边框
                        this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                        this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                        this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                        // 显示黄色边框
                        this.bjsCanvas.yellowFrame[0].visible(true);
                        this.bjsCanvas.yellowFrame[1].visible(true);
                        this.bjsCanvas.yellowFrame[2].visible(true);
                        this.bjsCanvas.yellowFrame[3].visible(true);

                        this.bjsCanvas.yellowSolidArrow[0].visible(true);
                        this.bjsCanvas.yellowSolidArrow[1].visible(true);
                        this.bjsCanvas.yellowSolidArrow[2].visible(true);
                        this.bjsCanvas.yellowSolidArrow[0].draw();
                        this.bjsCanvas.yellowSolidArrow[1].draw();
                        this.bjsCanvas.yellowSolidArrow[2].draw();
                        console.log(' 外框满 ', this.value);
                        // 显示黄色箭头 分两种
                        if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                            // 显示黄色实线箭头
                            this.bjsCanvas.yellowSolidArrow[6].visible(true);
                            this.bjsCanvas.yellowSolidArrow[7].visible(true);
                            this.bjsCanvas.yellowSolidArrow[8].visible(true);

                            // 隐藏蓝色实线箭头
                            this.bjsCanvas.blueSolidArrow[6].visible(false);
                            this.bjsCanvas.blueSolidArrow[11].visible(false);
                            this.bjsCanvas.blueSolidArrow[13].visible(false);

                            // 隐藏黄色框
                            this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                            this.bjsCanvas.yellowFrame[5].visible(true);
                            this.bjsCanvas.staticLayer.draw();
                        } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                            // 显示黄色实线箭头
                            this.bjsCanvas.yellowSolidArrow[3].visible(true);
                            this.bjsCanvas.yellowSolidArrow[4].visible(true);
                            this.bjsCanvas.yellowSolidArrow[5].visible(true);

                            // 隐藏蓝色实线箭头
                            this.bjsCanvas.blueSolidArrow[6].visible(false);
                            this.bjsCanvas.blueSolidArrow[9].visible(false);
                            this.bjsCanvas.blueSolidArrow[10].visible(false);
                            this.bjsCanvas.blueSolidArrow[12].visible(false);

                            // 隐藏黄色框
                            this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                            this.bjsCanvas.yellowFrame[4].visible(true);
                            this.bjsCanvas.staticLayer.draw();
                        }
                    }

                    if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                        && this.bjsCanvas.blueSolidArrow[1].visible() === true
                        && this.bjsCanvas.blueSolidArrow[2].visible() === true
                        && this.bjsCanvas.blueSolidArrow[12].visible() === true
                    ) {
                        // 隐藏虚线箭头
                        this.bjsCanvas.blueDottedArrow1.visible(false);
                        this.bjsCanvas.blueDottedArrow2.visible(false);
                        this.bjsCanvas.blueDottedArrow3.visible(false);
                        this.bjsCanvas.blueDottedArrow4.visible(false);
                        this.bjsCanvas.blueDottedArrow9.visible(false);
                        this.bjsCanvas.blueDottedArrow11.visible(false);
                        this.bjsCanvas.blueDottedArrow12.visible(false);
                        this.bjsCanvas.blueDottedArrow14.visible(false);
                        this.bjsCanvas.blueDottedArrow7[2].visible(false);
                        this.bjsCanvas.blueDottedArrow7[3].visible(false);

                        // 隐藏蓝色虚线边框
                        this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                        this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                        this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                        // 显示黄色边框
                        this.bjsCanvas.yellowFrame[0].visible(true);
                        this.bjsCanvas.yellowFrame[1].visible(true);
                        this.bjsCanvas.yellowFrame[2].visible(true);
                        this.bjsCanvas.yellowFrame[3].visible(true);


                        console.log(' 外框满 ', this.value);
                        this.bjsCanvas.yellowSolidArrow[0].visible(true);
                        this.bjsCanvas.yellowSolidArrow[1].visible(true);
                        this.bjsCanvas.yellowSolidArrow[2].visible(true);
                        this.bjsCanvas.yellowSolidArrow[0].draw();
                        this.bjsCanvas.yellowSolidArrow[1].draw();
                        this.bjsCanvas.yellowSolidArrow[2].draw();
                        // 显示黄色箭头 分两种
                        if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                            // 显示黄色实线箭头

                            this.bjsCanvas.yellowSolidArrow[6].visible(true);
                            this.bjsCanvas.yellowSolidArrow[7].visible(true);
                            this.bjsCanvas.yellowSolidArrow[8].visible(true);

                            // 隐藏蓝色实线箭头
                            this.bjsCanvas.blueSolidArrow[6].visible(false);
                            this.bjsCanvas.blueSolidArrow[11].visible(false);
                            this.bjsCanvas.blueSolidArrow[13].visible(false);

                            // 隐藏黄色框
                            this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                            this.bjsCanvas.yellowFrame[5].visible(true);

                        } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                            // 显示黄色实线箭头
                            this.bjsCanvas.yellowSolidArrow[3].visible(true);
                            this.bjsCanvas.yellowSolidArrow[4].visible(true);
                            this.bjsCanvas.yellowSolidArrow[5].visible(true);

                            // 隐藏蓝色实线箭头
                            this.bjsCanvas.blueSolidArrow[6].visible(false);
                            this.bjsCanvas.blueSolidArrow[9].visible(false);
                            this.bjsCanvas.blueSolidArrow[10].visible(false);
                            this.bjsCanvas.blueSolidArrow[12].visible(false);

                            // 隐藏黄色框
                            this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                            this.bjsCanvas.yellowFrame[4].visible(true);
                        }
                    }


                    // 所有框都填满
                    if (this.bjsCanvas.blueSolidArrow[8].visible() === true
                        && this.bjsCanvas.yellowFrame[5].visible() === true
                    ) {
                        this.bjsCanvas.buttonImage[0].visible(true);
                    }

                    if (this.bjsCanvas.blueSolidArrow[8].visible() === true
                        && this.bjsCanvas.yellowFrame[4].visible() === true
                    ) {
                        this.bjsCanvas.buttonImage[0].visible(true);
                    }



                    this.bjsCanvas.staticLayer.draw();
                    this.bjsCanvas.animationLayer.draw();
                    this.bjsCanvas.buttonLayer.draw();
                }

            } else {

            }

        });

        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
            document.body.style.cursor = 'default';
            if (frame.x() !== image.x()) {
                image.x(config.x);
                image.y(config.y);
                this.bjsCanvas.staticLayer.draw();
            }
        });

        let x: number;
        let y: number;
        image.on('mousedown touchstart', () => {
            x = config.x;
            y = config.y;

            for (let k = 0; k < this.bjsCanvas.formulaImage.length; k++) {
                this.bjsCanvas.formulaImage[k].visible(false);
            }

            for (let k = 0; k < this.bjsCanvas.yellowCircle.length; k++) {
                this.bjsCanvas.yellowCircle[k].visible(false);
            }

            this.bjsCanvas.animationLayer.draw();
        });

        image.on('mouseup touchend', () => {
            if (frame.x() !== image.x()) {
                image.x(x);
                image.y(y);
                this.bjsCanvas.staticLayer.draw();
            }

            // 外围边框都填满
            if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                && this.bjsCanvas.blueSolidArrow[1].visible() === true
                && this.bjsCanvas.blueSolidArrow[2].visible() === true
                && this.bjsCanvas.blueSolidArrow[13].visible() === true
            ) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);

                this.bjsCanvas.yellowSolidArrow[0].visible(true);
                this.bjsCanvas.yellowSolidArrow[1].visible(true);
                this.bjsCanvas.yellowSolidArrow[2].visible(true);
                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);
                    this.bjsCanvas.staticLayer.draw();
                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                    this.bjsCanvas.staticLayer.draw();
                }
            }

            if (this.bjsCanvas.ch2oh.x() === this.bjsCanvas.blueDottedLineFrame[0].x()
                && this.bjsCanvas.cooh.x() === this.bjsCanvas.blueDottedLineFrame[0].x
                && this.bjsCanvas.ch3.x() === this.bjsCanvas.blueDottedLineFrame[4].x
                && this.bjsCanvas.ch2cl.x() === this.bjsCanvas.blueDottedLineFrame[5].x
            ) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);


                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);

                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                }
            }

            if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                && this.bjsCanvas.blueSolidArrow[1].visible() === true
                && this.bjsCanvas.blueSolidArrow[2].visible() === true
                && this.bjsCanvas.blueSolidArrow[12].visible() === true
            ) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);


                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);

                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                }
            }

            this.bjsCanvas.staticLayer.draw();
        });
    }

    // 给第3次能拖进去的分子式绑定拖动事件
    dragMove3(image: Konva.Image, frame: Konva.Image, config: any) {
        image.on('dragmove touchmove', (e: any) => {
            image.moveToTop();
            const targetRect = e.target.getClientRect();
            if (this.haveIntersection(frame.getClientRect(), targetRect)) {
                if (frame.visible() === true) {
                    console.log('碰到了', frame.id(), image.id());
                    image.x(frame.x());
                    image.y(frame.y());
                    image.draggable(false);


                    if (Number.parseInt(frame.id()) === 4 && Number.parseInt(image.id()) === 3) {
                        // chcl2拖动到框里后
                        this.bjsCanvas.blueDottedArrow7[0].visible(false);
                        this.bjsCanvas.blueSolidArrow[7].visible(true);

                        if (this.bjsCanvas.ch3.x() === this.bjsCanvas.blueDottedLineFrame[4].x()) {
                            this.bjsCanvas.blueDottedArrow7[1].visible(false);
                            this.bjsCanvas.blueSolidArrow[8].visible(true);
                            this.bjsCanvas.whiteCircle[7].visible(true);
                        } else {
                            this.bjsCanvas.blueDottedArrow7[1].visible(true);
                        }

                        this.bjsCanvas.whiteCircle[6].visible(true);
                        this.bjsCanvas.blueDottedLineFrame[3].visible(false);


                        this.allValue += 1;
                    }

                    // 所有框都填满
                    if (this.bjsCanvas.blueSolidArrow[8].visible() === true
                        && this.bjsCanvas.yellowFrame[5].visible() === true
                    ) {

                        // (window as any).viewHandler.viewModel.$data.buttonVisible = true;
                        this.bjsCanvas.buttonImage[0].visible(true);

                    }

                    if (this.bjsCanvas.blueSolidArrow[8].visible() === true
                        && this.bjsCanvas.yellowFrame[4].visible() === true
                    ) {
                        this.bjsCanvas.buttonImage[0].visible(true);
                    }

                }
                this.bjsCanvas.staticLayer.draw();
                this.bjsCanvas.animationLayer.draw();
                this.bjsCanvas.buttonLayer.draw();
            } else {

            }

        });

        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
            document.body.style.cursor = 'default';

            if (frame.x() !== image.x()) {
                image.x(config.x);
                image.y(config.y);
                this.bjsCanvas.staticLayer.draw();
            }
        });

        let x: number;
        let y: number;
        image.on('mousedown touchstart', () => {
            x = config.x;
            y = config.y;

            for (let k = 0; k < this.bjsCanvas.formulaImage.length; k++) {
                this.bjsCanvas.formulaImage[k].visible(false);
            }
            for (let k = 0; k < this.bjsCanvas.yellowCircle.length; k++) {
                this.bjsCanvas.yellowCircle[k].visible(false);
            }

            this.bjsCanvas.animationLayer.draw();
        });

        image.on('mouseup touchend', () => {
            if (frame.x() !== image.x()) {
                image.x(x);
                image.y(y);
                this.bjsCanvas.staticLayer.draw();
            }

            // 外围边框都填满
            if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                && this.bjsCanvas.blueSolidArrow[1].visible() === true
                && this.bjsCanvas.blueSolidArrow[2].visible() === true
                && this.bjsCanvas.blueSolidArrow[13].visible() === true
            ) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);


                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);

                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                }
            }

            if (this.bjsCanvas.blueSolidArrow[0].visible() === true
                && this.bjsCanvas.blueSolidArrow[1].visible() === true
                && this.bjsCanvas.blueSolidArrow[2].visible() === true
                && this.bjsCanvas.blueSolidArrow[12].visible() === true
            ) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);


                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);

                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[0].visible(true);
                    this.bjsCanvas.yellowSolidArrow[1].visible(true);
                    this.bjsCanvas.yellowSolidArrow[2].visible(true);
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                }
            }
        });
    }

    haveIntersection(r1: any, r2: any) {
        return !(
            r2.x > r1.x + r1.width * 0.9 ||
            r2.x + r2.width * 0.9 < r1.x ||
            r2.y > r1.y + r1.height * 0.9 ||
            r2.y + r2.height * 0.9 < r1.y
        );
    }

    // 给白色小圆绑定事件
    clickEvent(image: Konva.Image, frame: Konva.Image, image2: Konva.Image, frame2?: Konva.Image) {

        image.on('click tap', () => {
            console.log('点击白色圆', this.ch2oh);
            for (let k = 0; k < this.bjsCanvas.formulaImage.length; k++) {
                this.bjsCanvas.formulaImage[k].visible(false);
            }
            for (let k = 0; k < this.bjsCanvas.yellowCircle.length; k++) {
                this.bjsCanvas.yellowCircle[k].visible(false);
            }

            if (!frame2) {
              frame.visible(true);
            } else {
                if (this.ch2oh) {
                  frame2.visible(true);
                } else {
                  frame.visible(true);
                }
            }


            image2.visible(true);

            image2.moveToTop();
            frame.moveToTop();
            this.bjsCanvas.animationLayer.draw();
        });

        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    // 给层绑定事件
    layerEvent(layer: Konva.Layer, formula: any, yellowCircle: any) {
        layer.on('click tap', () => {
            for (let k = 0; k < formula.length; k++) {
                formula[k].visible(false);
            }

            for (let k = 0; k < yellowCircle.length; k++) {
                yellowCircle[k].visible(false);
            }

            this.bjsCanvas.animationLayer.draw();
        });

    }

    // 给按钮1绑定事件
    button1Event(button: Konva.Image) {
        button.on('click tap', () => {
            console.log('被点击');

            if (this.bjsCanvas.cooh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                this.bjsCanvas.routeImage[0].visible(true);
            } else {
                this.bjsCanvas.routeImage[1].visible(true);
            }

            button.visible(false);
            this.bjsCanvas.routeLayer.visible(true);
            this.bjsCanvas.staticLayer.visible(false);
            this.bjsCanvas.animationLayer.visible(false);
            this.bjsCanvas.buttonImage[1].visible(true);

            this.bjsCanvas.routeLayer.draw();
            this.bjsCanvas.animationLayer.draw();
            this.bjsCanvas.staticLayer.draw();
            this.bjsCanvas.buttonLayer.draw();
        });

        button.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        button.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    // 给按钮2绑定事件
    button2Event(button: Konva.Image) {
        button.on('click tap', () => {
            button.visible(false);
            this.bjsCanvas.routeLayer.visible(false);
            this.bjsCanvas.staticLayer.visible(true);
            this.bjsCanvas.animationLayer.visible(true);
            this.bjsCanvas.buttonImage[0].visible(true);

            this.bjsCanvas.routeLayer.draw();
            this.bjsCanvas.animationLayer.draw();
            this.bjsCanvas.staticLayer.draw();
            this.bjsCanvas.buttonLayer.draw();
        });

        button.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        button.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    //给右侧分子式图片限定拖动范围
    dragRange(image: Konva.Image) {
        image.dragBoundFunc((pos: any) => {
            const newY = (pos.y < 0 ? 0 : false
            || pos.y > this.bjsCanvas.stage.getHeight() * 0.9 ? this.bjsCanvas.stage.getHeight() * 0.9   :  pos.y);
            const newX =  (pos.x < 0 ? (0)   :  false
            || pos.x > this.bjsCanvas.stage.getWidth() * 0.9 ? this.bjsCanvas.stage.getWidth() * 0.9   :  pos.x );
            return {
                x  :  newX,
                y  :  newY
            };
        });
    }

    // 判断分子式图片是否拖出页面
    moleculeImage() {
        document.addEventListener('mouseup', () => {
            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
                this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
                this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);

            }

            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
                this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
                this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
                this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
                this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
                this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
                this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
                this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
                this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            this.bjsCanvas.staticLayer.draw();
        });

        document.addEventListener('touchcancel', () => {
            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
                this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
                this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);

            }

            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
                this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
                this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
                this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
                this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
                this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
                this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
                this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
                this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            this.bjsCanvas.staticLayer.draw();
        });

        document.addEventListener('touchend', () => {
            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
                this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
                this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);

            }

            if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
                this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
                this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
                this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
                this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
                this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
                this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
                this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
                this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
                this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
                this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            }

            this.bjsCanvas.staticLayer.draw();
        });

        this.bjsCanvas.stage.on('mouseup', () => {
            // 外围边框都填满
            console.log('在上面');
            if (this.bjsCanvas.yellowFrame[0].visible() === true) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);

                this.bjsCanvas.yellowSolidArrow[0].visible(true);
                this.bjsCanvas.yellowSolidArrow[1].visible(true);
                this.bjsCanvas.yellowSolidArrow[2].visible(true);
                this.bjsCanvas.yellowSolidArrow[0].draw();
                this.bjsCanvas.yellowSolidArrow[1].draw();
                this.bjsCanvas.yellowSolidArrow[2].draw();
                console.log(' 外框满 ', this.value);
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);
                    this.bjsCanvas.staticLayer.draw();
                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                    this.bjsCanvas.staticLayer.draw();
                }
            }

            if (this.bjsCanvas.yellowFrame[0].visible() === true) {
                // 隐藏虚线箭头
                this.bjsCanvas.blueDottedArrow1.visible(false);
                this.bjsCanvas.blueDottedArrow2.visible(false);
                this.bjsCanvas.blueDottedArrow3.visible(false);
                this.bjsCanvas.blueDottedArrow4.visible(false);
                this.bjsCanvas.blueDottedArrow9.visible(false);
                this.bjsCanvas.blueDottedArrow11.visible(false);
                this.bjsCanvas.blueDottedArrow12.visible(false);
                this.bjsCanvas.blueDottedArrow14.visible(false);
                this.bjsCanvas.blueDottedArrow7[2].visible(false);
                this.bjsCanvas.blueDottedArrow7[3].visible(false);

                // 隐藏蓝色虚线边框
                this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                this.bjsCanvas.blueDottedLineFrame[4].visible(false);



                // 显示黄色边框
                this.bjsCanvas.yellowFrame[0].visible(true);
                this.bjsCanvas.yellowFrame[1].visible(true);
                this.bjsCanvas.yellowFrame[2].visible(true);
                this.bjsCanvas.yellowFrame[3].visible(true);


                console.log(' 外框满 ', this.value);
                this.bjsCanvas.yellowSolidArrow[0].visible(true);
                this.bjsCanvas.yellowSolidArrow[1].visible(true);
                this.bjsCanvas.yellowSolidArrow[2].visible(true);
                this.bjsCanvas.yellowSolidArrow[0].draw();
                this.bjsCanvas.yellowSolidArrow[1].draw();
                this.bjsCanvas.yellowSolidArrow[2].draw();
                // 显示黄色箭头 分两种
                if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[0].y()) {
                    // 显示黄色实线箭头

                    this.bjsCanvas.yellowSolidArrow[6].visible(true);
                    this.bjsCanvas.yellowSolidArrow[7].visible(true);
                    this.bjsCanvas.yellowSolidArrow[8].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[11].visible(false);
                    this.bjsCanvas.blueSolidArrow[13].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[6].visible(false);
                    this.bjsCanvas.yellowFrame[5].visible(true);

                } else if (this.bjsCanvas.ch2oh.y() === this.bjsCanvas.blueDottedLineFrame[1].y()) {
                    // 显示黄色实线箭头
                    this.bjsCanvas.yellowSolidArrow[3].visible(true);
                    this.bjsCanvas.yellowSolidArrow[4].visible(true);
                    this.bjsCanvas.yellowSolidArrow[5].visible(true);

                    // 隐藏蓝色实线箭头
                    this.bjsCanvas.blueSolidArrow[6].visible(false);
                    this.bjsCanvas.blueSolidArrow[9].visible(false);
                    this.bjsCanvas.blueSolidArrow[10].visible(false);
                    this.bjsCanvas.blueSolidArrow[12].visible(false);

                    // 隐藏黄色框
                    this.bjsCanvas.blueDottedLineFrame[5].visible(false);
                    this.bjsCanvas.yellowFrame[4].visible(true);
                }
            }

            this.bjsCanvas.staticLayer.draw();
        });
    }
}

