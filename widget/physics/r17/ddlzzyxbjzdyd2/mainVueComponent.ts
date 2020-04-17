import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YxbjViewHandler} from './services/YxbjViewHandler';

@Component
export class MainVueComponent extends Vue {
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new YxbjViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    // 重置场景
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.reset();
  }

}

