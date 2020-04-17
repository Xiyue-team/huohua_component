import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as btn1 from './sub_static/label/btn1.png';
import * as btnActive1 from './sub_static/label/btnActive1.png';

import * as btn2 from './sub_static/label/btn2.png';
import * as btnActive2 from './sub_static/label/btnActive2.png';

import * as fun1 from './sub_static/fun1.png';
import * as fun2 from './sub_static/fun2.png';

@Component
export class ViewModel extends Vue {
    picmsg = fun1;
    pictip = fun2;
    title_text = window.env.browserInfo.lang.title;
    buttonActived = 0;
    
    Option1 = {
        buttonUnclickedImage: btnActive1,
        buttonclickedImage: btn1,
    };

    Option2 = {
        buttonUnclickedImage: btnActive2,
        buttonclickedImage: btn2,
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
        if (this.buttonActived !== index) {
            this.buttonActived = index;
            this.assemble.ButtonEvent(index);
        }
    }

    resetEvent() {
        this.buttonActived = 0;
    }
}

