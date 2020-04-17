import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YxbjViewHandler} from './services/YxbjViewHandler';

@Component
export class MainVueComponent extends Vue {
  newTitle1 = '构建分子';
  newTitle2 = '键角';
  newTitle3 = '孤对电子';
  newTitle4 = '结构对比';

  disable = true;

  addHDisable = false;

  //键角
  showBondAngleActived = false;

  // 孤对电子
  showElectronicsActived = false;

  // 结构对比
  contrastAnimationActived = false;

  // 添加氢的编号
  hNumber = 0;

  timeOut: any;

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new YxbjViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resetEvent() {
    // 重置场景
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.reset();

    this.hNumber = 0;
    this.disable = true;
    this.addHDisable = false;
    this.showBondAngleActived = false;
    this.showElectronicsActived = false;
    this.contrastAnimationActived = false;
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.showBondAngle(this.showBondAngleActived);
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.showElectronics(this.showElectronicsActived);
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.contrastAnimation(this.contrastAnimationActived);

    clearTimeout(this.timeOut);
  }

  addHEvent() {
    this.hNumber ++;

    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.addHAnimation(this.hNumber);
    if (this.hNumber === 5) {
      this.addHDisable = true;

      this.timeOut = setTimeout(() => {
        this.disable = false;
      }, 1000);
    }
  }

  showBondAngle() {
    if (this.disable) {
      return;
    }
    if (!this.showBondAngleActived) {
      this.showBondAngleActived = true;
    } else {
      this.showBondAngleActived = false;
    }
    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.showBondAngle(this.showBondAngleActived);
  }

  showElectronics() {
    if (this.disable) {
      return;
    }
    if (!this.showElectronicsActived) {
      this.showElectronicsActived = true;
    } else {
      this.showElectronicsActived = false;
    }

    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.showElectronics(this.showElectronicsActived);
  }

  contrastAnimation() {
    if (this.disable) {
      return;
    }
    if (!this.contrastAnimationActived) {
      this.contrastAnimationActived = true;
    } else {
      this.contrastAnimationActived = false;
    }

    (ViewController.getInstance().viewHandler as YxbjViewHandler).mxlfdj3DModel.contrastAnimation(this.contrastAnimationActived);
  }
}

