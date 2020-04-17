import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {JpfxdxzViewHandler} from './services/JpfxdxzViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class ViewModel extends Vue {
  isActive2 = false;
  clickNumber2 = true;

  isMobile = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    viewOption.adapterMobilePanel = false;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new JpfxdxzViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isMobile = true;
    }
  }


  // 重置按钮点击事件
  resetEvent() {
    this.isActive2 = false;
    this.clickNumber2 = true;
    (ViewController.getInstance().viewHandler as JpfxdxzViewHandler).pwxddy3DScene.reset();
  }
}

