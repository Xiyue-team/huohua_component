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
import {Zmdxgc3dModel} from './Zmdxgc3dModel';

export class ZmdcgxViewHandler extends CommonViewHandler implements ViewHandler {


    zmdcgx: Zmdxgc3dModel;
    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        const dom = document.getElementById('3dContainer');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.zmdcgx = new Zmdxgc3dModel(dom, fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const dom = document.getElementById('3dContainer');
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.zmdcgx.resize(width, height);
    }

    display(): void {
        this.zmdcgx.display();
    }

    hide(): void {
      this.zmdcgx.hide();
    }


    reset(): void {
        this.zmdcgx.reset();
    }
}
