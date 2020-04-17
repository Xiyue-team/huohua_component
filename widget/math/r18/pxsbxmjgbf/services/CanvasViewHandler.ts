/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/11/24 14:44
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Vue} from 'vue/types/vue';
import {CanvasStage} from './CanvasStage';

export class CanvasViewHandler extends CommonViewHandler implements ViewHandler {

    canvasStage: CanvasStage;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        this.canvasStage = new CanvasStage();
    }

    resize():  void {

    }

    reset():  void {
        this.canvasStage.reset();
    }

}
