import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/myViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {
  zoom1 = 0;
  value = 60;
  active1 = false;
  active2 = false;
  active3 = false;
  length = 40; //点Mo与直线与x轴交点的距离
  length2 = 65; //点M与直线与x轴交点的距离
  length3 = 25; //点M与直线与点Mo在直线上的距离
  tip = "";
  sliderOption = {
    width: 180, height: 2, min: 0, max: 179, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.5, interval: 1
  };
  have = true;
  ishave = false;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
    setTimeout(() => {
      const box = document.getElementsByClassName('vue-slider-dot-tooltip-inner');
      const spanbox = document.getElementsByClassName('vue-slider-dot-tooltip-inner-top');
      const circle = document.getElementsByClassName('vue-slider-dot-handle');
      const text = document.getElementsByClassName('vue-slider-dot-tooltip-text');

      (box[0] as any).style.backgroundColor = 'transparent';
      (box[0] as any).style.color = '#fff';
      (box[0] as any).style.fontSize = '18px';
      (spanbox[0] as any).style.borderTopColor = 'transparent';
      (circle[0] as any).style.backgroundColor = '#fff';
    }, 100);

  }

  // mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
    this.sliderOption.width = 180 * this.zoom1;
  }

  //监听事件
  @Watch('value')
  onChildChanged(val: number) {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.changeSlope(val);
  }

  //methods
  clickbutton() {
    this.ishave = !this.ishave;
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.clickButton();
  }

  //适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 >= 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / W1;
    }
  }

  // 重置
  reset() {
    (ViewController.getInstance().viewHandler as MyViewHandler).threeModel.reset();
  }
}

