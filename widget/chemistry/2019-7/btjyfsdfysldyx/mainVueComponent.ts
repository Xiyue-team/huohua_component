import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    text = window.env.browserInfo.lang.text;
    active1 = false;
    active2 = false;
    active = true;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }
    //按钮事件
    getEvent(index: number) {
        if (index === 1) {
            if (this.active1 === true) {
                return;
            }
            this.active1 = true;
            this.active2 = false;
            this.active = true;
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(1);
        } else if (index === 2) {
            if (this.active2 === true) {
                return;
            }
            this.active1 = false;
            this.active2 = true;
            this.active = false;
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.constituteMoleculeEvt(2);
        }
    }
    // 重置
    reset() {
        this.active1 = false;
        this.active2 = false;
        this.active = true;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.reset();
    }
}

