import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as more from './sub_static/more.png';

import * as inner from './sub_static/inner.png';
import * as point from './sub_static/point.png';
import * as side from './sub_static/side.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    text = this.lang.text;
    msgShow = true;

    pic = more;
    picInduction = inner;

    buttonActived = 1;
    sideActived = 3;
    inductionActived = false;
    assemble: any;
    option = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];

    msg = {
        lineNumber: 3,
        triangularNumber: 3,
        angle: '3×180°−360°',
    };

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

    sideEvent(index: number) {
        this.msgShow = false;
        if (this.buttonActived !== 1 || index !== 3) {
            this.sideActived = index;
            if (this.assemble) { this.assemble.sideEvent(this.sideActived); }
        }
    }

    selectMode(index: number) {
        this.msgShow = false;
        this.buttonActived = index;
        this.picInduction = index === 1 ? point : index === 2 ? side : inner;
        if (this.assemble) { this.assemble.selectMode(this.buttonActived); }
    }

    inductionEvent() {
        this.inductionActived = !this.inductionActived;
        this.msgShow = false;
    }

    resetEvent() {
        this.sideActived = 3;
        this.buttonActived = 1;
        this.msgShow = true;
    }
}

