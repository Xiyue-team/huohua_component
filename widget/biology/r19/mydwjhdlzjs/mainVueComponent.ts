import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { MydwjhdlzjsViewHandler } from './services/MydwjhdlzjsViewHandler';

@Component
export class MainVueComponent extends Vue {
  //data
  isActive = false;
  isActive1 = false;
  pointerEvents1 = 'auto';
  make = true;
  zoom = 1;

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new MydwjhdlzjsViewHandler(this), viewOption);
  }

  //mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

  //锁钥学说
  btnEvent_1() {
    if (this.make) {
      this.make = false;
      this.isActive = true;
      this.isActive1 = false;
      this.pointerEvents1 = 'auto';
      (ViewController.getInstance().viewHandler as MydwjhdlzjsViewHandler).run1();
    }
    if (this.make = false) {
      console.log(this.make);
      return;
    }
  }

  //诱导契合学说
  btnEvent_2() {
    this.make = true;
    this.isActive = false;
    this.isActive1 = true;
    this.pointerEvents1 = 'none';
    (ViewController.getInstance().viewHandler as MydwjhdlzjsViewHandler).run2();
  }

  //适配
  resize() {
    const H1 = window.innerHeight;
    if (H1 <= 480) {
      document.getElementById('right1').style.zoom = '0.8';
      document.getElementById('right2').style.zoom = '0.8';
    }
  }

  //重置
  reset(): void {
    (ViewController.getInstance().viewHandler as MydwjhdlzjsViewHandler).reset();
  }
}
