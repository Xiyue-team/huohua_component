import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZgldhslgViewHandler} from './services/ZgldhslgViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    range = false; 
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '中国的陆上与海上邻国';
    /**
     * 渲染页面
     */
    created() {
        const viewOption = new ViewOption();
        this.title = window.env.browserInfo.lang.title;
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new ZgldhslgViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    /**
     * 页面渲染完成
     */
    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }
}

