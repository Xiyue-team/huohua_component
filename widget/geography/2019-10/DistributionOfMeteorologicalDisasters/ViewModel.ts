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

import icon1 from './sub_static/image/icon/icon1.png';
import icon12 from './sub_static/image/icon/icon12.png';
import icon2 from './sub_static/image/icon/icon2.png';
import icon3 from './sub_static/image/icon/icon3.png';
import icon4 from './sub_static/image/icon/icon4.png';
import icon42 from './sub_static/image/icon/icon42.png';
import icon5 from './sub_static/image/icon/icon5.png';
import icon6 from './sub_static/image/icon/icon6.png';
import icon62 from './sub_static/image/icon/icon62.png';

import bg from './sub_static/image/bg.jpg';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    text = window.env.browserInfo.lang.text;
    title_text = this.lang.title;
    picbg = bg;
    picright = right;
    picleft = left;
    picback = back;
    buttonActived = -1;
    SrcUtilss: SrcUtils;
    swiperOption = {
        //滑动速度
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    };
    swiperList = [];
    option = [
        {
            btn: {
                Unclicked: icon12,
                clicked: icon1
            },
            active: false,
            offsetL: 0.66,
            offsetT: 0.29,
            left: 100,
            top: 300
        }, {
            btn: {
                Unclicked: icon2,
                clicked: icon2
            },
            active: false,
            offsetL: 0.64,
            offsetT: 0.74,
            left: 100,
            top: 400
        }, {
            btn: {
                Unclicked: icon3,
                clicked: icon3
            },
            active: false,
            offsetL: 0.66,
            offsetT: 0.84,
            left: 100,
            top: 200
        }, {
            btn: {
                Unclicked: icon42,
                clicked: icon4
            },
            active: false,
            offsetL: 0.37,
            offsetT: 0.52,
            left: 150,
            top: 100
        }, {
            btn: {
                Unclicked: icon5,
                clicked: icon5
            },
            active: false,
            offsetL: 0.77,
            offsetT: 0.24,
            left: 300,
            top: 100
        }, {
            btn: {
                Unclicked: icon62,
                clicked: icon6
            },
            active: false,
            offsetL: 0.54,
            offsetT: 0.41,
            left: 400,
            top: 100
        }
    ];

    created() {
        this.SrcUtilss = new SrcUtils();
        this.swiperList = this.SrcUtilss.swiperData[0];
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
            this.option[i].left = this.option[i].offsetL * w + offsetW + 9;
            this.option[i].top = this.option[i].offsetT * h + offsetH;
        }
    }

    buttonEvent(index: number) {
        this.buttonActived = index;
        if (index !== -1) {
            this.option[index].active = true;
        }
        this.swiperList = index === -1 ? this.swiperList : this.SrcUtilss.swiperData[index];
        this.$refs.mySwiper.swiper.slideTo(0, 1000, false);
    }

    resetEvent() {
        this.buttonActived = -1;
    }

    resize() {
        this.resizeOffset();
    }

}
