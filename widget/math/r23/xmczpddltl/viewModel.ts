import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {

  slidernumber1 = 20;
  actived = false;
  inference = '推论';
  sliderOption = {
    width: '100%',
    height: '2px',
    min: 0,
    max: 90,
    dotSize: 24,
    piecewise: false,
    tooltip: 'always',
    piecewiseLabel: false,
    process: false,
    railStyle: {
      'backgroundColor': 'rgba(26,26,26,0.5)',
    },

  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  @Watch('slidernumber1')
  sliderControl1(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.rotateMesh1(value);
  }

  activedEvent() {
    this.actived = !this.actived;
  }

  resetEvent() {

  }

}
