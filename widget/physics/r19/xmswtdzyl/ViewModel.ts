import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TylxlViewHandler } from './services/TylxlViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

  forceTitle = '力的示意';
  antiForceTitle = '反作用力';
  showColor1 = false;
  showColor2 = false;
  //按钮置灰
  flag = true;
  //控制转动面时不显示箭头
  showCtrl = false;
  //控制转动时不显示反作用力箭头
  showAntiForce = false;

  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new TylxlViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().hideLoading();
    ViewController.getInstance().domReady();
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      const titleText = (document.getElementsByClassName('title_text')[0] as HTMLElement);
      titleText.style.fontSize = 18 + 'px';
      titleText.style.top = 12 + 'px';
    }
  }

  //力的示意按钮
  forceEvent() {
    if (!this.showColor1) {
      this.showColor1 = true;
      this.flag = false;

      //显示力
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.hideOrShowForceArrow(true);
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[0].visible = true;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.centerPoint.visible = true;

      if ((ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.theta === 0) {
        (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[2].visible = false;
      } else {
        (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[2].visible = true;
      }

      this.showCtrl = true;

      if (this.showCtrl) {

        (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.deleteObject(
          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[0],
          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[3]);
        (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.createForceArrow(
          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.theta
        );
      }

    } else {

      this.flag = true;
      this.showCtrl = false;
      this.showColor1 = false;
      this.showColor2 = false;
      this.showAntiForce = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.hideOrShowForceArrow(false);
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[0].visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[2].visible = false;

      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[2].visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[1].visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.bottomPoint.visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.centerPoint.visible = false;

      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.setArrowTransparent(false, 1);
    }
  }

  //反作用力按钮
  antiForceEvent() {
    const theta = (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.theta * 180 / Math.PI;
    if (!this.showColor2) {
      this.showColor2 = true;
      this.showAntiForce = true;

      if (this.showAntiForce) {
        if (Math.round(theta) !== 90) {
          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[2].visible = true;
          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[1].visible = true;

          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.bottomPoint.visible = true;

          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.deleteObject(
            (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[2]);

          (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.createAntiForce(
            (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.theta
          );
        }
      }
      //设置重力箭头透明
      if (Math.round(theta) === 0) {
        (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.setArrowTransparent(true, 0.5);
      }
    } else {
      this.showColor2 = false;
      this.showAntiForce = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.fArrow[2].visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.img[1].visible = false;
      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.bottomPoint.visible = false;

      (ViewController.getInstance().viewHandler as TylxlViewHandler).tylxl.setArrowTransparent(false, 1);
    }
  }


}

