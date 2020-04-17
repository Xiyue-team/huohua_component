import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {HammerDragEvent} from './HammerDragEvent';

export class PressureViewHandler extends CommonViewHandler implements ViewHandler {
    timer1: any;
    timer2: any;
    timer3: any;
    scaleY: number;
    pressure: any;
    // cache指当前滑块所处的scope值
    cache: number;
    dragEvtShell: HammerDragEvent;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        this.scaleY = document.body.clientHeight / 953;
        this.pressure = document.getElementById('pressure');
        this.pressure.style.zoom = this.scaleY;
        this.initElement();
        ViewController.getInstance().hideLoading();
    }

    async initElement() {
        this.dragEvtShell = new HammerDragEvent('shell', this.scaleY, (cache: number) => {
            if (cache === 90 * this.scaleY) {
                clearTimeout(this.timer3);
                clearTimeout(this.timer1);
                clearTimeout((window as any).viewHandler.viewModel.$data.timer1);
                (window as any).viewHandler.viewModel.$data.message = '15MPa';
                (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/2.gif');
                this.timer2 = setTimeout(() => {
                    (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/3.gif');
                    }, 3760);
            } else if (cache === 110 * this.scaleY) {
                clearTimeout(this.timer2);
                (window as any).viewHandler.viewModel.$data.message = '30MPa';
                (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/4.gif');
                this.timer3 = setTimeout(() => {
                    (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/5.gif');
                }, 1500);
            }
        });
    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        (this.viewModel as any).reset();
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        this.dragEvtShell.restPosition();
        (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/0.gif');
        this.timer1 = setTimeout(() => {
            (window as any).viewHandler.viewModel.$data.molecularMotion = require('../sub_static/animation/1.gif');
            clearTimeout(this.timer1);
        }, 4750);
        (window as any).viewHandler.viewModel.$data.message = '压 强';
    }

}
