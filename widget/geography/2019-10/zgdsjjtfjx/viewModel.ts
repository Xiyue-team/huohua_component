import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import * as boundary_line_one_map from './sub_static/first_step/first_step_map.png';
import * as boundary_line_one_line from './sub_static/first_step/first_step_line.png';
import * as boundary_line_two_map from './sub_static/second_step/second_step_map.png';
import * as boundary_line_two_line from './sub_static/second_step/second_step_line.png';
import * as boundary_line_three_map from './sub_static/third_step/third_step_map.png';
import * as boundary_line_three_line from './sub_static/third_step/third_step_line.png';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  boundary_line_count = 3;
  first_stepColor = false;
  second_stepColor = false;
  third_stepColor = false;
  show_mask = false;
  first_step_tip_show = false;
  second_step_tip_show = false;
  third_step_tip_show = false;

  switchSize = {
    width: 120,
    height: 42
  };
  switchValue = false;
  switchColor = {checked: '#0199FF', unchecked: '#EBEBEB'};
  switchLable = {checked: this.lang.boundary_lineTitle, unchecked: this.lang.boundary_lineTitle};

  boundary_line_map_show = [
    {show_image: false},
    {show_image: false},
    {show_image: false}
  ];

  boundary_line_line_show = [
    {show_image: false},
    {show_image: false},
    {show_image: false}
  ];

  boundary_line_map: any = [];
  boundary_line_line: any = [];

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
    this.boundary_line_map[0] = boundary_line_one_map;
    this.boundary_line_map[1] = boundary_line_two_map;
    this.boundary_line_map[2] = boundary_line_three_map;
    this.boundary_line_line[0] = boundary_line_one_line;
    this.boundary_line_line[1] = boundary_line_two_line;
    this.boundary_line_line[2] = boundary_line_three_line;

    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    if (window.env.browserInfo.isIpad) {
      (document.getElementsByClassName('second_step_tip_style')[0] as HTMLElement).style.right = '15%';
      (document.getElementsByClassName('third_step_tip_style')[0] as HTMLElement).style.right = '0%';
    }
  }

  /*第一级阶梯*/
  first_step_event() {
    if (this.first_stepColor) {
      this.first_stepColor = false;
      this.show_mask = (!this.first_stepColor && !this.second_stepColor && !this.third_stepColor) ? false : true;
      this.boundary_line_map_show[0].show_image = false;
      this.first_step_tip_show = false;

    } else {
      this.first_stepColor = true;
      this.show_mask = true;
      this.first_step_tip_show = true;
      this.boundary_line_map_show[0].show_image = true;
      this.boundary_line_line_show[0].show_image = this.switchValue;
    }
  }

  /*第二级阶梯*/
  second_step_event() {
    if (this.second_stepColor) {
      this.second_stepColor = false;
      this.show_mask = (!this.first_stepColor && !this.second_stepColor && !this.third_stepColor) ? false : true;
      this.boundary_line_map_show[1].show_image = false;
      this.second_step_tip_show = false;

    } else {
      this.second_stepColor = true;
      this.show_mask = true;
      this.second_step_tip_show = true;
      this.boundary_line_map_show[1].show_image = true;
      this.boundary_line_line_show[1].show_image = this.switchValue;
    }
  }

  /*第三级阶梯*/
  third_step_event() {
    if (this.third_stepColor) {
      this.third_stepColor = false;
      this.show_mask = (!this.first_stepColor && !this.second_stepColor && !this.third_stepColor) ? false : true;
      this.boundary_line_map_show[2].show_image = false;
      this.third_step_tip_show = false;

    } else {
      this.third_stepColor = true;
      this.show_mask = true;
      this.third_step_tip_show = true;
      this.boundary_line_map_show[2].show_image = true;
      this.boundary_line_line_show[2].show_image = this.switchValue;
    }
  }

  /*第一级阶梯提示框*/
  first_step_tip_event() {
    this.first_step_tip_show = false;
  }

  /*第二级阶梯提示框*/
  second_step_tip_event() {
    this.second_step_tip_show = false;
  }

  /*第三级阶梯提示框*/
  third_step_tip_event() {
    this.third_step_tip_show = false;
  }

  @Watch('switchValue')
  boundaryLine(value: boolean) {
    if (value) {
      this.boundary_line_line_show[0].show_image = this.first_stepColor;
      this.boundary_line_line_show[1].show_image = this.second_stepColor;
      this.boundary_line_line_show[2].show_image = this.third_stepColor;
    } else {
      this.boundary_line_line_show[0].show_image = value;
      this.boundary_line_line_show[1].show_image = value;
      this.boundary_line_line_show[2].show_image = value;
    }
  }

  reset() {
    this.first_stepColor = false;
    this.second_stepColor = false;
    this.third_stepColor = false;
    this.show_mask = false;
    this.first_step_tip_show = false;
    this.second_step_tip_show = false;
    this.third_step_tip_show = false;
    this.switchValue = false;
    for (let i = 0; i < 3; i++) {
      this.boundary_line_map_show[i].show_image = false;
      this.boundary_line_line_show[i].show_image = false;
    }
  }
}
