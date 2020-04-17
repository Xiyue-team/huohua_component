
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {default as Konva, Group, Layer, Stage } from 'konva';

import * as naCopy from '../sub_static/NACopy@2x.png';
import * as himage from '../sub_static/H@2x.png';
import * as climage from '../sub_static/CL@2x.png';
import * as rightmage from '../sub_static/right@2x.png';
import * as wrongimage from '../sub_static/wrong@2x.png';
import * as chcooimage from '../sub_static/CHCOO@2x.png';
import * as chcoohimage from '../sub_static/CHCOOH@2x.png';
import * as choimage from '../sub_static/CHO@2x.png';
import * as chohimage from '../sub_static/CHOH@2x.png';
import * as coimage from '../sub_static/CO@2x.png';
import * as h2co3image from '../sub_static/H2CO3@2x.png';
import * as hcoimage from '../sub_static/HCO@2x.png';
import {ViewController} from '../../../../../src/core/ViewController';
import {ImageObj} from './ImageObj';
import {TimelineLite, TweenMax, Power0 } from 'gsap';

export class WeakAcidViewHandler extends CommonViewHandler implements ViewHandler {
    imgObjs: ImageObj;

    private stage:  Stage;
    private layer:  Layer;
    //存放钠图片的组
    private group:  Group;
    //存放初始界面大圆和四个小圆数组
    private container:  Array<any> = [];
    //四个酸根离子
    private imageArryContainer:  Array<Konva.Image> = [];
    //存放氢离子数组
    private imageArrayH:  Array<Konva.Image> = [];
    //存放氯离子数组
    private imageArrayCL:  Array<Konva.Image> = [];
    //存放钠离子数组
    private imageArryNa:  Array<Konva.Image> = [];
    //存放酸的数组
    private imageArrayBox:  Array<Konva.Image> = [];
    //切换后下面的四个小圆
    private arryBoxBottom:  Array<any> = [];
    //错误图片
    private imageErro:  Konva.Image;
    //正确图片
    private imageCorret:  any;
    //创建组
    //存放酸的组
    private grouptwo:  Group;
    //存放氯离子组
    private groupthree:  Group;
    //存放文字组
    private textGroup:  Group;

    private textArry:  Array<any> = [];

    //记录拖拽图片的id和位置
    private mapArry:  Map<number, object> = new Map();
    private objArry: Array<any> = [];

    //4个氯离子下移动画2
    tweenFour: any;
    tweenFive: any;
    tweenSix: any;
    tweenSeven: any;

    //钠离子隐藏动画
    naTween: any;
    //时间链对象
    timeLine: TimelineLite = null;

    //层的不规则动画
    bgzTweenTwo: any;

    //4个酸根不规则运动动画
    suanSportOne: any;
    suanSportTwo: any;
    suanSportThree: any;
    suanSportFour: any;

    //4个氯离子不规则动画
    clSportOne: any;
    clSportTwo: any;
    clSportThree: any;
    clSportFour: any;

    //酸的上移动画
    sportOne: any;
    sportTwo: any;
    sportThree: any;
    sportFour: any;


    //抢氢酸根离子动画
   benfentween1: any;
   cusuantween1: any;
   tansuantween1: any;

   resetbentween1: any;
   resetcusuantween1: any;
   resettansuantween1: any;

    cusuantween2: any;
    tansuantween2: any;

    resetcusuantween2: any;
    resettansuantween2: any;

    cusuantween3: any;

    resetcusuantween3: any;

   //四个氯离子下移动画1
    clTween1: any;
    clTween2: any;
    clTween3: any;
    clTween4: any;


    //氢离子下移动画
    hTween1: any;

    //四个酸根离子上移动画
    suangenTween1: any;
    suangenTween2: any;
    suangenTween3: any;
    suangenTween4: any;


    time1: any;
    time2: any;
    time3: any;
    time4: any;
    time5: any;

    //开启边界检测开关
     control = false;

     //钠离子不规则运动动画
    bgzNaTween1: any;
    bgzNaTween2: any;
    bgzNaTween3: any;
    bgzNaTween4: any;
    bgzNaTween5: any;

    //存放酸的初始位置
    imagePositionConfig: Map<string, object> = new Map();

    //构造函数
    constructor(vm:  Vue) {
        super(vm);
         this.imgObjs = new ImageObj();
    }

    domReady() {
        super.domReady();
         this.initElement();
        ViewController.getInstance().hideLoading();
    }

    //初始化元素
     initElement() {
         this.initStage();
         this.initLayer();
         this.initGroup();
         this.initContainerCirlce();
         this.initImageBottom();
         this.initImage();
    }

    //初始化舞台
    initStage() {
         this.stage = new Konva.Stage({
            container  :  'box',
            width  :  1000,
            height  :  720,
        });
    }

    //初始化层
    initLayer() {
         this.layer = new Konva.Layer();
    }

    //初始化组
    initGroup() {
         this.group = new Konva.Group();
         this.grouptwo = new Konva.Group();
         this.groupthree = new Konva.Group();
         this.textGroup = new Konva.Group();
    }

    //初始页面一个大圆和4个小圆
    initContainerCirlce() {

         this.container[0] = new Konva.Circle({
            x  :  ( this.stage.getWidth()  *  0.236) + 195,
            y  :  ( this.stage.getHeight()  *  0.273) + 195,
            radius  :  195,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            opacity  :  0.29,
            strokeWidth  :  3,
        });

         this.container[1] = new Konva.Circle({
             id: 'ch3coohContent',
            x  :   this.stage.getWidth()  *  0.151 + 60,
            y  :   this.stage.getHeight()  *  0.247 + 60,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
        });

         this.container[2] = new Konva.Circle({
             id: 'tanhContent',
            x  :   this.stage.getWidth()  *  0.288 + 60,
            y  :   this.stage.getHeight()  *  0.064 + 60,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
        });


         this.container[3]  = new Konva.Circle({
             id: 'h2co3Content',
            x  :   this.stage.getWidth()  *  0.442 + 60,
            y  :   this.stage.getHeight()  *  0.061 + 60,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
        });

         this.container[4]  =  new Konva.Circle({
             id: 'c6h5ohContent',
            x  :   this.stage.getWidth()  *  0.576 + 60,
            y  :   this.stage.getHeight()  *  0.229 + 60,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
        });

         this.layer.add( this.container[0]);
         this.layer.add( this.container[1] );
         this.layer.add( this.container[2] );
         this.layer.add( this.container[3] );
         this.layer.add( this.container[4] );
         this.stage.add( this.layer);
    }

    //初始化所有图片
    initImage() {
         this.initImageContainer();
         this.initImageBox();
        this.initImageNa();
        this.initImageH();
        this.initImageCL();
        this.animateRongye();
    }

    //初始化图片na
   async initImageNa() {

        const imageArry:  Array<any> = [];
        imageArry[0] =  new Image();
        imageArry[0].src = naCopy;
        imageArry[0].onload = ()  => {
             this.imageArryNa[0] = new Konva.Image({
                x  :   this.stage.getWidth()  *  0.361 + 30,
                y  :   this.stage.getHeight()  *  0.542 + 20,
                image  :  imageArry[0],
                width  :  45,
                height  :  45
            });
             this.group.add(  this.imageArryNa[0]);
             this.layer.add( this.group);
             this.stage.add( this.layer);

            const trackPath = this.getGuijiOne(this.imageArryNa[0]);
           this.bgzNaTween1 = TweenMax.to(this.imageArryNa[0], 8, {bezier: trackPath, yoyo: true, repeat: -1});
        };


        imageArry[1] = new Image();
        imageArry[1].src = naCopy;
        imageArry[1].onload = () => {
             this.imageArryNa[1] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.532 + 10,
                y  :   this.stage.getHeight() * 0.503,
                image  :   imageArry[1],
                width  :  45,
                height  :  45
            });
             this.group.add( this.imageArryNa[1]);
             this.layer.add( this.group);
             this.stage.add( this.layer);

