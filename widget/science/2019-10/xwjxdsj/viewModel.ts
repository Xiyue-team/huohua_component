import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import * as beans_micro from './sub_static/beans_micro.png';
import * as chili_micro from './sub_static/chili_micro.png';
import * as radish_micro from './sub_static/radish_micro.png';
import * as mosquitoes_micro from './sub_static/mosquitoes_micro.png';
import * as cockroach_micro from './sub_static/cockroach_micro.png';
import * as bee_micro from './sub_static/bee_micro.png';
import * as butterfly_micro from './sub_static/butterfly_micro.png';
import * as ant_micro from './sub_static/ant_micro.png';
import * as leaf_micro from './sub_static/leaf_micro.png';
import * as fly_micro from './sub_static/fly_micro.png';
const viewOptionConfig = require('./meta.json');
@Component
export class ViewModel extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  selectText = window.env.browserInfo.lang.text;
  observeText = this.selectText[1];
  activeIndex = 0;
  microImg = [ beans_micro, chili_micro, radish_micro,
    mosquitoes_micro, cockroach_micro, bee_micro,
    butterfly_micro, ant_micro, leaf_micro, fly_micro];


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
    this.initScale();
    window.addEventListener('resize', () => {
      this.initScale();
    });
  }
  changeImageEvent(index: number) {
    this.activeIndex = index;
    this.observeText = this.selectText[(index + 1)];
    const microElement = document.querySelector('.centerLayout').children[0];
    (microElement as any).setAttribute('src', this.microImg[index]);
  }

  initScale() {
    const imageList = document.querySelectorAll('.imageLayout');
    const centerDiv =  (document.querySelector('.centerLayout') as any);
    const scale = window.innerWidth / window.innerHeight > (16 / 9) ? window.innerHeight / 576 : window.innerWidth / 1024;
    centerDiv.style.transform = 'scale(' + scale + ')';
    (document.querySelector('.leftText') as any).style.top =
      'calc(50% + ' + ((centerDiv.offsetHeight / 2 + 20) * scale) + 'px)';
    for (let index = 0; index < imageList.length; index++) {
      (imageList[index] as any).style.height = window.innerWidth * 0.238 * 0.6 * (63 / 91) + 'px';
    }
  }

  resetEvent() {
  }

}
