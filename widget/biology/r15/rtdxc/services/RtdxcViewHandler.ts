import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import { Rtdxc3dModel } from './Rtdxc3dModel';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class RtdxcViewHandler extends CommonViewHandler implements ViewHandler {

    mytdsj: Rtdxc3dModel;
    private play = false;
    private timerId: any;

  constructor(vm: Vue) {
        super(vm);
    }

    domReady(): void {
      super.domReady();
      //FIXME BrowserUtil.getBrowserInfo() 用变量保存
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth ;
        const height = dom.clientHeight * 3.5;
        this.mytdsj = new Rtdxc3dModel(dom, fov, width, height, near, far);
      } else if (BrowserUtil.getBrowserInfo().isIpad) {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = dom.clientWidth;
        const height = dom.clientHeight * 0.79;
        this.mytdsj = new Rtdxc3dModel(dom, fov, width, height, near, far);
      } else {
        const dom = document.getElementById('3dModel');
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width =  dom.clientWidth * 1;
        const height = dom.clientHeight * 0.9;
        this.mytdsj = new Rtdxc3dModel(dom, fov, width, height, near, far);
      }
    }

    //FIXME 方法名规范
    PlayAnimation(play: boolean) {
      this.mytdsj.playAnimate();
      this.play = play;

      if ( this.timerId ) {
        return;
      }
      this.animationRender();
    }
    //FIXME 段落对齐 ，加注释
  animationRender() {
    this.timerId = setTimeout(() => {
      if ((window as any).viewHandler.viewModel.$data.sliderNum < 100 && this.play) {

        (window as any).viewHandler.viewModel.$data.sliderNum += 1;
        this.animationRender();

      } else if ((window as any).viewHandler.viewModel.$data.sliderNum >= 100 && this.play) {

        (window as any).viewHandler.viewModel.$data.sliderNum = 100;
        this.viewModel.$data.isPlay = false;


          this.mytdsj.group4.visible = true;
          this.mytdsj.group5.visible = true;
          this.mytdsj.ball3.visible = false;
          clearTimeout(this.timerId);
          this.timerId = null;
      } else {
        clearTimeout(this.timerId);
        this.timerId = null;
        this.mytdsj.pausedAnimate();
        this.mytdsj.group4.rotation.set(0, 0, 0);
        this.mytdsj.group5.rotation.set(0, 0, 0);

        if ((window as any).viewHandler.viewModel.$data.sliderNum <= 0) {
          this.mytdsj.group1.visible = true;
          this.mytdsj.group2.visible = true;
          this.mytdsj.ball3.visible = false;
          this.mytdsj.group4.visible = false;
          this.mytdsj.group5.visible = false;
          this.mytdsj.group1.rotation.set(0, 0, 0);
          this.mytdsj.group2.rotation.set(0, 0, 0);
        } else if ((window as any).viewHandler.viewModel.$data.sliderNum >= 100) {
          this.mytdsj.group1.visible = false;
          this.mytdsj.group2.visible = false;
          this.mytdsj.ball3.visible = false;
          this.mytdsj.group4.visible = true;
          this.mytdsj.group5.visible = true;

        }

        }

    }, 45);

  }

    reset(): void {
      this.mytdsj.reset();
      this.viewModel.$data.sliderNum = 0;
      this.viewModel.$data.isPlay = false;
      if ( this.timerId ) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

    }

}
