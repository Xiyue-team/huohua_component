import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DlxcylViewHandler} from './services/DlxcylViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    type = 1;
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    title = '电流形成的原理';
    freeElectronBtn = '自由电子';
    electrifyBtn = '通电';
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.freeElectronBtn = window.env.browserInfo.lang.button.freeElectron;
        this.electrifyBtn = window.env.browserInfo.lang.button.electrify;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
        viewOption.showReset = viewOptionConfig.config.showReset;

        ViewController.getInstance(new DlxcylViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    increment() {
        this.type = this.type % 6 + 1;
    }
    
    showFreeElectron() {
        (ViewController.getInstance().viewHandler as DlxcylViewHandler).freeElectronEvent();
    }
    electrify() {
        (ViewController.getInstance().viewHandler as DlxcylViewHandler).electrifyEvent();
    }

    @Watch('type')
    switchConductor(type: number) {
        (ViewController.getInstance().viewHandler as DlxcylViewHandler).buttonEvent(type);
    }
}

