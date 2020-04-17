import {default as Konva, FastLayer, Layer, Stage, Tween} from 'konva';
import * as sjx1 from '../sub_static/01.png';
import * as sjx5 from '../sub_static/05.png';

/**
 *加一个三角形逻辑类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/3 14:23
 */
export class AddTriangle {

    stage: Stage;
    layer: FastLayer;
    rtTriangle: Konva.Image;
    ltTriangle: Konva.Image;

    ltTween: Tween;
    rtTween: Tween;

    completeTriangle: Konva.Image;

    constructor(stage: Stage) {
        this.stage = stage;

        this.init();

    }

    init() {
        this.layer = new FastLayer();
        /* 三角形 */
        const imageObj = new Image();
        const sjxWidth  = 270;
        const sjxHeight = 270;

        imageObj.onload = () => {
            this.rtTriangle = new Konva.Image({
                x: this.stage.getWidth() / 2 - sjxWidth / 2,
                y: this.stage.getHeight() / 2 - sjxHeight / 2,
                image: imageObj,
                width: sjxWidth,
                height: sjxHeight
            });


            //this.rtTriangle.transformsEnabled('position');
            this.rtTriangle.listening(false);
            this.rtTriangle.cache();

            this.rtTriangle.hide();

            this.layer.add(this.rtTriangle);
            this.stage.add(this.layer);


            this.ltTriangle = this.rtTriangle.clone({x: -270, y : sjxHeight + 65 });
            //this.ltTriangle.cache();
            this.ltTriangle.hide();

            this.ltTriangle.rotation(-90);
            this.layer.add(this.ltTriangle);
            this.stage.add(this.layer);


            this.initAnimation();
        };
        imageObj.src = (sjx1 as any);


        /* 最终效果三角形 */
        const finalImgObj = new Image();
        const finalImgWidth  = sjxWidth * 2;
        const finalImgHeight = sjxHeight;
        finalImgObj.onload = () => {
            this.completeTriangle = new Konva.Image({
                x: this.stage.getWidth() / 2 - sjxWidth,
                y: this.stage.getHeight() / 2 - sjxHeight / 2,
                name: 'finalImg',
                image: finalImgObj,
                width: finalImgWidth,
                height: finalImgHeight
            });
            this.completeTriangle.hide();
            this.layer.add(this.completeTriangle);
            this.stage.add(this.layer);

        };
        finalImgObj.src = sjx5 as any;
        this.createText();
        this.layer.hide();
    }

    initAnimation() {
        this.ltTween = new Konva.Tween({
            node: this.ltTriangle ,
            duration: 2,
            x: this.stage.getWidth() / 2 - this.ltTriangle.width() + 2
        });

        this.rtTween = new Konva.Tween({
            node: this.rtTriangle ,
            duration: 2,
            x: this.stage.getWidth() / 2,
            onFinish: () => {
                console.log('finish');
                this.completeTriangle.show();
                if (this.layer.find('.text').length === 2) {
                    this.layer.find('.text')[0].show();
                    this.layer.find('.text')[1].show();
                }
            }
        });

    }

    createText() {
        const text = new Konva.Text({
            x: 190,
            y: this.stage.getHeight() / 2 - 10 ,
            text: '10',
            fontSize: 25,
            fill: 'black'
        });
        text.addName('text');
        text.hide();
        const text2 = text.clone({x: 525, y: this.stage.getHeight() / 2 - 10 });
        text2.hide();
        this.layer.add(text);
        this.layer.add(text2);
    }

    runAnimation() {
        this.layer.show();
        this.ltTriangle.show();
        this.rtTriangle.show();

        this.ltTween.play();
        this.rtTween.play();
    }

    reset() {
        this.ltTween.reset();
        this.rtTween.reset();
        //还原位置
        this.rtTriangle.position({
            x: this.stage.getWidth() / 2 - this.rtTriangle.getWidth() / 2,
            y: this.stage.getHeight() / 2 - this.rtTriangle.getHeight() / 2});
        this.ltTriangle.position({x: -270, y : this.ltTriangle.getHeight() + 65 });



        if (this.layer.find('.text').length === 2) {
            this.layer.find('.text')[0].hide();
            this.layer.find('.text')[1].hide();
        }



        //隐藏图形
        this.completeTriangle.hide();
        this.ltTriangle.hide();
        this.rtTriangle.hide();



        this.layer.draw();
    }
}
