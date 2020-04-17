import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as rule from './sub_static/rule.png';
import * as lessblue from './sub_static/lessblue.png';
import * as lessgray from './sub_static/lessgray.png';
import * as meta from './sub_static/meta.json';
@Component
export class ViewModel extends Vue {

    rulemsg = rule;
    title_text = window.env.browserInfo.lang.title;
    text = window.env.browserInfo.lang.text;
    msg = window.env.browserInfo.lang.msg;
    buttonActived = 0;
    assemble: any;
    picmsg1 = meta.moreleftw;
    picmsg2 = meta.leftw;
    picmsg3 = meta.rightw;
    picmsg4 = meta.morerightw;

    textmsg1 = '';
    textmsg2 = '';
    textmsg3 = '';
    textmsg4 = '';

    Option1 = {
        buttonUnclickedImage: lessblue,
        buttonclickedImage: lessgray,
    };
    Option2 = {
        buttonUnclickedImage: lessblue,
        buttonclickedImage: lessgray,
    };
    Option3 = {
        buttonUnclickedImage: lessblue,
        buttonclickedImage: lessgray,
    };

    showText = true;
    // Timer = null;
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
        // setTimeout(() => { this.showText = false; }, 2000);
    }

    ButtonEvent(index: number) {
        this.showText = false;
        this.buttonActived = index;
        if (index === 0) {
            this.picmsg1 = meta.moreleftw;
            this.picmsg2 = meta.leftw;
            this.picmsg3 = meta.rightw;
            this.picmsg4 = meta.morerightw;
            this.textmsg1 = '';
            this.textmsg2 = '';
            this.textmsg3 = '';
            this.textmsg4 = '';
        } else if (index === 1) {
            this.picmsg1 = meta.moreleftred;
            this.picmsg2 = meta.leftg;
            this.picmsg3 = meta.rightw;
            this.picmsg4 = meta.morerightw;
            this.textmsg1 = this.msg[0];
            this.textmsg2 = this.msg[1];
            this.textmsg3 = '';
            this.textmsg4 = '';
        } else if (index === 2) {
            this.picmsg1 = meta.moreleftw;
            this.picmsg2 = meta.leftg;
            this.picmsg3 = meta.rightred;
            this.picmsg4 = meta.morerightw;
            this.textmsg1 = '';
            this.textmsg2 = this.msg[1];
            this.textmsg3 = this.msg[2];
            this.textmsg4 = '';
        } else if (index === 3) {
            this.picmsg1 = meta.moreleftw;
            this.picmsg2 = meta.leftw;
            this.picmsg3 = meta.rightred;
            this.picmsg4 = meta.morerightg;
            this.textmsg1 = '';
            this.textmsg2 = '';
            this.textmsg3 = this.msg[2];
            this.textmsg4 = this.msg[3];
        }
        this.assemble.ButtonEvent();
    }
    resetEvent() {
        this.buttonActived = 0;
        this.ButtonEvent(0);
        this.showText = true; 
        // if (this.Timer != null) {
        //     clearTimeout(this.Timer);
        // }
        // this.Timer = setTimeout(() => {
        //     this.showText = false;
        // }, 2000);
    }
}

