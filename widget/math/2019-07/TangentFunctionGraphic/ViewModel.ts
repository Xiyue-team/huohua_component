import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    title_text = '正切函数图像';
    // 判断是否是手机
    isPhone = false;
    assemble: any;
    created() {

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.title_text = window.env.browserInfo.lang.title;
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isPhone = true;
        }
    }

    resetEvent() {

    }
}

