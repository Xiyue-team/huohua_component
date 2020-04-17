import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  clickNumber = true;

  isActive = false;

  isShowFormulaText = false;

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
    this.clickNumber = true;

    this.isActive = false;

    this.isShowFormulaText = false;

    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  buttonClickEvent() {
    this.isShowFormulaText = !this.isShowFormulaText;
  }
}
