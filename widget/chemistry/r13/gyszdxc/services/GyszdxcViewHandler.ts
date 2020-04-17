import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
const JSZip = require('jszip');
const JSZipUtils = require('jszip-utils');

import animationZip from '../sub_static/animation.zip';

import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import * as Konva from 'konva';



export class GyszdxcViewHandler extends KonvaViewHandler implements ViewHandler {

    // bjsCanvas: BjsCanvas;
    private ctrl = false;

    private play = false;

    private timerId: any;
    private  map = new Map<any, any>();

    private ctx: CanvasRenderingContext2D;

    private animation: HTMLElement;
    browserInfo: BrowserInfo;

    stage: any;
    layer: Konva.FastLayer;
    canvasImg: Konva.Image;
    //构造函数
    constructor(vm: Vue) {
        super(vm);
        this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    domReady() {
        super.domReady();
        this.init();
        this.initCanvas();
        this.initImage();

    }

    initCanvas() {
        this.stage = new Konva.Stage({
            container: 'p',
            width: 680,
            height: 360
        });
        this.layer = new Konva.FastLayer();
        this.stage.add(this.layer);
    }

    init() {
        this.animation = document.getElementById('animation');
        if (this.browserInfo.isSmallDevice) {
        /*    this.animation.style.width = '340px';
            this.animation.style.height = '180px';*/
            const position = document.getElementById('p');
            position.style.width = '340px';
            position.style.height = '180px';
            position.style.marginLeft = 'auto';
            position.style.marginTop = '5%';
        }

    }


    initImage() {
        const config = {
            w: 680,
            h: 360
        };
        if (this.browserInfo.isSmallDevice) {
            config.w = 340;
            config.h = 180;
        }

        let count = 1;
        // let canvasImg;
        const promise = new JSZip.external.Promise( (resolove: any, reject: any) => {
            JSZipUtils.getBinaryContent(animationZip, (err: any, data: any) => {
                if (err) {
                    throw err; // or handle err
                }

                JSZip.loadAsync(data).then( (url: any) => {
                    url.forEach( ( a: any, b: any) => {
                        const fileName = b.name;
                        let base64Img;
                        let imgEle: any;
                        url.file(fileName).async('base64').then( (img: any) => {
                                base64Img = 'data:image/png;base64,' + img;
                                const index = Number.parseInt(b.name.split('.')[0]) - 1;
                                /*Konva.Image.fromURL(base64Img, (image: Konva.Image) => {
                                    image.setAttrs({
                                        id : 'animationImg' + index,
                                        name  : 'konvaImg',
                                        x: 0,
                                        y: 0,
                                        width: config.w,
                                        height: config.h,
                                        opacity: index === 0 ? 1 : 0,
                                    })
                                    // image is Konva.Image instance
                                    //this.layer.add(image);
                                    //this.layer.draw();
                                });*/
                                //this.map.set(index,  base64Img) ;
                                imgEle = new Image();

                                imgEle.onload = () => {

                                   /* canvasImg = new Konva.Image({
                                        image: imgEle,
                                        id : 'animationImg' + index,
                                        name  : 'konvaImg',
                                        x: 0,
                                        y: 0,
                                        width: config.w,
                                        height: config.h,
                                        opacity: index === 0 ? 1 : 0,
                                        listening : false

                                    });
                                    this.layer.add(canvasImg);
                                    this.stage.add(this.layer);*/
                                    //imgEle.src = null;


                                    //arry.push(imgEle);
                                    //delete arry[0];
                                    //imgEle.remove();
                                    this.map.set(index, imgEle);
                                    if (index === 1 ) {
                                        this.canvasImg = new Konva.Image(
                                            {
                                                image: imgEle,
                                            x: 0,
                                            y: 0,
                                            width: config.w,
                                            height: config.h,
                                            listening: false
                                        });

                                       this.canvasImg.cache({ x: 0,
                                            y: 0,
                                            width: config.w,
                                            height: config.h, });
 
                                        this.layer.add(this.canvasImg);
                                        this.layer.draw();
                                    }



                                };
                                imgEle.src = base64Img;



                                //this.map.set(index,  imgEle) ;
                                //console.log(this.viewModel.$data)
                               /* const imgData = {
                                    index : index,
                                    base64Img : base64Img
                                };*/

                                //this.viewModel.$data.imgArry.push(imgData);
                                if (count === 135)  {
                                    ViewController.getInstance().hideLoading();
                                }
                                count++;

                        });

                    });

                });

            });

        });


    }


    //控制动画

    playAndPause(play: boolean) {

        this.play = play;
        //
        if ( this.timerId ) {
            return;
        }
        //
        if ((window as any).viewHandler.viewModel.$data.sliderNum === 135 && this.play && this.ctrl) {
            (window as any).viewHandler.viewModel.$data.sliderNum = 1;
        }
        this.animationRender();


    }

    animationRender() {
        this.timerId = setTimeout(() => {
            if ((window as any).viewHandler.viewModel.$data.sliderNum < 135 && this.play) {
                (window as any).viewHandler.viewModel.$data.sliderNum += 1;
                this.ctrl = false;
                this.animationRender();
            } else if ((window as any).viewHandler.viewModel.$data.sliderNum >= 135 && this.play) {
                (window as any).viewHandler.viewModel.$data.isPlay = false;
                this.ctrl = true;
                console.log('计时器停止');
                clearInterval(this.timerId);
                this.timerId = null;
            } else {
                console.log('计时器停止');
                clearInterval(this.timerId);
                this.timerId = null;
            }

        }, 45);
    }

    //通过滑条让动画停在某一帧的位置
    setAnimationImgPosition(num: number, lastNum: number) {
        if (num === 135) {
            this.ctrl = true;
        }

        this.hideImg();
        const index = (num - 1);

       /* this.layer.find('.konvaImg').each( (el: Konva.Node) => {
            el.opacity(0);
        } );
        console.log(this.layer.findOne('#animationImg' + index));
        this.layer.findOne('#animationImg' + index).opacity(1);
        this.layer.batchDraw();*/
        const config = {
            w: 680,
            h: 360
        };
        if (this.browserInfo.isSmallDevice) {
            config.w = 340;
            config.h = 180;
        }
       if (this.canvasImg) {
           // console.log('destory');
           this.canvasImg.destroy();
       }

       // const transformIndex = this.transformMap(index);
        this.canvasImg = new Konva.Image({
            // image: this.map.get(transformIndex),
            image: this.map.get(index),
            id : 'animationImg' + index,
            name  : 'konvaImg',
            x: 0,
            y: 0,
            width: config.w,
            height: config.h,
            listening : false

        });
        //console.log(this.map.get(index));
        //this.canvasImg.image( this.map.get(index))
        //this.canvasImg.draw();
       this.layer.add(this.canvasImg);
        this.layer.draw();


        /*id : 'animationImg' + index,
            name  : 'konvaImg',*/
       // document.getElementById('animation' + index ).style.visibility = 'visible';
        /*document.getElementById('p').innerHTML = '';
        document.getElementById('p').appendChild( (this.map.get(num - 1) as any));*/
        //(this.map.get(num - 1) as any).innerHTML;
       /* const img = new Image();
        img.src = this.map.get(num - 1) as any;
        this.ctx.drawImage(img, 0, 0, 680, 360);*/

            //(this.animation as any).src =  this.map.get(num - 1) as any;
    }

    //在对应下标时读取同一张图
/*    transformMap(index: number) {
        if ( index >= 0 && index <= 20 ) {
            return 0;
        } else if ( index >= 41 && index <= 70) {
            return 41;
        } else if (index >= 133 && index <= 146) {
            return 133;
        } else if ( index >= 182 && index <= 192) {
            return 182;
        } else {
            return index;
        }
    }*/

    hideImg () {
        const imgs = document.getElementsByName('animationImg');
        const imgSize = imgs.length;
        for (let i = 0; i < imgSize; i++) {
            imgs[i].style.visibility = 'hidden';
        }
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        (window as any).viewHandler.viewModel.$data.sliderNum = 1;
        (window as any).viewHandler.viewModel.$data.isPlay = false;
        this.ctrl = false;
        if ( this.timerId ) {
            clearInterval(this.timerId);
            this.timerId = null;
        } else {
            return;
        }
    }

}
