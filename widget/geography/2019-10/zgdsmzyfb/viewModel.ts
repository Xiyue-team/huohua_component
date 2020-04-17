import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import * as dx from './sub_static/dx.png';
import * as dx1 from './sub_static/dx1.png';
import * as nb from './sub_static/nb.png';
import * as nb1 from './sub_static/nb1.png';
import * as hxsm from './sub_static/hxsm.png';
import * as xb from './sub_static/xb.png';
import * as xb1 from './sub_static/xb1.png';
import * as db from './sub_static/db.png';
import * as db1 from './sub_static/db1.png';
@Component
export class ViewModel extends Vue {
  title = window.env.browserInfo.lang.title;
  lang = window.env.browserInfo.lang;
  buttonActived = [
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
  ];

  imageSrc = [dx, dx1, nb, nb1, hxsm, xb, xb1, db, db1];

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;

    ViewController.getInstance(new TemplateViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    for (let i = 0; i < this.buttonActived.length; i++) {
      this.buttonActived[i].active = false;
    }
  }

  //东西走向
  buttonEvent1() {
    this.buttonActived[0].active = !this.buttonActived[0].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('dx', this.buttonActived[0].active);
    if (this.buttonActived[0].active === false) {
      this.buttonActived[1].active = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('dx1', this.buttonActived[1].active);
    }
  }

  //东西走向地形
  buttonEvent2() {
    this.buttonActived[1].active = !this.buttonActived[1].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('dx1', this.buttonActived[1].active);
  }

  //南北走向
  buttonEvent3() {
    this.buttonActived[2].active = !this.buttonActived[2].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('nb', this.buttonActived[2].active);
    if (this.buttonActived[2].active === false) {
      this.buttonActived[3].active = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('nb1', this.buttonActived[3].active);
    }
  }

  //南北走向地形
  buttonEvent4() {
    this.buttonActived[3].active = !this.buttonActived[3].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('nb1', this.buttonActived[3].active);
  }

  //弧形山脉
  buttonEvent5() {
    this.buttonActived[4].active = !this.buttonActived[4].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('hxsm', this.buttonActived[4].active);
  }

  //西北-东南走向
  buttonEvent6() {
    this.buttonActived[5].active = !this.buttonActived[5].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('xb', this.buttonActived[5].active);
    if (this.buttonActived[5].active === false) {
      this.buttonActived[6].active = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('xb1', this.buttonActived[6].active);
    }
  }

  //西北-东南走向地形
  buttonEvent7() {
    this.buttonActived[6].active = !this.buttonActived[6].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('xb1', this.buttonActived[6].active);
  }

  //东北-西南走向
  buttonEvent8() {
    this.buttonActived[7].active = !this.buttonActived[7].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('db', this.buttonActived[7].active);
    if (this.buttonActived[7].active === false) {
      this.buttonActived[8].active = false;
      (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('db1', this.buttonActived[8].active);
    }
  }

  //东北-西南走向地形
  buttonEvent9() {
    this.buttonActived[8].active = !this.buttonActived[8].active;
    (ViewController.getInstance().viewHandler as TemplateViewHandler).three3dModel.imageIsShow('db1', this.buttonActived[8].active);
  }

}
