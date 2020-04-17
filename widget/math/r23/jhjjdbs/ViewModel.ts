import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {IntersectionViewHandler} from './services/IntersectionViewHandler';
import { Watch } from 'vue-property-decorator';
const language = require('./language.json');

@Component
export class ViewModel extends Vue {
  isActive = false;
  clickNumber = true;

  isActive2 = false;
  clickNumber2 = true;

  // 判断是否是手机
  isPhone = false;

  title: string;
  buttonTitle: string;
  buttonTitle2: string;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new IntersectionViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
    }

    this.title = language[(window as any)['env'].browserInfo.language].title;
    this.buttonTitle = language[(window as any)['env'].browserInfo.language].buttonTitle;
    this.buttonTitle2 = language[(window as any)['env'].browserInfo.language].buttonTitle2;
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    this.isActive = false;
    this.clickNumber = true;
    this.isActive2 = false;
    this.clickNumber2 = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
    (ViewController.getInstance().viewHandler as any).dmCanvas.showWayneChart(true);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showNumberAxis(false);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showOverlappingColors(this.isActive);
  }

  buttonClickEvent1() {
    this.isActive2 = false;
    this.clickNumber2 = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.showWayneChart(true);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showNumberAxis(false);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showOverlappingColors(this.isActive);
  }

  buttonClickEvent2() {
    this.isActive = false;
    this.clickNumber = true;
    (ViewController.getInstance().viewHandler as any).dmCanvas.showNumberAxis(this.isActive2);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showWayneChart(!this.isActive2);
    (ViewController.getInstance().viewHandler as any).dmCanvas.showOverlappingColors(false);
    console.log('aaaaaaaaa');
  }

}
