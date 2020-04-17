import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {WcViewHandler} from './services/WcViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {

  isActive = false;
  clickNumber = true;

  showCloudTopAnimation = true;
  showMappingAnimation = false;

  sliderNumBottom = 0;
  showSlider = true;

  isPhone = false;

  sliderOption = {
    lazy: false,
    width: 140,
    height: 5,
    min: 0,
    max: 100,
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: [20, 20],
  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new WcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption.width = 110;
    }
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.showCloudTopAnimation = true;
    this.showMappingAnimation = false;
    this.showSlider = true;
    this.sliderNumBottom = 0;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  cloudTopAnimation() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.cloudTopAnimation.play();
    this.showCloudTopAnimation = false;
    this.showSlider = false;
  }

  mappingAnimation() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.mappingAnimation.play();
    this.showMappingAnimation = false;
  }

  @Watch('sliderNumBottom')
  getSliderNumBottom() {

    if (!this.showCloudTopAnimation) {
      return;
    }

    (ViewController.getInstance().viewHandler as any).dmCanvas.cloudTopAnimation.progress(this.sliderNumBottom / 100);
    (ViewController.getInstance().viewHandler as any).dmCanvas.cloudTopAnimation.paused(true);

    if (this.sliderNumBottom > 99) {
      this.showSlider = false;
      this.showCloudTopAnimation = false;
    }
  }

}
