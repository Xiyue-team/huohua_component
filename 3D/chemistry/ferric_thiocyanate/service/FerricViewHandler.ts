/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13:23
 */
import {ViewHandler} from '../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../src/core/CommonViewHandler';
import {Ferric3DModel} from './Ferric3DModel';
import {Gltf3DModel} from '../../../src/three/Gltf3DModel';
import {D3Helper} from '../../../src/three/util/3DHelper';

export class FerricViewHandler extends CommonViewHandler implements ViewHandler {


    ferric3DModel: Ferric3DModel;
    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }

    domReady(): void {
        super.domReady();
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        this.ferric3DModel = new Ferric3DModel(document.getElementById('3dContainer'));
        //let d3Helper = new D3Helper(this.nucleusModel );
        //d3Helper.axisHelper(700);
        //d3Helper.gridHelper();
        /*  d3Helper.lightHelper();*/
         //d3Helper.camerHelper();
    }

    resize(): void {
        //throw new Error('Method not implemented.');
    }

    reset(): void {
        //throw new Error('Method not implemented.');
    }

    runTest(): void {
        //this.nucleusModel.runAnimation();
    }



}
