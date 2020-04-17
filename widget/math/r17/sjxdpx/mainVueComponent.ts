import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { TriangleViewHandler } from './services/TriangleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
  //data
  active1 = false;
  active2 = false;
  active3 = false;
  played1 = false;
  played2 = false;
  played3 = false;
  showEquation = true;
  triangleText = '锐角三角形';
  disabledClick = false;
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = true;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new TriangleViewHandler(this), viewOption);
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
      this.active3 = false;
      this.played1 = false;
      this.played2 = false;
      this.played3 = false;
      (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent1();
      (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent2();
      (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent3();
    }
  }
  //methods
  btnEvent(v: number) {
    if (v === 1 ) {
      this.active3 = false;
      if (!this.played1) {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.connectInnerAni1();
        this.played1 = true;
      } else {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent1();
        this.played1 = false;
      }
    } else if (v === 2) {
      this.active3 = false;
      if (!this.played2) {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.connectInnerAni2();
        this.played2 = true;
      } else {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent2();
        this.played2 = false;
      }
    } else if (v === 3) {
      this.active3 = false;
      if (!this.played3) {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.connectInnerAni3();
        this.played3 = true;
      } else {
        (ViewController.getInstance().viewHandler as TriangleViewHandler).threeModel.esCenter.cleanUpEvent3();
        this.played3 = false;
      }
    } else if (v === 4 ) {
        this.active3 = true;
    }
  }
  //适配
  resize() {

  }
}
