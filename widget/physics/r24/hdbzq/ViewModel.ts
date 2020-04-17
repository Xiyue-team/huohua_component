import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {HdbzqViewHandler} from './services/HdbzqViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    type = 1; // 接线方式 1:A、B, 2:B、D, 3:B、C, 4: A、D, 5: A、C, 6:C、D
    incrementTouch = false; // 切换接线方式状态
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '电流表读数'; //标题
    tip = '金属杆及线圈上标注的红色部分表示接入电路中的阻值部分'; // 改变示数按钮文字
    connectionMode = '接线柱连接状态'; // 切换量程按钮文字
     /**
     * 开始渲染界面
     */
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.tip = window.env.browserInfo.lang.tip;
        this.connectionMode = window.env.browserInfo.lang.connectionMode;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new HdbzqViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {});
    }

    /**
     * 界面渲染完成
     */
    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    /**
     * 切换接线方式
     */
    increment() {
        this.type = this.type % 6 + 1;
    }

    /**
     * 连接变化方法
     */
    connectionEvent(type: number) {
        this.type = type;
        (ViewController.getInstance().viewHandler as HdbzqViewHandler).buttonEvent(type);
    }
}

