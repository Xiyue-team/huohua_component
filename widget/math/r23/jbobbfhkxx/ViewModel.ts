import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import { Watch } from 'vue-property-decorator';
import sin1 from './sub_static/1/sin.png';
import cos1 from './sub_static/1/cos.png';
import tan1 from './sub_static/1/tan.png';

import sin2 from './sub_static/2/sin.png';
import cos2 from './sub_static/2/cos.png';
import tan2 from './sub_static/2/tan.png';

import sin3 from './sub_static/3/sin.png';
import cos3 from './sub_static/3/cos.png';
import tan3 from './sub_static/3/tan.png';

import sin4 from './sub_static/4/sin.png';
import cos4 from './sub_static/4/cos.png';
import tan4 from './sub_static/4/tan.png';

import sin5 from './sub_static/5/sin.png';
import cos5 from './sub_static/5/cos.png';

import sin6 from './sub_static/6/sin.png';
import cos6 from './sub_static/6/cos.png';

@Component
export class ViewModel extends Vue {
  isPhone = false;

  title: string;

  // 公式1按钮
  switch3Option1 = {
    maxW: '62',
    datas: ['1', '2', '3'],
    images: [ { src: sin1}, { src: cos1}, { src: tan1}]
  };
  switch3Model1 = '1';

  // 公式2按钮
  switch3Option2 = {
    maxW: '62',
    datas: ['1', '2', '3'],
    images: [ { src: sin2}, { src: cos2}, { src: tan2}]
  };
  switch3Model2 = '1';

  // 公式3按钮
  switch3Option3 = {
    maxW: '62',
    datas: ['1', '2', '3'],
    images: [ { src: sin3}, { src: cos3}, { src: tan3}]
  };
  switch3Model3 = '1';

  // 公式4按钮
  switch3Option4 = {
    maxW: '62',
    datas: ['1', '2', '3'],
    images: [ { src: sin4}, { src: cos4}, { src: tan4}]
  };
  switch3Model4 = '1';

  // 公式5按钮
  switch3Option5 = {
    maxW: '62',
    datas: ['1', '2'],
    images: [ { src: sin5}, { src: cos5}]
  };
  switch3Model5 = '1';

  // 公式6按钮
  switch3Option6 = {
    maxW: '62',
    datas: ['1', '2'],
    images: [ { src: sin6}, { src: cos6}]
  };
  switch3Model6 = '1';

  // 下拉框按钮
  switch4Option = {
    datas: ['诱导公式一', '诱导公式二', '诱导公式三', '诱导公式四', '诱导公式五', '诱导公式六'],
    isShowOption: false
  };
  switch4Model = '诱导公式一';

