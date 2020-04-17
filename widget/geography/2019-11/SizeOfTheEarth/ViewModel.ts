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
    color = '#ffffff';
    assemble: any;
    btntext = this.lang.btntext;
    surfaceActived = false;
    perimeterActived = false;
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

    surfaceEvent() {
        this.surfaceActived = !this.surfaceActived;
        if (this.assemble) {
            this.assemble.surfaceEvent(this.surfaceActived);
        }
    }

    perimeterEvent() {
        this.perimeterActived = !this.perimeterActived;
        if (this.assemble) {
            this.assemble.perimeterEvent(this.perimeterActived);
        }
    }
    resetEvent() {
        this.surfaceActived = false;
        this.perimeterActived = false;
    }
}
