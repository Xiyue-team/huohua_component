import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');

import info from './sub_static/image/icon/info.png';
import right from './sub_static/image/icon/right.png';
import left from './sub_static/image/icon/left.png';

import bgSrc1 from './sub_static/image/bg/bg01.png';
import bgSrc2 from './sub_static/image/bg/bg02.png';
import bgSrc3 from './sub_static/image/bg/bg03.png';
import bgSrc4 from './sub_static/image/bg/bg04.png';
import bgSrc5 from './sub_static/image/bg/bg05.png';
import bgSrc6 from './sub_static/image/bg/bg06.png';
import bgSrc7 from './sub_static/image/bg/bg07.png';
import bgSrc8 from './sub_static/image/bg/bg08.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title; //标题
    titleShow = true; //是否显示标题
    timer = null;
    picinfo = info;
    picleft = left;
    picright = right;
    swiperList = [
        { id: 1, bgSrc1: bgSrc1, tip: this.lang.text[0], pos: 'lefttop' },
        { id: 2, bgSrc1: bgSrc2, tip: this.lang.text[1], pos: 'righttop' },
        { id: 3, bgSrc1: bgSrc3, tip: this.lang.text[2], pos: 'righttop' },
        { id: 4, bgSrc1: bgSrc4, tip: this.lang.text[3], pos: 'lefttop' },
        { id: 5, bgSrc1: bgSrc5, tip: this.lang.text[4], pos: 'righttop' },
        { id: 6, bgSrc1: bgSrc6, tip: this.lang.text[5], pos: 'lefttop' },
        { id: 7, bgSrc1: bgSrc7, tip: this.lang.text[6], pos: 'righttop' },
        { id: 8, bgSrc1: bgSrc8, tip: this.lang.text[7], pos: 'righttop' }
    ];

    swiperOption = {
        // 参数选项,显示小点
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //循环
        loop: true,
        //滑动速度
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    };

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
        setTimeout(() => { this.titleShow = false; }, 2000);
    }

    //显示标题
    openInfo() {
        this.titleShow = !this.titleShow;
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.titleShow = false;
        }, 2000);
    }

    resetEvent() {

    }
}

