
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

const createjs = require('createjs-npm');
export class SytxydcViewHandler extends CommonViewHandler implements ViewHandler {

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }

    resize():  void {
        Detector.forceMobildLandscape();
    }

  stopAllTimeouts() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  //重置
  reset():  void {
      (this.viewModel as any).xinqueshi.bitmap.visible = false;
      (this.viewModel as any).beakerBmp.bitmap.visible = true;
      (this.viewModel as any).tjyq.bitmap.visible = true;
      (this.viewModel as any).kb.bitmap.visible = true;
      (this.viewModel as any).yanqiao.bitmap.visible = false;
      (this.viewModel as any).dengpao.bitmap.visible = true;
      (this.viewModel as any).dengpl.bitmap.visible = false;
      (this.viewModel as any).fcsan.bitmap.visible = true;
      (this.viewModel as any).zhankai.bitmap.visible = false;
      (this.viewModel as any).fuji.bitmap.visible = false;
      (this.viewModel as any).fcsan1.bitmap.visible = true;
      (this.viewModel as any).zhankai1.bitmap.visible = false;
      (this.viewModel as any).zfcs.bitmap.visible = false;
      (this.viewModel as any).fcsan2.bitmap.visible = true;
      (this.viewModel as any).zhankai2.bitmap.visible = true;
      (this.viewModel as any).zhengji.bitmap.visible = false;
      (this.viewModel as any).dianzi.visible = false;
      (this.viewModel as any).dianzi1.visible = false;
      (this.viewModel as any).dianzi2.visible = false;
      (this.viewModel as any).dianzi3.visible = false;
      (this.viewModel as any).dianzi4.visible = false;
      (this.viewModel as any).dianzi5.visible = false;
      (this.viewModel as any).dianzi6.visible = false;
      (this.viewModel as any).dianzi7.visible = false;
      (this.viewModel as any).dianzi8.visible = false;
      (this.viewModel as any).dianzi9.visible = false;
      (this.viewModel as any).cl.visible = false;
      (this.viewModel as any).cl1.visible = false;
      (this.viewModel as any).cl2.visible = false;
      (this.viewModel as any).cl3.visible = false;
      (this.viewModel as any).cl4.visible = false;
      (this.viewModel as any).k.visible = false;
      (this.viewModel as any).k1.visible = false;
      (this.viewModel as any).k2.visible = false;
      (this.viewModel as any).k3.visible = false;
      (this.viewModel as any).k4.visible = false;
      (this.viewModel as any).xlz1.alpha = 0;
      (this.viewModel as any).xlz2.alpha = 0;
      (this.viewModel as any).tlz1.alpha = 0;
      (this.viewModel as any).tlz2.alpha = 0;
      createjs.Tween.removeAllTweens();
      createjs.Tween.removeTweens((this.viewModel as any).dianzi);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi1);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi2);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi3);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi4);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi5);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi6);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi7);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi8);
      createjs.Tween.removeTweens((this.viewModel as any).dianzi9);
      createjs.Tween.removeTweens((this.viewModel as any).cl);
      createjs.Tween.removeTweens((this.viewModel as any).cl1);
      createjs.Tween.removeTweens((this.viewModel as any).cl2);
      createjs.Tween.removeTweens((this.viewModel as any).cl3);
      createjs.Tween.removeTweens((this.viewModel as any).cl4);
      createjs.Tween.removeTweens((this.viewModel as any).k);
      createjs.Tween.removeTweens((this.viewModel as any).k1);
      createjs.Tween.removeTweens((this.viewModel as any).k2);
      createjs.Tween.removeTweens((this.viewModel as any).k3);
      createjs.Tween.removeTweens((this.viewModel as any).k4);
      createjs.Tween.removeTweens((this.viewModel as any).xlz1);
      createjs.Tween.removeTweens((this.viewModel as any).xlz2);
      createjs.Tween.removeTweens((this.viewModel as any).tlz1);
      createjs.Tween.removeTweens((this.viewModel as any).tlz2);
      this.stopAllTimeouts();
      (this.viewModel as any).initchushi();
    }
}
