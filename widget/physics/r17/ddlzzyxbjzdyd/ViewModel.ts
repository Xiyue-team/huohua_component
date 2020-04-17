import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ElectronViewHandler} from './services/ElectronViewHandler';
import { Watch } from 'vue-property-decorator';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';

@Component
export class ViewModel extends Vue {

    sliderNum = 0;
    sliderOption = {
      value: 0,
      width: 198,
      height: 8,
      dotSize: 24,
      min: 0,
      max: 8,
      interval: 4,
      disabled: true,
      show: true,
      speed: 0.3,
      lazy: true,
      tooltip: 'null',
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
        if (BrowserUtil.getBrowserInfo().os === 'Windows') {
            document.getElementById('fontV').style.left = '38%';
            document.getElementById('fontV').style.bottom = '5.2%';
            document.getElementById('slider').style.left = '42%';
            document.getElementById('slider').style.bottom = '5.2%';
            document.getElementById('font').style.left = '68.4%';
            document.getElementById('font').style.bottom = '6.8%';
        }
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    @Watch('sliderNum')
    getSliderNum(value: number) {
        (ViewController.getInstance().viewHandler as ElectronViewHandler).changeAnimation(value);
    }

}

