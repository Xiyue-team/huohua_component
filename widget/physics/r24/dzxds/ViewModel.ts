import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DzxdsViewHandler} from './services/DzxdsViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机
    title = '电阻箱读数'; //标题
    changeNumber = '改变示数'; // 改变示数按钮文字
    /**
     * 渲染页面
     */
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.changeNumber = window.env.browserInfo.lang.button.changeNumber;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new DzxdsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {});
    }
    /**
     * 渲染页面完成
     */
    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    /**
     * 改变示数
     */
    randomNumber() {
        (ViewController.getInstance().viewHandler as DzxdsViewHandler).randomNumber();
    }



}

