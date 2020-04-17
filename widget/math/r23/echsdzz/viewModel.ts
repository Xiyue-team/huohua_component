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
  sliderNum1 = 3;
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
  sliderNum2 = 2.5;
  sliderOption2 = {
    lazy: false,
    width: '130px',
    height: 2,
    min: -4,
    max: 4,
    interval: 0.1,
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
    const scale = window.innerWidth / 1024;
    const rightLayout1 = (document.querySelector('.rightLayout1') as any);
    const rightLayout2 = (document.querySelector('.rightLayout2') as any);
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption1.width = 180 * scale + 'px';
      this.sliderOption1.dotSize = [24 * scale , 24 * scale];
      this.sliderOption2.width = 130 * scale + 'px';
      this.sliderOption2.dotSize = [24 * scale , 24 * scale];
      rightLayout1.style.width = 220 * scale + 'px';
      rightLayout1.style.height = 150 *  scale  + 'px';
      rightLayout1.style.top = '55px';
      rightLayout1.children[1].style.top = '20px';
      rightLayout1.style.fontSize = 24 * scale + 'px';
      rightLayout2.style.width = 220 * scale + 'px';
      rightLayout2.style.height = 110 * scale + 'px';
      rightLayout2.style.top = '55px';
      rightLayout2.style.fontSize = 24 * scale + 'px';
      (document.querySelector('.sliderTextB') as any).style.lineHeight = 24 * scale + 'px';
      (document.querySelector('.button1') as any).style.bottom = '60px';
      (document.querySelector('.button2') as any).style.bottom = '12px';
    }

  }

  //定轴动区间
  buttonEvent1() {
    if (this.symmetry) {
      return;
    }
    this.symmetry = true;
    this.delimit  = false;
    this.isStatic = true;
    this.isDynamic = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changeButtonFunction(true);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetButtonFunction1();
    this.sliderNum1 = 3;

  }

  //动轴定区间
  buttonEvent2() {
    if (this.delimit) {
      return;
    }
    this.delimit = true;
    this.symmetry  = false;
    this.isDynamic = true;
    this.isStatic = false;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changeButtonFunction(false);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetButtonFunction2();
    this.sliderNum2 = 2.5;

  }

  @Watch('sliderNum1')
  selectControl1(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changePointPosition(value);
  }

  @Watch('sliderNum2')
  selectControl2(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changAxisLinePosition(value);
  }

  resetEvent() {
    this.sliderNum2 = 2.5;
    this.sliderNum1 = 3;
    this.symmetry = true;
    this.delimit  = false;
    this.isStatic = true;
    this.isDynamic = false;
    //因为修改滑条值会触发滑条的watch事件
    setTimeout(() => {
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.changeButtonFunction(true);
      (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetButtonFunction1();
    }, 50);



  }


}
