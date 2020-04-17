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
    panRotateDisabled = false;
    selectActived = -1;
    foldActived = false;
    foldActived2 = false;
    sliderNumber = 0;
    edgeActived = false;
    angleActived = false;

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

    selectEvent(index: number) {
        this.foldActived = false;
        if (!this.panRotateDisabled && index !== this.selectActived) {
            this.selectActived = index;
            if (this.assemble) { this.assemble.selectEvent(this.selectActived); }
        }
    }
    foldEvent() {
        this.foldActived = true;
        this.foldActived2 = !this.foldActived2;
        this.selectActived = -1;
        if (this.assemble) { this.assemble.foldEvent(this.foldActived2); }
    }
    edgeEvent() {
        this.edgeActived = !this.edgeActived;
        if (this.assemble) { this.assemble.edgeEvent(this.edgeActived); }
    }

    angleEvent() {
        this.angleActived = !this.angleActived;
        if (this.assemble) { this.assemble.angleEvent(); }
    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }

    resetEvent() {
        this.selectActived = -1;
        this.panRotateDisabled = false;
        this.foldActived2 = this.foldActived = false;
        this.sliderNumber = 0;
        this.edgeActived = false;
        this.angleActived = false;
    }
}

