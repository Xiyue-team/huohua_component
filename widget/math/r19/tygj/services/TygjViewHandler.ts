import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Line3dModel} from './Line3dModel';
export class TygjViewHandler extends CommonViewHandler implements ViewHandler {
    public Model: Line3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady () {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.Model = new Line3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    stepChange (type: string) {
        if (this.Model) {
            if (type === 'step1') {
                this.Model.stepOne();
            }
            if (type === 'step2') {
                this.Model.stepTwo();
            }
        } 
    }

    resize(): void {
        super.resize();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.Model.resize(width, height);
    }
}
