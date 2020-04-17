import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import * as general_line_zero from './sub_static/general_railway/general.png';
import * as general_line_one from './sub_static/general_railway/jg_line.png';
import * as general_line_two from './sub_static/general_railway/jj_line.png';
import * as general_line_three from './sub_static/general_railway/hk_line.png';
import * as general_line_four from './sub_static/general_railway/tj_line.png';
import * as general_line_five from './sub_static/general_railway/bc_line.png';
import * as general_line_six from './sub_static/general_railway/jb_line.png';
import * as general_line_seven from './sub_static/general_railway/lh_line.png';
import * as general_line_eight from './sub_static/general_railway/jh_line.png';
import * as high_speed_line_zero from './sub_static/high_speed_railway/high_speed.png';
import * as high_speed_line_one from './sub_static/high_speed_railway/hd_line.png';
import * as high_speed_line_two from './sub_static/high_speed_railway/jh_line.png';
import * as high_speed_line_three from './sub_static/high_speed_railway/jg_line.png';
import * as high_speed_line_four from './sub_static/high_speed_railway/hs_line.png';
import * as high_speed_line_five from './sub_static/high_speed_railway/qt_line.png';
import * as high_speed_line_six from './sub_static/high_speed_railway/lx_line.png';
import * as high_speed_line_seven from './sub_static/high_speed_railway/hhr_line.png';
import * as high_speed_line_eight from './sub_static/high_speed_railway/hk_line.png';

@Component
export class ViewModel extends Vue {

