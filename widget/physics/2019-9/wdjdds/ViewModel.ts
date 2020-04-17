import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {WdjddsViewHandler} from './services/WdjddsViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    title = '温度计的读数';
    created() {
        this.title = window.env.browserInfo.lang.title;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new WdjddsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {});
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }
}
