import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import {ElectronViewHandler} from './services/ElectronViewHandler';

@Component
export class ViewModel extends Vue {

    speedModel = 1;
    reset = false;
    disableSlider = true;
    showImg = true;

    sliderOption = {
        lazy: true,
        width: '100%',
        height: 4,
        min: 1,
        max: 5,
        dotSize: 12,
        piecewise: true,
        piecewiseStyle: {
            'backgroundColor': '#fff',
            'visibility': 'visible',
            'border' : '2px solid #D8D8D8',
            'width': '4px',
            'height': '4px'
        },
        piecewiseActiveStyle: {
            'backgroundColor': '#3498db',
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


    created() {

        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;

        ViewController.getInstance(new ElectronViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        ViewController.getInstance().hideLoading(1500);
    }

    @Watch('speedModel')
    getSpeedModel(val: any) {
        if ( this.reset === true && val === 1) {
            return val;
        }
        //this.setTransparent();
        switch (val) {
            case 1:
                this.changeSliderColor('#3498db');
                (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack1.play();
                break;
            case 2:
                this.reset = false;
                this.changeSliderColor('#FF4747');
                (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack2.play();
                break;
            case 3:
                this.reset = false;
                this.changeSliderColor('#3498db');
                (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack3.play();
                break;
            case 4:
                this.reset = false;
                this.changeSliderColor('#FF4747');
                (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack4.play();
                break;
            case 5:
                this.reset = false;
                this.changeSliderColor('#3498db');
                (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack5.play();
                break;
        }

        this.setTransparent();
    }

    changeSliderColor(color: string) {
        this.sliderOption.piecewiseActiveStyle.backgroundColor =  color;
        this.sliderOption.piecewiseActiveStyle.borderColor =  color;
        this.sliderOption.processStyle.backgroundColor =  color;
    }


    playTracker1() {
        this.showImg = false;
        this.reset = false;
        //this.disableSlider = false;
        this.changeSliderColor('#3498db');
        console.log((ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack1);
        this.restore();
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack1.play();
    }

    setTransparent() {
        for ( let i = 1 ; i <= 5; i++) {
            const key = 'elcTrack' + i;
            if (this.speedModel === i) {
                (ViewController.getInstance().viewHandler as any)[key].transparent(1);
            } else {
                (ViewController.getInstance().viewHandler as any)[key].transparent(0.3);
            }

        }
        /*(ViewController.getInstance().viewHandler as ElectronViewHandler)['elcTrack1'].transparent(0.3);
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack2.transparent();
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack3.transparent();
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack4.transparent();
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack5.transparent();*/
    }

    restore() {
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack1.transparent(1);
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack2.transparent(1);
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack3.transparent(1);
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack4.transparent(1);
        (ViewController.getInstance().viewHandler as ElectronViewHandler).elcTrack5.transparent(1);
    }




}

