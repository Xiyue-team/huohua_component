import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {RsfxfhViewHandler} from './services/RsfxfhViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    range = false; // 控制量程切换导线
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '认识风向及风力符号';
    practiceButtonText = '练一练';
    practiceButtonVisible = false;
    /**
     * 渲染页面
     */
    created() {
        const viewOption = new ViewOption();
        this.title = window.env.browserInfo.lang.title;
        this.practiceButtonText = window.env.browserInfo.lang.practiceButtonText;
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new RsfxfhViewHandler(this), viewOption);
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

    handlePractice() {
        (ViewController.getInstance().viewHandler as RsfxfhViewHandler).practiceEvent();
    }
}

