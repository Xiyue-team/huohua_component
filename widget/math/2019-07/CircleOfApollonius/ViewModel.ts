import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import tip from './sub_static/tip.png';
import msg from './sub_static/msg.png';
import * as labelimg from './sub_static/label.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    pictip = tip;
    picmsg = msg;
    picLabel = labelimg;
    numtext = '';
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    buttonActived1 = false;
    buttonActived2 = false;
    buttonActived3 = false;
    look = false;
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
        this.buttonActived1 = !this.buttonActived1;
    }

    ButtonEvent2() {
        this.assemble.ButtonEvent2(true);
    }

    ButtonEvent3() {
        this.buttonActived3 = !this.buttonActived3;
    }

    ButtonLook() {
        this.look = !this.look;
        this.assemble.ButtonLook();
    }

    resetEvent() {
        this.buttonActived1 =
            this.buttonActived2 =
            this.buttonActived3 = false;
    }
}