            const trackPath = this.getGuijiTwo(this.imageArryNa[1]);
            this.bgzNaTween2 = TweenMax.to(this.imageArryNa[1], 8, {bezier: trackPath, yoyo: true, repeat: -1});
        };

        imageArry[2] = new Image();
        imageArry[2].src = naCopy;
        imageArry[2].onload = () => {
             this.imageArryNa[2] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.457,
                y  :   this.stage.getHeight() * 0.573,
                image  :  imageArry[2],
                width  :  45,
                height  :  45
            });
             this.group.add(  this.imageArryNa[2]);
             this.layer.add( this.group);
             this.stage.add( this.layer);

            const trackPath = this.getGuijiThree(this.imageArryNa[2]);
            this.bgzNaTween3 = TweenMax.to(this.imageArryNa[2], 8, {bezier: trackPath, yoyo: true, repeat: -1});

            this.animateNa(this.imageArryNa[2]);
        };

        imageArry[3] = new Image();
        imageArry[3].src = naCopy;
        imageArry[3].onload = () => {
             this.imageArryNa[3] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.488 + 15,
                y  :   this.stage.getHeight() * 0.766 - 50,
                image  :  imageArry[3],
                width  :  45,
                height  :  45
            });
             this.group.add(  this.imageArryNa[3]);
             this.layer.add( this.group);
             this.stage.add( this.layer);

            const trackPath = this.getGuijiFour(this.imageArryNa[3]);
            this.bgzNaTween4 =  TweenMax.to(this.imageArryNa[3], 8, {bezier: trackPath, yoyo: true, repeat: -1});
        };

        imageArry[4] = new Image();
        imageArry[4].src = naCopy;
        imageArry[4].onload = () => {
             this.imageArryNa[4] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.37,
                y  :   this.stage.getHeight() * 0.833 - 70,
                image  :  imageArry[4],
                width  :  45,
                height  :  45
            });
             this.group.add( this.imageArryNa[4]);
             this.layer.add( this.group);
             this.stage.add( this.layer);

            const trackPath = this.getCurrentModelTrackPath(this.imageArryNa[4]);
            this.bgzNaTween5 =  TweenMax.to(this.imageArryNa[4], 8, {bezier: trackPath, yoyo: true, repeat: -1});

        };


        const image = new Image();
        image.src = wrongimage as any;
        image.onload = () => {
            this.imageErro = new Konva.Image({
                x  :  186 - 40 + 20 - 10,
                y  :  88,
               width  : 654,
               height  : 405,
               image  :  image,
               visible  : false,
            });
            this.imageErro.setZIndex(50);
             this.layer.add( this.imageErro);
             this.stage.add( this.layer);
        };

        const imagetwo = new Image();
        imagetwo.src = rightmage as any;
        imagetwo.onload = () => {
             this.imageCorret = new Konva.Image({
                x  :  186 - 40 + 14,
                y  :  88,
                width  : 654,
                height  : 405,
                image  :  imagetwo,
                visible  : false,
            });
            this.imageCorret.setZIndex(50);
             this.layer.add( this.imageCorret);
             this.stage.add( this.layer);


             //钠离子不规则运动
            this.bgzSportNa();

         //   imageArry = [];
        };



    }

    //初始化 上面4个圆中图片 默认影藏
    initImageBox() {
        //上面框中碳酸氢根
        const imageArry: Array<any> = [];
        imageArry[0] = new Image();
        imageArry[0].src = hcoimage;
        imageArry[0].onload = () => {
            this.imagePositionConfig.set('tanh', {
                    x: 378 - 45 + 30,
                    y: 154 - 25,
                    group:  this.container[2],
            });
             this.imageArrayBox[0] = new Konva.Image({
                 x  :   this.stage.getWidth() * 0.3 + 50,
                 y  :  200 + 60,
                image  :  imageArry[0],
                width  :  75,
                height  :  75,
                opacity  : 0,
                 listening: false,
                id  : 'tanh',
                draggable  : false,
                dragBoundFunc  :  (pos) => {
                    const newY = (pos.y < 0 ? 0   :  false || pos.y > 550 ? 550   :  pos.y);
                    const newX =  (pos.x < 0 ? 0   :  false || pos.x > 900 ? 900   :  pos.x );
                    return {
                        x  :  newX,
                        y  :  newY
                    };
                },

            });

             this.layer.add( this.imageArrayBox[0]);
             this.stage.add( this.layer);

            this.imgObjs.dragMove(this.imageArrayBox[0], this.grouptwo, this.mapArry, this.imagePositionConfig,
                this.layer);
           // this.animate();

            this.sportOne =  new Konva.Tween({
                node: this.imageArrayBox[0],
                x  :   this.stage.getWidth() * 0.313,
                y  :   this.stage.getHeight() * 0.108 - 5,
                duration: 3,
            });
        };

        //C6H5OH
        imageArry[1] = new Image();
        imageArry[1].src = chohimage;
        imageArry[1].onload = () => {
            this.imagePositionConfig.set('c6h5oh', {
               x: 630 - 30 + 30,
                y: 129 - 10,
                group: this.container[4],
            });
             this.imageArrayBox[1] = new Konva.Image({
                 x  :   this.stage.getWidth() * 0.3 + 50,
                 y  :  200 + 60,
                image  :  imageArry[1],
                width  :  85,
                height  :  85,
                opacity  : 0,
                 listening: false,
                id  : 'c6h5oh',
                draggable  : false,
                dragBoundFunc  :  (pos) => {
                    const newY = (pos.y < 0 ? 0   :  false || pos.y > 550 ? 550   :  pos.y);
                    const newX =  (pos.x < 0 ? 0   :  false || pos.x > 900 ? 900   :  pos.x );
                    return {
                        x  :  newX,
                        y  :  newY
                    };
                },
            });


             this.layer.add( this.imageArrayBox[1]);
             this.stage.add( this.layer);

            this.imgObjs.dragMove(this.imageArrayBox[1], this.grouptwo, this.mapArry, this.imagePositionConfig ,
                this.layer);
            // this.animate();

            this.sportTwo =  new Konva.Tween( {
                node: this.imageArrayBox[1],
                x  :   this.stage.getWidth() * 0.594,
                y  :   this.stage.getHeight() * 0.26 - 4,
                duration: 3,
            });
        };


        //H2CO3
        //
        imageArry[2] = new Image();
        imageArry[2].src = h2co3image;
        imageArry[2].onload = () => {
            this.imagePositionConfig.set('h2co3', {
                x: 400 + 50 + 18 + 30,
                y: 154 - 25,
                group: this.container[3],
            });
             this.imageArrayBox[2] = new Konva.Image({
                 x  :   this.stage.getWidth() * 0.3 + 50,
                 y  :  200 + 60,
                image  :  imageArry[2],
                width  :  75,
                height  :  75,
                opacity  : 0,
                id  : 'h2co3',
                 listening: false,
                draggable  : false,
                dragBoundFunc  :  (pos) => {
                    const newY = (pos.y < 0 ? 0   :  false || pos.y > 550 ? 550   :  pos.y);
                    const newX =  (pos.x < 0 ? 0   :  false || pos.x > 900 ? 900   :  pos.x );
                    return {
                        x  :  newX,
                        y  :  newY
                    };
                },

            });


             this.layer.add( this.imageArrayBox[2]);
             this.stage.add( this.layer);

            this.imgObjs.dragMove(this.imageArrayBox[2], this.grouptwo, this.mapArry, this.imagePositionConfig ,
                this.layer);
            // this.animate();

            this.sportThree = new Konva.Tween({
                node: this.imageArrayBox[2],
                x  :   this.stage.getWidth() * (0.442 + 0.02) + 3,
                y  :  this.stage.getHeight() * (0.061 + 0.03) + 3,
                duration: 3,
            });
        };

        //CH3COOH
        imageArry[3] = new Image();
        imageArry[3].src = chcoohimage;
        imageArry[3].onload = () => {
            this.imagePositionConfig.set('ch3cooh', {
                x: 115 + 75 + 30,
                y: 140 - 20,
                group: this.container[1],
            });
             this.imageArrayBox[3] = new Konva.Image({
                 x  :   this.stage.getWidth() * 0.3 + 50,
                 y  :  200 + 60,
                image  :  imageArry[3],
                width  :  85,
                height  :  85,
                opacity  : 0,
                id  : 'ch3cooh',
                 listening: false,
                draggable  : false,
                dragBoundFunc  :  (pos) => {
                    const newY = (pos.y < 0 ? 0   :  false || pos.y > 550 ? 550   :  pos.y);
                    const newX =  (pos.x < 0 ? (0)   :  false || pos.x > 900 ? 900   :  pos.x );
                    return {
                        x  :  newX,
                        y  :  newY
                    };
                },
            });

            this.layer.add( this.imageArrayBox[3]);
            this.stage.add( this.layer);
                document.addEventListener('mouseup', () => {

                     if (this.control) {
                        this.restoreTargetPosition();
                     }
                });

                document.addEventListener('touchend', (e: any) => {
                    if (this.control) {
                        this.restoreTargetPosition();
                    }

                });

                document.addEventListener('touchcancel', (e: any) => {
                    if (this.control) {
                        this.restoreTargetPosition();
                    }

                });





            this.imgObjs.dragMove(this.imageArrayBox[3], this.grouptwo, this.mapArry, this.imagePositionConfig ,
                this.layer);
             // this.animate();
           // imageArry = [];
            this.sportFour =  new Konva.Tween({
                node: this.imageArrayBox[3],
                x  : ( this.stage.getWidth() * 0.151 + 18),
                y  :  this.stage.getHeight() * (0.247 + 0.02) + 5,
                onFinish: () => {
                    this.time5  =   setTimeout( () => {

                        this.group.hide();
                        this.groupthree.hide();
                        this.container[0].visible(false);
                        for (let i = 0; i < this.arryBoxBottom.length; i++) {
                            this.arryBoxBottom[i].visible(true);
                        }
                        this.createAnimationTwo();
                        for (let j = 0; j < this.imageArrayBox.length; j++) {
                            this.imageArrayBox[j].draggable(true);
                        }
                        (this.imageArrayBox[3] as any).setListening(true);
                        (this.imageArrayBox[2] as any).setListening(true);
                        (this.imageArrayBox[1] as any).setListening(true);
                        (this.imageArrayBox[0] as any).setListening(true);
                        clearTimeout(this.time5);
                        this.control = true;
                        this.viewModel.$data.dianjiBtn = false;
                    }, 1500);
                },
                durtation: 16,
            });
         };

    }

    restoreTargetPosition() {
        if (!this.imgObjs.dragTarget) {
           return;
        }
        if (this.mapArry.get(this.imgObjs.dragTarget.id() ) ) {
            this.imgObjs.dragTarget.x((this.mapArry.get(this.imgObjs.dragTarget.id()) as any).position.imageX);
            this.imgObjs.dragTarget.y((this.mapArry.get(this.imgObjs.dragTarget.id()) as any).position.imageY);




            if ( this.imgObjs.jianCeMethods(this.arryBoxBottom[4], this.imageArrayBox, this.grouptwo)) {

                document.getElementById('comfirm').removeAttribute('disabled');
              //  document.getElementById('comfirm').style.opacity = '1';
                //代码改动
                (window as any).viewHandler.viewModel.$data.querenBtn = true;
            } else {
                document.getElementById('comfirm').setAttribute('disabled', 'disabled');
               // document.getElementById('comfirm').style.opacity = '0';
                (window as any).viewHandler.viewModel.$data.querenBtn = false;
            }
        } else {
            switch (this.imgObjs.dragTarget.id()) {
                case 'ch3cooh':
                    this.imgObjs.dragTarget.x(115 + 75 + 30);
                    this.imgObjs.dragTarget.y(140 - 20);
                    break;
                case 'h2co3':
                    this.imgObjs.dragTarget.x(400 + 50 + 18 + 30);
                    this.imgObjs.dragTarget.y(154 - 25);
                    break;
                case 'c6h5oh':
                    this.imgObjs.dragTarget.x(630 - 30 + 30);
                    this.imgObjs.dragTarget.y(129 - 10);
                    break;
                case 'tanh':
                    this.imgObjs.dragTarget.x(378 - 45 + 30);
                    this.imgObjs.dragTarget.y(154 - 25);
                    break;
            }


        }

        this.layer.draw();
    }

    //初始化容器中大图片
    async initImageContainer() {
        const imageArry: Array<any> = [];
        //chocoo苯酚
        imageArry[0] = new Image();
        imageArry[0].src = choimage as any;
        imageArry[0].onload = () => {
             this.imageArryContainer[0] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.282 + 30,
                y  :   this.stage.getHeight() * 0.646 - 20,
                image  :  imageArry[0],
                width  :  85,
                height  :  85,
                id  : 'cho',
                visible  : true,
            });
             this.layer.add( this.imageArryContainer[0]);
             this.stage.add( this.layer);

             //苯酚 的不规则运动
            const trackPath =  this.imgObjs.getJISportOne(this.imageArryContainer[0]);
            this.suanSportOne = TweenMax.to(this.imageArryContainer[0], 14, {bezier: trackPath, yoyo: true, repeat: -1});
        };

        //碳酸根图片
        imageArry[1] = new Image();
        imageArry[1].src = coimage as any;
        imageArry[1].onload = () => {
             this.imageArryContainer[1] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.277,
                y  :   this.stage.getHeight() * 0.507,
                image  :  imageArry[1],
                width  :  65,
                height  :  65,
                id  : 'co3',
                visible  : true,
            });
             this.layer.add( this.imageArryContainer[1]);
             this.stage.add( this.layer);

             //碳酸根不规则运动
            const trackPath = this.imgObjs.getJISportTwo(this.imageArryContainer[1]);
            this.suanSportTwo = TweenMax.to(this.imageArryContainer[1], 14, {bezier: trackPath, yoyo: true, repeat: -1});

        };

        //醋酸跟
        imageArry[2] = new Image();
        imageArry[2].src = chcooimage as any;
        imageArry[2].onload = () => {
             this.imageArryContainer[2] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.396 + 10,
                y  :   this.stage.getHeight() * 0.682 - 20,
                image  :  imageArry[2],
                width  :  80,
                height  :  80,
                id  : 'chcoo',
                visible  : true,
            });
             this.layer.add( this.imageArryContainer[2]);
             this.stage.add( this.layer);

             //醋酸跟不规则运动

            const trackPath = this.imgObjs.getJISportThree(this.imageArryContainer[2]);
            this.suanSportThree = TweenMax.to(this.imageArryContainer[2], 14, {bezier: trackPath, yoyo: true, repeat: -1});

        };

        //碳酸氢根
        imageArry[3] = new Image();
        imageArry[3].src = hcoimage as any;
        imageArry[3].onload = ()  => {
             this.imageArryContainer[3] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.525,
                y  :   this.stage.getHeight() * 0.606 - 10,
                image  :  imageArry[3],
                width  :  70,
                height  :  70,
                id  : 'hco',
                visible  : true,
            });
             this.layer.add( this.imageArryContainer[3]);
             this.stage.add( this.layer);


           const trackPath = this.imgObjs.getJISportFour(this.imageArryContainer[3]);
            this.suanSportFour = TweenMax.to(this.imageArryContainer[3], 14, {bezier: trackPath, yoyo: true, repeat: -1});
          // this.transformCl();
            this.bgzSportSuan();
        };

    }

    //初始化图片氢
    initImageH () {
        //氢
        const  imageArry: Array<any> = [];
        imageArry[0] = new Image();
        imageArry[0].src = himage;
        imageArry[0].onload = () => {
             this.imageArrayH[0] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.3 + 50,
                y  :  200,
                image  :  imageArry[0],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.layer.add( this.imageArrayH[0]);
             this.stage.add( this.layer);
        };

        imageArry[1] = new Image();
        imageArry[1].src = himage;
        imageArry[1].onload = () => {
             this.imageArrayH[1] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.3 + 50,
                y  :  200,
                image  :  imageArry[1],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.layer.add( this.imageArrayH[1]);
             this.stage.add( this.layer);
        };

        imageArry[2] = new Image();
        imageArry[2].src = himage;
        imageArry[2].onload = () => {
             this.imageArrayH[2] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.3 + 50,
                y  :  200,
                image  :  imageArry[2],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.layer.add( this.imageArrayH[2]);
             this.stage.add( this.layer);
        };

        imageArry[3] = new Image();
        imageArry[3].src = himage;
        imageArry[3].onload = () => {
             this.imageArrayH[3] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.3 + 50,
                y  :  200,
                image  :  imageArry[3],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.layer.add( this.imageArrayH[3]);
             this.stage.add( this.layer);

        };
       // imageArry = [];

    }

    //初始化图片路
    initImageCL() {
        //四个
        const imageArry: Array<any> = [];
        imageArry[0] = new Image();
        imageArry[0].src = climage;
        imageArry[0].onload = () => {
             this.imageArrayCL[0] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.35 + 100,
                y  :  200,
                image  :   imageArry[0],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.groupthree.add(  this.imageArrayCL[0]);
             this.layer.add(  this.groupthree);
             this.stage.add( this.layer);
        };

        imageArry[1] = new Image();
        imageArry[1].src = climage;
        imageArry[1].onload = () => {
             this.imageArrayCL[1] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.35 + 100,
                y  :  200,
                image  :  imageArry[1],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.groupthree.add(  this.imageArrayCL[1]);
             this.layer.add( this.groupthree);
             this.stage.add( this.layer);
        };

        imageArry[2] = new Image();
        imageArry[2].src = climage;
        imageArry[2].onload = () => {
             this.imageArrayCL[2] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.35 + 100,
                y  :  200,
                image  :  imageArry[2],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.groupthree.add( this.imageArrayCL[2]);
             this.layer.add( this.groupthree);
             this.stage.add( this.layer);
        };

        imageArry[3] = new Image();
        imageArry[3].src = climage;
        imageArry[3].onload = () => {
             this.imageArrayCL[3] = new Konva.Image({
                x  :   this.stage.getWidth() * 0.35 + 100,
                y  :  200,
                image  :  imageArry[3],
                width  :  45,
                height  :  45,
                opacity  : 0,
            });
             this.groupthree.add( this.imageArrayCL[3]);
             this.layer.add( this.groupthree);
             this.stage.add( this.layer);

        };
    }

    initImageBottom() {
         this.arryBoxBottom[0] = new Konva.Circle({
            x  :   this.stage.getWidth() * 0.199 + 20 + 20,
            y  :   this.stage.getHeight() * 0.578,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
            visible  : false,
            id  : '1',
            name  : 'ch3cooh'
        });
         this.arryBoxBottom[1] = new Konva.Circle({
            x  :   this.stage.getWidth() * 0.361 + 20 + 20,
            y  :   this.stage.getHeight() * 0.578,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
            visible  : false,
            id  : '2',
            name  : 'h2co3'

        });
         this.arryBoxBottom[2]  = new Konva.Circle({
            x  :   this.stage.getWidth() * 0.523 + 20 + 20,
            y  :   this.stage.getHeight() * 0.578,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
            visible  : false,
            id  : '3',
            name  : 'c6h5oh'
        });
         this.arryBoxBottom[3]  =  new Konva.Circle({
            x  :  this.stage.getWidth() * 0.686 + 20 + 20,
            y  :   this.stage.getHeight() * 0.578,
            radius  :  60,
            fill  :  '#4499ED',
            stroke  :  '#8EC4F0',
            strokeWidth  :  3,
            opacity  :  0.5,
            visible  : false,
            id  : '4',
            name  : 'tanh'
        });
         this.arryBoxBottom[4] = new Konva.Text({
            x  :   this.stage.getWidth() * 0.023 - 25 - 25 + 25,
            y  :   this.stage.getHeight() * 0.53 - 80,
            text  :  '请按酸性强弱排序：',
             fontSize  :  22, //字体改为24px
            fill  :  '#FFFFFF',
            visible  : false,
        });
         this.arryBoxBottom[5] = new Konva.Text({
            x  :   this.stage.getWidth() * 0.321 - 60 + 20 + 20,
            y  :   this.stage.getHeight() * 0.646 - 70,
            width  : 36,
            height  : 50,
            text  :  '＞',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });
         this.arryBoxBottom[6] = new Konva.Text({
            x  :   this.stage.getWidth() * 0.483 - 60 + 20 + 20,
            y  :   this.stage.getHeight() * 0.646 - 70,
            text  :  '＞',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });
         this.arryBoxBottom[7] = new Konva.Text({
            x  :   this.stage.getWidth() * 0.646 - 60 + 20 + 20,
            y  :   this.stage.getHeight() * 0.646 - 70,
            text  :  '＞',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });

        const textO = new Konva.Text({
            x  :   this.stage.getWidth() * 0.232 - 20 + 30,
            y  :   this.stage.getHeight() * 0.224 - 20,
            text  :  '正',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });

        const textT = new Konva.Text({
            x  :   this.stage.getWidth() * 0.369 - 20 + 30,
            y  :   this.stage.getHeight() * 0.224 - 20,
            text  :  '确',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  :  false,
        });
        const textTh = new Konva.Text({
            x  :   this.stage.getWidth() * 0.506 - 20 + 30,
            y  :   this.stage.getHeight() * 0.224 - 20,
            text  :  '答',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });
        const textF = new Konva.Text({
            x  :   this.stage.getWidth() * 0.643 - 20 + 30,
            y  :   this.stage.getHeight() * 0.224 - 20,
            text  :  '案',
            fontSize  :  36,
            fill  :  '#FFFFFF',
            visible  : false,
        });
         this.textArry.push(textO);
         this.textArry.push(textT);
         this.textArry.push(textTh);
         this.textArry.push(textF);
         this.grouptwo.add( this.arryBoxBottom[0]);
         this.grouptwo.add( this.arryBoxBottom[1]);
         this.grouptwo.add( this.arryBoxBottom[2]);
         this.grouptwo.add( this.arryBoxBottom[3]);
         this.textGroup.add(textO);
         this.textGroup.add(textT);
         this.textGroup.add(textTh);
         this.textGroup.add(textF);
         this.layer.add( this.grouptwo);
         this.layer.add( this.textGroup);
         this.layer.add( this.arryBoxBottom[4]);
         this.layer.add( this.arryBoxBottom[5]);
         this.layer.add( this.arryBoxBottom[6]);
         this.layer.add( this.arryBoxBottom[7]);
         this.stage.add( this.layer);
    }

    //创建动画 只能点击四次
     createAnimationEvent(x:  any) {
        this.objArry.length = 0;
        switch (x) {
            case 1  :
                this.objArry.push(this.imageArrayH[0]);
                this.objArry.push(this.imageArrayCL[0]);
                this.objArry.push(this.imageArryContainer[1]); //碳酸根
                this.objArry.push(this.imageArrayBox[0]);
                break;
            case 2  :
                this.objArry.push(this.imageArrayH[1]);
                this.objArry.push(this.imageArrayCL[1]);
                this.objArry.push(this.imageArryContainer[0]); //苯酚
                this.objArry.push(this.imageArrayBox[1]);
                break;
            case 3  :
                this.objArry.push(this.imageArrayH[2]);
                this.objArry.push(this.imageArrayCL[2]);
                this.objArry.push(this.imageArryContainer[3]); //碳酸氢根
                this.objArry.push(this.imageArrayBox[2]);
                break;
            case 4  :
                this.objArry.push(this.imageArrayH[3]);
                this.objArry.push(this.imageArrayCL[3]);
                this.objArry.push(this.imageArryContainer[2]); //醋酸跟
                this.objArry.push(this.imageArrayBox[3]);
                break;
        }
       this.createAnimation( this.objArry, x);
    }
    createAnimation(imgObjs: Array<any>, k: any) {

        this.transformCl();
        this.transformSuangen();
        this.timeLine = new TimelineLite();


        this.hTween1 = new Konva.Tween({  //氢离子动画
            node  :  imgObjs[0],
            x: imgObjs[0].x(),
            y: imgObjs[0].y() + 60,
            opacity  :  1,
            duration  : 0.5,
            paused: true,
        });




        this.timeLine.add(() => {  //氢离子和氯离子下滑
            this.hTween1.play();
          if (k === 1) {
              //this.hTween1.play();
              this.clTween1.play();
          }
          if (k === 2) {
             // this.hTween2.play();
              this.clTween2.play();
          }
          if (k === 3) {
              //this.hTween3.play();
              this.clTween3.play();
          }
          if (k === 4) {
             // this.hTween4.play();
              this.clTween4.play();
          }
        });
        this.timeLine.add(() => {
           if (k === 1) {
               this.tweenFour.play();
           }
           if (k === 2) {
                    this.tweenFive.play();
           }
             if (k === 3) {
                 this.tweenSix.play();
             }
             if (k === 4) {
                 this.tweenSeven.play();
             }
        }, 0.8);
        this.timeLine.add( () => {
            if (k === 1) {
                this.suangenTween1.play();
                this.naTween.play();
                this.animateOne(k);
            }

            if ( k === 2) {
                this.suangenTween2.play();
                this.animateTwo(k);
            }
            if (k === 3) {
                this.suangenTween3.play();
                this.animateThree(k);
            }
            if (k === 4) {
                this.suangenTween4.play();
            }

        }, 0.8);

        this.timeLine.add( () => {
            switch (k) {
                case 1:
                    this.sportOne.play();
                    this.resetAnimateOne();
                    break;
                case 2:
                    this.sportTwo.play();
                    this.resetAnimateTwo();
                    break;
                case 3:
                    this.sportThree.play();
                    this.resetAnimateThree();
                    break;
                case 4:
                    this.sportFour.play();
                    break;
            }
        }, 2);

        this.timeLine.add( () => {
            this.hTween1.reset();
            document.getElementById('startAnimation').style.pointerEvents = 'auto';
            document.getElementById('startAnimation').style.opacity = '1';
        } , 5);


    }

    animateNa(imageNa: Konva.Image) {
        this.naTween = new Konva.Tween({
            node: imageNa,
            duration: 1,
            opacity: 0,
        });
    }

    //酸根离子上移
    animateOne(k: number) {
        this.benfentween1 = new Konva.Tween( {
            node  : this.imageArryContainer[0], //苯酚
            x  : this.imageArryContainer[0].x() + 10 ,
            y  : this.imageArryContainer[0].y() - 130,
            duration: 1,
            onFinish  : () => {
                // setTimeout( () => {
                //     m1.destroy();
                // }, 600);
            }
        });

        this.cusuantween1 = new Konva.Tween( {
            node  : this.imageArryContainer[2], //醋酸跟
            x  : this.imageArryContainer[2].x() - 50 ,
            y  : this.imageArryContainer[2].y() - 130,
            duration: 1,
            onFinish  : () => {
                // setTimeout( () => {
                //     m2.destroy();
                // }, 600);
            }
        });

        this.tansuantween1 = new Konva.Tween({
            node  : this.imageArryContainer[3], //碳酸氢根
            x  : this.imageArryContainer[3].x() - 140 ,
            y  : this.imageArryContainer[3].y() - 150,
            duration: 1,
            onFinish  : () => {
                // setTimeout( () => {
                //     m3.destroy();
                // }, 600);
            }
        });

        this.benfentween1.play();
        this.cusuantween1.play();
        this.tansuantween1.play();
    }
    //酸根离子下移
    resetAnimateOne() {

        this.resetbentween1 = new Konva.Tween( {
            node  : this.imageArryContainer[0], //苯酚
            x  : this.stage.getWidth() * 0.282 + 30 ,
            y  : this.stage.getHeight() * 0.646 - 20,
            duration: 2,
            onFinish  : () => {
                // setTimeout( () => {
                //     m1.destroy();
                // }, 600);
            }
        });

        this.resetcusuantween1 = new Konva.Tween( {
            node  : this.imageArryContainer[2], //醋酸跟
            x  :   this.stage.getWidth() * 0.396 + 10,
            y  :   this.stage.getHeight() * 0.682 - 20,
            duration: 2,
            onFinish  : () => {
                setTimeout( () => {
                    this.suanSportOne.resume();
                    this.suanSportTwo.resume();
                    this.suanSportThree.resume();
                    this.suanSportFour.resume();
                   // m2.destroy();
                }, 600);
            }
        });

        this.resettansuantween1 = new Konva.Tween({
            node  : this.imageArryContainer[3], //碳酸氢根
            x  :   this.stage.getWidth() * 0.525,
            y  :   this.stage.getHeight() * 0.606 - 10,
            duration: 2,
            onFinish  : () => {
                // setTimeout( () => {
                //     // m3.destroy();
                // }, 600);
            }
        });
        this.resetbentween1.play();
        this.resetcusuantween1.play();
        this.resettansuantween1.play();
    }

    animateTwo(k: number) {
        this.cusuantween2 = new Konva.Tween( {
            node  : this.imageArryContainer[2], //醋酸跟
            x  : this.imageArryContainer[2].x() - 50 ,
            y  : this.imageArryContainer[2].y() - 130,
            duration: 1,
            onFinish  : () => {
                // setTimeout( () => {
                //     m2.destroy();
                // }, 500);
            }
        });

        this.tansuantween2 = new Konva.Tween({
            node  : this.imageArryContainer[3], //碳酸氢根
            x  : this.imageArryContainer[3].x() - 140 ,
            y  : this.imageArryContainer[3].y() - 150,
            duration: 1,
            onFinish  : () => {
                // m3.reverse();
                // setTimeout( () => {
                //     m3.destroy();
                // }, 500);
            }
        });

        this.cusuantween2.play();
        this.tansuantween2.play();
    }

    resetAnimateTwo () {

        this.resetcusuantween2 = new Konva.Tween( {
            node  : this.imageArryContainer[2], //醋酸跟
            x  :   this.stage.getWidth() * 0.396 + 10,
            y  :   this.stage.getHeight() * 0.682 - 20,
            duration: 2,
            onFinish  : () => {
                setTimeout( () => {
                    this.suanSportOne.resume();
                    this.suanSportTwo.resume();
                    this.suanSportThree.resume();
                    this.suanSportFour.resume();
                    // m2.destroy();
                }, 600);
            }
        });

       this.resettansuantween2 = new Konva.Tween({
            node  : this.imageArryContainer[3], //碳酸氢根
            x  :   this.stage.getWidth() * 0.525,
            y  :   this.stage.getHeight() * 0.606 - 10,
            duration: 2,
            onFinish  : () => {
                // setTimeout( () => {
                //     m3.destroy();
                // }, 600);
            }
        });

        this.resetcusuantween2.play();
        this.resettansuantween2.play();
    }

    animateThree (k: number) {
        this.cusuantween3 = new Konva.Tween({
            node  : this.imageArryContainer[2], //醋酸根离子
            x  : this.imageArryContainer[2].x() - 50 ,
            y  : this.imageArryContainer[2].y() - 150,
            duration: 1,
            onFinish  : () => {
                // setTimeout( () => {
                //     m2.destroy();
                // }, 600);
            }
        });
        this.cusuantween3.play();
    }

    resetAnimateThree() {
        this.resetcusuantween3 = new Konva.Tween({
            node  : this.imageArryContainer[2], //醋酸根
            x  :   this.stage.getWidth() * 0.396 + 10,
            y  :   this.stage.getHeight() * 0.682 - 20,
            duration: 2,
            onFinish  : () => {
                setTimeout( () => {
                    this.suanSportOne.resume();
                    this.suanSportTwo.resume();
                    this.suanSportThree.resume();
                    this.suanSportFour.resume();
                  //  m2.destroy();
                }, 600);


            }
        });
        this.resetcusuantween3.play();
    }

    //酸的上移动画
    animate() {

        this.sportOne =  new Konva.Tween({
            node: this.imageArrayBox[0],
            x  :   this.stage.getWidth() * 0.313,
            y  :   this.stage.getHeight() * 0.108 - 5,
            duration: 3,
        });

        //上移 c2h6o酸
      //  console.info('sprot2', this.imageArrayBox[1]);
        this.sportTwo =  new Konva.Tween( {
            node: this.imageArrayBox[1],
            x  :   this.stage.getWidth() * 0.594,
            y  :   this.stage.getHeight() * 0.26 - 4,
            duration: 3,
        });

        //上移 h2co3酸
      //  console.info('sprot3', this.imageArrayBox[1]);
        this.sportThree = new Konva.Tween({
            node: this.imageArrayBox[2],
            x  :   this.stage.getWidth() * (0.442 + 0.02) + 3,
            y  :  this.stage.getHeight() * (0.061 + 0.03) + 3,
            duration: 3,
        });

        //上移 ch3cooh酸
        this.sportFour =  new Konva.Tween({
            node: this.imageArrayBox[3],
            x  : ( this.stage.getWidth() * 0.151 + 18),
            y  :  this.stage.getHeight() * (0.247 + 0.02) + 5,
            onFinish: () => {
              this.time5  =   setTimeout( () => {

                    this.group.hide();
                    this.groupthree.hide();
                    this.container[0].visible(false);
                    for (let i = 0; i < this.arryBoxBottom.length; i++) {
                        this.arryBoxBottom[i].visible(true);
                    }
                    this.createAnimationTwo();
                    for (let j = 0; j < this.imageArrayBox.length; j++) {
                        this.imageArrayBox[j].draggable(true);
                    }
                    (this.imageArrayBox[3] as any).setListening(true);
                    (this.imageArrayBox[2] as any).setListening(true);
                    (this.imageArrayBox[1] as any).setListening(true);
                    (this.imageArrayBox[0] as any).setListening(true);
                    clearTimeout(this.time5);
                    this.control = true;
                    this.viewModel.$data.dianjiBtn = false;
                }, 1500);
            },
            durtation: 16,
        });
    }


   async bgzSportNa() {
        return new Promise( (resolve, reject) => {
            resolve(true);
        });
    }

    //曲线轨迹
    getCurrentModelTrackPath(imageArryNa: any): Array<any> {
        const x = imageArryNa.x();
        const y = imageArryNa.y();

        const p1 = {x: x - 5 , y: y - 5};
        const p2 = {x: x + 5, y: y + 5};
        const p3 = {x: x - 5, y: y - 5};
        const p4 = {x: x + 5, y: y + 0};

        return [p1, p2, p3, p4];

    }

    getGuijiOne(imageArryNa: any): Array<any> {
        const x = imageArryNa.x();
        const y = imageArryNa.y();

        const p1 = {x: x - 8 , y: y - 8};
        const p2 = {x: x + 8, y: y + 8};
        const p3 = {x: x - 8, y: y - 8};
        const p4 = {x: x + 8, y: y + 8};

        return [p1, p2, p3, p4];
    }

    getGuijiTwo(imageArryNa: any): Array<any> {

        const x = imageArryNa.x();
        const y = imageArryNa.y();

        const p1 = {x: x , y: y};
        const p2 = {x: x + 8, y: y - 8};
        const p3 = {x: x - 8, y: y + 8};
        const p4 = {x: x + 8, y: y - 8};

        return [p1, p2, p3, p4];
    }

    getGuijiThree(imageArryNa: any): Array<any> {

        const x = imageArryNa.x();
        const y = imageArryNa.y();

        const p1 = {x: x - 8 , y: y + 8};
        const p2 = {x: x + 8, y: y - 8};
        const p3 = {x: x - 8, y: y - 8};
        const p4 = {x: x + 8, y: y - 0};

        return [p1, p2, p3, p4];
    }

    getGuijiFour(imageArryNa: any): Array<any> {

        const x = imageArryNa.x();
        const y = imageArryNa.y();

        const p1 = {x: x + 8 , y: y + 8};
        const p2 = {x: x - 8, y: y - 8};
        const p3 = {x: x + 8, y: y - 8};
        const p4 = {x: x - 8, y: y - 8};

        return [p1, p2, p3, p4];
    }

    //4个酸根离子 不规则运动
   async bgzSportSuan() {
      return new Promise( (resolve, reject) => {
          resolve(true);

       });
    }


    //4个氯不规则运动
    bgzSportCl() {

        let trackPath = this.imgObjs.getClSportOne(this.imageArrayCL[0]);
       this.clSportOne = TweenMax.to(this.imageArrayCL[0], 6, {bezier: trackPath, yoyo: true, repeat: -1});
         trackPath = this.imgObjs.getClSportTwo(this.imageArrayCL[1]);
        this.clSportTwo = TweenMax.to(this.imageArrayCL[1], 6, {bezier: trackPath, yoyo: true, repeat: -1});
       trackPath = this.imgObjs.getClSportThree(this.imageArrayCL[2]);
        this.clSportThree = TweenMax.to(this.imageArrayCL[2], 6, {bezier: trackPath, yoyo: true, repeat: -1});
        trackPath = this.imgObjs.getClSportThree(this.imageArrayCL[3]);
        this.clSportFour = TweenMax.to(this.imageArrayCL[3], 6, {bezier: trackPath, yoyo: true, repeat: -1});

    }

    //层的动画
    animateRongye() {
        this.bgzTweenTwo = new Konva.Tween({
            node: this.layer,
            duration: 100000,
        });
        this.bgzTweenTwo.play();
    }


    //上移酸根离子
    transformSuangen() {
        //3.溶液中酸根酸根离子 争先抢夺氢离子
        //上移酸根离子
        this.suangenTween1 =  new Konva.Tween( { //碳酸根离子动画
            node: this.imageArryContainer[1],
            x  : this.imageArrayH[0].x() - 10,
            y  : this.imageArrayH[0].y() + 50,
            duration: 1,
            paused: true,
            onFinish  : () => {
               this.time1 = setTimeout( () => {
                    this.imageArrayH[0].opacity(0);
                    this.imageArryContainer[1].opacity(0);
                   this.imageArrayBox[0].opacity(1);
                   clearTimeout(this.time1);
                }, 50);

            }
        });


        this.suangenTween2 =  new Konva.Tween( { //苯酚根离子动画
            node: this.imageArryContainer[0],
            x  : this.imageArrayH[1].x() - 10,
            y  : this.imageArrayH[1].y() + 50,
            duration: 1,
            paused: true,
            onFinish  : () => {
                this.time2 = setTimeout( () => {
                    this.imageArrayH[1].opacity(0);
                    this.imageArryContainer[0].opacity(0);
                    this.imageArrayBox[1].opacity(1);
                     clearTimeout(this.time2);
                }, 50);
            }
        });

        this.suangenTween3 =  new Konva.Tween( { //碳酸氢根离子动画
            node: this.imageArryContainer[3],
            x  : this.imageArrayH[2].x() - 10,
            y  : this.imageArrayH[2].y() + 50,
            duration: 1,
            paused: true,
            onFinish  : () => {
               this.time3 = setTimeout( () => {
                    this.imageArrayH[2].opacity(0);
                    this.imageArryContainer[3].opacity(0);
                    this.imageArrayBox[2].opacity(1);
                   clearTimeout(this.time3);
                }, 50);
            }
        });


        this.suangenTween4 =  new Konva.Tween( { //醋酸根离子动画
            node: this.imageArryContainer[2],
            x  : this.imageArrayH[3].x() - 10,
            y  : this.imageArrayH[3].y() + 50,
            duration: 1,
            paused: true,
            onFinish  : () => {
                this.time4 = setTimeout( () => {
                    this.imageArrayH[3].opacity(0);
                    this.imageArryContainer[2].opacity(0);
                    this.imageArrayBox[3].opacity(1);
                     clearTimeout(this.time4);
                }, 50);
            }
        });


    }

    //下滑氯

    transformCl() {
        //4.下滑氯离子
        //2.下滑氯
        this.clTween1 =  TweenMax.to(this.imageArrayCL[0], 0.5 , {
            //氯离子动画1
            //imgObjs[1] , 0.5 ,
            // node: this.imageArrayCL[0],
            x: this.imageArrayCL[0].x() ,
            y: this.imageArrayCL[0].y() + 60,
            opacity  :  1,
            duration: 0.5,
            paused: true,
            onComplete : () => {
                this.bgzSportCl();  //氯离子不规则运动

                this.suanSportOne.pause();
                this.suanSportTwo.pause();
                this.suanSportThree.pause();
                this.suanSportFour.pause();

            }
        });


        this.clTween2 =  TweenMax.to(this.imageArrayCL[1], 0.5, { //氯离子动画1
            //imgObjs[1] , 0.5 ,
            // node: this.imageArrayCL[1],
            x: this.imageArrayCL[1].x() ,
            y: this.imageArrayCL[1].y() + 60,
            opacity  :  1,
            duration: 0.5,
            paused: true,
            onComplete : () => {
                this.bgzSportCl();  //氯离子不规则运动

                this.suanSportOne.pause();
                this.suanSportTwo.pause();
                this.suanSportThree.pause();
                this.suanSportFour.pause();

            }
        });

        this.clTween3 =  TweenMax.to(this.imageArrayCL[2], 0.5, { //氯离子动画1
            //imgObjs[1] , 0.5 ,
            // node: this.imageArrayCL[1],
            x: this.imageArrayCL[2].x() ,
            y: this.imageArrayCL[2].y() + 60,
            opacity  :  1,
            duration: 0.5,
            paused: true,
            onComplete : () => {
                this.bgzSportCl();  //氯离子不规则运动
                this.suanSportOne.pause();
                this.suanSportTwo.pause();
                this.suanSportThree.pause();
                this.suanSportFour.pause();

            }
        });

        this.clTween4 =  TweenMax.to(this.imageArrayCL[3], 0.5, { //氯离子动画1
            //imgObjs[1] , 0.5 ,
            // node: this.imageArrayCL[1],
            x: this.imageArrayCL[3].x() ,
            y: this.imageArrayCL[3].y() + 60,
            opacity  :  1,
            duration: 0.5,
            paused: true,
            onComplete : () => {
                this.bgzSportCl();  //氯离子不规则运动
                this.suanSportOne.pause();
                this.suanSportTwo.pause();
                this.suanSportThree.pause();
                this.suanSportFour.pause();

            }
        });




        this.tweenFour = TweenMax.to(this.imageArrayCL[0], 2 , {
            x  :   this.stage.getWidth() * 0.525 - 60 - 20,
            y  :   this.stage.getHeight() * 0.606 - 10 - 50 - 20,
            opacity  :  1,
            paused: true,
            onComplete: () => {
                this.bgzSportCl();
            }
        });


        this.tweenFive = TweenMax.to(this.imageArrayCL[1], 4 , {
            x  :   this.stage.getWidth() * 0.396 - 100,
            y  :   this.stage.getHeight() * 0.682 - 20,
            opacity  :  1,
            paused: true,
            onComplete: () => {
                this.bgzSportCl();
            }
        });


        this.tweenSix = TweenMax.to(this.imageArrayCL[2], 2 , {
            x  :   this.stage.getWidth() * 0.396 + 125 ,
            y  :   this.stage.getHeight() * 0.682 - 70,
            opacity  :  1,
            paused: true,
            onComplete: () => {
                this.bgzSportCl();
            }
        });


        this.tweenSeven = TweenMax.to(this.imageArrayCL[3], 3 , {
            x  :   this.stage.getWidth() * 0.282 + 140,
            y  :   this.stage.getHeight() * 0.646 + 15,
            opacity  :  1,
            paused: true,
            onComplete: () => {
                this.bgzSportCl();
            }
        });

    }


    //点击动画结速后，触发动画
    createAnimationTwo() {
        //hco3
         this.container[2].setX( this.stage.getWidth() * 0.369 + 30);
         this.container[2].setY( this.stage.getHeight() * 0.224);
         this.imageArrayBox[0].x(378 - 45 + 30);
         this.imageArrayBox[0].y(154 - 25);
        //ch3cooh
         this.container[1].setX( this.stage.getWidth() * 0.232 + 30);
         this.container[1].setY( this.stage.getHeight() * 0.224);
         this.imageArrayBox[3].x(115 + 75 + 30);
         this.imageArrayBox[3].y(140 - 20);
        //h2co3
         this.container[3].setX( this.stage.getWidth() * 0.506 + 30);
         this.container[3].setY( this.stage.getHeight() * 0.224);
         this.imageArrayBox[2].x(400 + 50 + 18 + 30);
         this.imageArrayBox[2].y(154 - 25);
        //c2h5oh
         this.container[4].setX( this.stage.getWidth() * 0.643 + 30);
         this.container[4].setY( this.stage.getHeight() * 0.224);
         this.imageArrayBox[1].x(630 - 30 + 30);
         this.imageArrayBox[1].y(129 - 10);

         for (let i = 0; i < this.imageArrayH.length; i ++) {
             this.imageArrayH[i].opacity(0);
         }
    }

    //显示正确或错误信息
    showInfo() {
        this.control = false;
       const falg = this.imgObjs.paiXuMethods(this.arryBoxBottom[4], this.imageArrayBox);
        const obj = {'imgCorrect': this.imageCorret , 'imgErro' : this.imageErro , 'txtArry' : this.textArry, 'stage': this.stage};
        this.imgObjs.showInfo( obj , this.imageArrayBox , falg, this.mapArry, this.layer);
    }


    //点击正确排序按钮 显示正确答案
    showCorrectQuestionTween() {
        const obj = {'imgCorrect': this.imageCorret , 'imgErro' : this.imageErro , 'txtArry' : this.textArry, 'stage': this.stage};
        this.imgObjs.showCorrectQuestionTween(obj, this.imageArrayBox , this.layer);
        this.control = false; //关闭边界检测开关
    }

    //点击继续挑战按钮，返回点击确认按钮前状态
    returnSortBeforeStatus() {
        const obj = { 'imgErro' : this.imageErro };
        this.imgObjs.returnSortBeforeStatus(obj, this.imageArrayBox, this.layer);
        this.control = true; //开启边界检测开关
    }

    //重置后回到原来的位置
    moveInitLoacl() {

        //上面框 回到原来位置
        // this.tweenThree.finish();
       //
         this.container[2].setX(  this.stage.getWidth()  *  0.288 + 60);
         this.container[2].setY( this.stage.getHeight()  *  0.064 + 60);

         this.container[1].setX( this.stage.getWidth()  *  0.151 + 60);
         this.container[1].setY( this.stage.getHeight()  *  0.247 + 60);

         this.container[3].setX( this.stage.getWidth()  *  0.442 + 60);
         this.container[3].setY( this.stage.getHeight()  *  0.061 + 60);

         this.container[4].setX( this.stage.getWidth()  *  0.576 + 60);
         this.container[4].setY( this.stage.getHeight()  *  0.229 + 60);


        //下面排序框隐藏 框中图片并回到初始位置
        for (let i = 0; i <  this.arryBoxBottom.length; i ++) {
             this.arryBoxBottom[i].visible(false);
        }

         this.grouptwo.show();

         this.imageArrayBox[0].x( this.stage.getWidth()  *  0.313);
         this.imageArrayBox[0].y( this.stage.getHeight()  *  0.108 - 5);
        this.imageArrayBox[0].opacity(0);
        (this.imageArrayBox[0] as any).setListening(false);

         this.imageArrayBox[3].x(( this.stage.getWidth()  *  0.151 + 18));
         this.imageArrayBox[3].y( this.stage.getHeight()  *  (0.247 + 0.02) + 5);
        this.imageArrayBox[3].opacity(0);
        (this.imageArrayBox[3] as any).setListening(false);

         this.imageArrayBox[2].x( this.stage.getWidth()  *  (0.442 + 0.02) + 3);
         this.imageArrayBox[2].y( this.stage.getHeight()  *  (0.061 + 0.03) + 3);
        this.imageArrayBox[2].opacity(0);
        (this.imageArrayBox[2] as any).setListening(false);

         this.imageArrayBox[1].x( this.stage.getWidth()  *  0.594);
         this.imageArrayBox[1].y( this.stage.getHeight()  *  0.26 - 4);
        this.imageArrayBox[1].opacity(0);
        (this.imageArrayBox[1] as any).setListening(false);


         this.container[0].visible(true);

        /////修改部分

        //酸根离子不规则运动
        this.suanSportOne.pause();
        this.suanSportTwo.pause();
        this.suanSportThree.pause();
        this.suanSportFour.pause();

        this.suanSportOne.resume();
        this.suanSportTwo.resume();
        this.suanSportThree.resume();
        this.suanSportFour.resume();

        //容易中酸根离子显示
        //-------- 修改部分
          this.imageArryContainer[0].opacity(1);
         // this.imageArryContainer[0].x( this.stage.getWidth()  *  0.282 + 30);
         // this.imageArryContainer[0].y( this.stage.getHeight()  *  0.646 - 20);
         //
          this.imageArryContainer[1].opacity(1);
         // this.imageArryContainer[1].x( this.stage.getWidth()  *  0.277);
         // this.imageArryContainer[1].y( this.stage.getHeight()  *  0.507);
         //
          this.imageArryContainer[2].opacity(1);
         // this.imageArryContainer[2].x( this.stage.getWidth()  *  0.396 + 10);
         // this.imageArryContainer[2].y( this.stage.getHeight()  *  0.682 - 20);
         //
          this.imageArryContainer[3].opacity(1);
         // this.imageArryContainer[3].x( this.stage.getWidth()  *  .525);
         // this.imageArryContainer[3].y( this.stage.getHeight()  *  0.606 - 10);


        //显示钠
         this.group.show();
         this.imageArryNa[2].opacity(1);
         this.groupthree.show();
         //重置氯离子的透明度
         this.imageArrayCL[0].opacity(0);
         this.imageArrayCL[1].opacity(0);
         this.imageArrayCL[2].opacity(0);
         this.imageArrayCL[3].opacity(0);
        //回到初始位置



            //重置氢离子透明度
          this.imageArrayH[0].show();
         this.imageArrayH[0].opacity(0);
         this.imageArrayH[1].show();
         this.imageArrayH[1].opacity(0);
         this.imageArrayH[2].show();
         this.imageArrayH[2].opacity(0);
         this.imageArrayH[3].show();
         this.imageArrayH[3].opacity(0);



         this.mapArry.clear();
        //切换控件样式改变
      //  document.getElementById('comfirm').style.opacity = '0';
        document.getElementById('comfirm').setAttribute('disabled', 'disabled');
        document.getElementById('right_botom').style.opacity = '1';
        document.getElementById('startAnimation').style.cursor = 'pointer';

        //修改内容
       // for (let i = 0; i <  this.textArry.length; i ++) {
       // }
      // const times = setTimeout( () => {
           this.textArry[0].visible(false);
           this.textArry[1].visible(false);
           this.textArry[2].visible(false);
           this.textArry[3].visible(false);
      // /    / clearTimeout(times);
       //, 100);

        if ( this.imgObjs.correctTween) {

            this.imgObjs.correctTween.reset();
        }

        if (this.imgObjs.wrongTween) {

            this.imgObjs.wrongTween.reset();
            this.imageErro.visible(false);
        }
        if (this.imgObjs.tweenX) {

            this.imgObjs.tweenX.reset();
        }
        ///// --------------
        //修改部分

       //  //酸根离子不规则运动
       //  this.suanSportOne.pause();
       //  this.suanSportTwo.pause();
       //  this.suanSportThree.pause();
       //  this.suanSportFour.pause();
       //
       // this.suanSportOne.resume();
       // this.suanSportTwo.resume();
       // this.suanSportThree.resume();
       // this.suanSportFour.resume();

       /////

      this.bgzSportSuan();


      //暂停氯离子不规则动画
         this.clSportOne.pause();
        this.clSportTwo.pause();
        this.clSportThree.pause();
         this.clSportFour.pause();

        //氯离子动画重置

        this.clTween1.progress(0);
        this.clTween1.pause();
         this.tweenFour.progress(0);
        this.tweenFour.pause();

        this.clTween2.progress(0);
        this.clTween2.pause();
        this.tweenFive.progress(0);
        this.tweenFive.pause();


        this.clTween3.progress(0);
        this.clTween3.pause();
        this.tweenSix.progress(0);
        this.tweenSix.pause();

        this.clTween4.progress(0);
        this.clTween4.pause();
        this.tweenSeven.progress(0);
        this.tweenSeven.pause();

        //钠离子动画重置
        this.naTween.reset();

        //氢离子动画重置
        this.hTween1.reset();

      //  this.hTween2.reset();

      //  this.hTween3.reset();

      //  this.hTween4.reset();

        //重置上移酸的动画
        this.sportOne.reset();
        this.sportTwo.reset();
        this.sportThree.reset();
        this.sportFour.reset();


        //重置酸根离子动画
        this.suangenTween1.pause();
       // this.suangenTween1.reset();

        this.suangenTween2.pause();
       // this.suangenTween2.reset();

        this.suangenTween3.pause();
       // this.suangenTween3.reset();

        this.suangenTween4.pause();
       // this.suangenTween4.reset();


        this.imageCorret.visible(false);
       // this.tween.reset();

        this.imageArrayCL[0].x(this.stage.getWidth() * 0.35 + 100);
        this.imageArrayCL[0].y(200);
        this.imageArrayCL[1].x(this.stage.getWidth() * 0.35 + 100);
        this.imageArrayCL[1].y(200);
        this.imageArrayCL[2].x(this.stage.getWidth() * 0.35 + 100);
        this.imageArrayCL[2].y(200);
        this.imageArrayCL[3].x(this.stage.getWidth() * 0.35 + 100);
        this.imageArrayCL[3].y(200);
        if ( this.benfentween1) {
            this.benfentween1.reset();
            this.cusuantween1.reset();
            this.tansuantween1.reset();
        }

        if (this.resetbentween1) {
            this.resetbentween1.pause();
            this.resetcusuantween1.pause();
            this.resettansuantween1.pause();
        }

        if (this.cusuantween2) {
            this.cusuantween2.reset();
            this.tansuantween2.reset();
        }

        if (this.resetcusuantween2) {
            this.resetcusuantween2.pause();
            this.resettansuantween2.pause();
        }

        if (this.cusuantween3) {
            this.cusuantween3.reset();
        }

        if (this.resetcusuantween3) {
            this.resetcusuantween3.pause();
        }


        this.layer.draw();

        console.log('重置完成');
    }

    //改变窗口
    resize() {
        super.resize();
    }


    //重置页面
    reset() {
        super.reset();
        //重置原来的位置
       if (this.timeLine) {
           this.timeLine.pause();
           this.moveInitLoacl();
       }

        (this.imageArrayBox[0] as any).setListening(true);
        (this.imageArrayBox[1] as any).setListening(true);
        (this.imageArrayBox[2] as any).setListening(true);
        (this.imageArrayBox[3] as any).setListening(true);
        this.control = false;
         this.time1 = null;
        this.time2 = null;
        this.time3 = null;
        this.time4 = null;
         this.mapArry.clear();
        document.getElementById('startAnimation').style.opacity = '1';
        document.getElementById('startAnimation').style.pointerEvents = 'auto';
    }

}
