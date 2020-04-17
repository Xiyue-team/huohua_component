import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';

export class CellViewHandler extends CommonViewHandler implements ViewHandler {
    scaleY: number;
    characterSize: any;
    i: number;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        this.scaleY = document.body.clientHeight / 953;
        this.characterSize = document.getElementsByClassName('characters');
        for ( this.i = 0; this.i < this.characterSize.length; this.i ++) {
            this.characterSize[this.i].style.zoom = this.scaleY;
        }
        ViewController.getInstance().hideLoading();
    }

    init() {

    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        (this.viewModel as any).reset();
    }

}
