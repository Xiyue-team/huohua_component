import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import tip from './sub_static/tip.png';
@Component
export class ViewModel extends Vue {
    assemble: any;
    pictip = tip;
    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.btntext;
    buttonActived = 0;

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
    ButtonEvent(i: number) {
        this.buttonActived = i;
        this.assemble.ButtonEvent(i);
    }

    resetEvent() {
        this.buttonActived = 0;
    }
}

