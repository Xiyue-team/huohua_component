import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {YzqxViewHandler} from './services/YzqxViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

    drawTitle = '绘制';
    showTitle = '展示';
    drawColor = false;
    showColor = false;
    formulaOne: any;
    formulaTwo: any;
    formulaThree: any;
    num = 1;
    animationCtrl = true;
    showExhibition = 2;
    selectButton = false;
    disableButtonDraw = false;
    disableButtonShow = false;
    disableButtonSelect = false;
    isMobile = false;

    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = false;
        viewOption.showMobileExpandIco = true;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new YzqxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();

        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isMobile = true;
        }
        this.formulaOne = document.getElementsByClassName('formulaOne')[0];
        this.formulaTwo = document.getElementsByClassName('formulaTwo')[0];
        this.formulaThree = document.getElementsByClassName('formulaThree')[0];
    }

    showFormulaOne() {
        this.num = 1;
        this.selectButton = false;
        this.drawColor = false;
        this.showColor = false;
        (this.formulaOne as HTMLElement).style.opacity = '1';
        (this.formulaTwo as HTMLElement).style.opacity = '0.5';
        (this.formulaThree as HTMLElement).style.opacity = '0.5';
        this.disableButtonDraw = false;
        this.disableButtonShow = false;
        this.disableButtonSelect = false;
        (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.firstEquationEvent();
    }

    showFormulaTwo() {
        this.num = 2;
        this.selectButton = true;
        this.drawColor = false;
        this.showColor = false;
        (this.formulaTwo as HTMLElement).style.opacity = '1';
        (this.formulaOne as HTMLElement).style.opacity = '0.5';
        (this.formulaThree as HTMLElement).style.opacity = '0.5';
        this.disableButtonDraw = false;
        this.disableButtonShow = false;
        this.disableButtonSelect = false;
        (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.secondEquationEvent();
    }

    showFormulaThree() {
        this.num = 3;
        this.selectButton = false;
        this.drawColor = false;
        this.showColor = false;
        (this.formulaThree as HTMLElement).style.opacity = '1';
        (this.formulaOne as HTMLElement).style.opacity = '0.5';
        (this.formulaTwo as HTMLElement).style.opacity = '0.5';
        this.disableButtonDraw = false;
        this.disableButtonShow = false;
        this.disableButtonSelect = false;
        (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.thirdEquationEvent();
    }

    drawEvent() {
          this.drawColor = true;
          //三种场景下的图形绘制动画
          switch (this.num) {
            case 1:
              if (this.animationCtrl) {
                this.animationCtrl = false;
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.tydy.animation.play();
              }
              break;
            case 2:
              if (this.animationCtrl) {
                this.animationCtrl = false;
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.drawEllipseAnimation();
              }
              break;
            case 3:
              if (this.animationCtrl) {
                this.animationCtrl = false;
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.sqxdy.drawEllipseAnimation();
              }
              break;
          }
    }

    showEvent() {
      this.disableButtonShow = false;
      this.disableButtonSelect = false;
          if (!this.showColor) {
            this.disableButtonDraw = true;
            this.showColor = true;
            //三种场景下的不同图形情况
            switch (this.num) {
              case 1:
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.tydy.obj1.visible = false;
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.tydy.obj2.visible = true;
                break;
              case 2:
                this.disableButtonDraw = true;
                break;
              case 3:
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.sqxdy.obj1.visible = false;
                (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.sqxdy.obj2.visible = true;
                break;
            }
          } else {
            this.disableButtonDraw = false;
              this.showColor = false;
              switch (this.num) {
                case 1:
                  (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.tydy.obj1.visible = true;
                  (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.tydy.obj2.visible = false;
                  break;
                case 2:
                  this.showColor = true;
                  this.disableButtonDraw = true;
                  break;
                case 3:
                  (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.sqxdy.obj1.visible = true;
                  (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.sqxdy.obj2.visible = false;
                  break;
              }
          }
    }

      //抛物线的四种情况
      rightButtonExhibitionEvent() {
          this.disableButtonDraw = false;
          this.showExhibition = 2;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj1.visible = true;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj2.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj3.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj4.visible = false;
      }

      leftButtonExhibitionEvent() {
          this.disableButtonDraw = true;
          this.showExhibition = 1;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj1.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj2.visible = true;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj3.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj4.visible = false;
      }

      topButtonExhibitionEvent() {
          this.disableButtonDraw = true;
          this.showExhibition = 3;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj1.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj2.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj3.visible = true;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj4.visible = false;
      }

      bottomButtonExhibitionEvent() {
          this.disableButtonDraw = true;
          this.showExhibition = 4;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj1.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj2.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj3.visible = false;
          (ViewController.getInstance().viewHandler as YzqxViewHandler).yzqx.yzqx3DModel.pwxdy.obj4.visible = true;
      }
}

