import { Detector } from '../../../../../src/util/Detector';
import { ViewController } from '../../../../../src/core/ViewController';
import { TfCanvas } from './TfCanvas';
import { KonvaViewHandler } from '../../../../../src/core/viewHandler/KonvaViewHandler';
import { SceneSimpleLoader } from './SceneSimpleLoader';
export class EthaneViewHandler extends KonvaViewHandler {
    constructor(vm) {
        super(vm);
    }
    beforeRenderElement() {
        //throw new Error('Method not implemented.');
    }
    domReady() {
        super.domReady();
        this.shiNengCanvas = new TfCanvas();
        this.model = new SceneSimpleLoader();
        this.model.createScene();
        ViewController.getInstance().hideLoading();
    }
    resize() {
        Detector.forceMobildLandscape();
        this.model.resize();
    }
    reset() {
        this.model.model.rotation = new BABYLON.Vector3(0, 0, 0);
        this.model.model.rotationQuaternion = new BABYLON.Quaternion(-0.7071067811865476, 0, 0, -0.7071067811865476);
        this.model.camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        this.shiNengCanvas.arrowImg.rotation(0);
        this.shiNengCanvas.staticLayer.draw();
        window.viewHandler.viewModel.$data.cdgx = true;
        window.viewHandler.viewModel.$data.nqgx = false;
        window.viewHandler.viewModel.$data.jcgx = false;
        this.shiNengCanvas.waveImg.style.width = 0.001 + 'px';
    }
}
//# sourceMappingURL=EthaneViewHandler.js.map