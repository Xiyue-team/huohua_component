import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as pic from './sub_static/image/pic.json';
import * as formula1 from './sub_static/image/formula1.png';
import * as formula2 from './sub_static/image/formula2.png';
import * as formula3 from './sub_static/image/formula3.png';

@Component
export class ViewModel extends Vue {
    picFormula1 = formula1;
    picFormula2 = formula2;
    picFormula3 = formula3;
    picList = [
        { analysis: pic.analysis1, formula: pic.formula1 },
        { analysis: pic.analysis2, formula: pic.formula2 },
        { analysis: pic.analysis3, formula: pic.formula3 }
    ];

    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.btntext1;
    buttonActived = false;
    buttonEllipseTitle = window.env.browserInfo.lang.btntext2;
    buttonHyperbolaTitle = window.env.browserInfo.lang.btntext3;
    buttonParabolaTitle = window.env.browserInfo.lang.btntext4;
    buttonFormulaActived = 0;
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

    ButtonEvent() {
        this.buttonActived = !this.buttonActived;
    }

    ButtonEventFormula(index: number) {
        this.buttonFormulaActived = index;
        this.assemble.ButtonEventFormula(index);
    }

    resetEvent() {
        this.buttonFormulaActived = 0;
    }
}

