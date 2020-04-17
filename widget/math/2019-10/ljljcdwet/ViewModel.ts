import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  // 定义滑条的样式
  sliderNumTop = 60;
  sliderNumBottom = 100;
  sliderOption = {
    lazy: false,
    width: 211,
    height: 2,
    min: 0,
    max: Math.floor(100 * (450 / 168) * 0.9),
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
  };

  clickNumber1 = true;
  clickNumber2 = true;
  clickNumber3 = true;

  isActive1 = false;
  isActive2 = false;
  isActive3 = false;

  title: string;

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
    if (window.innerWidth <= 1100 && window.innerWidth > 900) {
      this.sliderOption.width = 211 * 0.8;
      this.sliderOption.dotSize = [24 * 0.8, 24 * 0.8];
    } else if (window.innerWidth <= 900) {
      this.sliderOption.width = 211 * 0.6;
      this.sliderOption.dotSize = [24 * 0.6, 24 * 0.6];
    } else {
      this.sliderOption.width = 211;
      this.sliderOption.dotSize = [24, 24];
    }
  }

  resetEvent() {
    this.resetButton(0);
    this.sliderNumTop = 60;
    this.sliderNumBottom = 100;
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent1(!this.clickNumber1);
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  @Watch('sliderNumTop')
  getSliderNumTop() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.scalecircle1(this.sliderNumTop / 100);
  }

  @Watch('sliderNumBottom')
  getSliderNumBottom() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.scalecircle2(this.sliderNumBottom / 100);
  }

  // 左1按钮点击
  buttonClickEvent1() {
    this.resetButton(1);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent2(!this.clickNumber1);
  }

  // 左2按钮点击
  buttonClickEvent2() {
    this.resetButton(2);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent1(!this.clickNumber2);
  }

  // 左3按钮点击
  buttonClickEvent3() {
    this.resetButton(3);
    (ViewController.getInstance().viewHandler as any).dmCanvas.buttonClickEvent3(!this.clickNumber3);
  }

  resetButton(value: number) {
    if (value !== 1) {
      this.clickNumber1 = true;
      this.isActive1 = false;
    }

    if (value !== 2) {
      this.clickNumber2 = true;
      this.isActive2 = false;
    }

    if (value !== 3) {
      this.clickNumber3 = true;
      this.isActive3 = false;
    }

  }
}
