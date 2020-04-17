import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {AuroraScenes} from './AuroraScenes';
import {D3Helper} from '../../../../../src/three/util/3DHelper';

/**
 *极光的原理
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-27 上午9:37
 *
 */

export class AuroraViewHandler extends CommonViewHandler implements ViewHandler {

    auroraScenes: AuroraScenes;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
        const modelElement = document.getElementById('3dContainer');
        const width  = modelElement.clientWidth;
        const height = modelElement.clientHeight;

        this.auroraScenes = new AuroraScenes(modelElement, null, width, height);

       /* const d3Helper = new D3Helper(this.auroraScenes);
        d3Helper.axisHelper(700);
        d3Helper.gridHelper();*/
    }

    reset() {
      (this.viewModel as any).resetEvent();
      this.auroraScenes.microModel.hideScene();
      this.auroraScenes.macroModel.reset();
      //this.auroraScenes
    }

}
