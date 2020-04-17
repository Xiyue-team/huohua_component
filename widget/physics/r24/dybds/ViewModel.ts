import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DybdsViewHandler} from './services/DybdsViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    range = false; // 控制量程切换导线
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice; // 是否手机端
    title = '电压表读数'; //标题
    changeNumber = '改变示数'; // 改变示数按钮文字
    changeRange = '切换量程'; // 切换量程按钮文字
    /**
     * 渲染页面
     */
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.changeNumber = window.env.browserInfo.lang.button.changeNumber;
        this.changeRange = window.env.browserInfo.lang.button.changeRange;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new DybdsViewHandler(this), viewOption);
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
     * 生成随机示数
     */
    randomNumber() {
        (ViewController.getInstance().viewHandler as DybdsViewHandler).randomNumberEvent();
    }
    
    /**
     * 监听是否切换量程
     * @param value 
     */
    @Watch('range')
    animationControl(value: boolean) {
        (ViewController.getInstance().viewHandler as DybdsViewHandler).changeRangeEvent();
    }



}

