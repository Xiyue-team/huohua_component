import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {ViewController} from '../../../../../src/core/ViewController';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import {Vue} from 'vue/types/vue';
import { Game } from './Game';

export class YzxViewHandler extends CommonViewHandler implements ViewHandler {

    game: Game;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        const container = document.getElementById('3dContainer');
        const canvas = document.getElementById('fcCanvas') as HTMLCanvasElement;
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(container.offsetWidth / 2) * 2 * devicePixelRatio;
        canvas.height = Math.floor(document.body.clientHeight / 2) * 2 * devicePixelRatio;
        this.game = new Game(canvas, (this.viewModel as any).formula);
        ViewController.getInstance().hideLoading(1000);
    }

    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        (this.viewModel as any).resetEvent();
        this.game.reset();
    }

}
