import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  title: string;

  numberPicker = {
    initialSlide: 2,
    swiperSlides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new ViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resize() {
    if (window.innerWidth <= 1100 && window.innerWidth > 900) {

    } else if (window.innerWidth <= 900) {

    } else {
    }
  }

  resetEvent() {
    this.resetButton(0);
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  resetButton(value: number) {

  }

  @Watch('numberPicker.initialSlide')
  getInitialSlide() {
    console.log('打印数字', this.numberPicker.initialSlide);
  }
}
