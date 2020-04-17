/**
 *
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {Atom3DScene} from './Atom3DScene';
export class AtomViewHandler extends CommonViewHandler implements ViewHandler {

    atom: Atom3DScene;

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
        const container = document.getElementById('3dContainer');
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.atom = new Atom3DScene(container, fov, width, height, near, far);

        ViewController.getInstance().hideLoading();
    }

    /**
     * 重置窗口大小
     */
    resize():  void {
        Detector.forceMobildLandscape();
    }

    /**
     * 重置
     */
    reset():  void {
      (window as any).viewHandler.viewModel.$data.isPlay = false;
      (window as any).viewHandler.viewModel.$data.switchModel = 'α衰变';
      this.atom.reset();
    }

    playEvent(value: boolean) {

        if (value) {

            if (this.atom.shakeAnimation) {
                console.log(this.atom.shakeAnimation.progress());
                if (this.atom.alphaRedAnimation || this.atom.betaGreenAnimation) {
                    this.atom.animationResume();

                } else {
                    this.atom.shakeAnimation.resume();
                }

            } else {
                this.atom.resetElement();
                this.atom.ballAnimation();
            }

        } else {
            //暂停状态或者初始状态
            if (this.atom.shakeAnimation) {
              this.atom.animationPause();
            } else if (this.atom.atom_red.visible || this.atom.atom_blue.visible) {
              this.atom.resetElement();
              this.atom.ballAnimation();
            }
        }
    }

  resetScence(value: boolean) {
    this.atom.isAlpha = value;
    if (value) {
        this.atom.resetAlphaMagnetic();
    } else {
        this.atom.resetBetaMagnetic();
    }
  }

}
