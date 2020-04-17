import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import tip from './sub_static/tip.png';

@Component
export class ViewModel extends Vue {
    pictip = tip;
    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.btntext;
    buttonActived = false;
    oldValue = 0;
    sliderNumber = 0;
    sliderOption = {
        width: '100%',
        height: 2,
        min: -3,
        max: 3,
        piecewise: false,
        tooltip: 'always',
        piecewiseLabel: false,
        speed: 0,
        piecewiseStyle: {
            'backgroundColor': '#ffffff',
            'visibility': 'visible',
            'width': '24px',
            'height': '24px'
        },
        piecewiseActiveStyle: {
            'backgroundColor': '#5D5D5D',
        },
        processStyle: {
            'backgroundColor': '#5D5D5D',
        },
        bgStyle: {
            'backgroundColor': '#5D5D5D',
        }
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

    formatter(e: string) {
        if (this.assemble) {
            if (this.oldValue !== Number(e)) {
                this.oldValue = Number(e);
                this.assemble.formatter(Number(e));
            }
        }
    }

    ButtonEvent() {
        this.buttonActived = !this.buttonActived;
    }
    resetEvent() {
        this.oldValue = 0;
        this.sliderNumber = 0;
    }
}
