import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';

import tip1 from './sub_static/image/fun1.png';
import tip2 from './sub_static/image/fun2.png';
import tip3 from './sub_static/image/fun3.png';

@Component
export class ViewModel extends Vue {
    tips = [tip1, tip2, tip3];
    pictip = this.tips[0];
    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.text;
    buttonActived = 0;
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

    ButtonEvent(index: number) {
        this.buttonActived = index;
        this.pictip = this.tips[index - 1];
        this.assemble.ButtonEvent(index);
    }

    resetEvent() {
        this.buttonActived = 0;
    }
}

