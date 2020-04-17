import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    assemble: any;
    buttonTitle = this.lang.btntext;
    verificationActived = false;
    text = this.lang.msg;
    msgShow = true;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }
    verificationEvent() {
        this.verificationActived = !this.verificationActived;
        if (this.assemble) {
            this.assemble.verificationEvent(this.verificationActived);
        }
    }

    resetEvent() {
        this.verificationActived = false;
        this.msgShow = true;
    }
}

