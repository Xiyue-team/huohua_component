import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import pic from './sub_static/image/pic.json';
const viewOptionConfig = require('./meta.json');


@Component
export class ViewModel extends Vue {
    assemble: any;
    title_text = window.env.browserInfo.lang.title;
    right_title = '1:500';
    right_container = window.env.browserInfo.lang.text[3];
    bg = pic.bg4;
    pics = [pic.bg1, pic.bg2, pic.bg3, pic.bg4];
    textList = [
        window.env.browserInfo.lang.text[0],
        window.env.browserInfo.lang.text[1],
        window.env.browserInfo.lang.text[2],
        window.env.browserInfo.lang.text[3]
    ];

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
    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }
    resetEvent() {

    }
}

