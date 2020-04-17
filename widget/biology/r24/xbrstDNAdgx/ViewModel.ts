import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import {DnaCanvasViewHandler} from './services/DnaCanvasViewHandler';

const _ = require('lodash');

@Component
export class ViewModel extends Vue {

  index = 6;

  // 显示上下层画布
  showCanvas = 7;
  showCanvasBottom = 7;
  isShowText = true;

  // 判断是否是手机
  isPhone = false;
  tipsElement = document.getElementById('container8');

  // 定义画布的宽高
  scale = window.innerWidth / 1024;
  elementScale = window.innerWidth / 1024 > 1 ? 1 : window.innerWidth / 1024;
  fontSize = 16 * this.elementScale;
  width = 1024 * this.scale;
  height = 576 * this.scale;

  // 定义滑条的样式
  sliderNum = 0;
  marks1 = {
    '0': {
      label: '细胞',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#0199ff',
        transform: 'translate(-2px, -2px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        transform: 'translate(-10px, -40px)'
      }
    },
    '100': {
      label: '细胞核',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        marginLeft: '-3px',
        transform: 'translate(-20px, -40px)'
      }
    },
    '200': {
      label: '染色体',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        marginLeft: '-3px',
        transform: 'translate(-20px, -40px)'
      }
    },
    '300': {
      label: '染色质',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        marginLeft: '-3px',
        transform: 'translate(-20px, -40px)'
      }
    },
    '400': {
      label: '染色质纤维',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        marginLeft: '-20px',
        transform: 'translate(-20px, -40px)'
      }
    },
    '500': {
      label: '核小体',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '-3px',
        marginLeft: '-3px',
        transform: 'translate(-20px, -40px)'
      }
    },
    '600': {
      label: 'DNA',
      style: {
        width: '8px',
        height: '8px',
        display: 'block',
        backgroundColor: '#fff',
        border: '2px solid #D8D8D8',
        transform: 'translate(-2px, -4px)'
      },
      activeStyle: {
        backgroundColor: '#0199ff',
        border: 'none',
        transform: 'translate(-2px, -2px)'
      },
      labelStyle: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: this.fontSize + 'px',
        marginTop: '0px',
        marginLeft: '5px',
        transform: 'translate(-20px, -40px)'
      }
    },
  };
  sliderOption = {
    lazy: false,
    width: '760px',
    height: 5,
    min: 0,
    max: 600,
    reverse: false,
    tooltip: 'none',
    piecewise: false,
    dotStyle: {
      width: '24px',
      height: '24px',
      marginTop: '-6px'
    }
  };

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new DnaCanvasViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    this.tipsElement = document.getElementById('container8');
    this.adaptationSlideOption();
    if ((window.innerWidth / window.innerHeight) > (1024 / 576)) {
      this.scale = window.innerWidth / 1024;
    } else {
      this.scale = window.innerHeight / 576;
    }
    this.width = 1024 * this.scale;
    this.height = 576 * this.scale;
    const canvasArray = document.querySelectorAll('.containerCanvas');

    //为了适配在不是16:9的情况下宽自适应
    if (this.width > window.innerWidth) {
      for (let index = 0; index < canvasArray.length; index++) {
        (canvasArray[index] as any).style.left =
          -(this.width - window.innerWidth) / 2 + 'px';
      }
      (this.tipsElement as any).style.left = -(this.width - window.innerWidth) / 2 + 'px';
    }
    ViewController.getInstance().domReady();
  }

  @Watch('sliderNum')
  getSliderNumber(value: number) {
    if (value >= 495 && value <= 502) {
      (this.tipsElement as any).style.display = 'block';
    } else {
      (this.tipsElement as any).style.display = 'none';
    }

    const scale = (ViewController.getInstance().viewHandler as any).myCanvas.scale;
    const imageLength = (ViewController.getInstance().viewHandler as any).myCanvas.imageLength;

    this.index = imageLength - Math.floor((value + 10) / 100);
    this.showCanvas = this.index;
    this.showCanvasBottom = this.index;

    if ((value - 100 * (imageLength - this.index)) / 100 < scale[imageLength - this.index]) {

      (ViewController.getInstance().viewHandler as any).myCanvas.renderAnimation( scale[imageLength - this.index], this.index);
    } else {
      (ViewController.getInstance().viewHandler as any).myCanvas.renderAnimation(
        (value - 100 * (imageLength - this.index)) / 100, this.index);
    }
  }

  adaptationSlideOption() {
    const element = document.querySelector('.sliderStyle');
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isPhone = true;
      (element as any).style.width = '440px';
      this.sliderOption.width = '354px';
      this.marks1['0'].labelStyle.marginTop = '0px';
      this.marks1['100'].labelStyle.marginTop = '0px';
      this.marks1['200'].labelStyle.marginTop = '0px';
      this.marks1['300'].labelStyle.marginTop = '0px';
      this.marks1['400'].labelStyle.marginTop = '0px';
      this.marks1['500'].labelStyle.marginTop = '0px';
      this.marks1['600'].labelStyle.marginTop = '2px';

      this.marks1['100'].labelStyle.marginLeft = '3px';
      this.marks1['200'].labelStyle.marginLeft = '3px';
      this.marks1['300'].labelStyle.marginLeft = '3px';
      this.marks1['400'].labelStyle.marginLeft = '-10px';
      this.marks1['500'].labelStyle.marginLeft = '3px';
      this.marks1['600'].labelStyle.marginLeft = '10px';
    }
  }

  resetEvent() {
    this.sliderNum = 0;
  }
}
