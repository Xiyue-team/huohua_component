
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { Ztdxc3dModel } from './Ztdxc3dModel';
import {Detector} from '../../../../../src/util/Detector';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class ZtdxcViewHandler extends CommonViewHandler implements ViewHandler {


    ztdxc: Ztdxc3dModel;

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
          const width = dom.clientWidth ;
          const height = dom.clientHeight * 1.3;
          this.ztdxc = new Ztdxc3dModel(dom, fov, width, height, near, far);
    } else if (BrowserUtil.getBrowserInfo().isIpad) {
          const width = dom.clientWidth;
          const height = dom.clientHeight * 0.79;
          this.ztdxc = new Ztdxc3dModel(dom, fov, width, height, near, far);
    } else {
          const width =  dom.clientWidth * 1;
          const height = dom.clientHeight * 1.2;
          this.ztdxc = new Ztdxc3dModel(dom, fov, width, height, near, far);
        }
    }

    resize(): void {
        Detector.forceMobildLandscape();
        const scale = (window as any)['env'].browserInfo.isSmallDevice ? 0.5 : 1;
        const width = 505 * scale;
        const height = 270 * scale;
        this.ztdxc.resize(width, height);
    }

    //动画播放
    PlayAnimation(play: boolean) {
      this.ztdxc.playAnimate();
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
      } else if ((window as any).viewHandler.viewModel.$data.sliderNum >= 100 && this.play) {
        (window as any).viewHandler.viewModel.$data.sliderNum = 100;
        this.viewModel.$data.isPlay = false;
        setTimeout(() => {
          this.ztdxc.group3.visible = true;
          this.ztdxc.group4.visible = true;
          this.ztdxc.model3.visible = false;
        }, 10);
        clearTimeout(this.timerId);
        this.timerId = null;
      } else {
        clearTimeout(this.timerId);
        this.timerId = null;
        this.ztdxc.pausedAnimate();

        this.ztdxc.group3.rotation.set(0, 0, 0);
        this.ztdxc.group4.rotation.set(0, 0, 0);

        if ((window as any).viewHandler.viewModel.$data.sliderNum <= 0) {
          this.ztdxc.group.visible = true;
          this.ztdxc.group2.visible = true;
          this.ztdxc.model3.visible = false;
          this.ztdxc.group3.visible = false;
          this.ztdxc.group4.visible = false;
          this.ztdxc.group.rotation.set(0, 0, 0);
          this.ztdxc.group2.rotation.set(0, 0, 0);
        }
      }

    }, 50);

  }

  //重置按钮
    reset(): void {
      this.ztdxc.reset();
      this.viewModel.$data.sliderNum = 0;
      this.viewModel.$data.isPlay = false;
      if ( this.timerId ) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

    }
}
