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

import front01 from './sub_static/image/front01.png';
import front02 from './sub_static/image/front02.png';
import front03 from './sub_static/image/front03.png';

import bg from './sub_static/image/bg.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    //文本
    text = this.lang.text;
    btntext = this.lang.btntext;
    title_text = this.lang.title;
//贴图
    picbg = bg;
    picright = right;
    picleft = left;
    picback = back;

    buttonActived = -1;
    bgbuttonActived = 0;
    srcMessages: SrcUtils;
    pic = [front01, front02, front03]; //温度带贴图
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
        this.swiperList = index === -1 ? this.swiperList : this.srcMessages.option[index].swiperData;
        this.$refs.mySwiper.swiper.slideTo(0, 1000, false);
    }

    bgbuttonEvent(index: number) {
        this.bgbuttonActived = index + 1;
    }

    resetEvent() {
        this.buttonActived = -1;
    }

    resize() {
        this.resizeOffset();
    }

}
