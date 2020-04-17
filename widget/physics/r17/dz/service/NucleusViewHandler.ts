
import {ViewHandler,ViewOption} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Nucleus3DModel} from './Nucleus3DModel';
import {Gltf3DModel} from '../../../../../src/three/Gltf3DModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';
import {ViewController} from '../../../../../src/core/ViewController';

export class NucleusViewHandler extends CommonViewHandler implements ViewHandler {

    nucleusModel: Nucleus3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error("Method not implemented.");
    }

    domReady(): void {
        super.domReady();
        this.nucleusModel = new Nucleus3DModel(document.getElementById('3dContainer'));
        //let d3Helper = new D3Helper(this.nucleusModel );
        //d3Helper.axisHelper(700);
        //d3Helper.gridHelper();
        /*  d3Helper.lightHelper();*/
         //d3Helper.camerHelper();
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance().hideLoading();
    }

    resize(): void {
        //throw new Error("Method not implemented.");
    }

    reset(): void {
        //throw new Error("Method not implemented.");
        this.nucleusModel.rest();
        (window as any).viewHandler.viewModel.$data.playSrc = (window as any).viewHandler.viewModel.$data.pp

    }

    runTest(): void {
        //this.nucleusModel.runAnimation();

    }

    /**
     * 播放动画
     */
    playAnimation(): void {



    }

    /**
     * 暂停动画
     */
    pauseAnimation(): void {

    }

}
