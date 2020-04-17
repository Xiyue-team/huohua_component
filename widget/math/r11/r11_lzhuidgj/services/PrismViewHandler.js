import { CommonViewHandler } from '../../../../src/core/CommonViewHandler';
import { Prism3dModel } from './Prism3dModel';
import { Detector } from '../../../../src/util/Detector';
export class PrismViewHandler extends CommonViewHandler {
    constructor(vm) {
        super(vm);
    }
    beforeRenderElement() {
        //throw new Error('Method not implemented.');
    }
    domReady() {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        //this.gltf = new Gltf3DModel(document.getElementById('3dContainer'))
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.pyramid3dModel = new Prism3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        // let d3Helper = new D3Helper(this.pyramid3dModel);
        // d3Helper.axisHelper(700);
        // d3Helper.gridHelper();
        //d3Helper.lightHelper();
        //d3Helper.camerHelper();
    }
    resize() {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.pyramid3dModel.resize(width, height);
    }
    reset() {
        //throw new Error('Method not implemented.');
    }
    runTest() {
        //this.gltf.action.reset();
    }
}
//# sourceMappingURL=PrismViewHandler.js.map