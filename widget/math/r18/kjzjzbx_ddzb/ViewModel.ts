import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DdzbViewHandler} from './services/DdzbViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
    buttonControl = false;
    disableControl = true;
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    created() {
        ViewController.getInstance(new DdzbViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    randomPoint() {
        this.disableControl = false;
        (ViewController.getInstance().viewHandler as DdzbViewHandler).ddzb.createRandomPoint(this.buttonControl);
    }

    @Watch('buttonControl')
    buttonCtrl(value: boolean) {
        if (value) {
            (ViewController.getInstance().viewHandler as DdzbViewHandler).ddzb.createLine();
            (ViewController.getInstance().viewHandler as DdzbViewHandler).ddzb.loadPointImage();
        } else {
            (ViewController.getInstance().viewHandler as DdzbViewHandler).ddzb.removeLines();
            (ViewController.getInstance().viewHandler as DdzbViewHandler).ddzb.hidePointImage(false);
        }
    }
}

