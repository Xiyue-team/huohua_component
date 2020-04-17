import { CommonViewHandler } from '../../../../src/core/CommonViewHandler';
import { Dihedral3DModel } from './Dihedral3DModel';
export class DihedralViewHandler extends CommonViewHandler {
    constructor(vm) {
        super(vm);
    }
    beforeRenderElement() {
        //throw new Error('Method not implemented.');
    }
    domReady() {
        super.domReady();
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        const width = document.getElementById('box').clientWidth;
        const height = document.getElementById('box').clientHeight;
        this.gltf = new Dihedral3DModel(document.getElementById('box'), null, width, height);
    }
    //绑定滑块拖动事件
    dragSliderEvent(sliderNum, currentAngle) {
        this.gltf.rotatePlane(sliderNum, currentAngle);
    }
    resize() {
        //throw new Error('Method not implemented.');
    }
    reset() {
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
//# sourceMappingURL=DihedralViewHandler.js.map