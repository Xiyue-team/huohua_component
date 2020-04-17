import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {AtomViewHandler} from './services/AtomViewHandler';
import {ViewController} from '../../../../src/core/ViewController';
import { Watch } from 'vue-property-decorator';


@Component
export class ViewModel extends Vue {
  isMobile = false;

  isPlay = false;

  isAlpha = true;

  switchOption = {
    datas: ['α衰变', 'β衰变'],
  };
  switchModel = 'α衰变';

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    viewOption.adapterMobilePanel = false;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new AtomViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.isMobile = true;
    }
  }

  // 重置按钮点击事件
  resetEvent() {
    (ViewController.getInstance().viewHandler as AtomViewHandler).reset();
  }

  @Watch('isPlay')
  animationControl(value: boolean) {
    (ViewController.getInstance().viewHandler as AtomViewHandler).playEvent(value);
  }

  @Watch('switchModel')
  scenceControl(value: any) {
    this.isPlay = false;

    if (value === 'α衰变') {
        this.isAlpha = true;
    } else {
        this.isAlpha = false;
    }

    (ViewController.getInstance().viewHandler as AtomViewHandler).resetScence(this.isAlpha);

  }
}

