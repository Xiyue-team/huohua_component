import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZgsjxzqhViewHandler} from './services/ZgsjxzqhViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    range = false; 
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '中国省级行政区划';
    provinceMap = '';
    province = '';
    nickname = '';
    provincialCapital = '';
    introduction = '';
    display = 'none';
    /**
     * 渲染页面
     */
    created() {
        const viewOption = new ViewOption();
        this.title = window.env.browserInfo.lang.title;
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new ZgsjxzqhViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    /**
     * 页面渲染完成
     */
    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    closeProvinceDetail() {
        (ViewController.getInstance().viewHandler as ZgsjxzqhViewHandler).closeProvinceDetail();
    }
}

