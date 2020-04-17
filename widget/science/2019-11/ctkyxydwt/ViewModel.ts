import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
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
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }
}
