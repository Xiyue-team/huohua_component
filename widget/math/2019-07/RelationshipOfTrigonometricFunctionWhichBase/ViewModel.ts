import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import tip1 from './sub_static/image/tip1.png';
import tip2 from './sub_static/image/tip2.png';
import tip3 from './sub_static/image/tip3.png';
import tip4 from './sub_static/image/tip4.png';
import tip5 from './sub_static/image/tip5.png';
import tip6 from './sub_static/image/tip6.png';
@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    buttonActived1 = false;
    buttonActived2 = false;
    buttonActived3 = false;
    buttonActived4 = false;
    buttonActived5 = false;
    buttonActived6 = false;
    pics = [tip1, tip2, tip3, tip4, tip5, tip6];
    btnTitle = window.env.browserInfo.lang.text;
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
        if (index === 1) {
            this.buttonActived1 = !this.buttonActived1;
        } else if (index === 2) {
            this.buttonActived2 = !this.buttonActived2;
        } else if (index === 3) {
            this.buttonActived3 = !this.buttonActived3;
        } else if (index === 4) {
            this.buttonActived4 = !this.buttonActived4;
        } else if (index === 5) {
            this.buttonActived5 = !this.buttonActived5;
        } else if (index === 6) {
            this.buttonActived6 = !this.buttonActived6;
        }
        this.assemble.ButtonEvent();
    }

    resetEvent() {
        this.buttonActived1 = false;
        this.buttonActived2 = false;
        this.buttonActived3 = false;
        this.buttonActived4 = false;
        this.buttonActived5 = false;
        this.buttonActived6 = false;
    }
}
