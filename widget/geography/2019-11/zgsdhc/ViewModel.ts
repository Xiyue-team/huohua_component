import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  isShowBox2 = false;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    viewOption.showReset = false;
    ViewController.getInstance(new FabricViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resize() {

  }

  resetEvent() {
    this.isShowBox2 = false;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }
}
