import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

const viewOptionConfig = require('./meta.json');
import { Swiper, swiperSlide } from 'vue-awesome-swiper';
import bg from './sub_static/image/bg.png';
import front1 from './sub_static/image/front1.png';
import front2 from './sub_static/image/front2.png';
import front3 from './sub_static/image/front3.png';
import front4 from './sub_static/image/front4.png';
import front5 from './sub_static/image/front5.png';
import front6 from './sub_static/image/front6.png';
import front7 from './sub_static/image/front7.png';
import front8 from './sub_static/image/front8.png';
import front9 from './sub_static/image/front9.png';
import front10 from './sub_static/image/front10.png';
import front11 from './sub_static/image/front11.png';
import front12 from './sub_static/image/front12.png';

import right from './sub_static/image/icon/right.png';
import left from './sub_static/image/icon/left.png';
import back from './sub_static/image/icon/back.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    picbg = bg;
    picback = back;
    picright = right;
    picleft = left;
    buttonActived = -1;
    swiper_title = '';
    swiperList = [
        { id: 1, bgSrc1: front1, bgSrc2: front2, text: this.lang.text[0] },
        { id: 2, bgSrc1: front3, bgSrc2: front4, text: this.lang.text[1] },
        { id: 3, bgSrc1: front5, bgSrc2: front6, text: this.lang.text[2] },
        { id: 4, bgSrc1: front7, bgSrc2: front8, text: this.lang.text[3] },
        { id: 5, bgSrc1: front9, bgSrc2: front10, text: this.lang.text[4] },
        { id: 6, bgSrc1: front11, bgSrc2: front12, text: this.lang.text[5] }
    ];

    swiperOption = {
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: () => {
                this.slideChangeTransitionEnd();
            }
        },
    };

    swiperOption2 = {
        speed: 1000
    };
    Swiper1 = null;
    Swiper2 = null;

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
        this.Swiper1 = this.$refs.mySwiper1.swiper as Swiper;
        this.Swiper2 = this.$refs.mySwiper2.swiper as Swiper;
        this.Swiper2.controller.control = this.Swiper1;
        this.Swiper1.controller.control = this.Swiper2;
    }

    slideChangeTransitionEnd() {
        if (this.Swiper1) {
            const index = this.Swiper1.activeIndex;
            this.buttonActived = index;
            this.swiper_title = this.swiperList[index].text.title;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        this.swiper_title = this.swiperList[index].text.title;
        this.Swiper1.slideTo(index, 1000, false);
        this.Swiper2.slideTo(index, 1000, false);
    }

    resetEvent() {
        this.buttonActived = -1;
    }
}

