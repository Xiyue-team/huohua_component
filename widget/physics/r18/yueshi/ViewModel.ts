import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import { YueShiViewHandler } from './services/YueShiViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
@Component
export class ViewModel extends Vue {
  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new YueShiViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    (ViewController.getInstance().viewHandler as YueShiViewHandler).yueShi3DModel.reset();
  }
}

