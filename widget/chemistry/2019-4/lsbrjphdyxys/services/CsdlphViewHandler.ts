import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Csdlph} from './Csdlph';
export class CsdlphViewHandler extends CommonViewHandler implements ViewHandler {
    public Model: Csdlph;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.Model = new Csdlph(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }
    resize(): void {
        super.resize();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.Model.resize(width, height);
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.buttonChange();
            (this.viewModel as any).active1 = true;
            this.Model.changeEvent(1);
        } else if (index === 2) {
            this.buttonChange();
            (this.viewModel as any).active2 = true;
            this.Model.changeEvent(2);
        } else if (index === 3) {
            this.buttonChange();
            (this.viewModel as any).active3 = true;
            this.Model.changeEvent(3);
        } else if (index === 4) {
            this.buttonChange();
            (this.viewModel as any).active4 = true;
            this.Model.changeEvent(4);
        }
    }

    // 控制按钮是否选中状态
    buttonChange() {
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).active4 = false;
    }
    reset(): void {
        (this.viewModel as any).reset();
    }

}
