import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as btn1 from './sub_static/label/btn1.png';
import * as btnActive1 from './sub_static/label/btnActive1.png';

import * as btn2 from './sub_static/label/btn2.png';
import * as btnActive2 from './sub_static/label/btnActive2.png';

import * as btn3 from './sub_static/label/btn3.png';
import * as btnActive3 from './sub_static/label/btnActive3.png';

import * as btn4 from './sub_static/label/btn4.png';
import * as btnActive4 from './sub_static/label/btnActive4.png';

import * as z1 from './sub_static/formula/z1.png';
import * as z2 from './sub_static/formula/z2.png';

import * as formula3 from './sub_static/formula/formula3.png';
import * as formula4 from './sub_static/formula/formula4.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    buttonActived = 0;
    picformula1 = z1;
    picformula2 = z2;
    formula1 = '';
    formula2 = '';
    msg1 = window.env.browserInfo.lang.btntext[0];
    msg2 = window.env.browserInfo.lang.btntext[1];
    picmsg3 = formula3;
    picmsg4 = formula4;
    Option1 = {
        buttonUnclickedImage: btnActive1,
        buttonclickedImage: btn1,
    };
    Option2 = {
        buttonUnclickedImage: btnActive2,
        buttonclickedImage: btn2,
    };
    Option3 = {
        buttonUnclickedImage: btnActive3,
        buttonclickedImage: btn3,
    };
    Option4 = {
        buttonUnclickedImage: btnActive4,
        buttonclickedImage: btn4,
    };

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

    ButtonEvent(index: number) {
        this.buttonActived = index;
        this.assemble.ButtonEvent(index);
    }

    resetEvent() {
        this.buttonActived = 0;
    }
}

