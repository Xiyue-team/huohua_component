import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {YzjmViewHandler} from './services/YzjmViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component

export class MainVueComponent extends Vue {
    active1 = false;
    active2 = false;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new YzjmViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    // 重置
    reset() {

        (ViewController.getInstance().viewHandler as YzjmViewHandler).Model.reset();
    }
}

