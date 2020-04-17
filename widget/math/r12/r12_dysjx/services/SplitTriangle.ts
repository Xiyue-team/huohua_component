/**
 *拆三角形
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/3 14:23
 */
import { default as Konva, Group, Layer, Stage, Tween} from 'konva';
import * as sjx2 from '../sub_static/02.png';
import * as sjx3 from '../sub_static/03.png';
import * as sjx4 from '../sub_static/04.png';
import * as sjx7 from '../sub_static/07.png';

import * as jiandao from '../sub_static/jiandao.png';

export class SplitTriangle {

    stage: Stage;
    layer: Layer;

    //剪刀动画
    jiandaoTween: Tween;

    //两个三角形切割动画
    split1Tween: Tween;
    split2Tween: Tween;

    //两个三角形合并动画
    splicing1Tween: Tween;
    splicing2Tween: Tween;


    constructor(stage: Stage) {
        this.stage = stage;
        this.init();
    }

    init() {
        this.layer = new Layer();

        /*虚线三角形*/
        const sjx2Obj = new Image();
        const sjx2ObjWidth = 270;
        const sjx2ObjHeight = 270;


        this.layer.position( {x: 0, y: -85});

        let sjxImg;

        sjx2Obj.onload = () => {
            sjxImg = new Konva.Image({
                x: this.stage.getWidth() / 2 - sjx2ObjWidth / 2 ,
                y: 150,
                image: sjx2Obj,
                width: sjx2ObjWidth,
                height: sjx2ObjHeight,
                name: 'dashTriangle'
            });

            sjxImg.cache();
            sjxImg.listening(false);
            sjxImg.hide();

            this.layer.add(sjxImg);
            this.stage.add(this.layer);

            this.createJianDao();

        };
        sjx2Obj.src = sjx2 as any ;


        /*边长为5的三角形*/
        const sjx3Obj = new Image();
        const sjx3ObjWidth = 135;
        const sjx3ObjHeight = 270;

        let sjxImg2;
        sjx3Obj.onload = () => {
            sjxImg2 = new Konva.Image({x: this.stage.getWidth() / 2 - sjx3ObjWidth, y: 152, image: sjx3Obj, width: sjx3ObjWidth,
                height: sjx3ObjHeight,
                name: 'triangle1'
            });

            sjxImg2.cache();
            sjxImg2.listening(false);

            sjxImg2.hide();

            this.layer.add(sjxImg2);
            this.stage.add(this.layer);

        };
        sjx3Obj.src = sjx3 as any ;

        /*边长为5的小三角形 */
        const sjx4Obj = new Image();
        const sjx4ObjWidth = 270;
        const sjx4ObjHeight = 135;

        sjx4Obj.onload = () => {
            const sjx4Img = new Konva.Image({ x: this.stage.getWidth() / 2 - sjx4ObjWidth / 2 , y: 262 + 27, image: sjx4Obj,
                width: sjx4ObjWidth, height: sjx4ObjHeight, name: 'triangle2'
            });
            sjx4Img.cache();
            sjx4Img.listening(false);
            sjx4Img.hide();

            this.layer.add(sjx4Img);
            this.stage.add(this.layer);

        };
        sjx4Obj.src = sjx4 as any ;



            /* 创建正方形 */

        const rectangleObj = new Image();
        const rectangleWidth = 272;
        const rectangleHeight = 272;

        let rectangleImg;

        rectangleObj.onload = () => {
            rectangleImg = new Konva.Image({
                x: this.stage.getWidth() / 2 - rectangleWidth / 2,
                y: this.stage.getHeight() / 2 - rectangleHeight / 2 + 30,
                image: rectangleObj,
                width: rectangleWidth,
                height: rectangleHeight,
                name: 'rectangle'
            });

            rectangleImg.cache();
            rectangleImg.listening(false);
            rectangleImg.hide();
            this.layer.add(rectangleImg);
            this.stage.add(this.layer);


            //this.createText();
        };
        rectangleObj.src = sjx7 as any ;
        this.createText();
        this.createRectangleText();
        this.layer.hide();
    }

