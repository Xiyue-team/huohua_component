
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { Mytdxc3dModel } from './Mytdxc3dModel';
import {Detector} from '../../../../../src/util/Detector';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class MytdxcViewHandler extends CommonViewHandler implements ViewHandler {


    mytdxc: Mytdxc3dModel;

    private play = false;

    private timerId: any;


  constructor(vm: Vue) {
        super(vm);
    }

    domReady(): void {
      super.domReady();
      const dom = document.getElementById('3dModel');
      const fov = 30;
      const near = 1;
      const far = 3000;
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
          const width =  dom.clientWidth;
          const height = dom.clientHeight * 1.9;
          this.mytdxc = new Mytdxc3dModel(dom, fov, width, height, near, far);
    } else if (BrowserUtil.getBrowserInfo().isIpad) {
          const width = dom.clientWidth;
          const height = dom.clientHeight * 1.2;
          this.mytdxc = new Mytdxc3dModel(dom, fov, width, height, near, far);
    } else {
          const width =  dom.clientWidth;
          const height = dom.clientHeight * 1.5;
          this.mytdxc = new Mytdxc3dModel(dom, fov, width, height, near, far);
        }

  }

    resize(): void {
        Detector.forceMobildLandscape();
        const scale = (window as any)['env'].browserInfo.isSmallDevice ? 0.5 : 1;
        const width = 505 * scale;
        const height = 270 * scale;
        this.mytdxc.resize(width, height);
    }

    //动画播放
    PlayAnimation(play: boolean) {
      this.mytdxc.playAnimate();
      this.play = play;

      if ( this.timerId ) {
        return;
      }
      this.animationRender();
    }

    //动画播放事件
    animationRender() {
    this.timerId = setTimeout(() => {
      if ((window as any).viewHandler.viewModel.$data.sliderNum < 100 && this.play) {
        (window as any).viewHandler.viewModel.$data.sliderNum += 1;
        this.animationRender();
      } else if ((window as any).viewHandler.viewModel.$data.sliderNum >= 90 && this.play) {
        (window as any).viewHandler.viewModel.$data.sliderNum = 100;
        this.viewModel.$data.isPlay = false;
        setTimeout(() => {
          this.mytdxc.group3.visible = true;
          this.mytdxc.group4.visible = true;
          this.mytdxc.model3.visible = false;
        }, 10);
        clearTimeout(this.timerId);
        this.timerId = null;
      } else {
        clearTimeout(this.timerId);
        this.timerId = null;
        this.mytdxc.pausedAnimate();

        this.mytdxc.group3.rotation.set(0, 0, 0);
        this.mytdxc.group4.rotation.set(0, 0, 0);
        if ((window as any).viewHandler.viewModel.$data.sliderNum <= 0) {
          this.mytdxc.group.visible = true;
          this.mytdxc.group2.visible = true;
          this.mytdxc.model3.visible = false;
          this.mytdxc.group3.visible = false;
          this.mytdxc.group4.visible = false;
          this.mytdxc.group.rotation.set(0, 0, 0);
          this.mytdxc.group2.rotation.set(0, 0, 0);
        }
      }

    }, 50);

  }

  //重置按钮
    reset(): void {
      this.mytdxc.reset();
      this.viewModel.$data.show1 = false;
      this.viewModel.$data.sliderNum = 0;
      this.viewModel.$data.isPlay = false;
      if ( this.timerId ) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

    }
}
