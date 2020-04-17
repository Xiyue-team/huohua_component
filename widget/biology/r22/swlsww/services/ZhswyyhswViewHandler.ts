/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { ViewController } from '../../../../../src/core/ViewController';
import {HammerDragEvent} from './HammerDragEvent';
export class ZhswyyhswViewHandler extends CommonViewHandler implements ViewHandler {
    public hammerDragEvent: HammerDragEvent;
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
         this.hammerDragEvent = new HammerDragEvent(this.viewModel, 'image' + i, (x: any, y: any) => {
                this.changeLocal( x , y, 'image' + i);
            });
            dragEvtArray.push(this.hammerDragEvent);
        }
        ViewController.getInstance().hideLoading(1000);
    }
    changeLocal(x: any, y: any, letter: any ) {
    }

    //点击删除
    clickDelete() {
        this.hammerDragEvent.clickDelete();
    }

    //重置
    clearArr() {
        this.hammerDragEvent.clearArr();
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
        this.hammerDragEvent.reset();
        (this.viewModel as any).reset();
    }
}
