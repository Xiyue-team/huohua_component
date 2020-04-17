import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxdlxlViewHandler} from './services/SqxdlxlViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {

    a = 3.00;
    b = 4.00;
    c = 5.00;

    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      viewOption.controlPanelAnimationDelay = 1000;

      ViewController.getInstance(new SqxdlxlViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();

    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }
}

