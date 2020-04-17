import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    text = this.lang.text;
    assemble: any;

    sectionActived = false;
    perpendicularActived = false;
    connectActived = false;

    perpendicularDisabled = true;
    connectDisabled = true;
    gray = false;
    msg = this.lang.msg;
    msgShow = false;

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

    section() {
        if (!this.sectionActived) {
            this.sectionActived = true;
            if (this.assemble) { this.assemble.section(); }
        }
    }

    perpendicular() {
        if (!this.perpendicularActived && !this.perpendicularDisabled) {
            this.perpendicularActived = true;
            if (this.assemble) { this.assemble.perpendicular(); }
        }
    }

    connect() {
        if (!this.connectDisabled && !this.connectActived) {
            this.connectActived = true;
            if (this.assemble) { this.assemble.connect(); }
        }
    }

    resetEvent() {
        this.sectionActived = false;
        this.perpendicularActived = false;
        this.connectActived = false;
        this.perpendicularDisabled = true;
        this.connectDisabled = true;
        this.msgShow = false;
    }
}

