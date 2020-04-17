import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DxdhcdyxViewHandler} from './services/DxdhcdyxViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {DxdhcdyxMobileViewHandler} from './services/DxdhcdyxMobileViewHandler';

@Component
export class MainVueComponent extends Vue {
    isIpad = BrowserUtil.getBrowserInfo().isIpad;
    isMobile = !(BrowserUtil.getBrowserInfo().os === 'Windows' || BrowserUtil.getBrowserInfo().os === 'Mac OS X');
    isMobilePhone = (BrowserUtil.getBrowserInfo().isSmallDevice);
    imgCtrl = false;
    title1 = '平坦';
    title2 = '南北山脉';
    title3 = '东西山脉';
    active1 = true;
    active2 = false;
    active3 = false;

    pym = {
        showSlider: false,
        animationName: 'pym',
        zipUrl: require('./sub_static/pym.zip'),
        imageNum: 86,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    pyk = {
        showSlider: false,
        animationName: 'pyk',
        zipUrl: require('./sub_static/pyk.zip'),
        imageNum: 51,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    nbm = {
        showSlider: false,
        animationName: 'nbm',
        zipUrl: require('./sub_static/nbm.zip'),
        imageNum: 86,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    nbk = {
        showSlider: false,
        animationName: 'nbk',
        zipUrl: require('./sub_static/nbk.zip'),
        imageNum: 51,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    dxm = {
        showSlider: false,
        animationName: 'dxm',
        zipUrl: require('./sub_static/dxm.zip'),
        imageNum: 86,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    dxk = {
        showSlider: false,
        animationName: 'dxk',
        zipUrl: require('./sub_static/dxk.zip'),
        imageNum: 51,
        width: this.isMobilePhone ? 340 : 680,
        height: this.isMobilePhone ? 191 : 360,
    };

    created() {
        if (this.isMobile) {
            ViewController.getInstance(new DxdhcdyxMobileViewHandler(this));
        } else {
            ViewController.getInstance(new DxdhcdyxViewHandler(this));
        }

        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    mounted() {
        ViewController.getInstance().domReady();
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

    buttonSwitch1() {
        this.imgCtrl = false;
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationReset();
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

    buttonSwitch2() {
        this.imgCtrl = true;
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationReset();
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

    clickEvent1() {
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationReset();
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

    clickEvent2() {
        this.active1 = false;
        this.active2 = true;
        this.active3 = false;
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationReset();
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

    clickEvent3() {
        this.active1 = false;
        this.active2 = false;
        this.active3 = true;
        if (!this.isMobile) {
            (ViewController.getInstance().viewHandler as DxdhcdyxViewHandler).animationPlay();
        } else {
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationReset();
            (ViewController.getInstance().viewHandler as DxdhcdyxMobileViewHandler).mobileAnimationPlay();
        }
    }

}
