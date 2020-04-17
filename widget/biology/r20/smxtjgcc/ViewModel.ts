import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SmxtjgccViewHandler} from './services/SmxtjgccViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class ViewModel extends Vue {
  showNameText = 0;
  showTitleText2 = true;

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new SmxtjgccViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  // 重置按钮点击事件
  resetEvent() {
    this.showNameText = 0;
    this.showTitleText2 = true;

    // 重置场景
    (ViewController.getInstance().viewHandler as SmxtjgccViewHandler).pwxddy3DScene.reset();
  }

}

