import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');

import icon1 from './sub_static/image/icon/icon1.png';
import icon2 from './sub_static/image/icon/icon2.png';
import icon3 from './sub_static/image/icon/icon3.png';
import icon4 from './sub_static/image/icon/icon4.png';
import icon5 from './sub_static/image/icon/icon5.png';
import icon6 from './sub_static/image/icon/icon6.png';
import icon7 from './sub_static/image/icon/icon7.png';
import icon8 from './sub_static/image/icon/icon8.png';

import bgSrc1 from './sub_static/image/bg/bg01.png';
import bgSrc2 from './sub_static/image/bg/bg02.png';
import bgSrc3 from './sub_static/image/bg/bg03.png';
import bgSrc4 from './sub_static/image/bg/bg04.png';
import bgSrc5 from './sub_static/image/bg/bg05.png';
import bgSrc6 from './sub_static/image/bg/bg06.png';
import bgSrc7 from './sub_static/image/bg/bg07.png';
import bgSrc8 from './sub_static/image/bg/bg08.png';
import bg from './sub_static/image/bg.jpg';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    text = window.env.browserInfo.lang.text;
    title_text = this.lang.title;
    picbg = bg;
    buttonActived = -1;
    showList = [
        { id: 0, bgSrc: bgSrc1, tip: this.text[0] },
        { id: 1, bgSrc: bgSrc2, tip: this.text[1] },
        { id: 2, bgSrc: bgSrc3, tip: this.text[2] },
        { id: 0, bgSrc: bgSrc4, tip: this.text[3] },
        { id: 1, bgSrc: bgSrc5, tip: this.text[4] },
        { id: 2, bgSrc: bgSrc6, tip: this.text[5] },
        { id: 0, bgSrc: bgSrc7, tip: this.text[6] },
        { id: 1, bgSrc: bgSrc8, tip: this.text[7] }
    ];

    showData = this.showList[0];
    option = [
        {
            btn: {
                Unclicked: icon1,
                clicked: icon1
            },
            active: false,
            offsetL: 0.63,
            offsetT: 0.82,
            left: 100,
            top: 300
        }, {
            btn: {
                Unclicked: icon7,
                clicked: icon7
            },
            active: false,
            offsetL: 0.67,
            offsetT: 0.7,
            left: 100,
            top: 400
        }, {
            btn: {
                Unclicked: icon2,
                clicked: icon2
            },
            active: false,
            offsetL: 0.7,
            offsetT: 0.47,
            left: 100,
            top: 200
        }, {
            btn: {
                Unclicked: icon5,
                clicked: icon5
            },
            active: false,
            offsetL: 0.8,
            offsetT: 0.25,
            left: 150,
            top: 100
        }, {
            btn: {
                Unclicked: icon8,
                clicked: icon8
            },
            active: false,
            offsetL: 0.63,
            offsetT: 0.53,
            left: 300,
            top: 100
        }, {
            btn: {
                Unclicked: icon3,
                clicked: icon3
            },
            active: false,
            offsetL: 0.23,
            offsetT: 0.29,
            left: 400,
            top: 100
        }, {
            btn: {
                Unclicked: icon4,
                clicked: icon4
            },
            active: false,
            offsetL: 0.58,
            offsetT: 0.71,
            left: 600,
            top: 100
        }, {
            btn: {
                Unclicked: icon6,
                clicked: icon6
            },
            active: false,
            offsetL: 0.62,
            offsetT: 0.43,
            left: 200,
            top: 200
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
        let offsetW = 0, offsetH = 0;
        let w = document.getElementById('block').clientWidth, 
        h = document.getElementById('block').clientHeight;
        if (w > h * 1700 / 1200) {
            offsetW = (w - h * 1700 / 1200) / 2;
            w = h * 1700 / 1200;
            offsetH = 0;
        } else {
            offsetH = (h - w * 1200 / 1700) / 2;
            h = w * 1200 / 1700;
            offsetW = 0;
        }
        for (let i = 0; i < this.option.length; i++) {
          
                this.option[i].left = this.option[i].offsetL * w + offsetW;
                this.option[i].top = this.option[i].offsetT * h + offsetH;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        if (index !== -1) {
            this.option[index].active = true;
        }
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
