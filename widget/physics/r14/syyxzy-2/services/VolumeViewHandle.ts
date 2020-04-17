import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import {Volume3DModel} from './Volume3DModel';
import {FlameControl} from './FlameControl';

export class VolumeViewHandle extends CommonViewHandler implements ViewHandler {

    gltf: Volume3DModel;
    control: FlameControl;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();

        this.init3DModel();
        ViewController.getInstance().hideLoading();
    }

    init3DModel() {
        const width  = document.getElementById('3dModel').clientWidth;
        const height = document.getElementById('3dModel').clientHeight;

        this.gltf = new Volume3DModel(document.getElementById('3dModel'), null, width, height);
        this.control = new FlameControl();
    }

    resize(): void {
        super.resize();
    }

    reset(): void {
        this.control.changeStatus(2);
        this.viewModel.$data.sliderNumber1 = 2;
        this.gltf.reset();
    }

    resume() {
        this.gltf.resumeVolume();
    }

    pause() {
        this.gltf.pauseVolume();
    }

    destory() {
        this.gltf.destoryVolume();
    }
}
