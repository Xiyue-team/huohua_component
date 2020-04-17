import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {PgdjgViewHandler} from './services/PgdjgViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new PgdjgViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }


}