  selectCount = 8;
  general_line_count = 9;
  high_speed_line_count = 9;
  lang = window.env.browserInfo.lang;
  general_railwayColor = false;
  high_speed_railwayColor = false;
  general_railway_show = 'visibility: hidden';
  high_speed_railway_show = 'visibility: hidden';
  top_total_click_count: any = [];
  bottom_total_click_count: any = [];
  greenColor = '#009A2B';
  orangeColor = '#FF4100';
  general_railway = [
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false}
  ];

  high_speed_railway = [
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false},
    {show_line: false}
  ];

  general_railway_line: any = [];
  high_speed_railway_line: any = [];

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
    for (let i = 0; i < 8; i++) {
      this.top_total_click_count[i] = 0;
      this.bottom_total_click_count[i] = 0;
    }
    this.general_railway_line[0] = general_line_zero;
    this.general_railway_line[1] = general_line_one;
    this.general_railway_line[2] = general_line_two;
    this.general_railway_line[3] = general_line_three;
    this.general_railway_line[4] = general_line_four;
    this.general_railway_line[5] = general_line_five;
    this.general_railway_line[6] = general_line_six;
    this.general_railway_line[7] = general_line_seven;
    this.general_railway_line[8] = general_line_eight;

    this.high_speed_railway_line[0] = high_speed_line_zero;
    this.high_speed_railway_line[1] = high_speed_line_one;
    this.high_speed_railway_line[2] = high_speed_line_two;
    this.high_speed_railway_line[3] = high_speed_line_three;
    this.high_speed_railway_line[4] = high_speed_line_four;
    this.high_speed_railway_line[5] = high_speed_line_five;
    this.high_speed_railway_line[6] = high_speed_line_six;
    this.high_speed_railway_line[7] = high_speed_line_seven;
    this.high_speed_railway_line[8] = high_speed_line_eight;

    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';
  }

  /*普铁线*/
  general_railway_line_event() {
    if (this.general_railwayColor) {
      this.general_railwayColor = false;
      this.general_railway_show = 'visibility: hidden';
      this.singleRailwayLine('top_circleId_', 'general_railwayId_');
      for (let i = 0; i < 9; i++) {
        this.general_railway[i].show_line = false;
      }

    } else {
      this.general_railway[0].show_line = true;
      this.general_railwayColor = true;
      this.general_railway_show = 'visibility: visible';
    }
  }

  /*高铁线*/
  high_speed_railway_line_event() {
    if (this.high_speed_railwayColor) {
      this.high_speed_railwayColor = false;
      this.high_speed_railway_show = 'visibility: hidden';
      this.singleRailwayLine('bottom_circleId_', 'high_speed_railwayId_');
      for (let i = 0; i < 9; i++) {
        this.high_speed_railway[i].show_line = false;
      }

    } else {
      this.high_speed_railway[0].show_line = true;
      this.high_speed_railwayColor = true;
      this.high_speed_railway_show = 'visibility: visible';
    }
  }

  /*单普铁线点击事件*/
  general_railway_event(num: number) {
    switch (num) {
      case 1:
        this.top_total_click_count[0] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 1,
          this.greenColor, this.top_total_click_count[0]);
        this.general_railway[1].show_line = this.top_total_click_count[0] % 2 !== 0;
        break ;
      case 2:
        this.top_total_click_count[1] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 2,
          this.greenColor, this.top_total_click_count[1]);
        this.general_railway[2].show_line = this.top_total_click_count[1] % 2 !== 0;
        break ;
      case 3:
        this.top_total_click_count[2] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 3,
          this.orangeColor, this.top_total_click_count[2]);
        this.general_railway[3].show_line = this.top_total_click_count[2] % 2 !== 0;
        break ;
      case 4:
        this.top_total_click_count[3] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 4,
          this.greenColor, this.top_total_click_count[3]);
        this.general_railway[4].show_line = this.top_total_click_count[3] % 2 !== 0;
        break ;
      case 5:
        this.top_total_click_count[4] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 5,
          this.greenColor, this.top_total_click_count[4]);
        this.general_railway[5].show_line = this.top_total_click_count[4] % 2 !== 0;
        break ;
      case 6:
        this.top_total_click_count[5] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 6,
          this.orangeColor, this.top_total_click_count[5]);
        this.general_railway[6].show_line = this.top_total_click_count[5] % 2 !== 0;
        break ;
      case 7:
        this.top_total_click_count[6] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 7,
          this.orangeColor, this.top_total_click_count[6]);
        this.general_railway[7].show_line = this.top_total_click_count[6] % 2 !== 0;
        break ;
      case 8:
        this.top_total_click_count[7] += 1;
        this.changeColorForGenaralLine('top_circleId_', 'general_railwayId_', 8,
          this.greenColor, this.top_total_click_count[7]);
        this.general_railway[8].show_line = this.top_total_click_count[7] % 2 !== 0;
        break ;
      default:
        break;
    }
  }

  /*单高铁线点击事件*/
  high_speed_railway_event(num: number) {
    switch (num) {
      case 1:
        this.bottom_total_click_count[0] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 1,
          this.greenColor, this.bottom_total_click_count[0]);
        this.high_speed_railway[1].show_line = this.bottom_total_click_count[0] % 2 !== 0;
        break ;
      case 2:
        this.bottom_total_click_count[1] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 2,
          this.greenColor, this.bottom_total_click_count[1]);
        this.high_speed_railway[2].show_line = this.bottom_total_click_count[1] % 2 !== 0;
        break ;
      case 3:
        this.bottom_total_click_count[2] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 3,
          this.greenColor, this.bottom_total_click_count[2]);
        this.high_speed_railway[3].show_line = this.bottom_total_click_count[2] % 2 !== 0;
        break ;
      case 4:
        this.bottom_total_click_count[3] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 4,
          this.greenColor, this.bottom_total_click_count[3]);
        this.high_speed_railway[4].show_line = this.bottom_total_click_count[3] % 2 !== 0;
        break ;
      case 5:
        this.bottom_total_click_count[4] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 5,
          this.orangeColor, this.bottom_total_click_count[4]);
        this.high_speed_railway[5].show_line = this.bottom_total_click_count[4] % 2 !== 0;
        break ;
      case 6:
        this.bottom_total_click_count[5] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 6,
          this.orangeColor, this.bottom_total_click_count[5]);
        this.high_speed_railway[6].show_line = this.bottom_total_click_count[5] % 2 !== 0;
        break ;
      case 7:
        this.bottom_total_click_count[6] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 7,
          this.orangeColor, this.bottom_total_click_count[6]);
        this.high_speed_railway[7].show_line = this.bottom_total_click_count[6] % 2 !== 0;
        break ;
      case 8:
        this.bottom_total_click_count[7] += 1;
        this.changeColorForGenaralLine('bottom_circleId_', 'high_speed_railwayId_', 8,
          this.orangeColor, this.bottom_total_click_count[7]);
        this.high_speed_railway[8].show_line = this.bottom_total_click_count[7] % 2 !== 0;
        break ;
      default:
        break;
    }
  }

  /*动态生成元素id*/
  top_circleId(num: number) {

    return 'top_circleId_' + num;
  }

  general_railwayId(num: number) {

    return 'general_railwayId_' + num;
  }

  bottom_circleId(num: number) {

    return 'bottom_circleId_' + num;
  }

  high_speed_railwayId(num: number) {

    return 'high_speed_railwayId_' + num;
  }

  /*点击不同铁路线改变不同颜色*/
  changeColorForGenaralLine(circleId: string, railwayId: string, num: number, color: string, clickCount: number) {
    const circleDomId = circleId + num;
    const circleDom = document.getElementById(circleDomId);
    const tipTextDomId = railwayId + num;
    const tipTextDom = document.getElementById(tipTextDomId);
    if (clickCount % 2 === 0) {
      (circleDom as HTMLElement).style.border = '2px solid #D0D0D0';
      (tipTextDom as HTMLElement).style.color = '#000000';
    } else {
      (circleDom as HTMLElement).style.border = '2px solid' + color;
      (tipTextDom as HTMLElement).style.color = color;
    }
  }

  /*单条铁路线置灰*/
  singleRailwayLine(circleId: string, railwayId: string) {
    for (let j = 1; j <= 8; j++) {
      const topCircleDomId = circleId + j;
      const topCircleDom = document.getElementById(topCircleDomId);
      const topTipTextDomId = railwayId + j;
      const topTipTextDom = document.getElementById(topTipTextDomId);
      (topCircleDom as HTMLElement).style.border = '2px solid #D0D0D0';
      (topTipTextDom as HTMLElement).style.color = '#000000';
    }
  }

  reset() {
    this.general_railwayColor = false;
    this.high_speed_railwayColor = false;
    this.general_railway_show = 'visibility: hidden';
    this.high_speed_railway_show = 'visibility: hidden';
    for (let i = 0; i < this.general_railway.length; i++) {
      this.general_railway[i].show_line = false;
      this.high_speed_railway[i].show_line = false;
    }
    for (let i = 0; i < 8; i++) {
      this.top_total_click_count[i] = 0;
      this.bottom_total_click_count[i] = 0;
    }
    this.singleRailwayLine('top_circleId_', 'general_railwayId_');
    this.singleRailwayLine('bottom_circleId_', 'high_speed_railwayId_');
  }
}
