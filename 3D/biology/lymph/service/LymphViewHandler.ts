/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13:23
 */
import {ViewHandler} from '../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../src/core/CommonViewHandler';
import {Lymph3DModel} from './Lymph3DModel';
import {Gltf3DModel} from '../../../src/three/Gltf3DModel';
import {D3Helper} from '../../../src/three/util/3DHelper';

export class LymphViewHandler extends CommonViewHandler implements ViewHandler {


    lymphModel: Lymph3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        super.domReady();
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        this.lymphModel = new Lymph3DModel(document.getElementById('3dContainer'));
        //let d3Helper = new D3Helper(this.nucleusModel );
        //d3Helper.axisHelper(700);
        //d3Helper.gridHelper();
        /*  d3Helper.lightHelper();*/
         //d3Helper.camerHelper();
    }

    resize(): void {

        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        console.log('width:' + width + ', height: ' + height);
        this.lymphModel.resize(width, height);
        //throw new Error('Method not implemented.');
    }

    reset(): void {
        //throw new Error('Method not implemented.');
    }

    runTest(): void {
        //this.nucleusModel.runAnimation();
    }

    /**
     * 播放动画
     */
    playAnimation(): void {
        if (this.viewModel.$data.alpha === true) {
            //play alpha animation
            //this.nucleusModel.showAlphaAnimation();
        } else if (this.viewModel.$data.beta === true) {
            //play beta animation
            //this.nucleusModel.showBetaAnimation();
        }

    }

    /**
     * 暂停动画
     */
    pauseAnimation(): void {
        if (this.viewModel.$data.alpha === true) {
            //pause alpha animation
            //this.nucleusModel.pauseAlphaAnimation();
        } else if (this.viewModel.$data.beta === true) {
            //pause beta animation
            //this.nucleusModel.pauseBetaAnimation();
        } else  {
            //reset
        }
    }


}