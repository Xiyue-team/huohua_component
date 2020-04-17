import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Yzqxdsdy3dModel} from './Yzqxdsdy3dModel';

export class YzqxdsdyViewHandler extends CommonViewHandler implements ViewHandler {

    yzqxdsdy: Yzqxdsdy3dModel;

    constructor(vm: Vue) {
        super(vm);

    }

    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        console.log(width, '14541', height);
        this.yzqxdsdy = new Yzqxdsdy3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    button1 () {

        this.yzqxdsdy.button1();

    }

    resize():  void {
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.yzqxdsdy.resize(width, height);
    }

    reset():  void {
        this.yzqxdsdy.reset();
    }



}
