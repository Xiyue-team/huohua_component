import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {PwxddyViewHandler} from './services/PwxddyViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class ViewModel extends Vue {
  isActive = false;
  clickNumber = true;

  showExhibition = 2;
  disableButtonDraw = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new PwxddyViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  resetEvent() {
    this.showExhibition = 2;
    // 重置场景
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.reset();
    this.disableButtonDraw = false;
  }

  buttonDrawEvent() {
    this.isActive = false;
    this.clickNumber = true;
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.drawAnimation.play();
  }

  leftButtonExhibitionEvent() {
    this.showExhibition = 1;
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.hideGroup();
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.leftGroup.visible = true;
    // 置灰绘制按钮
    this.disableButtonDraw = true;
  }

  rightButtonExhibitionEvent() {
    this.showExhibition = 2;
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.hideGroup();
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.showRightGroup();
    this.disableButtonDraw = false;
  }

  topButtonExhibitionEvent() {
    this.showExhibition = 3;
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.hideGroup();
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.topGroup.visible = true;
    // 置灰绘制按钮
    this.disableButtonDraw = true;
  }

  bottomButtonExhibitionEvent() {
    this.showExhibition = 4;
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.hideGroup();
    (ViewController.getInstance().viewHandler as PwxddyViewHandler).pwxddy3DScene.pwxddy3DModel.bottomGroup.visible = true;
    // 置灰绘制按钮
    this.disableButtonDraw = true;
  }
}

