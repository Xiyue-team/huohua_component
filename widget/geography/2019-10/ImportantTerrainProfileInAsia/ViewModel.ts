import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');
import { SrcUtils } from './SrcUtils';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    msg = '';
    label: string;
    assemble: any;
    boolOpen = false;
    bg = '';
    buttonTitle = this.lang.btntext;
    funList = [
        {
            type: 0,
            html: this.lang.btntext[1],
            isShow: false
        },
        {
            type: 1,
            html: this.lang.btntext[2],
            isShow: false
        }];
    finalFuncActived = 0;
    realIndex = 0;
    SrcUtilss: SrcUtils;
    swiperList = [];
    showBG = false;
    progress = 0;
    swiperOption = {
        speed: 1000,
        slidesPerView: 3,
        centeredSlides: true,
        slideToClickedSlide: true,
        direction: 'vertical',
        on: {
            touchStart: () => {
                 this.closeChange();
            },
            slideChangeTransitionEnd: () => {
                this.slideChangeTransitionEnd();
            },
            progress: (progress: number) => {
                this.progressCall(progress);
            },
        },
    };

    created() {
        this.SrcUtilss = new SrcUtils();
        this.swiperList = this.SrcUtilss.swiperData.e100;
        this.label = this.SrcUtilss.label;
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.swiperOption.slidesPerView = 3;
        }
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
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    dropDown(type: boolean) {
        this.boolOpen = type;
    }
    closeChange() {
        this.boolOpen = false;
    }
    selectChange(type: number) {
        this.boolOpen = false;
        this.finalFuncActived = type + 2;
        for (let i = 0; i < this.funList.length; i++) {
            this.funList[i].isShow = i === type;
        }
        this.changeSceneData();
    }

    showEvent() {
        this.showBG = false;
    }
    picClick(type: number) {
        this.touchEnd();
    }

    ButtonEvent(type: number) {
        for (let i = 0; i < this.funList.length; i++) {
            this.funList[i].isShow = false;
        }
        this.boolOpen = false;
        this.finalFuncActived = type;
        this.changeSceneData();
    }

    changeSceneData() {
        this.slideTo(0);
        this.swiperList = this.finalFuncActived === 1 ? this.SrcUtilss.swiperData.e100 :
            this.finalFuncActived === 2 ? this.SrcUtilss.swiperData.n30 : this.SrcUtilss.swiperData.n40;
        this.msg = this.swiperList[0].tip;
        if (this.assemble) {
            this.assemble.ButtonEvent(this.finalFuncActived);
        }
    }

    slideTo(index: number, move = true) {
        if (move) {
            this.$refs.mySwiper.swiper.slideTo(index, 1000, false);
            if (this.msg !== this.swiperList[index].tip) {
                this.msg = this.swiperList[index].tip;
            }
        }
    }

    slideChangeTransitionEnd() {
        const index = this.$refs.mySwiper.swiper.realIndex;
        if (this.realIndex !== index) {
            this.realIndex = index;
            if (this.assemble) {
                this.assemble.slideChangeTransitionEnd(index);
            }
        }
    }

    progressCall(progress: number) {
        if (progress !== -0) {
            if (Math.abs(progress - this.progress) > 0.01) {
                this.progress = progress;
                if (this.assemble) {
                    this.assemble.progressCall(progress);
                }
            }
        }
    }

    touchEnd() {
        const index = this.$refs.mySwiper.swiper.realIndex;
        this.bg = this.swiperList[index].bgSrc;
        this.showBG = true;
        this.slideChangeTransitionEnd();
    }
    
    resetEvent() {
        this.swiperList = this.SrcUtilss.swiperData.e100;
        this.slideTo(0);
        this.finalFuncActived = 0;
        this.boolOpen = false;
    }
}

