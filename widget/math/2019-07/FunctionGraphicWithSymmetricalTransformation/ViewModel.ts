import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as ffx from './sub_static/ffx.png';
import f2xb from './sub_static/image/f2xb.png';
import f2xw from './sub_static/image/f2xw.png';

import f1xb from './sub_static/image/f1xb.png';
import f1xw from './sub_static/image/f1xw.png';

import fexb from './sub_static/image/fexb.png';
import fexw from './sub_static/image/fexw.png';

import downImg from './sub_static/image/down.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    picList = [
        { type: 0, src1: f2xb, src2: f2xw },
        { type: 1, src1: f1xb, src2: f1xw },
        { type: 2, src1: fexb, src2: fexw }
    ];
    picmsg = ffx;
    dropIcon = downImg;
    current = { type: 0, src1: f2xb, src2: f2xw };
    buttonTitle1 = window.env.browserInfo.lang.btntext1;
    buttonTitle2 = window.env.browserInfo.lang.btntext2;
    buttonTitle3 = window.env.browserInfo.lang.btntext3;
    buttonTitle4 = window.env.browserInfo.lang.btntext4;
    buttonTitle5 = window.env.browserInfo.lang.btntext5;
    buttonSymmetricalActived = 0;
    buttonAnalysisActived = false;
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
        this.assemble.selectedLine(type + 1);
        this.current = this.picList[type];
    }

    Symmetrical(num: number) {
        this.buttonSymmetricalActived = num;
        this.assemble.Symmetrical(num);
    }
    Analysis() {
        this.buttonAnalysisActived = !this.buttonAnalysisActived;
        this.assemble.Analysis();
    }

    resetEvent() {
        this.current = this.picList[0];
        this.buttonSymmetricalActived = 0;
        this.buttonAnalysisActived = false;
        this.assemble.reset();
    }
}

