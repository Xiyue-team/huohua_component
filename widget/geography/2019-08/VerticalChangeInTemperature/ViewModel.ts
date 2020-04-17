import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as pic1 from './sub_static/image/pic1.png';
import * as pic2 from './sub_static/image/pic2.png';
import * as pic3 from './sub_static/image/pic3.png';
import * as pic4 from './sub_static/image/pic4.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    text = this.lang.text;
    msgList = [{ bg: pic1, text: this.text[0] }, { bg: pic2, text: this.text[1] },
    { bg: pic3, text: this.text[2] }, { bg: pic4, text: this.text[3] }];
    assemble: any;
    value = 8;
    sliderOption = {
        width: '4px',
        height: '100%',
        min: 8,
        max: 60,
        piecewise: false,
        direction: 'btt',
        tooltip: 'none',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
        marks: {
            '10': ' 1km',
            '20': ' 2km',
            '30': ' 3km',
            '40': ' 4km',
            '50': ' 5km',
            '60': ' 6km'
        },
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
            'box-shadow': '0 0 0 3px #ccc',
            'background-color': '#fff',
        },
        stepActiveStyle: {
            'box-shadow': '0 0 0 3px #3498db',
            'background-color': '#3498db',
        },
        processStyle: {
            'backgroundColor': '#0091FF',
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
        this.resize();
    }
    resize() {
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.sliderOption.dotSize = 18;
            this.sliderOption.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '18px',
                'height': '18px'
            };
        } else {
            this.sliderOption.dotSize = 24;
            this.sliderOption.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '24px',
                'height': '24px'
            };
        }
    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }

    resetEvent() {
        this.value = 8;
    }
}

