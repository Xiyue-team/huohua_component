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
import downImg from './sub_static/image/down.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle1 = this.lang.btntext2;
    buttonTitle2 = this.lang.btntext1;
    buttonTitle3 = this.lang.btntext3;
    boolOpen = false;
    picList = [
        { type: 0, src1: picxblack, src2: picxwhite },
        { type: 1, src1: pic1xblack, src2: pic1xwhite },
        { type: 2, src1: picx2black, src2: picx2white },
        { type: 3, src1: piclnxblack, src2: piclnxwhite }
    ];
    dropIcon = downImg;
    current = { type: 0, src1: picxblack, src2: picxwhite };
    buttonActived = 0;
    analysisButtonActived = false;
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

    Folding(index: number) {
        this.buttonActived = index;
        this.assemble.Folding(index);
    }

    selectChange(type: number) {
        this.assemble.selectedLine(type + 1);
        this.current = this.picList[type];
    }

    Analysis() {
        this.analysisButtonActived = !this.analysisButtonActived;
        this.assemble.Analysis();
    }

    resetEvent() {
        this.current = this.picList[0];
        this.buttonActived = 0;
        this.analysisButtonActived = false;
        this.assemble.reset();
    }
}

