import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import AxisScene1 from './AxisScene1';
import CircleScene2 from './CircleScene2';
import { fabric } from 'fabric';
import ShareElement from './ShareElement';
import { ImageEvent } from './ImageEvent';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    yzddxCanvas1: AxisScene1;
    yzddxCanvas2: CircleScene2;
    shareElement: ShareElement;
    imageEvent: ImageEvent;
    myCanvas: fabric.Canvas;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.yzddxCanvas1 = new AxisScene1();
        this.yzddxCanvas2 = new CircleScene2();
        this.shareElement = new ShareElement();
        this.imageEvent = new ImageEvent();

        (document.getElementById('storyCanvas') as any).width = window.innerWidth;
        (document.getElementById('storyCanvas') as any).height = window.innerHeight;
        this.myCanvas = new fabric.Canvas('storyCanvas');
        this.myCanvas.selection = false;


        setTimeout(() => {
            for (let i = 0; i < this.shareElement.myCanvas.length - 1; i++) {
              this.myCanvas.add(this.shareElement.myCanvas[i]);
            }

            for (let i = 0; i < this.yzddxCanvas1.myCanvas.length; i++) {
                this.myCanvas.add(this.yzddxCanvas1.myCanvas[i]);
            }

            for (let i = 0; i < this.yzddxCanvas2.myCanvas.length; i++) {
                this.myCanvas.add(this.yzddxCanvas2.myCanvas[i]);
                this.yzddxCanvas2.myCanvas[i].set('visible', false);
            }

            this.myCanvas.add(this.shareElement.myCanvas[this.shareElement.myCanvas.length - 1]);

            this.imageEvent.whiteBackgroundClickEvent(this.shareElement.myCanvas[this.shareElement.myCanvas.length - 1],
                this.yzddxCanvas1.myCanvas, this.yzddxCanvas2.myCanvas, this.yzddxCanvas1.decisionRule, this.yzddxCanvas2.decisionRule);
        }, 1000);



        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();

        // 分别重置两个场景内容
        this.yzddxCanvas1.reset();
        this.yzddxCanvas2.reset();

        // 显示场景1
        this.imageEvent.whiteBackgroundClickEnd = false;
        this.imageEvent.whiteBackgroundEvrnt(this.yzddxCanvas1.myCanvas, this.yzddxCanvas2.myCanvas,
          this.yzddxCanvas1.decisionRule, this.yzddxCanvas2.decisionRule, true);

        this.myCanvas.renderAll();
    }

}
