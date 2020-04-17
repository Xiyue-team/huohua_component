import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
import {Group} from 'konva';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {DlnCanvas} from './DlnCanvas';




export class DlnViewHandler extends KonvaViewHandler implements ViewHandler {

    group: Group;

    bjsCanvas: DlnCanvas;


    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.bjsCanvas = new DlnCanvas();

        ViewController.getInstance().hideLoading();
    }



    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;

        console.log((width2 - width1) / 2 + 'px' );
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
    }

}
