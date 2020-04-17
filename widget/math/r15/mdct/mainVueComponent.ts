import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MdctViewHandler} from './services/MdctViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
    // data
    // 引导线
    showGuideLine = true;

    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new MdctViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }


    // methods
    resetEvent() {
        // 重置
        (ViewController.getInstance().viewHandler as MdctViewHandler).mdct3DModel.reset();
    }
}

