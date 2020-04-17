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
    private obj1: any;
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
        console.log(dragEvtArray)
        ViewController.getInstance().hideLoading(1000);
    }
    changeLocal(x: any, y: any, letter: any ) {
        const box = document.getElementById('leftPanel').getBoundingClientRect().right;
        const topBoxBottom = document.getElementById('topBox').getBoundingClientRect().bottom;
        const topBox = document.getElementById('topBox');
        const bottomBox = document.getElementById('bottomBox');
        const userAgent = navigator.userAgent;
        const isEdge = userAgent.indexOf('Edge') > -1;
        const isIE = userAgent.indexOf('.NET') > -1;
        const op = (window as any).viewHandler.viewModel.$data.zoom1;

        if (isEdge || isIE) {
            this.obj = $('.img').height() * op;
            this.obj1 = $('.head').height() * op;
        } else {
            this.obj = $('.img').height();
            this.obj1 = $('.head').height();
        }

        if (x < box && y < topBoxBottom) {
            topBox.style.background = '#E6E6E6';
        } else {
            topBox.style.background = '#F6F6F6';
        }
        if (x < box && y > (topBoxBottom - this.obj - this.obj1)) {
            bottomBox.style.background = '#E6E6E6';
        } else {
            bottomBox.style.background = '#F6F6F6';
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
