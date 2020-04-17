/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Sqxddsdy3dModel} from './Sqxddsdy3dModel';

export class SqxddsdyViewHandler extends CommonViewHandler implements ViewHandler {


    sqxddy: Sqxddsdy3dModel;

    constructor(vm: Vue) {
        super(vm);

    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        console.log(width, '14541', height);
        this.sqxddy = new Sqxddsdy3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.sqxddy.resize(width, height);
    }

    reset():  void {
        this.sqxddy.reset();
        // this.sqxddy.resetModelPosition();


    }
    button1 () {

      this.sqxddy.button1();

    }

    runTest():  void {
        //this.gltf.action.reset();
    }

}
