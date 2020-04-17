import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;

    clickNumber1 = true;
    isActive1 = false;

    title: string;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

        this.resize();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }

    resize() {
        if (window.innerWidth <= 1100 && window.innerWidth > 900) {

        } else if (window.innerWidth <= 900) {

        } else {
        }
    }

    buttonClickEvent1() {
        (ViewController.getInstance().viewHandler as any).dmCanvas.showText(this.isActive1);
    }

    resetEvent() {
        this.resetButton(0);
        (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
    }

    resetButton(value: number) {
        if (value !== 1) {
            this.clickNumber1 = true;
            this.isActive1 = false;
        }
    }
}
