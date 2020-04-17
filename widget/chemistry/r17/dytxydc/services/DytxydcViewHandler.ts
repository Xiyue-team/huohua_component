
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
const createjs = require('createjs-npm');
export class DytxydcViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

    //停止settimeout的方法
    stopAllTimeouts() {
     let id = window.setTimeout(null, 0);
     while (id--) {
         window.clearTimeout(id);
     }
    }

    //重置方法
    reset(): void {


      for (let i = 0; i < 9; i++) {
        console.log((this.viewModel as any).bitmapArray[3].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[4].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[5].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[6].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[7].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[8].displayObject.visible = true);

      }

      for (let i = 0; i < 9; i++) {
        console.log((this.viewModel as any).bitmapArray[0].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[1].displayObject.visible = true,
          (this.viewModel as any).bitmapArray[2].displayObject.visible = true);
      }


      (this.viewModel as any).Copper.bitmap.visible = false;
      (this.viewModel as any).sheet.bitmap.visible = false;

      (this.viewModel as any).addtextCu.bitmap.visible = true;
      (this.viewModel as any).deletextCu.bitmap.visible = false;
      (this.viewModel as any).addtextZn.bitmap.visible = true;
      (this.viewModel as any).deletextZn.bitmap.visible = false;

      (this.viewModel as any).line.bitmap.visible = false;
      (this.viewModel as any).bulb.bitmap.visible = false;
      (this.viewModel as any).defects.bitmap.visible = false;
      (this.viewModel as any).bubbles.bitmap.visible = false;
      (this.viewModel as any).bubbles2.bitmap.visible = false;
      (this.viewModel as any).bubbles3.bitmap.visible = false;
      (this.viewModel as any).bubbles4.bitmap.visible = false;
      (this.viewModel as any).buttonOpen.bitmap.visible = false;
      (this.viewModel as any).buttonOpen2.bitmap.visible = false;
      (this.viewModel as any).buttonOpen3.bitmap.visible = false;
      (this.viewModel as any).buttonClose.bitmap.visible = false;
      (this.viewModel as any).buttonClose2.bitmap.visible = false;
      (this.viewModel as any).buttonClose3.bitmap.visible = false;
      (this.viewModel as any).cathodes.bitmap.visible = false;
      (this.viewModel as any).electrodes.bitmap.visible = false;
      (this.viewModel as any).totals.bitmap.visible = false;
      (this.viewModel as any).platecus.bitmap.visible = false;
      (this.viewModel as any).platezns.bitmap.visible = false;
      (this.viewModel as any).text1.visible = false;
      (this.viewModel as any).text2.visible = false;
      (this.viewModel as any).addlines.bitmap.visible = true;
      (this.viewModel as any).addlines.bitmap.alpha = 0.5;

      (this.viewModel as any).dianzi.visible  = false;
      (this.viewModel as any).dianzi1.visible = false;
      (this.viewModel as any).dianzi2.visible = false;
      (this.viewModel as any).dianzi3.visible = false;
      (this.viewModel as any).dianzi4.visible = false;
      (this.viewModel as any).dianzi5.visible = false;
      (this.viewModel as any).dianzi6.visible = false;
      (this.viewModel as any).dianzi7.visible = false;
      (this.viewModel as any).dianzi8.visible = false;
      (this.viewModel as any).dianzi9.visible = false;

      (this.viewModel as any).znlizi1.visible = false;
      (this.viewModel as any).znlizi2.visible = false;
      (this.viewModel as any).znlizi3.visible = false;
      (this.viewModel as any).znlizi1.alpha = 1;
      (this.viewModel as any).znlizi3.alpha = 0;


      (this.viewModel as any).hlizi1.visible = false;
      (this.viewModel as any).hlizi2.visible = false;
      (this.viewModel as any).hlizi3.visible = false;
      (this.viewModel as any).hlizi4.visible = false;
      (this.viewModel as any).hlizi5.visible = false;
      (this.viewModel as any).hlizi6.visible = false;
      (this.viewModel as any).hlizi7.visible = false;
      (this.viewModel as any).hlizi8.visible = false;
      (this.viewModel as any).hlizi1.alpha = 1;
      (this.viewModel as any).hlizi2.alpha = 1;
      (this.viewModel as any).hlizi7.alpha = 0;
      (this.viewModel as any).hlizi8.alpha = 0;

      (this.viewModel as any).znlizi4.visible = false;
      (this.viewModel as any).znlizi5.visible = false;
      (this.viewModel as any).znlizi6.visible = false;
      (this.viewModel as any).znlizi7.visible = false;
      (this.viewModel as any).znlizi4.alpha = 0;
      (this.viewModel as any).znlizi7.alpha = 1;


      (this.viewModel as any).hlizi9.visible = false;
      (this.viewModel as any).hlizi10.visible = false;
      (this.viewModel as any).hlizi11.visible = false;
      (this.viewModel as any).hlizi12.visible = false;
      (this.viewModel as any).hlizi13.visible = false;
      (this.viewModel as any).hlizi14.visible = false;
      (this.viewModel as any).hlizi15.visible = false;
      (this.viewModel as any).hlizi16.visible = false;
      (this.viewModel as any).hlizi9.alpha  = 0;
      (this.viewModel as any).hlizi10.alpha = 0;
      (this.viewModel as any).hlizi15.alpha = 1;
      (this.viewModel as any).hlizi16.alpha = 1;


      (this.viewModel as any).solizi1.visible = false;
      (this.viewModel as any).solizi2.visible = false;
      (this.viewModel as any).solizi3.visible = false;
      (this.viewModel as any).solizi4.visible = false;
      (this.viewModel as any).solizi1.alpha = 0;
      (this.viewModel as any).solizi4.alpha = 1;

      createjs.Tween.removeAllTweens();

      // createjs.Tween.removeTweens((this.viewModel as any).dianzi);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi1);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi2);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi3);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi4);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi5);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi6);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi7);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi8);
      // createjs.Tween.removeTweens((this.viewModel as any).dianzi9);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi1);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi2);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi3);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi4);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi5);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi6);
      // createjs.Tween.removeTweens((this.viewModel as any).znlizi7);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi1);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi2);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi3);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi4);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi5);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi6);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi7);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi8);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi9);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi10);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi11);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi12);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi13);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi14);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi15);
      // createjs.Tween.removeTweens((this.viewModel as any).hlizi16);
      // createjs.Tween.removeTweens((this.viewModel as any).solizi1);
      // createjs.Tween.removeTweens((this.viewModel as any).solizi2);
      // createjs.Tween.removeTweens((this.viewModel as any).solizi3);
      // createjs.Tween.removeTweens((this.viewModel as any).solizi4);

      this.stopAllTimeouts();
      (this.viewModel as any).Initialization();


    }
}
