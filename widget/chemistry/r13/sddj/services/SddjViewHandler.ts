import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {Circle, default as Konva, Group, Layer, Stage} from 'konva';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {SddjCanvasAnimation} from './SddjCanvasAnimation';




export class SddjViewHandler extends KonvaViewHandler implements ViewHandler {

    group: Group;

    sddjCanvasAnima: SddjCanvasAnimation;


    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.sddjCanvasAnima = new SddjCanvasAnimation();



    }





    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        this.sddjCanvasAnima.reset();

    }

}
