import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    msg = this.lang.text;
    text = ['∠1+∠2=90°', ''];
    buttonActived = 1;
    sliderNumber = 50;

    sliderOption = {
        width: '100%',
        height: 6,
        min: 0,
        max: 360,
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
        this.resize();

    }
    resize(): void {
        if (window.screen.height < 499 || window.screen.width < 699) {
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
    ButtonEvent(i: number) {
        this.buttonActived = i;
        if (this.assemble) { this.assemble.ButtonEvent(i); }
    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatterRotation(Number(e)); }
    }

    setText(v: number) {
        if (v === 0) {
            this.text = [this.msg[0], ''];
        } else if (v === 1) {
            this.text = [this.msg[1], ''];
        } else if (v === 2) {
            this.text = [this.msg[2], ''];
        } else if (v === 3) {
            this.text = [this.msg[3], ''];
        } else if (v === 4) {
            this.text = [this.msg[4], this.msg[5]];
        }
    }

    resetEvent() {
        this.buttonActived = 1;
    }
}
