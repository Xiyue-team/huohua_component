import {CommonViewHandler} from '../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {EthanolHydrogen3dModel} from './EthanolHydrogen3dModel';
import {Power0, TweenMax, TimelineLite} from 'gsap';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelAnimate} from './ModelAnimate';
import {Material} from 'three';
import {Detector} from '../../../../src/util/Detector';

/**
 *   微件 乙醇与溴化氢的取代反应
 */
export class EthanolHydrogenViewHandler extends CommonViewHandler implements ViewHandler {
    qdModel: EthanolHydrogen3dModel;
    modelAnimate: ModelAnimate;
    tweenOne: any = null ;
    tweenTwo: any ;
    tweenThree: any;
    tweenFour: any;
    tweenFive: any;
    tweenSix: any;
    tweenEight: any;
    tweenNine: any;

    transformOne: any;
    transformTwo: any;
    transformThree: any;
    transformFour: any;

    rotateYOne: any;
    rotateYTwo: any;
    rotateYThree: any;
    rotateYFour: any;


    sliderValue: any = 1;
    private angleY = {
        angle: 0
    };


    timeLine: TimelineLite = null;

    step: number;

    constructor (vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        const fov = 45;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('box').clientWidth;
        const height = document.getElementById('box').clientHeight;
       //this.qdModel = new EthanolHydrogen3dModel(document.getElementById('box'), fov , width , height , near , far );
         this.qdModel = new EthanolHydrogen3dModel(document.getElementById('box'), null , 1000 , 576);
        ViewController.getInstance().hideLoading();
    }

    //点击播放按钮 改变滑块的值,开始动画
    changSliderValue() {
        // if (this.viewModel.$data.sliderNum === 4) {
        //     return;
        // }

        if (this.viewModel.$data.isPlay === true) { //判断播放按钮是否点击
            //判断 timeLine对象 是否已存在 和 当前动画是否是暂停状态
            if (this.timeLine && this.timeLine.paused()) {
                this.timeLine.resume(); // 恢复动画
                if (this.qdModel.step === 1) {  // step = 1  反应物平移动画恢复
                    this.qdModel.translationAnimate.resume();
                }

                if (this.qdModel.step === 2) { // step = 2 反应物旋转动画恢复
                    this.qdModel.rotateYAnimate.resume();
                }

                if (this.qdModel.step === 3) { // step = 3 断键动画恢复
                    this.tweenOne.resume();
                    this.tweenTwo.resume();
                }

                if (this.qdModel.step === 4) {//step = 4 成键动画恢复
                    this.tweenThree.resume();
                    this.tweenFive.resume();
                    this.tweenFour.resume();
                    this.tweenNine.resume();
                }

                if (this.qdModel.step === 5) { //step = 5 生成物动画恢复
                    this.qdModel.resetRotateYAnimate.resume();
                }



            } else {
                this.startAnimate();  //开始动画
            }
        } else {
           this.stopAnimate(); //暂停动画
        }
    }



    //判断当前动画具体状态

    //获取当前正在执行的动画



    //1.动画
    async startAnimate() {
        this.timeLine = new TimelineLite();
      //  this.timeLine.autoRemoveChildren = true;
        this.qdModel.timeLine = this.timeLine;
        // GSDevTools.create();
        const path =  await this.qdModel.initGltfLoader();
        // this.transFromAniamte();
        // this.rotateYAnimate();
        //断键初始化
        this.brokeKeyAnimate();
        //成键初始化
        this.bondKeyAnimate();



        this.timeLine.add(() => {
            //反应物平移动画  1
           this.qdModel.translationAnimate.play();
       }, 0.1);



        this.timeLine.add( () => {
            //  反应物旋转动画  2
            this.qdModel.rotateYAnimate.play();
        }, 1);
        this.timeLine.add(() => {
           //断键动画
            this.viewModel.$data.sliderNum = 2;
          this.tweenOne.play();
          this.tweenTwo.play();
            // console.log(this.timeLine.time());
       }, 2); //2.5
        this.timeLine.add( () => {
           //成键动画
           this.viewModel.$data.sliderNum  = 3;
            this.tweenThree.play();
           this.tweenFive.play();
            this.tweenFour.play();
           this.tweenNine.play();

            // console.log(this.timeLine.time());
       } , 2.9); //2.9

        this.timeLine.add( () => {
           //生成物动画
          this.viewModel.$data.sliderNum  = 4;
          this.qdModel.resetRotateYAnimate.play();
           this.productAnimate();
            // console.log(this.timeLine.time());
       }, 4.5); // 4.5
    }


