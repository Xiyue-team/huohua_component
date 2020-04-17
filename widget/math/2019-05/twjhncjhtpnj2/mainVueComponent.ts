import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/myViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component
export class MainVueComponent extends Vue {
    active1 = false;
    active2 = false;
    active3 = false;
    tip = "";
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new MyViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }
    //methods
    clickbutton(num: number) {
        (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.clickButton(num);
    }
    // 重置
    reset() {
        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
        (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.reset();
    }
}

