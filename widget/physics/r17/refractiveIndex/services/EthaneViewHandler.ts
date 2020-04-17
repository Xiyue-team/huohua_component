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
import {LightCanvas} from './LightCanvas';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import * as img from '../sub_static/air1.png';
import * as img1 from '../sub_static/water1.png';
import * as img2 from '../sub_static/air3.png';
import * as img3 from '../sub_static/Group4.png';
import * as img4 from '../sub_static/water3.png';
import * as img5 from '../sub_static/Group5.png';
export class EthaneViewHandler extends KonvaViewHandler implements ViewHandler {

    shiNengCanvas: LightCanvas;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }

    domReady():  void {
        super.domReady();
        this.shiNengCanvas = new LightCanvas();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    reset():  void {
      this.viewModel.$data.material1 = '空气';
      this.viewModel.$data.material2 = '水';
      this.viewModel.$data.n1 = 1;
      this.viewModel.$data.n2 = 1.33;
      this.viewModel.$data.img = img;
      this.viewModel.$data.img1 = img1;
      this.viewModel.$data.img2 = img2;
      this.viewModel.$data.img3 = img3;
      this.viewModel.$data.img4 = img4;
      this.viewModel.$data.img5 = img5;
      this.shiNengCanvas.lightImage.style.transform = 'rotate(' + 45 + 'deg)';
      this.shiNengCanvas.lineImage.style.transform = 'rotate(' + 57.883 + 'deg)';
      this.shiNengCanvas.theta = 45 / 180 * Math.PI;
    }

}
