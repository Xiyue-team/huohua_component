import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TylxlViewHandler} from './services/TylxlViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

    newTitle = '表达式';
    color = false;
    showFormula = false;
    displayE = 0.6;
    displayK = 0.8;

    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new TylxlViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    formula() {
      if (!this.color) {
        this.color = true;
        this.showFormula = true;
      } else {
        this.color = false;
        this.showFormula = false;
      }
    }

}

