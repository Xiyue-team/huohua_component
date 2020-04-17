import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ConeCurveViewHandler} from './services/ConeCurveViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class ViewModel extends Vue {
  isActive = false;
  clickNumber = true;

  isActive2 = false;
  clickNumber2 = true;

  disableButtonExhibition = false;
  disableButtonDraw = false;

  // 改变公式的样式透明度
  firstOpacity = 1;
  secondOpacity = 0.4;
  thirdOpacity = 0.4;

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new ConeCurveViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  // 重置按钮点击事件
  resetEvent() {
    this.isActive2 = false;
    this.clickNumber2 = true;
    this.disableButtonDraw = false;
    // 重置公式的样式
    this.firstOpacity = 1;
    this.secondOpacity = 0.4;
    this.thirdOpacity = 0.4;
    // 重置场景
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.reset();
    this.disableButtonExhibition = false;
  }

  // 绘制按钮点击事件
  buttonDrawEvent() {
    this.isActive = false;
    this.clickNumber = true;
    this.disableButtonDraw = true;
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.startAnimation();
  }

  // 展示按钮点击事件
  buttonExhibitionEvent() {
    if (!this.clickNumber2) {
      this.disableButtonDraw = true;
    } else {
      this.disableButtonDraw = false;
    }

    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.showEquatin();
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.resetEquatin();
  }

  // 三个公式被点击事件
  firstEquationEvent () {
    if (this.firstOpacity === 1) {
      return;
    }
    this.isActive2 = false;
    this.clickNumber2 = true;
    // 按钮样式恢复可点击
    this.disableButtonDraw = false;
    this.disableButtonExhibition = false;
    // 公式样式
    this.firstOpacity = 1;
    this.secondOpacity = 0.4;
    this.thirdOpacity = 0.4;
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.firstEquationEvent();
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.resetEquatin();
  }

  secondEquationEvent() {
    if (this.secondOpacity === 1) {
      return;
    }
    this.isActive2 = false;
    this.clickNumber2 = true;
    // 按钮样式恢复可点击
    this.disableButtonDraw = false;
    this.disableButtonExhibition = false;
    // 公式样式
    this.firstOpacity = 0.4;
    this.secondOpacity = 1;
    this.thirdOpacity = 0.4;
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.secondEquationEvent();
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.resetEquatin();
  }

  thirdEquationEvent() {
    if (this.thirdOpacity === 1) {
      return;
    }
    this.isActive2 = false;
    this.clickNumber2 = true;
    // 按钮样式恢复可点击
    this.disableButtonDraw = false;
    this.disableButtonExhibition = true;
    // 公式样式
    this.firstOpacity = 0.4;
    this.secondOpacity = 0.4;
    this.thirdOpacity = 1;
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.thirdEquationEvent();
    (ViewController.getInstance().viewHandler as ConeCurveViewHandler).pwxddy3DScene.coneCurve3DModel.resetEquatin();
  }
}

