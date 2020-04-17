import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {LsViewHandler} from './services/LsViewHandler';

@Component
export class ViewModel extends Vue {

  clickNumber1 = true;
  clickNumber2 = true;

  showButtonLeft = false;
  showButtonRight = false;

  showCloudTopAnimation = true;
  showMappingAnimation = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new LsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.showCloudTopAnimation = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  buttonLeftEvent () {
    (ViewController.getInstance().viewHandler as any).dmCanvas.startLeftAnimation();
  }

  buttonRightEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.startRightAnimation();
  }
}
