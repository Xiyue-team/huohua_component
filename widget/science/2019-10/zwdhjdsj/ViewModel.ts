import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewHandler} from './services/ViewHandler';
import * as ltcImgPath from './sub_static/compress_ltc.png';
import * as shlImgPath from './sub_static/compress_shl.png';

@Component
export class ViewModel extends Vue {
    title = ''; //标题
    active = 1;
    hideAnimation = false;

    category1Txt = '';
    category2Txt = '';
    category3Txt = '';


    ltcImg = ltcImgPath;
    shlImg = shlImgPath;

    /**
     * 渲染页面
     */
    created() {
        //HITV300C
        //M2-A01W
        this.title = (window as any).env.browserInfo.lang.title ;
        this.category1Txt = (window as any).env.browserInfo.lang.category1;
        this.category2Txt = (window as any).env.browserInfo.lang.category2;
        this.category3Txt = (window as any).env.browserInfo.lang.category3;

        ViewController.getInstance(new ViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();

    }
    /**
     * 渲染页面完成
     */
    mounted() {

        ViewController.getInstance().domReady();
        this.hideAnimation = navigator.userAgent.indexOf('HITV300C') > 0 || navigator.userAgent.indexOf('M2-A01W') > 0 ||
          navigator.userAgent.indexOf('MON-W19') > 0;
        ViewController.getInstance().hideLoading();
    }

    


}

