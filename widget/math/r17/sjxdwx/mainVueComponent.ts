import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  active1 = false;
  active2 = false;
  active3 = false;
  active4 = false;
  showEquation = true;
  triangleText = '锐角三角形';
  disabledClick = false;

  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = true;
    viewOption.controlPanelAnimationDelay = 1000;

    ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }
  @Watch('active2')
  onChildChanged(val: Boolean) {

    if (!val) {
      this.active3 = this.active4 = false;
    }
    (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.drawOuterPoint(val);
  }
  //methods
  btnEvent(v: number) {
    if (v === 3 && this.active2 && !this.active3) {

      this.active3 = true;
      this.active4 = false;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectOuterAni();
    } else if (v === 4 && this.active2 && !this.active4) {
      this.active4 = true;
      this.active3 = false;
      (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.connectOuterAni();
    }

  }
  //适配
  resize() {

  }

}