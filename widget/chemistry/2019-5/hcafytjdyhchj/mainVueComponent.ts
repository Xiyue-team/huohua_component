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
    //创建按钮是否激活的变量
    active1 = true;
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
    getEvent(index: number) {
        if (index === 1) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        }
    }
}

