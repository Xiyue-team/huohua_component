import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Dihedral3DModel} from './Dihedral3DModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';
import {Vector3} from 'three';

export class DihedralViewHandler extends CommonViewHandler implements ViewHandler {


    gltf: Dihedral3DModel;


    constructor(vm: Vue) {
        super(vm);

    }


    beforeRenderElement(): void {
        //throw new Error('Method not implemented.');
    }


    domReady(): void {
        super.domReady();
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        const width  = document.getElementById('box').clientWidth;
        const height = document.getElementById('box').clientHeight;

        this.gltf = new Dihedral3DModel(document.getElementById('box'), null, width, height);
    }



    //绑定滑块拖动事件
    dragSliderEvent(sliderNum: any, currentAngle: any) {
       this.gltf.rotatePlane(sliderNum, currentAngle);
    }


    resize(): void {
        //throw new Error('Method not implemented.');
    }

    reset(): void {
        //throw new Error('Method not implemented.');
        this.viewModel.$data.enable = false;
        this.viewModel.$data.sliderNum = 60;
        this.viewModel.$data.angleEnable = false;

        this.gltf.bottomAnimationEnable = false;
        this.gltf.topAnimationEnable = false;

        this.gltf.resetGeomtry();
        this.gltf.resetCamera();

    }
}
