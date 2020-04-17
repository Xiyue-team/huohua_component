import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  isShowTipTextTime = true;

  countDown = 15;
  timeConsuming = '00:00';

  isShowStartPage = true;
  isShowEndPage = false;

  countDownTimer: any;
  timeConsumingTimer: any;

  minuteText = '00';
  secondText = '00';

  isShowMask = true;

  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    viewOption.showReset = false;
    ViewController.getInstance(new FabricViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resize() {

  }

  resetEvent() {
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  clickStartPage() {
    this.isShowStartPage = false;

    this.countDownTimer = setInterval(() => {
      if (this.countDown === 0) {
        clearInterval(this.countDownTimer);
        this.isShowTipTextTime = false;
        (ViewController.getInstance().viewHandler as any).dmCanvas.countDownEnd();
        this.getTimeConsuming();
        this.isShowMask = false;
        return;
      }
      console.log('this.countDown', this.countDown);
      this.countDown -= 1;
    }, 1000);
  }

  getTimeConsuming() {
    let minute = 0;
    let second = 0;

    this.minuteText = '00';
    this.secondText = '00';

    this.timeConsumingTimer = setInterval(() => {
      second += 1;
      if (second === 60) {
        minute += 1;
        second = 0;
      }

      if (minute < 10) {
        this.minuteText = '0' + minute.toString();
      } else {
        this.minuteText = minute.toString();
      }

      if (second < 10) {
        this.secondText = '0' + second.toString();
      } else {
        this.secondText = second.toString();
      }

      this.timeConsuming = this.minuteText + ':' + this.secondText;

    }, 1000);
  }

  clearIntervalTimeConsumingTimer() {
    clearInterval(this.timeConsumingTimer);
    this.isShowMask = true;
    this.resetEvent();
  }

  clickEndPage () {
    this.countDown = 15;
    this.timeConsuming = '00:00';
    this.isShowEndPage = false;
    this.isShowTipTextTime = true;
    this.clickStartPage();
  }
}
