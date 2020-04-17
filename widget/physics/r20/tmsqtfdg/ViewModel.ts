import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TmsViewHandler} from './services/TmsViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {

    accelerateTitle = '加速电场';
    accelerateColor = false;
    sliderNumber = 0;
    sliderOption = {
      lazy: false,
      width: '200px',
      height: 3,
      min: -20,
      max: 20,
      interval: 2,
      piecewise: false,
      reverse: false,
      tooltip: 'always',
      show: true,
      processStyle: {
        'backgroundColor': '#fff'
      },
    };

    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = true;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new TmsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    //加速电场
    accelerateElectricField() {
      if (!this.accelerateColor) {
        this.accelerateColor = true;
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.showOrHideLeftLightLine(true);
      } else {
        this.accelerateColor = false;
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.showOrHideLeftLightLine(false);
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.hideBottomLine();
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.hideTopLine();
      }
    }

    @Watch('sliderNumber')
    getSliderNumber(value: number) {
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.getSliderNumber(value);
        (ViewController.getInstance().viewHandler as TmsViewHandler).tmsqtfdg.changeLineBySliderNumber(value);
    }
}