    createJianDao() {
        /*剪刀*/
        const jiandaoObj = new Image();
        const jiandaoWidth = 130;
        const jiandaoHeight = 130;
        jiandaoObj.onload = () => {
            let jiandaoImg;
            jiandaoImg = new Konva.Image({
                x: this.stage.getWidth() / 2 + 90,
                y: this.stage.getHeight() / 2 + 70,
                image: jiandaoObj,
                width: jiandaoWidth,
                height: jiandaoHeight,
                name: 'jiandao'
            });
            jiandaoImg.cache();
            jiandaoImg.listening(false);
            jiandaoImg.hide();

            jiandaoImg.rotation(-140);
            this.layer.add(jiandaoImg);
            this.stage.add(this.layer);

            this.createJianDaoAnimation(jiandaoImg);

        };
        jiandaoObj.src = (jiandao as any);
    }

    createText() {

        /*创建文字*/
        const text = new Konva.Text({
            x: 300,
            y: this.stage.getHeight() / 2 + 80 ,
            text: '5',
            fontSize: 25,
            fill: 'black'
        });
        const text2 = text.clone({x: 320, y: this.stage.getHeight() / 2 - 20});
        const text3 = text.clone({x: 430, y: this.stage.getHeight() / 2 + 90 });

        const group = new Group();
        group.addName('animation1_txt');

        group.add(text);
        group.add(text2);
        group.add(text3);
        group.position({x: 0, y: 30});
        group.hide();
        this.layer.add(group);


        const group2 = new Group();
        group2.addName('animation2_txt');
        const text4 = new Konva.Text({x: 320, y: this.stage.getHeight() / 2 + 100 , text: '5', fontSize: 25, fill: 'black'});
        const text5 = text4.clone({x: 440, y: this.stage.getHeight() / 2 + 100 });


        const text6 = text4.clone({x: 330 - 10 , y: this.stage.getHeight() / 2 + 70 });
        text6.rotation(45);

        const text7 = text4.clone({x: 320 - 30 , y: this.stage.getHeight() / 2 - 60});
        text7.rotation(45);

        group2.add(text4);
        group2.add(text5);
        group2.add(text6);
        group2.add(text7);
        group2.position({x: 30, y: 10});
        group2.hide();
        this.layer.add(group2);


        // text4.hide();
        // text5.hide();
        // text6.hide();
        // text7.hide();

        //this.layer.add(text2);
        //this.layer.add(text3);
      /*  this.layer.add(text4);
        this.layer.add(text5);
        this.layer.add(text6);
        this.layer.add(text7);*/

        //this.group2.fi
    }


    createJianDaoAnimation(image: Konva.Image) {
        /*剪刀动画*/
        this.jiandaoTween = new Konva.Tween({
            node: image ,
            duration: 3,
            x: 180 - 65,
            y: 576 + 85,
            onFinish: () => {
                if (this.layer.findOne('.animation1_txt')) {
                    this.layer.findOne('.animation1_txt').hide();
                }
                if (this.layer.findOne('.dashTriangle')) {
                    this.layer.findOne('.dashTriangle').hide();
                }
                if (this.layer.findOne('.triangle1')) {
                    this.layer.findOne('.triangle1').show();
                }
                if (this.layer.findOne('.triangle2')) {
                    this.layer.findOne('.triangle2').show();
                }
                const node1 = this.layer.findOne('.triangle1');

                const node2 = this.layer.findOne('.triangle2');

                if (node1) {
                    this.split1Tween = new Konva.Tween({ node: node1 , duration: 2, x: 251 - 20, y: 118,
                        onFinish: () => {
                            this.layer.findOne('.animation2_txt').show();
                            this.splicing1Tween = new Konva.Tween({ node: node1 , duration: 2, x: this.stage.getWidth() / 2 - 2,
                                y: this.stage.getHeight() / 2 - node1.getHeight() / 2 + 30  });
                        }
                    });
                    this.split1Tween.play();
                }



                if (node2) {
                    this.split2Tween = new Konva.Tween({
                        // 262 + 27
                        node: node2 , duration: 2, x:  281.5, y: 262 + 27,
                        onFinish: () => {
                            (window as any).viewHandler.viewModel.$data.splicingTriangle = true;
                            this.splicing2Tween = new Konva.Tween({
                                node: node2 ,
                                duration: 2,
                                x: this.stage.getWidth() / 2 - node2.getWidth() / 2,
                                y: this.stage.getHeight() / 2 + node2.getHeight() / 2 + 95,
                                rotation: -90,
                                onFinish: () => {
                                    this.layer.findOne('.triangle1').hide();
                                    this.layer.findOne('.triangle2').hide();

                                    this.layer.findOne('.rectangle').show();
                                    this.layer.findOne('.rectangle_text').show();

                                }

                            });
                        }
                    });
                    this.split2Tween.play();
                }

            }
        });

        //tween.play();
    }

