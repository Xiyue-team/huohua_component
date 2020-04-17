import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {YsfjdViewHandler} from './services/YsfjdViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    disabled = false;   // 是否可以改变盐水浓度 false: 是  true: 否
    consistence = 1;    // 盐水浓度
    show = false;
    resetFlag = false;  // 是否重置中
    title = '盐水浮鸡蛋';
    switchText = '受力分析';
    concentration = '盐水浓度';
    low = '低';
    medium = '中';
    high = '高';
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.concentration = window.env.browserInfo.lang.concentration;
        this.low = window.env.browserInfo.lang.low;
        this.medium = window.env.browserInfo.lang.medium;
        this.high = window.env.browserInfo.lang.high;
        this.switchText = window.env.browserInfo.lang.switch;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new YsfjdViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    /**
     * 是否显示受力分析
     */
    changeShow(): void {
        this.show = !this.show;
        (ViewController.getInstance().viewHandler as YsfjdViewHandler).toggleShowforce(this.show);
    }

    /**
     * 改变液体浓度
     * @param value 
     */
    changeConsistence(value: number) {
        if (!this.disabled) {
            this.consistence = value;
        }
    }

    /**
     * 监听浓度的变化
     * @param val 新值
     * @param oldVal   旧值
     */
    @Watch('consistence')
    consistenceChange(val: Number, oldVal: Number) {
        if (!this.resetFlag) {
            this.disabled = true;
            const duration =  (ViewController.getInstance().viewHandler as YsfjdViewHandler).move(val, oldVal);
            setTimeout(() => {
                this.disabled = false;
            }, Number(duration) * 1000);
        }
    }
}
