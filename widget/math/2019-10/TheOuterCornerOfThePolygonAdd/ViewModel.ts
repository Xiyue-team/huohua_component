import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    lang=window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    sliderNumber = 3;
    sliderNumber2 = 5;

    sliderOption1 = {
        width: '100%',
        height: 6,
        min: 0,
        max: 10,
        piecewise: false,
        tooltip: 'always',
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

            'backgroundColor': '#17A3FF',
        },
        bgStyle: {
            'backgroundColor': '#F0F0F0',
        },
    };

    sliderOption2 = {
        width: '100%',
        height: 6,
        min: 3,
        max: 8,
        piecewise: false,
        tooltip: 'always',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
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
            'backgroundColor': '#17A3FF',
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
        if (window.screen.height < 449) {
            this.sliderOption1.dotSize = 18;
            this.sliderOption1.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '18px',
                'height': '18px'
            };
            this.sliderOption2.dotSize = 18;
            this.sliderOption2.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '18px',
                'height': '18px'
            };
        }
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    formatterR(e: string) {
        if (this.assemble) { this.assemble.formatterR(); }
    }
    formatterN(e: string) {
        if (this.assemble) { this.assemble.formatterN(); }
    }
    resetEvent() {
        this.sliderNumber = 3;
        this.sliderNumber2 = 5;
    }
}

