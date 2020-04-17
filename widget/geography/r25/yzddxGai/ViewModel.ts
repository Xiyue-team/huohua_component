import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const language = require('./language.json');

@Component
export class ViewModel extends Vue {
  isPhone = false;

  title: string;


  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    this.title = language[(window as any)['env'].browserInfo.language].title;

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
    }
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }
}
