import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { Rtdxc3dModel } from './Rtdxc3dModel';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class RtdxcViewHandler extends CommonViewHandler implements ViewHandler {

    rtdxc: Rtdxc3dModel;
    private play = false;
    private timerId: any;

    constructor(vm: Vue) {
          super(vm);
    }

    domReady(): void {
      super.domReady();
      const isBrowseUtil = BrowserUtil.getBrowserInfo();

      if (isBrowseUtil.isSmallDevice) {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth ;
        const height = dom.clientHeight * 1.5;
        this.rtdxc = new Rtdxc3dModel(dom, fov, width, height, near, far);
      } else if (isBrowseUtil.isIpad) {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth;
        const height = dom.clientHeight * 0.79;
        this.rtdxc = new Rtdxc3dModel(dom, fov, width, height, near, far);
      } else {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width =  dom.clientWidth * 1;
        const height = dom.clientHeight * 0.9;
        this.rtdxc = new Rtdxc3dModel(dom, fov, width, height, near, far);
      }
    }

    //播放动画判断
    playAnimation(play: boolean) {
      this.rtdxc.playAnimate();
      this.play = play;

      if ( this.timerId ) {
        return;
      }
      this.animationRender();
    }

    //滑条控制动画
    animationRender() {
      this.timerId = setTimeout(() => {
        if (this.viewModel.$data.sliderNum < 100 && this.play) {
          this.viewModel.$data.sliderNum += 1;
          this.animationRender();

        } else if (this.viewModel.$data.sliderNum >= 100 && this.play) {
          this.viewModel.$data.sliderNum = 100;
          this.viewModel.$data.isPlay = false;
          this.rtdxc.group4.visible = true;
          this.rtdxc.group5.visible = true;
          this.rtdxc.ballThree.visible = false;
          clearTimeout(this.timerId);
          this.timerId = null;

        } else {
          clearTimeout(this.timerId);
          this.timerId = null;
          this.rtdxc.pausedAnimate();
          this.rtdxc.group4.rotation.set(0, 0, 0);
          this.rtdxc.group5.rotation.set(0, 0, 0);

          if (this.viewModel.$data.sliderNum <= 0) {
            this.rtdxc.group1.visible = true;
            this.rtdxc.group2.visible = true;
            this.rtdxc.ballThree.visible = false;
            this.rtdxc.group4.visible = false;
            this.rtdxc.group5.visible = false;
            this.rtdxc.group1.rotation.set(0, 0, 0);
            this.rtdxc.group2.rotation.set(0, 0, 0);
          } else if (this.viewModel.$data.sliderNum >= 100) {
            this.rtdxc.group1.visible = false;
            this.rtdxc.group2.visible = false;
            this.rtdxc.ballThree.visible = false;
            this.rtdxc.group4.visible = true;
            this.rtdxc.group5.visible = true;

          }
        }
      }, 45);
    }

    reset(): void {
      this.rtdxc.reset();
      this.viewModel.$data.sliderNum = 0;
      this.viewModel.$data.isPlay = false;
      if ( this.timerId ) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
}