    //创建合并三角形的动画
    splicingTriangleAnimation() {
        this.splicing1Tween.play();
        this.splicing2Tween.play();
        this.layer.findOne('.animation2_txt').hide();

    }

    showTriangle() {
        this.layer.findOne('.dashTriangle').show();
        this.layer.findOne('.jiandao').show();
        this.layer.draw();
    }


    runAnimation() {

        this.showTriangle();
        //setTimeout(() => {
            this.jiandaoTween.play();
        //}, 1000);
        //this.layer.findOne('.animation1_txt').show();
        this.layer.show();

    }

    reset() {

        //重置动画
        this.resetAnimation();
        //还原剪刀位置并隐藏
        this.layer.findOne('.jiandao').position({ x: this.stage.getWidth() / 2 + 60,
            y: this.stage.getHeight() / 2 + 70});
        this.layer.findOne('.jiandao').hide();

        //隐藏文字
        this.layer.findOne('.animation1_txt').hide();
        this.layer.findOne('.animation2_txt').hide();

        //还原边长为5的小三角形
        this.layer.findOne('.triangle1').position({
            x: this.stage.getWidth() / 2 - this.layer.findOne('.triangle1').getWidth(), y: 152});
        this.layer.findOne('.triangle1').hide();

        this.layer.findOne('.triangle2').position({
            x: this.stage.getWidth() / 2 - this.layer.findOne('.triangle2').getWidth() / 2 , y: 262 + 27});
        this.layer.findOne('.triangle2').hide();

        //隐藏最终的正方形
        this.layer.findOne('.rectangle').hide();
        this.layer.findOne('.rectangle_text').hide();
        this.layer.findOne('.dashTriangle').hide();


        this.layer.draw();

    }

    //重置动画
    resetAnimation() {
        if (this.split1Tween) {
            this.split1Tween.reset();
        }
        if (this.split2Tween) {
            this.split2Tween.reset();
        }
        if (this.jiandaoTween) {
            this.jiandaoTween.reset();
        }

        if (this.splicing1Tween) {
            this.splicing1Tween.reset();
        }
        if (this.splicing2Tween) {
            this.splicing2Tween.reset();
        }

    }

    createRectangleText() {
        const text = new Konva.Text({
            x: 300,
            y: this.stage.getHeight() / 2 - 80 ,
            text: '5',
            fontSize: 25,
            fill: 'black'
        });
        const group = new Group();
        group.addName('rectangle_text');


        const text2 = text.clone({x: 430, y: this.stage.getHeight() / 2 - 80 });
        const text3 = text.clone({x: 300, y: this.stage.getHeight() / 2 + 130 });
        const text4 = text.clone({x: 430, y: this.stage.getHeight() / 2 + 130 });

        group.add(text);
        group.add(text2);
        group.add(text3);
        group.add(text4);
        group.hide();
        this.layer.add(group);
    }


}
