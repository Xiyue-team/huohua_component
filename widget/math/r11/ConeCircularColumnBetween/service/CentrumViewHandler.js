import { CommonViewHandler } from '../../../../src/core/CommonViewHandler';
import { Centrum3dModel } from './Centrum3dModel';
import { Detector } from '../../../../src/util/Detector';
export class CentrumViewHandler extends CommonViewHandler {
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
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion = new Centrum3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        // let d3Helper = new D3Helper(this.mountaion );
        // d3Helper.axisHelper(700);
        // d3Helper.gridHelper();
        /*  d3Helper.lightHelper();*/
        // d3Helper.camerHelper();
    }
    resize() {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion.resize(width, height);
    }
    reset() {
        //throw new Error('Method not implemented.');
        this.viewModel.$data.arris = 100;
        this.viewModel.$data.volume = 100;
        this.viewModel.$data.mheight = 100;
        this.mountaion.zhu = false;
        this.mountaion.zhui = false;
        this.mountaion.tai = true;
        for (let i = 0; i < 20; i++) {
            this.mountaion.resetCamera();
        }
    }
    runTest() {
        //this.gltf.action.reset();
    }
}
//# sourceMappingURL=CentrumViewHandler.js.map