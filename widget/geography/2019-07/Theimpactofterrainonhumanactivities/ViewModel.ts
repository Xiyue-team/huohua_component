import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
const viewOptionConfig = require('./meta.json');

import bg from './sub_static/image/bg/bg.png';
import right from './sub_static/image/icon/right.png';
import left from './sub_static/image/icon/left.png';

import bgSrc1 from './sub_static/image/bg/bg1.png';
import bgSrc2 from './sub_static/image/bg/bg2.png';
import bgSrc3 from './sub_static/image/bg/bg3.png';
import bgSrc4 from './sub_static/image/bg/bg4.png';
import bgSrc5 from './sub_static/image/bg/bg5.png';
import bgSrc6 from './sub_static/image/bg/bg6.png';
import bgSrc7 from './sub_static/image/bg/bg7.png';
import bgSrc8 from './sub_static/image/bg/bg8.png';
import bgSrc9 from './sub_static/image/bg/bg9.png';
import bgSrc10 from './sub_static/image/bg/bg10.png';
import bgSrc11 from './sub_static/image/bg/bg11.png';
import bgSrc12 from './sub_static/image/bg/bg12.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;

    swiperList = [
        { id: 1, bgSrc1: bgSrc1, bgSrc2: bgSrc2, text: window.env.browserInfo.lang.text[0] },
        { id: 2, bgSrc1: bgSrc3, bgSrc2: bgSrc4, text: window.env.browserInfo.lang.text[1] },
        { id: 3, bgSrc1: bgSrc5, bgSrc2: bgSrc6, text: window.env.browserInfo.lang.text[2] },
        { id: 4, bgSrc1: bgSrc7, bgSrc2: bgSrc8, text: window.env.browserInfo.lang.text[3] },
        { id: 5, bgSrc1: bgSrc9, bgSrc2: bgSrc10, text: window.env.browserInfo.lang.text[4] },
        { id: 6, bgSrc1: bgSrc11, bgSrc2: bgSrc12, text: window.env.browserInfo.lang.text[5] }
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
        $('#container').css({ 'background-image': `url(${bg})` });
        $('.swiper-button-prev').css({ 'background-image': `url(${left})` });
        $('.swiper-button-next').css({ 'background-image': `url(${right})` });
    }
    
    resetEvent() {

    }

}
