import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZbpmViewHandler} from './services/ZbpmViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
    buttonControl1 = false;
    buttonControl2 = false;
    buttonControl3 = false;
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    created() {
        ViewController.getInstance(new ZbpmViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    @Watch('buttonControl1')
    buttonctrl1(value: boolean) {
        (ViewController.getInstance().viewHandler as ZbpmViewHandler).zbpm.isShowXOY(value);
    }

    @Watch('buttonControl2')
    buttonctrl2(value: boolean) {
        (ViewController.getInstance().viewHandler as ZbpmViewHandler).zbpm.isShowYOZ(value);
    }

    @Watch('buttonControl3')
    buttonctrl3(value: boolean) {
        (ViewController.getInstance().viewHandler as ZbpmViewHandler).zbpm.isShowZOX(value);
    }

}

