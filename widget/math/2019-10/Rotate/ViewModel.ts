import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as checkImg from './sub_static/checkImg.png';
import * as ucheckImg from './sub_static/ucheckImg.png';

@Component
export class ViewModel extends Vue {
    title_text = window.env.browserInfo.lang.title;
    btntext = window.env.browserInfo.lang.btntext;
    buttonActived = 1;
    sliderNumber = 0;

    point = false;
    angle = false;
    Option1 = {
        checkImg: checkImg,
        uncheckImg: ucheckImg,
    };

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
        if (window.screen.height < 449) {
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

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    ButtonEvent(i: number) {
        if (this.buttonActived !== i) {
            if (this.assemble) { this.assemble.selectGraphic(i); }
        }
    }

    angleEvent() {
        this.angle = !this.angle;
        if (this.assemble) { this.assemble.angleEvent(); }
    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }
    pointEvent() {
        this.point = !this.point;
        if (this.assemble) { this.assemble.pointEvent(); }
    }
    resetEvent() {
        this.buttonActived = 1;
    }
}

