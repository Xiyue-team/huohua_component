import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';
const viewOptionConfig = require('./meta.json');
import * as rock_one_image from './sub_static/rock_image/rock_one.png';
import * as rock_two_image from './sub_static/rock_image/rock_two.png';
import * as rock_three_image from './sub_static/rock_image/rock_three.png';
import * as rock_four_image from './sub_static/rock_image/rock_four.png';
import * as rock_five_image from './sub_static/rock_image/rock_five.png';
import * as rock_six_image from './sub_static/rock_image/rock_six.png';
import * as rock_seven_image from './sub_static/rock_image/rock_seven.png';
import * as rock_eight_image from './sub_static/rock_image/rock_eight.png';
import * as rock_nine_image from './sub_static/rock_image/rock_nine.png';

import * as rock_one_detail from './sub_static/rock_detail_image/rock_one_detail.png';
import * as rock_two_detail from './sub_static/rock_detail_image/rock_two_detail.png';
import * as rock_three_detail from './sub_static/rock_detail_image/rock_three_detail.png';
import * as rock_four_detail from './sub_static/rock_detail_image/rock_four_detail.png';
import * as rock_five_detail from './sub_static/rock_detail_image/rock_five_detail.png';
import * as rock_six_detail from './sub_static/rock_detail_image/rock_six_detail.png';
import * as rock_seven_detail from './sub_static/rock_detail_image/rock_seven_detail.png';
import * as rock_eight_detail from './sub_static/rock_detail_image/rock_eight_detail.png';
import * as rock_nine_detail from './sub_static/rock_detail_image/rock_nine_detail.png';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;
  rock_row_number = 3;
  show_rock_detail = false;
  show_title = true;
  top_rock_poster: any = [];
  center_rock_poster: any = [];
  bottom_rock_poster: any = [];
  show_rock_detail_image: any = '';
  desc_title = '';
  desc_content = '';

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
    this.top_rock_poster[0] = rock_one_image;
    this.top_rock_poster[1] = rock_two_image;
    this.top_rock_poster[2] = rock_three_image;
    this.center_rock_poster[0] = rock_four_image;
    this.center_rock_poster[1] = rock_five_image;
    this.center_rock_poster[2] = rock_six_image;
    this.bottom_rock_poster[0] = rock_seven_image;
    this.bottom_rock_poster[1] = rock_eight_image;
    this.bottom_rock_poster[2] = rock_nine_image;
  }

  mounted() {
    ViewController.getInstance().domReady();
    const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (rightPanel as HTMLElement).style.height = '0px';

    const top_row_rock = document.getElementsByClassName('top_row_rock')[0];
    (top_row_rock as HTMLElement).style.marginLeft = '0px';

    const center_row_rock = document.getElementsByClassName('center_row_rock')[0];
    (center_row_rock as HTMLElement).style.marginLeft = '0px';

    const bottom_row_rock = document.getElementsByClassName('bottom_row_rock')[0];
    (bottom_row_rock as HTMLElement).style.marginLeft = '0px';
  }

  show_top_rock_desc(num: number) {
    this.change_rock_desc(num, rock_one_detail, rock_two_detail, rock_three_detail,
      this.lang.top_rock_name, this.lang.top_rock_desc);
  }

  show_center_rock_desc(num: number) {
    this.change_rock_desc(num, rock_four_detail, rock_five_detail, rock_six_detail,
      this.lang.center_rock_name, this.lang.center_rock_desc);
  }

  show_bottom_rock_desc(num: number) {
    this.change_rock_desc(num, rock_seven_detail, rock_eight_detail, rock_nine_detail,
      this.lang.bottom_rock_name, this.lang.bottom_rock_desc);
  }

  exit_desc() {
    this.show_rock_detail = false;
    this.show_title = true;
  }

  change_rock_desc(num: number, left_rock_image: any, center_rock_image: any, right_rock_image: any, rock_name: any, rock_desc: any) {
    this.show_rock_detail = true;
    this.show_title = false;
    switch (num) {
      case 1:
        this.show_rock_detail_image = left_rock_image;
        this.desc_title = rock_name[num - 1];
        this.desc_content = rock_desc[num - 1];
        break;
      case 2:
        this.show_rock_detail_image = center_rock_image;
        this.desc_title = rock_name[num - 1];
        this.desc_content = rock_desc[num - 1];
        break;
      case 3:
        this.show_rock_detail_image = right_rock_image;
        this.desc_title = rock_name[num - 1];
        this.desc_content = rock_desc[num - 1];
        break;
    }
  }
}