    //2.断键动画
     brokeKeyAnimate () {
            this.tweenOne  =  TweenMax.to(this.qdModel.modelArry[1].position, 1, {
                x: -10,
                y: 10,
                ease: Power0.easeNone,
                onUpdate: () => {
                    this.qdModel.step = 3;
                },
                paused: true
            });
            this.tweenTwo  = TweenMax.to(this.qdModel.modelArry[2].position, 1, {
                x: 30,
                y: 10,
                ease: Power0.easeNone,
                onUpdate: () => {
                    this.qdModel.step = 3;
                },
                paused: true
            });

    }

    //3.成键动画
     bondKeyAnimate() {
        //先平移 再旋转链接

         this.tweenThree =  TweenMax.to(this.qdModel.modelArry[1].position, 1.5, {
                x: 30,
                y: -13,
                ease: Power0.easeNone,
                onUpdate: () => {
                    this.qdModel.step = 4;
                },
                paused: true,
            });
         this.tweenFour = TweenMax.to(this.qdModel.modelArry[1].rotation, 1.5, {
             z: Math.PI * 11 / 18,
             ease: Power0.easeNone,
             onUpdate: () => {
                 this.qdModel.step = 4;
             },
             paused: true,
         });
            // this.tweenFour = TweenMax.to(this.qdModel.modelArry[3].position, 1, {
            //     x: 20,
            //     y: -10,
            //     ease: Power0.easeInOut,
            //     onComplete: () => {
            //       // this.qdModel.modelArry[3].rotateZ(Math.PI * 25 / 18);
            //     },
            //     paused: true,
            // });

         // this.tweenEight = TweenMax.to(this.qdModel.modelArry[3].rotation, 1, {
         //     z: Math.PI * 25 / 18,
         //     ease: Power0.easeInOut,
         //     paused: true,
         // });


        this.tweenFive =  TweenMax.to(this.qdModel.modelArry[2].position, 1.5, {
                x: -30,
                y: 0,
                ease: Power0.easeNone,
            onUpdate: () => {
                this.qdModel.step = 4;
            },
                paused: true,
            });

         this.tweenNine =  TweenMax.to(this.qdModel.modelArry[2].rotation, 1.5, {
             z: - Math.PI * 11 / 18,
             ease: Power0.easeNone,
             onUpdate: () => {
                 this.qdModel.step = 4;
             },
             paused: true,
         });

        // this.tweenSix =  TweenMax.to(this.qdModel.modelArry[0].position, 1, {
        //             x: -20,
        //             y: 0,
        //             ease: Power0.easeInOut,
        //             paused: true,
        //     });
         }


    //4.生成物动画
    productAnimate () {
            const time1 = setTimeout(() => {
                this.viewModel.$data.isPlay = false;
                clearTimeout(time1);
            }, 1000);

        }


    //暂停动画
    stopAnimate () {
        if (this.timeLine === null) {
            return;
        }

        this.timeLine.pause();
        if (this.qdModel.step === 1) {
            this.qdModel.translationAnimate.pause();
        }

        if (this.qdModel.step === 2) {
            this.qdModel.rotateYAnimate.pause();
        }

        if (this.qdModel.step === 3) {
            this.tweenOne.pause();
            this.tweenTwo.pause();
        }

        if (this.qdModel.step === 4) {
            this.tweenThree.pause();
            this.tweenFive.pause();
            this.tweenFour.pause();
            this.tweenNine.pause();
        }

        if (this.qdModel.step === 5) { //没有执行
            console.log('123456')
            this.qdModel.resetRotateYAnimate.pause();
        }
    }

    //平移动画
    transFromAniamte () {

        this.transformOne = TweenMax.to(this.qdModel.modelArry[0].position, 1, {
            x: - 30,
            ease: Power0.easeNone,
            paused: true
        });

        this.transformTwo = TweenMax.to(this.qdModel.modelArry[1].position, 1, {
            x: - 30,
            ease: Power0.easeNone,
            paused: true
        });

        this.transformThree = TweenMax.to(this.qdModel.modelArry[2].position, 1, {
            x: 30,
            ease: Power0.easeNone,
            paused: true
        });

        this.transformFour = TweenMax.to(this.qdModel.modelArry[3].position, 1, {
            x:  30,
            ease: Power0.easeNone,
            paused: true
        });


    }


