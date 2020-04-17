import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as tip from './sub_static/tip.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle = this.lang.btntext;
    splite = this.lang.splite;
    buttonActived = false;
    assemble: any;
    pictip = tip;
    slidervalue1 = 0;
    slidervalue2 = 0;
    slidervalue3 = 0;

    sliderOption = {
        width: '100%',
        height: 2,
        min: 0,
        max: 150,
        piecewise: false,
        tooltip: 'none',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
        interval: 0.1,
        dotStyle: {
            'backgroundColor': '#ffffff',
            'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
            'visibility': 'visible',
            'width': '24px',
            'height': '24px'
        },
        stepStyle: {
            'width': '100%',
            'height': '100%',
            'border-radius': '50%',
            'box-shadow': '0 0 0 3px #5D5D5D',
            'background-color': '#5D5D5D',
        },
        railStyle: {
            'background-color': '#5D5D5D',
        },
        stepActiveStyle: {
            'box-shadow': '0 0 0 3px #3498db',
            'backgroundColor': '#5D5D5D',
        },
        processStyle: {

            'backgroundColor': '#5D5D5D',
        },
        bgStyle: {
            'backgroundColor': '#5D5D5D',
        },
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
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.sliderOption.dotSize = 18;
            this.sliderOption.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '18px',
                'height': '18px'
            };
        }
    }

    formatter1(e: string) {
        if (this.assemble) { this.assemble.formatter(1, Number(e) / 10); }
    }

    formatter2(e: string) {
        if (this.assemble) { this.assemble.formatter(2, Number(e) / 10); }
    }

    formatter3(e: string) {
        if (this.assemble) { this.assemble.formatter(3, Number(e) / 10); }
    }

    check() {
        this.buttonActived = !this.buttonActived;
        if (this.assemble) { this.assemble.updateItemValue(this.buttonActived); }
    }

    resetEvent() {
        this.buttonActived = false;
        this.slidervalue1 = 0;
        this.slidervalue2 = 0;
        this.slidervalue3 = 0;
    }
}
