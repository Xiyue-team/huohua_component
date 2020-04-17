import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import {YeLvTiCanvasViewHandler} from './services/YeLvTiCanvasViewHandler';

const _ = require('lodash');

@Component
export class ViewModel extends Vue {

  index = 6;

  // 显示上下层画布
  showCanvas = 6;
  showCanvasBottom = 6;

  // 判断是否是手机
  isPhone = false;

  // 定义画布的宽高
  scale = window.innerWidth / 1024;
  width = 1024 * this.scale;
  height = 576 * this.scale;

  // 定义滑条的样式
  sliderNum = 0;
  marks1 = {
    '0': {
      label: '1x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#0199ff',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-10px, -40px)'
      }
    },
    '100': {
      label: '10x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        transform: 'translate(-2px, -2px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-20px, -40px)'
      }
    },
    '200': {
      label: '100x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        transform: 'translate(-2px, -2px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-20px, -40px)'
      }
    },
    '300': {
      label: '1,000x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        transform: 'translate(-2px, -2px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-20px, -40px)'
      }
    },
    '400': {
      label: '10,000x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        transform: 'translate(-2px, -2px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-20px, -40px)'
      }
    },
    '500': {
      label: '100,000x',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -3px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff'
      },
      labelStyle: {
        color: '#1A1A1A',
        transform: 'translate(-20px, -40px)'
      }
    },
  };
  sliderOption = {
    lazy: false,
    width: '532px',
    height: 5,
    min: 0,
    max: 500,
    reverse: false,
    tooltip: 'none',
    piecewise: false,
  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new YeLvTiCanvasViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      this.sliderOption.width = '266px';
    }

    if ((window.innerWidth / window.innerHeight) > (1024 / 576)) {
      this.scale = window.innerWidth / 1024;
    } else {
      this.scale = window.innerHeight / 576;
    }
    this.width = 1024 * this.scale;
    this.height = 576 * this.scale;

    ViewController.getInstance().domReady();
  }

  @Watch('sliderNum')
  getSliderNumber(value: number) {

    if (value >= 0 && value < 100) {
      this.index = 6;
    } else if (value >= 100 && value < 200) {
      this.index = 5;
    } else if (value >= 200 && value < 300) {
      this.index = 4;

    } else if (value >= 300 && value < 400) {
      this.index = 3;

    } else if (value >= 400 && value < 500) {
      this.index = 2;

    } else if (value >= 500 && value < 600) {
      this.index = 1;

    }
    this.showCanvas = this.index;
    this.showCanvasBottom = this.index;

    const scale = (ViewController.getInstance().viewHandler as any).myCanvas.scale;

    if ((value - 100 * (6 - this.index)) / 100 < scale[6 - this.index]) {
      (ViewController.getInstance().viewHandler as any).myCanvas.renderAnimation( scale[6 - this.index], this.index);
    } else {
      (ViewController.getInstance().viewHandler as any).myCanvas.renderAnimation( (value - 100 * (6 - this.index)) / 100, this.index);
    }
  }

  resetEvent() {
    this.sliderNum = 0;
  }
}
