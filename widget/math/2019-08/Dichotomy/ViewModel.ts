import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {AssembleViewHandler} from './services/AssembleViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

import title from './sub_static/image/title.png';
import error from './sub_static/image/error.png';
import li1 from './sub_static/image/li1.png';
import li2 from './sub_static/image/li2.png';
import li3 from './sub_static/image/li3.png';
import li4 from './sub_static/image/li4.png';
import li5 from './sub_static/image/li5.png';

@Component
export class ViewModel extends Vue {
    assemble: any;
    pictitle = title;
    pictip = error;
    piclis = {ab: li1, halfab: li2, fafb: li3, fhalfab: li4, length: li5};
    msglis = [];
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle = this.lang.btntext;
    tipmsg = '';
    buttonActived = 0;
    leftshow = false;
    rightshow = false;
    isShow = false;

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
        this.assemble.ButtonEvent(index);
    }

    msgPush(msgitem: { ab: string, halfab: string, fafb: string, fhalfab: string, length: string }) {
        this.msglis.push(msgitem);
        setTimeout(() => {
            this.buttonActived = 0;
        }, 500);

    }

    showTip(a: string, b: string) {
        this.isShow = true;
        this.tipmsg = this.lang.text[0] + a + '<0.1' + this.lang.text[1] + b + this.lang.text[2];
    }

    resetEvent() {
        this.isShow = false;
        this.buttonActived = 0;
        this.msglis = [];
    }
}

