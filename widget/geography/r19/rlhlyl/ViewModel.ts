import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {DmViewHandler} from './services/DmViewHandler';

@Component
export class ViewModel extends Vue {

  isActive = false;
  clickNumber = true;

  showCloudTopAnimation = true;
  showMappingAnimation = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new DmViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.showCloudTopAnimation = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  cloudTopAnimation() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.cloudTopAnimation.play();
    this.showCloudTopAnimation = false;
  }

  mappingAnimation() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.mappingAnimation.play();
    this.showMappingAnimation = false;
  }
}
