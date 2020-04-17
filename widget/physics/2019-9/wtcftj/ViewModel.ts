import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {WtcftjViewHandler} from './services/WtcftjViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    index = 0;  // 第几个物体
    switchDisabled = true; // 受力分析是否可以切换
    showForces = false;
    title = '物体的浮沉条件';
    switchText = '受力分析';
    created() {
        console.log((BrowserUtil.getBrowserInfo().windowSize.split('x')));
        this.title = window.env.browserInfo.lang.title;
        this.switchText = window.env.browserInfo.lang.switch;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new WtcftjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {});
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    /**
     * 选择物体
     * @param index 1：第一个物体，2：第二个物体，3：第三个物体
     */
    chooseSubstance(index: number) {
        if (this.switchDisabled) {
            this.switchDisabled = false;
        }
        if (index !== this.index) {
            this.index = index;
            (ViewController.getInstance().viewHandler as WtcftjViewHandler).show(index);
        }
    }

    /**
     * 是否显示受力分析
     */
    changeShowForces() {
        if (!this.switchDisabled) {
            this.showForces = !this.showForces;
            (ViewController.getInstance().viewHandler as WtcftjViewHandler).changeShowForces(this.showForces);
        }
    }
}
