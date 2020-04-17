import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    text = this.lang.text;

    formulaActived = false;
    descriptionActived = false;
    inductionActived = 0;
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

    formulaEvent() {
        this.formulaActived = !this.formulaActived;
    }

    descriptionEvent() {
        this.descriptionActived = !this.descriptionActived;
        if (this.assemble) { this.assemble.descriptionEvent(this.descriptionActived); }
    }
    
    inductionEvent(index: number) {
        this.inductionActived = index;
        if (this.assemble) { this.assemble.inductionEvent(this.inductionActived); }
    }

    resetEvent() {
        this.formulaActived = false;
        this.descriptionActived = false;
        this.inductionActived = 0;
    }
}

