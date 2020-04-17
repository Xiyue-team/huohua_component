import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    text = ['>', '<'];
    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.btntext;
    buttonActived = false;
    assemble: any;
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

    buttonEvent() {
        this.buttonActived = !this.buttonActived;
        if (this.assemble) {
            this.assemble.buttonEvent(this.buttonActived);
        }
    }

    setText(v1: string, v2: string) {
        this.text = [v1, v2];
    }

    resetEvent() {
        this.buttonActived = false;
        this.setText('>', '<');
    }
}

