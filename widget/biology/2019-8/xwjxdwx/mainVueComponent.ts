import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { GdsfgsViewHandler } from './services/GdsfgsViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
    icon = 0;
    text = 0;
    title = window.env.browserInfo.lang.title;
    textall = window.env.browserInfo.lang.textall;
  
    
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
    getChange(offset: any) {
        this.icon = offset;
        (ViewController.getInstance().viewHandler as GdsfgsViewHandler).getChange1(offset);

    }
    // 重置
    reset() {
        this.icon = 0;
        (ViewController.getInstance().viewHandler as GdsfgsViewHandler).Model.reset();
    }
}

