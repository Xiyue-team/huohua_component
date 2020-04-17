import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import pic1xblack from './sub_static/image/1xblack.png';
import pic1xwhite from './sub_static/image/1xwhite.png';

import piclnxblack from './sub_static/image/lnxblack.png';
import piclnxwhite from './sub_static/image/lnxwhite.png';

import picx2black from './sub_static/image/x2black.png';
import picx2white from './sub_static/image/x2white.png';

import picxblack from './sub_static/image/xblack.png';
import picxwhite from './sub_static/image/xwhite.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    picList = [
        { type: 0, text: window.env.browserInfo.lang.text[0] },
        { type: 1, text: window.env.browserInfo.lang.text[1] },
        { type: 2, text: window.env.browserInfo.lang.text[2] },
        { type: 3, text: window.env.browserInfo.lang.text[3] },
        { type: 4, text: window.env.browserInfo.lang.text[4] },
        { type: 5, text: window.env.browserInfo.lang.text[5] }
    ];
    msg = window.env.browserInfo.lang.btntext1;
    msg2 = window.env.browserInfo.lang.btntext2;
    msg3 = window.env.browserInfo.lang.btntext3;
    message = window.env.browserInfo.lang.message;
    current = { type: 0, text: window.env.browserInfo.lang.text[0] };
    boolOpen = false;
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
    dropDown() {
        this.boolOpen = !this.boolOpen;
    }

    selectChange(type: number) {
        this.current = this.picList[type];
        if (this.assemble) {
            this.assemble.selectChange(type);
        }
    }

    resetEvent() {
        this.boolOpen = false;
        this.current = this.picList[0];
    }
}

