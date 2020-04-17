import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { SrcUtils } from './SrcUtils';

const viewOptionConfig = require('./meta.json');
import right from './sub_static/image/icon/right.png';
import left from './sub_static/image/icon/left.png';
import back from './sub_static/image/icon/back.png';

import bgblur from './sub_static/image/bgblur.png';
import bg from './sub_static/image/bg.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    //文本
    text = this.lang.text;
    btntitle = this.lang.btntitle;
    title_text = this.lang.title;
    //贴图
    picbg = bg;
    picbgblur = bgblur;
    picright = right;
    picleft = left;
    picback = back;
    
    fullleft = 0;
    fullwidth = 0;
    
    buttonActived = -1;
    bgbuttonActived = false;
    srcMessages: SrcUtils;
    swiperOption = {
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    };
    swiperList = [];
    option = [];

    created() {
        this.srcMessages = new SrcUtils();
        this.swiperList = this.srcMessages.option[0].swiperData;
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
        this.resizeOffset();
    }

    resizeOffset() {
        const tw = window.innerWidth,
            th = window.innerHeight;
        this.fullwidth = th * 216 / 108;
        this.fullleft = -(this.fullwidth - tw) / 2;
        for (let i = 0; i < this.option.length; i++) {
            this.option[i].left = this.option[i].offsetL * this.fullwidth;
            this.option[i].top = this.option[i].offsetT * th;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        if (index !== -1) {
            this.option[index].active = true;
        }
        this.swiperList = index === -1 ? this.swiperList : this.srcMessages.option[index].swiperData;
        this.$refs.mySwiper.swiper.slideTo(0, 1000, false);
    }

    bgbuttonEvent() {
        this.bgbuttonActived = !this.bgbuttonActived;
        for (let i = 0; i < this.option.length; i++) {
            this.option[i].btn.show = this.bgbuttonActived;
        }
    }

    resetEvent() {
        this.buttonActived = -1;
    }

    resize() {
        this.bgbuttonActived = false;
        this.resizeOffset();
    }

}
