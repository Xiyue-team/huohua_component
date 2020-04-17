/**
 *
 *@since 2.0
 *@author huangjian
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {ShiNengCanvas} from './ShiNengCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import {SceneSimpleLoader} from './SceneSimpleLoader';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {


    model: SceneSimpleLoader;
    shiNengCanvas: ShiNengCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.shiNengCanvas = new ShiNengCanvas();

        this.model = new SceneSimpleLoader();
        this.model.createScene();

        ViewController.getInstance().hideLoading();


    }

    resize():  void {
        Detector.forceMobildLandscape();
        this.model.resize();
    }

    reset():  void {
        this.model.model.rotation = new BABYLON.Vector3(0, 0, 0);
        this.model.model.rotationQuaternion = new BABYLON.Quaternion(-0.7071067811865476, 0, 0, -0.7071067811865476);
        (this.model.camera as any).setPosition(new BABYLON.Vector3(0, 0, 20));

        this.shiNengCanvas.changeStyle(0, this.shiNengCanvas.orgColor, this.shiNengCanvas.text1);
    }

}
