import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZxysqxViewHandler} from './services/ZxysqxViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {
    buttonControl = false;
    disableControl = true;
    newTitle = 'Δ';
    color = false;
    isShow = false;
    delta = 'Δ > 0';
    position = '相交';
    intersection = '两个';
    slope = '存在';
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    created() {
        ViewController.getInstance(new ZxysqxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    button() {
        this.color = !this.color;
        this.isShow = !this.isShow;
    }

}

