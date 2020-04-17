import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const viewOptionConfig = require('./meta.json');

import back from './sub_static/image/icon/back.png';
import iconSrc1 from './sub_static/image/icon/weather1.png';
import iconSrc2 from './sub_static/image/icon/weather2.png';
import iconSrc3 from './sub_static/image/icon/weather3.png';
import iconSrc4 from './sub_static/image/icon/weather4.png';
import iconSrc5 from './sub_static/image/icon/weather5.png';
import iconSrc6 from './sub_static/image/icon/weather6.png';
import iconSrc7 from './sub_static/image/icon/weather7.png';
import iconSrc8 from './sub_static/image/icon/weather8.png';
import iconSrc9 from './sub_static/image/icon/weather9.png';
import iconSrc10 from './sub_static/image/icon/weather10.png';
import iconSrc11 from './sub_static/image/icon/weather11.png';
import iconSrc12 from './sub_static/image/icon/weather12.png';
import iconSrc13 from './sub_static/image/icon/weather13.png';
import iconSrc14 from './sub_static/image/icon/weather14.png';
import iconSrc15 from './sub_static/image/icon/weather15.png';
import iconSrc16 from './sub_static/image/icon/weather16.png';
import iconSrc17 from './sub_static/image/icon/weather17.png';
import iconSrc18 from './sub_static/image/icon/weather18.png';

import bgSrc1 from './sub_static/image/bg/weather1.png';
import bgSrc2 from './sub_static/image/bg/weather2.png';
import bgSrc3 from './sub_static/image/bg/weather3.png';
import bgSrc4 from './sub_static/image/bg/weather4.png';
import bgSrc5 from './sub_static/image/bg/weather5.png';
import bgSrc6 from './sub_static/image/bg/weather6.png';
import bgSrc7 from './sub_static/image/bg/weather7.png';
import bgSrc8 from './sub_static/image/bg/weather8.png';
import bgSrc9 from './sub_static/image/bg/weather9.png';
import bgSrc10 from './sub_static/image/bg/weather10.png';
import bgSrc11 from './sub_static/image/bg/weather11.png';
import bgSrc12 from './sub_static/image/bg/weather12.png';
import bgSrc13 from './sub_static/image/bg/weather13.png';
import bgSrc14 from './sub_static/image/bg/weather14.png';
import bgSrc15 from './sub_static/image/bg/weather15.png';
import bgSrc16 from './sub_static/image/bg/weather16.png';
import bgSrc17 from './sub_static/image/bg/weather17.png';
import bgSrc18 from './sub_static/image/bg/weather18.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    weatherNo = 0;
    backicon = back;
    weatherList = [
        {
            iconSrc: iconSrc1, bgSrc: bgSrc1,
            title: this.lang.text[0].title, desc: this.lang.text[0].desc
        },
        {
            iconSrc: iconSrc2, bgSrc: bgSrc2,
            title: this.lang.text[1].title, desc: this.lang.text[1].desc
        },
        {
            iconSrc: iconSrc3, bgSrc: bgSrc3,
            title: this.lang.text[2].title, desc: this.lang.text[2].desc
        },
        {
            iconSrc: iconSrc4, bgSrc: bgSrc4,
            title: this.lang.text[3].title, desc: this.lang.text[3].desc
        },
        {
            iconSrc: iconSrc5, bgSrc: bgSrc5,
            title: this.lang.text[4].title, desc: this.lang.text[4].desc
        },
        {
            iconSrc: iconSrc6, bgSrc: bgSrc6,
            title: this.lang.text[5].title, desc: this.lang.text[5].desc
        },
        {
            iconSrc: iconSrc7, bgSrc: bgSrc7,
            title: this.lang.text[6].title, desc: this.lang.text[6].desc
        },
        {
            iconSrc: iconSrc8, bgSrc: bgSrc8,
            title: this.lang.text[7].title, desc: this.lang.text[7].desc
        },
        {
            iconSrc: iconSrc9, bgSrc: bgSrc9,
            title: this.lang.text[8].title, desc: this.lang.text[8].desc
        },
        {
            iconSrc: iconSrc10, bgSrc: bgSrc10,
            title: this.lang.text[9].title, desc: this.lang.text[9].desc
        },
        {
            iconSrc: iconSrc11, bgSrc: bgSrc11,
            title: this.lang.text[10].title, desc: this.lang.text[10].desc
        },
        {
            iconSrc: iconSrc12, bgSrc: bgSrc12,
            title: this.lang.text[11].title, desc: this.lang.text[11].desc
        },
        {
            iconSrc: iconSrc13, bgSrc: bgSrc13,
            title: this.lang.text[12].title, desc: this.lang.text[12].desc
        },
        {
            iconSrc: iconSrc14, bgSrc: bgSrc14,
            title: this.lang.text[13].title, desc: this.lang.text[13].desc
        },
        {
            iconSrc: iconSrc15, bgSrc: bgSrc15,
            title: this.lang.text[14].title, desc: this.lang.text[14].desc
        },
        {
            iconSrc: iconSrc16, bgSrc: bgSrc16,
            title: this.lang.text[15].title, desc: this.lang.text[15].desc
        },
        {
            iconSrc: iconSrc17, bgSrc: bgSrc17,
            title: this.lang.text[16].title, desc: this.lang.text[16].desc
        },
        {
            iconSrc: iconSrc18, bgSrc: bgSrc18,
            title: this.lang.text[17].title, desc: this.lang.text[17].desc
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
    }

    openModal(no: number) {
        this.weatherNo = no;
    }

    resetEvent() {
        this.weatherNo = 0;
    }
}

