import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {GdsfgsViewHandler} from './services/GdsfgsViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component

export class MainVueComponent extends Vue {
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new GdsfgsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {

        ViewController.getInstance().domReady();
    }
    // 重置
    reset() {

        (ViewController.getInstance().viewHandler as GdsfgsViewHandler).Model.reset();
    }
}