    //旋转Y轴动画
    rotateYAnimate() {
        this.rotateYOne = TweenMax.to(this.qdModel.modelArry[0].rotation, 1, {
            y: Math.PI / 4,
            ease: Power0.easeNone,
            paused: true
        });

        this.rotateYTwo = TweenMax.to(this.qdModel.modelArry[1].rotation, 1, {
            y: Math.PI / 4,
            ease: Power0.easeNone,
            paused: true
        });

        this.rotateYThree = TweenMax.to(this.qdModel.modelArry[2].rotation, 1, {
            y: Math.PI / 4,
            ease: Power0.easeNone,
            paused: true
        });

        this.rotateYFour = TweenMax.to(this.qdModel.modelArry[3].rotation, 1, {
            y: Math.PI / 4,
            ease: Power0.easeNone,
            paused: true
        });
    }

    //滑条动画
    sliderAnimate(sliderValue: any) {
    switch (sliderValue) {
        case 1:
            //反应物动画，
            break;
        case 2:
            //拖动滑条断建动画
         this.sliderBrokeKeyAnimate();
            break;
        case 3:
            //拖动滑条成键动画

         this.sliderBondKeyAnimate();
            break;
        case 4:
            //拖动滑条 旋转模型显示结构 生成物
           this.sliderProductAnimate();
            break;
    }
}
    //拖动滑条触发动画 断键
    sliderBrokeKeyAnimate () {
        if ( this.timeLine.paused()) {
            console.log('456');
            this.timeLine.resume();
            this.qdModel.djEnable = true;
        }
    }
    //拖动滑条触发动画 成键
    sliderBondKeyAnimate () {
        if (this.timeLine.paused()) {
            this.timeLine.resume();
            this.qdModel.cjEnable = true;
        }
    }
    //拖动滑条触发动画 生成物
    sliderProductAnimate () {
            if (this.timeLine.paused()) {
                this.timeLine.resume();
            }
    }


    //清除模型
    removeModel() {
        if ( this.qdModel.modelArry.length !== 0 ) {
            for (let i = 0 ; i < this.qdModel.modelArry.length; i ++) {
                // this.qdModel.modelArry[i].children[0].children[0].geometry.dispose();
               // console.log(this.qdModel.modelArry[i].children[0]);
                // this.qdModel.modelArry[i].children[0].children[0].material.dispose();
              this.qdModel.scene.remove(this.qdModel.modelArry[i]);
            }
            this.qdModel.modelArry.length = 0;

            // console.log(this.qdModel.modelArry[0].children[0].children[0].geometry);
        }
    }

    //重置动画
    resetAnimate () {
        if ( this.tweenOne != null) {
            this.qdModel.translationAnimate.progress(0);
            this.qdModel.translationAnimate.pause();
            this.qdModel.rotateYAnimate.progress(0);
            this.qdModel.rotateYAnimate.pause();
            this.qdModel.resetRotateYAnimate.progress(0);
            this.qdModel.resetRotateYAnimate.pause();
            this.tweenOne.progress(0);
            this.tweenOne.pause();
            this.tweenTwo.progress(0);
            this.tweenTwo.pause();
            this.tweenThree.progress(0);
            this.tweenThree.pause();
            this.tweenFour.progress(0);
            this.tweenFour.pause();
            this.tweenFive.progress(0);
            this.tweenNine.progress(0);
            this.tweenNine.pause();
        }
    }

    //页面大小发生改变
    resize() {
        super.resize();
    }
    //重置页面
    reset()  {
        super.reset();
        this.timeLine.pause();
        this.resetAnimate();
        this.timeLine = null;
        this.viewModel.$data.sliderNum = 1; //重置滑块值
      //动画连重置null
        this.removeModel(); //
        this.viewModel.$data.isPlay = false;
       document.getElementById('imgo').style.opacity = '1';
       document.getElementById('imgt').style.opacity = '1';
    }

    //点击播放按钮重置
    resetTween () {
        this.viewModel.$data.sliderNum = 1; //重置滑块值
        this.timeLine = null; //动画连重置null
        this.removeModel(); //
        this.viewModel.$data.isPlay = false;
        this.qdModel.zhuantai = false;
        this.resetAnimate();
    }

}

