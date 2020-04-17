import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Ydybfc} from './ydybfc';
import {Detector} from '../../../../../src/util/Detector';

export class YdfcViewHandler extends CommonViewHandler implements ViewHandler {


    public mountaion: Ydybfc;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion = new Ydybfc(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }


    resize(): void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion.resize(width, height);
    }

    reset(): void {
        //重置页面
        this.viewModel.$data.month = 7;
        this.viewModel.$data.day = 3;
        this.viewModel.$data.year = 7;
        this.viewModel.$data.formula = true;
        this.viewModel.$data.emptyFormula = false;

        document.getElementById('spin1').style.zIndex = '5';
        document.getElementById('spin2').style.zIndex = '5';
        document.getElementById('spin3').style.zIndex = '5';

        (this.viewModel.$refs.spinOne as any).reset();
        (this.viewModel.$refs.spinTwo as any).reset();
        (this.viewModel.$refs.spinThree as any).reset();

        setTimeout(() => {
            this.viewModel.$data.formula = false;
            this.viewModel.$data.emptyFormula = true;
        }, 2000);
    }

    //隐藏左侧公式
    hideControlElement() {
        this.viewModel.$data.leftFormula1 = false;
        this.viewModel.$data.leftFormula2 = false;
        this.viewModel.$data.leftFormula3 = false;
    }

    //展示左侧公式
    showControlElement() {
        this.viewModel.$data.leftFormula1 = true;
        this.viewModel.$data.leftFormula2 = true;
        this.viewModel.$data.leftFormula3 = true;
    }

}
