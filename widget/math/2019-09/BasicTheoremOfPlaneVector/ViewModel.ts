import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import tip from './sub_static/tip.png';

import * as a from './sub_static/btn/a.png';
import * as e1 from './sub_static/btn/e1.png';
import * as e1w from './sub_static/btn/e1w.png';
import * as e2 from './sub_static/btn/e2.png';
import * as e2w from './sub_static/btn/e2w.png';

import * as r1 from './sub_static/image/r1.png';
import * as r2 from './sub_static/image/r2.png';
import * as relation from './sub_static/image/relation.png';

@Component
export class ViewModel extends Vue {
    assemble: any;
    lang = window.env.browserInfo.lang;
    buttonImageActived2 = false;

    Option3 = {
        buttonUnclickedImage: `<img src="${a}"/> <p>${this.lang.btntext[1]}</p> <img src="${e1w}"/>
         <p>、</p><img src="${e2w}"/> <p>${this.lang.btntext[2]}</p>`,
        buttonclickedImage: `<img src="${a}"/> <p>${this.lang.btntext[1]}</p> <img src="${e1}"/>
        <p>、</p><img src="${e2}"/> <p>${this.lang.btntext[2]}</p>`,
    };

    pictip = tip;
    picr1 = r1;
    picr2 = r2;
    picrelation = relation;

    title_text = this.lang.title;
    buttonTitle = this.lang.btntext;
    UnKnowText = this.lang.unknow;
    r1text = '';
    r2text = '';

    buttonActived = false;

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

    buttonImageEvent2() {
        this.buttonImageActived2 = !this.buttonImageActived2;
        this.assemble.buttonImageEvent2();
    }

    ButtonEvent() {
        this.buttonActived = !this.buttonActived;
    }

    resetEvent() {
        this.buttonActived = false;
    }
}

