import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import {ElectronViewHandler} from './services/ElectronViewHandler';

@Component
export class ViewModel extends Vue {

    ctrl = false;
    sliderOption = {
        lazy: true,
        width: '200px',
        height: 4,
        min: 1,
        max: 5,
        dotSize: 12,
        disabled: true,
        piecewise: true,
        piecewiseStyle: {
            'backgroundColor': '#fff',
            'visibility': 'visible',
            'border' : '2px solid #D8D8D8',
            'width': '4px',
            'height': '4px'
        },
        piecewiseActiveStyle: {
            'backgroundColor': '#00AAFF',
            'border' : '2px solid',
            'borderColor':  '#3498db'
        },
        reverse: false,
        tooltip: false,
        processStyle: {
            'backgroundColor': '#3498db'
        },
        bgStyle: {
            'backgroundColor': '#D8D8D8'
        }

    };
    slidernumber = 1;

    @Watch('slidernumber')
    controlSpeed(value: any) {
        if (this.ctrl && value === 1 ) {
            this.ctrl = false;
            return;
        }
        switch (value) {
            case 1:
                this.sliderOption.piecewiseActiveStyle = {'backgroundColor': '#00AAFF', 'border' : '2px solid', 'borderColor':  '#3498db'};
                this.sliderOption.processStyle = {'backgroundColor': '#00AAFF'};
                break;
            case 2:
                this.sliderOption.piecewiseActiveStyle = {'backgroundColor': '#FF4747', 'border' : '2px solid', 'borderColor':  '#FF4747'};
                this.sliderOption.processStyle = {'backgroundColor': '#FF4747'};
                break;
            case 3:
                this.sliderOption.piecewiseActiveStyle = {'backgroundColor': '#00AAFF', 'border' : '2px solid', 'borderColor':  '#3498db'};
                this.sliderOption.processStyle = {'backgroundColor': '#00AAFF'};
                break;
            case 4:
                this.sliderOption.piecewiseActiveStyle = {'backgroundColor': '#FF4747', 'border' : '2px solid', 'borderColor':  '#FF4747'};
                this.sliderOption.processStyle = {'backgroundColor': '#FF4747'};
                break;
            case 5:
                this.sliderOption.piecewiseActiveStyle = {'backgroundColor': '#00AAFF', 'border' : '2px solid', 'borderColor':  '#3498db'};
                this.sliderOption.processStyle = {'backgroundColor': '#00AAFF'};
                break;
        }

        this.sliderOption.disabled = true;
        (ViewController.getInstance().viewHandler as ElectronViewHandler).animationCtrl(value);

    }



    created() {

        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;

        ViewController.getInstance(new ElectronViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }



}

