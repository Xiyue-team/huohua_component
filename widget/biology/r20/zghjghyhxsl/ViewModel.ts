import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZghjghyhxslViewHandler} from './services/ZghjghyhxslViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component
export class ViewModel extends Vue {
    buttonTitle1 = 'CO₂吸收量';
    buttonTitle2 = '净光合';
    isActive1 = true;
    isActive2 = false;
    isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    isElectron = BrowserUtil.getBrowserInfo().isElectron;
    sliderOption = {
        lazy: true,
        width: this.isMobile ? '208px' : '415px',
        height: 4,
        min: 0,
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
        },
    };
    slidernumber = 0;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new ZghjghyhxslViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    //co2吸收量
    button1() {
        this.isActive1 = true;
        this.isActive2 = false;
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.fromControl(true);
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.rectangle.position.set(10, 0, -0.05);
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.isShowDashLineAndText();
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.isShowFromText(this.slidernumber);
    }

    //净光合
    button2() {
        this.isActive1 = false;
        this.isActive2 = true;
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.fromControl(false);
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.setRectPosition();
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.isShowDashLineAndText();
        (ViewController.getInstance().viewHandler as ZghjghyhxslViewHandler).zghjghyhxsl.isShowFromText(this.slidernumber);
    }

    @Watch('slidernumber')
    animationControl(value: number) {
        (ViewController.getInstance().viewHandler as any).zghjghyhxsl.sunshineControl(value);
    }
}

