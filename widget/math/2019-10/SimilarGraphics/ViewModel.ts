import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    btntext = window.env.browserInfo.lang.btntext;
    buttonActived = 1;
    rotateNumber = 30;
    sizeNumber = 0.5;
    verificationActived = false;

    sliderOption1 = {
        width: '100%',
        height: 6,
        min: 0,
        max: 360,
        piecewise: false,
        tooltip: 'none',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
        interval: 1,
        dotStyle: {
            'backgroundColor': '#ffffff',
            'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
            'visibility': 'visible',
            'width': '24px',
            'height': '24px'
        },
        railStyle: {
            'background-color': '#F0F0F0',
        },
        processStyle: {

            'backgroundColor': '#F0F0F0',
        },
        bgStyle: {
            'backgroundColor': '#F0F0F0',
        },
    };

    sliderOption2 = {
        width: '100%',
        height: 6,
        min: 0.2,
        max: 3,
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
        railStyle: {
            'background-color': '#F0F0F0',
        },
        processStyle: {
            'backgroundColor': '#F0F0F0',
        },
        bgStyle: {
            'backgroundColor': '#F0F0F0',
        },
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

    switchGraphic(i: number) {
        this.verificationActived = false;
        this.buttonActived = i;
        if (this.assemble) { this.assemble.switchGraphic(i); }
    }

    verificationEvent() {
        this.verificationActived = !this.verificationActived;
        if (this.assemble) { this.assemble.verificationEvent(this.verificationActived); }
    }

    formatterRotation(e: string) {
        this.verificationActived = false;
        if (this.assemble) { this.assemble.formatterRotation(Number(e)); }
    }

    formatterSize(e: string) {
        this.verificationActived = false;
        if (this.assemble) { this.assemble.formatterSize(Number(e)); }
    }

    resetEvent() {
        this.buttonActived = 1;
        this.verificationActived = false;
    }
}

