import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {LsViewHandler} from './services/LsViewHandler';
import { Watch } from 'vue-property-decorator';
const language = require('./language.json');

@Component
export class ViewModel extends Vue {
  isActive = false;
  clickNumber = true;

  // 判断是否是手机
  isPhone = false;

  // 定义滑条的样式
  sliderNumTop = 100;

  sliderOption = {
    lazy: false,
    width: 180,
    height: 2,
    min: 0,
    max: Math.floor(100 * (0.667 / 0.296) * 0.9),
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
  };

  title: string;
  buttonTitle: string;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new LsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption.width = 100;
    }

    this.title = language[(window as any)['env'].browserInfo.language].title;
    this.buttonTitle = language[(window as any)['env'].browserInfo.language].buttonTitle;
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.isActive = false;
    this.clickNumber = true;
    this.sliderNumTop = 100;
    (ViewController.getInstance().viewHandler as any).dmCanvas.showOverlappingColors(this.isActive);
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  @Watch('sliderNumTop')
  getSliderNumTop() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.scaleEllipse1(this.sliderNumTop / 100);

  }

  buttonClickEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.showOverlappingColors(this.isActive);
  }

}
