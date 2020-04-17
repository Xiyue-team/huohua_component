import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import * as ax from './sub_static/ax.png';
import * as ex from './sub_static/ex.png';
import * as log from './sub_static/logax.png'
import * as inx from './sub_static/inx.png';
import * as texta from './sub_static/a.png';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  value = 2;
  axImg: any;
  logImg: any;
  sliderOption = {
    width: 180, height: 2, min: 0 , max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  };  
  isChange1 = false;
  isChange2 = false;
  zoom1 = 0;
  buttonInta = window.env.browserInfo.lang.buttonBox;
  buttonBox: any = [];
  ow: any;
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    this.axImg = ax;
    this.logImg = log;
    ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    $('.sliderBox').css('width', `${$('.sliderBox').width() * this.zoom1}`);
    this.sliderOption.width = 180 * this.zoom1;
    this.buttonBox = this.buttonInta;
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    this.ow = (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel;
  }
  diadClick(num: number) {
    if (num === 0) {
      this.isChange1 = !this.isChange1;
      this.ow.subline();
    } else if (num === 1) {
      this.isChange2 = !this.isChange2;
      this.ow.symmetryPoint();
    }
  }
  resetImg() {
    this.axImg = ax;
    this.logImg = log;
    $('.logImg').css('right', '8.8%');
  }
  @Watch('value')
  getNum() {
      if (this.value === 2.7) {
        $('.vue-slider-dot-tooltip-text').text('e');
      } else {
        $('.vue-slider-dot-tooltip-text').text(`${this.value}`);
      }
      this.ow.aNum = this.value;
      if (this.value === 2.7) {
        this.axImg = ex;
        this.logImg = inx;
        $('.logImg').css('right', '9.5%');
      } else {
        this.axImg = ax;
        this.logImg = log;
        $('.logImg').css('right', '8.8%');
      }
      this.ow.createparaBolaX();
      this.ow.resetDrag();
  }
  
//适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    $('#3dContainer').css('background-color', '#282828');
    if (W1 > 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / W1;
    }
}
}