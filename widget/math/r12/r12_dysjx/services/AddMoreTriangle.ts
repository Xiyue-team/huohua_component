/**
 **加三个三角形逻辑类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/3 14:23
 */
import {default as Konva,  Layer, Stage, Tween} from 'konva';
import * as sjx1 from '../sub_static/01.png';
import * as sjx6 from '../sub_static/06.png';

/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/3 14:23
 */
export class AddMoreTriangle {

    stage: Stage;
    layer: Layer;

    //四个三角形
    triangle1: Konva.Image;
    triangle2: Konva.Image;
    triangle3: Konva.Image;
    triangle4: Konva.Image;

    completeTriangle: Konva.Image;

    //四个三角形动画
    tween1: Tween;
    tween2: Tween;
    tween3: Tween;
    tween4: Tween;

    constructor(stage: Stage) {
        this.stage = stage;
        this.layer = new Layer();
        this.init();

    }

    init() {

        /* 三角形 */
        const imageObj = new Image();
        const sjxWidth  = 270;
        const sjxHeight = 270;
        const scale = 0.7;

        imageObj.onload = () => {
            this.triangle1 = new Konva.Image({
                x: this.stage.getWidth() / 2 - sjxWidth / 2,
                y: this.stage.getHeight() / 2 - sjxHeight / 2,
                image: imageObj,
                width: sjxWidth,
                height: sjxHeight
            });
            this.triangle1.listening(false);
            this.triangle1.cache();
            this.triangle1.hide();


            this.layer.add(this.triangle1);
            this.stage.add(this.layer);



            this.triangle2 = this.triangle1.clone({x: this.stage.getWidth() / 2 - sjxWidth * scale  , y : sjxHeight - 70 });
            this.triangle2.scale({x: scale, y: scale});
            this.triangle2.rotation(-90);
            this.triangle2.opacity(0);
            this.triangle2.show();
            this.layer.add(this.triangle2);
            this.stage.add(this.layer);

            this.triangle3 = this.triangle2.clone({x: this.stage.getWidth() / 2  , y : sjxHeight + 119 });
            this.triangle3.rotation(-180);
            this.triangle3.opacity(0);
            this.layer.add(this.triangle3);
            this.stage.add(this.layer);

            this.triangle4 = this.triangle2.clone({x: this.stage.getWidth() / 2 + sjxWidth * scale , y : sjxHeight / 2 + 65 });
            this.triangle4.rotation(90);
            this.triangle4.opacity(0);
            this.layer.add(this.triangle4);
            this.stage.add(this.layer);

            this.initAnimation();
            //this.runAnimation();
        };
        imageObj.src = (sjx1 as any);


      /* 最终效果正方形 */
        const finalImgObj = new Image();
        const finalImgWidth  = 400;
        const finalImgHeight = 400;
        finalImgObj.onload = () => {
            this.completeTriangle = new Konva.Image({
                x: this.stage.getWidth() / 2 - finalImgWidth / 2 + 10,
                y: 11,
                image: finalImgObj,
                width: finalImgWidth,
                height: finalImgHeight
            });
            this.completeTriangle.scale({x: 0.95, y: 0.95});
            this.completeTriangle.hide();
            this.layer.add(this.completeTriangle);
            this.stage.add(this.layer);

        };
        finalImgObj.src = sjx6 as any;
        this.layer.hide();
        this.createText();
    }

    initAnimation() {
        this.tween1 = new Konva.Tween({
            node: this.triangle1 ,
            opacity: 1,
            x: this.stage.getWidth() / 2 ,
            y: 11,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 2,
            onFinish: () => {
                this.tween2.play();
                this.tween3.play();
                this.tween4.play();
            }
        });

        this.tween2 = new Konva.Tween({
            node: this.triangle2 ,
            opacity: 1,
            duration: 2
        });
        this.tween3 = new Konva.Tween({
            node: this.triangle3 ,
            opacity: 1,
            duration: 2
        });
        this.tween4 = new Konva.Tween({
            node: this.triangle4 ,
            opacity: 1,
            duration: 2,
            onFinish: () => {
                this.completeTriangle.show();
                this.layer.find('.text1')[0].show();
                this.layer.find('.text1')[1].show();
                this.layer.find('.text1')[2].show();
                this.layer.find('.text1')[3].show();

            }
        });

    }

    /**
     * 边长标注文字
     */
    createText() {
        const text = new Konva.Text({
            x: 250,
            y: this.stage.getHeight() / 2 - 130 ,
            text: '10',
            fontSize: 25,
            fill: 'black'
        });
        text.addName('text1');


        const text2 = text.clone({x: 250, y: this.stage.getHeight() / 2 + 110 });
        const text3 = text.clone({x: 460, y: this.stage.getHeight() / 2 - 130 });
        const text4 = text.clone({x: 460, y: this.stage.getHeight() / 2 + 110 });

        text.hide();
        text2.hide();
        text3.hide();
        text4.hide();

        this.layer.add(text);
        this.layer.add(text2);
        this.layer.add(text3);
        this.layer.add(text4);
    }

    runAnimation() {
        this.layer.show();

        this.triangle1.show();
        this.tween1.play();
    }

    reset() {
        //还原动画
        this.tween1.reset();
        this.tween2.reset();
        this.tween3.reset();
        this.tween4.reset();

        //还原图片状态
        this.triangle1.position({  x: this.stage.getWidth() / 2 - this.triangle1.getWidth() / 2,
            y: this.stage.getHeight() / 2 - this.triangle1.getHeight() / 2});
        this.triangle1.scale({x: 1, y: 1});
        this.triangle2.opacity(0);
        this.triangle3.opacity(0);
        this.triangle4.opacity(0);

        //隐藏图片
        this.completeTriangle.hide();
        this.triangle1.hide();

        //隐藏文字
        if (this.layer.find('.text1').length === 4 ) {
            this.layer.find('.text1')[0].hide();
            this.layer.find('.text1')[1].hide();
            this.layer.find('.text1')[2].hide();
            this.layer.find('.text1')[3].hide();
        }

        this.layer.draw();
    }

}
