import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonText = window.env.browserInfo.lang.buttonText;
    isShow = false;
    isOn = false;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    buttonEvent() {
      this.isOn = !this.isOn;
      (ViewController.getInstance().viewHandler as ModelViewHandler).Model.emphasizeAtom(this.isOn);
    }

    // 重置
    reset() {
      this.isOn = false;
      (document.getElementById('reaction_button') as any).checked = false;
      (ViewController.getInstance().viewHandler as ModelViewHandler).Model.reset();
    }
}

