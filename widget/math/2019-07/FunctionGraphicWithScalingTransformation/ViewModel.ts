import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import fx from './sub_static/fx.png';
import pic1xblack from './sub_static/image/1xblack.png';
import pic1xwhite from './sub_static/image/1xwhite.png';

import picx2black from './sub_static/image/x2black.png';
import picx2white from './sub_static/image/x2white.png';

import picxblack from './sub_static/image/xblack.png';
import picxwhite from './sub_static/image/xwhite.png';
import downImg from './sub_static/image/down.png';

import * as a from './sub_static/a.png';
import * as w from './sub_static/w.png';

@Component
export class ViewModel extends Vue {
    picmsg = fx;
    pica = a;
    picw = w;

    title_text = window.env.browserInfo.lang.title;
    boolOpen = false;
    picList = [
        { type: 0, src1: picxblack, src2: picxwhite },
        { type: 1, src1: pic1xblack, src2: pic1xwhite },
        { type: 2, src1: picx2black, src2: picx2white }
    ];
    current = { type: 0, src1: picxblack, src2: picxwhite };
    dropIcon = downImg;

    buttonTitle1 = window.env.browserInfo.lang.btntext1;
    buttonTitle2 = window.env.browserInfo.lang.btntext2;
    buttonTitle3 = window.env.browserInfo.lang.btntext3;
    buttonActivedX = false;
    buttonActivedY = false;
    buttonActived1 = false;
    sliderNumber = 10;
    sliderNumber2 = 10;

    sliderOption = {
        width: '100%',
        height: 2,
        min: 1,
        max: 100,
        piecewise: false,
        tooltip: 'always',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
        dotStyle: {
            'backgroundColor': '#ffffff',
            'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
            'visibility': 'visible',
            'width': '24px',
            'height': '24px'
        },
        stepStyle: {
            'width': '100%',
            'height': '100%',
            'border-radius': '50%',
            'box-shadow': '0 0 0 3px #5D5D5D',
            'background-color': '#5D5D5D',
        },
        railStyle: {
            'background-color': '#5D5D5D',
        },
        stepActiveStyle: {
            'box-shadow': '0 0 0 3px #3498db',
            'backgroundColor': '#5D5D5D',
        },
        processStyle: {

            'backgroundColor': '#5D5D5D',
        },
        bgStyle: {
            'backgroundColor': '#5D5D5D',
        },
    };

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
    ButtonEventX() {
        this.buttonActivedX = !this.buttonActivedX;
        this.assemble.ButtonEventX();
    }
    ButtonEventY() {
        this.buttonActivedY = !this.buttonActivedY;
        this.assemble.ButtonEventY();
    }
    ButtonEvent2() {
        this.buttonActived1 = !this.buttonActived1;
        this.assemble.ButtonEvent2();
    }
    selectChange(type: number) {
        this.assemble.selectedLine(type + 1);
        this.current = this.picList[type];
    }
    formatter(e: string) {
        if (this.assemble) { this.assemble.changeText(Number(e)); }
    }

    formatter2(e: string) {
        if (this.assemble) { this.assemble.changeText(Number(e)); }
    }
    resetEvent() {
        this.current = this.picList[0];
        this.buttonActivedX = false;
        this.buttonActivedY = false;
        this.buttonActived1 = false;
        this.assemble.reset();
    }
}

