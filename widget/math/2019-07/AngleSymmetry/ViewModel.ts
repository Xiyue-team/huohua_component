import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as afc from './sub_static/label/afc.png';
import * as afg from './sub_static/label/afg.png';

import * as pirac from './sub_static/label/pirac.png';
import * as pirag from './sub_static/label/pirag.png';

import * as piac from './sub_static/label/piac.png';
import * as piag from './sub_static/label/piag.png';

import * as pi2c from './sub_static/label/pi2c.png';
import * as pi2g from './sub_static/label/pi2g.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    buttonActived1 = false;
    buttonActived2 = false;
    buttonActived3 = false;
    buttonActived4 = false;
    Option1 = {
        buttonUnclickedImage: afc,
        buttonclickedImage: afg,
    };
    Option2 = {
        buttonUnclickedImage: pirac,
        buttonclickedImage: pirag,
    };
    Option3 = {
        buttonUnclickedImage: piac,
        buttonclickedImage: piag,
    };
    Option4 = {
        buttonUnclickedImage: pi2c,
        buttonclickedImage: pi2g,
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
    ButtonEvent1() {
        this.assemble.ButtonEvent(1);
    }
    ButtonEvent2() {
        this.assemble.ButtonEvent(2);
    }
    ButtonEvent3() {
        this.assemble.ButtonEvent(3);
    }
    ButtonEvent4() {
        this.assemble.ButtonEvent(4);
    }
    resetEvent() {

    }
}

