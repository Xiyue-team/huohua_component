import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {CsdViewHandler} from './services/CsdViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    title = '磁生电';
    leftButton = '向左';
    rightButton = '向右';
    leftButtonDisabled = false;
    rightButtonDisabled = true;
    upDownButton = '上下';
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.leftButton = window.env.browserInfo.lang.button.left;
        this.rightButton = window.env.browserInfo.lang.button.right;
        this.upDownButton = window.env.browserInfo.lang.button.upDown;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new CsdViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {}, true);
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    movePole(type: number) {
        (ViewController.getInstance().viewHandler as CsdViewHandler).movePole(type);
    }
}
