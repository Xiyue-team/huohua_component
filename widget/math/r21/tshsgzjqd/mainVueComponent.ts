import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';

@Component
export class MainVueComponent extends Vue {

    derivationTitle = '求导';
    derivationOneColor = false;
    derivationTwoColor = false;
    derivationThreeColor = false;
    derivationFourColor = false;
    derivationFiveColor = false;
    derivationSixColor = false;

    derivationOne = false;
    derivationTwo = false;
    derivationThree = false;
    derivationFour = false;
    derivationFive = false;
    derivationSix = false;

    formulaTitle = '查看图像';
    formulaOneColor = false;
    formulaTwoColor = false;
    formulaThreeColor = false;
    formulaFourColor = false;
    formulaFiveColor = false;
    formulaSixColor = false;

    checkImageOne = false;
    checkImageTwo = false;
    checkImageThree = false;
    checkImageFour = false;
    checkImageFive = false;
    checkImageSix = false;

    returnTitle = '返回';
    showReturn = false;
    num = -1;

      created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EthaneViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
        const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
        (rightPanel as HTMLElement).style.height = '0';
      }

    //求导按钮一
    derivationOneEvent() {
        this.derivationOneColor = true;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[0].visible(true);
        (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
        this.checkImageOne = true;
    }

    //求导按钮二
    derivationTwoEvent() {
        this.derivationTwoColor = true;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[1].visible(true);
        (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
        this.checkImageTwo = true;
    }

    //求导按钮三
    derivationThreeEvent() {
      this.derivationThreeColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[2].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
      this.checkImageThree = true;
    }

    //求导按钮四
    derivationFourEvent() {
      this.derivationFourColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[3].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
      this.checkImageFour = true;
    }

    //求导按钮五
    derivationFiveEvent() {
      this.derivationFiveColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[4].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
      this.checkImageFive = true;
    }

    //求导按钮六
    derivationSixEvent() {
      this.derivationSixColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.hLightFormula_BImg[5].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.draw();
      this.checkImageSix = true;
    }

    //查看图像按钮一
    checkImageOneEvent() {
       this.num = 0;
       this.formulaOneColor = true;
       (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
       (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[0].visible(true);
       (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[0].visible(true);
       (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
       this.derivationOne = false;
       this.derivationOneColor = false;
       this.checkImageOne = false;
       this.showReturn = true;
    }

    //查看图像按钮二
    checkImageTwoEvent() {
      this.num = 1;
      this.formulaTwoColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[1].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[1].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
      this.derivationTwo = false;
      this.derivationTwoColor = false;
      this.checkImageTwo = false;
      this.showReturn = true;
    }

    //查看图像按钮三
    checkImageThreeEvent() {
      this.num = 2;
      this.formulaThreeColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[2].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[2].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
      this.derivationThree = false;
      this.derivationThreeColor = false;
      this.checkImageThree = false;
      this.showReturn = true;
    }

    //查看图像按钮四
    checkImageFourEvent() {
      this.num = 3;
      this.formulaFourColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[3].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[3].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
      this.derivationFour = false;
      this.derivationFourColor = false;
      this.checkImageFour = false;
      this.showReturn = true;
    }

    //查看图像按钮五
    checkImageFiveEvent() {
      this.num = 4;
      this.formulaFiveColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[4].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[4].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
      this.derivationFive = false;
      this.derivationFiveColor = false;
      this.checkImageFive = false;
      this.showReturn = true;
    }

    //查看图像按钮六
    checkImageSixEvent() {
      this.num = 5;
      this.formulaSixColor = true;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[5].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[5].visible(true);
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showOrHideAllFormula(false);
      this.derivationSix = false;
      this.derivationSixColor = false;
      this.checkImageSix = false;
      this.showReturn = true;
    }

    //返回按钮
    returnEvent() {
       switch (this.num) {
         case 0:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[0].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[0].visible(false);
           break;
         case 1:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[1].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[1].visible(false);
           break;
         case 2:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[2].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[2].visible(false);
           break;
         case 3:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[3].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[3].visible(false);
           break;
         case 4:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[4].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[4].visible(false);
           break;
         case 5:
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.showAllInitialFormula(true);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftFormula[5].visible(false);
           (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.rightFormula[5].visible(false);
           break;
       }

      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.leftGrayPlane.visible(false);
      this.resetCheckImgButton();
      this.showReturn = false;
      (ViewController.getInstance().viewHandler as EthaneViewHandler).tshsCanvas.staticLayer.batchDraw();
    }

    //隐藏所有求导和查看图像按钮
    hideAllButton() {
      this.derivationOne = false;
      this.derivationTwo = false;
      this.derivationThree = false;
      this.derivationFour = false;
      this.derivationFive = false;
      this.derivationSix = false;

      this.checkImageOne = false;
      this.checkImageTwo = false;
      this.checkImageThree = false;
      this.checkImageFour = false;
      this.checkImageFive = false;
      this.checkImageSix = false;
    }

    //重置求导按钮
    resetDervationButton() {
      this.derivationOneColor = false;
      this.derivationTwoColor = false;
      this.derivationThreeColor = false;
      this.derivationFiveColor = false;
      this.derivationFourColor = false;
      this.derivationSixColor = false;
    }

    //重置查看图像按钮
    resetCheckImgButton() {
      this.formulaOneColor = false;
      this.formulaTwoColor = false;
      this.formulaThreeColor = false;
      this.formulaFourColor = false;
      this.formulaFiveColor = false;
      this.formulaSixColor = false;
    }

}

