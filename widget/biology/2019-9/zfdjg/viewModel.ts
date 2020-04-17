import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonText = window.env.browserInfo.lang.button_Text;

  activeIndex = -1;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  buttonEvent(index: number) {
    //动画未执行完成不执行
    if ((ViewController.getInstance().viewHandler as any).ovaryCanvas.isAniamtion) {
      return;
    }
    this.activeIndex = index;
    (ViewController.getInstance().viewHandler as any).ovaryCanvas.setImageAnimation(index);
  }

  resetEvent() {
    this.activeIndex = -1;
  }

}
