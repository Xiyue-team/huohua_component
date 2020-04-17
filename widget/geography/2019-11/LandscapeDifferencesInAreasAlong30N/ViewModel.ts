import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');

import bgSrc1 from './sub_static/image/bg/bg01.png';
import bgSrc2 from './sub_static/image/bg/bg02.png';
import bgSrc3 from './sub_static/image/bg/bg03.png';
import bgSrc4 from './sub_static/image/bg/bg04.png';
import bg from './sub_static/image/bg.png';
import bgblur from './sub_static/image/bgblur.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    title_text = this.lang.title;

    picbg = bg;
    picbgblur = bgblur;
    
    fullleft = 0;
    fullwidth = 0;

    buttonActived = -1;
    showList = [
        { id: 0, bgSrc: bgSrc1, title: this.text[0].title, tip: this.text[0].text },
        { id: 1, bgSrc: bgSrc2, title: this.text[1].title, tip: this.text[1].text },
        { id: 2, bgSrc: bgSrc3, title: this.text[2].title, tip: this.text[2].text },
        { id: 0, bgSrc: bgSrc4, title: this.text[3].title, tip: this.text[3].text }
    ];

    showData = this.showList[0];
    option = [
        {
            offsetL: 0.2881,
            offsetT: 0.405,
            left: 100,
            top: 300
        }, {
            offsetL: 0.473,
            offsetT: 0.405,
            left: 100,
            top: 400
        }, {
            offsetL: 0.568,
            offsetT: 0.405,
            left: 100,
            top: 200
        }, {
            offsetL: 0.668,
            offsetT: 0.405,
            left: 150,
            top: 100
        }
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
        this.resizeOffset();
    }

    resizeOffset() {
        const tw = window.innerWidth,
            th = window.innerHeight;
        this.fullwidth = th * 260 / 108;
        this.fullleft = -(this.fullwidth - tw) / 2;
        for (let i = 0; i < this.option.length; i++) {
            this.option[i].left = this.option[i].offsetL * this.fullwidth;
            this.option[i].top = this.option[i].offsetT * th;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        this.showData = index === -1 ? this.showData : this.showList[index];
    }
    resize() {
        this.resizeOffset();
    }
    resetEvent() {
        this.showData = this.showList[0];
        this.buttonActived = -1;
    }
}
