import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const viewOptionConfig = require('./meta.json');

import bg from './sub_static/image/bg.png';
import front1 from './sub_static/image/front1.png';
import front2 from './sub_static/image/front2.png';
import front3 from './sub_static/image/front3.png';
import front4 from './sub_static/image/front4.png';


@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle = this.lang.text;
    picbg = bg;
    pic = [front1, front2, front3, front4];
    buttonActived = -1;
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
    }

    buttonEvent(i: number) {
        this.buttonActived = i;
    }

    resetEvent() {
        this.buttonActived = -1;
    }
}

