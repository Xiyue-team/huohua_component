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
    showList = [{
        left: 20,
        top: 40,
        text: this.lang.text[0]
    }, {
        left: 20,
        top: 40,
        text: this.lang.text[1]
    }, {
        left: 20,
        top: 30,
        text: this.lang.text[2]
    }];

    selectMode = -1;
    assemble: any;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        if (window.screen.height > 499 && window.screen.height < 800) {
            this.showList = [{
                left: 16,
                top: 40,
                text: this.lang.text[0]
            }, {
                left: 18,
                top: 40,
                text: this.lang.text[1]
            }, {
                left: 17,
                top: 30,
                text: this.lang.text[2]
            }];
        } else if (window.screen.height < 499) {
            this.showList = [{
                left: 15,
                top: 30,
                text: this.lang.text[0]
            }, {
                left: 15,
                top: 40,
                text: this.lang.text[1]
            }, {
                left: 15,
                top: 30,
                text: this.lang.text[2]
            }];
        }
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    selectModeEvent(i: number) {
        this.selectMode = i;
        if (this.assemble) {
            this.assemble.selectModeEvent(this.selectMode);
        }
    }

    resetEvent() {
        this.selectMode = -1;
    }
}

