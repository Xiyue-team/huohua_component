import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import tip from './sub_static/prove2.png';
import tipbg from './sub_static/prove.png';
import msg from './sub_static/content.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    picbg = tipbg;
    pictip = tip;
    picmsg = msg;
    numtext = '';
    title_text = this.lang.title;
    buttonTitle1 = this.lang.btntext1;
    buttonActived1 = false;
    buttonTitle2 = this.lang.btntext2;
    buttonTitle4 = this.lang.btntext3;
    buttonActived2 = false;
    lock = false;
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

    ButtonEvent1() {
        this.buttonActived1 = !this.buttonActived1;
    }

    ButtonEvent2() {
        this.buttonActived2 = !this.buttonActived2;
        this.assemble.ButtonEvent2();
    }
    ButtonLock() {
        this.lock = !this.lock;
    }
    resetEvent() {
        this.lock = false;
    }
}

