import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    assemble: any;
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle = this.lang.btntext1;
    buttonActived = 0;
    buttonTitle2 = this.lang.btntext2;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }
    
    ButtonEvent(index: number) {
        if (this.buttonActived !== index) {
            this.buttonActived = index;
            this.assemble.ButtonEvent(index);
        }
    }

    resetEvent() {
        this.buttonActived = 0;
    }
}