  // 显示隐藏 滑动按钮
  isShowSwitch3Model1 = true;
  isShowSwitch3Model2 = true;
  isShowSwitch3Model3 = true;
  isShowSwitch3Model4 = true;
  isShowSwitch3Model5 = true;
  isShowSwitch3Model6 = true;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.switch3Option1.maxW = '40';
      this.switch3Option2.maxW = '40';
      this.switch3Option3.maxW = '40';
      this.switch3Option4.maxW = '40';
      this.switch3Option5.maxW = '40';
      this.switch3Option6.maxW = '40';
    }

    setTimeout(() => {
      this.isShowSwitch3Model1 = (this.switch4Model === '诱导公式一');
      this.isShowSwitch3Model2 = (this.switch4Model === '诱导公式二');
      this.isShowSwitch3Model3 = (this.switch4Model === '诱导公式三');
      this.isShowSwitch3Model4 = (this.switch4Model === '诱导公式四');
      this.isShowSwitch3Model5 = (this.switch4Model === '诱导公式五');
      this.isShowSwitch3Model6 = (this.switch4Model === '诱导公式六');
    }, 1000);
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  async resetEvent() {
    this.switch4Model = '诱导公式一';
    this.switch3Model1 = '1';
    this.switch3Model2 = '1';
    this.switch3Model3 = '1';
    this.switch3Model4 = '1';
    this.switch3Model5 = '1';
    this.switch3Model6 = '1';
    this.switch4Option.isShowOption = false;

    (this.$refs.switch4 as any).resetSwitch4();

    await (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.reset();
    await (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.reset();
    await (ViewController.getInstance().viewHandler as any).formulaFourCanvas.reset();
    await (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.reset();
    await (ViewController.getInstance().viewHandler as any).formulaSixCanvas.reset();
    await (ViewController.getInstance().viewHandler as any).formulaOneCanvas.reset();

    await (ViewController.getInstance().viewHandler as any).formulaOneCanvas.hide();
    await (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.hide();
    await (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.hide();
    await (ViewController.getInstance().viewHandler as any).formulaFourCanvas.hide();
    await (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.hide();
    await (ViewController.getInstance().viewHandler as any).formulaSixCanvas.hide();

    (ViewController.getInstance().viewHandler as any).formulaOneCanvas.show();
    (ViewController.getInstance().viewHandler as any).formulaOneCanvas.showLine(this.switch3Model1);
  }

  @Watch('switch4Model')
  getswitch4Model() {
    (ViewController.getInstance().viewHandler as any).formulaOneCanvas.hide();
    (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.hide();
    (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.hide();
    (ViewController.getInstance().viewHandler as any).formulaFourCanvas.hide();
    (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.hide();
    (ViewController.getInstance().viewHandler as any).formulaSixCanvas.hide();

    switch (this.switch4Model) {
      case '诱导公式一' :
        (ViewController.getInstance().viewHandler as any).formulaOneCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaOneCanvas.showLine(this.switch3Model1);
        break;
      case '诱导公式二' :
        (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.showLine(this.switch3Model2);
        break;
      case '诱导公式三' :
        (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.showLine(this.switch3Model3);
        break;
      case '诱导公式四' :
        (ViewController.getInstance().viewHandler as any).formulaFourCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaFourCanvas.showLine(this.switch3Model4);
        break;
      case '诱导公式五' :
        (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.showLine(this.switch3Model5);
        break;
      case '诱导公式六' :
        (ViewController.getInstance().viewHandler as any).formulaSixCanvas.show();
        (ViewController.getInstance().viewHandler as any).formulaSixCanvas.showLine(this.switch3Model6);
        break;
      default :
        break;
    }

    this.isShowSwitch3Model1 = (this.switch4Model === '诱导公式一');
    this.isShowSwitch3Model2 = (this.switch4Model === '诱导公式二');
    this.isShowSwitch3Model3 = (this.switch4Model === '诱导公式三');
    this.isShowSwitch3Model4 = (this.switch4Model === '诱导公式四');
    this.isShowSwitch3Model5 = (this.switch4Model === '诱导公式五');
    this.isShowSwitch3Model6 = (this.switch4Model === '诱导公式六');
  }

  @Watch('switch3Model1')
  getswitch2Model1() {
    (ViewController.getInstance().viewHandler as any).formulaOneCanvas.showLine(this.switch3Model1);
  }

  @Watch('switch3Model2')
  getswitch2Model2() {
    (ViewController.getInstance().viewHandler as any).formulaTwoCanvas.showLine(this.switch3Model2);
  }

  @Watch('switch3Model3')
  getswitch2Model3() {
    (ViewController.getInstance().viewHandler as any).formulaThreeCanvas.showLine(this.switch3Model3);
  }

  @Watch('switch3Model4')
  getswitch2Model4() {
    (ViewController.getInstance().viewHandler as any).formulaFourCanvas.showLine(this.switch3Model4);
  }

  @Watch('switch3Model5')
  getswitch2Model5() {
    (ViewController.getInstance().viewHandler as any).formulaFiveCanvas.showLine(this.switch3Model5);
  }

  @Watch('switch3Model6')
  getswitch2Model6() {
    (ViewController.getInstance().viewHandler as any).formulaSixCanvas.showLine(this.switch3Model6);
  }
}
