/**
 *
 */
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Detector } from '../../../../../src/util/Detector';
import { ViewController } from '../../../../../src/core/ViewController';
import { Line3dModel } from './Line3dModel';
export class LineTestViewHandler extends CommonViewHandler implements ViewHandler {

    threeModel: Line3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {

    }

    domReady(): void {
        super.domReady();
        this.initElement();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.threeModel = new Line3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }
    // 拖动事件
    chengvalue(num: any) {
        this.threeModel.changeRadius(num);
    }

    /**
     * 初始化对象
     */
    initElement() { }


    /**
     * 重置窗口大小
     */
    resize(): void {
        Detector.forceMobildLandscape();
    }

    /**
     * 重置
     */
    reset(): void {
        
        this.threeModel.resetModelPosition();
        (this.viewModel as any).reset();
        if (!this.viewModel.$data.initEquation) {
            this.viewModel.$data.a = -1;
            this.viewModel.$data.b = -1;
            this.viewModel.$data.r = 3;
            // (this.viewModel.$refs.spin1 as any).reset();
            // (this.viewModel.$refs.spin2 as any).reset();
            // (this.viewModel.$refs.spin3 as any).reset();
        }
        // this.threeModel.resetModelPosition();
        
    }

    runTest(): void { }

    hideControlElement() {
        this.viewModel.$data.showEquation = false;
    }

    showControlElement() {
        this.viewModel.$data.showEquation = true;
    }
}
