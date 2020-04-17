import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  staticAxisTitle   = '定轴动区间';
  dynamicAxisTitle  = '动轴定区间';
  symmetry = true;
  delimit = false;
  isStatic = true;
  isDynamic = false;

  // 定义滑条的样式
  sliderNumTop = 1;

  // 判断是否是手机
  isPhone = false;

  //滑动条样式设置
  sliderNum1 = 1;
  sliderOption1 = {
    lazy: false,
    width: '180px',
    height: 2,
    min: 0,
    max: 5,
    reverse: false,
    tooltip: 'always',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
  };
  sliderNum2 = 1;
  sliderOption2 = {
    lazy: false,
    width: '130px',
    height: 2,
    min: -5,
    max: 5,
    reverse: false,
    tooltip: 'always',
    piecewise: false,
    dotSize: [24, 24],
    process: false,
    railStyle: {
      backgroundColor: '#737373',
    }
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
    // if ((window as any)['env'].browserInfo.isSmallDevice) {
    //   this.isPhone = true;
    //   this.sliderOption1.width = '120px';
    //   (document.querySelector('.sliderStyle') as any).style.width = '150px';
    // }

  }

  //定轴动区间
  buttonEvent1() {
    this.symmetry = true;
    this.delimit  = false;
    this.isStatic = true;
    this.isDynamic = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setDragControlEnabled(true);
  }

  //动轴定区间
  buttonEvent2() {
    this.delimit = true;
    this.symmetry  = false;
    this.isDynamic = true;
    this.isStatic = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setDragControlEnabled(false);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setPointColor(false);
  }

  @Watch('sliderNum1')
  selectControl1(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changePointPosition(value);
  }

  @Watch('sliderNum2')
  selectControl2(value: number) {
    document.querySelector('.rightLayOutSpan').children[2].innerHTML = '= ' + value;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changAxisLinePosition(value);
  }


}
