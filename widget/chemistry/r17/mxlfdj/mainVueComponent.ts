import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {MxlfdjViewHandler} from './services/MxlfdjViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class MainVueComponent extends Vue {
  angleDirection =  '';
  leftPageGrayShow =  true;
  leftPageBlueShow =  false;
  rightPageGrayShow =  true;
  rightPageBlueShow =  false;
  buttonGrayShow1 =  true;
  buttonBlueShow1 =  false;
  buttonGrayShow2 =  true;
  buttonBlueShow2 =  false;
  numberPage =  1;
  flag = true;
  coordinationDisable =  false;
  auxiliaryLineDisable =  true;
  rightPageDisable = false;
  clearTimeout: any;


  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new MxlfdjViewHandler(this) , viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  resetEvent() {
    // 重置场景
    (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.reset();

    // 重置页数
    this.numberPage = 1;
    document.getElementById('numberPage').innerText = this.numberPage + '/7';

    // 重置按钮配位数
    this.buttonGrayShow1 = true;
    this.buttonBlueShow1 = false;

    // 重置按钮辅助线
    this.buttonGrayShow2 = true;
    this.buttonBlueShow2 = false;

    // 设置配位数按钮可点
    this.coordinationDisable = false;
    // 设置辅助线按钮不可点
    this.auxiliaryLineDisable = true;

    // 恢复右翻页按钮可点击
    clearTimeout(this.clearTimeout);
    this.rightPageDisable = false;
  }

  leftPage_mousedown() {
    this.leftPageGrayShow = false;
    this.leftPageBlueShow = true;
  }

  leftPage_mouseup() {
    this.leftPageGrayShow = true;
    this.leftPageBlueShow = false;

    if ( this.flag ) {
      setTimeout(() => {
        this.flag = true;
      }, 200);

      if (this.numberPage > 1) {
        this.numberPage --;
        (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.showObj(this.numberPage);
        // 点击后两个按钮变回原样
        this.buttonGrayShow1 = true;
        this.buttonBlueShow1 = false;

        this.buttonGrayShow2 = true;
        this.buttonBlueShow2 = false;
      }
      document.getElementById('numberPage').innerText = this.numberPage + '/7';
    }

    // 恢复右翻页按钮可点击
    clearTimeout(this.clearTimeout);
    this.rightPageDisable = false;

    this.flag = false;

    // 置灰配位数按钮
    if (this.numberPage === 1 || this.numberPage === 4) {
      this.coordinationDisable = false;
    } else {
      this.coordinationDisable = true;
    }

    //置灰辅助线按钮
    if (this.numberPage === 7) {
      this.auxiliaryLineDisable = false;
    } else {
      this.auxiliaryLineDisable = true;
    }

  }

  rightPage_mousedown() {
    this.rightPageGrayShow = false;
    this.rightPageBlueShow = true;
  }

  rightPage_mouseup() {
    this.rightPageGrayShow = true;
    this.rightPageBlueShow = false;

    if ( this.flag ) {
      setTimeout(() => {
        this.flag = true;
      }, 200);

      if (this.numberPage < 7) {
        this.numberPage ++;
        (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.showObj(this.numberPage);
        // 点击后两个按钮变回原样
        this.buttonGrayShow1 = true;
        this.buttonBlueShow1 = false;

        this.buttonGrayShow2 = true;
        this.buttonBlueShow2 = false;

        if (this.numberPage === 6) {
          this.rightPageDisable = true;
          this.clearTimeout = setTimeout(() => {
            this.rightPageDisable = false;
          }, 1500);
        }
      }
      document.getElementById('numberPage').innerText = this.numberPage + '/7';
    }
    this.flag = false;

    // 置灰配位数按钮
    if (this.numberPage === 1 || this.numberPage === 4) {
      this.coordinationDisable = false;
    } else {
      this.coordinationDisable = true;
    }

    //置灰辅助线按钮
    if (this.numberPage === 7) {
      this.auxiliaryLineDisable = false;
    } else {
      this.auxiliaryLineDisable = true;
    }
  }

  leftPage_mouseout() {
    this.leftPageGrayShow = true;
    this.leftPageBlueShow = false;
  }

  rightPage_mouseout() {
    this.rightPageGrayShow = true;
    this.rightPageBlueShow = false;
  }

  coordination() {
    (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.coordinationNumberClick(this.buttonGrayShow1);

    if (this.buttonGrayShow1) {
      this.buttonGrayShow1 = false;
      this.buttonBlueShow1 = true;
    } else {
      this.buttonGrayShow1 = true;
      this.buttonBlueShow1 = false;
    }

  }

  auxiliaryLine() {
    (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.auxiliaryLineClick(this.buttonGrayShow2);
    if (this.buttonGrayShow2) {
      this.buttonGrayShow2 = false;
      this.buttonBlueShow2 = true;
    } else {
      this.buttonGrayShow2 = true;
      this.buttonBlueShow2 = false;
    }
  }

}

