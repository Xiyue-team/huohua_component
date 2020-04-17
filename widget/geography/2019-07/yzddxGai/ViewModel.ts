import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  isPhone = false;

  title = window.env.browserInfo.lang.title;

  isActive1 = false;
  clickNumber1 = true;

  isActive2 = false;
  clickNumber2 = true;

  isActive3 = false;
  clickNumber3 = true;

  showTipImage = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
    }
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  getIsActive1() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.showPlateauText(this.isActive1);
  }

  getIsActive2() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.showHillyAreaText(this.isActive2);
  }

  getIsActive3() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.showPlainText(this.isActive3);
  }

  resetEvent() {
    this.isActive1 = false;
    this.clickNumber1 = true;

    this.isActive2 = false;
    this.clickNumber2 = true;

    this.isActive3 = false;
    this.clickNumber3 = true;

    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }
}
