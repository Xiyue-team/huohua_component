/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import {HammerDragEvent} from './HammerDragEvent';
import $ from 'jquery-ts';
export class ZhswyyhswViewHandler extends CommonViewHandler implements ViewHandler {
    private obj: any;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        this.initElement();
        ViewController.getInstance().hideLoading();
    }
    
    /**
     * 初始化对象
     */
    async initElement() {
        const dragEvtArray = [];
        for (let i = 0; i < 10; i++) {
           const a = new HammerDragEvent(this.viewModel, 'image' + i, (x: any, y: any) => {
                this.changeLocal( x , y, 'image' + i);
            });
            dragEvtArray.push(a);
        }
        ViewController.getInstance().hideLoading(1000);
    }
    changeLocal(x: any, y: any, letter: any ) {
        const userAgent = navigator.userAgent;
            const isEdge = userAgent.indexOf('Edge') > -1;
            const isIE = userAgent.indexOf('.NET') > -1;
            const op = (window as any).viewHandler.viewModel.$data.zoom1;
        if (isEdge || isIE) {
            const HORIZONTAL_BOX1 = document.getElementById('box1').getBoundingClientRect().left;
            const VERTICAL_BOX1 = $('.box1').height() * op;
            const VERTICAL_BOX1_WIDTH = $('.box1').width() * op;
            const VERTICAL_BOX1_HEIGHT = document.getElementById('box1').getBoundingClientRect().top;
            
            const HORIZONTAL_BOX2 = document.getElementById('box2').getBoundingClientRect().left;
            const VERTICAL_BOX2 = $('.box2').height() * op;
            const VERTICAL_BOX2_WIDTH = $('.box2').width() * op;
            const VERTICAL_BOX2_WIDTH_HEIGHT = document.getElementById('box2').getBoundingClientRect().top;
            const BOX_WIDTH = $('.img').width() * 1.2 * op;

            this.obj = {
                box1: {
                    minOffsetLeft: HORIZONTAL_BOX1 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX1_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX1 + VERTICAL_BOX1_WIDTH,
                    maxOffsetTop: VERTICAL_BOX1_HEIGHT + VERTICAL_BOX1
                },
                box2: {
                    minOffsetLeft: HORIZONTAL_BOX2 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX2  + VERTICAL_BOX2_WIDTH  ,
                    maxOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT  + VERTICAL_BOX2  ,
                },
            };
        } else {
            const HORIZONTAL_BOX1 = document.getElementById('box1').getBoundingClientRect().left;
            const VERTICAL_BOX1 = $('.box1').height();
            const VERTICAL_BOX1_WIDTH = $('.box1').width();
            const VERTICAL_BOX1_HEIGHT = document.getElementById('box1').getBoundingClientRect().top;
            
            const HORIZONTAL_BOX2 = document.getElementById('box2').getBoundingClientRect().left;
            const VERTICAL_BOX2 = $('.box2').height();
            const VERTICAL_BOX2_WIDTH = $('.box2').width();
            const VERTICAL_BOX2_WIDTH_HEIGHT = document.getElementById('box2').getBoundingClientRect().top;
            const BOX_WIDTH = $('.img').width() * 1.2;

            this.obj = {
                box1: {
                    minOffsetLeft: HORIZONTAL_BOX1 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX1_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX1 + VERTICAL_BOX1_WIDTH,
                    maxOffsetTop: VERTICAL_BOX1_HEIGHT + VERTICAL_BOX1
                },
                box2: {
                    minOffsetLeft: HORIZONTAL_BOX2 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX2  + VERTICAL_BOX2_WIDTH  ,
                    maxOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT  + VERTICAL_BOX2  ,
                },
            };
        }

        const ACQUIRE_ELEMENT_BOX1 = document.getElementById('box1');
        const ACQUIRE_ELEMENT_BOX2 = document.getElementById('box2');

        if (x > this.obj.box1.minOffsetLeft && y > this.obj.box1.minOffsetTop &&
            x < this.obj.box1.maxOffsetLeft && y < this.obj.box1.maxOffsetTop) {
            ACQUIRE_ELEMENT_BOX1.style.background = '#E6E6E6';
        } else {
            ACQUIRE_ELEMENT_BOX1.style.background = '#F6F6F6';
        }
        if ( x > this.obj.box2.minOffsetLeft && y > this.obj.box1.minOffsetTop &&
            x < this.obj.box2.maxOffsetLeft && y < this.obj.box2.maxOffsetTop) {
            ACQUIRE_ELEMENT_BOX2.style.background = '#E6E6E6';
        } else {
            ACQUIRE_ELEMENT_BOX2.style.background =  '#F6F6F6';
        }
    }

    /**
     * 重置窗口大小
     */
    resize():  void {
        super.resize();
    }

    /**
     * 重置
     */
    reset():  void {
        (this.viewModel as any).reset();
    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
