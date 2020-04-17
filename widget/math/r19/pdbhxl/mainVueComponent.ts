import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {PdbhxlViewHandler} from './services/PdbhxlViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as tipImg1 from './sub_static/UI/xielv1.png';
@Component

export class MainVueComponent extends Vue {
    active1 = false;
    active2 = false;
    tip = '';
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new PdbhxlViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        this.tip = tipImg1 as any;
    }
    changeEvent(val: any) {
        if (val === 0) {
            const thiz = this;
            thiz.active1 = !thiz.active1;
            thiz.active2 = false;
            if (thiz.active1) {
                (ViewController.getInstance().viewHandler as PdbhxlViewHandler).Model.poDuEvent();
            }
        }
        if (val === 1) {
            const thiz = this;
            thiz.active2 = !thiz.active2;
            thiz.active1 = false;
            if (thiz.active2) {
                (ViewController.getInstance().viewHandler as PdbhxlViewHandler).Model.slopeEvent();
            }
        }
    }
    // 重置
    reset() {
        this.active1 = false;
        this.active2 = false;
        (ViewController.getInstance().viewHandler as PdbhxlViewHandler).Model.reset();
    }
}

