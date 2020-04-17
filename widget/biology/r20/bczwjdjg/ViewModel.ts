import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZghjghyhxslViewHandler} from './services/ZghjghyhxslViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    click1 = false;
    click2 = false;
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new ZghjghyhxslViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    // @Watch('click1')
    // animationControl1(value: boolean, value1: boolean) {
    //         (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation.play();
    //         (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation1.play();
    // }
    //
    // @Watch('click2')
    // animationControl2(value: boolean, value1: boolean) {
    //         (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation.play();
    //         (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation2.play();
    //         // (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation5.play();
    //         // (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.animation4.play();
    // }
}

