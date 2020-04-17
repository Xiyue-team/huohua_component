import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import tip from './sub_static/tip.png';
@Component
export class ViewModel extends Vue {
    assemble: any;
    pictip = tip;

    title_text = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.btntext;
    buttonActived = false;
    sliderNumber = 60;
    sliderNumber2 = 3;
    r = 0;
    sliderOption = {
        width: '100%',
        height: 2,
        min: 0,
        max: 360,
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
    sliderOption2 = {
        width: '100%',
        height: 2,
        min: 1,
        max: 50,
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
            'backgroundColor': '#5caefd',
        },
        processStyle: {
            'backgroundColor': '#5D5D5D',
        },
        bgStyle: {
            'backgroundColor': '#5D5D5D',
        }
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
    
    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }

    formatter2(e: string) {
        this.r = Number(e) / 10;
        if (this.assemble) { this.assemble.formatter2(Number(e) / 10); }
    }
    ButtonEvent() {
        this.buttonActived = !this.buttonActived;
        this.assemble.ButtonEvent();
    }
    resetEvent() {

    }
}

