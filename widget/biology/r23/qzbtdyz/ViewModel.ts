import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YeZiViewHandler} from './services/YeZiViewHandler';

@Component
export class ViewModel extends Vue {

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new YeZiViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {

    }
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }
}
