import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
const viewOptionConfig = require('./meta.json');

import $ from 'jquery-ts';

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
import bgSrc9 from './sub_static/image/bg/bg09.png';
import bgSrc10 from './sub_static/image/bg/bg10.png';
import bgSrc11 from './sub_static/image/bg/bg11.png';
import bgSrc12 from './sub_static/image/bg/bg12.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    
    swiperList = [
        { id: 1, bgSrc1: bgSrc1, tip: window.env.browserInfo.lang.text[0], pos: 'leftbottom' },
        { id: 2, bgSrc1: bgSrc2, tip: window.env.browserInfo.lang.text[1], pos: 'righttop' },
        { id: 3, bgSrc1: bgSrc3, tip: window.env.browserInfo.lang.text[2], pos: 'lefttop' },
        { id: 4, bgSrc1: bgSrc4, tip: window.env.browserInfo.lang.text[3], pos: 'rightbottom' },
        { id: 5, bgSrc1: bgSrc5, tip: window.env.browserInfo.lang.text[4], pos: 'righttop' },
        { id: 6, bgSrc1: bgSrc6, tip: window.env.browserInfo.lang.text[5], pos: 'leftbottom' },
        { id: 7, bgSrc1: bgSrc7, tip: window.env.browserInfo.lang.text[6], pos: 'leftbottom' },
        { id: 8, bgSrc1: bgSrc8, tip: window.env.browserInfo.lang.text[7], pos: 'rightbottom' },
        { id: 9, bgSrc1: bgSrc9, tip: window.env.browserInfo.lang.text[8], pos: 'rightbottom' },
        { id: 10, bgSrc1: bgSrc10, tip: window.env.browserInfo.lang.text[9], pos: 'leftbottom' },
        { id: 11, bgSrc1: bgSrc11, tip: window.env.browserInfo.lang.text[10], pos: 'righttop' },
        { id: 12, bgSrc1: bgSrc12, tip: window.env.browserInfo.lang.text[11], pos: 'righttop' }
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
        $('#info').css({ 'background-image': `url(${info})` });
        $('.swiper-button-prev').css({ 'background-image': `url(${left})` });
        $('.swiper-button-next').css({ 'background-image': `url(${right})` });
    }

    resetEvent() {
        
    }
}
