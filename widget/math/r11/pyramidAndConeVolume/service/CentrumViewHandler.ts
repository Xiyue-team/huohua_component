/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Centrum3dModel} from './Centrum3dModel';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

export class CentrumViewHandler extends CommonViewHandler implements ViewHandler {


    mountaion: Centrum3dModel;
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
        this.mountaion = new Centrum3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading(1000);
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.mountaion.resize(width, height);
    }

    reset():  void {


        //throw new Error('Method not implemented.');
        this.viewModel.$data.disabledButton = false;
        this.mountaion.control = false;
        this.mountaion.controlAnimation = false;
        this.mountaion.animationclose = true;
        const display = document.getElementById('shownum');
        (display as HTMLInputElement).value   = '0';
        for ( let i = 0; i < 20; i++) {
            this.mountaion.resetCamera();
        }

        this.viewModel.$data.arris   = 4;
        this.viewModel.$data.volume  = 8;
        this.viewModel.$data.mheight = 6;

    }


}
