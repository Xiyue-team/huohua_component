import { CommonViewHandler } from '../../../../src/core/CommonViewHandler';
import { Mountaion3dModel } from './Mountaion3dModel';
import { Detector } from '../../../../src/util/Detector';
export class MountainViewHandler extends CommonViewHandler {
    constructor(vm) {
        super(vm);
    }
    beforeRenderElement() {
        //throw new Error("Method not implemented.");
    }
    domReady() {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion = new Mountaion3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
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
        //throw new Error("Method not implemented.");
        this.viewModel.$data.arris = 4;
        this.viewModel.$data.volume = 10;
        this.viewModel.$data.mheight = 5;
        this.viewModel.$data.angle = 90;
        this.mountaion.control = false;
        this.mountaion.controlAnimation = false;
        this.mountaion.animationclose = true;
        const display = document.getElementById('shownum');
        display.value = '0';
        for (let i = 0; i < 20; i++) {
            this.mountaion.resetCamera();
        }
    }
    runTest() {
        //this.gltf.action.reset();
    }
}
//# sourceMappingURL=MountainViewHandler.js.map