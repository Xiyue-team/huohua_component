import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {KnfyybknfyViewHandler} from './services/KnfyybknfyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component

export class MainVueComponent extends Vue {
    active1 = false;
    active2 = false;
    active3 = false;

    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new KnfyybknfyViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {

        ViewController.getInstance().domReady();
    }
    // 点击事件
    changeEvent(val: any) {
        if (val === 0) {
            if (this.active1) {
                return;
            }
            this.active1 = !this.active1;
            this.active2 = false;
            (ViewController.getInstance().viewHandler as KnfyybknfyViewHandler).Model.reversibleEvent();
        } else if (val === 1) {
            if (this.active2) {
                return;
            }
            this.active2 = !this.active2;
            this.active1 = false;
            (ViewController.getInstance().viewHandler as KnfyybknfyViewHandler).Model.irreversibleEvent();
        } else if (val === 2) {
            this.active3 = !this.active3;
            if (this.active3) {
                (ViewController.getInstance().viewHandler as KnfyybknfyViewHandler).Model.tipButtonEvent(0);
            } else if (!this.active3) {
                (ViewController.getInstance().viewHandler as KnfyybknfyViewHandler).Model.tipButtonEvent(1);
            }
        }
    }

    // 重置
    reset() {
        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
        (ViewController.getInstance().viewHandler as KnfyybknfyViewHandler).Model.reset();
    }
}

