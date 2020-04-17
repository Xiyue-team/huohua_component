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

    constructor(bjsCanvas: BjsCanvas) {
        this.bjsCanvas = bjsCanvas;
        this.bjsConfig = new BjsConfig();
    }

    // 给第1次能拖进去的分子式绑定拖动事件
    dragMove(image: Konva.Image, frame: Konva.Image, config: any, image2: Konva.Image) {
        this.bjsCanvas.staticLayer.setZIndex(0);
        this.bjsCanvas.animationLayer.setZIndex(1);

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
                    // this.bjsCanvas.blueSolidArrow[0].visible(true);
                    // this.bjsCanvas.blueSolidArrow[1].visible(true);
                    // this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
                }

                if (Number.parseInt(frame.id()) === 2 && Number.parseInt(image.id()) === 1) {
                    // ch2oh 拖动到下框框
                    // this.bjsCanvas.blueSolidArrow[1].visible(true);
                    // this.bjsCanvas.blueSolidArrow[2].visible(true);
                    // this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
                }

                if (Number.parseInt(frame.id()) === 1 && Number.parseInt(image.id()) === 5) {
                    // cooh拖动到上边框
                    // this.bjsCanvas.blueSolidArrow[0].visible(true);
                    // this.bjsCanvas.blueDottedLineFrame[0].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
                }

                if (Number.parseInt(frame.id()) === 2 && Number.parseInt(image.id()) === 5) {
                    // cooh拖动到下边框

                    // this.bjsCanvas.blueSolidArrow[2].visible(true);
                    // this.bjsCanvas.blueDottedLineFrame[1].visible(false);
                    this.bjsCanvas.staticLayer.draw();

                    this.value += 1;
                    this.allValue += 1;
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


                        this.allValue += 1;
                    }

                    // ch2cl 拖动到框里
                    if (Number.parseInt(frame.id()) === 7 && Number.parseInt(image.id()) === 4) {
                        // ch2cl在上面



                        this.value += 1;
                        this.allValue += 1;
                    }

                    // ch2cl 拖动到框里
                    if (Number.parseInt(frame.id()) === 6 && Number.parseInt(image.id()) === 4) {

                        this.value += 1;
                        this.allValue += 1;
                    }


                    // ch3 拖动到框里后
                    if (Number.parseInt(frame.id()) === 5 && Number.parseInt(image.id()) === 6) {



                        this.value += 1;
                        this.allValue += 1;
                    }

                    this.bjsCanvas.staticLayer.draw();
                    this.bjsCanvas.animationLayer.draw();
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

            // for (let k = 0; k < this.bjsCanvas.formulaImage.length; k++) {
            //     this.bjsCanvas.formulaImage[k].visible(false);
            //     this.bjsCanvas.yellowCircle[k].visible(false);
            // }

            this.bjsCanvas.animationLayer.draw();
        });

        image.on('mouseup touchend', () => {
            if (frame.x() !== image.x()) {
                image.x(x);
                image.y(y);
                this.bjsCanvas.staticLayer.draw();
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

                    this.allValue += 1;
                  }

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

            // for (let k = 0; k < this.bjsCanvas.formulaImage.length; k++) {
            //     this.bjsCanvas.formulaImage[k].visible(false);
            //     this.bjsCanvas.yellowCircle[k].visible(false);
            // }

            this.bjsCanvas.animationLayer.draw();
        });

        image.on('mouseup touchend', () => {
            if (frame.x() !== image.x()) {
                image.x(x);
                image.y(y);
                this.bjsCanvas.staticLayer.draw();
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
    clickEvent(image: Konva.Image, frame: Konva.Image, image2: Konva.Image) {

        image.on('click tap', () => {

            frame.visible(true);
            image2.visible(true);

            image2.moveToTop();
            frame.moveToTop();
            this.bjsCanvas.animationLayer.draw();
            // frame.draw();
            // image2.draw();
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
                yellowCircle[k].visible(false);
            }

            this.bjsCanvas.animationLayer.draw();
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
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
            //     this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
            //     this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);
            //
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
            //     this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
            //     this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
            //     this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
            //     this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
            //     this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
            //     this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
            //     this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
            //     this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }

            this.bjsCanvas.staticLayer.draw();
        });

        document.addEventListener('touchcancel', () => {
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
            //     this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
            //     this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);
            //
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
            //     this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
            //     this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
            //     this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
            //     this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
            //     this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
            //     this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
            //     this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
            //     this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }

            this.bjsCanvas.staticLayer.draw();
        });

        document.addEventListener('touchend', () => {
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.ch2oh.x()) {
            //     this.bjsCanvas.ch2oh.x(this.bjsConfig.ch2ohConfig.x);
            //     this.bjsCanvas.ch2oh.y(this.bjsConfig.ch2ohConfig.y);
            //
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[0].x() !== this.bjsCanvas.cooh.x()) {
            //     this.bjsCanvas.cooh.x(this.bjsConfig.coohConfig.x);
            //     this.bjsCanvas.cooh.y(this.bjsConfig.coohConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[2].x() !== this.bjsCanvas.cho.x()) {
            //     this.bjsCanvas.cho.x(this.bjsConfig.choConfig.x);
            //     this.bjsCanvas.cho.y(this.bjsConfig.choConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[3].x() !== this.bjsCanvas.chcl2.x()) {
            //     this.bjsCanvas.chcl2.x(this.bjsConfig.chcl2Config.x);
            //     this.bjsCanvas.chcl2.y(this.bjsConfig.chcl2Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[4].x() !== this.bjsCanvas.ch3.x()) {
            //     this.bjsCanvas.ch3.x(this.bjsConfig.ch3Config.x);
            //     this.bjsCanvas.ch3.y(this.bjsConfig.ch3Config.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[5].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }
            //
            // if (this.bjsCanvas.blueDottedLineFrame[6].x() !== this.bjsCanvas.ch2cl.x()) {
            //     this.bjsCanvas.ch2cl.x(this.bjsConfig.ch2clConfig.x);
            //     this.bjsCanvas.ch2cl.y(this.bjsConfig.ch2clConfig.y);
            // }

            this.bjsCanvas.staticLayer.draw();
        });

        this.bjsCanvas.stage.on('mouseup', () => {
            // 外围边框都填满
            console.log('在上面');
            this.bjsCanvas.staticLayer.draw();
        });
    }
}

