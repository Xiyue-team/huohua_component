import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {AssembleViewHandler} from './services/AssembleViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import arrow from './sub_static/arrow.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    text = this.lang.text;
    msgShow = true;
    arrow = arrow;
    assemble: any;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    resetEvent() {

    }
}
