import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { SrcUtils } from './SrcUtils';

const viewOptionConfig = require('./meta.json');

import pathIn from './sub_static/image/pathIn.png';
import pathOut from './sub_static/image/pathOut.png';
import bg from './sub_static/image/empty.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    btntext = this.lang.btntext;
    title_text = this.lang.title;
    btn = this.lang.btn;
    picbg = bg;
    picpathIn = pathIn;
    picpathOut = pathOut;
    buttonActived = -1;
    buttonAllActived = false;
    srcMessages: SrcUtils;
    option = [];
    msg = '';
    frontList = [];

    created() {
        this.srcMessages = new SrcUtils();
        this.option = this.srcMessages.option;
        this.frontList = this.option[0].msg;
        this.msg = this.option[0].text;
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

    buttonEvent(index: number) {
        if (this.buttonActived !== index) {
            this.buttonActived = index;
            this.msg = this.option[index].text;
            this.frontList = this.option[index].msg;
            for (let i = 0; i < this.frontList.length; i++) {
                this.frontList[i].active = false;
            }
            this.buttonAllActived = false;
        }
    }

    buttonAllEvent(index: number) {
        this.buttonAllActived = !this.buttonAllActived;
        this.msg = this.option[index].text;
        for (let i = 0; i < this.frontList.length; i++) {
            this.frontList[i].active = this.buttonAllActived;
        }
    }

    buttonCellEvent(index: number) {
        this.msg = this.frontList[index].text;
        for (let i = 0; i < this.frontList.length; i++) {
            this.frontList[i].active = false;
        }
        this.frontList[index].active = true;
        this.buttonAllActived = false;
    }

    resetEvent() {
        this.buttonActived = -1;
        this.buttonAllActived = false;
        for (let i = 0; i < this.frontList.length; i++) {
            this.frontList[i].active = false;
        }
    }
}
