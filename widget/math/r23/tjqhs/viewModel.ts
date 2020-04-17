import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';
import * as func1 from './sub_static/func1.png';
import * as wfunc1 from './sub_static/wfunc1.png';
import * as func2 from './sub_static/func2.png';
import * as wfunc2 from './sub_static/wfunc2.png';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  buttonTitle = '对称';
  definition = '定义';
  symmetry = false;
  delimit = false;
  isMobile: boolean;

  selectValue = 1;
  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
    this.isMobile = (window as any)['env'].browserInfo.isSmallDevice;
    console.log(this.isMobile);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();

  }

  buttonEvent() {
    this.symmetry = !this.symmetry;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowDashFunctionLine(this.symmetry);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.play(this.symmetry);
  }

  isShowDefinition() {
    this.delimit = !this.delimit;
  }

  selectIsShow() {
    const selectDom = document.getElementsByClassName('select_math_div')[0];
    const optionDom = document.getElementsByClassName('option_math_div')[0];
    (selectDom as any).style.display = 'none';
    (optionDom as any).style.display = 'block';
  }

  selectOption1() {
    const selectDom = document.getElementsByClassName('select_math_div')[0];
    const optionDom = document.getElementsByClassName('option_math_div')[0];
    const imgDom = document.getElementsByClassName('option_one_img')[0];
    const imgDom1 = document.getElementsByClassName('option_two_img')[0];
    const selectImage = document.getElementsByClassName('select_one_img')[0];
    const optionDiv1 = document.getElementsByClassName('optionDiv1')[0];
    const optionDiv2 = document.getElementsByClassName('optionDiv2')[0];
    (selectImage as any).style.marginTop = '12px';
    (selectDom as any).style.display = 'block';
    (optionDom as any).style.display = 'none';
    imgDom.setAttribute('src', (wfunc1 as any));
    imgDom1.setAttribute('src', (func2 as any));
    selectImage.setAttribute('src', (func1 as any));
    (optionDiv1 as any).style.background = '#00AAFF';
    (optionDiv2 as any).style.background = '#EBEBEB';
    this.selectValue = 1;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetTextPosition();
  }

  selectOption2() {
    const selectDom = document.getElementsByClassName('select_math_div')[0];
    const optionDom = document.getElementsByClassName('option_math_div')[0];
    const imgDom = document.getElementsByClassName('option_one_img')[0];
    const imgDom1 = document.getElementsByClassName('option_two_img')[0];
    const selectImage = document.getElementsByClassName('select_one_img')[0];
    const optionDiv1 = document.getElementsByClassName('optionDiv1')[0];
    const optionDiv2 = document.getElementsByClassName('optionDiv2')[0];
    (selectDom as any).style.display = 'block';
    (optionDom as any).style.display = 'none';
    imgDom.setAttribute('src', (func1 as any));
    imgDom1.setAttribute('src', (wfunc2 as any));
    (selectImage as any).style.marginTop = '7px';
    selectImage.setAttribute('src', (func2 as any));
    (optionDiv1 as any).style.background = '#EBEBEB';
    (optionDiv2 as any).style.background = '#00AAFF';
    this.selectValue = 2;
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.resetTextPosition();
  }

  @Watch('selectValue')
  selectControl(value: number) {
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.setSelectValue(value);
    (ViewController.getInstance().viewHandler as ThreejsViewHandler).three3dModel.isShowLine(this.symmetry);

  }


}
