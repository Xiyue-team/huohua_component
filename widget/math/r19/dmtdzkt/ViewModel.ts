import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FourPrismViewHandler} from './services/FourPrismViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class ViewModel extends Vue {
  showButton = 1;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new FourPrismViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.showButton = 1;
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.reset();
  }

  lengZhuImageEvent() {
    this.showButton = 1;
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.hideGroup();
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.lengZhuStage.visible = true;
  }

  lengZhuiImageEvent() {
    this.showButton = 2;
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.hideGroup();
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.lengZhuiStage.visible = true;
  }

  lengTaiImageEvent() {
    this.showButton = 3;
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.hideGroup();
    (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.lengTaiStage.visible = true;
  }

}

