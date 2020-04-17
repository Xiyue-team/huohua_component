import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { SrcUtils } from './SrcUtils';

const viewOptionConfig = require('./meta.json');
import back from './sub_static/image/icon/back.png';
import btn1 from './sub_static/image/icon/btn1.png';
import btn2 from './sub_static/image/icon/btn2.png';

import front01 from './sub_static/image/front01.png';
import front02 from './sub_static/image/front02.png';
import front03 from './sub_static/image/front03.png';

import bg from './sub_static/image/bg.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    //文本
    text = this.lang.text;
    btntext = this.lang.btntext;
    btns = [
        { icon: btn1, text: this.btntext[0], pic: front01, show: false },
        { icon: btn2, text: this.btntext[1], pic: front02, show: false },
        { icon: null, text: this.btntext[2], pic: front03, show: false }
    ];
    title_text = this.lang.title;
    //贴图
    picbg = bg;
    picback = back;
    blockWidth = 0;
    buttonActived = -1;
    bgbuttonActived = -1;
    srcMessages: SrcUtils;
    option = [];
    block: HTMLElement;
    created() {
        this.srcMessages = new SrcUtils();
        this.option = this.srcMessages.option;
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
        this.block = document.getElementById('block');
        this.resizeOffset();
    }

    resizeOffset() {
        const h = this.block.clientHeight;
        this.blockWidth = h * 196 / 135;
        for (let i = 0; i < this.option.length; i++) {
            this.option[i].left = this.option[i].offsetL * this.blockWidth;
            this.option[i].top = this.option[i].offsetT * h;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        if (index !== -1) {
            this.option[index].active = true;
        }
    }

    bgbuttonEvent(index: number) {
        this.btns[index].show = !this.btns[index].show;
        let canShow = -1;
        let canShowCount = 0;
        for (let i = 0; i < this.btns.length; i++) {
            if (this.btns[i].show) {
                canShow = i;
                canShowCount++;
            }
        }
        if (canShowCount === 1) {
            this.bgbuttonActived = canShow;
        } else {
            this.bgbuttonActived = -1;
        }
    }

    resetEvent() {
        this.buttonActived = -1;
    }

    resize() {
        this.resizeOffset();
    }

}
