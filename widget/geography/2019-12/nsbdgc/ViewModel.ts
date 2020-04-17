import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {NsbdgcViewHandler} from './services/NsbdgcViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    lineType = ''; // 控制按钮状态
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '中国的南水北调工程';
    eastLineButtonText = '东线';
    westLineButtonText = '西线';
    centerLineButtonText = '中线';
    /**
     * 渲染页面
     */
    created() {
        const viewOption = new ViewOption();
        this.title = window.env.browserInfo.lang.title;
        this.eastLineButtonText = window.env.browserInfo.lang.button.eastLine;
        this.westLineButtonText = window.env.browserInfo.lang.button.westLine;
        this.centerLineButtonText = window.env.browserInfo.lang.button.centerLine;
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new NsbdgcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {}, true);
    }

    /**
     * 页面渲染完成
     */
    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    handleLineButton(type: string) {
        this.lineType = type;
        (ViewController.getInstance().viewHandler as NsbdgcViewHandler).lineButtonEvent(type);
    }
    handleCloseSwiper() {
        (ViewController.getInstance().viewHandler as NsbdgcViewHandler).closeSwiperEvent();
    }
}

