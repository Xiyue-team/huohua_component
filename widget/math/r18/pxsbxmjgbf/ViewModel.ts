import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {CanvasViewHandler} from './services/CanvasViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    buttonControl = false;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new CanvasViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {

        ViewController.getInstance().domReady();
        ViewController.getInstance().hideLoading(500);
    }



}

