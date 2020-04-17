import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ClViewHandler} from './services/ClViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

    created() {
        const viewOption = new ViewOption();
        viewOption.controlPanelAnimationDelay = 1000;
        viewOption.adapterMobilePanel = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ClViewHandler(this) , viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }


}

